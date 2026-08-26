import { jsx as n, jsxs as g, Fragment as Ct } from "react/jsx-runtime";
import { Slot as wt, Dialog as B, Popover as W, Label as Xt, RadioGroup as dt, Tooltip as K, ToggleGroup as St, Separator as Kt, DropdownMenu as z } from "radix-ui";
import { IconX as qt, IconSearch as Wt, IconCheck as ft, IconChevronRight as Zt } from "@tabler/icons-react";
import { Canon as D } from "@sillsdev/scripture";
import G, { useRef as mt, useState as _, useCallback as $, createContext as Yt, useContext as Qt, useMemo as X, useEffect as te, Fragment as ee, forwardRef as Et } from "react";
import { cva as V } from "class-variance-authority";
import { ChevronsUpDown as Tt, Check as zt, Star as ae, Filter as re, ArrowRight as oe, Loader2 as ne, ChevronDown as se, Search as ie, X as le, LoaderCircle as de } from "lucide-react";
import { includes as et, Section as J, normalizeProjectId as Z, getLocalizeKeyForScrollGroupId as ce, getSectionForBook as ue } from "platform-bible-utils";
import { Command as U } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as pt from "react-resizable-panels";
import { clsx as we } from "clsx";
import { extendTailwindMerge as fe, twMerge as me } from "tailwind-merge";
const pe = fe({ prefix: "tw" });
function ct(t) {
  const e = [];
  let r = "", a = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? a += 1 : s === "]" && (a -= 1), s === ":" && a === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function he(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ct(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((l, c) => c !== r), `-${s}`].join(":")}`, original: t };
  }
  const a = e.findIndex((s) => s.startsWith("!tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((l, c) => c !== a), `!${s}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const s = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function ge(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = ct(t);
  if (r[0] !== "tw") return t;
  const a = r.slice(1, -1), o = r[r.length - 1], s = ct(e), i = s.some((l) => l.startsWith("-tw-")), d = s.some((l) => l.startsWith("!tw-"));
  if (i && o.startsWith("-")) {
    const l = o.slice(1);
    return [...a, `-tw-${l}`].join(":");
  }
  if (d && o.startsWith("!")) {
    const l = o.slice(1);
    return [...a, `!tw-${l}`].join(":");
  }
  return [...a, `tw-${o}`].join(":");
}
function w(...t) {
  const e = we(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return pe(e);
  const r = e.split(" ").filter(Boolean), a = /* @__PURE__ */ new Map(), o = [];
  return r.forEach((l) => {
    const c = he(l);
    a.set(c.normalized, c.original), o.push(c.normalized);
  }), me(o.join(" ")).split(" ").filter(Boolean).map((l) => {
    const c = a.get(l);
    return c ? ge(l, c) : l;
  }).join(" ");
}
const be = 600, Ca = 300, Gt = 400, ve = 450, Ne = 500, xe = 550, Sa = 700, Dt = V(
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
function M({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: a = !1,
  ...o
}) {
  const s = a ? wt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: w(Dt({ variant: e, size: r, className: t })),
      ...o
    }
  );
}
const At = "layoutDirection";
function R() {
  const t = localStorage.getItem(At);
  return t === "rtl" ? t : "ltr";
}
function Ea(t) {
  localStorage.setItem(At, t);
}
function Ta({ ...t }) {
  return /* @__PURE__ */ n(B.Root, { "data-slot": "dialog", ...t });
}
function za({ ...t }) {
  return /* @__PURE__ */ n(B.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function ye({ ...t }) {
  return /* @__PURE__ */ n(B.Portal, { "data-slot": "dialog-portal", ...t });
}
function Ga({ ...t }) {
  return /* @__PURE__ */ n(B.Close, { "data-slot": "dialog-close", ...t });
}
function Ie({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    B.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: w(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: ve, ...e },
      ...r
    }
  );
}
function Da({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: a,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...s
}) {
  const i = R();
  return /* @__PURE__ */ g(ye, { children: [
    /* @__PURE__ */ n(Ie, { className: a }),
    /* @__PURE__ */ g(
      B.Content,
      {
        "data-slot": "dialog-content",
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ne, ...o },
        dir: i,
        ...s,
        children: [
          e,
          r && /* @__PURE__ */ n(B.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ g(M, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(qt, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Aa({ className: t, ...e }) {
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
function Ra({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...a
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
      ...a,
      children: [
        r,
        e && /* @__PURE__ */ n(B.Close, { asChild: !0, children: /* @__PURE__ */ n(M, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function La({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    B.Title,
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
function Ma({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    B.Description,
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
function ke({ className: t, type: e, ...r }) {
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
      ...r
    }
  );
}
function Ce({ className: t, ...e }) {
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
const Se = V(
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
function Ee({
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
        className: w(Se({ align: e }), t),
        onClick: (a) => {
          var o, s;
          a.target instanceof HTMLElement && a.target.closest("button") || (s = (o = a.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...r
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
function Rt({ className: t, ...e }) {
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
function Lt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...r
}) {
  const a = R(), o = G.useCallback(
    (s) => {
      if (e == null || e(s), s.defaultPrevented || s.key !== " " || s.currentTarget.value !== "") return;
      const i = s.currentTarget.closest("[cmdk-root]"), d = i == null ? void 0 : i.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      d && (s.preventDefault(), s.stopPropagation(), d.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ g(Ce, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        U.Input,
        {
          "data-slot": "command-input",
          className: w(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: o,
          ...r
        }
      ),
      /* @__PURE__ */ n(Ee, { children: /* @__PURE__ */ n(Wt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Mt({ className: t, ...e }) {
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
function Ot({
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
function Bt({
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
function Te({
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
function Pt({
  className: t,
  children: e,
  ...r
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
      ...r,
      children: [
        e,
        /* @__PURE__ */ n(ft, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Oa({ className: t, ...e }) {
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
const Ba = (t, e, r, a, o) => {
  switch (t) {
    case J.OT:
      return e ?? "Old Testament";
    case J.NT:
      return r ?? "New Testament";
    case J.DC:
      return a ?? "Deuterocanon";
    case J.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Pa = (t, e, r, a, o) => {
  switch (t) {
    case J.OT:
      return e ?? "OT";
    case J.NT:
      return r ?? "NT";
    case J.DC:
      return a ?? "DC";
    case J.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function ja(t, e) {
  var a;
  return ((a = e == null ? void 0 : e.get(t)) == null ? void 0 : a.localizedName) ?? D.bookIdToEnglishName(t);
}
function ze(t, e) {
  var a;
  return ((a = e == null ? void 0 : e.get(t)) == null ? void 0 : a.localizedId) ?? t.toUpperCase();
}
const Ge = D.allBookIds.filter(
  (t) => !D.isObsolete(D.bookIdToNumber(t))
), _a = Object.fromEntries(
  Ge.map((t) => [t, D.bookIdToEnglishName(t)])
);
function $a(t, e, r) {
  const a = e.trim().toLowerCase();
  if (!a) return !1;
  const o = D.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(et(o.toLowerCase(), a) || et(t.toLowerCase(), a) || (s ? et(s.localizedName.toLowerCase(), a) || et(s.localizedId.toLowerCase(), a) : !1));
}
function jt({ ...t }) {
  return /* @__PURE__ */ n(W.Root, { "data-slot": "popover", ...t });
}
function ut({ ...t }) {
  return /* @__PURE__ */ n(W.Trigger, { "data-slot": "popover-trigger", ...t });
}
const _t = G.createContext(null);
function Fa({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(_t.Provider, { value: t, children: e });
}
function $t({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: a,
  ...o
}) {
  const s = R(), i = G.useContext(_t);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(W.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      W.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: be, ...a },
        dir: s,
        ...o
      }
    ) })
  );
}
function Ha({ ...t }) {
  return /* @__PURE__ */ n(W.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Ja({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: w("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Va({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: w("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ua({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: w("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
var L = {}, it, gt;
function De() {
  return gt || (gt = 1, it = () => {
    const t = "\\ud800-\\udfff", i = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", d = "\\ufe0e\\ufe0f", l = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", c = `[${t}]`, m = `[${i}]`, h = "\\ud83c[\\udffb-\\udfff]", I = `(?:${m}|${h})`, f = `[^${t}]`, N = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", x = "[\\ud800-\\udbff][\\udc00-\\udfff]", S = "\\u200d", P = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", O = `[${l}]`, j = `${I}?`, E = `[${d}]?`, T = `(?:${S}(?:${[f, N, x].join("|")})${E + j})*`, A = E + j + T, C = `(?:${[`${f}${m}?`, m, N, x, c, O].join("|")})`;
    return new RegExp(`${P}|${h}(?=${h})|${C + A}`, "g");
  }), it;
}
var bt;
function Ae() {
  if (bt) return L;
  bt = 1;
  var t = L && L.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(L, "__esModule", { value: !0 });
  var e = t(De());
  function r(l) {
    if (typeof l != "string")
      throw new Error("A string is expected as input");
    return l.match(e.default()) || [];
  }
  L.toArray = r;
  function a(l) {
    if (typeof l != "string")
      throw new Error("Input must be a string");
    var c = l.match(e.default());
    return c === null ? 0 : c.length;
  }
  L.length = a;
  function o(l, c, m) {
    if (c === void 0 && (c = 0), typeof l != "string")
      throw new Error("Input must be a string");
    (typeof c != "number" || c < 0) && (c = 0), typeof m == "number" && m < 0 && (m = 0);
    var h = l.match(e.default());
    return h ? h.slice(c, m).join("") : "";
  }
  L.substring = o;
  function s(l, c, m) {
    if (c === void 0 && (c = 0), typeof l != "string")
      throw new Error("Input must be a string");
    var h = a(l);
    if (typeof c != "number" && (c = parseInt(c, 10)), c >= h)
      return "";
    c < 0 && (c += h);
    var I;
    typeof m > "u" ? I = h : (typeof m != "number" && (m = parseInt(m, 10)), I = m >= 0 ? m + c : c);
    var f = l.match(e.default());
    return f ? f.slice(c, I).join("") : "";
  }
  L.substr = s;
  function i(l, c, m, h) {
    if (c === void 0 && (c = 16), m === void 0 && (m = "#"), h === void 0 && (h = "right"), typeof l != "string" || typeof c != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(h) === -1)
      throw new Error("Pad position should be either left or right");
    typeof m != "string" && (m = String(m));
    var I = a(l);
    if (I > c)
      return o(l, 0, c);
    if (I < c) {
      var f = m.repeat(c - I);
      return h === "left" ? f + l : l + f;
    }
    return l;
  }
  L.limit = i;
  function d(l, c, m) {
    if (m === void 0 && (m = 0), typeof l != "string")
      throw new Error("Input must be a string");
    if (l === "")
      return c === "" ? 0 : -1;
    m = Number(m), m = isNaN(m) ? 0 : m, c = String(c);
    var h = r(l);
    if (m >= h.length)
      return c === "" ? h.length : -1;
    if (c === "")
      return m;
    var I = r(c), f = !1, N;
    for (N = m; N < h.length; N += 1) {
      for (var x = 0; x < I.length && I[x] === h[N + x]; )
        x += 1;
      if (x === I.length && I[x - 1] === h[N + x - 1]) {
        f = !0;
        break;
      }
    }
    return f ? N : -1;
  }
  return L.indexOf = d, L;
}
Ae();
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
], Le = (t) => {
  var e;
  return ((e = Re[t]) == null ? void 0 : e.chapters) ?? -1;
};
function Me(t) {
  const e = [], r = Math.min(t.length, D.allBookIds.length);
  for (let a = 0; a < r; a += 1)
    t[a] === "1" && e.push(D.bookNumberToId(a + 1));
  return e;
}
function k(t) {
  return `%scrollGroup_${t}%`;
}
const Oe = {
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
function ht(t, e) {
  return Le(D.bookIdToNumber(t));
}
function ot(t, e, r) {
  const a = D.bookIdToNumber(t);
  let o, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const d = D.bookIdToNumber(i);
    (r === "next" ? d > a && d < s : d < a && d > s) && (o = i, s = d);
  }), o;
}
function Xa(t, e, r) {
  const { book: a, chapterNum: o } = t;
  if (e.includes(a) && o > 1)
    return { book: a, chapterNum: o - 1, verseNum: 1 };
  const s = ot(a, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(ht(s), 1),
      verseNum: 1
    };
}
function Ka(t, e, r) {
  const { book: a, chapterNum: o } = t;
  if (e.includes(a) && o < ht(a))
    return { book: a, chapterNum: o + 1, verseNum: 1 };
  const s = ot(a, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function qa(t, e, r) {
  const { book: a, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(a))
    return s > 1 ? { book: a, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: a, chapterNum: 1, verseNum: 0 } : { book: a, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = ot(a, e, "previous");
  if (!i) return;
  const d = Math.max(ht(i), 1);
  return { book: i, chapterNum: d, verseNum: Math.max(1, 1) };
}
function Wa(t, e, r) {
  const { book: a, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(a))
    return { book: a, chapterNum: o, verseNum: s + 1 };
  const i = ot(a, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Za(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
function Ya({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Xt.Root,
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
function Qa({
  className: t,
  ...e
}) {
  const r = R();
  return /* @__PURE__ */ n(
    dt.Root,
    {
      "data-slot": "radio-group",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function tr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    dt.Item,
    {
      "data-slot": "radio-group-item",
      className: w(
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
function vt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    K.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ft({ ...t }) {
  return /* @__PURE__ */ n(K.Root, { "data-slot": "tooltip", ...t });
}
function Ht({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    K.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? w(Dt({ variant: e }), t) : t,
      ...r
    }
  );
}
function Jt({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: r,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: a = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: o,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ n(K.Portal, { children: /* @__PURE__ */ g(
    K.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: xe, ...r },
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        a && /* @__PURE__ */ n(
          K.Arrow,
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
const Be = V(
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
), Vt = G.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function er({
  className: t,
  variant: e,
  size: r,
  spacing: a = 0,
  orientation: o = "horizontal",
  children: s,
  ...i
}) {
  const d = R();
  return /* @__PURE__ */ n(
    St.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": r,
      "data-spacing": a,
      "data-orientation": o,
      style: { "--gap": a },
      className: w(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: d,
      ...i,
      children: /* @__PURE__ */ n(
        Vt.Provider,
        {
          value: G.useMemo(
            () => ({ variant: e, size: r, spacing: a, orientation: o }),
            [e, r, a, o]
          ),
          children: s
        }
      )
    }
  );
}
function ar({
  className: t,
  children: e,
  variant: r = "default",
  size: a = "default",
  ...o
}) {
  const s = G.useContext(Vt);
  return /* @__PURE__ */ n(
    St.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || r,
      "data-size": s.size || a,
      "data-spacing": s.spacing,
      className: w(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Be({
          variant: s.variant || r,
          size: s.size || a
        }),
        t
      ),
      ...o,
      children: e
    }
  );
}
function Pe({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...a
}) {
  return /* @__PURE__ */ n(
    Kt.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...a
    }
  );
}
const je = V(
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
function rr({
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
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        je({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function or({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const a = e ? wt.Root : "div";
  return /* @__PURE__ */ n(
    a,
    {
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function nr({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ n(
    Pe,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function sr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function ir() {
  return /Windows/i.test(navigator.userAgent);
}
const _e = ["input", "select", "textarea", "button"], $e = ["button", "textbox"], lr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: a
}) => {
  const o = mt(null), [s, i] = _(void 0), [d, l] = _(void 0), c = $(
    (f) => {
      i(f);
      const N = t.find((S) => S.id === f);
      N && (e == null || e(N));
      const x = document.getElementById(f);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), o.current && o.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), m = $(
    (f) => {
      const N = t.find((x) => x.id === f);
      N && (l((x) => x === f ? void 0 : f), r == null || r(N));
    },
    [r, t]
  ), h = (f) => {
    if (!f) return !1;
    const N = f.tagName.toLowerCase();
    if (f.isContentEditable || _e.includes(N)) return !0;
    const x = f.getAttribute("role");
    if (x && $e.includes(x)) return !0;
    const S = f.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, I = $(
    (f) => {
      var F;
      const N = f.target, x = (C) => C ? document.getElementById(C) : void 0, S = x(d), P = x(s);
      if (!!(S && N && S.contains(N) && N !== S) && h(N)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !N.isContentEditable) {
          if (d) {
            f.preventDefault(), f.stopPropagation();
            const C = t.find((u) => u.id === d);
            C && c(C.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!S) return;
          const C = Array.from(
            S.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const u = C.findIndex((b) => b === N);
          if (u === -1) return;
          let p;
          f.key === "ArrowDown" ? p = Math.min(u + 1, C.length - 1) : p = Math.max(u - 1, 0), p !== u && (f.preventDefault(), f.stopPropagation(), (F = C[p]) == null || F.focus());
          return;
        }
        return;
      }
      const E = t.findIndex((C) => C.id === s);
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
          const C = P;
          if (C) {
            const u = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), p = C.querySelector(
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
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (h(N) || (a == null || a(f.key), f.preventDefault()));
          return;
      }
      const A = t[T];
      A && c(A.id);
    },
    [t, c, s, d, m, a]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: d,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: I,
    /** Focus an option by its ID */
    focusOption: c
  };
}, Fe = V(
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
function rt({ className: t, variant: e = "default", asChild: r = !1, ...a }) {
  const o = r ? wt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Fe({ variant: e }),
        t
      ),
      ...a
    }
  );
}
const Ut = Yt(void 0);
function nt() {
  const t = Qt(Ut);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const st = V("", {
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
function He({ variant: t = "default", ...e }) {
  const r = R(), a = G.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Ut.Provider, { value: a, children: /* @__PURE__ */ n(z.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function dr({
  ...t
}) {
  return /* @__PURE__ */ n(z.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Je({
  ...t
}) {
  return /* @__PURE__ */ n(z.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ve({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  children: a,
  ...o
}) {
  const s = R();
  return /* @__PURE__ */ n(z.Portal, { children: /* @__PURE__ */ n(
    z.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: r,
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
      children: /* @__PURE__ */ n("div", { dir: s, children: a })
    }
  ) });
}
function cr({ ...t }) {
  return /* @__PURE__ */ n(z.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function ur({
  className: t,
  inset: e,
  variant: r = "default",
  ...a
}) {
  const o = R(), s = nt();
  return /* @__PURE__ */ n(
    z.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: w(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: s.variant })
      ),
      dir: o,
      ...a
    }
  );
}
function Nt({
  className: t,
  children: e,
  checked: r,
  inset: a,
  ...o
}) {
  const s = R(), i = nt();
  return /* @__PURE__ */ g(
    z.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": a,
      className: w(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: i.variant })
      ),
      checked: r,
      dir: s,
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(ft, {}) })
          }
        ),
        e
      ]
    }
  );
}
function wr({
  ...t
}) {
  return /* @__PURE__ */ n(z.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function fr({
  className: t,
  children: e,
  inset: r,
  ...a
}) {
  const o = R(), s = nt();
  return /* @__PURE__ */ g(
    z.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: w(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: s.variant })
      ),
      dir: o,
      ...a,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(ft, {}) })
          }
        ),
        e
      ]
    }
  );
}
function xt({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ n(
    z.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: w(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    z.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: w("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function mr({ className: t, ...e }) {
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
function pr({ ...t }) {
  return /* @__PURE__ */ n(z.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function hr({
  className: t,
  inset: e,
  children: r,
  ...a
}) {
  const o = nt();
  return /* @__PURE__ */ g(
    z.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: w(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: o.variant })
      ),
      ...a,
      children: [
        r,
        /* @__PURE__ */ n(Zt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function gr({ className: t, children: e, ...r }) {
  const a = R();
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
      ...r,
      children: /* @__PURE__ */ n("div", { dir: a, children: e })
    }
  );
}
function br({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: w("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const yt = `
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
function Xe(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Y(t, e) {
  const r = e ? `${yt}, ${e}` : yt;
  return Array.from(t.querySelectorAll(r)).filter(
    (a) => !a.hasAttribute("disabled") && !a.getAttribute("aria-hidden") && Xe(a)
  );
}
function vr({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...a
}) {
  const o = G.useRef(null);
  G.useEffect(() => {
    typeof r == "function" ? r(o.current) : r && "current" in r && (r.current = o.current);
  }, [r]), G.useEffect(() => {
    const i = o.current;
    if (!i) return;
    const d = () => {
      requestAnimationFrame(() => {
        Y(i, '[tabindex]:not([tabindex="-1"])').forEach((m) => {
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
        i.preventDefault(), Y(d)[0].focus();
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
            ...a
          }
        )
      }
    )
  );
}
function Nr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
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
      ...r
    }
  );
}
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: w("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function yr({ className: t, ...e }) {
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
function Ke(t) {
  G.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (a) => {
      if (e.contains(document.activeElement)) {
        if (a.key === "ArrowRight" || a.key === "ArrowLeft") {
          a.preventDefault(), a.stopPropagation();
          const o = t.current ? Y(t.current) : [], s = o.indexOf(document.activeElement), i = a.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < o.length && o[i].focus();
        }
        a.key === "Escape" && (a.preventDefault(), e.focus()), (a.key === "ArrowDown" || a.key === "ArrowUp") && a.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function qe(t, e, r) {
  let a;
  return r === "ArrowLeft" && e > 0 ? a = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (a = t[e + 1]), a ? (requestAnimationFrame(() => a.focus()), !0) : !1;
}
function We(t, e, r) {
  let a;
  return r === "ArrowDown" && e < t.length - 1 ? a = t[e + 1] : r === "ArrowUp" && e > 0 && (a = t[e - 1]), a ? (requestAnimationFrame(() => a.focus()), !0) : !1;
}
function Ir({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: a = !1,
  ref: o,
  ...s
}) {
  const i = G.useRef(null);
  G.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), Ke(i);
  const d = G.useMemo(
    () => i.current ? Y(i.current) : [],
    [i]
  ), l = G.useCallback(
    (m) => {
      const { current: h } = i;
      if (!h || !h.parentElement) return;
      const I = h.closest("table"), f = I ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Y(I).filter(
          (S) => S.tagName === "TR"
        )
      ) : [], N = f.indexOf(h), x = d.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (m.key === "ArrowDown" || m.key === "ArrowUp")
        m.preventDefault(), We(f, N, m.key);
      else if (m.key === "ArrowLeft" || m.key === "ArrowRight")
        m.preventDefault(), qe(d, x, m.key);
      else if (m.key === "Escape") {
        m.preventDefault();
        const S = h.closest("table");
        S && S.focus();
      }
      e == null || e(m);
    },
    [i, d, e]
  ), c = G.useCallback(
    (m) => {
      a && (r == null || r(m));
    },
    [a, r]
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
function kr({ className: t, ...e }) {
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
function Cr({ className: t, ...e }) {
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
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: w("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Er({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: a,
  hasToggleAllFeature: o = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: l,
  isOpen: c = void 0,
  onOpenChange: m = void 0,
  isDisabled: h = !1,
  sortSelected: I = !1,
  icon: f = void 0,
  className: N = void 0,
  variant: x = "ghost",
  id: S
}) {
  const [P, O] = _(!1), j = $(
    (p) => {
      var y;
      const b = (y = t.find((v) => v.label === p)) == null ? void 0 : y.value;
      b && r(
        e.includes(b) ? e.filter((v) => v !== b) : [...e, b]
      );
    },
    [t, e, r]
  ), E = () => l || a, T = X(() => {
    if (!I) return t;
    const p = t.filter((y) => y.starred).sort((y, v) => y.label.localeCompare(v.label)), b = t.filter((y) => !y.starred).sort((y, v) => {
      const H = e.includes(y.value), tt = e.includes(v.value);
      return H && !tt ? -1 : !H && tt ? 1 : y.label.localeCompare(v.label);
    });
    return [...p, ...b];
  }, [t, e, I]), A = () => {
    r(t.map((p) => p.value));
  }, F = () => {
    r([]);
  }, C = c ?? P;
  return /* @__PURE__ */ n("div", { id: S, className: N, children: /* @__PURE__ */ g(jt, { open: C, onOpenChange: m ?? O, children: [
    /* @__PURE__ */ n(ut, { asChild: !0, children: /* @__PURE__ */ g(
      M,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": C,
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
          /* @__PURE__ */ n(Tt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n($t, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ g(Rt, { children: [
      /* @__PURE__ */ n(Lt, { placeholder: `Search ${a.toLowerCase()}...` }),
      o && /* @__PURE__ */ g("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(M, { variant: "ghost", size: "sm", onClick: A, children: s }),
        /* @__PURE__ */ n(M, { variant: "ghost", size: "sm", onClick: F, children: i })
      ] }),
      /* @__PURE__ */ g(Mt, { children: [
        /* @__PURE__ */ n(Ot, { children: d }),
        /* @__PURE__ */ n(Bt, { children: T.map((p) => /* @__PURE__ */ g(
          Pt,
          {
            value: p.label,
            onSelect: j,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                zt,
                {
                  className: w(
                    "tw:h-4 tw:w-4",
                    e.includes(p.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              p.starred && /* @__PURE__ */ n(ae, { className: "tw:h-4 tw:w-4" }),
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
function Tr({ className: t, ...e }) {
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
function zr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: w("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function Ze() {
  const [t, e] = _(!1), r = mt(null), a = $(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = $(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: a, onPointerLeave: o };
}
function Ye(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const a = Z(r.projectId), o = e.get(a), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === r.scrollGroupId) || o.push(s) : e.set(a, [s]);
  }), e.forEach((r) => r.sort((a, o) => a.scrollGroupId - o.scrollGroupId)), e;
}
function It(t, e, r) {
  return t.some((a) => a.projectId === e && a.scrollGroupId === r);
}
function lt(t) {
  const e = Ye(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(Z(s.id)) ?? [];
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
  let r = [];
  t.mode === "project-multi" ? r = t.selection.pairs : t.selection.projectId !== void 0 && (r = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const a = [];
  return t.projects.forEach((o) => {
    const s = e.get(Z(o.id));
    if (!s || s.length === 0) {
      a.push({
        rowKey: `project:${o.id}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: It(r, o.id, void 0),
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
      a.push({
        rowKey: `tab:${o.id}:${i.scrollGroupId}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: It(r, o.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
      });
    });
  }), r.forEach((o) => {
    if (o.scrollGroupId === void 0 || a.some((i) => i.projectId === o.projectId && i.scrollGroupId === o.scrollGroupId))
      return;
    const s = t.projects.find((i) => i.id === o.projectId);
    s && a.push({
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
  }), a;
}
function kt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function q(t, e) {
  const r = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (r !== 0) return r;
  const a = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return a - o;
}
function Qe(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(q) }];
  const r = t.filter(kt).sort(q), a = t.filter((s) => !kt(s)).sort(q);
  if (r.length === 0)
    return [{ kind: "flat", rows: a }];
  const o = [{ kind: "openTabs", rows: r }];
  return a.length > 0 && o.push({ kind: "other", rows: a }), o;
}
function ta(t, e, r) {
  const a = /* @__PURE__ */ new Map(), o = [];
  t.forEach((d) => {
    const l = d.versificationId;
    if (l === void 0 || l === "") {
      o.push(d);
      return;
    }
    const c = d.versificationName ?? l, m = a.get(l);
    m ? (m.rows.push(d), !m.label && d.versificationName && (m.label = d.versificationName)) : a.set(l, { label: c, rows: [d] });
  });
  const s = [...a.entries()].map(([d, { label: l, rows: c }]) => ({
    id: d,
    label: l,
    rows: [...c].sort(q)
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
    rows: [...o].sort(q),
    label: r,
    isPriority: !1
  }), i;
}
const ea = {
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
function aa(t) {
  return { ...ea, ...t };
}
function Q(t) {
  return Oe[ce(t)] ?? String(t);
}
const ra = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function oa({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Q(t);
  return e ? /* @__PURE__ */ n(
    rt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ra,
      children: r
    }
  ) : /* @__PURE__ */ n(rt, { variant: "secondary", children: r });
}
function na({ row: t, mode: e, strings: r, onClick: a, onOpen: o, selectedRowRef: s }) {
  const {
    ref: i,
    open: d,
    onPointerEnter: l,
    onPointerLeave: c
  } = Ze(), [m, h] = _(!1), I = !!(t.language || t.languageCode), f = I || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, N = d || m, x = $(() => {
    if (f) {
      h(!0);
      return;
    }
    l();
  }, [f, l]), S = $(() => {
    h(!1), c();
  }, [c]), P = /* @__PURE__ */ n(zt, { className: w("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let O;
  e === "project" ? t.openGroups.length > 0 && (O = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((A) => /* @__PURE__ */ n(rt, { variant: "secondary", children: Q(A) }, A)) })) : t.scrollGroupId !== void 0 && (O = /* @__PURE__ */ g("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      oa,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ g(
      M,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (A) => {
          A.stopPropagation(), o(t);
        },
        onMouseDown: (A) => A.stopPropagation(),
        "aria-label": r.openButtonLabel,
        title: r.openButtonLabel,
        children: [
          /* @__PURE__ */ n(oe, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const j = /* @__PURE__ */ g(
    Pt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || a(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: x,
      onPointerLeave: S,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: P }),
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
        O
      ]
    }
  ), E = t.scrollGroupId !== void 0 ? Q(t.scrollGroupId) : void 0, T = t.isBoundButClosed && E ? r.boundButClosedTooltip.replace("{group}", E) : void 0;
  return /* @__PURE__ */ g(Ft, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ n(Ht, { asChild: !0, children: j }),
    /* @__PURE__ */ g(
      Jt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Gt },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          I && /* @__PURE__ */ g("div", { className: "tw:text-sm", children: [
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
function sa({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: r,
  onChangeShowSelectedOnly: a,
  strings: o
}) {
  const s = !!r;
  return /* @__PURE__ */ g(He, { children: [
    /* @__PURE__ */ n(Je, { asChild: !0, children: /* @__PURE__ */ n(
      M,
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
        children: /* @__PURE__ */ n(re, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ g(Ve, { align: "end", className: "tw:w-56", style: { zIndex: Gt }, children: [
      /* @__PURE__ */ n(xt, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        Nt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      a && /* @__PURE__ */ g(Ct, { children: [
        /* @__PURE__ */ n(Ue, {}),
        /* @__PURE__ */ n(xt, { children: o.filterSectionLabel }),
        /* @__PURE__ */ n(
          Nt,
          {
            checked: !!r,
            onCheckedChange: a,
            onSelect: (i) => i.preventDefault(),
            children: o.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Gr(t) {
  const [e, r] = _(!1), [a, o] = _(""), [s, i] = _(t.defaultGroupByOpenTabs ?? !0), [d, l] = _(!1), c = mt(null), m = $((u) => {
    r(u), u || o("");
  }, []);
  te(() => {
    if (!e) return;
    const u = window.requestAnimationFrame(() => {
      const p = c.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(u);
  }, [e]);
  const h = aa(t.localizedStrings), I = X(() => t.mode === "project" ? lt({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), f = X(() => {
    const u = a.trim().toLowerCase();
    let p = I;
    return u && (p = p.filter(
      (b) => b.shortName.toLowerCase().includes(u) || b.fullName.toLowerCase().includes(u) || (b.language ?? "").toLowerCase().includes(u) || (b.languageCode ?? "").toLowerCase().includes(u)
    )), t.mode === "project-multi" && d && (p = p.filter((b) => b.isSelected)), p;
  }, [I, a, t.mode, d]), N = X(
    () => t.groupByVersification ? ta(
      f,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ) : Qe(f, s),
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
        (v) => Z(v.projectId) === Z(p.id)
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
  }, [t.mode, t.projects, t.openTabs]), S = (u) => {
    if (u.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
    }
  }, P = (u) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: u.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, b = (v) => v.projectId === u.projectId && v.scrollGroupId === u.scrollGroupId, y = p.some(b) ? p.filter((v) => !b(v)) : [...p, { projectId: u.projectId, scrollGroupId: u.scrollGroupId }];
        t.onChangeSelection({ pairs: y }), y.length === 0 && d && l(!1);
        return;
      }
      case "projectScrollGroup": {
        if (u.isBoundButClosed && u.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(u.projectId, u.scrollGroupId), r(!1);
          return;
        }
        if (u.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: u.projectId,
            scrollGroupId: u.scrollGroupId
          }), r(!1);
          return;
        }
        const p = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: u.projectId, scrollGroupId: p }), t.onOpenProjectInGroup(u.projectId, p), r(!1);
      }
    }
  }, O = () => {
    if (t.mode !== "project-multi") return;
    const u = t.selection.pairs, p = new Set(u.map((y) => `${y.projectId}:${y.scrollGroupId ?? ""}`)), b = [...u];
    x.forEach((y) => {
      const v = `${y.projectId}:${y.scrollGroupId ?? ""}`;
      p.has(v) || (p.add(v), b.push(y));
    }), t.onChangeSelection({ pairs: b });
  }, j = () => {
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
          const H = t.projects.find((tt) => tt.id === v.projectId);
          H && p.push({ project: H, scrollGroupId: v.scrollGroupId });
        }), p.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        if (t.getSelectedText) {
          const v = t.getSelectedText(p);
          return { node: v, title: v };
        }
        const b = p.map(
          ({ project: v, scrollGroupId: H }) => H === void 0 ? v.shortName : `${v.shortName} (${Q(H)})`
        ).join(", ");
        if (p.length === 1) return { node: b, title: b };
        const y = p.length.toString();
        return {
          node: /* @__PURE__ */ g(Ct, { children: [
            /* @__PURE__ */ n(rt, { variant: "muted", className: "tw:shrink-0", children: y }),
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
        const b = `${u.shortName} · ${Q(p)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ n(ne, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ n(Tt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ n(se, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const A = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? S : void 0, F = /* @__PURE__ */ g(
    M,
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
  ), C = E.title ? /* @__PURE__ */ n(vt, { delayDuration: 400, children: /* @__PURE__ */ g(Ft, { children: [
    /* @__PURE__ */ n(Ht, { asChild: !0, children: /* @__PURE__ */ n(ut, { asChild: !0, children: F }) }),
    /* @__PURE__ */ n(Jt, { children: E.title })
  ] }) }) : /* @__PURE__ */ n(ut, { asChild: !0, children: F });
  return /* @__PURE__ */ g(jt, { open: e, onOpenChange: m, children: [
    C,
    /* @__PURE__ */ n(
      $t,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: w("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(vt, { delayDuration: 400, children: /* @__PURE__ */ g(Rt, { shouldFilter: !1, children: [
          /* @__PURE__ */ g("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Lt,
              {
                value: a,
                onValueChange: o,
                placeholder: h.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && !t.hideFilterMenu && /* @__PURE__ */ n(
              sa,
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
            /* @__PURE__ */ n(M, { variant: "ghost", size: "sm", onClick: O, children: `${h.selectAll} (${x.length.toString()})` }),
            /* @__PURE__ */ n(M, { variant: "ghost", size: "sm", onClick: j, children: `${h.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ g(Mt, { children: [
            /* @__PURE__ */ n(Ot, { children: t.commandEmptyMessage ?? "No projects found" }),
            N.map((u, p) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ g(ee, { children: [
                /* @__PURE__ */ n(Bt, { heading: ia(u, h), children: u.rows.map((b) => /* @__PURE__ */ n(
                  na,
                  {
                    row: b,
                    mode: t.mode,
                    strings: h,
                    onClick: P,
                    onOpen: A,
                    selectedRowRef: c
                  },
                  b.rowKey
                )) }),
                p < N.length - 1 && /* @__PURE__ */ n(Te, {})
              ] }, `${u.kind}:${u.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function ia(t, e) {
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
const la = Et(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: a, className: o, isDisabled: s = !1, id: i }, d) => {
    const l = R();
    return /* @__PURE__ */ g(
      "div",
      {
        id: i,
        className: w("tw:relative tw:@container/search", { "tw:w-full": a }, o),
        children: [
          /* @__PURE__ */ n(
            ie,
            {
              className: w(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": l === "rtl" },
                { "tw:left-3": l === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            ke,
            {
              ref: d,
              className: w(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (c) => e(c.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ g(
            M,
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
la.displayName = "SearchBar";
const da = 5;
function Dr(t) {
  return Me(t).filter(
    (e) => !D.isObsolete(D.bookIdToNumber(e))
  );
}
function ca(t, e) {
  return t.filter((r) => {
    try {
      return ue(r) === e;
    } catch {
      return !1;
    }
  });
}
const Ar = (t, e, r) => ca(t, e).every((a) => r.includes(a));
function ua(t, e) {
  return [
    ...new Set(t.map((a) => a.toUpperCase()))
  ].filter((a) => D.bookIdToNumber(a) > 0).sort((a, o) => D.bookIdToNumber(a) - D.bookIdToNumber(o)).map((a) => ze(a, e));
}
function Rr(t, e, r, a) {
  if (t.length === 0) return;
  const o = new Set(t.map((d) => d.toUpperCase())), s = new Set(e.map((d) => d.toUpperCase()));
  if (s.size > 0 && s.size === o.size && [...s].every((d) => o.has(d)))
    return r;
  const i = ua(t, a);
  if (i.length !== 0)
    return i.length <= da ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
const wa = Et(({ className: t, ...e }, r) => /* @__PURE__ */ n(de, { size: 35, className: w("tw:animate-spin", t), ...e, ref: r }));
wa.displayName = "Spinner";
function Lr({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: a,
  ...o
}) {
  return /* @__PURE__ */ n(
    pt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: w(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: a ?? e,
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...o
    }
  );
}
function at(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Mr({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: a,
  ...o
}) {
  return /* @__PURE__ */ n(
    pt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: at(t),
      minSize: at(e),
      maxSize: at(r),
      collapsedSize: at(a),
      ...o
    }
  );
}
function Or({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    pt.Separator,
    {
      "data-slot": "resizable-handle",
      className: w(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Nr as $,
  _a as A,
  M as B,
  Pt as C,
  Ta as D,
  Ht as E,
  Jt as F,
  nr as G,
  sr as H,
  ur as I,
  rt as J,
  He as K,
  Ya as L,
  Je as M,
  Ve as N,
  br as O,
  jt as P,
  lr as Q,
  Qa as R,
  Pe as S,
  er as T,
  xt as U,
  Ue as V,
  Nt as W,
  Ir as X,
  Cr as Y,
  be as Z,
  vr as _,
  ze as a,
  kr as a0,
  xr as a1,
  cr as a2,
  wr as a3,
  fr as a4,
  Er as a5,
  Tr as a6,
  Ca as a7,
  ke as a8,
  Te as a9,
  za as aA,
  mr as aB,
  zr as aC,
  Ua as aD,
  Ja as aE,
  Va as aF,
  Or as aG,
  Mr as aH,
  Lr as aI,
  wa as aJ,
  Sr as aK,
  yr as aL,
  Sa as aM,
  Ne as aN,
  ve as aO,
  Fe as aP,
  je as aQ,
  Dt as aR,
  ir as aS,
  Ze as aT,
  Za as aU,
  xe as aV,
  Ea as aW,
  Rr as aX,
  Oa as aa,
  Ha as ab,
  Gr as ac,
  Gt as ad,
  la as ae,
  Dr as af,
  ca as ag,
  Pa as ah,
  Ar as ai,
  Fa as aj,
  Ra as ak,
  Oe as al,
  pr as am,
  hr as an,
  dr as ao,
  gr as ap,
  Ut as aq,
  nt as ar,
  st as as,
  Ce as at,
  Ee as au,
  or as av,
  Ga as aw,
  Ma as ax,
  Ie as ay,
  ye as az,
  ut as b,
  w as c,
  $t as d,
  Rt as e,
  Mt as f,
  ja as g,
  Bt as h,
  qa as i,
  Wa as j,
  Ka as k,
  $a as l,
  Ge as m,
  Ba as n,
  Lt as o,
  Ot as p,
  tr as q,
  R as r,
  Da as s,
  Aa as t,
  La as u,
  ar as v,
  vt as w,
  Xa as x,
  rr as y,
  Ft as z
};
//# sourceMappingURL=resizable-CuW9HEaf.js.map
