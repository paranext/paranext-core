import ml, { jsx as i, jsxs as b, Fragment as te } from "react/jsx-runtime";
import * as D from "react";
import E, { forwardRef as pr, useCallback as Tt, useState as ut, useRef as Ne, useEffect as pe, useLayoutEffect as Na, useMemo as Ot } from "react";
import { History as hl, ChevronRight as ko, Check as Qe, Circle as Eo, ArrowDownWideNarrow as gl, Clock as bl, Bookmark as vl, X as So, Search as yi, ChevronsUpDown as xi, FilterIcon as yl, ChevronDown as ur, ChevronUp as xl, ArrowLeftIcon as Nl, ChevronLeftIcon as kl, ChevronRightIcon as El, ArrowRightIcon as Sl, CircleCheckIcon as Tl, CircleXIcon as Cl, CircleHelpIcon as Rl, ArrowUpIcon as Ol, ArrowDownIcon as _l, ArrowUpDownIcon as Pl, Star as $l, PanelLeft as Il, PanelRight as Ml, ChevronLeft as Al, LoaderCircle as Dl, Download as jl, Filter as Bl, User as Vl, Link as zl, CircleHelp as Fl } from "lucide-react";
import ke, { clsx as Ll } from "clsx";
import { extendTailwindMerge as Gl } from "tailwind-merge";
import * as mt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ul } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Xl, deepEqual as To, substring as Hl, formatScrRef as Vr, compareScrRefs as eo, scrRefToBBBCCCVVV as zr, getLocalizeKeyForScrollGroupId as pt, NumberFormat as Yl, formatBytes as Wl } from "platform-bible-utils";
import { Slot as tn } from "@radix-ui/react-slot";
import { cva as en } from "class-variance-authority";
import * as Ni from "@radix-ui/react-label";
import * as Tn from "@radix-ui/react-radio-group";
import * as Cn from "@radix-ui/react-popover";
import { Command as $t } from "cmdk";
import * as Jt from "@radix-ui/react-dialog";
import { useReactTable as ki, getCoreRowModel as Ei, getPaginationRowModel as ql, getSortedRowModel as Si, getFilteredRowModel as Kl, flexRender as xn, getExpandedRowModel as Jl, getGroupedRowModel as Zl } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import * as no from "@radix-ui/react-checkbox";
import * as wr from "@radix-ui/react-toggle-group";
import * as Ti from "@radix-ui/react-toggle";
import * as It from "@radix-ui/react-tabs";
import * as Ci from "@radix-ui/react-separator";
import * as In from "@radix-ui/react-tooltip";
import Ql, { ThemeContext as tc, internal_processStyles as ec } from "@mui/styled-engine";
import { MenuItem as nc, ListItemText as rc, ListItemIcon as Ri, Menu as oc, Grid as Oi, List as ac, IconButton as _i, Drawer as ic } from "@mui/material";
import * as sc from "react-dom";
import Yn from "react-dom";
import * as wt from "@radix-ui/react-menubar";
import { Toaster as lc } from "sonner";
import { toast as pg } from "sonner";
import * as mn from "@radix-ui/react-slider";
import * as ro from "@radix-ui/react-switch";
import cc from "markdown-to-jsx";
const dc = Gl({ prefix: "tw-" });
function x(...t) {
  return dc(Ll(t));
}
const nn = E.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      type: e,
      className: x(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: r,
      ...n
    }
  )
);
nn.displayName = "Input";
const pc = "layoutDirection";
function kt() {
  const t = localStorage.getItem(pc);
  return t === "rtl" ? t : "ltr";
}
const uc = pr(
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: n,
    handleSubmit: r,
    className: o,
    ...a
  }, s) => {
    const l = kt();
    return /* @__PURE__ */ b("div", { className: "tw-relative", children: [
      /* @__PURE__ */ i(
        nn,
        {
          ...a,
          type: "text",
          className: x(
            "tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",
            o
          ),
          onChange: (c) => t(c.target.value),
          onKeyDown: (c) => {
            c.key === "Enter" && r(), e(c);
          },
          onClick: n,
          ref: s
        }
      ),
      /* @__PURE__ */ i(
        hl,
        {
          className: x(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
            { "tw-right-3": l === "ltr" },
            { "tw-left-3 tw-right-auto": l === "rtl" }
          ),
          onClick: () => {
            console.log("back in history");
          }
        }
      )
    ] });
  }
), Co = mt.Root, Pi = mt.Trigger, wc = mt.Group, Sh = mt.Portal, Th = mt.Sub, Ch = mt.RadioGroup, fc = E.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ b(
  mt.SubTrigger,
  {
    ref: o,
    className: x(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      e && "tw-pl-8",
      t
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ i(ko, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
fc.displayName = mt.SubTrigger.displayName;
const mc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  mt.SubContent,
  {
    ref: n,
    className: x(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
mc.displayName = mt.SubContent.displayName;
const fr = E.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...r }, o) => {
  const a = kt();
  return /* @__PURE__ */ i(mt.Portal, { children: /* @__PURE__ */ i(
    mt.Content,
    {
      ref: o,
      sideOffset: e,
      className: x(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      children: /* @__PURE__ */ i("div", { dir: a, children: n })
    }
  ) });
});
fr.displayName = mt.Content.displayName;
const $i = E.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = kt();
  return /* @__PURE__ */ i(
    mt.Item,
    {
      ref: r,
      className: x(
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
$i.displayName = mt.Item.displayName;
const Ro = E.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ b(
  mt.CheckboxItem,
  {
    ref: o,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ i(mt.ItemIndicator, { children: /* @__PURE__ */ i(Qe, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
Ro.displayName = mt.CheckboxItem.displayName;
const Ii = E.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ b(
  mt.RadioItem,
  {
    ref: r,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ i(mt.ItemIndicator, { children: /* @__PURE__ */ i(Eo, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Ii.displayName = mt.RadioItem.displayName;
const Mn = E.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  mt.Label,
  {
    ref: r,
    className: x("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Mn.displayName = mt.Label.displayName;
const mr = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  mt.Separator,
  {
    ref: n,
    className: x("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
mr.displayName = mt.Separator.displayName;
function hc({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: x("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
hc.displayName = "DropdownMenuShortcut";
var gc = Object.defineProperty, bc = (t, e, n) => e in t ? gc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, et = (t, e, n) => bc(t, typeof e != "symbol" ? e + "" : e, n);
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
], Oo = [
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
], Mi = [
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
], ka = Rc();
function rn(t, e = !0) {
  return e && (t = t.toUpperCase()), t in ka ? ka[t] : 0;
}
function _o(t) {
  return rn(t) > 0;
}
function vc(t) {
  const e = typeof t == "string" ? rn(t) : t;
  return e >= 40 && e <= 66;
}
function yc(t) {
  return (typeof t == "string" ? rn(t) : t) <= 39;
}
function Ai(t) {
  return t <= 66;
}
function xc(t) {
  const e = typeof t == "string" ? rn(t) : t;
  return Bi(e) && !Ai(e);
}
function* Nc() {
  for (let t = 1; t <= Se.length; t++)
    yield t;
}
const kc = 1, Di = Se.length;
function Ec() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Po(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Se.length ? e : Se[n];
}
function ji(t) {
  return t <= 0 || t > Di ? "******" : Mi[t - 1];
}
function Sc(t) {
  return ji(rn(t));
}
function Bi(t) {
  const e = typeof t == "number" ? Po(t) : t;
  return _o(e) && !Oo.includes(e);
}
function Tc(t) {
  const e = typeof t == "number" ? Po(t) : t;
  return _o(e) && Oo.includes(e);
}
function Cc(t) {
  return Mi[t - 1].includes("*obsolete*");
}
function Rc() {
  const t = {};
  for (let e = 0; e < Se.length; e++)
    t[Se[e]] = e + 1;
  return t;
}
const at = {
  allBookIds: Se,
  nonCanonicalIds: Oo,
  bookIdToNumber: rn,
  isBookIdValid: _o,
  isBookNT: vc,
  isBookOT: yc,
  isBookOTNT: Ai,
  isBookDC: xc,
  allBookNumbers: Nc,
  firstBook: kc,
  lastBook: Di,
  extraBooks: Ec,
  bookNumberToId: Po,
  bookNumberToEnglishName: ji,
  bookIdToEnglishName: Sc,
  isCanonical: Bi,
  isExtraMaterial: Tc,
  isObsolete: Cc
};
var qt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(qt || {});
const At = class {
  // private versInfo: Versification;
  constructor(e) {
    if (et(this, "name"), et(this, "fullPath"), et(this, "isPresent"), et(this, "hasVerseSegments"), et(this, "isCustomized"), et(this, "baseVersification"), et(this, "scriptureBooks"), et(this, "_type"), e == null)
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
et(At, "Original", new At(qt.Original)), et(At, "Septuagint", new At(qt.Septuagint)), et(At, "Vulgate", new At(qt.Vulgate)), et(At, "English", new At(qt.English)), et(At, "RussianProtestant", new At(qt.RussianProtestant)), et(At, "RussianOrthodox", new At(qt.RussianOrthodox));
let ge = At;
function Ea(t, e) {
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
var Vi = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Vi || {});
const Rt = class rt {
  constructor(e, n, r, o) {
    if (et(this, "firstChapter"), et(this, "lastChapter"), et(this, "lastVerse"), et(this, "hasSegmentsDefined"), et(this, "text"), et(this, "BBBCCCVVVS"), et(this, "longHashCode"), et(this, "versification"), et(this, "rtlMark", "‏"), et(this, "_bookNum", 0), et(this, "_chapterNum", 0), et(this, "_verseNum", 0), et(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, s = n != null && n instanceof ge ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof ge ? n : void 0;
        this.setEmpty(a), this._verseNum = e % rt.chapterDigitShifter, this._chapterNum = Math.floor(
          e % rt.bookDigitShifter / rt.chapterDigitShifter
        ), this._bookNum = Math.floor(e / rt.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof rt) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null)
            return;
          const a = e instanceof ge ? e : rt.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = o ?? rt.defaultVersification;
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
      return n = new rt(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof dn)
        return n = new rt(), { success: !1, verseRef: n };
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
    return e % rt.bcvMaxValue * rt.bookDigitShifter + (n >= 0 ? n % rt.bcvMaxValue * rt.chapterDigitShifter : 0) + (r >= 0 ? r % rt.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: s } = e, l = a || o.toString();
    let c;
    return s && (c = new ge(s)), n ? new rt(n, r.toString(), l, c) : new rt();
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
      if (n = n * 10 + +r - 0, n > rt.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(rt.verseRangeSeparator) || this._verse.includes(rt.verseSequenceIndicator));
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
    const { success: n, vNum: r } = rt.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = rt.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > at.lastBook)
      throw new dn(
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
    this.versification = this.versification != null ? new ge(e) : void 0;
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
    return this.validateVerse(rt.verseRangeSeparators, rt.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return rt.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return rt.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new ge(qt[s]);
        } catch {
          throw new dn("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new dn("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || at.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !rt.isVerseParseable(r[1]))
      throw new dn("Invalid reference : " + e);
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
    return new rt(this);
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
    return e instanceof rt ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = rt.verseRangeSeparators, r = rt.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Ea(this._verse, r);
    for (const s of a.map((l) => Ea(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const d = this.clone();
        if (d.verse = s[1], !e)
          for (let p = c + 1; p < d.verseNum; p++) {
            const f = new rt(
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
  setEmpty(e = rt.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = at.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
et(Rt, "defaultVersification", ge.English), et(Rt, "verseRangeSeparator", "-"), et(Rt, "verseSequenceIndicator", ","), et(Rt, "verseRangeSeparators", [Rt.verseRangeSeparator]), et(Rt, "verseSequenceIndicators", [Rt.verseSequenceIndicator]), et(Rt, "chapterDigitShifter", 1e3), et(Rt, "bookDigitShifter", Rt.chapterDigitShifter * Rt.chapterDigitShifter), et(Rt, "bcvMaxValue", Rt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
et(Rt, "ValidStatusType", Vi);
class dn extends Error {
}
const Oc = pr(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: s
  }, l) => /* @__PURE__ */ b(
    $i,
    {
      ref: l,
      textValue: t,
      className: x(
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
            className: x(
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
function _c({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: e }, (l, c) => c + 1), s = Tt(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ i("div", { className: x("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ i(
    "div",
    {
      className: x(
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
function Pc({ handleSort: t, handleLocationHistory: e, handleBookmarks: n }) {
  return /* @__PURE__ */ b(Mn, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ i("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ i(
        gl,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        bl,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        vl,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const Nn = at.allBookIds, $c = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Sa = ["OT", "NT", "DC"], Ic = 32 + 32 + 32, Mc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Ac = (t) => ({
  OT: Nn.filter((n) => at.isBookOT(n)),
  NT: Nn.filter((n) => at.isBookNT(n)),
  DC: Nn.filter((n) => at.isBookDC(n))
})[t], pn = (t) => Xl(at.bookIdToNumber(t));
function Dc() {
  return Nn.map((e) => at.bookIdToEnglishName(e));
}
function jc(t) {
  return Dc().includes(t);
}
function Bc(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (jc(e))
    return Nn.find((r) => at.bookIdToEnglishName(r) === e);
}
function Oh({ scrRef: t, handleSubmit: e, className: n }) {
  const r = kt(), [o, a] = ut(""), [s, l] = ut(
    at.bookNumberToId(t.bookNum)
  ), [c, d] = ut(t.chapterNum ?? 0), [p, f] = ut(
    at.bookNumberToId(t.bookNum)
  ), [w, g] = ut(!1), [y, m] = ut(w), h = Ne(void 0), k = Ne(void 0), T = Ne(void 0), C = Tt(
    (P) => Ac(P).filter((G) => {
      const j = at.bookIdToEnglishName(G).toLowerCase(), V = o.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return j.includes(V) || // Match book name
      G.toLowerCase().includes(V);
    }),
    [o]
  ), S = (P) => {
    a(P);
  }, v = Ne(!1), I = Tt((P) => {
    if (v.current) {
      v.current = !1;
      return;
    }
    g(P);
  }, []), B = Tt(
    (P, G, j, V) => {
      if (d(
        at.bookNumberToId(t.bookNum) !== P ? 1 : t.chapterNum
      ), G || pn(P) === -1) {
        e({
          bookNum: at.bookIdToNumber(P),
          chapterNum: j || 1,
          verseNum: V || 1
        }), g(!1), a("");
        return;
      }
      l(s !== P ? P : ""), g(!G);
    },
    [e, t.bookNum, t.chapterNum, s]
  ), O = (P) => {
    P <= 0 || P > pn(s) || B(s, !0, P);
  }, $ = Tt(() => {
    Mc.forEach((P) => {
      const G = o.match(P);
      if (G) {
        const [j, V = void 0, H = void 0] = G.slice(1), nt = Bc(j);
        (at.isBookIdValid(j) || nt) && B(
          nt ?? j,
          !0,
          V ? parseInt(V, 10) : 1,
          H ? parseInt(H, 10) : 1
        );
      }
    });
  }, [B, o]), L = Tt(
    (P) => {
      w ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof T < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      T.current !== null ? T.current.focus() : typeof k < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      k.current !== null && k.current.focus(), P.preventDefault()) : g(!0);
    },
    [w]
  ), A = (P) => {
    const { key: G } = P;
    G === "ArrowRight" || G === "ArrowLeft" || G === "ArrowDown" || G === "ArrowUp" || G === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: G })), h.current.focus());
  }, Q = (P) => {
    const { key: G } = P;
    if (p === s) {
      if (G === "Enter") {
        P.preventDefault(), B(s, !0, c);
        return;
      }
      const j = G === "ArrowRight" && !r || G === "ArrowRight" && r === "ltr" || G === "ArrowLeft" && r === "rtl", V = G === "ArrowLeft" && !r || G === "ArrowLeft" && r === "ltr" || G === "ArrowRight" && r === "rtl";
      let H = 0;
      if (j)
        if (c < pn(p))
          H = 1;
        else {
          P.preventDefault();
          return;
        }
      else if (V)
        if (c > 1)
          H = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        G === "ArrowDown" ? H = 6 : G === "ArrowUp" && (H = -6);
      c + H <= 0 || c + H > pn(p) ? d(0) : H !== 0 && (d(c + H), P.preventDefault());
    }
  };
  return pe(() => {
    s === p ? s === at.bookNumberToId(t.bookNum) ? d(t.chapterNum) : d(1) : d(0);
  }, [p, t.bookNum, t.chapterNum, s]), Na(() => {
    m(w);
  }, [w]), Na(() => {
    const P = setTimeout(() => {
      if (y && k.current && T.current) {
        const j = T.current.offsetTop - Ic;
        k.current.scrollTo({ top: j, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [y]), /* @__PURE__ */ i("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ b(Co, { modal: !1, open: w, onOpenChange: I, children: [
    /* @__PURE__ */ i(Pi, { asChild: !0, children: /* @__PURE__ */ i(
      uc,
      {
        ref: h,
        value: o,
        handleSearch: S,
        handleKeyDown: L,
        handleOnClick: () => {
          l(at.bookNumberToId(t.bookNum)), f(at.bookNumberToId(t.bookNum)), d(t.chapterNum > 0 ? t.chapterNum : 0), g(!0), h.current.focus();
        },
        onFocus: () => {
          v.current = !0;
        },
        handleSubmit: $,
        placeholder: `${at.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`,
        className: n
      }
    ) }),
    /* @__PURE__ */ i(
      fr,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: A,
        align: r === "ltr" ? "start" : "end",
        ref: k,
        children: /* @__PURE__ */ b("div", { className: "rtl:tw-ps-2", children: [
          /* @__PURE__ */ i(
            Pc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Sa.map(
            (P, G) => C(P).length > 0 && /* @__PURE__ */ b("div", { children: [
              /* @__PURE__ */ i(Mn, { className: "tw-font-semibold tw-text-foreground/80", children: $c[P] }),
              C(P).map((j) => /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(
                Oc,
                {
                  bookId: j,
                  handleSelectBook: () => B(j, !1),
                  isSelected: s === j,
                  handleHighlightBook: () => f(j),
                  handleKeyDown: Q,
                  bookType: P,
                  ref: (V) => {
                    s === j && (T.current = V);
                  },
                  children: /* @__PURE__ */ i(
                    _c,
                    {
                      handleSelectChapter: O,
                      endChapter: pn(j),
                      activeChapter: t.bookNum === at.bookIdToNumber(j) ? t.chapterNum : 0,
                      highlightedChapter: c,
                      handleHighlightedChapter: (V) => {
                        d(V);
                      }
                    }
                  )
                }
              ) }, j)),
              Sa.length - 1 !== G ? /* @__PURE__ */ i(mr, {}) : void 0
            ] }, P)
          )
        ] })
      }
    )
  ] }) });
}
const Vc = en(
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
), ft = E.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ i(r ? tn : "button", { className: x(Vc({ variant: e, size: n, className: t })), ref: a, ...o })
);
ft.displayName = "Button";
const zc = en(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), jt = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(Ni.Root, { ref: n, className: x("pr-twp", zc(), t), ...e }));
jt.displayName = Ni.Root.displayName;
const zi = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    Tn.Root,
    {
      className: x("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: r
    }
  );
});
zi.displayName = Tn.Root.displayName;
const oo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Tn.Item,
  {
    ref: n,
    className: x(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(Tn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i(Eo, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
oo.displayName = Tn.Item.displayName;
const Fi = Cn.Root, Li = Cn.Trigger, $o = E.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => {
  const a = kt();
  return /* @__PURE__ */ i(Cn.Portal, { children: /* @__PURE__ */ i(
    Cn.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: x(
        "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...r,
      dir: a
    }
  ) });
});
$o.displayName = Cn.Content.displayName;
const Fc = Jt.Portal, Gi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Overlay,
  {
    ref: n,
    className: x(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Gi.displayName = Jt.Overlay.displayName;
const Lc = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = kt();
  return /* @__PURE__ */ b(Fc, { children: [
    /* @__PURE__ */ i(Gi, {}),
    /* @__PURE__ */ b(
      Jt.Content,
      {
        ref: r,
        className: x(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        ...n,
        dir: o,
        children: [
          e,
          /* @__PURE__ */ b(
            Jt.Close,
            {
              className: x(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ i(So, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Lc.displayName = Jt.Content.displayName;
const Gc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Title,
  {
    ref: n,
    className: x("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Gc.displayName = Jt.Title.displayName;
const Uc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Description,
  {
    ref: n,
    className: x("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Uc.displayName = Jt.Description.displayName;
const Io = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t,
  {
    ref: n,
    className: x(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
Io.displayName = $t.displayName;
const Mo = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ i(yi, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ i(
      $t.Input,
      {
        ref: n,
        className: x(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
Mo.displayName = $t.Input.displayName;
const Ao = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.List,
  {
    ref: n,
    className: x("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
Ao.displayName = $t.List.displayName;
const Do = E.forwardRef((t, e) => /* @__PURE__ */ i($t.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Do.displayName = $t.Empty.displayName;
const Ui = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.Group,
  {
    ref: n,
    className: x(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ui.displayName = $t.Group.displayName;
const Xc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.Separator,
  {
    ref: n,
    className: x("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Xc.displayName = $t.Separator.displayName;
const jo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.Item,
  {
    ref: n,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
jo.displayName = $t.Item.displayName;
function Hc(t) {
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
  getOptionLabel: l = Hc,
  icon: c = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: p = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: w = "outline",
  alignDropDown: g = "start",
  isDisabled: y = !1,
  ...m
}) {
  const [h, k] = ut(!1);
  return /* @__PURE__ */ b(Fi, { open: h, onOpenChange: k, ...m, children: [
    /* @__PURE__ */ i(Li, { asChild: !0, children: /* @__PURE__ */ b(
      ft,
      {
        variant: w,
        role: "combobox",
        "aria-expanded": h,
        id: t,
        className: x(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: y,
        children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ i("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ i("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: a ? l(a) : d })
          ] }),
          /* @__PURE__ */ i(xi, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      $o,
      {
        align: g,
        className: x("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ b(Io, { children: [
          /* @__PURE__ */ i(Mo, { placeholder: p, className: "tw-text-inherit" }),
          /* @__PURE__ */ i(Do, { children: f }),
          /* @__PURE__ */ i(Ao, { children: e.map((T) => /* @__PURE__ */ b(
            jo,
            {
              value: l(T),
              onSelect: () => {
                s(T), k(!1);
              },
              children: [
                /* @__PURE__ */ i(
                  Qe,
                  {
                    className: x("tw-me-2 tw-h-4 tw-w-4", {
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
function Yc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const s = Ot(
    () => Array.from({ length: a }, (d, p) => p + 1),
    [a]
  );
  return /* @__PURE__ */ b(te, { children: [
    /* @__PURE__ */ i(jt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
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
    /* @__PURE__ */ i(jt, { htmlFor: "end-chapters-combobox", children: "to" }),
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
var Wc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Wc || {});
const _h = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Fr = (t, e) => t[e] ?? e;
function Ph({
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
  const p = Fr(d, "%webView_bookSelector_currentBook%"), f = Fr(d, "%webView_bookSelector_choose%"), w = Fr(d, "%webView_bookSelector_chooseBooks%"), [g, y] = ut(
    "current book"
    /* CURRENT_BOOK */
  ), m = (h) => {
    y(h), t(h);
  };
  return /* @__PURE__ */ i(
    zi,
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (h) => m(h),
      children: /* @__PURE__ */ b("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ b("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(oo, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ i(jt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ i(jt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ i(
            Yc,
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
        /* @__PURE__ */ b("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(oo, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ i(jt, { className: "tw-ms-1", children: w })
          ] }),
          /* @__PURE__ */ i(jt, { className: "tw-flex tw-items-center", children: r.map((h) => at.bookIdToEnglishName(h)).join(", ") }),
          /* @__PURE__ */ i(
            ft,
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
function qc({ table: t }) {
  return /* @__PURE__ */ b(Co, { children: [
    /* @__PURE__ */ i(Ul, { asChild: !0, children: /* @__PURE__ */ b(ft, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ i(yl, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ b(fr, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ i(Mn, { children: "Toggle columns" }),
      /* @__PURE__ */ i(mr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ i(
        Ro,
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
const Ue = yt.Root, Kc = yt.Group, Xe = yt.Value, Te = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = kt();
  return /* @__PURE__ */ b(
    yt.Trigger,
    {
      ref: r,
      className: x(
        "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
        t
      ),
      ...n,
      dir: o,
      children: [
        e,
        /* @__PURE__ */ i(yt.Icon, { asChild: !0, children: /* @__PURE__ */ i(ur, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Te.displayName = yt.Trigger.displayName;
const Xi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollUpButton,
  {
    ref: n,
    className: x("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(xl, { className: "tw-h-4 tw-w-4" })
  }
));
Xi.displayName = yt.ScrollUpButton.displayName;
const Hi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollDownButton,
  {
    ref: n,
    className: x("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(ur, { className: "tw-h-4 tw-w-4" })
  }
));
Hi.displayName = yt.ScrollDownButton.displayName;
const Ce = E.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => {
  const a = kt();
  return /* @__PURE__ */ i(yt.Portal, { children: /* @__PURE__ */ b(
    yt.Content,
    {
      ref: o,
      className: x(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...r,
      children: [
        /* @__PURE__ */ i(Xi, {}),
        /* @__PURE__ */ i(
          yt.Viewport,
          {
            className: x(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ i("div", { dir: a, children: e })
          }
        ),
        /* @__PURE__ */ i(Hi, {})
      ]
    }
  ) });
});
Ce.displayName = yt.Content.displayName;
const Jc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Label,
  {
    ref: n,
    className: x("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Jc.displayName = yt.Label.displayName;
const zt = E.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ b(
  yt.Item,
  {
    ref: r,
    className: x(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(yt.ItemIndicator, { children: /* @__PURE__ */ i(Qe, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ i(yt.ItemText, { children: e })
    ]
  }
));
zt.displayName = yt.Item.displayName;
const Zc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Separator,
  {
    ref: n,
    className: x("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Zc.displayName = yt.Separator.displayName;
function Qc({ table: t }) {
  return /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ b("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ i("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ b(
        Ue,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ i(Te, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ i(Xe, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ i(Ce, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ i(zt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ b("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ b(
        ft,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ i(Nl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ b(
        ft,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ i(kl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ b(
        ft,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ i(El, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ b(
        ft,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ i(Sl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const hr = E.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i("div", { className: x("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ i(
  "table",
  {
    ref: r,
    className: x("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
hr.displayName = "Table";
const gr = E.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i(
  "thead",
  {
    ref: r,
    className: x(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
gr.displayName = "TableHeader";
const br = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: x("[&_tr:last-child]:tw-border-0", t), ...e }));
br.displayName = "TableBody";
const td = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "tfoot",
  {
    ref: n,
    className: x("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
td.displayName = "TableFooter";
const de = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: x(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
de.displayName = "TableRow";
const Rn = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: x(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
Rn.displayName = "TableHead";
const He = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: x("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
He.displayName = "TableCell";
const ed = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "caption",
  {
    ref: n,
    className: x("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ed.displayName = "TableCaption";
function nd({
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
  const [l, c] = ut([]), [d, p] = ut([]), [f, w] = ut({}), [g, y] = ut({}), m = ki({
    data: e,
    columns: t,
    getCoreRowModel: Ei(),
    ...n && { getPaginationRowModel: ql() },
    onSortingChange: c,
    getSortedRowModel: Si(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Kl(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: y,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ b("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ i(qc, { table: m }),
    /* @__PURE__ */ b(hr, { stickyHeader: a, children: [
      /* @__PURE__ */ i(gr, { stickyHeader: a, children: m.getHeaderGroups().map((k) => /* @__PURE__ */ i(de, { children: k.headers.map((T) => /* @__PURE__ */ i(Rn, { children: T.isPlaceholder ? void 0 : xn(T.column.columnDef.header, T.getContext()) }, T.id)) }, k.id)) }),
      /* @__PURE__ */ i(br, { children: (h = m.getRowModel().rows) != null && h.length ? m.getRowModel().rows.map((k) => /* @__PURE__ */ i(
        de,
        {
          onClick: () => s(k, m),
          "data-state": k.getIsSelected() && "selected",
          children: k.getVisibleCells().map((T) => /* @__PURE__ */ i(He, { children: xn(T.column.columnDef.cell, T.getContext()) }, T.id))
        },
        k.id
      )) : /* @__PURE__ */ i(de, { children: /* @__PURE__ */ i(He, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ i(
        ft,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.previousPage(),
          disabled: !m.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ i(
        ft,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.nextPage(),
          disabled: !m.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ i(Qc, { table: m })
  ] });
}
function rd({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Ot(() => {
    const s = [];
    return t.forEach((l) => {
      s.some((c) => To(c, l)) || s.push(l);
    }), s;
  }, [t]);
  return /* @__PURE__ */ b(hr, { stickyHeader: !0, children: [
    /* @__PURE__ */ i(gr, { stickyHeader: !0, children: /* @__PURE__ */ b(de, { children: [
      /* @__PURE__ */ i(Rn, { children: r }),
      /* @__PURE__ */ i(Rn, { children: o })
    ] }) }),
    /* @__PURE__ */ i(br, { children: a.length > 0 && a.map((s) => /* @__PURE__ */ b(
      de,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ i(He, { children: `${at.bookNumberToEnglishName(s.reference.bookNum)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ i(He, { children: s.text })
        ]
      },
      `${s.reference.bookNum} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const Bo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  no.Root,
  {
    ref: n,
    className: x(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(
      no.Indicator,
      {
        className: x("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ i(Qe, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Bo.displayName = no.Root.displayName;
const od = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ta = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, ad = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? at.bookIdToNumber(e[1]) : 0;
}, id = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Yi = en(
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
), sd = E.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ i(
  Ti.Root,
  {
    ref: o,
    className: x(Yi({ variant: e, size: n, className: t })),
    ...r
  }
));
sd.displayName = Ti.Root.displayName;
const Wi = E.createContext({
  size: "default",
  variant: "default"
}), qi = E.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => {
  const s = kt();
  return /* @__PURE__ */ i(
    wr.Root,
    {
      ref: a,
      className: x("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: s,
      children: /* @__PURE__ */ i(
        Wi.Provider,
        {
          value: { variant: e, size: n },
          children: r
        }
      )
    }
  );
});
qi.displayName = wr.Root.displayName;
const tr = E.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const s = E.useContext(Wi);
  return /* @__PURE__ */ i(
    wr.Item,
    {
      ref: a,
      className: x(
        Yi({
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
tr.displayName = wr.Item.displayName;
const vr = (t) => t === "asc" ? /* @__PURE__ */ i(Ol, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ i(_l, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ i(Pl, { className: "tw-ms-2 tw-h-4 tw-w-4" }), $h = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ b(ft, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    vr(e.getIsSorted())
  ] })
}), ld = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ b(ft, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    vr(n.getIsSorted())
  ] })
}), Ih = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ b(ft, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    vr(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Lr = (t, e, n, r, o, a) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((d) => d !== c);
  }), r(s);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, Mh = (t, e, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ b(ft, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    t,
    vr(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const s = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ b(qi, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ i(
        tr,
        {
          onClick: () => Lr(
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
        tr,
        {
          onClick: () => Lr(
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
        tr,
        {
          onClick: () => Lr(
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
}), Ah = Object.freeze([
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
]), cd = (t, e, n) => {
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, dd = (t, e, n, r, o) => {
  if (!t)
    return [];
  const a = [];
  let s = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return od(t).forEach((p) => {
    p.startsWith("\\id") && (s = ad(p), l = 0, c = 0), p.startsWith("\\c") && (l = Ta(p), c = 0), p.startsWith("\\v") && (c = Ta(p), l === 0 && (l = e.chapterNum));
    let f = o.exec(p) ?? void 0;
    for (; f; ) {
      const w = [];
      f.forEach((h) => w.push(h));
      const g = f.index, y = a.find((h) => To(h.items, w)), m = {
        reference: {
          bookNum: s !== void 0 ? s : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: Hl(p, Math.max(0, g - 25), Math.min(g + 25, p.length))
      };
      if (y)
        y.count += 1, y.occurrences.push(m);
      else {
        const h = {
          items: w,
          count: 1,
          status: id(w[0], n, r),
          occurrences: [m]
        };
        a.push(h);
      }
      f = o.exec(p) ?? void 0;
    }
  }), a;
}, ne = (t, e) => t[e] ?? e;
function Dh({
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
  const f = ne(n, "%webView_inventory_all%"), w = ne(n, "%webView_inventory_approved%"), g = ne(n, "%webView_inventory_unapproved%"), y = ne(n, "%webView_inventory_unknown%"), m = ne(n, "%webView_inventory_scope_currentBook%"), h = ne(n, "%webView_inventory_scope_chapter%"), k = ne(n, "%webView_inventory_scope_verse%"), T = ne(n, "%webView_inventory_filter_text%"), C = ne(
    n,
    "%webView_inventory_show_additional_items%"
  ), [S, v] = ut(!1), [I, B] = ut("all"), [O, $] = ut(""), [L, A] = ut([]), Q = Ot(() => l ? r instanceof RegExp ? dd(
    l,
    t,
    a,
    s,
    r
  ) : r(l, t, a, s) : [], [l, r, t, a, s]), P = Ot(() => {
    if (S)
      return Q;
    const N = [];
    return Q.forEach((R) => {
      const U = R.items[0], X = N.find(
        (F) => F.items[0] === U
      );
      X ? (X.count += R.count, X.occurrences = X.occurrences.concat(R.occurrences)) : N.push({
        items: [U],
        count: R.count,
        occurrences: R.occurrences,
        status: R.status
      });
    }), N;
  }, [S, Q]), G = Ot(() => cd(P, I, O), [P, I, O]), j = Ot(() => {
    var U, X;
    if (!S)
      return p;
    const N = (U = o == null ? void 0 : o.tableHeaders) == null ? void 0 : U.length;
    if (!N)
      return p;
    const R = [];
    for (let F = 0; F < N; F++)
      R.push(
        ld(
          ((X = o == null ? void 0 : o.tableHeaders) == null ? void 0 : X[F]) || "Additional Item",
          F + 1
        )
      );
    return [...R, ...p];
  }, [o == null ? void 0 : o.tableHeaders, p, S]);
  pe(() => {
    A([]);
  }, [G]);
  const V = (N, R) => {
    R.setRowSelection(() => {
      const U = {};
      return U[N.index] = !0, U;
    }), A(N.original.items);
  }, H = (N) => {
    if (N === "book" || N === "chapter" || N === "verse")
      d(N);
    else
      throw new Error(`Invalid scope value: ${N}`);
  }, nt = (N) => {
    if (N === "all" || N === "approved" || N === "unapproved" || N === "unknown")
      B(N);
    else
      throw new Error(`Invalid status filter value: ${N}`);
  }, ot = Ot(() => {
    if (P.length === 0 || L.length === 0)
      return [];
    const N = P.filter((R) => To(
      S ? R.items : [R.items[0]],
      L
    ));
    if (N.length > 1)
      throw new Error("Selected item is not unique");
    return N[0].occurrences;
  }, [L, S, P]);
  return /* @__PURE__ */ b("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ b("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ b(
        Ue,
        {
          onValueChange: (N) => nt(N),
          defaultValue: I,
          children: [
            /* @__PURE__ */ i(Te, { className: "tw-m-1", children: /* @__PURE__ */ i(Xe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ b(Ce, { children: [
              /* @__PURE__ */ i(zt, { value: "all", children: f }),
              /* @__PURE__ */ i(zt, { value: "approved", children: w }),
              /* @__PURE__ */ i(zt, { value: "unapproved", children: g }),
              /* @__PURE__ */ i(zt, { value: "unknown", children: y })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ b(Ue, { onValueChange: (N) => H(N), defaultValue: c, children: [
        /* @__PURE__ */ i(Te, { className: "tw-m-1", children: /* @__PURE__ */ i(Xe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ b(Ce, { children: [
          /* @__PURE__ */ i(zt, { value: "book", children: m }),
          /* @__PURE__ */ i(zt, { value: "chapter", children: h }),
          /* @__PURE__ */ i(zt, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ i(
        nn,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: T,
          value: O,
          onChange: (N) => {
            $(N.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ b("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ i(
          Bo,
          {
            className: "tw-m-1",
            checked: S,
            onCheckedChange: (N) => {
              A([]), v(N);
            }
          }
        ),
        /* @__PURE__ */ i(jt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      nd,
      {
        columns: j,
        data: G,
        onRowClickHandler: V,
        stickyHeader: !0
      }
    ) }),
    ot.length > 0 && /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      rd,
      {
        occurrenceData: ot,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
function pd({
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
  const [p, f] = ut(!1), w = Tt(
    (m) => {
      var k;
      const h = (k = t.find((T) => T.label === m)) == null ? void 0 : k.value;
      h && r(
        n.includes(h) ? n.filter((T) => T !== h) : [...n, h]
      );
    },
    [t, n, r]
  ), g = () => s || o, y = Ot(() => {
    if (!l)
      return t;
    const m = t.filter((k) => k.starred).sort((k, T) => k.label.localeCompare(T.label)), h = t.filter((k) => !k.starred).sort((k, T) => {
      const C = n.includes(k.value), S = n.includes(T.value);
      return C && !S ? -1 : !C && S ? 1 : k.label.localeCompare(T.label);
    });
    return [...m, ...h];
  }, [t, n, l]);
  return /* @__PURE__ */ i("div", { className: d, children: /* @__PURE__ */ b(Fi, { open: p, onOpenChange: f, children: [
    /* @__PURE__ */ i(Li, { asChild: !0, children: /* @__PURE__ */ b(
      ft,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": p,
        className: x(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ i("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ i("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: x({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ i("div", { className: "tw-font-normal", children: g() })
              }
            )
          ] }),
          /* @__PURE__ */ i(xi, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i($o, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ b(Io, { children: [
      /* @__PURE__ */ i(Mo, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ b(Ao, { children: [
        /* @__PURE__ */ i(Do, { children: a }),
        /* @__PURE__ */ i(Ui, { children: y.map((m) => {
          const h = e ? e(m) : void 0;
          return /* @__PURE__ */ b(
            jo,
            {
              value: m.label,
              onSelect: w,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ i("div", { className: "w-4", children: /* @__PURE__ */ i(
                  Qe,
                  {
                    className: x(
                      "tw-h-4 tw-w-4",
                      n.includes(m.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ i("div", { className: "tw-w-4", children: m.starred && /* @__PURE__ */ i($l, { className: "tw-h-4 tw-w-4" }) }),
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
function Ki({
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: r,
  className: o
}) {
  const a = kt();
  return /* @__PURE__ */ b("div", { className: x("tw-relative", { "tw-w-full": r }, o), children: [
    /* @__PURE__ */ i(
      yi,
      {
        className: x(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": a === "rtl" },
          { "tw-left-3": a === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ i(
      nn,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: n,
        value: t,
        onChange: (s) => e(s.target.value)
      }
    ),
    t && /* @__PURE__ */ b(
      ft,
      {
        variant: "ghost",
        size: "icon",
        className: x(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": a === "rtl" },
          { "tw-right-0": a === "ltr" }
        ),
        onClick: () => {
          e("");
        },
        children: [
          /* @__PURE__ */ i(So, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
const Ji = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    It.Root,
    {
      orientation: "vertical",
      ref: n,
      className: x("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: r
    }
  );
});
Ji.displayName = It.List.displayName;
const Zi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.List,
  {
    ref: n,
    className: x(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Zi.displayName = It.List.displayName;
const ud = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Trigger,
  {
    ref: n,
    ...e,
    className: x(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Qi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Content,
  {
    ref: n,
    className: x(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Qi.displayName = It.Content.displayName;
function jh({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: r,
  headerTitle: o,
  searchClassName: a
}) {
  return /* @__PURE__ */ b("div", { className: "pr-twp", children: [
    /* @__PURE__ */ b("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ i("h1", { children: o }) : "",
      /* @__PURE__ */ i(
        Ki,
        {
          className: a,
          value: e,
          onSearch: n,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ b(Ji, { children: [
      /* @__PURE__ */ i(Zi, { children: t.map((s) => /* @__PURE__ */ i(ud, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ i(Qi, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
const Vo = E.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ i(
  Ci.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: x(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...r
  }
));
Vo.displayName = Ci.Root.displayName;
function Ca({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: x("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const wd = In.Provider, fd = In.Root, md = In.Trigger, ts = E.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(
  In.Content,
  {
    ref: r,
    sideOffset: e,
    className: x(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
ts.displayName = In.Content.displayName;
const hd = "16rem", gd = "3rem", es = E.createContext(void 0);
function yr() {
  const t = E.useContext(es);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const ns = E.forwardRef(
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
    ), g = E.useCallback(() => w((C) => !C), [w]), y = f ? "expanded" : "collapsed", k = kt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", T = E.useMemo(
      () => ({
        state: y,
        open: f,
        setOpen: w,
        toggleSidebar: g,
        side: k
      }),
      [y, f, w, g, k]
    );
    return /* @__PURE__ */ i(es.Provider, { value: T, children: /* @__PURE__ */ i(wd, { delayDuration: 0, children: /* @__PURE__ */ i(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": hd,
            "--sidebar-width-icon": gd,
            ...o
          }
        ),
        className: x(
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
ns.displayName = "SidebarProvider";
const rs = E.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: r, ...o }, a) => {
  const s = yr();
  return e === "none" ? /* @__PURE__ */ i(
    "div",
    {
      className: x(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: a,
      ...o,
      children: r
    }
  ) : /* @__PURE__ */ b(
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
            className: x(
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
            className: x(
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
rs.displayName = "Sidebar";
const bd = E.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const o = yr();
  return /* @__PURE__ */ b(
    ft,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: x("tw-h-7 tw-w-7", t),
      onClick: (a) => {
        e == null || e(a), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "primary" ? /* @__PURE__ */ i(Il, {}) : /* @__PURE__ */ i(Ml, {}),
        /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
bd.displayName = "SidebarTrigger";
const vd = E.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = yr();
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
        className: x(
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
vd.displayName = "SidebarRail";
const os = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "main",
    {
      ref: n,
      className: x(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
os.displayName = "SidebarInset";
const yd = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  nn,
  {
    ref: n,
    "data-sidebar": "input",
    className: x(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
yd.displayName = "SidebarInput";
const xd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: x("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
xd.displayName = "SidebarHeader";
const Nd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: x("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Nd.displayName = "SidebarFooter";
const kd = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Vo,
  {
    ref: n,
    "data-sidebar": "separator",
    className: x("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
kd.displayName = "SidebarSeparator";
const as = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: x(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
as.displayName = "SidebarContent";
const io = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: x("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
io.displayName = "SidebarGroup";
const so = E.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? tn : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: x(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
so.displayName = "SidebarGroupLabel";
const Ed = E.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? tn : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: x(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
Ed.displayName = "SidebarGroupAction";
const lo = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: x("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
lo.displayName = "SidebarGroupContent";
const is = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: x("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
is.displayName = "SidebarMenu";
const ss = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: x("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
ss.displayName = "SidebarMenuItem";
const Sd = en(
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
), ls = E.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...s
  }, l) => {
    const c = t ? tn : "button", { state: d } = yr(), p = /* @__PURE__ */ i(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
        className: x(Sd({ variant: n, size: r }), a),
        ...s
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ b(fd, { children: [
      /* @__PURE__ */ i(md, { asChild: !0, children: p }),
      /* @__PURE__ */ i(ts, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : p;
  }
);
ls.displayName = "SidebarMenuButton";
const Td = E.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ i(
  e ? tn : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: x(
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
const Cd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: x(
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
Cd.displayName = "SidebarMenuBadge";
const Rd = E.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = E.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ b(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: x("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ i(Ca, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ i(
          Ca,
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
Rd.displayName = "SidebarMenuSkeleton";
const Od = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: x(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Od.displayName = "SidebarMenuSub";
const _d = E.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ i("li", { ref: e, ...t })
);
_d.displayName = "SidebarMenuSubItem";
const Pd = E.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ i(
  t ? tn : "a",
  {
    ref: a,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: x(
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
Pd.displayName = "SidebarMenuSubButton";
function $d({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: a,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l
}) {
  const c = Tt(
    (f, w) => {
      r(f, w);
    },
    [r]
  ), d = Tt(
    (f) => {
      const w = n.find((g) => g.projectId === f);
      return w ? w.projectName : f;
    },
    [n]
  ), p = Tt(
    (f) => !o.projectId && f === o.label,
    [o]
  );
  return /* @__PURE__ */ i(
    rs,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: "tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",
      children: /* @__PURE__ */ b(as, { children: [
        /* @__PURE__ */ b(io, { children: [
          /* @__PURE__ */ i(so, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ i(lo, { children: /* @__PURE__ */ i(is, { children: e.map((f) => /* @__PURE__ */ i(ss, { children: /* @__PURE__ */ i(
            ls,
            {
              className: x(
                "tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",
                { "tw-bg-white tw-text-gray-900 tw-shadow-sm": p(f) }
              ),
              onClick: () => c(f),
              isActive: p(f),
              children: /* @__PURE__ */ i("span", { className: "tw-pl-3", children: f })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ b(io, { children: [
          /* @__PURE__ */ i(so, { className: "tw-text-sm tw-text-gray-400", children: s }),
          /* @__PURE__ */ i(lo, { className: "tw-pl-3", children: /* @__PURE__ */ i(
            ao,
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
function Bh({
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
  return /* @__PURE__ */ b("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3", children: [
    /* @__PURE__ */ i("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ i(
      Ki,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ b(ns, { id: t, className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto", children: [
      /* @__PURE__ */ i(
        $d,
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
      /* @__PURE__ */ i(os, { className: "tw-overflow-y-auto", children: r })
    ] })
  ] });
}
const le = "scrBook", Id = "scrRef", be = "source", Md = "details", Ad = "Scripture Reference", Dd = "Scripture Book", cs = "Type", jd = "Details";
function Bd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${at.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: le,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Ad,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? at.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === le ? Vr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => eo(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Vr(r.start),
      id: Id,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Vr(o.start);
      },
      sortingFn: (r, o) => eo(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: be,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? cs : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Md,
      header: (t == null ? void 0 : t.detailsColumnName) ?? jd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const Vd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || eo(t.start, t.end) === 0 ? `${zr(t.start)}+${e}` : `${zr(t.start)}+${e}-${zr(t.end)}+${n}`;
}, Ra = (t) => `${Vd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Vh({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: s,
  onRowSelected: l
}) {
  const [c, d] = ut([]), [p, f] = ut([{ id: le, desc: !1 }]), [w, g] = ut({}), y = Ot(
    () => t.flatMap((O) => O.data.map(($) => ({
      ...$,
      source: O.source
    }))),
    [t]
  ), m = Ot(
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
  pe(() => {
    c.includes(be) ? f([
      { id: be, desc: !1 },
      { id: le, desc: !1 }
    ]) : f([{ id: le, desc: !1 }]);
  }, [c]);
  const h = ki({
    data: y,
    columns: m,
    state: {
      grouping: c,
      sorting: p,
      rowSelection: w
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Jl(),
    getGroupedRowModel: Zl(),
    getCoreRowModel: Ei(),
    getSortedRowModel: Si(),
    getRowId: Ra,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  pe(() => {
    if (l) {
      const O = h.getSelectedRowModel().rowsById, $ = Object.keys(O);
      if ($.length === 1) {
        const L = y.find((A) => Ra(A) === $[0]) || void 0;
        L && l(L);
      }
    }
  }, [w, y, l, h]);
  const k = o ?? Dd, T = a ?? cs, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [le] },
    { label: `Group by ${T}`, value: [be] },
    {
      label: `Group by ${k} and ${T}`,
      value: [le, be]
    },
    {
      label: `Group by ${T} and ${k}`,
      value: [be, le]
    }
  ], S = (O) => {
    d(JSON.parse(O));
  }, v = (O, $) => {
    !O.getIsGrouped() && !O.getIsSelected() && O.getToggleSelectedHandler()($);
  }, I = (O, $) => O.getIsGrouped() ? "" : x("banded-row", $ % 2 === 0 ? "even" : "odd"), B = (O, $, L) => {
    if (!((O == null ? void 0 : O.length) === 0 || $.depth < L.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ b("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ b(
      Ue,
      {
        value: JSON.stringify(c),
        onValueChange: (O) => {
          S(O);
        },
        children: [
          /* @__PURE__ */ i(Te, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ i(Xe, {}) }),
          /* @__PURE__ */ i(Ce, { position: "item-aligned", children: /* @__PURE__ */ i(Kc, { children: C.map((O) => /* @__PURE__ */ i(zt, { value: JSON.stringify(O.value), children: O.label }, O.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ b(hr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ i(gr, { children: h.getHeaderGroups().map((O) => /* @__PURE__ */ i(de, { children: O.headers.filter(($) => $.column.columnDef.header).map(($) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ i(Rn, { colSpan: $.colSpan, className: "top-0 tw-sticky", children: $.isPlaceholder ? void 0 : /* @__PURE__ */ b("div", { children: [
          $.column.getCanGroup() ? /* @__PURE__ */ i(
            ft,
            {
              variant: "ghost",
              title: `Toggle grouping by ${$.column.columnDef.header}`,
              onClick: $.column.getToggleGroupingHandler(),
              type: "button",
              children: $.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          xn($.column.columnDef.header, $.getContext())
        ] }) }, $.id)
      )) }, O.id)) }),
      /* @__PURE__ */ i(br, { children: h.getRowModel().rows.map((O, $) => {
        const L = kt();
        return /* @__PURE__ */ i(
          de,
          {
            "data-state": O.getIsSelected() ? "selected" : "",
            className: x(I(O, $)),
            onClick: (A) => v(O, A),
            children: O.getVisibleCells().map((A) => {
              if (!(A.getIsPlaceholder() || A.column.columnDef.enableGrouping && !A.getIsGrouped() && (A.column.columnDef.id !== be || !n)))
                return /* @__PURE__ */ i(
                  He,
                  {
                    className: x(
                      A.column.columnDef.id,
                      "tw-p-[1px]",
                      B(c, O, A)
                    ),
                    children: (() => A.getIsGrouped() ? /* @__PURE__ */ b(
                      ft,
                      {
                        variant: "link",
                        onClick: O.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          O.getIsExpanded() && /* @__PURE__ */ i(ur, {}),
                          !O.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ i(ko, {}) : /* @__PURE__ */ i(Al, {})),
                          " ",
                          xn(A.column.columnDef.cell, A.getContext()),
                          " (",
                          O.subRows.length,
                          ")"
                        ]
                      }
                    ) : xn(A.column.columnDef.cell, A.getContext()))()
                  },
                  A.id
                );
            })
          },
          O.id
        );
      }) })
    ] })
  ] });
}
const Gr = {
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
function zh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {},
  className: o
}) {
  const a = {
    ...Gr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([l, c]) => [
          l,
          l === c && l in Gr ? Gr[l] : c
        ]
      )
    )
  }, s = kt();
  return /* @__PURE__ */ b(
    Ue,
    {
      value: `${e}`,
      onValueChange: (l) => n(
        l === "undefined" ? void 0 : parseInt(l, 10)
      ),
      children: [
        /* @__PURE__ */ i(Te, { className: x("pr-twp tw-w-auto", o), children: /* @__PURE__ */ i(
          Xe,
          {
            placeholder: a[pt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ i(
          Ce,
          {
            align: s === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((l) => /* @__PURE__ */ i(zt, { value: `${l}`, children: a[pt(l)] }, `${l}`))
          }
        )
      ]
    }
  );
}
function Fh({ children: t }) {
  return /* @__PURE__ */ i("div", { className: "pr-twp tw-grid", children: t });
}
function Lh({
  primary: t,
  secondary: e,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ b("div", { children: [
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ i("div", { children: n })
  ] });
}
function Gh({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ b("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ b("div", { children: [
      /* @__PURE__ */ i("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ i(Vo, {}) : ""
  ] });
}
function Uh({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ i("div", { id: t, className: e, children: n.map((s) => /* @__PURE__ */ b("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ i(
      Bo,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(s),
        onCheckedChange: (l) => o(s, l)
      }
    ),
    /* @__PURE__ */ i(jt, { children: a ? a(s) : s })
  ] }, s)) });
}
function zd(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Fd(t) {
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
var zo = {}, ds = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(ds);
var Ld = ds.exports, Ur = {};
function Fo(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return t(...r) || e(...r);
  };
}
function _() {
  return _ = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, _.apply(this, arguments);
}
function xe(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function ps(t) {
  if (!xe(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = ps(t[n]);
  }), e;
}
function re(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? _({}, t) : t;
  return xe(t) && xe(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (xe(e[o]) && o in t && xe(t[o]) ? r[o] = re(t[o], e[o], n) : n.clone ? r[o] = xe(e[o]) ? ps(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var co = { exports: {} }, Wn = { exports: {} }, it = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oa;
function Gd() {
  if (Oa)
    return it;
  Oa = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, y = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
  function C(v) {
    if (typeof v == "object" && v !== null) {
      var I = v.$$typeof;
      switch (I) {
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
                case y:
                case g:
                case s:
                  return v;
                default:
                  return I;
              }
          }
        case n:
          return I;
      }
    }
  }
  function S(v) {
    return C(v) === d;
  }
  return it.AsyncMode = c, it.ConcurrentMode = d, it.ContextConsumer = l, it.ContextProvider = s, it.Element = e, it.ForwardRef = p, it.Fragment = r, it.Lazy = y, it.Memo = g, it.Portal = n, it.Profiler = a, it.StrictMode = o, it.Suspense = f, it.isAsyncMode = function(v) {
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
    return C(v) === y;
  }, it.isMemo = function(v) {
    return C(v) === g;
  }, it.isPortal = function(v) {
    return C(v) === n;
  }, it.isProfiler = function(v) {
    return C(v) === a;
  }, it.isStrictMode = function(v) {
    return C(v) === o;
  }, it.isSuspense = function(v) {
    return C(v) === f;
  }, it.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === d || v === a || v === o || v === f || v === w || typeof v == "object" && v !== null && (v.$$typeof === y || v.$$typeof === g || v.$$typeof === s || v.$$typeof === l || v.$$typeof === p || v.$$typeof === h || v.$$typeof === k || v.$$typeof === T || v.$$typeof === m);
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
var _a;
function Ud() {
  return _a || (_a = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, y = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
    function C(M) {
      return typeof M == "string" || typeof M == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      M === r || M === d || M === a || M === o || M === f || M === w || typeof M == "object" && M !== null && (M.$$typeof === y || M.$$typeof === g || M.$$typeof === s || M.$$typeof === l || M.$$typeof === p || M.$$typeof === h || M.$$typeof === k || M.$$typeof === T || M.$$typeof === m);
    }
    function S(M) {
      if (typeof M == "object" && M !== null) {
        var Et = M.$$typeof;
        switch (Et) {
          case e:
            var z = M.type;
            switch (z) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case f:
                return z;
              default:
                var Nt = z && z.$$typeof;
                switch (Nt) {
                  case l:
                  case p:
                  case y:
                  case g:
                  case s:
                    return Nt;
                  default:
                    return Et;
                }
            }
          case n:
            return Et;
        }
      }
    }
    var v = c, I = d, B = l, O = s, $ = e, L = p, A = r, Q = y, P = g, G = n, j = a, V = o, H = f, nt = !1;
    function ot(M) {
      return nt || (nt = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(M) || S(M) === c;
    }
    function N(M) {
      return S(M) === d;
    }
    function R(M) {
      return S(M) === l;
    }
    function U(M) {
      return S(M) === s;
    }
    function X(M) {
      return typeof M == "object" && M !== null && M.$$typeof === e;
    }
    function F(M) {
      return S(M) === p;
    }
    function K(M) {
      return S(M) === r;
    }
    function W(M) {
      return S(M) === y;
    }
    function q(M) {
      return S(M) === g;
    }
    function Y(M) {
      return S(M) === n;
    }
    function J(M) {
      return S(M) === a;
    }
    function Z(M) {
      return S(M) === o;
    }
    function dt(M) {
      return S(M) === f;
    }
    st.AsyncMode = v, st.ConcurrentMode = I, st.ContextConsumer = B, st.ContextProvider = O, st.Element = $, st.ForwardRef = L, st.Fragment = A, st.Lazy = Q, st.Memo = P, st.Portal = G, st.Profiler = j, st.StrictMode = V, st.Suspense = H, st.isAsyncMode = ot, st.isConcurrentMode = N, st.isContextConsumer = R, st.isContextProvider = U, st.isElement = X, st.isForwardRef = F, st.isFragment = K, st.isLazy = W, st.isMemo = q, st.isPortal = Y, st.isProfiler = J, st.isStrictMode = Z, st.isSuspense = dt, st.isValidElementType = C, st.typeOf = S;
  }()), st;
}
var Pa;
function us() {
  return Pa || (Pa = 1, process.env.NODE_ENV === "production" ? Wn.exports = Gd() : Wn.exports = Ud()), Wn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Xr, $a;
function Xd() {
  if ($a)
    return Xr;
  $a = 1;
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
var Hr, Ia;
function Lo() {
  if (Ia)
    return Hr;
  Ia = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Hr = t, Hr;
}
var Yr, Ma;
function ws() {
  return Ma || (Ma = 1, Yr = Function.call.bind(Object.prototype.hasOwnProperty)), Yr;
}
var Wr, Aa;
function Hd() {
  if (Aa)
    return Wr;
  Aa = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = Lo(), n = {}, r = ws();
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
          } catch (y) {
            f = y;
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
  }, Wr = o, Wr;
}
var qr, Da;
function Yd() {
  if (Da)
    return qr;
  Da = 1;
  var t = us(), e = Xd(), n = Lo(), r = ws(), o = Hd(), a = function() {
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
  return qr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function f(N) {
      var R = N && (d && N[d] || N[p]);
      if (typeof R == "function")
        return R;
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
      element: S(),
      elementType: v(),
      instanceOf: I,
      node: L(),
      objectOf: O,
      oneOf: B,
      oneOfType: $,
      shape: Q,
      exact: P
    };
    function y(N, R) {
      return N === R ? N !== 0 || 1 / N === 1 / R : N !== N && R !== R;
    }
    function m(N, R) {
      this.message = N, this.data = R && typeof R == "object" ? R : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(N) {
      if (process.env.NODE_ENV !== "production")
        var R = {}, U = 0;
      function X(K, W, q, Y, J, Z, dt) {
        if (Y = Y || w, Z = Z || q, dt !== n) {
          if (c) {
            var M = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw M.name = "Invariant Violation", M;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Et = Y + ":" + q;
            !R[Et] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[Et] = !0, U++);
          }
        }
        return W[q] == null ? K ? W[q] === null ? new m("The " + J + " `" + Z + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new m("The " + J + " `" + Z + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : N(W, q, Y, J, Z);
      }
      var F = X.bind(null, !1);
      return F.isRequired = X.bind(null, !0), F;
    }
    function k(N) {
      function R(U, X, F, K, W, q) {
        var Y = U[X], J = V(Y);
        if (J !== N) {
          var Z = H(Y);
          return new m(
            "Invalid " + K + " `" + W + "` of type " + ("`" + Z + "` supplied to `" + F + "`, expected ") + ("`" + N + "`."),
            { expectedType: N }
          );
        }
        return null;
      }
      return h(R);
    }
    function T() {
      return h(s);
    }
    function C(N) {
      function R(U, X, F, K, W) {
        if (typeof N != "function")
          return new m("Property `" + W + "` of component `" + F + "` has invalid PropType notation inside arrayOf.");
        var q = U[X];
        if (!Array.isArray(q)) {
          var Y = V(q);
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected an array."));
        }
        for (var J = 0; J < q.length; J++) {
          var Z = N(q, J, F, K, W + "[" + J + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return h(R);
    }
    function S() {
      function N(R, U, X, F, K) {
        var W = R[U];
        if (!l(W)) {
          var q = V(W);
          return new m("Invalid " + F + " `" + K + "` of type " + ("`" + q + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(N);
    }
    function v() {
      function N(R, U, X, F, K) {
        var W = R[U];
        if (!t.isValidElementType(W)) {
          var q = V(W);
          return new m("Invalid " + F + " `" + K + "` of type " + ("`" + q + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(N);
    }
    function I(N) {
      function R(U, X, F, K, W) {
        if (!(U[X] instanceof N)) {
          var q = N.name || w, Y = ot(U[X]);
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected ") + ("instance of `" + q + "`."));
        }
        return null;
      }
      return h(R);
    }
    function B(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function R(U, X, F, K, W) {
        for (var q = U[X], Y = 0; Y < N.length; Y++)
          if (y(q, N[Y]))
            return null;
        var J = JSON.stringify(N, function(dt, M) {
          var Et = H(M);
          return Et === "symbol" ? String(M) : M;
        });
        return new m("Invalid " + K + " `" + W + "` of value `" + String(q) + "` " + ("supplied to `" + F + "`, expected one of " + J + "."));
      }
      return h(R);
    }
    function O(N) {
      function R(U, X, F, K, W) {
        if (typeof N != "function")
          return new m("Property `" + W + "` of component `" + F + "` has invalid PropType notation inside objectOf.");
        var q = U[X], Y = V(q);
        if (Y !== "object")
          return new m("Invalid " + K + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected an object."));
        for (var J in q)
          if (r(q, J)) {
            var Z = N(q, J, F, K, W + "." + J, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return h(R);
    }
    function $(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var R = 0; R < N.length; R++) {
        var U = N[R];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + nt(U) + " at index " + R + "."
          ), s;
      }
      function X(F, K, W, q, Y) {
        for (var J = [], Z = 0; Z < N.length; Z++) {
          var dt = N[Z], M = dt(F, K, W, q, Y, n);
          if (M == null)
            return null;
          M.data && r(M.data, "expectedType") && J.push(M.data.expectedType);
        }
        var Et = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new m("Invalid " + q + " `" + Y + "` supplied to " + ("`" + W + "`" + Et + "."));
      }
      return h(X);
    }
    function L() {
      function N(R, U, X, F, K) {
        return G(R[U]) ? null : new m("Invalid " + F + " `" + K + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return h(N);
    }
    function A(N, R, U, X, F) {
      return new m(
        (N || "React class") + ": " + R + " type `" + U + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + F + "`."
      );
    }
    function Q(N) {
      function R(U, X, F, K, W) {
        var q = U[X], Y = V(q);
        if (Y !== "object")
          return new m("Invalid " + K + " `" + W + "` of type `" + Y + "` " + ("supplied to `" + F + "`, expected `object`."));
        for (var J in N) {
          var Z = N[J];
          if (typeof Z != "function")
            return A(F, K, W, J, H(Z));
          var dt = Z(q, J, F, K, W + "." + J, n);
          if (dt)
            return dt;
        }
        return null;
      }
      return h(R);
    }
    function P(N) {
      function R(U, X, F, K, W) {
        var q = U[X], Y = V(q);
        if (Y !== "object")
          return new m("Invalid " + K + " `" + W + "` of type `" + Y + "` " + ("supplied to `" + F + "`, expected `object`."));
        var J = e({}, U[X], N);
        for (var Z in J) {
          var dt = N[Z];
          if (r(N, Z) && typeof dt != "function")
            return A(F, K, W, Z, H(dt));
          if (!dt)
            return new m(
              "Invalid " + K + " `" + W + "` key `" + Z + "` supplied to `" + F + "`.\nBad object: " + JSON.stringify(U[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(N), null, "  ")
            );
          var M = dt(q, Z, F, K, W + "." + Z, n);
          if (M)
            return M;
        }
        return null;
      }
      return h(R);
    }
    function G(N) {
      switch (typeof N) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !N;
        case "object":
          if (Array.isArray(N))
            return N.every(G);
          if (N === null || l(N))
            return !0;
          var R = f(N);
          if (R) {
            var U = R.call(N), X;
            if (R !== N.entries) {
              for (; !(X = U.next()).done; )
                if (!G(X.value))
                  return !1;
            } else
              for (; !(X = U.next()).done; ) {
                var F = X.value;
                if (F && !G(F[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function j(N, R) {
      return N === "symbol" ? !0 : R ? R["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && R instanceof Symbol : !1;
    }
    function V(N) {
      var R = typeof N;
      return Array.isArray(N) ? "array" : N instanceof RegExp ? "object" : j(R, N) ? "symbol" : R;
    }
    function H(N) {
      if (typeof N > "u" || N === null)
        return "" + N;
      var R = V(N);
      if (R === "object") {
        if (N instanceof Date)
          return "date";
        if (N instanceof RegExp)
          return "regexp";
      }
      return R;
    }
    function nt(N) {
      var R = H(N);
      switch (R) {
        case "array":
        case "object":
          return "an " + R;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + R;
        default:
          return R;
      }
    }
    function ot(N) {
      return !N.constructor || !N.constructor.name ? w : N.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, qr;
}
var Kr, ja;
function Wd() {
  if (ja)
    return Kr;
  ja = 1;
  var t = Lo();
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
if (process.env.NODE_ENV !== "production") {
  var qd = us(), Kd = !0;
  co.exports = Yd()(qd.isElement, Kd);
} else
  co.exports = Wd()();
var Jd = co.exports;
const u = /* @__PURE__ */ zd(Jd);
function Zd(t) {
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
function fs(t, e, n, r, o) {
  const a = t[e], s = o || e;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Zd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ms = Fo(u.element, fs);
ms.isRequired = Fo(u.element.isRequired, fs);
const hs = ms, Qd = "exact-prop: ​";
function tp(t) {
  return process.env.NODE_ENV === "production" ? t : _({}, t, {
    [Qd]: (e) => {
      const n = Object.keys(e).filter((r) => !t.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Ye(t) {
  let e = "https://mui.com/production-error/?code=" + t;
  for (let n = 1; n < arguments.length; n += 1)
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + t + "; visit " + e + " for the full message.";
}
var po = { exports: {} }, lt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ba;
function ep() {
  if (Ba)
    return lt;
  Ba = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
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
                case s:
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
  return lt.ContextConsumer = s, lt.ContextProvider = a, lt.Element = t, lt.ForwardRef = c, lt.Fragment = n, lt.Lazy = w, lt.Memo = f, lt.Portal = e, lt.Profiler = o, lt.StrictMode = r, lt.Suspense = d, lt.SuspenseList = p, lt.isAsyncMode = function() {
    return !1;
  }, lt.isConcurrentMode = function() {
    return !1;
  }, lt.isContextConsumer = function(h) {
    return m(h) === s;
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
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === d || h === p || h === g || typeof h == "object" && h !== null && (h.$$typeof === w || h.$$typeof === f || h.$$typeof === a || h.$$typeof === s || h.$$typeof === c || h.$$typeof === y || h.getModuleId !== void 0);
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
var Va;
function np() {
  return Va || (Va = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), y = !1, m = !1, h = !1, k = !1, T = !1, C;
    C = Symbol.for("react.module.reference");
    function S(z) {
      return !!(typeof z == "string" || typeof z == "function" || z === n || z === o || T || z === r || z === d || z === p || k || z === g || y || m || h || typeof z == "object" && z !== null && (z.$$typeof === w || z.$$typeof === f || z.$$typeof === a || z.$$typeof === s || z.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      z.$$typeof === C || z.getModuleId !== void 0));
    }
    function v(z) {
      if (typeof z == "object" && z !== null) {
        var Nt = z.$$typeof;
        switch (Nt) {
          case t:
            var Ht = z.type;
            switch (Ht) {
              case n:
              case o:
              case r:
              case d:
              case p:
                return Ht;
              default:
                var fe = Ht && Ht.$$typeof;
                switch (fe) {
                  case l:
                  case s:
                  case c:
                  case w:
                  case f:
                  case a:
                    return fe;
                  default:
                    return Nt;
                }
            }
          case e:
            return Nt;
        }
      }
    }
    var I = s, B = a, O = t, $ = c, L = n, A = w, Q = f, P = e, G = o, j = r, V = d, H = p, nt = !1, ot = !1;
    function N(z) {
      return nt || (nt = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R(z) {
      return ot || (ot = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(z) {
      return v(z) === s;
    }
    function X(z) {
      return v(z) === a;
    }
    function F(z) {
      return typeof z == "object" && z !== null && z.$$typeof === t;
    }
    function K(z) {
      return v(z) === c;
    }
    function W(z) {
      return v(z) === n;
    }
    function q(z) {
      return v(z) === w;
    }
    function Y(z) {
      return v(z) === f;
    }
    function J(z) {
      return v(z) === e;
    }
    function Z(z) {
      return v(z) === o;
    }
    function dt(z) {
      return v(z) === r;
    }
    function M(z) {
      return v(z) === d;
    }
    function Et(z) {
      return v(z) === p;
    }
    ct.ContextConsumer = I, ct.ContextProvider = B, ct.Element = O, ct.ForwardRef = $, ct.Fragment = L, ct.Lazy = A, ct.Memo = Q, ct.Portal = P, ct.Profiler = G, ct.StrictMode = j, ct.Suspense = V, ct.SuspenseList = H, ct.isAsyncMode = N, ct.isConcurrentMode = R, ct.isContextConsumer = U, ct.isContextProvider = X, ct.isElement = F, ct.isForwardRef = K, ct.isFragment = W, ct.isLazy = q, ct.isMemo = Y, ct.isPortal = J, ct.isProfiler = Z, ct.isStrictMode = dt, ct.isSuspense = M, ct.isSuspenseList = Et, ct.isValidElementType = S, ct.typeOf = v;
  }()), ct;
}
process.env.NODE_ENV === "production" ? po.exports = ep() : po.exports = np();
var za = po.exports;
const rp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function op(t) {
  const e = `${t}`.match(rp);
  return e && e[1] || "";
}
function gs(t, e = "") {
  return t.displayName || t.name || op(t) || e;
}
function Fa(t, e, n) {
  const r = gs(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function ap(t) {
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return gs(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case za.ForwardRef:
          return Fa(t, t.render, "ForwardRef");
        case za.Memo:
          return Fa(t, t.type, "memo");
        default:
          return;
      }
  }
}
function On(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], s = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const ip = u.oneOfType([u.func, u.object]), bs = ip;
function Zt(t) {
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ye(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function sp(...t) {
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function lp(t, e = 166) {
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
function cp(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function dp(t, e) {
  var n, r;
  return /* @__PURE__ */ D.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function ar(t) {
  return t && t.ownerDocument || document;
}
function pp(t) {
  return ar(t).defaultView || window;
}
function up(t, e) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? _({}, e.propTypes) : null;
  return (o) => (a, s, l, c, d, ...p) => {
    const f = d || s, w = n == null ? void 0 : n[f];
    if (w) {
      const g = w(a, s, l, c, d, ...p);
      if (g)
        return g;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${f}\` of \`${t}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function ir(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const wp = typeof window < "u" ? D.useLayoutEffect : D.useEffect, We = wp;
let La = 0;
function fp(t) {
  const [e, n] = D.useState(t), r = t || e;
  return D.useEffect(() => {
    e == null && (La += 1, n(`mui-${La}`));
  }, [e]), r;
}
const Ga = D["useId".toString()];
function vs(t) {
  if (Ga !== void 0) {
    const e = Ga();
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
function ys({
  controlled: t,
  default: e,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = D.useRef(t !== void 0), [a, s] = D.useState(e), l = o ? t : a;
  if (process.env.NODE_ENV !== "production") {
    D.useEffect(() => {
      o !== (t !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, t]);
    const {
      current: d
    } = D.useRef(e);
    D.useEffect(() => {
      !o && d !== e && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(e)]);
  }
  const c = D.useCallback((d) => {
    o || s(d);
  }, []);
  return [l, c];
}
function uo(t) {
  const e = D.useRef(t);
  return We(() => {
    e.current = t;
  }), D.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function Re(...t) {
  return D.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      ir(n, e);
    });
  }, t);
}
const Ua = {};
function hp(t, e) {
  const n = D.useRef(Ua);
  return n.current === Ua && (n.current = t(e)), n;
}
const gp = [];
function bp(t) {
  D.useEffect(t, gp);
}
class An {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new An();
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
function hn() {
  const t = hp(An.create).current;
  return bp(t.disposeEffect), t;
}
let xr = !0, wo = !1;
const vp = new An(), yp = {
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
  t.metaKey || t.altKey || t.ctrlKey || (xr = !0);
}
function Jr() {
  xr = !1;
}
function kp() {
  this.visibilityState === "hidden" && wo && (xr = !0);
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
  return xr || xp(e);
}
function xs() {
  const t = D.useCallback((o) => {
    o != null && Ep(o.ownerDocument);
  }, []), e = D.useRef(!1);
  function n() {
    return e.current ? (wo = !0, vp.start(100, () => {
      wo = !1;
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
function Ns(t, e) {
  const n = _({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = _({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = _({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = Ns(o[s], a[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = t[r]);
  }), n;
}
function Go(t, e, n = void 0) {
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
const Xa = (t) => t, Tp = () => {
  let t = Xa;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = Xa;
    }
  };
}, Cp = Tp(), ks = Cp, Es = {
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
function Nr(t, e, n = "Mui") {
  const r = Es[e];
  return r ? `${n}-${r}` : `${ks.generate(t)}-${e}`;
}
function Ss(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = Nr(t, o, n);
  }), r;
}
function Rp(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, n));
}
function St(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(e.indexOf(o) >= 0) && (n[o] = t[o]);
  return n;
}
const Op = ["values", "unit", "step"], _p = (t) => {
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => _({}, n, {
    [r.key]: r.val
  }), {});
};
function Pp(t) {
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
  } = t, o = St(t, Op), a = _p(e), s = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof e[w] == "number" ? e[w] : w) - r / 100}${n})`;
  }
  function d(w, g) {
    const y = s.indexOf(g);
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n}) and (max-width:${(y !== -1 && typeof e[s[y]] == "number" ? e[s[y]] : g) - r / 100}${n})`;
  }
  function p(w) {
    return s.indexOf(w) + 1 < s.length ? d(w, s[s.indexOf(w) + 1]) : l(w);
  }
  function f(w) {
    const g = s.indexOf(w);
    return g === 0 ? l(s[1]) : g === s.length - 1 ? c(s[g]) : d(w, s[s.indexOf(w) + 1]).replace("@media", "@media not all and");
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
const $p = {
  borderRadius: 4
}, Ip = $p, Mp = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {}, ue = Mp;
function kn(t, e) {
  return e ? re(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
const Uo = {
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
}, Ha = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${Uo[t]}px)`
};
function oe(t, e, n) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const a = r.breakpoints || Ha;
    return e.reduce((s, l, c) => (s[a.up(a.keys[c])] = n(e[c]), s), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Ha;
    return Object.keys(e).reduce((s, l) => {
      if (Object.keys(a.values || Uo).indexOf(l) !== -1) {
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
function Ap(t = {}) {
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function Dp(t, e) {
  return t.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, e);
}
function kr(t, e, n = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && n) {
    const r = `vars.${e}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, t);
}
function sr(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = kr(t, n) || r, e && (o = e(o, r, t)), o;
}
function xt(t) {
  const {
    prop: e,
    cssProperty: n = t.prop,
    themeKey: r,
    transform: o
  } = t, a = (s) => {
    if (s[e] == null)
      return null;
    const l = s[e], c = s.theme, d = kr(c, r) || {};
    return oe(s, l, (f) => {
      let w = sr(d, o, f);
      return f === w && typeof f == "string" && (w = sr(d, o, `${e}${f === "default" ? "" : Zt(f)}`, f)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: ue
  } : {}, a.filterProps = [e], a;
}
function jp(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const Bp = {
  m: "margin",
  p: "padding"
}, Vp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ya = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, zp = jp((t) => {
  if (t.length > 2)
    if (Ya[t])
      t = Ya[t];
    else
      return [t];
  const [e, n] = t.split(""), r = Bp[e], o = Vp[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), Er = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Sr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Fp = [...Er, ...Sr];
function Dn(t, e, n, r) {
  var o;
  const a = (o = kr(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Ts(t) {
  return Dn(t, "spacing", 8, "spacing");
}
function jn(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Lp(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = jn(e, n), r), {});
}
function Gp(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = zp(n), a = Lp(o, r), s = t[n];
  return oe(t, s, a);
}
function Cs(t, e) {
  const n = Ts(t.theme);
  return Object.keys(t).map((r) => Gp(t, e, r, n)).reduce(kn, {});
}
function bt(t) {
  return Cs(t, Er);
}
bt.propTypes = process.env.NODE_ENV !== "production" ? Er.reduce((t, e) => (t[e] = ue, t), {}) : {};
bt.filterProps = Er;
function vt(t) {
  return Cs(t, Sr);
}
vt.propTypes = process.env.NODE_ENV !== "production" ? Sr.reduce((t, e) => (t[e] = ue, t), {}) : {};
vt.filterProps = Sr;
process.env.NODE_ENV !== "production" && Fp.reduce((t, e) => (t[e] = ue, t), {});
function Up(t = 8) {
  if (t.mui)
    return t;
  const e = Ts({
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const s = e(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Tr(...t) {
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? kn(o, e[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? t.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = t.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Ft(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Xt(t, e) {
  return xt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const Xp = Xt("border", Ft), Hp = Xt("borderTop", Ft), Yp = Xt("borderRight", Ft), Wp = Xt("borderBottom", Ft), qp = Xt("borderLeft", Ft), Kp = Xt("borderColor"), Jp = Xt("borderTopColor"), Zp = Xt("borderRightColor"), Qp = Xt("borderBottomColor"), tu = Xt("borderLeftColor"), eu = Xt("outline", Ft), nu = Xt("outlineColor"), Cr = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = Dn(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: jn(e, r)
    });
    return oe(t, t.borderRadius, n);
  }
  return null;
};
Cr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ue
} : {};
Cr.filterProps = ["borderRadius"];
Tr(Xp, Hp, Yp, Wp, qp, Kp, Jp, Zp, Qp, tu, Cr, eu, nu);
const Rr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = Dn(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: jn(e, r)
    });
    return oe(t, t.gap, n);
  }
  return null;
};
Rr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ue
} : {};
Rr.filterProps = ["gap"];
const Or = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = Dn(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: jn(e, r)
    });
    return oe(t, t.columnGap, n);
  }
  return null;
};
Or.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ue
} : {};
Or.filterProps = ["columnGap"];
const _r = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = Dn(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: jn(e, r)
    });
    return oe(t, t.rowGap, n);
  }
  return null;
};
_r.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ue
} : {};
_r.filterProps = ["rowGap"];
const ru = xt({
  prop: "gridColumn"
}), ou = xt({
  prop: "gridRow"
}), au = xt({
  prop: "gridAutoFlow"
}), iu = xt({
  prop: "gridAutoColumns"
}), su = xt({
  prop: "gridAutoRows"
}), lu = xt({
  prop: "gridTemplateColumns"
}), cu = xt({
  prop: "gridTemplateRows"
}), du = xt({
  prop: "gridTemplateAreas"
}), pu = xt({
  prop: "gridArea"
});
Tr(Rr, Or, _r, ru, ou, au, iu, su, lu, cu, du, pu);
function Ge(t, e) {
  return e === "grey" ? e : t;
}
const uu = xt({
  prop: "color",
  themeKey: "palette",
  transform: Ge
}), wu = xt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ge
}), fu = xt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ge
});
Tr(uu, wu, fu);
function Dt(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const mu = xt({
  prop: "width",
  transform: Dt
}), Xo = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Uo[n];
      return a ? ((o = t.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Dt(n)
      };
    };
    return oe(t, t.maxWidth, e);
  }
  return null;
};
Xo.filterProps = ["maxWidth"];
const hu = xt({
  prop: "minWidth",
  transform: Dt
}), gu = xt({
  prop: "height",
  transform: Dt
}), bu = xt({
  prop: "maxHeight",
  transform: Dt
}), vu = xt({
  prop: "minHeight",
  transform: Dt
});
xt({
  prop: "size",
  cssProperty: "width",
  transform: Dt
});
xt({
  prop: "size",
  cssProperty: "height",
  transform: Dt
});
const yu = xt({
  prop: "boxSizing"
});
Tr(mu, Xo, hu, gu, bu, vu, yu);
const xu = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ft
  },
  borderTop: {
    themeKey: "borders",
    transform: Ft
  },
  borderRight: {
    themeKey: "borders",
    transform: Ft
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ft
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ft
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
    transform: Ft
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Cr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ge
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ge
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ge
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
    style: Rr
  },
  rowGap: {
    style: _r
  },
  columnGap: {
    style: Or
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
    transform: Dt
  },
  maxWidth: {
    style: Xo
  },
  minWidth: {
    transform: Dt
  },
  height: {
    transform: Dt
  },
  maxHeight: {
    transform: Dt
  },
  minHeight: {
    transform: Dt
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
}, Ho = xu;
function Nu(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function ku(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Eu() {
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
    const w = kr(o, d) || {};
    return f ? f(s) : oe(s, r, (y) => {
      let m = sr(w, p, y);
      return y === m && typeof y == "string" && (m = sr(w, p, `${n}${y === "default" ? "" : Zt(y)}`, y)), c === !1 ? m : {
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
    const s = (r = a.unstable_sxConfig) != null ? r : Ho;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const p = Ap(a.breakpoints), f = Object.keys(p);
      let w = p;
      return Object.keys(d).forEach((g) => {
        const y = ku(d[g], a);
        if (y != null)
          if (typeof y == "object")
            if (s[g])
              w = kn(w, t(g, y, a, s));
            else {
              const m = oe({
                theme: a
              }, y, (h) => ({
                [g]: h
              }));
              Nu(m, y) ? w[g] = e({
                sx: y,
                theme: a
              }) : w = kn(w, m);
            }
          else
            w = kn(w, t(g, y, a, s));
      }), Dp(f, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
const Rs = Eu();
Rs.filterProps = ["sx"];
const Yo = Rs;
function Su(t, e) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
const Tu = ["breakpoints", "palette", "spacing", "shape"];
function Wo(t = {}, ...e) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = t, s = St(t, Tu), l = Pp(n), c = Up(o);
  let d = re({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: _({
      mode: "light"
    }, r),
    spacing: c,
    shape: _({}, Ip, a)
  }, s);
  return d.applyStyles = Su, d = e.reduce((p, f) => re(p, f), d), d.unstable_sxConfig = _({}, Ho, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Yo({
      sx: f,
      theme: this
    });
  }, d;
}
function Cu(t) {
  return Object.keys(t).length === 0;
}
function Os(t = null) {
  const e = D.useContext(tc);
  return !e || Cu(e) ? t : e;
}
const Ru = Wo();
function _s(t = Ru) {
  return Os(t);
}
const Ou = ["ownerState"], _u = ["variants"], Pu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function $u(t) {
  return Object.keys(t).length === 0;
}
function Iu(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function er(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const Mu = Wo(), Wa = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function qn({
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
  return $u(e) ? t : e[n] || e;
}
function Au(t) {
  return t ? (e, n) => n[t] : null;
}
function nr(t, e) {
  let {
    ownerState: n
  } = e, r = St(e, Ou);
  const o = typeof t == "function" ? t(_({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
    return o.flatMap((a) => nr(a, _({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = St(o, _u);
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
function Du(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = Mu,
    rootShouldForwardProp: r = er,
    slotShouldForwardProp: o = er
  } = t, a = (s) => Yo(_({}, s, {
    theme: qn(_({}, s, {
      defaultTheme: n,
      themeId: e
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    ec(s, (v) => v.filter((I) => !(I != null && I.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: p,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Au(Wa(d))
    } = l, g = St(l, Pu), y = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Wa(d || "Root")}`);
    let k = er;
    d === "Root" || d === "root" ? k = r : d ? k = o : Iu(s) && (k = void 0);
    const T = Ql(s, _({
      shouldForwardProp: k,
      label: h
    }, g)), C = (v) => typeof v == "function" && v.__emotion_real !== v || xe(v) ? (I) => nr(v, _({}, I, {
      theme: qn({
        theme: I.theme,
        defaultTheme: n,
        themeId: e
      })
    })) : v, S = (v, ...I) => {
      let B = C(v);
      const O = I ? I.map(C) : [];
      c && w && O.push((A) => {
        const Q = qn(_({}, A, {
          defaultTheme: n,
          themeId: e
        }));
        if (!Q.components || !Q.components[c] || !Q.components[c].styleOverrides)
          return null;
        const P = Q.components[c].styleOverrides, G = {};
        return Object.entries(P).forEach(([j, V]) => {
          G[j] = nr(V, _({}, A, {
            theme: Q
          }));
        }), w(A, G);
      }), c && !y && O.push((A) => {
        var Q;
        const P = qn(_({}, A, {
          defaultTheme: n,
          themeId: e
        })), G = P == null || (Q = P.components) == null || (Q = Q[c]) == null ? void 0 : Q.variants;
        return nr({
          variants: G
        }, _({}, A, {
          theme: P
        }));
      }), m || O.push(a);
      const $ = O.length - I.length;
      if (Array.isArray(v) && $ > 0) {
        const A = new Array($).fill("");
        B = [...v, ...A], B.raw = [...v.raw, ...A];
      }
      const L = T(B, ...O);
      if (process.env.NODE_ENV !== "production") {
        let A;
        c && (A = `${c}${Zt(d || "")}`), A === void 0 && (A = `Styled(${ap(s)})`), L.displayName = A;
      }
      return s.muiName && (L.muiName = s.muiName), L;
    };
    return T.withConfig && (S.withConfig = T.withConfig), S;
  };
}
function ju(t) {
  const {
    theme: e,
    name: n,
    props: r
  } = t;
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : Ns(e.components[n].defaultProps, r);
}
function Bu({
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
  let o = _s(n);
  return r && (o = o[r] || o), ju({
    theme: o,
    name: e,
    props: t
  });
}
function qo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), Rp(t, e, n);
}
function Vu(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Oe(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Oe(Vu(t));
  const e = t.indexOf("("), n = t.substring(0, e);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${t}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ye(9, t));
  let r = t.substring(e + 1, t.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ye(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Pr(t) {
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function zu(t) {
  t = Oe(t);
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), s = (d, p = (d + n / 30) % 12) => o - a * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), Pr({
    type: l,
    values: c
  });
}
function qa(t) {
  t = Oe(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Oe(zu(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function Ka(t, e) {
  const n = qa(t), r = qa(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Ps(t, e) {
  return t = Oe(t), e = qo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, Pr(t);
}
function Fu(t, e) {
  if (t = Oe(t), e = qo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
  return Pr(t);
}
function Lu(t, e) {
  if (t = Oe(t), e = qo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
  return Pr(t);
}
function Gu(t, e) {
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
const Uu = {
  black: "#000",
  white: "#fff"
}, _n = Uu, Xu = {
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
}, Hu = Xu, Yu = {
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
}, De = Yu, Wu = {
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
}, je = Wu, qu = {
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
}, un = qu, Ku = {
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
}, Be = Ku, Ju = {
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
}, Ve = Ju, Zu = {
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
}, ze = Zu, Qu = ["mode", "contrastThreshold", "tonalOffset"], Ja = {
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
    paper: _n.white,
    default: _n.white
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
    primary: _n.white,
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
    active: _n.white,
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
function Za(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = Lu(t.main, o) : e === "dark" && (t.dark = Fu(t.main, a)));
}
function tw(t = "light") {
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
function ew(t = "light") {
  return t === "dark" ? {
    main: De[200],
    light: De[50],
    dark: De[400]
  } : {
    main: De[500],
    light: De[300],
    dark: De[700]
  };
}
function nw(t = "light") {
  return t === "dark" ? {
    main: je[500],
    light: je[300],
    dark: je[700]
  } : {
    main: je[700],
    light: je[400],
    dark: je[800]
  };
}
function rw(t = "light") {
  return t === "dark" ? {
    main: Ve[400],
    light: Ve[300],
    dark: Ve[700]
  } : {
    main: Ve[700],
    light: Ve[500],
    dark: Ve[900]
  };
}
function ow(t = "light") {
  return t === "dark" ? {
    main: ze[400],
    light: ze[300],
    dark: ze[700]
  } : {
    main: ze[800],
    light: ze[500],
    dark: ze[900]
  };
}
function aw(t = "light") {
  return t === "dark" ? {
    main: un[400],
    light: un[300],
    dark: un[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: un[500],
    dark: un[900]
  };
}
function iw(t) {
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = t, o = St(t, Qu), a = t.primary || tw(e), s = t.secondary || ew(e), l = t.error || nw(e), c = t.info || rw(e), d = t.success || ow(e), p = t.warning || aw(e);
  function f(m) {
    const h = Ka(m, Zr.text.primary) >= n ? Zr.text.primary : Ja.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = Ka(m, h);
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
    if (m = _({}, m), !m.main && m[k] && (m.main = m[k]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : Ye(11, h ? ` (${h})` : "", k));
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
} });` : Ye(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return Za(m, "light", T, r), Za(m, "dark", C, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, g = {
    dark: Zr,
    light: Ja
  };
  return process.env.NODE_ENV !== "production" && (g[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), re(_({
    // A collection of common colors.
    common: _({}, _n),
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
    grey: Hu,
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
const sw = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function lw(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Qa = {
  textTransform: "uppercase"
}, ti = '"Roboto", "Helvetica", "Arial", sans-serif';
function cw(t, e) {
  const n = typeof e == "function" ? e(t) : e, {
    fontFamily: r = ti,
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
  } = n, w = St(n, sw);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, y = f || ((k) => `${k / d * g}rem`), m = (k, T, C, S, v) => _({
    fontFamily: r,
    fontWeight: k,
    fontSize: y(T),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: C
  }, r === ti ? {
    letterSpacing: `${lw(S / T)}em`
  } : {}, v, p), h = {
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
    button: m(l, 14, 1.75, 0.4, Qa),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Qa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return re(_({
    htmlFontSize: d,
    pxToRem: y,
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
const dw = 0.2, pw = 0.14, uw = 0.12;
function ht(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${dw})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${pw})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${uw})`].join(",");
}
const ww = ["none", ht(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ht(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ht(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ht(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ht(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ht(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ht(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ht(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ht(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ht(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ht(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ht(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ht(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ht(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ht(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ht(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ht(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ht(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ht(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ht(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ht(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ht(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ht(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ht(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], fw = ww, mw = ["duration", "easing", "delay"], hw = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, gw = {
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
function ei(t) {
  return `${Math.round(t)}ms`;
}
function bw(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
function vw(t) {
  const e = _({}, hw, t.easing), n = _({}, gw, t.duration);
  return _({
    getAutoHeightDuration: bw,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
      } = a, d = St(a, mw);
      if (process.env.NODE_ENV !== "production") {
        const p = (w) => typeof w == "string", f = (w) => !isNaN(parseFloat(w));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !p(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof s == "string" ? s : ei(s)} ${l} ${typeof c == "string" ? c : ei(c)}`).join(",");
    }
  }, t, {
    easing: e,
    duration: n
  });
}
const yw = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, xw = yw, Nw = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function kw(t = {}, ...e) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = t, s = St(t, Nw);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ye(18));
  const l = iw(r), c = Wo(t);
  let d = re(c, {
    mixins: Gu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: fw.slice(),
    typography: cw(l, a),
    transitions: vw(o),
    zIndex: _({}, xw)
  });
  if (d = re(d, s), d = e.reduce((p, f) => re(p, f), d), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (w, g) => {
      let y;
      for (y in w) {
        const m = w[y];
        if (p.indexOf(y) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = Nr("", y);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[y] = {};
        }
      }
    };
    Object.keys(d.components).forEach((w) => {
      const g = d.components[w].styleOverrides;
      g && w.indexOf("Mui") === 0 && f(g, w);
    });
  }
  return d.unstable_sxConfig = _({}, Ho, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Yo({
      sx: f,
      theme: this
    });
  }, d;
}
const Ew = kw(), Ko = Ew, Jo = "$$material";
function Zo({
  props: t,
  name: e
}) {
  return Bu({
    props: t,
    name: e,
    defaultTheme: Ko,
    themeId: Jo
  });
}
const Sw = (t) => er(t) && t !== "classes", Tw = Du({
  themeId: Jo,
  defaultTheme: Ko,
  rootShouldForwardProp: Sw
}), Bn = Tw;
function Cw(t) {
  return Nr("MuiSvgIcon", t);
}
Ss("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Rw = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ow = (t) => {
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${Zt(e)}`, `fontSize${Zt(n)}`]
  };
  return Go(o, Cw, r);
}, _w = Bn("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${Zt(n.color)}`], e[`fontSize${Zt(n.fontSize)}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => {
  var n, r, o, a, s, l, c, d, p, f, w, g, y;
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
      action: (g = (t.vars || t).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (y = (t.vars || t).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[e.color]
  };
}), Qo = /* @__PURE__ */ D.forwardRef(function(e, n) {
  const r = Zo({
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
  } = r, g = St(r, Rw), y = /* @__PURE__ */ D.isValidElement(o) && o.type === "svg", m = _({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: p,
    viewBox: w,
    hasSvgAsChild: y
  }), h = {};
  p || (h.viewBox = w);
  const k = Ow(m);
  return /* @__PURE__ */ b(_w, _({
    as: l,
    className: ke(k.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, g, y && o.props, {
    ownerState: m,
    children: [y ? o.props.children : o, f ? /* @__PURE__ */ i("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Qo.propTypes = {
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
Qo.muiName = "SvgIcon";
const ni = Qo;
function $s(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ i(ni, _({
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = ni.muiName, /* @__PURE__ */ D.memo(/* @__PURE__ */ D.forwardRef(n));
}
const Pw = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ks.configure(t);
  }
}, $w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Zt,
  createChainedFunction: sp,
  createSvgIcon: $s,
  debounce: lp,
  deprecatedPropType: cp,
  isMuiElement: dp,
  ownerDocument: ar,
  ownerWindow: pp,
  requirePropFactory: up,
  setRef: ir,
  unstable_ClassNameGenerator: Pw,
  unstable_useEnhancedEffect: We,
  unstable_useId: vs,
  unsupportedProp: mp,
  useControlled: ys,
  useEventCallback: uo,
  useForkRef: Re,
  useIsFocusVisible: xs
}, Symbol.toStringTag, { value: "Module" })), Iw = /* @__PURE__ */ Fd($w);
var ri;
function Mw() {
  return ri || (ri = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
    var e = Iw;
  }(Ur)), Ur;
}
var Aw = Ld;
Object.defineProperty(zo, "__esModule", {
  value: !0
});
var Is = zo.default = void 0, Dw = Aw(Mw()), jw = ml;
Is = zo.default = (0, Dw.default)(/* @__PURE__ */ (0, jw.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Bw(t) {
  return typeof t == "string";
}
function gn(t, e, n) {
  return t === void 0 || Bw(t) ? e : _({}, e, {
    ownerState: _({}, e.ownerState, n)
  });
}
const Vw = {
  disableDefaultClasses: !1
}, zw = /* @__PURE__ */ D.createContext(Vw);
function Fw(t) {
  const {
    disableDefaultClasses: e
  } = D.useContext(zw);
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
function Gw(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function oi(t) {
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
    const g = ke(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), y = _({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = _({}, n, o, r);
    return g.length > 0 && (m.className = g), Object.keys(y).length > 0 && (m.style = y), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Lw(_({}, o, r)), l = oi(r), c = oi(o), d = e(s), p = ke(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = _({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = _({}, d, n, c, l);
  return p.length > 0 && (w.className = p), Object.keys(f).length > 0 && (w.style = f), {
    props: w,
    internalRef: d.ref
  };
}
const Xw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Hw(t) {
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = t, s = St(t, Xw), l = a ? {} : Gw(r, o), {
    props: c,
    internalRef: d
  } = Uw(_({}, s, {
    externalSlotProps: l
  })), p = Re(d, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return gn(n, _({}, c, {
    ref: p
  }), o);
}
const Ms = "base";
function Yw(t) {
  return `${Ms}--${t}`;
}
function Ww(t, e) {
  return `${Ms}-${t}-${e}`;
}
function As(t, e) {
  const n = Es[e];
  return n ? Yw(n) : Ww(t, e);
}
function qw(t, e) {
  const n = {};
  return e.forEach((r) => {
    n[r] = As(t, r);
  }), n;
}
function Kw(t) {
  return typeof t == "function" ? t() : t;
}
const lr = /* @__PURE__ */ D.forwardRef(function(e, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = e, [s, l] = D.useState(null), c = Re(/* @__PURE__ */ D.isValidElement(r) ? r.ref : null, n);
  if (We(() => {
    a || l(Kw(o) || document.body);
  }, [o, a]), We(() => {
    if (s && !a)
      return ir(n, s), () => {
        ir(n, null);
      };
  }, [n, s, a]), a) {
    if (/* @__PURE__ */ D.isValidElement(r)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ D.cloneElement(r, d);
    }
    return /* @__PURE__ */ i(D.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ i(D.Fragment, {
    children: s && /* @__PURE__ */ sc.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (lr.propTypes = {
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
  container: u.oneOfType([On, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool
});
process.env.NODE_ENV !== "production" && (lr["propTypes"] = tp(lr.propTypes));
var _t = "top", Gt = "bottom", Ut = "right", Pt = "left", ta = "auto", Vn = [_t, Gt, Ut, Pt], qe = "start", Pn = "end", Jw = "clippingParents", Ds = "viewport", wn = "popper", Zw = "reference", ai = /* @__PURE__ */ Vn.reduce(function(t, e) {
  return t.concat([e + "-" + qe, e + "-" + Pn]);
}, []), js = /* @__PURE__ */ [].concat(Vn, [ta]).reduce(function(t, e) {
  return t.concat([e, e + "-" + qe, e + "-" + Pn]);
}, []), Qw = "beforeRead", tf = "read", ef = "afterRead", nf = "beforeMain", rf = "main", of = "afterMain", af = "beforeWrite", sf = "write", lf = "afterWrite", cf = [Qw, tf, ef, nf, rf, of, af, sf, lf];
function Qt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Bt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function _e(t) {
  var e = Bt(t).Element;
  return t instanceof e || t instanceof Element;
}
function Lt(t) {
  var e = Bt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function ea(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Bt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function df(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !Lt(a) || !Qt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function pf(t) {
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
      !Lt(o) || !Qt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const uf = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: df,
  effect: pf,
  requires: ["computeStyles"]
};
function Kt(t) {
  return t.split("-")[0];
}
var Ee = Math.max, cr = Math.min, Ke = Math.round;
function fo() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Bs() {
  return !/^((?!chrome|android).)*safari/i.test(fo());
}
function Je(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && Lt(t) && (o = t.offsetWidth > 0 && Ke(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Ke(r.height) / t.offsetHeight || 1);
  var s = _e(t) ? Bt(t) : window, l = s.visualViewport, c = !Bs() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, w = r.height / a;
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
function na(t) {
  var e = Je(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function Vs(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && ea(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function ae(t) {
  return Bt(t).getComputedStyle(t);
}
function wf(t) {
  return ["table", "td", "th"].indexOf(Qt(t)) >= 0;
}
function we(t) {
  return ((_e(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function $r(t) {
  return Qt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (ea(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    we(t)
  );
}
function ii(t) {
  return !Lt(t) || // https://github.com/popperjs/popper-core/issues/837
  ae(t).position === "fixed" ? null : t.offsetParent;
}
function ff(t) {
  var e = /firefox/i.test(fo()), n = /Trident/i.test(fo());
  if (n && Lt(t)) {
    var r = ae(t);
    if (r.position === "fixed")
      return null;
  }
  var o = $r(t);
  for (ea(o) && (o = o.host); Lt(o) && ["html", "body"].indexOf(Qt(o)) < 0; ) {
    var a = ae(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function zn(t) {
  for (var e = Bt(t), n = ii(t); n && wf(n) && ae(n).position === "static"; )
    n = ii(n);
  return n && (Qt(n) === "html" || Qt(n) === "body" && ae(n).position === "static") ? e : n || ff(t) || e;
}
function ra(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function En(t, e, n) {
  return Ee(t, cr(e, n));
}
function mf(t, e, n) {
  var r = En(t, e, n);
  return r > n ? n : r;
}
function zs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Fs(t) {
  return Object.assign({}, zs(), t);
}
function Ls(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var hf = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, Fs(typeof e != "number" ? e : Ls(e, Vn));
};
function gf(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Kt(n.placement), c = ra(l), d = [Pt, Ut].indexOf(l) >= 0, p = d ? "height" : "width";
  if (!(!a || !s)) {
    var f = hf(o.padding, n), w = na(a), g = c === "y" ? _t : Pt, y = c === "y" ? Gt : Ut, m = n.rects.reference[p] + n.rects.reference[c] - s[c] - n.rects.popper[p], h = s[c] - n.rects.reference[c], k = zn(a), T = k ? c === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, C = m / 2 - h / 2, S = f[g], v = T - w[p] - f[y], I = T / 2 - w[p] / 2 + C, B = En(S, I, v), O = c;
    n.modifiersData[r] = (e = {}, e[O] = B, e.centerOffset = B - I, e);
  }
}
function bf(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || Vs(e.elements.popper, o) && (e.elements.arrow = o));
}
const vf = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: gf,
  effect: bf,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ze(t) {
  return t.split("-")[1];
}
var yf = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function xf(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: Ke(n * o) / o || 0,
    y: Ke(r * o) / o || 0
  };
}
function si(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, s = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, p = t.roundOffsets, f = t.isFixed, w = s.x, g = w === void 0 ? 0 : w, y = s.y, m = y === void 0 ? 0 : y, h = typeof p == "function" ? p({
    x: g,
    y: m
  }) : {
    x: g,
    y: m
  };
  g = h.x, m = h.y;
  var k = s.hasOwnProperty("x"), T = s.hasOwnProperty("y"), C = Pt, S = _t, v = window;
  if (d) {
    var I = zn(n), B = "clientHeight", O = "clientWidth";
    if (I === Bt(n) && (I = we(n), ae(I).position !== "static" && l === "absolute" && (B = "scrollHeight", O = "scrollWidth")), I = I, o === _t || (o === Pt || o === Ut) && a === Pn) {
      S = Gt;
      var $ = f && I === v && v.visualViewport ? v.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        I[B]
      );
      m -= $ - r.height, m *= c ? 1 : -1;
    }
    if (o === Pt || (o === _t || o === Gt) && a === Pn) {
      C = Ut;
      var L = f && I === v && v.visualViewport ? v.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        I[O]
      );
      g -= L - r.width, g *= c ? 1 : -1;
    }
  }
  var A = Object.assign({
    position: l
  }, d && yf), Q = p === !0 ? xf({
    x: g,
    y: m
  }, Bt(n)) : {
    x: g,
    y: m
  };
  if (g = Q.x, m = Q.y, c) {
    var P;
    return Object.assign({}, A, (P = {}, P[S] = T ? "0" : "", P[C] = k ? "0" : "", P.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", P));
  }
  return Object.assign({}, A, (e = {}, e[S] = T ? m + "px" : "", e[C] = k ? g + "px" : "", e.transform = "", e));
}
function Nf(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Kt(e.placement),
    variation: Ze(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, si(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, si(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const kf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Nf,
  data: {}
};
var Kn = {
  passive: !0
};
function Ef(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Bt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(p) {
    p.addEventListener("scroll", n.update, Kn);
  }), l && c.addEventListener("resize", n.update, Kn), function() {
    a && d.forEach(function(p) {
      p.removeEventListener("scroll", n.update, Kn);
    }), l && c.removeEventListener("resize", n.update, Kn);
  };
}
const Sf = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ef,
  data: {}
};
var Tf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function rr(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Tf[e];
  });
}
var Cf = {
  start: "end",
  end: "start"
};
function li(t) {
  return t.replace(/start|end/g, function(e) {
    return Cf[e];
  });
}
function oa(t) {
  var e = Bt(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function aa(t) {
  return Je(we(t)).left + oa(t).scrollLeft;
}
function Rf(t, e) {
  var n = Bt(t), r = we(t), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var d = Bs();
    (d || !d && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + aa(t),
    y: c
  };
}
function Of(t) {
  var e, n = we(t), r = oa(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = Ee(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Ee(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + aa(t), c = -r.scrollTop;
  return ae(o || n).direction === "rtl" && (l += Ee(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function ia(t) {
  var e = ae(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Gs(t) {
  return ["html", "body", "#document"].indexOf(Qt(t)) >= 0 ? t.ownerDocument.body : Lt(t) && ia(t) ? t : Gs($r(t));
}
function Sn(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = Gs(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Bt(r), s = o ? [a].concat(a.visualViewport || [], ia(r) ? r : []) : r, l = e.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Sn($r(s)))
  );
}
function mo(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function _f(t, e) {
  var n = Je(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ci(t, e, n) {
  return e === Ds ? mo(Rf(t, n)) : _e(e) ? _f(e, n) : mo(Of(we(t)));
}
function Pf(t) {
  var e = Sn($r(t)), n = ["absolute", "fixed"].indexOf(ae(t).position) >= 0, r = n && Lt(t) ? zn(t) : t;
  return _e(r) ? e.filter(function(o) {
    return _e(o) && Vs(o, r) && Qt(o) !== "body";
  }) : [];
}
function $f(t, e, n, r) {
  var o = e === "clippingParents" ? Pf(t) : [].concat(e), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, d) {
    var p = ci(t, d, r);
    return c.top = Ee(p.top, c.top), c.right = cr(p.right, c.right), c.bottom = cr(p.bottom, c.bottom), c.left = Ee(p.left, c.left), c;
  }, ci(t, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Us(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Kt(r) : null, a = r ? Ze(r) : null, s = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
  switch (o) {
    case _t:
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
    case Pt:
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
  var d = o ? ra(o) : null;
  if (d != null) {
    var p = d === "y" ? "height" : "width";
    switch (a) {
      case qe:
        c[d] = c[d] - (e[p] / 2 - n[p] / 2);
        break;
      case Pn:
        c[d] = c[d] + (e[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function $n(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, s = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? Jw : l, d = n.rootBoundary, p = d === void 0 ? Ds : d, f = n.elementContext, w = f === void 0 ? wn : f, g = n.altBoundary, y = g === void 0 ? !1 : g, m = n.padding, h = m === void 0 ? 0 : m, k = Fs(typeof h != "number" ? h : Ls(h, Vn)), T = w === wn ? Zw : wn, C = t.rects.popper, S = t.elements[y ? T : w], v = $f(_e(S) ? S : S.contextElement || we(t.elements.popper), c, p, s), I = Je(t.elements.reference), B = Us({
    reference: I,
    element: C,
    strategy: "absolute",
    placement: o
  }), O = mo(Object.assign({}, C, B)), $ = w === wn ? O : I, L = {
    top: v.top - $.top + k.top,
    bottom: $.bottom - v.bottom + k.bottom,
    left: v.left - $.left + k.left,
    right: $.right - v.right + k.right
  }, A = t.modifiersData.offset;
  if (w === wn && A) {
    var Q = A[o];
    Object.keys(L).forEach(function(P) {
      var G = [Ut, Gt].indexOf(P) >= 0 ? 1 : -1, j = [_t, Gt].indexOf(P) >= 0 ? "y" : "x";
      L[P] += Q[j] * G;
    });
  }
  return L;
}
function If(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? js : c, p = Ze(r), f = p ? l ? ai : ai.filter(function(y) {
    return Ze(y) === p;
  }) : Vn, w = f.filter(function(y) {
    return d.indexOf(y) >= 0;
  });
  w.length === 0 && (w = f);
  var g = w.reduce(function(y, m) {
    return y[m] = $n(t, {
      placement: m,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[Kt(m)], y;
  }, {});
  return Object.keys(g).sort(function(y, m) {
    return g[y] - g[m];
  });
}
function Mf(t) {
  if (Kt(t) === ta)
    return [];
  var e = rr(t);
  return [li(t), e, li(e)];
}
function Af(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, d = n.padding, p = n.boundary, f = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, y = g === void 0 ? !0 : g, m = n.allowedAutoPlacements, h = e.options.placement, k = Kt(h), T = k === h, C = c || (T || !y ? [rr(h)] : Mf(h)), S = [h].concat(C).reduce(function(F, K) {
      return F.concat(Kt(K) === ta ? If(e, {
        placement: K,
        boundary: p,
        rootBoundary: f,
        padding: d,
        flipVariations: y,
        allowedAutoPlacements: m
      }) : K);
    }, []), v = e.rects.reference, I = e.rects.popper, B = /* @__PURE__ */ new Map(), O = !0, $ = S[0], L = 0; L < S.length; L++) {
      var A = S[L], Q = Kt(A), P = Ze(A) === qe, G = [_t, Gt].indexOf(Q) >= 0, j = G ? "width" : "height", V = $n(e, {
        placement: A,
        boundary: p,
        rootBoundary: f,
        altBoundary: w,
        padding: d
      }), H = G ? P ? Ut : Pt : P ? Gt : _t;
      v[j] > I[j] && (H = rr(H));
      var nt = rr(H), ot = [];
      if (a && ot.push(V[Q] <= 0), l && ot.push(V[H] <= 0, V[nt] <= 0), ot.every(function(F) {
        return F;
      })) {
        $ = A, O = !1;
        break;
      }
      B.set(A, ot);
    }
    if (O)
      for (var N = y ? 3 : 1, R = function(K) {
        var W = S.find(function(q) {
          var Y = B.get(q);
          if (Y)
            return Y.slice(0, K).every(function(J) {
              return J;
            });
        });
        if (W)
          return $ = W, "break";
      }, U = N; U > 0; U--) {
        var X = R(U);
        if (X === "break")
          break;
      }
    e.placement !== $ && (e.modifiersData[r]._skip = !0, e.placement = $, e.reset = !0);
  }
}
const Df = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Af,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function di(t, e, n) {
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
function pi(t) {
  return [_t, Ut, Gt, Pt].some(function(e) {
    return t[e] >= 0;
  });
}
function jf(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, s = $n(e, {
    elementContext: "reference"
  }), l = $n(e, {
    altBoundary: !0
  }), c = di(s, r), d = di(l, o, a), p = pi(c), f = pi(d);
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
const Bf = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: jf
};
function Vf(t, e, n) {
  var r = Kt(t), o = [Pt, _t].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [Pt, Ut].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function zf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = js.reduce(function(p, f) {
    return p[f] = Vf(f, e.rects, a), p;
  }, {}), l = s[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = s;
}
const Ff = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: zf
};
function Lf(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Us({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Gf = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Lf,
  data: {}
};
function Uf(t) {
  return t === "x" ? "y" : "x";
}
function Xf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.padding, w = n.tether, g = w === void 0 ? !0 : w, y = n.tetherOffset, m = y === void 0 ? 0 : y, h = $n(e, {
    boundary: c,
    rootBoundary: d,
    padding: f,
    altBoundary: p
  }), k = Kt(e.placement), T = Ze(e.placement), C = !T, S = ra(k), v = Uf(S), I = e.modifiersData.popperOffsets, B = e.rects.reference, O = e.rects.popper, $ = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, L = typeof $ == "number" ? {
    mainAxis: $,
    altAxis: $
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, $), A = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, Q = {
    x: 0,
    y: 0
  };
  if (I) {
    if (a) {
      var P, G = S === "y" ? _t : Pt, j = S === "y" ? Gt : Ut, V = S === "y" ? "height" : "width", H = I[S], nt = H + h[G], ot = H - h[j], N = g ? -O[V] / 2 : 0, R = T === qe ? B[V] : O[V], U = T === qe ? -O[V] : -B[V], X = e.elements.arrow, F = g && X ? na(X) : {
        width: 0,
        height: 0
      }, K = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : zs(), W = K[G], q = K[j], Y = En(0, B[V], F[V]), J = C ? B[V] / 2 - N - Y - W - L.mainAxis : R - Y - W - L.mainAxis, Z = C ? -B[V] / 2 + N + Y + q + L.mainAxis : U + Y + q + L.mainAxis, dt = e.elements.arrow && zn(e.elements.arrow), M = dt ? S === "y" ? dt.clientTop || 0 : dt.clientLeft || 0 : 0, Et = (P = A == null ? void 0 : A[S]) != null ? P : 0, z = H + J - Et - M, Nt = H + Z - Et, Ht = En(g ? cr(nt, z) : nt, H, g ? Ee(ot, Nt) : ot);
      I[S] = Ht, Q[S] = Ht - H;
    }
    if (l) {
      var fe, Ct = S === "x" ? _t : Pt, Gn = S === "x" ? Gt : Ut, Yt = I[v], $e = v === "y" ? "height" : "width", me = Yt + h[Ct], Ie = Yt - h[Gn], Me = [_t, Pt].indexOf(k) !== -1, Ae = (fe = A == null ? void 0 : A[v]) != null ? fe : 0, he = Me ? me : Yt - B[$e] - O[$e] - Ae + L.altAxis, on = Me ? Yt + B[$e] + O[$e] - Ae - L.altAxis : Ie, Un = g && Me ? mf(he, Yt, on) : En(g ? he : me, Yt, g ? on : Ie);
      I[v] = Un, Q[v] = Un - Yt;
    }
    e.modifiersData[r] = Q;
  }
}
const Hf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Xf,
  requiresIfExists: ["offset"]
};
function Yf(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Wf(t) {
  return t === Bt(t) || !Lt(t) ? oa(t) : Yf(t);
}
function qf(t) {
  var e = t.getBoundingClientRect(), n = Ke(e.width) / t.offsetWidth || 1, r = Ke(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Kf(t, e, n) {
  n === void 0 && (n = !1);
  var r = Lt(e), o = Lt(e) && qf(e), a = we(e), s = Je(t, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Qt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  ia(a)) && (l = Wf(e)), Lt(e) ? (c = Je(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = aa(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Jf(t) {
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
function Zf(t) {
  var e = Jf(t);
  return cf.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Qf(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function tm(t) {
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
var ui = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function wi() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function em(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? ui : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ui, a),
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
          reference: _e(l) ? Sn(l) : l.contextElement ? Sn(l.contextElement) : [],
          popper: Sn(c)
        };
        var C = Zf(tm([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = C.filter(function(S) {
          return S.enabled;
        }), y(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var k = p.elements, T = k.reference, C = k.popper;
          if (wi(T, C)) {
            p.rects = {
              reference: Kf(T, zn(C), p.options.strategy === "fixed"),
              popper: na(C)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(L) {
              return p.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var S = 0; S < p.orderedModifiers.length; S++) {
              if (p.reset === !0) {
                p.reset = !1, S = -1;
                continue;
              }
              var v = p.orderedModifiers[S], I = v.fn, B = v.options, O = B === void 0 ? {} : B, $ = v.name;
              typeof I == "function" && (p = I({
                state: p,
                options: O,
                name: $,
                instance: g
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Qf(function() {
        return new Promise(function(h) {
          g.forceUpdate(), h(p);
        });
      }),
      destroy: function() {
        m(), w = !0;
      }
    };
    if (!wi(l, c))
      return g;
    g.setOptions(d).then(function(h) {
      !w && d.onFirstUpdate && d.onFirstUpdate(h);
    });
    function y() {
      p.orderedModifiers.forEach(function(h) {
        var k = h.name, T = h.options, C = T === void 0 ? {} : T, S = h.effect;
        if (typeof S == "function") {
          var v = S({
            state: p,
            name: k,
            instance: g,
            options: C
          }), I = function() {
          };
          f.push(v || I);
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
var nm = [Sf, Gf, kf, uf, Ff, Df, Hf, vf, Bf], rm = /* @__PURE__ */ em({
  defaultModifiers: nm
});
const Xs = "Popper";
function om(t) {
  return As(Xs, t);
}
qw(Xs, ["root"]);
const am = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], im = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function sm(t, e) {
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
function dr(t) {
  return typeof t == "function" ? t() : t;
}
function Ir(t) {
  return t.nodeType !== void 0;
}
function lm(t) {
  return !Ir(t);
}
const cm = () => Go({
  root: ["root"]
}, Fw(om)), dm = {}, pm = /* @__PURE__ */ D.forwardRef(function(e, n) {
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
    slotProps: g = {},
    slots: y = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = e, h = St(e, am), k = D.useRef(null), T = Re(k, n), C = D.useRef(null), S = Re(C, w), v = D.useRef(S);
  We(() => {
    v.current = S;
  }, [S]), D.useImperativeHandle(w, () => C.current, []);
  const I = sm(p, s), [B, O] = D.useState(I), [$, L] = D.useState(dr(o));
  D.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), D.useEffect(() => {
    o && L(dr(o));
  }, [o]), We(() => {
    if (!$ || !d)
      return;
    const j = (nt) => {
      O(nt.placement);
    };
    if (process.env.NODE_ENV !== "production" && $ && Ir($) && $.nodeType === 1) {
      const nt = $.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && nt.top === 0 && nt.left === 0 && nt.right === 0 && nt.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: nt
      }) => {
        j(nt);
      }
    }];
    c != null && (V = V.concat(c)), f && f.modifiers != null && (V = V.concat(f.modifiers));
    const H = rm($, k.current, _({
      placement: I
    }, f, {
      modifiers: V
    }));
    return v.current(H), () => {
      H.destroy(), v.current(null);
    };
  }, [$, l, c, d, f, I]);
  const A = {
    placement: B
  };
  m !== null && (A.TransitionProps = m);
  const Q = cm(), P = (r = y.root) != null ? r : "div", G = Hw({
    elementType: P,
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: T
    },
    ownerState: e,
    className: Q.root
  });
  return /* @__PURE__ */ i(P, _({}, G, {
    children: typeof a == "function" ? a(A) : a
  }));
}), Hs = /* @__PURE__ */ D.forwardRef(function(e, n) {
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
    popperOptions: w = dm,
    popperRef: g,
    style: y,
    transition: m = !1,
    slotProps: h = {},
    slots: k = {}
  } = e, T = St(e, im), [C, S] = D.useState(!0), v = () => {
    S(!1);
  }, I = () => {
    S(!0);
  };
  if (!c && !p && (!m || C))
    return null;
  let B;
  if (a)
    B = a;
  else if (r) {
    const L = dr(r);
    B = L && Ir(L) ? ar(L).body : ar(null).body;
  }
  const O = !p && c && (!m || C) ? "none" : void 0, $ = m ? {
    in: p,
    onEnter: v,
    onExited: I
  } : void 0;
  return /* @__PURE__ */ i(lr, {
    disablePortal: l,
    container: B,
    children: /* @__PURE__ */ i(pm, _({
      anchorEl: r,
      direction: s,
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
      style: _({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: O
      }, y),
      TransitionProps: $,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Hs.propTypes = {
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
  anchorEl: Fo(u.oneOfType([On, u.object, u.func]), (t) => {
    if (t.open) {
      const e = dr(t.anchorEl);
      if (e && Ir(e) && e.nodeType === 1) {
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!e || typeof e.getBoundingClientRect != "function" || lm(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
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
  container: u.oneOfType([On, u.func]),
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
  popperRef: bs,
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
function Ys() {
  const t = _s(Ko);
  return process.env.NODE_ENV !== "production" && D.useDebugValue(t), t[Jo] || t;
}
function ho(t, e) {
  return ho = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, ho(t, e);
}
function um(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, ho(t, e);
}
const fi = {
  disabled: !1
};
var wm = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
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
const Ws = E.createContext(null);
var fm = function(e) {
  return e.scrollTop;
}, bn = "unmounted", ve = "exited", ye = "entering", Le = "entered", go = "exiting", ie = /* @__PURE__ */ function(t) {
  um(e, t);
  function e(r, o) {
    var a;
    a = t.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = ve, a.appearStatus = ye) : c = Le : r.unmountOnExit || r.mountOnEnter ? c = bn : c = ve, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  e.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === bn ? {
      status: ve
    } : null;
  };
  var n = e.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== ye && s !== Le && (a = ye) : (s === ye || s === Le) && (a = go);
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
      if (this.cancelNextCallback(), a === ye) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Yn.findDOMNode(this);
          s && fm(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ve && this.setState({
        status: bn
      });
  }, n.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Yn.findDOMNode(this), l], d = c[0], p = c[1], f = this.getTimeouts(), w = l ? f.appear : f.enter;
    if (!o && !s || fi.disabled) {
      this.safeSetState({
        status: Le
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, p), this.safeSetState({
      status: ye
    }, function() {
      a.props.onEntering(d, p), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: Le
        }, function() {
          a.props.onEntered(d, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Yn.findDOMNode(this);
    if (!a || fi.disabled) {
      this.safeSetState({
        status: ve
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: go
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ve
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Yn.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === bn)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = St(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ E.createElement(Ws.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : E.cloneElement(E.Children.only(s), l))
    );
  }, e;
}(E.Component);
ie.contextType = Ws;
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
    var n = wm;
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
function Fe() {
}
ie.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Fe,
  onEntering: Fe,
  onEntered: Fe,
  onExit: Fe,
  onExiting: Fe,
  onExited: Fe
};
ie.UNMOUNTED = bn;
ie.EXITED = ve;
ie.ENTERING = ye;
ie.ENTERED = Le;
ie.EXITING = go;
const mm = ie, hm = (t) => t.scrollTop;
function mi(t, e) {
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
const gm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function bo(t) {
  return `scale(${t}, ${t ** 2})`;
}
const bm = {
  entering: {
    opacity: 1,
    transform: bo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Qr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), sa = /* @__PURE__ */ D.forwardRef(function(e, n) {
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
    onExiting: g,
    style: y,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = mm
  } = e, k = St(e, gm), T = hn(), C = D.useRef(), S = Ys(), v = D.useRef(null), I = Re(v, a.ref, n), B = (j) => (V) => {
    if (j) {
      const H = v.current;
      V === void 0 ? j(H) : j(H, V);
    }
  }, O = B(p), $ = B((j, V) => {
    hm(j);
    const {
      duration: H,
      delay: nt,
      easing: ot
    } = mi({
      style: y,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let N;
    m === "auto" ? (N = S.transitions.getAutoHeightDuration(j.clientHeight), C.current = N) : N = H, j.style.transition = [S.transitions.create("opacity", {
      duration: N,
      delay: nt
    }), S.transitions.create("transform", {
      duration: Qr ? N : N * 0.666,
      delay: nt,
      easing: ot
    })].join(","), c && c(j, V);
  }), L = B(d), A = B(g), Q = B((j) => {
    const {
      duration: V,
      delay: H,
      easing: nt
    } = mi({
      style: y,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let ot;
    m === "auto" ? (ot = S.transitions.getAutoHeightDuration(j.clientHeight), C.current = ot) : ot = V, j.style.transition = [S.transitions.create("opacity", {
      duration: ot,
      delay: H
    }), S.transitions.create("transform", {
      duration: Qr ? ot : ot * 0.666,
      delay: Qr ? H : H || ot * 0.333,
      easing: nt
    })].join(","), j.style.opacity = 0, j.style.transform = bo(0.75), f && f(j);
  }), P = B(w);
  return /* @__PURE__ */ i(h, _({
    appear: o,
    in: l,
    nodeRef: v,
    onEnter: $,
    onEntered: L,
    onEntering: O,
    onExit: Q,
    onExited: P,
    onExiting: A,
    addEndListener: (j) => {
      m === "auto" && T.start(C.current || 0, j), r && r(v.current, j);
    },
    timeout: m === "auto" ? null : m
  }, k, {
    children: (j, V) => /* @__PURE__ */ D.cloneElement(a, _({
      style: _({
        opacity: 0,
        transform: bo(0.75),
        visibility: j === "exited" && !l ? "hidden" : void 0
      }, bm[j], y, a.props.style),
      ref: I
    }, V))
  }));
});
process.env.NODE_ENV !== "production" && (sa.propTypes = {
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
  children: hs.isRequired,
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
sa.muiSupportAuto = !0;
const hi = sa, vm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], ym = Bn(Hs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), qs = /* @__PURE__ */ D.forwardRef(function(e, n) {
  var r;
  const o = Os(), a = Zo({
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
    modifiers: g,
    open: y,
    placement: m,
    popperOptions: h,
    popperRef: k,
    transition: T,
    slots: C,
    slotProps: S
  } = a, v = St(a, vm), I = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, B = _({
    anchorEl: s,
    container: p,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: y,
    placement: m,
    popperOptions: h,
    popperRef: k,
    transition: T
  }, v);
  return /* @__PURE__ */ i(ym, _({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: I
    },
    slotProps: S ?? d
  }, B, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (qs.propTypes = {
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
  anchorEl: u.oneOfType([On, u.object, u.func]),
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
  container: u.oneOfType([On, u.func]),
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
  popperRef: bs,
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
const Ks = qs;
function xm(t) {
  return Nr("MuiTooltip", t);
}
const Nm = Ss("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ce = Nm, km = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Em(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Sm = (t) => {
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Zt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Go(s, xm, e);
}, Tm = Bn(Ks, {
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
  [`&[data-popper-placement*="bottom"] .${ce.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ce.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ce.arrow}`]: _({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ce.arrow}`]: _({}, e.isRtl ? {
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
})), Cm = Bn("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${Zt(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => _({
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : Ps(t.palette.grey[700], 0.92),
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
  lineHeight: `${Em(16 / 14)}em`,
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${ce.popper}[data-popper-placement*="left"] &`]: _({
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
  [`.${ce.popper}[data-popper-placement*="right"] &`]: _({
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
  [`.${ce.popper}[data-popper-placement*="top"] &`]: _({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${ce.popper}[data-popper-placement*="bottom"] &`]: _({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
})), Rm = Bn("span", {
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
  color: t.vars ? t.vars.palette.Tooltip.bg : Ps(t.palette.grey[700], 0.9),
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
let Jn = !1;
const gi = new An();
let fn = {
  x: 0,
  y: 0
};
function Zn(t, e) {
  return (n) => {
    e && e(n), t(n);
  };
}
const Js = /* @__PURE__ */ D.forwardRef(function(e, n) {
  var r, o, a, s, l, c, d, p, f, w, g, y, m, h, k, T, C, S, v;
  const I = Zo({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: B = !1,
    children: O,
    components: $ = {},
    componentsProps: L = {},
    describeChild: A = !1,
    disableFocusListener: Q = !1,
    disableHoverListener: P = !1,
    disableInteractive: G = !1,
    disableTouchListener: j = !1,
    enterDelay: V = 100,
    enterNextDelay: H = 0,
    enterTouchDelay: nt = 700,
    followCursor: ot = !1,
    id: N,
    leaveDelay: R = 0,
    leaveTouchDelay: U = 1500,
    onClose: X,
    onOpen: F,
    open: K,
    placement: W = "bottom",
    PopperComponent: q,
    PopperProps: Y = {},
    slotProps: J = {},
    slots: Z = {},
    title: dt,
    TransitionComponent: M = hi,
    TransitionProps: Et
  } = I, z = St(I, km), Nt = /* @__PURE__ */ D.isValidElement(O) ? O : /* @__PURE__ */ i("span", {
    children: O
  }), Ht = Ys(), fe = Ht.direction === "rtl", [Ct, Gn] = D.useState(), [Yt, $e] = D.useState(null), me = D.useRef(!1), Ie = G || ot, Me = hn(), Ae = hn(), he = hn(), on = hn(), [Un, la] = ys({
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let ee = Un;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: tt
    } = D.useRef(K !== void 0);
    D.useEffect(() => {
      Ct && Ct.disabled && !tt && dt !== "" && Ct.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [dt, Ct, tt]);
  }
  const Mr = vs(N), an = D.useRef(), Xn = uo(() => {
    an.current !== void 0 && (document.body.style.WebkitUserSelect = an.current, an.current = void 0), on.clear();
  });
  D.useEffect(() => Xn, [Xn]);
  const ca = (tt) => {
    gi.clear(), Jn = !0, la(!0), F && !ee && F(tt);
  }, Hn = uo(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (tt) => {
      gi.start(800 + R, () => {
        Jn = !1;
      }), la(!1), X && ee && X(tt), Me.start(Ht.transitions.duration.shortest, () => {
        me.current = !1;
      });
    }
  ), Ar = (tt) => {
    me.current && tt.type !== "touchstart" || (Ct && Ct.removeAttribute("title"), Ae.clear(), he.clear(), V || Jn && H ? Ae.start(Jn ? H : V, () => {
      ca(tt);
    }) : ca(tt));
  }, da = (tt) => {
    Ae.clear(), he.start(R, () => {
      Hn(tt);
    });
  }, {
    isFocusVisibleRef: pa,
    onBlur: rl,
    onFocus: ol,
    ref: al
  } = xs(), [, ua] = D.useState(!1), wa = (tt) => {
    rl(tt), pa.current === !1 && (ua(!1), da(tt));
  }, fa = (tt) => {
    Ct || Gn(tt.currentTarget), ol(tt), pa.current === !0 && (ua(!0), Ar(tt));
  }, ma = (tt) => {
    me.current = !0;
    const Mt = Nt.props;
    Mt.onTouchStart && Mt.onTouchStart(tt);
  }, ha = Ar, ga = da, il = (tt) => {
    ma(tt), he.clear(), Me.clear(), Xn(), an.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", on.start(nt, () => {
      document.body.style.WebkitUserSelect = an.current, Ar(tt);
    });
  }, sl = (tt) => {
    Nt.props.onTouchEnd && Nt.props.onTouchEnd(tt), Xn(), he.start(U, () => {
      Hn(tt);
    });
  };
  D.useEffect(() => {
    if (!ee)
      return;
    function tt(Mt) {
      (Mt.key === "Escape" || Mt.key === "Esc") && Hn(Mt);
    }
    return document.addEventListener("keydown", tt), () => {
      document.removeEventListener("keydown", tt);
    };
  }, [Hn, ee]);
  const ll = Re(Nt.ref, al, Gn, n);
  !dt && dt !== 0 && (ee = !1);
  const Dr = D.useRef(), cl = (tt) => {
    const Mt = Nt.props;
    Mt.onMouseMove && Mt.onMouseMove(tt), fn = {
      x: tt.clientX,
      y: tt.clientY
    }, Dr.current && Dr.current.update();
  }, sn = {}, jr = typeof dt == "string";
  A ? (sn.title = !ee && jr && !P ? dt : null, sn["aria-describedby"] = ee ? Mr : null) : (sn["aria-label"] = jr ? dt : null, sn["aria-labelledby"] = ee && !jr ? Mr : null);
  const Vt = _({}, sn, z, Nt.props, {
    className: ke(z.className, Nt.props.className),
    onTouchStart: ma,
    ref: ll
  }, ot ? {
    onMouseMove: cl
  } : {});
  process.env.NODE_ENV !== "production" && (Vt["data-mui-internal-clone-element"] = !0, D.useEffect(() => {
    Ct && !Ct.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ct]));
  const ln = {};
  j || (Vt.onTouchStart = il, Vt.onTouchEnd = sl), P || (Vt.onMouseOver = Zn(ha, Vt.onMouseOver), Vt.onMouseLeave = Zn(ga, Vt.onMouseLeave), Ie || (ln.onMouseOver = ha, ln.onMouseLeave = ga)), Q || (Vt.onFocus = Zn(fa, Vt.onFocus), Vt.onBlur = Zn(wa, Vt.onBlur), Ie || (ln.onFocus = fa, ln.onBlur = wa)), process.env.NODE_ENV !== "production" && Nt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${Nt.props.title}\` or the Tooltip component.`].join(`
`));
  const dl = D.useMemo(() => {
    var tt;
    let Mt = [{
      name: "arrow",
      enabled: !!Yt,
      options: {
        element: Yt,
        padding: 4
      }
    }];
    return (tt = Y.popperOptions) != null && tt.modifiers && (Mt = Mt.concat(Y.popperOptions.modifiers)), _({}, Y.popperOptions, {
      modifiers: Mt
    });
  }, [Yt, Y]), cn = _({}, I, {
    isRtl: fe,
    arrow: B,
    disableInteractive: Ie,
    placement: W,
    PopperComponentProp: q,
    touch: me.current
  }), Br = Sm(cn), ba = (r = (o = Z.popper) != null ? o : $.Popper) != null ? r : Tm, va = (a = (s = (l = Z.transition) != null ? l : $.Transition) != null ? s : M) != null ? a : hi, ya = (c = (d = Z.tooltip) != null ? d : $.Tooltip) != null ? c : Cm, xa = (p = (f = Z.arrow) != null ? f : $.Arrow) != null ? p : Rm, pl = gn(ba, _({}, Y, (w = J.popper) != null ? w : L.popper, {
    className: ke(Br.popper, Y == null ? void 0 : Y.className, (g = (y = J.popper) != null ? y : L.popper) == null ? void 0 : g.className)
  }), cn), ul = gn(va, _({}, Et, (m = J.transition) != null ? m : L.transition), cn), wl = gn(ya, _({}, (h = J.tooltip) != null ? h : L.tooltip, {
    className: ke(Br.tooltip, (k = (T = J.tooltip) != null ? T : L.tooltip) == null ? void 0 : k.className)
  }), cn), fl = gn(xa, _({}, (C = J.arrow) != null ? C : L.arrow, {
    className: ke(Br.arrow, (S = (v = J.arrow) != null ? v : L.arrow) == null ? void 0 : S.className)
  }), cn);
  return /* @__PURE__ */ b(D.Fragment, {
    children: [/* @__PURE__ */ D.cloneElement(Nt, Vt), /* @__PURE__ */ i(ba, _({
      as: q ?? Ks,
      placement: W,
      anchorEl: ot ? {
        getBoundingClientRect: () => ({
          top: fn.y,
          left: fn.x,
          right: fn.x,
          bottom: fn.y,
          width: 0,
          height: 0
        })
      } : Ct,
      popperRef: Dr,
      open: Ct ? ee : !1,
      id: Mr,
      transition: !0
    }, ln, pl, {
      popperOptions: dl,
      children: ({
        TransitionProps: tt
      }) => /* @__PURE__ */ i(va, _({
        timeout: Ht.transitions.duration.shorter
      }, tt, ul, {
        children: /* @__PURE__ */ b(ya, _({}, wl, {
          children: [dt, B ? /* @__PURE__ */ i(xa, _({}, fl, {
            ref: $e
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Js.propTypes = {
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
  children: hs.isRequired,
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
const Om = Js;
function bi(t, e, n) {
  return t ? /* @__PURE__ */ i(Ri, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ i("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function Zs(t) {
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
    hasDivider: g = !1,
    focusVisibleClassName: y,
    id: m,
    children: h
  } = t, k = /* @__PURE__ */ i(
    nc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: p,
      disableGutters: w,
      divider: g,
      focusVisibleClassName: y,
      onClick: e,
      id: m,
      children: n ? /* @__PURE__ */ b(te, { children: [
        bi(a, n, !0),
        /* @__PURE__ */ i(rc, { primary: n, inset: !a && o }),
        f ? /* @__PURE__ */ i(Ri, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ i(Is, {}) }) : bi(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ i(Om, { title: r, placement: "right", children: /* @__PURE__ */ i("div", { children: k }) }) : k;
}
function Qs(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function _m(t) {
  const [e, n] = ut(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, s = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = Qs(a).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ i(tl, { ...t, includedGroups: d });
  };
  return /* @__PURE__ */ b(te, { children: [
    /* @__PURE__ */ i(Zs, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ i(
      oc,
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
const Pm = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function tl(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: s } = Ot(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Qs(e).filter((y) => !("menuItem" in y.group))
    ), f = Object.values(p).sort(
      (y, m) => (y.group.order || 0) - (m.group.order || 0)
    ), w = [];
    f.forEach((y) => {
      Pm(y.id, e.items).forEach(
        (m) => w.push({ item: m, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const g = w.some(
      (y) => "iconPathBefore" in y.item && y.item.iconPathBefore
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
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ i("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ i("div", { role: "menu", "aria-label": d, children: a.map((p, f) => {
    const { item: w } = p, g = l(p);
    if ("command" in w) {
      const y = w.group + f;
      return /* @__PURE__ */ i(
        Zs,
        {
          onClick: (m) => {
            n == null || n(m), r(w);
          },
          ...g
        },
        y
      );
    }
    return /* @__PURE__ */ i(
      _m,
      {
        parentMenuItem: w,
        parentItemProps: g,
        ...t
      },
      d + w.id
    );
  }) }, d);
}
function $m(t) {
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ i(tl, { ...t, includedGroups: a });
}
function Im({
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ b(
    Oi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ i("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ i(ac, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ i(
          $m,
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
function Mm({
  commandHandler: t,
  className: e,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Ot(() => {
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
    Oi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((s, l) => /* @__PURE__ */ i(
        Im,
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
const vo = (t, e, n = {}) => {
  const r = Ne(e);
  r.current = e;
  const o = Ne(n);
  o.current = Am(o.current);
  const [a, s] = ut(() => r.current), [l, c] = ut(!0);
  return pe(() => {
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
}, Dm = $s(/* @__PURE__ */ i("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function jm({
  menuProvider: t,
  normalMenu: e,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, d] = ut(!1), [p, f] = ut(!1), w = Tt(() => {
    c && d(!1), f(!1);
  }, [c]), g = Tt((S) => {
    S.stopPropagation(), d((v) => {
      const I = !v;
      return I && S.shiftKey ? f(!0) : I || f(!1), I;
    });
  }, []), y = Tt(
    (S) => (w(), r(S)),
    [r, w]
  ), [m, h] = ut({ top: 1, left: 1 });
  pe(() => {
    if (c) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const v = S.getBoundingClientRect(), I = window.scrollY, B = window.scrollX, O = v.top + I + S.clientHeight, $ = v.left + B;
        h({ top: O, left: $ });
      }
    }
  }, [c, o]);
  const [k] = vo(
    Tt(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [T] = vo(
    Tt(async () => (t == null ? void 0 : t(!0)) ?? n ?? k, [t, n, k, c]),
    n ?? k
  ), C = p && T ? T : k;
  return /* @__PURE__ */ b(te, { children: [
    /* @__PURE__ */ i(
      _i,
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
        children: l ?? /* @__PURE__ */ i(Dm, {})
      }
    ),
    /* @__PURE__ */ i(
      ic,
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
          Mm,
          {
            className: a,
            id: `${s ?? ""} main menu`,
            commandHandler: y,
            multiColumnMenu: C
          }
        ) : void 0
      }
    )
  ] });
}
function Xh({
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
    _i,
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
const Fn = pr(({ className: t, ...e }, n) => /* @__PURE__ */ i(Dl, { size: 35, className: x("tw-animate-spin", t), ...e, ref: n }));
Fn.displayName = "Spinner";
function Hh({
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
  onBlur: g
}) {
  return /* @__PURE__ */ b("div", { className: x("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ i(
      jt,
      {
        htmlFor: t,
        className: x({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ i(
      nn,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: x(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: p,
        onChange: f,
        onFocus: w,
        onBlur: g
      }
    ),
    /* @__PURE__ */ i("p", { className: x({ "tw-hidden": !o }), children: o })
  ] });
}
const el = E.createContext(void 0);
function Pe() {
  const t = E.useContext(el);
  if (!t)
    throw new Error("useContext must be used within a MenubarProvider.");
  return t;
}
function Ln(t) {
  return {
    "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground": t.variant === "muted"
  };
}
function Qn({ ...t }) {
  return /* @__PURE__ */ i(wt.Menu, { ...t });
}
function Bm({ ...t }) {
  return /* @__PURE__ */ i(wt.RadioGroup, { ...t });
}
function vi({ ...t }) {
  return /* @__PURE__ */ i(wt.Sub, { "data-slot": "menubar-sub", ...t });
}
const nl = E.forwardRef(({ className: t, variant: e = "default", ...n }, r) => {
  const o = E.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ i(el.Provider, { value: o, children: /* @__PURE__ */ i(
    wt.Root,
    {
      ref: r,
      className: x(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
nl.displayName = wt.Root.displayName;
const vn = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Pe();
  return /* @__PURE__ */ i(
    wt.Trigger,
    {
      ref: n,
      className: x(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "tw-text-foreground",
        // to match the default shadcn style
        Ln(r),
        t
      ),
      ...e
    }
  );
});
vn.displayName = wt.Trigger.displayName;
const yo = E.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => {
  const a = Pe();
  return /* @__PURE__ */ b(
    wt.SubTrigger,
    {
      ref: o,
      className: x(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        // CUSTOM
        Ln(a),
        t
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ i(ko, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
yo.displayName = wt.SubTrigger.displayName;
const xo = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Pe();
  return /* @__PURE__ */ i(
    wt.SubContent,
    {
      ref: n,
      className: x(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM
        {
          "tw-bg-popover": r.variant === "muted"
        },
        t
      ),
      ...e
    }
  );
});
xo.displayName = wt.SubContent.displayName;
const yn = E.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: r = 8, ...o }, a) => {
  const s = Pe();
  return /* @__PURE__ */ i(wt.Portal, { children: /* @__PURE__ */ i(
    wt.Content,
    {
      ref: a,
      align: e,
      alignOffset: n,
      sideOffset: r,
      className: x(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM
        "pr-twp",
        {
          "tw-bg-popover": s.variant === "muted"
        },
        t
      ),
      ...o
    }
  ) });
});
yn.displayName = wt.Content.displayName;
const gt = E.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = Pe();
  return /* @__PURE__ */ i(
    wt.Item,
    {
      ref: r,
      className: x(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        // CUSTOM
        Ln(o),
        t
      ),
      ...n
    }
  );
});
gt.displayName = wt.Item.displayName;
const No = E.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => {
  const a = Pe();
  return /* @__PURE__ */ b(
    wt.CheckboxItem,
    {
      ref: o,
      className: x(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        // CUSTOM
        Ln(a),
        t
      ),
      checked: n,
      ...r,
      children: [
        /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(wt.ItemIndicator, { children: /* @__PURE__ */ i(Qe, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
No.displayName = wt.CheckboxItem.displayName;
const or = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = Pe();
  return /* @__PURE__ */ b(
    wt.RadioItem,
    {
      ref: r,
      className: x(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        // CUSTOM
        Ln(o),
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(wt.ItemIndicator, { children: /* @__PURE__ */ i(Eo, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
or.displayName = wt.RadioItem.displayName;
const Vm = E.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  wt.Label,
  {
    ref: r,
    className: x("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Vm.displayName = wt.Label.displayName;
const Wt = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  wt.Separator,
  {
    ref: n,
    className: x("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Wt.displayName = wt.Separator.displayName;
function se({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: x("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
se.displayname = "MenubarShortcut";
function zm({ variant: t }) {
  return /* @__PURE__ */ b(nl, { className: "pr-twp tw-border-0 tw-bg-transparent", variant: t, children: [
    /* @__PURE__ */ b(Qn, { children: [
      /* @__PURE__ */ i(vn, { children: "File" }),
      /* @__PURE__ */ b(yn, { children: [
        /* @__PURE__ */ b(gt, { children: [
          "New Tab ",
          /* @__PURE__ */ i(se, { children: "⌘T" })
        ] }),
        /* @__PURE__ */ b(gt, { children: [
          "New Window ",
          /* @__PURE__ */ i(se, { children: "⌘N" })
        ] }),
        /* @__PURE__ */ i(gt, { disabled: !0, children: "New Incognito Window" }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ b(vi, { children: [
          /* @__PURE__ */ i(yo, { children: "Share" }),
          /* @__PURE__ */ b(xo, { children: [
            /* @__PURE__ */ i(gt, { children: "Email link" }),
            /* @__PURE__ */ i(gt, { children: "Messages" }),
            /* @__PURE__ */ i(gt, { children: "Notes" })
          ] })
        ] }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ b(gt, { children: [
          "Print... ",
          /* @__PURE__ */ i(se, { children: "⌘P" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ b(Qn, { children: [
      /* @__PURE__ */ i(vn, { children: "Edit" }),
      /* @__PURE__ */ b(yn, { children: [
        /* @__PURE__ */ b(gt, { children: [
          "Undo ",
          /* @__PURE__ */ i(se, { children: "⌘Z" })
        ] }),
        /* @__PURE__ */ b(gt, { children: [
          "Redo ",
          /* @__PURE__ */ i(se, { children: "⇧⌘Z" })
        ] }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ b(vi, { children: [
          /* @__PURE__ */ i(yo, { children: "Find" }),
          /* @__PURE__ */ b(xo, { children: [
            /* @__PURE__ */ i(gt, { children: "Search the web" }),
            /* @__PURE__ */ i(Wt, {}),
            /* @__PURE__ */ i(gt, { children: "Find..." }),
            /* @__PURE__ */ i(gt, { children: "Find Next" }),
            /* @__PURE__ */ i(gt, { children: "Find Previous" })
          ] })
        ] }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ i(gt, { children: "Cut" }),
        /* @__PURE__ */ i(gt, { children: "Copy" }),
        /* @__PURE__ */ i(gt, { children: "Paste" })
      ] })
    ] }),
    /* @__PURE__ */ b(Qn, { children: [
      /* @__PURE__ */ i(vn, { children: "View" }),
      /* @__PURE__ */ b(yn, { children: [
        /* @__PURE__ */ i(No, { children: "Always Show Bookmarks Bar" }),
        /* @__PURE__ */ i(No, { checked: !0, children: "Always Show Full URLs" }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ b(gt, { inset: !0, children: [
          "Reload ",
          /* @__PURE__ */ i(se, { children: "⌘R" })
        ] }),
        /* @__PURE__ */ b(gt, { disabled: !0, inset: !0, children: [
          "Force Reload ",
          /* @__PURE__ */ i(se, { children: "⇧⌘R" })
        ] }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ i(gt, { inset: !0, children: "Toggle Fullscreen" }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ i(gt, { inset: !0, children: "Hide Sidebar" })
      ] })
    ] }),
    /* @__PURE__ */ b(Qn, { children: [
      /* @__PURE__ */ i(vn, { children: "Profiles" }),
      /* @__PURE__ */ b(yn, { children: [
        /* @__PURE__ */ b(Bm, { value: "benoit", children: [
          /* @__PURE__ */ i(or, { value: "andy", children: "Andy" }),
          /* @__PURE__ */ i(or, { value: "benoit", children: "Benoit" }),
          /* @__PURE__ */ i(or, { value: "Luis", children: "Luis" })
        ] }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ i(gt, { inset: !0, children: "Edit..." }),
        /* @__PURE__ */ i(Wt, {}),
        /* @__PURE__ */ i(gt, { inset: !0, children: "Add Profile..." })
      ] })
    ] })
  ] });
}
function Yh({
  menuProvider: t,
  commandHandler: e,
  className: n,
  id: r,
  children: o,
  configAreaChildren: a,
  useAsAppDragArea: s,
  menubarVariant: l = "default"
}) {
  const c = Ne(void 0);
  return /* @__PURE__ */ i(
    "div",
    {
      className: x("tw-border tw-bg-muted tw-px-4 tw-text-muted-foreground", n),
      ref: c,
      style: { position: "relative" },
      id: r,
      children: /* @__PURE__ */ b(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between",
          style: s ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ i("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ i(
              "div",
              {
                className: "tw-flex tw-items-center",
                style: { WebkitAppRegion: "no-drag" },
                children: t ? /* @__PURE__ */ b(te, { children: [
                  /* @__PURE__ */ i(
                    jm,
                    {
                      commandHandler: e,
                      containerRef: c,
                      menuProvider: t
                    }
                  ),
                  /* @__PURE__ */ i(zm, { variant: l })
                ] }) : void 0
              }
            ) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: { WebkitAppRegion: "no-drag" },
                children: o
              }
            ),
            /* @__PURE__ */ i("div", { className: "tw-flex tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ i(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: { WebkitAppRegion: "no-drag" },
                children: a
              }
            ) })
          ]
        }
      )
    }
  );
}
const Fm = en(
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
), Lm = E.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ i("div", { ref: r, role: "alert", className: x(Fm({ variant: e }), t), ...n }));
Lm.displayName = "Alert";
const Gm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ b(
    "h5",
    {
      ref: n,
      className: x("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
Gm.displayName = "AlertTitle";
const Um = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: x("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Um.displayName = "AlertDescription";
const Xm = en(
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
function Hm({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: x("pr-twp", Xm({ variant: e }), t), ...n });
}
const Ym = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: x(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
Ym.displayName = "Card";
const Wm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: x("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Wm.displayName = "CardHeader";
const qm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "h3",
    {
      ref: n,
      className: x(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
qm.displayName = "CardTitle";
const Km = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("p", { ref: n, className: x("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Km.displayName = "CardDescription";
const Jm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: x("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Jm.displayName = "CardContent";
const Zm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: x("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Zm.displayName = "CardFooter";
function Wh({ ...t }) {
  return /* @__PURE__ */ i(
    lc,
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
const Qm = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ b(
    mn.Root,
    {
      ref: n,
      className: x(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: r,
      children: [
        /* @__PURE__ */ i(mn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ i(mn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ i(mn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Qm.displayName = mn.Root.displayName;
const th = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    ro.Root,
    {
      className: x(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ i(
        ro.Thumb,
        {
          className: x(
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
th.displayName = ro.Root.displayName;
const qh = It.Root, eh = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    It.List,
    {
      ref: n,
      className: x(
        "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: r
    }
  );
});
eh.displayName = It.List.displayName;
const nh = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Trigger,
  {
    ref: n,
    className: x(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
nh.displayName = It.Trigger.displayName;
const rh = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Content,
  {
    ref: n,
    className: x(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
rh.displayName = It.Content.displayName;
function Kh({
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ i(
    ft,
    {
      className: x(
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
      children: t ? /* @__PURE__ */ i(Fn, { size: 15 }) : /* @__PURE__ */ b(te, { children: [
        /* @__PURE__ */ i(jl, { size: 25, className: x("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function Jh({
  isEnabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    ft,
    {
      className: x(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ b(te, { children: [
        /* @__PURE__ */ i(Fn, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Zh({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    ft,
    {
      className: x(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ b(te, { children: [
        /* @__PURE__ */ i(Fn, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Qh({
  isUpdating: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    ft,
    {
      className: x(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ b(te, { children: [
        /* @__PURE__ */ i(Fn, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function tg({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: r
}) {
  const o = Ot(
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
  return /* @__PURE__ */ i("div", { id: t, className: x("pr-twp tw-prose", n), children: /* @__PURE__ */ i(cc, { options: o, children: e }) });
}
const oh = pr((t, e) => /* @__PURE__ */ b(
  ft,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ i(Bl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ i(
        ur,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var ah = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(ah || {});
function eg({ id: t, groups: e }) {
  return /* @__PURE__ */ i("div", { id: t, children: /* @__PURE__ */ b(Co, { children: [
    /* @__PURE__ */ i(Pi, { asChild: !0, children: /* @__PURE__ */ i(oh, {}) }),
    /* @__PURE__ */ i(fr, { children: e.map((n) => /* @__PURE__ */ b("div", { children: [
      /* @__PURE__ */ i(Mn, { children: n.label }),
      /* @__PURE__ */ i(wc, { children: n.items.map((r) => /* @__PURE__ */ i("div", { children: r.itemType === 0 ? /* @__PURE__ */ i(Ro, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ i(Ii, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ i(mr, {})
    ] }, n.label)) })
  ] }) });
}
function ng({ id: t, message: e }) {
  return /* @__PURE__ */ i("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ i("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function rg({
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new Yl("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), s = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ b(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ b("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ b("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ i(Vl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ b("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ i(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ b(
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
        /* @__PURE__ */ b("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ b(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ i(zl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ b(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ i(Fl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ih({ id: t, versionHistory: e }) {
  const [n, r] = ut(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), p = d.getUTCFullYear() - 1970, f = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let g = "";
    return p > 0 ? g = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? g = `${f.toString()} month${f === 1 ? "" : "s"} ago` : w === 0 ? g = "today" : g = `${w.toString()} day${w === 1 ? "" : "s"} ago`, g;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ b("div", { id: t, children: [
    /* @__PURE__ */ i("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ i("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ b("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ i("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ i("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ i("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ b("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ b("div", { children: [
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
function og({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Ot(() => Wl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((p) => d.of(p));
  })(r);
  return /* @__PURE__ */ i("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ b("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ i(ih, { versionHistory: o }),
    /* @__PURE__ */ i("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ b("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ i("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ b("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ b("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ i("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ b("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function ag({
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
  return /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ i(
      pd,
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
      return /* @__PURE__ */ b(Hm, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ i(
          ft,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => r(n.filter((g) => g !== f)),
            children: /* @__PURE__ */ i(So, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (w = t.find((g) => g.value === f)) == null ? void 0 : w.label
      ] }, f);
    }) }) : /* @__PURE__ */ i(jt, { children: p })
  ] });
}
const sh = (t, e) => t[e] ?? e;
function ig({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: a,
  localizedStrings: s,
  className: l
}) {
  const c = sh(
    s,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [d, p] = ut(!1), f = (g) => {
    o && o(g), r && r([g, ...n.filter((y) => y !== g)]), a && n.find((y) => y === g) && a([...n.filter((y) => y !== g)]), p(!1);
  }, w = (g, y) => {
    var h, k, T, C, S, v;
    const m = y !== g ? ((k = (h = t[g]) == null ? void 0 : h.uiNames) == null ? void 0 : k[y]) ?? ((C = (T = t[g]) == null ? void 0 : T.uiNames) == null ? void 0 : C.en) : void 0;
    return m ? `${(S = t[g]) == null ? void 0 : S.autonym} (${m})` : (v = t[g]) == null ? void 0 : v.autonym;
  };
  return /* @__PURE__ */ b("div", { className: x("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ b(
      Ue,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => p(g),
        children: [
          /* @__PURE__ */ i(Te, { children: /* @__PURE__ */ i(Xe, {}) }),
          /* @__PURE__ */ i(
            Ce,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ i(zt, { value: g, children: w(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ b(te, { children: [
      /* @__PURE__ */ i(jt, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ i("div", { className: "tw-ms-3", children: /* @__PURE__ */ b(jt, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((g) => w(g, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
const sg = (t, e) => {
  pe(() => {
    if (!t)
      return () => {
      };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
}, to = () => !1, lg = (t, e) => {
  const [n] = vo(
    Tt(async () => {
      if (!t)
        return to;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    to,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  pe(() => () => {
    n !== to && n();
  }, [n]);
};
function lh(t, e = "top") {
  if (!t || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
lh(`*, ::before, ::after {
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
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}
`, "top");
export {
  Lm as Alert,
  Um as AlertDescription,
  Gm as AlertTitle,
  _h as BOOK_SELECTOR_STRING_KEYS,
  Hm as Badge,
  Oh as BookChapterControl,
  Wc as BookSelectionMode,
  Ph as BookSelector,
  ft as Button,
  Ym as Card,
  Jm as CardContent,
  Km as CardDescription,
  Zm as CardFooter,
  Wm as CardHeader,
  qm as CardTitle,
  Yc as ChapterRangeSelector,
  Bo as Checkbox,
  Uh as Checklist,
  ao as ComboBox,
  nd as DataTable,
  Zh as DisableButton,
  Co as DropdownMenu,
  Ro as DropdownMenuCheckboxItem,
  fr as DropdownMenuContent,
  wc as DropdownMenuGroup,
  $i as DropdownMenuItem,
  ah as DropdownMenuItemType,
  Mn as DropdownMenuLabel,
  Sh as DropdownMenuPortal,
  Ch as DropdownMenuRadioGroup,
  Ii as DropdownMenuRadioItem,
  mr as DropdownMenuSeparator,
  hc as DropdownMenuShortcut,
  Th as DropdownMenuSub,
  mc as DropdownMenuSubContent,
  fc as DropdownMenuSubTrigger,
  Pi as DropdownMenuTrigger,
  Jh as EnableButton,
  ag as Filter,
  oh as FilterButton,
  eg as FilterDropdown,
  og as Footer,
  Mm as GridMenu,
  jm as HamburgerMenuButton,
  Ah as INVENTORY_STRING_KEYS,
  Xh as IconButton,
  nn as Input,
  Kh as InstallButton,
  Dh as Inventory,
  jt as Label,
  tg as MarkdownRenderer,
  Zs as MenuItem,
  rg as MoreInfo,
  pd as MultiSelectComboBox,
  jh as NavigationContentSearch,
  ng as NoExtensionsFound,
  Fi as Popover,
  $o as PopoverContent,
  Li as PopoverTrigger,
  zi as RadioGroup,
  oo as RadioGroupItem,
  Vh as ScriptureResultsViewer,
  zh as ScrollGroupSelector,
  Ki as SearchBar,
  Ue as Select,
  Ce as SelectContent,
  Kc as SelectGroup,
  zt as SelectItem,
  Jc as SelectLabel,
  Hi as SelectScrollDownButton,
  Xi as SelectScrollUpButton,
  Zc as SelectSeparator,
  Te as SelectTrigger,
  Xe as SelectValue,
  Vo as Separator,
  Fh as SettingsList,
  Gh as SettingsListHeader,
  Lh as SettingsListItem,
  $d as SettingsSidebar,
  Bh as SettingsSidebarContentSearch,
  Qm as Slider,
  Wh as Sonner,
  Fn as Spinner,
  th as Switch,
  hr as Table,
  br as TableBody,
  ed as TableCaption,
  He as TableCell,
  td as TableFooter,
  Rn as TableHead,
  gr as TableHeader,
  de as TableRow,
  qh as Tabs,
  rh as TabsContent,
  eh as TabsList,
  nh as TabsTrigger,
  Hh as TextField,
  qi as ToggleGroup,
  tr as ToggleGroupItem,
  Yh as Toolbar,
  ig as UiLanguageSelector,
  Qh as UpdateButton,
  ih as VersionHistory,
  Ji as VerticalTabs,
  Qi as VerticalTabsContent,
  Zi as VerticalTabsList,
  ud as VerticalTabsTrigger,
  Xm as badgeVariants,
  Vc as buttonVariants,
  x as cn,
  ad as getBookNumFromId,
  od as getLinesFromUSFM,
  Ta as getNumberFromUSFM,
  id as getStatusForItem,
  Ih as inventoryCountColumn,
  $h as inventoryItemColumn,
  Mh as inventoryStatusColumn,
  pg as sonner,
  sg as useEvent,
  lg as useEventAsync,
  vo as usePromise
};
//# sourceMappingURL=index.js.map
