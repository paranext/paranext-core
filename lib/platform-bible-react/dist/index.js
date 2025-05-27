<<<<<<< HEAD
<<<<<<< HEAD
import { jsx as r, jsxs as d, Fragment as Nt } from "react/jsx-runtime";
import c, { forwardRef as $t, createContext as Yn, useContext as Hn, useCallback as tt, useState as P, useRef as K, useEffect as wt, useLayoutEffect as Xe, useMemo as W, Fragment as qn } from "react";
import { clsx as Un } from "clsx";
import { extendTailwindMerge as Jn } from "tailwind-merge";
import { cva as ft } from "class-variance-authority";
import * as B from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Kn } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as ge, Check as kt, Circle as fe, X as be, Search as He, ChevronsUpDown as qe, FilterIcon as Wn, ChevronDown as Lt, ChevronUp as Zn, ArrowLeftIcon as Qn, ChevronLeftIcon as tr, ChevronRightIcon as er, ArrowRightIcon as nr, LoaderCircle as rr, Download as ar, Filter as or, User as sr, Link as ir, CircleHelp as wr, Star as lr, CircleCheckIcon as dr, CircleXIcon as cr, CircleHelpIcon as pr, ArrowUpIcon as ur, ArrowDownIcon as mr, ArrowUpDownIcon as hr, PanelLeft as gr, PanelRight as fr, ScrollText as br, ChevronLeft as vr, MenuIcon as xr } from "lucide-react";
import { formatScrRef as It, getChaptersForBook as yr, NumberFormat as Nr, formatBytes as kr, deepEqual as ve, isString as ne, compareScrRefs as we, scrRefToBBBCCCVVV as re, getLocalizeKeyForScrollGroupId as I } from "platform-bible-utils";
import { Slot as Ct } from "@radix-ui/react-slot";
import * as Ue from "@radix-ui/react-label";
=======
import { jsx as r, jsxs as d, Fragment as kt } from "react/jsx-runtime";
import c, { forwardRef as Ht, createContext as Hn, useContext as Un, useCallback as tt, useState as P, useRef as K, useEffect as wt, useLayoutEffect as je, useMemo as W, Fragment as qn } from "react";
import { clsx as Jn } from "clsx";
import { extendTailwindMerge as Kn } from "tailwind-merge";
import { cva as bt } from "class-variance-authority";
import * as B from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Wn, Separator as Zn } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as fe, Check as Ct, Circle as be, X as ve, Search as He, ChevronsUpDown as Ue, FilterIcon as Qn, ChevronDown as Ut, ChevronUp as tr, ArrowLeftIcon as er, ChevronLeftIcon as nr, ChevronRightIcon as rr, ArrowRightIcon as ar, LoaderCircle as or, Download as sr, Filter as ir, User as wr, Link as lr, CircleHelp as dr, Star as cr, CircleCheckIcon as pr, CircleXIcon as ur, CircleHelpIcon as mr, ArrowUpIcon as hr, ArrowDownIcon as gr, ArrowUpDownIcon as fr, PanelLeft as br, PanelRight as vr, ScrollText as xr, ChevronLeft as yr, MenuIcon as Nr } from "lucide-react";
import { formatScrRef as xt, getChaptersForBook as kr, scrRefToBBBCCC as Cr, NumberFormat as Sr, formatBytes as Rr, deepEqual as xe, isString as re, compareScrRefs as le, scrRefToBBBCCCVVV as ae, getLocalizeKeyForScrollGroupId as M } from "platform-bible-utils";
import { Slot as St } from "@radix-ui/react-slot";
import * as qe from "@radix-ui/react-label";
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
import * as Bt from "@radix-ui/react-radio-group";
import * as Vt from "@radix-ui/react-popover";
import { Command as H } from "cmdk";
import * as rt from "@radix-ui/react-dialog";
<<<<<<< HEAD
import { useReactTable as Je, getFilteredRowModel as Cr, getSortedRowModel as Ke, getPaginationRowModel as Sr, getCoreRowModel as We, flexRender as Dt, getGroupedRowModel as Rr, getExpandedRowModel as Tr } from "@tanstack/react-table";
import * as F from "@radix-ui/react-select";
import _r from "markdown-to-jsx";
import * as le from "@radix-ui/react-checkbox";
import * as Yt from "@radix-ui/react-toggle-group";
=======
import { useReactTable as Je, getFilteredRowModel as Tr, getSortedRowModel as Ke, getPaginationRowModel as _r, getCoreRowModel as We, flexRender as It, getGroupedRowModel as zr, getExpandedRowModel as Er } from "@tanstack/react-table";
import * as j from "@radix-ui/react-select";
import Dr from "markdown-to-jsx";
import * as de from "@radix-ui/react-checkbox";
import * as qt from "@radix-ui/react-toggle-group";
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
import * as Ze from "@radix-ui/react-toggle";
import * as Qe from "@radix-ui/react-separator";
import * as Ot from "@radix-ui/react-tooltip";
import * as q from "@radix-ui/react-tabs";
import * as V from "@radix-ui/react-menubar";
import { useHotkeys as Mr } from "react-hotkeys-hook";
import * as Rt from "@radix-ui/react-avatar";
import { Toaster as Ir } from "sonner";
import { toast as $s } from "sonner";
import * as Mt from "@radix-ui/react-slider";
<<<<<<< HEAD
import * as de from "@radix-ui/react-switch";
const Mr = Jn({ prefix: "tw-" });
=======
import { jsx as r, jsxs as d, Fragment as Ct } from "react/jsx-runtime";
import c, { forwardRef as Jt, createContext as qn, useContext as Jn, useCallback as et, useState as B, useRef as Z, useEffect as ct, useLayoutEffect as Ge, useMemo as Q, Fragment as Kn } from "react";
import { clsx as Wn } from "clsx";
import { extendTailwindMerge as Zn } from "tailwind-merge";
import { cva as vt } from "class-variance-authority";
import * as I from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Qn } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as ve, Check as St, Circle as xe, X as ye, Search as Je, ChevronsUpDown as Ke, FilterIcon as tr, ChevronDown as Kt, ChevronUp as er, ArrowLeftIcon as nr, ChevronLeftIcon as rr, ChevronRightIcon as ar, ArrowRightIcon as or, LoaderCircle as sr, Download as ir, Filter as wr, User as lr, Link as dr, CircleHelp as cr, Star as pr, CircleCheckIcon as ur, CircleXIcon as mr, CircleHelpIcon as hr, ArrowUpIcon as gr, ArrowDownIcon as fr, ArrowUpDownIcon as br, PanelLeft as vr, PanelRight as xr, ScrollText as yr, ChevronLeft as Nr, MenuIcon as kr } from "lucide-react";
import { formatScrRef as Ot, getChaptersForBook as Cr, NumberFormat as Sr, formatBytes as Rr, deepEqual as Ne, substring as Tr, compareScrRefs as ce, scrRefToBBBCCCVVV as se, getLocalizeKeyForScrollGroupId as M } from "platform-bible-utils";
import { Slot as Rt } from "@radix-ui/react-slot";
import * as We from "@radix-ui/react-label";
import * as Xt from "@radix-ui/react-radio-group";
import * as jt from "@radix-ui/react-popover";
import { Command as U } from "cmdk";
import * as at from "@radix-ui/react-dialog";
import { useReactTable as Ze, getFilteredRowModel as _r, getSortedRowModel as Qe, getPaginationRowModel as Er, getCoreRowModel as tn, flexRender as Pt, getGroupedRowModel as zr, getExpandedRowModel as Mr } from "@tanstack/react-table";
import * as X from "@radix-ui/react-select";
import Dr from "markdown-to-jsx";
import * as pe from "@radix-ui/react-checkbox";
import * as Wt from "@radix-ui/react-toggle-group";
import * as en from "@radix-ui/react-toggle";
import * as nn from "@radix-ui/react-separator";
import * as $t from "@radix-ui/react-tooltip";
import * as q from "@radix-ui/react-tabs";
import * as V from "@radix-ui/react-menubar";
import { useHotkeys as Ir } from "react-hotkeys-hook";
import * as Tt from "@radix-ui/react-avatar";
import { Toaster as Vr } from "sonner";
import { toast as Fs } from "sonner";
import * as At from "@radix-ui/react-slider";
import * as ue from "@radix-ui/react-switch";
const Br = Zn({ prefix: "tw-" });
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
function l(...t) {
  return Mr(Un(t));
=======
import * as ce from "@radix-ui/react-switch";
const Br = Kn({ prefix: "tw-" });
function l(...t) {
  return Br(Jn(t));
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
}
const Tt = c.forwardRef(
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
<<<<<<< HEAD
Rt.displayName = "Input";
const Ir = $t(
=======
_t.displayName = "Input";
const Ar = Jt(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Tt.displayName = "Input";
const Vr = Ht(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: n,
    handleSubmit: a,
    className: o,
    ...s
  }, w) => /* @__PURE__ */ r("div", { className: "tw-relative", children: /* @__PURE__ */ r(
    Tt,
    {
      ...s,
      type: "text",
      className: l(
        "tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-2 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none",
        o
      ),
      onChange: (i) => t(i.target.value),
      onKeyDown: (i) => {
        i.key === "Enter" ? (a(), i.preventDefault()) : e(i);
      },
      onClick: n,
      ref: w
    }
  ) })
<<<<<<< HEAD
<<<<<<< HEAD
), xe = Yn(void 0);
function et() {
  const t = Hn(xe);
=======
), ke = qn(void 0);
function nt() {
  const t = Jn(ke);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
), ye = Hn(void 0);
function et() {
  const t = Un(ye);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ot = bt("", {
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
}), Dr = "layoutDirection";
function G() {
  const t = localStorage.getItem(Dr);
  return t === "rtl" ? t : "ltr";
}
<<<<<<< HEAD
const ye = B.Trigger, tn = B.Group, Br = B.Portal, Vr = B.Sub, Ko = B.RadioGroup;
function Ht({ variant: t = "default", ...e }) {
=======
const Ce = I.Trigger, rn = I.Group, Pr = I.Portal, Xr = I.Sub, ns = I.RadioGroup;
function Zt({ variant: t = "default", ...e }) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
}), Ar = "layoutDirection";
function F() {
  const t = localStorage.getItem(Ar);
  return t === "rtl" ? t : "ltr";
}
const Ne = B.Trigger, tn = B.Group, Or = B.Portal, Pr = B.Sub, Qo = B.RadioGroup;
function Jt({ variant: t = "default", ...e }) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const n = c.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
<<<<<<< HEAD
  return /* @__PURE__ */ r(xe.Provider, { value: n, children: /* @__PURE__ */ r(B.Root, { ...e }) });
=======
  return /* @__PURE__ */ r(ke.Provider, { value: n, children: /* @__PURE__ */ r(I.Root, { ...e }) });
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
}
const en = c.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const s = et();
  return /* @__PURE__ */ d(
<<<<<<< HEAD
    B.SubTrigger,
=======
    I.SubTrigger,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      ref: o,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        ot({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        n,
<<<<<<< HEAD
        /* @__PURE__ */ r(ge, { className: "tw-ml-auto tw-h-4 tw-w-4" })
=======
        /* @__PURE__ */ r(ve, { className: "tw-ml-auto tw-h-4 tw-w-4" })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      ]
    }
  );
});
<<<<<<< HEAD
en.displayName = B.SubTrigger.displayName;
const nn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  B.SubContent,
=======
an.displayName = I.SubTrigger.displayName;
const on = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  I.SubContent,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
nn.displayName = B.SubContent.displayName;
const Pt = c.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
  const s = G();
  return /* @__PURE__ */ r(B.Portal, { children: /* @__PURE__ */ r(
    B.Content,
=======
on.displayName = I.SubContent.displayName;
const Lt = c.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...a }, o) => {
  const i = $();
  return /* @__PURE__ */ r(I.Portal, { children: /* @__PURE__ */ r(
    I.Content,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
Pt.displayName = B.Content.displayName;
const Ne = c.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = G(), s = et();
  return /* @__PURE__ */ r(
    B.Item,
=======
Lt.displayName = I.Content.displayName;
const Se = c.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = $(), i = nt();
  return /* @__PURE__ */ r(
    I.Item,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      ref: a,
      className: l(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        ot({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: o
    }
  );
});
<<<<<<< HEAD
Ne.displayName = B.Item.displayName;
const ke = c.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const s = et();
  return /* @__PURE__ */ d(
    B.CheckboxItem,
=======
Se.displayName = I.Item.displayName;
const Re = c.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const i = nt();
  return /* @__PURE__ */ d(
    I.CheckboxItem,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      ref: o,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ot({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...a,
      children: [
<<<<<<< HEAD
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(B.ItemIndicator, { children: /* @__PURE__ */ r(kt, { className: "tw-h-4 tw-w-4" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(I.ItemIndicator, { children: /* @__PURE__ */ r(St, { className: "tw-h-4 tw-w-4" }) }) }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(B.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        e
      ]
    }
  );
});
<<<<<<< HEAD
ke.displayName = B.CheckboxItem.displayName;
const rn = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = et();
  return /* @__PURE__ */ d(
    B.RadioItem,
=======
Re.displayName = I.CheckboxItem.displayName;
const sn = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = nt();
  return /* @__PURE__ */ d(
    I.RadioItem,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        ot({ variant: o.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(B.ItemIndicator, { children: /* @__PURE__ */ r(fe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(I.ItemIndicator, { children: /* @__PURE__ */ r(xe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        e
      ]
    }
  );
});
<<<<<<< HEAD
rn.displayName = B.RadioItem.displayName;
const Kt = c.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  B.Label,
=======
sn.displayName = I.RadioItem.displayName;
const Qt = c.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
  I.Label,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: a,
    className: l("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
qt.displayName = B.Label.displayName;
const Xt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Kt.displayName = B.Label.displayName;
const jt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  B.Separator,
=======
Qt.displayName = I.Label.displayName;
const Yt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  I.Separator,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Xt.displayName = B.Separator.displayName;
function Ar({ className: t, ...e }) {
=======
Yt.displayName = I.Separator.displayName;
function jr({ className: t, ...e }) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
jt.displayName = B.Separator.displayName;
function Xr({ className: t, ...e }) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ r(
    "span",
    {
      className: l("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Xr.displayName = "DropdownMenuShortcut";
var jr = Object.defineProperty, Fr = (t, e, n) => e in t ? jr(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, R = (t, e, n) => Fr(t, typeof e != "symbol" ? e + "" : e, n);
const mt = [
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
], Ce = [
=======
], Te = [
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
], an = [
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
<<<<<<< HEAD
], je = Ur();
function Tt(t, e = !0) {
  return e && (t = t.toUpperCase()), t in je ? je[t] : 0;
}
function Se(t) {
  return Tt(t) > 0;
=======
], $e = Zr();
function Et(t, e = !0) {
  return e && (t = t.toUpperCase()), t in $e ? $e[t] : 0;
}
function _e(t) {
  return Et(t) > 0;
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
], Fe = Wr();
function _t(t, e = !0) {
  return e && (t = t.toUpperCase()), t in Fe ? Fe[t] : 0;
}
function Re(t) {
  return _t(t) > 0;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
}
function Gr(t) {
  const e = typeof t == "string" ? _t(t) : t;
  return e >= 40 && e <= 66;
}
function $r(t) {
  return (typeof t == "string" ? _t(t) : t) <= 39;
}
function on(t) {
  return t <= 66;
}
function Lr(t) {
  const e = typeof t == "string" ? _t(t) : t;
  return ln(e) && !on(e);
}
function* Yr() {
  for (let t = 1; t <= mt.length; t++) yield t;
}
<<<<<<< HEAD
<<<<<<< HEAD
const $r = 1, sn = mt.length;
function Lr() {
=======
const Hr = 1, sn = mt.length;
function Ur() {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Re(t, e = "***") {
=======
const Ur = 1, dn = gt.length;
function qr() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ee(t, e = "***") {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  const n = t - 1;
  return n < 0 || n >= mt.length ? e : mt[n];
}
function wn(t) {
  return t <= 0 || t > sn ? "******" : an[t - 1];
}
function qr(t) {
  return wn(_t(t));
}
<<<<<<< HEAD
function ln(t) {
  const e = typeof t == "number" ? Re(t) : t;
  return Se(e) && !Ce.includes(e);
}
<<<<<<< HEAD
function Hr(t) {
  const e = typeof t == "number" ? Re(t) : t;
  return Se(e) && Ce.includes(e);
=======
function pn(t) {
  const e = typeof t == "number" ? Ee(t) : t;
  return _e(e) && !Te.includes(e);
}
function Kr(t) {
  const e = typeof t == "number" ? Ee(t) : t;
  return _e(e) && Te.includes(e);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
}
function qr(t) {
  return an[t - 1].includes("*obsolete*");
}
function Ur() {
=======
function Jr(t) {
  const e = typeof t == "number" ? Te(t) : t;
  return Re(e) && Se.includes(e);
}
function Kr(t) {
  return an[t - 1].includes("*obsolete*");
}
function Wr() {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const t = {};
  for (let e = 0; e < mt.length; e++)
    t[mt[e]] = e + 1;
  return t;
}
<<<<<<< HEAD
const j = {
  allBookIds: mt,
<<<<<<< HEAD
  nonCanonicalIds: Ce,
  bookIdToNumber: Tt,
  isBookIdValid: Se,
  isBookNT: Xr,
  isBookOT: jr,
=======
  nonCanonicalIds: Se,
  bookIdToNumber: _t,
  isBookIdValid: Re,
  isBookNT: Gr,
  isBookOT: $r,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  isBookOTNT: on,
  isBookDC: Lr,
  allBookNumbers: Yr,
  firstBook: Hr,
  lastBook: sn,
<<<<<<< HEAD
  extraBooks: Lr,
  bookNumberToId: Re,
=======
  extraBooks: Ur,
  bookNumberToId: Te,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  bookNumberToEnglishName: wn,
  bookIdToEnglishName: qr,
  isCanonical: ln,
<<<<<<< HEAD
  isExtraMaterial: Hr,
  isObsolete: qr
=======
const O = {
  allBookIds: gt,
  nonCanonicalIds: Te,
  bookIdToNumber: Et,
  isBookIdValid: _e,
  isBookNT: $r,
  isBookOT: Lr,
  isBookOTNT: ln,
  isBookDC: Yr,
  allBookNumbers: Hr,
  firstBook: Ur,
  lastBook: dn,
  extraBooks: qr,
  bookNumberToId: Ee,
  bookNumberToEnglishName: cn,
  bookIdToEnglishName: Jr,
  isCanonical: pn,
  isExtraMaterial: Kr,
  isObsolete: Wr
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  isExtraMaterial: Jr,
  isObsolete: Kr
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
};
var nt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(nt || {});
const J = class {
  // private versInfo: Versification;
  constructor(e) {
    if (R(this, "name"), R(this, "fullPath"), R(this, "isPresent"), R(this, "hasVerseSegments"), R(this, "isCustomized"), R(this, "baseVersification"), R(this, "scriptureBooks"), R(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = nt[e]) : (this._type = e, this.name = nt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
<<<<<<< HEAD
R(J, "Original", new J(nt.Original)), R(J, "Septuagint", new J(nt.Septuagint)), R(J, "Vulgate", new J(nt.Vulgate)), R(J, "English", new J(nt.English)), R(J, "RussianProtestant", new J(nt.RussianProtestant)), R(J, "RussianOrthodox", new J(nt.RussianOrthodox));
let pt = J;
function Fe(t, e) {
=======
S(J, "Original", new J(rt.Original)), S(J, "Septuagint", new J(rt.Septuagint)), S(J, "Vulgate", new J(rt.Vulgate)), S(J, "English", new J(rt.English)), S(J, "RussianProtestant", new J(rt.RussianProtestant)), S(J, "RussianOrthodox", new J(rt.RussianOrthodox));
let mt = J;
function Le(t, e) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  const n = e[0];
  for (let a = 1; a < e.length; a++)
    t = t.split(e[a]).join(n);
  return t.split(n);
}
var dn = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(dn || {});
const Y = class z {
  constructor(e, n, a, o) {
    if (R(this, "firstChapter"), R(this, "lastChapter"), R(this, "lastVerse"), R(this, "hasSegmentsDefined"), R(this, "text"), R(this, "BBBCCCVVVS"), R(this, "longHashCode"), R(this, "versification"), R(this, "rtlMark", "‏"), R(this, "_bookNum", 0), R(this, "_chapterNum", 0), R(this, "_verseNum", 0), R(this, "_verse"), a == null && o == null)
      if (e != null && typeof e == "string") {
        const s = e, w = n != null && n instanceof pt ? n : void 0;
        this.setEmpty(w), this.parse(s);
      } else if (e != null && typeof e == "number") {
        const s = n != null && n instanceof pt ? n : void 0;
        this.setEmpty(s), this._verseNum = e % z.chapterDigitShifter, this._chapterNum = Math.floor(
          e % z.bookDigitShifter / z.chapterDigitShifter
        ), this._bookNum = Math.floor(e / z.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof z) {
          const s = e;
          this._bookNum = s.bookNum, this._chapterNum = s.chapterNum, this._verseNum = s.verseNum, this._verse = s.verse, this.versification = s.versification;
        } else {
          if (e == null) return;
          const s = e instanceof pt ? e : z.defaultVersification;
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
<<<<<<< HEAD
      if (a instanceof _t)
=======
      if (a instanceof zt)
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
    const { book: n, chapterNum: a, verseNum: o, verse: s, versificationStr: w } = e, i = s || o.toString();
    let p;
    return w && (p = new pt(w)), n ? new z(n, a.toString(), i, p) : new z();
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
<<<<<<< HEAD
    return j.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = j.bookIdToNumber(e);
=======
    return O.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = O.bookIdToNumber(e);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
<<<<<<< HEAD
    if (e <= 0 || e > j.lastBook)
      throw new _t(
=======
    if (e <= 0 || e > O.lastBook)
      throw new It(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    if (e <= 0 || e > X.lastBook)
      throw new zt(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
    this.versification = this.versification != null ? new pt(e) : void 0;
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
          const w = +s[1].trim();
          this.versification = new pt(nt[w]);
        } catch {
          throw new zt("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new zt("Invalid reference : " + e);
    const a = n[1].split(":"), o = +a[0];
<<<<<<< HEAD
<<<<<<< HEAD
    if (a.length !== 2 || j.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !z.isVerseParseable(a[1]))
      throw new _t("Invalid reference : " + e);
=======
    if (a.length !== 2 || O.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !T.isVerseParseable(a[1]))
      throw new It("Invalid reference : " + e);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    if (a.length !== 2 || X.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !z.isVerseParseable(a[1]))
      throw new zt("Invalid reference : " + e);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
    const o = [], s = Fe(this._verse, a);
    for (const w of s.map((i) => Fe(i, n))) {
      const i = this.clone();
      i.verse = w[0];
      const p = i.verseNum;
      if (o.push(i), w.length > 1) {
        const u = this.clone();
        if (u.verse = w[1], !e)
<<<<<<< HEAD
          for (let m = p + 1; m < u.verseNum; m++) {
            const f = new z(
=======
          for (let g = p + 1; g < u.verseNum; g++) {
            const b = new z(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
              this._bookNum,
              this._chapterNum,
              m,
=======
    const o = [], i = Le(this._verse, a);
    for (const w of i.map((s) => Le(s, n))) {
      const s = this.clone();
      s.verse = w[0];
      const p = s.verseNum;
      if (o.push(s), w.length > 1) {
        const u = this.clone();
        if (u.verse = w[1], !e)
          for (let h = p + 1; h < u.verseNum; h++) {
            const f = new T(
              this._bookNum,
              this._chapterNum,
              h,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let a = 0;
    for (const o of this.allVerses(!0, e, n)) {
      const s = o.internalValid;
      if (s !== 0)
        return s;
      const w = o.BBBCCCVVV;
      if (a > w)
        return 3;
      if (a === w)
        return 4;
      a = w;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
<<<<<<< HEAD
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > j.lastBook ? 2 : (j.isCanonical(this._bookNum), 0);
=======
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > O.lastBook ? 2 : (O.isCanonical(this._bookNum), 0);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  }
  setEmpty(e = z.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, a) {
<<<<<<< HEAD
    this.bookNum = j.bookIdToNumber(e), this.chapter = n, this.verse = a;
=======
    this.bookNum = O.bookIdToNumber(e), this.chapter = n, this.verse = a;
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  }
};
R(Y, "defaultVersification", pt.English), R(Y, "verseRangeSeparator", "-"), R(Y, "verseSequenceIndicator", ","), R(Y, "verseRangeSeparators", [Y.verseRangeSeparator]), R(Y, "verseSequenceIndicators", [Y.verseSequenceIndicator]), R(Y, "chapterDigitShifter", 1e3), R(Y, "bookDigitShifter", Y.chapterDigitShifter * Y.chapterDigitShifter), R(Y, "bcvMaxValue", Y.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
R(Y, "ValidStatusType", dn);
class zt extends Error {
}
<<<<<<< HEAD
<<<<<<< HEAD
const Jr = $t(
=======
const Qr = Jt(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
const Zr = Ht(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: a,
    handleKeyDown: o,
    bookType: s,
    children: w
<<<<<<< HEAD
  }, i) => /* @__PURE__ */ d(
    Ne,
=======
  }, s) => /* @__PURE__ */ d(
    Se,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      ref: i,
      textValue: t,
      className: l(
        "tw-mx-1 tw-flex-col tw-items-start tw-px-1 tw-font-normal tw-text-foreground/80",
        {
          // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
          "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": n
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
<<<<<<< HEAD
            children: j.bookIdToEnglishName(t)
=======
            children: O.bookIdToEnglishName(t)
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          }
        ),
        n && /* @__PURE__ */ r("div", { children: w })
      ]
    },
    t
  )
);
function Qr({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: a,
  handleHighlightedChapter: o
}) {
  const s = Array.from({ length: e }, (i, p) => p + 1), w = tt(
    (i) => {
      o(i);
    },
    [o]
  );
  return /* @__PURE__ */ r("div", { className: l("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: s.map((i) => /* @__PURE__ */ r(
    "div",
    {
      className: l(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": i === n,
          "tw-bg-amber-200": i === a
        }
      ),
      onClick: (p) => {
        p.preventDefault(), p.stopPropagation(), t(i);
      },
      role: "button",
      onKeyDown: (p) => {
        p.key === "Enter" && t(i);
      },
      tabIndex: 0,
      onMouseMove: () => w(i),
      children: i
    },
    i
  )) });
}
<<<<<<< HEAD
<<<<<<< HEAD
const Te = j.allBookIds.filter((t) => !j.isObsolete(j.bookIdToNumber(t))), Wr = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Ge = ["OT", "NT", "DC"], Zr = 96, Qr = [
=======
const ze = O.allBookIds.filter((t) => !O.isObsolete(O.bookIdToNumber(t))), ea = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Ye = ["OT", "NT", "DC"], na = 96, ra = [
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
const _e = X.allBookIds.filter((t) => !X.isObsolete(X.bookIdToNumber(t))), ta = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, $e = ["OT", "NT", "DC"], ea = 96, na = [
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
<<<<<<< HEAD
<<<<<<< HEAD
], Et = (t) => yr(j.bookIdToNumber(t));
function ta() {
  return Te.map((e) => j.bookIdToEnglishName(e));
=======
], Vt = (t) => Cr(O.bookIdToNumber(t));
function aa() {
  return ze.map((e) => O.bookIdToEnglishName(e));
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
], Et = (t) => kr(X.bookIdToNumber(t));
function ra() {
  return _e.map((e) => X.bookIdToEnglishName(e));
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
}
function aa(t) {
  return ra().includes(t);
}
function oa(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
<<<<<<< HEAD
<<<<<<< HEAD
  if (ea(e))
    return Te.find((a) => j.bookIdToEnglishName(a) === e);
=======
  if (oa(e))
    return ze.find((a) => O.bookIdToEnglishName(a) === e);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  if (aa(e))
    return _e.find((a) => X.bookIdToEnglishName(a) === e);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
}
function es({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: a
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const o = G(), [s, w] = P(""), [i, p] = P(t.book), [u, m] = P(t.chapterNum ?? 0), [f, g] = P(t.book), [h, v] = P(!1), [C, b] = P(h), x = K(void 0), N = K(void 0), T = K(void 0), X = tt(
    (S) => {
      const M = a ? a() : Te;
      return {
        OT: M.filter((O) => j.isBookOT(O)),
        NT: M.filter((O) => j.isBookNT(O)),
        DC: M.filter((O) => j.isBookDC(O))
=======
  const o = F(), [s, w] = P(""), [i, p] = P(t.book), [u, g] = P(t.chapterNum ?? 0), [b, h] = P(t.book), [m, f] = P(!1), [k, C] = P(m), y = K(void 0), x = K(void 0), E = K(void 0), $ = tt(
    (S) => {
      const D = a ? a() : _e;
      return {
        OT: D.filter((O) => X.isBookOT(O)),
        NT: D.filter((O) => X.isBookNT(O)),
        DC: D.filter((O) => X.isBookDC(O))
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      }[S].filter((O) => {
        const y = j.bookIdToEnglishName(O).toLowerCase(), E = s.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return y.includes(E) || // Match book name
        O.toLowerCase().includes(E);
=======
  const o = $(), [i, w] = B(""), [s, p] = B(t.book), [u, h] = B(t.chapterNum ?? 0), [f, g] = B(t.book), [m, b] = B(!1), [v, y] = B(m), C = Z(void 0), x = Z(void 0), z = Z(void 0), j = et(
    (k) => {
      const E = a ? a() : ze;
      return {
        OT: E.filter((A) => O.isBookOT(A)),
        NT: E.filter((A) => O.isBookNT(A)),
        DC: E.filter((A) => O.isBookDC(A))
      }[k].filter((A) => {
        const G = O.bookIdToEnglishName(A).toLowerCase(), F = i.replace(/[^a-zA-Z]/g, "").toLowerCase();
        return G.includes(F) || // Match book name
        A.toLowerCase().includes(F);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      });
    },
    [s, a]
    // Only recompute when relevant values change
<<<<<<< HEAD
  ), U = (S) => {
    w(S);
  }, lt = K(!1), dt = tt((S) => {
    if (lt.current) {
      lt.current = !1;
      return;
    }
<<<<<<< HEAD
    v(S);
  }, []), k = tt(
    (S, M, O, y) => {
      if (m(t.book !== S ? 1 : t.chapterNum), M || Et(S) === -1) {
=======
    f(S);
  }, []), N = tt(
    (S, D, O, v) => {
      if (g(t.book !== S ? 1 : t.chapterNum), D || Et(S) === -1) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        e({
          book: S,
          chapterNum: O ?? 1,
          verseNum: y ?? 1
        }), v(!1), w("");
        return;
      }
<<<<<<< HEAD
      p(i !== S ? S : ""), v(!M);
=======
      p(i !== S ? S : ""), f(!D);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    },
    [e, t.book, t.chapterNum, i]
  ), _ = (S) => {
    S <= 0 || S > Et(i) || k(i, !0, S);
  }, L = tt(() => {
<<<<<<< HEAD
    Qr.forEach((S) => {
      const M = S.exec(s);
      if (M) {
        const [O, y = void 0, E = void 0] = M.slice(1), Z = na(O);
        (j.isBookIdValid(O) || Z) && k(
          Z ?? O,
=======
  ), tt = (k) => {
    w(k);
  }, ot = Z(!1), zt = et((k) => {
    if (ot.current) {
      ot.current = !1;
      return;
    }
    b(k);
  }, []), N = et(
    (k, E, A, G) => {
      if (h(t.book !== k ? 1 : t.chapterNum), E || Vt(k) === -1) {
        e({
          book: k,
          chapterNum: A ?? 1,
          verseNum: G ?? 1
        }), b(!1), w("");
        return;
      }
      p(s !== k ? k : ""), b(!E);
    },
    [e, t.book, t.chapterNum, s]
  ), _ = (k) => {
    k <= 0 || k > Vt(s) || N(s, !0, k);
  }, K = et(() => {
    ra.forEach((k) => {
      const E = k.exec(i);
      if (E) {
        const [A, G = void 0, F = void 0] = E.slice(1), Dt = sa(A);
        (O.isBookIdValid(A) || Dt) && N(
          Dt ?? A,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          !0,
          y ? parseInt(y, 10) : 1,
          E ? parseInt(E, 10) : 1
        );
      }
<<<<<<< HEAD
    }), x.current.blur();
  }, [k, s]), A = tt(
    (S) => {
      h ? (S.key === "ArrowDown" || S.key === "ArrowUp") && (T != null && T.current ? T.current.focus() : N.current && N.current.focus(), S.preventDefault()) : v(!0);
    },
    [h]
  ), te = (S) => {
    const { key: M } = S;
    M === "ArrowRight" || M === "ArrowLeft" || M === "ArrowDown" || M === "ArrowUp" || M === "Enter" || x.current.dispatchEvent(new KeyboardEvent("keydown", { key: M }));
  }, ee = (S) => {
    const { key: M } = S;
    if (f === i) {
      if (M === "Enter") {
        S.preventDefault(), k(i, !0, u);
        return;
      }
      const O = M === "ArrowRight" && !o || M === "ArrowRight" && o === "ltr" || M === "ArrowLeft" && o === "rtl", y = M === "ArrowLeft" && !o || M === "ArrowLeft" && o === "ltr" || M === "ArrowRight" && o === "rtl";
      let E = 0;
=======
    na.forEach((S) => {
      const D = S.exec(s);
      if (D) {
        const [O, v = void 0, _ = void 0] = D.slice(1), Z = oa(O);
        (X.isBookIdValid(O) || Z) && N(
          Z ?? O,
          !0,
          v ? parseInt(v, 10) : 1,
          _ ? parseInt(_, 10) : 1
        );
      }
    }), y.current.blur();
  }, [N, s]), A = tt(
    (S) => {
      m ? (S.key === "ArrowDown" || S.key === "ArrowUp") && (E != null && E.current ? E.current.focus() : x.current && x.current.focus(), S.preventDefault()) : f(!0);
    },
    [m]
  ), ee = (S) => {
    const { key: D } = S;
    D === "ArrowRight" || D === "ArrowLeft" || D === "ArrowDown" || D === "ArrowUp" || D === "Enter" || y.current.dispatchEvent(new KeyboardEvent("keydown", { key: D }));
  }, ne = (S) => {
    const { key: D } = S;
    if (b === i) {
      if (D === "Enter") {
        S.preventDefault(), N(i, !0, u);
        return;
      }
      const O = D === "ArrowRight" && !o || D === "ArrowRight" && o === "ltr" || D === "ArrowLeft" && o === "rtl", v = D === "ArrowLeft" && !o || D === "ArrowLeft" && o === "ltr" || D === "ArrowRight" && o === "rtl";
      let _ = 0;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      if (O)
        if (u < Et(f))
          E = 1;
        else {
          S.preventDefault();
          return;
        }
      else if (y)
        if (u > 1)
          E = -1;
        else {
          S.preventDefault();
          return;
        }
<<<<<<< HEAD
      else M === "ArrowDown" ? E = 6 : M === "ArrowUp" && (E = -6);
      u + E <= 0 || u + E > Et(f) ? m(0) : E !== 0 && (m(u + E), S.preventDefault());
=======
      else D === "ArrowDown" ? _ = 6 : D === "ArrowUp" && (_ = -6);
      u + _ <= 0 || u + _ > Et(b) ? g(0) : _ !== 0 && (g(u + _), S.preventDefault());
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    }
  };
  return wt(() => {
    i === f ? i === t.book ? m(t.chapterNum) : m(1) : m(0);
  }, [f, t.book, t.chapterNum, i]), Xe(() => {
    b(h);
  }, [h]), Xe(() => {
    const S = setTimeout(() => {
<<<<<<< HEAD
      if (C && N.current && T.current && !s) {
        const O = T.current.offsetTop - Zr;
        N.current.scrollTo({ top: O, behavior: "instant" });
=======
      if (k && x.current && E.current && !s) {
        const O = E.current.offsetTop - ea;
        x.current.scrollTo({ top: O, behavior: "instant" });
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      }
    }, 10);
    return () => {
      clearTimeout(S);
    };
<<<<<<< HEAD
  }, [C, s]), /* @__PURE__ */ r("div", { className: "pr-twp tw-flex tw-bg-transparent", children: /* @__PURE__ */ d(Ht, { modal: !1, open: h, onOpenChange: dt, children: [
    /* @__PURE__ */ r(ye, { asChild: !0, children: /* @__PURE__ */ r(
      Ir,
=======
  }, [k, s]), /* @__PURE__ */ r("div", { className: "pr-twp tw-flex tw-bg-transparent", children: /* @__PURE__ */ d(Jt, { modal: !1, open: m, onOpenChange: dt, children: [
    /* @__PURE__ */ r(Ne, { asChild: !0, children: /* @__PURE__ */ r(
      Vr,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      {
        ref: x,
        value: s,
        handleSearch: U,
        handleKeyDown: A,
        handleOnClick: () => {
<<<<<<< HEAD
          p(t.book), g(t.book), m(t.chapterNum > 0 ? t.chapterNum : 0), v(!0), w(It(t, "English")), x.current.focus();
=======
    }), C.current.blur();
  }, [N, i]), P = et(
    (k) => {
      m ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (z != null && z.current ? z.current.focus() : x.current && x.current.focus(), k.preventDefault()) : b(!0);
    },
    [m]
  ), Mt = (k) => {
    const { key: E } = k;
    E === "ArrowRight" || E === "ArrowLeft" || E === "ArrowDown" || E === "ArrowUp" || E === "Enter" || C.current.dispatchEvent(new KeyboardEvent("keydown", { key: E }));
  }, pt = (k) => {
    const { key: E } = k;
    if (f === s) {
      if (E === "Enter") {
        k.preventDefault(), N(s, !0, u);
        return;
      }
      const A = E === "ArrowRight" && !o || E === "ArrowRight" && o === "ltr" || E === "ArrowLeft" && o === "rtl", G = E === "ArrowLeft" && !o || E === "ArrowLeft" && o === "ltr" || E === "ArrowRight" && o === "rtl";
      let F = 0;
      if (A)
        if (u < Vt(f))
          F = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (G)
        if (u > 1)
          F = -1;
        else {
          k.preventDefault();
          return;
        }
      else E === "ArrowDown" ? F = 6 : E === "ArrowUp" && (F = -6);
      u + F <= 0 || u + F > Vt(f) ? h(0) : F !== 0 && (h(u + F), k.preventDefault());
    }
  };
  return ct(() => {
    s === f ? s === t.book ? h(t.chapterNum) : h(1) : h(0);
  }, [f, t.book, t.chapterNum, s]), Ge(() => {
    y(m);
  }, [m]), Ge(() => {
    const k = setTimeout(() => {
      if (v && x.current && z.current && !i) {
        const A = z.current.offsetTop - na;
        x.current.scrollTo({ top: A, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [v, i]), /* @__PURE__ */ r("div", { className: "pr-twp tw-flex tw-bg-transparent", children: /* @__PURE__ */ d(Zt, { modal: !1, open: m, onOpenChange: zt, children: [
    /* @__PURE__ */ r(Ce, { asChild: !0, children: /* @__PURE__ */ r(
      Ar,
      {
        ref: C,
        value: i,
        handleSearch: tt,
        handleKeyDown: P,
        handleOnClick: () => {
          p(t.book), g(t.book), h(t.chapterNum > 0 ? t.chapterNum : 0), b(!0), w(Ot(t, "English")), C.current.focus();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
          p(t.book), h(t.book), g(t.chapterNum > 0 ? t.chapterNum : 0), f(!0), w(xt(t, "English")), y.current.focus();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        },
        onFocus: () => {
          lt.current = !0;
        },
        onBlur: () => {
          w("");
        },
        handleSubmit: L,
<<<<<<< HEAD
        placeholder: It(t, "English"),
=======
        placeholder: xt(t, "English"),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        className: n
      }
    ) }),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      Pt,
=======
      Lt,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: te,
        align: o === "ltr" ? "start" : "end",
<<<<<<< HEAD
<<<<<<< HEAD
        ref: N,
        children: /* @__PURE__ */ r("div", { className: "rtl:tw-ps-2", children: Ge.map((S, M) => {
          const O = X(S);
          return O.length > 0 && /* @__PURE__ */ d("div", { children: [
            /* @__PURE__ */ r(qt, { className: "tw-font-semibold tw-text-foreground/80", children: Wr[S] }),
            O.map((y) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              Jr,
=======
        ref: x,
        children: /* @__PURE__ */ r("div", { className: "rtl:tw-ps-2", children: $e.map((S, D) => {
          const O = $(S);
          return O.length > 0 && /* @__PURE__ */ d("div", { children: [
            /* @__PURE__ */ r(Kt, { className: "tw-font-semibold tw-text-foreground/80", children: ta[S] }),
            O.map((v) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              Zr,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
              {
                bookId: y,
                handleSelectBook: () => k(y, !1),
                isSelected: i === y,
                handleHighlightBook: () => g(y),
                handleKeyDown: ee,
                bookType: S,
<<<<<<< HEAD
                ref: (E) => {
                  i === y && (T.current = E);
=======
        ref: x,
        children: /* @__PURE__ */ r("div", { className: "rtl:tw-ps-2", children: Ye.map((k, E) => {
          const A = j(k);
          return A.length > 0 && /* @__PURE__ */ d("div", { children: [
            /* @__PURE__ */ r(Qt, { className: "tw-font-semibold tw-text-foreground/80", children: ea[k] }),
            A.map((G) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              Qr,
              {
                bookId: G,
                handleSelectBook: () => N(G, !1),
                isSelected: s === G,
                handleHighlightBook: () => g(G),
                handleKeyDown: pt,
                bookType: k,
                ref: (F) => {
                  s === G && (z.current = F);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
                ref: (_) => {
                  i === v && (E.current = _);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
                },
                children: /* @__PURE__ */ r(
                  Qr,
                  {
                    handleSelectChapter: _,
<<<<<<< HEAD
                    endChapter: Et(y),
                    activeChapter: t.book === y ? t.chapterNum : 0,
                    highlightedChapter: u,
                    handleHighlightedChapter: (E) => {
                      m(E);
=======
                    endChapter: Vt(G),
                    activeChapter: t.book === G ? t.chapterNum : 0,
                    highlightedChapter: u,
                    handleHighlightedChapter: (F) => {
                      h(F);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
                    }
                  }
                )
              }
<<<<<<< HEAD
<<<<<<< HEAD
            ) }, y)),
            Ge.length - 1 !== M ? /* @__PURE__ */ r(Xt, {}) : void 0
=======
            ) }, v)),
            $e.length - 1 !== D ? /* @__PURE__ */ r(jt, {}) : void 0
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          ] }, S);
=======
            ) }, G)),
            Ye.length - 1 !== E ? /* @__PURE__ */ r(Yt, {}) : void 0
          ] }, k);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        }) })
      }
    )
  ] }) });
}
const sa = bt(
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
), D = c.forwardRef(
<<<<<<< HEAD
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, s) => /* @__PURE__ */ r(a ? Ct : "button", { className: l(ra({ variant: e, size: n, className: t })), ref: s, ...o })
);
D.displayName = "Button";
const aa = ft(
=======
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, i) => /* @__PURE__ */ r(a ? Rt : "button", { className: l(ia({ variant: e, size: n, className: t })), ref: i, ...o })
);
D.displayName = "Button";
const wa = vt(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), $ = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Ue.Root, { ref: n, className: l("pr-twp", aa(), t), ...e }));
$.displayName = Ue.Root.displayName;
=======
), I = c.forwardRef(
  ({ className: t, variant: e, size: n, asChild: a = !1, ...o }, s) => /* @__PURE__ */ r(a ? St : "button", { className: l(sa({ variant: e, size: n, className: t })), ref: s, ...o })
);
I.displayName = "Button";
const ia = bt(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), G = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(qe.Root, { ref: n, className: l("pr-twp", ia(), t), ...e }));
G.displayName = qe.Root.displayName;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
const cn = c.forwardRef(({ className: t, ...e }, n) => {
  const a = G();
  return /* @__PURE__ */ r(
    Bt.Root,
    {
      className: l("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: a
    }
  );
});
<<<<<<< HEAD
cn.displayName = Bt.Root.displayName;
const ce = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Bt.Item,
=======
mn.displayName = Xt.Root.displayName;
const me = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Xt.Item,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
<<<<<<< HEAD
    children: /* @__PURE__ */ r(Bt.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(fe, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
<<<<<<< HEAD
ce.displayName = Bt.Item.displayName;
const pn = Vt.Root, un = Vt.Trigger, _e = c.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const s = G();
=======
pe.displayName = Bt.Item.displayName;
const pn = Vt.Root, un = Vt.Trigger, ze = c.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const s = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ r(Vt.Portal, { children: /* @__PURE__ */ r(
    Vt.Content,
=======
    children: /* @__PURE__ */ r(Xt.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(xe, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
me.displayName = Xt.Item.displayName;
const hn = jt.Root, gn = jt.Trigger, Me = c.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...a }, o) => {
  const i = $();
  return /* @__PURE__ */ r(jt.Portal, { children: /* @__PURE__ */ r(
    jt.Content,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
_e.displayName = Vt.Content.displayName;
const oa = rt.Portal, mn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
ze.displayName = Vt.Content.displayName;
const wa = rt.Portal, mn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  rt.Overlay,
=======
Me.displayName = jt.Content.displayName;
const la = at.Portal, fn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Overlay,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
mn.displayName = rt.Overlay.displayName;
<<<<<<< HEAD
const sa = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = G();
  return /* @__PURE__ */ d(oa, { children: [
=======
const la = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = F();
  return /* @__PURE__ */ d(wa, { children: [
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    /* @__PURE__ */ r(mn, {}),
    /* @__PURE__ */ d(
      rt.Content,
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
            rt.Close,
            {
              className: l(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": o === "ltr" },
                { "tw-left-4": o === "rtl" }
              ),
              children: [
<<<<<<< HEAD
                /* @__PURE__ */ r(be, { className: "tw-h-4 tw-w-4" }),
=======
                /* @__PURE__ */ r(ye, { className: "tw-h-4 tw-w-4" }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
la.displayName = rt.Content.displayName;
const da = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Title,
  {
    ref: n,
    className: l("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
da.displayName = rt.Title.displayName;
const ca = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Description,
  {
    ref: n,
    className: l("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
wa.displayName = rt.Description.displayName;
=======
ca.displayName = rt.Description.displayName;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
const Ee = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  H,
=======
pa.displayName = at.Description.displayName;
const De = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
Ee.displayName = H.displayName;
const ze = c.forwardRef(({ className: t, ...e }, n) => {
  const a = G();
=======
De.displayName = U.displayName;
const Ie = c.forwardRef(({ className: t, ...e }, n) => {
  const a = $();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Ee.displayName = H.displayName;
const De = c.forwardRef(({ className: t, ...e }, n) => {
  const a = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: a, children: [
    /* @__PURE__ */ r(He, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      H.Input,
=======
      U.Input,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
ze.displayName = H.Input.displayName;
=======
De.displayName = H.Input.displayName;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
const Me = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  H.List,
=======
Ie.displayName = U.Input.displayName;
const Ve = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.List,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
Me.displayName = H.List.displayName;
const Ie = c.forwardRef((t, e) => /* @__PURE__ */ r(H.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Ie.displayName = H.Empty.displayName;
const hn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  H.Group,
=======
Ve.displayName = U.List.displayName;
const Be = c.forwardRef((t, e) => /* @__PURE__ */ r(U.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Be.displayName = U.Empty.displayName;
const bn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Group,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
hn.displayName = H.Group.displayName;
const pa = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  H.Separator,
=======
bn.displayName = U.Group.displayName;
const ua = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Separator,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
la.displayName = H.Separator.displayName;
const De = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
pa.displayName = H.Separator.displayName;
const Be = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  H.Item,
=======
ua.displayName = U.Separator.displayName;
const Ae = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Item,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
De.displayName = H.Item.displayName;
function da(t) {
=======
Be.displayName = H.Item.displayName;
function ua(t) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function pe({
=======
Ae.displayName = U.Item.displayName;
function ma(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function he({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  id: t,
  options: e = [],
  className: n,
  buttonClassName: a,
  popoverContentClassName: o,
  value: s,
  onChange: w = () => {
  },
  getOptionLabel: i = ua,
  icon: p = void 0,
  buttonPlaceholder: u = "",
<<<<<<< HEAD
  textPlaceholder: m = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: h = "start",
  isDisabled: v = !1,
  ...C
}) {
  const [b, x] = P(!1);
  return /* @__PURE__ */ d(pn, { open: b, onOpenChange: x, ...C, children: [
    /* @__PURE__ */ r(un, { asChild: !0, children: /* @__PURE__ */ d(
=======
  textPlaceholder: h = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: m = "start",
  isDisabled: b = !1,
  ...v
}) {
  const [y, C] = B(!1);
  return /* @__PURE__ */ d(hn, { open: y, onOpenChange: C, ...v, children: [
    /* @__PURE__ */ r(gn, { asChild: !0, children: /* @__PURE__ */ d(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      D,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": y,
        id: t,
        className: l(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          a ?? n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            p && /* @__PURE__ */ r("div", { className: "tw-pe-2", children: p }),
<<<<<<< HEAD
            /* @__PURE__ */ r("span", { className: l("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: s ? i(s) : u })
=======
            /* @__PURE__ */ r("span", { className: l("tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap"), children: i ? s(i) : u })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          ] }),
          /* @__PURE__ */ r(qe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
      _e,
=======
      Me,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      {
        align: m,
        className: l("tw-w-[200px] tw-p-0", o),
<<<<<<< HEAD
        children: /* @__PURE__ */ d(Ee, { children: [
          /* @__PURE__ */ r(ze, { placeholder: m, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Ie, { children: f }),
          /* @__PURE__ */ r(Me, { children: e.map((N) => /* @__PURE__ */ d(
            De,
=======
        children: /* @__PURE__ */ d(De, { children: [
          /* @__PURE__ */ r(Ie, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Be, { children: f }),
          /* @__PURE__ */ r(Ve, { children: e.map((x) => /* @__PURE__ */ d(
            Ae,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
      ze,
      {
        align: m,
        className: l("tw-w-[200px] tw-p-0", o),
        children: /* @__PURE__ */ d(Ee, { children: [
          /* @__PURE__ */ r(De, { placeholder: g, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(Ie, { children: b }),
          /* @__PURE__ */ r(Me, { children: e.map((x) => /* @__PURE__ */ d(
            Be,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
            {
              value: i(N),
              onSelect: () => {
<<<<<<< HEAD
                w(N), x(!1);
=======
                w(x), C(!1);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
              },
              children: [
                /* @__PURE__ */ r(
                  Ct,
                  {
                    className: l("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !s || i(s) !== i(N)
                    })
                  }
                ),
                i(N)
              ]
            },
            i(N)
          )) })
        ] })
      }
    )
  ] });
}
function ma({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: a,
  isDisabled: o = !1,
  chapterCount: s
}) {
<<<<<<< HEAD
  const w = W(
    () => Array.from({ length: s }, (u, m) => m + 1),
    [s]
=======
  const w = Q(
    () => Array.from({ length: i }, (u, h) => h + 1),
    [i]
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  );
<<<<<<< HEAD
  return /* @__PURE__ */ d(Nt, { children: [
    /* @__PURE__ */ r($, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
=======
  return /* @__PURE__ */ d(kt, { children: [
    /* @__PURE__ */ r(G, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    /* @__PURE__ */ r(
<<<<<<< HEAD
      pe,
=======
      he,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      {
        isDisabled: o,
        onChange: (u) => {
          n(u), u > e && a(u);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: w,
        getOptionLabel: (u) => u.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r($, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
<<<<<<< HEAD
      pe,
=======
      he,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      {
        isDisabled: o,
        onChange: (u) => {
          a(u), u < t && n(u);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: w,
        getOptionLabel: (u) => u.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var ha = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(ha || {});
const ns = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
<<<<<<< HEAD
<<<<<<< HEAD
]), ae = (t, e) => t[e] ?? e;
function ts({
=======
]), ie = (t, e) => t[e] ?? e;
function ss({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
]), oe = (t, e) => t[e] ?? e;
function rs({
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: a,
  chapterCount: o,
  endChapter: s,
  handleSelectEndChapter: w,
  startChapter: i,
  handleSelectStartChapter: p,
  localizedStrings: u
}) {
<<<<<<< HEAD
  const m = ae(u, "%webView_bookSelector_currentBook%"), f = ae(u, "%webView_bookSelector_choose%"), g = ae(u, "%webView_bookSelector_chooseBooks%"), [h, v] = P(
    "current book"
    /* CURRENT_BOOK */
  ), C = (b) => {
    v(b), t(b);
=======
  const h = ie(u, "%webView_bookSelector_currentBook%"), f = ie(u, "%webView_bookSelector_choose%"), g = ie(u, "%webView_bookSelector_chooseBooks%"), [m, b] = B(
    "current book"
    /* CURRENT_BOOK */
  ), v = (y) => {
    b(y), t(y);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  };
  return /* @__PURE__ */ r(
    cn,
    {
      className: "pr-twp tw-flex",
<<<<<<< HEAD
      value: h,
      onValueChange: (b) => C(b),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(ce, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r($, { className: "tw-ms-1", children: m })
=======
      value: m,
      onValueChange: (y) => v(y),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(me, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(L, { className: "tw-ms-1", children: h })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          ] }),
          /* @__PURE__ */ r($, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            ma,
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: p,
              handleSelectEndChapter: w,
              chapterCount: o,
              startChapter: i,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
<<<<<<< HEAD
            /* @__PURE__ */ r(ce, {
=======
            /* @__PURE__ */ r(me, {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r($, { className: "tw-ms-1", children: g })
          ] }),
<<<<<<< HEAD
          /* @__PURE__ */ r($, { className: "tw-flex tw-items-center", children: a.map((b) => j.bookIdToEnglishName(b)).join(", ") }),
=======
          /* @__PURE__ */ r(L, { className: "tw-flex tw-items-center", children: a.map((y) => O.bookIdToEnglishName(y)).join(", ") }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          /* @__PURE__ */ r(
            D,
            {
              disabled: m === "current book",
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
<<<<<<< HEAD
function ua({ table: t }) {
  return /* @__PURE__ */ d(Ht, { children: [
    /* @__PURE__ */ r(Kn, { asChild: !0, children: /* @__PURE__ */ d(D, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Wn, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(Pt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(qt, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Xt, {}),
=======
function ga({ table: t }) {
  return /* @__PURE__ */ d(Jt, { children: [
    /* @__PURE__ */ r(Wn, { asChild: !0, children: /* @__PURE__ */ d(I, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Qn, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(Xt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(Kt, { children: "Toggle columns" }),
      /* @__PURE__ */ r(jt, {}),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        ke,
=======
function fa({ table: t }) {
  return /* @__PURE__ */ d(Zt, { children: [
    /* @__PURE__ */ r(Qn, { asChild: !0, children: /* @__PURE__ */ d(D, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(tr, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(Lt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(Qt, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Yt, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Re,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
const vt = F.Root, ma = F.Group, xt = F.Value, ht = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = G();
=======
const yt = j.Root, fa = j.Group, Nt = j.Value, ht = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ d(
    F.Trigger,
=======
const yt = X.Root, ba = X.Group, Nt = X.Value, ft = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = $();
  return /* @__PURE__ */ d(
    X.Trigger,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      ref: a,
      className: l(
        "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
        t
      ),
      ...n,
      dir: o,
      children: [
        e,
<<<<<<< HEAD
<<<<<<< HEAD
        /* @__PURE__ */ r(F.Icon, { asChild: !0, children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
=======
        /* @__PURE__ */ r(X.Icon, { asChild: !0, children: /* @__PURE__ */ r(Kt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
        /* @__PURE__ */ r(j.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      ]
    }
  );
});
<<<<<<< HEAD
ht.displayName = F.Trigger.displayName;
const gn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  F.ScrollUpButton,
=======
ft.displayName = X.Trigger.displayName;
const vn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.ScrollUpButton,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(tr, { className: "tw-h-4 tw-w-4" })
  }
));
<<<<<<< HEAD
gn.displayName = F.ScrollUpButton.displayName;
const fn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  F.ScrollDownButton,
=======
vn.displayName = X.ScrollUpButton.displayName;
const xn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.ScrollDownButton,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
<<<<<<< HEAD
<<<<<<< HEAD
    children: /* @__PURE__ */ r(Lt, { className: "tw-h-4 tw-w-4" })
=======
    children: /* @__PURE__ */ r(Ut, { className: "tw-h-4 tw-w-4" })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  }
));
fn.displayName = F.ScrollDownButton.displayName;
const gt = c.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const s = G();
  return /* @__PURE__ */ r(F.Portal, { children: /* @__PURE__ */ d(
    F.Content,
=======
    children: /* @__PURE__ */ r(Kt, { className: "tw-h-4 tw-w-4" })
  }
));
xn.displayName = X.ScrollDownButton.displayName;
const bt = c.forwardRef(({ className: t, children: e, position: n = "popper", ...a }, o) => {
  const i = $();
  return /* @__PURE__ */ r(X.Portal, { children: /* @__PURE__ */ d(
    X.Content,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
        /* @__PURE__ */ r(gn, {}),
        /* @__PURE__ */ r(
<<<<<<< HEAD
          F.Viewport,
=======
          X.Viewport,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          {
            className: l(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(fn, {})
      ]
    }
  ) });
});
<<<<<<< HEAD
<<<<<<< HEAD
gt.displayName = F.Content.displayName;
const ha = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  F.Label,
=======
bt.displayName = X.Content.displayName;
const va = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.Label,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
gt.displayName = j.Content.displayName;
const ba = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  j.Label,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  {
    ref: n,
    className: l("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
ha.displayName = F.Label.displayName;
=======
ba.displayName = j.Label.displayName;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
const Q = c.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ d(
  F.Item,
=======
va.displayName = X.Label.displayName;
const W = c.forwardRef(({ className: t, children: e, ...n }, a) => /* @__PURE__ */ d(
  X.Item,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: a,
    className: l(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
<<<<<<< HEAD
<<<<<<< HEAD
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(F.ItemIndicator, { children: /* @__PURE__ */ r(kt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(F.ItemText, { children: e })
    ]
  }
));
Q.displayName = F.Item.displayName;
const ga = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  F.Separator,
=======
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(X.ItemIndicator, { children: /* @__PURE__ */ r(St, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(X.ItemText, { children: e })
    ]
  }
));
W.displayName = X.Item.displayName;
const xa = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  X.Separator,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(j.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(j.ItemText, { children: e })
    ]
  }
));
Q.displayName = j.Item.displayName;
const va = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  j.Separator,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
ga.displayName = F.Separator.displayName;
function fa({ table: t }) {
=======
xa.displayName = X.Separator.displayName;
function ya({ table: t }) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
va.displayName = j.Separator.displayName;
function xa({ table: t }) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
        yt,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(ht, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Nt, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(gt, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Q, { value: `${e}`, children: e }, e)) })
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
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(er, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(nr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(rr, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        D,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(ar, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const ya = `
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
function Na(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
<<<<<<< HEAD
<<<<<<< HEAD
function $e(t) {
  return Array.from(t.querySelectorAll(ba)).filter(
    (e) => !e.hasAttribute("disabled") && !e.getAttribute("aria-hidden") && va(e)
  );
}
function xa(t) {
  var e;
  return (e = t == null ? void 0 : t.parentElement) == null ? void 0 : e.tagName.toLowerCase();
}
const Ut = c.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r("div", { className: l("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
  "table",
  {
    ref: a,
    className: l("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
Ut.displayName = "Table";
const Jt = c.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
=======
function Ft(t) {
  return Array.from(t.querySelectorAll(Na)).filter(
    (e) => !e.hasAttribute("disabled") && !e.getAttribute("aria-hidden") && ka(e)
  );
}
const te = c.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => {
=======
function At(t) {
  return Array.from(t.querySelectorAll(ya)).filter(
    (e) => !e.hasAttribute("disabled") && !e.getAttribute("aria-hidden") && Na(e)
  );
}
const Ft = c.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const o = c.useRef(null);
  c.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), c.useEffect(() => {
    const w = o.current;
    if (!w) return;
    const s = () => {
      Ft(w).forEach((h) => {
        h.setAttribute("tabindex", "-1");
      });
    };
    s();
    const p = new MutationObserver(() => {
      s();
    });
    return p.observe(w, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0
      // Include descendants
      // attributes: true, // Watch for attribute changes too
      // attributeFilter: ['tabindex'], // Only watch tabindex changes
    }), () => {
      p.disconnect();
    };
  }, []);
  const i = (w) => {
    const { current: s } = o;
    if (s) {
      if (w.key === "ArrowDown") {
        w.preventDefault(), Ft(s)[0].focus();
        return;
      }
      w.key === " " && document.activeElement === s && w.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: l("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
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
<<<<<<< HEAD
te.displayName = "Table";
const ee = c.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Ft.displayName = "Table";
const Wt = c.forwardRef(({ className: t, stickyHeader: e, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
Jt.displayName = "TableHeader";
const Kt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: l("[&_tr:last-child]:tw-border-0", t), ...e }));
Kt.displayName = "TableBody";
const ya = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    tabIndex: -1,
    role: "presentation",
    onKeyDown: (o) => {
      if (o.key === "Tab" && o.shiftKey) {
        const s = document.activeElement, w = s == null ? void 0 : s.closest("table");
        if (!w) return;
        const i = w.querySelector("tfoot");
        if (!(i != null && i.contains(s))) return;
        o.preventDefault();
        const p = w.querySelector('tbody tr[tabindex="0"]:last-of-type');
        p instanceof HTMLElement && p.focus();
      }
    },
    className: l(
      "tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",
      t
    ),
    ...e
  }
));
ya.displayName = "TableFooter";
const it = c.forwardRef(
  ({ className: t, onKeyDown: e, onSelect: n, ...a }, o) => {
    const s = c.useRef(null);
    c.useEffect(() => {
      typeof o == "function" ? o(s.current) : o && "current" in o && (o.current = s.current);
    }, [o]);
    const w = (m, f) => {
      var C;
      const g = m.closest("table"), h = f.indexOf(m);
      let v = !1;
      for (let b = h + 1; b < f.length; b++) {
        const x = f[b];
        if (!(g != null && g.contains(x))) {
          x.focus(), v = !0;
          break;
        }
      }
      v || (C = f[0]) == null || C.focus();
    }, i = (m, f, g) => {
      let h;
      return g === "down" && f < m.length - 1 ? h = m[f + 1] : g === "up" && f > 0 && (h = m[f - 1]), h ? (h.focus(), !0) : !1;
    }, p = (m, f, g, h, v) => {
      var x, N, T;
      const C = xa(f), b = f.closest("table");
      if (m.shiftKey) {
        if (m.preventDefault(), C === "tfoot") {
          const X = b == null ? void 0 : b.querySelector('tbody tr[tabindex="0"]:last-of-type');
          X instanceof HTMLElement && X.focus();
          return;
        }
        if (C === "tbody") {
          const X = b == null ? void 0 : b.querySelector('thead tr[tabindex="0"]');
          X instanceof HTMLElement && X.focus();
          return;
        }
        return;
      }
      if (C === "tbody") {
        if (m.preventDefault(), h === g.length - 1 || g.length === 0) {
          const X = (N = (x = f.parentElement) == null ? void 0 : x.parentElement) == null ? void 0 : N.querySelector('tfoot tr[tabindex="0"]');
          X ? X.focus() : w(f, v);
        }
        (T = g[h + 1]) == null || T.focus();
      }
    };
    return /* @__PURE__ */ r(
      "tr",
      {
        ref: s,
        tabIndex: 0,
        onKeyDown: (m) => {
          const { current: f } = s;
          if (!f || !f.parentElement) return;
          const g = Array.from(
            f.parentElement.querySelectorAll('tr[tabindex="0"]')
          ), h = g.indexOf(f), v = $e(document.body), C = $e(f), b = C.indexOf(
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            document.activeElement
          );
          m.key === "Tab" ? p(
            m,
            f,
            C,
            b,
            v
          ) : m.key === "ArrowDown" ? i(g, h, "down") && m.preventDefault() : m.key === "ArrowUp" ? i(g, h, "up") && m.preventDefault() : m.key === "Enter" && n && (m.preventDefault(), n(m)), e == null || e(m);
        },
        className: l(
          // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
          "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
          "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          "data-[state=selected]:tw-bg-muted",
          t
        ),
        ...a
      }
    );
  }
);
it.displayName = "TableRow";
const At = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
ee.displayName = "TableHeader";
const ne = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: l("[&_tr:last-child]:tw-border-0", t), ...e }));
ne.displayName = "TableBody";
const Ca = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Wt.displayName = "TableHeader";
const Gt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: l("[&_tr:last-child]:tw-border-0", t), ...e }));
Gt.displayName = "TableBody";
const ka = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  "tfoot",
  {
    ref: n,
    className: l("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
<<<<<<< HEAD
Ca.displayName = "TableFooter";
function Sa(t) {
=======
ka.displayName = "TableFooter";
function Ca(t) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  c.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (a) => {
      if (e.contains(document.activeElement)) {
        if (a.key === "ArrowRight" || a.key === "ArrowLeft") {
          a.preventDefault(), a.stopPropagation();
          const o = t.current ? Ft(t.current) : [], i = o.indexOf(document.activeElement), w = a.key === "ArrowRight" ? i + 1 : i - 1;
          w >= 0 && w < o.length && o[w].focus();
        }
        a.key === "Escape" && (a.preventDefault(), e.focus()), (a.key === "ArrowDown" || a.key === "ArrowUp" || a.key === "Tab") && a.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
<<<<<<< HEAD
const dt = c.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: a, ...o }, i) => {
  const w = c.useRef(null);
  c.useEffect(() => {
    typeof i == "function" ? i(w.current) : i && "current" in i && (i.current = w.current);
  }, [i]), Sa(w);
  const s = (g, m, b) => {
    let v;
    return b === "ArrowDown" && m < g.length - 1 ? v = g[m + 1] : b === "ArrowUp" && m > 0 && (v = g[m - 1]), v ? (requestAnimationFrame(() => v.focus()), !0) : !1;
  }, p = (g, m, b) => {
    let v;
    return b === "ArrowLeft" && m > 0 ? v = g[m - 1] : b === "ArrowRight" && m < g.length - 1 && (v = g[m + 1]), v ? (requestAnimationFrame(() => v.focus()), !0) : !1;
=======
const at = c.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: a, ...o }, s) => {
  const w = c.useRef(null);
  c.useEffect(() => {
    typeof s == "function" ? s(w.current) : s && "current" in s && (s.current = w.current);
  }, [s]), Ca(w);
  const i = (h, m, f) => {
    let k;
    return f === "ArrowDown" && m < h.length - 1 ? k = h[m + 1] : f === "ArrowUp" && m > 0 && (k = h[m - 1]), k ? (requestAnimationFrame(() => k.focus()), !0) : !1;
  }, p = (h, m, f) => {
    let k;
    return f === "ArrowLeft" && m > 0 ? k = h[m - 1] : f === "ArrowRight" && m < h.length - 1 && (k = h[m + 1]), k ? (requestAnimationFrame(() => k.focus()), !0) : !1;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  }, u = c.useMemo(
    () => w.current ? Ft(w.current) : [],
    [w]
  ), h = (g) => {
    const { current: m } = w;
    if (!m || !m.parentElement) return;
    const b = m.closest("table"), v = b ? (
      // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      Ft(b).filter(
        (x) => x.tagName === "TR"
      )
    ) : [], y = v.indexOf(m), C = u.indexOf(
      // activeElement is generic Element, so we need to cast it to HTMLElement
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      document.activeElement
    );
    if (g.key === "ArrowDown" || g.key === "ArrowUp")
      g.preventDefault(), s(v, y, g.key);
    else if (g.key === "ArrowLeft" || g.key === "ArrowRight")
      g.preventDefault(), p(u, C, g.key);
    else if (g.key === "Escape") {
      g.preventDefault();
      const x = m.closest("table");
      x && x.focus();
    } else if (g.key === "Tab") {
      g.preventDefault();
      return;
    }
    e == null || e(g);
  }, f = c.useCallback(
    (g) => {
      a && (n == null || n(g));
    },
    [a, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: w,
      tabIndex: -1,
      onKeyDown: h,
      onFocus: f,
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
<<<<<<< HEAD
dt.displayName = "TableRow";
const Gt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
at.displayName = "TableRow";
const Ot = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
At.displayName = "TableHead";
const yt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Gt.displayName = "TableHead";
const kt = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Ot.displayName = "TableHead";
const ft = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  "td",
  {
    ref: n,
    className: l("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
ft.displayName = "TableCell";
const Sa = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: l("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Sa.displayName = "TableCaption";
function Ra({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: a = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: s = !1,
  onRowClickHandler: w = () => {
  }
}) {
<<<<<<< HEAD
  var b;
  const [i, p] = P([]), [u, m] = P([]), [f, g] = P({}), [h, v] = P({}), C = Je({
=======
  var y;
  const [s, p] = B([]), [u, h] = B([]), [f, g] = B({}), [m, b] = B({}), v = Ze({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    data: e,
    columns: t,
    getCoreRowModel: We(),
    ...n && { getPaginationRowModel: _r() },
    onSortingChange: p,
<<<<<<< HEAD
    getSortedRowModel: Ke(),
<<<<<<< HEAD
    onColumnFiltersChange: m,
    getFilteredRowModel: Cr(),
=======
    getSortedRowModel: Qe(),
    onColumnFiltersChange: h,
    getFilteredRowModel: _r(),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    onColumnVisibilityChange: g,
    onRowSelectionChange: b,
=======
    onColumnFiltersChange: g,
    getFilteredRowModel: Tr(),
    onColumnVisibilityChange: h,
    onRowSelectionChange: f,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    state: {
<<<<<<< HEAD
      sorting: i,
=======
      sorting: s,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      columnFilters: u,
      columnVisibility: f,
      rowSelection: m
    }
  });
  return /* @__PURE__ */ d("div", { className: "pr-twp", children: [
<<<<<<< HEAD
<<<<<<< HEAD
    o && /* @__PURE__ */ r(ua, { table: C }),
    /* @__PURE__ */ d(Ut, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Jt, { stickyHeader: s, children: C.getHeaderGroups().map((x) => /* @__PURE__ */ r(it, { children: x.headers.map((N) => /* @__PURE__ */ r(At, { children: N.isPlaceholder ? void 0 : Dt(N.column.columnDef.header, N.getContext()) }, N.id)) }, x.id)) }),
      /* @__PURE__ */ r(Kt, { children: (b = C.getRowModel().rows) != null && b.length ? C.getRowModel().rows.map((x) => /* @__PURE__ */ r(
        it,
        {
          onClick: () => w(x, C),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map((N) => /* @__PURE__ */ r(yt, { children: Dt(N.column.columnDef.cell, N.getContext()) }, N.id))
        },
        x.id
      )) : /* @__PURE__ */ r(it, { children: /* @__PURE__ */ r(yt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
=======
    o && /* @__PURE__ */ r(fa, { table: v }),
    /* @__PURE__ */ d(te, { stickyHeader: i, children: [
      /* @__PURE__ */ r(ee, { stickyHeader: i, children: v.getHeaderGroups().map((C) => /* @__PURE__ */ r(dt, { children: C.headers.map((x) => /* @__PURE__ */ r(Gt, { children: x.isPlaceholder ? void 0 : Pt(x.column.columnDef.header, x.getContext()) }, x.id)) }, C.id)) }),
      /* @__PURE__ */ r(ne, { children: (y = v.getRowModel().rows) != null && y.length ? v.getRowModel().rows.map((C) => /* @__PURE__ */ r(
        dt,
        {
          onClick: () => w(C, v),
          "data-state": C.getIsSelected() && "selected",
          children: C.getVisibleCells().map((x) => /* @__PURE__ */ r(kt, { children: Pt(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        C.id
      )) : /* @__PURE__ */ r(dt, { children: /* @__PURE__ */ r(kt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    o && /* @__PURE__ */ r(ga, { table: k }),
    /* @__PURE__ */ d(Ft, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Wt, { stickyHeader: s, children: k.getHeaderGroups().map((y) => /* @__PURE__ */ r(at, { children: y.headers.map((x) => /* @__PURE__ */ r(Ot, { children: x.isPlaceholder ? void 0 : It(x.column.columnDef.header, x.getContext()) }, x.id)) }, y.id)) }),
      /* @__PURE__ */ r(Gt, { children: (C = k.getRowModel().rows) != null && C.length ? k.getRowModel().rows.map((y) => /* @__PURE__ */ r(
        at,
        {
          onClick: () => w(y, k),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((x) => /* @__PURE__ */ r(ft, { children: It(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        y.id
      )) : /* @__PURE__ */ r(at, { children: /* @__PURE__ */ r(ft, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        D,
        {
          variant: "outline",
          size: "sm",
<<<<<<< HEAD
          onClick: () => C.previousPage(),
          disabled: !C.getCanPreviousPage(),
=======
          onClick: () => v.previousPage(),
          disabled: !v.getCanPreviousPage(),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        D,
        {
          variant: "outline",
          size: "sm",
<<<<<<< HEAD
          onClick: () => C.nextPage(),
          disabled: !C.getCanNextPage(),
=======
          onClick: () => v.nextPage(),
          disabled: !v.getCanNextPage(),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          children: "Next"
        }
      )
    ] }),
<<<<<<< HEAD
<<<<<<< HEAD
    n && a && /* @__PURE__ */ r(fa, { table: C })
  ] });
}
const jt = $t(({ className: t, ...e }, n) => /* @__PURE__ */ r(rr, { size: 35, className: l("tw-animate-spin", t), ...e, ref: n }));
jt.displayName = "Spinner";
function es({
=======
    n && a && /* @__PURE__ */ r(ya, { table: v })
  ] });
}
const Ht = Jt(({ className: t, ...e }, n) => /* @__PURE__ */ r(sr, { size: 35, className: l("tw-animate-spin", t), ...e, ref: n }));
Ht.displayName = "Spinner";
function is({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    n && a && /* @__PURE__ */ r(xa, { table: k })
  ] });
}
function as({
  dictionaryEntry: t,
  backToListButton: e,
  definitionLabel: n,
  occurrencesLabel: a
}) {
  return /* @__PURE__ */ d("div", { className: "tw-p-4", children: [
    /* @__PURE__ */ r("div", { className: "tw-mb-4 tw-flex tw-items-center tw-justify-between", children: e }),
    /* @__PURE__ */ d("div", { className: "tw-mb-4", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-baseline tw-gap-2", children: [
        /* @__PURE__ */ r("span", { className: "tw-text-2xl tw-font-bold", children: t.hebrew }),
        /* @__PURE__ */ r("span", { className: "tw-text-lg tw-text-muted-foreground", children: t.transliteration }),
        /* @__PURE__ */ r("span", { className: "tw-ml-auto tw-rounded tw-bg-blue-100 tw-px-2 tw-py-0.5 tw-text-sm", children: t.strongsNumber })
      ] }),
      /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic tw-text-muted-foreground", children: t.partOfSpeech })
    ] }),
    /* @__PURE__ */ r(Zn, { className: "tw-my-3" }),
    /* @__PURE__ */ d("div", { className: "tw-mb-4", children: [
      /* @__PURE__ */ r("h3", { className: "tw-mb-1 tw-font-semibold", children: n }),
      /* @__PURE__ */ r("p", { children: t.definition })
    ] }),
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-mb-1 tw-font-semibold", children: a }),
      /* @__PURE__ */ r("ul", { className: "tw-list-inside tw-list-disc", children: t.usage.map((o) => /* @__PURE__ */ r("li", { className: "tw-py-0.5 tw-text-sm", children: xt(o, "English") }, Cr(o))) })
    ] })
  ] });
}
function bn({ dictionaryEntry: t, handleEntryClick: e }) {
  return /* @__PURE__ */ r(
    at,
    {
      onClick: () => e(t),
      onSelect: () => e(t),
      className: "tw-flex tw-cursor-pointer tw-items-center tw-border-b-0",
      children: /* @__PURE__ */ d(ft, { colSpan: 100, className: "tw-p-2", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-items-baseline tw-gap-2", children: [
          /* @__PURE__ */ r("span", { className: "tw-font-bold", children: t.hebrew }),
          /* @__PURE__ */ r("span", { className: "tw-text-sm tw-text-muted-foreground", children: t.transliteration }),
          /* @__PURE__ */ r("span", { className: "tw-rounded tw-bg-blue-100 tw-px-1.5 tw-py-0.5 tw-text-xs", children: t.strongsNumber })
        ] }),
        /* @__PURE__ */ r("p", { className: "tw-truncate tw-text-sm tw-text-muted-foreground", children: t.definition })
      ] })
    },
    t.id
  );
}
bn.displayName = "DictionaryListItem";
function os({ dictionaryData: t, handleEntryClick: e }) {
  return /* @__PURE__ */ r(Ft, { stickyHeader: !0, children: /* @__PURE__ */ r(Gt, { children: t.map((n) => /* @__PURE__ */ r(bn, { dictionaryEntry: n, handleEntryClick: e })) }) });
}
const $t = Ht(({ className: t, ...e }, n) => /* @__PURE__ */ r(or, { size: 35, className: l("tw-animate-spin", t), ...e, ref: n }));
$t.displayName = "Spinner";
function ss({
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: a,
  ...o
}) {
  return /* @__PURE__ */ r(
    D,
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
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ r(jt, { size: 15 }) : /* @__PURE__ */ d(Nt, { children: [
        /* @__PURE__ */ r(ar, { size: 25, className: l("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
=======
      children: t ? /* @__PURE__ */ r(Ht, { size: 15 }) : /* @__PURE__ */ d(Ct, { children: [
        /* @__PURE__ */ r(ir, { size: 25, className: l("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
      children: t ? /* @__PURE__ */ r($t, { size: 15 }) : /* @__PURE__ */ d(kt, { children: [
        /* @__PURE__ */ r(sr, { size: 25, className: l("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        n
      ] })
    }
  );
}
function is({ isEnabling: t, handleClick: e, className: n, ...a }) {
  return /* @__PURE__ */ r(
    D,
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
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ d(Nt, { children: [
        /* @__PURE__ */ r(jt, { size: 15, className: "tw-mr-1 tw-text-white" }),
=======
      children: t ? /* @__PURE__ */ d(Ct, { children: [
        /* @__PURE__ */ r(Ht, { size: 15, className: "tw-mr-1 tw-text-white" }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
      children: t ? /* @__PURE__ */ d(kt, { children: [
        /* @__PURE__ */ r($t, { size: 15, className: "tw-mr-1 tw-text-white" }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function ws({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...a
}) {
  return /* @__PURE__ */ r(
    D,
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
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ d(Nt, { children: [
        /* @__PURE__ */ r(jt, { size: 15, className: "tw-mr-1 tw-text-black" }),
=======
      children: t ? /* @__PURE__ */ d(Ct, { children: [
        /* @__PURE__ */ r(Ht, { size: 15, className: "tw-mr-1 tw-text-black" }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
      children: t ? /* @__PURE__ */ d(kt, { children: [
        /* @__PURE__ */ r($t, { size: 15, className: "tw-mr-1 tw-text-black" }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function ls({ isUpdating: t, handleClick: e, className: n, ...a }) {
  return /* @__PURE__ */ r(
    D,
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
<<<<<<< HEAD
      children: t ? /* @__PURE__ */ d(Nt, { children: [
        /* @__PURE__ */ r(jt, { size: 15, className: "tw-mr-1 tw-text-white" }),
=======
      children: t ? /* @__PURE__ */ d(Ct, { children: [
        /* @__PURE__ */ r(Ht, { size: 15, className: "tw-mr-1 tw-text-white" }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
      children: t ? /* @__PURE__ */ d(kt, { children: [
        /* @__PURE__ */ r($t, { size: 15, className: "tw-mr-1 tw-text-white" }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        "Updating..."
      ] }) : "Update"
    }
  );
}
function ds({ id: t, markdown: e, className: n, anchorTarget: a }) {
  const o = W(
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
  return /* @__PURE__ */ r("div", { id: t, className: l("pr-twp tw-prose", n), children: /* @__PURE__ */ r(Dr, { options: o, children: e }) });
}
<<<<<<< HEAD
<<<<<<< HEAD
const Ca = $t((t, e) => /* @__PURE__ */ d(
=======
const _a = Jt((t, e) => /* @__PURE__ */ d(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  D,
=======
const Ta = Ht((t, e) => /* @__PURE__ */ d(
  I,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ r(ir, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ r(
<<<<<<< HEAD
<<<<<<< HEAD
        Lt,
=======
        Kt,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
        Ut,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
var Sa = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Sa || {});
function ss({ id: t, groups: e }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(Ht, { children: [
    /* @__PURE__ */ r(ye, { asChild: !0, children: /* @__PURE__ */ r(Ca, {}) }),
    /* @__PURE__ */ r(Pt, { children: e.map((n) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(qt, { children: n.label }),
      /* @__PURE__ */ r(tn, { children: n.items.map((a) => /* @__PURE__ */ r("div", { children: a.itemType === 0 ? /* @__PURE__ */ r(ke, { onClick: a.onClick, children: a.label }) : /* @__PURE__ */ r(rn, { onClick: a.onClick, value: a.label, children: a.label }) }, a.label)) }),
      /* @__PURE__ */ r(Xt, {})
=======
var Ea = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Ea || {});
function ps({ id: t, groups: e }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(Zt, { children: [
    /* @__PURE__ */ r(Ce, { asChild: !0, children: /* @__PURE__ */ r(_a, {}) }),
    /* @__PURE__ */ r(Lt, { children: e.map((n) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(Qt, { children: n.label }),
      /* @__PURE__ */ r(rn, { children: n.items.map((a) => /* @__PURE__ */ r("div", { children: a.itemType === 0 ? /* @__PURE__ */ r(Re, { onClick: a.onClick, children: a.label }) : /* @__PURE__ */ r(sn, { onClick: a.onClick, value: a.label, children: a.label }) }, a.label)) }),
      /* @__PURE__ */ r(Yt, {})
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
var _a = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(_a || {});
function cs({ id: t, groups: e }) {
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ d(Jt, { children: [
    /* @__PURE__ */ r(Ne, { asChild: !0, children: /* @__PURE__ */ r(Ta, {}) }),
    /* @__PURE__ */ r(Xt, { children: e.map((n) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(Kt, { children: n.label }),
      /* @__PURE__ */ r(tn, { children: n.items.map((a) => /* @__PURE__ */ r("div", { children: a.itemType === 0 ? /* @__PURE__ */ r(Ce, { onClick: a.onClick, children: a.label }) : /* @__PURE__ */ r(rn, { onClick: a.onClick, value: a.label, children: a.label }) }, a.label)) }),
      /* @__PURE__ */ r(jt, {})
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    ] }, n.label)) })
  ] }) });
}
function ps({ id: t, message: e }) {
  return /* @__PURE__ */ r("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ r("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function us({ id: t, category: e, downloads: n, languages: a, moreInfoUrl: o }) {
  const s = new Sr("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((i, p) => i + p, 0)), w = () => {
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
            /* @__PURE__ */ r(wr, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: s })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center", children: a.slice(0, 3).map((i) => /* @__PURE__ */ r(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: i.toUpperCase()
            },
            i
          )) }),
          a.length > 3 && /* @__PURE__ */ d(
            "button",
            {
              type: "button",
              onClick: () => w(),
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
                /* @__PURE__ */ r(lr, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ r(dr, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
<<<<<<< HEAD
<<<<<<< HEAD
function Ra({ id: t, versionHistory: e }) {
=======
function za({ id: t, versionHistory: e }) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const [n, a] = P(!1), o = /* @__PURE__ */ new Date();
  function s(i) {
    const p = new Date(i), u = new Date(o.getTime() - p.getTime()), m = u.getUTCFullYear() - 1970, f = u.getUTCMonth(), g = u.getUTCDate() - 1;
    let h = "";
    return m > 0 ? h = `${m.toString()} year${m === 1 ? "" : "s"} ago` : f > 0 ? h = `${f.toString()} month${f === 1 ? "" : "s"} ago` : g === 0 ? h = "today" : h = `${g.toString()} day${g === 1 ? "" : "s"} ago`, h;
=======
function za({ id: t, versionHistory: e }) {
  const [n, a] = B(!1), o = /* @__PURE__ */ new Date();
  function i(s) {
    const p = new Date(s), u = new Date(o.getTime() - p.getTime()), h = u.getUTCFullYear() - 1970, f = u.getUTCMonth(), g = u.getUTCDate() - 1;
    let m = "";
    return h > 0 ? m = `${h.toString()} year${h === 1 ? "" : "s"} ago` : f > 0 ? m = `${f.toString()} month${f === 1 ? "" : "s"} ago` : g === 0 ? m = "today" : m = `${g.toString()} day${g === 1 ? "" : "s"} ago`, m;
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  }
  const w = Object.entries(e).sort((i, p) => p[0].localeCompare(i[0]));
  return /* @__PURE__ */ d("div", { id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? w : w.slice(0, 5)).map((i) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: i[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ d("div", { children: [
          "Version ",
          i[0]
        ] }),
        /* @__PURE__ */ r("div", { children: s(i[1].date) })
      ] })
    ] }, i[0])) }),
    w.length > 5 && /* @__PURE__ */ r(
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
function ms({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: a,
  versionHistory: o
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const s = W(() => kr(n), [n]), i = ((p) => {
=======
  const s = W(() => Rr(n), [n]), i = ((p) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return p.map((m) => u.of(m));
=======
  const i = Q(() => Rr(n), [n]), s = ((p) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return p.map((h) => u.of(h));
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  })(a);
  return /* @__PURE__ */ r("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ d("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ r(za, { versionHistory: o }),
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
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Ea = bt(
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
), vn = c.forwardRef(
  ({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, className: l("pr-twp", Ea({ variant: e }), t), ...n })
);
vn.displayName = "Badge";
function Da({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s = "No entries found",
  customSelectedText: w,
  isDisabled: i = !1,
  sortSelected: p = !1,
  icon: u = void 0,
<<<<<<< HEAD
  className: m = void 0
}) {
<<<<<<< HEAD
  const [f, g] = P(!1), h = tt(
    (b) => {
      var N;
      const x = (N = t.find((T) => T.label === b)) == null ? void 0 : N.value;
      x && a(
        n.includes(x) ? n.filter((T) => T !== x) : [...n, x]
=======
  const [b, h] = P(!1), m = tt(
    (C) => {
      var x;
      const y = (x = t.find((E) => E.label === C)) == null ? void 0 : x.value;
      y && a(
        n.includes(y) ? n.filter((E) => E !== y) : [...n, y]
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      );
    },
    [t, n, a]
  ), v = () => w || o, C = W(() => {
    if (!p) return t;
<<<<<<< HEAD
    const b = t.filter((N) => N.starred).sort((N, T) => N.label.localeCompare(T.label)), x = t.filter((N) => !N.starred).sort((N, T) => {
      const X = n.includes(N.value), U = n.includes(T.value);
      return X && !U ? -1 : !X && U ? 1 : N.label.localeCompare(T.label);
=======
    const C = t.filter((x) => x.starred).sort((x, E) => x.label.localeCompare(E.label)), y = t.filter((x) => !x.starred).sort((x, E) => {
      const $ = n.includes(x.value), q = n.includes(E.value);
      return $ && !q ? -1 : !$ && q ? 1 : x.label.localeCompare(E.label);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    });
    return [...b, ...x];
  }, [t, n, p]);
  return /* @__PURE__ */ r("div", { className: m, children: /* @__PURE__ */ d(pn, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(un, { asChild: !0, children: /* @__PURE__ */ d(
=======
  className: h = void 0
}) {
  const [f, g] = B(!1), m = et(
    (y) => {
      var x;
      const C = (x = t.find((z) => z.label === y)) == null ? void 0 : x.value;
      C && a(
        n.includes(C) ? n.filter((z) => z !== C) : [...n, C]
      );
    },
    [t, n, a]
  ), b = () => w || o, v = Q(() => {
    if (!p) return t;
    const y = t.filter((x) => x.starred).sort((x, z) => x.label.localeCompare(z.label)), C = t.filter((x) => !x.starred).sort((x, z) => {
      const j = n.includes(x.value), tt = n.includes(z.value);
      return j && !tt ? -1 : !j && tt ? 1 : x.label.localeCompare(z.label);
    });
    return [...y, ...C];
  }, [t, n, p]);
  return /* @__PURE__ */ r("div", { className: h, children: /* @__PURE__ */ d(hn, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(gn, { asChild: !0, children: /* @__PURE__ */ d(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      D,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": f,
        className: l(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        disabled: i,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: l({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ r("div", { className: "tw-font-normal", children: b() })
              }
            )
          ] }),
          /* @__PURE__ */ r(qe, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
<<<<<<< HEAD
<<<<<<< HEAD
    /* @__PURE__ */ r(_e, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(Ee, { children: [
      /* @__PURE__ */ r(ze, { placeholder: `Search ${o.toLowerCase()}...` }),
=======
    /* @__PURE__ */ r(ze, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(Ee, { children: [
      /* @__PURE__ */ r(De, { placeholder: `Search ${o.toLowerCase()}...` }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      /* @__PURE__ */ d(Me, { children: [
        /* @__PURE__ */ r(Ie, { children: s }),
        /* @__PURE__ */ r(hn, { children: C.map((b) => {
          const x = e ? e(b) : void 0;
          return /* @__PURE__ */ d(
            De,
=======
    /* @__PURE__ */ r(Me, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(De, { children: [
      /* @__PURE__ */ r(Ie, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ d(Ve, { children: [
        /* @__PURE__ */ r(Be, { children: i }),
        /* @__PURE__ */ r(bn, { children: v.map((y) => {
          const C = e ? e(y) : void 0;
          return /* @__PURE__ */ d(
            Ae,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
            {
              value: y.label,
              onSelect: m,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                  Ct,
                  {
                    className: l(
                      "tw-h-4 tw-w-4",
                      n.includes(y.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
<<<<<<< HEAD
<<<<<<< HEAD
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: b.starred && /* @__PURE__ */ r(lr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: b.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: x })
=======
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: y.starred && /* @__PURE__ */ r(pr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: y.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: C })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
                /* @__PURE__ */ r("div", { className: "tw-w-4", children: C.starred && /* @__PURE__ */ r(cr, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: C.label }),
                e && /* @__PURE__ */ r("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: y })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
              ]
            },
            y.label
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function hs({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: a,
  placeholder: o,
  commandEmptyMessage: s,
  customSelectedText: w,
  isDisabled: i,
  sortSelected: p,
  icon: u,
<<<<<<< HEAD
  className: m,
=======
  className: h,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  badgesPlaceholder: f
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Da,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: a,
        placeholder: o,
        commandEmptyMessage: s,
        customSelectedText: w,
        isDisabled: i,
        sortSelected: p,
        icon: u,
<<<<<<< HEAD
        className: m
      }
    ),
<<<<<<< HEAD
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((g) => {
      var h;
      return /* @__PURE__ */ d(bn, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
=======
        className: h
      }
    ),
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((g) => {
      var m;
      return /* @__PURE__ */ d(yn, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    n.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((h) => {
      var m;
      return /* @__PURE__ */ d(vn, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        /* @__PURE__ */ r(
          D,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
<<<<<<< HEAD
            onClick: () => a(n.filter((v) => v !== g)),
            children: /* @__PURE__ */ r(be, { className: "tw-h-3 tw-w-3" })
=======
            onClick: () => a(n.filter((b) => b !== g)),
            children: /* @__PURE__ */ r(ye, { className: "tw-h-3 tw-w-3" })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          }
        ),
        (m = t.find((b) => b.value === g)) == null ? void 0 : m.label
      ] }, g);
    }) }) : /* @__PURE__ */ r($, { children: f })
  ] });
}
function Ma({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], s = W(() => {
    const w = [];
<<<<<<< HEAD
    return t.forEach((i) => {
      w.some((p) => ve(p, i)) || w.push(i);
    }), w;
  }, [t]);
<<<<<<< HEAD
  return /* @__PURE__ */ d(Ut, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Jt, { stickyHeader: !0, children: /* @__PURE__ */ d(it, { children: [
      /* @__PURE__ */ r(At, { children: a }),
      /* @__PURE__ */ r(At, { children: o })
    ] }) }),
    /* @__PURE__ */ r(Kt, { children: s.length > 0 && s.map((w) => /* @__PURE__ */ d(
      it,
=======
    return t.forEach((s) => {
      w.some((p) => Ne(p, s)) || w.push(s);
    }), w;
  }, [t]);
  return /* @__PURE__ */ d(te, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(ee, { stickyHeader: !0, children: /* @__PURE__ */ d(dt, { children: [
      /* @__PURE__ */ r(Gt, { children: a }),
      /* @__PURE__ */ r(Gt, { children: o })
    ] }) }),
    /* @__PURE__ */ r(ne, { children: i.length > 0 && i.map((w) => /* @__PURE__ */ d(
      dt,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  return /* @__PURE__ */ d(Ft, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Wt, { stickyHeader: !0, children: /* @__PURE__ */ d(at, { children: [
      /* @__PURE__ */ r(Ot, { children: a }),
      /* @__PURE__ */ r(Ot, { children: o })
    ] }) }),
    /* @__PURE__ */ r(Gt, { children: s.length > 0 && s.map((w) => /* @__PURE__ */ d(
      at,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      {
        onClick: () => {
          e(w.reference);
        },
        children: [
<<<<<<< HEAD
<<<<<<< HEAD
          /* @__PURE__ */ r(yt, { children: `${j.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}` }),
          /* @__PURE__ */ r(yt, { children: w.text })
=======
          /* @__PURE__ */ r(kt, { children: `${O.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}` }),
          /* @__PURE__ */ r(kt, { children: w.text })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
          /* @__PURE__ */ r(ft, { children: `${X.bookIdToEnglishName(w.reference.book)} ${w.reference.chapterNum}:${w.reference.verseNum}` }),
          /* @__PURE__ */ r(ft, { children: w.text })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        ]
      },
      `${w.reference.book} ${w.reference.chapterNum}:${w.reference.verseNum}-${w.text}`
    )) })
  ] });
}
<<<<<<< HEAD
const Be = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  le.Root,
=======
const Oe = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  pe.Root,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  {
    ref: n,
    className: l(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
<<<<<<< HEAD
      le.Indicator,
=======
      pe.Indicator,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      {
        className: l("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Be.displayName = le.Root.displayName;
const vn = ft(
=======
Oe.displayName = pe.Root.displayName;
const Nn = vt(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Ve.displayName = de.Root.displayName;
const xn = bt(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
), Ia = c.forwardRef(({ className: t, variant: e, size: n, ...a }, o) => /* @__PURE__ */ r(
  Ze.Root,
  {
    ref: o,
    className: l(xn({ variant: e, size: n, className: t })),
    ...a
  }
));
Ia.displayName = Ze.Root.displayName;
const yn = c.createContext({
  size: "default",
  variant: "default"
<<<<<<< HEAD
}), yn = c.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, s) => {
  const w = G();
  return /* @__PURE__ */ r(
<<<<<<< HEAD
    Yt.Root,
=======
    Wt.Root,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
}), Nn = c.forwardRef(({ className: t, variant: e, size: n, children: a, ...o }, s) => {
  const w = F();
  return /* @__PURE__ */ r(
    qt.Root,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    {
      ref: s,
      className: l("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...o,
      dir: w,
      children: /* @__PURE__ */ r(
        yn.Provider,
        {
          value: { variant: e, size: n },
          children: a
        }
      )
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
yn.displayName = Yt.Root.displayName;
const Ft = c.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, s) => {
  const w = c.useContext(xn);
  return /* @__PURE__ */ r(
    Yt.Item,
=======
Cn.displayName = Wt.Root.displayName;
const Ut = c.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, i) => {
  const w = c.useContext(kn);
  return /* @__PURE__ */ r(
    Wt.Item,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Nn.displayName = qt.Root.displayName;
const Lt = c.forwardRef(({ className: t, children: e, variant: n, size: a, ...o }, s) => {
  const w = c.useContext(yn);
  return /* @__PURE__ */ r(
    qt.Item,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    {
      ref: s,
      className: l(
        xn({
          variant: w.variant || n,
          size: w.size || a
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
Ft.displayName = Yt.Item.displayName;
const Wt = (t) => t === "asc" ? /* @__PURE__ */ r(ur, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(mr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(hr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), cs = (t) => ({
=======
Ut.displayName = Wt.Item.displayName;
const re = (t) => t === "asc" ? /* @__PURE__ */ r(gr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(fr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(br, { className: "tw-ms-2 tw-h-4 tw-w-4" }), fs = (t) => ({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Lt.displayName = qt.Item.displayName;
const Zt = (t) => t === "asc" ? /* @__PURE__ */ r(hr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ r(gr, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(fr, { className: "tw-ms-2 tw-h-4 tw-w-4" }), gs = (t) => ({
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ d(D, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    Wt(e.getIsSorted())
=======
    re(e.getIsSorted())
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  ] })
}), Ba = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ d(D, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    Wt(n.getIsSorted())
=======
    re(n.getIsSorted())
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  ] })
}), fs = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ d(D, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
<<<<<<< HEAD
    Wt(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), oe = (t, e, n, a, o, s) => {
=======
    re(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), we = (t, e, n, a, o, i) => {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  let w = [...n];
  t.forEach((p) => {
    e === "approved" ? w.includes(p) || w.push(p) : w = w.filter((u) => u !== p);
  }), a(w);
  let i = [...o];
  t.forEach((p) => {
<<<<<<< HEAD
    e === "unapproved" ? i.includes(p) || i.push(p) : i = i.filter((u) => u !== p);
  }), s(i);
}, bs = (t, e, n, a, o) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d(D, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    Wt(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const w = s.getValue("status"), i = s.getValue("item");
    return /* @__PURE__ */ d(yn, { value: w, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        Ft,
        {
          onClick: (p) => {
            p.stopPropagation(), oe(
              [i],
              "approved",
              e,
              n,
              a,
              o
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(dr, {})
        }
      ),
      /* @__PURE__ */ r(
        Ft,
        {
          onClick: (p) => {
            p.stopPropagation(), oe(
              [i],
              "unapproved",
              e,
              n,
              a,
              o
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(cr, {})
        }
      ),
      /* @__PURE__ */ r(
        Ft,
        {
          onClick: (p) => {
            p.stopPropagation(), oe(
              [i],
              "unknown",
              e,
              n,
              a,
              o
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(pr, {})
        }
      )
=======
    e === "unapproved" ? s.includes(p) || s.push(p) : s = s.filter((u) => u !== p);
  }), i(s);
}, vs = (t, e, n, a, o) => ({
  accessorKey: "status",
  header: ({ column: i }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d(D, { variant: "ghost", onClick: () => i.toggleSorting(void 0), children: [
    t,
    re(i.getIsSorted())
  ] }) }),
  cell: ({ row: i }) => {
    const w = i.getValue("status"), s = i.getValue("item");
    return /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-center", children: [
<<<<<<< HEAD
      /* @__PURE__ */ d(Cn, { value: w, variant: "outline", type: "single", children: [
        /* @__PURE__ */ r(
          Ut,
=======
      /* @__PURE__ */ d(Nn, { value: w, variant: "outline", type: "single", children: [
        /* @__PURE__ */ r(
          Lt,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          {
            onClick: (p) => {
              p.stopPropagation(), we(
                [s],
                "approved",
                e,
                n,
                a,
                o
              );
            },
            value: "approved",
<<<<<<< HEAD
            children: /* @__PURE__ */ r(ur, {})
          }
        ),
        /* @__PURE__ */ r(
          Ut,
=======
            children: /* @__PURE__ */ r(pr, {})
          }
        ),
        /* @__PURE__ */ r(
          Lt,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          {
            onClick: (p) => {
              p.stopPropagation(), we(
                [s],
                "unapproved",
                e,
                n,
                a,
                o
              );
            },
            value: "unapproved",
<<<<<<< HEAD
            children: /* @__PURE__ */ r(mr, {})
          }
        ),
        /* @__PURE__ */ r(
          Ut,
=======
            children: /* @__PURE__ */ r(ur, {})
          }
        ),
        /* @__PURE__ */ r(
          Lt,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          {
            onClick: (p) => {
              p.stopPropagation(), we(
                [s],
                "unknown",
                e,
                n,
                a,
                o
              );
            },
            value: "unknown",
<<<<<<< HEAD
            children: /* @__PURE__ */ r(hr, {})
=======
            children: /* @__PURE__ */ r(mr, {})
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          }
        )
      ] }),
      /* @__PURE__ */ r(D, { variant: "ghost", children: "Hello World" })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    ] });
  }
}), vs = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), xs = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, ys = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
<<<<<<< HEAD
}, Ia = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", fs = Object.freeze([
=======
}, Va = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Ns = Object.freeze([
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
]), Da = (t, e, n) => {
=======
]), Aa = (t, e, n) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  let a = t;
  return e !== "all" && (a = a.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (a = a.filter((o) => o.items[0].includes(n))), a;
<<<<<<< HEAD
<<<<<<< HEAD
}, Ba = (t, e, n) => {
=======
}, Oa = (t, e, n) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const a = [];
  return t.forEach((o) => {
    const s = a.find(
      (w) => ve(
        w.items,
        ne(o.inventoryText) ? [o.inventoryText] : o.inventoryText
      )
    );
    if (s)
      s.count += 1, s.occurrences.push({
        reference: o.verseRef,
        text: o.verse
      });
    else {
      const w = {
        items: ne(o.inventoryText) ? [o.inventoryText] : o.inventoryText,
        count: 1,
<<<<<<< HEAD
        status: Ia(
          ne(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
=======
        status: Va(
          re(o.inventoryText) ? o.inventoryText : o.inventoryText[0],
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
      a.push(w);
=======
}, ja = (t, e, n, a, o) => {
  if (!t) return [];
  const i = [];
  let w = e.book, s = e.chapterNum, p = e.verseNum;
  return Aa(t).forEach((h) => {
    h.startsWith("\\id") && (w = Oa(h), s = 0, p = 0), h.startsWith("\\c") && (s = He(h), p = 0), h.startsWith("\\v") && (p = He(h), s === 0 && (s = e.chapterNum));
    let f = o.exec(h) ?? void 0;
    for (; f; ) {
      const g = [];
      f.forEach((y) => g.push(y));
      const m = f.index, b = i.find((y) => Ne(y.items, g)), v = {
        reference: {
          book: w !== void 0 ? w : "",
          chapterNum: s !== void 0 ? s : -1,
          verseNum: p !== void 0 ? p : -1
        },
        text: Tr(h, Math.max(0, m - 25), Math.min(m + 25, h.length))
      };
      if (b)
        b.count += 1, b.occurrences.push(v);
      else {
        const y = {
          items: g,
          count: 1,
          status: Pa(g[0], n, a),
          occurrences: [v]
        };
        i.push(y);
      }
      f = o.exec(h) ?? void 0;
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    }
  }), a;
}, st = (t, e) => t[e] ?? e;
function ks({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
<<<<<<< HEAD
  additionalItemsLabels: a,
  approvedItems: o,
  unapprovedItems: s,
  scope: w,
  onScopeChange: i,
  columns: p
}) {
<<<<<<< HEAD
  const u = ot(n, "%webView_inventory_all%"), m = ot(n, "%webView_inventory_approved%"), f = ot(n, "%webView_inventory_unapproved%"), g = ot(n, "%webView_inventory_unknown%"), h = ot(n, "%webView_inventory_scope_currentBook%"), v = ot(n, "%webView_inventory_scope_chapter%"), C = ot(n, "%webView_inventory_filter_text%"), b = ot(
    n,
    "%webView_inventory_show_additional_items%"
  ), [x, N] = P(!1), [T, X] = P("all"), [U, lt] = P(""), [dt, k] = P([]), _ = W(() => t.length === 0 ? [] : Ba(t, o, s), [t, o, s]), L = W(() => {
    if (x) return _;
    const y = [];
    return _.forEach((E) => {
      const Z = E.items[0], ct = y.find(
        (bt) => bt.items[0] === Z
=======
  extractItems: a,
  additionalItemsLabels: o,
  approvedItems: i,
  unapprovedItems: w,
  text: s,
  scope: p,
  onScopeChange: u,
  columns: h
}) {
  const f = st(n, "%webView_inventory_all%"), g = st(n, "%webView_inventory_approved%"), m = st(n, "%webView_inventory_unapproved%"), b = st(n, "%webView_inventory_unknown%"), v = st(n, "%webView_inventory_scope_currentBook%"), y = st(n, "%webView_inventory_scope_chapter%"), C = st(n, "%webView_inventory_scope_verse%"), x = st(n, "%webView_inventory_filter_text%"), z = st(
    n,
    "%webView_inventory_show_additional_items%"
  ), [j, tt] = B(!1), [ot, zt] = B("all"), [N, _] = B(""), [K, P] = B([]), Mt = Q(() => s ? a instanceof RegExp ? ja(s, t, i, w, a) : a(s, t, i, w) : [], [s, a, t, i, w]), pt = Q(() => {
    if (j) return Mt;
    const R = [];
    return Mt.forEach((Y) => {
      const wt = Y.items[0], ut = R.find(
        (xt) => xt.items[0] === wt
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  const u = st(n, "%webView_inventory_all%"), g = st(n, "%webView_inventory_approved%"), b = st(n, "%webView_inventory_unapproved%"), h = st(n, "%webView_inventory_unknown%"), m = st(n, "%webView_inventory_scope_currentBook%"), f = st(n, "%webView_inventory_scope_chapter%"), k = st(n, "%webView_inventory_filter_text%"), C = st(
    n,
    "%webView_inventory_show_additional_items%"
  ), [y, x] = P(!1), [E, $] = P("all"), [q, lt] = P(""), [dt, N] = P([]), T = W(() => t.length === 0 ? [] : Oa(t, o, s), [t, o, s]), L = W(() => {
    if (y) return T;
    const v = [];
    return T.forEach((_) => {
      const Z = _.items[0], ct = v.find(
        (vt) => vt.items[0] === Z
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      );
      ct ? (ct.count += E.count, ct.occurrences = ct.occurrences.concat(E.occurrences)) : y.push({
        items: [Z],
        count: E.count,
        occurrences: E.occurrences,
        status: E.status
      });
<<<<<<< HEAD
<<<<<<< HEAD
    }), y;
  }, [x, _]), A = W(() => Da(L, T, U), [L, T, U]), te = W(() => {
=======
    }), v;
  }, [y, T]), A = W(() => Aa(L, E, q), [L, E, q]), ee = W(() => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    var Z, ct;
    if (!x) return p;
    const y = (Z = a == null ? void 0 : a.tableHeaders) == null ? void 0 : Z.length;
    if (!y) return p;
<<<<<<< HEAD
    const E = [];
    for (let bt = 0; bt < y; bt++)
      E.push(
        Ma(
          ((ct = a == null ? void 0 : a.tableHeaders) == null ? void 0 : ct[bt]) || "Additional Item",
          bt + 1
=======
    const v = (Z = a == null ? void 0 : a.tableHeaders) == null ? void 0 : Z.length;
    if (!v) return p;
    const _ = [];
    for (let vt = 0; vt < v; vt++)
      _.push(
        Ba(
          ((ct = a == null ? void 0 : a.tableHeaders) == null ? void 0 : ct[vt]) || "Additional Item",
          vt + 1
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        )
      );
    return [...E, ...p];
  }, [a == null ? void 0 : a.tableHeaders, p, x]);
  wt(() => {
    A.length === 0 ? k([]) : A.length === 1 && k(A[0].items);
  }, [A]);
  const ee = (y, E) => {
    E.setRowSelection(() => {
      const Z = {};
      return Z[y.index] = !0, Z;
    }), k(y.original.items);
  }, S = (y) => {
    if (y === "book" || y === "chapter")
      i(y);
=======
    }), R;
  }, [j, Mt]), k = Q(() => Xa(pt, ot, N), [pt, ot, N]), E = Q(() => {
    var wt, ut;
    if (!j) return h;
    const R = (wt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : wt.length;
    if (!R) return h;
    const Y = [];
    for (let xt = 0; xt < R; xt++)
      Y.push(
        Ba(
          ((ut = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ut[xt]) || "Additional Item",
          xt + 1
        )
      );
    return [...Y, ...h];
  }, [o == null ? void 0 : o.tableHeaders, h, j]);
  ct(() => {
    k.length === 0 ? P([]) : k.length === 1 && P(k[0].items);
  }, [k]);
  const A = (R, Y) => {
    Y.setRowSelection(() => {
      const wt = {};
      return wt[R.index] = !0, wt;
    }), P(R.original.items);
  }, G = (R) => {
    if (R === "book" || R === "chapter" || R === "verse")
      u(R);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    else
<<<<<<< HEAD
      throw new Error(`Invalid scope value: ${y}`);
  }, M = (y) => {
    if (y === "all" || y === "approved" || y === "unapproved" || y === "unknown")
      X(y);
=======
      throw new Error(`Invalid scope value: ${v}`);
  }, D = (v) => {
    if (v === "all" || v === "approved" || v === "unapproved" || v === "unknown")
      $(v);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    else
<<<<<<< HEAD
      throw new Error(`Invalid status filter value: ${y}`);
  }, O = W(() => {
    if (L.length === 0 || dt.length === 0) return [];
    const y = L.filter((E) => ve(
      x ? E.items : [E.items[0]],
      dt
    ));
    if (y.length > 1) throw new Error("Selected item is not unique");
    return y.length === 0 ? [] : y[0].occurrences;
  }, [dt, x, L]);
=======
      throw new Error(`Invalid status filter value: ${R}`);
  }, Dt = Q(() => {
    if (pt.length === 0 || K.length === 0) return [];
    const R = pt.filter((Y) => Ne(
      j ? Y.items : [Y.items[0]],
      K
    ));
    if (R.length > 1) throw new Error("Selected item is not unique");
    return R.length === 0 ? [] : R[0].occurrences;
  }, [K, j, pt]);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        yt,
        {
<<<<<<< HEAD
          onValueChange: (y) => M(y),
          defaultValue: T,
          children: [
<<<<<<< HEAD
            /* @__PURE__ */ r(ht, { className: "tw-m-1", children: /* @__PURE__ */ r(xt, { placeholder: "Select filter" }) }),
=======
          onValueChange: (v) => D(v),
          defaultValue: E,
          children: [
            /* @__PURE__ */ r(ht, { className: "tw-m-1", children: /* @__PURE__ */ r(Nt, { placeholder: "Select filter" }) }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
            /* @__PURE__ */ d(gt, { children: [
              /* @__PURE__ */ r(Q, { value: "all", children: u }),
              /* @__PURE__ */ r(Q, { value: "approved", children: m }),
              /* @__PURE__ */ r(Q, { value: "unapproved", children: f }),
              /* @__PURE__ */ r(Q, { value: "unknown", children: g })
=======
            /* @__PURE__ */ r(ft, { className: "tw-m-1", children: /* @__PURE__ */ r(Nt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(bt, { children: [
              /* @__PURE__ */ r(W, { value: "all", children: f }),
              /* @__PURE__ */ r(W, { value: "approved", children: g }),
              /* @__PURE__ */ r(W, { value: "unapproved", children: m }),
              /* @__PURE__ */ r(W, { value: "unknown", children: b })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
            ] })
          ]
        }
      ),
<<<<<<< HEAD
<<<<<<< HEAD
      /* @__PURE__ */ d(vt, { onValueChange: (y) => S(y), defaultValue: w, children: [
        /* @__PURE__ */ r(ht, { className: "tw-m-1", children: /* @__PURE__ */ r(xt, { placeholder: "Select scope" }) }),
=======
      /* @__PURE__ */ d(yt, { onValueChange: (v) => S(v), defaultValue: w, children: [
        /* @__PURE__ */ r(ht, { className: "tw-m-1", children: /* @__PURE__ */ r(Nt, { placeholder: "Select scope" }) }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        /* @__PURE__ */ d(gt, { children: [
          /* @__PURE__ */ r(Q, { value: "book", children: h }),
          /* @__PURE__ */ r(Q, { value: "chapter", children: v })
=======
      /* @__PURE__ */ d(yt, { onValueChange: (R) => G(R), defaultValue: p, children: [
        /* @__PURE__ */ r(ft, { className: "tw-m-1", children: /* @__PURE__ */ r(Nt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(bt, { children: [
          /* @__PURE__ */ r(W, { value: "book", children: v }),
          /* @__PURE__ */ r(W, { value: "chapter", children: y }),
          /* @__PURE__ */ r(W, { value: "verse", children: C })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        ] })
      ] }),
      /* @__PURE__ */ r(
        Tt,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
<<<<<<< HEAD
          placeholder: C,
          value: U,
          onChange: (y) => {
            lt(y.target.value);
=======
          placeholder: x,
          value: N,
          onChange: (R) => {
            _(R.target.value);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          }
        }
      ),
      a && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
<<<<<<< HEAD
          Be,
          {
            className: "tw-m-1",
            checked: x,
            onCheckedChange: (y) => {
              N(y);
            }
          }
        ),
        /* @__PURE__ */ r($, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (a == null ? void 0 : a.checkboxText) ?? b })
=======
          Oe,
          {
            className: "tw-m-1",
            checked: j,
            onCheckedChange: (R) => {
              tt(R);
            }
          }
        ),
        /* @__PURE__ */ r(L, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? z })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Ra,
      {
<<<<<<< HEAD
        columns: te,
        data: A,
        onRowClickHandler: ee,
=======
        columns: E,
        data: k,
        onRowClickHandler: A,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        stickyHeader: !0
      }
    ) }),
    O.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Ma,
      {
        occurrenceData: O,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
<<<<<<< HEAD
const Ve = c.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  Qe.Root,
=======
const Pe = c.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...a }, o) => /* @__PURE__ */ r(
  nn.Root,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
Ve.displayName = Qe.Root.displayName;
function Le({ className: t, ...e }) {
=======
Pe.displayName = nn.Root.displayName;
function Ue({ className: t, ...e }) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
<<<<<<< HEAD
const Ae = Ot.Provider, Oe = Ot.Root, Pe = Ot.Trigger, Zt = c.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  Ot.Content,
=======
const Xe = $t.Provider, je = $t.Root, Fe = $t.Trigger, ae = c.forwardRef(({ className: t, sideOffset: e = 4, ...n }, a) => /* @__PURE__ */ r(
  $t.Content,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
Zt.displayName = Ot.Content.displayName;
const Va = "16rem", Aa = "3rem", Nn = c.createContext(void 0);
function Qt() {
  const t = c.useContext(Nn);
=======
ae.displayName = $t.Content.displayName;
const Fa = "16rem", Ga = "3rem", Sn = c.createContext(void 0);
function oe() {
  const t = c.useContext(Sn);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Qt.displayName = Pt.Content.displayName;
const Pa = "16rem", Xa = "3rem", kn = c.createContext(void 0);
function te() {
  const t = c.useContext(kn);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Cn = c.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: a,
    style: o,
    children: s,
    side: w = "primary",
    ...i
  }, p) => {
<<<<<<< HEAD
<<<<<<< HEAD
    const [u, m] = c.useState(t), f = e ?? u, g = c.useCallback(
      (T) => {
        const X = typeof T == "function" ? T(f) : T;
        n ? n(X) : m(X);
      },
      [n, f]
    ), h = c.useCallback(() => g((T) => !T), [g]), v = f ? "expanded" : "collapsed", x = G() === "ltr" ? w : w === "primary" ? "secondary" : "primary", N = c.useMemo(
=======
    const [u, h] = c.useState(t), f = e ?? u, g = c.useCallback(
      (z) => {
        const j = typeof z == "function" ? z(f) : z;
        n ? n(j) : h(j);
      },
      [n, f]
    ), m = c.useCallback(() => g((z) => !z), [g]), b = f ? "expanded" : "collapsed", C = $() === "ltr" ? w : w === "primary" ? "secondary" : "primary", x = c.useMemo(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    const [u, g] = c.useState(t), b = e ?? u, h = c.useCallback(
      (E) => {
        const $ = typeof E == "function" ? E(b) : E;
        n ? n($) : g($);
      },
      [n, b]
    ), m = c.useCallback(() => h((E) => !E), [h]), f = b ? "expanded" : "collapsed", y = F() === "ltr" ? w : w === "primary" ? "secondary" : "primary", x = c.useMemo(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      () => ({
        state: b,
        open: f,
        setOpen: g,
<<<<<<< HEAD
        toggleSidebar: h,
        side: x
      }),
      [v, f, g, h, x]
    );
<<<<<<< HEAD
    return /* @__PURE__ */ r(Nn.Provider, { value: N, children: /* @__PURE__ */ r(Ae, { delayDuration: 0, children: /* @__PURE__ */ r(
=======
        toggleSidebar: m,
        side: C
      }),
      [b, f, g, m, C]
    );
    return /* @__PURE__ */ r(Sn.Provider, { value: x, children: /* @__PURE__ */ r(Xe, { delayDuration: 0, children: /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    return /* @__PURE__ */ r(kn.Provider, { value: x, children: /* @__PURE__ */ r(Oe, { delayDuration: 0, children: /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": Pa,
            "--sidebar-width-icon": Xa,
            ...o
          }
        ),
        className: l(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          a
        ),
        ref: p,
        ...i,
        children: s
      }
    ) }) });
  }
);
<<<<<<< HEAD
<<<<<<< HEAD
kn.displayName = "SidebarProvider";
const Cn = c.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, s) => {
  const w = Qt();
=======
Rn.displayName = "SidebarProvider";
const Tn = c.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, i) => {
  const w = oe();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Cn.displayName = "SidebarProvider";
const Sn = c.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: a, ...o }, s) => {
  const w = te();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
      "data-state": w.state,
      "data-collapsible": w.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": w.side,
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
              w.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
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
<<<<<<< HEAD
Cn.displayName = "Sidebar";
const Oa = c.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = Qt();
=======
Tn.displayName = "Sidebar";
const $a = c.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = oe();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Sn.displayName = "Sidebar";
const ja = c.forwardRef(({ className: t, onClick: e, ...n }, a) => {
  const o = te();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ d(
    D,
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
        o.side === "primary" ? /* @__PURE__ */ r(br, {}) : /* @__PURE__ */ r(vr, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
ja.displayName = "SidebarTrigger";
const Fa = c.forwardRef(
  ({ className: t, ...e }, n) => {
<<<<<<< HEAD
    const { toggleSidebar: a } = Qt();
=======
    const { toggleSidebar: a } = oe();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
Fa.displayName = "SidebarRail";
const Rn = c.forwardRef(
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
Rn.displayName = "SidebarInset";
const Ga = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt,
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
Ga.displayName = "SidebarInput";
const $a = c.forwardRef(
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
<<<<<<< HEAD
ja.displayName = "SidebarHeader";
const Fa = c.forwardRef(
=======
Ha.displayName = "SidebarHeader";
const Ua = c.forwardRef(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
$a.displayName = "SidebarHeader";
const La = c.forwardRef(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
Fa.displayName = "SidebarFooter";
const Ga = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ve,
=======
Ua.displayName = "SidebarFooter";
const qa = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Pe,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
La.displayName = "SidebarFooter";
const Ya = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ae,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  {
    ref: n,
    "data-sidebar": "separator",
    className: l("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
Ga.displayName = "SidebarSeparator";
const Rn = c.forwardRef(
=======
qa.displayName = "SidebarSeparator";
const En = c.forwardRef(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Ya.displayName = "SidebarSeparator";
const Tn = c.forwardRef(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
Rn.displayName = "SidebarContent";
const ue = c.forwardRef(
=======
En.displayName = "SidebarContent";
const ge = c.forwardRef(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Tn.displayName = "SidebarContent";
const me = c.forwardRef(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
ue.displayName = "SidebarGroup";
const me = c.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Ct : "div",
=======
ge.displayName = "SidebarGroup";
const fe = c.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Rt : "div",
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
me.displayName = "SidebarGroup";
const he = c.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? St : "div",
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
me.displayName = "SidebarGroupLabel";
const $a = c.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Ct : "button",
=======
fe.displayName = "SidebarGroupLabel";
const Ja = c.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? Rt : "button",
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
he.displayName = "SidebarGroupLabel";
const Ha = c.forwardRef(({ className: t, asChild: e = !1, ...n }, a) => /* @__PURE__ */ r(
  e ? St : "button",
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
$a.displayName = "SidebarGroupAction";
const he = c.forwardRef(
=======
Ja.displayName = "SidebarGroupAction";
const be = c.forwardRef(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Ha.displayName = "SidebarGroupAction";
const ge = c.forwardRef(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
he.displayName = "SidebarGroupContent";
const Tn = c.forwardRef(
=======
be.displayName = "SidebarGroupContent";
const zn = c.forwardRef(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
ge.displayName = "SidebarGroupContent";
const _n = c.forwardRef(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
_n.displayName = "SidebarMenu";
const zn = c.forwardRef(
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
zn.displayName = "SidebarMenuItem";
const Ua = bt(
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
), En = c.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: a = "default",
    tooltip: o,
    className: s,
    ...w
<<<<<<< HEAD
  }, i) => {
<<<<<<< HEAD
    const p = t ? Ct : "button", { state: u } = Qt(), m = /* @__PURE__ */ r(
=======
  }, s) => {
    const p = t ? Rt : "button", { state: u } = oe(), h = /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    const p = t ? St : "button", { state: u } = te(), g = /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      p,
      {
        ref: i,
        "data-sidebar": "menu-button",
        "data-size": a,
        "data-active": e,
        className: l(Ua({ variant: n, size: a }), s),
        ...w
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
<<<<<<< HEAD
    }), /* @__PURE__ */ d(Oe, { children: [
      /* @__PURE__ */ r(Pe, { asChild: !0, children: m }),
      /* @__PURE__ */ r(Zt, { side: "right", align: "center", hidden: u !== "collapsed", ...o })
    ] })) : m;
=======
    }), /* @__PURE__ */ d(je, { children: [
      /* @__PURE__ */ r(Fe, { asChild: !0, children: h }),
      /* @__PURE__ */ r(ae, { side: "right", align: "center", hidden: u !== "collapsed", ...o })
    ] })) : h;
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  }
);
En.displayName = "SidebarMenuButton";
const qa = c.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...a }, o) => /* @__PURE__ */ r(
  e ? St : "button",
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
qa.displayName = "SidebarMenuAction";
const Ja = c.forwardRef(
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
Ha.displayName = "SidebarMenuBadge";
const qa = c.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
=======
Ja.displayName = "SidebarMenuBadge";
const Ka = c.forwardRef(({ className: t, showIcon: e = !1, ...n }, a) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const o = c.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: a,
      "data-sidebar": "menu-skeleton",
      className: l("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
<<<<<<< HEAD
        e && /* @__PURE__ */ r(Le, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          Le,
=======
        e && /* @__PURE__ */ r(Ue, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          Ue,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
qa.displayName = "SidebarMenuSkeleton";
const Ua = c.forwardRef(
=======
Ka.displayName = "SidebarMenuSkeleton";
const Wa = c.forwardRef(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
Ua.displayName = "SidebarMenuSub";
const Ja = c.forwardRef(
=======
Wa.displayName = "SidebarMenuSub";
const Za = c.forwardRef(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Za.displayName = "SidebarMenuSubItem";
const Qa = c.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: a, ...o }, s) => /* @__PURE__ */ r(
  t ? St : "a",
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
Qa.displayName = "SidebarMenuSubButton";
function to({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: a,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: i,
  className: p
}) {
<<<<<<< HEAD
  const u = tt(
    (g, h) => {
      a(g, h);
    },
    [a]
  ), m = tt(
=======
  const u = et(
    (g, m) => {
      a(g, m);
    },
    [a]
  ), h = et(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    (g) => {
      const m = n.find((b) => b.projectId === g);
      return m ? m.projectName : g;
    },
    [n]
  ), f = tt(
    (g) => !o.projectId && g === o.label,
    [o]
  );
  return /* @__PURE__ */ r(
    Sn,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: l("tw-w-96 tw-gap-2 tw-overflow-y-auto", p),
<<<<<<< HEAD
<<<<<<< HEAD
      children: /* @__PURE__ */ d(Rn, { children: [
        /* @__PURE__ */ d(ue, { children: [
          /* @__PURE__ */ r(me, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(he, { children: /* @__PURE__ */ r(Tn, { children: Object.entries(e).map(([g, h]) => /* @__PURE__ */ r(_n, { children: /* @__PURE__ */ r(
=======
      children: /* @__PURE__ */ d(Tn, { children: [
        /* @__PURE__ */ d(me, { children: [
          /* @__PURE__ */ r(he, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(ge, { children: /* @__PURE__ */ r(_n, { children: Object.entries(e).map(([h, m]) => /* @__PURE__ */ r(zn, { children: /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
            En,
=======
      children: /* @__PURE__ */ d(En, { children: [
        /* @__PURE__ */ d(ge, { children: [
          /* @__PURE__ */ r(fe, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(be, { children: /* @__PURE__ */ r(zn, { children: Object.entries(e).map(([g, m]) => /* @__PURE__ */ r(Mn, { children: /* @__PURE__ */ r(
            Dn,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
            {
              onClick: () => u(g),
              isActive: f(g),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: m })
            }
          ) }, g)) }) })
        ] }),
<<<<<<< HEAD
        /* @__PURE__ */ d(ue, { children: [
          /* @__PURE__ */ r(me, { className: "tw-text-sm", children: w }),
          /* @__PURE__ */ r(he, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            pe,
=======
        /* @__PURE__ */ d(ge, { children: [
          /* @__PURE__ */ r(fe, { className: "tw-text-sm", children: w }),
          /* @__PURE__ */ r(be, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            he,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
            {
              buttonVariant: "ghost",
              buttonClassName: l("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": o == null ? void 0 : o.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((g) => g.projectId),
<<<<<<< HEAD
              getOptionLabel: (g) => m(g),
              buttonPlaceholder: i,
              onChange: (g) => {
                const h = m(g);
                u(h, g);
=======
              getOptionLabel: (g) => h(g),
              buttonPlaceholder: s,
              onChange: (g) => {
                const m = h(g);
                u(m, g);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(xr, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
function Dn({
  value: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: a,
  className: o
}) {
  const s = G();
  return /* @__PURE__ */ d("div", { className: l("tw-relative", { "tw-w-full": a }, o), children: [
    /* @__PURE__ */ r(
      He,
      {
        className: l(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": s === "rtl" },
          { "tw-left-3": s === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ r(
      Tt,
      {
        className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
        placeholder: n,
        value: t,
        onChange: (w) => e(w.target.value)
      }
    ),
    t && /* @__PURE__ */ d(
      D,
      {
        variant: "ghost",
        size: "icon",
        className: l(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": s === "rtl" },
          { "tw-right-0": s === "ltr" }
        ),
        onClick: () => {
          e("");
        },
        children: [
<<<<<<< HEAD
          /* @__PURE__ */ r(be, { className: "tw-h-4 tw-w-4" }),
=======
          /* @__PURE__ */ r(ye, { className: "tw-h-4 tw-w-4" }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
function Cs({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: a,
  handleSelectSidebarItem: o,
  selectedSidebarItem: s,
  searchValue: w,
  onSearch: i,
  extensionsSidebarGroupLabel: p,
  projectsSidebarGroupLabel: u,
<<<<<<< HEAD
  buttonPlaceholderText: m
=======
  buttonPlaceholderText: h
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Dn,
      {
        className: "tw-w-9/12",
        value: w,
        onSearch: i,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      Cn,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            to,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: o,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: p,
              projectsSidebarGroupLabel: u,
<<<<<<< HEAD
              buttonPlaceholderText: m
=======
              buttonPlaceholderText: h
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
            }
          ),
          /* @__PURE__ */ r(Rn, { className: "tw-min-w-[215px]", children: a })
        ]
      }
    )
  ] });
}
const it = "scrBook", eo = "scrRef", ut = "source", no = "details", ro = "Scripture Reference", ao = "Scripture Book", Mn = "Type", oo = "Details";
function so(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (a) => `${a.start.book} ${a.start.chapterNum}:${a.start.verseNum}`,
      id: it,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? ro,
      cell: (a) => {
        const o = a.row.original;
<<<<<<< HEAD
<<<<<<< HEAD
        return a.row.getIsGrouped() ? j.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === st ? It(o.start) : void 0;
=======
        return a.row.getIsGrouped() ? X.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === it ? xt(o.start) : void 0;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      },
      getGroupingValue: (a) => j.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => we(a.original.start, o.original.start),
=======
        return a.row.getIsGrouped() ? O.bookIdToEnglishName(o.start.book) : a.row.groupingColumnId === lt ? Ot(o.start) : void 0;
      },
      getGroupingValue: (a) => O.bookIdToNumber(a.start.book),
      sortingFn: (a, o) => ce(a.original.start, o.original.start),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      enableGrouping: !0
    },
    {
<<<<<<< HEAD
      accessorFn: (a) => It(a.start),
      id: Za,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : It(o.start);
=======
      accessorFn: (a) => xt(a.start),
      id: eo,
      header: void 0,
      cell: (a) => {
        const o = a.row.original;
        return a.row.getIsGrouped() ? void 0 : xt(o.start);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      },
<<<<<<< HEAD
      sortingFn: (a, o) => we(a.original.start, o.original.start),
=======
      sortingFn: (a, o) => ce(a.original.start, o.original.start),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      enableGrouping: !1
    },
    {
      accessorFn: (a) => a.source.displayName,
      id: ut,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Mn : void 0,
      cell: (a) => n || a.row.getIsGrouped() ? a.getValue() : void 0,
      getGroupingValue: (a) => a.source.id,
      sortingFn: (a, o) => a.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (a) => a.detail,
      id: no,
      header: (t == null ? void 0 : t.detailsColumnName) ?? oo,
      cell: (a) => a.getValue(),
      enableGrouping: !1
    }
  ];
}
const io = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
<<<<<<< HEAD
<<<<<<< HEAD
  return t.end && ({ offset: n } = t.end), !t.end || we(t.start, t.end) === 0 ? `${re(t.start)}+${e}` : `${re(t.start)}+${e}-${re(t.end)}+${n}`;
}, Ye = (t) => `${ao({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function xs({
=======
  return t.end && ({ offset: n } = t.end), !t.end || ce(t.start, t.end) === 0 ? `${se(t.start)}+${e}` : `${se(t.start)}+${e}-${se(t.end)}+${n}`;
}, qe = (t) => `${co({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function ks({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  return t.end && ({ offset: n } = t.end), !t.end || le(t.start, t.end) === 0 ? `${ae(t.start)}+${e}` : `${ae(t.start)}+${e}-${ae(t.end)}+${n}`;
}, Ye = (t) => `${io({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ss({
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: a,
  scriptureBookGroupName: o,
  typeColumnName: s,
  detailsColumnName: w,
  onRowSelected: i
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  const [p, u] = P([]), [m, f] = P([{ id: st, desc: !1 }]), [g, h] = P({}), v = W(
    () => t.flatMap((k) => k.data.map((_) => ({
      ..._,
      source: k.source
    }))),
    [t]
  ), C = W(
    () => ro(
=======
  const [p, u] = B([]), [h, f] = B([{ id: lt, desc: !1 }]), [g, m] = B({}), b = Q(
    () => t.flatMap((N) => N.data.map((_) => ({
      ..._,
      source: N.source
    }))),
    [t]
  ), v = Q(
    () => lo(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  const [p, u] = P([]), [g, b] = P([{ id: it, desc: !1 }]), [h, m] = P({}), f = W(
    () => t.flatMap((N) => N.data.map((T) => ({
      ...T,
      source: N.source
    }))),
    [t]
  ), k = W(
    () => so(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      {
        scriptureReferenceColumnName: a,
        typeColumnName: s,
        detailsColumnName: w
      },
      n
    ),
    [a, s, w, n]
  );
  wt(() => {
    p.includes(ut) ? f([
      { id: ut, desc: !1 },
<<<<<<< HEAD
      { id: st, desc: !1 }
    ]) : f([{ id: st, desc: !1 }]);
=======
      { id: it, desc: !1 }
    ]) : b([{ id: it, desc: !1 }]);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  }, [p]);
<<<<<<< HEAD
  const b = Je({
    data: v,
    columns: C,
    state: {
      grouping: p,
      sorting: m,
=======
  const y = Ze({
    data: b,
    columns: v,
    state: {
      grouping: p,
      sorting: h,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      rowSelection: g
    },
    onGroupingChange: u,
<<<<<<< HEAD
    onSortingChange: f,
<<<<<<< HEAD
    onRowSelectionChange: h,
    getExpandedRowModel: Tr(),
    getGroupedRowModel: Rr(),
=======
    onSortingChange: b,
    onRowSelectionChange: m,
    getExpandedRowModel: Er(),
    getGroupedRowModel: zr(),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    getCoreRowModel: We(),
    getSortedRowModel: Ke(),
    getRowId: Ye,
=======
    onRowSelectionChange: m,
    getExpandedRowModel: Mr(),
    getGroupedRowModel: zr(),
    getCoreRowModel: tn(),
    getSortedRowModel: Qe(),
    getRowId: qe,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
<<<<<<< HEAD
  wt(() => {
    if (i) {
      const k = b.getSelectedRowModel().rowsById, _ = Object.keys(k);
      if (_.length === 1) {
        const L = v.find((A) => Ye(A) === _[0]) || void 0;
        L && i(L);
      }
    }
<<<<<<< HEAD
  }, [g, v, i, b]);
  const x = o ?? eo, N = s ?? Mn, T = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${x}`, value: [st] },
    { label: `Group by ${N}`, value: [ut] },
    {
      label: `Group by ${x} and ${N}`,
      value: [st, ut]
    },
    {
      label: `Group by ${N} and ${x}`,
      value: [ut, st]
=======
  }, [h, f, i, C]);
  const y = o ?? ao, x = s ?? Mn, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [it] },
    { label: `Group by ${x}`, value: [ut] },
    {
      label: `Group by ${y} and ${x}`,
      value: [it, ut]
    },
    {
      label: `Group by ${x} and ${y}`,
      value: [ut, it]
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    }
  ], X = (k) => {
    u(JSON.parse(k));
  }, U = (k, _) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(_);
  }, lt = (k, _) => k.getIsGrouped() ? "" : l("banded-row", _ % 2 === 0 ? "even" : "odd"), dt = (k, _, L) => {
    if (!((k == null ? void 0 : k.length) === 0 || _.depth < L.column.getGroupedIndex())) {
=======
  ct(() => {
    if (s) {
      const N = y.getSelectedRowModel().rowsById, _ = Object.keys(N);
      if (_.length === 1) {
        const K = b.find((P) => qe(P) === _[0]) || void 0;
        K && s(K);
      }
    }
  }, [g, b, s, y]);
  const C = o ?? io, x = i ?? Vn, z = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [lt] },
    { label: `Group by ${x}`, value: [ht] },
    {
      label: `Group by ${C} and ${x}`,
      value: [lt, ht]
    },
    {
      label: `Group by ${x} and ${C}`,
      value: [ht, lt]
    }
  ], j = (N) => {
    u(JSON.parse(N));
  }, tt = (N, _) => {
    !N.getIsGrouped() && !N.getIsSelected() && N.getToggleSelectedHandler()(_);
  }, ot = (N, _) => N.getIsGrouped() ? "" : l("banded-row", _ % 2 === 0 ? "even" : "odd"), zt = (N, _, K) => {
    if (!((N == null ? void 0 : N.length) === 0 || _.depth < K.column.getGroupedIndex())) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      if (_.getIsGrouped())
        switch (_.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (_.depth) {
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
      yt,
      {
        value: JSON.stringify(p),
<<<<<<< HEAD
        onValueChange: (k) => {
          X(k);
        },
        children: [
<<<<<<< HEAD
          /* @__PURE__ */ r(ht, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(xt, {}) }),
          /* @__PURE__ */ r(gt, { position: "item-aligned", children: /* @__PURE__ */ r(ma, { children: T.map((k) => /* @__PURE__ */ r(Q, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(Ut, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Jt, { children: b.getHeaderGroups().map((k) => /* @__PURE__ */ r(it, { children: k.headers.filter((_) => _.column.columnDef.header).map((_) => (
=======
          /* @__PURE__ */ r(ht, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Nt, {}) }),
          /* @__PURE__ */ r(gt, { position: "item-aligned", children: /* @__PURE__ */ r(fa, { children: E.map((N) => /* @__PURE__ */ r(Q, { value: JSON.stringify(N.value), children: N.label }, N.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(Ft, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Wt, { children: C.getHeaderGroups().map((N) => /* @__PURE__ */ r(at, { children: N.headers.filter((T) => T.column.columnDef.header).map((T) => (
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(At, { colSpan: _.colSpan, className: "top-0 tw-sticky", children: _.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
=======
        onValueChange: (N) => {
          j(N);
        },
        children: [
          /* @__PURE__ */ r(ft, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Nt, {}) }),
          /* @__PURE__ */ r(bt, { position: "item-aligned", children: /* @__PURE__ */ r(ba, { children: z.map((N) => /* @__PURE__ */ r(W, { value: JSON.stringify(N.value), children: N.label }, N.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(te, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(ee, { children: y.getHeaderGroups().map((N) => /* @__PURE__ */ r(dt, { children: N.headers.filter((_) => _.column.columnDef.header).map((_) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(Gt, { colSpan: _.colSpan, className: "top-0 tw-sticky", children: _.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
          _.column.getCanGroup() ? /* @__PURE__ */ r(
            D,
            {
              variant: "ghost",
              title: `Toggle grouping by ${_.column.columnDef.header}`,
              onClick: _.column.getToggleGroupingHandler(),
              type: "button",
              children: _.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
<<<<<<< HEAD
          Dt(_.column.columnDef.header, _.getContext())
        ] }) }, _.id)
      )) }, k.id)) }),
      /* @__PURE__ */ r(Kt, { children: b.getRowModel().rows.map((k, _) => {
        const L = G();
=======
          Pt(_.column.columnDef.header, _.getContext())
        ] }) }, _.id)
      )) }, N.id)) }),
<<<<<<< HEAD
      /* @__PURE__ */ r(ne, { children: y.getRowModel().rows.map((N, _) => {
        const K = $();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
      /* @__PURE__ */ r(Gt, { children: C.getRowModel().rows.map((N, T) => {
        const L = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        return /* @__PURE__ */ r(
          at,
          {
<<<<<<< HEAD
            "data-state": k.getIsSelected() ? "selected" : "",
            className: l(lt(k, _)),
            onClick: (A) => U(k, A),
            children: k.getVisibleCells().map((A) => {
              if (!(A.getIsPlaceholder() || A.column.columnDef.enableGrouping && !A.getIsGrouped() && (A.column.columnDef.id !== ut || !n)))
=======
            "data-state": N.getIsSelected() ? "selected" : "",
            className: l(ot(N, _)),
            onClick: (P) => tt(N, P),
            children: N.getVisibleCells().map((P) => {
              if (!(P.getIsPlaceholder() || P.column.columnDef.enableGrouping && !P.getIsGrouped() && (P.column.columnDef.id !== ht || !n)))
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
                return /* @__PURE__ */ r(
                  ft,
                  {
                    className: l(
<<<<<<< HEAD
                      A.column.columnDef.id,
                      "tw-p-[1px]",
                      dt(p, k, A)
                    ),
                    children: A.getIsGrouped() ? /* @__PURE__ */ d(
                      D,
                      {
                        variant: "link",
                        onClick: k.getToggleExpandedHandler(),
                        type: "button",
                        children: [
<<<<<<< HEAD
                          k.getIsExpanded() && /* @__PURE__ */ r(Lt, {}),
                          !k.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ r(ge, {}) : /* @__PURE__ */ r(vr, {})),
=======
                          N.getIsExpanded() && /* @__PURE__ */ r(Ut, {}),
                          !N.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ r(fe, {}) : /* @__PURE__ */ r(yr, {})),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
                          " ",
                          Dt(A.column.columnDef.cell, A.getContext()),
                          " (",
                          k.subRows.length,
                          ")"
                        ]
                      }
                    ) : Dt(A.column.columnDef.cell, A.getContext())
                  },
                  A.id
                );
            })
          },
          k.id
=======
                      P.column.columnDef.id,
                      "tw-p-[1px]",
                      zt(p, N, P)
                    ),
                    children: P.getIsGrouped() ? /* @__PURE__ */ d(
                      D,
                      {
                        variant: "link",
                        onClick: N.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          N.getIsExpanded() && /* @__PURE__ */ r(Kt, {}),
                          !N.getIsExpanded() && (K === "ltr" ? /* @__PURE__ */ r(ve, {}) : /* @__PURE__ */ r(Nr, {})),
                          " ",
                          Pt(P.column.columnDef.cell, P.getContext()),
                          " (",
                          N.subRows.length,
                          ")"
                        ]
                      }
                    ) : Pt(P.column.columnDef.cell, P.getContext())
                  },
                  P.id
                );
            })
          },
          N.id
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        );
      }) })
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
const se = {
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
=======
const le = {
=======
const ie = {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  [M("undefined")]: "Ø",
  [M(0)]: "A",
  [M(1)]: "B",
  [M(2)]: "C",
  [M(3)]: "D",
  [M(4)]: "E",
  [M(5)]: "F",
  [M(6)]: "G",
  [M(7)]: "H",
  [M(8)]: "I",
  [M(9)]: "J",
  [M(10)]: "K",
  [M(11)]: "L",
  [M(12)]: "M",
  [M(13)]: "N",
  [M(14)]: "O",
  [M(15)]: "P",
  [M(16)]: "Q",
  [M(17)]: "R",
  [M(18)]: "S",
  [M(19)]: "T",
  [M(20)]: "U",
  [M(21)]: "V",
  [M(22)]: "W",
  [M(23)]: "X",
  [M(24)]: "Y",
  [M(25)]: "Z"
<<<<<<< HEAD
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
};
function Rs({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: a = {},
  className: o
}) {
<<<<<<< HEAD
  const s = {
    ...se,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([i, p]) => [
          i,
          i === p && i in se ? se[i] : p
=======
  const i = {
    ...le,
    ...Object.fromEntries(
      Object.entries(a).map(
        ([s, p]) => [
          s,
          s === p && s in le ? le[s] : p
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        ]
      )
    )
  }, w = G();
  return /* @__PURE__ */ d(
    yt,
    {
      value: `${e}`,
      onValueChange: (i) => n(
        i === "undefined" ? void 0 : parseInt(i, 10)
      ),
      children: [
        /* @__PURE__ */ r(ht, { className: l("pr-twp tw-w-auto", o), children: /* @__PURE__ */ r(
          Nt,
          {
<<<<<<< HEAD
<<<<<<< HEAD
            placeholder: s[I(e)] ?? e
=======
            placeholder: i[M(e)] ?? e
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
            placeholder: s[M(e)] ?? e
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          }
        ) }),
        /* @__PURE__ */ r(
          gt,
          {
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
<<<<<<< HEAD
<<<<<<< HEAD
            children: t.map((i) => /* @__PURE__ */ r(Q, { value: `${i}`, children: s[I(i)] }, `${i}`))
=======
            children: t.map((s) => /* @__PURE__ */ r(W, { value: `${s}`, children: i[M(s)] }, `${s}`))
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
            children: t.map((i) => /* @__PURE__ */ r(Q, { value: `${i}`, children: s[M(i)] }, `${i}`))
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          }
        )
      ]
    }
  );
}
function Ts({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function _s({
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
function zs({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
<<<<<<< HEAD
    n ? /* @__PURE__ */ r(Ve, {}) : ""
=======
    n ? /* @__PURE__ */ r(Pe, {}) : ""
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  ] });
}
function In(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, a]) => "menuItem" in a && a.menuItem === e
  )) == null ? void 0 : n[0];
}
<<<<<<< HEAD
function Gt({ icon: t, menuLabel: e, leading: n }) {
=======
function Yt({ icon: t, menuLabel: e, leading: n }) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: l("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
<<<<<<< HEAD
<<<<<<< HEAD
const Dn = (t, e, n, a) => n ? Object.entries(t).filter(
=======
const Bn = (t, e, n, a) => n ? Object.entries(t).filter(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  ([s, w]) => "column" in w && w.column === n || s === n
).sort(([, s], [, w]) => s.order - w.order).flatMap(([s]) => e.filter((i) => i.group === s).sort((i, p) => i.order - p.order).map((i) => /* @__PURE__ */ d(Oe, { children: [
  /* @__PURE__ */ r(Pe, { asChild: !0, children: "command" in i ? /* @__PURE__ */ d(
    Ne,
=======
const An = (t, e, n, a) => n ? Object.entries(t).filter(
  ([i, w]) => "column" in w && w.column === n || i === n
).sort(([, i], [, w]) => i.order - w.order).flatMap(([i]) => e.filter((s) => s.group === i).sort((s, p) => s.order - p.order).map((s) => /* @__PURE__ */ d(je, { children: [
  /* @__PURE__ */ r(Fe, { asChild: !0, children: "command" in s ? /* @__PURE__ */ d(
    Se,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      onClick: () => {
        a(i);
      },
      children: [
<<<<<<< HEAD
        i.iconPathBefore && /* @__PURE__ */ r(Gt, { icon: i.iconPathBefore, menuLabel: i.label, leading: !0 }),
        i.label,
        i.iconPathAfter && /* @__PURE__ */ r(Gt, { icon: i.iconPathAfter, menuLabel: i.label })
=======
        i.iconPathBefore && /* @__PURE__ */ r(Yt, { icon: i.iconPathBefore, menuLabel: i.label, leading: !0 }),
        i.label,
        i.iconPathAfter && /* @__PURE__ */ r(Yt, { icon: i.iconPathAfter, menuLabel: i.label })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      ]
    },
    `dropdown-menu-item-${i.label}-${i.command}`
  ) : /* @__PURE__ */ d(Pr, { children: [
    /* @__PURE__ */ r(en, { children: i.label }),
<<<<<<< HEAD
    /* @__PURE__ */ r(Br, { children: /* @__PURE__ */ r(nn, { children: Dn(
=======
    /* @__PURE__ */ r(Or, { children: /* @__PURE__ */ r(nn, { children: Bn(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      t,
      e,
      In(t, i.id),
      a
    ) }) })
<<<<<<< HEAD
  ] }, `dropdown-menu-sub-${i.label}-${i.id}`) }),
  i.tooltip && /* @__PURE__ */ r(Zt, { children: i.tooltip })
] }, `tooltip-${i.label}-${"command" in i ? i.command : i.id}`))) : void 0;
<<<<<<< HEAD
function Ss({
=======
  ] }, `dropdown-menu-sub-${s.label}-${s.id}`) }),
  s.tooltip && /* @__PURE__ */ r(ae, { children: s.tooltip })
] }, `tooltip-${s.label}-${"command" in s ? s.command : s.id}`))) : void 0;
function _s({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
function Es({
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  commandHandler: t,
  menuData: e,
  tabLabel: n,
  icon: a,
  className: o,
  variant: s,
  id: w
}) {
<<<<<<< HEAD
<<<<<<< HEAD
  return /* @__PURE__ */ d(Ht, { variant: s, children: [
    /* @__PURE__ */ r(ye, { "aria-label": n, className: o, asChild: !0, id: w, children: /* @__PURE__ */ r(D, { variant: "ghost", className: "tw-h-6 tw-p-1", children: a ?? /* @__PURE__ */ r(xr, {}) }) }),
    /* @__PURE__ */ r(Pt, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, i]) => typeof i == "object").sort(([, i], [, p]) => typeof i == "boolean" || typeof p == "boolean" ? 0 : i.order - p.order).map(([i], p, u) => /* @__PURE__ */ d(qn, { children: [
      /* @__PURE__ */ r(tn, { children: /* @__PURE__ */ r(Ae, { children: Dn(e.groups, e.items, i, t) }) }),
      p < u.length - 1 && /* @__PURE__ */ r(Xt, {})
=======
  return /* @__PURE__ */ d(Jt, { variant: s, children: [
    /* @__PURE__ */ r(Ne, { "aria-label": n, className: o, asChild: !0, id: w, children: /* @__PURE__ */ r(I, { variant: "ghost", className: "tw-h-6 tw-p-1", children: a ?? /* @__PURE__ */ r(Nr, {}) }) }),
    /* @__PURE__ */ r(Xt, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, i]) => typeof i == "object").sort(([, i], [, p]) => typeof i == "boolean" || typeof p == "boolean" ? 0 : i.order - p.order).map(([i], p, u) => /* @__PURE__ */ d(qn, { children: [
      /* @__PURE__ */ r(tn, { children: /* @__PURE__ */ r(Oe, { children: Bn(e.groups, e.items, i, t) }) }),
      p < u.length - 1 && /* @__PURE__ */ r(jt, {})
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    ] }, i)) })
=======
  return /* @__PURE__ */ d(Zt, { variant: i, children: [
    /* @__PURE__ */ r(Ce, { "aria-label": n, className: o, asChild: !0, id: w, children: /* @__PURE__ */ r(D, { variant: "ghost", className: "tw-h-6 tw-p-1", children: a ?? /* @__PURE__ */ r(kr, {}) }) }),
    /* @__PURE__ */ r(Lt, { align: "start", className: "tw-z-[250]", children: Object.entries(e.columns).filter(([, s]) => typeof s == "object").sort(([, s], [, p]) => typeof s == "boolean" || typeof p == "boolean" ? 0 : s.order - p.order).map(([s], p, u) => /* @__PURE__ */ d(Kn, { children: [
      /* @__PURE__ */ r(rn, { children: /* @__PURE__ */ r(Xe, { children: An(e.groups, e.items, s, t) }) }),
      p < u.length - 1 && /* @__PURE__ */ r(Yt, {})
    ] }, s)) })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  ] });
}
<<<<<<< HEAD
const Bn = c.forwardRef(({ className: t, ...e }, n) => {
  const a = G();
=======
const Vn = c.forwardRef(({ className: t, ...e }, n) => {
  const a = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ r(
    q.Root,
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
<<<<<<< HEAD
Bn.displayName = q.List.displayName;
const Vn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
On.displayName = q.List.displayName;
const Pn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  q.List,
=======
Vn.displayName = U.List.displayName;
const An = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.List,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
Vn.displayName = q.List.displayName;
const oo = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Pn.displayName = q.List.displayName;
const po = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  q.Trigger,
=======
An.displayName = U.List.displayName;
const wo = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Trigger,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  {
    ref: n,
    ...e,
    className: l(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
<<<<<<< HEAD
<<<<<<< HEAD
)), An = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
)), Xn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  q.Content,
=======
)), On = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Content,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
An.displayName = q.Content.displayName;
function Rs({
=======
Xn.displayName = q.Content.displayName;
function Es({
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
On.displayName = U.Content.displayName;
function Ds({
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
        Dn,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: a
        }
      )
    ] }),
    /* @__PURE__ */ d(Vn, { children: [
      /* @__PURE__ */ r(An, { children: t.map((w) => /* @__PURE__ */ r(wo, { value: w.value, children: w.value }, w.key)) }),
      t.map((w) => /* @__PURE__ */ r(On, { value: w.value, children: w.content }, w.key))
    ] })
  ] });
}
<<<<<<< HEAD
<<<<<<< HEAD
function so({ ...t }) {
  return /* @__PURE__ */ r(V.Menu, { ...t });
}
function io({ ...t }) {
=======
function uo({ ...t }) {
  return /* @__PURE__ */ r(V.Menu, { ...t });
}
function mo({ ...t }) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
function lo({ ...t }) {
  return /* @__PURE__ */ r(V.Menu, { ...t });
}
function co({ ...t }) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ r(V.Sub, { "data-slot": "menubar-sub", ...t });
}
const Pn = c.forwardRef(({ className: t, variant: e = "default", ...n }, a) => {
  const o = c.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
<<<<<<< HEAD
  return /* @__PURE__ */ r(xe.Provider, { value: o, children: /* @__PURE__ */ r(
=======
  return /* @__PURE__ */ r(ke.Provider, { value: o, children: /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    V.Root,
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
<<<<<<< HEAD
On.displayName = V.Root.displayName;
const Pn = c.forwardRef(({ className: t, ...e }, n) => {
=======
Pn.displayName = V.Root.displayName;
const Xn = c.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const a = et();
=======
jn.displayName = V.Root.displayName;
const Fn = c.forwardRef(({ className: t, ...e }, n) => {
  const a = nt();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ r(
    V.Trigger,
    {
      ref: n,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        ot({ variant: a.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
Pn.displayName = V.Trigger.displayName;
const Xn = c.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
=======
Xn.displayName = V.Trigger.displayName;
const jn = c.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const s = et();
=======
Fn.displayName = V.Trigger.displayName;
const Gn = c.forwardRef(({ className: t, inset: e, children: n, ...a }, o) => {
  const i = nt();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ d(
    V.SubTrigger,
    {
      ref: o,
      className: l(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        ot({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        n,
<<<<<<< HEAD
        /* @__PURE__ */ r(ge, { className: "tw-ml-auto tw-h-4 tw-w-4" })
=======
        /* @__PURE__ */ r(ve, { className: "tw-ml-auto tw-h-4 tw-w-4" })
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      ]
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
Xn.displayName = V.SubTrigger.displayName;
const jn = c.forwardRef(({ className: t, ...e }, n) => {
=======
jn.displayName = V.SubTrigger.displayName;
const Fn = c.forwardRef(({ className: t, ...e }, n) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const a = et();
=======
Gn.displayName = V.SubTrigger.displayName;
const $n = c.forwardRef(({ className: t, ...e }, n) => {
  const a = nt();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ r(
    V.SubContent,
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
<<<<<<< HEAD
jn.displayName = V.SubContent.displayName;
const Fn = c.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, s) => {
=======
Fn.displayName = V.SubContent.displayName;
const Gn = c.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, s) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const w = et();
=======
$n.displayName = V.SubContent.displayName;
const Ln = c.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: a = 8, ...o }, i) => {
  const w = nt();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ r(V.Portal, { children: /* @__PURE__ */ r(
    V.Content,
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
          "tw-bg-popover": w.variant === "muted"
        },
        t
      ),
      ...o
    }
  ) });
});
<<<<<<< HEAD
<<<<<<< HEAD
Fn.displayName = V.Content.displayName;
const Gn = c.forwardRef(({ className: t, inset: e, ...n }, a) => {
=======
Gn.displayName = V.Content.displayName;
const $n = c.forwardRef(({ className: t, inset: e, ...n }, a) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const o = et();
=======
Ln.displayName = V.Content.displayName;
const Yn = c.forwardRef(({ className: t, inset: e, ...n }, a) => {
  const o = nt();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ r(
    V.Item,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        ot({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
Gn.displayName = V.Item.displayName;
const wo = c.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
=======
$n.displayName = V.Item.displayName;
const po = c.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const s = et();
=======
Yn.displayName = V.Item.displayName;
const ho = c.forwardRef(({ className: t, children: e, checked: n, ...a }, o) => {
  const i = nt();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ d(
    V.CheckboxItem,
    {
      ref: o,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ot({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...a,
      children: [
<<<<<<< HEAD
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(V.ItemIndicator, { children: /* @__PURE__ */ r(kt, { className: "tw-h-4 tw-w-4" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(V.ItemIndicator, { children: /* @__PURE__ */ r(St, { className: "tw-h-4 tw-w-4" }) }) }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(V.ItemIndicator, { children: /* @__PURE__ */ r(Ct, { className: "tw-h-4 tw-w-4" }) }) }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        e
      ]
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
wo.displayName = V.CheckboxItem.displayName;
const lo = c.forwardRef(({ className: t, children: e, ...n }, a) => {
=======
po.displayName = V.CheckboxItem.displayName;
const uo = c.forwardRef(({ className: t, children: e, ...n }, a) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const o = et();
=======
ho.displayName = V.CheckboxItem.displayName;
const go = c.forwardRef(({ className: t, children: e, ...n }, a) => {
  const o = nt();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ d(
    V.RadioItem,
    {
      ref: a,
      className: l(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        ot({ variant: o.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
<<<<<<< HEAD
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(V.ItemIndicator, { children: /* @__PURE__ */ r(fe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
=======
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(V.ItemIndicator, { children: /* @__PURE__ */ r(xe, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        e
      ]
    }
  );
});
<<<<<<< HEAD
<<<<<<< HEAD
lo.displayName = V.RadioItem.displayName;
const co = c.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
=======
go.displayName = V.RadioItem.displayName;
const fo = c.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
uo.displayName = V.RadioItem.displayName;
const mo = c.forwardRef(({ className: t, inset: e, ...n }, a) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  V.Label,
  {
    ref: a,
    className: l("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
co.displayName = V.Label.displayName;
const $n = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
fo.displayName = V.Label.displayName;
const Hn = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
mo.displayName = V.Label.displayName;
const Ln = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  V.Separator,
  {
    ref: n,
    className: l("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
<<<<<<< HEAD
<<<<<<< HEAD
$n.displayName = V.Separator.displayName;
const zt = (t, e) => {
=======
Hn.displayName = V.Separator.displayName;
const Bt = (t, e) => {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Ln.displayName = V.Separator.displayName;
const Dt = (t, e) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  setTimeout(() => {
    e.forEach((n) => {
      var a;
      (a = t.current) == null || a.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
<<<<<<< HEAD
<<<<<<< HEAD
}, Ln = (t, e, n, a) => {
=======
}, Yn = (t, e, n, a) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  if (!n) return;
  const o = Object.entries(t).filter(
    ([s, w]) => "column" in w && w.column === n || s === n
  ).sort(([, s], [, w]) => s.order - w.order);
  return o.flatMap(([s], w) => {
<<<<<<< HEAD
    const i = e.filter((u) => u.group === s).sort((u, m) => u.order - m.order).map((u) => /* @__PURE__ */ d(Oe, { children: [
      /* @__PURE__ */ r(Pe, { asChild: !0, children: "command" in u ? /* @__PURE__ */ d(
        Gn,
=======
}, Un = (t, e, n, a) => {
  if (!n) return;
  const o = Object.entries(t).filter(
    ([i, w]) => "column" in w && w.column === n || i === n
  ).sort(([, i], [, w]) => i.order - w.order);
  return o.flatMap(([i], w) => {
    const s = e.filter((u) => u.group === i).sort((u, h) => u.order - h.order).map((u) => /* @__PURE__ */ d(je, { children: [
      /* @__PURE__ */ r(Fe, { asChild: !0, children: "command" in u ? /* @__PURE__ */ d(
        Yn,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    const i = e.filter((u) => u.group === s).sort((u, g) => u.order - g.order).map((u) => /* @__PURE__ */ d(Pe, { children: [
      /* @__PURE__ */ r(Xe, { asChild: !0, children: "command" in u ? /* @__PURE__ */ d(
        $n,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        {
          onClick: () => {
            a(u);
          },
          children: [
<<<<<<< HEAD
<<<<<<< HEAD
            u.iconPathBefore && /* @__PURE__ */ r(Gt, { icon: u.iconPathBefore, menuLabel: u.label, leading: !0 }),
            u.label,
            u.iconPathAfter && /* @__PURE__ */ r(Gt, { icon: u.iconPathAfter, menuLabel: u.label })
=======
            u.iconPathBefore && /* @__PURE__ */ r(Yt, { icon: u.iconPathBefore, menuLabel: u.label, leading: !0 }),
            u.label,
            u.iconPathAfter && /* @__PURE__ */ r(Yt, { icon: u.iconPathAfter, menuLabel: u.label })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
          ]
        },
        `menubar-item-${u.label}-${u.command}`
      ) : /* @__PURE__ */ d(co, { children: [
        /* @__PURE__ */ r(jn, { children: u.label }),
        /* @__PURE__ */ r(Fn, { children: Yn(
          t,
          e,
          In(t, u.id),
          a
        ) })
      ] }, `menubar-sub-${u.label}-${u.id}`) }),
      u.tooltip && /* @__PURE__ */ r(Zt, { children: u.tooltip })
    ] }, `tooltip-${u.label}-${"command" in u ? u.command : u.id}`)), p = [...i];
<<<<<<< HEAD
    return i.length > 0 && w < o.length - 1 && p.push(/* @__PURE__ */ r($n, {}, `separator-${s}`)), p;
=======
            u.iconPathBefore && /* @__PURE__ */ r(qt, { icon: u.iconPathBefore, menuLabel: u.label, leading: !0 }),
            u.label,
            u.iconPathAfter && /* @__PURE__ */ r(qt, { icon: u.iconPathAfter, menuLabel: u.label })
          ]
        },
        `menubar-item-${u.label}-${u.command}`
      ) : /* @__PURE__ */ d(mo, { children: [
        /* @__PURE__ */ r(Gn, { children: u.label }),
        /* @__PURE__ */ r($n, { children: Un(
          t,
          e,
          Bn(t, u.id),
          a
        ) })
      ] }, `menubar-sub-${u.label}-${u.id}`) }),
      u.tooltip && /* @__PURE__ */ r(ae, { children: u.tooltip })
    ] }, `tooltip-${u.label}-${"command" in u ? u.command : u.id}`)), p = [...s];
    return s.length > 0 && w < o.length - 1 && p.push(/* @__PURE__ */ r(Hn, {}, `separator-${i}`)), p;
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    return i.length > 0 && w < o.length - 1 && p.push(/* @__PURE__ */ r(Ln, {}, `separator-${s}`)), p;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  });
};
function ho({
  menuData: t,
  commandHandler: e,
  onOpenChange: n,
  variant: a
}) {
<<<<<<< HEAD
  const o = K(void 0), s = K(void 0), w = K(void 0), i = K(void 0), p = K(void 0), u = (m) => {
    switch (m) {
=======
  const o = Z(void 0), i = Z(void 0), w = Z(void 0), s = Z(void 0), p = Z(void 0), u = (h) => {
    switch (h) {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      case "platform.app":
        return s;
      case "platform.window":
        return w;
      case "platform.layout":
        return i;
      case "platform.help":
        return p;
      default:
        return;
    }
  };
<<<<<<< HEAD
<<<<<<< HEAD
  if (Er(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (m, f) => {
    var v, C, b, x;
    m.preventDefault();
    const g = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, h = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
=======
  if (Ir(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (h, f) => {
    var b, v, y, C;
    h.preventDefault();
    const g = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    switch (f.hotkey) {
      case "alt":
        zt(s, [g]);
        break;
      case "alt+p":
<<<<<<< HEAD
        (v = s.current) == null || v.focus(), zt(s, [g, h]);
        break;
      case "alt+l":
        (C = w.current) == null || C.focus(), zt(w, [g, h]);
        break;
      case "alt+n":
        (b = i.current) == null || b.focus(), zt(i, [g, h]);
        break;
      case "alt+h":
        (x = p.current) == null || x.focus(), zt(p, [g, h]);
=======
        (b = i.current) == null || b.focus(), Bt(i, [g, m]);
        break;
      case "alt+l":
        (v = w.current) == null || v.focus(), Bt(w, [g, m]);
        break;
      case "alt+n":
        (y = s.current) == null || y.focus(), Bt(s, [g, m]);
        break;
      case "alt+h":
        (C = p.current) == null || C.focus(), Bt(p, [g, m]);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  if (Mr(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (g, b) => {
    var f, k, C, y;
    g.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, m = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (b.hotkey) {
      case "alt":
        Dt(s, [h]);
        break;
      case "alt+p":
        (f = s.current) == null || f.focus(), Dt(s, [h, m]);
        break;
      case "alt+l":
        (k = w.current) == null || k.focus(), Dt(w, [h, m]);
        break;
      case "alt+n":
        (C = i.current) == null || C.focus(), Dt(i, [h, m]);
        break;
      case "alt+h":
        (y = p.current) == null || y.focus(), Dt(p, [h, m]);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        break;
    }
  }), wt(() => {
    if (!n || !o.current) return;
<<<<<<< HEAD
    const m = new MutationObserver((h) => {
      h.forEach((v) => {
        if (v.attributeName === "data-state" && v.target instanceof HTMLElement) {
          const C = v.target.getAttribute("data-state");
          n(C === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((h) => {
      m.observe(h, { attributes: !0 });
    }), () => m.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(On, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, m]) => typeof m == "object").sort(([, m], [, f]) => typeof m == "boolean" || typeof f == "boolean" ? 0 : m.order - f.order).map(([m, f]) => /* @__PURE__ */ d(so, { children: [
      /* @__PURE__ */ r(Pn, { ref: u(m), children: typeof f == "object" && "label" in f && f.label }),
=======
    const h = new MutationObserver((m) => {
      m.forEach((b) => {
        if (b.attributeName === "data-state" && b.target instanceof HTMLElement) {
          const v = b.target.getAttribute("data-state");
          n(v === "open");
        }
      });
    });
    return o.current.querySelectorAll("[data-state]").forEach((m) => {
      h.observe(m, { attributes: !0 });
    }), () => h.disconnect();
  }, [n]), !!t)
<<<<<<< HEAD
    return /* @__PURE__ */ r(jn, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, h]) => typeof h == "object").sort(([, h], [, f]) => typeof h == "boolean" || typeof f == "boolean" ? 0 : h.order - f.order).map(([h, f]) => /* @__PURE__ */ d(uo, { children: [
      /* @__PURE__ */ r(Fn, { ref: u(h), children: typeof f == "object" && "label" in f && f.label }),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
    return /* @__PURE__ */ r(Pn, { ref: o, className: "pr-twp tw-border-0 tw-bg-transparent", variant: a, children: Object.entries(t.columns).filter(([, g]) => typeof g == "object").sort(([, g], [, b]) => typeof g == "boolean" || typeof b == "boolean" ? 0 : g.order - b.order).map(([g, b]) => /* @__PURE__ */ d(lo, { children: [
      /* @__PURE__ */ r(Xn, { ref: u(g), children: typeof b == "object" && "label" in b && b.label }),
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
      /* @__PURE__ */ r(
        Gn,
        {
          className: "tw-z-[250]",
<<<<<<< HEAD
<<<<<<< HEAD
          children: /* @__PURE__ */ r(Ae, { children: Ln(t.groups, t.items, m, e) })
=======
          children: /* @__PURE__ */ r(Oe, { children: Yn(t.groups, t.items, g, e) })
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        }
      )
    ] }, m)) });
=======
          children: /* @__PURE__ */ r(Xe, { children: Un(t.groups, t.items, h, e) })
        }
      )
    ] }, h)) });
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
}
function Ms(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Is({
  menuData: t,
  onOpenChange: e,
  commandHandler: n,
  className: a,
  id: o,
  children: s,
  appMenuAreaChildren: w,
  configAreaChildren: i,
  shouldUseAsAppDragArea: p,
  menubarVariant: u = "default"
}) {
<<<<<<< HEAD
  const m = K(void 0);
=======
  const h = Z(void 0);
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  return /* @__PURE__ */ r(
    "div",
    {
      className: l("tw-border tw-px-4 tw-text-foreground", a),
<<<<<<< HEAD
      ref: m,
=======
      ref: h,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      style: { position: "relative" },
      id: o,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: p ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  w,
                  t && /* @__PURE__ */ r(
                    ho,
                    {
                      menuData: t,
                      onOpenChange: e,
                      commandHandler: n,
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
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: p ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ) })
          ]
        }
      )
    }
  );
}
const go = (t, e) => t[e] ?? e;
function Bs({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: a,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: s,
  localizedStrings: w,
  className: i
}) {
  const p = go(
    w,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
<<<<<<< HEAD
<<<<<<< HEAD
  ), [u, m] = P(!1), f = (h) => {
    o && o(h), a && a([h, ...n.filter((v) => v !== h)]), s && n.find((v) => v === h) && s([...n.filter((v) => v !== h)]), m(!1);
  }, g = (h, v) => {
    var b, x, N, T, X, U;
    const C = v !== h ? ((x = (b = t[h]) == null ? void 0 : b.uiNames) == null ? void 0 : x[v]) ?? ((T = (N = t[h]) == null ? void 0 : N.uiNames) == null ? void 0 : T.en) : void 0;
    return C ? `${(X = t[h]) == null ? void 0 : X.autonym} (${C})` : (U = t[h]) == null ? void 0 : U.autonym;
=======
  ), [u, h] = B(!1), f = (m) => {
    o && o(m), a && a([m, ...n.filter((b) => b !== m)]), i && n.find((b) => b === m) && i([...n.filter((b) => b !== m)]), h(!1);
  }, g = (m, b) => {
    var y, C, x, z, j, tt;
    const v = b !== m ? ((C = (y = t[m]) == null ? void 0 : y.uiNames) == null ? void 0 : C[b]) ?? ((z = (x = t[m]) == null ? void 0 : x.uiNames) == null ? void 0 : z.en) : void 0;
    return v ? `${(j = t[m]) == null ? void 0 : j.autonym} (${v})` : (tt = t[m]) == null ? void 0 : tt.autonym;
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
  ), [u, g] = P(!1), b = (m) => {
    o && o(m), a && a([m, ...n.filter((f) => f !== m)]), s && n.find((f) => f === m) && s([...n.filter((f) => f !== m)]), g(!1);
  }, h = (m, f) => {
    var C, y, x, E, $, q;
    const k = f !== m ? ((y = (C = t[m]) == null ? void 0 : C.uiNames) == null ? void 0 : y[f]) ?? ((E = (x = t[m]) == null ? void 0 : x.uiNames) == null ? void 0 : E.en) : void 0;
    return k ? `${($ = t[m]) == null ? void 0 : $.autonym} (${k})` : (q = t[m]) == null ? void 0 : q.autonym;
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  };
  return /* @__PURE__ */ d("div", { className: l("pr-twp tw-max-w-sm", i), children: [
    /* @__PURE__ */ d(
      yt,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: u,
<<<<<<< HEAD
        onOpenChange: (h) => m(h),
=======
        onOpenChange: (m) => h(m),
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        children: [
          /* @__PURE__ */ r(ht, { children: /* @__PURE__ */ r(Nt, {}) }),
          /* @__PURE__ */ r(
            gt,
            {
              className: "tw-z-[250]",
<<<<<<< HEAD
              children: Object.keys(t).map((h) => /* @__PURE__ */ r(Q, { value: h, children: g(h, e) }, h))
=======
              children: Object.keys(t).map((m) => /* @__PURE__ */ r(W, { value: m, children: g(m, e) }, m))
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
            }
          )
        ]
      }
    ),
<<<<<<< HEAD
    e !== "en" && /* @__PURE__ */ d(Nt, { children: [
      /* @__PURE__ */ r($, { className: "tw-ms-3", children: p }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ d($, { children: [
=======
    e !== "en" && /* @__PURE__ */ d(kt, { children: [
      /* @__PURE__ */ r(G, { className: "tw-ms-3", children: p }),
      /* @__PURE__ */ r("div", { className: "tw-ms-3", children: /* @__PURE__ */ d(G, { children: [
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((m) => g(m, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
<<<<<<< HEAD
function mo({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r($, { children: e(t) }) : n ? /* @__PURE__ */ r($, { children: n(t) }) : /* @__PURE__ */ r($, { children: t });
=======
function fo({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(G, { children: e(t) }) : n ? /* @__PURE__ */ r(G, { children: n(t) }) : /* @__PURE__ */ r(G, { children: t });
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
}
function Vs({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: a,
  handleSelectListItem: o,
  createLabel: s,
  createComplexLabel: w
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((i) => /* @__PURE__ */ d("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
<<<<<<< HEAD
      Be,
=======
      Oe,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      {
        className: "tw-me-2 tw-align-middle",
        checked: a.includes(i),
        onCheckedChange: (p) => o(i, p)
      }
    ),
    /* @__PURE__ */ r(
      fo,
      {
        item: i,
        createLabel: s,
        createComplexLabel: w
      }
    )
  ] }, i)) });
}
function As({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: a = !1,
  helperText: o,
  label: s,
  placeholder: w,
  isRequired: i = !1,
  className: p,
  defaultValue: u,
<<<<<<< HEAD
  value: m,
=======
  value: h,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  onChange: f,
  onFocus: g,
  onBlur: m
}) {
  return /* @__PURE__ */ d("div", { className: l("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": a }), children: [
    /* @__PURE__ */ r(
      $,
      {
        htmlFor: t,
        className: l({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${i ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      Tt,
      {
        id: t,
        disabled: e,
        placeholder: w,
        required: i,
        className: l(p, { "tw-border-red-600": n }),
        defaultValue: u,
<<<<<<< HEAD
        value: m,
=======
        value: h,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
        onChange: f,
        onFocus: g,
        onBlur: m
      }
    ),
    /* @__PURE__ */ r("p", { className: l({ "tw-hidden": !o }), children: o })
  ] });
}
const bo = bt(
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
), vo = c.forwardRef(({ className: t, variant: e, ...n }, a) => /* @__PURE__ */ r("div", { ref: a, role: "alert", className: l(bo({ variant: e }), t), ...n }));
vo.displayName = "Alert";
const xo = c.forwardRef(
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
xo.displayName = "AlertTitle";
const yo = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: l("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
yo.displayName = "AlertDescription";
const No = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Root,
  {
    ref: n,
    className: l(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
No.displayName = Rt.Root.displayName;
const ko = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Image,
  {
    ref: n,
    className: l("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
ko.displayName = Rt.Image.displayName;
const Co = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Rt.Fallback,
  {
    ref: n,
    className: l(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Co.displayName = Rt.Fallback.displayName;
const So = c.forwardRef(
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
So.displayName = "Card";
const Ro = c.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: l("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Ro.displayName = "CardHeader";
const To = c.forwardRef(
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
To.displayName = "CardTitle";
const _o = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: l("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
_o.displayName = "CardDescription";
const zo = c.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: l("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
zo.displayName = "CardContent";
const Eo = c.forwardRef(
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
To.displayName = "CardFooter";
function Is({ ...t }) {
=======
Eo.displayName = "CardFooter";
function Os({ ...t }) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ r(
    Ir,
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
const _o = c.forwardRef(({ className: t, ...e }, n) => {
  const a = G();
=======
const Do = c.forwardRef(({ className: t, ...e }, n) => {
  const a = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ d(
    Mt.Root,
    {
      ref: n,
      className: l(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: a,
      children: [
        /* @__PURE__ */ r(Mt.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Mt.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Mt.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
<<<<<<< HEAD
_o.displayName = Mt.Root.displayName;
const Eo = c.forwardRef(({ className: t, ...e }, n) => {
  const a = G();
=======
Do.displayName = Mt.Root.displayName;
const Mo = c.forwardRef(({ className: t, ...e }, n) => {
  const a = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ r(
<<<<<<< HEAD
    de.Root,
=======
    ue.Root,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    {
      className: l(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
<<<<<<< HEAD
        de.Thumb,
=======
        ue.Thumb,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
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
<<<<<<< HEAD
Eo.displayName = de.Root.displayName;
const Ds = q.Root, zo = c.forwardRef(({ className: t, ...e }, n) => {
  const a = G();
=======
Bo.displayName = ue.Root.displayName;
const As = q.Root, Ao = c.forwardRef(({ className: t, ...e }, n) => {
  const a = $();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
=======
Mo.displayName = ce.Root.displayName;
const Ps = U.Root, Io = c.forwardRef(({ className: t, ...e }, n) => {
  const a = F();
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return /* @__PURE__ */ r(
    q.List,
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
<<<<<<< HEAD
zo.displayName = q.List.displayName;
const Mo = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Ao.displayName = q.List.displayName;
const Oo = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  q.Trigger,
=======
Io.displayName = U.List.displayName;
const Bo = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Trigger,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
Mo.displayName = q.Trigger.displayName;
const Io = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
=======
Oo.displayName = q.Trigger.displayName;
const Po = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  q.Content,
=======
Bo.displayName = U.Trigger.displayName;
const Vo = c.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  U.Content,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
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
<<<<<<< HEAD
Io.displayName = q.Content.displayName;
const Bs = (t, e) => {
=======
Vo.displayName = U.Content.displayName;
const Xs = (t, e) => {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  wt(() => {
=======
Po.displayName = q.Content.displayName;
const Os = (t, e) => {
  ct(() => {
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
<<<<<<< HEAD
function Do(t) {
=======
function Ao(t) {
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  return {
    preserveValue: !0,
    ...t
  };
}
const Oo = (t, e, n = {}) => {
  const a = K(e);
  a.current = e;
<<<<<<< HEAD
  const o = K(n);
<<<<<<< HEAD
  o.current = Do(o.current);
=======
  o.current = Ao(o.current);
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  const [s, w] = P(() => a.current), [i, p] = P(!0);
  return wt(() => {
    let u = !0;
    return p(!!t), (async () => {
      if (t) {
        const m = await t();
        u && (w(() => m), p(!1));
=======
  const o = Z(n);
  o.current = Xo(o.current);
  const [i, w] = B(() => a.current), [s, p] = B(!0);
  return ct(() => {
    let u = !0;
    return p(!!t), (async () => {
      if (t) {
        const h = await t();
        u && (w(() => h), p(!1));
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
      }
    })(), () => {
      u = !1, o.current.preserveValue || w(() => a.current);
    };
<<<<<<< HEAD
  }, [t]), [s, i];
<<<<<<< HEAD
}, ie = () => !1, Vs = (t, e) => {
  const [n] = Bo(
=======
}, we = () => !1, js = (t, e) => {
  const [n] = Oo(
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
    tt(async () => {
      if (!t) return ie;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    ie,
=======
  }, [t]), [i, s];
}, de = () => !1, Ps = (t, e) => {
  const [n] = jo(
    et(async () => {
      if (!t) return de;
      const a = await Promise.resolve(t(e));
      return async () => a();
    }, [e, t]),
    de,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
<<<<<<< HEAD
  wt(() => () => {
    n !== ie && n();
=======
  ct(() => () => {
    n !== de && n();
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  }, [n]);
};
function Po(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), a = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && a ? n.insertBefore(o, a) : n.appendChild(o);
}
Po(`*, ::before, ::after {
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
.tw-my-3 {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
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
.tw-mb-4 {
  margin-bottom: 1rem;
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
.tw-list-inside {
  list-style-position: inside;
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
.tw-items-baseline {
  align-items: baseline;
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
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
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
.tw-px-1\\.5 {
  padding-left: 0.375rem;
  padding-right: 0.375rem;
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
.tw-pl-0 {
  padding-left: 0px;
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
.tw-italic {
  font-style: italic;
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
<<<<<<< HEAD
  go as Alert,
  bo as AlertDescription,
  fo as AlertTitle,
  vo as Avatar,
  yo as AvatarFallback,
  xo as AvatarImage,
  Qo as BOOK_SELECTOR_STRING_KEYS,
  bn as Badge,
  Zo as BookChapterControl,
  pa as BookSelectionMode,
  ts as BookSelector,
  D as Button,
  No as Card,
  Ro as CardContent,
  So as CardDescription,
  To as CardFooter,
  ko as CardHeader,
  Co as CardTitle,
  ca as ChapterRangeSelector,
  Be as Checkbox,
  zs as Checklist,
  pe as ComboBox,
  ka as DataTable,
  rs as DisableButton,
  Ht as DropdownMenu,
  ke as DropdownMenuCheckboxItem,
  Pt as DropdownMenuContent,
  tn as DropdownMenuGroup,
  Ne as DropdownMenuItem,
  Sa as DropdownMenuItemType,
  qt as DropdownMenuLabel,
  Br as DropdownMenuPortal,
  Ko as DropdownMenuRadioGroup,
  rn as DropdownMenuRadioItem,
  Xt as DropdownMenuSeparator,
  Ar as DropdownMenuShortcut,
  Vr as DropdownMenuSub,
  nn as DropdownMenuSubContent,
  en as DropdownMenuSubTrigger,
  ye as DropdownMenuTrigger,
  ns as EnableButton,
  ds as Filter,
  Ca as FilterButton,
  ss as FilterDropdown,
  ls as Footer,
  fs as INVENTORY_STRING_KEYS,
  Rt as Input,
  es as InstallButton,
  bs as Inventory,
  $ as Label,
  os as MarkdownRenderer,
  ws as MoreInfo,
  _a as MultiSelectComboBox,
  Rs as NavigationContentSearch,
  is as NoExtensionsFound,
  pn as Popover,
  _e as PopoverContent,
  un as PopoverTrigger,
  cn as RadioGroup,
  ce as RadioGroupItem,
  xs as ScriptureResultsViewer,
  ys as ScrollGroupSelector,
  zn as SearchBar,
  vt as Select,
=======
  vo as Alert,
  yo as AlertDescription,
  xo as AlertTitle,
  No as Avatar,
  Co as AvatarFallback,
  ko as AvatarImage,
  ns as BOOK_SELECTOR_STRING_KEYS,
  vn as Badge,
  es as BookChapterControl,
  ha as BookSelectionMode,
  rs as BookSelector,
  I as Button,
  So as Card,
  zo as CardContent,
  _o as CardDescription,
  Eo as CardFooter,
  Ro as CardHeader,
  To as CardTitle,
  ma as ChapterRangeSelector,
  Ve as Checkbox,
  Vs as Checklist,
  ue as ComboBox,
  Ra as DataTable,
  as as DictionaryEntryDisplay,
  bn as DictionaryListItem,
  os as DictionaryTable,
  ws as DisableButton,
  Jt as DropdownMenu,
  Ce as DropdownMenuCheckboxItem,
  Xt as DropdownMenuContent,
  tn as DropdownMenuGroup,
  ke as DropdownMenuItem,
  _a as DropdownMenuItemType,
  Kt as DropdownMenuLabel,
  Or as DropdownMenuPortal,
  Qo as DropdownMenuRadioGroup,
  rn as DropdownMenuRadioItem,
  jt as DropdownMenuSeparator,
  Xr as DropdownMenuShortcut,
  Pr as DropdownMenuSub,
  nn as DropdownMenuSubContent,
  en as DropdownMenuSubTrigger,
  Ne as DropdownMenuTrigger,
  is as EnableButton,
  hs as Filter,
  Ta as FilterButton,
  cs as FilterDropdown,
  ms as Footer,
  Ns as INVENTORY_STRING_KEYS,
  Tt as Input,
  ss as InstallButton,
  ks as Inventory,
  G as Label,
  ds as MarkdownRenderer,
  us as MoreInfo,
  Da as MultiSelectComboBox,
  Ds as NavigationContentSearch,
  ps as NoExtensionsFound,
  pn as Popover,
  ze as PopoverContent,
  un as PopoverTrigger,
  cn as RadioGroup,
  pe as RadioGroupItem,
  Ss as ScriptureResultsViewer,
  Rs as ScrollGroupSelector,
  Dn as SearchBar,
  yt as Select,
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
  gt as SelectContent,
  fa as SelectGroup,
  Q as SelectItem,
  ba as SelectLabel,
  fn as SelectScrollDownButton,
  gn as SelectScrollUpButton,
  va as SelectSeparator,
  ht as SelectTrigger,
<<<<<<< HEAD
  xt as SelectValue,
  Ve as Separator,
  Ns as SettingsList,
  Cs as SettingsListHeader,
  ks as SettingsListItem,
  Wa as SettingsSidebar,
  vs as SettingsSidebarContentSearch,
  _o as Slider,
  Is as Sonner,
  jt as Spinner,
  Eo as Switch,
  Ss as TabDropdownMenu,
  Ut as Table,
  Kt as TableBody,
  Na as TableCaption,
  yt as TableCell,
  ya as TableFooter,
  At as TableHead,
  Jt as TableHeader,
  it as TableRow,
  Ds as Tabs,
  Io as TabsContent,
  zo as TabsList,
  Mo as TabsTrigger,
  Ms as TextField,
  yn as ToggleGroup,
  Ft as ToggleGroupItem,
  _s as Toolbar,
  Oe as Tooltip,
  Zt as TooltipContent,
  Ae as TooltipProvider,
  Pe as TooltipTrigger,
  Es as UiLanguageSelector,
  as as UpdateButton,
  Ra as VersionHistory,
  Bn as VerticalTabs,
  An as VerticalTabsContent,
  Vn as VerticalTabsList,
  oo as VerticalTabsTrigger,
  Ta as badgeVariants,
  ra as buttonVariants,
=======
  No as Alert,
  Co as AlertDescription,
  ko as AlertTitle,
  So as Avatar,
  To as AvatarFallback,
  Ro as AvatarImage,
  os as BOOK_SELECTOR_STRING_KEYS,
  yn as Badge,
  as as BookChapterControl,
  ga as BookSelectionMode,
  ss as BookSelector,
  D as Button,
  _o as Card,
  Do as CardContent,
  Mo as CardDescription,
  Io as CardFooter,
  Eo as CardHeader,
  zo as CardTitle,
  ha as ChapterRangeSelector,
  Oe as Checkbox,
  Is as Checklist,
  he as ComboBox,
  Ta as DataTable,
  ls as DisableButton,
  Zt as DropdownMenu,
  Re as DropdownMenuCheckboxItem,
  Lt as DropdownMenuContent,
  rn as DropdownMenuGroup,
  Se as DropdownMenuItem,
  Ea as DropdownMenuItemType,
  Qt as DropdownMenuLabel,
  Pr as DropdownMenuPortal,
  ns as DropdownMenuRadioGroup,
  sn as DropdownMenuRadioItem,
  Yt as DropdownMenuSeparator,
  jr as DropdownMenuShortcut,
  Xr as DropdownMenuSub,
  on as DropdownMenuSubContent,
  an as DropdownMenuSubTrigger,
  Ce as DropdownMenuTrigger,
  ws as EnableButton,
  gs as Filter,
  _a as FilterButton,
  ps as FilterDropdown,
  hs as Footer,
  xs as INVENTORY_STRING_KEYS,
  _t as Input,
  is as InstallButton,
  ys as Inventory,
  L as Label,
  cs as MarkdownRenderer,
  ms as MoreInfo,
  Da as MultiSelectComboBox,
  Es as NavigationContentSearch,
  us as NoExtensionsFound,
  hn as Popover,
  Me as PopoverContent,
  gn as PopoverTrigger,
  mn as RadioGroup,
  me as RadioGroupItem,
  ks as ScriptureResultsViewer,
  Cs as ScrollGroupSelector,
  In as SearchBar,
  yt as Select,
  bt as SelectContent,
  ba as SelectGroup,
  W as SelectItem,
  va as SelectLabel,
  xn as SelectScrollDownButton,
  vn as SelectScrollUpButton,
  xa as SelectSeparator,
  ft as SelectTrigger,
  Nt as SelectValue,
  Pe as Separator,
  Ss as SettingsList,
  Ts as SettingsListHeader,
  Rs as SettingsListItem,
  ro as SettingsSidebar,
  Ns as SettingsSidebarContentSearch,
  Vo as Slider,
  Bs as Sonner,
  Ht as Spinner,
  Bo as Switch,
  _s as TabDropdownMenu,
  te as Table,
  ne as TableBody,
  Ra as TableCaption,
  kt as TableCell,
  Ca as TableFooter,
  Gt as TableHead,
  ee as TableHeader,
  dt as TableRow,
  As as Tabs,
  Po as TabsContent,
  Ao as TabsList,
  Oo as TabsTrigger,
  Vs as TextField,
  Cn as ToggleGroup,
  Ut as ToggleGroupItem,
  Ms as Toolbar,
  je as Tooltip,
  ae as TooltipContent,
  Xe as TooltipProvider,
  Fe as TooltipTrigger,
  Ds as UiLanguageSelector,
  ds as UpdateButton,
  za as VersionHistory,
  On as VerticalTabs,
  Xn as VerticalTabsContent,
  Pn as VerticalTabsList,
  po as VerticalTabsTrigger,
  Ma as badgeVariants,
  ia as buttonVariants,
>>>>>>> 3f08521569 (update navigation to match new dod, left and right arrow key handling, remove tab handling)
  l as cn,
  gs as getBookIdFromUSFM,
  ms as getLinesFromUSFM,
  hs as getNumberFromUSFM,
  Ia as getStatusForItem,
  Ts as getToolbarOSReservedSpaceClassName,
  ps as inventoryCountColumn,
  cs as inventoryItemColumn,
  us as inventoryStatusColumn,
  Ps as sonner,
  Bs as useEvent,
  Vs as useEventAsync,
  Bo as usePromise
=======
  Nt as SelectValue,
  Ae as Separator,
  Ts as SettingsList,
  zs as SettingsListHeader,
  _s as SettingsListItem,
  to as SettingsSidebar,
  Cs as SettingsSidebarContentSearch,
  Do as Slider,
  Os as Sonner,
  $t as Spinner,
  Mo as Switch,
  Es as TabDropdownMenu,
  Ft as Table,
  Gt as TableBody,
  Sa as TableCaption,
  ft as TableCell,
  ka as TableFooter,
  Ot as TableHead,
  Wt as TableHeader,
  at as TableRow,
  Ps as Tabs,
  Vo as TabsContent,
  Io as TabsList,
  Bo as TabsTrigger,
  As as TextField,
  Nn as ToggleGroup,
  Lt as ToggleGroupItem,
  Is as Toolbar,
  Pe as Tooltip,
  Qt as TooltipContent,
  Oe as TooltipProvider,
  Xe as TooltipTrigger,
  Bs as UiLanguageSelector,
  ls as UpdateButton,
  za as VersionHistory,
  Vn as VerticalTabs,
  On as VerticalTabsContent,
  An as VerticalTabsList,
  wo as VerticalTabsTrigger,
  Ea as badgeVariants,
  sa as buttonVariants,
  l as cn,
  ys as getBookIdFromUSFM,
  vs as getLinesFromUSFM,
  xs as getNumberFromUSFM,
  Va as getStatusForItem,
  Ms as getToolbarOSReservedSpaceClassName,
  fs as inventoryCountColumn,
  gs as inventoryItemColumn,
  bs as inventoryStatusColumn,
  $s as sonner,
  Xs as useEvent,
  js as useEventAsync,
  Oo as usePromise
>>>>>>> 9f4fc0aa89 (dictionary components, used in extension)
};
//# sourceMappingURL=index.js.map
