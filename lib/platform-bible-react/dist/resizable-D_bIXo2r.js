<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
import { jsx as o, jsxs as m, Fragment as gt } from "react/jsx-runtime";
import { Slot as Ge, Dialog as yt, Separator as un, Popover as Zt, Tooltip as qt, DropdownMenu as Q, Label as wn, RadioGroup as Le } from "radix-ui";
import { IconX as fn, IconCheck as ze, IconSearch as pn, IconChevronLeft as mn, IconChevronRight as hn } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import wt, { useState as O, useRef as I, useCallback as _, createContext as gn, useContext as bn, useEffect as F, useMemo as ut, Fragment as Mr, useLayoutEffect as ae, useImperativeHandle as Nn, useId as vn, forwardRef as Or } from "react";
import { X as Pr, Check as ue, ChevronsUpDown as jr, Star as xn, Undo as yn, Redo as Sn, SquareX as Br, FunctionSquare as Gr, SquareSigma as zr, Ban as kn, Copy as Cn, Group as En, ArrowRight as In, Loader2 as _n, ChevronDown as Tn, Search as Ln, AlertTriangle as An, LoaderCircle as Rn } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as br, GENERATOR_NOTE_CALLER as Ae, HIDDEN_NOTE_CALLER as Re, isInsertEmbedOpOfType as Jt, getDefaultViewOptions as Dn, getMarkerMenuItems as Mn, defaultStyleInfo as Nr, Editorial as On } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as Pn, split as Hr, slice as jn, formatReplacementString as Bn, usfmMarkers as se, deepEqual as Gt, truncateToCopyLimit as Gn, getErrorMessage as vr, isPlatformError as zn, ABORTED as Hn, normalizeProjectId as it, compareProjectsByName as Un, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Ur, getLocalizeKeyForScrollGroupId as Kn, hasDistinctFullName as Fn, getSectionForBook as $n } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as He from "react-resizable-panels";
import { clsx as Jn } from "clsx";
import { extendTailwindMerge as qn, twMerge as Vn } from "tailwind-merge";
const Xn = qn({ prefix: "tw" });
function De(t) {
========
import { jsx as o, jsxs as p, Fragment as gt } from "react/jsx-runtime";
import { Slot as Ge, Dialog as yt, Separator as wn, Popover as Wt, Tooltip as Jt, DropdownMenu as Y, Label as fn, RadioGroup as Le } from "radix-ui";
import { IconX as pn, IconCheck as ze, IconSearch as mn, IconChevronLeft as hn, IconChevronRight as gn } from "@tabler/icons-react";
import { Canon as nt } from "@sillsdev/scripture";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
import wt, { useState as O, useRef as _, useCallback as I, createContext as hn, useContext as gn, useEffect as F, useMemo as ut, Fragment as Mr, useLayoutEffect as ae, useImperativeHandle as bn, forwardRef as Or } from "react";
import { X as Pr, Check as ue, ChevronsUpDown as jr, Star as Nn, Undo as vn, Redo as xn, SquareX as Br, FunctionSquare as Gr, SquareSigma as zr, Ban as yn, Copy as Sn, Group as kn, ArrowRight as Cn, Loader2 as En, ChevronDown as _n, Search as In, AlertTriangle as Tn, LoaderCircle as Ln } from "lucide-react";
========
import wt, { useState as O, useRef as I, useCallback as _, createContext as bn, useContext as Nn, useEffect as K, useMemo as ut, Fragment as Br, useLayoutEffect as ae, useImperativeHandle as vn, forwardRef as Gr } from "react";
import { X as zr, Check as ue, ChevronsUpDown as Hr, Star as xn, Undo as yn, Redo as Sn, SquareX as He, FunctionSquare as Ue, SquareSigma as Ke, Ban as kn, Copy as Cn, Sparkles as En, CircleCheckBig as In, MessageSquare as _n, Search as Ur, Library as Tn, BookMarked as Ln, Book as An, MessageSquarePlus as Dn, PanelBottom as Rn, FileText as Mn, Scan as On, ZoomOut as Pn, ZoomIn as jn, Eye as Bn, Pencil as Gn, BookCopy as zn, Users as Hn, ExternalLink as Un, CircleQuestionMark as Kn, Settings as Fn, BookA as $n, House as qn, Download as Jn, RefreshCw as Vn, Group as Xn, ArrowRight as Zn, Loader2 as Wn, ChevronDown as Yn, AlertTriangle as Qn, LoaderCircle as to } from "lucide-react";
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as yr, GENERATOR_NOTE_CALLER as Ae, HIDDEN_NOTE_CALLER as De, isInsertEmbedOpOfType as qt, getDefaultViewOptions as eo, getMarkerMenuItems as ro, defaultStyleInfo as Sr, Editorial as no } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as oo, split as Kr, slice as ao, formatReplacementString as so, usfmMarkers as se, deepEqual as Gt, truncateToCopyLimit as io, getErrorMessage as kr, isPlatformError as lo, ABORTED as co, normalizeProjectId as it, compareProjectsByName as uo, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Zt, formatProjectName as Fr, getLocalizeKeyForScrollGroupId as wo, hasDistinctFullName as fo, getSectionForBook as po } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Fe from "react-resizable-panels";
import { clsx as mo } from "clsx";
import { extendTailwindMerge as ho, twMerge as go } from "tailwind-merge";
const bo = ho({ prefix: "tw" });
function Re(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Wn(t) {
========
function No(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = De(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((c, w) => w !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((c, w) => w !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Zn(t, e) {
========
function vo(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (e.startsWith("tw:"))
    return t;
  const r = De(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = De(e), i = s.some((c) => c.startsWith("-tw-")), l = s.some((c) => c.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const c = a.slice(1);
    return [...n, `-tw-${c}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const c = a.slice(1);
    return [...n, `!tw-${c}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function g(...t) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const e = Jn(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Xn(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((c) => {
    const w = Wn(c);
    n.set(w.normalized, w.original), a.push(w.normalized);
  }), Vn(a.join(" ")).split(" ").filter(Boolean).map((c) => {
    const w = n.get(c);
    return w ? Zn(c, w) : c;
  }).join(" ");
}
const Kr = 600, we = 650, is = 400, Yn = 450, Qn = 500, ls = 510, cs = 520, to = 675, ds = 690, us = 700, ws = 800, Fr = Ot(
========
  const e = mo(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return bo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const w = No(d);
    n.set(w.normalized, w.original), a.push(w.normalized);
  }), go(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const w = n.get(d);
    return w ? vo(d, w) : d;
  }).join(" ");
}
const $r = 600, we = 650, Ls = 400, xo = 450, yo = 500, As = 510, Ds = 520, So = 675, Rs = 690, Ms = 700, Os = 800, qr = Ot(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
function W({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const s = n ? Ge.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: g(qr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Jr = "layoutDirection";
function Vr() {
  return globalThis.localStorage ?? void 0;
}
function pt() {
  var t;
  try {
    const e = (t = Vr()) == null ? void 0 : t.getItem(Jr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function fs(t) {
========
function Ps(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  var e;
  try {
    (e = Vr()) == null || e.setItem(Jr, t);
  } catch {
  }
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ps({ ...t }) {
  return /* @__PURE__ */ o(yt.Root, { "data-slot": "dialog", ...t });
}
function ms({ ...t }) {
  return /* @__PURE__ */ o(yt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function eo({ ...t }) {
  return /* @__PURE__ */ o(yt.Portal, { "data-slot": "dialog-portal", ...t });
}
function hs({ ...t }) {
  return /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", ...t });
}
function ro({
========
function js({ ...t }) {
  return /* @__PURE__ */ o(yt.Root, { "data-slot": "dialog", ...t });
}
function Bs({ ...t }) {
  return /* @__PURE__ */ o(yt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function ko({ ...t }) {
  return /* @__PURE__ */ o(yt.Portal, { "data-slot": "dialog-portal", ...t });
}
function Gs({ ...t }) {
  return /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", ...t });
}
function Co({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    yt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: g(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      style: { zIndex: Yn, ...e },
========
      style: { zIndex: xo, ...e },
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function gs({
========
function zs({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: n,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: a,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  ...i
}) {
  const l = pt();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ m(eo, { children: [
    /* @__PURE__ */ o(ro, { className: n, style: a }),
    /* @__PURE__ */ m(
========
  return /* @__PURE__ */ p(ko, { children: [
    /* @__PURE__ */ o(Co, { className: n, style: a }),
    /* @__PURE__ */ p(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      yt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        style: { zIndex: Qn, ...s },
========
        style: { zIndex: yo, ...s },
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        dir: l,
        ...i,
        children: [
          e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          r && /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(W, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(fn, {}),
========
          r && /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(X, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(pn, {}),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function bs({ className: t, ...e }) {
========
function Hs({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "dialog-header",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ns({
========
function Us({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "dialog-footer",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...n,
      children: [
        r,
        e && /* @__PURE__ */ o(yt.Close, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function vs({ className: t, ...e }) {
========
function Ks({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    yt.Title,
    {
      "data-slot": "dialog-title",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function xs({
========
function Fs({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    yt.Description,
    {
      "data-slot": "dialog-description",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Xr({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:w-full to give callers control over width
        // CUSTOM: Added tw:file:text-foreground so the file-picker button text matches the foreground design token
        "pr-twp tw:h-8 tw:min-w-0 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-1 tw:text-base tw:transition-colors tw:outline-none tw:file:inline-flex tw:file:h-6 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function no({ className: t, ...e }) {
========
function Eo({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const oo = Ot(
========
const Io = Ot(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ao({
========
function _o({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  align: e = "inline-start",
  ...r
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        className: g(oo({ align: e }), t),
========
        className: g(Io({ align: e }), t),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        onClick: (n) => {
          var a, s;
          n.target instanceof HTMLElement && n.target.closest("button") || (s = (a = n.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
        },
        ...r
      }
    )
  );
}
Ot("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function $e({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht,
    {
      "data-slot": "command",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function qe({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = pt(), s = wt.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !r || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), c = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      c && (i.preventDefault(), i.stopPropagation(), c.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(no, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
========
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ p(Eo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      /* @__PURE__ */ o(
        Ht.Input,
        {
          "data-slot": "command-input",
          className: g(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...n
        }
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      /* @__PURE__ */ o(ao, { children: /* @__PURE__ */ o(pn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
========
      /* @__PURE__ */ o(_o, { children: /* @__PURE__ */ o(mn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    ] }) })
  );
}
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht.List,
    {
      "data-slot": "command-list",
      className: g(
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
function Ve({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Empty,
    {
      "data-slot": "command-empty",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function ce({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Group,
    {
      "data-slot": "command-group",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Me({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Separator,
    {
      "data-slot": "command-separator",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function fe({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ m(
    Ht.Item,
    {
      "data-slot": "command-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ o(ze, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function so({ className: t, ...e }) {
========
function To({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "command-shortcut",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const io = [
========
const Lo = [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
], lo = (t) => {
  var e;
  return ((e = io[t]) == null ? void 0 : e.chapters) ?? -1;
}, co = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function uo(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
========
], Ao = (t) => {
  var e;
  return ((e = Lo[t]) == null ? void 0 : e.chapters) ?? -1;
}, Do = nt.allBookIds.filter(
  (t) => !nt.isObsolete(nt.bookIdToNumber(t))
);
function Ro(t) {
  const e = [], r = Math.min(t.length, nt.allBookIds.length);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function M(t) {
  return `%scrollGroup_${t}%`;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const wo = {
========
const Mo = {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Je(t, e) {
  return lo(ot.bookIdToNumber(t));
========
function Xe(t, e) {
  return Ao(nt.bookIdToNumber(t));
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
}
function pe(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = ot.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ys(t, e, r) {
========
function $s(t, e, r) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = pe(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Xe(s), 1),
      verseNum: 1
    };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ss(t, e, r) {
========
function qs(t, e, r) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < Xe(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = pe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ks(t, e, r) {
========
function Js(t, e, r) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = pe(n, e, "previous");
  if (!i) return;
  const l = Math.max(Xe(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Cs(t, e, r) {
========
function Vs(t, e, r) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = pe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Es(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Is = (t, e, r, n, a) => {
========
function Xs(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Zs = (t, e, r, n, a) => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  switch (t) {
    case Mt.OT:
      return e ?? "Old Testament";
    case Mt.NT:
      return r ?? "New Testament";
    case Mt.DC:
      return n ?? "Deuterocanon";
    case Mt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
}, _s = (t, e, r, n, a) => {
========
}, Ws = (t, e, r, n, a) => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  switch (t) {
    case Mt.OT:
      return e ?? "OT";
    case Mt.NT:
      return r ?? "NT";
    case Mt.DC:
      return n ?? "DC";
    case Mt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ts(t, e) {
========
function Ys(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function fo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Ls = Object.fromEntries(
  co.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function As(t, e, r) {
========
function Oo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Qs = Object.fromEntries(
  Do.map((t) => [t, nt.bookIdToEnglishName(t)])
);
function ti(t, e, r) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
const Cr = `
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function po(t) {
========
function Po(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${Cr}, ${e}` : Cr;
  return Array.from(t.querySelectorAll(r)).filter(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && po(n)
  );
}
const Rs = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Oe = "keyboard", yr = !1;
function Ds() {
  yr || typeof document > "u" || (yr = !0, document.addEventListener(
========
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Po(n)
  );
}
const ei = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Oe = "keyboard", Er = !1;
function ri() {
  Er || typeof document > "u" || (Er = !0, document.addEventListener(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    "pointerdown",
    () => {
      Oe = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Oe = "keyboard";
    },
    !0
  ));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ms() {
  return Oe;
}
const Vr = "data-quiet-focus";
function Os(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Vr, ""), t.style.outline = "none"));
}
function Ps(t) {
  t && (t.removeAttribute(Vr), t.style.removeProperty("outline"));
}
const js = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function mo({
========
function ni() {
  return Oe;
}
const Zr = "data-quiet-focus";
function oi(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Zr, ""), t.style.outline = "none"));
}
function ai(t) {
  t && (t.removeAttribute(Zr), t.style.removeProperty("outline"));
}
const si = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function jo({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    un.Root,
========
    wn.Root,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...n
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const ho = Ot(
========
const Bo = Ot(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
function Ze({
  className: t,
  orientation: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        ho({ orientation: e }),
========
        Bo({ orientation: e }),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Bs({
========
function ii({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ge.Root : "div";
  return /* @__PURE__ */ o(
    n,
    {
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function Wr({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    mo,
========
    jo,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Wr() {
========
function Yr() {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const t = wt.createContext(null);
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return wt.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ve({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
========
function We({ ...t }) {
  return /* @__PURE__ */ o(Wt.Root, { "data-slot": "popover", ...t });
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
}
function Pe({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const { PortalContainerProvider: go, usePortalContainer: bo } = Wr(), Gs = go;
function Xe({
========
const { PortalContainerProvider: Go, usePortalContainer: zo } = Yr(), li = Go;
function Ye({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  ...a
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const s = pt(), i = bo();
========
  const s = pt(), i = zo();
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: i, children: /* @__PURE__ */ o(
      Zt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: $r, ...n },
        dir: s,
        ...a
      }
    ) })
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function No({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function zs({ className: t, ...e }) {
========
function Ho({ ...t }) {
  return /* @__PURE__ */ o(Wt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function ci({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Hs({ className: t, ...e }) {
========
function di({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Us({ className: t, ...e }) {
========
function ui({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Et({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    Jt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function St({ ...t }) {
  return /* @__PURE__ */ o(Jt.Root, { "data-slot": "tooltip", ...t });
}
function kt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? g(qr({ variant: e }), t) : t,
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const { PortalContainerProvider: vo, usePortalContainer: xo } = Wr(), Ks = vo;
========
const { PortalContainerProvider: Uo, usePortalContainer: Ko } = Yr(), wi = Uo;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
function Ct({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: r,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: n = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: a,
  children: s,
  ...i
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const l = xo();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(qt.Portal, { container: l, children: /* @__PURE__ */ m(
      qt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: to, ...r },
========
  const l = Ko();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: l, children: /* @__PURE__ */ p(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: So, ...r },
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          n && /* @__PURE__ */ o(
            Jt.Arrow,
            {
              className: g(
                "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
                "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
                "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
                a
              )
            }
          )
        ]
      }
    ) })
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const yo = /^%[^%]*%$/;
function Zr(t) {
  return t !== void 0 && !yo.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return Zr(t) ? t : e;
}
function So() {
========
const Fo = /^%[^%]*%$/;
function Qr(t) {
  return t !== void 0 && !Fo.test(t) && t.trim() !== "";
}
function et(t, e) {
  return Qr(t) ? t : e;
}
function $o() {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const [t, e] = O(!1), r = I(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const Yr = gn(void 0);
function me() {
  const t = bn(Yr);
========
const tn = bn(void 0);
function me() {
  const t = Nn(tn);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const he = Ot("", {
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function We({ variant: t = "default", ...e }) {
========
function Qe({ variant: t = "default", ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const r = pt(), n = wt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ o(Yr.Provider, { value: n, children: /* @__PURE__ */ o(Q.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Fs({
========
  return /* @__PURE__ */ o(tn.Provider, { value: n, children: /* @__PURE__ */ o(Y.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function fi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  ...t
}) {
  return /* @__PURE__ */ o(Q.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ze({
========
function tr({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  ...t
}) {
  return /* @__PURE__ */ o(Q.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function er({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  children: a,
  ...s
}) {
  const i = pt();
  return /* @__PURE__ */ o(Q.Portal, { children: /* @__PURE__ */ o(
    Q.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: r,
      align: e,
      className: g(
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
      style: { zIndex: $r, ...n },
      ...s,
      children: /* @__PURE__ */ o("div", { dir: i, children: a })
    }
  ) });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function $s({ ...t }) {
  return /* @__PURE__ */ o(Q.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Js({
========
function pi({ ...t }) {
  return /* @__PURE__ */ o(Y.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function mi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = pt(), s = me();
  return /* @__PURE__ */ o(
    Q.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: g(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function Vt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = pt(), i = me();
  return /* @__PURE__ */ m(
    Q.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: i.variant })
      ),
      checked: r,
      dir: s,
      ...a,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ o(Q.ItemIndicator, { children: /* @__PURE__ */ o(ze, {}) })
          }
        ),
        e
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ko({
========
function qo({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  ...t
}) {
  return /* @__PURE__ */ o(Q.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Ir({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = pt(), s = me();
  return /* @__PURE__ */ m(
    Q.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(Q.ItemIndicator, { children: /* @__PURE__ */ o(ze, {}) })
          }
        ),
        e
      ]
    }
  );
}
function rr({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    Q.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: g(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Q.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function qs({ className: t, ...e }) {
========
function hi({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: g(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Vs({ ...t }) {
  return /* @__PURE__ */ o(Q.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Xs({
========
function gi({ ...t }) {
  return /* @__PURE__ */ o(Y.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function bi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = me(), s = pt();
  return /* @__PURE__ */ m(
    Q.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        s === "rtl" ? /* @__PURE__ */ o(mn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(hn, { className: "tw:ms-auto" })
========
        s === "rtl" ? /* @__PURE__ */ o(hn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(gn, { className: "tw:ms-auto" })
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ws({
========
function Ni({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = pt();
  return /* @__PURE__ */ o(
    Q.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: g(
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
      style: { zIndex: we, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Zs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    wn.Root,
========
function vi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    fn.Root,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    {
      "data-slot": "label",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ys({
========
function xi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  ...e
}) {
  const r = pt();
  return /* @__PURE__ */ o(
    Le.Root,
    {
      "data-slot": "radio-group",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Qs({
========
function yi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Le.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Le.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const ti = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), kr = (t, e) => t[e] ?? e;
function Co({
========
const Si = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), _r = (t, e) => t[e] ?? e;
function Jo({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const i = kr(n, "%cancelButton_tooltip%"), l = s ?? kr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(qe, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
========
  const i = _r(n, "%cancelButton_tooltip%"), l = s ?? _r(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(Ze, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ p(St, { children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(zr, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    /* @__PURE__ */ o(Xr, {}),
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
========
    /* @__PURE__ */ o(Wr, {}),
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ p(St, { children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(ue, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function ge() {
  return /Macintosh/i.test(navigator.userAgent);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ei() {
  return /Windows/i.test(navigator.userAgent);
}
const Eo = ["input", "select", "textarea", "button"], Io = ["button", "textbox"], ri = ({
========
function ki() {
  return /Windows/i.test(navigator.userAgent);
}
const Vo = ["input", "select", "textarea", "button"], Xo = ["button", "textbox"], Ci = ({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const a = I(null), [s, i] = O(void 0), [l, c] = O(void 0), w = _(
========
  const a = I(null), [s, i] = O(void 0), [l, d] = O(void 0), w = _(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    (u) => {
      i(u);
      const k = t.find((E) => E.id === u);
      k && (e == null || e(k));
      const p = document.getElementById(u);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), f = _(
    (u) => {
      const k = t.find((p) => p.id === u);
      k && (c((p) => p === u ? void 0 : u), r == null || r(k));
    },
    [r, t]
  ), S = (u) => {
    if (!u) return !1;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    const k = u.tagName.toLowerCase();
    if (u.isContentEditable || Eo.includes(k)) return !0;
    const p = u.getAttribute("role");
    if (p && Io.includes(p)) return !0;
========
    const S = u.tagName.toLowerCase();
    if (u.isContentEditable || Vo.includes(S)) return !0;
    const m = u.getAttribute("role");
    if (m && Xo.includes(m)) return !0;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    const E = u.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, y = _(
    (u) => {
      var V;
      const k = u.target, p = (A) => A ? document.getElementById(A) : void 0, E = p(l), z = p(s);
      if (!!(E && k && E.contains(k) && k !== E) && S(k)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !k.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const A = t.find((U) => U.id === l);
            A && w(A.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!E) return;
          const A = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (A.length === 0) return;
          const U = A.findIndex((ft) => ft === k);
          if (U === -1) return;
          let lt;
          u.key === "ArrowDown" ? lt = Math.min(U + 1, A.length - 1) : lt = Math.max(U - 1, 0), lt !== U && (u.preventDefault(), u.stopPropagation(), (V = A[lt]) == null || V.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((A) => A.id === s);
      let R = C;
      switch (u.key) {
        case "ArrowDown":
          R = Math.min(C + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          R = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          R = 0, u.preventDefault();
          break;
        case "End":
          R = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const A = z;
          if (A) {
            const U = A.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), lt = A.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), ft = U ?? lt;
            if (ft) {
              u.preventDefault(), ft.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (S(k) || (n == null || n(u.key), u.preventDefault()));
          return;
      }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      const $ = t[R];
      $ && w($.id);
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
      const U = t[A];
      U && w(U.id);
========
      const J = t[A];
      J && w(J.id);
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    },
    [t, w, s, l, f, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: y,
    /** Focus an option by its ID */
    focusOption: w
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
}, _o = Ot(
========
}, Zo = Ot(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
function de({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? Ge.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        _o({ variant: e }),
========
        Zo({ variant: e }),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        t
      ),
      ...n
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ni({ className: t, ...e }) {
========
function Ei({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Qr(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function oi({
========
function Ii({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = wt.useRef(null);
  wt.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), wt.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Yt(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const c = new MutationObserver(() => {
      l();
    });
    return c.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      c.disconnect();
    };
  }, []);
  const s = (i) => {
    var c;
    const { current: l } = a;
    if (l && Qr(i, l)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (c = Yt(l)[0]) == null || c.focus();
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
        className: g("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: a,
            onKeyDown: s,
            className: g(
              "tw:w-full tw:caption-bottom tw:text-sm",
              // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
              "tw:outline-hidden",
              // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
              "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
              t
            ),
            "aria-label": "Table",
            "aria-labelledby": "table-label",
            ...n
          }
        )
      }
    )
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ai({
========
function _i({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: g(
        {
          // CUSTOM: Apply sticky header styles when stickyHeader is true so headers remain
          // visible while scrolling through long tables
          "tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm": e
        },
        "tw:[&_tr]:border-b",
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function si({ className: t, ...e }) {
========
function Ti({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ii({ className: t, ...e }) {
========
function Li({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: g(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function To(t) {
========
function Wo(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  wt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Yt(t.current) : [], s = a.indexOf(document.activeElement), i = n.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        n.key === "Escape" && (n.preventDefault(), e.focus()), (n.key === "ArrowDown" || n.key === "ArrowUp") && n.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Lo(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Ao(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function li({
========
function Yo(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Qo(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Ai({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = wt.useRef(null);
  wt.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  }, [a]), To(i);
========
  }, [a]), Wo(i);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const l = wt.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), c = wt.useCallback(
    (f) => {
      const { current: S } = i;
      if (!S || !S.parentElement) return;
      if (!Qr(f, S)) {
        e == null || e(f);
        return;
      }
      const y = S.closest("table"), u = y ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(y).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], k = u.indexOf(S), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        f.preventDefault(), Ao(u, k, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), Lo(l, p, f.key);
========
        f.preventDefault(), Qo(u, S, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), Yo(l, m, f.key);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      else if (f.key === "Escape") {
        f.preventDefault();
        const E = S.closest("table");
        E && E.focus();
      }
      e == null || e(f);
    },
    [i, l, e]
  ), w = wt.useCallback(
    (f) => {
      n && (r == null || r(f));
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: w,
      className: g(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ci({ className: t, ...e }) {
========
function Di({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "th",
    {
      "data-slot": "table-head",
      className: g(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function di({ className: t, ...e }) {
========
function Ri({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "td",
    {
      "data-slot": "table-cell",
      className: g(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ui({ className: t, ...e }) {
========
function Mi({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ro(t, e = !0) {
========
function ta(t, e = !0) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const [r, n] = O(!1);
  return F(() => {
    const a = t.current;
    if (!e || !a) {
      n(!1);
      return;
    }
    const s = () => {
      n(a.scrollTop + a.clientHeight < a.scrollHeight - 1);
    };
    s(), a.addEventListener("scroll", s);
    const i = typeof ResizeObserver < "u" ? new ResizeObserver(s) : void 0;
    i == null || i.observe(a);
    const l = new MutationObserver(s);
    return l.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", s), i == null || i.disconnect(), l.disconnect();
    };
  }, [t, e]), r;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Do({
========
function ea({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const n = Ro(r, e);
========
  const n = ta(r, e);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return e ? (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ m("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
      t,
      n && /* @__PURE__ */ o(
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function wi({
========
function Oi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: c = "No entries found",
  customSelectedText: w,
  isOpen: f = void 0,
  onOpenChange: S = void 0,
  isDisabled: y = !1,
  sortSelected: u = !1,
  showScrollCue: k = !1,
  icon: p = void 0,
  className: E = void 0,
  variant: z = "ghost",
  id: B
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const [X, C] = O(!1), R = I(null), $ = _(
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  const [J, C] = O(!1), A = _(null), U = I(
========
  const [q, C] = O(!1), A = I(null), J = _(
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    (G) => {
      var tt;
      const at = (tt = t.find((ct) => ct.label === G)) == null ? void 0 : tt.value;
      at && r(
        e.includes(at) ? e.filter((ct) => ct !== at) : [...e, at]
      );
    },
    [t, e, r]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ), V = () => w || n, A = f ?? X, U = S ?? C, [lt, ft] = O(A), [It, J] = O(e);
  lt !== A && (ft(A), A && J(e));
  const Pt = ut(() => {
    if (!u) return t;
    const G = t.filter((tt) => tt.starred).sort((tt, ct) => tt.label.localeCompare(ct.label)), at = t.filter((tt) => !tt.starred).sort((tt, ct) => {
      const Tt = It.includes(tt.value), jt = It.includes(ct.value);
      return Tt && !jt ? -1 : !Tt && jt ? 1 : tt.label.localeCompare(ct.label);
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  ), $ = () => w || n, D = f ?? J, ot = k ?? C, [lt, ft] = O(D), [_t, q] = O(e);
  lt !== D && (ft(D), D && q(e));
========
  ), V = () => w || n, D = f ?? q, ot = k ?? C, [lt, ft] = O(D), [It, F] = O(e);
  lt !== D && (ft(D), D && F(e));
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const Pt = ut(() => {
    if (!u) return t;
    const G = t.filter((Q) => Q.starred).sort((Q, ct) => Q.label.localeCompare(ct.label)), at = t.filter((Q) => !Q.starred).sort((Q, ct) => {
      const Tt = It.includes(Q.value), jt = It.includes(ct.value);
      return Tt && !jt ? -1 : !Tt && jt ? 1 : Q.label.localeCompare(ct.label);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    });
    return [...G, ...at];
  }, [t, It, u]), Ut = () => {
    const G = t.map((at) => at.value);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    J(G), r(G);
  }, _t = () => {
    J([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: B, className: E, children: /* @__PURE__ */ m(Ve, { open: A, onOpenChange: U, children: [
    /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ m(
      W,
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
    q(G), r(G);
  }, It = () => {
    q([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: B, className: E, children: /* @__PURE__ */ p(Ve, { open: D, onOpenChange: ot, children: [
========
    F(G), r(G);
  }, _t = () => {
    F([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: P, className: E, children: /* @__PURE__ */ p(We, { open: D, onOpenChange: ot, children: [
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ p(
      X,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      {
        variant: z,
        role: "combobox",
        "aria-expanded": A,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: y,
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: g(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: V()
              }
            )
          ] }),
          /* @__PURE__ */ o(Hr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    /* @__PURE__ */ o(Xe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Ue, { children: [
========
    /* @__PURE__ */ o(Ye, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p($e, { children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      /* @__PURE__ */ o(
        qe,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: _t, children: l })
      ] }),
      /* @__PURE__ */ o(Do, { isEnabled: k, scrollerRef: R, children: /* @__PURE__ */ m(Fe, { ref: R, children: [
        /* @__PURE__ */ o($e, { children: c }),
        /* @__PURE__ */ o(ce, { children: Pt.map((G) => /* @__PURE__ */ m(
          fe,
          {
            value: G.label,
            onSelect: $,
========
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(X, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(X, { variant: "ghost", size: "sm", onClick: _t, children: l })
      ] }),
      /* @__PURE__ */ o(ea, { isEnabled: S, scrollerRef: A, children: /* @__PURE__ */ p(Je, { ref: A, children: [
        /* @__PURE__ */ o(Ve, { children: d }),
        /* @__PURE__ */ o(ce, { children: Pt.map((G) => /* @__PURE__ */ p(
          fe,
          {
            value: G.label,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
            onSelect: U,
========
            onSelect: J,
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                ue,
                {
                  className: g(
                    "tw:h-4 tw:w-4",
                    e.includes(G.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              G.starred && /* @__PURE__ */ o(xn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: G.label }),
              G.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: G.secondaryLabel })
            ]
          },
          G.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function xt(t) {
  return t.replace(/^\+/, "");
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Mo(t, e) {
========
function ra(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (!t || e === "") return !1;
  const r = xt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && xt(n.marker).toLowerCase() === r
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Oo(t, e, r) {
========
function na(t, e, r) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (!e) return [...t];
  const n = [...t], a = xt(e).toLowerCase();
  return r === "passive" ? yr({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : yr({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function je(t) {
  return t.isComposing || t.keyCode === 229;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const tn = /^[a-z0-9+-]$/i;
function Po(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ge()) && e !== "Dead") {
    if (tn.test(e)) return e;
========
const en = /^[a-z0-9+-]$/i;
function oa(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ge()) && e !== "Dead") {
    if (en.test(e)) return e;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const jo = [
========
const aa = [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
], Bo = [
========
], sa = [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Go() {
  return [...jo, ...Bo.filter((t) => tn.test(t))];
========
function ia() {
  return [...aa, ...sa.filter((t) => en.test(t))];
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function zo(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (je(t) || Pn.has(t.key))
========
function la(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (je(t) || oo.has(t.key))
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    return "passed";
  const a = !ge();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    return dt(t), Oo(
========
    return dt(t), na(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      e.items.map((w) => ({ label: w.marker })),
      e.filter,
      // The host-driven mode, for every kind: all marker palettes are host-driven (the session
      // owns the query and the palette renders it read-only), so this commit must resolve against
      // the same list the host filtered. `'passive'` is that mode's name — a label PREFIX match,
      // mirroring PT9's marker dropdown — not containment. Ranking cmdk's way here instead would
      // commit an item the rendered list never offered.
      "passive"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return dt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (dt(t), e.filter === "")
        return r.dismiss(), "ended";
      const f = xt(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, f)) {
        const S = e.items.find(
          (y) => xt(y.marker).toLowerCase() === f
        );
        return S && r.commitItem(S.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const c = xt(e.filter).toLowerCase(), w = e.items.find(
      (f) => xt(f.marker).toLowerCase() === c
    );
    return w && r.commitItem(w.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const s = Po(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function Ho(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function en(t, e) {
========
  const s = oa(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function ca(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function rn(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Uo(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Ko(t) {
========
function da(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function ua(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: c,
    restoreSelectionIfLost: w,
    hasEditorChangedSinceFocus: f,
    focusEditor: S,
    applyItem: y,
    onShowError: u
  } = t, k = () => {
    w(), S();
  };
  a.current += 1;
  const p = a.current, E = () => a.current === p, z = { kind: r, token: p, filter: "", items: e };
  n && (z.isNoteMarker = n), s(z), c({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    keys: Go(),
    onKey: (B) => l(B)
  }).then((B) => {
    var C;
    i(p);
    const X = B ?? ((C = z.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (X !== void 0) {
      const R = (f == null ? void 0 : f()) ?? !1;
      k();
      const $ = R ? void 0 : e.find((V) => V.marker === X);
      $ && y($);
    } else E() && k();
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
    keys: jo(),
    onKey: (B) => l(B)
  }).then((B) => {
    var C;
    i(m);
    const J = B ?? ((C = z.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (J !== void 0) {
      const A = (f == null ? void 0 : f()) ?? !1;
      S();
      const U = A ? void 0 : e.find(($) => $.marker === J);
      U && y(U);
========
    keys: ia(),
    onKey: (P) => l(P)
  }).then((P) => {
    if (i(m), P !== void 0) {
      const q = (f == null ? void 0 : f()) ?? !1;
      S();
      const C = q ? void 0 : e.find((A) => A.marker === P);
      C && y(C);
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    } else E() && S();
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  }).catch((B) => {
    i(p), E() && k(), u(B);
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Fo(t, e) {
========
function wa(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: l,
    hasEditorChangedSinceFocus: c
  } = e, w = r.current;
  if (!w) return "no-session";
  const f = (y) => {
    if (c != null && c()) {
      a.dismiss();
      return;
    }
    y();
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return zo(t, w, {
========
  return la(t, w, {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    update: (y) => a.update(y),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (y) => f(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedMarker(y);
    }),
    commitTypedAndReopen: (y) => f(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedMarker(y, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (y) => f(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedCloser(y);
    }),
    commitItem: (y) => f(() => {
      var k;
      const u = w.items.find((p) => p.marker === y);
      if (u) {
        if (u.kind === "note") {
          w.itemToApplyOnClose = u;
          return;
        }
        s(), (k = n.current) == null || k.applyMarkerMenuSelection(u, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && l(w.token), "routed";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function $o({
========
function fa({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  F(() => {
    const n = r ?? document, a = () => {
      t() && e();
    };
    return n.addEventListener("compositionstart", a, { capture: !0 }), () => {
      n.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Jo({
========
function pa({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  F(() => {
    const i = s ?? document, l = (c) => {
      var S, y;
      const w = (S = t.current) == null ? void 0 : S.querySelector(".editor-input");
      if (!w || c.target !== w) return;
      const f = (y = e.current) == null ? void 0 : y.getSelection();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      f && (r.current = f), a() && (n.current = en(
========
      f && (r.current = f), a() && (n.current = rn(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        () => {
          var u;
          return (u = e.current) == null ? void 0 : u.getUsj();
        },
        () => {
          var u;
          return (u = e.current) == null ? void 0 : u.getSelection();
        }
      ));
    };
    return i.addEventListener("focusout", l), () => i.removeEventListener("focusout", l);
  }, [t, e, r, n, a, s]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function qo({
========
function ma({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = I(void 0), a = _(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = _(
    (i) => {
      var l;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      Ho(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
========
      ca(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    },
    [t, e]
  );
  return F(
    () => () => {
      var i;
      (i = n.current) == null || i.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: s };
}
function Tr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd",
      className: g(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Vo({ className: t, ...e }) {
========
function ha({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const Xo = /* @__PURE__ */ new Set([
========
const ga = /* @__PURE__ */ new Set([
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  "⌘",
  "⌥",
  "⌃",
  "⇧",
  "⇥",
  "⏎",
  "⌫",
  "⎋",
  "␣",
  "↑",
  "↓",
  "←",
  "→"
]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Wo(t) {
  const e = Hr(t, "");
  let r = 0;
  for (; r < e.length && Xo.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = jn(t, r);
  return a ? [...n, a] : n;
}
function Zo(t) {
========
function ba(t) {
  const e = Kr(t, "");
  let r = 0;
  for (; r < e.length && ga.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = ao(t, r);
  return a ? [...n, a] : n;
}
function Na(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const e = [];
  let r = "";
  return Kr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Yo(t) {
  const e = Wo(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Zo(t), separator: "+" };
}
function Er({ hint: t }) {
  const { keycaps: e, separator: r } = Yo(t);
  return e.length === 1 ? /* @__PURE__ */ o(Cr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Vo, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Mr, { children: [
========
function va(t) {
  const e = ba(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Na(t), separator: "+" };
}
function Lr({ hint: t }) {
  const { keycaps: e, separator: r } = va(t);
  return e.length === 1 ? /* @__PURE__ */ o(Tr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(ha, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ p(Br, { children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Tr, { children: n })
      ] }, a)
    )) })
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const fi = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Ir = (t, e) => t[e] ?? e;
function Qo({
========
const Pi = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Ar = (t, e) => t[e] ?? e;
function xa({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const c = ge(), w = Ir(a, "%undoButton_tooltip%"), f = Ir(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(qe, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
========
  const d = ge(), w = Ar(a, "%undoButton_tooltip%"), f = Ar(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(Ze, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ p(St, { children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(yn, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          /* @__PURE__ */ o(Er, { hint: c ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(Xr, {}),
    e && /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
========
          /* @__PURE__ */ o(Lr, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(Wr, {}),
    e && /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ p(St, { children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(Sn, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          /* @__PURE__ */ o(Er, { hint: c ? "⇧⌘Z" : "Ctrl+Y" })
========
          /* @__PURE__ */ o(Lr, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        ] })
      ] }) })
    ] }) })
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ta({
========
function ya({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const a = I(null);
  return F(() => {
    var c;
    const s = ge(), i = ((c = a.current) == null ? void 0 : c.querySelector(".editor-input")) ?? void 0, l = (w) => {
      var S, y, u, k;
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  const a = _(null);
  return F(() => {
========
  const a = I(null);
  return K(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    var d;
    const s = ge(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (w) => {
      var k, y, u, S;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      if (!i || document.activeElement !== i) return;
      const f = w.key.toLowerCase();
      if (s) {
        if (!w.metaKey) return;
        !w.shiftKey && f === "z" ? (w.preventDefault(), r && ((S = e.current) == null || S.undo())) : w.shiftKey && f === "z" && (w.preventDefault(), n && ((y = e.current) == null || y.redo()));
      } else {
        if (!w.ctrlKey) return;
        !w.shiftKey && f === "z" ? (w.preventDefault(), r && ((u = e.current) == null || u.undo())) : (f === "y" || w.shiftKey && f === "z") && (w.preventDefault(), n && ((k = e.current) == null || k.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ea() {
========
function Sa() {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const t = I(void 0), e = I(new DOMRect()), r = I({
    getBoundingClientRect: () => {
      var s;
      const a = (s = t.current) == null ? void 0 : s.measure();
      return a && (e.current = a), e.current;
    },
    get contextElement() {
      var a;
      return (a = t.current) == null ? void 0 : a.contextElement;
    }
  }), n = _((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return ut(() => ({ virtualRef: r, setSource: n }), [n]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ra(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function na(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const oa = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(gt, { children: [
========
function ka(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ca(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Ea = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(gt, { children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function aa({
========
function Ia({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const s = I(!1), i = I(null), l = I(null), c = I(!1), [w, f] = O(t), [S, y] = O(e), [u, k] = O(!1), p = I(!1), E = I(w);
  E.current = w;
  const z = I(S);
  z.current = S, F(() => {
========
  const s = I(!1), i = I(null), l = I(null), d = I(!1), [w, f] = O(t), [k, y] = O(e), [u, S] = O(!1), m = I(!1), E = I(w);
  E.current = w;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  const z = _(k);
  z.current = k, F(() => {
========
  const H = I(k);
  H.current = k, K(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    f(t);
  }, [t]), F(() => {
    S !== e && y(e);
  }, [e]);
  const B = (C) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    if (c.current = !1, k(C), !C) {
      const R = E.current, $ = z.current;
      R !== "custom" || $ ? (R !== t || $ !== e) && (s.current = !0, r(R, $)) : (f(t), y(e));
========
    if (d.current = !1, S(C), !C) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
      const A = E.current, U = z.current;
      A !== "custom" || U ? (A !== t || U !== e) && (s.current = !0, r(A, U)) : (f(t), y(e));
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    }
  }, X = (C) => {
    var R, $, V, A;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((R = i.current) == null || R.focus(), c.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? (($ = l.current) == null || $.focus(), c.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((V = i.current) == null ? void 0 : V.selectionStart) === 0 && ((A = l.current) == null || A.focus(), c.current = !1), w === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && B(!1);
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ m(We, { open: u, onOpenChange: B, children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Ze, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", className: "tw:h-6", children: oa(t, n, e) }) }) }),
      /* @__PURE__ */ o(Ct, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      Ye,
========
  return /* @__PURE__ */ p(Ze, { open: u, onOpenChange: B, children: [
========
      const A = E.current, J = H.current;
      A !== "custom" || J ? (A !== t || J !== e) && (s.current = !0, r(A, J)) : (f(t), y(e));
    }
  }, q = (C) => {
    var A, J, V, D;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((A = i.current) == null || A.focus(), d.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? ((J = l.current) == null || J.focus(), d.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((V = i.current) == null ? void 0 : V.selectionStart) === 0 && ((D = l.current) == null || D.focus(), d.current = !1), w === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && P(!1);
  };
  return /* @__PURE__ */ p(Qe, { open: u, onOpenChange: P, children: [
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(tr, { asChild: !0, children: /* @__PURE__ */ o(X, { variant: "outline", className: "tw:h-6", children: Ea(t, n, e) }) }) }),
      /* @__PURE__ */ o(Ct, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      er,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      {
        style: { zIndex: we },
        onEscapeKeyDown: () => {
          E.current = t, z.current = e, f(t), y(e);
        },
        onCloseAutoFocus: (C) => {
          s.current && (s.current = !1, C.preventDefault(), a());
        },
        onClick: () => {
          c.current && (c.current = !1);
        },
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        onKeyDown: X,
========
        onKeyDown: q,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        onMouseMove: () => {
          var C;
          c.current && ((C = i.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ o(rr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(nr, {}),
          /* @__PURE__ */ o(
            Vt,
            {
              checked: w === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ae })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Vt,
            {
              checked: w === "hidden",
              onCheckedChange: () => f("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Re })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Vt,
            {
              ref: l,
              checked: w === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                p.current = w === "custom";
              },
              onClick: (C) => {
                var R;
                if (C.stopPropagation(), p.current && C.target !== i.current) {
                  B(!1);
                  return;
                }
                c.current = !0, (R = i.current) == null || R.focus();
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  Xr,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), f("custom"), c.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: S,
                    onKeyDown: (C) => {
                      C.key === "Enter" || C.key === "ArrowUp" || C.key === "ArrowDown" || C.key === "ArrowLeft" || C.key === "ArrowRight" || C.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (C) => y(C.target.value)
                  }
                )
              ] })
            }
          )
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const sa = (t, e) => t === "f" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Gr, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(zr, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Br, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), ia = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Bn(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function la({
========
const _a = (t, e) => t === "f" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ o(Ue, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ o(Ke, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ o(He, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Ta = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), so(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function La({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = I(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ m(We, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Ze, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", className: "tw:h-6", children: sa(t, r) }) }) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: ia(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      Ye,
========
  return /* @__PURE__ */ p(Qe, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(tr, { asChild: !0, children: /* @__PURE__ */ o(X, { variant: "outline", className: "tw:h-6", children: _a(t, r) }) }) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: Ta(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(
      er,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      {
        style: { zIndex: we },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), a());
        },
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          /* @__PURE__ */ o(Qe, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(tr, {}),
          /* @__PURE__ */ m(
========
          /* @__PURE__ */ o(rr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(nr, {}),
          /* @__PURE__ */ p(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            Vt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(He, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Vt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ue, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Vt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ke, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const _r = '[aria-controls="editor-context-menu"]';
function ca(t) {
  return t ? t.matches(_r) ? !0 : !!t.querySelector(_r) : !1;
}
const pi = Object.freeze([
========
const Dr = '[aria-controls="editor-context-menu"]';
function Aa(t) {
  return t ? t.matches(Dr) ? !0 : !!t.querySelector(Dr) : !1;
}
const ji = Object.freeze([
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%",
  // These four keys are not read by this component directly; they are provided here so callers
  // can localize them and pass the result into the optional `searchPlaceholder` prop to override
  // the default search-field placeholder.
  "%markerMenu_searchPlaceholder_character%",
  "%markerMenu_searchPlaceholder_insert%",
  "%markerMenu_searchPlaceholder_newParagraph%",
  "%markerMenu_searchPlaceholder_paragraph%"
]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function da({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? kn, { className: e, size: 16 });
}
function ua({ state: t }) {
========
function Da({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? kn, { className: e, size: 16 });
}
function Ra({ state: t }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(ue, { size: 16 })
    }
  );
}
function Rr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    fe,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      onSelect: t.action,
      children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        t.selectionState !== void 0 && /* @__PURE__ */ o(ua, { state: t.selectionState }),
========
        t.selectionState !== void 0 && /* @__PURE__ */ o(Ra, { state: t.selectionState }),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(da, { icon: t.icon }) }) }),
        /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
========
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Da, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          /* @__PURE__ */ o("p", { className: "tw:min-w-0 tw:shrink tw:truncate tw:text-sm", title: t.title, children: t.title }),
          t.subtitle && /* @__PURE__ */ o(
            "p",
            {
              className: "tw:min-w-0 tw:shrink-[9999] tw:truncate tw:text-end tw:text-xs tw:text-muted-foreground",
              title: t.subtitle,
              children: t.subtitle
            }
          )
        ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(so, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
========
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(To, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function wa({
========
function Ma({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n
}) {
  const [a, s] = O(""), [i, l] = ut(() => {
    const c = xt(a.trim().toLowerCase());
    if (!c) {
      const S = e.filter((y) => !y.isDisallowed);
      return [S.length > 0 ? S : e, []];
    }
    const w = e.filter((S) => {
      var u;
      const y = (u = S.marker) == null ? void 0 : u.toLowerCase();
      return S.isDisallowed ? y === c : y == null ? void 0 : y.includes(c);
    }), f = e.filter(
      (S) => S.title.toLowerCase().includes(c) && !w.includes(S)
    );
    return [w, f];
  }, [a, e]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ m(Ue, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
========
  return /* @__PURE__ */ p($e, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    /* @__PURE__ */ o(
      qe,
      {
        className: "marker-menu-search",
        ref: r,
        value: a,
        onValueChange: (c) => s(c),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    /* @__PURE__ */ m(Fe, { children: [
      /* @__PURE__ */ o($e, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ce, { children: i.map((c) => {
========
    /* @__PURE__ */ p(Je, { children: [
      /* @__PURE__ */ o(Ve, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ce, { children: i.map((d) => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        var w;
        return /* @__PURE__ */ o(
          Rr,
          {
            item: c,
            localizedStrings: t
          },
          `item-${c.marker ?? ((w = c.icon) == null ? void 0 : w.displayName)}-${c.title.replaceAll(" ", "")}`
        );
      }) }),
      l.length > 0 && /* @__PURE__ */ m(gt, { children: [
        i.length > 0 && /* @__PURE__ */ o(Me, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ce, { children: l.map((c) => {
          var w;
          return /* @__PURE__ */ o(
            Rr,
            {
              item: c,
              localizedStrings: t
            },
            `item-${c.marker ?? ((w = c.icon) == null ? void 0 : w.displayName)}-${c.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function fa(t, e, r, n, a) {
========
function Oa(t, e, r, n, a) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (!n || n === "p") return [];
  const s = se[n], i = s != null && s.children ? s : a && se[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, c]) => {
    l.push(
      ...c.map((w) => ({
        marker: w,
        title: r[se[w].description] ?? se[w].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(w), e();
        }
      }))
    );
  }), l.sort((c, w) => (c.marker ?? c.title).localeCompare(w.marker ?? w.title));
}
function Mr(t) {
  if (!t || !qt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function pa(t) {
========
function Pa(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ma(t) {
========
function ja(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ha(t, e) {
========
function Ba(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  let r = 0, n = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const i = t[r];
      return n !== 0 || !i || !Gt(i, a) ? !1 : (r += 1, !0);
    }
    let s = a.insert;
    for (; s.length > 0; ) {
      const i = t[r];
      if (!i || typeof i.insert != "string" || !Gt(i.attributes, a.attributes))
        return !1;
      const l = i.insert.slice(n), c = Math.min(l.length, s.length);
      if (l.slice(0, c) !== s.slice(0, c)) return !1;
      s = s.slice(c), n += c, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ga(t) {
========
function Ga(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ba(t) {
========
function za(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const Na = 300, _e = "*", va = {
========
const Ha = 300, _e = "*", Ua = {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function mi({
========
function Bi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c,
  parentEditorRef: w,
  inline: f = !1,
  ref: S,
  initialCaretPosition: y,
  markerPalette: u,
  onNoteEdit: k
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  var gr;
  const p = I(null), E = I(null), z = I(null), B = I(s);
  F(() => {
    B.current = s;
  }, [s]);
  const X = I(y);
  F(() => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    X.current = y;
  }, [y]);
  const C = _(() => {
    var b, N;
    const d = X.current;
    d !== void 0 && d !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, d.utf16Offset, {
      field: d.field,
      glyph: d.glyph
    }) : (N = p.current) == null || N.selectNote(0);
========
    J.current = y;
========
  var xr;
  const m = I(null), E = I(null), H = I(null), P = I(s);
  K(() => {
    P.current = s;
  }, [s]);
  const q = I(y);
  K(() => {
    q.current = y;
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  }, [y]);
  const C = _(() => {
    var b, N;
    const c = q.current;
    c !== void 0 && c !== "end" ? (b = m.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (N = m.current) == null || N.selectNote(0);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  }, []);
  ae(() => {
    if (f || !z.current) return;
    const d = parseFloat(getComputedStyle(z.current).width);
    d > 0 && (z.current.style.width = `${d}px`);
  }, [f]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const [R, $] = O("generated"), [V, A] = O("generated"), [U, lt] = O(_e), [ft, It] = O(_e), [J, Pt] = O("f"), [Ut, _t] = O(!1), [G, at] = O(!0), [tt, ct] = O(!1), Tt = I(!1), jt = I(""), h = I(!1), L = I(void 0), H = I([]), Z = I([]), K = I(void 0), q = I(void 0), nr = _(() => {
    var b;
    const d = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    d != null && d.length && (H.current = [...H.current, ...d], K.current = void 0);
  }, []), or = _(
    (d, b) => {
      var x, D;
      if (!d) return;
      const N = Lr(d), v = Lr(b);
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  const [A, U] = O("generated"), [$, D] = O("generated"), [ot, lt] = O(Ie), [ft, _t] = O(Ie), [q, Pt] = O("f"), [Ut, It] = O(!1), [G, at] = O(!0), [Q, ct] = O(!1), Tt = _(!1), jt = _(""), h = _(!1), L = _(void 0), H = _([]), Z = _([]), K = _(void 0), V = _(void 0), nr = I(() => {
    var b;
    const c = (b = m.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (H.current = [...H.current, ...c], K.current = void 0);
  }, []), or = I(
========
  const [A, J] = O("generated"), [V, D] = O("generated"), [ot, lt] = O(_e), [ft, It] = O(_e), [F, Pt] = O("f"), [Ut, _t] = O(!1), [G, at] = O(!0), [Q, ct] = O(!1), Tt = I(!1), jt = I(""), h = I(!1), L = I(void 0), z = I([]), Z = I([]), U = I(void 0), $ = I(void 0), ir = _(() => {
    var b;
    const c = (b = m.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (z.current = [...z.current, ...c], U.current = void 0);
  }, []), lr = _(
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    (c, b) => {
      var x, R;
      if (!c) return;
      const N = Mr(c), v = Mr(b);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      if (!N && v) {
        K.current = {
          text: H.current,
          closedNoteOp: d,
          openNoteOp: b
        }, H.current = [];
        return;
      }
      const T = K.current;
      T && (N && !v && Gt(d, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((D = (x = p.current) == null ? void 0 : x.getOpsAfterNote(0)) != null && D.length) ? (H.current = T.text, K.current = void 0) : Gt(b, T.openNoteOp) || (K.current = void 0));
    },
    []
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ), [bt, te] = O(!1), be = ea(), [ar, nn] = O(), sr = I(null), mt = I(
    void 0
  ), on = I(0), ir = I(u);
========
  ), [bt, te] = O(!1), be = Sa(), [cr, on] = O(), dr = I(null), mt = I(
    void 0
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  ), nn = _(0), ir = _(u);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  F(() => {
    ir.current = u;
  }, [u]), F(
========
  ), an = I(0), ur = I(u);
  K(() => {
    ur.current = u;
  }, [u]), K(
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    () => () => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      var d;
      mt.current && (mt.current = void 0, (d = ir.current) == null || d.dismiss());
========
      var c;
      mt.current && (mt.current = void 0, (c = ur.current) == null || c.dismiss());
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    },
    []
  );
  const Ne = I(void 0), ve = I(void 0), ee = _(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    () => Uo(
      ve.current,
      en(
========
    () => da(
      ve.current,
      rn(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        () => {
          var d;
          return (d = p.current) == null ? void 0 : d.getUsj();
        },
        () => {
          var d;
          return (d = p.current) == null ? void 0 : d.getSelection();
        }
      )
    ),
    []
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ), { setSession: lr, clearSessionIfCurrent: re } = qo({
========
  ), { setSession: wr, clearSessionIfCurrent: re } = ma({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    sessionRef: mt,
    editorRef: p,
    baselineRef: ve
  }), Kt = _(() => {
    var b, N, v;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    if ((b = p.current) != null && b.getSelection()) return;
    const d = Ne.current;
    d ? (N = p.current) == null || N.setSelection(d) : (v = p.current) == null || v.selectNote(0);
  }, []), ne = _(() => {
    var d;
    Kt(), (d = p.current) == null || d.focus();
========
    if ((b = m.current) != null && b.getSelection()) return;
    const c = Ne.current;
    c ? (N = m.current) == null || N.setSelection(c) : (v = m.current) == null || v.selectNote(0);
  }, []), ne = _(() => {
    var c;
    Kt(), (c = m.current) == null || c.focus();
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  }, [Kt]), Lt = ut(
    () => ({
      ...i,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        ...i.view ?? Dn(),
========
        ...i.view ?? eo(),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        noteMode: "expanded",
        // The note's marker and caller are governed by this popover's two dropdowns, so they are
        // not text to type into — the same division Paratext 9 draws. Left editable they read as
        // editable and are not: the edit does not persist, and because the note-scoped rebuild
        // refuses a caller it cannot recognize, anything else typed into that slot goes with it
        // (a `\cat` category run typed after the caller was silently discarded). Atomic here
        // routes that typing to the note's CONTENT, which is where it belongs and where the
        // category folds from.
        isNoteShellEditable: !1,
        // The wrapper paragraph is scaffolding (see PARAGRAPH_USJ above): suppress its `\p`
        // marker prefix so the popover's text starts with the footnote's own first glyph.
        showParaMarkerPrefixes: !1
      }
    }),
    [i, l]
  ), xe = ut(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    () => fa(
      p,
      () => te(!1),
      c,
========
    () => Oa(
      m,
      () => te(!1),
      d,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      ar,
      J
    ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    [c, ar, J]
  );
  F(() => {
    var d;
    bt || (d = p.current) == null || d.focus();
  }, [J, bt]);
  const At = _(() => {
========
    [d, ar, q]
========
      cr,
      F
    ),
    [d, cr, F]
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  );
  F(() => {
    var c;
    bt || (c = m.current) == null || c.focus();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  }, [q, bt]);
  const At = I(() => {
========
  }, [F, bt]);
  const At = _(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    var v, T, x;
    const d = (v = E.current) == null ? void 0 : v.querySelector(".editor-input"), b = d == null ? void 0 : d.querySelector("span.note"), N = (x = (T = E.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : x.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), Bt = _(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    (d = !1) => {
      var N, v, T, x, D;
      k == null || k();
      const b = (v = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : v.at(0);
      if (b && Jt("note", b) && (r == null || r([b]), d && w && B.current)) {
        const P = [
          ...H.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], Y = Z.current, Nt = !Gt(P, Y);
        if (f && !Nt && Gt(b, L.current))
          return;
        L.current = b;
        const et = [b];
        Nt && (Y.length > 0 && ha(
          ((x = w.current) == null ? void 0 : x.getOpsAfterNote(B.current)) ?? [],
          Y
        ) && et.push({ delete: ma(Y) }), et.push(...P), Z.current = P), (D = w.current) == null || D.replaceEmbedUpdate(B.current, et);
      }
    },
    [f, r, k, w]
  ), ye = _(
    (d) => {
========
    (c = !1) => {
      var N, v, T, x, R;
      S == null || S();
      const b = (v = (N = m.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : v.at(0);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
      if (b && Jt("note", b) && (r == null || r([b]), c && w && B.current)) {
        const P = [
          ...H.current,
========
      if (b && qt("note", b) && (r == null || r([b]), c && w && P.current)) {
        const j = [
          ...z.current,
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          ...((T = m.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], W = Z.current, Nt = !Gt(P, W);
        if (f && !Nt && Gt(b, L.current))
          return;
        L.current = b;
        const tt = [b];
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
        Nt && (W.length > 0 && pa(
          ((x = w.current) == null ? void 0 : x.getOpsAfterNote(B.current)) ?? [],
          W
        ) && tt.push({ delete: fa(W) }), tt.push(...P), Z.current = P), (R = w.current) == null || R.replaceEmbedUpdate(B.current, tt);
========
        Nt && (W.length > 0 && Ba(
          ((x = w.current) == null ? void 0 : x.getOpsAfterNote(P.current)) ?? [],
          W
        ) && tt.push({ delete: ja(W) }), tt.push(...j), Z.current = j), (R = w.current) == null || R.replaceEmbedUpdate(P.current, tt);
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      }
    },
    [f, r, S, w]
  ), ye = _(
    (c) => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      var N, v, T;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (v = p.current) == null || v.applyUpdate([d, { delete: 1 }]), b && ((T = p.current) == null || T.setSelection(b)), ne();
    },
    [ne]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ), cr = _(
    (d, b) => {
      var T, x, D;
      mt.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const N = (D = (x = p.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : D.at(0);
      if (!N || !Jt("note", N) || !N.insert.note) return;
========
  ), fr = _(
    (c, b) => {
      var T, x, R;
      mt.current || (T = m.current) == null || T.commitPendingMarkerEdits();
      const N = (R = (x = m.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : R.at(0);
      if (!N || !qt("note", N) || !N.insert.note) return;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      let v;
      d === "custom" ? v = b : d === "generated" ? v = Ae : v = Re, N.insert.note.caller !== v && (N.insert.note.caller = v, ye(N));
    },
    [ye]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ), Ft = I(void 0), Se = I(Bt);
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  ), Ft = _(void 0), Se = _(Bt);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  F(() => {
========
  ), Ft = I(void 0), Se = I(Bt);
  K(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    Se.current = Bt;
  }, [Bt]);
  const $t = _(() => {
    Ft.current !== void 0 && (clearTimeout(Ft.current), Ft.current = void 0);
  }, []), ht = _(() => {
    Ft.current !== void 0 && ($t(), Se.current(!0));
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  }, [$t]), dr = _(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, Se.current(!0);
    }, Na);
========
  }, [$t]), pr = _(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, Se.current(!0);
    }, Ha);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  }, [$t]);
  F(() => {
    var T, x;
    let d, b, N;
    Tt.current = !1, h.current = !1, Ne.current = void 0, at(!0);
    const v = e == null ? void 0 : e.at(0);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    if (L.current = v, H.current = [], Z.current = [], K.current = void 0, q.current = void 0, v && Jt("note", v)) {
      const D = (T = v.insert.note) == null ? void 0 : T.caller;
      let P = "custom";
      D === Ae ? P = "generated" : D === Re && (P = "hidden");
      const Y = P === "custom" && D !== void 0 ? D : _e;
      lt(Y), It(Y), $(P), A(P), Pt(((x = v.insert.note) == null ? void 0 : x.style) ?? "f"), d = setTimeout(() => {
        var et, st, vt, Rt;
        const Nt = (st = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : st.at(0);
        (vt = p.current) == null || vt.applyUpdate(Nt ? [v, { delete: 1 }] : [v]), C(), (Rt = p.current) == null || Rt.focus(), b = requestAnimationFrame(() => {
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
    if (L.current = v, H.current = [], Z.current = [], K.current = void 0, V.current = void 0, v && Jt("note", v)) {
      const R = (T = v.insert.note) == null ? void 0 : T.caller;
      let P = "custom";
      R === Ae ? P = "generated" : R === De && (P = "hidden");
      const W = P === "custom" && R !== void 0 ? R : Ie;
      lt(W), _t(W), U(P), D(P), Pt(((x = v.insert.note) == null ? void 0 : x.style) ?? "f"), c = setTimeout(() => {
========
    if (L.current = v, z.current = [], Z.current = [], U.current = void 0, $.current = void 0, v && qt("note", v)) {
      const R = (T = v.insert.note) == null ? void 0 : T.caller;
      let j = "custom";
      R === Ae ? j = "generated" : R === De && (j = "hidden");
      const W = j === "custom" && R !== void 0 ? R : _e;
      lt(W), It(W), J(j), D(j), Pt(((x = v.insert.note) == null ? void 0 : x.style) ?? "f"), c = setTimeout(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        var tt, st, vt, Dt;
        const Nt = (st = (tt = m.current) == null ? void 0 : tt.getNoteOps(0)) == null ? void 0 : st.at(0);
        (vt = m.current) == null || vt.applyUpdate(Nt ? [v, { delete: 1 }] : [v]), C(), (Dt = m.current) == null || Dt.focus(), b = requestAnimationFrame(() => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          N = setTimeout(() => {
            var Dt;
            At() || (C(), (Dt = p.current) == null || Dt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      ht(), X.current = void 0, d && clearTimeout(d), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, ht, At, C]), ae(() => () => ht(), [ht]);
  const ur = _(() => {
    var d;
    h.current && (mt.current || (d = p.current) == null || d.commitPendingMarkerEdits(), ht());
  }, [ht]);
  Nn(
    S,
========
      ht(), q.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, ht, At, C]), ae(() => () => ht(), [ht]);
  const mr = _(() => {
    var c;
    h.current && (mt.current || (c = m.current) == null || c.commitPendingMarkerEdits(), ht());
  }, [ht]);
  vn(
    k,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    () => ({
      flushPendingEdits: mr,
      focus: () => {
        var d;
        return (d = p.current) == null ? void 0 : d.focus();
      },
      containsFocus: () => {
        const d = z.current;
        return !!d && d.contains(d.ownerDocument.activeElement);
      }
    }),
    [mr]
  );
  const ke = _(() => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    var d, b;
========
    var c, b;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    if (!mt.current) {
      const N = (d = E.current) == null ? void 0 : d.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    f ? ht() : ($t(), Bt(!0)), n();
  }, [$t, ht, f, n, Bt]), Ce = I(ke);
  ae(() => {
    Ce.current = ke;
  });
  const Ee = I({ book: a.book, chapterNum: a.chapterNum });
  ae(() => {
    (Ee.current.book !== a.book || Ee.current.chapterNum !== a.chapterNum) && (Ee.current = { book: a.book, chapterNum: a.chapterNum }, Ce.current());
  }, [a.book, a.chapterNum]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const an = async () => {
    var N;
    const d = (N = E.current) == null ? void 0 : N.getElementsByClassName("editor-input")[0];
    if (!(d != null && d.textContent)) return;
    const b = Gn(d.textContent, i.copyLimit);
========
  const sn = async () => {
    var N;
    const c = (N = E.current) == null ? void 0 : N.getElementsByClassName("editor-input")[0];
    if (!(c != null && c.textContent)) return;
    const b = io(c.textContent, i.copyLimit);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    if (b)
      try {
        await navigator.clipboard.writeText(b);
      } catch (v) {
        console.warn(`Could not copy the footnote to the clipboard: ${kr(v)}`);
      }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  }, sn = _(
    (d, b) => {
      k == null || k(), $(d), lt(b), cr(d, b), f && ht();
    },
    [cr, ht, f, k]
  ), ln = (d) => {
    var N, v, T, x, D;
    Pt(d), mt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (T = (v = p.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && Jt("note", b)) {
      b.insert.note && (b.insert.note.style = d);
      const P = (D = (x = b.insert.note) == null ? void 0 : x.contents) == null ? void 0 : D.ops;
      J !== "x" && d === "x" ? P == null || P.forEach((Y) => ga(Y)) : J === "x" && d !== "x" && (P == null || P.forEach((Y) => ba(Y))), ye(b), f && ht();
    }
  }, cn = (d) => {
    nn(d.contextMarker), ct(d.canRedo);
  }, dn = _(
    (d) => {
      var N, v, T, x, D, P, Y;
      const b = (v = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : v.at(0);
      if (b && Jt("note", b)) {
        d.content.length > 1 && setTimeout(() => {
========
  }, ln = _(
    (c, b) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
      S == null || S(), U(c), lt(b), cr(c, b), f && ht();
========
      S == null || S(), J(c), lt(b), fr(c, b), f && ht();
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    },
    [fr, ht, f, S]
  ), cn = (c) => {
    var N, v, T, x, R;
    Pt(c), mt.current || (N = m.current) == null || N.commitPendingMarkerEdits();
    const b = (T = (v = m.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
      const P = (R = (x = b.insert.note) == null ? void 0 : x.contents) == null ? void 0 : R.ops;
      q !== "x" && c === "x" ? P == null || P.forEach((W) => ma(W)) : q === "x" && c !== "x" && (P == null || P.forEach((W) => ha(W))), ye(b), f && ht();
========
      const j = (R = (x = b.insert.note) == null ? void 0 : x.contents) == null ? void 0 : R.ops;
      F !== "x" && c === "x" ? j == null || j.forEach((W) => Ga(W)) : F === "x" && c !== "x" && (j == null || j.forEach((W) => za(W))), ye(b), f && ht();
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    }
  }, dn = (c) => {
    on(c.contextMarker), ct(c.canRedo);
  }, un = _(
    (c) => {
      var N, v, T, x, R, P, W;
      const b = (v = (N = m.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : v.at(0);
      if (b && qt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        const Nt = (T = b.insert.note) == null ? void 0 : T.style, et = (D = (x = b.insert.note) == null ? void 0 : x.contents) == null ? void 0 : D.ops;
        if (Nt || _t(!1), _t(
          Nt === "x" ? !!(et != null && et.every((st) => {
            var Rt, Dt;
            if (!((Rt = st.attributes) != null && Rt.char)) return !0;
            const vt = ((Dt = st.attributes) == null ? void 0 : Dt.char).style;
========
        const Nt = (T = b.insert.note) == null ? void 0 : T.style, tt = (R = (x = b.insert.note) == null ? void 0 : x.contents) == null ? void 0 : R.ops;
        if (Nt || _t(!1), _t(
          Nt === "x" ? !!(tt != null && tt.every((st) => {
            var Dt, Rt;
            if (!((Dt = st.attributes) != null && Dt.char)) return !0;
            const vt = ((Rt = st.attributes) == null ? void 0 : Rt.char).style;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            return vt === "xt" || vt === "xo" || vt === "xq";
          })) : !!(et != null && et.every((st) => {
            var Rt, Dt;
            if (!((Rt = st.attributes) != null && Rt.char)) return !0;
            const vt = ((Dt = st.attributes) == null ? void 0 : Dt.char).style;
            return vt === "ft" || vt === "fr" || vt === "fq";
          }))
        ), !Tt.current) {
          Tt.current = !0, jt.current = JSON.stringify(b), q.current = b, at(!0);
          return;
        }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        h.current = !0, or(q.current, b), q.current = b, (Y = (P = p.current) == null ? void 0 : P.getOpsAfterNote(0)) != null && Y.length && setTimeout(nr, 0), at(JSON.stringify(b) === jt.current), Bt(), f && dr();
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
        h.current = !0, or(V.current, b), V.current = b, (W = (P = m.current) == null ? void 0 : P.getOpsAfterNote(0)) != null && W.length && setTimeout(nr, 0), at(JSON.stringify(b) === jt.current), Bt(), f && dr();
========
        h.current = !0, lr($.current, b), $.current = b, (W = (j = m.current) == null ? void 0 : j.getOpsAfterNote(0)) != null && W.length && setTimeout(ir, 0), at(JSON.stringify(b) === jt.current), Bt(), f && pr();
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      } else
        _t(!1), at(!0);
    },
    [
      f,
      Bt,
      pr,
      lr,
      ir
    ]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ), wr = _(() => {
    const d = window.getSelection();
    if (!xe.length || !d || d.rangeCount === 0)
========
  ), hr = _(() => {
    const c = window.getSelection();
    if (!xe.length || !c || c.rangeCount === 0)
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      return;
    const b = E.current;
    if (!b) return;
    const N = d.getRangeAt(0).cloneRange();
    be.setSource({
      measure: () => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        const v = ra(N);
        return v && na(v);
========
        const v = ka(N);
        return v && Ca(v);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      },
      contextElement: b
    }), te(!0);
  }, [xe, be]), Ie = I(() => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  }), fr = _(
    (d, b, N) => {
      const { anchorRect: v } = d;
      if (!u || !v) return;
      const { hasTextSelection: T } = N;
      Ko({
========
  }), gr = _(
    (c, b, N) => {
      const { anchorRect: v } = c;
      if (!u || !v) return;
      const { hasTextSelection: T } = N;
      ua({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: T ? "selection" : "backslash",
        // The Space note rule: when the typed filter names a NOTE marker in the stylesheet, Space
        // commits that marker if this list OFFERS it and inserts NOTHING if it does not. This
        // popover's list offers note-INTERNAL markers only, so a typed `\f` always takes the second
        // branch — which is the point of the rule here: materializing it would make a NESTED `\f `
        // literal, and the Tier-2 tokenizer would absorb the following word into it as a caller
        // just as it does in body text. Decided from the stylesheet rather than from the offered
        // items for exactly that reason.
        // Same stylesheet the items come from: while the data provider is loading, or after it
        // errors, `styleInfo` is undefined and the list is built from the default, so reading the
        // raw value here would turn the rule off exactly when it is needed.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        isNoteMarker: (x) => Mo(Lt.styleInfo ?? Nr, x),
        sessionCounterRef: on,
        setSession: lr,
========
        isNoteMarker: (x) => ra(Lt.styleInfo ?? Sr, x),
        sessionCounterRef: an,
        setSession: wr,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        clearSessionIfCurrent: re,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (x) => Ie.current(x),
        show: (x) => u.show({
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          items: b.map(pa),
========
          items: b.map(Pa),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          anchor: v,
          keyForwarding: x
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ee,
        focusEditor: () => {
          var x;
          return (x = p.current) == null ? void 0 : x.focus();
        },
        applyItem: (x) => {
          var D;
          return (D = p.current) == null ? void 0 : D.applyMarkerMenuSelection(x, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (x) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          (!zn(x) || x.code !== Hn) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${vr(x)}`
========
          (!lo(x) || x.code !== co) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${kr(x)}`
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          );
        }
      });
    },
    [
      u,
      Kt,
      ee,
      Lt.styleInfo,
      wr,
      re
    ]
  ), oe = _(() => {
    var N;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    const d = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!d) return !1;
    const b = Mn(Lt.styleInfo ?? Nr, d);
    return b.length === 0 ? !1 : (fr(d, b, { hasTextSelection: !!d.hasTextSelection }), !0);
  }, [fr, Lt.styleInfo]);
  $o({
    isSessionOpen: _(() => !!mt.current, []),
    dismiss: _(() => u == null ? void 0 : u.dismiss(), [u])
  });
  const pr = _(
    (d) => {
      if (!u) return;
      Fo(d, {
========
    const c = (N = m.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = ro(Lt.styleInfo ?? Sr, c);
    return b.length === 0 ? !1 : (gr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [gr, Lt.styleInfo]);
  fa({
    isSessionOpen: _(() => !!mt.current, []),
    dismiss: _(() => u == null ? void 0 : u.dismiss(), [u])
  });
  const br = _(
    (c) => {
      if (!u) return;
      wa(c, {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        sessionRef: mt,
        editorRef: p,
        palette: u,
        restoreCaret: Kt,
        reopenAtCaret: oe,
        clearSessionIfCurrent: re,
        hasEditorChangedSinceFocus: ee
      }) === "no-session" && u.dismiss();
    },
    [
      u,
      oe,
      Kt,
      re,
      ee
    ]
  );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  F(() => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    Ie.current = pr;
  }, [pr]), Jo({
========
    _e.current = pr;
  }, [pr]), Fo({
========
  K(() => {
    Ie.current = br;
  }, [br]), pa({
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    containerRef: E,
    editorRef: p,
    selectionRef: Ne,
    baselineRef: ve,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    isSessionOpen: _(() => !!mt.current, [])
  }), F(() => {
    const d = () => {
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
    isSessionOpen: I(() => !!mt.current, [])
  }), F(() => {
========
    isSessionOpen: _(() => !!mt.current, [])
  }), K(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    const c = () => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      bt && te(!1);
    };
    return window.addEventListener("click", d), () => {
      window.removeEventListener("click", d);
    };
  }, [bt]), F(() => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    var d;
    bt && ((d = sr.current) == null || d.focus());
========
    var c;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
    bt && ((c = sr.current) == null || c.focus());
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  }, [bt]), F(() => {
========
    bt && ((c = dr.current) == null || c.focus());
  }, [bt]), K(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    var N;
    const d = () => {
      var v;
      return ((v = E.current) == null ? void 0 : v.querySelector(".editor-input")) ?? void 0;
    };
    if (((N = Lt.view) == null ? void 0 : N.markerMode) === "editable") {
      const v = (x) => {
        var Y, Nt, et, st;
        if (je(x)) return;
        const D = mt.current, P = d();
        if (!(!P || document.activeElement !== P)) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          if (D && u) {
            Ie.current(x);
            return;
          }
          if (ca(E.current)) {
========
          if (R && u) {
            Ie.current(x);
            return;
          }
          if (Aa(E.current)) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            x.key === l && (x.preventDefault(), x.stopPropagation());
            return;
          }
          if (x.key === "Enter" && !At()) {
            x.preventDefault(), x.stopPropagation(), (Y = p.current) == null || Y.selectNote(0), (Nt = p.current) == null || Nt.focus();
            return;
          }
          if (u && x.key === l) {
            if (!At()) {
              x.preventDefault(), x.stopPropagation(), (et = p.current) == null || et.selectNote(0), (st = p.current) == null || st.focus();
              return;
            }
            oe() && (x.preventDefault(), x.stopPropagation());
          }
        }
      }, T = () => {
        var D, P;
        const x = d();
        !x || document.activeElement !== x || At() || ((D = p.current) == null || D.selectNote(0), (P = p.current) == null || P.focus());
      };
      return document.addEventListener("keydown", v, { capture: !0 }), document.addEventListener("paste", T, { capture: !0 }), () => {
        document.removeEventListener("keydown", v, { capture: !0 }), document.removeEventListener("paste", T, { capture: !0 });
      };
    }
    const b = (v) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      const T = d();
      !bt && T && document.activeElement === T && v.key === l ? (v.preventDefault(), wr()) : bt && v.key === "Escape" && (v.preventDefault(), te(!1));
========
      const T = c();
      !bt && T && document.activeElement === T && v.key === l ? (v.preventDefault(), hr()) : bt && v.key === "Escape" && (v.preventDefault(), te(!1));
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    };
    return document.addEventListener("keydown", b), () => {
      document.removeEventListener("keydown", b);
    };
  }, [
    bt,
    hr,
    l,
    (xr = Lt.view) == null ? void 0 : xr.markerMode,
    Lt.styleInfo,
    u,
    oe,
    At
  ]), F(() => {
    const d = z.current;
    if (!f || !d) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || je(N) || (N.preventDefault(), N.stopPropagation(), Ce.current());
    };
    return d.addEventListener("keydown", b), () => d.removeEventListener("keydown", b);
  }, [f]), F(() => {
    const d = () => {
      var v, T, x;
      const b = ((v = E.current) == null ? void 0 : v.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || At() || ((T = p.current) == null || T.selectNote(0), (x = p.current) == null || x.focus());
    };
    return document.addEventListener("pointerup", d), document.addEventListener("selectionchange", d), () => {
      document.removeEventListener("pointerup", d), document.removeEventListener("selectionchange", d);
    };
  }, [At]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const mr = c["%footnoteEditor_copyButton_tooltip%"], hr = /* @__PURE__ */ o(
    Qo,
========
  const Nr = d["%footnoteEditor_copyButton_tooltip%"], vr = /* @__PURE__ */ o(
    xa,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    {
      onUndoClick: () => {
        var d;
        return (d = p.current) == null ? void 0 : d.undo();
      },
      onRedoClick: () => {
        var d;
        return (d = p.current) == null ? void 0 : d.redo();
      },
      canUndo: !G,
      canRedo: tt,
      localizedStrings: c
    }
  );
  return /* @__PURE__ */ m(gt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: z,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
                la,
                {
                  isTypeSwitchable: Ut,
                  noteType: J,
                  handleNoteTypeChange: ln,
                  localizedStrings: c,
========
                La,
                {
                  isTypeSwitchable: Ut,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
                  noteType: q,
                  handleNoteTypeChange: sn,
========
                  noteType: F,
                  handleNoteTypeChange: cn,
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                  localizedStrings: d,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                  focusNoteText: ne
                }
              ),
              /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
                aa,
                {
                  callerType: R,
                  customCaller: U,
                  updateCaller: sn,
                  localizedStrings: c,
========
                Ia,
                {
                  callerType: A,
                  customCaller: ot,
                  updateCaller: ln,
                  localizedStrings: d,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                  focusNoteText: ne
                }
              ),
              f && vr
            ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(qe, { children: [
              hr,
              /* @__PURE__ */ o(
                Co,
========
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ p(Ze, { children: [
              vr,
              /* @__PURE__ */ o(
                Jo,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                {
                  onCancelClick: n,
                  onAcceptClick: ke,
                  canAccept: !G || V !== R || R === "custom" && U !== ft,
                  localizedStrings: c,
                  acceptLabel: c["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ m(
            "div",
            {
              ref: E,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
                  ta,
========
                  ya,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                  {
                    editorRef: p,
                    canUndo: !G,
                    canRedo: tt,
                    children: /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
                      On,
                      {
                        options: Lt,
                        onStateChange: cn,
                        onUsjChange: dn,
                        defaultUsj: va,
========
                      no,
                      {
                        options: Lt,
                        onStateChange: dn,
                        onUsjChange: un,
                        defaultUsj: Ua,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
                  /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
                    W,
                    {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
                      "aria-label": mr,
                      onClick: an,
========
                      "aria-label": Nr,
                      onClick: sn,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Cn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: Nr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    /* @__PURE__ */ m(Ve, { open: bt, children: [
      /* @__PURE__ */ o(No, { virtualRef: be.virtualRef }),
========
    /* @__PURE__ */ p(We, { open: bt, children: [
      /* @__PURE__ */ o(Ho, { virtualRef: be.virtualRef }),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      /* @__PURE__ */ o(
        Ye,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (d) => {
            d.preventDefault(), d.stopPropagation();
          },
          children: /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
            wa,
            {
              markerMenuItems: xe,
              localizedStrings: c,
              searchRef: sr
========
            Ma,
            {
              markerMenuItems: xe,
              localizedStrings: d,
              searchRef: dr
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            }
          )
        }
      )
    ] })
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function xa(t) {
========
const or = {
  "refresh-cw": Vn,
  download: Jn,
  house: qn,
  "book-a": $n,
  settings: Fn,
  "circle-question-mark": Kn,
  "external-link": Un,
  users: Hn,
  "book-copy": zn,
  pencil: Gn,
  eye: Bn,
  "zoom-in": jn,
  "zoom-out": Pn,
  scan: On,
  "file-text": Mn,
  "panel-bottom": Rn,
  "message-square-plus": Dn,
  "square-function": Ue,
  "square-x": He,
  "square-sigma": Ke,
  book: An,
  "book-marked": Ln,
  library: Tn,
  search: Ur,
  "message-square": _n,
  "circle-check-big": In,
  sparkles: En
}, Gi = Object.keys(or);
function Ka(t) {
  return t !== void 0 && Object.hasOwn(or, t);
}
function zi({ name: t, className: e }) {
  const r = Ka(t) ? or[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function Fa(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = it(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Or(t, e, r) {
  const n = it(e);
  return t.some(
    (a) => it(a.projectId) === n && a.scrollGroupId === r
  );
}
function Te(t) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const e = xa(t.openTabs);
========
  const e = Fa(t.openTabs);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : it(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(it(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: a !== void 0 && a === it(s.id),
        isMuted: i.length === 0,
        isBoundButClosed: !1,
        isDisabled: s.isDisabled === !0,
        disabledReason: s.disabledReason,
        project: s
      };
    });
  }
  let r = [];
  t.mode === "project-multi" ? r = t.selection.pairs : t.selection.projectId !== void 0 && (r = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const n = [];
  return t.projects.forEach((a) => {
    const s = e.get(it(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Or(r, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
      return;
    }
    s.forEach((i) => {
      n.push({
        rowKey: `tab:${a.id}:${i.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Or(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = it(a.projectId);
    if (n.some(
      (l) => it(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => it(l.id) === s);
    i && n.push({
      rowKey: `closed:${i.id}:${a.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: i.isDisabled === !0,
      disabledReason: i.disabledReason,
      project: i
    });
  }), n;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const er = "Selected", rr = "Unselected";
function Rr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Un(t, e);
========
const ar = "Selected", sr = "Unselected";
function Pr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = uo(t, e);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Be(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ya(t) {
  const e = t.filter(Rr).sort(zt), r = t.filter((a) => !Rr(a)).sort(zt);
========
function $a(t) {
  const e = t.filter(Pr).sort(zt), r = t.filter((a) => !Pr(a)).sort(zt);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Sa(t, e) {
========
function qa(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var w;
    const c = (w = e.getSectionHeading) == null ? void 0 : w.call(
      e,
      i,
      l.map((f) => f.project)
    );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    return typeof c == "string" && c.length > 0 ? c : i === "selected" ? er : rr;
========
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? ar : sr;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  }, s = [];
  return r.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: a("selected", r),
    rows: r
  }), n.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: a("unselected", n),
    rows: n
  }), s;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function ka(t, e) {
  if (e.id === "openTabs") return ya(t);
  if (e.id === "selection") return Sa(t, e);
========
function Ja(t, e) {
  if (e.id === "openTabs") return $a(t);
  if (e.id === "selection") return qa(t, e);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (!e.getGroupKey) return Be(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const c = a(l.project);
    if (c === void 0 || c === "") {
      n.push(l);
      return;
    }
    const w = r.get(c);
    w ? w.push(l) : r.set(c, [l]);
  });
  const s = [...r.entries()].map(([l, c]) => {
    var S;
    const w = [...c].sort(
      (y, u) => {
        var k;
        return ((k = e.compareProjects) == null ? void 0 : k.call(e, y.project, u.project)) || zt(y, u);
      }
    ), f = ((S = e.getSectionHeading) == null ? void 0 : S.call(
      e,
      l,
      w.map((y) => y.project)
    )) ?? l;
    return { key: l, heading: f, rows: w };
  });
  s.sort((l, c) => l.key === e.priorityKey ? -1 : c.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: c.key, heading: c.heading }
  ) : l.heading.localeCompare(c.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: c, rows: w }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: c,
    rows: w,
    isPriority: l === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(zt)
  }), i;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const hi = [
========
const Hi = [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
function j(t, e) {
  const r = t[e];
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  if (!(typeof r != "string" || !Zr(r)))
    return r;
}
const ie = "recent", Ca = "other";
function rn(t) {
========
  if (!(typeof r != "string" || !Qr(r)))
    return r;
}
const ie = "recent", Va = "other";
function nn(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ea(t) {
  const e = t ?? {};
  return [
    rn(e.openTabsLabel),
========
function Xa(t) {
  const e = t ?? {};
  return [
    nn(e.openTabsLabel),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? ie : Ca;
========
        return typeof ((n = r.customData) == null ? void 0 : n[Zt.lastUsedAt]) == "number" ? ie : Va;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      },
      getSectionHeading: (r) => r === ie ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === ie ? -1 : n.key === ie ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Wt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Wt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (l) => {
            var c;
            return typeof ((c = l.customData) == null ? void 0 : c[Wt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Wt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const gi = Ea();
function Ia(t) {
========
const Ui = Xa();
function Za(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? ar : e.unselectedSectionHeading ?? sr
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function bi(t) {
========
function Ki(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return {
    openTabsLabel: j(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: j(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: j(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: j(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: j(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: j(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: j(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: j(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ni(t) {
========
function Fi(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return {
    label: j(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const _a = 100, nt = {
========
const Wa = 100, rt = {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
  autoSelectionSelectedSectionHeading: ar,
  autoSelectionUnselectedSectionHeading: sr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ta(t) {
========
function Ya(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : rt(e.ariaLabel, nt.ariaLabel),
    buttonPlaceholder: rt(
      e.buttonPlaceholder,
      nt.buttonPlaceholder
    ),
    commandEmptyMessage: rt(
      e.commandEmptyMessage,
      nt.commandEmptyMessage
    ),
    searchPlaceholder: rt(
      e.searchPlaceholder,
      nt.searchPlaceholder
    ),
    groupByAriaLabel: rt(
      e.groupByAriaLabel,
      nt.groupByAriaLabel
    ),
    groupSectionLabel: rt(
      e.groupSectionLabel,
      nt.groupSectionLabel
    ),
    groupByNone: rt(
      e.groupByNone,
      nt.groupByNone
    ),
    openTabsSectionHeading: rt(
      e.openTabsSectionHeading,
      nt.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: rt(
      e.otherProjectsSectionHeading,
      nt.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: rt(
      e.autoOpenTabsGroupingLabel,
      nt.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: rt(
      e.autoSelectionGroupingLabel,
      nt.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: rt(
      e.autoSelectionSelectedSectionHeading,
      nt.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: rt(
      e.autoSelectionUnselectedSectionHeading,
      nt.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: rt(
      e.boundButClosedTooltip,
      nt.boundButClosedTooltip
    ),
    openButtonLabel: rt(
      e.openButtonLabel,
      nt.openButtonLabel
    ),
    clearAll: rt(e.clearAll, nt.clearAll)
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function vi(t) {
========
function $i(t) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return {
    searchPlaceholder: j(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: j(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: j(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: j(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: j(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: j(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: j(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: j(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: j(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: j(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: j(t, "%projectSelector_openButtonLabel%"),
    clearAll: j(t, "%projectSelector_clearAll%")
  };
}
function Qt(t) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return wo[Kn(t)] ?? String(t);
}
const Dr = "platform.footerAction", La = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Aa({ scrollGroupId: t, isBoundButClosed: e }) {
========
  return Mo[wo(t)] ?? String(t);
}
const jr = "platform.footerAction", Qa = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ts({ scrollGroupId: t, isBoundButClosed: e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    de,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      style: La,
========
      style: Qa,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      children: r
    }
  ) : /* @__PURE__ */ o(de, { variant: "secondary", children: r });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ra({
========
function es({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  row: t,
  mode: e,
  strings: r,
  onClick: n,
  onOpen: a,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: c,
    open: w,
    onPointerEnter: f,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    onPointerLeave: S
  } = So(), [y, u] = O(!1), k = vn(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, z = w || y, B = _(() => {
    if (E) {
========
    onPointerLeave: k
  } = $o(), [y, u] = O(!1), S = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || t.isDisabled && !!t.disabledReason, m = w || y, E = _(() => {
    if (S) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      u(!0);
      return;
    }
    f();
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  }, [E, f]), X = _(() => {
    u(!1), S();
  }, [S]), C = /* @__PURE__ */ o(ue, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let R;
  e === "project" ? t.openGroups.length > 0 && (R = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((U) => /* @__PURE__ */ o(de, { variant: "secondary", children: Qt(U) }, U)) })) : t.scrollGroupId !== void 0 && (R = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Aa,
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  }, [S, f]), z = I(() => {
    u(!1), k();
  }, [k]), B = /* @__PURE__ */ o(ue, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let J;
  e === "project" ? t.openGroups.length > 0 && (J = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map(($) => /* @__PURE__ */ o(de, { variant: "secondary", children: Qt($) }, $)) })) : t.scrollGroupId !== void 0 && (J = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
========
  }, [S, f]), H = _(() => {
    u(!1), k();
  }, [k]), P = /* @__PURE__ */ o(ue, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let q;
  e === "project" ? t.openGroups.length > 0 && (q = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((V) => /* @__PURE__ */ o(de, { variant: "secondary", children: Qt(V) }, V)) })) : t.scrollGroupId !== void 0 && (q = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    /* @__PURE__ */ o(
      ts,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      W,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (U) => {
          U.stopPropagation(), a(t);
        },
        onMouseDown: (U) => U.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          /* @__PURE__ */ o(In, { className: "tw:h-3 tw:w-3" }),
========
          /* @__PURE__ */ o(Zn, { className: "tw:h-3 tw:w-3" }),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const $ = /* @__PURE__ */ m(
    fe,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: B,
      onPointerLeave: X,
      ...p && { "aria-describedby": k },
      className: g(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: C }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: c,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
              Fn(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        R,
        p && /* @__PURE__ */ o("span", { id: k, hidden: !0, children: t.disabledReason })
      ]
    }
  ), V = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, A = t.isBoundButClosed && V ? r.boundButClosedTooltip.replace("{group}", V) : void 0;
  return /* @__PURE__ */ m(St, { open: z, delayDuration: 400, children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: $ }),
    /* @__PURE__ */ m(
========
              fo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        q
      ]
    }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  ), A = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, U = t.isBoundButClosed && A ? r.boundButClosedTooltip.replace("{group}", A) : void 0;
========
  ), A = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, J = t.isBoundButClosed && A ? r.boundButClosedTooltip.replace("{group}", A) : void 0;
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ p(St, { open: m, delayDuration: 400, children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: C }),
    /* @__PURE__ */ p(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      Ct,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Ur(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && V && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
========
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Fr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && A && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              V,
              ")"
            ] })
          ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          A && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: A }),
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
          U && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: U }),
========
          J && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: J }),
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Da({
========
function rs({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ m(We, { children: [
    /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Ze, { asChild: !0, children: /* @__PURE__ */ o(
        W,
========
  return /* @__PURE__ */ p(Qe, { children: [
    /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(tr, { asChild: !0, children: /* @__PURE__ */ o(
        X,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        {
          variant: "ghost",
          size: "sm",
          className: g(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": n.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          children: /* @__PURE__ */ o(En, { className: "tw:h-4 tw:w-4" })
========
          children: /* @__PURE__ */ o(Xn, { className: "tw:h-4 tw:w-4" })
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        }
      ) }) }),
      /* @__PURE__ */ o(Ct, { children: n.groupByAriaLabel })
    ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
    /* @__PURE__ */ m(
      Ye,
========
    /* @__PURE__ */ p(
      er,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: we },
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
          /* @__PURE__ */ o(Qe, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(ko, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Sr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(tr, {}),
            t.map((s) => /* @__PURE__ */ o(Sr, { value: s.id, children: s.label }, s.id))
========
          /* @__PURE__ */ o(rr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ p(qo, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Ir, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(nr, {}),
            t.map((s) => /* @__PURE__ */ o(Ir, { value: s.id, children: s.label }, s.id))
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
          ] })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ma(t, e) {
========
function ns(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function xi(t) {
  const [e, r] = O(!1), [n, a] = O(""), s = ut(() => Ta(t.localizedStrings), [t.localizedStrings]), i = ut(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(rn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      Ia({
========
function qi(t) {
  const [e, r] = O(!1), [n, a] = O(""), s = ut(() => Ya(t.localizedStrings), [t.localizedStrings]), i = ut(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(nn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      Za({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        label: s.autoSelectionGroupingLabel,
        selectedSectionHeading: s.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: s.autoSelectionUnselectedSectionHeading
      })
    ), h;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ]), [l, c] = O(void 0), w = ut(
    () => Ma(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = l ?? w, S = I(null), [y, u] = O(void 0), k = _((h) => {
========
  ]), [l, d] = O(void 0), w = ut(
    () => ns(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = l ?? w, k = I(null), [y, u] = O(void 0), S = _((h) => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    r(h), h || (a(""), u(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const L = S.current;
      L && L.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = ut(() => t.mode === "project" ? Te({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Te({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Te({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = ut(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (L) => L.shortName.toLowerCase().includes(h) || (L.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), z = ut(
    () => new Map(t.projects.map((h) => [it(h.id), h])),
    [t.projects]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ), B = _(
    (h) => h === void 0 ? void 0 : z.get(it(h)),
    [z]
  ), { renderProjectIndicator: X } = t, C = _(
    (h) => X ? X(h.project) : void 0,
    [X]
  ), R = !!X, $ = !!t.footerAction && E.length === 0, V = ut(() => {
    if (f === Xt) return Be(E);
    const h = i.find((L) => L.id === f);
    return h ? ka(E, h) : Be(E);
  }, [E, f, i]), A = (h) => {
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  ), B = I(
    (h) => h === void 0 ? void 0 : z.get(it(h)),
    [z]
  ), { renderProjectIndicator: J } = t, C = I(
    (h) => J ? J(h.project) : void 0,
    [J]
  ), A = !!J, U = !!t.footerAction && E.length === 0, $ = ut(() => {
========
  ), P = _(
    (h) => h === void 0 ? void 0 : H.get(it(h)),
    [H]
  ), { renderProjectIndicator: q } = t, C = _(
    (h) => q ? q(h.project) : void 0,
    [q]
  ), A = !!q, J = !!t.footerAction && E.length === 0, V = ut(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    if (f === Xt) return Be(E);
    const h = i.find((L) => L.id === f);
    return h ? Ja(E, h) : Be(E);
  }, [E, f, i]), D = (h) => {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, U = (h) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: h.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const L = t.selection.pairs, H = it(h.projectId), Z = (q) => it(q.projectId) === H && q.scrollGroupId === h.scrollGroupId, K = L.some(Z) ? L.filter((q) => !Z(q)) : [
          ...L.filter((q) => !Z(q)),
          { projectId: h.projectId, scrollGroupId: h.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: K });
        return;
      }
      case "projectScrollGroup": {
        if (h.isBoundButClosed && h.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(h.projectId, h.scrollGroupId), r(!1);
          return;
        }
        if (h.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: h.projectId,
            scrollGroupId: h.scrollGroupId
          }), r(!1);
          return;
        }
        const L = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: h.projectId, scrollGroupId: L }), t.onOpenProjectInGroup(h.projectId, L), r(!1);
      }
    }
  }, lt = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  }, ft = t.mode === "project" ? t.renderTriggerLabel : void 0, It = t.mode === "project" ? t.triggerLabelFormat : void 0, J = ut(() => {
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  }, ft = t.mode === "project" ? t.renderTriggerLabel : void 0, _t = t.mode === "project" ? t.triggerLabelFormat : void 0, q = ut(() => {
========
  }, ft = t.mode === "project" ? t.renderTriggerLabel : void 0, It = t.mode === "project" ? t.triggerLabelFormat : void 0, F = ut(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    switch (t.mode) {
      case "project": {
        const h = B(t.selection.projectId);
        if (ft)
          return { node: ft(h), title: "", hasSelection: !!h };
        let L = h ? h.shortName : s.buttonPlaceholder;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        return h && It === "shortNameAndFullName" && (L = Ur(h)), { node: L, title: L, hasSelection: !!h };
========
        return h && It === "shortNameAndFullName" && (L = Fr(h)), { node: L, title: L, hasSelection: !!h };
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const L = [];
        if (h.forEach((K) => {
          const q = B(K.projectId);
          q && L.push({ project: q, scrollGroupId: K.scrollGroupId });
        }), L.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const H = L.map(
          ({ project: K, scrollGroupId: q }) => q === void 0 ? K.shortName : `${K.shortName} (${Qt(q)})`
        ).join(", "), Z = L.length.toString();
        return {
          node: /* @__PURE__ */ m(gt, { children: [
            /* @__PURE__ */ o(de, { variant: "muted", className: "tw:shrink-0", children: Z }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: H })
          ] }),
          title: `${Z} ${H}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = B(t.selection.projectId);
        if (!h) {
          const Z = s.buttonPlaceholder;
          return { node: Z, title: Z, hasSelection: !1 };
        }
        const L = t.selection.scrollGroupId;
        if (L === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const H = Qt(L);
        return {
          node: `${h.shortName} · ${H}`,
          title: `${h.shortName} · ${H}`,
          accessibleTitle: `${h.shortName}, ${H}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    B,
    t.selection,
    ft,
    It,
    s.buttonPlaceholder
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  ]), Pt = I(null), [Ut, _t] = O(!1);
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  ]), Pt = _(null), [Ut, It] = O(!1);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  F(() => {
========
  ]), Pt = I(null), [Ut, _t] = O(!1);
  K(() => {
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    const h = Pt.current;
    if (!h) return;
    const L = (Z) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
      _t(Z < _a);
========
      _t(Z < Wa);
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    };
    if (L(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const H = new ResizeObserver((Z) => {
      Z.forEach((K) => {
        const [q] = K.borderBoxSize;
        L(q ? q.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return H.observe(h, { box: "border-box" }), () => H.disconnect();
  }, []);
  let G;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  t.isLoading ? G = /* @__PURE__ */ o(_n, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ o(jr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ o(Tn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? A : void 0, tt = s.ariaLabel && J.hasSelection && J.title ? `${s.ariaLabel}: ${J.accessibleTitle ?? J.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ m(
    W,
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
  t.isLoading ? G = /* @__PURE__ */ o(En, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ o(jr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ o(_n, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? D : void 0, Q = s.ariaLabel && q.hasSelection && q.title ? `${s.ariaLabel}: ${q.accessibleTitle ?? q.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ p(
========
  t.isLoading ? G = /* @__PURE__ */ o(Wn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ o(Hr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ o(Yn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? D : void 0, Q = s.ariaLabel && F.hasSelection && F.title ? `${s.ariaLabel}: ${F.accessibleTitle ?? F.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ p(
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    X,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    {
      ref: Pt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": tt,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: g(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        Ut && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof J.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: J.node }) : J.node }),
        G
      ]
    }
  ), Tt = J.title ? /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(St, { children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Pe, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ o(Ct, { dir: "auto", children: J.title })
  ] }) }) : /* @__PURE__ */ o(Pe, { asChild: !0, children: ct }), jt = i.length > 1;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ m(Ve, { open: e, onOpenChange: k, children: [
========
  return /* @__PURE__ */ p(We, { open: e, onOpenChange: S, children: [
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    Tt,
    /* @__PURE__ */ o(
      Ye,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        children: /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(
          Ue,
          {
            shouldFilter: !1,
            value: $ ? y ?? Dr : void 0,
========
        children: /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ p(
          $e,
          {
            shouldFilter: !1,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
            value: U ? y ?? Rr : void 0,
========
            value: J ? y ?? jr : void 0,
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            onValueChange: u,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  qe,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                jt && /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
                  Da,
========
                  rs,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                  {
                    availableGroupings: i,
                    activeGrouping: f,
                    onChangeGrouping: c,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Fe, { children: [
                /* @__PURE__ */ o($e, { children: s.commandEmptyMessage }),
                V.map((h, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Mr,
                    {
                      children: [
                        /* @__PURE__ */ o(ce, { heading: Oa(h, s), children: h.rows.map((H) => /* @__PURE__ */ o(
                          Ra,
========
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(X, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
              /* @__PURE__ */ p(Fe, { children: [
                /* @__PURE__ */ o($e, { children: s.commandEmptyMessage }),
                $.map((h, L) => (
========
              /* @__PURE__ */ p(Je, { children: [
                /* @__PURE__ */ o(Ve, { children: s.commandEmptyMessage }),
                V.map((h, L) => (
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    Br,
                    {
                      children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
                        /* @__PURE__ */ o(ce, { heading: Ra(h, s), children: h.rows.map((H) => /* @__PURE__ */ o(
                          La,
========
                        /* @__PURE__ */ o(ce, { heading: os(h, s), children: h.rows.map((z) => /* @__PURE__ */ o(
                          es,
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                          {
                            row: H,
                            mode: t.mode,
                            strings: s,
                            onClick: U,
                            onOpen: at,
                            selectedRowRef: S,
                            indicator: C(H),
                            reserveIndicatorSlot: R
                          },
                          H.rowKey
                        )) }),
                        L < V.length - 1 && /* @__PURE__ */ o(Me, { alwaysRender: !0 })
                      ]
                    },
                    `${h.kind}:${h.groupingId ?? ""}:${h.key ?? h.label ?? ""}`
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
                /* @__PURE__ */ m("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  E.length > 0 && /* @__PURE__ */ o(
                    Me,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    fe,
                    {
                      forceMount: !0,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
                      value: Dr,
========
                      value: jr,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var h;
                        (h = t.footerAction) == null || h.onSelect(), k(!1);
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
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Oa(t, e) {
========
function os(t, e) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const Pa = Or(
========
const as = Gr(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = pt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
            Ln,
========
            Ur,
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": c === "rtl" },
                { "tw:left-3": c === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            Xr,
            {
              ref: l,
              className: g(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (w) => e(w.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            W,
            {
              variant: "ghost",
              size: "icon",
              className: g(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": c === "rtl" },
                { "tw:right-0": c === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(zr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
Pa.displayName = "SearchBar";
const ja = 5;
function yi(t) {
  return uo(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function Ba(t, e) {
  return t.filter((r) => {
    try {
      return $n(r) === e;
========
as.displayName = "SearchBar";
const ss = 5;
function Ji(t) {
  return Ro(t).filter(
    (e) => !nt.isObsolete(nt.bookIdToNumber(e))
  );
}
function is(t, e) {
  return t.filter((r) => {
    try {
      return po(r) === e;
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
    } catch {
      return !1;
    }
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const Si = (t, e, r) => Ba(t, e).every((n) => r.includes(n));
function Ga(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => fo(n, e));
}
function ki(t, e, r, n) {
========
const Vi = (t, e, r) => is(t, e).every((n) => r.includes(n));
function ls(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => nt.bookIdToNumber(n) > 0).sort((n, a) => nt.bookIdToNumber(n) - nt.bookIdToNumber(a)).map((n) => Oo(n, e));
}
function Xi(t, e, r, n) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  const i = Ga(t, n);
  if (i.length !== 0)
    return i.length <= ja ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Ci({ message: t, id: e, className: r }) {
========
  const i = ls(t, n);
  if (i.length !== 0)
    return i.length <= ss ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Zi({ message: t, id: e, className: r }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: g("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function za({ className: t, ...e }) {
========
function cs({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ha({ className: t, ...e }) {
========
function ds({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-header",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
const Ua = Ot(
========
const us = Ot(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ka({
========
function ws({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        Ua({ variant: e }),
========
        us({ variant: e }),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ei({ className: t, ...e }) {
========
function Wi({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-title",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Fa({ className: t, ...e }) {
========
function fs({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-description",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function $a({ className: t, ...e }) {
========
function ps({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-content",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ii({
========
function Yi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  return /* @__PURE__ */ m(za, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Ha, { children: [
      /* @__PURE__ */ o(Ka, { variant: "icon", children: n ?? /* @__PURE__ */ o(An, {}) }),
      /* @__PURE__ */ o(Fa, { children: t })
    ] }),
    r && /* @__PURE__ */ o($a, { children: /* @__PURE__ */ o(W, { onClick: () => r(), children: e }) })
  ] });
}
const Ja = Or(({ className: t, ...e }, r) => /* @__PURE__ */ o(Rn, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
Ja.displayName = "Spinner";
const qa = Ot(
========
  return /* @__PURE__ */ p(cs, { className: g(s), role: a, children: [
    /* @__PURE__ */ p(ds, { children: [
      /* @__PURE__ */ o(ws, { variant: "icon", children: n ?? /* @__PURE__ */ o(Qn, {}) }),
      /* @__PURE__ */ o(fs, { children: t })
    ] }),
    r && /* @__PURE__ */ o(ps, { children: /* @__PURE__ */ o(X, { onClick: () => r(), children: e }) })
  ] });
}
const ms = Gr(({ className: t, ...e }, r) => /* @__PURE__ */ o(to, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
ms.displayName = "Spinner";
const hs = Ot(
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function _i({
========
function Qi({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
        qa({ variant: e }),
========
        hs({ variant: e }),
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ti({ className: t, ...e }) {
========
function tl({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-title",
      className: g(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Li({ className: t, ...e }) {
========
function el({ className: t, ...e }) {
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-description",
      className: g(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ai({
========
function rl({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Fe.Group,
    {
      "data-slot": "resizable-panel-group",
      className: g(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: n ?? e,
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...a
    }
  );
}
function le(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Ri({
========
function nl({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Fe.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: le(t),
      minSize: le(e),
      maxSize: le(r),
      collapsedSize: le(n),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
function Di({
========
function ol({
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Fe.Separator,
    {
      "data-slot": "resizable-handle",
      className: g(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Vt as $,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DboaZGeb.js
  Ls as A,
  W as B,
  fe as C,
  We as D,
  qe as E,
  Xr as F,
  Fe as G,
  $e as H,
  Cs as I,
  Zs as J,
  Qs as K,
  Rs as L,
  ps as M,
  gs as N,
  bs as O,
  Ve as P,
  vs as Q,
  Ys as R,
  ge as S,
  Et as T,
  Co as U,
  ti as V,
  de as W,
  mo as X,
  ni as Y,
  ri as Z,
  tr as _,
  fo as a,
  Hs as a$,
  Kr as a0,
  li as a1,
  di as a2,
  oi as a3,
  ai as a4,
  ci as a5,
  si as a6,
  $s as a7,
  ko as a8,
  Sr as a9,
  no as aA,
  ao as aB,
  Cr as aC,
  _i as aD,
  Li as aE,
  Ti as aF,
  Bs as aG,
  hs as aH,
  xs as aI,
  ro as aJ,
  eo as aK,
  ms as aL,
  ta as aM,
  za as aN,
  $a as aO,
  Fa as aP,
  Ha as aQ,
  Ka as aR,
  Ci as aS,
  Ei as aT,
  mi as aU,
  Na as aV,
  Vo as aW,
  wa as aX,
  No as aY,
  Us as aZ,
  zs as a_,
  wi as aa,
  pi as ab,
  fi as ac,
  qr as ad,
  xi as ae,
  Pa as af,
  yi as ag,
  Ba as ah,
  Me as ai,
  _s as aj,
  Si as ak,
  Gs as al,
  Ns as am,
  wo as an,
  js as ao,
  Ps as ap,
  qs as aq,
  Er as ar,
  Xs as as,
  Vs as at,
  Fs as au,
  Ws as av,
  Os as aw,
  Yr as ax,
  me as ay,
  he as az,
  St as b,
  Di as b0,
  Ri as b1,
  Ai as b2,
  Ii as b3,
  Ja as b4,
  ui as b5,
  ii as b6,
  Ks as b7,
  Qo as b8,
  we as b9,
  Ho as bA,
  gi as bB,
  Oo as bC,
  Go as bD,
  zo as bE,
  Uo as bF,
  ca as bG,
  Mo as bH,
  Ea as bI,
  Ia as bJ,
  pa as bK,
  fs as bL,
  Po as bM,
  Fo as bN,
  Ko as bO,
  xt as bP,
  ki as bQ,
  $o as bR,
  Jo as bS,
  qo as bT,
  ws as ba,
  us as bb,
  Qn as bc,
  Yn as bd,
  cs as be,
  ls as bf,
  ds as bg,
  is as bh,
  _o as bi,
  ho as bj,
  Fr as bk,
  Lr as bl,
  ei as bm,
  na as bn,
  ra as bo,
  Ro as bp,
  ea as bq,
  Es as br,
  Xt as bs,
  nt as bt,
  hi as bu,
  to as bv,
  bi as bw,
  vi as bx,
  Ni as by,
  en as bz,
  g as c,
  kt as d,
  Ct as e,
  Ms as f,
  Ts as g,
  Ze as h,
  Ye as i,
  Qe as j,
  Js as k,
  ys as l,
  Ss as m,
  ks as n,
  As as o,
  ce as p,
  pt as q,
  rt as r,
  co as s,
  Ds as t,
  So as u,
  Is as v,
  Pe as w,
  Xe as x,
  Ue as y,
  Ke as z
};
//# sourceMappingURL=resizable-DboaZGeb.js.map
========
  Qs as A,
  X as B,
  fe as C,
  Qe as D,
  Ze as E,
  Wr as F,
  Je as G,
  Ve as H,
  Vs as I,
  vi as J,
  yi as K,
  ei as L,
  js as M,
  zs as N,
  Hs as O,
  We as P,
  Ks as Q,
  xi as R,
  ge as S,
  Et as T,
  Jo as U,
  Si as V,
  de as W,
  jo as X,
  Ei as Y,
  Ci as Z,
  nr as _,
  Oo as a,
  ui as a$,
  $r as a0,
  Ai as a1,
  Ri as a2,
  Ii as a3,
  _i as a4,
  Di as a5,
  Ti as a6,
  pi as a7,
  qo as a8,
  Ir as a9,
  me as aA,
  he as aB,
  Eo as aC,
  _o as aD,
  Tr as aE,
  Qi as aF,
  el as aG,
  tl as aH,
  ii as aI,
  Gs as aJ,
  Fs as aK,
  Co as aL,
  ko as aM,
  Bs as aN,
  ya as aO,
  cs as aP,
  ps as aQ,
  fs as aR,
  ds as aS,
  ws as aT,
  Zi as aU,
  Wi as aV,
  Bi as aW,
  Ha as aX,
  ha as aY,
  Ma as aZ,
  Ho as a_,
  Oi as aa,
  ji as ab,
  Pi as ac,
  Xr as ad,
  Ka as ae,
  qi as af,
  as as ag,
  Ji as ah,
  is as ai,
  Me as aj,
  Ws as ak,
  Vi as al,
  li as am,
  Us as an,
  Mo as ao,
  zi as ap,
  si as aq,
  ai as ar,
  hi as as,
  Lr as at,
  bi as au,
  gi as av,
  fi as aw,
  Ni as ax,
  oi as ay,
  tn as az,
  St as b,
  ci as b0,
  di as b1,
  ol as b2,
  nl as b3,
  rl as b4,
  Yi as b5,
  ms as b6,
  Mi as b7,
  Li as b8,
  wi as b9,
  $i as bA,
  Fi as bB,
  rn as bC,
  ca as bD,
  Ui as bE,
  na as bF,
  ia as bG,
  la as bH,
  da as bI,
  Aa as bJ,
  ra as bK,
  Xa as bL,
  Za as bM,
  Pa as bN,
  Ps as bO,
  oa as bP,
  wa as bQ,
  ua as bR,
  xt as bS,
  Xi as bT,
  fa as bU,
  pa as bV,
  ma as bW,
  xa as ba,
  we as bb,
  Os as bc,
  Ms as bd,
  yo as be,
  xo as bf,
  Ds as bg,
  As as bh,
  Rs as bi,
  Ls as bj,
  Zo as bk,
  Bo as bl,
  qr as bm,
  Mr as bn,
  ki as bo,
  Ca as bp,
  ka as bq,
  ta as br,
  Sa as bs,
  Xs as bt,
  Gi as bu,
  Xt as bv,
  rt as bw,
  Hi as bx,
  So as by,
  Ki as bz,
  g as c,
  kt as d,
  Ct as e,
  ni as f,
  Ys as g,
  tr as h,
  er as i,
  rr as j,
  mi as k,
  qs as l,
  Js as m,
  ti as n,
  ce as o,
  pt as p,
  Do as q,
  et as r,
  Zs as s,
  ri as t,
  $o as u,
  Pe as v,
  Ye as w,
  $s as x,
  $e as y,
  qe as z
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BYtT_iu9.js
//# sourceMappingURL=resizable-BYtT_iu9.js.map
========
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-BviZlRbV.js
//# sourceMappingURL=resizable-BviZlRbV.js.map
========
//# sourceMappingURL=resizable-D_bIXo2r.js.map
>>>>>>>> 260153d8f7e (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> ea6857df91d (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
>>>>>>>> 7ca8235e6cd (fix(menus): unknown icon name falls back to the image path):lib/platform-bible-react/dist/resizable-D_bIXo2r.js
