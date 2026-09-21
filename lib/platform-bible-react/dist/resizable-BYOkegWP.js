import { jsx as n, jsxs as m, Fragment as ut } from "react/jsx-runtime";
import { Slot as vt, Dialog as X, Popover as nt, Tooltip as et, Label as le, RadioGroup as gt, ToggleGroup as Bt, Separator as de, DropdownMenu as z } from "radix-ui";
import { IconX as ce, IconSearch as ue, IconCheck as xt, IconChevronRight as we } from "@tabler/icons-react";
import { Canon as G } from "@sillsdev/scripture";
import A, { useState as W, useRef as yt, useCallback as K, createContext as me, useContext as fe, useMemo as tt, useEffect as pe, Fragment as he, forwardRef as Mt } from "react";
import { cva as Z } from "class-variance-authority";
import { ChevronsUpDown as _t, Check as jt, Star as ge, SlidersHorizontal as be, ArrowRight as Ne, Loader2 as ve, ChevronDown as xe, Search as ye, X as ke, AlertTriangle as Ie, LoaderCircle as Se } from "lucide-react";
import { Section as q, MODIFIER_KEYS as Ce, normalizeProjectId as E, getLocalizeKeyForScrollGroupId as Ee, getSectionForBook as Te } from "platform-bible-utils";
import { filterAndRankItems as Et } from "@eten-tech-foundation/platform-editor";
import { Command as Y } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as kt from "react-resizable-panels";
import { clsx as ze } from "clsx";
import { extendTailwindMerge as Ae, twMerge as Ge } from "tailwind-merge";
const De = Ae({ prefix: "tw" });
function bt(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function Le(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = bt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
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
function Re(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = bt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = bt(e), i = s.some((c) => c.startsWith("-tw-")), l = s.some((c) => c.startsWith("!tw-"));
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
  const e = ze(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return De(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((c) => {
    const f = Le(c);
    r.set(f.normalized, f.original), o.push(f.normalized);
  }), Ge(o.join(" ")).split(" ").filter(Boolean).map((c) => {
    const f = r.get(c);
    return f ? Re(c, f) : c;
  }).join(" ");
}
const Oe = 600, Ut = 650, cr = 400, Pe = 450, Be = 500, ur = 510, wr = 520, Me = 550, mr = 650, fr = 700, $t = Z(
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
function H({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...o
}) {
  const s = r ? vt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: d($t({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Ht = "layoutDirection";
function V() {
  const t = localStorage.getItem(Ht);
  return t === "rtl" ? t : "ltr";
}
function pr(t) {
  localStorage.setItem(Ht, t);
}
function hr({ ...t }) {
  return /* @__PURE__ */ n(X.Root, { "data-slot": "dialog", ...t });
}
function gr({ ...t }) {
  return /* @__PURE__ */ n(X.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function _e({ ...t }) {
  return /* @__PURE__ */ n(X.Portal, { "data-slot": "dialog-portal", ...t });
}
function br({ ...t }) {
  return /* @__PURE__ */ n(X.Close, { "data-slot": "dialog-close", ...t });
}
function je({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    X.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: d(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Pe, ...e },
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
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: o,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  ...i
}) {
  const l = V();
  return /* @__PURE__ */ m(_e, { children: [
    /* @__PURE__ */ n(je, { className: r, style: o }),
    /* @__PURE__ */ m(
      X.Content,
      {
        "data-slot": "dialog-content",
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Be, ...s },
        dir: l,
        ...i,
        children: [
          e,
          a && /* @__PURE__ */ n(X.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(H, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(ce, {}),
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
        e && /* @__PURE__ */ n(X.Close, { asChild: !0, children: /* @__PURE__ */ n(H, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    X.Title,
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
    X.Description,
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
function Ue({ className: t, type: e, ...a }) {
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
function $e({ className: t, ...e }) {
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
const He = Z(
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
function Ve({
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
        className: d(He({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
Z("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Vt({ className: t, ...e }) {
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
  const o = V(), s = A.useCallback(
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
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ m($e, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ n(Ve, { children: /* @__PURE__ */ n(ue, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Ft({ className: t, ...e }) {
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
function Jt({
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
function Xt({
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
function Tt({
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
function It({
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
        /* @__PURE__ */ n(xt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
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
const Ke = [
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
], Fe = (t) => {
  var e;
  return ((e = Ke[t]) == null ? void 0 : e.chapters) ?? -1;
}, Je = G.allBookIds.filter(
  (t) => !G.isObsolete(G.bookIdToNumber(t))
);
function Xe(t) {
  const e = [], a = Math.min(t.length, G.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(G.bookNumberToId(r + 1));
  return e;
}
function k(t) {
  return `%scrollGroup_${t}%`;
}
const We = {
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
function St(t, e) {
  return Fe(G.bookIdToNumber(t));
}
function mt(t, e, a) {
  const r = G.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = G.bookIdToNumber(i);
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
      chapterNum: Math.max(St(s), 1),
      verseNum: 1
    };
}
function Cr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < St(r))
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
  const l = Math.max(St(i), 1);
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
const Ar = (t, e, a, r, o) => {
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
}, Gr = (t, e, a, r, o) => {
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
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? G.bookIdToEnglishName(t);
}
function Ze(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const Lr = Object.fromEntries(
  Je.map((t) => [t, G.bookIdToEnglishName(t)])
);
function Rr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = G.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(o.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function Wt({ ...t }) {
  return /* @__PURE__ */ n(nt.Root, { "data-slot": "popover", ...t });
}
function Nt({ ...t }) {
  return /* @__PURE__ */ n(nt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Zt = A.createContext(null);
function Or({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(Zt.Provider, { value: t, children: e });
}
function qt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = V(), i = A.useContext(Zt);
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
function Pr({ ...t }) {
  return /* @__PURE__ */ n(nt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Br({ className: t, ...e }) {
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
function _r({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: d("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function zt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    et.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Yt({ ...t }) {
  return /* @__PURE__ */ n(et.Root, { "data-slot": "tooltip", ...t });
}
function Qt({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    et.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? d($t({ variant: e }), t) : t,
      ...a
    }
  );
}
function te({
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
  return /* @__PURE__ */ n(et.Portal, { children: /* @__PURE__ */ m(
    et.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Me, ...a },
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ n(
          et.Arrow,
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
function qe() {
  const [t, e] = W(!1), a = yt(null), r = K(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = K(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function jr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    le.Root,
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
  const a = V();
  return /* @__PURE__ */ n(
    gt.Root,
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
    gt.Item,
    {
      "data-slot": "radio-group-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        gt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Ye = Z(
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
), ee = A.createContext({
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
  const l = V();
  return /* @__PURE__ */ n(
    Bt.Root,
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
        ee.Provider,
        {
          value: A.useMemo(
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
  const s = A.useContext(ee);
  return /* @__PURE__ */ n(
    Bt.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: d(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Ye({
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
function Qe({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    de.Root,
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
const ta = Z(
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
function Kr({
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
        ta({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Fr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? vt.Root : "div";
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
    Qe,
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
const ea = ["input", "select", "textarea", "button"], aa = ["button", "textbox"], Zr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = yt(null), [s, i] = W(void 0), [l, c] = W(void 0), f = K(
    (u) => {
      i(u);
      const b = t.find((N) => N.id === u);
      b && (e == null || e(b));
      const g = document.getElementById(u);
      g && (g.scrollIntoView({ block: "center" }), g.focus()), o.current && o.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), h = K(
    (u) => {
      const b = t.find((g) => g.id === u);
      b && (c((g) => g === u ? void 0 : u), a == null || a(b));
    },
    [a, t]
  ), v = (u) => {
    if (!u) return !1;
    const b = u.tagName.toLowerCase();
    if (u.isContentEditable || ea.includes(b)) return !0;
    const g = u.getAttribute("role");
    if (g && aa.includes(g)) return !0;
    const N = u.getAttribute("tabindex");
    return N !== void 0 && N !== "-1";
  }, S = K(
    (u) => {
      var F;
      const b = u.target, g = (x) => x ? document.getElementById(x) : void 0, N = g(l), T = g(s);
      if (!!(N && b && N.contains(b) && b !== N) && v(b)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !b.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const x = t.find(($) => $.id === l);
            x && f(x.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!N) return;
          const x = Array.from(
            N.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (x.length === 0) return;
          const $ = x.findIndex((L) => L === b);
          if ($ === -1) return;
          let C;
          u.key === "ArrowDown" ? C = Math.min($ + 1, x.length - 1) : C = Math.max($ - 1, 0), C !== $ && (u.preventDefault(), u.stopPropagation(), (F = x[C]) == null || F.focus());
          return;
        }
        return;
      }
      const _ = t.findIndex((x) => x.id === s);
      let j = _;
      switch (u.key) {
        case "ArrowDown":
          j = Math.min(_ + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          j = Math.max(_ - 1, 0), u.preventDefault();
          break;
        case "Home":
          j = 0, u.preventDefault();
          break;
        case "End":
          j = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && h(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const x = T;
          if (x) {
            const $ = x.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), C = x.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), L = $ ?? C;
            if (L) {
              u.preventDefault(), L.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (v(b) || (r == null || r(u.key), u.preventDefault()));
          return;
      }
      const U = t[j];
      U && f(U.id);
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
}, ra = Z(
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
  const o = a ? vt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ra({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const ae = me(void 0);
function ft() {
  const t = fe(ae);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const pt = Z("", {
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
function oa({ variant: t = "default", ...e }) {
  const a = V(), r = A.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(ae.Provider, { value: r, children: /* @__PURE__ */ n(z.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function qr({
  ...t
}) {
  return /* @__PURE__ */ n(z.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function na({
  ...t
}) {
  return /* @__PURE__ */ n(z.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function sa({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const s = V();
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
  const o = V(), s = ft();
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
function ia({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const s = V(), i = ft();
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
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(xt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function la({
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
  const o = V(), s = ft();
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
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(xt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Gt({ className: t, inset: e, ...a }) {
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
function da({ className: t, ...e }) {
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
        /* @__PURE__ */ n(we, { className: "tw:ms-auto" })
      ]
    }
  );
}
function ro({ className: t, children: e, ...a }) {
  const r = V();
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
const Dt = `
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
function ca(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function st(t, e) {
  const a = e ? `${Dt}, ${e}` : Dt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && ca(r)
  );
}
function no({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = A.useRef(null);
  A.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), A.useEffect(() => {
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
function ua(t) {
  A.useEffect(() => {
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
function wa(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ma(t, e, a) {
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
  const i = A.useRef(null);
  A.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), ua(i);
  const l = A.useMemo(
    () => i.current ? st(i.current) : [],
    [i]
  ), c = A.useCallback(
    (h) => {
      const { current: v } = i;
      if (!v || !v.parentElement) return;
      const S = v.closest("table"), u = S ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        st(S).filter(
          (N) => N.tagName === "TR"
        )
      ) : [], b = u.indexOf(v), g = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (h.key === "ArrowDown" || h.key === "ArrowUp")
        h.preventDefault(), ma(u, b, h.key);
      else if (h.key === "ArrowLeft" || h.key === "ArrowRight")
        h.preventDefault(), wa(l, g, h.key);
      else if (h.key === "Escape") {
        h.preventDefault();
        const N = v.closest("table");
        N && N.focus();
      }
      e == null || e(h);
    },
    [i, l, e]
  ), f = A.useCallback(
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
  className: b = void 0,
  variant: g = "ghost",
  id: N
}) {
  const [T, P] = W(!1), Q = K(
    (C) => {
      var B;
      const L = (B = t.find((J) => J.label === C)) == null ? void 0 : B.value;
      L && a(
        e.includes(L) ? e.filter((J) => J !== L) : [...e, L]
      );
    },
    [t, e, a]
  ), _ = () => c || r, j = tt(() => {
    if (!S) return t;
    const C = t.filter((B) => B.starred).sort((B, J) => B.label.localeCompare(J.label)), L = t.filter((B) => !B.starred).sort((B, J) => {
      const lt = e.includes(B.value), dt = e.includes(J.value);
      return lt && !dt ? -1 : !lt && dt ? 1 : B.label.localeCompare(J.label);
    });
    return [...C, ...L];
  }, [t, e, S]), U = () => {
    a(t.map((C) => C.value));
  }, F = () => {
    a([]);
  }, x = f ?? T;
  return /* @__PURE__ */ n("div", { id: N, className: b, children: /* @__PURE__ */ m(Wt, { open: x, onOpenChange: h ?? P, children: [
    /* @__PURE__ */ n(Nt, { asChild: !0, children: /* @__PURE__ */ m(
      H,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": x,
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
                children: _()
              }
            )
          ] }),
          /* @__PURE__ */ n(_t, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(qt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Vt, { children: [
      /* @__PURE__ */ n(
        Kt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      o && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: U, children: s }),
        /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: F, children: i })
      ] }),
      /* @__PURE__ */ m(Ft, { children: [
        /* @__PURE__ */ n(Jt, { children: l }),
        /* @__PURE__ */ n(Xt, { children: j.map((C) => /* @__PURE__ */ m(
          It,
          {
            value: C.label,
            onSelect: Q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                jt,
                {
                  className: d(
                    "tw:h-4 tw:w-4",
                    e.includes(C.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              C.starred && /* @__PURE__ */ n(ge, { className: "tw:h-4 tw:w-4" }),
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
function fa(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = ot(e).toLowerCase();
  return a === "passive" ? Et({
    query: o,
    items: r,
    filter: (s) => ot(s.label).toLowerCase().startsWith(o),
    sortBy: "label"
  }) : Et({
    query: o,
    items: r,
    filter: (s) => ot(s.label).toLowerCase().includes(o),
    sortBy: "label"
  });
}
function pa(t) {
  return t.isComposing || t.keyCode === 229;
}
const re = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, ha = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], ga = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function ba(t) {
  return [
    ...ha,
    ...ga.filter((e) => re[t].test(e))
  ];
}
function O(t) {
  t.preventDefault(), t.stopPropagation();
}
function po(t, e, a) {
  var o, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (O(t), a.commit(), "ended") : t.key === "Escape" ? (O(t), a.dismiss(), "ended") : "passed";
  if (pa(t) || Ce.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((o = t.getModifierState) != null && o.call(t, "AltGraph")))
    return t.key === "Enter" && O(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return O(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return O(t), fa(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return O(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return O(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    O(t);
    const i = ot(e.filter).toLowerCase(), l = e.items.find(
      (c) => ot(c.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (O(t), a.dismiss(), "ended") : (O(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (O(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (O(t), a.dismiss(), "ended") : t.key === "Backspace" || re[r].test(t.key) ? (O(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && O(t), a.dismiss(), "ended");
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
  const u = o.current, b = a ? "backslash" : "selection", g = { kind: b, token: u, filter: "", items: e };
  b === "backslash" && r && (g.shouldSpaceCommit = r), s(g), c({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: ba(b),
    onKey: (N) => l(N)
  }).then((N) => {
    if (i(u), N !== void 0) {
      f(), h();
      const T = e.find((P) => P.marker === N);
      T && v(T);
    } else a || h();
  }).catch((N) => {
    i(u), a || h(), S(N);
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
function Na(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = E(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function Lt(t, e, a) {
  const r = E(e);
  return t.some(
    (o) => E(o.projectId) === r && o.scrollGroupId === a
  );
}
function ht(t) {
  const e = Na(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId === void 0 ? void 0 : E(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(E(s.id)) ?? [];
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
        isSelected: o !== void 0 && o === E(s.id),
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
    const s = e.get(E(o.id));
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
        isSelected: Lt(a, o.id, void 0),
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
        isSelected: Lt(a, o.id, i.scrollGroupId),
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
    if (o.scrollGroupId === void 0) return;
    const s = E(o.projectId);
    if (r.some(
      (l) => E(l.projectId) === s && l.scrollGroupId === o.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => E(l.id) === s);
    i && r.push({
      rowKey: `closed:${i.id}:${o.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      language: i.language,
      languageCode: i.languageCode,
      scrollGroupId: o.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: i.isDisabled === !0,
      disabledReason: i.disabledReason,
      versificationId: i.versificationId,
      versificationName: i.versificationName,
      type: i.type,
      typeName: i.typeName,
      lastUsedAt: i.lastUsedAt
    });
  }), r;
}
function Rt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function D(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function Ot(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(D) }];
  const a = t.filter(Rt).sort(D), r = t.filter((s) => !Rt(s)).sort(D);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function va(t, e, a) {
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
    rows: [...f].sort(D)
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
    rows: [...o].sort(D),
    label: a,
    isPriority: !1
  }), i;
}
function xa(t, e) {
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
    rows: [...l].sort(D)
  }));
  o.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = o.map(({ label: i, rows: l }) => ({
    kind: "language",
    rows: l,
    label: i
  }));
  return r.length > 0 && s.push({
    kind: "language",
    rows: [...r].sort(D),
    label: e
  }), s;
}
function ya(t, e) {
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
    rows: [...l].sort(D)
  }));
  o.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = o.map(({ label: i, rows: l }) => ({
    kind: "type",
    rows: l,
    label: i
  }));
  return r.length > 0 && s.push({
    kind: "type",
    rows: [...r].sort(D),
    label: e
  }), s;
}
function ka(t, e, a) {
  const r = [], o = [];
  t.forEach((i) => {
    typeof i.lastUsedAt == "number" ? r.push(i) : o.push(i);
  }), r.sort((i, l) => (l.lastUsedAt ?? 0) - (i.lastUsedAt ?? 0)), o.sort(D);
  const s = [];
  return r.length > 0 && s.push({ kind: "lastUsed", rows: r, label: e }), o.length > 0 && s.push({ kind: "lastUsed", rows: o, label: a }), s;
}
const oe = "__unmatched__";
function Ia(t) {
  const e = t.map((a) => a.id);
  return e.find((a, r) => a === oe || e.indexOf(a) !== r);
}
const Pt = /* @__PURE__ */ new Set();
function Sa(t) {
  Pt.has(t) || (Pt.add(t), console.warn(
    `ProjectSelector: duplicate custom section id "${t}" — matching is unaffected because each section buckets by its own \`match\`, but sections sharing an id collide as React keys, which can cause stale or misapplied rendering.`
  ));
}
function Ca(t, e, a, r) {
  if (e.length === 0)
    return [{ kind: "flat", rows: [...t].sort(D) }];
  const o = Ia(e);
  o !== void 0 && Sa(o);
  const s = /* @__PURE__ */ new Map(), i = (v) => {
    const S = s.get(v);
    if (S !== void 0) return S;
    const u = a.get(v), b = u ? e.findIndex((g) => g.match(u)) : -1;
    return s.set(v, b), b;
  }, l = e.map(() => []), c = [];
  t.forEach((v) => {
    const S = i(E(v.projectId));
    S < 0 ? c.push(v) : l[S].push(v);
  });
  const f = (v, S) => {
    const { compare: u } = S;
    return u ? [...v].sort((b, g) => {
      const N = a.get(E(b.projectId)), T = a.get(E(g.projectId));
      if (!N || !T) return D(b, g);
      const P = u(N, T);
      return P !== 0 ? P : D(b, g);
    }) : [...v].sort(D);
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
    id: oe,
    rows: [...c].sort(D),
    label: r
  }), h;
}
const Ea = {
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
function Ta(t) {
  return { ...Ea, ...t };
}
function it(t) {
  return We[Ee(t)] ?? String(t);
}
const za = "platform.footerAction", ne = [
  "openTabs",
  "lastUsed",
  "language",
  "versification",
  "type",
  "custom"
], Aa = ne.filter(
  (t) => t !== "custom"
), Ga = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Da({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = it(t);
  return e ? /* @__PURE__ */ n(
    wt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ga,
      children: a
    }
  ) : /* @__PURE__ */ n(wt, { variant: "secondary", children: a });
}
function La({
  row: t,
  mode: e,
  strings: a,
  onClick: r,
  onOpen: o,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: c,
    open: f,
    onPointerEnter: h,
    onPointerLeave: v
  } = qe(), [S, u] = W(!1), b = !!(t.language || t.languageCode), g = b || !!t.typeName || !!(i != null && i.label) || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, N = f || S, T = K(() => {
    if (g) {
      u(!0);
      return;
    }
    h();
  }, [g, h]), P = K(() => {
    u(!1), v();
  }, [v]), Q = /* @__PURE__ */ n(jt, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let _;
  e === "project" ? t.openGroups.length > 0 && (_ = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((x) => /* @__PURE__ */ n(wt, { variant: "secondary", children: it(x) }, x)) })) : t.scrollGroupId !== void 0 && (_ = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Da,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ m(
      H,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (x) => {
          x.stopPropagation(), o(t);
        },
        onMouseDown: (x) => x.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(Ne, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const j = /* @__PURE__ */ m(
    It,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: T,
      onPointerLeave: P,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: Q }),
        l && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: c,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        _
      ]
    }
  ), U = t.scrollGroupId !== void 0 ? it(t.scrollGroupId) : void 0, F = t.isBoundButClosed && U ? a.boundButClosedTooltip.replace("{group}", U) : void 0;
  return /* @__PURE__ */ m(Yt, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ n(Qt, { asChild: !0, children: j }),
    /* @__PURE__ */ m(
      te,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        style: { zIndex: Ut },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          b && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          t.typeName && /* @__PURE__ */ n("div", { className: "tw:text-sm", children: t.typeName }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ n("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && U && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              U,
              ")"
            ] })
          ] }),
          F && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: F }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Ra(t, e) {
  if (e) {
    if (e === "none") return "none";
    if (t.includes(e)) return e;
  }
  return t.includes("openTabs") ? "openTabs" : "none";
}
function Oa(t) {
  return t === "none" || ne.some((e) => e === t);
}
function Pa(t, e) {
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
function Ba({
  availableGroupings: t,
  activeGrouping: e,
  defaultGrouping: a,
  onChangeGrouping: r,
  showSelectedOnly: o,
  onChangeShowSelectedOnly: s,
  strings: i
}) {
  const l = !!o || e !== a;
  return /* @__PURE__ */ m(oa, { children: [
    /* @__PURE__ */ n(na, { asChild: !0, children: /* @__PURE__ */ n(
      H,
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
        children: /* @__PURE__ */ n(be, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ m(
      sa,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Ut },
        children: [
          t.length > 0 && /* @__PURE__ */ m(ut, { children: [
            /* @__PURE__ */ n(Gt, { children: i.groupSectionLabel }),
            /* @__PURE__ */ m(
              la,
              {
                value: e,
                onValueChange: (c) => {
                  Oa(c) && r(c);
                },
                children: [
                  /* @__PURE__ */ n(At, { value: "none", children: i.filterGroupNone }),
                  t.map((c) => /* @__PURE__ */ n(At, { value: c, children: Pa(c, i) }, c))
                ]
              }
            )
          ] }),
          s && /* @__PURE__ */ m(ut, { children: [
            t.length > 0 && /* @__PURE__ */ n(da, {}),
            /* @__PURE__ */ n(Gt, { children: i.filterSectionLabel }),
            /* @__PURE__ */ n(
              ia,
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
  const [e, a] = W(!1), [r, o] = W(""), s = t.availableGroupings ?? Aa, i = Ra(s, t.defaultGrouping), [l, c] = W(i), [f, h] = W(!1), v = yt(null), S = K((w) => {
    a(w), w || o("");
  }, []);
  pe(() => {
    if (!e) return;
    const w = window.requestAnimationFrame(() => {
      const p = v.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(w);
  }, [e]);
  const u = Ta(t.localizedStrings), b = tt(() => t.mode === "project" ? ht({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), g = tt(() => {
    const w = r.trim().toLowerCase();
    let p = b;
    return w && (p = p.filter(
      (I) => I.shortName.toLowerCase().includes(w) || I.fullName.toLowerCase().includes(w) || (I.language ?? "").toLowerCase().includes(w) || (I.languageCode ?? "").toLowerCase().includes(w)
    )), t.mode === "project-multi" && f && (p = p.filter((I) => I.isSelected)), p;
  }, [b, r, t.mode, f]), N = tt(
    () => new Map(t.projects.map((w) => [E(w.id), w])),
    [t.projects]
  ), T = K(
    (w) => w === void 0 ? void 0 : N.get(E(w)),
    [N]
  ), { renderProjectIndicator: P } = t, Q = K(
    (w) => {
      if (!P) return;
      const p = T(w.projectId);
      return p ? P(p) : void 0;
    },
    [P, T]
  ), { lastUsedRecentSectionHeading: _ } = u, { lastUsedOtherSectionHeading: j } = u, { languageUnknownSectionHeading: U } = u, { versificationUnknownSectionHeading: F } = u, { typeUnknownSectionHeading: x } = u, { customUnmatchedSectionHeading: $ } = u, C = tt(() => {
    switch (l) {
      case "openTabs":
        return Ot(g, !0);
      case "lastUsed":
        return ka(
          g,
          _,
          j
        );
      case "language":
        return xa(g, U);
      case "versification":
        return va(
          g,
          t.priorityVersificationId,
          F
        );
      case "type":
        return ya(g, x);
      case "custom":
        return Ca(
          g,
          t.customSections ?? [],
          N,
          $
        );
      case "none":
      default:
        return Ot(g, !1);
    }
  }, [
    g,
    l,
    t.customSections,
    N,
    t.priorityVersificationId,
    F,
    U,
    _,
    j,
    x,
    $
  ]), L = tt(() => {
    if (t.mode !== "project-multi") return [];
    const w = [];
    return t.projects.forEach((p) => {
      const I = t.openTabs.filter(
        (y) => E(y.projectId) === E(p.id)
      );
      if (I.length === 0) {
        w.push({ projectId: p.id });
        return;
      }
      const R = /* @__PURE__ */ new Set();
      I.forEach((y) => {
        R.has(y.scrollGroupId) || (R.add(y.scrollGroupId), w.push({ projectId: p.id, scrollGroupId: y.scrollGroupId }));
      });
    }), w;
  }, [t.mode, t.projects, t.openTabs]), B = (w) => {
    if (w.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(w.projectId, w.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(w.projectId, w.scrollGroupId);
    }
  }, J = (w) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: w.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, I = E(w.projectId), R = (M) => E(M.projectId) === I && M.scrollGroupId === w.scrollGroupId, y = p.some(R) ? p.filter((M) => !R(M)) : [...p, { projectId: w.projectId, scrollGroupId: w.scrollGroupId }];
        t.onChangeSelection({ pairs: y }), y.length === 0 && f && h(!1);
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
  }, lt = () => {
    if (t.mode !== "project-multi") return;
    const w = t.selection.pairs, p = (y) => `${E(y.projectId)}:${y.scrollGroupId ?? ""}`, I = new Set(w.map(p)), R = [...w];
    L.forEach((y) => {
      const M = p(y);
      I.has(M) || (I.add(M), R.push(y));
    }), t.onChangeSelection({ pairs: R });
  }, dt = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), f && h(!1));
  }, at = (() => {
    switch (t.mode) {
      case "project": {
        const w = T(t.selection.projectId);
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
          const M = T(y.projectId);
          M && p.push({ project: M, scrollGroupId: y.scrollGroupId });
        }), p.length === 0) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        if (t.getSelectedText) {
          const y = t.getSelectedText(p);
          return { node: y, title: y };
        }
        const I = p.map(
          ({ project: y, scrollGroupId: M }) => M === void 0 ? y.shortName : `${y.shortName} (${it(M)})`
        ).join(", ");
        if (p.length === 1) return { node: I, title: I };
        const R = p.length.toString();
        return {
          node: /* @__PURE__ */ m(ut, { children: [
            /* @__PURE__ */ n(wt, { variant: "muted", className: "tw:shrink-0", children: R }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: I })
          ] }),
          title: `${R} ${I}`
        };
      }
      case "projectScrollGroup": {
        const w = T(t.selection.projectId);
        if (!w) {
          const R = t.buttonPlaceholder ?? "";
          return { node: R, title: R };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: w.shortName, title: w.shortName };
        const I = `${w.shortName} · ${it(p)}`;
        return { node: I, title: I };
      }
      default:
        return { node: "", title: "" };
    }
  })();
  let rt;
  t.isLoading ? rt = /* @__PURE__ */ n(ve, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? rt = void 0 : t.mode === "project-multi" ? rt = /* @__PURE__ */ n(_t, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : rt = /* @__PURE__ */ n(xe, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const se = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? B : void 0, Ct = /* @__PURE__ */ m(
    H,
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
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof at.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: at.node }) : at.node }),
        rt
      ]
    }
  ), ie = at.title ? /* @__PURE__ */ n(zt, { delayDuration: 400, children: /* @__PURE__ */ m(Yt, { children: [
    /* @__PURE__ */ n(Qt, { asChild: !0, children: /* @__PURE__ */ n(Nt, { asChild: !0, children: Ct }) }),
    /* @__PURE__ */ n(te, { children: at.title })
  ] }) }) : /* @__PURE__ */ n(Nt, { asChild: !0, children: Ct });
  return /* @__PURE__ */ m(Wt, { open: e, onOpenChange: S, children: [
    ie,
    /* @__PURE__ */ n(
      qt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: d("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(zt, { delayDuration: 400, children: /* @__PURE__ */ m(Vt, { shouldFilter: !1, children: [
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
              Ba,
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
            /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: lt, children: `${u.selectAll} (${L.length.toString()})` }),
            /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: dt, children: `${u.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ m(Ft, { children: [
            /* @__PURE__ */ n(Jt, { children: t.commandEmptyMessage ?? "No projects found" }),
            C.map((w, p) => (
              // Grouping schemes emit several sections of the same `kind`, so the key needs more
              // than that: custom sections carry an explicit `id`, and the rest are distinguished
              // by their heading label.
              /* @__PURE__ */ m(he, { children: [
                /* @__PURE__ */ n(Xt, { heading: Ma(w, u), children: w.rows.map((I) => /* @__PURE__ */ n(
                  La,
                  {
                    row: I,
                    mode: t.mode,
                    strings: u,
                    onClick: J,
                    onOpen: se,
                    selectedRowRef: v,
                    indicator: Q(I),
                    reserveIndicatorSlot: !!t.renderProjectIndicator
                  },
                  I.rowKey
                )) }),
                p < C.length - 1 && /* @__PURE__ */ n(Tt, {})
              ] }, w.id ?? `${w.kind}:${w.label ?? ""}`)
            )),
            t.footerAction && /* @__PURE__ */ m(ut, { children: [
              g.length > 0 && /* @__PURE__ */ n(
                Tt,
                {
                  alwaysRender: !0,
                  "data-testid": "project-selector-footer-separator"
                }
              ),
              /* @__PURE__ */ n(
                It,
                {
                  forceMount: !0,
                  value: za,
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
function Ma(t, e) {
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
const _a = Mt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, l) => {
    const c = V();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: d("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            ye,
            {
              className: d(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": c === "rtl" },
                { "tw:left-3": c === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            Ue,
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
            H,
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
                /* @__PURE__ */ n(ke, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
_a.displayName = "SearchBar";
const ja = 5;
function xo(t) {
  return Xe(t).filter(
    (e) => !G.isObsolete(G.bookIdToNumber(e))
  );
}
function Ua(t, e) {
  return t.filter((a) => {
    try {
      return Te(a) === e;
    } catch {
      return !1;
    }
  });
}
const yo = (t, e, a) => Ua(t, e).every((r) => a.includes(r));
function $a(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => G.bookIdToNumber(r) > 0).sort((r, o) => G.bookIdToNumber(r) - G.bookIdToNumber(o)).map((r) => Ze(r, e));
}
function ko(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((l) => o.has(l)))
    return a;
  const i = $a(t, r);
  if (i.length !== 0)
    return i.length <= ja ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
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
function Ha({ className: t, ...e }) {
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
function Va({ className: t, ...e }) {
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
const Ka = Z(
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
function Fa({
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
        Ka({ variant: e }),
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
function Ja({ className: t, ...e }) {
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
function Xa({ className: t, ...e }) {
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
  return /* @__PURE__ */ m(Ha, { className: d(s), role: o, children: [
    /* @__PURE__ */ m(Va, { children: [
      /* @__PURE__ */ n(Fa, { variant: "icon", children: r ?? /* @__PURE__ */ n(Ie, {}) }),
      /* @__PURE__ */ n(Ja, { children: t })
    ] }),
    a && /* @__PURE__ */ n(Xa, { children: /* @__PURE__ */ n(H, { onClick: () => a(), children: e }) })
  ] });
}
const Wa = Mt(({ className: t, ...e }, a) => /* @__PURE__ */ n(Se, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
Wa.displayName = "Spinner";
const Za = Z(
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
        Za({ variant: e }),
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
function Ao({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    kt.Group,
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
function Go({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    kt.Panel,
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
    kt.Separator,
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
  H as B,
  It as C,
  hr as D,
  Vr as E,
  Kr as F,
  Jr as G,
  Xr as H,
  Tr as I,
  Qr as J,
  wt as K,
  jr as L,
  oa as M,
  na as N,
  sa as O,
  Wt as P,
  oo as Q,
  Ur as R,
  Qe as S,
  zt as T,
  Zr as U,
  Gt as V,
  da as W,
  ia as X,
  co as Y,
  Oe as Z,
  wo as _,
  Ze as a,
  mo as a$,
  so as a0,
  uo as a1,
  io as a2,
  Yr as a3,
  la as a4,
  At as a5,
  fo as a6,
  bo as a7,
  Ut as a8,
  Ue as a9,
  Ve as aA,
  Eo as aB,
  zo as aC,
  To as aD,
  Fr as aE,
  br as aF,
  kr as aG,
  je as aH,
  _e as aI,
  gr as aJ,
  to as aK,
  Ha as aL,
  Xa as aM,
  Ja as aN,
  Va as aO,
  Fa as aP,
  Io as aQ,
  So as aR,
  No as aS,
  _r as aT,
  Br as aU,
  Mr as aV,
  Do as aW,
  Go as aX,
  Ao as aY,
  Co as aZ,
  Wa as a_,
  ot as aa,
  Tt as ab,
  Ir as ac,
  go as ad,
  po as ae,
  ho as af,
  Pr as ag,
  pa as ah,
  vo as ai,
  cr as aj,
  _a as ak,
  xo as al,
  Ua as am,
  Gr as an,
  yo as ao,
  Or as ap,
  xr as aq,
  We as ar,
  eo as as,
  ao as at,
  qr as au,
  ro as av,
  ae as aw,
  ft as ax,
  pt as ay,
  $e as az,
  Yt as b,
  lo as b0,
  fr as b1,
  Be as b2,
  Pe as b3,
  wr as b4,
  ur as b5,
  mr as b6,
  ra as b7,
  ta as b8,
  $t as b9,
  Wr as ba,
  zr as bb,
  Me as bc,
  fa as bd,
  ba as be,
  pr as bf,
  ko as bg,
  d as c,
  Qt as d,
  te as e,
  Nt as f,
  Dr as g,
  qt as h,
  Vt as i,
  Ft as j,
  Xt as k,
  Cr as l,
  Er as m,
  Rr as n,
  Je as o,
  Ar as p,
  Kt as q,
  V as r,
  Jt as s,
  $r as t,
  qe as u,
  Nr as v,
  vr as w,
  Sr as x,
  yr as y,
  Hr as z
};
//# sourceMappingURL=resizable-BYOkegWP.js.map
