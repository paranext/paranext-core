import { jsx as n, jsxs as p, Fragment as gt } from "react/jsx-runtime";
import { Slot as Ge, Dialog as yt, Separator as on, Popover as Wt, Tooltip as qt, DropdownMenu as Y, Label as an, RadioGroup as Le } from "radix-ui";
import { IconX as sn, IconCheck as ze, IconSearch as ln, IconChevronLeft as cn, IconChevronRight as dn } from "@tabler/icons-react";
import { Canon as nt } from "@sillsdev/scripture";
import wt, { useState as O, useRef as I, useCallback as _, createContext as un, useContext as wn, useEffect as K, useMemo as ut, useLayoutEffect as ae, useImperativeHandle as fn, Fragment as pn, forwardRef as Ar } from "react";
import { X as Dr, Check as ue, ChevronsUpDown as Rr, Star as mn, Undo as hn, Redo as gn, SquareX as Mr, FunctionSquare as Or, SquareSigma as Pr, Ban as bn, Copy as Nn, Group as vn, ArrowRight as xn, Loader2 as yn, ChevronDown as Sn, Search as kn, AlertTriangle as Cn, LoaderCircle as En } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as br, GENERATOR_NOTE_CALLER as Ae, HIDDEN_NOTE_CALLER as De, isInsertEmbedOpOfType as Jt, getDefaultViewOptions as In, getMarkerMenuItems as _n, defaultStyleInfo as Tn, Editorial as Ln } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as An, formatReplacementString as Dn, usfmMarkers as se, deepEqual as Gt, isPlatformError as Rn, ABORTED as Mn, getErrorMessage as On, normalizeProjectId as it, compareProjectsByName as Pn, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Zt, formatProjectName as jr, getLocalizeKeyForScrollGroupId as jn, hasDistinctFullName as Bn, getSectionForBook as Gn } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as He from "react-resizable-panels";
import { clsx as zn } from "clsx";
import { extendTailwindMerge as Hn, twMerge as Un } from "tailwind-merge";
const Kn = Hn({ prefix: "tw" });
function Re(t) {
  const e = [];
  let r = "", o = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? o += 1 : s === "]" && (o -= 1), s === ":" && o === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Fn(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Re(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, w) => w !== r), `-${s}`].join(":")}`, original: t };
  }
  const o = e.findIndex((s) => s.startsWith("!tw-"));
  if (o !== -1) {
    const s = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((d, w) => w !== o), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function $n(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Re(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), a = r[r.length - 1], s = Re(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const d = a.slice(1);
    return [...o, `-tw-${d}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const d = a.slice(1);
    return [...o, `!tw-${d}`].join(":");
  }
  return [...o, `tw-${a}`].join(":");
}
function g(...t) {
  const e = zn(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Kn(e);
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const w = Fn(d);
    o.set(w.normalized, w.original), a.push(w.normalized);
  }), Un(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const w = o.get(d);
    return w ? $n(d, w) : d;
  }).join(" ");
}
const Br = 600, we = 650, Za = 400, Jn = 450, qn = 500, Wa = 510, Ya = 520, Vn = 675, Qa = 690, ts = 700, es = 800, Gr = Ot(
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
function X({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: o = !1,
  ...a
}) {
  const s = o ? Ge.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: g(Gr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const zr = "layoutDirection";
function Hr() {
  return globalThis.localStorage ?? void 0;
}
function pt() {
  var t;
  try {
    const e = (t = Hr()) == null ? void 0 : t.getItem(zr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function rs(t) {
  var e;
  try {
    (e = Hr()) == null || e.setItem(zr, t);
  } catch {
  }
}
function ns({ ...t }) {
  return /* @__PURE__ */ n(yt.Root, { "data-slot": "dialog", ...t });
}
function os({ ...t }) {
  return /* @__PURE__ */ n(yt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Xn({ ...t }) {
  return /* @__PURE__ */ n(yt.Portal, { "data-slot": "dialog-portal", ...t });
}
function as({ ...t }) {
  return /* @__PURE__ */ n(yt.Close, { "data-slot": "dialog-close", ...t });
}
function Zn({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    yt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: g(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Jn, ...e },
      ...r
    }
  );
}
function ss({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: a,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  ...i
}) {
  const l = pt();
  return /* @__PURE__ */ p(Xn, { children: [
    /* @__PURE__ */ n(Zn, { className: o, style: a }),
    /* @__PURE__ */ p(
      yt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: qn, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ n(yt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(X, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(sn, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function is({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function ls({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dialog-footer",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...o,
      children: [
        r,
        e && /* @__PURE__ */ n(yt.Close, { asChild: !0, children: /* @__PURE__ */ n(X, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function cs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function ds({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
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
function Ur({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ n(
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
function Wn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Yn = Ot(
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
function Qn({
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
    /* @__PURE__ */ n(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: g(Yn({ align: e }), t),
        onClick: (o) => {
          var a, s;
          o.target instanceof HTMLElement && o.target.closest("button") || (s = (a = o.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
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
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Ke({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...o
}) {
  const a = pt(), s = wt.useCallback(
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
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ p(Wn, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        Ht.Input,
        {
          "data-slot": "command-input",
          className: g(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...o
        }
      ),
      /* @__PURE__ */ n(Qn, { children: /* @__PURE__ */ n(ln, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Fe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function $e({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
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
  return /* @__PURE__ */ n(
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
  return /* @__PURE__ */ n(
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
  return /* @__PURE__ */ p(
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
        /* @__PURE__ */ n(ze, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function to({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const eo = [
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
], ro = (t) => {
  var e;
  return ((e = eo[t]) == null ? void 0 : e.chapters) ?? -1;
}, no = nt.allBookIds.filter(
  (t) => !nt.isObsolete(nt.bookIdToNumber(t))
);
function oo(t) {
  const e = [], r = Math.min(t.length, nt.allBookIds.length);
  for (let o = 0; o < r; o += 1)
    t[o] === "1" && e.push(nt.bookNumberToId(o + 1));
  return e;
}
function M(t) {
  return `%scrollGroup_${t}%`;
}
const ao = {
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
function Je(t, e) {
  return ro(nt.bookIdToNumber(t));
}
function pe(t, e, r) {
  const o = nt.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = nt.bookIdToNumber(i);
    (r === "next" ? l > o && l < s : l < o && l > s) && (a = i, s = l);
  }), a;
}
function us(t, e, r) {
  const { book: o, chapterNum: a } = t;
  if (e.includes(o) && a > 1)
    return { book: o, chapterNum: a - 1, verseNum: 1 };
  const s = pe(o, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Je(s), 1),
      verseNum: 1
    };
}
function ws(t, e, r) {
  const { book: o, chapterNum: a } = t;
  if (e.includes(o) && a < Je(o))
    return { book: o, chapterNum: a + 1, verseNum: 1 };
  const s = pe(o, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function fs(t, e, r) {
  const { book: o, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return s > 1 ? { book: o, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: o, chapterNum: 1, verseNum: 0 } : { book: o, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = pe(o, e, "previous");
  if (!i) return;
  const l = Math.max(Je(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function ps(t, e, r) {
  const { book: o, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return { book: o, chapterNum: a, verseNum: s + 1 };
  const i = pe(o, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function ms(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const hs = (t, e, r, o, a) => {
  switch (t) {
    case Mt.OT:
      return e ?? "Old Testament";
    case Mt.NT:
      return r ?? "New Testament";
    case Mt.DC:
      return o ?? "Deuterocanon";
    case Mt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, gs = (t, e, r, o, a) => {
  switch (t) {
    case Mt.OT:
      return e ?? "OT";
    case Mt.NT:
      return r ?? "NT";
    case Mt.DC:
      return o ?? "DC";
    case Mt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function bs(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? nt.bookIdToEnglishName(t);
}
function so(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Ns = Object.fromEntries(
  no.map((t) => [t, nt.bookIdToEnglishName(t)])
);
function vs(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = nt.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(o) || t.toLowerCase().includes(o) || (s ? s.localizedName.toLowerCase().includes(o) || s.localizedId.toLowerCase().includes(o) : !1));
}
const Nr = `
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
function io(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${Nr}, ${e}` : Nr;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && io(o)
  );
}
const xs = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Oe = "keyboard", vr = !1;
function ys() {
  vr || typeof document > "u" || (vr = !0, document.addEventListener(
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
function Ss() {
  return Oe;
}
const Kr = "data-quiet-focus";
function ks(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Kr, ""), t.style.outline = "none"));
}
function Cs(t) {
  t && (t.removeAttribute(Kr), t.style.removeProperty("outline"));
}
const Es = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function lo({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...o
}) {
  return /* @__PURE__ */ n(
    on.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const co = Ot(
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
function qe({
  className: t,
  orientation: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        co({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Is({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? Ge.Root : "div";
  return /* @__PURE__ */ n(
    o,
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
function Fr({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ n(
    lo,
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
function $r() {
  const t = wt.createContext(null);
  function e({
    container: o,
    children: a
  }) {
    return /* @__PURE__ */ n(t.Provider, { value: o, children: a });
  }
  function r() {
    return wt.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function Ve({ ...t }) {
  return /* @__PURE__ */ n(Wt.Root, { "data-slot": "popover", ...t });
}
function Pe({ ...t }) {
  return /* @__PURE__ */ n(Wt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: uo, usePortalContainer: wo } = $r(), _s = uo;
function Xe({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...a
}) {
  const s = pt(), i = wo();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(Wt.Portal, { container: i, children: /* @__PURE__ */ n(
      Wt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Br, ...o },
        dir: s,
        ...a
      }
    ) })
  );
}
function fo({ ...t }) {
  return /* @__PURE__ */ n(Wt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Ts({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Ls({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function As({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
  return /* @__PURE__ */ n(
    qt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function St({ ...t }) {
  return /* @__PURE__ */ n(qt.Root, { "data-slot": "tooltip", ...t });
}
function kt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    qt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? g(Gr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: po, usePortalContainer: mo } = $r(), Ds = po;
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
  showArrow: o = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: a,
  children: s,
  ...i
}) {
  const l = mo();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ n(qt.Portal, { container: l, children: /* @__PURE__ */ p(
      qt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Vn, ...r },
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          o && /* @__PURE__ */ n(
            qt.Arrow,
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
const ho = /^%[^%]*%$/;
function Jr(t) {
  return t !== void 0 && !ho.test(t) && t.trim() !== "";
}
function et(t, e) {
  return Jr(t) ? t : e;
}
function go() {
  const [t, e] = O(!1), r = I(null), o = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: o, onPointerLeave: a };
}
const qr = un(void 0);
function me() {
  const t = wn(qr);
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
function Ze({ variant: t = "default", ...e }) {
  const r = pt(), o = wt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(qr.Provider, { value: o, children: /* @__PURE__ */ n(Y.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Rs({
  ...t
}) {
  return /* @__PURE__ */ n(Y.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function We({
  ...t
}) {
  return /* @__PURE__ */ n(Y.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ye({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  children: a,
  ...s
}) {
  const i = pt();
  return /* @__PURE__ */ n(Y.Portal, { children: /* @__PURE__ */ n(
    Y.Content,
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
      style: { zIndex: Br, ...o },
      ...s,
      children: /* @__PURE__ */ n("div", { dir: i, children: a })
    }
  ) });
}
function Ms({ ...t }) {
  return /* @__PURE__ */ n(Y.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Os({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const a = pt(), s = me();
  return /* @__PURE__ */ n(
    Y.Item,
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
      ...o
    }
  );
}
function Vt({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...a
}) {
  const s = pt(), i = me();
  return /* @__PURE__ */ p(
    Y.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
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
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ n(Y.ItemIndicator, { children: /* @__PURE__ */ n(ze, {}) })
          }
        ),
        e
      ]
    }
  );
}
function bo({
  ...t
}) {
  return /* @__PURE__ */ n(Y.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function xr({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  const a = pt(), s = me();
  return /* @__PURE__ */ p(
    Y.RadioItem,
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
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(Y.ItemIndicator, { children: /* @__PURE__ */ n(ze, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Qe({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ n(
    Y.Label,
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
function tr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Y.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Ps({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function js({ ...t }) {
  return /* @__PURE__ */ n(Y.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Bs({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const a = me(), s = pt();
  return /* @__PURE__ */ p(
    Y.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: a.variant })
      ),
      ...o,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ n(cn, { className: "tw:ms-auto" }) : /* @__PURE__ */ n(dn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Gs({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...o
}) {
  const a = pt();
  return /* @__PURE__ */ n(
    Y.SubContent,
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
      ...o,
      children: /* @__PURE__ */ n("div", { dir: a, children: r })
    }
  );
}
function zs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    an.Root,
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
function Hs({
  className: t,
  ...e
}) {
  const r = pt();
  return /* @__PURE__ */ n(
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
function Us({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Le.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        Le.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Ks = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), yr = (t, e) => t[e] ?? e;
function No({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = yr(o, "%cancelButton_tooltip%"), l = s ?? yr(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(qe, { children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ n(Dr, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ n(Fr, {}),
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ n(ue, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: l }) })
    ] }) })
  ] });
}
function ge() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Fs() {
  return /Windows/i.test(navigator.userAgent);
}
const vo = ["input", "select", "textarea", "button"], xo = ["button", "textbox"], $s = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const a = I(null), [s, i] = O(void 0), [l, d] = O(void 0), w = _(
    (u) => {
      i(u);
      const S = t.find((E) => E.id === u);
      S && (e == null || e(S));
      const m = document.getElementById(u);
      m && (m.scrollIntoView({ block: "center" }), m.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), f = _(
    (u) => {
      const S = t.find((m) => m.id === u);
      S && (d((m) => m === u ? void 0 : u), r == null || r(S));
    },
    [r, t]
  ), k = (u) => {
    if (!u) return !1;
    const S = u.tagName.toLowerCase();
    if (u.isContentEditable || vo.includes(S)) return !0;
    const m = u.getAttribute("role");
    if (m && xo.includes(m)) return !0;
    const E = u.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, y = _(
    (u) => {
      var V;
      const S = u.target, m = (D) => D ? document.getElementById(D) : void 0, E = m(l), H = m(s);
      if (!!(E && S && E.contains(S) && S !== E) && k(S)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !S.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const D = t.find((ot) => ot.id === l);
            D && w(D.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!E) return;
          const D = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const ot = D.findIndex((ft) => ft === S);
          if (ot === -1) return;
          let lt;
          u.key === "ArrowDown" ? lt = Math.min(ot + 1, D.length - 1) : lt = Math.max(ot - 1, 0), lt !== ot && (u.preventDefault(), u.stopPropagation(), (V = D[lt]) == null || V.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((D) => D.id === s);
      let A = C;
      switch (u.key) {
        case "ArrowDown":
          A = Math.min(C + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          A = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          A = 0, u.preventDefault();
          break;
        case "End":
          A = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const D = H;
          if (D) {
            const ot = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), lt = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), ft = ot ?? lt;
            if (ft) {
              u.preventDefault(), ft.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (k(S) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const q = t[A];
      q && w(q.id);
    },
    [t, w, s, l, f, o]
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
}, yo = Ot(
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
function de({ className: t, variant: e = "default", asChild: r = !1, ...o }) {
  const a = r ? Ge.Root : "span";
  return /* @__PURE__ */ n(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        yo({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function Js({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function qs({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...o
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
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Yt(l)[0].focus();
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
        className: g("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
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
            ...o
          }
        )
      }
    )
  );
}
function Vs({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ n(
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
function Xs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Zs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function So(t) {
  wt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? Yt(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function ko(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Co(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Ws({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: a,
  ...s
}) {
  const i = wt.useRef(null);
  wt.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), So(i);
  const l = wt.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), d = wt.useCallback(
    (f) => {
      const { current: k } = i;
      if (!k || !k.parentElement) return;
      const y = k.closest("table"), u = y ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(y).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], S = u.indexOf(k), m = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), Co(u, S, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), ko(l, m, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const E = k.closest("table");
        E && E.focus();
      }
      e == null || e(f);
    },
    [i, l, e]
  ), w = wt.useCallback(
    (f) => {
      o && (r == null || r(f));
    },
    [o, r]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: d,
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
function Ys({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Qs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function ti({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Eo(t, e = !0) {
  const [r, o] = O(!1);
  return K(() => {
    const a = t.current;
    if (!e || !a) {
      o(!1);
      return;
    }
    const s = () => {
      o(a.scrollTop + a.clientHeight < a.scrollHeight - 1);
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
function Io({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const o = Eo(r, e);
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
function ei({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: w,
  isOpen: f = void 0,
  onOpenChange: k = void 0,
  isDisabled: y = !1,
  sortSelected: u = !1,
  showScrollCue: S = !1,
  icon: m = void 0,
  className: E = void 0,
  variant: H = "ghost",
  id: P
}) {
  const [J, C] = O(!1), A = I(null), q = _(
    (G) => {
      var Q;
      const at = (Q = t.find((ct) => ct.label === G)) == null ? void 0 : Q.value;
      at && r(
        e.includes(at) ? e.filter((ct) => ct !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), V = () => w || o, D = f ?? J, ot = k ?? C, [lt, ft] = O(D), [It, F] = O(e);
  lt !== D && (ft(D), D && F(e));
  const Pt = ut(() => {
    if (!u) return t;
    const G = t.filter((Q) => Q.starred).sort((Q, ct) => Q.label.localeCompare(ct.label)), at = t.filter((Q) => !Q.starred).sort((Q, ct) => {
      const Tt = It.includes(Q.value), jt = It.includes(ct.value);
      return Tt && !jt ? -1 : !Tt && jt ? 1 : Q.label.localeCompare(ct.label);
    });
    return [...G, ...at];
  }, [t, It, u]), Ut = () => {
    const G = t.map((at) => at.value);
    F(G), r(G);
  }, _t = () => {
    F([]), r([]);
  };
  return /* @__PURE__ */ n("div", { id: P, className: E, children: /* @__PURE__ */ p(Ve, { open: D, onOpenChange: ot, children: [
    /* @__PURE__ */ n(Pe, { asChild: !0, children: /* @__PURE__ */ p(
      X,
      {
        variant: H,
        role: "combobox",
        "aria-expanded": D,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: y,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            m && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: m }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: g(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: V()
              }
            )
          ] }),
          /* @__PURE__ */ n(Rr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Xe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Ue, { children: [
      /* @__PURE__ */ n(
        Ke,
        {
          placeholder: a ?? o,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(X, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ n(X, { variant: "ghost", size: "sm", onClick: _t, children: l })
      ] }),
      /* @__PURE__ */ n(Io, { isEnabled: S, scrollerRef: A, children: /* @__PURE__ */ p(Fe, { ref: A, children: [
        /* @__PURE__ */ n($e, { children: d }),
        /* @__PURE__ */ n(ce, { children: Pt.map((G) => /* @__PURE__ */ p(
          fe,
          {
            value: G.label,
            onSelect: q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                ue,
                {
                  className: g(
                    "tw:h-4 tw:w-4",
                    e.includes(G.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              G.starred && /* @__PURE__ */ n(mn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: G.label }),
              G.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: G.secondaryLabel })
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
function _o(t, e) {
  if (!t || e === "") return !1;
  const r = xt(e).toLowerCase();
  return Object.values(t.markers).some(
    (o) => o.styleType === "note" && xt(o.marker).toLowerCase() === r
  );
}
function To(t, e, r) {
  if (!e) return [...t];
  const o = [...t], a = xt(e).toLowerCase();
  return r === "passive" ? br({
    query: a,
    items: o,
    filter: (s) => xt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : br({
    query: a,
    items: o,
    filter: (s) => xt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function je(t) {
  return t.isComposing || t.keyCode === 229;
}
const Vr = /^[a-z0-9+-]$/i;
function Lo(t) {
  var o;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ge()) && e !== "Dead") {
    if (Vr.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((o = t.getModifierState) == null ? void 0 : o.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Ao = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Do = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Ro() {
  return [...Ao, ...Do.filter((t) => Vr.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function Mo(t, e, r) {
  var i, l;
  const { kind: o } = e;
  if (je(t) || An.has(t.key))
    return "passed";
  const a = !ge();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), To(
      e.items.map((w) => ({ label: w.marker })),
      e.filter,
      // Containment, for every kind: all marker palettes are host-driven (the session owns the
      // query and the palette renders it read-only), so this commit must resolve against the same
      // list the host filtered. Ranking cmdk's way here instead would commit an item the rendered
      // list never offered.
      "passive"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return dt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (o !== "selection") {
      if (dt(t), e.filter === "")
        return r.dismiss(), "ended";
      const f = xt(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, f)) {
        const k = e.items.find(
          (y) => xt(y.marker).toLowerCase() === f
        );
        return k ? r.commitItem(k.marker) : r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const d = xt(e.filter).toLowerCase(), w = e.items.find(
      (f) => xt(f.marker).toLowerCase() === d
    );
    return w && r.commitItem(w.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return o === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && o !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = Lo(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function Oo(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function Xr(t, e) {
  const r = t();
  if (r === void 0) return;
  const o = e();
  return {
    content: JSON.stringify(r),
    caret: o === void 0 ? void 0 : JSON.stringify(o)
  };
}
function Po(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function jo(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: o,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: d,
    restoreSelectionIfLost: w,
    hasEditorChangedSinceFocus: f,
    focusEditor: k,
    applyItem: y,
    onShowError: u
  } = t, S = () => {
    w(), k();
  };
  a.current += 1;
  const m = a.current, E = () => a.current === m, H = { kind: r, token: m, filter: "", items: e };
  o && (H.isNoteMarker = o), s(H), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Ro(),
    onKey: (P) => l(P)
  }).then((P) => {
    if (i(m), P !== void 0) {
      const J = (f == null ? void 0 : f()) ?? !1;
      S();
      const C = J ? void 0 : e.find((A) => A.marker === P);
      C && y(C);
    } else E() && S();
  }).catch((P) => {
    i(m), E() && S(), u(P);
  });
}
function Bo(t, e) {
  const {
    sessionRef: r,
    editorRef: o,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: l,
    hasEditorChangedSinceFocus: d
  } = e, w = r.current;
  if (!w) return "no-session";
  const f = (y) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    y();
  };
  return Mo(t, w, {
    update: (y) => a.update(y),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (y) => f(() => {
      var u;
      s(), (u = o.current) == null || u.commitTypedMarker(y);
    }),
    commitTypedAndReopen: (y) => f(() => {
      var u;
      s(), (u = o.current) == null || u.commitTypedMarker(y, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (y) => f(() => {
      var u;
      s(), (u = o.current) == null || u.commitTypedCloser(y);
    }),
    commitItem: (y) => f(() => {
      var S;
      const u = w.items.find((m) => m.marker === y);
      u && (s(), (S = o.current) == null || S.applyMarkerMenuSelection(u, {
        trigger: "backslash",
        literalPrefixLanded: !1
      }));
    })
  }) === "ended" && l(w.token), "routed";
}
function Go({
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  K(() => {
    const o = r ?? document, a = () => {
      t() && e();
    };
    return o.addEventListener("compositionstart", a, { capture: !0 }), () => {
      o.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
function zo({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: o,
  isSessionOpen: a,
  target: s
}) {
  K(() => {
    const i = s ?? document, l = (d) => {
      var k, y;
      const w = (k = t.current) == null ? void 0 : k.querySelector(".editor-input");
      if (!w || d.target !== w) return;
      const f = (y = e.current) == null ? void 0 : y.getSelection();
      f && (r.current = f), a() && (o.current = Xr(
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
  }, [t, e, r, o, a, s]);
}
function Ho({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const o = _(
    (s) => {
      var i;
      t.current = s, r.current = void 0, (i = e.current) == null || i.setMarkerSettleSuspended(!!s);
    },
    [t, r, e]
  ), a = _(
    (s) => {
      var i;
      Oo(t, s), !t.current && (r.current = void 0, (i = e.current) == null || i.setMarkerSettleSuspended(!1));
    },
    [t, r, e]
  );
  return K(
    () => () => {
      var s;
      (s = e.current) == null || s.setMarkerSettleSuspended(!1);
    },
    [e]
  ), { setSession: o, clearSessionIfCurrent: a };
}
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function ri({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const ni = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), kr = (t, e) => t[e] ?? e;
function Uo({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = ge(), w = kr(a, "%undoButton_tooltip%"), f = kr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(qe, { children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ n(hn, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ p("p", { children: [
        w,
        s && /* @__PURE__ */ p(gt, { children: [
          " ",
          /* @__PURE__ */ n(Sr, { children: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ n(Fr, {}),
    e && /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ n(gn, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ p("p", { children: [
        f,
        s && /* @__PURE__ */ p(gt, { children: [
          " ",
          /* @__PURE__ */ n(Sr, { children: d ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Ko({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const a = I(null);
  return K(() => {
    var d;
    const s = ge(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (w) => {
      var k, y, u, S;
      if (!i || document.activeElement !== i) return;
      const f = w.key.toLowerCase();
      if (s) {
        if (!w.metaKey) return;
        !w.shiftKey && f === "z" ? (w.preventDefault(), r && ((k = e.current) == null || k.undo())) : w.shiftKey && f === "z" && (w.preventDefault(), o && ((y = e.current) == null || y.redo()));
      } else {
        if (!w.ctrlKey) return;
        !w.shiftKey && f === "z" ? (w.preventDefault(), r && ((u = e.current) == null || u.undo())) : (f === "y" || w.shiftKey && f === "z") && (w.preventDefault(), o && ((S = e.current) == null || S.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, r, e]), /* @__PURE__ */ n("div", { ref: a, children: t });
}
function Fo() {
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
  }), o = _((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return ut(() => ({ virtualRef: r, setSource: o }), [o]);
}
function $o(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Jo(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const qo = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ n("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ n("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ n("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Vo({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o,
  focusNoteText: a
}) {
  const s = I(!1), i = I(null), l = I(null), d = I(!1), [w, f] = O(t), [k, y] = O(e), [u, S] = O(!1), m = I(!1), E = I(w);
  E.current = w;
  const H = I(k);
  H.current = k, K(() => {
    f(t);
  }, [t]), K(() => {
    k !== e && y(e);
  }, [e]);
  const P = (C) => {
    if (d.current = !1, S(C), !C) {
      const A = E.current, q = H.current;
      A !== "custom" || q ? (A !== t || q !== e) && (s.current = !0, r(A, q)) : (f(t), y(e));
    }
  }, J = (C) => {
    var A, q, V, D;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((A = i.current) == null || A.focus(), d.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? ((q = l.current) == null || q.focus(), d.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((V = i.current) == null ? void 0 : V.selectionStart) === 0 && ((D = l.current) == null || D.focus(), d.current = !1), w === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && P(!1);
  };
  return /* @__PURE__ */ p(Ze, { open: u, onOpenChange: P, children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(We, { asChild: !0, children: /* @__PURE__ */ n(X, { variant: "outline", className: "tw:h-6", children: qo(t, o, e) }) }) }),
      /* @__PURE__ */ n(Ct, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      Ye,
      {
        style: { zIndex: we },
        onEscapeKeyDown: () => {
          E.current = t, H.current = e, f(t), y(e);
        },
        onCloseAutoFocus: (C) => {
          s.current && (s.current = !1, C.preventDefault(), a());
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: J,
        onMouseMove: () => {
          var C;
          d.current && ((C = i.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ n(Qe, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ n(tr, {}),
          /* @__PURE__ */ n(
            Vt,
            {
              checked: w === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: Ae })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            Vt,
            {
              checked: w === "hidden",
              onCheckedChange: () => f("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: De })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            Vt,
            {
              ref: l,
              checked: w === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                m.current = w === "custom";
              },
              onClick: (C) => {
                var A;
                if (C.stopPropagation(), m.current && C.target !== i.current) {
                  P(!1);
                  return;
                }
                d.current = !0, (A = i.current) == null || A.focus();
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ n(
                  Ur,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), f("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: k,
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
const Xo = (t, e) => t === "f" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ n(Or, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ n(Pr, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(gt, { children: [
  /* @__PURE__ */ n(Mr, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Zo = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Dn(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Wo({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o,
  focusNoteText: a
}) {
  const s = I(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ p(Ze, { children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(We, { asChild: !0, children: /* @__PURE__ */ n(X, { variant: "outline", className: "tw:h-6", children: Xo(t, r) }) }) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: Zo(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(
      Ye,
      {
        style: { zIndex: we },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), a());
        },
        children: [
          /* @__PURE__ */ n(Qe, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ n(tr, {}),
          /* @__PURE__ */ p(
            Vt,
            {
              disabled: t !== "x" && !o,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ n(Mr, {}),
                /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            Vt,
            {
              disabled: t === "x" && !o,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ n(Or, {}),
                /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            Vt,
            {
              disabled: t === "x" && !o,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ n(Pr, {}),
                /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Cr = '[aria-controls="editor-context-menu"]';
function Yo(t) {
  return t ? t.matches(Cr) ? !0 : !!t.querySelector(Cr) : !1;
}
const oi = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%",
  // These three keys are not read by this component directly; they are provided here so callers
  // can localize them and pass the result into the optional `searchPlaceholder` prop to override
  // the default search-field placeholder.
  "%markerMenu_searchPlaceholder_character%",
  "%markerMenu_searchPlaceholder_insert%",
  "%markerMenu_searchPlaceholder_paragraph%"
]);
function Qo({ icon: t, className: e }) {
  return /* @__PURE__ */ n(t ?? bn, { className: e, size: 16 });
}
function ta({ state: t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ n(ue, { size: 16 })
    }
  );
}
function Er({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
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
        t.selectionState !== void 0 && /* @__PURE__ */ n(ta, { state: t.selectionState }),
        /* @__PURE__ */ n("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ n("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(Qo, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
          /* @__PURE__ */ n("p", { className: "tw:min-w-0 tw:shrink tw:truncate tw:text-sm", title: t.title, children: t.title }),
          t.subtitle && /* @__PURE__ */ n(
            "p",
            {
              className: "tw:min-w-0 tw:shrink-[9999] tw:truncate tw:text-end tw:text-xs tw:text-muted-foreground",
              title: t.subtitle,
              children: t.subtitle
            }
          )
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ n(to, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ea({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [a, s] = O(""), [i, l] = ut(() => {
    const d = xt(a.trim().toLowerCase());
    if (!d) {
      const k = e.filter((y) => !y.isDisallowed);
      return [k.length > 0 ? k : e, []];
    }
    const w = e.filter((k) => {
      var u;
      const y = (u = k.marker) == null ? void 0 : u.toLowerCase();
      return k.isDisallowed ? y === d : y == null ? void 0 : y.includes(d);
    }), f = e.filter(
      (k) => k.title.toLowerCase().includes(d) && !w.includes(k)
    );
    return [w, f];
  }, [a, e]);
  return /* @__PURE__ */ p(Ue, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ n(
      Ke,
      {
        className: "marker-menu-search",
        ref: r,
        value: a,
        onValueChange: (d) => s(d),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ p(Fe, { children: [
      /* @__PURE__ */ n($e, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ n(ce, { children: i.map((d) => {
        var w;
        return /* @__PURE__ */ n(
          Er,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((w = d.icon) == null ? void 0 : w.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      l.length > 0 && /* @__PURE__ */ p(gt, { children: [
        i.length > 0 && /* @__PURE__ */ n(Me, { alwaysRender: !0 }),
        /* @__PURE__ */ n(ce, { children: l.map((d) => {
          var w;
          return /* @__PURE__ */ n(
            Er,
            {
              item: d,
              localizedStrings: t
            },
            `item-${d.marker ?? ((w = d.icon) == null ? void 0 : w.displayName)}-${d.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function ra(t, e, r, o, a) {
  if (!o || o === "p") return [];
  const s = se[o], i = s != null && s.children ? s : a && se[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((w) => ({
        marker: w,
        title: r[se[w].description] ?? se[w].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(w), e();
        }
      }))
    );
  }), l.sort((d, w) => (d.marker ?? d.title).localeCompare(w.marker ?? w.title));
}
function Ir(t) {
  if (!t || !Jt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function na(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function oa(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function aa(t, e) {
  let r = 0, o = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const i = t[r];
      return o !== 0 || !i || !Gt(i, a) ? !1 : (r += 1, !0);
    }
    let s = a.insert;
    for (; s.length > 0; ) {
      const i = t[r];
      if (!i || typeof i.insert != "string" || !Gt(i.attributes, a.attributes))
        return !1;
      const l = i.insert.slice(o), d = Math.min(l.length, s.length);
      if (l.slice(0, d) !== s.slice(0, d)) return !1;
      s = s.slice(d), o += d, o === i.insert.length && (r += 1, o = 0);
    }
    return !0;
  });
}
function sa(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ia(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const la = 300, _e = "*", ca = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function ai({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: w,
  inline: f = !1,
  ref: k,
  initialCaretPosition: y,
  markerPalette: u,
  onNoteEdit: S
}) {
  var gr;
  const m = I(null), E = I(null), H = I(null), P = I(s);
  K(() => {
    P.current = s;
  }, [s]);
  const J = I(y);
  K(() => {
    J.current = y;
  }, [y]);
  const C = _(() => {
    var b, N;
    const c = J.current;
    c !== void 0 && c !== "end" ? (b = m.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (N = m.current) == null || N.selectNote(0);
  }, []);
  ae(() => {
    if (f || !H.current) return;
    const c = parseFloat(getComputedStyle(H.current).width);
    c > 0 && (H.current.style.width = `${c}px`);
  }, [f]);
  const [A, q] = O("generated"), [V, D] = O("generated"), [ot, lt] = O(_e), [ft, It] = O(_e), [F, Pt] = O("f"), [Ut, _t] = O(!1), [G, at] = O(!0), [Q, ct] = O(!1), Tt = I(!1), jt = I(""), h = I(!1), L = I(void 0), z = I([]), Z = I([]), U = I(void 0), $ = I(void 0), nr = _(() => {
    var b;
    const c = (b = m.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (z.current = [...z.current, ...c], U.current = void 0);
  }, []), or = _(
    (c, b) => {
      var v, R;
      if (!c) return;
      const N = Ir(c), x = Ir(b);
      if (!N && x) {
        U.current = {
          text: z.current,
          closedNoteOp: c,
          openNoteOp: b
        }, z.current = [];
        return;
      }
      const T = U.current;
      T && (N && !x && Gt(c, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((R = (v = m.current) == null ? void 0 : v.getOpsAfterNote(0)) != null && R.length) ? (z.current = T.text, U.current = void 0) : Gt(b, T.openNoteOp) || (U.current = void 0));
    },
    []
  ), [bt, te] = O(!1), be = Fo(), [ar, Wr] = O(), sr = I(null), mt = I(
    void 0
  ), Yr = I(0), ir = I(u);
  K(() => {
    ir.current = u;
  }, [u]), K(
    () => () => {
      var c;
      mt.current && (mt.current = void 0, (c = ir.current) == null || c.dismiss());
    },
    []
  );
  const Ne = I(void 0), ve = I(void 0), ee = _(
    () => Po(
      ve.current,
      Xr(
        () => {
          var c;
          return (c = m.current) == null ? void 0 : c.getUsj();
        },
        () => {
          var c;
          return (c = m.current) == null ? void 0 : c.getSelection();
        }
      )
    ),
    []
  ), { setSession: lr, clearSessionIfCurrent: re } = Ho({
    sessionRef: mt,
    editorRef: m,
    baselineRef: ve
  }), Kt = _(() => {
    var b, N, x;
    if ((b = m.current) != null && b.getSelection()) return;
    const c = Ne.current;
    c ? (N = m.current) == null || N.setSelection(c) : (x = m.current) == null || x.selectNote(0);
  }, []), ne = _(() => {
    var c;
    Kt(), (c = m.current) == null || c.focus();
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
        ...i.view ?? In(),
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
    () => ra(
      m,
      () => te(!1),
      d,
      ar,
      F
    ),
    [d, ar, F]
  );
  K(() => {
    var c;
    bt || (c = m.current) == null || c.focus();
  }, [F, bt]);
  const At = _(() => {
    var x, T, v;
    const c = (x = E.current) == null ? void 0 : x.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), N = (v = (T = E.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : v.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), Bt = _(
    (c = !1) => {
      var N, x, T, v, R;
      S == null || S();
      const b = (x = (N = m.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && Jt("note", b) && (r == null || r([b]), c && w && P.current)) {
        const j = [
          ...z.current,
          ...((T = m.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], W = Z.current, Nt = !Gt(j, W);
        if (f && !Nt && Gt(b, L.current))
          return;
        L.current = b;
        const tt = [b];
        Nt && (W.length > 0 && aa(
          ((v = w.current) == null ? void 0 : v.getOpsAfterNote(P.current)) ?? [],
          W
        ) && tt.push({ delete: oa(W) }), tt.push(...j), Z.current = j), (R = w.current) == null || R.replaceEmbedUpdate(P.current, tt);
      }
    },
    [f, r, S, w]
  ), ye = _(
    (c) => {
      var N, x, T;
      const b = (N = m.current) == null ? void 0 : N.getSelection();
      (x = m.current) == null || x.applyUpdate([c, { delete: 1 }]), b && ((T = m.current) == null || T.setSelection(b)), ne();
    },
    [ne]
  ), cr = _(
    (c, b) => {
      var T, v, R;
      mt.current || (T = m.current) == null || T.commitPendingMarkerEdits();
      const N = (R = (v = m.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : R.at(0);
      if (!N || !Jt("note", N) || !N.insert.note) return;
      let x;
      c === "custom" ? x = b : c === "generated" ? x = Ae : x = De, N.insert.note.caller !== x && (N.insert.note.caller = x, ye(N));
    },
    [ye]
  ), Ft = I(void 0), Se = I(Bt);
  K(() => {
    Se.current = Bt;
  }, [Bt]);
  const $t = _(() => {
    Ft.current !== void 0 && (clearTimeout(Ft.current), Ft.current = void 0);
  }, []), ht = _(() => {
    Ft.current !== void 0 && ($t(), Se.current(!0));
  }, [$t]), dr = _(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, Se.current(!0);
    }, la);
  }, [$t]);
  K(() => {
    var T, v;
    let c, b, N;
    Tt.current = !1, h.current = !1, Ne.current = void 0, at(!0);
    const x = e == null ? void 0 : e.at(0);
    if (L.current = x, z.current = [], Z.current = [], U.current = void 0, $.current = void 0, x && Jt("note", x)) {
      const R = (T = x.insert.note) == null ? void 0 : T.caller;
      let j = "custom";
      R === Ae ? j = "generated" : R === De && (j = "hidden");
      const W = j === "custom" && R !== void 0 ? R : _e;
      lt(W), It(W), q(j), D(j), Pt(((v = x.insert.note) == null ? void 0 : v.style) ?? "f"), c = setTimeout(() => {
        var tt, st, vt, Dt;
        const Nt = (st = (tt = m.current) == null ? void 0 : tt.getNoteOps(0)) == null ? void 0 : st.at(0);
        (vt = m.current) == null || vt.applyUpdate(Nt ? [x, { delete: 1 }] : [x]), C(), (Dt = m.current) == null || Dt.focus(), b = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var Rt;
            At() || (C(), (Rt = m.current) == null || Rt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      ht(), J.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, ht, At, C]), ae(() => () => ht(), [ht]);
  const ur = _(() => {
    var c;
    h.current && (mt.current || (c = m.current) == null || c.commitPendingMarkerEdits(), ht());
  }, [ht]);
  fn(
    k,
    () => ({
      flushPendingEdits: ur,
      focus: () => {
        var c;
        return (c = m.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = H.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [ur]
  );
  const ke = _(() => {
    var c, b;
    if (!mt.current) {
      const N = (c = E.current) == null ? void 0 : c.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = m.current) == null || b.commitPendingMarkerEdits();
    }
    f ? ht() : ($t(), Bt(!0)), o();
  }, [$t, ht, f, o, Bt]), Ce = I(ke);
  ae(() => {
    Ce.current = ke;
  });
  const Ee = I({ book: a.book, chapterNum: a.chapterNum });
  ae(() => {
    (Ee.current.book !== a.book || Ee.current.chapterNum !== a.chapterNum) && (Ee.current = { book: a.book, chapterNum: a.chapterNum }, Ce.current());
  }, [a.book, a.chapterNum]);
  const Qr = () => {
    var b;
    const c = (b = E.current) == null ? void 0 : b.getElementsByClassName("editor-input")[0];
    c != null && c.textContent && navigator.clipboard.writeText(c.textContent);
  }, tn = _(
    (c, b) => {
      S == null || S(), q(c), lt(b), cr(c, b), f && ht();
    },
    [cr, ht, f, S]
  ), en = (c) => {
    var N, x, T, v, R;
    Pt(c), mt.current || (N = m.current) == null || N.commitPendingMarkerEdits();
    const b = (T = (x = m.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && Jt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const j = (R = (v = b.insert.note) == null ? void 0 : v.contents) == null ? void 0 : R.ops;
      F !== "x" && c === "x" ? j == null || j.forEach((W) => sa(W)) : F === "x" && c !== "x" && (j == null || j.forEach((W) => ia(W))), ye(b), f && ht();
    }
  }, rn = (c) => {
    Wr(c.contextMarker), ct(c.canRedo);
  }, nn = _(
    (c) => {
      var N, x, T, v, R, j, W;
      const b = (x = (N = m.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && Jt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var st;
          (st = m.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const Nt = (T = b.insert.note) == null ? void 0 : T.style, tt = (R = (v = b.insert.note) == null ? void 0 : v.contents) == null ? void 0 : R.ops;
        if (Nt || _t(!1), _t(
          Nt === "x" ? !!(tt != null && tt.every((st) => {
            var Dt, Rt;
            if (!((Dt = st.attributes) != null && Dt.char)) return !0;
            const vt = ((Rt = st.attributes) == null ? void 0 : Rt.char).style;
            return vt === "xt" || vt === "xo" || vt === "xq";
          })) : !!(tt != null && tt.every((st) => {
            var Dt, Rt;
            if (!((Dt = st.attributes) != null && Dt.char)) return !0;
            const vt = ((Rt = st.attributes) == null ? void 0 : Rt.char).style;
            return vt === "ft" || vt === "fr" || vt === "fq";
          }))
        ), !Tt.current) {
          Tt.current = !0, jt.current = JSON.stringify(b), $.current = b, at(!0);
          return;
        }
        h.current = !0, or($.current, b), $.current = b, (W = (j = m.current) == null ? void 0 : j.getOpsAfterNote(0)) != null && W.length && setTimeout(nr, 0), at(JSON.stringify(b) === jt.current), Bt(), f && dr();
      } else
        _t(!1), at(!0);
    },
    [
      f,
      Bt,
      dr,
      or,
      nr
    ]
  ), wr = _(() => {
    const c = window.getSelection();
    if (!xe.length || !c || c.rangeCount === 0)
      return;
    const b = E.current;
    if (!b) return;
    const N = c.getRangeAt(0).cloneRange();
    be.setSource({
      measure: () => {
        const x = $o(N);
        return x && Jo(x);
      },
      contextElement: b
    }), te(!0);
  }, [xe, be]), Ie = I(() => {
  }), fr = _(
    (c, b, N) => {
      const { anchorRect: x } = c;
      if (!u || !x) return;
      const { hasTextSelection: T } = N;
      jo({
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It no longer decides anything about focus: every marker palette focuses its list.
        kind: T ? "selection" : "backslash",
        // Space COMMITS (like Enter) when the typed filter names a NOTE marker in the stylesheet.
        // This palette's own list offers note-INTERNAL markers, but the filter is whatever the user
        // typed: `\f` here materializes a NESTED `\f ` literal, and the Tier-2 tokenizer absorbs
        // the following word into it as a caller just as it does in body text. Decided from the
        // stylesheet rather than from the offered items for exactly that reason.
        isNoteMarker: (v) => _o(Lt.styleInfo, v),
        sessionCounterRef: Yr,
        setSession: lr,
        clearSessionIfCurrent: re,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (v) => Ie.current(v),
        show: (v) => u.show({
          items: b.map(na),
          anchor: x,
          keyForwarding: v
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ee,
        focusEditor: () => {
          var v;
          return (v = m.current) == null ? void 0 : v.focus();
        },
        applyItem: (v) => {
          var R;
          return (R = m.current) == null ? void 0 : R.applyMarkerMenuSelection(v, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (v) => {
          (!Rn(v) || v.code !== Mn) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${On(v)}`
          );
        }
      });
    },
    [
      u,
      Kt,
      ee,
      Lt.styleInfo,
      lr,
      re
    ]
  ), oe = _(() => {
    var N;
    const c = (N = m.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = _n(Lt.styleInfo ?? Tn, c);
    return b.length === 0 ? !1 : (fr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [fr, Lt.styleInfo]);
  Go({
    isSessionOpen: _(() => !!mt.current, []),
    dismiss: _(() => u == null ? void 0 : u.dismiss(), [u])
  });
  const pr = _(
    (c) => {
      if (!u) return;
      Bo(c, {
        sessionRef: mt,
        editorRef: m,
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
  K(() => {
    Ie.current = pr;
  }, [pr]), zo({
    containerRef: E,
    editorRef: m,
    selectionRef: Ne,
    baselineRef: ve,
    isSessionOpen: _(() => !!mt.current, [])
  }), K(() => {
    const c = () => {
      bt && te(!1);
    };
    return window.addEventListener("click", c), () => {
      window.removeEventListener("click", c);
    };
  }, [bt]), K(() => {
    var c;
    bt && ((c = sr.current) == null || c.focus());
  }, [bt]), K(() => {
    var N;
    const c = () => {
      var x;
      return ((x = E.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
    };
    if (((N = Lt.view) == null ? void 0 : N.markerMode) === "editable") {
      const x = (v) => {
        var W, Nt, tt, st;
        if (je(v)) return;
        const R = mt.current, j = c();
        if (!(!j || document.activeElement !== j)) {
          if (R && u) {
            Ie.current(v);
            return;
          }
          if (Yo(E.current)) {
            v.key === l && (v.preventDefault(), v.stopPropagation());
            return;
          }
          if (v.key === "Enter" && !At()) {
            v.preventDefault(), v.stopPropagation(), (W = m.current) == null || W.selectNote(0), (Nt = m.current) == null || Nt.focus();
            return;
          }
          if (u && v.key === l) {
            if (!At()) {
              v.preventDefault(), v.stopPropagation(), (tt = m.current) == null || tt.selectNote(0), (st = m.current) == null || st.focus();
              return;
            }
            oe() && (v.preventDefault(), v.stopPropagation());
          }
        }
      }, T = () => {
        var R, j;
        const v = c();
        !v || document.activeElement !== v || At() || ((R = m.current) == null || R.selectNote(0), (j = m.current) == null || j.focus());
      };
      return document.addEventListener("keydown", x, { capture: !0 }), document.addEventListener("paste", T, { capture: !0 }), () => {
        document.removeEventListener("keydown", x, { capture: !0 }), document.removeEventListener("paste", T, { capture: !0 });
      };
    }
    const b = (x) => {
      const T = c();
      !bt && T && document.activeElement === T && x.key === l ? (x.preventDefault(), wr()) : bt && x.key === "Escape" && (x.preventDefault(), te(!1));
    };
    return document.addEventListener("keydown", b), () => {
      document.removeEventListener("keydown", b);
    };
  }, [
    bt,
    wr,
    l,
    (gr = Lt.view) == null ? void 0 : gr.markerMode,
    Lt.styleInfo,
    u,
    oe,
    At
  ]), K(() => {
    const c = H.current;
    if (!f || !c) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || je(N) || (N.preventDefault(), N.stopPropagation(), Ce.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [f]), K(() => {
    const c = () => {
      var x, T, v;
      const b = ((x = E.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b) return;
      const N = document.getSelection();
      N && !N.isCollapsed || At() || ((T = m.current) == null || T.selectNote(0), (v = m.current) == null || v.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [At]);
  const mr = d["%footnoteEditor_copyButton_tooltip%"], hr = /* @__PURE__ */ n(
    Uo,
    {
      onUndoClick: () => {
        var c;
        return (c = m.current) == null ? void 0 : c.undo();
      },
      onRedoClick: () => {
        var c;
        return (c = m.current) == null ? void 0 : c.redo();
      },
      canUndo: !G,
      canRedo: Q,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ p(gt, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: H,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ p("div", { className: g("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ n(
                Wo,
                {
                  isTypeSwitchable: Ut,
                  noteType: F,
                  handleNoteTypeChange: en,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              /* @__PURE__ */ n(
                Vo,
                {
                  callerType: A,
                  customCaller: ot,
                  updateCaller: tn,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              f && hr
            ] }),
            !f && /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ p(qe, { children: [
              hr,
              /* @__PURE__ */ n(
                No,
                {
                  onCancelClick: o,
                  onAcceptClick: ke,
                  canAccept: !G || V !== A || A === "custom" && ot !== ft,
                  localizedStrings: d,
                  acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ p(
            "div",
            {
              ref: E,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ n("div", { className: t, children: /* @__PURE__ */ n(
                  Ko,
                  {
                    editorRef: m,
                    canUndo: !G,
                    canRedo: Q,
                    children: /* @__PURE__ */ n(
                      Ln,
                      {
                        options: Lt,
                        onStateChange: rn,
                        onUsjChange: nn,
                        defaultUsj: ca,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: m
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ n("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ p(St, { children: [
                  /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
                    X,
                    {
                      "aria-label": mr,
                      onClick: Qr,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ n(Nn, {})
                    }
                  ) }),
                  /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: mr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ p(Ve, { open: bt, children: [
      /* @__PURE__ */ n(fo, { virtualRef: be.virtualRef }),
      /* @__PURE__ */ n(
        Xe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ n(
            ea,
            {
              markerMenuItems: xe,
              localizedStrings: d,
              searchRef: sr
            }
          )
        }
      )
    ] })
  ] });
}
function da(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const o = it(r.projectId), a = e.get(o), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(o, [s]);
  }), e.forEach((r) => r.sort((o, a) => o.scrollGroupId - a.scrollGroupId)), e;
}
function _r(t, e, r) {
  const o = it(e);
  return t.some(
    (a) => it(a.projectId) === o && a.scrollGroupId === r
  );
}
function Te(t) {
  const e = da(t.openTabs);
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
  const o = [];
  return t.projects.forEach((a) => {
    const s = e.get(it(a.id));
    if (!s || s.length === 0) {
      o.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: _r(r, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
      return;
    }
    s.forEach((i) => {
      o.push({
        rowKey: `tab:${a.id}:${i.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: _r(r, a.id, i.scrollGroupId),
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
    if (o.some(
      (l) => it(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => it(l.id) === s);
    i && o.push({
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
  }), o;
}
const er = "Selected", rr = "Unselected";
function Tr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Pn(t, e);
  if (r !== 0) return r;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - a;
}
function Be(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function ua(t) {
  const e = t.filter(Tr).sort(zt), r = t.filter((a) => !Tr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function wa(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), o = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var w;
    const d = (w = e.getSectionHeading) == null ? void 0 : w.call(
      e,
      i,
      l.map((f) => f.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? er : rr;
  }, s = [];
  return r.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: a("selected", r),
    rows: r
  }), o.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: a("unselected", o),
    rows: o
  }), s;
}
function fa(t, e) {
  if (e.id === "openTabs") return ua(t);
  if (e.id === "selection") return wa(t, e);
  if (!e.getGroupKey) return Be(t);
  const r = /* @__PURE__ */ new Map(), o = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const d = a(l.project);
    if (d === void 0 || d === "") {
      o.push(l);
      return;
    }
    const w = r.get(d);
    w ? w.push(l) : r.set(d, [l]);
  });
  const s = [...r.entries()].map(([l, d]) => {
    var k;
    const w = [...d].sort(
      (y, u) => {
        var S;
        return ((S = e.compareProjects) == null ? void 0 : S.call(e, y.project, u.project)) || zt(y, u);
      }
    ), f = ((k = e.getSectionHeading) == null ? void 0 : k.call(
      e,
      l,
      w.map((y) => y.project)
    )) ?? l;
    return { key: l, heading: f, rows: w };
  });
  s.sort((l, d) => l.key === e.priorityKey ? -1 : d.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: d.key, heading: d.heading }
  ) : l.heading.localeCompare(d.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: d, rows: w }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: d,
    rows: w,
    isPriority: l === e.priorityKey
  }));
  return o.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...o].sort(zt)
  }), i;
}
const si = [
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
function B(t, e) {
  const r = t[e];
  if (!(typeof r != "string" || !Jr(r)))
    return r;
}
const ie = "recent", pa = "other";
function Zr(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function ma(t) {
  const e = t ?? {};
  return [
    Zr(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var o;
        return typeof ((o = r.customData) == null ? void 0 : o[Zt.lastUsedAt]) == "number" ? ie : pa;
      },
      getSectionHeading: (r) => r === ie ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, o) => r.key === ie ? -1 : o.key === ie ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const o = (a = r.customData) == null ? void 0 : a[Zt.language];
        return typeof o == "string" ? o : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const o = (a = r.customData) == null ? void 0 : a[Zt.type];
        return typeof o == "string" ? o : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, o) => {
        var i;
        const a = o.find(
          (l) => {
            var d;
            return typeof ((d = l.customData) == null ? void 0 : d[Zt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Zt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const ii = ma();
function ha(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? er : e.unselectedSectionHeading ?? rr
  };
}
function li(t) {
  return {
    openTabsLabel: B(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: B(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: B(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: B(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: B(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: B(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: B(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: B(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function ci(t) {
  return {
    label: B(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const ga = 100, rt = {
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
  autoSelectionSelectedSectionHeading: er,
  autoSelectionUnselectedSectionHeading: rr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function ba(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : et(e.ariaLabel, rt.ariaLabel),
    buttonPlaceholder: et(
      e.buttonPlaceholder,
      rt.buttonPlaceholder
    ),
    commandEmptyMessage: et(
      e.commandEmptyMessage,
      rt.commandEmptyMessage
    ),
    searchPlaceholder: et(
      e.searchPlaceholder,
      rt.searchPlaceholder
    ),
    groupByAriaLabel: et(
      e.groupByAriaLabel,
      rt.groupByAriaLabel
    ),
    groupSectionLabel: et(
      e.groupSectionLabel,
      rt.groupSectionLabel
    ),
    groupByNone: et(
      e.groupByNone,
      rt.groupByNone
    ),
    openTabsSectionHeading: et(
      e.openTabsSectionHeading,
      rt.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: et(
      e.otherProjectsSectionHeading,
      rt.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: et(
      e.autoOpenTabsGroupingLabel,
      rt.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: et(
      e.autoSelectionGroupingLabel,
      rt.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: et(
      e.autoSelectionSelectedSectionHeading,
      rt.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: et(
      e.autoSelectionUnselectedSectionHeading,
      rt.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: et(
      e.boundButClosedTooltip,
      rt.boundButClosedTooltip
    ),
    openButtonLabel: et(
      e.openButtonLabel,
      rt.openButtonLabel
    ),
    clearAll: et(e.clearAll, rt.clearAll)
  };
}
function di(t) {
  return {
    searchPlaceholder: B(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: B(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: B(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: B(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: B(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: B(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: B(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: B(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: B(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: B(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: B(t, "%projectSelector_openButtonLabel%"),
    clearAll: B(t, "%projectSelector_clearAll%")
  };
}
function Qt(t) {
  return ao[jn(t)] ?? String(t);
}
const Lr = "platform.footerAction", Na = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function va({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ n(
    de,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Na,
      children: r
    }
  ) : /* @__PURE__ */ n(de, { variant: "secondary", children: r });
}
function xa({
  row: t,
  mode: e,
  strings: r,
  onClick: o,
  onOpen: a,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: d,
    open: w,
    onPointerEnter: f,
    onPointerLeave: k
  } = go(), [y, u] = O(!1), S = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || t.isDisabled && !!t.disabledReason, m = w || y, E = _(() => {
    if (S) {
      u(!0);
      return;
    }
    f();
  }, [S, f]), H = _(() => {
    u(!1), k();
  }, [k]), P = /* @__PURE__ */ n(ue, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let J;
  e === "project" ? t.openGroups.length > 0 && (J = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((V) => /* @__PURE__ */ n(de, { variant: "secondary", children: Qt(V) }, V)) })) : t.scrollGroupId !== void 0 && (J = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      va,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && a && /* @__PURE__ */ p(
      X,
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
          /* @__PURE__ */ n(xn, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const C = /* @__PURE__ */ p(
    fe,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: E,
      onPointerLeave: H,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: P }),
        l && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Bn(t) && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        J
      ]
    }
  ), A = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, q = t.isBoundButClosed && A ? r.boundButClosedTooltip.replace("{group}", A) : void 0;
  return /* @__PURE__ */ p(St, { open: m, delayDuration: 400, children: [
    /* @__PURE__ */ n(kt, { asChild: !0, children: C }),
    /* @__PURE__ */ p(
      Ct,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", dir: "auto", children: jr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && A && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              A,
              ")"
            ] })
          ] }),
          q && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: q }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ n("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function ya({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: o
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ p(Ze, { children: [
    /* @__PURE__ */ p(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(We, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          variant: "ghost",
          size: "sm",
          className: g(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": o.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ n(vn, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ n(Ct, { children: o.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
      Ye,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: we },
        children: [
          /* @__PURE__ */ n(Qe, { children: o.groupSectionLabel }),
          /* @__PURE__ */ p(bo, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ n(xr, { value: Xt, children: o.groupByNone }),
            /* @__PURE__ */ n(tr, {}),
            t.map((s) => /* @__PURE__ */ n(xr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Sa(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function ui(t) {
  const [e, r] = O(!1), [o, a] = O(""), s = ut(() => ba(t.localizedStrings), [t.localizedStrings]), i = ut(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(Zr(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      ha({
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
  ]), [l, d] = O(void 0), w = ut(
    () => Sa(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = l ?? w, k = I(null), [y, u] = O(void 0), S = _((h) => {
    r(h), h || (a(""), u(void 0));
  }, []);
  K(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const L = k.current;
      L && L.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const m = ut(() => t.mode === "project" ? Te({
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
    const h = o.trim().toLowerCase();
    return h ? m.filter(
      (L) => L.shortName.toLowerCase().includes(h) || (L.fullName ?? "").toLowerCase().includes(h)
    ) : m;
  }, [m, o]), H = ut(
    () => new Map(t.projects.map((h) => [it(h.id), h])),
    [t.projects]
  ), P = _(
    (h) => h === void 0 ? void 0 : H.get(it(h)),
    [H]
  ), { renderProjectIndicator: J } = t, C = _(
    (h) => J ? J(h.project) : void 0,
    [J]
  ), A = !!J, q = !!t.footerAction && E.length === 0, V = ut(() => {
    if (f === Xt) return Be(E);
    const h = i.find((L) => L.id === f);
    return h ? fa(E, h) : Be(E);
  }, [E, f, i]), D = (h) => {
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, ot = (h) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: h.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const L = t.selection.pairs, z = it(h.projectId), Z = ($) => it($.projectId) === z && $.scrollGroupId === h.scrollGroupId, U = L.some(Z) ? L.filter(($) => !Z($)) : [
          ...L.filter(($) => !Z($)),
          { projectId: h.projectId, scrollGroupId: h.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: U });
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
  }, ft = t.mode === "project" ? t.renderTriggerLabel : void 0, It = t.mode === "project" ? t.triggerLabelFormat : void 0, F = ut(() => {
    switch (t.mode) {
      case "project": {
        const h = P(t.selection.projectId);
        if (ft)
          return { node: ft(h), title: "", hasSelection: !!h };
        let L = h ? h.shortName : s.buttonPlaceholder;
        return h && It === "shortNameAndFullName" && (L = jr(h)), { node: L, title: L, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const L = [];
        if (h.forEach((U) => {
          const $ = P(U.projectId);
          $ && L.push({ project: $, scrollGroupId: U.scrollGroupId });
        }), L.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const z = L.map(
          ({ project: U, scrollGroupId: $ }) => $ === void 0 ? U.shortName : `${U.shortName} (${Qt($)})`
        ).join(", "), Z = L.length.toString();
        return {
          node: /* @__PURE__ */ p(gt, { children: [
            /* @__PURE__ */ n(de, { variant: "muted", className: "tw:shrink-0", children: Z }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: z })
          ] }),
          title: `${Z} ${z}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = P(t.selection.projectId);
        if (!h) {
          const Z = s.buttonPlaceholder;
          return { node: Z, title: Z, hasSelection: !1 };
        }
        const L = t.selection.scrollGroupId;
        if (L === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const z = Qt(L);
        return {
          node: `${h.shortName} · ${z}`,
          title: `${h.shortName} · ${z}`,
          accessibleTitle: `${h.shortName}, ${z}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    P,
    t.selection,
    ft,
    It,
    s.buttonPlaceholder
  ]), Pt = I(null), [Ut, _t] = O(!1);
  K(() => {
    const h = Pt.current;
    if (!h) return;
    const L = (Z) => {
      _t(Z < ga);
    };
    if (L(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const z = new ResizeObserver((Z) => {
      Z.forEach((U) => {
        const [$] = U.borderBoxSize;
        L($ ? $.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return z.observe(h, { box: "border-box" }), () => z.disconnect();
  }, []);
  let G;
  t.isLoading ? G = /* @__PURE__ */ n(yn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ n(Rr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ n(Sn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? D : void 0, Q = s.ariaLabel && F.hasSelection && F.title ? `${s.ariaLabel}: ${F.accessibleTitle ?? F.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ p(
    X,
    {
      ref: Pt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": Q,
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
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof F.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: F.node }) : F.node }),
        G
      ]
    }
  ), Tt = F.title ? /* @__PURE__ */ n(Et, { delayDuration: 400, children: /* @__PURE__ */ p(St, { children: [
    /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(Pe, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ n(Ct, { dir: "auto", children: F.title })
  ] }) }) : /* @__PURE__ */ n(Pe, { asChild: !0, children: ct }), jt = i.length > 1;
  return /* @__PURE__ */ p(Ve, { open: e, onOpenChange: S, children: [
    Tt,
    /* @__PURE__ */ n(
      Xe,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ n(Et, { delayDuration: 400, children: /* @__PURE__ */ p(
          Ue,
          {
            shouldFilter: !1,
            value: q ? y ?? Lr : void 0,
            onValueChange: u,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
                  Ke,
                  {
                    value: o,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                jt && /* @__PURE__ */ n(
                  ya,
                  {
                    availableGroupings: i,
                    activeGrouping: f,
                    onChangeGrouping: d,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ n(X, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(Fe, { children: [
                /* @__PURE__ */ n($e, { children: s.commandEmptyMessage }),
                V.map((h, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    pn,
                    {
                      children: [
                        /* @__PURE__ */ n(ce, { heading: ka(h, s), children: h.rows.map((z) => /* @__PURE__ */ n(
                          xa,
                          {
                            row: z,
                            mode: t.mode,
                            strings: s,
                            onClick: ot,
                            onOpen: at,
                            selectedRowRef: k,
                            indicator: C(z),
                            reserveIndicatorSlot: A
                          },
                          z.rowKey
                        )) }),
                        L < V.length - 1 && /* @__PURE__ */ n(Me, { alwaysRender: !0 })
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
                /* @__PURE__ */ p("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  E.length > 0 && /* @__PURE__ */ n(
                    Me,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    fe,
                    {
                      forceMount: !0,
                      value: Lr,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var h;
                        (h = t.footerAction) == null || h.onSelect(), S(!1);
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
function ka(t, e) {
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
const Ca = Ar(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = pt();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": o }, a),
        children: [
          /* @__PURE__ */ n(
            kn,
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            Ur,
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
          t && /* @__PURE__ */ p(
            X,
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
                /* @__PURE__ */ n(Dr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Ca.displayName = "SearchBar";
const Ea = 5;
function wi(t) {
  return oo(t).filter(
    (e) => !nt.isObsolete(nt.bookIdToNumber(e))
  );
}
function Ia(t, e) {
  return t.filter((r) => {
    try {
      return Gn(r) === e;
    } catch {
      return !1;
    }
  });
}
const fi = (t, e, r) => Ia(t, e).every((o) => r.includes(o));
function _a(t, e) {
  return [
    ...new Set(t.map((o) => o.toUpperCase()))
  ].filter((o) => nt.bookIdToNumber(o) > 0).sort((o, a) => nt.bookIdToNumber(o) - nt.bookIdToNumber(a)).map((o) => so(o, e));
}
function pi(t, e, r, o) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = _a(t, o);
  if (i.length !== 0)
    return i.length <= Ea ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function mi({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ n(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: g("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function Ta({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function La({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Aa = Ot(
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
function Da({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Aa({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function hi({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Ra({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Ma({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function gi({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: o,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(Ta, { className: g(s), role: a, children: [
    /* @__PURE__ */ p(La, { children: [
      /* @__PURE__ */ n(Da, { variant: "icon", children: o ?? /* @__PURE__ */ n(Cn, {}) }),
      /* @__PURE__ */ n(Ra, { children: t })
    ] }),
    r && /* @__PURE__ */ n(Ma, { children: /* @__PURE__ */ n(X, { onClick: () => r(), children: e }) })
  ] });
}
const Oa = Ar(({ className: t, ...e }, r) => /* @__PURE__ */ n(En, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
Oa.displayName = "Spinner";
const Pa = Ot(
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
function bi({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Pa({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Ni({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function vi({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function xi({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    He.Group,
    {
      "data-slot": "resizable-panel-group",
      className: g(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...a
    }
  );
}
function le(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function yi({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    He.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: le(t),
      minSize: le(e),
      maxSize: le(r),
      collapsedSize: le(o),
      ...a
    }
  );
}
function Si({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    He.Separator,
    {
      "data-slot": "resizable-handle",
      className: g(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Vt as $,
  Ns as A,
  X as B,
  fe as C,
  Ze as D,
  qe as E,
  Fr as F,
  Fe as G,
  $e as H,
  ps as I,
  zs as J,
  Us as K,
  xs as L,
  ns as M,
  ss as N,
  is as O,
  Ve as P,
  cs as Q,
  Hs as R,
  ge as S,
  Et as T,
  No as U,
  Ks as V,
  de as W,
  lo as X,
  Js as Y,
  $s as Z,
  tr as _,
  so as a,
  Si as a$,
  Br as a0,
  Ws as a1,
  Qs as a2,
  qs as a3,
  Vs as a4,
  Ys as a5,
  Xs as a6,
  Ms as a7,
  bo as a8,
  xr as a9,
  Qn as aA,
  Sr as aB,
  bi as aC,
  vi as aD,
  Ni as aE,
  Is as aF,
  as as aG,
  ds as aH,
  Zn as aI,
  Xn as aJ,
  os as aK,
  Ko as aL,
  Ta as aM,
  Ma as aN,
  Ra as aO,
  La as aP,
  Da as aQ,
  mi as aR,
  hi as aS,
  ai as aT,
  la as aU,
  ri as aV,
  ea as aW,
  fo as aX,
  As as aY,
  Ts as aZ,
  Ls as a_,
  ei as aa,
  oi as ab,
  ni as ac,
  Ur as ad,
  ui as ae,
  Ca as af,
  wi as ag,
  Ia as ah,
  Me as ai,
  gs as aj,
  fi as ak,
  _s as al,
  ls as am,
  ao as an,
  Es as ao,
  Cs as ap,
  Ps as aq,
  Bs as ar,
  js as as,
  Rs as at,
  Gs as au,
  ks as av,
  qr as aw,
  me as ax,
  he as ay,
  Wn as az,
  St as b,
  yi as b0,
  xi as b1,
  gi as b2,
  Oa as b3,
  ti as b4,
  Zs as b5,
  Ds as b6,
  Uo as b7,
  we as b8,
  es as b9,
  ii as bA,
  To as bB,
  Ro as bC,
  Mo as bD,
  Po as bE,
  Yo as bF,
  _o as bG,
  ma as bH,
  ha as bI,
  na as bJ,
  rs as bK,
  Lo as bL,
  Bo as bM,
  jo as bN,
  xt as bO,
  pi as bP,
  Go as bQ,
  zo as bR,
  Ho as bS,
  ts as ba,
  qn as bb,
  Jn as bc,
  Ya as bd,
  Wa as be,
  Qa as bf,
  Za as bg,
  yo as bh,
  co as bi,
  Gr as bj,
  Ir as bk,
  Fs as bl,
  Jo as bm,
  $o as bn,
  Eo as bo,
  Fo as bp,
  ms as bq,
  Xt as br,
  rt as bs,
  si as bt,
  Vn as bu,
  li as bv,
  di as bw,
  ci as bx,
  Xr as by,
  Oo as bz,
  g as c,
  kt as d,
  Ct as e,
  Ss as f,
  bs as g,
  We as h,
  Ye as i,
  Qe as j,
  Os as k,
  ws as l,
  fs as m,
  vs as n,
  ce as o,
  pt as p,
  no as q,
  et as r,
  hs as s,
  ys as t,
  go as u,
  Pe as v,
  Xe as w,
  us as x,
  Ue as y,
  Ke as z
};
//# sourceMappingURL=resizable-CBRlYq-i.js.map
