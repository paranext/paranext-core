import { jsx as n, jsxs as p, Fragment as zt } from "react/jsx-runtime";
import { Slot as pt, Dialog as H, Popover as et, Tooltip as Y, Label as Yt, RadioGroup as wt, ToggleGroup as Gt, Separator as Qt, DropdownMenu as E } from "radix-ui";
import { IconX as te, IconSearch as ee, IconCheck as ht, IconChevronRight as ae } from "@tabler/icons-react";
import { Canon as A } from "@sillsdev/scripture";
import G, { useState as M, useRef as nt, useCallback as F, createContext as re, useContext as oe, useEffect as gt, useMemo as Z, Fragment as ne, forwardRef as At } from "react";
import { cva as J } from "class-variance-authority";
import { ChevronsUpDown as Dt, Check as Lt, Star as se, Filter as ie, ArrowRight as le, Loader2 as de, ChevronDown as ce, Search as ue, X as we, LoaderCircle as me } from "lucide-react";
import { Section as V, MODIFIER_KEYS as fe, normalizeProjectId as at, getLocalizeKeyForScrollGroupId as pe, getSectionForBook as he } from "platform-bible-utils";
import { filterAndRankItems as yt } from "@eten-tech-foundation/platform-editor";
import { Command as X } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as bt from "react-resizable-panels";
import { clsx as ge } from "clsx";
import { extendTailwindMerge as be, twMerge as Ne } from "tailwind-merge";
const ve = be({ prefix: "tw" });
function mt(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function xe(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = mt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
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
function ye(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = mt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = mt(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
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
  const e = ge(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return ve(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((u) => {
    const f = xe(u);
    r.set(f.normalized, f.original), o.push(f.normalized);
  }), Ne(o.join(" ")).split(" ").filter(Boolean).map((u) => {
    const f = r.get(u);
    return f ? ye(u, f) : u;
  }).join(" ");
}
const Ie = 600, Ma = 650, Rt = 400, ke = 450, Se = 500, Ce = 550, Oa = 700, Bt = J(
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
function O({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...o
}) {
  const s = r ? pt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: c(Bt({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Pt = "layoutDirection";
function B() {
  const t = localStorage.getItem(Pt);
  return t === "rtl" ? t : "ltr";
}
function ja(t) {
  localStorage.setItem(Pt, t);
}
function _a({ ...t }) {
  return /* @__PURE__ */ n(H.Root, { "data-slot": "dialog", ...t });
}
function $a({ ...t }) {
  return /* @__PURE__ */ n(H.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ee({ ...t }) {
  return /* @__PURE__ */ n(H.Portal, { "data-slot": "dialog-portal", ...t });
}
function Ha({ ...t }) {
  return /* @__PURE__ */ n(H.Close, { "data-slot": "dialog-close", ...t });
}
function Te({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    H.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: ke, ...e },
      ...a
    }
  );
}
function Fa({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...s
}) {
  const i = B();
  return /* @__PURE__ */ p(Ee, { children: [
    /* @__PURE__ */ n(Te, { className: r }),
    /* @__PURE__ */ p(
      H.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Se, ...o },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ n(H.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(O, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(te, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ka({ className: t, ...e }) {
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
function Va({
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
        e && /* @__PURE__ */ n(H.Close, { asChild: !0, children: /* @__PURE__ */ n(O, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ja({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    H.Title,
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
function Ua({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    H.Description,
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
function ze({ className: t, type: e, ...a }) {
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
function Ge({ className: t, ...e }) {
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
const Ae = J(
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
function De({
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
        className: c(Ae({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
J("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Mt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    X,
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
function Ot({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const o = B(), s = G.useCallback(
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
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ p(Ge, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        X.Input,
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
      /* @__PURE__ */ n(De, { children: /* @__PURE__ */ n(ee, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function jt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    X.List,
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
function _t({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    X.Empty,
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
function $t({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    X.Group,
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
function Le({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    X.Separator,
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
function Ht({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    X.Item,
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
        /* @__PURE__ */ n(ht, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Xa({ className: t, ...e }) {
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
const Re = [
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
], Be = (t) => {
  var e;
  return ((e = Re[t]) == null ? void 0 : e.chapters) ?? -1;
}, Pe = A.allBookIds.filter(
  (t) => !A.isObsolete(A.bookIdToNumber(t))
);
function Me(t) {
  const e = [], a = Math.min(t.length, A.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(A.bookNumberToId(r + 1));
  return e;
}
function I(t) {
  return `%scrollGroup_${t}%`;
}
const Oe = {
  [I("undefined")]: "Ø",
  [I(0)]: "A",
  [I(1)]: "B",
  [I(2)]: "C",
  [I(3)]: "D",
  [I(4)]: "E",
  [I(5)]: "F",
  [I(6)]: "G",
  [I(7)]: "H",
  [I(8)]: "I",
  [I(9)]: "J",
  [I(10)]: "K",
  [I(11)]: "L",
  [I(12)]: "M",
  [I(13)]: "N",
  [I(14)]: "O",
  [I(15)]: "P",
  [I(16)]: "Q",
  [I(17)]: "R",
  [I(18)]: "S",
  [I(19)]: "T",
  [I(20)]: "U",
  [I(21)]: "V",
  [I(22)]: "W",
  [I(23)]: "X",
  [I(24)]: "Y",
  [I(25)]: "Z"
};
function Nt(t, e) {
  return Be(A.bookIdToNumber(t));
}
function lt(t, e, a) {
  const r = A.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = A.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (o = i, s = l);
  }), o;
}
function Wa(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = lt(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Nt(s), 1),
      verseNum: 1
    };
}
function qa(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < Nt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = lt(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Za(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = lt(r, e, "previous");
  if (!i) return;
  const l = Math.max(Nt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Ya(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = lt(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Qa(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const tr = (t, e, a, r, o) => {
  switch (t) {
    case V.OT:
      return e ?? "Old Testament";
    case V.NT:
      return a ?? "New Testament";
    case V.DC:
      return r ?? "Deuterocanon";
    case V.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, er = (t, e, a, r, o) => {
  switch (t) {
    case V.OT:
      return e ?? "OT";
    case V.NT:
      return a ?? "NT";
    case V.DC:
      return r ?? "DC";
    case V.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function ar(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? A.bookIdToEnglishName(t);
}
function je(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const rr = Object.fromEntries(
  Pe.map((t) => [t, A.bookIdToEnglishName(t)])
);
function or(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = A.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(o.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function Ft({ ...t }) {
  return /* @__PURE__ */ n(et.Root, { "data-slot": "popover", ...t });
}
function ft({ ...t }) {
  return /* @__PURE__ */ n(et.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Kt = G.createContext(null);
function nr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(Kt.Provider, { value: t, children: e });
}
function Vt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = B(), i = G.useContext(Kt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(et.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      et.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ie, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function sr({ ...t }) {
  return /* @__PURE__ */ n(et.Anchor, { "data-slot": "popover-anchor", ...t });
}
function ir({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function lr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function dr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function It({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    Y.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Jt({ ...t }) {
  return /* @__PURE__ */ n(Y.Root, { "data-slot": "tooltip", ...t });
}
function Ut({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    Y.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(Bt({ variant: e }), t) : t,
      ...a
    }
  );
}
function Xt({
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
  return /* @__PURE__ */ n(Y.Portal, { children: /* @__PURE__ */ p(
    Y.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Ce, ...a },
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ n(
          Y.Arrow,
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
function _e() {
  const [t, e] = M(!1), a = nt(null), r = F(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = F(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function cr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Yt.Root,
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
function ur({
  className: t,
  ...e
}) {
  const a = B();
  return /* @__PURE__ */ n(
    wt.Root,
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
function wr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    wt.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        wt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const $e = J(
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
), Wt = G.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function mr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: o = "horizontal",
  children: s,
  ...i
}) {
  const l = B();
  return /* @__PURE__ */ n(
    Gt.Root,
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
        Wt.Provider,
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
function fr({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...o
}) {
  const s = G.useContext(Wt);
  return /* @__PURE__ */ n(
    Gt.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        $e({
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
function He({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    Qt.Root,
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
const Fe = J(
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
function pr({
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
        Fe({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function hr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? pt.Root : "div";
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
function gr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    He,
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
function br() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Nr() {
  return /Windows/i.test(navigator.userAgent);
}
const Ke = ["input", "select", "textarea", "button"], Ve = ["button", "textbox"], vr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = nt(null), [s, i] = M(void 0), [l, u] = M(void 0), f = F(
    (w) => {
      i(w);
      const g = t.find((x) => x.id === w);
      g && (e == null || e(g));
      const v = document.getElementById(w);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), o.current && o.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), h = F(
    (w) => {
      const g = t.find((v) => v.id === w);
      g && (u((v) => v === w ? void 0 : w), a == null || a(g));
    },
    [a, t]
  ), y = (w) => {
    if (!w) return !1;
    const g = w.tagName.toLowerCase();
    if (w.isContentEditable || Ke.includes(g)) return !0;
    const v = w.getAttribute("role");
    if (v && Ve.includes(v)) return !0;
    const x = w.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, C = F(
    (w) => {
      var $;
      const g = w.target, v = (S) => S ? document.getElementById(S) : void 0, x = v(l), j = v(s);
      if (!!(x && g && x.contains(g) && g !== x) && y(g)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const S = t.find((d) => d.id === l);
            S && f(S.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!x) return;
          const S = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const d = S.findIndex((b) => b === g);
          if (d === -1) return;
          let m;
          w.key === "ArrowDown" ? m = Math.min(d + 1, S.length - 1) : m = Math.max(d - 1, 0), m !== d && (w.preventDefault(), w.stopPropagation(), ($ = S[m]) == null || $.focus());
          return;
        }
        return;
      }
      const T = t.findIndex((S) => S.id === s);
      let z = T;
      switch (w.key) {
        case "ArrowDown":
          z = Math.min(T + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(T - 1, 0), w.preventDefault();
          break;
        case "Home":
          z = 0, w.preventDefault();
          break;
        case "End":
          z = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && h(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const S = j;
          if (S) {
            const d = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), m = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), b = d ?? m;
            if (b) {
              w.preventDefault(), b.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (y(g) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const R = t[z];
      R && f(R.id);
    },
    [t, f, s, l, h, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: C,
    /** Focus an option by its ID */
    focusOption: f
  };
}, Je = J(
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
function it({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? pt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Je({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const qt = re(void 0);
function dt() {
  const t = oe(qt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ct = J("", {
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
function Ue({ variant: t = "default", ...e }) {
  const a = B(), r = G.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(qt.Provider, { value: r, children: /* @__PURE__ */ n(E.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function xr({
  ...t
}) {
  return /* @__PURE__ */ n(E.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Xe({
  ...t
}) {
  return /* @__PURE__ */ n(E.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function We({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const s = B();
  return /* @__PURE__ */ n(E.Portal, { children: /* @__PURE__ */ n(
    E.Content,
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
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n("div", { dir: s, children: r })
    }
  ) });
}
function yr({ ...t }) {
  return /* @__PURE__ */ n(E.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ir({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = B(), s = dt();
  return /* @__PURE__ */ n(
    E.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ct({ variant: s.variant })
      ),
      dir: o,
      ...r
    }
  );
}
function kt({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const s = B(), i = dt();
  return /* @__PURE__ */ p(
    E.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ct({ variant: i.variant })
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
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(ht, {}) })
          }
        ),
        e
      ]
    }
  );
}
function kr({
  ...t
}) {
  return /* @__PURE__ */ n(E.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Sr({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = B(), s = dt();
  return /* @__PURE__ */ p(
    E.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ct({ variant: s.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(ht, {}) })
          }
        ),
        e
      ]
    }
  );
}
function St({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    E.Label,
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
function qe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    E.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Cr({ className: t, ...e }) {
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
function Er({ ...t }) {
  return /* @__PURE__ */ n(E.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Tr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = dt();
  return /* @__PURE__ */ p(
    E.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ct({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(ae, { className: "tw:ms-auto" })
      ]
    }
  );
}
function zr({ className: t, children: e, ...a }) {
  const r = B();
  return /* @__PURE__ */ n(
    E.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
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
function Gr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const Ct = `
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
function Ze(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function rt(t, e) {
  const a = e ? `${Ct}, ${e}` : Ct;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Ze(r)
  );
}
function Ar({
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
        rt(i, '[tabindex]:not([tabindex="-1"])').forEach((h) => {
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
        i.preventDefault(), rt(l)[0].focus();
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
function Dr({
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
function Lr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Rr({ className: t, ...e }) {
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
function Ye(t) {
  G.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? rt(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function Qe(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ta(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Br({
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
  }, [o]), Ye(i);
  const l = G.useMemo(
    () => i.current ? rt(i.current) : [],
    [i]
  ), u = G.useCallback(
    (h) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      const C = y.closest("table"), w = C ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        rt(C).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = w.indexOf(y), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (h.key === "ArrowDown" || h.key === "ArrowUp")
        h.preventDefault(), ta(w, g, h.key);
      else if (h.key === "ArrowLeft" || h.key === "ArrowRight")
        h.preventDefault(), Qe(l, v, h.key);
      else if (h.key === "Escape") {
        h.preventDefault();
        const x = y.closest("table");
        x && x.focus();
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
function Pr({ className: t, ...e }) {
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
function Mr({ className: t, ...e }) {
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
function Or({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ea(t, e, a = !0) {
  const [r, o] = M(!1);
  return gt(() => {
    const s = t.current;
    if (!a || !s) {
      o(!1);
      return;
    }
    const i = typeof ResizeObserver < "u";
    let l, u;
    const f = () => {
      if (!l) {
        o(!1);
        return;
      }
      o(l.scrollTop + l.clientHeight < l.scrollHeight - 1);
    }, h = () => {
      const C = s.querySelector(e) ?? void 0;
      if (C !== l) {
        if (u == null || u(), u = void 0, l = C, l) {
          const w = l;
          w.addEventListener("scroll", f);
          const g = i ? new ResizeObserver(f) : void 0;
          g == null || g.observe(w);
          const v = new MutationObserver(f);
          v.observe(w, { childList: !0, subtree: !0 }), u = () => {
            w.removeEventListener("scroll", f), g == null || g.disconnect(), v.disconnect();
          };
        }
        f();
      }
    };
    h();
    const y = new MutationObserver(h);
    return y.observe(s, { childList: !0, subtree: !0 }), () => {
      y.disconnect(), u == null || u();
    };
  }, [t, e, a]), r;
}
function aa({ children: t, isEnabled: e }) {
  const a = nt(null), r = ea(a, '[data-slot="command-list"]', e);
  return /* @__PURE__ */ p("div", { className: "tw:relative", ref: a, children: [
    t,
    r && /* @__PURE__ */ n(
      "div",
      {
        "data-slot": "command-list-scroll-cue",
        "aria-hidden": !0,
        className: "tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-3 tw:bg-gradient-to-t tw:from-popover tw:to-transparent"
      }
    )
  ] });
}
function jr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  searchPlaceholder: o,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: f,
  isOpen: h = void 0,
  onOpenChange: y = void 0,
  isDisabled: C = !1,
  sortSelected: w = !1,
  showScrollCue: g = !1,
  icon: v = void 0,
  className: x = void 0,
  variant: j = "ghost",
  id: _
}) {
  const [W, T] = M(!1), z = F(
    (D) => {
      var P;
      const q = (P = t.find((K) => K.label === D)) == null ? void 0 : P.value;
      q && a(
        e.includes(q) ? e.filter((K) => K !== q) : [...e, q]
      );
    },
    [t, e, a]
  ), R = () => f || r, $ = h ?? W, S = y ?? T, d = nt(e);
  d.current = e;
  const [m, b] = M(e);
  gt(() => {
    $ && b(d.current);
  }, [$]);
  const k = Z(() => {
    if (!w) return t;
    const D = t.filter((P) => P.starred).sort((P, K) => P.label.localeCompare(K.label)), q = t.filter((P) => !P.starred).sort((P, K) => {
      const vt = m.includes(P.value), xt = m.includes(K.value);
      return vt && !xt ? -1 : !vt && xt ? 1 : P.label.localeCompare(K.label);
    });
    return [...D, ...q];
  }, [t, m, w]), N = () => {
    a(t.map((D) => D.value));
  }, U = () => {
    a([]);
  };
  return /* @__PURE__ */ n("div", { id: _, className: x, children: /* @__PURE__ */ p(Ft, { open: $, onOpenChange: S, children: [
    /* @__PURE__ */ n(ft, { asChild: !0, children: /* @__PURE__ */ p(
      O,
      {
        variant: j,
        role: "combobox",
        "aria-expanded": $,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: C,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            v && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: v }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: R()
              }
            )
          ] }),
          /* @__PURE__ */ n(Dt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Vt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Mt, { children: [
      /* @__PURE__ */ n(
        Ot,
        {
          placeholder: o ?? r,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: N, children: i }),
        /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: U, children: l })
      ] }),
      /* @__PURE__ */ n(aa, { isEnabled: g, children: /* @__PURE__ */ p(jt, { children: [
        /* @__PURE__ */ n(_t, { children: u }),
        /* @__PURE__ */ n($t, { children: k.map((D) => /* @__PURE__ */ p(
          Ht,
          {
            value: D.label,
            onSelect: z,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                Lt,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(D.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              D.starred && /* @__PURE__ */ n(se, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: D.label }),
              D.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: D.secondaryLabel })
            ]
          },
          D.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function Q(t) {
  return t.replace(/^\+/, "");
}
function ra(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = Q(e).toLowerCase();
  return a === "passive" ? yt({
    query: o,
    items: r,
    filter: (s) => Q(s.label).toLowerCase().startsWith(o),
    sortBy: "label"
  }) : yt({
    query: o,
    items: r,
    filter: (s) => Q(s.label).toLowerCase().includes(o),
    sortBy: "label"
  });
}
function oa(t) {
  return t.isComposing || t.keyCode === 229;
}
const Zt = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, na = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], sa = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function ia(t) {
  return [
    ...na,
    ...sa.filter((e) => Zt[t].test(e))
  ];
}
function L(t) {
  t.preventDefault(), t.stopPropagation();
}
function _r(t, e, a) {
  var o, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (L(t), a.commit(), "ended") : t.key === "Escape" ? (L(t), a.dismiss(), "ended") : "passed";
  if (oa(t) || fe.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((o = t.getModifierState) != null && o.call(t, "AltGraph")))
    return t.key === "Enter" && L(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return L(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return L(t), ra(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return L(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return L(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    L(t);
    const i = Q(e.filter).toLowerCase(), l = e.items.find(
      (u) => Q(u.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (L(t), a.dismiss(), "ended") : (L(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (L(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (L(t), a.dismiss(), "ended") : t.key === "Backspace" || Zt[r].test(t.key) ? (L(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && L(t), a.dismiss(), "ended");
}
function $r(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function Hr(t) {
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
    applyItem: y,
    onShowError: C
  } = t;
  o.current += 1;
  const w = o.current, g = a ? "backslash" : "selection", v = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && r && (v.shouldSpaceCommit = r), s(v), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: ia(g),
    onKey: (x) => l(x)
  }).then((x) => {
    if (i(w), x !== void 0) {
      f(), h();
      const j = e.find((_) => _.marker === x);
      j && y(j);
    } else a || h();
  }).catch((x) => {
    i(w), a || h(), C(x);
  });
}
function Fr({ className: t, ...e }) {
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
function Kr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function la(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = at(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function Et(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function ut(t) {
  const e = la(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(at(s.id)) ?? [];
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
        isSelected: o === s.id,
        isMuted: i.length === 0,
        isBoundButClosed: !1,
        isDisabled: s.isDisabled === !0,
        disabledReason: s.disabledReason,
        versificationId: s.versificationId,
        versificationName: s.versificationName
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
    const s = e.get(at(o.id));
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
        isSelected: Et(a, o.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
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
        isSelected: Et(a, o.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
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
      versificationName: s.versificationName
    });
  }), r;
}
function Tt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function tt(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function da(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(tt) }];
  const a = t.filter(Tt).sort(tt), r = t.filter((s) => !Tt(s)).sort(tt);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function ca(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((l) => {
    const u = l.versificationId;
    if (u === void 0 || u === "") {
      o.push(l);
      return;
    }
    const f = l.versificationName ?? u, h = r.get(u);
    h ? (h.rows.push(l), !h.label && l.versificationName && (h.label = l.versificationName)) : r.set(u, { label: f, rows: [l] });
  });
  const s = [...r.entries()].map(([l, { label: u, rows: f }]) => ({
    id: l,
    label: u,
    rows: [...f].sort(tt)
  }));
  s.sort((l, u) => l.id === e ? -1 : u.id === e ? 1 : l.label.localeCompare(u.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: l, label: u, rows: f }) => ({
    kind: "versification",
    rows: f,
    label: u,
    isPriority: l === e
  }));
  return o.length > 0 && i.push({
    kind: "versification",
    rows: [...o].sort(tt),
    label: a,
    isPriority: !1
  }), i;
}
const ua = {
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group",
  filterSectionLabel: "Filter",
  filterGroupByOpenTabs: "By open tabs",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  versificationUnknownSectionHeading: "Unknown versification",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function wa(t) {
  return { ...ua, ...t };
}
function ot(t) {
  return Oe[pe(t)] ?? String(t);
}
const ma = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function fa({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = ot(t);
  return e ? /* @__PURE__ */ n(
    it,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ma,
      children: a
    }
  ) : /* @__PURE__ */ n(it, { variant: "secondary", children: a });
}
function pa({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: s }) {
  const {
    ref: i,
    open: l,
    onPointerEnter: u,
    onPointerLeave: f
  } = _e(), [h, y] = M(!1), C = !!(t.language || t.languageCode), w = C || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, g = l || h, v = F(() => {
    if (w) {
      y(!0);
      return;
    }
    u();
  }, [w, u]), x = F(() => {
    y(!1), f();
  }, [f]), j = /* @__PURE__ */ n(Lt, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let _;
  e === "project" ? t.openGroups.length > 0 && (_ = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((R) => /* @__PURE__ */ n(it, { variant: "secondary", children: ot(R) }, R)) })) : t.scrollGroupId !== void 0 && (_ = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      fa,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ p(
      O,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (R) => {
          R.stopPropagation(), o(t);
        },
        onMouseDown: (R) => R.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(le, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const W = /* @__PURE__ */ p(
    Ht,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: v,
      onPointerLeave: x,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: j }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: i,
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
  ), T = t.scrollGroupId !== void 0 ? ot(t.scrollGroupId) : void 0, z = t.isBoundButClosed && T ? a.boundButClosedTooltip.replace("{group}", T) : void 0;
  return /* @__PURE__ */ p(Jt, { open: g, delayDuration: 400, children: [
    /* @__PURE__ */ n(Ut, { asChild: !0, children: W }),
    /* @__PURE__ */ p(
      Xt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Rt },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          C && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && T && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              T,
              ")"
            ] })
          ] }),
          z && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: z }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function ha({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: o
}) {
  const s = !!a;
  return /* @__PURE__ */ p(Ue, { children: [
    /* @__PURE__ */ n(Xe, { asChild: !0, children: /* @__PURE__ */ n(
      O,
      {
        variant: "ghost",
        size: "sm",
        className: c(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          s && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": o.filterAriaLabel,
        "aria-pressed": s,
        title: o.filterAriaLabel,
        onMouseDown: (i) => i.preventDefault(),
        children: /* @__PURE__ */ n(ie, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ p(We, { align: "end", className: "tw:w-56", style: { zIndex: Rt }, children: [
      /* @__PURE__ */ n(St, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        kt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ p(zt, { children: [
        /* @__PURE__ */ n(qe, {}),
        /* @__PURE__ */ n(St, { children: o.filterSectionLabel }),
        /* @__PURE__ */ n(
          kt,
          {
            checked: !!a,
            onCheckedChange: r,
            onSelect: (i) => i.preventDefault(),
            children: o.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Vr(t) {
  const [e, a] = M(!1), [r, o] = M(""), [s, i] = M(t.defaultGroupByOpenTabs ?? !0), [l, u] = M(!1), f = nt(null), h = F((d) => {
    a(d), d || o("");
  }, []);
  gt(() => {
    if (!e) return;
    const d = window.requestAnimationFrame(() => {
      const m = f.current;
      m && m.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(d);
  }, [e]);
  const y = wa(t.localizedStrings), C = Z(() => t.mode === "project" ? ut({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? ut({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : ut({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), w = Z(() => {
    const d = r.trim().toLowerCase();
    let m = C;
    return d && (m = m.filter(
      (b) => b.shortName.toLowerCase().includes(d) || b.fullName.toLowerCase().includes(d) || (b.language ?? "").toLowerCase().includes(d) || (b.languageCode ?? "").toLowerCase().includes(d)
    )), t.mode === "project-multi" && l && (m = m.filter((b) => b.isSelected)), m;
  }, [C, r, t.mode, l]), g = Z(
    () => t.groupByVersification ? ca(
      w,
      t.priorityVersificationId,
      y.versificationUnknownSectionHeading
    ) : da(w, s),
    [
      w,
      s,
      t.groupByVersification,
      t.priorityVersificationId,
      y.versificationUnknownSectionHeading
    ]
  ), v = Z(() => {
    if (t.mode !== "project-multi") return [];
    const d = [];
    return t.projects.forEach((m) => {
      const b = t.openTabs.filter(
        (N) => at(N.projectId) === at(m.id)
      );
      if (b.length === 0) {
        d.push({ projectId: m.id });
        return;
      }
      const k = /* @__PURE__ */ new Set();
      b.forEach((N) => {
        k.has(N.scrollGroupId) || (k.add(N.scrollGroupId), d.push({ projectId: m.id, scrollGroupId: N.scrollGroupId }));
      });
    }), d;
  }, [t.mode, t.projects, t.openTabs]), x = (d) => {
    if (d.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
    }
  }, j = (d) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: d.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const m = t.selection.pairs, b = (N) => N.projectId === d.projectId && N.scrollGroupId === d.scrollGroupId, k = m.some(b) ? m.filter((N) => !b(N)) : [...m, { projectId: d.projectId, scrollGroupId: d.scrollGroupId }];
        t.onChangeSelection({ pairs: k }), k.length === 0 && l && u(!1);
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
  }, _ = () => {
    if (t.mode !== "project-multi") return;
    const d = t.selection.pairs, m = new Set(d.map((k) => `${k.projectId}:${k.scrollGroupId ?? ""}`)), b = [...d];
    v.forEach((k) => {
      const N = `${k.projectId}:${k.scrollGroupId ?? ""}`;
      m.has(N) || (m.add(N), b.push(k));
    }), t.onChangeSelection({ pairs: b });
  }, W = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && u(!1));
  }, T = Z(() => {
    switch (t.mode) {
      case "project": {
        const d = t.projects.find((b) => b.id === t.selection.projectId);
        let m = d ? d.shortName : t.buttonPlaceholder ?? "";
        return d && t.triggerLabelFormat === "shortNameAndFullName" && d.fullName && d.fullName !== d.shortName && (m = `${d.shortName} - ${d.fullName}`), { node: m, title: m };
      }
      case "project-multi": {
        const { pairs: d } = t.selection;
        if (d.length === 0) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        const m = [];
        if (d.forEach((N) => {
          const U = t.projects.find((D) => D.id === N.projectId);
          U && m.push({ project: U, scrollGroupId: N.scrollGroupId });
        }), m.length === 0) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        if (t.getSelectedText) {
          const N = t.getSelectedText(m);
          return { node: N, title: N };
        }
        const b = m.map(
          ({ project: N, scrollGroupId: U }) => U === void 0 ? N.shortName : `${N.shortName} (${ot(U)})`
        ).join(", ");
        if (m.length === 1) return { node: b, title: b };
        const k = m.length.toString();
        return {
          node: /* @__PURE__ */ p(zt, { children: [
            /* @__PURE__ */ n(it, { variant: "muted", className: "tw:shrink-0", children: k }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: b })
          ] }),
          title: `${k} ${b}`
        };
      }
      case "projectScrollGroup": {
        const d = t.projects.find((k) => k.id === t.selection.projectId);
        if (!d) {
          const k = t.buttonPlaceholder ?? "";
          return { node: k, title: k };
        }
        const m = t.selection.scrollGroupId;
        if (m === void 0)
          return { node: d.shortName, title: d.shortName };
        const b = `${d.shortName} · ${ot(m)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let z;
  t.isLoading ? z = /* @__PURE__ */ n(de, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? z = void 0 : t.mode === "project-multi" ? z = /* @__PURE__ */ n(Dt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : z = /* @__PURE__ */ n(ce, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const R = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? x : void 0, $ = /* @__PURE__ */ p(
    O,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: c(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof T.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: T.node }) : T.node }),
        z
      ]
    }
  ), S = T.title ? /* @__PURE__ */ n(It, { delayDuration: 400, children: /* @__PURE__ */ p(Jt, { children: [
    /* @__PURE__ */ n(Ut, { asChild: !0, children: /* @__PURE__ */ n(ft, { asChild: !0, children: $ }) }),
    /* @__PURE__ */ n(Xt, { children: T.title })
  ] }) }) : /* @__PURE__ */ n(ft, { asChild: !0, children: $ });
  return /* @__PURE__ */ p(Ft, { open: e, onOpenChange: h, children: [
    S,
    /* @__PURE__ */ n(
      Vt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: c("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(It, { delayDuration: 400, children: /* @__PURE__ */ p(Mt, { shouldFilter: !1, children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Ot,
              {
                value: r,
                onValueChange: o,
                placeholder: y.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.groupByVersification && !t.hideFilterMenu && /* @__PURE__ */ n(
              ha,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? u : void 0,
                strings: y
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: _, children: `${y.selectAll} (${v.length.toString()})` }),
            /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: W, children: `${y.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ p(jt, { children: [
            /* @__PURE__ */ n(_t, { children: t.commandEmptyMessage ?? "No projects found" }),
            g.map((d, m) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ p(ne, { children: [
                /* @__PURE__ */ n($t, { heading: ga(d, y), children: d.rows.map((b) => /* @__PURE__ */ n(
                  pa,
                  {
                    row: b,
                    mode: t.mode,
                    strings: y,
                    onClick: j,
                    onOpen: R,
                    selectedRowRef: f
                  },
                  b.rowKey
                )) }),
                m < g.length - 1 && /* @__PURE__ */ n(Le, {})
              ] }, `${d.kind}:${d.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function ga(t, e) {
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "versification":
      return t.label;
    case "flat":
    default:
      return;
  }
}
const ba = At(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, l) => {
    const u = B();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: c("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            ue,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            ze,
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
            O,
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
                /* @__PURE__ */ n(we, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ba.displayName = "SearchBar";
const Na = 5;
function Jr(t) {
  return Me(t).filter(
    (e) => !A.isObsolete(A.bookIdToNumber(e))
  );
}
function va(t, e) {
  return t.filter((a) => {
    try {
      return he(a) === e;
    } catch {
      return !1;
    }
  });
}
const Ur = (t, e, a) => va(t, e).every((r) => a.includes(r));
function xa(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => A.bookIdToNumber(r) > 0).sort((r, o) => A.bookIdToNumber(r) - A.bookIdToNumber(o)).map((r) => je(r, e));
}
function Xr(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((l) => o.has(l)))
    return a;
  const i = xa(t, r);
  if (i.length !== 0)
    return i.length <= Na ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
const ya = At(({ className: t, ...e }, a) => /* @__PURE__ */ n(me, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
ya.displayName = "Spinner";
const Ia = J(
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
function Wr({
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
        Ia({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function qr({ className: t, ...e }) {
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
function Zr({ className: t, ...e }) {
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
function Yr({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    bt.Group,
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
function st(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Qr({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    bt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: st(t),
      minSize: st(e),
      maxSize: st(a),
      collapsedSize: st(r),
      ...o
    }
  );
}
function to({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    bt.Separator,
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
  Ar as $,
  rr as A,
  O as B,
  Ht as C,
  _a as D,
  fr as E,
  pr as F,
  gr as G,
  br as H,
  Ya as I,
  Ir as J,
  it as K,
  cr as L,
  Ue as M,
  Xe as N,
  We as O,
  Ft as P,
  Gr as Q,
  ur as R,
  He as S,
  It as T,
  vr as U,
  St as V,
  qe as W,
  kt as X,
  Br as Y,
  Ie as Z,
  Mr as _,
  je as a,
  Nr as a$,
  Dr as a0,
  Pr as a1,
  Lr as a2,
  yr as a3,
  kr as a4,
  Sr as a5,
  jr as a6,
  Fr as a7,
  Ma as a8,
  ze as a9,
  De as aA,
  Wr as aB,
  Zr as aC,
  qr as aD,
  hr as aE,
  Ha as aF,
  Ua as aG,
  Te as aH,
  Ee as aI,
  $a as aJ,
  Cr as aK,
  Kr as aL,
  dr as aM,
  ir as aN,
  lr as aO,
  to as aP,
  Qr as aQ,
  Yr as aR,
  ya as aS,
  Or as aT,
  Rr as aU,
  Oa as aV,
  Se as aW,
  ke as aX,
  Je as aY,
  Fe as aZ,
  Bt as a_,
  Q as aa,
  Le as ab,
  Xa as ac,
  Hr as ad,
  _r as ae,
  $r as af,
  sr as ag,
  oa as ah,
  Vr as ai,
  Rt as aj,
  ba as ak,
  Jr as al,
  va as am,
  er as an,
  Ur as ao,
  nr as ap,
  Va as aq,
  Oe as ar,
  Er as as,
  Tr as at,
  xr as au,
  zr as av,
  qt as aw,
  dt as ax,
  ct as ay,
  Ge as az,
  Jt as b,
  ea as b0,
  Qa as b1,
  Ce as b2,
  ra as b3,
  ia as b4,
  ja as b5,
  Xr as b6,
  c,
  Ut as d,
  Xt as e,
  ft as f,
  ar as g,
  Vt as h,
  Mt as i,
  jt as j,
  $t as k,
  qa as l,
  Za as m,
  or as n,
  Pe as o,
  tr as p,
  Ot as q,
  B as r,
  _t as s,
  wr as t,
  _e as u,
  Fa as v,
  Ka as w,
  Wa as x,
  Ja as y,
  mr as z
};
//# sourceMappingURL=resizable-Biggp96T.js.map
