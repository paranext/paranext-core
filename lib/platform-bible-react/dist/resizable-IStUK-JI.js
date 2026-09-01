import { jsx as n, jsxs as g, Fragment as Tt } from "react/jsx-runtime";
import { Slot as mt, Dialog as j, Popover as Y, Tooltip as q, Label as Zt, RadioGroup as ut, ToggleGroup as zt, Separator as Yt, DropdownMenu as z } from "radix-ui";
import { IconX as Qt, IconSearch as te, IconCheck as pt, IconChevronRight as ee } from "@tabler/icons-react";
import { Canon as G } from "@sillsdev/scripture";
import D, { useState as $, useRef as ht, useCallback as H, createContext as ae, useContext as re, useMemo as X, useEffect as oe, Fragment as ne, forwardRef as Dt } from "react";
import { cva as V } from "class-variance-authority";
import { ChevronsUpDown as Gt, Check as At, Star as se, Filter as ie, ArrowRight as le, Loader2 as de, ChevronDown as ce, Search as ue, X as we, LoaderCircle as fe } from "lucide-react";
import { includes as rt, Section as J, MODIFIER_KEYS as me, normalizeProjectId as Q, getLocalizeKeyForScrollGroupId as pe, getSectionForBook as he } from "platform-bible-utils";
import { filterAndRankItems as Nt } from "@eten-tech-foundation/platform-editor";
import { Command as U } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as gt from "react-resizable-panels";
import { clsx as ge } from "clsx";
import { extendTailwindMerge as be, twMerge as Ne } from "tailwind-merge";
const ve = be({ prefix: "tw" });
function wt(t) {
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
  const e = wt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((l, c) => c !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((l, c) => c !== r), `!${s}`].join(":")}`, original: t };
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
  const a = wt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = wt(e), i = s.some((l) => l.startsWith("-tw-")), d = s.some((l) => l.startsWith("!tw-"));
  if (i && o.startsWith("-")) {
    const l = o.slice(1);
    return [...r, `-tw-${l}`].join(":");
  }
  if (d && o.startsWith("!")) {
    const l = o.slice(1);
    return [...r, `!tw-${l}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
