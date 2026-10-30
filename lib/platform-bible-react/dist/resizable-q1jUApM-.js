import { jsx as o, jsxs as m, Fragment as yt } from "react/jsx-runtime";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
import { Slot as ze, Dialog as kt, Separator as yn, Popover as Zt, Tooltip as Vt, DropdownMenu as tt, Label as xn, RadioGroup as De } from "radix-ui";
import { IconX as Sn, IconCheck as He, IconSearch as kn, IconChevronLeft as Cn, IconChevronRight as En } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import ft, { useRef as C, useEffect as F, useCallback as T, useState as O, createContext as In, useContext as _n, useMemo as wt, Fragment as Hr, useLayoutEffect as se, useImperativeHandle as Tn, useId as Ln, forwardRef as Ur } from "react";
import { X as Fr, Check as pe, ChevronsUpDown as Kr, Star as An, Undo as Dn, Redo as Mn, SquareX as Ue, FunctionSquare as Fe, SquareSigma as Ke, Ban as Pn, Copy as On, Sparkles as Rn, ClipboardCheck as Bn, CircleCheckBig as jn, MessageSquare as Gn, Search as $r, Library as zn, BookOpen as Hn, BookMarked as Un, Book as Fn, MessageSquarePlus as Kn, PanelBottom as $n, FileText as qn, Scan as Vn, ZoomOut as Jn, ZoomIn as Xn, Eye as Wn, Pencil as Zn, BookCopy as Yn, Users as Qn, ExternalLink as to, CircleQuestionMark as eo, Settings as ro, BookA as no, House as oo, Download as ao, RefreshCw as so, Group as io, ArrowRight as lo, Loader2 as co, ChevronDown as uo, AlertTriangle as wo, LoaderCircle as fo } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as Sr, GENERATOR_NOTE_CALLER as Me, HIDDEN_NOTE_CALLER as Pe, isInsertEmbedOpOfType as qt, getDefaultViewOptions as po, getMarkerMenuItems as mo, defaultStyleInfo as kr, Editorial as ho } from "@eten-tech-foundation/platform-editor";
import { Section as Pt, MODIFIER_KEYS as go, split as qr, slice as bo, formatReplacementString as No, usfmMarkers as ie, deepEqual as Gt, isPlatformError as vo, ABORTED as yo, getErrorMessage as xo, normalizeProjectId as it, compareProjectsByName as So, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Vr, getLocalizeKeyForScrollGroupId as ko, hasDistinctFullName as Co, getSectionForBook as Eo } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as $e from "react-resizable-panels";
import { clsx as Io } from "clsx";
import { extendTailwindMerge as _o, twMerge as To } from "tailwind-merge";
const Lo = _o({ prefix: "tw" });
function Oe(t) {
========
import { Slot as Ue, Dialog as kt, Separator as gn, Popover as Yt, Tooltip as Vt, DropdownMenu as rt, Label as bn, RadioGroup as Oe } from "radix-ui";
import { IconX as Nn, IconCheck as Ke, IconSearch as vn, IconChevronLeft as xn, IconChevronRight as yn } from "@tabler/icons-react";
import { Canon as st } from "@sillsdev/scripture";
import mt, { useState as P, useRef as I, useCallback as T, createContext as Sn, useContext as kn, useEffect as V, useMemo as pt, Fragment as Ur, useLayoutEffect as ie, useImperativeHandle as Cn, useId as En, forwardRef as Kr } from "react";
import { X as Fr, Check as pe, ChevronsUpDown as $r, Star as In, Undo as _n, Redo as Tn, SquareX as Fe, FunctionSquare as $e, SquareSigma as qe, Ban as Ln, Copy as An, Sparkles as Dn, ClipboardCheck as Mn, CircleCheckBig as On, MessageSquare as Pn, Search as qr, Library as Rn, BookOpen as Bn, BookMarked as jn, Book as Gn, MessageSquarePlus as zn, PanelBottom as Hn, FileText as Un, Scan as Kn, ZoomOut as Fn, ZoomIn as $n, Eye as qn, Pencil as Vn, BookCopy as Jn, Users as Xn, ExternalLink as Wn, CircleQuestionMark as Zn, Settings as Yn, BookA as Qn, House as to, Download as eo, RefreshCw as ro, Group as no, ArrowRight as oo, Loader2 as ao, ChevronDown as so, AlertTriangle as io, LoaderCircle as lo } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Ir, GENERATOR_NOTE_CALLER as Pe, HIDDEN_NOTE_CALLER as Re, isInsertEmbedOpOfType as qt, getDefaultViewOptions as co, getMarkerMenuItems as uo, defaultStyleInfo as _r, Editorial as wo } from "@eten-tech-foundation/platform-editor";
import { Section as Ot, MODIFIER_KEYS as fo, split as Vr, slice as po, formatReplacementString as mo, usfmMarkers as le, deepEqual as Gt, isPlatformError as ho, ABORTED as go, getErrorMessage as bo, normalizeProjectId as dt, compareProjectsByName as No, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Jr, getLocalizeKeyForScrollGroupId as vo, hasDistinctFullName as xo, getSectionForBook as yo } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Ve from "react-resizable-panels";
import { clsx as So } from "clsx";
import { extendTailwindMerge as ko, twMerge as Co } from "tailwind-merge";
const Eo = ko({ prefix: "tw" });
function Be(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ao(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Oe(t), r = e.findIndex((s) => s.startsWith("-tw-"));
========
function Io(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Be(t), r = e.findIndex((s) => s.startsWith("-tw-"));
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, u) => u !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((d, u) => u !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Do(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Oe(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Oe(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
========
function _o(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Be(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Be(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (i && a.startsWith("-")) {
    const d = a.slice(1);
    return [...n, `-tw-${d}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const d = a.slice(1);
    return [...n, `!tw-${d}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function g(...t) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const e = Io(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Lo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const u = Ao(d);
    n.set(u.normalized, u.original), a.push(u.normalized);
  }), To(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const u = n.get(d);
    return u ? Do(d, u) : d;
  }).join(" ");
}
const Jr = 600, me = 650, $s = 400, Mo = 450, Po = 500, qs = 510, Vs = 520, Oo = 675, Js = 690, Xs = 700, Ws = 800, Xr = Ot(
========
  const e = So(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Eo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const f = Io(d);
    n.set(f.normalized, f.original), a.push(f.normalized);
  }), Co(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const f = n.get(d);
    return f ? _o(d, f) : d;
  }).join(" ");
}
const Xr = 600, me = 650, Gs = 400, To = 450, Lo = 500, zs = 510, Hs = 520, Ao = 675, Us = 690, Ks = 700, Fs = 800, Wr = Pt(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
function Q({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const s = n ? Ue.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      className: g(Xr({ variant: e, size: r, className: t })),
========
      className: g(Wr({ variant: e, size: r, className: t })),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Wr = "layoutDirection";
function Zr() {
========
const Zr = "layoutDirection";
function Yr() {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return globalThis.localStorage ?? void 0;
}
function gt() {
  var t;
  try {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    const e = (t = Zr()) == null ? void 0 : t.getItem(Wr);
========
    const e = (t = Yr()) == null ? void 0 : t.getItem(Zr);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Zs(t) {
  var e;
  try {
    (e = Zr()) == null || e.setItem(Wr, t);
  } catch {
  }
}
function Ys({ ...t }) {
  return /* @__PURE__ */ o(kt.Root, { "data-slot": "dialog", ...t });
}
function Qs({ ...t }) {
  return /* @__PURE__ */ o(kt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ro({ ...t }) {
  return /* @__PURE__ */ o(kt.Portal, { "data-slot": "dialog-portal", ...t });
}
function ti({ ...t }) {
  return /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", ...t });
}
function Bo({
========
function $s(t) {
  var e;
  try {
    (e = Yr()) == null || e.setItem(Zr, t);
  } catch {
  }
}
function qs({ ...t }) {
  return /* @__PURE__ */ o(kt.Root, { "data-slot": "dialog", ...t });
}
function Vs({ ...t }) {
  return /* @__PURE__ */ o(kt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Do({ ...t }) {
  return /* @__PURE__ */ o(kt.Portal, { "data-slot": "dialog-portal", ...t });
}
function Js({ ...t }) {
  return /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", ...t });
}
function Mo({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    kt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: g(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      style: { zIndex: Mo, ...e },
========
      style: { zIndex: To, ...e },
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ei({
========
function Xs({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const l = ht();
  return /* @__PURE__ */ m(Ro, { children: [
    /* @__PURE__ */ o(Bo, { className: n, style: a }),
========
  const l = gt();
  return /* @__PURE__ */ m(Do, { children: [
    /* @__PURE__ */ o(Mo, { className: n, style: a }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    /* @__PURE__ */ m(
      kt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        style: { zIndex: Po, ...s },
========
        style: { zIndex: Lo, ...s },
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        dir: l,
        ...i,
        children: [
          e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          r && /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Y, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Sn, {}),
========
          r && /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Q, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Nn, {}),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ri({ className: t, ...e }) {
========
function Ws({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ni({
========
function Zs({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
        e && /* @__PURE__ */ o(kt.Close, { asChild: !0, children: /* @__PURE__ */ o(Q, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function oi({ className: t, ...e }) {
========
function Ys({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    kt.Title,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ai({
========
function Qs({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    kt.Description,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Yr({ className: t, type: e, ...r }) {
========
function Qr({ className: t, type: e, ...r }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function jo({ className: t, ...e }) {
========
function Oo({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Go = Ot(
========
const Po = Pt(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function zo({
========
function Ro({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        className: g(Go({ align: e }), t),
========
        className: g(Po({ align: e }), t),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
function Je({ className: t, ...e }) {
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ve({
========
function Xe({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = gt(), s = mt.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !r || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), d = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      d && (i.preventDefault(), i.stopPropagation(), d.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(jo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
========
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(Oo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      /* @__PURE__ */ o(zo, { children: /* @__PURE__ */ o(kn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Je({ className: t, ...e }) {
========
      /* @__PURE__ */ o(Ro, { children: /* @__PURE__ */ o(vn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function We({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
function Ze({
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
function we({
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
function je({
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
function he({
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
        /* @__PURE__ */ o(Ke, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ho({ className: t, ...e }) {
========
function Bo({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Uo = [
========
const jo = [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
], Fo = (t) => {
  var e;
  return ((e = Uo[t]) == null ? void 0 : e.chapters) ?? -1;
}, Ko = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function $o(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
========
], Go = (t) => {
  var e;
  return ((e = jo[t]) == null ? void 0 : e.chapters) ?? -1;
}, zo = st.allBookIds.filter(
  (t) => !st.isObsolete(st.bookIdToNumber(t))
);
function Ho(t) {
  const e = [], r = Math.min(t.length, st.allBookIds.length);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(st.bookNumberToId(n + 1));
  return e;
}
function R(t) {
  return `%scrollGroup_${t}%`;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const qo = {
========
const Uo = {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  [R("undefined")]: "Ø",
  [R(0)]: "A",
  [R(1)]: "B",
  [R(2)]: "C",
  [R(3)]: "D",
  [R(4)]: "E",
  [R(5)]: "F",
  [R(6)]: "G",
  [R(7)]: "H",
  [R(8)]: "I",
  [R(9)]: "J",
  [R(10)]: "K",
  [R(11)]: "L",
  [R(12)]: "M",
  [R(13)]: "N",
  [R(14)]: "O",
  [R(15)]: "P",
  [R(16)]: "Q",
  [R(17)]: "R",
  [R(18)]: "S",
  [R(19)]: "T",
  [R(20)]: "U",
  [R(21)]: "V",
  [R(22)]: "W",
  [R(23)]: "X",
  [R(24)]: "Y",
  [R(25)]: "Z"
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function We(t, e) {
  return Fo(ot.bookIdToNumber(t));
========
function Ye(t, e) {
  return Go(st.bookIdToNumber(t));
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
}
function ge(t, e, r) {
  const n = st.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = st.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function si(t, e, r) {
========
function ti(t, e, r) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = ge(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Ye(s), 1),
      verseNum: 1
    };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ii(t, e, r) {
========
function ei(t, e, r) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < Ye(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = ge(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function li(t, e, r) {
========
function ri(t, e, r) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = ge(n, e, "previous");
  if (!i) return;
  const l = Math.max(Ye(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ci(t, e, r) {
========
function ni(t, e, r) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = ge(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function di(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const ui = (t, e, r, n, a) => {
========
function oi(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const ai = (t, e, r, n, a) => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  switch (t) {
    case Pt.OT:
      return e ?? "Old Testament";
    case Pt.NT:
      return r ?? "New Testament";
    case Pt.DC:
      return n ?? "Deuterocanon";
    case Pt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
}, wi = (t, e, r, n, a) => {
========
}, si = (t, e, r, n, a) => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  switch (t) {
    case Pt.OT:
      return e ?? "OT";
    case Pt.NT:
      return r ?? "NT";
    case Pt.DC:
      return n ?? "DC";
    case Pt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function fi(t, e) {
========
function ii(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? st.bookIdToEnglishName(t);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Vo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const pi = Object.fromEntries(
  Ko.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function mi(t, e, r) {
========
function Ko(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const li = Object.fromEntries(
  zo.map((t) => [t, st.bookIdToEnglishName(t)])
);
function ci(t, e, r) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = st.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Qr() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function tn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function en(t) {
  tn(document, Qr()) || t();
}
function Cr(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Er(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function Jo(t, e) {
  const [r] = O(Qr), n = C(t);
  n.current = t;
  const a = C(e);
  return a.current = e, T(
    (s) => {
      var d, u;
      if ((d = n.current) == null || d.call(n, s), s.defaultPrevented) return;
      if (tn(document, r)) {
        s.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: i } = document;
      if (i && i !== document.body) return;
      const l = (u = a.current) == null ? void 0 : u.call(a);
      l && (l.focus({ preventScroll: !0 }), document.activeElement === l && s.preventDefault());
    },
    [r]
  );
}
const rn = Symbol.for("platform-bible-react.window-blur-press");
function Xo(t) {
  return Reflect.get(t, rn) === !0;
}
function nn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = C(void 0), n = C(void 0), a = C(void 0);
  F(() => {
    const u = () => {
      const w = r.current;
      if (!w || w.dataset.state === "closed") return;
      const y = w.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, f = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(f, rn, { value: !0 }), y.dispatchEvent(f);
    };
    return window.addEventListener("blur", u), () => window.removeEventListener("blur", u);
  }, []);
  const s = T(
    (u) => {
      if (r.current = u ?? void 0, u && u !== n.current && (n.current = u, a.current = Cr(u) ?? Er(u)), typeof t == "function") {
        const w = t(u);
        if (typeof w == "function")
          return () => {
            r.current = void 0, w();
          };
      } else t && (t.current = u);
    },
    [t]
  ), i = T(() => {
    var x;
    const u = n.current, w = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (u && Cr(u)) ?? w ?? (u && Er(u));
    return y != null && y.isConnected ? y : void 0;
  }, []), l = Jo(
    e,
    i
  ), d = T(
    (u) => {
      l(u), r.current || (n.current = void 0, a.current = void 0);
    },
    [l]
  );
  return { ref: s, onCloseAutoFocus: d };
}
const Ir = `
========
const Tr = `
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Wo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${Ir}, ${e}` : Ir;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Wo(n)
  );
}
const hi = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Be = "keyboard", _r = !1;
function gi() {
  _r || typeof document > "u" || (_r = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      Xo(t) || (Be = "pointer");
========
function Fo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Qt(t, e) {
  const r = e ? `${Tr}, ${e}` : Tr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Fo(n)
  );
}
const di = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Ge = "keyboard", Lr = !1;
function ui() {
  Lr || typeof document > "u" || (Lr = !0, document.addEventListener(
    "pointerdown",
    () => {
      Ge = "pointer";
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Ge = "keyboard";
    },
    !0
  ));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function bi() {
  return Be;
}
const on = "data-quiet-focus";
function Ni(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(on, ""), t.style.outline = "none"));
}
function vi(t) {
  t && (t.removeAttribute(on), t.style.removeProperty("outline"));
}
const yi = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function Zo({
========
function wi() {
  return Ge;
}
const tn = "data-quiet-focus";
function fi(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(tn, ""), t.style.outline = "none"));
}
function pi(t) {
  t && (t.removeAttribute(tn), t.style.removeProperty("outline"));
}
const mi = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function $o({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    yn.Root,
========
    gn.Root,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Yo = Ot(
========
const qo = Pt(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
function Qe({
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        Yo({ orientation: e }),
========
        qo({ orientation: e }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function xi({
========
function hi({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ue.Root : "div";
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function an({
========
function en({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    Zo,
========
    $o,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function sn() {
  const t = ft.createContext(null);
========
function rn() {
  const t = mt.createContext(null);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return mt.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function tr({ ...t }) {
  return /* @__PURE__ */ o(Yt.Root, { "data-slot": "popover", ...t });
}
function ze({ ...t }) {
  return /* @__PURE__ */ o(Yt.Trigger, { "data-slot": "popover-trigger", ...t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const { PortalContainerProvider: Qo, usePortalContainer: ta } = sn(), Si = Qo;
function Qe({
========
const { PortalContainerProvider: Vo, usePortalContainer: Jo } = rn(), gi = Vo;
function er({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: a,
  onCloseAutoFocus: s,
  ...i
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const l = ht(), d = ta(), u = nn({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: d, children: /* @__PURE__ */ o(
      Zt.Content,
========
  const s = gt(), i = Jo();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Yt.Portal, { container: i, children: /* @__PURE__ */ o(
      Yt.Content,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      {
        "data-slot": "popover-content",
        ...u,
        align: e,
        sideOffset: r,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        style: { zIndex: Jr, ...n },
        dir: l,
        ...i
========
        style: { zIndex: Xr, ...n },
        dir: s,
        ...a
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      }
    ) })
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ea({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function ki({ className: t, ...e }) {
========
function Xo({ ...t }) {
  return /* @__PURE__ */ o(Yt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function bi({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ci({ className: t, ...e }) {
========
function Ni({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ei({ className: t, ...e }) {
========
function vi({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Tt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    Vt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ct({ ...t }) {
  return /* @__PURE__ */ o(Vt.Root, { "data-slot": "tooltip", ...t });
}
function Et({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Vt.Trigger,
    {
      "data-slot": "tooltip-trigger",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      className: e ? g(Xr({ variant: e }), t) : t,
========
      className: e ? g(Wr({ variant: e }), t) : t,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const { PortalContainerProvider: ra, usePortalContainer: na } = sn(), Ii = ra;
========
const { PortalContainerProvider: Wo, usePortalContainer: Zo } = rn(), xi = Wo;
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
function It({
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const l = na();
========
  const l = Zo();
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: l, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        style: { zIndex: Oo, ...r },
========
        style: { zIndex: Ao, ...r },
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          n && /* @__PURE__ */ o(
            Vt.Arrow,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const oa = /^%[^%]*%$/;
function ln(t) {
  return t !== void 0 && !oa.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return ln(t) ? t : e;
}
function aa() {
  const [t, e] = O(!1), r = C(null), n = T(() => {
========
const Yo = /^%[^%]*%$/;
function nn(t) {
  return t !== void 0 && !Yo.test(t) && t.trim() !== "";
}
function ot(t, e) {
  return nn(t) ? t : e;
}
function Qo() {
  const [t, e] = P(!1), r = I(null), n = T(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = T(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const cn = In(void 0);
function be() {
  const t = _n(cn);
========
const on = Sn(void 0);
function be() {
  const t = kn(on);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ne = Ot("", {
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
function rr({ variant: t = "default", ...e }) {
  const r = gt(), n = mt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  return /* @__PURE__ */ o(cn.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function _i({
========
  return /* @__PURE__ */ o(on.Provider, { value: n, children: /* @__PURE__ */ o(rt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function yi({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  ...t
}) {
  return /* @__PURE__ */ o(rt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function nr({
  ...t
}) {
  return /* @__PURE__ */ o(rt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function or({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  children: a,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: s,
  onCloseAutoFocus: i,
  ...l
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const d = ht(), u = nn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
========
  const i = gt();
  return /* @__PURE__ */ o(rt.Portal, { children: /* @__PURE__ */ o(
    rt.Content,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    {
      "data-slot": "dropdown-menu-content",
      ...u,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      style: { zIndex: Jr, ...n },
      ...l,
      children: /* @__PURE__ */ o("div", { dir: d, children: a })
    }
  ) });
}
function Ti({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Li({
========
      style: { zIndex: Xr, ...n },
      ...s,
      children: /* @__PURE__ */ o("div", { dir: i, children: a })
    }
  ) });
}
function Si({ ...t }) {
  return /* @__PURE__ */ o(rt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function ki({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = gt(), s = be();
  return /* @__PURE__ */ o(
    rt.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: g(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function Jt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = gt(), i = be();
  return /* @__PURE__ */ m(
    rt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: i.variant })
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
            children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Ke, {}) })
          }
        ),
        e
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function sa({
========
function ta({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  ...t
}) {
  return /* @__PURE__ */ o(rt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Tr({
========
function Ar({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = gt(), s = be();
  return /* @__PURE__ */ m(
    rt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Ke, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ar({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    rt.Label,
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
function sr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    rt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ai({ className: t, ...e }) {
========
function Ci({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Di({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Mi({
========
function Ei({ ...t }) {
  return /* @__PURE__ */ o(rt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Ii({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = be(), s = gt();
  return /* @__PURE__ */ m(
    rt.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        s === "rtl" ? /* @__PURE__ */ o(Cn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(En, { className: "tw:ms-auto" })
========
        s === "rtl" ? /* @__PURE__ */ o(xn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(yn, { className: "tw:ms-auto" })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Pi({
========
function _i({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = gt();
  return /* @__PURE__ */ o(
    rt.SubContent,
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
      style: { zIndex: me, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Oi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    xn.Root,
========
function Ti({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    bn.Root,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ri({
========
function Li({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  ...e
}) {
  const r = gt();
  return /* @__PURE__ */ o(
    Oe.Root,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Bi({
========
function Ai({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Oe.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Oe.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const ji = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Lr = (t, e) => t[e] ?? e;
function ia({
========
const Di = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Dr = (t, e) => t[e] ?? e;
function ea({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const i = Lr(n, "%cancelButton_tooltip%"), l = s ?? Lr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
========
  const i = Dr(n, "%cancelButton_tooltip%"), l = s ?? Dr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(Qe, { children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Fr, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    /* @__PURE__ */ o(an, {}),
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
========
    /* @__PURE__ */ o(en, {}),
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(pe, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function ve() {
  return /Macintosh/i.test(navigator.userAgent);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Gi() {
  return /Windows/i.test(navigator.userAgent);
}
const la = ["input", "select", "textarea", "button"], ca = ["button", "textbox"], zi = ({
========
function Mi() {
  return /Windows/i.test(navigator.userAgent);
}
const ra = ["input", "select", "textarea", "button"], na = ["button", "textbox"], Oi = ({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const a = C(null), [s, i] = O(void 0), [l, d] = O(void 0), u = T(
    (f) => {
      i(f);
      const v = t.find((E) => E.id === f);
========
  const a = I(null), [s, i] = P(void 0), [l, d] = P(void 0), f = T(
    (w) => {
      i(w);
      const v = t.find((k) => k.id === w);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      v && (e == null || e(v));
      const p = document.getElementById(f);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ), w = T(
    (f) => {
      const v = t.find((p) => p.id === f);
      v && (d((p) => p === f ? void 0 : f), r == null || r(v));
    },
    [r, t]
  ), y = (f) => {
    if (!f) return !1;
    const v = f.tagName.toLowerCase();
    if (f.isContentEditable || la.includes(v)) return !0;
    const p = f.getAttribute("role");
    if (p && ca.includes(p)) return !0;
    const E = f.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, x = T(
    (f) => {
      var X;
      const v = f.target, p = (D) => D ? document.getElementById(D) : void 0, E = p(l), H = p(s);
      if (!!(E && v && E.contains(v) && v !== E) && y(v)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !v.isContentEditable) {
========
  ), u = T(
    (w) => {
      const v = t.find((p) => p.id === w);
      v && (d((p) => p === w ? void 0 : w), r == null || r(v));
    },
    [r, t]
  ), y = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || ra.includes(v)) return !0;
    const p = w.getAttribute("role");
    if (p && na.includes(p)) return !0;
    const k = w.getAttribute("tabindex");
    return k !== void 0 && k !== "-1";
  }, S = T(
    (w) => {
      var Z;
      const v = w.target, p = (D) => D ? document.getElementById(D) : void 0, k = p(l), H = p(s);
      if (!!(k && v && k.contains(v) && v !== k) && y(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          if (l) {
            f.preventDefault(), f.stopPropagation();
            const D = t.find((K) => K.id === l);
            D && u(D.id);
          }
          return;
        }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!E) return;
          const D = Array.from(
            E.querySelectorAll(
========
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!k) return;
          const D = Array.from(
            k.querySelectorAll(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const K = D.findIndex((ht) => ht === v);
          if (K === -1) return;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          let lt;
          f.key === "ArrowDown" ? lt = Math.min(K + 1, D.length - 1) : lt = Math.max(K - 1, 0), lt !== K && (f.preventDefault(), f.stopPropagation(), (X = D[lt]) == null || X.focus());
========
          let ut;
          w.key === "ArrowDown" ? ut = Math.min(K + 1, D.length - 1) : ut = Math.max(K - 1, 0), ut !== K && (w.preventDefault(), w.stopPropagation(), (Z = D[ut]) == null || Z.focus());
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          return;
        }
        return;
      }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      const k = t.findIndex((D) => D.id === s);
      let P = k;
      switch (f.key) {
        case "ArrowDown":
          P = Math.min(k + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(k - 1, 0), f.preventDefault();
          break;
        case "Home":
          P = 0, f.preventDefault();
          break;
        case "End":
          P = t.length - 1, f.preventDefault();
========
      const C = t.findIndex((D) => D.id === s);
      let M = C;
      switch (w.key) {
        case "ArrowDown":
          M = Math.min(C + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          M = Math.max(C - 1, 0), w.preventDefault();
          break;
        case "Home":
          M = 0, w.preventDefault();
          break;
        case "End":
          M = t.length - 1, w.preventDefault();
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          break;
        case " ":
        case "Enter":
          s && w(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const D = H;
          if (D) {
            const K = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ut = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
            ), pt = K ?? lt;
            if (pt) {
              f.preventDefault(), pt.focus();
========
            ), ht = K ?? ut;
            if (ht) {
              w.preventDefault(), ht.focus();
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (y(v) || (n == null || n(f.key), f.preventDefault()));
          return;
      }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      const q = t[P];
      q && u(q.id);
========
      const J = t[M];
      J && f(J.id);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    },
    [t, u, s, l, w, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: u
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
}, da = Ot(
========
}, oa = Pt(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
function fe({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? Ue.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        da({ variant: e }),
========
        oa({ variant: e }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        t
      ),
      ...n
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Hi({ className: t, ...e }) {
========
function Pi({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function dn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function Ui({
========
function an(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function Ri({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = mt.useRef(null);
  mt.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), mt.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        Yt(i, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
========
        Qt(i, '[tabindex]:not([tabindex="-1"])').forEach((u) => {
          u.setAttribute("tabindex", "-1");
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        });
      });
    };
    l();
    const d = new MutationObserver(() => {
      l();
    });
    return d.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      d.disconnect();
    };
  }, []);
  const s = (i) => {
    var d;
    const { current: l } = a;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    if (l && dn(i, l)) {
========
    if (l && an(i, l)) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      if (i.key === "ArrowDown") {
        i.preventDefault(), (d = Qt(l)[0]) == null || d.focus();
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Fi({
========
function Bi({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ki({ className: t, ...e }) {
========
function ji({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function $i({ className: t, ...e }) {
========
function Gi({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ua(t) {
  ft.useEffect(() => {
========
function aa(t) {
  mt.useEffect(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Qt(t.current) : [], s = a.indexOf(document.activeElement), i = n.key === "ArrowRight" ? s + 1 : s - 1;
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function wa(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function fa(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function qi({
========
function sa(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ia(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function zi({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = mt.useRef(null);
  mt.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  }, [a]), ua(i);
  const l = ft.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), d = ft.useCallback(
    (w) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!dn(w, y)) {
        e == null || e(w);
========
  }, [a]), aa(i);
  const l = mt.useMemo(
    () => i.current ? Qt(i.current) : [],
    [i]
  ), d = mt.useCallback(
    (u) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!an(u, y)) {
        e == null || e(u);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        return;
      }
      const x = y.closest("table"), f = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        Yt(x).filter(
          (E) => E.tagName === "TR"
========
        Qt(S).filter(
          (k) => k.tagName === "TR"
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        )
      ) : [], v = f.indexOf(y), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), fa(f, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), wa(l, p, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const E = y.closest("table");
        E && E.focus();
========
      if (u.key === "ArrowDown" || u.key === "ArrowUp")
        u.preventDefault(), ia(w, v, u.key);
      else if (u.key === "ArrowLeft" || u.key === "ArrowRight")
        u.preventDefault(), sa(l, p, u.key);
      else if (u.key === "Escape") {
        u.preventDefault();
        const k = y.closest("table");
        k && k.focus();
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      }
      e == null || e(w);
    },
    [i, l, e]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ), u = ft.useCallback(
    (w) => {
      n && (r == null || r(w));
========
  ), f = mt.useCallback(
    (u) => {
      n && (r == null || r(u));
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: d,
      onFocus: u,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Vi({ className: t, ...e }) {
========
function Hi({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ji({ className: t, ...e }) {
========
function Ui({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Xi({ className: t, ...e }) {
========
function Ki({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function pa(t, e = !0) {
  const [r, n] = O(!1);
  return F(() => {
========
function la(t, e = !0) {
  const [r, n] = P(!1);
  return V(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ma({
========
function ca({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const n = pa(r, e);
========
  const n = la(r, e);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Wi({
========
function Fi({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: u,
  isOpen: w = void 0,
  onOpenChange: y = void 0,
  isDisabled: x = !1,
  sortSelected: f = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  className: E = void 0,
  variant: H = "ghost",
  id: G
}) {
  const [Z, k] = O(!1), P = C(null), q = T(
========
  className: k = void 0,
  variant: H = "ghost",
  id: G
}) {
  const [Y, C] = P(!1), M = I(null), J = T(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    (z) => {
      var nt;
      const it = (nt = t.find((wt) => wt.label === z)) == null ? void 0 : nt.value;
      it && r(
        e.includes(it) ? e.filter((wt) => wt !== it) : [...e, it]
      );
    },
    [t, e, r]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ), X = () => u || n, D = w ?? Z, K = y ?? k, [lt, pt] = O(D), [Tt, V] = O(e);
  lt !== D && (pt(D), D && V(e));
  const Rt = wt(() => {
    if (!f) return t;
    const z = t.filter((et) => et.starred).sort((et, ct) => et.label.localeCompare(ct.label)), at = t.filter((et) => !et.starred).sort((et, ct) => {
      const At = Tt.includes(et.value), Bt = Tt.includes(ct.value);
      return At && !Bt ? -1 : !At && Bt ? 1 : et.label.localeCompare(ct.label);
    });
    return [...z, ...at];
  }, [t, Tt, f]), Ut = () => {
    const z = t.map((at) => at.value);
    V(z), r(z);
  }, Lt = () => {
    V([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: E, children: /* @__PURE__ */ m(Ye, { open: D, onOpenChange: K, children: [
    /* @__PURE__ */ o(je, { asChild: !0, children: /* @__PURE__ */ m(
      Y,
========
  ), Z = () => f || n, D = u ?? Y, K = y ?? C, [ut, ht] = P(D), [Lt, X] = P(e);
  ut !== D && (ht(D), D && X(e));
  const Rt = pt(() => {
    if (!w) return t;
    const z = t.filter((nt) => nt.starred).sort((nt, wt) => nt.label.localeCompare(wt.label)), it = t.filter((nt) => !nt.starred).sort((nt, wt) => {
      const Dt = Lt.includes(nt.value), Bt = Lt.includes(wt.value);
      return Dt && !Bt ? -1 : !Dt && Bt ? 1 : nt.label.localeCompare(wt.label);
    });
    return [...z, ...it];
  }, [t, Lt, w]), Ut = () => {
    const z = t.map((it) => it.value);
    X(z), r(z);
  }, At = () => {
    X([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: k, children: /* @__PURE__ */ m(tr, { open: D, onOpenChange: K, children: [
    /* @__PURE__ */ o(ze, { asChild: !0, children: /* @__PURE__ */ m(
      Q,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      {
        variant: H,
        role: "combobox",
        "aria-expanded": D,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: x,
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: g(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: Z()
              }
            )
          ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          /* @__PURE__ */ o(Kr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
========
          /* @__PURE__ */ o($r, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        ]
      }
    ) }),
    /* @__PURE__ */ o(er, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Je, { children: [
      /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        Ve,
========
        Xe,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Q, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(Q, { variant: "ghost", size: "sm", onClick: At, children: l })
      ] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      /* @__PURE__ */ o(ma, { isEnabled: v, scrollerRef: P, children: /* @__PURE__ */ m(Je, { ref: P, children: [
        /* @__PURE__ */ o(Xe, { children: d }),
========
      /* @__PURE__ */ o(ca, { isEnabled: v, scrollerRef: M, children: /* @__PURE__ */ m(We, { ref: M, children: [
        /* @__PURE__ */ o(Ze, { children: d }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        /* @__PURE__ */ o(we, { children: Rt.map((z) => /* @__PURE__ */ m(
          he,
          {
            value: z.label,
            onSelect: J,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                pe,
                {
                  className: g(
                    "tw:h-4 tw:w-4",
                    e.includes(z.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
              z.starred && /* @__PURE__ */ o(An, { className: "tw:h-4 tw:w-4" }),
========
              z.starred && /* @__PURE__ */ o(In, { className: "tw:h-4 tw:w-4" }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: z.label }),
              z.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: z.secondaryLabel })
            ]
          },
          z.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function St(t) {
  return t.replace(/^\+/, "");
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ha(t, e) {
========
function da(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (!t || e === "") return !1;
  const r = St(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && St(n.marker).toLowerCase() === r
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ga(t, e, r) {
========
function ua(t, e, r) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (!e) return [...t];
  const n = [...t], a = St(e).toLowerCase();
  return r === "passive" ? Ir({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Ir({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Zt(t) {
  return t.isComposing || t.keyCode === 229;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const un = /^[a-z0-9+-]$/i;
function ba(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ve()) && e !== "Dead") {
    if (un.test(e)) return e;
========
const sn = /^[a-z0-9+-]$/i;
function wa(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ve()) && e !== "Dead") {
    if (sn.test(e)) return e;
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Na = [
========
const fa = [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
], va = [
========
], pa = [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ya() {
  return [...Na, ...va.filter((t) => un.test(t))];
========
function ma() {
  return [...fa, ...pa.filter((t) => sn.test(t))];
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
}
function ft(t) {
  t.preventDefault(), t.stopPropagation();
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function xa(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (de(t) || go.has(t.key))
========
function ha(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (Zt(t) || fo.has(t.key))
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    return "passed";
  const a = !ve();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && ft(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return ft(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    return ut(t), ga(
      e.items.map((u) => ({ label: u.marker })),
========
    return ft(t), ua(
      e.items.map((f) => ({ label: f.marker })),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      e.filter,
      // The host-driven mode, for every kind: all marker palettes are host-driven (the session
      // owns the query and the palette renders it read-only), so this commit must resolve against
      // the same list the host filtered. `'passive'` is that mode's name — a label PREFIX match,
      // mirroring PT9's marker dropdown — not containment. Ranking cmdk's way here instead would
      // commit an item the rendered list never offered.
      "passive"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return ft(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (ft(t), e.filter === "")
        return r.dismiss(), "ended";
      const w = St(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, w)) {
        const y = e.items.find(
          (x) => St(x.marker).toLowerCase() === w
        );
        return y && r.commitItem(y.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    ut(t);
    const d = St(e.filter).toLowerCase(), u = e.items.find(
      (w) => St(w.marker).toLowerCase() === d
========
    ft(t);
    const d = St(e.filter).toLowerCase(), f = e.items.find(
      (u) => St(u.marker).toLowerCase() === d
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    );
    return u && r.commitItem(u.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (ft(t), r.dismiss(), "ended") : (ft(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (ft(t), "continue") : (ft(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    return ut(t), r.dismiss(), "ended";
  const s = ba(t);
  return t.key === "Backspace" || s !== void 0 ? (ut(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (ut(t), "continue");
}
function Sa(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function wn(t, e) {
========
    return ft(t), r.dismiss(), "ended";
  const s = wa(t);
  return t.key === "Backspace" || s !== void 0 ? (ft(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (ft(t), "continue");
}
function ga(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function ln(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ka(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Ca(t) {
========
function ba(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Na(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: d,
    restoreSelectionIfLost: u,
    hasEditorChangedSinceFocus: w,
    focusEditor: y,
    applyItem: x,
    onShowError: f
  } = t, v = () => {
    u(), y();
  };
  a.current += 1;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const p = a.current, E = () => a.current === p, H = { kind: r, token: p, filter: "", items: e };
========
  const p = a.current, k = () => a.current === p, H = { kind: r, token: p, filter: "", items: e };
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  n && (H.isNoteMarker = n), s(H), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    keys: ya(),
========
    keys: ma(),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    onKey: (G) => l(G)
  }).then((G) => {
    var C;
    i(p);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    const Z = G ?? ((k = H.itemToApplyOnClose) == null ? void 0 : k.marker);
    if (Z !== void 0) {
      const P = (w == null ? void 0 : w()) ?? !1;
      v();
      const q = P ? void 0 : e.find((X) => X.marker === Z);
      q && x(q);
    } else E() && v();
  }).catch((G) => {
    i(p), E() && v(), f(G);
  });
}
function Ea(t, e) {
========
    const Y = G ?? ((C = H.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (Y !== void 0) {
      const M = (u == null ? void 0 : u()) ?? !1;
      v();
      const J = M ? void 0 : e.find((Z) => Z.marker === Y);
      J && S(J);
    } else k() && v();
  }).catch((G) => {
    i(p), k() && v(), w(G);
  });
}
function va(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: l,
    hasEditorChangedSinceFocus: d
  } = e, u = r.current;
  if (!u) return "no-session";
  const w = (x) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    x();
  };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  return xa(t, u, {
    update: (x) => a.update(x),
========
  return ha(t, f, {
    update: (S) => a.update(S),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (x) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedMarker(x);
    }),
    commitTypedAndReopen: (x) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedMarker(x, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (x) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedCloser(x);
    }),
    commitItem: (x) => w(() => {
      var v;
      const f = u.items.find((p) => p.marker === x);
      if (f) {
        if (f.kind === "note") {
          u.itemToApplyOnClose = f;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(f, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && l(u.token), "routed";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ia({
========
function xa({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  F(() => {
========
  V(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    const n = r ?? document, a = () => {
      t() && e();
    };
    return n.addEventListener("compositionstart", a, { capture: !0 }), () => {
      n.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function _a({
========
function ya({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  F(() => {
    const i = s ?? document, l = (d) => {
      var y, x, f;
      const u = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!u || d.target !== u) return;
      const w = (x = e.current) == null ? void 0 : x.getSelection();
      w ? r.current = w : (f = e.current) != null && f.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = wn(
========
  V(() => {
    const i = s ?? document, l = (d) => {
      var y, S, w;
      const f = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!f || d.target !== f) return;
      const u = (S = e.current) == null ? void 0 : S.getSelection();
      u ? r.current = u : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = ln(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        () => {
          var v;
          return (v = e.current) == null ? void 0 : v.getUsj();
        },
        () => {
          var v;
          return (v = e.current) == null ? void 0 : v.getSelection();
        }
      ));
    };
    return i.addEventListener("focusout", l), () => i.removeEventListener("focusout", l);
  }, [t, e, r, n, a, s]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ta({
========
function Sa({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const n = C(void 0), a = T(
========
  const n = I(void 0), a = T(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = T(
    (i) => {
      var l;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      Sa(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return F(
========
      ga(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return V(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    () => () => {
      var i;
      (i = n.current) == null || i.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: s };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ar({ className: t, ...e }) {
========
function Mr({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function La({ className: t, ...e }) {
========
function ka({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Aa = /* @__PURE__ */ new Set([
========
const Ca = /* @__PURE__ */ new Set([
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Da(t) {
  const e = qr(t, "");
  let r = 0;
  for (; r < e.length && Aa.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = bo(t, r);
  return a ? [...n, a] : n;
}
function Ma(t) {
  const e = [];
  let r = "";
  return qr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Pa(t) {
  const e = Da(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Ma(t), separator: "+" };
}
function Dr({ hint: t }) {
  const { keycaps: e, separator: r } = Pa(t);
  return e.length === 1 ? /* @__PURE__ */ o(Ar, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(La, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Hr, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Ar, { children: n })
========
function Ea(t) {
  const e = Vr(t, "");
  let r = 0;
  for (; r < e.length && Ca.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = po(t, r);
  return a ? [...n, a] : n;
}
function Ia(t) {
  const e = [];
  let r = "";
  return Vr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function _a(t) {
  const e = Ea(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Ia(t), separator: "+" };
}
function Or({ hint: t }) {
  const { keycaps: e, separator: r } = _a(t);
  return e.length === 1 ? /* @__PURE__ */ o(Mr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(ka, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Ur, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Mr, { children: n })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      ] }, a)
    )) })
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Zi = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Mr = (t, e) => t[e] ?? e;
function Oa({
========
const $i = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Pr = (t, e) => t[e] ?? e;
function Ta({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const d = ve(), u = Mr(a, "%undoButton_tooltip%"), w = Mr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
========
  const d = ve(), f = Pr(a, "%undoButton_tooltip%"), u = Pr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(Qe, { children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
========
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(_n, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(Or, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(en, {}),
    e && /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          "aria-label": u,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          children: /* @__PURE__ */ o(Dn, {})
========
          children: /* @__PURE__ */ o(Tn, {})
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        u,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          /* @__PURE__ */ o(Dr, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(an, {}),
    e && /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(Mn, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(Dr, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
========
          /* @__PURE__ */ o(Or, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        ] })
      ] }) })
    ] }) })
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ra({
========
function La({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const a = C(null);
  return F(() => {
========
  const a = I(null);
  return V(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    var d;
    const s = ve(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (u) => {
      var y, x, f, v;
      if (!i || document.activeElement !== i) return;
      const w = u.key.toLowerCase();
      if (s) {
        if (!u.metaKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((y = e.current) == null || y.undo())) : u.shiftKey && w === "z" && (u.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!u.ctrlKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || u.shiftKey && w === "z") && (u.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ba() {
  const t = C(void 0), e = C(new DOMRect()), r = C({
========
function Aa() {
  const t = I(void 0), e = I(new DOMRect()), r = I({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    getBoundingClientRect: () => {
      var s;
      const a = (s = t.current) == null ? void 0 : s.measure();
      return a && (e.current = a), e.current;
    },
    get contextElement() {
      var a;
      return (a = t.current) == null ? void 0 : a.contextElement;
    }
  }), n = T((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return pt(() => ({ virtualRef: r, setSource: n }), [n]);
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ja(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ga(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const za = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(yt, { children: [
========
function Da(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ma(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Oa = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(yt, { children: [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ha({
========
function Pa({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const s = C(!1), i = C(null), l = C(null), d = C(!1), [u, w] = O(t), [y, x] = O(e), [f, v] = O(!1), p = C(!1), E = C(u);
  E.current = u;
  const H = C(y);
  H.current = y, F(() => {
    w(t);
  }, [t]), F(() => {
    y !== e && x(e);
  }, [e]);
  const G = (k) => {
    if (d.current = !1, v(k), !k) {
      const P = E.current, q = H.current;
      P !== "custom" || q ? (P !== t || q !== e) && (s.current = !0, r(P, q)) : (w(t), x(e));
    }
  }, Z = (k) => {
    var P, q, X, D;
    k.stopPropagation(), document.activeElement === l.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((P = i.current) == null || P.focus(), d.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((q = l.current) == null || q.focus(), d.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((X = i.current) == null ? void 0 : X.selectionStart) === 0 && ((D = l.current) == null || D.focus(), d.current = !1), u === "custom" && k.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ m(tr, { open: f, onOpenChange: G, children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: za(t, n, e) }) }) }),
========
  const s = I(!1), i = I(null), l = I(null), d = I(!1), [f, u] = P(t), [y, S] = P(e), [w, v] = P(!1), p = I(!1), k = I(f);
  k.current = f;
  const H = I(y);
  H.current = y, V(() => {
    u(t);
  }, [t]), V(() => {
    y !== e && S(e);
  }, [e]);
  const G = (C) => {
    if (d.current = !1, v(C), !C) {
      const M = k.current, J = H.current;
      M !== "custom" || J ? (M !== t || J !== e) && (s.current = !0, r(M, J)) : (u(t), S(e));
    }
  }, Y = (C) => {
    var M, J, Z, D;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((M = i.current) == null || M.focus(), d.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? ((J = l.current) == null || J.focus(), d.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((Z = i.current) == null ? void 0 : Z.selectionStart) === 0 && ((D = l.current) == null || D.focus(), d.current = !1), f === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ m(rr, { open: w, onOpenChange: G, children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(nr, { asChild: !0, children: /* @__PURE__ */ o(Q, { variant: "outline", className: "tw:h-6", children: Oa(t, n, e) }) }) }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      /* @__PURE__ */ o(It, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      or,
      {
        style: { zIndex: me },
        onEscapeKeyDown: () => {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          E.current = t, H.current = e, w(t), x(e);
        },
        onCloseAutoFocus: (k) => {
          s.current && (s.current = !1, k.preventDefault(), en(a));
========
          k.current = t, H.current = e, u(t), S(e);
        },
        onCloseAutoFocus: (C) => {
          s.current && (s.current = !1, C.preventDefault(), a());
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: Y,
        onMouseMove: () => {
          var C;
          d.current && ((C = i.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ o(ar, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(sr, {}),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Pe })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Pe })
========
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Re })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              ref: l,
              checked: u === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                p.current = u === "custom";
              },
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
              onClick: (k) => {
                var P;
                if (k.stopPropagation(), p.current && k.target !== i.current) {
                  G(!1);
                  return;
                }
                d.current = !0, (P = i.current) == null || P.focus();
========
              onClick: (C) => {
                var M;
                if (C.stopPropagation(), p.current && C.target !== i.current) {
                  G(!1);
                  return;
                }
                d.current = !0, (M = i.current) == null || M.focus();
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                  Yr,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), w("custom"), d.current = !0;
========
                  Qr,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), u("custom"), d.current = !0;
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: y,
                    onKeyDown: (C) => {
                      C.key === "Enter" || C.key === "ArrowUp" || C.key === "ArrowDown" || C.key === "ArrowLeft" || C.key === "ArrowRight" || C.stopPropagation();
                    },
                    maxLength: 1,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                    onChange: (k) => x(k.target.value)
========
                    onChange: (C) => S(C.target.value)
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Ua = (t, e) => t === "f" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Fe, {}),
========
const Ra = (t, e) => t === "f" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o($e, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(qe, {}),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Ke, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(yt, { children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  /* @__PURE__ */ o(Ue, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Fa = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), No(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Ka({
========
  /* @__PURE__ */ o(Fe, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Ba = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), mo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ja({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const s = C(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(tr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: Ua(t, r) }) }) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: Fa(t, r) }) })
========
  const s = I(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(rr, { children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(nr, { asChild: !0, children: /* @__PURE__ */ o(Q, { variant: "outline", className: "tw:h-6", children: Ra(t, r) }) }) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: Ba(t, r) }) })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    ] }) }),
    /* @__PURE__ */ m(
      or,
      {
        style: { zIndex: me },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), en(a));
        },
        children: [
          /* @__PURE__ */ o(ar, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(sr, {}),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Fe, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                /* @__PURE__ */ o(Fe, {}),
========
                /* @__PURE__ */ o($e, {}),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                /* @__PURE__ */ o(Ke, {}),
========
                /* @__PURE__ */ o(qe, {}),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Pr = '[aria-controls="editor-context-menu"]';
function Or(t) {
  return t ? t.matches(Pr) ? !0 : !!t.querySelector(Pr) : !1;
}
const Yi = Object.freeze([
========
const Rr = '[aria-controls="editor-context-menu"]';
function Ae(t) {
  return t ? t.matches(Rr) ? !0 : !!t.querySelector(Rr) : !1;
}
const qi = Object.freeze([
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function $a({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Pn, { className: e, size: 16 });
}
function qa({ state: t }) {
========
function Ga({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Ln, { className: e, size: 16 });
}
function za({ state: t }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(pe, { size: 16 })
    }
  );
}
function ue(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Rr({
========
function Br({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    he,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      value: ue(t),
      onSelect: t.action,
      children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        t.selectionState !== void 0 && /* @__PURE__ */ o(qa, { state: t.selectionState }),
========
        t.selectionState !== void 0 && /* @__PURE__ */ o(za, { state: t.selectionState }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o($a, { icon: t.icon }) }) }),
========
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Ga, { icon: t.icon }) }) }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Ho, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
========
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Bo, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      ]
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Va({
========
function Ha({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = O(""), [l] = O(() => {
    const w = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    return w ? ue(w) : void 0;
  }), [d, u] = wt(() => {
    const w = St(s.trim().toLowerCase());
    if (!w) {
      const f = e.filter((v) => !v.isDisallowed);
      return [f.length > 0 ? f : e, []];
========
    return u ? ue(u) : void 0;
  }), [d, f] = pt(() => {
    const u = St(s.trim().toLowerCase());
    if (!u) {
      const w = e.filter((v) => !v.isDisallowed);
      return [w.length > 0 ? w : e, []];
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    }
    const y = e.filter((f) => {
      var p;
      const v = (p = f.marker) == null ? void 0 : p.toLowerCase();
      return f.isDisallowed ? v === w : v == null ? void 0 : v.includes(w);
    }), x = e.filter(
      (f) => f.title.toLowerCase().includes(w) && !y.includes(f)
    );
    return [y, x];
  }, [s, e]);
  return /* @__PURE__ */ m(Je, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: l, children: [
    /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      Ve,
========
      Xe,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (w) => i(w),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    /* @__PURE__ */ m(Je, { children: [
      /* @__PURE__ */ o(Xe, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(we, { children: d.map((w) => /* @__PURE__ */ o(
        Rr,
========
    /* @__PURE__ */ m(We, { children: [
      /* @__PURE__ */ o(Ze, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(we, { children: d.map((u) => /* @__PURE__ */ o(
        Br,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        {
          item: w,
          localizedStrings: t
        },
        ue(w)
      )) }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      u.length > 0 && /* @__PURE__ */ m(yt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Re, { alwaysRender: !0 }),
        /* @__PURE__ */ o(we, { children: u.map((w) => /* @__PURE__ */ o(
          Rr,
========
      f.length > 0 && /* @__PURE__ */ m(yt, { children: [
        d.length > 0 && /* @__PURE__ */ o(je, { alwaysRender: !0 }),
        /* @__PURE__ */ o(we, { children: f.map((u) => /* @__PURE__ */ o(
          Br,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          {
            item: w,
            localizedStrings: t
          },
          ue(w)
        )) })
      ] })
    ] })
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ja(t, e, r, n, a) {
========
function Ua(t, e, r, n, a) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (!n || n === "p") return [];
  const s = le[n], i = s != null && s.children ? s : a && le[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      ...d.map((u) => ({
        marker: u,
        title: r[ie[u].description] ?? ie[u].description,
========
      ...d.map((f) => ({
        marker: f,
        title: r[le[f].description] ?? le[f].description,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(u), e();
        }
      }))
    );
  }), l.sort((d, u) => (d.marker ?? d.title).localeCompare(u.marker ?? u.title));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Br(t) {
========
function jr(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (!t || !qt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Xa(t) {
========
function Ka(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Wa(t) {
========
function Fa(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Za(t) {
========
function $a(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ya(t, e) {
========
function qa(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
      const l = i.insert.slice(n), d = Math.min(l.length, s.length);
      if (l.slice(0, d) !== s.slice(0, d)) return !1;
      s = s.slice(d), n += d, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Qa(t) {
========
function Va(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ts(t) {
========
function Ja(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const es = 300, Le = "*", rs = {
========
const Xa = 300, De = "*", Wa = {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Qi({
========
function Vi({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: u,
  inline: w = !1,
  ref: y,
  initialCaretPosition: x,
  markerPalette: f,
  onNoteEdit: v
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  var xr;
  const p = C(null), E = C(null), H = C(null), G = C(s);
  F(() => {
    G.current = s;
  }, [s]);
  const Z = C(x);
  F(() => {
    Z.current = x;
  }, [x]);
  const k = T(() => {
========
  var Sr;
  const p = I(null), k = I(null), H = I(null), G = I(s);
  V(() => {
    G.current = s;
  }, [s]);
  const Y = I(S);
  V(() => {
    Y.current = S;
  }, [S]);
  const C = T(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    var b, N;
    const c = Y.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (N = p.current) == null || N.selectNote(0);
  }, []);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  se(() => {
    if (w || !H.current) return;
    const c = parseFloat(getComputedStyle(H.current).width);
    c > 0 && (H.current.style.width = `${c}px`);
  }, [w]);
  const [P, q] = O("generated"), [X, D] = O("generated"), [K, lt] = O(Le), [pt, Tt] = O(Le), [V, Rt] = O("f"), [Ut, Lt] = O(!1), [z, at] = O(!0), [et, ct] = O(!1), At = C(!1), Bt = C(""), h = C(!1), A = C(void 0), U = C([]), Q = C([]), $ = C(void 0), J = C(void 0), lr = T(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (U.current = [...U.current, ...c], $.current = void 0);
  }, []), cr = T(
    (c, b) => {
      var _, I;
      if (!c) return;
      const N = Br(c), S = Br(b);
      if (!N && S) {
        $.current = {
========
  ie(() => {
    if (u || !H.current) return;
    const c = parseFloat(getComputedStyle(H.current).width);
    c > 0 && (H.current.style.width = `${c}px`);
  }, [u]);
  const [M, J] = P("generated"), [Z, D] = P("generated"), [K, ut] = P(De), [ht, Lt] = P(De), [X, Rt] = P("f"), [Ut, At] = P(!1), [z, it] = P(!0), [nt, wt] = P(!1), Dt = I(!1), Bt = I(""), h = I(!1), L = I(void 0), U = I([]), tt = I([]), F = I(void 0), W = I(void 0), dr = T(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (U.current = [...U.current, ...c], F.current = void 0);
  }, []), ur = T(
    (c, b) => {
      var E, B;
      if (!c) return;
      const N = jr(c), x = jr(b);
      if (!N && x) {
        F.current = {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          text: U.current,
          closedNoteOp: c,
          openNoteOp: b
        }, U.current = [];
        return;
      }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      const L = $.current;
      L && (N && !S && Gt(c, L.openNoteOp) && Gt(b, L.closedNoteOp) && !((I = (_ = p.current) == null ? void 0 : _.getOpsAfterNote(0)) != null && I.length) ? (U.current = L.text, $.current = void 0) : Gt(b, L.openNoteOp) || ($.current = void 0));
    },
    []
  ), [xt, te] = O(!1), ye = Ba(), [dr, pn] = O(), ur = C(null), gt = C(
    void 0
  ), mn = C(0), wr = C(f);
  F(() => {
    wr.current = f;
  }, [f]), F(
========
      const _ = F.current;
      _ && (N && !x && Gt(c, _.openNoteOp) && Gt(b, _.closedNoteOp) && !((B = (E = p.current) == null ? void 0 : E.getOpsAfterNote(0)) != null && B.length) ? (U.current = _.text, F.current = void 0) : Gt(b, _.openNoteOp) || (F.current = void 0));
    },
    []
  ), [bt, ee] = P(!1), xe = Aa(), [wr, dn] = P(), fr = I(null), Nt = I(
    void 0
  ), un = I(0), pr = I(w);
  V(() => {
    pr.current = w;
  }, [w]), V(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    () => () => {
      var c;
      Nt.current && (Nt.current = void 0, (c = pr.current) == null || c.dismiss());
    },
    []
  );
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const ee = C(void 0), xe = C(void 0), re = T(
    () => ka(
      xe.current,
      wn(
========
  const re = I(void 0), ye = I(void 0), ne = T(
    () => ba(
      ye.current,
      ln(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        () => {
          var c;
          return (c = p.current) == null ? void 0 : c.getUsj();
        },
        () => {
          var c;
          return (c = p.current) == null ? void 0 : c.getSelection();
        }
      )
    ),
    []
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ), { setSession: fr, clearSessionIfCurrent: ne } = Ta({
    sessionRef: gt,
    editorRef: p,
    baselineRef: xe
  }), Ft = T(() => {
    var b, N, S, L;
    if ((b = p.current) != null && b.getSelection() || (N = p.current) != null && N.getSelectedParaMarker()) return;
    const c = ee.current;
    c ? (S = p.current) == null || S.setSelection(c) : (L = p.current) == null || L.selectNote(0);
  }, []), oe = T(() => {
    var c;
    Ft(), (c = p.current) == null || c.focus();
  }, [Ft]), Dt = wt(
========
  ), { setSession: mr, clearSessionIfCurrent: oe } = Sa({
    sessionRef: Nt,
    editorRef: p,
    baselineRef: ye
  }), Kt = T(() => {
    var b, N, x, _;
    if ((b = p.current) != null && b.getSelection() || (N = p.current) != null && N.getSelectedParaMarker()) return;
    const c = re.current;
    c ? (x = p.current) == null || x.setSelection(c) : (_ = p.current) == null || _.selectNote(0);
  }, []), ae = T(() => {
    var c;
    Kt(), (c = p.current) == null || c.focus();
  }, [Kt]), _t = pt(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        ...i.view ?? po(),
========
        ...i.view ?? co(),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ), Se = wt(
    () => Ja(
========
  ), Se = pt(
    () => Ua(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      p,
      () => ee(!1),
      d,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      dr,
      V
    ),
    [d, dr, V]
  );
  F(() => {
    var c;
    xt || (c = p.current) == null || c.focus();
  }, [V, xt]);
  const Mt = T(() => {
    var S, L, _;
    const c = (S = E.current) == null ? void 0 : S.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), N = (_ = (L = E.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : _.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), jt = T(
    (c = !1) => {
      var N, S, L, _, I;
      v == null || v();
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b) && (r == null || r([b]), c && u && G.current)) {
        const B = [
          ...U.current,
          ...((L = p.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], M = Q.current, mt = !Gt(B, M);
        if (w && !mt && Gt(b, A.current))
          return;
        A.current = b;
        const W = [b];
        mt && (M.length > 0 && Ya(
          ((_ = u.current) == null ? void 0 : _.getOpsAfterNote(G.current)) ?? [],
          M
        ) && W.push({ delete: Za(M) }), W.push(...B), Q.current = B), (I = u.current) == null || I.replaceEmbedUpdate(G.current, W);
      }
    },
    [w, r, v, u]
  ), ke = T(
    (c) => {
      var N, S, L;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (S = p.current) == null || S.applyUpdate([c, { delete: 1 }]), b && ((L = p.current) == null || L.setSelection(b)), oe();
    },
    [oe]
  ), pr = T(
    (c, b) => {
      var L, _, I;
      gt.current || (L = p.current) == null || L.commitPendingMarkerEdits();
      const N = (I = (_ = p.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
      if (!N || !qt("note", N) || !N.insert.note) return;
      let S;
      c === "custom" ? S = b : c === "generated" ? S = Me : S = Pe, N.insert.note.caller !== S && (N.insert.note.caller = S, ke(N));
    },
    [ke]
  ), Kt = C(void 0), Ce = C(jt);
  F(() => {
    Ce.current = jt;
  }, [jt]);
  const $t = T(() => {
    Kt.current !== void 0 && (clearTimeout(Kt.current), Kt.current = void 0);
  }, []), bt = T(() => {
    Kt.current !== void 0 && ($t(), Ce.current(!0));
  }, [$t]), mr = T(() => {
    $t(), Kt.current = setTimeout(() => {
      Kt.current = void 0, Ce.current(!0);
    }, es);
  }, [$t]);
  F(() => {
    var L, _;
    let c, b, N;
    At.current = !1, h.current = !1, ee.current = void 0, at(!0);
    const S = e == null ? void 0 : e.at(0);
    if (A.current = S, U.current = [], Q.current = [], $.current = void 0, J.current = void 0, S && qt("note", S)) {
      const I = (L = S.insert.note) == null ? void 0 : L.caller;
      let B = "custom";
      I === Me ? B = "generated" : I === Pe && (B = "hidden");
      const M = B === "custom" && I !== void 0 ? I : Le;
      lt(M), Tt(M), q(B), D(B), Rt(((_ = S.insert.note) == null ? void 0 : _.style) ?? "f"), c = setTimeout(() => {
        var W, st, dt, Nt;
        const mt = (st = (W = p.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : st.at(0);
        (dt = p.current) == null || dt.applyUpdate(mt ? [S, { delete: 1 }] : [S]), k(), (Nt = p.current) == null || Nt.focus(), b = requestAnimationFrame(() => {
========
      wr,
      X
    ),
    [d, wr, X]
  );
  V(() => {
    var c;
    bt || (c = p.current) == null || c.focus();
  }, [X, bt]);
  const Mt = T(() => {
    var x, _, E;
    const c = (x = k.current) == null ? void 0 : x.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), N = (E = (_ = k.current) == null ? void 0 : _.ownerDocument.getSelection()) == null ? void 0 : E.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), jt = T(
    (c = !1) => {
      var N, x, _, E, B;
      v == null || v();
      const b = (x = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && qt("note", b) && (r == null || r([b]), c && f && G.current)) {
        const $ = [
          ...U.current,
          ...((_ = p.current) == null ? void 0 : _.getOpsAfterNote(0)) ?? []
        ], et = tt.current, A = !Gt($, et);
        if (u && !A && Gt(b, L.current))
          return;
        L.current = b;
        const q = [b];
        A && (et.length > 0 && qa(
          ((E = f.current) == null ? void 0 : E.getOpsAfterNote(G.current)) ?? [],
          et
        ) && q.push({ delete: $a(et) }), q.push(...$), tt.current = $), (B = f.current) == null || B.replaceEmbedUpdate(G.current, q);
      }
    },
    [u, r, v, f]
  ), ke = T(
    (c) => {
      var N, x, _;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (x = p.current) == null || x.applyUpdate([c, { delete: 1 }]), b && ((_ = p.current) == null || _.setSelection(b)), ae();
    },
    [ae]
  ), hr = T(
    (c, b) => {
      var _, E, B;
      Nt.current || (_ = p.current) == null || _.commitPendingMarkerEdits();
      const N = (B = (E = p.current) == null ? void 0 : E.getNoteOps(0)) == null ? void 0 : B.at(0);
      if (!N || !qt("note", N) || !N.insert.note) return;
      let x;
      c === "custom" ? x = b : c === "generated" ? x = Pe : x = Re, N.insert.note.caller !== x && (N.insert.note.caller = x, ke(N));
    },
    [ke]
  ), Ft = I(void 0), Ce = I(jt);
  V(() => {
    Ce.current = jt;
  }, [jt]);
  const $t = T(() => {
    Ft.current !== void 0 && (clearTimeout(Ft.current), Ft.current = void 0);
  }, []), vt = T(() => {
    Ft.current !== void 0 && ($t(), Ce.current(!0));
  }, [$t]), gr = T(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, Ce.current(!0);
    }, Xa);
  }, [$t]);
  V(() => {
    var _, E;
    let c, b, N;
    Dt.current = !1, h.current = !1, re.current = void 0, it(!0);
    const x = e == null ? void 0 : e.at(0);
    if (L.current = x, U.current = [], tt.current = [], F.current = void 0, W.current = void 0, x && qt("note", x)) {
      const B = (_ = x.insert.note) == null ? void 0 : _.caller;
      let $ = "custom";
      B === Pe ? $ = "generated" : B === Re && ($ = "hidden");
      const et = $ === "custom" && B !== void 0 ? B : De;
      ut(et), Lt(et), J($), D($), Rt(((E = x.insert.note) == null ? void 0 : E.style) ?? "f"), c = setTimeout(() => {
        var q, O, lt, ct;
        const A = (O = (q = p.current) == null ? void 0 : q.getNoteOps(0)) == null ? void 0 : O.at(0);
        (lt = p.current) == null || lt.applyUpdate(A ? [x, { delete: 1 }] : [x]), C(), (ct = p.current) == null || ct.focus(), b = requestAnimationFrame(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          N = setTimeout(() => {
            var xt;
            Mt() || (C(), (xt = p.current) == null || xt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      vt(), Y.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  }, [e, bt, Mt, k]), se(() => () => bt(), [bt]);
  const hr = T(() => {
    var c;
    h.current && (gt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), bt());
  }, [bt]);
  Tn(
========
  }, [e, vt, Mt, C]), ie(() => () => vt(), [vt]);
  const br = T(() => {
    var c;
    h.current && (Nt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), vt());
  }, [vt]);
  Cn(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    y,
    () => ({
      flushPendingEdits: br,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = H.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [br]
  );
  const Ee = T(() => {
    var c, b;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    if (!gt.current) {
      const N = (c = E.current) == null ? void 0 : c.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    w ? bt() : ($t(), jt(!0)), n();
  }, [$t, bt, w, n, jt]), Ie = C(Ee);
  se(() => {
    Ie.current = Ee;
  });
  const _e = C({ book: a.book, chapterNum: a.chapterNum });
  se(() => {
    (_e.current.book !== a.book || _e.current.chapterNum !== a.chapterNum) && (_e.current = { book: a.book, chapterNum: a.chapterNum }, Ie.current());
  }, [a.book, a.chapterNum]);
  const hn = () => {
    var _;
    const c = p.current, b = Xa(c == null ? void 0 : c.getUsj());
    if (!c || !b) return;
    const N = ((_ = E.current) == null ? void 0 : _.ownerDocument) ?? document, { activeElement: S } = N, L = c.getSelection() ?? ee.current;
    c.setSelection(b);
    try {
      c.copy();
    } finally {
      L ? c.setSelection(L) : c.selectNote(0), c.getSelection(), N.activeElement !== S && (S instanceof HTMLElement && S !== N.body ? S.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
    }
  }, gn = T(
    (c, b) => {
      v == null || v(), q(c), lt(b), pr(c, b), w && bt();
    },
    [pr, bt, w, v]
  ), bn = (c) => {
    var N, S, L, _, I;
    Rt(c), gt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (L = (S = p.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const B = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
      V !== "x" && c === "x" ? B == null || B.forEach((M) => Qa(M)) : V === "x" && c !== "x" && (B == null || B.forEach((M) => ts(M))), ke(b), w && bt();
    }
  }, Nn = (c) => {
    pn(c.contextMarker), ct(c.canRedo);
  }, vn = T(
    (c) => {
      var N, S, L, _, I, B, M;
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
========
    if (!Nt.current) {
      const N = (c = k.current) == null ? void 0 : c.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    u ? vt() : ($t(), jt(!0)), n();
  }, [$t, vt, u, n, jt]), Ie = I(Ee);
  ie(() => {
    Ie.current = Ee;
  });
  const _e = I({ book: a.book, chapterNum: a.chapterNum });
  ie(() => {
    (_e.current.book !== a.book || _e.current.chapterNum !== a.chapterNum) && (_e.current = { book: a.book, chapterNum: a.chapterNum }, Ie.current());
  }, [a.book, a.chapterNum]);
  const wn = () => {
    var E;
    const c = p.current, b = Ka(c == null ? void 0 : c.getUsj());
    if (!c || !b) return;
    const N = ((E = k.current) == null ? void 0 : E.ownerDocument) ?? document, { activeElement: x } = N, _ = c.getSelection() ?? re.current;
    c.setSelection(b), c.copy(), _ ? c.setSelection(_) : c.selectNote(0), c.getSelection(), N.activeElement !== x && (x instanceof HTMLElement && x !== N.body ? x.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
  }, fn = T(
    (c, b) => {
      v == null || v(), J(c), ut(b), hr(c, b), u && vt();
    },
    [hr, vt, u, v]
  ), pn = (c) => {
    var N, x, _, E, B;
    Rt(c), Nt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (_ = (x = p.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : _.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const $ = (B = (E = b.insert.note) == null ? void 0 : E.contents) == null ? void 0 : B.ops;
      X !== "x" && c === "x" ? $ == null || $.forEach((et) => Va(et)) : X === "x" && c !== "x" && ($ == null || $.forEach((et) => Ja(et))), ke(b), u && vt();
    }
  }, mn = (c) => {
    dn(c.contextMarker), wt(c.canRedo);
  }, hn = T(
    (c) => {
      var N, x, _, E, B, $, et;
      const b = (x = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : x.at(0);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      if (b && qt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var O;
          (O = p.current) == null || O.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        const mt = (L = b.insert.note) == null ? void 0 : L.style, W = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
        if (mt || Lt(!1), Lt(
          mt === "x" ? !!(W != null && W.every((st) => {
            var Nt, vt;
            if (!((Nt = st.attributes) != null && Nt.char)) return !0;
            const dt = ((vt = st.attributes) == null ? void 0 : vt.char).style;
            return dt === "xt" || dt === "xo" || dt === "xq";
          })) : !!(W != null && W.every((st) => {
            var Nt, vt;
            if (!((Nt = st.attributes) != null && Nt.char)) return !0;
            const dt = ((vt = st.attributes) == null ? void 0 : vt.char).style;
            return dt === "ft" || dt === "fr" || dt === "fq";
          }))
        ), !At.current) {
          At.current = !0, Bt.current = JSON.stringify(b), J.current = b, at(!0);
          return;
        }
        h.current = !0, cr(J.current, b), J.current = b, (M = (B = p.current) == null ? void 0 : B.getOpsAfterNote(0)) != null && M.length && setTimeout(lr, 0), at(JSON.stringify(b) === Bt.current), jt(), w && mr();
========
        const A = (_ = b.insert.note) == null ? void 0 : _.style, q = (B = (E = b.insert.note) == null ? void 0 : E.contents) == null ? void 0 : B.ops;
        if (A || At(!1), At(
          A === "x" ? !!(q != null && q.every((O) => {
            var ct, xt;
            if (!((ct = O.attributes) != null && ct.char)) return !0;
            const lt = ((xt = O.attributes) == null ? void 0 : xt.char).style;
            return lt === "xt" || lt === "xo" || lt === "xq";
          })) : !!(q != null && q.every((O) => {
            var ct, xt;
            if (!((ct = O.attributes) != null && ct.char)) return !0;
            const lt = ((xt = O.attributes) == null ? void 0 : xt.char).style;
            return lt === "ft" || lt === "fr" || lt === "fq";
          }))
        ), !Dt.current) {
          Dt.current = !0, Bt.current = JSON.stringify(b), W.current = b, it(!0);
          return;
        }
        h.current = !0, ur(W.current, b), W.current = b, (et = ($ = p.current) == null ? void 0 : $.getOpsAfterNote(0)) != null && et.length && setTimeout(dr, 0), it(JSON.stringify(b) === Bt.current), jt(), u && gr();
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      } else
        At(!1), it(!0);
    },
    [
      w,
      jt,
      gr,
      ur,
      dr
    ]
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ), gr = T(() => {
    const c = window.getSelection();
    if (!Se.length || !c || c.rangeCount === 0)
      return;
    const b = E.current;
    if (!b) return;
    const N = c.getRangeAt(0).cloneRange();
    ye.setSource({
      measure: () => {
        const S = ja(N);
        return S && Ga(S);
      },
      contextElement: b
    }), te(!0);
  }, [Se, ye]), Te = C(() => {
  }), br = T(
    (c, b, N) => {
      const { anchorRect: S } = c;
      if (!f || !S) return;
      const { hasTextSelection: L } = N;
      Ca({
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: L ? "selection" : "backslash",
========
  ), Te = T(() => {
    const c = window.getSelection();
    if (!Se.length || !c || c.rangeCount === 0)
      return !1;
    const b = k.current;
    if (!b) return !1;
    const N = c.getRangeAt(0).cloneRange();
    return xe.setSource({
      measure: () => {
        const x = Da(N);
        return x && Ma(x);
      },
      contextElement: b
    }), ee(!0), !0;
  }, [Se, xe]), Le = I(() => {
  }), Nr = T(
    (c, b, N) => {
      const { anchorRect: x } = c;
      if (!w || !x) return;
      const { hasTextSelection: _ } = N;
      Na({
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: _ ? "selection" : "backslash",
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        isNoteMarker: (_) => ha(Dt.styleInfo ?? kr, _),
        sessionCounterRef: mn,
        setSession: fr,
        clearSessionIfCurrent: ne,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (_) => Te.current(_),
        show: (_) => f.show({
          items: b.map(Wa),
          anchor: S,
          keyForwarding: _
========
        isNoteMarker: (E) => da(_t.styleInfo ?? _r, E),
        sessionCounterRef: un,
        setSession: mr,
        clearSessionIfCurrent: oe,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (E) => Le.current(E),
        show: (E) => w.show({
          items: b.map(Fa),
          anchor: x,
          keyForwarding: E
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        restoreSelectionIfLost: Ft,
        hasEditorChangedSinceFocus: re,
        focusEditor: () => {
          var _;
          return (_ = p.current) == null ? void 0 : _.focus();
        },
        applyItem: (_) => {
          var I;
          return (I = p.current) == null ? void 0 : I.applyMarkerMenuSelection(_, {
========
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ne,
        focusEditor: () => {
          var E;
          return (E = p.current) == null ? void 0 : E.focus();
        },
        applyItem: (E) => {
          var B;
          return (B = p.current) == null ? void 0 : B.applyMarkerMenuSelection(E, {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        onShowError: (_) => {
          (!vo(_) || _.code !== yo) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${xo(_)}`
========
        onShowError: (E) => {
          (!ho(E) || E.code !== go) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${bo(E)}`
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          );
        }
      });
    },
    [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      f,
      Ft,
      re,
      Dt.styleInfo,
      fr,
      ne
    ]
  ), ae = T(() => {
    var N;
    const c = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = mo(Dt.styleInfo ?? kr, c);
    return b.length === 0 ? !1 : (br(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [br, Dt.styleInfo]);
  Ia({
    isSessionOpen: T(() => !!gt.current, []),
    dismiss: T(() => f == null ? void 0 : f.dismiss(), [f])
  });
  const Nr = T(
    (c) => {
      if (!f) return;
      Ea(c, {
        sessionRef: gt,
        editorRef: p,
        palette: f,
        restoreCaret: Ft,
        reopenAtCaret: ae,
        clearSessionIfCurrent: ne,
        hasEditorChangedSinceFocus: re
      }) === "no-session" && f.dismiss();
    },
    [
      f,
      ae,
      Ft,
      ne,
      re
    ]
  );
  F(() => {
    Te.current = Nr;
  }, [Nr]), _a({
    containerRef: E,
    editorRef: p,
    selectionRef: ee,
    baselineRef: xe,
    isSessionOpen: T(() => !!gt.current, [])
  }), F(() => {
    const c = () => {
      xt && te(!1);
========
      w,
      Kt,
      ne,
      _t.styleInfo,
      mr,
      oe
    ]
  ), se = T(() => {
    var N;
    const c = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = uo(_t.styleInfo ?? _r, c);
    return b.length === 0 ? !1 : (Nr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [Nr, _t.styleInfo]);
  xa({
    isSessionOpen: T(() => !!Nt.current, []),
    dismiss: T(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const vr = T(
    (c) => {
      if (!w) return;
      va(c, {
        sessionRef: Nt,
        editorRef: p,
        palette: w,
        restoreCaret: Kt,
        reopenAtCaret: se,
        clearSessionIfCurrent: oe,
        hasEditorChangedSinceFocus: ne
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      se,
      Kt,
      oe,
      ne
    ]
  );
  V(() => {
    Le.current = vr;
  }, [vr]), ya({
    containerRef: k,
    editorRef: p,
    selectionRef: re,
    baselineRef: ye,
    isSessionOpen: T(() => !!Nt.current, [])
  }), V(() => {
    const c = () => {
      bt && ee(!1);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    };
    return window.addEventListener("click", c), window.addEventListener("blur", c), () => {
      window.removeEventListener("click", c), window.removeEventListener("blur", c);
    };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  }, [xt]), F(() => {
    var c;
    xt && ((c = ur.current) == null || c.focus());
  }, [xt]), F(() => {
    var _;
    const c = () => {
      var I;
      return ((I = E.current) == null ? void 0 : I.querySelector(".editor-input")) ?? void 0;
    };
    if (((_ = Dt.view) == null ? void 0 : _.markerMode) === "editable") {
      const I = (M) => {
        var st, dt, Nt, vt;
        if (de(M)) return;
        const mt = gt.current, W = c();
        if (!(!W || document.activeElement !== W)) {
          if (mt && f) {
            Te.current(M);
            return;
          }
          if (Or(E.current)) {
            M.key === l && (M.preventDefault(), M.stopPropagation());
========
  }, [bt]), V(() => {
    var c;
    bt && ((c = fr.current) == null || c.focus());
  }, [bt]), V(() => {
    var $, et;
    const c = () => {
      var A;
      return ((A = k.current) == null ? void 0 : A.querySelector(".editor-input")) ?? void 0;
    };
    if ((($ = _t.view) == null ? void 0 : $.markerMode) === "editable") {
      const A = (O) => {
        var xt, kr, Cr, Er;
        if (Zt(O)) return;
        const lt = Nt.current, ct = c();
        if (!(!ct || document.activeElement !== ct)) {
          if (lt && w) {
            Le.current(O);
            return;
          }
          if (Ae(k.current)) {
            O.key === l && (O.preventDefault(), O.stopPropagation());
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            return;
          }
          if (O.key === "Enter" && !Mt()) {
            O.preventDefault(), O.stopPropagation(), (xt = p.current) == null || xt.selectNote(0), (kr = p.current) == null || kr.focus();
            return;
          }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          if (f && M.key === l) {
========
          if (w && O.key === l) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            if (!Mt()) {
              O.preventDefault(), O.stopPropagation(), (Cr = p.current) == null || Cr.selectNote(0), (Er = p.current) == null || Er.focus();
              return;
            }
            se() && (O.preventDefault(), O.stopPropagation());
          }
        }
      }, q = () => {
        var lt, ct;
        const O = c();
        !O || document.activeElement !== O || Mt() || ((lt = p.current) == null || lt.selectNote(0), (ct = p.current) == null || ct.focus());
      };
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      return document.addEventListener("keydown", I, { capture: !0 }), document.addEventListener("paste", B, { capture: !0 }), () => {
        document.removeEventListener("keydown", I, { capture: !0 }), document.removeEventListener("paste", B, { capture: !0 });
      };
    }
    const b = () => {
      const I = c();
      return !I || document.activeElement !== I ? !1 : !Or(E.current);
    }, N = (I) => {
      I.key !== "Enter" || de(I) || b() && (I.preventDefault(), I.stopPropagation());
    }, S = (I) => {
      I.inputType !== "insertParagraph" && I.inputType !== "insertLineBreak" || b() && (I.preventDefault(), I.stopPropagation());
    }, L = (I) => {
      const B = c();
      !xt && B && document.activeElement === B && I.key === l ? (I.preventDefault(), gr()) : xt && I.key === "Escape" && (I.preventDefault(), te(!1));
    };
    return document.addEventListener("keydown", L), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), () => {
      document.removeEventListener("keydown", L), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    xt,
    gr,
    l,
    (xr = Dt.view) == null ? void 0 : xr.markerMode,
    Dt.styleInfo,
    f,
    ae,
    Mt
  ]), F(() => {
========
      return document.addEventListener("keydown", A, { capture: !0 }), document.addEventListener("paste", q, { capture: !0 }), () => {
        document.removeEventListener("keydown", A, { capture: !0 }), document.removeEventListener("paste", q, { capture: !0 });
      };
    }
    const b = () => {
      const A = c();
      return !A || document.activeElement !== A ? !1 : !Ae(k.current);
    }, N = (A) => {
      A.key !== "Enter" || Zt(A) || b() && (A.preventDefault(), A.stopPropagation());
    }, x = (A) => {
      A.inputType !== "insertParagraph" && A.inputType !== "insertLineBreak" || b() && (A.preventDefault(), A.stopPropagation());
    }, _ = (A) => {
      if (A.key !== l || bt || Zt(A)) return;
      const q = c();
      !q || document.activeElement !== q || (Ae(k.current) || Te()) && (A.preventDefault(), A.stopPropagation());
    }, E = ((et = _t.view) == null ? void 0 : et.markerMode) === "hidden", B = (A) => {
      const q = c();
      !bt && q && document.activeElement === q && A.key === l ? (A.preventDefault(), Te()) : bt && A.key === "Escape" && (A.preventDefault(), ee(!1));
    };
    return document.addEventListener("keydown", B), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", x, { capture: !0 }), E && document.addEventListener("keydown", _, { capture: !0 }), () => {
      E && document.removeEventListener("keydown", _, { capture: !0 }), document.removeEventListener("keydown", B), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", x, { capture: !0 });
    };
  }, [
    bt,
    Te,
    l,
    (Sr = _t.view) == null ? void 0 : Sr.markerMode,
    _t.styleInfo,
    w,
    se,
    Mt
  ]), V(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    const c = H.current;
    if (!w || !c) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || Zt(N) || (N.preventDefault(), N.stopPropagation(), Ie.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  }, [w]), F(() => {
    const c = () => {
      var S, L, _;
      const b = ((S = E.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Mt() || ((L = p.current) == null || L.selectNote(0), (_ = p.current) == null || _.focus());
========
  }, [u]), V(() => {
    const c = () => {
      var x, _, E;
      const b = ((x = k.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Mt() || ((_ = p.current) == null || _.selectNote(0), (E = p.current) == null || E.focus());
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [Mt]);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const vr = d["%footnoteEditor_copyButton_tooltip%"], yr = /* @__PURE__ */ o(
    Oa,
========
  const xr = d["%footnoteEditor_copyButton_tooltip%"], yr = /* @__PURE__ */ o(
    Ta,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    {
      onUndoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.undo();
      },
      onRedoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.redo();
      },
      canUndo: !z,
      canRedo: nt,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ m(yt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: H,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                Ka,
                {
                  isTypeSwitchable: Ut,
                  noteType: V,
                  handleNoteTypeChange: bn,
========
                ja,
                {
                  isTypeSwitchable: Ut,
                  noteType: X,
                  handleNoteTypeChange: pn,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                  localizedStrings: d,
                  focusNoteText: ae
                }
              ),
              /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                Ha,
                {
                  callerType: P,
                  customCaller: K,
                  updateCaller: gn,
========
                Pa,
                {
                  callerType: M,
                  customCaller: K,
                  updateCaller: fn,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                  localizedStrings: d,
                  focusNoteText: ae
                }
              ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
              w && yr
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(Ze, { children: [
              yr,
              /* @__PURE__ */ o(
                ia,
                {
                  onCancelClick: n,
                  onAcceptClick: Ee,
                  canAccept: !z || X !== P || P === "custom" && K !== pt,
========
              u && yr
            ] }),
            !u && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(Qe, { children: [
              yr,
              /* @__PURE__ */ o(
                ea,
                {
                  onCancelClick: n,
                  onAcceptClick: Ee,
                  canAccept: !z || Z !== M || M === "custom" && K !== ht,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                  localizedStrings: d,
                  acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ m(
            "div",
            {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
              ref: E,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  Ra,
========
              ref: k,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  La,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                  {
                    editorRef: p,
                    canUndo: !z,
                    canRedo: nt,
                    children: /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                      ho,
                      {
                        options: Dt,
                        onStateChange: Nn,
                        onUsjChange: vn,
                        defaultUsj: rs,
========
                      wo,
                      {
                        options: _t,
                        onStateChange: mn,
                        onUsjChange: hn,
                        defaultUsj: Wa,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
                  /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
                    Q,
                    {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                      "aria-label": vr,
                      onClick: hn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(On, {})
========
                      "aria-label": xr,
                      onClick: wn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(An, {})
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                    }
                  ) }),
                  /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: xr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    /* @__PURE__ */ m(Ye, { open: xt, children: [
      /* @__PURE__ */ o(ea, { virtualRef: ye.virtualRef }),
========
    /* @__PURE__ */ m(tr, { open: bt, children: [
      /* @__PURE__ */ o(Xo, { virtualRef: xe.virtualRef }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      /* @__PURE__ */ o(
        er,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
            Va,
========
            Ha,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            {
              markerMenuItems: Se,
              localizedStrings: d,
              searchRef: fr
            }
          )
        }
      )
    ] })
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const ns = {
  "refresh-cw": so,
  download: ao,
  house: oo,
  "book-a": no,
  settings: ro,
  "circle-question-mark": eo,
  "external-link": to,
  users: Qn,
  "book-copy": Yn,
  pencil: Zn,
  eye: Wn,
  "zoom-in": Xn,
  "zoom-out": Jn,
  scan: Vn,
  "file-text": qn,
  "panel-bottom": $n,
  "message-square-plus": Kn,
  "square-function": Fe,
  "square-x": Ue,
  "square-sigma": Ke,
  book: Fn,
  "book-marked": Un,
  "book-open": Hn,
  library: zn,
  search: $r,
  "message-square": Gn,
  "circle-check-big": jn,
  "clipboard-check": Bn,
  sparkles: Rn
}, ar = ns, tl = Object.keys(ar);
function os(t) {
  return t !== void 0 && Object.hasOwn(ar, t);
}
function as(t) {
========
const Za = {
  "refresh-cw": ro,
  download: eo,
  house: to,
  "book-a": Qn,
  settings: Yn,
  "circle-question-mark": Zn,
  "external-link": Wn,
  users: Xn,
  "book-copy": Jn,
  pencil: Vn,
  eye: qn,
  "zoom-in": $n,
  "zoom-out": Fn,
  scan: Kn,
  "file-text": Un,
  "panel-bottom": Hn,
  "message-square-plus": zn,
  "square-function": $e,
  "square-x": Fe,
  "square-sigma": qe,
  book: Gn,
  "book-marked": jn,
  "book-open": Bn,
  library: Rn,
  search: qr,
  "message-square": Pn,
  "circle-check-big": On,
  "clipboard-check": Mn,
  sparkles: Dn
}, ir = Za, Ji = Object.keys(ir);
function Ya(t) {
  return t !== void 0 && Object.hasOwn(ir, t);
}
function Qa(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = dt(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function jr(t, e, r) {
  const n = it(e);
========
function Gr(t, e, r) {
  const n = dt(e);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return t.some(
    (a) => dt(a.projectId) === n && a.scrollGroupId === r
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ae(t) {
  const e = as(t.openTabs);
========
function Me(t) {
  const e = Qa(t.openTabs);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : dt(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(dt(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: a !== void 0 && a === dt(s.id),
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
    const s = e.get(dt(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        isSelected: jr(r, a.id, void 0),
========
        isSelected: Gr(r, a.id, void 0),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        isSelected: jr(r, a.id, i.scrollGroupId),
========
        isSelected: Gr(r, a.id, i.scrollGroupId),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = dt(a.projectId);
    if (n.some(
      (l) => dt(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => dt(l.id) === s);
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const sr = "Selected", ir = "Unselected";
function Gr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = So(t, e);
========
const lr = "Selected", cr = "Unselected";
function zr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = No(t, e);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function He(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ss(t) {
  const e = t.filter(Gr).sort(zt), r = t.filter((a) => !Gr(a)).sort(zt);
========
function ts(t) {
  const e = t.filter(zr).sort(zt), r = t.filter((a) => !zr(a)).sort(zt);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function is(t, e) {
========
function es(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var u;
    const d = (u = e.getSectionHeading) == null ? void 0 : u.call(
      e,
      i,
      l.map((w) => w.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? lr : cr;
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ls(t, e) {
  if (e.id === "openTabs") return ss(t);
  if (e.id === "selection") return is(t, e);
  if (!e.getGroupKey) return Ge(t);
========
function rs(t, e) {
  if (e.id === "openTabs") return ts(t);
  if (e.id === "selection") return es(t, e);
  if (!e.getGroupKey) return He(t);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const d = a(l.project);
    if (d === void 0 || d === "") {
      n.push(l);
      return;
    }
    const u = r.get(d);
    u ? u.push(l) : r.set(d, [l]);
  });
  const s = [...r.entries()].map(([l, d]) => {
    var y;
    const u = [...d].sort(
      (x, f) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, f.project)) || zt(x, f);
      }
    ), w = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      l,
      u.map((x) => x.project)
    )) ?? l;
    return { key: l, heading: w, rows: u };
  });
  s.sort((l, d) => l.key === e.priorityKey ? -1 : d.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: d.key, heading: d.heading }
  ) : l.heading.localeCompare(d.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: d, rows: u }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: d,
    rows: u,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const el = [
========
const Xi = [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  if (!(typeof r != "string" || !ln(r)))
    return r;
}
const le = "recent", cs = "other";
function fn(t) {
========
  if (!(typeof r != "string" || !nn(r)))
    return r;
}
const ce = "recent", ns = "other";
function cn(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ds(t) {
  const e = t ?? {};
  return [
    fn(e.openTabsLabel),
========
function os(t) {
  const e = t ?? {};
  return [
    cn(e.openTabsLabel),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? le : cs;
========
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? ce : ns;
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      },
      getSectionHeading: (r) => r === ce ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === ce ? -1 : n.key === ce ? 1 : 0
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
            var d;
            return typeof ((d = l.customData) == null ? void 0 : d[Wt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Wt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const rl = ds();
function us(t) {
========
const Wi = os();
function as(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? lr : e.unselectedSectionHeading ?? cr
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function nl(t) {
========
function Zi(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ol(t) {
========
function Yi(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const ws = 100, nt = {
========
const ss = 100, at = {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
  autoSelectionSelectedSectionHeading: lr,
  autoSelectionUnselectedSectionHeading: cr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function fs(t) {
========
function is(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : ot(e.ariaLabel, at.ariaLabel),
    buttonPlaceholder: ot(
      e.buttonPlaceholder,
      at.buttonPlaceholder
    ),
    commandEmptyMessage: ot(
      e.commandEmptyMessage,
      at.commandEmptyMessage
    ),
    searchPlaceholder: ot(
      e.searchPlaceholder,
      at.searchPlaceholder
    ),
    groupByAriaLabel: ot(
      e.groupByAriaLabel,
      at.groupByAriaLabel
    ),
    groupSectionLabel: ot(
      e.groupSectionLabel,
      at.groupSectionLabel
    ),
    groupByNone: ot(
      e.groupByNone,
      at.groupByNone
    ),
    openTabsSectionHeading: ot(
      e.openTabsSectionHeading,
      at.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: ot(
      e.otherProjectsSectionHeading,
      at.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: ot(
      e.autoOpenTabsGroupingLabel,
      at.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: ot(
      e.autoSelectionGroupingLabel,
      at.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: ot(
      e.autoSelectionSelectedSectionHeading,
      at.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: ot(
      e.autoSelectionUnselectedSectionHeading,
      at.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: ot(
      e.boundButClosedTooltip,
      at.boundButClosedTooltip
    ),
    openButtonLabel: ot(
      e.openButtonLabel,
      at.openButtonLabel
    ),
    clearAll: ot(e.clearAll, at.clearAll)
  };
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function al(t) {
========
function Qi(t) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Qt(t) {
  return qo[ko(t)] ?? String(t);
}
const zr = "platform.footerAction", ps = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ms({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
========
function te(t) {
  return Uo[vo(t)] ?? String(t);
}
const Hr = "platform.footerAction", ls = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function cs({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = te(t);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  return e ? /* @__PURE__ */ o(
    fe,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
      style: ps,
========
      style: ls,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      children: r
    }
  ) : /* @__PURE__ */ o(fe, { variant: "secondary", children: r });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function hs({
========
function ds({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
    ref: d,
    open: u,
    onPointerEnter: w,
    onPointerLeave: y
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  } = aa(), [x, f] = O(!1), v = Ln(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, H = u || x, G = T(() => {
    if (E) {
      f(!0);
      return;
    }
    w();
  }, [E, w]), Z = T(() => {
    f(!1), y();
  }, [y]), k = /* @__PURE__ */ o(pe, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let P;
  e === "project" ? t.openGroups.length > 0 && (P = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((K) => /* @__PURE__ */ o(fe, { variant: "secondary", children: Qt(K) }, K)) })) : t.scrollGroupId !== void 0 && (P = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      ms,
========
  } = Qo(), [S, w] = P(!1), v = En(), p = t.isDisabled && !!t.disabledReason, k = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, H = f || S, G = T(() => {
    if (k) {
      w(!0);
      return;
    }
    u();
  }, [k, u]), Y = T(() => {
    w(!1), y();
  }, [y]), C = /* @__PURE__ */ o(pe, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((K) => /* @__PURE__ */ o(fe, { variant: "secondary", children: te(K) }, K)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      cs,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      Q,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (K) => {
          K.stopPropagation(), a(t);
        },
        onMouseDown: (K) => K.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          /* @__PURE__ */ o(lo, { className: "tw:h-3 tw:w-3" }),
========
          /* @__PURE__ */ o(oo, { className: "tw:h-3 tw:w-3" }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const J = /* @__PURE__ */ m(
    he,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: G,
      onPointerLeave: Y,
      ...p && { "aria-describedby": v },
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
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
              Co(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        P,
========
              xo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        M,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), Z = t.scrollGroupId !== void 0 ? te(t.scrollGroupId) : void 0, D = t.isBoundButClosed && Z ? r.boundButClosedTooltip.replace("{group}", Z) : void 0;
  return /* @__PURE__ */ m(Ct, { open: H, delayDuration: 400, children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: J }),
    /* @__PURE__ */ m(
      It,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Vr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && X && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
========
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Jr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && Z && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              Z,
              ")"
            ] })
          ] }),
          D && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: D }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function gs({
========
function us({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ m(rr, { children: [
    /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(nr, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          children: /* @__PURE__ */ o(io, { className: "tw:h-4 tw:w-4" })
========
          children: /* @__PURE__ */ o(no, { className: "tw:h-4 tw:w-4" })
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        }
      ) }) }),
      /* @__PURE__ */ o(It, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      or,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: me },
        children: [
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
          /* @__PURE__ */ o(nr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(sa, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Tr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(or, {}),
            t.map((s) => /* @__PURE__ */ o(Tr, { value: s.id, children: s.label }, s.id))
========
          /* @__PURE__ */ o(ar, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(ta, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Ar, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(sr, {}),
            t.map((s) => /* @__PURE__ */ o(Ar, { value: s.id, children: s.label }, s.id))
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          ] })
        ]
      }
    )
  ] });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function bs(t, e) {
========
function ws(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function sl(t) {
  const [e, r] = O(!1), [n, a] = O(""), s = wt(() => fs(t.localizedStrings), [t.localizedStrings]), i = wt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(fn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      us({
========
function tl(t) {
  const [e, r] = P(!1), [n, a] = P(""), s = pt(() => is(t.localizedStrings), [t.localizedStrings]), i = pt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(cn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      as({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ]), [l, d] = O(void 0), u = wt(
    () => bs(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = l ?? u, y = C(null), [x, f] = O(void 0), v = T((h) => {
    r(h), h || (a(""), f(void 0));
  }, []);
  F(() => {
========
  ]), [l, d] = P(void 0), f = pt(
    () => ws(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), u = l ?? f, y = I(null), [S, w] = P(void 0), v = T((h) => {
    r(h), h || (a(""), w(void 0));
  }, []);
  V(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const L = y.current;
      L && L.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = pt(() => t.mode === "project" ? Me({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Me({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Me({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = wt(() => {
========
  }), [t.mode, t.projects, t.openTabs, t.selection]), k = pt(() => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (L) => L.shortName.toLowerCase().includes(h) || (L.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), H = pt(
    () => new Map(t.projects.map((h) => [dt(h.id), h])),
    [t.projects]
  ), G = T(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
    (h) => h === void 0 ? void 0 : H.get(it(h)),
    [H]
  ), { renderProjectIndicator: Z } = t, k = T(
    (h) => Z ? Z(h.project) : void 0,
    [Z]
  ), P = !!Z, q = !!t.footerAction && E.length === 0, X = wt(() => {
    if (w === Xt) return Ge(E);
    const h = i.find((A) => A.id === w);
    return h ? ls(E, h) : Ge(E);
  }, [E, w, i]), D = (h) => {
========
    (h) => h === void 0 ? void 0 : H.get(dt(h)),
    [H]
  ), { renderProjectIndicator: Y } = t, C = T(
    (h) => Y ? Y(h.project) : void 0,
    [Y]
  ), M = !!Y, J = !!t.footerAction && k.length === 0, Z = pt(() => {
    if (u === Xt) return He(k);
    const h = i.find((L) => L.id === u);
    return h ? rs(k, h) : He(k);
  }, [k, u, i]), D = (h) => {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, K = (h) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: h.projectId }), r(!1);
        return;
      }
      case "project-multi": {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        const A = t.selection.pairs, U = it(h.projectId), Q = (J) => it(J.projectId) === U && J.scrollGroupId === h.scrollGroupId, $ = A.some(Q) ? A.filter((J) => !Q(J)) : [
          ...A.filter((J) => !Q(J)),
========
        const L = t.selection.pairs, U = dt(h.projectId), tt = (W) => dt(W.projectId) === U && W.scrollGroupId === h.scrollGroupId, F = L.some(tt) ? L.filter((W) => !tt(W)) : [
          ...L.filter((W) => !tt(W)),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
          { projectId: h.projectId, scrollGroupId: h.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: $ });
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
  }, ut = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  }, pt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, V = wt(() => {
    switch (t.mode) {
      case "project": {
        const h = G(t.selection.projectId);
        if (pt)
          return { node: pt(h), title: "", hasSelection: !!h };
        let A = h ? h.shortName : s.buttonPlaceholder;
        return h && Tt === "shortNameAndFullName" && (A = Vr(h)), { node: A, title: A, hasSelection: !!h };
========
  }, ht = t.mode === "project" ? t.renderTriggerLabel : void 0, Lt = t.mode === "project" ? t.triggerLabelFormat : void 0, X = pt(() => {
    switch (t.mode) {
      case "project": {
        const h = G(t.selection.projectId);
        if (ht)
          return { node: ht(h), title: "", hasSelection: !!h };
        let L = h ? h.shortName : s.buttonPlaceholder;
        return h && Lt === "shortNameAndFullName" && (L = Jr(h)), { node: L, title: L, hasSelection: !!h };
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        const A = [];
        if (h.forEach(($) => {
          const J = G($.projectId);
          J && A.push({ project: J, scrollGroupId: $.scrollGroupId });
        }), A.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const U = A.map(
          ({ project: $, scrollGroupId: J }) => J === void 0 ? $.shortName : `${$.shortName} (${Qt(J)})`
        ).join(", "), Q = A.length.toString();
        return {
          node: /* @__PURE__ */ m(yt, { children: [
            /* @__PURE__ */ o(fe, { variant: "muted", className: "tw:shrink-0", children: Q }),
========
        const L = [];
        if (h.forEach((F) => {
          const W = G(F.projectId);
          W && L.push({ project: W, scrollGroupId: F.scrollGroupId });
        }), L.length === 0) {
          const F = s.buttonPlaceholder;
          return { node: F, title: F, hasSelection: !1 };
        }
        const U = L.map(
          ({ project: F, scrollGroupId: W }) => W === void 0 ? F.shortName : `${F.shortName} (${te(W)})`
        ).join(", "), tt = L.length.toString();
        return {
          node: /* @__PURE__ */ m(yt, { children: [
            /* @__PURE__ */ o(fe, { variant: "muted", className: "tw:shrink-0", children: tt }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: U })
          ] }),
          title: `${tt} ${U}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = G(t.selection.projectId);
        if (!h) {
          const tt = s.buttonPlaceholder;
          return { node: tt, title: tt, hasSelection: !1 };
        }
        const L = t.selection.scrollGroupId;
        if (L === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const U = te(L);
        return {
          node: `${h.shortName} · ${U}`,
          title: `${h.shortName} · ${U}`,
          accessibleTitle: `${h.shortName}, ${U}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    G,
    t.selection,
    ht,
    Lt,
    s.buttonPlaceholder
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  ]), Rt = C(null), [Ut, Lt] = O(!1);
  F(() => {
    const h = Rt.current;
    if (!h) return;
    const A = (Q) => {
      Lt(Q < ws);
    };
    if (A(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const U = new ResizeObserver((Q) => {
      Q.forEach(($) => {
        const [J] = $.borderBoxSize;
        A(J ? J.inlineSize : h.getBoundingClientRect().width);
========
  ]), Rt = I(null), [Ut, At] = P(!1);
  V(() => {
    const h = Rt.current;
    if (!h) return;
    const L = (tt) => {
      At(tt < ss);
    };
    if (L(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const U = new ResizeObserver((tt) => {
      tt.forEach((F) => {
        const [W] = F.borderBoxSize;
        L(W ? W.inlineSize : h.getBoundingClientRect().width);
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
      });
    });
    return U.observe(h, { box: "border-box" }), () => U.disconnect();
  }, []);
  let z;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  t.isLoading ? z = /* @__PURE__ */ o(co, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? z = void 0 : t.mode === "project-multi" ? z = /* @__PURE__ */ o(Kr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : z = /* @__PURE__ */ o(uo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? D : void 0, et = s.ariaLabel && V.hasSelection && V.title ? `${s.ariaLabel}: ${V.accessibleTitle ?? V.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ m(
    Y,
========
  t.isLoading ? z = /* @__PURE__ */ o(ao, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? z = void 0 : t.mode === "project-multi" ? z = /* @__PURE__ */ o($r, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : z = /* @__PURE__ */ o(so, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const it = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? D : void 0, nt = s.ariaLabel && X.hasSelection && X.title ? `${s.ariaLabel}: ${X.accessibleTitle ?? X.title}` : s.ariaLabel || void 0, wt = /* @__PURE__ */ m(
    Q,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": nt,
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof V.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: V.node }) : V.node }),
        z
      ]
    }
  ), At = V.title ? /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(Ct, { children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(je, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ o(It, { dir: "auto", children: V.title })
  ] }) }) : /* @__PURE__ */ o(je, { asChild: !0, children: ct }), Bt = i.length > 1;
  return /* @__PURE__ */ m(Ye, { open: e, onOpenChange: v, children: [
    At,
========
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof X.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: X.node }) : X.node }),
        z
      ]
    }
  ), Dt = X.title ? /* @__PURE__ */ o(Tt, { delayDuration: 400, children: /* @__PURE__ */ m(Ct, { children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(ze, { asChild: !0, children: wt }) }),
    /* @__PURE__ */ o(It, { dir: "auto", children: X.title })
  ] }) }) : /* @__PURE__ */ o(ze, { asChild: !0, children: wt }), Bt = i.length > 1;
  return /* @__PURE__ */ m(tr, { open: e, onOpenChange: v, children: [
    Dt,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    /* @__PURE__ */ o(
      er,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(Tt, { delayDuration: 400, children: /* @__PURE__ */ m(
          Je,
          {
            shouldFilter: !1,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
            value: q ? x ?? zr : void 0,
            onValueChange: f,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Ve,
========
            value: J ? S ?? Hr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Xe,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                  gs,
========
                  us,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                  {
                    availableGroupings: i,
                    activeGrouping: w,
                    onChangeGrouping: d,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Je, { children: [
                /* @__PURE__ */ o(Xe, { children: s.commandEmptyMessage }),
                X.map((h, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Hr,
                    {
                      children: [
                        /* @__PURE__ */ o(we, { heading: Ns(h, s), children: h.rows.map((U) => /* @__PURE__ */ o(
                          hs,
========
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Q, { variant: "ghost", size: "sm", onClick: ut, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(We, { children: [
                /* @__PURE__ */ o(Ze, { children: s.commandEmptyMessage }),
                Z.map((h, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Ur,
                    {
                      children: [
                        /* @__PURE__ */ o(we, { heading: fs(h, s), children: h.rows.map((U) => /* @__PURE__ */ o(
                          ds,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                          {
                            row: U,
                            mode: t.mode,
                            strings: s,
                            onClick: K,
                            onOpen: it,
                            selectedRowRef: y,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                            indicator: k(U),
                            reserveIndicatorSlot: P
========
                            indicator: C(U),
                            reserveIndicatorSlot: M
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                          },
                          U.rowKey
                        )) }),
                        L < Z.length - 1 && /* @__PURE__ */ o(je, { alwaysRender: !0 })
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                  E.length > 0 && /* @__PURE__ */ o(
                    Re,
========
                  k.length > 0 && /* @__PURE__ */ o(
                    je,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    he,
                    {
                      forceMount: !0,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
                      value: zr,
========
                      value: Hr,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var h;
                        (h = t.footerAction) == null || h.onSelect(), v(!1);
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ns(t, e) {
========
function fs(t, e) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const vs = Ur(
========
const ps = Kr(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = gt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
            $r,
========
            qr,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
            Yr,
========
            Qr,
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
              onChange: (u) => e(u.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            Q,
            {
              variant: "ghost",
              size: "icon",
              className: g(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": d === "rtl" },
                { "tw:right-0": d === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(Fr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
vs.displayName = "SearchBar";
const ys = 5;
function il(t) {
  return $o(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function xs(t, e) {
  return t.filter((r) => {
    try {
      return Eo(r) === e;
========
ps.displayName = "SearchBar";
const ms = 5;
function el(t) {
  return Ho(t).filter(
    (e) => !st.isObsolete(st.bookIdToNumber(e))
  );
}
function hs(t, e) {
  return t.filter((r) => {
    try {
      return yo(r) === e;
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
    } catch {
      return !1;
    }
  });
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const ll = (t, e, r) => xs(t, e).every((n) => r.includes(n));
function Ss(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => Vo(n, e));
}
function cl(t, e, r, n) {
========
const rl = (t, e, r) => hs(t, e).every((n) => r.includes(n));
function gs(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => st.bookIdToNumber(n) > 0).sort((n, a) => st.bookIdToNumber(n) - st.bookIdToNumber(a)).map((n) => Ko(n, e));
}
function nl(t, e, r, n) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  const i = Ss(t, n);
  if (i.length !== 0)
    return i.length <= ys ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function dl({ name: t, className: e }) {
  const r = os(t) ? ar[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function ul({ message: t, id: e, className: r }) {
========
  const i = gs(t, n);
  if (i.length !== 0)
    return i.length <= ms ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function ol({ name: t, className: e }) {
  const r = Ya(t) ? ir[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function al({ message: t, id: e, className: r }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ks({ className: t, ...e }) {
========
function bs({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Cs({ className: t, ...e }) {
========
function Ns({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
const Es = Ot(
========
const vs = Pt(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Is({
========
function xs({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        Es({ variant: e }),
========
        vs({ variant: e }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function wl({ className: t, ...e }) {
========
function sl({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function _s({ className: t, ...e }) {
========
function ys({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Ts({ className: t, ...e }) {
========
function Ss({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function fl({
========
function il({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  return /* @__PURE__ */ m(ks, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Cs, { children: [
      /* @__PURE__ */ o(Is, { variant: "icon", children: n ?? /* @__PURE__ */ o(wo, {}) }),
      /* @__PURE__ */ o(_s, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Ts, { children: /* @__PURE__ */ o(Y, { onClick: () => r(), children: e }) })
  ] });
}
const Ls = Ur(({ className: t, ...e }, r) => /* @__PURE__ */ o(fo, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
Ls.displayName = "Spinner";
const As = Ot(
========
  return /* @__PURE__ */ m(bs, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Ns, { children: [
      /* @__PURE__ */ o(xs, { variant: "icon", children: n ?? /* @__PURE__ */ o(io, {}) }),
      /* @__PURE__ */ o(ys, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Ss, { children: /* @__PURE__ */ o(Q, { onClick: () => r(), children: e }) })
  ] });
}
const ks = Kr(({ className: t, ...e }, r) => /* @__PURE__ */ o(lo, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
ks.displayName = "Spinner";
const Cs = Pt(
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function pl({
========
function ll({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
        As({ variant: e }),
========
        Cs({ variant: e }),
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
        t
      ),
      ...r
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function ml({ className: t, ...e }) {
========
function cl({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function hl({ className: t, ...e }) {
========
function dl({ className: t, ...e }) {
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
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
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function gl({
========
function ul({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Ve.Group,
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
function de(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function bl({
========
function wl({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Ve.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: de(t),
      minSize: de(e),
      maxSize: de(r),
      collapsedSize: de(n),
      ...a
    }
  );
}
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
function Nl({
========
function fl({
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ve.Separator,
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
  Jt as $,
<<<<<<<< HEAD:lib/platform-bible-react/dist/resizable-DHXKI1eT.js
  pi as A,
  Y as B,
  he as C,
  tr as D,
  Ze as E,
  an as F,
  Je as G,
  Xe as H,
  Oi as I,
  Bi as J,
  Ys as K,
  hi as L,
  ei as M,
  ri as N,
  oi as O,
  Ye as P,
  ve as Q,
  Ri as R,
  ia as S,
  _t as T,
  ji as U,
  fe as V,
  Zo as W,
  Hi as X,
  zi as Y,
  or as Z,
  ci as _,
  Vo as a,
  La as a$,
  Jo as a0,
  Jr as a1,
  qi as a2,
  Ji as a3,
  Ui as a4,
  Fi as a5,
  Vi as a6,
  Ki as a7,
  Ti as a8,
  sa as a9,
  Ni as aA,
  cn as aB,
  be as aC,
  Ne as aD,
  nn as aE,
  jo as aF,
  zo as aG,
  Ar as aH,
  pl as aI,
  hl as aJ,
  ml as aK,
  xi as aL,
  ti as aM,
  ai as aN,
  Bo as aO,
  Ro as aP,
  Qs as aQ,
  Ra as aR,
  ks as aS,
  Ts as aT,
  _s as aU,
  Cs as aV,
  Is as aW,
  ul as aX,
  wl as aY,
  Qi as aZ,
  es as a_,
  Tr as aa,
  Wi as ab,
  Yi as ac,
  Zi as ad,
  Yr as ae,
  os as af,
  sl as ag,
  vs as ah,
  il as ai,
  xs as aj,
  Re as ak,
  wi as al,
  ll as am,
  Si as an,
  en as ao,
  ni as ap,
  qo as aq,
  dl as ar,
  yi as as,
  vi as at,
  Ai as au,
  Dr as av,
  Mi as aw,
  Di as ax,
  _i as ay,
  Pi as az,
  Ct as b,
  Ta as b$,
  Va as b0,
  ea as b1,
  Ei as b2,
  ki as b3,
  Ci as b4,
  Nl as b5,
  bl as b6,
  gl as b7,
  fl as b8,
  Ls as b9,
  Xt as bA,
  nt as bB,
  el as bC,
  Oo as bD,
  nl as bE,
  al as bF,
  ol as bG,
  wn as bH,
  Sa as bI,
  rl as bJ,
  ga as bK,
  ya as bL,
  xa as bM,
  ka as bN,
  Or as bO,
  ha as bP,
  ds as bQ,
  us as bR,
  Wa as bS,
  Zs as bT,
  ba as bU,
  Ea as bV,
  Ca as bW,
  St as bX,
  cl as bY,
  Ia as bZ,
  _a as b_,
  Xi as ba,
  $i as bb,
  Ii as bc,
  Oa as bd,
  me as be,
  Ws as bf,
  Xs as bg,
  Po as bh,
  Mo as bi,
  Vs as bj,
  qs as bk,
  Js as bl,
  $s as bm,
  da as bn,
  Yo as bo,
  Xr as bp,
  Qr as bq,
  Br as br,
  Gi as bs,
  Ga as bt,
  ja as bu,
  tn as bv,
  pa as bw,
  Ba as bx,
  di as by,
  tl as bz,
  g as c,
  Et as d,
  It as e,
  bi as f,
  fi as g,
  er as h,
  rr as i,
  nr as j,
  Li as k,
  ii as l,
  li as m,
  mi as n,
  we as o,
  ht as p,
  Ko as q,
  rt as r,
  ui as s,
  gi as t,
  aa as u,
  si as v,
  je as w,
  Qe as x,
  qe as y,
  Ve as z
};
//# sourceMappingURL=resizable-DHXKI1eT.js.map
========
  li as A,
  Q as B,
  he as C,
  rr as D,
  Qe as E,
  en as F,
  We as G,
  Ze as H,
  ni as I,
  Ti as J,
  Ai as K,
  di as L,
  qs as M,
  Xs as N,
  Ws as O,
  tr as P,
  Ys as Q,
  Li as R,
  ve as S,
  Tt as T,
  ea as U,
  Di as V,
  fe as W,
  $o as X,
  Pi as Y,
  Oi as Z,
  sr as _,
  Ko as a,
  vi as a$,
  Xr as a0,
  zi as a1,
  Ui as a2,
  Ri as a3,
  Bi as a4,
  Hi as a5,
  ji as a6,
  Si as a7,
  ta as a8,
  Ar as a9,
  be as aA,
  Ne as aB,
  Oo as aC,
  Ro as aD,
  Mr as aE,
  ll as aF,
  dl as aG,
  cl as aH,
  hi as aI,
  Js as aJ,
  Qs as aK,
  Mo as aL,
  Do as aM,
  Vs as aN,
  La as aO,
  bs as aP,
  Ss as aQ,
  ys as aR,
  Ns as aS,
  xs as aT,
  al as aU,
  sl as aV,
  Vi as aW,
  Xa as aX,
  ka as aY,
  Ha as aZ,
  Xo as a_,
  Fi as aa,
  qi as ab,
  $i as ac,
  Qr as ad,
  Ya as ae,
  tl as af,
  ps as ag,
  el as ah,
  hs as ai,
  je as aj,
  si as ak,
  rl as al,
  gi as am,
  Zs as an,
  Uo as ao,
  ol as ap,
  mi as aq,
  pi as ar,
  Ci as as,
  Or as at,
  Ii as au,
  Ei as av,
  yi as aw,
  _i as ax,
  fi as ay,
  on as az,
  Ct as b,
  bi as b0,
  Ni as b1,
  fl as b2,
  wl as b3,
  ul as b4,
  il as b5,
  ks as b6,
  Ki as b7,
  Gi as b8,
  xi as b9,
  Qi as bA,
  Yi as bB,
  ln as bC,
  ga as bD,
  Wi as bE,
  ua as bF,
  ma as bG,
  ha as bH,
  ba as bI,
  Ae as bJ,
  da as bK,
  os as bL,
  as as bM,
  Fa as bN,
  $s as bO,
  wa as bP,
  va as bQ,
  Na as bR,
  St as bS,
  nl as bT,
  xa as bU,
  ya as bV,
  Sa as bW,
  Ta as ba,
  me as bb,
  Fs as bc,
  Ks as bd,
  Lo as be,
  To as bf,
  Hs as bg,
  zs as bh,
  Us as bi,
  Gs as bj,
  oa as bk,
  qo as bl,
  Wr as bm,
  jr as bn,
  Mi as bo,
  Ma as bp,
  Da as bq,
  la as br,
  Aa as bs,
  oi as bt,
  Ji as bu,
  Xt as bv,
  at as bw,
  Xi as bx,
  Ao as by,
  Zi as bz,
  g as c,
  Et as d,
  It as e,
  wi as f,
  ii as g,
  nr as h,
  or as i,
  ar as j,
  ki as k,
  ti as l,
  ei as m,
  ri as n,
  ci as o,
  we as p,
  gt as q,
  ot as r,
  zo as s,
  ui as t,
  Qo as u,
  ai as v,
  ze as w,
  er as x,
  Je as y,
  Xe as z
};
//# sourceMappingURL=resizable-BrrUhmOP.js.map
>>>>>>>> cd296e2dbd1 (fix(platform-bible-react): \ in a hidden-view footnote popover only opens the menu):lib/platform-bible-react/dist/resizable-BrrUhmOP.js
