import { jsx as o, jsxs as m, Fragment as yt } from "react/jsx-runtime";
import { Slot as ze, Dialog as kt, Separator as Cn, Popover as Zt, Tooltip as Vt, DropdownMenu as tt, Label as En, RadioGroup as Me } from "radix-ui";
import { IconX as In, IconCheck as He, IconSearch as _n, IconChevronLeft as Tn, IconChevronRight as Ln } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import ft, { useRef as C, useEffect as F, useCallback as T, useState as P, createContext as An, useContext as Mn, useMemo as wt, Fragment as Ur, useLayoutEffect as se, useImperativeHandle as On, useId as Dn, forwardRef as Fr } from "react";
import { X as Kr, Check as pe, ChevronsUpDown as $r, Star as Pn, Undo as Rn, Redo as Bn, SquareX as Ue, FunctionSquare as Fe, SquareSigma as Ke, Ban as jn, Copy as Gn, Redo2 as zn, Undo2 as Hn, Sparkles as Un, ClipboardCopy as Fn, ClipboardCheck as Kn, CircleCheckBig as $n, MessageSquare as qn, Search as qr, Library as Vn, BookOpen as Jn, BookMarked as Wn, Book as Xn, MessageSquarePlus as Zn, PanelBottom as Yn, FileText as Qn, Scan as to, ZoomOut as eo, ZoomIn as ro, Eye as no, Pencil as oo, BookCopy as ao, Users as so, ExternalLink as io, CircleQuestionMark as co, Settings as lo, BookA as uo, House as wo, Download as fo, RefreshCw as po, Group as mo, ArrowRight as ho, Loader2 as go, ChevronDown as bo, AlertTriangle as No, LoaderCircle as vo } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as kr, GENERATOR_NOTE_CALLER as Oe, HIDDEN_NOTE_CALLER as De, isInsertEmbedOpOfType as qt, getDefaultViewOptions as yo, getMarkerMenuItems as xo, defaultStyleInfo as Cr, Editorial as So } from "@eten-tech-foundation/platform-editor";
import { Section as Dt, MODIFIER_KEYS as ko, split as Vr, slice as Co, formatReplacementString as Eo, usfmMarkers as ie, deepEqual as Gt, isPlatformError as Io, ABORTED as _o, getErrorMessage as To, normalizeProjectId as it, compareProjectsByName as Lo, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Xt, formatProjectName as Jr, getLocalizeKeyForScrollGroupId as Ao, hasDistinctFullName as Mo, getSectionForBook as Oo } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as $e from "react-resizable-panels";
import { clsx as Do } from "clsx";
import { extendTailwindMerge as Po, twMerge as Ro } from "tailwind-merge";
const Bo = Po({ prefix: "tw" });
function Pe(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function jo(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Pe(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, d) => d !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((u, d) => d !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Go(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Pe(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Pe(e), i = s.some((u) => u.startsWith("-tw-")), c = s.some((u) => u.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const u = a.slice(1);
    return [...n, `-tw-${u}`].join(":");
  }
  if (c && a.startsWith("!")) {
    const u = a.slice(1);
    return [...n, `!tw-${u}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function h(...t) {
  const e = Do(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Bo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((u) => {
    const d = jo(u);
    n.set(d.normalized, d.original), a.push(d.normalized);
  }), Ro(a.join(" ")).split(" ").filter(Boolean).map((u) => {
    const d = n.get(u);
    return d ? Go(u, d) : u;
  }).join(" ");
}
const Wr = 600, me = 650, ti = 400, zo = 450, Ho = 500, ei = 510, ri = 520, Uo = 675, ni = 690, oi = 700, ai = 800, Xr = Pt(
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
function Y({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const s = n ? ze.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: h(Xr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Zr = "layoutDirection";
function Yr() {
  return globalThis.localStorage ?? void 0;
}
function ht() {
  var t;
  try {
    const e = (t = Yr()) == null ? void 0 : t.getItem(Zr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function si(t) {
  var e;
  try {
    (e = Yr()) == null || e.setItem(Zr, t);
  } catch {
  }
}
function ii({ ...t }) {
  return /* @__PURE__ */ o(kt.Root, { "data-slot": "dialog", ...t });
}
function ci({ ...t }) {
  return /* @__PURE__ */ o(kt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Fo({ ...t }) {
  return /* @__PURE__ */ o(kt.Portal, { "data-slot": "dialog-portal", ...t });
}
function li({ ...t }) {
  return /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", ...t });
}
function Ko({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    kt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: h(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: zo, ...e },
      ...r
    }
  );
}
function ui({
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
  const c = ht();
  return /* @__PURE__ */ m(Fo, { children: [
    /* @__PURE__ */ o(Ko, { className: n, style: a }),
    /* @__PURE__ */ m(
      kt.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ho, ...s },
        dir: c,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Y, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(In, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function di({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "dialog-header",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function wi({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "dialog-footer",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...n,
      children: [
        r,
        e && /* @__PURE__ */ o(kt.Close, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function fi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    kt.Title,
    {
      "data-slot": "dialog-title",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function pi({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    kt.Description,
    {
      "data-slot": "dialog-description",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Qr({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: h(
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
function $o({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const qo = Pt(
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
function Vo({
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
        className: h(qo({ align: e }), t),
        onClick: (n) => {
          var a, s;
          n.target instanceof HTMLElement && n.target.closest("button") || (s = (a = n.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
        },
        ...r
      }
    )
  );
}
Pt("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function qe({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht,
    {
      "data-slot": "command",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function Ve({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = ht(), s = ft.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !r || i.key !== " " || i.currentTarget.value !== "") return;
      const c = i.currentTarget.closest("[cmdk-root]"), u = c == null ? void 0 : c.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (i.preventDefault(), i.stopPropagation(), u.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m($o, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Ht.Input,
        {
          "data-slot": "command-input",
          className: h(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...n
        }
      ),
      /* @__PURE__ */ o(Vo, { children: /* @__PURE__ */ o(_n, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht.List,
    {
      "data-slot": "command-list",
      className: h(
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
function We({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Empty,
    {
      "data-slot": "command-empty",
      className: h(
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
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Re({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Separator,
    {
      "data-slot": "command-separator",
      className: h(
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
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ o(He, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Jo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "command-shortcut",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const Wo = [
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
], Xo = (t) => {
  var e;
  return ((e = Wo[t]) == null ? void 0 : e.chapters) ?? -1;
}, Zo = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function Yo(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function R(t) {
  return `%scrollGroup_${t}%`;
}
const Qo = {
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
function Xe(t, e) {
  return Xo(ot.bookIdToNumber(t));
}
function ge(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = ot.bookIdToNumber(i);
    (r === "next" ? c > n && c < s : c < n && c > s) && (a = i, s = c);
  }), a;
}
function mi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = ge(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Xe(s), 1),
      verseNum: 1
    };
}
function hi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < Xe(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = ge(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function gi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = ge(n, e, "previous");
  if (!i) return;
  const c = Math.max(Xe(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function bi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = ge(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Ni(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const vi = (t, e, r, n, a) => {
  switch (t) {
    case Dt.OT:
      return e ?? "Old Testament";
    case Dt.NT:
      return r ?? "New Testament";
    case Dt.DC:
      return n ?? "Deuterocanon";
    case Dt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, yi = (t, e, r, n, a) => {
  switch (t) {
    case Dt.OT:
      return e ?? "OT";
    case Dt.NT:
      return r ?? "NT";
    case Dt.DC:
      return n ?? "DC";
    case Dt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function xi(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function ta(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Si = Object.fromEntries(
  Zo.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function ki(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function tn() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function en(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function rn(t) {
  en(document, tn()) || t();
}
function Er(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Ir(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function ea(t, e) {
  const [r] = P(tn), n = C(t);
  n.current = t;
  const a = C(e);
  return a.current = e, T(
    (s) => {
      var u, d;
      if ((u = n.current) == null || u.call(n, s), s.defaultPrevented) return;
      if (en(document, r)) {
        s.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: i } = document;
      if (i && i !== document.body) return;
      const c = (d = a.current) == null ? void 0 : d.call(a);
      c && (c.focus({ preventScroll: !0 }), document.activeElement === c && s.preventDefault());
    },
    [r]
  );
}
const nn = Symbol.for("platform-bible-react.window-blur-press");
function ra(t) {
  return Reflect.get(t, nn) === !0;
}
function on({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = C(void 0), n = C(void 0), a = C(void 0);
  F(() => {
    const d = () => {
      const w = r.current;
      if (!w || w.dataset.state === "closed") return;
      const y = w.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, f = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(f, nn, { value: !0 }), y.dispatchEvent(f);
    };
    return window.addEventListener("blur", d), () => window.removeEventListener("blur", d);
  }, []);
  const s = T(
    (d) => {
      if (r.current = d ?? void 0, d && d !== n.current && (n.current = d, a.current = Er(d) ?? Ir(d)), typeof t == "function") {
        const w = t(d);
        if (typeof w == "function")
          return () => {
            r.current = void 0, w();
          };
      } else t && (t.current = d);
    },
    [t]
  ), i = T(() => {
    var x;
    const d = n.current, w = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (d && Er(d)) ?? w ?? (d && Ir(d));
    return y != null && y.isConnected ? y : void 0;
  }, []), c = ea(
    e,
    i
  ), u = T(
    (d) => {
      c(d), r.current || (n.current = void 0, a.current = void 0);
    },
    [c]
  );
  return { ref: s, onCloseAutoFocus: u };
}
const _r = `
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
function na(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${_r}, ${e}` : _r;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && na(n)
  );
}
const Ci = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Be = "keyboard", Tr = !1;
function Ei() {
  Tr || typeof document > "u" || (Tr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      ra(t) || (Be = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Be = "keyboard";
    },
    !0
  ));
}
function Ii() {
  return Be;
}
const an = "data-quiet-focus";
function _i(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(an, ""), t.style.outline = "none"));
}
function Ti(t) {
  t && (t.removeAttribute(an), t.style.removeProperty("outline"));
}
const Li = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function oa({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    Cn.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...n
    }
  );
}
const aa = Pt(
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
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        aa({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Ai({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? ze.Root : "div";
  return /* @__PURE__ */ o(
    n,
    {
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function sn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    oa,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function cn() {
  const t = ft.createContext(null);
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return ft.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function Ye({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function je({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: sa, usePortalContainer: ia } = cn(), Mi = sa;
function Qe({
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
  const c = ht(), u = ia(), d = on({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: u, children: /* @__PURE__ */ o(
      Zt.Content,
      {
        "data-slot": "popover-content",
        ...d,
        align: e,
        sideOffset: r,
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Wr, ...n },
        dir: c,
        ...i
      }
    ) })
  );
}
function ca({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Oi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Di({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Pi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: h("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function _t({
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
      className: e ? h(Xr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: la, usePortalContainer: ua } = cn(), Ri = la;
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
  const c = ua();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: c, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Uo, ...r },
        className: h(
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
              className: h(
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
const da = /^%[^%]*%$/;
function ln(t) {
  return t !== void 0 && !da.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return ln(t) ? t : e;
}
function wa() {
  const [t, e] = P(!1), r = C(null), n = T(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = T(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const un = An(void 0);
function be() {
  const t = Mn(un);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ne = Pt("", {
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
function tr({ variant: t = "default", ...e }) {
  const r = ht(), n = ft.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(un.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Bi({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function er({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function rr({
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
  ...c
}) {
  const u = ht(), d = on({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...d,
      sideOffset: r,
      align: e,
      className: h(
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
      style: { zIndex: Wr, ...n },
      ...c,
      children: /* @__PURE__ */ o("div", { dir: u, children: a })
    }
  ) });
}
function ji({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Gi({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = ht(), s = be();
  return /* @__PURE__ */ o(
    tt.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: h(
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
  const s = ht(), i = be();
  return /* @__PURE__ */ m(
    tt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: h(
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(He, {}) })
          }
        ),
        e
      ]
    }
  );
}
function fa({
  ...t
}) {
  return /* @__PURE__ */ o(tt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Lr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = ht(), s = be();
  return /* @__PURE__ */ m(
    tt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: h(
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(He, {}) })
          }
        ),
        e
      ]
    }
  );
}
function nr({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    tt.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: h(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function or({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    tt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: h(
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
function Hi({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Ui({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = be(), s = ht();
  return /* @__PURE__ */ m(
    tt.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(Tn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Ln, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Fi({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = ht();
  return /* @__PURE__ */ o(
    tt.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: h(
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
function Ki({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    En.Root,
    {
      "data-slot": "label",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function $i({
  className: t,
  ...e
}) {
  const r = ht();
  return /* @__PURE__ */ o(
    Me.Root,
    {
      "data-slot": "radio-group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function qi({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Me.Item,
    {
      "data-slot": "radio-group-item",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Me.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Vi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Ar = (t, e) => t[e] ?? e;
function pa({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Ar(n, "%cancelButton_tooltip%"), c = s ?? Ar(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Kr, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(sn, {}),
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": c,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(pe, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: c }) })
    ] }) })
  ] });
}
function ve() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Ji() {
  return /Windows/i.test(navigator.userAgent);
}
const ma = ["input", "select", "textarea", "button"], ha = ["button", "textbox"], Wi = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = C(null), [s, i] = P(void 0), [c, u] = P(void 0), d = T(
    (f) => {
      i(f);
      const v = t.find((E) => E.id === f);
      v && (e == null || e(v));
      const p = document.getElementById(f);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), w = T(
    (f) => {
      const v = t.find((p) => p.id === f);
      v && (u((p) => p === f ? void 0 : f), r == null || r(v));
    },
    [r, t]
  ), y = (f) => {
    if (!f) return !1;
    const v = f.tagName.toLowerCase();
    if (f.isContentEditable || ma.includes(v)) return !0;
    const p = f.getAttribute("role");
    if (p && ha.includes(p)) return !0;
    const E = f.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, x = T(
    (f) => {
      var W;
      const v = f.target, p = (M) => M ? document.getElementById(M) : void 0, E = p(c), H = p(s);
      if (!!(E && v && E.contains(v) && v !== E) && y(v)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            f.preventDefault(), f.stopPropagation();
            const M = t.find((K) => K.id === c);
            M && d(M.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!E) return;
          const M = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (M.length === 0) return;
          const K = M.findIndex((pt) => pt === v);
          if (K === -1) return;
          let ct;
          f.key === "ArrowDown" ? ct = Math.min(K + 1, M.length - 1) : ct = Math.max(K - 1, 0), ct !== K && (f.preventDefault(), f.stopPropagation(), (W = M[ct]) == null || W.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((M) => M.id === s);
      let D = k;
      switch (f.key) {
        case "ArrowDown":
          D = Math.min(k + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          D = Math.max(k - 1, 0), f.preventDefault();
          break;
        case "Home":
          D = 0, f.preventDefault();
          break;
        case "End":
          D = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const M = H;
          if (M) {
            const K = M.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ct = M.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), pt = K ?? ct;
            if (pt) {
              f.preventDefault(), pt.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (y(v) || (n == null || n(f.key), f.preventDefault()));
          return;
      }
      const q = t[D];
      q && d(q.id);
    },
    [t, d, s, c, w, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: c,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: d
  };
}, ga = Pt(
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
  const a = r ? ze.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ga({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function Xi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function dn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function Zi({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = ft.useRef(null);
  ft.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), ft.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const c = () => {
      requestAnimationFrame(() => {
        Yt(i, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
        });
      });
    };
    c();
    const u = new MutationObserver(() => {
      c();
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
    var u;
    const { current: c } = a;
    if (c && dn(i, c)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (u = Yt(c)[0]) == null || u.focus();
        return;
      }
      i.key === " " && document.activeElement === c && i.preventDefault();
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
        className: h("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: a,
            onKeyDown: s,
            className: h(
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
function Yi({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: h(
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
function Qi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function tc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: h(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function ba(t) {
  ft.useEffect(() => {
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
function Na(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function va(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ec({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = ft.useRef(null);
  ft.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), ba(i);
  const c = ft.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), u = ft.useCallback(
    (w) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!dn(w, y)) {
        e == null || e(w);
        return;
      }
      const x = y.closest("table"), f = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(x).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], v = f.indexOf(y), p = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), va(f, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Na(c, p, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const E = y.closest("table");
        E && E.focus();
      }
      e == null || e(w);
    },
    [i, c, e]
  ), d = ft.useCallback(
    (w) => {
      n && (r == null || r(w));
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: u,
      onFocus: d,
      className: h(
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
function rc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "th",
    {
      "data-slot": "table-head",
      className: h(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function nc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "td",
    {
      "data-slot": "table-cell",
      className: h(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function oc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ya(t, e = !0) {
  const [r, n] = P(!1);
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
    const c = new MutationObserver(s);
    return c.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", s), i == null || i.disconnect(), c.disconnect();
    };
  }, [t, e]), r;
}
function xa({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = ya(r, e);
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
function ac({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: c = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: d,
  isOpen: w = void 0,
  onOpenChange: y = void 0,
  isDisabled: x = !1,
  sortSelected: f = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: E = void 0,
  variant: H = "ghost",
  id: G
}) {
  const [Z, k] = P(!1), D = C(null), q = T(
    (z) => {
      var et;
      const at = (et = t.find((lt) => lt.label === z)) == null ? void 0 : et.value;
      at && r(
        e.includes(at) ? e.filter((lt) => lt !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), W = () => d || n, M = w ?? Z, K = y ?? k, [ct, pt] = P(M), [Tt, V] = P(e);
  ct !== M && (pt(M), M && V(e));
  const Rt = wt(() => {
    if (!f) return t;
    const z = t.filter((et) => et.starred).sort((et, lt) => et.label.localeCompare(lt.label)), at = t.filter((et) => !et.starred).sort((et, lt) => {
      const At = Tt.includes(et.value), Bt = Tt.includes(lt.value);
      return At && !Bt ? -1 : !At && Bt ? 1 : et.label.localeCompare(lt.label);
    });
    return [...z, ...at];
  }, [t, Tt, f]), Ut = () => {
    const z = t.map((at) => at.value);
    V(z), r(z);
  }, Lt = () => {
    V([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: E, children: /* @__PURE__ */ m(Ye, { open: M, onOpenChange: K, children: [
    /* @__PURE__ */ o(je, { asChild: !0, children: /* @__PURE__ */ m(
      Y,
      {
        variant: H,
        role: "combobox",
        "aria-expanded": M,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: x,
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: h(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: W()
              }
            )
          ] }),
          /* @__PURE__ */ o($r, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Qe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(qe, { children: [
      /* @__PURE__ */ o(
        Ve,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: Lt, children: c })
      ] }),
      /* @__PURE__ */ o(xa, { isEnabled: v, scrollerRef: D, children: /* @__PURE__ */ m(Je, { ref: D, children: [
        /* @__PURE__ */ o(We, { children: u }),
        /* @__PURE__ */ o(we, { children: Rt.map((z) => /* @__PURE__ */ m(
          he,
          {
            value: z.label,
            onSelect: q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                pe,
                {
                  className: h(
                    "tw:h-4 tw:w-4",
                    e.includes(z.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              z.starred && /* @__PURE__ */ o(Pn, { className: "tw:h-4 tw:w-4" }),
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
function Sa(t, e) {
  if (!t || e === "") return !1;
  const r = St(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && St(n.marker).toLowerCase() === r
  );
}
function ka(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = St(e).toLowerCase();
  return r === "passive" ? kr({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : kr({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function ue(t) {
  return t.isComposing || t.keyCode === 229;
}
const wn = /^[a-z0-9+-]$/i;
function Ca(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ve()) && e !== "Dead") {
    if (wn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Ea = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ia = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function _a() {
  return [...Ea, ...Ia.filter((t) => wn.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function Ta(t, e, r) {
  var i, c;
  const { kind: n } = e;
  if (ue(t) || ko.has(t.key))
    return "passed";
  const a = !ve();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), ka(
      e.items.map((d) => ({ label: d.marker })),
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
      const w = St(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, w)) {
        const y = e.items.find(
          (x) => St(x.marker).toLowerCase() === w
        );
        return y && r.commitItem(y.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const u = St(e.filter).toLowerCase(), d = e.items.find(
      (w) => St(w.marker).toLowerCase() === u
    );
    return d && r.commitItem(d.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = Ca(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function La(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function fn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Aa(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Ma(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: c,
    show: u,
    restoreSelectionIfLost: d,
    hasEditorChangedSinceFocus: w,
    focusEditor: y,
    applyItem: x,
    onShowError: f
  } = t, v = () => {
    d(), y();
  };
  a.current += 1;
  const p = a.current, E = () => a.current === p, H = { kind: r, token: p, filter: "", items: e };
  n && (H.isNoteMarker = n), s(H), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: _a(),
    onKey: (G) => c(G)
  }).then((G) => {
    var k;
    i(p);
    const Z = G ?? ((k = H.itemToApplyOnClose) == null ? void 0 : k.marker);
    if (Z !== void 0) {
      const D = (w == null ? void 0 : w()) ?? !1;
      v();
      const q = D ? void 0 : e.find((W) => W.marker === Z);
      q && x(q);
    } else E() && v();
  }).catch((G) => {
    i(p), E() && v(), f(G);
  });
}
function Oa(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: c,
    hasEditorChangedSinceFocus: u
  } = e, d = r.current;
  if (!d) return "no-session";
  const w = (x) => {
    if (u != null && u()) {
      a.dismiss();
      return;
    }
    x();
  };
  return Ta(t, d, {
    update: (x) => a.update(x),
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
      const f = d.items.find((p) => p.marker === x);
      if (f) {
        if (f.kind === "note") {
          d.itemToApplyOnClose = f;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(f, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && c(d.token), "routed";
}
function Da({
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
function Pa({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  F(() => {
    const i = s ?? document, c = (u) => {
      var y, x, f;
      const d = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!d || u.target !== d) return;
      const w = (x = e.current) == null ? void 0 : x.getSelection();
      w ? r.current = w : (f = e.current) != null && f.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = fn(
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
    return i.addEventListener("focusout", c), () => i.removeEventListener("focusout", c);
  }, [t, e, r, n, a, s]);
}
function Ra({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = C(void 0), a = T(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const c = e.current ?? void 0;
      n.current = i ? c : void 0, c == null || c.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = T(
    (i) => {
      var c;
      La(t, i), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
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
function Mr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd",
      className: h(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function Ba({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: h("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const ja = /* @__PURE__ */ new Set([
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
function Ga(t) {
  const e = Vr(t, "");
  let r = 0;
  for (; r < e.length && ja.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Co(t, r);
  return a ? [...n, a] : n;
}
function za(t) {
  const e = [];
  let r = "";
  return Vr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Ha(t) {
  const e = Ga(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: za(t), separator: "+" };
}
function Or({ hint: t }) {
  const { keycaps: e, separator: r } = Ha(t);
  return e.length === 1 ? /* @__PURE__ */ o(Mr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Ba, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Ur, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Mr, { children: n })
      ] }, a)
    )) })
  );
}
const sc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Dr = (t, e) => t[e] ?? e;
function Ua({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const u = ve(), d = Dr(a, "%undoButton_tooltip%"), w = Dr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": d,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ o(Rn, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        d,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(Or, { hint: u ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ o(sn, {}),
    e && /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o(Bn, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(Or, { hint: u ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Fa({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = C(null);
  return F(() => {
    var u;
    const s = ve(), i = ((u = a.current) == null ? void 0 : u.querySelector(".editor-input")) ?? void 0, c = (d) => {
      var y, x, f, v;
      if (!i || document.activeElement !== i) return;
      const w = d.key.toLowerCase();
      if (s) {
        if (!d.metaKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((y = e.current) == null || y.undo())) : d.shiftKey && w === "z" && (d.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!d.ctrlKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || d.shiftKey && w === "z") && (d.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function Ka() {
  const t = C(void 0), e = C(new DOMRect()), r = C({
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
  return wt(() => ({ virtualRef: r, setSource: n }), [n]);
}
function $a(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function qa(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Va = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(yt, { children: [
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
function Ja({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = C(!1), i = C(null), c = C(null), u = C(!1), [d, w] = P(t), [y, x] = P(e), [f, v] = P(!1), p = C(!1), E = C(d);
  E.current = d;
  const H = C(y);
  H.current = y, F(() => {
    w(t);
  }, [t]), F(() => {
    y !== e && x(e);
  }, [e]);
  const G = (k) => {
    if (u.current = !1, v(k), !k) {
      const D = E.current, q = H.current;
      D !== "custom" || q ? (D !== t || q !== e) && (s.current = !0, r(D, q)) : (w(t), x(e));
    }
  }, Z = (k) => {
    var D, q, W, M;
    k.stopPropagation(), document.activeElement === c.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((D = i.current) == null || D.focus(), u.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((q = c.current) == null || q.focus(), u.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((W = i.current) == null ? void 0 : W.selectionStart) === 0 && ((M = c.current) == null || M.focus(), u.current = !1), d === "custom" && k.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ m(tr, { open: f, onOpenChange: G, children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: Va(t, n, e) }) }) }),
      /* @__PURE__ */ o(It, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      rr,
      {
        style: { zIndex: me },
        onEscapeKeyDown: () => {
          E.current = t, H.current = e, w(t), x(e);
        },
        onCloseAutoFocus: (k) => {
          s.current && (s.current = !1, k.preventDefault(), rn(a));
        },
        onClick: () => {
          u.current && (u.current = !1);
        },
        onKeyDown: Z,
        onMouseMove: () => {
          var k;
          u.current && ((k = i.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ o(nr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(or, {}),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: d === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Oe })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: d === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: De })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              ref: c,
              checked: d === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                p.current = d === "custom";
              },
              onClick: (k) => {
                var D;
                if (k.stopPropagation(), p.current && k.target !== i.current) {
                  G(!1);
                  return;
                }
                u.current = !0, (D = i.current) == null || D.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  Qr,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), w("custom"), u.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: y,
                    onKeyDown: (k) => {
                      k.key === "Enter" || k.key === "ArrowUp" || k.key === "ArrowDown" || k.key === "ArrowLeft" || k.key === "ArrowRight" || k.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (k) => x(k.target.value)
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
const Wa = (t, e) => t === "f" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Fe, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Ke, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Ue, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Xa = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Eo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Za({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = C(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ m(tr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: Wa(t, r) }) }) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: Xa(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      rr,
      {
        style: { zIndex: me },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), rn(a));
        },
        children: [
          /* @__PURE__ */ o(nr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(or, {}),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ue, {}),
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
                /* @__PURE__ */ o(Fe, {}),
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
const Pr = '[aria-controls="editor-context-menu"]';
function Rr(t) {
  return t ? t.matches(Pr) ? !0 : !!t.querySelector(Pr) : !1;
}
const ic = Object.freeze([
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
function Ya({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? jn, { className: e, size: 16 });
}
function Qa({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(pe, { size: 16 })
    }
  );
}
function de(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Br({
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
      value: de(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(Qa, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Ya, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Jo, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ts({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = P(""), [c] = P(() => {
    const w = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
    return w ? de(w) : void 0;
  }), [u, d] = wt(() => {
    const w = St(s.trim().toLowerCase());
    if (!w) {
      const f = e.filter((v) => !v.isDisallowed);
      return [f.length > 0 ? f : e, []];
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
  return /* @__PURE__ */ m(qe, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: c, children: [
    /* @__PURE__ */ o(
      Ve,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (w) => i(w),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(Je, { children: [
      /* @__PURE__ */ o(We, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(we, { children: u.map((w) => /* @__PURE__ */ o(
        Br,
        {
          item: w,
          localizedStrings: t
        },
        de(w)
      )) }),
      d.length > 0 && /* @__PURE__ */ m(yt, { children: [
        u.length > 0 && /* @__PURE__ */ o(Re, { alwaysRender: !0 }),
        /* @__PURE__ */ o(we, { children: d.map((w) => /* @__PURE__ */ o(
          Br,
          {
            item: w,
            localizedStrings: t
          },
          de(w)
        )) })
      ] })
    ] })
  ] });
}
function es(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = ie[n], i = s != null && s.children ? s : a && ie[a];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, u]) => {
    c.push(
      ...u.map((d) => ({
        marker: d,
        title: r[ie[d].description] ?? ie[d].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(d), e();
        }
      }))
    );
  }), c.sort((u, d) => (u.marker ?? u.title).localeCompare(d.marker ?? d.title));
}
function jr(t) {
  if (!t || !qt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function rs(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function ns(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function os(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function as(t, e) {
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
      const c = i.insert.slice(n), u = Math.min(c.length, s.length);
      if (c.slice(0, u) !== s.slice(0, u)) return !1;
      s = s.slice(u), n += u, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function ss(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function is(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const cs = 300, Le = "*", ls = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function cc({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: c,
  localizedStrings: u,
  parentEditorRef: d,
  inline: w = !1,
  ref: y,
  initialCaretPosition: x,
  markerPalette: f,
  onNoteEdit: v
}) {
  var Sr;
  const p = C(null), E = C(null), H = C(null), G = C(s);
  F(() => {
    G.current = s;
  }, [s]);
  const Z = C(x);
  F(() => {
    Z.current = x;
  }, [x]);
  const k = T(() => {
    var b, N;
    const l = Z.current;
    l !== void 0 && l !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, l.utf16Offset, {
      field: l.field,
      glyph: l.glyph
    }) : (N = p.current) == null || N.selectNote(0);
  }, []);
  se(() => {
    if (w || !H.current) return;
    const l = parseFloat(getComputedStyle(H.current).width);
    l > 0 && (H.current.style.width = `${l}px`);
  }, [w]);
  const [D, q] = P("generated"), [W, M] = P("generated"), [K, ct] = P(Le), [pt, Tt] = P(Le), [V, Rt] = P("f"), [Ut, Lt] = P(!1), [z, at] = P(!0), [et, lt] = P(!1), At = C(!1), Bt = C(""), g = C(!1), A = C(void 0), U = C([]), Q = C([]), $ = C(void 0), J = C(void 0), lr = T(() => {
    var b;
    const l = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    l != null && l.length && (U.current = [...U.current, ...l], $.current = void 0);
  }, []), ur = T(
    (l, b) => {
      var _, I;
      if (!l) return;
      const N = jr(l), S = jr(b);
      if (!N && S) {
        $.current = {
          text: U.current,
          closedNoteOp: l,
          openNoteOp: b
        }, U.current = [];
        return;
      }
      const L = $.current;
      L && (N && !S && Gt(l, L.openNoteOp) && Gt(b, L.closedNoteOp) && !((I = (_ = p.current) == null ? void 0 : _.getOpsAfterNote(0)) != null && I.length) ? (U.current = L.text, $.current = void 0) : Gt(b, L.openNoteOp) || ($.current = void 0));
    },
    []
  ), [xt, te] = P(!1), ye = Ka(), [dr, bn] = P(), wr = C(null), gt = C(
    void 0
  ), Nn = C(0), fr = C(f);
  F(() => {
    fr.current = f;
  }, [f]), F(
    () => () => {
      var l;
      gt.current && (gt.current = void 0, (l = fr.current) == null || l.dismiss());
    },
    []
  );
  const ee = C(void 0), xe = C(void 0), re = T(
    () => Aa(
      xe.current,
      fn(
        () => {
          var l;
          return (l = p.current) == null ? void 0 : l.getUsj();
        },
        () => {
          var l;
          return (l = p.current) == null ? void 0 : l.getSelection();
        }
      )
    ),
    []
  ), { setSession: pr, clearSessionIfCurrent: ne } = Ra({
    sessionRef: gt,
    editorRef: p,
    baselineRef: xe
  }), Ft = T(() => {
    var b, N, S, L;
    if ((b = p.current) != null && b.getSelection() || (N = p.current) != null && N.getSelectedParaMarker()) return;
    const l = ee.current;
    l ? (S = p.current) == null || S.setSelection(l) : (L = p.current) == null || L.selectNote(0);
  }, []), oe = T(() => {
    var l;
    Ft(), (l = p.current) == null || l.focus();
  }, [Ft]), Mt = wt(
    () => ({
      ...i,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...i.view ?? yo(),
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
    [i, c]
  ), Se = wt(
    () => es(
      p,
      () => te(!1),
      u,
      dr,
      V
    ),
    [u, dr, V]
  );
  F(() => {
    var l;
    xt || (l = p.current) == null || l.focus();
  }, [V, xt]);
  const Ot = T(() => {
    var S, L, _;
    const l = (S = E.current) == null ? void 0 : S.querySelector(".editor-input"), b = l == null ? void 0 : l.querySelector("span.note"), N = (_ = (L = E.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : _.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), jt = T(
    (l = !1) => {
      var N, S, L, _, I;
      v == null || v();
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b) && (r == null || r([b]), l && d && G.current)) {
        const B = [
          ...U.current,
          ...((L = p.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], O = Q.current, mt = !Gt(B, O);
        if (w && !mt && Gt(b, A.current))
          return;
        A.current = b;
        const X = [b];
        mt && (O.length > 0 && as(
          ((_ = d.current) == null ? void 0 : _.getOpsAfterNote(G.current)) ?? [],
          O
        ) && X.push({ delete: os(O) }), X.push(...B), Q.current = B), (I = d.current) == null || I.replaceEmbedUpdate(G.current, X);
      }
    },
    [w, r, v, d]
  ), ke = T(
    (l) => {
      var N, S, L;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (S = p.current) == null || S.applyUpdate([l, { delete: 1 }]), b && ((L = p.current) == null || L.setSelection(b)), oe();
    },
    [oe]
  ), mr = T(
    (l, b) => {
      var L, _, I;
      gt.current || (L = p.current) == null || L.commitPendingMarkerEdits();
      const N = (I = (_ = p.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
      if (!N || !qt("note", N) || !N.insert.note) return;
      let S;
      l === "custom" ? S = b : l === "generated" ? S = Oe : S = De, N.insert.note.caller !== S && (N.insert.note.caller = S, ke(N));
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
  }, [$t]), hr = T(() => {
    $t(), Kt.current = setTimeout(() => {
      Kt.current = void 0, Ce.current(!0);
    }, cs);
  }, [$t]);
  F(() => {
    var L, _;
    let l, b, N;
    At.current = !1, g.current = !1, ee.current = void 0, at(!0);
    const S = e == null ? void 0 : e.at(0);
    if (A.current = S, U.current = [], Q.current = [], $.current = void 0, J.current = void 0, S && qt("note", S)) {
      const I = (L = S.insert.note) == null ? void 0 : L.caller;
      let B = "custom";
      I === Oe ? B = "generated" : I === De && (B = "hidden");
      const O = B === "custom" && I !== void 0 ? I : Le;
      ct(O), Tt(O), q(B), M(B), Rt(((_ = S.insert.note) == null ? void 0 : _.style) ?? "f"), l = setTimeout(() => {
        var X, st, ut, Nt;
        const mt = (st = (X = p.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : st.at(0);
        (ut = p.current) == null || ut.applyUpdate(mt ? [S, { delete: 1 }] : [S]), k(), (Nt = p.current) == null || Nt.focus(), b = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var vt;
            Ot() || (k(), (vt = p.current) == null || vt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      bt(), Z.current = void 0, l && clearTimeout(l), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, bt, Ot, k]), se(() => () => bt(), [bt]);
  const gr = T(() => {
    var l;
    g.current && (gt.current || (l = p.current) == null || l.commitPendingMarkerEdits(), bt());
  }, [bt]);
  On(
    y,
    () => ({
      flushPendingEdits: gr,
      focus: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.focus();
      },
      containsFocus: () => {
        const l = H.current;
        return !!l && l.contains(l.ownerDocument.activeElement);
      }
    }),
    [gr]
  );
  const Ee = T(() => {
    var l, b;
    if (!gt.current) {
      const N = (l = E.current) == null ? void 0 : l.querySelector(".editor-input");
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
  const vn = () => {
    var _;
    const l = p.current, b = rs(l == null ? void 0 : l.getUsj());
    if (!l || !b) return;
    const N = ((_ = E.current) == null ? void 0 : _.ownerDocument) ?? document, { activeElement: S } = N, L = l.getSelection() ?? ee.current;
    l.setSelection(b);
    try {
      l.copy();
    } finally {
      L ? l.setSelection(L) : l.selectNote(0), l.getSelection(), N.activeElement !== S && (S instanceof HTMLElement && S !== N.body ? S.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
    }
  }, yn = T(
    (l, b) => {
      v == null || v(), q(l), ct(b), mr(l, b), w && bt();
    },
    [mr, bt, w, v]
  ), xn = (l) => {
    var N, S, L, _, I;
    Rt(l), gt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (L = (S = p.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = l);
      const B = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
      V !== "x" && l === "x" ? B == null || B.forEach((O) => ss(O)) : V === "x" && l !== "x" && (B == null || B.forEach((O) => is(O))), ke(b), w && bt();
    }
  }, Sn = (l) => {
    bn(l.contextMarker), lt(l.canRedo);
  }, kn = T(
    (l) => {
      var N, S, L, _, I, B, O;
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b)) {
        l.content.length > 1 && setTimeout(() => {
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (L = b.insert.note) == null ? void 0 : L.style, X = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
        if (mt || Lt(!1), Lt(
          mt === "x" ? !!(X != null && X.every((st) => {
            var Nt, vt;
            if (!((Nt = st.attributes) != null && Nt.char)) return !0;
            const ut = ((vt = st.attributes) == null ? void 0 : vt.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(X != null && X.every((st) => {
            var Nt, vt;
            if (!((Nt = st.attributes) != null && Nt.char)) return !0;
            const ut = ((vt = st.attributes) == null ? void 0 : vt.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !At.current) {
          At.current = !0, Bt.current = JSON.stringify(b), J.current = b, at(!0);
          return;
        }
        g.current = !0, ur(J.current, b), J.current = b, (O = (B = p.current) == null ? void 0 : B.getOpsAfterNote(0)) != null && O.length && setTimeout(lr, 0), at(JSON.stringify(b) === Bt.current), jt(), w && hr();
      } else
        Lt(!1), at(!0);
    },
    [
      w,
      jt,
      hr,
      ur,
      lr
    ]
  ), br = T(() => {
    const l = window.getSelection();
    if (!Se.length || !l || l.rangeCount === 0)
      return;
    const b = E.current;
    if (!b) return;
    const N = l.getRangeAt(0).cloneRange();
    ye.setSource({
      measure: () => {
        const S = $a(N);
        return S && qa(S);
      },
      contextElement: b
    }), te(!0);
  }, [Se, ye]), Te = C(() => {
  }), Nr = T(
    (l, b, N) => {
      const { anchorRect: S } = l;
      if (!f || !S) return;
      const { hasTextSelection: L } = N;
      Ma({
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: L ? "selection" : "backslash",
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
        isNoteMarker: (_) => Sa(Mt.styleInfo ?? Cr, _),
        sessionCounterRef: Nn,
        setSession: pr,
        clearSessionIfCurrent: ne,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (_) => Te.current(_),
        show: (_) => f.show({
          items: b.map(ns),
          anchor: S,
          keyForwarding: _
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Ft,
        hasEditorChangedSinceFocus: re,
        focusEditor: () => {
          var _;
          return (_ = p.current) == null ? void 0 : _.focus();
        },
        applyItem: (_) => {
          var I;
          return (I = p.current) == null ? void 0 : I.applyMarkerMenuSelection(_, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (_) => {
          (!Io(_) || _.code !== _o) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${To(_)}`
          );
        }
      });
    },
    [
      f,
      Ft,
      re,
      Mt.styleInfo,
      pr,
      ne
    ]
  ), ae = T(() => {
    var N;
    const l = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!l) return !1;
    const b = xo(Mt.styleInfo ?? Cr, l);
    return b.length === 0 ? !1 : (Nr(l, b, { hasTextSelection: !!l.hasTextSelection }), !0);
  }, [Nr, Mt.styleInfo]);
  Da({
    isSessionOpen: T(() => !!gt.current, []),
    dismiss: T(() => f == null ? void 0 : f.dismiss(), [f])
  });
  const vr = T(
    (l) => {
      if (!f) return;
      Oa(l, {
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
    Te.current = vr;
  }, [vr]), Pa({
    containerRef: E,
    editorRef: p,
    selectionRef: ee,
    baselineRef: xe,
    isSessionOpen: T(() => !!gt.current, [])
  }), F(() => {
    const l = () => {
      xt && te(!1);
    };
    return window.addEventListener("click", l), window.addEventListener("blur", l), () => {
      window.removeEventListener("click", l), window.removeEventListener("blur", l);
    };
  }, [xt]), F(() => {
    var l;
    xt && ((l = wr.current) == null || l.focus());
  }, [xt]), F(() => {
    var _;
    const l = () => {
      var I;
      return ((I = E.current) == null ? void 0 : I.querySelector(".editor-input")) ?? void 0;
    };
    if (((_ = Mt.view) == null ? void 0 : _.markerMode) === "editable") {
      const I = (O) => {
        var st, ut, Nt, vt;
        if (ue(O)) return;
        const mt = gt.current, X = l();
        if (!(!X || document.activeElement !== X)) {
          if (mt && f) {
            Te.current(O);
            return;
          }
          if (Rr(E.current)) {
            O.key === c && (O.preventDefault(), O.stopPropagation());
            return;
          }
          if (O.key === "Enter" && !Ot()) {
            O.preventDefault(), O.stopPropagation(), (st = p.current) == null || st.selectNote(0), (ut = p.current) == null || ut.focus();
            return;
          }
          if (f && O.key === c) {
            if (!Ot()) {
              O.preventDefault(), O.stopPropagation(), (Nt = p.current) == null || Nt.selectNote(0), (vt = p.current) == null || vt.focus();
              return;
            }
            ae() && (O.preventDefault(), O.stopPropagation());
          }
        }
      }, B = () => {
        var mt, X;
        const O = l();
        !O || document.activeElement !== O || Ot() || ((mt = p.current) == null || mt.selectNote(0), (X = p.current) == null || X.focus());
      };
      return document.addEventListener("keydown", I, { capture: !0 }), document.addEventListener("paste", B, { capture: !0 }), () => {
        document.removeEventListener("keydown", I, { capture: !0 }), document.removeEventListener("paste", B, { capture: !0 });
      };
    }
    const b = () => {
      const I = l();
      return !I || document.activeElement !== I ? !1 : !Rr(E.current);
    }, N = (I) => {
      I.key !== "Enter" || ue(I) || b() && (I.preventDefault(), I.stopPropagation());
    }, S = (I) => {
      I.inputType !== "insertParagraph" && I.inputType !== "insertLineBreak" || b() && (I.preventDefault(), I.stopPropagation());
    }, L = (I) => {
      const B = l();
      !xt && B && document.activeElement === B && I.key === c ? (I.preventDefault(), br()) : xt && I.key === "Escape" && (I.preventDefault(), te(!1));
    };
    return document.addEventListener("keydown", L), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), () => {
      document.removeEventListener("keydown", L), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    xt,
    br,
    c,
    (Sr = Mt.view) == null ? void 0 : Sr.markerMode,
    Mt.styleInfo,
    f,
    ae,
    Ot
  ]), F(() => {
    const l = H.current;
    if (!w || !l) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || ue(N) || (N.preventDefault(), N.stopPropagation(), Ie.current());
    };
    return l.addEventListener("keydown", b), () => l.removeEventListener("keydown", b);
  }, [w]), F(() => {
    const l = () => {
      var S, L, _;
      const b = ((S = E.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Ot() || ((L = p.current) == null || L.selectNote(0), (_ = p.current) == null || _.focus());
    };
    return document.addEventListener("pointerup", l), document.addEventListener("selectionchange", l), () => {
      document.removeEventListener("pointerup", l), document.removeEventListener("selectionchange", l);
    };
  }, [Ot]);
  const yr = u["%footnoteEditor_copyButton_tooltip%"], xr = /* @__PURE__ */ o(
    Ua,
    {
      onUndoClick: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.undo();
      },
      onRedoClick: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.redo();
      },
      canUndo: !z,
      canRedo: et,
      localizedStrings: u
    }
  );
  return /* @__PURE__ */ m(yt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: H,
        className: h("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: h("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                Za,
                {
                  isTypeSwitchable: Ut,
                  noteType: V,
                  handleNoteTypeChange: xn,
                  localizedStrings: u,
                  focusNoteText: oe
                }
              ),
              /* @__PURE__ */ o(
                Ja,
                {
                  callerType: D,
                  customCaller: K,
                  updateCaller: yn,
                  localizedStrings: u,
                  focusNoteText: oe
                }
              ),
              w && xr
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(Ze, { children: [
              xr,
              /* @__PURE__ */ o(
                pa,
                {
                  onCancelClick: n,
                  onAcceptClick: Ee,
                  canAccept: !z || W !== D || D === "custom" && K !== pt,
                  localizedStrings: u,
                  acceptLabel: u["%footnoteEditor_saveButton_tooltip%"]
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
                  Fa,
                  {
                    editorRef: p,
                    canUndo: !z,
                    canRedo: et,
                    children: /* @__PURE__ */ o(
                      So,
                      {
                        options: Mt,
                        onStateChange: Sn,
                        onUsjChange: kn,
                        defaultUsj: ls,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
                  /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
                    Y,
                    {
                      "aria-label": yr,
                      onClick: vn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Gn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: yr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(Ye, { open: xt, children: [
      /* @__PURE__ */ o(ca, { virtualRef: ye.virtualRef }),
      /* @__PURE__ */ o(
        Qe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (l) => {
            l.preventDefault(), l.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            ts,
            {
              markerMenuItems: Se,
              localizedStrings: u,
              searchRef: wr
            }
          )
        }
      )
    ] })
  ] });
}
const us = {
  "refresh-cw": po,
  download: fo,
  house: wo,
  "book-a": uo,
  settings: lo,
  "circle-question-mark": co,
  "external-link": io,
  users: so,
  "book-copy": ao,
  pencil: oo,
  eye: no,
  "zoom-in": ro,
  "zoom-out": eo,
  scan: to,
  "file-text": Qn,
  "panel-bottom": Yn,
  "message-square-plus": Zn,
  "square-function": Fe,
  "square-x": Ue,
  "square-sigma": Ke,
  book: Xn,
  "book-marked": Wn,
  "book-open": Jn,
  library: Vn,
  search: qr,
  "message-square": qn,
  "circle-check-big": $n,
  "clipboard-check": Kn,
  "clipboard-copy": Fn,
  sparkles: Un,
  "undo-2": Hn,
  "redo-2": zn
}, ar = us, lc = Object.keys(ar);
function sr(t) {
  return t !== void 0 && Object.hasOwn(ar, t);
}
function ds(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function ws(t, e) {
  return Object.entries(t).filter(([r, n]) => mn(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function pn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function mn(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function uc(t) {
  const e = new Set(t.items.map((n) => n.group)), r = Object.entries(t.groups).filter(
    ([n]) => e.has(n)
  );
  return pn(t.columns).filter(
    ({ columnKey: n }) => r.some(
      ([a, s]) => mn(a, s, n)
    )
  ).map(({ columnKey: n, column: a }) => ({
    columnKey: n,
    label: a.label,
    isHeaderHidden: a.isHeaderHidden ?? !1
  }));
}
function dc(t) {
  return t.some(
    (e) => sr(e.iconNameBefore) || e.iconPathBefore || e.checked !== void 0
  ) ? "icon" : "none";
}
function wc(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: n, items: a }) => {
    if (a.length === 0) return [];
    const s = r ? [e(n)] : [];
    return r = !0, [...s, ...a];
  });
}
function hn(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((n) => n.group === r).sort((n, a) => n.order - a.order).map(
      (n) => "command" in n ? { item: n } : {
        item: n,
        subGroups: hn(
          t,
          ds(t.groups, n.id)
        )
      }
    )
  }));
}
function fc(t) {
  return t ? {
    columns: pn(t.columns).map((e) => ({
      ...e,
      groups: hn(t, ws(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function fs(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = it(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Gr(t, e, r) {
  const n = it(e);
  return t.some(
    (a) => it(a.projectId) === n && a.scrollGroupId === r
  );
}
function Ae(t) {
  const e = fs(t.openTabs);
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
        openGroups: i.map((c) => c.scrollGroupId),
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
        isSelected: Gr(r, a.id, void 0),
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
        isSelected: Gr(r, a.id, i.scrollGroupId),
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
      (c) => it(c.projectId) === s && c.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((c) => it(c.id) === s);
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
const ir = "Selected", cr = "Unselected";
function zr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Lo(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Ge(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function ps(t) {
  const e = t.filter(zr).sort(zt), r = t.filter((a) => !zr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function ms(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, c) => {
    var d;
    const u = (d = e.getSectionHeading) == null ? void 0 : d.call(
      e,
      i,
      c.map((w) => w.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? ir : cr;
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
function hs(t, e) {
  if (e.id === "openTabs") return ps(t);
  if (e.id === "selection") return ms(t, e);
  if (!e.getGroupKey) return Ge(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((c) => {
    const u = a(c.project);
    if (u === void 0 || u === "") {
      n.push(c);
      return;
    }
    const d = r.get(u);
    d ? d.push(c) : r.set(u, [c]);
  });
  const s = [...r.entries()].map(([c, u]) => {
    var y;
    const d = [...u].sort(
      (x, f) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, f.project)) || zt(x, f);
      }
    ), w = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      c,
      d.map((x) => x.project)
    )) ?? c;
    return { key: c, heading: w, rows: d };
  });
  s.sort((c, u) => c.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: c.key, heading: c.heading },
    { key: u.key, heading: u.heading }
  ) : c.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: c, heading: u, rows: d }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: c,
    label: u,
    rows: d,
    isPriority: c === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(zt)
  }), i;
}
const pc = [
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
  if (!(typeof r != "string" || !ln(r)))
    return r;
}
const ce = "recent", gs = "other";
function gn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function bs(t) {
  const e = t ?? {};
  return [
    gn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Xt.lastUsedAt]) == "number" ? ce : gs;
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
        const n = (a = r.customData) == null ? void 0 : a[Xt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Xt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (c) => {
            var u;
            return typeof ((u = c.customData) == null ? void 0 : u[Xt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Xt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const mc = bs();
function Ns(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? ir : e.unselectedSectionHeading ?? cr
  };
}
function hc(t) {
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
function gc(t) {
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
const vs = 100, nt = {
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
  autoSelectionSelectedSectionHeading: ir,
  autoSelectionUnselectedSectionHeading: cr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function ys(t) {
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
function bc(t) {
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
  return Qo[Ao(t)] ?? String(t);
}
const Hr = "platform.footerAction", xs = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ss({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    fe,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: xs,
      children: r
    }
  ) : /* @__PURE__ */ o(fe, { variant: "secondary", children: r });
}
function ks({
  row: t,
  mode: e,
  strings: r,
  onClick: n,
  onOpen: a,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: c
}) {
  const {
    ref: u,
    open: d,
    onPointerEnter: w,
    onPointerLeave: y
  } = wa(), [x, f] = P(!1), v = Dn(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, H = d || x, G = T(() => {
    if (E) {
      f(!0);
      return;
    }
    w();
  }, [E, w]), Z = T(() => {
    f(!1), y();
  }, [y]), k = /* @__PURE__ */ o(pe, { className: h("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let D;
  e === "project" ? t.openGroups.length > 0 && (D = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((K) => /* @__PURE__ */ o(fe, { variant: "secondary", children: Qt(K) }, K)) })) : t.scrollGroupId !== void 0 && (D = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Ss,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      Y,
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
          /* @__PURE__ */ o(ho, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const q = /* @__PURE__ */ m(
    he,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: G,
      onPointerLeave: Z,
      ...p && { "aria-describedby": v },
      className: h(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: k }),
        c && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Mo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        D,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), W = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, M = t.isBoundButClosed && W ? r.boundButClosedTooltip.replace("{group}", W) : void 0;
  return /* @__PURE__ */ m(Ct, { open: H, delayDuration: 400, children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: q }),
    /* @__PURE__ */ m(
      It,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Jr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && W && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              W,
              ")"
            ] })
          ] }),
          M && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: M }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Wt = "none";
function Cs({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Wt;
  return /* @__PURE__ */ m(tr, { children: [
    /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          variant: "ghost",
          size: "sm",
          className: h(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": n.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ o(mo, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(It, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      rr,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: me },
        children: [
          /* @__PURE__ */ o(nr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(fa, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Lr, { value: Wt, children: n.groupByNone }),
            /* @__PURE__ */ o(or, {}),
            t.map((s) => /* @__PURE__ */ o(Lr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Es(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Wt) return Wt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Wt;
}
function Nc(t) {
  const [e, r] = P(!1), [n, a] = P(""), s = wt(() => ys(t.localizedStrings), [t.localizedStrings]), i = wt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(gn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      Ns({
        label: s.autoSelectionGroupingLabel,
        selectedSectionHeading: s.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: s.autoSelectionUnselectedSectionHeading
      })
    ), g;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
  ]), [c, u] = P(void 0), d = wt(
    () => Es(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = c ?? d, y = C(null), [x, f] = P(void 0), v = T((g) => {
    r(g), g || (a(""), f(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const g = window.requestAnimationFrame(() => {
      const A = y.current;
      A && A.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(g);
  }, [e]);
  const p = wt(() => t.mode === "project" ? Ae({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Ae({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Ae({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = wt(() => {
    const g = n.trim().toLowerCase();
    return g ? p.filter(
      (A) => A.shortName.toLowerCase().includes(g) || (A.fullName ?? "").toLowerCase().includes(g)
    ) : p;
  }, [p, n]), H = wt(
    () => new Map(t.projects.map((g) => [it(g.id), g])),
    [t.projects]
  ), G = T(
    (g) => g === void 0 ? void 0 : H.get(it(g)),
    [H]
  ), { renderProjectIndicator: Z } = t, k = T(
    (g) => Z ? Z(g.project) : void 0,
    [Z]
  ), D = !!Z, q = !!t.footerAction && E.length === 0, W = wt(() => {
    if (w === Wt) return Ge(E);
    const g = i.find((A) => A.id === w);
    return g ? hs(E, g) : Ge(E);
  }, [E, w, i]), M = (g) => {
    if (g.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
    }
  }, K = (g) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: g.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const A = t.selection.pairs, U = it(g.projectId), Q = (J) => it(J.projectId) === U && J.scrollGroupId === g.scrollGroupId, $ = A.some(Q) ? A.filter((J) => !Q(J)) : [
          ...A.filter((J) => !Q(J)),
          { projectId: g.projectId, scrollGroupId: g.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: $ });
        return;
      }
      case "projectScrollGroup": {
        if (g.isBoundButClosed && g.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(g.projectId, g.scrollGroupId), r(!1);
          return;
        }
        if (g.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: g.projectId,
            scrollGroupId: g.scrollGroupId
          }), r(!1);
          return;
        }
        const A = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: g.projectId, scrollGroupId: A }), t.onOpenProjectInGroup(g.projectId, A), r(!1);
      }
    }
  }, ct = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, pt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, V = wt(() => {
    switch (t.mode) {
      case "project": {
        const g = G(t.selection.projectId);
        if (pt)
          return { node: pt(g), title: "", hasSelection: !!g };
        let A = g ? g.shortName : s.buttonPlaceholder;
        return g && Tt === "shortNameAndFullName" && (A = Jr(g)), { node: A, title: A, hasSelection: !!g };
      }
      case "project-multi": {
        const { pairs: g } = t.selection;
        if (g.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const A = [];
        if (g.forEach(($) => {
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
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: U })
          ] }),
          title: `${Q} ${U}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = G(t.selection.projectId);
        if (!g) {
          const Q = s.buttonPlaceholder;
          return { node: Q, title: Q, hasSelection: !1 };
        }
        const A = t.selection.scrollGroupId;
        if (A === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const U = Qt(A);
        return {
          node: `${g.shortName} · ${U}`,
          title: `${g.shortName} · ${U}`,
          accessibleTitle: `${g.shortName}, ${U}`,
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
    pt,
    Tt,
    s.buttonPlaceholder
  ]), Rt = C(null), [Ut, Lt] = P(!1);
  F(() => {
    const g = Rt.current;
    if (!g) return;
    const A = (Q) => {
      Lt(Q < vs);
    };
    if (A(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const U = new ResizeObserver((Q) => {
      Q.forEach(($) => {
        const [J] = $.borderBoxSize;
        A(J ? J.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return U.observe(g, { box: "border-box" }), () => U.disconnect();
  }, []);
  let z;
  t.isLoading ? z = /* @__PURE__ */ o(go, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? z = void 0 : t.mode === "project-multi" ? z = /* @__PURE__ */ o($r, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : z = /* @__PURE__ */ o(bo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? M : void 0, et = s.ariaLabel && V.hasSelection && V.title ? `${s.ariaLabel}: ${V.accessibleTitle ?? V.title}` : s.ariaLabel || void 0, lt = /* @__PURE__ */ m(
    Y,
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": et,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: h(
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof V.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: V.node }) : V.node }),
        z
      ]
    }
  ), At = V.title ? /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(Ct, { children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(je, { asChild: !0, children: lt }) }),
    /* @__PURE__ */ o(It, { dir: "auto", children: V.title })
  ] }) }) : /* @__PURE__ */ o(je, { asChild: !0, children: lt }), Bt = i.length > 1;
  return /* @__PURE__ */ m(Ye, { open: e, onOpenChange: v, children: [
    At,
    /* @__PURE__ */ o(
      Qe,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(
          qe,
          {
            shouldFilter: !1,
            value: q ? x ?? Hr : void 0,
            onValueChange: f,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Ve,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  Cs,
                  {
                    availableGroupings: i,
                    activeGrouping: w,
                    onChangeGrouping: u,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: ct, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Je, { children: [
                /* @__PURE__ */ o(We, { children: s.commandEmptyMessage }),
                W.map((g, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Ur,
                    {
                      children: [
                        /* @__PURE__ */ o(we, { heading: Is(g, s), children: g.rows.map((U) => /* @__PURE__ */ o(
                          ks,
                          {
                            row: U,
                            mode: t.mode,
                            strings: s,
                            onClick: K,
                            onOpen: at,
                            selectedRowRef: y,
                            indicator: k(U),
                            reserveIndicatorSlot: D
                          },
                          U.rowKey
                        )) }),
                        A < W.length - 1 && /* @__PURE__ */ o(Re, { alwaysRender: !0 })
                      ]
                    },
                    `${g.kind}:${g.groupingId ?? ""}:${g.key ?? g.label ?? ""}`
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
                    Re,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    he,
                    {
                      forceMount: !0,
                      value: Hr,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var g;
                        (g = t.footerAction) == null || g.onSelect(), v(!1);
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
function Is(t, e) {
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
const _s = Fr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, c) => {
    const u = ht();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: h("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            qr,
            {
              className: h(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            Qr,
            {
              ref: c,
              className: h(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (d) => e(d.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            Y,
            {
              variant: "ghost",
              size: "icon",
              className: h(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": u === "rtl" },
                { "tw:right-0": u === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(Kr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
_s.displayName = "SearchBar";
const Ts = 5;
function vc(t) {
  return Yo(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function Ls(t, e) {
  return t.filter((r) => {
    try {
      return Oo(r) === e;
    } catch {
      return !1;
    }
  });
}
const yc = (t, e, r) => Ls(t, e).every((n) => r.includes(n));
function As(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => ta(n, e));
}
function xc(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), s = new Set(e.map((c) => c.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((c) => a.has(c)))
    return r;
  const i = As(t, n);
  if (i.length !== 0)
    return i.length <= Ts ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Ms({ name: t, className: e }) {
  const r = sr(t) ? ar[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: h("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function Sc({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const s = n ? "tw:me-2" : "tw:ms-2";
  if (sr(e)) return /* @__PURE__ */ o(Ms, { name: e, className: s });
  if (!t && n && a === "icon")
    return /* @__PURE__ */ o(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: h("tw:inline-block tw:w-4 tw:shrink-0", s)
      }
    );
  if (!t) return;
  const i = `${n ? "Leading" : "Trailing"} icon for ${r}`;
  return n ? /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "menu-icon-image-box",
      className: h(
        "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
        s
      ),
      children: /* @__PURE__ */ o("img", { className: "tw:max-h-4 tw:max-w-4", src: t, alt: i })
    }
  ) : /* @__PURE__ */ o("img", { className: h("tw:max-h-4 tw:max-w-4", s), src: t, alt: i });
}
function kc({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: h("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function Os({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Ds({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-header",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Ps = Pt(
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
function Rs({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ps({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Cc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-title",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function Bs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-description",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function js({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-content",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Ec({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Os, { className: h(s), role: a, children: [
    /* @__PURE__ */ m(Ds, { children: [
      /* @__PURE__ */ o(Rs, { variant: "icon", children: n ?? /* @__PURE__ */ o(No, {}) }),
      /* @__PURE__ */ o(Bs, { children: t })
    ] }),
    r && /* @__PURE__ */ o(js, { children: /* @__PURE__ */ o(Y, { onClick: () => r(), children: e }) })
  ] });
}
const Gs = Fr(({ className: t, ...e }, r) => /* @__PURE__ */ o(vo, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
Gs.displayName = "Spinner";
const zs = Pt(
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
function Ic({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        zs({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function _c({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-title",
      className: h(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Tc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-description",
      className: h(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function Lc({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    $e.Group,
    {
      "data-slot": "resizable-panel-group",
      className: h(
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
function Ac({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    $e.Panel,
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
function Mc({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    $e.Separator,
    {
      "data-slot": "resizable-handle",
      className: h(
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
  Si as A,
  Y as B,
  he as C,
  tr as D,
  Ze as E,
  sn as F,
  Je as G,
  We as H,
  Ki as I,
  qi as J,
  ii as K,
  Ci as L,
  ui as M,
  di as N,
  mi as O,
  hi as P,
  fi as Q,
  $i as R,
  ve as S,
  _t as T,
  pa as U,
  Vi as V,
  fe as W,
  oa as X,
  Xi as Y,
  Wi as Z,
  or as _,
  ta as a,
  Cc as a$,
  ea as a0,
  Wr as a1,
  ec as a2,
  nc as a3,
  Zi as a4,
  Yi as a5,
  rc as a6,
  Qi as a7,
  ji as a8,
  fa as a9,
  Bi as aA,
  Fi as aB,
  wc as aC,
  _i as aD,
  un as aE,
  be as aF,
  Ne as aG,
  on as aH,
  $o as aI,
  Vo as aJ,
  Mr as aK,
  Ic as aL,
  Tc as aM,
  _c as aN,
  Ai as aO,
  li as aP,
  pi as aQ,
  Ko as aR,
  Fo as aS,
  ci as aT,
  Fa as aU,
  Os as aV,
  js as aW,
  Bs as aX,
  Ds as aY,
  Rs as aZ,
  kc as a_,
  Lr as aa,
  ac as ab,
  ic as ac,
  sc as ad,
  Qr as ae,
  Nc as af,
  _s as ag,
  vc as ah,
  Ls as ai,
  Re as aj,
  yi as ak,
  yc as al,
  Mi as am,
  rn as an,
  wi as ao,
  Qo as ap,
  fc as aq,
  uc as ar,
  dc as as,
  Li as at,
  Ti as au,
  Sc as av,
  zi as aw,
  Or as ax,
  Ui as ay,
  Hi as az,
  Ct as b,
  Ma as b$,
  cc as b0,
  cs as b1,
  Ba as b2,
  ts as b3,
  ca as b4,
  Pi as b5,
  Oi as b6,
  Di as b7,
  Mc as b8,
  Ac as b9,
  ya as bA,
  Ka as bB,
  Ni as bC,
  lc as bD,
  Ms as bE,
  Wt as bF,
  nt as bG,
  pc as bH,
  Uo as bI,
  hc as bJ,
  bc as bK,
  gc as bL,
  fn as bM,
  La as bN,
  mc as bO,
  ka as bP,
  _a as bQ,
  Ta as bR,
  Aa as bS,
  Rr as bT,
  Sa as bU,
  bs as bV,
  Ns as bW,
  ns as bX,
  si as bY,
  Ca as bZ,
  Oa as b_,
  Lc as ba,
  Ec as bb,
  Gs as bc,
  oc as bd,
  tc as be,
  Ri as bf,
  Ua as bg,
  me as bh,
  ai as bi,
  oi as bj,
  Ho as bk,
  zo as bl,
  ri as bm,
  ei as bn,
  ni as bo,
  ti as bp,
  ga as bq,
  aa as br,
  Xr as bs,
  mn as bt,
  tn as bu,
  jr as bv,
  Ji as bw,
  qa as bx,
  $a as by,
  en as bz,
  h as c,
  St as c0,
  xc as c1,
  Da as c2,
  Pa as c3,
  Ra as c4,
  Et as d,
  It as e,
  Ii as f,
  xi as g,
  er as h,
  rr as i,
  nr as j,
  Gi as k,
  bi as l,
  ki as m,
  we as n,
  ht as o,
  Zo as p,
  vi as q,
  rt as r,
  Ye as s,
  Ei as t,
  wa as u,
  je as v,
  Qe as w,
  gi as x,
  qe as y,
  Ve as z
};
//# sourceMappingURL=resizable-ChzvT9Iw.js.map
