import { jsx as o, jsxs as p, Fragment as xt } from "react/jsx-runtime";
import { Slot as Ve, Dialog as Ct, Separator as Mn, Popover as te, Tooltip as Jt, DropdownMenu as tt, Label as Dn, RadioGroup as Ge } from "radix-ui";
import { IconX as On, IconCheck as Je, IconSearch as Rn, IconChevronLeft as jn, IconChevronRight as Bn } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import ft, { useRef as k, useEffect as H, useCallback as I, useState as j, createContext as Gn, useContext as zn, useMemo as wt, Fragment as Xr, useLayoutEffect as de, useImperativeHandle as Hn, useId as Un, forwardRef as Zr } from "react";
import { X as Yr, Check as Ne, ChevronsUpDown as Qr, Star as Fn, Undo as Kn, Redo as $n, SquareX as We, FunctionSquare as Xe, SquareSigma as Ze, Ban as qn, Copy as Vn, Redo2 as Jn, Undo2 as Wn, Sparkles as Xn, ClipboardCopy as Zn, ClipboardCheck as Yn, CircleCheckBig as Qn, MessageSquare as to, Search as tn, Library as eo, BookOpen as ro, BookMarked as no, Book as oo, MessageSquarePlus as ao, PanelBottom as so, FileText as io, Scan as co, ZoomOut as lo, ZoomIn as uo, Eye as wo, Pencil as fo, BookCopy as po, Users as mo, ExternalLink as ho, CircleQuestionMark as go, Settings as bo, BookA as No, House as vo, Download as yo, RefreshCw as xo, Group as So, ArrowRight as ko, Loader2 as Co, ChevronDown as Eo, AlertTriangle as Io, LoaderCircle as _o } from "lucide-react";
import { cva as Dt } from "class-variance-authority";
import { filterAndRankItems as Mr, GENERATOR_NOTE_CALLER as ze, HIDDEN_NOTE_CALLER as He, isInsertEmbedOpOfType as Vt, getDefaultViewOptions as To, getMarkerMenuItems as Lo, defaultStyleInfo as Dr, Editorial as Ao } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as Po, split as en, slice as Mo, formatReplacementString as Do, usfmMarkers as we, deepEqual as jt, isPlatformError as Oo, ABORTED as Ro, getErrorMessage as jo, normalizeProjectId as ct, compareProjectsByName as Bo, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Qt, formatProjectName as rn, getLocalizeKeyForScrollGroupId as Go, hasDistinctFullName as zo, getSectionForBook as Ho } from "platform-bible-utils";
import { Command as Gt } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Ye from "react-resizable-panels";
import { clsx as Uo } from "clsx";
import { extendTailwindMerge as Fo, twMerge as Ko } from "tailwind-merge";
const $o = Fo({ prefix: "tw" });
function Ue(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function qo(t) {
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
function Vo(t, e) {
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
function m(...t) {
  const e = Uo(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return $o(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((u) => {
    const d = qo(u);
    n.set(d.normalized, d.original), a.push(d.normalized);
  }), Ko(a.join(" ")).split(" ").filter(Boolean).map((u) => {
    const d = n.get(u);
    return d ? Vo(u, d) : u;
  }).join(" ");
}
const nn = 600, ve = 650, li = 400, Jo = 450, Wo = 500, ui = 510, di = 520, Xo = 675, wi = 690, fi = 700, pi = 800, on = Dt(
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
      className: m(on({ variant: e, size: r, className: t })),
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
function mi(t) {
  var e;
  try {
    (e = sn()) == null || e.setItem(an, t);
  } catch {
  }
}
function hi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Root, { "data-slot": "dialog", ...t });
}
function gi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Zo({ ...t }) {
  return /* @__PURE__ */ o(Ct.Portal, { "data-slot": "dialog-portal", ...t });
}
function bi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Close, { "data-slot": "dialog-close", ...t });
}
function Yo({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ct.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: m(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Jo, ...e },
      ...r
    }
  );
}
function Ni({
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
  return /* @__PURE__ */ p(Zo, { children: [
    /* @__PURE__ */ o(Yo, { className: n, style: a }),
    /* @__PURE__ */ p(
      Ct.Content,
      {
        "data-slot": "dialog-content",
        className: m(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Wo, ...s },
        dir: c,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(Ct.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(On, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function vi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "dialog-header",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function yi({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dialog-footer",
      className: m(
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
function xi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ct.Title,
    {
      "data-slot": "dialog-title",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function Si({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ct.Description,
    {
      "data-slot": "dialog-description",
      className: m(
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
      className: m(
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
function Qo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const ta = Dt(
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
function ea({
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
        className: m(ta({ align: e }), t),
        onClick: (n) => {
          var a, s;
          n.target instanceof HTMLElement && n.target.closest("button") || (s = (a = n.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
        },
        ...r
      }
    )
  );
}
Dt("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
      className: m(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ p(Qo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Gt.Input,
        {
          "data-slot": "command-input",
          className: m(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...n
        }
      ),
      /* @__PURE__ */ o(ea, { children: /* @__PURE__ */ o(Rn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function er({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gt.List,
    {
      "data-slot": "command-list",
      className: m(
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
      className: m(
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
      className: m(
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
      className: m(
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
      className: m(
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
function ra({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "command-shortcut",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const na = [
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
], oa = (t) => {
  var e;
  return ((e = na[t]) == null ? void 0 : e.chapters) ?? -1;
}, aa = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function sa(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function B(t) {
  return `%scrollGroup_${t}%`;
}
const ia = {
  [B("undefined")]: "Ø",
  [B(0)]: "A",
  [B(1)]: "B",
  [B(2)]: "C",
  [B(3)]: "D",
  [B(4)]: "E",
  [B(5)]: "F",
  [B(6)]: "G",
  [B(7)]: "H",
  [B(8)]: "I",
  [B(9)]: "J",
  [B(10)]: "K",
  [B(11)]: "L",
  [B(12)]: "M",
  [B(13)]: "N",
  [B(14)]: "O",
  [B(15)]: "P",
  [B(16)]: "Q",
  [B(17)]: "R",
  [B(18)]: "S",
  [B(19)]: "T",
  [B(20)]: "U",
  [B(21)]: "V",
  [B(22)]: "W",
  [B(23)]: "X",
  [B(24)]: "Y",
  [B(25)]: "Z"
};
function nr(t, e) {
  return oa(ot.bookIdToNumber(t));
}
function xe(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = ot.bookIdToNumber(i);
    (r === "next" ? c > n && c < s : c < n && c > s) && (a = i, s = c);
  }), a;
}
function ki(t, e, r) {
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
function Ci(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < nr(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = xe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ei(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = xe(n, e, "previous");
  if (!i) return;
  const c = Math.max(nr(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function Ii(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = xe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function _i(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Ti = (t, e, r, n, a) => {
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
}, Li = (t, e, r, n, a) => {
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
function Ai(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function ca(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Pi = Object.fromEntries(
  aa.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function Mi(t, e, r) {
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
function Or(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Rr(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function la(t, e) {
  const [r] = j(ln), n = k(t);
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
const wn = Symbol.for("platform-bible-react.window-blur-press");
function ua(t) {
  return Reflect.get(t, wn) === !0;
}
function fn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = k(void 0), n = k(void 0), a = k(void 0);
  H(() => {
    const d = () => {
      const w = r.current;
      if (!w || w.dataset.state === "closed") return;
      const y = w.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, f = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(f, wn, { value: !0 }), y.dispatchEvent(f);
    };
    return window.addEventListener("blur", d), () => window.removeEventListener("blur", d);
  }, []);
  const s = I(
    (d) => {
      if (r.current = d ?? void 0, d && d !== n.current && (n.current = d, a.current = Or(d) ?? Rr(d)), typeof t == "function") {
        const w = t(d);
        if (typeof w == "function")
          return () => {
            r.current = void 0, w();
          };
      } else t && (t.current = d);
    },
    [t]
  ), i = I(() => {
    var x;
    const d = n.current, w = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (d && Or(d)) ?? w ?? (d && Rr(d));
    return y != null && y.isConnected ? y : void 0;
  }, []), c = la(
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
const jr = `
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
function da(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function ee(t, e) {
  const r = e ? `${jr}, ${e}` : jr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && da(n)
  );
}
const Di = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Ke = "keyboard", Br = !1;
function Oi() {
  Br || typeof document > "u" || (Br = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      ua(t) || (Ke = "pointer");
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
function Ri() {
  return Ke;
}
const pn = "data-quiet-focus";
function ji(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(pn, ""), t.style.outline = "none"));
}
function Bi(t) {
  t && (t.removeAttribute(pn), t.style.removeProperty("outline"));
}
const Gi = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function wa({
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
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...n
    }
  );
}
const fa = Dt(
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
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        fa({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function zi({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ve.Root : "div";
  return /* @__PURE__ */ o(
    n,
    {
      className: m(
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
    wa,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function hn() {
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
function ar({ ...t }) {
  return /* @__PURE__ */ o(te.Root, { "data-slot": "popover", ...t });
}
function $e({ ...t }) {
  return /* @__PURE__ */ o(te.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: pa, usePortalContainer: ma } = hn(), Hi = pa;
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
  const c = ht(), u = ma(), d = fn({ ref: a, onCloseAutoFocus: s });
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
        className: m(
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
function ha({ ...t }) {
  return /* @__PURE__ */ o(te.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Ui({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: m("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Fi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: m("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ki({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: m("pr-twp tw:text-muted-foreground", t),
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
      className: e ? m(on({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: ga, usePortalContainer: ba } = hn(), $i = ga;
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
  const c = ba();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: c, children: /* @__PURE__ */ p(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Xo, ...r },
        className: m(
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
              className: m(
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
const Na = /^%[^%]*%$/;
function gn(t) {
  return t !== void 0 && !Na.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return gn(t) ? t : e;
}
function va() {
  const [t, e] = j(!1), r = k(null), n = I(() => {
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
const ke = Dt("", {
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
  const r = ht(), n = ft.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(bn.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function qi({
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
  const u = ht(), d = fn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...d,
      sideOffset: r,
      align: e,
      className: m(
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
function Vi({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ji({
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
      className: m(
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
      className: m(
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
function ya({
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
      className: m(
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
      className: m(
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
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Wi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: m(
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
function Xi({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Zi({
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
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(jn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Bn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Yi({
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
      className: m(
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
function Qi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Dn.Root,
    {
      "data-slot": "label",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function tc({
  className: t,
  ...e
}) {
  const r = ht();
  return /* @__PURE__ */ o(
    Ge.Root,
    {
      "data-slot": "radio-group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function ec({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ge.Item,
    {
      "data-slot": "radio-group-item",
      className: m(
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
const rc = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), zr = (t, e) => t[e] ?? e;
function xa({
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
function nc() {
  return /Windows/i.test(navigator.userAgent);
}
const Sa = ["input", "select", "textarea", "button"], ka = ["button", "textbox"], oc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = k(null), [s, i] = j(void 0), [c, u] = j(void 0), d = I(
    (f) => {
      i(f);
      const v = t.find((A) => A.id === f);
      v && (e == null || e(v));
      const _ = document.getElementById(f);
      _ && (_.scrollIntoView({ block: "center" }), _.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), w = I(
    (f) => {
      const v = t.find((_) => _.id === f);
      v && (u((_) => _ === f ? void 0 : f), r == null || r(v));
    },
    [r, t]
  ), y = (f) => {
    if (!f) return !1;
    const v = f.tagName.toLowerCase();
    if (f.isContentEditable || Sa.includes(v)) return !0;
    const _ = f.getAttribute("role");
    if (_ && ka.includes(_)) return !0;
    const A = f.getAttribute("tabindex");
    return A !== void 0 && A !== "-1";
  }, x = I(
    (f) => {
      var q;
      const v = f.target, _ = (P) => P ? document.getElementById(P) : void 0, A = _(c), b = _(s);
      if (!!(A && v && A.contains(v) && v !== A) && y(v)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            f.preventDefault(), f.stopPropagation();
            const P = t.find((V) => V.id === c);
            P && d(P.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!A) return;
          const P = Array.from(
            A.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (P.length === 0) return;
          const V = P.findIndex((lt) => lt === v);
          if (V === -1) return;
          let pt;
          f.key === "ArrowDown" ? pt = Math.min(V + 1, P.length - 1) : pt = Math.max(V - 1, 0), pt !== V && (f.preventDefault(), f.stopPropagation(), (q = P[pt]) == null || q.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((P) => P.id === s);
      let R = C;
      switch (f.key) {
        case "ArrowDown":
          R = Math.min(C + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          R = Math.max(C - 1, 0), f.preventDefault();
          break;
        case "Home":
          R = 0, f.preventDefault();
          break;
        case "End":
          R = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const P = b;
          if (P) {
            const V = P.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), pt = P.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), lt = V ?? pt;
            if (lt) {
              f.preventDefault(), lt.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (y(v) || (n == null || n(f.key), f.preventDefault()));
          return;
      }
      const F = t[R];
      F && d(F.id);
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
}, Ca = Dt(
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
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ca({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function ac({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: m("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Nn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function sc({
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
        ee(i, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
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
        className: m("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: a,
            onKeyDown: s,
            className: m(
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
function ic({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: m(
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
function cc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: m("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function lc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: m(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function Ea(t) {
  ft.useEffect(() => {
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
function Ia(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function _a(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function uc({
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
  }, [a]), Ea(i);
  const c = ft.useMemo(
    () => i.current ? ee(i.current) : [],
    [i]
  ), u = ft.useCallback(
    (w) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!Nn(w, y)) {
        e == null || e(w);
        return;
      }
      const x = y.closest("table"), f = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ee(x).filter(
          (A) => A.tagName === "TR"
        )
      ) : [], v = f.indexOf(y), _ = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), _a(f, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Ia(c, _, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const A = y.closest("table");
        A && A.focus();
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
      className: m(
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
function dc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "th",
    {
      "data-slot": "table-head",
      className: m(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function wc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "td",
    {
      "data-slot": "table-cell",
      className: m(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function fc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: m("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ta(t, e = !0) {
  const [r, n] = j(!1);
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
function La({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Ta(r, e);
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
function pc({
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
  icon: _ = void 0,
  className: A = void 0,
  variant: b = "ghost",
  id: O
}) {
  const [$, C] = j(!1), R = k(null), F = I(
    (K) => {
      var Y;
      const st = (Y = t.find((et) => et.label === K)) == null ? void 0 : Y.value;
      st && r(
        e.includes(st) ? e.filter((et) => et !== st) : [...e, st]
      );
    },
    [t, e, r]
  ), q = () => d || n, P = w ?? $, V = y ?? C, [pt, lt] = j(P), [Tt, at] = j(e);
  pt !== P && (lt(P), P && at(e));
  const zt = wt(() => {
    if (!f) return t;
    const K = t.filter((Y) => Y.starred).sort((Y, et) => Y.label.localeCompare(et.label)), st = t.filter((Y) => !Y.starred).sort((Y, et) => {
      const Ot = Tt.includes(Y.value), Ut = Tt.includes(et.value);
      return Ot && !Ut ? -1 : !Ot && Ut ? 1 : Y.label.localeCompare(et.label);
    });
    return [...K, ...st];
  }, [t, Tt, f]), gt = () => {
    const K = t.map((st) => st.value);
    at(K), r(K);
  }, Ht = () => {
    at([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: O, className: A, children: /* @__PURE__ */ p(ar, { open: P, onOpenChange: V, children: [
    /* @__PURE__ */ o($e, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
      {
        variant: b,
        role: "combobox",
        "aria-expanded": P,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: x,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            _ && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: _ }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: m(
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
      /* @__PURE__ */ o(La, { isEnabled: v, scrollerRef: R, children: /* @__PURE__ */ p(er, { ref: R, children: [
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
                  className: m(
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
function Aa(t, e) {
  if (!t || e === "") return !1;
  const r = kt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && kt(n.marker).toLowerCase() === r
  );
}
function Pa(t, e, r) {
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
function Ma(t) {
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
const Da = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Oa = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Ra() {
  return [...Da, ...Oa.filter((t) => vn.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function ja(t, e, r) {
  var i, c;
  const { kind: n } = e;
  if (me(t) || Po.has(t.key))
    return "passed";
  const a = !Ce();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), Pa(
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
      const w = kt(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, w)) {
        const y = e.items.find(
          (x) => kt(x.marker).toLowerCase() === w
        );
        return y && r.commitItem(y.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const u = kt(e.filter).toLowerCase(), d = e.items.find(
      (w) => kt(w.marker).toLowerCase() === u
    );
    return d && r.commitItem(d.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = Ma(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function Ba(t, e) {
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
function Ga(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function za(t) {
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
  const _ = a.current, A = () => a.current === _, b = { kind: r, token: _, filter: "", items: e };
  n && (b.isNoteMarker = n), s(b), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Ra(),
    onKey: (O) => c(O)
  }).then((O) => {
    var C;
    i(_);
    const $ = O ?? ((C = b.itemToApplyOnClose) == null ? void 0 : C.marker);
    if ($ !== void 0) {
      const R = (w == null ? void 0 : w()) ?? !1;
      v();
      const F = R ? void 0 : e.find((q) => q.marker === $);
      F && x(F);
    } else A() && v();
  }).catch((O) => {
    i(_), A() && v(), f(O);
  });
}
function Ha(t, e) {
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
  return ja(t, d, {
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
      const f = d.items.find((_) => _.marker === x);
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
function Ua({
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
function Fa({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  H(() => {
    const i = s ?? document, c = (u) => {
      var y, x, f;
      const d = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!d || u.target !== d) return;
      const w = (x = e.current) == null ? void 0 : x.getSelection();
      w ? r.current = w : (f = e.current) != null && f.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = yn(
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
function Ka({
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
      Ba(t, i), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
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
      className: m(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function $a({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: m("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const qa = /* @__PURE__ */ new Set([
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
function Va(t) {
  const e = en(t, "");
  let r = 0;
  for (; r < e.length && qa.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Mo(t, r);
  return a ? [...n, a] : n;
}
function Ja(t) {
  const e = [];
  let r = "";
  return en(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Wa(t) {
  const e = Va(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Ja(t), separator: "+" };
}
function Ur({ hint: t }) {
  const { keycaps: e, separator: r } = Wa(t);
  return e.length === 1 ? /* @__PURE__ */ o(Hr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o($a, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
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
const mc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Fr = (t, e) => t[e] ?? e;
function Xa({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const u = Ce(), d = Fr(a, "%undoButton_tooltip%"), w = Fr(a, "%redoButton_tooltip%");
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
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o($n, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ p("p", { children: [
        w,
        s && /* @__PURE__ */ p(xt, { children: [
          " ",
          /* @__PURE__ */ o(Ur, { hint: u ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Za({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = k(null);
  return H(() => {
    var u;
    const s = Ce(), i = ((u = a.current) == null ? void 0 : u.querySelector(".editor-input")) ?? void 0, c = (d) => {
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
function Ya() {
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
  return wt(() => ({ virtualRef: r, setSource: n }), [n]);
}
function Qa(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function ts(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const es = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(xt, { children: [
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
function rs({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = k(!1), i = k(null), c = k(null), u = k(!1), [d, w] = j(t), [y, x] = j(e), [f, v] = j(!1), _ = k(!1), A = k(d);
  A.current = d;
  const b = k(y);
  b.current = y, H(() => {
    w(t);
  }, [t]), H(() => {
    y !== e && x(e);
  }, [e]);
  const O = (C) => {
    if (u.current = !1, v(C), !C) {
      const R = A.current, F = b.current;
      R !== "custom" || F ? (R !== t || F !== e) && (s.current = !0, r(R, F)) : (w(t), x(e));
    }
  }, $ = (C) => {
    var R, F, q, P;
    C.stopPropagation(), document.activeElement === c.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((R = i.current) == null || R.focus(), u.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? ((F = c.current) == null || F.focus(), u.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((q = i.current) == null ? void 0 : q.selectionStart) === 0 && ((P = c.current) == null || P.focus(), u.current = !1), d === "custom" && C.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && O(!1);
  };
  return /* @__PURE__ */ p(ir, { open: f, onOpenChange: O, children: [
    /* @__PURE__ */ o(At, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(cr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: es(t, n, e) }) }) }),
      /* @__PURE__ */ o(_t, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      lr,
      {
        style: { zIndex: ve },
        onEscapeKeyDown: () => {
          A.current = t, b.current = e, w(t), x(e);
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
              onCheckedChange: () => w("generated"),
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
              onCheckedChange: () => w("hidden"),
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
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                _.current = d === "custom";
              },
              onClick: (C) => {
                var R;
                if (C.stopPropagation(), _.current && C.target !== i.current) {
                  O(!1);
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
                      C.stopPropagation(), w("custom"), u.current = !0;
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
const ns = (t, e) => t === "f" ? /* @__PURE__ */ p(xt, { children: [
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
] }), os = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Do(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function as({
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
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(cr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: ns(t, r) }) }) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: os(t, r) }) })
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
function ss(t) {
  return t ? t.matches(Kr) ? !0 : !!t.querySelector(Kr) : !1;
}
const hc = Object.freeze([
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
function is({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? qn, { className: e, size: 16 });
}
function cs({ state: t }) {
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
        t.selectionState !== void 0 && /* @__PURE__ */ o(cs, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(is, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(ra, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ls({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = j(""), [c] = j(() => {
    const w = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
    return w ? he(w) : void 0;
  }), [u, d] = wt(() => {
    const w = kt(s.trim().toLowerCase());
    if (!w) {
      const f = e.filter((v) => !v.isDisallowed);
      return [f.length > 0 ? f : e, []];
    }
    const y = e.filter((f) => {
      var _;
      const v = (_ = f.marker) == null ? void 0 : _.toLowerCase();
      return f.isDisallowed ? v === w : v == null ? void 0 : v.includes(w);
    }), x = e.filter(
      (f) => f.title.toLowerCase().includes(w) && !y.includes(f)
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
        onValueChange: (w) => i(w),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ p(er, { children: [
      /* @__PURE__ */ o(rr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ge, { children: u.map((w) => /* @__PURE__ */ o(
        $r,
        {
          item: w,
          localizedStrings: t
        },
        he(w)
      )) }),
      d.length > 0 && /* @__PURE__ */ p(xt, { children: [
        u.length > 0 && /* @__PURE__ */ o(Fe, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ge, { children: d.map((w) => /* @__PURE__ */ o(
          $r,
          {
            item: w,
            localizedStrings: t
          },
          he(w)
        )) })
      ] })
    ] })
  ] });
}
function us(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = we[n], i = s != null && s.children ? s : a && we[a];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, u]) => {
    c.push(
      ...u.map((d) => ({
        marker: d,
        title: r[we[d].description] ?? we[d].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(d), e();
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
function ds(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function ws(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function fs(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function ps(t, e) {
  let r = 0, n = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const i = t[r];
      return n !== 0 || !i || !jt(i, a) ? !1 : (r += 1, !0);
    }
    let s = a.insert;
    for (; s.length > 0; ) {
      const i = t[r];
      if (!i || typeof i.insert != "string" || !jt(i.attributes, a.attributes))
        return !1;
      const c = i.insert.slice(n), u = Math.min(c.length, s.length);
      if (c.slice(0, u) !== s.slice(0, u)) return !1;
      s = s.slice(u), n += u, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function ms(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function hs(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const gs = 300, je = "*", bs = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function gc({
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
  onNoteEdit: v,
  hasBuiltInContextMenu: _ = !0,
  isHostContextMenuClaimingKeys: A
}) {
  var Pr;
  const b = k(null), O = k(null), $ = k(null), C = k(s);
  H(() => {
    C.current = s;
  }, [s]);
  const R = k(x);
  H(() => {
    R.current = x;
  }, [x]);
  const F = I(() => {
    var h, N;
    const l = R.current;
    l !== void 0 && l !== "end" ? (h = b.current) == null || h.selectNoteTextOffset(0, l.utf16Offset, {
      field: l.field,
      glyph: l.glyph
    }) : (N = b.current) == null || N.selectNote(0);
  }, []);
  de(() => {
    if (w || !$.current) return;
    const l = parseFloat(getComputedStyle($.current).width);
    l > 0 && ($.current.style.width = `${l}px`);
  }, [w]);
  const [q, P] = j("generated"), [V, pt] = j("generated"), [lt, Tt] = j(je), [at, zt] = j(je), [gt, Ht] = j("f"), [K, st] = j(!1), [Y, et] = j(!0), [Ot, Ut] = j(!1), g = k(!1), M = k(""), J = k(!1), Q = k(void 0), U = k([]), W = k([]), Ft = k(void 0), ne = k(void 0), hr = I(() => {
    var h;
    const l = (h = b.current) == null ? void 0 : h.takeOpsAfterNote(0);
    l != null && l.length && (U.current = [...U.current, ...l], Ft.current = void 0);
  }, []), gr = I(
    (l, h) => {
      var T, E;
      if (!l) return;
      const N = qr(l), S = qr(h);
      if (!N && S) {
        Ft.current = {
          text: U.current,
          closedNoteOp: l,
          openNoteOp: h
        }, U.current = [];
        return;
      }
      const L = Ft.current;
      L && (N && !S && jt(l, L.openNoteOp) && jt(h, L.closedNoteOp) && !((E = (T = b.current) == null ? void 0 : T.getOpsAfterNote(0)) != null && E.length) ? (U.current = L.text, Ft.current = void 0) : jt(h, L.openNoteOp) || (Ft.current = void 0));
    },
    []
  ), [St, oe] = j(!1), Ee = Ya(), [br, En] = j(), Nr = k(null), bt = k(
    void 0
  ), In = k(0), vr = k(f);
  H(() => {
    vr.current = f;
  }, [f]), H(
    () => () => {
      var l;
      bt.current && (bt.current = void 0, (l = vr.current) == null || l.dismiss());
    },
    []
  );
  const Zt = k(void 0), Ie = k(void 0), ae = I(
    () => Ga(
      Ie.current,
      yn(
        () => {
          var l;
          return (l = b.current) == null ? void 0 : l.getUsj();
        },
        () => {
          var l;
          return (l = b.current) == null ? void 0 : l.getSelection();
        }
      )
    ),
    []
  ), { setSession: yr, clearSessionIfCurrent: se } = Ka({
    sessionRef: bt,
    editorRef: b,
    baselineRef: Ie
  }), Kt = I(() => {
    var h, N, S, L;
    if ((h = b.current) != null && h.getSelection() || (N = b.current) != null && N.getSelectedParaMarker()) return;
    const l = Zt.current;
    l ? (S = b.current) == null || S.setSelection(l) : (L = b.current) == null || L.selectNote(0);
  }, []), ie = I(() => {
    var l;
    Kt(), (l = b.current) == null || l.focus();
  }, [Kt]), Lt = wt(
    () => ({
      ...i,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. While the built-in menu is
      // shown it keeps only its Cut/Copy/Paste items.
      contextMenu: void 0,
      hasBuiltInContextMenu: _,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...i.view ?? To(),
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
    () => Sr.current && ss(O.current),
    []
  ), Te = I(
    () => {
      var l;
      return !!((l = ce.current) != null && l.call(ce));
    },
    []
  ), Le = wt(
    () => us(
      b,
      () => oe(!1),
      u,
      br,
      gt
    ),
    [u, br, gt]
  );
  H(() => {
    var l;
    St || (l = b.current) == null || l.focus();
  }, [gt, St]);
  const Pt = I(() => {
    var S, L, T;
    const l = (S = O.current) == null ? void 0 : S.querySelector(".editor-input"), h = l == null ? void 0 : l.querySelector("span.note"), N = (T = (L = O.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : T.anchorNode;
    return !!h && !!N && h.contains(N);
  }, []), Rt = I(
    (l = !1) => {
      var N, S, L, T, E;
      v == null || v();
      const h = (S = (N = b.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (h && Vt("note", h) && (r == null || r([h]), l && d && C.current)) {
        const G = [
          ...U.current,
          ...((L = b.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], D = W.current, mt = !jt(G, D);
        if (w && !mt && jt(h, Q.current))
          return;
        Q.current = h;
        const X = [h];
        mt && (D.length > 0 && ps(
          ((T = d.current) == null ? void 0 : T.getOpsAfterNote(C.current)) ?? [],
          D
        ) && X.push({ delete: fs(D) }), X.push(...G), W.current = G), (E = d.current) == null || E.replaceEmbedUpdate(C.current, X);
      }
    },
    [w, r, v, d]
  ), Ae = I(
    (l) => {
      var N, S, L;
      const h = (N = b.current) == null ? void 0 : N.getSelection();
      (S = b.current) == null || S.applyUpdate([l, { delete: 1 }]), h && ((L = b.current) == null || L.setSelection(h)), ie();
    },
    [ie]
  ), kr = I(
    (l, h) => {
      var L, T, E;
      bt.current || (L = b.current) == null || L.commitPendingMarkerEdits();
      const N = (E = (T = b.current) == null ? void 0 : T.getNoteOps(0)) == null ? void 0 : E.at(0);
      if (!N || !Vt("note", N) || !N.insert.note) return;
      let S;
      l === "custom" ? S = h : l === "generated" ? S = ze : S = He, N.insert.note.caller !== S && (N.insert.note.caller = S, Ae(N));
    },
    [Ae]
  ), $t = k(void 0), Pe = k(Rt);
  H(() => {
    Pe.current = Rt;
  }, [Rt]);
  const qt = I(() => {
    $t.current !== void 0 && (clearTimeout($t.current), $t.current = void 0);
  }, []), Nt = I(() => {
    $t.current !== void 0 && (qt(), Pe.current(!0));
  }, [qt]), Cr = I(() => {
    qt(), $t.current = setTimeout(() => {
      $t.current = void 0, Pe.current(!0);
    }, gs);
  }, [qt]);
  H(() => {
    var L, T;
    let l, h, N;
    g.current = !1, J.current = !1, Zt.current = void 0, et(!0);
    const S = e == null ? void 0 : e.at(0);
    if (Q.current = S, U.current = [], W.current = [], Ft.current = void 0, ne.current = void 0, S && Vt("note", S)) {
      const E = (L = S.insert.note) == null ? void 0 : L.caller;
      let G = "custom";
      E === ze ? G = "generated" : E === He && (G = "hidden");
      const D = G === "custom" && E !== void 0 ? E : je;
      Tt(D), zt(D), P(G), pt(G), Ht(((T = S.insert.note) == null ? void 0 : T.style) ?? "f"), l = setTimeout(() => {
        var X, it, ut, vt;
        const mt = (it = (X = b.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : it.at(0);
        (ut = b.current) == null || ut.applyUpdate(mt ? [S, { delete: 1 }] : [S]), F(), (vt = b.current) == null || vt.focus(), h = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var yt;
            Pt() || (F(), (yt = b.current) == null || yt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      Nt(), R.current = void 0, l && clearTimeout(l), h !== void 0 && cancelAnimationFrame(h), N !== void 0 && clearTimeout(N);
    };
  }, [e, Nt, Pt, F]), de(() => () => Nt(), [Nt]);
  const Er = I(() => {
    var l;
    J.current && (bt.current || (l = b.current) == null || l.commitPendingMarkerEdits(), Nt());
  }, [Nt]), le = I(() => {
    var N;
    const l = b.current;
    if (!l) return;
    const h = Zt.current;
    return h && !l.getSelection() && !l.getSelectedParaMarker() && l.setSelection(h), !xr && (l.getSelection() || l.getSelectedParaMarker()) ? l.focus() : (((N = O.current) == null ? void 0 : N.ownerDocument.defaultView) ?? window).focus(), l;
  }, [xr]), Yt = I(
    (l) => {
      var h;
      (h = le()) == null || h[l]();
    },
    [le]
  );
  Hn(
    y,
    () => ({
      flushPendingEdits: Er,
      focus: () => {
        le();
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
    var l, h;
    if (!bt.current) {
      const N = (l = O.current) == null ? void 0 : l.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (h = b.current) == null || h.commitPendingMarkerEdits();
    }
    w ? Nt() : (qt(), Rt(!0)), n();
  }, [qt, Nt, w, n, Rt]), De = k(Me);
  de(() => {
    De.current = Me;
  });
  const Oe = k({ book: a.book, chapterNum: a.chapterNum });
  de(() => {
    (Oe.current.book !== a.book || Oe.current.chapterNum !== a.chapterNum) && (Oe.current = { book: a.book, chapterNum: a.chapterNum }, De.current());
  }, [a.book, a.chapterNum]);
  const _n = () => {
    var T;
    const l = b.current, h = ds(l == null ? void 0 : l.getUsj());
    if (!l || !h) return;
    const N = ((T = O.current) == null ? void 0 : T.ownerDocument) ?? document, { activeElement: S } = N, L = l.getSelection() ?? Zt.current;
    l.setSelection(h);
    try {
      l.copy();
    } finally {
      L ? l.setSelection(L) : l.selectNote(0), l.getSelection(), N.activeElement !== S && (S instanceof HTMLElement && S !== N.body ? S.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
    }
  }, Tn = I(
    (l, h) => {
      v == null || v(), P(l), Tt(h), kr(l, h), w && Nt();
    },
    [kr, Nt, w, v]
  ), Ln = (l) => {
    var N, S, L, T, E;
    Ht(l), bt.current || (N = b.current) == null || N.commitPendingMarkerEdits();
    const h = (L = (S = b.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (h && Vt("note", h)) {
      h.insert.note && (h.insert.note.style = l);
      const G = (E = (T = h.insert.note) == null ? void 0 : T.contents) == null ? void 0 : E.ops;
      gt !== "x" && l === "x" ? G == null || G.forEach((D) => ms(D)) : gt === "x" && l !== "x" && (G == null || G.forEach((D) => hs(D))), Ae(h), w && Nt();
    }
  }, An = (l) => {
    En(l.contextMarker), Ut(l.canRedo);
  }, Pn = I(
    (l) => {
      var N, S, L, T, E, G, D;
      const h = (S = (N = b.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (h && Vt("note", h)) {
        l.content.length > 1 && setTimeout(() => {
          var it;
          (it = b.current) == null || it.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (L = h.insert.note) == null ? void 0 : L.style, X = (E = (T = h.insert.note) == null ? void 0 : T.contents) == null ? void 0 : E.ops;
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
          g.current = !0, M.current = JSON.stringify(h), ne.current = h, et(!0);
          return;
        }
        J.current = !0, gr(ne.current, h), ne.current = h, (D = (G = b.current) == null ? void 0 : G.getOpsAfterNote(0)) != null && D.length && setTimeout(hr, 0), et(JSON.stringify(h) === M.current), Rt(), w && Cr();
      } else
        st(!1), et(!0);
    },
    [
      w,
      Rt,
      Cr,
      gr,
      hr
    ]
  ), Ir = I(() => {
    const l = window.getSelection();
    if (!Le.length || !l || l.rangeCount === 0)
      return;
    const h = O.current;
    if (!h) return;
    const N = l.getRangeAt(0).cloneRange();
    Ee.setSource({
      measure: () => {
        const S = Qa(N);
        return S && ts(S);
      },
      contextElement: h
    }), oe(!0);
  }, [Le, Ee]), Re = k(() => {
  }), _r = I(
    (l, h, N) => {
      const { anchorRect: S } = l;
      if (!f || !S) return;
      const { hasTextSelection: L } = N;
      za({
        items: h,
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
        isNoteMarker: (T) => Aa(Lt.styleInfo ?? Dr, T),
        sessionCounterRef: In,
        setSession: yr,
        clearSessionIfCurrent: se,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (T) => Re.current(T),
        show: (T) => f.show({
          items: h.map(ws),
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
          return (T = b.current) == null ? void 0 : T.focus();
        },
        applyItem: (T) => {
          var E;
          return (E = b.current) == null ? void 0 : E.applyMarkerMenuSelection(T, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (T) => {
          (!Oo(T) || T.code !== Ro) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${jo(T)}`
          );
        }
      });
    },
    [
      f,
      Kt,
      ae,
      Lt.styleInfo,
      yr,
      se
    ]
  ), ue = I(() => {
    var N;
    const l = (N = b.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!l) return !1;
    const h = Lo(Lt.styleInfo ?? Dr, l);
    return h.length === 0 ? !1 : (_r(l, h, { hasTextSelection: !!l.hasTextSelection }), !0);
  }, [_r, Lt.styleInfo]);
  Ua({
    isSessionOpen: I(() => !!bt.current, []),
    dismiss: I(() => f == null ? void 0 : f.dismiss(), [f])
  });
  const Tr = I(
    (l) => {
      if (!f) return;
      Ha(l, {
        sessionRef: bt,
        editorRef: b,
        palette: f,
        restoreCaret: Kt,
        reopenAtCaret: ue,
        clearSessionIfCurrent: se,
        hasEditorChangedSinceFocus: ae
      }) === "no-session" && f.dismiss();
    },
    [
      f,
      ue,
      Kt,
      se,
      ae
    ]
  );
  H(() => {
    Re.current = Tr;
  }, [Tr]), Fa({
    containerRef: O,
    editorRef: b,
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
      return ((E = O.current) == null ? void 0 : E.querySelector(".editor-input")) ?? void 0;
    };
    if (((T = Lt.view) == null ? void 0 : T.markerMode) === "editable") {
      const E = (D) => {
        var it, ut, vt, yt;
        if (me(D)) return;
        const mt = bt.current, X = l();
        if (!(!X || document.activeElement !== X)) {
          if (mt && f) {
            Re.current(D);
            return;
          }
          if (Te()) {
            (D.key === c || D.key === "Enter") && (D.preventDefault(), D.stopPropagation());
            return;
          }
          if (_e()) {
            D.key === c && (D.preventDefault(), D.stopPropagation());
            return;
          }
          if (D.key === "Enter" && !Pt()) {
            D.preventDefault(), D.stopPropagation(), (it = b.current) == null || it.selectNote(0), (ut = b.current) == null || ut.focus();
            return;
          }
          if (f && D.key === c) {
            if (!Pt()) {
              D.preventDefault(), D.stopPropagation(), (vt = b.current) == null || vt.selectNote(0), (yt = b.current) == null || yt.focus();
              return;
            }
            ue() && (D.preventDefault(), D.stopPropagation());
          }
        }
      }, G = () => {
        var mt, X;
        const D = l();
        !D || document.activeElement !== D || Pt() || ((mt = b.current) == null || mt.selectNote(0), (X = b.current) == null || X.focus());
      };
      return document.addEventListener("keydown", E, { capture: !0 }), document.addEventListener("paste", G, { capture: !0 }), () => {
        document.removeEventListener("keydown", E, { capture: !0 }), document.removeEventListener("paste", G, { capture: !0 });
      };
    }
    const h = () => {
      const E = l();
      return !E || document.activeElement !== E ? !1 : !_e();
    }, N = (E) => {
      E.key !== "Enter" || me(E) || h() && (E.preventDefault(), E.stopPropagation());
    }, S = (E) => {
      E.inputType !== "insertParagraph" && E.inputType !== "insertLineBreak" || h() && (E.preventDefault(), E.stopPropagation());
    }, L = (E) => {
      const G = l();
      if (Te()) {
        E.key === c && E.preventDefault();
        return;
      }
      !St && G && document.activeElement === G && E.key === c ? (E.preventDefault(), Ir()) : St && E.key === "Escape" && (E.preventDefault(), oe(!1));
    };
    return document.addEventListener("keydown", L), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), () => {
      document.removeEventListener("keydown", L), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    St,
    Ir,
    c,
    (Pr = Lt.view) == null ? void 0 : Pr.markerMode,
    Lt.styleInfo,
    f,
    ue,
    Pt,
    _e,
    Te
  ]), H(() => {
    const l = $.current;
    if (!w || !l) return;
    const h = (N) => {
      N.key !== "Escape" || N.defaultPrevented || me(N) || (N.preventDefault(), N.stopPropagation(), De.current());
    };
    return l.addEventListener("keydown", h), () => l.removeEventListener("keydown", h);
  }, [w]), H(() => {
    const l = () => {
      var S, L, T;
      const h = ((S = O.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!h || document.activeElement !== h || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Pt() || ((L = b.current) == null || L.selectNote(0), (T = b.current) == null || T.focus());
    };
    return document.addEventListener("pointerup", l), document.addEventListener("selectionchange", l), () => {
      document.removeEventListener("pointerup", l), document.removeEventListener("selectionchange", l);
    };
  }, [Pt]);
  const Lr = u["%footnoteEditor_copyButton_tooltip%"], Ar = /* @__PURE__ */ o(
    Xa,
    {
      onUndoClick: () => {
        var l;
        return (l = b.current) == null ? void 0 : l.undo();
      },
      onRedoClick: () => {
        var l;
        return (l = b.current) == null ? void 0 : l.redo();
      },
      canUndo: !Y,
      canRedo: Ot,
      localizedStrings: u
    }
  );
  return /* @__PURE__ */ p(xt, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: $,
        className: m("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ p("div", { className: m("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                as,
                {
                  isTypeSwitchable: K,
                  noteType: gt,
                  handleNoteTypeChange: Ln,
                  localizedStrings: u,
                  focusNoteText: ie
                }
              ),
              /* @__PURE__ */ o(
                rs,
                {
                  callerType: q,
                  customCaller: lt,
                  updateCaller: Tn,
                  localizedStrings: u,
                  focusNoteText: ie
                }
              ),
              w && Ar
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ p(or, { children: [
              Ar,
              /* @__PURE__ */ o(
                xa,
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
              ref: O,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  Za,
                  {
                    editorRef: b,
                    canUndo: !Y,
                    canRedo: Ot,
                    children: /* @__PURE__ */ o(
                      Ao,
                      {
                        options: Lt,
                        onStateChange: An,
                        onUsjChange: Pn,
                        defaultUsj: bs,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: b
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
      /* @__PURE__ */ o(ha, { virtualRef: Ee.virtualRef }),
      /* @__PURE__ */ o(
        sr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (l) => {
            l.preventDefault(), l.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            ls,
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
const Ns = {
  "refresh-cw": xo,
  download: yo,
  house: vo,
  "book-a": No,
  settings: bo,
  "circle-question-mark": go,
  "external-link": ho,
  users: mo,
  "book-copy": po,
  pencil: fo,
  eye: wo,
  "zoom-in": uo,
  "zoom-out": lo,
  scan: co,
  "file-text": io,
  "panel-bottom": so,
  "message-square-plus": ao,
  "square-function": Xe,
  "square-x": We,
  "square-sigma": Ze,
  book: oo,
  "book-marked": no,
  "book-open": ro,
  library: eo,
  search: tn,
  "message-square": to,
  "circle-check-big": Qn,
  "clipboard-check": Yn,
  "clipboard-copy": Zn,
  sparkles: Xn,
  "undo-2": Wn,
  "redo-2": Jn
}, wr = Ns, bc = Object.keys(wr);
function fr(t) {
  return t !== void 0 && Object.hasOwn(wr, t);
}
function vs(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function ys(t, e) {
  return Object.entries(t).filter(([r, n]) => Sn(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function xn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function Sn(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function Nc(t) {
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
function vc(t) {
  return t.some(
    (e) => fr(e.iconNameBefore) || e.iconPathBefore || e.checked !== void 0
  ) ? "icon" : "none";
}
function yc(t, e) {
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
          vs(t.groups, n.id)
        )
      }
    )
  }));
}
function xc(t) {
  return t ? {
    columns: xn(t.columns).map((e) => ({
      ...e,
      groups: kn(t, ys(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function xs(t) {
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
function Be(t) {
  const e = xs(t.openTabs);
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
function Bt(t, e) {
  const r = Bo(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function qe(t) {
  return [{ kind: "flat", rows: [...t].sort(Bt) }];
}
function Ss(t) {
  const e = t.filter(Jr).sort(Bt), r = t.filter((a) => !Jr(a)).sort(Bt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function ks(t, e) {
  const r = t.filter((i) => i.isSelected).sort(Bt), n = t.filter((i) => !i.isSelected).sort(Bt), a = (i, c) => {
    var d;
    const u = (d = e.getSectionHeading) == null ? void 0 : d.call(
      e,
      i,
      c.map((w) => w.project)
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
function Cs(t, e) {
  if (e.id === "openTabs") return Ss(t);
  if (e.id === "selection") return ks(t, e);
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
      (x, f) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, f.project)) || Bt(x, f);
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
    rows: [...n].sort(Bt)
  }), i;
}
const Sc = [
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
const fe = "recent", Es = "other";
function Cn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Is(t) {
  const e = t ?? {};
  return [
    Cn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Qt.lastUsedAt]) == "number" ? fe : Es;
      },
      getSectionHeading: (r) => r === fe ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === fe ? -1 : n.key === fe ? 1 : 0
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
const kc = Is();
function _s(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? pr : e.unselectedSectionHeading ?? mr
  };
}
function Cc(t) {
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
function Ec(t) {
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
const Ts = 100, nt = {
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
function Ls(t) {
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
function Ic(t) {
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
  return ia[Go(t)] ?? String(t);
}
const Wr = "platform.footerAction", As = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ps({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = re(t);
  return e ? /* @__PURE__ */ o(
    be,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: As,
      children: r
    }
  ) : /* @__PURE__ */ o(be, { variant: "secondary", children: r });
}
function Ms({
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
  } = va(), [x, f] = j(!1), v = Un(), _ = t.isDisabled && !!t.disabledReason, A = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || _, b = d || x, O = I(() => {
    if (A) {
      f(!0);
      return;
    }
    w();
  }, [A, w]), $ = I(() => {
    f(!1), y();
  }, [y]), C = /* @__PURE__ */ o(Ne, { className: m("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let R;
  e === "project" ? t.openGroups.length > 0 && (R = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((V) => /* @__PURE__ */ o(be, { variant: "secondary", children: re(V) }, V)) })) : t.scrollGroupId !== void 0 && (R = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Ps,
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
          /* @__PURE__ */ o(ko, { className: "tw:h-3 tw:w-3" }),
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
      onPointerEnter: O,
      onPointerLeave: $,
      ..._ && { "aria-describedby": v },
      className: m(
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
              zo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        R,
        _ && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), q = t.scrollGroupId !== void 0 ? re(t.scrollGroupId) : void 0, P = t.isBoundButClosed && q ? r.boundButClosedTooltip.replace("{group}", q) : void 0;
  return /* @__PURE__ */ p(Et, { open: b, delayDuration: 400, children: [
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
          P && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: P }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function Ds({
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
          className: m(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": n.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ o(So, { className: "tw:h-4 tw:w-4" })
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
          /* @__PURE__ */ p(ya, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Gr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(dr, {}),
            t.map((s) => /* @__PURE__ */ o(Gr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Os(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function _c(t) {
  const [e, r] = j(!1), [n, a] = j(""), s = wt(() => Ls(t.localizedStrings), [t.localizedStrings]), i = wt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(Cn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      _s({
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
  ]), [c, u] = j(void 0), d = wt(
    () => Os(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = c ?? d, y = k(null), [x, f] = j(void 0), v = I((g) => {
    r(g), g || (a(""), f(void 0));
  }, []);
  H(() => {
    if (!e) return;
    const g = window.requestAnimationFrame(() => {
      const M = y.current;
      M && M.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(g);
  }, [e]);
  const _ = wt(() => t.mode === "project" ? Be({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Be({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Be({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), A = wt(() => {
    const g = n.trim().toLowerCase();
    return g ? _.filter(
      (M) => M.shortName.toLowerCase().includes(g) || (M.fullName ?? "").toLowerCase().includes(g)
    ) : _;
  }, [_, n]), b = wt(
    () => new Map(t.projects.map((g) => [ct(g.id), g])),
    [t.projects]
  ), O = I(
    (g) => g === void 0 ? void 0 : b.get(ct(g)),
    [b]
  ), { renderProjectIndicator: $ } = t, C = I(
    (g) => $ ? $(g.project) : void 0,
    [$]
  ), R = !!$, F = !!t.footerAction && A.length === 0, q = wt(() => {
    if (w === Xt) return qe(A);
    const g = i.find((M) => M.id === w);
    return g ? Cs(A, g) : qe(A);
  }, [A, w, i]), P = (g) => {
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
  }, lt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, at = wt(() => {
    switch (t.mode) {
      case "project": {
        const g = O(t.selection.projectId);
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
          const W = O(U.projectId);
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
        const g = O(t.selection.projectId);
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
    O,
    t.selection,
    lt,
    Tt,
    s.buttonPlaceholder
  ]), zt = k(null), [gt, Ht] = j(!1);
  H(() => {
    const g = zt.current;
    if (!g) return;
    const M = (Q) => {
      Ht(Q < Ts);
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
  t.isLoading ? K = /* @__PURE__ */ o(Co, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : gt ? K = void 0 : t.mode === "project-multi" ? K = /* @__PURE__ */ o(Qr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : K = /* @__PURE__ */ o(Eo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const st = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? P : void 0, Y = s.ariaLabel && at.hasSelection && at.title ? `${s.ariaLabel}: ${at.accessibleTitle ?? at.title}` : s.ariaLabel || void 0, et = /* @__PURE__ */ p(
    Z,
    {
      ref: zt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": Y,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: m(
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
  ), Ot = at.title ? /* @__PURE__ */ o(At, { delayDuration: 400, children: /* @__PURE__ */ p(Et, { children: [
    /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o($e, { asChild: !0, children: et }) }),
    /* @__PURE__ */ o(_t, { dir: "auto", children: at.title })
  ] }) }) : /* @__PURE__ */ o($e, { asChild: !0, children: et }), Ut = i.length > 1;
  return /* @__PURE__ */ p(ar, { open: e, onOpenChange: v, children: [
    Ot,
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
            onValueChange: f,
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
                  Ds,
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
                        /* @__PURE__ */ o(ge, { heading: Rs(g, s), children: g.rows.map((J) => /* @__PURE__ */ o(
                          Ms,
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
function Rs(t, e) {
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
const js = Zr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, c) => {
    const u = ht();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: m("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            tn,
            {
              className: m(
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
              className: m(
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
              className: m(
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
js.displayName = "SearchBar";
const Bs = 5;
function Tc(t) {
  return sa(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function Gs(t, e) {
  return t.filter((r) => {
    try {
      return Ho(r) === e;
    } catch {
      return !1;
    }
  });
}
const Lc = (t, e, r) => Gs(t, e).every((n) => r.includes(n));
function zs(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => ca(n, e));
}
function Ac(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), s = new Set(e.map((c) => c.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((c) => a.has(c)))
    return r;
  const i = zs(t, n);
  if (i.length !== 0)
    return i.length <= Bs ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Hs({ name: t, className: e }) {
  const r = fr(t) ? wr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: m("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function Pc({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const s = n ? "tw:me-2" : "tw:ms-2";
  if (fr(e)) return /* @__PURE__ */ o(Hs, { name: e, className: s });
  if (!t && n && a === "icon")
    return /* @__PURE__ */ o(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: m("tw:inline-block tw:w-4 tw:shrink-0", s)
      }
    );
  if (!t) return;
  const i = `${n ? "Leading" : "Trailing"} icon for ${r}`;
  return n ? /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "menu-icon-image-box",
      className: m(
        "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
        s
      ),
      children: /* @__PURE__ */ o("img", { className: "tw:max-h-4 tw:max-w-4", src: t, alt: i })
    }
  ) : /* @__PURE__ */ o("img", { className: m("tw:max-h-4 tw:max-w-4", s), src: t, alt: i });
}
function Mc({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: m("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function Us({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Fs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-header",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Ks = Dt(
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
function $s({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ks({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Dc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-title",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function qs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-description",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function Vs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-content",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Oc({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(Us, { className: m(s), role: a, children: [
    /* @__PURE__ */ p(Fs, { children: [
      /* @__PURE__ */ o($s, { variant: "icon", children: n ?? /* @__PURE__ */ o(Io, {}) }),
      /* @__PURE__ */ o(qs, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Vs, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const Js = Zr(({ className: t, ...e }, r) => /* @__PURE__ */ o(_o, { size: 35, className: m("tw:animate-spin", t), ...e, ref: r }));
Js.displayName = "Spinner";
const Ws = Dt(
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
function Rc({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ws({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function jc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-title",
      className: m(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Bc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-description",
      className: m(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function Gc({
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
      className: m(
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
function zc({
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
function Hc({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ye.Separator,
    {
      "data-slot": "resizable-handle",
      className: m(
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
  Pi as A,
  Z as B,
  ye as C,
  ir as D,
  or as E,
  mn as F,
  er as G,
  rr as H,
  Qi as I,
  ec as J,
  hi as K,
  Di as L,
  Ni as M,
  vi as N,
  ki as O,
  Ci as P,
  xi as Q,
  tc as R,
  Ce as S,
  At as T,
  xa as U,
  rc as V,
  be as W,
  wa as X,
  ac as Y,
  oc as Z,
  dr as _,
  ca as a,
  Dc as a$,
  la as a0,
  nn as a1,
  uc as a2,
  wc as a3,
  sc as a4,
  ic as a5,
  dc as a6,
  cc as a7,
  Vi as a8,
  ya as a9,
  qi as aA,
  Yi as aB,
  yc as aC,
  ji as aD,
  bn as aE,
  Se as aF,
  ke as aG,
  fn as aH,
  Qo as aI,
  ea as aJ,
  Hr as aK,
  Rc as aL,
  Bc as aM,
  jc as aN,
  zi as aO,
  bi as aP,
  Si as aQ,
  Yo as aR,
  Zo as aS,
  gi as aT,
  Za as aU,
  Us as aV,
  Vs as aW,
  qs as aX,
  Fs as aY,
  $s as aZ,
  Mc as a_,
  Gr as aa,
  pc as ab,
  hc as ac,
  mc as ad,
  cn as ae,
  _c as af,
  js as ag,
  Tc as ah,
  Gs as ai,
  Fe as aj,
  Li as ak,
  Lc as al,
  Hi as am,
  dn as an,
  yi as ao,
  ia as ap,
  xc as aq,
  Nc as ar,
  vc as as,
  Gi as at,
  Bi as au,
  Pc as av,
  Wi as aw,
  Ur as ax,
  Zi as ay,
  Xi as az,
  Et as b,
  za as b$,
  gc as b0,
  gs as b1,
  $a as b2,
  ls as b3,
  ha as b4,
  Ki as b5,
  Ui as b6,
  Fi as b7,
  Hc as b8,
  zc as b9,
  Ta as bA,
  Ya as bB,
  _i as bC,
  bc as bD,
  Hs as bE,
  Xt as bF,
  nt as bG,
  Sc as bH,
  Xo as bI,
  Cc as bJ,
  Ic as bK,
  Ec as bL,
  yn as bM,
  Ba as bN,
  kc as bO,
  Pa as bP,
  Ra as bQ,
  ja as bR,
  Ga as bS,
  ss as bT,
  Aa as bU,
  Is as bV,
  _s as bW,
  ws as bX,
  mi as bY,
  Ma as bZ,
  Ha as b_,
  Gc as ba,
  Oc as bb,
  Js as bc,
  fc as bd,
  lc as be,
  $i as bf,
  Xa as bg,
  ve as bh,
  pi as bi,
  fi as bj,
  Wo as bk,
  Jo as bl,
  di as bm,
  ui as bn,
  wi as bo,
  li as bp,
  Ca as bq,
  fa as br,
  on as bs,
  Sn as bt,
  ln as bu,
  qr as bv,
  nc as bw,
  ts as bx,
  Qa as by,
  un as bz,
  m as c,
  kt as c0,
  Ac as c1,
  Ua as c2,
  Fa as c3,
  Ka as c4,
  It as d,
  _t as e,
  Ri as f,
  Ai as g,
  cr as h,
  lr as i,
  ur as j,
  Ji as k,
  Ii as l,
  Mi as m,
  ge as n,
  ht as o,
  aa as p,
  Ti as q,
  rt as r,
  ar as s,
  Oi as t,
  va as u,
  $e as v,
  sr as w,
  Ei as x,
  Qe as y,
  tr as z
};
//# sourceMappingURL=resizable-8MF8OTiu.js.map
