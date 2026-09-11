import { jsx as o, jsxs as f, Fragment as Zt } from "react/jsx-runtime";
import { Slot as ft, Dialog as B, Popover as Q, Tooltip as Z, Label as qt, RadioGroup as ut, ToggleGroup as Et, Separator as Yt, DropdownMenu as C } from "radix-ui";
import { IconX as Qt, IconSearch as te, IconCheck as ht, IconChevronRight as ee } from "@tabler/icons-react";
import { Canon as j } from "@sillsdev/scripture";
import G, { useState as H, useRef as nt, useCallback as $, createContext as ae, useContext as re, useMemo as W, useEffect as Nt, Fragment as oe, forwardRef as _t } from "react";
import { cva as U } from "class-variance-authority";
import { ChevronsUpDown as Tt, Check as Ct, Star as ne, Filter as se, ArrowRight as ie, Loader2 as le, ChevronDown as de, Search as ce, X as ue, AlertTriangle as we, LoaderCircle as pe } from "lucide-react";
import { Section as K, MODIFIER_KEYS as me, normalizeProjectId as tt, getLocalizeKeyForScrollGroupId as fe, getSectionForBook as he } from "platform-bible-utils";
import { filterAndRankItems as vt } from "@eten-tech-foundation/platform-editor";
import { Command as J } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as gt from "react-resizable-panels";
import { clsx as ge } from "clsx";
import { extendTailwindMerge as be, twMerge as Ne } from "tailwind-merge";
const ve = be({ prefix: "tw" });
function wt(t) {
  const e = [];
  let a = "", r = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
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
    return { normalized: `tw:${[...e.filter((u, m) => m !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== r), `!${s}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const s = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function ye(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = wt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), n = a[a.length - 1], s = wt(e), i = s.some((u) => u.startsWith("-tw-")), d = s.some((u) => u.startsWith("!tw-"));
  if (i && n.startsWith("-")) {
    const u = n.slice(1);
    return [...r, `-tw-${u}`].join(":");
  }
  if (d && n.startsWith("!")) {
    const u = n.slice(1);
    return [...r, `!tw-${u}`].join(":");
  }
  return [...r, `tw-${n}`].join(":");
}
function c(...t) {
  const e = ge(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return ve(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
  return a.forEach((u) => {
    const m = xe(u);
    r.set(m.normalized, m.original), n.push(m.normalized);
  }), Ne(n.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = r.get(u);
    return m ? ye(u, m) : u;
  }).join(" ");
}
const zt = 600, Ja = 650, Xa = 400, Se = 450, ke = 500, Ie = 550, Wa = 650, Za = 700, qa = 800, Gt = U(
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
function D({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...n
}) {
  const s = r ? ft.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: c(Gt({ variant: e, size: a, className: t })),
      ...n
    }
  );
}
const jt = "layoutDirection";
function A() {
  const t = localStorage.getItem(jt);
  return t === "rtl" ? t : "ltr";
}
function Ya(t) {
  localStorage.setItem(jt, t);
}
function Qa({ ...t }) {
  return /* @__PURE__ */ o(B.Root, { "data-slot": "dialog", ...t });
}
function tr({ ...t }) {
  return /* @__PURE__ */ o(B.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ee({ ...t }) {
  return /* @__PURE__ */ o(B.Portal, { "data-slot": "dialog-portal", ...t });
}
function er({ ...t }) {
  return /* @__PURE__ */ o(B.Close, { "data-slot": "dialog-close", ...t });
}
function _e({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    B.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Se, ...e },
      ...a
    }
  );
}
function ar({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...s
}) {
  const i = A();
  return /* @__PURE__ */ f(Ee, { children: [
    /* @__PURE__ */ o(_e, { className: r }),
    /* @__PURE__ */ f(
      B.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ke, ...n },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ o(B.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ f(D, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Qt, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function rr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function or({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ f(
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
        e && /* @__PURE__ */ o(B.Close, { asChild: !0, children: /* @__PURE__ */ o(D, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    B.Title,
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
function sr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    B.Description,
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
function Te({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ o(
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
function Ce({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const ze = U(
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
function Ge({
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
    /* @__PURE__ */ o(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: c(ze({ align: e }), t),
        onClick: (r) => {
          var n, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
U("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
  return /* @__PURE__ */ o(
    J,
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
function At({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const n = A(), s = G.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !a || i.key !== " " || i.currentTarget.value !== "") return;
      const d = i.currentTarget.closest("[cmdk-root]"), u = d == null ? void 0 : d.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (i.preventDefault(), i.stopPropagation(), u.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ f(Ce, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        J.Input,
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
      /* @__PURE__ */ o(Ge, { children: /* @__PURE__ */ o(te, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Rt({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    J.List,
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
function Dt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    J.Empty,
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
function Pt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    J.Group,
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
function je({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    J.Separator,
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
function Ot({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ f(
    J.Item,
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
        /* @__PURE__ */ o(ht, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function ir({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const Le = [
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
  return ((e = Le[t]) == null ? void 0 : e.chapters) ?? -1;
}, Re = j.allBookIds.filter(
  (t) => !j.isObsolete(j.bookIdToNumber(t))
);
function De(t) {
  const e = [], a = Math.min(t.length, j.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(j.bookNumberToId(r + 1));
  return e;
}
function v(t) {
  return `%scrollGroup_${t}%`;
}
const Pe = {
  [v("undefined")]: "Ø",
  [v(0)]: "A",
  [v(1)]: "B",
  [v(2)]: "C",
  [v(3)]: "D",
  [v(4)]: "E",
  [v(5)]: "F",
  [v(6)]: "G",
  [v(7)]: "H",
  [v(8)]: "I",
  [v(9)]: "J",
  [v(10)]: "K",
  [v(11)]: "L",
  [v(12)]: "M",
  [v(13)]: "N",
  [v(14)]: "O",
  [v(15)]: "P",
  [v(16)]: "Q",
  [v(17)]: "R",
  [v(18)]: "S",
  [v(19)]: "T",
  [v(20)]: "U",
  [v(21)]: "V",
  [v(22)]: "W",
  [v(23)]: "X",
  [v(24)]: "Y",
  [v(25)]: "Z"
};
function bt(t, e) {
  return Ae(j.bookIdToNumber(t));
}
function it(t, e, a) {
  const r = j.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const d = j.bookIdToNumber(i);
    (a === "next" ? d > r && d < s : d < r && d > s) && (n = i, s = d);
  }), n;
}
function lr(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const s = it(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(bt(s), 1),
      verseNum: 1
    };
}
function dr(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < bt(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const s = it(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function cr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
  if (e === void 0) return;
  const i = it(r, e, "previous");
  if (!i) return;
  const d = Math.max(bt(i), 1);
  return { book: i, chapterNum: d, verseNum: Math.max(1, 1) };
}
function ur(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: s + 1 };
  const i = it(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function wr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const pr = (t, e, a, r, n) => {
  switch (t) {
    case K.OT:
      return e ?? "Old Testament";
    case K.NT:
      return a ?? "New Testament";
    case K.DC:
      return r ?? "Deuterocanon";
    case K.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, mr = (t, e, a, r, n) => {
  switch (t) {
    case K.OT:
      return e ?? "OT";
    case K.NT:
      return a ?? "NT";
    case K.DC:
      return r ?? "DC";
    case K.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function fr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? j.bookIdToEnglishName(t);
}
function Oe(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const hr = Object.fromEntries(
  Re.map((t) => [t, j.bookIdToEnglishName(t)])
);
function gr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = j.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function Bt({ ...t }) {
  return /* @__PURE__ */ o(Q.Root, { "data-slot": "popover", ...t });
}
function pt({ ...t }) {
  return /* @__PURE__ */ o(Q.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Mt = G.createContext(null);
function br({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ o(Mt.Provider, { value: t, children: e });
}
function Ht({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...n
}) {
  const s = A(), i = G.useContext(Mt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Q.Portal, { container: i ?? void 0, children: /* @__PURE__ */ o(
      Q.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: zt, ...r },
        dir: s,
        ...n
      }
    ) })
  );
}
function Nr({ ...t }) {
  return /* @__PURE__ */ o(Q.Anchor, { "data-slot": "popover-anchor", ...t });
}
function vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function xt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    Z.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function $t({ ...t }) {
  return /* @__PURE__ */ o(Z.Root, { "data-slot": "tooltip", ...t });
}
function Ut({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    Z.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(Gt({ variant: e }), t) : t,
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
  arrowClassName: n,
  children: s,
  ...i
}) {
  return /* @__PURE__ */ o(Z.Portal, { children: /* @__PURE__ */ f(
    Z.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Ie, ...a },
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ o(
          Z.Arrow,
          {
            className: c(
              "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
              "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
              "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
              n
            )
          }
        )
      ]
    }
  ) });
}
function Be() {
  const [t, e] = H(!1), a = nt(null), r = $(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), n = $(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: n };
}
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    qt.Root,
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
function kr({
  className: t,
  ...e
}) {
  const a = A();
  return /* @__PURE__ */ o(
    ut.Root,
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
function Ir({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    ut.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        ut.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Me = U(
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
), Ft = G.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Er({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: n = "horizontal",
  children: s,
  ...i
}) {
  const d = A();
  return /* @__PURE__ */ o(
    Et.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": n,
      style: { "--gap": r },
      className: c(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: d,
      ...i,
      children: /* @__PURE__ */ o(
        Ft.Provider,
        {
          value: G.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: n }),
            [e, a, r, n]
          ),
          children: s
        }
      )
    }
  );
}
function _r({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...n
}) {
  const s = G.useContext(Ft);
  return /* @__PURE__ */ o(
    Et.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Me({
          variant: s.variant || a,
          size: s.size || r
        }),
        t
      ),
      ...n,
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
  return /* @__PURE__ */ o(
    Yt.Root,
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
const $e = U(
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
function Tr({
  className: t,
  orientation: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        $e({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Cr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? ft.Root : "div";
  return /* @__PURE__ */ o(
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
function zr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ o(
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
function Gr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function jr() {
  return /Windows/i.test(navigator.userAgent);
}
const Ue = ["input", "select", "textarea", "button"], Ke = ["button", "textbox"], Lr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const n = nt(null), [s, i] = H(void 0), [d, u] = H(void 0), m = $(
    (w) => {
      i(w);
      const b = t.find((g) => g.id === w);
      b && (e == null || e(b));
      const x = document.getElementById(w);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), n.current && n.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), h = $(
    (w) => {
      const b = t.find((x) => x.id === w);
      b && (u((x) => x === w ? void 0 : w), a == null || a(b));
    },
    [a, t]
  ), S = (w) => {
    if (!w) return !1;
    const b = w.tagName.toLowerCase();
    if (w.isContentEditable || Ue.includes(b)) return !0;
    const x = w.getAttribute("role");
    if (x && Ke.includes(x)) return !0;
    const g = w.getAttribute("tabindex");
    return g !== void 0 && g !== "-1";
  }, E = $(
    (w) => {
      var F;
      const b = w.target, x = (k) => k ? document.getElementById(k) : void 0, g = x(d), z = x(s);
      if (!!(g && b && g.contains(b) && b !== g) && S(b)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !b.isContentEditable) {
          if (d) {
            w.preventDefault(), w.stopPropagation();
            const k = t.find((R) => R.id === d);
            k && m(k.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!g) return;
          const k = Array.from(
            g.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (k.length === 0) return;
          const R = k.findIndex((p) => p === b);
          if (R === -1) return;
          let l;
          w.key === "ArrowDown" ? l = Math.min(R + 1, k.length - 1) : l = Math.max(R - 1, 0), l !== R && (w.preventDefault(), w.stopPropagation(), (F = k[l]) == null || F.focus());
          return;
        }
        return;
      }
      const O = t.findIndex((k) => k.id === s);
      let I = O;
      switch (w.key) {
        case "ArrowDown":
          I = Math.min(O + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          I = Math.max(O - 1, 0), w.preventDefault();
          break;
        case "Home":
          I = 0, w.preventDefault();
          break;
        case "End":
          I = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && h(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const k = z;
          if (k) {
            const R = k.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), l = k.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), p = R ?? l;
            if (p) {
              w.preventDefault(), p.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (S(b) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const X = t[I];
      X && m(X.id);
    },
    [t, m, s, d, h, r]
  );
  return {
    listboxRef: n,
    activeId: s,
    selectedId: d,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: E,
    /** Focus an option by its ID */
    focusOption: m
  };
}, Fe = U(
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
function st({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const n = a ? ft.Root : "span";
  return /* @__PURE__ */ o(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Fe({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const Vt = ae(void 0);
function lt() {
  const t = re(Vt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const dt = U("", {
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
function Ve({ variant: t = "default", ...e }) {
  const a = A(), r = G.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Vt.Provider, { value: r, children: /* @__PURE__ */ o(C.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function Ar({
  ...t
}) {
  return /* @__PURE__ */ o(C.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Je({
  ...t
}) {
  return /* @__PURE__ */ o(C.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Xe({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...n
}) {
  const s = A();
  return /* @__PURE__ */ o(C.Portal, { children: /* @__PURE__ */ o(
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
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...n,
      children: /* @__PURE__ */ o("div", { dir: s, children: r })
    }
  ) });
}
function Rr({ ...t }) {
  return /* @__PURE__ */ o(C.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Dr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const n = A(), s = lt();
  return /* @__PURE__ */ o(
    C.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        dt({ variant: s.variant })
      ),
      dir: n,
      ...r
    }
  );
}
function Pr({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...n
}) {
  const s = A(), i = lt();
  return /* @__PURE__ */ f(
    C.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        dt({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ o(C.ItemIndicator, { children: /* @__PURE__ */ o(ht, {}) })
          }
        ),
        e
      ]
    }
  );
}
function We({
  ...t
}) {
  return /* @__PURE__ */ o(C.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function yt({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const n = A(), s = lt();
  return /* @__PURE__ */ f(
    C.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        dt({ variant: s.variant })
      ),
      dir: n,
      ...r,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(C.ItemIndicator, { children: /* @__PURE__ */ o(ht, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ze({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ o(
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
function qe({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    C.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Or({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Br({ ...t }) {
  return /* @__PURE__ */ o(C.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Mr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const n = lt();
  return /* @__PURE__ */ f(
    C.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        dt({ variant: n.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ o(ee, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Hr({ className: t, children: e, ...a }) {
  const r = A();
  return /* @__PURE__ */ o(
    C.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...a,
      children: /* @__PURE__ */ o("div", { dir: r, children: e })
    }
  );
}
function $r({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const St = `
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
function Ye(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function et(t, e) {
  const a = e ? `${St}, ${e}` : St;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Ye(r)
  );
}
function Ur({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const n = G.useRef(null);
  G.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), G.useEffect(() => {
    const i = n.current;
    if (!i) return;
    const d = () => {
      requestAnimationFrame(() => {
        et(i, '[tabindex]:not([tabindex="-1"])').forEach((h) => {
          h.setAttribute("tabindex", "-1");
        });
      });
    };
    d();
    const u = new MutationObserver(() => {
      d();
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
    const { current: d } = n;
    if (d) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), et(d)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === d && i.preventDefault();
    }
  };
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ o(
      "div",
      {
        "data-slot": "table-container",
        className: c("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
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
function Kr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ o(
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
function Fr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Qe(t) {
  G.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const n = t.current ? et(t.current) : [], s = n.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < n.length && n[i].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
function ta(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ea(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Jr({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: n,
  ...s
}) {
  const i = G.useRef(null);
  G.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), Qe(i);
  const d = G.useMemo(
    () => i.current ? et(i.current) : [],
    [i]
  ), u = G.useCallback(
    (h) => {
      const { current: S } = i;
      if (!S || !S.parentElement) return;
      const E = S.closest("table"), w = E ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        et(E).filter(
          (g) => g.tagName === "TR"
        )
      ) : [], b = w.indexOf(S), x = d.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (h.key === "ArrowDown" || h.key === "ArrowUp")
        h.preventDefault(), ea(w, b, h.key);
      else if (h.key === "ArrowLeft" || h.key === "ArrowRight")
        h.preventDefault(), ta(d, x, h.key);
      else if (h.key === "Escape") {
        h.preventDefault();
        const g = S.closest("table");
        g && g.focus();
      }
      e == null || e(h);
    },
    [i, d, e]
  ), m = G.useCallback(
    (h) => {
      r && (a == null || a(h));
    },
    [r, a]
  );
  return /* @__PURE__ */ o(
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
function Xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Wr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Zr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function qr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: n = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: u,
  isOpen: m = void 0,
  onOpenChange: h = void 0,
  isDisabled: S = !1,
  sortSelected: E = !1,
  icon: w = void 0,
  className: b = void 0,
  variant: x = "ghost",
  id: g
}) {
  const [z, M] = H(!1), P = $(
    (l) => {
      var N;
      const p = (N = t.find((y) => y.label === l)) == null ? void 0 : N.value;
      p && a(
        e.includes(p) ? e.filter((y) => y !== p) : [...e, p]
      );
    },
    [t, e, a]
  ), O = () => u || r, I = W(() => {
    if (!E) return t;
    const l = t.filter((N) => N.starred).sort((N, y) => N.label.localeCompare(y.label)), p = t.filter((N) => !N.starred).sort((N, y) => {
      const _ = e.includes(N.value), T = e.includes(y.value);
      return _ && !T ? -1 : !_ && T ? 1 : N.label.localeCompare(y.label);
    });
    return [...l, ...p];
  }, [t, e, E]), X = () => {
    a(t.map((l) => l.value));
  }, F = () => {
    a([]);
  }, k = m ?? z;
  return /* @__PURE__ */ o("div", { id: g, className: b, children: /* @__PURE__ */ f(Bt, { open: k, onOpenChange: h ?? M, children: [
    /* @__PURE__ */ o(pt, { asChild: !0, children: /* @__PURE__ */ f(
      D,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": k,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: S,
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            w && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: w }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: O()
              }
            )
          ] }),
          /* @__PURE__ */ o(Tt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Ht, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ f(Lt, { children: [
      /* @__PURE__ */ o(
        At,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      n && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(D, { variant: "ghost", size: "sm", onClick: X, children: s }),
        /* @__PURE__ */ o(D, { variant: "ghost", size: "sm", onClick: F, children: i })
      ] }),
      /* @__PURE__ */ f(Rt, { children: [
        /* @__PURE__ */ o(Dt, { children: d }),
        /* @__PURE__ */ o(Pt, { children: I.map((l) => /* @__PURE__ */ f(
          Ot,
          {
            value: l.label,
            onSelect: P,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Ct,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(l.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              l.starred && /* @__PURE__ */ o(ne, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: l.label }),
              l.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: l.secondaryLabel })
            ]
          },
          l.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function q(t) {
  return t.replace(/^\+/, "");
}
function aa(t, e, a) {
  if (!e) return [...t];
  const r = [...t], n = q(e).toLowerCase();
  return a === "passive" ? vt({
    query: n,
    items: r,
    filter: (s) => q(s.label).toLowerCase().startsWith(n),
    sortBy: "label"
  }) : vt({
    query: n,
    items: r,
    filter: (s) => q(s.label).toLowerCase().includes(n),
    sortBy: "label"
  });
}
function ra(t) {
  return t.isComposing || t.keyCode === 229;
}
const Jt = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, oa = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], na = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function sa(t) {
  return [
    ...oa,
    ...na.filter((e) => Jt[t].test(e))
  ];
}
function L(t) {
  t.preventDefault(), t.stopPropagation();
}
function Yr(t, e, a) {
  var n, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (L(t), a.commit(), "ended") : t.key === "Escape" ? (L(t), a.dismiss(), "ended") : "passed";
  if (ra(t) || me.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && L(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return L(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return L(t), aa(
      e.items.map((d) => ({ label: d.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return L(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return L(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    L(t);
    const i = q(e.filter).toLowerCase(), d = e.items.find(
      (u) => q(u.marker).toLowerCase() === i
    );
    return d && a.commitItem(d.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (L(t), a.dismiss(), "ended") : (L(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (L(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (L(t), a.dismiss(), "ended") : t.key === "Backspace" || Jt[r].test(t.key) ? (L(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && L(t), a.dismiss(), "ended");
}
function Qr(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function to(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: n,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: d,
    show: u,
    restoreSelectionIfLost: m,
    focusEditor: h,
    applyItem: S,
    onShowError: E
  } = t;
  n.current += 1;
  const w = n.current, b = a ? "backslash" : "selection", x = { kind: b, token: w, filter: "", items: e };
  b === "backslash" && r && (x.shouldSpaceCommit = r), s(x), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: sa(b),
    onKey: (g) => d(g)
  }).then((g) => {
    if (i(w), g !== void 0) {
      m(), h();
      const z = e.find((M) => M.marker === g);
      z && S(z);
    } else a || h();
  }).catch((g) => {
    i(w), a || h(), E(g);
  });
}
function eo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function ao({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function ia(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = tt(a.projectId), n = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    n ? n.some((i) => i.scrollGroupId === a.scrollGroupId) || n.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, n) => r.scrollGroupId - n.scrollGroupId)), e;
}
function kt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function ct(t) {
  const e = ia(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(tt(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((d) => d.scrollGroupId),
        isSelected: n === s.id,
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
  return t.projects.forEach((n) => {
    const s = e.get(tt(n.id));
    if (!s || s.length === 0) {
      r.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: kt(a, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
      return;
    }
    s.forEach((i) => {
      r.push({
        rowKey: `tab:${n.id}:${i.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: kt(a, n.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
    });
  }), a.forEach((n) => {
    if (n.scrollGroupId === void 0 || r.some((i) => i.projectId === n.projectId && i.scrollGroupId === n.scrollGroupId))
      return;
    const s = t.projects.find((i) => i.id === n.projectId);
    s && r.push({
      rowKey: `closed:${s.id}:${n.scrollGroupId}`,
      projectId: s.id,
      shortName: s.shortName,
      fullName: s.fullName,
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: s.isDisabled === !0,
      disabledReason: s.disabledReason,
      project: s
    });
  }), r;
}
function It(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function V(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - n;
}
function mt(t) {
  return [{ kind: "flat", rows: [...t].sort(V) }];
}
function la(t) {
  const e = t.filter(It).sort(V), a = t.filter((n) => !It(n)).sort(V);
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const r = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && r.push({ kind: "other", rows: a }), r;
}
function da(t, e) {
  const a = t.filter((i) => i.isSelected).sort(V), r = t.filter((i) => !i.isSelected).sort(V), n = (i, d) => {
    var m;
    const u = (m = e.getSectionHeading) == null ? void 0 : m.call(
      e,
      i,
      d.map((h) => h.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? "Selected" : "Unselected";
  }, s = [];
  return a.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: n("selected", a),
    rows: a
  }), r.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: n("unselected", r),
    rows: r
  }), s;
}
function ca(t, e) {
  if (e.id === "openTabs") return la(t);
  if (e.id === "selection") return da(t, e);
  if (!e.getGroupKey) return mt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: n } = e;
  t.forEach((d) => {
    const u = n(d.project);
    if (u === void 0 || u === "") {
      r.push(d);
      return;
    }
    const m = a.get(u);
    m ? m.push(d) : a.set(u, [d]);
  });
  const s = [...a.entries()].map(([d, u]) => {
    var S;
    const m = [...u].sort(V), h = ((S = e.getSectionHeading) == null ? void 0 : S.call(
      e,
      d,
      m.map((E) => E.project)
    )) ?? d;
    return { key: d, heading: h, rows: m };
  });
  s.sort((d, u) => d.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: d.key, heading: d.heading },
    { key: u.key, heading: u.heading }
  ) : d.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: d, heading: u, rows: m }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: d,
    label: u,
    rows: m,
    isPriority: d === e.priorityKey
  }));
  return r.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...r].sort(V)
  }), i;
}
const rt = "recent", ua = "other";
function wa(t) {
  const e = t ?? {};
  return [
    {
      id: "openTabs",
      label: e.openTabsLabel ?? "Open tabs"
    },
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (a) => {
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r.lastUsedAt) == "number" ? rt : ua;
      },
      getSectionHeading: (a) => a === rt ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, r) => a.key === rt ? -1 : r.key === rt ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (a) => {
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r.language) == "string" ? a.customData.language : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (a) => {
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r.type) == "string" ? a.customData.type : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (a, r) => {
        var i;
        const n = r.find((d) => {
          var u;
          return typeof ((u = d.customData) == null ? void 0 : u.typeName) == "string";
        }), s = (i = n == null ? void 0 : n.customData) == null ? void 0 : i.typeName;
        return typeof s == "string" && s.length > 0 ? s : a;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const ro = wa();
function oo(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (a) => a === "selected" ? e.selectedSectionHeading ?? "Selected" : e.unselectedSectionHeading ?? "Unselected"
  };
}
const Xt = zt + 50, pa = 100, ma = {
  ariaLabel: "",
  buttonPlaceholder: "",
  commandEmptyMessage: "No projects found",
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group by",
  filterGroupNone: "None",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  autoOpenTabsGroupingLabel: "Open tabs",
  autoSelectionGroupingLabel: "Selection",
  autoSelectionSelectedSectionHeading: "Selected",
  autoSelectionUnselectedSectionHeading: "Unselected",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function fa(t) {
  return { ...ma, ...t };
}
const no = [
  "%projectSelector_searchPlaceholder%",
  "%projectSelector_commandEmptyMessage%",
  "%projectSelector_filterAriaLabel%",
  "%projectSelector_groupSectionLabel%",
  "%projectSelector_filterGroupNone%",
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
function so(t) {
  return {
    searchPlaceholder: t["%projectSelector_searchPlaceholder%"],
    commandEmptyMessage: t["%projectSelector_commandEmptyMessage%"],
    filterAriaLabel: t["%projectSelector_filterAriaLabel%"],
    groupSectionLabel: t["%projectSelector_groupSectionLabel%"],
    filterGroupNone: t["%projectSelector_filterGroupNone%"],
    openTabsSectionHeading: t["%projectSelector_openTabsSectionHeading%"],
    otherProjectsSectionHeading: t["%projectSelector_otherProjectsSectionHeading%"],
    autoOpenTabsGroupingLabel: t["%projectSelector_grouping_openTabs_label%"],
    autoSelectionGroupingLabel: t["%projectSelector_grouping_selection_label%"],
    autoSelectionSelectedSectionHeading: t["%projectSelector_grouping_selection_selectedSectionHeading%"],
    autoSelectionUnselectedSectionHeading: t["%projectSelector_grouping_selection_unselectedSectionHeading%"],
    boundButClosedTooltip: t["%projectSelector_boundButClosedTooltip%"],
    openButtonLabel: t["%projectSelector_openButtonLabel%"],
    clearAll: t["%projectSelector_clearAll%"]
  };
}
function io(t) {
  return {
    openTabsLabel: t["%projectSelector_grouping_openTabs_label%"],
    lastUsedLabel: t["%projectSelector_grouping_lastUsed_label%"],
    lastUsedRecentSectionHeading: t["%projectSelector_grouping_lastUsed_recentSectionHeading%"],
    lastUsedOtherSectionHeading: t["%projectSelector_grouping_lastUsed_otherSectionHeading%"],
    languageLabel: t["%projectSelector_grouping_language_label%"],
    languageUnknownSectionHeading: t["%projectSelector_grouping_language_unknownSectionHeading%"],
    typeLabel: t["%projectSelector_grouping_type_label%"],
    typeUnknownSectionHeading: t["%projectSelector_grouping_type_unknownSectionHeading%"]
  };
}
function lo(t) {
  return {
    label: t["%projectSelector_grouping_selection_label%"],
    selectedSectionHeading: t["%projectSelector_grouping_selection_selectedSectionHeading%"],
    unselectedSectionHeading: t["%projectSelector_grouping_selection_unselectedSectionHeading%"]
  };
}
function at(t) {
  return Pe[fe(t)] ?? String(t);
}
const ha = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ga({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = at(t);
  return e ? /* @__PURE__ */ o(
    st,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ha,
      children: a
    }
  ) : /* @__PURE__ */ o(st, { variant: "secondary", children: a });
}
function ba({ row: t, mode: e, strings: a, onClick: r, onOpen: n, selectedRowRef: s }) {
  const {
    ref: i,
    open: d,
    onPointerEnter: u,
    onPointerLeave: m
  } = Be(), [h, S] = H(!1), E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, w = d || h, b = $(() => {
    if (E) {
      S(!0);
      return;
    }
    u();
  }, [E, u]), x = $(() => {
    S(!1), m();
  }, [m]), g = /* @__PURE__ */ o(Ct, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let z;
  e === "project" ? t.openGroups.length > 0 && (z = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((I) => /* @__PURE__ */ o(st, { variant: "secondary", children: at(I) }, I)) })) : t.scrollGroupId !== void 0 && (z = /* @__PURE__ */ f("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      ga,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ f(
      D,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (I) => {
          I.stopPropagation(), n(t);
        },
        onMouseDown: (I) => I.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ o(ie, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const M = /* @__PURE__ */ f(
    Ot,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: b,
      onPointerLeave: x,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: g }),
        /* @__PURE__ */ f(
          "span",
          {
            ref: i,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        z
      ]
    }
  ), P = t.scrollGroupId !== void 0 ? at(t.scrollGroupId) : void 0, O = t.isBoundButClosed && P ? a.boundButClosedTooltip.replace("{group}", P) : void 0;
  return /* @__PURE__ */ f($t, { open: w, delayDuration: 400, children: [
    /* @__PURE__ */ o(Ut, { asChild: !0, children: M }),
    /* @__PURE__ */ f(
      Kt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Xt },
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", children: t.fullName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && P && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              P,
              ")"
            ] })
          ] }),
          O && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: O }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Y = "none";
function Na({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: r
}) {
  return /* @__PURE__ */ f(Ve, { children: [
    /* @__PURE__ */ o(Je, { asChild: !0, children: /* @__PURE__ */ o(
      D,
      {
        variant: "ghost",
        size: "sm",
        className: "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
        "aria-label": r.filterAriaLabel,
        title: r.filterAriaLabel,
        onMouseDown: (n) => n.preventDefault(),
        children: /* @__PURE__ */ o(se, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ f(
      Xe,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Xt },
        children: [
          /* @__PURE__ */ o(Ze, { children: r.groupSectionLabel }),
          /* @__PURE__ */ f(We, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ o(yt, { value: Y, children: r.filterGroupNone }),
            /* @__PURE__ */ o(qe, {}),
            t.map((n) => /* @__PURE__ */ o(yt, { value: n.id, children: n.label }, n.id))
          ] })
        ]
      }
    )
  ] });
}
function va(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Y) return Y;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : Y;
}
function co(t) {
  const [e, a] = H(!1), [r, n] = H(""), s = fa(t.localizedStrings), i = W(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const l = [];
    return t.openTabs.length > 0 && l.push({ id: "openTabs", label: s.autoOpenTabsGroupingLabel }), t.mode === "project-multi" && l.push({
      id: "selection",
      label: s.autoSelectionGroupingLabel,
      getSectionHeading: (p) => p === "selected" ? s.autoSelectionSelectedSectionHeading : s.autoSelectionUnselectedSectionHeading
    }), l;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
  ]), [d, u] = H(
    () => va(i, t.defaultGrouping)
  ), m = nt(null), h = $((l) => {
    a(l), l || n("");
  }, []);
  Nt(() => {
    if (!e) return;
    const l = window.requestAnimationFrame(() => {
      const p = m.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(l);
  }, [e]);
  const S = W(() => t.mode === "project" ? ct({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = W(() => {
    const l = r.trim().toLowerCase();
    return l ? S.filter(
      (p) => p.shortName.toLowerCase().includes(l) || p.fullName.toLowerCase().includes(l)
    ) : S;
  }, [S, r]), w = W(() => {
    if (d === Y) return mt(E);
    const l = i.find((p) => p.id === d);
    return l ? ca(E, l) : mt(E);
  }, [E, d, i]), b = (l) => {
    if (l.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(l.projectId, l.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(l.projectId, l.scrollGroupId);
    }
  }, x = (l) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: l.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, N = tt(l.projectId), y = (T) => tt(T.projectId) === N && T.scrollGroupId === l.scrollGroupId, _ = p.some(y) ? p.filter((T) => !y(T)) : [
          ...p.filter((T) => !y(T)),
          { projectId: l.projectId, scrollGroupId: l.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: _ });
        return;
      }
      case "projectScrollGroup": {
        if (l.isBoundButClosed && l.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(l.projectId, l.scrollGroupId), a(!1);
          return;
        }
        if (l.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: l.projectId,
            scrollGroupId: l.scrollGroupId
          }), a(!1);
          return;
        }
        const p = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: l.projectId, scrollGroupId: p }), t.onOpenProjectInGroup(l.projectId, p), a(!1);
      }
    }
  }, g = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, z = W(() => {
    switch (t.mode) {
      case "project": {
        const l = t.projects.find((N) => N.id === t.selection.projectId);
        let p = l ? l.shortName : s.buttonPlaceholder;
        return l && t.triggerLabelFormat === "shortNameAndFullName" && l.fullName && l.fullName !== l.shortName && (p = `${l.shortName} - ${l.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: l } = t.selection;
        if (l.length === 0) {
          const _ = s.buttonPlaceholder;
          return { node: _, title: _ };
        }
        const p = [];
        if (l.forEach((_) => {
          const T = t.projects.find((Wt) => Wt.id === _.projectId);
          T && p.push({ project: T, scrollGroupId: _.scrollGroupId });
        }), p.length === 0) {
          const _ = s.buttonPlaceholder;
          return { node: _, title: _ };
        }
        const N = p.map(
          ({ project: _, scrollGroupId: T }) => T === void 0 ? _.shortName : `${_.shortName} (${at(T)})`
        ).join(", "), y = p.length.toString();
        return {
          node: /* @__PURE__ */ f(Zt, { children: [
            /* @__PURE__ */ o(st, { variant: "muted", className: "tw:shrink-0", children: y }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: N })
          ] }),
          title: `${y} ${N}`
        };
      }
      case "projectScrollGroup": {
        const l = t.projects.find((y) => y.id === t.selection.projectId);
        if (!l) {
          const y = s.buttonPlaceholder;
          return { node: y, title: y };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: l.shortName, title: l.shortName };
        const N = `${l.shortName} · ${at(p)}`;
        return { node: N, title: N };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t, s.buttonPlaceholder]), M = nt(null), [P, O] = H(!1);
  Nt(() => {
    const l = M.current;
    if (!l) return;
    const p = (y) => {
      O(y < pa);
    };
    p(l.getBoundingClientRect().width);
    const N = new ResizeObserver((y) => {
      y.forEach((_) => {
        const [T] = _.borderBoxSize;
        p(T ? T.inlineSize : l.getBoundingClientRect().width);
      });
    });
    return N.observe(l, { box: "border-box" }), () => N.disconnect();
  }, []);
  let I;
  t.isLoading ? I = /* @__PURE__ */ o(le, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : P ? I = void 0 : t.mode === "project-multi" ? I = /* @__PURE__ */ o(Tt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : I = /* @__PURE__ */ o(de, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const X = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? b : void 0, F = /* @__PURE__ */ f(
    D,
    {
      ref: M,
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
        P && "tw:px-0.5 tw:text-xs"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof z.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: z.node }) : z.node }),
        I
      ]
    }
  ), k = z.title ? /* @__PURE__ */ o(xt, { delayDuration: 400, children: /* @__PURE__ */ f($t, { children: [
    /* @__PURE__ */ o(Ut, { asChild: !0, children: /* @__PURE__ */ o(pt, { asChild: !0, children: F }) }),
    /* @__PURE__ */ o(Kt, { children: z.title })
  ] }) }) : /* @__PURE__ */ o(pt, { asChild: !0, children: F }), R = i.length > 1;
  return /* @__PURE__ */ f(Bt, { open: e, onOpenChange: h, children: [
    k,
    /* @__PURE__ */ o(
      Ht,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(xt, { delayDuration: 400, children: /* @__PURE__ */ f(Lt, { shouldFilter: !1, children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
            /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
              At,
              {
                value: r,
                onValueChange: n,
                placeholder: s.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            R && /* @__PURE__ */ o(
              Na,
              {
                availableGroupings: i,
                activeGrouping: d,
                onChangeGrouping: u,
                strings: s
              }
            )
          ] }),
          t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. Select all was removed — it is redundant with the
          // built-in Selection grouping (which surfaces what's selected in its own bucket) and
          // encouraged sloppy bulk selection. Clear all is hidden while nothing is selected.
          /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(D, { variant: "ghost", size: "sm", onClick: g, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
          /* @__PURE__ */ f(Rt, { children: [
            /* @__PURE__ */ o(Dt, { children: s.commandEmptyMessage }),
            w.map((l, p) => (
              // Custom groupings yield multiple 'grouping' sections, so the section key must
              // include the label (or key) to stay stable across re-orders.
              /* @__PURE__ */ f(
                oe,
                {
                  children: [
                    /* @__PURE__ */ o(Pt, { heading: xa(l, s), children: l.rows.map((N) => /* @__PURE__ */ o(
                      ba,
                      {
                        row: N,
                        mode: t.mode,
                        strings: s,
                        onClick: x,
                        onOpen: X,
                        selectedRowRef: m
                      },
                      N.rowKey
                    )) }),
                    p < w.length - 1 && /* @__PURE__ */ o(je, {})
                  ]
                },
                `${l.kind}:${l.groupingId ?? ""}:${l.key ?? l.label ?? ""}`
              )
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function xa(t, e) {
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
const ya = _t(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: s = !1, id: i }, d) => {
    const u = A();
    return /* @__PURE__ */ f(
      "div",
      {
        id: i,
        className: c("tw:relative tw:@container/search", { "tw:w-full": r }, n),
        children: [
          /* @__PURE__ */ o(
            ce,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            Te,
            {
              ref: d,
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
          t && /* @__PURE__ */ f(
            D,
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
                /* @__PURE__ */ o(ue, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ya.displayName = "SearchBar";
const Sa = 5;
function uo(t) {
  return De(t).filter(
    (e) => !j.isObsolete(j.bookIdToNumber(e))
  );
}
function ka(t, e) {
  return t.filter((a) => {
    try {
      return he(a) === e;
    } catch {
      return !1;
    }
  });
}
const wo = (t, e, a) => ka(t, e).every((r) => a.includes(r));
function Ia(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => j.bookIdToNumber(r) > 0).sort((r, n) => j.bookIdToNumber(r) - j.bookIdToNumber(n)).map((r) => Oe(r, e));
}
function po(t, e, a, r) {
  if (t.length === 0) return;
  const n = new Set(t.map((d) => d.toUpperCase())), s = new Set(e.map((d) => d.toUpperCase()));
  if (s.size > 0 && s.size === n.size && [...s].every((d) => n.has(d)))
    return a;
  const i = Ia(t, r);
  if (i.length !== 0)
    return i.length <= Sa ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function mo({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: c("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
function Ea({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function _a({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const Ta = U(
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
function Ca({
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ta({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function fo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function za({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ga({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function ho({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: n = "alert",
  className: s
}) {
  return /* @__PURE__ */ f(Ea, { className: c(s), role: n, children: [
    /* @__PURE__ */ f(_a, { children: [
      /* @__PURE__ */ o(Ca, { variant: "icon", children: r ?? /* @__PURE__ */ o(we, {}) }),
      /* @__PURE__ */ o(za, { children: t })
    ] }),
    a && /* @__PURE__ */ o(Ga, { children: /* @__PURE__ */ o(D, { onClick: () => a(), children: e }) })
  ] });
}
const ja = _t(({ className: t, ...e }, a) => /* @__PURE__ */ o(pe, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
ja.displayName = "Spinner";
const La = U(
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
function go({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        La({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function bo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function No({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function vo({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    gt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: c(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...n
    }
  );
}
function ot(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function xo({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    gt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: ot(t),
      minSize: ot(e),
      maxSize: ot(a),
      collapsedSize: ot(r),
      ...n
    }
  );
}
function yo({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    gt.Separator,
    {
      "data-slot": "resizable-handle",
      className: c(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Ur as $,
  hr as A,
  D as B,
  Ot as C,
  Qa as D,
  _r as E,
  Tr as F,
  zr as G,
  Gr as H,
  ur as I,
  Dr as J,
  st as K,
  Sr as L,
  Ve as M,
  Je as N,
  Xe as O,
  Bt as P,
  $r as Q,
  kr as R,
  He as S,
  xt as T,
  Lr as U,
  Ze as V,
  qe as W,
  Pr as X,
  Jr as Y,
  zt as Z,
  Wr as _,
  Oe as a,
  Vr as a$,
  Kr as a0,
  Xr as a1,
  Fr as a2,
  Rr as a3,
  We as a4,
  yt as a5,
  qr as a6,
  eo as a7,
  Ja as a8,
  Te as a9,
  go as aA,
  No as aB,
  bo as aC,
  Cr as aD,
  er as aE,
  sr as aF,
  _e as aG,
  Ee as aH,
  tr as aI,
  Or as aJ,
  Ea as aK,
  Ga as aL,
  za as aM,
  _a as aN,
  Ca as aO,
  mo as aP,
  fo as aQ,
  ao as aR,
  yr as aS,
  vr as aT,
  xr as aU,
  yo as aV,
  xo as aW,
  vo as aX,
  ho as aY,
  ja as aZ,
  Zr as a_,
  q as aa,
  je as ab,
  ir as ac,
  to as ad,
  Yr as ae,
  Qr as af,
  Nr as ag,
  ra as ah,
  co as ai,
  ya as aj,
  uo as ak,
  ka as al,
  mr as am,
  wo as an,
  br as ao,
  or as ap,
  Pe as aq,
  Br as ar,
  Mr as as,
  Ar as at,
  Hr as au,
  Vt as av,
  lt as aw,
  dt as ax,
  Ce as ay,
  Ge as az,
  $t as b,
  qa as b0,
  Za as b1,
  ke as b2,
  Se as b3,
  Wa as b4,
  Xa as b5,
  Fe as b6,
  $e as b7,
  Gt as b8,
  jr as b9,
  wr as ba,
  no as bb,
  Ie as bc,
  io as bd,
  so as be,
  lo as bf,
  ro as bg,
  aa as bh,
  sa as bi,
  wa as bj,
  oo as bk,
  Ya as bl,
  po as bm,
  c,
  Ut as d,
  Kt as e,
  pt as f,
  fr as g,
  Ht as h,
  Lt as i,
  Rt as j,
  Pt as k,
  dr as l,
  cr as m,
  gr as n,
  Re as o,
  pr as p,
  At as q,
  A as r,
  Dt as s,
  Ir as t,
  Be as u,
  ar as v,
  rr as w,
  lr as x,
  nr as y,
  Er as z
};
//# sourceMappingURL=resizable-Bod5Qvaf.js.map
