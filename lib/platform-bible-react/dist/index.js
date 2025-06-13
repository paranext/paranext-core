<<<<<<< HEAD
import { jsx as r, jsxs as d, Fragment as Vt } from "react/jsx-runtime";
import p, { forwardRef as te, createContext as ir, useContext as wr, useCallback as U, useState as P, useRef as q, useEffect as it, useLayoutEffect as tn, useMemo as et, Fragment as dn } from "react";
import { clsx as lr } from "clsx";
import { extendTailwindMerge as dr } from "tailwind-merge";
import { cva as gt } from "class-variance-authority";
import * as j from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as cr } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Ve, Check as _t, Circle as Me, X as ze, Search as cn, ChevronsUpDown as Oe, FilterIcon as pr, ChevronDown as ee, ChevronUp as ur, ArrowLeftIcon as mr, ChevronLeftIcon as hr, ChevronRightIcon as gr, ArrowRightIcon as fr, LoaderCircle as br, Download as vr, Filter as xr, User as yr, Link as Nr, CircleHelp as kr, Star as Cr, CircleCheckIcon as _r, CircleXIcon as Sr, CircleHelpIcon as Tr, ArrowUpIcon as Rr, ArrowDownIcon as Er, ArrowUpDownIcon as Dr, PanelLeft as Vr, PanelRight as Mr, ScrollText as zr, ChevronLeft as Or, MenuIcon as Br, Menu as Ir, EllipsisVertical as Ar } from "lucide-react";
import { formatScrRef as Tt, MODIFIER_KEYS as Pr, getChaptersForBook as jr, NumberFormat as Xr, formatBytes as Fr, deepEqual as Be, isString as fe, compareScrRefs as Ce, scrRefToBBBCCCVVV as be, getLocalizeKeyForScrollGroupId as A } from "platform-bible-utils";
import { Slot as Mt } from "@radix-ui/react-slot";
import * as pn from "@radix-ui/react-label";
import * as $t from "@radix-ui/react-radio-group";
import * as Lt from "@radix-ui/react-popover";
import { Command as Z } from "cmdk";
import * as wt from "@radix-ui/react-dialog";
import { useReactTable as un, getFilteredRowModel as Gr, getSortedRowModel as mn, getPaginationRowModel as $r, getCoreRowModel as hn, flexRender as Gt, getGroupedRowModel as Lr, getExpandedRowModel as Yr } from "@tanstack/react-table";
import * as G from "@radix-ui/react-select";
import Hr from "markdown-to-jsx";
import * as _e from "@radix-ui/react-checkbox";
import * as ne from "@radix-ui/react-toggle-group";
import * as gn from "@radix-ui/react-toggle";
import * as fn from "@radix-ui/react-separator";
import * as Ht from "@radix-ui/react-tooltip";
import * as Q from "@radix-ui/react-tabs";
import * as X from "@radix-ui/react-menubar";
import { useHotkeys as Ur } from "react-hotkeys-hook";
import * as zt from "@radix-ui/react-avatar";
import { Drawer as at } from "vaul";
import * as yt from "@radix-ui/react-scroll-area";
import { Toaster as qr } from "sonner";
import { toast as yi } from "sonner";
import * as Ft from "@radix-ui/react-slider";
import * as Se from "@radix-ui/react-switch";
import * as Jr from "@radix-ui/react-visually-hidden";
const Kr = dr({ prefix: "tw-" });
function l(...t) {
  return Kr(lr(t));
}
const Ot = p.forwardRef(
=======
import { jsx as r, jsxs as l, Fragment as Et } from "react/jsx-runtime";
import u, { forwardRef as Zt, createContext as rr, useContext as ar, useCallback as U, useState as A, useRef as q, useEffect as st, useLayoutEffect as Ze, useMemo as et, Fragment as wn } from "react";
import { clsx as or } from "clsx";
import { extendTailwindMerge as sr } from "tailwind-merge";
import { cva as ht } from "class-variance-authority";
import * as j from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ir } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Ee, Check as kt, Circle as Ve, X as De, Search as ln, ChevronsUpDown as Me, FilterIcon as wr, ChevronDown as Qt, ChevronUp as lr, ArrowLeftIcon as dr, ChevronLeftIcon as cr, ChevronRightIcon as pr, ArrowRightIcon as ur, LoaderCircle as mr, Download as hr, Filter as gr, User as fr, Link as br, CircleHelp as vr, Star as xr, CircleCheckIcon as yr, CircleXIcon as Nr, CircleHelpIcon as kr, ArrowUpIcon as Cr, ArrowDownIcon as _r, ArrowUpDownIcon as Sr, PanelLeft as Tr, PanelRight as Rr, ScrollText as Er, ChevronLeft as Vr, MenuIcon as Dr, Menu as Mr, EllipsisVertical as zr } from "lucide-react";
import { formatScrRef as _t, MODIFIER_KEYS as Or, getChaptersForBook as Br, NumberFormat as Ir, formatBytes as Pr, deepEqual as ze, isString as he, compareScrRefs as Ne, scrRefToBBBCCCVVV as ge, getLocalizeKeyForScrollGroupId as P } from "platform-bible-utils";
import { Slot as Vt } from "@radix-ui/react-slot";
import * as dn from "@radix-ui/react-label";
import * as Ft from "@radix-ui/react-radio-group";
import * as Gt from "@radix-ui/react-popover";
import { Command as Z } from "cmdk";
import * as it from "@radix-ui/react-dialog";
import { useReactTable as cn, getFilteredRowModel as Ar, getSortedRowModel as pn, getPaginationRowModel as jr, getCoreRowModel as un, flexRender as Xt, getGroupedRowModel as Xr, getExpandedRowModel as Fr } from "@tanstack/react-table";
import * as G from "@radix-ui/react-select";
import Gr from "markdown-to-jsx";
import * as ke from "@radix-ui/react-checkbox";
import * as te from "@radix-ui/react-toggle-group";
import * as mn from "@radix-ui/react-toggle";
import * as hn from "@radix-ui/react-separator";
import * as Lt from "@radix-ui/react-tooltip";
import * as Q from "@radix-ui/react-tabs";
import * as X from "@radix-ui/react-menubar";
import { useHotkeys as $r } from "react-hotkeys-hook";
import * as Dt from "@radix-ui/react-avatar";
import { Toaster as Lr } from "sonner";
import { toast as ai } from "sonner";
import * as jt from "@radix-ui/react-slider";
import * as Ce from "@radix-ui/react-switch";
const Yr = sr({ prefix: "tw-" });
function d(...t) {
  return Yr(or(t));
}
const Mt = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Ot.displayName = "Input";
const Wr = te(
=======
Mt.displayName = "Input";
const Hr = Zt(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: n,
    handleSubmit: a,
    className: o,
    ...s
  }, i) => /* @__PURE__ */ r(
<<<<<<< HEAD
    Ot,
=======
    Mt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      ...s,
      type: "text",
      className: l(
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
<<<<<<< HEAD
), Ie = ir(void 0);
function ot() {
  const t = wr(Ie);
=======
), Oe = rr(void 0);
function at() {
  const t = ar(Oe);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
<<<<<<< HEAD
const ct = gt("", {
=======
const dt = ht("", {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
<<<<<<< HEAD
}), Zr = "layoutDirection";
function H() {
  const t = localStorage.getItem(Zr);
  return t === "rtl" ? t : "ltr";
}
const Ae = j.Trigger, bn = j.Group, Qr = j.Portal, ta = j.Sub, Rs = j.RadioGroup;
function re({ variant: t = "default", ...e }) {
  const n = p.useMemo(
=======
}), Ur = "layoutDirection";
function H() {
  const t = localStorage.getItem(Ur);
  return t === "rtl" ? t : "ltr";
}
const Be = j.Trigger, gn = j.Group, qr = j.Portal, Jr = j.Sub, ms = j.RadioGroup;
function ee({ variant: t = "default", ...e }) {
  const n = u.useMemo(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    () => ({
      variant: t
    }),
    [t]
  );
<<<<<<< HEAD
  return /* @__PURE__ */ r(Ie.Provider, { value: n, children: /* @__PURE__ */ r(j.Root, { ...e }) });
}
const vn = p.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = ot();
  return /* @__PURE__ */ d(
=======
  return /* @__PURE__ */ r(Oe.Provider, { value: n, children: /* @__PURE__ */ r(j.Root, { ...e }) });
}
const fn = u.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = at();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    j.SubTrigger,
    {
      ref: o,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
<<<<<<< HEAD
        ct({ variant: s.variant })
=======
        dt({ variant: s.variant })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
vn.displayName = j.SubTrigger.displayName;
const xn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
fn.displayName = j.SubTrigger.displayName;
const bn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  j.SubContent,
  {
    ref: n,
    className: l(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
xn.displayName = j.SubContent.displayName;
const Ut = p.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
=======
bn.displayName = j.SubContent.displayName;
const Yt = u.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  const s = H();
  return /* @__PURE__ */ r(j.Portal, { children: /* @__PURE__ */ r(
    j.Content,
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
<<<<<<< HEAD
Ut.displayName = j.Content.displayName;
const Pe = p.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = H(), s = ot();
=======
Yt.displayName = j.Content.displayName;
const Ie = u.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = H(), s = at();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    j.Item,
    {
      ref: a,
      className: l(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
<<<<<<< HEAD
        ct({ variant: s.variant })
=======
        dt({ variant: s.variant })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: o
    }
  );
});
<<<<<<< HEAD
Pe.displayName = j.Item.displayName;
const je = p.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = ot();
  return /* @__PURE__ */ d(
=======
Ie.displayName = j.Item.displayName;
const Pe = u.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = at();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    j.CheckboxItem,
    {
      ref: o,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
<<<<<<< HEAD
        ct({ variant: s.variant })
=======
        dt({ variant: s.variant })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...a,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(kt, { className: "tw-h-4 tw-w-4" }) }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        e
      ]
    }
  );
});
<<<<<<< HEAD
je.displayName = j.CheckboxItem.displayName;
const yn = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = ot();
  return /* @__PURE__ */ d(
=======
Pe.displayName = j.CheckboxItem.displayName;
const vn = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = at();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    j.RadioItem,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
<<<<<<< HEAD
        ct({ variant: o.variant })
=======
        dt({ variant: o.variant })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(Me, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(Ve, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        e
      ]
    }
  );
});
<<<<<<< HEAD
yn.displayName = j.RadioItem.displayName;
const ae = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
=======
vn.displayName = j.RadioItem.displayName;
const ne = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  j.Label,
  {
    ref: a,
    className: l("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
<<<<<<< HEAD
ae.displayName = j.Label.displayName;
const qt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
ne.displayName = j.Label.displayName;
const Ht = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  j.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
qt.displayName = j.Separator.displayName;
function ea({ className: t, ...e }) {
=======
Ht.displayName = j.Separator.displayName;
function Kr({ className: t, ...e }) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    "span",
    {
      className: l("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
<<<<<<< HEAD
ea.displayName = "DropdownMenuShortcut";
var na = Object.defineProperty, ra = (t, e, n) => e in t ? na(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, E = (t, e, n) => ra(t, typeof e != "symbol" ? e + "" : e, n);
const Nt = [
=======
Kr.displayName = "DropdownMenuShortcut";
var Wr = Object.defineProperty, Zr = (t, e, n) => e in t ? Wr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, E = (t, e, n) => Zr(t, typeof e != "symbol" ? e + "" : e, n);
const xt = [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
], Xe = [
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
], Nn = [
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
], en = ua();
function Bt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in en ? en[t] : 0;
}
function Fe(t) {
  return Bt(t) > 0;
}
function aa(t) {
  const e = typeof t == "string" ? Bt(t) : t;
  return e >= 40 && e <= 66;
}
<<<<<<< HEAD
function oa(t) {
  return (typeof t == "string" ? Bt(t) : t) <= 39;
=======
function ta(t) {
  return (typeof t == "string" ? zt(t) : t) <= 39;
}
function yn(t) {
  return t <= 66;
}
function ea(t) {
  const e = typeof t == "string" ? zt(t) : t;
  return Cn(e) && !yn(e);
}
function* na() {
  for (let t = 1; t <= xt.length; t++) yield t;
}
const ra = 1, Nn = xt.length;
function aa() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Xe(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= xt.length ? e : xt[n];
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
}
function kn(t) {
  return t <= 66;
}
function sa(t) {
  const e = typeof t == "string" ? Bt(t) : t;
  return Sn(e) && !kn(e);
}
function* ia() {
  for (let t = 1; t <= Nt.length; t++) yield t;
}
const wa = 1, Cn = Nt.length;
function la() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ge(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Nt.length ? e : Nt[n];
}
function _n(t) {
  return t <= 0 || t > Cn ? "******" : Nn[t - 1];
}
function da(t) {
  return _n(Bt(t));
}
function Sn(t) {
  const e = typeof t == "number" ? Ge(t) : t;
  return Fe(e) && !Xe.includes(e);
}
function ca(t) {
  const e = typeof t == "number" ? Ge(t) : t;
  return Fe(e) && Xe.includes(e);
}
function pa(t) {
  return Nn[t - 1].includes("*obsolete*");
}
function ua() {
  const t = {};
<<<<<<< HEAD
  for (let e = 0; e < Nt.length; e++)
    t[Nt[e]] = e + 1;
  return t;
}
const M = {
  allBookIds: Nt,
  nonCanonicalIds: Xe,
  bookIdToNumber: Bt,
  isBookIdValid: Fe,
  isBookNT: aa,
  isBookOT: oa,
  isBookOTNT: kn,
  isBookDC: sa,
  allBookNumbers: ia,
  firstBook: wa,
  lastBook: Cn,
  extraBooks: la,
  bookNumberToId: Ge,
  bookNumberToEnglishName: _n,
  bookIdToEnglishName: da,
  isCanonical: Sn,
  isExtraMaterial: ca,
  isObsolete: pa
};
var st = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(st || {});
=======
  for (let e = 0; e < xt.length; e++)
    t[xt[e]] = e + 1;
  return t;
}
const M = {
  allBookIds: xt,
  nonCanonicalIds: Ae,
  bookIdToNumber: zt,
  isBookIdValid: je,
  isBookNT: Qr,
  isBookOT: ta,
  isBookOTNT: yn,
  isBookDC: ea,
  allBookNumbers: na,
  firstBook: ra,
  lastBook: Nn,
  extraBooks: aa,
  bookNumberToId: Xe,
  bookNumberToEnglishName: kn,
  bookIdToEnglishName: oa,
  isCanonical: Cn,
  isExtraMaterial: sa,
  isObsolete: ia
};
var ot = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(ot || {});
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
const tt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (E(this, "name"), E(this, "fullPath"), E(this, "isPresent"), E(this, "hasVerseSegments"), E(this, "isCustomized"), E(this, "baseVersification"), E(this, "scriptureBooks"), E(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = st[e]) : (this._type = e, this.name = st[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
<<<<<<< HEAD
E(tt, "Original", new tt(st.Original)), E(tt, "Septuagint", new tt(st.Septuagint)), E(tt, "Vulgate", new tt(st.Vulgate)), E(tt, "English", new tt(st.English)), E(tt, "RussianProtestant", new tt(st.RussianProtestant)), E(tt, "RussianOrthodox", new tt(st.RussianOrthodox));
let vt = tt;
function nn(t, e) {
=======
E(tt, "Original", new tt(ot.Original)), E(tt, "Septuagint", new tt(ot.Septuagint)), E(tt, "Vulgate", new tt(ot.Vulgate)), E(tt, "English", new tt(ot.English)), E(tt, "RussianProtestant", new tt(ot.RussianProtestant)), E(tt, "RussianOrthodox", new tt(ot.RussianOrthodox));
let bt = tt;
function tn(t, e) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  const n = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(n);
  return t.split(n);
}
<<<<<<< HEAD
var Tn = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Tn || {});
=======
var _n = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(_n || {});
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
const W = class B {
  constructor(e, n, a, o) {
    if (E(this, "firstChapter"), E(this, "lastChapter"), E(this, "lastVerse"), E(this, "hasSegmentsDefined"), E(this, "text"), E(this, "BBBCCCVVVS"), E(this, "longHashCode"), E(this, "versification"), E(this, "rtlMark", "‏"), E(this, "_bookNum", 0), E(this, "_chapterNum", 0), E(this, "_verseNum", 0), E(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
<<<<<<< HEAD
        const s = e, i = n != null && n instanceof vt ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof vt ? n : void 0;
=======
        const s = e, i = n != null && n instanceof bt ? n : void 0;
        this.setEmpty(i), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof bt ? n : void 0;
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        this.setEmpty(s), this._verseNum = e % B.chapterDigitShifter, this._chapterNum = Math.floor(
          e % B.bookDigitShifter / B.chapterDigitShifter
        ), this._bookNum = Math.floor(e / B.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof B) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
<<<<<<< HEAD
          const s = e instanceof vt ? e : B.defaultVersification;
=======
          const s = e instanceof bt ? e : B.defaultVersification;
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          this.setEmpty(s);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && a != null)
      if (typeof e == "string" && typeof n == "string" && typeof a == "string")
        this.setEmpty(o), this.updateInternal(e, n, a);
      else if (typeof e == "number" && typeof n == "number" && typeof a == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = a, this.versification = o ?? B.defaultVersification;
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
      return n = new B(e), { success: !0, verseRef: n };
    } catch (a) {
<<<<<<< HEAD
      if (a instanceof Pt)
=======
      if (a instanceof It)
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        return n = new B(), { success: !1, verseRef: n };
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
    return e % B.bcvMaxValue * B.bookDigitShifter + (n >= 0 ? n % B.bcvMaxValue * B.chapterDigitShifter : 0) + (a >= 0 ? a % B.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: a, verseNum: o, verse: s, versificationStr: i } = e, w = s || o.toString();
    let c;
<<<<<<< HEAD
    return i && (c = new vt(i)), n ? new B(n, a.toString(), w, c) : new B();
=======
    return i && (c = new bt(i)), n ? new B(n, a.toString(), w, c) : new B();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
      if (n = n * 10 + +a - 0, n > B.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(B.verseRangeSeparator) || this._verse.includes(B.verseSequenceIndicator));
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
    const { success: n, vNum: a } = B.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = a, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = B.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > M.lastBook)
<<<<<<< HEAD
      throw new Pt(
=======
      throw new It(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
    this.versification = this.versification != null ? new vt(e) : void 0;
=======
    this.versification = this.versification != null ? new bt(e) : void 0;
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
    return this.validateVerse(B.verseRangeSeparators, B.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return B.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return B.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
<<<<<<< HEAD
          this.versification = new vt(st[i]);
        } catch {
          throw new Pt("Invalid reference : " + e);
=======
          this.versification = new bt(ot[i]);
        } catch {
          throw new It("Invalid reference : " + e);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
<<<<<<< HEAD
      throw new Pt("Invalid reference : " + e);
    const a = n[1].split(":"), o = +a[0];
    if (a.length !== 2 || M.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !B.isVerseParseable(a[1]))
      throw new Pt("Invalid reference : " + e);
=======
      throw new It("Invalid reference : " + e);
    const a = n[1].split(":"), o = +a[0];
    if (a.length !== 2 || M.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !B.isVerseParseable(a[1]))
      throw new It("Invalid reference : " + e);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
    return new B(this);
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
    return e instanceof B ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = B.verseRangeSeparators, a = B.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], s = nn(this._verse, a);
    for (const i of s.map((w) => nn(w, n))) {
      const w = this.clone();
      w.verse = i[0];
      const c = w.verseNum;
      if (o.push(w), i.length > 1) {
<<<<<<< HEAD
        const u = this.clone();
        if (u.verse = i[1], !e)
          for (let g = c + 1; g < u.verseNum; g++) {
=======
        const p = this.clone();
        if (p.verse = i[1], !e)
          for (let g = c + 1; g < p.verseNum; g++) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            const v = new B(
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
  setEmpty(e = B.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, a) {
    this.bookNum = M.bookIdToNumber(e), this.chapter = n, this.verse = a;
  }
};
<<<<<<< HEAD
E(W, "defaultVersification", vt.English), E(W, "verseRangeSeparator", "-"), E(W, "verseSequenceIndicator", ","), E(W, "verseRangeSeparators", [W.verseRangeSeparator]), E(W, "verseSequenceIndicators", [W.verseSequenceIndicator]), E(W, "chapterDigitShifter", 1e3), E(W, "bookDigitShifter", W.chapterDigitShifter * W.chapterDigitShifter), E(W, "bcvMaxValue", W.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
E(W, "ValidStatusType", Tn);
class Pt extends Error {
}
const ma = te(
=======
E(W, "defaultVersification", bt.English), E(W, "verseRangeSeparator", "-"), E(W, "verseSequenceIndicator", ","), E(W, "verseRangeSeparators", [W.verseRangeSeparator]), E(W, "verseSequenceIndicators", [W.verseSequenceIndicator]), E(W, "chapterDigitShifter", 1e3), E(W, "bookDigitShifter", W.chapterDigitShifter * W.chapterDigitShifter), E(W, "bcvMaxValue", W.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
E(W, "ValidStatusType", _n);
class It extends Error {
}
const la = Zt(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: a,
    handleKeyDown: o,
    bookType: s,
    children: i
  }, w) => /* @__PURE__ */ d(
    Pe,
    {
      ref: w,
      textValue: t,
      className: l(
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
            className: l(
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
function ha({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: a,
  handleHighlightedChapter: o
}) {
  const s = Array.from({ length: e }, (w, c) => c + 1), i = U(
    (w) => {
      o(w);
    },
    [o]
  );
  return /* @__PURE__ */ r("div", { className: l("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: s.map((w) => /* @__PURE__ */ r(
    "div",
    {
      className: l(
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
<<<<<<< HEAD
const ga = 6, $e = M.allBookIds.filter((t) => !M.isObsolete(M.bookIdToNumber(t))), fa = {
=======
const ca = 6, Fe = M.allBookIds.filter((t) => !M.isObsolete(M.bookIdToNumber(t))), pa = {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, rn = ["OT", "NT", "DC"], ba = 96, va = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], an = /* @__PURE__ */ new Set([
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Enter"
<<<<<<< HEAD
]), xa = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])', jt = (t) => jr(M.bookIdToNumber(t));
function ya() {
  return $e.map((e) => M.bookIdToEnglishName(e));
=======
]), ha = 'a:not([disabled]), button:not([disabled]), input[type=text]:not([disabled]), [tabindex]:not([disabled]):not([tabindex="-1"])', Pt = (t) => Br(M.bookIdToNumber(t));
function ga() {
  return Fe.map((e) => M.bookIdToEnglishName(e));
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
}
function Na(t) {
  return ya().includes(t);
}
function ka(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
<<<<<<< HEAD
  if (Na(e))
    return $e.find((a) => M.bookIdToEnglishName(a) === e);
}
function Ds({
=======
  if (fa(e))
    return Fe.find((a) => M.bookIdToEnglishName(a) === e);
}
function gs({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: a
}) {
<<<<<<< HEAD
  const o = H(), [s, i] = P(
    () => Tt(t, "English")
  ), [w, c] = P(""), [u, g] = P(t.book), [v, f] = P(t.chapterNum ?? 0), [m, N] = P(t.book), [T, y] = P(!1), [x, _] = P(T), S = q(void 0), z = q(void 0), $ = q(void 0), ft = U(
    (h) => {
      const V = a ? a() : $e;
      return {
        OT: V.filter((C) => M.isBookOT(C)),
        NT: V.filter((C) => M.isBookNT(C)),
        DC: V.filter((C) => M.isBookDC(C))
=======
  const o = H(), [s, i] = A(
    () => _t(t, "English")
  ), [w, c] = A(""), [p, g] = A(t.book), [v, f] = A(t.chapterNum ?? 0), [m, N] = A(t.book), [T, y] = A(!1), [x, _] = A(T), S = q(void 0), z = q(void 0), $ = q(void 0), gt = U(
    (h) => {
      const D = a ? a() : Fe;
      return {
        OT: D.filter((C) => M.isBookOT(C)),
        NT: D.filter((C) => M.isBookNT(C)),
        DC: D.filter((C) => M.isBookDC(C))
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      }[h].filter((C) => {
        const O = M.bookIdToEnglishName(C).toLowerCase(), K = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return O.includes(K) || // Match book name
        C.toLowerCase().includes(K);
      });
    },
    [w, a]
    // Only recompute when relevant values change
<<<<<<< HEAD
  ), lt = (h) => {
    i(h), c(h);
  }, k = q(!1), b = U(() => {
    i(Tt(t, "English")), c(""), g(t.book), N(t.book);
=======
  ), wt = (h) => {
    i(h), c(h);
  }, k = q(!1), b = U(() => {
    i(_t(t, "English")), c(""), g(t.book), N(t.book);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  }, [t]), F = U((h) => {
    if (k.current) {
      k.current = !1;
      return;
    }
    y(h);
  }, []), R = U(
<<<<<<< HEAD
    (h, V, C, O) => {
      if (f(t.book !== h ? 1 : t.chapterNum), V || jt(h) === -1) {
=======
    (h, D, C, O) => {
      if (f(t.book !== h ? 1 : t.chapterNum), D || Pt(h) === -1) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        e({
          book: h,
          chapterNum: C ?? 1,
          verseNum: O ?? 1
        }), y(!1), c("");
        return;
      }
<<<<<<< HEAD
      g(u !== h ? h : ""), y(!V);
    },
    [e, t.book, t.chapterNum, u]
  ), nt = (h) => {
    h <= 0 || h > jt(u) || R(u, !0, h);
  }, It = U(() => {
    va.forEach((h) => {
      const V = h.exec(w);
      if (V) {
        const [C, O = void 0, K = void 0] = V.slice(1), L = ka(C);
=======
      g(p !== h ? h : ""), y(!D);
    },
    [e, t.book, t.chapterNum, p]
  ), nt = (h) => {
    h <= 0 || h > Pt(p) || R(p, !0, h);
  }, Ot = U(() => {
    ma.forEach((h) => {
      const D = h.exec(w);
      if (D) {
        const [C, O = void 0, K = void 0] = D.slice(1), L = ba(C);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        (M.isBookIdValid(C) || L) && R(
          L ?? C,
          !0,
          O ? parseInt(O, 10) : 1,
          K ? parseInt(K, 10) : 1
        );
      }
    });
<<<<<<< HEAD
  }, [R, w]), At = U(
=======
  }, [R, w]), Bt = U(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    (h) => {
      T ? h.key === "ArrowDown" || h.key === "Tab" && !h.shiftKey ? ($ != null && $.current ? $.current.focus() : z.current && z.current.focus(), h.preventDefault()) : h.key === "Escape" && document.activeElement === S.current && (y(!1), h.preventDefault(), h.stopPropagation()) : h.key !== "Tab" && y(!0);
    },
    [T]
<<<<<<< HEAD
  ), dt = U((h) => {
    if (!Pr.has(h.key)) {
=======
  ), lt = U((h) => {
    if (!Or.has(h.key)) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      if (h.key === "Tab") {
        if (h.shiftKey)
          S.current.focus();
        else {
<<<<<<< HEAD
          const V = [
            ...document.querySelectorAll(xa)
=======
          const D = [
            ...document.querySelectorAll(ha)
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          ].filter(
            (O) => {
              var K, L;
              return O instanceof HTMLElement && ((O.offsetWidth > 0 || O.offsetHeight > 0) && !((K = z.current) != null && K.contains(O)) && !((L = S.current) != null && L.contains(O)) || O === h.target);
            }
<<<<<<< HEAD
          ), C = h.target instanceof HTMLElement ? V.indexOf(h.target) : -1;
          C >= 0 ? V[(C + 1) % V.length].focus() : S.current.focus();
=======
          ), C = h.target instanceof HTMLElement ? D.indexOf(h.target) : -1;
          C >= 0 ? D[(C + 1) % D.length].focus() : S.current.focus();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        }
        h.preventDefault(), h.stopPropagation();
        return;
      }
      h.stopPropagation(), S.current.focus(), S.current.dispatchEvent(new KeyboardEvent("keydown", { ...h, view: void 0 }));
    }
  }, []), J = U(
    (h) => {
<<<<<<< HEAD
      const { key: V } = h;
      an.has(V) || (dt(h), h.preventDefault());
    },
    [dt]
  ), D = U(
    (h, V) => {
      const { key: C } = h;
      if (an.has(C)) {
        if (m === u) {
          if (C === "Enter") {
            h.preventDefault(), R(u, !0, v);
=======
      const { key: D } = h;
      nn.has(D) || (lt(h), h.preventDefault());
    },
    [lt]
  ), V = U(
    (h, D) => {
      const { key: C } = h;
      if (nn.has(C)) {
        if (m === p) {
          if (C === "Enter") {
            h.preventDefault(), R(p, !0, v);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            return;
          }
          const O = C === "ArrowRight" && !o || C === "ArrowRight" && o === "ltr" || C === "ArrowLeft" && o === "rtl", K = C === "ArrowLeft" && !o || C === "ArrowLeft" && o === "ltr" || C === "ArrowRight" && o === "rtl";
          let L = 0;
          if (O)
<<<<<<< HEAD
            if (v < jt(m))
=======
            if (v < Pt(m))
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
              L = 1;
            else {
              h.preventDefault();
              return;
            }
          else if (K)
            if (v > 1)
              L = -1;
            else {
              h.preventDefault();
              return;
            }
<<<<<<< HEAD
          else C === "ArrowDown" ? L = ga : C === "ArrowUp" && (L = -6);
          if (v + L <= 0 || v + L > jt(m))
=======
          else C === "ArrowDown" ? L = ca : C === "ArrowUp" && (L = -6);
          if (v + L <= 0 || v + L > Pt(m))
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            f(0);
          else if (L !== 0) {
            f(v + L), h.preventDefault();
            return;
          }
        }
<<<<<<< HEAD
        if (V === 0 && C === "ArrowUp") {
=======
        if (D === 0 && C === "ArrowUp") {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          h.preventDefault(), S.current.focus();
          return;
        }
        return;
      }
<<<<<<< HEAD
      dt(h);
=======
      lt(h);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    },
    [
      o,
      m,
      v,
<<<<<<< HEAD
      dt,
      u,
      R
    ]
  );
  return it(() => {
    u === m ? u === t.book ? f(t.chapterNum) : f(1) : f(0);
  }, [m, t.book, t.chapterNum, u]), it(() => {
    b();
  }, [b]), it(() => {
  }, [T, b]), tn(() => {
    _(T);
  }, [T]), tn(() => {
    const h = setTimeout(() => {
      var V, C;
      if (x && z.current && $.current) {
        const K = $.current.offsetTop - ba;
        z.current.scrollTo({ top: K, behavior: "instant" }), S.current.focus();
      }
      !x && document.activeElement !== S.current && !((V = S.current) != null && V.contains(document.activeElement)) && document.activeElement !== z.current && !((C = z.current) != null && C.contains(document.activeElement)) && b();
=======
      lt,
      p,
      R
    ]
  );
  return st(() => {
    p === m ? p === t.book ? f(t.chapterNum) : f(1) : f(0);
  }, [m, t.book, t.chapterNum, p]), st(() => {
    b();
  }, [b]), st(() => {
  }, [T, b]), Ze(() => {
    _(T);
  }, [T]), Ze(() => {
    const h = setTimeout(() => {
      var D, C;
      if (x && z.current && $.current) {
        const K = $.current.offsetTop - ua;
        z.current.scrollTo({ top: K, behavior: "instant" }), S.current.focus();
      }
      !x && document.activeElement !== S.current && !((D = S.current) != null && D.contains(document.activeElement)) && document.activeElement !== z.current && !((C = z.current) != null && C.contains(document.activeElement)) && b();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    }, 10);
    return () => {
      clearTimeout(h);
    };
<<<<<<< HEAD
  }, [x, b]), /* @__PURE__ */ d(re, { modal: !1, open: T, onOpenChange: F, children: [
    /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(
      Wr,
      {
        ref: S,
        value: s,
        handleSearch: lt,
        handleKeyDown: At,
=======
  }, [x, b]), /* @__PURE__ */ l(ee, { modal: !1, open: T, onOpenChange: F, children: [
    /* @__PURE__ */ r(Be, { asChild: !0, children: /* @__PURE__ */ r(
      Hr,
      {
        ref: S,
        value: s,
        handleSearch: wt,
        handleKeyDown: Bt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        handleOnClick: () => {
          g(t.book), N(t.book), f(t.chapterNum > 0 ? t.chapterNum : 0), y(!0), S.current.focus();
        },
        onFocus: () => {
          k.current = !0;
        },
<<<<<<< HEAD
        handleSubmit: It,
        placeholder: Tt(t, "English"),
=======
        handleSubmit: Ot,
        placeholder: _t(t, "English"),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        className: n
      }
    ) }),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      Ut,
=======
      Yt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        align: o === "ltr" ? "start" : "end",
        ref: z,
        onKeyDown: J,
        onFocus: (h) => {
<<<<<<< HEAD
          var V, C;
          !((V = S.current) != null && V.contains(h.relatedTarget)) && !((C = z.current) != null && C.contains(h.relatedTarget)) && S.current.select();
        },
        children: /* @__PURE__ */ r("div", { className: "rtl:tw-ps-2", children: rn.map((h, V) => {
          const C = ft(h);
          return C.length > 0 && /* @__PURE__ */ d("div", { children: [
            /* @__PURE__ */ r(ae, { className: "tw-font-semibold tw-text-foreground/80", children: fa[h] }),
            C.map((O, K) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              ma,
              {
                bookId: O,
                handleSelectBook: () => R(O, !1),
                isSelected: u === O,
                handleHighlightBook: () => N(O),
                handleKeyDown: (L) => D(L, K),
                bookType: h,
                ref: (L) => {
                  u === O && ($.current = L);
=======
          var D, C;
          !((D = S.current) != null && D.contains(h.relatedTarget)) && !((C = z.current) != null && C.contains(h.relatedTarget)) && S.current.select();
        },
        children: /* @__PURE__ */ r("div", { className: "rtl:tw-ps-2", children: en.map((h, D) => {
          const C = gt(h);
          return C.length > 0 && /* @__PURE__ */ l("div", { children: [
            /* @__PURE__ */ r(ne, { className: "tw-font-semibold tw-text-foreground/80", children: pa[h] }),
            C.map((O, K) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              la,
              {
                bookId: O,
                handleSelectBook: () => R(O, !1),
                isSelected: p === O,
                handleHighlightBook: () => N(O),
                handleKeyDown: (L) => V(L, K),
                bookType: h,
                ref: (L) => {
                  p === O && ($.current = L);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                },
                children: /* @__PURE__ */ r(
                  ha,
                  {
                    handleSelectChapter: nt,
<<<<<<< HEAD
                    endChapter: jt(O),
=======
                    endChapter: Pt(O),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                    activeChapter: t.book === O ? t.chapterNum : 0,
                    highlightedChapter: v,
                    handleHighlightedChapter: (L) => {
                      f(L);
                    }
                  }
                )
              }
            ) }, O)),
<<<<<<< HEAD
            rn.length - 1 !== V ? /* @__PURE__ */ r(qt, {}) : void 0
=======
            en.length - 1 !== D ? /* @__PURE__ */ r(Ht, {}) : void 0
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          ] }, h);
        }) })
      }
    )
  ] });
}
<<<<<<< HEAD
const Ca = gt(
=======
const va = ht(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
), I = p.forwardRef(
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, s) => /* @__PURE__ */ r(a ? Mt : "button", { className: l(Ca({ variant: e, size: n, className: t })), ref: s, ...o })
);
I.displayName = "Button";
const _a = gt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Y = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(pn.Root, { ref: n, className: l("pr-twp", _a(), t), ...e }));
Y.displayName = pn.Root.displayName;
const Le = p.forwardRef(({ className: t, ...e }, n) => {
  const a = H();
  return /* @__PURE__ */ r(
    $t.Root,
=======
), I = u.forwardRef(
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, s) => /* @__PURE__ */ r(a ? Vt : "button", { className: d(va({ variant: e, size: n, className: t })), ref: s, ...o })
);
I.displayName = "Button";
const xa = ht(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Y = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(dn.Root, { ref: n, className: d("pr-twp", xa(), t), ...e }));
Y.displayName = dn.Root.displayName;
const Ge = u.forwardRef(({ className: t, ...e }, n) => {
  const a = H();
  return /* @__PURE__ */ r(
    Ft.Root,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      className: l("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: a
    }
  );
});
<<<<<<< HEAD
Le.displayName = $t.Root.displayName;
const Wt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  $t.Item,
=======
Ge.displayName = Ft.Root.displayName;
const Jt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ft.Item,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
<<<<<<< HEAD
    children: /* @__PURE__ */ r($t.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Me, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Wt.displayName = $t.Item.displayName;
const Ye = Lt.Root, He = Lt.Trigger, oe = p.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const s = H();
  return /* @__PURE__ */ r(Lt.Portal, { children: /* @__PURE__ */ r(
    Lt.Content,
=======
    children: /* @__PURE__ */ r(Ft.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Ve, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Jt.displayName = Ft.Item.displayName;
const $e = Gt.Root, Le = Gt.Trigger, re = u.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const s = H();
  return /* @__PURE__ */ r(Gt.Portal, { children: /* @__PURE__ */ r(
    Gt.Content,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
oe.displayName = Lt.Content.displayName;
const Sa = wt.Portal, Rn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Overlay,
=======
re.displayName = Gt.Content.displayName;
const ya = it.Portal, Sn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Overlay,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Rn.displayName = wt.Overlay.displayName;
const Ta = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = H();
  return /* @__PURE__ */ d(Sa, { children: [
    /* @__PURE__ */ r(Rn, {}),
    /* @__PURE__ */ d(
      wt.Content,
=======
Sn.displayName = it.Overlay.displayName;
const Na = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = H();
  return /* @__PURE__ */ l(ya, { children: [
    /* @__PURE__ */ r(Sn, {}),
    /* @__PURE__ */ l(
      it.Content,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
            wt.Close,
            {
              className: l(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(De, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
<<<<<<< HEAD
Ta.displayName = wt.Content.displayName;
const Ra = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Title,
=======
Na.displayName = it.Content.displayName;
const ka = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Title,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
<<<<<<< HEAD
Ra.displayName = wt.Title.displayName;
const Ea = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  wt.Description,
=======
ka.displayName = it.Title.displayName;
const Ca = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  it.Description,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
Ea.displayName = wt.Description.displayName;
const se = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Ca.displayName = it.Description.displayName;
const ae = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Z,
  {
    ref: n,
    className: l(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
se.displayName = Z.displayName;
const ie = p.forwardRef(({ className: t, ...e }, n) => {
  const a = H();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(cn, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
=======
ae.displayName = Z.displayName;
const oe = u.forwardRef(({ className: t, ...e }, n) => {
  const a = H();
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(ln, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    /* @__PURE__ */ r(
      Z.Input,
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
<<<<<<< HEAD
ie.displayName = Z.Input.displayName;
const we = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
oe.displayName = Z.Input.displayName;
const se = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Z.List,
  {
    ref: n,
    className: l("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
<<<<<<< HEAD
we.displayName = Z.List.displayName;
const le = p.forwardRef((t, e) => /* @__PURE__ */ r(Z.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
le.displayName = Z.Empty.displayName;
const Ue = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
se.displayName = Z.List.displayName;
const ie = u.forwardRef((t, e) => /* @__PURE__ */ r(Z.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
ie.displayName = Z.Empty.displayName;
const Ye = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Z.Group,
  {
    ref: n,
    className: l(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Ue.displayName = Z.Group.displayName;
const En = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Ye.displayName = Z.Group.displayName;
const Tn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Z.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
<<<<<<< HEAD
En.displayName = Z.Separator.displayName;
const de = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Tn.displayName = Z.Separator.displayName;
const we = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Z.Item,
  {
    ref: n,
    className: l(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
de.displayName = Z.Item.displayName;
function Da(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Te({
=======
we.displayName = Z.Item.displayName;
function _a(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function _e({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  id: t,
  options: e = [],
  className: n,
  buttonClassName: a,
  popoverContentClassName: o,
  value: s,
  onChange: i = () => {
  },
<<<<<<< HEAD
  getOptionLabel: w = Da,
=======
  getOptionLabel: w = _a,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  icon: c = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: g = "",
  commandEmptyMessage: v = "No option found",
  buttonVariant: f = "outline",
  alignDropDown: m = "start",
  isDisabled: N = !1,
  ...T
}) {
<<<<<<< HEAD
  const [y, x] = P(!1);
  return /* @__PURE__ */ d(Ye, { open: y, onOpenChange: x, ...T, children: [
    /* @__PURE__ */ r(He, { asChild: !0, children: /* @__PURE__ */ d(
=======
  const [y, x] = A(!1);
  return /* @__PURE__ */ l($e, { open: y, onOpenChange: x, ...T, children: [
    /* @__PURE__ */ r(Le, { asChild: !0, children: /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      I,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": y,
        id: t,
        className: l(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? n
        ),
        disabled: N,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: c }),
<<<<<<< HEAD
            /* @__PURE__ */ r("span", { className: l("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? w(s) : u })
=======
            /* @__PURE__ */ r("span", { className: d("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? w(s) : p })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          ] }),
          /* @__PURE__ */ r(Oe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      oe,
      {
        align: m,
        className: l("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ d(se, { children: [
          /* @__PURE__ */ r(ie, { placeholder: g, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(le, { children: v }),
          /* @__PURE__ */ r(we, { children: e.map((_) => /* @__PURE__ */ d(
            de,
=======
      re,
      {
        align: m,
        className: d("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ l(ae, { children: [
          /* @__PURE__ */ r(oe, { placeholder: g, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(ie, { children: v }),
          /* @__PURE__ */ r(se, { children: e.map((_) => /* @__PURE__ */ l(
            we,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            {
              value: w(_),
              onSelect: () => {
                i(_), x(!1);
              },
              children: [
                /* @__PURE__ */ r(
<<<<<<< HEAD
                  _t,
=======
                  kt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                  {
                    className: l("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !s || w(s) !== w(_)
                    })
                  }
                ),
                w(_)
              ]
            },
            w(_)
          )) })
        ] })
      }
    )
  ] });
}
<<<<<<< HEAD
function Va({
=======
function Sa({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: s
}) {
  const i = et(
<<<<<<< HEAD
    () => Array.from({ length: s }, (u, g) => g + 1),
    [s]
  );
  return /* @__PURE__ */ d(Vt, { children: [
    /* @__PURE__ */ r(Y, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Te,
=======
    () => Array.from({ length: s }, (p, g) => g + 1),
    [s]
  );
  return /* @__PURE__ */ l(Et, { children: [
    /* @__PURE__ */ r(Y, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      _e,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
    /* @__PURE__ */ r(Y, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      Te,
=======
      _e,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
var Ma = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Ma || {});
const Vs = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), ve = (t, e) => t[e] ?? e;
function Ms({
=======
var Ta = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Ta || {});
const fs = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), fe = (t, e) => t[e] ?? e;
function bs({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
  const g = ve(u, "%webView_bookSelector_currentBook%"), v = ve(u, "%webView_bookSelector_choose%"), f = ve(u, "%webView_bookSelector_chooseBooks%"), [m, N] = P(
=======
  const g = fe(p, "%webView_bookSelector_currentBook%"), v = fe(p, "%webView_bookSelector_choose%"), f = fe(p, "%webView_bookSelector_chooseBooks%"), [m, N] = A(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    "current book"
    /* CURRENT_BOOK */
  ), T = (y) => {
    N(y), t(y);
  };
  return /* @__PURE__ */ r(
    Le,
    {
      className: "pr-twp tw-flex",
      value: m,
      onValueChange: (y) => T(y),
<<<<<<< HEAD
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Wt, {
=======
      children: /* @__PURE__ */ l("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Jt, {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(Y, { className: "tw-ms-1", children: g })
          ] }),
          /* @__PURE__ */ r(Y, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
<<<<<<< HEAD
            Va,
=======
            Sa,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: w,
              endChapter: s
            }
          ) })
        ] }),
<<<<<<< HEAD
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Wt, {
=======
        /* @__PURE__ */ l("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Jt, {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(Y, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(Y, { className: "tw-flex tw-items-center", children: a.map((y) => M.bookIdToEnglishName(y)).join(", ") }),
          /* @__PURE__ */ r(
            I,
            {
              disabled: m === "current book",
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
function za({ table: t }) {
  return /* @__PURE__ */ d(re, { children: [
    /* @__PURE__ */ r(cr, { asChild: !0, children: /* @__PURE__ */ d(I, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(pr, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(Ut, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(ae, { children: "Toggle columns" }),
      /* @__PURE__ */ r(qt, {}),
=======
function Ra({ table: t }) {
  return /* @__PURE__ */ l(ee, { children: [
    /* @__PURE__ */ r(ir, { asChild: !0, children: /* @__PURE__ */ l(I, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(wr, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ l(Yt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(ne, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Ht, {}),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        je,
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
const Rt = G.Root, Oa = G.Group, Et = G.Value, Ba = gt(
=======
const St = G.Root, Ea = G.Group, Tt = G.Value, Va = ht(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
), kt = p.forwardRef(({ className: t, children: e, size: n, ...a }, o) => {
  const s = H();
  return /* @__PURE__ */ d(
=======
), yt = u.forwardRef(({ className: t, children: e, size: n, ...a }, o) => {
  const s = H();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    G.Trigger,
    {
      className: l(Ba({ size: n, className: t })),
      ref: o,
      ...a,
      dir: s,
      children: [
        e,
<<<<<<< HEAD
        /* @__PURE__ */ r(G.Icon, { asChild: !0, children: /* @__PURE__ */ r(ee, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
=======
        /* @__PURE__ */ r(G.Icon, { asChild: !0, children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      ]
    }
  );
});
<<<<<<< HEAD
kt.displayName = G.Trigger.displayName;
const Dn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
yt.displayName = G.Trigger.displayName;
const Rn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  G.ScrollUpButton,
  {
    ref: n,
    className: l("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(ur, { className: "tw-h-4 tw-w-4" })
  }
));
<<<<<<< HEAD
Dn.displayName = G.ScrollUpButton.displayName;
const Vn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Rn.displayName = G.ScrollUpButton.displayName;
const En = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  G.ScrollDownButton,
  {
    ref: n,
    className: l("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
<<<<<<< HEAD
    children: /* @__PURE__ */ r(ee, { className: "tw-h-4 tw-w-4" })
  }
));
Vn.displayName = G.ScrollDownButton.displayName;
const Ct = p.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const s = H();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ d(
=======
    children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" })
  }
));
En.displayName = G.ScrollDownButton.displayName;
const Nt = u.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const s = H();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
        /* @__PURE__ */ r(Dn, {}),
=======
        /* @__PURE__ */ r(Rn, {}),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
        /* @__PURE__ */ r(Vn, {})
      ]
    }
  ) });
});
<<<<<<< HEAD
Ct.displayName = G.Content.displayName;
const Ia = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Nt.displayName = G.Content.displayName;
const Da = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  G.Label,
  {
    ref: n,
    className: l("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
<<<<<<< HEAD
Ia.displayName = G.Label.displayName;
const rt = p.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ d(
=======
Da.displayName = G.Label.displayName;
const rt = u.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  G.Item,
  {
    ref: a,
    className: l(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
<<<<<<< HEAD
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" }) }) }),
=======
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(kt, { className: "tw-h-4 tw-w-4" }) }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      /* @__PURE__ */ r(G.ItemText, { children: e })
    ]
  }
));
rt.displayName = G.Item.displayName;
<<<<<<< HEAD
const Aa = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
const Ma = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  G.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
Aa.displayName = G.Separator.displayName;
function Pa({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
=======
Ma.displayName = G.Separator.displayName;
function za({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
<<<<<<< HEAD
      /* @__PURE__ */ d(
        Rt,
=======
      /* @__PURE__ */ l(
        St,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
<<<<<<< HEAD
            /* @__PURE__ */ r(kt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Et, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ct, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(rt, { value: `${e}`, children: e }, e)) })
=======
            /* @__PURE__ */ r(yt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Tt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Nt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(rt, { value: `${e}`, children: e }, e)) })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(mr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(hr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(gr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        I,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(fr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
<<<<<<< HEAD
const ce = p.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r("div", { className: l("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ r(
=======
const le = u.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r("div", { className: d("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  "table",
  {
    ref: a,
    className: l("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
<<<<<<< HEAD
ce.displayName = "Table";
const pe = p.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
=======
le.displayName = "Table";
const de = u.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  "thead",
  {
    ref: a,
    className: l(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
<<<<<<< HEAD
pe.displayName = "TableHeader";
const ue = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: l("[&_tr:last-child]:tw-border-0", t), ...e }));
ue.displayName = "TableBody";
const ja = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
de.displayName = "TableHeader";
const ce = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: d("[&_tr:last-child]:tw-border-0", t), ...e }));
ce.displayName = "TableBody";
const Oa = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  "tfoot",
  {
    ref: n,
    className: l("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
<<<<<<< HEAD
ja.displayName = "TableFooter";
const ht = p.forwardRef(
=======
Oa.displayName = "TableFooter";
const mt = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "tr",
    {
      ref: n,
      className: l(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
<<<<<<< HEAD
ht.displayName = "TableRow";
const Yt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
mt.displayName = "TableRow";
const $t = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Yt.displayName = "TableHead";
const Dt = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
$t.displayName = "TableHead";
const Rt = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  "td",
  {
    ref: n,
    className: l("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
<<<<<<< HEAD
Dt.displayName = "TableCell";
const Xa = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Rt.displayName = "TableCell";
const Ba = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  "caption",
  {
    ref: n,
    className: l("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
Xa.displayName = "TableCaption";
function Fa({
=======
Ba.displayName = "TableCaption";
function Ia({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var y;
<<<<<<< HEAD
  const [w, c] = P([]), [u, g] = P([]), [v, f] = P({}), [m, N] = P({}), T = un({
=======
  const [w, c] = A([]), [p, g] = A([]), [v, f] = A({}), [m, N] = A({}), T = cn({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    data: e,
    columns: t,
    getCoreRowModel: hn(),
    ...n && { getPaginationRowModel: $r() },
    onSortingChange: c,
    getSortedRowModel: mn(),
    onColumnFiltersChange: g,
    getFilteredRowModel: Gr(),
    onColumnVisibilityChange: f,
    onRowSelectionChange: N,
    state: {
      sorting: w,
<<<<<<< HEAD
      columnFilters: u,
=======
      columnFilters: p,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      columnVisibility: v,
      rowSelection: m
    }
  });
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ r(za, { table: T }),
    /* @__PURE__ */ d(ce, { stickyHeader: s, children: [
      /* @__PURE__ */ r(pe, { stickyHeader: s, children: T.getHeaderGroups().map((x) => /* @__PURE__ */ r(ht, { children: x.headers.map((_) => /* @__PURE__ */ r(Yt, { children: _.isPlaceholder ? void 0 : Gt(_.column.columnDef.header, _.getContext()) }, _.id)) }, x.id)) }),
      /* @__PURE__ */ r(ue, { children: (y = T.getRowModel().rows) != null && y.length ? T.getRowModel().rows.map((x) => /* @__PURE__ */ r(
        ht,
        {
          onClick: () => i(x, T),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map((_) => /* @__PURE__ */ r(Dt, { children: Gt(_.column.columnDef.cell, _.getContext()) }, _.id))
        },
        x.id
      )) : /* @__PURE__ */ r(ht, { children: /* @__PURE__ */ r(Dt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
=======
  return /* @__PURE__ */ l("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ r(Ra, { table: T }),
    /* @__PURE__ */ l(le, { stickyHeader: s, children: [
      /* @__PURE__ */ r(de, { stickyHeader: s, children: T.getHeaderGroups().map((x) => /* @__PURE__ */ r(mt, { children: x.headers.map((_) => /* @__PURE__ */ r($t, { children: _.isPlaceholder ? void 0 : Xt(_.column.columnDef.header, _.getContext()) }, _.id)) }, x.id)) }),
      /* @__PURE__ */ r(ce, { children: (y = T.getRowModel().rows) != null && y.length ? T.getRowModel().rows.map((x) => /* @__PURE__ */ r(
        mt,
        {
          onClick: () => i(x, T),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map((_) => /* @__PURE__ */ r(Rt, { children: Xt(_.column.columnDef.cell, _.getContext()) }, _.id))
        },
        x.id
      )) : /* @__PURE__ */ r(mt, { children: /* @__PURE__ */ r(Rt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        I,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.previousPage(),
          disabled: !T.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        I,
        {
          variant: "outline",
          size: "sm",
          onClick: () => T.nextPage(),
          disabled: !T.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
<<<<<<< HEAD
    n && a && /* @__PURE__ */ r(Pa, { table: T })
  ] });
}
const Jt = te(({ className: t, ...e }, n) => /* @__PURE__ */ r(br, { size: 35, className: l("tw-animate-spin", t), ...e, ref: n }));
Jt.displayName = "Spinner";
function zs({
=======
    n && a && /* @__PURE__ */ r(za, { table: T })
  ] });
}
const Ut = Zt(({ className: t, ...e }, n) => /* @__PURE__ */ r(mr, { size: 35, className: d("tw-animate-spin", t), ...e, ref: n }));
Ut.displayName = "Spinner";
function vs({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: a,
  ...o
}) {
  return /* @__PURE__ */ r(
    I,
    {
      className: l(
        "tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t,
          "tw-bg-blue-600": !t,
          "tw-bg-white tw-text-blue-600 hover:tw-text-white": !n,
          "tw-w-20": n
        },
        a
      ),
      onClick: e,
      ...o,
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ r(Jt, { size: 15 }) : /* @__PURE__ */ d(Vt, { children: [
        /* @__PURE__ */ r(vr, { size: 25, className: l("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
=======
      children: t ? /* @__PURE__ */ r(Ut, { size: 15 }) : /* @__PURE__ */ l(Et, { children: [
        /* @__PURE__ */ r(hr, { size: 25, className: d("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        n
      ] })
    }
  );
}
<<<<<<< HEAD
function Os({ isEnabling: t, handleClick: e, className: n, ...a }) {
=======
function xs({ isEnabling: t, handleClick: e, className: n, ...a }) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    I,
    {
      className: l(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...a,
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ d(Vt, { children: [
        /* @__PURE__ */ r(Jt, { size: 15, className: "tw-mr-1 tw-text-white" }),
=======
      children: t ? /* @__PURE__ */ l(Et, { children: [
        /* @__PURE__ */ r(Ut, { size: 15, className: "tw-mr-1 tw-text-white" }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
<<<<<<< HEAD
function Bs({
=======
function ys({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  isDisabling: t,
  handleClick: e,
  className: n,
  ...a
}) {
  return /* @__PURE__ */ r(
    I,
    {
      className: l(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        n
      ),
      onClick: e,
      ...a,
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ d(Vt, { children: [
        /* @__PURE__ */ r(Jt, { size: 15, className: "tw-mr-1 tw-text-black" }),
=======
      children: t ? /* @__PURE__ */ l(Et, { children: [
        /* @__PURE__ */ r(Ut, { size: 15, className: "tw-mr-1 tw-text-black" }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
<<<<<<< HEAD
function Is({ isUpdating: t, handleClick: e, className: n, ...a }) {
=======
function Ns({ isUpdating: t, handleClick: e, className: n, ...a }) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    I,
    {
      className: l(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...a,
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ d(Vt, { children: [
        /* @__PURE__ */ r(Jt, { size: 15, className: "tw-mr-1 tw-text-white" }),
=======
      children: t ? /* @__PURE__ */ l(Et, { children: [
        /* @__PURE__ */ r(Ut, { size: 15, className: "tw-mr-1 tw-text-white" }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        "Updating..."
      ] }) : "Update"
    }
  );
}
<<<<<<< HEAD
function As({ id: t, markdown: e, className: n, anchorTarget: a }) {
=======
function ks({ id: t, markdown: e, className: n, anchorTarget: a }) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
  return /* @__PURE__ */ r("div", { id: t, className: l("pr-twp tw-prose", n), children: /* @__PURE__ */ r(Hr, { options: o, children: e }) });
}
<<<<<<< HEAD
const Ga = te((t, e) => /* @__PURE__ */ d(
=======
const Pa = Zt((t, e) => /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  I,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ r(xr, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ r(
<<<<<<< HEAD
        ee,
=======
        Qt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
<<<<<<< HEAD
var $a = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))($a || {});
function Ps({ id: t, groups: e }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(re, { children: [
    /* @__PURE__ */ r(Ae, { asChild: !0, children: /* @__PURE__ */ r(Ga, {}) }),
    /* @__PURE__ */ r(Ut, { children: e.map((n) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(ae, { children: n.label }),
      /* @__PURE__ */ r(bn, { children: n.items.map((a) => /* @__PURE__ */ r("div", { children: a.itemType === 0 ? /* @__PURE__ */ r(je, { onClick: a.onClick, children: a.label }) : /* @__PURE__ */ r(yn, { onClick: a.onClick, value: a.label, children: a.label }) }, a.label)) }),
      /* @__PURE__ */ r(qt, {})
    ] }, n.label)) })
  ] }) });
}
function js({ id: t, message: e }) {
=======
var Aa = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Aa || {});
function Cs({ id: t, groups: e }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ l(ee, { children: [
    /* @__PURE__ */ r(Be, { asChild: !0, children: /* @__PURE__ */ r(Pa, {}) }),
    /* @__PURE__ */ r(Yt, { children: e.map((n) => /* @__PURE__ */ l("div", { children: [
      /* @__PURE__ */ r(ne, { children: n.label }),
      /* @__PURE__ */ r(gn, { children: n.items.map((a) => /* @__PURE__ */ r("div", { children: a.itemType === 0 ? /* @__PURE__ */ r(Pe, { onClick: a.onClick, children: a.label }) : /* @__PURE__ */ r(vn, { onClick: a.onClick, value: a.label, children: a.label }) }, a.label)) }),
      /* @__PURE__ */ r(Ht, {})
    ] }, n.label)) })
  ] }) });
}
function _s({ id: t, message: e }) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ r("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function Xs({ id: t, category: e, downloads: n, languages: a, moreInfoUrl: o }) {
  const s = new Xr("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((w, c) => w + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ r(yr, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: s })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center", children: a.slice(0, 3).map((w) => /* @__PURE__ */ r(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: w.toUpperCase()
            },
            w
          )) }),
          a.length > 3 && /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => i(),
              className: "tw-text-xs tw-text-gray-500 tw-underline",
              children: [
                "+",
                a.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ d("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ d(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ r(Nr, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ d(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ r(kr, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
<<<<<<< HEAD
function La({ id: t, versionHistory: e }) {
  const [n, a] = P(!1), o = /* @__PURE__ */ new Date();
  function s(w) {
    const c = new Date(w), u = new Date(o.getTime() - c.getTime()), g = u.getUTCFullYear() - 1970, v = u.getUTCMonth(), f = u.getUTCDate() - 1;
=======
function ja({ id: t, versionHistory: e }) {
  const [n, a] = A(!1), o = /* @__PURE__ */ new Date();
  function s(w) {
    const c = new Date(w), p = new Date(o.getTime() - c.getTime()), g = p.getUTCFullYear() - 1970, v = p.getUTCMonth(), f = p.getUTCDate() - 1;
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    let m = "";
    return g > 0 ? m = `${g.toString()} year${g === 1 ? "" : "s"} ago` : v > 0 ? m = `${v.toString()} month${v === 1 ? "" : "s"} ago` : f === 0 ? m = "today" : m = `${f.toString()} day${f === 1 ? "" : "s"} ago`, m;
  }
  const i = Object.entries(e).sort((w, c) => c[0].localeCompare(w[0]));
  return /* @__PURE__ */ d("div", { id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? i : i.slice(0, 5)).map((w) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: w[1].description }) }) }),
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
        className: "tw-text-xs tw-text-gray-500 tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
<<<<<<< HEAD
function Fs({
=======
function Ts({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: a,
  versionHistory: o
}) {
<<<<<<< HEAD
  const s = et(() => Fr(n), [n]), w = ((c) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((g) => u.of(g));
=======
  const s = et(() => Pr(n), [n]), w = ((c) => {
    const p = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((g) => p.of(g));
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  })(a);
  return /* @__PURE__ */ r("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ d("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ r(La, { versionHistory: o }),
    /* @__PURE__ */ r("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ d("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ r("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ r("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
<<<<<<< HEAD
const Ya = gt(
=======
const Xa = ht(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
), Zt = p.forwardRef(
  ({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, className: l("pr-twp", Ya({ variant: e }), t), ...n })
);
Zt.displayName = "Badge";
function Ha({
=======
), Kt = u.forwardRef(
  ({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, className: d("pr-twp", Xa({ variant: e }), t), ...n })
);
Kt.displayName = "Badge";
function Fa({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
  const [v, f] = P(!1), m = U(
=======
  const [v, f] = A(!1), m = U(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    (y) => {
      var _;
      const x = (_ = t.find((S) => S.label === y)) == null ? void 0 : _.value;
      x && a(
        n.includes(x) ? n.filter((S) => S !== x) : [...n, x]
      );
    },
    [t, n, a]
  ), N = () => i || o, T = et(() => {
    if (!c) return t;
    const y = t.filter((_) => _.starred).sort((_, S) => _.label.localeCompare(S.label)), x = t.filter((_) => !_.starred).sort((_, S) => {
      const z = n.includes(_.value), $ = n.includes(S.value);
      return z && !$ ? -1 : !z && $ ? 1 : _.label.localeCompare(S.label);
    });
    return [...y, ...x];
  }, [t, n, c]);
<<<<<<< HEAD
  return /* @__PURE__ */ r("div", { className: g, children: /* @__PURE__ */ d(Ye, { open: v, onOpenChange: f, children: [
    /* @__PURE__ */ r(He, { asChild: !0, children: /* @__PURE__ */ d(
=======
  return /* @__PURE__ */ r("div", { className: g, children: /* @__PURE__ */ l($e, { open: v, onOpenChange: f, children: [
    /* @__PURE__ */ r(Le, { asChild: !0, children: /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      I,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": v,
<<<<<<< HEAD
        className: l(
=======
        className: d(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: w,
        children: [
<<<<<<< HEAD
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
=======
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: p }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            /* @__PURE__ */ r(
              "div",
              {
                className: l({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ r("div", { className: "tw-font-normal", children: N() })
              }
            )
          ] }),
          /* @__PURE__ */ r(Oe, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
<<<<<<< HEAD
    /* @__PURE__ */ r(oe, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(se, { children: [
      /* @__PURE__ */ r(ie, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ d(we, { children: [
        /* @__PURE__ */ r(le, { children: s }),
        /* @__PURE__ */ r(Ue, { children: T.map((y) => {
          const x = e ? e(y) : void 0;
          return /* @__PURE__ */ d(
            de,
=======
    /* @__PURE__ */ r(re, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ l(ae, { children: [
      /* @__PURE__ */ r(oe, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ l(se, { children: [
        /* @__PURE__ */ r(ie, { children: s }),
        /* @__PURE__ */ r(Ye, { children: T.map((y) => {
          const x = e ? e(y) : void 0;
          return /* @__PURE__ */ l(
            we,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            {
              value: y.label,
              onSelect: m,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
<<<<<<< HEAD
                  _t,
=======
                  kt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                  {
                    className: l(
                      "tw-h-4 tw-w-4",
                      n.includes(y.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
<<<<<<< HEAD
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: y.starred && /* @__PURE__ */ r(Cr, { className: "tw-h-4 tw-w-4" }) }),
=======
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: y.starred && /* @__PURE__ */ r(xr, { className: "tw-h-4 tw-w-4" }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: y.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: x })
              ]
            },
            y.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function Gs({
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
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Ha,
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
      var m;
<<<<<<< HEAD
      return /* @__PURE__ */ d(Zt, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
=======
      return /* @__PURE__ */ l(Kt, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        /* @__PURE__ */ r(
          I,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => a(n.filter((N) => N !== f)),
            children: /* @__PURE__ */ r(De, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (m = t.find((N) => N.value === f)) == null ? void 0 : m.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(Y, { children: v })
  ] });
}
function Ua({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], s = et(() => {
    const i = [];
    return t.forEach((w) => {
<<<<<<< HEAD
      i.some((c) => Be(c, w)) || i.push(w);
    }), i;
  }, [t]);
  return /* @__PURE__ */ d(ce, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(pe, { stickyHeader: !0, children: /* @__PURE__ */ d(ht, { children: [
      /* @__PURE__ */ r(Yt, { children: a }),
      /* @__PURE__ */ r(Yt, { children: o })
    ] }) }),
    /* @__PURE__ */ r(ue, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ d(
      ht,
=======
      i.some((c) => ze(c, w)) || i.push(w);
    }), i;
  }, [t]);
  return /* @__PURE__ */ l(le, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(de, { stickyHeader: !0, children: /* @__PURE__ */ l(mt, { children: [
      /* @__PURE__ */ r($t, { children: a }),
      /* @__PURE__ */ r($t, { children: o })
    ] }) }),
    /* @__PURE__ */ r(ce, { children: s.length > 0 && s.map((i) => /* @__PURE__ */ l(
      mt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
<<<<<<< HEAD
          /* @__PURE__ */ r(Dt, { children: `${M.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r(Dt, { children: i.text })
=======
          /* @__PURE__ */ r(Rt, { children: `${M.bookIdToEnglishName(i.reference.book)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ r(Rt, { children: i.text })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        ]
      },
      `${i.reference.book} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
<<<<<<< HEAD
const qe = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  _e.Root,
=======
const He = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ke.Root,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      _e.Indicator,
      {
<<<<<<< HEAD
        className: l("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" })
=======
        className: d("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(kt, { className: "tw-h-4 tw-w-4" })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      }
    )
  }
));
<<<<<<< HEAD
qe.displayName = _e.Root.displayName;
const Mn = gt(
=======
He.displayName = ke.Root.displayName;
const Vn = ht(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
), qa = p.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  gn.Root,
=======
), $a = u.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  mn.Root,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: o,
    className: l(Mn({ variant: e, size: n, className: t })),
    ...a
  }
));
<<<<<<< HEAD
qa.displayName = gn.Root.displayName;
const zn = p.createContext({
  size: "default",
  variant: "default"
}), On = p.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, s) => {
  const i = H();
  return /* @__PURE__ */ r(
    ne.Root,
=======
$a.displayName = mn.Root.displayName;
const Dn = u.createContext({
  size: "default",
  variant: "default"
}), Mn = u.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, s) => {
  const i = H();
  return /* @__PURE__ */ r(
    te.Root,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      ref: s,
      className: l("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: i,
      children: /* @__PURE__ */ r(
        Dn.Provider,
        {
          value: { variant: e, size: n },
          children: a
        }
      )
    }
  );
});
<<<<<<< HEAD
On.displayName = ne.Root.displayName;
const Kt = p.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, s) => {
  const i = p.useContext(zn);
  return /* @__PURE__ */ r(
    ne.Item,
=======
Mn.displayName = te.Root.displayName;
const qt = u.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, s) => {
  const i = u.useContext(Dn);
  return /* @__PURE__ */ r(
    te.Item,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      ref: s,
      className: l(
        Mn({
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
Kt.displayName = ne.Item.displayName;
const me = (t) => t === "asc" ? /* @__PURE__ */ r(Rr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(Er, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Dr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), $s = (t) => ({
=======
qt.displayName = te.Item.displayName;
const pe = (t) => t === "asc" ? /* @__PURE__ */ r(Cr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(_r, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Sr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Es = (t) => ({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ d(I, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    me(e.getIsSorted())
=======
    pe(e.getIsSorted())
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ] })
}), Ja = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ d(I, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    me(n.getIsSorted())
  ] })
}), Ls = (t) => ({
=======
    pe(n.getIsSorted())
  ] })
}), Vs = (t) => ({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ d(I, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    me(e.getIsSorted())
=======
    pe(e.getIsSorted())
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), xe = (t, e, n, a, o, s) => {
  let i = [...n];
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((p) => p !== c);
  }), a(i);
  let w = [...o];
  t.forEach((c) => {
    e === "unapproved" ? w.includes(c) || w.push(c) : w = w.filter((p) => p !== c);
  }), s(w);
<<<<<<< HEAD
}, Ys = (t, e, n, a, o) => ({
=======
}, Ds = (t, e, n, a, o) => ({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d(I, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    me(s.getIsSorted())
=======
    pe(s.getIsSorted())
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), w = s.getValue("item");
    return /* @__PURE__ */ d(On, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
<<<<<<< HEAD
        Kt,
=======
        qt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          onClick: (c) => {
            c.stopPropagation(), xe(
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
<<<<<<< HEAD
        Kt,
=======
        qt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          onClick: (c) => {
            c.stopPropagation(), xe(
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
<<<<<<< HEAD
        Kt,
=======
        qt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          onClick: (c) => {
            c.stopPropagation(), xe(
              [w],
              "unknown",
              e,
              n,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(Tr, {})
        }
      )
    ] });
  }
<<<<<<< HEAD
}), Hs = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Us = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, qs = (t) => {
=======
}), Ms = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), zs = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Os = (t) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Ka = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Js = Object.freeze([
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
]), Wa = (t, e, n) => {
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (a = a.filter((o) => o.items[0].includes(n))), a;
}, Za = (t, e, n) => {
  const a = [];
  return t.forEach((o) => {
    const s = a.find(
<<<<<<< HEAD
      (i) => Be(
=======
      (i) => ze(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        i.items,
        fe(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const i = {
        items: fe(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
        status: Ka(
          fe(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
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
<<<<<<< HEAD
}, pt = (t, e) => t[e] ?? e;
function Ks({
=======
}, ct = (t, e) => t[e] ?? e;
function Is({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
  const u = pt(n, "%webView_inventory_all%"), g = pt(n, "%webView_inventory_approved%"), v = pt(n, "%webView_inventory_unapproved%"), f = pt(n, "%webView_inventory_unknown%"), m = pt(n, "%webView_inventory_scope_currentBook%"), N = pt(n, "%webView_inventory_scope_chapter%"), T = pt(n, "%webView_inventory_filter_text%"), y = pt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [x, _] = P(!1), [S, z] = P("all"), [$, ft] = P(""), [lt, k] = P([]), b = et(() => t.length === 0 ? [] : Za(t, o, s), [t, o, s]), F = et(() => {
    if (x) return b;
    const D = [];
    return b.forEach((h) => {
      const V = h.items[0], C = D.find(
        (O) => O.items[0] === V
      );
      C ? (C.count += h.count, C.occurrences = C.occurrences.concat(h.occurrences)) : D.push({
        items: [V],
=======
  const p = ct(n, "%webView_inventory_all%"), g = ct(n, "%webView_inventory_approved%"), v = ct(n, "%webView_inventory_unapproved%"), f = ct(n, "%webView_inventory_unknown%"), m = ct(n, "%webView_inventory_scope_currentBook%"), N = ct(n, "%webView_inventory_scope_chapter%"), T = ct(n, "%webView_inventory_filter_text%"), y = ct(
    n,
    "%webView_inventory_show_additional_items%"
  ), [x, _] = A(!1), [S, z] = A("all"), [$, gt] = A(""), [wt, k] = A([]), b = et(() => t.length === 0 ? [] : Ua(t, o, s), [t, o, s]), F = et(() => {
    if (x) return b;
    const V = [];
    return b.forEach((h) => {
      const D = h.items[0], C = V.find(
        (O) => O.items[0] === D
      );
      C ? (C.count += h.count, C.occurrences = C.occurrences.concat(h.occurrences)) : V.push({
        items: [D],
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        count: h.count,
        occurrences: h.occurrences,
        status: h.status
      });
<<<<<<< HEAD
    }), D;
  }, [x, b]), R = et(() => Wa(F, S, $), [F, S, $]), nt = et(() => {
    var V, C;
    if (!x) return c;
    const D = (V = a == null ? void 0 : a.tableHeaders) == null ? void 0 : V.length;
    if (!D) return c;
    const h = [];
    for (let O = 0; O < D; O++)
      h.push(
        Ja(
=======
    }), V;
  }, [x, b]), R = et(() => Ha(F, S, $), [F, S, $]), nt = et(() => {
    var D, C;
    if (!x) return c;
    const V = (D = a == null ? void 0 : a.tableHeaders) == null ? void 0 : D.length;
    if (!V) return c;
    const h = [];
    for (let O = 0; O < V; O++)
      h.push(
        La(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          ((C = a == null ? void 0 : a.tableHeaders) == null ? void 0 : C[O]) || "Additional Item",
          O + 1
        )
      );
    return [...h, ...c];
  }, [a == null ? void 0 : a.tableHeaders, c, x]);
<<<<<<< HEAD
  it(() => {
    R.length === 0 ? k([]) : R.length === 1 && k(R[0].items);
  }, [R]);
  const It = (D, h) => {
    h.setRowSelection(() => {
      const V = {};
      return V[D.index] = !0, V;
    }), k(D.original.items);
  }, At = (D) => {
    if (D === "book" || D === "chapter")
      w(D);
    else
      throw new Error(`Invalid scope value: ${D}`);
  }, dt = (D) => {
    if (D === "all" || D === "approved" || D === "unapproved" || D === "unknown")
      z(D);
    else
      throw new Error(`Invalid status filter value: ${D}`);
  }, J = et(() => {
    if (F.length === 0 || lt.length === 0) return [];
    const D = F.filter((h) => Be(
      x ? h.items : [h.items[0]],
      lt
    ));
    if (D.length > 1) throw new Error("Selected item is not unique");
    return D.length === 0 ? [] : D[0].occurrences;
  }, [lt, x, F]);
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Rt,
        {
          onValueChange: (D) => dt(D),
          defaultValue: S,
          children: [
            /* @__PURE__ */ r(kt, { className: "tw-m-1", children: /* @__PURE__ */ r(Et, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(Ct, { children: [
              /* @__PURE__ */ r(rt, { value: "all", children: u }),
=======
  st(() => {
    R.length === 0 ? k([]) : R.length === 1 && k(R[0].items);
  }, [R]);
  const Ot = (V, h) => {
    h.setRowSelection(() => {
      const D = {};
      return D[V.index] = !0, D;
    }), k(V.original.items);
  }, Bt = (V) => {
    if (V === "book" || V === "chapter")
      w(V);
    else
      throw new Error(`Invalid scope value: ${V}`);
  }, lt = (V) => {
    if (V === "all" || V === "approved" || V === "unapproved" || V === "unknown")
      z(V);
    else
      throw new Error(`Invalid status filter value: ${V}`);
  }, J = et(() => {
    if (F.length === 0 || wt.length === 0) return [];
    const V = F.filter((h) => ze(
      x ? h.items : [h.items[0]],
      wt
    ));
    if (V.length > 1) throw new Error("Selected item is not unique");
    return V.length === 0 ? [] : V[0].occurrences;
  }, [wt, x, F]);
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ l("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ l(
        St,
        {
          onValueChange: (V) => lt(V),
          defaultValue: S,
          children: [
            /* @__PURE__ */ r(yt, { className: "tw-m-1", children: /* @__PURE__ */ r(Tt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ l(Nt, { children: [
              /* @__PURE__ */ r(rt, { value: "all", children: p }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
              /* @__PURE__ */ r(rt, { value: "approved", children: g }),
              /* @__PURE__ */ r(rt, { value: "unapproved", children: v }),
              /* @__PURE__ */ r(rt, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
<<<<<<< HEAD
      /* @__PURE__ */ d(Rt, { onValueChange: (D) => At(D), defaultValue: i, children: [
        /* @__PURE__ */ r(kt, { className: "tw-m-1", children: /* @__PURE__ */ r(Et, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(Ct, { children: [
=======
      /* @__PURE__ */ l(St, { onValueChange: (V) => Bt(V), defaultValue: i, children: [
        /* @__PURE__ */ r(yt, { className: "tw-m-1", children: /* @__PURE__ */ r(Tt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ l(Nt, { children: [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          /* @__PURE__ */ r(rt, { value: "book", children: m }),
          /* @__PURE__ */ r(rt, { value: "chapter", children: N })
        ] })
      ] }),
      /* @__PURE__ */ r(
<<<<<<< HEAD
        Ot,
=======
        Mt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: T,
          value: $,
<<<<<<< HEAD
          onChange: (D) => {
            ft(D.target.value);
=======
          onChange: (V) => {
            gt(V.target.value);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          }
        }
      ),
      a && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          qe,
          {
            className: "tw-m-1",
            checked: x,
<<<<<<< HEAD
            onCheckedChange: (D) => {
              _(D);
=======
            onCheckedChange: (V) => {
              _(V);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            }
          }
        ),
        /* @__PURE__ */ r(Y, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? y })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Fa,
      {
        columns: nt,
        data: R,
<<<<<<< HEAD
        onRowClickHandler: It,
=======
        onRowClickHandler: Ot,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        stickyHeader: !0
      }
    ) }),
    J.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
<<<<<<< HEAD
      Ua,
=======
      Ga,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        occurrenceData: J,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
<<<<<<< HEAD
const Je = p.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  fn.Root,
=======
const Ue = u.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  hn.Root,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
Je.displayName = fn.Root.displayName;
function on({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
<<<<<<< HEAD
const Ke = Ht.Provider, We = Ht.Root, Ze = Ht.Trigger, he = p.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  Ht.Content,
=======
const qe = Lt.Provider, Je = Lt.Root, Ke = Lt.Trigger, ue = u.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  Lt.Content,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
he.displayName = Ht.Content.displayName;
const Qa = "16rem", to = "3rem", Bn = p.createContext(void 0);
function ge() {
  const t = p.useContext(Bn);
=======
ue.displayName = Lt.Content.displayName;
const qa = "16rem", Ja = "3rem", zn = u.createContext(void 0);
function me() {
  const t = u.useContext(zn);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
<<<<<<< HEAD
const In = p.forwardRef(
=======
const On = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
    const [u, g] = p.useState(t), v = e ?? u, f = p.useCallback(
=======
    const [p, g] = u.useState(t), v = e ?? p, f = u.useCallback(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      (S) => {
        const z = typeof S == "function" ? S(v) : S;
        n ? n(z) : g(z);
      },
      [n, v]
<<<<<<< HEAD
    ), m = p.useCallback(() => f((S) => !S), [f]), N = v ? "expanded" : "collapsed", x = H() === "ltr" ? i : i === "primary" ? "secondary" : "primary", _ = p.useMemo(
=======
    ), m = u.useCallback(() => f((S) => !S), [f]), N = v ? "expanded" : "collapsed", x = H() === "ltr" ? i : i === "primary" ? "secondary" : "primary", _ = u.useMemo(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      () => ({
        state: N,
        open: v,
        setOpen: f,
        toggleSidebar: m,
        side: x
      }),
      [N, v, f, m, x]
    );
<<<<<<< HEAD
    return /* @__PURE__ */ r(Bn.Provider, { value: _, children: /* @__PURE__ */ r(Ke, { delayDuration: 0, children: /* @__PURE__ */ r(
=======
    return /* @__PURE__ */ r(zn.Provider, { value: _, children: /* @__PURE__ */ r(qe, { delayDuration: 0, children: /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
        className: l(
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
<<<<<<< HEAD
In.displayName = "SidebarProvider";
const An = p.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, s) => {
  const i = ge();
=======
On.displayName = "SidebarProvider";
const Bn = u.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, s) => {
  const i = me();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
An.displayName = "Sidebar";
const eo = p.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = ge();
  return /* @__PURE__ */ d(
=======
Bn.displayName = "Sidebar";
const Ka = u.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = me();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    I,
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
<<<<<<< HEAD
        o.side === "primary" ? /* @__PURE__ */ r(Vr, {}) : /* @__PURE__ */ r(Mr, {}),
=======
        o.side === "primary" ? /* @__PURE__ */ r(Tr, {}) : /* @__PURE__ */ r(Rr, {}),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
<<<<<<< HEAD
eo.displayName = "SidebarTrigger";
const no = p.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: a } = ge();
=======
Ka.displayName = "SidebarTrigger";
const Wa = u.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: a } = me();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
no.displayName = "SidebarRail";
const Pn = p.forwardRef(
=======
Wa.displayName = "SidebarRail";
const In = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Pn.displayName = "SidebarInset";
const ro = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ot,
=======
In.displayName = "SidebarInset";
const Za = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Mt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
ro.displayName = "SidebarInput";
const ao = p.forwardRef(
=======
Za.displayName = "SidebarInput";
const Qa = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
ao.displayName = "SidebarHeader";
const oo = p.forwardRef(
=======
Qa.displayName = "SidebarHeader";
const to = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
oo.displayName = "SidebarFooter";
const so = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Je,
=======
to.displayName = "SidebarFooter";
const eo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ue,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    "data-sidebar": "separator",
    className: l("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
<<<<<<< HEAD
so.displayName = "SidebarSeparator";
const jn = p.forwardRef(
=======
eo.displayName = "SidebarSeparator";
const Pn = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
jn.displayName = "SidebarContent";
const Re = p.forwardRef(
=======
Pn.displayName = "SidebarContent";
const Se = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Re.displayName = "SidebarGroup";
const Ee = p.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Mt : "div",
=======
Se.displayName = "SidebarGroup";
const Te = u.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Vt : "div",
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Ee.displayName = "SidebarGroupLabel";
const io = p.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Mt : "button",
=======
Te.displayName = "SidebarGroupLabel";
const no = u.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Vt : "button",
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
io.displayName = "SidebarGroupAction";
const De = p.forwardRef(
=======
no.displayName = "SidebarGroupAction";
const Re = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
De.displayName = "SidebarGroupContent";
const Xn = p.forwardRef(
=======
Re.displayName = "SidebarGroupContent";
const An = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Xn.displayName = "SidebarMenu";
const Fn = p.forwardRef(
=======
An.displayName = "SidebarMenu";
const jn = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Fn.displayName = "SidebarMenuItem";
const wo = gt(
=======
jn.displayName = "SidebarMenuItem";
const ro = ht(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
), Gn = p.forwardRef(
=======
), Xn = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: a = "default",
    tooltip: o,
    className: s,
    ...i
  }, w) => {
<<<<<<< HEAD
    const c = t ? Mt : "button", { state: u } = ge(), g = /* @__PURE__ */ r(
=======
    const c = t ? Vt : "button", { state: p } = me(), g = /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      c,
      {
        ref: w,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: l(wo({ variant: n, size: a }), s),
        ...i
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
<<<<<<< HEAD
    }), /* @__PURE__ */ d(We, { children: [
      /* @__PURE__ */ r(Ze, { asChild: !0, children: g }),
      /* @__PURE__ */ r(he, { side: "right", align: "center", hidden: u !== "collapsed", ...o })
    ] })) : g;
  }
);
Gn.displayName = "SidebarMenuButton";
const lo = p.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
  e ? Mt : "button",
=======
    }), /* @__PURE__ */ l(Je, { children: [
      /* @__PURE__ */ r(Ke, { asChild: !0, children: g }),
      /* @__PURE__ */ r(ue, { side: "right", align: "center", hidden: p !== "collapsed", ...o })
    ] })) : g;
  }
);
Xn.displayName = "SidebarMenuButton";
const ao = u.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
  e ? Vt : "button",
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
lo.displayName = "SidebarMenuAction";
const co = p.forwardRef(
=======
ao.displayName = "SidebarMenuAction";
const oo = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
co.displayName = "SidebarMenuBadge";
const po = p.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
  const o = p.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
=======
oo.displayName = "SidebarMenuBadge";
const so = u.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
  const o = u.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: l("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(on, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          on,
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
po.displayName = "SidebarMenuSkeleton";
const uo = p.forwardRef(
=======
so.displayName = "SidebarMenuSkeleton";
const io = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
uo.displayName = "SidebarMenuSub";
const mo = p.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
mo.displayName = "SidebarMenuSubItem";
const ho = p.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: a, ...o }, s) => /* @__PURE__ */ r(
  t ? Mt : "a",
=======
io.displayName = "SidebarMenuSub";
const wo = u.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
wo.displayName = "SidebarMenuSubItem";
const lo = u.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: a, ...o }, s) => /* @__PURE__ */ r(
  t ? Vt : "a",
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
ho.displayName = "SidebarMenuSubButton";
function go({
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
  const p = U(
    (f, m) => {
      a(f, m);
    },
    [a]
  ), g = U(
    (f) => {
      const m = n.find((N) => N.projectId === f);
      return m ? m.projectName : f;
    },
    [n]
  ), v = U(
    (f) => !o.projectId && f === o.label,
    [o]
  );
  return /* @__PURE__ */ r(
<<<<<<< HEAD
    An,
=======
    Bn,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      id: t,
      collapsible: "none",
      variant: "inset",
<<<<<<< HEAD
      className: l("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(jn, { children: [
        /* @__PURE__ */ d(Re, { children: [
          /* @__PURE__ */ r(Ee, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(De, { children: /* @__PURE__ */ r(Xn, { children: Object.entries(e).map(([f, m]) => /* @__PURE__ */ r(Fn, { children: /* @__PURE__ */ r(
            Gn,
            {
              onClick: () => u(f),
=======
      className: d("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ l(Pn, { children: [
        /* @__PURE__ */ l(Se, { children: [
          /* @__PURE__ */ r(Te, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(Re, { children: /* @__PURE__ */ r(An, { children: Object.entries(e).map(([f, m]) => /* @__PURE__ */ r(jn, { children: /* @__PURE__ */ r(
            Xn,
            {
              onClick: () => p(f),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
              isActive: v(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: m })
            }
          ) }, f)) }) })
        ] }),
<<<<<<< HEAD
        /* @__PURE__ */ d(Re, { children: [
          /* @__PURE__ */ r(Ee, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(De, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            Te,
=======
        /* @__PURE__ */ l(Se, { children: [
          /* @__PURE__ */ r(Te, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(Re, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            _e,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            {
              buttonVariant: "ghost",
              buttonClassName: l("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: (f) => g(f),
              buttonPlaceholder: w,
              onChange: (f) => {
                const m = g(f);
                p(m, f);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(zr, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
function $n({
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: a,
  className: o,
  isDisabled: s = !1
}) {
  const i = H();
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { className: l("tw-relative", { "tw-w-full": a }, o), children: [
=======
  return /* @__PURE__ */ l("div", { className: d("tw-relative", { "tw-w-full": a }, o), children: [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    /* @__PURE__ */ r(
      cn,
      {
        className: l(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": i === "rtl" },
          { "tw-left-3": i === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      Ot,
=======
      Mt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: n,
        value: t,
        onChange: (w) => e(w.target.value),
        disabled: s
      }
    ),
    t && /* @__PURE__ */ d(
      I,
      {
        variant: "ghost",
        size: "icon",
        className: l(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": i === "rtl" },
          { "tw-right-0": i === "ltr" }
        ),
        onClick: () => {
          e("");
        },
        children: [
          /* @__PURE__ */ r(De, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
<<<<<<< HEAD
function Ws({
=======
function Ps({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      $n,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: w,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
<<<<<<< HEAD
    /* @__PURE__ */ d(
      In,
=======
    /* @__PURE__ */ l(
      On,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            go,
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
          /* @__PURE__ */ r(Pn, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
<<<<<<< HEAD
const ut = "scrBook", fo = "scrRef", xt = "source", bo = "details", vo = "Scripture Reference", xo = "Scripture Book", Ln = "Type", yo = "Details";
function No(t, e) {
=======
const pt = "scrBook", po = "scrRef", vt = "source", uo = "details", mo = "Scripture Reference", ho = "Scripture Book", Gn = "Type", go = "Details";
function fo(t, e) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  const n = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
<<<<<<< HEAD
      id: ut,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? vo,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? M.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === ut ? Tt(o.start) : void 0;
      },
      getGroupingValue: (a) => M.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => Ce(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => Tt(a.start),
      id: fo,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : Tt(o.start);
=======
      id: pt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? mo,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? M.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === pt ? _t(o.start) : void 0;
      },
      getGroupingValue: (a) => M.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => Ne(a.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => _t(a.start),
      id: po,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : _t(o.start);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      },
      sortingFn: (a, o) => Ce(a.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
<<<<<<< HEAD
      id: xt,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Ln : void 0,
=======
      id: vt,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Gn : void 0,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      cell: (a) => n || a.row.getIsGrouped() ? a.getValue() : void 0,
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
  let n = 0;
<<<<<<< HEAD
  return t.end && ({ offset: n } = t.end), !t.end || Ce(t.start, t.end) === 0 ? `${be(t.start)}+${e}` : `${be(t.start)}+${e}-${be(t.end)}+${n}`;
}, sn = (t) => `${ko({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Zs({
=======
  return t.end && ({ offset: n } = t.end), !t.end || Ne(t.start, t.end) === 0 ? `${ge(t.start)}+${e}` : `${ge(t.start)}+${e}-${ge(t.end)}+${n}`;
}, an = (t) => `${bo({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function As({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: w
}) {
<<<<<<< HEAD
  const [c, u] = P([]), [g, v] = P([{ id: ut, desc: !1 }]), [f, m] = P({}), N = et(
=======
  const [c, p] = A([]), [g, v] = A([{ id: pt, desc: !1 }]), [f, m] = A({}), N = et(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    () => t.flatMap((k) => k.data.map((b) => ({
      ...b,
      source: k.source
    }))),
    [t]
  ), T = et(
<<<<<<< HEAD
    () => No(
=======
    () => fo(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        scriptureReferenceColumnName: a,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [a, s, i, n]
  );
<<<<<<< HEAD
  it(() => {
    c.includes(xt) ? v([
      { id: xt, desc: !1 },
      { id: ut, desc: !1 }
    ]) : v([{ id: ut, desc: !1 }]);
  }, [c]);
  const y = un({
=======
  st(() => {
    c.includes(vt) ? v([
      { id: vt, desc: !1 },
      { id: pt, desc: !1 }
    ]) : v([{ id: pt, desc: !1 }]);
  }, [c]);
  const y = cn({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    data: N,
    columns: T,
    state: {
      grouping: c,
      sorting: g,
      rowSelection: f
    },
<<<<<<< HEAD
    onGroupingChange: u,
=======
    onGroupingChange: p,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    onSortingChange: v,
    onRowSelectionChange: m,
    getExpandedRowModel: Yr(),
    getGroupedRowModel: Lr(),
    getCoreRowModel: hn(),
    getSortedRowModel: mn(),
    getRowId: sn,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  it(() => {
    if (w) {
      const k = y.getSelectedRowModel().rowsById, b = Object.keys(k);
      if (b.length === 1) {
<<<<<<< HEAD
        const F = N.find((R) => sn(R) === b[0]) || void 0;
=======
        const F = N.find((R) => an(R) === b[0]) || void 0;
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        F && w(F);
      }
    }
  }, [f, N, w, y]);
<<<<<<< HEAD
  const x = o ?? xo, _ = s ?? Ln, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${x}`, value: [ut] },
    { label: `Group by ${_}`, value: [xt] },
    {
      label: `Group by ${x} and ${_}`,
      value: [ut, xt]
    },
    {
      label: `Group by ${_} and ${x}`,
      value: [xt, ut]
    }
  ], z = (k) => {
    u(JSON.parse(k));
  }, $ = (k, b) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(b);
  }, ft = (k, b) => k.getIsGrouped() ? "" : l("banded-row", b % 2 === 0 ? "even" : "odd"), lt = (k, b, F) => {
=======
  const x = o ?? ho, _ = s ?? Gn, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${x}`, value: [pt] },
    { label: `Group by ${_}`, value: [vt] },
    {
      label: `Group by ${x} and ${_}`,
      value: [pt, vt]
    },
    {
      label: `Group by ${_} and ${x}`,
      value: [vt, pt]
    }
  ], z = (k) => {
    p(JSON.parse(k));
  }, $ = (k, b) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(b);
  }, gt = (k, b) => k.getIsGrouped() ? "" : d("banded-row", b % 2 === 0 ? "even" : "odd"), wt = (k, b, F) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    if (!((k == null ? void 0 : k.length) === 0 || b.depth < F.column.getGroupedIndex())) {
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
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ d(
      Rt,
=======
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ l(
      St,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        value: JSON.stringify(c),
        onValueChange: (k) => {
          z(k);
        },
        children: [
<<<<<<< HEAD
          /* @__PURE__ */ r(kt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Et, {}) }),
          /* @__PURE__ */ r(Ct, { position: "item-aligned", children: /* @__PURE__ */ r(Oa, { children: S.map((k) => /* @__PURE__ */ r(rt, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(ce, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(pe, { children: y.getHeaderGroups().map((k) => /* @__PURE__ */ r(ht, { children: k.headers.filter((b) => b.column.columnDef.header).map((b) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(Yt, { colSpan: b.colSpan, className: "top-0 tw-sticky", children: b.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
=======
          /* @__PURE__ */ r(yt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Tt, {}) }),
          /* @__PURE__ */ r(Nt, { position: "item-aligned", children: /* @__PURE__ */ r(Ea, { children: S.map((k) => /* @__PURE__ */ r(rt, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ l(le, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(de, { children: y.getHeaderGroups().map((k) => /* @__PURE__ */ r(mt, { children: k.headers.filter((b) => b.column.columnDef.header).map((b) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r($t, { colSpan: b.colSpan, className: "top-0 tw-sticky", children: b.isPlaceholder ? void 0 : /* @__PURE__ */ l("div", { children: [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          b.column.getCanGroup() ? /* @__PURE__ */ r(
            I,
            {
              variant: "ghost",
              title: `Toggle grouping by ${b.column.columnDef.header}`,
              onClick: b.column.getToggleGroupingHandler(),
              type: "button",
              children: b.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
<<<<<<< HEAD
          Gt(b.column.columnDef.header, b.getContext())
        ] }) }, b.id)
      )) }, k.id)) }),
      /* @__PURE__ */ r(ue, { children: y.getRowModel().rows.map((k, b) => {
        const F = H();
        return /* @__PURE__ */ r(
          ht,
          {
            "data-state": k.getIsSelected() ? "selected" : "",
            className: l(ft(k, b)),
            onClick: (R) => $(k, R),
            children: k.getVisibleCells().map((R) => {
              if (!(R.getIsPlaceholder() || R.column.columnDef.enableGrouping && !R.getIsGrouped() && (R.column.columnDef.id !== xt || !n)))
                return /* @__PURE__ */ r(
                  Dt,
                  {
                    className: l(
                      R.column.columnDef.id,
                      "tw-p-[1px]",
                      lt(c, k, R)
                    ),
                    children: R.getIsGrouped() ? /* @__PURE__ */ d(
=======
          Xt(b.column.columnDef.header, b.getContext())
        ] }) }, b.id)
      )) }, k.id)) }),
      /* @__PURE__ */ r(ce, { children: y.getRowModel().rows.map((k, b) => {
        const F = H();
        return /* @__PURE__ */ r(
          mt,
          {
            "data-state": k.getIsSelected() ? "selected" : "",
            className: d(gt(k, b)),
            onClick: (R) => $(k, R),
            children: k.getVisibleCells().map((R) => {
              if (!(R.getIsPlaceholder() || R.column.columnDef.enableGrouping && !R.getIsGrouped() && (R.column.columnDef.id !== vt || !n)))
                return /* @__PURE__ */ r(
                  Rt,
                  {
                    className: d(
                      R.column.columnDef.id,
                      "tw-p-[1px]",
                      wt(c, k, R)
                    ),
                    children: R.getIsGrouped() ? /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                      I,
                      {
                        variant: "link",
                        onClick: k.getToggleExpandedHandler(),
                        type: "button",
                        children: [
<<<<<<< HEAD
                          k.getIsExpanded() && /* @__PURE__ */ r(ee, {}),
                          !k.getIsExpanded() && (F === "ltr" ? /* @__PURE__ */ r(Ve, {}) : /* @__PURE__ */ r(Or, {})),
                          " ",
                          Gt(R.column.columnDef.cell, R.getContext()),
=======
                          k.getIsExpanded() && /* @__PURE__ */ r(Qt, {}),
                          !k.getIsExpanded() && (F === "ltr" ? /* @__PURE__ */ r(Ee, {}) : /* @__PURE__ */ r(Vr, {})),
                          " ",
                          Xt(R.column.columnDef.cell, R.getContext()),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                          " (",
                          k.subRows.length,
                          ")"
                        ]
                      }
<<<<<<< HEAD
                    ) : Gt(R.column.columnDef.cell, R.getContext())
=======
                    ) : Xt(R.column.columnDef.cell, R.getContext())
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                  },
                  R.id
                );
            })
          },
          k.id
        );
      }) })
    ] })
  ] });
}
<<<<<<< HEAD
var mt = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(mt || {});
const Co = (t, e, n, a, o) => {
=======
var ut = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(ut || {});
const vo = (t, e, n, a, o) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
}, _o = (t, e, n, a, o) => {
=======
}, xo = (t, e, n, a, o) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
}, St = (t) => {
=======
}, Ct = (t) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  if (M.isBookOT(t)) return "OT";
  if (M.isBookNT(t)) return "NT";
  if (M.isBookDC(t)) return "DC";
  if (M.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, Qe = (t, e) => t.filter((n) => {
  try {
<<<<<<< HEAD
    return St(n) === e;
  } catch {
    return !1;
  }
}), Yn = (t, e, n) => Qe(t, e).every((a) => n.includes(a));
function So({
=======
    return Ct(n) === e;
  } catch {
    return !1;
  }
}), $n = (t, e, n) => We(t, e).every((a) => n.includes(a));
function yo({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  bookId: t,
  selectedBookIds: e,
  toggleBook: n,
  lastKeyEventShiftKey: a,
  localizedBookNames: o
}) {
  var w, c;
  const s = q(!1), i = q();
<<<<<<< HEAD
  return /* @__PURE__ */ d(
    de,
=======
  return /* @__PURE__ */ l(
    we,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      value: t,
      className: "tw-flex tw-items-center",
      onSelect: () => {
        s.current || (n(t, a.current), a.current = !1), i.current && clearTimeout(i.current), i.current = setTimeout(() => {
          s.current = !1;
        }, 100);
      },
<<<<<<< HEAD
      onMouseDown: (u) => {
        u.preventDefault(), s.current = !0, n(t, u.shiftKey);
=======
      onMouseDown: (p) => {
        p.preventDefault(), s.current = !0, n(t, p.shiftKey);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      },
      role: "option",
      "aria-selected": e.includes(t),
      "aria-label": `${M.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
      children: [
        /* @__PURE__ */ r(
<<<<<<< HEAD
          _t,
=======
          kt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
                "tw-border-s-red-200": St(t) === mt.OT,
                "tw-border-s-purple-200": St(t) === mt.NT,
                "tw-border-s-indigo-200": St(t) === mt.DC,
                "tw-border-s-yellow-200": St(t) === mt.Extra
=======
                "tw-border-s-red-200": Ct(t) === ut.OT,
                "tw-border-s-purple-200": Ct(t) === ut.NT,
                "tw-border-s-indigo-200": Ct(t) === ut.DC,
                "tw-border-s-yellow-200": Ct(t) === ut.Extra
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
function To({
=======
function No({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: a,
  localizedStrings: o
}) {
<<<<<<< HEAD
  const s = Qe(e, t).length === 0, i = o["%scripture_section_ot_short%"], w = o["%scripture_section_nt_short%"], c = o["%scripture_section_dc_short%"], u = o["%scripture_section_extra_short%"];
=======
  const s = We(e, t).length === 0, i = o["%scripture_section_ot_short%"], w = o["%scripture_section_nt_short%"], c = o["%scripture_section_dc_short%"], p = o["%scripture_section_extra_short%"];
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    I,
    {
      variant: "outline",
      size: "sm",
      onClick: () => a(t),
<<<<<<< HEAD
      className: l(
        Yn(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90"
      ),
      disabled: s,
      children: _o(
=======
      className: d(
        $n(e, t, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90"
      ),
      disabled: s,
      children: xo(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        t,
        i,
        w,
        c,
<<<<<<< HEAD
        u
=======
        p
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      )
    }
  );
}
<<<<<<< HEAD
const wn = 5, ye = 6;
function Ro({
=======
const on = 5, ve = 6;
function ko({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: a,
  localizedBookNames: o
}) {
<<<<<<< HEAD
  const s = a["%webView_book_selector_books_selected%"], i = a["%webView_book_selector_select_books%"], w = a["%webView_book_selector_search_books%"], c = a["%webView_book_selector_select_all%"], u = a["%webView_book_selector_clear_all%"], g = a["%webView_book_selector_no_book_found%"], v = a["%webView_book_selector_more%"], f = a["%scripture_section_ot_long%"], m = a["%scripture_section_nt_long%"], N = a["%scripture_section_dc_long%"], T = a["%scripture_section_extra_long%"], [y, x] = P(!1), _ = q(void 0), S = q(!1);
=======
  const s = a["%webView_book_selector_books_selected%"], i = a["%webView_book_selector_select_books%"], w = a["%webView_book_selector_search_books%"], c = a["%webView_book_selector_select_all%"], p = a["%webView_book_selector_clear_all%"], g = a["%webView_book_selector_no_book_found%"], v = a["%webView_book_selector_more%"], f = a["%scripture_section_ot_long%"], m = a["%scripture_section_nt_long%"], N = a["%scripture_section_dc_long%"], T = a["%scripture_section_extra_long%"], [y, x] = A(!1), _ = q(void 0), S = q(!1);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  if (t.length !== M.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const z = et(() => M.allBookIds.filter(
    (b, F) => t[F] === "1" && !M.isObsolete(M.bookIdToNumber(b))
  ), [t]), $ = U(
    (b, F = !1) => {
      if (!F || !_.current) {
        n(
          e.includes(b) ? e.filter((J) => J !== b) : [...e, b]
        ), _.current = b;
        return;
      }
      const R = z.findIndex((J) => J === _.current), nt = z.findIndex((J) => J === b);
      if (R === -1 || nt === -1) return;
<<<<<<< HEAD
      const [It, At] = [
        Math.min(R, nt),
        Math.max(R, nt)
      ], dt = z.slice(It, At + 1).map((J) => J);
      n(
        e.includes(b) ? e.filter((J) => !dt.includes(J)) : [.../* @__PURE__ */ new Set([...e, ...dt])]
      );
    },
    [e, n, z]
  ), ft = U(
    (b) => {
      const F = Qe(z, b).map((R) => R);
      n(
        Yn(z, b, e) ? e.filter((R) => !F.includes(R)) : [.../* @__PURE__ */ new Set([...e, ...F])]
      );
    },
    [e, n, z]
  ), lt = () => {
=======
      const [Ot, Bt] = [
        Math.min(R, nt),
        Math.max(R, nt)
      ], lt = z.slice(Ot, Bt + 1).map((J) => J);
      n(
        e.includes(b) ? e.filter((J) => !lt.includes(J)) : [.../* @__PURE__ */ new Set([...e, ...lt])]
      );
    },
    [e, n, z]
  ), gt = U(
    (b) => {
      const F = We(z, b).map((R) => R);
      n(
        $n(z, b, e) ? e.filter((R) => !F.includes(R)) : [.../* @__PURE__ */ new Set([...e, ...F])]
      );
    },
    [e, n, z]
  ), wt = () => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    n(z.map((b) => b));
  }, k = () => {
    n([]);
  };
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(mt).map((b) => /* @__PURE__ */ r(
      To,
=======
  return /* @__PURE__ */ l("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(ut).map((b) => /* @__PURE__ */ r(
      No,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        section: b,
        availableBookIds: z,
        selectedBookIds: e,
<<<<<<< HEAD
        onToggle: ft,
=======
        onToggle: gt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        localizedStrings: a
      },
      b
    )) }),
<<<<<<< HEAD
    /* @__PURE__ */ d(Ye, { open: y, onOpenChange: x, children: [
      /* @__PURE__ */ r(He, { asChild: !0, children: /* @__PURE__ */ d(
=======
    /* @__PURE__ */ l($e, { open: y, onOpenChange: x, children: [
      /* @__PURE__ */ r(Le, { asChild: !0, children: /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        I,
        {
          variant: "outline",
          role: "combobox",
          "aria-expanded": y,
          className: "tw-max-w-64 tw-justify-between",
          children: [
            e.length > 0 ? `${s}: ${e.length}` : i,
<<<<<<< HEAD
            /* @__PURE__ */ r(Oe, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ r(oe, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
        se,
=======
            /* @__PURE__ */ r(Me, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
          ]
        }
      ) }),
      /* @__PURE__ */ r(re, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ l(
        ae,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          onKeyDown: (b) => {
            b.key === "Enter" && (S.current = b.shiftKey);
          },
          children: [
<<<<<<< HEAD
            /* @__PURE__ */ r(ie, { placeholder: w }),
            /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: lt, children: c }),
              /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: k, children: u })
            ] }),
            /* @__PURE__ */ d(we, { children: [
              /* @__PURE__ */ r(le, { children: g }),
              Object.values(mt).map((b, F) => {
                const R = z.filter(
                  (nt) => St(nt) === b
                );
                if (R.length !== 0)
                  return /* @__PURE__ */ d(dn, { children: [
                    /* @__PURE__ */ d(
                      Ue,
                      {
                        heading: Co(
=======
            /* @__PURE__ */ r(oe, { placeholder: w }),
            /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
              /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: wt, children: c }),
              /* @__PURE__ */ r(I, { variant: "ghost", size: "sm", onClick: k, children: p })
            ] }),
            /* @__PURE__ */ l(se, { children: [
              /* @__PURE__ */ r(ie, { children: g }),
              Object.values(ut).map((b, F) => {
                const R = z.filter(
                  (nt) => Ct(nt) === b
                );
                if (R.length !== 0)
                  return /* @__PURE__ */ l(wn, { children: [
                    /* @__PURE__ */ l(
                      Ye,
                      {
                        heading: vo(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                          b,
                          f,
                          m,
                          N,
                          T
                        ),
                        children: [
                          ",",
                          R.map((nt) => /* @__PURE__ */ r(
<<<<<<< HEAD
                            So,
=======
                            yo,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                            {
                              bookId: nt,
                              selectedBookIds: e,
                              toggleBook: $,
                              lastKeyEventShiftKey: S,
                              localizedBookNames: o
                            },
                            nt
                          ))
                        ]
                      }
                    ),
<<<<<<< HEAD
                    F < Object.values(mt).length - 1 && /* @__PURE__ */ r(En, {})
=======
                    F < Object.values(ut).length - 1 && /* @__PURE__ */ r(Tn, {})
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
                  ] }, b);
              })
            ] })
          ]
        }
      ) })
    ] }),
    e.length > 0 && /* @__PURE__ */ d("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
<<<<<<< HEAD
        e.length === ye ? ye : wn
      ).map((b) => /* @__PURE__ */ r(Zt, { variant: "secondary", children: M.bookIdToEnglishName(b) || b }, b)),
      e.length > ye && /* @__PURE__ */ r(Zt, { variant: "secondary", children: `+${e.length - wn} ${v}` })
    ] })
  ] });
}
const Qs = Object.freeze([
=======
        e.length === ve ? ve : on
      ).map((b) => /* @__PURE__ */ r(Kt, { variant: "secondary", children: M.bookIdToEnglishName(b) || b }, b)),
      e.length > ve && /* @__PURE__ */ r(Kt, { variant: "secondary", children: `+${e.length - on} ${v}` })
    ] })
  ] });
}
const js = Object.freeze([
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
]), bt = (t, e) => t[e] ?? e;
function ti({
=======
]), ft = (t, e) => t[e] ?? e;
function Xs({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: a,
  selectedBookIds: o,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: w
}) {
<<<<<<< HEAD
  const c = bt(
    i,
    "%webView_scope_selector_selected_text%"
  ), u = bt(
    i,
    "%webView_scope_selector_current_verse%"
  ), g = bt(
    i,
    "%webView_scope_selector_current_chapter%"
  ), v = bt(i, "%webView_scope_selector_current_book%"), f = bt(i, "%webView_scope_selector_choose_books%"), m = bt(i, "%webView_scope_selector_scope%"), N = bt(i, "%webView_scope_selector_select_books%"), T = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: u, id: "scope-verse" },
=======
  const c = ft(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = ft(
    i,
    "%webView_scope_selector_current_verse%"
  ), g = ft(
    i,
    "%webView_scope_selector_current_chapter%"
  ), v = ft(i, "%webView_scope_selector_current_book%"), f = ft(i, "%webView_scope_selector_choose_books%"), m = ft(i, "%webView_scope_selector_scope%"), N = ft(i, "%webView_scope_selector_select_books%"), T = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    { value: "chapter", label: g, id: "scope-chapter" },
    { value: "book", label: v, id: "scope-book" },
    { value: "selectedBooks", label: f, id: "scope-selected" }
  ], y = e ? T.filter((x) => e.includes(x.value)) : T;
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
=======
  return /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      /* @__PURE__ */ r(Y, { children: m }),
      /* @__PURE__ */ r(
        Le,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
<<<<<<< HEAD
          children: y.map(({ value: x, label: _, id: S }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Wt, { className: "tw-me-2", value: x, id: S }),
=======
          children: y.map(({ value: x, label: _, id: S }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Jt, { className: "tw-me-2", value: x, id: S }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            /* @__PURE__ */ r(Y, { htmlFor: S, children: _ })
          ] }, S))
        }
      )
    ] }),
<<<<<<< HEAD
    t === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Y, { children: N }),
      /* @__PURE__ */ r(
        Ro,
=======
    t === "selectedBooks" && /* @__PURE__ */ l("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(Y, { children: N }),
      /* @__PURE__ */ r(
        ko,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
const Ne = {
  [A("undefined")]: "Ø",
  [A(0)]: "A",
  [A(1)]: "B",
  [A(2)]: "C",
  [A(3)]: "D",
  [A(4)]: "E",
  [A(5)]: "F",
  [A(6)]: "G",
  [A(7)]: "H",
  [A(8)]: "I",
  [A(9)]: "J",
  [A(10)]: "K",
  [A(11)]: "L",
  [A(12)]: "M",
  [A(13)]: "N",
  [A(14)]: "O",
  [A(15)]: "P",
  [A(16)]: "Q",
  [A(17)]: "R",
  [A(18)]: "S",
  [A(19)]: "T",
  [A(20)]: "U",
  [A(21)]: "V",
  [A(22)]: "W",
  [A(23)]: "X",
  [A(24)]: "Y",
  [A(25)]: "Z"
};
<<<<<<< HEAD
function ei({
=======
function Fs({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: a = {},
  size: o,
  className: s
}) {
  const i = {
    ...Ne,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([c, p]) => [
          c,
<<<<<<< HEAD
          c === u && c in Ne ? Ne[c] : u
=======
          c === p && c in xe ? xe[c] : p
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        ]
      )
    )
  }, w = H();
<<<<<<< HEAD
  return /* @__PURE__ */ d(
    Rt,
=======
  return /* @__PURE__ */ l(
    St,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r(kt, { size: o, className: l("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Et,
=======
        /* @__PURE__ */ r(yt, { size: o, className: d("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          Tt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          {
            placeholder: i[A(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
<<<<<<< HEAD
          Ct,
=======
          Nt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
          {
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ r(rt, { value: `${c}`, children: i[A(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
<<<<<<< HEAD
function ni({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function ri({
=======
function Gs({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function $s({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
function ai({
=======
function Ls({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(Je, {}) : ""
  ] });
}
function Hn(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : n[0];
}
<<<<<<< HEAD
function Qt({ icon: t, menuLabel: e, leading: n }) {
=======
function Wt({ icon: t, menuLabel: e, leading: n }) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: l("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Un = (t, e, n, a) => n ? Object.entries(t).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => e.filter((w) => w.group === s).sort((w, c) => w.order - c.order).map((w) => /* @__PURE__ */ d(We, { children: [
  /* @__PURE__ */ r(Ze, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
    Pe,
    {
      onClick: () => {
        a(w);
      },
      children: [
<<<<<<< HEAD
        w.iconPathBefore && /* @__PURE__ */ r(Qt, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(Qt, { icon: w.iconPathAfter, menuLabel: w.label })
=======
        w.iconPathBefore && /* @__PURE__ */ r(Wt, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
        w.label,
        w.iconPathAfter && /* @__PURE__ */ r(Wt, { icon: w.iconPathAfter, menuLabel: w.label })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      ]
    },
    `dropdown-menu-item-${w.label}-${w.command}`
  ) : /* @__PURE__ */ d(ta, { children: [
    /* @__PURE__ */ r(vn, { children: w.label }),
    /* @__PURE__ */ r(Qr, { children: /* @__PURE__ */ r(xn, { children: Un(
      t,
      e,
      Hn(t, w.id),
      a
    ) }) })
  ] }, `dropdown-menu-sub-${w.label}-${w.id}`) }),
<<<<<<< HEAD
  w.tooltip && /* @__PURE__ */ r(he, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function ln({
  commandHandler: t,
=======
  w.tooltip && /* @__PURE__ */ r(ue, { children: w.tooltip })
] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`))) : void 0;
function sn({
  onSelectMenuItem: t,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  menuData: e,
  tabLabel: n,
  icon: a,
  className: o,
  variant: s,
  id: i
}) {
<<<<<<< HEAD
  return /* @__PURE__ */ d(re, { variant: s, children: [
    /* @__PURE__ */ r(Ae, { "aria-label": n, className: o, asChild: !0, id: i, children: /* @__PURE__ */ r(I, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ r(Br, {}) }) }),
    /* @__PURE__ */ r(Ut, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, u) => /* @__PURE__ */ d(dn, { children: [
      /* @__PURE__ */ r(bn, { children: /* @__PURE__ */ r(Ke, { children: Un(e.groups, e.items, w, t) }) }),
      c < u.length - 1 && /* @__PURE__ */ r(qt, {})
    ] }, w)) })
  ] });
}
function oi({
  projectMenuCommandHandler: t,
  viewInfoMenuCommandHandler: e,
=======
  return /* @__PURE__ */ l(ee, { variant: s, children: [
    /* @__PURE__ */ r(Be, { "aria-label": n, className: o, asChild: !0, id: i, children: /* @__PURE__ */ r(I, { variant: "ghost", size: "icon", children: a ?? /* @__PURE__ */ r(Dr, {}) }) }),
    /* @__PURE__ */ r(Yt, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, p) => /* @__PURE__ */ l(wn, { children: [
      /* @__PURE__ */ r(gn, { children: /* @__PURE__ */ r(qe, { children: Yn(e.groups, e.items, w, t) }) }),
      c < p.length - 1 && /* @__PURE__ */ r(Ht, {})
    ] }, w)) })
  ] });
}
function Ys({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  projectMenuData: n,
  tabViewMenuData: a,
  id: o,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: w,
  endAreaChildren: c
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      className: l(
        "tw-box-border tw-flex tw-h-12 tw-w-full tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-border tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar",
        s
      ),
      id: o,
      children: [
        n && /* @__PURE__ */ r(
          ln,
          {
            onSelectMenuItem: t,
            menuData: n,
            tabLabel: "Project",
            icon: /* @__PURE__ */ r(Ir, {}),
            className: "tw-h-full tw-w-8"
          }
        ),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: w }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
          a && /* @__PURE__ */ r(
            ln,
            {
              onSelectMenuItem: e,
              menuData: a,
              tabLabel: "View Info",
<<<<<<< HEAD
              icon: /* @__PURE__ */ r(Ar, {}),
=======
              icon: /* @__PURE__ */ r(zr, {}),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
              className: "tw-h-full"
            }
          ),
          c
        ] })
      ]
    }
  );
}
<<<<<<< HEAD
const qn = p.forwardRef(({ className: t, ...e }, n) => {
=======
const Hn = u.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  const a = H();
  return /* @__PURE__ */ r(
    Q.Root,
    {
      orientation: "vertical",
      ref: n,
      className: l("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: a
    }
  );
});
<<<<<<< HEAD
qn.displayName = Q.List.displayName;
const Jn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Hn.displayName = Q.List.displayName;
const Un = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Q.List,
  {
    ref: n,
    className: l(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Jn.displayName = Q.List.displayName;
const Eo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Un.displayName = Q.List.displayName;
const Co = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Q.Trigger,
  {
    ref: n,
    ...e,
    className: l(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
<<<<<<< HEAD
)), Kn = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
)), qn = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Q.Content,
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
<<<<<<< HEAD
Kn.displayName = Q.Content.displayName;
function si({
=======
qn.displayName = Q.Content.displayName;
function Hs({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
        $n,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: a
        }
      )
    ] }),
<<<<<<< HEAD
    /* @__PURE__ */ d(qn, { children: [
      /* @__PURE__ */ r(Jn, { children: t.map((i) => /* @__PURE__ */ r(Eo, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ r(Kn, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
function Do({ ...t }) {
  return /* @__PURE__ */ r(X.Menu, { ...t });
}
function Vo({ ...t }) {
  return /* @__PURE__ */ r(X.Sub, { "data-slot": "menubar-sub", ...t });
}
const Wn = p.forwardRef(({ className: t, variant: e = "default", ...n }, a) => {
  const o = p.useMemo(
=======
    /* @__PURE__ */ l(Hn, { children: [
      /* @__PURE__ */ r(Un, { children: t.map((i) => /* @__PURE__ */ r(Co, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ r(qn, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
function _o({ ...t }) {
  return /* @__PURE__ */ r(X.Menu, { ...t });
}
function So({ ...t }) {
  return /* @__PURE__ */ r(X.Sub, { "data-slot": "menubar-sub", ...t });
}
const Jn = u.forwardRef(({ className: t, variant: e = "default", ...n }, a) => {
  const o = u.useMemo(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    () => ({
      variant: e
    }),
    [e]
  );
<<<<<<< HEAD
  return /* @__PURE__ */ r(Ie.Provider, { value: o, children: /* @__PURE__ */ r(
=======
  return /* @__PURE__ */ r(Oe.Provider, { value: o, children: /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    X.Root,
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
<<<<<<< HEAD
Wn.displayName = X.Root.displayName;
const Zn = p.forwardRef(({ className: t, ...e }, n) => {
  const a = ot();
=======
Jn.displayName = X.Root.displayName;
const Kn = u.forwardRef(({ className: t, ...e }, n) => {
  const a = at();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    X.Trigger,
    {
      ref: n,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
<<<<<<< HEAD
        ct({ variant: a.variant, className: t })
=======
        dt({ variant: a.variant, className: t })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
<<<<<<< HEAD
Zn.displayName = X.Trigger.displayName;
const Qn = p.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = ot();
  return /* @__PURE__ */ d(
=======
Kn.displayName = X.Trigger.displayName;
const Wn = u.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = at();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    X.SubTrigger,
    {
      ref: o,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
<<<<<<< HEAD
        ct({ variant: s.variant, className: t }),
=======
        dt({ variant: s.variant, className: t }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Qn.displayName = X.SubTrigger.displayName;
const tr = p.forwardRef(({ className: t, ...e }, n) => {
  const a = ot();
=======
Wn.displayName = X.SubTrigger.displayName;
const Zn = u.forwardRef(({ className: t, ...e }, n) => {
  const a = at();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    X.SubContent,
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
<<<<<<< HEAD
tr.displayName = X.SubContent.displayName;
const er = p.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, s) => {
  const i = ot();
=======
Zn.displayName = X.SubContent.displayName;
const Qn = u.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, s) => {
  const i = at();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(X.Portal, { children: /* @__PURE__ */ r(
    X.Content,
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
<<<<<<< HEAD
er.displayName = X.Content.displayName;
const nr = p.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = ot();
=======
Qn.displayName = X.Content.displayName;
const tr = u.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = at();
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    X.Item,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
<<<<<<< HEAD
        ct({ variant: o.variant, className: t }),
=======
        dt({ variant: o.variant, className: t }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
<<<<<<< HEAD
nr.displayName = X.Item.displayName;
const Mo = p.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = ot();
  return /* @__PURE__ */ d(
=======
tr.displayName = X.Item.displayName;
const To = u.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = at();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    X.CheckboxItem,
    {
      ref: o,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
<<<<<<< HEAD
        ct({ variant: s.variant, className: t }),
=======
        dt({ variant: s.variant, className: t }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...a,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(_t, { className: "tw-h-4 tw-w-4" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(kt, { className: "tw-h-4 tw-w-4" }) }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        e
      ]
    }
  );
});
<<<<<<< HEAD
Mo.displayName = X.CheckboxItem.displayName;
const zo = p.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = ot();
  return /* @__PURE__ */ d(
=======
To.displayName = X.CheckboxItem.displayName;
const Ro = u.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = at();
  return /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    X.RadioItem,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
<<<<<<< HEAD
        ct({ variant: o.variant, className: t }),
=======
        dt({ variant: o.variant, className: t }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(Me, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(Ve, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        e
      ]
    }
  );
});
<<<<<<< HEAD
zo.displayName = X.RadioItem.displayName;
const Oo = p.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
=======
Ro.displayName = X.RadioItem.displayName;
const Eo = u.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  X.Label,
  {
    ref: a,
    className: l("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
<<<<<<< HEAD
Oo.displayName = X.Label.displayName;
const rr = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Eo.displayName = X.Label.displayName;
const er = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  X.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
rr.displayName = X.Separator.displayName;
const Xt = (t, e) => {
=======
er.displayName = X.Separator.displayName;
const At = (t, e) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  setTimeout(() => {
    e.forEach((n) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, ar = (t, e, n, a) => {
  if (!n) return;
  const o = Object.entries(t).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return o.flatMap(([s], i) => {
<<<<<<< HEAD
    const w = e.filter((u) => u.group === s).sort((u, g) => u.order - g.order).map((u) => /* @__PURE__ */ d(We, { children: [
      /* @__PURE__ */ r(Ze, { asChild: !0, children: "command" in u ? /* @__PURE__ */ d(
        nr,
=======
    const w = e.filter((p) => p.group === s).sort((p, g) => p.order - g.order).map((p) => /* @__PURE__ */ l(Je, { children: [
      /* @__PURE__ */ r(Ke, { asChild: !0, children: "command" in p ? /* @__PURE__ */ l(
        tr,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        {
          onClick: () => {
            a(p);
          },
          children: [
<<<<<<< HEAD
            u.iconPathBefore && /* @__PURE__ */ r(Qt, { icon: u.iconPathBefore, menuLabel: u.label, leading: !0 }),
            u.label,
            u.iconPathAfter && /* @__PURE__ */ r(Qt, { icon: u.iconPathAfter, menuLabel: u.label })
          ]
        },
        `menubar-item-${u.label}-${u.command}`
      ) : /* @__PURE__ */ d(Vo, { children: [
        /* @__PURE__ */ r(Qn, { children: u.label }),
        /* @__PURE__ */ r(tr, { children: ar(
          t,
          e,
          Hn(t, u.id),
          a
        ) })
      ] }, `menubar-sub-${u.label}-${u.id}`) }),
      u.tooltip && /* @__PURE__ */ r(he, { children: u.tooltip })
    ] }, `tooltip-${u.label}-${"command" in u ? u.command : u.id}`)), c = [...w];
    return w.length > 0 && i < o.length - 1 && c.push(/* @__PURE__ */ r(rr, {}, `separator-${s}`)), c;
  });
};
function Bo({
=======
            p.iconPathBefore && /* @__PURE__ */ r(Wt, { icon: p.iconPathBefore, menuLabel: p.label, leading: !0 }),
            p.label,
            p.iconPathAfter && /* @__PURE__ */ r(Wt, { icon: p.iconPathAfter, menuLabel: p.label })
          ]
        },
        `menubar-item-${p.label}-${p.command}`
      ) : /* @__PURE__ */ l(So, { children: [
        /* @__PURE__ */ r(Wn, { children: p.label }),
        /* @__PURE__ */ r(Zn, { children: nr(
          t,
          e,
          Ln(t, p.id),
          a
        ) })
      ] }, `menubar-sub-${p.label}-${p.id}`) }),
      p.tooltip && /* @__PURE__ */ r(ue, { children: p.tooltip })
    ] }, `tooltip-${p.label}-${"command" in p ? p.command : p.id}`)), c = [...w];
    return w.length > 0 && i < o.length - 1 && c.push(/* @__PURE__ */ r(er, {}, `separator-${s}`)), c;
  });
};
function Vo({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: a
}) {
<<<<<<< HEAD
  const o = q(void 0), s = q(void 0), i = q(void 0), w = q(void 0), c = q(void 0), u = (g) => {
=======
  const o = q(void 0), s = q(void 0), i = q(void 0), w = q(void 0), c = q(void 0), p = (g) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
  if (Ur(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (g, v) => {
=======
  if ($r(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (g, v) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    var N, T, y, x;
    g.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (v.hotkey) {
      case "alt":
<<<<<<< HEAD
        Xt(s, [f]);
        break;
      case "alt+p":
        (N = s.current) == null || N.focus(), Xt(s, [f, m]);
        break;
      case "alt+l":
        (T = i.current) == null || T.focus(), Xt(i, [f, m]);
        break;
      case "alt+n":
        (y = w.current) == null || y.focus(), Xt(w, [f, m]);
        break;
      case "alt+h":
        (x = c.current) == null || x.focus(), Xt(c, [f, m]);
=======
        At(s, [f]);
        break;
      case "alt+p":
        (N = s.current) == null || N.focus(), At(s, [f, m]);
        break;
      case "alt+l":
        (T = i.current) == null || T.focus(), At(i, [f, m]);
        break;
      case "alt+n":
        (y = w.current) == null || y.focus(), At(w, [f, m]);
        break;
      case "alt+h":
        (x = c.current) == null || x.focus(), At(c, [f, m]);
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        break;
    }
  }), it(() => {
    if (!n || !o.current) return;
    const g = new MutationObserver((m) => {
      m.forEach((N) => {
        if (N.attributeName === "data-state" && N.target instanceof HTMLElement) {
          const T = N.target.getAttribute("data-state");
          n(T === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((m) => {
      g.observe(m, { attributes: !0 });
    }), () => g.disconnect();
  }, [n]), !!t)
<<<<<<< HEAD
    return /* @__PURE__ */ r(Wn, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, g]) => typeof g == "object").sort(([, g], [, v]) => typeof g == "boolean" || typeof v == "boolean" ? 0 : g.order - v.order).map(([g, v]) => /* @__PURE__ */ d(Do, { children: [
      /* @__PURE__ */ r(Zn, { ref: u(g), children: typeof v == "object" && "label" in v && v.label }),
=======
    return /* @__PURE__ */ r(Jn, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, g]) => typeof g == "object").sort(([, g], [, v]) => typeof g == "boolean" || typeof v == "boolean" ? 0 : g.order - v.order).map(([g, v]) => /* @__PURE__ */ l(_o, { children: [
      /* @__PURE__ */ r(Kn, { ref: p(g), children: typeof v == "object" && "label" in v && v.label }),
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      /* @__PURE__ */ r(
        er,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(Ke, { children: ar(t.groups, t.items, g, e) })
        }
      )
    ] }, g)) });
}
<<<<<<< HEAD
function ii(t) {
=======
function Us(t) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
<<<<<<< HEAD
function wi({
=======
function qs({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
  const g = q(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("tw-border tw-px-4 tw-text-foreground", a),
      ref: g,
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  t && /* @__PURE__ */ r(
<<<<<<< HEAD
                    Bo,
=======
                    Vo,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
const Io = (t, e) => t[e] ?? e;
function li({
=======
const Do = (t, e) => t[e] ?? e;
function Js({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: w
}) {
<<<<<<< HEAD
  const c = Io(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [u, g] = P(!1), v = (m) => {
=======
  const c = Do(
    i,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [p, g] = A(!1), v = (m) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    o && o(m), a && a([m, ...n.filter((N) => N !== m)]), s && n.find((N) => N === m) && s([...n.filter((N) => N !== m)]), g(!1);
  }, f = (m, N) => {
    var y, x, _, S, z, $;
    const T = N !== m ? ((x = (y = t[m]) == null ? void 0 : y.uiNames) == null ? void 0 : x[N]) ?? ((S = (_ = t[m]) == null ? void 0 : _.uiNames) == null ? void 0 : S.en) : void 0;
    return T ? `${(z = t[m]) == null ? void 0 : z.autonym} (${T})` : ($ = t[m]) == null ? void 0 : $.autonym;
  };
<<<<<<< HEAD
  return /* @__PURE__ */ d("div", { className: l("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ d(
      Rt,
=======
  return /* @__PURE__ */ l("div", { className: d("pr-twp tw-max-w-sm", w), children: [
    /* @__PURE__ */ l(
      St,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        name: "uiLanguage",
        value: e,
        onValueChange: v,
<<<<<<< HEAD
        open: u,
        onOpenChange: (m) => g(m),
        children: [
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ r(Et, {}) }),
          /* @__PURE__ */ r(
            Ct,
=======
        open: p,
        onOpenChange: (m) => g(m),
        children: [
          /* @__PURE__ */ r(yt, { children: /* @__PURE__ */ r(Tt, {}) }),
          /* @__PURE__ */ r(
            Nt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
            {
              className: "tw-z-[250]",
              children: Object.keys(t).map((m) => /* @__PURE__ */ r(rt, { value: m, children: f(m, e) }, m))
            }
          )
        ]
      }
    ),
<<<<<<< HEAD
    e !== "en" && /* @__PURE__ */ d(Vt, { children: [
      /* @__PURE__ */ r(Y, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ d(Y, { children: [
=======
    e !== "en" && /* @__PURE__ */ l(Et, { children: [
      /* @__PURE__ */ r(Y, { className: "tw-ms-3", children: c }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ l(Y, { children: [
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((m) => f(m, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
<<<<<<< HEAD
function Ao({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Y, { children: e(t) }) : n ? /* @__PURE__ */ r(Y, { children: n(t) }) : /* @__PURE__ */ r(Y, { children: t });
}
function di({
=======
function Mo({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(Y, { children: e(t) }) : n ? /* @__PURE__ */ r(Y, { children: n(t) }) : /* @__PURE__ */ r(Y, { children: t });
}
function Ks({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
      qe,
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(w),
        onCheckedChange: (c) => o(w, c)
      }
    ),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      Ao,
=======
      Mo,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        item: w,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, w)) });
}
<<<<<<< HEAD
function ci({
=======
function Ws({
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
  onBlur: m
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
<<<<<<< HEAD
      Ot,
=======
      Mt,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: w,
<<<<<<< HEAD
        className: l(c, { "tw-border-red-600": n }),
        defaultValue: u,
=======
        className: d(c, { "tw-border-red-600": n }),
        defaultValue: p,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
        value: g,
        onChange: v,
        onFocus: f,
        onBlur: m
      }
    ),
    /* @__PURE__ */ r("p", { className: l({ "tw-hidden": !o }), children: o })
  ] });
}
<<<<<<< HEAD
const Po = gt(
=======
const zo = ht(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
), jo = p.forwardRef(({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, role: "alert", className: l(Po({ variant: e }), t), ...n }));
jo.displayName = "Alert";
const Xo = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ d(
=======
), Oo = u.forwardRef(({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, role: "alert", className: d(zo({ variant: e }), t), ...n }));
Oo.displayName = "Alert";
const Bo = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ l(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Xo.displayName = "AlertTitle";
const Fo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: l("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Fo.displayName = "AlertDescription";
const Go = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Root,
=======
Bo.displayName = "AlertTitle";
const Io = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Io.displayName = "AlertDescription";
const Po = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Root,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Go.displayName = zt.Root.displayName;
const $o = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Image,
=======
Po.displayName = Dt.Root.displayName;
const Ao = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Image,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
<<<<<<< HEAD
$o.displayName = zt.Image.displayName;
const Lo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  zt.Fallback,
=======
Ao.displayName = Dt.Image.displayName;
const jo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Fallback,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  {
    ref: n,
    className: l(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
Lo.displayName = zt.Fallback.displayName;
const Yo = p.forwardRef(
=======
jo.displayName = Dt.Fallback.displayName;
const Xo = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Yo.displayName = "Card";
const Ho = p.forwardRef(
=======
Xo.displayName = "Card";
const Fo = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: l("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Ho.displayName = "CardHeader";
const Uo = p.forwardRef(
=======
Fo.displayName = "CardHeader";
const Go = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
<<<<<<< HEAD
Uo.displayName = "CardTitle";
const qo = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: l("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
qo.displayName = "CardDescription";
const Jo = p.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: l("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Jo.displayName = "CardContent";
const Ko = p.forwardRef(
=======
Go.displayName = "CardTitle";
const $o = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: d("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
$o.displayName = "CardDescription";
const Lo = u.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: d("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Lo.displayName = "CardContent";
const Yo = u.forwardRef(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: l("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
<<<<<<< HEAD
Ko.displayName = "CardFooter";
function Wo({
  shouldScaleBackground: t = !0,
  ...e
}) {
  return /* @__PURE__ */ r(at.Root, { shouldScaleBackground: t, ...e });
}
Wo.displayName = "Drawer";
const pi = at.Trigger, Zo = at.Portal, ui = at.Close, or = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Overlay,
  {
    ref: n,
    className: l("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
or.displayName = at.Overlay.displayName;
const Qo = p.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ d(Zo, { children: [
  /* @__PURE__ */ r(or, {}),
  /* @__PURE__ */ d(
    at.Content,
    {
      ref: a,
      className: l(
        "tw-fixed tw-inset-x-0 tw-bottom-0 tw-z-50 tw-mt-24 tw-flex tw-h-auto tw-flex-col tw-rounded-t-[10px] tw-border tw-bg-background",
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted" }),
        e
      ]
    }
  )
] }));
Qo.displayName = "DrawerContent";
function ts({ className: t, ...e }) {
=======
Yo.displayName = "CardFooter";
function Zs({ ...t }) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
ts.displayName = "DrawerHeader";
function es({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: l("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
es.displayName = "DrawerFooter";
const ns = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Title,
  {
    ref: n,
    className: l("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ns.displayName = at.Title.displayName;
const rs = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Description,
  {
    ref: n,
    className: l("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
rs.displayName = at.Description.displayName;
const sr = p.forwardRef(({ className: t, orientation: e = "vertical", ...n }, a) => /* @__PURE__ */ r(
  yt.ScrollAreaScrollbar,
  {
    ref: a,
    orientation: e,
    className: l(
      "tw-flex tw-touch-none tw-select-none tw-transition-colors",
      e === "vertical" && "tw-h-full tw-w-2.5 tw-border-l tw-border-l-transparent tw-p-[1px]",
      e === "horizontal" && "tw-h-2.5 tw-flex-col tw-border-t tw-border-t-transparent tw-p-[1px]",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(yt.ScrollAreaThumb, { className: "tw-relative tw-flex-1 tw-rounded-full tw-bg-border" })
  }
));
sr.displayName = yt.ScrollAreaScrollbar.displayName;
const as = p.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ d(
  yt.Root,
  {
    ref: a,
    className: l("tw-relative tw-overflow-hidden", t),
    ...n,
    children: [
      /* @__PURE__ */ r(yt.Viewport, { className: "tw-h-full tw-w-full tw-rounded-[inherit]", children: e }),
      /* @__PURE__ */ r(sr, {}),
      /* @__PURE__ */ r(yt.Corner, {})
    ]
  }
));
as.displayName = yt.Root.displayName;
function mi({ ...t }) {
  return /* @__PURE__ */ r(
    qr,
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
const os = p.forwardRef(({ className: t, ...e }, n) => {
  const a = H();
  return /* @__PURE__ */ d(
    Ft.Root,
=======
const Ho = u.forwardRef(({ className: t, ...e }, n) => {
  const a = H();
  return /* @__PURE__ */ l(
    jt.Root,
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    {
      ref: n,
      className: l(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r(Ft.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Ft.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Ft.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
=======
        /* @__PURE__ */ r(jt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(jt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(jt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
      ]
    }
  );
});
<<<<<<< HEAD
os.displayName = Ft.Root.displayName;
const ss = p.forwardRef(({ className: t, ...e }, n) => {
=======
Ho.displayName = jt.Root.displayName;
const Uo = u.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  const a = H();
  return /* @__PURE__ */ r(
    Se.Root,
    {
      className: l(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        Se.Thumb,
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
<<<<<<< HEAD
ss.displayName = Se.Root.displayName;
const hi = Q.Root, is = p.forwardRef(({ className: t, ...e }, n) => {
=======
Uo.displayName = Ce.Root.displayName;
const Qs = Q.Root, qo = u.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  const a = H();
  return /* @__PURE__ */ r(
    Q.List,
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
<<<<<<< HEAD
is.displayName = Q.List.displayName;
const ws = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
qo.displayName = Q.List.displayName;
const Jo = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Q.Trigger,
  {
    ref: n,
    className: l(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
ws.displayName = Q.Trigger.displayName;
const ls = p.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Jo.displayName = Q.Trigger.displayName;
const Ko = u.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  Q.Content,
  {
    ref: n,
    className: l(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
<<<<<<< HEAD
ls.displayName = Q.Content.displayName;
const gi = Jr.Root, fi = (t, e) => {
  it(() => {
=======
Ko.displayName = Q.Content.displayName;
const ti = (t, e) => {
  st(() => {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
<<<<<<< HEAD
function ds(t) {
=======
function Wo(t) {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  return {
    preserveValue: !0,
    ...t
  };
}
<<<<<<< HEAD
const cs = (t, e, n = {}) => {
  const a = q(e);
  a.current = e;
  const o = q(n);
  o.current = ds(o.current);
  const [s, i] = P(() => a.current), [w, c] = P(!0);
  return it(() => {
    let u = !0;
=======
const Zo = (t, e, n = {}) => {
  const a = q(e);
  a.current = e;
  const o = q(n);
  o.current = Wo(o.current);
  const [s, i] = A(() => a.current), [w, c] = A(!0);
  return st(() => {
    let p = !0;
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
}, ke = () => !1, bi = (t, e) => {
  const [n] = cs(
=======
}, ye = () => !1, ei = (t, e) => {
  const [n] = Zo(
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
    U(async () => {
      if (!t) return ke;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    ke,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  it(() => () => {
    n !== ke && n();
  }, [n]);
};
<<<<<<< HEAD
function ps(t, e = "top") {
=======
function Qo(t, e = "top") {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), a = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? n.insertBefore(o, a) : n.appendChild(o);
}
<<<<<<< HEAD
ps(`*, ::before, ::after {
=======
Qo(`.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
*, ::before, ::after {
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
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
.tw-rounded-\\[inherit\\] {
  border-radius: inherit;
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
.tw-border-l-transparent {
  border-left-color: transparent;
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
.tw-border-t-transparent {
  border-top-color: transparent;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`, "after-all");
export {
<<<<<<< HEAD
  jo as Alert,
  Fo as AlertDescription,
  Xo as AlertTitle,
  Go as Avatar,
  Lo as AvatarFallback,
  $o as AvatarImage,
  Vs as BOOK_SELECTOR_STRING_KEYS,
  Zt as Badge,
  Ds as BookChapterControl,
  Ma as BookSelectionMode,
  Ms as BookSelector,
  I as Button,
  Yo as Card,
  Jo as CardContent,
  qo as CardDescription,
  Ko as CardFooter,
  Ho as CardHeader,
  Uo as CardTitle,
  Va as ChapterRangeSelector,
  qe as Checkbox,
  di as Checklist,
  Te as ComboBox,
  Fa as DataTable,
  Bs as DisableButton,
  Wo as Drawer,
  ui as DrawerClose,
  Qo as DrawerContent,
  rs as DrawerDescription,
  es as DrawerFooter,
  ts as DrawerHeader,
  or as DrawerOverlay,
  Zo as DrawerPortal,
  ns as DrawerTitle,
  pi as DrawerTrigger,
  re as DropdownMenu,
  je as DropdownMenuCheckboxItem,
  Ut as DropdownMenuContent,
  bn as DropdownMenuGroup,
  Pe as DropdownMenuItem,
  $a as DropdownMenuItemType,
  ae as DropdownMenuLabel,
  Qr as DropdownMenuPortal,
  Rs as DropdownMenuRadioGroup,
  yn as DropdownMenuRadioItem,
  qt as DropdownMenuSeparator,
  ea as DropdownMenuShortcut,
  ta as DropdownMenuSub,
  xn as DropdownMenuSubContent,
  vn as DropdownMenuSubTrigger,
  Ae as DropdownMenuTrigger,
  Os as EnableButton,
  Gs as Filter,
  Ga as FilterButton,
  Ps as FilterDropdown,
  Fs as Footer,
  Js as INVENTORY_STRING_KEYS,
  Ot as Input,
  zs as InstallButton,
  Ks as Inventory,
  Y as Label,
  As as MarkdownRenderer,
  Xs as MoreInfo,
  Ha as MultiSelectComboBox,
  si as NavigationContentSearch,
  js as NoExtensionsFound,
  Ye as Popover,
  oe as PopoverContent,
  He as PopoverTrigger,
  Le as RadioGroup,
  Wt as RadioGroupItem,
  Qs as SCOPE_SELECTOR_STRING_KEYS,
  ti as ScopeSelector,
  Zs as ScriptureResultsViewer,
  as as ScrollArea,
  ei as ScrollGroupSelector,
  $n as SearchBar,
  Rt as Select,
  Ct as SelectContent,
  Oa as SelectGroup,
  rt as SelectItem,
  Ia as SelectLabel,
  Vn as SelectScrollDownButton,
  Dn as SelectScrollUpButton,
  Aa as SelectSeparator,
  kt as SelectTrigger,
  Et as SelectValue,
  Je as Separator,
  ni as SettingsList,
  ai as SettingsListHeader,
  ri as SettingsListItem,
  go as SettingsSidebar,
  Ws as SettingsSidebarContentSearch,
  os as Slider,
  mi as Sonner,
  Jt as Spinner,
  ss as Switch,
  ln as TabDropdownMenu,
  oi as TabToolbar,
  ce as Table,
  ue as TableBody,
  Xa as TableCaption,
  Dt as TableCell,
  ja as TableFooter,
  Yt as TableHead,
  pe as TableHeader,
  ht as TableRow,
  hi as Tabs,
  ls as TabsContent,
  is as TabsList,
  ws as TabsTrigger,
  ci as TextField,
  On as ToggleGroup,
  Kt as ToggleGroupItem,
  wi as Toolbar,
  We as Tooltip,
  he as TooltipContent,
  Ke as TooltipProvider,
  Ze as TooltipTrigger,
  li as UiLanguageSelector,
  Is as UpdateButton,
  La as VersionHistory,
  qn as VerticalTabs,
  Kn as VerticalTabsContent,
  Jn as VerticalTabsList,
  Eo as VerticalTabsTrigger,
  gi as VisuallyHidden,
  Ya as badgeVariants,
  Ca as buttonVariants,
  l as cn,
  qs as getBookIdFromUSFM,
  Hs as getLinesFromUSFM,
  Us as getNumberFromUSFM,
  Ka as getStatusForItem,
  ii as getToolbarOSReservedSpaceClassName,
  Ls as inventoryCountColumn,
  $s as inventoryItemColumn,
  Ys as inventoryStatusColumn,
  Ba as selectTriggerVariants,
  yi as sonner,
  fi as useEvent,
  bi as useEventAsync,
  cs as usePromise
=======
  Oo as Alert,
  Io as AlertDescription,
  Bo as AlertTitle,
  Po as Avatar,
  jo as AvatarFallback,
  Ao as AvatarImage,
  fs as BOOK_SELECTOR_STRING_KEYS,
  Kt as Badge,
  gs as BookChapterControl,
  Ta as BookSelectionMode,
  bs as BookSelector,
  I as Button,
  Xo as Card,
  Lo as CardContent,
  $o as CardDescription,
  Yo as CardFooter,
  Fo as CardHeader,
  Go as CardTitle,
  Sa as ChapterRangeSelector,
  He as Checkbox,
  Ks as Checklist,
  _e as ComboBox,
  ae as Command,
  ie as CommandEmpty,
  Ye as CommandGroup,
  oe as CommandInput,
  we as CommandItem,
  se as CommandList,
  Ia as DataTable,
  ys as DisableButton,
  ee as DropdownMenu,
  Pe as DropdownMenuCheckboxItem,
  Yt as DropdownMenuContent,
  gn as DropdownMenuGroup,
  Ie as DropdownMenuItem,
  Aa as DropdownMenuItemType,
  ne as DropdownMenuLabel,
  qr as DropdownMenuPortal,
  ms as DropdownMenuRadioGroup,
  vn as DropdownMenuRadioItem,
  Ht as DropdownMenuSeparator,
  Kr as DropdownMenuShortcut,
  Jr as DropdownMenuSub,
  bn as DropdownMenuSubContent,
  fn as DropdownMenuSubTrigger,
  Be as DropdownMenuTrigger,
  xs as EnableButton,
  Rs as Filter,
  Pa as FilterButton,
  Cs as FilterDropdown,
  Ts as Footer,
  Bs as INVENTORY_STRING_KEYS,
  Mt as Input,
  vs as InstallButton,
  Is as Inventory,
  Y as Label,
  ks as MarkdownRenderer,
  Ss as MoreInfo,
  Fa as MultiSelectComboBox,
  Hs as NavigationContentSearch,
  _s as NoExtensionsFound,
  $e as Popover,
  re as PopoverContent,
  Le as PopoverTrigger,
  Ge as RadioGroup,
  Jt as RadioGroupItem,
  js as SCOPE_SELECTOR_STRING_KEYS,
  Xs as ScopeSelector,
  As as ScriptureResultsViewer,
  Fs as ScrollGroupSelector,
  Fn as SearchBar,
  St as Select,
  Nt as SelectContent,
  Ea as SelectGroup,
  rt as SelectItem,
  Da as SelectLabel,
  En as SelectScrollDownButton,
  Rn as SelectScrollUpButton,
  Ma as SelectSeparator,
  yt as SelectTrigger,
  Tt as SelectValue,
  Ue as Separator,
  Gs as SettingsList,
  Ls as SettingsListHeader,
  $s as SettingsListItem,
  co as SettingsSidebar,
  Ps as SettingsSidebarContentSearch,
  Ho as Slider,
  Zs as Sonner,
  Ut as Spinner,
  Uo as Switch,
  sn as TabDropdownMenu,
  Ys as TabToolbar,
  le as Table,
  ce as TableBody,
  Ba as TableCaption,
  Rt as TableCell,
  Oa as TableFooter,
  $t as TableHead,
  de as TableHeader,
  mt as TableRow,
  Qs as Tabs,
  Ko as TabsContent,
  qo as TabsList,
  Jo as TabsTrigger,
  Ws as TextField,
  Mn as ToggleGroup,
  qt as ToggleGroupItem,
  qs as Toolbar,
  Je as Tooltip,
  ue as TooltipContent,
  qe as TooltipProvider,
  Ke as TooltipTrigger,
  Js as UiLanguageSelector,
  Ns as UpdateButton,
  ja as VersionHistory,
  Hn as VerticalTabs,
  qn as VerticalTabsContent,
  Un as VerticalTabsList,
  Co as VerticalTabsTrigger,
  Xa as badgeVariants,
  va as buttonVariants,
  d as cn,
  Os as getBookIdFromUSFM,
  Ms as getLinesFromUSFM,
  zs as getNumberFromUSFM,
  Ya as getStatusForItem,
  Us as getToolbarOSReservedSpaceClassName,
  Vs as inventoryCountColumn,
  Es as inventoryItemColumn,
  Ds as inventoryStatusColumn,
  Va as selectTriggerVariants,
  ai as sonner,
  ti as useEvent,
  ei as useEventAsync,
  Zo as usePromise
>>>>>>> a5c80c00efd21055fe49a2ccae8da3922e707be9
};
//# sourceMappingURL=index.js.map
