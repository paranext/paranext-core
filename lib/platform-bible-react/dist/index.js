<<<<<<< HEAD
import Ys, { jsx as s, jsxs as x, Fragment as ne } from "react/jsx-runtime";
import * as j from "react";
import S, { forwardRef as er, useCallback as Et, useState as ut, useRef as be, useEffect as se, useLayoutEffect as ca, useMemo as Ct } from "react";
import ve, { clsx as Hs } from "clsx";
import { extendTailwindMerge as qs } from "tailwind-merge";
import * as ft from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ws } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as oi, Check as En, Circle as ai, X as uo, Search as ii, ChevronsUpDown as si, FilterIcon as Ks, ChevronDown as nr, ChevronUp as Js, ArrowLeftIcon as Zs, ChevronLeftIcon as Qs, ChevronRightIcon as tl, ArrowRightIcon as el, CircleCheckIcon as nl, CircleXIcon as rl, CircleHelpIcon as ol, ArrowUpIcon as al, ArrowDownIcon as il, ArrowUpDownIcon as sl, Star as ll, PanelLeft as cl, PanelRight as dl, ChevronLeft as pl, LoaderCircle as ul, Download as wl, Filter as fl, User as ml, Link as hl, CircleHelp as gl } from "lucide-react";
import { getChaptersForBook as bl, deepEqual as wo, substring as vl, formatScrRef as Pr, compareScrRefs as Hr, scrRefToBBBCCCVVV as $r, getLocalizeKeyForScrollGroupId as pt, NumberFormat as yl, formatBytes as xl } from "platform-bible-utils";
import { Slot as qe } from "@radix-ui/react-slot";
import { cva as We } from "class-variance-authority";
import * as li from "@radix-ui/react-label";
import * as gn from "@radix-ui/react-radio-group";
import * as bn from "@radix-ui/react-popover";
import { Command as _t } from "cmdk";
import * as qt from "@radix-ui/react-dialog";
import { useReactTable as ci, getFilteredRowModel as Nl, getSortedRowModel as di, getPaginationRowModel as kl, getCoreRowModel as pi, flexRender as wn, getGroupedRowModel as El, getExpandedRowModel as Sl } from "@tanstack/react-table";
import * as bt from "@radix-ui/react-select";
import * as qr from "@radix-ui/react-checkbox";
import * as rr from "@radix-ui/react-toggle-group";
import * as ui from "@radix-ui/react-toggle";
import * as Pt from "@radix-ui/react-tabs";
import * as wi from "@radix-ui/react-separator";
import * as Sn from "@radix-ui/react-tooltip";
import Tl, { ThemeContext as Cl, internal_processStyles as Ol } from "@mui/styled-engine";
import { MenuItem as Rl, ListItemText as _l, ListItemIcon as fi, Menu as Pl, Grid as mi, List as $l, IconButton as hi, Drawer as Il, AppBar as Ml, Toolbar as Al } from "@mui/material";
import * as Dl from "react-dom";
import jn from "react-dom";
import { Toaster as jl } from "sonner";
import { toast as mh } from "sonner";
import * as cn from "@radix-ui/react-slider";
import * as Wr from "@radix-ui/react-switch";
import Bl from "markdown-to-jsx";
const Vl = qs({ prefix: "tw-" });
function N(...t) {
  return Vl(Hs(t));
}
const Ke = S.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ s(
=======
import ml, { jsx as i, jsxs as b, Fragment as te } from "react/jsx-runtime";
import * as D from "react";
import E, { forwardRef as dr, useCallback as Tt, useState as ut, useRef as Ne, useEffect as pe, useLayoutEffect as Na, useMemo as Ot } from "react";
import { History as hl, ChevronRight as No, Check as Ze, Circle as ko, ArrowDownWideNarrow as gl, Clock as bl, Bookmark as vl, X as Eo, Search as yi, ChevronsUpDown as xi, FilterIcon as yl, ChevronDown as pr, ChevronUp as xl, ArrowLeftIcon as Nl, ChevronLeftIcon as kl, ChevronRightIcon as El, ArrowRightIcon as Sl, CircleCheckIcon as Tl, CircleXIcon as Cl, CircleHelpIcon as Rl, ArrowUpIcon as Ol, ArrowDownIcon as _l, ArrowUpDownIcon as Pl, Star as $l, PanelLeft as Il, PanelRight as Ml, ChevronLeft as Al, LoaderCircle as Dl, Download as jl, Filter as Bl, User as Vl, Link as zl, CircleHelp as Fl } from "lucide-react";
import ke, { clsx as Ll } from "clsx";
import { extendTailwindMerge as Gl } from "tailwind-merge";
import * as mt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Ul } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Xl, deepEqual as So, substring as Hl, formatScrRef as Br, compareScrRefs as to, scrRefToBBBCCCVVV as Vr, getLocalizeKeyForScrollGroupId as pt, NumberFormat as Yl, formatBytes as Wl } from "platform-bible-utils";
import { Slot as Qe } from "@radix-ui/react-slot";
import { cva as tn } from "class-variance-authority";
import * as Ni from "@radix-ui/react-label";
import * as Sn from "@radix-ui/react-radio-group";
import * as Tn from "@radix-ui/react-popover";
import { Command as $t } from "cmdk";
import * as Jt from "@radix-ui/react-dialog";
import { useReactTable as ki, getCoreRowModel as Ei, getPaginationRowModel as ql, getSortedRowModel as Si, getFilteredRowModel as Kl, flexRender as yn, getExpandedRowModel as Jl, getGroupedRowModel as Zl } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import * as eo from "@radix-ui/react-checkbox";
import * as ur from "@radix-ui/react-toggle-group";
import * as Ti from "@radix-ui/react-toggle";
import * as It from "@radix-ui/react-tabs";
import * as Ci from "@radix-ui/react-separator";
import * as $n from "@radix-ui/react-tooltip";
import Ql, { ThemeContext as tc, internal_processStyles as ec } from "@mui/styled-engine";
import { MenuItem as nc, ListItemText as rc, ListItemIcon as Ri, Menu as oc, Grid as Oi, List as ac, IconButton as _i, Drawer as ic } from "@mui/material";
import * as sc from "react-dom";
import Hn from "react-dom";
import * as wt from "@radix-ui/react-menubar";
import { Toaster as lc } from "sonner";
import { toast as pg } from "sonner";
import * as fn from "@radix-ui/react-slider";
import * as no from "@radix-ui/react-switch";
import cc from "markdown-to-jsx";
const dc = Gl({ prefix: "tw-" });
function x(...t) {
  return dc(Ll(t));
}
const en = E.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Ke.displayName = "Input";
const zl = er(
  ({ handleSearch: t, handleKeyDown: e, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ s("div", { className: "tw-relative", children: /* @__PURE__ */ s(
    Ke,
    {
      ...o,
      type: "text",
      className: N(
        "tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none"
      ),
      onChange: (i) => t(i.target.value),
      onKeyDown: (i) => {
        i.key === "Enter" && r(), e(i);
      },
      onClick: n,
      ref: a
    }
  ) })
), Fl = "layoutDirection";
function xt() {
  const t = localStorage.getItem(Fl);
  return t === "rtl" ? t : "ltr";
}
const fo = ft.Root, gi = ft.Trigger, Ll = ft.Group, Rm = ft.Portal, _m = ft.Sub, Pm = ft.RadioGroup, Gl = S.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ x(
  ft.SubTrigger,
=======
en.displayName = "Input";
const pc = "layoutDirection";
function kt() {
  const t = localStorage.getItem(pc);
  return t === "rtl" ? t : "ltr";
}
const uc = dr(
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
        en,
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
), To = mt.Root, Pi = mt.Trigger, wc = mt.Group, Sh = mt.Portal, Th = mt.Sub, Ch = mt.RadioGroup, fc = E.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ b(
  mt.SubTrigger,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      /* @__PURE__ */ s(oi, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Gl.displayName = ft.SubTrigger.displayName;
const Ul = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  ft.SubContent,
=======
      /* @__PURE__ */ i(No, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
fc.displayName = mt.SubTrigger.displayName;
const mc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  mt.SubContent,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Ul.displayName = ft.SubContent.displayName;
const or = S.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...r }, o) => {
  const a = xt();
  return /* @__PURE__ */ s(ft.Portal, { children: /* @__PURE__ */ s(
    ft.Content,
=======
mc.displayName = mt.SubContent.displayName;
const wr = E.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...r }, o) => {
  const a = kt();
  return /* @__PURE__ */ i(mt.Portal, { children: /* @__PURE__ */ i(
    mt.Content,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
or.displayName = ft.Content.displayName;
const bi = S.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = xt();
  return /* @__PURE__ */ s(
    ft.Item,
=======
wr.displayName = mt.Content.displayName;
const $i = E.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = kt();
  return /* @__PURE__ */ i(
    mt.Item,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
bi.displayName = ft.Item.displayName;
const mo = S.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ x(
  ft.CheckboxItem,
=======
$i.displayName = mt.Item.displayName;
const Co = E.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ b(
  mt.CheckboxItem,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: o,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ s(ft.ItemIndicator, { children: /* @__PURE__ */ s(En, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
<<<<<<< HEAD
mo.displayName = ft.CheckboxItem.displayName;
const vi = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ x(
  ft.RadioItem,
=======
Co.displayName = mt.CheckboxItem.displayName;
const Ii = E.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ b(
  mt.RadioItem,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
<<<<<<< HEAD
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ s(ft.ItemIndicator, { children: /* @__PURE__ */ s(ai, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
=======
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ i(mt.ItemIndicator, { children: /* @__PURE__ */ i(ko, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      e
    ]
  }
));
<<<<<<< HEAD
vi.displayName = ft.RadioItem.displayName;
const ar = S.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ s(
  ft.Label,
=======
Ii.displayName = mt.RadioItem.displayName;
const In = E.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  mt.Label,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: r,
    className: N("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
<<<<<<< HEAD
ar.displayName = ft.Label.displayName;
const ir = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  ft.Separator,
=======
In.displayName = mt.Label.displayName;
const fr = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  mt.Separator,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
ir.displayName = ft.Separator.displayName;
function Xl({ className: t, ...e }) {
  return /* @__PURE__ */ s(
=======
fr.displayName = mt.Separator.displayName;
function hc({ className: t, ...e }) {
  return /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "span",
    {
      className: N("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
<<<<<<< HEAD
Xl.displayName = "DropdownMenuShortcut";
var Yl = Object.defineProperty, Hl = (t, e, n) => e in t ? Yl(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, et = (t, e, n) => Hl(t, typeof e != "symbol" ? e + "" : e, n);
const xe = [
=======
hc.displayName = "DropdownMenuShortcut";
var gc = Object.defineProperty, bc = (t, e, n) => e in t ? gc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, et = (t, e, n) => bc(t, typeof e != "symbol" ? e + "" : e, n);
const Se = [
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
], ho = [
=======
], Ro = [
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
], yi = [
=======
], Mi = [
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
], da = rc();
function Je(t, e = !0) {
  return e && (t = t.toUpperCase()), t in da ? da[t] : 0;
}
function go(t) {
  return Je(t) > 0;
}
function ql(t) {
  const e = typeof t == "string" ? Je(t) : t;
  return e >= 40 && e <= 66;
}
function Wl(t) {
  return (typeof t == "string" ? Je(t) : t) <= 39;
}
function xi(t) {
  return t <= 66;
}
function Kl(t) {
  const e = typeof t == "string" ? Je(t) : t;
  return Ei(e) && !xi(e);
}
function* Jl() {
  for (let t = 1; t <= xe.length; t++) yield t;
}
const Zl = 1, Ni = xe.length;
function Ql() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function bo(t, e = "***") {
=======
], ka = Rc();
function nn(t, e = !0) {
  return e && (t = t.toUpperCase()), t in ka ? ka[t] : 0;
}
function Oo(t) {
  return nn(t) > 0;
}
function vc(t) {
  const e = typeof t == "string" ? nn(t) : t;
  return e >= 40 && e <= 66;
}
function yc(t) {
  return (typeof t == "string" ? nn(t) : t) <= 39;
}
function Ai(t) {
  return t <= 66;
}
function xc(t) {
  const e = typeof t == "string" ? nn(t) : t;
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
function _o(t, e = "***") {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const n = t - 1;
  return n < 0 || n >= xe.length ? e : xe[n];
}
<<<<<<< HEAD
function ki(t) {
  return t <= 0 || t > Ni ? "******" : yi[t - 1];
}
function tc(t) {
  return ki(Je(t));
}
function Ei(t) {
  const e = typeof t == "number" ? bo(t) : t;
  return go(e) && !ho.includes(e);
}
function ec(t) {
  const e = typeof t == "number" ? bo(t) : t;
  return go(e) && ho.includes(e);
}
function nc(t) {
  return yi[t - 1].includes("*obsolete*");
}
function rc() {
=======
function ji(t) {
  return t <= 0 || t > Di ? "******" : Mi[t - 1];
}
function Sc(t) {
  return ji(nn(t));
}
function Bi(t) {
  const e = typeof t == "number" ? _o(t) : t;
  return Oo(e) && !Ro.includes(e);
}
function Tc(t) {
  const e = typeof t == "number" ? _o(t) : t;
  return Oo(e) && Ro.includes(e);
}
function Cc(t) {
  return Mi[t - 1].includes("*obsolete*");
}
function Rc() {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const t = {};
  for (let e = 0; e < xe.length; e++)
    t[xe[e]] = e + 1;
  return t;
}
<<<<<<< HEAD
const ot = {
  allBookIds: xe,
  nonCanonicalIds: ho,
  bookIdToNumber: Je,
  isBookIdValid: go,
  isBookNT: ql,
  isBookOT: Wl,
  isBookOTNT: xi,
  isBookDC: Kl,
  allBookNumbers: Jl,
  firstBook: Zl,
  lastBook: Ni,
  extraBooks: Ql,
  bookNumberToId: bo,
  bookNumberToEnglishName: ki,
  bookIdToEnglishName: tc,
  isCanonical: Ei,
  isExtraMaterial: ec,
  isObsolete: nc
};
var Yt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Yt || {});
const It = class {
=======
const at = {
  allBookIds: Se,
  nonCanonicalIds: Ro,
  bookIdToNumber: nn,
  isBookIdValid: Oo,
  isBookNT: vc,
  isBookOT: yc,
  isBookOTNT: Ai,
  isBookDC: xc,
  allBookNumbers: Nc,
  firstBook: kc,
  lastBook: Di,
  extraBooks: Ec,
  bookNumberToId: _o,
  bookNumberToEnglishName: ji,
  bookIdToEnglishName: Sc,
  isCanonical: Bi,
  isExtraMaterial: Tc,
  isObsolete: Cc
};
var qt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(qt || {});
const At = class {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  // private versInfo: Versification;
  constructor(e) {
    if (et(this, "name"), et(this, "fullPath"), et(this, "isPresent"), et(this, "hasVerseSegments"), et(this, "isCustomized"), et(this, "baseVersification"), et(this, "scriptureBooks"), et(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = Yt[e]) : (this._type = e, this.name = Yt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
<<<<<<< HEAD
et(It, "Original", new It(Yt.Original)), et(It, "Septuagint", new It(Yt.Septuagint)), et(It, "Vulgate", new It(Yt.Vulgate)), et(It, "English", new It(Yt.English)), et(It, "RussianProtestant", new It(Yt.RussianProtestant)), et(It, "RussianOrthodox", new It(Yt.RussianOrthodox));
let we = It;
function pa(t, e) {
=======
et(At, "Original", new At(qt.Original)), et(At, "Septuagint", new At(qt.Septuagint)), et(At, "Vulgate", new At(qt.Vulgate)), et(At, "English", new At(qt.English)), et(At, "RussianProtestant", new At(qt.RussianProtestant)), et(At, "RussianOrthodox", new At(qt.RussianOrthodox));
let ge = At;
function Ea(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
<<<<<<< HEAD
var Si = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Si || {});
const Tt = class rt {
=======
var Vi = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Vi || {});
const Rt = class rt {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  constructor(e, n, r, o) {
    if (et(this, "firstChapter"), et(this, "lastChapter"), et(this, "lastVerse"), et(this, "hasSegmentsDefined"), et(this, "text"), et(this, "BBBCCCVVVS"), et(this, "longHashCode"), et(this, "versification"), et(this, "rtlMark", "‏"), et(this, "_bookNum", 0), et(this, "_chapterNum", 0), et(this, "_verseNum", 0), et(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, i = n != null && n instanceof we ? n : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof we ? n : void 0;
        this.setEmpty(a), this._verseNum = e % rt.chapterDigitShifter, this._chapterNum = Math.floor(
          e % rt.bookDigitShifter / rt.chapterDigitShifter
        ), this._bookNum = Math.floor(e / rt.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof rt) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null) return;
          const a = e instanceof we ? e : rt.defaultVersification;
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
      if (r instanceof rn)
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
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = e, l = a || o.toString();
    let c;
    return i && (c = new we(i)), n ? new rt(n, r.toString(), l, c) : new rt();
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
          const i = +a[1].trim();
          this.versification = new we(Yt[i]);
        } catch {
          throw new rn("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new rn("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ot.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !rt.isVerseParseable(r[1]))
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
<<<<<<< HEAD
    const o = [], a = pa(this._verse, r);
    for (const i of a.map((l) => pa(l, n))) {
=======
    const o = [], a = Ea(this._verse, r);
    for (const s of a.map((l) => Ea(l, n))) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const d = this.clone();
        if (d.verse = i[1], !e)
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
  setEmpty(e = rt.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = ot.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
et(Tt, "defaultVersification", we.English), et(Tt, "verseRangeSeparator", "-"), et(Tt, "verseSequenceIndicator", ","), et(Tt, "verseRangeSeparators", [Tt.verseRangeSeparator]), et(Tt, "verseSequenceIndicators", [Tt.verseSequenceIndicator]), et(Tt, "chapterDigitShifter", 1e3), et(Tt, "bookDigitShifter", Tt.chapterDigitShifter * Tt.chapterDigitShifter), et(Tt, "bcvMaxValue", Tt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
<<<<<<< HEAD
et(Tt, "ValidStatusType", Si);
class rn extends Error {
}
const oc = er(
=======
et(Rt, "ValidStatusType", Vi);
class cn extends Error {
}
const Oc = dr(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
<<<<<<< HEAD
    children: i
  }, l) => /* @__PURE__ */ x(
    bi,
=======
    children: s
  }, l) => /* @__PURE__ */ b(
    $i,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function ac({
=======
function _c({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const vo = ot.allBookIds.filter((t) => !ot.isObsolete(ot.bookIdToNumber(t))), ic = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ua = ["OT", "NT", "DC"], sc = 96, lc = [
=======
function Pc({ handleSort: t, handleLocationHistory: e, handleBookmarks: n }) {
  return /* @__PURE__ */ b(In, { className: "tw-flex tw-justify-between", children: [
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
const xn = at.allBookIds, $c = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Sa = ["OT", "NT", "DC"], Ic = 32 + 32 + 32, Mc = [
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
<<<<<<< HEAD
], on = (t) => bl(ot.bookIdToNumber(t));
function cc() {
  return vo.map((e) => ot.bookIdToEnglishName(e));
}
function dc(t) {
  return cc().includes(t);
}
function pc(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (dc(e))
    return vo.find((r) => ot.bookIdToEnglishName(r) === e);
}
function Im({ scrRef: t, handleSubmit: e, getActiveBookIds: n }) {
  const r = xt(), [o, a] = ut(""), [i, l] = ut(
    ot.bookNumberToId(t.bookNum)
  ), [c, d] = ut(t.chapterNum ?? 0), [p, f] = ut(
    ot.bookNumberToId(t.bookNum)
  ), [w, g] = ut(!1), [v, m] = ut(w), h = be(void 0), k = be(void 0), T = be(void 0), C = Et(
    ($) => {
      const F = n ? n() : vo;
      return {
        OT: F.filter((B) => ot.isBookOT(B)),
        NT: F.filter((B) => ot.isBookNT(B)),
        DC: F.filter((B) => ot.isBookDC(B))
      }[$].filter((B) => {
        const D = ot.bookIdToEnglishName(B).toLowerCase(), U = o.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return D.includes(U) || // Match book name
        B.toLowerCase().includes(U);
      });
    },
    [o, n]
    // Only recompute when relevant values change
  ), E = ($) => {
    a($);
  }, b = be(!1), I = Et(($) => {
    if (b.current) {
      b.current = !1;
=======
], Ac = (t) => ({
  OT: xn.filter((n) => at.isBookOT(n)),
  NT: xn.filter((n) => at.isBookNT(n)),
  DC: xn.filter((n) => at.isBookDC(n))
})[t], dn = (t) => Xl(at.bookIdToNumber(t));
function Dc() {
  return xn.map((e) => at.bookIdToEnglishName(e));
}
function jc(t) {
  return Dc().includes(t);
}
function Bc(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (jc(e))
    return xn.find((r) => at.bookIdToEnglishName(r) === e);
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      return;
    }
    g($);
  }, []), V = Et(
    ($, F, B, D) => {
      if (d(
        ot.bookNumberToId(t.bookNum) !== $ ? 1 : t.chapterNum
      ), F || on($) === -1) {
        e({
          bookNum: ot.bookIdToNumber($),
          chapterNum: B || 1,
          verseNum: D || 1
        }), g(!1), a("");
        return;
      }
      l(i !== $ ? $ : ""), g(!F);
    },
<<<<<<< HEAD
    [e, t.bookNum, t.chapterNum, i]
  ), R = ($) => {
    $ <= 0 || $ > on(i) || V(i, !0, $);
  }, P = Et(() => {
    lc.forEach(($) => {
      const F = o.match($);
      if (F) {
        const [B, D = void 0, U = void 0] = F.slice(1), nt = pc(B);
        (ot.isBookIdValid(B) || nt) && V(
          nt ?? B,
=======
    [e, t.bookNum, t.chapterNum, s]
  ), O = (P) => {
    P <= 0 || P > dn(s) || B(s, !0, P);
  }, $ = Tt(() => {
    Mc.forEach((P) => {
      const G = o.match(P);
      if (G) {
        const [j, V = void 0, H = void 0] = G.slice(1), nt = Bc(j);
        (at.isBookIdValid(j) || nt) && B(
          nt ?? j,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          !0,
          D ? parseInt(D, 10) : 1,
          U ? parseInt(U, 10) : 1
        );
      }
    });
  }, [V, o]), G = Et(
    ($) => {
      w ? ($.key === "ArrowDown" || $.key === "ArrowUp") && (typeof T < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      T.current !== null ? T.current.focus() : typeof k < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      k.current !== null && k.current.focus(), $.preventDefault()) : g(!0);
    },
    [w]
<<<<<<< HEAD
  ), A = ($) => {
    const { key: F } = $;
    F === "ArrowRight" || F === "ArrowLeft" || F === "ArrowDown" || F === "ArrowUp" || F === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: F })), h.current.focus());
  }, Q = ($) => {
    const { key: F } = $;
    if (p === i) {
      if (F === "Enter") {
        $.preventDefault(), V(i, !0, c);
=======
  ), A = (P) => {
    const { key: G } = P;
    G === "ArrowRight" || G === "ArrowLeft" || G === "ArrowDown" || G === "ArrowUp" || G === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: G })), h.current.focus());
  }, Q = (P) => {
    const { key: G } = P;
    if (p === s) {
      if (G === "Enter") {
        P.preventDefault(), B(s, !0, c);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        return;
      }
      const B = F === "ArrowRight" && !r || F === "ArrowRight" && r === "ltr" || F === "ArrowLeft" && r === "rtl", D = F === "ArrowLeft" && !r || F === "ArrowLeft" && r === "ltr" || F === "ArrowRight" && r === "rtl";
      let U = 0;
      if (B)
        if (c < on(p))
          U = 1;
        else {
          $.preventDefault();
          return;
        }
      else if (D)
        if (c > 1)
          U = -1;
        else {
          $.preventDefault();
          return;
        }
      else F === "ArrowDown" ? U = 6 : F === "ArrowUp" && (U = -6);
      c + U <= 0 || c + U > on(p) ? d(0) : U !== 0 && (d(c + U), $.preventDefault());
    }
  };
<<<<<<< HEAD
  return se(() => {
    i === p ? i === ot.bookNumberToId(t.bookNum) ? d(t.chapterNum) : d(1) : d(0);
  }, [p, t.bookNum, t.chapterNum, i]), ca(() => {
    m(w);
  }, [w]), ca(() => {
    const $ = setTimeout(() => {
      if (v && k.current && T.current) {
        const B = T.current.offsetTop - sc;
        k.current.scrollTo({ top: B, behavior: "instant" });
=======
  return pe(() => {
    s === p ? s === at.bookNumberToId(t.bookNum) ? d(t.chapterNum) : d(1) : d(0);
  }, [p, t.bookNum, t.chapterNum, s]), Na(() => {
    m(w);
  }, [w]), Na(() => {
    const P = setTimeout(() => {
      if (y && k.current && T.current) {
        const j = T.current.offsetTop - Ic;
        k.current.scrollTo({ top: j, behavior: "instant" });
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      }
    }, 10);
    return () => {
      clearTimeout($);
    };
<<<<<<< HEAD
  }, [v]), /* @__PURE__ */ s("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ x(fo, { modal: !1, open: w, onOpenChange: I, children: [
    /* @__PURE__ */ s(gi, { asChild: !0, children: /* @__PURE__ */ s(
      zl,
      {
        ref: h,
        value: o,
        handleSearch: E,
        handleKeyDown: G,
=======
  }, [y]), /* @__PURE__ */ i("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ b(To, { modal: !1, open: w, onOpenChange: I, children: [
    /* @__PURE__ */ i(Pi, { asChild: !0, children: /* @__PURE__ */ i(
      uc,
      {
        ref: h,
        value: o,
        handleSearch: S,
        handleKeyDown: L,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        handleOnClick: () => {
          l(ot.bookNumberToId(t.bookNum)), f(ot.bookNumberToId(t.bookNum)), d(t.chapterNum > 0 ? t.chapterNum : 0), g(!0), h.current.focus();
        },
        onFocus: () => {
          b.current = !0;
        },
        handleSubmit: P,
        placeholder: `${ot.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`
      }
    ) }),
<<<<<<< HEAD
    /* @__PURE__ */ s(
      or,
=======
    /* @__PURE__ */ i(
      wr,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: A,
        align: r === "ltr" ? "start" : "end",
        ref: k,
<<<<<<< HEAD
        children: /* @__PURE__ */ s("div", { className: "rtl:tw-ps-2", children: ua.map(($, F) => {
          const B = C($);
          return B.length > 0 && /* @__PURE__ */ x("div", { children: [
            /* @__PURE__ */ s(ar, { className: "tw-font-semibold tw-text-foreground/80", children: ic[$] }),
            B.map((D) => /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s(
              oc,
              {
                bookId: D,
                handleSelectBook: () => V(D, !1),
                isSelected: i === D,
                handleHighlightBook: () => f(D),
                handleKeyDown: Q,
                bookType: $,
                ref: (U) => {
                  i === D && (T.current = U);
                },
                children: /* @__PURE__ */ s(
                  ac,
                  {
                    handleSelectChapter: R,
                    endChapter: on(D),
                    activeChapter: t.bookNum === ot.bookIdToNumber(D) ? t.chapterNum : 0,
                    highlightedChapter: c,
                    handleHighlightedChapter: (U) => {
                      d(U);
                    }
                  }
                )
              }
            ) }, D)),
            ua.length - 1 !== F ? /* @__PURE__ */ s(ir, {}) : void 0
          ] }, $);
        }) })
=======
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
              /* @__PURE__ */ i(In, { className: "tw-font-semibold tw-text-foreground/80", children: $c[P] }),
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
                      endChapter: dn(j),
                      activeChapter: t.bookNum === at.bookIdToNumber(j) ? t.chapterNum : 0,
                      highlightedChapter: c,
                      handleHighlightedChapter: (V) => {
                        d(V);
                      }
                    }
                  )
                }
              ) }, j)),
              Sa.length - 1 !== G ? /* @__PURE__ */ i(fr, {}) : void 0
            ] }, P)
          )
        ] })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      }
    )
  ] }) });
}
<<<<<<< HEAD
const uc = We(
=======
const Vc = tn(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
), wt = S.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ s(r ? qe : "button", { className: N(uc({ variant: e, size: n, className: t })), ref: a, ...o })
);
wt.displayName = "Button";
const wc = We(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), At = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(li.Root, { ref: n, className: N("pr-twp", wc(), t), ...e }));
At.displayName = li.Root.displayName;
const Ti = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    gn.Root,
=======
), ft = E.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ i(r ? Qe : "button", { className: x(Vc({ variant: e, size: n, className: t })), ref: a, ...o })
);
ft.displayName = "Button";
const zc = tn(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), jt = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(Ni.Root, { ref: n, className: x("pr-twp", zc(), t), ...e }));
jt.displayName = Ni.Root.displayName;
const zi = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    Sn.Root,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      className: N("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: r
    }
  );
});
<<<<<<< HEAD
Ti.displayName = gn.Root.displayName;
const Kr = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  gn.Item,
=======
zi.displayName = Sn.Root.displayName;
const ro = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Sn.Item,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
<<<<<<< HEAD
    children: /* @__PURE__ */ s(gn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s(ai, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Kr.displayName = gn.Item.displayName;
const Ci = bn.Root, Oi = bn.Trigger, yo = S.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => {
  const a = xt();
  return /* @__PURE__ */ s(bn.Portal, { children: /* @__PURE__ */ s(
    bn.Content,
=======
    children: /* @__PURE__ */ i(Sn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i(ko, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
ro.displayName = Sn.Item.displayName;
const Fi = Tn.Root, Li = Tn.Trigger, Po = E.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => {
  const a = kt();
  return /* @__PURE__ */ i(Tn.Portal, { children: /* @__PURE__ */ i(
    Tn.Content,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
yo.displayName = bn.Content.displayName;
const fc = qt.Portal, Ri = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  qt.Overlay,
=======
Po.displayName = Tn.Content.displayName;
const Fc = Jt.Portal, Gi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Overlay,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Ri.displayName = qt.Overlay.displayName;
const mc = S.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = xt();
  return /* @__PURE__ */ x(fc, { children: [
    /* @__PURE__ */ s(Ri, {}),
    /* @__PURE__ */ x(
      qt.Content,
=======
Gi.displayName = Jt.Overlay.displayName;
const Lc = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = kt();
  return /* @__PURE__ */ b(Fc, { children: [
    /* @__PURE__ */ i(Gi, {}),
    /* @__PURE__ */ b(
      Jt.Content,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
            qt.Close,
            {
              className: N(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
<<<<<<< HEAD
                /* @__PURE__ */ s(uo, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Close" })
=======
                /* @__PURE__ */ i(Eo, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Close" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
              ]
            }
          )
        ]
      }
    )
  ] });
});
<<<<<<< HEAD
mc.displayName = qt.Content.displayName;
const hc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  qt.Title,
=======
Lc.displayName = Jt.Content.displayName;
const Gc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Title,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
<<<<<<< HEAD
hc.displayName = qt.Title.displayName;
const gc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  qt.Description,
=======
Gc.displayName = Jt.Title.displayName;
const Uc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Description,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
gc.displayName = qt.Description.displayName;
const xo = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t,
=======
Uc.displayName = Jt.Description.displayName;
const $o = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
xo.displayName = _t.displayName;
const No = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ s(ii, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ s(
      _t.Input,
=======
$o.displayName = $t.displayName;
const Io = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: r, children: [
    /* @__PURE__ */ i(yi, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ i(
      $t.Input,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
No.displayName = _t.Input.displayName;
const ko = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.List,
=======
Io.displayName = $t.Input.displayName;
const Mo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.List,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
<<<<<<< HEAD
ko.displayName = _t.List.displayName;
const Eo = S.forwardRef((t, e) => /* @__PURE__ */ s(_t.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Eo.displayName = _t.Empty.displayName;
const _i = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Group,
=======
Mo.displayName = $t.List.displayName;
const Ao = E.forwardRef((t, e) => /* @__PURE__ */ i($t.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Ao.displayName = $t.Empty.displayName;
const Ui = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.Group,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
_i.displayName = _t.Group.displayName;
const bc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Separator,
=======
Ui.displayName = $t.Group.displayName;
const Xc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.Separator,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
<<<<<<< HEAD
bc.displayName = _t.Separator.displayName;
const So = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Item,
=======
Xc.displayName = $t.Separator.displayName;
const Do = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  $t.Item,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
So.displayName = _t.Item.displayName;
function vc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Jr({
=======
Do.displayName = $t.Item.displayName;
function Hc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function oo({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  id: t,
  options: e = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: o,
  value: a,
  onChange: i = () => {
  },
<<<<<<< HEAD
  getOptionLabel: l = vc,
=======
  getOptionLabel: l = Hc,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ x(Ci, { open: h, onOpenChange: k, ...m, children: [
    /* @__PURE__ */ s(Oi, { asChild: !0, children: /* @__PURE__ */ x(
      wt,
=======
  return /* @__PURE__ */ b(Fi, { open: h, onOpenChange: k, ...m, children: [
    /* @__PURE__ */ i(Li, { asChild: !0, children: /* @__PURE__ */ b(
      ft,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
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
=======
          /* @__PURE__ */ i(xi, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      Po,
      {
        align: g,
        className: x("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ b($o, { children: [
          /* @__PURE__ */ i(Io, { placeholder: p, className: "tw-text-inherit" }),
          /* @__PURE__ */ i(Ao, { children: f }),
          /* @__PURE__ */ i(Mo, { children: e.map((T) => /* @__PURE__ */ b(
            Do,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            {
              value: l(T),
              onSelect: () => {
                i(T), k(!1);
              },
              children: [
                /* @__PURE__ */ s(
                  En,
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
<<<<<<< HEAD
function yc({
=======
function Yc({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ x(ne, { children: [
    /* @__PURE__ */ s(At, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ s(
      Jr,
=======
  return /* @__PURE__ */ b(te, { children: [
    /* @__PURE__ */ i(jt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ i(
      oo,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    /* @__PURE__ */ s(At, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ s(
      Jr,
=======
    /* @__PURE__ */ i(jt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ i(
      oo,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
var xc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(xc || {});
const Mm = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ir = (t, e) => t[e] ?? e;
function Am({
=======
var Wc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Wc || {});
const _h = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), zr = (t, e) => t[e] ?? e;
function Ph({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  const p = Ir(d, "%webView_bookSelector_currentBook%"), f = Ir(d, "%webView_bookSelector_choose%"), w = Ir(d, "%webView_bookSelector_chooseBooks%"), [g, v] = ut(
=======
  const p = zr(d, "%webView_bookSelector_currentBook%"), f = zr(d, "%webView_bookSelector_choose%"), w = zr(d, "%webView_bookSelector_chooseBooks%"), [g, y] = ut(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "current book"
    /* CURRENT_BOOK */
  ), m = (h) => {
    v(h), t(h);
  };
<<<<<<< HEAD
  return /* @__PURE__ */ s(
    Ti,
=======
  return /* @__PURE__ */ i(
    zi,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (h) => m(h),
<<<<<<< HEAD
      children: /* @__PURE__ */ x("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Kr, {
=======
      children: /* @__PURE__ */ b("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ b("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(ro, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ s(At, { className: "tw-ms-1", children: p })
          ] }),
<<<<<<< HEAD
          /* @__PURE__ */ s(At, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ s(
            yc,
=======
          /* @__PURE__ */ i(jt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ i(
            Yc,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Kr, {
=======
        /* @__PURE__ */ b("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(ro, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Nc({ table: t }) {
  return /* @__PURE__ */ x(fo, { children: [
    /* @__PURE__ */ s(Ws, { asChild: !0, children: /* @__PURE__ */ x(wt, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ s(Ks, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ x(or, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ s(ar, { children: "Toggle columns" }),
      /* @__PURE__ */ s(ir, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ s(
        mo,
=======
function qc({ table: t }) {
  return /* @__PURE__ */ b(To, { children: [
    /* @__PURE__ */ i(Ul, { asChild: !0, children: /* @__PURE__ */ b(ft, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ i(yl, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ b(wr, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ i(In, { children: "Toggle columns" }),
      /* @__PURE__ */ i(fr, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ i(
        Co,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const Ve = bt.Root, kc = bt.Group, ze = bt.Value, Ne = S.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = xt();
  return /* @__PURE__ */ x(
    bt.Trigger,
=======
const Ge = yt.Root, Kc = yt.Group, Ue = yt.Value, Te = E.forwardRef(({ className: t, children: e, ...n }, r) => {
  const o = kt();
  return /* @__PURE__ */ b(
    yt.Trigger,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        /* @__PURE__ */ s(bt.Icon, { asChild: !0, children: /* @__PURE__ */ s(nr, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
=======
        /* @__PURE__ */ i(yt.Icon, { asChild: !0, children: /* @__PURE__ */ i(pr, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      ]
    }
  );
});
<<<<<<< HEAD
Ne.displayName = bt.Trigger.displayName;
const Pi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.ScrollUpButton,
=======
Te.displayName = yt.Trigger.displayName;
const Xi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollUpButton,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
<<<<<<< HEAD
    children: /* @__PURE__ */ s(Js, { className: "tw-h-4 tw-w-4" })
  }
));
Pi.displayName = bt.ScrollUpButton.displayName;
const $i = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.ScrollDownButton,
=======
    children: /* @__PURE__ */ i(xl, { className: "tw-h-4 tw-w-4" })
  }
));
Xi.displayName = yt.ScrollUpButton.displayName;
const Hi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollDownButton,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
<<<<<<< HEAD
    children: /* @__PURE__ */ s(nr, { className: "tw-h-4 tw-w-4" })
  }
));
$i.displayName = bt.ScrollDownButton.displayName;
const ke = S.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => {
  const a = xt();
  return /* @__PURE__ */ s(bt.Portal, { children: /* @__PURE__ */ x(
    bt.Content,
=======
    children: /* @__PURE__ */ i(pr, { className: "tw-h-4 tw-w-4" })
  }
));
Hi.displayName = yt.ScrollDownButton.displayName;
const Ce = E.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => {
  const a = kt();
  return /* @__PURE__ */ i(yt.Portal, { children: /* @__PURE__ */ b(
    yt.Content,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        /* @__PURE__ */ s(Pi, {}),
        /* @__PURE__ */ s(
          bt.Viewport,
=======
        /* @__PURE__ */ i(Xi, {}),
        /* @__PURE__ */ i(
          yt.Viewport,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          {
            className: N(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ s("div", { dir: a, children: e })
          }
        ),
<<<<<<< HEAD
        /* @__PURE__ */ s($i, {})
=======
        /* @__PURE__ */ i(Hi, {})
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      ]
    }
  ) });
});
<<<<<<< HEAD
ke.displayName = bt.Content.displayName;
const Ec = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.Label,
=======
Ce.displayName = yt.Content.displayName;
const Jc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Label,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
<<<<<<< HEAD
Ec.displayName = bt.Label.displayName;
const Bt = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ x(
  bt.Item,
=======
Jc.displayName = yt.Label.displayName;
const zt = E.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ b(
  yt.Item,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(bt.ItemIndicator, { children: /* @__PURE__ */ s(En, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ s(bt.ItemText, { children: e })
    ]
  }
));
<<<<<<< HEAD
Bt.displayName = bt.Item.displayName;
const Sc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.Separator,
=======
zt.displayName = yt.Item.displayName;
const Zc = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Separator,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
Sc.displayName = bt.Separator.displayName;
function Tc({ table: t }) {
  return /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
=======
Zc.displayName = yt.Separator.displayName;
function Qc({ table: t }) {
  return /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ b("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ s(Zs, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ i(Nl, { className: "tw-h-4 tw-w-4" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ s(Qs, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ i(kl, { className: "tw-h-4 tw-w-4" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ s(tl, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ i(El, { className: "tw-h-4 tw-w-4" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ s(el, { className: "tw-h-4 tw-w-4" })
=======
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ i(Sl, { className: "tw-h-4 tw-w-4" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          ]
        }
      )
    ] })
  ] }) });
}
<<<<<<< HEAD
const sr = S.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ s("div", { className: N("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ s(
=======
const mr = E.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i("div", { className: x("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  "table",
  {
    ref: r,
    className: N("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
<<<<<<< HEAD
sr.displayName = "Table";
const lr = S.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ s(
=======
mr.displayName = "Table";
const hr = E.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
lr.displayName = "TableHeader";
const cr = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("tbody", { ref: n, className: N("[&_tr:last-child]:tw-border-0", t), ...e }));
cr.displayName = "TableBody";
const Cc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
hr.displayName = "TableHeader";
const gr = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: x("[&_tr:last-child]:tw-border-0", t), ...e }));
gr.displayName = "TableBody";
const td = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  "tfoot",
  {
    ref: n,
    className: N("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
<<<<<<< HEAD
Cc.displayName = "TableFooter";
const ie = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
td.displayName = "TableFooter";
const de = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
ie.displayName = "TableRow";
const vn = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
de.displayName = "TableRow";
const Cn = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
vn.displayName = "TableHead";
const Fe = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
Cn.displayName = "TableHead";
const Xe = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  "td",
  {
    ref: n,
    className: N("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
<<<<<<< HEAD
Fe.displayName = "TableCell";
const Oc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
Xe.displayName = "TableCell";
const ed = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  "caption",
  {
    ref: n,
    className: N("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
Oc.displayName = "TableCaption";
function Rc({
=======
ed.displayName = "TableCaption";
function nd({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  const [l, c] = ut([]), [d, p] = ut([]), [f, w] = ut({}), [g, v] = ut({}), m = ci({
    data: e,
    columns: t,
    getCoreRowModel: pi(),
    ...n && { getPaginationRowModel: kl() },
    onSortingChange: c,
    getSortedRowModel: di(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Nl(),
=======
  const [l, c] = ut([]), [d, p] = ut([]), [f, w] = ut({}), [g, y] = ut({}), m = ki({
    data: e,
    columns: t,
    getCoreRowModel: Ei(),
    ...n && { getPaginationRowModel: ql() },
    onSortingChange: c,
    getSortedRowModel: Si(),
    onColumnFiltersChange: p,
    getFilteredRowModel: Kl(),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    onColumnVisibilityChange: w,
    onRowSelectionChange: v,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: f,
      rowSelection: g
    }
  });
<<<<<<< HEAD
  return /* @__PURE__ */ x("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ s(Nc, { table: m }),
    /* @__PURE__ */ x(sr, { stickyHeader: a, children: [
      /* @__PURE__ */ s(lr, { stickyHeader: a, children: m.getHeaderGroups().map((k) => /* @__PURE__ */ s(ie, { children: k.headers.map((T) => /* @__PURE__ */ s(vn, { children: T.isPlaceholder ? void 0 : wn(T.column.columnDef.header, T.getContext()) }, T.id)) }, k.id)) }),
      /* @__PURE__ */ s(cr, { children: (h = m.getRowModel().rows) != null && h.length ? m.getRowModel().rows.map((k) => /* @__PURE__ */ s(
        ie,
=======
  return /* @__PURE__ */ b("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ i(qc, { table: m }),
    /* @__PURE__ */ b(mr, { stickyHeader: a, children: [
      /* @__PURE__ */ i(hr, { stickyHeader: a, children: m.getHeaderGroups().map((k) => /* @__PURE__ */ i(de, { children: k.headers.map((T) => /* @__PURE__ */ i(Cn, { children: T.isPlaceholder ? void 0 : yn(T.column.columnDef.header, T.getContext()) }, T.id)) }, k.id)) }),
      /* @__PURE__ */ i(gr, { children: (h = m.getRowModel().rows) != null && h.length ? m.getRowModel().rows.map((k) => /* @__PURE__ */ i(
        de,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    n && r && /* @__PURE__ */ s(Tc, { table: m })
  ] });
}
function _c({
=======
    n && r && /* @__PURE__ */ i(Qc, { table: m })
  ] });
}
function rd({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Ct(() => {
    const i = [];
    return t.forEach((l) => {
<<<<<<< HEAD
      i.some((c) => wo(c, l)) || i.push(l);
    }), i;
  }, [t]);
  return /* @__PURE__ */ x(sr, { stickyHeader: !0, children: [
    /* @__PURE__ */ s(lr, { stickyHeader: !0, children: /* @__PURE__ */ x(ie, { children: [
      /* @__PURE__ */ s(vn, { children: r }),
      /* @__PURE__ */ s(vn, { children: o })
    ] }) }),
    /* @__PURE__ */ s(cr, { children: a.length > 0 && a.map((i) => /* @__PURE__ */ x(
      ie,
=======
      s.some((c) => So(c, l)) || s.push(l);
    }), s;
  }, [t]);
  return /* @__PURE__ */ b(mr, { stickyHeader: !0, children: [
    /* @__PURE__ */ i(hr, { stickyHeader: !0, children: /* @__PURE__ */ b(de, { children: [
      /* @__PURE__ */ i(Cn, { children: r }),
      /* @__PURE__ */ i(Cn, { children: o })
    ] }) }),
    /* @__PURE__ */ i(gr, { children: a.length > 0 && a.map((s) => /* @__PURE__ */ b(
      de,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const To = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  qr.Root,
=======
const jo = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  eo.Root,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
<<<<<<< HEAD
    children: /* @__PURE__ */ s(
      qr.Indicator,
=======
    children: /* @__PURE__ */ i(
      eo.Indicator,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      {
        className: N("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ s(En, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
<<<<<<< HEAD
To.displayName = qr.Root.displayName;
const Pc = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), wa = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, $c = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? ot.bookIdToNumber(e[1]) : 0;
}, Ic = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ii = We(
=======
jo.displayName = eo.Root.displayName;
const od = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ta = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, ad = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? at.bookIdToNumber(e[1]) : 0;
}, id = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Yi = tn(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
), Mc = S.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ s(
  ui.Root,
  {
    ref: o,
    className: N(Ii({ variant: e, size: n, className: t })),
    ...r
  }
));
Mc.displayName = ui.Root.displayName;
const Mi = S.createContext({
  size: "default",
  variant: "default"
}), Ai = S.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => {
  const i = xt();
  return /* @__PURE__ */ s(
    rr.Root,
=======
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
    ur.Root,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      ref: a,
      className: N("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
<<<<<<< HEAD
      dir: i,
      children: /* @__PURE__ */ s(
        Mi.Provider,
=======
      dir: s,
      children: /* @__PURE__ */ i(
        Wi.Provider,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        {
          value: { variant: e, size: n },
          children: r
        }
      )
    }
  );
});
<<<<<<< HEAD
Ai.displayName = rr.Root.displayName;
const Gn = S.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const i = S.useContext(Mi);
  return /* @__PURE__ */ s(
    rr.Item,
    {
      ref: a,
      className: N(
        Ii({
          variant: i.variant || n,
          size: i.size || r
=======
qi.displayName = ur.Root.displayName;
const Qn = E.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const s = E.useContext(Wi);
  return /* @__PURE__ */ i(
    ur.Item,
    {
      ref: a,
      className: x(
        Yi({
          variant: s.variant || n,
          size: s.size || r
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
<<<<<<< HEAD
Gn.displayName = rr.Item.displayName;
const dr = (t) => t === "asc" ? /* @__PURE__ */ s(al, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ s(il, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ s(sl, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Dm = (t) => ({
=======
Qn.displayName = ur.Item.displayName;
const br = (t) => t === "asc" ? /* @__PURE__ */ i(Ol, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ i(_l, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ i(Pl, { className: "tw-ms-2 tw-h-4 tw-w-4" }), $h = (t) => ({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    dr(e.getIsSorted())
  ] })
}), Ac = (t, e) => ({
=======
    br(e.getIsSorted())
  ] })
}), ld = (t, e) => ({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    dr(n.getIsSorted())
  ] })
}), jm = (t) => ({
=======
    br(n.getIsSorted())
  ] })
}), Ih = (t) => ({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    dr(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Mr = (t, e, n, r, o, a) => {
  let i = [...n];
=======
    br(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Fr = (t, e, n, r, o, a) => {
  let s = [...n];
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((d) => d !== c);
  }), r(i);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
<<<<<<< HEAD
}, Bm = (t, e, n, r, o) => ({
=======
}, Mh = (t, e, n, r, o) => ({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ x(wt, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    dr(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const i = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ x(Ai, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ s(
        Gn,
        {
          onClick: () => Mr(
=======
    br(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const s = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ b(qi, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ i(
        Qn,
        {
          onClick: () => Fr(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            [l],
            "approved",
            e,
            n,
            r,
            o
          ),
          value: "approved",
<<<<<<< HEAD
          children: /* @__PURE__ */ s(nl, {})
        }
      ),
      /* @__PURE__ */ s(
        Gn,
        {
          onClick: () => Mr(
=======
          children: /* @__PURE__ */ i(Tl, {})
        }
      ),
      /* @__PURE__ */ i(
        Qn,
        {
          onClick: () => Fr(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            [l],
            "unapproved",
            e,
            n,
            r,
            o
          ),
          value: "unapproved",
<<<<<<< HEAD
          children: /* @__PURE__ */ s(rl, {})
        }
      ),
      /* @__PURE__ */ s(
        Gn,
        {
          onClick: () => Mr(
=======
          children: /* @__PURE__ */ i(Cl, {})
        }
      ),
      /* @__PURE__ */ i(
        Qn,
        {
          onClick: () => Fr(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            [l],
            "unknown",
            e,
            n,
            r,
            o
          ),
          value: "unknown",
<<<<<<< HEAD
          children: /* @__PURE__ */ s(ol, {})
=======
          children: /* @__PURE__ */ i(Rl, {})
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        }
      )
    ] });
  }
<<<<<<< HEAD
}), Vm = Object.freeze([
=======
}), Ah = Object.freeze([
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
]), Dc = (t, e, n) => {
=======
]), cd = (t, e, n) => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
<<<<<<< HEAD
}, jc = (t, e, n, r, o) => {
  if (!t) return [];
  const a = [];
  let i = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return Pc(t).forEach((p) => {
    p.startsWith("\\id") && (i = $c(p), l = 0, c = 0), p.startsWith("\\c") && (l = wa(p), c = 0), p.startsWith("\\v") && (c = wa(p), l === 0 && (l = e.chapterNum));
=======
}, dd = (t, e, n, r, o) => {
  if (!t)
    return [];
  const a = [];
  let s = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return od(t).forEach((p) => {
    p.startsWith("\\id") && (s = ad(p), l = 0, c = 0), p.startsWith("\\c") && (l = Ta(p), c = 0), p.startsWith("\\v") && (c = Ta(p), l === 0 && (l = e.chapterNum));
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    let f = o.exec(p) ?? void 0;
    for (; f; ) {
      const w = [];
      f.forEach((h) => w.push(h));
<<<<<<< HEAD
      const g = f.index, v = a.find((h) => wo(h.items, w)), m = {
=======
      const g = f.index, y = a.find((h) => So(h.items, w)), m = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        reference: {
          bookNum: i !== void 0 ? i : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
<<<<<<< HEAD
        text: vl(p, Math.max(0, g - 25), Math.min(g + 25, p.length))
=======
        text: Hl(p, Math.max(0, g - 25), Math.min(g + 25, p.length))
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      };
      if (v)
        v.count += 1, v.occurrences.push(m);
      else {
        const h = {
          items: w,
          count: 1,
<<<<<<< HEAD
          status: Ic(w[0], n, r),
=======
          status: id(w[0], n, r),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          occurrences: [m]
        };
        a.push(h);
      }
      f = o.exec(p) ?? void 0;
    }
  }), a;
<<<<<<< HEAD
}, Zt = (t, e) => t[e] ?? e;
function zm({
=======
}, ne = (t, e) => t[e] ?? e;
function Dh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  ), [E, b] = ut(!1), [I, V] = ut("all"), [R, P] = ut(""), [G, A] = ut([]), Q = Ct(() => l ? r instanceof RegExp ? jc(
=======
  ), [S, v] = ut(!1), [I, B] = ut("all"), [O, $] = ut(""), [L, A] = ut([]), Q = Ot(() => l ? r instanceof RegExp ? dd(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    l,
    t,
    a,
    i,
    r
<<<<<<< HEAD
  ) : r(l, t, a, i) : [], [l, r, t, a, i]), $ = Ct(() => {
    if (E) return Q;
    const y = [];
    return Q.forEach((O) => {
      const X = O.items[0], Y = y.find(
        (L) => L.items[0] === X
=======
  ) : r(l, t, a, s) : [], [l, r, t, a, s]), P = Ot(() => {
    if (S)
      return Q;
    const N = [];
    return Q.forEach((R) => {
      const U = R.items[0], X = N.find(
        (F) => F.items[0] === U
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      );
      Y ? (Y.count += O.count, Y.occurrences = Y.occurrences.concat(O.occurrences)) : y.push({
        items: [X],
        count: O.count,
        occurrences: O.occurrences,
        status: O.status
      });
<<<<<<< HEAD
    }), y;
  }, [E, Q]), F = Ct(() => Dc($, I, R), [$, I, R]), B = Ct(() => {
    var X, Y;
    if (!E) return p;
    const y = (X = o == null ? void 0 : o.tableHeaders) == null ? void 0 : X.length;
    if (!y) return p;
    const O = [];
    for (let L = 0; L < y; L++)
      O.push(
        Ac(
          ((Y = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Y[L]) || "Additional Item",
          L + 1
        )
      );
    return [...O, ...p];
  }, [o == null ? void 0 : o.tableHeaders, p, E]);
  se(() => {
    A([]);
  }, [F]);
  const D = (y, O) => {
    O.setRowSelection(() => {
      const X = {};
      return X[y.index] = !0, X;
    }), A(y.original.items);
  }, U = (y) => {
    if (y === "book" || y === "chapter" || y === "verse")
      d(y);
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    else
      throw new Error(`Invalid scope value: ${y}`);
  }, nt = (y) => {
    if (y === "all" || y === "approved" || y === "unapproved" || y === "unknown")
      V(y);
    else
<<<<<<< HEAD
      throw new Error(`Invalid status filter value: ${y}`);
  }, at = Ct(() => {
    if ($.length === 0 || G.length === 0) return [];
    const y = $.filter((O) => wo(
      E ? O.items : [O.items[0]],
      G
    ));
    if (y.length > 1) throw new Error("Selected item is not unique");
    return y[0].occurrences;
  }, [G, E, $]);
  return /* @__PURE__ */ x("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ x(
        Ve,
=======
      throw new Error(`Invalid status filter value: ${N}`);
  }, ot = Ot(() => {
    if (P.length === 0 || L.length === 0)
      return [];
    const N = P.filter((R) => So(
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
        Ge,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        {
          onValueChange: (y) => nt(y),
          defaultValue: I,
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
      /* @__PURE__ */ x(Ve, { onValueChange: (y) => U(y), defaultValue: c, children: [
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
            P(y.target.value);
          }
        }
      ),
<<<<<<< HEAD
      o && /* @__PURE__ */ x("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ s(
          To,
          {
            className: "tw-m-1",
            checked: E,
            onCheckedChange: (y) => {
              A([]), b(y);
=======
      o && /* @__PURE__ */ b("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ i(
          jo,
          {
            className: "tw-m-1",
            checked: S,
            onCheckedChange: (N) => {
              A([]), v(N);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            }
          }
        ),
        /* @__PURE__ */ s(At, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
<<<<<<< HEAD
    /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      Rc,
=======
    /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      nd,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      {
        columns: B,
        data: F,
        onRowClickHandler: D,
        stickyHeader: !0
      }
    ) }),
<<<<<<< HEAD
    at.length > 0 && /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      _c,
=======
    ot.length > 0 && /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      rd,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      {
        occurrenceData: at,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
<<<<<<< HEAD
function Bc({
=======
function pd({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
      const C = n.includes(k.value), S = n.includes(T.value);
      return C && !S ? -1 : !C && S ? 1 : k.label.localeCompare(T.label);
    });
    return [...m, ...h];
  }, [t, n, l]);
<<<<<<< HEAD
  return /* @__PURE__ */ s("div", { className: d, children: /* @__PURE__ */ x(Ci, { open: p, onOpenChange: f, children: [
    /* @__PURE__ */ s(Oi, { asChild: !0, children: /* @__PURE__ */ x(
      wt,
=======
  return /* @__PURE__ */ i("div", { className: d, children: /* @__PURE__ */ b(Fi, { open: p, onOpenChange: f, children: [
    /* @__PURE__ */ i(Li, { asChild: !0, children: /* @__PURE__ */ b(
      ft,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
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
=======
          /* @__PURE__ */ i(xi, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(Po, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ b($o, { children: [
      /* @__PURE__ */ i(Io, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ b(Mo, { children: [
        /* @__PURE__ */ i(Ao, { children: a }),
        /* @__PURE__ */ i(Ui, { children: y.map((m) => {
          const h = e ? e(m) : void 0;
          return /* @__PURE__ */ b(
            Do,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            {
              value: m.label,
              onSelect: w,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ s("div", { className: "w-4", children: /* @__PURE__ */ s(
                  En,
                  {
                    className: N(
                      "tw-h-4 tw-w-4",
                      n.includes(m.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
<<<<<<< HEAD
                /* @__PURE__ */ s("div", { className: "tw-w-4", children: m.starred && /* @__PURE__ */ s(ll, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ s("div", { className: "tw-flex-grow", children: m.label }),
                e && /* @__PURE__ */ s("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: h })
=======
                /* @__PURE__ */ i("div", { className: "tw-w-4", children: m.starred && /* @__PURE__ */ i($l, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ i("div", { className: "tw-flex-grow", children: m.label }),
                e && /* @__PURE__ */ i("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: h })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
              ]
            },
            m.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
<<<<<<< HEAD
function Di({
=======
function Ki({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: r,
  className: o
}) {
<<<<<<< HEAD
  const a = xt();
  return /* @__PURE__ */ x("div", { className: N("tw-relative", { "tw-w-full": r }, o), children: [
    /* @__PURE__ */ s(
      ii,
=======
  const a = kt();
  return /* @__PURE__ */ b("div", { className: x("tw-relative", { "tw-w-full": r }, o), children: [
    /* @__PURE__ */ i(
      yi,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
          /* @__PURE__ */ s(uo, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Clear" })
=======
          /* @__PURE__ */ i(Eo, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Clear" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        ]
      }
    )
  ] });
}
<<<<<<< HEAD
const ji = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    Pt.Root,
=======
const Ji = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    It.Root,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      orientation: "vertical",
      ref: n,
      className: N("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: r
    }
  );
});
<<<<<<< HEAD
ji.displayName = Pt.List.displayName;
const Bi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.List,
=======
Ji.displayName = It.List.displayName;
const Zi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.List,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Bi.displayName = Pt.List.displayName;
const Vc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Trigger,
=======
Zi.displayName = It.List.displayName;
const ud = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Trigger,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    ...e,
    className: N(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
<<<<<<< HEAD
)), Vi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Content,
=======
)), Qi = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Content,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Vi.displayName = Pt.Content.displayName;
function Fm({
=======
Qi.displayName = It.Content.displayName;
function jh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: r,
  headerTitle: o,
  searchClassName: a
}) {
<<<<<<< HEAD
  return /* @__PURE__ */ x("div", { className: "pr-twp", children: [
    /* @__PURE__ */ x("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ s("h1", { children: o }) : "",
      /* @__PURE__ */ s(
        Di,
=======
  return /* @__PURE__ */ b("div", { className: "pr-twp", children: [
    /* @__PURE__ */ b("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      o ? /* @__PURE__ */ i("h1", { children: o }) : "",
      /* @__PURE__ */ i(
        Ki,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        {
          className: a,
          value: e,
          onSearch: n,
          placeholder: r
        }
      )
    ] }),
<<<<<<< HEAD
    /* @__PURE__ */ x(ji, { children: [
      /* @__PURE__ */ s(Bi, { children: t.map((i) => /* @__PURE__ */ s(Vc, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ s(Vi, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const Co = S.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ s(
  wi.Root,
=======
    /* @__PURE__ */ b(Ji, { children: [
      /* @__PURE__ */ i(Zi, { children: t.map((s) => /* @__PURE__ */ i(ud, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ i(Qi, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
const Bo = E.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ i(
  Ci.Root,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Co.displayName = wi.Root.displayName;
function fa({ className: t, ...e }) {
  return /* @__PURE__ */ s(
=======
Bo.displayName = Ci.Root.displayName;
function Ca({ className: t, ...e }) {
  return /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      className: N("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
<<<<<<< HEAD
const zc = Sn.Provider, Fc = Sn.Root, Lc = Sn.Trigger, zi = S.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ s(
  Sn.Content,
=======
const wd = $n.Provider, fd = $n.Root, md = $n.Trigger, ts = E.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(
  $n.Content,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
zi.displayName = Sn.Content.displayName;
const Gc = "16rem", Uc = "3rem", Fi = S.createContext(void 0);
function pr() {
  const t = S.useContext(Fi);
=======
ts.displayName = $n.Content.displayName;
const hd = "16rem", gd = "3rem", es = E.createContext(void 0);
function vr() {
  const t = E.useContext(es);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
<<<<<<< HEAD
const Li = S.forwardRef(
=======
const ns = E.forwardRef(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
    const [d, p] = E.useState(t), f = e ?? d, w = E.useCallback(
      (C) => {
        const S = typeof C == "function" ? C(f) : C;
        n ? n(S) : p(S);
      },
      [n, f]
<<<<<<< HEAD
    ), g = S.useCallback(() => w((C) => !C), [w]), v = f ? "expanded" : "collapsed", k = xt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", T = S.useMemo(
=======
    ), g = E.useCallback(() => w((C) => !C), [w]), y = f ? "expanded" : "collapsed", k = kt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", T = E.useMemo(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      () => ({
        state: v,
        open: f,
        setOpen: w,
        toggleSidebar: g,
        side: k
      }),
      [v, f, w, g, k]
    );
<<<<<<< HEAD
    return /* @__PURE__ */ s(Fi.Provider, { value: T, children: /* @__PURE__ */ s(zc, { delayDuration: 0, children: /* @__PURE__ */ s(
=======
    return /* @__PURE__ */ i(es.Provider, { value: T, children: /* @__PURE__ */ i(wd, { delayDuration: 0, children: /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
<<<<<<< HEAD
            "--sidebar-width": Gc,
            "--sidebar-width-icon": Uc,
=======
            "--sidebar-width": hd,
            "--sidebar-width-icon": gd,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Li.displayName = "SidebarProvider";
const Gi = S.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: r, ...o }, a) => {
  const i = pr();
  return e === "none" ? /* @__PURE__ */ s(
=======
ns.displayName = "SidebarProvider";
const rs = E.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: r, ...o }, a) => {
  const s = vr();
  return e === "none" ? /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Gi.displayName = "Sidebar";
const Xc = S.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const o = pr();
  return /* @__PURE__ */ x(
    wt,
=======
rs.displayName = "Sidebar";
const bd = E.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const o = vr();
  return /* @__PURE__ */ b(
    ft,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        o.side === "primary" ? /* @__PURE__ */ s(cl, {}) : /* @__PURE__ */ s(dl, {}),
        /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
=======
        o.side === "primary" ? /* @__PURE__ */ i(Il, {}) : /* @__PURE__ */ i(Ml, {}),
        /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      ]
    }
  );
});
<<<<<<< HEAD
Xc.displayName = "SidebarTrigger";
const Yc = S.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = pr();
    return /* @__PURE__ */ s(
=======
bd.displayName = "SidebarTrigger";
const vd = E.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = vr();
    return /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Yc.displayName = "SidebarRail";
const Ui = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
vd.displayName = "SidebarRail";
const os = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Ui.displayName = "SidebarInset";
const Hc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Ke,
=======
os.displayName = "SidebarInset";
const yd = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  en,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Hc.displayName = "SidebarInput";
const qc = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
yd.displayName = "SidebarInput";
const xd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: N("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
<<<<<<< HEAD
qc.displayName = "SidebarHeader";
const Wc = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
xd.displayName = "SidebarHeader";
const Nd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: N("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Wc.displayName = "SidebarFooter";
const Kc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Co,
=======
Nd.displayName = "SidebarFooter";
const kd = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Bo,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    "data-sidebar": "separator",
    className: N("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
<<<<<<< HEAD
Kc.displayName = "SidebarSeparator";
const Xi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
kd.displayName = "SidebarSeparator";
const as = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Xi.displayName = "SidebarContent";
const Zr = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
as.displayName = "SidebarContent";
const ao = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: N("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Zr.displayName = "SidebarGroup";
const Qr = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ s(
  e ? qe : "div",
=======
ao.displayName = "SidebarGroup";
const io = E.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Qe : "div",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Qr.displayName = "SidebarGroupLabel";
const Jc = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ s(
  e ? qe : "button",
=======
io.displayName = "SidebarGroupLabel";
const Ed = E.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Qe : "button",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Jc.displayName = "SidebarGroupAction";
const to = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
Ed.displayName = "SidebarGroupAction";
const so = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: N("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
<<<<<<< HEAD
to.displayName = "SidebarGroupContent";
const Yi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
so.displayName = "SidebarGroupContent";
const is = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: N("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Yi.displayName = "SidebarMenu";
const Hi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
is.displayName = "SidebarMenu";
const ss = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: N("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Hi.displayName = "SidebarMenuItem";
const Zc = We(
=======
ss.displayName = "SidebarMenuItem";
const Sd = tn(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
), qi = S.forwardRef(
=======
), ls = E.forwardRef(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...i
  }, l) => {
<<<<<<< HEAD
    const c = t ? qe : "button", { state: d } = pr(), p = /* @__PURE__ */ s(
=======
    const c = t ? Qe : "button", { state: d } = vr(), p = /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
<<<<<<< HEAD
        className: N(Zc({ variant: n, size: r }), a),
        ...i
=======
        className: x(Sd({ variant: n, size: r }), a),
        ...s
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
<<<<<<< HEAD
    }), /* @__PURE__ */ x(Fc, { children: [
      /* @__PURE__ */ s(Lc, { asChild: !0, children: p }),
      /* @__PURE__ */ s(zi, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : p;
  }
);
qi.displayName = "SidebarMenuButton";
const Qc = S.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ s(
  e ? qe : "button",
=======
    }), /* @__PURE__ */ b(fd, { children: [
      /* @__PURE__ */ i(md, { asChild: !0, children: p }),
      /* @__PURE__ */ i(ts, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : p;
  }
);
ls.displayName = "SidebarMenuButton";
const Td = E.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ i(
  e ? Qe : "button",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Qc.displayName = "SidebarMenuAction";
const td = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
Td.displayName = "SidebarMenuAction";
const Cd = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
td.displayName = "SidebarMenuBadge";
const ed = S.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = S.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ x(
=======
Cd.displayName = "SidebarMenuBadge";
const Rd = E.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = E.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ b(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: N("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
<<<<<<< HEAD
        e && /* @__PURE__ */ s(fa, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ s(
          fa,
=======
        e && /* @__PURE__ */ i(Ca, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ i(
          Ca,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
ed.displayName = "SidebarMenuSkeleton";
const nd = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
Rd.displayName = "SidebarMenuSkeleton";
const Od = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
nd.displayName = "SidebarMenuSub";
const rd = S.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ s("li", { ref: e, ...t })
);
rd.displayName = "SidebarMenuSubItem";
const od = S.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ s(
  t ? qe : "a",
=======
Od.displayName = "SidebarMenuSub";
const _d = E.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ i("li", { ref: e, ...t })
);
_d.displayName = "SidebarMenuSubItem";
const Pd = E.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ i(
  t ? Qe : "a",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
od.displayName = "SidebarMenuSubButton";
function ad({
=======
Pd.displayName = "SidebarMenuSubButton";
function $d({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ s(
    Gi,
=======
  return /* @__PURE__ */ i(
    rs,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: "tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",
<<<<<<< HEAD
      children: /* @__PURE__ */ x(Xi, { children: [
        /* @__PURE__ */ x(Zr, { children: [
          /* @__PURE__ */ s(Qr, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ s(to, { children: /* @__PURE__ */ s(Yi, { children: e.map((f) => /* @__PURE__ */ s(Hi, { children: /* @__PURE__ */ s(
            qi,
=======
      children: /* @__PURE__ */ b(as, { children: [
        /* @__PURE__ */ b(ao, { children: [
          /* @__PURE__ */ i(io, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ i(so, { children: /* @__PURE__ */ i(is, { children: e.map((f) => /* @__PURE__ */ i(ss, { children: /* @__PURE__ */ i(
            ls,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        /* @__PURE__ */ x(Zr, { children: [
          /* @__PURE__ */ s(Qr, { className: "tw-text-sm tw-text-gray-400", children: i }),
          /* @__PURE__ */ s(to, { className: "tw-pl-3", children: /* @__PURE__ */ s(
            Jr,
=======
        /* @__PURE__ */ b(ao, { children: [
          /* @__PURE__ */ i(io, { className: "tw-text-sm tw-text-gray-400", children: s }),
          /* @__PURE__ */ i(so, { className: "tw-pl-3", children: /* @__PURE__ */ i(
            oo,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Lm({
=======
function Bh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ x("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3", children: [
    /* @__PURE__ */ s("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ s(
      Di,
=======
  return /* @__PURE__ */ b("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3", children: [
    /* @__PURE__ */ i("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ i(
      Ki,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
<<<<<<< HEAD
    /* @__PURE__ */ x(Li, { id: t, className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto", children: [
      /* @__PURE__ */ s(
        ad,
=======
    /* @__PURE__ */ b(ns, { id: t, className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto", children: [
      /* @__PURE__ */ i(
        $d,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      /* @__PURE__ */ s(Ui, { className: "tw-overflow-y-auto", children: r })
    ] })
  ] });
}
const oe = "scrBook", id = "scrRef", fe = "source", sd = "details", ld = "Scripture Reference", cd = "Scripture Book", Wi = "Type", dd = "Details";
function pd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${ot.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: oe,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? ld,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ot.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === oe ? Pr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Hr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Pr(r.start),
      id,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Pr(o.start);
      },
      sortingFn: (r, o) => Hr(r.original.start, o.original.start),
=======
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
        return r.row.getIsGrouped() ? at.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === le ? Br(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => to(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Br(r.start),
      id: Id,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Br(o.start);
      },
      sortingFn: (r, o) => to(r.original.start, o.original.start),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
<<<<<<< HEAD
      id: fe,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Wi : void 0,
=======
      id: be,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? cs : void 0,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
<<<<<<< HEAD
      id: sd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? dd,
=======
      id: Md,
      header: (t == null ? void 0 : t.detailsColumnName) ?? jd,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
<<<<<<< HEAD
const ud = (t) => {
=======
const Vd = (t) => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
<<<<<<< HEAD
  return t.end && ({ offset: n } = t.end), !t.end || Hr(t.start, t.end) === 0 ? `${$r(t.start)}+${e}` : `${$r(t.start)}+${e}-${$r(t.end)}+${n}`;
}, ma = (t) => `${ud({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Gm({
=======
  return t.end && ({ offset: n } = t.end), !t.end || to(t.start, t.end) === 0 ? `${Vr(t.start)}+${e}` : `${Vr(t.start)}+${e}-${Vr(t.end)}+${n}`;
}, Ra = (t) => `${Vd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Vh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
    () => t.flatMap((R) => R.data.map((P) => ({
      ...P,
      source: R.source
    }))),
    [t]
<<<<<<< HEAD
  ), m = Ct(
    () => pd(
=======
  ), m = Ot(
    () => Bd(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  const h = ci({
    data: v,
=======
  const h = ki({
    data: y,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    columns: m,
    state: {
      grouping: c,
      sorting: p,
      rowSelection: w
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
<<<<<<< HEAD
    getExpandedRowModel: Sl(),
    getGroupedRowModel: El(),
    getCoreRowModel: pi(),
    getSortedRowModel: di(),
    getRowId: ma,
=======
    getExpandedRowModel: Jl(),
    getGroupedRowModel: Zl(),
    getCoreRowModel: Ei(),
    getSortedRowModel: Si(),
    getRowId: Ra,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  se(() => {
    if (l) {
<<<<<<< HEAD
      const R = h.getSelectedRowModel().rowsById, P = Object.keys(R);
      if (P.length === 1) {
        const G = v.find((A) => ma(A) === P[0]) || void 0;
        G && l(G);
      }
    }
  }, [w, v, l, h]);
  const k = o ?? cd, T = a ?? Wi, C = [
=======
      const O = h.getSelectedRowModel().rowsById, $ = Object.keys(O);
      if ($.length === 1) {
        const L = y.find((A) => Ra(A) === $[0]) || void 0;
        L && l(L);
      }
    }
  }, [w, y, l, h]);
  const k = o ?? Dd, T = a ?? cs, C = [
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  ], E = (R) => {
    d(JSON.parse(R));
  }, b = (R, P) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(P);
  }, I = (R, P) => R.getIsGrouped() ? "" : N("banded-row", P % 2 === 0 ? "even" : "odd"), V = (R, P, G) => {
    if (!((R == null ? void 0 : R.length) === 0 || P.depth < G.column.getGroupedIndex())) {
      if (P.getIsGrouped())
        switch (P.depth) {
=======
  ], S = (O) => {
    d(JSON.parse(O));
  }, v = (O, $) => {
    !O.getIsGrouped() && !O.getIsSelected() && O.getToggleSelectedHandler()($);
  }, I = (O, $) => O.getIsGrouped() ? "" : x("banded-row", $ % 2 === 0 ? "even" : "odd"), B = (O, $, L) => {
    if (!((O == null ? void 0 : O.length) === 0 || $.depth < L.column.getGroupedIndex())) {
      if ($.getIsGrouped())
        switch ($.depth) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (P.depth) {
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
<<<<<<< HEAD
        onValueChange: (R) => {
          E(R);
        },
        children: [
          /* @__PURE__ */ s(Ne, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ s(ze, {}) }),
          /* @__PURE__ */ s(ke, { position: "item-aligned", children: /* @__PURE__ */ s(kc, { children: C.map((R) => /* @__PURE__ */ s(Bt, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ x(sr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ s(lr, { children: h.getHeaderGroups().map((R) => /* @__PURE__ */ s(ie, { children: R.headers.filter((P) => P.column.columnDef.header).map((P) => (
=======
        onValueChange: (O) => {
          S(O);
        },
        children: [
          /* @__PURE__ */ i(Te, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ i(Ue, {}) }),
          /* @__PURE__ */ i(Ce, { position: "item-aligned", children: /* @__PURE__ */ i(Kc, { children: C.map((O) => /* @__PURE__ */ i(zt, { value: JSON.stringify(O.value), children: O.label }, O.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ b(mr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ i(hr, { children: h.getHeaderGroups().map((O) => /* @__PURE__ */ i(de, { children: O.headers.filter(($) => $.column.columnDef.header).map(($) => (
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ s(vn, { colSpan: P.colSpan, className: "top-0 tw-sticky", children: P.isPlaceholder ? void 0 : /* @__PURE__ */ x("div", { children: [
          P.column.getCanGroup() ? /* @__PURE__ */ s(
            wt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${P.column.columnDef.header}`,
              onClick: P.column.getToggleGroupingHandler(),
              type: "button",
              children: P.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
<<<<<<< HEAD
          wn(P.column.columnDef.header, P.getContext())
        ] }) }, P.id)
      )) }, R.id)) }),
      /* @__PURE__ */ s(cr, { children: h.getRowModel().rows.map((R, P) => {
        const G = xt();
        return /* @__PURE__ */ s(
          ie,
          {
            "data-state": R.getIsSelected() ? "selected" : "",
            className: N(I(R, P)),
            onClick: (A) => b(R, A),
            children: R.getVisibleCells().map((A) => {
              if (!(A.getIsPlaceholder() || A.column.columnDef.enableGrouping && !A.getIsGrouped() && (A.column.columnDef.id !== fe || !n)))
                return /* @__PURE__ */ s(
                  Fe,
                  {
                    className: N(
                      A.column.columnDef.id,
                      "tw-p-[1px]",
                      V(c, R, A)
                    ),
                    children: A.getIsGrouped() ? /* @__PURE__ */ x(
                      wt,
=======
          yn($.column.columnDef.header, $.getContext())
        ] }) }, $.id)
      )) }, O.id)) }),
      /* @__PURE__ */ i(gr, { children: h.getRowModel().rows.map((O, $) => {
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
                  Xe,
                  {
                    className: x(
                      A.column.columnDef.id,
                      "tw-p-[1px]",
                      B(c, O, A)
                    ),
                    children: (() => A.getIsGrouped() ? /* @__PURE__ */ b(
                      ft,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
                      {
                        variant: "link",
                        onClick: R.getToggleExpandedHandler(),
                        type: "button",
                        children: [
<<<<<<< HEAD
                          R.getIsExpanded() && /* @__PURE__ */ s(nr, {}),
                          !R.getIsExpanded() && (G === "ltr" ? /* @__PURE__ */ s(oi, {}) : /* @__PURE__ */ s(pl, {})),
                          " ",
                          wn(A.column.columnDef.cell, A.getContext()),
=======
                          O.getIsExpanded() && /* @__PURE__ */ i(pr, {}),
                          !O.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ i(No, {}) : /* @__PURE__ */ i(Al, {})),
                          " ",
                          yn(A.column.columnDef.cell, A.getContext()),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
                          " (",
                          R.subRows.length,
                          ")"
                        ]
                      }
<<<<<<< HEAD
                    ) : wn(A.column.columnDef.cell, A.getContext())
=======
                    ) : yn(A.column.columnDef.cell, A.getContext()))()
>>>>>>> 94f7504ec2 (add a muted menubar variant)
                  },
                  A.id
                );
            })
          },
          R.id
        );
      }) })
    ] })
  ] });
}
<<<<<<< HEAD
const Ar = {
=======
const Lr = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Um({
=======
function zh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
<<<<<<< HEAD
  const o = {
    ...Ar,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([i, l]) => [
          i,
          i === l && i in Ar ? Ar[i] : l
=======
  const a = {
    ...Lr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([l, c]) => [
          l,
          l === c && l in Lr ? Lr[l] : c
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Xm({ children: t }) {
  return /* @__PURE__ */ s("div", { className: "pr-twp tw-grid", children: t });
}
function Ym({
=======
function Fh({ children: t }) {
  return /* @__PURE__ */ i("div", { className: "pr-twp tw-grid", children: t });
}
function Lh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Hm({
=======
function Gh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ x("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ s("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
<<<<<<< HEAD
    n ? /* @__PURE__ */ s(Co, {}) : ""
  ] });
}
function qm({
=======
    n ? /* @__PURE__ */ i(Bo, {}) : ""
  ] });
}
function Uh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
<<<<<<< HEAD
  return /* @__PURE__ */ s("div", { id: t, className: e, children: n.map((i) => /* @__PURE__ */ x("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ s(
      To,
=======
  return /* @__PURE__ */ i("div", { id: t, className: e, children: n.map((s) => /* @__PURE__ */ b("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ i(
      jo,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(i),
        onCheckedChange: (l) => o(i, l)
      }
    ),
    /* @__PURE__ */ s(At, { children: a ? a(i) : i })
  ] }, i)) });
}
<<<<<<< HEAD
function wd(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function fd(t) {
  if (t.__esModule) return t;
=======
function zd(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Fd(t) {
  if (t.__esModule)
    return t;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
var Oo = {}, Ki = { exports: {} };
=======
var Vo = {}, ds = { exports: {} };
>>>>>>> 94f7504ec2 (add a muted menubar variant)
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
<<<<<<< HEAD
})(Ki);
var md = Ki.exports, Dr = {};
function Ro(t, e) {
=======
})(ds);
var Ld = ds.exports, Gr = {};
function zo(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
function ge(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
<<<<<<< HEAD
function Ji(t) {
  if (!ge(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = Ji(t[n]);
=======
function ps(t) {
  if (!xe(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = ps(t[n]);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  }), e;
}
function Qt(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? _({}, t) : t;
<<<<<<< HEAD
  return ge(t) && ge(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (ge(e[o]) && o in t && ge(t[o]) ? r[o] = Qt(t[o], e[o], n) : n.clone ? r[o] = ge(e[o]) ? Ji(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var eo = { exports: {} }, Bn = { exports: {} }, it = {};
=======
  return xe(t) && xe(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (xe(e[o]) && o in t && xe(t[o]) ? r[o] = re(t[o], e[o], n) : n.clone ? r[o] = xe(e[o]) ? ps(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var lo = { exports: {} }, Yn = { exports: {} }, it = {};
>>>>>>> 94f7504ec2 (add a muted menubar variant)
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
<<<<<<< HEAD
var ha;
function hd() {
  if (ha) return it;
  ha = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, i = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
  function C(b) {
    if (typeof b == "object" && b !== null) {
      var I = b.$$typeof;
=======
var Oa;
function Gd() {
  if (Oa)
    return it;
  Oa = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, p = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, y = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, T = t ? Symbol.for("react.scope") : 60119;
  function C(v) {
    if (typeof v == "object" && v !== null) {
      var I = v.$$typeof;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      switch (I) {
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
                  return I;
              }
          }
        case n:
          return I;
      }
    }
  }
<<<<<<< HEAD
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
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
var ga;
function gd() {
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
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
                var yt = z && z.$$typeof;
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
<<<<<<< HEAD
    var b = c, I = d, V = l, R = i, P = e, G = p, A = r, Q = v, $ = g, F = n, B = a, D = o, U = f, nt = !1;
    function at(M) {
      return nt || (nt = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), y(M) || E(M) === c;
    }
    function y(M) {
      return E(M) === d;
    }
    function O(M) {
      return E(M) === l;
    }
    function X(M) {
      return E(M) === i;
    }
    function Y(M) {
      return typeof M == "object" && M !== null && M.$$typeof === e;
    }
    function L(M) {
      return E(M) === p;
    }
    function K(M) {
      return E(M) === r;
    }
    function q(M) {
      return E(M) === v;
    }
    function W(M) {
      return E(M) === g;
    }
    function H(M) {
      return E(M) === n;
    }
    function J(M) {
      return E(M) === a;
    }
    function Z(M) {
      return E(M) === o;
    }
    function dt(M) {
      return E(M) === f;
    }
    st.AsyncMode = b, st.ConcurrentMode = I, st.ContextConsumer = V, st.ContextProvider = R, st.Element = P, st.ForwardRef = G, st.Fragment = A, st.Lazy = Q, st.Memo = $, st.Portal = F, st.Profiler = B, st.StrictMode = D, st.Suspense = U, st.isAsyncMode = at, st.isConcurrentMode = y, st.isContextConsumer = O, st.isContextProvider = X, st.isElement = Y, st.isForwardRef = L, st.isFragment = K, st.isLazy = q, st.isMemo = W, st.isPortal = H, st.isProfiler = J, st.isStrictMode = Z, st.isSuspense = dt, st.isValidElementType = C, st.typeOf = E;
  }()), st;
}
var ba;
function Zi() {
  return ba || (ba = 1, process.env.NODE_ENV === "production" ? Bn.exports = hd() : Bn.exports = gd()), Bn.exports;
=======
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
  return Pa || (Pa = 1, process.env.NODE_ENV === "production" ? Yn.exports = Gd() : Yn.exports = Ud()), Yn.exports;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
<<<<<<< HEAD
var jr, va;
function bd() {
  if (va) return jr;
  va = 1;
=======
var Ur, $a;
function Xd() {
  if ($a)
    return Ur;
  $a = 1;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return jr = o() ? Object.assign : function(a, i) {
=======
  return Ur = o() ? Object.assign : function(a, s) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  }, jr;
}
var Br, ya;
function _o() {
  if (ya) return Br;
  ya = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Br = t, Br;
}
var Vr, xa;
function Qi() {
  return xa || (xa = 1, Vr = Function.call.bind(Object.prototype.hasOwnProperty)), Vr;
}
var zr, Na;
function vd() {
  if (Na) return zr;
  Na = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = _o(), n = {}, r = Qi();
=======
  }, Ur;
}
var Xr, Ia;
function Fo() {
  if (Ia)
    return Xr;
  Ia = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Xr = t, Xr;
}
var Hr, Ma;
function ws() {
  return Ma || (Ma = 1, Hr = Function.call.bind(Object.prototype.hasOwnProperty)), Hr;
}
var Yr, Aa;
function Hd() {
  if (Aa)
    return Yr;
  Aa = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = Fo(), n = {}, r = ws();
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  }, zr = o, zr;
}
var Fr, ka;
function yd() {
  if (ka) return Fr;
  ka = 1;
  var t = Zi(), e = bd(), n = _o(), r = Qi(), o = vd(), a = function() {
=======
  }, Yr = o, Yr;
}
var Wr, Da;
function Yd() {
  if (Da)
    return Wr;
  Da = 1;
  var t = us(), e = Xd(), n = Fo(), r = ws(), o = Hd(), a = function() {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return Fr = function(l, c) {
=======
  return Wr = function(l, c) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      element: E(),
      elementType: b(),
=======
      element: S(),
      elementType: v(),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      instanceOf: I,
      node: G(),
      objectOf: R,
      oneOf: V,
      oneOfType: P,
      shape: Q,
      exact: $
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
        var O = {}, X = 0;
      function Y(K, q, W, H, J, Z, dt) {
        if (H = H || w, Z = Z || W, dt !== n) {
          if (c) {
            var M = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw M.name = "Invariant Violation", M;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Nt = H + ":" + W;
            !O[Nt] && // Avoid spamming the console because they are often not actionable except for lib authors
            X < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + H + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), O[Nt] = !0, X++);
          }
        }
        return q[W] == null ? K ? q[W] === null ? new m("The " + J + " `" + Z + "` is marked as required " + ("in `" + H + "`, but its value is `null`.")) : new m("The " + J + " `" + Z + "` is marked as required in " + ("`" + H + "`, but its value is `undefined`.")) : null : y(q, W, H, J, Z);
      }
      var L = Y.bind(null, !1);
      return L.isRequired = Y.bind(null, !0), L;
    }
    function k(y) {
      function O(X, Y, L, K, q, W) {
        var H = X[Y], J = D(H);
        if (J !== y) {
          var Z = U(H);
          return new m(
            "Invalid " + K + " `" + q + "` of type " + ("`" + Z + "` supplied to `" + L + "`, expected ") + ("`" + y + "`."),
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
      function O(X, Y, L, K, q) {
        if (typeof y != "function")
          return new m("Property `" + q + "` of component `" + L + "` has invalid PropType notation inside arrayOf.");
        var W = X[Y];
        if (!Array.isArray(W)) {
          var H = D(W);
          return new m("Invalid " + K + " `" + q + "` of type " + ("`" + H + "` supplied to `" + L + "`, expected an array."));
        }
        for (var J = 0; J < W.length; J++) {
          var Z = y(W, J, L, K, q + "[" + J + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return h(O);
    }
<<<<<<< HEAD
    function E() {
      function y(O, X, Y, L, K) {
        var q = O[X];
        if (!l(q)) {
          var W = D(q);
          return new m("Invalid " + L + " `" + K + "` of type " + ("`" + W + "` supplied to `" + Y + "`, expected a single ReactElement."));
=======
    function S() {
      function N(R, U, X, F, K) {
        var W = R[U];
        if (!l(W)) {
          var q = V(W);
          return new m("Invalid " + F + " `" + K + "` of type " + ("`" + q + "` supplied to `" + X + "`, expected a single ReactElement."));
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        }
        return null;
      }
      return h(y);
    }
    function b() {
      function y(O, X, Y, L, K) {
        var q = O[X];
        if (!t.isValidElementType(q)) {
          var W = D(q);
          return new m("Invalid " + L + " `" + K + "` of type " + ("`" + W + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(y);
    }
    function I(y) {
      function O(X, Y, L, K, q) {
        if (!(X[Y] instanceof y)) {
          var W = y.name || w, H = at(X[Y]);
          return new m("Invalid " + K + " `" + q + "` of type " + ("`" + H + "` supplied to `" + L + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return h(O);
    }
    function V(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function O(X, Y, L, K, q) {
        for (var W = X[Y], H = 0; H < y.length; H++)
          if (v(W, y[H]))
            return null;
<<<<<<< HEAD
        var J = JSON.stringify(y, function(dt, M) {
          var Nt = U(M);
          return Nt === "symbol" ? String(M) : M;
=======
        var J = JSON.stringify(N, function(dt, M) {
          var Et = H(M);
          return Et === "symbol" ? String(M) : M;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        });
        return new m("Invalid " + K + " `" + q + "` of value `" + String(W) + "` " + ("supplied to `" + L + "`, expected one of " + J + "."));
      }
      return h(O);
    }
    function R(y) {
      function O(X, Y, L, K, q) {
        if (typeof y != "function")
          return new m("Property `" + q + "` of component `" + L + "` has invalid PropType notation inside objectOf.");
        var W = X[Y], H = D(W);
        if (H !== "object")
          return new m("Invalid " + K + " `" + q + "` of type " + ("`" + H + "` supplied to `" + L + "`, expected an object."));
        for (var J in W)
          if (r(W, J)) {
            var Z = y(W, J, L, K, q + "." + J, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return h(O);
    }
    function P(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var O = 0; O < y.length; O++) {
        var X = y[O];
        if (typeof X != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + nt(X) + " at index " + O + "."
          ), i;
      }
<<<<<<< HEAD
      function Y(L, K, q, W, H) {
        for (var J = [], Z = 0; Z < y.length; Z++) {
          var dt = y[Z], M = dt(L, K, q, W, H, n);
=======
      function X(F, K, W, q, Y) {
        for (var J = [], Z = 0; Z < N.length; Z++) {
          var dt = N[Z], M = dt(F, K, W, q, Y, n);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          if (M == null)
            return null;
          M.data && r(M.data, "expectedType") && J.push(M.data.expectedType);
        }
        var Nt = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new m("Invalid " + W + " `" + H + "` supplied to " + ("`" + q + "`" + Nt + "."));
      }
      return h(Y);
    }
    function G() {
      function y(O, X, Y, L, K) {
        return F(O[X]) ? null : new m("Invalid " + L + " `" + K + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return h(y);
    }
<<<<<<< HEAD
    function A(y, O, X, Y, L) {
=======
    function A(N, R, U, X, F) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      return new m(
        (y || "React class") + ": " + O + " type `" + X + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + L + "`."
      );
    }
    function Q(y) {
      function O(X, Y, L, K, q) {
        var W = X[Y], H = D(W);
        if (H !== "object")
          return new m("Invalid " + K + " `" + q + "` of type `" + H + "` " + ("supplied to `" + L + "`, expected `object`."));
        for (var J in y) {
          var Z = y[J];
          if (typeof Z != "function")
<<<<<<< HEAD
            return A(L, K, q, J, U(Z));
          var dt = Z(W, J, L, K, q + "." + J, n);
=======
            return A(F, K, W, J, H(Z));
          var dt = Z(q, J, F, K, W + "." + J, n);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          if (dt)
            return dt;
        }
        return null;
      }
      return h(O);
    }
    function $(y) {
      function O(X, Y, L, K, q) {
        var W = X[Y], H = D(W);
        if (H !== "object")
          return new m("Invalid " + K + " `" + q + "` of type `" + H + "` " + ("supplied to `" + L + "`, expected `object`."));
        var J = e({}, X[Y], y);
        for (var Z in J) {
<<<<<<< HEAD
          var dt = y[Z];
          if (r(y, Z) && typeof dt != "function")
            return A(L, K, q, Z, U(dt));
=======
          var dt = N[Z];
          if (r(N, Z) && typeof dt != "function")
            return A(F, K, W, Z, H(dt));
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          if (!dt)
            return new m(
              "Invalid " + K + " `" + q + "` key `" + Z + "` supplied to `" + L + "`.\nBad object: " + JSON.stringify(X[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(y), null, "  ")
            );
<<<<<<< HEAD
          var M = dt(W, Z, L, K, q + "." + Z, n);
=======
          var M = dt(q, Z, F, K, W + "." + Z, n);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          if (M)
            return M;
        }
        return null;
      }
      return h(O);
    }
    function F(y) {
      switch (typeof y) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !y;
        case "object":
          if (Array.isArray(y))
            return y.every(F);
          if (y === null || l(y))
            return !0;
          var O = f(y);
          if (O) {
            var X = O.call(y), Y;
            if (O !== y.entries) {
              for (; !(Y = X.next()).done; )
                if (!F(Y.value))
                  return !1;
            } else
              for (; !(Y = X.next()).done; ) {
                var L = Y.value;
                if (L && !F(L[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function B(y, O) {
      return y === "symbol" ? !0 : O ? O["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && O instanceof Symbol : !1;
    }
    function D(y) {
      var O = typeof y;
      return Array.isArray(y) ? "array" : y instanceof RegExp ? "object" : B(O, y) ? "symbol" : O;
    }
    function U(y) {
      if (typeof y > "u" || y === null)
        return "" + y;
      var O = D(y);
      if (O === "object") {
        if (y instanceof Date)
          return "date";
        if (y instanceof RegExp)
          return "regexp";
      }
      return O;
    }
    function nt(y) {
      var O = U(y);
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
    function at(y) {
      return !y.constructor || !y.constructor.name ? w : y.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
<<<<<<< HEAD
  }, Fr;
}
var Lr, Ea;
function xd() {
  if (Ea) return Lr;
  Ea = 1;
  var t = _o();
=======
  }, Wr;
}
var qr, ja;
function Wd() {
  if (ja)
    return qr;
  ja = 1;
  var t = Fo();
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  function e() {
  }
  function n() {
  }
<<<<<<< HEAD
  return n.resetWarningCache = e, Lr = function() {
    function r(i, l, c, d, p, f) {
=======
  return n.resetWarningCache = e, qr = function() {
    function r(s, l, c, d, p, f) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  }, Lr;
}
if (process.env.NODE_ENV !== "production") {
  var Nd = Zi(), kd = !0;
  eo.exports = yd()(Nd.isElement, kd);
} else
  eo.exports = xd()();
var Ed = eo.exports;
const u = /* @__PURE__ */ wd(Ed);
function Sd(t) {
=======
  }, qr;
}
if (process.env.NODE_ENV !== "production") {
  var qd = us(), Kd = !0;
  lo.exports = Yd()(qd.isElement, Kd);
} else
  lo.exports = Wd()();
var Jd = lo.exports;
const u = /* @__PURE__ */ zd(Jd);
function Zd(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
<<<<<<< HEAD
function ts(t, e, n, r, o) {
  const a = t[e], i = o || e;
=======
function fs(t, e, n, r, o) {
  const a = t[e], s = o || e;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
<<<<<<< HEAD
  return typeof c == "function" && !Sd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Po = Ro(u.element, ts);
Po.isRequired = Ro(u.element.isRequired, ts);
const Td = "exact-prop: ​";
function Cd(t) {
  return process.env.NODE_ENV === "production" ? t : _({}, t, {
    [Td]: (e) => {
=======
  return typeof c == "function" && !Zd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ms = zo(u.element, fs);
ms.isRequired = zo(u.element.isRequired, fs);
const hs = ms, Qd = "exact-prop: ​";
function tp(t) {
  return process.env.NODE_ENV === "production" ? t : _({}, t, {
    [Qd]: (e) => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
var no = { exports: {} }, lt = {};
=======
var co = { exports: {} }, lt = {};
>>>>>>> 94f7504ec2 (add a muted menubar variant)
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
<<<<<<< HEAD
var Sa;
function Od() {
  if (Sa) return lt;
  Sa = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
=======
var Ba;
function ep() {
  if (Ba)
    return lt;
  Ba = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
var Ta;
function Rd() {
  return Ta || (Ta = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v = !1, m = !1, h = !1, k = !1, T = !1, C;
    C = Symbol.for("react.module.reference");
    function E(z) {
      return !!(typeof z == "string" || typeof z == "function" || z === n || z === o || T || z === r || z === d || z === p || k || z === g || v || m || h || typeof z == "object" && z !== null && (z.$$typeof === w || z.$$typeof === f || z.$$typeof === a || z.$$typeof === i || z.$$typeof === c || // This needs to include all possible module reference object
=======
var Va;
function np() {
  return Va || (Va = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), y = !1, m = !1, h = !1, k = !1, T = !1, C;
    C = Symbol.for("react.module.reference");
    function S(z) {
      return !!(typeof z == "string" || typeof z == "function" || z === n || z === o || T || z === r || z === d || z === p || k || z === g || y || m || h || typeof z == "object" && z !== null && (z.$$typeof === w || z.$$typeof === f || z.$$typeof === a || z.$$typeof === s || z.$$typeof === c || // This needs to include all possible module reference object
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      z.$$typeof === C || z.getModuleId !== void 0));
    }
    function b(z) {
      if (typeof z == "object" && z !== null) {
        var yt = z.$$typeof;
        switch (yt) {
          case t:
            var Ut = z.type;
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
<<<<<<< HEAD
    var I = i, V = a, R = t, P = c, G = n, A = w, Q = f, $ = e, F = o, B = r, D = d, U = p, nt = !1, at = !1;
    function y(z) {
=======
    var I = s, B = a, O = t, $ = c, L = n, A = w, Q = f, P = e, G = o, j = r, V = d, H = p, nt = !1, ot = !1;
    function N(z) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      return nt || (nt = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function O(z) {
      return at || (at = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function X(z) {
      return b(z) === i;
    }
    function Y(z) {
      return b(z) === a;
    }
    function L(z) {
      return typeof z == "object" && z !== null && z.$$typeof === t;
    }
    function K(z) {
      return b(z) === c;
    }
    function q(z) {
      return b(z) === n;
    }
    function W(z) {
      return b(z) === w;
    }
    function H(z) {
      return b(z) === f;
    }
    function J(z) {
      return b(z) === e;
    }
    function Z(z) {
      return b(z) === o;
    }
    function dt(z) {
      return b(z) === r;
    }
    function M(z) {
<<<<<<< HEAD
      return b(z) === d;
=======
      return v(z) === d;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    }
    function Nt(z) {
      return b(z) === p;
    }
<<<<<<< HEAD
    ct.ContextConsumer = I, ct.ContextProvider = V, ct.Element = R, ct.ForwardRef = P, ct.Fragment = G, ct.Lazy = A, ct.Memo = Q, ct.Portal = $, ct.Profiler = F, ct.StrictMode = B, ct.Suspense = D, ct.SuspenseList = U, ct.isAsyncMode = y, ct.isConcurrentMode = O, ct.isContextConsumer = X, ct.isContextProvider = Y, ct.isElement = L, ct.isForwardRef = K, ct.isFragment = q, ct.isLazy = W, ct.isMemo = H, ct.isPortal = J, ct.isProfiler = Z, ct.isStrictMode = dt, ct.isSuspense = M, ct.isSuspenseList = Nt, ct.isValidElementType = E, ct.typeOf = b;
  }()), ct;
}
process.env.NODE_ENV === "production" ? no.exports = Od() : no.exports = Rd();
var Ca = no.exports;
const _d = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Pd(t) {
  const e = `${t}`.match(_d);
  return e && e[1] || "";
}
function es(t, e = "") {
  return t.displayName || t.name || Pd(t) || e;
}
function Oa(t, e, n) {
  const r = es(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function $d(t) {
=======
    ct.ContextConsumer = I, ct.ContextProvider = B, ct.Element = O, ct.ForwardRef = $, ct.Fragment = L, ct.Lazy = A, ct.Memo = Q, ct.Portal = P, ct.Profiler = G, ct.StrictMode = j, ct.Suspense = V, ct.SuspenseList = H, ct.isAsyncMode = N, ct.isConcurrentMode = R, ct.isContextConsumer = U, ct.isContextProvider = X, ct.isElement = F, ct.isForwardRef = K, ct.isFragment = W, ct.isLazy = q, ct.isMemo = Y, ct.isPortal = J, ct.isProfiler = Z, ct.isStrictMode = dt, ct.isSuspense = M, ct.isSuspenseList = Et, ct.isValidElementType = S, ct.typeOf = v;
  }()), ct;
}
process.env.NODE_ENV === "production" ? co.exports = ep() : co.exports = np();
var za = co.exports;
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
<<<<<<< HEAD
      return es(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Ca.ForwardRef:
          return Oa(t, t.render, "ForwardRef");
        case Ca.Memo:
          return Oa(t, t.type, "memo");
=======
      return gs(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case za.ForwardRef:
          return Fa(t, t.render, "ForwardRef");
        case za.Memo:
          return Fa(t, t.type, "memo");
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        default:
          return;
      }
  }
}
function yn(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], i = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
<<<<<<< HEAD
const ns = u.oneOfType([u.func, u.object]);
function Wt(t) {
=======
const ip = u.oneOfType([u.func, u.object]), bs = ip;
function Zt(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Le(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
<<<<<<< HEAD
function Id(...t) {
=======
function sp(...t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
<<<<<<< HEAD
function Md(t, e = 166) {
=======
function lp(t, e = 166) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Ad(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function Dd(t, e) {
=======
function cp(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function dp(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  var n, r;
  return /* @__PURE__ */ j.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
<<<<<<< HEAD
function Hn(t) {
  return t && t.ownerDocument || document;
}
function jd(t) {
  return Hn(t).defaultView || window;
}
function Bd(t, e) {
=======
function or(t) {
  return t && t.ownerDocument || document;
}
function pp(t) {
  return or(t).defaultView || window;
}
function up(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? _({}, e.propTypes) : null;
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
<<<<<<< HEAD
function qn(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const Ge = typeof window < "u" ? j.useLayoutEffect : j.useEffect;
let Ra = 0;
function Vd(t) {
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
  return Vd(t);
}
function zd(t, e, n, r, o) {
=======
function ar(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const wp = typeof window < "u" ? D.useLayoutEffect : D.useEffect, Ye = wp;
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || e;
  return typeof t[e] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
<<<<<<< HEAD
function os({
=======
function ys({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function ro(t) {
  const e = j.useRef(t);
  return Ge(() => {
=======
function po(t) {
  const e = D.useRef(t);
  return Ye(() => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    e.current = t;
  }), j.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function Ee(...t) {
  return j.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
<<<<<<< HEAD
      qn(n, e);
    });
  }, t);
}
const Pa = {};
function Fd(t, e) {
  const n = j.useRef(Pa);
  return n.current === Pa && (n.current = t(e)), n;
}
const Ld = [];
function Gd(t) {
  j.useEffect(t, Ld);
}
class Tn {
=======
      ar(n, e);
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
class Mn {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
<<<<<<< HEAD
    return new Tn();
=======
    return new Mn();
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function dn() {
  const t = Fd(Tn.create).current;
  return Gd(t.disposeEffect), t;
}
let ur = !0, oo = !1;
const Ud = new Tn(), Xd = {
=======
function mn() {
  const t = hp(Mn.create).current;
  return bp(t.disposeEffect), t;
}
let yr = !0, uo = !1;
const vp = new Mn(), yp = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Yd(t) {
=======
function xp(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    type: e,
    tagName: n
  } = t;
<<<<<<< HEAD
  return !!(n === "INPUT" && Xd[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function Hd(t) {
  t.metaKey || t.altKey || t.ctrlKey || (ur = !0);
}
function Gr() {
  ur = !1;
}
function qd() {
  this.visibilityState === "hidden" && oo && (ur = !0);
}
function Wd(t) {
  t.addEventListener("keydown", Hd, !0), t.addEventListener("mousedown", Gr, !0), t.addEventListener("pointerdown", Gr, !0), t.addEventListener("touchstart", Gr, !0), t.addEventListener("visibilitychange", qd, !0);
}
function Kd(t) {
=======
  return !!(n === "INPUT" && yp[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function Np(t) {
  t.metaKey || t.altKey || t.ctrlKey || (yr = !0);
}
function Kr() {
  yr = !1;
}
function kp() {
  this.visibilityState === "hidden" && uo && (yr = !0);
}
function Ep(t) {
  t.addEventListener("keydown", Np, !0), t.addEventListener("mousedown", Kr, !0), t.addEventListener("pointerdown", Kr, !0), t.addEventListener("touchstart", Kr, !0), t.addEventListener("visibilitychange", kp, !0);
}
function Sp(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    target: e
  } = t;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
<<<<<<< HEAD
  return ur || Yd(e);
}
function as() {
  const t = j.useCallback((o) => {
    o != null && Wd(o.ownerDocument);
  }, []), e = j.useRef(!1);
  function n() {
    return e.current ? (oo = !0, Ud.start(100, () => {
      oo = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return Kd(o) ? (e.current = !0, !0) : !1;
=======
  return yr || xp(e);
}
function xs() {
  const t = D.useCallback((o) => {
    o != null && Ep(o.ownerDocument);
  }, []), e = D.useRef(!1);
  function n() {
    return e.current ? (uo = !0, vp.start(100, () => {
      uo = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return Sp(o) ? (e.current = !0, !0) : !1;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  }
  return {
    isFocusVisibleRef: e,
    onFocus: r,
    onBlur: n,
    ref: t
  };
}
<<<<<<< HEAD
function is(t, e) {
=======
function Ns(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const n = _({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = _({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
<<<<<<< HEAD
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = _({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = is(o[i], a[i]);
=======
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = _({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = Ns(o[s], a[s]);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      }));
    } else n[r] === void 0 && (n[r] = t[r]);
  }), n;
}
<<<<<<< HEAD
function $o(t, e, n = void 0) {
=======
function Lo(t, e, n = void 0) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const $a = (t) => t, Jd = () => {
  let t = $a;
=======
const Xa = (t) => t, Tp = () => {
  let t = Xa;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
<<<<<<< HEAD
      t = $a;
    }
  };
}, ss = Jd(), ls = {
=======
      t = Xa;
    }
  };
}, Cp = Tp(), ks = Cp, Es = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function wr(t, e, n = "Mui") {
  const r = ls[e];
  return r ? `${n}-${r}` : `${ss.generate(t)}-${e}`;
}
function cs(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = wr(t, o, n);
  }), r;
}
function Zd(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
=======
function xr(t, e, n = "Mui") {
  const r = Es[e];
  return r ? `${n}-${r}` : `${ks.generate(t)}-${e}`;
}
function Ss(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = xr(t, o, n);
  }), r;
}
function Rp(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return Math.max(e, Math.min(t, n));
}
function kt(t, e) {
  if (t == null) return {};
  var n = {}, r = Object.keys(t), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(e.indexOf(o) >= 0) && (n[o] = t[o]);
  return n;
}
<<<<<<< HEAD
const Qd = ["values", "unit", "step"], tp = (t) => {
=======
const Op = ["values", "unit", "step"], _p = (t) => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => _({}, n, {
    [r.key]: r.val
  }), {});
};
<<<<<<< HEAD
function ep(t) {
=======
function Pp(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  } = t, o = kt(t, Qd), a = tp(e), i = Object.keys(a);
=======
  } = t, o = St(t, Op), a = _p(e), s = Object.keys(a);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
  return _({
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
<<<<<<< HEAD
const np = {
  borderRadius: 4
}, le = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {};
function fn(t, e) {
  return e ? Qt(t, e, {
=======
const $p = {
  borderRadius: 4
}, Ip = $p, Mp = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {}, ue = Mp;
function Nn(t, e) {
  return e ? re(t, e, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
<<<<<<< HEAD
const Io = {
=======
const Go = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
}, Ia = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${Io[t]}px)`
=======
}, Ha = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${Go[t]}px)`
>>>>>>> 94f7504ec2 (add a muted menubar variant)
};
function te(t, e, n) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
<<<<<<< HEAD
    const a = r.breakpoints || Ia;
    return e.reduce((i, l, c) => (i[a.up(a.keys[c])] = n(e[c]), i), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Ia;
    return Object.keys(e).reduce((i, l) => {
      if (Object.keys(a.values || Io).indexOf(l) !== -1) {
=======
    const a = r.breakpoints || Ha;
    return e.reduce((s, l, c) => (s[a.up(a.keys[c])] = n(e[c]), s), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Ha;
    return Object.keys(e).reduce((s, l) => {
      if (Object.keys(a.values || Go).indexOf(l) !== -1) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function rp(t = {}) {
=======
function Ap(t = {}) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
<<<<<<< HEAD
function op(t, e) {
=======
function Dp(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return t.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, e);
}
<<<<<<< HEAD
function fr(t, e, n = !0) {
=======
function Nr(t, e, n = !0) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && n) {
    const r = `vars.${e}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, t);
}
<<<<<<< HEAD
function Wn(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = fr(t, n) || r, e && (o = e(o, r, t)), o;
=======
function ir(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = Nr(t, n) || r, e && (o = e(o, r, t)), o;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    const l = i[e], c = i.theme, d = fr(c, r) || {};
    return te(i, l, (f) => {
      let w = Wn(d, o, f);
      return f === w && typeof f == "string" && (w = Wn(d, o, `${e}${f === "default" ? "" : Wt(f)}`, f)), n === !1 ? w : {
=======
    const l = s[e], c = s.theme, d = Nr(c, r) || {};
    return oe(s, l, (f) => {
      let w = ir(d, o, f);
      return f === w && typeof f == "string" && (w = ir(d, o, `${e}${f === "default" ? "" : Zt(f)}`, f)), n === !1 ? w : {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: le
  } : {}, a.filterProps = [e], a;
}
<<<<<<< HEAD
function ap(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const ip = {
  m: "margin",
  p: "padding"
}, sp = {
=======
function jp(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const Bp = {
  m: "margin",
  p: "padding"
}, Vp = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
<<<<<<< HEAD
}, Ma = {
=======
}, Ya = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
<<<<<<< HEAD
}, lp = ap((t) => {
  if (t.length > 2)
    if (Ma[t])
      t = Ma[t];
    else
      return [t];
  const [e, n] = t.split(""), r = ip[e], o = sp[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), mr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], hr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], cp = [...mr, ...hr];
function Cn(t, e, n, r) {
  var o;
  const a = (o = fr(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
=======
}, zp = jp((t) => {
  if (t.length > 2)
    if (Ya[t])
      t = Ya[t];
    else
      return [t];
  const [e, n] = t.split(""), r = Bp[e], o = Vp[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), kr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Er = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Fp = [...kr, ...Er];
function An(t, e, n, r) {
  var o;
  const a = (o = Nr(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
>>>>>>> 94f7504ec2 (add a muted menubar variant)
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
<<<<<<< HEAD
function ds(t) {
  return Cn(t, "spacing", 8, "spacing");
=======
function Ts(t) {
  return An(t, "spacing", 8, "spacing");
>>>>>>> 94f7504ec2 (add a muted menubar variant)
}
function On(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
<<<<<<< HEAD
function dp(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = On(e, n), r), {});
}
function pp(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = lp(n), a = dp(o, r), i = t[n];
  return te(t, i, a);
}
function ps(t, e) {
  const n = ds(t.theme);
  return Object.keys(t).map((r) => pp(t, e, r, n)).reduce(fn, {});
}
function ht(t) {
  return ps(t, mr);
}
ht.propTypes = process.env.NODE_ENV !== "production" ? mr.reduce((t, e) => (t[e] = le, t), {}) : {};
ht.filterProps = mr;
function gt(t) {
  return ps(t, hr);
}
gt.propTypes = process.env.NODE_ENV !== "production" ? hr.reduce((t, e) => (t[e] = le, t), {}) : {};
gt.filterProps = hr;
process.env.NODE_ENV !== "production" && cp.reduce((t, e) => (t[e] = le, t), {});
function up(t = 8) {
  if (t.mui)
    return t;
  const e = ds({
=======
function Lp(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = Dn(e, n), r), {});
}
function Gp(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = zp(n), a = Lp(o, r), s = t[n];
  return oe(t, s, a);
}
function Cs(t, e) {
  const n = Ts(t.theme);
  return Object.keys(t).map((r) => Gp(t, e, r, n)).reduce(Nn, {});
}
function bt(t) {
  return Cs(t, kr);
}
bt.propTypes = process.env.NODE_ENV !== "production" ? kr.reduce((t, e) => (t[e] = ue, t), {}) : {};
bt.filterProps = kr;
function vt(t) {
  return Cs(t, Er);
}
vt.propTypes = process.env.NODE_ENV !== "production" ? Er.reduce((t, e) => (t[e] = ue, t), {}) : {};
vt.filterProps = Er;
process.env.NODE_ENV !== "production" && Fp.reduce((t, e) => (t[e] = ue, t), {});
function Up(t = 8) {
  if (t.mui)
    return t;
  const e = Ts({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = e(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
<<<<<<< HEAD
function gr(...t) {
=======
function Sr(...t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? fn(o, e[a](r)) : o, {});
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
<<<<<<< HEAD
const wp = Gt("border", Vt), fp = Gt("borderTop", Vt), mp = Gt("borderRight", Vt), hp = Gt("borderBottom", Vt), gp = Gt("borderLeft", Vt), bp = Gt("borderColor"), vp = Gt("borderTopColor"), yp = Gt("borderRightColor"), xp = Gt("borderBottomColor"), Np = Gt("borderLeftColor"), kp = Gt("outline", Vt), Ep = Gt("outlineColor"), br = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = Cn(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: On(e, r)
=======
const Xp = Xt("border", Ft), Hp = Xt("borderTop", Ft), Yp = Xt("borderRight", Ft), Wp = Xt("borderBottom", Ft), qp = Xt("borderLeft", Ft), Kp = Xt("borderColor"), Jp = Xt("borderTopColor"), Zp = Xt("borderRightColor"), Qp = Xt("borderBottomColor"), tu = Xt("borderLeftColor"), eu = Xt("outline", Ft), nu = Xt("outlineColor"), Tr = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = An(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Dn(e, r)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    });
    return te(t, t.borderRadius, n);
  }
  return null;
};
<<<<<<< HEAD
br.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: le
} : {};
br.filterProps = ["borderRadius"];
gr(wp, fp, mp, hp, gp, bp, vp, yp, xp, Np, br, kp, Ep);
const vr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = Cn(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: On(e, r)
=======
Tr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ue
} : {};
Tr.filterProps = ["borderRadius"];
Sr(Xp, Hp, Yp, Wp, qp, Kp, Jp, Zp, Qp, tu, Tr, eu, nu);
const Cr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = An(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Dn(e, r)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    });
    return te(t, t.gap, n);
  }
  return null;
};
<<<<<<< HEAD
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: le
} : {};
vr.filterProps = ["gap"];
const yr = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = Cn(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: On(e, r)
=======
Cr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ue
} : {};
Cr.filterProps = ["gap"];
const Rr = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = An(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Dn(e, r)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    });
    return te(t, t.columnGap, n);
  }
  return null;
};
<<<<<<< HEAD
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: le
} : {};
yr.filterProps = ["columnGap"];
const xr = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = Cn(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: On(e, r)
=======
Rr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ue
} : {};
Rr.filterProps = ["columnGap"];
const Or = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = An(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Dn(e, r)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    });
    return te(t, t.rowGap, n);
  }
  return null;
};
<<<<<<< HEAD
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: le
} : {};
xr.filterProps = ["rowGap"];
const Sp = vt({
  prop: "gridColumn"
}), Tp = vt({
  prop: "gridRow"
}), Cp = vt({
  prop: "gridAutoFlow"
}), Op = vt({
  prop: "gridAutoColumns"
}), Rp = vt({
  prop: "gridAutoRows"
}), _p = vt({
  prop: "gridTemplateColumns"
}), Pp = vt({
  prop: "gridTemplateRows"
}), $p = vt({
  prop: "gridTemplateAreas"
}), Ip = vt({
  prop: "gridArea"
});
gr(vr, yr, xr, Sp, Tp, Cp, Op, Rp, _p, Pp, $p, Ip);
function Be(t, e) {
  return e === "grey" ? e : t;
}
const Mp = vt({
  prop: "color",
  themeKey: "palette",
  transform: Be
}), Ap = vt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Be
}), Dp = vt({
=======
Or.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ue
} : {};
Or.filterProps = ["rowGap"];
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
Sr(Cr, Rr, Or, ru, ou, au, iu, su, lu, cu, du, pu);
function Le(t, e) {
  return e === "grey" ? e : t;
}
const uu = xt({
  prop: "color",
  themeKey: "palette",
  transform: Le
}), wu = xt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Le
}), fu = xt({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Be
});
<<<<<<< HEAD
gr(Mp, Ap, Dp);
function Mt(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const jp = vt({
  prop: "width",
  transform: Mt
}), Mo = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Io[n];
=======
Sr(uu, wu, fu);
function Dt(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const mu = xt({
  prop: "width",
  transform: Dt
}), Uo = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Go[n];
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Mo.filterProps = ["maxWidth"];
const Bp = vt({
  prop: "minWidth",
  transform: Mt
}), Vp = vt({
  prop: "height",
  transform: Mt
}), zp = vt({
  prop: "maxHeight",
  transform: Mt
}), Fp = vt({
=======
Uo.filterProps = ["maxWidth"];
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const Lp = vt({
  prop: "boxSizing"
});
gr(jp, Mo, Bp, Vp, zp, Fp, Lp);
const Ao = {
=======
const yu = xt({
  prop: "boxSizing"
});
Sr(mu, Uo, hu, gu, bu, vu, yu);
const xu = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    style: br
=======
    style: Tr
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    style: vr
  },
  rowGap: {
    style: xr
  },
  columnGap: {
    style: yr
=======
    style: Cr
  },
  rowGap: {
    style: Or
  },
  columnGap: {
    style: Rr
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    style: Mo
=======
    style: Uo
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
};
function Gp(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function Up(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Xp() {
=======
}, Xo = xu;
function Nu(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function ku(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function Eu() {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    const w = fr(o, d) || {};
    return f ? f(i) : te(i, r, (v) => {
      let m = Wn(w, p, v);
      return v === m && typeof v == "string" && (m = Wn(w, p, `${n}${v === "default" ? "" : Wt(v)}`, v)), c === !1 ? m : {
=======
    const w = Nr(o, d) || {};
    return f ? f(s) : oe(s, r, (y) => {
      let m = ir(w, p, y);
      return y === m && typeof y == "string" && (m = ir(w, p, `${n}${y === "default" ? "" : Zt(y)}`, y)), c === !1 ? m : {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    const i = (r = a.unstable_sxConfig) != null ? r : Ao;
=======
    const s = (r = a.unstable_sxConfig) != null ? r : Xo;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
<<<<<<< HEAD
      const p = rp(a.breakpoints), f = Object.keys(p);
      let w = p;
      return Object.keys(d).forEach((g) => {
        const v = Up(d[g], a);
        if (v != null)
          if (typeof v == "object")
            if (i[g])
              w = fn(w, t(g, v, a, i));
=======
      const p = Ap(a.breakpoints), f = Object.keys(p);
      let w = p;
      return Object.keys(d).forEach((g) => {
        const y = ku(d[g], a);
        if (y != null)
          if (typeof y == "object")
            if (s[g])
              w = Nn(w, t(g, y, a, s));
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            else {
              const m = te({
                theme: a
              }, v, (h) => ({
                [g]: h
              }));
<<<<<<< HEAD
              Gp(m, v) ? w[g] = e({
                sx: v,
=======
              Nu(m, y) ? w[g] = e({
                sx: y,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
                theme: a
              }) : w = fn(w, m);
            }
          else
<<<<<<< HEAD
            w = fn(w, t(g, v, a, i));
      }), op(f, w);
=======
            w = Nn(w, t(g, y, a, s));
      }), Dp(f, w);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
<<<<<<< HEAD
const Nr = Xp();
Nr.filterProps = ["sx"];
function Yp(t, e) {
=======
const Rs = Eu();
Rs.filterProps = ["sx"];
const Ho = Rs;
function Su(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
<<<<<<< HEAD
const Hp = ["breakpoints", "palette", "spacing", "shape"];
function Do(t = {}, ...e) {
=======
const Tu = ["breakpoints", "palette", "spacing", "shape"];
function Yo(t = {}, ...e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
<<<<<<< HEAD
  } = t, i = kt(t, Hp), l = ep(n), c = up(o);
  let d = Qt({
=======
  } = t, s = St(t, Tu), l = Pp(n), c = Up(o);
  let d = re({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: _({
      mode: "light"
    }, r),
    spacing: c,
<<<<<<< HEAD
    shape: _({}, np, a)
  }, i);
  return d.applyStyles = Yp, d = e.reduce((p, f) => Qt(p, f), d), d.unstable_sxConfig = _({}, Ao, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(f) {
    return Nr({
=======
    shape: _({}, Ip, a)
  }, s);
  return d.applyStyles = Su, d = e.reduce((p, f) => re(p, f), d), d.unstable_sxConfig = _({}, Xo, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Ho({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      sx: f,
      theme: this
    });
  }, d;
}
<<<<<<< HEAD
function qp(t) {
  return Object.keys(t).length === 0;
}
function us(t = null) {
  const e = j.useContext(Cl);
  return !e || qp(e) ? t : e;
}
const Wp = Do();
function ws(t = Wp) {
  return us(t);
}
const Kp = ["ownerState"], Jp = ["variants"], Zp = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Qp(t) {
  return Object.keys(t).length === 0;
}
function tu(t) {
=======
function Cu(t) {
  return Object.keys(t).length === 0;
}
function Os(t = null) {
  const e = D.useContext(tc);
  return !e || Cu(e) ? t : e;
}
const Ru = Yo();
function _s(t = Ru) {
  return Os(t);
}
const Ou = ["ownerState"], _u = ["variants"], Pu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function $u(t) {
  return Object.keys(t).length === 0;
}
function Iu(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
<<<<<<< HEAD
function Un(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const eu = Do(), Aa = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Vn({
=======
function tr(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const Mu = Yo(), Wa = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Wn({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
<<<<<<< HEAD
  return Qp(e) ? t : e[n] || e;
}
function nu(t) {
  return t ? (e, n) => n[t] : null;
}
function Xn(t, e) {
  let {
    ownerState: n
  } = e, r = kt(e, Kp);
=======
  return $u(e) ? t : e[n] || e;
}
function Au(t) {
  return t ? (e, n) => n[t] : null;
}
function er(t, e) {
  let {
    ownerState: n
  } = e, r = St(e, Ou);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const o = typeof t == "function" ? t(_({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
<<<<<<< HEAD
    return o.flatMap((a) => Xn(a, _({
=======
    return o.flatMap((a) => er(a, _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
<<<<<<< HEAD
    let l = kt(o, Jp);
=======
    let l = St(o, _u);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function ru(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = eu,
    rootShouldForwardProp: r = Un,
    slotShouldForwardProp: o = Un
  } = t, a = (i) => Nr(_({}, i, {
    theme: Vn(_({}, i, {
=======
function Du(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = Mu,
    rootShouldForwardProp: r = tr,
    slotShouldForwardProp: o = tr
  } = t, a = (s) => Ho(_({}, s, {
    theme: Wn(_({}, s, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      defaultTheme: n,
      themeId: e
    }))
  }));
<<<<<<< HEAD
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Ol(i, (b) => b.filter((I) => !(I != null && I.__mui_systemSx)));
=======
  return a.__mui_systemSx = !0, (s, l = {}) => {
    ec(s, (v) => v.filter((I) => !(I != null && I.__mui_systemSx)));
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    const {
      name: c,
      slot: d,
      skipVariantsResolver: p,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
<<<<<<< HEAD
      overridesResolver: w = nu(Aa(d))
    } = l, g = kt(l, Zp), v = p !== void 0 ? p : (
=======
      overridesResolver: w = Au(Wa(d))
    } = l, g = St(l, Pu), y = p !== void 0 ? p : (
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), m = f || !1;
    let h;
<<<<<<< HEAD
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Aa(d || "Root")}`);
    let k = Un;
    d === "Root" || d === "root" ? k = r : d ? k = o : tu(i) && (k = void 0);
    const T = Tl(i, _({
      shouldForwardProp: k,
      label: h
    }, g)), C = (b) => typeof b == "function" && b.__emotion_real !== b || ge(b) ? (I) => Xn(b, _({}, I, {
      theme: Vn({
=======
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Wa(d || "Root")}`);
    let k = tr;
    d === "Root" || d === "root" ? k = r : d ? k = o : Iu(s) && (k = void 0);
    const T = Ql(s, _({
      shouldForwardProp: k,
      label: h
    }, g)), C = (v) => typeof v == "function" && v.__emotion_real !== v || xe(v) ? (I) => er(v, _({}, I, {
      theme: Wn({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        theme: I.theme,
        defaultTheme: n,
        themeId: e
      })
<<<<<<< HEAD
    })) : b, E = (b, ...I) => {
      let V = C(b);
      const R = I ? I.map(C) : [];
      c && w && R.push((A) => {
        const Q = Vn(_({}, A, {
=======
    })) : v, S = (v, ...I) => {
      let B = C(v);
      const O = I ? I.map(C) : [];
      c && w && O.push((A) => {
        const Q = Wn(_({}, A, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          defaultTheme: n,
          themeId: e
        }));
        if (!Q.components || !Q.components[c] || !Q.components[c].styleOverrides)
          return null;
<<<<<<< HEAD
        const $ = Q.components[c].styleOverrides, F = {};
        return Object.entries($).forEach(([B, D]) => {
          F[B] = Xn(D, _({}, A, {
            theme: Q
          }));
        }), w(A, F);
      }), c && !v && R.push((A) => {
        var Q;
        const $ = Vn(_({}, A, {
          defaultTheme: n,
          themeId: e
        })), F = $ == null || (Q = $.components) == null || (Q = Q[c]) == null ? void 0 : Q.variants;
        return Xn({
          variants: F
        }, _({}, A, {
          theme: $
        }));
      }), m || R.push(a);
      const P = R.length - I.length;
      if (Array.isArray(b) && P > 0) {
        const A = new Array(P).fill("");
        V = [...b, ...A], V.raw = [...b.raw, ...A];
=======
        const P = Q.components[c].styleOverrides, G = {};
        return Object.entries(P).forEach(([j, V]) => {
          G[j] = er(V, _({}, A, {
            theme: Q
          }));
        }), w(A, G);
      }), c && !y && O.push((A) => {
        var Q;
        const P = Wn(_({}, A, {
          defaultTheme: n,
          themeId: e
        })), G = P == null || (Q = P.components) == null || (Q = Q[c]) == null ? void 0 : Q.variants;
        return er({
          variants: G
        }, _({}, A, {
          theme: P
        }));
      }), m || O.push(a);
      const $ = O.length - I.length;
      if (Array.isArray(v) && $ > 0) {
        const A = new Array($).fill("");
        B = [...v, ...A], B.raw = [...v.raw, ...A];
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      }
      const G = T(V, ...R);
      if (process.env.NODE_ENV !== "production") {
        let A;
<<<<<<< HEAD
        c && (A = `${c}${Wt(d || "")}`), A === void 0 && (A = `Styled(${$d(i)})`), G.displayName = A;
=======
        c && (A = `${c}${Zt(d || "")}`), A === void 0 && (A = `Styled(${ap(s)})`), L.displayName = A;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      }
      return i.muiName && (G.muiName = i.muiName), G;
    };
    return T.withConfig && (S.withConfig = T.withConfig), S;
  };
}
<<<<<<< HEAD
function ou(t) {
=======
function ju(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    theme: e,
    name: n,
    props: r
  } = t;
<<<<<<< HEAD
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : is(e.components[n].defaultProps, r);
}
function au({
=======
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : Ns(e.components[n].defaultProps, r);
}
function Bu({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
<<<<<<< HEAD
  let o = ws(n);
  return o = o[r] || o, ou({
=======
  let o = _s(n);
  return r && (o = o[r] || o), ju({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    theme: o,
    name: e,
    props: t
  });
}
<<<<<<< HEAD
function jo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), Zd(t, e, n);
}
function iu(t) {
=======
function Wo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), Rp(t, e, n);
}
function Vu(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Se(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
<<<<<<< HEAD
    return Se(iu(t));
=======
    return Oe(Vu(t));
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function kr(t) {
=======
function _r(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
<<<<<<< HEAD
function su(t) {
  t = Se(t);
=======
function zu(t) {
  t = Oe(t);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), i = (d, p = (d + n / 30) % 12) => o - a * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let l = "rgb";
<<<<<<< HEAD
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), kr({
=======
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), _r({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    type: l,
    values: c
  });
}
<<<<<<< HEAD
function Da(t) {
  t = Se(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Se(su(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function ja(t, e) {
  const n = Da(t), r = Da(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function fs(t, e) {
  return t = Se(t), e = jo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, kr(t);
}
function lu(t, e) {
  if (t = Se(t), e = jo(e), t.type.indexOf("hsl") !== -1)
=======
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
  return t = Oe(t), e = Wo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, _r(t);
}
function Fu(t, e) {
  if (t = Oe(t), e = Wo(e), t.type.indexOf("hsl") !== -1)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
<<<<<<< HEAD
  return kr(t);
}
function cu(t, e) {
  if (t = Se(t), e = jo(e), t.type.indexOf("hsl") !== -1)
=======
  return _r(t);
}
function Lu(t, e) {
  if (t = Oe(t), e = Wo(e), t.type.indexOf("hsl") !== -1)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
<<<<<<< HEAD
  return kr(t);
}
function du(t, e) {
=======
  return _r(t);
}
function Gu(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const xn = {
  black: "#000",
  white: "#fff"
}, pu = {
=======
const Uu = {
  black: "#000",
  white: "#fff"
}, On = Uu, Xu = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
}, Pe = {
=======
}, Hu = Xu, Yu = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  50: "#f3e5f5",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
<<<<<<< HEAD
  700: "#7b1fa2"
}, $e = {
=======
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, Ae = Yu, Wu = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  700: "#d32f2f",
<<<<<<< HEAD
  800: "#c62828"
}, an = {
=======
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, De = Wu, qu = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  700: "#f57c00",
<<<<<<< HEAD
  900: "#e65100"
}, Ie = {
=======
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, pn = qu, Ku = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  50: "#e3f2fd",
  200: "#90caf9",
  400: "#42a5f5",
  700: "#1976d2",
<<<<<<< HEAD
  800: "#1565c0"
}, Me = {
=======
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, je = Ku, Ju = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  700: "#0288d1",
<<<<<<< HEAD
  900: "#01579b"
}, Ae = {
=======
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, Be = Ju, Zu = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  700: "#388e3c",
  800: "#2e7d32",
<<<<<<< HEAD
  900: "#1b5e20"
}, uu = ["mode", "contrastThreshold", "tonalOffset"], Ba = {
=======
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
}, Ve = Zu, Qu = ["mode", "contrastThreshold", "tonalOffset"], Ja = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
    paper: xn.white,
    default: xn.white
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
<<<<<<< HEAD
}, Ur = {
=======
}, Jr = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  text: {
    primary: xn.white,
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
    active: xn.white,
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
<<<<<<< HEAD
function Va(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = cu(t.main, o) : e === "dark" && (t.dark = lu(t.main, a)));
}
function wu(t = "light") {
=======
function Za(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = Lu(t.main, o) : e === "dark" && (t.dark = Fu(t.main, a)));
}
function tw(t = "light") {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function fu(t = "light") {
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
function mu(t = "light") {
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
function hu(t = "light") {
  return t === "dark" ? {
    main: Me[400],
    light: Me[300],
    dark: Me[700]
=======
function ew(t = "light") {
  return t === "dark" ? {
    main: Ae[200],
    light: Ae[50],
    dark: Ae[400]
  } : {
    main: Ae[500],
    light: Ae[300],
    dark: Ae[700]
  };
}
function nw(t = "light") {
  return t === "dark" ? {
    main: De[500],
    light: De[300],
    dark: De[700]
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  } : {
    main: Me[700],
    light: Me[500],
    dark: Me[900]
  };
}
<<<<<<< HEAD
function gu(t = "light") {
=======
function rw(t = "light") {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function bu(t = "light") {
  return t === "dark" ? {
    main: an[400],
    light: an[300],
    dark: an[700]
=======
function ow(t = "light") {
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
function aw(t = "light") {
  return t === "dark" ? {
    main: pn[400],
    light: pn[300],
    dark: pn[700]
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: an[500],
    dark: an[900]
  };
}
<<<<<<< HEAD
function vu(t) {
=======
function iw(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
<<<<<<< HEAD
  } = t, o = kt(t, uu), a = t.primary || wu(e), i = t.secondary || fu(e), l = t.error || mu(e), c = t.info || hu(e), d = t.success || gu(e), p = t.warning || bu(e);
  function f(m) {
    const h = ja(m, Ur.text.primary) >= n ? Ur.text.primary : Ba.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = ja(m, h);
=======
  } = t, o = St(t, Qu), a = t.primary || tw(e), s = t.secondary || ew(e), l = t.error || nw(e), c = t.info || rw(e), d = t.success || ow(e), p = t.warning || aw(e);
  function f(m) {
    const h = Ka(m, Jr.text.primary) >= n ? Jr.text.primary : Ja.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = Ka(m, h);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
} });` : Le(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return Va(m, "light", T, r), Va(m, "dark", C, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, g = {
    dark: Ur,
    light: Ba
=======
} });` : He(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return Za(m, "light", T, r), Za(m, "dark", C, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, g = {
    dark: Jr,
    light: Ja
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  };
  return process.env.NODE_ENV !== "production" && (g[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), Qt(_({
    // A collection of common colors.
    common: _({}, xn),
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
<<<<<<< HEAD
    grey: pu,
=======
    grey: Hu,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const yu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function xu(t) {
  return Math.round(t * 1e5) / 1e5;
}
const za = {
  textTransform: "uppercase"
}, Fa = '"Roboto", "Helvetica", "Arial", sans-serif';
function Nu(t, e) {
  const n = typeof e == "function" ? e(t) : e, {
    fontFamily: r = Fa,
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  } = n, w = kt(n, yu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, v = f || ((k) => `${k / d * g}rem`), m = (k, T, C, E, b) => _({
=======
  } = n, w = St(n, sw);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, y = f || ((k) => `${k / d * g}rem`), m = (k, T, C, S, v) => _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    fontFamily: r,
    fontWeight: k,
    fontSize: v(T),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: C
<<<<<<< HEAD
  }, r === Fa ? {
    letterSpacing: `${xu(E / T)}em`
  } : {}, b, p), h = {
=======
  }, r === ti ? {
    letterSpacing: `${lw(S / T)}em`
  } : {}, v, p), h = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    h1: m(a, 96, 1.167, -1.5),
    h2: m(a, 60, 1.2, -0.5),
    h3: m(i, 48, 1.167, 0),
    h4: m(i, 34, 1.235, 0.25),
    h5: m(i, 24, 1.334, 0),
    h6: m(l, 20, 1.6, 0.15),
    subtitle1: m(i, 16, 1.75, 0.15),
    subtitle2: m(l, 14, 1.57, 0.1),
<<<<<<< HEAD
    body1: m(i, 16, 1.5, 0.15),
    body2: m(i, 14, 1.43, 0.15),
    button: m(l, 14, 1.75, 0.4, za),
    caption: m(i, 12, 1.66, 0.4),
    overline: m(i, 12, 2.66, 1, za),
=======
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(l, 14, 1.75, 0.4, Qa),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Qa),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Qt(_({
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
<<<<<<< HEAD
const ku = 0.2, Eu = 0.14, Su = 0.12;
function mt(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${ku})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${Eu})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${Su})`].join(",");
}
const Tu = ["none", mt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), mt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), mt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), mt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), mt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), mt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), mt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), mt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), mt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), mt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), mt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), mt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), mt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), mt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), mt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), mt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), mt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), mt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), mt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), mt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), mt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), mt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), mt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), mt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Cu = ["duration", "easing", "delay"], Ou = {
=======
const dw = 0.2, pw = 0.14, uw = 0.12;
function ht(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${dw})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${pw})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${uw})`].join(",");
}
const ww = ["none", ht(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ht(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ht(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ht(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ht(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ht(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ht(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ht(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ht(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ht(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ht(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ht(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ht(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ht(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ht(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ht(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ht(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ht(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ht(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ht(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ht(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ht(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ht(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ht(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], fw = ww, mw = ["duration", "easing", "delay"], hw = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
<<<<<<< HEAD
}, Ru = {
=======
}, gw = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function La(t) {
  return `${Math.round(t)}ms`;
}
function _u(t) {
=======
function ei(t) {
  return `${Math.round(t)}ms`;
}
function bw(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
<<<<<<< HEAD
function Pu(t) {
  const e = _({}, Ou, t.easing), n = _({}, Ru, t.duration);
  return _({
    getAutoHeightDuration: _u,
=======
function vw(t) {
  const e = _({}, hw, t.easing), n = _({}, gw, t.duration);
  return _({
    getAutoHeightDuration: bw,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
<<<<<<< HEAD
      } = a, d = kt(a, Cu);
=======
      } = a, d = St(a, mw);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      if (process.env.NODE_ENV !== "production") {
        const p = (w) => typeof w == "string", f = (w) => !isNaN(parseFloat(w));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(i) && !p(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
<<<<<<< HEAD
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof i == "string" ? i : La(i)} ${l} ${typeof c == "string" ? c : La(c)}`).join(",");
=======
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof s == "string" ? s : ei(s)} ${l} ${typeof c == "string" ? c : ei(c)}`).join(",");
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    }
  }, t, {
    easing: e,
    duration: n
  });
}
<<<<<<< HEAD
const $u = {
=======
const yw = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
<<<<<<< HEAD
}, Iu = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Mu(t = {}, ...e) {
=======
}, xw = yw, Nw = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function kw(t = {}, ...e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
<<<<<<< HEAD
  } = t, i = kt(t, Iu);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Le(18));
  const l = vu(r), c = Do(t);
  let d = Qt(c, {
    mixins: du(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Tu.slice(),
    typography: Nu(l, a),
    transitions: Pu(o),
    zIndex: _({}, $u)
=======
  } = t, s = St(t, Nw);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : He(18));
  const l = iw(r), c = Yo(t);
  let d = re(c, {
    mixins: Gu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: fw.slice(),
    typography: cw(l, a),
    transitions: vw(o),
    zIndex: _({}, xw)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  });
  if (d = Qt(d, i), d = e.reduce((p, f) => Qt(p, f), d), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (w, g) => {
      let v;
      for (v in w) {
        const m = w[v];
        if (p.indexOf(v) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
<<<<<<< HEAD
            const h = wr("", v);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
=======
            const h = xr("", y);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return d.unstable_sxConfig = _({}, Ao, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(f) {
    return Nr({
=======
  return d.unstable_sxConfig = _({}, Xo, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Ho({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      sx: f,
      theme: this
    });
  }, d;
}
<<<<<<< HEAD
const Bo = Mu(), Vo = "$$material";
function zo({
  props: t,
  name: e
}) {
  return au({
    props: t,
    name: e,
    defaultTheme: Bo,
    themeId: Vo
  });
}
const Au = (t) => Un(t) && t !== "classes", Rn = ru({
  themeId: Vo,
  defaultTheme: Bo,
  rootShouldForwardProp: Au
});
function Du(t) {
  return wr("MuiSvgIcon", t);
}
cs("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const ju = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Bu = (t) => {
=======
const Ew = kw(), qo = Ew, Ko = "$$material";
function Jo({
  props: t,
  name: e
}) {
  return Bu({
    props: t,
    name: e,
    defaultTheme: qo,
    themeId: Ko
  });
}
const Sw = (t) => tr(t) && t !== "classes", Tw = Du({
  themeId: Ko,
  defaultTheme: qo,
  rootShouldForwardProp: Sw
}), jn = Tw;
function Cw(t) {
  return xr("MuiSvgIcon", t);
}
Ss("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Rw = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ow = (t) => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${Wt(e)}`, `fontSize${Wt(n)}`]
  };
<<<<<<< HEAD
  return $o(o, Du, r);
}, Vu = Rn("svg", {
=======
  return Lo(o, Cw, r);
}, _w = jn("svg", {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${Wt(n.color)}`], e[`fontSize${Wt(n.fontSize)}`]];
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
<<<<<<< HEAD
}), Kn = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const r = zo({
=======
}), Zo = /* @__PURE__ */ D.forwardRef(function(e, n) {
  const r = Jo({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  } = r, g = kt(r, ju), v = /* @__PURE__ */ j.isValidElement(o) && o.type === "svg", m = _({}, r, {
    color: i,
=======
  } = r, g = St(r, Rw), y = /* @__PURE__ */ D.isValidElement(o) && o.type === "svg", m = _({}, r, {
    color: s,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: p,
    viewBox: w,
    hasSvgAsChild: v
  }), h = {};
  p || (h.viewBox = w);
<<<<<<< HEAD
  const k = Bu(m);
  return /* @__PURE__ */ x(Vu, _({
=======
  const k = Ow(m);
  return /* @__PURE__ */ b(_w, _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
process.env.NODE_ENV !== "production" && (Kn.propTypes = {
=======
process.env.NODE_ENV !== "production" && (Zo.propTypes = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Kn.muiName = "SvgIcon";
function ms(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ s(Kn, _({
=======
Zo.muiName = "SvgIcon";
const ni = Zo;
function $s(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ i(ni, _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
<<<<<<< HEAD
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = Kn.muiName, /* @__PURE__ */ j.memo(/* @__PURE__ */ j.forwardRef(n));
}
const zu = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ss.configure(t);
  }
}, Fu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Wt,
  createChainedFunction: Id,
  createSvgIcon: ms,
  debounce: Md,
  deprecatedPropType: Ad,
  isMuiElement: Dd,
  ownerDocument: Hn,
  ownerWindow: jd,
  requirePropFactory: Bd,
  setRef: qn,
  unstable_ClassNameGenerator: zu,
  unstable_useEnhancedEffect: Ge,
  unstable_useId: rs,
  unsupportedProp: zd,
  useControlled: os,
  useEventCallback: ro,
  useForkRef: Ee,
  useIsFocusVisible: as
}, Symbol.toStringTag, { value: "Module" })), Lu = /* @__PURE__ */ fd(Fu);
var Ga;
function Gu() {
  return Ga || (Ga = 1, function(t) {
=======
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
  ownerDocument: or,
  ownerWindow: pp,
  requirePropFactory: up,
  setRef: ar,
  unstable_ClassNameGenerator: Pw,
  unstable_useEnhancedEffect: Ye,
  unstable_useId: vs,
  unsupportedProp: mp,
  useControlled: ys,
  useEventCallback: po,
  useForkRef: Re,
  useIsFocusVisible: xs
}, Symbol.toStringTag, { value: "Module" })), Iw = /* @__PURE__ */ Fd($w);
var ri;
function Mw() {
  return ri || (ri = 1, function(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
<<<<<<< HEAD
    var e = Lu;
  }(Dr)), Dr;
}
var Uu = md;
Object.defineProperty(Oo, "__esModule", {
  value: !0
});
var hs = Oo.default = void 0, Xu = Uu(Gu()), Yu = Ys;
hs = Oo.default = (0, Xu.default)(/* @__PURE__ */ (0, Yu.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Hu(t) {
  return typeof t == "string";
}
function pn(t, e, n) {
  return t === void 0 || Hu(t) ? e : _({}, e, {
    ownerState: _({}, e.ownerState, n)
  });
}
const qu = {
  disableDefaultClasses: !1
}, Wu = /* @__PURE__ */ j.createContext(qu);
function Ku(t) {
  const {
    disableDefaultClasses: e
  } = j.useContext(Wu);
  return (n) => e ? "" : t(n);
}
function Ju(t, e = []) {
=======
    var e = Iw;
  }(Gr)), Gr;
}
var Aw = Ld;
Object.defineProperty(Vo, "__esModule", {
  value: !0
});
var Is = Vo.default = void 0, Dw = Aw(Mw()), jw = ml;
Is = Vo.default = (0, Dw.default)(/* @__PURE__ */ (0, jw.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Bw(t) {
  return typeof t == "string";
}
function hn(t, e, n) {
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (t === void 0)
    return {};
  const n = {};
  return Object.keys(t).filter((r) => r.match(/^on[A-Z]/) && typeof t[r] == "function" && !e.includes(r)).forEach((r) => {
    n[r] = t[r];
  }), n;
}
<<<<<<< HEAD
function Zu(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function Ua(t) {
=======
function Gw(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function oi(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (t === void 0)
    return {};
  const e = {};
  return Object.keys(t).filter((n) => !(n.match(/^on[A-Z]/) && typeof t[n] == "function")).forEach((n) => {
    e[n] = t[n];
  }), e;
}
<<<<<<< HEAD
function Qu(t) {
=======
function Uw(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    getSlotProps: e,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = t;
  if (!e) {
    const g = ve(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = _({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = _({}, n, o, r);
    return g.length > 0 && (m.className = g), Object.keys(v).length > 0 && (m.style = v), {
      props: m,
      internalRef: void 0
    };
  }
<<<<<<< HEAD
  const i = Ju(_({}, o, r)), l = Ua(r), c = Ua(o), d = e(i), p = ve(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = _({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = _({}, d, n, c, l);
=======
  const s = Lw(_({}, o, r)), l = oi(r), c = oi(o), d = e(s), p = ke(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = _({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = _({}, d, n, c, l);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return p.length > 0 && (w.className = p), Object.keys(f).length > 0 && (w.style = f), {
    props: w,
    internalRef: d.ref
  };
}
<<<<<<< HEAD
const tw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function ew(t) {
=======
const Xw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Hw(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
<<<<<<< HEAD
  } = t, i = kt(t, tw), l = a ? {} : Zu(r, o), {
    props: c,
    internalRef: d
  } = Qu(_({}, i, {
=======
  } = t, s = St(t, Xw), l = a ? {} : Gw(r, o), {
    props: c,
    internalRef: d
  } = Uw(_({}, s, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    externalSlotProps: l
  })), p = Ee(d, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return pn(n, _({}, c, {
    ref: p
  }), o);
}
<<<<<<< HEAD
const gs = "base";
function nw(t) {
  return `${gs}--${t}`;
}
function rw(t, e) {
  return `${gs}-${t}-${e}`;
}
function ow(t, e) {
  const n = ls[e];
  return n ? nw(n) : rw(t, e);
}
function aw(t) {
  return typeof t == "function" ? t() : t;
}
const Jn = /* @__PURE__ */ j.forwardRef(function(e, n) {
=======
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
const sr = /* @__PURE__ */ D.forwardRef(function(e, n) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    children: r,
    container: o,
    disablePortal: a = !1
<<<<<<< HEAD
  } = e, [i, l] = j.useState(null), c = Ee(/* @__PURE__ */ j.isValidElement(r) ? r.ref : null, n);
  if (Ge(() => {
    a || l(aw(o) || document.body);
  }, [o, a]), Ge(() => {
    if (i && !a)
      return qn(n, i), () => {
        qn(n, null);
=======
  } = e, [s, l] = D.useState(null), c = Re(/* @__PURE__ */ D.isValidElement(r) ? r.ref : null, n);
  if (Ye(() => {
    a || l(Kw(o) || document.body);
  }, [o, a]), Ye(() => {
    if (s && !a)
      return ar(n, s), () => {
        ar(n, null);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ s(j.Fragment, {
    children: i && /* @__PURE__ */ Dl.createPortal(r, i)
  });
});
process.env.NODE_ENV !== "production" && (Jn.propTypes = {
=======
  return /* @__PURE__ */ i(D.Fragment, {
    children: s && /* @__PURE__ */ sc.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (sr.propTypes = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
  container: u.oneOfType([yn, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool
});
<<<<<<< HEAD
process.env.NODE_ENV !== "production" && (Jn.propTypes = Cd(Jn.propTypes));
var Ot = "top", Ft = "bottom", Lt = "right", Rt = "left", Fo = "auto", _n = [Ot, Ft, Lt, Rt], Ue = "start", Nn = "end", iw = "clippingParents", bs = "viewport", sn = "popper", sw = "reference", Xa = /* @__PURE__ */ _n.reduce(function(t, e) {
  return t.concat([e + "-" + Ue, e + "-" + Nn]);
}, []), vs = /* @__PURE__ */ [].concat(_n, [Fo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Ue, e + "-" + Nn]);
}, []), lw = "beforeRead", cw = "read", dw = "afterRead", pw = "beforeMain", uw = "main", ww = "afterMain", fw = "beforeWrite", mw = "write", hw = "afterWrite", gw = [lw, cw, dw, pw, uw, ww, fw, mw, hw];
function Kt(t) {
=======
process.env.NODE_ENV !== "production" && (sr["propTypes"] = tp(sr.propTypes));
var _t = "top", Gt = "bottom", Ut = "right", Pt = "left", Qo = "auto", Bn = [_t, Gt, Ut, Pt], We = "start", _n = "end", Jw = "clippingParents", Ds = "viewport", un = "popper", Zw = "reference", ai = /* @__PURE__ */ Bn.reduce(function(t, e) {
  return t.concat([e + "-" + We, e + "-" + _n]);
}, []), js = /* @__PURE__ */ [].concat(Bn, [Qo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + We, e + "-" + _n]);
}, []), Qw = "beforeRead", tf = "read", ef = "afterRead", nf = "beforeMain", rf = "main", of = "afterMain", af = "beforeWrite", sf = "write", lf = "afterWrite", cf = [Qw, tf, ef, nf, rf, of, af, sf, lf];
function Qt(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Lo(t) {
=======
function ta(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Dt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
<<<<<<< HEAD
function bw(t) {
=======
function df(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !zt(a) || !Kt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
<<<<<<< HEAD
function vw(t) {
=======
function pf(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const yw = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: bw,
  effect: vw,
=======
const uf = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: df,
  effect: pf,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  requires: ["computeStyles"]
};
function Ht(t) {
  return t.split("-")[0];
}
<<<<<<< HEAD
var ye = Math.max, Zn = Math.min, Xe = Math.round;
function ao() {
=======
var Ee = Math.max, lr = Math.min, qe = Math.round;
function wo() {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
<<<<<<< HEAD
function ys() {
  return !/^((?!chrome|android).)*safari/i.test(ao());
=======
function Bs() {
  return !/^((?!chrome|android).)*safari/i.test(wo());
>>>>>>> 94f7504ec2 (add a muted menubar variant)
}
function Ye(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
<<<<<<< HEAD
  e && zt(t) && (o = t.offsetWidth > 0 && Xe(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Xe(r.height) / t.offsetHeight || 1);
  var i = Te(t) ? Dt(t) : window, l = i.visualViewport, c = !ys() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, w = r.height / a;
=======
  e && Lt(t) && (o = t.offsetWidth > 0 && qe(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && qe(r.height) / t.offsetHeight || 1);
  var s = _e(t) ? Bt(t) : window, l = s.visualViewport, c = !Bs() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, w = r.height / a;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Go(t) {
  var e = Ye(t), n = t.offsetWidth, r = t.offsetHeight;
=======
function ea(t) {
  var e = Ke(t), n = t.offsetWidth, r = t.offsetHeight;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
<<<<<<< HEAD
function xs(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Lo(n)) {
=======
function Vs(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && ta(n)) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function xw(t) {
  return ["table", "td", "th"].indexOf(Kt(t)) >= 0;
=======
function wf(t) {
  return ["table", "td", "th"].indexOf(Qt(t)) >= 0;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
}
function ce(t) {
  return ((Te(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
<<<<<<< HEAD
function Er(t) {
  return Kt(t) === "html" ? t : (
=======
function Pr(t) {
  return Qt(t) === "html" ? t : (
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
<<<<<<< HEAD
    (Lo(t) ? t.host : null) || // ShadowRoot detected
=======
    (ta(t) ? t.host : null) || // ShadowRoot detected
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ce(t)
  );
}
<<<<<<< HEAD
function Ya(t) {
  return !zt(t) || // https://github.com/popperjs/popper-core/issues/837
  ee(t).position === "fixed" ? null : t.offsetParent;
}
function Nw(t) {
  var e = /firefox/i.test(ao()), n = /Trident/i.test(ao());
  if (n && zt(t)) {
    var r = ee(t);
    if (r.position === "fixed")
      return null;
  }
  var o = Er(t);
  for (Lo(o) && (o = o.host); zt(o) && ["html", "body"].indexOf(Kt(o)) < 0; ) {
    var a = ee(o);
=======
function ii(t) {
  return !Lt(t) || // https://github.com/popperjs/popper-core/issues/837
  ae(t).position === "fixed" ? null : t.offsetParent;
}
function ff(t) {
  var e = /firefox/i.test(wo()), n = /Trident/i.test(wo());
  if (n && Lt(t)) {
    var r = ae(t);
    if (r.position === "fixed")
      return null;
  }
  var o = Pr(t);
  for (ta(o) && (o = o.host); Lt(o) && ["html", "body"].indexOf(Qt(o)) < 0; ) {
    var a = ae(o);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
<<<<<<< HEAD
function Pn(t) {
  for (var e = Dt(t), n = Ya(t); n && xw(n) && ee(n).position === "static"; )
    n = Ya(n);
  return n && (Kt(n) === "html" || Kt(n) === "body" && ee(n).position === "static") ? e : n || Nw(t) || e;
}
function Uo(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function mn(t, e, n) {
  return ye(t, Zn(e, n));
}
function kw(t, e, n) {
  var r = mn(t, e, n);
  return r > n ? n : r;
}
function Ns() {
=======
function Vn(t) {
  for (var e = Bt(t), n = ii(t); n && wf(n) && ae(n).position === "static"; )
    n = ii(n);
  return n && (Qt(n) === "html" || Qt(n) === "body" && ae(n).position === "static") ? e : n || ff(t) || e;
}
function na(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function kn(t, e, n) {
  return Ee(t, lr(e, n));
}
function mf(t, e, n) {
  var r = kn(t, e, n);
  return r > n ? n : r;
}
function zs() {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
<<<<<<< HEAD
function ks(t) {
  return Object.assign({}, Ns(), t);
}
function Es(t, e) {
=======
function Fs(t) {
  return Object.assign({}, zs(), t);
}
function Ls(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
<<<<<<< HEAD
var Ew = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, ks(typeof e != "number" ? e : Es(e, _n));
};
function Sw(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, l = Ht(n.placement), c = Uo(l), d = [Rt, Lt].indexOf(l) >= 0, p = d ? "height" : "width";
  if (!(!a || !i)) {
    var f = Ew(o.padding, n), w = Go(a), g = c === "y" ? Ot : Rt, v = c === "y" ? Ft : Lt, m = n.rects.reference[p] + n.rects.reference[c] - i[c] - n.rects.popper[p], h = i[c] - n.rects.reference[c], k = Pn(a), T = k ? c === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, C = m / 2 - h / 2, E = f[g], b = T - w[p] - f[v], I = T / 2 - w[p] / 2 + C, V = mn(E, I, b), R = c;
    n.modifiersData[r] = (e = {}, e[R] = V, e.centerOffset = V - I, e);
  }
}
function Tw(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || xs(e.elements.popper, o) && (e.elements.arrow = o));
}
const Cw = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Sw,
  effect: Tw,
=======
var hf = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, Fs(typeof e != "number" ? e : Ls(e, Bn));
};
function gf(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Kt(n.placement), c = na(l), d = [Pt, Ut].indexOf(l) >= 0, p = d ? "height" : "width";
  if (!(!a || !s)) {
    var f = hf(o.padding, n), w = ea(a), g = c === "y" ? _t : Pt, y = c === "y" ? Gt : Ut, m = n.rects.reference[p] + n.rects.reference[c] - s[c] - n.rects.popper[p], h = s[c] - n.rects.reference[c], k = Vn(a), T = k ? c === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, C = m / 2 - h / 2, S = f[g], v = T - w[p] - f[y], I = T / 2 - w[p] / 2 + C, B = kn(S, I, v), O = c;
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function He(t) {
  return t.split("-")[1];
}
<<<<<<< HEAD
var Ow = {
=======
var yf = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
<<<<<<< HEAD
function Rw(t, e) {
=======
function xf(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: Xe(n * o) / o || 0,
    y: Xe(r * o) / o || 0
  };
}
<<<<<<< HEAD
function Ha(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, i = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, p = t.roundOffsets, f = t.isFixed, w = i.x, g = w === void 0 ? 0 : w, v = i.y, m = v === void 0 ? 0 : v, h = typeof p == "function" ? p({
=======
function si(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, s = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, p = t.roundOffsets, f = t.isFixed, w = s.x, g = w === void 0 ? 0 : w, y = s.y, m = y === void 0 ? 0 : y, h = typeof p == "function" ? p({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    x: g,
    y: m
  }) : {
    x: g,
    y: m
  };
  g = h.x, m = h.y;
<<<<<<< HEAD
  var k = i.hasOwnProperty("x"), T = i.hasOwnProperty("y"), C = Rt, E = Ot, b = window;
  if (d) {
    var I = Pn(n), V = "clientHeight", R = "clientWidth";
    if (I === Dt(n) && (I = ce(n), ee(I).position !== "static" && l === "absolute" && (V = "scrollHeight", R = "scrollWidth")), I = I, o === Ot || (o === Rt || o === Lt) && a === Nn) {
      E = Ft;
      var P = f && I === b && b.visualViewport ? b.visualViewport.height : (
=======
  var k = s.hasOwnProperty("x"), T = s.hasOwnProperty("y"), C = Pt, S = _t, v = window;
  if (d) {
    var I = Vn(n), B = "clientHeight", O = "clientWidth";
    if (I === Bt(n) && (I = we(n), ae(I).position !== "static" && l === "absolute" && (B = "scrollHeight", O = "scrollWidth")), I = I, o === _t || (o === Pt || o === Ut) && a === _n) {
      S = Gt;
      var $ = f && I === v && v.visualViewport ? v.visualViewport.height : (
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        // $FlowFixMe[prop-missing]
        I[V]
      );
      m -= P - r.height, m *= c ? 1 : -1;
    }
    if (o === Rt || (o === Ot || o === Ft) && a === Nn) {
      C = Lt;
      var G = f && I === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        I[R]
      );
      g -= G - r.width, g *= c ? 1 : -1;
    }
  }
  var A = Object.assign({
    position: l
<<<<<<< HEAD
  }, d && Ow), Q = p === !0 ? Rw({
=======
  }, d && yf), Q = p === !0 ? xf({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    x: g,
    y: m
  }, Dt(n)) : {
    x: g,
    y: m
  };
  if (g = Q.x, m = Q.y, c) {
<<<<<<< HEAD
    var $;
    return Object.assign({}, A, ($ = {}, $[E] = T ? "0" : "", $[C] = k ? "0" : "", $.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", $));
  }
  return Object.assign({}, A, (e = {}, e[E] = T ? m + "px" : "", e[C] = k ? g + "px" : "", e.transform = "", e));
}
function _w(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Ht(e.placement),
    variation: He(e.placement),
=======
    var P;
    return Object.assign({}, A, (P = {}, P[S] = T ? "0" : "", P[C] = k ? "0" : "", P.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", P));
  }
  return Object.assign({}, A, (e = {}, e[S] = T ? m + "px" : "", e[C] = k ? g + "px" : "", e.transform = "", e));
}
function Nf(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Kt(e.placement),
    variation: Je(e.placement),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
<<<<<<< HEAD
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Ha(Object.assign({}, d, {
=======
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, si(Object.assign({}, d, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: i,
    roundOffsets: c
<<<<<<< HEAD
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ha(Object.assign({}, d, {
=======
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, si(Object.assign({}, d, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
<<<<<<< HEAD
const Pw = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: _w,
  data: {}
};
var zn = {
  passive: !0
};
function $w(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, l = i === void 0 ? !0 : i, c = Dt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(p) {
    p.addEventListener("scroll", n.update, zn);
  }), l && c.addEventListener("resize", n.update, zn), function() {
    a && d.forEach(function(p) {
      p.removeEventListener("scroll", n.update, zn);
    }), l && c.removeEventListener("resize", n.update, zn);
  };
}
const Iw = {
=======
const kf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Nf,
  data: {}
};
var qn = {
  passive: !0
};
function Ef(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Bt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(p) {
    p.addEventListener("scroll", n.update, qn);
  }), l && c.addEventListener("resize", n.update, qn), function() {
    a && d.forEach(function(p) {
      p.removeEventListener("scroll", n.update, qn);
    }), l && c.removeEventListener("resize", n.update, qn);
  };
}
const Sf = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
<<<<<<< HEAD
  effect: $w,
  data: {}
};
var Mw = {
=======
  effect: Ef,
  data: {}
};
var Tf = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
<<<<<<< HEAD
function Yn(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Mw[e];
  });
}
var Aw = {
  start: "end",
  end: "start"
};
function qa(t) {
  return t.replace(/start|end/g, function(e) {
    return Aw[e];
  });
}
function Xo(t) {
  var e = Dt(t), n = e.pageXOffset, r = e.pageYOffset;
=======
function nr(t) {
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
function ra(t) {
  var e = Bt(t), n = e.pageXOffset, r = e.pageYOffset;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
<<<<<<< HEAD
function Yo(t) {
  return Ye(ce(t)).left + Xo(t).scrollLeft;
}
function Dw(t, e) {
  var n = Dt(t), r = ce(t), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var d = ys();
=======
function oa(t) {
  return Ke(we(t)).left + ra(t).scrollLeft;
}
function Rf(t, e) {
  var n = Bt(t), r = we(t), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var d = Bs();
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    (d || !d && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
<<<<<<< HEAD
    height: i,
    x: l + Yo(t),
    y: c
  };
}
function jw(t) {
  var e, n = ce(t), r = Xo(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = ye(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = ye(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Yo(t), c = -r.scrollTop;
  return ee(o || n).direction === "rtl" && (l += ye(n.clientWidth, o ? o.clientWidth : 0) - a), {
=======
    height: s,
    x: l + oa(t),
    y: c
  };
}
function Of(t) {
  var e, n = we(t), r = ra(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = Ee(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Ee(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + oa(t), c = -r.scrollTop;
  return ae(o || n).direction === "rtl" && (l += Ee(n.clientWidth, o ? o.clientWidth : 0) - a), {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    width: a,
    height: i,
    x: l,
    y: c
  };
}
<<<<<<< HEAD
function Ho(t) {
  var e = ee(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ss(t) {
  return ["html", "body", "#document"].indexOf(Kt(t)) >= 0 ? t.ownerDocument.body : zt(t) && Ho(t) ? t : Ss(Er(t));
=======
function aa(t) {
  var e = ae(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Gs(t) {
  return ["html", "body", "#document"].indexOf(Qt(t)) >= 0 ? t.ownerDocument.body : Lt(t) && aa(t) ? t : Gs(Pr(t));
>>>>>>> 94f7504ec2 (add a muted menubar variant)
}
function hn(t, e) {
  var n;
  e === void 0 && (e = []);
<<<<<<< HEAD
  var r = Ss(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Dt(r), i = o ? [a].concat(a.visualViewport || [], Ho(r) ? r : []) : r, l = e.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(hn(Er(i)))
  );
}
function io(t) {
=======
  var r = Gs(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Bt(r), s = o ? [a].concat(a.visualViewport || [], aa(r) ? r : []) : r, l = e.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(En(Pr(s)))
  );
}
function fo(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
<<<<<<< HEAD
function Bw(t, e) {
  var n = Ye(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Wa(t, e, n) {
  return e === bs ? io(Dw(t, n)) : Te(e) ? Bw(e, n) : io(jw(ce(t)));
}
function Vw(t) {
  var e = hn(Er(t)), n = ["absolute", "fixed"].indexOf(ee(t).position) >= 0, r = n && zt(t) ? Pn(t) : t;
  return Te(r) ? e.filter(function(o) {
    return Te(o) && xs(o, r) && Kt(o) !== "body";
  }) : [];
}
function zw(t, e, n, r) {
  var o = e === "clippingParents" ? Vw(t) : [].concat(e), a = [].concat(o, [n]), i = a[0], l = a.reduce(function(c, d) {
    var p = Wa(t, d, r);
    return c.top = ye(p.top, c.top), c.right = Zn(p.right, c.right), c.bottom = Zn(p.bottom, c.bottom), c.left = ye(p.left, c.left), c;
  }, Wa(t, i, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ts(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Ht(r) : null, a = r ? He(r) : null, i = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
=======
function _f(t, e) {
  var n = Ke(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ci(t, e, n) {
  return e === Ds ? fo(Rf(t, n)) : _e(e) ? _f(e, n) : fo(Of(we(t)));
}
function Pf(t) {
  var e = En(Pr(t)), n = ["absolute", "fixed"].indexOf(ae(t).position) >= 0, r = n && Lt(t) ? Vn(t) : t;
  return _e(r) ? e.filter(function(o) {
    return _e(o) && Vs(o, r) && Qt(o) !== "body";
  }) : [];
}
function $f(t, e, n, r) {
  var o = e === "clippingParents" ? Pf(t) : [].concat(e), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, d) {
    var p = ci(t, d, r);
    return c.top = Ee(p.top, c.top), c.right = lr(p.right, c.right), c.bottom = lr(p.bottom, c.bottom), c.left = Ee(p.left, c.left), c;
  }, ci(t, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Us(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Kt(r) : null, a = r ? Je(r) : null, s = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  var d = o ? Uo(o) : null;
=======
  var d = o ? na(o) : null;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (d != null) {
    var p = d === "y" ? "height" : "width";
    switch (a) {
      case Ue:
        c[d] = c[d] - (e[p] / 2 - n[p] / 2);
        break;
      case Nn:
        c[d] = c[d] + (e[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function kn(t, e) {
  e === void 0 && (e = {});
<<<<<<< HEAD
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, i = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? iw : l, d = n.rootBoundary, p = d === void 0 ? bs : d, f = n.elementContext, w = f === void 0 ? sn : f, g = n.altBoundary, v = g === void 0 ? !1 : g, m = n.padding, h = m === void 0 ? 0 : m, k = ks(typeof h != "number" ? h : Es(h, _n)), T = w === sn ? sw : sn, C = t.rects.popper, E = t.elements[v ? T : w], b = zw(Te(E) ? E : E.contextElement || ce(t.elements.popper), c, p, i), I = Ye(t.elements.reference), V = Ts({
=======
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, s = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? Jw : l, d = n.rootBoundary, p = d === void 0 ? Ds : d, f = n.elementContext, w = f === void 0 ? un : f, g = n.altBoundary, y = g === void 0 ? !1 : g, m = n.padding, h = m === void 0 ? 0 : m, k = Fs(typeof h != "number" ? h : Ls(h, Bn)), T = w === un ? Zw : un, C = t.rects.popper, S = t.elements[y ? T : w], v = $f(_e(S) ? S : S.contextElement || we(t.elements.popper), c, p, s), I = Ke(t.elements.reference), B = Us({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    reference: I,
    element: C,
    placement: o
<<<<<<< HEAD
  }), R = io(Object.assign({}, C, V)), P = w === sn ? R : I, G = {
    top: b.top - P.top + k.top,
    bottom: P.bottom - b.bottom + k.bottom,
    left: b.left - P.left + k.left,
    right: P.right - b.right + k.right
  }, A = t.modifiersData.offset;
  if (w === sn && A) {
    var Q = A[o];
    Object.keys(G).forEach(function($) {
      var F = [Lt, Ft].indexOf($) >= 0 ? 1 : -1, B = [Ot, Ft].indexOf($) >= 0 ? "y" : "x";
      G[$] += Q[B] * F;
=======
  }), O = fo(Object.assign({}, C, B)), $ = w === un ? O : I, L = {
    top: v.top - $.top + k.top,
    bottom: $.bottom - v.bottom + k.bottom,
    left: v.left - $.left + k.left,
    right: $.right - v.right + k.right
  }, A = t.modifiersData.offset;
  if (w === un && A) {
    var Q = A[o];
    Object.keys(L).forEach(function(P) {
      var G = [Ut, Gt].indexOf(P) >= 0 ? 1 : -1, j = [_t, Gt].indexOf(P) >= 0 ? "y" : "x";
      L[P] += Q[j] * G;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    });
  }
  return G;
}
<<<<<<< HEAD
function Fw(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? vs : c, p = He(r), f = p ? l ? Xa : Xa.filter(function(v) {
    return He(v) === p;
  }) : _n, w = f.filter(function(v) {
    return d.indexOf(v) >= 0;
=======
function If(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? js : c, p = Je(r), f = p ? l ? ai : ai.filter(function(y) {
    return Je(y) === p;
  }) : Bn, w = f.filter(function(y) {
    return d.indexOf(y) >= 0;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  });
  w.length === 0 && (w = f);
  var g = w.reduce(function(v, m) {
    return v[m] = kn(t, {
      placement: m,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Ht(m)], v;
  }, {});
  return Object.keys(g).sort(function(v, m) {
    return g[v] - g[m];
  });
}
<<<<<<< HEAD
function Lw(t) {
  if (Ht(t) === Fo)
    return [];
  var e = Yn(t);
  return [qa(t), e, qa(e)];
}
function Gw(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !0 : i, c = n.fallbackPlacements, d = n.padding, p = n.boundary, f = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, v = g === void 0 ? !0 : g, m = n.allowedAutoPlacements, h = e.options.placement, k = Ht(h), T = k === h, C = c || (T || !v ? [Yn(h)] : Lw(h)), E = [h].concat(C).reduce(function(L, K) {
      return L.concat(Ht(K) === Fo ? Fw(e, {
=======
function Mf(t) {
  if (Kt(t) === Qo)
    return [];
  var e = nr(t);
  return [li(t), e, li(e)];
}
function Af(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, d = n.padding, p = n.boundary, f = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, y = g === void 0 ? !0 : g, m = n.allowedAutoPlacements, h = e.options.placement, k = Kt(h), T = k === h, C = c || (T || !y ? [nr(h)] : Mf(h)), S = [h].concat(C).reduce(function(F, K) {
      return F.concat(Kt(K) === Qo ? If(e, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        placement: K,
        boundary: p,
        rootBoundary: f,
        padding: d,
        flipVariations: v,
        allowedAutoPlacements: m
      }) : K);
<<<<<<< HEAD
    }, []), b = e.rects.reference, I = e.rects.popper, V = /* @__PURE__ */ new Map(), R = !0, P = E[0], G = 0; G < E.length; G++) {
      var A = E[G], Q = Ht(A), $ = He(A) === Ue, F = [Ot, Ft].indexOf(Q) >= 0, B = F ? "width" : "height", D = kn(e, {
=======
    }, []), v = e.rects.reference, I = e.rects.popper, B = /* @__PURE__ */ new Map(), O = !0, $ = S[0], L = 0; L < S.length; L++) {
      var A = S[L], Q = Kt(A), P = Je(A) === We, G = [_t, Gt].indexOf(Q) >= 0, j = G ? "width" : "height", V = Pn(e, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        placement: A,
        boundary: p,
        rootBoundary: f,
        altBoundary: w,
        padding: d
<<<<<<< HEAD
      }), U = F ? $ ? Lt : Rt : $ ? Ft : Ot;
      b[B] > I[B] && (U = Yn(U));
      var nt = Yn(U), at = [];
      if (a && at.push(D[Q] <= 0), l && at.push(D[U] <= 0, D[nt] <= 0), at.every(function(L) {
        return L;
      })) {
        P = A, R = !1;
        break;
      }
      V.set(A, at);
    }
    if (R)
      for (var y = v ? 3 : 1, O = function(K) {
        var q = E.find(function(W) {
          var H = V.get(W);
          if (H)
            return H.slice(0, K).every(function(J) {
=======
      }), H = G ? P ? Ut : Pt : P ? Gt : _t;
      v[j] > I[j] && (H = nr(H));
      var nt = nr(H), ot = [];
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
              return J;
            });
        });
        if (q)
          return P = q, "break";
      }, X = y; X > 0; X--) {
        var Y = O(X);
        if (Y === "break") break;
      }
    e.placement !== P && (e.modifiersData[r]._skip = !0, e.placement = P, e.reset = !0);
  }
}
<<<<<<< HEAD
const Uw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Gw,
=======
const Df = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Af,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
<<<<<<< HEAD
function Ka(t, e, n) {
=======
function di(t, e, n) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Ja(t) {
  return [Ot, Lt, Ft, Rt].some(function(e) {
    return t[e] >= 0;
  });
}
function Xw(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, i = kn(e, {
=======
function pi(t) {
  return [_t, Ut, Gt, Pt].some(function(e) {
    return t[e] >= 0;
  });
}
function jf(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, s = Pn(e, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    elementContext: "reference"
  }), l = kn(e, {
    altBoundary: !0
<<<<<<< HEAD
  }), c = Ka(i, r), d = Ka(l, o, a), p = Ja(c), f = Ja(d);
=======
  }), c = di(s, r), d = di(l, o, a), p = pi(c), f = pi(d);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const Yw = {
=======
const Bf = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
<<<<<<< HEAD
  fn: Xw
};
function Hw(t, e, n) {
  var r = Ht(t), o = [Rt, Ot].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
=======
  fn: jf
};
function Vf(t, e, n) {
  var r = Kt(t), o = [Pt, _t].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function qw(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = vs.reduce(function(p, f) {
    return p[f] = Hw(f, e.rects, a), p;
  }, {}), l = i[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = i;
}
const Ww = {
=======
function zf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = js.reduce(function(p, f) {
    return p[f] = Vf(f, e.rects, a), p;
  }, {}), l = s[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = s;
}
const Ff = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
<<<<<<< HEAD
  fn: qw
};
function Kw(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Ts({
=======
  fn: zf
};
function Lf(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Us({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    reference: e.rects.reference,
    element: e.rects.popper,
    placement: e.placement
  });
}
<<<<<<< HEAD
const Jw = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Kw,
  data: {}
};
function Zw(t) {
  return t === "x" ? "y" : "x";
}
function Qw(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !1 : i, c = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.padding, w = n.tether, g = w === void 0 ? !0 : w, v = n.tetherOffset, m = v === void 0 ? 0 : v, h = kn(e, {
=======
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
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, d = n.rootBoundary, p = n.altBoundary, f = n.padding, w = n.tether, g = w === void 0 ? !0 : w, y = n.tetherOffset, m = y === void 0 ? 0 : y, h = Pn(e, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    boundary: c,
    rootBoundary: d,
    padding: f,
    altBoundary: p
<<<<<<< HEAD
  }), k = Ht(e.placement), T = He(e.placement), C = !T, E = Uo(k), b = Zw(E), I = e.modifiersData.popperOffsets, V = e.rects.reference, R = e.rects.popper, P = typeof m == "function" ? m(Object.assign({}, e.rects, {
=======
  }), k = Kt(e.placement), T = Je(e.placement), C = !T, S = na(k), v = Uf(S), I = e.modifiersData.popperOffsets, B = e.rects.reference, O = e.rects.popper, $ = typeof m == "function" ? m(Object.assign({}, e.rects, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    placement: e.placement
  })) : m, G = typeof P == "number" ? {
    mainAxis: P,
    altAxis: P
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
<<<<<<< HEAD
  }, P), A = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, Q = {
=======
  }, $), A = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, Q = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    x: 0,
    y: 0
  };
  if (I) {
    if (a) {
<<<<<<< HEAD
      var $, F = E === "y" ? Ot : Rt, B = E === "y" ? Ft : Lt, D = E === "y" ? "height" : "width", U = I[E], nt = U + h[F], at = U - h[B], y = g ? -R[D] / 2 : 0, O = T === Ue ? V[D] : R[D], X = T === Ue ? -R[D] : -V[D], Y = e.elements.arrow, L = g && Y ? Go(Y) : {
        width: 0,
        height: 0
      }, K = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Ns(), q = K[F], W = K[B], H = mn(0, V[D], L[D]), J = C ? V[D] / 2 - y - H - q - G.mainAxis : O - H - q - G.mainAxis, Z = C ? -V[D] / 2 + y + H + W + G.mainAxis : X + H + W + G.mainAxis, dt = e.elements.arrow && Pn(e.elements.arrow), M = dt ? E === "y" ? dt.clientTop || 0 : dt.clientLeft || 0 : 0, Nt = ($ = A == null ? void 0 : A[E]) != null ? $ : 0, z = U + J - Nt - M, yt = U + Z - Nt, Ut = mn(g ? Zn(nt, z) : nt, U, g ? ye(at, yt) : at);
      I[E] = Ut, Q[E] = Ut - U;
    }
    if (l) {
      var de, St = E === "x" ? Ot : Rt, In = E === "x" ? Ft : Lt, Xt = I[b], Ce = b === "y" ? "height" : "width", pe = Xt + h[St], Oe = Xt - h[In], Re = [Ot, Rt].indexOf(k) !== -1, _e = (de = A == null ? void 0 : A[b]) != null ? de : 0, ue = Re ? pe : Xt - V[Ce] - R[Ce] - _e + G.altAxis, Ze = Re ? Xt + V[Ce] + R[Ce] - _e - G.altAxis : Oe, Mn = g && Re ? kw(ue, Xt, Ze) : mn(g ? ue : pe, Xt, g ? Ze : Oe);
      I[b] = Mn, Q[b] = Mn - Xt;
=======
      var P, G = S === "y" ? _t : Pt, j = S === "y" ? Gt : Ut, V = S === "y" ? "height" : "width", H = I[S], nt = H + h[G], ot = H - h[j], N = g ? -O[V] / 2 : 0, R = T === We ? B[V] : O[V], U = T === We ? -O[V] : -B[V], X = e.elements.arrow, F = g && X ? ea(X) : {
        width: 0,
        height: 0
      }, K = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : zs(), W = K[G], q = K[j], Y = kn(0, B[V], F[V]), J = C ? B[V] / 2 - N - Y - W - L.mainAxis : R - Y - W - L.mainAxis, Z = C ? -B[V] / 2 + N + Y + q + L.mainAxis : U + Y + q + L.mainAxis, dt = e.elements.arrow && Vn(e.elements.arrow), M = dt ? S === "y" ? dt.clientTop || 0 : dt.clientLeft || 0 : 0, Et = (P = A == null ? void 0 : A[S]) != null ? P : 0, z = H + J - Et - M, Nt = H + Z - Et, Ht = kn(g ? lr(nt, z) : nt, H, g ? Ee(ot, Nt) : ot);
      I[S] = Ht, Q[S] = Ht - H;
    }
    if (l) {
      var fe, Ct = S === "x" ? _t : Pt, Ln = S === "x" ? Gt : Ut, Yt = I[v], Pe = v === "y" ? "height" : "width", me = Yt + h[Ct], $e = Yt - h[Ln], Ie = [_t, Pt].indexOf(k) !== -1, Me = (fe = A == null ? void 0 : A[v]) != null ? fe : 0, he = Ie ? me : Yt - B[Pe] - O[Pe] - Me + L.altAxis, rn = Ie ? Yt + B[Pe] + O[Pe] - Me - L.altAxis : $e, Gn = g && Ie ? mf(he, Yt, rn) : kn(g ? he : me, Yt, g ? rn : $e);
      I[v] = Gn, Q[v] = Gn - Yt;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    }
    e.modifiersData[r] = Q;
  }
}
<<<<<<< HEAD
const tf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Qw,
  requiresIfExists: ["offset"]
};
function ef(t) {
=======
const Hf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Xf,
  requiresIfExists: ["offset"]
};
function Yf(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
<<<<<<< HEAD
function nf(t) {
  return t === Dt(t) || !zt(t) ? Xo(t) : ef(t);
}
function rf(t) {
  var e = t.getBoundingClientRect(), n = Xe(e.width) / t.offsetWidth || 1, r = Xe(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function of(t, e, n) {
  n === void 0 && (n = !1);
  var r = zt(e), o = zt(e) && rf(e), a = ce(e), i = Ye(t, o, n), l = {
=======
function Wf(t) {
  return t === Bt(t) || !Lt(t) ? ra(t) : Yf(t);
}
function qf(t) {
  var e = t.getBoundingClientRect(), n = qe(e.width) / t.offsetWidth || 1, r = qe(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Kf(t, e, n) {
  n === void 0 && (n = !1);
  var r = Lt(e), o = Lt(e) && qf(e), a = we(e), s = Ke(t, o, n), l = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
<<<<<<< HEAD
  return (r || !r && !n) && ((Kt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ho(a)) && (l = nf(e)), zt(e) ? (c = Ye(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = Yo(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function af(t) {
=======
  return (r || !r && !n) && ((Qt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  aa(a)) && (l = Wf(e)), Lt(e) ? (c = Ke(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = oa(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Jf(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function sf(t) {
  var e = af(t);
  return gw.reduce(function(n, r) {
=======
function Zf(t) {
  var e = Jf(t);
  return cf.reduce(function(n, r) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
<<<<<<< HEAD
function lf(t) {
=======
function Qf(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
<<<<<<< HEAD
function cf(t) {
=======
function tm(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
var Za = {
=======
var ui = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
<<<<<<< HEAD
function Qa() {
=======
function wi() {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
<<<<<<< HEAD
function df(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? Za : o;
=======
function em(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? ui : o;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return function(l, c, d) {
    d === void 0 && (d = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
<<<<<<< HEAD
      options: Object.assign({}, Za, a),
=======
      options: Object.assign({}, ui, a),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
          reference: Te(l) ? hn(l) : l.contextElement ? hn(l.contextElement) : [],
          popper: hn(c)
        };
<<<<<<< HEAD
        var C = sf(cf([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = C.filter(function(E) {
          return E.enabled;
        }), v(), g.update();
=======
        var C = Zf(tm([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = C.filter(function(S) {
          return S.enabled;
        }), y(), g.update();
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var k = p.elements, T = k.reference, C = k.popper;
<<<<<<< HEAD
          if (Qa(T, C)) {
            p.rects = {
              reference: of(T, Pn(C), p.options.strategy === "fixed"),
              popper: Go(C)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(G) {
              return p.modifiersData[G.name] = Object.assign({}, G.data);
=======
          if (wi(T, C)) {
            p.rects = {
              reference: Kf(T, Vn(C), p.options.strategy === "fixed"),
              popper: ea(C)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(L) {
              return p.modifiersData[L.name] = Object.assign({}, L.data);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            });
            for (var S = 0; S < p.orderedModifiers.length; S++) {
              if (p.reset === !0) {
                p.reset = !1, S = -1;
                continue;
              }
<<<<<<< HEAD
              var b = p.orderedModifiers[E], I = b.fn, V = b.options, R = V === void 0 ? {} : V, P = b.name;
=======
              var v = p.orderedModifiers[S], I = v.fn, B = v.options, O = B === void 0 ? {} : B, $ = v.name;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
              typeof I == "function" && (p = I({
                state: p,
                options: R,
                name: P,
                instance: g
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
<<<<<<< HEAD
      update: lf(function() {
=======
      update: Qf(function() {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        return new Promise(function(h) {
          g.forceUpdate(), h(p);
        });
      }),
      destroy: function() {
        m(), w = !0;
      }
    };
<<<<<<< HEAD
    if (!Qa(l, c))
=======
    if (!wi(l, c))
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      return g;
    g.setOptions(d).then(function(h) {
      !w && d.onFirstUpdate && d.onFirstUpdate(h);
    });
    function v() {
      p.orderedModifiers.forEach(function(h) {
<<<<<<< HEAD
        var k = h.name, T = h.options, C = T === void 0 ? {} : T, E = h.effect;
        if (typeof E == "function") {
          var b = E({
=======
        var k = h.name, T = h.options, C = T === void 0 ? {} : T, S = h.effect;
        if (typeof S == "function") {
          var v = S({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
            state: p,
            name: k,
            instance: g,
            options: C
          }), I = function() {
          };
          f.push(b || I);
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
<<<<<<< HEAD
var pf = [Iw, Jw, Pw, yw, Ww, Uw, tf, Cw, Yw], uf = /* @__PURE__ */ df({
  defaultModifiers: pf
});
const wf = "Popper";
function ff(t) {
  return ow(wf, t);
}
const mf = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], hf = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function gf(t, e) {
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Qn(t) {
  return typeof t == "function" ? t() : t;
}
function Sr(t) {
  return t.nodeType !== void 0;
}
function bf(t) {
  return !Sr(t);
}
const vf = () => $o({
  root: ["root"]
}, Ku(ff)), yf = {}, xf = /* @__PURE__ */ j.forwardRef(function(e, n) {
=======
function cr(t) {
  return typeof t == "function" ? t() : t;
}
function $r(t) {
  return t.nodeType !== void 0;
}
function lm(t) {
  return !$r(t);
}
const cm = () => Lo({
  root: ["root"]
}, Fw(om)), dm = {}, pm = /* @__PURE__ */ D.forwardRef(function(e, n) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  } = e, h = kt(e, mf), k = j.useRef(null), T = Ee(k, n), C = j.useRef(null), E = Ee(C, w), b = j.useRef(E);
  Ge(() => {
    b.current = E;
  }, [E]), j.useImperativeHandle(w, () => C.current, []);
  const I = gf(p, i), [V, R] = j.useState(I), [P, G] = j.useState(Qn(o));
  j.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), j.useEffect(() => {
    o && G(Qn(o));
  }, [o]), Ge(() => {
    if (!P || !d)
=======
  } = e, h = St(e, am), k = D.useRef(null), T = Re(k, n), C = D.useRef(null), S = Re(C, w), v = D.useRef(S);
  Ye(() => {
    v.current = S;
  }, [S]), D.useImperativeHandle(w, () => C.current, []);
  const I = sm(p, s), [B, O] = D.useState(I), [$, L] = D.useState(cr(o));
  D.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), D.useEffect(() => {
    o && L(cr(o));
  }, [o]), Ye(() => {
    if (!$ || !d)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      return;
    const B = (nt) => {
      R(nt.placement);
    };
<<<<<<< HEAD
    if (process.env.NODE_ENV !== "production" && P && Sr(P) && P.nodeType === 1) {
      const nt = P.getBoundingClientRect();
=======
    if (process.env.NODE_ENV !== "production" && $ && $r($) && $.nodeType === 1) {
      const nt = $.getBoundingClientRect();
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      process.env.NODE_ENV !== "test" && nt.top === 0 && nt.left === 0 && nt.right === 0 && nt.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let D = [{
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
        B(nt);
      }
    }];
<<<<<<< HEAD
    c != null && (D = D.concat(c)), f && f.modifiers != null && (D = D.concat(f.modifiers));
    const U = uf(P, k.current, _({
=======
    c != null && (V = V.concat(c)), f && f.modifiers != null && (V = V.concat(f.modifiers));
    const H = rm($, k.current, _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      placement: I
    }, f, {
      modifiers: D
    }));
    return b.current(U), () => {
      U.destroy(), b.current(null);
    };
<<<<<<< HEAD
  }, [P, l, c, d, f, I]);
  const A = {
    placement: V
  };
  m !== null && (A.TransitionProps = m);
  const Q = vf(), $ = (r = v.root) != null ? r : "div", F = ew({
    elementType: $,
=======
  }, [$, l, c, d, f, I]);
  const A = {
    placement: B
  };
  m !== null && (A.TransitionProps = m);
  const Q = cm(), P = (r = y.root) != null ? r : "div", G = Hw({
    elementType: P,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: T
    },
    ownerState: e,
    className: Q.root
  });
<<<<<<< HEAD
  return /* @__PURE__ */ s($, _({}, F, {
    children: typeof a == "function" ? a(A) : a
  }));
}), Cs = /* @__PURE__ */ j.forwardRef(function(e, n) {
=======
  return /* @__PURE__ */ i(P, _({}, G, {
    children: typeof a == "function" ? a(A) : a
  }));
}), Hs = /* @__PURE__ */ D.forwardRef(function(e, n) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    popperOptions: w = yf,
=======
    popperOptions: w = dm,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    popperRef: g,
    style: v,
    transition: m = !1,
    slotProps: h = {},
    slots: k = {}
<<<<<<< HEAD
  } = e, T = kt(e, hf), [C, E] = j.useState(!0), b = () => {
    E(!1);
=======
  } = e, T = St(e, im), [C, S] = D.useState(!0), v = () => {
    S(!1);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  }, I = () => {
    S(!0);
  };
  if (!c && !p && (!m || C))
    return null;
  let V;
  if (a)
    V = a;
  else if (r) {
<<<<<<< HEAD
    const G = Qn(r);
    V = G && Sr(G) ? Hn(G).body : Hn(null).body;
=======
    const L = cr(r);
    B = L && $r(L) ? or(L).body : or(null).body;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  }
  const R = !p && c && (!m || C) ? "none" : void 0, P = m ? {
    in: p,
    onEnter: b,
    onExited: I
  } : void 0;
<<<<<<< HEAD
  return /* @__PURE__ */ s(Jn, {
    disablePortal: l,
    container: V,
    children: /* @__PURE__ */ s(xf, _({
=======
  return /* @__PURE__ */ i(sr, {
    disablePortal: l,
    container: B,
    children: /* @__PURE__ */ i(pm, _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
      style: _({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: R
      }, v),
      TransitionProps: P,
      children: o
    }))
  });
});
<<<<<<< HEAD
process.env.NODE_ENV !== "production" && (Cs.propTypes = {
=======
process.env.NODE_ENV !== "production" && (Hs.propTypes = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  anchorEl: Ro(u.oneOfType([yn, u.object, u.func]), (t) => {
    if (t.open) {
      const e = Qn(t.anchorEl);
      if (e && Sr(e) && e.nodeType === 1) {
=======
  anchorEl: zo(u.oneOfType([Rn, u.object, u.func]), (t) => {
    if (t.open) {
      const e = cr(t.anchorEl);
      if (e && $r(e) && e.nodeType === 1) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
<<<<<<< HEAD
      } else if (!e || typeof e.getBoundingClientRect != "function" || bf(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
=======
      } else if (!e || typeof e.getBoundingClientRect != "function" || lm(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
  container: u.oneOfType([yn, u.func]),
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
<<<<<<< HEAD
  popperRef: ns,
=======
  popperRef: bs,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Os() {
  const t = ws(Bo);
  return process.env.NODE_ENV !== "production" && j.useDebugValue(t), t[Vo] || t;
}
function so(t, e) {
  return so = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, so(t, e);
}
function Nf(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, so(t, e);
}
const ti = {
  disabled: !1
};
var kf = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
=======
function Ys() {
  const t = _s(qo);
  return process.env.NODE_ENV !== "production" && D.useDebugValue(t), t[Ko] || t;
}
function mo(t, e) {
  return mo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, mo(t, e);
}
function um(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, mo(t, e);
}
const fi = {
  disabled: !1
};
var wm = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const Rs = S.createContext(null);
var Ef = function(e) {
  return e.scrollTop;
}, un = "unmounted", me = "exited", he = "entering", je = "entered", lo = "exiting", re = /* @__PURE__ */ function(t) {
  Nf(e, t);
=======
const Ws = E.createContext(null);
var fm = function(e) {
  return e.scrollTop;
}, gn = "unmounted", ve = "exited", ye = "entering", Fe = "entered", ho = "exiting", ie = /* @__PURE__ */ function(t) {
  um(e, t);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      var i = this.state.status;
      this.props.in ? i !== he && i !== je && (a = he) : (i === he || i === je) && (a = lo);
=======
      var s = this.state.status;
      this.props.in ? s !== ye && s !== Fe && (a = ye) : (s === ye || s === Fe) && (a = ho);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
          var i = this.props.nodeRef ? this.props.nodeRef.current : jn.findDOMNode(this);
          i && Ef(i);
=======
          var s = this.props.nodeRef ? this.props.nodeRef.current : Hn.findDOMNode(this);
          s && fm(s);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        }
        this.performEnter(o);
      } else
        this.performExit();
    else this.props.unmountOnExit && this.state.status === me && this.setState({
      status: un
    });
  }, n.performEnter = function(o) {
<<<<<<< HEAD
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [jn.findDOMNode(this), l], d = c[0], p = c[1], f = this.getTimeouts(), w = l ? f.appear : f.enter;
    if (!o && !i || ti.disabled) {
=======
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Hn.findDOMNode(this), l], d = c[0], p = c[1], f = this.getTimeouts(), w = l ? f.appear : f.enter;
    if (!o && !s || fi.disabled) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : jn.findDOMNode(this);
    if (!a || ti.disabled) {
=======
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Hn.findDOMNode(this);
    if (!a || fi.disabled) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      this.safeSetState({
        status: me
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
<<<<<<< HEAD
      status: lo
=======
      status: ho
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    var i = this.props.nodeRef ? this.props.nodeRef.current : jn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
=======
    var s = this.props.nodeRef ? this.props.nodeRef.current : Hn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      /* @__PURE__ */ S.createElement(Rs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : S.cloneElement(S.Children.only(i), l))
    );
  }, e;
}(S.Component);
re.contextType = Rs;
re.propTypes = process.env.NODE_ENV !== "production" ? {
=======
      /* @__PURE__ */ E.createElement(Ws.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : E.cloneElement(E.Children.only(s), l))
    );
  }, e;
}(E.Component);
ie.contextType = Ws;
ie.propTypes = process.env.NODE_ENV !== "production" ? {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    var n = kf;
=======
    var n = wm;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
re.UNMOUNTED = un;
re.EXITED = me;
re.ENTERING = he;
re.ENTERED = je;
re.EXITING = lo;
const Sf = (t) => t.scrollTop;
function ei(t, e) {
=======
ie.UNMOUNTED = gn;
ie.EXITED = ve;
ie.ENTERING = ye;
ie.ENTERED = Fe;
ie.EXITING = ho;
const mm = ie, hm = (t) => t.scrollTop;
function mi(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const Tf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function co(t) {
  return `scale(${t}, ${t ** 2})`;
}
const Cf = {
  entering: {
    opacity: 1,
    transform: co(1)
=======
const gm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function go(t) {
  return `scale(${t}, ${t ** 2})`;
}
const bm = {
  entering: {
    opacity: 1,
    transform: go(1)
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
<<<<<<< HEAD
}, Xr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), tr = /* @__PURE__ */ j.forwardRef(function(e, n) {
=======
}, Zr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), ia = /* @__PURE__ */ D.forwardRef(function(e, n) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    TransitionComponent: h = re
  } = e, k = kt(e, Tf), T = dn(), C = j.useRef(), E = Os(), b = j.useRef(null), I = Ee(b, a.ref, n), V = (B) => (D) => {
    if (B) {
      const U = b.current;
      D === void 0 ? B(U) : B(U, D);
    }
  }, R = V(p), P = V((B, D) => {
    Sf(B);
=======
    TransitionComponent: h = mm
  } = e, k = St(e, gm), T = mn(), C = D.useRef(), S = Ys(), v = D.useRef(null), I = Re(v, a.ref, n), B = (j) => (V) => {
    if (j) {
      const H = v.current;
      V === void 0 ? j(H) : j(H, V);
    }
  }, O = B(p), $ = B((j, V) => {
    hm(j);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    const {
      duration: U,
      delay: nt,
<<<<<<< HEAD
      easing: at
    } = ei({
      style: v,
=======
      easing: ot
    } = mi({
      style: y,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      timeout: m,
      easing: i
    }, {
      mode: "enter"
    });
<<<<<<< HEAD
    let y;
    m === "auto" ? (y = E.transitions.getAutoHeightDuration(B.clientHeight), C.current = y) : y = U, B.style.transition = [E.transitions.create("opacity", {
      duration: y,
      delay: nt
    }), E.transitions.create("transform", {
      duration: Xr ? y : y * 0.666,
      delay: nt,
      easing: at
    })].join(","), c && c(B, D);
  }), G = V(d), A = V(g), Q = V((B) => {
=======
    let N;
    m === "auto" ? (N = S.transitions.getAutoHeightDuration(j.clientHeight), C.current = N) : N = H, j.style.transition = [S.transitions.create("opacity", {
      duration: N,
      delay: nt
    }), S.transitions.create("transform", {
      duration: Zr ? N : N * 0.666,
      delay: nt,
      easing: ot
    })].join(","), c && c(j, V);
  }), L = B(d), A = B(g), Q = B((j) => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    const {
      duration: D,
      delay: U,
      easing: nt
<<<<<<< HEAD
    } = ei({
      style: v,
=======
    } = mi({
      style: y,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      timeout: m,
      easing: i
    }, {
      mode: "exit"
    });
<<<<<<< HEAD
    let at;
    m === "auto" ? (at = E.transitions.getAutoHeightDuration(B.clientHeight), C.current = at) : at = D, B.style.transition = [E.transitions.create("opacity", {
      duration: at,
      delay: U
    }), E.transitions.create("transform", {
      duration: Xr ? at : at * 0.666,
      delay: Xr ? U : U || at * 0.333,
      easing: nt
    })].join(","), B.style.opacity = 0, B.style.transform = co(0.75), f && f(B);
  }), $ = V(w);
  return /* @__PURE__ */ s(h, _({
=======
    let ot;
    m === "auto" ? (ot = S.transitions.getAutoHeightDuration(j.clientHeight), C.current = ot) : ot = V, j.style.transition = [S.transitions.create("opacity", {
      duration: ot,
      delay: H
    }), S.transitions.create("transform", {
      duration: Zr ? ot : ot * 0.666,
      delay: Zr ? H : H || ot * 0.333,
      easing: nt
    })].join(","), j.style.opacity = 0, j.style.transform = go(0.75), f && f(j);
  }), P = B(w);
  return /* @__PURE__ */ i(h, _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: P,
    onEntered: G,
    onEntering: R,
    onExit: Q,
<<<<<<< HEAD
    onExited: $,
    onExiting: A,
    addEndListener: (B) => {
      m === "auto" && T.start(C.current || 0, B), r && r(b.current, B);
=======
    onExited: P,
    onExiting: A,
    addEndListener: (j) => {
      m === "auto" && T.start(C.current || 0, j), r && r(v.current, j);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    },
    timeout: m === "auto" ? null : m
  }, k, {
    children: (B, D) => /* @__PURE__ */ j.cloneElement(a, _({
      style: _({
        opacity: 0,
<<<<<<< HEAD
        transform: co(0.75),
        visibility: B === "exited" && !l ? "hidden" : void 0
      }, Cf[B], v, a.props.style),
=======
        transform: go(0.75),
        visibility: j === "exited" && !l ? "hidden" : void 0
      }, bm[j], y, a.props.style),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      ref: I
    }, D))
  }));
});
<<<<<<< HEAD
process.env.NODE_ENV !== "production" && (tr.propTypes = {
=======
process.env.NODE_ENV !== "production" && (ia.propTypes = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  children: Po.isRequired,
=======
  children: hs.isRequired,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
tr.muiSupportAuto = !0;
const Of = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Rf = Rn(Cs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), qo = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r;
  const o = us(), a = zo({
=======
ia.muiSupportAuto = !0;
const hi = ia, vm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], ym = jn(Hs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), qs = /* @__PURE__ */ D.forwardRef(function(e, n) {
  var r;
  const o = Os(), a = Jo({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
    slotProps: E
  } = a, b = kt(a, Of), I = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, V = _({
    anchorEl: i,
=======
    slotProps: S
  } = a, v = St(a, vm), I = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, B = _({
    anchorEl: s,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    container: p,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: v,
    placement: m,
    popperOptions: h,
    popperRef: k,
    transition: T
<<<<<<< HEAD
  }, b);
  return /* @__PURE__ */ s(Rf, _({
=======
  }, v);
  return /* @__PURE__ */ i(ym, _({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: I
    },
<<<<<<< HEAD
    slotProps: E ?? d
  }, V, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (qo.propTypes = {
=======
    slotProps: S ?? d
  }, B, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (qs.propTypes = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
  anchorEl: u.oneOfType([yn, u.object, u.func]),
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
  container: u.oneOfType([yn, u.func]),
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
<<<<<<< HEAD
  popperRef: ns,
=======
  popperRef: bs,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function _f(t) {
  return wr("MuiTooltip", t);
}
const ae = cs("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), Pf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function $f(t) {
  return Math.round(t * 1e5) / 1e5;
}
const If = (t) => {
=======
const Ks = qs;
function xm(t) {
  return xr("MuiTooltip", t);
}
const Nm = Ss("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ce = Nm, km = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Em(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Sm = (t) => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, i = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Wt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
<<<<<<< HEAD
  return $o(i, _f, e);
}, Mf = Rn(qo, {
=======
  return Lo(s, xm, e);
}, Tm = jn(Ks, {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
  [`&[data-popper-placement*="right"] .${ae.arrow}`]: _({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ae.arrow}`]: _({}, e.isRtl ? {
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
<<<<<<< HEAD
})), Af = Rn("div", {
=======
})), Cm = jn("div", {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${Wt(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => _({
<<<<<<< HEAD
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : fs(t.palette.grey[700], 0.92),
=======
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : Ps(t.palette.grey[700], 0.92),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  lineHeight: `${$f(16 / 14)}em`,
=======
  lineHeight: `${Em(16 / 14)}em`,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${ae.popper}[data-popper-placement*="left"] &`]: _({
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
  [`.${ae.popper}[data-popper-placement*="right"] &`]: _({
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
  [`.${ae.popper}[data-popper-placement*="top"] &`]: _({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${ae.popper}[data-popper-placement*="bottom"] &`]: _({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
<<<<<<< HEAD
})), Df = Rn("span", {
=======
})), Rm = jn("span", {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  color: t.vars ? t.vars.palette.Tooltip.bg : fs(t.palette.grey[700], 0.9),
=======
  color: t.vars ? t.vars.palette.Tooltip.bg : Ps(t.palette.grey[700], 0.9),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
let Fn = !1;
const ni = new Tn();
let ln = {
  x: 0,
  y: 0
};
function Ln(t, e) {
=======
let Kn = !1;
const gi = new Mn();
let wn = {
  x: 0,
  y: 0
};
function Jn(t, e) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return (n) => {
    e && e(n), t(n);
  };
}
<<<<<<< HEAD
const _s = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r, o, a, i, l, c, d, p, f, w, g, v, m, h, k, T, C, E, b;
  const I = zo({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: V = !1,
    children: R,
    components: P = {},
    componentsProps: G = {},
=======
const Js = /* @__PURE__ */ D.forwardRef(function(e, n) {
  var r, o, a, s, l, c, d, p, f, w, g, y, m, h, k, T, C, S, v;
  const I = Jo({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: B = !1,
    children: O,
    components: $ = {},
    componentsProps: L = {},
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    describeChild: A = !1,
    disableFocusListener: Q = !1,
    disableHoverListener: $ = !1,
    disableInteractive: F = !1,
    disableTouchListener: B = !1,
    enterDelay: D = 100,
    enterNextDelay: U = 0,
    enterTouchDelay: nt = 700,
    followCursor: at = !1,
    id: y,
    leaveDelay: O = 0,
    leaveTouchDelay: X = 1500,
    onClose: Y,
    onOpen: L,
    open: K,
    placement: q = "bottom",
    PopperComponent: W,
    PopperProps: H = {},
    slotProps: J = {},
    slots: Z = {},
    title: dt,
<<<<<<< HEAD
    TransitionComponent: M = tr,
    TransitionProps: Nt
  } = I, z = kt(I, Pf), yt = /* @__PURE__ */ j.isValidElement(R) ? R : /* @__PURE__ */ s("span", {
    children: R
  }), Ut = Os(), de = Ut.direction === "rtl", [St, In] = j.useState(), [Xt, Ce] = j.useState(null), pe = j.useRef(!1), Oe = F || at, Re = dn(), _e = dn(), ue = dn(), Ze = dn(), [Mn, Wo] = os({
=======
    TransitionComponent: M = hi,
    TransitionProps: Et
  } = I, z = St(I, km), Nt = /* @__PURE__ */ D.isValidElement(O) ? O : /* @__PURE__ */ i("span", {
    children: O
  }), Ht = Ys(), fe = Ht.direction === "rtl", [Ct, Ln] = D.useState(), [Yt, Pe] = D.useState(null), me = D.useRef(!1), $e = G || ot, Ie = mn(), Me = mn(), he = mn(), rn = mn(), [Gn, la] = ys({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
<<<<<<< HEAD
  let Jt = Mn;
=======
  let ee = Gn;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  if (process.env.NODE_ENV !== "production") {
    const {
      current: tt
    } = j.useRef(K !== void 0);
    j.useEffect(() => {
      St && St.disabled && !tt && dt !== "" && St.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [dt, St, tt]);
  }
<<<<<<< HEAD
  const Tr = rs(y), Qe = j.useRef(), An = ro(() => {
    Qe.current !== void 0 && (document.body.style.WebkitUserSelect = Qe.current, Qe.current = void 0), Ze.clear();
  });
  j.useEffect(() => An, [An]);
  const Ko = (tt) => {
    ni.clear(), Fn = !0, Wo(!0), L && !Jt && L(tt);
  }, Dn = ro(
=======
  const Ir = vs(N), on = D.useRef(), Un = po(() => {
    on.current !== void 0 && (document.body.style.WebkitUserSelect = on.current, on.current = void 0), rn.clear();
  });
  D.useEffect(() => Un, [Un]);
  const ca = (tt) => {
    gi.clear(), Kn = !0, la(!0), F && !ee && F(tt);
  }, Xn = po(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (tt) => {
<<<<<<< HEAD
      ni.start(800 + O, () => {
        Fn = !1;
      }), Wo(!1), Y && Jt && Y(tt), Re.start(Ut.transitions.duration.shortest, () => {
        pe.current = !1;
      });
    }
  ), Cr = (tt) => {
    pe.current && tt.type !== "touchstart" || (St && St.removeAttribute("title"), _e.clear(), ue.clear(), D || Fn && U ? _e.start(Fn ? U : D, () => {
      Ko(tt);
    }) : Ko(tt));
  }, Jo = (tt) => {
    _e.clear(), ue.start(O, () => {
      Dn(tt);
    });
  }, {
    isFocusVisibleRef: Zo,
    onBlur: Ms,
    onFocus: As,
    ref: Ds
  } = as(), [, Qo] = j.useState(!1), ta = (tt) => {
    Ms(tt), Zo.current === !1 && (Qo(!1), Jo(tt));
  }, ea = (tt) => {
    St || In(tt.currentTarget), As(tt), Zo.current === !0 && (Qo(!0), Cr(tt));
  }, na = (tt) => {
    pe.current = !0;
    const $t = yt.props;
    $t.onTouchStart && $t.onTouchStart(tt);
  }, ra = Cr, oa = Jo, js = (tt) => {
    na(tt), ue.clear(), Re.clear(), An(), Qe.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Ze.start(nt, () => {
      document.body.style.WebkitUserSelect = Qe.current, Cr(tt);
    });
  }, Bs = (tt) => {
    yt.props.onTouchEnd && yt.props.onTouchEnd(tt), An(), ue.start(X, () => {
      Dn(tt);
=======
      gi.start(800 + R, () => {
        Kn = !1;
      }), la(!1), X && ee && X(tt), Ie.start(Ht.transitions.duration.shortest, () => {
        me.current = !1;
      });
    }
  ), Mr = (tt) => {
    me.current && tt.type !== "touchstart" || (Ct && Ct.removeAttribute("title"), Me.clear(), he.clear(), V || Kn && H ? Me.start(Kn ? H : V, () => {
      ca(tt);
    }) : ca(tt));
  }, da = (tt) => {
    Me.clear(), he.start(R, () => {
      Xn(tt);
    });
  }, {
    isFocusVisibleRef: pa,
    onBlur: rl,
    onFocus: ol,
    ref: al
  } = xs(), [, ua] = D.useState(!1), wa = (tt) => {
    rl(tt), pa.current === !1 && (ua(!1), da(tt));
  }, fa = (tt) => {
    Ct || Ln(tt.currentTarget), ol(tt), pa.current === !0 && (ua(!0), Mr(tt));
  }, ma = (tt) => {
    me.current = !0;
    const Mt = Nt.props;
    Mt.onTouchStart && Mt.onTouchStart(tt);
  }, ha = Mr, ga = da, il = (tt) => {
    ma(tt), he.clear(), Ie.clear(), Un(), on.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", rn.start(nt, () => {
      document.body.style.WebkitUserSelect = on.current, Mr(tt);
    });
  }, sl = (tt) => {
    Nt.props.onTouchEnd && Nt.props.onTouchEnd(tt), Un(), he.start(U, () => {
      Xn(tt);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    });
  };
  j.useEffect(() => {
    if (!Jt)
      return;
<<<<<<< HEAD
    function tt($t) {
      ($t.key === "Escape" || $t.key === "Esc") && Dn($t);
=======
    function tt(Mt) {
      (Mt.key === "Escape" || Mt.key === "Esc") && Xn(Mt);
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    }
    return document.addEventListener("keydown", tt), () => {
      document.removeEventListener("keydown", tt);
    };
<<<<<<< HEAD
  }, [Dn, Jt]);
  const Vs = Ee(yt.ref, Ds, In, n);
  !dt && dt !== 0 && (Jt = !1);
  const Or = j.useRef(), zs = (tt) => {
    const $t = yt.props;
    $t.onMouseMove && $t.onMouseMove(tt), ln = {
      x: tt.clientX,
      y: tt.clientY
    }, Or.current && Or.current.update();
  }, tn = {}, Rr = typeof dt == "string";
  A ? (tn.title = !Jt && Rr && !$ ? dt : null, tn["aria-describedby"] = Jt ? Tr : null) : (tn["aria-label"] = Rr ? dt : null, tn["aria-labelledby"] = Jt && !Rr ? Tr : null);
  const jt = _({}, tn, z, yt.props, {
    className: ve(z.className, yt.props.className),
    onTouchStart: na,
    ref: Vs
  }, at ? {
    onMouseMove: zs
=======
  }, [Xn, ee]);
  const ll = Re(Nt.ref, al, Ln, n);
  !dt && dt !== 0 && (ee = !1);
  const Ar = D.useRef(), cl = (tt) => {
    const Mt = Nt.props;
    Mt.onMouseMove && Mt.onMouseMove(tt), wn = {
      x: tt.clientX,
      y: tt.clientY
    }, Ar.current && Ar.current.update();
  }, an = {}, Dr = typeof dt == "string";
  A ? (an.title = !ee && Dr && !P ? dt : null, an["aria-describedby"] = ee ? Ir : null) : (an["aria-label"] = Dr ? dt : null, an["aria-labelledby"] = ee && !Dr ? Ir : null);
  const Vt = _({}, an, z, Nt.props, {
    className: ke(z.className, Nt.props.className),
    onTouchStart: ma,
    ref: ll
  }, ot ? {
    onMouseMove: cl
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  } : {});
  process.env.NODE_ENV !== "production" && (jt["data-mui-internal-clone-element"] = !0, j.useEffect(() => {
    St && !St.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
<<<<<<< HEAD
  }, [St]));
  const en = {};
  B || (jt.onTouchStart = js, jt.onTouchEnd = Bs), $ || (jt.onMouseOver = Ln(ra, jt.onMouseOver), jt.onMouseLeave = Ln(oa, jt.onMouseLeave), Oe || (en.onMouseOver = ra, en.onMouseLeave = oa)), Q || (jt.onFocus = Ln(ea, jt.onFocus), jt.onBlur = Ln(ta, jt.onBlur), Oe || (en.onFocus = ea, en.onBlur = ta)), process.env.NODE_ENV !== "production" && yt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${yt.props.title}\` or the Tooltip component.`].join(`
`));
  const Fs = j.useMemo(() => {
    var tt;
    let $t = [{
=======
  }, [Ct]));
  const sn = {};
  j || (Vt.onTouchStart = il, Vt.onTouchEnd = sl), P || (Vt.onMouseOver = Jn(ha, Vt.onMouseOver), Vt.onMouseLeave = Jn(ga, Vt.onMouseLeave), $e || (sn.onMouseOver = ha, sn.onMouseLeave = ga)), Q || (Vt.onFocus = Jn(fa, Vt.onFocus), Vt.onBlur = Jn(wa, Vt.onBlur), $e || (sn.onFocus = fa, sn.onBlur = wa)), process.env.NODE_ENV !== "production" && Nt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${Nt.props.title}\` or the Tooltip component.`].join(`
`));
  const dl = D.useMemo(() => {
    var tt;
    let Mt = [{
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      name: "arrow",
      enabled: !!Xt,
      options: {
        element: Xt,
        padding: 4
      }
    }];
<<<<<<< HEAD
    return (tt = H.popperOptions) != null && tt.modifiers && ($t = $t.concat(H.popperOptions.modifiers)), _({}, H.popperOptions, {
      modifiers: $t
    });
  }, [Xt, H]), nn = _({}, I, {
    isRtl: de,
    arrow: V,
    disableInteractive: Oe,
    placement: q,
    PopperComponentProp: W,
    touch: pe.current
  }), _r = If(nn), aa = (r = (o = Z.popper) != null ? o : P.Popper) != null ? r : Mf, ia = (a = (i = (l = Z.transition) != null ? l : P.Transition) != null ? i : M) != null ? a : tr, sa = (c = (d = Z.tooltip) != null ? d : P.Tooltip) != null ? c : Af, la = (p = (f = Z.arrow) != null ? f : P.Arrow) != null ? p : Df, Ls = pn(aa, _({}, H, (w = J.popper) != null ? w : G.popper, {
    className: ve(_r.popper, H == null ? void 0 : H.className, (g = (v = J.popper) != null ? v : G.popper) == null ? void 0 : g.className)
  }), nn), Gs = pn(ia, _({}, Nt, (m = J.transition) != null ? m : G.transition), nn), Us = pn(sa, _({}, (h = J.tooltip) != null ? h : G.tooltip, {
    className: ve(_r.tooltip, (k = (T = J.tooltip) != null ? T : G.tooltip) == null ? void 0 : k.className)
  }), nn), Xs = pn(la, _({}, (C = J.arrow) != null ? C : G.arrow, {
    className: ve(_r.arrow, (E = (b = J.arrow) != null ? b : G.arrow) == null ? void 0 : E.className)
  }), nn);
  return /* @__PURE__ */ x(j.Fragment, {
    children: [/* @__PURE__ */ j.cloneElement(yt, jt), /* @__PURE__ */ s(aa, _({
      as: W ?? qo,
      placement: q,
      anchorEl: at ? {
=======
    return (tt = Y.popperOptions) != null && tt.modifiers && (Mt = Mt.concat(Y.popperOptions.modifiers)), _({}, Y.popperOptions, {
      modifiers: Mt
    });
  }, [Yt, Y]), ln = _({}, I, {
    isRtl: fe,
    arrow: B,
    disableInteractive: $e,
    placement: W,
    PopperComponentProp: q,
    touch: me.current
  }), jr = Sm(ln), ba = (r = (o = Z.popper) != null ? o : $.Popper) != null ? r : Tm, va = (a = (s = (l = Z.transition) != null ? l : $.Transition) != null ? s : M) != null ? a : hi, ya = (c = (d = Z.tooltip) != null ? d : $.Tooltip) != null ? c : Cm, xa = (p = (f = Z.arrow) != null ? f : $.Arrow) != null ? p : Rm, pl = hn(ba, _({}, Y, (w = J.popper) != null ? w : L.popper, {
    className: ke(jr.popper, Y == null ? void 0 : Y.className, (g = (y = J.popper) != null ? y : L.popper) == null ? void 0 : g.className)
  }), ln), ul = hn(va, _({}, Et, (m = J.transition) != null ? m : L.transition), ln), wl = hn(ya, _({}, (h = J.tooltip) != null ? h : L.tooltip, {
    className: ke(jr.tooltip, (k = (T = J.tooltip) != null ? T : L.tooltip) == null ? void 0 : k.className)
  }), ln), fl = hn(xa, _({}, (C = J.arrow) != null ? C : L.arrow, {
    className: ke(jr.arrow, (S = (v = J.arrow) != null ? v : L.arrow) == null ? void 0 : S.className)
  }), ln);
  return /* @__PURE__ */ b(D.Fragment, {
    children: [/* @__PURE__ */ D.cloneElement(Nt, Vt), /* @__PURE__ */ i(ba, _({
      as: q ?? Ks,
      placement: W,
      anchorEl: ot ? {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        getBoundingClientRect: () => ({
          top: ln.y,
          left: ln.x,
          right: ln.x,
          bottom: ln.y,
          width: 0,
          height: 0
        })
<<<<<<< HEAD
      } : St,
      popperRef: Or,
      open: St ? Jt : !1,
      id: Tr,
      transition: !0
    }, en, Ls, {
      popperOptions: Fs,
      children: ({
        TransitionProps: tt
      }) => /* @__PURE__ */ s(ia, _({
        timeout: Ut.transitions.duration.shorter
      }, tt, Gs, {
        children: /* @__PURE__ */ x(sa, _({}, Us, {
          children: [dt, V ? /* @__PURE__ */ s(la, _({}, Xs, {
            ref: Ce
=======
      } : Ct,
      popperRef: Ar,
      open: Ct ? ee : !1,
      id: Ir,
      transition: !0
    }, sn, pl, {
      popperOptions: dl,
      children: ({
        TransitionProps: tt
      }) => /* @__PURE__ */ i(va, _({
        timeout: Ht.transitions.duration.shorter
      }, tt, ul, {
        children: /* @__PURE__ */ b(ya, _({}, wl, {
          children: [dt, B ? /* @__PURE__ */ i(xa, _({}, fl, {
            ref: Pe
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          })) : null]
        }))
      }))
    }))]
  });
});
<<<<<<< HEAD
process.env.NODE_ENV !== "production" && (_s.propTypes = {
=======
process.env.NODE_ENV !== "production" && (Js.propTypes = {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  children: Po.isRequired,
=======
  children: hs.isRequired,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function ri(t, e, n) {
  return t ? /* @__PURE__ */ s(fi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ s("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function Ps(t) {
=======
const Om = Js;
function bi(t, e, n) {
  return t ? /* @__PURE__ */ i(Ri, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ i("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function Zs(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  } = t, k = /* @__PURE__ */ s(
    Rl,
=======
  } = t, k = /* @__PURE__ */ i(
    nc,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      children: n ? /* @__PURE__ */ x(ne, { children: [
        ri(a, n, !0),
        /* @__PURE__ */ s(_l, { primary: n, inset: !a && o }),
        f ? /* @__PURE__ */ s(fi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ s(hs, {}) }) : ri(i, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ s(_s, { title: r, placement: "right", children: /* @__PURE__ */ s("div", { children: k }) }) : k;
}
function $s(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function jf(t) {
  const [e, n] = ut(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, i = (d) => {
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
<<<<<<< HEAD
    let d = $s(a).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id)) throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ s(Is, { ...t, includedGroups: d });
  };
  return /* @__PURE__ */ x(ne, { children: [
    /* @__PURE__ */ s(Ps, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ s(
      Pl,
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const Bf = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function Is(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: i } = Ct(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      $s(e).filter((v) => !("menuItem" in v.group))
=======
const Pm = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function tl(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: s } = Ot(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Qs(e).filter((y) => !("menuItem" in y.group))
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    ), f = Object.values(p).sort(
      (v, m) => (v.group.order || 0) - (m.group.order || 0)
    ), w = [];
<<<<<<< HEAD
    f.forEach((v) => {
      Bf(v.id, e.items).forEach(
=======
    f.forEach((y) => {
      Pm(y.id, e.items).forEach(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      const v = w.group + f;
      return /* @__PURE__ */ s(
        Ps,
=======
      const y = w.group + f;
      return /* @__PURE__ */ i(
        Zs,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        {
          onClick: (m) => {
            n == null || n(m), r(w);
          },
          ...g
        },
        v
      );
    }
<<<<<<< HEAD
    return /* @__PURE__ */ s(
      jf,
=======
    return /* @__PURE__ */ i(
      _m,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
      {
        parentMenuItem: w,
        parentItemProps: g,
        ...t
      },
      d + w.id
    );
  }) }, d);
}
<<<<<<< HEAD
function Vf(t) {
=======
function $m(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
<<<<<<< HEAD
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ s(Is, { ...t, includedGroups: a });
}
function zf({
=======
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ i(tl, { ...t, includedGroups: a });
}
function Im({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
<<<<<<< HEAD
  return /* @__PURE__ */ x(
    mi,
=======
  return /* @__PURE__ */ b(
    Oi,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ s("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ s($l, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ s(
          Vf,
=======
        /* @__PURE__ */ i("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ i(ac, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ i(
          $m,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Ff({
=======
function Mm({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ s(
    mi,
=======
  return /* @__PURE__ */ i(
    Oi,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
<<<<<<< HEAD
      children: a.map((i, l) => /* @__PURE__ */ s(
        zf,
=======
      children: a.map((s, l) => /* @__PURE__ */ i(
        Im,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Lf(t) {
=======
function Am(t) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  return {
    preserveValue: !0,
    ...t
  };
}
<<<<<<< HEAD
const po = (t, e, n = {}) => {
  const r = be(e);
  r.current = e;
  const o = be(n);
  o.current = Lf(o.current);
  const [a, i] = ut(() => r.current), [l, c] = ut(!0);
  return se(() => {
=======
const bo = (t, e, n = {}) => {
  const r = Ne(e);
  r.current = e;
  const o = Ne(n);
  o.current = Am(o.current);
  const [a, s] = ut(() => r.current), [l, c] = ut(!0);
  return pe(() => {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
}, Gf = ms(/* @__PURE__ */ s("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Uf({
=======
}, Dm = $s(/* @__PURE__ */ i("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function jm({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  }, [c]), g = Et((E) => {
    E.stopPropagation(), d((b) => {
      const I = !b;
      return I && E.shiftKey ? f(!0) : I || f(!1), I;
    });
  }, []), v = Et(
    (E) => (w(), r(E)),
=======
  }, [c]), g = Tt((S) => {
    S.stopPropagation(), d((v) => {
      const I = !v;
      return I && S.shiftKey ? f(!0) : I || f(!1), I;
    });
  }, []), y = Tt(
    (S) => (w(), r(S)),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    [r, w]
  ), [m, h] = ut({ top: 1, left: 1 });
  se(() => {
    if (c) {
<<<<<<< HEAD
      const E = o == null ? void 0 : o.current;
      if (E) {
        const b = E.getBoundingClientRect(), I = window.scrollY, V = window.scrollX, R = b.top + I + E.clientHeight, P = b.left + V;
        h({ top: R, left: P });
      }
    }
  }, [c, o]);
  const [k] = po(
    Et(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [T] = po(
    Et(async () => (t == null ? void 0 : t(!0)) ?? n ?? k, [t, n, k, c]),
    n ?? k
  ), C = p && T ? T : k;
  return /* @__PURE__ */ x(ne, { children: [
    /* @__PURE__ */ s(
      hi,
=======
      const S = o == null ? void 0 : o.current;
      if (S) {
        const v = S.getBoundingClientRect(), I = window.scrollY, B = window.scrollX, O = v.top + I + S.clientHeight, $ = v.left + B;
        h({ top: O, left: $ });
      }
    }
  }, [c, o]);
  const [k] = bo(
    Tt(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [T] = bo(
    Tt(async () => (t == null ? void 0 : t(!0)) ?? n ?? k, [t, n, k, c]),
    n ?? k
  ), C = p && T ? T : k;
  return /* @__PURE__ */ b(te, { children: [
    /* @__PURE__ */ i(
      _i,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        children: l ?? /* @__PURE__ */ s(Gf, {})
      }
    ),
    /* @__PURE__ */ s(
      Il,
=======
        children: l ?? /* @__PURE__ */ i(Dm, {})
      }
    ),
    /* @__PURE__ */ i(
      ic,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        children: C ? /* @__PURE__ */ s(
          Ff,
=======
        children: C ? /* @__PURE__ */ i(
          Mm,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Wm({
=======
function Xh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ s(
    hi,
=======
  return /* @__PURE__ */ i(
    _i,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const $n = er(({ className: t, ...e }, n) => /* @__PURE__ */ s(ul, { size: 35, className: N("tw-animate-spin", t), ...e, ref: n }));
$n.displayName = "Spinner";
function Km({
=======
const zn = dr(({ className: t, ...e }, n) => /* @__PURE__ */ i(Dl, { size: 35, className: x("tw-animate-spin", t), ...e, ref: n }));
zn.displayName = "Spinner";
function Hh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Jm({
=======
const el = E.createContext(void 0);
function Fn() {
  const t = E.useContext(el);
  if (!t)
    throw new Error("useContext must be used within a MenubarProvider.");
  return t;
}
function sa(t) {
  return {
    "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground": t.variant === "muted"
  };
}
function Zn({ ...t }) {
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
const bn = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Fn();
  return /* @__PURE__ */ i(
    wt.Trigger,
    {
      ref: n,
      className: x(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "tw-text-foreground",
        // to match the default shadcn style
        sa(r),
        t
      ),
      ...e
    }
  );
});
bn.displayName = wt.Trigger.displayName;
const vo = E.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => {
  const a = Fn();
  return /* @__PURE__ */ b(
    wt.SubTrigger,
    {
      ref: o,
      className: x(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        // CUSTOM
        sa(a),
        t
      ),
      ...r,
      children: [
        n,
        /* @__PURE__ */ i(No, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
vo.displayName = wt.SubTrigger.displayName;
const yo = E.forwardRef(({ className: t, ...e }, n) => {
  const r = Fn();
  return /* @__PURE__ */ i(
    wt.SubContent,
    {
      ref: n,
      className: x(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM
        {
          "tw-bg-primary-foreground": r.variant === "muted"
        },
        t
      ),
      ...e
    }
  );
});
yo.displayName = wt.SubContent.displayName;
const vn = E.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: r = 8, ...o }, a) => {
  const s = Fn();
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
          "tw-bg-primary-foreground": s.variant === "muted"
        },
        t
      ),
      ...o
    }
  ) });
});
vn.displayName = wt.Content.displayName;
const gt = E.forwardRef(({ className: t, inset: e, ...n }, r) => {
  const o = Fn();
  return /* @__PURE__ */ i(
    wt.Item,
    {
      ref: r,
      className: x(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        // CUSTOM
        sa(o),
        t
      ),
      ...n
    }
  );
});
gt.displayName = wt.Item.displayName;
const xo = E.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ b(
  wt.CheckboxItem,
  {
    ref: o,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(wt.ItemIndicator, { children: /* @__PURE__ */ i(Ze, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
xo.displayName = wt.CheckboxItem.displayName;
const rr = E.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ b(
  wt.RadioItem,
  {
    ref: r,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(wt.ItemIndicator, { children: /* @__PURE__ */ i(ko, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
rr.displayName = wt.RadioItem.displayName;
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
    /* @__PURE__ */ b(Zn, { children: [
      /* @__PURE__ */ i(bn, { children: "File" }),
      /* @__PURE__ */ b(vn, { children: [
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
          /* @__PURE__ */ i(vo, { children: "Share" }),
          /* @__PURE__ */ b(yo, { children: [
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
    /* @__PURE__ */ b(Zn, { children: [
      /* @__PURE__ */ i(bn, { children: "Edit" }),
      /* @__PURE__ */ b(vn, { children: [
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
          /* @__PURE__ */ i(vo, { children: "Find" }),
          /* @__PURE__ */ b(yo, { children: [
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
    /* @__PURE__ */ b(Zn, { children: [
      /* @__PURE__ */ i(bn, { children: "View" }),
      /* @__PURE__ */ b(vn, { children: [
        /* @__PURE__ */ i(xo, { children: "Always Show Bookmarks Bar" }),
        /* @__PURE__ */ i(xo, { checked: !0, children: "Always Show Full URLs" }),
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
    /* @__PURE__ */ b(Zn, { children: [
      /* @__PURE__ */ i(bn, { children: "Profiles" }),
      /* @__PURE__ */ b(vn, { children: [
        /* @__PURE__ */ b(Bm, { value: "benoit", children: [
          /* @__PURE__ */ i(rr, { value: "andy", children: "Andy" }),
          /* @__PURE__ */ i(rr, { value: "benoit", children: "Benoit" }),
          /* @__PURE__ */ i(rr, { value: "Luis", children: "Luis" })
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  menuProvider: t,
  commandHandler: e,
  className: n,
  id: r,
<<<<<<< HEAD
  children: o
}) {
  const a = be(void 0);
  return /* @__PURE__ */ s("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ s(Ml, { position: "static", id: r, children: /* @__PURE__ */ x(
    Al,
    {
      className: N("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        t ? /* @__PURE__ */ s(
          Uf,
          {
            commandHandler: e,
            containerRef: a,
            menuProvider: t
          }
        ) : void 0,
        o ? /* @__PURE__ */ s("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    }
  ) }) });
}
<<<<<<< HEAD
const Xf = We(
=======
const Fm = tn(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
), Yf = S.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ s("div", { ref: r, role: "alert", className: N(Xf({ variant: e }), t), ...n }));
Yf.displayName = "Alert";
const Hf = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ x(
=======
), Lm = E.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ i("div", { ref: r, role: "alert", className: x(Fm({ variant: e }), t), ...n }));
Lm.displayName = "Alert";
const Gm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ b(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Hf.displayName = "AlertTitle";
const qf = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("div", { ref: n, className: N("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
qf.displayName = "AlertDescription";
const Wf = We(
=======
Gm.displayName = "AlertTitle";
const Um = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: x("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Um.displayName = "AlertDescription";
const Xm = tn(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function Kf({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ s("div", { className: N("pr-twp", Wf({ variant: e }), t), ...n });
}
const Jf = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
function Hm({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: x("pr-twp", Xm({ variant: e }), t), ...n });
}
const Ym = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Jf.displayName = "Card";
const Zf = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
Ym.displayName = "Card";
const Wm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Zf.displayName = "CardHeader";
const Qf = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
Wm.displayName = "CardHeader";
const qm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
Qf.displayName = "CardTitle";
const tm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("p", { ref: n, className: N("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
tm.displayName = "CardDescription";
const em = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s("div", { ref: n, className: N("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
em.displayName = "CardContent";
const nm = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
=======
qm.displayName = "CardTitle";
const Km = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("p", { ref: n, className: x("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Km.displayName = "CardDescription";
const Jm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: x("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Jm.displayName = "CardContent";
const Zm = E.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
<<<<<<< HEAD
nm.displayName = "CardFooter";
function Zm({ ...t }) {
  return /* @__PURE__ */ s(
    jl,
=======
Zm.displayName = "CardFooter";
function Wh({ ...t }) {
  return /* @__PURE__ */ i(
    lc,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const rm = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ x(
    cn.Root,
=======
const Qm = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ b(
    fn.Root,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
rm.displayName = cn.Root.displayName;
const om = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    Wr.Root,
=======
Qm.displayName = fn.Root.displayName;
const th = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    no.Root,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    {
      className: N(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
<<<<<<< HEAD
      children: /* @__PURE__ */ s(
        Wr.Thumb,
=======
      children: /* @__PURE__ */ i(
        no.Thumb,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
om.displayName = Wr.Root.displayName;
const Qm = Pt.Root, am = S.forwardRef(({ className: t, ...e }, n) => {
  const r = xt();
  return /* @__PURE__ */ s(
    Pt.List,
=======
th.displayName = no.Root.displayName;
const qh = It.Root, eh = E.forwardRef(({ className: t, ...e }, n) => {
  const r = kt();
  return /* @__PURE__ */ i(
    It.List,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
am.displayName = Pt.List.displayName;
const im = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Trigger,
=======
eh.displayName = It.List.displayName;
const nh = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Trigger,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
im.displayName = Pt.Trigger.displayName;
const sm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Pt.Content,
=======
nh.displayName = It.Trigger.displayName;
const rh = E.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  It.Content,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: n,
    className: N(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
sm.displayName = Pt.Content.displayName;
function th({
=======
rh.displayName = It.Content.displayName;
function Kh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ s($n, { size: 15 }) : /* @__PURE__ */ x(ne, { children: [
        /* @__PURE__ */ s(wl, { size: 25, className: N("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
=======
      children: t ? /* @__PURE__ */ i(zn, { size: 15 }) : /* @__PURE__ */ b(te, { children: [
        /* @__PURE__ */ i(jl, { size: 25, className: x("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        n
      ] })
    }
  );
}
<<<<<<< HEAD
function eh({
=======
function Jh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
        /* @__PURE__ */ s($n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
<<<<<<< HEAD
function nh({
=======
function Zh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
        /* @__PURE__ */ s($n, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
<<<<<<< HEAD
function rh({
=======
function Qh({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
        /* @__PURE__ */ s($n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
<<<<<<< HEAD
function oh({
=======
function tg({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ s("div", { id: t, className: N("pr-twp tw-prose", n), children: /* @__PURE__ */ s(Bl, { options: o, children: e }) });
}
const lm = er((t, e) => /* @__PURE__ */ x(
  wt,
=======
  return /* @__PURE__ */ i("div", { id: t, className: x("pr-twp tw-prose", n), children: /* @__PURE__ */ i(cc, { options: o, children: e }) });
}
const oh = dr((t, e) => /* @__PURE__ */ b(
  ft,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
<<<<<<< HEAD
      /* @__PURE__ */ s(fl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ s(
        nr,
=======
      /* @__PURE__ */ i(Bl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ i(
        pr,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
<<<<<<< HEAD
var cm = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(cm || {});
function ah({ id: t, groups: e }) {
  return /* @__PURE__ */ s("div", { id: t, children: /* @__PURE__ */ x(fo, { children: [
    /* @__PURE__ */ s(gi, { asChild: !0, children: /* @__PURE__ */ s(lm, {}) }),
    /* @__PURE__ */ s(or, { children: e.map((n) => /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s(ar, { children: n.label }),
      /* @__PURE__ */ s(Ll, { children: n.items.map((r) => /* @__PURE__ */ s("div", { children: r.itemType === 0 ? /* @__PURE__ */ s(mo, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ s(vi, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ s(ir, {})
    ] }, n.label)) })
  ] }) });
}
function ih({ id: t, message: e }) {
  return /* @__PURE__ */ s("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ s("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function sh({
=======
var ah = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(ah || {});
function eg({ id: t, groups: e }) {
  return /* @__PURE__ */ i("div", { id: t, children: /* @__PURE__ */ b(To, { children: [
    /* @__PURE__ */ i(Pi, { asChild: !0, children: /* @__PURE__ */ i(oh, {}) }),
    /* @__PURE__ */ i(wr, { children: e.map((n) => /* @__PURE__ */ b("div", { children: [
      /* @__PURE__ */ i(In, { children: n.label }),
      /* @__PURE__ */ i(wc, { children: n.items.map((r) => /* @__PURE__ */ i("div", { children: r.itemType === 0 ? /* @__PURE__ */ i(Co, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ i(Ii, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ i(fr, {})
    ] }, n.label)) })
  ] }) });
}
function ng({ id: t, message: e }) {
  return /* @__PURE__ */ i("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ i("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function rg({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
<<<<<<< HEAD
  const a = new yl("en", {
=======
  const a = new Yl("en", {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ s(ml, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ s("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
=======
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ b("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ i(Vl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
                /* @__PURE__ */ s(hl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
=======
                /* @__PURE__ */ i(zl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
                /* @__PURE__ */ s(gl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
=======
                /* @__PURE__ */ i(Fl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
              ]
            }
          )
        ] })
      ]
    }
  );
}
<<<<<<< HEAD
function dm({ id: t, versionHistory: e }) {
=======
function ih({ id: t, versionHistory: e }) {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
function lh({
=======
function og({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
<<<<<<< HEAD
  const a = Ct(() => xl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((p) => d.of(p));
  })(r);
  return /* @__PURE__ */ s("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ x("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ s(dm, { versionHistory: o }),
    /* @__PURE__ */ s("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ x("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ s("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ x("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ s("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: a })
=======
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
>>>>>>> 94f7504ec2 (add a muted menubar variant)
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
<<<<<<< HEAD
function ch({
=======
function ag({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  return /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ s(
      Bc,
=======
  return /* @__PURE__ */ b("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ i(
      pd,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
      return /* @__PURE__ */ x(Kf, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ s(
          wt,
=======
      return /* @__PURE__ */ b(Hm, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ i(
          ft,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => r(n.filter((g) => g !== f)),
<<<<<<< HEAD
            children: /* @__PURE__ */ s(uo, { className: "tw-h-3 tw-w-3" })
=======
            children: /* @__PURE__ */ i(Eo, { className: "tw-h-3 tw-w-3" })
>>>>>>> 94f7504ec2 (add a muted menubar variant)
          }
        ),
        (w = t.find((g) => g.value === f)) == null ? void 0 : w.label
      ] }, f);
    }) }) : /* @__PURE__ */ s(At, { children: p })
  ] });
}
<<<<<<< HEAD
const pm = (t, e) => t[e] ?? e;
function dh({
=======
const sh = (t, e) => t[e] ?? e;
function ig({
>>>>>>> 94f7504ec2 (add a muted menubar variant)
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: a,
  localizedStrings: i,
  className: l
}) {
<<<<<<< HEAD
  const c = pm(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [d, p] = ut(!1), f = (g) => {
    o && o(g), r && r([g, ...n.filter((v) => v !== g)]), a && n.find((v) => v === g) && a([...n.filter((v) => v !== g)]), p(!1);
  }, w = (g, v) => {
    var h, k, T, C, E, b;
    const m = v !== g ? ((k = (h = t[g]) == null ? void 0 : h.uiNames) == null ? void 0 : k[v]) ?? ((C = (T = t[g]) == null ? void 0 : T.uiNames) == null ? void 0 : C.en) : void 0;
    return m ? `${(E = t[g]) == null ? void 0 : E.autonym} (${m})` : (b = t[g]) == null ? void 0 : b.autonym;
=======
  const c = sh(
    s,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [d, p] = ut(!1), f = (g) => {
    o && o(g), r && r([g, ...n.filter((y) => y !== g)]), a && n.find((y) => y === g) && a([...n.filter((y) => y !== g)]), p(!1);
  }, w = (g, y) => {
    var h, k, T, C, S, v;
    const m = y !== g ? ((k = (h = t[g]) == null ? void 0 : h.uiNames) == null ? void 0 : k[y]) ?? ((C = (T = t[g]) == null ? void 0 : T.uiNames) == null ? void 0 : C.en) : void 0;
    return m ? `${(S = t[g]) == null ? void 0 : S.autonym} (${m})` : (v = t[g]) == null ? void 0 : v.autonym;
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
const ph = (t, e) => {
  se(() => {
    if (!t) return () => {
    };
=======
const sg = (t, e) => {
  pe(() => {
    if (!t)
      return () => {
      };
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
<<<<<<< HEAD
}, Yr = () => !1, uh = (t, e) => {
  const [n] = po(
    Et(async () => {
      if (!t) return Yr;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    Yr,
=======
}, Qr = () => !1, lg = (t, e) => {
  const [n] = bo(
    Tt(async () => {
      if (!t)
        return Qr;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    Qr,
>>>>>>> 94f7504ec2 (add a muted menubar variant)
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
<<<<<<< HEAD
  se(() => () => {
    n !== Yr && n();
  }, [n]);
};
function um(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
um(`.papi-icon-button {
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
*, ::before, ::after {
=======
  pe(() => () => {
    n !== Qr && n();
  }, [n]);
};
function lh(t, e = "top") {
  if (!t || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
lh(`*, ::before, ::after {
>>>>>>> 94f7504ec2 (add a muted menubar variant)
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
<<<<<<< HEAD
  Yf as Alert,
  qf as AlertDescription,
  Hf as AlertTitle,
  Mm as BOOK_SELECTOR_STRING_KEYS,
  Kf as Badge,
  Im as BookChapterControl,
  xc as BookSelectionMode,
  Am as BookSelector,
  wt as Button,
  Jf as Card,
  em as CardContent,
  tm as CardDescription,
  nm as CardFooter,
  Zf as CardHeader,
  Qf as CardTitle,
  yc as ChapterRangeSelector,
  To as Checkbox,
  qm as Checklist,
  Jr as ComboBox,
  Rc as DataTable,
  nh as DisableButton,
  fo as DropdownMenu,
  mo as DropdownMenuCheckboxItem,
  or as DropdownMenuContent,
  Ll as DropdownMenuGroup,
  bi as DropdownMenuItem,
  cm as DropdownMenuItemType,
  ar as DropdownMenuLabel,
  Rm as DropdownMenuPortal,
  Pm as DropdownMenuRadioGroup,
  vi as DropdownMenuRadioItem,
  ir as DropdownMenuSeparator,
  Xl as DropdownMenuShortcut,
  _m as DropdownMenuSub,
  Ul as DropdownMenuSubContent,
  Gl as DropdownMenuSubTrigger,
  gi as DropdownMenuTrigger,
  eh as EnableButton,
  ch as Filter,
  lm as FilterButton,
  ah as FilterDropdown,
  lh as Footer,
  Ff as GridMenu,
  Uf as HamburgerMenuButton,
  Vm as INVENTORY_STRING_KEYS,
  Wm as IconButton,
  Ke as Input,
  th as InstallButton,
  zm as Inventory,
  At as Label,
  oh as MarkdownRenderer,
  Ps as MenuItem,
  sh as MoreInfo,
  Bc as MultiSelectComboBox,
  Fm as NavigationContentSearch,
  ih as NoExtensionsFound,
  Ci as Popover,
  yo as PopoverContent,
  Oi as PopoverTrigger,
  Ti as RadioGroup,
  Kr as RadioGroupItem,
  Gm as ScriptureResultsViewer,
  Um as ScrollGroupSelector,
  Di as SearchBar,
  Ve as Select,
  ke as SelectContent,
  kc as SelectGroup,
  Bt as SelectItem,
  Ec as SelectLabel,
  $i as SelectScrollDownButton,
  Pi as SelectScrollUpButton,
  Sc as SelectSeparator,
  Ne as SelectTrigger,
  ze as SelectValue,
  Co as Separator,
  Xm as SettingsList,
  Hm as SettingsListHeader,
  Ym as SettingsListItem,
  ad as SettingsSidebar,
  Lm as SettingsSidebarContentSearch,
  rm as Slider,
  Zm as Sonner,
  $n as Spinner,
  om as Switch,
  sr as Table,
  cr as TableBody,
  Oc as TableCaption,
  Fe as TableCell,
  Cc as TableFooter,
  vn as TableHead,
  lr as TableHeader,
  ie as TableRow,
  Qm as Tabs,
  sm as TabsContent,
  am as TabsList,
  im as TabsTrigger,
  Km as TextField,
  Ai as ToggleGroup,
  Gn as ToggleGroupItem,
  Jm as Toolbar,
  dh as UiLanguageSelector,
  rh as UpdateButton,
  dm as VersionHistory,
  ji as VerticalTabs,
  Vi as VerticalTabsContent,
  Bi as VerticalTabsList,
  Vc as VerticalTabsTrigger,
  Wf as badgeVariants,
  uc as buttonVariants,
  N as cn,
  $c as getBookNumFromId,
  Pc as getLinesFromUSFM,
  wa as getNumberFromUSFM,
  Ic as getStatusForItem,
  jm as inventoryCountColumn,
  Dm as inventoryItemColumn,
  Bm as inventoryStatusColumn,
  mh as sonner,
  ph as useEvent,
  uh as useEventAsync,
  po as usePromise
=======
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
  jo as Checkbox,
  Uh as Checklist,
  oo as ComboBox,
  nd as DataTable,
  Zh as DisableButton,
  To as DropdownMenu,
  Co as DropdownMenuCheckboxItem,
  wr as DropdownMenuContent,
  wc as DropdownMenuGroup,
  $i as DropdownMenuItem,
  ah as DropdownMenuItemType,
  In as DropdownMenuLabel,
  Sh as DropdownMenuPortal,
  Ch as DropdownMenuRadioGroup,
  Ii as DropdownMenuRadioItem,
  fr as DropdownMenuSeparator,
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
  en as Input,
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
  Po as PopoverContent,
  Li as PopoverTrigger,
  zi as RadioGroup,
  ro as RadioGroupItem,
  Vh as ScriptureResultsViewer,
  zh as ScrollGroupSelector,
  Ki as SearchBar,
  Ge as Select,
  Ce as SelectContent,
  Kc as SelectGroup,
  zt as SelectItem,
  Jc as SelectLabel,
  Hi as SelectScrollDownButton,
  Xi as SelectScrollUpButton,
  Zc as SelectSeparator,
  Te as SelectTrigger,
  Ue as SelectValue,
  Bo as Separator,
  Fh as SettingsList,
  Gh as SettingsListHeader,
  Lh as SettingsListItem,
  $d as SettingsSidebar,
  Bh as SettingsSidebarContentSearch,
  Qm as Slider,
  Wh as Sonner,
  zn as Spinner,
  th as Switch,
  mr as Table,
  gr as TableBody,
  ed as TableCaption,
  Xe as TableCell,
  td as TableFooter,
  Cn as TableHead,
  hr as TableHeader,
  de as TableRow,
  qh as Tabs,
  rh as TabsContent,
  eh as TabsList,
  nh as TabsTrigger,
  Hh as TextField,
  qi as ToggleGroup,
  Qn as ToggleGroupItem,
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
  bo as usePromise
>>>>>>> 94f7504ec2 (add a muted menubar variant)
};
//# sourceMappingURL=index.js.map
