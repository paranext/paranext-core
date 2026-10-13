import { jsx as n, jsxs as f, Fragment as Se } from "react/jsx-runtime";
import { Slot as Pt, Dialog as tt, Separator as ke, Popover as wt, Tooltip as ct, DropdownMenu as C, Label as Ie, RadioGroup as Tt } from "radix-ui";
import { IconX as Ee, IconCheck as Rt, IconSearch as Ce, IconChevronLeft as Te, IconChevronRight as _e } from "@tabler/icons-react";
import { Canon as A } from "@sillsdev/scripture";
import { cva as nt } from "class-variance-authority";
import U, { useState as $, useRef as pt, useCallback as q, createContext as Le, useContext as Ae, useEffect as _t, useMemo as at, Fragment as je, forwardRef as te } from "react";
import { ChevronsUpDown as ee, Check as ae, Star as Ge, Group as Pe, ArrowRight as Re, Loader2 as Oe, ChevronDown as De, Search as ze, X as Be, AlertTriangle as Me, LoaderCircle as He } from "lucide-react";
import { Section as ot, MODIFIER_KEYS as Ue, normalizeProjectId as O, compareProjectsByName as $e, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as ut, formatProjectName as re, getLocalizeKeyForScrollGroupId as Ke, hasDistinctFullName as Fe, getSectionForBook as Ve } from "platform-bible-utils";
import { filterAndRankItems as Kt } from "@eten-tech-foundation/platform-editor";
import { Command as it } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Ot from "react-resizable-panels";
import { clsx as Je } from "clsx";
import { extendTailwindMerge as Xe, twMerge as qe } from "tailwind-merge";
const We = Xe({ prefix: "tw" });
function Lt(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function Ze(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Lt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== r), `!${s}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const s = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Ye(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = Lt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = Lt(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
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
function d(...t) {
  const e = Je(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return We(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((u) => {
    const m = Ze(u);
    r.set(m.normalized, m.original), o.push(m.normalized);
  }), qe(o.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = r.get(u);
    return m ? Ye(u, m) : u;
  }).join(" ");
}
const oe = 600, ne = 650, Ar = 400, Qe = 450, ta = 500, jr = 510, Gr = 520, ea = 675, Pr = 690, Rr = 700, Or = 800, se = nt(
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
  size: a = "default",
  asChild: r = !1,
  ...o
}) {
  const s = r ? Pt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: d(se({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const ie = "layoutDirection";
function le() {
  return globalThis.localStorage ?? void 0;
}
function V() {
  var t;
  try {
    const e = (t = le()) == null ? void 0 : t.getItem(ie);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Dr(t) {
  var e;
  try {
    (e = le()) == null || e.setItem(ie, t);
  } catch {
  }
}
function zr({ ...t }) {
  return /* @__PURE__ */ n(tt.Root, { "data-slot": "dialog", ...t });
}
function Br({ ...t }) {
  return /* @__PURE__ */ n(tt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function aa({ ...t }) {
  return /* @__PURE__ */ n(tt.Portal, { "data-slot": "dialog-portal", ...t });
}
function Mr({ ...t }) {
  return /* @__PURE__ */ n(tt.Close, { "data-slot": "dialog-close", ...t });
}
function ra({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    tt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: d(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Qe, ...e },
      ...a
    }
  );
}
function Hr({
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
  return /* @__PURE__ */ f(aa, { children: [
    /* @__PURE__ */ n(ra, { className: r, style: o }),
    /* @__PURE__ */ f(
      tt.Content,
      {
        "data-slot": "dialog-content",
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ta, ...s },
        dir: l,
        ...i,
        children: [
          e,
          a && /* @__PURE__ */ n(tt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ f(W, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(Ee, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ur({ className: t, ...e }) {
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
function $r({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ f(
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
        e && /* @__PURE__ */ n(tt.Close, { asChild: !0, children: /* @__PURE__ */ n(W, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Kr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    tt.Title,
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
function Fr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    tt.Description,
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
function oa({ className: t, type: e, ...a }) {
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
function na({ className: t, ...e }) {
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
const sa = nt(
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
function ia({
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
        className: d(sa({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
nt("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function ce({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    it,
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
function de({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const o = V(), s = U.useCallback(
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
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ f(na, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        it.Input,
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
      /* @__PURE__ */ n(ia, { children: /* @__PURE__ */ n(Ce, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function ue({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    it.List,
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
function we({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    it.Empty,
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
function pe({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    it.Group,
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
function Ft({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    it.Separator,
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
function Dt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ f(
    it.Item,
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
        /* @__PURE__ */ n(Rt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Vr({ className: t, ...e }) {
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
const la = [
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
], ca = (t) => {
  var e;
  return ((e = la[t]) == null ? void 0 : e.chapters) ?? -1;
}, da = A.allBookIds.filter(
  (t) => !A.isObsolete(A.bookIdToNumber(t))
);
function ua(t) {
  const e = [], a = Math.min(t.length, A.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(A.bookNumberToId(r + 1));
  return e;
}
function x(t) {
  return `%scrollGroup_${t}%`;
}
const wa = {
  [x("undefined")]: "Ø",
  [x(0)]: "A",
  [x(1)]: "B",
  [x(2)]: "C",
  [x(3)]: "D",
  [x(4)]: "E",
  [x(5)]: "F",
  [x(6)]: "G",
  [x(7)]: "H",
  [x(8)]: "I",
  [x(9)]: "J",
  [x(10)]: "K",
  [x(11)]: "L",
  [x(12)]: "M",
  [x(13)]: "N",
  [x(14)]: "O",
  [x(15)]: "P",
  [x(16)]: "Q",
  [x(17)]: "R",
  [x(18)]: "S",
  [x(19)]: "T",
  [x(20)]: "U",
  [x(21)]: "V",
  [x(22)]: "W",
  [x(23)]: "X",
  [x(24)]: "Y",
  [x(25)]: "Z"
};
function zt(t, e) {
  return ca(A.bookIdToNumber(t));
}
function St(t, e, a) {
  const r = A.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = A.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (o = i, s = l);
  }), o;
}
function Jr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = St(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(zt(s), 1),
      verseNum: 1
    };
}
function Xr(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < zt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = St(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function qr(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = St(r, e, "previous");
  if (!i) return;
  const l = Math.max(zt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Wr(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = St(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Zr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Yr = (t, e, a, r, o) => {
  switch (t) {
    case ot.OT:
      return e ?? "Old Testament";
    case ot.NT:
      return a ?? "New Testament";
    case ot.DC:
      return r ?? "Deuterocanon";
    case ot.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Qr = (t, e, a, r, o) => {
  switch (t) {
    case ot.OT:
      return e ?? "OT";
    case ot.NT:
      return a ?? "NT";
    case ot.DC:
      return r ?? "DC";
    case ot.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function to(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? A.bookIdToEnglishName(t);
}
function pa(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const eo = Object.fromEntries(
  da.map((t) => [t, A.bookIdToEnglishName(t)])
);
function ao(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = A.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(o.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
const Vt = `
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
function ma(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function mt(t, e) {
  const a = e ? `${Vt}, ${e}` : Vt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && ma(r)
  );
}
const ro = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let At = "keyboard", Jt = !1;
function oo() {
  Jt || typeof document > "u" || (Jt = !0, document.addEventListener(
    "pointerdown",
    () => {
      At = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      At = "keyboard";
    },
    !0
  ));
}
function no() {
  return At;
}
const me = "data-quiet-focus";
function so(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(me, ""), t.style.outline = "none"));
}
function io(t) {
  t && (t.removeAttribute(me), t.style.removeProperty("outline"));
}
const lo = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function fa({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    ke.Root,
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
const ha = nt(
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
function co({
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
        ha({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function uo({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? Pt.Root : "div";
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
function wo({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    fa,
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
function fe() {
  const t = U.createContext(null);
  function e({
    container: r,
    children: o
  }) {
    return /* @__PURE__ */ n(t.Provider, { value: r, children: o });
  }
  function a() {
    return U.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: a };
}
function he({ ...t }) {
  return /* @__PURE__ */ n(wt.Root, { "data-slot": "popover", ...t });
}
function jt({ ...t }) {
  return /* @__PURE__ */ n(wt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: ga, usePortalContainer: ba } = fe(), po = ga;
function ge({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = V(), i = ba();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(wt.Portal, { container: i, children: /* @__PURE__ */ n(
      wt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: oe, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function mo({ ...t }) {
  return /* @__PURE__ */ n(wt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function fo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: d("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function ho({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: d("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function go({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: d("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Xt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    ct.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Bt({ ...t }) {
  return /* @__PURE__ */ n(ct.Root, { "data-slot": "tooltip", ...t });
}
function Mt({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    ct.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? d(se({ variant: e }), t) : t,
      ...a
    }
  );
}
const { PortalContainerProvider: Na, usePortalContainer: va } = fe(), bo = Na;
function Ht({
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
  const l = va();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ n(ct.Portal, { container: l, children: /* @__PURE__ */ f(
      ct.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: ea, ...a },
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          r && /* @__PURE__ */ n(
            ct.Arrow,
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
    ) })
  );
}
const xa = /^%[^%]*%$/;
function be(t) {
  return t !== void 0 && !xa.test(t) && t.trim() !== "";
}
function _(t, e) {
  return be(t) ? t : e;
}
function ya() {
  const [t, e] = $(!1), a = pt(null), r = q(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = q(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
const Ne = Le(void 0);
function kt() {
  const t = Ae(Ne);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const It = nt("", {
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
function Sa({ variant: t = "default", ...e }) {
  const a = V(), r = U.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Ne.Provider, { value: r, children: /* @__PURE__ */ n(C.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function No({
  ...t
}) {
  return /* @__PURE__ */ n(C.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ka({
  ...t
}) {
  return /* @__PURE__ */ n(C.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ia({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  children: o,
  ...s
}) {
  const i = V();
  return /* @__PURE__ */ n(C.Portal, { children: /* @__PURE__ */ n(
    C.Content,
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
      style: { zIndex: oe, ...r },
      ...s,
      children: /* @__PURE__ */ n("div", { dir: i, children: o })
    }
  ) });
}
function vo({ ...t }) {
  return /* @__PURE__ */ n(C.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function xo({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = V(), s = kt();
  return /* @__PURE__ */ n(
    C.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: d(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        It({ variant: s.variant })
      ),
      dir: o,
      ...r
    }
  );
}
function yo({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const s = V(), i = kt();
  return /* @__PURE__ */ f(
    C.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        It({ variant: i.variant })
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
            children: /* @__PURE__ */ n(C.ItemIndicator, { children: /* @__PURE__ */ n(Rt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ea({
  ...t
}) {
  return /* @__PURE__ */ n(C.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function qt({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = V(), s = kt();
  return /* @__PURE__ */ f(
    C.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        It({ variant: s.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(C.ItemIndicator, { children: /* @__PURE__ */ n(Rt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ca({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    C.Label,
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
function Ta({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    C.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: d("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function So({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: d(
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
function ko({ ...t }) {
  return /* @__PURE__ */ n(C.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Io({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = kt(), s = V();
  return /* @__PURE__ */ f(
    C.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: d(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        It({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        s === "rtl" ? /* @__PURE__ */ n(Te, { className: "tw:ms-auto" }) : /* @__PURE__ */ n(_e, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Eo({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: a,
  ...r
}) {
  const o = V();
  return /* @__PURE__ */ n(
    C.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: d(
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
      style: { zIndex: ne, ...e },
      ...r,
      children: /* @__PURE__ */ n("div", { dir: o, children: a })
    }
  );
}
function Co({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Ie.Root,
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
function To({
  className: t,
  ...e
}) {
  const a = V();
  return /* @__PURE__ */ n(
    Tt.Root,
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
function _o({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Tt.Item,
    {
      "data-slot": "radio-group-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        Tt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
function ve() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Lo() {
  return /Windows/i.test(navigator.userAgent);
}
const _a = ["input", "select", "textarea", "button"], La = ["button", "textbox"], Ao = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = pt(null), [s, i] = $(void 0), [l, u] = $(void 0), m = q(
    (w) => {
      i(w);
      const g = t.find((v) => v.id === w);
      g && (e == null || e(g));
      const N = document.getElementById(w);
      N && (N.scrollIntoView({ block: "center" }), N.focus()), o.current && o.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), p = q(
    (w) => {
      const g = t.find((N) => N.id === w);
      g && (u((N) => N === w ? void 0 : w), a == null || a(g));
    },
    [a, t]
  ), h = (w) => {
    if (!w) return !1;
    const g = w.tagName.toLowerCase();
    if (w.isContentEditable || _a.includes(g)) return !0;
    const N = w.getAttribute("role");
    if (N && La.includes(N)) return !0;
    const v = w.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, k = q(
    (w) => {
      var R;
      const g = w.target, N = (y) => y ? document.getElementById(y) : void 0, v = N(l), J = N(s);
      if (!!(v && g && v.contains(g) && g !== v) && h(g)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const y = t.find((F) => F.id === l);
            y && m(y.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!v) return;
          const y = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (y.length === 0) return;
          const F = y.findIndex((Y) => Y === g);
          if (F === -1) return;
          let Z;
          w.key === "ArrowDown" ? Z = Math.min(F + 1, y.length - 1) : Z = Math.max(F - 1, 0), Z !== F && (w.preventDefault(), w.stopPropagation(), (R = y[Z]) == null || R.focus());
          return;
        }
        return;
      }
      const K = t.findIndex((y) => y.id === s);
      let E = K;
      switch (w.key) {
        case "ArrowDown":
          E = Math.min(K + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          E = Math.max(K - 1, 0), w.preventDefault();
          break;
        case "Home":
          E = 0, w.preventDefault();
          break;
        case "End":
          E = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const y = J;
          if (y) {
            const F = y.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), Z = y.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), Y = F ?? Z;
            if (Y) {
              w.preventDefault(), Y.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (h(g) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const et = t[E];
      et && m(et.id);
    },
    [t, m, s, l, p, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: k,
    /** Focus an option by its ID */
    focusOption: m
  };
}, Aa = nt(
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
function yt({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? Pt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Aa({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function jo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: d("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Go({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = U.useRef(null);
  U.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), U.useEffect(() => {
    const i = o.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        mt(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
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
        i.preventDefault(), mt(l)[0].focus();
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
function Po({
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
function Ro({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: d("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Oo({ className: t, ...e }) {
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
function ja(t) {
  U.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? mt(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function Ga(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Pa(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Do({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...s
}) {
  const i = U.useRef(null);
  U.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), ja(i);
  const l = U.useMemo(
    () => i.current ? mt(i.current) : [],
    [i]
  ), u = U.useCallback(
    (p) => {
      const { current: h } = i;
      if (!h || !h.parentElement) return;
      const k = h.closest("table"), w = k ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        mt(k).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = w.indexOf(h), N = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), Pa(w, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), Ga(l, N, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = h.closest("table");
        v && v.focus();
      }
      e == null || e(p);
    },
    [i, l, e]
  ), m = U.useCallback(
    (p) => {
      r && (a == null || a(p));
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
      onFocus: m,
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
function zo({ className: t, ...e }) {
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
function Bo({ className: t, ...e }) {
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
function Mo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: d("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ra(t, e = !0) {
  const [a, r] = $(!1);
  return _t(() => {
    const o = t.current;
    if (!e || !o) {
      r(!1);
      return;
    }
    const s = () => {
      r(o.scrollTop + o.clientHeight < o.scrollHeight - 1);
    };
    s(), o.addEventListener("scroll", s);
    const i = typeof ResizeObserver < "u" ? new ResizeObserver(s) : void 0;
    i == null || i.observe(o);
    const l = new MutationObserver(s);
    return l.observe(o, { childList: !0, subtree: !0 }), () => {
      o.removeEventListener("scroll", s), i == null || i.disconnect(), l.disconnect();
    };
  }, [t, e]), a;
}
function Oa({
  children: t,
  isEnabled: e,
  scrollerRef: a
}) {
  const r = Ra(a, e);
  return e ? (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ f("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
      t,
      r && /* @__PURE__ */ n(
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
function Ho({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  searchPlaceholder: o,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: m,
  isOpen: p = void 0,
  onOpenChange: h = void 0,
  isDisabled: k = !1,
  sortSelected: w = !1,
  showScrollCue: g = !1,
  icon: N = void 0,
  className: v = void 0,
  variant: J = "ghost",
  id: T
}) {
  const [D, K] = $(!1), E = pt(null), et = q(
    (I) => {
      var B;
      const Q = (B = t.find((X) => X.label === I)) == null ? void 0 : B.value;
      Q && a(
        e.includes(Q) ? e.filter((X) => X !== Q) : [...e, Q]
      );
    },
    [t, e, a]
  ), R = () => m || r, y = p ?? D, F = h ?? K, [Z, Y] = $(y), [lt, z] = $(e);
  Z !== y && (Y(y), y && z(e));
  const ht = at(() => {
    if (!w) return t;
    const I = t.filter((B) => B.starred).sort((B, X) => B.label.localeCompare(X.label)), Q = t.filter((B) => !B.starred).sort((B, X) => {
      const bt = lt.includes(B.value), Nt = lt.includes(X.value);
      return bt && !Nt ? -1 : !bt && Nt ? 1 : B.label.localeCompare(X.label);
    });
    return [...I, ...Q];
  }, [t, lt, w]), gt = () => {
    const I = t.map((Q) => Q.value);
    z(I), a(I);
  }, Et = () => {
    z([]), a([]);
  };
  return /* @__PURE__ */ n("div", { id: T, className: v, children: /* @__PURE__ */ f(he, { open: y, onOpenChange: F, children: [
    /* @__PURE__ */ n(jt, { asChild: !0, children: /* @__PURE__ */ f(
      W,
      {
        variant: J,
        role: "combobox",
        "aria-expanded": y,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: k,
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            N && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: N }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: d(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: R()
              }
            )
          ] }),
          /* @__PURE__ */ n(ee, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(ge, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ f(ce, { children: [
      /* @__PURE__ */ n(
        de,
        {
          placeholder: o ?? r,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(W, { variant: "ghost", size: "sm", onClick: gt, children: i }),
        /* @__PURE__ */ n(W, { variant: "ghost", size: "sm", onClick: Et, children: l })
      ] }),
      /* @__PURE__ */ n(Oa, { isEnabled: g, scrollerRef: E, children: /* @__PURE__ */ f(ue, { ref: E, children: [
        /* @__PURE__ */ n(we, { children: u }),
        /* @__PURE__ */ n(pe, { children: ht.map((I) => /* @__PURE__ */ f(
          Dt,
          {
            value: I.label,
            onSelect: et,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                ae,
                {
                  className: d(
                    "tw:h-4 tw:w-4",
                    e.includes(I.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              I.starred && /* @__PURE__ */ n(Ge, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: I.label }),
              I.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: I.secondaryLabel })
            ]
          },
          I.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function rt(t) {
  return t.replace(/^\+/, "");
}
function Uo(t, e) {
  if (!t || e === "") return !1;
  const a = rt(e).toLowerCase();
  return Object.values(t.markers).some(
    (r) => r.styleType === "note" && rt(r.marker).toLowerCase() === a
  );
}
function Da(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = rt(e).toLowerCase();
  return a === "passive" ? Kt({
    query: o,
    items: r,
    filter: (s) => rt(s.label).toLowerCase().startsWith(o),
    sortBy: "label"
  }) : Kt({
    query: o,
    items: r,
    filter: (s) => rt(s.label).toLowerCase().includes(o),
    sortBy: "label"
  });
}
function za(t) {
  return t.isComposing || t.keyCode === 229;
}
const xe = /^[a-z0-9+-]$/i;
function Ba(t) {
  var r;
  const { key: e, keyCode: a } = t;
  if (!(t.altKey && ve()) && e !== "Dead") {
    if (xe.test(e)) return e;
    if (a >= 65 && a <= 90) {
      const o = String.fromCharCode(a), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((r = t.getModifierState) == null ? void 0 : r.call(t, "CapsLock")) ?? !1)) ? o : o.toLowerCase();
    }
  }
}
const Ma = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ha = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Ua() {
  return [...Ma, ...Ha.filter((t) => xe.test(t))];
}
function H(t) {
  t.preventDefault(), t.stopPropagation();
}
function $a(t, e, a) {
  var i, l;
  const { kind: r } = e;
  if (za(t) || Ue.has(t.key))
    return "passed";
  const o = !ve();
  if ((t.ctrlKey || t.metaKey || t.altKey && o) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && H(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return H(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return H(t), Da(
      e.items.map((m) => ({ label: m.marker })),
      e.filter,
      // Containment, for every kind: all marker palettes are host-driven (the session owns the
      // query and the palette renders it read-only), so this commit must resolve against the same
      // list the host filtered. Ranking cmdk's way here instead would commit an item the rendered
      // list never offered.
      "passive"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return H(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r !== "selection") {
      if (H(t), e.filter === "")
        return a.dismiss(), "ended";
      const p = rt(e.filter).toLowerCase();
      return (l = e.isNoteMarker) != null && l.call(e, p) ? (e.items.some(
        (k) => rt(k.marker).toLowerCase() === p
      ) ? a.commit() : a.dismiss(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    }
    H(t);
    const u = rt(e.filter).toLowerCase(), m = e.items.find(
      (p) => rt(p.marker).toLowerCase() === u
    );
    return m && a.commitItem(m.marker), a.dismiss(), "ended";
  }
  if (t.key === "*")
    return r === "selection" && e.filter === "" ? (H(t), a.dismiss(), "ended") : (H(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended");
  if (t.key === "\\" && r !== "selection")
    return e.filter === "" ? (H(t), "continue") : (H(t), a.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return H(t), a.dismiss(), "ended";
  const s = Ba(t);
  return t.key === "Backspace" || s !== void 0 ? (H(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, a.update({ filterText: e.filter }), "continue") : (H(t), "continue");
}
function Ka(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function $o(t, e) {
  const a = t();
  if (a === void 0) return;
  const r = e();
  return {
    content: JSON.stringify(a),
    caret: r === void 0 ? void 0 : JSON.stringify(r)
  };
}
function Ko(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Fo(t) {
  const {
    items: e,
    kind: a,
    isNoteMarker: r,
    sessionCounterRef: o,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: m,
    hasEditorChangedSinceFocus: p,
    focusEditor: h,
    applyItem: k,
    onShowError: w
  } = t, g = () => {
    m(), h();
  };
  o.current += 1;
  const N = o.current, v = () => o.current === N, J = { kind: a, token: N, filter: "", items: e };
  r && (J.isNoteMarker = r), s(J), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: Ua(),
    onKey: (T) => l(T)
  }).then((T) => {
    if (i(N), T !== void 0) {
      const D = (p == null ? void 0 : p()) ?? !1;
      g();
      const K = D ? void 0 : e.find((E) => E.marker === T);
      K && k(K);
    } else v() && g();
  }).catch((T) => {
    i(N), v() && g(), w(T);
  });
}
function Vo(t, e) {
  const { sessionRef: a, editorRef: r, palette: o, restoreCaret: s, reopenAtCaret: i, baselineRef: l } = e, u = a.current;
  return u ? ($a(t, u, {
    update: (p) => o.update(p),
    commit: () => o.commit(),
    dismiss: () => o.dismiss(),
    commitTyped: (p) => {
      var h;
      s(), (h = r.current) == null || h.commitTypedMarker(p);
    },
    commitTypedAndReopen: (p) => {
      var h;
      s(), (h = r.current) == null || h.commitTypedMarker(p, { trailingSpace: !1 }), i();
    },
    commitTypedCloser: (p) => {
      var h;
      s(), (h = r.current) == null || h.commitTypedCloser(p);
    },
    commitItem: (p) => {
      var k;
      const h = u.items.find((w) => w.marker === p);
      h && (s(), (k = r.current) == null || k.applyMarkerMenuSelection(h, {
        trigger: "backslash",
        literalPrefixLanded: !1
      }));
    }
  }) === "ended" && (Ka(a, u.token), l && !a.current && (l.current = void 0)), "routed") : "no-session";
}
function Jo({ className: t, ...e }) {
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
function Xo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: d("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Wt = '[aria-controls="editor-context-menu"]';
function qo(t) {
  return t ? t.matches(Wt) ? !0 : !!t.querySelector(Wt) : !1;
}
function Fa(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = O(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function Zt(t, e, a) {
  const r = O(e);
  return t.some(
    (o) => O(o.projectId) === r && o.scrollGroupId === a
  );
}
function Ct(t) {
  const e = Fa(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId === void 0 ? void 0 : O(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(O(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: o !== void 0 && o === O(s.id),
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
    const s = e.get(O(o.id));
    if (!s || s.length === 0) {
      r.push({
        rowKey: `project:${o.id}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Zt(a, o.id, void 0),
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
        isSelected: Zt(a, o.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        project: o
      });
    });
  }), a.forEach((o) => {
    if (o.scrollGroupId === void 0) return;
    const s = O(o.projectId);
    if (r.some(
      (l) => O(l.projectId) === s && l.scrollGroupId === o.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => O(l.id) === s);
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
const Ut = "Selected", $t = "Unselected";
function Yt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function st(t, e) {
  const a = $e(t, e);
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function Gt(t) {
  return [{ kind: "flat", rows: [...t].sort(st) }];
}
function Va(t) {
  const e = t.filter(Yt).sort(st), a = t.filter((o) => !Yt(o)).sort(st);
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const r = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && r.push({ kind: "other", rows: a }), r;
}
function Ja(t, e) {
  const a = t.filter((i) => i.isSelected).sort(st), r = t.filter((i) => !i.isSelected).sort(st), o = (i, l) => {
    var m;
    const u = (m = e.getSectionHeading) == null ? void 0 : m.call(
      e,
      i,
      l.map((p) => p.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? Ut : $t;
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
function Xa(t, e) {
  if (e.id === "openTabs") return Va(t);
  if (e.id === "selection") return Ja(t, e);
  if (!e.getGroupKey) return Gt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: o } = e;
  t.forEach((l) => {
    const u = o(l.project);
    if (u === void 0 || u === "") {
      r.push(l);
      return;
    }
    const m = a.get(u);
    m ? m.push(l) : a.set(u, [l]);
  });
  const s = [...a.entries()].map(([l, u]) => {
    var h;
    const m = [...u].sort(
      (k, w) => {
        var g;
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, k.project, w.project)) || st(k, w);
      }
    ), p = ((h = e.getSectionHeading) == null ? void 0 : h.call(
      e,
      l,
      m.map((k) => k.project)
    )) ?? l;
    return { key: l, heading: p, rows: m };
  });
  s.sort((l, u) => l.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: u.key, heading: u.heading }
  ) : l.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: u, rows: m }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: u,
    rows: m,
    isPriority: l === e.priorityKey
  }));
  return r.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...r].sort(st)
  }), i;
}
const Wo = [
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
function S(t, e) {
  const a = t[e];
  if (!(typeof a != "string" || !be(a)))
    return a;
}
const vt = "recent", qa = "other";
function ye(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Wa(t) {
  const e = t ?? {};
  return [
    ye(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (a) => {
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r[ut.lastUsedAt]) == "number" ? vt : qa;
      },
      getSectionHeading: (a) => a === vt ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, r) => a.key === vt ? -1 : r.key === vt ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (a) => {
        var o;
        const r = (o = a.customData) == null ? void 0 : o[ut.language];
        return typeof r == "string" ? r : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (a) => {
        var o;
        const r = (o = a.customData) == null ? void 0 : o[ut.type];
        return typeof r == "string" ? r : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (a, r) => {
        var i;
        const o = r.find(
          (l) => {
            var u;
            return typeof ((u = l.customData) == null ? void 0 : u[ut.typeName]) == "string";
          }
        ), s = (i = o == null ? void 0 : o.customData) == null ? void 0 : i[ut.typeName];
        return typeof s == "string" && s.length > 0 ? s : a;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Zo = Wa();
function Za(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (a) => a === "selected" ? e.selectedSectionHeading ?? Ut : e.unselectedSectionHeading ?? $t
  };
}
function Yo(t) {
  return {
    openTabsLabel: S(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: S(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: S(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: S(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: S(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: S(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: S(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: S(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function Qo(t) {
  return {
    label: S(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const Ya = 100, L = {
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
  autoSelectionSelectedSectionHeading: Ut,
  autoSelectionUnselectedSectionHeading: $t,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Qa(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : _(e.ariaLabel, L.ariaLabel),
    buttonPlaceholder: _(
      e.buttonPlaceholder,
      L.buttonPlaceholder
    ),
    commandEmptyMessage: _(
      e.commandEmptyMessage,
      L.commandEmptyMessage
    ),
    searchPlaceholder: _(
      e.searchPlaceholder,
      L.searchPlaceholder
    ),
    groupByAriaLabel: _(
      e.groupByAriaLabel,
      L.groupByAriaLabel
    ),
    groupSectionLabel: _(
      e.groupSectionLabel,
      L.groupSectionLabel
    ),
    groupByNone: _(
      e.groupByNone,
      L.groupByNone
    ),
    openTabsSectionHeading: _(
      e.openTabsSectionHeading,
      L.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: _(
      e.otherProjectsSectionHeading,
      L.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: _(
      e.autoOpenTabsGroupingLabel,
      L.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: _(
      e.autoSelectionGroupingLabel,
      L.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: _(
      e.autoSelectionSelectedSectionHeading,
      L.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: _(
      e.autoSelectionUnselectedSectionHeading,
      L.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: _(
      e.boundButClosedTooltip,
      L.boundButClosedTooltip
    ),
    openButtonLabel: _(
      e.openButtonLabel,
      L.openButtonLabel
    ),
    clearAll: _(e.clearAll, L.clearAll)
  };
}
function tn(t) {
  return {
    searchPlaceholder: S(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: S(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: S(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: S(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: S(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: S(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: S(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: S(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: S(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: S(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: S(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: S(t, "%projectSelector_openButtonLabel%"),
    clearAll: S(t, "%projectSelector_clearAll%")
  };
}
function ft(t) {
  return wa[Ke(t)] ?? String(t);
}
const Qt = "platform.footerAction", tr = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function er({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = ft(t);
  return e ? /* @__PURE__ */ n(
    yt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: tr,
      children: a
    }
  ) : /* @__PURE__ */ n(yt, { variant: "secondary", children: a });
}
function ar({
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
    open: m,
    onPointerEnter: p,
    onPointerLeave: h
  } = ya(), [k, w] = $(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || t.isDisabled && !!t.disabledReason, N = m || k, v = q(() => {
    if (g) {
      w(!0);
      return;
    }
    p();
  }, [g, p]), J = q(() => {
    w(!1), h();
  }, [h]), T = /* @__PURE__ */ n(ae, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let D;
  e === "project" ? t.openGroups.length > 0 && (D = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((R) => /* @__PURE__ */ n(yt, { variant: "secondary", children: ft(R) }, R)) })) : t.scrollGroupId !== void 0 && (D = /* @__PURE__ */ f("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      er,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ f(
      W,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (R) => {
          R.stopPropagation(), o(t);
        },
        onMouseDown: (R) => R.stopPropagation(),
        "aria-label": a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(Re, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const K = /* @__PURE__ */ f(
    Dt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: v,
      onPointerLeave: J,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: T }),
        l && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ f(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Fe(t) && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        D
      ]
    }
  ), E = t.scrollGroupId !== void 0 ? ft(t.scrollGroupId) : void 0, et = t.isBoundButClosed && E ? a.boundButClosedTooltip.replace("{group}", E) : void 0;
  return /* @__PURE__ */ f(Bt, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ n(Mt, { asChild: !0, children: K }),
    /* @__PURE__ */ f(
      Ht,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", dir: "auto", children: re(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && E && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              E,
              ")"
            ] })
          ] }),
          et && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: et }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ n("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const dt = "none";
function rr({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: r
}) {
  const o = e !== dt;
  return /* @__PURE__ */ f(Sa, { children: [
    /* @__PURE__ */ f(Bt, { children: [
      /* @__PURE__ */ n(Mt, { asChild: !0, children: /* @__PURE__ */ n(ka, { asChild: !0, children: /* @__PURE__ */ n(
        W,
        {
          variant: "ghost",
          size: "sm",
          className: d(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            o && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": r.groupByAriaLabel,
          "aria-pressed": o,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ n(Pe, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ n(Ht, { children: r.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ f(
      Ia,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ne },
        children: [
          /* @__PURE__ */ n(Ca, { children: r.groupSectionLabel }),
          /* @__PURE__ */ f(Ea, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ n(qt, { value: dt, children: r.groupByNone }),
            /* @__PURE__ */ n(Ta, {}),
            t.map((s) => /* @__PURE__ */ n(qt, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function or(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === dt) return dt;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : dt;
}
function en(t) {
  const [e, a] = $(!1), [r, o] = $(""), s = at(() => Qa(t.localizedStrings), [t.localizedStrings]), i = at(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const c = [];
    return t.openTabs.length > 0 && c.push(ye(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && c.push(
      Za({
        label: s.autoSelectionGroupingLabel,
        selectedSectionHeading: s.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: s.autoSelectionUnselectedSectionHeading
      })
    ), c;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
  ]), [l, u] = $(void 0), m = at(
    () => or(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), p = l ?? m, h = pt(null), [k, w] = $(void 0), g = q((c) => {
    a(c), c || (o(""), w(void 0));
  }, []);
  _t(() => {
    if (!e) return;
    const c = window.requestAnimationFrame(() => {
      const b = h.current;
      b && b.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(c);
  }, [e]);
  const N = at(() => t.mode === "project" ? Ct({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Ct({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Ct({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), v = at(() => {
    const c = r.trim().toLowerCase();
    return c ? N.filter(
      (b) => b.shortName.toLowerCase().includes(c) || (b.fullName ?? "").toLowerCase().includes(c)
    ) : N;
  }, [N, r]), J = at(
    () => new Map(t.projects.map((c) => [O(c.id), c])),
    [t.projects]
  ), T = q(
    (c) => c === void 0 ? void 0 : J.get(O(c)),
    [J]
  ), { renderProjectIndicator: D } = t, K = q(
    (c) => D ? D(c.project) : void 0,
    [D]
  ), E = !!D, et = !!t.footerAction && v.length === 0, R = at(() => {
    if (p === dt) return Gt(v);
    const c = i.find((b) => b.id === p);
    return c ? Xa(v, c) : Gt(v);
  }, [v, p, i]), y = (c) => {
    if (c.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
    }
  }, F = (c) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: c.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const b = t.selection.pairs, j = O(c.projectId), M = (P) => O(P.projectId) === j && P.scrollGroupId === c.scrollGroupId, G = b.some(M) ? b.filter((P) => !M(P)) : [
          ...b.filter((P) => !M(P)),
          { projectId: c.projectId, scrollGroupId: c.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: G });
        return;
      }
      case "projectScrollGroup": {
        if (c.isBoundButClosed && c.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(c.projectId, c.scrollGroupId), a(!1);
          return;
        }
        if (c.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: c.projectId,
            scrollGroupId: c.scrollGroupId
          }), a(!1);
          return;
        }
        const b = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: c.projectId, scrollGroupId: b }), t.onOpenProjectInGroup(c.projectId, b), a(!1);
      }
    }
  }, Z = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, Y = t.mode === "project" ? t.renderTriggerLabel : void 0, lt = t.mode === "project" ? t.triggerLabelFormat : void 0, z = at(() => {
    switch (t.mode) {
      case "project": {
        const c = T(t.selection.projectId);
        if (Y)
          return { node: Y(c), title: "", hasSelection: !!c };
        let b = c ? c.shortName : s.buttonPlaceholder;
        return c && lt === "shortNameAndFullName" && (b = re(c)), { node: b, title: b, hasSelection: !!c };
      }
      case "project-multi": {
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G, hasSelection: !1 };
        }
        const b = [];
        if (c.forEach((G) => {
          const P = T(G.projectId);
          P && b.push({ project: P, scrollGroupId: G.scrollGroupId });
        }), b.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G, hasSelection: !1 };
        }
        const j = b.map(
          ({ project: G, scrollGroupId: P }) => P === void 0 ? G.shortName : `${G.shortName} (${ft(P)})`
        ).join(", "), M = b.length.toString();
        return {
          node: /* @__PURE__ */ f(Se, { children: [
            /* @__PURE__ */ n(yt, { variant: "muted", className: "tw:shrink-0", children: M }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: j })
          ] }),
          title: `${M} ${j}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const c = T(t.selection.projectId);
        if (!c) {
          const M = s.buttonPlaceholder;
          return { node: M, title: M, hasSelection: !1 };
        }
        const b = t.selection.scrollGroupId;
        if (b === void 0)
          return { node: c.shortName, title: c.shortName, hasSelection: !0 };
        const j = ft(b);
        return {
          node: `${c.shortName} · ${j}`,
          title: `${c.shortName} · ${j}`,
          accessibleTitle: `${c.shortName}, ${j}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    T,
    t.selection,
    Y,
    lt,
    s.buttonPlaceholder
  ]), ht = pt(null), [gt, Et] = $(!1);
  _t(() => {
    const c = ht.current;
    if (!c) return;
    const b = (M) => {
      Et(M < Ya);
    };
    if (b(c.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const j = new ResizeObserver((M) => {
      M.forEach((G) => {
        const [P] = G.borderBoxSize;
        b(P ? P.inlineSize : c.getBoundingClientRect().width);
      });
    });
    return j.observe(c, { box: "border-box" }), () => j.disconnect();
  }, []);
  let I;
  t.isLoading ? I = /* @__PURE__ */ n(Oe, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : gt ? I = void 0 : t.mode === "project-multi" ? I = /* @__PURE__ */ n(ee, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : I = /* @__PURE__ */ n(De, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const Q = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? y : void 0, B = s.ariaLabel && z.hasSelection && z.title ? `${s.ariaLabel}: ${z.accessibleTitle ?? z.title}` : s.ariaLabel || void 0, X = /* @__PURE__ */ f(
    W,
    {
      ref: ht,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": B,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: d(
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
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof z.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: z.node }) : z.node }),
        I
      ]
    }
  ), bt = z.title ? /* @__PURE__ */ n(Xt, { delayDuration: 400, children: /* @__PURE__ */ f(Bt, { children: [
    /* @__PURE__ */ n(Mt, { asChild: !0, children: /* @__PURE__ */ n(jt, { asChild: !0, children: X }) }),
    /* @__PURE__ */ n(Ht, { dir: "auto", children: z.title })
  ] }) }) : /* @__PURE__ */ n(jt, { asChild: !0, children: X }), Nt = i.length > 1;
  return /* @__PURE__ */ f(he, { open: e, onOpenChange: g, children: [
    bt,
    /* @__PURE__ */ n(
      ge,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ n(Xt, { delayDuration: 400, children: /* @__PURE__ */ f(
          ce,
          {
            shouldFilter: !1,
            value: et ? k ?? Qt : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ f("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
                  de,
                  {
                    value: r,
                    onValueChange: o,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Nt && /* @__PURE__ */ n(
                  rr,
                  {
                    availableGroupings: i,
                    activeGrouping: p,
                    onChangeGrouping: u,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ n(W, { variant: "ghost", size: "sm", onClick: Z, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ f(ue, { children: [
                /* @__PURE__ */ n(we, { children: s.commandEmptyMessage }),
                R.map((c, b) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ f(
                    je,
                    {
                      children: [
                        /* @__PURE__ */ n(pe, { heading: nr(c, s), children: c.rows.map((j) => /* @__PURE__ */ n(
                          ar,
                          {
                            row: j,
                            mode: t.mode,
                            strings: s,
                            onClick: F,
                            onOpen: Q,
                            selectedRowRef: h,
                            indicator: K(j),
                            reserveIndicatorSlot: E
                          },
                          j.rowKey
                        )) }),
                        b < R.length - 1 && /* @__PURE__ */ n(Ft, { alwaysRender: !0 })
                      ]
                    },
                    `${c.kind}:${c.groupingId ?? ""}:${c.key ?? c.label ?? ""}`
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
                /* @__PURE__ */ f("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  v.length > 0 && /* @__PURE__ */ n(
                    Ft,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ f(
                    Dt,
                    {
                      forceMount: !0,
                      value: Qt,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var c;
                        (c = t.footerAction) == null || c.onSelect(), g(!1);
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
function nr(t, e) {
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
const sr = te(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, l) => {
    const u = V();
    return /* @__PURE__ */ f(
      "div",
      {
        id: i,
        className: d("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            ze,
            {
              className: d(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            oa,
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
              onChange: (m) => e(m.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ f(
            W,
            {
              variant: "ghost",
              size: "icon",
              className: d(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": u === "rtl" },
                { "tw:right-0": u === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ n(Be, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
sr.displayName = "SearchBar";
const ir = 5;
function an(t) {
  return ua(t).filter(
    (e) => !A.isObsolete(A.bookIdToNumber(e))
  );
}
function lr(t, e) {
  return t.filter((a) => {
    try {
      return Ve(a) === e;
    } catch {
      return !1;
    }
  });
}
const rn = (t, e, a) => lr(t, e).every((r) => a.includes(r));
function cr(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => A.bookIdToNumber(r) > 0).sort((r, o) => A.bookIdToNumber(r) - A.bookIdToNumber(o)).map((r) => pa(r, e));
}
function on(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((l) => o.has(l)))
    return a;
  const i = cr(t, r);
  if (i.length !== 0)
    return i.length <= ir ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function nn({ message: t, id: e, className: a }) {
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
function dr({ className: t, ...e }) {
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
function ur({ className: t, ...e }) {
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
const wr = nt(
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
function pr({
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
        wr({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function sn({ className: t, ...e }) {
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
function mr({ className: t, ...e }) {
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
function fr({ className: t, ...e }) {
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
function ln({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: o = "alert",
  className: s
}) {
  return /* @__PURE__ */ f(dr, { className: d(s), role: o, children: [
    /* @__PURE__ */ f(ur, { children: [
      /* @__PURE__ */ n(pr, { variant: "icon", children: r ?? /* @__PURE__ */ n(Me, {}) }),
      /* @__PURE__ */ n(mr, { children: t })
    ] }),
    a && /* @__PURE__ */ n(fr, { children: /* @__PURE__ */ n(W, { onClick: () => a(), children: e }) })
  ] });
}
const hr = te(({ className: t, ...e }, a) => /* @__PURE__ */ n(He, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
hr.displayName = "Spinner";
const gr = nt(
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
function cn({
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
        gr({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function dn({ className: t, ...e }) {
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
function un({ className: t, ...e }) {
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
function wn({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    Ot.Group,
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
function xt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function pn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    Ot.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: xt(t),
      minSize: xt(e),
      maxSize: xt(a),
      collapsedSize: xt(r),
      ...o
    }
  );
}
function mn({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    Ot.Separator,
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
  Do as $,
  eo as A,
  W as B,
  Dt as C,
  Sa as D,
  co as E,
  wo as F,
  ue as G,
  we as H,
  Wr as I,
  Co as J,
  _o as K,
  ro as L,
  zr as M,
  Hr as N,
  Ur as O,
  he as P,
  Kr as Q,
  To as R,
  ve as S,
  Xt as T,
  yt as U,
  fa as V,
  jo as W,
  Ao as X,
  Ta as Y,
  yo as Z,
  oe as _,
  pa as a,
  go as a$,
  Bo as a0,
  Go as a1,
  Po as a2,
  zo as a3,
  Ro as a4,
  vo as a5,
  Ea as a6,
  qt as a7,
  Ho as a8,
  Jo as a9,
  Io as aA,
  ko as aB,
  No as aC,
  Eo as aD,
  so as aE,
  Ne as aF,
  kt as aG,
  It as aH,
  na as aI,
  ia as aJ,
  cn as aK,
  un as aL,
  dn as aM,
  uo as aN,
  Mr as aO,
  Fr as aP,
  ra as aQ,
  aa as aR,
  Br as aS,
  dr as aT,
  fr as aU,
  mr as aV,
  ur as aW,
  pr as aX,
  nn as aY,
  sn as aZ,
  Xo as a_,
  ne as aa,
  oa as ab,
  rt as ac,
  Ft as ad,
  Vr as ae,
  Fo as af,
  Vo as ag,
  mo as ah,
  $o as ai,
  za as aj,
  qo as ak,
  Ko as al,
  Ka as am,
  Uo as an,
  en as ao,
  sr as ap,
  an as aq,
  lr as ar,
  Qr as as,
  rn as at,
  po as au,
  $r as av,
  wa as aw,
  lo as ax,
  io as ay,
  So as az,
  Bt as b,
  fo as b0,
  ho as b1,
  mn as b2,
  pn as b3,
  wn as b4,
  ln as b5,
  hr as b6,
  Mo as b7,
  Oo as b8,
  bo as b9,
  Za as bA,
  Dr as bB,
  Ba as bC,
  on as bD,
  Or as ba,
  Rr as bb,
  ta as bc,
  Qe as bd,
  Gr as be,
  jr as bf,
  Pr as bg,
  Ar as bh,
  Aa as bi,
  ha as bj,
  se as bk,
  Lo as bl,
  Ra as bm,
  Zr as bn,
  dt as bo,
  L as bp,
  Wo as bq,
  ea as br,
  Yo as bs,
  tn as bt,
  Qo as bu,
  Zo as bv,
  Da as bw,
  Ua as bx,
  $a as by,
  Wa as bz,
  d as c,
  Mt as d,
  Ht as e,
  no as f,
  to as g,
  ka as h,
  Ia as i,
  Ca as j,
  xo as k,
  Xr as l,
  qr as m,
  ao as n,
  pe as o,
  V as p,
  da as q,
  _ as r,
  Yr as s,
  oo as t,
  ya as u,
  jt as v,
  ge as w,
  Jr as x,
  ce as y,
  de as z
};
//# sourceMappingURL=resizable-DclAbLsc.js.map
