import { jsx as n, jsxs as w, Fragment as It } from "react/jsx-runtime";
import c, { forwardRef as re, createContext as ir, useContext as wr, useCallback as it, useState as A, useRef as ot, useEffect as xt, useLayoutEffect as We, useMemo as J, Fragment as lr } from "react";
import { clsx as dr } from "clsx";
import { extendTailwindMerge as cr } from "tailwind-merge";
import { cva as Mt } from "class-variance-authority";
import * as F from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as pr } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Ce, Check as Vt, Circle as Se, X as Re, Search as on, ChevronsUpDown as Te, FilterIcon as ur, ChevronDown as qt, ChevronUp as sn, ArrowLeftIcon as mr, ChevronLeftIcon as hr, ChevronRightIcon as gr, ArrowRightIcon as fr, LoaderCircle as br, Download as vr, Filter as xr, User as yr, Link as Nr, CircleHelp as kr, Star as Cr, CircleCheckIcon as Sr, CircleXIcon as Rr, CircleHelpIcon as Tr, ArrowUpIcon as _r, ArrowDownIcon as zr, ArrowUpDownIcon as Er, PanelLeft as Mr, PanelRight as Dr, ScrollText as Ir, ChevronLeft as Vr, MenuIcon as Br, Home as Ar, Ellipsis as Or } from "lucide-react";
import { formatScrRef as Yt, getChaptersForBook as Pr, NumberFormat as Fr, formatBytes as Xr, deepEqual as _e, substring as Gr, compareScrRefs as he, scrRefToBBBCCCVVV as de, getLocalizeKeyForScrollGroupId as B, ProjectTypes as Ze, formatTimeSpan as $r } from "platform-bible-utils";
import { Slot as Bt } from "@radix-ui/react-slot";
import * as wn from "@radix-ui/react-label";
import * as jt from "@radix-ui/react-radio-group";
import * as Ut from "@radix-ui/react-popover";
import { Command as Q } from "cmdk";
import * as pt from "@radix-ui/react-dialog";
import { useReactTable as ln, getFilteredRowModel as Lr, getSortedRowModel as dn, getPaginationRowModel as Yr, getCoreRowModel as cn, flexRender as Ht, getGroupedRowModel as Hr, getExpandedRowModel as jr } from "@tanstack/react-table";
import * as Y from "@radix-ui/react-select";
import Ur from "markdown-to-jsx";
import * as ge from "@radix-ui/react-checkbox";
import * as ae from "@radix-ui/react-toggle-group";
import * as pn from "@radix-ui/react-toggle";
import * as un from "@radix-ui/react-separator";
import * as Jt from "@radix-ui/react-tooltip";
import * as tt from "@radix-ui/react-tabs";
import * as X from "@radix-ui/react-menubar";
import { useHotkeys as qr } from "react-hotkeys-hook";
import * as At from "@radix-ui/react-avatar";
import { Toaster as Jr } from "sonner";
import { toast as Ks } from "sonner";
import * as Lt from "@radix-ui/react-slider";
import * as fe from "@radix-ui/react-switch";
const Kr = cr({ prefix: "tw-" });
function d(...t) {
  return Kr(dr(t));
}
const Ot = c.forwardRef(
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
Ot.displayName = "Input";
const Wr = re(
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: r,
    handleSubmit: a,
    className: o,
    ...i
  }, l) => /* @__PURE__ */ n("div", { className: "tw-relative", children: /* @__PURE__ */ n(
    Ot,
    {
      ...i,
      type: "text",
      className: d(
        "tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",
        o
      ),
      onChange: (s) => t(s.target.value),
      onKeyDown: (s) => {
        s.key === "Enter" ? (a(), s.preventDefault()) : e(s);
      },
      onClick: r,
      ref: l
    }
  ) })
), ze = ir(void 0);
function wt() {
  const t = wr(ze);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const gt = Mt("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Zr = "layoutDirection";
function q() {
  const t = localStorage.getItem(Zr);
  return t === "rtl" ? t : "ltr";
}
const oe = F.Trigger, mn = F.Group, Qr = F.Portal, ta = F.Sub, ds = F.RadioGroup;
function Kt({ variant: t = "default", ...e }) {
  const r = c.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(ze.Provider, { value: r, children: /* @__PURE__ */ n(F.Root, { ...e }) });
}
const hn = c.forwardRef(({ className: t, inset: e, children: r, ...a }, o) => {
  const i = wt();
  return /* @__PURE__ */ w(
    F.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        gt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(Ce, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
hn.displayName = F.SubTrigger.displayName;
const gn = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  F.SubContent,
  {
    ref: r,
    className: d(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
gn.displayName = F.SubContent.displayName;
const Pt = c.forwardRef(({ className: t, sideOffset: e = 4, children: r, ...a }, o) => {
  const i = q();
  return /* @__PURE__ */ n(F.Portal, { children: /* @__PURE__ */ n(
    F.Content,
    {
      ref: o,
      sideOffset: e,
      className: d(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ n("div", { dir: i, children: r })
    }
  ) });
});
Pt.displayName = F.Content.displayName;
const Dt = c.forwardRef(({ className: t, inset: e, ...r }, a) => {
  const o = q(), i = wt();
  return /* @__PURE__ */ n(
    F.Item,
    {
      ref: a,
      className: d(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        gt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      dir: o
    }
  );
});
Dt.displayName = F.Item.displayName;
const Ee = c.forwardRef(({ className: t, children: e, checked: r, ...a }, o) => {
  const i = wt();
  return /* @__PURE__ */ w(
    F.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        gt({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ n(F.ItemIndicator, { children: /* @__PURE__ */ n(Vt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Ee.displayName = F.CheckboxItem.displayName;
const fn = c.forwardRef(({ className: t, children: e, ...r }, a) => {
  const o = wt();
  return /* @__PURE__ */ w(
    F.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        gt({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...r,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ n(F.ItemIndicator, { children: /* @__PURE__ */ n(Se, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
fn.displayName = F.RadioItem.displayName;
const se = c.forwardRef(({ className: t, inset: e, ...r }, a) => /* @__PURE__ */ n(
  F.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...r
  }
));
se.displayName = F.Label.displayName;
const Wt = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  F.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Wt.displayName = F.Separator.displayName;
function ea({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      className: d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
ea.displayName = "DropdownMenuShortcut";
var na = Object.defineProperty, ra = (t, e, r) => e in t ? na(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r, _ = (t, e, r) => ra(t, typeof e != "symbol" ? e + "" : e, r);
const Tt = [
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
], Me = [
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
], bn = [
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
], Qe = ua();
function Ft(t, e = !0) {
  return e && (t = t.toUpperCase()), t in Qe ? Qe[t] : 0;
}
function De(t) {
  return Ft(t) > 0;
}
function aa(t) {
  const e = typeof t == "string" ? Ft(t) : t;
  return e >= 40 && e <= 66;
}
function oa(t) {
  return (typeof t == "string" ? Ft(t) : t) <= 39;
}
function vn(t) {
  return t <= 66;
}
function sa(t) {
  const e = typeof t == "string" ? Ft(t) : t;
  return Nn(e) && !vn(e);
}
function* ia() {
  for (let t = 1; t <= Tt.length; t++) yield t;
}
const wa = 1, xn = Tt.length;
function la() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ie(t, e = "***") {
  const r = t - 1;
  return r < 0 || r >= Tt.length ? e : Tt[r];
}
function yn(t) {
  return t <= 0 || t > xn ? "******" : bn[t - 1];
}
function da(t) {
  return yn(Ft(t));
}
function Nn(t) {
  const e = typeof t == "number" ? Ie(t) : t;
  return De(e) && !Me.includes(e);
}
function ca(t) {
  const e = typeof t == "number" ? Ie(t) : t;
  return De(e) && Me.includes(e);
}
function pa(t) {
  return bn[t - 1].includes("*obsolete*");
}
function ua() {
  const t = {};
  for (let e = 0; e < Tt.length; e++)
    t[Tt[e]] = e + 1;
  return t;
}
const $ = {
  allBookIds: Tt,
  nonCanonicalIds: Me,
  bookIdToNumber: Ft,
  isBookIdValid: De,
  isBookNT: aa,
  isBookOT: oa,
  isBookOTNT: vn,
  isBookDC: sa,
  allBookNumbers: ia,
  firstBook: wa,
  lastBook: xn,
  extraBooks: la,
  bookNumberToId: Ie,
  bookNumberToEnglishName: yn,
  bookIdToEnglishName: da,
  isCanonical: Nn,
  isExtraMaterial: ca,
  isObsolete: pa
};
var dt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(dt || {});
const nt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (_(this, "name"), _(this, "fullPath"), _(this, "isPresent"), _(this, "hasVerseSegments"), _(this, "isCustomized"), _(this, "baseVersification"), _(this, "scriptureBooks"), _(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = dt[e]) : (this._type = e, this.name = dt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
_(nt, "Original", new nt(dt.Original)), _(nt, "Septuagint", new nt(dt.Septuagint)), _(nt, "Vulgate", new nt(dt.Vulgate)), _(nt, "English", new nt(dt.English)), _(nt, "RussianProtestant", new nt(dt.RussianProtestant)), _(nt, "RussianOrthodox", new nt(dt.RussianOrthodox));
let St = nt;
function tn(t, e) {
  const r = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(r);
  return t.split(r);
}
var kn = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(kn || {});
const W = class I {
  constructor(e, r, a, o) {
    if (_(this, "firstChapter"), _(this, "lastChapter"), _(this, "lastVerse"), _(this, "hasSegmentsDefined"), _(this, "text"), _(this, "BBBCCCVVVS"), _(this, "longHashCode"), _(this, "versification"), _(this, "rtlMark", "‏"), _(this, "_bookNum", 0), _(this, "_chapterNum", 0), _(this, "_verseNum", 0), _(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
        const i = e, l = r != null && r instanceof St ? r : void 0;
        this.setEmpty(l), this.parse(i);
      } else if (e != null && typeof e == "number") {
        const i = r != null && r instanceof St ? r : void 0;
        this.setEmpty(i), this._verseNum = e % I.chapterDigitShifter, this._chapterNum = Math.floor(
          e % I.bookDigitShifter / I.chapterDigitShifter
        ), this._bookNum = Math.floor(e / I.bookDigitShifter);
      } else if (r == null)
        if (e != null && e instanceof I) {
          const i = e;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (e == null) return;
          const i = e instanceof St ? e : I.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && r != null && a != null)
      if (typeof e == "string" && typeof r == "string" && typeof a == "string")
        this.setEmpty(o), this.updateInternal(e, r, a);
      else if (typeof e == "number" && typeof r == "number" && typeof a == "number")
        this._bookNum = e, this._chapterNum = r, this._verseNum = a, this.versification = o ?? I.defaultVersification;
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
      return r = new I(e), { success: !0, verseRef: r };
    } catch (a) {
      if (a instanceof Xt)
        return r = new I(), { success: !1, verseRef: r };
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
    return e % I.bcvMaxValue * I.bookDigitShifter + (r >= 0 ? r % I.bcvMaxValue * I.chapterDigitShifter : 0) + (a >= 0 ? a % I.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: r, chapterNum: a, verseNum: o, verse: i, versificationStr: l } = e, s = i || o.toString();
    let p;
    return l && (p = new St(l)), r ? new I(r, a.toString(), s, p) : new I();
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
      if (r = r * 10 + +a - 0, r > I.bcvMaxValue)
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
    const { success: r, vNum: a } = I.tryGetVerseNum(e);
    this._verse = r ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = a, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = I.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > $.lastBook)
      throw new Xt(
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
    this.versification = this.versification != null ? new St(e) : void 0;
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
      const i = e.split("/");
      if (e = i[0], i.length > 1)
        try {
          const l = +i[1].trim();
          this.versification = new St(dt[l]);
        } catch {
          throw new Xt("Invalid reference : " + e);
        }
    }
    const r = e.trim().split(" ");
    if (r.length !== 2)
      throw new Xt("Invalid reference : " + e);
    const a = r[1].split(":"), o = +a[0];
    if (a.length !== 2 || $.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !I.isVerseParseable(a[1]))
      throw new Xt("Invalid reference : " + e);
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
    return new I(this);
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
  allVerses(e = !1, r = I.verseRangeSeparators, a = I.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = tn(this._verse, a);
    for (const l of i.map((s) => tn(s, r))) {
      const s = this.clone();
      s.verse = l[0];
      const p = s.verseNum;
      if (o.push(s), l.length > 1) {
        const u = this.clone();
        if (u.verse = l[1], !e)
          for (let m = p + 1; m < u.verseNum; m++) {
            const f = new I(
              this._bookNum,
              this._chapterNum,
              m,
              this.versification
            );
            this.isExcluded || o.push(f);
          }
        o.push(u);
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
      const i = o.internalValid;
      if (i !== 0)
        return i;
      const l = o.BBBCCCVVV;
      if (a > l)
        return 3;
      if (a === l)
        return 4;
      a = l;
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
  updateInternal(e, r, a) {
    this.bookNum = $.bookIdToNumber(e), this.chapter = r, this.verse = a;
  }
};
_(W, "defaultVersification", St.English), _(W, "verseRangeSeparator", "-"), _(W, "verseSequenceIndicator", ","), _(W, "verseRangeSeparators", [W.verseRangeSeparator]), _(W, "verseSequenceIndicators", [W.verseSequenceIndicator]), _(W, "chapterDigitShifter", 1e3), _(W, "bookDigitShifter", W.chapterDigitShifter * W.chapterDigitShifter), _(W, "bcvMaxValue", W.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
_(W, "ValidStatusType", kn);
class Xt extends Error {
}
const ma = re(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: r,
    handleHighlightBook: a,
    handleKeyDown: o,
    bookType: i,
    children: l
  }, s) => /* @__PURE__ */ w(
    Dt,
    {
      ref: s,
      textValue: t,
      className: d(
        "tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",
        {
          // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
          "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": r
        }
      ),
      onSelect: (p) => {
        p.preventDefault(), e();
      },
      onKeyDown: (p) => {
        o(p);
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
                "tw-border-s-red-200": i.toLowerCase() === "ot",
                "tw-border-s-purple-200": i.toLowerCase() === "nt",
                "tw-border-s-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: $.bookIdToEnglishName(t)
          }
        ),
        r && /* @__PURE__ */ n("div", { children: l })
      ]
    },
    t
  )
);
function ha({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: r,
  highlightedChapter: a,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: e }, (s, p) => p + 1), l = it(
    (s) => {
      o(s);
    },
    [o]
  );
  return /* @__PURE__ */ n("div", { className: d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: i.map((s) => /* @__PURE__ */ n(
    "div",
    {
      className: d(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": s === r,
          "tw-bg-amber-200": s === a
        }
      ),
      onClick: (p) => {
        p.preventDefault(), p.stopPropagation(), t(s);
      },
      role: "button",
      onKeyDown: (p) => {
        p.key === "Enter" && t(s);
      },
      tabIndex: 0,
      onMouseMove: () => l(s),
      children: s
    },
    s
  )) });
}
const Ve = $.allBookIds.filter((t) => !$.isObsolete($.bookIdToNumber(t))), ga = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, en = ["OT", "NT", "DC"], fa = 96, ba = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Gt = (t) => Pr($.bookIdToNumber(t));
function va() {
  return Ve.map((e) => $.bookIdToEnglishName(e));
}
function xa(t) {
  return va().includes(t);
}
function ya(t) {
  const e = t.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (xa(e))
    return Ve.find((a) => $.bookIdToEnglishName(a) === e);
}
function ps({
  scrRef: t,
  handleSubmit: e,
  className: r,
  getActiveBookIds: a
}) {
  const o = q(), [i, l] = A(""), [s, p] = A(t.book), [u, m] = A(t.chapterNum ?? 0), [f, h] = A(t.book), [g, v] = A(!1), [R, y] = A(g), C = ot(void 0), k = ot(void 0), V = ot(void 0), G = it(
    (N) => {
      const T = a ? a() : Ve;
      return {
        OT: T.filter((O) => $.isBookOT(O)),
        NT: T.filter((O) => $.isBookNT(O)),
        DC: T.filter((O) => $.isBookDC(O))
      }[N].filter((O) => {
        const D = $.bookIdToEnglishName(O).toLowerCase(), L = i.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return D.includes(L) || // Match book name
        O.toLowerCase().includes(L);
      });
    },
    [i, a]
    // Only recompute when relevant values change
  ), et = (N) => {
    l(N);
  }, st = ot(!1), kt = it((N) => {
    if (st.current) {
      st.current = !1;
      return;
    }
    v(N);
  }, []), x = it(
    (N, T, O, D) => {
      if (m(t.book !== N ? 1 : t.chapterNum), T || Gt(N) === -1) {
        e({
          book: N,
          chapterNum: O ?? 1,
          verseNum: D ?? 1
        }), v(!1), l("");
        return;
      }
      p(s !== N ? N : ""), v(!T);
    },
    [e, t.book, t.chapterNum, s]
  ), M = (N) => {
    N <= 0 || N > Gt(s) || x(s, !0, N);
  }, K = it(() => {
    ba.forEach((N) => {
      const T = N.exec(i);
      if (T) {
        const [O, D = void 0, L = void 0] = T.slice(1), mt = ya(O);
        ($.isBookIdValid(O) || mt) && x(
          mt ?? O,
          !0,
          D ? parseInt(D, 10) : 1,
          L ? parseInt(L, 10) : 1
        );
      }
    }), C.current.blur();
  }, [x, i]), P = it(
    (N) => {
      g ? (N.key === "ArrowDown" || N.key === "ArrowUp") && (V != null && V.current ? V.current.focus() : k.current && k.current.focus(), N.preventDefault()) : v(!0);
    },
    [g]
  ), Ct = (N) => {
    const { key: T } = N;
    T === "ArrowRight" || T === "ArrowLeft" || T === "ArrowDown" || T === "ArrowUp" || T === "Enter" || C.current.dispatchEvent(new KeyboardEvent("keydown", { key: T }));
  }, ut = (N) => {
    const { key: T } = N;
    if (f === s) {
      if (T === "Enter") {
        N.preventDefault(), x(s, !0, u);
        return;
      }
      const O = T === "ArrowRight" && !o || T === "ArrowRight" && o === "ltr" || T === "ArrowLeft" && o === "rtl", D = T === "ArrowLeft" && !o || T === "ArrowLeft" && o === "ltr" || T === "ArrowRight" && o === "rtl";
      let L = 0;
      if (O)
        if (u < Gt(f))
          L = 1;
        else {
          N.preventDefault();
          return;
        }
      else if (D)
        if (u > 1)
          L = -1;
        else {
          N.preventDefault();
          return;
        }
      else T === "ArrowDown" ? L = 6 : T === "ArrowUp" && (L = -6);
      u + L <= 0 || u + L > Gt(f) ? m(0) : L !== 0 && (m(u + L), N.preventDefault());
    }
  };
  return xt(() => {
    s === f ? s === t.book ? m(t.chapterNum) : m(1) : m(0);
  }, [f, t.book, t.chapterNum, s]), We(() => {
    y(g);
  }, [g]), We(() => {
    const N = setTimeout(() => {
      if (R && k.current && V.current && !i) {
        const O = V.current.offsetTop - fa;
        k.current.scrollTo({ top: O, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(N);
    };
  }, [R, i]), /* @__PURE__ */ n("div", { className: "pr-twp tw-flex tw-bg-transparent", children: /* @__PURE__ */ w(Kt, { modal: !1, open: g, onOpenChange: kt, children: [
    /* @__PURE__ */ n(oe, { asChild: !0, children: /* @__PURE__ */ n(
      Wr,
      {
        ref: C,
        value: i,
        handleSearch: et,
        handleKeyDown: P,
        handleOnClick: () => {
          p(t.book), h(t.book), m(t.chapterNum > 0 ? t.chapterNum : 0), v(!0), l(Yt(t, "English")), C.current.focus();
        },
        onFocus: () => {
          st.current = !0;
        },
        onBlur: () => {
          l("");
        },
        handleSubmit: K,
        placeholder: Yt(t, "English"),
        className: r
      }
    ) }),
    /* @__PURE__ */ n(
      Pt,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: Ct,
        align: o === "ltr" ? "start" : "end",
        ref: k,
        children: /* @__PURE__ */ n("div", { className: "rtl:tw-ps-2", children: en.map((N, T) => {
          const O = G(N);
          return O.length > 0 && /* @__PURE__ */ w("div", { children: [
            /* @__PURE__ */ n(se, { className: "tw-font-semibold tw-text-foreground/80", children: ga[N] }),
            O.map((D) => /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(
              ma,
              {
                bookId: D,
                handleSelectBook: () => x(D, !1),
                isSelected: s === D,
                handleHighlightBook: () => h(D),
                handleKeyDown: ut,
                bookType: N,
                ref: (L) => {
                  s === D && (V.current = L);
                },
                children: /* @__PURE__ */ n(
                  ha,
                  {
                    handleSelectChapter: M,
                    endChapter: Gt(D),
                    activeChapter: t.book === D ? t.chapterNum : 0,
                    highlightedChapter: u,
                    handleHighlightedChapter: (L) => {
                      m(L);
                    }
                  }
                )
              }
            ) }, D)),
            en.length - 1 !== T ? /* @__PURE__ */ n(Wt, {}) : void 0
          ] }, N);
        }) })
      }
    )
  ] }) });
}
const Na = Mt(
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
), E = c.forwardRef(
  ({ className: t, variant: e, size: r, asChild: a = !1, ...o }, i) => /* @__PURE__ */ n(a ? Bt : "button", { className: d(Na({ variant: e, size: r, className: t })), ref: i, ...o })
);
E.displayName = "Button";
const ka = Mt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), U = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(wn.Root, { ref: r, className: d("pr-twp", ka(), t), ...e }));
U.displayName = wn.Root.displayName;
const Cn = c.forwardRef(({ className: t, ...e }, r) => {
  const a = q();
  return /* @__PURE__ */ n(
    jt.Root,
    {
      className: d("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: r,
      dir: a
    }
  );
});
Cn.displayName = jt.Root.displayName;
const be = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  jt.Item,
  {
    ref: r,
    className: d(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ n(jt.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ n(Se, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
be.displayName = jt.Item.displayName;
const Sn = Ut.Root, Rn = Ut.Trigger, Be = c.forwardRef(({ className: t, align: e = "center", sideOffset: r = 4, ...a }, o) => {
  const i = q();
  return /* @__PURE__ */ n(Ut.Portal, { children: /* @__PURE__ */ n(
    Ut.Content,
    {
      ref: o,
      align: e,
      sideOffset: r,
      className: d(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      dir: i
    }
  ) });
});
Be.displayName = Ut.Content.displayName;
const Ca = pt.Portal, Tn = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  pt.Overlay,
  {
    ref: r,
    className: d(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Tn.displayName = pt.Overlay.displayName;
const Sa = c.forwardRef(({ className: t, children: e, ...r }, a) => {
  const o = q();
  return /* @__PURE__ */ w(Ca, { children: [
    /* @__PURE__ */ n(Tn, {}),
    /* @__PURE__ */ w(
      pt.Content,
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
            pt.Close,
            {
              className: d(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ n(Re, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Sa.displayName = pt.Content.displayName;
const Ra = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  pt.Title,
  {
    ref: r,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Ra.displayName = pt.Title.displayName;
const Ta = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  pt.Description,
  {
    ref: r,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Ta.displayName = pt.Description.displayName;
const Ae = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Q,
  {
    ref: r,
    className: d(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
Ae.displayName = Q.displayName;
const Oe = c.forwardRef(({ className: t, ...e }, r) => {
  const a = q();
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ n(on, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ n(
      Q.Input,
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
Oe.displayName = Q.Input.displayName;
const Pe = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Q.List,
  {
    ref: r,
    className: d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
Pe.displayName = Q.List.displayName;
const Fe = c.forwardRef((t, e) => /* @__PURE__ */ n(Q.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Fe.displayName = Q.Empty.displayName;
const _n = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Q.Group,
  {
    ref: r,
    className: d(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
_n.displayName = Q.Group.displayName;
const _a = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Q.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
_a.displayName = Q.Separator.displayName;
const Xe = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Q.Item,
  {
    ref: r,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Xe.displayName = Q.Item.displayName;
function za(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function ve({
  id: t,
  options: e = [],
  className: r,
  buttonClassName: a,
  popoverContentClassName: o,
  value: i,
  onChange: l = () => {
  },
  getOptionLabel: s = za,
  icon: p = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: m = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: h = "outline",
  alignDropDown: g = "start",
  isDisabled: v = !1,
  ...R
}) {
  const [y, C] = A(!1);
  return /* @__PURE__ */ w(Sn, { open: y, onOpenChange: C, ...R, children: [
    /* @__PURE__ */ n(Rn, { asChild: !0, children: /* @__PURE__ */ w(
      E,
      {
        variant: h,
        role: "combobox",
        "aria-expanded": y,
        id: t,
        className: d(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? r
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            p && /* @__PURE__ */ n("div", { className: "tw-pe-2", children: p }),
            /* @__PURE__ */ n("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: i ? s(i) : u })
          ] }),
          /* @__PURE__ */ n(Te, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(
      Be,
      {
        align: g,
        className: d("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ w(Ae, { children: [
          /* @__PURE__ */ n(Oe, { placeholder: m, className: "tw-text-inherit" }),
          /* @__PURE__ */ n(Fe, { children: f }),
          /* @__PURE__ */ n(Pe, { children: e.map((k) => /* @__PURE__ */ w(
            Xe,
            {
              value: s(k),
              onSelect: () => {
                l(k), C(!1);
              },
              children: [
                /* @__PURE__ */ n(
                  Vt,
                  {
                    className: d("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !i || s(i) !== s(k)
                    })
                  }
                ),
                s(k)
              ]
            },
            s(k)
          )) })
        ] })
      }
    )
  ] });
}
function Ea({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: r,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: i
}) {
  const l = J(
    () => Array.from({ length: i }, (u, m) => m + 1),
    [i]
  );
  return /* @__PURE__ */ w(It, { children: [
    /* @__PURE__ */ n(U, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ n(
      ve,
      {
        isDisabled: o,
        onChange: (u) => {
          r(u), u > e && a(u);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: l,
        getOptionLabel: (u) => u.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ n(U, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ n(
      ve,
      {
        isDisabled: o,
        onChange: (u) => {
          a(u), u < t && r(u);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: l,
        getOptionLabel: (u) => u.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Ma = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Ma || {});
const us = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), ce = (t, e) => t[e] ?? e;
function ms({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: r,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: i,
  handleSelectEndChapter: l,
  startChapter: s,
  handleSelectStartChapter: p,
  localizedStrings: u
}) {
  const m = ce(u, "%webView_bookSelector_currentBook%"), f = ce(u, "%webView_bookSelector_choose%"), h = ce(u, "%webView_bookSelector_chooseBooks%"), [g, v] = A(
    "current book"
    /* CURRENT_BOOK */
  ), R = (y) => {
    v(y), t(y);
  };
  return /* @__PURE__ */ n(
    Cn,
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (y) => R(y),
      children: /* @__PURE__ */ w("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ n(be, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ n(U, { className: "tw-ms-1", children: m })
          ] }),
          /* @__PURE__ */ n(U, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ n("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ n(
            Ea,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: p,
              handleSelectEndChapter: l,
              chapterCount: o,
              startChapter: s,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ n(be, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ n(U, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ n(U, { className: "tw-flex tw-items-center", children: a.map((y) => $.bookIdToEnglishName(y)).join(", ") }),
          /* @__PURE__ */ n(
            E,
            {
              disabled: g === "current book",
              onClick: () => r(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
function Da({ table: t }) {
  return /* @__PURE__ */ w(Kt, { children: [
    /* @__PURE__ */ n(pr, { asChild: !0, children: /* @__PURE__ */ w(E, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ n(ur, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(Pt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ n(se, { children: "Toggle columns" }),
      /* @__PURE__ */ n(Wt, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ n(
        Ee,
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
const _t = Y.Root, Ia = Y.Group, zt = Y.Value, yt = c.forwardRef(({ className: t, children: e, ...r }, a) => {
  const o = q();
  return /* @__PURE__ */ w(
    Y.Trigger,
    {
      ref: a,
      className: d(
        "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
        t
      ),
      ...r,
      dir: o,
      children: [
        e,
        /* @__PURE__ */ n(Y.Icon, { asChild: !0, children: /* @__PURE__ */ n(qt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
yt.displayName = Y.Trigger.displayName;
const zn = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Y.ScrollUpButton,
  {
    ref: r,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ n(sn, { className: "tw-h-4 tw-w-4" })
  }
));
zn.displayName = Y.ScrollUpButton.displayName;
const En = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Y.ScrollDownButton,
  {
    ref: r,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ n(qt, { className: "tw-h-4 tw-w-4" })
  }
));
En.displayName = Y.ScrollDownButton.displayName;
const Nt = c.forwardRef(({ className: t, children: e, position: r = "popper", ...a }, o) => {
  const i = q();
  return /* @__PURE__ */ n(Y.Portal, { children: /* @__PURE__ */ w(
    Y.Content,
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
        /* @__PURE__ */ n(zn, {}),
        /* @__PURE__ */ n(
          Y.Viewport,
          {
            className: d(
              "tw-p-1",
              r === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ n("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ n(En, {})
      ]
    }
  ) });
});
Nt.displayName = Y.Content.displayName;
const Va = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Y.Label,
  {
    ref: r,
    className: d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Va.displayName = Y.Label.displayName;
const Z = c.forwardRef(({ className: t, children: e, ...r }, a) => /* @__PURE__ */ w(
  Y.Item,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...r,
    children: [
      /* @__PURE__ */ n("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ n(Y.ItemIndicator, { children: /* @__PURE__ */ n(Vt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ n(Y.ItemText, { children: e })
    ]
  }
));
Z.displayName = Y.Item.displayName;
const Ba = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Y.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ba.displayName = Y.Separator.displayName;
function Aa({ table: t }) {
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
        _t,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ n(yt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ n(zt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ n(Nt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ n(Z, { value: `${e}`, children: e }, e)) })
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
        E,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ n(mr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        E,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ n(hr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        E,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ n(gr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        E,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ n(fr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Zt = c.forwardRef(({ className: t, stickyHeader: e, ...r }, a) => /* @__PURE__ */ n("div", { className: d("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ n(
  "table",
  {
    ref: a,
    className: d("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...r
  }
) }));
Zt.displayName = "Table";
const Qt = c.forwardRef(({ className: t, stickyHeader: e, ...r }, a) => /* @__PURE__ */ n(
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
Qt.displayName = "TableHeader";
const te = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n("tbody", { ref: r, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
te.displayName = "TableBody";
const Oa = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "tfoot",
  {
    ref: r,
    className: d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Oa.displayName = "TableFooter";
const ct = c.forwardRef(
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
ct.displayName = "TableRow";
const vt = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
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
vt.displayName = "TableHead";
const at = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "td",
  {
    ref: r,
    className: d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
at.displayName = "TableCell";
const Pa = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  "caption",
  {
    ref: r,
    className: d("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Pa.displayName = "TableCaption";
function Fa({
  columns: t,
  data: e,
  enablePagination: r = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: i = !1,
  onRowClickHandler: l = () => {
  }
}) {
  var y;
  const [s, p] = A([]), [u, m] = A([]), [f, h] = A({}), [g, v] = A({}), R = ln({
    data: e,
    columns: t,
    getCoreRowModel: cn(),
    ...r && { getPaginationRowModel: Yr() },
    onSortingChange: p,
    getSortedRowModel: dn(),
    onColumnFiltersChange: m,
    getFilteredRowModel: Lr(),
    onColumnVisibilityChange: h,
    onRowSelectionChange: v,
    state: {
      sorting: s,
      columnFilters: u,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ w("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ n(Da, { table: R }),
    /* @__PURE__ */ w(Zt, { stickyHeader: i, children: [
      /* @__PURE__ */ n(Qt, { stickyHeader: i, children: R.getHeaderGroups().map((C) => /* @__PURE__ */ n(ct, { children: C.headers.map((k) => /* @__PURE__ */ n(vt, { children: k.isPlaceholder ? void 0 : Ht(k.column.columnDef.header, k.getContext()) }, k.id)) }, C.id)) }),
      /* @__PURE__ */ n(te, { children: (y = R.getRowModel().rows) != null && y.length ? R.getRowModel().rows.map((C) => /* @__PURE__ */ n(
        ct,
        {
          onClick: () => l(C, R),
          "data-state": C.getIsSelected() && "selected",
          children: C.getVisibleCells().map((k) => /* @__PURE__ */ n(at, { children: Ht(k.column.columnDef.cell, k.getContext()) }, k.id))
        },
        C.id
      )) : /* @__PURE__ */ n(ct, { children: /* @__PURE__ */ n(at, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    r && /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ n(
        E,
        {
          variant: "outline",
          size: "sm",
          onClick: () => R.previousPage(),
          disabled: !R.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ n(
        E,
        {
          variant: "outline",
          size: "sm",
          onClick: () => R.nextPage(),
          disabled: !R.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && a && /* @__PURE__ */ n(Aa, { table: R })
  ] });
}
const Et = re(({ className: t, ...e }, r) => /* @__PURE__ */ n(br, { size: 35, className: d("tw-animate-spin", t), ...e, ref: r }));
Et.displayName = "Spinner";
function hs({
  isInstalling: t,
  handleClick: e,
  buttonText: r,
  className: a,
  ...o
}) {
  return /* @__PURE__ */ n(
    E,
    {
      className: d(
        "tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t,
          "tw-bg-blue-600": !t,
          "tw-bg-white tw-text-blue-600 hover:tw-text-white": !r,
          "tw-w-20": r
        },
        a
      ),
      onClick: e,
      ...o,
      children: t ? /* @__PURE__ */ n(Et, { size: 15 }) : /* @__PURE__ */ w(It, { children: [
        /* @__PURE__ */ n(vr, { size: 25, className: d("tw-h-4 tw-w-4", { "tw-mr-1": r }) }),
        r
      ] })
    }
  );
}
function gs({ isEnabling: t, handleClick: e, className: r, ...a }) {
  return /* @__PURE__ */ n(
    E,
    {
      className: d(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        r
      ),
      onClick: e,
      ...a,
      children: t ? /* @__PURE__ */ w(It, { children: [
        /* @__PURE__ */ n(Et, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function fs({
  isDisabling: t,
  handleClick: e,
  className: r,
  ...a
}) {
  return /* @__PURE__ */ n(
    E,
    {
      className: d(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        r
      ),
      onClick: e,
      ...a,
      children: t ? /* @__PURE__ */ w(It, { children: [
        /* @__PURE__ */ n(Et, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function bs({ isUpdating: t, handleClick: e, className: r, ...a }) {
  return /* @__PURE__ */ n(
    E,
    {
      className: d(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        r
      ),
      onClick: e,
      ...a,
      children: t ? /* @__PURE__ */ w(It, { children: [
        /* @__PURE__ */ n(Et, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function vs({ id: t, markdown: e, className: r, anchorTarget: a }) {
  const o = J(
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
  return /* @__PURE__ */ n("div", { id: t, className: d("pr-twp tw-prose", r), children: /* @__PURE__ */ n(Ur, { options: o, children: e }) });
}
const Xa = re((t, e) => /* @__PURE__ */ w(
  E,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ n(xr, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ n(
        qt,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var Ga = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Ga || {});
function xs({ id: t, groups: e }) {
  return /* @__PURE__ */ n("div", { id: t, children: /* @__PURE__ */ w(Kt, { children: [
    /* @__PURE__ */ n(oe, { asChild: !0, children: /* @__PURE__ */ n(Xa, {}) }),
    /* @__PURE__ */ n(Pt, { children: e.map((r) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ n(se, { children: r.label }),
      /* @__PURE__ */ n(mn, { children: r.items.map((a) => /* @__PURE__ */ n("div", { children: a.itemType === 0 ? /* @__PURE__ */ n(Ee, { onClick: a.onClick, children: a.label }) : /* @__PURE__ */ n(fn, { onClick: a.onClick, value: a.label, children: a.label }) }, a.label)) }),
      /* @__PURE__ */ n(Wt, {})
    ] }, r.label)) })
  ] }) });
}
function ys({ id: t, message: e }) {
  return /* @__PURE__ */ n("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ n("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ n("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function Ns({ id: t, category: e, downloads: r, languages: a, moreInfoUrl: o }) {
  const i = new Fr("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((s, p) => s + p, 0)), l = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ w(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ n("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ n("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ n("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ n(yr, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ n("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: i })
          ] }),
          /* @__PURE__ */ n("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ n("div", { className: "tw-flex tw-items-center", children: a.slice(0, 3).map((s) => /* @__PURE__ */ n(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: s.toUpperCase()
            },
            s
          )) }),
          a.length > 3 && /* @__PURE__ */ w(
            "button",
            {
              type: "button",
              onClick: () => l(),
              className: "tw-text-xs tw-text-gray-500 tw-underline",
              children: [
                "+",
                a.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ n("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ w("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ w(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ n(Nr, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ w(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ n(kr, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function $a({ id: t, versionHistory: e }) {
  const [r, a] = A(!1), o = /* @__PURE__ */ new Date();
  function i(s) {
    const p = new Date(s), u = new Date(o.getTime() - p.getTime()), m = u.getUTCFullYear() - 1970, f = u.getUTCMonth(), h = u.getUTCDate() - 1;
    let g = "";
    return m > 0 ? g = `${m.toString()} year${m === 1 ? "" : "s"} ago` : f > 0 ? g = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? g = "today" : g = `${h.toString()} day${h === 1 ? "" : "s"} ago`, g;
  }
  const l = Object.entries(e).sort((s, p) => p[0].localeCompare(s[0]));
  return /* @__PURE__ */ w("div", { id: t, children: [
    /* @__PURE__ */ n("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ n("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (r ? l : l.slice(0, 5)).map((s) => /* @__PURE__ */ w("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ n("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ n("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ n("span", { children: s[1].description }) }) }),
      /* @__PURE__ */ w("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ w("div", { children: [
          "Version ",
          s[0]
        ] }),
        /* @__PURE__ */ n("div", { children: i(s[1].date) })
      ] })
    ] }, s[0])) }),
    l.length > 5 && /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        onClick: () => a(!r),
        className: "tw-text-xs tw-text-gray-500 tw-underline",
        children: r ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function ks({
  id: t,
  publisherDisplayName: e,
  fileSize: r,
  locales: a,
  versionHistory: o
}) {
  const i = J(() => Xr(r), [r]), s = ((p) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return p.map((m) => u.of(m));
  })(a);
  return /* @__PURE__ */ n("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ w("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ n($a, { versionHistory: o }),
    /* @__PURE__ */ n("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ w("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ n("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ w("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ n("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ n("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ n("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ n("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ n("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ w("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ n("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ n("span", { className: "tw-font-semibold", children: s.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const La = Mt(
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
), Mn = c.forwardRef(
  ({ className: t, variant: e, ...r }, a) => /* @__PURE__ */ n("div", { ref: a, className: d("pr-twp", La({ variant: e }), t), ...r })
);
Mn.displayName = "Badge";
function Ya({
  entries: t,
  getEntriesCount: e = void 0,
  selected: r,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: i = "No entries found",
  customSelectedText: l,
  isDisabled: s = !1,
  sortSelected: p = !1,
  icon: u = void 0,
  className: m = void 0
}) {
  const [f, h] = A(!1), g = it(
    (y) => {
      var k;
      const C = (k = t.find((V) => V.label === y)) == null ? void 0 : k.value;
      C && a(
        r.includes(C) ? r.filter((V) => V !== C) : [...r, C]
      );
    },
    [t, r, a]
  ), v = () => l || o, R = J(() => {
    if (!p) return t;
    const y = t.filter((k) => k.starred).sort((k, V) => k.label.localeCompare(V.label)), C = t.filter((k) => !k.starred).sort((k, V) => {
      const G = r.includes(k.value), et = r.includes(V.value);
      return G && !et ? -1 : !G && et ? 1 : k.label.localeCompare(V.label);
    });
    return [...y, ...C];
  }, [t, r, p]);
  return /* @__PURE__ */ n("div", { className: m, children: /* @__PURE__ */ w(Sn, { open: f, onOpenChange: h, children: [
    /* @__PURE__ */ n(Rn, { asChild: !0, children: /* @__PURE__ */ w(
      E,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": f,
        className: d(
          "tw-w-full tw-justify-between",
          r.length > 0 && r.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: s,
        children: [
          /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ n("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ n("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ n(
              "div",
              {
                className: d({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": r.length === 0 || r.length === t.length
                }),
                children: /* @__PURE__ */ n("div", { className: "tw-font-normal", children: v() })
              }
            )
          ] }),
          /* @__PURE__ */ n(Te, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Be, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ w(Ae, { children: [
      /* @__PURE__ */ n(Oe, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ w(Pe, { children: [
        /* @__PURE__ */ n(Fe, { children: i }),
        /* @__PURE__ */ n(_n, { children: R.map((y) => {
          const C = e ? e(y) : void 0;
          return /* @__PURE__ */ w(
            Xe,
            {
              value: y.label,
              onSelect: g,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                  Vt,
                  {
                    className: d(
                      "tw-h-4 tw-w-4",
                      r.includes(y.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ n("div", { className: "tw-w-4", children: y.starred && /* @__PURE__ */ n(Cr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ n("div", { className: "tw-flex-grow", children: y.label }),
                e && /* @__PURE__ */ n("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: C })
              ]
            },
            y.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function Cs({
  entries: t,
  getEntriesCount: e,
  selected: r,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: i,
  customSelectedText: l,
  isDisabled: s,
  sortSelected: p,
  icon: u,
  className: m,
  badgesPlaceholder: f
}) {
  return /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ n(
      Ya,
      {
        entries: t,
        getEntriesCount: e,
        selected: r,
        onChange: a,
        placeholder: o,
        commandEmptyMessage: i,
        customSelectedText: l,
        isDisabled: s,
        sortSelected: p,
        icon: u,
        className: m
      }
    ),
    r.length > 0 ? /* @__PURE__ */ n("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: r.map((h) => {
      var g;
      return /* @__PURE__ */ w(Mn, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ n(
          E,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(r.filter((v) => v !== h)),
            children: /* @__PURE__ */ n(Re, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (g = t.find((v) => v.value === h)) == null ? void 0 : g.label
      ] }, h);
    }) }) : /* @__PURE__ */ n(U, { children: f })
  ] });
}
function Ha({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: r
}) {
  const a = r["%webView_inventory_occurrences_table_header_reference%"], o = r["%webView_inventory_occurrences_table_header_occurrence%"], i = J(() => {
    const l = [];
    return t.forEach((s) => {
      l.some((p) => _e(p, s)) || l.push(s);
    }), l;
  }, [t]);
  return /* @__PURE__ */ w(Zt, { stickyHeader: !0, children: [
    /* @__PURE__ */ n(Qt, { stickyHeader: !0, children: /* @__PURE__ */ w(ct, { children: [
      /* @__PURE__ */ n(vt, { children: a }),
      /* @__PURE__ */ n(vt, { children: o })
    ] }) }),
    /* @__PURE__ */ n(te, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ w(
      ct,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ n(at, { children: `${$.bookIdToEnglishName(l.reference.book)} ${l.reference.chapterNum}:${l.reference.verseNum}` }),
          /* @__PURE__ */ n(at, { children: l.text })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Ge = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  ge.Root,
  {
    ref: r,
    className: d(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ n(
      ge.Indicator,
      {
        className: d("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ n(Vt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Ge.displayName = ge.Root.displayName;
const Dn = Mt(
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
), ja = c.forwardRef(({ className: t, variant: e, size: r, ...a }, o) => /* @__PURE__ */ n(
  pn.Root,
  {
    ref: o,
    className: d(Dn({ variant: e, size: r, className: t })),
    ...a
  }
));
ja.displayName = pn.Root.displayName;
const In = c.createContext({
  size: "default",
  variant: "default"
}), Vn = c.forwardRef(({ className: t, variant: e, size: r, children: a, ...o }, i) => {
  const l = q();
  return /* @__PURE__ */ n(
    ae.Root,
    {
      ref: i,
      className: d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: l,
      children: /* @__PURE__ */ n(
        In.Provider,
        {
          value: { variant: e, size: r },
          children: a
        }
      )
    }
  );
});
Vn.displayName = ae.Root.displayName;
const ee = c.forwardRef(({ className: t, children: e, variant: r, size: a, ...o }, i) => {
  const l = c.useContext(In);
  return /* @__PURE__ */ n(
    ae.Item,
    {
      ref: i,
      className: d(
        Dn({
          variant: l.variant || r,
          size: l.size || a
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
ee.displayName = ae.Item.displayName;
const ie = (t) => t === "asc" ? /* @__PURE__ */ n(_r, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ n(zr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ n(Er, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Ss = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ w(E, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ie(e.getIsSorted())
  ] })
}), Ua = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (r) => r.items[e],
  header: ({ column: r }) => /* @__PURE__ */ w(E, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    t,
    ie(r.getIsSorted())
  ] })
}), Rs = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ n("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ w(E, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    ie(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ n("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), pe = (t, e, r, a, o, i) => {
  let l = [...r];
  t.forEach((p) => {
    e === "approved" ? l.includes(p) || l.push(p) : l = l.filter((u) => u !== p);
  }), a(l);
  let s = [...o];
  t.forEach((p) => {
    e === "unapproved" ? s.includes(p) || s.push(p) : s = s.filter((u) => u !== p);
  }), i(s);
}, Ts = (t, e, r, a, o) => ({
  accessorKey: "status",
  header: ({ column: i }) => /* @__PURE__ */ n("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ w(E, { variant: "ghost", onClick: () => i.toggleSorting(void 0), children: [
    t,
    ie(i.getIsSorted())
  ] }) }),
  cell: ({ row: i }) => {
    const l = i.getValue("status"), s = i.getValue("item");
    return /* @__PURE__ */ w(Vn, { value: l, variant: "outline", type: "single", children: [
      /* @__PURE__ */ n(
        ee,
        {
          onClick: (p) => {
            p.stopPropagation(), pe(
              [s],
              "approved",
              e,
              r,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ n(Sr, {})
        }
      ),
      /* @__PURE__ */ n(
        ee,
        {
          onClick: (p) => {
            p.stopPropagation(), pe(
              [s],
              "unapproved",
              e,
              r,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ n(Rr, {})
        }
      ),
      /* @__PURE__ */ n(
        ee,
        {
          onClick: (p) => {
            p.stopPropagation(), pe(
              [s],
              "unknown",
              e,
              r,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ n(Tr, {})
        }
      )
    ] });
  }
}), qa = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), nn = (t) => {
  const e = /^\\[vc]\s+(\d+)/, r = t.match(e);
  if (r)
    return +r[1];
}, Ja = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ka = (t, e, r) => r.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", _s = Object.freeze([
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
]), Wa = (t, e, r) => {
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), r !== "" && (a = a.filter((o) => o.items[0].includes(r))), a;
}, Za = (t, e, r, a, o) => {
  if (!t) return [];
  const i = [];
  let l = e.book, s = e.chapterNum, p = e.verseNum;
  return qa(t).forEach((m) => {
    m.startsWith("\\id") && (l = Ja(m), s = 0, p = 0), m.startsWith("\\c") && (s = nn(m), p = 0), m.startsWith("\\v") && (p = nn(m), s === 0 && (s = e.chapterNum));
    let f = o.exec(m) ?? void 0;
    for (; f; ) {
      const h = [];
      f.forEach((y) => h.push(y));
      const g = f.index, v = i.find((y) => _e(y.items, h)), R = {
        reference: {
          book: l !== void 0 ? l : "",
          chapterNum: s !== void 0 ? s : -1,
          verseNum: p !== void 0 ? p : -1
        },
        text: Gr(m, Math.max(0, g - 25), Math.min(g + 25, m.length))
      };
      if (v)
        v.count += 1, v.occurrences.push(R);
      else {
        const y = {
          items: h,
          count: 1,
          status: Ka(h[0], r, a),
          occurrences: [R]
        };
        i.push(y);
      }
      f = o.exec(m) ?? void 0;
    }
  }), i;
}, ht = (t, e) => t[e] ?? e;
function zs({
  verseRef: t,
  setVerseRef: e,
  localizedStrings: r,
  extractItems: a,
  additionalItemsLabels: o,
  approvedItems: i,
  unapprovedItems: l,
  text: s,
  scope: p,
  onScopeChange: u,
  columns: m
}) {
  const f = ht(r, "%webView_inventory_all%"), h = ht(r, "%webView_inventory_approved%"), g = ht(r, "%webView_inventory_unapproved%"), v = ht(r, "%webView_inventory_unknown%"), R = ht(r, "%webView_inventory_scope_currentBook%"), y = ht(r, "%webView_inventory_scope_chapter%"), C = ht(r, "%webView_inventory_scope_verse%"), k = ht(r, "%webView_inventory_filter_text%"), V = ht(
    r,
    "%webView_inventory_show_additional_items%"
  ), [G, et] = A(!1), [st, kt] = A("all"), [x, M] = A(""), [K, P] = A([]), Ct = J(() => s ? a instanceof RegExp ? Za(s, t, i, l, a) : a(s, t, i, l) : [], [s, a, t, i, l]), ut = J(() => {
    if (G) return Ct;
    const S = [];
    return Ct.forEach((H) => {
      const lt = H.items[0], rt = S.find(
        (ft) => ft.items[0] === lt
      );
      rt ? (rt.count += H.count, rt.occurrences = rt.occurrences.concat(H.occurrences)) : S.push({
        items: [lt],
        count: H.count,
        occurrences: H.occurrences,
        status: H.status
      });
    }), S;
  }, [G, Ct]), N = J(() => Wa(ut, st, x), [ut, st, x]), T = J(() => {
    var lt, rt;
    if (!G) return m;
    const S = (lt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : lt.length;
    if (!S) return m;
    const H = [];
    for (let ft = 0; ft < S; ft++)
      H.push(
        Ua(
          ((rt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : rt[ft]) || "Additional Item",
          ft + 1
        )
      );
    return [...H, ...m];
  }, [o == null ? void 0 : o.tableHeaders, m, G]);
  xt(() => {
    N.length === 0 ? P([]) : N.length === 1 && P(N[0].items);
  }, [N]);
  const O = (S, H) => {
    H.setRowSelection(() => {
      const lt = {};
      return lt[S.index] = !0, lt;
    }), P(S.original.items);
  }, D = (S) => {
    if (S === "book" || S === "chapter" || S === "verse")
      u(S);
    else
      throw new Error(`Invalid scope value: ${S}`);
  }, L = (S) => {
    if (S === "all" || S === "approved" || S === "unapproved" || S === "unknown")
      kt(S);
    else
      throw new Error(`Invalid status filter value: ${S}`);
  }, mt = J(() => {
    if (ut.length === 0 || K.length === 0) return [];
    const S = ut.filter((H) => _e(
      G ? H.items : [H.items[0]],
      K
    ));
    if (S.length > 1) throw new Error("Selected item is not unique");
    return S.length === 0 ? [] : S[0].occurrences;
  }, [K, G, ut]);
  return /* @__PURE__ */ w("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ w(
        _t,
        {
          onValueChange: (S) => L(S),
          defaultValue: st,
          children: [
            /* @__PURE__ */ n(yt, { className: "tw-m-1", children: /* @__PURE__ */ n(zt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(Nt, { children: [
              /* @__PURE__ */ n(Z, { value: "all", children: f }),
              /* @__PURE__ */ n(Z, { value: "approved", children: h }),
              /* @__PURE__ */ n(Z, { value: "unapproved", children: g }),
              /* @__PURE__ */ n(Z, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(_t, { onValueChange: (S) => D(S), defaultValue: p, children: [
        /* @__PURE__ */ n(yt, { className: "tw-m-1", children: /* @__PURE__ */ n(zt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(Nt, { children: [
          /* @__PURE__ */ n(Z, { value: "book", children: R }),
          /* @__PURE__ */ n(Z, { value: "chapter", children: y }),
          /* @__PURE__ */ n(Z, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ n(
        Ot,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: k,
          value: x,
          onChange: (S) => {
            M(S.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ w("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ n(
          Ge,
          {
            className: "tw-m-1",
            checked: G,
            onCheckedChange: (S) => {
              et(S);
            }
          }
        ),
        /* @__PURE__ */ n(U, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? V })
      ] })
    ] }),
    /* @__PURE__ */ n("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ n(
      Fa,
      {
        columns: T,
        data: N,
        onRowClickHandler: O,
        stickyHeader: !0
      }
    ) }),
    mt.length > 0 && /* @__PURE__ */ n("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ n(
      Ha,
      {
        occurrenceData: mt,
        setScriptureReference: e,
        localizedStrings: r
      }
    ) })
  ] });
}
const $e = c.forwardRef(({ className: t, orientation: e = "horizontal", decorative: r = !0, ...a }, o) => /* @__PURE__ */ n(
  un.Root,
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
$e.displayName = un.Root.displayName;
function rn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      className: d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const Le = Jt.Provider, Ye = Jt.Root, He = Jt.Trigger, we = c.forwardRef(({ className: t, sideOffset: e = 4, ...r }, a) => /* @__PURE__ */ n(
  Jt.Content,
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
we.displayName = Jt.Content.displayName;
const Qa = "16rem", to = "3rem", Bn = c.createContext(void 0);
function le() {
  const t = c.useContext(Bn);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const An = c.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: r,
    className: a,
    style: o,
    children: i,
    side: l = "primary",
    ...s
  }, p) => {
    const [u, m] = c.useState(t), f = e ?? u, h = c.useCallback(
      (V) => {
        const G = typeof V == "function" ? V(f) : V;
        r ? r(G) : m(G);
      },
      [r, f]
    ), g = c.useCallback(() => h((V) => !V), [h]), v = f ? "expanded" : "collapsed", C = q() === "ltr" ? l : l === "primary" ? "secondary" : "primary", k = c.useMemo(
      () => ({
        state: v,
        open: f,
        setOpen: h,
        toggleSidebar: g,
        side: C
      }),
      [v, f, h, g, C]
    );
    return /* @__PURE__ */ n(Bn.Provider, { value: k, children: /* @__PURE__ */ n(Le, { delayDuration: 0, children: /* @__PURE__ */ n(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Qa,
            "--sidebar-width-icon": to,
            ...o
          }
        ),
        className: d(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          a
        ),
        ref: p,
        ...s,
        children: i
      }
    ) }) });
  }
);
An.displayName = "SidebarProvider";
const On = c.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: r, children: a, ...o }, i) => {
  const l = le();
  return e === "none" ? /* @__PURE__ */ n(
    "div",
    {
      className: d(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        r
      ),
      ref: i,
      ...o,
      children: a
    }
  ) : /* @__PURE__ */ w(
    "div",
    {
      ref: i,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": l.state,
      "data-collapsible": l.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": l.side,
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
              l.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
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
On.displayName = "Sidebar";
const eo = c.forwardRef(({ className: t, onClick: e, ...r }, a) => {
  const o = le();
  return /* @__PURE__ */ w(
    E,
    {
      ref: a,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: d("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), o.toggleSidebar();
      },
      ...r,
      children: [
        o.side === "primary" ? /* @__PURE__ */ n(Mr, {}) : /* @__PURE__ */ n(Dr, {}),
        /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
eo.displayName = "SidebarTrigger";
const no = c.forwardRef(
  ({ className: t, ...e }, r) => {
    const { toggleSidebar: a } = le();
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
no.displayName = "SidebarRail";
const Pn = c.forwardRef(
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
Pn.displayName = "SidebarInset";
const ro = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  Ot,
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
ro.displayName = "SidebarInput";
const ao = c.forwardRef(
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
ao.displayName = "SidebarHeader";
const oo = c.forwardRef(
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
oo.displayName = "SidebarFooter";
const so = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  $e,
  {
    ref: r,
    "data-sidebar": "separator",
    className: d("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
so.displayName = "SidebarSeparator";
const Fn = c.forwardRef(
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
Fn.displayName = "SidebarContent";
const xe = c.forwardRef(
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
xe.displayName = "SidebarGroup";
const ye = c.forwardRef(({ className: t, asChild: e = !1, ...r }, a) => /* @__PURE__ */ n(
  e ? Bt : "div",
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
ye.displayName = "SidebarGroupLabel";
const io = c.forwardRef(({ className: t, asChild: e = !1, ...r }, a) => /* @__PURE__ */ n(
  e ? Bt : "button",
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
io.displayName = "SidebarGroupAction";
const Ne = c.forwardRef(
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
Ne.displayName = "SidebarGroupContent";
const Xn = c.forwardRef(
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
Xn.displayName = "SidebarMenu";
const Gn = c.forwardRef(
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
Gn.displayName = "SidebarMenuItem";
const wo = Mt(
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
), $n = c.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: r = "default",
    size: a = "default",
    tooltip: o,
    className: i,
    ...l
  }, s) => {
    const p = t ? Bt : "button", { state: u } = le(), m = /* @__PURE__ */ n(
      p,
      {
        ref: s,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: d(wo({ variant: r, size: a }), i),
        ...l
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ w(Ye, { children: [
      /* @__PURE__ */ n(He, { asChild: !0, children: m }),
      /* @__PURE__ */ n(we, { side: "right", align: "center", hidden: u !== "collapsed", ...o })
    ] })) : m;
  }
);
$n.displayName = "SidebarMenuButton";
const lo = c.forwardRef(({ className: t, asChild: e = !1, showOnHover: r = !1, ...a }, o) => /* @__PURE__ */ n(
  e ? Bt : "button",
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
lo.displayName = "SidebarMenuAction";
const co = c.forwardRef(
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
co.displayName = "SidebarMenuBadge";
const po = c.forwardRef(({ className: t, showIcon: e = !1, ...r }, a) => {
  const o = c.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...r,
      children: [
        e && /* @__PURE__ */ n(rn, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ n(
          rn,
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
po.displayName = "SidebarMenuSkeleton";
const uo = c.forwardRef(
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
uo.displayName = "SidebarMenuSub";
const mo = c.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ n("li", { ref: e, ...t })
);
mo.displayName = "SidebarMenuSubItem";
const ho = c.forwardRef(({ asChild: t = !1, size: e = "md", isActive: r, className: a, ...o }, i) => /* @__PURE__ */ n(
  t ? Bt : "a",
  {
    ref: i,
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
ho.displayName = "SidebarMenuSubButton";
function go({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  handleSelectSidebarItem: a,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: l,
  buttonPlaceholderText: s,
  className: p
}) {
  const u = it(
    (h, g) => {
      a(h, g);
    },
    [a]
  ), m = it(
    (h) => {
      const g = r.find((v) => v.projectId === h);
      return g ? g.projectName : h;
    },
    [r]
  ), f = it(
    (h) => !o.projectId && h === o.label,
    [o]
  );
  return /* @__PURE__ */ n(
    On,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", p),
      children: /* @__PURE__ */ w(Fn, { children: [
        /* @__PURE__ */ w(xe, { children: [
          /* @__PURE__ */ n(ye, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ n(Ne, { children: /* @__PURE__ */ n(Xn, { children: Object.entries(e).map(([h, g]) => /* @__PURE__ */ n(Gn, { children: /* @__PURE__ */ n(
            $n,
            {
              onClick: () => u(h),
              isActive: f(h),
              children: /* @__PURE__ */ n("span", { className: "tw-pl-3", children: g })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ w(xe, { children: [
          /* @__PURE__ */ n(ye, { className: "tw-text-sm", children: l }),
          /* @__PURE__ */ n(Ne, { className: "tw-pl-3", children: /* @__PURE__ */ n(
            ve,
            {
              buttonVariant: "ghost",
              buttonClassName: d("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: r.flatMap((h) => h.projectId),
              getOptionLabel: (h) => m(h),
              buttonPlaceholder: s,
              onChange: (h) => {
                const g = m(h);
                u(g, h);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ n(Ir, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
function je({
  value: t,
  onSearch: e,
  placeholder: r,
  isFullWidth: a,
  className: o
}) {
  const i = q();
  return /* @__PURE__ */ w("div", { className: d("tw-relative", { "tw-w-full": a }, o), children: [
    /* @__PURE__ */ n(
      on,
      {
        className: d(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": i === "rtl" },
          { "tw-left-3": i === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ n(
      Ot,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: r,
        value: t,
        onChange: (l) => e(l.target.value)
      }
    ),
    t && /* @__PURE__ */ w(
      E,
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
          /* @__PURE__ */ n(Re, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ n("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
function Es({
  id: t,
  extensionLabels: e,
  projectInfo: r,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: i,
  searchValue: l,
  onSearch: s,
  extensionsSidebarGroupLabel: p,
  projectsSidebarGroupLabel: u,
  buttonPlaceholderText: m
}) {
  return /* @__PURE__ */ w("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ n("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ n(
      je,
      {
        className: "tw-w-9/12",
        value: l,
        onSearch: s,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      An,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ n(
            go,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: r,
              handleSelectSidebarItem: o,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: p,
              projectsSidebarGroupLabel: u,
              buttonPlaceholderText: m
            }
          ),
          /* @__PURE__ */ n(Pn, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
const bt = "scrBook", fo = "scrRef", Rt = "source", bo = "details", vo = "Scripture Reference", xo = "Scripture Book", Ln = "Type", yo = "Details";
function No(t, e) {
  const r = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: bt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? vo,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? $.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === bt ? Yt(o.start) : void 0;
      },
      getGroupingValue: (a) => $.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => he(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => Yt(a.start),
      id: fo,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : Yt(o.start);
      },
      sortingFn: (a, o) => he(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: Rt,
      header: r ? (t == null ? void 0 : t.typeColumnName) ?? Ln : void 0,
      cell: (a) => r || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: bo,
      header: (t == null ? void 0 : t.detailsColumnName) ?? yo,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const ko = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let r = 0;
  return t.end && ({ offset: r } = t.end), !t.end || he(t.start, t.end) === 0 ? `${de(t.start)}+${e}` : `${de(t.start)}+${e}-${de(t.end)}+${r}`;
}, an = (t) => `${ko({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ms({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: l,
  onRowSelected: s
}) {
  const [p, u] = A([]), [m, f] = A([{ id: bt, desc: !1 }]), [h, g] = A({}), v = J(
    () => t.flatMap((x) => x.data.map((M) => ({
      ...M,
      source: x.source
    }))),
    [t]
  ), R = J(
    () => No(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: i,
        detailsColumnName: l
      },
      r
    ),
    [a, i, l, r]
  );
  xt(() => {
    p.includes(Rt) ? f([
      { id: Rt, desc: !1 },
      { id: bt, desc: !1 }
    ]) : f([{ id: bt, desc: !1 }]);
  }, [p]);
  const y = ln({
    data: v,
    columns: R,
    state: {
      grouping: p,
      sorting: m,
      rowSelection: h
    },
    onGroupingChange: u,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: jr(),
    getGroupedRowModel: Hr(),
    getCoreRowModel: cn(),
    getSortedRowModel: dn(),
    getRowId: an,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  xt(() => {
    if (s) {
      const x = y.getSelectedRowModel().rowsById, M = Object.keys(x);
      if (M.length === 1) {
        const K = v.find((P) => an(P) === M[0]) || void 0;
        K && s(K);
      }
    }
  }, [h, v, s, y]);
  const C = o ?? xo, k = i ?? Ln, V = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [bt] },
    { label: `Group by ${k}`, value: [Rt] },
    {
      label: `Group by ${C} and ${k}`,
      value: [bt, Rt]
    },
    {
      label: `Group by ${k} and ${C}`,
      value: [Rt, bt]
    }
  ], G = (x) => {
    u(JSON.parse(x));
  }, et = (x, M) => {
    !x.getIsGrouped() && !x.getIsSelected() && x.getToggleSelectedHandler()(M);
  }, st = (x, M) => x.getIsGrouped() ? "" : d("banded-row", M % 2 === 0 ? "even" : "odd"), kt = (x, M, K) => {
    if (!((x == null ? void 0 : x.length) === 0 || M.depth < K.column.getGroupedIndex())) {
      if (M.getIsGrouped())
        switch (M.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (M.depth) {
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
      _t,
      {
        value: JSON.stringify(p),
        onValueChange: (x) => {
          G(x);
        },
        children: [
          /* @__PURE__ */ n(yt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ n(zt, {}) }),
          /* @__PURE__ */ n(Nt, { position: "item-aligned", children: /* @__PURE__ */ n(Ia, { children: V.map((x) => /* @__PURE__ */ n(Z, { value: JSON.stringify(x.value), children: x.label }, x.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(Zt, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ n(Qt, { children: y.getHeaderGroups().map((x) => /* @__PURE__ */ n(ct, { children: x.headers.filter((M) => M.column.columnDef.header).map((M) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ n(vt, { colSpan: M.colSpan, className: "top-0 tw-sticky", children: M.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          M.column.getCanGroup() ? /* @__PURE__ */ n(
            E,
            {
              variant: "ghost",
              title: `Toggle grouping by ${M.column.columnDef.header}`,
              onClick: M.column.getToggleGroupingHandler(),
              type: "button",
              children: M.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Ht(M.column.columnDef.header, M.getContext())
        ] }) }, M.id)
      )) }, x.id)) }),
      /* @__PURE__ */ n(te, { children: y.getRowModel().rows.map((x, M) => {
        const K = q();
        return /* @__PURE__ */ n(
          ct,
          {
            "data-state": x.getIsSelected() ? "selected" : "",
            className: d(st(x, M)),
            onClick: (P) => et(x, P),
            children: x.getVisibleCells().map((P) => {
              if (!(P.getIsPlaceholder() || P.column.columnDef.enableGrouping && !P.getIsGrouped() && (P.column.columnDef.id !== Rt || !r)))
                return /* @__PURE__ */ n(
                  at,
                  {
                    className: d(
                      P.column.columnDef.id,
                      "tw-p-[1px]",
                      kt(p, x, P)
                    ),
                    children: P.getIsGrouped() ? /* @__PURE__ */ w(
                      E,
                      {
                        variant: "link",
                        onClick: x.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          x.getIsExpanded() && /* @__PURE__ */ n(qt, {}),
                          !x.getIsExpanded() && (K === "ltr" ? /* @__PURE__ */ n(Ce, {}) : /* @__PURE__ */ n(Vr, {})),
                          " ",
                          Ht(P.column.columnDef.cell, P.getContext()),
                          " (",
                          x.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ht(P.column.columnDef.cell, P.getContext())
                  },
                  P.id
                );
            })
          },
          x.id
        );
      }) })
    ] })
  ] });
}
const ue = {
  [B("undefined")]: "Ø",
  [B(0)]: "A",
  [B(1)]: "B",
  [B(2)]: "C",
  [B(3)]: "D",
  [B(4)]: "E",
  [B(5)]: "F",
  [B(6)]: "G",
  [B(7)]: "H",
  [B(8)]: "I",
  [B(9)]: "J",
  [B(10)]: "K",
  [B(11)]: "L",
  [B(12)]: "M",
  [B(13)]: "N",
  [B(14)]: "O",
  [B(15)]: "P",
  [B(16)]: "Q",
  [B(17)]: "R",
  [B(18)]: "S",
  [B(19)]: "T",
  [B(20)]: "U",
  [B(21)]: "V",
  [B(22)]: "W",
  [B(23)]: "X",
  [B(24)]: "Y",
  [B(25)]: "Z"
};
function Ds({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: r,
  localizedStrings: a = {},
  className: o
}) {
  const i = {
    ...ue,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([s, p]) => [
          s,
          s === p && s in ue ? ue[s] : p
        ]
      )
    )
  }, l = q();
  return /* @__PURE__ */ w(
    _t,
    {
      value: `${e}`,
      onValueChange: (s) => r(
        s === "undefined" ? void 0 : parseInt(s, 10)
      ),
      children: [
        /* @__PURE__ */ n(yt, { className: d("pr-twp tw-w-auto", o), children: /* @__PURE__ */ n(
          zt,
          {
            placeholder: i[B(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ n(
          Nt,
          {
            align: l === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((s) => /* @__PURE__ */ n(Z, { value: `${s}`, children: i[B(s)] }, `${s}`))
          }
        )
      ]
    }
  );
}
function Is({ children: t }) {
  return /* @__PURE__ */ n("div", { className: "pr-twp tw-grid", children: t });
}
function Vs({
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
function Bs({
  primary: t,
  secondary: e,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ n("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ n("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ n($e, {}) : ""
  ] });
}
function Yn(t, e) {
  var r;
  return (r = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : r[0];
}
function ne({ icon: t, menuLabel: e, leading: r }) {
  return t ? /* @__PURE__ */ n(
    "img",
    {
      className: d("tw-max-h-5 tw-max-w-5", r ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${r ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Hn = (t, e, r, a) => r ? Object.entries(t).filter(
  ([i, l]) => "column" in l && l.column === r || i === r
).sort(([, i], [, l]) => i.order - l.order).flatMap(([i]) => e.filter((s) => s.group === i).sort((s, p) => s.order - p.order).map((s) => /* @__PURE__ */ w(Ye, { children: [
  /* @__PURE__ */ n(He, { asChild: !0, children: "command" in s ? /* @__PURE__ */ w(
    Dt,
    {
      onClick: () => {
        a(s);
      },
      children: [
        s.iconPathBefore && /* @__PURE__ */ n(ne, { icon: s.iconPathBefore, menuLabel: s.label, leading: !0 }),
        s.label,
        s.iconPathAfter && /* @__PURE__ */ n(ne, { icon: s.iconPathAfter, menuLabel: s.label })
      ]
    },
    `dropdown-menu-item-${s.label}-${s.command}`
  ) : /* @__PURE__ */ w(ta, { children: [
    /* @__PURE__ */ n(hn, { children: s.label }),
    /* @__PURE__ */ n(Qr, { children: /* @__PURE__ */ n(gn, { children: Hn(
      t,
      e,
      Yn(t, s.id),
      a
    ) }) })
  ] }, `dropdown-menu-sub-${s.label}-${s.id}`) }),
  s.tooltip && /* @__PURE__ */ n(we, { children: s.tooltip })
] }, `tooltip-${s.label}-${"command" in s ? s.command : s.id}`))) : void 0;
function As({
  commandHandler: t,
  menuData: e,
  tabLabel: r,
  icon: a,
  className: o,
  variant: i,
  id: l
}) {
  return /* @__PURE__ */ w(Kt, { variant: i, children: [
    /* @__PURE__ */ n(oe, { "aria-label": r, className: o, asChild: !0, id: l, children: /* @__PURE__ */ n(E, { variant: "ghost", className: "tw-h-6 tw-p-1", children: a ?? /* @__PURE__ */ n(Br, {}) }) }),
    /* @__PURE__ */ n(Pt, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, s]) => typeof s == "object").sort(([, s], [, p]) => typeof s == "boolean" || typeof p == "boolean" ? 0 : s.order - p.order).map(([s], p, u) => /* @__PURE__ */ w(lr, { children: [
      /* @__PURE__ */ n(mn, { children: /* @__PURE__ */ n(Le, { children: Hn(e.groups, e.items, s, t) }) }),
      p < u.length - 1 && /* @__PURE__ */ n(Wt, {})
    ] }, s)) })
  ] });
}
const jn = c.forwardRef(({ className: t, ...e }, r) => {
  const a = q();
  return /* @__PURE__ */ n(
    tt.Root,
    {
      orientation: "vertical",
      ref: r,
      className: d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
jn.displayName = tt.List.displayName;
const Un = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  tt.List,
  {
    ref: r,
    className: d(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Un.displayName = tt.List.displayName;
const Co = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  tt.Trigger,
  {
    ref: r,
    ...e,
    className: d(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), qn = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  tt.Content,
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
qn.displayName = tt.Content.displayName;
function Os({
  tabList: t,
  searchValue: e,
  onSearch: r,
  searchPlaceholder: a,
  headerTitle: o,
  searchClassName: i
}) {
  return /* @__PURE__ */ w("div", { className: "pr-twp", children: [
    /* @__PURE__ */ w("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ n("h1", { children: o }) : "",
      /* @__PURE__ */ n(
        je,
        {
          className: i,
          value: e,
          onSearch: r,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ w(jn, { children: [
      /* @__PURE__ */ n(Un, { children: t.map((l) => /* @__PURE__ */ n(Co, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ n(qn, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function So({ ...t }) {
  return /* @__PURE__ */ n(X.Menu, { ...t });
}
function Ro({ ...t }) {
  return /* @__PURE__ */ n(X.Sub, { "data-slot": "menubar-sub", ...t });
}
const Jn = c.forwardRef(({ className: t, variant: e = "default", ...r }, a) => {
  const o = c.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ n(ze.Provider, { value: o, children: /* @__PURE__ */ n(
    X.Root,
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
Jn.displayName = X.Root.displayName;
const Kn = c.forwardRef(({ className: t, ...e }, r) => {
  const a = wt();
  return /* @__PURE__ */ n(
    X.Trigger,
    {
      ref: r,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        gt({ variant: a.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
Kn.displayName = X.Trigger.displayName;
const Wn = c.forwardRef(({ className: t, inset: e, children: r, ...a }, o) => {
  const i = wt();
  return /* @__PURE__ */ w(
    X.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        gt({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(Ce, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Wn.displayName = X.SubTrigger.displayName;
const Zn = c.forwardRef(({ className: t, ...e }, r) => {
  const a = wt();
  return /* @__PURE__ */ n(
    X.SubContent,
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
Zn.displayName = X.SubContent.displayName;
const Qn = c.forwardRef(({ className: t, align: e = "start", alignOffset: r = -4, sideOffset: a = 8, ...o }, i) => {
  const l = wt();
  return /* @__PURE__ */ n(X.Portal, { children: /* @__PURE__ */ n(
    X.Content,
    {
      ref: i,
      align: e,
      alignOffset: r,
      sideOffset: a,
      className: d(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": l.variant === "muted"
        },
        t
      ),
      ...o
    }
  ) });
});
Qn.displayName = X.Content.displayName;
const tr = c.forwardRef(({ className: t, inset: e, ...r }, a) => {
  const o = wt();
  return /* @__PURE__ */ n(
    X.Item,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        gt({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...r
    }
  );
});
tr.displayName = X.Item.displayName;
const To = c.forwardRef(({ className: t, children: e, checked: r, ...a }, o) => {
  const i = wt();
  return /* @__PURE__ */ w(
    X.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        gt({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: r,
      ...a,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ n(X.ItemIndicator, { children: /* @__PURE__ */ n(Vt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
To.displayName = X.CheckboxItem.displayName;
const _o = c.forwardRef(({ className: t, children: e, ...r }, a) => {
  const o = wt();
  return /* @__PURE__ */ w(
    X.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        gt({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...r,
      children: [
        /* @__PURE__ */ n("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ n(X.ItemIndicator, { children: /* @__PURE__ */ n(Se, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
_o.displayName = X.RadioItem.displayName;
const zo = c.forwardRef(({ className: t, inset: e, ...r }, a) => /* @__PURE__ */ n(
  X.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...r
  }
));
zo.displayName = X.Label.displayName;
const er = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  X.Separator,
  {
    ref: r,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
er.displayName = X.Separator.displayName;
const $t = (t, e) => {
  setTimeout(() => {
    e.forEach((r) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", r));
    });
  }, 0);
}, nr = (t, e, r, a) => {
  if (!r) return;
  const o = Object.entries(t).filter(
    ([i, l]) => "column" in l && l.column === r || i === r
  ).sort(([, i], [, l]) => i.order - l.order);
  return o.flatMap(([i], l) => {
    const s = e.filter((u) => u.group === i).sort((u, m) => u.order - m.order).map((u) => /* @__PURE__ */ w(Ye, { children: [
      /* @__PURE__ */ n(He, { asChild: !0, children: "command" in u ? /* @__PURE__ */ w(
        tr,
        {
          onClick: () => {
            a(u);
          },
          children: [
            u.iconPathBefore && /* @__PURE__ */ n(ne, { icon: u.iconPathBefore, menuLabel: u.label, leading: !0 }),
            u.label,
            u.iconPathAfter && /* @__PURE__ */ n(ne, { icon: u.iconPathAfter, menuLabel: u.label })
          ]
        },
        `menubar-item-${u.label}-${u.command}`
      ) : /* @__PURE__ */ w(Ro, { children: [
        /* @__PURE__ */ n(Wn, { children: u.label }),
        /* @__PURE__ */ n(Zn, { children: nr(
          t,
          e,
          Yn(t, u.id),
          a
        ) })
      ] }, `menubar-sub-${u.label}-${u.id}`) }),
      u.tooltip && /* @__PURE__ */ n(we, { children: u.tooltip })
    ] }, `tooltip-${u.label}-${"command" in u ? u.command : u.id}`)), p = [...s];
    return s.length > 0 && l < o.length - 1 && p.push(/* @__PURE__ */ n(er, {}, `separator-${i}`)), p;
  });
};
function Eo({
  menuData: t,
  commandHandler: e,
  onOpenChange: r,
  variant: a
}) {
  const o = ot(void 0), i = ot(void 0), l = ot(void 0), s = ot(void 0), p = ot(void 0), u = (m) => {
    switch (m) {
      case "platform.app":
        return i;
      case "platform.window":
        return l;
      case "platform.layout":
        return s;
      case "platform.help":
        return p;
      default:
        return;
    }
  };
  if (qr(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (m, f) => {
    var v, R, y, C;
    m.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, g = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        $t(i, [h]);
        break;
      case "alt+p":
        (v = i.current) == null || v.focus(), $t(i, [h, g]);
        break;
      case "alt+l":
        (R = l.current) == null || R.focus(), $t(l, [h, g]);
        break;
      case "alt+n":
        (y = s.current) == null || y.focus(), $t(s, [h, g]);
        break;
      case "alt+h":
        (C = p.current) == null || C.focus(), $t(p, [h, g]);
        break;
    }
  }), xt(() => {
    if (!r || !o.current) return;
    const m = new MutationObserver((g) => {
      g.forEach((v) => {
        if (v.attributeName === "data-state" && v.target instanceof HTMLElement) {
          const R = v.target.getAttribute("data-state");
          r(R === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((g) => {
      m.observe(g, { attributes: !0 });
    }), () => m.disconnect();
  }, [r]), !!t)
    return /* @__PURE__ */ n(Jn, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, m]) => typeof m == "object").sort(([, m], [, f]) => typeof m == "boolean" || typeof f == "boolean" ? 0 : m.order - f.order).map(([m, f]) => /* @__PURE__ */ w(So, { children: [
      /* @__PURE__ */ n(Kn, { ref: u(m), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ n(
        Qn,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ n(Le, { children: nr(t.groups, t.items, m, e) })
        }
      )
    ] }, m)) });
}
function Ps(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Fs({
  menuData: t,
  onOpenChange: e,
  commandHandler: r,
  className: a,
  id: o,
  children: i,
  appMenuAreaChildren: l,
  configAreaChildren: s,
  shouldUseAsAppDragArea: p,
  menubarVariant: u = "default"
}) {
  const m = ot(void 0);
  return /* @__PURE__ */ n(
    "div",
    {
      className: d("tw-border tw-px-4 tw-text-foreground", a),
      ref: m,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ w(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: p ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ n("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  l,
                  t && /* @__PURE__ */ n(
                    Eo,
                    {
                      menuData: t,
                      onOpenChange: e,
                      commandHandler: r,
                      variant: u
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ n(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ n("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ n(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ) })
          ]
        }
      )
    }
  );
}
const Mo = (t, e) => t[e] ?? e;
function Xs({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: r = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: i,
  localizedStrings: l,
  className: s
}) {
  const p = Mo(
    l,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [u, m] = A(!1), f = (g) => {
    o && o(g), a && a([g, ...r.filter((v) => v !== g)]), i && r.find((v) => v === g) && i([...r.filter((v) => v !== g)]), m(!1);
  }, h = (g, v) => {
    var y, C, k, V, G, et;
    const R = v !== g ? ((C = (y = t[g]) == null ? void 0 : y.uiNames) == null ? void 0 : C[v]) ?? ((V = (k = t[g]) == null ? void 0 : k.uiNames) == null ? void 0 : V.en) : void 0;
    return R ? `${(G = t[g]) == null ? void 0 : G.autonym} (${R})` : (et = t[g]) == null ? void 0 : et.autonym;
  };
  return /* @__PURE__ */ w("div", { className: d("pr-twp tw-max-w-sm", s), children: [
    /* @__PURE__ */ w(
      _t,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: u,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ n(yt, { children: /* @__PURE__ */ n(zt, {}) }),
          /* @__PURE__ */ n(
            Nt,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ n(Z, { value: g, children: h(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ w(It, { children: [
      /* @__PURE__ */ n(U, { className: "tw-ms-3", children: p }),
      /* @__PURE__ */ n("div", { className: "tw-ms-3", children: /* @__PURE__ */ w(U, { children: [
        "Currently:",
        " ",
        (r == null ? void 0 : r.length) > 0 ? `${r.map((g) => h(g, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function Do({ item: t, createLabel: e, createComplexLabel: r }) {
  return e ? /* @__PURE__ */ n(U, { children: e(t) }) : r ? /* @__PURE__ */ n(U, { children: r(t) }) : /* @__PURE__ */ n(U, { children: t });
}
function Gs({
  id: t,
  className: e,
  listItems: r,
  selectedListItems: a,
  handleSelectListItem: o,
  createLabel: i,
  createComplexLabel: l
}) {
  return /* @__PURE__ */ n("div", { id: t, className: e, children: r.map((s) => /* @__PURE__ */ w("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ n(
      Ge,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(s),
        onCheckedChange: (p) => o(s, p)
      }
    ),
    /* @__PURE__ */ n(
      Do,
      {
        item: s,
        createLabel: i,
        createComplexLabel: l
      }
    )
  ] }, s)) });
}
function $s({
  id: t,
  isDisabled: e = !1,
  hasError: r = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: i,
  placeholder: l,
  isRequired: s = !1,
  className: p,
  defaultValue: u,
  value: m,
  onChange: f,
  onFocus: h,
  onBlur: g
}) {
  return /* @__PURE__ */ w("div", { className: d("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ n(
      U,
      {
        htmlFor: t,
        className: d({
          "tw-text-red-600": r,
          "tw-hidden": !i
        }),
        children: `${i}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ n(
      Ot,
      {
        id: t,
        disabled: e,
        placeholder: l,
        required: s,
        className: d(p, { "tw-border-red-600": r }),
        defaultValue: u,
        value: m,
        onChange: f,
        onFocus: h,
        onBlur: g
      }
    ),
    /* @__PURE__ */ n("p", { className: d({ "tw-hidden": !o }), children: o })
  ] });
}
const Io = Mt(
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
), Vo = c.forwardRef(({ className: t, variant: e, ...r }, a) => /* @__PURE__ */ n("div", { ref: a, role: "alert", className: d(Io({ variant: e }), t), ...r }));
Vo.displayName = "Alert";
const Bo = c.forwardRef(
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
Bo.displayName = "AlertTitle";
const Ao = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n("div", { ref: r, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Ao.displayName = "AlertDescription";
const Oo = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  At.Root,
  {
    ref: r,
    className: d(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Oo.displayName = At.Root.displayName;
const Po = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  At.Image,
  {
    ref: r,
    className: d("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
Po.displayName = At.Image.displayName;
const Fo = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  At.Fallback,
  {
    ref: r,
    className: d(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Fo.displayName = At.Fallback.displayName;
const rr = c.forwardRef(
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
rr.displayName = "Card";
const ar = c.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      className: d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
ar.displayName = "CardHeader";
const or = c.forwardRef(
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
or.displayName = "CardTitle";
const Xo = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n("p", { ref: r, className: d("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Xo.displayName = "CardDescription";
const ke = c.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n("div", { ref: r, className: d("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
ke.displayName = "CardContent";
const sr = c.forwardRef(
  ({ className: t, ...e }, r) => /* @__PURE__ */ n(
    "div",
    {
      ref: r,
      className: d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
sr.displayName = "CardFooter";
function Ls({ ...t }) {
  return /* @__PURE__ */ n(
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
const Go = c.forwardRef(({ className: t, ...e }, r) => {
  const a = q();
  return /* @__PURE__ */ w(
    Lt.Root,
    {
      ref: r,
      className: d(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
        /* @__PURE__ */ n(Lt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ n(Lt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ n(Lt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Go.displayName = Lt.Root.displayName;
const $o = c.forwardRef(({ className: t, ...e }, r) => {
  const a = q();
  return /* @__PURE__ */ n(
    fe.Root,
    {
      className: d(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: r,
      children: /* @__PURE__ */ n(
        fe.Thumb,
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
$o.displayName = fe.Root.displayName;
const Ys = tt.Root, Lo = c.forwardRef(({ className: t, ...e }, r) => {
  const a = q();
  return /* @__PURE__ */ n(
    tt.List,
    {
      ref: r,
      className: d(
        "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: a
    }
  );
});
Lo.displayName = tt.List.displayName;
const Yo = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  tt.Trigger,
  {
    ref: r,
    className: d(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Yo.displayName = tt.Trigger.displayName;
const Ho = c.forwardRef(({ className: t, ...e }, r) => /* @__PURE__ */ n(
  tt.Content,
  {
    ref: r,
    className: d(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ho.displayName = tt.Content.displayName;
function jo({
  defaultValue: t,
  onChange: e,
  variant: r,
  types: a
}) {
  return /* @__PURE__ */ w(_t, { defaultValue: t ?? "all", onValueChange: e, children: [
    /* @__PURE__ */ n(
      yt,
      {
        className: d("tw-w-16 [&>svg]:tw-min-w-4", {
          "tw-border-none tw-bg-transparent hover:tw-bg-secondary hover:tw-text-secondary-foreground": r === "ghost"
        }),
        children: /* @__PURE__ */ n(zt, {})
      }
    ),
    /* @__PURE__ */ w(Nt, { position: "popper", children: [
      /* @__PURE__ */ n(Z, { value: "all", children: "All" }),
      a.map((o) => {
        const i = o.icon;
        return /* @__PURE__ */ n(Z, { value: o.key, children: /* @__PURE__ */ w("div", { className: "tw-align-center tw-flex tw-justify-start tw-gap-2", children: [
          /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(i, { className: "tw-h-4 tw-pr-0" }) }),
          /* @__PURE__ */ n("div", { children: o.localizedName })
        ] }) }, o.key);
      })
    ] })
  ] });
}
function Hs({
  localizedStrings: t = {},
  uiLocales: e = [],
  onOpenGetResources: r = () => {
  },
  onOpenResourceOrProject: a = () => {
  },
  onSendReceiveProject: o = () => {
  },
  showGetResourcesButton: i = !0,
  isSendReceiveInProgress: l = !1,
  isLoadingLocalProjects: s = !1,
  isLoadingRemoteProjects: p = !1,
  localProjectResourceInfo: u = [],
  sharedProjectsInfo: m = {},
  activeSendReceiveProjects: f = []
}) {
  const h = (b) => t[b] ?? b, g = h("%resources_action%"), v = h("%resources_activity%"), R = h("%resources_clearSearch%"), y = h("%home_dialog_title%"), C = h("%resources_filterInput%"), k = h("%resources_fullName%"), V = h("%resources_get%"), G = h("%resources_getResources%"), et = h("%resources_items%"), st = h("%resources_language%"), kt = h("%resources_loading%"), x = h("%resources_noProjects%"), M = h("%resources_noProjectsInstruction%"), K = h("%resources_noSearchResults%"), P = h("%resources_open%"), Ct = h("%resources_searchedFor%"), ut = h("%resources_sync%"), N = J(() => {
    const b = [];
    return m && Object.entries(m).forEach(([z, j]) => {
      b.push({
        id: z,
        name: j.name,
        fullName: j.fullName,
        language: j.language,
        isEditable: !0,
        isSendReceivable: !0,
        isLocallyAvailable: u == null ? void 0 : u.some((Ke) => Ke.id === z),
        editedStatus: j.editedStatus,
        lastSendReceiveDate: j.lastSendReceiveDate,
        type: "project"
      });
    }), u == null || u.forEach((z) => {
      b.some((j) => j.id === z.id) || b.push({
        id: z.id,
        name: z.name,
        fullName: z.fullName,
        language: z.language,
        isEditable: z.isEditable,
        isSendReceivable: !1,
        type: z.type
      });
    }), b;
  }, [u, m]), [T, O] = A(""), [D, L] = A({
    key: "language",
    direction: "ascending"
  }), [mt, S] = A("all"), H = J(() => {
    if (!N) return [];
    const b = N.filter((z) => {
      const j = T.toLowerCase();
      return (mt === "all" || mt === z.type) && (z.fullName.toLowerCase().includes(j) || z.name.toLowerCase().includes(j) || z.language.toLowerCase().includes(j));
    });
    return b.length === 0 && T === "" && setTimeout(() => {
      S("all");
    }, 2e3), b.sort((z, j) => {
      switch (D.key) {
        case "fullName":
          return z.fullName < j.fullName ? D.direction === "ascending" ? -1 : 1 : z.fullName > j.fullName ? D.direction === "ascending" ? 1 : -1 : 0;
        case "language":
          return z.language < j.language ? D.direction === "ascending" ? -1 : 1 : z.language > j.language ? D.direction === "ascending" ? 1 : -1 : 0;
        case "activity":
          return !z.lastSendReceiveDate || !j.lastSendReceiveDate ? 0 : z.lastSendReceiveDate < j.lastSendReceiveDate ? D.direction === "ascending" ? -1 : 1 : z.lastSendReceiveDate > j.lastSendReceiveDate ? D.direction === "ascending" ? 1 : -1 : 0;
        case "action":
          return 0;
        default:
          return 0;
      }
    });
  }, [N, T, D, mt]), lt = (b) => {
    const z = { key: b, direction: "ascending" };
    D.key === b && D.direction === "ascending" && (z.direction = "descending"), L(z);
  }, rt = (b, z) => /* @__PURE__ */ n(vt, { onClick: () => lt(b), children: /* @__PURE__ */ w(E, { variant: "ghost", className: "tw-bg-transparent hover:tw-bg-transparent", children: [
    /* @__PURE__ */ n("div", { className: "tw-font-normal", children: z }),
    D.key !== b && /* @__PURE__ */ n(Te, { className: "tw-pl-1", size: 16 }),
    D.key === b && (D.direction === "ascending" ? /* @__PURE__ */ n(sn, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ n(qt, { className: "tw-pl-1", size: 16 }))
  ] }) }), ft = J(() => new Intl.RelativeTimeFormat(e, { style: "long", numeric: "auto" }), [e]), Ue = (b) => l && f.includes(b.id) ? /* @__PURE__ */ n(Et, { className: "tw-h-5 tw-py-[1px]" }) : b.isLocallyAvailable ? ut : V, qe = (b, z) => z ? /* @__PURE__ */ n(Dt, { onClick: () => o(b.id), children: /* @__PURE__ */ n("span", { children: Ue(b) }) }) : /* @__PURE__ */ n(
    E,
    {
      disabled: l && f.includes(b.id),
      onClick: () => o(b.id),
      children: Ue(b)
    }
  ), Je = (b, z) => z ? /* @__PURE__ */ n(Dt, { onClick: () => a(b.id, b.isEditable), children: /* @__PURE__ */ n("span", { children: P }) }) : /* @__PURE__ */ n(E, { onClick: () => a(b.id, b.isEditable), children: P });
  return /* @__PURE__ */ n("div", { children: /* @__PURE__ */ w(rr, { className: "tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0", children: [
    /* @__PURE__ */ n(ar, { className: "tw-flex-shrink-0", children: /* @__PURE__ */ w("div", { className: "tw-flex tw-justify-between tw-gap-4", children: [
      /* @__PURE__ */ w("div", { className: "tw-flex tw-flex-col tw-gap-4 md:tw-flex-row", children: [
        /* @__PURE__ */ w("div", { className: "tw-flex tw-items-center tw-gap-4", children: [
          /* @__PURE__ */ n(Ar, { size: 36 }),
          /* @__PURE__ */ n(or, { children: y })
        ] }),
        /* @__PURE__ */ n(
          je,
          {
            value: T,
            className: "tw-min-w-72",
            onSearch: O,
            placeholder: C
          }
        )
      ] }),
      /* @__PURE__ */ n("div", { className: "tw-flex tw-flex-wrap-reverse tw-gap-4 tw-self-end", children: i && /* @__PURE__ */ n(E, { onClick: r, className: "tw-bg-muted", variant: "ghost", children: `+ ${G}` }) })
    ] }) }),
    s || p ? /* @__PURE__ */ w(ke, { className: "tw-flex tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-2", children: [
      /* @__PURE__ */ n(U, { children: kt }),
      /* @__PURE__ */ n(Et, {})
    ] }) : /* @__PURE__ */ n(ke, { className: "tw-flex-grow tw-overflow-auto", children: u ? /* @__PURE__ */ n("div", { className: "tw-h-full tw-flex-grow", children: H.length === 0 ? /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center", children: [
      /* @__PURE__ */ n(U, { className: "tw-text-muted-foreground", children: K }),
      /* @__PURE__ */ n(U, { className: "tw-font-normal tw-text-muted-foreground", children: `${Ct} "${T}".` }),
      /* @__PURE__ */ w("div", { className: "tw-mt-4 tw-flex tw-gap-1", children: [
        /* @__PURE__ */ n(
          E,
          {
            variant: "ghost",
            onClick: () => {
              O(""), S("all");
            },
            children: R
          }
        ),
        i && /* @__PURE__ */ n(
          E,
          {
            onClick: r,
            variant: "ghost",
            className: "tw-bg-muted",
            children: `+ ${G}`
          }
        )
      ] })
    ] }) : /* @__PURE__ */ w(Zt, { stickyHeader: !0, children: [
      /* @__PURE__ */ n(Qt, { className: "tw-bg-none", stickyHeader: !0, children: /* @__PURE__ */ w(ct, { children: [
        /* @__PURE__ */ n(vt, { children: /* @__PURE__ */ n(
          jo,
          {
            onChange: S,
            variant: "ghost",
            types: Object.values(Ze)
          }
        ) }),
        rt("fullName", k),
        rt("language", st),
        H.some(
          (b) => b.isSendReceivable
        ) && rt("activity", v),
        rt("action", g),
        /* @__PURE__ */ n(vt, {})
      ] }) }),
      /* @__PURE__ */ n(te, { children: H.map((b) => {
        const z = Ze[b.type].icon;
        return /* @__PURE__ */ w(
          ct,
          {
            className: "[&>td]:tw-p-2",
            onDoubleClick: () => a(
              b.id,
              b.isEditable
            ),
            children: [
              /* @__PURE__ */ w(at, { className: "tw-ms-4 tw-flex tw-items-center tw-gap-4", children: [
                /* @__PURE__ */ n(z, { className: "tw-h-4 tw-pr-0" }),
                /* @__PURE__ */ n("div", { className: "tw-py-4", children: b.name })
              ] }),
              /* @__PURE__ */ n(at, { className: "tw-font-medium", children: b.fullName }),
              /* @__PURE__ */ n(at, { children: b.language }),
              H.some(
                (j) => j.isSendReceivable
              ) && /* @__PURE__ */ n(at, { children: b.lastSendReceiveDate && $r(
                ft,
                new Date(b.lastSendReceiveDate)
              ) }),
              /* @__PURE__ */ n(at, { children: b.isSendReceivable && (!b.isLocallyAvailable || b.editedStatus === "edited") ? qe(b) : Je(b) }),
              /* @__PURE__ */ n(at, { children: b.isSendReceivable && b.isLocallyAvailable && /* @__PURE__ */ w(Kt, { children: [
                /* @__PURE__ */ n(oe, { asChild: !0, children: /* @__PURE__ */ n(E, { variant: "ghost", children: /* @__PURE__ */ n(Or, { className: "tw-w-4" }) }) }),
                /* @__PURE__ */ n(Pt, { align: "start", children: /* @__PURE__ */ n(Dt, { asChild: !0, children: b.editedStatus === "edited" ? Je(b, !0) : qe(b, !0) }) })
              ] }) })
            ]
          },
          b.id
        );
      }) })
    ] }) }) : /* @__PURE__ */ w("div", { className: "tw-flex tw-h-full tw-flex-grow tw-flex-col tw-items-center tw-justify-center tw-gap-1 tw-rounded-lg tw-border tw-border-gray-200 tw-p-6 tw-text-center", children: [
      /* @__PURE__ */ n(U, { className: "tw-text-muted-foreground", children: x }),
      /* @__PURE__ */ n(U, { className: "tw-font-normal tw-text-muted-foreground", children: M }),
      i && /* @__PURE__ */ n(
        E,
        {
          onClick: r,
          className: "tw-mt-4",
          children: `+ ${G}`
        }
      )
    ] }) }),
    /* @__PURE__ */ n(sr, { className: "tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4", children: H.length > 0 && /* @__PURE__ */ n(U, { className: "tw-font-normal", children: `${H.length} ${et}` }) })
  ] }) });
}
const js = (t, e) => {
  xt(() => {
    if (!t) return () => {
    };
    const r = t(e);
    return () => {
      r();
    };
  }, [t, e]);
};
function Uo(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const qo = (t, e, r = {}) => {
  const a = ot(e);
  a.current = e;
  const o = ot(r);
  o.current = Uo(o.current);
  const [i, l] = A(() => a.current), [s, p] = A(!0);
  return xt(() => {
    let u = !0;
    return p(!!t), (async () => {
      if (t) {
        const m = await t();
        u && (l(() => m), p(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || l(() => a.current);
    };
  }, [t]), [i, s];
}, me = () => !1, Us = (t, e) => {
  const [r] = qo(
    it(async () => {
      if (!t) return me;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    me,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  xt(() => () => {
    r !== me && r();
  }, [r]);
};
function Jo(t, e = "top") {
  if (!t || typeof document > "u") return;
  const r = document.head || document.querySelector("head"), a = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? r.insertBefore(o, a) : r.appendChild(o);
}
Jo(`*, ::before, ::after {
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
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
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
  .pr-twp {
  border-color: hsl(var(--border));
}

  body .pr-twp {
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

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
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
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`, "after-all");
export {
  Vo as Alert,
  Ao as AlertDescription,
  Bo as AlertTitle,
  Oo as Avatar,
  Fo as AvatarFallback,
  Po as AvatarImage,
  us as BOOK_SELECTOR_STRING_KEYS,
  Mn as Badge,
  ps as BookChapterControl,
  Ma as BookSelectionMode,
  ms as BookSelector,
  E as Button,
  rr as Card,
  ke as CardContent,
  Xo as CardDescription,
  sr as CardFooter,
  ar as CardHeader,
  or as CardTitle,
  Ea as ChapterRangeSelector,
  Ge as Checkbox,
  Gs as Checklist,
  ve as ComboBox,
  Fa as DataTable,
  fs as DisableButton,
  Kt as DropdownMenu,
  Ee as DropdownMenuCheckboxItem,
  Pt as DropdownMenuContent,
  mn as DropdownMenuGroup,
  Dt as DropdownMenuItem,
  Ga as DropdownMenuItemType,
  se as DropdownMenuLabel,
  Qr as DropdownMenuPortal,
  ds as DropdownMenuRadioGroup,
  fn as DropdownMenuRadioItem,
  Wt as DropdownMenuSeparator,
  ea as DropdownMenuShortcut,
  ta as DropdownMenuSub,
  gn as DropdownMenuSubContent,
  hn as DropdownMenuSubTrigger,
  oe as DropdownMenuTrigger,
  gs as EnableButton,
  Cs as Filter,
  Xa as FilterButton,
  xs as FilterDropdown,
  ks as Footer,
  Hs as HomeDialog,
  _s as INVENTORY_STRING_KEYS,
  Ot as Input,
  hs as InstallButton,
  zs as Inventory,
  U as Label,
  vs as MarkdownRenderer,
  Ns as MoreInfo,
  Ya as MultiSelectComboBox,
  Os as NavigationContentSearch,
  ys as NoExtensionsFound,
  Sn as Popover,
  Be as PopoverContent,
  Rn as PopoverTrigger,
  Cn as RadioGroup,
  be as RadioGroupItem,
  Ms as ScriptureResultsViewer,
  Ds as ScrollGroupSelector,
  je as SearchBar,
  _t as Select,
  Nt as SelectContent,
  Ia as SelectGroup,
  Z as SelectItem,
  Va as SelectLabel,
  En as SelectScrollDownButton,
  zn as SelectScrollUpButton,
  Ba as SelectSeparator,
  yt as SelectTrigger,
  zt as SelectValue,
  $e as Separator,
  Is as SettingsList,
  Bs as SettingsListHeader,
  Vs as SettingsListItem,
  go as SettingsSidebar,
  Es as SettingsSidebarContentSearch,
  Go as Slider,
  Ls as Sonner,
  Et as Spinner,
  $o as Switch,
  As as TabDropdownMenu,
  Zt as Table,
  te as TableBody,
  Pa as TableCaption,
  at as TableCell,
  Oa as TableFooter,
  vt as TableHead,
  Qt as TableHeader,
  ct as TableRow,
  Ys as Tabs,
  Ho as TabsContent,
  Lo as TabsList,
  Yo as TabsTrigger,
  $s as TextField,
  Vn as ToggleGroup,
  ee as ToggleGroupItem,
  Fs as Toolbar,
  Ye as Tooltip,
  we as TooltipContent,
  Le as TooltipProvider,
  He as TooltipTrigger,
  Xs as UiLanguageSelector,
  bs as UpdateButton,
  $a as VersionHistory,
  jn as VerticalTabs,
  qn as VerticalTabsContent,
  Un as VerticalTabsList,
  Co as VerticalTabsTrigger,
  La as badgeVariants,
  Na as buttonVariants,
  d as cn,
  Ja as getBookIdFromUSFM,
  qa as getLinesFromUSFM,
  nn as getNumberFromUSFM,
  Ka as getStatusForItem,
  Ps as getToolbarOSReservedSpaceClassName,
  Rs as inventoryCountColumn,
  Ss as inventoryItemColumn,
  Ts as inventoryStatusColumn,
  Ks as sonner,
  js as useEvent,
  Us as useEventAsync,
  qo as usePromise
};
//# sourceMappingURL=index.js.map
