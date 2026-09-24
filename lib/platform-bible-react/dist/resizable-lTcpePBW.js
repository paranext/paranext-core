import { jsx as n, jsxs as p, Fragment as _e } from "react/jsx-runtime";
import { Slot as jt, Dialog as Q, Separator as Ce, Popover as wt, Tooltip as lt, DropdownMenu as E, Label as Le, RadioGroup as _t, ToggleGroup as ee } from "radix-ui";
import { IconX as Ae, IconCheck as Rt, IconSearch as ze, IconChevronLeft as Ge, IconChevronRight as je } from "@tabler/icons-react";
import { Canon as L } from "@sillsdev/scripture";
import { cva as ot } from "class-variance-authority";
import C, { createContext as ae, useContext as oe, useState as H, useRef as pt, useCallback as X, useEffect as Ct, useMemo as at, Fragment as Re, forwardRef as re } from "react";
import { ChevronsUpDown as ne, Check as se, Star as Oe, Group as Pe, ArrowRight as De, Loader2 as Be, ChevronDown as Me, Search as He, X as Ue, AlertTriangle as $e, LoaderCircle as Fe } from "lucide-react";
import { Section as rt, MODIFIER_KEYS as Ke, normalizeProjectId as P, compareProjectsByName as Ve, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as dt, formatProjectName as ie, getLocalizeKeyForScrollGroupId as Je, hasDistinctFullName as Xe, getSectionForBook as Ze } from "platform-bible-utils";
import { filterAndRankItems as Vt } from "@eten-tech-foundation/platform-editor";
import { Command as st } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Ot from "react-resizable-panels";
import { clsx as We } from "clsx";
import { extendTailwindMerge as qe, twMerge as Ye } from "tailwind-merge";
const Qe = qe({ prefix: "tw" });
function Lt(t) {
  const e = [];
  let a = "", o = 0;
  for (let r = 0; r < t.length; r++) {
    const s = t[r];
    s === "[" ? o += 1 : s === "]" && (o -= 1), s === ":" && o === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function ta(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Lt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== a), `-${s}`].join(":")}`, original: t };
  }
  const o = e.findIndex((s) => s.startsWith("!tw-"));
  if (o !== -1) {
    const s = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== o), `!${s}`].join(":")}`, original: t };
  }
  const r = e[e.length - 1];
  if (r.startsWith("tw-")) {
    const s = r.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function ea(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = Lt(t);
  if (a[0] !== "tw") return t;
  const o = a.slice(1, -1), r = a[a.length - 1], s = Lt(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
  if (i && r.startsWith("-")) {
    const u = r.slice(1);
    return [...o, `-tw-${u}`].join(":");
  }
  if (l && r.startsWith("!")) {
    const u = r.slice(1);
    return [...o, `!tw-${u}`].join(":");
  }
  return [...o, `tw-${r}`].join(":");
}
function c(...t) {
  const e = We(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Qe(e);
  const a = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), r = [];
  return a.forEach((u) => {
    const m = ta(u);
    o.set(m.normalized, m.original), r.push(m.normalized);
  }), Ye(r.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = o.get(u);
    return m ? ea(u, m) : u;
  }).join(" ");
}
const le = 600, ce = 650, jo = 400, aa = 450, oa = 500, Ro = 510, Oo = 520, ra = 675, Po = 690, Do = 700, Bo = 800, de = ot(
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
  size: a = "default",
  asChild: o = !1,
  ...r
}) {
  const s = o ? jt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: c(de({ variant: e, size: a, className: t })),
      ...r
    }
  );
}
const ue = "layoutDirection";
function we() {
  return globalThis.localStorage ?? void 0;
}
function U() {
  var t;
  try {
    const e = (t = we()) == null ? void 0 : t.getItem(ue);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Mo(t) {
  var e;
  try {
    (e = we()) == null || e.setItem(ue, t);
  } catch {
  }
}
function Ho({ ...t }) {
  return /* @__PURE__ */ n(Q.Root, { "data-slot": "dialog", ...t });
}
function Uo({ ...t }) {
  return /* @__PURE__ */ n(Q.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function na({ ...t }) {
  return /* @__PURE__ */ n(Q.Portal, { "data-slot": "dialog-portal", ...t });
}
function $o({ ...t }) {
  return /* @__PURE__ */ n(Q.Close, { "data-slot": "dialog-close", ...t });
}
function sa({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    Q.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: aa, ...e },
      ...a
    }
  );
}
function Fo({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  ...i
}) {
  const l = U();
  return /* @__PURE__ */ p(na, { children: [
    /* @__PURE__ */ n(sa, { className: o, style: r }),
    /* @__PURE__ */ p(
      Q.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: oa, ...s },
        dir: l,
        ...i,
        children: [
          e,
          a && /* @__PURE__ */ n(Q.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(Ae, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ko({ className: t, ...e }) {
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
function Vo({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...o
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
      ...o,
      children: [
        a,
        e && /* @__PURE__ */ n(Q.Close, { asChild: !0, children: /* @__PURE__ */ n(Z, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Jo({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Q.Title,
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
function Xo({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Q.Description,
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
function ia({ className: t, type: e, ...a }) {
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
function la({ className: t, ...e }) {
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
const ca = ot(
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
function da({
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
        className: c(ca({ align: e }), t),
        onClick: (o) => {
          var r, s;
          o.target instanceof HTMLElement && o.target.closest("button") || (s = (r = o.currentTarget.parentElement) == null ? void 0 : r.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
ot("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function pe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    st,
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
function me({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...o
}) {
  const r = U(), s = C.useCallback(
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
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: r, children: /* @__PURE__ */ p(la, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        st.Input,
        {
          "data-slot": "command-input",
          className: c(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...o
        }
      ),
      /* @__PURE__ */ n(da, { children: /* @__PURE__ */ n(ze, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function fe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    st.List,
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
function he({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    st.Empty,
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
function ge({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    st.Group,
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
function Jt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    st.Separator,
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
function Pt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    st.Item,
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
        /* @__PURE__ */ n(Rt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Zo({ className: t, ...e }) {
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
const ua = [
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
], wa = (t) => {
  var e;
  return ((e = ua[t]) == null ? void 0 : e.chapters) ?? -1;
}, pa = L.allBookIds.filter(
  (t) => !L.isObsolete(L.bookIdToNumber(t))
);
function ma(t) {
  const e = [], a = Math.min(t.length, L.allBookIds.length);
  for (let o = 0; o < a; o += 1)
    t[o] === "1" && e.push(L.bookNumberToId(o + 1));
  return e;
}
function N(t) {
  return `%scrollGroup_${t}%`;
}
const fa = {
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
function Dt(t, e) {
  return wa(L.bookIdToNumber(t));
}
function yt(t, e, a) {
  const o = L.bookIdToNumber(t);
  let r, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = L.bookIdToNumber(i);
    (a === "next" ? l > o && l < s : l < o && l > s) && (r = i, s = l);
  }), r;
}
function Wo(t, e, a) {
  const { book: o, chapterNum: r } = t;
  if (e.includes(o) && r > 1)
    return { book: o, chapterNum: r - 1, verseNum: 1 };
  const s = yt(o, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Dt(s), 1),
      verseNum: 1
    };
}
function qo(t, e, a) {
  const { book: o, chapterNum: r } = t;
  if (e.includes(o) && r < Dt(o))
    return { book: o, chapterNum: r + 1, verseNum: 1 };
  const s = yt(o, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Yo(t, e, a) {
  const { book: o, chapterNum: r, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return s > 1 ? { book: o, chapterNum: r, verseNum: s - 1 } : s === 1 && r === 1 ? { book: o, chapterNum: 1, verseNum: 0 } : { book: o, chapterNum: r, verseNum: 0 };
  if (e === void 0) return;
  const i = yt(o, e, "previous");
  if (!i) return;
  const l = Math.max(Dt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Qo(t, e, a) {
  const { book: o, chapterNum: r, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return { book: o, chapterNum: r, verseNum: s + 1 };
  const i = yt(o, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function tr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const er = (t, e, a, o, r) => {
  switch (t) {
    case rt.OT:
      return e ?? "Old Testament";
    case rt.NT:
      return a ?? "New Testament";
    case rt.DC:
      return o ?? "Deuterocanon";
    case rt.Extra:
      return r ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, ar = (t, e, a, o, r) => {
  switch (t) {
    case rt.OT:
      return e ?? "OT";
    case rt.NT:
      return a ?? "NT";
    case rt.DC:
      return o ?? "DC";
    case rt.Extra:
      return r ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function or(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? L.bookIdToEnglishName(t);
}
function ha(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const rr = Object.fromEntries(
  pa.map((t) => [t, L.bookIdToEnglishName(t)])
);
function nr(t, e, a) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const r = L.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(r.toLowerCase().includes(o) || t.toLowerCase().includes(o) || (s ? s.localizedName.toLowerCase().includes(o) || s.localizedId.toLowerCase().includes(o) : !1));
}
const Xt = `
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
function ga(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function mt(t, e) {
  const a = e ? `${Xt}, ${e}` : Xt;
  return Array.from(t.querySelectorAll(a)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && ga(o)
  );
}
const sr = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let At = "keyboard", Zt = !1;
function ir() {
  Zt || typeof document > "u" || (Zt = !0, document.addEventListener(
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
function lr() {
  return At;
}
const be = "data-quiet-focus";
function cr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(be, ""), t.style.outline = "none"));
}
function dr(t) {
  t && (t.removeAttribute(be), t.style.removeProperty("outline"));
}
const ur = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function ba({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...o
}) {
  return /* @__PURE__ */ n(
    Ce.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const va = ot(
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
function wr({
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
        va({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function pr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const o = e ? jt.Root : "div";
  return /* @__PURE__ */ n(
    o,
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
function mr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    ba,
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
const fr = "data-platform-content-zoom-root", hr = "data-platform-content-zoom-popup", Na = "--platform-content-zoom-", xa = "--platform-content-zoom-default", Sa = "main", ya = "--platform-content-zoom-popup-factor", ve = ae(void 0);
function gr({ area: t, children: e }) {
  return /* @__PURE__ */ n(ve.Provider, { value: t ?? "", children: e });
}
function Bt() {
  return oe(ve);
}
function Mt(t) {
  const e = t || Sa;
  return {
    [ya]: `var(${Na}${e}, var(${xa}, 1))`
  };
}
function Ne({ ...t }) {
  return /* @__PURE__ */ n(wt.Root, { "data-slot": "popover", ...t });
}
function zt({ ...t }) {
  return /* @__PURE__ */ n(wt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const xe = C.createContext(null);
function br({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(xe.Provider, { value: t, children: e });
}
function Se({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...r
}) {
  const s = U(), i = C.useContext(xe), l = Bt();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(wt.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      wt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          // CUSTOM: Inside a content-zoom area, cap the width at the space Radix reports as available,
          // divided by the area's zoom factor: Radix measures in unzoomed pixels while this element's
          // own lengths are zoomed, so the division keeps a zoomed popover inside the pane
          // CUSTOM: Falls back to 100vw until Radix's size middleware publishes the real available
          // width, so the measuring pass gets a real cap instead of an invalid var() computing to none
          l !== void 0 && "tw:max-w-[calc(var(--radix-popover-content-available-width,100vw)/var(--platform-content-zoom-popup-factor,1))]",
          // CUSTOM: Inside a content-zoom area, also cap the height at the space Radix reports as
          // available, divided by the area's zoom factor, so a tall zoomed popover stays inside the
          // pane vertically too (same unzoomed-vs-zoomed pixel reason as the width cap above). The
          // box scrolls, so content that cannot shrink to the capped size stays inside it instead of
          // painting past its edges. That makes this element a clipping ancestor for anything
          // rendered inside it: the editor's right-click menu portals into the footnote editor's
          // root, a descendant, and stays inside this box only because the editor library clamps
          // the menu against its clipping ancestors. A nested pop-up that does not do that would
          // be clipped here.
          // CUSTOM: Falls back to 100vh until Radix's size middleware publishes the real available
          // height, so the measuring pass gets a real cap instead of an invalid var() computing to none
          l !== void 0 && "tw:max-h-[calc(var(--radix-popover-content-available-height,100vh)/var(--platform-content-zoom-popup-factor,1))] tw:overflow-y-auto",
          t
        ),
        style: {
          zIndex: le,
          ...l === void 0 ? void 0 : Mt(l),
          ...o
        },
        dir: s,
        "data-platform-content-zoom-root": l,
        "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
        ...r
      }
    ) })
  );
}
function vr({ ...t }) {
  return /* @__PURE__ */ n(wt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Nr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Wt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    lt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ht({ ...t }) {
  return /* @__PURE__ */ n(lt.Root, { "data-slot": "tooltip", ...t });
}
function Ut({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    lt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(de({ variant: e }), t) : t,
      ...a
    }
  );
}
function $t({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: a,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: o = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: r,
  children: s,
  ...i
}) {
  const l = Bt();
  return /* @__PURE__ */ n(lt.Portal, { children: /* @__PURE__ */ p(
    lt.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: {
        zIndex: ra,
        ...l === void 0 ? void 0 : Mt(l),
        ...a
      },
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        // CUSTOM: Inside a content-zoom area, keep the tooltip's usual 20rem limit (zoomed with its
        // text) but never wider than the space Radix reports as available, divided by the area's
        // zoom factor, so a zoomed tooltip stays inside the pane. Replaces the base max-w-xs.
        // CUSTOM: Falls back to 100vw until Radix's size middleware publishes the real available
        // width, so the measuring pass gets a real cap instead of an invalid var() computing to none
        l !== void 0 && "tw:max-w-[min(20rem,calc(var(--radix-tooltip-content-available-width,100vw)/var(--platform-content-zoom-popup-factor,1)))]",
        t
      ),
      "data-platform-content-zoom-root": l,
      "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
      ...i,
      children: [
        s,
        o && /* @__PURE__ */ n(
          lt.Arrow,
          {
            className: c(
              "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
              "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
              "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
              r
            )
          }
        )
      ]
    }
  ) });
}
const Ia = /^%[^%]*%$/;
function ye(t) {
  return t !== void 0 && !Ia.test(t) && t.trim() !== "";
}
function T(t, e) {
  return ye(t) ? t : e;
}
function ka() {
  const [t, e] = H(!1), a = pt(null), o = X(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), r = X(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: o, onPointerLeave: r };
}
const Ie = ae(void 0);
function It() {
  const t = oe(Ie);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const kt = ot("", {
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
function Ea({ variant: t = "default", ...e }) {
  const a = U(), o = C.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Ie.Provider, { value: o, children: /* @__PURE__ */ n(E.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function yr({
  ...t
}) {
  return /* @__PURE__ */ n(E.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ta({
  ...t
}) {
  return /* @__PURE__ */ n(E.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
const _a = "min(8rem, calc(max(var(--radix-dropdown-menu-content-available-width, 100vw), 8rem) / var(--platform-content-zoom-popup-factor, 1)))";
function Ca({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  children: r,
  ...s
}) {
  const i = U(), l = Bt();
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
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop) —
        // a dropdown menu must clear the overlay layer, including when opened from inside a
        // popover or dialog
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // A blur layer on a scrolling surface scrolls away with its items and never covers the
        // scrollbar gutter, so this scrolling surface in particular must be painted opaque.
        "pr-twp tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        // CUSTOM: Inside a content-zoom area, cap height and width at the space Radix reports as
        // available, divided by the area's zoom factor: Radix measures in unzoomed pixels while
        // this element's own lengths are zoomed. Replaces the base unzoomed max-height above.
        // CUSTOM: Falls back to 100vh/100vw until Radix's size middleware publishes the real
        // available space, so the measuring pass gets a real cap instead of an invalid var()
        // computing to none.
        l !== void 0 && "tw:max-h-[calc(var(--radix-dropdown-menu-content-available-height,100vh)/var(--platform-content-zoom-popup-factor,1))] tw:max-w-[calc(var(--radix-dropdown-menu-content-available-width,100vw)/var(--platform-content-zoom-popup-factor,1))]",
        t
      ),
      style: {
        zIndex: le,
        ...l === void 0 ? void 0 : Mt(l),
        ...l === void 0 ? void 0 : { minWidth: _a },
        ...o
      },
      "data-platform-content-zoom-root": l,
      "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
      ...s,
      children: /* @__PURE__ */ n("div", { dir: i, children: r })
    }
  ) });
}
function Ir({ ...t }) {
  return /* @__PURE__ */ n(E.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function kr({
  className: t,
  inset: e,
  variant: a = "default",
  ...o
}) {
  const r = U(), s = It();
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
        kt({ variant: s.variant })
      ),
      dir: r,
      ...o
    }
  );
}
function Er({
  className: t,
  children: e,
  checked: a,
  inset: o,
  ...r
}) {
  const s = U(), i = It();
  return /* @__PURE__ */ p(
    E.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        kt({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(Rt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function La({
  ...t
}) {
  return /* @__PURE__ */ n(E.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function qt({
  className: t,
  children: e,
  inset: a,
  ...o
}) {
  const r = U(), s = It();
  return /* @__PURE__ */ p(
    E.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        kt({ variant: s.variant })
      ),
      dir: r,
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(Rt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Aa({ className: t, inset: e, ...a }) {
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
function za({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    E.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Tr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: c(
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
function _r({ ...t }) {
  return /* @__PURE__ */ n(E.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Cr({
  className: t,
  inset: e,
  children: a,
  ...o
}) {
  const r = It(), s = U();
  return /* @__PURE__ */ p(
    E.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        kt({ variant: r.variant })
      ),
      ...o,
      children: [
        a,
        s === "rtl" ? /* @__PURE__ */ n(Ge, { className: "tw:ms-auto" }) : /* @__PURE__ */ n(je, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Lr({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: a,
  ...o
}) {
  const r = U();
  return /* @__PURE__ */ n(
    E.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
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
      style: { zIndex: ce, ...e },
      ...o,
      children: /* @__PURE__ */ n("div", { dir: r, children: a })
    }
  );
}
function Ar({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Le.Root,
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
function zr({
  className: t,
  ...e
}) {
  const a = U();
  return /* @__PURE__ */ n(
    _t.Root,
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
function Gr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    _t.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        _t.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Ga = ot(
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
), ke = C.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function jr({
  className: t,
  variant: e,
  size: a,
  spacing: o = 0,
  orientation: r = "horizontal",
  children: s,
  ...i
}) {
  const l = U();
  return /* @__PURE__ */ n(
    ee.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": o,
      "data-orientation": r,
      style: { "--gap": o },
      className: c(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...i,
      children: /* @__PURE__ */ n(
        ke.Provider,
        {
          value: C.useMemo(
            () => ({ variant: e, size: a, spacing: o, orientation: r }),
            [e, a, o, r]
          ),
          children: s
        }
      )
    }
  );
}
function Rr({
  className: t,
  children: e,
  variant: a = "default",
  size: o = "default",
  ...r
}) {
  const s = C.useContext(ke);
  return /* @__PURE__ */ n(
    ee.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || o,
      "data-spacing": s.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Ga({
          variant: s.variant || a,
          size: s.size || o
        }),
        t
      ),
      ...r,
      children: e
    }
  );
}
function Or() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Pr() {
  return /Windows/i.test(navigator.userAgent);
}
const ja = ["input", "select", "textarea", "button"], Ra = ["button", "textbox"], Dr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: o
}) => {
  const r = pt(null), [s, i] = H(void 0), [l, u] = H(void 0), m = X(
    (w) => {
      i(w);
      const g = t.find((h) => h.id === w);
      g && (e == null || e(g));
      const v = document.getElementById(w);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), r.current && r.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = X(
    (w) => {
      const g = t.find((v) => v.id === w);
      g && (u((v) => v === w ? void 0 : w), a == null || a(g));
    },
    [a, t]
  ), y = (w) => {
    if (!w) return !1;
    const g = w.tagName.toLowerCase();
    if (w.isContentEditable || ja.includes(g)) return !0;
    const v = w.getAttribute("role");
    if (v && Ra.includes(v)) return !0;
    const h = w.getAttribute("tabindex");
    return h !== void 0 && h !== "-1";
  }, k = X(
    (w) => {
      var R;
      const g = w.target, v = (x) => x ? document.getElementById(x) : void 0, h = v(l), F = v(s);
      if (!!(h && g && h.contains(g) && g !== h) && y(g)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const x = t.find(($) => $.id === l);
            x && m(x.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!h) return;
          const x = Array.from(
            h.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (x.length === 0) return;
          const $ = x.findIndex((q) => q === g);
          if ($ === -1) return;
          let W;
          w.key === "ArrowDown" ? W = Math.min($ + 1, x.length - 1) : W = Math.max($ - 1, 0), W !== $ && (w.preventDefault(), w.stopPropagation(), (R = x[W]) == null || R.focus());
          return;
        }
        return;
      }
      const tt = t.findIndex((x) => x.id === s);
      let A = tt;
      switch (w.key) {
        case "ArrowDown":
          A = Math.min(tt + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          A = Math.max(tt - 1, 0), w.preventDefault();
          break;
        case "Home":
          A = 0, w.preventDefault();
          break;
        case "End":
          A = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const x = F;
          if (x) {
            const $ = x.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), W = x.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), q = $ ?? W;
            if (q) {
              w.preventDefault(), q.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (y(g) || (o == null || o(w.key), w.preventDefault()));
          return;
      }
      const et = t[A];
      et && m(et.id);
    },
    [t, m, s, l, f, o]
  );
  return {
    listboxRef: r,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: k,
    /** Focus an option by its ID */
    focusOption: m
  };
}, Oa = ot(
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
function St({ className: t, variant: e = "default", asChild: a = !1, ...o }) {
  const r = a ? jt.Root : "span";
  return /* @__PURE__ */ n(
    r,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Oa({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function Br({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Mr({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...o
}) {
  const r = C.useRef(null);
  C.useEffect(() => {
    typeof a == "function" ? a(r.current) : a && "current" in a && (a.current = r.current);
  }, [a]), C.useEffect(() => {
    const i = r.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        mt(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
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
    const { current: l } = r;
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
        className: c("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: r,
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
            ...o
          }
        )
      }
    )
  );
}
function Hr({
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
function Ur({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function $r({ className: t, ...e }) {
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
function Pa(t) {
  C.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const r = t.current ? mt(t.current) : [], s = r.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < r.length && r[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
function Da(t, e, a) {
  let o;
  return a === "ArrowLeft" && e > 0 ? o = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Ba(t, e, a) {
  let o;
  return a === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : a === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Fr({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: o = !1,
  ref: r,
  ...s
}) {
  const i = C.useRef(null);
  C.useEffect(() => {
    typeof r == "function" ? r(i.current) : r && "current" in r && (r.current = i.current);
  }, [r]), Pa(i);
  const l = C.useMemo(
    () => i.current ? mt(i.current) : [],
    [i]
  ), u = C.useCallback(
    (f) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      const k = y.closest("table"), w = k ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        mt(k).filter(
          (h) => h.tagName === "TR"
        )
      ) : [], g = w.indexOf(y), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), Ba(w, g, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), Da(l, v, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const h = y.closest("table");
        h && h.focus();
      }
      e == null || e(f);
    },
    [i, l, e]
  ), m = C.useCallback(
    (f) => {
      o && (a == null || a(f));
    },
    [o, a]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: u,
      onFocus: m,
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
function Kr({ className: t, ...e }) {
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
function Vr({ className: t, ...e }) {
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
function Jr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ma(t, e = !0) {
  const [a, o] = H(!1);
  return Ct(() => {
    const r = t.current;
    if (!e || !r) {
      o(!1);
      return;
    }
    const s = () => {
      o(r.scrollTop + r.clientHeight < r.scrollHeight - 1);
    };
    s(), r.addEventListener("scroll", s);
    const i = typeof ResizeObserver < "u" ? new ResizeObserver(s) : void 0;
    i == null || i.observe(r);
    const l = new MutationObserver(s);
    return l.observe(r, { childList: !0, subtree: !0 }), () => {
      r.removeEventListener("scroll", s), i == null || i.disconnect(), l.disconnect();
    };
  }, [t, e]), a;
}
function Ha({
  children: t,
  isEnabled: e,
  scrollerRef: a
}) {
  const o = Ma(a, e);
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
function Xr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: o,
  searchPlaceholder: r,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: m,
  isOpen: f = void 0,
  onOpenChange: y = void 0,
  isDisabled: k = !1,
  sortSelected: w = !1,
  showScrollCue: g = !1,
  icon: v = void 0,
  className: h = void 0,
  variant: F = "ghost",
  id: K
}) {
  const [V, tt] = H(!1), A = pt(null), et = X(
    (I) => {
      var B;
      const Y = (B = t.find((J) => J.label === I)) == null ? void 0 : B.value;
      Y && a(
        e.includes(Y) ? e.filter((J) => J !== Y) : [...e, Y]
      );
    },
    [t, e, a]
  ), R = () => m || o, x = f ?? V, $ = y ?? tt, [W, q] = H(x), [it, D] = H(e);
  W !== x && (q(x), x && D(e));
  const ht = at(() => {
    if (!w) return t;
    const I = t.filter((B) => B.starred).sort((B, J) => B.label.localeCompare(J.label)), Y = t.filter((B) => !B.starred).sort((B, J) => {
      const bt = it.includes(B.value), vt = it.includes(J.value);
      return bt && !vt ? -1 : !bt && vt ? 1 : B.label.localeCompare(J.label);
    });
    return [...I, ...Y];
  }, [t, it, w]), gt = () => {
    const I = t.map((Y) => Y.value);
    D(I), a(I);
  }, Et = () => {
    D([]), a([]);
  };
  return /* @__PURE__ */ n("div", { id: K, className: h, children: /* @__PURE__ */ p(Ne, { open: x, onOpenChange: $, children: [
    /* @__PURE__ */ n(zt, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
      {
        variant: F,
        role: "combobox",
        "aria-expanded": x,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: k,
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
          /* @__PURE__ */ n(ne, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Se, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(pe, { children: [
      /* @__PURE__ */ n(
        me,
        {
          placeholder: r ?? o,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(Z, { variant: "ghost", size: "sm", onClick: gt, children: i }),
        /* @__PURE__ */ n(Z, { variant: "ghost", size: "sm", onClick: Et, children: l })
      ] }),
      /* @__PURE__ */ n(Ha, { isEnabled: g, scrollerRef: A, children: /* @__PURE__ */ p(fe, { ref: A, children: [
        /* @__PURE__ */ n(he, { children: u }),
        /* @__PURE__ */ n(ge, { children: ht.map((I) => /* @__PURE__ */ p(
          Pt,
          {
            value: I.label,
            onSelect: et,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                se,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(I.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              I.starred && /* @__PURE__ */ n(Oe, { className: "tw:h-4 tw:w-4" }),
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
function ut(t) {
  return t.replace(/^\+/, "");
}
function Ua(t, e, a) {
  if (!e) return [...t];
  const o = [...t], r = ut(e).toLowerCase();
  return a === "passive" ? Vt({
    query: r,
    items: o,
    filter: (s) => ut(s.label).toLowerCase().startsWith(r),
    sortBy: "label"
  }) : Vt({
    query: r,
    items: o,
    filter: (s) => ut(s.label).toLowerCase().includes(r),
    sortBy: "label"
  });
}
function $a(t) {
  return t.isComposing || t.keyCode === 229;
}
const Ee = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, Fa = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ka = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Va(t) {
  return [
    ...Fa,
    ...Ka.filter((e) => Ee[t].test(e))
  ];
}
function O(t) {
  t.preventDefault(), t.stopPropagation();
}
function Zr(t, e, a) {
  var r, s;
  const { kind: o } = e;
  if (o === "enter")
    return t.key === "Enter" ? (O(t), a.commit(), "ended") : t.key === "Escape" ? (O(t), a.dismiss(), "ended") : "passed";
  if ($a(t) || Ke.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((r = t.getModifierState) != null && r.call(t, "AltGraph")))
    return t.key === "Enter" && O(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return O(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return O(t), Ua(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      o === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return O(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (o === "backslash")
      return O(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    O(t);
    const i = ut(e.filter).toLowerCase(), l = e.items.find(
      (u) => ut(u.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? o === "selection" && e.filter === "" ? (O(t), a.dismiss(), "ended") : (O(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && o === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (O(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (O(t), a.dismiss(), "ended") : t.key === "Backspace" || Ee[o].test(t.key) ? (O(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (o === "selection" && O(t), a.dismiss(), "ended");
}
function Wr(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function qr(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: o,
    sessionCounterRef: r,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: m,
    focusEditor: f,
    applyItem: y,
    onShowError: k
  } = t;
  r.current += 1;
  const w = r.current, g = a ? "backslash" : "selection", v = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && o && (v.shouldSpaceCommit = o), s(v), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: Va(g),
    onKey: (h) => l(h)
  }).then((h) => {
    if (i(w), h !== void 0) {
      m(), f();
      const F = e.find((K) => K.marker === h);
      F && y(F);
    } else a || f();
  }).catch((h) => {
    i(w), a || f(), k(h);
  });
}
function Yr({ className: t, ...e }) {
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
function Qr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function Ja(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const o = P(a.projectId), r = e.get(o), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    r ? r.some((i) => i.scrollGroupId === a.scrollGroupId) || r.push(s) : e.set(o, [s]);
  }), e.forEach((a) => a.sort((o, r) => o.scrollGroupId - r.scrollGroupId)), e;
}
function Yt(t, e, a) {
  const o = P(e);
  return t.some(
    (r) => P(r.projectId) === o && r.scrollGroupId === a
  );
}
function Tt(t) {
  const e = Ja(t.openTabs);
  if (t.mode === "project") {
    const r = t.selection.projectId === void 0 ? void 0 : P(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(P(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: r !== void 0 && r === P(s.id),
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
  const o = [];
  return t.projects.forEach((r) => {
    const s = e.get(P(r.id));
    if (!s || s.length === 0) {
      o.push({
        rowKey: `project:${r.id}`,
        projectId: r.id,
        shortName: r.shortName,
        fullName: r.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Yt(a, r.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        project: r
      });
      return;
    }
    s.forEach((i) => {
      o.push({
        rowKey: `tab:${r.id}:${i.scrollGroupId}`,
        projectId: r.id,
        shortName: r.shortName,
        fullName: r.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Yt(a, r.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        project: r
      });
    });
  }), a.forEach((r) => {
    if (r.scrollGroupId === void 0) return;
    const s = P(r.projectId);
    if (o.some(
      (l) => P(l.projectId) === s && l.scrollGroupId === r.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => P(l.id) === s);
    i && o.push({
      rowKey: `closed:${i.id}:${r.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      scrollGroupId: r.scrollGroupId,
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
const Ft = "Selected", Kt = "Unselected";
function Qt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function nt(t, e) {
  const a = Ve(t, e);
  if (a !== 0) return a;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, r = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - r;
}
function Gt(t) {
  return [{ kind: "flat", rows: [...t].sort(nt) }];
}
function Xa(t) {
  const e = t.filter(Qt).sort(nt), a = t.filter((r) => !Qt(r)).sort(nt);
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const o = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && o.push({ kind: "other", rows: a }), o;
}
function Za(t, e) {
  const a = t.filter((i) => i.isSelected).sort(nt), o = t.filter((i) => !i.isSelected).sort(nt), r = (i, l) => {
    var m;
    const u = (m = e.getSectionHeading) == null ? void 0 : m.call(
      e,
      i,
      l.map((f) => f.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? Ft : Kt;
  }, s = [];
  return a.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: r("selected", a),
    rows: a
  }), o.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: r("unselected", o),
    rows: o
  }), s;
}
function Wa(t, e) {
  if (e.id === "openTabs") return Xa(t);
  if (e.id === "selection") return Za(t, e);
  if (!e.getGroupKey) return Gt(t);
  const a = /* @__PURE__ */ new Map(), o = [], { getGroupKey: r } = e;
  t.forEach((l) => {
    const u = r(l.project);
    if (u === void 0 || u === "") {
      o.push(l);
      return;
    }
    const m = a.get(u);
    m ? m.push(l) : a.set(u, [l]);
  });
  const s = [...a.entries()].map(([l, u]) => {
    var y;
    const m = [...u].sort(
      (k, w) => {
        var g;
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, k.project, w.project)) || nt(k, w);
      }
    ), f = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      l,
      m.map((k) => k.project)
    )) ?? l;
    return { key: l, heading: f, rows: m };
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
  return o.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...o].sort(nt)
  }), i;
}
const tn = [
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
  if (!(typeof a != "string" || !ye(a)))
    return a;
}
const Nt = "recent", qa = "other";
function Te(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Ya(t) {
  const e = t ?? {};
  return [
    Te(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (a) => {
        var o;
        return typeof ((o = a.customData) == null ? void 0 : o[dt.lastUsedAt]) == "number" ? Nt : qa;
      },
      getSectionHeading: (a) => a === Nt ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, o) => a.key === Nt ? -1 : o.key === Nt ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (a) => {
        var r;
        const o = (r = a.customData) == null ? void 0 : r[dt.language];
        return typeof o == "string" ? o : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (a) => {
        var r;
        const o = (r = a.customData) == null ? void 0 : r[dt.type];
        return typeof o == "string" ? o : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (a, o) => {
        var i;
        const r = o.find(
          (l) => {
            var u;
            return typeof ((u = l.customData) == null ? void 0 : u[dt.typeName]) == "string";
          }
        ), s = (i = r == null ? void 0 : r.customData) == null ? void 0 : i[dt.typeName];
        return typeof s == "string" && s.length > 0 ? s : a;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const en = Ya();
function Qa(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (a) => a === "selected" ? e.selectedSectionHeading ?? Ft : e.unselectedSectionHeading ?? Kt
  };
}
function an(t) {
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
function on(t) {
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
const to = 100, _ = {
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
  autoSelectionSelectedSectionHeading: Ft,
  autoSelectionUnselectedSectionHeading: Kt,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function eo(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : T(e.ariaLabel, _.ariaLabel),
    buttonPlaceholder: T(
      e.buttonPlaceholder,
      _.buttonPlaceholder
    ),
    commandEmptyMessage: T(
      e.commandEmptyMessage,
      _.commandEmptyMessage
    ),
    searchPlaceholder: T(
      e.searchPlaceholder,
      _.searchPlaceholder
    ),
    groupByAriaLabel: T(
      e.groupByAriaLabel,
      _.groupByAriaLabel
    ),
    groupSectionLabel: T(
      e.groupSectionLabel,
      _.groupSectionLabel
    ),
    groupByNone: T(
      e.groupByNone,
      _.groupByNone
    ),
    openTabsSectionHeading: T(
      e.openTabsSectionHeading,
      _.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: T(
      e.otherProjectsSectionHeading,
      _.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: T(
      e.autoOpenTabsGroupingLabel,
      _.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: T(
      e.autoSelectionGroupingLabel,
      _.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: T(
      e.autoSelectionSelectedSectionHeading,
      _.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: T(
      e.autoSelectionUnselectedSectionHeading,
      _.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: T(
      e.boundButClosedTooltip,
      _.boundButClosedTooltip
    ),
    openButtonLabel: T(
      e.openButtonLabel,
      _.openButtonLabel
    ),
    clearAll: T(e.clearAll, _.clearAll)
  };
}
function rn(t) {
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
  return fa[Je(t)] ?? String(t);
}
const te = "platform.footerAction", ao = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function oo({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = ft(t);
  return e ? /* @__PURE__ */ n(
    St,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ao,
      children: a
    }
  ) : /* @__PURE__ */ n(St, { variant: "secondary", children: a });
}
function ro({
  row: t,
  mode: e,
  strings: a,
  onClick: o,
  onOpen: r,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: u,
    open: m,
    onPointerEnter: f,
    onPointerLeave: y
  } = ka(), [k, w] = H(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || t.isDisabled && !!t.disabledReason, v = m || k, h = X(() => {
    if (g) {
      w(!0);
      return;
    }
    f();
  }, [g, f]), F = X(() => {
    w(!1), y();
  }, [y]), K = /* @__PURE__ */ n(se, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let V;
  e === "project" ? t.openGroups.length > 0 && (V = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((R) => /* @__PURE__ */ n(St, { variant: "secondary", children: ft(R) }, R)) })) : t.scrollGroupId !== void 0 && (V = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      oo,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && r && /* @__PURE__ */ p(
      Z,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (R) => {
          R.stopPropagation(), r(t);
        },
        onMouseDown: (R) => R.stopPropagation(),
        "aria-label": a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(De, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const tt = /* @__PURE__ */ p(
    Pt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: h,
      onPointerLeave: F,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: K }),
        l && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Xe(t) && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        V
      ]
    }
  ), A = t.scrollGroupId !== void 0 ? ft(t.scrollGroupId) : void 0, et = t.isBoundButClosed && A ? a.boundButClosedTooltip.replace("{group}", A) : void 0;
  return /* @__PURE__ */ p(Ht, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ n(Ut, { asChild: !0, children: tt }),
    /* @__PURE__ */ p(
      $t,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", dir: "auto", children: ie(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && A && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              A,
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
const ct = "none";
function no({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: o
}) {
  const r = e !== ct;
  return /* @__PURE__ */ p(Ea, { children: [
    /* @__PURE__ */ p(Ht, { children: [
      /* @__PURE__ */ n(Ut, { asChild: !0, children: /* @__PURE__ */ n(Ta, { asChild: !0, children: /* @__PURE__ */ n(
        Z,
        {
          variant: "ghost",
          size: "sm",
          className: c(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            r && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": o.groupByAriaLabel,
          "aria-pressed": r,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ n(Pe, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ n($t, { children: o.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
      Ca,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ce },
        children: [
          /* @__PURE__ */ n(Aa, { children: o.groupSectionLabel }),
          /* @__PURE__ */ p(La, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ n(qt, { value: ct, children: o.groupByNone }),
            /* @__PURE__ */ n(za, {}),
            t.map((s) => /* @__PURE__ */ n(qt, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function so(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === ct) return ct;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : ct;
}
function nn(t) {
  const [e, a] = H(!1), [o, r] = H(""), s = at(() => eo(t.localizedStrings), [t.localizedStrings]), i = at(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const d = [];
    return t.openTabs.length > 0 && d.push(Te(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && d.push(
      Qa({
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
  ]), [l, u] = H(void 0), m = at(
    () => so(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = l ?? m, y = pt(null), [k, w] = H(void 0), g = X((d) => {
    a(d), d || (r(""), w(void 0));
  }, []);
  Ct(() => {
    if (!e) return;
    const d = window.requestAnimationFrame(() => {
      const b = y.current;
      b && b.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(d);
  }, [e]);
  const v = at(() => t.mode === "project" ? Tt({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Tt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Tt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), h = at(() => {
    const d = o.trim().toLowerCase();
    return d ? v.filter(
      (b) => b.shortName.toLowerCase().includes(d) || (b.fullName ?? "").toLowerCase().includes(d)
    ) : v;
  }, [v, o]), F = at(
    () => new Map(t.projects.map((d) => [P(d.id), d])),
    [t.projects]
  ), K = X(
    (d) => d === void 0 ? void 0 : F.get(P(d)),
    [F]
  ), { renderProjectIndicator: V } = t, tt = X(
    (d) => V ? V(d.project) : void 0,
    [V]
  ), A = !!V, et = !!t.footerAction && h.length === 0, R = at(() => {
    if (f === ct) return Gt(h);
    const d = i.find((b) => b.id === f);
    return d ? Wa(h, d) : Gt(h);
  }, [h, f, i]), x = (d) => {
    if (d.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
    }
  }, $ = (d) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: d.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const b = t.selection.pairs, z = P(d.projectId), M = (j) => P(j.projectId) === z && j.scrollGroupId === d.scrollGroupId, G = b.some(M) ? b.filter((j) => !M(j)) : [
          ...b.filter((j) => !M(j)),
          { projectId: d.projectId, scrollGroupId: d.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: G });
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
        const b = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: d.projectId, scrollGroupId: b }), t.onOpenProjectInGroup(d.projectId, b), a(!1);
      }
    }
  }, W = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, q = t.mode === "project" ? t.renderTriggerLabel : void 0, it = t.mode === "project" ? t.triggerLabelFormat : void 0, D = at(() => {
    switch (t.mode) {
      case "project": {
        const d = K(t.selection.projectId);
        if (q)
          return { node: q(d), title: "", hasSelection: !!d };
        let b = d ? d.shortName : s.buttonPlaceholder;
        return d && it === "shortNameAndFullName" && (b = ie(d)), { node: b, title: b, hasSelection: !!d };
      }
      case "project-multi": {
        const { pairs: d } = t.selection;
        if (d.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G, hasSelection: !1 };
        }
        const b = [];
        if (d.forEach((G) => {
          const j = K(G.projectId);
          j && b.push({ project: j, scrollGroupId: G.scrollGroupId });
        }), b.length === 0) {
          const G = s.buttonPlaceholder;
          return { node: G, title: G, hasSelection: !1 };
        }
        const z = b.map(
          ({ project: G, scrollGroupId: j }) => j === void 0 ? G.shortName : `${G.shortName} (${ft(j)})`
        ).join(", "), M = b.length.toString();
        return {
          node: /* @__PURE__ */ p(_e, { children: [
            /* @__PURE__ */ n(St, { variant: "muted", className: "tw:shrink-0", children: M }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: z })
          ] }),
          title: `${M} ${z}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const d = K(t.selection.projectId);
        if (!d) {
          const M = s.buttonPlaceholder;
          return { node: M, title: M, hasSelection: !1 };
        }
        const b = t.selection.scrollGroupId;
        if (b === void 0)
          return { node: d.shortName, title: d.shortName, hasSelection: !0 };
        const z = ft(b);
        return {
          node: `${d.shortName} · ${z}`,
          title: `${d.shortName} · ${z}`,
          accessibleTitle: `${d.shortName}, ${z}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    K,
    t.selection,
    q,
    it,
    s.buttonPlaceholder
  ]), ht = pt(null), [gt, Et] = H(!1);
  Ct(() => {
    const d = ht.current;
    if (!d) return;
    const b = (M) => {
      Et(M < to);
    };
    if (b(d.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const z = new ResizeObserver((M) => {
      M.forEach((G) => {
        const [j] = G.borderBoxSize;
        b(j ? j.inlineSize : d.getBoundingClientRect().width);
      });
    });
    return z.observe(d, { box: "border-box" }), () => z.disconnect();
  }, []);
  let I;
  t.isLoading ? I = /* @__PURE__ */ n(Be, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : gt ? I = void 0 : t.mode === "project-multi" ? I = /* @__PURE__ */ n(ne, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : I = /* @__PURE__ */ n(Me, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const Y = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? x : void 0, B = s.ariaLabel && D.hasSelection && D.title ? `${s.ariaLabel}: ${D.accessibleTitle ?? D.title}` : s.ariaLabel || void 0, J = /* @__PURE__ */ p(
    Z,
    {
      ref: ht,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": B,
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
        gt && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof D.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: D.node }) : D.node }),
        I
      ]
    }
  ), bt = D.title ? /* @__PURE__ */ n(Wt, { delayDuration: 400, children: /* @__PURE__ */ p(Ht, { children: [
    /* @__PURE__ */ n(Ut, { asChild: !0, children: /* @__PURE__ */ n(zt, { asChild: !0, children: J }) }),
    /* @__PURE__ */ n($t, { dir: "auto", children: D.title })
  ] }) }) : /* @__PURE__ */ n(zt, { asChild: !0, children: J }), vt = i.length > 1;
  return /* @__PURE__ */ p(Ne, { open: e, onOpenChange: g, children: [
    bt,
    /* @__PURE__ */ n(
      Se,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ n(Wt, { delayDuration: 400, children: /* @__PURE__ */ p(
          pe,
          {
            shouldFilter: !1,
            value: et ? k ?? te : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
                  me,
                  {
                    value: o,
                    onValueChange: r,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                vt && /* @__PURE__ */ n(
                  no,
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
              /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ n(Z, { variant: "ghost", size: "sm", onClick: W, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(fe, { children: [
                /* @__PURE__ */ n(he, { children: s.commandEmptyMessage }),
                R.map((d, b) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    Re,
                    {
                      children: [
                        /* @__PURE__ */ n(ge, { heading: io(d, s), children: d.rows.map((z) => /* @__PURE__ */ n(
                          ro,
                          {
                            row: z,
                            mode: t.mode,
                            strings: s,
                            onClick: $,
                            onOpen: Y,
                            selectedRowRef: y,
                            indicator: tt(z),
                            reserveIndicatorSlot: A
                          },
                          z.rowKey
                        )) }),
                        b < R.length - 1 && /* @__PURE__ */ n(Jt, { alwaysRender: !0 })
                      ]
                    },
                    `${d.kind}:${d.groupingId ?? ""}:${d.key ?? d.label ?? ""}`
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
                  h.length > 0 && /* @__PURE__ */ n(
                    Jt,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    Pt,
                    {
                      forceMount: !0,
                      value: te,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var d;
                        (d = t.footerAction) == null || d.onSelect(), g(!1);
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
function io(t, e) {
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
const lo = re(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: o, className: r, isDisabled: s = !1, id: i }, l) => {
    const u = U();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: c("tw:relative tw:@container/search", { "tw:w-full": o }, r),
        children: [
          /* @__PURE__ */ n(
            He,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            ia,
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
              onChange: (m) => e(m.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ p(
            Z,
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
                /* @__PURE__ */ n(Ue, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
lo.displayName = "SearchBar";
const co = 5;
function sn(t) {
  return ma(t).filter(
    (e) => !L.isObsolete(L.bookIdToNumber(e))
  );
}
function uo(t, e) {
  return t.filter((a) => {
    try {
      return Ze(a) === e;
    } catch {
      return !1;
    }
  });
}
const ln = (t, e, a) => uo(t, e).every((o) => a.includes(o));
function wo(t, e) {
  return [
    ...new Set(t.map((o) => o.toUpperCase()))
  ].filter((o) => L.bookIdToNumber(o) > 0).sort((o, r) => L.bookIdToNumber(o) - L.bookIdToNumber(r)).map((o) => ha(o, e));
}
function cn(t, e, a, o) {
  if (t.length === 0) return;
  const r = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === r.size && [...s].every((l) => r.has(l)))
    return a;
  const i = wo(t, o);
  if (i.length !== 0)
    return i.length <= co ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function dn({ message: t, id: e, className: a }) {
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
function po({ className: t, ...e }) {
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
function mo({ className: t, ...e }) {
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
const fo = ot(
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
function ho({
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
        fo({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function un({ className: t, ...e }) {
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
function go({ className: t, ...e }) {
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
function bo({ className: t, ...e }) {
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
function wn({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: o,
  role: r = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(po, { className: c(s), role: r, children: [
    /* @__PURE__ */ p(mo, { children: [
      /* @__PURE__ */ n(ho, { variant: "icon", children: o ?? /* @__PURE__ */ n($e, {}) }),
      /* @__PURE__ */ n(go, { children: t })
    ] }),
    a && /* @__PURE__ */ n(bo, { children: /* @__PURE__ */ n(Z, { onClick: () => a(), children: e }) })
  ] });
}
const vo = re(({ className: t, ...e }, a) => /* @__PURE__ */ n(Fe, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
vo.displayName = "Spinner";
const No = ot(
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
function pn({
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
        No({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function mn({ className: t, ...e }) {
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
function fn({ className: t, ...e }) {
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
function hn({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: o,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ot.Group,
    {
      "data-slot": "resizable-panel-group",
      className: c(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...r
    }
  );
}
function xt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function gn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: o,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ot.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: xt(t),
      minSize: xt(e),
      maxSize: xt(a),
      collapsedSize: xt(o),
      ...r
    }
  );
}
function bn({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    Ot.Separator,
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
  za as $,
  rr as A,
  Z as B,
  Pt as C,
  Ea as D,
  wr as E,
  mr as F,
  fe as G,
  he as H,
  Qo as I,
  Ar as J,
  Gr as K,
  sr as L,
  Ho as M,
  Fo as N,
  Ko as O,
  Ne as P,
  Jo as Q,
  zr as R,
  jr as S,
  Wt as T,
  Rr as U,
  Or as V,
  St as W,
  ba as X,
  Br as Y,
  Dr as Z,
  gr as _,
  ha as a,
  dn as a$,
  Er as a0,
  le as a1,
  Fr as a2,
  Vr as a3,
  Mr as a4,
  Hr as a5,
  Kr as a6,
  Ur as a7,
  Ir as a8,
  La as a9,
  _r as aA,
  yr as aB,
  Lr as aC,
  cr as aD,
  Ie as aE,
  It as aF,
  kt as aG,
  la as aH,
  da as aI,
  pn as aJ,
  fn as aK,
  mn as aL,
  pr as aM,
  Na as aN,
  xa as aO,
  hr as aP,
  fr as aQ,
  $o as aR,
  Xo as aS,
  sa as aT,
  na as aU,
  Uo as aV,
  po as aW,
  bo as aX,
  go as aY,
  mo as aZ,
  ho as a_,
  qt as aa,
  Xr as ab,
  Yr as ac,
  ce as ad,
  ia as ae,
  ut as af,
  Jt as ag,
  Zo as ah,
  qr as ai,
  Zr as aj,
  Wr as ak,
  vr as al,
  $a as am,
  nn as an,
  lo as ao,
  sn as ap,
  uo as aq,
  ar,
  ln as as,
  br as at,
  Vo as au,
  fa as av,
  ur as aw,
  dr as ax,
  Tr as ay,
  Cr as az,
  Ht as b,
  un as b0,
  Qr as b1,
  Sa as b2,
  Sr as b3,
  Nr as b4,
  xr as b5,
  bn as b6,
  gn as b7,
  hn as b8,
  wn as b9,
  Ua as bA,
  Va as bB,
  Ya as bC,
  Qa as bD,
  Mo as bE,
  cn as bF,
  vo as ba,
  Jr as bb,
  $r as bc,
  Bo as bd,
  Do as be,
  oa as bf,
  aa as bg,
  Oo as bh,
  Ro as bi,
  Po as bj,
  jo as bk,
  Oa as bl,
  va as bm,
  de as bn,
  Pr as bo,
  Bt as bp,
  Ma as bq,
  tr as br,
  ct as bs,
  _ as bt,
  tn as bu,
  ra as bv,
  an as bw,
  rn as bx,
  on as by,
  en as bz,
  c,
  Ut as d,
  $t as e,
  lr as f,
  or as g,
  Ta as h,
  Ca as i,
  Aa as j,
  kr as k,
  qo as l,
  Yo as m,
  nr as n,
  ge as o,
  U as p,
  pa as q,
  T as r,
  er as s,
  ir as t,
  ka as u,
  zt as v,
  Se as w,
  Wo as x,
  pe as y,
  me as z
};
//# sourceMappingURL=resizable-lTcpePBW.js.map
