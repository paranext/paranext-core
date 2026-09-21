import { jsx as n, jsxs as p, Fragment as Gt } from "react/jsx-runtime";
import { Slot as vt, Dialog as K, Separator as ne, Popover as ot, Tooltip as tt, DropdownMenu as C, Label as se, RadioGroup as ht, ToggleGroup as Bt } from "radix-ui";
import { IconX as ie, IconSearch as le, IconCheck as xt, IconChevronRight as de } from "@tabler/icons-react";
import { Canon as z } from "@sillsdev/scripture";
import { cva as X } from "class-variance-authority";
import G, { useState as V, useRef as dt, useCallback as J, createContext as ce, useContext as ue, useMemo as q, useEffect as zt, Fragment as we, forwardRef as Mt } from "react";
import { ChevronsUpDown as Ht, Check as Ut, Star as pe, Group as me, ArrowRight as fe, Loader2 as he, ChevronDown as ge, Search as be, X as Ne, AlertTriangle as ve, LoaderCircle as xe } from "lucide-react";
import { Section as Z, MODIFIER_KEYS as ye, normalizeProjectId as D, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as at, getLocalizeKeyForScrollGroupId as Se, getSectionForBook as ke } from "platform-bible-utils";
import { filterAndRankItems as jt } from "@eten-tech-foundation/platform-editor";
import { Command as Q } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as yt from "react-resizable-panels";
import { clsx as Ie } from "clsx";
import { extendTailwindMerge as Ee, twMerge as _e } from "tailwind-merge";
const Te = Ee({ prefix: "tw" });
function gt(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function Ce(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = gt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, f) => f !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, f) => f !== r), `!${s}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const s = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Ge(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = gt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = gt(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
  if (i && o.startsWith("-")) {
    const u = o.slice(1);
    return [...r, `-tw-${u}`].join(":");
  }
  if (l && o.startsWith("!")) {
    const u = o.slice(1);
    return [...r, `!tw-${u}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
