import { jsx as n, jsxs as w, Fragment as xn } from "react/jsx-runtime";
import u, { forwardRef as Ie, createContext as Cr, useContext as _r, useCallback as W, useState as X, useRef as Q, useEffect as ut, useLayoutEffect as ln, useMemo as tt, Fragment as yn } from "react";
import { clsx as Sr } from "clsx";
import { extendTailwindMerge as Tr } from "tailwind-merge";
import { cva as _t } from "class-variance-authority";
import * as L from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Rr } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Ae, Check as zt, Circle as Pe, X as Fe, Search as Nn, ChevronsUpDown as se, FilterIcon as Er, ChevronDown as Jt, ChevronUp as kn, ArrowLeftIcon as Dr, ChevronLeftIcon as Vr, ChevronRightIcon as Mr, ArrowRightIcon as zr, Filter as Or, User as Br, Link as Ir, CircleHelp as Ar, Star as Pr, CircleCheckIcon as Fr, CircleXIcon as Xr, CircleHelpIcon as $r, ArrowUpIcon as Gr, ArrowDownIcon as Lr, ArrowUpDownIcon as jr, PanelLeft as Hr, PanelRight as Yr, ScrollText as Cn, ChevronLeft as Ur, MenuIcon as qr, Menu as Jr, EllipsisVertical as Kr, LoaderCircle as Wr, Copy as Zr, ImageIcon as Qr, BookA as ta, BookOpen as ea, Home as na, Ellipsis as ra } from "lucide-react";
import { formatScrRef as Bt, MODIFIER_KEYS as aa, getChaptersForBook as oa, NumberFormat as sa, formatBytes as ia, deepEqual as Xe, isString as ve, compareScrRefs as Se, scrRefToBBBCCCVVV as xe, getLocalizeKeyForScrollGroupId as F, formatTimeSpan as wa } from "platform-bible-utils";
import { Slot as At } from "@radix-ui/react-slot";
import * as _n from "@radix-ui/react-label";
import * as Ut from "@radix-ui/react-radio-group";
import * as qt from "@radix-ui/react-popover";
import { Command as at } from "cmdk";
import * as ht from "@radix-ui/react-dialog";
import { useReactTable as Sn, getFilteredRowModel as la, getSortedRowModel as Tn, getPaginationRowModel as da, getCoreRowModel as Rn, flexRender as Yt, getGroupedRowModel as ca, getExpandedRowModel as pa } from "@tanstack/react-table";
import * as U from "@radix-ui/react-select";
import ua from "markdown-to-jsx";
import * as Te from "@radix-ui/react-checkbox";
import * as ie from "@radix-ui/react-toggle-group";
import * as En from "@radix-ui/react-toggle";
import * as Dn from "@radix-ui/react-separator";
import * as Kt from "@radix-ui/react-tooltip";
import * as ot from "@radix-ui/react-tabs";
import * as j from "@radix-ui/react-menubar";
import { useHotkeys as ma } from "react-hotkeys-hook";
import * as Pt from "@radix-ui/react-avatar";
import { Drawer as dt } from "vaul";
import * as Re from "@radix-ui/react-progress";
import { Toaster as ha } from "sonner";
import { toast as Oi } from "sonner";
import * as Ht from "@radix-ui/react-slider";
import * as Ee from "@radix-ui/react-switch";
const ga = Tr({ prefix: "tw-" });
function d(...t) {
  return ga(Sr(t));
}
const Ft = u.forwardRef(
  ({ className: t, type: e, ...r }, a) => /* @__PURE__ */ n(
    "input",
    {
      type: e,
      className: d(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: a,
      ...r
    }
  )
);
Ft.displayName = "Input";
const fa = Ie(
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: r,
    handleSubmit: a,
    className: o,
    ...s
  }, i) => /* @__PURE__ */ n(
    Ft,
    {
      ...s,
      type: "text",
      className: d(
        "tw-relative tw-box-border tw-min-w-0 tw-max-w-48 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",
        o
      ),
      onChange: (l) => t(l.target.value),
      onKeyDown: (l) => {
        l.key === "Enter" ? (a(), l.preventDefault()) : e(l);
      },
      onClick: r,
      ref: i
    }
  )
), $e = Cr(void 0);
function ct() {
  const t = _r($e);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const bt = _t("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ba = "layoutDirection";
function J() {
  const t = localStorage.getItem(ba);
  return t === "rtl" ? t : "ltr";
}
const we = L.Trigger, Vn = L.Group, va = L.Portal, xa = L.Sub, js = L.RadioGroup;
function Wt({ variant: t = "default", ...e }) {
  const r = u.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n($e.Provider, { value: r, children: /* @__PURE__ */ n(L.Root, { ...e }) });
}
const Mn = u.forwardRef(({ className: t, inset: e, children: r, ...a }, o) => {
  const s = ct();
  return /* @__PURE__ */ w(
    L.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        bt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(Ae, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Mn.displayName = L.SubTrigger.displayName;
const zn = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  L.SubContent,
  {
    ref: r,
    className: d(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
zn.displayName = L.SubContent.displayName;
const Xt = u.forwardRef(({ className: t, sideOffset: e = 4, children: r, ...a }, o) => {
  const s = J();
  return /* @__PURE__ */ n(L.Portal, { children: /* @__PURE__ */ n(
    L.Content,
    {
      ref: o,
      sideOffset: e,
      className: d(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ n("div", { dir: s, children: r })
    }
  ) });
});
Xt.displayName = L.Content.displayName;
const It = u.forwardRef(({ className: t, inset: e, ...r }, a) => {
  const o = J(), s = ct();
  return /* @__PURE__ */ n(
    L.Item,
    {
      ref: a,
      className: d(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        bt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      dir: o
    }
  );
});
It.displayName = L.Item.displayName;
const Ge = u.forwardRef(({ className: t, children: e, checked: r, ...a }, o) => {
  const s = ct();
  return /* @__PURE__ */ w(
    L.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        bt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ n(L.ItemIndicator, { children: /* @__PURE__ */ n(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Ge.displayName = L.CheckboxItem.displayName;
const On = u.forwardRef(({ className: t, children: e, ...r }, a) => {
  const o = ct();
  return /* @__PURE__ */ w(
    L.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        bt({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ n(L.ItemIndicator, { children: /* @__PURE__ */ n(Pe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
On.displayName = L.RadioItem.displayName;
const le = u.forwardRef(({ className: t, inset: e, ...r }, a) => /* @__PURE__ */ n(
  L.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...r
  }
));
le.displayName = L.Label.displayName;
const Zt = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  L.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Zt.displayName = L.Separator.displayName;
function ya({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
ya.displayName = "DropdownMenuShortcut";
var Na = Object.defineProperty, ka = (t, e, r) => e in t ? Na(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, O = (t, e, r) => ka(t, typeof e != "symbol" ? e + "" : e, r);
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
], Bn = [
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
], dn = za();
function $t(t, e = !0) {
  return e && (t = t.toUpperCase()), t in dn ? dn[t] : 0;
}
function je(t) {
  return $t(t) > 0;
}
function Ca(t) {
  const e = typeof t == "string" ? $t(t) : t;
  return e >= 40 && e <= 66;
}
function _a(t) {
  return (typeof t == "string" ? $t(t) : t) <= 39;
}
function In(t) {
  return t <= 66;
}
function Sa(t) {
  const e = typeof t == "string" ? $t(t) : t;
  return Fn(e) && !In(e);
}
function* Ta() {
  for (let t = 1; t <= Dt.length; t++) yield t;
}
const Ra = 1, An = Dt.length;
function Ea() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function He(t, e = "***") {
  const r = t - 1;
  return r < 0 || r >= Dt.length ? e : Dt[r];
}
function Pn(t) {
  return t <= 0 || t > An ? "******" : Bn[t - 1];
}
function Da(t) {
  return Pn($t(t));
}
function Fn(t) {
  const e = typeof t == "number" ? He(t) : t;
  return je(e) && !Le.includes(e);
}
function Va(t) {
  const e = typeof t == "number" ? He(t) : t;
  return je(e) && Le.includes(e);
}
function Ma(t) {
  return Bn[t - 1].includes("*obsolete*");
}
function za() {
  const t = {};
  for (let e = 0; e < Dt.length; e++)
    t[Dt[e]] = e + 1;
  return t;
}
const A = {
  allBookIds: Dt,
  nonCanonicalIds: Le,
  bookIdToNumber: $t,
  isBookIdValid: je,
  isBookNT: Ca,
  isBookOT: _a,
  isBookOTNT: In,
  isBookDC: Sa,
  allBookNumbers: Ta,
  firstBook: Ra,
  lastBook: An,
  extraBooks: Ea,
  bookNumberToId: He,
  bookNumberToEnglishName: Pn,
  bookIdToEnglishName: Da,
  isCanonical: Fn,
  isExtraMaterial: Va,
  isObsolete: Ma
};
var pt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(pt || {});
const st = class {
  // private versInfo: Versification;
  constructor(e) {
    if (O(this, "name"), O(this, "fullPath"), O(this, "isPresent"), O(this, "hasVerseSegments"), O(this, "isCustomized"), O(this, "baseVersification"), O(this, "scriptureBooks"), O(this, "_type"), e == null)
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
O(st, "Original", new st(pt.Original)), O(st, "Septuagint", new st(pt.Septuagint)), O(st, "Vulgate", new st(pt.Vulgate)), O(st, "English", new st(pt.English)), O(st, "RussianProtestant", new st(pt.RussianProtestant)), O(st, "RussianOrthodox", new st(pt.RussianOrthodox));
let Rt = st;
function cn(t, e) {
  const r = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(r);
  return t.split(r);
}
var Xn = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Xn || {});
const rt = class P {
  constructor(e, r, a, o) {
    if (O(this, "firstChapter"), O(this, "lastChapter"), O(this, "lastVerse"), O(this, "hasSegmentsDefined"), O(this, "text"), O(this, "BBBCCCVVVS"), O(this, "longHashCode"), O(this, "versification"), O(this, "rtlMark", "‏"), O(this, "_bookNum", 0), O(this, "_chapterNum", 0), O(this, "_verseNum", 0), O(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
        const s = e, i = r != null && r instanceof Rt ? r : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = r != null && r instanceof Rt ? r : void 0;
        this.setEmpty(s), this._verseNum = e % P.chapterDigitShifter, this._chapterNum = Math.floor(
          e % P.bookDigitShifter / P.chapterDigitShifter
        ), this._bookNum = Math.floor(e / P.bookDigitShifter);
      } else if (r == null)
        if (e != null && e instanceof P) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof Rt ? e : P.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && r != null && a != null)
      if (typeof e == "string" && typeof r == "string" && typeof a == "string")
        this.setEmpty(o), this.updateInternal(e, r, a);
      else if (typeof e == "number" && typeof r == "number" && typeof a == "number")
        this._bookNum = e, this._chapterNum = r, this._verseNum = a, this.versification = o ?? P.defaultVersification;
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
    let r;
    try {
      return r = new P(e), { success: !0, verseRef: r };
    } catch (a) {
      if (a instanceof Gt)
        return r = new P(), { success: !1, verseRef: r };
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
  static getBBBCCCVVV(e, r, a) {
    return e % P.bcvMaxValue * P.bookDigitShifter + (r >= 0 ? r % P.bcvMaxValue * P.chapterDigitShifter : 0) + (a >= 0 ? a % P.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: r, chapterNum: a, verseNum: o, verse: s, versificationStr: i } = e, l = s || o.toString();
    let c;
    return i && (c = new Rt(i)), r ? new P(r, a.toString(), l, c) : new P();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let r;
    if (!e)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let a;
    for (let o = 0; o < e.length; o++) {
      if (a = e[o], a < "0" || a > "9")
        return o === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +a - 0, r > P.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(P.verseRangeSeparator) || this._verse.includes(P.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return A.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = A.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const r = +e;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: r, vNum: a } = P.tryGetVerseNum(e);
    this._verse = r ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = a, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = P.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > A.lastBook)
      throw new Gt(
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
    this.versification = this.versification != null ? new Rt(e) : void 0;
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
    return this.validateVerse(P.verseRangeSeparators, P.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return P.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return P.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Rt(pt[i]);
        } catch {
          throw new Gt("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new Gt("Invalid reference : " + e);
    const a = r[1].split(":"), o = +a[0];
    if (a.length !== 2 || A.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !P.isVerseParseable(a[1]))
      throw new Gt("Invalid reference : " + e);
    this.updateInternal(r[0], a[0], a[1]);
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
    return new P(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const r = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete r.verse, r;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof P ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, r = P.verseRangeSeparators, a = P.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], s = cn(this._verse, a);
    for (const i of s.map((l) => cn(l, r))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const p = this.clone();
        if (p.verse = i[1], !e)
          for (let f = c + 1; f < p.verseNum; f++) {
            const v = new P(
              this._bookNum,
              this._chapterNum,
              f,
              this.versification
            );
            this.isExcluded || o.push(v);
          }
        o.push(p);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, r) {
    if (!this.verse)
      return this.internalValid;
    let a = 0;
    for (const o of this.allVerses(!0, e, r)) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > A.lastBook ? 2 : (A.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = P.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, r, a) {
    this.bookNum = A.bookIdToNumber(e), this.chapter = r, this.verse = a;
  }
};
O(rt, "defaultVersification", Rt.English), O(rt, "verseRangeSeparator", "-"), O(rt, "verseSequenceIndicator", ","), O(rt, "verseRangeSeparators", [rt.verseRangeSeparator]), O(rt, "verseSequenceIndicators", [rt.verseSequenceIndicator]), O(rt, "chapterDigitShifter", 1e3), O(rt, "bookDigitShifter", rt.chapterDigitShifter * rt.chapterDigitShifter), O(rt, "bcvMaxValue", rt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
O(rt, "ValidStatusType", Xn);
class Gt extends Error {
}
const Oa = Ie(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: r,
    handleHighlightBook: a,
    handleKeyDown: o,
    bookType: s,
    children: i
  }, l) => /* @__PURE__ */ w(
    It,
    {
      ref: l,
      textValue: t,
      className: d(
        "tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",
        {
          // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
          "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": r
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
        /* @__PURE__ */ n(
          "span",
          {
            className: d(
              "tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": r,
                "tw-border-s-red-200": s.toLowerCase() === "ot",
                "tw-border-s-purple-200": s.toLowerCase() === "nt",
                "tw-border-s-indigo-200": s.toLowerCase() === "dc"
              }
            ),
            children: A.bookIdToEnglishName(t)
          }
        ),
        r && /* @__PURE__ */ n("div", { children: i })
      ]
    },
    t
  )
);
function Ba({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: r,
  highlightedChapter: a,
  handleHighlightedChapter: o
}) {
  const s = Array.from({ length: e }, (l, c) => c + 1), i = W(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ n("div", { className: d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: s.map((l) => /* @__PURE__ */ n(
    "div",
    {
      className: d(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": l === r,
          "tw-bg-amber-200": l === a
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
const Ia = 6, Ye = A.allBookIds.filter((t) => !A.isObsolete(A.bookIdToNumber(t))), Aa = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, pn = ["OT", "NT", "DC"], Pa = 96, Fa = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], un = /* @__PURE__ */ new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter"
]), Xa = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])', Lt = (t) => oa(A.bookIdToNumber(t));
function $a() {
  return Ye.map((e) => A.bookIdToEnglishName(e));
}
function Ga(t) {
  return $a().includes(t);
}
function La(t) {
  const e = t.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (Ga(e))
    return Ye.find((a) => A.bookIdToEnglishName(a) === e);
}
function Ys({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: a
}) {
  const o = J(), [s, i] = X(
    () => Bt(t, "English")
  ), [l, c] = X(""), [p, f] = X(t.book), [v, m] = X(t.chapterNum ?? 0), [h, _] = X(t.book), [E, N] = X(!1), [y, T] = X(E), R = Q(void 0), z = Q(void 0), Y = Q(void 0), gt = W(
    (g) => {
      const M = a ? a() : Ye;
      return {
        OT: M.filter((k) => A.isBookOT(k)),
        NT: M.filter((k) => A.isBookNT(k)),
        DC: M.filter((k) => A.isBookDC(k))
      }[g].filter((k) => {
        const V = A.bookIdToEnglishName(k).toLowerCase(), Z = l.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return V.includes(Z) || // Match book name
        k.toLowerCase().includes(Z);
      });
    },
    [l, a]
    // Only recompute when relevant values change
  ), lt = (g) => {
    i(g), c(g);
  }, S = Q(!1), b = W(() => {
    i(Bt(t, "English")), c(""), f(t.book), _(t.book);
  }, [t]), $ = W((g) => {
    if (S.current) {
      S.current = !1;
      return;
    }
    N(g);
  }, []), D = W(
    (g, M, k, V) => {
      if (m(t.book !== g ? 1 : t.chapterNum), M || Lt(g) === -1) {
        e({
          book: g,
          chapterNum: k ?? 1,
          verseNum: V ?? 1
        }), N(!1), c("");
        return;
      }
      f(p !== g ? g : ""), N(!M);
    },
    [e, t.book, t.chapterNum, p]
  ), nt = (g) => {
    g <= 0 || g > Lt(p) || D(p, !0, g);
  }, St = W(() => {
    Fa.forEach((g) => {
      const M = g.exec(l);
      if (M) {
        const [k, V = void 0, Z = void 0] = M.slice(1), G = La(k);
        (A.isBookIdValid(k) || G) && D(
          G ?? k,
          !0,
          V ? parseInt(V, 10) : 1,
          Z ? parseInt(Z, 10) : 1
        );
      }
    });
  }, [D, l]), ft = W(
    (g) => {
      E ? g.key === "ArrowDown" || g.key === "Tab" && !g.shiftKey ? (Y != null && Y.current ? Y.current.focus() : z.current && z.current.focus(), g.preventDefault()) : g.key === "Escape" && document.activeElement === R.current && (N(!1), g.preventDefault(), g.stopPropagation()) : g.key !== "Tab" && N(!0);
    },
    [E]
  ), et = W((g) => {
    if (!aa.has(g.key)) {
      if (g.key === "Tab") {
        if (g.shiftKey)
          R.current.focus();
        else {
          const M = [
            ...document.querySelectorAll(Xa)
          ].filter(
            (V) => {
              var Z, G;
              return V instanceof HTMLElement && ((V.offsetWidth > 0 || V.offsetHeight > 0) && !((Z = z.current) != null && Z.contains(V)) && !((G = R.current) != null && G.contains(V)) || V === g.target);
            }
          ), k = g.target instanceof HTMLElement ? M.indexOf(g.target) : -1;
          k >= 0 ? M[(k + 1) % M.length].focus() : R.current.focus();
        }
        g.preventDefault(), g.stopPropagation();
        return;
      }
      g.stopPropagation(), R.current.focus(), R.current.dispatchEvent(new KeyboardEvent("keydown", { ...g, view: void 0 }));
    }
  }, []), K = W(
    (g) => {
      const { key: M } = g;
      un.has(M) || (et(g), g.preventDefault());
    },
    [et]
  ), C = W(
    (g, M) => {
      const { key: k } = g;
      if (un.has(k)) {
        if (h === p) {
          if (k === "Enter") {
            g.preventDefault(), D(p, !0, v);
            return;
          }
          const V = k === "ArrowRight" && !o || k === "ArrowRight" && o === "ltr" || k === "ArrowLeft" && o === "rtl", Z = k === "ArrowLeft" && !o || k === "ArrowLeft" && o === "ltr" || k === "ArrowRight" && o === "rtl";
          let G = 0;
          if (V)
            if (v < Lt(h))
              G = 1;
            else {
              g.preventDefault();
              return;
            }
          else if (Z)
            if (v > 1)
              G = -1;
            else {
              g.preventDefault();
              return;
            }
          else k === "ArrowDown" ? G = Ia : k === "ArrowUp" && (G = -6);
          if (v + G <= 0 || v + G > Lt(h))
            m(0);
          else if (G !== 0) {
            m(v + G), g.preventDefault();
            return;
          }
        }
        if (M === 0 && k === "ArrowUp") {
          g.preventDefault(), R.current.focus();
          return;
        }
        return;
      }
      et(g);
    },
    [
      o,
      h,
      v,
      et,
      p,
      D
    ]
  );
  return ut(() => {
    p === h ? p === t.book ? m(t.chapterNum) : m(1) : m(0);
  }, [h, t.book, t.chapterNum, p]), ut(() => {
    b();
  }, [b]), ut(() => {
  }, [E, b]), ln(() => {
    T(E);
  }, [E]), ln(() => {
    const g = setTimeout(() => {
      var M, k;
      if (y && z.current && Y.current) {
        const Z = Y.current.offsetTop - Pa;
        z.current.scrollTo({ top: Z, behavior: "instant" }), R.current.focus();
      }
      !y && document.activeElement !== R.current && !((M = R.current) != null && M.contains(document.activeElement)) && document.activeElement !== z.current && !((k = z.current) != null && k.contains(document.activeElement)) && b();
    }, 10);
    return () => {
      clearTimeout(g);
    };
  }, [y, b]), /* @__PURE__ */ w(Wt, { modal: !1, open: E, onOpenChange: $, children: [
    /* @__PURE__ */ n(we, { asChild: !0, children: /* @__PURE__ */ n(
      fa,
      {
        ref: R,
        value: s,
        handleSearch: lt,
        handleKeyDown: ft,
        handleOnClick: () => {
          f(t.book), _(t.book), m(t.chapterNum > 0 ? t.chapterNum : 0), N(!0), R.current.focus();
        },
        onFocus: () => {
          S.current = !0;
        },
        handleSubmit: St,
        placeholder: Bt(t, "English"),
        className: r
      }
    ) }),
    /* @__PURE__ */ n(
      Xt,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        align: o === "ltr" ? "start" : "end",
        ref: z,
        onKeyDown: K,
        onFocus: (g) => {
          var M, k;
          !((M = R.current) != null && M.contains(g.relatedTarget)) && !((k = z.current) != null && k.contains(g.relatedTarget)) && R.current.select();
        },
        children: /* @__PURE__ */ n("div", { className: "rtl:tw-ps-2", children: pn.map((g, M) => {
          const k = gt(g);
          return k.length > 0 && /* @__PURE__ */ w("div", { children: [
            /* @__PURE__ */ n(le, { className: "tw-font-semibold tw-text-foreground/80", children: Aa[g] }),
            k.map((V, Z) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
              Oa,
              {
                bookId: V,
                handleSelectBook: () => D(V, !1),
                isSelected: p === V,
                handleHighlightBook: () => _(V),
                handleKeyDown: (G) => C(G, Z),
                bookType: g,
                ref: (G) => {
                  p === V && (Y.current = G);
                },
                children: /* @__PURE__ */ n(
                  Ba,
                  {
                    handleSelectChapter: nt,
                    endChapter: Lt(V),
                    activeChapter: t.book === V ? t.chapterNum : 0,
                    highlightedChapter: v,
                    handleHighlightedChapter: (G) => {
                      m(G);
                    }
                  }
                )
              }
            ) }, V)),
            pn.length - 1 !== M ? /* @__PURE__ */ n(Zt, {}) : void 0
          ] }, g);
        }) })
      }
    )
  ] });
}
const ja = _t(
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
), B = u.forwardRef(
  ({ className: t, variant: e, size: r, asChild: a = !1, ...o }, s) => /* @__PURE__ */ n(a ? At : "button", { className: d(ja({ variant: e, size: r, className: t })), ref: s, ...o })
);
B.displayName = "Button";
const Ha = _t(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), H = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(_n.Root, { ref: r, className: d("pr-twp", Ha(), t), ...e }));
H.displayName = _n.Root.displayName;
const Ue = u.forwardRef(({ className: t, ...e }, r) => {
  const a = J();
  return /* @__PURE__ */ n(
    Ut.Root,
    {
      className: d("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: r,
      dir: a
    }
  );
});
Ue.displayName = Ut.Root.displayName;
const re = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Ut.Item,
  {
    ref: r,
    className: d(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ n(Ut.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ n(Pe, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
re.displayName = Ut.Item.displayName;
const qe = qt.Root, Je = qt.Trigger, de = u.forwardRef(({ className: t, align: e = "center", sideOffset: r = 4, ...a }, o) => {
  const s = J();
  return /* @__PURE__ */ n(qt.Portal, { children: /* @__PURE__ */ n(
    qt.Content,
    {
      ref: o,
      align: e,
      sideOffset: r,
      className: d(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      dir: s
    }
  ) });
});
de.displayName = qt.Content.displayName;
const Ya = ht.Portal, $n = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ht.Overlay,
  {
    ref: r,
    className: d(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
$n.displayName = ht.Overlay.displayName;
const Ua = u.forwardRef(({ className: t, children: e, ...r }, a) => {
  const o = J();
  return /* @__PURE__ */ w(Ya, { children: [
    /* @__PURE__ */ n($n, {}),
    /* @__PURE__ */ w(
      ht.Content,
      {
        ref: a,
        className: d(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...r,
        dir: o,
        children: [
          e,
          /* @__PURE__ */ w(
            ht.Close,
            {
              className: d(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ n(Fe, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Ua.displayName = ht.Content.displayName;
const qa = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ht.Title,
  {
    ref: r,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
qa.displayName = ht.Title.displayName;
const Ja = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ht.Description,
  {
    ref: r,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ja.displayName = ht.Description.displayName;
const ce = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  at,
  {
    ref: r,
    className: d(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ce.displayName = at.displayName;
const pe = u.forwardRef(({ className: t, ...e }, r) => {
  const a = J();
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ n(Nn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ n(
      at.Input,
      {
        ref: r,
        className: d(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
pe.displayName = at.Input.displayName;
const ue = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  at.List,
  {
    ref: r,
    className: d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ue.displayName = at.List.displayName;
const me = u.forwardRef((t, e) => /* @__PURE__ */ n(at.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
me.displayName = at.Empty.displayName;
const Ke = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  at.Group,
  {
    ref: r,
    className: d(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ke.displayName = at.Group.displayName;
const Gn = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  at.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Gn.displayName = at.Separator.displayName;
const he = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  at.Item,
  {
    ref: r,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
he.displayName = at.Item.displayName;
function Ka(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function De({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: a,
  popoverContentClassName: o,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = Ka,
  icon: c = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: f = "",
  commandEmptyMessage: v = "No option found",
  buttonVariant: m = "outline",
  alignDropDown: h = "start",
  isDisabled: _ = !1,
  ...E
}) {
  const [N, y] = X(!1);
  return /* @__PURE__ */ w(qe, { open: N, onOpenChange: y, ...E, children: [
    /* @__PURE__ */ n(Je, { asChild: !0, children: /* @__PURE__ */ w(
      B,
      {
        variant: m,
        role: "combobox",
        "aria-expanded": N,
        id: t,
        className: d(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? r
        ),
        disabled: _,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ n("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ n("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? l(s) : p })
          ] }),
          /* @__PURE__ */ n(se, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(
      de,
      {
        align: h,
        className: d("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ w(ce, { children: [
          /* @__PURE__ */ n(pe, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ n(me, { children: v }),
          /* @__PURE__ */ n(ue, { children: e.map((T) => /* @__PURE__ */ w(
            he,
            {
              value: l(T),
              onSelect: () => {
                i(T), y(!1);
              },
              children: [
                /* @__PURE__ */ n(
                  zt,
                  {
                    className: d("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !s || l(s) !== l(T)
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
function Wa({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: s
}) {
  const i = tt(
    () => Array.from({ length: s }, (p, f) => f + 1),
    [s]
  );
  return /* @__PURE__ */ w(xn, { children: [
    /* @__PURE__ */ n(H, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ n(
      De,
      {
        isDisabled: o,
        onChange: (p) => {
          r(p), p > e && a(p);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (p) => p.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ n(H, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ n(
      De,
      {
        isDisabled: o,
        onChange: (p) => {
          a(p), p < t && r(p);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (p) => p.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Za = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Za || {});
const Us = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), ye = (t, e) => t[e] ?? e;
function qs({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: p
}) {
  const f = ye(p, "%webView_bookSelector_currentBook%"), v = ye(p, "%webView_bookSelector_choose%"), m = ye(p, "%webView_bookSelector_chooseBooks%"), [h, _] = X(
    "current book"
    /* CURRENT_BOOK */
  ), E = (N) => {
    _(N), t(N);
  };
  return /* @__PURE__ */ n(
    Ue,
    {
      className: "pr-twp tw-flex",
      value: h,
      onValueChange: (N) => E(N),
      children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ n(re, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ n(H, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ n(H, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ n("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ n(
            Wa,
            {
              isDisabled: h === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ n(re, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ n(H, { className: "tw-ms-1", children: m })
          ] }),
          /* @__PURE__ */ n(H, { className: "tw-flex tw-items-center", children: a.map((N) => A.bookIdToEnglishName(N)).join(", ") }),
          /* @__PURE__ */ n(
            B,
            {
              disabled: h === "current book",
              onClick: () => r(),
              children: v
            }
          )
        ] })
      ] })
    }
  );
}
function Qa({ table: t }) {
  return /* @__PURE__ */ w(Wt, { children: [
    /* @__PURE__ */ n(Rr, { asChild: !0, children: /* @__PURE__ */ w(B, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ n(Er, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(Xt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ n(le, { children: "Toggle columns" }),
      /* @__PURE__ */ n(Zt, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ n(
        Ge,
        {
          className: "tw-capitalize",
          checked: e.getIsVisible(),
          onCheckedChange: (r) => e.toggleVisibility(!!r),
          children: e.id
        },
        e.id
      ))
    ] })
  ] });
}
const Vt = U.Root, to = U.Group, Mt = U.Value, eo = _t(
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
), kt = u.forwardRef(({ className: t, children: e, size: r, ...a }, o) => {
  const s = J();
  return /* @__PURE__ */ w(
    U.Trigger,
    {
      className: d(eo({ size: r, className: t })),
      ref: o,
      ...a,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ n(U.Icon, { asChild: !0, children: /* @__PURE__ */ n(Jt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
kt.displayName = U.Trigger.displayName;
const Ln = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  U.ScrollUpButton,
  {
    ref: r,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ n(kn, { className: "tw-h-4 tw-w-4" })
  }
));
Ln.displayName = U.ScrollUpButton.displayName;
const jn = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  U.ScrollDownButton,
  {
    ref: r,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ n(Jt, { className: "tw-h-4 tw-w-4" })
  }
));
jn.displayName = U.ScrollDownButton.displayName;
const Ct = u.forwardRef(({ className: t, children: e, position: r = "popper", ...a }, o) => {
  const s = J();
  return /* @__PURE__ */ n(U.Portal, { children: /* @__PURE__ */ w(
    U.Content,
    {
      ref: o,
      className: d(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        r === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: r,
      ...a,
      children: [
        /* @__PURE__ */ n(Ln, {}),
        /* @__PURE__ */ n(
          U.Viewport,
          {
            className: d(
              "tw-p-1",
              r === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ n("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ n(jn, {})
      ]
    }
  ) });
});
Ct.displayName = U.Content.displayName;
const no = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  U.Label,
  {
    ref: r,
    className: d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
no.displayName = U.Label.displayName;
const it = u.forwardRef(({ className: t, children: e, ...r }, a) => /* @__PURE__ */ w(
  U.Item,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...r,
    children: [
      /* @__PURE__ */ n("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ n(U.ItemIndicator, { children: /* @__PURE__ */ n(zt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ n(U.ItemText, { children: e })
    ]
  }
));
it.displayName = U.Item.displayName;
const ro = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  U.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
ro.displayName = U.Separator.displayName;
function ao({ table: t }) {
  return /* @__PURE__ */ n("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ n("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ w(
        Vt,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ n(kt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ n(Mt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ n(Ct, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ n(it, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ n(Dr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ n(Vr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ n(Mr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ n(zr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Qt = u.forwardRef(({ className: t, stickyHeader: e, ...r }, a) => /* @__PURE__ */ n("div", { className: d("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ n(
  "table",
  {
    ref: a,
    className: d("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...r
  }
) }));
Qt.displayName = "Table";
const te = u.forwardRef(({ className: t, stickyHeader: e, ...r }, a) => /* @__PURE__ */ n(
  "thead",
  {
    ref: a,
    className: d(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...r
  }
));
te.displayName = "TableHeader";
const ee = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n("tbody", { ref: r, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
ee.displayName = "TableBody";
const oo = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "tfoot",
  {
    ref: r,
    className: d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
oo.displayName = "TableFooter";
const mt = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "tr",
    {
      ref: r,
      className: d(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
mt.displayName = "TableRow";
const Nt = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "th",
  {
    ref: r,
    className: d(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
Nt.displayName = "TableHead";
const wt = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "td",
  {
    ref: r,
    className: d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
wt.displayName = "TableCell";
const so = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "caption",
  {
    ref: r,
    className: d("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
so.displayName = "TableCaption";
function io({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var N;
  const [l, c] = X([]), [p, f] = X([]), [v, m] = X({}), [h, _] = X({}), E = Sn({
    data: e,
    columns: t,
    getCoreRowModel: Rn(),
    ...r && { getPaginationRowModel: da() },
    onSortingChange: c,
    getSortedRowModel: Tn(),
    onColumnFiltersChange: f,
    getFilteredRowModel: la(),
    onColumnVisibilityChange: m,
    onRowSelectionChange: _,
    state: {
      sorting: l,
      columnFilters: p,
      columnVisibility: v,
      rowSelection: h
    }
  });
  return /* @__PURE__ */ w("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ n(Qa, { table: E }),
    /* @__PURE__ */ w(Qt, { stickyHeader: s, children: [
      /* @__PURE__ */ n(te, { stickyHeader: s, children: E.getHeaderGroups().map((y) => /* @__PURE__ */ n(mt, { children: y.headers.map((T) => /* @__PURE__ */ n(Nt, { children: T.isPlaceholder ? void 0 : Yt(T.column.columnDef.header, T.getContext()) }, T.id)) }, y.id)) }),
      /* @__PURE__ */ n(ee, { children: (N = E.getRowModel().rows) != null && N.length ? E.getRowModel().rows.map((y) => /* @__PURE__ */ n(
        mt,
        {
          onClick: () => i(y, E),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((T) => /* @__PURE__ */ n(wt, { children: Yt(T.column.columnDef.cell, T.getContext()) }, T.id))
        },
        y.id
      )) : /* @__PURE__ */ n(mt, { children: /* @__PURE__ */ n(wt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    r && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ n(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.previousPage(),
          disabled: !E.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ n(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => E.nextPage(),
          disabled: !E.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && a && /* @__PURE__ */ n(ao, { table: E })
  ] });
}
function Js({ id: t, markdown: e, className: r, anchorTarget: a }) {
  const o = tt(
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
  return /* @__PURE__ */ n("div", { id: t, className: d("pr-twp tw-prose", r), children: /* @__PURE__ */ n(ua, { options: o, children: e }) });
}
var wo = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(wo || {});
function Ks({ id: t, label: e, groups: r }) {
  return /* @__PURE__ */ n("div", { id: t, children: /* @__PURE__ */ w(Wt, { children: [
    /* @__PURE__ */ n(we, { asChild: !0, children: /* @__PURE__ */ w(B, { variant: "default", children: [
      /* @__PURE__ */ n(Or, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ n(Jt, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ n(Xt, { children: r.map((a) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ n(le, { children: a.label }),
      /* @__PURE__ */ n(Vn, { children: a.items.map((o) => /* @__PURE__ */ n("div", { children: o.itemType === 0 ? /* @__PURE__ */ n(Ge, { onClick: o.onClick, children: o.label }) : /* @__PURE__ */ n(On, { onClick: o.onClick, value: o.label, children: o.label }) }, o.label)) }),
      /* @__PURE__ */ n(Zt, {})
    ] }, a.label)) })
  ] }) });
}
function Ws({ id: t, category: e, downloads: r, languages: a, moreInfoUrl: o }) {
  const s = new sa("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((l, c) => l + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ w(
    "div",
    {
      id: t,
      className: "tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ n("div", { className: "tw-flex", children: /* @__PURE__ */ n("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ n("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ n(Br, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ n("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: s })
          ] }),
          /* @__PURE__ */ n("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ n("div", { className: "tw-flex tw-gap-2", children: a.slice(0, 3).map((l) => /* @__PURE__ */ n("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: l.toUpperCase() }, l)) }),
          a.length > 3 && /* @__PURE__ */ w(
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
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ n(
              "a",
              {
                href: o,
                target: "_blank",
                rel: "noreferrer",
                className: "tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",
                children: "Website"
              }
            ),
            /* @__PURE__ */ n(Ir, { className: "tw-h-4 tw-w-4" })
          ] }),
          /* @__PURE__ */ w("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ n(
              "a",
              {
                href: "https://example.com",
                target: "_blank",
                rel: "noreferrer",
                className: "tw-flex tw-text-xs tw-font-semibold tw-text-foreground tw-underline",
                children: "Support"
              }
            ),
            /* @__PURE__ */ n(Ar, { className: "tw-h-4 tw-w-4" })
          ] })
        ] })
      ]
    }
  );
}
function lo({ id: t, versionHistory: e }) {
  const [r, a] = X(!1), o = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), p = new Date(o.getTime() - c.getTime()), f = p.getUTCFullYear() - 1970, v = p.getUTCMonth(), m = p.getUTCDate() - 1;
    let h = "";
    return f > 0 ? h = `${f.toString()} year${f === 1 ? "" : "s"} ago` : v > 0 ? h = `${v.toString()} month${v === 1 ? "" : "s"} ago` : m === 0 ? h = "today" : h = `${m.toString()} day${m === 1 ? "" : "s"} ago`, h;
  }
  const i = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ w("div", { id: t, children: [
    /* @__PURE__ */ n("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ n("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (r ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ w("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ n("div", { className: "tw-text-foreground", children: /* @__PURE__ */ n("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ n("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ w("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ w("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ n("div", { children: s(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: () => a(!r),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: r ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Zs({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: a,
  versionHistory: o
}) {
  const s = tt(() => ia(r), [r]), l = ((c) => {
    const p = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((f) => p.of(f));
  })(a);
  return /* @__PURE__ */ n("div", { id: t, className: "tw-border-t tw-py-2", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    /* @__PURE__ */ n(lo, { versionHistory: o }),
    /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ n("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ n("span", { children: "Publisher" }),
          /* @__PURE__ */ n("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ n("span", { children: "Size" }),
          /* @__PURE__ */ n("span", { className: "tw-font-semibold", children: s })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ n("span", { children: "Languages" }),
          /* @__PURE__ */ n("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const co = _t(
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
), ae = u.forwardRef(
  ({ className: t, variant: e, ...r }, a) => /* @__PURE__ */ n("div", { ref: a, className: d("pr-twp", co({ variant: e }), t), ...r })
);
ae.displayName = "Badge";
function po({
  entries: t,
  getEntriesCount: e = void 0,
  selected: r,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s = "No entries found",
  customSelectedText: i,
  isDisabled: l = !1,
  sortSelected: c = !1,
  icon: p = void 0,
  className: f = void 0
}) {
  const [v, m] = X(!1), h = W(
    (N) => {
      var T;
      const y = (T = t.find((R) => R.label === N)) == null ? void 0 : T.value;
      y && a(
        r.includes(y) ? r.filter((R) => R !== y) : [...r, y]
      );
    },
    [t, r, a]
  ), _ = () => i || o, E = tt(() => {
    if (!c) return t;
    const N = t.filter((T) => T.starred).sort((T, R) => T.label.localeCompare(R.label)), y = t.filter((T) => !T.starred).sort((T, R) => {
      const z = r.includes(T.value), Y = r.includes(R.value);
      return z && !Y ? -1 : !z && Y ? 1 : T.label.localeCompare(R.label);
    });
    return [...N, ...y];
  }, [t, r, c]);
  return /* @__PURE__ */ n("div", { className: f, children: /* @__PURE__ */ w(qe, { open: v, onOpenChange: m, children: [
    /* @__PURE__ */ n(Je, { asChild: !0, children: /* @__PURE__ */ w(
      B,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": v,
        className: d(
          "tw-w-full tw-justify-between",
          r.length > 0 && r.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: l,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ n("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ n("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: p }) }),
            /* @__PURE__ */ n(
              "div",
              {
                className: d({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": r.length === 0 || r.length === t.length
                }),
                children: /* @__PURE__ */ n("div", { className: "tw-font-normal", children: _() })
              }
            )
          ] }),
          /* @__PURE__ */ n(se, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(de, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(ce, { children: [
      /* @__PURE__ */ n(pe, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ w(ue, { children: [
        /* @__PURE__ */ n(me, { children: s }),
        /* @__PURE__ */ n(Ke, { children: E.map((N) => {
          const y = e ? e(N) : void 0;
          return /* @__PURE__ */ w(
            he,
            {
              value: N.label,
              onSelect: h,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                  zt,
                  {
                    className: d(
                      "tw-h-4 tw-w-4",
                      r.includes(N.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ n("div", { className: "tw-w-4", children: N.starred && /* @__PURE__ */ n(Pr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ n("div", { className: "tw-flex-grow", children: N.label }),
                e && /* @__PURE__ */ n("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: y })
              ]
            },
            N.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function Qs({
  entries: t,
  getEntriesCount: e,
  selected: r,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s,
  customSelectedText: i,
  isDisabled: l,
  sortSelected: c,
  icon: p,
  className: f,
  badgesPlaceholder: v
}) {
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ n(
      po,
      {
        entries: t,
        getEntriesCount: e,
        selected: r,
        onChange: a,
        placeholder: o,
        commandEmptyMessage: s,
        customSelectedText: i,
        isDisabled: l,
        sortSelected: c,
        icon: p,
        className: f
      }
    ),
    r.length > 0 ? /* @__PURE__ */ n("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: r.map((m) => {
      var h;
      return /* @__PURE__ */ w(ae, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ n(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(r.filter((_) => _ !== m)),
            children: /* @__PURE__ */ n(Fe, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (h = t.find((_) => _.value === m)) == null ? void 0 : h.label
      ] }, m);
    }) }) : /* @__PURE__ */ n(H, { children: v })
  ] });
}
function uo({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r
}) {
  const a = r["%webView_inventory_occurrences_table_header_reference%"], o = r["%webView_inventory_occurrences_table_header_occurrence%"], s = tt(() => {
    const i = [];
    return t.forEach((l) => {
      i.some((c) => Xe(c, l)) || i.push(l);
    }), i;
  }, [t]);
  return /* @__PURE__ */ w(Qt, { stickyHeader: !0, children: [
    /* @__PURE__ */ n(te, { stickyHeader: !0, children: /* @__PURE__ */ w(mt, { children: [
      /* @__PURE__ */ n(Nt, { children: a }),
      /* @__PURE__ */ n(Nt, { children: o })
    ] }) }),
    /* @__PURE__ */ n(ee, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ w(
      mt,
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ n(wt, { children: `${A.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ n(wt, { children: i.text })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const We = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Te.Root,
  {
    ref: r,
    className: d(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ n(
      Te.Indicator,
      {
        className: d("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ n(zt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
We.displayName = Te.Root.displayName;
const Hn = _t(
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
), mo = u.forwardRef(({ className: t, variant: e, size: r, ...a }, o) => /* @__PURE__ */ n(
  En.Root,
  {
    ref: o,
    className: d(Hn({ variant: e, size: r, className: t })),
    ...a
  }
));
mo.displayName = En.Root.displayName;
const Yn = u.createContext({
  size: "default",
  variant: "default"
}), Un = u.forwardRef(({ className: t, variant: e, size: r, children: a, ...o }, s) => {
  const i = J();
  return /* @__PURE__ */ n(
    ie.Root,
    {
      ref: s,
      className: d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: i,
      children: /* @__PURE__ */ n(
        Yn.Provider,
        {
          value: { variant: e, size: r },
          children: a
        }
      )
    }
  );
});
Un.displayName = ie.Root.displayName;
const ne = u.forwardRef(({ className: t, children: e, variant: r, size: a, ...o }, s) => {
  const i = u.useContext(Yn);
  return /* @__PURE__ */ n(
    ie.Item,
    {
      ref: s,
      className: d(
        Hn({
          variant: i.variant || r,
          size: i.size || a
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
ne.displayName = ie.Item.displayName;
const ge = (t) => t === "asc" ? /* @__PURE__ */ n(Gr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ n(Lr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ n(jr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), ti = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ w(B, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ge(e.getIsSorted())
  ] })
}), ho = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => /* @__PURE__ */ w(B, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    t,
    ge(r.getIsSorted())
  ] })
}), ei = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ n("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ w(B, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ge(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ n("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Ne = (t, e, r, a, o, s) => {
  let i = [...r];
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((p) => p !== c);
  }), a(i);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((p) => p !== c);
  }), s(l);
}, ni = (t, e, r, a, o) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ n("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ w(B, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    ge(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ w(Un, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ n(
        ne,
        {
          onClick: (c) => {
            c.stopPropagation(), Ne(
              [l],
              "approved",
              e,
              r,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ n(Fr, {})
        }
      ),
      /* @__PURE__ */ n(
        ne,
        {
          onClick: (c) => {
            c.stopPropagation(), Ne(
              [l],
              "unapproved",
              e,
              r,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ n(Xr, {})
        }
      ),
      /* @__PURE__ */ n(
        ne,
        {
          onClick: (c) => {
            c.stopPropagation(), Ne(
              [l],
              "unknown",
              e,
              r,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ n($r, {})
        }
      )
    ] });
  }
}), ri = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ai = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, oi = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, go = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", si = Object.freeze([
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
]), fo = (t, e, r) => {
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), r !== "" && (a = a.filter((o) => o.items[0].includes(r))), a;
}, bo = (t, e, r) => {
  const a = [];
  return t.forEach((o) => {
    const s = a.find(
      (i) => Xe(
        i.items,
        ve(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const i = {
        items: ve(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
        status: go(
          ve(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
          e,
          r
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
}, vt = (t, e) => t[e] ?? e;
function ii({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: r,
  additionalItemsLabels: a,
  approvedItems: o,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: c
}) {
  const p = vt(r, "%webView_inventory_all%"), f = vt(r, "%webView_inventory_approved%"), v = vt(r, "%webView_inventory_unapproved%"), m = vt(r, "%webView_inventory_unknown%"), h = vt(r, "%webView_inventory_scope_currentBook%"), _ = vt(r, "%webView_inventory_scope_chapter%"), E = vt(r, "%webView_inventory_filter_text%"), N = vt(
    r,
    "%webView_inventory_show_additional_items%"
  ), [y, T] = X(!1), [R, z] = X("all"), [Y, gt] = X(""), [lt, S] = X([]), b = tt(() => t.length === 0 ? [] : bo(t, o, s), [t, o, s]), $ = tt(() => {
    if (y) return b;
    const C = [];
    return b.forEach((g) => {
      const M = g.items[0], k = C.find(
        (V) => V.items[0] === M
      );
      k ? (k.count += g.count, k.occurrences = k.occurrences.concat(g.occurrences)) : C.push({
        items: [M],
        count: g.count,
        occurrences: g.occurrences,
        status: g.status
      });
    }), C;
  }, [y, b]), D = tt(() => fo($, R, Y), [$, R, Y]), nt = tt(() => {
    var M, k;
    if (!y) return c;
    const C = (M = a == null ? void 0 : a.tableHeaders) == null ? void 0 : M.length;
    if (!C) return c;
    const g = [];
    for (let V = 0; V < C; V++)
      g.push(
        ho(
          ((k = a == null ? void 0 : a.tableHeaders) == null ? void 0 : k[V]) || "Additional Item",
          V + 1
        )
      );
    return [...g, ...c];
  }, [a == null ? void 0 : a.tableHeaders, c, y]);
  ut(() => {
    D.length === 0 ? S([]) : D.length === 1 && S(D[0].items);
  }, [D]);
  const St = (C, g) => {
    g.setRowSelection(() => {
      const M = {};
      return M[C.index] = !0, M;
    }), S(C.original.items);
  }, ft = (C) => {
    if (C === "book" || C === "chapter")
      l(C);
    else
      throw new Error(`Invalid scope value: ${C}`);
  }, et = (C) => {
    if (C === "all" || C === "approved" || C === "unapproved" || C === "unknown")
      z(C);
    else
      throw new Error(`Invalid status filter value: ${C}`);
  }, K = tt(() => {
    if ($.length === 0 || lt.length === 0) return [];
    const C = $.filter((g) => Xe(
      y ? g.items : [g.items[0]],
      lt
    ));
    if (C.length > 1) throw new Error("Selected item is not unique");
    return C.length === 0 ? [] : C[0].occurrences;
  }, [lt, y, $]);
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ w(
        Vt,
        {
          onValueChange: (C) => et(C),
          defaultValue: R,
          children: [
            /* @__PURE__ */ n(kt, { className: "tw-m-1", children: /* @__PURE__ */ n(Mt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(Ct, { children: [
              /* @__PURE__ */ n(it, { value: "all", children: p }),
              /* @__PURE__ */ n(it, { value: "approved", children: f }),
              /* @__PURE__ */ n(it, { value: "unapproved", children: v }),
              /* @__PURE__ */ n(it, { value: "unknown", children: m })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(Vt, { onValueChange: (C) => ft(C), defaultValue: i, children: [
        /* @__PURE__ */ n(kt, { className: "tw-m-1", children: /* @__PURE__ */ n(Mt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(Ct, { children: [
          /* @__PURE__ */ n(it, { value: "book", children: h }),
          /* @__PURE__ */ n(it, { value: "chapter", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ n(
        Ft,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: E,
          value: Y,
          onChange: (C) => {
            gt(C.target.value);
          }
        }
      ),
      a && /* @__PURE__ */ w("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ n(
          We,
          {
            className: "tw-m-1",
            checked: y,
            onCheckedChange: (C) => {
              T(C);
            }
          }
        ),
        /* @__PURE__ */ n(H, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? N })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ n(
      io,
      {
        columns: nt,
        data: D,
        onRowClickHandler: St,
        stickyHeader: !0
      }
    ) }),
    K.length > 0 && /* @__PURE__ */ n("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ n(
      uo,
      {
        occurrenceData: K,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] });
}
const Ze = u.forwardRef(({ className: t, orientation: e = "horizontal", decorative: r = !0, ...a }, o) => /* @__PURE__ */ n(
  Dn.Root,
  {
    ref: o,
    decorative: r,
    orientation: e,
    className: d(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...a
  }
));
Ze.displayName = Dn.Root.displayName;
function mn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const Qe = Kt.Provider, tn = Kt.Root, en = Kt.Trigger, fe = u.forwardRef(({ className: t, sideOffset: e = 4, ...r }, a) => /* @__PURE__ */ n(
  Kt.Content,
  {
    ref: a,
    sideOffset: e,
    className: d(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...r
  }
));
fe.displayName = Kt.Content.displayName;
const vo = "16rem", xo = "3rem", qn = u.createContext(void 0);
function be() {
  const t = u.useContext(qn);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Jn = u.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: r,
    className: a,
    style: o,
    children: s,
    side: i = "primary",
    ...l
  }, c) => {
    const [p, f] = u.useState(t), v = e ?? p, m = u.useCallback(
      (R) => {
        const z = typeof R == "function" ? R(v) : R;
        r ? r(z) : f(z);
      },
      [r, v]
    ), h = u.useCallback(() => m((R) => !R), [m]), _ = v ? "expanded" : "collapsed", y = J() === "ltr" ? i : i === "primary" ? "secondary" : "primary", T = u.useMemo(
      () => ({
        state: _,
        open: v,
        setOpen: m,
        toggleSidebar: h,
        side: y
      }),
      [_, v, m, h, y]
    );
    return /* @__PURE__ */ n(qn.Provider, { value: T, children: /* @__PURE__ */ n(Qe, { delayDuration: 0, children: /* @__PURE__ */ n(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": vo,
            "--sidebar-width-icon": xo,
            ...o
          }
        ),
        className: d(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          a
        ),
        ref: c,
        ...l,
        children: s
      }
    ) }) });
  }
);
Jn.displayName = "SidebarProvider";
const Kn = u.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: r, children: a, ...o }, s) => {
  const i = be();
  return e === "none" ? /* @__PURE__ */ n(
    "div",
    {
      className: d(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        r
      ),
      ref: s,
      ...o,
      children: a
    }
  ) : /* @__PURE__ */ w(
    "div",
    {
      ref: s,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": i.side,
      children: [
        /* @__PURE__ */ n(
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
        /* @__PURE__ */ n(
          "div",
          {
            className: d(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              r
            ),
            ...o,
            children: /* @__PURE__ */ n(
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
Kn.displayName = "Sidebar";
const yo = u.forwardRef(({ className: t, onClick: e, ...r }, a) => {
  const o = be();
  return /* @__PURE__ */ w(
    B,
    {
      ref: a,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: d("tw-h-7 tw-w-7", t),
      onClick: (s) => {
        e == null || e(s), o.toggleSidebar();
      },
      ...r,
      children: [
        o.side === "primary" ? /* @__PURE__ */ n(Hr, {}) : /* @__PURE__ */ n(Yr, {}),
        /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
yo.displayName = "SidebarTrigger";
const No = u.forwardRef(
  ({ className: t, ...e }, r) => {
    const { toggleSidebar: a } = be();
    return /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        ref: r,
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
No.displayName = "SidebarRail";
const Wn = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "main",
    {
      ref: r,
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
Wn.displayName = "SidebarInset";
const ko = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Ft,
  {
    ref: r,
    "data-sidebar": "input",
    className: d(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
ko.displayName = "SidebarInput";
const Co = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      "data-sidebar": "header",
      className: d("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Co.displayName = "SidebarHeader";
const _o = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      "data-sidebar": "footer",
      className: d("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
_o.displayName = "SidebarFooter";
const So = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Ze,
  {
    ref: r,
    "data-sidebar": "separator",
    className: d("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
So.displayName = "SidebarSeparator";
const Zn = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      "data-sidebar": "content",
      className: d(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
Zn.displayName = "SidebarContent";
const Ve = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      "data-sidebar": "group",
      className: d("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Ve.displayName = "SidebarGroup";
const Me = u.forwardRef(({ className: t, asChild: e = !1, ...r }, a) => /* @__PURE__ */ n(
  e ? At : "div",
  {
    ref: a,
    "data-sidebar": "group-label",
    className: d(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...r
  }
));
Me.displayName = "SidebarGroupLabel";
const To = u.forwardRef(({ className: t, asChild: e = !1, ...r }, a) => /* @__PURE__ */ n(
  e ? At : "button",
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
    ...r
  }
));
To.displayName = "SidebarGroupAction";
const ze = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      "data-sidebar": "group-content",
      className: d("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
ze.displayName = "SidebarGroupContent";
const Qn = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "ul",
    {
      ref: r,
      "data-sidebar": "menu",
      className: d("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
Qn.displayName = "SidebarMenu";
const tr = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "li",
    {
      ref: r,
      "data-sidebar": "menu-item",
      className: d("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
tr.displayName = "SidebarMenuItem";
const Ro = _t(
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
), er = u.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: r = "default",
    size: a = "default",
    tooltip: o,
    className: s,
    ...i
  }, l) => {
    const c = t ? At : "button", { state: p } = be(), f = /* @__PURE__ */ n(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: d(Ro({ variant: r, size: a }), s),
        ...i
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ w(tn, { children: [
      /* @__PURE__ */ n(en, { asChild: !0, children: f }),
      /* @__PURE__ */ n(fe, { side: "right", align: "center", hidden: p !== "collapsed", ...o })
    ] })) : f;
  }
);
er.displayName = "SidebarMenuButton";
const Eo = u.forwardRef(({ className: t, asChild: e = !1, showOnHover: r = !1, ...a }, o) => /* @__PURE__ */ n(
  e ? At : "button",
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
      r && "tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",
      t
    ),
    ...a
  }
));
Eo.displayName = "SidebarMenuAction";
const Do = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
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
Do.displayName = "SidebarMenuBadge";
const Vo = u.forwardRef(({ className: t, showIcon: e = !1, ...r }, a) => {
  const o = u.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ n(mn, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ n(
          mn,
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
Vo.displayName = "SidebarMenuSkeleton";
const Mo = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "ul",
    {
      ref: r,
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
Mo.displayName = "SidebarMenuSub";
const zo = u.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ n("li", { ref: e, ...t })
);
zo.displayName = "SidebarMenuSubItem";
const Oo = u.forwardRef(({ asChild: t = !1, size: e = "md", isActive: r, className: a, ...o }, s) => /* @__PURE__ */ n(
  t ? At : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": r,
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
Oo.displayName = "SidebarMenuSubButton";
function Bo({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: a,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: c
}) {
  const p = W(
    (m, h) => {
      a(m, h);
    },
    [a]
  ), f = W(
    (m) => {
      const h = r.find((_) => _.projectId === m);
      return h ? h.projectName : m;
    },
    [r]
  ), v = W(
    (m) => !o.projectId && m === o.label,
    [o]
  );
  return /* @__PURE__ */ n(
    Kn,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ w(Zn, { children: [
        /* @__PURE__ */ w(Ve, { children: [
          /* @__PURE__ */ n(Me, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ n(ze, { children: /* @__PURE__ */ n(Qn, { children: Object.entries(e).map(([m, h]) => /* @__PURE__ */ n(tr, { children: /* @__PURE__ */ n(
            er,
            {
              onClick: () => p(m),
              isActive: v(m),
              children: /* @__PURE__ */ n("span", { className: "tw-pl-3", children: h })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ w(Ve, { children: [
          /* @__PURE__ */ n(Me, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ n(ze, { className: "tw-pl-3", children: /* @__PURE__ */ n(
            De,
            {
              buttonVariant: "ghost",
              buttonClassName: d("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: r.flatMap((m) => m.projectId),
              getOptionLabel: (m) => f(m),
              buttonPlaceholder: l,
              onChange: (m) => {
                const h = f(m);
                p(h, m);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ n(Cn, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
function nn({
  value: t,
  onSearch: e,
  placeholder: r,
  isFullWidth: a,
  className: o,
  isDisabled: s = !1
}) {
  const i = J();
  return /* @__PURE__ */ w("div", { className: d("tw-relative", { "tw-w-full": a }, o), children: [
    /* @__PURE__ */ n(
      Nn,
      {
        className: d(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": i === "rtl" },
          { "tw-left-3": i === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ n(
      Ft,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: r,
        value: t,
        onChange: (l) => e(l.target.value),
        disabled: s
      }
    ),
    t && /* @__PURE__ */ w(
      B,
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
          /* @__PURE__ */ n(Fe, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
function wi({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: p,
  buttonPlaceholderText: f
}) {
  return /* @__PURE__ */ w("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ n("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ n(
      nn,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      Jn,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ n(
            Bo,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: o,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: p,
              buttonPlaceholderText: f
            }
          ),
          /* @__PURE__ */ n(Wn, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
const xt = "scrBook", Io = "scrRef", Et = "source", Ao = "details", Po = "Scripture Reference", Fo = "Scripture Book", nr = "Type", Xo = "Details";
function $o(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: xt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Po,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? A.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === xt ? Bt(o.start) : void 0;
      },
      getGroupingValue: (a) => A.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => Se(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => Bt(a.start),
      id: Io,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : Bt(o.start);
      },
      sortingFn: (a, o) => Se(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: Et,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? nr : void 0,
      cell: (a) => r || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: Ao,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Xo,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const Go = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || Se(t.start, t.end) === 0 ? `${xe(t.start)}+${e}` : `${xe(t.start)}+${e}-${xe(t.end)}+${r}`;
}, hn = (t) => `${Go({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function li({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, p] = X([]), [f, v] = X([{ id: xt, desc: !1 }]), [m, h] = X({}), _ = tt(
    () => t.flatMap((S) => S.data.map((b) => ({
      ...b,
      source: S.source
    }))),
    [t]
  ), E = tt(
    () => $o(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: s,
        detailsColumnName: i
      },
      r
    ),
    [a, s, i, r]
  );
  ut(() => {
    c.includes(Et) ? v([
      { id: Et, desc: !1 },
      { id: xt, desc: !1 }
    ]) : v([{ id: xt, desc: !1 }]);
  }, [c]);
  const N = Sn({
    data: _,
    columns: E,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: m
    },
    onGroupingChange: p,
    onSortingChange: v,
    onRowSelectionChange: h,
    getExpandedRowModel: pa(),
    getGroupedRowModel: ca(),
    getCoreRowModel: Rn(),
    getSortedRowModel: Tn(),
    getRowId: hn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  ut(() => {
    if (l) {
      const S = N.getSelectedRowModel().rowsById, b = Object.keys(S);
      if (b.length === 1) {
        const $ = _.find((D) => hn(D) === b[0]) || void 0;
        $ && l($);
      }
    }
  }, [m, _, l, N]);
  const y = o ?? Fo, T = s ?? nr, R = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [xt] },
    { label: `Group by ${T}`, value: [Et] },
    {
      label: `Group by ${y} and ${T}`,
      value: [xt, Et]
    },
    {
      label: `Group by ${T} and ${y}`,
      value: [Et, xt]
    }
  ], z = (S) => {
    p(JSON.parse(S));
  }, Y = (S, b) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()(b);
  }, gt = (S, b) => S.getIsGrouped() ? "" : d("banded-row", b % 2 === 0 ? "even" : "odd"), lt = (S, b, $) => {
    if (!((S == null ? void 0 : S.length) === 0 || b.depth < $.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ w(
      Vt,
      {
        value: JSON.stringify(c),
        onValueChange: (S) => {
          z(S);
        },
        children: [
          /* @__PURE__ */ n(kt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ n(Mt, {}) }),
          /* @__PURE__ */ n(Ct, { position: "item-aligned", children: /* @__PURE__ */ n(to, { children: R.map((S) => /* @__PURE__ */ n(it, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(Qt, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ n(te, { children: N.getHeaderGroups().map((S) => /* @__PURE__ */ n(mt, { children: S.headers.filter((b) => b.column.columnDef.header).map((b) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ n(Nt, { colSpan: b.colSpan, className: "top-0 tw-sticky", children: b.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          b.column.getCanGroup() ? /* @__PURE__ */ n(
            B,
            {
              variant: "ghost",
              title: `Toggle grouping by ${b.column.columnDef.header}`,
              onClick: b.column.getToggleGroupingHandler(),
              type: "button",
              children: b.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Yt(b.column.columnDef.header, b.getContext())
        ] }) }, b.id)
      )) }, S.id)) }),
      /* @__PURE__ */ n(ee, { children: N.getRowModel().rows.map((S, b) => {
        const $ = J();
        return /* @__PURE__ */ n(
          mt,
          {
            "data-state": S.getIsSelected() ? "selected" : "",
            className: d(gt(S, b)),
            onClick: (D) => Y(S, D),
            children: S.getVisibleCells().map((D) => {
              if (!(D.getIsPlaceholder() || D.column.columnDef.enableGrouping && !D.getIsGrouped() && (D.column.columnDef.id !== Et || !r)))
                return /* @__PURE__ */ n(
                  wt,
                  {
                    className: d(
                      D.column.columnDef.id,
                      "tw-p-[1px]",
                      lt(c, S, D)
                    ),
                    children: D.getIsGrouped() ? /* @__PURE__ */ w(
                      B,
                      {
                        variant: "link",
                        onClick: S.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          S.getIsExpanded() && /* @__PURE__ */ n(Jt, {}),
                          !S.getIsExpanded() && ($ === "ltr" ? /* @__PURE__ */ n(Ae, {}) : /* @__PURE__ */ n(Ur, {})),
                          " ",
                          Yt(D.column.columnDef.cell, D.getContext()),
                          " (",
                          S.subRows.length,
                          ")"
                        ]
                      }
                    ) : Yt(D.column.columnDef.cell, D.getContext())
                  },
                  D.id
                );
            })
          },
          S.id
        );
      }) })
    ] })
  ] });
}
var yt = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(yt || {});
const Lo = (t, e, r, a, o) => {
  switch (t) {
    case "OT":
      return e ?? "Old Testament";
    case "NT":
      return r ?? "New Testament";
    case "DC":
      return a ?? "Deuterocanon";
    case "Extra":
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, jo = (t, e, r, a, o) => {
  switch (t) {
    case "OT":
      return e ?? "OT";
    case "NT":
      return r ?? "NT";
    case "DC":
      return a ?? "DC";
    case "Extra":
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Ot = (t) => {
  if (A.isBookOT(t)) return "OT";
  if (A.isBookNT(t)) return "NT";
  if (A.isBookDC(t)) return "DC";
  if (A.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, rn = (t, e) => t.filter((r) => {
  try {
    return Ot(r) === e;
  } catch {
    return !1;
  }
}), rr = (t, e, r) => rn(t, e).every((a) => r.includes(a));
function Ho({
  bookId: t,
  selectedBookIds: e,
  toggleBook: r,
  lastKeyEventShiftKey: a,
  localizedBookNames: o
}) {
  var l, c;
  const s = Q(!1), i = Q();
  return /* @__PURE__ */ w(
    he,
    {
      value: t,
      className: "tw-flex tw-items-center",
      onSelect: () => {
        s.current || (r(t, a.current), a.current = !1), i.current && clearTimeout(i.current), i.current = setTimeout(() => {
          s.current = !1;
        }, 100);
      },
      onMouseDown: (p) => {
        p.preventDefault(), s.current = !0, r(t, p.shiftKey);
      },
      role: "option",
      "aria-selected": e.includes(t),
      "aria-label": `${A.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
      children: [
        /* @__PURE__ */ n(
          zt,
          {
            className: d(
              "tw-me-2 tw-h-4 tw-w-4",
              e.includes(t) ? "tw-opacity-100" : "tw-opacity-0"
            )
          }
        ),
        /* @__PURE__ */ n(
          "span",
          {
            className: d(
              "tw-flex-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-border-s-red-200": Ot(t) === yt.OT,
                "tw-border-s-purple-200": Ot(t) === yt.NT,
                "tw-border-s-indigo-200": Ot(t) === yt.DC,
                "tw-border-s-yellow-200": Ot(t) === yt.Extra
              }
            ),
            children: o && ((l = o.get(t)) == null ? void 0 : l.localizedName) || A.bookIdToEnglishName(t)
          }
        ),
        /* @__PURE__ */ n("span", { className: "tw-ml-2 tw-text-xs tw-text-muted-foreground", children: o && ((c = o.get(t)) == null ? void 0 : c.localizedId) || t.toLocaleUpperCase() })
      ]
    },
    t
  );
}
function Yo({
  section: t,
  availableBookIds: e,
  selectedBookIds: r,
  onToggle: a,
  localizedStrings: o
}) {
  const s = rn(e, t).length === 0, i = o["%scripture_section_ot_short%"], l = o["%scripture_section_nt_short%"], c = o["%scripture_section_dc_short%"], p = o["%scripture_section_extra_short%"];
  return /* @__PURE__ */ n(
    B,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(t),
      className: d(
        rr(e, t, r) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: jo(
        t,
        i,
        l,
        c,
        p
      )
    }
  );
}
const gn = 5, ke = 6;
function Uo({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: r,
  localizedStrings: a,
  localizedBookNames: o
}) {
  const s = a["%webView_book_selector_books_selected%"], i = a["%webView_book_selector_select_books%"], l = a["%webView_book_selector_search_books%"], c = a["%webView_book_selector_select_all%"], p = a["%webView_book_selector_clear_all%"], f = a["%webView_book_selector_no_book_found%"], v = a["%webView_book_selector_more%"], m = a["%scripture_section_ot_long%"], h = a["%scripture_section_nt_long%"], _ = a["%scripture_section_dc_long%"], E = a["%scripture_section_extra_long%"], [N, y] = X(!1), T = Q(void 0), R = Q(!1);
  if (t.length !== A.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const z = tt(() => A.allBookIds.filter(
    (b, $) => t[$] === "1" && !A.isObsolete(A.bookIdToNumber(b))
  ), [t]), Y = W(
    (b, $ = !1) => {
      if (!$ || !T.current) {
        r(
          e.includes(b) ? e.filter((K) => K !== b) : [...e, b]
        ), T.current = b;
        return;
      }
      const D = z.findIndex((K) => K === T.current), nt = z.findIndex((K) => K === b);
      if (D === -1 || nt === -1) return;
      const [St, ft] = [
        Math.min(D, nt),
        Math.max(D, nt)
      ], et = z.slice(St, ft + 1).map((K) => K);
      r(
        e.includes(b) ? e.filter((K) => !et.includes(K)) : [.../* @__PURE__ */ new Set([...e, ...et])]
      );
    },
    [e, r, z]
  ), gt = W(
    (b) => {
      const $ = rn(z, b).map((D) => D);
      r(
        rr(z, b, e) ? e.filter((D) => !$.includes(D)) : [.../* @__PURE__ */ new Set([...e, ...$])]
      );
    },
    [e, r, z]
  ), lt = () => {
    r(z.map((b) => b));
  }, S = () => {
    r([]);
  };
  return /* @__PURE__ */ w("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ n("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(yt).map((b) => /* @__PURE__ */ n(
      Yo,
      {
        section: b,
        availableBookIds: z,
        selectedBookIds: e,
        onToggle: gt,
        localizedStrings: a
      },
      b
    )) }),
    /* @__PURE__ */ w(qe, { open: N, onOpenChange: y, children: [
      /* @__PURE__ */ n(Je, { asChild: !0, children: /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": N,
          className: "tw-max-w-64 tw-justify-between",
          children: [
            e.length > 0 ? `${s}: ${e.length}` : i,
            /* @__PURE__ */ n(se, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ n(de, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ w(
        ce,
        {
          onKeyDown: (b) => {
            b.key === "Enter" && (R.current = b.shiftKey);
          },
          children: [
            /* @__PURE__ */ n(pe, { placeholder: l }),
            /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: lt, children: c }),
              /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: S, children: p })
            ] }),
            /* @__PURE__ */ w(ue, { children: [
              /* @__PURE__ */ n(me, { children: f }),
              Object.values(yt).map((b, $) => {
                const D = z.filter(
                  (nt) => Ot(nt) === b
                );
                if (D.length !== 0)
                  return /* @__PURE__ */ w(yn, { children: [
                    /* @__PURE__ */ n(
                      Ke,
                      {
                        heading: Lo(
                          b,
                          m,
                          h,
                          _,
                          E
                        ),
                        children: D.map((nt) => /* @__PURE__ */ n(
                          Ho,
                          {
                            bookId: nt,
                            selectedBookIds: e,
                            toggleBook: Y,
                            lastKeyEventShiftKey: R,
                            localizedBookNames: o
                          },
                          nt
                        ))
                      }
                    ),
                    $ < Object.values(yt).length - 1 && /* @__PURE__ */ n(Gn, {})
                  ] }, b);
              })
            ] })
          ]
        }
      ) })
    ] }),
    e.length > 0 && /* @__PURE__ */ w("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === ke ? ke : gn
      ).map((b) => {
        var $;
        return /* @__PURE__ */ n(ae, { className: "hover:tw-bg-secondary", variant: "secondary", children: o && (($ = o.get(b)) == null ? void 0 : $.localizedName) || A.bookIdToEnglishName(b) || b }, b);
      }),
      e.length > ke && /* @__PURE__ */ n(
        ae,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - gn} ${v}`
        }
      )
    ] })
  ] });
}
const di = Object.freeze([
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
]), Tt = (t, e) => t[e] ?? e;
function ci({
  scope: t,
  availableScopes: e,
  onScopeChange: r,
  availableBookInfo: a,
  selectedBookIds: o,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l
}) {
  const c = Tt(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = Tt(
    i,
    "%webView_scope_selector_current_verse%"
  ), f = Tt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), v = Tt(i, "%webView_scope_selector_current_book%"), m = Tt(i, "%webView_scope_selector_choose_books%"), h = Tt(i, "%webView_scope_selector_scope%"), _ = Tt(i, "%webView_scope_selector_select_books%"), E = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: v, id: "scope-book" },
    { value: "selectedBooks", label: m, id: "scope-selected" }
  ], N = e ? E.filter((y) => e.includes(y.value)) : E;
  return /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ n(H, { children: h }),
      /* @__PURE__ */ n(
        Ue,
        {
          value: t,
          onValueChange: r,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: N.map(({ value: y, label: T, id: R }) => /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ n(re, { className: "tw-me-2", value: y, id: R }),
            /* @__PURE__ */ n(H, { htmlFor: R, children: T })
          ] }, R))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ w("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ n(H, { children: _ }),
      /* @__PURE__ */ n(
        Uo,
        {
          availableBookInfo: a,
          selectedBookIds: o,
          onChangeSelectedBookIds: s,
          localizedStrings: i,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const Ce = {
  [F("undefined")]: "Ø",
  [F(0)]: "A",
  [F(1)]: "B",
  [F(2)]: "C",
  [F(3)]: "D",
  [F(4)]: "E",
  [F(5)]: "F",
  [F(6)]: "G",
  [F(7)]: "H",
  [F(8)]: "I",
  [F(9)]: "J",
  [F(10)]: "K",
  [F(11)]: "L",
  [F(12)]: "M",
  [F(13)]: "N",
  [F(14)]: "O",
  [F(15)]: "P",
  [F(16)]: "Q",
  [F(17)]: "R",
  [F(18)]: "S",
  [F(19)]: "T",
  [F(20)]: "U",
  [F(21)]: "V",
  [F(22)]: "W",
  [F(23)]: "X",
  [F(24)]: "Y",
  [F(25)]: "Z"
};
function pi({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: a = {},
  size: o,
  className: s
}) {
  const i = {
    ...Ce,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([c, p]) => [
          c,
          c === p && c in Ce ? Ce[c] : p
        ]
      )
    )
  }, l = J();
  return /* @__PURE__ */ w(
    Vt,
    {
      value: `${e}`,
      onValueChange: (c) => r(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ n(kt, { size: o, className: d("pr-twp tw-w-auto", s), children: /* @__PURE__ */ n(
          Mt,
          {
            placeholder: i[F(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ n(
          Ct,
          {
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ n(it, { value: `${c}`, children: i[F(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function ui({ children: t }) {
  return /* @__PURE__ */ n("div", { className: "pr-twp tw-grid", children: t });
}
function mi({
  primary: t,
  secondary: e,
  children: r,
  isLoading: a = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ n("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ n("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    a ? /* @__PURE__ */ n("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ n("div", { children: r })
  ] });
}
function hi({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ n("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ n("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ n(Ze, {}) : ""
  ] });
}
function ar(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : r[0];
}
function oe({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ n(
    "img",
    {
      className: d("tw-max-h-5 tw-max-w-5", r ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const or = (t, e, r, a) => r ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === r || s === r
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ w(tn, { children: [
  /* @__PURE__ */ n(en, { asChild: !0, children: "command" in l ? /* @__PURE__ */ w(
    It,
    {
      onClick: () => {
        a(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ n(oe, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ n(oe, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ w(xa, { children: [
    /* @__PURE__ */ n(Mn, { children: l.label }),
    /* @__PURE__ */ n(va, { children: /* @__PURE__ */ n(zn, { children: or(
      t,
      e,
      ar(t, l.id),
      a
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ n(fe, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function fn({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: a,
  className: o,
  variant: s,
  id: i
}) {
  return /* @__PURE__ */ w(Wt, { variant: s, children: [
    /* @__PURE__ */ n(we, { "aria-label": r, className: o, asChild: !0, id: i, children: /* @__PURE__ */ n(B, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ n(qr, {}) }) }),
    /* @__PURE__ */ n(Xt, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, l]) => typeof l == "object").sort(([, l], [, c]) => typeof l == "boolean" || typeof c == "boolean" ? 0 : l.order - c.order).map(([l], c, p) => /* @__PURE__ */ w(yn, { children: [
      /* @__PURE__ */ n(Vn, { children: /* @__PURE__ */ n(Qe, { children: or(e.groups, e.items, l, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ n(Zt, {})
    ] }, l)) })
  ] });
}
function gi({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: r,
  tabViewMenuData: a,
  id: o,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: c
}) {
  return /* @__PURE__ */ w(
    "div",
    {
      className: d(
        "tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",
        s
      ),
      id: o,
      children: [
        r && /* @__PURE__ */ n(
          fn,
          {
            onSelectMenuItem: t,
            menuData: r,
            tabLabel: "Project",
            icon: /* @__PURE__ */ n(Jr, {}),
            className: "tw-h-full tw-w-8"
          }
        ),
        /* @__PURE__ */ n("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
        /* @__PURE__ */ n("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          a && /* @__PURE__ */ n(
            fn,
            {
              onSelectMenuItem: e,
              menuData: a,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ n(Kr, {}),
              className: "tw-h-full"
            }
          ),
          c
        ] })
      ]
    }
  );
}
const sr = u.forwardRef(({ className: t, ...e }, r) => {
  const a = J();
  return /* @__PURE__ */ n(
    ot.Root,
    {
      orientation: "vertical",
      ref: r,
      className: d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
sr.displayName = ot.List.displayName;
const ir = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ot.List,
  {
    ref: r,
    className: d(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
ir.displayName = ot.List.displayName;
const qo = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ot.Trigger,
  {
    ref: r,
    ...e,
    className: d(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), wr = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ot.Content,
  {
    ref: r,
    className: d(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
wr.displayName = ot.Content.displayName;
function fi({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: a,
  headerTitle: o,
  searchClassName: s
}) {
  return /* @__PURE__ */ w("div", { className: "pr-twp", children: [
    /* @__PURE__ */ w("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ n("h1", { children: o }) : "",
      /* @__PURE__ */ n(
        nn,
        {
          className: s,
          value: e,
          onSearch: r,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ w(sr, { children: [
      /* @__PURE__ */ n(ir, { children: t.map((i) => /* @__PURE__ */ n(qo, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ n(wr, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
function Jo({ ...t }) {
  return /* @__PURE__ */ n(j.Menu, { ...t });
}
function Ko({ ...t }) {
  return /* @__PURE__ */ n(j.Sub, { "data-slot": "menubar-sub", ...t });
}
const lr = u.forwardRef(({ className: t, variant: e = "default", ...r }, a) => {
  const o = u.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ n($e.Provider, { value: o, children: /* @__PURE__ */ n(
    j.Root,
    {
      ref: a,
      className: d(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...r
    }
  ) });
});
lr.displayName = j.Root.displayName;
const dr = u.forwardRef(({ className: t, ...e }, r) => {
  const a = ct();
  return /* @__PURE__ */ n(
    j.Trigger,
    {
      ref: r,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        bt({ variant: a.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
dr.displayName = j.Trigger.displayName;
const cr = u.forwardRef(({ className: t, inset: e, children: r, ...a }, o) => {
  const s = ct();
  return /* @__PURE__ */ w(
    j.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        bt({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(Ae, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
cr.displayName = j.SubTrigger.displayName;
const pr = u.forwardRef(({ className: t, ...e }, r) => {
  const a = ct();
  return /* @__PURE__ */ n(
    j.SubContent,
    {
      ref: r,
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
pr.displayName = j.SubContent.displayName;
const ur = u.forwardRef(({ className: t, align: e = "start", alignOffset: r = -4, sideOffset: a = 8, ...o }, s) => {
  const i = ct();
  return /* @__PURE__ */ n(j.Portal, { children: /* @__PURE__ */ n(
    j.Content,
    {
      ref: s,
      align: e,
      alignOffset: r,
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
ur.displayName = j.Content.displayName;
const mr = u.forwardRef(({ className: t, inset: e, ...r }, a) => {
  const o = ct();
  return /* @__PURE__ */ n(
    j.Item,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        bt({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...r
    }
  );
});
mr.displayName = j.Item.displayName;
const Wo = u.forwardRef(({ className: t, children: e, checked: r, ...a }, o) => {
  const s = ct();
  return /* @__PURE__ */ w(
    j.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        bt({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ n(j.ItemIndicator, { children: /* @__PURE__ */ n(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Wo.displayName = j.CheckboxItem.displayName;
const Zo = u.forwardRef(({ className: t, children: e, ...r }, a) => {
  const o = ct();
  return /* @__PURE__ */ w(
    j.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        bt({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ n(j.ItemIndicator, { children: /* @__PURE__ */ n(Pe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Zo.displayName = j.RadioItem.displayName;
const Qo = u.forwardRef(({ className: t, inset: e, ...r }, a) => /* @__PURE__ */ n(
  j.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...r
  }
));
Qo.displayName = j.Label.displayName;
const hr = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  j.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
hr.displayName = j.Separator.displayName;
const jt = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, gr = (t, e, r, a) => {
  if (!r) return;
  const o = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === r || s === r
  ).sort(([, s], [, i]) => s.order - i.order);
  return o.flatMap(([s], i) => {
    const l = e.filter((p) => p.group === s).sort((p, f) => p.order - f.order).map((p) => /* @__PURE__ */ w(tn, { children: [
      /* @__PURE__ */ n(en, { asChild: !0, children: "command" in p ? /* @__PURE__ */ w(
        mr,
        {
          onClick: () => {
            a(p);
          },
          children: [
            p.iconPathBefore && /* @__PURE__ */ n(oe, { icon: p.iconPathBefore, menuLabel: p.label, leading: !0 }),
            p.label,
            p.iconPathAfter && /* @__PURE__ */ n(oe, { icon: p.iconPathAfter, menuLabel: p.label })
          ]
        },
        `menubar-item-${p.label}-${p.command}`
      ) : /* @__PURE__ */ w(Ko, { children: [
        /* @__PURE__ */ n(cr, { children: p.label }),
        /* @__PURE__ */ n(pr, { children: gr(
          t,
          e,
          ar(t, p.id),
          a
        ) })
      ] }, `menubar-sub-${p.label}-${p.id}`) }),
      p.tooltip && /* @__PURE__ */ n(fe, { children: p.tooltip })
    ] }, `tooltip-${p.label}-${"command" in p ? p.command : p.id}`)), c = [...l];
    return l.length > 0 && i < o.length - 1 && c.push(/* @__PURE__ */ n(hr, {}, `separator-${s}`)), c;
  });
};
function ts({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: r,
  variant: a
}) {
  const o = Q(void 0), s = Q(void 0), i = Q(void 0), l = Q(void 0), c = Q(void 0), p = (f) => {
    switch (f) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (ma(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (f, v) => {
    var _, E, N, y;
    f.preventDefault();
    const m = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, h = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (v.hotkey) {
      case "alt":
        jt(s, [m]);
        break;
      case "alt+p":
        (_ = s.current) == null || _.focus(), jt(s, [m, h]);
        break;
      case "alt+l":
        (E = i.current) == null || E.focus(), jt(i, [m, h]);
        break;
      case "alt+n":
        (N = l.current) == null || N.focus(), jt(l, [m, h]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), jt(c, [m, h]);
        break;
    }
  }), ut(() => {
    if (!r || !o.current) return;
    const f = new MutationObserver((h) => {
      h.forEach((_) => {
        if (_.attributeName === "data-state" && _.target instanceof HTMLElement) {
          const E = _.target.getAttribute("data-state");
          r(E === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((h) => {
      f.observe(h, { attributes: !0 });
    }), () => f.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ n(lr, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, f]) => typeof f == "object").sort(([, f], [, v]) => typeof f == "boolean" || typeof v == "boolean" ? 0 : f.order - v.order).map(([f, v]) => /* @__PURE__ */ w(Jo, { children: [
      /* @__PURE__ */ n(dr, { ref: p(f), children: typeof v == "object" && "label" in v && v.label }),
      /* @__PURE__ */ n(
        ur,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ n(Qe, { children: gr(t.groups, t.items, f, e) })
        }
      )
    ] }, f)) });
}
function bi(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function vi({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: r,
  className: a,
  id: o,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: p = "default"
}) {
  const f = Q(void 0);
  return /* @__PURE__ */ n(
    "div",
    {
      className: d("tw-border tw-px-4 tw-text-foreground", a),
      ref: f,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ w(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ n("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ n(
                    ts,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: r,
                      variant: p
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ n(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ n("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ n(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
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
const es = (t, e) => t[e] ?? e;
function xi({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l
}) {
  const c = es(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [p, f] = X(!1), v = (h) => {
    o && o(h), a && a([h, ...r.filter((_) => _ !== h)]), s && r.find((_) => _ === h) && s([...r.filter((_) => _ !== h)]), f(!1);
  }, m = (h, _) => {
    var N, y, T, R, z, Y;
    const E = _ !== h ? ((y = (N = t[h]) == null ? void 0 : N.uiNames) == null ? void 0 : y[_]) ?? ((R = (T = t[h]) == null ? void 0 : T.uiNames) == null ? void 0 : R.en) : void 0;
    return E ? `${(z = t[h]) == null ? void 0 : z.autonym} (${E})` : (Y = t[h]) == null ? void 0 : Y.autonym;
  };
  return /* @__PURE__ */ w("div", { className: d("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ w(
      Vt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: v,
        open: p,
        onOpenChange: (h) => f(h),
        children: [
          /* @__PURE__ */ n(kt, { children: /* @__PURE__ */ n(Mt, {}) }),
          /* @__PURE__ */ n(
            Ct,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((h) => /* @__PURE__ */ n(it, { value: h, children: m(h, e) }, h))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ w(xn, { children: [
      /* @__PURE__ */ n(H, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ n("div", { className: "tw-ms-3", children: /* @__PURE__ */ w(H, { children: [
        "Currently:",
        " ",
        (r == null ? void 0 : r.length) > 0 ? `${r.map((h) => m(h, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function ns({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ n(H, { children: e(t) }) : r ? /* @__PURE__ */ n(H, { children: r(t) }) : /* @__PURE__ */ n(H, { children: t });
}
function yi({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: a,
  handleSelectListItem: o,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ n("div", { id: t, className: e, children: r.map((l) => /* @__PURE__ */ w("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ n(
      We,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(l),
        onCheckedChange: (c) => o(l, c)
      }
    ),
    /* @__PURE__ */ n(
      ns,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
const Oe = Ie(({ className: t, ...e }, r) => /* @__PURE__ */ n(Wr, { size: 35, className: d("tw-animate-spin", t), ...e, ref: r }));
Oe.displayName = "Spinner";
function Ni({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: p,
  value: f,
  onChange: v,
  onFocus: m,
  onBlur: h
}) {
  return /* @__PURE__ */ w("div", { className: d("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ n(
      H,
      {
        htmlFor: t,
        className: d({
          "tw-text-red-600": r,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ n(
      Ft,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: d(c, { "tw-border-red-600": r }),
        defaultValue: p,
        value: f,
        onChange: v,
        onFocus: m,
        onBlur: h
      }
    ),
    /* @__PURE__ */ n("p", { className: d({ "tw-hidden": !o }), children: o })
  ] });
}
const ki = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), bn = (t, e) => t[e] ?? e;
function Ci({ errorDetails: t, handleCopyNotify: e, localizedStrings: r }) {
  const a = bn(r, "%webView_error_dump_header%"), o = bn(r, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ w("div", { className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
      /* @__PURE__ */ w("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
        /* @__PURE__ */ n("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
        /* @__PURE__ */ n("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: o })
      ] }),
      /* @__PURE__ */ n(B, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ n(Zr, {}) })
    ] }),
    /* @__PURE__ */ n("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ n("pre", { className: "tw-text-xs", children: t }) })
  ] });
}
const rs = _t(
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
), as = u.forwardRef(({ className: t, variant: e, ...r }, a) => /* @__PURE__ */ n("div", { ref: a, role: "alert", className: d(rs({ variant: e }), t), ...r }));
as.displayName = "Alert";
const os = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ w(
    "h5",
    {
      ref: r,
      className: d("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
os.displayName = "AlertTitle";
const ss = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n("div", { ref: r, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
ss.displayName = "AlertDescription";
const is = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Pt.Root,
  {
    ref: r,
    className: d(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
is.displayName = Pt.Root.displayName;
const ws = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Pt.Image,
  {
    ref: r,
    className: d("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
ws.displayName = Pt.Image.displayName;
const ls = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Pt.Fallback,
  {
    ref: r,
    className: d(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
ls.displayName = Pt.Fallback.displayName;
const fr = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      className: d(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
fr.displayName = "Card";
const br = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      className: d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
br.displayName = "CardHeader";
const vr = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "h3",
    {
      ref: r,
      className: d(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
vr.displayName = "CardTitle";
const ds = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n("p", { ref: r, className: d("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
ds.displayName = "CardDescription";
const Be = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n("div", { ref: r, className: d("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Be.displayName = "CardContent";
const xr = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      className: d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
xr.displayName = "CardFooter";
const yr = u.createContext({
  direction: "bottom"
});
function cs({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...r
}) {
  const a = u.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ n(yr.Provider, { value: a, children: /* @__PURE__ */ n(
    dt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...r
    }
  ) });
}
cs.displayName = "Drawer";
const _i = dt.Trigger, ps = dt.Portal, Si = dt.Close, Nr = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  dt.Overlay,
  {
    ref: r,
    className: d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Nr.displayName = dt.Overlay.displayName;
const us = u.forwardRef(({ className: t, children: e, ...r }, a) => {
  const { direction: o = "bottom" } = u.useContext(yr), s = {
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
  return /* @__PURE__ */ w(ps, { children: [
    /* @__PURE__ */ n(Nr, {}),
    /* @__PURE__ */ w(
      dt.Content,
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
        ...r,
        children: [
          (o === "bottom" || o === "right") && /* @__PURE__ */ n("div", { className: i[o] }),
          /* @__PURE__ */ n("div", { className: "tw-flex tw-flex-col", children: e }),
          (o === "top" || o === "left") && /* @__PURE__ */ n("div", { className: i[o] })
        ]
      }
    )
  ] });
});
us.displayName = "DrawerContent";
function ms({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
ms.displayName = "DrawerHeader";
function hs({ className: t, ...e }) {
  return /* @__PURE__ */ n("div", { className: d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
hs.displayName = "DrawerFooter";
const gs = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  dt.Title,
  {
    ref: r,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
gs.displayName = dt.Title.displayName;
const fs = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  dt.Description,
  {
    ref: r,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
fs.displayName = dt.Description.displayName;
const bs = u.forwardRef(({ className: t, value: e, ...r }, a) => /* @__PURE__ */ n(
  Re.Root,
  {
    ref: a,
    className: d(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...r,
    children: /* @__PURE__ */ n(
      Re.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
bs.displayName = Re.Root.displayName;
function Ti({ ...t }) {
  return /* @__PURE__ */ n(
    ha,
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
const vs = u.forwardRef(({ className: t, ...e }, r) => {
  const a = J();
  return /* @__PURE__ */ w(
    Ht.Root,
    {
      ref: r,
      className: d(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
        /* @__PURE__ */ n(Ht.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ n(Ht.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ n(Ht.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
vs.displayName = Ht.Root.displayName;
const xs = u.forwardRef(({ className: t, ...e }, r) => {
  const a = J();
  return /* @__PURE__ */ n(
    Ee.Root,
    {
      className: d(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: r,
      children: /* @__PURE__ */ n(
        Ee.Thumb,
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
xs.displayName = Ee.Root.displayName;
const Ri = ot.Root, ys = u.forwardRef(({ className: t, ...e }, r) => {
  const a = J();
  return /* @__PURE__ */ n(
    ot.List,
    {
      ref: r,
      className: d(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: a
    }
  );
});
ys.displayName = ot.List.displayName;
const Ns = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ot.Trigger,
  {
    ref: r,
    className: d(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Ns.displayName = ot.Trigger.displayName;
const ks = u.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ot.Content,
  {
    ref: r,
    className: d(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
ks.displayName = ot.Content.displayName;
const Cs = u.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "textarea",
    {
      className: d(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: r,
      ...e
    }
  )
);
Cs.displayName = "Textarea";
function _s({
  defaultValue: t,
  onChange: e,
  variant: r,
  types: a
}) {
  return /* @__PURE__ */ w(Vt, { defaultValue: t ?? "all", onValueChange: e, children: [
    /* @__PURE__ */ n(
      kt,
      {
        className: d("tw-w-16 [&>svg]:tw-min-w-4", {
          "tw-border-none tw-bg-transparent hover:tw-bg-secondary hover:tw-text-secondary-foreground": r === "ghost"
        }),
        children: /* @__PURE__ */ n(Mt, {})
      }
    ),
    /* @__PURE__ */ w(Ct, { position: "popper", children: [
      /* @__PURE__ */ n(it, { value: "all", children: "All" }),
      a.map((o) => {
        const s = o.icon;
        return /* @__PURE__ */ n(it, { value: o.key, children: /* @__PURE__ */ w("div", { className: "tw-align-center tw-flex tw-justify-start tw-gap-2", children: [
          /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(s, { className: "tw-h-4 tw-pr-0" }) }),
          /* @__PURE__ */ n("div", { children: o.localizedName })
        ] }) }, o.key);
      })
    ] })
  ] });
}
const vn = {
  project: {
    key: "project",
    localizedName: "Projects",
    icon: Cn,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Sync",
        condition: () => !0,
        action: () => {
        }
      },
      {
        buttonLabel: "Get",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  },
  resource: {
    key: "resource",
    localizedName: "Resources",
    icon: ea,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Remove",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  },
  dictionary: {
    key: "dictionary",
    localizedName: "Dictionaries",
    icon: ta,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Remove",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  },
  media: {
    key: "media",
    localizedName: "Media",
    icon: Qr,
    actions: [
      {
        buttonLabel: "Open",
        condition: () => !0,
        action: () => {
        },
        default: () => !0
      },
      {
        buttonLabel: "Remove",
        condition: () => !0,
        action: () => {
        }
      }
    ]
  }
};
function Ei({
  localizedStrings: t = {},
  uiLocales: e = [],
  onOpenGetResources: r = () => {
  },
  onOpenResourceOrProject: a = () => {
  },
  onSendReceiveProject: o = () => {
  },
  showGetResourcesButton: s = !0,
  isSendReceiveInProgress: i = !1,
  isLoadingLocalProjects: l = !1,
  isLoadingRemoteProjects: c = !1,
  localProjectResourceInfo: p = [],
  sharedProjectsInfo: f = {},
  activeSendReceiveProjects: v = []
}) {
  const m = (x) => t[x] ?? x, h = m("%resources_action%"), _ = m("%resources_activity%"), E = m("%resources_clearSearch%"), N = m("%home_dialog_title%"), y = m("%resources_filterInput%"), T = m("%resources_fullName%"), R = m("%resources_get%"), z = m("%resources_getResources%"), Y = m("%resources_items%"), gt = m("%resources_language%"), lt = m("%resources_loading%"), S = m("%resources_noProjects%"), b = m("%resources_noProjectsInstruction%"), $ = m("%resources_noSearchResults%"), D = m("%resources_open%"), nt = m("%resources_searchedFor%"), St = m("%resources_sync%"), ft = tt(() => {
    const x = [];
    return f && Object.entries(f).forEach(([I, q]) => {
      x.push({
        id: I,
        name: q.name,
        fullName: q.fullName,
        language: q.language,
        isEditable: !0,
        isSendReceivable: !0,
        isLocallyAvailable: p == null ? void 0 : p.some((wn) => wn.id === I),
        editedStatus: q.editedStatus,
        lastSendReceiveDate: q.lastSendReceiveDate,
        type: "project"
      });
    }), p == null || p.forEach((I) => {
      x.some((q) => q.id === I.id) || x.push({
        id: I.id,
        name: I.name,
        fullName: I.fullName,
        language: I.language,
        isEditable: I.isEditable,
        isSendReceivable: !1,
        type: I.type
      });
    }), x;
  }, [p, f]), [et, K] = X(""), [C, g] = X({
    key: "language",
    direction: "ascending"
  }), [M, k] = X("all"), V = tt(() => {
    if (!ft) return [];
    const x = ft.filter((I) => {
      const q = et.toLowerCase();
      return (M === "all" || M === I.type) && (I.fullName.toLowerCase().includes(q) || I.name.toLowerCase().includes(q) || I.language.toLowerCase().includes(q));
    });
    return x.length === 0 && et === "" && setTimeout(() => {
      k("all");
    }, 2e3), x.sort((I, q) => {
      switch (C.key) {
        case "fullName":
          return I.fullName < q.fullName ? C.direction === "ascending" ? -1 : 1 : I.fullName > q.fullName ? C.direction === "ascending" ? 1 : -1 : 0;
        case "language":
          return I.language < q.language ? C.direction === "ascending" ? -1 : 1 : I.language > q.language ? C.direction === "ascending" ? 1 : -1 : 0;
        case "activity":
          return !I.lastSendReceiveDate || !q.lastSendReceiveDate ? 0 : I.lastSendReceiveDate < q.lastSendReceiveDate ? C.direction === "ascending" ? -1 : 1 : I.lastSendReceiveDate > q.lastSendReceiveDate ? C.direction === "ascending" ? 1 : -1 : 0;
        case "action":
          return 0;
        default:
          return 0;
      }
    });
  }, [ft, et, C, M]), Z = (x) => {
    const I = { key: x, direction: "ascending" };
    C.key === x && C.direction === "ascending" && (I.direction = "descending"), g(I);
  }, G = (x, I) => /* @__PURE__ */ n(Nt, { onClick: () => Z(x), children: /* @__PURE__ */ w(B, { variant: "ghost", className: "tw-bg-transparent hover:tw-bg-transparent", children: [
    /* @__PURE__ */ n("div", { className: "tw-font-normal", children: I }),
    C.key !== x && /* @__PURE__ */ n(se, { className: "tw-pl-1", size: 16 }),
    C.key === x && (C.direction === "ascending" ? /* @__PURE__ */ n(kn, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ n(Jt, { className: "tw-pl-1", size: 16 }))
  ] }) }), kr = tt(() => new Intl.RelativeTimeFormat(e, { style: "long", numeric: "auto" }), [e]), an = (x) => i && v.includes(x.id) ? /* @__PURE__ */ n(Oe, { className: "tw-h-5 tw-py-[1px]" }) : x.isLocallyAvailable ? St : R, on = (x, I) => I ? /* @__PURE__ */ n(It, { onClick: () => o(x.id), children: /* @__PURE__ */ n("span", { children: an(x) }) }) : /* @__PURE__ */ n(
    B,
    {
      disabled: i && v.includes(x.id),
      onClick: () => o(x.id),
      children: an(x)
    }
  ), sn = (x, I) => I ? /* @__PURE__ */ n(It, { onClick: () => a(x.id, x.isEditable), children: /* @__PURE__ */ n("span", { children: D }) }) : /* @__PURE__ */ n(B, { onClick: () => a(x.id, x.isEditable), children: D });
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ w(fr, { className: "tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0", children: [
    /* @__PURE__ */ n(br, { className: "tw-flex-shrink-0", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-gap-4", children: [
      /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-4 md:tw-flex-row", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-4", children: [
          /* @__PURE__ */ n(na, { size: 36 }),
          /* @__PURE__ */ n(vr, { children: N })
        ] }),
        /* @__PURE__ */ n(
          nn,
          {
            value: et,
            className: "tw-min-w-72",
            onSearch: K,
            placeholder: y
          }
        )
      ] }),
      /* @__PURE__ */ n("div", { className: "tw-flex tw-flex-wrap-reverse tw-gap-4 tw-self-end", children: s && /* @__PURE__ */ n(B, { onClick: r, className: "tw-bg-muted", variant: "ghost", children: `+ ${z}` }) })
    ] }) }),
    l || c ? /* @__PURE__ */ w(Be, { className: "tw-flex tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-2", children: [
      /* @__PURE__ */ n(H, { children: lt }),
      /* @__PURE__ */ n(Oe, {})
    ] }) : /* @__PURE__ */ n(Be, { className: "tw-flex-grow tw-overflow-auto", children: p ? /* @__PURE__ */ n("div", { className: "tw-h-full tw-flex-grow", children: V.length === 0 ? /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center", children: [
      /* @__PURE__ */ n(H, { className: "tw-text-muted-foreground", children: $ }),
      /* @__PURE__ */ n(H, { className: "tw-font-normal tw-text-muted-foreground", children: `${nt} "${et}".` }),
      /* @__PURE__ */ w("div", { className: "tw-mt-4 tw-flex tw-gap-1", children: [
        /* @__PURE__ */ n(
          B,
          {
            variant: "ghost",
            onClick: () => {
              K(""), k("all");
            },
            children: E
          }
        ),
        s && /* @__PURE__ */ n(
          B,
          {
            onClick: r,
            variant: "ghost",
            className: "tw-bg-muted",
            children: `+ ${z}`
          }
        )
      ] })
    ] }) : /* @__PURE__ */ w(Qt, { stickyHeader: !0, children: [
      /* @__PURE__ */ n(te, { className: "tw-bg-none", stickyHeader: !0, children: /* @__PURE__ */ w(mt, { children: [
        /* @__PURE__ */ n(Nt, { children: /* @__PURE__ */ n(
          _s,
          {
            onChange: k,
            variant: "ghost",
            types: Object.values(vn)
          }
        ) }),
        G("fullName", T),
        G("language", gt),
        V.some(
          (x) => x.isSendReceivable
        ) && G("activity", _),
        G("action", h),
        /* @__PURE__ */ n(Nt, {})
      ] }) }),
      /* @__PURE__ */ n(ee, { children: V.map((x) => {
        const I = vn[x.type].icon;
        return /* @__PURE__ */ w(
          mt,
          {
            className: "[&>td]:tw-p-2",
            onDoubleClick: () => a(
              x.id,
              x.isEditable
            ),
            children: [
              /* @__PURE__ */ w(wt, { className: "tw-ms-4 tw-flex tw-items-center tw-gap-4", children: [
                /* @__PURE__ */ n(I, { className: "tw-h-4 tw-pr-0" }),
                /* @__PURE__ */ n("div", { className: "tw-py-4", children: x.name })
              ] }),
              /* @__PURE__ */ n(wt, { className: "tw-font-medium", children: x.fullName }),
              /* @__PURE__ */ n(wt, { children: x.language }),
              V.some(
                (q) => q.isSendReceivable
              ) && /* @__PURE__ */ n(wt, { children: x.lastSendReceiveDate && wa(
                kr,
                new Date(x.lastSendReceiveDate)
              ) }),
              /* @__PURE__ */ n(wt, { children: x.isSendReceivable && (!x.isLocallyAvailable || x.editedStatus === "edited") ? on(x) : sn(x) }),
              /* @__PURE__ */ n(wt, { children: x.isSendReceivable && x.isLocallyAvailable && /* @__PURE__ */ w(Wt, { children: [
                /* @__PURE__ */ n(we, { asChild: !0, children: /* @__PURE__ */ n(B, { variant: "ghost", children: /* @__PURE__ */ n(ra, { className: "tw-w-4" }) }) }),
                /* @__PURE__ */ n(Xt, { align: "start", children: /* @__PURE__ */ n(It, { asChild: !0, children: x.editedStatus === "edited" ? sn(x, !0) : on(x, !0) }) })
              ] }) })
            ]
          },
          x.id
        );
      }) })
    ] }) }) : /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center", children: [
      /* @__PURE__ */ n(H, { className: "tw-text-muted-foreground", children: S }),
      /* @__PURE__ */ n(H, { className: "tw-font-normal tw-text-muted-foreground", children: b }),
      s && /* @__PURE__ */ n(
        B,
        {
          onClick: r,
          className: "tw-mt-4",
          children: `+ ${z}`
        }
      )
    ] }) }),
    /* @__PURE__ */ n(xr, { className: "tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4", children: V.length > 0 && /* @__PURE__ */ n(H, { className: "tw-font-normal", children: `${V.length} ${Y}` }) })
  ] }) });
}
const Di = (t, e) => {
  ut(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function Ss(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Ts = (t, e, r = {}) => {
  const a = Q(e);
  a.current = e;
  const o = Q(r);
  o.current = Ss(o.current);
  const [s, i] = X(() => a.current), [l, c] = X(!0);
  return ut(() => {
    let p = !0;
    return c(!!t), (async () => {
      if (t) {
        const f = await t();
        p && (i(() => f), c(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || i(() => a.current);
    };
  }, [t]), [s, l];
}, _e = () => !1, Vi = (t, e) => {
  const [r] = Ts(
    W(async () => {
      if (!t) return _e;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    _e,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  ut(() => () => {
    r !== _e && r();
  }, [r]);
};
function Rs(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), a = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? r.insertBefore(o, a) : r.appendChild(o);
}
Rs(`.banded-row:hover {
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
.tw-ms-4 {
  margin-inline-start: 1rem;
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
.tw-w-16 {
  width: 4rem;
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
.tw-flex-wrap-reverse {
  flex-wrap: wrap-reverse;
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
.tw-self-end {
  align-self: flex-end;
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
.tw-border-none {
  border-style: none;
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
.tw-border-gray-200 {
  --tw-border-opacity: 1;
  border-color: rgb(229 231 235 / var(--tw-border-opacity, 1));
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
.hover\\:tw-text-secondary-foreground:hover {
  color: hsl(var(--secondary-foreground));
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

  .md\\:tw-flex-row {
    flex-direction: row;
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
.\\[\\&\\>svg\\]\\:tw-min-w-4>svg {
  min-width: 1rem;
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
.\\[\\&\\>td\\]\\:tw-p-2>td {
  padding: 0.5rem;
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
  as as Alert,
  ss as AlertDescription,
  os as AlertTitle,
  is as Avatar,
  ls as AvatarFallback,
  ws as AvatarImage,
  Us as BOOK_SELECTOR_STRING_KEYS,
  ae as Badge,
  Ys as BookChapterControl,
  Za as BookSelectionMode,
  qs as BookSelector,
  B as Button,
  fr as Card,
  Be as CardContent,
  ds as CardDescription,
  xr as CardFooter,
  br as CardHeader,
  vr as CardTitle,
  Wa as ChapterRangeSelector,
  We as Checkbox,
  yi as Checklist,
  De as ComboBox,
  ce as Command,
  me as CommandEmpty,
  Ke as CommandGroup,
  pe as CommandInput,
  he as CommandItem,
  ue as CommandList,
  io as DataTable,
  cs as Drawer,
  Si as DrawerClose,
  us as DrawerContent,
  fs as DrawerDescription,
  hs as DrawerFooter,
  ms as DrawerHeader,
  Nr as DrawerOverlay,
  ps as DrawerPortal,
  gs as DrawerTitle,
  _i as DrawerTrigger,
  Wt as DropdownMenu,
  Ge as DropdownMenuCheckboxItem,
  Xt as DropdownMenuContent,
  Vn as DropdownMenuGroup,
  It as DropdownMenuItem,
  wo as DropdownMenuItemType,
  le as DropdownMenuLabel,
  va as DropdownMenuPortal,
  js as DropdownMenuRadioGroup,
  On as DropdownMenuRadioItem,
  Zt as DropdownMenuSeparator,
  ya as DropdownMenuShortcut,
  xa as DropdownMenuSub,
  zn as DropdownMenuSubContent,
  Mn as DropdownMenuSubTrigger,
  we as DropdownMenuTrigger,
  ki as ERROR_DUMP_STRING_KEYS,
  Ci as ErrorDump,
  Qs as Filter,
  Ks as FilterDropdown,
  Zs as Footer,
  Ei as HomeDialog,
  si as INVENTORY_STRING_KEYS,
  Ft as Input,
  ii as Inventory,
  H as Label,
  Js as MarkdownRenderer,
  Ws as MoreInfo,
  po as MultiSelectComboBox,
  fi as NavigationContentSearch,
  qe as Popover,
  de as PopoverContent,
  Je as PopoverTrigger,
  bs as Progress,
  vn as ProjectTypes,
  Ue as RadioGroup,
  re as RadioGroupItem,
  di as SCOPE_SELECTOR_STRING_KEYS,
  ci as ScopeSelector,
  li as ScriptureResultsViewer,
  pi as ScrollGroupSelector,
  nn as SearchBar,
  Vt as Select,
  Ct as SelectContent,
  to as SelectGroup,
  it as SelectItem,
  no as SelectLabel,
  jn as SelectScrollDownButton,
  Ln as SelectScrollUpButton,
  ro as SelectSeparator,
  kt as SelectTrigger,
  Mt as SelectValue,
  Ze as Separator,
  ui as SettingsList,
  hi as SettingsListHeader,
  mi as SettingsListItem,
  Bo as SettingsSidebar,
  wi as SettingsSidebarContentSearch,
  mn as Skeleton,
  vs as Slider,
  Ti as Sonner,
  Oe as Spinner,
  xs as Switch,
  fn as TabDropdownMenu,
  gi as TabToolbar,
  Qt as Table,
  ee as TableBody,
  so as TableCaption,
  wt as TableCell,
  oo as TableFooter,
  Nt as TableHead,
  te as TableHeader,
  mt as TableRow,
  Ri as Tabs,
  ks as TabsContent,
  ys as TabsList,
  Ns as TabsTrigger,
  Ni as TextField,
  Cs as Textarea,
  Un as ToggleGroup,
  ne as ToggleGroupItem,
  vi as Toolbar,
  tn as Tooltip,
  fe as TooltipContent,
  Qe as TooltipProvider,
  en as TooltipTrigger,
  xi as UiLanguageSelector,
  sr as VerticalTabs,
  wr as VerticalTabsContent,
  ir as VerticalTabsList,
  qo as VerticalTabsTrigger,
  co as badgeVariants,
  ja as buttonVariants,
  d as cn,
  oi as getBookIdFromUSFM,
  ri as getLinesFromUSFM,
  ai as getNumberFromUSFM,
  go as getStatusForItem,
  bi as getToolbarOSReservedSpaceClassName,
  ei as inventoryCountColumn,
  ti as inventoryItemColumn,
  ni as inventoryStatusColumn,
  eo as selectTriggerVariants,
  Oi as sonner,
  Di as useEvent,
  Vi as useEventAsync,
  Ts as usePromise
};
//# sourceMappingURL=index.js.map