function w(...t) {
  const e = ge(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return ve(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((l) => {
    const c = xe(l);
    r.set(c.normalized, c.original), o.push(c.normalized);
  }), Ne(o.join(" ")).split(" ").filter(Boolean).map((l) => {
    const c = r.get(l);
    return c ? ye(l, c) : l;
  }).join(" ");
}
const ke = 600, Pa = 650, Rt = 400, Ie = 450, Ce = 500, Se = 550, Ba = 700, Lt = V(
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
  const s = r ? mt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: w(Lt({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Mt = "layoutDirection";
function P() {
  const t = localStorage.getItem(Mt);
  return t === "rtl" ? t : "ltr";
}
function Oa(t) {
  localStorage.setItem(Mt, t);
}
function ja({ ...t }) {
  return /* @__PURE__ */ n(j.Root, { "data-slot": "dialog", ...t });
}
function _a({ ...t }) {
  return /* @__PURE__ */ n(j.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ee({ ...t }) {
  return /* @__PURE__ */ n(j.Portal, { "data-slot": "dialog-portal", ...t });
}
function $a({ ...t }) {
  return /* @__PURE__ */ n(j.Close, { "data-slot": "dialog-close", ...t });
}
function Te({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    j.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: w(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Ie, ...e },
      ...a
    }
  );
}
function Ha({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...s
}) {
  const i = P();
  return /* @__PURE__ */ g(Ee, { children: [
    /* @__PURE__ */ n(Te, { className: r }),
    /* @__PURE__ */ g(
      j.Content,
      {
        "data-slot": "dialog-content",
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ce, ...o },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ n(j.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ g(O, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(Qt, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Fa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "dialog-header",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Ka({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "dialog-footer",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ n(j.Close, { asChild: !0, children: /* @__PURE__ */ n(O, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ja({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    j.Title,
    {
      "data-slot": "dialog-title",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function Va({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    j.Description,
    {
      "data-slot": "dialog-description",
      className: w(
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
      className: w(
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
function De({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Ge = V(
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
function Ae({
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
        className: w(Ge({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
V("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Pt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    U,
    {
      "data-slot": "command",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function Bt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const o = P(), s = D.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !a || i.key !== " " || i.currentTarget.value !== "") return;
      const d = i.currentTarget.closest("[cmdk-root]"), l = d == null ? void 0 : d.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      l && (i.preventDefault(), i.stopPropagation(), l.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ g(De, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        U.Input,
        {
          "data-slot": "command-input",
          className: w(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...r
        }
      ),
      /* @__PURE__ */ n(Ae, { children: /* @__PURE__ */ n(te, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Ot({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    U.List,
    {
      "data-slot": "command-list",
      className: w(
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
function jt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    U.Empty,
    {
      "data-slot": "command-empty",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
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
    U.Group,
    {
      "data-slot": "command-group",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Re({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    U.Separator,
    {
      "data-slot": "command-separator",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function $t({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ g(
    U.Item,
    {
      "data-slot": "command-item",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ n(pt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ua({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "command-shortcut",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
var B = {}, dt, vt;
function Le() {
  return vt || (vt = 1, dt = () => {
    const t = "\\ud800-\\udfff", i = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", d = "\\ufe0e\\ufe0f", l = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", c = `[${t}]`, m = `[${i}]`, h = "\\ud83c[\\udffb-\\udfff]", k = `(?:${m}|${h})`, f = `[^${t}]`, N = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", x = "[\\ud800-\\udbff][\\udc00-\\udfff]", I = "\\u200d", L = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", M = `[${l}]`, _ = `${k}?`, E = `[${d}]?`, T = `(?:${I}(?:${[f, N, x].join("|")})${E + _})*`, A = E + _ + T, S = `(?:${[`${f}${m}?`, m, N, x, c, M].join("|")})`;
    return new RegExp(`${L}|${h}(?=${h})|${S + A}`, "g");
  }), dt;
}
var xt;
function Me() {
  if (xt) return B;
  xt = 1;
  var t = B && B.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(B, "__esModule", { value: !0 });
  var e = t(Le());
  function a(l) {
    if (typeof l != "string")
      throw new Error("A string is expected as input");
    return l.match(e.default()) || [];
  }
  B.toArray = a;
  function r(l) {
    if (typeof l != "string")
      throw new Error("Input must be a string");
    var c = l.match(e.default());
    return c === null ? 0 : c.length;
  }
  B.length = r;
  function o(l, c, m) {
    if (c === void 0 && (c = 0), typeof l != "string")
      throw new Error("Input must be a string");
    (typeof c != "number" || c < 0) && (c = 0), typeof m == "number" && m < 0 && (m = 0);
    var h = l.match(e.default());
    return h ? h.slice(c, m).join("") : "";
  }
  B.substring = o;
  function s(l, c, m) {
    if (c === void 0 && (c = 0), typeof l != "string")
      throw new Error("Input must be a string");
    var h = r(l);
    if (typeof c != "number" && (c = parseInt(c, 10)), c >= h)
      return "";
    c < 0 && (c += h);
    var k;
    typeof m > "u" ? k = h : (typeof m != "number" && (m = parseInt(m, 10)), k = m >= 0 ? m + c : c);
    var f = l.match(e.default());
    return f ? f.slice(c, k).join("") : "";
  }
  B.substr = s;
  function i(l, c, m, h) {
    if (c === void 0 && (c = 16), m === void 0 && (m = "#"), h === void 0 && (h = "right"), typeof l != "string" || typeof c != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(h) === -1)
      throw new Error("Pad position should be either left or right");
    typeof m != "string" && (m = String(m));
    var k = r(l);
    if (k > c)
      return o(l, 0, c);
    if (k < c) {
      var f = m.repeat(c - k);
      return h === "left" ? f + l : l + f;
    }
    return l;
  }
  B.limit = i;
  function d(l, c, m) {
    if (m === void 0 && (m = 0), typeof l != "string")
      throw new Error("Input must be a string");
    if (l === "")
      return c === "" ? 0 : -1;
    m = Number(m), m = isNaN(m) ? 0 : m, c = String(c);
    var h = a(l);
    if (m >= h.length)
      return c === "" ? h.length : -1;
    if (c === "")
      return m;
    var k = a(c), f = !1, N;
    for (N = m; N < h.length; N += 1) {
      for (var x = 0; x < k.length && k[x] === h[N + x]; )
        x += 1;
      if (x === k.length && k[x - 1] === h[N + x - 1]) {
        f = !0;
        break;
      }
    }
    return f ? N : -1;
  }
  return B.indexOf = d, B;
}
Me();
const Pe = [
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
  return ((e = Pe[t]) == null ? void 0 : e.chapters) ?? -1;
}, Oe = G.allBookIds.filter(
  (t) => !G.isObsolete(G.bookIdToNumber(t))
);
function je(t) {
  const e = [], a = Math.min(t.length, G.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(G.bookNumberToId(r + 1));
  return e;
}
function C(t) {
  return `%scrollGroup_${t}%`;
}
const _e = {
  [C("undefined")]: "Ø",
  [C(0)]: "A",
  [C(1)]: "B",
  [C(2)]: "C",
  [C(3)]: "D",
  [C(4)]: "E",
  [C(5)]: "F",
  [C(6)]: "G",
  [C(7)]: "H",
  [C(8)]: "I",
  [C(9)]: "J",
  [C(10)]: "K",
  [C(11)]: "L",
  [C(12)]: "M",
  [C(13)]: "N",
  [C(14)]: "O",
  [C(15)]: "P",
  [C(16)]: "Q",
  [C(17)]: "R",
  [C(18)]: "S",
  [C(19)]: "T",
  [C(20)]: "U",
  [C(21)]: "V",
  [C(22)]: "W",
  [C(23)]: "X",
  [C(24)]: "Y",
  [C(25)]: "Z"
};
function bt(t, e) {
  return Be(G.bookIdToNumber(t));
}
function st(t, e, a) {
  const r = G.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const d = G.bookIdToNumber(i);
    (a === "next" ? d > r && d < s : d < r && d > s) && (o = i, s = d);
  }), o;
}
function Xa(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = st(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(bt(s), 1),
      verseNum: 1
    };
}
function qa(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < bt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = st(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Wa(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = st(r, e, "previous");
  if (!i) return;
  const d = Math.max(bt(i), 1);
  return { book: i, chapterNum: d, verseNum: Math.max(1, 1) };
}
function Za(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = st(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Ya(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Qa = (t, e, a, r, o) => {
  switch (t) {
    case J.OT:
      return e ?? "Old Testament";
    case J.NT:
      return a ?? "New Testament";
    case J.DC:
      return r ?? "Deuterocanon";
    case J.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, tr = (t, e, a, r, o) => {
  switch (t) {
    case J.OT:
      return e ?? "OT";
    case J.NT:
      return a ?? "NT";
    case J.DC:
      return r ?? "DC";
    case J.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function er(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? G.bookIdToEnglishName(t);
}
function $e(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const ar = Object.fromEntries(
  Oe.map((t) => [t, G.bookIdToEnglishName(t)])
);
function rr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = G.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(rt(o.toLowerCase(), r) || rt(t.toLowerCase(), r) || (s ? rt(s.localizedName.toLowerCase(), r) || rt(s.localizedId.toLowerCase(), r) : !1));
}
function Ht({ ...t }) {
  return /* @__PURE__ */ n(Y.Root, { "data-slot": "popover", ...t });
}
function ft({ ...t }) {
  return /* @__PURE__ */ n(Y.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Ft = D.createContext(null);
function or({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(Ft.Provider, { value: t, children: e });
}
function Kt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = P(), i = D.useContext(Ft);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(Y.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      Y.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ke, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function nr({ ...t }) {
  return /* @__PURE__ */ n(Y.Anchor, { "data-slot": "popover-anchor", ...t });
}
function sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: w("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function ir({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: w("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function lr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: w("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function yt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    q.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Jt({ ...t }) {
  return /* @__PURE__ */ n(q.Root, { "data-slot": "tooltip", ...t });
}
function Vt({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    q.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? w(Lt({ variant: e }), t) : t,
      ...a
    }
  );
}
function Ut({
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
  return /* @__PURE__ */ n(q.Portal, { children: /* @__PURE__ */ g(
    q.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Se, ...a },
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ n(
          q.Arrow,
          {
            className: w(
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
function He() {
  const [t, e] = $(!1), a = ht(null), r = H(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = H(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function dr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Zt.Root,
    {
      "data-slot": "label",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function cr({
  className: t,
  ...e
}) {
  const a = P();
  return /* @__PURE__ */ n(
    ut.Root,
    {
      "data-slot": "radio-group",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: a,
      ...e
    }
  );
}
function ur({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    ut.Item,
    {
      "data-slot": "radio-group-item",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        ut.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Fe = V(
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
), Xt = D.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function wr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: o = "horizontal",
  children: s,
  ...i
}) {
  const d = P();
  return /* @__PURE__ */ n(
    zt.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": o,
      style: { "--gap": r },
      className: w(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: d,
      ...i,
      children: /* @__PURE__ */ n(
        Xt.Provider,
        {
          value: D.useMemo(
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
  const s = D.useContext(Xt);
  return /* @__PURE__ */ n(
    zt.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: w(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Fe({
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
function Ke({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    Yt.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
const Je = V(
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
function mr({
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
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Je({ orientation: e }),
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
  const r = e ? mt.Root : "div";
  return /* @__PURE__ */ n(
    r,
    {
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a
    }
  );
}
function hr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    Ke,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...a
    }
  );
}
function gr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function br() {
  return /Windows/i.test(navigator.userAgent);
}
const Ve = ["input", "select", "textarea", "button"], Ue = ["button", "textbox"], Nr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = ht(null), [s, i] = $(void 0), [d, l] = $(void 0), c = H(
    (f) => {
      i(f);
      const N = t.find((I) => I.id === f);
      N && (e == null || e(N));
      const x = document.getElementById(f);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), o.current && o.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), m = H(
    (f) => {
      const N = t.find((x) => x.id === f);
      N && (l((x) => x === f ? void 0 : f), a == null || a(N));
    },
    [a, t]
  ), h = (f) => {
    if (!f) return !1;
    const N = f.tagName.toLowerCase();
    if (f.isContentEditable || Ve.includes(N)) return !0;
    const x = f.getAttribute("role");
    if (x && Ue.includes(x)) return !0;
    const I = f.getAttribute("tabindex");
    return I !== void 0 && I !== "-1";
  }, k = H(
    (f) => {
      var F;
      const N = f.target, x = (S) => S ? document.getElementById(S) : void 0, I = x(d), L = x(s);
      if (!!(I && N && I.contains(N) && N !== I) && h(N)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !N.isContentEditable) {
          if (d) {
            f.preventDefault(), f.stopPropagation();
            const S = t.find((u) => u.id === d);
            S && c(S.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!I) return;
          const S = Array.from(
            I.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const u = S.findIndex((b) => b === N);
          if (u === -1) return;
          let p;
          f.key === "ArrowDown" ? p = Math.min(u + 1, S.length - 1) : p = Math.max(u - 1, 0), p !== u && (f.preventDefault(), f.stopPropagation(), (F = S[p]) == null || F.focus());
          return;
        }
        return;
      }
      const E = t.findIndex((S) => S.id === s);
      let T = E;
      switch (f.key) {
        case "ArrowDown":
          T = Math.min(E + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(E - 1, 0), f.preventDefault();
          break;
        case "Home":
          T = 0, f.preventDefault();
          break;
        case "End":
          T = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && m(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const S = L;
          if (S) {
            const u = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), p = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), b = u ?? p;
            if (b) {
              f.preventDefault(), b.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (h(N) || (r == null || r(f.key), f.preventDefault()));
          return;
      }
      const A = t[T];
      A && c(A.id);
    },
    [t, c, s, d, m, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: d,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: k,
    /** Focus an option by its ID */
    focusOption: c
  };
}, Xe = V(
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
function nt({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? mt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Xe({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const qt = ae(void 0);
function it() {
  const t = re(qt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const lt = V("", {
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
function qe({ variant: t = "default", ...e }) {
  const a = P(), r = D.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(qt.Provider, { value: r, children: /* @__PURE__ */ n(z.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function vr({
  ...t
}) {
  return /* @__PURE__ */ n(z.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function We({
  ...t
}) {
  return /* @__PURE__ */ n(z.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ze({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const s = P();
  return /* @__PURE__ */ n(z.Portal, { children: /* @__PURE__ */ n(
    z.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: w(
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
function xr({ ...t }) {
  return /* @__PURE__ */ n(z.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function yr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = P(), s = it();
  return /* @__PURE__ */ n(
    z.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: w(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        lt({ variant: s.variant })
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
  const s = P(), i = it();
  return /* @__PURE__ */ g(
    z.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: w(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        lt({ variant: i.variant })
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
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(pt, {}) })
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
  return /* @__PURE__ */ n(z.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Ir({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = P(), s = it();
  return /* @__PURE__ */ g(
    z.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: w(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        lt({ variant: s.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(pt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function It({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    z.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: w(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
function Ye({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    z.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: w("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Cr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: w(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Sr({ ...t }) {
  return /* @__PURE__ */ n(z.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Er({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = it();
  return /* @__PURE__ */ g(
    z.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: w(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        lt({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(ee, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Tr({ className: t, children: e, ...a }) {
  const r = P();
  return /* @__PURE__ */ n(
    z.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: w(
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
function zr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: w("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
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
function Qe(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function tt(t, e) {
  const a = e ? `${Ct}, ${e}` : Ct;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Qe(r)
  );
}
function Dr({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = D.useRef(null);
  D.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), D.useEffect(() => {
    const i = o.current;
    if (!i) return;
    const d = () => {
      requestAnimationFrame(() => {
        tt(i, '[tabindex]:not([tabindex="-1"])').forEach((m) => {
          m.setAttribute("tabindex", "-1");
        });
      });
    };
    d();
    const l = new MutationObserver(() => {
      d();
    });
    return l.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      l.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: d } = o;
    if (d) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), tt(d)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === d && i.preventDefault();
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
        className: w("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: o,
            onKeyDown: s,
            className: w(
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
function Gr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: w(
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
function Ar({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: w("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Rr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: w(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function ta(t) {
  D.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? tt(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function ea(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function aa(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Lr({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...s
}) {
  const i = D.useRef(null);
  D.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), ta(i);
  const d = D.useMemo(
    () => i.current ? tt(i.current) : [],
    [i]
  ), l = D.useCallback(
    (m) => {
      const { current: h } = i;
      if (!h || !h.parentElement) return;
      const k = h.closest("table"), f = k ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tt(k).filter(
          (I) => I.tagName === "TR"
        )
      ) : [], N = f.indexOf(h), x = d.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (m.key === "ArrowDown" || m.key === "ArrowUp")
        m.preventDefault(), aa(f, N, m.key);
      else if (m.key === "ArrowLeft" || m.key === "ArrowRight")
        m.preventDefault(), ea(d, x, m.key);
      else if (m.key === "Escape") {
        m.preventDefault();
        const I = h.closest("table");
        I && I.focus();
      }
      e == null || e(m);
    },
    [i, d, e]
  ), c = D.useCallback(
    (m) => {
      r && (a == null || a(m));
    },
    [r, a]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: l,
      onFocus: c,
      className: w(
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
function Mr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "th",
    {
      "data-slot": "table-head",
      className: w(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Pr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "td",
    {
      "data-slot": "table-cell",
      className: w(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Br({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: w("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Or({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: l,
  isOpen: c = void 0,
  onOpenChange: m = void 0,
  isDisabled: h = !1,
  sortSelected: k = !1,
  icon: f = void 0,
  className: N = void 0,
  variant: x = "ghost",
  id: I
}) {
  const [L, M] = $(!1), _ = H(
    (p) => {
      var y;
      const b = (y = t.find((v) => v.label === p)) == null ? void 0 : y.value;
      b && a(
        e.includes(b) ? e.filter((v) => v !== b) : [...e, b]
      );
    },
    [t, e, a]
  ), E = () => l || r, T = X(() => {
    if (!k) return t;
    const p = t.filter((y) => y.starred).sort((y, v) => y.label.localeCompare(v.label)), b = t.filter((y) => !y.starred).sort((y, v) => {
      const K = e.includes(y.value), at = e.includes(v.value);
      return K && !at ? -1 : !K && at ? 1 : y.label.localeCompare(v.label);
    });
    return [...p, ...b];
  }, [t, e, k]), A = () => {
    a(t.map((p) => p.value));
  }, F = () => {
    a([]);
  }, S = c ?? L;
  return /* @__PURE__ */ n("div", { id: I, className: N, children: /* @__PURE__ */ g(Ht, { open: S, onOpenChange: m ?? M, children: [
    /* @__PURE__ */ n(ft, { asChild: !0, children: /* @__PURE__ */ g(
      O,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": S,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: h,
        children: [
          /* @__PURE__ */ g("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            f && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: f }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: w(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: E()
              }
            )
          ] }),
          /* @__PURE__ */ n(Gt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Kt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ g(Pt, { children: [
      /* @__PURE__ */ n(
        Bt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      o && /* @__PURE__ */ g("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: A, children: s }),
        /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: F, children: i })
      ] }),
      /* @__PURE__ */ g(Ot, { children: [
        /* @__PURE__ */ n(jt, { children: d }),
        /* @__PURE__ */ n(_t, { children: T.map((p) => /* @__PURE__ */ g(
          $t,
          {
            value: p.label,
            onSelect: _,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                At,
                {
                  className: w(
                    "tw:h-4 tw:w-4",
                    e.includes(p.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              p.starred && /* @__PURE__ */ n(se, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: p.label }),
              p.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: p.secondaryLabel })
            ]
          },
          p.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function W(t) {
  return t.replace(/^\+/, "");
}
function ra(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = W(e).toLowerCase();
  return a === "passive" ? Nt({
    query: o,
    items: r,
    filter: (s) => W(s.label).toLowerCase().startsWith(o),
    sortBy: "label"
  }) : Nt({
    query: o,
    items: r,
    filter: (s) => W(s.label).toLowerCase().includes(o),
    sortBy: "label"
  });
}
function oa(t) {
  return t.isComposing || t.keyCode === 229;
}
const Wt = {
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
    ...sa.filter((e) => Wt[t].test(e))
  ];
}
function R(t) {
  t.preventDefault(), t.stopPropagation();
}
function jr(t, e, a) {
  var o, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (R(t), a.commit(), "ended") : t.key === "Escape" ? (R(t), a.dismiss(), "ended") : "passed";
  if (oa(t) || me.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((o = t.getModifierState) != null && o.call(t, "AltGraph")))
    return t.key === "Enter" && R(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return R(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return R(t), ra(
      e.items.map((d) => ({ label: d.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return R(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return R(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    R(t);
    const i = W(e.filter).toLowerCase(), d = e.items.find(
      (l) => W(l.marker).toLowerCase() === i
    );
    return d && a.commitItem(d.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (R(t), a.dismiss(), "ended") : (R(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (R(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (R(t), a.dismiss(), "ended") : t.key === "Backspace" || Wt[r].test(t.key) ? (R(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && R(t), a.dismiss(), "ended");
}
function _r(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function $r(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: o,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: d,
    show: l,
    restoreSelectionIfLost: c,
    focusEditor: m,
    applyItem: h,
    onShowError: k
  } = t;
  o.current += 1;
  const f = o.current, N = a ? "backslash" : "selection", x = { kind: N, token: f, filter: "", items: e };
  N === "backslash" && r && (x.shouldSpaceCommit = r), s(x), l({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: ia(N),
    onKey: (I) => d(I)
  }).then((I) => {
    if (i(f), I !== void 0) {
      c(), m();
      const L = e.find((M) => M.marker === I);
      L && h(L);
    } else a || m();
  }).catch((I) => {
    i(f), a || m(), k(I);
  });
}
function Hr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd",
      className: w(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function Fr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: w("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function la(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Q(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function St(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function ct(t) {
  const e = la(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(Q(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        language: s.language,
        languageCode: s.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((d) => d.scrollGroupId),
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
    const s = e.get(Q(o.id));
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
        isSelected: St(a, o.id, void 0),
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
        isSelected: St(a, o.id, i.scrollGroupId),
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
function Et(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Z(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function da(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(Z) }];
  const a = t.filter(Et).sort(Z), r = t.filter((s) => !Et(s)).sort(Z);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function ca(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((d) => {
    const l = d.versificationId;
    if (l === void 0 || l === "") {
      o.push(d);
      return;
    }
    const c = d.versificationName ?? l, m = r.get(l);
    m ? (m.rows.push(d), !m.label && d.versificationName && (m.label = d.versificationName)) : r.set(l, { label: c, rows: [d] });
  });
  const s = [...r.entries()].map(([d, { label: l, rows: c }]) => ({
    id: d,
    label: l,
    rows: [...c].sort(Z)
  }));
  s.sort((d, l) => d.id === e ? -1 : l.id === e ? 1 : d.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: d, label: l, rows: c }) => ({
    kind: "versification",
    rows: c,
    label: l,
    isPriority: d === e
  }));
  return o.length > 0 && i.push({
    kind: "versification",
    rows: [...o].sort(Z),
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
function et(t) {
  return _e[pe(t)] ?? String(t);
}
const fa = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ma({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = et(t);
  return e ? /* @__PURE__ */ n(
    nt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: fa,
      children: a
    }
  ) : /* @__PURE__ */ n(nt, { variant: "secondary", children: a });
}
function pa({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: s }) {
  const {
    ref: i,
    open: d,
    onPointerEnter: l,
    onPointerLeave: c
  } = He(), [m, h] = $(!1), k = !!(t.language || t.languageCode), f = k || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, N = d || m, x = H(() => {
    if (f) {
      h(!0);
      return;
    }
    l();
  }, [f, l]), I = H(() => {
    h(!1), c();
  }, [c]), L = /* @__PURE__ */ n(At, { className: w("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((A) => /* @__PURE__ */ n(nt, { variant: "secondary", children: et(A) }, A)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ g("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      ma,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ g(
      O,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (A) => {
          A.stopPropagation(), o(t);
        },
        onMouseDown: (A) => A.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(le, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const _ = /* @__PURE__ */ g(
    $t,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: x,
      onPointerLeave: I,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: L }),
        /* @__PURE__ */ g(
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
  ), E = t.scrollGroupId !== void 0 ? et(t.scrollGroupId) : void 0, T = t.isBoundButClosed && E ? a.boundButClosedTooltip.replace("{group}", E) : void 0;
  return /* @__PURE__ */ g(Jt, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ n(Vt, { asChild: !0, children: _ }),
    /* @__PURE__ */ g(
      Ut,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Rt },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          k && /* @__PURE__ */ g("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ g("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && E && /* @__PURE__ */ g("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ g("span", { className: "tw:text-muted-foreground", children: [
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
function ha({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: o
}) {
  const s = !!a;
  return /* @__PURE__ */ g(qe, { children: [
    /* @__PURE__ */ n(We, { asChild: !0, children: /* @__PURE__ */ n(
      O,
      {
        variant: "ghost",
        size: "sm",
        className: w(
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
    /* @__PURE__ */ g(Ze, { align: "end", className: "tw:w-56", style: { zIndex: Rt }, children: [
      /* @__PURE__ */ n(It, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        kt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ g(Tt, { children: [
        /* @__PURE__ */ n(Ye, {}),
        /* @__PURE__ */ n(It, { children: o.filterSectionLabel }),
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
function Kr(t) {
  const [e, a] = $(!1), [r, o] = $(""), [s, i] = $(t.defaultGroupByOpenTabs ?? !0), [d, l] = $(!1), c = ht(null), m = H((u) => {
    a(u), u || o("");
  }, []);
  oe(() => {
    if (!e) return;
    const u = window.requestAnimationFrame(() => {
      const p = c.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(u);
  }, [e]);
  const h = wa(t.localizedStrings), k = X(() => t.mode === "project" ? ct({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? ct({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : ct({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), f = X(() => {
    const u = r.trim().toLowerCase();
    let p = k;
    return u && (p = p.filter(
      (b) => b.shortName.toLowerCase().includes(u) || b.fullName.toLowerCase().includes(u) || (b.language ?? "").toLowerCase().includes(u) || (b.languageCode ?? "").toLowerCase().includes(u)
    )), t.mode === "project-multi" && d && (p = p.filter((b) => b.isSelected)), p;
  }, [k, r, t.mode, d]), N = X(
    () => t.groupByVersification ? ca(
      f,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ) : da(f, s),
    [
      f,
      s,
      t.groupByVersification,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ]
  ), x = X(() => {
    if (t.mode !== "project-multi") return [];
    const u = [];
    return t.projects.forEach((p) => {
      const b = t.openTabs.filter(
        (v) => Q(v.projectId) === Q(p.id)
      );
      if (b.length === 0) {
        u.push({ projectId: p.id });
        return;
      }
      const y = /* @__PURE__ */ new Set();
      b.forEach((v) => {
        y.has(v.scrollGroupId) || (y.add(v.scrollGroupId), u.push({ projectId: p.id, scrollGroupId: v.scrollGroupId }));
      });
    }), u;
  }, [t.mode, t.projects, t.openTabs]), I = (u) => {
    if (u.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
    }
  }, L = (u) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: u.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, b = (v) => v.projectId === u.projectId && v.scrollGroupId === u.scrollGroupId, y = p.some(b) ? p.filter((v) => !b(v)) : [...p, { projectId: u.projectId, scrollGroupId: u.scrollGroupId }];
        t.onChangeSelection({ pairs: y }), y.length === 0 && d && l(!1);
        return;
      }
      case "projectScrollGroup": {
        if (u.isBoundButClosed && u.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(u.projectId, u.scrollGroupId), a(!1);
          return;
        }
        if (u.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: u.projectId,
            scrollGroupId: u.scrollGroupId
          }), a(!1);
          return;
        }
        const p = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: u.projectId, scrollGroupId: p }), t.onOpenProjectInGroup(u.projectId, p), a(!1);
      }
    }
  }, M = () => {
    if (t.mode !== "project-multi") return;
    const u = t.selection.pairs, p = new Set(u.map((y) => `${y.projectId}:${y.scrollGroupId ?? ""}`)), b = [...u];
    x.forEach((y) => {
      const v = `${y.projectId}:${y.scrollGroupId ?? ""}`;
      p.has(v) || (p.add(v), b.push(y));
    }), t.onChangeSelection({ pairs: b });
  }, _ = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), d && l(!1));
  }, E = X(() => {
    switch (t.mode) {
      case "project": {
        const u = t.projects.find((b) => b.id === t.selection.projectId);
        let p = u ? u.shortName : t.buttonPlaceholder ?? "";
        return u && t.triggerLabelFormat === "shortNameAndFullName" && u.fullName && u.fullName !== u.shortName && (p = `${u.shortName} - ${u.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: u } = t.selection;
        if (u.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        const p = [];
        if (u.forEach((v) => {
          const K = t.projects.find((at) => at.id === v.projectId);
          K && p.push({ project: K, scrollGroupId: v.scrollGroupId });
        }), p.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        if (t.getSelectedText) {
          const v = t.getSelectedText(p);
          return { node: v, title: v };
        }
        const b = p.map(
          ({ project: v, scrollGroupId: K }) => K === void 0 ? v.shortName : `${v.shortName} (${et(K)})`
        ).join(", ");
        if (p.length === 1) return { node: b, title: b };
        const y = p.length.toString();
        return {
          node: /* @__PURE__ */ g(Tt, { children: [
            /* @__PURE__ */ n(nt, { variant: "muted", className: "tw:shrink-0", children: y }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: b })
          ] }),
          title: `${y} ${b}`
        };
      }
      case "projectScrollGroup": {
        const u = t.projects.find((y) => y.id === t.selection.projectId);
        if (!u) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: u.shortName, title: u.shortName };
        const b = `${u.shortName} · ${et(p)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ n(de, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ n(Gt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ n(ce, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const A = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? I : void 0, F = /* @__PURE__ */ g(
    O,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: w(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof E.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: E.node }) : E.node }),
        T
      ]
    }
  ), S = E.title ? /* @__PURE__ */ n(yt, { delayDuration: 400, children: /* @__PURE__ */ g(Jt, { children: [
    /* @__PURE__ */ n(Vt, { asChild: !0, children: /* @__PURE__ */ n(ft, { asChild: !0, children: F }) }),
    /* @__PURE__ */ n(Ut, { children: E.title })
  ] }) }) : /* @__PURE__ */ n(ft, { asChild: !0, children: F });
  return /* @__PURE__ */ g(Ht, { open: e, onOpenChange: m, children: [
    S,
    /* @__PURE__ */ n(
      Kt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: w("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(yt, { delayDuration: 400, children: /* @__PURE__ */ g(Pt, { shouldFilter: !1, children: [
          /* @__PURE__ */ g("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Bt,
              {
                value: r,
                onValueChange: o,
                placeholder: h.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.groupByVersification && !t.hideFilterMenu && /* @__PURE__ */ n(
              ha,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? d : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? l : void 0,
                strings: h
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ g("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: M, children: `${h.selectAll} (${x.length.toString()})` }),
            /* @__PURE__ */ n(O, { variant: "ghost", size: "sm", onClick: _, children: `${h.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ g(Ot, { children: [
            /* @__PURE__ */ n(jt, { children: t.commandEmptyMessage ?? "No projects found" }),
            N.map((u, p) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ g(ne, { children: [
                /* @__PURE__ */ n(_t, { heading: ga(u, h), children: u.rows.map((b) => /* @__PURE__ */ n(
                  pa,
                  {
                    row: b,
                    mode: t.mode,
                    strings: h,
                    onClick: L,
                    onOpen: A,
                    selectedRowRef: c
                  },
                  b.rowKey
                )) }),
                p < N.length - 1 && /* @__PURE__ */ n(Re, {})
              ] }, `${u.kind}:${u.label ?? ""}`)
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
const ba = Dt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, d) => {
    const l = P();
    return /* @__PURE__ */ g(
      "div",
      {
        id: i,
        className: w("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            ue,
            {
              className: w(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": l === "rtl" },
                { "tw:left-3": l === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            ze,
            {
              ref: d,
              className: w(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: (c) => e(c.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ g(
            O,
            {
              variant: "ghost",
              size: "icon",
              className: w(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": l === "rtl" },
                { "tw:right-0": l === "ltr" }
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
  return je(t).filter(
    (e) => !G.isObsolete(G.bookIdToNumber(e))
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
const Vr = (t, e, a) => va(t, e).every((r) => a.includes(r));
function xa(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => G.bookIdToNumber(r) > 0).sort((r, o) => G.bookIdToNumber(r) - G.bookIdToNumber(o)).map((r) => $e(r, e));
}
function Ur(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((d) => d.toUpperCase())), s = new Set(e.map((d) => d.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((d) => o.has(d)))
    return a;
  const i = xa(t, r);
  if (i.length !== 0)
    return i.length <= Na ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
const ya = Dt(({ className: t, ...e }, a) => /* @__PURE__ */ n(fe, { size: 35, className: w("tw:animate-spin", t), ...e, ref: a }));
ya.displayName = "Spinner";
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
    gt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: w(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...o
    }
  );
}
function ot(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function qr({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    gt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: ot(t),
      minSize: ot(e),
      maxSize: ot(a),
      collapsedSize: ot(r),
      ...o
    }
  );
}
function Wr({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    gt.Separator,
    {
      "data-slot": "resizable-handle",
      className: w(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Dr as $,
  ar as A,
  O as B,
  $t as C,
  ja as D,
  mr as E,
  hr as F,
  gr as G,
  yr as H,
  Za as I,
  nt as J,
  qe as K,
  dr as L,
  We as M,
  Ze as N,
  zr as O,
  Ht as P,
  Nr as Q,
  cr as R,
  Ke as S,
  yt as T,
  It as U,
  Ye as V,
  kt as W,
  ke as X,
  Lr as Y,
  Oe as Z,
  Pr as _,
  $e as a,
  ra as a$,
  Gr as a0,
  Mr as a1,
  Ar as a2,
  xr as a3,
  kr as a4,
  Ir as a5,
  Or as a6,
  Hr as a7,
  Pa as a8,
  ze as a9,
  Ae as aA,
  pr as aB,
  $a as aC,
  Va as aD,
  Te as aE,
  Ee as aF,
  _a as aG,
  Cr as aH,
  Fr as aI,
  lr as aJ,
  sr as aK,
  ir as aL,
  Wr as aM,
  qr as aN,
  Xr as aO,
  ya as aP,
  Br as aQ,
  Rr as aR,
  Ba as aS,
  Ce as aT,
  Ie as aU,
  Xe as aV,
  Je as aW,
  Lt as aX,
  br as aY,
  Ya as aZ,
  Se as a_,
  W as aa,
  Re as ab,
  Ua as ac,
  $r as ad,
  jr as ae,
  _r as af,
  nr as ag,
  oa as ah,
  Kr as ai,
  Rt as aj,
  ba as ak,
  Jr as al,
  va as am,
  tr as an,
  Vr as ao,
  or as ap,
  Ka as aq,
  _e as ar,
  Sr as as,
  Er as at,
  vr as au,
  Tr as av,
  qt as aw,
  it as ax,
  lt as ay,
  De as az,
  Jt as b,
  ia as b0,
  Oa as b1,
  Ur as b2,
  w as c,
  Vt as d,
  Ut as e,
  ft as f,
  er as g,
  Kt as h,
  Pt as i,
  Ot as j,
  _t as k,
  qa as l,
  Wa as m,
  rr as n,
  Qa as o,
  Bt as p,
  jt as q,
  P as r,
  ur as s,
  Ha as t,
  He as u,
  Fa as v,
  Ja as w,
  Xa as x,
  wr as y,
  fr as z
};
//# sourceMappingURL=resizable-IStUK-JI.js.map