function c(...t) {
  const e = Ie(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Te(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((u) => {
    const f = Ce(u);
    r.set(f.normalized, f.original), o.push(f.normalized);
  }), _e(o.join(" ")).split(" ").filter(Boolean).map((u) => {
    const f = r.get(u);
    return f ? Ge(u, f) : u;
  }).join(" ");
}
const $t = 600, Kt = 650, ar = 400, ze = 450, je = 500, Le = 675, rr = 690, or = 700, nr = 800, Ft = X(
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
      className: c(Ft({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Vt = "layoutDirection";
function M() {
  const t = localStorage.getItem(Vt);
  return t === "rtl" ? t : "ltr";
}
function sr(t) {
  localStorage.setItem(Vt, t);
}
function ir({ ...t }) {
  return /* @__PURE__ */ n(K.Root, { "data-slot": "dialog", ...t });
}
function lr({ ...t }) {
  return /* @__PURE__ */ n(K.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ae({ ...t }) {
  return /* @__PURE__ */ n(K.Portal, { "data-slot": "dialog-portal", ...t });
}
function dr({ ...t }) {
  return /* @__PURE__ */ n(K.Close, { "data-slot": "dialog-close", ...t });
}
function Re({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    K.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: ze, ...e },
      ...a
    }
  );
}
function cr({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...s
}) {
  const i = M();
  return /* @__PURE__ */ p(Ae, { children: [
    /* @__PURE__ */ n(Re, { className: r }),
    /* @__PURE__ */ p(
      K.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: je, ...o },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ n(K.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(H, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(ie, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function ur({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function wr({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
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
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ n(K.Close, { asChild: !0, children: /* @__PURE__ */ n(H, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function pr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    K.Title,
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
function mr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    K.Description,
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
function De({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
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
function Pe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Oe = X(
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
function Be({
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
        className: c(Oe({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
X("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Jt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Q,
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
function Xt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const o = M(), s = G.useCallback(
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
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ p(Pe, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        Q.Input,
        {
          "data-slot": "command-input",
          className: c(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...r
        }
      ),
      /* @__PURE__ */ n(Be, { children: /* @__PURE__ */ n(le, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Wt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Q.List,
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
function Zt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Q.Empty,
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
function qt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Q.Group,
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
function Lt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Q.Separator,
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
function St({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    Q.Item,
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
        /* @__PURE__ */ n(xt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function fr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Me = [
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
], He = (t) => {
  var e;
  return ((e = Me[t]) == null ? void 0 : e.chapters) ?? -1;
}, Ue = z.allBookIds.filter(
  (t) => !z.isObsolete(z.bookIdToNumber(t))
);
function $e(t) {
  const e = [], a = Math.min(t.length, z.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(z.bookNumberToId(r + 1));
  return e;
}
function N(t) {
  return `%scrollGroup_${t}%`;
}
const Ke = {
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
function kt(t, e) {
  return He(z.bookIdToNumber(t));
}
function ut(t, e, a) {
  const r = z.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = z.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (o = i, s = l);
  }), o;
}
function hr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = ut(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(kt(s), 1),
      verseNum: 1
    };
}
function gr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < kt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = ut(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function br(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = ut(r, e, "previous");
  if (!i) return;
  const l = Math.max(kt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Nr(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = ut(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function vr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const xr = (t, e, a, r, o) => {
  switch (t) {
    case Z.OT:
      return e ?? "Old Testament";
    case Z.NT:
      return a ?? "New Testament";
    case Z.DC:
      return r ?? "Deuterocanon";
    case Z.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, yr = (t, e, a, r, o) => {
  switch (t) {
    case Z.OT:
      return e ?? "OT";
    case Z.NT:
      return a ?? "NT";
    case Z.DC:
      return r ?? "DC";
    case Z.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Sr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? z.bookIdToEnglishName(t);
}
function Fe(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const kr = Object.fromEntries(
  Ue.map((t) => [t, z.bookIdToEnglishName(t)])
);
function Ir(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = z.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(o.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
const At = `
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
function Ve(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function nt(t, e) {
  const a = e ? `${At}, ${e}` : At;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Ve(r)
  );
}
const Er = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
function Je({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    ne.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
const Xe = X(
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
function _r({
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
        Xe({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Tr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? vt.Root : "div";
  return /* @__PURE__ */ n(
    r,
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
function Cr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    Je,
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
function Yt({ ...t }) {
  return /* @__PURE__ */ n(ot.Root, { "data-slot": "popover", ...t });
}
function bt({ ...t }) {
  return /* @__PURE__ */ n(ot.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Qt = G.createContext(null);
function Gr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(Qt.Provider, { value: t, children: e });
}
function te({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = M(), i = G.useContext(Qt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(ot.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      ot.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: $t, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function zr({ ...t }) {
  return /* @__PURE__ */ n(ot.Anchor, { "data-slot": "popover-anchor", ...t });
}
function jr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Lr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ar({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Rt({
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
function It({ ...t }) {
  return /* @__PURE__ */ n(tt.Root, { "data-slot": "tooltip", ...t });
}
function Et({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    tt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(Ft({ variant: e }), t) : t,
      ...a
    }
  );
}
function _t({
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
  return /* @__PURE__ */ n(tt.Portal, { children: /* @__PURE__ */ p(
    tt.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Le, ...a },
      className: c(
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
            className: c(
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
function We() {
  const [t, e] = V(!1), a = dt(null), r = J(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = J(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
const ee = ce(void 0);
function wt() {
  const t = ue(ee);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const pt = X("", {
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
  const a = M(), r = G.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(ee.Provider, { value: r, children: /* @__PURE__ */ n(C.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function Rr({
  ...t
}) {
  return /* @__PURE__ */ n(C.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function qe({
  ...t
}) {
  return /* @__PURE__ */ n(C.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ye({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  children: o,
  ...s
}) {
  const i = M();
  return /* @__PURE__ */ n(C.Portal, { children: /* @__PURE__ */ n(
    C.Content,
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
        "pr-twp tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: $t, ...r },
      ...s,
      children: /* @__PURE__ */ n("div", { dir: i, children: o })
    }
  ) });
}
function Dr({ ...t }) {
  return /* @__PURE__ */ n(C.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Pr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = M(), s = wt();
  return /* @__PURE__ */ n(
    C.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
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
function Or({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const s = M(), i = wt();
  return /* @__PURE__ */ p(
    C.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: c(
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
            children: /* @__PURE__ */ n(C.ItemIndicator, { children: /* @__PURE__ */ n(xt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Qe({
  ...t
}) {
  return /* @__PURE__ */ n(C.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Dt({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = M(), s = wt();
  return /* @__PURE__ */ p(
    C.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
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
            children: /* @__PURE__ */ n(C.ItemIndicator, { children: /* @__PURE__ */ n(xt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ta({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    C.Label,
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
function ea({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    C.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Br({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: c(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Mr({ ...t }) {
  return /* @__PURE__ */ n(C.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Hr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = wt();
  return /* @__PURE__ */ p(
    C.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        pt({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(de, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ur({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: a,
  ...r
}) {
  const o = M();
  return /* @__PURE__ */ n(
    C.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop),
        // keeping submenus on the same overlay tier as their parent DropdownMenuContent
        "pr-twp tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Kt, ...e },
      ...r,
      children: /* @__PURE__ */ n("div", { dir: o, children: a })
    }
  );
}
function $r({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    se.Root,
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
function Kr({
  className: t,
  ...e
}) {
  const a = M();
  return /* @__PURE__ */ n(
    ht.Root,
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
function Fr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    ht.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        ht.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const aa = X(
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
function Vr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: o = "horizontal",
  children: s,
  ...i
}) {
  const l = M();
  return /* @__PURE__ */ n(
    Bt.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": o,
      style: { "--gap": r },
      className: c(
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
function Jr({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...o
}) {
  const s = G.useContext(ae);
  return /* @__PURE__ */ n(
    Bt.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        aa({
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
function Xr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Wr() {
  return /Windows/i.test(navigator.userAgent);
}
const ra = ["input", "select", "textarea", "button"], oa = ["button", "textbox"], Zr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = dt(null), [s, i] = V(void 0), [l, u] = V(void 0), f = J(
    (w) => {
      i(w);
      const g = t.find((b) => b.id === w);
      g && (e == null || e(g));
      const v = document.getElementById(w);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), o.current && o.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), h = J(
    (w) => {
      const g = t.find((v) => v.id === w);
      g && (u((v) => v === w ? void 0 : w), a == null || a(g));
    },
    [a, t]
  ), k = (w) => {
    if (!w) return !1;
    const g = w.tagName.toLowerCase();
    if (w.isContentEditable || ra.includes(g)) return !0;
    const v = w.getAttribute("role");
    if (v && oa.includes(v)) return !0;
    const b = w.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, I = J(
    (w) => {
      var _;
      const g = w.target, v = (y) => y ? document.getElementById(y) : void 0, b = v(l), U = v(s);
      if (!!(b && g && b.contains(g) && g !== b) && k(g)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const y = t.find((B) => B.id === l);
            y && f(y.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!b) return;
          const y = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (y.length === 0) return;
          const B = y.findIndex((P) => P === g);
          if (B === -1) return;
          let S;
          w.key === "ArrowDown" ? S = Math.min(B + 1, y.length - 1) : S = Math.max(B - 1, 0), S !== B && (w.preventDefault(), w.stopPropagation(), (_ = y[S]) == null || _.focus());
          return;
        }
        return;
      }
      const $ = t.findIndex((y) => y.id === s);
      let j = $;
      switch (w.key) {
        case "ArrowDown":
          j = Math.min($ + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          j = Math.max($ - 1, 0), w.preventDefault();
          break;
        case "Home":
          j = 0, w.preventDefault();
          break;
        case "End":
          j = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && h(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const y = U;
          if (y) {
            const B = y.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = y.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), P = B ?? S;
            if (P) {
              w.preventDefault(), P.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (k(g) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const F = t[j];
      F && f(F.id);
    },
    [t, f, s, l, h, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: I,
    /** Focus an option by its ID */
    focusOption: f
  };
}, na = X(
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
function ct({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? vt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
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
function qr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Yr({
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
        nt(i, '[tabindex]:not([tabindex="-1"])').forEach((h) => {
          h.setAttribute("tabindex", "-1");
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
    const { current: l } = o;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), nt(l)[0].focus();
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
            ref: o,
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
            ...r
          }
        )
      }
    )
  );
}
function Qr({
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
function to({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function eo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function sa(t) {
  G.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? nt(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function ia(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function la(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ao({
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
  }, [o]), sa(i);
  const l = G.useMemo(
    () => i.current ? nt(i.current) : [],
    [i]
  ), u = G.useCallback(
    (h) => {
      const { current: k } = i;
      if (!k || !k.parentElement) return;
      const I = k.closest("table"), w = I ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        nt(I).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = w.indexOf(k), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (h.key === "ArrowDown" || h.key === "ArrowUp")
        h.preventDefault(), la(w, g, h.key);
      else if (h.key === "ArrowLeft" || h.key === "ArrowRight")
        h.preventDefault(), ia(l, v, h.key);
      else if (h.key === "Escape") {
        h.preventDefault();
        const b = k.closest("table");
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
      onKeyDown: u,
      onFocus: f,
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
function ro({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function oo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function no({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function so({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: u,
  isOpen: f = void 0,
  onOpenChange: h = void 0,
  isDisabled: k = !1,
  sortSelected: I = !1,
  icon: w = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [U, W] = V(!1), O = J(
    (S) => {
      var d;
      const P = (d = t.find((m) => m.label === S)) == null ? void 0 : d.value;
      P && a(
        e.includes(P) ? e.filter((m) => m !== P) : [...e, P]
      );
    },
    [t, e, a]
  ), $ = () => u || r, j = q(() => {
    if (!I) return t;
    const S = t.filter((d) => d.starred).sort((d, m) => d.label.localeCompare(m.label)), P = t.filter((d) => !d.starred).sort((d, m) => {
      const T = e.includes(d.value), E = e.includes(m.value);
      return T && !E ? -1 : !T && E ? 1 : d.label.localeCompare(m.label);
    });
    return [...S, ...P];
  }, [t, e, I]), F = () => {
    a(t.map((S) => S.value));
  }, _ = () => {
    a([]);
  }, y = f ?? U;
  return /* @__PURE__ */ n("div", { id: b, className: g, children: /* @__PURE__ */ p(Yt, { open: y, onOpenChange: h ?? W, children: [
    /* @__PURE__ */ n(bt, { asChild: !0, children: /* @__PURE__ */ p(
      H,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": y,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: k,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            w && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: w }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: $()
              }
            )
          ] }),
          /* @__PURE__ */ n(Ht, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(te, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Jt, { children: [
      /* @__PURE__ */ n(
        Xt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      o && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: F, children: s }),
        /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: _, children: i })
      ] }),
      /* @__PURE__ */ p(Wt, { children: [
        /* @__PURE__ */ n(Zt, { children: l }),
        /* @__PURE__ */ n(qt, { children: j.map((S) => /* @__PURE__ */ p(
          St,
          {
            value: S.label,
            onSelect: O,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                Ut,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(S.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ n(pe, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
            ]
          },
          S.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function rt(t) {
  return t.replace(/^\+/, "");
}
function da(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = rt(e).toLowerCase();
  return a === "passive" ? jt({
    query: o,
    items: r,
    filter: (s) => rt(s.label).toLowerCase().startsWith(o),
    sortBy: "label"
  }) : jt({
    query: o,
    items: r,
    filter: (s) => rt(s.label).toLowerCase().includes(o),
    sortBy: "label"
  });
}
function ca(t) {
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
}, ua = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], wa = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function pa(t) {
  return [
    ...ua,
    ...wa.filter((e) => re[t].test(e))
  ];
}
function R(t) {
  t.preventDefault(), t.stopPropagation();
}
function io(t, e, a) {
  var o, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (R(t), a.commit(), "ended") : t.key === "Escape" ? (R(t), a.dismiss(), "ended") : "passed";
  if (ca(t) || ye.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((o = t.getModifierState) != null && o.call(t, "AltGraph")))
    return t.key === "Enter" && R(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return R(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return R(t), da(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return R(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return R(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    R(t);
    const i = rt(e.filter).toLowerCase(), l = e.items.find(
      (u) => rt(u.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (R(t), a.dismiss(), "ended") : (R(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (R(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (R(t), a.dismiss(), "ended") : t.key === "Backspace" || re[r].test(t.key) ? (R(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && R(t), a.dismiss(), "ended");
}
function lo(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function co(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: o,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: f,
    focusEditor: h,
    applyItem: k,
    onShowError: I
  } = t;
  o.current += 1;
  const w = o.current, g = a ? "backslash" : "selection", v = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && r && (v.shouldSpaceCommit = r), s(v), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: pa(g),
    onKey: (b) => l(b)
  }).then((b) => {
    if (i(w), b !== void 0) {
      f(), h();
      const U = e.find((W) => W.marker === b);
      U && k(U);
    } else a || h();
  }).catch((b) => {
    i(w), a || h(), I(b);
  });
}
function uo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function wo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function ma(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = D(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function Pt(t, e, a) {
  const r = D(e);
  return t.some(
    (o) => D(o.projectId) === r && o.scrollGroupId === a
  );
}
function mt(t) {
  const e = ma(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId === void 0 ? void 0 : D(t.selection.projectId);
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
        isSelected: o !== void 0 && o === D(s.id),
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
  return t.projects.forEach((o) => {
    const s = e.get(D(o.id));
    if (!s || s.length === 0) {
      r.push({
        rowKey: `project:${o.id}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Pt(a, o.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        project: o
      });
      return;
    }
    s.forEach((i) => {
      r.push({
        rowKey: `tab:${o.id}:${i.scrollGroupId}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Pt(a, o.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        project: o
      });
    });
  }), a.forEach((o) => {
    if (o.scrollGroupId === void 0) return;
    const s = D(o.projectId);
    if (r.some(
      (l) => D(l.projectId) === s && l.scrollGroupId === o.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => D(l.id) === s);
    i && r.push({
      rowKey: `closed:${i.id}:${o.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      scrollGroupId: o.scrollGroupId,
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
const Tt = "Selected", Ct = "Unselected";
function Ot(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Y(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function Nt(t) {
  return [{ kind: "flat", rows: [...t].sort(Y) }];
}
function fa(t) {
  const e = t.filter(Ot).sort(Y), a = t.filter((o) => !Ot(o)).sort(Y);
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const r = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && r.push({ kind: "other", rows: a }), r;
}
function ha(t, e) {
  const a = t.filter((i) => i.isSelected).sort(Y), r = t.filter((i) => !i.isSelected).sort(Y), o = (i, l) => {
    var f;
    const u = (f = e.getSectionHeading) == null ? void 0 : f.call(
      e,
      i,
      l.map((h) => h.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? Tt : Ct;
  }, s = [];
  return a.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: o("selected", a),
    rows: a
  }), r.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: o("unselected", r),
    rows: r
  }), s;
}
function ga(t, e) {
  if (e.id === "openTabs") return fa(t);
  if (e.id === "selection") return ha(t, e);
  if (!e.getGroupKey) return Nt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: o } = e;
  t.forEach((l) => {
    const u = o(l.project);
    if (u === void 0 || u === "") {
      r.push(l);
      return;
    }
    const f = a.get(u);
    f ? f.push(l) : a.set(u, [l]);
  });
  const s = [...a.entries()].map(([l, u]) => {
    var k;
    const f = [...u].sort(
      (I, w) => {
        var g;
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, I.project, w.project)) || Y(I, w);
      }
    ), h = ((k = e.getSectionHeading) == null ? void 0 : k.call(
      e,
      l,
      f.map((I) => I.project)
    )) ?? l;
    return { key: l, heading: h, rows: f };
  });
  s.sort((l, u) => l.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: u.key, heading: u.heading }
  ) : l.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: u, rows: f }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: u,
    rows: f,
    isPriority: l === e.priorityKey
  }));
  return r.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...r].sort(Y)
  }), i;
}
const po = [
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
function x(t, e) {
  const a = t[e];
  return typeof a == "string" ? a : void 0;
}
const it = "recent", ba = "other";
function oe(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Na(t) {
  const e = t ?? {};
  return [
    oe(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (a) => {
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r[at.lastUsedAt]) == "number" ? it : ba;
      },
      getSectionHeading: (a) => a === it ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, r) => a.key === it ? -1 : r.key === it ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (a) => {
        var o;
        const r = (o = a.customData) == null ? void 0 : o[at.language];
        return typeof r == "string" ? r : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (a) => {
        var o;
        const r = (o = a.customData) == null ? void 0 : o[at.type];
        return typeof r == "string" ? r : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (a, r) => {
        var i;
        const o = r.find(
          (l) => {
            var u;
            return typeof ((u = l.customData) == null ? void 0 : u[at.typeName]) == "string";
          }
        ), s = (i = o == null ? void 0 : o.customData) == null ? void 0 : i[at.typeName];
        return typeof s == "string" && s.length > 0 ? s : a;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const mo = Na();
function va(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (a) => a === "selected" ? e.selectedSectionHeading ?? Tt : e.unselectedSectionHeading ?? Ct
  };
}
function fo(t) {
  return {
    openTabsLabel: x(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: x(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: x(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: x(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: x(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: x(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: x(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: x(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function ho(t) {
  return {
    label: x(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: x(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: x(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const xa = 100, ya = {
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
  autoSelectionSelectedSectionHeading: Tt,
  autoSelectionUnselectedSectionHeading: Ct,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Sa(t) {
  return { ...ya, ...t };
}
function go(t) {
  return {
    searchPlaceholder: x(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: x(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: x(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: x(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: x(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: x(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: x(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: x(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: x(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: x(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: x(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: x(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: x(t, "%projectSelector_openButtonLabel%"),
    clearAll: x(t, "%projectSelector_clearAll%")
  };
}
function st(t) {
  return Ke[Se(t)] ?? String(t);
}
const ka = "platform.footerAction", Ia = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ea({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = st(t);
  return e ? /* @__PURE__ */ n(
    ct,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ia,
      children: a
    }
  ) : /* @__PURE__ */ n(ct, { variant: "secondary", children: a });
}
function _a({
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
    ref: u,
    open: f,
    onPointerEnter: h,
    onPointerLeave: k
  } = We(), [I, w] = V(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, v = f || I, b = J(() => {
    if (g) {
      w(!0);
      return;
    }
    h();
  }, [g, h]), U = J(() => {
    w(!1), k();
  }, [k]), W = /* @__PURE__ */ n(Ut, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let O;
  e === "project" ? t.openGroups.length > 0 && (O = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((_) => /* @__PURE__ */ n(ct, { variant: "secondary", children: st(_) }, _)) })) : t.scrollGroupId !== void 0 && (O = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Ea,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ p(
      H,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (_) => {
          _.stopPropagation(), o(t);
        },
        onMouseDown: (_) => _.stopPropagation(),
        "aria-label": a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(fe, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const $ = /* @__PURE__ */ p(
    St,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: b,
      onPointerLeave: U,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: W }),
        l && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        O
      ]
    }
  ), j = t.scrollGroupId !== void 0 ? st(t.scrollGroupId) : void 0, F = t.isBoundButClosed && j ? a.boundButClosedTooltip.replace("{group}", j) : void 0;
  return /* @__PURE__ */ p(It, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ n(Et, { asChild: !0, children: $ }),
    /* @__PURE__ */ p(
      _t,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && j && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              j,
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
const et = "none";
function Ta({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: r
}) {
  const o = e !== et;
  return /* @__PURE__ */ p(Ze, { children: [
    /* @__PURE__ */ p(It, { children: [
      /* @__PURE__ */ n(Et, { asChild: !0, children: /* @__PURE__ */ n(qe, { asChild: !0, children: /* @__PURE__ */ n(
        H,
        {
          variant: "ghost",
          size: "sm",
          className: c(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            o && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": r.groupByAriaLabel,
          "aria-pressed": o,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ n(me, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ n(_t, { children: r.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
      Ye,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Kt },
        children: [
          /* @__PURE__ */ n(ta, { children: r.groupSectionLabel }),
          /* @__PURE__ */ p(Qe, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ n(Dt, { value: et, children: r.groupByNone }),
            /* @__PURE__ */ n(ea, {}),
            t.map((s) => /* @__PURE__ */ n(Dt, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Ca(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === et) return et;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : et;
}
function ft(t, e) {
  if (e === void 0) return;
  const a = D(e);
  return t.find((r) => D(r.id) === a);
}
function bo(t) {
  const [e, a] = V(!1), [r, o] = V(""), s = Sa(t.localizedStrings), i = q(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const d = [];
    return t.openTabs.length > 0 && d.push(oe(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && d.push(
      va({
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
  ]), [l, u] = V(void 0), f = q(
    () => Ca(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), h = l ?? f, k = dt(null), I = J((d) => {
    a(d), d || o("");
  }, []);
  zt(() => {
    if (!e) return;
    const d = window.requestAnimationFrame(() => {
      const m = k.current;
      m && m.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(d);
  }, [e]);
  const w = q(() => t.mode === "project" ? mt({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? mt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : mt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), g = q(() => {
    const d = r.trim().toLowerCase();
    return d ? w.filter(
      (m) => m.shortName.toLowerCase().includes(d) || m.fullName.toLowerCase().includes(d)
    ) : w;
  }, [w, r]), v = q(() => {
    if (h === et) return Nt(g);
    const d = i.find((m) => m.id === h);
    return d ? ga(g, d) : Nt(g);
  }, [g, h, i]), b = (d) => {
    if (d.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
    }
  }, U = (d) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: d.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const m = t.selection.pairs, T = D(d.projectId), E = (A) => D(A.projectId) === T && A.scrollGroupId === d.scrollGroupId, L = m.some(E) ? m.filter((A) => !E(A)) : [
          ...m.filter((A) => !E(A)),
          { projectId: d.projectId, scrollGroupId: d.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: L });
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
        const m = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: d.projectId, scrollGroupId: m }), t.onOpenProjectInGroup(d.projectId, m), a(!1);
      }
    }
  }, W = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, O = q(() => {
    switch (t.mode) {
      case "project": {
        const d = ft(t.projects, t.selection.projectId);
        if (t.renderTriggerLabel)
          return { node: t.renderTriggerLabel(d), title: "" };
        let m = d ? d.shortName : s.buttonPlaceholder;
        return d && t.triggerLabelFormat === "shortNameAndFullName" && d.fullName && d.fullName !== d.shortName && (m = `${d.shortName} - ${d.fullName}`), { node: m, title: m };
      }
      case "project-multi": {
        const { pairs: d } = t.selection;
        if (d.length === 0) {
          const L = s.buttonPlaceholder;
          return { node: L, title: L };
        }
        const m = [];
        if (d.forEach((L) => {
          const A = ft(t.projects, L.projectId);
          A && m.push({ project: A, scrollGroupId: L.scrollGroupId });
        }), m.length === 0) {
          const L = s.buttonPlaceholder;
          return { node: L, title: L };
        }
        const T = m.map(
          ({ project: L, scrollGroupId: A }) => A === void 0 ? L.shortName : `${L.shortName} (${st(A)})`
        ).join(", "), E = m.length.toString();
        return {
          node: /* @__PURE__ */ p(Gt, { children: [
            /* @__PURE__ */ n(ct, { variant: "muted", className: "tw:shrink-0", children: E }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: T })
          ] }),
          title: `${E} ${T}`
        };
      }
      case "projectScrollGroup": {
        const d = ft(t.projects, t.selection.projectId);
        if (!d) {
          const E = s.buttonPlaceholder;
          return { node: E, title: E };
        }
        const m = t.selection.scrollGroupId;
        if (m === void 0)
          return { node: d.shortName, title: d.shortName };
        const T = `${d.shortName} · ${st(m)}`;
        return { node: T, title: T };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t, s.buttonPlaceholder]), $ = dt(null), [j, F] = V(!1);
  zt(() => {
    const d = $.current;
    if (!d) return;
    const m = (E) => {
      F(E < xa);
    };
    if (m(d.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const T = new ResizeObserver((E) => {
      E.forEach((L) => {
        const [A] = L.borderBoxSize;
        m(A ? A.inlineSize : d.getBoundingClientRect().width);
      });
    });
    return T.observe(d, { box: "border-box" }), () => T.disconnect();
  }, []);
  let _;
  t.isLoading ? _ = /* @__PURE__ */ n(he, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : j ? _ = void 0 : t.mode === "project-multi" ? _ = /* @__PURE__ */ n(Ht, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : _ = /* @__PURE__ */ n(ge, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const y = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? b : void 0, B = /* @__PURE__ */ p(
    H,
    {
      ref: $,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": s.ariaLabel || void 0,
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
        j && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof O.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: O.node }) : O.node }),
        _
      ]
    }
  ), S = O.title ? /* @__PURE__ */ n(Rt, { delayDuration: 400, children: /* @__PURE__ */ p(It, { children: [
    /* @__PURE__ */ n(Et, { asChild: !0, children: /* @__PURE__ */ n(bt, { asChild: !0, children: B }) }),
    /* @__PURE__ */ n(_t, { children: O.title })
  ] }) }) : /* @__PURE__ */ n(bt, { asChild: !0, children: B }), P = i.length > 1;
  return /* @__PURE__ */ p(Yt, { open: e, onOpenChange: I, children: [
    S,
    /* @__PURE__ */ n(
      te,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ n(Rt, { delayDuration: 400, children: /* @__PURE__ */ p(Jt, { shouldFilter: !1, children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
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
              Ta,
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
          /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ n(H, { variant: "ghost", size: "sm", onClick: W, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
          /* @__PURE__ */ p(Wt, { children: [
            /* @__PURE__ */ n(Zt, { children: s.commandEmptyMessage }),
            v.map((d, m) => (
              // Custom groupings yield multiple 'grouping' sections, so the section key must
              // include the label (or key) to stay stable across re-orders.
              /* @__PURE__ */ p(
                we,
                {
                  children: [
                    /* @__PURE__ */ n(qt, { heading: Ga(d, s), children: d.rows.map((T) => {
                      var E;
                      return /* @__PURE__ */ n(
                        _a,
                        {
                          row: T,
                          mode: t.mode,
                          strings: s,
                          onClick: U,
                          onOpen: y,
                          selectedRowRef: k,
                          indicator: (E = t.renderProjectIndicator) == null ? void 0 : E.call(t, T.project),
                          reserveIndicatorSlot: !!t.renderProjectIndicator
                        },
                        T.rowKey
                      );
                    }) }),
                    m < v.length - 1 && /* @__PURE__ */ n(Lt, {})
                  ]
                },
                `${d.kind}:${d.groupingId ?? ""}:${d.key ?? d.label ?? ""}`
              )
            )),
            t.footerAction && /* @__PURE__ */ p(Gt, { children: [
              g.length > 0 && /* @__PURE__ */ n(
                Lt,
                {
                  alwaysRender: !0,
                  "data-testid": "project-selector-footer-separator"
                }
              ),
              /* @__PURE__ */ n(
                St,
                {
                  forceMount: !0,
                  value: ka,
                  "data-testid": "project-selector-footer-action",
                  onSelect: () => {
                    var d;
                    (d = t.footerAction) == null || d.onSelect(), I(!1);
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
function Ga(t, e) {
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
const za = Mt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, l) => {
    const u = M();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: c("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            be,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            De,
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
              onChange: (f) => e(f.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ p(
            H,
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
                /* @__PURE__ */ n(Ne, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
za.displayName = "SearchBar";
const ja = 5;
function No(t) {
  return $e(t).filter(
    (e) => !z.isObsolete(z.bookIdToNumber(e))
  );
}
function La(t, e) {
  return t.filter((a) => {
    try {
      return ke(a) === e;
    } catch {
      return !1;
    }
  });
}
const vo = (t, e, a) => La(t, e).every((r) => a.includes(r));
function Aa(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => z.bookIdToNumber(r) > 0).sort((r, o) => z.bookIdToNumber(r) - z.bookIdToNumber(o)).map((r) => Fe(r, e));
}
function xo(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((l) => o.has(l)))
    return a;
  const i = Aa(t, r);
  if (i.length !== 0)
    return i.length <= ja ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function yo({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ n(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: c("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
function Ra({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Da({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
const Pa = X(
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
function Oa({
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
        Pa({ variant: e }),
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
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function Ba({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function Ma({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function ko({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: o = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(Ra, { className: c(s), role: o, children: [
    /* @__PURE__ */ p(Da, { children: [
      /* @__PURE__ */ n(Oa, { variant: "icon", children: r ?? /* @__PURE__ */ n(ve, {}) }),
      /* @__PURE__ */ n(Ba, { children: t })
    ] }),
    a && /* @__PURE__ */ n(Ma, { children: /* @__PURE__ */ n(H, { onClick: () => a(), children: e }) })
  ] });
}
const Ha = Mt(({ className: t, ...e }, a) => /* @__PURE__ */ n(xe, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
Ha.displayName = "Spinner";
const Ua = X(
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
function Io({
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
        Ua({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function Eo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function _o({ className: t, ...e }) {
  return /* @__PURE__ */ n(
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
function To({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    yt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: c(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...o
    }
  );
}
function lt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Co({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    yt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: lt(t),
      minSize: lt(e),
      maxSize: lt(a),
      collapsedSize: lt(r),
      ...o
    }
  );
}
function Go({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    yt.Separator,
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
  oo as $,
  kr as A,
  H as B,
  St as C,
  Ze as D,
  Zt as E,
  $r as F,
  Fr as G,
  ir as H,
  Nr as I,
  cr as J,
  ur as K,
  Er as L,
  pr as M,
  Vr as N,
  Jr as O,
  Yt as P,
  Xr as Q,
  Kr as R,
  ct as S,
  Rt as T,
  Je as U,
  qr as V,
  Zr as W,
  ea as X,
  Or as Y,
  $t as Z,
  ao as _,
  Fe as a,
  no as a$,
  Yr as a0,
  Qr as a1,
  ro as a2,
  to as a3,
  Dr as a4,
  Qe as a5,
  Dt as a6,
  so as a7,
  uo as a8,
  Kt as a9,
  Be as aA,
  Io as aB,
  _o as aC,
  Eo as aD,
  Tr as aE,
  dr as aF,
  mr as aG,
  Re as aH,
  Ae as aI,
  lr as aJ,
  Br as aK,
  Ra as aL,
  Ma as aM,
  Ba as aN,
  Da as aO,
  Oa as aP,
  yo as aQ,
  So as aR,
  wo as aS,
  Ar as aT,
  jr as aU,
  Lr as aV,
  Go as aW,
  Co as aX,
  To as aY,
  ko as aZ,
  Ha as a_,
  De as aa,
  rt as ab,
  Lt as ac,
  fr as ad,
  co as ae,
  io as af,
  lo as ag,
  zr as ah,
  ca as ai,
  bo as aj,
  za as ak,
  No as al,
  La as am,
  yr as an,
  vo as ao,
  Gr as ap,
  wr as aq,
  Ke as ar,
  Mr as as,
  Hr as at,
  Rr as au,
  Ur as av,
  ee as aw,
  wt as ax,
  pt as ay,
  Pe as az,
  It as b,
  eo as b0,
  nr as b1,
  or as b2,
  je as b3,
  ze as b4,
  rr as b5,
  ar as b6,
  na as b7,
  Xe as b8,
  Ft as b9,
  Wr as ba,
  vr as bb,
  et as bc,
  po as bd,
  Le as be,
  fo as bf,
  go as bg,
  ho as bh,
  mo as bi,
  da as bj,
  pa as bk,
  Na as bl,
  va as bm,
  sr as bn,
  xo as bo,
  c,
  Et as d,
  _t as e,
  qe as f,
  Sr as g,
  Ye as h,
  ta as i,
  Pr as j,
  gr as k,
  br as l,
  Ir as m,
  qt as n,
  Ue as o,
  xr as p,
  bt as q,
  M as r,
  te as s,
  Jt as t,
  We as u,
  Xt as v,
  _r as w,
  hr as x,
  Cr as y,
  Wt as z
};
//# sourceMappingURL=resizable-Ddgq4R9h.js.map
