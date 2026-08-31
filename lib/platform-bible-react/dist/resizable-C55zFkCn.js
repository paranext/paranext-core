import { jsx as n, jsxs as p, Fragment as kt } from "react/jsx-runtime";
import { Slot as wt, Dialog as _, Popover as Z, Tooltip as X, Label as Xt, RadioGroup as dt, ToggleGroup as Ct, Separator as Wt, DropdownMenu as S } from "radix-ui";
import { IconX as qt, IconSearch as Zt, IconCheck as mt, IconChevronRight as Yt } from "@tabler/icons-react";
import { Canon as G } from "@sillsdev/scripture";
import z, { useState as j, useRef as ot, useCallback as $, createContext as Qt, useContext as te, useMemo as U, useEffect as St, Fragment as ee, forwardRef as Et } from "react";
import { cva as F } from "class-variance-authority";
import { ChevronsUpDown as Tt, Check as zt, Star as ae, Filter as re, ArrowRight as oe, Loader2 as ne, ChevronDown as se, Search as ie, X as le, LoaderCircle as de } from "lucide-react";
import { Section as H, MODIFIER_KEYS as ce, normalizeProjectId as Y, getLocalizeKeyForScrollGroupId as ue, getSectionForBook as we } from "platform-bible-utils";
import { filterAndRankItems as gt } from "@eten-tech-foundation/platform-editor";
import { Command as V } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as ft from "react-resizable-panels";
import { clsx as me } from "clsx";
import { extendTailwindMerge as fe, twMerge as pe } from "tailwind-merge";
const he = fe({ prefix: "tw" });
function ct(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function ge(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ct(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, g) => g !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, g) => g !== r), `!${s}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const s = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function be(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = ct(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = ct(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
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
  const e = me(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return he(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((u) => {
    const g = ge(u);
    r.set(g.normalized, g.original), o.push(g.normalized);
  }), pe(o.join(" ")).split(" ").filter(Boolean).map((u) => {
    const g = r.get(u);
    return g ? be(u, g) : u;
  }).join(" ");
}
const Ne = 600, La = 650, Gt = 400, ve = 450, xe = 500, ye = 550, Ra = 700, At = F(
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
function P({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...o
}) {
  const s = r ? wt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: c(At({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Dt = "layoutDirection";
function B() {
  const t = localStorage.getItem(Dt);
  return t === "rtl" ? t : "ltr";
}
function Ba(t) {
  localStorage.setItem(Dt, t);
}
function Pa({ ...t }) {
  return /* @__PURE__ */ n(_.Root, { "data-slot": "dialog", ...t });
}
function Oa({ ...t }) {
  return /* @__PURE__ */ n(_.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ie({ ...t }) {
  return /* @__PURE__ */ n(_.Portal, { "data-slot": "dialog-portal", ...t });
}
function Ma({ ...t }) {
  return /* @__PURE__ */ n(_.Close, { "data-slot": "dialog-close", ...t });
}
function ke({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    _.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: ve, ...e },
      ...a
    }
  );
}
function ja({
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
  return /* @__PURE__ */ p(Ie, { children: [
    /* @__PURE__ */ n(ke, { className: r }),
    /* @__PURE__ */ p(
      _.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: xe, ...o },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ n(_.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(P, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(qt, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function _a({ className: t, ...e }) {
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
function $a({
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
        e && /* @__PURE__ */ n(_.Close, { asChild: !0, children: /* @__PURE__ */ n(P, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ha({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    _.Title,
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
function Fa({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    _.Description,
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
function Ce({ className: t, type: e, ...a }) {
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
function Se({ className: t, ...e }) {
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
const Ee = F(
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
function Te({
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
        className: c(Ee({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
F("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Lt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    V,
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
function Rt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const o = B(), s = z.useCallback(
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
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ p(Se, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        V.Input,
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
      /* @__PURE__ */ n(Te, { children: /* @__PURE__ */ n(Zt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Bt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    V.List,
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
function Pt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    V.Empty,
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
function Ot({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    V.Group,
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
function ze({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    V.Separator,
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
function Mt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    V.Item,
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
        /* @__PURE__ */ n(mt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ka({ className: t, ...e }) {
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
const Ge = [
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
], Ae = (t) => {
  var e;
  return ((e = Ge[t]) == null ? void 0 : e.chapters) ?? -1;
}, De = G.allBookIds.filter(
  (t) => !G.isObsolete(G.bookIdToNumber(t))
);
function Le(t) {
  const e = [], a = Math.min(t.length, G.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(G.bookNumberToId(r + 1));
  return e;
}
function y(t) {
  return `%scrollGroup_${t}%`;
}
const Re = {
  [y("undefined")]: "Ø",
  [y(0)]: "A",
  [y(1)]: "B",
  [y(2)]: "C",
  [y(3)]: "D",
  [y(4)]: "E",
  [y(5)]: "F",
  [y(6)]: "G",
  [y(7)]: "H",
  [y(8)]: "I",
  [y(9)]: "J",
  [y(10)]: "K",
  [y(11)]: "L",
  [y(12)]: "M",
  [y(13)]: "N",
  [y(14)]: "O",
  [y(15)]: "P",
  [y(16)]: "Q",
  [y(17)]: "R",
  [y(18)]: "S",
  [y(19)]: "T",
  [y(20)]: "U",
  [y(21)]: "V",
  [y(22)]: "W",
  [y(23)]: "X",
  [y(24)]: "Y",
  [y(25)]: "Z"
};
function pt(t, e) {
  return Ae(G.bookIdToNumber(t));
}
function nt(t, e, a) {
  const r = G.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = G.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (o = i, s = l);
  }), o;
}
function Va(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = nt(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(pt(s), 1),
      verseNum: 1
    };
}
function Ja(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < pt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = nt(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ua(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = nt(r, e, "previous");
  if (!i) return;
  const l = Math.max(pt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Xa(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = nt(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Wa(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const qa = (t, e, a, r, o) => {
  switch (t) {
    case H.OT:
      return e ?? "Old Testament";
    case H.NT:
      return a ?? "New Testament";
    case H.DC:
      return r ?? "Deuterocanon";
    case H.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Za = (t, e, a, r, o) => {
  switch (t) {
    case H.OT:
      return e ?? "OT";
    case H.NT:
      return a ?? "NT";
    case H.DC:
      return r ?? "DC";
    case H.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ya(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? G.bookIdToEnglishName(t);
}
function Be(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const Qa = Object.fromEntries(
  De.map((t) => [t, G.bookIdToEnglishName(t)])
);
function tr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = G.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(o.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function jt({ ...t }) {
  return /* @__PURE__ */ n(Z.Root, { "data-slot": "popover", ...t });
}
function ut({ ...t }) {
  return /* @__PURE__ */ n(Z.Trigger, { "data-slot": "popover-trigger", ...t });
}
const _t = z.createContext(null);
function er({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(_t.Provider, { value: t, children: e });
}
function $t({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = B(), i = z.useContext(_t);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(Z.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      Z.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ne, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function ar({ ...t }) {
  return /* @__PURE__ */ n(Z.Anchor, { "data-slot": "popover-anchor", ...t });
}
function rr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function or({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function bt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    X.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ht({ ...t }) {
  return /* @__PURE__ */ n(X.Root, { "data-slot": "tooltip", ...t });
}
function Ft({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    X.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(At({ variant: e }), t) : t,
      ...a
    }
  );
}
function Kt({
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
  return /* @__PURE__ */ n(X.Portal, { children: /* @__PURE__ */ p(
    X.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: ye, ...a },
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ n(
          X.Arrow,
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
function Pe() {
  const [t, e] = j(!1), a = ot(null), r = $(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = $(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Xt.Root,
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
function ir({
  className: t,
  ...e
}) {
  const a = B();
  return /* @__PURE__ */ n(
    dt.Root,
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
function lr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    dt.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        dt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Oe = F(
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
), Vt = z.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function dr({
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
    Ct.Root,
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
        Vt.Provider,
        {
          value: z.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: o }),
            [e, a, r, o]
          ),
          children: s
        }
      )
    }
  );
}
function cr({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...o
}) {
  const s = z.useContext(Vt);
  return /* @__PURE__ */ n(
    Ct.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Oe({
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
function Me({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    Wt.Root,
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
const je = F(
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
function ur({
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
        je({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function wr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? wt.Root : "div";
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
function mr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    Me,
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
function fr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function pr() {
  return /Windows/i.test(navigator.userAgent);
}
const _e = ["input", "select", "textarea", "button"], $e = ["button", "textbox"], hr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = ot(null), [s, i] = j(void 0), [l, u] = j(void 0), g = $(
    (w) => {
      i(w);
      const N = t.find((v) => v.id === w);
      N && (e == null || e(N));
      const I = document.getElementById(w);
      I && (I.scrollIntoView({ block: "center" }), I.focus()), o.current && o.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), b = $(
    (w) => {
      const N = t.find((I) => I.id === w);
      N && (u((I) => I === w ? void 0 : w), a == null || a(N));
    },
    [a, t]
  ), k = (w) => {
    if (!w) return !1;
    const N = w.tagName.toLowerCase();
    if (w.isContentEditable || _e.includes(N)) return !0;
    const I = w.getAttribute("role");
    if (I && $e.includes(I)) return !0;
    const v = w.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, A = $(
    (w) => {
      var K;
      const N = w.target, I = (C) => C ? document.getElementById(C) : void 0, v = I(l), O = I(s);
      if (!!(v && N && v.contains(N) && N !== v) && k(N)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !N.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const C = t.find((d) => d.id === l);
            C && g(C.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!v) return;
          const C = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const d = C.findIndex((m) => m === N);
          if (d === -1) return;
          let f;
          w.key === "ArrowDown" ? f = Math.min(d + 1, C.length - 1) : f = Math.max(d - 1, 0), f !== d && (w.preventDefault(), w.stopPropagation(), (K = C[f]) == null || K.focus());
          return;
        }
        return;
      }
      const E = t.findIndex((C) => C.id === s);
      let T = E;
      switch (w.key) {
        case "ArrowDown":
          T = Math.min(E + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(E - 1, 0), w.preventDefault();
          break;
        case "Home":
          T = 0, w.preventDefault();
          break;
        case "End":
          T = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && b(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const C = O;
          if (C) {
            const d = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), f = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), m = d ?? f;
            if (m) {
              w.preventDefault(), m.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (k(N) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const R = t[T];
      R && g(R.id);
    },
    [t, g, s, l, b, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: A,
    /** Focus an option by its ID */
    focusOption: g
  };
}, He = F(
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
function rt({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? wt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        He({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const Jt = Qt(void 0);
function st() {
  const t = te(Jt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const it = F("", {
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
function Fe({ variant: t = "default", ...e }) {
  const a = B(), r = z.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Jt.Provider, { value: r, children: /* @__PURE__ */ n(S.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function gr({
  ...t
}) {
  return /* @__PURE__ */ n(S.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ke({
  ...t
}) {
  return /* @__PURE__ */ n(S.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ve({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const s = B();
  return /* @__PURE__ */ n(S.Portal, { children: /* @__PURE__ */ n(
    S.Content,
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
function br({ ...t }) {
  return /* @__PURE__ */ n(S.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Nr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = B(), s = st();
  return /* @__PURE__ */ n(
    S.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: s.variant })
      ),
      dir: o,
      ...r
    }
  );
}
function Nt({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const s = B(), i = st();
  return /* @__PURE__ */ p(
    S.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: i.variant })
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
            children: /* @__PURE__ */ n(S.ItemIndicator, { children: /* @__PURE__ */ n(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function vr({
  ...t
}) {
  return /* @__PURE__ */ n(S.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function xr({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = B(), s = st();
  return /* @__PURE__ */ p(
    S.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: s.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(S.ItemIndicator, { children: /* @__PURE__ */ n(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function vt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    S.Label,
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
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    S.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function yr({ className: t, ...e }) {
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
function Ir({ ...t }) {
  return /* @__PURE__ */ n(S.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function kr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = st();
  return /* @__PURE__ */ p(
    S.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(Yt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Cr({ className: t, children: e, ...a }) {
  const r = B();
  return /* @__PURE__ */ n(
    S.SubContent,
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
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const xt = `
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
function Ue(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Q(t, e) {
  const a = e ? `${xt}, ${e}` : xt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Ue(r)
  );
}
function Er({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = z.useRef(null);
  z.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), z.useEffect(() => {
    const i = o.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Q(i, '[tabindex]:not([tabindex="-1"])').forEach((b) => {
          b.setAttribute("tabindex", "-1");
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
        i.preventDefault(), Q(l)[0].focus();
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
function Tr({
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
function zr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Gr({ className: t, ...e }) {
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
function Xe(t) {
  z.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? Q(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function We(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function qe(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Ar({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...s
}) {
  const i = z.useRef(null);
  z.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), Xe(i);
  const l = z.useMemo(
    () => i.current ? Q(i.current) : [],
    [i]
  ), u = z.useCallback(
    (b) => {
      const { current: k } = i;
      if (!k || !k.parentElement) return;
      const A = k.closest("table"), w = A ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Q(A).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], N = w.indexOf(k), I = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (b.key === "ArrowDown" || b.key === "ArrowUp")
        b.preventDefault(), qe(w, N, b.key);
      else if (b.key === "ArrowLeft" || b.key === "ArrowRight")
        b.preventDefault(), We(l, I, b.key);
      else if (b.key === "Escape") {
        b.preventDefault();
        const v = k.closest("table");
        v && v.focus();
      }
      e == null || e(b);
    },
    [i, l, e]
  ), g = z.useCallback(
    (b) => {
      r && (a == null || a(b));
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
      onFocus: g,
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
function Dr({ className: t, ...e }) {
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
function Lr({ className: t, ...e }) {
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
function Rr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ze(t, e) {
  const [a, r] = j(!1);
  return St(() => {
    var u;
    const o = (u = t.current) == null ? void 0 : u.querySelector(e);
    if (!o) {
      r(!1);
      return;
    }
    const s = () => {
      r(o.scrollTop + o.clientHeight < o.scrollHeight - 1);
    };
    s(), o.addEventListener("scroll", s);
    const i = new ResizeObserver(s);
    i.observe(o);
    const l = new MutationObserver(s);
    return l.observe(o, { childList: !0, subtree: !0 }), () => {
      o.removeEventListener("scroll", s), i.disconnect(), l.disconnect();
    };
  }, [t, e]), a;
}
function Ye({ children: t }) {
  const e = ot(null), a = Ze(e, '[data-slot="command-list"]');
  return /* @__PURE__ */ p("div", { className: "tw:relative", ref: e, children: [
    t,
    a && /* @__PURE__ */ n(
      "div",
      {
        "data-slot": "command-list-scroll-cue",
        "aria-hidden": !0,
        className: "tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-6 tw:bg-gradient-to-t tw:from-popover tw:to-transparent"
      }
    )
  ] });
}
function Br({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  searchPlaceholder: o,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: g,
  isOpen: b = void 0,
  onOpenChange: k = void 0,
  isDisabled: A = !1,
  sortSelected: w = !1,
  icon: N = void 0,
  className: I = void 0,
  variant: v = "ghost",
  id: O
}) {
  const [M, J] = j(!1), E = $(
    (m) => {
      var h;
      const x = (h = t.find((D) => D.label === m)) == null ? void 0 : h.value;
      x && a(
        e.includes(x) ? e.filter((D) => D !== x) : [...e, x]
      );
    },
    [t, e, a]
  ), T = () => g || r, R = U(() => {
    if (!w) return t;
    const m = t.filter((h) => h.starred).sort((h, D) => h.label.localeCompare(D.label)), x = t.filter((h) => !h.starred).sort((h, D) => {
      const et = e.includes(h.value), ht = e.includes(D.value);
      return et && !ht ? -1 : !et && ht ? 1 : h.label.localeCompare(D.label);
    });
    return [...m, ...x];
  }, [t, e, w]), K = () => {
    a(t.map((m) => m.value));
  }, C = () => {
    a([]);
  }, d = b ?? M;
  return /* @__PURE__ */ n("div", { id: O, className: I, children: /* @__PURE__ */ p(jt, { open: d, onOpenChange: k ?? J, children: [
    /* @__PURE__ */ n(ut, { asChild: !0, children: /* @__PURE__ */ p(
      P,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": d,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: A,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            N && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: N }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: T()
              }
            )
          ] }),
          /* @__PURE__ */ n(Tt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n($t, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ n(
        Rt,
        {
          placeholder: o ?? r,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(P, { variant: "ghost", size: "sm", onClick: K, children: i }),
        /* @__PURE__ */ n(P, { variant: "ghost", size: "sm", onClick: C, children: l })
      ] }),
      /* @__PURE__ */ n(Ye, { children: /* @__PURE__ */ p(Bt, { children: [
        /* @__PURE__ */ n(Pt, { children: u }),
        /* @__PURE__ */ n(Ot, { children: R.map((m) => /* @__PURE__ */ p(
          Mt,
          {
            value: m.label,
            onSelect: E,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                zt,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(m.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              m.starred && /* @__PURE__ */ n(ae, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: m.label }),
              m.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: m.secondaryLabel })
            ]
          },
          m.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function W(t) {
  return t.replace(/^\+/, "");
}
function Qe(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = W(e).toLowerCase();
  return a === "passive" ? gt({
    query: o,
    items: r,
    filter: (s) => W(s.label).toLowerCase().startsWith(o),
    sortBy: "label"
  }) : gt({
    query: o,
    items: r,
    filter: (s) => W(s.label).toLowerCase().includes(o),
    sortBy: "label"
  });
}
function ta(t) {
  return t.isComposing || t.keyCode === 229;
}
const Ut = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, ea = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], aa = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function ra(t) {
  return [
    ...ea,
    ...aa.filter((e) => Ut[t].test(e))
  ];
}
function L(t) {
  t.preventDefault(), t.stopPropagation();
}
function Pr(t, e, a) {
  var o, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (L(t), a.commit(), "ended") : t.key === "Escape" ? (L(t), a.dismiss(), "ended") : "passed";
  if (ta(t) || ce.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((o = t.getModifierState) != null && o.call(t, "AltGraph")))
    return t.key === "Enter" && L(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return L(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return L(t), Qe(
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
    const i = W(e.filter).toLowerCase(), l = e.items.find(
      (u) => W(u.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (L(t), a.dismiss(), "ended") : (L(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (L(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (L(t), a.dismiss(), "ended") : t.key === "Backspace" || Ut[r].test(t.key) ? (L(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && L(t), a.dismiss(), "ended");
}
function Or(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function Mr(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: o,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: g,
    focusEditor: b,
    applyItem: k,
    onShowError: A
  } = t;
  o.current += 1;
  const w = o.current, N = a ? "backslash" : "selection", I = { kind: N, token: w, filter: "", items: e };
  N === "backslash" && r && (I.shouldSpaceCommit = r), s(I), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: ra(N),
    onKey: (v) => l(v)
  }).then((v) => {
    if (i(w), v !== void 0) {
      g(), b();
      const O = e.find((M) => M.marker === v);
      O && k(O);
    } else a || b();
  }).catch((v) => {
    i(w), a || b(), A(v);
  });
}
function jr({ className: t, ...e }) {
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
function _r({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function oa(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Y(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function yt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function lt(t) {
  const e = oa(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(Y(s.id)) ?? [];
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
    const s = e.get(Y(o.id));
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
        isSelected: yt(a, o.id, void 0),
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
        isSelected: yt(a, o.id, i.scrollGroupId),
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
function It(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function q(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function na(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(q) }];
  const a = t.filter(It).sort(q), r = t.filter((s) => !It(s)).sort(q);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function sa(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((l) => {
    const u = l.versificationId;
    if (u === void 0 || u === "") {
      o.push(l);
      return;
    }
    const g = l.versificationName ?? u, b = r.get(u);
    b ? (b.rows.push(l), !b.label && l.versificationName && (b.label = l.versificationName)) : r.set(u, { label: g, rows: [l] });
  });
  const s = [...r.entries()].map(([l, { label: u, rows: g }]) => ({
    id: l,
    label: u,
    rows: [...g].sort(q)
  }));
  s.sort((l, u) => l.id === e ? -1 : u.id === e ? 1 : l.label.localeCompare(u.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: l, label: u, rows: g }) => ({
    kind: "versification",
    rows: g,
    label: u,
    isPriority: l === e
  }));
  return o.length > 0 && i.push({
    kind: "versification",
    rows: [...o].sort(q),
    label: a,
    isPriority: !1
  }), i;
}
const ia = {
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
function la(t) {
  return { ...ia, ...t };
}
function tt(t) {
  return Re[ue(t)] ?? String(t);
}
const da = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ca({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = tt(t);
  return e ? /* @__PURE__ */ n(
    rt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: da,
      children: a
    }
  ) : /* @__PURE__ */ n(rt, { variant: "secondary", children: a });
}
function ua({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: s }) {
  const {
    ref: i,
    open: l,
    onPointerEnter: u,
    onPointerLeave: g
  } = Pe(), [b, k] = j(!1), A = !!(t.language || t.languageCode), w = A || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, N = l || b, I = $(() => {
    if (w) {
      k(!0);
      return;
    }
    u();
  }, [w, u]), v = $(() => {
    k(!1), g();
  }, [g]), O = /* @__PURE__ */ n(zt, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((R) => /* @__PURE__ */ n(rt, { variant: "secondary", children: tt(R) }, R)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      ca,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ p(
      P,
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
          /* @__PURE__ */ n(oe, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const J = /* @__PURE__ */ p(
    Mt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: I,
      onPointerLeave: v,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: O }),
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
        M
      ]
    }
  ), E = t.scrollGroupId !== void 0 ? tt(t.scrollGroupId) : void 0, T = t.isBoundButClosed && E ? a.boundButClosedTooltip.replace("{group}", E) : void 0;
  return /* @__PURE__ */ p(Ht, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ n(Ft, { asChild: !0, children: J }),
    /* @__PURE__ */ p(
      Kt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Gt },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          A && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && E && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              E,
              ")"
            ] })
          ] }),
          T && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: T }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function wa({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: o
}) {
  const s = !!a;
  return /* @__PURE__ */ p(Fe, { children: [
    /* @__PURE__ */ n(Ke, { asChild: !0, children: /* @__PURE__ */ n(
      P,
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
        children: /* @__PURE__ */ n(re, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ p(Ve, { align: "end", className: "tw:w-56", style: { zIndex: Gt }, children: [
      /* @__PURE__ */ n(vt, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        Nt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ p(kt, { children: [
        /* @__PURE__ */ n(Je, {}),
        /* @__PURE__ */ n(vt, { children: o.filterSectionLabel }),
        /* @__PURE__ */ n(
          Nt,
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
function $r(t) {
  const [e, a] = j(!1), [r, o] = j(""), [s, i] = j(t.defaultGroupByOpenTabs ?? !0), [l, u] = j(!1), g = ot(null), b = $((d) => {
    a(d), d || o("");
  }, []);
  St(() => {
    if (!e) return;
    const d = window.requestAnimationFrame(() => {
      const f = g.current;
      f && f.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(d);
  }, [e]);
  const k = la(t.localizedStrings), A = U(() => t.mode === "project" ? lt({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? lt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : lt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), w = U(() => {
    const d = r.trim().toLowerCase();
    let f = A;
    return d && (f = f.filter(
      (m) => m.shortName.toLowerCase().includes(d) || m.fullName.toLowerCase().includes(d) || (m.language ?? "").toLowerCase().includes(d) || (m.languageCode ?? "").toLowerCase().includes(d)
    )), t.mode === "project-multi" && l && (f = f.filter((m) => m.isSelected)), f;
  }, [A, r, t.mode, l]), N = U(
    () => t.groupByVersification ? sa(
      w,
      t.priorityVersificationId,
      k.versificationUnknownSectionHeading
    ) : na(w, s),
    [
      w,
      s,
      t.groupByVersification,
      t.priorityVersificationId,
      k.versificationUnknownSectionHeading
    ]
  ), I = U(() => {
    if (t.mode !== "project-multi") return [];
    const d = [];
    return t.projects.forEach((f) => {
      const m = t.openTabs.filter(
        (h) => Y(h.projectId) === Y(f.id)
      );
      if (m.length === 0) {
        d.push({ projectId: f.id });
        return;
      }
      const x = /* @__PURE__ */ new Set();
      m.forEach((h) => {
        x.has(h.scrollGroupId) || (x.add(h.scrollGroupId), d.push({ projectId: f.id, scrollGroupId: h.scrollGroupId }));
      });
    }), d;
  }, [t.mode, t.projects, t.openTabs]), v = (d) => {
    if (d.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
    }
  }, O = (d) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: d.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const f = t.selection.pairs, m = (h) => h.projectId === d.projectId && h.scrollGroupId === d.scrollGroupId, x = f.some(m) ? f.filter((h) => !m(h)) : [...f, { projectId: d.projectId, scrollGroupId: d.scrollGroupId }];
        t.onChangeSelection({ pairs: x }), x.length === 0 && l && u(!1);
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
        const f = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: d.projectId, scrollGroupId: f }), t.onOpenProjectInGroup(d.projectId, f), a(!1);
      }
    }
  }, M = () => {
    if (t.mode !== "project-multi") return;
    const d = t.selection.pairs, f = new Set(d.map((x) => `${x.projectId}:${x.scrollGroupId ?? ""}`)), m = [...d];
    I.forEach((x) => {
      const h = `${x.projectId}:${x.scrollGroupId ?? ""}`;
      f.has(h) || (f.add(h), m.push(x));
    }), t.onChangeSelection({ pairs: m });
  }, J = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && u(!1));
  }, E = U(() => {
    switch (t.mode) {
      case "project": {
        const d = t.projects.find((m) => m.id === t.selection.projectId);
        let f = d ? d.shortName : t.buttonPlaceholder ?? "";
        return d && t.triggerLabelFormat === "shortNameAndFullName" && d.fullName && d.fullName !== d.shortName && (f = `${d.shortName} - ${d.fullName}`), { node: f, title: f };
      }
      case "project-multi": {
        const { pairs: d } = t.selection;
        if (d.length === 0) {
          const h = t.buttonPlaceholder ?? "";
          return { node: h, title: h };
        }
        const f = [];
        if (d.forEach((h) => {
          const D = t.projects.find((et) => et.id === h.projectId);
          D && f.push({ project: D, scrollGroupId: h.scrollGroupId });
        }), f.length === 0) {
          const h = t.buttonPlaceholder ?? "";
          return { node: h, title: h };
        }
        if (t.getSelectedText) {
          const h = t.getSelectedText(f);
          return { node: h, title: h };
        }
        const m = f.map(
          ({ project: h, scrollGroupId: D }) => D === void 0 ? h.shortName : `${h.shortName} (${tt(D)})`
        ).join(", ");
        if (f.length === 1) return { node: m, title: m };
        const x = f.length.toString();
        return {
          node: /* @__PURE__ */ p(kt, { children: [
            /* @__PURE__ */ n(rt, { variant: "muted", className: "tw:shrink-0", children: x }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: m })
          ] }),
          title: `${x} ${m}`
        };
      }
      case "projectScrollGroup": {
        const d = t.projects.find((x) => x.id === t.selection.projectId);
        if (!d) {
          const x = t.buttonPlaceholder ?? "";
          return { node: x, title: x };
        }
        const f = t.selection.scrollGroupId;
        if (f === void 0)
          return { node: d.shortName, title: d.shortName };
        const m = `${d.shortName} · ${tt(f)}`;
        return { node: m, title: m };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ n(ne, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ n(Tt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ n(se, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const R = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? v : void 0, K = /* @__PURE__ */ p(
    P,
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
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof E.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: E.node }) : E.node }),
        T
      ]
    }
  ), C = E.title ? /* @__PURE__ */ n(bt, { delayDuration: 400, children: /* @__PURE__ */ p(Ht, { children: [
    /* @__PURE__ */ n(Ft, { asChild: !0, children: /* @__PURE__ */ n(ut, { asChild: !0, children: K }) }),
    /* @__PURE__ */ n(Kt, { children: E.title })
  ] }) }) : /* @__PURE__ */ n(ut, { asChild: !0, children: K });
  return /* @__PURE__ */ p(jt, { open: e, onOpenChange: b, children: [
    C,
    /* @__PURE__ */ n(
      $t,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: c("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(bt, { delayDuration: 400, children: /* @__PURE__ */ p(Lt, { shouldFilter: !1, children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Rt,
              {
                value: r,
                onValueChange: o,
                placeholder: k.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.groupByVersification && !t.hideFilterMenu && /* @__PURE__ */ n(
              wa,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? u : void 0,
                strings: k
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(P, { variant: "ghost", size: "sm", onClick: M, children: `${k.selectAll} (${I.length.toString()})` }),
            /* @__PURE__ */ n(P, { variant: "ghost", size: "sm", onClick: J, children: `${k.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ p(Bt, { children: [
            /* @__PURE__ */ n(Pt, { children: t.commandEmptyMessage ?? "No projects found" }),
            N.map((d, f) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ p(ee, { children: [
                /* @__PURE__ */ n(Ot, { heading: ma(d, k), children: d.rows.map((m) => /* @__PURE__ */ n(
                  ua,
                  {
                    row: m,
                    mode: t.mode,
                    strings: k,
                    onClick: O,
                    onOpen: R,
                    selectedRowRef: g
                  },
                  m.rowKey
                )) }),
                f < N.length - 1 && /* @__PURE__ */ n(ze, {})
              ] }, `${d.kind}:${d.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function ma(t, e) {
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
const fa = Et(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, l) => {
    const u = B();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: c("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            ie,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            Ce,
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
              onChange: (g) => e(g.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ p(
            P,
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
                /* @__PURE__ */ n(le, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
fa.displayName = "SearchBar";
const pa = 5;
function Hr(t) {
  return Le(t).filter(
    (e) => !G.isObsolete(G.bookIdToNumber(e))
  );
}
function ha(t, e) {
  return t.filter((a) => {
    try {
      return we(a) === e;
    } catch {
      return !1;
    }
  });
}
const Fr = (t, e, a) => ha(t, e).every((r) => a.includes(r));
function ga(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => G.bookIdToNumber(r) > 0).sort((r, o) => G.bookIdToNumber(r) - G.bookIdToNumber(o)).map((r) => Be(r, e));
}
function Kr(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((l) => o.has(l)))
    return a;
  const i = ga(t, r);
  if (i.length !== 0)
    return i.length <= pa ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
const ba = Et(({ className: t, ...e }, a) => /* @__PURE__ */ n(de, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
ba.displayName = "Spinner";
const Na = F(
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
function Vr({
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
        Na({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function Jr({ className: t, ...e }) {
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
function Ur({ className: t, ...e }) {
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
function Xr({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    ft.Group,
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
function at(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Wr({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    ft.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: at(t),
      minSize: at(e),
      maxSize: at(a),
      collapsedSize: at(r),
      ...o
    }
  );
}
function qr({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    ft.Separator,
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
  Er as $,
  Qa as A,
  P as B,
  Mt as C,
  Pa as D,
  cr as E,
  ur as F,
  mr as G,
  fr as H,
  Xa as I,
  Nr as J,
  rt as K,
  sr as L,
  Fe as M,
  Ke as N,
  Ve as O,
  jt as P,
  Sr as Q,
  ir as R,
  Me as S,
  bt as T,
  hr as U,
  vt as V,
  Je as W,
  Nt as X,
  Ar as Y,
  Ne as Z,
  Lr as _,
  Be as a,
  pr as a$,
  Tr as a0,
  Dr as a1,
  zr as a2,
  br as a3,
  vr as a4,
  xr as a5,
  Br as a6,
  jr as a7,
  La as a8,
  Ce as a9,
  Te as aA,
  Vr as aB,
  Ur as aC,
  Jr as aD,
  wr as aE,
  Ma as aF,
  Fa as aG,
  ke as aH,
  Ie as aI,
  Oa as aJ,
  yr as aK,
  _r as aL,
  nr as aM,
  rr as aN,
  or as aO,
  qr as aP,
  Wr as aQ,
  Xr as aR,
  ba as aS,
  Rr as aT,
  Gr as aU,
  Ra as aV,
  xe as aW,
  ve as aX,
  He as aY,
  je as aZ,
  At as a_,
  W as aa,
  ze as ab,
  Ka as ac,
  Mr as ad,
  Pr as ae,
  Or as af,
  ar as ag,
  ta as ah,
  $r as ai,
  Gt as aj,
  fa as ak,
  Hr as al,
  ha as am,
  Za as an,
  Fr as ao,
  er as ap,
  $a as aq,
  Re as ar,
  Ir as as,
  kr as at,
  gr as au,
  Cr as av,
  Jt as aw,
  st as ax,
  it as ay,
  Se as az,
  Ht as b,
  Wa as b0,
  ye as b1,
  Qe as b2,
  ra as b3,
  Ba as b4,
  Kr as b5,
  c,
  Ft as d,
  Kt as e,
  ut as f,
  Ya as g,
  $t as h,
  Lt as i,
  Bt as j,
  Ot as k,
  Ja as l,
  Ua as m,
  tr as n,
  De as o,
  qa as p,
  Rt as q,
  B as r,
  Pt as s,
  lr as t,
  Pe as u,
  ja as v,
  _a as w,
  Va as x,
  Ha as y,
  dr as z
};
//# sourceMappingURL=resizable-C55zFkCn.js.map
