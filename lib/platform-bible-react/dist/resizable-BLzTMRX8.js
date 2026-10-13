import { jsx as n, jsxs as f, Fragment as gt } from "react/jsx-runtime";
import { Slot as je, Dialog as yt, Separator as rn, Popover as Yt, Tooltip as qt, DropdownMenu as Y, Label as nn, RadioGroup as Ie } from "radix-ui";
import { IconX as on, IconCheck as Be, IconSearch as an, IconChevronLeft as sn, IconChevronRight as ln } from "@tabler/icons-react";
import { Canon as nt } from "@sillsdev/scripture";
import ft, { useState as M, useRef as _, useCallback as L, createContext as cn, useContext as dn, useEffect as K, useMemo as wt, useLayoutEffect as oe, useImperativeHandle as un, Fragment as wn, forwardRef as Tr } from "react";
import { X as Lr, Check as de, ChevronsUpDown as Ar, Star as fn, Undo as pn, Redo as mn, SquareX as Rr, FunctionSquare as Dr, SquareSigma as Or, Ban as hn, Copy as gn, Group as bn, ArrowRight as Nn, Loader2 as vn, ChevronDown as xn, Search as yn, AlertTriangle as Sn, LoaderCircle as kn } from "lucide-react";
import { cva as Mt } from "class-variance-authority";
import { filterAndRankItems as mr, GENERATOR_NOTE_CALLER as Te, HIDDEN_NOTE_CALLER as Le, isInsertEmbedOpOfType as Jt, getDefaultViewOptions as Cn, getMarkerMenuItems as En, defaultStyleInfo as _n, Editorial as In } from "@eten-tech-foundation/platform-editor";
import { Section as Ot, MODIFIER_KEYS as Tn, formatReplacementString as Ln, usfmMarkers as ae, deepEqual as Gt, isPlatformError as An, ABORTED as Rn, getErrorMessage as Dn, normalizeProjectId as it, compareProjectsByName as On, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Mr, getLocalizeKeyForScrollGroupId as Mn, hasDistinctFullName as Pn, getSectionForBook as jn } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Ge from "react-resizable-panels";
import { clsx as Bn } from "clsx";
import { extendTailwindMerge as Gn, twMerge as zn } from "tailwind-merge";
const Hn = Gn({ prefix: "tw" });
function Ae(t) {
  const e = [];
  let r = "", o = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? o += 1 : s === "]" && (o -= 1), s === ":" && o === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Un(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Ae(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((c, u) => u !== r), `-${s}`].join(":")}`, original: t };
  }
  const o = e.findIndex((s) => s.startsWith("!tw-"));
  if (o !== -1) {
    const s = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((c, u) => u !== o), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Kn(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Ae(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), a = r[r.length - 1], s = Ae(e), i = s.some((c) => c.startsWith("-tw-")), l = s.some((c) => c.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const c = a.slice(1);
    return [...o, `-tw-${c}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const c = a.slice(1);
    return [...o, `!tw-${c}`].join(":");
  }
  return [...o, `tw-${a}`].join(":");
}
function b(...t) {
  const e = Bn(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Hn(e);
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((c) => {
    const u = Un(c);
    o.set(u.normalized, u.original), a.push(u.normalized);
  }), zn(a.join(" ")).split(" ").filter(Boolean).map((c) => {
    const u = o.get(c);
    return u ? Kn(c, u) : c;
  }).join(" ");
}
const Pr = 600, ue = 650, $a = 400, Fn = 450, $n = 500, Ja = 510, qa = 520, Jn = 675, Va = 690, Xa = 700, Za = 800, jr = Mt(
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
function X({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: o = !1,
  ...a
}) {
  const s = o ? je.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: b(jr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Br = "layoutDirection";
function Gr() {
  return globalThis.localStorage ?? void 0;
}
function mt() {
  var t;
  try {
    const e = (t = Gr()) == null ? void 0 : t.getItem(Br);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Wa(t) {
  var e;
  try {
    (e = Gr()) == null || e.setItem(Br, t);
  } catch {
  }
}
function Ya({ ...t }) {
  return /* @__PURE__ */ n(yt.Root, { "data-slot": "dialog", ...t });
}
function Qa({ ...t }) {
  return /* @__PURE__ */ n(yt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function qn({ ...t }) {
  return /* @__PURE__ */ n(yt.Portal, { "data-slot": "dialog-portal", ...t });
}
function ts({ ...t }) {
  return /* @__PURE__ */ n(yt.Close, { "data-slot": "dialog-close", ...t });
}
function Vn({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    yt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: b(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Fn, ...e },
      ...r
    }
  );
}
function es({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: o,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: a,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  ...i
}) {
  const l = mt();
  return /* @__PURE__ */ f(qn, { children: [
    /* @__PURE__ */ n(Vn, { className: o, style: a }),
    /* @__PURE__ */ f(
      yt.Content,
      {
        "data-slot": "dialog-content",
        className: b(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: $n, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ n(yt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ f(X, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(on, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function rs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "dialog-header",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function ns({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...o
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "dialog-footer",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...o,
      children: [
        r,
        e && /* @__PURE__ */ n(yt.Close, { asChild: !0, children: /* @__PURE__ */ n(X, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function os({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    yt.Title,
    {
      "data-slot": "dialog-title",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function as({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    yt.Description,
    {
      "data-slot": "dialog-description",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function zr({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: b(
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
function Xn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Zn = Mt(
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
function Wn({
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
        className: b(Zn({ align: e }), t),
        onClick: (o) => {
          var a, s;
          o.target instanceof HTMLElement && o.target.closest("button") || (s = (a = o.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
        },
        ...r
      }
    )
  );
}
Mt("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function ze({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Ht,
    {
      "data-slot": "command",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function He({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...o
}) {
  const a = mt(), s = ft.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !r || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), c = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      c && (i.preventDefault(), i.stopPropagation(), c.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ f(Xn, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        Ht.Input,
        {
          "data-slot": "command-input",
          className: b(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...o
        }
      ),
      /* @__PURE__ */ n(Wn, { children: /* @__PURE__ */ n(an, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Ht.List,
    {
      "data-slot": "command-list",
      className: b(
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
function Ke({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Ht.Empty,
    {
      "data-slot": "command-empty",
      className: b(
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
  return /* @__PURE__ */ n(
    Ht.Group,
    {
      "data-slot": "command-group",
      className: b(
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
    Ht.Separator,
    {
      "data-slot": "command-separator",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function we({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ f(
    Ht.Item,
    {
      "data-slot": "command-item",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ n(Be, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Yn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "command-shortcut",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const Qn = [
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
], to = (t) => {
  var e;
  return ((e = Qn[t]) == null ? void 0 : e.chapters) ?? -1;
}, eo = nt.allBookIds.filter(
  (t) => !nt.isObsolete(nt.bookIdToNumber(t))
);
function ro(t) {
  const e = [], r = Math.min(t.length, nt.allBookIds.length);
  for (let o = 0; o < r; o += 1)
    t[o] === "1" && e.push(nt.bookNumberToId(o + 1));
  return e;
}
function O(t) {
  return `%scrollGroup_${t}%`;
}
const no = {
  [O("undefined")]: "Ø",
  [O(0)]: "A",
  [O(1)]: "B",
  [O(2)]: "C",
  [O(3)]: "D",
  [O(4)]: "E",
  [O(5)]: "F",
  [O(6)]: "G",
  [O(7)]: "H",
  [O(8)]: "I",
  [O(9)]: "J",
  [O(10)]: "K",
  [O(11)]: "L",
  [O(12)]: "M",
  [O(13)]: "N",
  [O(14)]: "O",
  [O(15)]: "P",
  [O(16)]: "Q",
  [O(17)]: "R",
  [O(18)]: "S",
  [O(19)]: "T",
  [O(20)]: "U",
  [O(21)]: "V",
  [O(22)]: "W",
  [O(23)]: "X",
  [O(24)]: "Y",
  [O(25)]: "Z"
};
function Fe(t, e) {
  return to(nt.bookIdToNumber(t));
}
function fe(t, e, r) {
  const o = nt.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = nt.bookIdToNumber(i);
    (r === "next" ? l > o && l < s : l < o && l > s) && (a = i, s = l);
  }), a;
}
function ss(t, e, r) {
  const { book: o, chapterNum: a } = t;
  if (e.includes(o) && a > 1)
    return { book: o, chapterNum: a - 1, verseNum: 1 };
  const s = fe(o, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Fe(s), 1),
      verseNum: 1
    };
}
function is(t, e, r) {
  const { book: o, chapterNum: a } = t;
  if (e.includes(o) && a < Fe(o))
    return { book: o, chapterNum: a + 1, verseNum: 1 };
  const s = fe(o, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function ls(t, e, r) {
  const { book: o, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return s > 1 ? { book: o, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: o, chapterNum: 1, verseNum: 0 } : { book: o, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = fe(o, e, "previous");
  if (!i) return;
  const l = Math.max(Fe(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function cs(t, e, r) {
  const { book: o, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(o))
    return { book: o, chapterNum: a, verseNum: s + 1 };
  const i = fe(o, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function ds(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const us = (t, e, r, o, a) => {
  switch (t) {
    case Ot.OT:
      return e ?? "Old Testament";
    case Ot.NT:
      return r ?? "New Testament";
    case Ot.DC:
      return o ?? "Deuterocanon";
    case Ot.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, ws = (t, e, r, o, a) => {
  switch (t) {
    case Ot.OT:
      return e ?? "OT";
    case Ot.NT:
      return r ?? "NT";
    case Ot.DC:
      return o ?? "DC";
    case Ot.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function fs(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? nt.bookIdToEnglishName(t);
}
function oo(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const ps = Object.fromEntries(
  eo.map((t) => [t, nt.bookIdToEnglishName(t)])
);
function ms(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = nt.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(o) || t.toLowerCase().includes(o) || (s ? s.localizedName.toLowerCase().includes(o) || s.localizedId.toLowerCase().includes(o) : !1));
}
const hr = `
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
function ao(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Qt(t, e) {
  const r = e ? `${hr}, ${e}` : hr;
  return Array.from(t.querySelectorAll(r)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && ao(o)
  );
}
const hs = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let De = "keyboard", gr = !1;
function gs() {
  gr || typeof document > "u" || (gr = !0, document.addEventListener(
    "pointerdown",
    () => {
      De = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      De = "keyboard";
    },
    !0
  ));
}
function bs() {
  return De;
}
const Hr = "data-quiet-focus";
function Ns(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Hr, ""), t.style.outline = "none"));
}
function vs(t) {
  t && (t.removeAttribute(Hr), t.style.removeProperty("outline"));
}
const xs = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function so({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...o
}) {
  return /* @__PURE__ */ n(
    rn.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const io = Mt(
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
function $e({
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
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        io({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function ys({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? je.Root : "div";
  return /* @__PURE__ */ n(
    o,
    {
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function Ur({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ n(
    so,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function Kr() {
  const t = ft.createContext(null);
  function e({
    container: o,
    children: a
  }) {
    return /* @__PURE__ */ n(t.Provider, { value: o, children: a });
  }
  function r() {
    return ft.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function Je({ ...t }) {
  return /* @__PURE__ */ n(Yt.Root, { "data-slot": "popover", ...t });
}
function Oe({ ...t }) {
  return /* @__PURE__ */ n(Yt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: lo, usePortalContainer: co } = Kr(), Ss = lo;
function qe({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...a
}) {
  const s = mt(), i = co();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(Yt.Portal, { container: i, children: /* @__PURE__ */ n(
      Yt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: b(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Pr, ...o },
        dir: s,
        ...a
      }
    ) })
  );
}
function uo({ ...t }) {
  return /* @__PURE__ */ n(Yt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function ks({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: b("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Cs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: b("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Es({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: b("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Et({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    qt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function St({ ...t }) {
  return /* @__PURE__ */ n(qt.Root, { "data-slot": "tooltip", ...t });
}
function kt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    qt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? b(jr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: wo, usePortalContainer: fo } = Kr(), _s = wo;
function Ct({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: r,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: o = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: a,
  children: s,
  ...i
}) {
  const l = fo();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ n(qt.Portal, { container: l, children: /* @__PURE__ */ f(
      qt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Jn, ...r },
        className: b(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          o && /* @__PURE__ */ n(
            qt.Arrow,
            {
              className: b(
                "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
                "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
                "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
                a
              )
            }
          )
        ]
      }
    ) })
  );
}
const po = /^%[^%]*%$/;
function Fr(t) {
  return t !== void 0 && !po.test(t) && t.trim() !== "";
}
function et(t, e) {
  return Fr(t) ? t : e;
}
function mo() {
  const [t, e] = M(!1), r = _(null), o = L(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = L(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: o, onPointerLeave: a };
}
const $r = cn(void 0);
function pe() {
  const t = dn($r);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const me = Mt("", {
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
  const r = mt(), o = ft.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n($r.Provider, { value: o, children: /* @__PURE__ */ n(Y.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Is({
  ...t
}) {
  return /* @__PURE__ */ n(Y.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Xe({
  ...t
}) {
  return /* @__PURE__ */ n(Y.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ze({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  children: a,
  ...s
}) {
  const i = mt();
  return /* @__PURE__ */ n(Y.Portal, { children: /* @__PURE__ */ n(
    Y.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: r,
      align: e,
      className: b(
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
      style: { zIndex: Pr, ...o },
      ...s,
      children: /* @__PURE__ */ n("div", { dir: i, children: a })
    }
  ) });
}
function Ts({ ...t }) {
  return /* @__PURE__ */ n(Y.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ls({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const a = mt(), s = pe();
  return /* @__PURE__ */ n(
    Y.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: b(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        me({ variant: s.variant })
      ),
      dir: a,
      ...o
    }
  );
}
function Vt({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...a
}) {
  const s = mt(), i = pe();
  return /* @__PURE__ */ f(
    Y.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: b(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        me({ variant: i.variant })
      ),
      checked: r,
      dir: s,
      ...a,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ n(Y.ItemIndicator, { children: /* @__PURE__ */ n(Be, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ho({
  ...t
}) {
  return /* @__PURE__ */ n(Y.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function br({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  const a = mt(), s = pe();
  return /* @__PURE__ */ f(
    Y.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: b(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        me({ variant: s.variant })
      ),
      dir: a,
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(Y.ItemIndicator, { children: /* @__PURE__ */ n(Be, {}) })
          }
        ),
        e
      ]
    }
  );
}
function We({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ n(
    Y.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: b(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Ye({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Y.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: b("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function As({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: b(
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
function Rs({ ...t }) {
  return /* @__PURE__ */ n(Y.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Ds({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const a = pe(), s = mt();
  return /* @__PURE__ */ f(
    Y.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: b(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        me({ variant: a.variant })
      ),
      ...o,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ n(sn, { className: "tw:ms-auto" }) : /* @__PURE__ */ n(ln, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Os({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...o
}) {
  const a = mt();
  return /* @__PURE__ */ n(
    Y.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: b(
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
      style: { zIndex: ue, ...e },
      ...o,
      children: /* @__PURE__ */ n("div", { dir: a, children: r })
    }
  );
}
function Ms({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    nn.Root,
    {
      "data-slot": "label",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function Ps({
  className: t,
  ...e
}) {
  const r = mt();
  return /* @__PURE__ */ n(
    Ie.Root,
    {
      "data-slot": "radio-group",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function js({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    Ie.Item,
    {
      "data-slot": "radio-group-item",
      className: b(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        Ie.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Bs = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Nr = (t, e) => t[e] ?? e;
function go({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: o = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Nr(o, "%cancelButton_tooltip%"), l = s ?? Nr(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ f($e, { children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ f(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ n(Lr, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ n(Ur, {}),
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ f(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ n(de, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: l }) })
    ] }) })
  ] });
}
function he() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Gs() {
  return /Windows/i.test(navigator.userAgent);
}
const bo = ["input", "select", "textarea", "button"], No = ["button", "textbox"], zs = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const a = _(null), [s, i] = M(void 0), [l, c] = M(void 0), u = L(
    (p) => {
      i(p);
      const k = t.find((C) => C.id === p);
      k && (e == null || e(k));
      const m = document.getElementById(p);
      m && (m.scrollIntoView({ block: "center" }), m.focus()), a.current && a.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), w = L(
    (p) => {
      const k = t.find((m) => m.id === p);
      k && (c((m) => m === p ? void 0 : p), r == null || r(k));
    },
    [r, t]
  ), y = (p) => {
    if (!p) return !1;
    const k = p.tagName.toLowerCase();
    if (p.isContentEditable || bo.includes(k)) return !0;
    const m = p.getAttribute("role");
    if (m && No.includes(m)) return !0;
    const C = p.getAttribute("tabindex");
    return C !== void 0 && C !== "-1";
  }, E = L(
    (p) => {
      var V;
      const k = p.target, m = (D) => D ? document.getElementById(D) : void 0, C = m(l), H = m(s);
      if (!!(C && k && C.contains(k) && k !== C) && y(k)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !k.isContentEditable) {
          if (l) {
            p.preventDefault(), p.stopPropagation();
            const D = t.find((ot) => ot.id === l);
            D && u(D.id);
          }
          return;
        }
        if (p.key === "ArrowDown" || p.key === "ArrowUp") {
          if (!C) return;
          const D = Array.from(
            C.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const ot = D.findIndex((pt) => pt === k);
          if (ot === -1) return;
          let lt;
          p.key === "ArrowDown" ? lt = Math.min(ot + 1, D.length - 1) : lt = Math.max(ot - 1, 0), lt !== ot && (p.preventDefault(), p.stopPropagation(), (V = D[lt]) == null || V.focus());
          return;
        }
        return;
      }
      const S = t.findIndex((D) => D.id === s);
      let R = S;
      switch (p.key) {
        case "ArrowDown":
          R = Math.min(S + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          R = Math.max(S - 1, 0), p.preventDefault();
          break;
        case "Home":
          R = 0, p.preventDefault();
          break;
        case "End":
          R = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), p.preventDefault(), p.stopPropagation();
          return;
        case "ArrowRight": {
          const D = H;
          if (D) {
            const ot = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), lt = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), pt = ot ?? lt;
            if (pt) {
              p.preventDefault(), pt.focus();
              return;
            }
          }
          break;
        }
        default:
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (y(k) || (o == null || o(p.key), p.preventDefault()));
          return;
      }
      const q = t[R];
      q && u(q.id);
    },
    [t, u, s, l, w, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: E,
    /** Focus an option by its ID */
    focusOption: u
  };
}, vo = Mt(
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
function ce({ className: t, variant: e = "default", asChild: r = !1, ...o }) {
  const a = r ? je.Root : "span";
  return /* @__PURE__ */ n(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        vo({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function Hs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: b("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Us({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...o
}) {
  const a = ft.useRef(null);
  ft.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), ft.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Qt(i, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
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
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Qt(l)[0].focus();
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
        className: b("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: a,
            onKeyDown: s,
            className: b(
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
function Ks({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: b(
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
function Fs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: b("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function $s({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: b(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function xo(t) {
  ft.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? Qt(t.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function yo(t, e, r) {
  let o;
  return r === "ArrowLeft" && e > 0 ? o = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function So(t, e, r) {
  let o;
  return r === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : r === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Js({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: o = !1,
  ref: a,
  ...s
}) {
  const i = ft.useRef(null);
  ft.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), xo(i);
  const l = ft.useMemo(
    () => i.current ? Qt(i.current) : [],
    [i]
  ), c = ft.useCallback(
    (w) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      const E = y.closest("table"), p = E ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Qt(E).filter(
          (C) => C.tagName === "TR"
        )
      ) : [], k = p.indexOf(y), m = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), So(p, k, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), yo(l, m, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const C = y.closest("table");
        C && C.focus();
      }
      e == null || e(w);
    },
    [i, l, e]
  ), u = ft.useCallback(
    (w) => {
      o && (r == null || r(w));
    },
    [o, r]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: u,
      className: b(
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
function qs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "th",
    {
      "data-slot": "table-head",
      className: b(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Vs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "td",
    {
      "data-slot": "table-cell",
      className: b(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Xs({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: b("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ko(t, e = !0) {
  const [r, o] = M(!1);
  return K(() => {
    const a = t.current;
    if (!e || !a) {
      o(!1);
      return;
    }
    const s = () => {
      o(a.scrollTop + a.clientHeight < a.scrollHeight - 1);
    };
    s(), a.addEventListener("scroll", s);
    const i = typeof ResizeObserver < "u" ? new ResizeObserver(s) : void 0;
    i == null || i.observe(a);
    const l = new MutationObserver(s);
    return l.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", s), i == null || i.disconnect(), l.disconnect();
    };
  }, [t, e]), r;
}
function Co({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const o = ko(r, e);
  return e ? (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ f("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
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
function Zs({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: o,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: c = "No entries found",
  customSelectedText: u,
  isOpen: w = void 0,
  onOpenChange: y = void 0,
  isDisabled: E = !1,
  sortSelected: p = !1,
  showScrollCue: k = !1,
  icon: m = void 0,
  className: C = void 0,
  variant: H = "ghost",
  id: P
}) {
  const [J, S] = M(!1), R = _(null), q = L(
    (G) => {
      var Q;
      const at = (Q = t.find((ct) => ct.label === G)) == null ? void 0 : Q.value;
      at && r(
        e.includes(at) ? e.filter((ct) => ct !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), V = () => u || o, D = w ?? J, ot = y ?? S, [lt, pt] = M(D), [_t, F] = M(e);
  lt !== D && (pt(D), D && F(e));
  const Pt = wt(() => {
    if (!p) return t;
    const G = t.filter((Q) => Q.starred).sort((Q, ct) => Q.label.localeCompare(ct.label)), at = t.filter((Q) => !Q.starred).sort((Q, ct) => {
      const Tt = _t.includes(Q.value), jt = _t.includes(ct.value);
      return Tt && !jt ? -1 : !Tt && jt ? 1 : Q.label.localeCompare(ct.label);
    });
    return [...G, ...at];
  }, [t, _t, p]), Ut = () => {
    const G = t.map((at) => at.value);
    F(G), r(G);
  }, It = () => {
    F([]), r([]);
  };
  return /* @__PURE__ */ n("div", { id: P, className: C, children: /* @__PURE__ */ f(Je, { open: D, onOpenChange: ot, children: [
    /* @__PURE__ */ n(Oe, { asChild: !0, children: /* @__PURE__ */ f(
      X,
      {
        variant: H,
        role: "combobox",
        "aria-expanded": D,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: E,
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            m && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: m }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: b(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: V()
              }
            )
          ] }),
          /* @__PURE__ */ n(Ar, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(qe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ f(ze, { children: [
      /* @__PURE__ */ n(
        He,
        {
          placeholder: a ?? o,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(X, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ n(X, { variant: "ghost", size: "sm", onClick: It, children: l })
      ] }),
      /* @__PURE__ */ n(Co, { isEnabled: k, scrollerRef: R, children: /* @__PURE__ */ f(Ue, { ref: R, children: [
        /* @__PURE__ */ n(Ke, { children: c }),
        /* @__PURE__ */ n(le, { children: Pt.map((G) => /* @__PURE__ */ f(
          we,
          {
            value: G.label,
            onSelect: q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                de,
                {
                  className: b(
                    "tw:h-4 tw:w-4",
                    e.includes(G.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              G.starred && /* @__PURE__ */ n(fn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: G.label }),
              G.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: G.secondaryLabel })
            ]
          },
          G.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function xt(t) {
  return t.replace(/^\+/, "");
}
function Eo(t, e) {
  if (!t || e === "") return !1;
  const r = xt(e).toLowerCase();
  return Object.values(t.markers).some(
    (o) => o.styleType === "note" && xt(o.marker).toLowerCase() === r
  );
}
function _o(t, e, r) {
  if (!e) return [...t];
  const o = [...t], a = xt(e).toLowerCase();
  return r === "passive" ? mr({
    query: a,
    items: o,
    filter: (s) => xt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : mr({
    query: a,
    items: o,
    filter: (s) => xt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Me(t) {
  return t.isComposing || t.keyCode === 229;
}
const Jr = /^[a-z0-9+-]$/i;
function Io(t) {
  var o;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && he()) && e !== "Dead") {
    if (Jr.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((o = t.getModifierState) == null ? void 0 : o.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const To = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Lo = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Ao() {
  return [...To, ...Lo.filter((t) => Jr.test(t))];
}
function ut(t) {
  t.preventDefault(), t.stopPropagation();
}
function Ro(t, e, r) {
  var i, l;
  const { kind: o } = e;
  if (Me(t) || Tn.has(t.key))
    return "passed";
  const a = !he();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && ut(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return ut(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return ut(t), _o(
      e.items.map((u) => ({ label: u.marker })),
      e.filter,
      // Containment, for every kind: all marker palettes are host-driven (the session owns the
      // query and the palette renders it read-only), so this commit must resolve against the same
      // list the host filtered. Ranking cmdk's way here instead would commit an item the rendered
      // list never offered.
      "passive"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return ut(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (o !== "selection") {
      if (ut(t), e.filter === "")
        return r.dismiss(), "ended";
      const w = xt(e.filter).toLowerCase();
      return (l = e.isNoteMarker) != null && l.call(e, w) ? (e.items.some(
        (E) => xt(E.marker).toLowerCase() === w
      ) ? r.commit() : r.dismiss(), "ended") : (r.commitTyped(e.filter), r.dismiss(), "ended");
    }
    ut(t);
    const c = xt(e.filter).toLowerCase(), u = e.items.find(
      (w) => xt(w.marker).toLowerCase() === c
    );
    return u && r.commitItem(u.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return o === "selection" && e.filter === "" ? (ut(t), r.dismiss(), "ended") : (ut(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && o !== "selection")
    return e.filter === "" ? (ut(t), "continue") : (ut(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return ut(t), r.dismiss(), "ended";
  const s = Io(t);
  return t.key === "Backspace" || s !== void 0 ? (ut(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (ut(t), "continue");
}
function qr(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function vr(t, e) {
  const r = t();
  if (r === void 0) return;
  const o = e();
  return {
    content: JSON.stringify(r),
    caret: o === void 0 ? void 0 : JSON.stringify(o)
  };
}
function Do(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Oo(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: o,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: c,
    restoreSelectionIfLost: u,
    hasEditorChangedSinceFocus: w,
    focusEditor: y,
    applyItem: E,
    onShowError: p
  } = t, k = () => {
    u(), y();
  };
  a.current += 1;
  const m = a.current, C = () => a.current === m, H = { kind: r, token: m, filter: "", items: e };
  o && (H.isNoteMarker = o), s(H), c({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Ao(),
    onKey: (P) => l(P)
  }).then((P) => {
    if (i(m), P !== void 0) {
      const J = (w == null ? void 0 : w()) ?? !1;
      k();
      const S = J ? void 0 : e.find((R) => R.marker === P);
      S && E(S);
    } else C() && k();
  }).catch((P) => {
    i(m), C() && k(), p(P);
  });
}
function Mo(t, e) {
  const { sessionRef: r, editorRef: o, palette: a, restoreCaret: s, reopenAtCaret: i, baselineRef: l } = e, c = r.current;
  return c ? (Ro(t, c, {
    update: (w) => a.update(w),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (w) => {
      var y;
      s(), (y = o.current) == null || y.commitTypedMarker(w);
    },
    commitTypedAndReopen: (w) => {
      var y;
      s(), (y = o.current) == null || y.commitTypedMarker(w, { trailingSpace: !1 }), i() || a.dismiss();
    },
    commitTypedCloser: (w) => {
      var y;
      s(), (y = o.current) == null || y.commitTypedCloser(w);
    },
    commitItem: (w) => {
      var E;
      const y = c.items.find((p) => p.marker === w);
      y && (s(), (E = o.current) == null || E.applyMarkerMenuSelection(y, {
        trigger: "backslash",
        literalPrefixLanded: !1
      }));
    }
  }) === "ended" && (qr(r, c.token), l && !r.current && (l.current = void 0)), "routed") : "no-session";
}
function Po({
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  K(() => {
    const o = r ?? document, a = () => {
      t() && e();
    };
    return o.addEventListener("compositionstart", a, { capture: !0 }), () => {
      o.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd",
      className: b(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function Ws({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: b("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Ys = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), yr = (t, e) => t[e] ?? e;
function jo({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const c = he(), u = yr(a, "%undoButton_tooltip%"), w = yr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ f($e, { children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ f(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": u,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ n(pn, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ f("p", { children: [
        u,
        s && /* @__PURE__ */ f(gt, { children: [
          " ",
          /* @__PURE__ */ n(xr, { children: c ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ n(Ur, {}),
    e && /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ f(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ n(mn, {})
        }
      ) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ f("p", { children: [
        w,
        s && /* @__PURE__ */ f(gt, { children: [
          " ",
          /* @__PURE__ */ n(xr, { children: c ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Bo({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: o = !0
}) {
  const a = _(null);
  return K(() => {
    var c;
    const s = he(), i = ((c = a.current) == null ? void 0 : c.querySelector(".editor-input")) ?? void 0, l = (u) => {
      var y, E, p, k;
      if (!i || document.activeElement !== i) return;
      const w = u.key.toLowerCase();
      if (s) {
        if (!u.metaKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((y = e.current) == null || y.undo())) : u.shiftKey && w === "z" && (u.preventDefault(), o && ((E = e.current) == null || E.redo()));
      } else {
        if (!u.ctrlKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((p = e.current) == null || p.undo())) : (w === "y" || u.shiftKey && w === "z") && (u.preventDefault(), o && ((k = e.current) == null || k.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, r, e]), /* @__PURE__ */ n("div", { ref: a, children: t });
}
function Go() {
  const t = _(void 0), e = _(new DOMRect()), r = _({
    getBoundingClientRect: () => {
      var s;
      const a = (s = t.current) == null ? void 0 : s.measure();
      return a && (e.current = a), e.current;
    },
    get contextElement() {
      var a;
      return (a = t.current) == null ? void 0 : a.contextElement;
    }
  }), o = L((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return wt(() => ({ virtualRef: r, setSource: o }), [o]);
}
function zo(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ho(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Uo = (t, e, r) => t === "generated" ? /* @__PURE__ */ f(gt, { children: [
  /* @__PURE__ */ n("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ f(gt, { children: [
  /* @__PURE__ */ n("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ f(gt, { children: [
  /* @__PURE__ */ n("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Ko({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: o,
  focusNoteText: a
}) {
  const s = _(!1), i = _(null), l = _(null), c = _(!1), [u, w] = M(t), [y, E] = M(e), [p, k] = M(!1), m = _(!1), C = _(u);
  C.current = u;
  const H = _(y);
  H.current = y, K(() => {
    w(t);
  }, [t]), K(() => {
    y !== e && E(e);
  }, [e]);
  const P = (S) => {
    if (c.current = !1, k(S), !S) {
      const R = C.current, q = H.current;
      R !== "custom" || q ? (R !== t || q !== e) && (s.current = !0, r(R, q)) : (w(t), E(e));
    }
  }, J = (S) => {
    var R, q, V, D;
    S.stopPropagation(), document.activeElement === l.current && S.key === "ArrowDown" || S.key === "ArrowRight" ? ((R = i.current) == null || R.focus(), c.current = !0) : document.activeElement === i.current && S.key === "ArrowUp" ? ((q = l.current) == null || q.focus(), c.current = !1) : document.activeElement === i.current && S.key === "ArrowLeft" && ((V = i.current) == null ? void 0 : V.selectionStart) === 0 && ((D = l.current) == null || D.focus(), c.current = !1), u === "custom" && S.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && P(!1);
  };
  return /* @__PURE__ */ f(Ve, { open: p, onOpenChange: P, children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ f(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(Xe, { asChild: !0, children: /* @__PURE__ */ n(X, { variant: "outline", className: "tw:h-6", children: Uo(t, o, e) }) }) }),
      /* @__PURE__ */ n(Ct, { children: o["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ f(
      Ze,
      {
        style: { zIndex: ue },
        onEscapeKeyDown: () => {
          C.current = t, H.current = e, w(t), E(e);
        },
        onCloseAutoFocus: (S) => {
          s.current && (s.current = !1, S.preventDefault(), a());
        },
        onClick: () => {
          c.current && (c.current = !1);
        },
        onKeyDown: J,
        onMouseMove: () => {
          var S;
          c.current && ((S = i.current) == null || S.focus());
        },
        children: [
          /* @__PURE__ */ n(We, { children: o["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ n(Ye, {}),
          /* @__PURE__ */ n(
            Vt,
            {
              checked: u === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ f("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: o["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: Te })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            Vt,
            {
              checked: u === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ f("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: o["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ n("span", { className: "tw:w-10 tw:text-center", children: Le })
              ] })
            }
          ),
          /* @__PURE__ */ n(
            Vt,
            {
              ref: l,
              checked: u === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                m.current = u === "custom";
              },
              onClick: (S) => {
                var R;
                if (S.stopPropagation(), m.current && S.target !== i.current) {
                  P(!1);
                  return;
                }
                c.current = !0, (R = i.current) == null || R.focus();
              },
              onSelect: (S) => S.preventDefault(),
              children: /* @__PURE__ */ f("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ n("span", { children: o["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ n(
                  zr,
                  {
                    tabIndex: 0,
                    onMouseDown: (S) => {
                      S.stopPropagation(), w("custom"), c.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: y,
                    onKeyDown: (S) => {
                      S.key === "Enter" || S.key === "ArrowUp" || S.key === "ArrowDown" || S.key === "ArrowLeft" || S.key === "ArrowRight" || S.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (S) => E(S.target.value)
                  }
                )
              ] })
            }
          )
        ]
      }
    )
  ] });
}
const Fo = (t, e) => t === "f" ? /* @__PURE__ */ f(gt, { children: [
  /* @__PURE__ */ n(Dr, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ f(gt, { children: [
  /* @__PURE__ */ n(Or, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ f(gt, { children: [
  /* @__PURE__ */ n(Rr, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), $o = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ln(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Jo({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: o,
  focusNoteText: a
}) {
  const s = _(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ f(Ve, { children: [
    /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ f(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(Xe, { asChild: !0, children: /* @__PURE__ */ n(X, { variant: "outline", className: "tw:h-6", children: Fo(t, r) }) }) }),
      /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: $o(t, r) }) })
    ] }) }),
    /* @__PURE__ */ f(
      Ze,
      {
        style: { zIndex: ue },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), a());
        },
        children: [
          /* @__PURE__ */ n(We, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ n(Ye, {}),
          /* @__PURE__ */ f(
            Vt,
            {
              disabled: t !== "x" && !o,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ n(Rr, {}),
                /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ f(
            Vt,
            {
              disabled: t === "x" && !o,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ n(Dr, {}),
                /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ f(
            Vt,
            {
              disabled: t === "x" && !o,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ n(Or, {}),
                /* @__PURE__ */ n("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Sr = '[aria-controls="editor-context-menu"]';
function qo(t) {
  return t ? t.matches(Sr) ? !0 : !!t.querySelector(Sr) : !1;
}
const Qs = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%",
  // These three keys are not read by this component directly; they are provided here so callers
  // can localize them and pass the result into the optional `searchPlaceholder` prop to override
  // the default search-field placeholder.
  "%markerMenu_searchPlaceholder_character%",
  "%markerMenu_searchPlaceholder_insert%",
  "%markerMenu_searchPlaceholder_paragraph%"
]);
function Vo({ icon: t, className: e }) {
  return /* @__PURE__ */ n(t ?? hn, { className: e, size: 16 });
}
function Xo({ state: t }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ n(de, { size: 16 })
    }
  );
}
function kr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ f(
    we,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ n(Xo, { state: t.selectionState }),
        /* @__PURE__ */ n("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ n("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ n("div", { children: /* @__PURE__ */ n(Vo, { icon: t.icon }) }) }),
        /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
          /* @__PURE__ */ n("p", { className: "tw:min-w-0 tw:shrink tw:truncate tw:text-sm", title: t.title, children: t.title }),
          t.subtitle && /* @__PURE__ */ n(
            "p",
            {
              className: "tw:min-w-0 tw:shrink-[9999] tw:truncate tw:text-end tw:text-xs tw:text-muted-foreground",
              title: t.subtitle,
              children: t.subtitle
            }
          )
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ n(Yn, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Zo({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: o
}) {
  const [a, s] = M(""), [i, l] = wt(() => {
    const c = xt(a.trim().toLowerCase());
    if (!c) {
      const y = e.filter((E) => !E.isDisallowed);
      return [y.length > 0 ? y : e, []];
    }
    const u = e.filter((y) => {
      var p;
      const E = (p = y.marker) == null ? void 0 : p.toLowerCase();
      return y.isDisallowed ? E === c : E == null ? void 0 : E.includes(c);
    }), w = e.filter(
      (y) => y.title.toLowerCase().includes(c) && !u.includes(y)
    );
    return [u, w];
  }, [a, e]);
  return /* @__PURE__ */ f(ze, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ n(
      He,
      {
        className: "marker-menu-search",
        ref: r,
        value: a,
        onValueChange: (c) => s(c),
        placeholder: o ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ f(Ue, { children: [
      /* @__PURE__ */ n(Ke, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ n(le, { children: i.map((c) => {
        var u;
        return /* @__PURE__ */ n(
          kr,
          {
            item: c,
            localizedStrings: t
          },
          `item-${c.marker ?? ((u = c.icon) == null ? void 0 : u.displayName)}-${c.title.replaceAll(" ", "")}`
        );
      }) }),
      l.length > 0 && /* @__PURE__ */ f(gt, { children: [
        i.length > 0 && /* @__PURE__ */ n(Re, { alwaysRender: !0 }),
        /* @__PURE__ */ n(le, { children: l.map((c) => {
          var u;
          return /* @__PURE__ */ n(
            kr,
            {
              item: c,
              localizedStrings: t
            },
            `item-${c.marker ?? ((u = c.icon) == null ? void 0 : u.displayName)}-${c.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function Wo(t, e, r, o, a) {
  if (!o || o === "p") return [];
  const s = ae[o], i = s != null && s.children ? s : a && ae[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, c]) => {
    l.push(
      ...c.map((u) => ({
        marker: u,
        title: r[ae[u].description] ?? ae[u].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(u), e();
        }
      }))
    );
  }), l.sort((c, u) => (c.marker ?? c.title).localeCompare(u.marker ?? u.title));
}
function Cr(t) {
  if (!t || !Jt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function Yo(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Qo(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function ta(t, e) {
  let r = 0, o = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const i = t[r];
      return o !== 0 || !i || !Gt(i, a) ? !1 : (r += 1, !0);
    }
    let s = a.insert;
    for (; s.length > 0; ) {
      const i = t[r];
      if (!i || typeof i.insert != "string" || !Gt(i.attributes, a.attributes))
        return !1;
      const l = i.insert.slice(o), c = Math.min(l.length, s.length);
      if (l.slice(0, c) !== s.slice(0, c)) return !1;
      s = s.slice(c), o += c, o === i.insert.length && (r += 1, o = 0);
    }
    return !0;
  });
}
function ea(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ra(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const na = 300, Ee = "*", oa = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function ti({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c,
  parentEditorRef: u,
  inline: w = !1,
  ref: y,
  initialCaretPosition: E,
  markerPalette: p,
  onNoteEdit: k
}) {
  var pr;
  const m = _(null), C = _(null), H = _(null), P = _(s);
  K(() => {
    P.current = s;
  }, [s]);
  const J = _(E);
  K(() => {
    J.current = E;
  }, [E]);
  const S = L(() => {
    var g, v;
    const d = J.current;
    d !== void 0 && d !== "end" ? (g = m.current) == null || g.selectNoteTextOffset(0, d.utf16Offset, {
      field: d.field,
      glyph: d.glyph
    }) : (v = m.current) == null || v.selectNote(0);
  }, []);
  oe(() => {
    if (w || !H.current) return;
    const d = parseFloat(getComputedStyle(H.current).width);
    d > 0 && (H.current.style.width = `${d}px`);
  }, [w]);
  const [R, q] = M("generated"), [V, D] = M("generated"), [ot, lt] = M(Ee), [pt, _t] = M(Ee), [F, Pt] = M("f"), [Ut, It] = M(!1), [G, at] = M(!0), [Q, ct] = M(!1), Tt = _(!1), jt = _(""), h = _(!1), T = _(void 0), z = _([]), Z = _([]), U = _(void 0), $ = _(void 0), er = L(() => {
    var g;
    const d = (g = m.current) == null ? void 0 : g.takeOpsAfterNote(0);
    d != null && d.length && (z.current = [...z.current, ...d], U.current = void 0);
  }, []), rr = L(
    (d, g) => {
      var N, A;
      if (!d) return;
      const v = Cr(d), x = Cr(g);
      if (!v && x) {
        U.current = {
          text: z.current,
          closedNoteOp: d,
          openNoteOp: g
        }, z.current = [];
        return;
      }
      const I = U.current;
      I && (v && !x && Gt(d, I.openNoteOp) && Gt(g, I.closedNoteOp) && !((A = (N = m.current) == null ? void 0 : N.getOpsAfterNote(0)) != null && A.length) ? (z.current = I.text, U.current = void 0) : Gt(g, I.openNoteOp) || (U.current = void 0));
    },
    []
  ), [bt, ee] = M(!1), ge = Go(), [nr, Xr] = M(), or = _(null), dt = _(
    void 0
  ), Zr = _(0), ar = _(p);
  K(() => {
    ar.current = p;
  }, [p]), K(
    () => () => {
      var d;
      dt.current && (dt.current = void 0, (d = ar.current) == null || d.dismiss());
    },
    []
  );
  const be = _(void 0), Zt = _(void 0), Kt = L(() => {
    var g, v, x;
    if ((g = m.current) != null && g.getSelection()) return;
    const d = be.current;
    d ? (v = m.current) == null || v.setSelection(d) : (x = m.current) == null || x.selectNote(0);
  }, []), re = L(() => {
    var d;
    Kt(), (d = m.current) == null || d.focus();
  }, [Kt]), Lt = wt(
    () => ({
      ...i,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: {
        ...i.view ?? Cn(),
        noteMode: "expanded",
        // The note's marker and caller are governed by this popover's two dropdowns, so they are
        // not text to type into — the same division Paratext 9 draws. Left editable they read as
        // editable and are not: the edit does not persist, and because the note-scoped rebuild
        // refuses a caller it cannot recognize, anything else typed into that slot goes with it
        // (a `\cat` category run typed after the caller was silently discarded). Atomic here
        // routes that typing to the note's CONTENT, which is where it belongs and where the
        // category folds from.
        isNoteShellEditable: !1,
        // The wrapper paragraph is scaffolding (see PARAGRAPH_USJ above): suppress its `\p`
        // marker prefix so the popover's text starts with the footnote's own first glyph.
        showParaMarkerPrefixes: !1
      }
    }),
    [i, l]
  ), Ne = wt(
    () => Wo(
      m,
      () => ee(!1),
      c,
      nr,
      F
    ),
    [c, nr, F]
  );
  K(() => {
    var d;
    bt || (d = m.current) == null || d.focus();
  }, [F, bt]);
  const At = L(() => {
    var x, I, N;
    const d = (x = C.current) == null ? void 0 : x.querySelector(".editor-input"), g = d == null ? void 0 : d.querySelector("span.note"), v = (N = (I = C.current) == null ? void 0 : I.ownerDocument.getSelection()) == null ? void 0 : N.anchorNode;
    return !!g && !!v && g.contains(v);
  }, []), Bt = L(
    (d = !1) => {
      var v, x, I, N, A;
      k == null || k();
      const g = (x = (v = m.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (g && Jt("note", g) && (r == null || r([g]), d && u && P.current)) {
        const j = [
          ...z.current,
          ...((I = m.current) == null ? void 0 : I.getOpsAfterNote(0)) ?? []
        ], W = Z.current, Nt = !Gt(j, W);
        if (w && !Nt && Gt(g, T.current))
          return;
        T.current = g;
        const tt = [g];
        Nt && (W.length > 0 && ta(
          ((N = u.current) == null ? void 0 : N.getOpsAfterNote(P.current)) ?? [],
          W
        ) && tt.push({ delete: Qo(W) }), tt.push(...j), Z.current = j), (A = u.current) == null || A.replaceEmbedUpdate(P.current, tt);
      }
    },
    [w, r, k, u]
  ), ve = L(
    (d) => {
      var v, x, I;
      const g = (v = m.current) == null ? void 0 : v.getSelection();
      (x = m.current) == null || x.applyUpdate([d, { delete: 1 }]), g && ((I = m.current) == null || I.setSelection(g)), re();
    },
    [re]
  ), sr = L(
    (d, g) => {
      var I, N, A;
      dt.current || (I = m.current) == null || I.commitPendingMarkerEdits();
      const v = (A = (N = m.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : A.at(0);
      if (!v || !Jt("note", v) || !v.insert.note) return;
      let x;
      d === "custom" ? x = g : d === "generated" ? x = Te : x = Le, v.insert.note.caller !== x && (v.insert.note.caller = x, ve(v));
    },
    [ve]
  ), Ft = _(void 0), xe = _(Bt);
  K(() => {
    xe.current = Bt;
  }, [Bt]);
  const $t = L(() => {
    Ft.current !== void 0 && (clearTimeout(Ft.current), Ft.current = void 0);
  }, []), ht = L(() => {
    Ft.current !== void 0 && ($t(), xe.current(!0));
  }, [$t]), ir = L(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, xe.current(!0);
    }, na);
  }, [$t]);
  K(() => {
    var I, N;
    let d, g, v;
    Tt.current = !1, h.current = !1, be.current = void 0, at(!0);
    const x = e == null ? void 0 : e.at(0);
    if (T.current = x, z.current = [], Z.current = [], U.current = void 0, $.current = void 0, x && Jt("note", x)) {
      const A = (I = x.insert.note) == null ? void 0 : I.caller;
      let j = "custom";
      A === Te ? j = "generated" : A === Le && (j = "hidden");
      const W = j === "custom" && A !== void 0 ? A : Ee;
      lt(W), _t(W), q(j), D(j), Pt(((N = x.insert.note) == null ? void 0 : N.style) ?? "f"), d = setTimeout(() => {
        var tt, st, vt, Rt;
        const Nt = (st = (tt = m.current) == null ? void 0 : tt.getNoteOps(0)) == null ? void 0 : st.at(0);
        (vt = m.current) == null || vt.applyUpdate(Nt ? [x, { delete: 1 }] : [x]), S(), (Rt = m.current) == null || Rt.focus(), g = requestAnimationFrame(() => {
          v = setTimeout(() => {
            var Dt;
            At() || (S(), (Dt = m.current) == null || Dt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      ht(), J.current = void 0, d && clearTimeout(d), g !== void 0 && cancelAnimationFrame(g), v !== void 0 && clearTimeout(v);
    };
  }, [e, ht, At, S]), oe(() => () => ht(), [ht]);
  const lr = L(() => {
    var d;
    h.current && (dt.current || (d = m.current) == null || d.commitPendingMarkerEdits(), ht());
  }, [ht]);
  un(
    y,
    () => ({
      flushPendingEdits: lr,
      focus: () => {
        var d;
        return (d = m.current) == null ? void 0 : d.focus();
      },
      containsFocus: () => {
        const d = H.current;
        return !!d && d.contains(d.ownerDocument.activeElement);
      }
    }),
    [lr]
  );
  const ye = L(() => {
    var d, g;
    if (!dt.current) {
      const v = (d = C.current) == null ? void 0 : d.querySelector(".editor-input");
      v != null && v.contains(v.ownerDocument.activeElement) && v.blur(), (g = m.current) == null || g.commitPendingMarkerEdits();
    }
    w ? ht() : ($t(), Bt(!0)), o();
  }, [$t, ht, w, o, Bt]), Se = _(ye);
  oe(() => {
    Se.current = ye;
  });
  const ke = _({ book: a.book, chapterNum: a.chapterNum });
  oe(() => {
    (ke.current.book !== a.book || ke.current.chapterNum !== a.chapterNum) && (ke.current = { book: a.book, chapterNum: a.chapterNum }, Se.current());
  }, [a.book, a.chapterNum]);
  const Wr = () => {
    var g;
    const d = (g = C.current) == null ? void 0 : g.getElementsByClassName("editor-input")[0];
    d != null && d.textContent && navigator.clipboard.writeText(d.textContent);
  }, Yr = L(
    (d, g) => {
      k == null || k(), q(d), lt(g), sr(d, g), w && ht();
    },
    [sr, ht, w, k]
  ), Qr = (d) => {
    var v, x, I, N, A;
    Pt(d), dt.current || (v = m.current) == null || v.commitPendingMarkerEdits();
    const g = (I = (x = m.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : I.at(0);
    if (g && Jt("note", g)) {
      g.insert.note && (g.insert.note.style = d);
      const j = (A = (N = g.insert.note) == null ? void 0 : N.contents) == null ? void 0 : A.ops;
      F !== "x" && d === "x" ? j == null || j.forEach((W) => ea(W)) : F === "x" && d !== "x" && (j == null || j.forEach((W) => ra(W))), ve(g), w && ht();
    }
  }, tn = (d) => {
    Xr(d.contextMarker), ct(d.canRedo);
  }, en = L(
    (d) => {
      var v, x, I, N, A, j, W;
      const g = (x = (v = m.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (g && Jt("note", g)) {
        d.content.length > 1 && setTimeout(() => {
          var st;
          (st = m.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const Nt = (I = g.insert.note) == null ? void 0 : I.style, tt = (A = (N = g.insert.note) == null ? void 0 : N.contents) == null ? void 0 : A.ops;
        if (Nt || It(!1), It(
          Nt === "x" ? !!(tt != null && tt.every((st) => {
            var Rt, Dt;
            if (!((Rt = st.attributes) != null && Rt.char)) return !0;
            const vt = ((Dt = st.attributes) == null ? void 0 : Dt.char).style;
            return vt === "xt" || vt === "xo" || vt === "xq";
          })) : !!(tt != null && tt.every((st) => {
            var Rt, Dt;
            if (!((Rt = st.attributes) != null && Rt.char)) return !0;
            const vt = ((Dt = st.attributes) == null ? void 0 : Dt.char).style;
            return vt === "ft" || vt === "fr" || vt === "fq";
          }))
        ), !Tt.current) {
          Tt.current = !0, jt.current = JSON.stringify(g), $.current = g, at(!0);
          return;
        }
        h.current = !0, rr($.current, g), $.current = g, (W = (j = m.current) == null ? void 0 : j.getOpsAfterNote(0)) != null && W.length && setTimeout(er, 0), at(JSON.stringify(g) === jt.current), Bt(), w && ir();
      } else
        It(!1), at(!0);
    },
    [
      w,
      Bt,
      ir,
      rr,
      er
    ]
  ), cr = L(() => {
    const d = window.getSelection();
    if (!Ne.length || !d || d.rangeCount === 0)
      return;
    const g = C.current;
    if (!g) return;
    const v = d.getRangeAt(0).cloneRange();
    ge.setSource({
      measure: () => {
        const x = zo(v);
        return x && Ho(x);
      },
      contextElement: g
    }), ee(!0);
  }, [Ne, ge]), Ce = _(() => {
  }), dr = L(
    (d, g, v) => {
      const { anchorRect: x } = d;
      if (!p || !x) return;
      const { hasTextSelection: I } = v;
      Oo({
        items: g,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It no longer decides anything about focus: every marker palette focuses its list.
        kind: I ? "selection" : "backslash",
        // Space COMMITS (like Enter) when the typed filter names a NOTE marker in the stylesheet.
        // This palette's own list offers note-INTERNAL markers, but the filter is whatever the user
        // typed: `\f` here materializes a NESTED `\f ` literal, and the Tier-2 tokenizer absorbs
        // the following word into it as a caller just as it does in body text. Decided from the
        // stylesheet rather than from the offered items for exactly that reason.
        isNoteMarker: (N) => Eo(Lt.styleInfo, N),
        sessionCounterRef: Zr,
        setSession: (N) => {
          dt.current = N, Zt.current = void 0;
        },
        clearSessionIfCurrent: (N) => {
          qr(dt, N), dt.current || (Zt.current = void 0);
        },
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (N) => Ce.current(N),
        show: (N) => p.show({
          items: g.map(Yo),
          anchor: x,
          keyForwarding: N
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: () => Do(
          Zt.current,
          vr(
            () => {
              var N;
              return (N = m.current) == null ? void 0 : N.getUsj();
            },
            () => {
              var N;
              return (N = m.current) == null ? void 0 : N.getSelection();
            }
          )
        ),
        focusEditor: () => {
          var N;
          return (N = m.current) == null ? void 0 : N.focus();
        },
        applyItem: (N) => {
          var A;
          return (A = m.current) == null ? void 0 : A.applyMarkerMenuSelection(N, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (N) => {
          (!An(N) || N.code !== Rn) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Dn(N)}`
          );
        }
      });
    },
    [p, Kt, Lt.styleInfo]
  ), ne = L(() => {
    var v;
    const d = (v = m.current) == null ? void 0 : v.getMarkerMenuContext();
    if (!d) return !1;
    const g = En(Lt.styleInfo ?? _n, d);
    return g.length === 0 ? !1 : (dr(d, g, { hasTextSelection: !!d.hasTextSelection }), !0);
  }, [dr, Lt.styleInfo]);
  Po({
    isSessionOpen: L(() => !!dt.current, []),
    dismiss: L(() => p == null ? void 0 : p.dismiss(), [p])
  });
  const ur = L(
    (d) => {
      if (!p) return;
      Mo(d, {
        sessionRef: dt,
        editorRef: m,
        palette: p,
        restoreCaret: Kt,
        reopenAtCaret: ne,
        baselineRef: Zt
      }) === "no-session" && p.dismiss();
    },
    [p, ne, Kt]
  );
  K(() => {
    Ce.current = ur;
  }, [ur]), K(() => {
    const d = (g) => {
      var I, N;
      const v = (I = C.current) == null ? void 0 : I.querySelector(".editor-input");
      if (!v || g.target !== v) return;
      const x = (N = m.current) == null ? void 0 : N.getSelection();
      x && (be.current = x), dt.current && (Zt.current = vr(
        () => {
          var A;
          return (A = m.current) == null ? void 0 : A.getUsj();
        },
        () => {
          var A;
          return (A = m.current) == null ? void 0 : A.getSelection();
        }
      ));
    };
    return document.addEventListener("focusout", d), () => document.removeEventListener("focusout", d);
  }, []), K(() => {
    const d = () => {
      bt && ee(!1);
    };
    return window.addEventListener("click", d), () => {
      window.removeEventListener("click", d);
    };
  }, [bt]), K(() => {
    var d;
    bt && ((d = or.current) == null || d.focus());
  }, [bt]), K(() => {
    var v;
    const d = () => {
      var x;
      return ((x = C.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
    };
    if (((v = Lt.view) == null ? void 0 : v.markerMode) === "editable") {
      const x = (N) => {
        var W, Nt, tt, st;
        if (Me(N)) return;
        const A = dt.current, j = d();
        if (!(!j || document.activeElement !== j)) {
          if (A && p) {
            Ce.current(N);
            return;
          }
          if (qo(C.current)) {
            N.key === l && (N.preventDefault(), N.stopPropagation());
            return;
          }
          if (N.key === "Enter" && !At()) {
            N.preventDefault(), N.stopPropagation(), (W = m.current) == null || W.selectNote(0), (Nt = m.current) == null || Nt.focus();
            return;
          }
          if (p && N.key === l) {
            if (!At()) {
              N.preventDefault(), N.stopPropagation(), (tt = m.current) == null || tt.selectNote(0), (st = m.current) == null || st.focus();
              return;
            }
            ne() && (N.preventDefault(), N.stopPropagation());
          }
        }
      }, I = () => {
        var A, j;
        const N = d();
        !N || document.activeElement !== N || At() || ((A = m.current) == null || A.selectNote(0), (j = m.current) == null || j.focus());
      };
      return document.addEventListener("keydown", x, { capture: !0 }), document.addEventListener("paste", I, { capture: !0 }), () => {
        document.removeEventListener("keydown", x, { capture: !0 }), document.removeEventListener("paste", I, { capture: !0 });
      };
    }
    const g = (x) => {
      const I = d();
      !bt && I && document.activeElement === I && x.key === l ? (x.preventDefault(), cr()) : bt && x.key === "Escape" && (x.preventDefault(), ee(!1));
    };
    return document.addEventListener("keydown", g), () => {
      document.removeEventListener("keydown", g);
    };
  }, [
    bt,
    cr,
    l,
    (pr = Lt.view) == null ? void 0 : pr.markerMode,
    Lt.styleInfo,
    p,
    ne,
    At
  ]), K(() => {
    const d = H.current;
    if (!w || !d) return;
    const g = (v) => {
      v.key !== "Escape" || v.defaultPrevented || Me(v) || (v.preventDefault(), v.stopPropagation(), Se.current());
    };
    return d.addEventListener("keydown", g), () => d.removeEventListener("keydown", g);
  }, [w]), K(() => {
    const d = () => {
      var x, I, N;
      const g = ((x = C.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!g || document.activeElement !== g) return;
      const v = document.getSelection();
      v && !v.isCollapsed || At() || ((I = m.current) == null || I.selectNote(0), (N = m.current) == null || N.focus());
    };
    return document.addEventListener("pointerup", d), document.addEventListener("selectionchange", d), () => {
      document.removeEventListener("pointerup", d), document.removeEventListener("selectionchange", d);
    };
  }, [At]);
  const wr = c["%footnoteEditor_copyButton_tooltip%"], fr = /* @__PURE__ */ n(
    jo,
    {
      onUndoClick: () => {
        var d;
        return (d = m.current) == null ? void 0 : d.undo();
      },
      onRedoClick: () => {
        var d;
        return (d = m.current) == null ? void 0 : d.redo();
      },
      canUndo: !G,
      canRedo: Q,
      localizedStrings: c
    }
  );
  return /* @__PURE__ */ f(gt, { children: [
    /* @__PURE__ */ f(
      "div",
      {
        ref: H,
        className: b("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ f("div", { className: b("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ n(
                Jo,
                {
                  isTypeSwitchable: Ut,
                  noteType: F,
                  handleNoteTypeChange: Qr,
                  localizedStrings: c,
                  focusNoteText: re
                }
              ),
              /* @__PURE__ */ n(
                Ko,
                {
                  callerType: R,
                  customCaller: ot,
                  updateCaller: Yr,
                  localizedStrings: c,
                  focusNoteText: re
                }
              ),
              w && fr
            ] }),
            !w && /* @__PURE__ */ n("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ f($e, { children: [
              fr,
              /* @__PURE__ */ n(
                go,
                {
                  onCancelClick: o,
                  onAcceptClick: ye,
                  canAccept: !G || V !== R || R === "custom" && ot !== pt,
                  localizedStrings: c,
                  acceptLabel: c["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ f(
            "div",
            {
              ref: C,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ n("div", { className: t, children: /* @__PURE__ */ n(
                  Bo,
                  {
                    editorRef: m,
                    canUndo: !G,
                    canRedo: Q,
                    children: /* @__PURE__ */ n(
                      In,
                      {
                        options: Lt,
                        onStateChange: tn,
                        onUsjChange: en,
                        defaultUsj: oa,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: m
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ n("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ n(Et, { children: /* @__PURE__ */ f(St, { children: [
                  /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(
                    X,
                    {
                      "aria-label": wr,
                      onClick: Wr,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ n(gn, {})
                    }
                  ) }),
                  /* @__PURE__ */ n(Ct, { children: /* @__PURE__ */ n("p", { children: wr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ f(Je, { open: bt, children: [
      /* @__PURE__ */ n(uo, { virtualRef: ge.virtualRef }),
      /* @__PURE__ */ n(
        qe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (d) => {
            d.preventDefault(), d.stopPropagation();
          },
          children: /* @__PURE__ */ n(
            Zo,
            {
              markerMenuItems: Ne,
              localizedStrings: c,
              searchRef: or
            }
          )
        }
      )
    ] })
  ] });
}
function aa(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const o = it(r.projectId), a = e.get(o), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(o, [s]);
  }), e.forEach((r) => r.sort((o, a) => o.scrollGroupId - a.scrollGroupId)), e;
}
function Er(t, e, r) {
  const o = it(e);
  return t.some(
    (a) => it(a.projectId) === o && a.scrollGroupId === r
  );
}
function _e(t) {
  const e = aa(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : it(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(it(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: a !== void 0 && a === it(s.id),
        isMuted: i.length === 0,
        isBoundButClosed: !1,
        isDisabled: s.isDisabled === !0,
        disabledReason: s.disabledReason,
        project: s
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
  const o = [];
  return t.projects.forEach((a) => {
    const s = e.get(it(a.id));
    if (!s || s.length === 0) {
      o.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Er(r, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
      return;
    }
    s.forEach((i) => {
      o.push({
        rowKey: `tab:${a.id}:${i.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Er(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = it(a.projectId);
    if (o.some(
      (l) => it(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => it(l.id) === s);
    i && o.push({
      rowKey: `closed:${i.id}:${a.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      scrollGroupId: a.scrollGroupId,
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
const Qe = "Selected", tr = "Unselected";
function _r(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = On(t, e);
  if (r !== 0) return r;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - a;
}
function Pe(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function sa(t) {
  const e = t.filter(_r).sort(zt), r = t.filter((a) => !_r(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function ia(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), o = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var u;
    const c = (u = e.getSectionHeading) == null ? void 0 : u.call(
      e,
      i,
      l.map((w) => w.project)
    );
    return typeof c == "string" && c.length > 0 ? c : i === "selected" ? Qe : tr;
  }, s = [];
  return r.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: a("selected", r),
    rows: r
  }), o.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: a("unselected", o),
    rows: o
  }), s;
}
function la(t, e) {
  if (e.id === "openTabs") return sa(t);
  if (e.id === "selection") return ia(t, e);
  if (!e.getGroupKey) return Pe(t);
  const r = /* @__PURE__ */ new Map(), o = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const c = a(l.project);
    if (c === void 0 || c === "") {
      o.push(l);
      return;
    }
    const u = r.get(c);
    u ? u.push(l) : r.set(c, [l]);
  });
  const s = [...r.entries()].map(([l, c]) => {
    var y;
    const u = [...c].sort(
      (E, p) => {
        var k;
        return ((k = e.compareProjects) == null ? void 0 : k.call(e, E.project, p.project)) || zt(E, p);
      }
    ), w = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      l,
      u.map((E) => E.project)
    )) ?? l;
    return { key: l, heading: w, rows: u };
  });
  s.sort((l, c) => l.key === e.priorityKey ? -1 : c.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: c.key, heading: c.heading }
  ) : l.heading.localeCompare(c.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: c, rows: u }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: c,
    rows: u,
    isPriority: l === e.priorityKey
  }));
  return o.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...o].sort(zt)
  }), i;
}
const ei = [
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
function B(t, e) {
  const r = t[e];
  if (!(typeof r != "string" || !Fr(r)))
    return r;
}
const se = "recent", ca = "other";
function Vr(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function da(t) {
  const e = t ?? {};
  return [
    Vr(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var o;
        return typeof ((o = r.customData) == null ? void 0 : o[Wt.lastUsedAt]) == "number" ? se : ca;
      },
      getSectionHeading: (r) => r === se ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, o) => r.key === se ? -1 : o.key === se ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const o = (a = r.customData) == null ? void 0 : a[Wt.language];
        return typeof o == "string" ? o : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const o = (a = r.customData) == null ? void 0 : a[Wt.type];
        return typeof o == "string" ? o : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, o) => {
        var i;
        const a = o.find(
          (l) => {
            var c;
            return typeof ((c = l.customData) == null ? void 0 : c[Wt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Wt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const ri = da();
function ua(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? Qe : e.unselectedSectionHeading ?? tr
  };
}
function ni(t) {
  return {
    openTabsLabel: B(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: B(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: B(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: B(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: B(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: B(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: B(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: B(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function oi(t) {
  return {
    label: B(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const wa = 100, rt = {
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
  autoSelectionSelectedSectionHeading: Qe,
  autoSelectionUnselectedSectionHeading: tr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function fa(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : et(e.ariaLabel, rt.ariaLabel),
    buttonPlaceholder: et(
      e.buttonPlaceholder,
      rt.buttonPlaceholder
    ),
    commandEmptyMessage: et(
      e.commandEmptyMessage,
      rt.commandEmptyMessage
    ),
    searchPlaceholder: et(
      e.searchPlaceholder,
      rt.searchPlaceholder
    ),
    groupByAriaLabel: et(
      e.groupByAriaLabel,
      rt.groupByAriaLabel
    ),
    groupSectionLabel: et(
      e.groupSectionLabel,
      rt.groupSectionLabel
    ),
    groupByNone: et(
      e.groupByNone,
      rt.groupByNone
    ),
    openTabsSectionHeading: et(
      e.openTabsSectionHeading,
      rt.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: et(
      e.otherProjectsSectionHeading,
      rt.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: et(
      e.autoOpenTabsGroupingLabel,
      rt.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: et(
      e.autoSelectionGroupingLabel,
      rt.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: et(
      e.autoSelectionSelectedSectionHeading,
      rt.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: et(
      e.autoSelectionUnselectedSectionHeading,
      rt.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: et(
      e.boundButClosedTooltip,
      rt.boundButClosedTooltip
    ),
    openButtonLabel: et(
      e.openButtonLabel,
      rt.openButtonLabel
    ),
    clearAll: et(e.clearAll, rt.clearAll)
  };
}
function ai(t) {
  return {
    searchPlaceholder: B(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: B(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: B(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: B(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: B(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: B(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: B(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: B(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: B(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: B(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: B(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: B(t, "%projectSelector_openButtonLabel%"),
    clearAll: B(t, "%projectSelector_clearAll%")
  };
}
function te(t) {
  return no[Mn(t)] ?? String(t);
}
const Ir = "platform.footerAction", pa = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ma({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = te(t);
  return e ? /* @__PURE__ */ n(
    ce,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: pa,
      children: r
    }
  ) : /* @__PURE__ */ n(ce, { variant: "secondary", children: r });
}
function ha({
  row: t,
  mode: e,
  strings: r,
  onClick: o,
  onOpen: a,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: c,
    open: u,
    onPointerEnter: w,
    onPointerLeave: y
  } = mo(), [E, p] = M(!1), k = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || t.isDisabled && !!t.disabledReason, m = u || E, C = L(() => {
    if (k) {
      p(!0);
      return;
    }
    w();
  }, [k, w]), H = L(() => {
    p(!1), y();
  }, [y]), P = /* @__PURE__ */ n(de, { className: b("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let J;
  e === "project" ? t.openGroups.length > 0 && (J = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((V) => /* @__PURE__ */ n(ce, { variant: "secondary", children: te(V) }, V)) })) : t.scrollGroupId !== void 0 && (J = /* @__PURE__ */ f("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      ma,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && a && /* @__PURE__ */ f(
      X,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (V) => {
          V.stopPropagation(), a(t);
        },
        onMouseDown: (V) => V.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ n(Nn, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const S = /* @__PURE__ */ f(
    we,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: C,
      onPointerLeave: H,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: P }),
        l && /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ f(
          "span",
          {
            ref: c,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Pn(t) && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        J
      ]
    }
  ), R = t.scrollGroupId !== void 0 ? te(t.scrollGroupId) : void 0, q = t.isBoundButClosed && R ? r.boundButClosedTooltip.replace("{group}", R) : void 0;
  return /* @__PURE__ */ f(St, { open: m, delayDuration: 400, children: [
    /* @__PURE__ */ n(kt, { asChild: !0, children: S }),
    /* @__PURE__ */ f(
      Ct,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", dir: "auto", children: Mr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && R && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              R,
              ")"
            ] })
          ] }),
          q && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: q }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ n("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function ga({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: o
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ f(Ve, { children: [
    /* @__PURE__ */ f(St, { children: [
      /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(Xe, { asChild: !0, children: /* @__PURE__ */ n(
        X,
        {
          variant: "ghost",
          size: "sm",
          className: b(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": o.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ n(bn, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ n(Ct, { children: o.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ f(
      Ze,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ue },
        children: [
          /* @__PURE__ */ n(We, { children: o.groupSectionLabel }),
          /* @__PURE__ */ f(ho, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ n(br, { value: Xt, children: o.groupByNone }),
            /* @__PURE__ */ n(Ye, {}),
            t.map((s) => /* @__PURE__ */ n(br, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function ba(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function si(t) {
  const [e, r] = M(!1), [o, a] = M(""), s = wt(() => fa(t.localizedStrings), [t.localizedStrings]), i = wt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(Vr(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      ua({
        label: s.autoSelectionGroupingLabel,
        selectedSectionHeading: s.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: s.autoSelectionUnselectedSectionHeading
      })
    ), h;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
  ]), [l, c] = M(void 0), u = wt(
    () => ba(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = l ?? u, y = _(null), [E, p] = M(void 0), k = L((h) => {
    r(h), h || (a(""), p(void 0));
  }, []);
  K(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const T = y.current;
      T && T.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const m = wt(() => t.mode === "project" ? _e({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? _e({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : _e({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), C = wt(() => {
    const h = o.trim().toLowerCase();
    return h ? m.filter(
      (T) => T.shortName.toLowerCase().includes(h) || (T.fullName ?? "").toLowerCase().includes(h)
    ) : m;
  }, [m, o]), H = wt(
    () => new Map(t.projects.map((h) => [it(h.id), h])),
    [t.projects]
  ), P = L(
    (h) => h === void 0 ? void 0 : H.get(it(h)),
    [H]
  ), { renderProjectIndicator: J } = t, S = L(
    (h) => J ? J(h.project) : void 0,
    [J]
  ), R = !!J, q = !!t.footerAction && C.length === 0, V = wt(() => {
    if (w === Xt) return Pe(C);
    const h = i.find((T) => T.id === w);
    return h ? la(C, h) : Pe(C);
  }, [C, w, i]), D = (h) => {
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, ot = (h) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: h.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const T = t.selection.pairs, z = it(h.projectId), Z = ($) => it($.projectId) === z && $.scrollGroupId === h.scrollGroupId, U = T.some(Z) ? T.filter(($) => !Z($)) : [
          ...T.filter(($) => !Z($)),
          { projectId: h.projectId, scrollGroupId: h.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: U });
        return;
      }
      case "projectScrollGroup": {
        if (h.isBoundButClosed && h.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(h.projectId, h.scrollGroupId), r(!1);
          return;
        }
        if (h.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: h.projectId,
            scrollGroupId: h.scrollGroupId
          }), r(!1);
          return;
        }
        const T = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: h.projectId, scrollGroupId: T }), t.onOpenProjectInGroup(h.projectId, T), r(!1);
      }
    }
  }, lt = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, pt = t.mode === "project" ? t.renderTriggerLabel : void 0, _t = t.mode === "project" ? t.triggerLabelFormat : void 0, F = wt(() => {
    switch (t.mode) {
      case "project": {
        const h = P(t.selection.projectId);
        if (pt)
          return { node: pt(h), title: "", hasSelection: !!h };
        let T = h ? h.shortName : s.buttonPlaceholder;
        return h && _t === "shortNameAndFullName" && (T = Mr(h)), { node: T, title: T, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const T = [];
        if (h.forEach((U) => {
          const $ = P(U.projectId);
          $ && T.push({ project: $, scrollGroupId: U.scrollGroupId });
        }), T.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const z = T.map(
          ({ project: U, scrollGroupId: $ }) => $ === void 0 ? U.shortName : `${U.shortName} (${te($)})`
        ).join(", "), Z = T.length.toString();
        return {
          node: /* @__PURE__ */ f(gt, { children: [
            /* @__PURE__ */ n(ce, { variant: "muted", className: "tw:shrink-0", children: Z }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: z })
          ] }),
          title: `${Z} ${z}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = P(t.selection.projectId);
        if (!h) {
          const Z = s.buttonPlaceholder;
          return { node: Z, title: Z, hasSelection: !1 };
        }
        const T = t.selection.scrollGroupId;
        if (T === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const z = te(T);
        return {
          node: `${h.shortName} · ${z}`,
          title: `${h.shortName} · ${z}`,
          accessibleTitle: `${h.shortName}, ${z}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    P,
    t.selection,
    pt,
    _t,
    s.buttonPlaceholder
  ]), Pt = _(null), [Ut, It] = M(!1);
  K(() => {
    const h = Pt.current;
    if (!h) return;
    const T = (Z) => {
      It(Z < wa);
    };
    if (T(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const z = new ResizeObserver((Z) => {
      Z.forEach((U) => {
        const [$] = U.borderBoxSize;
        T($ ? $.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return z.observe(h, { box: "border-box" }), () => z.disconnect();
  }, []);
  let G;
  t.isLoading ? G = /* @__PURE__ */ n(vn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ n(Ar, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ n(xn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? D : void 0, Q = s.ariaLabel && F.hasSelection && F.title ? `${s.ariaLabel}: ${F.accessibleTitle ?? F.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ f(
    X,
    {
      ref: Pt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": Q,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: b(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        Ut && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof F.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: F.node }) : F.node }),
        G
      ]
    }
  ), Tt = F.title ? /* @__PURE__ */ n(Et, { delayDuration: 400, children: /* @__PURE__ */ f(St, { children: [
    /* @__PURE__ */ n(kt, { asChild: !0, children: /* @__PURE__ */ n(Oe, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ n(Ct, { dir: "auto", children: F.title })
  ] }) }) : /* @__PURE__ */ n(Oe, { asChild: !0, children: ct }), jt = i.length > 1;
  return /* @__PURE__ */ f(Je, { open: e, onOpenChange: k, children: [
    Tt,
    /* @__PURE__ */ n(
      qe,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ n(Et, { delayDuration: 400, children: /* @__PURE__ */ f(
          ze,
          {
            shouldFilter: !1,
            value: q ? E ?? Ir : void 0,
            onValueChange: p,
            children: [
              /* @__PURE__ */ f("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
                  He,
                  {
                    value: o,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                jt && /* @__PURE__ */ n(
                  ga,
                  {
                    availableGroupings: i,
                    activeGrouping: w,
                    onChangeGrouping: c,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ n("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ n(X, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ f(Ue, { children: [
                /* @__PURE__ */ n(Ke, { children: s.commandEmptyMessage }),
                V.map((h, T) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ f(
                    wn,
                    {
                      children: [
                        /* @__PURE__ */ n(le, { heading: Na(h, s), children: h.rows.map((z) => /* @__PURE__ */ n(
                          ha,
                          {
                            row: z,
                            mode: t.mode,
                            strings: s,
                            onClick: ot,
                            onOpen: at,
                            selectedRowRef: y,
                            indicator: S(z),
                            reserveIndicatorSlot: R
                          },
                          z.rowKey
                        )) }),
                        T < V.length - 1 && /* @__PURE__ */ n(Re, { alwaysRender: !0 })
                      ]
                    },
                    `${h.kind}:${h.groupingId ?? ""}:${h.key ?? h.label ?? ""}`
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
                  C.length > 0 && /* @__PURE__ */ n(
                    Re,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ f(
                    we,
                    {
                      forceMount: !0,
                      value: Ir,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var h;
                        (h = t.footerAction) == null || h.onSelect(), k(!1);
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
function Na(t, e) {
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
const va = Tr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = mt();
    return /* @__PURE__ */ f(
      "div",
      {
        id: i,
        className: b("tw:relative tw:@container/search", { "tw:w-full": o }, a),
        children: [
          /* @__PURE__ */ n(
            yn,
            {
              className: b(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": c === "rtl" },
                { "tw:left-3": c === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            zr,
            {
              ref: l,
              className: b(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (u) => e(u.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ f(
            X,
            {
              variant: "ghost",
              size: "icon",
              className: b(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": c === "rtl" },
                { "tw:right-0": c === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ n(Lr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
va.displayName = "SearchBar";
const xa = 5;
function ii(t) {
  return ro(t).filter(
    (e) => !nt.isObsolete(nt.bookIdToNumber(e))
  );
}
function ya(t, e) {
  return t.filter((r) => {
    try {
      return jn(r) === e;
    } catch {
      return !1;
    }
  });
}
const li = (t, e, r) => ya(t, e).every((o) => r.includes(o));
function Sa(t, e) {
  return [
    ...new Set(t.map((o) => o.toUpperCase()))
  ].filter((o) => nt.bookIdToNumber(o) > 0).sort((o, a) => nt.bookIdToNumber(o) - nt.bookIdToNumber(a)).map((o) => oo(o, e));
}
function ci(t, e, r, o) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = Sa(t, o);
  if (i.length !== 0)
    return i.length <= xa ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function di({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ n(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: b("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function ka({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Ca({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-header",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Ea = Mt(
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
function _a({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ea({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function ui({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-title",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function Ia({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-description",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function Ta({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "empty-content",
      className: b(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function wi({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: o,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ f(ka, { className: b(s), role: a, children: [
    /* @__PURE__ */ f(Ca, { children: [
      /* @__PURE__ */ n(_a, { variant: "icon", children: o ?? /* @__PURE__ */ n(Sn, {}) }),
      /* @__PURE__ */ n(Ia, { children: t })
    ] }),
    r && /* @__PURE__ */ n(Ta, { children: /* @__PURE__ */ n(X, { onClick: () => r(), children: e }) })
  ] });
}
const La = Tr(({ className: t, ...e }, r) => /* @__PURE__ */ n(kn, { size: 35, className: b("tw:animate-spin", t), ...e, ref: r }));
La.displayName = "Spinner";
const Aa = Mt(
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
function fi({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: b(
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
function pi({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert-title",
      className: b(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function mi({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert-description",
      className: b(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function hi({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    Ge.Group,
    {
      "data-slot": "resizable-panel-group",
      className: b(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...a
    }
  );
}
function ie(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function gi({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: o,
  ...a
}) {
  return /* @__PURE__ */ n(
    Ge.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: ie(t),
      minSize: ie(e),
      maxSize: ie(r),
      collapsedSize: ie(o),
      ...a
    }
  );
}
function bi({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ge.Separator,
    {
      "data-slot": "resizable-handle",
      className: b(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Vt as $,
  ps as A,
  X as B,
  we as C,
  Ve as D,
  $e as E,
  Ur as F,
  Ue as G,
  Ke as H,
  cs as I,
  Ms as J,
  js as K,
  hs as L,
  Ya as M,
  es as N,
  rs as O,
  Je as P,
  os as Q,
  Ps as R,
  he as S,
  Et as T,
  go as U,
  Bs as V,
  ce as W,
  so as X,
  Hs as Y,
  zs as Z,
  Ye as _,
  oo as a,
  bi as a$,
  Pr as a0,
  Js as a1,
  Vs as a2,
  Us as a3,
  Ks as a4,
  qs as a5,
  Fs as a6,
  Ts as a7,
  ho as a8,
  br as a9,
  Wn as aA,
  xr as aB,
  fi as aC,
  mi as aD,
  pi as aE,
  ys as aF,
  ts as aG,
  as as aH,
  Vn as aI,
  qn as aJ,
  Qa as aK,
  Bo as aL,
  ka as aM,
  Ta as aN,
  Ia as aO,
  Ca as aP,
  _a as aQ,
  di as aR,
  ui as aS,
  ti as aT,
  na as aU,
  Ws as aV,
  Zo as aW,
  uo as aX,
  Es as aY,
  ks as aZ,
  Cs as a_,
  Zs as aa,
  Qs as ab,
  Ys as ac,
  zr as ad,
  si as ae,
  va as af,
  ii as ag,
  ya as ah,
  Re as ai,
  ws as aj,
  li as ak,
  Ss as al,
  ns as am,
  no as an,
  xs as ao,
  vs as ap,
  As as aq,
  Ds as ar,
  Rs as as,
  Is as at,
  Os as au,
  Ns as av,
  $r as aw,
  pe as ax,
  me as ay,
  Xn as az,
  St as b,
  gi as b0,
  hi as b1,
  wi as b2,
  La as b3,
  Xs as b4,
  $s as b5,
  _s as b6,
  jo as b7,
  ue as b8,
  Za as b9,
  ri as bA,
  _o as bB,
  Ao as bC,
  Ro as bD,
  Do as bE,
  qo as bF,
  Eo as bG,
  da as bH,
  ua as bI,
  Yo as bJ,
  Wa as bK,
  Io as bL,
  Mo as bM,
  Oo as bN,
  xt as bO,
  ci as bP,
  Po as bQ,
  Xa as ba,
  $n as bb,
  Fn as bc,
  qa as bd,
  Ja as be,
  Va as bf,
  $a as bg,
  vo as bh,
  io as bi,
  jr as bj,
  Cr as bk,
  Gs as bl,
  Ho as bm,
  zo as bn,
  ko as bo,
  Go as bp,
  ds as bq,
  Xt as br,
  rt as bs,
  ei as bt,
  Jn as bu,
  ni as bv,
  ai as bw,
  oi as bx,
  vr as by,
  qr as bz,
  b as c,
  kt as d,
  Ct as e,
  bs as f,
  fs as g,
  Xe as h,
  Ze as i,
  We as j,
  Ls as k,
  is as l,
  ls as m,
  ms as n,
  le as o,
  mt as p,
  eo as q,
  et as r,
  us as s,
  gs as t,
  mo as u,
  Oe as v,
  qe as w,
  ss as x,
  ze as y,
  He as z
};
//# sourceMappingURL=resizable-BLzTMRX8.js.map
