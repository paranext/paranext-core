import { jsx as n, jsxs as m, Fragment as ut } from "react/jsx-runtime";
import { Slot as xt, Dialog as F, Popover as nt, Tooltip as tt, Label as ce, RadioGroup as bt, ToggleGroup as Mt, Separator as ue, DropdownMenu as z } from "radix-ui";
import { IconX as we, IconSearch as me, IconCheck as yt, IconChevronRight as fe } from "@tabler/icons-react";
import { Canon as A } from "@sillsdev/scripture";
import G, { useState as X, useRef as kt, useCallback as H, createContext as pe, useContext as he, useMemo as Z, useEffect as ge, Fragment as be, forwardRef as jt } from "react";
import { cva as W } from "class-variance-authority";
import { ChevronsUpDown as _t, Check as Ut, Star as Ne, SlidersHorizontal as ve, ArrowRight as xe, Loader2 as ye, ChevronDown as ke, Search as Ie, X as Se, AlertTriangle as Ce, LoaderCircle as Ee } from "lucide-react";
import { Section as q, MODIFIER_KEYS as Te, normalizeProjectId as L, getLocalizeKeyForScrollGroupId as ze, getSectionForBook as Ge } from "platform-bible-utils";
import { filterAndRankItems as Tt } from "@eten-tech-foundation/platform-editor";
import { Command as Y } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as It from "react-resizable-panels";
import { clsx as Ae } from "clsx";
import { extendTailwindMerge as De, twMerge as Le } from "tailwind-merge";
const Re = De({ prefix: "tw" });
function Nt(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function Pe(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Nt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((c, f) => f !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((c, f) => f !== r), `!${s}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const s = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Be(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = Nt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = Nt(e), i = s.some((c) => c.startsWith("-tw-")), l = s.some((c) => c.startsWith("!tw-"));
  if (i && o.startsWith("-")) {
    const c = o.slice(1);
    return [...r, `-tw-${c}`].join(":");
  }
  if (l && o.startsWith("!")) {
    const c = o.slice(1);
    return [...r, `!tw-${c}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
function d(...t) {
  const e = Ae(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Re(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((c) => {
    const f = Pe(c);
    r.set(f.normalized, f.original), o.push(f.normalized);
  }), Le(o.join(" ")).split(" ").filter(Boolean).map((c) => {
    const f = r.get(c);
    return f ? Be(c, f) : c;
  }).join(" ");
}
const Oe = 600, $t = 650, wr = 400, Me = 450, je = 500, _e = 550, mr = 650, fr = 700, Ht = W(
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
  ...o
}) {
  const s = r ? xt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: d(Ht({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Vt = "layoutDirection";
function $() {
  const t = localStorage.getItem(Vt);
  return t === "rtl" ? t : "ltr";
}
function pr(t) {
  localStorage.setItem(Vt, t);
}
function hr({ ...t }) {
  return /* @__PURE__ */ n(F.Root, { "data-slot": "dialog", ...t });
}
function gr({ ...t }) {
  return /* @__PURE__ */ n(F.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ue({ ...t }) {
  return /* @__PURE__ */ n(F.Portal, { "data-slot": "dialog-portal", ...t });
}
function br({ ...t }) {
  return /* @__PURE__ */ n(F.Close, { "data-slot": "dialog-close", ...t });
}
function $e({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    F.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: d(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Me, ...e },
      ...a
    }
  );
}
function Nr({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...s
}) {
  const i = $();
  return /* @__PURE__ */ m(Ue, { children: [
    /* @__PURE__ */ n($e, { className: r }),
    /* @__PURE__ */ m(
      F.Content,
      {
        "data-slot": "dialog-content",
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: je, ...o },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ n(F.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(U, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(we, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function vr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function xr({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ m(
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
        e && /* @__PURE__ */ n(F.Close, { asChild: !0, children: /* @__PURE__ */ n(U, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    F.Title,
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
function kr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    F.Description,
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
function He({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
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
function Ve({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Fe = W(
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
function Ke({
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
        className: d(Fe({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
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
function Ft({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Y,
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
function Kt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const o = $(), s = G.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !a || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), c = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      c && (i.preventDefault(), i.stopPropagation(), c.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ m(Ve, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        Y.Input,
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
      /* @__PURE__ */ n(Ke, { children: /* @__PURE__ */ n(me, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Jt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Y.List,
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
function Xt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Y.Empty,
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
function Wt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Y.Group,
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
function zt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Y.Separator,
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
function St({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ m(
    Y.Item,
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
        /* @__PURE__ */ n(yt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ir({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Je = [
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
], Xe = (t) => {
  var e;
  return ((e = Je[t]) == null ? void 0 : e.chapters) ?? -1;
}, We = A.allBookIds.filter(
  (t) => !A.isObsolete(A.bookIdToNumber(t))
);
function qe(t) {
  const e = [], a = Math.min(t.length, A.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(A.bookNumberToId(r + 1));
  return e;
}
function k(t) {
  return `%scrollGroup_${t}%`;
}
const Ze = {
  [k("undefined")]: "Ø",
  [k(0)]: "A",
  [k(1)]: "B",
  [k(2)]: "C",
  [k(3)]: "D",
  [k(4)]: "E",
  [k(5)]: "F",
  [k(6)]: "G",
  [k(7)]: "H",
  [k(8)]: "I",
  [k(9)]: "J",
  [k(10)]: "K",
  [k(11)]: "L",
  [k(12)]: "M",
  [k(13)]: "N",
  [k(14)]: "O",
  [k(15)]: "P",
  [k(16)]: "Q",
  [k(17)]: "R",
  [k(18)]: "S",
  [k(19)]: "T",
  [k(20)]: "U",
  [k(21)]: "V",
  [k(22)]: "W",
  [k(23)]: "X",
  [k(24)]: "Y",
  [k(25)]: "Z"
};
function Ct(t, e) {
  return Xe(A.bookIdToNumber(t));
}
function mt(t, e, a) {
  const r = A.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = A.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (o = i, s = l);
  }), o;
}
function Sr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = mt(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Ct(s), 1),
      verseNum: 1
    };
}
function Cr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < Ct(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = mt(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Er(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = mt(r, e, "previous");
  if (!i) return;
  const l = Math.max(Ct(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Tr(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = mt(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function zr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Gr = (t, e, a, r, o) => {
  switch (t) {
    case q.OT:
      return e ?? "Old Testament";
    case q.NT:
      return a ?? "New Testament";
    case q.DC:
      return r ?? "Deuterocanon";
    case q.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Ar = (t, e, a, r, o) => {
  switch (t) {
    case q.OT:
      return e ?? "OT";
    case q.NT:
      return a ?? "NT";
    case q.DC:
      return r ?? "DC";
    case q.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Dr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? A.bookIdToEnglishName(t);
}
function Ye(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const Lr = Object.fromEntries(
  We.map((t) => [t, A.bookIdToEnglishName(t)])
);
function Rr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = A.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(o.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function qt({ ...t }) {
  return /* @__PURE__ */ n(nt.Root, { "data-slot": "popover", ...t });
}
function vt({ ...t }) {
  return /* @__PURE__ */ n(nt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Zt = G.createContext(null);
function Pr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(Zt.Provider, { value: t, children: e });
}
function Yt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = $(), i = G.useContext(Zt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(nt.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      nt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Oe, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function Br({ ...t }) {
  return /* @__PURE__ */ n(nt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Or({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: d("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Mr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: d("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function jr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: d("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Gt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    tt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Qt({ ...t }) {
  return /* @__PURE__ */ n(tt.Root, { "data-slot": "tooltip", ...t });
}
function te({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    tt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? d(Ht({ variant: e }), t) : t,
      ...a
    }
  );
}
function ee({
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
  arrowClassName: o,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ n(tt.Portal, { children: /* @__PURE__ */ m(
    tt.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: _e, ...a },
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ n(
          tt.Arrow,
          {
            className: d(
              "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
              "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
              "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
              o
            )
          }
        )
      ]
    }
  ) });
}
function Qe() {
  const [t, e] = X(!1), a = kt(null), r = H(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = H(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function _r({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    ce.Root,
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
function Ur({
  className: t,
  ...e
}) {
  const a = $();
  return /* @__PURE__ */ n(
    bt.Root,
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
function $r({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    bt.Item,
    {
      "data-slot": "radio-group-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        bt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const ta = W(
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
), ae = G.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Hr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: o = "horizontal",
  children: s,
  ...i
}) {
  const l = $();
  return /* @__PURE__ */ n(
    Mt.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": o,
      style: { "--gap": r },
      className: d(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...i,
      children: /* @__PURE__ */ n(
        ae.Provider,
        {
          value: G.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: o }),
            [e, a, r, o]
          ),
          children: s
        }
      )
    }
  );
}
function Vr({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...o
}) {
  const s = G.useContext(ae);
  return /* @__PURE__ */ n(
    Mt.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: d(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        ta({
          variant: s.variant || a,
          size: s.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
}
function ea({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    ue.Root,
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
const aa = W(
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
function Fr({
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
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        aa({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Kr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? xt.Root : "div";
  return /* @__PURE__ */ n(
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
function Jr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    ea,
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
function Xr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Wr() {
  return /Windows/i.test(navigator.userAgent);
}
const ra = ["input", "select", "textarea", "button"], oa = ["button", "textbox"], qr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = kt(null), [s, i] = X(void 0), [l, c] = X(void 0), f = H(
    (u) => {
      i(u);
      const N = t.find((b) => b.id === u);
      N && (e == null || e(N));
      const g = document.getElementById(u);
      g && (g.scrollIntoView({ block: "center" }), g.focus()), o.current && o.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), h = H(
    (u) => {
      const N = t.find((g) => g.id === u);
      N && (c((g) => g === u ? void 0 : u), a == null || a(N));
    },
    [a, t]
  ), v = (u) => {
    if (!u) return !1;
    const N = u.tagName.toLowerCase();
    if (u.isContentEditable || ra.includes(N)) return !0;
    const g = u.getAttribute("role");
    if (g && oa.includes(g)) return !0;
    const b = u.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, S = H(
    (u) => {
      var _;
      const N = u.target, g = (I) => I ? document.getElementById(I) : void 0, b = g(l), D = g(s);
      if (!!(b && N && b.contains(N) && N !== b) && v(N)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !N.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const I = t.find((E) => E.id === l);
            I && f(I.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!b) return;
          const I = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (I.length === 0) return;
          const E = I.findIndex((B) => B === N);
          if (E === -1) return;
          let C;
          u.key === "ArrowDown" ? C = Math.min(E + 1, I.length - 1) : C = Math.max(E - 1, 0), C !== E && (u.preventDefault(), u.stopPropagation(), (_ = I[C]) == null || _.focus());
          return;
        }
        return;
      }
      const K = t.findIndex((I) => I.id === s);
      let P = K;
      switch (u.key) {
        case "ArrowDown":
          P = Math.min(K + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(K - 1, 0), u.preventDefault();
          break;
        case "Home":
          P = 0, u.preventDefault();
          break;
        case "End":
          P = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && h(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const I = D;
          if (I) {
            const E = I.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), C = I.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), B = E ?? C;
            if (B) {
              u.preventDefault(), B.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (v(N) || (r == null || r(u.key), u.preventDefault()));
          return;
      }
      const J = t[P];
      J && f(J.id);
    },
    [t, f, s, l, h, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: S,
    /** Focus an option by its ID */
    focusOption: f
  };
}, na = W(
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
function wt({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? xt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        na({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const re = pe(void 0);
function ft() {
  const t = he(re);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const pt = W("", {
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
function sa({ variant: t = "default", ...e }) {
  const a = $(), r = G.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(re.Provider, { value: r, children: /* @__PURE__ */ n(z.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function Zr({
  ...t
}) {
  return /* @__PURE__ */ n(z.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ia({
  ...t
}) {
  return /* @__PURE__ */ n(z.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function la({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const s = $();
  return /* @__PURE__ */ n(z.Portal, { children: /* @__PURE__ */ n(
    z.Content,
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
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n("div", { dir: s, children: r })
    }
  ) });
}
function Yr({ ...t }) {
  return /* @__PURE__ */ n(z.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Qr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = $(), s = ft();
  return /* @__PURE__ */ n(
    z.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: d(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        pt({ variant: s.variant })
      ),
      dir: o,
      ...r
    }
  );
}
function da({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const s = $(), i = ft();
  return /* @__PURE__ */ m(
    z.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        pt({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(yt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ca({
  ...t
}) {
  return /* @__PURE__ */ n(z.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function At({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = $(), s = ft();
  return /* @__PURE__ */ m(
    z.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        pt({ variant: s.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(yt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Dt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    z.Label,
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
function ua({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    z.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: d("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function to({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: d(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function eo({ ...t }) {
  return /* @__PURE__ */ n(z.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function ao({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = ft();
  return /* @__PURE__ */ m(
    z.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: d(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        pt({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(fe, { className: "tw:ms-auto" })
      ]
    }
  );
}
function ro({ className: t, children: e, ...a }) {
  const r = $();
  return /* @__PURE__ */ n(
    z.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...a,
      children: /* @__PURE__ */ n("div", { dir: r, children: e })
    }
  );
}
function oo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: d("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const Lt = `
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
function wa(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function st(t, e) {
  const a = e ? `${Lt}, ${e}` : Lt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && wa(r)
  );
}
function no({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = G.useRef(null);
  G.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), G.useEffect(() => {
    const i = o.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        st(i, '[tabindex]:not([tabindex="-1"])').forEach((h) => {
          h.setAttribute("tabindex", "-1");
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
    const { current: l } = o;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), st(l)[0].focus();
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
        className: d("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: o,
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
function so({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ n(
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
function io({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: d("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function lo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function ma(t) {
  G.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? st(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < o.length && o[i].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
function fa(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function pa(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function co({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...s
}) {
  const i = G.useRef(null);
  G.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), ma(i);
  const l = G.useMemo(
    () => i.current ? st(i.current) : [],
    [i]
  ), c = G.useCallback(
    (h) => {
      const { current: v } = i;
      if (!v || !v.parentElement) return;
      const S = v.closest("table"), u = S ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        st(S).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], N = u.indexOf(v), g = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (h.key === "ArrowDown" || h.key === "ArrowUp")
        h.preventDefault(), pa(u, N, h.key);
      else if (h.key === "ArrowLeft" || h.key === "ArrowRight")
        h.preventDefault(), fa(l, g, h.key);
      else if (h.key === "Escape") {
        h.preventDefault();
        const b = v.closest("table");
        b && b.focus();
      }
      e == null || e(h);
    },
    [i, l, e]
  ), f = G.useCallback(
    (h) => {
      r && (a == null || a(h));
    },
    [r, a]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: f,
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
function uo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function wo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function mo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: d("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function fo({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: f = void 0,
  onOpenChange: h = void 0,
  isDisabled: v = !1,
  sortSelected: S = !1,
  icon: u = void 0,
  className: N = void 0,
  variant: g = "ghost",
  id: b
}) {
  const [D, j] = X(!1), Q = H(
    (C) => {
      var O;
      const B = (O = t.find((V) => V.label === C)) == null ? void 0 : O.value;
      B && a(
        e.includes(B) ? e.filter((V) => V !== B) : [...e, B]
      );
    },
    [t, e, a]
  ), K = () => c || r, P = Z(() => {
    if (!S) return t;
    const C = t.filter((O) => O.starred).sort((O, V) => O.label.localeCompare(V.label)), B = t.filter((O) => !O.starred).sort((O, V) => {
      const lt = e.includes(O.value), dt = e.includes(V.value);
      return lt && !dt ? -1 : !lt && dt ? 1 : O.label.localeCompare(V.label);
    });
    return [...C, ...B];
  }, [t, e, S]), J = () => {
    a(t.map((C) => C.value));
  }, _ = () => {
    a([]);
  }, I = f ?? D;
  return /* @__PURE__ */ n("div", { id: b, className: N, children: /* @__PURE__ */ m(qt, { open: I, onOpenChange: h ?? j, children: [
    /* @__PURE__ */ n(vt, { asChild: !0, children: /* @__PURE__ */ m(
      U,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": I,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: v,
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            u && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: u }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: d(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: K()
              }
            )
          ] }),
          /* @__PURE__ */ n(_t, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Yt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Ft, { children: [
      /* @__PURE__ */ n(
        Kt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      o && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(U, { variant: "ghost", size: "sm", onClick: J, children: s }),
        /* @__PURE__ */ n(U, { variant: "ghost", size: "sm", onClick: _, children: i })
      ] }),
      /* @__PURE__ */ m(Jt, { children: [
        /* @__PURE__ */ n(Xt, { children: l }),
        /* @__PURE__ */ n(Wt, { children: P.map((C) => /* @__PURE__ */ m(
          St,
          {
            value: C.label,
            onSelect: Q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                Ut,
                {
                  className: d(
                    "tw:h-4 tw:w-4",
                    e.includes(C.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              C.starred && /* @__PURE__ */ n(Ne, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: C.label }),
              C.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: C.secondaryLabel })
            ]
          },
          C.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function ot(t) {
  return t.replace(/^\+/, "");
}
function ha(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = ot(e).toLowerCase();
  return a === "passive" ? Tt({
    query: o,
    items: r,
    filter: (s) => ot(s.label).toLowerCase().startsWith(o),
    sortBy: "label"
  }) : Tt({
    query: o,
    items: r,
    filter: (s) => ot(s.label).toLowerCase().includes(o),
    sortBy: "label"
  });
}
function ga(t) {
  return t.isComposing || t.keyCode === 229;
}
const oe = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, ba = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Na = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function va(t) {
  return [
    ...ba,
    ...Na.filter((e) => oe[t].test(e))
  ];
}
function M(t) {
  t.preventDefault(), t.stopPropagation();
}
function po(t, e, a) {
  var o, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (M(t), a.commit(), "ended") : t.key === "Escape" ? (M(t), a.dismiss(), "ended") : "passed";
  if (ga(t) || Te.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((o = t.getModifierState) != null && o.call(t, "AltGraph")))
    return t.key === "Enter" && M(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return M(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return M(t), ha(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return M(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return M(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    M(t);
    const i = ot(e.filter).toLowerCase(), l = e.items.find(
      (c) => ot(c.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (M(t), a.dismiss(), "ended") : (M(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (M(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (M(t), a.dismiss(), "ended") : t.key === "Backspace" || oe[r].test(t.key) ? (M(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && M(t), a.dismiss(), "ended");
}
function ho(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function go(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: o,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: c,
    restoreSelectionIfLost: f,
    focusEditor: h,
    applyItem: v,
    onShowError: S
  } = t;
  o.current += 1;
  const u = o.current, N = a ? "backslash" : "selection", g = { kind: N, token: u, filter: "", items: e };
  N === "backslash" && r && (g.shouldSpaceCommit = r), s(g), c({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: va(N),
    onKey: (b) => l(b)
  }).then((b) => {
    if (i(u), b !== void 0) {
      f(), h();
      const D = e.find((j) => j.marker === b);
      D && v(D);
    } else a || h();
  }).catch((b) => {
    i(u), a || h(), S(b);
  });
}
function bo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function No({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: d("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function xa(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = L(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function Rt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function ht(t) {
  const e = xa(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId === void 0 ? void 0 : L(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(L(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        language: s.language,
        languageCode: s.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: o !== void 0 && o === L(s.id),
        isMuted: i.length === 0,
        isBoundButClosed: !1,
        isDisabled: s.isDisabled === !0,
        disabledReason: s.disabledReason,
        versificationId: s.versificationId,
        versificationName: s.versificationName,
        type: s.type,
        typeName: s.typeName,
        lastUsedAt: s.lastUsedAt
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
  return t.projects.forEach((o) => {
    const s = e.get(L(o.id));
    if (!s || s.length === 0) {
      r.push({
        rowKey: `project:${o.id}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Rt(a, o.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName,
        type: o.type,
        typeName: o.typeName,
        lastUsedAt: o.lastUsedAt
      });
      return;
    }
    s.forEach((i) => {
      r.push({
        rowKey: `tab:${o.id}:${i.scrollGroupId}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Rt(a, o.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName,
        type: o.type,
        typeName: o.typeName,
        lastUsedAt: o.lastUsedAt
      });
    });
  }), a.forEach((o) => {
    if (o.scrollGroupId === void 0 || r.some((i) => i.projectId === o.projectId && i.scrollGroupId === o.scrollGroupId))
      return;
    const s = t.projects.find((i) => i.id === o.projectId);
    s && r.push({
      rowKey: `closed:${s.id}:${o.scrollGroupId}`,
      projectId: s.id,
      shortName: s.shortName,
      fullName: s.fullName,
      language: s.language,
      languageCode: s.languageCode,
      scrollGroupId: o.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: s.isDisabled === !0,
      disabledReason: s.disabledReason,
      versificationId: s.versificationId,
      versificationName: s.versificationName,
      type: s.type,
      typeName: s.typeName,
      lastUsedAt: s.lastUsedAt
    });
  }), r;
}
function Pt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function R(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function Bt(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(R) }];
  const a = t.filter(Pt).sort(R), r = t.filter((s) => !Pt(s)).sort(R);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function ya(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((l) => {
    const c = l.versificationId;
    if (c === void 0 || c === "") {
      o.push(l);
      return;
    }
    const f = l.versificationName ?? c, h = r.get(c);
    h ? (h.rows.push(l), !h.label && l.versificationName && (h.label = l.versificationName)) : r.set(c, { label: f, rows: [l] });
  });
  const s = [...r.entries()].map(([l, { label: c, rows: f }]) => ({
    id: l,
    label: c,
    rows: [...f].sort(R)
  }));
  s.sort((l, c) => l.id === e ? -1 : c.id === e ? 1 : l.label.localeCompare(c.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: l, label: c, rows: f }) => ({
    kind: "versification",
    rows: f,
    label: c,
    isPriority: l === e
  }));
  return o.length > 0 && i.push({
    kind: "versification",
    rows: [...o].sort(R),
    label: a,
    isPriority: !1
  }), i;
}
function ka(t, e) {
  const a = /* @__PURE__ */ new Map(), r = [];
  t.forEach((i) => {
    const l = i.language;
    if (!l) {
      r.push(i);
      return;
    }
    const c = a.get(l);
    c ? c.push(i) : a.set(l, [i]);
  });
  const o = [...a.entries()].map(([i, l]) => ({
    label: i,
    rows: [...l].sort(R)
  }));
  o.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = o.map(({ label: i, rows: l }) => ({
    kind: "language",
    rows: l,
    label: i
  }));
  return r.length > 0 && s.push({
    kind: "language",
    rows: [...r].sort(R),
    label: e
  }), s;
}
function Ia(t, e) {
  const a = /* @__PURE__ */ new Map(), r = [];
  t.forEach((i) => {
    const l = i.type;
    if (!l) {
      r.push(i);
      return;
    }
    const c = i.typeName ?? l, f = a.get(l);
    f ? (f.rows.push(i), f.label === l && i.typeName && (f.label = i.typeName)) : a.set(l, { label: c, rows: [i] });
  });
  const o = [...a.values()].map(({ label: i, rows: l }) => ({
    label: i,
    rows: [...l].sort(R)
  }));
  o.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = o.map(({ label: i, rows: l }) => ({
    kind: "type",
    rows: l,
    label: i
  }));
  return r.length > 0 && s.push({
    kind: "type",
    rows: [...r].sort(R),
    label: e
  }), s;
}
function Sa(t, e, a) {
  const r = [], o = [];
  t.forEach((i) => {
    typeof i.lastUsedAt == "number" ? r.push(i) : o.push(i);
  }), r.sort((i, l) => (l.lastUsedAt ?? 0) - (i.lastUsedAt ?? 0)), o.sort(R);
  const s = [];
  return r.length > 0 && s.push({ kind: "lastUsed", rows: r, label: e }), o.length > 0 && s.push({ kind: "lastUsed", rows: o, label: a }), s;
}
const ne = "__unmatched__";
function Ca(t) {
  const e = t.map((a) => a.id);
  return e.find((a, r) => a === ne || e.indexOf(a) !== r);
}
const Ot = /* @__PURE__ */ new Set();
function Ea(t) {
  Ot.has(t) || (Ot.add(t), console.warn(
    `ProjectSelector: duplicate custom section id "${t}" — matching is unaffected because each section buckets by its own \`match\`, but sections sharing an id collide as React keys, which can cause stale or misapplied rendering.`
  ));
}
function Ta(t, e, a, r) {
  if (e.length === 0)
    return [{ kind: "flat", rows: [...t].sort(R) }];
  const o = Ca(e);
  o !== void 0 && Ea(o);
  const s = /* @__PURE__ */ new Map(), i = (v) => {
    const S = s.get(v);
    if (S !== void 0) return S;
    const u = a.get(v), N = u ? e.findIndex((g) => g.match(u)) : -1;
    return s.set(v, N), N;
  }, l = e.map(() => []), c = [];
  t.forEach((v) => {
    const S = i(L(v.projectId));
    S < 0 ? c.push(v) : l[S].push(v);
  });
  const f = (v, S) => {
    const { compare: u } = S;
    return u ? [...v].sort((N, g) => {
      const b = a.get(L(N.projectId)), D = a.get(L(g.projectId));
      if (!b || !D) return R(N, g);
      const j = u(b, D);
      return j !== 0 ? j : R(N, g);
    }) : [...v].sort(R);
  }, h = [];
  return e.forEach((v, S) => {
    const u = l[S];
    u.length !== 0 && h.push({
      kind: "custom",
      id: v.id,
      rows: f(u, v),
      label: v.label
    });
  }), c.length > 0 && h.push({
    kind: "custom",
    id: ne,
    rows: [...c].sort(R),
    label: r
  }), h;
}
const za = {
  searchPlaceholder: "Search projects & resources",
  viewOptionsAriaLabel: "View options",
  groupSectionLabel: "Group by",
  filterSectionLabel: "Filter",
  filterGroupNone: "None",
  filterGroupByOpenTabs: "Open tabs",
  filterGroupByLastUsed: "Last used",
  filterGroupByLanguage: "Language",
  filterGroupByVersification: "Versification",
  filterGroupByType: "Type",
  filterGroupByCustom: "Custom",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  versificationUnknownSectionHeading: "Unknown versification",
  languageUnknownSectionHeading: "Unknown language",
  typeUnknownSectionHeading: "Unknown type",
  lastUsedRecentSectionHeading: "Recently used",
  lastUsedOtherSectionHeading: "Other",
  customUnmatchedSectionHeading: "Other",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function Ga(t) {
  return { ...za, ...t };
}
function it(t) {
  return Ze[ze(t)] ?? String(t);
}
function gt(t, e) {
  if (e === void 0) return;
  const a = L(e);
  return t.find((r) => L(r.id) === a);
}
const Aa = "platform.footerAction", se = [
  "openTabs",
  "lastUsed",
  "language",
  "versification",
  "type",
  "custom"
], Da = se.filter(
  (t) => t !== "custom"
), La = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ra({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = it(t);
  return e ? /* @__PURE__ */ n(
    wt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: La,
      children: a
    }
  ) : /* @__PURE__ */ n(wt, { variant: "secondary", children: a });
}
function Pa({
  row: t,
  mode: e,
  strings: a,
  onClick: r,
  onOpen: o,
  selectedRowRef: s,
  indicator: i,
  indicatorLabel: l,
  reserveIndicatorSlot: c
}) {
  const {
    ref: f,
    open: h,
    onPointerEnter: v,
    onPointerLeave: S
  } = Qe(), [u, N] = X(!1), g = !!(t.language || t.languageCode), b = g || !!t.typeName || !!l || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, D = h || u, j = H(() => {
    if (b) {
      N(!0);
      return;
    }
    v();
  }, [b, v]), Q = H(() => {
    N(!1), S();
  }, [S]), K = /* @__PURE__ */ n(Ut, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let P;
  e === "project" ? t.openGroups.length > 0 && (P = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((E) => /* @__PURE__ */ n(wt, { variant: "secondary", children: it(E) }, E)) })) : t.scrollGroupId !== void 0 && (P = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Ra,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ m(
      U,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (E) => {
          E.stopPropagation(), o(t);
        },
        onMouseDown: (E) => E.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(xe, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const J = /* @__PURE__ */ m(
    St,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: j,
      onPointerLeave: Q,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: K }),
        c && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: f,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        P
      ]
    }
  ), _ = t.scrollGroupId !== void 0 ? it(t.scrollGroupId) : void 0, I = t.isBoundButClosed && _ ? a.boundButClosedTooltip.replace("{group}", _) : void 0;
  return /* @__PURE__ */ m(Qt, { open: D, delayDuration: 400, children: [
    /* @__PURE__ */ n(te, { asChild: !0, children: J }),
    /* @__PURE__ */ m(
      ee,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: $t },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          g && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          t.typeName && /* @__PURE__ */ n("div", { className: "tw:text-sm", children: t.typeName }),
          l && /* @__PURE__ */ n("div", { className: "tw:text-sm", children: l }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && _ && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              _,
              ")"
            ] })
          ] }),
          I && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: I }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Ba(t, e) {
  if (e) {
    if (e === "none") return "none";
    if (t.includes(e)) return e;
  }
  return t.includes("openTabs") ? "openTabs" : "none";
}
function Oa(t) {
  return t === "none" || se.some((e) => e === t);
}
function Ma(t, e) {
  switch (t) {
    case "openTabs":
      return e.filterGroupByOpenTabs;
    case "lastUsed":
      return e.filterGroupByLastUsed;
    case "language":
      return e.filterGroupByLanguage;
    case "versification":
      return e.filterGroupByVersification;
    case "type":
      return e.filterGroupByType;
    case "custom":
      return e.filterGroupByCustom;
    default:
      return t;
  }
}
function ja({
  availableGroupings: t,
  activeGrouping: e,
  defaultGrouping: a,
  onChangeGrouping: r,
  showSelectedOnly: o,
  onChangeShowSelectedOnly: s,
  strings: i
}) {
  const l = !!o || e !== a;
  return /* @__PURE__ */ m(sa, { children: [
    /* @__PURE__ */ n(ia, { asChild: !0, children: /* @__PURE__ */ n(
      U,
      {
        variant: "ghost",
        size: "sm",
        className: d(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the trigger reads as a toggle-group button
          // that's currently pressed while the view is off its defaults.
          l && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": i.viewOptionsAriaLabel,
        "aria-pressed": l,
        title: i.viewOptionsAriaLabel,
        onMouseDown: (c) => c.preventDefault(),
        children: /* @__PURE__ */ n(ve, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ m(
      la,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: $t },
        children: [
          t.length > 0 && /* @__PURE__ */ m(ut, { children: [
            /* @__PURE__ */ n(Dt, { children: i.groupSectionLabel }),
            /* @__PURE__ */ m(
              ca,
              {
                value: e,
                onValueChange: (c) => {
                  Oa(c) && r(c);
                },
                children: [
                  /* @__PURE__ */ n(At, { value: "none", children: i.filterGroupNone }),
                  t.map((c) => /* @__PURE__ */ n(At, { value: c, children: Ma(c, i) }, c))
                ]
              }
            )
          ] }),
          s && /* @__PURE__ */ m(ut, { children: [
            t.length > 0 && /* @__PURE__ */ n(ua, {}),
            /* @__PURE__ */ n(Dt, { children: i.filterSectionLabel }),
            /* @__PURE__ */ n(
              da,
              {
                checked: !!o,
                onCheckedChange: s,
                onSelect: (c) => c.preventDefault(),
                children: i.filterShowSelectedOnly
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function vo(t) {
  const [e, a] = X(!1), [r, o] = X(""), s = t.availableGroupings ?? Da, i = Ba(s, t.defaultGrouping), [l, c] = X(i), [f, h] = X(!1), v = kt(null), S = H((w) => {
    a(w), w || o("");
  }, []);
  ge(() => {
    if (!e) return;
    const w = window.requestAnimationFrame(() => {
      const p = v.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(w);
  }, [e]);
  const u = Ga(t.localizedStrings), N = Z(() => t.mode === "project" ? ht({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? ht({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : ht({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), g = Z(() => {
    const w = r.trim().toLowerCase();
    let p = N;
    return w && (p = p.filter(
      (x) => x.shortName.toLowerCase().includes(w) || x.fullName.toLowerCase().includes(w) || (x.language ?? "").toLowerCase().includes(w) || (x.languageCode ?? "").toLowerCase().includes(w)
    )), t.mode === "project-multi" && f && (p = p.filter((x) => x.isSelected)), p;
  }, [N, r, t.mode, f]), b = Z(
    () => new Map(t.projects.map((w) => [L(w.id), w])),
    [t.projects]
  ), { renderProjectIndicator: D, getProjectIndicatorLabel: j } = t, Q = H(
    (w) => {
      if (!D) return;
      const p = b.get(L(w.projectId));
      return p ? D(p) : void 0;
    },
    [D, b]
  ), K = H(
    (w) => {
      if (!j) return;
      const p = b.get(L(w.projectId));
      return p ? j(p) : void 0;
    },
    [j, b]
  ), { lastUsedRecentSectionHeading: P } = u, { lastUsedOtherSectionHeading: J } = u, { languageUnknownSectionHeading: _ } = u, { versificationUnknownSectionHeading: I } = u, { typeUnknownSectionHeading: E } = u, { customUnmatchedSectionHeading: C } = u, B = Z(() => {
    switch (l) {
      case "openTabs":
        return Bt(g, !0);
      case "lastUsed":
        return Sa(
          g,
          P,
          J
        );
      case "language":
        return ka(g, _);
      case "versification":
        return ya(
          g,
          t.priorityVersificationId,
          I
        );
      case "type":
        return Ia(g, E);
      case "custom":
        return Ta(
          g,
          t.customSections ?? [],
          b,
          C
        );
      case "none":
      default:
        return Bt(g, !1);
    }
  }, [
    g,
    l,
    t.customSections,
    b,
    t.priorityVersificationId,
    I,
    _,
    P,
    J,
    E,
    C
  ]), O = Z(() => {
    if (t.mode !== "project-multi") return [];
    const w = [];
    return t.projects.forEach((p) => {
      const x = t.openTabs.filter(
        (y) => L(y.projectId) === L(p.id)
      );
      if (x.length === 0) {
        w.push({ projectId: p.id });
        return;
      }
      const T = /* @__PURE__ */ new Set();
      x.forEach((y) => {
        T.has(y.scrollGroupId) || (T.add(y.scrollGroupId), w.push({ projectId: p.id, scrollGroupId: y.scrollGroupId }));
      });
    }), w;
  }, [t.mode, t.projects, t.openTabs]), V = (w) => {
    if (w.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(w.projectId, w.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(w.projectId, w.scrollGroupId);
    }
  }, lt = (w) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: w.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, x = (y) => y.projectId === w.projectId && y.scrollGroupId === w.scrollGroupId, T = p.some(x) ? p.filter((y) => !x(y)) : [...p, { projectId: w.projectId, scrollGroupId: w.scrollGroupId }];
        t.onChangeSelection({ pairs: T }), T.length === 0 && f && h(!1);
        return;
      }
      case "projectScrollGroup": {
        if (w.isBoundButClosed && w.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(w.projectId, w.scrollGroupId), a(!1);
          return;
        }
        if (w.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: w.projectId,
            scrollGroupId: w.scrollGroupId
          }), a(!1);
          return;
        }
        const p = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: w.projectId, scrollGroupId: p }), t.onOpenProjectInGroup(w.projectId, p), a(!1);
      }
    }
  }, dt = () => {
    if (t.mode !== "project-multi") return;
    const w = t.selection.pairs, p = new Set(w.map((T) => `${T.projectId}:${T.scrollGroupId ?? ""}`)), x = [...w];
    O.forEach((T) => {
      const y = `${T.projectId}:${T.scrollGroupId ?? ""}`;
      p.has(y) || (p.add(y), x.push(T));
    }), t.onChangeSelection({ pairs: x });
  }, ie = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), f && h(!1));
  }, et = Z(() => {
    switch (t.mode) {
      case "project": {
        const w = gt(t.projects, t.selection.projectId);
        if (t.renderTriggerLabel)
          return { node: t.renderTriggerLabel(w), title: "" };
        let p = w ? w.shortName : t.buttonPlaceholder ?? "";
        return w && t.triggerLabelFormat === "shortNameAndFullName" && w.fullName && w.fullName !== w.shortName && (p = `${w.shortName} - ${w.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: w } = t.selection;
        if (w.length === 0) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        const p = [];
        if (w.forEach((y) => {
          const rt = gt(t.projects, y.projectId);
          rt && p.push({ project: rt, scrollGroupId: y.scrollGroupId });
        }), p.length === 0) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        if (t.getSelectedText) {
          const y = t.getSelectedText(p);
          return { node: y, title: y };
        }
        const x = p.map(
          ({ project: y, scrollGroupId: rt }) => rt === void 0 ? y.shortName : `${y.shortName} (${it(rt)})`
        ).join(", ");
        if (p.length === 1) return { node: x, title: x };
        const T = p.length.toString();
        return {
          node: /* @__PURE__ */ m(ut, { children: [
            /* @__PURE__ */ n(wt, { variant: "muted", className: "tw:shrink-0", children: T }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: x })
          ] }),
          title: `${T} ${x}`
        };
      }
      case "projectScrollGroup": {
        const w = gt(t.projects, t.selection.projectId);
        if (!w) {
          const T = t.buttonPlaceholder ?? "";
          return { node: T, title: T };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: w.shortName, title: w.shortName };
        const x = `${w.shortName} · ${it(p)}`;
        return { node: x, title: x };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let at;
  t.isLoading ? at = /* @__PURE__ */ n(ye, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? at = void 0 : t.mode === "project-multi" ? at = /* @__PURE__ */ n(_t, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : at = /* @__PURE__ */ n(ke, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const le = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? V : void 0, Et = /* @__PURE__ */ m(
    U,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: d(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof et.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: et.node }) : et.node }),
        at
      ]
    }
  ), de = et.title ? /* @__PURE__ */ n(Gt, { delayDuration: 400, children: /* @__PURE__ */ m(Qt, { children: [
    /* @__PURE__ */ n(te, { asChild: !0, children: /* @__PURE__ */ n(vt, { asChild: !0, children: Et }) }),
    /* @__PURE__ */ n(ee, { children: et.title })
  ] }) }) : /* @__PURE__ */ n(vt, { asChild: !0, children: Et });
  return /* @__PURE__ */ m(qt, { open: e, onOpenChange: S, children: [
    de,
    /* @__PURE__ */ n(
      Yt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: d("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(Gt, { delayDuration: 400, children: /* @__PURE__ */ m(Ft, { shouldFilter: !1, children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Kt,
              {
                value: r,
                onValueChange: o,
                placeholder: u.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.hideFilterMenu && (s.length > 0 || t.mode === "project-multi") && /* @__PURE__ */ n(
              ja,
              {
                availableGroupings: s,
                activeGrouping: l,
                defaultGrouping: i,
                onChangeGrouping: c,
                showSelectedOnly: t.mode === "project-multi" ? f : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? h : void 0,
                strings: u
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(U, { variant: "ghost", size: "sm", onClick: dt, children: `${u.selectAll} (${O.length.toString()})` }),
            /* @__PURE__ */ n(U, { variant: "ghost", size: "sm", onClick: ie, children: `${u.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ m(Jt, { children: [
            /* @__PURE__ */ n(Xt, { children: t.commandEmptyMessage ?? "No projects found" }),
            B.map((w, p) => (
              // Grouping schemes emit several sections of the same `kind`, so the key needs more
              // than that: custom sections carry an explicit `id`, and the rest are distinguished
              // by their heading label.
              /* @__PURE__ */ m(be, { children: [
                /* @__PURE__ */ n(Wt, { heading: _a(w, u), children: w.rows.map((x) => /* @__PURE__ */ n(
                  Pa,
                  {
                    row: x,
                    mode: t.mode,
                    strings: u,
                    onClick: lt,
                    onOpen: le,
                    selectedRowRef: v,
                    indicator: Q(x),
                    indicatorLabel: K(x),
                    reserveIndicatorSlot: !!t.renderProjectIndicator
                  },
                  x.rowKey
                )) }),
                p < B.length - 1 && /* @__PURE__ */ n(zt, {})
              ] }, w.id ?? `${w.kind}:${w.label ?? ""}`)
            )),
            t.footerAction && /* @__PURE__ */ m(ut, { children: [
              g.length > 0 && /* @__PURE__ */ n(
                zt,
                {
                  alwaysRender: !0,
                  "data-testid": "project-selector-footer-separator"
                }
              ),
              /* @__PURE__ */ n(
                St,
                {
                  forceMount: !0,
                  value: Aa,
                  "data-testid": "project-selector-footer-action",
                  onSelect: () => {
                    var w;
                    (w = t.footerAction) == null || w.onSelect(), S(!1);
                  },
                  children: t.footerAction.label
                }
              )
            ] })
          ] })
        ] }) })
      }
    )
  ] });
}
function _a(t, e) {
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "versification":
    case "language":
    case "type":
    case "lastUsed":
    case "custom":
      return t.label;
    case "flat":
    default:
      return;
  }
}
const Ua = jt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, l) => {
    const c = $();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: d("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            Ie,
            {
              className: d(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": c === "rtl" },
                { "tw:left-3": c === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            He,
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
              onChange: (f) => e(f.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            U,
            {
              variant: "ghost",
              size: "icon",
              className: d(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": c === "rtl" },
                { "tw:right-0": c === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ n(Se, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Ua.displayName = "SearchBar";
const $a = 5;
function xo(t) {
  return qe(t).filter(
    (e) => !A.isObsolete(A.bookIdToNumber(e))
  );
}
function Ha(t, e) {
  return t.filter((a) => {
    try {
      return Ge(a) === e;
    } catch {
      return !1;
    }
  });
}
const yo = (t, e, a) => Ha(t, e).every((r) => a.includes(r));
function Va(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => A.bookIdToNumber(r) > 0).sort((r, o) => A.bookIdToNumber(r) - A.bookIdToNumber(o)).map((r) => Ye(r, e));
}
function ko(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((l) => o.has(l)))
    return a;
  const i = Va(t, r);
  if (i.length !== 0)
    return i.length <= $a ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Io({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ n(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: d("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
function Fa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Ka({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Ja = W(
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
function Xa({
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ja({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function So({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Wa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function qa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Co({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: o = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Fa, { className: d(s), role: o, children: [
    /* @__PURE__ */ m(Ka, { children: [
      /* @__PURE__ */ n(Xa, { variant: "icon", children: r ?? /* @__PURE__ */ n(Ce, {}) }),
      /* @__PURE__ */ n(Wa, { children: t })
    ] }),
    a && /* @__PURE__ */ n(qa, { children: /* @__PURE__ */ n(U, { onClick: () => a(), children: e }) })
  ] });
}
const Za = jt(({ className: t, ...e }, a) => /* @__PURE__ */ n(Ee, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
Za.displayName = "Spinner";
const Ya = W(
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
function Eo({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ya({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function To({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function zo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Go({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    It.Group,
    {
      "data-slot": "resizable-panel-group",
      className: d(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...o
    }
  );
}
function ct(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Ao({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    It.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: ct(t),
      minSize: ct(e),
      maxSize: ct(a),
      collapsedSize: ct(r),
      ...o
    }
  );
}
function Do({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    It.Separator,
    {
      "data-slot": "resizable-handle",
      className: d(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  no as $,
  Lr as A,
  U as B,
  St as C,
  hr as D,
  Vr as E,
  Fr as F,
  Jr as G,
  Xr as H,
  Tr as I,
  Qr as J,
  wt as K,
  _r as L,
  sa as M,
  ia as N,
  la as O,
  qt as P,
  oo as Q,
  Ur as R,
  ea as S,
  Gt as T,
  qr as U,
  Dt as V,
  ua as W,
  da as X,
  co as Y,
  Oe as Z,
  wo as _,
  Ye as a,
  mo as a$,
  so as a0,
  uo as a1,
  io as a2,
  Yr as a3,
  ca as a4,
  At as a5,
  fo as a6,
  bo as a7,
  $t as a8,
  He as a9,
  Ke as aA,
  Eo as aB,
  zo as aC,
  To as aD,
  Kr as aE,
  br as aF,
  kr as aG,
  $e as aH,
  Ue as aI,
  gr as aJ,
  to as aK,
  Fa as aL,
  qa as aM,
  Wa as aN,
  Ka as aO,
  Xa as aP,
  Io as aQ,
  So as aR,
  No as aS,
  jr as aT,
  Or as aU,
  Mr as aV,
  Do as aW,
  Ao as aX,
  Go as aY,
  Co as aZ,
  Za as a_,
  ot as aa,
  zt as ab,
  Ir as ac,
  go as ad,
  po as ae,
  ho as af,
  Br as ag,
  ga as ah,
  vo as ai,
  wr as aj,
  Ua as ak,
  xo as al,
  Ha as am,
  Ar as an,
  yo as ao,
  Pr as ap,
  xr as aq,
  Ze as ar,
  eo as as,
  ao as at,
  Zr as au,
  ro as av,
  re as aw,
  ft as ax,
  pt as ay,
  Ve as az,
  Qt as b,
  lo as b0,
  fr as b1,
  je as b2,
  Me as b3,
  mr as b4,
  na as b5,
  aa as b6,
  Ht as b7,
  Wr as b8,
  zr as b9,
  _e as ba,
  ha as bb,
  va as bc,
  pr as bd,
  ko as be,
  d as c,
  te as d,
  ee as e,
  vt as f,
  Dr as g,
  Yt as h,
  Ft as i,
  Jt as j,
  Wt as k,
  Cr as l,
  Er as m,
  Rr as n,
  We as o,
  Gr as p,
  Kt as q,
  $ as r,
  Xt as s,
  $r as t,
  Qe as u,
  Nr as v,
  vr as w,
  Sr as x,
  yr as y,
  Hr as z
};
//# sourceMappingURL=resizable-jhGehtON.js.map
