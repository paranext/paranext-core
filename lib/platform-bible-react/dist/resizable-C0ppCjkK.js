<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
import { jsx as o, jsxs as p, Fragment as pe } from "react/jsx-runtime";
import { Slot as It, Dialog as V, Separator as me, Popover as it, Tooltip as at, DropdownMenu as _, Label as fe, RadioGroup as vt, ToggleGroup as Kt } from "radix-ui";
import { IconX as he, IconCheck as Et, IconSearch as ge, IconChevronRight as be } from "@tabler/icons-react";
import { Canon as j } from "@sillsdev/scripture";
import { cva as W } from "class-variance-authority";
import C, { useState as K, useRef as pt, useCallback as q, createContext as Ne, useContext as ve, useMemo as Q, useEffect as Rt, Fragment as xe, forwardRef as Vt } from "react";
import { ChevronsUpDown as Jt, Check as Xt, Star as ye, Group as Se, ArrowRight as ke, Loader2 as Ie, ChevronDown as Ee, Search as _e, X as Te, AlertTriangle as Ce, LoaderCircle as je } from "lucide-react";
import { Section as Y, MODIFIER_KEYS as Ge, normalizeProjectId as P, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as nt, getLocalizeKeyForScrollGroupId as ze, getSectionForBook as Le } from "platform-bible-utils";
import { filterAndRankItems as Dt } from "@eten-tech-foundation/platform-editor";
import { Command as et } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as _t from "react-resizable-panels";
import { clsx as Ae } from "clsx";
import { extendTailwindMerge as Re, twMerge as De } from "tailwind-merge";
const Pe = Re({ prefix: "tw" });
function xt(t) {
========
import { jsx as n, jsxs as m, Fragment as ie } from "react/jsx-runtime";
import { Slot as xt, Dialog as K, Separator as le, Popover as ot, Tooltip as tt, DropdownMenu as C, Label as de, RadioGroup as ht, ToggleGroup as Ot } from "radix-ui";
import { IconX as ce, IconCheck as yt, IconSearch as ue, IconChevronRight as we } from "@tabler/icons-react";
import { Canon as z } from "@sillsdev/scripture";
import { cva as X } from "class-variance-authority";
import G, { useState as J, useRef as dt, useCallback as V, createContext as pe, useContext as me, useMemo as Z, useEffect as Gt, Fragment as fe, forwardRef as Bt } from "react";
import { ChevronsUpDown as Mt, Check as Ht, Star as he, Group as ge, ArrowRight as be, Loader2 as Ne, ChevronDown as ve, Search as xe, X as ye, AlertTriangle as Se, LoaderCircle as ke } from "lucide-react";
import { Section as W, MODIFIER_KEYS as Ie, normalizeProjectId as D, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as at, getLocalizeKeyForScrollGroupId as Ee, getSectionForBook as _e } from "platform-bible-utils";
import { filterAndRankItems as zt } from "@eten-tech-foundation/platform-editor";
import { Command as Q } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as St from "react-resizable-panels";
import { clsx as Te } from "clsx";
import { extendTailwindMerge as Ce, twMerge as Ge } from "tailwind-merge";
const ze = Ce({ prefix: "tw" });
function gt(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  const e = [];
  let a = "", r = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Oe(t) {
========
function je(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = xt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== r), `!${s}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const s = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Be(t, e) {
========
function Le(t, e) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (e.startsWith("tw:"))
    return t;
  const a = xt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), n = a[a.length - 1], s = xt(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
  if (i && n.startsWith("-")) {
    const u = n.slice(1);
    return [...r, `-tw-${u}`].join(":");
  }
  if (l && n.startsWith("!")) {
    const u = n.slice(1);
    return [...r, `!tw-${u}`].join(":");
  }
  return [...r, `tw-${n}`].join(":");
}
function d(...t) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  const e = Ae(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Pe(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
  return a.forEach((u) => {
    const m = Oe(u);
    r.set(m.normalized, m.original), n.push(m.normalized);
  }), De(n.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = r.get(u);
    return m ? Be(u, m) : u;
  }).join(" ");
}
const qt = 600, Wt = 650, cr = 400, Me = 450, He = 500, Ue = 675, ur = 690, wr = 700, pr = 800, Zt = W(
========
  const e = Te(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return ze(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((u) => {
    const f = je(u);
    r.set(f.normalized, f.original), o.push(f.normalized);
  }), Ge(o.join(" ")).split(" ").filter(Boolean).map((u) => {
    const f = r.get(u);
    return f ? Le(u, f) : u;
  }).join(" ");
}
const Ut = 600, $t = 650, nr = 400, Ae = 450, Re = 500, De = 675, sr = 690, ir = 700, lr = 800, Kt = X(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
function U({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...n
}) {
  const s = r ? It.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: d(Zt({ variant: e, size: a, className: t })),
      ...n
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const Yt = "layoutDirection";
function M() {
  const t = localStorage.getItem(Yt);
  return t === "rtl" ? t : "ltr";
}
function mr(t) {
  localStorage.setItem(Yt, t);
}
function fr({ ...t }) {
  return /* @__PURE__ */ o(V.Root, { "data-slot": "dialog", ...t });
}
function hr({ ...t }) {
  return /* @__PURE__ */ o(V.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function $e({ ...t }) {
  return /* @__PURE__ */ o(V.Portal, { "data-slot": "dialog-portal", ...t });
}
function gr({ ...t }) {
  return /* @__PURE__ */ o(V.Close, { "data-slot": "dialog-close", ...t });
}
function Fe({
========
const Ft = "layoutDirection";
function Jt() {
  return globalThis.localStorage ?? void 0;
}
function M() {
  var t;
  try {
    const e = (t = Jt()) == null ? void 0 : t.getItem(Ft);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function dr(t) {
  var e;
  try {
    (e = Jt()) == null || e.setItem(Ft, t);
  } catch {
  }
}
function cr({ ...t }) {
  return /* @__PURE__ */ n(K.Root, { "data-slot": "dialog", ...t });
}
function ur({ ...t }) {
  return /* @__PURE__ */ n(K.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Pe({ ...t }) {
  return /* @__PURE__ */ n(K.Portal, { "data-slot": "dialog-portal", ...t });
}
function wr({ ...t }) {
  return /* @__PURE__ */ n(K.Close, { "data-slot": "dialog-close", ...t });
}
function Oe({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    V.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: d(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
      style: { zIndex: Me, ...e },
========
      style: { zIndex: Ae, ...e },
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function br({
========
function pr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...s
}) {
  const i = M();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  return /* @__PURE__ */ p($e, { children: [
    /* @__PURE__ */ o(Fe, { className: r }),
    /* @__PURE__ */ p(
      V.Content,
========
  return /* @__PURE__ */ m(Pe, { children: [
    /* @__PURE__ */ n(Oe, { className: r }),
    /* @__PURE__ */ m(
      K.Content,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      {
        "data-slot": "dialog-content",
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        style: { zIndex: He, ...n },
========
        style: { zIndex: Re, ...o },
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        dir: i,
        ...s,
        children: [
          e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
          a && /* @__PURE__ */ o(V.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(U, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(he, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
========
          a && /* @__PURE__ */ n(K.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(H, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(ce, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
          ] }) })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Nr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function mr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "dialog-header",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function vr({
========
function fr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dialog-footer",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ o(V.Close, { asChild: !0, children: /* @__PURE__ */ o(U, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    V.Title,
========
function hr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    K.Title,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "dialog-title",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function yr({
========
function gr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    V.Description,
    {
      "data-slot": "dialog-description",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ke({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ o(
========
function Be({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "input",
    {
      type: e,
      "data-slot": "input",
      className: d(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ve({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Me({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const Je = W(
========
const He = X(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Xe({
========
function Ue({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
    /* @__PURE__ */ o(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        className: d(Je({ align: e }), t),
========
        className: d(He({ align: e }), t),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        onClick: (r) => {
          var n, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
W("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Qt({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    et,
========
function Vt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Q,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "command",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function te({
========
function Xt({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const n = M(), s = C.useCallback(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ p(Ve, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        et.Input,
========
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ m(Me, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        Q.Input,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        {
          "data-slot": "command-input",
          className: d(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...r
        }
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
      /* @__PURE__ */ o(Xe, { children: /* @__PURE__ */ o(ge, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function ee({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    et.List,
========
      /* @__PURE__ */ n(Ue, { children: /* @__PURE__ */ n(ue, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function qt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Q.List,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "command-list",
      className: d(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ae({
========
function Wt({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    et.Empty,
    {
      "data-slot": "command-empty",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function re({
========
function Zt({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    et.Group,
    {
      "data-slot": "command-group",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Pt({
========
function $e({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    et.Separator,
    {
      "data-slot": "command-separator",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Tt({
========
function Yt({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    et.Item,
    {
      "data-slot": "command-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ o(Et, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function br({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "span",
    {
      "data-slot": "command-shortcut",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const qe = [
========
const Ke = [
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
], We = (t) => {
  var e;
  return ((e = qe[t]) == null ? void 0 : e.chapters) ?? -1;
}, Ze = j.allBookIds.filter(
  (t) => !j.isObsolete(j.bookIdToNumber(t))
);
function Ye(t) {
  const e = [], a = Math.min(t.length, j.allBookIds.length);
========
], Fe = (t) => {
  var e;
  return ((e = Ke[t]) == null ? void 0 : e.chapters) ?? -1;
}, Je = z.allBookIds.filter(
  (t) => !z.isObsolete(z.bookIdToNumber(t))
);
function Ve(t) {
  const e = [], a = Math.min(t.length, z.allBookIds.length);
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(j.bookNumberToId(r + 1));
  return e;
}
function N(t) {
  return `%scrollGroup_${t}%`;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const Qe = {
========
const Xe = {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ct(t, e) {
  return We(j.bookIdToNumber(t));
========
function kt(t, e) {
  return Fe(z.bookIdToNumber(t));
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
}
function ft(t, e, a) {
  const r = j.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = j.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (n = i, s = l);
  }), n;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function kr(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const s = ft(r, e, "previous");
========
function Nr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = ut(r, e, "previous");
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Ct(s), 1),
      verseNum: 1
    };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ir(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < Ct(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const s = ft(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Er(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
========
function vr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < kt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = ut(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function xr(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
  if (e === void 0) return;
  const i = ft(r, e, "previous");
  if (!i) return;
  const l = Math.max(Ct(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function _r(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
========
function yr(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: s + 1 };
  const i = ft(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Tr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Cr = (t, e, a, r, n) => {
========
function Sr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const kr = (t, e, a, r, o) => {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  switch (t) {
    case Y.OT:
      return e ?? "Old Testament";
    case Y.NT:
      return a ?? "New Testament";
    case Y.DC:
      return r ?? "Deuterocanon";
    case Y.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
}, jr = (t, e, a, r, n) => {
========
}, Ir = (t, e, a, r, o) => {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  switch (t) {
    case Y.OT:
      return e ?? "OT";
    case Y.NT:
      return a ?? "NT";
    case Y.DC:
      return r ?? "DC";
    case Y.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Gr(t, e) {
========
function Er(t, e) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? j.bookIdToEnglishName(t);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ta(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const zr = Object.fromEntries(
  Ze.map((t) => [t, j.bookIdToEnglishName(t)])
);
function Lr(t, e, a) {
========
function qe(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const _r = Object.fromEntries(
  Je.map((t) => [t, z.bookIdToEnglishName(t)])
);
function Tr(t, e, a) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = j.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
const Ot = `
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ea(t) {
========
function We(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function lt(t, e) {
  const a = e ? `${Ot}, ${e}` : Ot;
  return Array.from(t.querySelectorAll(a)).filter(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && ea(r)
  );
}
const Ar = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let yt = "keyboard", Bt = !1;
function Rr() {
  Bt || typeof document > "u" || (Bt = !0, document.addEventListener(
========
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && We(r)
  );
}
const Cr = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let bt = "keyboard", Lt = !1;
function Gr() {
  Lt || typeof document > "u" || (Lt = !0, document.addEventListener(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "pointerdown",
    () => {
      yt = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      yt = "keyboard";
    },
    !0
  ));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Dr() {
  return yt;
}
const oe = "data-quiet-focus";
function Pr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(oe, ""), t.style.outline = "none"));
}
function Or(t) {
  t && (t.removeAttribute(oe), t.style.removeProperty("outline"));
}
const Br = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function aa({
========
function zr() {
  return bt;
}
const Qt = "data-quiet-focus";
function jr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Qt, ""), t.style.outline = "none"));
}
function Lr(t) {
  t && (t.removeAttribute(Qt), t.style.removeProperty("outline"));
}
const Ar = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function Ze({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  return /* @__PURE__ */ o(
    me.Root,
========
  return /* @__PURE__ */ n(
    le.Root,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const ra = W(
========
const Ye = X(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Mr({
========
function Rr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  orientation: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        ra({ orientation: e }),
========
        Ye({ orientation: e }),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Hr({
========
function Dr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? It.Root : "div";
  return /* @__PURE__ */ o(
    r,
    {
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ur({
========
function Pr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  orientation: e = "vertical",
  ...a
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  return /* @__PURE__ */ o(
    aa,
========
  return /* @__PURE__ */ n(
    Ze,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ne({ ...t }) {
  return /* @__PURE__ */ o(it.Root, { "data-slot": "popover", ...t });
========
function te({ ...t }) {
  return /* @__PURE__ */ n(ot.Root, { "data-slot": "popover", ...t });
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
}
function St({ ...t }) {
  return /* @__PURE__ */ o(it.Trigger, { "data-slot": "popover-trigger", ...t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const se = C.createContext(null);
function $r({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ o(se.Provider, { value: t, children: e });
}
function ie({
========
const ee = G.createContext(null);
function Or({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(ee.Provider, { value: t, children: e });
}
function ae({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...n
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  const s = M(), i = C.useContext(se);
========
  const s = M(), i = G.useContext(ee);
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(it.Portal, { container: i ?? void 0, children: /* @__PURE__ */ o(
      it.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: qt, ...r },
        dir: s,
        ...n
      }
    ) })
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Fr({ ...t }) {
  return /* @__PURE__ */ o(it.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Kr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Br({ ...t }) {
  return /* @__PURE__ */ n(ot.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Mr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "popover-header",
      className: d("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Hr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "popover-title",
      className: d("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Jr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ur({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "p",
    {
      "data-slot": "popover-description",
      className: d("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Mt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    at.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function jt({ ...t }) {
  return /* @__PURE__ */ o(at.Root, { "data-slot": "tooltip", ...t });
}
function Gt({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    at.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? d(Zt({ variant: e }), t) : t,
      ...a
    }
  );
}
function zt({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: a,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: r = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: n,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ o(at.Portal, { children: /* @__PURE__ */ p(
    at.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
      style: { zIndex: Ue, ...a },
========
      style: { zIndex: De, ...a },
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ o(
          at.Arrow,
          {
            className: d(
              "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
              "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
              "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
              n
            )
          }
        )
      ]
    }
  ) });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function oa() {
  const [t, e] = K(!1), a = pt(null), r = q(() => {
========
function Qe() {
  const [t, e] = J(!1), a = dt(null), r = V(() => {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), n = q(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: n };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const le = Ne(void 0);
function ht() {
  const t = ve(le);
========
const re = pe(void 0);
function wt() {
  const t = me(re);
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const gt = W("", {
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function na({ variant: t = "default", ...e }) {
  const a = M(), r = C.useMemo(
========
function ta({ variant: t = "default", ...e }) {
  const a = M(), r = G.useMemo(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    () => ({
      variant: t
    }),
    [t]
  );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  return /* @__PURE__ */ o(le.Provider, { value: r, children: /* @__PURE__ */ o(_.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function Xr({
========
  return /* @__PURE__ */ n(re.Provider, { value: r, children: /* @__PURE__ */ n(C.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function $r({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  ...t
}) {
  return /* @__PURE__ */ o(_.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function sa({
========
function ea({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  ...t
}) {
  return /* @__PURE__ */ o(_.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ia({
========
function aa({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  children: n,
  ...s
}) {
  const i = M();
  return /* @__PURE__ */ o(_.Portal, { children: /* @__PURE__ */ o(
    _.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: d(
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
        t
      ),
      style: { zIndex: qt, ...r },
      ...s,
      children: /* @__PURE__ */ o("div", { dir: i, children: n })
    }
  ) });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function qr({ ...t }) {
  return /* @__PURE__ */ o(_.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Wr({
========
function Kr({ ...t }) {
  return /* @__PURE__ */ n(C.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Fr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const n = M(), s = ht();
  return /* @__PURE__ */ o(
    _.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: d(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: s.variant })
      ),
      dir: n,
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Zr({
========
function Jr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...n
}) {
  const s = M(), i = ht();
  return /* @__PURE__ */ p(
    _.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ o(_.ItemIndicator, { children: /* @__PURE__ */ o(Et, {}) })
          }
        ),
        e
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function la({
========
function ra({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  ...t
}) {
  return /* @__PURE__ */ o(_.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Ht({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const n = M(), s = ht();
  return /* @__PURE__ */ p(
    _.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: s.variant })
      ),
      dir: n,
      ...r,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(_.ItemIndicator, { children: /* @__PURE__ */ o(Et, {}) })
          }
        ),
        e
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function da({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ o(
    _.Label,
========
function oa({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    C.Label,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: d(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ca({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    _.Separator,
========
function na({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    C.Separator,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "dropdown-menu-separator",
      className: d("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Yr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Vr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: d(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Qr({ ...t }) {
  return /* @__PURE__ */ o(_.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function to({
========
function Xr({ ...t }) {
  return /* @__PURE__ */ n(C.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function qr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const n = ht();
  return /* @__PURE__ */ p(
    _.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: d(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: n.variant })
      ),
      ...r,
      children: [
        a,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        /* @__PURE__ */ o(be, { className: "tw:ms-auto" })
========
        /* @__PURE__ */ n(we, { className: "tw:ms-auto" })
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function eo({
========
function Wr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: a,
  ...r
}) {
  const n = M();
  return /* @__PURE__ */ o(
    _.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: d(
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
      style: { zIndex: Wt, ...e },
      ...r,
      children: /* @__PURE__ */ o("div", { dir: n, children: a })
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ao({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    fe.Root,
========
function Zr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    de.Root,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "label",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ro({
========
function Yr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  ...e
}) {
  const a = M();
  return /* @__PURE__ */ o(
    vt.Root,
    {
      "data-slot": "radio-group",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: a,
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function oo({
========
function Qr({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    vt.Item,
    {
      "data-slot": "radio-group-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        vt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const ua = W(
========
const sa = X(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
), de = C.createContext({
========
), oe = G.createContext({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function no({
========
function to({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: n = "horizontal",
  children: s,
  ...i
}) {
  const l = M();
  return /* @__PURE__ */ o(
    Kt.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": n,
      style: { "--gap": r },
      className: d(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...i,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
      children: /* @__PURE__ */ o(
        de.Provider,
========
      children: /* @__PURE__ */ n(
        oe.Provider,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        {
          value: C.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: n }),
            [e, a, r, n]
          ),
          children: s
        }
      )
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function so({
========
function eo({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...n
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  const s = C.useContext(de);
  return /* @__PURE__ */ o(
    Kt.Item,
========
  const s = G.useContext(oe);
  return /* @__PURE__ */ n(
    Ot.Item,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: d(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        ua({
========
        sa({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
          variant: s.variant || a,
          size: s.size || r
        }),
        t
      ),
      ...n,
      children: e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function io() {
  return /Macintosh/i.test(navigator.userAgent);
}
function lo() {
  return /Windows/i.test(navigator.userAgent);
}
const wa = ["input", "select", "textarea", "button"], pa = ["button", "textbox"], co = ({
========
function ao() {
  return /Macintosh/i.test(navigator.userAgent);
}
function ro() {
  return /Windows/i.test(navigator.userAgent);
}
const ia = ["input", "select", "textarea", "button"], la = ["button", "textbox"], oo = ({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const n = pt(null), [s, i] = K(void 0), [l, u] = K(void 0), m = q(
    (w) => {
      i(w);
      const g = t.find((h) => h.id === w);
      g && (e == null || e(g));
      const v = document.getElementById(w);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), n.current && n.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = q(
    (w) => {
      const g = t.find((v) => v.id === w);
      g && (u((v) => v === w ? void 0 : w), a == null || a(g));
    },
    [a, t]
  ), k = (w) => {
    if (!w) return !1;
    const g = w.tagName.toLowerCase();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    if (w.isContentEditable || wa.includes(g)) return !0;
    const v = w.getAttribute("role");
    if (v && pa.includes(v)) return !0;
    const h = w.getAttribute("tabindex");
    return h !== void 0 && h !== "-1";
  }, I = q(
========
    if (w.isContentEditable || ia.includes(g)) return !0;
    const v = w.getAttribute("role");
    if (v && la.includes(v)) return !0;
    const b = w.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, E = V(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    (w) => {
      var A;
      const g = w.target, v = (x) => x ? document.getElementById(x) : void 0, h = v(l), $ = v(s);
      if (!!(h && g && h.contains(g) && g !== h) && k(g)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const x = t.find((B) => B.id === l);
            x && m(x.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!h) return;
          const x = Array.from(
            h.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (x.length === 0) return;
          const B = x.findIndex((O) => O === g);
          if (B === -1) return;
          let S;
          w.key === "ArrowDown" ? S = Math.min(B + 1, x.length - 1) : S = Math.max(B - 1, 0), S !== B && (w.preventDefault(), w.stopPropagation(), (A = x[S]) == null || A.focus());
          return;
        }
        return;
      }
      const X = t.findIndex((x) => x.id === s);
      let L = X;
      switch (w.key) {
        case "ArrowDown":
          L = Math.min(X + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          L = Math.max(X - 1, 0), w.preventDefault();
          break;
        case "Home":
          L = 0, w.preventDefault();
          break;
        case "End":
          L = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const x = $;
          if (x) {
            const B = x.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = x.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), O = B ?? S;
            if (O) {
              w.preventDefault(), O.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (k(g) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const H = t[L];
      H && m(H.id);
    },
    [t, m, s, l, f, r]
  );
  return {
    listboxRef: n,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: I,
    /** Focus an option by its ID */
    focusOption: m
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
}, ma = W(
========
}, da = X(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
function mt({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const n = a ? It.Root : "span";
  return /* @__PURE__ */ o(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        ma({ variant: e }),
========
        da({ variant: e }),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function uo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function no({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "skeleton",
      className: d("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function wo({
========
function so({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const n = C.useRef(null);
  C.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), C.useEffect(() => {
    const i = n.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        lt(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
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
    const { current: l } = n;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), lt(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ o(
      "div",
      {
        "data-slot": "table-container",
        className: d("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
            onKeyDown: s,
            className: d(
              "tw:w-full tw:caption-bottom tw:text-sm",
              // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
              "tw:outline-hidden",
              // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
              "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
              t
            ),
            "aria-label": "Table",
            "aria-labelledby": "table-label",
            ...r
          }
        )
      }
    )
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function po({
========
function io({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: d(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function mo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function lo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "tbody",
    {
      "data-slot": "table-body",
      className: d("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function fo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function co({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "tfoot",
    {
      "data-slot": "table-footer",
      className: d(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function fa(t) {
  C.useEffect(() => {
========
function ca(t) {
  G.useEffect(() => {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const n = t.current ? lt(t.current) : [], s = n.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < n.length && n[i].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ha(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ga(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ho({
========
function ua(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function wa(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function uo({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: n,
  ...s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  const i = C.useRef(null);
  C.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), fa(i);
  const l = C.useMemo(
    () => i.current ? lt(i.current) : [],
========
  const i = G.useRef(null);
  G.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), ca(i);
  const l = G.useMemo(
    () => i.current ? nt(i.current) : [],
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    [i]
  ), u = C.useCallback(
    (f) => {
      const { current: k } = i;
      if (!k || !k.parentElement) return;
      const I = k.closest("table"), w = I ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        lt(I).filter(
          (h) => h.tagName === "TR"
        )
      ) : [], g = w.indexOf(k), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), ga(w, g, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), ha(l, v, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const h = k.closest("table");
        h && h.focus();
========
      if (h.key === "ArrowDown" || h.key === "ArrowUp")
        h.preventDefault(), wa(w, g, h.key);
      else if (h.key === "ArrowLeft" || h.key === "ArrowRight")
        h.preventDefault(), ua(l, v, h.key);
      else if (h.key === "Escape") {
        h.preventDefault();
        const b = k.closest("table");
        b && b.focus();
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      }
      e == null || e(f);
    },
    [i, l, e]
  ), m = C.useCallback(
    (f) => {
      r && (a == null || a(f));
    },
    [r, a]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: u,
      onFocus: m,
      className: d(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function go({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function wo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "th",
    {
      "data-slot": "table-head",
      className: d(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function bo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function po({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "td",
    {
      "data-slot": "table-cell",
      className: d(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function No({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function mo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "caption",
    {
      "data-slot": "table-caption",
      className: d("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function vo({
========
function fo({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: n = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: u,
  isOpen: m = void 0,
  onOpenChange: f = void 0,
  isDisabled: k = !1,
  sortSelected: I = !1,
  icon: w = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: h
}) {
  const [$, J] = K(!1), Z = q(
    (S) => {
      var E;
      const O = (E = t.find((F) => F.label === S)) == null ? void 0 : E.value;
      O && a(
        e.includes(O) ? e.filter((F) => F !== O) : [...e, O]
      );
    },
    [t, e, a]
  ), X = () => u || r, L = Q(() => {
    if (!I) return t;
    const S = t.filter((E) => E.starred).sort((E, F) => E.label.localeCompare(F.label)), O = t.filter((E) => !E.starred).sort((E, F) => {
      const ot = e.includes(E.value), ct = e.includes(F.value);
      return ot && !ct ? -1 : !ot && ct ? 1 : E.label.localeCompare(F.label);
    });
    return [...S, ...O];
  }, [t, e, I]), H = () => {
    a(t.map((S) => S.value));
  }, A = () => {
    a([]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  }, x = m ?? $;
  return /* @__PURE__ */ o("div", { id: h, className: g, children: /* @__PURE__ */ p(ne, { open: x, onOpenChange: f ?? J, children: [
    /* @__PURE__ */ o(St, { asChild: !0, children: /* @__PURE__ */ p(
      U,
========
  }, y = f ?? U;
  return /* @__PURE__ */ n("div", { id: b, className: g, children: /* @__PURE__ */ m(te, { open: y, onOpenChange: h ?? q, children: [
    /* @__PURE__ */ n(Nt, { asChild: !0, children: /* @__PURE__ */ m(
      H,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      {
        variant: v,
        role: "combobox",
        "aria-expanded": x,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: k,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            w && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: w }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: d(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: X()
              }
            )
          ] }),
          /* @__PURE__ */ o(Jt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    /* @__PURE__ */ o(ie, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Qt, { children: [
      /* @__PURE__ */ o(
        te,
========
    /* @__PURE__ */ n(ae, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Vt, { children: [
      /* @__PURE__ */ n(
        Xt,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      n && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(U, { variant: "ghost", size: "sm", onClick: H, children: s }),
        /* @__PURE__ */ o(U, { variant: "ghost", size: "sm", onClick: A, children: i })
      ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
      /* @__PURE__ */ p(ee, { children: [
        /* @__PURE__ */ o(ae, { children: l }),
        /* @__PURE__ */ o(re, { children: L.map((S) => /* @__PURE__ */ p(
          Tt,
========
      /* @__PURE__ */ m(qt, { children: [
        /* @__PURE__ */ n(Wt, { children: l }),
        /* @__PURE__ */ n(Zt, { children: j.map((S) => /* @__PURE__ */ m(
          Yt,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
          {
            value: S.label,
            onSelect: Z,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Xt,
                {
                  className: d(
                    "tw:h-4 tw:w-4",
                    e.includes(S.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
              S.starred && /* @__PURE__ */ o(ye, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
========
              S.starred && /* @__PURE__ */ n(he, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
            ]
          },
          S.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function st(t) {
  return t.replace(/^\+/, "");
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ba(t, e, a) {
========
function pa(t, e, a) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (!e) return [...t];
  const r = [...t], n = st(e).toLowerCase();
  return a === "passive" ? Dt({
    query: n,
    items: r,
    filter: (s) => st(s.label).toLowerCase().startsWith(n),
    sortBy: "label"
  }) : Dt({
    query: n,
    items: r,
    filter: (s) => st(s.label).toLowerCase().includes(n),
    sortBy: "label"
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Na(t) {
  return t.isComposing || t.keyCode === 229;
}
const ce = {
========
function ma(t) {
  return t.isComposing || t.keyCode === 229;
}
const ne = {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
}, va = [
========
}, fa = [
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
], xa = [
========
], ha = [
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ya(t) {
  return [
    ...va,
    ...xa.filter((e) => ce[t].test(e))
========
function ga(t) {
  return [
    ...fa,
    ...ha.filter((e) => ne[t].test(e))
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  ];
}
function D(t) {
  t.preventDefault(), t.stopPropagation();
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function xo(t, e, a) {
  var n, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (D(t), a.commit(), "ended") : t.key === "Escape" ? (D(t), a.dismiss(), "ended") : "passed";
  if (Na(t) || Ge.has(t.key) || t.key === "Dead")
========
function ho(t, e, a) {
  var o, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (R(t), a.commit(), "ended") : t.key === "Escape" ? (R(t), a.dismiss(), "ended") : "passed";
  if (ma(t) || Ie.has(t.key) || t.key === "Dead")
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && D(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return D(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    return D(t), ba(
========
    return R(t), pa(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return D(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return D(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    D(t);
    const i = st(e.filter).toLowerCase(), l = e.items.find(
      (u) => st(u.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  return t.key === "*" ? r === "selection" && e.filter === "" ? (D(t), a.dismiss(), "ended") : (D(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (D(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (D(t), a.dismiss(), "ended") : t.key === "Backspace" || ce[r].test(t.key) ? (D(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && D(t), a.dismiss(), "ended");
}
function yo(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function So(t) {
========
  return t.key === "*" ? r === "selection" && e.filter === "" ? (R(t), a.dismiss(), "ended") : (R(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (R(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (R(t), a.dismiss(), "ended") : t.key === "Backspace" || ne[r].test(t.key) ? (R(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && R(t), a.dismiss(), "ended");
}
function go(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function bo(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: n,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: m,
    focusEditor: f,
    applyItem: k,
    onShowError: I
  } = t;
  n.current += 1;
  const w = n.current, g = a ? "backslash" : "selection", v = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && r && (v.shouldSpaceCommit = r), s(v), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    keys: ya(g),
    onKey: (h) => l(h)
  }).then((h) => {
    if (i(w), h !== void 0) {
      m(), f();
      const $ = e.find((J) => J.marker === h);
      $ && k($);
    } else a || f();
  }).catch((h) => {
    i(w), a || f(), I(h);
  });
}
function ko({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
    keys: ga(g),
    onKey: (b) => l(b)
  }).then((b) => {
    if (i(w), b !== void 0) {
      f(), h();
      const U = e.find((q) => q.marker === b);
      U && k(U);
    } else a || h();
  }).catch((b) => {
    i(w), a || h(), E(b);
  });
}
function No({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "kbd",
    {
      "data-slot": "kbd",
      className: d(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Io({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function vo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "kbd",
    {
      "data-slot": "kbd-group",
      className: d("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Sa(t) {
========
function ba(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = P(a.projectId), n = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    n ? n.some((i) => i.scrollGroupId === a.scrollGroupId) || n.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, n) => r.scrollGroupId - n.scrollGroupId)), e;
}
function Ut(t, e, a) {
  const r = P(e);
  return t.some(
    (n) => P(n.projectId) === r && n.scrollGroupId === a
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function bt(t) {
  const e = Sa(t.openTabs);
========
function mt(t) {
  const e = ba(t.openTabs);
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (t.mode === "project") {
    const n = t.selection.projectId === void 0 ? void 0 : P(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(P(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: n !== void 0 && n === P(s.id),
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
  const r = [];
  return t.projects.forEach((n) => {
    const s = e.get(P(n.id));
    if (!s || s.length === 0) {
      r.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Ut(a, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
      return;
    }
    s.forEach((i) => {
      r.push({
        rowKey: `tab:${n.id}:${i.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Ut(a, n.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
    });
  }), a.forEach((n) => {
    if (n.scrollGroupId === void 0) return;
    const s = P(n.projectId);
    if (r.some(
      (l) => P(l.projectId) === s && l.scrollGroupId === n.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => P(l.id) === s);
    i && r.push({
      rowKey: `closed:${i.id}:${n.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: i.isDisabled === !0,
      disabledReason: i.disabledReason,
      project: i
    });
  }), r;
}
const Lt = "Selected", At = "Unselected";
function $t(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function tt(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - n;
}
function kt(t) {
  return [{ kind: "flat", rows: [...t].sort(tt) }];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function ka(t) {
  const e = t.filter($t).sort(tt), a = t.filter((n) => !$t(n)).sort(tt);
========
function Na(t) {
  const e = t.filter(Pt).sort(Y), a = t.filter((o) => !Pt(o)).sort(Y);
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const r = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && r.push({ kind: "other", rows: a }), r;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ia(t, e) {
  const a = t.filter((i) => i.isSelected).sort(tt), r = t.filter((i) => !i.isSelected).sort(tt), n = (i, l) => {
    var m;
    const u = (m = e.getSectionHeading) == null ? void 0 : m.call(
========
function va(t, e) {
  const a = t.filter((i) => i.isSelected).sort(Y), r = t.filter((i) => !i.isSelected).sort(Y), o = (i, l) => {
    var f;
    const u = (f = e.getSectionHeading) == null ? void 0 : f.call(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      e,
      i,
      l.map((f) => f.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? Lt : At;
  }, s = [];
  return a.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: n("selected", a),
    rows: a
  }), r.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: n("unselected", r),
    rows: r
  }), s;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ea(t, e) {
  if (e.id === "openTabs") return ka(t);
  if (e.id === "selection") return Ia(t, e);
  if (!e.getGroupKey) return kt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: n } = e;
========
function xa(t, e) {
  if (e.id === "openTabs") return Na(t);
  if (e.id === "selection") return va(t, e);
  if (!e.getGroupKey) return vt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: o } = e;
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  t.forEach((l) => {
    const u = n(l.project);
    if (u === void 0 || u === "") {
      r.push(l);
      return;
    }
    const m = a.get(u);
    m ? m.push(l) : a.set(u, [l]);
  });
  const s = [...a.entries()].map(([l, u]) => {
    var k;
    const m = [...u].sort(
      (I, w) => {
        var g;
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, I.project, w.project)) || tt(I, w);
      }
    ), f = ((k = e.getSectionHeading) == null ? void 0 : k.call(
      e,
      l,
      m.map((I) => I.project)
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
  return r.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...r].sort(tt)
  }), i;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const Eo = [
========
const xo = [
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
function y(t, e) {
  const a = t[e];
  return typeof a == "string" ? a : void 0;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const ut = "recent", _a = "other";
function ue(t) {
========
const it = "recent", ya = "other";
function se(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ta(t) {
  const e = t ?? {};
  return [
    ue(e.openTabsLabel),
========
function Sa(t) {
  const e = t ?? {};
  return [
    se(e.openTabsLabel),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (a) => {
        var r;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        return typeof ((r = a.customData) == null ? void 0 : r[nt.lastUsedAt]) == "number" ? ut : _a;
========
        return typeof ((r = a.customData) == null ? void 0 : r[at.lastUsedAt]) == "number" ? it : ya;
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      },
      getSectionHeading: (a) => a === ut ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, r) => a.key === ut ? -1 : r.key === ut ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (a) => {
        var n;
        const r = (n = a.customData) == null ? void 0 : n[nt.language];
        return typeof r == "string" ? r : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (a) => {
        var n;
        const r = (n = a.customData) == null ? void 0 : n[nt.type];
        return typeof r == "string" ? r : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (a, r) => {
        var i;
        const n = r.find(
          (l) => {
            var u;
            return typeof ((u = l.customData) == null ? void 0 : u[nt.typeName]) == "string";
          }
        ), s = (i = n == null ? void 0 : n.customData) == null ? void 0 : i[nt.typeName];
        return typeof s == "string" && s.length > 0 ? s : a;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const _o = Ta();
function Ca(t) {
========
const yo = Sa();
function ka(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (a) => a === "selected" ? e.selectedSectionHeading ?? Lt : e.unselectedSectionHeading ?? At
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function To(t) {
========
function So(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  return {
    openTabsLabel: y(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: y(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: y(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: y(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: y(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: y(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: y(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: y(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Co(t) {
========
function ko(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  return {
    label: y(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const ja = 100, Ga = {
========
const Ia = 100, Ea = {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
  autoSelectionSelectedSectionHeading: Lt,
  autoSelectionUnselectedSectionHeading: At,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function za(t) {
  return { ...Ga, ...t };
}
function jo(t) {
========
function _a(t) {
  return { ...Ea, ...t };
}
function Io(t) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  return {
    searchPlaceholder: y(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: y(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: y(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: y(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: y(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: y(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: y(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: y(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: y(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: y(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: y(t, "%projectSelector_openButtonLabel%"),
    clearAll: y(t, "%projectSelector_clearAll%")
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function dt(t) {
  return Qe[ze(t)] ?? String(t);
}
const Ft = "platform.footerAction", La = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Aa({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = dt(t);
  return e ? /* @__PURE__ */ o(
    mt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: La,
========
function st(t) {
  return Xe[Ee(t)] ?? String(t);
}
const Ta = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ca({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = st(t);
  return e ? /* @__PURE__ */ n(
    ct,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ta,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      children: a
    }
  ) : /* @__PURE__ */ o(mt, { variant: "secondary", children: a });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ra({
========
function Ga({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  row: t,
  mode: e,
  strings: a,
  onClick: r,
  onOpen: n,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: u,
    open: m,
    onPointerEnter: f,
    onPointerLeave: k
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  } = oa(), [I, w] = K(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, v = m || I, h = q(() => {
========
  } = Qe(), [E, w] = J(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, v = f || E, b = V(() => {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    if (g) {
      w(!0);
      return;
    }
    f();
  }, [g, f]), $ = q(() => {
    w(!1), k();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  }, [k]), J = /* @__PURE__ */ o(Xt, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let Z;
  e === "project" ? t.openGroups.length > 0 && (Z = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((A) => /* @__PURE__ */ o(mt, { variant: "secondary", children: dt(A) }, A)) })) : t.scrollGroupId !== void 0 && (Z = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Aa,
========
  }, [k]), q = /* @__PURE__ */ n(Ht, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let O;
  e === "project" ? t.openGroups.length > 0 && (O = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((_) => /* @__PURE__ */ n(ct, { variant: "secondary", children: st(_) }, _)) })) : t.scrollGroupId !== void 0 && (O = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Ca,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ p(
      U,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (A) => {
          A.stopPropagation(), n(t);
        },
        onMouseDown: (A) => A.stopPropagation(),
        "aria-label": a.openButtonLabel,
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
          /* @__PURE__ */ o(ke, { className: "tw:h-3 tw:w-3" }),
========
          /* @__PURE__ */ n(be, { className: "tw:h-3 tw:w-3" }),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
          a.openButtonLabel
        ]
      }
    )
  ] }));
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  const X = /* @__PURE__ */ p(
    Tt,
========
  const $ = /* @__PURE__ */ m(
    Yt,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: h,
      onPointerLeave: $,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: J }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        Z
      ]
    }
  ), L = t.scrollGroupId !== void 0 ? dt(t.scrollGroupId) : void 0, H = t.isBoundButClosed && L ? a.boundButClosedTooltip.replace("{group}", L) : void 0;
  return /* @__PURE__ */ p(jt, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ o(Gt, { asChild: !0, children: X }),
    /* @__PURE__ */ p(
      zt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", children: t.fullName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && L && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              L,
              ")"
            ] })
          ] }),
          H && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: H }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const rt = "none";
function Da({
========
const et = "none";
function za({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  const n = e !== rt;
  return /* @__PURE__ */ p(na, { children: [
    /* @__PURE__ */ p(jt, { children: [
      /* @__PURE__ */ o(Gt, { asChild: !0, children: /* @__PURE__ */ o(sa, { asChild: !0, children: /* @__PURE__ */ o(
        U,
========
  const o = e !== et;
  return /* @__PURE__ */ m(ta, { children: [
    /* @__PURE__ */ m(It, { children: [
      /* @__PURE__ */ n(Et, { asChild: !0, children: /* @__PURE__ */ n(ea, { asChild: !0, children: /* @__PURE__ */ n(
        H,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        {
          variant: "ghost",
          size: "sm",
          className: d(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            n && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": r.groupByAriaLabel,
          "aria-pressed": n,
          onMouseDown: (s) => s.preventDefault(),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
          children: /* @__PURE__ */ o(Se, { className: "tw:h-4 tw:w-4" })
========
          children: /* @__PURE__ */ n(ge, { className: "tw:h-4 tw:w-4" })
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        }
      ) }) }),
      /* @__PURE__ */ o(zt, { children: r.groupByAriaLabel })
    ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    /* @__PURE__ */ p(
      ia,
========
    /* @__PURE__ */ m(
      aa,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Wt },
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
          /* @__PURE__ */ o(da, { children: r.groupSectionLabel }),
          /* @__PURE__ */ p(la, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ o(Ht, { value: rt, children: r.groupByNone }),
            /* @__PURE__ */ o(ca, {}),
            t.map((s) => /* @__PURE__ */ o(Ht, { value: s.id, children: s.label }, s.id))
========
          /* @__PURE__ */ n(oa, { children: r.groupSectionLabel }),
          /* @__PURE__ */ m(ra, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ n(Rt, { value: et, children: r.groupByNone }),
            /* @__PURE__ */ n(na, {}),
            t.map((s) => /* @__PURE__ */ n(Rt, { value: s.id, children: s.label }, s.id))
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
          ] })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Pa(t, e) {
========
function ja(t, e) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === rt) return rt;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : rt;
}
function Nt(t, e) {
  if (e === void 0) return;
  const a = P(e);
  return t.find((r) => P(r.id) === a);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Go(t) {
  const [e, a] = K(!1), [r, n] = K(""), s = za(t.localizedStrings), i = Q(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const c = [];
    return t.openTabs.length > 0 && c.push(ue(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && c.push(
      Ca({
========
function Eo(t) {
  const [e, a] = J(!1), [r, o] = J(""), s = _a(t.localizedStrings), i = Z(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const c = [];
    return t.openTabs.length > 0 && c.push(se(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && c.push(
      ka({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        label: s.autoSelectionGroupingLabel,
        selectedSectionHeading: s.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: s.autoSelectionUnselectedSectionHeading
      })
    ), c;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  ]), [l, u] = K(void 0), m = Q(
    () => Pa(i, t.defaultGrouping),
========
  ]), [l, u] = J(void 0), f = Z(
    () => ja(i, t.defaultGrouping),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    [i, t.defaultGrouping]
  ), f = l ?? m, k = pt(null), [I, w] = K(void 0), g = q((c) => {
    a(c), c || (n(""), w(void 0));
  }, []);
  Rt(() => {
    if (!e) return;
    const c = window.requestAnimationFrame(() => {
      const b = k.current;
      b && b.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(c);
  }, [e]);
  const v = Q(() => t.mode === "project" ? bt({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? bt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : bt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), h = Q(() => {
    const c = r.trim().toLowerCase();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    return c ? v.filter(
      (b) => b.shortName.toLowerCase().includes(c) || b.fullName.toLowerCase().includes(c)
    ) : v;
  }, [v, r]), $ = !!t.footerAction && h.length === 0, J = Q(() => {
    if (f === rt) return kt(h);
    const c = i.find((b) => b.id === f);
    return c ? Ea(h, c) : kt(h);
  }, [h, f, i]), Z = (c) => {
========
    return c ? w.filter(
      (p) => p.shortName.toLowerCase().includes(c) || p.fullName.toLowerCase().includes(c)
    ) : w;
  }, [w, r]), v = Z(() => {
    if (h === et) return vt(g);
    const c = i.find((p) => p.id === h);
    return c ? xa(g, c) : vt(g);
  }, [g, h, i]), b = (c) => {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    if (c.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
    }
  }, X = (c) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: c.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const b = t.selection.pairs, R = P(c.projectId), T = (z) => P(z.projectId) === R && z.scrollGroupId === c.scrollGroupId, G = b.some(T) ? b.filter((z) => !T(z)) : [
          ...b.filter((z) => !T(z)),
          { projectId: c.projectId, scrollGroupId: c.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: G });
        return;
      }
      case "projectScrollGroup": {
        if (c.isBoundButClosed && c.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(c.projectId, c.scrollGroupId), a(!1);
          return;
        }
        if (c.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: c.projectId,
            scrollGroupId: c.scrollGroupId
          }), a(!1);
          return;
        }
        const b = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: c.projectId, scrollGroupId: b }), t.onOpenProjectInGroup(c.projectId, b), a(!1);
      }
    }
  }, L = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, H = t.mode === "project" ? t.renderTriggerLabel : void 0, A = t.mode === "project" ? t.triggerLabelFormat : void 0, x = Q(() => {
    switch (t.mode) {
      case "project": {
        const c = Nt(t.projects, t.selection.projectId);
        if (H) return { node: H(c), title: "" };
        let b = c ? c.shortName : s.buttonPlaceholder;
        return c && A === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (b = `${c.shortName} - ${c.fullName}`), { node: b, title: b };
      }
      case "project-multi": {
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G };
        }
        const b = [];
        if (c.forEach((G) => {
          const z = Nt(t.projects, G.projectId);
          z && b.push({ project: z, scrollGroupId: G.scrollGroupId });
        }), b.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G };
        }
        const R = b.map(
          ({ project: G, scrollGroupId: z }) => z === void 0 ? G.shortName : `${G.shortName} (${dt(z)})`
        ).join(", "), T = b.length.toString();
        return {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
          node: /* @__PURE__ */ p(pe, { children: [
            /* @__PURE__ */ o(mt, { variant: "muted", className: "tw:shrink-0", children: T }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: R })
========
          node: /* @__PURE__ */ m(ie, { children: [
            /* @__PURE__ */ n(ct, { variant: "muted", className: "tw:shrink-0", children: I }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: T })
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
          ] }),
          title: `${T} ${R}`
        };
      }
      case "projectScrollGroup": {
        const c = Nt(t.projects, t.selection.projectId);
        if (!c) {
          const T = s.buttonPlaceholder;
          return { node: T, title: T };
        }
        const b = t.selection.scrollGroupId;
        if (b === void 0)
          return { node: c.shortName, title: c.shortName };
        const R = `${c.shortName} · ${dt(b)}`;
        return { node: R, title: R };
      }
      default:
        return { node: "", title: "" };
    }
  }, [
    t.mode,
    t.projects,
    t.selection,
    H,
    A,
    s.buttonPlaceholder
  ]), B = pt(null), [S, O] = K(!1);
  Rt(() => {
    const c = B.current;
    if (!c) return;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
    const b = (T) => {
      O(T < ja);
========
    const p = (I) => {
      F(I < Ia);
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    };
    if (b(c.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const R = new ResizeObserver((T) => {
      T.forEach((G) => {
        const [z] = G.borderBoxSize;
        b(z ? z.inlineSize : c.getBoundingClientRect().width);
      });
    });
    return R.observe(c, { box: "border-box" }), () => R.disconnect();
  }, []);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  let E;
  t.isLoading ? E = /* @__PURE__ */ o(Ie, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : S ? E = void 0 : t.mode === "project-multi" ? E = /* @__PURE__ */ o(Jt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : E = /* @__PURE__ */ o(Ee, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const F = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? Z : void 0, ot = /* @__PURE__ */ p(
    U,
========
  let _;
  t.isLoading ? _ = /* @__PURE__ */ n(Ne, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : j ? _ = void 0 : t.mode === "project-multi" ? _ = /* @__PURE__ */ n(Mt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : _ = /* @__PURE__ */ n(ve, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const y = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? b : void 0, B = /* @__PURE__ */ m(
    H,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    {
      ref: B,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": s.ariaLabel || void 0,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: d(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        S && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof x.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: x.node }) : x.node }),
        E
      ]
    }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  ), ct = x.title ? /* @__PURE__ */ o(Mt, { delayDuration: 400, children: /* @__PURE__ */ p(jt, { children: [
    /* @__PURE__ */ o(Gt, { asChild: !0, children: /* @__PURE__ */ o(St, { asChild: !0, children: ot }) }),
    /* @__PURE__ */ o(zt, { children: x.title })
  ] }) }) : /* @__PURE__ */ o(St, { asChild: !0, children: ot }), we = i.length > 1;
  return /* @__PURE__ */ p(ne, { open: e, onOpenChange: g, children: [
    ct,
    /* @__PURE__ */ o(
      ie,
========
  ), S = O.title ? /* @__PURE__ */ n(At, { delayDuration: 400, children: /* @__PURE__ */ m(It, { children: [
    /* @__PURE__ */ n(Et, { asChild: !0, children: /* @__PURE__ */ n(Nt, { asChild: !0, children: B }) }),
    /* @__PURE__ */ n(_t, { children: O.title })
  ] }) }) : /* @__PURE__ */ n(Nt, { asChild: !0, children: B }), P = i.length > 1;
  return /* @__PURE__ */ m(te, { open: e, onOpenChange: E, children: [
    S,
    /* @__PURE__ */ n(
      ae,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        children: /* @__PURE__ */ o(Mt, { delayDuration: 400, children: /* @__PURE__ */ p(
          Qt,
          {
            shouldFilter: !1,
            value: $ ? I ?? Ft : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  te,
                  {
                    value: r,
                    onValueChange: n,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                we && /* @__PURE__ */ o(
                  Da,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(U, { variant: "ghost", size: "sm", onClick: L, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(ee, { children: [
                /* @__PURE__ */ o(ae, { children: s.commandEmptyMessage }),
                J.map((c, b) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    xe,
                    {
                      children: [
                        /* @__PURE__ */ o(re, { heading: Oa(c, s), children: c.rows.map((R) => {
                          var T;
                          return /* @__PURE__ */ o(
                            Ra,
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
                      ]
                    },
                    `${c.kind}:${c.groupingId ?? ""}:${c.key ?? c.label ?? ""}`
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
                  h.length > 0 && /* @__PURE__ */ o(
                    Pt,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    Tt,
                    {
                      forceMount: !0,
                      value: Ft,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var c;
                        (c = t.footerAction) == null || c.onSelect(), g(!1);
                      },
                      children: [
                        /* @__PURE__ */ o(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        !!t.renderProjectIndicator && /* @__PURE__ */ o(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: t.footerAction.label })
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
========
        children: /* @__PURE__ */ n(At, { delayDuration: 400, children: /* @__PURE__ */ m(Vt, { shouldFilter: !1, children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Xt,
              {
                value: r,
                onValueChange: o,
                placeholder: s.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            P && /* @__PURE__ */ n(
              za,
              {
                availableGroupings: i,
                activeGrouping: h,
                onChangeGrouping: u,
                strings: s
              }
            )
          ] }),
          t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
          // project mounts a data subscription per project, so on a large installation it is a
          // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
          /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: q, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
          /* @__PURE__ */ m(qt, { children: [
            /* @__PURE__ */ n(Wt, { children: s.commandEmptyMessage }),
            v.map((c, p) => (
              // Custom groupings yield multiple 'grouping' sections, so the section key must
              // include the label (or key) to stay stable across re-orders.
              /* @__PURE__ */ m(
                fe,
                {
                  children: [
                    /* @__PURE__ */ n(Zt, { heading: La(c, s), children: c.rows.map((T) => {
                      var I;
                      return /* @__PURE__ */ n(
                        Ga,
                        {
                          row: T,
                          mode: t.mode,
                          strings: s,
                          onClick: U,
                          onOpen: y,
                          selectedRowRef: k,
                          indicator: (I = t.renderProjectIndicator) == null ? void 0 : I.call(t, T.project),
                          reserveIndicatorSlot: !!t.renderProjectIndicator
                        },
                        T.rowKey
                      );
                    }) }),
                    p < v.length - 1 && /* @__PURE__ */ n($e, {})
                  ]
                },
                `${c.kind}:${c.groupingId ?? ""}:${c.key ?? c.label ?? ""}`
              )
            ))
          ] })
        ] }) })
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Oa(t, e) {
========
function La(t, e) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const Ba = Vt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: s = !1, id: i }, l) => {
========
const Aa = Bt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, l) => {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    const u = M();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: d("tw:relative tw:@container/search", { "tw:w-full": r }, n),
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
          /* @__PURE__ */ o(
            _e,
========
          /* @__PURE__ */ n(
            xe,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
            {
              className: d(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
          /* @__PURE__ */ o(
            Ke,
========
          /* @__PURE__ */ n(
            Be,
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
            {
              ref: l,
              className: d(
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
            U,
            {
              variant: "ghost",
              size: "icon",
              className: d(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": u === "rtl" },
                { "tw:right-0": u === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
                /* @__PURE__ */ o(Te, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
========
                /* @__PURE__ */ n(ye, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
              ]
            }
          )
        ]
      }
    );
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
Ba.displayName = "SearchBar";
const Ma = 5;
function zo(t) {
  return Ye(t).filter(
    (e) => !j.isObsolete(j.bookIdToNumber(e))
  );
}
function Ha(t, e) {
  return t.filter((a) => {
    try {
      return Le(a) === e;
========
Aa.displayName = "SearchBar";
const Ra = 5;
function _o(t) {
  return Ve(t).filter(
    (e) => !z.isObsolete(z.bookIdToNumber(e))
  );
}
function Da(t, e) {
  return t.filter((a) => {
    try {
      return _e(a) === e;
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    } catch {
      return !1;
    }
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const Lo = (t, e, a) => Ha(t, e).every((r) => a.includes(r));
function Ua(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => j.bookIdToNumber(r) > 0).sort((r, n) => j.bookIdToNumber(r) - j.bookIdToNumber(n)).map((r) => ta(r, e));
}
function Ao(t, e, a, r) {
========
const To = (t, e, a) => Da(t, e).every((r) => a.includes(r));
function Pa(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => z.bookIdToNumber(r) > 0).sort((r, o) => z.bookIdToNumber(r) - z.bookIdToNumber(o)).map((r) => qe(r, e));
}
function Co(t, e, a, r) {
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  if (t.length === 0) return;
  const n = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === n.size && [...s].every((l) => n.has(l)))
    return a;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  const i = Ua(t, r);
  if (i.length !== 0)
    return i.length <= Ma ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Ro({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ o(
========
  const i = Pa(t, r);
  if (i.length !== 0)
    return i.length <= Ra ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Go({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "p",
    {
      role: "status",
      "data-testid": e,
      className: d("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function $a({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Oa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "empty",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Fa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ba({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "empty-header",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
const Ka = W(
========
const Ma = X(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Va({
========
function Ha({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        Ka({ variant: e }),
========
        Ma({ variant: e }),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Do({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function zo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "empty-title",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ja({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ua({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "empty-description",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Xa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function $a({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "empty-content",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Po({
========
function jo({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: n = "alert",
  className: s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  return /* @__PURE__ */ p($a, { className: d(s), role: n, children: [
    /* @__PURE__ */ p(Fa, { children: [
      /* @__PURE__ */ o(Va, { variant: "icon", children: r ?? /* @__PURE__ */ o(Ce, {}) }),
      /* @__PURE__ */ o(Ja, { children: t })
    ] }),
    a && /* @__PURE__ */ o(Xa, { children: /* @__PURE__ */ o(U, { onClick: () => a(), children: e }) })
  ] });
}
const qa = Vt(({ className: t, ...e }, a) => /* @__PURE__ */ o(je, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
qa.displayName = "Spinner";
const Wa = W(
========
  return /* @__PURE__ */ m(Oa, { className: d(s), role: o, children: [
    /* @__PURE__ */ m(Ba, { children: [
      /* @__PURE__ */ n(Ha, { variant: "icon", children: r ?? /* @__PURE__ */ n(Se, {}) }),
      /* @__PURE__ */ n(Ua, { children: t })
    ] }),
    a && /* @__PURE__ */ n($a, { children: /* @__PURE__ */ n(H, { onClick: () => a(), children: e }) })
  ] });
}
const Ka = Bt(({ className: t, ...e }, a) => /* @__PURE__ */ n(ke, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
Ka.displayName = "Spinner";
const Fa = X(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Oo({
========
function Lo({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
        Wa({ variant: e }),
========
        Fa({ variant: e }),
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
        t
      ),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Bo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ao({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "alert-title",
      className: d(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Mo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
========
function Ro({ className: t, ...e }) {
  return /* @__PURE__ */ n(
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
    "div",
    {
      "data-slot": "alert-description",
      className: d(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Ho({
========
function Do({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    _t.Group,
    {
      "data-slot": "resizable-panel-group",
      className: d(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...n
    }
  );
}
function wt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function Uo({
========
function Po({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    _t.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: wt(t),
      minSize: wt(e),
      maxSize: wt(a),
      collapsedSize: wt(r),
      ...n
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
function $o({
========
function Oo({
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    _t.Separator,
    {
      "data-slot": "resizable-handle",
      className: d(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-Bbp6t-rt.js
  qt as $,
  zr as A,
  U as B,
  Tt as C,
  na as D,
  Ur as E,
  ee as F,
  ae as G,
  ao as H,
  _r as I,
  oo as J,
  fr as K,
  Ar as L,
  br as M,
  Nr as N,
  xr as O,
  ne as P,
  no as Q,
  ro as R,
  so as S,
  Mt as T,
  io as U,
  mt as V,
  aa as W,
  uo as X,
  co as Y,
  ca as Z,
  Zr as _,
  ta as a,
  $o as a$,
  ho as a0,
  bo as a1,
  wo as a2,
  po as a3,
  go as a4,
  mo as a5,
  qr as a6,
  la as a7,
  Ht as a8,
  vo as a9,
  eo as aA,
  Pr as aB,
  le as aC,
  ht as aD,
  gt as aE,
  Ve as aF,
  Xe as aG,
  Oo as aH,
  Mo as aI,
  Bo as aJ,
  Hr as aK,
  gr as aL,
  yr as aM,
  Fe as aN,
  $e as aO,
  hr as aP,
  $a as aQ,
  Xa as aR,
  Ja as aS,
  Fa as aT,
  Va as aU,
  Ro as aV,
  Do as aW,
  Io as aX,
  Jr as aY,
  Kr as aZ,
  Vr as a_,
  ko as aa,
  Wt as ab,
  Ke as ac,
  st as ad,
  Pt as ae,
  Sr as af,
  So as ag,
  xo as ah,
  yo as ai,
  Fr as aj,
  Na as ak,
  Go as al,
  Ba as am,
  zo as an,
  Ha as ao,
  jr as ap,
  Lo as aq,
  $r as ar,
  vr as as,
  Qe as at,
  Br as au,
  Or as av,
  Yr as aw,
  Qr as ax,
  to as ay,
  Xr as az,
  jt as b,
  Uo as b0,
  Ho as b1,
  Po as b2,
  qa as b3,
  No as b4,
  fo as b5,
  pr as b6,
  wr as b7,
  He as b8,
  Me as b9,
  ur as ba,
  cr as bb,
  ma as bc,
  ra as bd,
  Zt as be,
  lo as bf,
  Tr as bg,
  rt as bh,
  Ga as bi,
  Eo as bj,
  Ue as bk,
  To as bl,
  jo as bm,
  Co as bn,
  _o as bo,
  ba as bp,
  ya as bq,
  Ta as br,
  Ca as bs,
  mr as bt,
  Ao as bu,
  d as c,
  Gt as d,
  zt as e,
  Dr as f,
  Gr as g,
  sa as h,
  ia as i,
  da as j,
  Wr as k,
  Ir as l,
  Er as m,
  Lr as n,
  re as o,
  Ze as p,
  Cr as q,
  M as r,
  St as s,
  Rr as t,
  oa as u,
  ie as v,
  Qt as w,
  kr as x,
  te as y,
  Mr as z
};
//# sourceMappingURL=resizable-Bbp6t-rt.js.map
========
  Ut as $,
  _r as A,
  H as B,
  Yt as C,
  ta as D,
  Pr as E,
  qt as F,
  Wt as G,
  Zr as H,
  yr as I,
  Qr as J,
  cr as K,
  Cr as L,
  pr as M,
  mr as N,
  hr as O,
  te as P,
  to as Q,
  Yr as R,
  eo as S,
  At as T,
  ao as U,
  ct as V,
  Ze as W,
  no as X,
  oo as Y,
  na as Z,
  Jr as _,
  qe as a,
  Oo as a$,
  uo as a0,
  po as a1,
  so as a2,
  io as a3,
  wo as a4,
  lo as a5,
  Kr as a6,
  ra as a7,
  Rt as a8,
  fo as a9,
  Wr as aA,
  jr as aB,
  re as aC,
  wt as aD,
  pt as aE,
  Me as aF,
  Ue as aG,
  Lo as aH,
  Ro as aI,
  Ao as aJ,
  Dr as aK,
  wr as aL,
  gr as aM,
  Oe as aN,
  Pe as aO,
  ur as aP,
  Oa as aQ,
  $a as aR,
  Ua as aS,
  Ba as aT,
  Ha as aU,
  Go as aV,
  zo as aW,
  vo as aX,
  Ur as aY,
  Mr as aZ,
  Hr as a_,
  No as aa,
  $t as ab,
  Be as ac,
  rt as ad,
  $e as ae,
  br as af,
  bo as ag,
  ho as ah,
  go as ai,
  Br as aj,
  ma as ak,
  Eo as al,
  Aa as am,
  _o as an,
  Da as ao,
  Ir as ap,
  To as aq,
  Or as ar,
  fr as as,
  Xe as at,
  Ar as au,
  Lr as av,
  Vr as aw,
  Xr as ax,
  qr as ay,
  $r as az,
  It as b,
  Po as b0,
  Do as b1,
  jo as b2,
  Ka as b3,
  mo as b4,
  co as b5,
  lr as b6,
  ir as b7,
  Re as b8,
  Ae as b9,
  sr as ba,
  nr as bb,
  da as bc,
  Ye as bd,
  Kt as be,
  ro as bf,
  Sr as bg,
  et as bh,
  xo as bi,
  De as bj,
  So as bk,
  Io as bl,
  ko as bm,
  yo as bn,
  pa as bo,
  ga as bp,
  Sa as bq,
  ka as br,
  dr as bs,
  Co as bt,
  d as c,
  Et as d,
  _t as e,
  zr as f,
  Er as g,
  ea as h,
  aa as i,
  oa as j,
  Fr as k,
  vr as l,
  xr as m,
  Tr as n,
  Zt as o,
  Je as p,
  kr as q,
  M as r,
  Nt as s,
  Gr as t,
  Qe as u,
  ae as v,
  Vt as w,
  Nr as x,
  Xt as y,
  Rr as z
};
//# sourceMappingURL=resizable-C0ppCjkK.js.map
>>>>>>>> 80b46312a6e (chore: regenerate platform-bible-react dist after rebase onto main):lib/platform-bible-react/dist/resizable-C0ppCjkK.js
