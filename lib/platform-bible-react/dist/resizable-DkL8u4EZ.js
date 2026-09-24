<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
import { jsx as n, jsxs as p, Fragment as _e } from "react/jsx-runtime";
import { Slot as jt, Dialog as Q, Separator as Ce, Popover as wt, Tooltip as lt, DropdownMenu as E, Label as Le, RadioGroup as _t, ToggleGroup as ee } from "radix-ui";
import { IconX as Ae, IconCheck as Rt, IconSearch as ze, IconChevronRight as Ge } from "@tabler/icons-react";
import { Canon as L } from "@sillsdev/scripture";
import { cva as ot } from "class-variance-authority";
import C, { createContext as ae, useContext as oe, useState as H, useRef as pt, useCallback as X, useEffect as Ct, useMemo as at, Fragment as je, forwardRef as re } from "react";
import { ChevronsUpDown as ne, Check as se, Star as Re, Group as Oe, ArrowRight as Pe, Loader2 as De, ChevronDown as Be, Search as Me, X as He, AlertTriangle as Ue, LoaderCircle as $e } from "lucide-react";
import { Section as rt, MODIFIER_KEYS as Fe, normalizeProjectId as P, compareProjectsByName as Ke, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as dt, formatProjectName as ie, getLocalizeKeyForScrollGroupId as Ve, hasDistinctFullName as Je, getSectionForBook as Xe } from "platform-bible-utils";
import { filterAndRankItems as Vt } from "@eten-tech-foundation/platform-editor";
import { Command as st } from "cmdk";
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
import { jsx as o, jsxs as p, Fragment as me } from "react/jsx-runtime";
import { Slot as It, Dialog as V, Separator as fe, Popover as it, Tooltip as at, DropdownMenu as _, Label as he, RadioGroup as vt, ToggleGroup as Kt } from "radix-ui";
import { IconX as ge, IconCheck as Et, IconSearch as be, IconChevronRight as Ne } from "@tabler/icons-react";
import { Canon as j } from "@sillsdev/scripture";
import { cva as W } from "class-variance-authority";
import C, { useState as K, useRef as pt, useCallback as q, createContext as ve, useContext as xe, useMemo as Q, useEffect as Rt, Fragment as ye, forwardRef as Vt } from "react";
import { ChevronsUpDown as Jt, Check as Xt, Star as Se, Group as ke, ArrowRight as Ie, Loader2 as Ee, ChevronDown as _e, Search as Te, X as Ce, AlertTriangle as je, LoaderCircle as Ge } from "lucide-react";
import { Section as Y, MODIFIER_KEYS as ze, normalizeProjectId as P, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as nt, getLocalizeKeyForScrollGroupId as Le, getSectionForBook as Ae } from "platform-bible-utils";
import { filterAndRankItems as Dt } from "@eten-tech-foundation/platform-editor";
import { Command as et } from "cmdk";
========
import { jsx as o, jsxs as p, Fragment as me } from "react/jsx-runtime";
import { Slot as It, Dialog as J, Separator as fe, Popover as it, Tooltip as at, DropdownMenu as T, Label as he, RadioGroup as vt, ToggleGroup as Kt } from "radix-ui";
import { IconX as ge, IconCheck as Et, IconSearch as be, IconChevronRight as Ne } from "@tabler/icons-react";
import { Canon as G } from "@sillsdev/scripture";
import { cva as W } from "class-variance-authority";
import j, { useState as V, useRef as pt, useCallback as q, createContext as ve, useContext as xe, useMemo as Q, useEffect as Rt, Fragment as ye, useId as Se, forwardRef as Vt } from "react";
import { ChevronsUpDown as Jt, Check as Xt, Star as ke, Group as Ie, ArrowRight as Ee, Loader2 as _e, ChevronDown as Te, Search as Ce, X as je, AlertTriangle as Ge, LoaderCircle as ze } from "lucide-react";
import { Section as Y, MODIFIER_KEYS as Le, normalizeProjectId as D, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as nt, getLocalizeKeyForScrollGroupId as Ae, getSectionForBook as Re } from "platform-bible-utils";
import { filterAndRankItems as Dt } from "@eten-tech-foundation/platform-editor";
import { Command as et } from "cmdk";
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
import "@eten-tech-foundation/scripture-utilities";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
import * as Ot from "react-resizable-panels";
import { clsx as Ze } from "clsx";
import { extendTailwindMerge as We, twMerge as qe } from "tailwind-merge";
const Ye = We({ prefix: "tw" });
function Lt(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
import * as _t from "react-resizable-panels";
import { clsx as Re } from "clsx";
import { extendTailwindMerge as De, twMerge as Pe } from "tailwind-merge";
const Oe = De({ prefix: "tw" });
function xt(t) {
========
import * as _t from "react-resizable-panels";
import { clsx as De } from "clsx";
import { extendTailwindMerge as Pe, twMerge as Oe } from "tailwind-merge";
const Be = Pe({ prefix: "tw" });
function xt(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  const e = [];
  let a = "", o = 0;
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    s === "[" ? o += 1 : s === "]" && (o -= 1), s === ":" && o === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Qe(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Be(t) {
========
function Me(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Lt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== a), `-${s}`].join(":")}`, original: t };
  }
  const o = e.findIndex((s) => s.startsWith("!tw-"));
  if (o !== -1) {
    const s = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== o), `!${s}`].join(":")}`, original: t };
  }
  const r = e[e.length - 1];
  if (r.startsWith("tw-")) {
    const s = r.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ta(t, e) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Me(t, e) {
========
function He(t, e) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (e.startsWith("tw:"))
    return t;
  const a = Lt(t);
  if (a[0] !== "tw") return t;
  const o = a.slice(1, -1), r = a[a.length - 1], s = Lt(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
  if (i && r.startsWith("-")) {
    const u = r.slice(1);
    return [...o, `-tw-${u}`].join(":");
  }
  if (l && r.startsWith("!")) {
    const u = r.slice(1);
    return [...o, `!tw-${u}`].join(":");
  }
  return [...o, `tw-${r}`].join(":");
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function c(...t) {
  const e = Ze(t);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function d(...t) {
  const e = Re(t);
========
function d(...t) {
  const e = De(t);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (!e) return e;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  if (e.indexOf("tw-") === -1) return Ye(e);
  const a = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), r = [];
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  if (e.indexOf("tw-") === -1) return Oe(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
========
  if (e.indexOf("tw-") === -1) return Be(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return a.forEach((u) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    const m = Qe(u);
    o.set(m.normalized, m.original), r.push(m.normalized);
  }), qe(r.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = o.get(u);
    return m ? ta(u, m) : u;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    const m = Be(u);
    r.set(m.normalized, m.original), n.push(m.normalized);
  }), Pe(n.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = r.get(u);
    return m ? Me(u, m) : u;
========
    const m = Me(u);
    r.set(m.normalized, m.original), n.push(m.normalized);
  }), Oe(n.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = r.get(u);
    return m ? He(u, m) : u;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  }).join(" ");
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const le = 600, ce = 650, Go = 400, ea = 450, aa = 500, jo = 510, Ro = 520, oa = 675, Oo = 690, Po = 700, Do = 800, de = ot(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const qt = 600, Wt = 650, ur = 400, He = 450, Ue = 500, $e = 675, wr = 690, pr = 700, mr = 800, Zt = W(
========
const qt = 600, Wt = 650, wr = 400, Ue = 450, $e = 500, Fe = 675, pr = 690, mr = 700, fr = 800, Zt = W(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  // CUSTOM: Added 'pr-twp' at the front of the base class string to apply Platform.Bible's
  // Tailwind CSS scope isolation. All Button instances inherit this via buttonVariants.
  // CUSTOM: Moved the pressed-state nudge off 'tw:active:not-aria-[haspopup]:translate-y-px' onto
  // 'transform'. Every Tailwind translate utility writes the same '--tw-translate-y', so the nudge
  // replaced a caller's centering translate rather than adding to it. The browser applies
  // 'translate', 'rotate' and 'scale' before 'transform', so those compose (a caller 'rotate-*' or
  // 'scale-*' does rotate or scale the 1px); caller 'skew-*', 'rotate-x/y/z-*', 'transform*'
  // utilities and inline style transforms still override it.
  "pr-twp tw:group/button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-transparent tw:bg-clip-padding tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:active:not-aria-[haspopup]:transform-[translateY(1px)] tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",
        outline: "tw:border-border tw:bg-background tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:border-input tw:dark:bg-input/30 tw:dark:hover:bg-input/50",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80 tw:aria-expanded:bg-secondary tw:aria-expanded:text-secondary-foreground",
        ghost: "tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:hover:bg-muted/50",
        destructive: "tw:bg-destructive/10 tw:text-destructive tw:hover:bg-destructive/20 tw:focus-visible:border-destructive/40 tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:hover:bg-destructive/30 tw:dark:focus-visible:ring-destructive/40",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
        // CUSTOM: Added 'subtle' variant — no background, muted color at rest, foreground on hover.
        // Use when a button should visually recede into the layout by default.
        subtle: "tw:text-muted-foreground tw:hover:text-foreground"
      },
      size: {
        default: "tw:h-8 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        // CUSTOM: Renamed 'var(--radius-md)' to 'var(--tw-radius-md)' in the rounding utilities for
        // the sizes that clamp their radius. 'src/index.css' imports Tailwind with 'prefix(tw)',
        // which emits every '@theme' variable under a 'tw' prefix, so the boilerplate's unprefixed
        // name resolves to nothing. That invalidates the whole 'min()' and leaves those sizes with
        // square corners.
        xs: "tw:h-6 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),10px)] tw:px-2 tw:text-xs tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3",
        sm: "tw:h-7 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",
        lg: "tw:h-9 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        icon: "tw:size-8",
        "icon-xs": "tw:size-6 tw:rounded-[min(var(--tw-radius-md),10px)] tw:in-data-[slot=button-group]:rounded-lg tw:[&_svg:not([class*=size-])]:size-3",
        "icon-sm": "tw:size-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "tw:size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Z({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function U({
========
function H({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: o = !1,
  ...r
}) {
  const s = o ? jt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: c(de({ variant: e, size: a, className: t })),
      ...r
    }
  );
}
const ue = "layoutDirection";
function we() {
  return globalThis.localStorage ?? void 0;
}
function $() {
  var t;
  try {
    const e = (t = we()) == null ? void 0 : t.getItem(ue);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Bo(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function fr(t) {
========
function hr(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  var e;
  try {
    (e = we()) == null || e.setItem(ue, t);
  } catch {
  }
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Mo({ ...t }) {
  return /* @__PURE__ */ n(Q.Root, { "data-slot": "dialog", ...t });
}
function Ho({ ...t }) {
  return /* @__PURE__ */ n(Q.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function ra({ ...t }) {
  return /* @__PURE__ */ n(Q.Portal, { "data-slot": "dialog-portal", ...t });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function hr({ ...t }) {
  return /* @__PURE__ */ o(V.Root, { "data-slot": "dialog", ...t });
}
function gr({ ...t }) {
  return /* @__PURE__ */ o(V.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Fe({ ...t }) {
  return /* @__PURE__ */ o(V.Portal, { "data-slot": "dialog-portal", ...t });
========
function gr({ ...t }) {
  return /* @__PURE__ */ o(J.Root, { "data-slot": "dialog", ...t });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Uo({ ...t }) {
  return /* @__PURE__ */ n(Q.Close, { "data-slot": "dialog-close", ...t });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function br({ ...t }) {
  return /* @__PURE__ */ o(V.Close, { "data-slot": "dialog-close", ...t });
========
function br({ ...t }) {
  return /* @__PURE__ */ o(J.Trigger, { "data-slot": "dialog-trigger", ...t });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function na({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ke({
========
function Ke({ ...t }) {
  return /* @__PURE__ */ o(J.Portal, { "data-slot": "dialog-portal", ...t });
}
function Nr({ ...t }) {
  return /* @__PURE__ */ o(J.Close, { "data-slot": "dialog-close", ...t });
}
function Ve({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return /* @__PURE__ */ n(
    Q.Overlay,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return /* @__PURE__ */ o(
    V.Overlay,
========
  return /* @__PURE__ */ o(
    J.Overlay,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      style: { zIndex: ea, ...e },
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      style: { zIndex: He, ...e },
========
      style: { zIndex: Ue, ...e },
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function $o({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Nr({
========
function vr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  ...i
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const l = $();
  return /* @__PURE__ */ p(ra, { children: [
    /* @__PURE__ */ n(na, { className: o, style: r }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const i = M();
  return /* @__PURE__ */ p(Fe, { children: [
    /* @__PURE__ */ o(Ke, { className: r }),
========
  const i = M();
  return /* @__PURE__ */ p(Ke, { children: [
    /* @__PURE__ */ o(Ve, { className: r }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    /* @__PURE__ */ p(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      Q.Content,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      V.Content,
========
      J.Content,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        style: { zIndex: aa, ...s },
        dir: l,
        ...i,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        style: { zIndex: Ue, ...n },
        dir: i,
        ...s,
========
        style: { zIndex: $e, ...n },
        dir: i,
        ...s,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        children: [
          e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          a && /* @__PURE__ */ n(Q.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(Ae, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          a && /* @__PURE__ */ o(V.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(U, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(ge, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
========
          a && /* @__PURE__ */ o(J.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(H, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(ge, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          ] }) })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Fo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "dialog-header",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ko({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function xr({
========
function yr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...o
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dialog-footer",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...o,
      children: [
        a,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        e && /* @__PURE__ */ n(Q.Close, { asChild: !0, children: /* @__PURE__ */ n(Z, { variant: "outline", children: "Close" }) })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        e && /* @__PURE__ */ o(V.Close, { asChild: !0, children: /* @__PURE__ */ o(U, { variant: "outline", children: "Close" }) })
========
        e && /* @__PURE__ */ o(J.Close, { asChild: !0, children: /* @__PURE__ */ o(H, { variant: "outline", children: "Close" }) })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Vo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Q.Title,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    V.Title,
========
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    J.Title,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dialog-title",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Jo({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Sr({
========
function kr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  ...e
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return /* @__PURE__ */ n(
    Q.Description,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return /* @__PURE__ */ o(
    V.Description,
========
  return /* @__PURE__ */ o(
    J.Description,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dialog-description",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function sa({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ve({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ o(
========
function Je({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "input",
    {
      type: e,
      "data-slot": "input",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:w-full to give callers control over width
        // CUSTOM: Added tw:file:text-foreground so the file-picker button text matches the foreground design token
        "pr-twp tw:h-8 tw:min-w-0 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-1 tw:text-base tw:transition-colors tw:outline-none tw:file:inline-flex tw:file:h-6 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ia({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Xe({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const la = ot(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Xe = W(
========
const qe = W(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  "tw:flex tw:h-auto tw:cursor-text tw:items-center tw:justify-center tw:gap-2 tw:py-1.5 tw:text-sm tw:font-medium tw:text-muted-foreground tw:select-none tw:group-data-[disabled=true]/input-group:opacity-50 tw:[&>kbd]:rounded-[calc(var(--radius)-5px)] tw:[&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "tw:order-first tw:ps-2 tw:has-[>button]:ms-[-0.3rem] tw:has-[>kbd]:ms-[-0.15rem]",
        "inline-end": "tw:order-last tw:pe-2 tw:has-[>button]:me-[-0.3rem] tw:has-[>kbd]:me-[-0.15rem]",
        "block-start": "tw:order-first tw:w-full tw:justify-start tw:px-2.5 tw:pt-2 tw:group-has-[>input]/input-group:pt-2 tw:[.border-b]:pb-2",
        "block-end": "tw:order-last tw:w-full tw:justify-start tw:px-2.5 tw:pb-2 tw:group-has-[>input]/input-group:pb-2 tw:[.border-t]:pt-2"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ca({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function qe({
========
function We({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  align: e = "inline-start",
  ...a
}) {
  return (
    // CUSTOM: Clicking anywhere in the addon area proxies focus to the associated input — a
    // deliberate UX enhancement. The a11y rules flag a non-interactive role="group" element having
    // a click handler, but removing the handler would degrade the UX. Keyboard focus on the input
    // itself is still accessible and not affected by this handler.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    /* @__PURE__ */ n(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        className: c(la({ align: e }), t),
        onClick: (o) => {
          var r, s;
          o.target instanceof HTMLElement && o.target.closest("button") || (s = (r = o.currentTarget.parentElement) == null ? void 0 : r.querySelector("input")) == null || s.focus();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        className: d(Xe({ align: e }), t),
        onClick: (r) => {
          var n, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
========
        className: d(qe({ align: e }), t),
        onClick: (r) => {
          var n, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        },
        ...a
      }
    )
  );
}
ot("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
  variants: {
    size: {
      xs: "tw:h-6 tw:gap-1 tw:rounded-[calc(var(--radius)-3px)] tw:px-1.5 tw:[&>svg:not([class*=size-])]:size-3.5",
      sm: "tw:",
      "icon-xs": "tw:size-6 tw:rounded-[calc(var(--radius)-3px)] tw:p-0 tw:has-[>svg]:p-0",
      "icon-sm": "tw:size-8 tw:p-0 tw:has-[>svg]:p-0"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
function pe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    st,
    {
      "data-slot": "command",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function me({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...o
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const r = $(), s = C.useCallback(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const n = M(), s = C.useCallback(
========
  const n = M(), s = j.useCallback(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !a || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), u = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (i.preventDefault(), i.stopPropagation(), u.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: r, children: /* @__PURE__ */ p(ia, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        st.Input,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ p(Je, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        et.Input,
========
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ p(Xe, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        et.Input,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        {
          "data-slot": "command-input",
          className: c(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...o
        }
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      /* @__PURE__ */ n(ca, { children: /* @__PURE__ */ n(ze, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      /* @__PURE__ */ o(qe, { children: /* @__PURE__ */ o(be, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
========
      /* @__PURE__ */ o(We, { children: /* @__PURE__ */ o(be, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    ] }) })
  );
}
function fe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    st.List,
    {
      "data-slot": "command-list",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation.
        // CUSTOM: Removed tw:no-scrollbar so the vertical scrollbar is visible when the
        // list overflows tw:max-h-72 (needed for long filter lists like language pickers).
        "pr-twp tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        t
      ),
      ...e
    }
  );
}
function he({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    st.Empty,
    {
      "data-slot": "command-empty",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function ge({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    st.Group,
    {
      "data-slot": "command-group",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Jt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    st.Separator,
    {
      "data-slot": "command-separator",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Pt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    st.Item,
    {
      "data-slot": "command-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ n(Rt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Xo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function kr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ir({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "span",
    {
      "data-slot": "command-shortcut",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const da = [
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const We = [
========
const Ze = [
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  { shortName: "ERR", fullNames: ["ERROR"], chapters: -1 },
  { shortName: "GEN", fullNames: ["Genesis"], chapters: 50 },
  { shortName: "EXO", fullNames: ["Exodus"], chapters: 40 },
  { shortName: "LEV", fullNames: ["Leviticus"], chapters: 27 },
  { shortName: "NUM", fullNames: ["Numbers"], chapters: 36 },
  { shortName: "DEU", fullNames: ["Deuteronomy"], chapters: 34 },
  { shortName: "JOS", fullNames: ["Joshua"], chapters: 24 },
  { shortName: "JDG", fullNames: ["Judges"], chapters: 21 },
  { shortName: "RUT", fullNames: ["Ruth"], chapters: 4 },
  { shortName: "1SA", fullNames: ["1 Samuel"], chapters: 31 },
  { shortName: "2SA", fullNames: ["2 Samuel"], chapters: 24 },
  { shortName: "1KI", fullNames: ["1 Kings"], chapters: 22 },
  { shortName: "2KI", fullNames: ["2 Kings"], chapters: 25 },
  { shortName: "1CH", fullNames: ["1 Chronicles"], chapters: 29 },
  { shortName: "2CH", fullNames: ["2 Chronicles"], chapters: 36 },
  { shortName: "EZR", fullNames: ["Ezra"], chapters: 10 },
  { shortName: "NEH", fullNames: ["Nehemiah"], chapters: 13 },
  { shortName: "EST", fullNames: ["Esther"], chapters: 10 },
  { shortName: "JOB", fullNames: ["Job"], chapters: 42 },
  { shortName: "PSA", fullNames: ["Psalm", "Psalms"], chapters: 150 },
  { shortName: "PRO", fullNames: ["Proverbs"], chapters: 31 },
  { shortName: "ECC", fullNames: ["Ecclesiastes"], chapters: 12 },
  { shortName: "SNG", fullNames: ["Song of Solomon", "Song of Songs"], chapters: 8 },
  { shortName: "ISA", fullNames: ["Isaiah"], chapters: 66 },
  { shortName: "JER", fullNames: ["Jeremiah"], chapters: 52 },
  { shortName: "LAM", fullNames: ["Lamentations"], chapters: 5 },
  { shortName: "EZK", fullNames: ["Ezekiel"], chapters: 48 },
  { shortName: "DAN", fullNames: ["Daniel"], chapters: 12 },
  { shortName: "HOS", fullNames: ["Hosea"], chapters: 14 },
  { shortName: "JOL", fullNames: ["Joel"], chapters: 3 },
  { shortName: "AMO", fullNames: ["Amos"], chapters: 9 },
  { shortName: "OBA", fullNames: ["Obadiah"], chapters: 1 },
  { shortName: "JON", fullNames: ["Jonah"], chapters: 4 },
  { shortName: "MIC", fullNames: ["Micah"], chapters: 7 },
  { shortName: "NAM", fullNames: ["Nahum"], chapters: 3 },
  { shortName: "HAB", fullNames: ["Habakkuk"], chapters: 3 },
  { shortName: "ZEP", fullNames: ["Zephaniah"], chapters: 3 },
  { shortName: "HAG", fullNames: ["Haggai"], chapters: 2 },
  { shortName: "ZEC", fullNames: ["Zechariah"], chapters: 14 },
  { shortName: "MAL", fullNames: ["Malachi"], chapters: 4 },
  { shortName: "MAT", fullNames: ["Matthew"], chapters: 28 },
  { shortName: "MRK", fullNames: ["Mark"], chapters: 16 },
  { shortName: "LUK", fullNames: ["Luke"], chapters: 24 },
  { shortName: "JHN", fullNames: ["John"], chapters: 21 },
  { shortName: "ACT", fullNames: ["Acts"], chapters: 28 },
  { shortName: "ROM", fullNames: ["Romans"], chapters: 16 },
  { shortName: "1CO", fullNames: ["1 Corinthians"], chapters: 16 },
  { shortName: "2CO", fullNames: ["2 Corinthians"], chapters: 13 },
  { shortName: "GAL", fullNames: ["Galatians"], chapters: 6 },
  { shortName: "EPH", fullNames: ["Ephesians"], chapters: 6 },
  { shortName: "PHP", fullNames: ["Philippians"], chapters: 4 },
  { shortName: "COL", fullNames: ["Colossians"], chapters: 4 },
  { shortName: "1TH", fullNames: ["1 Thessalonians"], chapters: 5 },
  { shortName: "2TH", fullNames: ["2 Thessalonians"], chapters: 3 },
  { shortName: "1TI", fullNames: ["1 Timothy"], chapters: 6 },
  { shortName: "2TI", fullNames: ["2 Timothy"], chapters: 4 },
  { shortName: "TIT", fullNames: ["Titus"], chapters: 3 },
  { shortName: "PHM", fullNames: ["Philemon"], chapters: 1 },
  { shortName: "HEB", fullNames: ["Hebrews"], chapters: 13 },
  { shortName: "JAS", fullNames: ["James"], chapters: 5 },
  { shortName: "1PE", fullNames: ["1 Peter"], chapters: 5 },
  { shortName: "2PE", fullNames: ["2 Peter"], chapters: 3 },
  { shortName: "1JN", fullNames: ["1 John"], chapters: 5 },
  { shortName: "2JN", fullNames: ["2 John"], chapters: 1 },
  { shortName: "3JN", fullNames: ["3 John"], chapters: 1 },
  { shortName: "JUD", fullNames: ["Jude"], chapters: 1 },
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 },
  // DC and other - TJ got book names from Canon.ts and chapter numbers from finding the largest
  // number among all the `.vrs` files in `Paratext/My Paratext Projects`. There were a few books
  // that had varying chapter numbers, and some books that had skipped chapter numbers. This model
  // is just not good enough; we need versification to make a perfect model.
  { shortName: "TOB", fullNames: ["Tobit"], chapters: 14 },
  { shortName: "JDT", fullNames: ["Judith"], chapters: 16 },
  { shortName: "ESG", fullNames: ["Esther Greek"], chapters: 11 },
  { shortName: "WIS", fullNames: ["Wisdom of Solomon"], chapters: 19 },
  { shortName: "SIR", fullNames: ["Sirach (Ecclesiasticus)"], chapters: 52 },
  { shortName: "BAR", fullNames: ["Baruch"], chapters: 6 },
  { shortName: "LJE", fullNames: ["Letter of Jeremiah"], chapters: 1 },
  { shortName: "S3Y", fullNames: ["Song of 3 Young Men"], chapters: 1 },
  { shortName: "SUS", fullNames: ["Susanna"], chapters: 1 },
  { shortName: "BEL", fullNames: ["Bel and the Dragon"], chapters: 1 },
  { shortName: "1MA", fullNames: ["1 Maccabees"], chapters: 16 },
  { shortName: "2MA", fullNames: ["2 Maccabees"], chapters: 15 },
  { shortName: "3MA", fullNames: ["3 Maccabees"], chapters: 7 },
  { shortName: "4MA", fullNames: ["4 Maccabees"], chapters: 18 },
  { shortName: "1ES", fullNames: ["1 Esdras (Greek)"], chapters: 9 },
  { shortName: "2ES", fullNames: ["2 Esdras (Latin)"], chapters: 16 },
  { shortName: "MAN", fullNames: ["Prayer of Manasseh"], chapters: 1 },
  { shortName: "PS2", fullNames: ["Psalm 151"], chapters: 1 },
  { shortName: "ODA", fullNames: ["Odes"], chapters: 14 },
  { shortName: "PSS", fullNames: ["Psalms of Solomon"], chapters: 18 },
  { shortName: "JSA", fullNames: ["Joshua A. *obsolete*"], chapters: 24 },
  { shortName: "JDB", fullNames: ["Judges B. *obsolete*"], chapters: 21 },
  { shortName: "TBS", fullNames: ["Tobit S. *obsolete*"], chapters: 14 },
  { shortName: "SST", fullNames: ["Susanna Th. *obsolete*"], chapters: 1 },
  { shortName: "DNT", fullNames: ["Daniel Th. *obsolete*"], chapters: 12 },
  { shortName: "BLT", fullNames: ["Bel Th. *obsolete*"], chapters: 1 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "XXA", fullNames: ["Extra A"], chapters: 1 },
  { shortName: "XXB", fullNames: ["Extra B"], chapters: 1 },
  { shortName: "XXC", fullNames: ["Extra C"], chapters: 1 },
  { shortName: "XXD", fullNames: ["Extra D"], chapters: 1 },
  { shortName: "XXE", fullNames: ["Extra E"], chapters: 1 },
  { shortName: "XXF", fullNames: ["Extra F"], chapters: 1 },
  { shortName: "XXG", fullNames: ["Extra G"], chapters: 1 },
  { shortName: "FRT", fullNames: ["Front Matter"], chapters: 1 },
  { shortName: "BAK", fullNames: ["Back Matter"], chapters: 1 },
  { shortName: "OTH", fullNames: ["Other Matter"], chapters: 1 },
  { shortName: "3ES", fullNames: ["3 Ezra *obsolete*"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "EZA", fullNames: ["Apocalypse of Ezra"], chapters: 12 },
  { shortName: "5EZ", fullNames: ["5 Ezra (Latin Prologue)"], chapters: 2 },
  { shortName: "6EZ", fullNames: ["6 Ezra (Latin Epilogue)"], chapters: 12 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "INT", fullNames: ["Introduction"], chapters: 1 },
  { shortName: "CNC", fullNames: ["Concordance "], chapters: 1 },
  { shortName: "GLO", fullNames: ["Glossary "], chapters: 1 },
  { shortName: "TDX", fullNames: ["Topical Index"], chapters: 1 },
  { shortName: "NDX", fullNames: ["Names Index"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "DAG", fullNames: ["Daniel Greek"], chapters: 14 },
  { shortName: "PS3", fullNames: ["Psalms 152-155"], chapters: 4 },
  { shortName: "2BA", fullNames: ["2 Baruch (Apocalypse)"], chapters: 77 },
  { shortName: "LBA", fullNames: ["Letter of Baruch"], chapters: 86 },
  { shortName: "JUB", fullNames: ["Jubilees"], chapters: 34 },
  { shortName: "ENO", fullNames: ["Enoch"], chapters: 42 },
  { shortName: "1MQ", fullNames: ["1 Meqabyan"], chapters: 36 },
  { shortName: "2MQ", fullNames: ["2 Meqabyan"], chapters: 20 },
  { shortName: "3MQ", fullNames: ["3 Meqabyan"], chapters: 10 },
  { shortName: "REP", fullNames: ["Reproof (Proverbs 25-31)"], chapters: 6 },
  { shortName: "4BA", fullNames: ["4 Baruch (Rest of Baruch)"], chapters: 5 },
  { shortName: "LAO", fullNames: ["Laodiceans"], chapters: 1 }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
], ua = (t) => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
], Ze = (t) => {
========
], Ye = (t) => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  var e;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return ((e = da[t]) == null ? void 0 : e.chapters) ?? -1;
}, wa = L.allBookIds.filter(
  (t) => !L.isObsolete(L.bookIdToNumber(t))
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return ((e = We[t]) == null ? void 0 : e.chapters) ?? -1;
}, Ye = j.allBookIds.filter(
  (t) => !j.isObsolete(j.bookIdToNumber(t))
========
  return ((e = Ze[t]) == null ? void 0 : e.chapters) ?? -1;
}, Qe = G.allBookIds.filter(
  (t) => !G.isObsolete(G.bookIdToNumber(t))
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function pa(t) {
  const e = [], a = Math.min(t.length, L.allBookIds.length);
  for (let o = 0; o < a; o += 1)
    t[o] === "1" && e.push(L.bookNumberToId(o + 1));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Qe(t) {
  const e = [], a = Math.min(t.length, j.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(j.bookNumberToId(r + 1));
========
function ta(t) {
  const e = [], a = Math.min(t.length, G.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(G.bookNumberToId(r + 1));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return e;
}
function v(t) {
  return `%scrollGroup_${t}%`;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const ma = {
  [N("undefined")]: "Ø",
  [N(0)]: "A",
  [N(1)]: "B",
  [N(2)]: "C",
  [N(3)]: "D",
  [N(4)]: "E",
  [N(5)]: "F",
  [N(6)]: "G",
  [N(7)]: "H",
  [N(8)]: "I",
  [N(9)]: "J",
  [N(10)]: "K",
  [N(11)]: "L",
  [N(12)]: "M",
  [N(13)]: "N",
  [N(14)]: "O",
  [N(15)]: "P",
  [N(16)]: "Q",
  [N(17)]: "R",
  [N(18)]: "S",
  [N(19)]: "T",
  [N(20)]: "U",
  [N(21)]: "V",
  [N(22)]: "W",
  [N(23)]: "X",
  [N(24)]: "Y",
  [N(25)]: "Z"
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const ta = {
  [N("undefined")]: "Ø",
  [N(0)]: "A",
  [N(1)]: "B",
  [N(2)]: "C",
  [N(3)]: "D",
  [N(4)]: "E",
  [N(5)]: "F",
  [N(6)]: "G",
  [N(7)]: "H",
  [N(8)]: "I",
  [N(9)]: "J",
  [N(10)]: "K",
  [N(11)]: "L",
  [N(12)]: "M",
  [N(13)]: "N",
  [N(14)]: "O",
  [N(15)]: "P",
  [N(16)]: "Q",
  [N(17)]: "R",
  [N(18)]: "S",
  [N(19)]: "T",
  [N(20)]: "U",
  [N(21)]: "V",
  [N(22)]: "W",
  [N(23)]: "X",
  [N(24)]: "Y",
  [N(25)]: "Z"
========
const ea = {
  [v("undefined")]: "Ø",
  [v(0)]: "A",
  [v(1)]: "B",
  [v(2)]: "C",
  [v(3)]: "D",
  [v(4)]: "E",
  [v(5)]: "F",
  [v(6)]: "G",
  [v(7)]: "H",
  [v(8)]: "I",
  [v(9)]: "J",
  [v(10)]: "K",
  [v(11)]: "L",
  [v(12)]: "M",
  [v(13)]: "N",
  [v(14)]: "O",
  [v(15)]: "P",
  [v(16)]: "Q",
  [v(17)]: "R",
  [v(18)]: "S",
  [v(19)]: "T",
  [v(20)]: "U",
  [v(21)]: "V",
  [v(22)]: "W",
  [v(23)]: "X",
  [v(24)]: "Y",
  [v(25)]: "Z"
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Dt(t, e) {
  return ua(L.bookIdToNumber(t));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ct(t, e) {
  return Ze(j.bookIdToNumber(t));
========
function Ct(t, e) {
  return Ye(G.bookIdToNumber(t));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function yt(t, e, a) {
  const o = L.bookIdToNumber(t);
  let r, s = a === "next" ? 1 / 0 : -1 / 0;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ft(t, e, a) {
  const r = j.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
========
function ft(t, e, a) {
  const r = G.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return e.forEach((i) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    const l = L.bookIdToNumber(i);
    (a === "next" ? l > o && l < s : l < o && l > s) && (r = i, s = l);
  }), r;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    const l = j.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (n = i, s = l);
  }), n;
========
    const l = G.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (n = i, s = l);
  }), n;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Zo(t, e, a) {
  const { book: o, chapterNum: r } = t;
  if (e.includes(o) && r > 1)
    return { book: o, chapterNum: r - 1, verseNum: 1 };
  const s = yt(o, e, "previous");
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ir(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const s = ft(r, e, "previous");
========
function Er(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const s = ft(r, e, "previous");
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Dt(s), 1),
      verseNum: 1
    };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Wo(t, e, a) {
  const { book: o, chapterNum: r } = t;
  if (e.includes(o) && r < Dt(o))
    return { book: o, chapterNum: r + 1, verseNum: 1 };
  const s = yt(o, e, "next");
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Er(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < Ct(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const s = ft(r, e, "next");
========
function _r(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < Ct(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const s = ft(r, e, "next");
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function qo(t, e, a) {
  const { book: o, chapterNum: r, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return s > 1 ? { book: o, chapterNum: r, verseNum: s - 1 } : s === 1 && r === 1 ? { book: o, chapterNum: 1, verseNum: 0 } : { book: o, chapterNum: r, verseNum: 0 };
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function _r(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
========
function Tr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (e === void 0) return;
  const i = yt(o, e, "previous");
  if (!i) return;
  const l = Math.max(Dt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Yo(t, e, a) {
  const { book: o, chapterNum: r, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return { book: o, chapterNum: r, verseNum: s + 1 };
  const i = yt(o, e, "next");
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Tr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: s + 1 };
  const i = ft(r, e, "next");
========
function Cr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: s + 1 };
  const i = ft(r, e, "next");
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Qo(t, e) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Cr(t, e) {
========
function jr(t, e) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const tr = (t, e, a, o, r) => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const jr = (t, e, a, r, n) => {
========
const Gr = (t, e, a, r, n) => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  switch (t) {
    case rt.OT:
      return e ?? "Old Testament";
    case rt.NT:
      return a ?? "New Testament";
    case rt.DC:
      return o ?? "Deuterocanon";
    case rt.Extra:
      return r ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
}, er = (t, e, a, o, r) => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
}, Gr = (t, e, a, r, n) => {
========
}, zr = (t, e, a, r, n) => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  switch (t) {
    case rt.OT:
      return e ?? "OT";
    case rt.NT:
      return a ?? "NT";
    case rt.DC:
      return o ?? "DC";
    case rt.Extra:
      return r ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ar(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? L.bookIdToEnglishName(t);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function zr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? j.bookIdToEnglishName(t);
========
function Lr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? G.bookIdToEnglishName(t);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function fa(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ea(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
========
function aa(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const or = Object.fromEntries(
  wa.map((t) => [t, L.bookIdToEnglishName(t)])
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Lr = Object.fromEntries(
  Ye.map((t) => [t, j.bookIdToEnglishName(t)])
========
const Ar = Object.fromEntries(
  Qe.map((t) => [t, G.bookIdToEnglishName(t)])
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function rr(t, e, a) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const r = L.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(r.toLowerCase().includes(o) || t.toLowerCase().includes(o) || (s ? s.localizedName.toLowerCase().includes(o) || s.localizedId.toLowerCase().includes(o) : !1));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ar(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = j.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
========
function Rr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = G.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
const Xt = `
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ha(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function aa(t) {
========
function ra(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function mt(t, e) {
  const a = e ? `${Xt}, ${e}` : Xt;
  return Array.from(t.querySelectorAll(a)).filter(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && ha(o)
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && aa(r)
========
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && ra(r)
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const nr = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let At = "keyboard", Zt = !1;
function sr() {
  Zt || typeof document > "u" || (Zt = !0, document.addEventListener(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Rr = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let yt = "keyboard", Bt = !1;
function Dr() {
  Bt || typeof document > "u" || (Bt = !0, document.addEventListener(
========
const Dr = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let yt = "keyboard", Bt = !1;
function Pr() {
  Bt || typeof document > "u" || (Bt = !0, document.addEventListener(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "pointerdown",
    () => {
      At = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      At = "keyboard";
    },
    !0
  ));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ir() {
  return At;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Pr() {
  return yt;
========
function Or() {
  return yt;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const be = "data-quiet-focus";
function lr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(be, ""), t.style.outline = "none"));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const ne = "data-quiet-focus";
function Or(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(ne, ""), t.style.outline = "none"));
========
const ne = "data-quiet-focus";
function Br(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(ne, ""), t.style.outline = "none"));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function cr(t) {
  t && (t.removeAttribute(be), t.style.removeProperty("outline"));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Br(t) {
  t && (t.removeAttribute(ne), t.style.removeProperty("outline"));
========
function Mr(t) {
  t && (t.removeAttribute(ne), t.style.removeProperty("outline"));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const dr = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function ga({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Mr = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function ra({
========
const Hr = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function oa({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...o
}) {
  return /* @__PURE__ */ n(
    Ce.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const ba = ot(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const oa = W(
========
const na = W(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  "tw:group/button-group tw:flex tw:w-fit tw:items-stretch tw:*:focus-visible:relative tw:*:focus-visible:z-10 tw:has-[>[data-slot=button-group]]:gap-2 tw:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg tw:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit tw:[&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "tw:[&>*:not(:first-child)]:rounded-s-none tw:[&>*:not(:first-child)]:border-s-0 tw:[&>*:not(:last-child)]:rounded-e-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg!",
        vertical: "tw:flex-col tw:[&>*:not(:first-child)]:rounded-t-none tw:[&>*:not(:first-child)]:border-t-0 tw:[&>*:not(:last-child)]:rounded-b-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ur({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Hr({
========
function Ur({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  orientation: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        ba({ orientation: e }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        oa({ orientation: e }),
========
        na({ orientation: e }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function wr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ur({
========
function $r({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  asChild: e = !1,
  ...a
}) {
  const o = e ? jt.Root : "div";
  return /* @__PURE__ */ n(
    o,
    {
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function pr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function $r({
========
function Fr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  orientation: e = "vertical",
  ...a
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return /* @__PURE__ */ n(
    ga,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return /* @__PURE__ */ o(
    ra,
========
  return /* @__PURE__ */ o(
    oa,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...a
    }
  );
}
const mr = "data-platform-content-zoom-root", fr = "data-platform-content-zoom-popup", va = "--platform-content-zoom-", Na = "--platform-content-zoom-default", xa = "main", Sa = "--platform-content-zoom-popup-factor", ve = ae(void 0);
function hr({ area: t, children: e }) {
  return /* @__PURE__ */ n(ve.Provider, { value: t ?? "", children: e });
}
function Bt() {
  return oe(ve);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Mt(t) {
  const e = t || xa;
  return {
    [Sa]: `var(${va}${e}, var(${Na}, 1))`
  };
}
function Ne({ ...t }) {
  return /* @__PURE__ */ n(wt.Root, { "data-slot": "popover", ...t });
}
function zt({ ...t }) {
  return /* @__PURE__ */ n(wt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const xe = C.createContext(null);
function gr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const ie = C.createContext(null);
function Fr({
========
const ie = j.createContext(null);
function Kr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(xe.Provider, { value: t, children: e });
}
function Se({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const s = $(), i = C.useContext(xe), l = Bt();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const s = M(), i = C.useContext(ie);
========
  const s = M(), i = j.useContext(ie);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(wt.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      wt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          // CUSTOM: Inside a content-zoom area, cap the width at the space Radix reports as available,
          // divided by the area's zoom factor: Radix measures in unzoomed pixels while this element's
          // own lengths are zoomed, so the division keeps a zoomed popover inside the pane
          // CUSTOM: Falls back to 100vw until Radix's size middleware publishes the real available
          // width, so the measuring pass gets a real cap instead of an invalid var() computing to none
          l !== void 0 && "tw:max-w-[calc(var(--radix-popover-content-available-width,100vw)/var(--platform-content-zoom-popup-factor,1))]",
          // CUSTOM: Inside a content-zoom area, also cap the height at the space Radix reports as
          // available, divided by the area's zoom factor, so a tall zoomed popover stays inside the
          // pane vertically too (same unzoomed-vs-zoomed pixel reason as the width cap above). The
          // box scrolls, so content that cannot shrink to the capped size stays inside it instead of
          // painting past its edges. That makes this element a clipping ancestor for anything
          // rendered inside it: the editor's right-click menu portals into the footnote editor's
          // root, a descendant, and stays inside this box only because the editor library clamps
          // the menu against its clipping ancestors. A nested pop-up that does not do that would
          // be clipped here.
          // CUSTOM: Falls back to 100vh until Radix's size middleware publishes the real available
          // height, so the measuring pass gets a real cap instead of an invalid var() computing to none
          l !== void 0 && "tw:max-h-[calc(var(--radix-popover-content-available-height,100vh)/var(--platform-content-zoom-popup-factor,1))] tw:overflow-y-auto",
          t
        ),
        style: {
          zIndex: le,
          ...l === void 0 ? void 0 : Mt(l),
          ...o
        },
        dir: s,
        "data-platform-content-zoom-root": l,
        "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
        ...r
      }
    ) })
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function br({ ...t }) {
  return /* @__PURE__ */ n(wt.Anchor, { "data-slot": "popover-anchor", ...t });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Kr({ ...t }) {
  return /* @__PURE__ */ o(it.Anchor, { "data-slot": "popover-anchor", ...t });
========
function Vr({ ...t }) {
  return /* @__PURE__ */ o(it.Anchor, { "data-slot": "popover-anchor", ...t });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function vr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Jr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Nr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Jr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function qr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Wt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    lt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ht({ ...t }) {
  return /* @__PURE__ */ n(lt.Root, { "data-slot": "tooltip", ...t });
}
function Ut({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    lt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(de({ variant: e }), t) : t,
      ...a
    }
  );
}
function $t({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: a,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: o = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: r,
  children: s,
  ...i
}) {
  const l = Bt();
  return /* @__PURE__ */ n(lt.Portal, { children: /* @__PURE__ */ p(
    lt.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      style: {
        zIndex: oa,
        ...l === void 0 ? void 0 : Mt(l),
        ...a
      },
      className: c(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      style: { zIndex: $e, ...a },
      className: d(
========
      style: { zIndex: Fe, ...a },
      className: d(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        // CUSTOM: Inside a content-zoom area, keep the tooltip's usual 20rem limit (zoomed with its
        // text) but never wider than the space Radix reports as available, divided by the area's
        // zoom factor, so a zoomed tooltip stays inside the pane. Replaces the base max-w-xs.
        // CUSTOM: Falls back to 100vw until Radix's size middleware publishes the real available
        // width, so the measuring pass gets a real cap instead of an invalid var() computing to none
        l !== void 0 && "tw:max-w-[min(20rem,calc(var(--radix-tooltip-content-available-width,100vw)/var(--platform-content-zoom-popup-factor,1)))]",
        t
      ),
      "data-platform-content-zoom-root": l,
      "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
      ...i,
      children: [
        s,
        o && /* @__PURE__ */ n(
          lt.Arrow,
          {
            className: c(
              "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
              "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
              "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
              r
            )
          }
        )
      ]
    }
  ) });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const ya = /^%[^%]*%$/;
function ye(t) {
  return t !== void 0 && !ya.test(t) && t.trim() !== "";
}
function T(t, e) {
  return ye(t) ? t : e;
}
function Ia() {
  const [t, e] = H(!1), a = pt(null), o = X(() => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function na() {
  const [t, e] = K(!1), a = pt(null), r = q(() => {
========
function sa() {
  const [t, e] = V(!1), a = pt(null), r = q(() => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), r = X(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: o, onPointerLeave: r };
}
const Ie = ae(void 0);
function It() {
  const t = oe(Ie);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const kt = ot("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ka({ variant: t = "default", ...e }) {
  const a = $(), o = C.useMemo(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function sa({ variant: t = "default", ...e }) {
  const a = M(), r = C.useMemo(
========
function ia({ variant: t = "default", ...e }) {
  const a = M(), r = j.useMemo(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    () => ({
      variant: t
    }),
    [t]
  );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return /* @__PURE__ */ n(Ie.Provider, { value: o, children: /* @__PURE__ */ n(E.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return /* @__PURE__ */ o(de.Provider, { value: r, children: /* @__PURE__ */ o(_.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
========
  return /* @__PURE__ */ o(de.Provider, { value: r, children: /* @__PURE__ */ o(T.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Sr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function qr({
========
function Wr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  ...t
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return /* @__PURE__ */ n(E.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ea({
  ...t
}) {
  return /* @__PURE__ */ n(E.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return /* @__PURE__ */ o(_.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ia({
  ...t
}) {
  return /* @__PURE__ */ o(_.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
========
  return /* @__PURE__ */ o(T.Portal, { "data-slot": "dropdown-menu-portal", ...t });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const Ta = "min(8rem, calc(max(var(--radix-dropdown-menu-content-available-width, 100vw), 8rem) / var(--platform-content-zoom-popup-factor, 1)))";
function _a({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function la({
========
function la({
  ...t
}) {
  return /* @__PURE__ */ o(T.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function da({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  children: r,
  ...s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const i = $(), l = Bt();
  return /* @__PURE__ */ n(E.Portal, { children: /* @__PURE__ */ n(
    E.Content,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const i = M();
  return /* @__PURE__ */ o(_.Portal, { children: /* @__PURE__ */ o(
    _.Content,
========
  const i = M();
  return /* @__PURE__ */ o(T.Portal, { children: /* @__PURE__ */ o(
    T.Content,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: c(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop) —
        // a dropdown menu must clear the overlay layer, including when opened from inside a
        // popover or dialog
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // A blur layer on a scrolling surface scrolls away with its items and never covers the
        // scrollbar gutter, so this scrolling surface in particular must be painted opaque.
        "pr-twp tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        // CUSTOM: Inside a content-zoom area, cap height and width at the space Radix reports as
        // available, divided by the area's zoom factor: Radix measures in unzoomed pixels while
        // this element's own lengths are zoomed. Replaces the base unzoomed max-height above.
        // CUSTOM: Falls back to 100vh/100vw until Radix's size middleware publishes the real
        // available space, so the measuring pass gets a real cap instead of an invalid var()
        // computing to none.
        l !== void 0 && "tw:max-h-[calc(var(--radix-dropdown-menu-content-available-height,100vh)/var(--platform-content-zoom-popup-factor,1))] tw:max-w-[calc(var(--radix-dropdown-menu-content-available-width,100vw)/var(--platform-content-zoom-popup-factor,1))]",
        t
      ),
      style: {
        zIndex: le,
        ...l === void 0 ? void 0 : Mt(l),
        ...l === void 0 ? void 0 : { minWidth: Ta },
        ...o
      },
      "data-platform-content-zoom-root": l,
      "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
      ...s,
      children: /* @__PURE__ */ n("div", { dir: i, children: r })
    }
  ) });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function yr({ ...t }) {
  return /* @__PURE__ */ n(E.Group, { "data-slot": "dropdown-menu-group", ...t });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Wr({ ...t }) {
  return /* @__PURE__ */ o(_.Group, { "data-slot": "dropdown-menu-group", ...t });
========
function Zr({ ...t }) {
  return /* @__PURE__ */ o(T.Group, { "data-slot": "dropdown-menu-group", ...t });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ir({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Zr({
========
function Yr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  inset: e,
  variant: a = "default",
  ...o
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const r = $(), s = It();
  return /* @__PURE__ */ n(
    E.Item,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const n = M(), s = ht();
  return /* @__PURE__ */ o(
    _.Item,
========
  const n = M(), s = ht();
  return /* @__PURE__ */ o(
    T.Item,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        kt({ variant: s.variant })
      ),
      dir: r,
      ...o
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function kr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Yr({
========
function Qr({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  children: e,
  checked: a,
  inset: o,
  ...r
}) {
  const s = $(), i = It();
  return /* @__PURE__ */ p(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    E.CheckboxItem,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    _.CheckboxItem,
========
    T.CheckboxItem,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        kt({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(Rt, {}) })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
            children: /* @__PURE__ */ o(_.ItemIndicator, { children: /* @__PURE__ */ o(Et, {}) })
========
            children: /* @__PURE__ */ o(T.ItemIndicator, { children: /* @__PURE__ */ o(Et, {}) })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          }
        ),
        e
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ca({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function da({
========
function ca({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  ...t
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return /* @__PURE__ */ n(E.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return /* @__PURE__ */ o(_.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
========
  return /* @__PURE__ */ o(T.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
function qt({
  className: t,
  children: e,
  inset: a,
  ...o
}) {
  const r = $(), s = It();
  return /* @__PURE__ */ p(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    E.RadioItem,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    _.RadioItem,
========
    T.RadioItem,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        kt({ variant: s.variant })
      ),
      dir: r,
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(Rt, {}) })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
            children: /* @__PURE__ */ o(_.ItemIndicator, { children: /* @__PURE__ */ o(Et, {}) })
========
            children: /* @__PURE__ */ o(T.ItemIndicator, { children: /* @__PURE__ */ o(Et, {}) })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          }
        ),
        e
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function La({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    E.Label,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ca({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ o(
    _.Label,
========
function ua({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ o(
    T.Label,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: c(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Aa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    E.Separator,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ua({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    _.Separator,
========
function wa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    T.Separator,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Er({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Qr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function to({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: c(
        // CUSTOM: Added tw:[unicode-bidi:plaintext] so the hint takes its direction from its first
        // letter, keeping macOS symbols in order (⌃F, not F⌃) in RTL menus. Unlike dir="ltr", it
        // keeps the span's direction, so tw:ms-auto still puts the hint at the inline end
        "tw:[unicode-bidi:plaintext] tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Tr({ ...t }) {
  return /* @__PURE__ */ n(E.Sub, { "data-slot": "dropdown-menu-sub", ...t });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function to({ ...t }) {
  return /* @__PURE__ */ o(_.Sub, { "data-slot": "dropdown-menu-sub", ...t });
========
function eo({ ...t }) {
  return /* @__PURE__ */ o(T.Sub, { "data-slot": "dropdown-menu-sub", ...t });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function _r({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function eo({
========
function ao({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  inset: e,
  children: a,
  ...o
}) {
  const r = It();
  return /* @__PURE__ */ p(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    E.SubTrigger,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    _.SubTrigger,
========
    T.SubTrigger,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        kt({ variant: r.variant })
      ),
      ...o,
      children: [
        a,
        /* @__PURE__ */ n(Ge, { className: "tw:ms-auto" })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Cr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ao({
========
function ro({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: a,
  ...o
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const r = $();
  return /* @__PURE__ */ n(
    E.SubContent,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const n = M();
  return /* @__PURE__ */ o(
    _.SubContent,
========
  const n = M();
  return /* @__PURE__ */ o(
    T.SubContent,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop),
        // keeping submenus on the same overlay tier as their parent DropdownMenuContent
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        "pr-twp tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        t
      ),
      style: { zIndex: ce, ...e },
      ...o,
      children: /* @__PURE__ */ n("div", { dir: r, children: a })
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Lr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Le.Root,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ro({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    he.Root,
========
function oo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    he.Root,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "label",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ar({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function oo({
========
function no({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  ...e
}) {
  const a = $();
  return /* @__PURE__ */ n(
    _t.Root,
    {
      "data-slot": "radio-group",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: a,
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function zr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function no({
========
function so({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    _t.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        _t.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const za = ot(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const wa = W(
========
const pa = W(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  // CUSTOM: Added pr-twp at the front of the base class string to apply Platform.Bible's Tailwind
  // CSS scope isolation; all Toggle and ToggleGroupItem components inherit this via toggleVariants
  "pr-twp tw:group/toggle tw:inline-flex tw:items-center tw:justify-center tw:gap-1 tw:rounded-lg tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:hover:bg-muted tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:aria-pressed:bg-muted tw:data-[state=on]:bg-muted tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        outline: "tw:border tw:border-input tw:bg-transparent tw:hover:bg-muted"
      },
      size: {
        default: "tw:h-8 tw:min-w-8 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        sm: "tw:h-7 tw:min-w-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",
        lg: "tw:h-9 tw:min-w-9 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
), ke = C.createContext({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
), ce = C.createContext({
========
), ce = j.createContext({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Gr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function so({
========
function io({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  variant: e,
  size: a,
  spacing: o = 0,
  orientation: r = "horizontal",
  children: s,
  ...i
}) {
  const l = $();
  return /* @__PURE__ */ n(
    ee.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": o,
      "data-orientation": r,
      style: { "--gap": o },
      className: c(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...i,
      children: /* @__PURE__ */ n(
        ke.Provider,
        {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          value: C.useMemo(
            () => ({ variant: e, size: a, spacing: o, orientation: r }),
            [e, a, o, r]
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          value: C.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: n }),
            [e, a, r, n]
========
          value: j.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: n }),
            [e, a, r, n]
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          ),
          children: s
        }
      )
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function jr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function io({
========
function lo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  children: e,
  variant: a = "default",
  size: o = "default",
  ...r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const s = C.useContext(ke);
  return /* @__PURE__ */ n(
    ee.Item,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const s = C.useContext(ce);
  return /* @__PURE__ */ o(
    Kt.Item,
========
  const s = j.useContext(ce);
  return /* @__PURE__ */ o(
    Kt.Item,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || o,
      "data-spacing": s.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        za({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        wa({
========
        pa({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          variant: s.variant || a,
          size: s.size || o
        }),
        t
      ),
      ...r,
      children: e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Rr() {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function lo() {
========
function co() {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return /Macintosh/i.test(navigator.userAgent);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Or() {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function co() {
========
function uo() {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return /Windows/i.test(navigator.userAgent);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const Ga = ["input", "select", "textarea", "button"], ja = ["button", "textbox"], Pr = ({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const pa = ["input", "select", "textarea", "button"], ma = ["button", "textbox"], uo = ({
========
const ma = ["input", "select", "textarea", "button"], fa = ["button", "textbox"], wo = ({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: o
}) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const r = pt(null), [s, i] = H(void 0), [l, u] = H(void 0), m = X(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const n = pt(null), [s, i] = K(void 0), [l, u] = K(void 0), m = q(
========
  const n = pt(null), [s, i] = V(void 0), [l, u] = V(void 0), m = q(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    (w) => {
      i(w);
      const g = t.find((h) => h.id === w);
      g && (e == null || e(g));
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      const v = document.getElementById(w);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), r.current && r.current.setAttribute("aria-activedescendant", w);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      const v = document.getElementById(w);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), n.current && n.current.setAttribute("aria-activedescendant", w);
========
      const x = document.getElementById(w);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), n.current && n.current.setAttribute("aria-activedescendant", w);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    },
    [e, t]
  ), f = X(
    (w) => {
      const g = t.find((x) => x.id === w);
      g && (u((x) => x === w ? void 0 : w), a == null || a(g));
    },
    [a, t]
  ), y = (w) => {
    if (!w) return !1;
    const g = w.tagName.toLowerCase();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    if (w.isContentEditable || Ga.includes(g)) return !0;
    const v = w.getAttribute("role");
    if (v && ja.includes(v)) return !0;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    if (w.isContentEditable || pa.includes(g)) return !0;
    const v = w.getAttribute("role");
    if (v && ma.includes(v)) return !0;
========
    if (w.isContentEditable || ma.includes(g)) return !0;
    const x = w.getAttribute("role");
    if (x && fa.includes(x)) return !0;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    const h = w.getAttribute("tabindex");
    return h !== void 0 && h !== "-1";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  }, k = X(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  }, I = q(
========
  }, E = q(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    (w) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      var R;
      const g = w.target, v = (x) => x ? document.getElementById(x) : void 0, h = v(l), F = v(s);
      if (!!(h && g && h.contains(g) && g !== h) && y(g)) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      var A;
      const g = w.target, v = (x) => x ? document.getElementById(x) : void 0, h = v(l), $ = v(s);
      if (!!(h && g && h.contains(g) && g !== h) && k(g)) {
========
      var B;
      const g = w.target, x = (N) => N ? document.getElementById(N) : void 0, h = x(l), U = x(s);
      if (!!(h && g && h.contains(g) && g !== h) && k(g)) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        if (w.key === "Escape" || w.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
            const x = t.find((U) => U.id === l);
            x && m(x.id);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
            const x = t.find((B) => B.id === l);
            x && m(x.id);
========
            const N = t.find((I) => I.id === l);
            N && m(N.id);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!h) return;
          const N = Array.from(
            h.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          if (x.length === 0) return;
          const U = x.findIndex((q) => q === g);
          if (U === -1) return;
          let W;
          w.key === "ArrowDown" ? W = Math.min(U + 1, x.length - 1) : W = Math.max(U - 1, 0), W !== U && (w.preventDefault(), w.stopPropagation(), (R = x[W]) == null || R.focus());
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          if (x.length === 0) return;
          const B = x.findIndex((O) => O === g);
          if (B === -1) return;
          let S;
          w.key === "ArrowDown" ? S = Math.min(B + 1, x.length - 1) : S = Math.max(B - 1, 0), S !== B && (w.preventDefault(), w.stopPropagation(), (A = x[S]) == null || A.focus());
========
          if (N.length === 0) return;
          const I = N.findIndex((P) => P === g);
          if (I === -1) return;
          let S;
          w.key === "ArrowDown" ? S = Math.min(I + 1, N.length - 1) : S = Math.max(I - 1, 0), S !== I && (w.preventDefault(), w.stopPropagation(), (B = N[S]) == null || B.focus());
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          return;
        }
        return;
      }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      const tt = t.findIndex((x) => x.id === s);
      let A = tt;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      const X = t.findIndex((x) => x.id === s);
      let L = X;
========
      const $ = t.findIndex((N) => N.id === s);
      let O = $;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      switch (w.key) {
        case "ArrowDown":
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          A = Math.min(tt + 1, t.length - 1), w.preventDefault();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          L = Math.min(X + 1, t.length - 1), w.preventDefault();
========
          O = Math.min($ + 1, t.length - 1), w.preventDefault();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          break;
        case "ArrowUp":
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          A = Math.max(tt - 1, 0), w.preventDefault();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          L = Math.max(X - 1, 0), w.preventDefault();
========
          O = Math.max($ - 1, 0), w.preventDefault();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          break;
        case "Home":
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          A = 0, w.preventDefault();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          L = 0, w.preventDefault();
========
          O = 0, w.preventDefault();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          break;
        case "End":
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          A = t.length - 1, w.preventDefault();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          L = t.length - 1, w.preventDefault();
========
          O = t.length - 1, w.preventDefault();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          const x = F;
          if (x) {
            const U = x.querySelector(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          const x = $;
          if (x) {
            const B = x.querySelector(
========
          const N = U;
          if (N) {
            const I = N.querySelector(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
            ), W = x.querySelector(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
            ), S = x.querySelector(
========
            ), S = N.querySelector(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
            ), q = U ?? W;
            if (q) {
              w.preventDefault(), q.focus();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
            ), O = B ?? S;
            if (O) {
              w.preventDefault(), O.focus();
========
            ), P = I ?? S;
            if (P) {
              w.preventDefault(), P.focus();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (y(g) || (o == null || o(w.key), w.preventDefault()));
          return;
      }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      const et = t[A];
      et && m(et.id);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      const H = t[L];
      H && m(H.id);
========
      const F = t[O];
      F && m(F.id);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    },
    [t, m, s, l, f, o]
  );
  return {
    listboxRef: r,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    handleKeyDown: k,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    handleKeyDown: I,
========
    handleKeyDown: E,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    /** Focus an option by its ID */
    focusOption: m
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
}, Ra = ot(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
}, fa = W(
========
}, ha = W(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  "tw:group/badge tw:inline-flex tw:h-5 tw:w-fit tw:shrink-0 tw:items-center tw:justify-center tw:gap-1 tw:overflow-hidden tw:rounded-4xl tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:whitespace-nowrap tw:transition-all tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:[&>svg]:pointer-events-none tw:[&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:[a]:hover:bg-secondary/80",
        destructive: "tw:bg-destructive/10 tw:text-destructive tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:focus-visible:ring-destructive/40 tw:[a]:hover:bg-destructive/20",
        outline: "tw:border-border tw:text-foreground tw:[a]:hover:bg-muted tw:[a]:hover:text-muted-foreground",
        ghost: "tw:hover:bg-muted tw:hover:text-muted-foreground tw:dark:hover:bg-muted/50",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
        // CUSTOM: Added 'muted' variant — a muted-background badge without a visible border, for
        // low-emphasis status indicators.
        muted: "tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80",
        // CUSTOM: Added 'blueIndicator' variant — a small solid blue dot for status indication,
        // without padding. Used as a notification or presence indicator.
        blueIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0",
        // CUSTOM: Added 'mutedIndicator' variant — a small solid muted dot for status indication,
        // without padding. Used as a lower-emphasis presence or state indicator.
        mutedIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function St({ className: t, variant: e = "default", asChild: a = !1, ...o }) {
  const r = a ? jt.Root : "span";
  return /* @__PURE__ */ n(
    r,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        Ra({ variant: e }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        fa({ variant: e }),
========
        ha({ variant: e }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        t
      ),
      ...o
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Dr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function wo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function po({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Br({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function po({
========
function mo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...o
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const r = C.useRef(null);
  C.useEffect(() => {
    typeof a == "function" ? a(r.current) : a && "current" in a && (a.current = r.current);
  }, [a]), C.useEffect(() => {
    const i = r.current;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const n = C.useRef(null);
  C.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), C.useEffect(() => {
    const i = n.current;
========
  const n = j.useRef(null);
  j.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), j.useEffect(() => {
    const i = n.current;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        mt(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const u = new MutationObserver(() => {
      l();
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
    const { current: l } = r;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), mt(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ n(
      "div",
      {
        "data-slot": "table-container",
        className: c("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: r,
            onKeyDown: s,
            className: c(
              "tw:w-full tw:caption-bottom tw:text-sm",
              // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
              "tw:outline-hidden",
              // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
              "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
              t
            ),
            "aria-label": "Table",
            "aria-labelledby": "table-label",
            ...o
          }
        )
      }
    )
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Mr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function mo({
========
function fo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: c(
        {
          // CUSTOM: Apply sticky header styles when stickyHeader is true so headers remain
          // visible while scrolling through long tables
          "tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm": e
        },
        "tw:[&_tr]:border-b",
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Hr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function fo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function ho({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ur({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ho({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function go({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "tfoot",
    {
      "data-slot": "table-footer",
      className: c(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Oa(t) {
  C.useEffect(() => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ha(t) {
  C.useEffect(() => {
========
function ga(t) {
  j.useEffect(() => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    const e = t.current;
    if (!e) return;
    const a = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const r = t.current ? mt(t.current) : [], s = r.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < r.length && r[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Pa(t, e, a) {
  let o;
  return a === "ArrowLeft" && e > 0 ? o = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ga(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
========
function ba(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Da(t, e, a) {
  let o;
  return a === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : a === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ba(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
========
function Na(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function $r({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function go({
========
function bo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: o = !1,
  ref: r,
  ...s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const i = C.useRef(null);
  C.useEffect(() => {
    typeof r == "function" ? r(i.current) : r && "current" in r && (r.current = i.current);
  }, [r]), Oa(i);
  const l = C.useMemo(
    () => i.current ? mt(i.current) : [],
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const i = C.useRef(null);
  C.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), ha(i);
  const l = C.useMemo(
    () => i.current ? lt(i.current) : [],
========
  const i = j.useRef(null);
  j.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), ga(i);
  const l = j.useMemo(
    () => i.current ? lt(i.current) : [],
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    [i]
  ), u = j.useCallback(
    (f) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      const k = y.closest("table"), w = k ? (
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      const { current: k } = i;
      if (!k || !k.parentElement) return;
      const I = k.closest("table"), w = I ? (
========
      const { current: k } = i;
      if (!k || !k.parentElement) return;
      const E = k.closest("table"), w = E ? (
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        mt(k).filter(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        lt(I).filter(
========
        lt(E).filter(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          (h) => h.tagName === "TR"
        )
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      ) : [], g = w.indexOf(y), v = l.indexOf(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      ) : [], g = w.indexOf(k), v = l.indexOf(
========
      ) : [], g = w.indexOf(k), x = l.indexOf(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        f.preventDefault(), Da(w, g, f.key);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        f.preventDefault(), ba(w, g, f.key);
========
        f.preventDefault(), Na(w, g, f.key);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        f.preventDefault(), Pa(l, v, f.key);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        f.preventDefault(), ga(l, v, f.key);
========
        f.preventDefault(), ba(l, x, f.key);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      else if (f.key === "Escape") {
        f.preventDefault();
        const h = y.closest("table");
        h && h.focus();
      }
      e == null || e(f);
    },
    [i, l, e]
  ), m = j.useCallback(
    (f) => {
      o && (a == null || a(f));
    },
    [o, a]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: u,
      onFocus: m,
      className: c(
        "tw:border-b tw:transition-colors tw:hover:bg-muted/50 tw:has-aria-expanded:bg-muted/50 tw:data-[state=selected]:bg-muted",
        // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with a custom
        // focus ring so keyboard users see a visible, accessible focus indicator on focused rows
        "tw:outline-hidden",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      ...s
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Fr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function bo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function No({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "th",
    {
      "data-slot": "table-head",
      className: c(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Kr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function No({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function vo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "td",
    {
      "data-slot": "table-cell",
      className: c(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Vr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function vo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function xo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ba(t, e = !0) {
  const [a, o] = H(!1);
  return Ct(() => {
    const r = t.current;
    if (!e || !r) {
      o(!1);
      return;
    }
    const s = () => {
      o(r.scrollTop + r.clientHeight < r.scrollHeight - 1);
    };
    s(), r.addEventListener("scroll", s);
    const i = typeof ResizeObserver < "u" ? new ResizeObserver(s) : void 0;
    i == null || i.observe(r);
    const l = new MutationObserver(s);
    return l.observe(r, { childList: !0, subtree: !0 }), () => {
      r.removeEventListener("scroll", s), i == null || i.disconnect(), l.disconnect();
    };
  }, [t, e]), a;
}
function Ma({
  children: t,
  isEnabled: e,
  scrollerRef: a
}) {
  const o = Ba(a, e);
  return e ? (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ p("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
      t,
      o && /* @__PURE__ */ n(
        "div",
        {
          "data-slot": "command-list-scroll-cue",
          "aria-hidden": !0,
          className: "tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-3 tw:bg-gradient-to-t tw:from-popover tw:to-transparent"
        }
      )
    ] })
  ) : t;
}
function Jr({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function xo({
========
function yo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  entries: t,
  selected: e,
  onChange: a,
  placeholder: o,
  searchPlaceholder: r,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: m,
  isOpen: f = void 0,
  onOpenChange: y = void 0,
  isDisabled: k = !1,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  sortSelected: w = !1,
  showScrollCue: g = !1,
  icon: v = void 0,
  className: h = void 0,
  variant: F = "ghost",
  id: K
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  sortSelected: I = !1,
  icon: w = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: h
========
  sortSelected: E = !1,
  icon: w = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: h
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const [V, tt] = H(!1), A = pt(null), et = X(
    (I) => {
      var B;
      const Y = (B = t.find((J) => J.label === I)) == null ? void 0 : B.value;
      Y && a(
        e.includes(Y) ? e.filter((J) => J !== Y) : [...e, Y]
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const [$, J] = K(!1), Z = q(
    (S) => {
      var E;
      const O = (E = t.find((F) => F.label === S)) == null ? void 0 : E.value;
      O && a(
        e.includes(O) ? e.filter((F) => F !== O) : [...e, O]
========
  const [U, X] = V(!1), Z = q(
    (S) => {
      var _;
      const P = (_ = t.find((K) => K.label === S)) == null ? void 0 : _.value;
      P && a(
        e.includes(P) ? e.filter((K) => K !== P) : [...e, P]
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      );
    },
    [t, e, a]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  ), R = () => m || o, x = f ?? V, U = y ?? tt, [W, q] = H(x), [it, D] = H(e);
  W !== x && (q(x), x && D(e));
  const ht = at(() => {
    if (!w) return t;
    const I = t.filter((B) => B.starred).sort((B, J) => B.label.localeCompare(J.label)), Y = t.filter((B) => !B.starred).sort((B, J) => {
      const bt = it.includes(B.value), vt = it.includes(J.value);
      return bt && !vt ? -1 : !bt && vt ? 1 : B.label.localeCompare(J.label);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  ), X = () => u || r, L = Q(() => {
    if (!I) return t;
    const S = t.filter((E) => E.starred).sort((E, F) => E.label.localeCompare(F.label)), O = t.filter((E) => !E.starred).sort((E, F) => {
      const ot = e.includes(E.value), ct = e.includes(F.value);
      return ot && !ct ? -1 : !ot && ct ? 1 : E.label.localeCompare(F.label);
========
  ), $ = () => u || r, O = Q(() => {
    if (!E) return t;
    const S = t.filter((_) => _.starred).sort((_, K) => _.label.localeCompare(K.label)), P = t.filter((_) => !_.starred).sort((_, K) => {
      const ot = e.includes(_.value), ct = e.includes(K.value);
      return ot && !ct ? -1 : !ot && ct ? 1 : _.label.localeCompare(K.label);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    return [...I, ...Y];
  }, [t, it, w]), gt = () => {
    const I = t.map((Y) => Y.value);
    D(I), a(I);
  }, Et = () => {
    D([]), a([]);
  };
  return /* @__PURE__ */ n("div", { id: K, className: h, children: /* @__PURE__ */ p(Ne, { open: x, onOpenChange: U, children: [
    /* @__PURE__ */ n(zt, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    return [...S, ...O];
  }, [t, e, I]), H = () => {
    a(t.map((S) => S.value));
  }, A = () => {
    a([]);
  }, x = m ?? $;
  return /* @__PURE__ */ o("div", { id: h, className: g, children: /* @__PURE__ */ p(se, { open: x, onOpenChange: f ?? J, children: [
    /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ p(
      U,
========
    return [...S, ...P];
  }, [t, e, E]), F = () => {
    a(t.map((S) => S.value));
  }, B = () => {
    a([]);
  }, N = m ?? U;
  return /* @__PURE__ */ o("div", { id: h, className: g, children: /* @__PURE__ */ p(se, { open: N, onOpenChange: f ?? X, children: [
    /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ p(
      H,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        variant: F,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        variant: v,
========
        variant: x,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        role: "combobox",
        "aria-expanded": N,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: k,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            v && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: v }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
                children: R()
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
                children: X()
========
                children: $()
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
              }
            )
          ] }),
          /* @__PURE__ */ n(ne, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Se, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(pe, { children: [
      /* @__PURE__ */ n(
        me,
        {
          placeholder: r ?? o,
          spaceSelectsHighlightedItem: !0
        }
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(Z, { variant: "ghost", size: "sm", onClick: gt, children: i }),
        /* @__PURE__ */ n(Z, { variant: "ghost", size: "sm", onClick: Et, children: l })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      n && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(U, { variant: "ghost", size: "sm", onClick: H, children: s }),
        /* @__PURE__ */ o(U, { variant: "ghost", size: "sm", onClick: A, children: i })
========
      n && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(H, { variant: "ghost", size: "sm", onClick: F, children: s }),
        /* @__PURE__ */ o(H, { variant: "ghost", size: "sm", onClick: B, children: i })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      /* @__PURE__ */ n(Ma, { isEnabled: g, scrollerRef: A, children: /* @__PURE__ */ p(fe, { ref: A, children: [
        /* @__PURE__ */ n(he, { children: u }),
        /* @__PURE__ */ n(ge, { children: ht.map((I) => /* @__PURE__ */ p(
          Pt,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      /* @__PURE__ */ p(ae, { children: [
        /* @__PURE__ */ o(re, { children: l }),
        /* @__PURE__ */ o(oe, { children: L.map((S) => /* @__PURE__ */ p(
          Tt,
========
      /* @__PURE__ */ p(ae, { children: [
        /* @__PURE__ */ o(re, { children: l }),
        /* @__PURE__ */ o(oe, { children: O.map((S) => /* @__PURE__ */ p(
          Tt,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          {
            value: I.label,
            onSelect: et,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                se,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(I.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
              I.starred && /* @__PURE__ */ n(Re, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: I.label }),
              I.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: I.secondaryLabel })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
              S.starred && /* @__PURE__ */ o(Se, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
========
              S.starred && /* @__PURE__ */ o(ke, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
            ]
          },
          I.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function ut(t) {
  return t.replace(/^\+/, "");
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ha(t, e, a) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Na(t, e, a) {
========
function va(t, e, a) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (!e) return [...t];
  const o = [...t], r = ut(e).toLowerCase();
  return a === "passive" ? Vt({
    query: r,
    items: o,
    filter: (s) => ut(s.label).toLowerCase().startsWith(r),
    sortBy: "label"
  }) : Vt({
    query: r,
    items: o,
    filter: (s) => ut(s.label).toLowerCase().includes(r),
    sortBy: "label"
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ua(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function va(t) {
========
function xa(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return t.isComposing || t.keyCode === 229;
}
const Ee = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
}, $a = [
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
}, xa = [
========
}, ya = [
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
], Fa = [
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
], ya = [
========
], Sa = [
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ka(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Sa(t) {
========
function ka(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    ...$a,
    ...Fa.filter((e) => Ee[t].test(e))
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    ...xa,
    ...ya.filter((e) => ue[t].test(e))
========
    ...ya,
    ...Sa.filter((e) => ue[t].test(e))
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  ];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function O(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function D(t) {
========
function R(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  t.preventDefault(), t.stopPropagation();
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Xr(t, e, a) {
  var r, s;
  const { kind: o } = e;
  if (o === "enter")
    return t.key === "Enter" ? (O(t), a.commit(), "ended") : t.key === "Escape" ? (O(t), a.dismiss(), "ended") : "passed";
  if (Ua(t) || Fe.has(t.key) || t.key === "Dead")
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function yo(t, e, a) {
  var n, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (D(t), a.commit(), "ended") : t.key === "Escape" ? (D(t), a.dismiss(), "ended") : "passed";
  if (va(t) || ze.has(t.key) || t.key === "Dead")
========
function So(t, e, a) {
  var n, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (R(t), a.commit(), "ended") : t.key === "Escape" ? (R(t), a.dismiss(), "ended") : "passed";
  if (xa(t) || Le.has(t.key) || t.key === "Dead")
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    return "passed";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((r = t.getModifierState) != null && r.call(t, "AltGraph")))
    return t.key === "Enter" && O(t), a.dismiss(), "ended";
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && D(t), a.dismiss(), "ended";
========
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && R(t), a.dismiss(), "ended";
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    return O(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    return D(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
========
    return R(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (t.key === "Enter" || t.key === "Tab")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    return O(t), Ha(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    return D(t), Na(
========
    return R(t), va(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      o === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    return O(t), a.dismiss(), "ended";
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    return D(t), a.dismiss(), "ended";
========
    return R(t), a.dismiss(), "ended";
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (t.key === " ") {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    if (o === "backslash")
      return O(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    O(t);
    const i = ut(e.filter).toLowerCase(), l = e.items.find(
      (u) => ut(u.marker).toLowerCase() === i
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    if (r === "backslash")
      return D(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    D(t);
    const i = st(e.filter).toLowerCase(), l = e.items.find(
      (u) => st(u.marker).toLowerCase() === i
========
    if (r === "backslash")
      return R(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    R(t);
    const i = st(e.filter).toLowerCase(), l = e.items.find(
      (u) => st(u.marker).toLowerCase() === i
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return t.key === "*" ? o === "selection" && e.filter === "" ? (O(t), a.dismiss(), "ended") : (O(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && o === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (O(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (O(t), a.dismiss(), "ended") : t.key === "Backspace" || Ee[o].test(t.key) ? (O(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (o === "selection" && O(t), a.dismiss(), "ended");
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return t.key === "*" ? r === "selection" && e.filter === "" ? (D(t), a.dismiss(), "ended") : (D(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (D(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (D(t), a.dismiss(), "ended") : t.key === "Backspace" || ue[r].test(t.key) ? (D(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && D(t), a.dismiss(), "ended");
========
  return t.key === "*" ? r === "selection" && e.filter === "" ? (R(t), a.dismiss(), "ended") : (R(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (R(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (R(t), a.dismiss(), "ended") : t.key === "Backspace" || ue[r].test(t.key) ? (R(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && R(t), a.dismiss(), "ended");
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Zr(t, e) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function So(t, e) {
========
function ko(t, e) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Wr(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ko(t) {
========
function Io(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: o,
    sessionCounterRef: r,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: m,
    focusEditor: f,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    applyItem: y,
    onShowError: k
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    applyItem: k,
    onShowError: I
========
    applyItem: k,
    onShowError: E
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  } = t;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  r.current += 1;
  const w = r.current, g = a ? "backslash" : "selection", v = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && o && (v.shouldSpaceCommit = o), s(v), u({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  n.current += 1;
  const w = n.current, g = a ? "backslash" : "selection", v = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && r && (v.shouldSpaceCommit = r), s(v), u({
========
  n.current += 1;
  const w = n.current, g = a ? "backslash" : "selection", x = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && r && (x.shouldSpaceCommit = r), s(x), u({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    keys: Ka(g),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    keys: Sa(g),
========
    keys: ka(g),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    onKey: (h) => l(h)
  }).then((h) => {
    if (i(w), h !== void 0) {
      m(), f();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      const F = e.find((K) => K.marker === h);
      F && y(F);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      const $ = e.find((J) => J.marker === h);
      $ && k($);
========
      const U = e.find((X) => X.marker === h);
      U && k(U);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    } else a || f();
  }).catch((h) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    i(w), a || f(), k(h);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    i(w), a || f(), I(h);
========
    i(w), a || f(), E(h);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function qr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Io({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Eo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "kbd",
    {
      "data-slot": "kbd",
      className: c(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Yr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Eo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function _o({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Va(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function ka(t) {
========
function Ia(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    const o = P(a.projectId), r = e.get(o), s = {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    const r = P(a.projectId), n = e.get(r), s = {
========
    const r = D(a.projectId), n = e.get(r), s = {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    r ? r.some((i) => i.scrollGroupId === a.scrollGroupId) || r.push(s) : e.set(o, [s]);
  }), e.forEach((a) => a.sort((o, r) => o.scrollGroupId - r.scrollGroupId)), e;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Yt(t, e, a) {
  const o = P(e);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ut(t, e, a) {
  const r = P(e);
========
function Ut(t, e, a) {
  const r = D(e);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return t.some(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    (r) => P(r.projectId) === o && r.scrollGroupId === a
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    (n) => P(n.projectId) === r && n.scrollGroupId === a
========
    (n) => D(n.projectId) === r && n.scrollGroupId === a
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Tt(t) {
  const e = Va(t.openTabs);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function bt(t) {
  const e = ka(t.openTabs);
========
function bt(t) {
  const e = Ia(t.openTabs);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (t.mode === "project") {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    const r = t.selection.projectId === void 0 ? void 0 : P(t.selection.projectId);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    const n = t.selection.projectId === void 0 ? void 0 : P(t.selection.projectId);
========
    const n = t.selection.projectId === void 0 ? void 0 : D(t.selection.projectId);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    return t.projects.map((s) => {
      const i = e.get(D(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        isSelected: r !== void 0 && r === P(s.id),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        isSelected: n !== void 0 && n === P(s.id),
========
        isSelected: n !== void 0 && n === D(s.id),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        isMuted: i.length === 0,
        isBoundButClosed: !1,
        isDisabled: s.isDisabled === !0,
        disabledReason: s.disabledReason,
        project: s
      };
    });
  }
  let a = [];
  t.mode === "project-multi" ? a = t.selection.pairs : t.selection.projectId !== void 0 && (a = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const o = [];
  return t.projects.forEach((r) => {
    const s = e.get(P(r.id));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const r = [];
  return t.projects.forEach((n) => {
    const s = e.get(P(n.id));
========
  const r = [];
  return t.projects.forEach((n) => {
    const s = e.get(D(n.id));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    if (!s || s.length === 0) {
      o.push({
        rowKey: `project:${r.id}`,
        projectId: r.id,
        shortName: r.shortName,
        fullName: r.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Yt(a, r.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        project: r
      });
      return;
    }
    s.forEach((i) => {
      o.push({
        rowKey: `tab:${r.id}:${i.scrollGroupId}`,
        projectId: r.id,
        shortName: r.shortName,
        fullName: r.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Yt(a, r.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        project: r
      });
    });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  }), a.forEach((r) => {
    if (r.scrollGroupId === void 0) return;
    const s = P(r.projectId);
    if (o.some(
      (l) => P(l.projectId) === s && l.scrollGroupId === r.scrollGroupId
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  }), a.forEach((n) => {
    if (n.scrollGroupId === void 0) return;
    const s = P(n.projectId);
    if (r.some(
      (l) => P(l.projectId) === s && l.scrollGroupId === n.scrollGroupId
========
  }), a.forEach((n) => {
    if (n.scrollGroupId === void 0) return;
    const s = D(n.projectId);
    if (r.some(
      (l) => D(l.projectId) === s && l.scrollGroupId === n.scrollGroupId
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    ))
      return;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    const i = t.projects.find((l) => P(l.id) === s);
    i && o.push({
      rowKey: `closed:${i.id}:${r.scrollGroupId}`,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    const i = t.projects.find((l) => P(l.id) === s);
    i && r.push({
      rowKey: `closed:${i.id}:${n.scrollGroupId}`,
========
    const i = t.projects.find((l) => D(l.id) === s);
    i && r.push({
      rowKey: `closed:${i.id}:${n.scrollGroupId}`,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: i.isDisabled === !0,
      disabledReason: i.disabledReason,
      project: i
    });
  }), o;
}
const Ft = "Selected", Kt = "Unselected";
function Qt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function nt(t, e) {
  const a = Ke(t, e);
  if (a !== 0) return a;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, r = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - r;
}
function Gt(t) {
  return [{ kind: "flat", rows: [...t].sort(nt) }];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Ja(t) {
  const e = t.filter(Qt).sort(nt), a = t.filter((r) => !Qt(r)).sort(nt);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ia(t) {
  const e = t.filter($t).sort(tt), a = t.filter((n) => !$t(n)).sort(tt);
========
function Ea(t) {
  const e = t.filter($t).sort(tt), a = t.filter((n) => !$t(n)).sort(tt);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const o = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && o.push({ kind: "other", rows: a }), o;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Xa(t, e) {
  const a = t.filter((i) => i.isSelected).sort(nt), o = t.filter((i) => !i.isSelected).sort(nt), r = (i, l) => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ea(t, e) {
  const a = t.filter((i) => i.isSelected).sort(tt), r = t.filter((i) => !i.isSelected).sort(tt), n = (i, l) => {
========
function _a(t, e) {
  const a = t.filter((i) => i.isSelected).sort(tt), r = t.filter((i) => !i.isSelected).sort(tt), n = (i, l) => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    var m;
    const u = (m = e.getSectionHeading) == null ? void 0 : m.call(
      e,
      i,
      l.map((f) => f.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? Ft : Kt;
  }, s = [];
  return a.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: r("selected", a),
    rows: a
  }), o.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: r("unselected", o),
    rows: o
  }), s;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function Za(t, e) {
  if (e.id === "openTabs") return Ja(t);
  if (e.id === "selection") return Xa(t, e);
  if (!e.getGroupKey) return Gt(t);
  const a = /* @__PURE__ */ new Map(), o = [], { getGroupKey: r } = e;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function _a(t, e) {
  if (e.id === "openTabs") return Ia(t);
  if (e.id === "selection") return Ea(t, e);
  if (!e.getGroupKey) return kt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: n } = e;
========
function Ta(t, e) {
  if (e.id === "openTabs") return Ea(t);
  if (e.id === "selection") return _a(t, e);
  if (!e.getGroupKey) return kt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: n } = e;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  t.forEach((l) => {
    const u = r(l.project);
    if (u === void 0 || u === "") {
      o.push(l);
      return;
    }
    const m = a.get(u);
    m ? m.push(l) : a.set(u, [l]);
  });
  const s = [...a.entries()].map(([l, u]) => {
    var y;
    const m = [...u].sort(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      (k, w) => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      (I, w) => {
========
      (E, w) => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        var g;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, k.project, w.project)) || nt(k, w);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, I.project, w.project)) || tt(I, w);
========
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, E.project, w.project)) || tt(E, w);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      }
    ), f = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      l,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      m.map((k) => k.project)
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      m.map((I) => I.project)
========
      m.map((E) => E.project)
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    )) ?? l;
    return { key: l, heading: f, rows: m };
  });
  s.sort((l, u) => l.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: u.key, heading: u.heading }
  ) : l.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: u, rows: m }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: u,
    rows: m,
    isPriority: l === e.priorityKey
  }));
  return o.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...o].sort(nt)
  }), i;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const Qr = [
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const _o = [
========
const To = [
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  "%projectSelector_searchPlaceholder%",
  "%projectSelector_commandEmptyMessage%",
  "%projectSelector_groupByAriaLabel%",
  "%projectSelector_groupSectionLabel%",
  "%projectSelector_groupByNone%",
  "%projectSelector_openTabsSectionHeading%",
  "%projectSelector_otherProjectsSectionHeading%",
  "%projectSelector_boundButClosedTooltip%",
  "%projectSelector_openButtonLabel%",
  "%projectSelector_clearAll%",
  "%projectSelector_grouping_openTabs_label%",
  "%projectSelector_grouping_lastUsed_label%",
  "%projectSelector_grouping_lastUsed_recentSectionHeading%",
  "%projectSelector_grouping_lastUsed_otherSectionHeading%",
  "%projectSelector_grouping_language_label%",
  "%projectSelector_grouping_language_unknownSectionHeading%",
  "%projectSelector_grouping_type_label%",
  "%projectSelector_grouping_type_unknownSectionHeading%",
  "%projectSelector_grouping_selection_label%",
  "%projectSelector_grouping_selection_selectedSectionHeading%",
  "%projectSelector_grouping_selection_unselectedSectionHeading%"
];
function S(t, e) {
  const a = t[e];
  if (!(typeof a != "string" || !ye(a)))
    return a;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const Nt = "recent", Wa = "other";
function Te(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const ut = "recent", Ta = "other";
function we(t) {
========
const ut = "recent", Ca = "other";
function we(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function qa(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ca(t) {
========
function ja(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  const e = t ?? {};
  return [
    Te(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (a) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        var o;
        return typeof ((o = a.customData) == null ? void 0 : o[dt.lastUsedAt]) == "number" ? Nt : Wa;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r[nt.lastUsedAt]) == "number" ? ut : Ta;
========
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r[nt.lastUsedAt]) == "number" ? ut : Ca;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      },
      getSectionHeading: (a) => a === Nt ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, o) => a.key === Nt ? -1 : o.key === Nt ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (a) => {
        var r;
        const o = (r = a.customData) == null ? void 0 : r[dt.language];
        return typeof o == "string" ? o : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (a) => {
        var r;
        const o = (r = a.customData) == null ? void 0 : r[dt.type];
        return typeof o == "string" ? o : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (a, o) => {
        var i;
        const r = o.find(
          (l) => {
            var u;
            return typeof ((u = l.customData) == null ? void 0 : u[dt.typeName]) == "string";
          }
        ), s = (i = r == null ? void 0 : r.customData) == null ? void 0 : i[dt.typeName];
        return typeof s == "string" && s.length > 0 ? s : a;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const tn = qa();
function Ya(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const To = Ca();
function ja(t) {
========
const Co = ja();
function Ga(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (a) => a === "selected" ? e.selectedSectionHeading ?? Ft : e.unselectedSectionHeading ?? Kt
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function en(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Co(t) {
========
function jo(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return {
    openTabsLabel: S(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: S(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: S(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: S(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: S(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: S(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: S(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: S(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function an(t) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function jo(t) {
========
function Go(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return {
    label: S(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const Qa = 100, _ = {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Ga = 100, za = {
========
const za = 100, La = {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  ariaLabel: "Projects & resources",
  buttonPlaceholder: "Select a project",
  commandEmptyMessage: "No projects found",
  searchPlaceholder: "Search projects & resources",
  groupByAriaLabel: "Group by",
  groupSectionLabel: "Group by",
  groupByNone: "None",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  autoOpenTabsGroupingLabel: "Open tabs",
  autoSelectionGroupingLabel: "Selection",
  autoSelectionSelectedSectionHeading: Ft,
  autoSelectionUnselectedSectionHeading: Kt,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function to(t) {
  const e = t ?? {};
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function La(t) {
  return { ...za, ...t };
}
function Go(t) {
========
function Aa(t) {
  return { ...La, ...t };
}
function zo(t) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : T(e.ariaLabel, _.ariaLabel),
    buttonPlaceholder: T(
      e.buttonPlaceholder,
      _.buttonPlaceholder
    ),
    commandEmptyMessage: T(
      e.commandEmptyMessage,
      _.commandEmptyMessage
    ),
    searchPlaceholder: T(
      e.searchPlaceholder,
      _.searchPlaceholder
    ),
    groupByAriaLabel: T(
      e.groupByAriaLabel,
      _.groupByAriaLabel
    ),
    groupSectionLabel: T(
      e.groupSectionLabel,
      _.groupSectionLabel
    ),
    groupByNone: T(
      e.groupByNone,
      _.groupByNone
    ),
    openTabsSectionHeading: T(
      e.openTabsSectionHeading,
      _.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: T(
      e.otherProjectsSectionHeading,
      _.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: T(
      e.autoOpenTabsGroupingLabel,
      _.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: T(
      e.autoSelectionGroupingLabel,
      _.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: T(
      e.autoSelectionSelectedSectionHeading,
      _.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: T(
      e.autoSelectionUnselectedSectionHeading,
      _.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: T(
      e.boundButClosedTooltip,
      _.boundButClosedTooltip
    ),
    openButtonLabel: T(
      e.openButtonLabel,
      _.openButtonLabel
    ),
    clearAll: T(e.clearAll, _.clearAll)
  };
}
function on(t) {
  return {
    searchPlaceholder: S(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: S(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: S(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: S(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: S(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: S(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: S(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: S(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: S(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: S(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: S(t, "%projectSelector_openButtonLabel%"),
    clearAll: S(t, "%projectSelector_clearAll%")
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ft(t) {
  return ma[Ve(t)] ?? String(t);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function dt(t) {
  return ta[Le(t)] ?? String(t);
========
function dt(t) {
  return ea[Ae(t)] ?? String(t);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const te = "platform.footerAction", eo = {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Ft = "platform.footerAction", Aa = {
========
const Ft = "platform.footerAction", Ra = {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ao({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = ft(t);
  return e ? /* @__PURE__ */ n(
    St,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ra({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = dt(t);
  return e ? /* @__PURE__ */ o(
    mt,
========
function Da({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = dt(t);
  return e ? /* @__PURE__ */ o(
    mt,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      style: eo,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      style: Aa,
========
      style: Ra,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      children: a
    }
  ) : /* @__PURE__ */ n(St, { variant: "secondary", children: a });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function oo({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Da({
========
function Pa({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  row: t,
  mode: e,
  strings: a,
  onClick: o,
  onOpen: r,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: u,
    open: m,
    onPointerEnter: f,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    onPointerLeave: y
  } = Ia(), [k, w] = H(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || t.isDisabled && !!t.disabledReason, v = m || k, h = X(() => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    onPointerLeave: k
  } = na(), [I, w] = K(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, v = m || I, h = q(() => {
========
    onPointerLeave: k
  } = sa(), [E, w] = V(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, x = m || E, h = q(() => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    if (g) {
      w(!0);
      return;
    }
    f();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  }, [g, f]), F = X(() => {
    w(!1), y();
  }, [y]), K = /* @__PURE__ */ n(se, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let V;
  e === "project" ? t.openGroups.length > 0 && (V = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((R) => /* @__PURE__ */ n(St, { variant: "secondary", children: ft(R) }, R)) })) : t.scrollGroupId !== void 0 && (V = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      ao,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  }, [g, f]), $ = q(() => {
    w(!1), k();
  }, [k]), J = /* @__PURE__ */ o(Xt, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let Z;
  e === "project" ? t.openGroups.length > 0 && (Z = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((A) => /* @__PURE__ */ o(mt, { variant: "secondary", children: dt(A) }, A)) })) : t.scrollGroupId !== void 0 && (Z = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Ra,
========
  }, [g, f]), U = q(() => {
    w(!1), k();
  }, [k]), X = /* @__PURE__ */ o(Xt, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let Z;
  e === "project" ? t.openGroups.length > 0 && (Z = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((I) => /* @__PURE__ */ o(mt, { variant: "secondary", children: dt(I) }, I)) })) : t.scrollGroupId !== void 0 && (Z = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Da,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    t.isBoundButClosed && r && /* @__PURE__ */ p(
      Z,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    t.isBoundButClosed && n && /* @__PURE__ */ p(
      U,
========
    t.isBoundButClosed && n && /* @__PURE__ */ p(
      H,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        onClick: (R) => {
          R.stopPropagation(), r(t);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        onClick: (A) => {
          A.stopPropagation(), n(t);
========
        onClick: (I) => {
          I.stopPropagation(), n(t);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        },
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        onMouseDown: (R) => R.stopPropagation(),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        onMouseDown: (A) => A.stopPropagation(),
========
        onMouseDown: (I) => I.stopPropagation(),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        "aria-label": a.openButtonLabel,
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          /* @__PURE__ */ n(Pe, { className: "tw:h-3 tw:w-3" }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          /* @__PURE__ */ o(Ie, { className: "tw:h-3 tw:w-3" }),
========
          /* @__PURE__ */ o(Ee, { className: "tw:h-3 tw:w-3" }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          a.openButtonLabel
        ]
      }
    )
  ] }));
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const tt = /* @__PURE__ */ p(
    Pt,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const X = /* @__PURE__ */ p(
    Tt,
========
  const $ = Se(), O = t.isDisabled && !!t.disabledReason, F = /* @__PURE__ */ p(
    Tt,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: h,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      onPointerLeave: F,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      onPointerLeave: $,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
========
      onPointerLeave: U,
      ...O && { "aria-describedby": $ },
      className: d(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: K }),
        l && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: J }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i }),
========
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: X }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        /* @__PURE__ */ p(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Je(t) && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        V
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        Z
========
        Z,
        O && /* @__PURE__ */ o("span", { id: $, hidden: !0, children: t.disabledReason })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      ]
    }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  ), A = t.scrollGroupId !== void 0 ? ft(t.scrollGroupId) : void 0, et = t.isBoundButClosed && A ? a.boundButClosedTooltip.replace("{group}", A) : void 0;
  return /* @__PURE__ */ p(Ht, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ n(Ut, { asChild: !0, children: tt }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  ), L = t.scrollGroupId !== void 0 ? dt(t.scrollGroupId) : void 0, H = t.isBoundButClosed && L ? a.boundButClosedTooltip.replace("{group}", L) : void 0;
  return /* @__PURE__ */ p(jt, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ o(Gt, { asChild: !0, children: X }),
========
  ), B = t.scrollGroupId !== void 0 ? dt(t.scrollGroupId) : void 0, N = t.isBoundButClosed && B ? a.boundButClosedTooltip.replace("{group}", B) : void 0;
  return /* @__PURE__ */ p(jt, { open: x, delayDuration: 400, children: [
    /* @__PURE__ */ o(Gt, { asChild: !0, children: F }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    /* @__PURE__ */ p(
      $t,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", dir: "auto", children: ie(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && A && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", children: t.fullName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && L && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
========
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", children: t.fullName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && B && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
              A,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
              L,
========
              B,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
              ")"
            ] })
          ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          et && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: et }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ n("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          H && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: H }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
========
          N && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: N }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const ct = "none";
function ro({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const rt = "none";
function Pa({
========
const rt = "none";
function Oa({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: o
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const r = e !== ct;
  return /* @__PURE__ */ p(ka, { children: [
    /* @__PURE__ */ p(Ht, { children: [
      /* @__PURE__ */ n(Ut, { asChild: !0, children: /* @__PURE__ */ n(Ea, { asChild: !0, children: /* @__PURE__ */ n(
        Z,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const n = e !== rt;
  return /* @__PURE__ */ p(sa, { children: [
    /* @__PURE__ */ p(jt, { children: [
      /* @__PURE__ */ o(Gt, { asChild: !0, children: /* @__PURE__ */ o(ia, { asChild: !0, children: /* @__PURE__ */ o(
        U,
========
  const n = e !== rt;
  return /* @__PURE__ */ p(ia, { children: [
    /* @__PURE__ */ p(jt, { children: [
      /* @__PURE__ */ o(Gt, { asChild: !0, children: /* @__PURE__ */ o(la, { asChild: !0, children: /* @__PURE__ */ o(
        H,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        {
          variant: "ghost",
          size: "sm",
          className: c(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            r && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": o.groupByAriaLabel,
          "aria-pressed": r,
          onMouseDown: (s) => s.preventDefault(),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          children: /* @__PURE__ */ n(Oe, { className: "tw:h-4 tw:w-4" })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          children: /* @__PURE__ */ o(ke, { className: "tw:h-4 tw:w-4" })
========
          children: /* @__PURE__ */ o(Ie, { className: "tw:h-4 tw:w-4" })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        }
      ) }) }),
      /* @__PURE__ */ n($t, { children: o.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      _a,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      la,
========
      da,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ce },
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          /* @__PURE__ */ n(La, { children: o.groupSectionLabel }),
          /* @__PURE__ */ p(Ca, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ n(qt, { value: ct, children: o.groupByNone }),
            /* @__PURE__ */ n(Aa, {}),
            t.map((s) => /* @__PURE__ */ n(qt, { value: s.id, children: s.label }, s.id))
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          /* @__PURE__ */ o(ca, { children: r.groupSectionLabel }),
          /* @__PURE__ */ p(da, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ o(Ht, { value: rt, children: r.groupByNone }),
            /* @__PURE__ */ o(ua, {}),
            t.map((s) => /* @__PURE__ */ o(Ht, { value: s.id, children: s.label }, s.id))
========
          /* @__PURE__ */ o(ua, { children: r.groupSectionLabel }),
          /* @__PURE__ */ p(ca, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ o(Ht, { value: rt, children: r.groupByNone }),
            /* @__PURE__ */ o(wa, {}),
            t.map((s) => /* @__PURE__ */ o(Ht, { value: s.id, children: s.label }, s.id))
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          ] })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function no(t, e) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Oa(t, e) {
========
function Ba(t, e) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === ct) return ct;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : ct;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function rn(t) {
  const [e, a] = H(!1), [o, r] = H(""), s = at(() => to(t.localizedStrings), [t.localizedStrings]), i = at(() => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Nt(t, e) {
  if (e === void 0) return;
  const a = P(e);
  return t.find((r) => P(r.id) === a);
}
function zo(t) {
  const [e, a] = K(!1), [r, n] = K(""), s = La(t.localizedStrings), i = Q(() => {
========
function Nt(t, e) {
  if (e === void 0) return;
  const a = D(e);
  return t.find((r) => D(r.id) === a);
}
function Lo(t) {
  const [e, a] = V(!1), [r, n] = V(""), s = Aa(t.localizedStrings), i = Q(() => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    if (t.availableGroupings !== void 0) return t.availableGroupings;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    const d = [];
    return t.openTabs.length > 0 && d.push(Te(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && d.push(
      Ya({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    const c = [];
    return t.openTabs.length > 0 && c.push(we(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && c.push(
      ja({
========
    const c = [];
    return t.openTabs.length > 0 && c.push(we(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && c.push(
      Ga({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        label: s.autoSelectionGroupingLabel,
        selectedSectionHeading: s.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: s.autoSelectionUnselectedSectionHeading
      })
    ), d;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  ]), [l, u] = H(void 0), m = at(
    () => no(i, t.defaultGrouping),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  ]), [l, u] = K(void 0), m = Q(
    () => Oa(i, t.defaultGrouping),
========
  ]), [l, u] = V(void 0), m = Q(
    () => Ba(i, t.defaultGrouping),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    [i, t.defaultGrouping]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  ), f = l ?? m, y = pt(null), [k, w] = H(void 0), g = X((d) => {
    a(d), d || (r(""), w(void 0));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  ), f = l ?? m, k = pt(null), [I, w] = K(void 0), g = q((c) => {
    a(c), c || (n(""), w(void 0));
========
  ), f = l ?? m, k = pt(null), [E, w] = V(void 0), g = q((c) => {
    a(c), c || (n(""), w(void 0));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  }, []);
  Ct(() => {
    if (!e) return;
    const d = window.requestAnimationFrame(() => {
      const b = y.current;
      b && b.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(d);
  }, [e]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const v = at(() => t.mode === "project" ? Tt({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const v = Q(() => t.mode === "project" ? bt({
========
  const x = Q(() => t.mode === "project" ? bt({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Tt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Tt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  }), [t.mode, t.projects, t.openTabs, t.selection]), h = at(() => {
    const d = o.trim().toLowerCase();
    return d ? v.filter(
      (b) => b.shortName.toLowerCase().includes(d) || (b.fullName ?? "").toLowerCase().includes(d)
    ) : v;
  }, [v, o]), F = at(
    () => new Map(t.projects.map((d) => [P(d.id), d])),
    [t.projects]
  ), K = X(
    (d) => d === void 0 ? void 0 : F.get(P(d)),
    [F]
  ), { renderProjectIndicator: V } = t, tt = X(
    (d) => V ? V(d.project) : void 0,
    [V]
  ), A = !!V, et = !!t.footerAction && h.length === 0, R = at(() => {
    if (f === ct) return Gt(h);
    const d = i.find((b) => b.id === f);
    return d ? Za(h, d) : Gt(h);
  }, [h, f, i]), x = (d) => {
    if (d.scrollGroupId !== void 0) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  }), [t.mode, t.projects, t.openTabs, t.selection]), h = Q(() => {
    const c = r.trim().toLowerCase();
    return c ? v.filter(
      (b) => b.shortName.toLowerCase().includes(c) || b.fullName.toLowerCase().includes(c)
    ) : v;
  }, [v, r]), $ = !!t.footerAction && h.length === 0, J = Q(() => {
    if (f === rt) return kt(h);
    const c = i.find((b) => b.id === f);
    return c ? _a(h, c) : kt(h);
  }, [h, f, i]), Z = (c) => {
    if (c.scrollGroupId !== void 0) {
========
  }), [t.mode, t.projects, t.openTabs, t.selection]), h = Q(() => {
    const c = r.trim().toLowerCase();
    return c ? x.filter(
      (b) => b.shortName.toLowerCase().includes(c) || b.fullName.toLowerCase().includes(c)
    ) : x;
  }, [x, r]), U = !!t.footerAction && h.length === 0, X = Q(() => {
    if (f === rt) return kt(h);
    const c = i.find((b) => b.id === f);
    return c ? Ta(h, c) : kt(h);
  }, [h, f, i]), Z = (c) => {
    if (c.scrollGroupId !== void 0) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
    }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  }, U = (d) => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  }, X = (c) => {
========
  }, $ = (c) => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: d.projectId }), a(!1);
        return;
      }
      case "project-multi": {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        const b = t.selection.pairs, z = P(d.projectId), M = (j) => P(j.projectId) === z && j.scrollGroupId === d.scrollGroupId, G = b.some(M) ? b.filter((j) => !M(j)) : [
          ...b.filter((j) => !M(j)),
          { projectId: d.projectId, scrollGroupId: d.scrollGroupId }
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        const b = t.selection.pairs, R = P(c.projectId), T = (z) => P(z.projectId) === R && z.scrollGroupId === c.scrollGroupId, G = b.some(T) ? b.filter((z) => !T(z)) : [
          ...b.filter((z) => !T(z)),
          { projectId: c.projectId, scrollGroupId: c.scrollGroupId }
========
        const b = t.selection.pairs, A = D(c.projectId), C = (L) => D(L.projectId) === A && L.scrollGroupId === c.scrollGroupId, z = b.some(C) ? b.filter((L) => !C(L)) : [
          ...b.filter((L) => !C(L)),
          { projectId: c.projectId, scrollGroupId: c.scrollGroupId }
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        ];
        t.onChangeSelection({ pairs: z });
        return;
      }
      case "projectScrollGroup": {
        if (d.isBoundButClosed && d.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(d.projectId, d.scrollGroupId), a(!1);
          return;
        }
        if (d.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: d.projectId,
            scrollGroupId: d.scrollGroupId
          }), a(!1);
          return;
        }
        const b = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: d.projectId, scrollGroupId: b }), t.onOpenProjectInGroup(d.projectId, b), a(!1);
      }
    }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  }, W = () => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  }, L = () => {
========
  }, O = () => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  }, q = t.mode === "project" ? t.renderTriggerLabel : void 0, it = t.mode === "project" ? t.triggerLabelFormat : void 0, D = at(() => {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  }, H = t.mode === "project" ? t.renderTriggerLabel : void 0, A = t.mode === "project" ? t.triggerLabelFormat : void 0, x = Q(() => {
========
  }, F = t.mode === "project" ? t.renderTriggerLabel : void 0, B = t.mode === "project" ? t.triggerLabelFormat : void 0, N = Q(() => {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    switch (t.mode) {
      case "project": {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        const d = K(t.selection.projectId);
        if (q)
          return { node: q(d), title: "", hasSelection: !!d };
        let b = d ? d.shortName : s.buttonPlaceholder;
        return d && it === "shortNameAndFullName" && (b = ie(d)), { node: b, title: b, hasSelection: !!d };
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        const c = Nt(t.projects, t.selection.projectId);
        if (H) return { node: H(c), title: "" };
        let b = c ? c.shortName : s.buttonPlaceholder;
        return c && A === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (b = `${c.shortName} - ${c.fullName}`), { node: b, title: b };
========
        const c = Nt(t.projects, t.selection.projectId);
        if (F) return { node: F(c), title: "" };
        let b = c ? c.shortName : s.buttonPlaceholder;
        return c && B === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (b = `${c.shortName} - ${c.fullName}`), { node: b, title: b };
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      }
      case "project-multi": {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        const { pairs: d } = t.selection;
        if (d.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G, hasSelection: !1 };
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G };
========
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const z = s.buttonPlaceholder;
          return { node: z, title: z };
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        }
        const b = [];
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        if (d.forEach((G) => {
          const j = K(G.projectId);
          j && b.push({ project: j, scrollGroupId: G.scrollGroupId });
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        if (c.forEach((G) => {
          const z = Nt(t.projects, G.projectId);
          z && b.push({ project: z, scrollGroupId: G.scrollGroupId });
========
        if (c.forEach((z) => {
          const L = Nt(t.projects, z.projectId);
          L && b.push({ project: L, scrollGroupId: z.scrollGroupId });
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        }), b.length === 0) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          const G = s.buttonPlaceholder;
          return { node: G, title: G, hasSelection: !1 };
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          const G = s.buttonPlaceholder;
          return { node: G, title: G };
========
          const z = s.buttonPlaceholder;
          return { node: z, title: z };
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        const z = b.map(
          ({ project: G, scrollGroupId: j }) => j === void 0 ? G.shortName : `${G.shortName} (${ft(j)})`
        ).join(", "), M = b.length.toString();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        const R = b.map(
          ({ project: G, scrollGroupId: z }) => z === void 0 ? G.shortName : `${G.shortName} (${dt(z)})`
        ).join(", "), T = b.length.toString();
========
        const A = b.map(
          ({ project: z, scrollGroupId: L }) => L === void 0 ? z.shortName : `${z.shortName} (${dt(L)})`
        ).join(", "), C = b.length.toString();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        return {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          node: /* @__PURE__ */ p(_e, { children: [
            /* @__PURE__ */ n(St, { variant: "muted", className: "tw:shrink-0", children: M }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: z })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          node: /* @__PURE__ */ p(me, { children: [
            /* @__PURE__ */ o(mt, { variant: "muted", className: "tw:shrink-0", children: T }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: R })
========
          node: /* @__PURE__ */ p(me, { children: [
            /* @__PURE__ */ o(mt, { variant: "muted", className: "tw:shrink-0", children: C }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: A })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
          ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          title: `${M} ${z}`,
          hasSelection: !0
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          title: `${T} ${R}`
========
          title: `${C} ${A}`
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        };
      }
      case "projectScrollGroup": {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        const d = K(t.selection.projectId);
        if (!d) {
          const M = s.buttonPlaceholder;
          return { node: M, title: M, hasSelection: !1 };
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        const c = Nt(t.projects, t.selection.projectId);
        if (!c) {
          const T = s.buttonPlaceholder;
          return { node: T, title: T };
========
        const c = Nt(t.projects, t.selection.projectId);
        if (!c) {
          const C = s.buttonPlaceholder;
          return { node: C, title: C };
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        }
        const b = t.selection.scrollGroupId;
        if (b === void 0)
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          return { node: d.shortName, title: d.shortName, hasSelection: !0 };
        const z = ft(b);
        return {
          node: `${d.shortName} · ${z}`,
          title: `${d.shortName} · ${z}`,
          accessibleTitle: `${d.shortName}, ${z}`,
          hasSelection: !0
        };
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          return { node: c.shortName, title: c.shortName };
        const R = `${c.shortName} · ${dt(b)}`;
        return { node: R, title: R };
========
          return { node: c.shortName, title: c.shortName };
        const A = `${c.shortName} · ${dt(b)}`;
        return { node: A, title: A };
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    K,
    t.selection,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    q,
    it,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    H,
    A,
========
    F,
    B,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    s.buttonPlaceholder
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  ]), ht = pt(null), [gt, Et] = H(!1);
  Ct(() => {
    const d = ht.current;
    if (!d) return;
    const b = (M) => {
      Et(M < Qa);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  ]), B = pt(null), [S, O] = K(!1);
  Rt(() => {
    const c = B.current;
    if (!c) return;
    const b = (T) => {
      O(T < Ga);
========
  ]), I = pt(null), [S, P] = V(!1);
  Rt(() => {
    const c = I.current;
    if (!c) return;
    const b = (C) => {
      P(C < za);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    if (b(d.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const z = new ResizeObserver((M) => {
      M.forEach((G) => {
        const [j] = G.borderBoxSize;
        b(j ? j.inlineSize : d.getBoundingClientRect().width);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    if (b(c.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const R = new ResizeObserver((T) => {
      T.forEach((G) => {
        const [z] = G.borderBoxSize;
        b(z ? z.inlineSize : c.getBoundingClientRect().width);
========
    if (b(c.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const A = new ResizeObserver((C) => {
      C.forEach((z) => {
        const [L] = z.borderBoxSize;
        b(L ? L.inlineSize : c.getBoundingClientRect().width);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      });
    });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    return z.observe(d, { box: "border-box" }), () => z.disconnect();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    return R.observe(c, { box: "border-box" }), () => R.disconnect();
========
    return A.observe(c, { box: "border-box" }), () => A.disconnect();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  }, []);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  let I;
  t.isLoading ? I = /* @__PURE__ */ n(De, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : gt ? I = void 0 : t.mode === "project-multi" ? I = /* @__PURE__ */ n(ne, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : I = /* @__PURE__ */ n(Be, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const Y = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? x : void 0, B = s.ariaLabel && D.hasSelection && D.title ? `${s.ariaLabel}: ${D.accessibleTitle ?? D.title}` : s.ariaLabel || void 0, J = /* @__PURE__ */ p(
    Z,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  let E;
  t.isLoading ? E = /* @__PURE__ */ o(Ee, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : S ? E = void 0 : t.mode === "project-multi" ? E = /* @__PURE__ */ o(Jt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : E = /* @__PURE__ */ o(_e, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const F = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? Z : void 0, ot = /* @__PURE__ */ p(
    U,
========
  let _;
  t.isLoading ? _ = /* @__PURE__ */ o(_e, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : S ? _ = void 0 : t.mode === "project-multi" ? _ = /* @__PURE__ */ o(Jt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : _ = /* @__PURE__ */ o(Te, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const K = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? Z : void 0, ot = /* @__PURE__ */ p(
    H,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      ref: ht,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      ref: B,
========
      ref: I,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": B,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: c(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        gt && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof D.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: D.node }) : D.node }),
        I
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof x.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: x.node }) : x.node }),
        E
========
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof N.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: N.node }) : N.node }),
        _
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      ]
    }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  ), bt = D.title ? /* @__PURE__ */ n(Wt, { delayDuration: 400, children: /* @__PURE__ */ p(Ht, { children: [
    /* @__PURE__ */ n(Ut, { asChild: !0, children: /* @__PURE__ */ n(zt, { asChild: !0, children: J }) }),
    /* @__PURE__ */ n($t, { dir: "auto", children: D.title })
  ] }) }) : /* @__PURE__ */ n(zt, { asChild: !0, children: J }), vt = i.length > 1;
  return /* @__PURE__ */ p(Ne, { open: e, onOpenChange: g, children: [
    bt,
    /* @__PURE__ */ n(
      Se,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  ), ct = x.title ? /* @__PURE__ */ o(Mt, { delayDuration: 400, children: /* @__PURE__ */ p(jt, { children: [
    /* @__PURE__ */ o(Gt, { asChild: !0, children: /* @__PURE__ */ o(St, { asChild: !0, children: ot }) }),
    /* @__PURE__ */ o(zt, { children: x.title })
  ] }) }) : /* @__PURE__ */ o(St, { asChild: !0, children: ot }), pe = i.length > 1;
  return /* @__PURE__ */ p(se, { open: e, onOpenChange: g, children: [
    ct,
    /* @__PURE__ */ o(
      le,
========
  ), ct = N.title ? /* @__PURE__ */ o(Mt, { delayDuration: 400, children: /* @__PURE__ */ p(jt, { children: [
    /* @__PURE__ */ o(Gt, { asChild: !0, children: /* @__PURE__ */ o(St, { asChild: !0, children: ot }) }),
    /* @__PURE__ */ o(zt, { children: N.title })
  ] }) }) : /* @__PURE__ */ o(St, { asChild: !0, children: ot }), pe = i.length > 1;
  return /* @__PURE__ */ p(se, { open: e, onOpenChange: g, children: [
    ct,
    /* @__PURE__ */ o(
      le,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ n(Wt, { delayDuration: 400, children: /* @__PURE__ */ p(
          pe,
          {
            shouldFilter: !1,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
            value: et ? k ?? te : void 0,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
            value: $ ? I ?? Ft : void 0,
========
            value: U ? E ?? Ft : void 0,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
            onValueChange: w,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
                  me,
                  {
                    value: o,
                    onValueChange: r,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
                vt && /* @__PURE__ */ n(
                  ro,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
                pe && /* @__PURE__ */ o(
                  Pa,
========
                pe && /* @__PURE__ */ o(
                  Oa,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
                  {
                    availableGroupings: i,
                    activeGrouping: f,
                    onChangeGrouping: u,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
              /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ n(Z, { variant: "ghost", size: "sm", onClick: W, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(fe, { children: [
                /* @__PURE__ */ n(he, { children: s.commandEmptyMessage }),
                R.map((d, b) => (
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(U, { variant: "ghost", size: "sm", onClick: L, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(ae, { children: [
                /* @__PURE__ */ o(re, { children: s.commandEmptyMessage }),
                J.map((c, b) => (
========
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(H, { variant: "ghost", size: "sm", onClick: O, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(ae, { children: [
                /* @__PURE__ */ o(re, { children: s.commandEmptyMessage }),
                X.map((c, b) => (
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    je,
                    {
                      children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
                        /* @__PURE__ */ n(ge, { heading: so(d, s), children: d.rows.map((z) => /* @__PURE__ */ n(
                          oo,
                          {
                            row: z,
                            mode: t.mode,
                            strings: s,
                            onClick: U,
                            onOpen: Y,
                            selectedRowRef: y,
                            indicator: tt(z),
                            reserveIndicatorSlot: A
                          },
                          z.rowKey
                        )) }),
                        b < R.length - 1 && /* @__PURE__ */ n(Jt, { alwaysRender: !0 })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
                        /* @__PURE__ */ o(oe, { heading: Ba(c, s), children: c.rows.map((R) => {
                          var T;
                          return /* @__PURE__ */ o(
                            Da,
                            {
                              row: R,
                              mode: t.mode,
                              strings: s,
                              onClick: X,
                              onOpen: F,
                              selectedRowRef: k,
                              indicator: (T = t.renderProjectIndicator) == null ? void 0 : T.call(t, R.project),
                              reserveIndicatorSlot: !!t.renderProjectIndicator
                            },
                            R.rowKey
                          );
                        }) }),
                        b < J.length - 1 && /* @__PURE__ */ o(Pt, { alwaysRender: !0 })
========
                        /* @__PURE__ */ o(oe, { heading: Ma(c, s), children: c.rows.map((A) => {
                          var C;
                          return /* @__PURE__ */ o(
                            Pa,
                            {
                              row: A,
                              mode: t.mode,
                              strings: s,
                              onClick: $,
                              onOpen: K,
                              selectedRowRef: k,
                              indicator: (C = t.renderProjectIndicator) == null ? void 0 : C.call(t, A.project),
                              reserveIndicatorSlot: !!t.renderProjectIndicator
                            },
                            A.rowKey
                          );
                        }) }),
                        b < X.length - 1 && /* @__PURE__ */ o(Pt, { alwaysRender: !0 })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
                      ]
                    },
                    `${d.kind}:${d.groupingId ?? ""}:${d.key ?? d.label ?? ""}`
                  )
                )),
                t.footerAction && // Stuck to the bottom of the scroll box rather than merely last in it. The footer
                // is the list's escape hatch, and `CommandList` is `max-h-72 overflow-y-auto`, so
                // as a plain last child it scrolls out of reach on any list long enough to need
                // it — which is the state a user is most likely to be looking for it in. It stays
                // INSIDE `CommandList` because that is the subtree cmdk's `getValidItems()` walks
                // for arrow-key, Home/End and Enter navigation; moving it out would make it
                // pointer-only. Opaque background so rows scroll behind it rather than through it.
                // `role="presentation"` because this wrapper exists only to position the row:
                // without it the div breaks `CommandList`'s `role="listbox"` ownership of the
                // footer's `role="option"`, and some assistive tech stops counting the footer in
                // "1 of N".
                /* @__PURE__ */ p("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  h.length > 0 && /* @__PURE__ */ n(
                    Jt,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    Pt,
                    {
                      forceMount: !0,
                      value: te,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var d;
                        (d = t.footerAction) == null || d.onSelect(), g(!1);
                      },
                      children: [
                        /* @__PURE__ */ n(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        !!t.renderProjectIndicator && /* @__PURE__ */ n(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: t.footerAction.label })
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function so(t, e) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ba(t, e) {
========
function Ma(t, e) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "grouping":
      return t.label;
    case "flat":
    default:
      return;
  }
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const io = re(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: o, className: r, isDisabled: s = !1, id: i }, l) => {
    const u = $();
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Ma = Vt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: s = !1, id: i }, l) => {
    const u = M();
========
const Ha = Vt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: s = !1, id: i }, l) => {
    const u = M();
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: c("tw:relative tw:@container/search", { "tw:w-full": o }, r),
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          /* @__PURE__ */ n(
            Me,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          /* @__PURE__ */ o(
            Te,
========
          /* @__PURE__ */ o(
            Ce,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
          /* @__PURE__ */ n(
            sa,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
          /* @__PURE__ */ o(
            Ve,
========
          /* @__PURE__ */ o(
            Je,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
            {
              ref: l,
              className: c(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: (m) => e(m.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ p(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
            Z,
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
            U,
========
            H,
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
            {
              variant: "ghost",
              size: "icon",
              className: c(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": u === "rtl" },
                { "tw:right-0": u === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
                /* @__PURE__ */ n(He, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
                /* @__PURE__ */ o(Ce, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
========
                /* @__PURE__ */ o(je, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
              ]
            }
          )
        ]
      }
    );
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
io.displayName = "SearchBar";
const lo = 5;
function nn(t) {
  return pa(t).filter(
    (e) => !L.isObsolete(L.bookIdToNumber(e))
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
Ma.displayName = "SearchBar";
const Ha = 5;
function Lo(t) {
  return Qe(t).filter(
    (e) => !j.isObsolete(j.bookIdToNumber(e))
========
Ha.displayName = "SearchBar";
const Ua = 5;
function Ao(t) {
  return ta(t).filter(
    (e) => !G.isObsolete(G.bookIdToNumber(e))
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function co(t, e) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ua(t, e) {
========
function $a(t, e) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return t.filter((a) => {
    try {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
      return Xe(a) === e;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
      return Ae(a) === e;
========
      return Re(a) === e;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    } catch {
      return !1;
    }
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const sn = (t, e, a) => co(t, e).every((o) => a.includes(o));
function uo(t, e) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Ao = (t, e, a) => Ua(t, e).every((r) => a.includes(r));
function $a(t, e) {
========
const Ro = (t, e, a) => $a(t, e).every((r) => a.includes(r));
function Fa(t, e) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  return [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    ...new Set(t.map((o) => o.toUpperCase()))
  ].filter((o) => L.bookIdToNumber(o) > 0).sort((o, r) => L.bookIdToNumber(o) - L.bookIdToNumber(r)).map((o) => fa(o, e));
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => j.bookIdToNumber(r) > 0).sort((r, n) => j.bookIdToNumber(r) - j.bookIdToNumber(n)).map((r) => ea(r, e));
========
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => G.bookIdToNumber(r) > 0).sort((r, n) => G.bookIdToNumber(r) - G.bookIdToNumber(n)).map((r) => aa(r, e));
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ln(t, e, a, o) {
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ro(t, e, a, r) {
========
function Do(t, e, a, r) {
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (t.length === 0) return;
  const r = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === r.size && [...s].every((l) => r.has(l)))
    return a;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  const i = uo(t, o);
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  const i = $a(t, r);
========
  const i = Fa(t, r);
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  if (i.length !== 0)
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    return i.length <= lo ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    return i.length <= Ha ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
========
    return i.length <= Ua ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function cn({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Do({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ o(
========
function Po({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "p",
    {
      role: "status",
      "data-testid": e,
      className: c("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function wo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Fa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ka({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "empty",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function po({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ka({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Va({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "empty-header",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const mo = ot(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Va = W(
========
const Ja = W(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  "tw:mb-2 tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        icon: "tw:flex tw:size-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:text-foreground tw:[&_svg:not([class*=size-])]:size-4"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function fo({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ja({
========
function Xa({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        mo({ variant: e }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        Va({ variant: e }),
========
        Ja({ variant: e }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function dn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Po({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Oo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "empty-title",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function ho({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Xa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function qa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "empty-description",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function go({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function qa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Wa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "empty-content",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function un({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Oo({
========
function Bo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: o,
  role: r = "alert",
  className: s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  return /* @__PURE__ */ p(wo, { className: c(s), role: r, children: [
    /* @__PURE__ */ p(po, { children: [
      /* @__PURE__ */ n(fo, { variant: "icon", children: o ?? /* @__PURE__ */ n(Ue, {}) }),
      /* @__PURE__ */ n(ho, { children: t })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  return /* @__PURE__ */ p(Fa, { className: d(s), role: n, children: [
    /* @__PURE__ */ p(Ka, { children: [
      /* @__PURE__ */ o(Ja, { variant: "icon", children: r ?? /* @__PURE__ */ o(je, {}) }),
      /* @__PURE__ */ o(Xa, { children: t })
========
  return /* @__PURE__ */ p(Ka, { className: d(s), role: n, children: [
    /* @__PURE__ */ p(Va, { children: [
      /* @__PURE__ */ o(Xa, { variant: "icon", children: r ?? /* @__PURE__ */ o(Ge, {}) }),
      /* @__PURE__ */ o(qa, { children: t })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
    a && /* @__PURE__ */ n(go, { children: /* @__PURE__ */ n(Z, { onClick: () => a(), children: e }) })
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
    a && /* @__PURE__ */ o(qa, { children: /* @__PURE__ */ o(U, { onClick: () => a(), children: e }) })
========
    a && /* @__PURE__ */ o(Wa, { children: /* @__PURE__ */ o(H, { onClick: () => a(), children: e }) })
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
const bo = re(({ className: t, ...e }, a) => /* @__PURE__ */ n($e, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
bo.displayName = "Spinner";
const vo = ot(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
const Wa = Vt(({ className: t, ...e }, a) => /* @__PURE__ */ o(Ge, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
Wa.displayName = "Spinner";
const Za = W(
========
const Za = Vt(({ className: t, ...e }, a) => /* @__PURE__ */ o(ze, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
Za.displayName = "Spinner";
const Ya = W(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  // CUSTOM: Added img arbitrary selectors alongside existing svg selectors so that <img> elements
  // (or SVGs loaded from file) can be used as icons in the same position as inline <svg> icons.
  // Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.
  // Note: the new shadcn baseline changed the layout model significantly (grid + data-slot).
  // The svg selectors are now *:[svg]:... style. We add equivalent *:[img]:... selectors.
  "tw:group/alert tw:relative tw:grid tw:w-full tw:gap-0.5 tw:rounded-lg tw:border tw:px-2.5 tw:py-2 tw:text-start tw:text-sm tw:has-data-[slot=alert-action]:relative tw:has-data-[slot=alert-action]:pe-18 tw:has-[>svg]:grid-cols-[auto_1fr] tw:has-[>svg]:gap-x-2 tw:*:[svg]:row-span-2 tw:*:[svg]:translate-y-0.5 tw:*:[svg]:text-current tw:*:[svg:not([class*=size-])]:size-4 tw:has-[>img]:grid-cols-[auto_1fr] tw:has-[>img]:gap-x-2 tw:*:[img]:row-span-2 tw:*:[img]:translate-y-0.5 tw:*:[img]:text-current tw:*:[img:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-card tw:text-card-foreground",
        destructive: (
          // CUSTOM: Added tw:*:[img]:text-current alongside existing svg selector so that <img>
          // elements (or SVGs from file) display destructive color in the destructive variant.
          // Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.
          "tw:bg-card tw:text-destructive tw:*:data-[slot=alert-description]:text-destructive/90 tw:*:[svg]:text-current tw:*:[img]:text-current"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function wn({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Bo({
========
function Mo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
        vo({ variant: e }),
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
        Za({ variant: e }),
========
        Ya({ variant: e }),
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function pn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Mo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ho({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "alert-title",
      className: c(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function mn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Ho({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Uo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
    "div",
    {
      "data-slot": "alert-description",
      className: c(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function fn({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Uo({
========
function $o({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: o,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ot.Group,
    {
      "data-slot": "resizable-panel-group",
      className: c(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...r
    }
  );
}
function xt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function hn({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function $o({
========
function Fo({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: o,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ot.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: xt(t),
      minSize: xt(e),
      maxSize: xt(a),
      collapsedSize: xt(o),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
function gn({
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
function Fo({
========
function Ko({
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    Ot.Separator,
    {
      "data-slot": "resizable-handle",
      className: c(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
  Aa as $,
  or as A,
  Z as B,
  Pt as C,
  ka as D,
  ur as E,
  pr as F,
  fe as G,
  he as H,
  Yo as I,
  Lr as J,
  zr as K,
  nr as L,
  Mo as M,
  $o as N,
  Fo as O,
  Ne as P,
  Vo as Q,
  Ar as R,
  Gr as S,
  Wt as T,
  jr as U,
  Rr as V,
  St as W,
  ga as X,
  Dr as Y,
  Pr as Z,
  hr as _,
  fa as a,
  cn as a$,
  kr as a0,
  le as a1,
  $r as a2,
  Kr as a3,
  Br as a4,
  Mr as a5,
  Fr as a6,
  Hr as a7,
  yr as a8,
  Ca as a9,
  _r as aA,
  Sr as aB,
  Cr as aC,
  lr as aD,
  Ie as aE,
  It as aF,
  kt as aG,
  ia as aH,
  ca as aI,
  wn as aJ,
  mn as aK,
  pn as aL,
  wr as aM,
  va as aN,
  Na as aO,
  fr as aP,
  mr as aQ,
  Uo as aR,
  Jo as aS,
  na as aT,
  ra as aU,
  Ho as aV,
  wo as aW,
  go as aX,
  ho as aY,
  po as aZ,
  fo as a_,
  qt as aa,
  Jr as ab,
  qr as ac,
  ce as ad,
  sa as ae,
  ut as af,
  Jt as ag,
  Xo as ah,
  Wr as ai,
  Xr as aj,
  Zr as ak,
  br as al,
  Ua as am,
  rn as an,
  io as ao,
  nn as ap,
  co as aq,
  er as ar,
  sn as as,
  gr as at,
  Ko as au,
  ma as av,
  dr as aw,
  cr as ax,
  Er as ay,
  Tr as az,
  Ht as b,
  dn as b0,
  Yr as b1,
  xa as b2,
  xr as b3,
  vr as b4,
  Nr as b5,
  gn as b6,
  hn as b7,
  fn as b8,
  un as b9,
  Ha as bA,
  Ka as bB,
  qa as bC,
  Ya as bD,
  Bo as bE,
  ln as bF,
  bo as ba,
  Vr as bb,
  Ur as bc,
  Do as bd,
  Po as be,
  aa as bf,
  ea as bg,
  Ro as bh,
  jo as bi,
  Oo as bj,
  Go as bk,
  Ra as bl,
  ba as bm,
  de as bn,
  Or as bo,
  Bt as bp,
  Ba as bq,
  Qo as br,
  ct as bs,
  _ as bt,
  Qr as bu,
  oa as bv,
  en as bw,
  on as bx,
  an as by,
  tn as bz,
  c,
  Ut as d,
  $t as e,
  ir as f,
  ar as g,
  Ea as h,
  _a as i,
  La as j,
  Ir as k,
  Wo as l,
  qo as m,
  rr as n,
  ge as o,
  $ as p,
  wa as q,
  T as r,
  tr as s,
  sr as t,
  Ia as u,
  zt as v,
  Se as w,
  Zo as x,
  pe as y,
  me as z
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
  qt as $,
  Lr as A,
  U as B,
  Tt as C,
  sa as D,
  $r as E,
  ae as F,
  re as G,
  ro as H,
  Tr as I,
  no as J,
  hr as K,
  Rr as L,
  Nr as M,
  vr as N,
  yr as O,
  se as P,
  so as Q,
  oo as R,
  io as S,
  Mt as T,
  lo as U,
  mt as V,
  ra as W,
  wo as X,
  uo as Y,
  ua as Z,
  Yr as _,
  ea as a,
  Fo as a$,
  go as a0,
  No as a1,
  po as a2,
  mo as a3,
  bo as a4,
  fo as a5,
  Wr as a6,
  da as a7,
  Ht as a8,
  xo as a9,
  ao as aA,
  Or as aB,
  de as aC,
  ht as aD,
  gt as aE,
  Je as aF,
  qe as aG,
  Bo as aH,
  Ho as aI,
  Mo as aJ,
  Ur as aK,
  br as aL,
  Sr as aM,
  Ke as aN,
  Fe as aO,
  gr as aP,
  Fa as aQ,
  qa as aR,
  Xa as aS,
  Ka as aT,
  Ja as aU,
  Do as aV,
  Po as aW,
  Eo as aX,
  Xr as aY,
  Vr as aZ,
  Jr as a_,
  Io as aa,
  Wt as ab,
  Ve as ac,
  st as ad,
  Pt as ae,
  kr as af,
  ko as ag,
  yo as ah,
  So as ai,
  Kr as aj,
  va as ak,
  zo as al,
  Ma as am,
  Lo as an,
  Ua as ao,
  Gr as ap,
  Ao as aq,
  Fr as ar,
  xr as as,
  ta as at,
  Mr as au,
  Br as av,
  Qr as aw,
  to as ax,
  eo as ay,
  qr as az,
  jt as b,
  $o as b0,
  Uo as b1,
  Oo as b2,
  Wa as b3,
  vo as b4,
  ho as b5,
  mr as b6,
  pr as b7,
  Ue as b8,
  He as b9,
  wr as ba,
  ur as bb,
  fa as bc,
  oa as bd,
  Zt as be,
  co as bf,
  Cr as bg,
  rt as bh,
  za as bi,
  _o as bj,
  $e as bk,
  Co as bl,
  Go as bm,
  jo as bn,
  To as bo,
  Na as bp,
  Sa as bq,
  Ca as br,
  ja as bs,
  fr as bt,
  Ro as bu,
  d as c,
  Gt as d,
  zt as e,
  Pr as f,
  zr as g,
  ia as h,
  la as i,
  ca as j,
  Zr as k,
  Er as l,
  _r as m,
  Ar as n,
  oe as o,
  Ye as p,
  jr as q,
  M as r,
  St as s,
  Dr as t,
  na as u,
  le as v,
  te as w,
  Ir as x,
  ee as y,
  Hr as z
========
  qt as $,
  Ar as A,
  H as B,
  Tt as C,
  ia as D,
  Fr as E,
  ae as F,
  re as G,
  oo as H,
  Cr as I,
  so as J,
  gr as K,
  Dr as L,
  vr as M,
  xr as N,
  Sr as O,
  se as P,
  io as Q,
  no as R,
  lo as S,
  Mt as T,
  co as U,
  mt as V,
  oa as W,
  po as X,
  wo as Y,
  wa as Z,
  Qr as _,
  aa as a,
  Ko as a$,
  bo as a0,
  vo as a1,
  mo as a2,
  fo as a3,
  No as a4,
  ho as a5,
  Zr as a6,
  ca as a7,
  Ht as a8,
  yo as a9,
  ro as aA,
  Br as aB,
  de as aC,
  ht as aD,
  gt as aE,
  Xe as aF,
  We as aG,
  Mo as aH,
  Uo as aI,
  Ho as aJ,
  $r as aK,
  Nr as aL,
  kr as aM,
  Ve as aN,
  Ke as aO,
  br as aP,
  Ka as aQ,
  Wa as aR,
  qa as aS,
  Va as aT,
  Xa as aU,
  Po as aV,
  Oo as aW,
  _o as aX,
  qr as aY,
  Jr as aZ,
  Xr as a_,
  Eo as aa,
  Wt as ab,
  Je as ac,
  st as ad,
  Pt as ae,
  Ir as af,
  Io as ag,
  So as ah,
  ko as ai,
  Vr as aj,
  xa as ak,
  Lo as al,
  Ha as am,
  Ao as an,
  $a as ao,
  zr as ap,
  Ro as aq,
  Kr as ar,
  yr as as,
  ea as at,
  Hr as au,
  Mr as av,
  to as aw,
  eo as ax,
  ao as ay,
  Wr as az,
  jt as b,
  Fo as b0,
  $o as b1,
  Bo as b2,
  Za as b3,
  xo as b4,
  go as b5,
  fr as b6,
  mr as b7,
  $e as b8,
  Ue as b9,
  pr as ba,
  wr as bb,
  ha as bc,
  na as bd,
  Zt as be,
  uo as bf,
  jr as bg,
  rt as bh,
  La as bi,
  To as bj,
  Fe as bk,
  jo as bl,
  zo as bm,
  Go as bn,
  Co as bo,
  va as bp,
  ka as bq,
  ja as br,
  Ga as bs,
  hr as bt,
  Do as bu,
  d as c,
  Gt as d,
  zt as e,
  Or as f,
  Lr as g,
  la as h,
  da as i,
  ua as j,
  Yr as k,
  _r as l,
  Tr as m,
  Rr as n,
  oe as o,
  Qe as p,
  Gr as q,
  M as r,
  St as s,
  Pr as t,
  sa as u,
  le as v,
  te as w,
  Er as x,
  ee as y,
  Ur as z
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DkL8u4EZ.js
//# sourceMappingURL=resizable-DkL8u4EZ.js.map
|||||||| parent of f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-39QAMVZg.js
//# sourceMappingURL=resizable-39QAMVZg.js.map
========
//# sourceMappingURL=resizable-CQdYh5sP.js.map
>>>>>>>> f41d0fc024b (PT-4731: Address review of the Biblica license notice):lib/platform-bible-react/dist/resizable-CQdYh5sP.js
