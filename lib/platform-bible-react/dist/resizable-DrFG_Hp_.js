import { jsx as o, jsxs as m, Fragment as mt } from "react/jsx-runtime";
import { Slot as Ge, Dialog as vt, Separator as wn, Popover as Xt, Tooltip as $t, DropdownMenu as Q, Label as fn, RadioGroup as Te } from "radix-ui";
import { IconX as pn, IconCheck as ze, IconSearch as mn, IconChevronLeft as hn, IconChevronRight as gn } from "@tabler/icons-react";
import { Canon as rt } from "@sillsdev/scripture";
import dt, { useState as M, useRef as _, useCallback as T, createContext as bn, useContext as Nn, useEffect as F, useMemo as ct, Fragment as Br, useLayoutEffect as ne, useImperativeHandle as vn, useId as xn, forwardRef as Gr } from "react";
import { X as zr, Check as de, ChevronsUpDown as Hr, Star as yn, Undo as Sn, Redo as kn, SquareX as He, FunctionSquare as Ue, SquareSigma as Ke, Ban as Cn, Copy as En, Sparkles as _n, ClipboardCheck as In, CircleCheckBig as Tn, MessageSquare as Ln, Search as Ur, Library as An, BookOpen as Dn, BookMarked as Mn, Book as On, MessageSquarePlus as Rn, PanelBottom as Pn, FileText as jn, Scan as Bn, ZoomOut as Gn, ZoomIn as zn, Eye as Hn, Pencil as Un, BookCopy as Kn, Users as Fn, ExternalLink as $n, CircleQuestionMark as qn, Settings as Jn, BookA as Vn, House as Xn, Download as Zn, RefreshCw as Wn, Group as Yn, ArrowRight as Qn, Loader2 as to, ChevronDown as eo, AlertTriangle as ro, LoaderCircle as no } from "lucide-react";
import { cva as Mt } from "class-variance-authority";
import { filterAndRankItems as yr, GENERATOR_NOTE_CALLER as Le, HIDDEN_NOTE_CALLER as Ae, isInsertEmbedOpOfType as Ft, getDefaultViewOptions as oo, getMarkerMenuItems as ao, defaultStyleInfo as Sr, Editorial as so } from "@eten-tech-foundation/platform-editor";
import { Section as Dt, MODIFIER_KEYS as io, split as Kr, slice as lo, formatReplacementString as co, usfmMarkers as oe, deepEqual as jt, truncateToCopyLimit as uo, getErrorMessage as kr, isPlatformError as wo, ABORTED as fo, normalizeProjectId as at, compareProjectsByName as po, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Vt, localizedStringOrUndefined as mo, formatProjectName as Fr, resolveLocalizedString as ho, getLocalizeKeyForScrollGroupId as go, hasDistinctFullName as bo, getSectionForBook as No } from "platform-bible-utils";
import { Command as Gt } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Fe from "react-resizable-panels";
import { clsx as vo } from "clsx";
import { extendTailwindMerge as xo, twMerge as yo } from "tailwind-merge";
const So = xo({ prefix: "tw" });
function De(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function ko(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = De(t), r = e.findIndex((s) => s.startsWith("-tw-"));
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
function Co(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = De(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = De(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
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
  const e = vo(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return So(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const f = ko(d);
    n.set(f.normalized, f.original), a.push(f.normalized);
  }), yo(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const f = n.get(d);
    return f ? Co(d, f) : d;
  }).join(" ");
}
const $r = 600, ue = 650, Ps = 400, Eo = 450, _o = 500, js = 510, Bs = 520, Io = 675, Gs = 690, zs = 700, Hs = 800, qr = Mt(
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
      className: g(qr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Jr = "layoutDirection";
function Vr() {
  return globalThis.localStorage ?? void 0;
}
function wt() {
  var t;
  try {
    const e = (t = Vr()) == null ? void 0 : t.getItem(Jr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Us(t) {
  var e;
  try {
    (e = Vr()) == null || e.setItem(Jr, t);
  } catch {
  }
}
function Ks({ ...t }) {
  return /* @__PURE__ */ o(vt.Root, { "data-slot": "dialog", ...t });
}
function Fs({ ...t }) {
  return /* @__PURE__ */ o(vt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function To({ ...t }) {
  return /* @__PURE__ */ o(vt.Portal, { "data-slot": "dialog-portal", ...t });
}
function $s({ ...t }) {
  return /* @__PURE__ */ o(vt.Close, { "data-slot": "dialog-close", ...t });
}
function Lo({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    vt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: g(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Eo, ...e },
      ...r
    }
  );
}
function qs({
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
  const l = wt();
  return /* @__PURE__ */ m(To, { children: [
    /* @__PURE__ */ o(Lo, { className: n, style: a }),
    /* @__PURE__ */ m(
      vt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: _o, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(vt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(pn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Js({ className: t, ...e }) {
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
function Vs({
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
        e && /* @__PURE__ */ o(vt.Close, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Xs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    vt.Title,
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
function Zs({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    vt.Description,
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
function Xr({ className: t, type: e, ...r }) {
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
function Ao({ className: t, ...e }) {
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
const Do = Mt(
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
function Mo({
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
        className: g(Do({ align: e }), t),
        onClick: (n) => {
          var a, s;
          n.target instanceof HTMLElement && n.target.closest("button") || (s = (a = n.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
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
function $e({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gt,
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
function qe({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = wt(), s = dt.useCallback(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(Ao, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Gt.Input,
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
      /* @__PURE__ */ o(Mo, { children: /* @__PURE__ */ o(mn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gt.List,
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
function Ve({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Empty,
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
function le({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Group,
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
    Gt.Separator,
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
function we({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ m(
    Gt.Item,
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
function Oo({ className: t, ...e }) {
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
const Ro = [
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
], Po = (t) => {
  var e;
  return ((e = Ro[t]) == null ? void 0 : e.chapters) ?? -1;
}, jo = rt.allBookIds.filter(
  (t) => !rt.isObsolete(rt.bookIdToNumber(t))
);
function Bo(t) {
  const e = [], r = Math.min(t.length, rt.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(rt.bookNumberToId(n + 1));
  return e;
}
function R(t) {
  return `%scrollGroup_${t}%`;
}
const Go = {
  [R("undefined")]: "Ø",
  [R(0)]: "A",
  [R(1)]: "B",
  [R(2)]: "C",
  [R(3)]: "D",
  [R(4)]: "E",
  [R(5)]: "F",
  [R(6)]: "G",
  [R(7)]: "H",
  [R(8)]: "I",
  [R(9)]: "J",
  [R(10)]: "K",
  [R(11)]: "L",
  [R(12)]: "M",
  [R(13)]: "N",
  [R(14)]: "O",
  [R(15)]: "P",
  [R(16)]: "Q",
  [R(17)]: "R",
  [R(18)]: "S",
  [R(19)]: "T",
  [R(20)]: "U",
  [R(21)]: "V",
  [R(22)]: "W",
  [R(23)]: "X",
  [R(24)]: "Y",
  [R(25)]: "Z"
};
function Xe(t, e) {
  return Po(rt.bookIdToNumber(t));
}
function fe(t, e, r) {
  const n = rt.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = rt.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
function Ws(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = fe(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Xe(s), 1),
      verseNum: 1
    };
}
function Ys(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < Xe(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = fe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Qs(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = fe(n, e, "previous");
  if (!i) return;
  const l = Math.max(Xe(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function ti(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = fe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function ei(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const ri = (t, e, r, n, a) => {
  switch (t) {
    case Dt.OT:
      return e ?? "Old Testament";
    case Dt.NT:
      return r ?? "New Testament";
    case Dt.DC:
      return n ?? "Deuterocanon";
    case Dt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, ni = (t, e, r, n, a) => {
  switch (t) {
    case Dt.OT:
      return e ?? "OT";
    case Dt.NT:
      return r ?? "NT";
    case Dt.DC:
      return n ?? "DC";
    case Dt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function oi(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? rt.bookIdToEnglishName(t);
}
function zo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const ai = Object.fromEntries(
  jo.map((t) => [t, rt.bookIdToEnglishName(t)])
);
function si(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = rt.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
const Cr = `
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
function Ho(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Zt(t, e) {
  const r = e ? `${Cr}, ${e}` : Cr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Ho(n)
  );
}
const ii = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Oe = "keyboard", Er = !1;
function li() {
  Er || typeof document > "u" || (Er = !0, document.addEventListener(
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
function ci() {
  return Oe;
}
const Zr = "data-quiet-focus";
function di(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(Zr, ""), t.style.outline = "none"));
}
function ui(t) {
  t && (t.removeAttribute(Zr), t.style.removeProperty("outline"));
}
const wi = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function Uo({
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
const Ko = Mt(
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
function Ze({
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
        Ko({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function fi({
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
function Wr({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    Uo,
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
function Yr() {
  const t = dt.createContext(null);
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return dt.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function We({ ...t }) {
  return /* @__PURE__ */ o(Xt.Root, { "data-slot": "popover", ...t });
}
function Re({ ...t }) {
  return /* @__PURE__ */ o(Xt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: Fo, usePortalContainer: $o } = Yr(), pi = Fo;
function Ye({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  ...a
}) {
  const s = wt(), i = $o();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Xt.Portal, { container: i, children: /* @__PURE__ */ o(
      Xt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: $r, ...n },
        dir: s,
        ...a
      }
    ) })
  );
}
function qo({ ...t }) {
  return /* @__PURE__ */ o(Xt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function mi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function hi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function gi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function kt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    $t.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function xt({ ...t }) {
  return /* @__PURE__ */ o($t.Root, { "data-slot": "tooltip", ...t });
}
function yt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    $t.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? g(qr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: Jo, usePortalContainer: Vo } = Yr(), bi = Jo;
function St({
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
  const l = Vo();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o($t.Portal, { container: l, children: /* @__PURE__ */ m(
      $t.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Io, ...r },
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          n && /* @__PURE__ */ o(
            $t.Arrow,
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
function Xo() {
  const [t, e] = M(!1), r = _(null), n = T(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = T(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const Qr = bn(void 0);
function pe() {
  const t = Nn(Qr);
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
function Qe({ variant: t = "default", ...e }) {
  const r = wt(), n = dt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Qr.Provider, { value: n, children: /* @__PURE__ */ o(Q.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Ni({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function tr({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function er({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  children: a,
  ...s
}) {
  const i = wt();
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
      style: { zIndex: $r, ...n },
      ...s,
      children: /* @__PURE__ */ o("div", { dir: i, children: a })
    }
  ) });
}
function vi({ ...t }) {
  return /* @__PURE__ */ o(Q.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function xi({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = wt(), s = pe();
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
        me({ variant: s.variant })
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
  const s = wt(), i = pe();
  return /* @__PURE__ */ m(
    Q.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        me({ variant: i.variant })
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
function Zo({
  ...t
}) {
  return /* @__PURE__ */ o(Q.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function _r({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = wt(), s = pe();
  return /* @__PURE__ */ m(
    Q.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        me({ variant: s.variant })
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
function rr({ className: t, inset: e, ...r }) {
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
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Q.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function yi({ className: t, ...e }) {
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
function Si({ ...t }) {
  return /* @__PURE__ */ o(Q.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function ki({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = pe(), s = wt();
  return /* @__PURE__ */ m(
    Q.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        me({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(hn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(gn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ci({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = wt();
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
      style: { zIndex: ue, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function Ei({ className: t, ...e }) {
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
function _i({
  className: t,
  ...e
}) {
  const r = wt();
  return /* @__PURE__ */ o(
    Te.Root,
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
function Ii({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Te.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Te.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Ti = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Ir = (t, e) => t[e] ?? e;
function Wo({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Ir(n, "%cancelButton_tooltip%"), l = s ?? Ir(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ m(xt, { children: [
      /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(zr, {})
        }
      ) }),
      /* @__PURE__ */ o(St, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(Wr, {}),
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ m(xt, { children: [
      /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(de, {})
        }
      ) }),
      /* @__PURE__ */ o(St, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function he() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Li() {
  return /Windows/i.test(navigator.userAgent);
}
const Yo = ["input", "select", "textarea", "button"], Qo = ["button", "textbox"], Ai = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = _(null), [s, i] = M(void 0), [l, d] = M(void 0), f = T(
    (w) => {
      i(w);
      const N = t.find((E) => E.id === w);
      N && (e == null || e(N));
      const p = document.getElementById(w);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), u = T(
    (w) => {
      const N = t.find((p) => p.id === w);
      N && (d((p) => p === w ? void 0 : w), r == null || r(N));
    },
    [r, t]
  ), S = (w) => {
    if (!w) return !1;
    const N = w.tagName.toLowerCase();
    if (w.isContentEditable || Yo.includes(N)) return !0;
    const p = w.getAttribute("role");
    if (p && Qo.includes(p)) return !0;
    const E = w.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, k = T(
    (w) => {
      var V;
      const N = w.target, p = (A) => A ? document.getElementById(A) : void 0, E = p(l), z = p(s);
      if (!!(E && N && E.contains(N) && N !== E) && S(N)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !N.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const A = t.find((U) => U.id === l);
            A && f(A.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!E) return;
          const A = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (A.length === 0) return;
          const U = A.findIndex((ut) => ut === N);
          if (U === -1) return;
          let st;
          w.key === "ArrowDown" ? st = Math.min(U + 1, A.length - 1) : st = Math.max(U - 1, 0), st !== U && (w.preventDefault(), w.stopPropagation(), (V = A[st]) == null || V.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((A) => A.id === s);
      let D = C;
      switch (w.key) {
        case "ArrowDown":
          D = Math.min(C + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          D = Math.max(C - 1, 0), w.preventDefault();
          break;
        case "Home":
          D = 0, w.preventDefault();
          break;
        case "End":
          D = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && u(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const A = z;
          if (A) {
            const U = A.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), st = A.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), ut = U ?? st;
            if (ut) {
              w.preventDefault(), ut.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (S(N) || (n == null || n(w.key), w.preventDefault()));
          return;
      }
      const $ = t[D];
      $ && f($.id);
    },
    [t, f, s, l, u, n]
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
}, ta = Mt(
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
function ce({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
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
        ta({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function Di({ className: t, ...e }) {
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
function Mi({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = dt.useRef(null);
  dt.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), dt.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Zt(i, '[tabindex]:not([tabindex="-1"])').forEach((u) => {
          u.setAttribute("tabindex", "-1");
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
        i.preventDefault(), (d = Zt(l)[0]) == null || d.focus();
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
function Oi({
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
function Ri({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Pi({ className: t, ...e }) {
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
function ea(t) {
  dt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Zt(t.current) : [], s = a.indexOf(document.activeElement), i = n.key === "ArrowRight" ? s + 1 : s - 1;
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
function ra(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function na(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ji({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = dt.useRef(null);
  dt.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), ea(i);
  const l = dt.useMemo(
    () => i.current ? Zt(i.current) : [],
    [i]
  ), d = dt.useCallback(
    (u) => {
      const { current: S } = i;
      if (!S || !S.parentElement) return;
      if (!tn(u, S)) {
        e == null || e(u);
        return;
      }
      const k = S.closest("table"), w = k ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Zt(k).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], N = w.indexOf(S), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (u.key === "ArrowDown" || u.key === "ArrowUp")
        u.preventDefault(), na(w, N, u.key);
      else if (u.key === "ArrowLeft" || u.key === "ArrowRight")
        u.preventDefault(), ra(l, p, u.key);
      else if (u.key === "Escape") {
        u.preventDefault();
        const E = S.closest("table");
        E && E.focus();
      }
      e == null || e(u);
    },
    [i, l, e]
  ), f = dt.useCallback(
    (u) => {
      n && (r == null || r(u));
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
function Bi({ className: t, ...e }) {
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
function Gi({ className: t, ...e }) {
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
function zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function oa(t, e = !0) {
  const [r, n] = M(!1);
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
function aa({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = oa(r, e);
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
function Hi({
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
  isOpen: u = void 0,
  onOpenChange: S = void 0,
  isDisabled: k = !1,
  sortSelected: w = !1,
  showScrollCue: N = !1,
  icon: p = void 0,
  className: E = void 0,
  variant: z = "ghost",
  id: B
}) {
  const [X, C] = M(!1), D = _(null), $ = T(
    (G) => {
      var tt;
      const nt = (tt = t.find((it) => it.label === G)) == null ? void 0 : tt.value;
      nt && r(
        e.includes(nt) ? e.filter((it) => it !== nt) : [...e, nt]
      );
    },
    [t, e, r]
  ), V = () => f || n, A = u ?? X, U = S ?? C, [st, ut] = M(A), [Ct, q] = M(e);
  st !== A && (ut(A), A && q(e));
  const Ot = ct(() => {
    if (!w) return t;
    const G = t.filter((tt) => tt.starred).sort((tt, it) => tt.label.localeCompare(it.label)), nt = t.filter((tt) => !tt.starred).sort((tt, it) => {
      const _t = Ct.includes(tt.value), Rt = Ct.includes(it.value);
      return _t && !Rt ? -1 : !_t && Rt ? 1 : tt.label.localeCompare(it.label);
    });
    return [...G, ...nt];
  }, [t, Ct, w]), zt = () => {
    const G = t.map((nt) => nt.value);
    q(G), r(G);
  }, Et = () => {
    q([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: B, className: E, children: /* @__PURE__ */ m(We, { open: A, onOpenChange: U, children: [
    /* @__PURE__ */ o(Re, { asChild: !0, children: /* @__PURE__ */ m(
      Z,
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
                children: V()
              }
            )
          ] }),
          /* @__PURE__ */ o(Hr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Ye, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m($e, { children: [
      /* @__PURE__ */ o(
        qe,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: zt, children: i }),
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Et, children: l })
      ] }),
      /* @__PURE__ */ o(aa, { isEnabled: N, scrollerRef: D, children: /* @__PURE__ */ m(Je, { ref: D, children: [
        /* @__PURE__ */ o(Ve, { children: d }),
        /* @__PURE__ */ o(le, { children: Ot.map((G) => /* @__PURE__ */ m(
          we,
          {
            value: G.label,
            onSelect: $,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                de,
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
function Nt(t) {
  return t.replace(/^\+/, "");
}
function sa(t, e) {
  if (!t || e === "") return !1;
  const r = Nt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && Nt(n.marker).toLowerCase() === r
  );
}
function ia(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = Nt(e).toLowerCase();
  return r === "passive" ? yr({
    query: a,
    items: n,
    filter: (s) => Nt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : yr({
    query: a,
    items: n,
    filter: (s) => Nt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Pe(t) {
  return t.isComposing || t.keyCode === 229;
}
const en = /^[a-z0-9+-]$/i;
function la(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && he()) && e !== "Dead") {
    if (en.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const ca = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], da = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function ua() {
  return [...ca, ...da.filter((t) => en.test(t))];
}
function lt(t) {
  t.preventDefault(), t.stopPropagation();
}
function wa(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (Pe(t) || io.has(t.key))
    return "passed";
  const a = !he();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && lt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return lt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return lt(t), ia(
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
    return lt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (lt(t), e.filter === "")
        return r.dismiss(), "ended";
      const u = Nt(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, u)) {
        const S = e.items.find(
          (k) => Nt(k.marker).toLowerCase() === u
        );
        return S && r.commitItem(S.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    lt(t);
    const d = Nt(e.filter).toLowerCase(), f = e.items.find(
      (u) => Nt(u.marker).toLowerCase() === d
    );
    return f && r.commitItem(f.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (lt(t), r.dismiss(), "ended") : (lt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (lt(t), "continue") : (lt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return lt(t), r.dismiss(), "ended";
  const s = la(t);
  return t.key === "Backspace" || s !== void 0 ? (lt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (lt(t), "continue");
}
function fa(t, e) {
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
function pa(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function ma(t) {
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
    hasEditorChangedSinceFocus: u,
    focusEditor: S,
    applyItem: k,
    onShowError: w
  } = t, N = () => {
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
    keys: ua(),
    onKey: (B) => l(B)
  }).then((B) => {
    var C;
    i(p);
    const X = B ?? ((C = z.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (X !== void 0) {
      const D = (u == null ? void 0 : u()) ?? !1;
      N();
      const $ = D ? void 0 : e.find((V) => V.marker === X);
      $ && k($);
    } else E() && N();
  }).catch((B) => {
    i(p), E() && N(), w(B);
  });
}
function ha(t, e) {
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
  const u = (k) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    k();
  };
  return wa(t, f, {
    update: (k) => a.update(k),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (k) => u(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(k);
    }),
    commitTypedAndReopen: (k) => u(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(k, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (k) => u(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedCloser(k);
    }),
    commitItem: (k) => u(() => {
      var N;
      const w = f.items.find((p) => p.marker === k);
      if (w) {
        if (w.kind === "note") {
          f.itemToApplyOnClose = w;
          return;
        }
        s(), (N = n.current) == null || N.applyMarkerMenuSelection(w, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && l(f.token), "routed";
}
function ga({
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
function ba({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  F(() => {
    const i = s ?? document, l = (d) => {
      var S, k, w;
      const f = (S = t.current) == null ? void 0 : S.querySelector(".editor-input");
      if (!f || d.target !== f) return;
      const u = (k = e.current) == null ? void 0 : k.getSelection();
      u ? r.current = u : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = rn(
        () => {
          var N;
          return (N = e.current) == null ? void 0 : N.getUsj();
        },
        () => {
          var N;
          return (N = e.current) == null ? void 0 : N.getSelection();
        }
      ));
    };
    return i.addEventListener("focusout", l), () => i.removeEventListener("focusout", l);
  }, [t, e, r, n, a, s]);
}
function Na({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = _(void 0), a = T(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = T(
    (i) => {
      var l;
      fa(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
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
function Tr({ className: t, ...e }) {
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
function va({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const xa = /* @__PURE__ */ new Set([
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
function ya(t) {
  const e = Kr(t, "");
  let r = 0;
  for (; r < e.length && xa.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = lo(t, r);
  return a ? [...n, a] : n;
}
function Sa(t) {
  const e = [];
  let r = "";
  return Kr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function ka(t) {
  const e = ya(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Sa(t), separator: "+" };
}
function Lr({ hint: t }) {
  const { keycaps: e, separator: r } = ka(t);
  return e.length === 1 ? /* @__PURE__ */ o(Tr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(va, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Br, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Tr, { children: n })
      ] }, a)
    )) })
  );
}
const Ui = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Ar = (t, e) => t[e] ?? e;
function Ca({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = he(), f = Ar(a, "%undoButton_tooltip%"), u = Ar(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ m(xt, { children: [
      /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
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
      /* @__PURE__ */ o(St, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(mt, { children: [
          " ",
          /* @__PURE__ */ o(Lr, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(Wr, {}),
    e && /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ m(xt, { children: [
      /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": u,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(kn, {})
        }
      ) }),
      /* @__PURE__ */ o(St, { children: /* @__PURE__ */ m("p", { children: [
        u,
        s && /* @__PURE__ */ m(mt, { children: [
          " ",
          /* @__PURE__ */ o(Lr, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Ea({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = _(null);
  return F(() => {
    var d;
    const s = he(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (f) => {
      var S, k, w, N;
      if (!i || document.activeElement !== i) return;
      const u = f.key.toLowerCase();
      if (s) {
        if (!f.metaKey) return;
        !f.shiftKey && u === "z" ? (f.preventDefault(), r && ((S = e.current) == null || S.undo())) : f.shiftKey && u === "z" && (f.preventDefault(), n && ((k = e.current) == null || k.redo()));
      } else {
        if (!f.ctrlKey) return;
        !f.shiftKey && u === "z" ? (f.preventDefault(), r && ((w = e.current) == null || w.undo())) : (u === "y" || f.shiftKey && u === "z") && (f.preventDefault(), n && ((N = e.current) == null || N.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function _a() {
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
  }), n = T((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return ct(() => ({ virtualRef: r, setSource: n }), [n]);
}
function Ia(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ta(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const La = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(mt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(mt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(mt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Aa({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = _(!1), i = _(null), l = _(null), d = _(!1), [f, u] = M(t), [S, k] = M(e), [w, N] = M(!1), p = _(!1), E = _(f);
  E.current = f;
  const z = _(S);
  z.current = S, F(() => {
    u(t);
  }, [t]), F(() => {
    S !== e && k(e);
  }, [e]);
  const B = (C) => {
    if (d.current = !1, N(C), !C) {
      const D = E.current, $ = z.current;
      D !== "custom" || $ ? (D !== t || $ !== e) && (s.current = !0, r(D, $)) : (u(t), k(e));
    }
  }, X = (C) => {
    var D, $, V, A;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((D = i.current) == null || D.focus(), d.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? (($ = l.current) == null || $.focus(), d.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((V = i.current) == null ? void 0 : V.selectionStart) === 0 && ((A = l.current) == null || A.focus(), d.current = !1), f === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && B(!1);
  };
  return /* @__PURE__ */ m(Qe, { open: w, onOpenChange: B, children: [
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ m(xt, { children: [
      /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(tr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: La(t, n, e) }) }) }),
      /* @__PURE__ */ o(St, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      er,
      {
        style: { zIndex: ue },
        onEscapeKeyDown: () => {
          E.current = t, z.current = e, u(t), k(e);
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
          /* @__PURE__ */ o(rr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(nr, {}),
          /* @__PURE__ */ o(
            qt,
            {
              checked: f === "generated",
              onCheckedChange: () => u("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Le })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            qt,
            {
              checked: f === "hidden",
              onCheckedChange: () => u("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ae })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            qt,
            {
              ref: l,
              checked: f === "custom",
              onCheckedChange: () => u("custom"),
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
                  Xr,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), u("custom"), d.current = !0;
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
const Da = (t, e) => t === "f" ? /* @__PURE__ */ m(mt, { children: [
  /* @__PURE__ */ o(Ue, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(mt, { children: [
  /* @__PURE__ */ o(Ke, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(mt, { children: [
  /* @__PURE__ */ o(He, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Ma = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), co(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Oa({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = _(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(Qe, { children: [
    /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ m(xt, { children: [
      /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(tr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Da(t, r) }) }) }),
      /* @__PURE__ */ o(St, { children: /* @__PURE__ */ o("p", { children: Ma(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      er,
      {
        style: { zIndex: ue },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), a());
        },
        children: [
          /* @__PURE__ */ o(rr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(nr, {}),
          /* @__PURE__ */ m(
            qt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(He, {}),
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
                /* @__PURE__ */ o(Ue, {}),
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
                /* @__PURE__ */ o(Ke, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Dr = '[aria-controls="editor-context-menu"]';
function Ra(t) {
  return t ? t.matches(Dr) ? !0 : !!t.querySelector(Dr) : !1;
}
const Ki = Object.freeze([
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
function Pa({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Cn, { className: e, size: 16 });
}
function ja({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(de, { size: 16 })
    }
  );
}
function ie(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Mr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
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
      value: ie(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(ja, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Pa, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Oo, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Ba({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = M(""), [l] = M(() => {
    const u = e.find(
      (S) => S.marker === a && !S.isDisallowed && !S.isDeprecated && !S.isDisabled
    );
    return u ? ie(u) : void 0;
  }), [d, f] = ct(() => {
    const u = Nt(s.trim().toLowerCase());
    if (!u) {
      const w = e.filter((N) => !N.isDisallowed);
      return [w.length > 0 ? w : e, []];
    }
    const S = e.filter((w) => {
      var p;
      const N = (p = w.marker) == null ? void 0 : p.toLowerCase();
      return w.isDisallowed ? N === u : N == null ? void 0 : N.includes(u);
    }), k = e.filter(
      (w) => w.title.toLowerCase().includes(u) && !S.includes(w)
    );
    return [S, k];
  }, [s, e]);
  return /* @__PURE__ */ m($e, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: l, children: [
    /* @__PURE__ */ o(
      qe,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (u) => i(u),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(Je, { children: [
      /* @__PURE__ */ o(Ve, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(le, { children: d.map((u) => /* @__PURE__ */ o(
        Mr,
        {
          item: u,
          localizedStrings: t
        },
        ie(u)
      )) }),
      f.length > 0 && /* @__PURE__ */ m(mt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Me, { alwaysRender: !0 }),
        /* @__PURE__ */ o(le, { children: f.map((u) => /* @__PURE__ */ o(
          Mr,
          {
            item: u,
            localizedStrings: t
          },
          ie(u)
        )) })
      ] })
    ] })
  ] });
}
function Ga(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = oe[n], i = s != null && s.children ? s : a && oe[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((f) => ({
        marker: f,
        title: r[oe[f].description] ?? oe[f].description,
        action: () => {
          var u;
          (u = t.current) == null || u.insertMarker(f), e();
        }
      }))
    );
  }), l.sort((d, f) => (d.marker ?? d.title).localeCompare(f.marker ?? f.title));
}
function Or(t) {
  if (!t || !Ft("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function za(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Ha(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function Ua(t, e) {
  let r = 0, n = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const i = t[r];
      return n !== 0 || !i || !jt(i, a) ? !1 : (r += 1, !0);
    }
    let s = a.insert;
    for (; s.length > 0; ) {
      const i = t[r];
      if (!i || typeof i.insert != "string" || !jt(i.attributes, a.attributes))
        return !1;
      const l = i.insert.slice(n), d = Math.min(l.length, s.length);
      if (l.slice(0, d) !== s.slice(0, d)) return !1;
      s = s.slice(d), n += d, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function Ka(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Fa(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const $a = 300, _e = "*", qa = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Fi({
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
  inline: u = !1,
  ref: S,
  initialCaretPosition: k,
  markerPalette: w,
  onNoteEdit: N
}) {
  var xr;
  const p = _(null), E = _(null), z = _(null), B = _(s);
  F(() => {
    B.current = s;
  }, [s]);
  const X = _(k);
  F(() => {
    X.current = k;
  }, [k]);
  const C = T(() => {
    var b, v;
    const c = X.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (v = p.current) == null || v.selectNote(0);
  }, []);
  ne(() => {
    if (u || !z.current) return;
    const c = parseFloat(getComputedStyle(z.current).width);
    c > 0 && (z.current.style.width = `${c}px`);
  }, [u]);
  const [D, $] = M("generated"), [V, A] = M("generated"), [U, st] = M(_e), [ut, Ct] = M(_e), [q, Ot] = M("f"), [zt, Et] = M(!1), [G, nt] = M(!0), [tt, it] = M(!1), _t = _(!1), Rt = _(""), h = _(!1), L = _(void 0), H = _([]), W = _([]), K = _(void 0), J = _(void 0), ir = T(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (H.current = [...H.current, ...c], K.current = void 0);
  }, []), lr = T(
    (c, b) => {
      var y, O;
      if (!c) return;
      const v = Or(c), x = Or(b);
      if (!v && x) {
        K.current = {
          text: H.current,
          closedNoteOp: c,
          openNoteOp: b
        }, H.current = [];
        return;
      }
      const I = K.current;
      I && (v && !x && jt(c, I.openNoteOp) && jt(b, I.closedNoteOp) && !((O = (y = p.current) == null ? void 0 : y.getOpsAfterNote(0)) != null && O.length) ? (H.current = I.text, K.current = void 0) : jt(b, I.openNoteOp) || (K.current = void 0));
    },
    []
  ), [ht, Yt] = M(!1), ge = _a(), [cr, on] = M(), dr = _(null), ft = _(
    void 0
  ), an = _(0), ur = _(w);
  F(() => {
    ur.current = w;
  }, [w]), F(
    () => () => {
      var c;
      ft.current && (ft.current = void 0, (c = ur.current) == null || c.dismiss());
    },
    []
  );
  const be = _(void 0), Ne = _(void 0), Qt = T(
    () => pa(
      Ne.current,
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
  ), { setSession: wr, clearSessionIfCurrent: te } = Na({
    sessionRef: ft,
    editorRef: p,
    baselineRef: Ne
  }), Ht = T(() => {
    var b, v, x, I;
    if ((b = p.current) != null && b.getSelection() || (v = p.current) != null && v.getSelectedParaMarker()) return;
    const c = be.current;
    c ? (x = p.current) == null || x.setSelection(c) : (I = p.current) == null || I.selectNote(0);
  }, []), ee = T(() => {
    var c;
    Ht(), (c = p.current) == null || c.focus();
  }, [Ht]), It = ct(
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
        ...i.view ?? oo(),
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
  ), ve = ct(
    () => Ga(
      p,
      () => Yt(!1),
      d,
      cr,
      q
    ),
    [d, cr, q]
  );
  F(() => {
    var c;
    ht || (c = p.current) == null || c.focus();
  }, [q, ht]);
  const Tt = T(() => {
    var x, I, y;
    const c = (x = E.current) == null ? void 0 : x.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), v = (y = (I = E.current) == null ? void 0 : I.ownerDocument.getSelection()) == null ? void 0 : y.anchorNode;
    return !!b && !!v && b.contains(v);
  }, []), Pt = T(
    (c = !1) => {
      var v, x, I, y, O;
      N == null || N();
      const b = (x = (v = p.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && Ft("note", b) && (r == null || r([b]), c && f && B.current)) {
        const P = [
          ...H.current,
          ...((I = p.current) == null ? void 0 : I.getOpsAfterNote(0)) ?? []
        ], Y = W.current, gt = !jt(P, Y);
        if (u && !gt && jt(b, L.current))
          return;
        L.current = b;
        const et = [b];
        gt && (Y.length > 0 && Ua(
          ((y = f.current) == null ? void 0 : y.getOpsAfterNote(B.current)) ?? [],
          Y
        ) && et.push({ delete: Ha(Y) }), et.push(...P), W.current = P), (O = f.current) == null || O.replaceEmbedUpdate(B.current, et);
      }
    },
    [u, r, N, f]
  ), xe = T(
    (c) => {
      var v, x, I;
      const b = (v = p.current) == null ? void 0 : v.getSelection();
      (x = p.current) == null || x.applyUpdate([c, { delete: 1 }]), b && ((I = p.current) == null || I.setSelection(b)), ee();
    },
    [ee]
  ), fr = T(
    (c, b) => {
      var I, y, O;
      ft.current || (I = p.current) == null || I.commitPendingMarkerEdits();
      const v = (O = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : O.at(0);
      if (!v || !Ft("note", v) || !v.insert.note) return;
      let x;
      c === "custom" ? x = b : c === "generated" ? x = Le : x = Ae, v.insert.note.caller !== x && (v.insert.note.caller = x, xe(v));
    },
    [xe]
  ), Ut = _(void 0), ye = _(Pt);
  F(() => {
    ye.current = Pt;
  }, [Pt]);
  const Kt = T(() => {
    Ut.current !== void 0 && (clearTimeout(Ut.current), Ut.current = void 0);
  }, []), pt = T(() => {
    Ut.current !== void 0 && (Kt(), ye.current(!0));
  }, [Kt]), pr = T(() => {
    Kt(), Ut.current = setTimeout(() => {
      Ut.current = void 0, ye.current(!0);
    }, $a);
  }, [Kt]);
  F(() => {
    var I, y;
    let c, b, v;
    _t.current = !1, h.current = !1, be.current = void 0, nt(!0);
    const x = e == null ? void 0 : e.at(0);
    if (L.current = x, H.current = [], W.current = [], K.current = void 0, J.current = void 0, x && Ft("note", x)) {
      const O = (I = x.insert.note) == null ? void 0 : I.caller;
      let P = "custom";
      O === Le ? P = "generated" : O === Ae && (P = "hidden");
      const Y = P === "custom" && O !== void 0 ? O : _e;
      st(Y), Ct(Y), $(P), A(P), Ot(((y = x.insert.note) == null ? void 0 : y.style) ?? "f"), c = setTimeout(() => {
        var et, ot, bt, Lt;
        const gt = (ot = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : ot.at(0);
        (bt = p.current) == null || bt.applyUpdate(gt ? [x, { delete: 1 }] : [x]), C(), (Lt = p.current) == null || Lt.focus(), b = requestAnimationFrame(() => {
          v = setTimeout(() => {
            var At;
            Tt() || (C(), (At = p.current) == null || At.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      pt(), X.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), v !== void 0 && clearTimeout(v);
    };
  }, [e, pt, Tt, C]), ne(() => () => pt(), [pt]);
  const mr = T(() => {
    var c;
    h.current && (ft.current || (c = p.current) == null || c.commitPendingMarkerEdits(), pt());
  }, [pt]);
  vn(
    S,
    () => ({
      flushPendingEdits: mr,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = z.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [mr]
  );
  const Se = T(() => {
    var c, b;
    if (!ft.current) {
      const v = (c = E.current) == null ? void 0 : c.querySelector(".editor-input");
      v != null && v.contains(v.ownerDocument.activeElement) && v.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    u ? pt() : (Kt(), Pt(!0)), n();
  }, [Kt, pt, u, n, Pt]), ke = _(Se);
  ne(() => {
    ke.current = Se;
  });
  const Ce = _({ book: a.book, chapterNum: a.chapterNum });
  ne(() => {
    (Ce.current.book !== a.book || Ce.current.chapterNum !== a.chapterNum) && (Ce.current = { book: a.book, chapterNum: a.chapterNum }, ke.current());
  }, [a.book, a.chapterNum]);
  const sn = async () => {
    var v;
    const c = (v = E.current) == null ? void 0 : v.getElementsByClassName("editor-input")[0];
    if (!(c != null && c.textContent)) return;
    const b = uo(c.textContent, i.copyLimit);
    if (b)
      try {
        await navigator.clipboard.writeText(b);
      } catch (x) {
        console.warn(`Could not copy the footnote to the clipboard: ${kr(x)}`);
      }
  }, ln = T(
    (c, b) => {
      N == null || N(), $(c), st(b), fr(c, b), u && pt();
    },
    [fr, pt, u, N]
  ), cn = (c) => {
    var v, x, I, y, O;
    Ot(c), ft.current || (v = p.current) == null || v.commitPendingMarkerEdits();
    const b = (I = (x = p.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : I.at(0);
    if (b && Ft("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const P = (O = (y = b.insert.note) == null ? void 0 : y.contents) == null ? void 0 : O.ops;
      q !== "x" && c === "x" ? P == null || P.forEach((Y) => Ka(Y)) : q === "x" && c !== "x" && (P == null || P.forEach((Y) => Fa(Y))), xe(b), u && pt();
    }
  }, dn = (c) => {
    on(c.contextMarker), it(c.canRedo);
  }, un = T(
    (c) => {
      var v, x, I, y, O, P, Y;
      const b = (x = (v = p.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && Ft("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var ot;
          (ot = p.current) == null || ot.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const gt = (I = b.insert.note) == null ? void 0 : I.style, et = (O = (y = b.insert.note) == null ? void 0 : y.contents) == null ? void 0 : O.ops;
        if (gt || Et(!1), Et(
          gt === "x" ? !!(et != null && et.every((ot) => {
            var Lt, At;
            if (!((Lt = ot.attributes) != null && Lt.char)) return !0;
            const bt = ((At = ot.attributes) == null ? void 0 : At.char).style;
            return bt === "xt" || bt === "xo" || bt === "xq";
          })) : !!(et != null && et.every((ot) => {
            var Lt, At;
            if (!((Lt = ot.attributes) != null && Lt.char)) return !0;
            const bt = ((At = ot.attributes) == null ? void 0 : At.char).style;
            return bt === "ft" || bt === "fr" || bt === "fq";
          }))
        ), !_t.current) {
          _t.current = !0, Rt.current = JSON.stringify(b), J.current = b, nt(!0);
          return;
        }
        h.current = !0, lr(J.current, b), J.current = b, (Y = (P = p.current) == null ? void 0 : P.getOpsAfterNote(0)) != null && Y.length && setTimeout(ir, 0), nt(JSON.stringify(b) === Rt.current), Pt(), u && pr();
      } else
        Et(!1), nt(!0);
    },
    [
      u,
      Pt,
      pr,
      lr,
      ir
    ]
  ), hr = T(() => {
    const c = window.getSelection();
    if (!ve.length || !c || c.rangeCount === 0)
      return;
    const b = E.current;
    if (!b) return;
    const v = c.getRangeAt(0).cloneRange();
    ge.setSource({
      measure: () => {
        const x = Ia(v);
        return x && Ta(x);
      },
      contextElement: b
    }), Yt(!0);
  }, [ve, ge]), Ee = _(() => {
  }), gr = T(
    (c, b, v) => {
      const { anchorRect: x } = c;
      if (!w || !x) return;
      const { hasTextSelection: I } = v;
      ma({
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: I ? "selection" : "backslash",
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
        isNoteMarker: (y) => sa(It.styleInfo ?? Sr, y),
        sessionCounterRef: an,
        setSession: wr,
        clearSessionIfCurrent: te,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (y) => Ee.current(y),
        show: (y) => w.show({
          items: b.map(za),
          anchor: x,
          keyForwarding: y
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Ht,
        hasEditorChangedSinceFocus: Qt,
        focusEditor: () => {
          var y;
          return (y = p.current) == null ? void 0 : y.focus();
        },
        applyItem: (y) => {
          var O;
          return (O = p.current) == null ? void 0 : O.applyMarkerMenuSelection(y, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (y) => {
          (!wo(y) || y.code !== fo) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${kr(y)}`
          );
        }
      });
    },
    [
      w,
      Ht,
      Qt,
      It.styleInfo,
      wr,
      te
    ]
  ), re = T(() => {
    var v;
    const c = (v = p.current) == null ? void 0 : v.getMarkerMenuContext();
    if (!c) return !1;
    const b = ao(It.styleInfo ?? Sr, c);
    return b.length === 0 ? !1 : (gr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [gr, It.styleInfo]);
  ga({
    isSessionOpen: T(() => !!ft.current, []),
    dismiss: T(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const br = T(
    (c) => {
      if (!w) return;
      ha(c, {
        sessionRef: ft,
        editorRef: p,
        palette: w,
        restoreCaret: Ht,
        reopenAtCaret: re,
        clearSessionIfCurrent: te,
        hasEditorChangedSinceFocus: Qt
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      re,
      Ht,
      te,
      Qt
    ]
  );
  F(() => {
    Ee.current = br;
  }, [br]), ba({
    containerRef: E,
    editorRef: p,
    selectionRef: be,
    baselineRef: Ne,
    isSessionOpen: T(() => !!ft.current, [])
  }), F(() => {
    const c = () => {
      ht && Yt(!1);
    };
    return window.addEventListener("click", c), () => {
      window.removeEventListener("click", c);
    };
  }, [ht]), F(() => {
    var c;
    ht && ((c = dr.current) == null || c.focus());
  }, [ht]), F(() => {
    var v;
    const c = () => {
      var x;
      return ((x = E.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
    };
    if (((v = It.view) == null ? void 0 : v.markerMode) === "editable") {
      const x = (y) => {
        var Y, gt, et, ot;
        if (Pe(y)) return;
        const O = ft.current, P = c();
        if (!(!P || document.activeElement !== P)) {
          if (O && w) {
            Ee.current(y);
            return;
          }
          if (Ra(E.current)) {
            y.key === l && (y.preventDefault(), y.stopPropagation());
            return;
          }
          if (y.key === "Enter" && !Tt()) {
            y.preventDefault(), y.stopPropagation(), (Y = p.current) == null || Y.selectNote(0), (gt = p.current) == null || gt.focus();
            return;
          }
          if (w && y.key === l) {
            if (!Tt()) {
              y.preventDefault(), y.stopPropagation(), (et = p.current) == null || et.selectNote(0), (ot = p.current) == null || ot.focus();
              return;
            }
            re() && (y.preventDefault(), y.stopPropagation());
          }
        }
      }, I = () => {
        var O, P;
        const y = c();
        !y || document.activeElement !== y || Tt() || ((O = p.current) == null || O.selectNote(0), (P = p.current) == null || P.focus());
      };
      return document.addEventListener("keydown", x, { capture: !0 }), document.addEventListener("paste", I, { capture: !0 }), () => {
        document.removeEventListener("keydown", x, { capture: !0 }), document.removeEventListener("paste", I, { capture: !0 });
      };
    }
    const b = (x) => {
      const I = c();
      !ht && I && document.activeElement === I && x.key === l ? (x.preventDefault(), hr()) : ht && x.key === "Escape" && (x.preventDefault(), Yt(!1));
    };
    return document.addEventListener("keydown", b), () => {
      document.removeEventListener("keydown", b);
    };
  }, [
    ht,
    hr,
    l,
    (xr = It.view) == null ? void 0 : xr.markerMode,
    It.styleInfo,
    w,
    re,
    Tt
  ]), F(() => {
    const c = z.current;
    if (!u || !c) return;
    const b = (v) => {
      v.key !== "Escape" || v.defaultPrevented || Pe(v) || (v.preventDefault(), v.stopPropagation(), ke.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [u]), F(() => {
    const c = () => {
      var x, I, y;
      const b = ((x = E.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const v = document.getSelection();
      v && !v.isCollapsed || Tt() || ((I = p.current) == null || I.selectNote(0), (y = p.current) == null || y.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [Tt]);
  const Nr = d["%footnoteEditor_copyButton_tooltip%"], vr = /* @__PURE__ */ o(
    Ca,
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
  return /* @__PURE__ */ m(mt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: z,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", u && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", u && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                Oa,
                {
                  isTypeSwitchable: zt,
                  noteType: q,
                  handleNoteTypeChange: cn,
                  localizedStrings: d,
                  focusNoteText: ee
                }
              ),
              /* @__PURE__ */ o(
                Aa,
                {
                  callerType: D,
                  customCaller: U,
                  updateCaller: ln,
                  localizedStrings: d,
                  focusNoteText: ee
                }
              ),
              u && vr
            ] }),
            !u && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(Ze, { children: [
              vr,
              /* @__PURE__ */ o(
                Wo,
                {
                  onCancelClick: n,
                  onAcceptClick: Se,
                  canAccept: !G || V !== D || D === "custom" && U !== ut,
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
                  Ea,
                  {
                    editorRef: p,
                    canUndo: !G,
                    canRedo: tt,
                    children: /* @__PURE__ */ o(
                      so,
                      {
                        options: It,
                        onStateChange: dn,
                        onUsjChange: un,
                        defaultUsj: qa,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(kt, { children: /* @__PURE__ */ m(xt, { children: [
                  /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(
                    Z,
                    {
                      "aria-label": Nr,
                      onClick: sn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(En, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(St, { children: /* @__PURE__ */ o("p", { children: Nr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(We, { open: ht, children: [
      /* @__PURE__ */ o(qo, { virtualRef: ge.virtualRef }),
      /* @__PURE__ */ o(
        Ye,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Ba,
            {
              markerMenuItems: ve,
              localizedStrings: d,
              searchRef: dr
            }
          )
        }
      )
    ] })
  ] });
}
const Ja = {
  "refresh-cw": Wn,
  download: Zn,
  house: Xn,
  "book-a": Vn,
  settings: Jn,
  "circle-question-mark": qn,
  "external-link": $n,
  users: Fn,
  "book-copy": Kn,
  pencil: Un,
  eye: Hn,
  "zoom-in": zn,
  "zoom-out": Gn,
  scan: Bn,
  "file-text": jn,
  "panel-bottom": Pn,
  "message-square-plus": Rn,
  "square-function": Ue,
  "square-x": He,
  "square-sigma": Ke,
  book: On,
  "book-marked": Mn,
  "book-open": Dn,
  library: An,
  search: Ur,
  "message-square": Ln,
  "circle-check-big": Tn,
  "clipboard-check": In,
  sparkles: _n
}, or = Ja, $i = Object.keys(or);
function Va(t) {
  return t !== void 0 && Object.hasOwn(or, t);
}
function Xa(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = at(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Rr(t, e, r) {
  const n = at(e);
  return t.some(
    (a) => at(a.projectId) === n && a.scrollGroupId === r
  );
}
function Ie(t) {
  const e = Xa(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : at(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(at(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: a !== void 0 && a === at(s.id),
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
    const s = e.get(at(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Rr(r, a.id, void 0),
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
        isSelected: Rr(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = at(a.projectId);
    if (n.some(
      (l) => at(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => at(l.id) === s);
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
const ar = "Selected", sr = "Unselected";
function Pr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Bt(t, e) {
  const r = po(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function je(t) {
  return [{ kind: "flat", rows: [...t].sort(Bt) }];
}
function Za(t) {
  const e = t.filter(Pr).sort(Bt), r = t.filter((a) => !Pr(a)).sort(Bt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function Wa(t, e) {
  const r = t.filter((i) => i.isSelected).sort(Bt), n = t.filter((i) => !i.isSelected).sort(Bt), a = (i, l) => {
    var f;
    const d = (f = e.getSectionHeading) == null ? void 0 : f.call(
      e,
      i,
      l.map((u) => u.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? ar : sr;
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
function Ya(t, e) {
  if (e.id === "openTabs") return Za(t);
  if (e.id === "selection") return Wa(t, e);
  if (!e.getGroupKey) return je(t);
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
      (k, w) => {
        var N;
        return ((N = e.compareProjects) == null ? void 0 : N.call(e, k.project, w.project)) || Bt(k, w);
      }
    ), u = ((S = e.getSectionHeading) == null ? void 0 : S.call(
      e,
      l,
      f.map((k) => k.project)
    )) ?? l;
    return { key: l, heading: u, rows: f };
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
    rows: [...n].sort(Bt)
  }), i;
}
const qi = [
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
  return mo(t, e);
}
const ae = "recent", Qa = "other";
function nn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function ts(t) {
  const e = t ?? {};
  return [
    nn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Vt.lastUsedAt]) == "number" ? ae : Qa;
      },
      getSectionHeading: (r) => r === ae ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === ae ? -1 : n.key === ae ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Vt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Vt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (l) => {
            var d;
            return typeof ((d = l.customData) == null ? void 0 : d[Vt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Vt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Ji = ts();
function es(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? ar : e.unselectedSectionHeading ?? sr
  };
}
function Vi(t) {
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
function Xi(t) {
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
const rs = 100, Be = {
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
  autoSelectionSelectedSectionHeading: ar,
  autoSelectionUnselectedSectionHeading: sr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
}, ns = (
  // `Object.keys` erases the key type; the assertion restores what
  // `PROJECT_SELECTOR_DEFAULT_STRINGS`'s `Required<…>` annotation already guarantees, and is what
  // lets the resolve loop below index both bags.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  Object.keys(Be)
);
function os(t) {
  const e = t ?? {}, r = { ...Be };
  return ns.forEach((n) => {
    r[n] = ho(e[n], Be[n]);
  }), e.ariaLabel === "" && (r.ariaLabel = ""), r;
}
function Zi(t) {
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
function Wt(t) {
  return Go[go(t)] ?? String(t);
}
const jr = "platform.footerAction", as = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ss({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Wt(t);
  return e ? /* @__PURE__ */ o(
    ce,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: as,
      children: r
    }
  ) : /* @__PURE__ */ o(ce, { variant: "secondary", children: r });
}
function is({
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
    onPointerEnter: u,
    onPointerLeave: S
  } = Xo(), [k, w] = M(!1), N = xn(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, z = f || k, B = T(() => {
    if (E) {
      w(!0);
      return;
    }
    u();
  }, [E, u]), X = T(() => {
    w(!1), S();
  }, [S]), C = /* @__PURE__ */ o(de, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let D;
  e === "project" ? t.openGroups.length > 0 && (D = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((U) => /* @__PURE__ */ o(ce, { variant: "secondary", children: Wt(U) }, U)) })) : t.scrollGroupId !== void 0 && (D = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      ss,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      Z,
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
          /* @__PURE__ */ o(Qn, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const $ = /* @__PURE__ */ m(
    we,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: B,
      onPointerLeave: X,
      ...p && { "aria-describedby": N },
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
              bo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        D,
        p && /* @__PURE__ */ o("span", { id: N, hidden: !0, children: t.disabledReason })
      ]
    }
  ), V = t.scrollGroupId !== void 0 ? Wt(t.scrollGroupId) : void 0, A = t.isBoundButClosed && V ? r.boundButClosedTooltip.replace("{group}", V) : void 0;
  return /* @__PURE__ */ m(xt, { open: z, delayDuration: 400, children: [
    /* @__PURE__ */ o(yt, { asChild: !0, children: $ }),
    /* @__PURE__ */ m(
      St,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Fr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && V && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              V,
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
const Jt = "none";
function ls({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Jt;
  return /* @__PURE__ */ m(Qe, { children: [
    /* @__PURE__ */ m(xt, { children: [
      /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(tr, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
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
          children: /* @__PURE__ */ o(Yn, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(St, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      er,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ue },
        children: [
          /* @__PURE__ */ o(rr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(Zo, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(_r, { value: Jt, children: n.groupByNone }),
            /* @__PURE__ */ o(nr, {}),
            t.map((s) => /* @__PURE__ */ o(_r, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function cs(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Jt) return Jt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Jt;
}
function Wi(t) {
  const [e, r] = M(!1), [n, a] = M(""), s = ct(() => os(t.localizedStrings), [t.localizedStrings]), i = ct(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(nn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      es({
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
  ]), [l, d] = M(void 0), f = ct(
    () => cs(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), u = l ?? f, S = _(null), [k, w] = M(void 0), N = T((h) => {
    r(h), h || (a(""), w(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const L = S.current;
      L && L.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = ct(() => t.mode === "project" ? Ie({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Ie({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Ie({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = ct(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (L) => L.shortName.toLowerCase().includes(h) || (L.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), z = ct(
    () => new Map(t.projects.map((h) => [at(h.id), h])),
    [t.projects]
  ), B = T(
    (h) => h === void 0 ? void 0 : z.get(at(h)),
    [z]
  ), { renderProjectIndicator: X } = t, C = T(
    (h) => X ? X(h.project) : void 0,
    [X]
  ), D = !!X, $ = !!t.footerAction && E.length === 0, V = ct(() => {
    if (u === Jt) return je(E);
    const h = i.find((L) => L.id === u);
    return h ? Ya(E, h) : je(E);
  }, [E, u, i]), A = (h) => {
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
        const L = t.selection.pairs, H = at(h.projectId), W = (J) => at(J.projectId) === H && J.scrollGroupId === h.scrollGroupId, K = L.some(W) ? L.filter((J) => !W(J)) : [
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
  }, st = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, ut = t.mode === "project" ? t.renderTriggerLabel : void 0, Ct = t.mode === "project" ? t.triggerLabelFormat : void 0, q = ct(() => {
    switch (t.mode) {
      case "project": {
        const h = B(t.selection.projectId);
        if (ut)
          return { node: ut(h), title: "", hasSelection: !!h };
        let L = h ? h.shortName : s.buttonPlaceholder;
        return h && Ct === "shortNameAndFullName" && (L = Fr(h)), { node: L, title: L, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const L = [];
        if (h.forEach((K) => {
          const J = B(K.projectId);
          J && L.push({ project: J, scrollGroupId: K.scrollGroupId });
        }), L.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const H = L.map(
          ({ project: K, scrollGroupId: J }) => J === void 0 ? K.shortName : `${K.shortName} (${Wt(J)})`
        ).join(", "), W = L.length.toString();
        return {
          node: /* @__PURE__ */ m(mt, { children: [
            /* @__PURE__ */ o(ce, { variant: "muted", className: "tw:shrink-0", children: W }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: H })
          ] }),
          title: `${W} ${H}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = B(t.selection.projectId);
        if (!h) {
          const W = s.buttonPlaceholder;
          return { node: W, title: W, hasSelection: !1 };
        }
        const L = t.selection.scrollGroupId;
        if (L === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const H = Wt(L);
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
    ut,
    Ct,
    s.buttonPlaceholder
  ]), Ot = _(null), [zt, Et] = M(!1);
  F(() => {
    const h = Ot.current;
    if (!h) return;
    const L = (W) => {
      Et(W < rs);
    };
    if (L(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const H = new ResizeObserver((W) => {
      W.forEach((K) => {
        const [J] = K.borderBoxSize;
        L(J ? J.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return H.observe(h, { box: "border-box" }), () => H.disconnect();
  }, []);
  let G;
  t.isLoading ? G = /* @__PURE__ */ o(to, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : zt ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ o(Hr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ o(eo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const nt = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? A : void 0, tt = s.ariaLabel && q.hasSelection && q.title ? `${s.ariaLabel}: ${q.accessibleTitle ?? q.title}` : s.ariaLabel || void 0, it = /* @__PURE__ */ m(
    Z,
    {
      ref: Ot,
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
        zt && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof q.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: q.node }) : q.node }),
        G
      ]
    }
  ), _t = q.title ? /* @__PURE__ */ o(kt, { delayDuration: 400, children: /* @__PURE__ */ m(xt, { children: [
    /* @__PURE__ */ o(yt, { asChild: !0, children: /* @__PURE__ */ o(Re, { asChild: !0, children: it }) }),
    /* @__PURE__ */ o(St, { dir: "auto", children: q.title })
  ] }) }) : /* @__PURE__ */ o(Re, { asChild: !0, children: it }), Rt = i.length > 1;
  return /* @__PURE__ */ m(We, { open: e, onOpenChange: N, children: [
    _t,
    /* @__PURE__ */ o(
      Ye,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(kt, { delayDuration: 400, children: /* @__PURE__ */ m(
          $e,
          {
            shouldFilter: !1,
            value: $ ? k ?? jr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  qe,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Rt && /* @__PURE__ */ o(
                  ls,
                  {
                    availableGroupings: i,
                    activeGrouping: u,
                    onChangeGrouping: d,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: st, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Je, { children: [
                /* @__PURE__ */ o(Ve, { children: s.commandEmptyMessage }),
                V.map((h, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Br,
                    {
                      children: [
                        /* @__PURE__ */ o(le, { heading: ds(h, s), children: h.rows.map((H) => /* @__PURE__ */ o(
                          is,
                          {
                            row: H,
                            mode: t.mode,
                            strings: s,
                            onClick: U,
                            onOpen: nt,
                            selectedRowRef: S,
                            indicator: C(H),
                            reserveIndicatorSlot: D
                          },
                          H.rowKey
                        )) }),
                        L < V.length - 1 && /* @__PURE__ */ o(Me, { alwaysRender: !0 })
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
                    we,
                    {
                      forceMount: !0,
                      value: jr,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var h;
                        (h = t.footerAction) == null || h.onSelect(), N(!1);
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
function ds(t, e) {
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
const us = Gr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = wt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            Ur,
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            Xr,
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
            Z,
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
                /* @__PURE__ */ o(zr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
us.displayName = "SearchBar";
const ws = 5;
function Yi(t) {
  return Bo(t).filter(
    (e) => !rt.isObsolete(rt.bookIdToNumber(e))
  );
}
function fs(t, e) {
  return t.filter((r) => {
    try {
      return No(r) === e;
    } catch {
      return !1;
    }
  });
}
const Qi = (t, e, r) => fs(t, e).every((n) => r.includes(n));
function ps(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => rt.bookIdToNumber(n) > 0).sort((n, a) => rt.bookIdToNumber(n) - rt.bookIdToNumber(a)).map((n) => zo(n, e));
}
function tl(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = ps(t, n);
  if (i.length !== 0)
    return i.length <= ws ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function el({ name: t, className: e }) {
  const r = Va(t) ? or[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function rl({ message: t, id: e, className: r }) {
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
function ms({ className: t, ...e }) {
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
function hs({ className: t, ...e }) {
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
const gs = Mt(
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
function bs({
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
        gs({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function nl({ className: t, ...e }) {
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
function Ns({ className: t, ...e }) {
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
function vs({ className: t, ...e }) {
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
function ol({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(ms, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(hs, { children: [
      /* @__PURE__ */ o(bs, { variant: "icon", children: n ?? /* @__PURE__ */ o(ro, {}) }),
      /* @__PURE__ */ o(Ns, { children: t })
    ] }),
    r && /* @__PURE__ */ o(vs, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const xs = Gr(({ className: t, ...e }, r) => /* @__PURE__ */ o(no, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
xs.displayName = "Spinner";
const ys = Mt(
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
function al({
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
        ys({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function sl({ className: t, ...e }) {
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
function il({ className: t, ...e }) {
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
function ll({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Fe.Group,
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
function se(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function cl({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Fe.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: se(t),
      minSize: se(e),
      maxSize: se(r),
      collapsedSize: se(n),
      ...a
    }
  );
}
function dl({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Fe.Separator,
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
  $r as $,
  ai as A,
  Z as B,
  we as C,
  Qe as D,
  Wr as E,
  Je as F,
  Ve as G,
  Ei as H,
  ti as I,
  Ii as J,
  Ks as K,
  ii as L,
  qs as M,
  Js as N,
  Xs as O,
  We as P,
  he as Q,
  _i as R,
  Wo as S,
  kt as T,
  Ti as U,
  ce as V,
  Uo as W,
  Di as X,
  Ai as Y,
  nr as Z,
  qt as _,
  zo as a,
  mi as a$,
  ji as a0,
  Gi as a1,
  Mi as a2,
  Oi as a3,
  Bi as a4,
  Ri as a5,
  vi as a6,
  Zo as a7,
  _r as a8,
  Hi as a9,
  me as aA,
  Ao as aB,
  Mo as aC,
  Tr as aD,
  al as aE,
  il as aF,
  sl as aG,
  fi as aH,
  $s as aI,
  Zs as aJ,
  Lo as aK,
  To as aL,
  Fs as aM,
  Ea as aN,
  ms as aO,
  vs as aP,
  Ns as aQ,
  hs as aR,
  bs as aS,
  rl as aT,
  nl as aU,
  Fi as aV,
  $a as aW,
  va as aX,
  Ba as aY,
  qo as aZ,
  gi as a_,
  Ki as aa,
  Ui as ab,
  Xr as ac,
  Va as ad,
  Wi as ae,
  us as af,
  Yi as ag,
  fs as ah,
  Me as ai,
  ni as aj,
  Qi as ak,
  pi as al,
  Vs as am,
  Go as an,
  el as ao,
  wi as ap,
  ui as aq,
  yi as ar,
  Lr as as,
  ki as at,
  Si as au,
  Ni as av,
  Ci as aw,
  di as ax,
  Qr as ay,
  pe as az,
  xt as b,
  hi as b0,
  dl as b1,
  cl as b2,
  ll as b3,
  ol as b4,
  xs as b5,
  zi as b6,
  Pi as b7,
  bi as b8,
  Ca as b9,
  Xi as bA,
  rn as bB,
  fa as bC,
  Ji as bD,
  ia as bE,
  ua as bF,
  wa as bG,
  pa as bH,
  Ra as bI,
  sa as bJ,
  ts as bK,
  es as bL,
  za as bM,
  Us as bN,
  la as bO,
  ha as bP,
  ma as bQ,
  Nt as bR,
  tl as bS,
  ga as bT,
  ba as bU,
  Na as bV,
  ue as ba,
  Hs as bb,
  zs as bc,
  _o as bd,
  Eo as be,
  Bs as bf,
  js as bg,
  Gs as bh,
  Ps as bi,
  ta as bj,
  Ko as bk,
  qr as bl,
  Or as bm,
  Li as bn,
  Ta as bo,
  Ia as bp,
  oa as bq,
  _a as br,
  ei as bs,
  $i as bt,
  Jt as bu,
  Be as bv,
  qi as bw,
  Io as bx,
  Vi as by,
  Zi as bz,
  g as c,
  yt as d,
  St as e,
  ci as f,
  oi as g,
  tr as h,
  er as i,
  rr as j,
  xi as k,
  Ws as l,
  Ys as m,
  Qs as n,
  si as o,
  le as p,
  jo as q,
  wt as r,
  ri as s,
  li as t,
  Xo as u,
  Re as v,
  Ye as w,
  $e as x,
  qe as y,
  Ze as z
};
//# sourceMappingURL=resizable-DrFG_Hp_.js.map
