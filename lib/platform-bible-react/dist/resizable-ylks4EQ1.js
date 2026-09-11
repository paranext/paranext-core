import { jsx as o, jsxs as f, Fragment as pt } from "react/jsx-runtime";
import { Slot as Nt, Dialog as J, Popover as ot, Tooltip as et, Label as ie, RadioGroup as ht, ToggleGroup as Rt, Separator as le, DropdownMenu as T } from "radix-ui";
import { IconX as de, IconSearch as ce, IconCheck as vt, IconChevronRight as ue } from "@tabler/icons-react";
import { Canon as G } from "@sillsdev/scripture";
import z, { useState as X, useRef as xt, useCallback as K, createContext as we, useContext as me, useMemo as Q, useEffect as fe, Fragment as pe, forwardRef as Ot } from "react";
import { cva as W } from "class-variance-authority";
import { ChevronsUpDown as Bt, Check as Pt, Star as he, SlidersHorizontal as ge, ArrowRight as be, Loader2 as Ne, ChevronDown as ve, Search as xe, X as ye, AlertTriangle as ke, LoaderCircle as Ie } from "lucide-react";
import { Section as q, MODIFIER_KEYS as Se, normalizeProjectId as F, getLocalizeKeyForScrollGroupId as Ce, getSectionForBook as Ee } from "platform-bible-utils";
import { filterAndRankItems as St } from "@eten-tech-foundation/platform-editor";
import { Command as tt } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as yt from "react-resizable-panels";
import { clsx as Te } from "clsx";
import { extendTailwindMerge as ze, twMerge as Ge } from "tailwind-merge";
const Ae = ze({ prefix: "tw" });
function gt(t) {
  const e = [];
  let a = "", r = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function De(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = gt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((c, m) => m !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((c, m) => m !== r), `!${s}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const s = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Le(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = gt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), n = a[a.length - 1], s = gt(e), i = s.some((c) => c.startsWith("-tw-")), l = s.some((c) => c.startsWith("!tw-"));
  if (i && n.startsWith("-")) {
    const c = n.slice(1);
    return [...r, `-tw-${c}`].join(":");
  }
  if (l && n.startsWith("!")) {
    const c = n.slice(1);
    return [...r, `!tw-${c}`].join(":");
  }
  return [...r, `tw-${n}`].join(":");
}
function d(...t) {
  const e = Te(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Ae(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
  return a.forEach((c) => {
    const m = De(c);
    r.set(m.normalized, m.original), n.push(m.normalized);
  }), Ge(n.join(" ")).split(" ").filter(Boolean).map((c) => {
    const m = r.get(c);
    return m ? Le(c, m) : c;
  }).join(" ");
}
const Re = 600, Mt = 650, dr = 400, Oe = 450, Be = 500, Pe = 550, cr = 650, ur = 700, wr = 800, _t = W(
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
function j({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...n
}) {
  const s = r ? Nt.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: d(_t({ variant: e, size: a, className: t })),
      ...n
    }
  );
}
const jt = "layoutDirection";
function U() {
  const t = localStorage.getItem(jt);
  return t === "rtl" ? t : "ltr";
}
function mr(t) {
  localStorage.setItem(jt, t);
}
function fr({ ...t }) {
  return /* @__PURE__ */ o(J.Root, { "data-slot": "dialog", ...t });
}
function pr({ ...t }) {
  return /* @__PURE__ */ o(J.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Me({ ...t }) {
  return /* @__PURE__ */ o(J.Portal, { "data-slot": "dialog-portal", ...t });
}
function hr({ ...t }) {
  return /* @__PURE__ */ o(J.Close, { "data-slot": "dialog-close", ...t });
}
function _e({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    J.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: d(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Oe, ...e },
      ...a
    }
  );
}
function gr({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...s
}) {
  const i = U();
  return /* @__PURE__ */ f(Me, { children: [
    /* @__PURE__ */ o(_e, { className: r }),
    /* @__PURE__ */ f(
      J.Content,
      {
        "data-slot": "dialog-content",
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Be, ...n },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ o(J.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ f(j, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(de, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function br({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Nr({
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
        e && /* @__PURE__ */ o(J.Close, { asChild: !0, children: /* @__PURE__ */ o(j, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    J.Title,
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
function xr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    J.Description,
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
function je({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ o(
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
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const $e = W(
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
function He({
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
        className: d($e({ align: e }), t),
        onClick: (r) => {
          var n, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
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
function Ut({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    tt,
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
function $t({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const n = U(), s = z.useCallback(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ f(Ue, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        tt.Input,
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
      /* @__PURE__ */ o(He, { children: /* @__PURE__ */ o(ce, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Ht({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    tt.List,
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
function Vt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    tt.Empty,
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
function Ft({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    tt.Group,
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
function Ve({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    tt.Separator,
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
function Kt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ f(
    tt.Item,
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
        /* @__PURE__ */ o(vt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const Fe = [
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
], Ke = (t) => {
  var e;
  return ((e = Fe[t]) == null ? void 0 : e.chapters) ?? -1;
}, Je = G.allBookIds.filter(
  (t) => !G.isObsolete(G.bookIdToNumber(t))
);
function Xe(t) {
  const e = [], a = Math.min(t.length, G.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(G.bookNumberToId(r + 1));
  return e;
}
function I(t) {
  return `%scrollGroup_${t}%`;
}
const We = {
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
function kt(t, e) {
  return Ke(G.bookIdToNumber(t));
}
function ut(t, e, a) {
  const r = G.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = G.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (n = i, s = l);
  }), n;
}
function kr(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const s = ut(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(kt(s), 1),
      verseNum: 1
    };
}
function Ir(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < kt(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const s = ut(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Sr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
  if (e === void 0) return;
  const i = ut(r, e, "previous");
  if (!i) return;
  const l = Math.max(kt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Cr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: s + 1 };
  const i = ut(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Er(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Tr = (t, e, a, r, n) => {
  switch (t) {
    case q.OT:
      return e ?? "Old Testament";
    case q.NT:
      return a ?? "New Testament";
    case q.DC:
      return r ?? "Deuterocanon";
    case q.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, zr = (t, e, a, r, n) => {
  switch (t) {
    case q.OT:
      return e ?? "OT";
    case q.NT:
      return a ?? "NT";
    case q.DC:
      return r ?? "DC";
    case q.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Gr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? G.bookIdToEnglishName(t);
}
function Ze(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const Ar = Object.fromEntries(
  Je.map((t) => [t, G.bookIdToEnglishName(t)])
);
function Dr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = G.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function Jt({ ...t }) {
  return /* @__PURE__ */ o(ot.Root, { "data-slot": "popover", ...t });
}
function bt({ ...t }) {
  return /* @__PURE__ */ o(ot.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Xt = z.createContext(null);
function Lr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ o(Xt.Provider, { value: t, children: e });
}
function Wt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...n
}) {
  const s = U(), i = z.useContext(Xt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(ot.Portal, { container: i ?? void 0, children: /* @__PURE__ */ o(
      ot.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Re, ...r },
        dir: s,
        ...n
      }
    ) })
  );
}
function Rr({ ...t }) {
  return /* @__PURE__ */ o(ot.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Or({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: d("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Br({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: d("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Pr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: d("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ct({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    et.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Zt({ ...t }) {
  return /* @__PURE__ */ o(et.Root, { "data-slot": "tooltip", ...t });
}
function qt({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    et.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? d(_t({ variant: e }), t) : t,
      ...a
    }
  );
}
function Yt({
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
  return /* @__PURE__ */ o(et.Portal, { children: /* @__PURE__ */ f(
    et.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Pe, ...a },
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ o(
          et.Arrow,
          {
            className: d(
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
function qe() {
  const [t, e] = X(!1), a = xt(null), r = K(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), n = K(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: n };
}
function Mr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    ie.Root,
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
function _r({
  className: t,
  ...e
}) {
  const a = U();
  return /* @__PURE__ */ o(
    ht.Root,
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
function jr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    ht.Item,
    {
      "data-slot": "radio-group-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        ht.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Ye = W(
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
), Qt = z.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Ur({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: n = "horizontal",
  children: s,
  ...i
}) {
  const l = U();
  return /* @__PURE__ */ o(
    Rt.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": n,
      style: { "--gap": r },
      className: d(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...i,
      children: /* @__PURE__ */ o(
        Qt.Provider,
        {
          value: z.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: n }),
            [e, a, r, n]
          ),
          children: s
        }
      )
    }
  );
}
function $r({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...n
}) {
  const s = z.useContext(Qt);
  return /* @__PURE__ */ o(
    Rt.Item,
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
      ...n,
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
  return /* @__PURE__ */ o(
    le.Root,
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
const ta = W(
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
function Hr({
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
function Vr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? Nt.Root : "div";
  return /* @__PURE__ */ o(
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
function Fr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ o(
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
function Kr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Jr() {
  return /Windows/i.test(navigator.userAgent);
}
const ea = ["input", "select", "textarea", "button"], aa = ["button", "textbox"], Xr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const n = xt(null), [s, i] = X(void 0), [l, c] = X(void 0), m = K(
    (u) => {
      i(u);
      const b = t.find((N) => N.id === u);
      b && (e == null || e(b));
      const g = document.getElementById(u);
      g && (g.scrollIntoView({ block: "center" }), g.focus()), n.current && n.current.setAttribute("aria-activedescendant", u);
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
      var H;
      const b = u.target, g = (x) => x ? document.getElementById(x) : void 0, N = g(l), A = g(s);
      if (!!(N && b && N.contains(b) && b !== N) && v(b)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !b.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const x = t.find((_) => _.id === l);
            x && m(x.id);
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
          const _ = x.findIndex((R) => R === b);
          if (_ === -1) return;
          let C;
          u.key === "ArrowDown" ? C = Math.min(_ + 1, x.length - 1) : C = Math.max(_ - 1, 0), C !== _ && (u.preventDefault(), u.stopPropagation(), (H = x[C]) == null || H.focus());
          return;
        }
        return;
      }
      const B = t.findIndex((x) => x.id === s);
      let P = B;
      switch (u.key) {
        case "ArrowDown":
          P = Math.min(B + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(B - 1, 0), u.preventDefault();
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
          const x = A;
          if (x) {
            const _ = x.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), C = x.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), R = _ ?? C;
            if (R) {
              u.preventDefault(), R.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (v(b) || (r == null || r(u.key), u.preventDefault()));
          return;
      }
      const M = t[P];
      M && m(M.id);
    },
    [t, m, s, l, h, r]
  );
  return {
    listboxRef: n,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: S,
    /** Focus an option by its ID */
    focusOption: m
  };
}, ra = W(
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
  const n = a ? Nt.Root : "span";
  return /* @__PURE__ */ o(
    n,
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
const te = we(void 0);
function wt() {
  const t = me(te);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const mt = W("", {
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
function na({ variant: t = "default", ...e }) {
  const a = U(), r = z.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(te.Provider, { value: r, children: /* @__PURE__ */ o(T.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function Wr({
  ...t
}) {
  return /* @__PURE__ */ o(T.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function oa({
  ...t
}) {
  return /* @__PURE__ */ o(T.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function sa({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...n
}) {
  const s = U();
  return /* @__PURE__ */ o(T.Portal, { children: /* @__PURE__ */ o(
    T.Content,
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
      ...n,
      children: /* @__PURE__ */ o("div", { dir: s, children: r })
    }
  ) });
}
function Zr({ ...t }) {
  return /* @__PURE__ */ o(T.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function qr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const n = U(), s = wt();
  return /* @__PURE__ */ o(
    T.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: d(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: s.variant })
      ),
      dir: n,
      ...r
    }
  );
}
function ia({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...n
}) {
  const s = U(), i = wt();
  return /* @__PURE__ */ f(
    T.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: i.variant })
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
            children: /* @__PURE__ */ o(T.ItemIndicator, { children: /* @__PURE__ */ o(vt, {}) })
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
  return /* @__PURE__ */ o(T.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Et({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const n = U(), s = wt();
  return /* @__PURE__ */ f(
    T.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: s.variant })
      ),
      dir: n,
      ...r,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(T.ItemIndicator, { children: /* @__PURE__ */ o(vt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Tt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ o(
    T.Label,
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
  return /* @__PURE__ */ o(
    T.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: d("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Yr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Qr({ ...t }) {
  return /* @__PURE__ */ o(T.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function tn({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const n = wt();
  return /* @__PURE__ */ f(
    T.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: d(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: n.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ o(ue, { className: "tw:ms-auto" })
      ]
    }
  );
}
function en({ className: t, children: e, ...a }) {
  const r = U();
  return /* @__PURE__ */ o(
    T.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: d(
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
function an({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: d("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const zt = `
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
  const a = e ? `${zt}, ${e}` : zt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && ca(r)
  );
}
function rn({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const n = z.useRef(null);
  z.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), z.useEffect(() => {
    const i = n.current;
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
    const { current: l } = n;
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
    /* @__PURE__ */ o(
      "div",
      {
        "data-slot": "table-container",
        className: d("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
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
function nn({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ o(
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
function on({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: d("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function sn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
  z.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const n = t.current ? st(t.current) : [], s = n.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function wa(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ma(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ln({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: n,
  ...s
}) {
  const i = z.useRef(null);
  z.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), ua(i);
  const l = z.useMemo(
    () => i.current ? st(i.current) : [],
    [i]
  ), c = z.useCallback(
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
  ), m = z.useCallback(
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
      onKeyDown: c,
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
function dn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function cn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function un({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: d("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function wn({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: n = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: m = void 0,
  onOpenChange: h = void 0,
  isDisabled: v = !1,
  sortSelected: S = !1,
  icon: u = void 0,
  className: b = void 0,
  variant: g = "ghost",
  id: N
}) {
  const [A, $] = X(!1), Y = K(
    (C) => {
      var O;
      const R = (O = t.find((V) => V.label === C)) == null ? void 0 : O.value;
      R && a(
        e.includes(R) ? e.filter((V) => V !== R) : [...e, R]
      );
    },
    [t, e, a]
  ), B = () => c || r, P = Q(() => {
    if (!S) return t;
    const C = t.filter((O) => O.starred).sort((O, V) => O.label.localeCompare(V.label)), R = t.filter((O) => !O.starred).sort((O, V) => {
      const lt = e.includes(O.value), Z = e.includes(V.value);
      return lt && !Z ? -1 : !lt && Z ? 1 : O.label.localeCompare(V.label);
    });
    return [...C, ...R];
  }, [t, e, S]), M = () => {
    a(t.map((C) => C.value));
  }, H = () => {
    a([]);
  }, x = m ?? A;
  return /* @__PURE__ */ o("div", { id: N, className: b, children: /* @__PURE__ */ f(Jt, { open: x, onOpenChange: h ?? $, children: [
    /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ f(
      j,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": x,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: v,
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            u && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: u }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: d(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: B()
              }
            )
          ] }),
          /* @__PURE__ */ o(Bt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Wt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ f(Ut, { children: [
      /* @__PURE__ */ o(
        $t,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      n && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(j, { variant: "ghost", size: "sm", onClick: M, children: s }),
        /* @__PURE__ */ o(j, { variant: "ghost", size: "sm", onClick: H, children: i })
      ] }),
      /* @__PURE__ */ f(Ht, { children: [
        /* @__PURE__ */ o(Vt, { children: l }),
        /* @__PURE__ */ o(Ft, { children: P.map((C) => /* @__PURE__ */ f(
          Kt,
          {
            value: C.label,
            onSelect: Y,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Pt,
                {
                  className: d(
                    "tw:h-4 tw:w-4",
                    e.includes(C.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              C.starred && /* @__PURE__ */ o(he, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: C.label }),
              C.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: C.secondaryLabel })
            ]
          },
          C.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function nt(t) {
  return t.replace(/^\+/, "");
}
function fa(t, e, a) {
  if (!e) return [...t];
  const r = [...t], n = nt(e).toLowerCase();
  return a === "passive" ? St({
    query: n,
    items: r,
    filter: (s) => nt(s.label).toLowerCase().startsWith(n),
    sortBy: "label"
  }) : St({
    query: n,
    items: r,
    filter: (s) => nt(s.label).toLowerCase().includes(n),
    sortBy: "label"
  });
}
function pa(t) {
  return t.isComposing || t.keyCode === 229;
}
const ee = {
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
    ...ga.filter((e) => ee[t].test(e))
  ];
}
function L(t) {
  t.preventDefault(), t.stopPropagation();
}
function mn(t, e, a) {
  var n, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (L(t), a.commit(), "ended") : t.key === "Escape" ? (L(t), a.dismiss(), "ended") : "passed";
  if (pa(t) || Se.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && L(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return L(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return L(t), fa(
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
    const i = nt(e.filter).toLowerCase(), l = e.items.find(
      (c) => nt(c.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (L(t), a.dismiss(), "ended") : (L(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (L(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (L(t), a.dismiss(), "ended") : t.key === "Backspace" || ee[r].test(t.key) ? (L(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && L(t), a.dismiss(), "ended");
}
function fn(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function pn(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: n,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: c,
    restoreSelectionIfLost: m,
    focusEditor: h,
    applyItem: v,
    onShowError: S
  } = t;
  n.current += 1;
  const u = n.current, b = a ? "backslash" : "selection", g = { kind: b, token: u, filter: "", items: e };
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
      m(), h();
      const A = e.find(($) => $.marker === N);
      A && v(A);
    } else a || h();
  }).catch((N) => {
    i(u), a || h(), S(N);
  });
}
function hn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function gn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
    const r = F(a.projectId), n = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    n ? n.some((i) => i.scrollGroupId === a.scrollGroupId) || n.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, n) => r.scrollGroupId - n.scrollGroupId)), e;
}
function Gt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function ft(t) {
  const e = Na(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(F(s.id)) ?? [];
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
        isSelected: n === s.id,
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
  return t.projects.forEach((n) => {
    const s = e.get(F(n.id));
    if (!s || s.length === 0) {
      r.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Gt(a, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName,
        type: n.type,
        typeName: n.typeName,
        lastUsedAt: n.lastUsedAt
      });
      return;
    }
    s.forEach((i) => {
      r.push({
        rowKey: `tab:${n.id}:${i.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Gt(a, n.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName,
        type: n.type,
        typeName: n.typeName,
        lastUsedAt: n.lastUsedAt
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
      language: s.language,
      languageCode: s.languageCode,
      scrollGroupId: n.scrollGroupId,
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
function At(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function D(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - n;
}
function Dt(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(D) }];
  const a = t.filter(At).sort(D), r = t.filter((s) => !At(s)).sort(D);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function va(t, e, a) {
  const r = /* @__PURE__ */ new Map(), n = [];
  t.forEach((l) => {
    const c = l.versificationId;
    if (c === void 0 || c === "") {
      n.push(l);
      return;
    }
    const m = l.versificationName ?? c, h = r.get(c);
    h ? (h.rows.push(l), !h.label && l.versificationName && (h.label = l.versificationName)) : r.set(c, { label: m, rows: [l] });
  });
  const s = [...r.entries()].map(([l, { label: c, rows: m }]) => ({
    id: l,
    label: c,
    rows: [...m].sort(D)
  }));
  s.sort((l, c) => l.id === e ? -1 : c.id === e ? 1 : l.label.localeCompare(c.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: l, label: c, rows: m }) => ({
    kind: "versification",
    rows: m,
    label: c,
    isPriority: l === e
  }));
  return n.length > 0 && i.push({
    kind: "versification",
    rows: [...n].sort(D),
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
  const n = [...a.entries()].map(([i, l]) => ({
    label: i,
    rows: [...l].sort(D)
  }));
  n.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = n.map(({ label: i, rows: l }) => ({
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
    const c = i.typeName ?? l, m = a.get(l);
    m ? (m.rows.push(i), m.label === l && i.typeName && (m.label = i.typeName)) : a.set(l, { label: c, rows: [i] });
  });
  const n = [...a.values()].map(({ label: i, rows: l }) => ({
    label: i,
    rows: [...l].sort(D)
  }));
  n.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = n.map(({ label: i, rows: l }) => ({
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
  const r = [], n = [];
  t.forEach((i) => {
    typeof i.lastUsedAt == "number" ? r.push(i) : n.push(i);
  }), r.sort((i, l) => (l.lastUsedAt ?? 0) - (i.lastUsedAt ?? 0)), n.sort(D);
  const s = [];
  return r.length > 0 && s.push({ kind: "lastUsed", rows: r, label: e }), n.length > 0 && s.push({ kind: "lastUsed", rows: n, label: a }), s;
}
const ae = "__unmatched__";
function Ia(t) {
  const e = /* @__PURE__ */ new Set();
  return t.map((a) => a.id).find((a) => a === ae || e.has(a) ? !0 : (e.add(a), !1));
}
const Lt = /* @__PURE__ */ new Set();
function Sa(t) {
  Lt.has(t) || (Lt.add(t), console.warn(
    `ProjectSelector: duplicate custom section id "${t}" — matching is unaffected because each section buckets by its own \`match\`, but sections sharing an id collide as React keys, which can cause stale or misapplied rendering.`
  ));
}
function Ca(t, e, a, r) {
  if (e.length === 0)
    return [{ kind: "flat", rows: [...t].sort(D) }];
  const n = Ia(e);
  n !== void 0 && Sa(n);
  const s = /* @__PURE__ */ new Map(), i = (v) => {
    const S = s.get(v);
    if (S !== void 0) return S;
    const u = a.get(v), b = u ? e.findIndex((g) => g.match(u)) : -1;
    return s.set(v, b), b;
  }, l = e.map(() => []), c = [];
  t.forEach((v) => {
    const S = i(F(v.projectId));
    S < 0 ? c.push(v) : l[S].push(v);
  });
  const m = (v, S) => {
    const { compare: u } = S;
    return u ? [...v].sort((b, g) => {
      const N = a.get(F(b.projectId)), A = a.get(F(g.projectId));
      if (!N || !A) return D(b, g);
      const $ = u(N, A);
      return $ !== 0 ? $ : D(b, g);
    }) : [...v].sort(D);
  }, h = [];
  return e.forEach((v, S) => {
    const u = l[S];
    u.length !== 0 && h.push({
      kind: "custom",
      id: v.id,
      rows: m(u, v),
      label: v.label
    });
  }), c.length > 0 && h.push({
    kind: "custom",
    id: ae,
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
  return We[Ce(t)] ?? String(t);
}
const re = [
  "openTabs",
  "lastUsed",
  "language",
  "versification",
  "type",
  "custom"
], za = re.filter(
  (t) => t !== "custom"
), Ga = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Aa({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = it(t);
  return e ? /* @__PURE__ */ o(
    ct,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ga,
      children: a
    }
  ) : /* @__PURE__ */ o(ct, { variant: "secondary", children: a });
}
function Da({
  row: t,
  mode: e,
  strings: a,
  onClick: r,
  onOpen: n,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: c,
    open: m,
    onPointerEnter: h,
    onPointerLeave: v
  } = qe(), [S, u] = X(!1), b = !!(t.language || t.languageCode), g = b || !!t.typeName || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, N = m || S, A = K(() => {
    if (g) {
      u(!0);
      return;
    }
    h();
  }, [g, h]), $ = K(() => {
    u(!1), v();
  }, [v]), Y = /* @__PURE__ */ o(Pt, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let B;
  e === "project" ? t.openGroups.length > 0 && (B = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((x) => /* @__PURE__ */ o(ct, { variant: "secondary", children: it(x) }, x)) })) : t.scrollGroupId !== void 0 && (B = /* @__PURE__ */ f("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Aa,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ f(
      j,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (x) => {
          x.stopPropagation(), n(t);
        },
        onMouseDown: (x) => x.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ o(be, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const P = /* @__PURE__ */ f(
    Kt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: A,
      onPointerLeave: $,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: Y }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i }),
        /* @__PURE__ */ f(
          "span",
          {
            ref: c,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        B
      ]
    }
  ), M = t.scrollGroupId !== void 0 ? it(t.scrollGroupId) : void 0, H = t.isBoundButClosed && M ? a.boundButClosedTooltip.replace("{group}", M) : void 0;
  return /* @__PURE__ */ f(Zt, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ o(qt, { asChild: !0, children: P }),
    /* @__PURE__ */ f(
      Yt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Mt },
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", children: t.fullName }),
          b && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          t.typeName && /* @__PURE__ */ o("div", { className: "tw:text-sm", children: t.typeName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && M && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              M,
              ")"
            ] })
          ] }),
          H && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: H }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function La(t, e, a) {
  if (e) {
    if (e === "none") return "none";
    if (t.includes(e)) return e;
  }
  return a === !1 ? "none" : t.includes("openTabs") ? "openTabs" : "none";
}
function Ra(t) {
  return t === "none" || re.some((e) => e === t);
}
function Oa(t, e) {
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
  showSelectedOnly: n,
  onChangeShowSelectedOnly: s,
  strings: i
}) {
  const l = !!n || e !== a;
  return /* @__PURE__ */ f(na, { children: [
    /* @__PURE__ */ o(oa, { asChild: !0, children: /* @__PURE__ */ o(
      j,
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
        children: /* @__PURE__ */ o(ge, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ f(
      sa,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Mt },
        children: [
          t.length > 0 && /* @__PURE__ */ f(pt, { children: [
            /* @__PURE__ */ o(Tt, { children: i.groupSectionLabel }),
            /* @__PURE__ */ f(
              la,
              {
                value: e,
                onValueChange: (c) => {
                  Ra(c) && r(c);
                },
                children: [
                  /* @__PURE__ */ o(Et, { value: "none", children: i.filterGroupNone }),
                  t.map((c) => /* @__PURE__ */ o(Et, { value: c, children: Oa(c, i) }, c))
                ]
              }
            )
          ] }),
          s && /* @__PURE__ */ f(pt, { children: [
            t.length > 0 && /* @__PURE__ */ o(da, {}),
            /* @__PURE__ */ o(Tt, { children: i.filterSectionLabel }),
            /* @__PURE__ */ o(
              ia,
              {
                checked: !!n,
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
function bn(t) {
  const [e, a] = X(!1), [r, n] = X(""), s = t.availableGroupings ?? za, i = La(
    s,
    t.defaultGrouping,
    t.defaultGroupByOpenTabs
  ), [l, c] = X(i), [m, h] = X(!1), v = xt(null), S = K((w) => {
    a(w), w || n("");
  }, []);
  fe(() => {
    if (!e) return;
    const w = window.requestAnimationFrame(() => {
      const p = v.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(w);
  }, [e]);
  const u = Ta(t.localizedStrings), b = Q(() => t.mode === "project" ? ft({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? ft({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : ft({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), g = Q(() => {
    const w = r.trim().toLowerCase();
    let p = b;
    return w && (p = p.filter(
      (y) => y.shortName.toLowerCase().includes(w) || y.fullName.toLowerCase().includes(w) || (y.language ?? "").toLowerCase().includes(w) || (y.languageCode ?? "").toLowerCase().includes(w)
    )), t.mode === "project-multi" && m && (p = p.filter((y) => y.isSelected)), p;
  }, [b, r, t.mode, m]), N = Q(
    () => new Map(t.projects.map((w) => [F(w.id), w])),
    [t.projects]
  ), { renderProjectIndicator: A } = t, $ = K(
    (w) => {
      if (!A) return;
      const p = N.get(F(w.projectId));
      return p ? A(p) : void 0;
    },
    [A, N]
  ), { lastUsedRecentSectionHeading: Y } = u, { lastUsedOtherSectionHeading: B } = u, { languageUnknownSectionHeading: P } = u, { versificationUnknownSectionHeading: M } = u, { typeUnknownSectionHeading: H } = u, { customUnmatchedSectionHeading: x } = u, _ = Q(() => {
    switch (l) {
      case "openTabs":
        return Dt(g, !0);
      case "lastUsed":
        return ka(
          g,
          Y,
          B
        );
      case "language":
        return xa(g, P);
      case "versification":
        return va(
          g,
          t.priorityVersificationId,
          M
        );
      case "type":
        return ya(g, H);
      case "custom":
        return Ca(
          g,
          t.customSections ?? [],
          N,
          x
        );
      case "none":
      default:
        return Dt(g, !1);
    }
  }, [
    g,
    l,
    t.customSections,
    N,
    t.priorityVersificationId,
    M,
    P,
    Y,
    B,
    H,
    x
  ]), C = Q(() => {
    if (t.mode !== "project-multi") return [];
    const w = [];
    return t.projects.forEach((p) => {
      const y = t.openTabs.filter(
        (k) => F(k.projectId) === F(p.id)
      );
      if (y.length === 0) {
        w.push({ projectId: p.id });
        return;
      }
      const E = /* @__PURE__ */ new Set();
      y.forEach((k) => {
        E.has(k.scrollGroupId) || (E.add(k.scrollGroupId), w.push({ projectId: p.id, scrollGroupId: k.scrollGroupId }));
      });
    }), w;
  }, [t.mode, t.projects, t.openTabs]), R = (w) => {
    if (w.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(w.projectId, w.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(w.projectId, w.scrollGroupId);
    }
  }, O = (w) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: w.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, y = (k) => k.projectId === w.projectId && k.scrollGroupId === w.scrollGroupId, E = p.some(y) ? p.filter((k) => !y(k)) : [...p, { projectId: w.projectId, scrollGroupId: w.scrollGroupId }];
        t.onChangeSelection({ pairs: E }), E.length === 0 && m && h(!1);
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
  }, V = () => {
    if (t.mode !== "project-multi") return;
    const w = t.selection.pairs, p = new Set(w.map((E) => `${E.projectId}:${E.scrollGroupId ?? ""}`)), y = [...w];
    C.forEach((E) => {
      const k = `${E.projectId}:${E.scrollGroupId ?? ""}`;
      p.has(k) || (p.add(k), y.push(E));
    }), t.onChangeSelection({ pairs: y });
  }, lt = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), m && h(!1));
  }, Z = Q(() => {
    switch (t.mode) {
      case "project": {
        const w = t.projects.find((y) => y.id === t.selection.projectId);
        let p = w ? w.shortName : t.buttonPlaceholder ?? "";
        return w && t.triggerLabelFormat === "shortNameAndFullName" && w.fullName && w.fullName !== w.shortName && (p = `${w.shortName} - ${w.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: w } = t.selection;
        if (w.length === 0) {
          const k = t.buttonPlaceholder ?? "";
          return { node: k, title: k };
        }
        const p = [];
        if (w.forEach((k) => {
          const rt = t.projects.find((se) => se.id === k.projectId);
          rt && p.push({ project: rt, scrollGroupId: k.scrollGroupId });
        }), p.length === 0) {
          const k = t.buttonPlaceholder ?? "";
          return { node: k, title: k };
        }
        if (t.getSelectedText) {
          const k = t.getSelectedText(p);
          return { node: k, title: k };
        }
        const y = p.map(
          ({ project: k, scrollGroupId: rt }) => rt === void 0 ? k.shortName : `${k.shortName} (${it(rt)})`
        ).join(", ");
        if (p.length === 1) return { node: y, title: y };
        const E = p.length.toString();
        return {
          node: /* @__PURE__ */ f(pt, { children: [
            /* @__PURE__ */ o(ct, { variant: "muted", className: "tw:shrink-0", children: E }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: y })
          ] }),
          title: `${E} ${y}`
        };
      }
      case "projectScrollGroup": {
        const w = t.projects.find((E) => E.id === t.selection.projectId);
        if (!w) {
          const E = t.buttonPlaceholder ?? "";
          return { node: E, title: E };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: w.shortName, title: w.shortName };
        const y = `${w.shortName} · ${it(p)}`;
        return { node: y, title: y };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let at;
  t.isLoading ? at = /* @__PURE__ */ o(Ne, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? at = void 0 : t.mode === "project-multi" ? at = /* @__PURE__ */ o(Bt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : at = /* @__PURE__ */ o(ve, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const ne = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? R : void 0, It = /* @__PURE__ */ f(
    j,
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof Z.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: Z.node }) : Z.node }),
        at
      ]
    }
  ), oe = Z.title ? /* @__PURE__ */ o(Ct, { delayDuration: 400, children: /* @__PURE__ */ f(Zt, { children: [
    /* @__PURE__ */ o(qt, { asChild: !0, children: /* @__PURE__ */ o(bt, { asChild: !0, children: It }) }),
    /* @__PURE__ */ o(Yt, { children: Z.title })
  ] }) }) : /* @__PURE__ */ o(bt, { asChild: !0, children: It });
  return /* @__PURE__ */ f(Jt, { open: e, onOpenChange: S, children: [
    oe,
    /* @__PURE__ */ o(
      Wt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: d("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ o(Ct, { delayDuration: 400, children: /* @__PURE__ */ f(Ut, { shouldFilter: !1, children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
              $t,
              {
                value: r,
                onValueChange: n,
                placeholder: u.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.hideFilterMenu && (s.length > 0 || t.mode === "project-multi") && /* @__PURE__ */ o(
              Ba,
              {
                availableGroupings: s,
                activeGrouping: l,
                defaultGrouping: i,
                onChangeGrouping: c,
                showSelectedOnly: t.mode === "project-multi" ? m : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? h : void 0,
                strings: u
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ o(j, { variant: "ghost", size: "sm", onClick: V, children: `${u.selectAll} (${C.length.toString()})` }),
            /* @__PURE__ */ o(j, { variant: "ghost", size: "sm", onClick: lt, children: `${u.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ f(Ht, { children: [
            /* @__PURE__ */ o(Vt, { children: t.commandEmptyMessage ?? "No projects found" }),
            _.map((w, p) => (
              // Grouping schemes emit several sections of the same `kind`, so the key needs more
              // than that: custom sections carry an explicit `id`, and the rest are distinguished
              // by their heading label.
              /* @__PURE__ */ f(pe, { children: [
                /* @__PURE__ */ o(Ft, { heading: Pa(w, u), children: w.rows.map((y) => /* @__PURE__ */ o(
                  Da,
                  {
                    row: y,
                    mode: t.mode,
                    strings: u,
                    onClick: O,
                    onOpen: ne,
                    selectedRowRef: v,
                    indicator: $(y),
                    reserveIndicatorSlot: !!t.renderProjectIndicator
                  },
                  y.rowKey
                )) }),
                p < _.length - 1 && /* @__PURE__ */ o(Ve, {})
              ] }, w.id ?? `${w.kind}:${w.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function Pa(t, e) {
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
const Ma = Ot(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: s = !1, id: i }, l) => {
    const c = U();
    return /* @__PURE__ */ f(
      "div",
      {
        id: i,
        className: d("tw:relative tw:@container/search", { "tw:w-full": r }, n),
        children: [
          /* @__PURE__ */ o(
            xe,
            {
              className: d(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": c === "rtl" },
                { "tw:left-3": c === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            je,
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
            j,
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
                /* @__PURE__ */ o(ye, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Ma.displayName = "SearchBar";
const _a = 5;
function Nn(t) {
  return Xe(t).filter(
    (e) => !G.isObsolete(G.bookIdToNumber(e))
  );
}
function ja(t, e) {
  return t.filter((a) => {
    try {
      return Ee(a) === e;
    } catch {
      return !1;
    }
  });
}
const vn = (t, e, a) => ja(t, e).every((r) => a.includes(r));
function Ua(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => G.bookIdToNumber(r) > 0).sort((r, n) => G.bookIdToNumber(r) - G.bookIdToNumber(n)).map((r) => Ze(r, e));
}
function xn(t, e, a, r) {
  if (t.length === 0) return;
  const n = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === n.size && [...s].every((l) => n.has(l)))
    return a;
  const i = Ua(t, r);
  if (i.length !== 0)
    return i.length <= _a ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function yn({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: d("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
function $a({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ha({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const Va = W(
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
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Va({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function kn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ka({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ja({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function In({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: n = "alert",
  className: s
}) {
  return /* @__PURE__ */ f($a, { className: d(s), role: n, children: [
    /* @__PURE__ */ f(Ha, { children: [
      /* @__PURE__ */ o(Fa, { variant: "icon", children: r ?? /* @__PURE__ */ o(ke, {}) }),
      /* @__PURE__ */ o(Ka, { children: t })
    ] }),
    a && /* @__PURE__ */ o(Ja, { children: /* @__PURE__ */ o(j, { onClick: () => a(), children: e }) })
  ] });
}
const Xa = Ot(({ className: t, ...e }, a) => /* @__PURE__ */ o(Ie, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
Xa.displayName = "Spinner";
const Wa = W(
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
function Sn({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Wa({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function Cn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function En({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Tn({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    yt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: d(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...n
    }
  );
}
function dt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function zn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    yt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: dt(t),
      minSize: dt(e),
      maxSize: dt(a),
      collapsedSize: dt(r),
      ...n
    }
  );
}
function Gn({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    yt.Separator,
    {
      "data-slot": "resizable-handle",
      className: d(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  rn as $,
  Ar as A,
  j as B,
  Kt as C,
  fr as D,
  $r as E,
  Hr as F,
  Fr as G,
  Kr as H,
  Cr as I,
  qr as J,
  ct as K,
  Mr as L,
  na as M,
  oa as N,
  sa as O,
  Jt as P,
  an as Q,
  _r as R,
  Qe as S,
  Ct as T,
  Xr as U,
  Tt as V,
  da as W,
  ia as X,
  ln as Y,
  Re as Z,
  cn as _,
  Ze as a,
  un as a$,
  nn as a0,
  dn as a1,
  on as a2,
  Zr as a3,
  la as a4,
  Et as a5,
  wn as a6,
  hn as a7,
  Mt as a8,
  je as a9,
  He as aA,
  Sn as aB,
  En as aC,
  Cn as aD,
  Vr as aE,
  hr as aF,
  xr as aG,
  _e as aH,
  Me as aI,
  pr as aJ,
  Yr as aK,
  $a as aL,
  Ja as aM,
  Ka as aN,
  Ha as aO,
  Fa as aP,
  yn as aQ,
  kn as aR,
  gn as aS,
  Pr as aT,
  Or as aU,
  Br as aV,
  Gn as aW,
  zn as aX,
  Tn as aY,
  In as aZ,
  Xa as a_,
  nt as aa,
  Ve as ab,
  yr as ac,
  pn as ad,
  mn as ae,
  fn as af,
  Rr as ag,
  pa as ah,
  bn as ai,
  dr as aj,
  Ma as ak,
  Nn as al,
  ja as am,
  zr as an,
  vn as ao,
  Lr as ap,
  Nr as aq,
  We as ar,
  Qr as as,
  tn as at,
  Wr as au,
  en as av,
  te as aw,
  wt as ax,
  mt as ay,
  Ue as az,
  Zt as b,
  sn as b0,
  wr as b1,
  ur as b2,
  Be as b3,
  Oe as b4,
  cr as b5,
  ra as b6,
  ta as b7,
  _t as b8,
  Jr as b9,
  Er as ba,
  Pe as bb,
  fa as bc,
  ba as bd,
  mr as be,
  xn as bf,
  d as c,
  qt as d,
  Yt as e,
  bt as f,
  Gr as g,
  Wt as h,
  Ut as i,
  Ht as j,
  Ft as k,
  Ir as l,
  Sr as m,
  Dr as n,
  Je as o,
  Tr as p,
  $t as q,
  U as r,
  Vt as s,
  jr as t,
  qe as u,
  gr as v,
  br as w,
  kr as x,
  vr as y,
  Ur as z
};
//# sourceMappingURL=resizable-ylks4EQ1.js.map
