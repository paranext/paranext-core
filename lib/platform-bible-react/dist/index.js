<<<<<<< HEAD
import { jsx as r, jsxs as l, Fragment as He } from "react/jsx-runtime";
import u, { forwardRef as de, useState as P, createContext as Or, useContext as Mr, useCallback as U, useRef as Q, useMemo as q, useEffect as dt, useLayoutEffect as gn, Fragment as Dn } from "react";
import { Check as _t, CircleSlash as zr, ChevronRight as Ye, Circle as Ue, X as Ke, Search as Vn, ChevronsUpDown as qe, FilterIcon as Br, ChevronDown as ce, ChevronUp as Ar, ArrowLeftIcon as Ir, ChevronLeftIcon as Pr, ChevronRightIcon as Fr, ArrowRightIcon as jr, Filter as Xr, User as Gr, Link as $r, CircleHelp as Lr, Star as Hr, CircleCheckIcon as Yr, CircleXIcon as Ur, CircleHelpIcon as Kr, ArrowUpIcon as qr, ArrowDownIcon as Jr, ArrowUpDownIcon as Wr, PanelLeft as Zr, PanelRight as Qr, ScrollText as ta, ChevronLeft as ea, MenuIcon as na, Menu as ra, EllipsisVertical as aa, LoaderCircle as oa, Copy as sa } from "lucide-react";
=======
import { jsx as r, jsxs as l, Fragment as Le } from "react/jsx-runtime";
import u, { forwardRef as He, useState as P, createContext as Or, useContext as Mr, useCallback as Y, useRef as Q, useMemo as q, useEffect as dt, useLayoutEffect as fn, Fragment as En } from "react";
import { Check as Ct, CircleSlash as zr, ChevronRight as Ye, Circle as Ue, X as Ke, Search as Dn, ChevronsUpDown as qe, FilterIcon as Br, ChevronDown as de, ChevronUp as Ar, ArrowLeftIcon as Ir, ChevronLeftIcon as Pr, ChevronRightIcon as Fr, ArrowRightIcon as jr, Filter as Xr, User as Gr, Link as $r, CircleHelp as Lr, Star as Hr, CircleCheckIcon as Yr, CircleXIcon as Ur, CircleHelpIcon as Kr, ArrowUpIcon as qr, ArrowDownIcon as Jr, ArrowUpDownIcon as Wr, PanelLeft as Zr, PanelRight as Qr, ScrollText as ta, ChevronLeft as ea, MenuIcon as na, Menu as ra, EllipsisVertical as aa, LoaderCircle as oa, Copy as sa } from "lucide-react";
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
import { clsx as ia } from "clsx";
import { extendTailwindMerge as wa } from "tailwind-merge";
import { cva as _t } from "class-variance-authority";
import * as X from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as la } from "@radix-ui/react-dropdown-menu";
import { formatScrRef as Ot, MODIFIER_KEYS as bn, getChaptersForBook as da, NumberFormat as ca, formatBytes as pa, deepEqual as Je, isString as De, compareScrRefs as Ie, scrRefToBBBCCCVVV as Ve, getLocalizeKeyForScrollGroupId as I } from "platform-bible-utils";
import { Slot as $t } from "@radix-ui/react-slot";
import * as On from "@radix-ui/react-label";
import * as Zt from "@radix-ui/react-radio-group";
import * as Qt from "@radix-ui/react-popover";
import { Command as nt } from "cmdk";
<<<<<<< HEAD
import * as ht from "@radix-ui/react-dialog";
import { useReactTable as Mn, getFilteredRowModel as ua, getSortedRowModel as zn, getPaginationRowModel as ma, getCoreRowModel as Bn, flexRender as Jt, getGroupedRowModel as ha, getExpandedRowModel as fa } from "@tanstack/react-table";
import * as H from "@radix-ui/react-select";
=======
import * as mt from "@radix-ui/react-dialog";
import { useReactTable as On, getFilteredRowModel as ua, getSortedRowModel as Mn, getPaginationRowModel as ma, getCoreRowModel as zn, flexRender as Jt, getGroupedRowModel as ha, getExpandedRowModel as fa } from "@tanstack/react-table";
import * as $ from "@radix-ui/react-select";
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
import ga from "markdown-to-jsx";
import * as Pe from "@radix-ui/react-checkbox";
import * as pe from "@radix-ui/react-toggle-group";
import * as An from "@radix-ui/react-toggle";
import * as In from "@radix-ui/react-separator";
import * as ee from "@radix-ui/react-tooltip";
import * as rt from "@radix-ui/react-tabs";
import * as G from "@radix-ui/react-menubar";
import { useHotkeys as ba } from "react-hotkeys-hook";
import * as Lt from "@radix-ui/react-avatar";
import { Drawer as ct } from "vaul";
import * as Fe from "@radix-ui/react-progress";
import { Toaster as va } from "sonner";
import { toast as Ii } from "sonner";
import * as qt from "@radix-ui/react-slider";
import * as je from "@radix-ui/react-switch";
const xa = wa({ prefix: "tw-" });
function d(...t) {
  return xa(ia(t));
}
const Ht = u.forwardRef(
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
Ht.displayName = "Input";
const ya = de(
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: n,
    handleSubmit: a,
    className: o,
    hasTopMatch: s,
    hasNoMatches: i,
    hasInputChanged: w,
    ...c
  }, p) => {
    const [g, v] = P(!1);
    return /* @__PURE__ */ l("div", { className: "tw-relative tw-max-w-48", children: [
      /* @__PURE__ */ r(
        Ht,
        {
          ...c,
          type: "text",
          className: d(
            "tw-relative tw-w-full tw-min-w-0 tw-flex-shrink tw-grow tw-basis-32 tw-gap-2.5 tw-text-ellipsis tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 !tw-pe-10 tw-ps-4 tw-font-medium tw-text-foreground tw-shadow-none tw-outline-none",
            w && (s ? "focus-visible:tw-ring-green-600" : i && "focus-visible:tw-ring-destructive"),
            o
          ),
          onChange: (f) => t(f.target.value),
          onKeyDown: (f) => {
            f.key === "Enter" ? (a(), f.preventDefault()) : e(f);
          },
          onClick: n,
          onFocus: (f) => {
            var h;
            v(!0), (h = c.onFocus) == null || h.call(c, f);
          },
          onBlur: (f) => {
            var h;
            v(!1), (h = c.onBlur) == null || h.call(c, f);
          },
          ref: p
        }
      ),
      g && w && (s ? /* @__PURE__ */ r(Ct, { className: "tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-green-600" }) : i && /* @__PURE__ */ r(zr, { className: "tw-absolute tw-right-2 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-text-destructive" }))
    ] });
  }
), We = Or(void 0);
function pt() {
  const t = Mr(We);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ht = _t("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Na = "layoutDirection";
function W() {
  const t = localStorage.getItem(Na);
  return t === "rtl" ? t : "ltr";
}
<<<<<<< HEAD
const Ze = G.Trigger, Pn = G.Group, ka = G.Portal, Ca = G.Sub, qs = G.RadioGroup;
function ue({ variant: t = "default", ...e }) {
=======
const Ze = X.Trigger, In = X.Group, ka = X.Portal, Ca = X.Sub, Ks = X.RadioGroup;
function pe({ variant: t = "default", ...e }) {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  const n = u.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(We.Provider, { value: n, children: /* @__PURE__ */ r(X.Root, { ...e }) });
}
const Fn = u.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = pt();
  return /* @__PURE__ */ l(
    X.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ht({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(Ye, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
<<<<<<< HEAD
Fn.displayName = G.SubTrigger.displayName;
const jn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.SubContent,
=======
Pn.displayName = X.SubTrigger.displayName;
const Fn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.SubContent,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  {
    ref: n,
    className: d(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
jn.displayName = G.SubContent.displayName;
=======
Fn.displayName = X.SubContent.displayName;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
const ne = u.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
  const s = W();
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
<<<<<<< HEAD
ne.displayName = G.Content.displayName;
const me = u.forwardRef(({ className: t, inset: e, ...n }, a) => {
=======
ne.displayName = X.Content.displayName;
const ue = u.forwardRef(({ className: t, inset: e, ...n }, a) => {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  const o = W(), s = pt();
  return /* @__PURE__ */ r(
    X.Item,
    {
      ref: a,
      className: d(
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
<<<<<<< HEAD
me.displayName = G.Item.displayName;
=======
ue.displayName = X.Item.displayName;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
const Qe = u.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = pt();
  return /* @__PURE__ */ l(
    X.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ht({ variant: s.variant })
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
<<<<<<< HEAD
Qe.displayName = G.CheckboxItem.displayName;
const Xn = u.forwardRef(({ className: t, children: e, ...n }, a) => {
=======
Qe.displayName = X.CheckboxItem.displayName;
const jn = u.forwardRef(({ className: t, children: e, ...n }, a) => {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  const o = pt();
  return /* @__PURE__ */ l(
    X.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ht({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(Ue, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
<<<<<<< HEAD
Xn.displayName = G.RadioItem.displayName;
const he = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  G.Label,
=======
jn.displayName = X.RadioItem.displayName;
const me = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  X.Label,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
<<<<<<< HEAD
he.displayName = G.Label.displayName;
=======
me.displayName = X.Label.displayName;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
const Ft = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ft.displayName = X.Separator.displayName;
function _a({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: d("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
_a.displayName = "DropdownMenuShortcut";
var Sa = Object.defineProperty, Ta = (t, e, n) => e in t ? Sa(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, E = (t, e, n) => Ta(t, typeof e != "symbol" ? e + "" : e, n);
const Mt = [
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
], tn = [
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
], Gn = [
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
], vn = Ia();
function Yt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in vn ? vn[t] : 0;
}
function en(t) {
  return Yt(t) > 0;
}
function Ra(t) {
  const e = typeof t == "string" ? Yt(t) : t;
  return e >= 40 && e <= 66;
}
function Ea(t) {
  return (typeof t == "string" ? Yt(t) : t) <= 39;
}
function $n(t) {
  return t <= 66;
}
function Da(t) {
  const e = typeof t == "string" ? Yt(t) : t;
  return Yn(e) && !$n(e);
}
function* Va() {
  for (let t = 1; t <= Mt.length; t++) yield t;
}
const Oa = 1, Ln = Mt.length;
function Ma() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function nn(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Mt.length ? e : Mt[n];
}
function Hn(t) {
  return t <= 0 || t > Ln ? "******" : Gn[t - 1];
}
function za(t) {
  return Hn(Yt(t));
}
function Yn(t) {
  const e = typeof t == "number" ? nn(t) : t;
  return en(e) && !tn.includes(e);
}
function Ba(t) {
  const e = typeof t == "number" ? nn(t) : t;
  return en(e) && tn.includes(e);
}
function Aa(t) {
  return Gn[t - 1].includes("*obsolete*");
}
function Ia() {
  const t = {};
  for (let e = 0; e < Mt.length; e++)
    t[Mt[e]] = e + 1;
  return t;
}
const M = {
  allBookIds: Mt,
  nonCanonicalIds: tn,
  bookIdToNumber: Yt,
  isBookIdValid: en,
  isBookNT: Ra,
  isBookOT: Ea,
  isBookOTNT: $n,
  isBookDC: Da,
  allBookNumbers: Va,
  firstBook: Oa,
  lastBook: Ln,
  extraBooks: Ma,
  bookNumberToId: nn,
  bookNumberToEnglishName: Hn,
  bookIdToEnglishName: za,
  isCanonical: Yn,
  isExtraMaterial: Ba,
  isObsolete: Aa
};
var ut = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(ut || {});
const at = class {
  // private versInfo: Versification;
  constructor(e) {
    if (E(this, "name"), E(this, "fullPath"), E(this, "isPresent"), E(this, "hasVerseSegments"), E(this, "isCustomized"), E(this, "baseVersification"), E(this, "scriptureBooks"), E(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = ut[e]) : (this._type = e, this.name = ut[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
E(at, "Original", new at(ut.Original)), E(at, "Septuagint", new at(ut.Septuagint)), E(at, "Vulgate", new at(ut.Vulgate)), E(at, "English", new at(ut.English)), E(at, "RussianProtestant", new at(ut.RussianProtestant)), E(at, "RussianOrthodox", new at(ut.RussianOrthodox));
let Dt = at;
function xn(t, e) {
  const n = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(n);
  return t.split(n);
}
var Un = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Un || {});
const et = class O {
  constructor(e, n, a, o) {
    if (E(this, "firstChapter"), E(this, "lastChapter"), E(this, "lastVerse"), E(this, "hasSegmentsDefined"), E(this, "text"), E(this, "BBBCCCVVVS"), E(this, "longHashCode"), E(this, "versification"), E(this, "rtlMark", "‏"), E(this, "_bookNum", 0), E(this, "_chapterNum", 0), E(this, "_verseNum", 0), E(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
        const s = e, i = n != null && n instanceof Dt ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof Dt ? n : void 0;
        this.setEmpty(s), this._verseNum = e % O.chapterDigitShifter, this._chapterNum = Math.floor(
          e % O.bookDigitShifter / O.chapterDigitShifter
        ), this._bookNum = Math.floor(e / O.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof O) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof Dt ? e : O.defaultVersification;
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && a != null)
      if (typeof e == "string" && typeof n == "string" && typeof a == "string")
        this.setEmpty(o), this.updateInternal(e, n, a);
      else if (typeof e == "number" && typeof n == "number" && typeof a == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = a, this.versification = o ?? O.defaultVersification;
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
      return n = new O(e), { success: !0, verseRef: n };
    } catch (a) {
      if (a instanceof Ut)
        return n = new O(), { success: !1, verseRef: n };
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
    return e % O.bcvMaxValue * O.bookDigitShifter + (n >= 0 ? n % O.bcvMaxValue * O.chapterDigitShifter : 0) + (a >= 0 ? a % O.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: a, verseNum: o, verse: s, versificationStr: i } = e, w = s || o.toString();
    let c;
    return i && (c = new Dt(i)), n ? new O(n, a.toString(), w, c) : new O();
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
      if (n = n * 10 + +a - 0, n > O.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(O.verseRangeSeparator) || this._verse.includes(O.verseSequenceIndicator));
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
    const { success: n, vNum: a } = O.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = a, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = O.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > M.lastBook)
      throw new Ut(
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
    this.versification = this.versification != null ? new Dt(e) : void 0;
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
    return this.validateVerse(O.verseRangeSeparators, O.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return O.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Dt(ut[i]);
        } catch {
          throw new Ut("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new Ut("Invalid reference : " + e);
    const a = n[1].split(":"), o = +a[0];
    if (a.length !== 2 || M.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !O.isVerseParseable(a[1]))
      throw new Ut("Invalid reference : " + e);
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
    return new O(this);
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
    return e instanceof O ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = O.verseRangeSeparators, a = O.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], s = xn(this._verse, a);
    for (const i of s.map((w) => xn(w, n))) {
      const w = this.clone();
      w.verse = i[0];
      const c = w.verseNum;
      if (o.push(w), i.length > 1) {
        const p = this.clone();
        if (p.verse = i[1], !e)
          for (let g = c + 1; g < p.verseNum; g++) {
            const v = new O(
              this._bookNum,
              this._chapterNum,
              g,
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > M.lastBook ? 2 : (M.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = O.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, a) {
    this.bookNum = M.bookIdToNumber(e), this.chapter = n, this.verse = a;
  }
};
E(et, "defaultVersification", Dt.English), E(et, "verseRangeSeparator", "-"), E(et, "verseSequenceIndicator", ","), E(et, "verseRangeSeparators", [et.verseRangeSeparator]), E(et, "verseSequenceIndicators", [et.verseSequenceIndicator]), E(et, "chapterDigitShifter", 1e3), E(et, "bookDigitShifter", et.chapterDigitShifter * et.chapterDigitShifter), E(et, "bcvMaxValue", et.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
<<<<<<< HEAD
D(et, "ValidStatusType", Un);
=======
E(et, "ValidStatusType", Yn);
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
class Ut extends Error {
}
const Pa = de(
  ({
    bookId: t,
    handleSelectBook: e,
    shouldExpandChildren: n,
    handleHighlightBook: a,
    handleKeyDown: o,
    bookType: s,
    children: i
  }, w) => /* @__PURE__ */ l(
    me,
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
            children: M.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ r("div", { children: i })
      ]
    },
    t
  )
);
function Fa({
  handleSelectChapter: t,
  endChapter: e,
  selectedChapter: n,
  highlightedChapter: a,
  handleHighlightedChapter: o,
  matchingChapters: s
}) {
  const i = Array.from({ length: e }, (c, p) => p + 1), w = Y(
    (c) => {
      o(c);
    },
    [o]
  );
  return /* @__PURE__ */ r("div", { className: d("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: i.map((c) => /* @__PURE__ */ r(
    "div",
    {
      className: d(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": c === n,
          "tw-bg-amber-200": c === a,
          "tw-pointer-events-none tw-bg-accent tw-opacity-50": s && !s.includes(c)
        }
      ),
      onClick: (p) => {
        p.preventDefault(), p.stopPropagation(), t(c);
      },
      role: "button",
      onKeyDown: (p) => {
        p.key === "Enter" && t(c);
      },
      tabIndex: 0,
      onMouseMove: () => w(c),
      children: c
    },
    c
  )) });
}
const yn = 6, rn = M.allBookIds.filter((t) => !M.isObsolete(M.bookIdToNumber(t))), Kn = Object.fromEntries(
  rn.map((t) => [t, M.bookIdToEnglishName(t)])
), ja = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Xa = ["OT", "NT", "DC"], Ga = 96, Wt = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by space(s) and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i,
  // Same as BOOK_CHAPTER_VERSE, but extracts the book name/id from a reference
  EXTRACT_BOOK_FROM_REFERENCE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+\d+:\d+$/,
  // Same as BOOK_CHAPTER_VERSE, but extracts the book name/id and chapter number from a reference
  EXTRACT_BOOK_CHAPTER_FROM_REFERENCE: /^([^:\s]+(?:\s+[^:\s]+)*\s+\d+):\d+$/
}, Nn = [
  Wt.BOOK_ONLY,
  // Matches book name/id
  Wt.BOOK_CHAPTER,
  // Matches book name/id followed by a chapter number
  Wt.BOOK_CHAPTER_VERSE
  // Matches book name/id followed by a chapter and verse number
], kn = /* @__PURE__ */ new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter"
<<<<<<< HEAD
]), $a = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])', It = (t) => da(M.bookIdToNumber(t));
function Cn(t) {
=======
]), It = (t) => da(M.bookIdToNumber(t));
function kn(t) {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  const e = rn.find(
    (n) => Kn[n].toLowerCase() === t.toLowerCase()
  );
  if (e)
    return e;
}
function Js({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: a
}) {
  const o = W(), [s, i] = P(
    () => Ot(t, "English")
  ), [w, c] = P(""), [p, g] = P(t.book), [v, f] = P(t.chapterNum ?? 0), [h, C] = P(t.book), [T, N] = P(!1), [x, S] = P(T), [D, A] = P(!1), [z, ft] = P(), H = Q(void 0), y = Q(void 0), b = Q(void 0), B = Q(void 0), R = Y(
    (m) => {
      if (m.trim())
<<<<<<< HEAD
        return Nn.reduce(
          (E, N) => {
            if (E) return E;
            const j = N.exec(m);
            if (j) {
              const [F, ut = void 0, ae = void 0] = j.slice(1), st = Cn(F) ?? (M.isBookIdValid(F) ? F.toLocaleUpperCase() : void 0);
=======
        return yn.reduce(
          (V, _) => {
            if (V) return V;
            const U = _.exec(m);
            if (U) {
              const [j, Tt = void 0, ae = void 0] = U.slice(1), st = kn(j) ?? (M.isBookIdValid(j) ? j.toLocaleUpperCase() : void 0);
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
              if (st) {
                const wt = Tt ? parseInt(Tt, 10) : void 0;
                if (wt && wt > It(st)) return;
                const vt = ae ? parseInt(ae, 10) : void 0;
                return {
                  book: st,
                  chapterNum: wt,
                  verseNum: vt
                };
              }
            }
          },
          void 0
        );
    },
    []
  ), K = q(() => {
    if (!(!z || !z.chapterNum))
      return z.verseNum ? [z.chapterNum] : Array.from({ length: It(h) }, (m, V) => V + 1).filter(
        (m) => {
          var V;
          return (z == null ? void 0 : z.chapterNum) && m.toString().includes((V = z == null ? void 0 : z.chapterNum) == null ? void 0 : V.toString());
        }
      );
  }, [h, z]), it = q(() => {
    const m = R(s.trim());
    return m ? m.book !== t.book || (m.chapterNum ?? 0) !== t.chapterNum || (m.verseNum ?? 0) !== t.verseNum : !0;
  }, [s, t, R]), gt = q(
    () => !!z && it,
    [z, it]
  ), St = Y(
    (m) => {
      const V = a ? a() : rn;
      return {
<<<<<<< HEAD
        OT: E.filter((N) => M.isBookOT(N)),
        NT: E.filter((N) => M.isBookNT(N)),
        DC: E.filter((N) => M.isBookDC(N))
      }[m].filter((N) => {
        const j = Kn[N].toLowerCase(), F = w.length > 0 && /^\d/.test(w) ? (
=======
        OT: V.filter((_) => M.isBookOT(_)),
        NT: V.filter((_) => M.isBookNT(_)),
        DC: V.filter((_) => M.isBookDC(_))
      }[m].filter((_) => {
        const U = Un[_].toLowerCase(), j = w.length > 0 && /^\d/.test(w) ? (
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
          // consider edge case where the first character is a digit (e.g. "3JN")
          w.charAt(0) + w.slice(1).replace(/[^a-zA-Z]/g, "").toLowerCase()
        ) : w.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return gt ? U === j || // Match full book name
        _.toLowerCase() === j : U.includes(j) || // Match partial book name
        _.toLowerCase().includes(j);
      });
    },
    [a, gt, w]
    // Only recompute when relevant values change
  ), Z = q(
    () => Xa.map((m) => ({
      bookType: m,
      books: St(m)
    })).filter((m) => m.books.length > 0),
    [St]
  ), k = q(
    () => Z.reduce((m, V) => m + V.books.length, 0),
    [Z]
  ), L = Y(
    (m) => {
      i(m), c(m), ft(R(m.trim()));
    },
    [R]
  ), ot = Q(!1), tt = Y(() => {
    i(Ot(t, "English")), c(""), g(t.book), C(t.book);
  }, [t]), bt = Y((m) => {
    if (ot.current) {
      ot.current = !1;
      return;
    }
    N(m);
  }, []), At = Y(
    (m, V, _, U) => {
      if (f(t.book !== m ? 1 : t.chapterNum), V || It(m) === -1) {
        e({
          book: m,
          chapterNum: _ ?? 1,
          verseNum: U ?? 1
        }), N(!1), c("");
        return;
      }
      g(p !== m ? m : ""), N(!V);
    },
    [e, t.book, t.chapterNum, p]
  ), Tr = (m) => {
    m <= 0 || m > It(p) || At(p, !0, m);
<<<<<<< HEAD
  }, fn = U(() => {
    Nn.forEach((m) => {
      const E = m.exec(w);
      if (E) {
        const [N, j = void 0, F = void 0] = E.slice(1), ut = Cn(N);
        (M.isBookIdValid(N) || ut) && At(
          ut ?? N,
=======
  }, hn = Y(() => {
    yn.forEach((m) => {
      const V = m.exec(w);
      if (V) {
        const [_, U = void 0, j = void 0] = V.slice(1), Tt = kn(_);
        (M.isBookIdValid(_) || Tt) && At(
          Tt ?? _,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
          !0,
          U ? parseInt(U, 10) : 1,
          j ? parseInt(j, 10) : 1
        );
      }
    });
  }, [At, w]), Rr = Y(
    (m) => {
      if (!T)
        m.key !== "Tab" && m.key !== "Escape" && N(!0);
      else if (m.key === "Tab") {
        m.preventDefault(), m.stopPropagation();
        return;
      } else m.key === "ArrowDown" ? (B != null && B.current ? B.current.focus() : b != null && b.current ? b.current.focus() : y.current && y.current.focus(), m.preventDefault()) : m.key === "Escape" && document.activeElement === H.current && (N(!1), m.preventDefault(), m.stopPropagation());
      if (document.activeElement === H.current) {
        if (/^[a-zA-Z]$/.test(m.key) && (L(it ? w + m.key : m.key), A(!0), m.preventDefault()), /^\d$/.test(m.key)) {
          const V = s;
          if (D)
            L(w + m.key);
          else {
            const _ = V.match(
              Wt.EXTRACT_BOOK_FROM_REFERENCE
            );
            if (_) {
              const j = `${_[1]} ${m.key}`;
              L(j), A(!0);
            }
          }
          m.preventDefault();
        }
        if (!D && m.key === ":") {
          const _ = s.match(
            Wt.EXTRACT_BOOK_CHAPTER_FROM_REFERENCE
          );
          if (_) {
            const U = _[1], j = U.endsWith(":") ? `${U}` : `${U}:`;
            L(j), A(!0), m.preventDefault();
          }
        }
        bn.has(m.key) || A(!0);
      }
    },
    [
      T,
      D,
      L,
      it,
      w,
      s
    ]
<<<<<<< HEAD
  ), re = U((m) => {
    if (!bn.has(m.key)) {
      if (m.key === "Tab") {
        if (m.shiftKey)
          L.current.focus();
        else {
          const E = [
            ...document.querySelectorAll($a)
          ].filter(
            (j) => {
              var F, ut;
              return j instanceof HTMLElement && ((j.offsetWidth > 0 || j.offsetHeight > 0) && !((F = x.current) != null && F.contains(j)) && !((ut = L.current) != null && ut.contains(j)) || j === m.target);
            }
          ), N = m.target instanceof HTMLElement ? E.indexOf(m.target) : -1;
          N >= 0 ? E[(N + 1) % E.length].focus() : L.current.focus();
        }
        m.preventDefault(), m.stopPropagation();
        return;
      }
      m.stopPropagation(), L.current.focus(), L.current.dispatchEvent(new KeyboardEvent("keydown", { ...m, view: void 0 }));
    }
  }, []), Er = U(
    (m) => {
      const { key: E } = m;
      kn.has(E) || (re(m), m.preventDefault());
    },
    [re]
  ), Dr = U((m) => {
    const { key: E } = m;
    E === "ArrowUp" && (m.preventDefault(), L.current.focus());
  }, []), Vr = U(
    (m, E) => {
      const { key: N } = m;
      if (kn.has(N)) {
        if (h === p || C === 1) {
          const F = C === 1 ? h : p;
          if (N === "Enter") {
            m.preventDefault(), At(F, !0, v);
            return;
          }
          const ut = N === "ArrowRight" && !o || N === "ArrowRight" && o === "ltr" || N === "ArrowLeft" && o === "rtl", ae = N === "ArrowLeft" && !o || N === "ArrowLeft" && o === "ltr" || N === "ArrowRight" && o === "rtl", Re = Array.from(
            { length: It(h) },
            (oe, Rt) => Rt + 1
          ), st = p !== h || C === 1 ? K ?? Re : Re, wt = st.indexOf(v);
          let xt = v;
          if (ut)
=======
  ), re = Y((m) => {
    gn.has(m.key) || (m.key === "Tab" && m.shiftKey && (H.current.focus(), m.preventDefault()), m.stopPropagation(), H.current.focus(), H.current.dispatchEvent(new KeyboardEvent("keydown", { ...m, view: void 0 })));
  }, []), Er = Y(
    (m) => {
      const { key: V } = m;
      Nn.has(V) || (re(m), m.preventDefault());
    },
    [re]
  ), Dr = Y((m) => {
    const { key: V } = m;
    V === "ArrowUp" && (m.preventDefault(), H.current.focus());
  }, []), Vr = Y(
    (m, V) => {
      const { key: _ } = m;
      if (Nn.has(_)) {
        if (h === p || k === 1) {
          const j = k === 1 ? h : p;
          if (_ === "Enter") {
            m.preventDefault(), At(j, !0, v);
            return;
          }
          const Tt = _ === "ArrowRight" && !o || _ === "ArrowRight" && o === "ltr" || _ === "ArrowLeft" && o === "rtl", ae = _ === "ArrowLeft" && !o || _ === "ArrowLeft" && o === "ltr" || _ === "ArrowRight" && o === "rtl", Te = Array.from(
            { length: It(h) },
            (oe, Rt) => Rt + 1
          ), st = p !== h || k === 1 ? K ?? Te : Te, wt = st.indexOf(v);
          let vt = v;
          if (Tt)
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
            if (wt >= 0 && wt < st.length - 1)
              vt = st[wt + 1];
            else {
              m.preventDefault();
              return;
            }
          else if (ae)
            if (wt > 0)
              vt = st[wt - 1];
            else {
              m.preventDefault();
              return;
            }
<<<<<<< HEAD
          else if (N === "ArrowDown") {
            const oe = st[wt] + yn, Rt = st.find((Ee) => Ee >= oe);
            Rt !== void 0 && (xt = Rt);
          } else if (N === "ArrowUp") {
            const oe = st[wt] - yn, Rt = st.slice().reverse().find((Ee) => Ee <= oe);
            Rt !== void 0 && (xt = Rt);
=======
          else if (_ === "ArrowDown") {
            const oe = st[wt] + xn, Rt = st.find((Re) => Re >= oe);
            Rt !== void 0 && (vt = Rt);
          } else if (_ === "ArrowUp") {
            const oe = st[wt] - xn, Rt = st.slice().reverse().find((Re) => Re <= oe);
            Rt !== void 0 && (vt = Rt);
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
          }
          if (vt !== v) {
            f(vt), m.preventDefault();
            return;
          }
        }
        if (V === 0 && _ === "ArrowUp" && !gt) {
          m.preventDefault(), H.current.focus();
          return;
        }
        return;
      }
      re(m), m.preventDefault(), m.stopPropagation();
    },
    [
      o,
      h,
      v,
      gt,
      re,
      p,
      K,
      k,
      At
    ]
  );
  return dt(() => {
    k === 1 ? f(1) : p === h ? p === t.book ? f(t.chapterNum) : f(1) : f(0);
  }, [h, t.book, t.chapterNum, p, k]), dt(() => {
    if (!K || k > 1) return;
    K.indexOf(v) === -1 && f(K[0]);
  }, [h, v, p, K, k]), dt(() => {
    tt();
  }, [tt]), dt(() => {
  }, [T, tt]), gn(() => {
    S(T);
  }, [T]), gn(() => {
    const m = setTimeout(() => {
      var V, _;
      if (x && y.current && b.current) {
        const j = b.current.offsetTop - Ga;
        y.current.scrollTo({ top: j, behavior: "instant" }), H.current.focus();
      }
      !x && document.activeElement !== H.current && !((V = H.current) != null && V.contains(document.activeElement)) && document.activeElement !== y.current && !((_ = y.current) != null && _.contains(document.activeElement)) && tt();
    }, 10);
    return () => {
      clearTimeout(m);
    };
<<<<<<< HEAD
  }, [y, tt]), /* @__PURE__ */ l(ue, { modal: !1, open: T, onOpenChange: vt, children: [
=======
  }, [x, tt]), /* @__PURE__ */ l(pe, { modal: !1, open: T, onOpenChange: bt, children: [
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
    /* @__PURE__ */ r(Ze, { asChild: !0, children: /* @__PURE__ */ r(
      ya,
      {
        ref: H,
        value: s,
        handleSearch: L,
        handleKeyDown: Rr,
        handleOnClick: () => {
          g(t.book), C(t.book), f(t.chapterNum > 0 ? t.chapterNum : 0), H.current.focus();
        },
        onFocus: () => {
          ot.current = !0, A(!1), ft(R(s));
        },
        onBlur: () => {
          k === 0 && tt();
        },
        handleSubmit: fn,
        placeholder: Ot(t, "English"),
        className: n,
        hasTopMatch: !!z,
        hasNoMatches: k === 0,
        hasInputChanged: it
      }
    ) }),
    k > 0 && /* @__PURE__ */ r(
      ne,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        align: o === "ltr" ? "start" : "end",
        ref: y,
        onKeyDown: Er,
        children: /* @__PURE__ */ l("div", { className: "rtl:tw-ps-2", children: [
          !!z && it && /* @__PURE__ */ l(He, { children: [
            /* @__PURE__ */ r(
              me,
              {
                className: "tw-cursor-pointer tw-p-4 tw-font-semibold tw-text-foreground",
                onClick: fn,
                onKeyDown: (m) => Dr(m),
                "data-top-match": "true",
                ref: B,
                children: Ot({
                  book: z.book,
                  chapterNum: z.chapterNum ?? 1,
                  verseNum: z.verseNum ?? 1
                })
              }
            ),
            /* @__PURE__ */ r(Ft, {})
          ] }),
<<<<<<< HEAD
          Z.map((m, E) => /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ r(he, { className: "tw-font-semibold tw-text-foreground/80", children: ja[m.bookType] }),
            m.books.map((N, j) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
=======
          Z.map((m, V) => /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ r(me, { className: "tw-font-semibold tw-text-foreground/80", children: ja[m.bookType] }),
            m.books.map((_, U) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
              Pa,
              {
                bookId: _,
                handleSelectBook: () => At(_, !1),
                shouldExpandChildren: p.toLowerCase() === _.toLowerCase() || k === 1,
                handleHighlightBook: () => C(_),
                handleKeyDown: (j) => Vr(j, U),
                bookType: m.bookType,
                ref: (j) => {
                  p === _ && (b.current = j);
                },
                children: /* @__PURE__ */ r(
                  Fa,
                  {
                    handleSelectChapter: Tr,
                    endChapter: It(_),
                    selectedChapter: p === t.book ? t.chapterNum : 0,
                    highlightedChapter: p === h || k === 1 ? v : 0,
                    handleHighlightedChapter: (j) => {
                      f(j);
                    },
                    matchingChapters: it ? K : void 0
                  }
                )
              }
            ) }, _)),
            V < Z.length - 1 && /* @__PURE__ */ r(Ft, {})
          ] }, m.bookType))
        ] })
      }
    )
  ] });
}
const $a = _t(
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
), F = u.forwardRef(
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, s) => /* @__PURE__ */ r(a ? $t : "button", { className: d($a({ variant: e, size: n, className: t })), ref: s, ...o })
);
F.displayName = "Button";
const La = _t(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
<<<<<<< HEAD
), J = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(On.Root, { ref: n, className: d("pr-twp", Ha(), t), ...e }));
J.displayName = On.Root.displayName;
=======
), J = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Vn.Root, { ref: n, className: d("pr-twp", La(), t), ...e }));
J.displayName = Vn.Root.displayName;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
const an = u.forwardRef(({ className: t, ...e }, n) => {
  const a = W();
  return /* @__PURE__ */ r(
    Zt.Root,
    {
      className: d("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: a
    }
  );
});
an.displayName = Zt.Root.displayName;
const ie = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Zt.Item,
  {
    ref: n,
    className: d(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(Zt.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Ue, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
ie.displayName = Zt.Item.displayName;
const on = Qt.Root, sn = Qt.Trigger, fe = u.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const s = W();
  return /* @__PURE__ */ r(Qt.Portal, { children: /* @__PURE__ */ r(
    Qt.Content,
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
<<<<<<< HEAD
fe.displayName = Qt.Content.displayName;
const Ya = ht.Portal, qn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ht.Overlay,
=======
he.displayName = Qt.Content.displayName;
const Ha = mt.Portal, Kn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Overlay,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  {
    ref: n,
    className: d(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
qn.displayName = ht.Overlay.displayName;
const Ua = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = W();
  return /* @__PURE__ */ l(Ya, { children: [
    /* @__PURE__ */ r(qn, {}),
=======
Kn.displayName = mt.Overlay.displayName;
const Ya = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = W();
  return /* @__PURE__ */ l(Ha, { children: [
    /* @__PURE__ */ r(Kn, {}),
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
    /* @__PURE__ */ l(
      mt.Content,
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
            mt.Close,
            {
              className: d(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Ya.displayName = mt.Content.displayName;
const Ua = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Ua.displayName = mt.Title.displayName;
const Ka = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  mt.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
qa.displayName = ht.Description.displayName;
const ge = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Ka.displayName = mt.Description.displayName;
const fe = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  nt,
  {
    ref: n,
    className: d(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ge.displayName = nt.displayName;
const be = u.forwardRef(({ className: t, ...e }, n) => {
  const a = W();
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(Vn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      nt.Input,
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
be.displayName = nt.Input.displayName;
const ve = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.List,
  {
    ref: n,
    className: d("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ve.displayName = nt.List.displayName;
const xe = u.forwardRef((t, e) => /* @__PURE__ */ r(nt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
xe.displayName = nt.Empty.displayName;
const wn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.Group,
  {
    ref: n,
    className: d(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
wn.displayName = nt.Group.displayName;
const Jn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Jn.displayName = nt.Separator.displayName;
const ye = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  nt.Item,
  {
    ref: n,
    className: d(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
ye.displayName = nt.Item.displayName;
function Ja(t) {
=======
xe.displayName = nt.Item.displayName;
function qa(t) {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Xe({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: a,
  popoverContentClassName: o,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: w = qa,
  icon: c = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: g = "",
  commandEmptyMessage: v = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: h = "start",
  isDisabled: C = !1,
  ...T
}) {
  const [N, x] = P(!1);
  return /* @__PURE__ */ l(on, { open: N, onOpenChange: x, ...T, children: [
    /* @__PURE__ */ r(sn, { asChild: !0, children: /* @__PURE__ */ l(
      F,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": N,
        id: t,
        className: d(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? n
        ),
        disabled: C,
        children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ r("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? w(s) : p })
          ] }),
          /* @__PURE__ */ r(qe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      fe,
      {
        align: h,
        className: d("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ l(ge, { children: [
          /* @__PURE__ */ r(be, { placeholder: g, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(xe, { children: v }),
          /* @__PURE__ */ r(ve, { children: e.map((S) => /* @__PURE__ */ l(
            ye,
            {
              value: w(S),
              onSelect: () => {
                i(S), x(!1);
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
function Ja({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: s
}) {
  const i = q(
    () => Array.from({ length: s }, (p, g) => g + 1),
    [s]
  );
  return /* @__PURE__ */ l(He, { children: [
    /* @__PURE__ */ r(J, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Xe,
      {
        isDisabled: o,
        onChange: (p) => {
          n(p), p > e && a(p);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (p) => p.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(J, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      Xe,
      {
        isDisabled: o,
        onChange: (p) => {
          a(p), p < t && n(p);
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
var Wa = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Wa || {});
const Ws = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
<<<<<<< HEAD
]), Oe = (t, e) => t[e] ?? e;
function Qs({
=======
]), Ve = (t, e) => t[e] ?? e;
function Zs({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: w,
  handleSelectStartChapter: c,
  localizedStrings: p
}) {
<<<<<<< HEAD
  const g = Oe(p, "%webView_bookSelector_currentBook%"), v = Oe(p, "%webView_bookSelector_choose%"), f = Oe(p, "%webView_bookSelector_chooseBooks%"), [h, _] = P(
=======
  const g = Ve(p, "%webView_bookSelector_currentBook%"), v = Ve(p, "%webView_bookSelector_choose%"), f = Ve(p, "%webView_bookSelector_chooseBooks%"), [h, C] = P(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
    "current book"
    /* CURRENT_BOOK */
  ), T = (N) => {
    C(N), t(N);
  };
  return /* @__PURE__ */ r(
    an,
    {
      className: "pr-twp tw-flex",
      value: h,
      onValueChange: (N) => T(N),
      children: /* @__PURE__ */ l("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(ie, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(J, { className: "tw-ms-1", children: g })
          ] }),
          /* @__PURE__ */ r(J, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Ja,
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
            /* @__PURE__ */ r(ie, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(J, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(J, { className: "tw-flex tw-items-center", children: a.map((N) => M.bookIdToEnglishName(N)).join(", ") }),
          /* @__PURE__ */ r(
            F,
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
<<<<<<< HEAD
function Qa({ table: t }) {
  return /* @__PURE__ */ l(ue, { children: [
    /* @__PURE__ */ r(la, { asChild: !0, children: /* @__PURE__ */ l(X, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
=======
function Za({ table: t }) {
  return /* @__PURE__ */ l(pe, { children: [
    /* @__PURE__ */ r(la, { asChild: !0, children: /* @__PURE__ */ l(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
      /* @__PURE__ */ r(Br, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ l(ne, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(he, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Ft, {}),
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
const jt = $.Root, Qa = $.Group, Xt = $.Value, to = _t(
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
), zt = u.forwardRef(({ className: t, children: e, size: n, ...a }, o) => {
  const s = W();
  return /* @__PURE__ */ l(
    $.Trigger,
    {
      className: d(to({ size: n, className: t })),
      ref: o,
      ...a,
      dir: s,
      children: [
        e,
<<<<<<< HEAD
        /* @__PURE__ */ r(H.Icon, { asChild: !0, children: /* @__PURE__ */ r(ce, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
=======
        /* @__PURE__ */ r($.Icon, { asChild: !0, children: /* @__PURE__ */ r(de, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
      ]
    }
  );
});
<<<<<<< HEAD
zt.displayName = H.Trigger.displayName;
const Wn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  H.ScrollUpButton,
=======
zt.displayName = $.Trigger.displayName;
const Jn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $.ScrollUpButton,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ar, { className: "tw-h-4 tw-w-4" })
  }
));
<<<<<<< HEAD
Wn.displayName = H.ScrollUpButton.displayName;
const Zn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  H.ScrollDownButton,
=======
Jn.displayName = $.ScrollUpButton.displayName;
const Wn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $.ScrollDownButton,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  {
    ref: n,
    className: d("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(ce, { className: "tw-h-4 tw-w-4" })
  }
));
<<<<<<< HEAD
Zn.displayName = H.ScrollDownButton.displayName;
=======
Wn.displayName = $.ScrollDownButton.displayName;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
const Bt = u.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const s = W();
  return /* @__PURE__ */ r($.Portal, { children: /* @__PURE__ */ l(
    $.Content,
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
        /* @__PURE__ */ r(Wn, {}),
        /* @__PURE__ */ r(
          $.Viewport,
          {
            className: d(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(Zn, {})
      ]
    }
  ) });
});
Bt.displayName = $.Content.displayName;
const eo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $.Label,
  {
    ref: n,
    className: d("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
eo.displayName = $.Label.displayName;
const lt = u.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ l(
  $.Item,
  {
    ref: a,
    className: d(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r($.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r($.ItemText, { children: e })
    ]
  }
));
lt.displayName = $.Item.displayName;
const no = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
no.displayName = $.Separator.displayName;
function ro({ table: t }) {
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
        jt,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(zt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Xt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Bt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(lt, { value: `${e}`, children: e }, e)) })
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
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Ir, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Pr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Fr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ l(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(jr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Ne = u.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r("div", { className: d("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ r(
  "table",
  {
    ref: a,
    className: d("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
Ne.displayName = "Table";
const ke = u.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
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
<<<<<<< HEAD
ke.displayName = "TableHeader";
const Ce = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
Ce.displayName = "TableBody";
const oo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Ne.displayName = "TableHeader";
const ke = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
ke.displayName = "TableBody";
const ao = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  "tfoot",
  {
    ref: n,
    className: d("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
ao.displayName = "TableFooter";
const kt = u.forwardRef(
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
kt.displayName = "TableRow";
const te = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
te.displayName = "TableHead";
const Gt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: d("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Gt.displayName = "TableCell";
const oo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: d("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
oo.displayName = "TableCaption";
function so({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  }
}) {
<<<<<<< HEAD
  var k;
  const [w, c] = P([]), [p, g] = P([]), [v, f] = P({}), [h, _] = P({}), T = Mn({
=======
  var N;
  const [w, c] = P([]), [p, g] = P([]), [v, f] = P({}), [h, C] = P({}), T = On({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
    data: e,
    columns: t,
    getCoreRowModel: Bn(),
    ...n && { getPaginationRowModel: ma() },
    onSortingChange: c,
    getSortedRowModel: zn(),
    onColumnFiltersChange: g,
    getFilteredRowModel: ua(),
    onColumnVisibilityChange: f,
    onRowSelectionChange: C,
    state: {
      sorting: w,
      columnFilters: p,
      columnVisibility: v,
      rowSelection: h
    }
  });
  return /* @__PURE__ */ l("div", { className: "pr-twp", children: [
<<<<<<< HEAD
    o && /* @__PURE__ */ r(Qa, { table: T }),
    /* @__PURE__ */ l(Ne, { stickyHeader: s, children: [
      /* @__PURE__ */ r(ke, { stickyHeader: s, children: T.getHeaderGroups().map((y) => /* @__PURE__ */ r(Ct, { children: y.headers.map((S) => /* @__PURE__ */ r(te, { children: S.isPlaceholder ? void 0 : Jt(S.column.columnDef.header, S.getContext()) }, S.id)) }, y.id)) }),
      /* @__PURE__ */ r(Ce, { children: (k = T.getRowModel().rows) != null && k.length ? T.getRowModel().rows.map((y) => /* @__PURE__ */ r(
        Ct,
=======
    o && /* @__PURE__ */ r(Za, { table: T }),
    /* @__PURE__ */ l(ye, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Ne, { stickyHeader: s, children: T.getHeaderGroups().map((x) => /* @__PURE__ */ r(kt, { children: x.headers.map((S) => /* @__PURE__ */ r(te, { children: S.isPlaceholder ? void 0 : Jt(S.column.columnDef.header, S.getContext()) }, S.id)) }, x.id)) }),
      /* @__PURE__ */ r(ke, { children: (N = T.getRowModel().rows) != null && N.length ? T.getRowModel().rows.map((x) => /* @__PURE__ */ r(
        kt,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
        {
          onClick: () => i(x, T),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map((S) => /* @__PURE__ */ r(Gt, { children: Jt(S.column.columnDef.cell, S.getContext()) }, S.id))
        },
        x.id
      )) : /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r(Gt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.previousPage(),
          disabled: !T.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.nextPage(),
          disabled: !T.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && a && /* @__PURE__ */ r(ro, { table: T })
  ] });
}
function Qs({ id: t, markdown: e, className: n, anchorTarget: a }) {
  const o = q(
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
  return /* @__PURE__ */ r("div", { id: t, className: d("pr-twp tw-prose", n), children: /* @__PURE__ */ r(ga, { options: o, children: e }) });
}
<<<<<<< HEAD
var wo = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(wo || {});
function ei({ id: t, label: e, groups: n }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(ue, { children: [
    /* @__PURE__ */ r(Ze, { asChild: !0, children: /* @__PURE__ */ l(X, { variant: "default", children: [
=======
var io = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(io || {});
function ti({ id: t, label: e, groups: n }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(pe, { children: [
    /* @__PURE__ */ r(Ze, { asChild: !0, children: /* @__PURE__ */ l(F, { variant: "default", children: [
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
      /* @__PURE__ */ r(Xr, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(ce, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(ne, { children: n.map((a) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r(he, { children: a.label }),
      /* @__PURE__ */ r(Pn, { children: a.items.map((o) => /* @__PURE__ */ r("div", { children: o.itemType === 0 ? /* @__PURE__ */ r(Qe, { onClick: o.onClick, children: o.label }) : /* @__PURE__ */ r(Xn, { onClick: o.onClick, value: o.label, children: o.label }) }, o.label)) }),
      /* @__PURE__ */ r(Ft, {})
    ] }, a.label)) })
  ] }) });
}
function ei({ id: t, category: e, downloads: n, languages: a, moreInfoUrl: o }) {
  const s = new ca("en", {
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
            /* @__PURE__ */ r(Gr, { className: "tw-h-4 tw-w-4" }),
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
            /* @__PURE__ */ r($r, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Lr, { className: "tw-h-4 tw-w-4" })
          ] })
        ] })
      ]
    }
  );
}
function wo({ id: t, versionHistory: e }) {
  const [n, a] = P(!1), o = /* @__PURE__ */ new Date();
  function s(w) {
    const c = new Date(w), p = new Date(o.getTime() - c.getTime()), g = p.getUTCFullYear() - 1970, v = p.getUTCMonth(), f = p.getUTCDate() - 1;
    let h = "";
    return g > 0 ? h = `${g.toString()} year${g === 1 ? "" : "s"} ago` : v > 0 ? h = `${v.toString()} month${v === 1 ? "" : "s"} ago` : f === 0 ? h = "today" : h = `${f.toString()} day${f === 1 ? "" : "s"} ago`, h;
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
function ni({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: a,
  versionHistory: o
}) {
  const s = q(() => pa(n), [n]), w = ((c) => {
    const p = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((g) => p.of(g));
  })(a);
  return /* @__PURE__ */ r("div", { id: t, className: "tw-border-t tw-py-2", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    /* @__PURE__ */ r(wo, { versionHistory: o }),
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
const lo = _t(
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
), we = u.forwardRef(
  ({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, className: d("pr-twp", lo({ variant: e }), t), ...n })
);
we.displayName = "Badge";
function co({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s = "No entries found",
  customSelectedText: i,
  isDisabled: w = !1,
  sortSelected: c = !1,
  icon: p = void 0,
  className: g = void 0
}) {
  const [v, f] = P(!1), h = Y(
    (N) => {
      var S;
      const x = (S = t.find((D) => D.label === N)) == null ? void 0 : S.value;
      x && a(
        n.includes(x) ? n.filter((D) => D !== x) : [...n, x]
      );
    },
    [t, n, a]
  ), C = () => i || o, T = q(() => {
    if (!c) return t;
    const N = t.filter((S) => S.starred).sort((S, D) => S.label.localeCompare(D.label)), x = t.filter((S) => !S.starred).sort((S, D) => {
      const A = n.includes(S.value), z = n.includes(D.value);
      return A && !z ? -1 : !A && z ? 1 : S.label.localeCompare(D.label);
    });
    return [...N, ...x];
  }, [t, n, c]);
  return /* @__PURE__ */ r("div", { className: g, children: /* @__PURE__ */ l(on, { open: v, onOpenChange: f, children: [
    /* @__PURE__ */ r(sn, { asChild: !0, children: /* @__PURE__ */ l(
      F,
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
            /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: p }) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: d({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ r("div", { className: "tw-font-normal", children: C() })
              }
            )
          ] }),
          /* @__PURE__ */ r(qe, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
<<<<<<< HEAD
    /* @__PURE__ */ r(fe, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(ge, { children: [
      /* @__PURE__ */ r(be, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ l(ve, { children: [
        /* @__PURE__ */ r(xe, { children: s }),
        /* @__PURE__ */ r(wn, { children: T.map((k) => {
          const y = e ? e(k) : void 0;
=======
    /* @__PURE__ */ r(he, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(fe, { children: [
      /* @__PURE__ */ r(ge, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ l(be, { children: [
        /* @__PURE__ */ r(ve, { children: s }),
        /* @__PURE__ */ r(wn, { children: T.map((N) => {
          const x = e ? e(N) : void 0;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
          return /* @__PURE__ */ l(
            ye,
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
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: N.starred && /* @__PURE__ */ r(Hr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: N.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: x })
              ]
            },
            N.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function ri({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s,
  customSelectedText: i,
  isDisabled: w,
  sortSelected: c,
  icon: p,
  className: g,
  badgesPlaceholder: v
}) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      co,
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
        icon: p,
        className: g
      }
    ),
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((f) => {
      var h;
      return /* @__PURE__ */ l(we, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(n.filter((C) => C !== f)),
            children: /* @__PURE__ */ r(Ke, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (h = t.find((C) => C.value === f)) == null ? void 0 : h.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(J, { children: v })
  ] });
}
function po({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], s = q(() => {
    const i = [];
    return t.forEach((w) => {
      i.some((c) => Je(c, w)) || i.push(w);
    }), i;
  }, [t]);
<<<<<<< HEAD
  return /* @__PURE__ */ l(Ne, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(ke, { stickyHeader: !0, children: /* @__PURE__ */ l(Ct, { children: [
      /* @__PURE__ */ r(te, { children: a }),
      /* @__PURE__ */ r(te, { children: o })
    ] }) }),
    /* @__PURE__ */ r(Ce, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ l(
      Ct,
=======
  return /* @__PURE__ */ l(ye, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Ne, { stickyHeader: !0, children: /* @__PURE__ */ l(kt, { children: [
      /* @__PURE__ */ r(te, { children: a }),
      /* @__PURE__ */ r(te, { children: o })
    ] }) }),
    /* @__PURE__ */ r(ke, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ l(
      kt,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ r(Gt, { children: `${M.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r(Gt, { children: i.text })
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const ln = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
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
        children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
<<<<<<< HEAD
ln.displayName = Pe.Root.displayName;
const Qn = St(
=======
ln.displayName = Ie.Root.displayName;
const Zn = _t(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
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
<<<<<<< HEAD
), mo = u.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  An.Root,
=======
), uo = u.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  Bn.Root,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  {
    ref: o,
    className: d(Qn({ variant: e, size: n, className: t })),
    ...a
  }
));
<<<<<<< HEAD
mo.displayName = An.Root.displayName;
const tr = u.createContext({
=======
uo.displayName = Bn.Root.displayName;
const Qn = u.createContext({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  size: "default",
  variant: "default"
}), er = u.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, s) => {
  const i = W();
  return /* @__PURE__ */ r(
    pe.Root,
    {
      ref: s,
      className: d("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: i,
      children: /* @__PURE__ */ r(
        tr.Provider,
        {
          value: { variant: e, size: n },
          children: a
        }
      )
    }
  );
});
er.displayName = pe.Root.displayName;
const se = u.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, s) => {
  const i = u.useContext(tr);
  return /* @__PURE__ */ r(
    pe.Item,
    {
      ref: s,
      className: d(
        Qn({
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
<<<<<<< HEAD
se.displayName = pe.Item.displayName;
const _e = (t) => t === "asc" ? /* @__PURE__ */ r(qr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(Jr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Wr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), oi = (t) => ({
=======
se.displayName = ce.Item.displayName;
const Ce = (t) => t === "asc" ? /* @__PURE__ */ r(qr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(Jr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Wr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), ai = (t) => ({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ l(F, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    _e(e.getIsSorted())
  ] })
}), mo = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ l(F, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    _e(n.getIsSorted())
  ] })
}), oi = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ l(F, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    _e(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Me = (t, e, n, a, o, s) => {
  let i = [...n];
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((p) => p !== c);
  }), a(i);
  let w = [...o];
  t.forEach((c) => {
    e === "unapproved" ? w.includes(c) || w.push(c) : w = w.filter((p) => p !== c);
  }), s(w);
}, si = (t, e, n, a, o) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ l(F, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    _e(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), w = s.getValue("item");
    return /* @__PURE__ */ l(er, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        se,
        {
          onClick: (c) => {
            c.stopPropagation(), Me(
              [w],
              "approved",
              e,
              n,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(Yr, {})
        }
      ),
      /* @__PURE__ */ r(
        se,
        {
          onClick: (c) => {
            c.stopPropagation(), Me(
              [w],
              "unapproved",
              e,
              n,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(Ur, {})
        }
      ),
      /* @__PURE__ */ r(
        se,
        {
          onClick: (c) => {
            c.stopPropagation(), Me(
              [w],
              "unknown",
              e,
              n,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(Kr, {})
        }
      )
    ] });
  }
}), ii = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), wi = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, li = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, ho = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", di = Object.freeze([
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
]), fo = (t, e, n) => {
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (a = a.filter((o) => o.items[0].includes(n))), a;
}, go = (t, e, n) => {
  const a = [];
  return t.forEach((o) => {
    const s = a.find(
      (i) => Je(
        i.items,
        De(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const i = {
        items: De(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
<<<<<<< HEAD
        status: fo(
          De(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
=======
        status: ho(
          Ee(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
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
}, xt = (t, e) => t[e] ?? e;
function ci({
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
  const p = xt(n, "%webView_inventory_all%"), g = xt(n, "%webView_inventory_approved%"), v = xt(n, "%webView_inventory_unapproved%"), f = xt(n, "%webView_inventory_unknown%"), h = xt(n, "%webView_inventory_scope_currentBook%"), C = xt(n, "%webView_inventory_scope_chapter%"), T = xt(n, "%webView_inventory_filter_text%"), N = xt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [x, S] = P(!1), [D, A] = P("all"), [z, ft] = P(""), [H, y] = P([]), b = q(() => t.length === 0 ? [] : go(t, o, s), [t, o, s]), B = q(() => {
    if (x) return b;
    const k = [];
    return b.forEach((L) => {
      const ot = L.items[0], tt = k.find(
        (bt) => bt.items[0] === ot
      );
      tt ? (tt.count += L.count, tt.occurrences = tt.occurrences.concat(L.occurrences)) : k.push({
        items: [ot],
        count: L.count,
        occurrences: L.occurrences,
        status: L.status
      });
    }), k;
  }, [x, b]), R = q(() => fo(B, D, z), [B, D, z]), K = q(() => {
    var ot, tt;
    if (!x) return c;
    const k = (ot = a == null ? void 0 : a.tableHeaders) == null ? void 0 : ot.length;
    if (!k) return c;
    const L = [];
    for (let bt = 0; bt < k; bt++)
      L.push(
        mo(
          ((tt = a == null ? void 0 : a.tableHeaders) == null ? void 0 : tt[bt]) || "Additional Item",
          bt + 1
        )
      );
    return [...L, ...c];
  }, [a == null ? void 0 : a.tableHeaders, c, x]);
  dt(() => {
    R.length === 0 ? y([]) : R.length === 1 && y(R[0].items);
  }, [R]);
  const it = (k, L) => {
    L.setRowSelection(() => {
      const ot = {};
      return ot[k.index] = !0, ot;
    }), y(k.original.items);
  }, gt = (k) => {
    if (k === "book" || k === "chapter")
      w(k);
    else
      throw new Error(`Invalid scope value: ${k}`);
  }, St = (k) => {
    if (k === "all" || k === "approved" || k === "unapproved" || k === "unknown")
      A(k);
    else
      throw new Error(`Invalid status filter value: ${k}`);
  }, Z = q(() => {
    if (B.length === 0 || H.length === 0) return [];
    const k = B.filter((L) => Je(
      x ? L.items : [L.items[0]],
      H
    ));
    if (k.length > 1) throw new Error("Selected item is not unique");
    return k.length === 0 ? [] : k[0].occurrences;
  }, [H, x, B]);
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ l(
        jt,
        {
          onValueChange: (k) => St(k),
          defaultValue: D,
          children: [
            /* @__PURE__ */ r(zt, { className: "tw-m-1", children: /* @__PURE__ */ r(Xt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ l(Bt, { children: [
              /* @__PURE__ */ r(lt, { value: "all", children: p }),
              /* @__PURE__ */ r(lt, { value: "approved", children: g }),
              /* @__PURE__ */ r(lt, { value: "unapproved", children: v }),
              /* @__PURE__ */ r(lt, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ l(jt, { onValueChange: (k) => gt(k), defaultValue: i, children: [
        /* @__PURE__ */ r(zt, { className: "tw-m-1", children: /* @__PURE__ */ r(Xt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ l(Bt, { children: [
          /* @__PURE__ */ r(lt, { value: "book", children: h }),
          /* @__PURE__ */ r(lt, { value: "chapter", children: C })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ht,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: T,
          value: z,
          onChange: (k) => {
            ft(k.target.value);
          }
        }
      ),
      a && /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          ln,
          {
            className: "tw-m-1",
            checked: x,
            onCheckedChange: (k) => {
              S(k);
            }
          }
        ),
        /* @__PURE__ */ r(J, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? N })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      so,
      {
        columns: K,
        data: R,
        onRowClickHandler: it,
        stickyHeader: !0
      }
    ) }),
    Z.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      po,
      {
        occurrenceData: Z,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const dn = u.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  In.Root,
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
dn.displayName = In.Root.displayName;
function _n({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const cn = ee.Provider, pn = ee.Root, un = ee.Trigger, Se = u.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  ee.Content,
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
<<<<<<< HEAD
Se.displayName = ee.Content.displayName;
const vo = "16rem", xo = "3rem", nr = u.createContext(void 0);
function Te() {
  const t = u.useContext(nr);
=======
_e.displayName = ee.Content.displayName;
const bo = "16rem", vo = "3rem", er = u.createContext(void 0);
function Se() {
  const t = u.useContext(er);
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const rr = u.forwardRef(
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
    const [p, g] = u.useState(t), v = e ?? p, f = u.useCallback(
      (D) => {
        const A = typeof D == "function" ? D(v) : D;
        n ? n(A) : g(A);
      },
      [n, v]
    ), h = u.useCallback(() => f((D) => !D), [f]), C = v ? "expanded" : "collapsed", x = W() === "ltr" ? i : i === "primary" ? "secondary" : "primary", S = u.useMemo(
      () => ({
        state: C,
        open: v,
        setOpen: f,
        toggleSidebar: h,
        side: x
      }),
      [C, v, f, h, x]
    );
    return /* @__PURE__ */ r(nr.Provider, { value: S, children: /* @__PURE__ */ r(cn, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": bo,
            "--sidebar-width-icon": vo,
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
rr.displayName = "SidebarProvider";
const ar = u.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, s) => {
  const i = Te();
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
<<<<<<< HEAD
ar.displayName = "Sidebar";
const yo = u.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = Te();
=======
rr.displayName = "Sidebar";
const xo = u.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = Se();
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  return /* @__PURE__ */ l(
    F,
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
        o.side === "primary" ? /* @__PURE__ */ r(Zr, {}) : /* @__PURE__ */ r(Qr, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
xo.displayName = "SidebarTrigger";
const yo = u.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: a } = Te();
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
<<<<<<< HEAD
No.displayName = "SidebarRail";
const or = u.forwardRef(
=======
yo.displayName = "SidebarRail";
const ar = u.forwardRef(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
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
<<<<<<< HEAD
or.displayName = "SidebarInset";
const ko = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
ar.displayName = "SidebarInset";
const No = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  Ht,
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
No.displayName = "SidebarInput";
const ko = u.forwardRef(
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
ko.displayName = "SidebarHeader";
const Co = u.forwardRef(
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
Co.displayName = "SidebarFooter";
const _o = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dn,
  {
    ref: n,
    "data-sidebar": "separator",
    className: d("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
<<<<<<< HEAD
So.displayName = "SidebarSeparator";
const sr = u.forwardRef(
=======
_o.displayName = "SidebarSeparator";
const or = u.forwardRef(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
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
sr.displayName = "SidebarContent";
const Ge = u.forwardRef(
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
Ge.displayName = "SidebarGroup";
const $e = u.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? $t : "div",
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
<<<<<<< HEAD
$e.displayName = "SidebarGroupLabel";
const To = u.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
=======
Ge.displayName = "SidebarGroupLabel";
const So = u.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  e ? $t : "button",
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
<<<<<<< HEAD
To.displayName = "SidebarGroupAction";
const Le = u.forwardRef(
=======
So.displayName = "SidebarGroupAction";
const $e = u.forwardRef(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
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
const ir = u.forwardRef(
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
ir.displayName = "SidebarMenu";
const wr = u.forwardRef(
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
<<<<<<< HEAD
wr.displayName = "SidebarMenuItem";
const Ro = St(
=======
ir.displayName = "SidebarMenuItem";
const To = _t(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
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
), lr = u.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: a = "default",
    tooltip: o,
    className: s,
    ...i
  }, w) => {
    const c = t ? $t : "button", { state: p } = Te(), g = /* @__PURE__ */ r(
      c,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: d(To({ variant: n, size: a }), s),
        ...i
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ l(pn, { children: [
      /* @__PURE__ */ r(un, { asChild: !0, children: g }),
      /* @__PURE__ */ r(Se, { side: "right", align: "center", hidden: p !== "collapsed", ...o })
    ] })) : g;
  }
);
<<<<<<< HEAD
lr.displayName = "SidebarMenuButton";
const Eo = u.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
=======
wr.displayName = "SidebarMenuButton";
const Ro = u.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  e ? $t : "button",
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
Ro.displayName = "SidebarMenuAction";
const Eo = u.forwardRef(
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
Eo.displayName = "SidebarMenuBadge";
const Do = u.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
  const o = u.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ l(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: d("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(_n, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          _n,
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
Do.displayName = "SidebarMenuSkeleton";
const Vo = u.forwardRef(
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
Vo.displayName = "SidebarMenuSub";
const Oo = u.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Oo.displayName = "SidebarMenuSubItem";
const Mo = u.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: a, ...o }, s) => /* @__PURE__ */ r(
  t ? $t : "a",
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
Mo.displayName = "SidebarMenuSubButton";
function zo({
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
  const p = Y(
    (f, h) => {
      a(f, h);
    },
    [a]
  ), g = Y(
    (f) => {
      const h = n.find((C) => C.projectId === f);
      return h ? h.projectName : f;
    },
    [n]
  ), v = Y(
    (f) => !o.projectId && f === o.label,
    [o]
  );
  return /* @__PURE__ */ r(
    ar,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ l(sr, { children: [
        /* @__PURE__ */ l(Ge, { children: [
          /* @__PURE__ */ r($e, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(Le, { children: /* @__PURE__ */ r(ir, { children: Object.entries(e).map(([f, h]) => /* @__PURE__ */ r(wr, { children: /* @__PURE__ */ r(
            lr,
            {
              onClick: () => p(f),
              isActive: v(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: h })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ l(Ge, { children: [
          /* @__PURE__ */ r($e, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(Le, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            Xe,
            {
              buttonVariant: "ghost",
              buttonClassName: d("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: g,
              buttonPlaceholder: w,
              onChange: (f) => {
                const h = g(f);
                p(h, f);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(ta, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
<<<<<<< HEAD
const mn = de(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: a, className: o, isDisabled: s = !1 }, i) => {
    const w = W();
    return /* @__PURE__ */ l("div", { className: d("tw-relative", { "tw-w-full": a }, o), children: [
      /* @__PURE__ */ r(
        Vn,
        {
          className: d(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Ht,
        {
          ref: i,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ l(
        X,
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
            /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
mn.displayName = "SearchBar";
function ui({
=======
function lr({
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: a,
  className: o,
  isDisabled: s = !1
}) {
  const i = W();
  return /* @__PURE__ */ l("div", { className: d("tw-relative", { "tw-w-full": a }, o), children: [
    /* @__PURE__ */ r(
      Dn,
      {
        className: d(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": i === "rtl" },
          { "tw-left-3": i === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ r(
      Ht,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: n,
        value: t,
        onChange: (w) => e(w.target.value),
        disabled: s
      }
    ),
    t && /* @__PURE__ */ l(
      F,
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
          /* @__PURE__ */ r(Ke, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
function pi({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: w,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: p,
  buttonPlaceholderText: g
}) {
  return /* @__PURE__ */ l("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      mn,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ l(
      rr,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            zo,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: o,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: p,
              buttonPlaceholderText: g
            }
          ),
          /* @__PURE__ */ r(or, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
const yt = "scrBook", Bo = "scrRef", Vt = "source", Ao = "details", Io = "Scripture Reference", Po = "Scripture Book", dr = "Type", Fo = "Details";
function jo(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: yt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Io,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? M.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === yt ? Ot(o.start) : void 0;
      },
      getGroupingValue: (a) => M.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => Ie(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => Ot(a.start),
      id: Bo,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : Ot(o.start);
      },
      sortingFn: (a, o) => Ie(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: Vt,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? dr : void 0,
      cell: (a) => n || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: Ao,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Fo,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const Xo = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
<<<<<<< HEAD
  return t.end && ({ offset: n } = t.end), !t.end || Ie(t.start, t.end) === 0 ? `${Ve(t.start)}+${e}` : `${Ve(t.start)}+${e}-${Ve(t.end)}+${n}`;
}, Sn = (t) => `${Go({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function mi({
=======
  return t.end && ({ offset: n } = t.end), !t.end || Ae(t.start, t.end) === 0 ? `${De(t.start)}+${e}` : `${De(t.start)}+${e}-${De(t.end)}+${n}`;
}, _n = (t) => `${Xo({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function ui({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: w
}) {
  const [c, p] = P([]), [g, v] = P([{ id: yt, desc: !1 }]), [f, h] = P({}), C = q(
    () => t.flatMap((y) => y.data.map((b) => ({
      ...b,
      source: y.source
    }))),
    [t]
  ), T = q(
    () => jo(
      {
        scriptureReferenceColumnName: a,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [a, s, i, n]
  );
  dt(() => {
    c.includes(Vt) ? v([
      { id: Vt, desc: !1 },
      { id: yt, desc: !1 }
    ]) : v([{ id: yt, desc: !1 }]);
  }, [c]);
<<<<<<< HEAD
  const k = Mn({
    data: _,
=======
  const N = On({
    data: C,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
    columns: T,
    state: {
      grouping: c,
      sorting: g,
      rowSelection: f
    },
    onGroupingChange: p,
    onSortingChange: v,
    onRowSelectionChange: h,
    getExpandedRowModel: fa(),
    getGroupedRowModel: ha(),
    getCoreRowModel: Bn(),
    getSortedRowModel: zn(),
    getRowId: Sn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  dt(() => {
    if (w) {
      const y = N.getSelectedRowModel().rowsById, b = Object.keys(y);
      if (b.length === 1) {
<<<<<<< HEAD
        const B = _.find((R) => Sn(R) === b[0]) || void 0;
=======
        const B = C.find((R) => _n(R) === b[0]) || void 0;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
        B && w(B);
      }
    }
  }, [f, C, w, N]);
  const x = o ?? Po, S = s ?? dr, D = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${x}`, value: [yt] },
    { label: `Group by ${S}`, value: [Vt] },
    {
      label: `Group by ${x} and ${S}`,
      value: [yt, Vt]
    },
    {
      label: `Group by ${S} and ${x}`,
      value: [Vt, yt]
    }
  ], A = (y) => {
    p(JSON.parse(y));
  }, z = (y, b) => {
    !y.getIsGrouped() && !y.getIsSelected() && y.getToggleSelectedHandler()(b);
  }, ft = (y, b) => y.getIsGrouped() ? "" : d("banded-row", b % 2 === 0 ? "even" : "odd"), H = (y, b, B) => {
    if (!((y == null ? void 0 : y.length) === 0 || b.depth < B.column.getGroupedIndex())) {
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
      jt,
      {
        value: JSON.stringify(c),
        onValueChange: (y) => {
          A(y);
        },
        children: [
          /* @__PURE__ */ r(zt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Xt, {}) }),
          /* @__PURE__ */ r(Bt, { position: "item-aligned", children: /* @__PURE__ */ r(Qa, { children: D.map((y) => /* @__PURE__ */ r(lt, { value: JSON.stringify(y.value), children: y.label }, y.label)) }) })
        ]
      }
    ),
<<<<<<< HEAD
    /* @__PURE__ */ l(Ne, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(ke, { children: k.getHeaderGroups().map((x) => /* @__PURE__ */ r(Ct, { children: x.headers.filter((b) => b.column.columnDef.header).map((b) => (
=======
    /* @__PURE__ */ l(ye, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Ne, { children: N.getHeaderGroups().map((y) => /* @__PURE__ */ r(kt, { children: y.headers.filter((b) => b.column.columnDef.header).map((b) => (
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(te, { colSpan: b.colSpan, className: "top-0 tw-sticky", children: b.isPlaceholder ? void 0 : /* @__PURE__ */ l("div", { children: [
          b.column.getCanGroup() ? /* @__PURE__ */ r(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${b.column.columnDef.header}`,
              onClick: b.column.getToggleGroupingHandler(),
              type: "button",
              children: b.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Jt(b.column.columnDef.header, b.getContext())
        ] }) }, b.id)
<<<<<<< HEAD
      )) }, x.id)) }),
      /* @__PURE__ */ r(Ce, { children: k.getRowModel().rows.map((x, b) => {
=======
      )) }, y.id)) }),
      /* @__PURE__ */ r(ke, { children: N.getRowModel().rows.map((y, b) => {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
        const B = W();
        return /* @__PURE__ */ r(
          kt,
          {
            "data-state": y.getIsSelected() ? "selected" : "",
            className: d(ft(y, b)),
            onClick: (R) => z(y, R),
            children: y.getVisibleCells().map((R) => {
              if (!(R.getIsPlaceholder() || R.column.columnDef.enableGrouping && !R.getIsGrouped() && (R.column.columnDef.id !== Vt || !n)))
                return /* @__PURE__ */ r(
                  Gt,
                  {
                    className: d(
                      R.column.columnDef.id,
                      "tw-p-[1px]",
                      H(c, y, R)
                    ),
                    children: R.getIsGrouped() ? /* @__PURE__ */ l(
                      F,
                      {
                        variant: "link",
                        onClick: y.getToggleExpandedHandler(),
                        type: "button",
                        children: [
<<<<<<< HEAD
                          x.getIsExpanded() && /* @__PURE__ */ r(ce, {}),
                          !x.getIsExpanded() && (B === "ltr" ? /* @__PURE__ */ r(Ye, {}) : /* @__PURE__ */ r(ea, {})),
=======
                          y.getIsExpanded() && /* @__PURE__ */ r(de, {}),
                          !y.getIsExpanded() && (B === "ltr" ? /* @__PURE__ */ r(Ye, {}) : /* @__PURE__ */ r(ea, {})),
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
                          " ",
                          Jt(R.column.columnDef.cell, R.getContext()),
                          " (",
                          y.subRows.length,
                          ")"
                        ]
                      }
                    ) : Jt(R.column.columnDef.cell, R.getContext())
                  },
                  R.id
                );
            })
          },
          y.id
        );
      }) })
    ] })
  ] });
}
var Nt = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(Nt || {});
const Go = (t, e, n, a, o) => {
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
}, $o = (t, e, n, a, o) => {
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
}, Pt = (t) => {
  if (M.isBookOT(t)) return "OT";
  if (M.isBookNT(t)) return "NT";
  if (M.isBookDC(t)) return "DC";
  if (M.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, hn = (t, e) => t.filter((n) => {
  try {
    return Pt(n) === e;
  } catch {
    return !1;
  }
<<<<<<< HEAD
}), cr = (t, e, n) => hn(t, e).every((a) => n.includes(a));
function Ho({
=======
}), cr = (t, e, n) => mn(t, e).every((a) => n.includes(a));
function Lo({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  bookId: t,
  selectedBookIds: e,
  toggleBook: n,
  lastKeyEventShiftKey: a,
  localizedBookNames: o
}) {
  var w, c;
  const s = Q(!1), i = Q();
  return /* @__PURE__ */ l(
    ye,
    {
      value: t,
      className: "tw-flex tw-items-center",
      onSelect: () => {
        s.current || (n(t, a.current), a.current = !1), i.current && clearTimeout(i.current), i.current = setTimeout(() => {
          s.current = !1;
        }, 100);
      },
      onMouseDown: (p) => {
        p.preventDefault(), s.current = !0, n(t, p.shiftKey);
      },
      role: "option",
      "aria-selected": e.includes(t),
      "aria-label": `${M.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
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
                "tw-border-s-red-200": Pt(t) === Nt.OT,
                "tw-border-s-purple-200": Pt(t) === Nt.NT,
                "tw-border-s-indigo-200": Pt(t) === Nt.DC,
                "tw-border-s-yellow-200": Pt(t) === Nt.Extra
              }
            ),
            children: o && ((w = o.get(t)) == null ? void 0 : w.localizedName) || M.bookIdToEnglishName(t)
          }
        ),
        /* @__PURE__ */ r("span", { className: "tw-ml-2 tw-text-xs tw-text-muted-foreground", children: o && ((c = o.get(t)) == null ? void 0 : c.localizedId) || t.toLocaleUpperCase() })
      ]
    },
    t
  );
}
function Ho({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: a,
  localizedStrings: o
}) {
  const s = hn(e, t).length === 0, i = o["%scripture_section_ot_short%"], w = o["%scripture_section_nt_short%"], c = o["%scripture_section_dc_short%"], p = o["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(t),
      className: d(
        cr(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: $o(
        t,
        i,
        w,
        c,
        p
      )
    }
  );
}
<<<<<<< HEAD
const Tn = 5, ze = 6;
function Uo({
=======
const Sn = 5, Me = 6;
function Yo({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: a,
  localizedBookNames: o
}) {
  const s = a["%webView_book_selector_books_selected%"], i = a["%webView_book_selector_select_books%"], w = a["%webView_book_selector_search_books%"], c = a["%webView_book_selector_select_all%"], p = a["%webView_book_selector_clear_all%"], g = a["%webView_book_selector_no_book_found%"], v = a["%webView_book_selector_more%"], f = a["%scripture_section_ot_long%"], h = a["%scripture_section_nt_long%"], C = a["%scripture_section_dc_long%"], T = a["%scripture_section_extra_long%"], [N, x] = P(!1), S = Q(void 0), D = Q(!1);
  if (t.length !== M.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const A = q(() => M.allBookIds.filter(
    (b, B) => t[B] === "1" && !M.isObsolete(M.bookIdToNumber(b))
  ), [t]), z = Y(
    (b, B = !1) => {
      if (!B || !S.current) {
        n(
          e.includes(b) ? e.filter((Z) => Z !== b) : [...e, b]
        ), S.current = b;
        return;
      }
      const R = A.findIndex((Z) => Z === S.current), K = A.findIndex((Z) => Z === b);
      if (R === -1 || K === -1) return;
      const [it, gt] = [
        Math.min(R, K),
        Math.max(R, K)
      ], St = A.slice(it, gt + 1).map((Z) => Z);
      n(
        e.includes(b) ? e.filter((Z) => !St.includes(Z)) : [.../* @__PURE__ */ new Set([...e, ...St])]
      );
    },
    [e, n, A]
  ), ft = Y(
    (b) => {
      const B = hn(A, b).map((R) => R);
      n(
        cr(A, b, e) ? e.filter((R) => !B.includes(R)) : [.../* @__PURE__ */ new Set([...e, ...B])]
      );
    },
    [e, n, A]
  ), H = () => {
    n(A.map((b) => b));
  }, y = () => {
    n([]);
  };
  return /* @__PURE__ */ l("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Nt).map((b) => /* @__PURE__ */ r(
      Ho,
      {
        section: b,
        availableBookIds: A,
        selectedBookIds: e,
        onToggle: ft,
        localizedStrings: a
      },
      b
    )) }),
    /* @__PURE__ */ l(on, { open: N, onOpenChange: x, children: [
      /* @__PURE__ */ r(sn, { asChild: !0, children: /* @__PURE__ */ l(
        F,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": N,
          className: "tw-max-w-64 tw-justify-between",
          children: [
            e.length > 0 ? `${s}: ${e.length}` : i,
            /* @__PURE__ */ r(qe, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ r(fe, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ l(
        ge,
        {
          onKeyDown: (b) => {
            b.key === "Enter" && (D.current = b.shiftKey);
          },
          children: [
            /* @__PURE__ */ r(be, { placeholder: w }),
            /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: H, children: c }),
              /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: y, children: p })
            ] }),
<<<<<<< HEAD
            /* @__PURE__ */ l(ve, { children: [
              /* @__PURE__ */ r(xe, { children: g }),
              Object.values(kt).map((b, B) => {
=======
            /* @__PURE__ */ l(be, { children: [
              /* @__PURE__ */ r(ve, { children: g }),
              Object.values(Nt).map((b, B) => {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
                const R = A.filter(
                  (K) => Pt(K) === b
                );
                if (R.length !== 0)
                  return /* @__PURE__ */ l(Dn, { children: [
                    /* @__PURE__ */ r(
                      wn,
                      {
                        heading: Go(
                          b,
                          f,
                          h,
                          C,
                          T
                        ),
                        children: R.map((K) => /* @__PURE__ */ r(
                          Lo,
                          {
                            bookId: K,
                            selectedBookIds: e,
                            toggleBook: z,
                            lastKeyEventShiftKey: D,
                            localizedBookNames: o
                          },
                          K
                        ))
                      }
                    ),
<<<<<<< HEAD
                    B < Object.values(kt).length - 1 && /* @__PURE__ */ r(Jn, {})
=======
                    B < Object.values(Nt).length - 1 && /* @__PURE__ */ r(qn, {})
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
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
        e.length === ze ? ze : Tn
      ).map((b) => {
        var B;
        return /* @__PURE__ */ r(we, { className: "hover:tw-bg-secondary", variant: "secondary", children: o && ((B = o.get(b)) == null ? void 0 : B.localizedName) || M.bookIdToEnglishName(b) || b }, b);
      }),
      e.length > ze && /* @__PURE__ */ r(
        we,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Tn} ${v}`
        }
      )
    ] })
  ] });
}
const mi = Object.freeze([
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
]), Et = (t, e) => t[e] ?? e;
function hi({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: a,
  selectedBookIds: o,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: w
}) {
  const c = Et(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = Et(
    i,
    "%webView_scope_selector_current_verse%"
  ), g = Et(
    i,
    "%webView_scope_selector_current_chapter%"
  ), v = Et(i, "%webView_scope_selector_current_book%"), f = Et(i, "%webView_scope_selector_choose_books%"), h = Et(i, "%webView_scope_selector_scope%"), C = Et(i, "%webView_scope_selector_select_books%"), T = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: g, id: "scope-chapter" },
    { value: "book", label: v, id: "scope-book" },
    { value: "selectedBooks", label: f, id: "scope-selected" }
  ], N = e ? T.filter((x) => e.includes(x.value)) : T;
  return /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(J, { children: h }),
      /* @__PURE__ */ r(
        an,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: N.map(({ value: x, label: S, id: D }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(ie, { className: "tw-me-2", value: x, id: D }),
            /* @__PURE__ */ r(J, { htmlFor: D, children: S })
          ] }, D))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(J, { children: C }),
      /* @__PURE__ */ r(
        Yo,
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
const Be = {
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
function fi({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: a = {},
  size: o,
  className: s
}) {
  const i = {
    ...Be,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([c, p]) => [
          c,
          c === p && c in Be ? Be[c] : p
        ]
      )
    )
  }, w = W();
  return /* @__PURE__ */ l(
    jt,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(zt, { size: o, className: d("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Xt,
          {
            placeholder: i[I(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Bt,
          {
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ r(lt, { value: `${c}`, children: i[I(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function gi({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function bi({
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
function vi({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ l("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(dn, {}) : ""
  ] });
}
function pr(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : n[0];
}
function le({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: d("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const ur = (t, e, n, a) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((w) => w.group === s).sort((w, c) => w.order - c.order).map((w) => /* @__PURE__ */ l(pn, { children: [
  /* @__PURE__ */ r(un, { asChild: !0, children: "command" in w ? /* @__PURE__ */ l(
    me,
    {
      onClick: () => {
        a(w);
      },
      children: [
        w.iconPathBefore && /* @__PURE__ */ r(le, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(le, { icon: w.iconPathAfter, menuLabel: w.label })
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ l(Ca, { children: [
    /* @__PURE__ */ r(Fn, { children: w.label }),
    /* @__PURE__ */ r(ka, { children: /* @__PURE__ */ r(jn, { children: ur(
      t,
      e,
      pr(t, w.id),
      a
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
  w.tooltip && /* @__PURE__ */ r(Se, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function Rn({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: a,
  className: o,
  variant: s,
  id: i
}) {
<<<<<<< HEAD
  return /* @__PURE__ */ l(ue, { variant: s, children: [
    /* @__PURE__ */ r(Ze, { "aria-label": n, className: o, asChild: !0, id: i, children: /* @__PURE__ */ r(X, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ r(na, {}) }) }),
    /* @__PURE__ */ r(ne, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, p) => /* @__PURE__ */ l(Dn, { children: [
      /* @__PURE__ */ r(Pn, { children: /* @__PURE__ */ r(cn, { children: ur(e.groups, e.items, w, t) }) }),
=======
  return /* @__PURE__ */ l(pe, { variant: s, children: [
    /* @__PURE__ */ r(Ze, { "aria-label": n, className: o, asChild: !0, id: i, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ r(na, {}) }) }),
    /* @__PURE__ */ r(ne, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, p) => /* @__PURE__ */ l(En, { children: [
      /* @__PURE__ */ r(In, { children: /* @__PURE__ */ r(cn, { children: ur(e.groups, e.items, w, t) }) }),
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
      c < p.length - 1 && /* @__PURE__ */ r(Ft, {})
    ] }, w)) })
  ] });
}
function xi({
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
          Rn,
          {
            onSelectMenuItem: t,
            menuData: n,
            tabLabel: "Project",
            icon: /* @__PURE__ */ r(ra, {}),
            className: "tw-h-full tw-w-8"
          }
        ),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          a && /* @__PURE__ */ r(
            Rn,
            {
              onSelectMenuItem: e,
              menuData: a,
              tabLabel: "View Info",
              icon: /* @__PURE__ */ r(aa, {}),
              className: "tw-h-full"
            }
          ),
          c
        ] })
      ]
    }
  );
}
const mr = u.forwardRef(({ className: t, ...e }, n) => {
  const a = W();
  return /* @__PURE__ */ r(
    rt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: d("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
mr.displayName = rt.List.displayName;
const hr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.List,
  {
    ref: n,
    className: d(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
hr.displayName = rt.List.displayName;
const Uo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Trigger,
  {
    ref: n,
    ...e,
    className: d(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), fr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Content,
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
fr.displayName = rt.Content.displayName;
function yi({
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
        mn,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ l(mr, { children: [
      /* @__PURE__ */ r(hr, { children: t.map((i) => /* @__PURE__ */ r(Uo, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ r(fr, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
function Ko({ ...t }) {
  return /* @__PURE__ */ r(G.Menu, { ...t });
}
function qo({ ...t }) {
  return /* @__PURE__ */ r(G.Sub, { "data-slot": "menubar-sub", ...t });
}
const gr = u.forwardRef(({ className: t, variant: e = "default", ...n }, a) => {
  const o = u.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(We.Provider, { value: o, children: /* @__PURE__ */ r(
    G.Root,
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
gr.displayName = G.Root.displayName;
const br = u.forwardRef(({ className: t, ...e }, n) => {
  const a = pt();
  return /* @__PURE__ */ r(
    G.Trigger,
    {
      ref: n,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        ht({ variant: a.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
br.displayName = G.Trigger.displayName;
const vr = u.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = pt();
  return /* @__PURE__ */ l(
    G.SubTrigger,
    {
      ref: o,
      className: d(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ht({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(Ye, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
vr.displayName = G.SubTrigger.displayName;
const xr = u.forwardRef(({ className: t, ...e }, n) => {
  const a = pt();
  return /* @__PURE__ */ r(
    G.SubContent,
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
xr.displayName = G.SubContent.displayName;
const yr = u.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, s) => {
  const i = pt();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ r(
    G.Content,
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
yr.displayName = G.Content.displayName;
const Nr = u.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = pt();
  return /* @__PURE__ */ r(
    G.Item,
    {
      ref: a,
      className: d(
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
Nr.displayName = G.Item.displayName;
const Jo = u.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = pt();
  return /* @__PURE__ */ l(
    G.CheckboxItem,
    {
      ref: o,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ht({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Jo.displayName = G.CheckboxItem.displayName;
const Wo = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = pt();
  return /* @__PURE__ */ l(
    G.RadioItem,
    {
      ref: a,
      className: d(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ht({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(Ue, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Wo.displayName = G.RadioItem.displayName;
const Zo = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  G.Label,
  {
    ref: a,
    className: d("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Zo.displayName = G.Label.displayName;
const kr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  G.Separator,
  {
    ref: n,
    className: d("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
kr.displayName = G.Separator.displayName;
const Kt = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Cr = (t, e, n, a) => {
  if (!n) return;
  const o = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return o.flatMap(([s], i) => {
    const w = e.filter((p) => p.group === s).sort((p, g) => p.order - g.order).map((p) => /* @__PURE__ */ l(pn, { children: [
      /* @__PURE__ */ r(un, { asChild: !0, children: "command" in p ? /* @__PURE__ */ l(
        Nr,
        {
          onClick: () => {
            a(p);
          },
          children: [
            p.iconPathBefore && /* @__PURE__ */ r(le, { icon: p.iconPathBefore, menuLabel: p.label, leading: !0 }),
            p.label,
            p.iconPathAfter && /* @__PURE__ */ r(le, { icon: p.iconPathAfter, menuLabel: p.label })
          ]
        },
        `menubar-item-${p.label}-${p.command}`
      ) : /* @__PURE__ */ l(qo, { children: [
        /* @__PURE__ */ r(vr, { children: p.label }),
        /* @__PURE__ */ r(xr, { children: Cr(
          t,
          e,
          pr(t, p.id),
          a
        ) })
      ] }, `menubar-sub-${p.label}-${p.id}`) }),
      p.tooltip && /* @__PURE__ */ r(Se, { children: p.tooltip })
    ] }, `tooltip-${p.label}-${"command" in p ? p.command : p.id}`)), c = [...w];
    return w.length > 0 && i < o.length - 1 && c.push(/* @__PURE__ */ r(kr, {}, `separator-${s}`)), c;
  });
};
function Qo({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: a
}) {
  const o = Q(void 0), s = Q(void 0), i = Q(void 0), w = Q(void 0), c = Q(void 0), p = (g) => {
    switch (g) {
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
  if (ba(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (g, v) => {
    var C, T, N, x;
    g.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, h = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (v.hotkey) {
      case "alt":
        Kt(s, [f]);
        break;
      case "alt+p":
        (C = s.current) == null || C.focus(), Kt(s, [f, h]);
        break;
      case "alt+l":
        (T = i.current) == null || T.focus(), Kt(i, [f, h]);
        break;
      case "alt+n":
        (N = w.current) == null || N.focus(), Kt(w, [f, h]);
        break;
      case "alt+h":
        (x = c.current) == null || x.focus(), Kt(c, [f, h]);
        break;
    }
  }), dt(() => {
    if (!n || !o.current) return;
    const g = new MutationObserver((h) => {
      h.forEach((C) => {
        if (C.attributeName === "data-state" && C.target instanceof HTMLElement) {
          const T = C.target.getAttribute("data-state");
          n(T === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((h) => {
      g.observe(h, { attributes: !0 });
    }), () => g.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(gr, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, g]) => typeof g == "object").sort(([, g], [, v]) => typeof g == "boolean" || typeof v == "boolean" ? 0 : g.order - v.order).map(([g, v]) => /* @__PURE__ */ l(Ko, { children: [
      /* @__PURE__ */ r(br, { ref: p(g), children: typeof v == "object" && "label" in v && v.label }),
      /* @__PURE__ */ r(
        yr,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(cn, { children: Cr(t.groups, t.items, g, e) })
        }
      )
    ] }, g)) });
}
function Ni(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function ki({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: a,
  id: o,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: w,
  shouldUseAsAppDragArea: c,
  menubarVariant: p = "default"
}) {
  const g = Q(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-border tw-px-4 tw-text-foreground", a),
      ref: g,
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
                    Qo,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: n,
                      variant: p
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
const ts = (t, e) => t[e] ?? e;
function Ci({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: w
}) {
  const c = ts(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [p, g] = P(!1), v = (h) => {
    o && o(h), a && a([h, ...n.filter((C) => C !== h)]), s && n.find((C) => C === h) && s([...n.filter((C) => C !== h)]), g(!1);
  }, f = (h, C) => {
    var N, x, S, D, A, z;
    const T = C !== h ? ((x = (N = t[h]) == null ? void 0 : N.uiNames) == null ? void 0 : x[C]) ?? ((D = (S = t[h]) == null ? void 0 : S.uiNames) == null ? void 0 : D.en) : void 0;
    return T ? `${(A = t[h]) == null ? void 0 : A.autonym} (${T})` : (z = t[h]) == null ? void 0 : z.autonym;
  };
  return /* @__PURE__ */ l("div", { className: d("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ l(
      jt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: v,
        open: p,
        onOpenChange: (h) => g(h),
        children: [
          /* @__PURE__ */ r(zt, { children: /* @__PURE__ */ r(Xt, {}) }),
          /* @__PURE__ */ r(
            Bt,
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((h) => /* @__PURE__ */ r(lt, { value: h, children: f(h, e) }, h))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ l(He, { children: [
      /* @__PURE__ */ r(J, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ l(J, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((h) => f(h, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
function es({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(J, { children: e(t) }) : n ? /* @__PURE__ */ r(J, { children: n(t) }) : /* @__PURE__ */ r(J, { children: t });
}
function _i({
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
      ln,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(w),
        onCheckedChange: (c) => o(w, c)
      }
    ),
    /* @__PURE__ */ r(
      es,
      {
        item: w,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, w)) });
}
<<<<<<< HEAD
const rs = de(({ className: t, ...e }, n) => /* @__PURE__ */ r(oa, { size: 35, className: d("tw-animate-spin", t), ...e, ref: n }));
rs.displayName = "Spinner";
function Ti({
=======
const ns = He(({ className: t, ...e }, n) => /* @__PURE__ */ r(oa, { size: 35, className: d("tw-animate-spin", t), ...e, ref: n }));
ns.displayName = "Spinner";
function Si({
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: s,
  placeholder: i,
  isRequired: w = !1,
  className: c,
  defaultValue: p,
  value: g,
  onChange: v,
  onFocus: f,
  onBlur: h
}) {
  return /* @__PURE__ */ l("div", { className: d("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ r(
      J,
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
      Ht,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: w,
        className: d(c, { "tw-border-red-600": n }),
        defaultValue: p,
        value: g,
        onChange: v,
        onFocus: f,
        onBlur: h
      }
    ),
    /* @__PURE__ */ r("p", { className: d({ "tw-hidden": !o }), children: o })
  ] });
}
const Ti = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
<<<<<<< HEAD
]), En = (t, e) => t[e] ?? e;
function Ei({ errorDetails: t, handleCopyNotify: e, localizedStrings: n }) {
  const a = En(n, "%webView_error_dump_header%"), o = En(n, "%webView_error_dump_info_message%");
=======
]), Rn = (t, e) => t[e] ?? e;
function Ri({ errorDetails: t, handleCopyNotify: e, localizedStrings: n }) {
  const a = Rn(n, "%webView_error_dump_header%"), o = Rn(n, "%webView_error_dump_info_message%");
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
      /* @__PURE__ */ l("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
        /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
        /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: o })
      ] }),
      /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(sa, {}) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
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
), as = u.forwardRef(({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, role: "alert", className: d(rs({ variant: e }), t), ...n }));
as.displayName = "Alert";
const os = u.forwardRef(
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
os.displayName = "AlertTitle";
const ss = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
ss.displayName = "AlertDescription";
const is = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Lt.Root,
  {
    ref: n,
    className: d(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
is.displayName = Lt.Root.displayName;
const ws = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Lt.Image,
  {
    ref: n,
    className: d("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
ws.displayName = Lt.Image.displayName;
const ls = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Lt.Fallback,
  {
    ref: n,
    className: d(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
ls.displayName = Lt.Fallback.displayName;
const ds = u.forwardRef(
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
ds.displayName = "Card";
const cs = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
cs.displayName = "CardHeader";
const ps = u.forwardRef(
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
ps.displayName = "CardTitle";
const us = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: d("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
us.displayName = "CardDescription";
const ms = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
ms.displayName = "CardContent";
const hs = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: d("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
hs.displayName = "CardFooter";
const _r = u.createContext({
  direction: "bottom"
});
function fs({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const a = u.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(_r.Provider, { value: a, children: /* @__PURE__ */ r(
    ct.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
fs.displayName = "Drawer";
const Ei = ct.Trigger, gs = ct.Portal, Di = ct.Close, Sr = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Overlay,
  {
    ref: n,
    className: d("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Sr.displayName = ct.Overlay.displayName;
const bs = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const { direction: o = "bottom" } = u.useContext(_r), s = {
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
  return /* @__PURE__ */ l(gs, { children: [
    /* @__PURE__ */ r(Sr, {}),
    /* @__PURE__ */ l(
      ct.Content,
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
bs.displayName = "DrawerContent";
function vs({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: d("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
vs.displayName = "DrawerHeader";
function xs({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: d("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
xs.displayName = "DrawerFooter";
const ys = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Title,
  {
    ref: n,
    className: d("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ys.displayName = ct.Title.displayName;
const Ns = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ct.Description,
  {
    ref: n,
    className: d("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
ks.displayName = ct.Description.displayName;
const Cs = u.forwardRef(({ className: t, value: e, ...n }, a) => /* @__PURE__ */ r(
  Fe.Root,
=======
Ns.displayName = ct.Description.displayName;
const ks = u.forwardRef(({ className: t, value: e, ...n }, a) => /* @__PURE__ */ r(
  Pe.Root,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  {
    ref: a,
    className: d(
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
<<<<<<< HEAD
Cs.displayName = Fe.Root.displayName;
function Oi({ ...t }) {
=======
ks.displayName = Pe.Root.displayName;
function Vi({ ...t }) {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  return /* @__PURE__ */ r(
    va,
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
const Cs = u.forwardRef(({ className: t, ...e }, n) => {
  const a = W();
  return /* @__PURE__ */ l(
    qt.Root,
    {
      ref: n,
      className: d(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
        /* @__PURE__ */ r(qt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(qt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(qt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
Cs.displayName = qt.Root.displayName;
const _s = u.forwardRef(({ className: t, ...e }, n) => {
  const a = W();
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
<<<<<<< HEAD
Ss.displayName = je.Root.displayName;
const Mi = rt.Root, Ts = u.forwardRef(({ className: t, ...e }, n) => {
=======
_s.displayName = Fe.Root.displayName;
const Oi = rt.Root, Ss = u.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  const a = W();
  return /* @__PURE__ */ r(
    rt.List,
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
Ss.displayName = rt.List.displayName;
const Ts = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Trigger,
  {
    ref: n,
    className: d(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Ts.displayName = rt.Trigger.displayName;
const Rs = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Content,
  {
    ref: n,
    className: d(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Rs.displayName = rt.Content.displayName;
const Es = u.forwardRef(
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
Es.displayName = "Textarea";
const Mi = (t, e) => {
  dt(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Ds(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Vs = (t, e, n = {}) => {
  const a = Q(e);
  a.current = e;
  const o = Q(n);
  o.current = Ds(o.current);
  const [s, i] = P(() => a.current), [w, c] = P(!0);
  return dt(() => {
    let p = !0;
    return c(!!t), (async () => {
      if (t) {
        const g = await t();
        p && (i(() => g), c(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || i(() => a.current);
    };
  }, [t]), [s, w];
<<<<<<< HEAD
}, Ae = () => !1, Bi = (t, e) => {
  const [n] = Os(
    U(async () => {
      if (!t) return Ae;
=======
}, Be = () => !1, zi = (t, e) => {
  const [n] = Vs(
    Y(async () => {
      if (!t) return Be;
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    Ae,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  dt(() => () => {
    n !== Ae && n();
  }, [n]);
};
function Os(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), a = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? n.insertBefore(o, a) : n.appendChild(o);
}
Os(`.banded-row:hover {
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
.tw-right-2 {
  right: 0.5rem;
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
.tw-p-3 {
  padding: 0.75rem;
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
.\\!tw-pe-10 {
  padding-inline-end: 2.5rem !important;
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
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
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
.focus-visible\\:tw-ring-destructive:focus-visible {
  --tw-ring-color: hsl(var(--destructive));
}
.focus-visible\\:tw-ring-green-600:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(22 163 74 / var(--tw-ring-opacity, 1));
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
  as as Alert,
  ss as AlertDescription,
  os as AlertTitle,
  is as Avatar,
  ls as AvatarFallback,
  ws as AvatarImage,
  Ws as BOOK_SELECTOR_STRING_KEYS,
  we as Badge,
  Js as BookChapterControl,
  Wa as BookSelectionMode,
  Zs as BookSelector,
  F as Button,
  ds as Card,
  ms as CardContent,
  us as CardDescription,
  hs as CardFooter,
  cs as CardHeader,
  ps as CardTitle,
  Ja as ChapterRangeSelector,
  ln as Checkbox,
<<<<<<< HEAD
  Si as Checklist,
  Xe as ComboBox,
  ge as Command,
  xe as CommandEmpty,
  wn as CommandGroup,
  be as CommandInput,
  ye as CommandItem,
  ve as CommandList,
  io as DataTable,
  gs as Drawer,
  Vi as DrawerClose,
  vs as DrawerContent,
  ks as DrawerDescription,
  ys as DrawerFooter,
  xs as DrawerHeader,
  Sr as DrawerOverlay,
  bs as DrawerPortal,
  Ns as DrawerTitle,
  Di as DrawerTrigger,
  ue as DropdownMenu,
  Qe as DropdownMenuCheckboxItem,
  ne as DropdownMenuContent,
  Pn as DropdownMenuGroup,
  me as DropdownMenuItem,
  wo as DropdownMenuItemType,
  he as DropdownMenuLabel,
  ka as DropdownMenuPortal,
  qs as DropdownMenuRadioGroup,
  Xn as DropdownMenuRadioItem,
=======
  _i as Checklist,
  je as ComboBox,
  fe as Command,
  ve as CommandEmpty,
  wn as CommandGroup,
  ge as CommandInput,
  xe as CommandItem,
  be as CommandList,
  so as DataTable,
  fs as Drawer,
  Di as DrawerClose,
  bs as DrawerContent,
  Ns as DrawerDescription,
  xs as DrawerFooter,
  vs as DrawerHeader,
  Sr as DrawerOverlay,
  gs as DrawerPortal,
  ys as DrawerTitle,
  Ei as DrawerTrigger,
  pe as DropdownMenu,
  Qe as DropdownMenuCheckboxItem,
  ne as DropdownMenuContent,
  In as DropdownMenuGroup,
  ue as DropdownMenuItem,
  io as DropdownMenuItemType,
  me as DropdownMenuLabel,
  ka as DropdownMenuPortal,
  Ks as DropdownMenuRadioGroup,
  jn as DropdownMenuRadioItem,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  Ft as DropdownMenuSeparator,
  _a as DropdownMenuShortcut,
  Ca as DropdownMenuSub,
  jn as DropdownMenuSubContent,
  Fn as DropdownMenuSubTrigger,
  Ze as DropdownMenuTrigger,
  Ti as ERROR_DUMP_STRING_KEYS,
  Ri as ErrorDump,
  ri as Filter,
  ti as FilterDropdown,
  ni as Footer,
  di as INVENTORY_STRING_KEYS,
  Ht as Input,
  ci as Inventory,
  J as Label,
  Qs as MarkdownRenderer,
  ei as MoreInfo,
  co as MultiSelectComboBox,
  yi as NavigationContentSearch,
  on as Popover,
  fe as PopoverContent,
  sn as PopoverTrigger,
  ks as Progress,
  an as RadioGroup,
  ie as RadioGroupItem,
<<<<<<< HEAD
  hi as SCOPE_SELECTOR_STRING_KEYS,
  fi as ScopeSelector,
  mi as ScriptureResultsViewer,
  gi as ScrollGroupSelector,
  mn as SearchBar,
=======
  mi as SCOPE_SELECTOR_STRING_KEYS,
  hi as ScopeSelector,
  ui as ScriptureResultsViewer,
  fi as ScrollGroupSelector,
  lr as SearchBar,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  jt as Select,
  Bt as SelectContent,
  Qa as SelectGroup,
  lt as SelectItem,
<<<<<<< HEAD
  no as SelectLabel,
  Zn as SelectScrollDownButton,
  Wn as SelectScrollUpButton,
  ro as SelectSeparator,
  zt as SelectTrigger,
  Xt as SelectValue,
  dn as Separator,
  bi as SettingsList,
  xi as SettingsListHeader,
  vi as SettingsListItem,
  Bo as SettingsSidebar,
  ui as SettingsSidebarContentSearch,
  _n as Skeleton,
  _s as Slider,
  Oi as Sonner,
  rs as Spinner,
  Ss as Switch,
  Rn as TabDropdownMenu,
  yi as TabToolbar,
  Ne as Table,
  Ce as TableBody,
  so as TableCaption,
=======
  eo as SelectLabel,
  Wn as SelectScrollDownButton,
  Jn as SelectScrollUpButton,
  no as SelectSeparator,
  zt as SelectTrigger,
  Xt as SelectValue,
  dn as Separator,
  gi as SettingsList,
  vi as SettingsListHeader,
  bi as SettingsListItem,
  zo as SettingsSidebar,
  pi as SettingsSidebarContentSearch,
  Cn as Skeleton,
  Cs as Slider,
  Vi as Sonner,
  ns as Spinner,
  _s as Switch,
  Tn as TabDropdownMenu,
  xi as TabToolbar,
  ye as Table,
  ke as TableBody,
  oo as TableCaption,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  Gt as TableCell,
  ao as TableFooter,
  te as TableHead,
<<<<<<< HEAD
  ke as TableHeader,
  Ct as TableRow,
  Mi as Tabs,
  Es as TabsContent,
  Ts as TabsList,
  Rs as TabsTrigger,
  Ti as TextField,
  Ds as Textarea,
  er as ToggleGroup,
=======
  Ne as TableHeader,
  kt as TableRow,
  Oi as Tabs,
  Rs as TabsContent,
  Ss as TabsList,
  Ts as TabsTrigger,
  Si as TextField,
  Es as Textarea,
  tr as ToggleGroup,
>>>>>>> fc6a89a2de19cdd5782a8726c5dab24b5a14d414
  se as ToggleGroupItem,
  ki as Toolbar,
  pn as Tooltip,
  Se as TooltipContent,
  cn as TooltipProvider,
  un as TooltipTrigger,
  Ci as UiLanguageSelector,
  mr as VerticalTabs,
  fr as VerticalTabsContent,
  hr as VerticalTabsList,
  Uo as VerticalTabsTrigger,
  lo as badgeVariants,
  $a as buttonVariants,
  d as cn,
  li as getBookIdFromUSFM,
  ii as getLinesFromUSFM,
  wi as getNumberFromUSFM,
  ho as getStatusForItem,
  Ni as getToolbarOSReservedSpaceClassName,
  oi as inventoryCountColumn,
  ai as inventoryItemColumn,
  si as inventoryStatusColumn,
  to as selectTriggerVariants,
  Ii as sonner,
  Mi as useEvent,
  zi as useEventAsync,
  Vs as usePromise
};
//# sourceMappingURL=index.js.map
