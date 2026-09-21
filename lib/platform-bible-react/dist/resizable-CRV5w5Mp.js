import { jsx as r, jsxs as p, Fragment as ve } from "react/jsx-runtime";
import { Slot as kt, Dialog as V, Separator as Ne, Popover as it, Tooltip as at, DropdownMenu as E, Label as xe, RadioGroup as Nt, ToggleGroup as Jt } from "radix-ui";
import { IconX as ye, IconCheck as _t, IconSearch as Se, IconChevronRight as Ie } from "@tabler/icons-react";
import { Canon as z } from "@sillsdev/scripture";
import { cva as q } from "class-variance-authority";
import C, { createContext as Xt, useContext as Zt, useState as K, useRef as pt, useCallback as Z, useMemo as Q, useEffect as Dt, Fragment as ke, forwardRef as qt } from "react";
import { ChevronsUpDown as Wt, Check as Yt, Star as _e, Group as Ee, ArrowRight as Te, Loader2 as Ce, ChevronDown as ze, Search as Ae, X as je, AlertTriangle as Ge, LoaderCircle as Le } from "lucide-react";
import { Section as Y, MODIFIER_KEYS as Re, normalizeProjectId as D, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as nt, getLocalizeKeyForScrollGroupId as Oe, getSectionForBook as De } from "platform-bible-utils";
import { filterAndRankItems as Pt } from "@eten-tech-foundation/platform-editor";
import { Command as et } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Et from "react-resizable-panels";
import { clsx as Pe } from "clsx";
import { extendTailwindMerge as Be, twMerge as Me } from "tailwind-merge";
const He = Be({ prefix: "tw" });
function xt(t) {
  const e = [];
  let a = "", o = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    s === "[" ? o += 1 : s === "]" && (o -= 1), s === ":" && o === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function Ue(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = xt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== a), `-${s}`].join(":")}`, original: t };
  }
  const o = e.findIndex((s) => s.startsWith("!tw-"));
  if (o !== -1) {
    const s = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((u, m) => m !== o), `!${s}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const s = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function $e(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = xt(t);
  if (a[0] !== "tw") return t;
  const o = a.slice(1, -1), n = a[a.length - 1], s = xt(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
  if (i && n.startsWith("-")) {
    const u = n.slice(1);
    return [...o, `-tw-${u}`].join(":");
  }
  if (l && n.startsWith("!")) {
    const u = n.slice(1);
    return [...o, `!tw-${u}`].join(":");
  }
  return [...o, `tw-${n}`].join(":");
}
function d(...t) {
  const e = Pe(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return He(e);
  const a = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), n = [];
  return a.forEach((u) => {
    const m = Ue(u);
    o.set(m.normalized, m.original), n.push(m.normalized);
  }), Me(n.join(" ")).split(" ").filter(Boolean).map((u) => {
    const m = o.get(u);
    return m ? $e(u, m) : u;
  }).join(" ");
}
const Qt = 600, te = 650, No = 400, Fe = 450, Ke = 500, Ve = 675, xo = 690, yo = 700, So = 800, ee = q(
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
function U({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: o = !1,
  ...n
}) {
  const s = o ? kt.Root : "button";
  return /* @__PURE__ */ r(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: d(ee({ variant: e, size: a, className: t })),
      ...n
    }
  );
}
const ae = "layoutDirection";
function oe() {
  return globalThis.localStorage ?? void 0;
}
function M() {
  var t;
  try {
    const e = (t = oe()) == null ? void 0 : t.getItem(ae);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Io(t) {
  var e;
  try {
    (e = oe()) == null || e.setItem(ae, t);
  } catch {
  }
}
function ko({ ...t }) {
  return /* @__PURE__ */ r(V.Root, { "data-slot": "dialog", ...t });
}
function _o({ ...t }) {
  return /* @__PURE__ */ r(V.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Je({ ...t }) {
  return /* @__PURE__ */ r(V.Portal, { "data-slot": "dialog-portal", ...t });
}
function Eo({ ...t }) {
  return /* @__PURE__ */ r(V.Close, { "data-slot": "dialog-close", ...t });
}
function Xe({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ r(
    V.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: d(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Fe, ...e },
      ...a
    }
  );
}
function To({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...s
}) {
  const i = M();
  return /* @__PURE__ */ p(Je, { children: [
    /* @__PURE__ */ r(Xe, { className: o }),
    /* @__PURE__ */ p(
      V.Content,
      {
        "data-slot": "dialog-content",
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ke, ...n },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ r(V.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(U, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ r(ye, {}),
            /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Co({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function zo({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...o
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dialog-footer",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...o,
      children: [
        a,
        e && /* @__PURE__ */ r(V.Close, { asChild: !0, children: /* @__PURE__ */ r(U, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ao({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    V.Title,
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
function jo({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    V.Description,
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
function Ze({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ r(
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
function qe({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
const We = q(
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
function Ye({
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
    /* @__PURE__ */ r(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: d(We({ align: e }), t),
        onClick: (o) => {
          var n, s;
          o.target instanceof HTMLElement && o.target.closest("button") || (s = (n = o.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
q("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function re({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    et,
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
function ne({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...o
}) {
  const n = M(), s = C.useCallback(
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
    /* @__PURE__ */ r("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ p(qe, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ r(
        et.Input,
        {
          "data-slot": "command-input",
          className: d(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...o
        }
      ),
      /* @__PURE__ */ r(Ye, { children: /* @__PURE__ */ r(Se, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function se({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    et.List,
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
function ie({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    et.Empty,
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
function le({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    et.Group,
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
function Bt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    et.Separator,
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
function Tt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    et.Item,
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
        /* @__PURE__ */ r(_t, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Go({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
const Qe = [
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
], ta = (t) => {
  var e;
  return ((e = Qe[t]) == null ? void 0 : e.chapters) ?? -1;
}, ea = z.allBookIds.filter(
  (t) => !z.isObsolete(z.bookIdToNumber(t))
);
function aa(t) {
  const e = [], a = Math.min(t.length, z.allBookIds.length);
  for (let o = 0; o < a; o += 1)
    t[o] === "1" && e.push(z.bookNumberToId(o + 1));
  return e;
}
function v(t) {
  return `%scrollGroup_${t}%`;
}
const oa = {
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
function Ct(t, e) {
  return ta(z.bookIdToNumber(t));
}
function ft(t, e, a) {
  const o = z.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = z.bookIdToNumber(i);
    (a === "next" ? l > o && l < s : l < o && l > s) && (n = i, s = l);
  }), n;
}
function Lo(t, e, a) {
  const { book: o, chapterNum: n } = t;
  if (e.includes(o) && n > 1)
    return { book: o, chapterNum: n - 1, verseNum: 1 };
  const s = ft(o, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Ct(s), 1),
      verseNum: 1
    };
}
function Ro(t, e, a) {
  const { book: o, chapterNum: n } = t;
  if (e.includes(o) && n < Ct(o))
    return { book: o, chapterNum: n + 1, verseNum: 1 };
  const s = ft(o, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Oo(t, e, a) {
  const { book: o, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return s > 1 ? { book: o, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: o, chapterNum: 1, verseNum: 0 } : { book: o, chapterNum: n, verseNum: 0 };
  if (e === void 0) return;
  const i = ft(o, e, "previous");
  if (!i) return;
  const l = Math.max(Ct(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Do(t, e, a) {
  const { book: o, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return { book: o, chapterNum: n, verseNum: s + 1 };
  const i = ft(o, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Po(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Bo = (t, e, a, o, n) => {
  switch (t) {
    case Y.OT:
      return e ?? "Old Testament";
    case Y.NT:
      return a ?? "New Testament";
    case Y.DC:
      return o ?? "Deuterocanon";
    case Y.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Mo = (t, e, a, o, n) => {
  switch (t) {
    case Y.OT:
      return e ?? "OT";
    case Y.NT:
      return a ?? "NT";
    case Y.DC:
      return o ?? "DC";
    case Y.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ho(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? z.bookIdToEnglishName(t);
}
function ra(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Uo = Object.fromEntries(
  ea.map((t) => [t, z.bookIdToEnglishName(t)])
);
function $o(t, e, a) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const n = z.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(o) || t.toLowerCase().includes(o) || (s ? s.localizedName.toLowerCase().includes(o) || s.localizedId.toLowerCase().includes(o) : !1));
}
const Mt = `
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
function na(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function lt(t, e) {
  const a = e ? `${Mt}, ${e}` : Mt;
  return Array.from(t.querySelectorAll(a)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && na(o)
  );
}
const Fo = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let yt = "keyboard", Ht = !1;
function Ko() {
  Ht || typeof document > "u" || (Ht = !0, document.addEventListener(
    "pointerdown",
    () => {
      yt = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      yt = "keyboard";
    },
    !0
  ));
}
function Vo() {
  return yt;
}
const de = "data-quiet-focus";
function Jo(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(de, ""), t.style.outline = "none"));
}
function Xo(t) {
  t && (t.removeAttribute(de), t.style.removeProperty("outline"));
}
const Zo = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function sa({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...o
}) {
  return /* @__PURE__ */ r(
    Ne.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const ia = q(
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
function qo({
  className: t,
  orientation: e,
  ...a
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        ia({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Wo({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const o = e ? kt.Root : "div";
  return /* @__PURE__ */ r(
    o,
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
function Yo({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ r(
    sa,
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
const Qo = "data-platform-content-zoom-root", tr = "data-platform-content-zoom-popup", la = "--platform-content-zoom-", da = "--platform-content-zoom-default", ca = "main", ua = "--platform-content-zoom-popup-factor", ce = Xt(void 0);
function er({ area: t, children: e }) {
  return /* @__PURE__ */ r(ce.Provider, { value: t ?? "", children: e });
}
function zt() {
  return Zt(ce);
}
function At(t) {
  const e = t || ca;
  return {
    [ua]: `var(${la}${e}, var(${da}, 1))`
  };
}
function ue({ ...t }) {
  return /* @__PURE__ */ r(it.Root, { "data-slot": "popover", ...t });
}
function St({ ...t }) {
  return /* @__PURE__ */ r(it.Trigger, { "data-slot": "popover-trigger", ...t });
}
const we = C.createContext(null);
function ar({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ r(we.Provider, { value: t, children: e });
}
function pe({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...n
}) {
  const s = M(), i = C.useContext(we), l = zt();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ r(it.Portal, { container: i ?? void 0, children: /* @__PURE__ */ r(
      it.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: d(
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
          // painting past its edges. Nothing portals into a PopoverContent (the portal-container
          // provider's consumers target dialog and dropdown-menu contents), so the scroll box clips
          // no nested pop-up.
          // CUSTOM: Falls back to 100vh until Radix's size middleware publishes the real available
          // height, so the measuring pass gets a real cap instead of an invalid var() computing to none
          l !== void 0 && "tw:max-h-[calc(var(--radix-popover-content-available-height,100vh)/var(--platform-content-zoom-popup-factor,1))] tw:overflow-y-auto",
          t
        ),
        style: {
          zIndex: Qt,
          ...l === void 0 ? void 0 : At(l),
          ...o
        },
        dir: s,
        "data-platform-content-zoom-root": l,
        "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
        ...n
      }
    ) })
  );
}
function or({ ...t }) {
  return /* @__PURE__ */ r(it.Anchor, { "data-slot": "popover-anchor", ...t });
}
function rr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "popover-header",
      className: d("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "popover-title",
      className: d("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function sr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "p",
    {
      "data-slot": "popover-description",
      className: d("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ut({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ r(
    at.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function jt({ ...t }) {
  return /* @__PURE__ */ r(at.Root, { "data-slot": "tooltip", ...t });
}
function Gt({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ r(
    at.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? d(ee({ variant: e }), t) : t,
      ...a
    }
  );
}
function Lt({
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
  arrowClassName: n,
  children: s,
  ...i
}) {
  const l = zt();
  return /* @__PURE__ */ r(at.Portal, { children: /* @__PURE__ */ p(
    at.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: {
        zIndex: Ve,
        ...l === void 0 ? void 0 : At(l),
        ...a
      },
      className: d(
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
        o && /* @__PURE__ */ r(
          at.Arrow,
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
function wa() {
  const [t, e] = K(!1), a = pt(null), o = Z(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), n = Z(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: o, onPointerLeave: n };
}
const me = Xt(void 0);
function ht() {
  const t = Zt(me);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const gt = q("", {
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
function pa({ variant: t = "default", ...e }) {
  const a = M(), o = C.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(me.Provider, { value: o, children: /* @__PURE__ */ r(E.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function ir({
  ...t
}) {
  return /* @__PURE__ */ r(E.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ma({
  ...t
}) {
  return /* @__PURE__ */ r(E.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
const fa = "min(8rem, calc(max(var(--radix-dropdown-menu-content-available-width, 100vw), 8rem) / var(--platform-content-zoom-popup-factor, 1)))";
function ha({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  children: n,
  ...s
}) {
  const i = M(), l = zt();
  return /* @__PURE__ */ r(E.Portal, { children: /* @__PURE__ */ r(
    E.Content,
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
        zIndex: Qt,
        ...l === void 0 ? void 0 : At(l),
        ...l === void 0 ? void 0 : { minWidth: fa },
        ...o
      },
      "data-platform-content-zoom-root": l,
      "data-platform-content-zoom-popup": l === void 0 ? void 0 : "",
      ...s,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
}
function lr({ ...t }) {
  return /* @__PURE__ */ r(E.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function dr({
  className: t,
  inset: e,
  variant: a = "default",
  ...o
}) {
  const n = M(), s = ht();
  return /* @__PURE__ */ r(
    E.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: d(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: s.variant })
      ),
      dir: n,
      ...o
    }
  );
}
function cr({
  className: t,
  children: e,
  checked: a,
  inset: o,
  ...n
}) {
  const s = M(), i = ht();
  return /* @__PURE__ */ p(
    E.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...n,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ r(E.ItemIndicator, { children: /* @__PURE__ */ r(_t, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ga({
  ...t
}) {
  return /* @__PURE__ */ r(E.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function $t({
  className: t,
  children: e,
  inset: a,
  ...o
}) {
  const n = M(), s = ht();
  return /* @__PURE__ */ p(
    E.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: s.variant })
      ),
      dir: n,
      ...o,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ r(E.ItemIndicator, { children: /* @__PURE__ */ r(_t, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ba({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ r(
    E.Label,
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
function va({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    E.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: d("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function ur({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function wr({ ...t }) {
  return /* @__PURE__ */ r(E.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function pr({
  className: t,
  inset: e,
  children: a,
  ...o
}) {
  const n = ht();
  return /* @__PURE__ */ p(
    E.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: d(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        gt({ variant: n.variant })
      ),
      ...o,
      children: [
        a,
        /* @__PURE__ */ r(Ie, { className: "tw:ms-auto" })
      ]
    }
  );
}
function mr({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: a,
  ...o
}) {
  const n = M();
  return /* @__PURE__ */ r(
    E.SubContent,
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
      style: { zIndex: te, ...e },
      ...o,
      children: /* @__PURE__ */ r("div", { dir: n, children: a })
    }
  );
}
function fr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    xe.Root,
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
function hr({
  className: t,
  ...e
}) {
  const a = M();
  return /* @__PURE__ */ r(
    Nt.Root,
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
function gr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Nt.Item,
    {
      "data-slot": "radio-group-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ r(
        Nt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ r("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Na = q(
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
), fe = C.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function br({
  className: t,
  variant: e,
  size: a,
  spacing: o = 0,
  orientation: n = "horizontal",
  children: s,
  ...i
}) {
  const l = M();
  return /* @__PURE__ */ r(
    Jt.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": o,
      "data-orientation": n,
      style: { "--gap": o },
      className: d(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: l,
      ...i,
      children: /* @__PURE__ */ r(
        fe.Provider,
        {
          value: C.useMemo(
            () => ({ variant: e, size: a, spacing: o, orientation: n }),
            [e, a, o, n]
          ),
          children: s
        }
      )
    }
  );
}
function vr({
  className: t,
  children: e,
  variant: a = "default",
  size: o = "default",
  ...n
}) {
  const s = C.useContext(fe);
  return /* @__PURE__ */ r(
    Jt.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || o,
      "data-spacing": s.spacing,
      className: d(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Na({
          variant: s.variant || a,
          size: s.size || o
        }),
        t
      ),
      ...n,
      children: e
    }
  );
}
function Nr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function xr() {
  return /Windows/i.test(navigator.userAgent);
}
const xa = ["input", "select", "textarea", "button"], ya = ["button", "textbox"], yr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: o
}) => {
  const n = pt(null), [s, i] = K(void 0), [l, u] = K(void 0), m = Z(
    (w) => {
      i(w);
      const g = t.find((h) => h.id === w);
      g && (e == null || e(g));
      const N = document.getElementById(w);
      N && (N.scrollIntoView({ block: "center" }), N.focus()), n.current && n.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = Z(
    (w) => {
      const g = t.find((N) => N.id === w);
      g && (u((N) => N === w ? void 0 : w), a == null || a(g));
    },
    [a, t]
  ), I = (w) => {
    if (!w) return !1;
    const g = w.tagName.toLowerCase();
    if (w.isContentEditable || xa.includes(g)) return !0;
    const N = w.getAttribute("role");
    if (N && ya.includes(N)) return !0;
    const h = w.getAttribute("tabindex");
    return h !== void 0 && h !== "-1";
  }, k = Z(
    (w) => {
      var L;
      const g = w.target, N = (x) => x ? document.getElementById(x) : void 0, h = N(l), $ = N(s);
      if (!!(h && g && h.contains(g) && g !== h) && I(g)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const x = t.find((B) => B.id === l);
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
          const B = x.findIndex((P) => P === g);
          if (B === -1) return;
          let S;
          w.key === "ArrowDown" ? S = Math.min(B + 1, x.length - 1) : S = Math.max(B - 1, 0), S !== B && (w.preventDefault(), w.stopPropagation(), (L = x[S]) == null || L.focus());
          return;
        }
        return;
      }
      const X = t.findIndex((x) => x.id === s);
      let G = X;
      switch (w.key) {
        case "ArrowDown":
          G = Math.min(X + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          G = Math.max(X - 1, 0), w.preventDefault();
          break;
        case "Home":
          G = 0, w.preventDefault();
          break;
        case "End":
          G = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const x = $;
          if (x) {
            const B = x.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = x.querySelector(
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
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (I(g) || (o == null || o(w.key), w.preventDefault()));
          return;
      }
      const H = t[G];
      H && m(H.id);
    },
    [t, m, s, l, f, o]
  );
  return {
    listboxRef: n,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: k,
    /** Focus an option by its ID */
    focusOption: m
  };
}, Sa = q(
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
function mt({ className: t, variant: e = "default", asChild: a = !1, ...o }) {
  const n = a ? kt.Root : "span";
  return /* @__PURE__ */ r(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Sa({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "skeleton",
      className: d("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Ir({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...o
}) {
  const n = C.useRef(null);
  C.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), C.useEffect(() => {
    const i = n.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        lt(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
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
    const { current: l } = n;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), lt(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ r(
      "div",
      {
        "data-slot": "table-container",
        className: d("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ r(
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
            ...o
          }
        )
      }
    )
  );
}
function kr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ r(
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
function _r({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "tbody",
    {
      "data-slot": "table-body",
      className: d("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Er({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function Ia(t) {
  C.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const n = t.current ? lt(t.current) : [], s = n.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < n.length && n[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
function ka(t, e, a) {
  let o;
  return a === "ArrowLeft" && e > 0 ? o = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function _a(t, e, a) {
  let o;
  return a === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : a === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Tr({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: o = !1,
  ref: n,
  ...s
}) {
  const i = C.useRef(null);
  C.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), Ia(i);
  const l = C.useMemo(
    () => i.current ? lt(i.current) : [],
    [i]
  ), u = C.useCallback(
    (f) => {
      const { current: I } = i;
      if (!I || !I.parentElement) return;
      const k = I.closest("table"), w = k ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        lt(k).filter(
          (h) => h.tagName === "TR"
        )
      ) : [], g = w.indexOf(I), N = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), _a(w, g, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), ka(l, N, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const h = I.closest("table");
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
  return /* @__PURE__ */ r(
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
function Cr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function zr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function Ar({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "caption",
    {
      "data-slot": "table-caption",
      className: d("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function jr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: o,
  hasToggleAllFeature: n = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: u,
  isOpen: m = void 0,
  onOpenChange: f = void 0,
  isDisabled: I = !1,
  sortSelected: k = !1,
  icon: w = void 0,
  className: g = void 0,
  variant: N = "ghost",
  id: h
}) {
  const [$, J] = K(!1), W = Z(
    (S) => {
      var _;
      const P = (_ = t.find((F) => F.label === S)) == null ? void 0 : _.value;
      P && a(
        e.includes(P) ? e.filter((F) => F !== P) : [...e, P]
      );
    },
    [t, e, a]
  ), X = () => u || o, G = Q(() => {
    if (!k) return t;
    const S = t.filter((_) => _.starred).sort((_, F) => _.label.localeCompare(F.label)), P = t.filter((_) => !_.starred).sort((_, F) => {
      const rt = e.includes(_.value), ct = e.includes(F.value);
      return rt && !ct ? -1 : !rt && ct ? 1 : _.label.localeCompare(F.label);
    });
    return [...S, ...P];
  }, [t, e, k]), H = () => {
    a(t.map((S) => S.value));
  }, L = () => {
    a([]);
  }, x = m ?? $;
  return /* @__PURE__ */ r("div", { id: h, className: g, children: /* @__PURE__ */ p(ue, { open: x, onOpenChange: f ?? J, children: [
    /* @__PURE__ */ r(St, { asChild: !0, children: /* @__PURE__ */ p(
      U,
      {
        variant: N,
        role: "combobox",
        "aria-expanded": x,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: I,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            w && /* @__PURE__ */ r("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ r("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: w }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: d(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: X()
              }
            )
          ] }),
          /* @__PURE__ */ r(Wt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(pe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(re, { children: [
      /* @__PURE__ */ r(
        ne,
        {
          placeholder: `Search ${o.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      n && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ r(U, { variant: "ghost", size: "sm", onClick: H, children: s }),
        /* @__PURE__ */ r(U, { variant: "ghost", size: "sm", onClick: L, children: i })
      ] }),
      /* @__PURE__ */ p(se, { children: [
        /* @__PURE__ */ r(ie, { children: l }),
        /* @__PURE__ */ r(le, { children: G.map((S) => /* @__PURE__ */ p(
          Tt,
          {
            value: S.label,
            onSelect: W,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Yt,
                {
                  className: d(
                    "tw:h-4 tw:w-4",
                    e.includes(S.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ r(_e, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ r("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
            ]
          },
          S.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function st(t) {
  return t.replace(/^\+/, "");
}
function Ea(t, e, a) {
  if (!e) return [...t];
  const o = [...t], n = st(e).toLowerCase();
  return a === "passive" ? Pt({
    query: n,
    items: o,
    filter: (s) => st(s.label).toLowerCase().startsWith(n),
    sortBy: "label"
  }) : Pt({
    query: n,
    items: o,
    filter: (s) => st(s.label).toLowerCase().includes(n),
    sortBy: "label"
  });
}
function Ta(t) {
  return t.isComposing || t.keyCode === 229;
}
const he = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, Ca = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], za = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Aa(t) {
  return [
    ...Ca,
    ...za.filter((e) => he[t].test(e))
  ];
}
function O(t) {
  t.preventDefault(), t.stopPropagation();
}
function Gr(t, e, a) {
  var n, s;
  const { kind: o } = e;
  if (o === "enter")
    return t.key === "Enter" ? (O(t), a.commit(), "ended") : t.key === "Escape" ? (O(t), a.dismiss(), "ended") : "passed";
  if (Ta(t) || Re.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && O(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return O(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return O(t), Ea(
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
    const i = st(e.filter).toLowerCase(), l = e.items.find(
      (u) => st(u.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? o === "selection" && e.filter === "" ? (O(t), a.dismiss(), "ended") : (O(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && o === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (O(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (O(t), a.dismiss(), "ended") : t.key === "Backspace" || he[o].test(t.key) ? (O(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (o === "selection" && O(t), a.dismiss(), "ended");
}
function Lr(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function Rr(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: o,
    sessionCounterRef: n,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: m,
    focusEditor: f,
    applyItem: I,
    onShowError: k
  } = t;
  n.current += 1;
  const w = n.current, g = a ? "backslash" : "selection", N = { kind: g, token: w, filter: "", items: e };
  g === "backslash" && o && (N.shouldSpaceCommit = o), s(N), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: Aa(g),
    onKey: (h) => l(h)
  }).then((h) => {
    if (i(w), h !== void 0) {
      m(), f();
      const $ = e.find((J) => J.marker === h);
      $ && I($);
    } else a || f();
  }).catch((h) => {
    i(w), a || f(), k(h);
  });
}
function Or({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function Dr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: d("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function ja(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const o = D(a.projectId), n = e.get(o), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    n ? n.some((i) => i.scrollGroupId === a.scrollGroupId) || n.push(s) : e.set(o, [s]);
  }), e.forEach((a) => a.sort((o, n) => o.scrollGroupId - n.scrollGroupId)), e;
}
function Ft(t, e, a) {
  const o = D(e);
  return t.some(
    (n) => D(n.projectId) === o && n.scrollGroupId === a
  );
}
function bt(t) {
  const e = ja(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId === void 0 ? void 0 : D(t.selection.projectId);
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
        isSelected: n !== void 0 && n === D(s.id),
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
  return t.projects.forEach((n) => {
    const s = e.get(D(n.id));
    if (!s || s.length === 0) {
      o.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Ft(a, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
      return;
    }
    s.forEach((i) => {
      o.push({
        rowKey: `tab:${n.id}:${i.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Ft(a, n.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
    });
  }), a.forEach((n) => {
    if (n.scrollGroupId === void 0) return;
    const s = D(n.projectId);
    if (o.some(
      (l) => D(l.projectId) === s && l.scrollGroupId === n.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => D(l.id) === s);
    i && o.push({
      rowKey: `closed:${i.id}:${n.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      scrollGroupId: n.scrollGroupId,
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
const Rt = "Selected", Ot = "Unselected";
function Kt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function tt(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - n;
}
function It(t) {
  return [{ kind: "flat", rows: [...t].sort(tt) }];
}
function Ga(t) {
  const e = t.filter(Kt).sort(tt), a = t.filter((n) => !Kt(n)).sort(tt);
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const o = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && o.push({ kind: "other", rows: a }), o;
}
function La(t, e) {
  const a = t.filter((i) => i.isSelected).sort(tt), o = t.filter((i) => !i.isSelected).sort(tt), n = (i, l) => {
    var m;
    const u = (m = e.getSectionHeading) == null ? void 0 : m.call(
      e,
      i,
      l.map((f) => f.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? Rt : Ot;
  }, s = [];
  return a.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: n("selected", a),
    rows: a
  }), o.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: n("unselected", o),
    rows: o
  }), s;
}
function Ra(t, e) {
  if (e.id === "openTabs") return Ga(t);
  if (e.id === "selection") return La(t, e);
  if (!e.getGroupKey) return It(t);
  const a = /* @__PURE__ */ new Map(), o = [], { getGroupKey: n } = e;
  t.forEach((l) => {
    const u = n(l.project);
    if (u === void 0 || u === "") {
      o.push(l);
      return;
    }
    const m = a.get(u);
    m ? m.push(l) : a.set(u, [l]);
  });
  const s = [...a.entries()].map(([l, u]) => {
    var I;
    const m = [...u].sort(
      (k, w) => {
        var g;
        return ((g = e.compareProjects) == null ? void 0 : g.call(e, k.project, w.project)) || tt(k, w);
      }
    ), f = ((I = e.getSectionHeading) == null ? void 0 : I.call(
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
    rows: [...o].sort(tt)
  }), i;
}
const Pr = [
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
function y(t, e) {
  const a = t[e];
  return typeof a == "string" ? a : void 0;
}
const ut = "recent", Oa = "other";
function ge(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Da(t) {
  const e = t ?? {};
  return [
    ge(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (a) => {
        var o;
        return typeof ((o = a.customData) == null ? void 0 : o[nt.lastUsedAt]) == "number" ? ut : Oa;
      },
      getSectionHeading: (a) => a === ut ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, o) => a.key === ut ? -1 : o.key === ut ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (a) => {
        var n;
        const o = (n = a.customData) == null ? void 0 : n[nt.language];
        return typeof o == "string" ? o : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (a) => {
        var n;
        const o = (n = a.customData) == null ? void 0 : n[nt.type];
        return typeof o == "string" ? o : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (a, o) => {
        var i;
        const n = o.find(
          (l) => {
            var u;
            return typeof ((u = l.customData) == null ? void 0 : u[nt.typeName]) == "string";
          }
        ), s = (i = n == null ? void 0 : n.customData) == null ? void 0 : i[nt.typeName];
        return typeof s == "string" && s.length > 0 ? s : a;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Br = Da();
function Pa(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (a) => a === "selected" ? e.selectedSectionHeading ?? Rt : e.unselectedSectionHeading ?? Ot
  };
}
function Mr(t) {
  return {
    openTabsLabel: y(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: y(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: y(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: y(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: y(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: y(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: y(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: y(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function Hr(t) {
  return {
    label: y(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const Ba = 100, Ma = {
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
  autoSelectionSelectedSectionHeading: Rt,
  autoSelectionUnselectedSectionHeading: Ot,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Ha(t) {
  return { ...Ma, ...t };
}
function Ur(t) {
  return {
    searchPlaceholder: y(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: y(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: y(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: y(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: y(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: y(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: y(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: y(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: y(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: y(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: y(t, "%projectSelector_openButtonLabel%"),
    clearAll: y(t, "%projectSelector_clearAll%")
  };
}
function dt(t) {
  return oa[Oe(t)] ?? String(t);
}
const Vt = "platform.footerAction", Ua = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function $a({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = dt(t);
  return e ? /* @__PURE__ */ r(
    mt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ua,
      children: a
    }
  ) : /* @__PURE__ */ r(mt, { variant: "secondary", children: a });
}
function Fa({
  row: t,
  mode: e,
  strings: a,
  onClick: o,
  onOpen: n,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: u,
    open: m,
    onPointerEnter: f,
    onPointerLeave: I
  } = wa(), [k, w] = K(!1), g = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, N = m || k, h = Z(() => {
    if (g) {
      w(!0);
      return;
    }
    f();
  }, [g, f]), $ = Z(() => {
    w(!1), I();
  }, [I]), J = /* @__PURE__ */ r(Yt, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let W;
  e === "project" ? t.openGroups.length > 0 && (W = /* @__PURE__ */ r("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((L) => /* @__PURE__ */ r(mt, { variant: "secondary", children: dt(L) }, L)) })) : t.scrollGroupId !== void 0 && (W = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ r(
      $a,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ p(
      U,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (L) => {
          L.stopPropagation(), n(t);
        },
        onMouseDown: (L) => L.stopPropagation(),
        "aria-label": a.openButtonLabel,
        children: [
          /* @__PURE__ */ r(Te, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const X = /* @__PURE__ */ p(
    Tt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: h,
      onPointerLeave: $,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      children: [
        /* @__PURE__ */ r("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: J }),
        l && /* @__PURE__ */ r("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ r("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ r("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        W
      ]
    }
  ), G = t.scrollGroupId !== void 0 ? dt(t.scrollGroupId) : void 0, H = t.isBoundButClosed && G ? a.boundButClosedTooltip.replace("{group}", G) : void 0;
  return /* @__PURE__ */ p(jt, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ r(Gt, { asChild: !0, children: X }),
    /* @__PURE__ */ p(
      Lt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        children: [
          /* @__PURE__ */ r("div", { className: "tw:font-semibold", children: t.fullName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && G && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              G,
              ")"
            ] })
          ] }),
          H && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic", children: H }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const ot = "none";
function Ka({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: o
}) {
  const n = e !== ot;
  return /* @__PURE__ */ p(pa, { children: [
    /* @__PURE__ */ p(jt, { children: [
      /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(ma, { asChild: !0, children: /* @__PURE__ */ r(
        U,
        {
          variant: "ghost",
          size: "sm",
          className: d(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            n && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": o.groupByAriaLabel,
          "aria-pressed": n,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ r(Ee, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ r(Lt, { children: o.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
      ha,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: te },
        children: [
          /* @__PURE__ */ r(ba, { children: o.groupSectionLabel }),
          /* @__PURE__ */ p(ga, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ r($t, { value: ot, children: o.groupByNone }),
            /* @__PURE__ */ r(va, {}),
            t.map((s) => /* @__PURE__ */ r($t, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Va(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === ot) return ot;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : ot;
}
function vt(t, e) {
  if (e === void 0) return;
  const a = D(e);
  return t.find((o) => D(o.id) === a);
}
function $r(t) {
  const [e, a] = K(!1), [o, n] = K(""), s = Ha(t.localizedStrings), i = Q(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const c = [];
    return t.openTabs.length > 0 && c.push(ge(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && c.push(
      Pa({
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
  ]), [l, u] = K(void 0), m = Q(
    () => Va(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = l ?? m, I = pt(null), [k, w] = K(void 0), g = Z((c) => {
    a(c), c || (n(""), w(void 0));
  }, []);
  Dt(() => {
    if (!e) return;
    const c = window.requestAnimationFrame(() => {
      const b = I.current;
      b && b.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(c);
  }, [e]);
  const N = Q(() => t.mode === "project" ? bt({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? bt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : bt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), h = Q(() => {
    const c = o.trim().toLowerCase();
    return c ? N.filter(
      (b) => b.shortName.toLowerCase().includes(c) || b.fullName.toLowerCase().includes(c)
    ) : N;
  }, [N, o]), $ = !!t.footerAction && h.length === 0, J = Q(() => {
    if (f === ot) return It(h);
    const c = i.find((b) => b.id === f);
    return c ? Ra(h, c) : It(h);
  }, [h, f, i]), W = (c) => {
    if (c.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
    }
  }, X = (c) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: c.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const b = t.selection.pairs, R = D(c.projectId), T = (j) => D(j.projectId) === R && j.scrollGroupId === c.scrollGroupId, A = b.some(T) ? b.filter((j) => !T(j)) : [
          ...b.filter((j) => !T(j)),
          { projectId: c.projectId, scrollGroupId: c.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: A });
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
  }, G = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, H = t.mode === "project" ? t.renderTriggerLabel : void 0, L = t.mode === "project" ? t.triggerLabelFormat : void 0, x = Q(() => {
    switch (t.mode) {
      case "project": {
        const c = vt(t.projects, t.selection.projectId);
        if (H) return { node: H(c), title: "" };
        let b = c ? c.shortName : s.buttonPlaceholder;
        return c && L === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (b = `${c.shortName} - ${c.fullName}`), { node: b, title: b };
      }
      case "project-multi": {
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const A = s.buttonPlaceholder;
          return { node: A, title: A };
        }
        const b = [];
        if (c.forEach((A) => {
          const j = vt(t.projects, A.projectId);
          j && b.push({ project: j, scrollGroupId: A.scrollGroupId });
        }), b.length === 0) {
          const A = s.buttonPlaceholder;
          return { node: A, title: A };
        }
        const R = b.map(
          ({ project: A, scrollGroupId: j }) => j === void 0 ? A.shortName : `${A.shortName} (${dt(j)})`
        ).join(", "), T = b.length.toString();
        return {
          node: /* @__PURE__ */ p(ve, { children: [
            /* @__PURE__ */ r(mt, { variant: "muted", className: "tw:shrink-0", children: T }),
            /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:truncate", children: R })
          ] }),
          title: `${T} ${R}`
        };
      }
      case "projectScrollGroup": {
        const c = vt(t.projects, t.selection.projectId);
        if (!c) {
          const T = s.buttonPlaceholder;
          return { node: T, title: T };
        }
        const b = t.selection.scrollGroupId;
        if (b === void 0)
          return { node: c.shortName, title: c.shortName };
        const R = `${c.shortName} · ${dt(b)}`;
        return { node: R, title: R };
      }
      default:
        return { node: "", title: "" };
    }
  }, [
    t.mode,
    t.projects,
    t.selection,
    H,
    L,
    s.buttonPlaceholder
  ]), B = pt(null), [S, P] = K(!1);
  Dt(() => {
    const c = B.current;
    if (!c) return;
    const b = (T) => {
      P(T < Ba);
    };
    if (b(c.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const R = new ResizeObserver((T) => {
      T.forEach((A) => {
        const [j] = A.borderBoxSize;
        b(j ? j.inlineSize : c.getBoundingClientRect().width);
      });
    });
    return R.observe(c, { box: "border-box" }), () => R.disconnect();
  }, []);
  let _;
  t.isLoading ? _ = /* @__PURE__ */ r(Ce, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : S ? _ = void 0 : t.mode === "project-multi" ? _ = /* @__PURE__ */ r(Wt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : _ = /* @__PURE__ */ r(ze, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const F = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? W : void 0, rt = /* @__PURE__ */ p(
    U,
    {
      ref: B,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": s.ariaLabel || void 0,
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
        S && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ r("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof x.node == "string" ? /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:truncate", children: x.node }) : x.node }),
        _
      ]
    }
  ), ct = x.title ? /* @__PURE__ */ r(Ut, { delayDuration: 400, children: /* @__PURE__ */ p(jt, { children: [
    /* @__PURE__ */ r(Gt, { asChild: !0, children: /* @__PURE__ */ r(St, { asChild: !0, children: rt }) }),
    /* @__PURE__ */ r(Lt, { children: x.title })
  ] }) }) : /* @__PURE__ */ r(St, { asChild: !0, children: rt }), be = i.length > 1;
  return /* @__PURE__ */ p(ue, { open: e, onOpenChange: g, children: [
    ct,
    /* @__PURE__ */ r(
      pe,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ r(Ut, { delayDuration: 400, children: /* @__PURE__ */ p(
          re,
          {
            shouldFilter: !1,
            value: $ ? k ?? Vt : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ r("div", { className: "tw:flex-1", children: /* @__PURE__ */ r(
                  ne,
                  {
                    value: o,
                    onValueChange: n,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                be && /* @__PURE__ */ r(
                  Ka,
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
              /* @__PURE__ */ r("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ r(U, { variant: "ghost", size: "sm", onClick: G, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(se, { children: [
                /* @__PURE__ */ r(ie, { children: s.commandEmptyMessage }),
                J.map((c, b) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    ke,
                    {
                      children: [
                        /* @__PURE__ */ r(le, { heading: Ja(c, s), children: c.rows.map((R) => {
                          var T;
                          return /* @__PURE__ */ r(
                            Fa,
                            {
                              row: R,
                              mode: t.mode,
                              strings: s,
                              onClick: X,
                              onOpen: F,
                              selectedRowRef: I,
                              indicator: (T = t.renderProjectIndicator) == null ? void 0 : T.call(t, R.project),
                              reserveIndicatorSlot: !!t.renderProjectIndicator
                            },
                            R.rowKey
                          );
                        }) }),
                        b < J.length - 1 && /* @__PURE__ */ r(Bt, { alwaysRender: !0 })
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
                /* @__PURE__ */ p("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  h.length > 0 && /* @__PURE__ */ r(
                    Bt,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    Tt,
                    {
                      forceMount: !0,
                      value: Vt,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var c;
                        (c = t.footerAction) == null || c.onSelect(), g(!1);
                      },
                      children: [
                        /* @__PURE__ */ r(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        !!t.renderProjectIndicator && /* @__PURE__ */ r(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: t.footerAction.label })
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
function Ja(t, e) {
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
const Xa = qt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: o, className: n, isDisabled: s = !1, id: i }, l) => {
    const u = M();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: d("tw:relative tw:@container/search", { "tw:w-full": o }, n),
        children: [
          /* @__PURE__ */ r(
            Ae,
            {
              className: d(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ r(
            Ze,
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
          t && /* @__PURE__ */ p(
            U,
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
                /* @__PURE__ */ r(je, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Xa.displayName = "SearchBar";
const Za = 5;
function Fr(t) {
  return aa(t).filter(
    (e) => !z.isObsolete(z.bookIdToNumber(e))
  );
}
function qa(t, e) {
  return t.filter((a) => {
    try {
      return De(a) === e;
    } catch {
      return !1;
    }
  });
}
const Kr = (t, e, a) => qa(t, e).every((o) => a.includes(o));
function Wa(t, e) {
  return [
    ...new Set(t.map((o) => o.toUpperCase()))
  ].filter((o) => z.bookIdToNumber(o) > 0).sort((o, n) => z.bookIdToNumber(o) - z.bookIdToNumber(n)).map((o) => ra(o, e));
}
function Vr(t, e, a, o) {
  if (t.length === 0) return;
  const n = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === n.size && [...s].every((l) => n.has(l)))
    return a;
  const i = Wa(t, o);
  if (i.length !== 0)
    return i.length <= Za ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Jr({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ r(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: d("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
function Ya({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function Qa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
const to = q(
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
function eo({
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        to({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function Xr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function ao({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function oo({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function Zr({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: o,
  role: n = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(Ya, { className: d(s), role: n, children: [
    /* @__PURE__ */ p(Qa, { children: [
      /* @__PURE__ */ r(eo, { variant: "icon", children: o ?? /* @__PURE__ */ r(Ge, {}) }),
      /* @__PURE__ */ r(ao, { children: t })
    ] }),
    a && /* @__PURE__ */ r(oo, { children: /* @__PURE__ */ r(U, { onClick: () => a(), children: e }) })
  ] });
}
const ro = qt(({ className: t, ...e }, a) => /* @__PURE__ */ r(Le, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
ro.displayName = "Spinner";
const no = q(
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
function qr({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        no({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function Wr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function Yr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function Qr({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: o,
  ...n
}) {
  return /* @__PURE__ */ r(
    Et.Group,
    {
      "data-slot": "resizable-panel-group",
      className: d(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...n
    }
  );
}
function wt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function tn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: o,
  ...n
}) {
  return /* @__PURE__ */ r(
    Et.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: wt(t),
      minSize: wt(e),
      maxSize: wt(a),
      collapsedSize: wt(o),
      ...n
    }
  );
}
function en({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ r(
    Et.Separator,
    {
      "data-slot": "resizable-handle",
      className: d(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ r("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  cr as $,
  Uo as A,
  U as B,
  Tt as C,
  pa as D,
  Yo as E,
  se as F,
  ie as G,
  fr as H,
  Do as I,
  gr as J,
  ko as K,
  Fo as L,
  To as M,
  Co as N,
  Ao as O,
  ue as P,
  br as Q,
  hr as R,
  vr as S,
  Ut as T,
  Nr as U,
  mt as V,
  sa as W,
  Sr as X,
  yr as Y,
  er as Z,
  va as _,
  ra as a,
  Xr as a$,
  Qt as a0,
  Tr as a1,
  zr as a2,
  Ir as a3,
  kr as a4,
  Cr as a5,
  _r as a6,
  lr as a7,
  ga as a8,
  $t as a9,
  ir as aA,
  mr as aB,
  Jo as aC,
  me as aD,
  ht as aE,
  gt as aF,
  qe as aG,
  Ye as aH,
  qr as aI,
  Yr as aJ,
  Wr as aK,
  Wo as aL,
  la as aM,
  da as aN,
  tr as aO,
  Qo as aP,
  Eo as aQ,
  jo as aR,
  Xe as aS,
  Je as aT,
  _o as aU,
  Ya as aV,
  oo as aW,
  ao as aX,
  Qa as aY,
  eo as aZ,
  Jr as a_,
  jr as aa,
  Or as ab,
  te as ac,
  Ze as ad,
  st as ae,
  Bt as af,
  Go as ag,
  Rr as ah,
  Gr as ai,
  Lr as aj,
  or as ak,
  Ta as al,
  $r as am,
  Xa as an,
  Fr as ao,
  qa as ap,
  Mo as aq,
  Kr as ar,
  ar as as,
  zo as at,
  oa as au,
  Zo as av,
  Xo as aw,
  ur as ax,
  wr as ay,
  pr as az,
  jt as b,
  Dr as b0,
  ca as b1,
  sr as b2,
  rr as b3,
  nr as b4,
  en as b5,
  tn as b6,
  Qr as b7,
  Zr as b8,
  ro as b9,
  Io as bA,
  Vr as bB,
  Ar as ba,
  Er as bb,
  So as bc,
  yo as bd,
  Ke as be,
  Fe as bf,
  xo as bg,
  No as bh,
  Sa as bi,
  ia as bj,
  ee as bk,
  xr as bl,
  zt as bm,
  Po as bn,
  ot as bo,
  Ma as bp,
  Pr as bq,
  Ve as br,
  Mr as bs,
  Ur as bt,
  Hr as bu,
  Br as bv,
  Ea as bw,
  Aa as bx,
  Da as by,
  Pa as bz,
  d as c,
  Gt as d,
  Lt as e,
  Vo as f,
  Ho as g,
  ma as h,
  ha as i,
  ba as j,
  dr as k,
  Ro as l,
  Oo as m,
  $o as n,
  le as o,
  ea as p,
  Bo as q,
  M as r,
  St as s,
  Ko as t,
  wa as u,
  pe as v,
  re as w,
  Lo as x,
  ne as y,
  qo as z
};
//# sourceMappingURL=resizable-CRV5w5Mp.js.map
