import { jsx as o, jsxs as m, Fragment as gt } from "react/jsx-runtime";
import { Slot as Ge, Dialog as yt, Separator as dn, Popover as Wt, Tooltip as qt, DropdownMenu as Q, Label as un, RadioGroup as Le } from "radix-ui";
import { IconX as wn, IconCheck as ze, IconSearch as fn, IconChevronLeft as pn, IconChevronRight as mn } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import wt, { useState as O, useRef as I, useCallback as _, createContext as hn, useContext as gn, useEffect as F, useMemo as ut, Fragment as Mr, useLayoutEffect as ae, useImperativeHandle as bn, useId as Nn, forwardRef as Or } from "react";
import { X as Pr, Check as ue, ChevronsUpDown as jr, Star as vn, Undo as xn, Redo as yn, SquareX as Br, FunctionSquare as Gr, SquareSigma as zr, Ban as Sn, Copy as kn, Group as Cn, ArrowRight as En, Loader2 as In, ChevronDown as _n, Search as Tn, AlertTriangle as Ln, LoaderCircle as An } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as br, GENERATOR_NOTE_CALLER as Ae, HIDDEN_NOTE_CALLER as De, isInsertEmbedOpOfType as Jt, getDefaultViewOptions as Dn, getMarkerMenuItems as Rn, defaultStyleInfo as Nr, Editorial as Mn } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as On, split as Hr, slice as Pn, formatReplacementString as jn, usfmMarkers as se, deepEqual as Gt, truncateToCopyLimit as Bn, getErrorMessage as vr, isPlatformError as Gn, ABORTED as zn, normalizeProjectId as it, compareProjectsByName as Hn, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Zt, formatProjectName as Ur, getLocalizeKeyForScrollGroupId as Un, hasDistinctFullName as Kn, getSectionForBook as Fn } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as He from "react-resizable-panels";
import { clsx as $n } from "clsx";
import { extendTailwindMerge as Jn, twMerge as qn } from "tailwind-merge";
const Vn = Jn({ prefix: "tw" });
function Re(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Xn(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Re(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, w) => w !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((d, w) => w !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Zn(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Re(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Re(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const d = a.slice(1);
    return [...n, `-tw-${d}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const d = a.slice(1);
    return [...n, `!tw-${d}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function g(...t) {
  const e = $n(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Vn(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const w = Xn(d);
    n.set(w.normalized, w.original), a.push(w.normalized);
  }), qn(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const w = n.get(d);
    return w ? Zn(d, w) : d;
  }).join(" ");
}
const Kr = 600, we = 650, ss = 400, Wn = 450, Yn = 500, is = 510, ls = 520, Qn = 675, cs = 690, ds = 700, us = 800, Fr = Ot(
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
function V({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const s = n ? Ge.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: g(Fr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const $r = "layoutDirection";
function Jr() {
  return globalThis.localStorage ?? void 0;
}
function pt() {
  var t;
  try {
    const e = (t = Jr()) == null ? void 0 : t.getItem($r);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function ws(t) {
  var e;
  try {
    (e = Jr()) == null || e.setItem($r, t);
  } catch {
  }
}
function fs({ ...t }) {
  return /* @__PURE__ */ o(yt.Root, { "data-slot": "dialog", ...t });
}
function ps({ ...t }) {
  return /* @__PURE__ */ o(yt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function to({ ...t }) {
  return /* @__PURE__ */ o(yt.Portal, { "data-slot": "dialog-portal", ...t });
}
function ms({ ...t }) {
  return /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", ...t });
}
function eo({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    yt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: g(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Wn, ...e },
      ...r
    }
  );
}
function hs({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: n,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: a,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  ...i
}) {
  const l = pt();
  return /* @__PURE__ */ m(to, { children: [
    /* @__PURE__ */ o(eo, { className: n, style: a }),
    /* @__PURE__ */ m(
      yt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Yn, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(V, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(wn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function gs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "dialog-header",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function bs({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "dialog-footer",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...n,
      children: [
        r,
        e && /* @__PURE__ */ o(yt.Close, { asChild: !0, children: /* @__PURE__ */ o(V, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ns({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    yt.Title,
    {
      "data-slot": "dialog-title",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function vs({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    yt.Description,
    {
      "data-slot": "dialog-description",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function qr({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: g(
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
function ro({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const no = Ot(
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
function oo({
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
    /* @__PURE__ */ o(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: g(no({ align: e }), t),
        onClick: (n) => {
          var a, s;
          n.target instanceof HTMLElement && n.target.closest("button") || (s = (a = n.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
        },
        ...r
      }
    )
  );
}
Ot("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht,
    {
      "data-slot": "command",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function Ke({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = pt(), s = wt.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !r || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), d = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      d && (i.preventDefault(), i.stopPropagation(), d.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(ro, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Ht.Input,
        {
          "data-slot": "command-input",
          className: g(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...n
        }
      ),
      /* @__PURE__ */ o(oo, { children: /* @__PURE__ */ o(fn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Fe({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht.List,
    {
      "data-slot": "command-list",
      className: g(
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
function $e({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Empty,
    {
      "data-slot": "command-empty",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function ce({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Group,
    {
      "data-slot": "command-group",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Me({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ht.Separator,
    {
      "data-slot": "command-separator",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function fe({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ m(
    Ht.Item,
    {
      "data-slot": "command-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ o(ze, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function ao({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "command-shortcut",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const so = [
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
], io = (t) => {
  var e;
  return ((e = so[t]) == null ? void 0 : e.chapters) ?? -1;
}, lo = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function co(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function M(t) {
  return `%scrollGroup_${t}%`;
}
const uo = {
  [M("undefined")]: "Ø",
  [M(0)]: "A",
  [M(1)]: "B",
  [M(2)]: "C",
  [M(3)]: "D",
  [M(4)]: "E",
  [M(5)]: "F",
  [M(6)]: "G",
  [M(7)]: "H",
  [M(8)]: "I",
  [M(9)]: "J",
  [M(10)]: "K",
  [M(11)]: "L",
  [M(12)]: "M",
  [M(13)]: "N",
  [M(14)]: "O",
  [M(15)]: "P",
  [M(16)]: "Q",
  [M(17)]: "R",
  [M(18)]: "S",
  [M(19)]: "T",
  [M(20)]: "U",
  [M(21)]: "V",
  [M(22)]: "W",
  [M(23)]: "X",
  [M(24)]: "Y",
  [M(25)]: "Z"
};
function Je(t, e) {
  return io(ot.bookIdToNumber(t));
}
function pe(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = ot.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
function xs(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = pe(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Je(s), 1),
      verseNum: 1
    };
}
function ys(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < Je(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = pe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ss(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = pe(n, e, "previous");
  if (!i) return;
  const l = Math.max(Je(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function ks(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = pe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Cs(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Es = (t, e, r, n, a) => {
  switch (t) {
    case Mt.OT:
      return e ?? "Old Testament";
    case Mt.NT:
      return r ?? "New Testament";
    case Mt.DC:
      return n ?? "Deuterocanon";
    case Mt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Is = (t, e, r, n, a) => {
  switch (t) {
    case Mt.OT:
      return e ?? "OT";
    case Mt.NT:
      return r ?? "NT";
    case Mt.DC:
      return n ?? "DC";
    case Mt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function _s(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function wo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Ts = Object.fromEntries(
  lo.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function Ls(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
const xr = `
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
function fo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${xr}, ${e}` : xr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && fo(n)
  );
}
const As = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Oe = "keyboard", yr = !1;
function Ds() {
  yr || typeof document > "u" || (yr = !0, document.addEventListener(
    "pointerdown",
    () => {
      Oe = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Oe = "keyboard";
    },
    !0
  ));
}
function Rs() {
  return Oe;
}
const Vr = "data-quiet-focus";
function Ms(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Vr, ""), t.style.outline = "none"));
}
function Os(t) {
  t && (t.removeAttribute(Vr), t.style.removeProperty("outline"));
}
const Ps = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function po({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    dn.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...n
    }
  );
}
const mo = Ot(
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
function qe({
  className: t,
  orientation: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        mo({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function js({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ge.Root : "div";
  return /* @__PURE__ */ o(
    n,
    {
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function Xr({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    po,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function Zr() {
  const t = wt.createContext(null);
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return wt.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function Ve({ ...t }) {
  return /* @__PURE__ */ o(Wt.Root, { "data-slot": "popover", ...t });
}
function Pe({ ...t }) {
  return /* @__PURE__ */ o(Wt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: ho, usePortalContainer: go } = Zr(), Bs = ho;
function Xe({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  ...a
}) {
  const s = pt(), i = go();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Wt.Portal, { container: i, children: /* @__PURE__ */ o(
      Wt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Kr, ...n },
        dir: s,
        ...a
      }
    ) })
  );
}
function bo({ ...t }) {
  return /* @__PURE__ */ o(Wt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Gs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function zs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Hs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Et({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    qt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function St({ ...t }) {
  return /* @__PURE__ */ o(qt.Root, { "data-slot": "tooltip", ...t });
}
function kt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    qt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? g(Fr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: No, usePortalContainer: vo } = Zr(), Us = No;
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
  showArrow: n = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: a,
  children: s,
  ...i
}) {
  const l = vo();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(qt.Portal, { container: l, children: /* @__PURE__ */ m(
      qt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Qn, ...r },
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          n && /* @__PURE__ */ o(
            qt.Arrow,
            {
              className: g(
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
const xo = /^%[^%]*%$/;
function Wr(t) {
  return t !== void 0 && !xo.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return Wr(t) ? t : e;
}
function yo() {
  const [t, e] = O(!1), r = I(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const Yr = hn(void 0);
function me() {
  const t = gn(Yr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const he = Ot("", {
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
function Ze({ variant: t = "default", ...e }) {
  const r = pt(), n = wt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Yr.Provider, { value: n, children: /* @__PURE__ */ o(Q.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Ks({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function We({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ye({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  children: a,
  ...s
}) {
  const i = pt();
  return /* @__PURE__ */ o(Q.Portal, { children: /* @__PURE__ */ o(
    Q.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: r,
      align: e,
      className: g(
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
      style: { zIndex: Kr, ...n },
      ...s,
      children: /* @__PURE__ */ o("div", { dir: i, children: a })
    }
  ) });
}
function Fs({ ...t }) {
  return /* @__PURE__ */ o(Q.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function $s({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = pt(), s = me();
  return /* @__PURE__ */ o(
    Q.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: g(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function Vt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = pt(), i = me();
  return /* @__PURE__ */ m(
    Q.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: i.variant })
      ),
      checked: r,
      dir: s,
      ...a,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ o(Q.ItemIndicator, { children: /* @__PURE__ */ o(ze, {}) })
          }
        ),
        e
      ]
    }
  );
}
function So({
  ...t
}) {
  return /* @__PURE__ */ o(Q.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Sr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = pt(), s = me();
  return /* @__PURE__ */ m(
    Q.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(Q.ItemIndicator, { children: /* @__PURE__ */ o(ze, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Qe({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    Q.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: g(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function tr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Q.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Js({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: g(
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
function qs({ ...t }) {
  return /* @__PURE__ */ o(Q.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Vs({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = me(), s = pt();
  return /* @__PURE__ */ m(
    Q.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        he({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(pn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(mn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Xs({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = pt();
  return /* @__PURE__ */ o(
    Q.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: g(
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
      style: { zIndex: we, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function Zs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    un.Root,
    {
      "data-slot": "label",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function Ws({
  className: t,
  ...e
}) {
  const r = pt();
  return /* @__PURE__ */ o(
    Le.Root,
    {
      "data-slot": "radio-group",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function Ys({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Le.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Le.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Qs = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), kr = (t, e) => t[e] ?? e;
function ko({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = kr(n, "%cancelButton_tooltip%"), l = s ?? kr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(qe, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        V,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Pr, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(Xr, {}),
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        V,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(ue, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function ge() {
  return /Macintosh/i.test(navigator.userAgent);
}
function ti() {
  return /Windows/i.test(navigator.userAgent);
}
const Co = ["input", "select", "textarea", "button"], Eo = ["button", "textbox"], ei = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = I(null), [s, i] = O(void 0), [l, d] = O(void 0), w = _(
    (u) => {
      i(u);
      const S = t.find((E) => E.id === u);
      S && (e == null || e(S));
      const p = document.getElementById(u);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), f = _(
    (u) => {
      const S = t.find((p) => p.id === u);
      S && (d((p) => p === u ? void 0 : u), r == null || r(S));
    },
    [r, t]
  ), k = (u) => {
    if (!u) return !1;
    const S = u.tagName.toLowerCase();
    if (u.isContentEditable || Co.includes(S)) return !0;
    const p = u.getAttribute("role");
    if (p && Eo.includes(p)) return !0;
    const E = u.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, y = _(
    (u) => {
      var Z;
      const S = u.target, p = (A) => A ? document.getElementById(A) : void 0, E = p(l), H = p(s);
      if (!!(E && S && E.contains(S) && S !== E) && k(S)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !S.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const A = t.find((U) => U.id === l);
            A && w(A.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!E) return;
          const A = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (A.length === 0) return;
          const U = A.findIndex((ft) => ft === S);
          if (U === -1) return;
          let lt;
          u.key === "ArrowDown" ? lt = Math.min(U + 1, A.length - 1) : lt = Math.max(U - 1, 0), lt !== U && (u.preventDefault(), u.stopPropagation(), (Z = A[lt]) == null || Z.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((A) => A.id === s);
      let D = C;
      switch (u.key) {
        case "ArrowDown":
          D = Math.min(C + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          D = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          D = 0, u.preventDefault();
          break;
        case "End":
          D = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const A = H;
          if (A) {
            const U = A.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), lt = A.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), ft = U ?? lt;
            if (ft) {
              u.preventDefault(), ft.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (k(S) || (n == null || n(u.key), u.preventDefault()));
          return;
      }
      const q = t[D];
      q && w(q.id);
    },
    [t, w, s, l, f, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: y,
    /** Focus an option by its ID */
    focusOption: w
  };
}, Io = Ot(
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
function de({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? Ge.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Io({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function ri({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function ni({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = wt.useRef(null);
  wt.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), wt.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Yt(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const d = new MutationObserver(() => {
      l();
    });
    return d.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      d.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Yt(l)[0].focus();
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
        className: g("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: a,
            onKeyDown: s,
            className: g(
              "tw:w-full tw:caption-bottom tw:text-sm",
              // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
              "tw:outline-hidden",
              // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
              "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
              t
            ),
            "aria-label": "Table",
            "aria-labelledby": "table-label",
            ...n
          }
        )
      }
    )
  );
}
function oi({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: g(
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
function ai({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function si({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: g(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function _o(t) {
  wt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Yt(t.current) : [], s = a.indexOf(document.activeElement), i = n.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        n.key === "Escape" && (n.preventDefault(), e.focus()), (n.key === "ArrowDown" || n.key === "ArrowUp") && n.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function To(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Lo(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ii({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = wt.useRef(null);
  wt.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), _o(i);
  const l = wt.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), d = wt.useCallback(
    (f) => {
      const { current: k } = i;
      if (!k || !k.parentElement) return;
      const y = k.closest("table"), u = y ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(y).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], S = u.indexOf(k), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), Lo(u, S, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), To(l, p, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const E = k.closest("table");
        E && E.focus();
      }
      e == null || e(f);
    },
    [i, l, e]
  ), w = wt.useCallback(
    (f) => {
      n && (r == null || r(f));
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: d,
      onFocus: w,
      className: g(
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
function li({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "th",
    {
      "data-slot": "table-head",
      className: g(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function ci({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "td",
    {
      "data-slot": "table-cell",
      className: g(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function di({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ao(t, e = !0) {
  const [r, n] = O(!1);
  return F(() => {
    const a = t.current;
    if (!e || !a) {
      n(!1);
      return;
    }
    const s = () => {
      n(a.scrollTop + a.clientHeight < a.scrollHeight - 1);
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
function Do({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Ao(r, e);
  return e ? (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ m("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
      t,
      n && /* @__PURE__ */ o(
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
function ui({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: w,
  isOpen: f = void 0,
  onOpenChange: k = void 0,
  isDisabled: y = !1,
  sortSelected: u = !1,
  showScrollCue: S = !1,
  icon: p = void 0,
  className: E = void 0,
  variant: H = "ghost",
  id: P
}) {
  const [X, C] = O(!1), D = I(null), q = _(
    (G) => {
      var tt;
      const at = (tt = t.find((ct) => ct.label === G)) == null ? void 0 : tt.value;
      at && r(
        e.includes(at) ? e.filter((ct) => ct !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), Z = () => w || n, A = f ?? X, U = k ?? C, [lt, ft] = O(A), [It, $] = O(e);
  lt !== A && (ft(A), A && $(e));
  const Pt = ut(() => {
    if (!u) return t;
    const G = t.filter((tt) => tt.starred).sort((tt, ct) => tt.label.localeCompare(ct.label)), at = t.filter((tt) => !tt.starred).sort((tt, ct) => {
      const Tt = It.includes(tt.value), jt = It.includes(ct.value);
      return Tt && !jt ? -1 : !Tt && jt ? 1 : tt.label.localeCompare(ct.label);
    });
    return [...G, ...at];
  }, [t, It, u]), Ut = () => {
    const G = t.map((at) => at.value);
    $(G), r(G);
  }, _t = () => {
    $([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: P, className: E, children: /* @__PURE__ */ m(Ve, { open: A, onOpenChange: U, children: [
    /* @__PURE__ */ o(Pe, { asChild: !0, children: /* @__PURE__ */ m(
      V,
      {
        variant: H,
        role: "combobox",
        "aria-expanded": A,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: y,
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: g(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: Z()
              }
            )
          ] }),
          /* @__PURE__ */ o(jr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Xe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Ue, { children: [
      /* @__PURE__ */ o(
        Ke,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(V, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(V, { variant: "ghost", size: "sm", onClick: _t, children: l })
      ] }),
      /* @__PURE__ */ o(Do, { isEnabled: S, scrollerRef: D, children: /* @__PURE__ */ m(Fe, { ref: D, children: [
        /* @__PURE__ */ o($e, { children: d }),
        /* @__PURE__ */ o(ce, { children: Pt.map((G) => /* @__PURE__ */ m(
          fe,
          {
            value: G.label,
            onSelect: q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                ue,
                {
                  className: g(
                    "tw:h-4 tw:w-4",
                    e.includes(G.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              G.starred && /* @__PURE__ */ o(vn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: G.label }),
              G.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: G.secondaryLabel })
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
function Ro(t, e) {
  if (!t || e === "") return !1;
  const r = xt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && xt(n.marker).toLowerCase() === r
  );
}
function Mo(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = xt(e).toLowerCase();
  return r === "passive" ? br({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : br({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function je(t) {
  return t.isComposing || t.keyCode === 229;
}
const Qr = /^[a-z0-9+-]$/i;
function Oo(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ge()) && e !== "Dead") {
    if (Qr.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Po = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], jo = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Bo() {
  return [...Po, ...jo.filter((t) => Qr.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function Go(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (je(t) || On.has(t.key))
    return "passed";
  const a = !ge();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), Mo(
      e.items.map((w) => ({ label: w.marker })),
      e.filter,
      // The host-driven mode, for every kind: all marker palettes are host-driven (the session
      // owns the query and the palette renders it read-only), so this commit must resolve against
      // the same list the host filtered. `'passive'` is that mode's name — a label PREFIX match,
      // mirroring PT9's marker dropdown — not containment. Ranking cmdk's way here instead would
      // commit an item the rendered list never offered.
      "passive"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return dt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (dt(t), e.filter === "")
        return r.dismiss(), "ended";
      const f = xt(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, f)) {
        const k = e.items.find(
          (y) => xt(y.marker).toLowerCase() === f
        );
        return k && r.commitItem(k.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const d = xt(e.filter).toLowerCase(), w = e.items.find(
      (f) => xt(f.marker).toLowerCase() === d
    );
    return w && r.commitItem(w.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = Oo(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function zo(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function tn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Ho(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Uo(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: d,
    restoreSelectionIfLost: w,
    hasEditorChangedSinceFocus: f,
    focusEditor: k,
    applyItem: y,
    onShowError: u
  } = t, S = () => {
    w(), k();
  };
  a.current += 1;
  const p = a.current, E = () => a.current === p, H = { kind: r, token: p, filter: "", items: e };
  n && (H.isNoteMarker = n), s(H), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Bo(),
    onKey: (P) => l(P)
  }).then((P) => {
    if (i(p), P !== void 0) {
      const X = (f == null ? void 0 : f()) ?? !1;
      S();
      const C = X ? void 0 : e.find((D) => D.marker === P);
      C && y(C);
    } else E() && S();
  }).catch((P) => {
    i(p), E() && S(), u(P);
  });
}
function Ko(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: l,
    hasEditorChangedSinceFocus: d
  } = e, w = r.current;
  if (!w) return "no-session";
  const f = (y) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    y();
  };
  return Go(t, w, {
    update: (y) => a.update(y),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (y) => f(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedMarker(y);
    }),
    commitTypedAndReopen: (y) => f(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedMarker(y, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (y) => f(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedCloser(y);
    }),
    commitItem: (y) => f(() => {
      var S;
      const u = w.items.find((p) => p.marker === y);
      u && (s(), (S = n.current) == null || S.applyMarkerMenuSelection(u, {
        trigger: "backslash",
        literalPrefixLanded: !1
      }));
    })
  }) === "ended" && l(w.token), "routed";
}
function Fo({
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  F(() => {
    const n = r ?? document, a = () => {
      t() && e();
    };
    return n.addEventListener("compositionstart", a, { capture: !0 }), () => {
      n.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
function $o({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  F(() => {
    const i = s ?? document, l = (d) => {
      var k, y;
      const w = (k = t.current) == null ? void 0 : k.querySelector(".editor-input");
      if (!w || d.target !== w) return;
      const f = (y = e.current) == null ? void 0 : y.getSelection();
      f && (r.current = f), a() && (n.current = tn(
        () => {
          var u;
          return (u = e.current) == null ? void 0 : u.getUsj();
        },
        () => {
          var u;
          return (u = e.current) == null ? void 0 : u.getSelection();
        }
      ));
    };
    return i.addEventListener("focusout", l), () => i.removeEventListener("focusout", l);
  }, [t, e, r, n, a, s]);
}
function Jo({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = I(void 0), a = _(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = _(
    (i) => {
      var l;
      zo(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return F(
    () => () => {
      var i;
      (i = n.current) == null || i.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: s };
}
function Cr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd",
      className: g(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function qo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Vo = /* @__PURE__ */ new Set([
  "⌘",
  "⌥",
  "⌃",
  "⇧",
  "⇥",
  "⏎",
  "⌫",
  "⎋",
  "␣",
  "↑",
  "↓",
  "←",
  "→"
]);
function Xo(t) {
  const e = Hr(t, "");
  let r = 0;
  for (; r < e.length && Vo.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Pn(t, r);
  return a ? [...n, a] : n;
}
function Zo(t) {
  const e = [];
  let r = "";
  return Hr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Wo(t) {
  const e = Xo(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Zo(t), separator: "+" };
}
function Er({ hint: t }) {
  const { keycaps: e, separator: r } = Wo(t);
  return e.length === 1 ? /* @__PURE__ */ o(Cr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(qo, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Mr, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Cr, { children: n })
      ] }, a)
    )) })
  );
}
const wi = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Ir = (t, e) => t[e] ?? e;
function Yo({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = ge(), w = Ir(a, "%undoButton_tooltip%"), f = Ir(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(qe, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        V,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(xn, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(Er, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(Xr, {}),
    e && /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        V,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(yn, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(Er, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Qo({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = I(null);
  return F(() => {
    var d;
    const s = ge(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (w) => {
      var k, y, u, S;
      if (!i || document.activeElement !== i) return;
      const f = w.key.toLowerCase();
      if (s) {
        if (!w.metaKey) return;
        !w.shiftKey && f === "z" ? (w.preventDefault(), r && ((k = e.current) == null || k.undo())) : w.shiftKey && f === "z" && (w.preventDefault(), n && ((y = e.current) == null || y.redo()));
      } else {
        if (!w.ctrlKey) return;
        !w.shiftKey && f === "z" ? (w.preventDefault(), r && ((u = e.current) == null || u.undo())) : (f === "y" || w.shiftKey && f === "z") && (w.preventDefault(), n && ((S = e.current) == null || S.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function ta() {
  const t = I(void 0), e = I(new DOMRect()), r = I({
    getBoundingClientRect: () => {
      var s;
      const a = (s = t.current) == null ? void 0 : s.measure();
      return a && (e.current = a), e.current;
    },
    get contextElement() {
      var a;
      return (a = t.current) == null ? void 0 : a.contextElement;
    }
  }), n = _((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return ut(() => ({ virtualRef: r, setSource: n }), [n]);
}
function ea(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function ra(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const na = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function oa({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = I(!1), i = I(null), l = I(null), d = I(!1), [w, f] = O(t), [k, y] = O(e), [u, S] = O(!1), p = I(!1), E = I(w);
  E.current = w;
  const H = I(k);
  H.current = k, F(() => {
    f(t);
  }, [t]), F(() => {
    k !== e && y(e);
  }, [e]);
  const P = (C) => {
    if (d.current = !1, S(C), !C) {
      const D = E.current, q = H.current;
      D !== "custom" || q ? (D !== t || q !== e) && (s.current = !0, r(D, q)) : (f(t), y(e));
    }
  }, X = (C) => {
    var D, q, Z, A;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((D = i.current) == null || D.focus(), d.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? ((q = l.current) == null || q.focus(), d.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((Z = i.current) == null ? void 0 : Z.selectionStart) === 0 && ((A = l.current) == null || A.focus(), d.current = !1), w === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && P(!1);
  };
  return /* @__PURE__ */ m(Ze, { open: u, onOpenChange: P, children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(We, { asChild: !0, children: /* @__PURE__ */ o(V, { variant: "outline", className: "tw:h-6", children: na(t, n, e) }) }) }),
      /* @__PURE__ */ o(Ct, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      Ye,
      {
        style: { zIndex: we },
        onEscapeKeyDown: () => {
          E.current = t, H.current = e, f(t), y(e);
        },
        onCloseAutoFocus: (C) => {
          s.current && (s.current = !1, C.preventDefault(), a());
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: X,
        onMouseMove: () => {
          var C;
          d.current && ((C = i.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ o(Qe, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(tr, {}),
          /* @__PURE__ */ o(
            Vt,
            {
              checked: w === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ae })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Vt,
            {
              checked: w === "hidden",
              onCheckedChange: () => f("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: De })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Vt,
            {
              ref: l,
              checked: w === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                p.current = w === "custom";
              },
              onClick: (C) => {
                var D;
                if (C.stopPropagation(), p.current && C.target !== i.current) {
                  P(!1);
                  return;
                }
                d.current = !0, (D = i.current) == null || D.focus();
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  qr,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), f("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: k,
                    onKeyDown: (C) => {
                      C.key === "Enter" || C.key === "ArrowUp" || C.key === "ArrowDown" || C.key === "ArrowLeft" || C.key === "ArrowRight" || C.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (C) => y(C.target.value)
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
const aa = (t, e) => t === "f" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Gr, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(zr, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Br, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), sa = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), jn(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ia({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = I(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(We, { asChild: !0, children: /* @__PURE__ */ o(V, { variant: "outline", className: "tw:h-6", children: aa(t, r) }) }) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: sa(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      Ye,
      {
        style: { zIndex: we },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), a());
        },
        children: [
          /* @__PURE__ */ o(Qe, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(tr, {}),
          /* @__PURE__ */ m(
            Vt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Br, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Vt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Gr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Vt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(zr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const _r = '[aria-controls="editor-context-menu"]';
function la(t) {
  return t ? t.matches(_r) ? !0 : !!t.querySelector(_r) : !1;
}
const fi = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%",
  // These four keys are not read by this component directly; they are provided here so callers
  // can localize them and pass the result into the optional `searchPlaceholder` prop to override
  // the default search-field placeholder.
  "%markerMenu_searchPlaceholder_character%",
  "%markerMenu_searchPlaceholder_insert%",
  "%markerMenu_searchPlaceholder_newParagraph%",
  "%markerMenu_searchPlaceholder_paragraph%"
]);
function ca({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Sn, { className: e, size: 16 });
}
function da({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(ue, { size: 16 })
    }
  );
}
function Tr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    fe,
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
        t.selectionState !== void 0 && /* @__PURE__ */ o(da, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(ca, { icon: t.icon }) }) }),
        /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
          /* @__PURE__ */ o("p", { className: "tw:min-w-0 tw:shrink tw:truncate tw:text-sm", title: t.title, children: t.title }),
          t.subtitle && /* @__PURE__ */ o(
            "p",
            {
              className: "tw:min-w-0 tw:shrink-[9999] tw:truncate tw:text-end tw:text-xs tw:text-muted-foreground",
              title: t.subtitle,
              children: t.subtitle
            }
          )
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(ao, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ua({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n
}) {
  const [a, s] = O(""), [i, l] = ut(() => {
    const d = xt(a.trim().toLowerCase());
    if (!d) {
      const k = e.filter((y) => !y.isDisallowed);
      return [k.length > 0 ? k : e, []];
    }
    const w = e.filter((k) => {
      var u;
      const y = (u = k.marker) == null ? void 0 : u.toLowerCase();
      return k.isDisallowed ? y === d : y == null ? void 0 : y.includes(d);
    }), f = e.filter(
      (k) => k.title.toLowerCase().includes(d) && !w.includes(k)
    );
    return [w, f];
  }, [a, e]);
  return /* @__PURE__ */ m(Ue, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ o(
      Ke,
      {
        className: "marker-menu-search",
        ref: r,
        value: a,
        onValueChange: (d) => s(d),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(Fe, { children: [
      /* @__PURE__ */ o($e, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ce, { children: i.map((d) => {
        var w;
        return /* @__PURE__ */ o(
          Tr,
          {
            item: d,
            localizedStrings: t
          },
          `item-${d.marker ?? ((w = d.icon) == null ? void 0 : w.displayName)}-${d.title.replaceAll(" ", "")}`
        );
      }) }),
      l.length > 0 && /* @__PURE__ */ m(gt, { children: [
        i.length > 0 && /* @__PURE__ */ o(Me, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ce, { children: l.map((d) => {
          var w;
          return /* @__PURE__ */ o(
            Tr,
            {
              item: d,
              localizedStrings: t
            },
            `item-${d.marker ?? ((w = d.icon) == null ? void 0 : w.displayName)}-${d.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function wa(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = se[n], i = s != null && s.children ? s : a && se[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((w) => ({
        marker: w,
        title: r[se[w].description] ?? se[w].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(w), e();
        }
      }))
    );
  }), l.sort((d, w) => (d.marker ?? d.title).localeCompare(w.marker ?? w.title));
}
function Lr(t) {
  if (!t || !Jt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function fa(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function pa(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function ma(t, e) {
  let r = 0, n = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const i = t[r];
      return n !== 0 || !i || !Gt(i, a) ? !1 : (r += 1, !0);
    }
    let s = a.insert;
    for (; s.length > 0; ) {
      const i = t[r];
      if (!i || typeof i.insert != "string" || !Gt(i.attributes, a.attributes))
        return !1;
      const l = i.insert.slice(n), d = Math.min(l.length, s.length);
      if (l.slice(0, d) !== s.slice(0, d)) return !1;
      s = s.slice(d), n += d, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function ha(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ga(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const ba = 300, _e = "*", Na = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function pi({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: w,
  inline: f = !1,
  ref: k,
  initialCaretPosition: y,
  markerPalette: u,
  onNoteEdit: S
}) {
  var gr;
  const p = I(null), E = I(null), H = I(null), P = I(s);
  F(() => {
    P.current = s;
  }, [s]);
  const X = I(y);
  F(() => {
    X.current = y;
  }, [y]);
  const C = _(() => {
    var b, N;
    const c = X.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (N = p.current) == null || N.selectNote(0);
  }, []);
  ae(() => {
    if (f || !H.current) return;
    const c = parseFloat(getComputedStyle(H.current).width);
    c > 0 && (H.current.style.width = `${c}px`);
  }, [f]);
  const [D, q] = O("generated"), [Z, A] = O("generated"), [U, lt] = O(_e), [ft, It] = O(_e), [$, Pt] = O("f"), [Ut, _t] = O(!1), [G, at] = O(!0), [tt, ct] = O(!1), Tt = I(!1), jt = I(""), h = I(!1), L = I(void 0), z = I([]), W = I([]), K = I(void 0), J = I(void 0), nr = _(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (z.current = [...z.current, ...c], K.current = void 0);
  }, []), or = _(
    (c, b) => {
      var x, R;
      if (!c) return;
      const N = Lr(c), v = Lr(b);
      if (!N && v) {
        K.current = {
          text: z.current,
          closedNoteOp: c,
          openNoteOp: b
        }, z.current = [];
        return;
      }
      const T = K.current;
      T && (N && !v && Gt(c, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((R = (x = p.current) == null ? void 0 : x.getOpsAfterNote(0)) != null && R.length) ? (z.current = T.text, K.current = void 0) : Gt(b, T.openNoteOp) || (K.current = void 0));
    },
    []
  ), [bt, te] = O(!1), be = ta(), [ar, rn] = O(), sr = I(null), mt = I(
    void 0
  ), nn = I(0), ir = I(u);
  F(() => {
    ir.current = u;
  }, [u]), F(
    () => () => {
      var c;
      mt.current && (mt.current = void 0, (c = ir.current) == null || c.dismiss());
    },
    []
  );
  const Ne = I(void 0), ve = I(void 0), ee = _(
    () => Ho(
      ve.current,
      tn(
        () => {
          var c;
          return (c = p.current) == null ? void 0 : c.getUsj();
        },
        () => {
          var c;
          return (c = p.current) == null ? void 0 : c.getSelection();
        }
      )
    ),
    []
  ), { setSession: lr, clearSessionIfCurrent: re } = Jo({
    sessionRef: mt,
    editorRef: p,
    baselineRef: ve
  }), Kt = _(() => {
    var b, N, v;
    if ((b = p.current) != null && b.getSelection()) return;
    const c = Ne.current;
    c ? (N = p.current) == null || N.setSelection(c) : (v = p.current) == null || v.selectNote(0);
  }, []), ne = _(() => {
    var c;
    Kt(), (c = p.current) == null || c.focus();
  }, [Kt]), Lt = ut(
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
        ...i.view ?? Dn(),
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
  ), xe = ut(
    () => wa(
      p,
      () => te(!1),
      d,
      ar,
      $
    ),
    [d, ar, $]
  );
  F(() => {
    var c;
    bt || (c = p.current) == null || c.focus();
  }, [$, bt]);
  const At = _(() => {
    var v, T, x;
    const c = (v = E.current) == null ? void 0 : v.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), N = (x = (T = E.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : x.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), Bt = _(
    (c = !1) => {
      var N, v, T, x, R;
      S == null || S();
      const b = (v = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : v.at(0);
      if (b && Jt("note", b) && (r == null || r([b]), c && w && P.current)) {
        const j = [
          ...z.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], Y = W.current, Nt = !Gt(j, Y);
        if (f && !Nt && Gt(b, L.current))
          return;
        L.current = b;
        const et = [b];
        Nt && (Y.length > 0 && ma(
          ((x = w.current) == null ? void 0 : x.getOpsAfterNote(P.current)) ?? [],
          Y
        ) && et.push({ delete: pa(Y) }), et.push(...j), W.current = j), (R = w.current) == null || R.replaceEmbedUpdate(P.current, et);
      }
    },
    [f, r, S, w]
  ), ye = _(
    (c) => {
      var N, v, T;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (v = p.current) == null || v.applyUpdate([c, { delete: 1 }]), b && ((T = p.current) == null || T.setSelection(b)), ne();
    },
    [ne]
  ), cr = _(
    (c, b) => {
      var T, x, R;
      mt.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const N = (R = (x = p.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : R.at(0);
      if (!N || !Jt("note", N) || !N.insert.note) return;
      let v;
      c === "custom" ? v = b : c === "generated" ? v = Ae : v = De, N.insert.note.caller !== v && (N.insert.note.caller = v, ye(N));
    },
    [ye]
  ), Ft = I(void 0), Se = I(Bt);
  F(() => {
    Se.current = Bt;
  }, [Bt]);
  const $t = _(() => {
    Ft.current !== void 0 && (clearTimeout(Ft.current), Ft.current = void 0);
  }, []), ht = _(() => {
    Ft.current !== void 0 && ($t(), Se.current(!0));
  }, [$t]), dr = _(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, Se.current(!0);
    }, ba);
  }, [$t]);
  F(() => {
    var T, x;
    let c, b, N;
    Tt.current = !1, h.current = !1, Ne.current = void 0, at(!0);
    const v = e == null ? void 0 : e.at(0);
    if (L.current = v, z.current = [], W.current = [], K.current = void 0, J.current = void 0, v && Jt("note", v)) {
      const R = (T = v.insert.note) == null ? void 0 : T.caller;
      let j = "custom";
      R === Ae ? j = "generated" : R === De && (j = "hidden");
      const Y = j === "custom" && R !== void 0 ? R : _e;
      lt(Y), It(Y), q(j), A(j), Pt(((x = v.insert.note) == null ? void 0 : x.style) ?? "f"), c = setTimeout(() => {
        var et, st, vt, Dt;
        const Nt = (st = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : st.at(0);
        (vt = p.current) == null || vt.applyUpdate(Nt ? [v, { delete: 1 }] : [v]), C(), (Dt = p.current) == null || Dt.focus(), b = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var Rt;
            At() || (C(), (Rt = p.current) == null || Rt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      ht(), X.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, ht, At, C]), ae(() => () => ht(), [ht]);
  const ur = _(() => {
    var c;
    h.current && (mt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), ht());
  }, [ht]);
  bn(
    k,
    () => ({
      flushPendingEdits: ur,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = H.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [ur]
  );
  const ke = _(() => {
    var c, b;
    if (!mt.current) {
      const N = (c = E.current) == null ? void 0 : c.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    f ? ht() : ($t(), Bt(!0)), n();
  }, [$t, ht, f, n, Bt]), Ce = I(ke);
  ae(() => {
    Ce.current = ke;
  });
  const Ee = I({ book: a.book, chapterNum: a.chapterNum });
  ae(() => {
    (Ee.current.book !== a.book || Ee.current.chapterNum !== a.chapterNum) && (Ee.current = { book: a.book, chapterNum: a.chapterNum }, Ce.current());
  }, [a.book, a.chapterNum]);
  const on = async () => {
    var N;
    const c = (N = E.current) == null ? void 0 : N.getElementsByClassName("editor-input")[0];
    if (!(c != null && c.textContent)) return;
    const b = Bn(c.textContent, i.copyLimit);
    if (b)
      try {
        await navigator.clipboard.writeText(b);
      } catch (v) {
        console.warn(`Could not copy the footnote to the clipboard: ${vr(v)}`);
      }
  }, an = _(
    (c, b) => {
      S == null || S(), q(c), lt(b), cr(c, b), f && ht();
    },
    [cr, ht, f, S]
  ), sn = (c) => {
    var N, v, T, x, R;
    Pt(c), mt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (T = (v = p.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && Jt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const j = (R = (x = b.insert.note) == null ? void 0 : x.contents) == null ? void 0 : R.ops;
      $ !== "x" && c === "x" ? j == null || j.forEach((Y) => ha(Y)) : $ === "x" && c !== "x" && (j == null || j.forEach((Y) => ga(Y))), ye(b), f && ht();
    }
  }, ln = (c) => {
    rn(c.contextMarker), ct(c.canRedo);
  }, cn = _(
    (c) => {
      var N, v, T, x, R, j, Y;
      const b = (v = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : v.at(0);
      if (b && Jt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const Nt = (T = b.insert.note) == null ? void 0 : T.style, et = (R = (x = b.insert.note) == null ? void 0 : x.contents) == null ? void 0 : R.ops;
        if (Nt || _t(!1), _t(
          Nt === "x" ? !!(et != null && et.every((st) => {
            var Dt, Rt;
            if (!((Dt = st.attributes) != null && Dt.char)) return !0;
            const vt = ((Rt = st.attributes) == null ? void 0 : Rt.char).style;
            return vt === "xt" || vt === "xo" || vt === "xq";
          })) : !!(et != null && et.every((st) => {
            var Dt, Rt;
            if (!((Dt = st.attributes) != null && Dt.char)) return !0;
            const vt = ((Rt = st.attributes) == null ? void 0 : Rt.char).style;
            return vt === "ft" || vt === "fr" || vt === "fq";
          }))
        ), !Tt.current) {
          Tt.current = !0, jt.current = JSON.stringify(b), J.current = b, at(!0);
          return;
        }
        h.current = !0, or(J.current, b), J.current = b, (Y = (j = p.current) == null ? void 0 : j.getOpsAfterNote(0)) != null && Y.length && setTimeout(nr, 0), at(JSON.stringify(b) === jt.current), Bt(), f && dr();
      } else
        _t(!1), at(!0);
    },
    [
      f,
      Bt,
      dr,
      or,
      nr
    ]
  ), wr = _(() => {
    const c = window.getSelection();
    if (!xe.length || !c || c.rangeCount === 0)
      return;
    const b = E.current;
    if (!b) return;
    const N = c.getRangeAt(0).cloneRange();
    be.setSource({
      measure: () => {
        const v = ea(N);
        return v && ra(v);
      },
      contextElement: b
    }), te(!0);
  }, [xe, be]), Ie = I(() => {
  }), fr = _(
    (c, b, N) => {
      const { anchorRect: v } = c;
      if (!u || !v) return;
      const { hasTextSelection: T } = N;
      Uo({
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: T ? "selection" : "backslash",
        // The Space note rule: when the typed filter names a NOTE marker in the stylesheet, Space
        // commits that marker if this list OFFERS it and inserts NOTHING if it does not. This
        // popover's list offers note-INTERNAL markers only, so a typed `\f` always takes the second
        // branch — which is the point of the rule here: materializing it would make a NESTED `\f `
        // literal, and the Tier-2 tokenizer would absorb the following word into it as a caller
        // just as it does in body text. Decided from the stylesheet rather than from the offered
        // items for exactly that reason.
        // Same stylesheet the items come from: while the data provider is loading, or after it
        // errors, `styleInfo` is undefined and the list is built from the default, so reading the
        // raw value here would turn the rule off exactly when it is needed.
        isNoteMarker: (x) => Ro(Lt.styleInfo ?? Nr, x),
        sessionCounterRef: nn,
        setSession: lr,
        clearSessionIfCurrent: re,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (x) => Ie.current(x),
        show: (x) => u.show({
          items: b.map(fa),
          anchor: v,
          keyForwarding: x
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ee,
        focusEditor: () => {
          var x;
          return (x = p.current) == null ? void 0 : x.focus();
        },
        applyItem: (x) => {
          var R;
          return (R = p.current) == null ? void 0 : R.applyMarkerMenuSelection(x, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (x) => {
          (!Gn(x) || x.code !== zn) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${vr(x)}`
          );
        }
      });
    },
    [
      u,
      Kt,
      ee,
      Lt.styleInfo,
      lr,
      re
    ]
  ), oe = _(() => {
    var N;
    const c = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = Rn(Lt.styleInfo ?? Nr, c);
    return b.length === 0 ? !1 : (fr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [fr, Lt.styleInfo]);
  Fo({
    isSessionOpen: _(() => !!mt.current, []),
    dismiss: _(() => u == null ? void 0 : u.dismiss(), [u])
  });
  const pr = _(
    (c) => {
      if (!u) return;
      Ko(c, {
        sessionRef: mt,
        editorRef: p,
        palette: u,
        restoreCaret: Kt,
        reopenAtCaret: oe,
        clearSessionIfCurrent: re,
        hasEditorChangedSinceFocus: ee
      }) === "no-session" && u.dismiss();
    },
    [
      u,
      oe,
      Kt,
      re,
      ee
    ]
  );
  F(() => {
    Ie.current = pr;
  }, [pr]), $o({
    containerRef: E,
    editorRef: p,
    selectionRef: Ne,
    baselineRef: ve,
    isSessionOpen: _(() => !!mt.current, [])
  }), F(() => {
    const c = () => {
      bt && te(!1);
    };
    return window.addEventListener("click", c), () => {
      window.removeEventListener("click", c);
    };
  }, [bt]), F(() => {
    var c;
    bt && ((c = sr.current) == null || c.focus());
  }, [bt]), F(() => {
    var N;
    const c = () => {
      var v;
      return ((v = E.current) == null ? void 0 : v.querySelector(".editor-input")) ?? void 0;
    };
    if (((N = Lt.view) == null ? void 0 : N.markerMode) === "editable") {
      const v = (x) => {
        var Y, Nt, et, st;
        if (je(x)) return;
        const R = mt.current, j = c();
        if (!(!j || document.activeElement !== j)) {
          if (R && u) {
            Ie.current(x);
            return;
          }
          if (la(E.current)) {
            x.key === l && (x.preventDefault(), x.stopPropagation());
            return;
          }
          if (x.key === "Enter" && !At()) {
            x.preventDefault(), x.stopPropagation(), (Y = p.current) == null || Y.selectNote(0), (Nt = p.current) == null || Nt.focus();
            return;
          }
          if (u && x.key === l) {
            if (!At()) {
              x.preventDefault(), x.stopPropagation(), (et = p.current) == null || et.selectNote(0), (st = p.current) == null || st.focus();
              return;
            }
            oe() && (x.preventDefault(), x.stopPropagation());
          }
        }
      }, T = () => {
        var R, j;
        const x = c();
        !x || document.activeElement !== x || At() || ((R = p.current) == null || R.selectNote(0), (j = p.current) == null || j.focus());
      };
      return document.addEventListener("keydown", v, { capture: !0 }), document.addEventListener("paste", T, { capture: !0 }), () => {
        document.removeEventListener("keydown", v, { capture: !0 }), document.removeEventListener("paste", T, { capture: !0 });
      };
    }
    const b = (v) => {
      const T = c();
      !bt && T && document.activeElement === T && v.key === l ? (v.preventDefault(), wr()) : bt && v.key === "Escape" && (v.preventDefault(), te(!1));
    };
    return document.addEventListener("keydown", b), () => {
      document.removeEventListener("keydown", b);
    };
  }, [
    bt,
    wr,
    l,
    (gr = Lt.view) == null ? void 0 : gr.markerMode,
    Lt.styleInfo,
    u,
    oe,
    At
  ]), F(() => {
    const c = H.current;
    if (!f || !c) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || je(N) || (N.preventDefault(), N.stopPropagation(), Ce.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [f]), F(() => {
    const c = () => {
      var v, T, x;
      const b = ((v = E.current) == null ? void 0 : v.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || At() || ((T = p.current) == null || T.selectNote(0), (x = p.current) == null || x.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [At]);
  const mr = d["%footnoteEditor_copyButton_tooltip%"], hr = /* @__PURE__ */ o(
    Yo,
    {
      onUndoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.undo();
      },
      onRedoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.redo();
      },
      canUndo: !G,
      canRedo: tt,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ m(gt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: H,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                ia,
                {
                  isTypeSwitchable: Ut,
                  noteType: $,
                  handleNoteTypeChange: sn,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              /* @__PURE__ */ o(
                oa,
                {
                  callerType: D,
                  customCaller: U,
                  updateCaller: an,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              f && hr
            ] }),
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(qe, { children: [
              hr,
              /* @__PURE__ */ o(
                ko,
                {
                  onCancelClick: n,
                  onAcceptClick: ke,
                  canAccept: !G || Z !== D || D === "custom" && U !== ft,
                  localizedStrings: d,
                  acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ m(
            "div",
            {
              ref: E,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  Qo,
                  {
                    editorRef: p,
                    canUndo: !G,
                    canRedo: tt,
                    children: /* @__PURE__ */ o(
                      Mn,
                      {
                        options: Lt,
                        onStateChange: ln,
                        onUsjChange: cn,
                        defaultUsj: Na,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
                  /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
                    V,
                    {
                      "aria-label": mr,
                      onClick: on,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(kn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: mr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(Ve, { open: bt, children: [
      /* @__PURE__ */ o(bo, { virtualRef: be.virtualRef }),
      /* @__PURE__ */ o(
        Xe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            ua,
            {
              markerMenuItems: xe,
              localizedStrings: d,
              searchRef: sr
            }
          )
        }
      )
    ] })
  ] });
}
function va(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = it(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Ar(t, e, r) {
  const n = it(e);
  return t.some(
    (a) => it(a.projectId) === n && a.scrollGroupId === r
  );
}
function Te(t) {
  const e = va(t.openTabs);
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
  const n = [];
  return t.projects.forEach((a) => {
    const s = e.get(it(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Ar(r, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
      return;
    }
    s.forEach((i) => {
      n.push({
        rowKey: `tab:${a.id}:${i.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Ar(r, a.id, i.scrollGroupId),
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
    if (n.some(
      (l) => it(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => it(l.id) === s);
    i && n.push({
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
  }), n;
}
const er = "Selected", rr = "Unselected";
function Dr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Hn(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Be(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function xa(t) {
  const e = t.filter(Dr).sort(zt), r = t.filter((a) => !Dr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function ya(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var w;
    const d = (w = e.getSectionHeading) == null ? void 0 : w.call(
      e,
      i,
      l.map((f) => f.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? er : rr;
  }, s = [];
  return r.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: a("selected", r),
    rows: r
  }), n.length > 0 && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: a("unselected", n),
    rows: n
  }), s;
}
function Sa(t, e) {
  if (e.id === "openTabs") return xa(t);
  if (e.id === "selection") return ya(t, e);
  if (!e.getGroupKey) return Be(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const d = a(l.project);
    if (d === void 0 || d === "") {
      n.push(l);
      return;
    }
    const w = r.get(d);
    w ? w.push(l) : r.set(d, [l]);
  });
  const s = [...r.entries()].map(([l, d]) => {
    var k;
    const w = [...d].sort(
      (y, u) => {
        var S;
        return ((S = e.compareProjects) == null ? void 0 : S.call(e, y.project, u.project)) || zt(y, u);
      }
    ), f = ((k = e.getSectionHeading) == null ? void 0 : k.call(
      e,
      l,
      w.map((y) => y.project)
    )) ?? l;
    return { key: l, heading: f, rows: w };
  });
  s.sort((l, d) => l.key === e.priorityKey ? -1 : d.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: d.key, heading: d.heading }
  ) : l.heading.localeCompare(d.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: d, rows: w }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: d,
    rows: w,
    isPriority: l === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(zt)
  }), i;
}
const mi = [
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
  if (!(typeof r != "string" || !Wr(r)))
    return r;
}
const ie = "recent", ka = "other";
function en(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Ca(t) {
  const e = t ?? {};
  return [
    en(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Zt.lastUsedAt]) == "number" ? ie : ka;
      },
      getSectionHeading: (r) => r === ie ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === ie ? -1 : n.key === ie ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Zt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Zt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (l) => {
            var d;
            return typeof ((d = l.customData) == null ? void 0 : d[Zt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Zt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const hi = Ca();
function Ea(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? er : e.unselectedSectionHeading ?? rr
  };
}
function gi(t) {
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
function bi(t) {
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
const Ia = 100, nt = {
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
  autoSelectionSelectedSectionHeading: er,
  autoSelectionUnselectedSectionHeading: rr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function _a(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : rt(e.ariaLabel, nt.ariaLabel),
    buttonPlaceholder: rt(
      e.buttonPlaceholder,
      nt.buttonPlaceholder
    ),
    commandEmptyMessage: rt(
      e.commandEmptyMessage,
      nt.commandEmptyMessage
    ),
    searchPlaceholder: rt(
      e.searchPlaceholder,
      nt.searchPlaceholder
    ),
    groupByAriaLabel: rt(
      e.groupByAriaLabel,
      nt.groupByAriaLabel
    ),
    groupSectionLabel: rt(
      e.groupSectionLabel,
      nt.groupSectionLabel
    ),
    groupByNone: rt(
      e.groupByNone,
      nt.groupByNone
    ),
    openTabsSectionHeading: rt(
      e.openTabsSectionHeading,
      nt.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: rt(
      e.otherProjectsSectionHeading,
      nt.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: rt(
      e.autoOpenTabsGroupingLabel,
      nt.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: rt(
      e.autoSelectionGroupingLabel,
      nt.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: rt(
      e.autoSelectionSelectedSectionHeading,
      nt.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: rt(
      e.autoSelectionUnselectedSectionHeading,
      nt.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: rt(
      e.boundButClosedTooltip,
      nt.boundButClosedTooltip
    ),
    openButtonLabel: rt(
      e.openButtonLabel,
      nt.openButtonLabel
    ),
    clearAll: rt(e.clearAll, nt.clearAll)
  };
}
function Ni(t) {
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
function Qt(t) {
  return uo[Un(t)] ?? String(t);
}
const Rr = "platform.footerAction", Ta = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function La({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    de,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ta,
      children: r
    }
  ) : /* @__PURE__ */ o(de, { variant: "secondary", children: r });
}
function Aa({
  row: t,
  mode: e,
  strings: r,
  onClick: n,
  onOpen: a,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: l
}) {
  const {
    ref: d,
    open: w,
    onPointerEnter: f,
    onPointerLeave: k
  } = yo(), [y, u] = O(!1), S = Nn(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, H = w || y, P = _(() => {
    if (E) {
      u(!0);
      return;
    }
    f();
  }, [E, f]), X = _(() => {
    u(!1), k();
  }, [k]), C = /* @__PURE__ */ o(ue, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let D;
  e === "project" ? t.openGroups.length > 0 && (D = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((U) => /* @__PURE__ */ o(de, { variant: "secondary", children: Qt(U) }, U)) })) : t.scrollGroupId !== void 0 && (D = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      La,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      V,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (U) => {
          U.stopPropagation(), a(t);
        },
        onMouseDown: (U) => U.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(En, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const q = /* @__PURE__ */ m(
    fe,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: P,
      onPointerLeave: X,
      ...p && { "aria-describedby": S },
      className: g(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: C }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Kn(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        D,
        p && /* @__PURE__ */ o("span", { id: S, hidden: !0, children: t.disabledReason })
      ]
    }
  ), Z = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, A = t.isBoundButClosed && Z ? r.boundButClosedTooltip.replace("{group}", Z) : void 0;
  return /* @__PURE__ */ m(St, { open: H, delayDuration: 400, children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: q }),
    /* @__PURE__ */ m(
      Ct,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Ur(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && Z && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              Z,
              ")"
            ] })
          ] }),
          A && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: A }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function Da({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(We, { asChild: !0, children: /* @__PURE__ */ o(
        V,
        {
          variant: "ghost",
          size: "sm",
          className: g(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": n.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ o(Cn, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(Ct, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      Ye,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: we },
        children: [
          /* @__PURE__ */ o(Qe, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(So, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Sr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(tr, {}),
            t.map((s) => /* @__PURE__ */ o(Sr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Ra(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function vi(t) {
  const [e, r] = O(!1), [n, a] = O(""), s = ut(() => _a(t.localizedStrings), [t.localizedStrings]), i = ut(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(en(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      Ea({
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
  ]), [l, d] = O(void 0), w = ut(
    () => Ra(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = l ?? w, k = I(null), [y, u] = O(void 0), S = _((h) => {
    r(h), h || (a(""), u(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const L = k.current;
      L && L.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = ut(() => t.mode === "project" ? Te({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Te({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Te({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = ut(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (L) => L.shortName.toLowerCase().includes(h) || (L.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), H = ut(
    () => new Map(t.projects.map((h) => [it(h.id), h])),
    [t.projects]
  ), P = _(
    (h) => h === void 0 ? void 0 : H.get(it(h)),
    [H]
  ), { renderProjectIndicator: X } = t, C = _(
    (h) => X ? X(h.project) : void 0,
    [X]
  ), D = !!X, q = !!t.footerAction && E.length === 0, Z = ut(() => {
    if (f === Xt) return Be(E);
    const h = i.find((L) => L.id === f);
    return h ? Sa(E, h) : Be(E);
  }, [E, f, i]), A = (h) => {
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, U = (h) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: h.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const L = t.selection.pairs, z = it(h.projectId), W = (J) => it(J.projectId) === z && J.scrollGroupId === h.scrollGroupId, K = L.some(W) ? L.filter((J) => !W(J)) : [
          ...L.filter((J) => !W(J)),
          { projectId: h.projectId, scrollGroupId: h.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: K });
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
        const L = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: h.projectId, scrollGroupId: L }), t.onOpenProjectInGroup(h.projectId, L), r(!1);
      }
    }
  }, lt = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, ft = t.mode === "project" ? t.renderTriggerLabel : void 0, It = t.mode === "project" ? t.triggerLabelFormat : void 0, $ = ut(() => {
    switch (t.mode) {
      case "project": {
        const h = P(t.selection.projectId);
        if (ft)
          return { node: ft(h), title: "", hasSelection: !!h };
        let L = h ? h.shortName : s.buttonPlaceholder;
        return h && It === "shortNameAndFullName" && (L = Ur(h)), { node: L, title: L, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const L = [];
        if (h.forEach((K) => {
          const J = P(K.projectId);
          J && L.push({ project: J, scrollGroupId: K.scrollGroupId });
        }), L.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const z = L.map(
          ({ project: K, scrollGroupId: J }) => J === void 0 ? K.shortName : `${K.shortName} (${Qt(J)})`
        ).join(", "), W = L.length.toString();
        return {
          node: /* @__PURE__ */ m(gt, { children: [
            /* @__PURE__ */ o(de, { variant: "muted", className: "tw:shrink-0", children: W }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: z })
          ] }),
          title: `${W} ${z}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = P(t.selection.projectId);
        if (!h) {
          const W = s.buttonPlaceholder;
          return { node: W, title: W, hasSelection: !1 };
        }
        const L = t.selection.scrollGroupId;
        if (L === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const z = Qt(L);
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
    ft,
    It,
    s.buttonPlaceholder
  ]), Pt = I(null), [Ut, _t] = O(!1);
  F(() => {
    const h = Pt.current;
    if (!h) return;
    const L = (W) => {
      _t(W < Ia);
    };
    if (L(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const z = new ResizeObserver((W) => {
      W.forEach((K) => {
        const [J] = K.borderBoxSize;
        L(J ? J.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return z.observe(h, { box: "border-box" }), () => z.disconnect();
  }, []);
  let G;
  t.isLoading ? G = /* @__PURE__ */ o(In, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ o(jr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ o(_n, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? A : void 0, tt = s.ariaLabel && $.hasSelection && $.title ? `${s.ariaLabel}: ${$.accessibleTitle ?? $.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ m(
    V,
    {
      ref: Pt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": tt,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: g(
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof $.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: $.node }) : $.node }),
        G
      ]
    }
  ), Tt = $.title ? /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(St, { children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Pe, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ o(Ct, { dir: "auto", children: $.title })
  ] }) }) : /* @__PURE__ */ o(Pe, { asChild: !0, children: ct }), jt = i.length > 1;
  return /* @__PURE__ */ m(Ve, { open: e, onOpenChange: S, children: [
    Tt,
    /* @__PURE__ */ o(
      Xe,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(
          Ue,
          {
            shouldFilter: !1,
            value: q ? y ?? Rr : void 0,
            onValueChange: u,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Ke,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                jt && /* @__PURE__ */ o(
                  Da,
                  {
                    availableGroupings: i,
                    activeGrouping: f,
                    onChangeGrouping: d,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(V, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Fe, { children: [
                /* @__PURE__ */ o($e, { children: s.commandEmptyMessage }),
                Z.map((h, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Mr,
                    {
                      children: [
                        /* @__PURE__ */ o(ce, { heading: Ma(h, s), children: h.rows.map((z) => /* @__PURE__ */ o(
                          Aa,
                          {
                            row: z,
                            mode: t.mode,
                            strings: s,
                            onClick: U,
                            onOpen: at,
                            selectedRowRef: k,
                            indicator: C(z),
                            reserveIndicatorSlot: D
                          },
                          z.rowKey
                        )) }),
                        L < Z.length - 1 && /* @__PURE__ */ o(Me, { alwaysRender: !0 })
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
                /* @__PURE__ */ m("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  E.length > 0 && /* @__PURE__ */ o(
                    Me,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    fe,
                    {
                      forceMount: !0,
                      value: Rr,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var h;
                        (h = t.footerAction) == null || h.onSelect(), S(!1);
                      },
                      children: [
                        /* @__PURE__ */ o(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        !!t.renderProjectIndicator && /* @__PURE__ */ o(
                          "span",
                          {
                            "aria-hidden": !0,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: t.footerAction.label })
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
function Ma(t, e) {
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
const Oa = Or(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = pt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            Tn,
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            qr,
            {
              ref: l,
              className: g(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (w) => e(w.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            V,
            {
              variant: "ghost",
              size: "icon",
              className: g(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": d === "rtl" },
                { "tw:right-0": d === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(Pr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Oa.displayName = "SearchBar";
const Pa = 5;
function xi(t) {
  return co(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function ja(t, e) {
  return t.filter((r) => {
    try {
      return Fn(r) === e;
    } catch {
      return !1;
    }
  });
}
const yi = (t, e, r) => ja(t, e).every((n) => r.includes(n));
function Ba(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => wo(n, e));
}
function Si(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = Ba(t, n);
  if (i.length !== 0)
    return i.length <= Pa ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function ki({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: g("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function Ga({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
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
      "data-slot": "empty-header",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Ha = Ot(
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
function Ua({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ha({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Ci({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-title",
      className: g(
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
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function Fa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-content",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Ei({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Ga, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(za, { children: [
      /* @__PURE__ */ o(Ua, { variant: "icon", children: n ?? /* @__PURE__ */ o(Ln, {}) }),
      /* @__PURE__ */ o(Ka, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Fa, { children: /* @__PURE__ */ o(V, { onClick: () => r(), children: e }) })
  ] });
}
const $a = Or(({ className: t, ...e }, r) => /* @__PURE__ */ o(An, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
$a.displayName = "Spinner";
const Ja = Ot(
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
function Ii({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ja({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function _i({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-title",
      className: g(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Ti({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-description",
      className: g(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function Li({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    He.Group,
    {
      "data-slot": "resizable-panel-group",
      className: g(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: n ?? e,
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...a
    }
  );
}
function le(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Ai({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    He.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: le(t),
      minSize: le(e),
      maxSize: le(r),
      collapsedSize: le(n),
      ...a
    }
  );
}
function Di({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    He.Separator,
    {
      "data-slot": "resizable-handle",
      className: g(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Vt as $,
  Ts as A,
  V as B,
  fe as C,
  Ze as D,
  qe as E,
  Xr as F,
  Fe as G,
  $e as H,
  ks as I,
  Zs as J,
  Ys as K,
  As as L,
  fs as M,
  hs as N,
  gs as O,
  Ve as P,
  Ns as Q,
  Ws as R,
  ge as S,
  Et as T,
  ko as U,
  Qs as V,
  de as W,
  po as X,
  ri as Y,
  ei as Z,
  tr as _,
  wo as a,
  zs as a$,
  Kr as a0,
  ii as a1,
  ci as a2,
  ni as a3,
  oi as a4,
  li as a5,
  ai as a6,
  Fs as a7,
  So as a8,
  Sr as a9,
  ro as aA,
  oo as aB,
  Cr as aC,
  Ii as aD,
  Ti as aE,
  _i as aF,
  js as aG,
  ms as aH,
  vs as aI,
  eo as aJ,
  to as aK,
  ps as aL,
  Qo as aM,
  Ga as aN,
  Fa as aO,
  Ka as aP,
  za as aQ,
  Ua as aR,
  ki as aS,
  Ci as aT,
  pi as aU,
  ba as aV,
  qo as aW,
  ua as aX,
  bo as aY,
  Hs as aZ,
  Gs as a_,
  ui as aa,
  fi as ab,
  wi as ac,
  qr as ad,
  vi as ae,
  Oa as af,
  xi as ag,
  ja as ah,
  Me as ai,
  Is as aj,
  yi as ak,
  Bs as al,
  bs as am,
  uo as an,
  Ps as ao,
  Os as ap,
  Js as aq,
  Er as ar,
  Vs as as,
  qs as at,
  Ks as au,
  Xs as av,
  Ms as aw,
  Yr as ax,
  me as ay,
  he as az,
  St as b,
  Di as b0,
  Ai as b1,
  Li as b2,
  Ei as b3,
  $a as b4,
  di as b5,
  si as b6,
  Us as b7,
  Yo as b8,
  we as b9,
  zo as bA,
  hi as bB,
  Mo as bC,
  Bo as bD,
  Go as bE,
  Ho as bF,
  la as bG,
  Ro as bH,
  Ca as bI,
  Ea as bJ,
  fa as bK,
  ws as bL,
  Oo as bM,
  Ko as bN,
  Uo as bO,
  xt as bP,
  Si as bQ,
  Fo as bR,
  $o as bS,
  Jo as bT,
  us as ba,
  ds as bb,
  Yn as bc,
  Wn as bd,
  ls as be,
  is as bf,
  cs as bg,
  ss as bh,
  Io as bi,
  mo as bj,
  Fr as bk,
  Lr as bl,
  ti as bm,
  ra as bn,
  ea as bo,
  Ao as bp,
  ta as bq,
  Cs as br,
  Xt as bs,
  nt as bt,
  mi as bu,
  Qn as bv,
  gi as bw,
  Ni as bx,
  bi as by,
  tn as bz,
  g as c,
  kt as d,
  Ct as e,
  Rs as f,
  _s as g,
  We as h,
  Ye as i,
  Qe as j,
  $s as k,
  ys as l,
  Ss as m,
  Ls as n,
  ce as o,
  pt as p,
  lo as q,
  rt as r,
  Es as s,
  Ds as t,
  yo as u,
  Pe as v,
  Xe as w,
  xs as x,
  Ue as y,
  Ke as z
};
//# sourceMappingURL=resizable-7jlExhEV.js.map
