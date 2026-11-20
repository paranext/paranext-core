import { jsx as o, jsxs as p, Fragment as xt } from "react/jsx-runtime";
import { Slot as Ve, Dialog as Ct, Separator as Mn, Popover as te, Tooltip as Jt, DropdownMenu as tt, Label as Pn, RadioGroup as Ge } from "radix-ui";
import { IconX as Dn, IconCheck as Je, IconSearch as Rn, IconChevronLeft as Bn, IconChevronRight as jn } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import wt, { useRef as k, useEffect as H, useCallback as I, useState as B, createContext as Gn, useContext as zn, useMemo as ft, Fragment as Xr, useLayoutEffect as de, useImperativeHandle as Hn, useId as Un, forwardRef as Zr } from "react";
import { X as Yr, Check as Ne, ChevronsUpDown as Qr, Star as Fn, Undo as Kn, Redo as $n, SquareX as We, FunctionSquare as Xe, SquareSigma as Ze, Ban as qn, Copy as Vn, Redo2 as Jn, Undo2 as Wn, Sparkles as Xn, Scissors as Zn, ClipboardType as Yn, ClipboardPaste as Qn, ClipboardCopy as to, ClipboardCheck as eo, CircleCheckBig as ro, MessageSquare as no, Search as tn, Library as oo, BookOpen as ao, BookMarked as so, Book as io, MessageSquarePlus as co, PanelBottom as lo, FileText as uo, Scan as fo, ZoomOut as wo, ZoomIn as po, Eye as mo, Pencil as ho, BookCopy as go, Users as bo, ExternalLink as No, CircleQuestionMark as vo, Settings as yo, BookA as xo, House as So, Download as ko, RefreshCw as Co, Group as Eo, ArrowRight as Io, Loader2 as _o, ChevronDown as To, AlertTriangle as Lo, LoaderCircle as Ao } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Mr, GENERATOR_NOTE_CALLER as ze, HIDDEN_NOTE_CALLER as He, isInsertEmbedOpOfType as Vt, getDefaultViewOptions as Oo, getMarkerMenuItems as Mo, defaultStyleInfo as Pr, Editorial as Po } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as Do, split as en, slice as Ro, formatReplacementString as Bo, usfmMarkers as fe, deepEqual as Bt, isPlatformError as jo, ABORTED as Go, getErrorMessage as zo, normalizeProjectId as ct, compareProjectsByName as Ho, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Qt, formatProjectName as rn, getLocalizeKeyForScrollGroupId as Uo, hasDistinctFullName as Fo, getSectionForBook as Ko } from "platform-bible-utils";
import { Command as Gt } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Ye from "react-resizable-panels";
import { clsx as $o } from "clsx";
import { extendTailwindMerge as qo, twMerge as Vo } from "tailwind-merge";
const Jo = qo({ prefix: "tw" });
function Ue(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Wo(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Ue(t), r = e.findIndex((s) => s.startsWith("-tw-"));
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
function Xo(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Ue(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Ue(e), i = s.some((u) => u.startsWith("-tw-")), c = s.some((u) => u.startsWith("!tw-"));
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
  const e = $o(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Jo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((u) => {
    const d = Wo(u);
    n.set(d.normalized, d.original), a.push(d.normalized);
  }), Vo(a.join(" ")).split(" ").filter(Boolean).map((u) => {
    const d = n.get(u);
    return d ? Xo(u, d) : u;
  }).join(" ");
}
const nn = 600, ve = 650, pi = 400, Zo = 450, Yo = 500, mi = 510, hi = 520, Qo = 675, gi = 690, bi = 700, Ni = 800, on = Pt(
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
function Z({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const s = n ? Ve.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: h(on({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const an = "layoutDirection";
function sn() {
  return globalThis.localStorage ?? void 0;
}
function ht() {
  var t;
  try {
    const e = (t = sn()) == null ? void 0 : t.getItem(an);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function vi(t) {
  var e;
  try {
    (e = sn()) == null || e.setItem(an, t);
  } catch {
  }
}
function yi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Root, { "data-slot": "dialog", ...t });
}
function xi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function ta({ ...t }) {
  return /* @__PURE__ */ o(Ct.Portal, { "data-slot": "dialog-portal", ...t });
}
function Si({ ...t }) {
  return /* @__PURE__ */ o(Ct.Close, { "data-slot": "dialog-close", ...t });
}
function ea({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ct.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: h(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Zo, ...e },
      ...r
    }
  );
}
function ki({
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
  return /* @__PURE__ */ p(ta, { children: [
    /* @__PURE__ */ o(ea, { className: n, style: a }),
    /* @__PURE__ */ p(
      Ct.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Yo, ...s },
        dir: c,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(Ct.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Dn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ci({ className: t, ...e }) {
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
function Ei({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ p(
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
        e && /* @__PURE__ */ o(Ct.Close, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ii({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ct.Title,
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
function _i({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ct.Description,
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
function cn({ className: t, type: e, ...r }) {
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
function ra({ className: t, ...e }) {
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
const na = Pt(
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
function oa({
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
        className: h(na({ align: e }), t),
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
function Qe({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gt,
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
function tr({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = ht(), s = wt.useCallback(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ p(ra, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Gt.Input,
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
      /* @__PURE__ */ o(oa, { children: /* @__PURE__ */ o(Rn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function er({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gt.List,
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
function rr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Empty,
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
function ge({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Group,
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
function Fe({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Separator,
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
function ye({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ p(
    Gt.Item,
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
        /* @__PURE__ */ o(Je, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function aa({ className: t, ...e }) {
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
const sa = [
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
], ia = (t) => {
  var e;
  return ((e = sa[t]) == null ? void 0 : e.chapters) ?? -1;
}, ca = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function la(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function j(t) {
  return `%scrollGroup_${t}%`;
}
const ua = {
  [j("undefined")]: "Ø",
  [j(0)]: "A",
  [j(1)]: "B",
  [j(2)]: "C",
  [j(3)]: "D",
  [j(4)]: "E",
  [j(5)]: "F",
  [j(6)]: "G",
  [j(7)]: "H",
  [j(8)]: "I",
  [j(9)]: "J",
  [j(10)]: "K",
  [j(11)]: "L",
  [j(12)]: "M",
  [j(13)]: "N",
  [j(14)]: "O",
  [j(15)]: "P",
  [j(16)]: "Q",
  [j(17)]: "R",
  [j(18)]: "S",
  [j(19)]: "T",
  [j(20)]: "U",
  [j(21)]: "V",
  [j(22)]: "W",
  [j(23)]: "X",
  [j(24)]: "Y",
  [j(25)]: "Z"
};
function nr(t, e) {
  return ia(ot.bookIdToNumber(t));
}
function xe(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = ot.bookIdToNumber(i);
    (r === "next" ? c > n && c < s : c < n && c > s) && (a = i, s = c);
  }), a;
}
function Ti(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = xe(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(nr(s), 1),
      verseNum: 1
    };
}
function Li(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < nr(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = xe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ai(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = xe(n, e, "previous");
  if (!i) return;
  const c = Math.max(nr(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function Oi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = xe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Mi(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Pi = (t, e, r, n, a) => {
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
}, Di = (t, e, r, n, a) => {
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
function Ri(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function da(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Bi = Object.fromEntries(
  ca.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function ji(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function ln() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function un(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function dn(t) {
  un(document, ln()) || t();
}
function Dr(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Rr(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function fa(t, e) {
  const [r] = B(ln), n = k(t);
  n.current = t;
  const a = k(e);
  return a.current = e, I(
    (s) => {
      var u, d;
      if ((u = n.current) == null || u.call(n, s), s.defaultPrevented) return;
      if (un(document, r)) {
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
const fn = Symbol.for("platform-bible-react.window-blur-press");
function wa(t) {
  return Reflect.get(t, fn) === !0;
}
function wn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = k(void 0), n = k(void 0), a = k(void 0);
  H(() => {
    const d = () => {
      const f = r.current;
      if (!f || f.dataset.state === "closed") return;
      const y = f.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, w = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(w, fn, { value: !0 }), y.dispatchEvent(w);
    };
    return window.addEventListener("blur", d), () => window.removeEventListener("blur", d);
  }, []);
  const s = I(
    (d) => {
      if (r.current = d ?? void 0, d && d !== n.current && (n.current = d, a.current = Dr(d) ?? Rr(d)), typeof t == "function") {
        const f = t(d);
        if (typeof f == "function")
          return () => {
            r.current = void 0, f();
          };
      } else t && (t.current = d);
    },
    [t]
  ), i = I(() => {
    var x;
    const d = n.current, f = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (d && Dr(d)) ?? f ?? (d && Rr(d));
    return y != null && y.isConnected ? y : void 0;
  }, []), c = fa(
    e,
    i
  ), u = I(
    (d) => {
      c(d), r.current || (n.current = void 0, a.current = void 0);
    },
    [c]
  );
  return { ref: s, onCloseAutoFocus: u };
}
const Br = `
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
function pa(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function ee(t, e) {
  const r = e ? `${Br}, ${e}` : Br;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && pa(n)
  );
}
const Gi = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Ke = "keyboard", jr = !1;
function zi() {
  jr || typeof document > "u" || (jr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      wa(t) || (Ke = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Ke = "keyboard";
    },
    !0
  ));
}
function Hi() {
  return Ke;
}
const pn = "data-quiet-focus";
function Ui(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(pn, ""), t.style.outline = "none"));
}
function Fi(t) {
  t && (t.removeAttribute(pn), t.style.removeProperty("outline"));
}
const Ki = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function ma({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    Mn.Root,
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
const ha = Pt(
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
function or({
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
        ha({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function $i({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ve.Root : "div";
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
function mn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    ma,
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
function hn() {
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
function ar({ ...t }) {
  return /* @__PURE__ */ o(te.Root, { "data-slot": "popover", ...t });
}
function $e({ ...t }) {
  return /* @__PURE__ */ o(te.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: ga, usePortalContainer: ba } = hn(), qi = ga;
function sr({
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
  const c = ht(), u = ba(), d = wn({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(te.Portal, { container: u, children: /* @__PURE__ */ o(
      te.Content,
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
        style: { zIndex: nn, ...n },
        dir: c,
        ...i
      }
    ) })
  );
}
function Na({ ...t }) {
  return /* @__PURE__ */ o(te.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Vi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Ji({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Wi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: h("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function At({
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
function Et({ ...t }) {
  return /* @__PURE__ */ o(Jt.Root, { "data-slot": "tooltip", ...t });
}
function It({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? h(on({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: va, usePortalContainer: ya } = hn(), Xi = va;
function _t({
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
  const c = ya();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: c, children: /* @__PURE__ */ p(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Qo, ...r },
        className: h(
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
const xa = /^%[^%]*%$/;
function gn(t) {
  return t !== void 0 && !xa.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return gn(t) ? t : e;
}
function Sa() {
  const [t, e] = B(!1), r = k(null), n = I(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = I(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const bn = Gn(void 0);
function Se() {
  const t = zn(bn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ke = Pt("", {
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
function ir({ variant: t = "default", ...e }) {
  const r = ht(), n = wt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(bn.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Zi({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function cr({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function lr({
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
  const u = ht(), d = wn({ ref: s, onCloseAutoFocus: i });
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
      style: { zIndex: nn, ...n },
      ...c,
      children: /* @__PURE__ */ o("div", { dir: u, children: a })
    }
  ) });
}
function Yi({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Qi({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = ht(), s = Se();
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
        ke({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function Wt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = ht(), i = Se();
  return /* @__PURE__ */ p(
    tt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: i.variant })
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(Je, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ka({
  ...t
}) {
  return /* @__PURE__ */ o(tt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Gr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = ht(), s = Se();
  return /* @__PURE__ */ p(
    tt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(Je, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ur({ className: t, inset: e, ...r }) {
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
function dr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    tt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function tc({ className: t, ...e }) {
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
function ec({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function rc({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = Se(), s = ht();
  return /* @__PURE__ */ p(
    tt.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(Bn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(jn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function nc({
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
      style: { zIndex: ve, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function oc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Pn.Root,
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
function ac({
  className: t,
  ...e
}) {
  const r = ht();
  return /* @__PURE__ */ o(
    Ge.Root,
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
function sc({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ge.Item,
    {
      "data-slot": "radio-group-item",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Ge.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const ic = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), zr = (t, e) => t[e] ?? e;
function Ca({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = zr(n, "%cancelButton_tooltip%"), c = s ?? zr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(or, { children: [
    /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Yr, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(mn, {}),
    /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": c,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(Ne, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: c }) })
    ] }) })
  ] });
}
function Ce() {
  return /Macintosh/i.test(navigator.userAgent);
}
function cc() {
  return /Windows/i.test(navigator.userAgent);
}
const Ea = ["input", "select", "textarea", "button"], Ia = ["button", "textbox"], lc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = k(null), [s, i] = B(void 0), [c, u] = B(void 0), d = I(
    (w) => {
      i(w);
      const v = t.find((A) => A.id === w);
      v && (e == null || e(v));
      const _ = document.getElementById(w);
      _ && (_.scrollIntoView({ block: "center" }), _.focus()), a.current && a.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = I(
    (w) => {
      const v = t.find((_) => _.id === w);
      v && (u((_) => _ === w ? void 0 : w), r == null || r(v));
    },
    [r, t]
  ), y = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || Ea.includes(v)) return !0;
    const _ = w.getAttribute("role");
    if (_ && Ia.includes(_)) return !0;
    const A = w.getAttribute("tabindex");
    return A !== void 0 && A !== "-1";
  }, x = I(
    (w) => {
      var q;
      const v = w.target, _ = (O) => O ? document.getElementById(O) : void 0, A = _(c), N = _(s);
      if (!!(A && v && A.contains(v) && v !== A) && y(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            w.preventDefault(), w.stopPropagation();
            const O = t.find((V) => V.id === c);
            O && d(O.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!A) return;
          const O = Array.from(
            A.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (O.length === 0) return;
          const V = O.findIndex((lt) => lt === v);
          if (V === -1) return;
          let pt;
          w.key === "ArrowDown" ? pt = Math.min(V + 1, O.length - 1) : pt = Math.max(V - 1, 0), pt !== V && (w.preventDefault(), w.stopPropagation(), (q = O[pt]) == null || q.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((O) => O.id === s);
      let R = C;
      switch (w.key) {
        case "ArrowDown":
          R = Math.min(C + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          R = Math.max(C - 1, 0), w.preventDefault();
          break;
        case "Home":
          R = 0, w.preventDefault();
          break;
        case "End":
          R = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const O = N;
          if (O) {
            const V = O.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), pt = O.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), lt = V ?? pt;
            if (lt) {
              w.preventDefault(), lt.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (y(v) || (n == null || n(w.key), w.preventDefault()));
          return;
      }
      const F = t[R];
      F && d(F.id);
    },
    [t, d, s, c, f, n]
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
}, _a = Pt(
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
function be({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? Ve.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        _a({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function uc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Nn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function dc({
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
    const c = () => {
      requestAnimationFrame(() => {
        ee(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
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
    if (c && Nn(i, c)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (u = ee(c)[0]) == null || u.focus();
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
function fc({
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
function wc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function pc({ className: t, ...e }) {
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
function Ta(t) {
  wt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? ee(t.current) : [], s = a.indexOf(document.activeElement), i = n.key === "ArrowRight" ? s + 1 : s - 1;
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
function La(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Aa(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function mc({
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
  }, [a]), Ta(i);
  const c = wt.useMemo(
    () => i.current ? ee(i.current) : [],
    [i]
  ), u = wt.useCallback(
    (f) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!Nn(f, y)) {
        e == null || e(f);
        return;
      }
      const x = y.closest("table"), w = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ee(x).filter(
          (A) => A.tagName === "TR"
        )
      ) : [], v = w.indexOf(y), _ = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), Aa(w, v, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), La(c, _, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const A = y.closest("table");
        A && A.focus();
      }
      e == null || e(f);
    },
    [i, c, e]
  ), d = wt.useCallback(
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
function hc({ className: t, ...e }) {
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
function gc({ className: t, ...e }) {
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
function bc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Oa(t, e = !0) {
  const [r, n] = B(!1);
  return H(() => {
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
function Ma({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Oa(r, e);
  return e ? (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ p("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
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
function Nc({
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
  isOpen: f = void 0,
  onOpenChange: y = void 0,
  isDisabled: x = !1,
  sortSelected: w = !1,
  showScrollCue: v = !1,
  icon: _ = void 0,
  className: A = void 0,
  variant: N = "ghost",
  id: D
}) {
  const [$, C] = B(!1), R = k(null), F = I(
    (K) => {
      var Y;
      const st = (Y = t.find((et) => et.label === K)) == null ? void 0 : Y.value;
      st && r(
        e.includes(st) ? e.filter((et) => et !== st) : [...e, st]
      );
    },
    [t, e, r]
  ), q = () => d || n, O = f ?? $, V = y ?? C, [pt, lt] = B(O), [Tt, at] = B(e);
  pt !== O && (lt(O), O && at(e));
  const zt = ft(() => {
    if (!w) return t;
    const K = t.filter((Y) => Y.starred).sort((Y, et) => Y.label.localeCompare(et.label)), st = t.filter((Y) => !Y.starred).sort((Y, et) => {
      const Dt = Tt.includes(Y.value), Ut = Tt.includes(et.value);
      return Dt && !Ut ? -1 : !Dt && Ut ? 1 : Y.label.localeCompare(et.label);
    });
    return [...K, ...st];
  }, [t, Tt, w]), gt = () => {
    const K = t.map((st) => st.value);
    at(K), r(K);
  }, Ht = () => {
    at([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: D, className: A, children: /* @__PURE__ */ p(ar, { open: O, onOpenChange: V, children: [
    /* @__PURE__ */ o($e, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
      {
        variant: N,
        role: "combobox",
        "aria-expanded": O,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: x,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            _ && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: _ }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: h(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: q()
              }
            )
          ] }),
          /* @__PURE__ */ o(Qr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(sr, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Qe, { children: [
      /* @__PURE__ */ o(
        tr,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: gt, children: i }),
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Ht, children: c })
      ] }),
      /* @__PURE__ */ o(Ma, { isEnabled: v, scrollerRef: R, children: /* @__PURE__ */ p(er, { ref: R, children: [
        /* @__PURE__ */ o(rr, { children: u }),
        /* @__PURE__ */ o(ge, { children: zt.map((K) => /* @__PURE__ */ p(
          ye,
          {
            value: K.label,
            onSelect: F,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Ne,
                {
                  className: h(
                    "tw:h-4 tw:w-4",
                    e.includes(K.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              K.starred && /* @__PURE__ */ o(Fn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: K.label }),
              K.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: K.secondaryLabel })
            ]
          },
          K.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function kt(t) {
  return t.replace(/^\+/, "");
}
function Pa(t, e) {
  if (!t || e === "") return !1;
  const r = kt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && kt(n.marker).toLowerCase() === r
  );
}
function Da(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = kt(e).toLowerCase();
  return r === "passive" ? Mr({
    query: a,
    items: n,
    filter: (s) => kt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Mr({
    query: a,
    items: n,
    filter: (s) => kt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function me(t) {
  return t.isComposing || t.keyCode === 229;
}
const vn = /^[a-z0-9+-]$/i;
function Ra(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && Ce()) && e !== "Dead") {
    if (vn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Ba = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], ja = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Ga() {
  return [...Ba, ...ja.filter((t) => vn.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function za(t, e, r) {
  var i, c;
  const { kind: n } = e;
  if (me(t) || Do.has(t.key))
    return "passed";
  const a = !Ce();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), Da(
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
      const f = kt(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, f)) {
        const y = e.items.find(
          (x) => kt(x.marker).toLowerCase() === f
        );
        return y && r.commitItem(y.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const u = kt(e.filter).toLowerCase(), d = e.items.find(
      (f) => kt(f.marker).toLowerCase() === u
    );
    return d && r.commitItem(d.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = Ra(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function Ha(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function yn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Ua(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Fa(t) {
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
    hasEditorChangedSinceFocus: f,
    focusEditor: y,
    applyItem: x,
    onShowError: w
  } = t, v = () => {
    d(), y();
  };
  a.current += 1;
  const _ = a.current, A = () => a.current === _, N = { kind: r, token: _, filter: "", items: e };
  n && (N.isNoteMarker = n), s(N), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Ga(),
    onKey: (D) => c(D)
  }).then((D) => {
    var C;
    i(_);
    const $ = D ?? ((C = N.itemToApplyOnClose) == null ? void 0 : C.marker);
    if ($ !== void 0) {
      const R = (f == null ? void 0 : f()) ?? !1;
      v();
      const F = R ? void 0 : e.find((q) => q.marker === $);
      F && x(F);
    } else A() && v();
  }).catch((D) => {
    i(_), A() && v(), w(D);
  });
}
function Ka(t, e) {
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
  const f = (x) => {
    if (u != null && u()) {
      a.dismiss();
      return;
    }
    x();
  };
  return za(t, d, {
    update: (x) => a.update(x),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (x) => f(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(x);
    }),
    commitTypedAndReopen: (x) => f(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(x, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (x) => f(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedCloser(x);
    }),
    commitItem: (x) => f(() => {
      var v;
      const w = d.items.find((_) => _.marker === x);
      if (w) {
        if (w.kind === "note") {
          d.itemToApplyOnClose = w;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(w, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && c(d.token), "routed";
}
function $a({
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  H(() => {
    const n = r ?? document, a = () => {
      t() && e();
    };
    return n.addEventListener("compositionstart", a, { capture: !0 }), () => {
      n.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
function qa({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  H(() => {
    const i = s ?? document, c = (u) => {
      var y, x, w;
      const d = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!d || u.target !== d) return;
      const f = (x = e.current) == null ? void 0 : x.getSelection();
      f ? r.current = f : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = yn(
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
function Va({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = k(void 0), a = I(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const c = e.current ?? void 0;
      n.current = i ? c : void 0, c == null || c.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = I(
    (i) => {
      var c;
      Ha(t, i), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return H(
    () => () => {
      var i;
      (i = n.current) == null || i.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: s };
}
function Hr({ className: t, ...e }) {
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
function Ja({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: h("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Wa = /* @__PURE__ */ new Set([
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
function Xa(t) {
  const e = en(t, "");
  let r = 0;
  for (; r < e.length && Wa.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Ro(t, r);
  return a ? [...n, a] : n;
}
function Za(t) {
  const e = [];
  let r = "";
  return en(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Ya(t) {
  const e = Xa(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Za(t), separator: "+" };
}
function Ur({ hint: t }) {
  const { keycaps: e, separator: r } = Ya(t);
  return e.length === 1 ? /* @__PURE__ */ o(Hr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Ja, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ p(Xr, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Hr, { children: n })
      ] }, a)
    )) })
  );
}
const vc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Fr = (t, e) => t[e] ?? e;
function Qa({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const u = Ce(), d = Fr(a, "%undoButton_tooltip%"), f = Fr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(or, { children: [
    /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": d,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ o(Kn, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ p("p", { children: [
        d,
        s && /* @__PURE__ */ p(xt, { children: [
          " ",
          /* @__PURE__ */ o(Ur, { hint: u ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ o(mn, {}),
    e && /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o($n, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ p("p", { children: [
        f,
        s && /* @__PURE__ */ p(xt, { children: [
          " ",
          /* @__PURE__ */ o(Ur, { hint: u ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function ts({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = k(null);
  return H(() => {
    var u;
    const s = Ce(), i = ((u = a.current) == null ? void 0 : u.querySelector(".editor-input")) ?? void 0, c = (d) => {
      var y, x, w, v;
      if (!i || document.activeElement !== i) return;
      const f = d.key.toLowerCase();
      if (s) {
        if (!d.metaKey) return;
        !d.shiftKey && f === "z" ? (d.preventDefault(), r && ((y = e.current) == null || y.undo())) : d.shiftKey && f === "z" && (d.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!d.ctrlKey) return;
        !d.shiftKey && f === "z" ? (d.preventDefault(), r && ((w = e.current) == null || w.undo())) : (f === "y" || d.shiftKey && f === "z") && (d.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function es() {
  const t = k(void 0), e = k(new DOMRect()), r = k({
    getBoundingClientRect: () => {
      var s;
      const a = (s = t.current) == null ? void 0 : s.measure();
      return a && (e.current = a), e.current;
    },
    get contextElement() {
      var a;
      return (a = t.current) == null ? void 0 : a.contextElement;
    }
  }), n = I((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return ft(() => ({ virtualRef: r, setSource: n }), [n]);
}
function rs(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function ns(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
function os(t, e = globalThis.document) {
  const r = e == null ? void 0 : e.getSelection(), n = r == null ? void 0 : r.anchorNode, a = r == null ? void 0 : r.focusNode;
  if (!r || !n || !a) {
    t();
    return;
  }
  const { anchorOffset: s, focusOffset: i } = r;
  try {
    t();
  } finally {
    if (r.anchorNode !== n || r.anchorOffset !== s || r.focusNode !== a || r.focusOffset !== i)
      try {
        r.setBaseAndExtent(n, s, a, i);
      } catch {
      }
  }
}
function as(t, e, r = window) {
  if (t && e && (t.getSelection() || t.getSelectedParaMarker())) {
    t.focus();
    return;
  }
  r.focus();
}
const ss = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function is({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = k(!1), i = k(null), c = k(null), u = k(!1), [d, f] = B(t), [y, x] = B(e), [w, v] = B(!1), _ = k(!1), A = k(d);
  A.current = d;
  const N = k(y);
  N.current = y, H(() => {
    f(t);
  }, [t]), H(() => {
    y !== e && x(e);
  }, [e]);
  const D = (C) => {
    if (u.current = !1, v(C), !C) {
      const R = A.current, F = N.current;
      R !== "custom" || F ? (R !== t || F !== e) && (s.current = !0, r(R, F)) : (f(t), x(e));
    }
  }, $ = (C) => {
    var R, F, q, O;
    C.stopPropagation(), document.activeElement === c.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((R = i.current) == null || R.focus(), u.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? ((F = c.current) == null || F.focus(), u.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((q = i.current) == null ? void 0 : q.selectionStart) === 0 && ((O = c.current) == null || O.focus(), u.current = !1), d === "custom" && C.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && D(!1);
  };
  return /* @__PURE__ */ p(ir, { open: w, onOpenChange: D, children: [
    /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(cr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: ss(t, n, e) }) }) }),
      /* @__PURE__ */ o(_t, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      lr,
      {
        style: { zIndex: ve },
        onEscapeKeyDown: () => {
          A.current = t, N.current = e, f(t), x(e);
        },
        onCloseAutoFocus: (C) => {
          s.current && (s.current = !1, C.preventDefault(), dn(a));
        },
        onClick: () => {
          u.current && (u.current = !1);
        },
        onKeyDown: $,
        onMouseMove: () => {
          var C;
          u.current && ((C = i.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ o(ur, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(dr, {}),
          /* @__PURE__ */ o(
            Wt,
            {
              checked: d === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: ze })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Wt,
            {
              checked: d === "hidden",
              onCheckedChange: () => f("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: He })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Wt,
            {
              ref: c,
              checked: d === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                _.current = d === "custom";
              },
              onClick: (C) => {
                var R;
                if (C.stopPropagation(), _.current && C.target !== i.current) {
                  D(!1);
                  return;
                }
                u.current = !0, (R = i.current) == null || R.focus();
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  cn,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), f("custom"), u.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: y,
                    onKeyDown: (C) => {
                      C.key === "Enter" || C.key === "ArrowUp" || C.key === "ArrowDown" || C.key === "ArrowLeft" || C.key === "ArrowRight" || C.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (C) => x(C.target.value)
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
const cs = (t, e) => t === "f" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(Xe, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(Ze, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(We, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), ls = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Bo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function us({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = k(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ p(ir, { children: [
    /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(cr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: cs(t, r) }) }) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: ls(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(
      lr,
      {
        style: { zIndex: ve },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), dn(a));
        },
        children: [
          /* @__PURE__ */ o(ur, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(dr, {}),
          /* @__PURE__ */ p(
            Wt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(We, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            Wt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Xe, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            Wt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ze, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Kr = '[aria-controls="editor-context-menu"]';
function ds(t) {
  return t ? t.matches(Kr) ? !0 : !!t.querySelector(Kr) : !1;
}
const yc = Object.freeze([
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
function fs({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? qn, { className: e, size: 16 });
}
function ws({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(Ne, { size: 16 })
    }
  );
}
function he(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function $r({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    ye,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      value: he(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(ws, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(fs, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(aa, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ps({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = B(""), [c] = B(() => {
    const f = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
    return f ? he(f) : void 0;
  }), [u, d] = ft(() => {
    const f = kt(s.trim().toLowerCase());
    if (!f) {
      const w = e.filter((v) => !v.isDisallowed);
      return [w.length > 0 ? w : e, []];
    }
    const y = e.filter((w) => {
      var _;
      const v = (_ = w.marker) == null ? void 0 : _.toLowerCase();
      return w.isDisallowed ? v === f : v == null ? void 0 : v.includes(f);
    }), x = e.filter(
      (w) => w.title.toLowerCase().includes(f) && !y.includes(w)
    );
    return [y, x];
  }, [s, e]);
  return /* @__PURE__ */ p(Qe, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: c, children: [
    /* @__PURE__ */ o(
      tr,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (f) => i(f),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ p(er, { children: [
      /* @__PURE__ */ o(rr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ge, { children: u.map((f) => /* @__PURE__ */ o(
        $r,
        {
          item: f,
          localizedStrings: t
        },
        he(f)
      )) }),
      d.length > 0 && /* @__PURE__ */ p(xt, { children: [
        u.length > 0 && /* @__PURE__ */ o(Fe, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ge, { children: d.map((f) => /* @__PURE__ */ o(
          $r,
          {
            item: f,
            localizedStrings: t
          },
          he(f)
        )) })
      ] })
    ] })
  ] });
}
function ms(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = fe[n], i = s != null && s.children ? s : a && fe[a];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, u]) => {
    c.push(
      ...u.map((d) => ({
        marker: d,
        title: r[fe[d].description] ?? fe[d].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(d), e();
        }
      }))
    );
  }), c.sort((u, d) => (u.marker ?? u.title).localeCompare(d.marker ?? d.title));
}
function qr(t) {
  if (!t || !Vt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function hs(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function gs(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function bs(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function Ns(t, e) {
  let r = 0, n = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const i = t[r];
      return n !== 0 || !i || !Bt(i, a) ? !1 : (r += 1, !0);
    }
    let s = a.insert;
    for (; s.length > 0; ) {
      const i = t[r];
      if (!i || typeof i.insert != "string" || !Bt(i.attributes, a.attributes))
        return !1;
      const c = i.insert.slice(n), u = Math.min(c.length, s.length);
      if (c.slice(0, u) !== s.slice(0, u)) return !1;
      s = s.slice(u), n += u, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function vs(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ys(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const xs = 300, Be = "*", Ss = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function xc({
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
  inline: f = !1,
  ref: y,
  initialCaretPosition: x,
  markerPalette: w,
  onNoteEdit: v,
  hasBuiltInContextMenu: _ = !0,
  isHostContextMenuClaimingKeys: A
}) {
  var Or;
  const N = k(null), D = k(null), $ = k(null), C = k(s);
  H(() => {
    C.current = s;
  }, [s]);
  const R = k(x);
  H(() => {
    R.current = x;
  }, [x]);
  const F = I(() => {
    var m, b;
    const l = R.current;
    l !== void 0 && l !== "end" ? (m = N.current) == null || m.selectNoteTextOffset(0, l.utf16Offset, {
      field: l.field,
      glyph: l.glyph
    }) : (b = N.current) == null || b.selectNote(0);
  }, []);
  de(() => {
    if (f || !$.current) return;
    const l = parseFloat(getComputedStyle($.current).width);
    l > 0 && ($.current.style.width = `${l}px`);
  }, [f]);
  const [q, O] = B("generated"), [V, pt] = B("generated"), [lt, Tt] = B(Be), [at, zt] = B(Be), [gt, Ht] = B("f"), [K, st] = B(!1), [Y, et] = B(!0), [Dt, Ut] = B(!1), g = k(!1), M = k(""), J = k(!1), Q = k(void 0), U = k([]), W = k([]), Ft = k(void 0), ne = k(void 0), hr = I(() => {
    var m;
    const l = (m = N.current) == null ? void 0 : m.takeOpsAfterNote(0);
    l != null && l.length && (U.current = [...U.current, ...l], Ft.current = void 0);
  }, []), gr = I(
    (l, m) => {
      var T, E;
      if (!l) return;
      const b = qr(l), S = qr(m);
      if (!b && S) {
        Ft.current = {
          text: U.current,
          closedNoteOp: l,
          openNoteOp: m
        }, U.current = [];
        return;
      }
      const L = Ft.current;
      L && (b && !S && Bt(l, L.openNoteOp) && Bt(m, L.closedNoteOp) && !((E = (T = N.current) == null ? void 0 : T.getOpsAfterNote(0)) != null && E.length) ? (U.current = L.text, Ft.current = void 0) : Bt(m, L.openNoteOp) || (Ft.current = void 0));
    },
    []
  ), [St, oe] = B(!1), Ee = es(), [br, En] = B(), Nr = k(null), bt = k(
    void 0
  ), In = k(0), vr = k(w);
  H(() => {
    vr.current = w;
  }, [w]), H(
    () => () => {
      var l;
      bt.current && (bt.current = void 0, (l = vr.current) == null || l.dismiss());
    },
    []
  );
  const Zt = k(void 0), Ie = k(void 0), ae = I(
    () => Ua(
      Ie.current,
      yn(
        () => {
          var l;
          return (l = N.current) == null ? void 0 : l.getUsj();
        },
        () => {
          var l;
          return (l = N.current) == null ? void 0 : l.getSelection();
        }
      )
    ),
    []
  ), { setSession: yr, clearSessionIfCurrent: se } = Va({
    sessionRef: bt,
    editorRef: N,
    baselineRef: Ie
  }), Kt = I(() => {
    var m, b, S, L;
    if ((m = N.current) != null && m.getSelection() || (b = N.current) != null && b.getSelectedParaMarker()) return;
    const l = Zt.current;
    l ? (S = N.current) == null || S.setSelection(l) : (L = N.current) == null || L.selectNote(0);
  }, []), ie = I(() => {
    var l;
    Kt(), (l = N.current) == null || l.focus();
  }, [Kt]), Lt = ft(
    () => ({
      ...i,
      // Drop any context-menu extras the host's editor options carry (for example Insert footnote
      // or Insert comment items). Their onSelect closures are bound to the host's own editor, so
      // surfacing them inside this editor would let a right-click here silently change the host's
      // document. While the built-in menu is shown it keeps only its Cut/Copy/Paste items.
      contextMenu: void 0,
      hasBuiltInContextMenu: _,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...i.view ?? Oo(),
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
    [i, c, _]
  ), xr = !!Lt.isReadonly, Sr = k(_), ce = k(A);
  H(() => {
    Sr.current = _, ce.current = A;
  }, [_, A]);
  const _e = I(
    () => Sr.current && ds(D.current),
    []
  ), Te = I(
    () => {
      var l;
      return !!((l = ce.current) != null && l.call(ce));
    },
    []
  ), Le = ft(
    () => ms(
      N,
      () => oe(!1),
      u,
      br,
      gt
    ),
    [u, br, gt]
  );
  H(() => {
    var l;
    St || (l = N.current) == null || l.focus();
  }, [gt, St]);
  const Ot = I(() => {
    var S, L, T;
    const l = (S = D.current) == null ? void 0 : S.querySelector(".editor-input"), m = l == null ? void 0 : l.querySelector("span.note"), b = (T = (L = D.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : T.anchorNode;
    return !!m && !!b && m.contains(b);
  }, []), Rt = I(
    (l = !1) => {
      var b, S, L, T, E;
      v == null || v();
      const m = (S = (b = N.current) == null ? void 0 : b.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (m && Vt("note", m) && (r == null || r([m]), l && d && C.current)) {
        const G = [
          ...U.current,
          ...((L = N.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], P = W.current, mt = !Bt(G, P);
        if (f && !mt && Bt(m, Q.current))
          return;
        Q.current = m;
        const X = [m];
        mt && (P.length > 0 && Ns(
          ((T = d.current) == null ? void 0 : T.getOpsAfterNote(C.current)) ?? [],
          P
        ) && X.push({ delete: bs(P) }), X.push(...G), W.current = G), (E = d.current) == null || E.replaceEmbedUpdate(C.current, X);
      }
    },
    [f, r, v, d]
  ), Ae = I(
    (l) => {
      var b, S, L;
      const m = (b = N.current) == null ? void 0 : b.getSelection();
      (S = N.current) == null || S.applyUpdate([l, { delete: 1 }]), m && ((L = N.current) == null || L.setSelection(m)), ie();
    },
    [ie]
  ), kr = I(
    (l, m) => {
      var L, T, E;
      bt.current || (L = N.current) == null || L.commitPendingMarkerEdits();
      const b = (E = (T = N.current) == null ? void 0 : T.getNoteOps(0)) == null ? void 0 : E.at(0);
      if (!b || !Vt("note", b) || !b.insert.note) return;
      let S;
      l === "custom" ? S = m : l === "generated" ? S = ze : S = He, b.insert.note.caller !== S && (b.insert.note.caller = S, Ae(b));
    },
    [Ae]
  ), $t = k(void 0), Oe = k(Rt);
  H(() => {
    Oe.current = Rt;
  }, [Rt]);
  const qt = I(() => {
    $t.current !== void 0 && (clearTimeout($t.current), $t.current = void 0);
  }, []), Nt = I(() => {
    $t.current !== void 0 && (qt(), Oe.current(!0));
  }, [qt]), Cr = I(() => {
    qt(), $t.current = setTimeout(() => {
      $t.current = void 0, Oe.current(!0);
    }, xs);
  }, [qt]);
  H(() => {
    var L, T;
    let l, m, b;
    g.current = !1, J.current = !1, Zt.current = void 0, et(!0);
    const S = e == null ? void 0 : e.at(0);
    if (Q.current = S, U.current = [], W.current = [], Ft.current = void 0, ne.current = void 0, S && Vt("note", S)) {
      const E = (L = S.insert.note) == null ? void 0 : L.caller;
      let G = "custom";
      E === ze ? G = "generated" : E === He && (G = "hidden");
      const P = G === "custom" && E !== void 0 ? E : Be;
      Tt(P), zt(P), O(G), pt(G), Ht(((T = S.insert.note) == null ? void 0 : T.style) ?? "f"), l = setTimeout(() => {
        var X, it, ut, vt;
        const mt = (it = (X = N.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : it.at(0);
        (ut = N.current) == null || ut.applyUpdate(mt ? [S, { delete: 1 }] : [S]), F(), (vt = N.current) == null || vt.focus(), m = requestAnimationFrame(() => {
          b = setTimeout(() => {
            var yt;
            Ot() || (F(), (yt = N.current) == null || yt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      Nt(), R.current = void 0, l && clearTimeout(l), m !== void 0 && cancelAnimationFrame(m), b !== void 0 && clearTimeout(b);
    };
  }, [e, Nt, Ot, F]), de(() => () => Nt(), [Nt]);
  const Er = I(() => {
    var l;
    J.current && (bt.current || (l = N.current) == null || l.commitPendingMarkerEdits(), Nt());
  }, [Nt]), le = I(() => {
    const l = N.current;
    if (!l) return;
    const m = Zt.current;
    return m && !l.getSelection() && !l.getSelectedParaMarker() && l.setSelection(m), l;
  }, []), Yt = I(
    (l) => {
      var S;
      const m = le();
      if (!m) return;
      const b = (S = D.current) == null ? void 0 : S.ownerDocument;
      as(m, !xr, (b == null ? void 0 : b.defaultView) ?? window), l === "copy" ? os(() => m.copy(), b) : m[l]();
    },
    [xr, le]
  );
  Hn(
    y,
    () => ({
      flushPendingEdits: Er,
      focus: () => {
        var l;
        (l = le()) == null || l.focus();
      },
      containsFocus: () => {
        const l = $.current;
        return !!l && l.contains(l.ownerDocument.activeElement);
      },
      cut: () => Yt("cut"),
      copy: () => Yt("copy"),
      paste: () => Yt("paste"),
      pastePlainText: () => Yt("pastePlainText")
    }),
    [Er, le, Yt]
  );
  const Me = I(() => {
    var l, m;
    if (!bt.current) {
      const b = (l = D.current) == null ? void 0 : l.querySelector(".editor-input");
      b != null && b.contains(b.ownerDocument.activeElement) && b.blur(), (m = N.current) == null || m.commitPendingMarkerEdits();
    }
    f ? Nt() : (qt(), Rt(!0)), n();
  }, [qt, Nt, f, n, Rt]), Pe = k(Me);
  de(() => {
    Pe.current = Me;
  });
  const De = k({ book: a.book, chapterNum: a.chapterNum });
  de(() => {
    (De.current.book !== a.book || De.current.chapterNum !== a.chapterNum) && (De.current = { book: a.book, chapterNum: a.chapterNum }, Pe.current());
  }, [a.book, a.chapterNum]);
  const _n = () => {
    var T;
    const l = N.current, m = hs(l == null ? void 0 : l.getUsj());
    if (!l || !m) return;
    const b = ((T = D.current) == null ? void 0 : T.ownerDocument) ?? document, { activeElement: S } = b, L = l.getSelection() ?? Zt.current;
    l.setSelection(m);
    try {
      l.copy();
    } finally {
      L ? l.setSelection(L) : l.selectNote(0), l.getSelection(), b.activeElement !== S && (S instanceof HTMLElement && S !== b.body ? S.focus({ preventScroll: !0 }) : b.activeElement instanceof HTMLElement && b.activeElement.blur());
    }
  }, Tn = I(
    (l, m) => {
      v == null || v(), O(l), Tt(m), kr(l, m), f && Nt();
    },
    [kr, Nt, f, v]
  ), Ln = (l) => {
    var b, S, L, T, E;
    Ht(l), bt.current || (b = N.current) == null || b.commitPendingMarkerEdits();
    const m = (L = (S = N.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (m && Vt("note", m)) {
      m.insert.note && (m.insert.note.style = l);
      const G = (E = (T = m.insert.note) == null ? void 0 : T.contents) == null ? void 0 : E.ops;
      gt !== "x" && l === "x" ? G == null || G.forEach((P) => vs(P)) : gt === "x" && l !== "x" && (G == null || G.forEach((P) => ys(P))), Ae(m), f && Nt();
    }
  }, An = (l) => {
    En(l.contextMarker), Ut(l.canRedo);
  }, On = I(
    (l) => {
      var b, S, L, T, E, G, P;
      const m = (S = (b = N.current) == null ? void 0 : b.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (m && Vt("note", m)) {
        l.content.length > 1 && setTimeout(() => {
          var it;
          (it = N.current) == null || it.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (L = m.insert.note) == null ? void 0 : L.style, X = (E = (T = m.insert.note) == null ? void 0 : T.contents) == null ? void 0 : E.ops;
        if (mt || st(!1), st(
          mt === "x" ? !!(X != null && X.every((it) => {
            var vt, yt;
            if (!((vt = it.attributes) != null && vt.char)) return !0;
            const ut = ((yt = it.attributes) == null ? void 0 : yt.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(X != null && X.every((it) => {
            var vt, yt;
            if (!((vt = it.attributes) != null && vt.char)) return !0;
            const ut = ((yt = it.attributes) == null ? void 0 : yt.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !g.current) {
          g.current = !0, M.current = JSON.stringify(m), ne.current = m, et(!0);
          return;
        }
        J.current = !0, gr(ne.current, m), ne.current = m, (P = (G = N.current) == null ? void 0 : G.getOpsAfterNote(0)) != null && P.length && setTimeout(hr, 0), et(JSON.stringify(m) === M.current), Rt(), f && Cr();
      } else
        st(!1), et(!0);
    },
    [
      f,
      Rt,
      Cr,
      gr,
      hr
    ]
  ), Ir = I(() => {
    const l = window.getSelection();
    if (!Le.length || !l || l.rangeCount === 0)
      return;
    const m = D.current;
    if (!m) return;
    const b = l.getRangeAt(0).cloneRange();
    Ee.setSource({
      measure: () => {
        const S = rs(b);
        return S && ns(S);
      },
      contextElement: m
    }), oe(!0);
  }, [Le, Ee]), Re = k(() => {
  }), _r = I(
    (l, m, b) => {
      const { anchorRect: S } = l;
      if (!w || !S) return;
      const { hasTextSelection: L } = b;
      Fa({
        items: m,
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
        isNoteMarker: (T) => Pa(Lt.styleInfo ?? Pr, T),
        sessionCounterRef: In,
        setSession: yr,
        clearSessionIfCurrent: se,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (T) => Re.current(T),
        show: (T) => w.show({
          items: m.map(gs),
          anchor: S,
          keyForwarding: T
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ae,
        focusEditor: () => {
          var T;
          return (T = N.current) == null ? void 0 : T.focus();
        },
        applyItem: (T) => {
          var E;
          return (E = N.current) == null ? void 0 : E.applyMarkerMenuSelection(T, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (T) => {
          (!jo(T) || T.code !== Go) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${zo(T)}`
          );
        }
      });
    },
    [
      w,
      Kt,
      ae,
      Lt.styleInfo,
      yr,
      se
    ]
  ), ue = I(() => {
    var b;
    const l = (b = N.current) == null ? void 0 : b.getMarkerMenuContext();
    if (!l) return !1;
    const m = Mo(Lt.styleInfo ?? Pr, l);
    return m.length === 0 ? !1 : (_r(l, m, { hasTextSelection: !!l.hasTextSelection }), !0);
  }, [_r, Lt.styleInfo]);
  $a({
    isSessionOpen: I(() => !!bt.current, []),
    dismiss: I(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const Tr = I(
    (l) => {
      if (!w) return;
      Ka(l, {
        sessionRef: bt,
        editorRef: N,
        palette: w,
        restoreCaret: Kt,
        reopenAtCaret: ue,
        clearSessionIfCurrent: se,
        hasEditorChangedSinceFocus: ae
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      ue,
      Kt,
      se,
      ae
    ]
  );
  H(() => {
    Re.current = Tr;
  }, [Tr]), qa({
    containerRef: D,
    editorRef: N,
    selectionRef: Zt,
    baselineRef: Ie,
    isSessionOpen: I(() => !!bt.current, [])
  }), H(() => {
    const l = () => {
      St && oe(!1);
    };
    return window.addEventListener("click", l), window.addEventListener("blur", l), () => {
      window.removeEventListener("click", l), window.removeEventListener("blur", l);
    };
  }, [St]), H(() => {
    var l;
    St && ((l = Nr.current) == null || l.focus());
  }, [St]), H(() => {
    var T;
    const l = () => {
      var E;
      return ((E = D.current) == null ? void 0 : E.querySelector(".editor-input")) ?? void 0;
    };
    if (((T = Lt.view) == null ? void 0 : T.markerMode) === "editable") {
      const E = (P) => {
        var it, ut, vt, yt;
        if (me(P)) return;
        const mt = bt.current, X = l();
        if (!(!X || document.activeElement !== X)) {
          if (mt && w) {
            Re.current(P);
            return;
          }
          if (Te()) {
            (P.key === c || P.key === "Enter") && (P.preventDefault(), P.stopPropagation());
            return;
          }
          if (_e()) {
            P.key === c && (P.preventDefault(), P.stopPropagation());
            return;
          }
          if (P.key === "Enter" && !Ot()) {
            P.preventDefault(), P.stopPropagation(), (it = N.current) == null || it.selectNote(0), (ut = N.current) == null || ut.focus();
            return;
          }
          if (w && P.key === c) {
            if (!Ot()) {
              P.preventDefault(), P.stopPropagation(), (vt = N.current) == null || vt.selectNote(0), (yt = N.current) == null || yt.focus();
              return;
            }
            ue() && (P.preventDefault(), P.stopPropagation());
          }
        }
      }, G = () => {
        var mt, X;
        const P = l();
        !P || document.activeElement !== P || Ot() || ((mt = N.current) == null || mt.selectNote(0), (X = N.current) == null || X.focus());
      };
      return document.addEventListener("keydown", E, { capture: !0 }), document.addEventListener("paste", G, { capture: !0 }), () => {
        document.removeEventListener("keydown", E, { capture: !0 }), document.removeEventListener("paste", G, { capture: !0 });
      };
    }
    const m = () => {
      const E = l();
      return !E || document.activeElement !== E ? !1 : !_e();
    }, b = (E) => {
      E.key !== "Enter" || me(E) || m() && (E.preventDefault(), E.stopPropagation());
    }, S = (E) => {
      E.inputType !== "insertParagraph" && E.inputType !== "insertLineBreak" || m() && (E.preventDefault(), E.stopPropagation());
    }, L = (E) => {
      const G = l();
      if (Te()) {
        E.key === c && E.preventDefault();
        return;
      }
      !St && G && document.activeElement === G && E.key === c ? (E.preventDefault(), Ir()) : St && E.key === "Escape" && (E.preventDefault(), oe(!1));
    };
    return document.addEventListener("keydown", L), document.addEventListener("keydown", b, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), () => {
      document.removeEventListener("keydown", L), document.removeEventListener("keydown", b, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    St,
    Ir,
    c,
    (Or = Lt.view) == null ? void 0 : Or.markerMode,
    Lt.styleInfo,
    w,
    ue,
    Ot,
    _e,
    Te
  ]), H(() => {
    const l = $.current;
    if (!f || !l) return;
    const m = (b) => {
      b.key !== "Escape" || b.defaultPrevented || me(b) || (b.preventDefault(), b.stopPropagation(), Pe.current());
    };
    return l.addEventListener("keydown", m), () => l.removeEventListener("keydown", m);
  }, [f]), H(() => {
    const l = () => {
      var S, L, T;
      const m = ((S = D.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!m || document.activeElement !== m || !document.hasFocus()) return;
      const b = document.getSelection();
      b && !b.isCollapsed || Ot() || ((L = N.current) == null || L.selectNote(0), (T = N.current) == null || T.focus());
    };
    return document.addEventListener("pointerup", l), document.addEventListener("selectionchange", l), () => {
      document.removeEventListener("pointerup", l), document.removeEventListener("selectionchange", l);
    };
  }, [Ot]);
  const Lr = u["%footnoteEditor_copyButton_tooltip%"], Ar = /* @__PURE__ */ o(
    Qa,
    {
      onUndoClick: () => {
        var l;
        return (l = N.current) == null ? void 0 : l.undo();
      },
      onRedoClick: () => {
        var l;
        return (l = N.current) == null ? void 0 : l.redo();
      },
      canUndo: !Y,
      canRedo: Dt,
      localizedStrings: u
    }
  );
  return /* @__PURE__ */ p(xt, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: $,
        className: h("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ p("div", { className: h("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                us,
                {
                  isTypeSwitchable: K,
                  noteType: gt,
                  handleNoteTypeChange: Ln,
                  localizedStrings: u,
                  focusNoteText: ie
                }
              ),
              /* @__PURE__ */ o(
                is,
                {
                  callerType: q,
                  customCaller: lt,
                  updateCaller: Tn,
                  localizedStrings: u,
                  focusNoteText: ie
                }
              ),
              f && Ar
            ] }),
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ p(or, { children: [
              Ar,
              /* @__PURE__ */ o(
                Ca,
                {
                  onCancelClick: n,
                  onAcceptClick: Me,
                  canAccept: !Y || V !== q || q === "custom" && lt !== at,
                  localizedStrings: u,
                  acceptLabel: u["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ p(
            "div",
            {
              ref: D,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  ts,
                  {
                    editorRef: N,
                    canUndo: !Y,
                    canRedo: Dt,
                    children: /* @__PURE__ */ o(
                      Po,
                      {
                        options: Lt,
                        onStateChange: An,
                        onUsjChange: On,
                        defaultUsj: Ss,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: N
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
                  /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
                    Z,
                    {
                      "aria-label": Lr,
                      onClick: _n,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Vn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: Lr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ p(ar, { open: St, children: [
      /* @__PURE__ */ o(Na, { virtualRef: Ee.virtualRef }),
      /* @__PURE__ */ o(
        sr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (l) => {
            l.preventDefault(), l.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            ps,
            {
              markerMenuItems: Le,
              localizedStrings: u,
              searchRef: Nr
            }
          )
        }
      )
    ] })
  ] });
}
const ks = {
  "refresh-cw": Co,
  download: ko,
  house: So,
  "book-a": xo,
  settings: yo,
  "circle-question-mark": vo,
  "external-link": No,
  users: bo,
  "book-copy": go,
  pencil: ho,
  eye: mo,
  "zoom-in": po,
  "zoom-out": wo,
  scan: fo,
  "file-text": uo,
  "panel-bottom": lo,
  "message-square-plus": co,
  "square-function": Xe,
  "square-x": We,
  "square-sigma": Ze,
  book: io,
  "book-marked": so,
  "book-open": ao,
  library: oo,
  search: tn,
  "message-square": no,
  "circle-check-big": ro,
  "clipboard-check": eo,
  "clipboard-copy": to,
  "clipboard-paste": Qn,
  "clipboard-type": Yn,
  scissors: Zn,
  sparkles: Xn,
  "undo-2": Wn,
  "redo-2": Jn
}, fr = ks, Sc = Object.keys(fr);
function wr(t) {
  return t !== void 0 && Object.hasOwn(fr, t);
}
function Cs(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Es(t, e) {
  return Object.entries(t).filter(([r, n]) => Sn(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function xn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function Sn(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function kc(t) {
  const e = new Set(t.items.map((n) => n.group)), r = Object.entries(t.groups).filter(
    ([n]) => e.has(n)
  );
  return xn(t.columns).filter(
    ({ columnKey: n }) => r.some(
      ([a, s]) => Sn(a, s, n)
    )
  ).map(({ columnKey: n, column: a }) => ({
    columnKey: n,
    label: a.label,
    isHeaderHidden: a.isHeaderHidden ?? !1
  }));
}
function Cc(t) {
  return t.some(
    (e) => wr(e.iconNameBefore) || e.iconPathBefore || e.checked !== void 0
  ) ? "icon" : "none";
}
function Ec(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: n, items: a }) => {
    if (a.length === 0) return [];
    const s = r ? [e(n)] : [];
    return r = !0, [...s, ...a];
  });
}
function kn(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((n) => n.group === r).sort((n, a) => n.order - a.order).map(
      (n) => "command" in n ? { item: n } : {
        item: n,
        subGroups: kn(
          t,
          Cs(t.groups, n.id)
        )
      }
    )
  }));
}
function Ic(t) {
  return t ? {
    columns: xn(t.columns).map((e) => ({
      ...e,
      groups: kn(t, Es(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function Is(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = ct(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Vr(t, e, r) {
  const n = ct(e);
  return t.some(
    (a) => ct(a.projectId) === n && a.scrollGroupId === r
  );
}
function je(t) {
  const e = Is(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : ct(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(ct(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((c) => c.scrollGroupId),
        isSelected: a !== void 0 && a === ct(s.id),
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
    const s = e.get(ct(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Vr(r, a.id, void 0),
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
        isSelected: Vr(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = ct(a.projectId);
    if (n.some(
      (c) => ct(c.projectId) === s && c.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((c) => ct(c.id) === s);
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
const pr = "Selected", mr = "Unselected";
function Jr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function jt(t, e) {
  const r = Ho(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function qe(t) {
  return [{ kind: "flat", rows: [...t].sort(jt) }];
}
function _s(t) {
  const e = t.filter(Jr).sort(jt), r = t.filter((a) => !Jr(a)).sort(jt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function Ts(t, e) {
  const r = t.filter((i) => i.isSelected).sort(jt), n = t.filter((i) => !i.isSelected).sort(jt), a = (i, c) => {
    var d;
    const u = (d = e.getSectionHeading) == null ? void 0 : d.call(
      e,
      i,
      c.map((f) => f.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? pr : mr;
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
function Ls(t, e) {
  if (e.id === "openTabs") return _s(t);
  if (e.id === "selection") return Ts(t, e);
  if (!e.getGroupKey) return qe(t);
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
      (x, w) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, w.project)) || jt(x, w);
      }
    ), f = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      c,
      d.map((x) => x.project)
    )) ?? c;
    return { key: c, heading: f, rows: d };
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
    rows: [...n].sort(jt)
  }), i;
}
const _c = [
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
function z(t, e) {
  const r = t[e];
  if (!(typeof r != "string" || !gn(r)))
    return r;
}
const we = "recent", As = "other";
function Cn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Os(t) {
  const e = t ?? {};
  return [
    Cn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Qt.lastUsedAt]) == "number" ? we : As;
      },
      getSectionHeading: (r) => r === we ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === we ? -1 : n.key === we ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Qt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Qt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (c) => {
            var u;
            return typeof ((u = c.customData) == null ? void 0 : u[Qt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Qt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Tc = Os();
function Ms(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? pr : e.unselectedSectionHeading ?? mr
  };
}
function Lc(t) {
  return {
    openTabsLabel: z(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: z(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: z(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: z(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: z(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: z(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: z(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: z(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function Ac(t) {
  return {
    label: z(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const Ps = 100, nt = {
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
  autoSelectionSelectedSectionHeading: pr,
  autoSelectionUnselectedSectionHeading: mr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Ds(t) {
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
function Oc(t) {
  return {
    searchPlaceholder: z(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: z(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: z(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: z(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: z(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: z(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: z(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: z(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: z(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: z(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: z(t, "%projectSelector_openButtonLabel%"),
    clearAll: z(t, "%projectSelector_clearAll%")
  };
}
function re(t) {
  return ua[Uo(t)] ?? String(t);
}
const Wr = "platform.footerAction", Rs = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Bs({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = re(t);
  return e ? /* @__PURE__ */ o(
    be,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Rs,
      children: r
    }
  ) : /* @__PURE__ */ o(be, { variant: "secondary", children: r });
}
function js({
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
    onPointerEnter: f,
    onPointerLeave: y
  } = Sa(), [x, w] = B(!1), v = Un(), _ = t.isDisabled && !!t.disabledReason, A = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || _, N = d || x, D = I(() => {
    if (A) {
      w(!0);
      return;
    }
    f();
  }, [A, f]), $ = I(() => {
    w(!1), y();
  }, [y]), C = /* @__PURE__ */ o(Ne, { className: h("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let R;
  e === "project" ? t.openGroups.length > 0 && (R = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((V) => /* @__PURE__ */ o(be, { variant: "secondary", children: re(V) }, V)) })) : t.scrollGroupId !== void 0 && (R = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Bs,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ p(
      Z,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (V) => {
          V.stopPropagation(), a(t);
        },
        onMouseDown: (V) => V.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(Io, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const F = /* @__PURE__ */ p(
    ye,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: D,
      onPointerLeave: $,
      ..._ && { "aria-describedby": v },
      className: h(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: C }),
        c && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Fo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        R,
        _ && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), q = t.scrollGroupId !== void 0 ? re(t.scrollGroupId) : void 0, O = t.isBoundButClosed && q ? r.boundButClosedTooltip.replace("{group}", q) : void 0;
  return /* @__PURE__ */ p(Et, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ o(It, { asChild: !0, children: F }),
    /* @__PURE__ */ p(
      _t,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: rn(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && q && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              q,
              ")"
            ] })
          ] }),
          O && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: O }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function Gs({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ p(ir, { children: [
    /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(cr, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
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
          children: /* @__PURE__ */ o(Eo, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(_t, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
      lr,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ve },
        children: [
          /* @__PURE__ */ o(ur, { children: n.groupSectionLabel }),
          /* @__PURE__ */ p(ka, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Gr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(dr, {}),
            t.map((s) => /* @__PURE__ */ o(Gr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function zs(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function Mc(t) {
  const [e, r] = B(!1), [n, a] = B(""), s = ft(() => Ds(t.localizedStrings), [t.localizedStrings]), i = ft(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(Cn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      Ms({
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
  ]), [c, u] = B(void 0), d = ft(
    () => zs(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = c ?? d, y = k(null), [x, w] = B(void 0), v = I((g) => {
    r(g), g || (a(""), w(void 0));
  }, []);
  H(() => {
    if (!e) return;
    const g = window.requestAnimationFrame(() => {
      const M = y.current;
      M && M.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(g);
  }, [e]);
  const _ = ft(() => t.mode === "project" ? je({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? je({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : je({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), A = ft(() => {
    const g = n.trim().toLowerCase();
    return g ? _.filter(
      (M) => M.shortName.toLowerCase().includes(g) || (M.fullName ?? "").toLowerCase().includes(g)
    ) : _;
  }, [_, n]), N = ft(
    () => new Map(t.projects.map((g) => [ct(g.id), g])),
    [t.projects]
  ), D = I(
    (g) => g === void 0 ? void 0 : N.get(ct(g)),
    [N]
  ), { renderProjectIndicator: $ } = t, C = I(
    (g) => $ ? $(g.project) : void 0,
    [$]
  ), R = !!$, F = !!t.footerAction && A.length === 0, q = ft(() => {
    if (f === Xt) return qe(A);
    const g = i.find((M) => M.id === f);
    return g ? Ls(A, g) : qe(A);
  }, [A, f, i]), O = (g) => {
    if (g.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
    }
  }, V = (g) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: g.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const M = t.selection.pairs, J = ct(g.projectId), Q = (W) => ct(W.projectId) === J && W.scrollGroupId === g.scrollGroupId, U = M.some(Q) ? M.filter((W) => !Q(W)) : [
          ...M.filter((W) => !Q(W)),
          { projectId: g.projectId, scrollGroupId: g.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: U });
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
        const M = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: g.projectId, scrollGroupId: M }), t.onOpenProjectInGroup(g.projectId, M), r(!1);
      }
    }
  }, pt = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, lt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, at = ft(() => {
    switch (t.mode) {
      case "project": {
        const g = D(t.selection.projectId);
        if (lt)
          return { node: lt(g), title: "", hasSelection: !!g };
        let M = g ? g.shortName : s.buttonPlaceholder;
        return g && Tt === "shortNameAndFullName" && (M = rn(g)), { node: M, title: M, hasSelection: !!g };
      }
      case "project-multi": {
        const { pairs: g } = t.selection;
        if (g.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const M = [];
        if (g.forEach((U) => {
          const W = D(U.projectId);
          W && M.push({ project: W, scrollGroupId: U.scrollGroupId });
        }), M.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const J = M.map(
          ({ project: U, scrollGroupId: W }) => W === void 0 ? U.shortName : `${U.shortName} (${re(W)})`
        ).join(", "), Q = M.length.toString();
        return {
          node: /* @__PURE__ */ p(xt, { children: [
            /* @__PURE__ */ o(be, { variant: "muted", className: "tw:shrink-0", children: Q }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: J })
          ] }),
          title: `${Q} ${J}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = D(t.selection.projectId);
        if (!g) {
          const Q = s.buttonPlaceholder;
          return { node: Q, title: Q, hasSelection: !1 };
        }
        const M = t.selection.scrollGroupId;
        if (M === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const J = re(M);
        return {
          node: `${g.shortName} · ${J}`,
          title: `${g.shortName} · ${J}`,
          accessibleTitle: `${g.shortName}, ${J}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    D,
    t.selection,
    lt,
    Tt,
    s.buttonPlaceholder
  ]), zt = k(null), [gt, Ht] = B(!1);
  H(() => {
    const g = zt.current;
    if (!g) return;
    const M = (Q) => {
      Ht(Q < Ps);
    };
    if (M(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const J = new ResizeObserver((Q) => {
      Q.forEach((U) => {
        const [W] = U.borderBoxSize;
        M(W ? W.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return J.observe(g, { box: "border-box" }), () => J.disconnect();
  }, []);
  let K;
  t.isLoading ? K = /* @__PURE__ */ o(_o, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : gt ? K = void 0 : t.mode === "project-multi" ? K = /* @__PURE__ */ o(Qr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : K = /* @__PURE__ */ o(To, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const st = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? O : void 0, Y = s.ariaLabel && at.hasSelection && at.title ? `${s.ariaLabel}: ${at.accessibleTitle ?? at.title}` : s.ariaLabel || void 0, et = /* @__PURE__ */ p(
    Z,
    {
      ref: zt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": Y,
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
        gt && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof at.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: at.node }) : at.node }),
        K
      ]
    }
  ), Dt = at.title ? /* @__PURE__ */ o(At, { delayDuration: 400, children: /* @__PURE__ */ p(Et, { children: [
    /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o($e, { asChild: !0, children: et }) }),
    /* @__PURE__ */ o(_t, { dir: "auto", children: at.title })
  ] }) }) : /* @__PURE__ */ o($e, { asChild: !0, children: et }), Ut = i.length > 1;
  return /* @__PURE__ */ p(ar, { open: e, onOpenChange: v, children: [
    Dt,
    /* @__PURE__ */ o(
      sr,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(At, { delayDuration: 400, children: /* @__PURE__ */ p(
          Qe,
          {
            shouldFilter: !1,
            value: F ? x ?? Wr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  tr,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Ut && /* @__PURE__ */ o(
                  Gs,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: pt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(er, { children: [
                /* @__PURE__ */ o(rr, { children: s.commandEmptyMessage }),
                q.map((g, M) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    Xr,
                    {
                      children: [
                        /* @__PURE__ */ o(ge, { heading: Hs(g, s), children: g.rows.map((J) => /* @__PURE__ */ o(
                          js,
                          {
                            row: J,
                            mode: t.mode,
                            strings: s,
                            onClick: V,
                            onOpen: st,
                            selectedRowRef: y,
                            indicator: C(J),
                            reserveIndicatorSlot: R
                          },
                          J.rowKey
                        )) }),
                        M < q.length - 1 && /* @__PURE__ */ o(Fe, { alwaysRender: !0 })
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
                /* @__PURE__ */ p("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  A.length > 0 && /* @__PURE__ */ o(
                    Fe,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    ye,
                    {
                      forceMount: !0,
                      value: Wr,
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
function Hs(t, e) {
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
const Us = Zr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, c) => {
    const u = ht();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: h("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            tn,
            {
              className: h(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            cn,
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
          t && /* @__PURE__ */ p(
            Z,
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
                /* @__PURE__ */ o(Yr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Us.displayName = "SearchBar";
const Fs = 5;
function Pc(t) {
  return la(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function Ks(t, e) {
  return t.filter((r) => {
    try {
      return Ko(r) === e;
    } catch {
      return !1;
    }
  });
}
const Dc = (t, e, r) => Ks(t, e).every((n) => r.includes(n));
function $s(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => da(n, e));
}
function Rc(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), s = new Set(e.map((c) => c.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((c) => a.has(c)))
    return r;
  const i = $s(t, n);
  if (i.length !== 0)
    return i.length <= Fs ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function qs({ name: t, className: e }) {
  const r = wr(t) ? fr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: h("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function Bc({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const s = n ? "tw:me-2" : "tw:ms-2";
  if (wr(e)) return /* @__PURE__ */ o(qs, { name: e, className: s });
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
function jc({ message: t, id: e, className: r }) {
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
function Vs({ className: t, ...e }) {
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
function Js({ className: t, ...e }) {
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
const Ws = Pt(
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
function Xs({
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
        Ws({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Gc({ className: t, ...e }) {
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
function Zs({ className: t, ...e }) {
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
function Ys({ className: t, ...e }) {
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
function zc({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(Vs, { className: h(s), role: a, children: [
    /* @__PURE__ */ p(Js, { children: [
      /* @__PURE__ */ o(Xs, { variant: "icon", children: n ?? /* @__PURE__ */ o(Lo, {}) }),
      /* @__PURE__ */ o(Zs, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Ys, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const Qs = Zr(({ className: t, ...e }, r) => /* @__PURE__ */ o(Ao, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
Qs.displayName = "Spinner";
const ti = Pt(
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
function Hc({
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
        ti({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Uc({ className: t, ...e }) {
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
function Fc({ className: t, ...e }) {
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
function Kc({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Ye.Group,
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
function pe(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function $c({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Ye.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: pe(t),
      minSize: pe(e),
      maxSize: pe(r),
      collapsedSize: pe(n),
      ...a
    }
  );
}
function qc({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ye.Separator,
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
  Wt as $,
  Bi as A,
  Z as B,
  ye as C,
  ir as D,
  or as E,
  mn as F,
  er as G,
  rr as H,
  oc as I,
  sc as J,
  yi as K,
  Gi as L,
  ki as M,
  Ci as N,
  Ti as O,
  Li as P,
  Ii as Q,
  ac as R,
  Ce as S,
  At as T,
  Ca as U,
  ic as V,
  be as W,
  ma as X,
  uc as Y,
  lc as Z,
  dr as _,
  da as a,
  Gc as a$,
  fa as a0,
  nn as a1,
  mc as a2,
  gc as a3,
  dc as a4,
  fc as a5,
  hc as a6,
  wc as a7,
  Yi as a8,
  ka as a9,
  Zi as aA,
  nc as aB,
  Ec as aC,
  Ui as aD,
  bn as aE,
  Se as aF,
  ke as aG,
  wn as aH,
  ra as aI,
  oa as aJ,
  Hr as aK,
  Hc as aL,
  Fc as aM,
  Uc as aN,
  $i as aO,
  Si as aP,
  _i as aQ,
  ea as aR,
  ta as aS,
  xi as aT,
  ts as aU,
  Vs as aV,
  Ys as aW,
  Zs as aX,
  Js as aY,
  Xs as aZ,
  jc as a_,
  Gr as aa,
  Nc as ab,
  yc as ac,
  vc as ad,
  cn as ae,
  Mc as af,
  Us as ag,
  Pc as ah,
  Ks as ai,
  Fe as aj,
  Di as ak,
  Dc as al,
  qi as am,
  dn as an,
  Ei as ao,
  ua as ap,
  Ic as aq,
  kc as ar,
  Cc as as,
  Ki as at,
  Fi as au,
  Bc as av,
  tc as aw,
  Ur as ax,
  rc as ay,
  ec as az,
  Et as b,
  Ka as b$,
  xc as b0,
  xs as b1,
  Ja as b2,
  ps as b3,
  Na as b4,
  Wi as b5,
  Vi as b6,
  Ji as b7,
  qc as b8,
  $c as b9,
  Oa as bA,
  es as bB,
  Mi as bC,
  Sc as bD,
  qs as bE,
  Xt as bF,
  nt as bG,
  _c as bH,
  Qo as bI,
  Lc as bJ,
  Oc as bK,
  Ac as bL,
  yn as bM,
  Ha as bN,
  Tc as bO,
  Da as bP,
  as as bQ,
  Ga as bR,
  za as bS,
  Ua as bT,
  ds as bU,
  Pa as bV,
  Os as bW,
  Ms as bX,
  gs as bY,
  vi as bZ,
  Ra as b_,
  Kc as ba,
  zc as bb,
  Qs as bc,
  bc as bd,
  pc as be,
  Xi as bf,
  Qa as bg,
  ve as bh,
  Ni as bi,
  bi as bj,
  Yo as bk,
  Zo as bl,
  hi as bm,
  mi as bn,
  gi as bo,
  pi as bp,
  _a as bq,
  ha as br,
  on as bs,
  Sn as bt,
  ln as bu,
  qr as bv,
  cc as bw,
  ns as bx,
  rs as by,
  un as bz,
  h as c,
  os as c0,
  Fa as c1,
  kt as c2,
  Rc as c3,
  $a as c4,
  qa as c5,
  Va as c6,
  It as d,
  _t as e,
  Hi as f,
  Ri as g,
  cr as h,
  lr as i,
  ur as j,
  Qi as k,
  Oi as l,
  ji as m,
  ge as n,
  ht as o,
  ca as p,
  Pi as q,
  rt as r,
  ar as s,
  zi as t,
  Sa as u,
  $e as v,
  sr as w,
  Ai as x,
  Qe as y,
  tr as z
};
//# sourceMappingURL=resizable-D5A0jWyo.js.map
