import { jsx as o, jsxs as m, Fragment as gt } from "react/jsx-runtime";
import { Slot as ze, Dialog as yt, Separator as wn, Popover as Zt, Tooltip as Vt, DropdownMenu as Q, Label as fn, RadioGroup as Ae } from "radix-ui";
import { IconX as pn, IconCheck as He, IconSearch as mn, IconChevronLeft as hn, IconChevronRight as gn } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import wt, { useState as R, useRef as _, useCallback as I, createContext as bn, useContext as Nn, useEffect as F, useMemo as ut, Fragment as Or, useLayoutEffect as ae, useImperativeHandle as vn, useId as xn, forwardRef as Pr } from "react";
import { X as jr, Check as we, ChevronsUpDown as Br, Star as yn, Undo as Sn, Redo as kn, SquareX as Gr, FunctionSquare as zr, SquareSigma as Hr, Ban as Cn, Copy as En, Group as _n, ArrowRight as In, Loader2 as Tn, ChevronDown as Ln, Search as An, AlertTriangle as Dn, LoaderCircle as Rn } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as Nr, GENERATOR_NOTE_CALLER as De, HIDDEN_NOTE_CALLER as Re, isInsertEmbedOpOfType as Jt, getDefaultViewOptions as Mn, getMarkerMenuItems as On, defaultStyleInfo as vr, Editorial as Pn } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as jn, split as Ur, slice as Bn, formatReplacementString as Gn, usfmMarkers as se, deepEqual as Gt, truncateToCopyLimit as zn, getErrorMessage as xr, isPlatformError as Hn, ABORTED as Un, normalizeProjectId as it, compareProjectsByName as Kn, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Kr, getLocalizeKeyForScrollGroupId as Fn, hasDistinctFullName as $n, getSectionForBook as Jn } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Ue from "react-resizable-panels";
import { clsx as Vn } from "clsx";
import { extendTailwindMerge as qn, twMerge as Xn } from "tailwind-merge";
const Wn = qn({ prefix: "tw" });
function Me(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Zn(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Me(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, f) => f !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((d, f) => f !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Yn(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Me(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Me(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
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
  const e = Vn(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Wn(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const f = Zn(d);
    n.set(f.normalized, f.original), a.push(f.normalized);
  }), Xn(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const f = n.get(d);
    return f ? Yn(d, f) : d;
  }).join(" ");
}
const Fr = 600, fe = 650, ls = 400, Qn = 450, to = 500, cs = 510, ds = 520, eo = 675, us = 690, ws = 700, fs = 800, $r = Ot(
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
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const s = n ? ze.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: g($r({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Jr = "layoutDirection";
function Vr() {
  return globalThis.localStorage ?? void 0;
}
function pt() {
  var t;
  try {
    const e = (t = Vr()) == null ? void 0 : t.getItem(Jr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function ps(t) {
  var e;
  try {
    (e = Vr()) == null || e.setItem(Jr, t);
  } catch {
  }
}
function ms({ ...t }) {
  return /* @__PURE__ */ o(yt.Root, { "data-slot": "dialog", ...t });
}
function hs({ ...t }) {
  return /* @__PURE__ */ o(yt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function ro({ ...t }) {
  return /* @__PURE__ */ o(yt.Portal, { "data-slot": "dialog-portal", ...t });
}
function gs({ ...t }) {
  return /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", ...t });
}
function no({
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
      style: { zIndex: Qn, ...e },
      ...r
    }
  );
}
function bs({
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
  return /* @__PURE__ */ m(ro, { children: [
    /* @__PURE__ */ o(no, { className: n, style: a }),
    /* @__PURE__ */ m(
      yt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: to, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(W, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(pn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ns({ className: t, ...e }) {
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
function vs({
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
        e && /* @__PURE__ */ o(yt.Close, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function xs({ className: t, ...e }) {
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
function ys({
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
function oo({ className: t, ...e }) {
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
const ao = Ot(
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
function so({
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
        className: g(ao({ align: e }), t),
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
function Ke({ className: t, ...e }) {
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
function Fe({
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(oo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ o(so, { children: /* @__PURE__ */ o(mn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function $e({ className: t, ...e }) {
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
function Je({
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
function de({
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
function Oe({
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
function pe({
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
        /* @__PURE__ */ o(He, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function io({ className: t, ...e }) {
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
const lo = [
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
], co = (t) => {
  var e;
  return ((e = lo[t]) == null ? void 0 : e.chapters) ?? -1;
}, uo = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function wo(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function O(t) {
  return `%scrollGroup_${t}%`;
}
const fo = {
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
function Ve(t, e) {
  return co(ot.bookIdToNumber(t));
}
function me(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = ot.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
function Ss(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = me(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Ve(s), 1),
      verseNum: 1
    };
}
function ks(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < Ve(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = me(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Cs(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = me(n, e, "previous");
  if (!i) return;
  const l = Math.max(Ve(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Es(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = me(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function _s(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Is = (t, e, r, n, a) => {
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
}, Ts = (t, e, r, n, a) => {
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
function Ls(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function po(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const As = Object.fromEntries(
  uo.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function Ds(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
const yr = `
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
function mo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${yr}, ${e}` : yr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && mo(n)
  );
}
const Rs = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Pe = "keyboard", Sr = !1;
function Ms() {
  Sr || typeof document > "u" || (Sr = !0, document.addEventListener(
    "pointerdown",
    () => {
      Pe = "pointer";
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Pe = "keyboard";
    },
    !0
  ));
}
function Os() {
  return Pe;
}
const Xr = "data-quiet-focus";
function Ps(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Xr, ""), t.style.outline = "none"));
}
function js(t) {
  t && (t.removeAttribute(Xr), t.style.removeProperty("outline"));
}
const Bs = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function ho({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    wn.Root,
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
const go = Ot(
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
        go({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Gs({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? ze.Root : "div";
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
function Wr({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    ho,
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
function Xe({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function je({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: bo, usePortalContainer: No } = Zr(), zs = bo;
function We({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  ...a
}) {
  const s = pt(), i = No();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: i, children: /* @__PURE__ */ o(
      Zt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Fr, ...n },
        dir: s,
        ...a
      }
    ) })
  );
}
function vo({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Hs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Us({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ks({ className: t, ...e }) {
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
    Vt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function St({ ...t }) {
  return /* @__PURE__ */ o(Vt.Root, { "data-slot": "tooltip", ...t });
}
function kt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Vt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? g($r({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: xo, usePortalContainer: yo } = Zr(), Fs = xo;
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
  const l = yo();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: l, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: eo, ...r },
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          n && /* @__PURE__ */ o(
            Vt.Arrow,
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
const So = /^%[^%]*%$/;
function Yr(t) {
  return t !== void 0 && !So.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return Yr(t) ? t : e;
}
function ko() {
  const [t, e] = R(!1), r = _(null), n = I(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = I(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const Qr = bn(void 0);
function he() {
  const t = Nn(Qr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ge = Ot("", {
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
  return /* @__PURE__ */ o(Qr.Provider, { value: n, children: /* @__PURE__ */ o(Q.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function $s({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ye({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Qe({
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
      style: { zIndex: Fr, ...n },
      ...s,
      children: /* @__PURE__ */ o("div", { dir: i, children: a })
    }
  ) });
}
function Js({ ...t }) {
  return /* @__PURE__ */ o(Q.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Vs({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = pt(), s = he();
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
        ge({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function qt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = pt(), i = he();
  return /* @__PURE__ */ m(
    Q.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ge({ variant: i.variant })
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
            children: /* @__PURE__ */ o(Q.ItemIndicator, { children: /* @__PURE__ */ o(He, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Co({
  ...t
}) {
  return /* @__PURE__ */ o(Q.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function kr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = pt(), s = he();
  return /* @__PURE__ */ m(
    Q.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ge({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(Q.ItemIndicator, { children: /* @__PURE__ */ o(He, {}) })
          }
        ),
        e
      ]
    }
  );
}
function tr({ className: t, inset: e, ...r }) {
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
function er({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Q.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function qs({ className: t, ...e }) {
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
function Xs({ ...t }) {
  return /* @__PURE__ */ o(Q.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Ws({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = he(), s = pt();
  return /* @__PURE__ */ m(
    Q.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ge({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(hn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(gn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Zs({
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
      style: { zIndex: fe, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function Ys({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    fn.Root,
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
function Qs({
  className: t,
  ...e
}) {
  const r = pt();
  return /* @__PURE__ */ o(
    Ae.Root,
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
function ti({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ae.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Ae.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const ei = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Cr = (t, e) => t[e] ?? e;
function Eo({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Cr(n, "%cancelButton_tooltip%"), l = s ?? Cr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(qe, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(jr, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(Wr, {}),
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(we, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function be() {
  return /Macintosh/i.test(navigator.userAgent);
}
function ri() {
  return /Windows/i.test(navigator.userAgent);
}
const _o = ["input", "select", "textarea", "button"], Io = ["button", "textbox"], ni = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = _(null), [s, i] = R(void 0), [l, d] = R(void 0), f = I(
    (u) => {
      i(u);
      const v = t.find((E) => E.id === u);
      v && (e == null || e(v));
      const p = document.getElementById(u);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), w = I(
    (u) => {
      const v = t.find((p) => p.id === u);
      v && (d((p) => p === u ? void 0 : u), r == null || r(v));
    },
    [r, t]
  ), S = (u) => {
    if (!u) return !1;
    const v = u.tagName.toLowerCase();
    if (u.isContentEditable || _o.includes(v)) return !0;
    const p = u.getAttribute("role");
    if (p && Io.includes(p)) return !0;
    const E = u.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, k = I(
    (u) => {
      var q;
      const v = u.target, p = (A) => A ? document.getElementById(A) : void 0, E = p(l), z = p(s);
      if (!!(E && v && E.contains(v) && v !== E) && S(v)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !v.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const A = t.find((U) => U.id === l);
            A && f(A.id);
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
          const U = A.findIndex((ft) => ft === v);
          if (U === -1) return;
          let lt;
          u.key === "ArrowDown" ? lt = Math.min(U + 1, A.length - 1) : lt = Math.max(U - 1, 0), lt !== U && (u.preventDefault(), u.stopPropagation(), (q = A[lt]) == null || q.focus());
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
          s && w(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const A = z;
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
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (S(v) || (n == null || n(u.key), u.preventDefault()));
          return;
      }
      const $ = t[D];
      $ && f($.id);
    },
    [t, f, s, l, w, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: k,
    /** Focus an option by its ID */
    focusOption: f
  };
}, To = Ot(
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
function ue({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? ze.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        To({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function oi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function tn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function ai({
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
        Yt(i, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
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
    var d;
    const { current: l } = a;
    if (l && tn(i, l)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (d = Yt(l)[0]) == null || d.focus();
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
function si({
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
function ii({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function li({ className: t, ...e }) {
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
function Lo(t) {
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
function Ao(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Do(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ci({
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
  }, [a]), Lo(i);
  const l = wt.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), d = wt.useCallback(
    (w) => {
      const { current: S } = i;
      if (!S || !S.parentElement) return;
      if (!tn(w, S)) {
        e == null || e(w);
        return;
      }
      const k = S.closest("table"), u = k ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(k).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], v = u.indexOf(S), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Do(u, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Ao(l, p, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const E = S.closest("table");
        E && E.focus();
      }
      e == null || e(w);
    },
    [i, l, e]
  ), f = wt.useCallback(
    (w) => {
      n && (r == null || r(w));
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
      onFocus: f,
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
function di({ className: t, ...e }) {
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
function ui({ className: t, ...e }) {
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
function wi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ro(t, e = !0) {
  const [r, n] = R(!1);
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
function Mo({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Ro(r, e);
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
function fi({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: f,
  isOpen: w = void 0,
  onOpenChange: S = void 0,
  isDisabled: k = !1,
  sortSelected: u = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: E = void 0,
  variant: z = "ghost",
  id: B
}) {
  const [X, C] = R(!1), D = _(null), $ = I(
    (G) => {
      var tt;
      const at = (tt = t.find((ct) => ct.label === G)) == null ? void 0 : tt.value;
      at && r(
        e.includes(at) ? e.filter((ct) => ct !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), q = () => f || n, A = w ?? X, U = S ?? C, [lt, ft] = R(A), [_t, J] = R(e);
  lt !== A && (ft(A), A && J(e));
  const Pt = ut(() => {
    if (!u) return t;
    const G = t.filter((tt) => tt.starred).sort((tt, ct) => tt.label.localeCompare(ct.label)), at = t.filter((tt) => !tt.starred).sort((tt, ct) => {
      const Tt = _t.includes(tt.value), jt = _t.includes(ct.value);
      return Tt && !jt ? -1 : !Tt && jt ? 1 : tt.label.localeCompare(ct.label);
    });
    return [...G, ...at];
  }, [t, _t, u]), Ut = () => {
    const G = t.map((at) => at.value);
    J(G), r(G);
  }, It = () => {
    J([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: B, className: E, children: /* @__PURE__ */ m(Xe, { open: A, onOpenChange: U, children: [
    /* @__PURE__ */ o(je, { asChild: !0, children: /* @__PURE__ */ m(
      W,
      {
        variant: z,
        role: "combobox",
        "aria-expanded": A,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: k,
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: g(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: q()
              }
            )
          ] }),
          /* @__PURE__ */ o(Br, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(We, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Ke, { children: [
      /* @__PURE__ */ o(
        Fe,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: It, children: l })
      ] }),
      /* @__PURE__ */ o(Mo, { isEnabled: v, scrollerRef: D, children: /* @__PURE__ */ m($e, { ref: D, children: [
        /* @__PURE__ */ o(Je, { children: d }),
        /* @__PURE__ */ o(de, { children: Pt.map((G) => /* @__PURE__ */ m(
          pe,
          {
            value: G.label,
            onSelect: $,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                we,
                {
                  className: g(
                    "tw:h-4 tw:w-4",
                    e.includes(G.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              G.starred && /* @__PURE__ */ o(yn, { className: "tw:h-4 tw:w-4" }),
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
function Oo(t, e) {
  if (!t || e === "") return !1;
  const r = xt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && xt(n.marker).toLowerCase() === r
  );
}
function Po(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = xt(e).toLowerCase();
  return r === "passive" ? Nr({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Nr({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Be(t) {
  return t.isComposing || t.keyCode === 229;
}
const en = /^[a-z0-9+-]$/i;
function jo(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && be()) && e !== "Dead") {
    if (en.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Bo = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Go = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function zo() {
  return [...Bo, ...Go.filter((t) => en.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function Ho(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (Be(t) || jn.has(t.key))
    return "passed";
  const a = !be();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), Po(
      e.items.map((f) => ({ label: f.marker })),
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
      const w = xt(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, w)) {
        const S = e.items.find(
          (k) => xt(k.marker).toLowerCase() === w
        );
        return S && r.commitItem(S.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const d = xt(e.filter).toLowerCase(), f = e.items.find(
      (w) => xt(w.marker).toLowerCase() === d
    );
    return f && r.commitItem(f.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = jo(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function Uo(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function rn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Ko(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Fo(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: d,
    restoreSelectionIfLost: f,
    hasEditorChangedSinceFocus: w,
    focusEditor: S,
    applyItem: k,
    onShowError: u
  } = t, v = () => {
    f(), S();
  };
  a.current += 1;
  const p = a.current, E = () => a.current === p, z = { kind: r, token: p, filter: "", items: e };
  n && (z.isNoteMarker = n), s(z), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: zo(),
    onKey: (B) => l(B)
  }).then((B) => {
    var C;
    i(p);
    const X = B ?? ((C = z.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (X !== void 0) {
      const D = (w == null ? void 0 : w()) ?? !1;
      v();
      const $ = D ? void 0 : e.find((q) => q.marker === X);
      $ && k($);
    } else E() && v();
  }).catch((B) => {
    i(p), E() && v(), u(B);
  });
}
function $o(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: l,
    hasEditorChangedSinceFocus: d
  } = e, f = r.current;
  if (!f) return "no-session";
  const w = (k) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    k();
  };
  return Ho(t, f, {
    update: (k) => a.update(k),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (k) => w(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedMarker(k);
    }),
    commitTypedAndReopen: (k) => w(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedMarker(k, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (k) => w(() => {
      var u;
      s(), (u = n.current) == null || u.commitTypedCloser(k);
    }),
    commitItem: (k) => w(() => {
      var v;
      const u = f.items.find((p) => p.marker === k);
      if (u) {
        if (u.kind === "note") {
          f.itemToApplyOnClose = u;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(u, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && l(f.token), "routed";
}
function Jo({
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
function Vo({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  F(() => {
    const i = s ?? document, l = (d) => {
      var S, k;
      const f = (S = t.current) == null ? void 0 : S.querySelector(".editor-input");
      if (!f || d.target !== f) return;
      const w = (k = e.current) == null ? void 0 : k.getSelection();
      w && (r.current = w), a() && (n.current = rn(
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
function qo({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = _(void 0), a = I(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = I(
    (i) => {
      var l;
      Uo(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
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
function Er({ className: t, ...e }) {
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
function Xo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Wo = /* @__PURE__ */ new Set([
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
function Zo(t) {
  const e = Ur(t, "");
  let r = 0;
  for (; r < e.length && Wo.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Bn(t, r);
  return a ? [...n, a] : n;
}
function Yo(t) {
  const e = [];
  let r = "";
  return Ur(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Qo(t) {
  const e = Zo(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Yo(t), separator: "+" };
}
function _r({ hint: t }) {
  const { keycaps: e, separator: r } = Qo(t);
  return e.length === 1 ? /* @__PURE__ */ o(Er, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Xo, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Or, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Er, { children: n })
      ] }, a)
    )) })
  );
}
const pi = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Ir = (t, e) => t[e] ?? e;
function ta({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = be(), f = Ir(a, "%undoButton_tooltip%"), w = Ir(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(qe, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(Sn, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(_r, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(Wr, {}),
    e && /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(kn, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(_r, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function ea({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = _(null);
  return F(() => {
    var d;
    const s = be(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (f) => {
      var S, k, u, v;
      if (!i || document.activeElement !== i) return;
      const w = f.key.toLowerCase();
      if (s) {
        if (!f.metaKey) return;
        !f.shiftKey && w === "z" ? (f.preventDefault(), r && ((S = e.current) == null || S.undo())) : f.shiftKey && w === "z" && (f.preventDefault(), n && ((k = e.current) == null || k.redo()));
      } else {
        if (!f.ctrlKey) return;
        !f.shiftKey && w === "z" ? (f.preventDefault(), r && ((u = e.current) == null || u.undo())) : (w === "y" || f.shiftKey && w === "z") && (f.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function ra() {
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
  }), n = I((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return ut(() => ({ virtualRef: r, setSource: n }), [n]);
}
function na(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function oa(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const aa = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(gt, { children: [
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
function sa({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = _(!1), i = _(null), l = _(null), d = _(!1), [f, w] = R(t), [S, k] = R(e), [u, v] = R(!1), p = _(!1), E = _(f);
  E.current = f;
  const z = _(S);
  z.current = S, F(() => {
    w(t);
  }, [t]), F(() => {
    S !== e && k(e);
  }, [e]);
  const B = (C) => {
    if (d.current = !1, v(C), !C) {
      const D = E.current, $ = z.current;
      D !== "custom" || $ ? (D !== t || $ !== e) && (s.current = !0, r(D, $)) : (w(t), k(e));
    }
  }, X = (C) => {
    var D, $, q, A;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((D = i.current) == null || D.focus(), d.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? (($ = l.current) == null || $.focus(), d.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((q = i.current) == null ? void 0 : q.selectionStart) === 0 && ((A = l.current) == null || A.focus(), d.current = !1), f === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && B(!1);
  };
  return /* @__PURE__ */ m(Ze, { open: u, onOpenChange: B, children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Ye, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", className: "tw:h-6", children: aa(t, n, e) }) }) }),
      /* @__PURE__ */ o(Ct, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      Qe,
      {
        style: { zIndex: fe },
        onEscapeKeyDown: () => {
          E.current = t, z.current = e, w(t), k(e);
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
          /* @__PURE__ */ o(tr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(er, {}),
          /* @__PURE__ */ o(
            qt,
            {
              checked: f === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: De })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            qt,
            {
              checked: f === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Re })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            qt,
            {
              ref: l,
              checked: f === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                p.current = f === "custom";
              },
              onClick: (C) => {
                var D;
                if (C.stopPropagation(), p.current && C.target !== i.current) {
                  B(!1);
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
                      C.stopPropagation(), w("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: S,
                    onKeyDown: (C) => {
                      C.key === "Enter" || C.key === "ArrowUp" || C.key === "ArrowDown" || C.key === "ArrowLeft" || C.key === "ArrowRight" || C.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (C) => k(C.target.value)
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
const ia = (t, e) => t === "f" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(zr, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Hr, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Gr, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), la = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Gn(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ca({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = _(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Ye, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", className: "tw:h-6", children: ia(t, r) }) }) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: la(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      Qe,
      {
        style: { zIndex: fe },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), a());
        },
        children: [
          /* @__PURE__ */ o(tr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(er, {}),
          /* @__PURE__ */ m(
            qt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Gr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            qt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(zr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            qt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Hr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Tr = '[aria-controls="editor-context-menu"]';
function da(t) {
  return t ? t.matches(Tr) ? !0 : !!t.querySelector(Tr) : !1;
}
const mi = Object.freeze([
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
function ua({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Cn, { className: e, size: 16 });
}
function wa({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(we, { size: 16 })
    }
  );
}
function ce(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Lr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    pe,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      value: ce(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(wa, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(ua, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(io, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function fa({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = R(""), [l] = R(() => {
    const w = e.find(
      (S) => S.marker === a && !S.isDisallowed && !S.isDeprecated && !S.isDisabled
    );
    return w ? ce(w) : void 0;
  }), [d, f] = ut(() => {
    const w = xt(s.trim().toLowerCase());
    if (!w) {
      const u = e.filter((v) => !v.isDisallowed);
      return [u.length > 0 ? u : e, []];
    }
    const S = e.filter((u) => {
      var p;
      const v = (p = u.marker) == null ? void 0 : p.toLowerCase();
      return u.isDisallowed ? v === w : v == null ? void 0 : v.includes(w);
    }), k = e.filter(
      (u) => u.title.toLowerCase().includes(w) && !S.includes(u)
    );
    return [S, k];
  }, [s, e]);
  return /* @__PURE__ */ m(Ke, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: l, children: [
    /* @__PURE__ */ o(
      Fe,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (w) => i(w),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m($e, { children: [
      /* @__PURE__ */ o(Je, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(de, { children: d.map((w) => /* @__PURE__ */ o(
        Lr,
        {
          item: w,
          localizedStrings: t
        },
        ce(w)
      )) }),
      f.length > 0 && /* @__PURE__ */ m(gt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Oe, { alwaysRender: !0 }),
        /* @__PURE__ */ o(de, { children: f.map((w) => /* @__PURE__ */ o(
          Lr,
          {
            item: w,
            localizedStrings: t
          },
          ce(w)
        )) })
      ] })
    ] })
  ] });
}
function pa(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = se[n], i = s != null && s.children ? s : a && se[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((f) => ({
        marker: f,
        title: r[se[f].description] ?? se[f].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(f), e();
        }
      }))
    );
  }), l.sort((d, f) => (d.marker ?? d.title).localeCompare(f.marker ?? f.title));
}
function Ar(t) {
  if (!t || !Jt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function ma(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function ha(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function ga(t, e) {
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
function ba(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Na(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const va = 300, Te = "*", xa = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function hi({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: f,
  inline: w = !1,
  ref: S,
  initialCaretPosition: k,
  markerPalette: u,
  onNoteEdit: v
}) {
  var br;
  const p = _(null), E = _(null), z = _(null), B = _(s);
  F(() => {
    B.current = s;
  }, [s]);
  const X = _(k);
  F(() => {
    X.current = k;
  }, [k]);
  const C = I(() => {
    var b, N;
    const c = X.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (N = p.current) == null || N.selectNote(0);
  }, []);
  ae(() => {
    if (w || !z.current) return;
    const c = parseFloat(getComputedStyle(z.current).width);
    c > 0 && (z.current.style.width = `${c}px`);
  }, [w]);
  const [D, $] = R("generated"), [q, A] = R("generated"), [U, lt] = R(Te), [ft, _t] = R(Te), [J, Pt] = R("f"), [Ut, It] = R(!1), [G, at] = R(!0), [tt, ct] = R(!1), Tt = _(!1), jt = _(""), h = _(!1), L = _(void 0), H = _([]), Z = _([]), K = _(void 0), V = _(void 0), or = I(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (H.current = [...H.current, ...c], K.current = void 0);
  }, []), ar = I(
    (c, b) => {
      var y, M;
      if (!c) return;
      const N = Ar(c), x = Ar(b);
      if (!N && x) {
        K.current = {
          text: H.current,
          closedNoteOp: c,
          openNoteOp: b
        }, H.current = [];
        return;
      }
      const T = K.current;
      T && (N && !x && Gt(c, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((M = (y = p.current) == null ? void 0 : y.getOpsAfterNote(0)) != null && M.length) ? (H.current = T.text, K.current = void 0) : Gt(b, T.openNoteOp) || (K.current = void 0));
    },
    []
  ), [bt, te] = R(!1), Ne = ra(), [sr, on] = R(), ir = _(null), mt = _(
    void 0
  ), an = _(0), lr = _(u);
  F(() => {
    lr.current = u;
  }, [u]), F(
    () => () => {
      var c;
      mt.current && (mt.current = void 0, (c = lr.current) == null || c.dismiss());
    },
    []
  );
  const ve = _(void 0), xe = _(void 0), ee = I(
    () => Ko(
      xe.current,
      rn(
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
  ), { setSession: cr, clearSessionIfCurrent: re } = qo({
    sessionRef: mt,
    editorRef: p,
    baselineRef: xe
  }), Kt = I(() => {
    var b, N, x;
    if ((b = p.current) != null && b.getSelection()) return;
    const c = ve.current;
    c ? (N = p.current) == null || N.setSelection(c) : (x = p.current) == null || x.selectNote(0);
  }, []), ne = I(() => {
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
        ...i.view ?? Mn(),
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
  ), ye = ut(
    () => pa(
      p,
      () => te(!1),
      d,
      sr,
      J
    ),
    [d, sr, J]
  );
  F(() => {
    var c;
    bt || (c = p.current) == null || c.focus();
  }, [J, bt]);
  const At = I(() => {
    var x, T, y;
    const c = (x = E.current) == null ? void 0 : x.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), N = (y = (T = E.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : y.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), Bt = I(
    (c = !1) => {
      var N, x, T, y, M;
      v == null || v();
      const b = (x = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && Jt("note", b) && (r == null || r([b]), c && f && B.current)) {
        const P = [
          ...H.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], Y = Z.current, Nt = !Gt(P, Y);
        if (w && !Nt && Gt(b, L.current))
          return;
        L.current = b;
        const et = [b];
        Nt && (Y.length > 0 && ga(
          ((y = f.current) == null ? void 0 : y.getOpsAfterNote(B.current)) ?? [],
          Y
        ) && et.push({ delete: ha(Y) }), et.push(...P), Z.current = P), (M = f.current) == null || M.replaceEmbedUpdate(B.current, et);
      }
    },
    [w, r, v, f]
  ), Se = I(
    (c) => {
      var N, x, T;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (x = p.current) == null || x.applyUpdate([c, { delete: 1 }]), b && ((T = p.current) == null || T.setSelection(b)), ne();
    },
    [ne]
  ), dr = I(
    (c, b) => {
      var T, y, M;
      mt.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const N = (M = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : M.at(0);
      if (!N || !Jt("note", N) || !N.insert.note) return;
      let x;
      c === "custom" ? x = b : c === "generated" ? x = De : x = Re, N.insert.note.caller !== x && (N.insert.note.caller = x, Se(N));
    },
    [Se]
  ), Ft = _(void 0), ke = _(Bt);
  F(() => {
    ke.current = Bt;
  }, [Bt]);
  const $t = I(() => {
    Ft.current !== void 0 && (clearTimeout(Ft.current), Ft.current = void 0);
  }, []), ht = I(() => {
    Ft.current !== void 0 && ($t(), ke.current(!0));
  }, [$t]), ur = I(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, ke.current(!0);
    }, va);
  }, [$t]);
  F(() => {
    var T, y;
    let c, b, N;
    Tt.current = !1, h.current = !1, ve.current = void 0, at(!0);
    const x = e == null ? void 0 : e.at(0);
    if (L.current = x, H.current = [], Z.current = [], K.current = void 0, V.current = void 0, x && Jt("note", x)) {
      const M = (T = x.insert.note) == null ? void 0 : T.caller;
      let P = "custom";
      M === De ? P = "generated" : M === Re && (P = "hidden");
      const Y = P === "custom" && M !== void 0 ? M : Te;
      lt(Y), _t(Y), $(P), A(P), Pt(((y = x.insert.note) == null ? void 0 : y.style) ?? "f"), c = setTimeout(() => {
        var et, st, vt, Dt;
        const Nt = (st = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : st.at(0);
        (vt = p.current) == null || vt.applyUpdate(Nt ? [x, { delete: 1 }] : [x]), C(), (Dt = p.current) == null || Dt.focus(), b = requestAnimationFrame(() => {
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
  const wr = I(() => {
    var c;
    h.current && (mt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), ht());
  }, [ht]);
  vn(
    S,
    () => ({
      flushPendingEdits: wr,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = z.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [wr]
  );
  const Ce = I(() => {
    var c, b;
    if (!mt.current) {
      const N = (c = E.current) == null ? void 0 : c.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    w ? ht() : ($t(), Bt(!0)), n();
  }, [$t, ht, w, n, Bt]), Ee = _(Ce);
  ae(() => {
    Ee.current = Ce;
  });
  const _e = _({ book: a.book, chapterNum: a.chapterNum });
  ae(() => {
    (_e.current.book !== a.book || _e.current.chapterNum !== a.chapterNum) && (_e.current = { book: a.book, chapterNum: a.chapterNum }, Ee.current());
  }, [a.book, a.chapterNum]);
  const sn = async () => {
    var N;
    const c = (N = E.current) == null ? void 0 : N.getElementsByClassName("editor-input")[0];
    if (!(c != null && c.textContent)) return;
    const b = zn(c.textContent, i.copyLimit);
    if (b)
      try {
        await navigator.clipboard.writeText(b);
      } catch (x) {
        console.warn(`Could not copy the footnote to the clipboard: ${xr(x)}`);
      }
  }, ln = I(
    (c, b) => {
      v == null || v(), $(c), lt(b), dr(c, b), w && ht();
    },
    [dr, ht, w, v]
  ), cn = (c) => {
    var N, x, T, y, M;
    Pt(c), mt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (T = (x = p.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && Jt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const P = (M = (y = b.insert.note) == null ? void 0 : y.contents) == null ? void 0 : M.ops;
      J !== "x" && c === "x" ? P == null || P.forEach((Y) => ba(Y)) : J === "x" && c !== "x" && (P == null || P.forEach((Y) => Na(Y))), Se(b), w && ht();
    }
  }, dn = (c) => {
    on(c.contextMarker), ct(c.canRedo);
  }, un = I(
    (c) => {
      var N, x, T, y, M, P, Y;
      const b = (x = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && Jt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const Nt = (T = b.insert.note) == null ? void 0 : T.style, et = (M = (y = b.insert.note) == null ? void 0 : y.contents) == null ? void 0 : M.ops;
        if (Nt || It(!1), It(
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
          Tt.current = !0, jt.current = JSON.stringify(b), V.current = b, at(!0);
          return;
        }
        h.current = !0, ar(V.current, b), V.current = b, (Y = (P = p.current) == null ? void 0 : P.getOpsAfterNote(0)) != null && Y.length && setTimeout(or, 0), at(JSON.stringify(b) === jt.current), Bt(), w && ur();
      } else
        It(!1), at(!0);
    },
    [
      w,
      Bt,
      ur,
      ar,
      or
    ]
  ), fr = I(() => {
    const c = window.getSelection();
    if (!ye.length || !c || c.rangeCount === 0)
      return;
    const b = E.current;
    if (!b) return;
    const N = c.getRangeAt(0).cloneRange();
    Ne.setSource({
      measure: () => {
        const x = na(N);
        return x && oa(x);
      },
      contextElement: b
    }), te(!0);
  }, [ye, Ne]), Ie = _(() => {
  }), pr = I(
    (c, b, N) => {
      const { anchorRect: x } = c;
      if (!u || !x) return;
      const { hasTextSelection: T } = N;
      Fo({
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
        isNoteMarker: (y) => Oo(Lt.styleInfo ?? vr, y),
        sessionCounterRef: an,
        setSession: cr,
        clearSessionIfCurrent: re,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (y) => Ie.current(y),
        show: (y) => u.show({
          items: b.map(ma),
          anchor: x,
          keyForwarding: y
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ee,
        focusEditor: () => {
          var y;
          return (y = p.current) == null ? void 0 : y.focus();
        },
        applyItem: (y) => {
          var M;
          return (M = p.current) == null ? void 0 : M.applyMarkerMenuSelection(y, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (y) => {
          (!Hn(y) || y.code !== Un) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${xr(y)}`
          );
        }
      });
    },
    [
      u,
      Kt,
      ee,
      Lt.styleInfo,
      cr,
      re
    ]
  ), oe = I(() => {
    var N;
    const c = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = On(Lt.styleInfo ?? vr, c);
    return b.length === 0 ? !1 : (pr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [pr, Lt.styleInfo]);
  Jo({
    isSessionOpen: I(() => !!mt.current, []),
    dismiss: I(() => u == null ? void 0 : u.dismiss(), [u])
  });
  const mr = I(
    (c) => {
      if (!u) return;
      $o(c, {
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
    Ie.current = mr;
  }, [mr]), Vo({
    containerRef: E,
    editorRef: p,
    selectionRef: ve,
    baselineRef: xe,
    isSessionOpen: I(() => !!mt.current, [])
  }), F(() => {
    const c = () => {
      bt && te(!1);
    };
    return window.addEventListener("click", c), () => {
      window.removeEventListener("click", c);
    };
  }, [bt]), F(() => {
    var c;
    bt && ((c = ir.current) == null || c.focus());
  }, [bt]), F(() => {
    var N;
    const c = () => {
      var x;
      return ((x = E.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
    };
    if (((N = Lt.view) == null ? void 0 : N.markerMode) === "editable") {
      const x = (y) => {
        var Y, Nt, et, st;
        if (Be(y)) return;
        const M = mt.current, P = c();
        if (!(!P || document.activeElement !== P)) {
          if (M && u) {
            Ie.current(y);
            return;
          }
          if (da(E.current)) {
            y.key === l && (y.preventDefault(), y.stopPropagation());
            return;
          }
          if (y.key === "Enter" && !At()) {
            y.preventDefault(), y.stopPropagation(), (Y = p.current) == null || Y.selectNote(0), (Nt = p.current) == null || Nt.focus();
            return;
          }
          if (u && y.key === l) {
            if (!At()) {
              y.preventDefault(), y.stopPropagation(), (et = p.current) == null || et.selectNote(0), (st = p.current) == null || st.focus();
              return;
            }
            oe() && (y.preventDefault(), y.stopPropagation());
          }
        }
      }, T = () => {
        var M, P;
        const y = c();
        !y || document.activeElement !== y || At() || ((M = p.current) == null || M.selectNote(0), (P = p.current) == null || P.focus());
      };
      return document.addEventListener("keydown", x, { capture: !0 }), document.addEventListener("paste", T, { capture: !0 }), () => {
        document.removeEventListener("keydown", x, { capture: !0 }), document.removeEventListener("paste", T, { capture: !0 });
      };
    }
    const b = (x) => {
      const T = c();
      !bt && T && document.activeElement === T && x.key === l ? (x.preventDefault(), fr()) : bt && x.key === "Escape" && (x.preventDefault(), te(!1));
    };
    return document.addEventListener("keydown", b), () => {
      document.removeEventListener("keydown", b);
    };
  }, [
    bt,
    fr,
    l,
    (br = Lt.view) == null ? void 0 : br.markerMode,
    Lt.styleInfo,
    u,
    oe,
    At
  ]), F(() => {
    const c = z.current;
    if (!w || !c) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || Be(N) || (N.preventDefault(), N.stopPropagation(), Ee.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [w]), F(() => {
    const c = () => {
      var x, T, y;
      const b = ((x = E.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || At() || ((T = p.current) == null || T.selectNote(0), (y = p.current) == null || y.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [At]);
  const hr = d["%footnoteEditor_copyButton_tooltip%"], gr = /* @__PURE__ */ o(
    ta,
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
        ref: z,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                ca,
                {
                  isTypeSwitchable: Ut,
                  noteType: J,
                  handleNoteTypeChange: cn,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              /* @__PURE__ */ o(
                sa,
                {
                  callerType: D,
                  customCaller: U,
                  updateCaller: ln,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              w && gr
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(qe, { children: [
              gr,
              /* @__PURE__ */ o(
                Eo,
                {
                  onCancelClick: n,
                  onAcceptClick: Ce,
                  canAccept: !G || q !== D || D === "custom" && U !== ft,
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
                  ea,
                  {
                    editorRef: p,
                    canUndo: !G,
                    canRedo: tt,
                    children: /* @__PURE__ */ o(
                      Pn,
                      {
                        options: Lt,
                        onStateChange: dn,
                        onUsjChange: un,
                        defaultUsj: xa,
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
                    W,
                    {
                      "aria-label": hr,
                      onClick: sn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(En, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: hr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(Xe, { open: bt, children: [
      /* @__PURE__ */ o(vo, { virtualRef: Ne.virtualRef }),
      /* @__PURE__ */ o(
        We,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            fa,
            {
              markerMenuItems: ye,
              localizedStrings: d,
              searchRef: ir
            }
          )
        }
      )
    ] })
  ] });
}
function ya(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = it(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Dr(t, e, r) {
  const n = it(e);
  return t.some(
    (a) => it(a.projectId) === n && a.scrollGroupId === r
  );
}
function Le(t) {
  const e = ya(t.openTabs);
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
        isSelected: Dr(r, a.id, void 0),
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
        isSelected: Dr(r, a.id, i.scrollGroupId),
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
const rr = "Selected", nr = "Unselected";
function Rr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Kn(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Ge(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function Sa(t) {
  const e = t.filter(Rr).sort(zt), r = t.filter((a) => !Rr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function ka(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var f;
    const d = (f = e.getSectionHeading) == null ? void 0 : f.call(
      e,
      i,
      l.map((w) => w.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? rr : nr;
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
function Ca(t, e) {
  if (e.id === "openTabs") return Sa(t);
  if (e.id === "selection") return ka(t, e);
  if (!e.getGroupKey) return Ge(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const d = a(l.project);
    if (d === void 0 || d === "") {
      n.push(l);
      return;
    }
    const f = r.get(d);
    f ? f.push(l) : r.set(d, [l]);
  });
  const s = [...r.entries()].map(([l, d]) => {
    var S;
    const f = [...d].sort(
      (k, u) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, k.project, u.project)) || zt(k, u);
      }
    ), w = ((S = e.getSectionHeading) == null ? void 0 : S.call(
      e,
      l,
      f.map((k) => k.project)
    )) ?? l;
    return { key: l, heading: w, rows: f };
  });
  s.sort((l, d) => l.key === e.priorityKey ? -1 : d.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: d.key, heading: d.heading }
  ) : l.heading.localeCompare(d.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: d, rows: f }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: d,
    rows: f,
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
const gi = [
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
function j(t, e) {
  const r = t[e];
  if (!(typeof r != "string" || !Yr(r)))
    return r;
}
const ie = "recent", Ea = "other";
function nn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function _a(t) {
  const e = t ?? {};
  return [
    nn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? ie : Ea;
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
        const n = (a = r.customData) == null ? void 0 : a[Wt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Wt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (l) => {
            var d;
            return typeof ((d = l.customData) == null ? void 0 : d[Wt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Wt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const bi = _a();
function Ia(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? rr : e.unselectedSectionHeading ?? nr
  };
}
function Ni(t) {
  return {
    openTabsLabel: j(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: j(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: j(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: j(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: j(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: j(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: j(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: j(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function vi(t) {
  return {
    label: j(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const Ta = 100, nt = {
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
  autoSelectionSelectedSectionHeading: rr,
  autoSelectionUnselectedSectionHeading: nr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function La(t) {
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
function xi(t) {
  return {
    searchPlaceholder: j(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: j(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: j(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: j(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: j(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: j(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: j(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: j(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: j(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: j(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: j(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: j(t, "%projectSelector_openButtonLabel%"),
    clearAll: j(t, "%projectSelector_clearAll%")
  };
}
function Qt(t) {
  return fo[Fn(t)] ?? String(t);
}
const Mr = "platform.footerAction", Aa = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Da({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    ue,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Aa,
      children: r
    }
  ) : /* @__PURE__ */ o(ue, { variant: "secondary", children: r });
}
function Ra({
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
    open: f,
    onPointerEnter: w,
    onPointerLeave: S
  } = ko(), [k, u] = R(!1), v = xn(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, z = f || k, B = I(() => {
    if (E) {
      u(!0);
      return;
    }
    w();
  }, [E, w]), X = I(() => {
    u(!1), S();
  }, [S]), C = /* @__PURE__ */ o(we, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let D;
  e === "project" ? t.openGroups.length > 0 && (D = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((U) => /* @__PURE__ */ o(ue, { variant: "secondary", children: Qt(U) }, U)) })) : t.scrollGroupId !== void 0 && (D = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Da,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      W,
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
          /* @__PURE__ */ o(In, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const $ = /* @__PURE__ */ m(
    pe,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: B,
      onPointerLeave: X,
      ...p && { "aria-describedby": v },
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
              $n(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        D,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), q = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, A = t.isBoundButClosed && q ? r.boundButClosedTooltip.replace("{group}", q) : void 0;
  return /* @__PURE__ */ m(St, { open: z, delayDuration: 400, children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: $ }),
    /* @__PURE__ */ m(
      Ct,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Kr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && q && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              q,
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
function Ma({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Ye, { asChild: !0, children: /* @__PURE__ */ o(
        W,
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
          children: /* @__PURE__ */ o(_n, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(Ct, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      Qe,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: fe },
        children: [
          /* @__PURE__ */ o(tr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(Co, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(kr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(er, {}),
            t.map((s) => /* @__PURE__ */ o(kr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Oa(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function yi(t) {
  const [e, r] = R(!1), [n, a] = R(""), s = ut(() => La(t.localizedStrings), [t.localizedStrings]), i = ut(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(nn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      Ia({
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
  ]), [l, d] = R(void 0), f = ut(
    () => Oa(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = l ?? f, S = _(null), [k, u] = R(void 0), v = I((h) => {
    r(h), h || (a(""), u(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const L = S.current;
      L && L.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = ut(() => t.mode === "project" ? Le({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Le({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Le({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = ut(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (L) => L.shortName.toLowerCase().includes(h) || (L.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), z = ut(
    () => new Map(t.projects.map((h) => [it(h.id), h])),
    [t.projects]
  ), B = I(
    (h) => h === void 0 ? void 0 : z.get(it(h)),
    [z]
  ), { renderProjectIndicator: X } = t, C = I(
    (h) => X ? X(h.project) : void 0,
    [X]
  ), D = !!X, $ = !!t.footerAction && E.length === 0, q = ut(() => {
    if (w === Xt) return Ge(E);
    const h = i.find((L) => L.id === w);
    return h ? Ca(E, h) : Ge(E);
  }, [E, w, i]), A = (h) => {
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
        const L = t.selection.pairs, H = it(h.projectId), Z = (V) => it(V.projectId) === H && V.scrollGroupId === h.scrollGroupId, K = L.some(Z) ? L.filter((V) => !Z(V)) : [
          ...L.filter((V) => !Z(V)),
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
  }, ft = t.mode === "project" ? t.renderTriggerLabel : void 0, _t = t.mode === "project" ? t.triggerLabelFormat : void 0, J = ut(() => {
    switch (t.mode) {
      case "project": {
        const h = B(t.selection.projectId);
        if (ft)
          return { node: ft(h), title: "", hasSelection: !!h };
        let L = h ? h.shortName : s.buttonPlaceholder;
        return h && _t === "shortNameAndFullName" && (L = Kr(h)), { node: L, title: L, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const L = [];
        if (h.forEach((K) => {
          const V = B(K.projectId);
          V && L.push({ project: V, scrollGroupId: K.scrollGroupId });
        }), L.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const H = L.map(
          ({ project: K, scrollGroupId: V }) => V === void 0 ? K.shortName : `${K.shortName} (${Qt(V)})`
        ).join(", "), Z = L.length.toString();
        return {
          node: /* @__PURE__ */ m(gt, { children: [
            /* @__PURE__ */ o(ue, { variant: "muted", className: "tw:shrink-0", children: Z }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: H })
          ] }),
          title: `${Z} ${H}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = B(t.selection.projectId);
        if (!h) {
          const Z = s.buttonPlaceholder;
          return { node: Z, title: Z, hasSelection: !1 };
        }
        const L = t.selection.scrollGroupId;
        if (L === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const H = Qt(L);
        return {
          node: `${h.shortName} · ${H}`,
          title: `${h.shortName} · ${H}`,
          accessibleTitle: `${h.shortName}, ${H}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    B,
    t.selection,
    ft,
    _t,
    s.buttonPlaceholder
  ]), Pt = _(null), [Ut, It] = R(!1);
  F(() => {
    const h = Pt.current;
    if (!h) return;
    const L = (Z) => {
      It(Z < Ta);
    };
    if (L(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const H = new ResizeObserver((Z) => {
      Z.forEach((K) => {
        const [V] = K.borderBoxSize;
        L(V ? V.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return H.observe(h, { box: "border-box" }), () => H.disconnect();
  }, []);
  let G;
  t.isLoading ? G = /* @__PURE__ */ o(Tn, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ o(Br, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ o(Ln, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? A : void 0, tt = s.ariaLabel && J.hasSelection && J.title ? `${s.ariaLabel}: ${J.accessibleTitle ?? J.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ m(
    W,
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof J.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: J.node }) : J.node }),
        G
      ]
    }
  ), Tt = J.title ? /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(St, { children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(je, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ o(Ct, { dir: "auto", children: J.title })
  ] }) }) : /* @__PURE__ */ o(je, { asChild: !0, children: ct }), jt = i.length > 1;
  return /* @__PURE__ */ m(Xe, { open: e, onOpenChange: v, children: [
    Tt,
    /* @__PURE__ */ o(
      We,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(
          Ke,
          {
            shouldFilter: !1,
            value: $ ? k ?? Mr : void 0,
            onValueChange: u,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Fe,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                jt && /* @__PURE__ */ o(
                  Ma,
                  {
                    availableGroupings: i,
                    activeGrouping: w,
                    onChangeGrouping: d,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m($e, { children: [
                /* @__PURE__ */ o(Je, { children: s.commandEmptyMessage }),
                q.map((h, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Or,
                    {
                      children: [
                        /* @__PURE__ */ o(de, { heading: Pa(h, s), children: h.rows.map((H) => /* @__PURE__ */ o(
                          Ra,
                          {
                            row: H,
                            mode: t.mode,
                            strings: s,
                            onClick: U,
                            onOpen: at,
                            selectedRowRef: S,
                            indicator: C(H),
                            reserveIndicatorSlot: D
                          },
                          H.rowKey
                        )) }),
                        L < q.length - 1 && /* @__PURE__ */ o(Oe, { alwaysRender: !0 })
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
                    Oe,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    pe,
                    {
                      forceMount: !0,
                      value: Mr,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var h;
                        (h = t.footerAction) == null || h.onSelect(), v(!1);
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
function Pa(t, e) {
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
const ja = Pr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = pt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            An,
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
              onChange: (f) => e(f.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            W,
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
                /* @__PURE__ */ o(jr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ja.displayName = "SearchBar";
const Ba = 5;
function Si(t) {
  return wo(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function Ga(t, e) {
  return t.filter((r) => {
    try {
      return Jn(r) === e;
    } catch {
      return !1;
    }
  });
}
const ki = (t, e, r) => Ga(t, e).every((n) => r.includes(n));
function za(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => po(n, e));
}
function Ci(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = za(t, n);
  if (i.length !== 0)
    return i.length <= Ba ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Ei({ message: t, id: e, className: r }) {
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
function Ha({ className: t, ...e }) {
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
function Ua({ className: t, ...e }) {
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
const Ka = Ot(
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
        Ka({ variant: e }),
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
function $a({ className: t, ...e }) {
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
function Ja({ className: t, ...e }) {
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
function Ii({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Ha, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Ua, { children: [
      /* @__PURE__ */ o(Fa, { variant: "icon", children: n ?? /* @__PURE__ */ o(Dn, {}) }),
      /* @__PURE__ */ o($a, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Ja, { children: /* @__PURE__ */ o(W, { onClick: () => r(), children: e }) })
  ] });
}
const Va = Pr(({ className: t, ...e }, r) => /* @__PURE__ */ o(Rn, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
Va.displayName = "Spinner";
const qa = Ot(
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
function Ti({
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
        qa({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Li({ className: t, ...e }) {
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
function Ai({ className: t, ...e }) {
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
function Di({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Ue.Group,
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
function Ri({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Ue.Panel,
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
function Mi({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ue.Separator,
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
  qt as $,
  As as A,
  W as B,
  pe as C,
  Ze as D,
  qe as E,
  Wr as F,
  $e as G,
  Je as H,
  Es as I,
  Ys as J,
  ti as K,
  Rs as L,
  ms as M,
  bs as N,
  Ns as O,
  Xe as P,
  xs as Q,
  Qs as R,
  be as S,
  Et as T,
  Eo as U,
  ei as V,
  ue as W,
  ho as X,
  oi as Y,
  ni as Z,
  er as _,
  po as a,
  Us as a$,
  Fr as a0,
  ci as a1,
  ui as a2,
  ai as a3,
  si as a4,
  di as a5,
  ii as a6,
  Js as a7,
  Co as a8,
  kr as a9,
  oo as aA,
  so as aB,
  Er as aC,
  Ti as aD,
  Ai as aE,
  Li as aF,
  Gs as aG,
  gs as aH,
  ys as aI,
  no as aJ,
  ro as aK,
  hs as aL,
  ea as aM,
  Ha as aN,
  Ja as aO,
  $a as aP,
  Ua as aQ,
  Fa as aR,
  Ei as aS,
  _i as aT,
  hi as aU,
  va as aV,
  Xo as aW,
  fa as aX,
  vo as aY,
  Ks as aZ,
  Hs as a_,
  fi as aa,
  mi as ab,
  pi as ac,
  qr as ad,
  yi as ae,
  ja as af,
  Si as ag,
  Ga as ah,
  Oe as ai,
  Ts as aj,
  ki as ak,
  zs as al,
  vs as am,
  fo as an,
  Bs as ao,
  js as ap,
  qs as aq,
  _r as ar,
  Ws as as,
  Xs as at,
  $s as au,
  Zs as av,
  Ps as aw,
  Qr as ax,
  he as ay,
  ge as az,
  St as b,
  Mi as b0,
  Ri as b1,
  Di as b2,
  Ii as b3,
  Va as b4,
  wi as b5,
  li as b6,
  Fs as b7,
  ta as b8,
  fe as b9,
  Uo as bA,
  bi as bB,
  Po as bC,
  zo as bD,
  Ho as bE,
  Ko as bF,
  da as bG,
  Oo as bH,
  _a as bI,
  Ia as bJ,
  ma as bK,
  ps as bL,
  jo as bM,
  $o as bN,
  Fo as bO,
  xt as bP,
  Ci as bQ,
  Jo as bR,
  Vo as bS,
  qo as bT,
  fs as ba,
  ws as bb,
  to as bc,
  Qn as bd,
  ds as be,
  cs as bf,
  us as bg,
  ls as bh,
  To as bi,
  go as bj,
  $r as bk,
  Ar as bl,
  ri as bm,
  oa as bn,
  na as bo,
  Ro as bp,
  ra as bq,
  _s as br,
  Xt as bs,
  nt as bt,
  gi as bu,
  eo as bv,
  Ni as bw,
  xi as bx,
  vi as by,
  rn as bz,
  g as c,
  kt as d,
  Ct as e,
  Os as f,
  Ls as g,
  Ye as h,
  Qe as i,
  tr as j,
  Vs as k,
  Ss as l,
  ks as m,
  Cs as n,
  Ds as o,
  de as p,
  pt as q,
  rt as r,
  uo as s,
  Ms as t,
  ko as u,
  Is as v,
  je as w,
  We as x,
  Ke as y,
  Fe as z
};
//# sourceMappingURL=resizable-BII1Q3Cr.js.map
