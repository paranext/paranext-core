import { jsx as o, jsxs as m, Fragment as xt } from "react/jsx-runtime";
import { Slot as He, Dialog as kt, Separator as kn, Popover as Yt, Tooltip as Vt, DropdownMenu as et, Label as Cn, RadioGroup as Me } from "radix-ui";
import { IconX as En, IconCheck as Ue, IconSearch as In, IconChevronLeft as _n, IconChevronRight as Tn } from "@tabler/icons-react";
import { Canon as at } from "@sillsdev/scripture";
import mt, { useRef as E, useEffect as K, useCallback as _, useState as P, createContext as Ln, useContext as An, useMemo as pt, Fragment as Fr, useLayoutEffect as ie, useImperativeHandle as Dn, useId as Mn, forwardRef as Kr } from "react";
import { X as $r, Check as qr, ChevronsUpDown as Vr, Star as Pn, Undo as On, Redo as Rn, SquareX as Fe, FunctionSquare as Ke, SquareSigma as $e, Ban as Bn, Copy as jn, Redo2 as Gn, Undo2 as zn, Sparkles as Hn, ClipboardCopy as Un, ClipboardCheck as Fn, CircleCheckBig as Kn, MessageSquare as $n, Search as Jr, Library as qn, BookOpen as Vn, BookMarked as Jn, Book as Xn, MessageSquarePlus as Wn, PanelBottom as Zn, FileText as Yn, Scan as Qn, ZoomOut as to, ZoomIn as eo, Eye as ro, Pencil as no, BookCopy as oo, Users as ao, ExternalLink as so, CircleQuestionMark as io, Settings as lo, BookA as co, House as uo, Download as wo, RefreshCw as fo, Group as po, ArrowRight as mo, Loader2 as ho, ChevronDown as go, AlertTriangle as bo, LoaderCircle as No } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as Er, GENERATOR_NOTE_CALLER as Pe, HIDDEN_NOTE_CALLER as Oe, isInsertEmbedOpOfType as qt, getDefaultViewOptions as vo, getMarkerMenuItems as yo, defaultStyleInfo as Ir, Editorial as xo } from "@eten-tech-foundation/platform-editor";
import { Section as Pt, MODIFIER_KEYS as So, split as Xr, slice as ko, formatReplacementString as Co, usfmMarkers as le, deepEqual as Gt, isPlatformError as Eo, ABORTED as Io, getErrorMessage as _o, normalizeProjectId as dt, compareProjectsByName as To, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Wr, getLocalizeKeyForScrollGroupId as Lo, hasDistinctFullName as Ao, getSectionForBook as Do } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as qe from "react-resizable-panels";
import { clsx as Mo } from "clsx";
import { extendTailwindMerge as Po, twMerge as Oo } from "tailwind-merge";
const Ro = Po({ prefix: "tw" });
function Re(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Bo(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Re(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, u) => u !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((d, u) => u !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function jo(t, e) {
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
  const e = Mo(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Ro(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const u = Bo(d);
    n.set(u.normalized, u.original), a.push(u.normalized);
  }), Oo(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const u = n.get(d);
    return u ? jo(d, u) : d;
  }).join(" ");
}
const Zr = 600, pe = 650, Ys = 400, Go = 450, zo = 500, Qs = 510, ti = 520, Ho = 675, ei = 690, ri = 700, ni = 800, Yr = Ot(
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
  const s = n ? He.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: g(Yr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Qr = "layoutDirection";
function tn() {
  return globalThis.localStorage ?? void 0;
}
function gt() {
  var t;
  try {
    const e = (t = tn()) == null ? void 0 : t.getItem(Qr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function oi(t) {
  var e;
  try {
    (e = tn()) == null || e.setItem(Qr, t);
  } catch {
  }
}
function ai({ ...t }) {
  return /* @__PURE__ */ o(kt.Root, { "data-slot": "dialog", ...t });
}
function si({ ...t }) {
  return /* @__PURE__ */ o(kt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Uo({ ...t }) {
  return /* @__PURE__ */ o(kt.Portal, { "data-slot": "dialog-portal", ...t });
}
function ii({ ...t }) {
  return /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", ...t });
}
function Fo({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    kt.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: g(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Go, ...e },
      ...r
    }
  );
}
function li({
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
  const l = gt();
  return /* @__PURE__ */ m(Uo, { children: [
    /* @__PURE__ */ o(Fo, { className: n, style: a }),
    /* @__PURE__ */ m(
      kt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: zo, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(En, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function ci({ className: t, ...e }) {
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
function di({
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
        e && /* @__PURE__ */ o(kt.Close, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function ui({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    kt.Title,
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
function wi({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    kt.Description,
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
function en({ className: t, type: e, ...r }) {
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
function Ko({ className: t, ...e }) {
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
const $o = Ot(
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
function qo({
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
        className: g($o({ align: e }), t),
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
function Ve({ className: t, ...e }) {
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
function Je({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = gt(), s = mt.useCallback(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(Ko, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ o(qo, { children: /* @__PURE__ */ o(In, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Xe({ className: t, ...e }) {
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
function We({
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
function we({
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
function Be({
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
function me({
  className: t,
  children: e,
  "data-checked": r,
  ...n
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
      "data-checked": r,
      "aria-checked": r,
      ...n,
      children: [
        r !== void 0 && /* @__PURE__ */ o(
          Ue,
          {
            "aria-hidden": !0,
            className: g(r !== !0 && r !== "true" && "tw:opacity-0")
          }
        ),
        e
      ]
    }
  );
}
function Vo({ className: t, ...e }) {
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
const Jo = [
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
], Xo = (t) => {
  var e;
  return ((e = Jo[t]) == null ? void 0 : e.chapters) ?? -1;
}, Wo = at.allBookIds.filter(
  (t) => !at.isObsolete(at.bookIdToNumber(t))
);
function Zo(t) {
  const e = [], r = Math.min(t.length, at.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(at.bookNumberToId(n + 1));
  return e;
}
function R(t) {
  return `%scrollGroup_${t}%`;
}
const Yo = {
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
function Ze(t, e) {
  return Xo(at.bookIdToNumber(t));
}
function he(t, e, r) {
  const n = at.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = at.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
function fi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = he(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(Ze(s), 1),
      verseNum: 1
    };
}
function pi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < Ze(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = he(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function mi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = he(n, e, "previous");
  if (!i) return;
  const l = Math.max(Ze(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function hi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = he(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function gi(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const bi = (t, e, r, n, a) => {
  switch (t) {
    case Pt.OT:
      return e ?? "Old Testament";
    case Pt.NT:
      return r ?? "New Testament";
    case Pt.DC:
      return n ?? "Deuterocanon";
    case Pt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Ni = (t, e, r, n, a) => {
  switch (t) {
    case Pt.OT:
      return e ?? "OT";
    case Pt.NT:
      return r ?? "NT";
    case Pt.DC:
      return n ?? "DC";
    case Pt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function vi(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? at.bookIdToEnglishName(t);
}
function Qo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const yi = Object.fromEntries(
  Wo.map((t) => [t, at.bookIdToEnglishName(t)])
);
function xi(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = at.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function rn() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function nn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function on(t) {
  nn(document, rn()) || t();
}
function _r(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Tr(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function ta(t, e) {
  const [r] = P(rn), n = E(t);
  n.current = t;
  const a = E(e);
  return a.current = e, _(
    (s) => {
      var d, u;
      if ((d = n.current) == null || d.call(n, s), s.defaultPrevented) return;
      if (nn(document, r)) {
        s.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: i } = document;
      if (i && i !== document.body) return;
      const l = (u = a.current) == null ? void 0 : u.call(a);
      l && (l.focus({ preventScroll: !0 }), document.activeElement === l && s.preventDefault());
    },
    [r]
  );
}
const an = Symbol.for("platform-bible-react.window-blur-press");
function ea(t) {
  return Reflect.get(t, an) === !0;
}
function sn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = E(void 0), n = E(void 0), a = E(void 0);
  K(() => {
    const u = () => {
      const w = r.current;
      if (!w || w.dataset.state === "closed") return;
      const y = w.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, f = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(f, an, { value: !0 }), y.dispatchEvent(f);
    };
    return window.addEventListener("blur", u), () => window.removeEventListener("blur", u);
  }, []);
  const s = _(
    (u) => {
      if (r.current = u ?? void 0, u && u !== n.current && (n.current = u, a.current = _r(u) ?? Tr(u)), typeof t == "function") {
        const w = t(u);
        if (typeof w == "function")
          return () => {
            r.current = void 0, w();
          };
      } else t && (t.current = u);
    },
    [t]
  ), i = _(() => {
    var x;
    const u = n.current, w = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (u && _r(u)) ?? w ?? (u && Tr(u));
    return y != null && y.isConnected ? y : void 0;
  }, []), l = ta(
    e,
    i
  ), d = _(
    (u) => {
      l(u), r.current || (n.current = void 0, a.current = void 0);
    },
    [l]
  );
  return { ref: s, onCloseAutoFocus: d };
}
const Lr = `
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
function ra(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Qt(t, e) {
  const r = e ? `${Lr}, ${e}` : Lr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && ra(n)
  );
}
const Si = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let je = "keyboard", Ar = !1;
function ki() {
  Ar || typeof document > "u" || (Ar = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      ea(t) || (je = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      je = "keyboard";
    },
    !0
  ));
}
function Ci() {
  return je;
}
const ln = "data-quiet-focus";
function Ei(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(ln, ""), t.style.outline = "none"));
}
function Ii(t) {
  t && (t.removeAttribute(ln), t.style.removeProperty("outline"));
}
const _i = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function na({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    kn.Root,
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
const oa = Ot(
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
function Ye({
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
        oa({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Ti({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? He.Root : "div";
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
function cn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    na,
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
function dn() {
  const t = mt.createContext(null);
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return mt.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function Qe({ ...t }) {
  return /* @__PURE__ */ o(Yt.Root, { "data-slot": "popover", ...t });
}
function Ge({ ...t }) {
  return /* @__PURE__ */ o(Yt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: aa, usePortalContainer: sa } = dn(), Li = aa;
function tr({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: a,
  onCloseAutoFocus: s,
  ...i
}) {
  const l = gt(), d = sa(), u = sn({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Yt.Portal, { container: d, children: /* @__PURE__ */ o(
      Yt.Content,
      {
        "data-slot": "popover-content",
        ...u,
        align: e,
        sideOffset: r,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Zr, ...n },
        dir: l,
        ...i
      }
    ) })
  );
}
function ia({ ...t }) {
  return /* @__PURE__ */ o(Yt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Ai({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Di({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Mi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Tt({
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
function Ct({ ...t }) {
  return /* @__PURE__ */ o(Vt.Root, { "data-slot": "tooltip", ...t });
}
function Et({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Vt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? g(Yr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: la, usePortalContainer: ca } = dn(), Pi = la;
function It({
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
  const l = ca();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: l, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Ho, ...r },
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
const da = /^%[^%]*%$/;
function un(t) {
  return t !== void 0 && !da.test(t) && t.trim() !== "";
}
function nt(t, e) {
  return un(t) ? t : e;
}
function ua() {
  const [t, e] = P(!1), r = E(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const wn = Ln(void 0);
function ge() {
  const t = An(wn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const be = Ot("", {
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
function er({ variant: t = "default", ...e }) {
  const r = gt(), n = mt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(wn.Provider, { value: n, children: /* @__PURE__ */ o(et.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Oi({
  ...t
}) {
  return /* @__PURE__ */ o(et.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function rr({
  ...t
}) {
  return /* @__PURE__ */ o(et.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function nr({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  children: a,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: s,
  onCloseAutoFocus: i,
  ...l
}) {
  const d = gt(), u = sn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(et.Portal, { children: /* @__PURE__ */ o(
    et.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...u,
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
      style: { zIndex: Zr, ...n },
      ...l,
      children: /* @__PURE__ */ o("div", { dir: d, children: a })
    }
  ) });
}
function Ri({ ...t }) {
  return /* @__PURE__ */ o(et.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Bi({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = gt(), s = ge();
  return /* @__PURE__ */ o(
    et.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: g(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        be({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function Jt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = gt(), i = ge();
  return /* @__PURE__ */ m(
    et.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: g(
        // CUSTOM: Replaced tw:pe-8 tw:ps-1.5 with tw:pe-1.5 tw:ps-7 so the space kept for the
        // check indicator is on the leading side, matching MenubarCheckboxItem/MenubarRadioItem; the
        // item text then lines up with tw:data-inset:ps-7 labels and items
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        be({ variant: i.variant })
      ),
      checked: r,
      dir: s,
      ...a,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(Ue, {}) })
          }
        ),
        e
      ]
    }
  );
}
function wa({
  ...t
}) {
  return /* @__PURE__ */ o(et.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Dr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = gt(), s = ge();
  return /* @__PURE__ */ m(
    et.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: g(
        // CUSTOM: Replaced tw:pe-8 tw:ps-1.5 with tw:pe-1.5 tw:ps-7 so the space kept for the
        // check indicator is on the leading side, matching MenubarCheckboxItem/MenubarRadioItem; the
        // item text then lines up with tw:data-inset:ps-7 labels and items
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        be({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(Ue, {}) })
          }
        ),
        e
      ]
    }
  );
}
function or({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    et.Label,
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
function ar({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    et.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function ji({ className: t, ...e }) {
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
function Gi({ ...t }) {
  return /* @__PURE__ */ o(et.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function zi({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = ge(), s = gt();
  return /* @__PURE__ */ m(
    et.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        be({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(_n, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Tn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Hi({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = gt();
  return /* @__PURE__ */ o(
    et.SubContent,
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
      style: { zIndex: pe, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function Ui({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Cn.Root,
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
function Fi({
  className: t,
  ...e
}) {
  const r = gt();
  return /* @__PURE__ */ o(
    Me.Root,
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
function Ki({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Me.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Me.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const $i = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Mr = (t, e) => t[e] ?? e;
function fa({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Mr(n, "%cancelButton_tooltip%"), l = s ?? Mr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(Ye, { children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o($r, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(cn, {}),
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(qr, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function Ne() {
  return /Macintosh/i.test(navigator.userAgent);
}
function qi() {
  return /Windows/i.test(navigator.userAgent);
}
const pa = ["input", "select", "textarea", "button"], ma = ["button", "textbox"], Vi = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = E(null), [s, i] = P(void 0), [l, d] = P(void 0), u = _(
    (f) => {
      i(f);
      const v = t.find((C) => C.id === f);
      v && (e == null || e(v));
      const p = document.getElementById(f);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), w = _(
    (f) => {
      const v = t.find((p) => p.id === f);
      v && (d((p) => p === f ? void 0 : f), r == null || r(v));
    },
    [r, t]
  ), y = (f) => {
    if (!f) return !1;
    const v = f.tagName.toLowerCase();
    if (f.isContentEditable || pa.includes(v)) return !0;
    const p = f.getAttribute("role");
    if (p && ma.includes(p)) return !0;
    const C = f.getAttribute("tabindex");
    return C !== void 0 && C !== "-1";
  }, x = _(
    (f) => {
      var Y;
      const v = f.target, p = (L) => L ? document.getElementById(L) : void 0, C = p(l), U = p(s);
      if (!!(C && v && C.contains(v) && v !== C) && y(v)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !v.isContentEditable) {
          if (l) {
            f.preventDefault(), f.stopPropagation();
            const L = t.find((st) => st.id === l);
            L && u(L.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!C) return;
          const L = Array.from(
            C.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (L.length === 0) return;
          const st = L.findIndex((ht) => ht === v);
          if (st === -1) return;
          let ut;
          f.key === "ArrowDown" ? ut = Math.min(st + 1, L.length - 1) : ut = Math.max(st - 1, 0), ut !== st && (f.preventDefault(), f.stopPropagation(), (Y = L[ut]) == null || Y.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((L) => L.id === s);
      let O = k;
      switch (f.key) {
        case "ArrowDown":
          O = Math.min(k + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          O = Math.max(k - 1, 0), f.preventDefault();
          break;
        case "Home":
          O = 0, f.preventDefault();
          break;
        case "End":
          O = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const L = U;
          if (L) {
            const st = L.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ut = L.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), ht = st ?? ut;
            if (ht) {
              f.preventDefault(), ht.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (y(v) || (n == null || n(f.key), f.preventDefault()));
          return;
      }
      const z = t[O];
      z && u(z.id);
    },
    [t, u, s, l, w, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: u
  };
}, ha = Ot(
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
function fe({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? He.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ha({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function Ji({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function fn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function Xi({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = mt.useRef(null);
  mt.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), mt.useEffect(() => {
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
    if (l && fn(i, l)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (d = Qt(l)[0]) == null || d.focus();
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
function Wi({
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
function Zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Yi({ className: t, ...e }) {
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
function ga(t) {
  mt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Qt(t.current) : [], s = a.indexOf(document.activeElement), i = n.key === "ArrowRight" ? s + 1 : s - 1;
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
function ba(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Na(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Qi({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = mt.useRef(null);
  mt.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), ga(i);
  const l = mt.useMemo(
    () => i.current ? Qt(i.current) : [],
    [i]
  ), d = mt.useCallback(
    (w) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!fn(w, y)) {
        e == null || e(w);
        return;
      }
      const x = y.closest("table"), f = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Qt(x).filter(
          (C) => C.tagName === "TR"
        )
      ) : [], v = f.indexOf(y), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Na(f, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), ba(l, p, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const C = y.closest("table");
        C && C.focus();
      }
      e == null || e(w);
    },
    [i, l, e]
  ), u = mt.useCallback(
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
      onFocus: u,
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
function tl({ className: t, ...e }) {
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
function el({ className: t, ...e }) {
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
function rl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function va(t, e = !0) {
  const [r, n] = P(!1);
  return K(() => {
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
function ya({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = va(r, e);
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
function nl({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: u,
  isOpen: w = void 0,
  onOpenChange: y = void 0,
  isDisabled: x = !1,
  sortSelected: f = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: C = void 0,
  variant: U = "ghost",
  id: G
}) {
  const [W, k] = P(!1), O = E(null), z = _(
    (H) => {
      var rt;
      const it = (rt = t.find((wt) => wt.label === H)) == null ? void 0 : rt.value;
      it && r(
        e.includes(it) ? e.filter((wt) => wt !== it) : [...e, it]
      );
    },
    [t, e, r]
  ), Y = () => u || n, L = w ?? W, st = y ?? k, [ut, ht] = P(L), [Lt, J] = P(e);
  ut !== L && (ht(L), L && J(e));
  const Rt = pt(() => {
    if (!f) return t;
    const H = t.filter((rt) => rt.starred).sort((rt, wt) => rt.label.localeCompare(wt.label)), it = t.filter((rt) => !rt.starred).sort((rt, wt) => {
      const Dt = Lt.includes(rt.value), Bt = Lt.includes(wt.value);
      return Dt && !Bt ? -1 : !Dt && Bt ? 1 : rt.label.localeCompare(wt.label);
    });
    return [...H, ...it];
  }, [t, Lt, f]), Ut = () => {
    const H = t.map((it) => it.value);
    J(H), r(H);
  }, At = () => {
    J([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: C, children: /* @__PURE__ */ m(Qe, { open: L, onOpenChange: st, children: [
    /* @__PURE__ */ o(Ge, { asChild: !0, children: /* @__PURE__ */ m(
      Z,
      {
        variant: U,
        role: "combobox",
        "aria-expanded": L,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: x,
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: g(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: Y()
              }
            )
          ] }),
          /* @__PURE__ */ o(Vr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(tr, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(Ve, { children: [
      /* @__PURE__ */ o(
        Je,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: At, children: l })
      ] }),
      /* @__PURE__ */ o(ya, { isEnabled: v, scrollerRef: O, children: /* @__PURE__ */ m(Xe, { ref: O, children: [
        /* @__PURE__ */ o(We, { children: d }),
        /* @__PURE__ */ o(we, { children: Rt.map((H) => /* @__PURE__ */ m(
          me,
          {
            value: H.label,
            onSelect: z,
            "data-checked": e.includes(H.value),
            children: [
              H.starred && /* @__PURE__ */ o(Pn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: H.label }),
              H.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: H.secondaryLabel })
            ]
          },
          H.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function St(t) {
  return t.replace(/^\+/, "");
}
function xa(t, e) {
  if (!t || e === "") return !1;
  const r = St(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && St(n.marker).toLowerCase() === r
  );
}
function Sa(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = St(e).toLowerCase();
  return r === "passive" ? Er({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Er({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Zt(t) {
  return t.isComposing || t.keyCode === 229;
}
function ka(t) {
  return t === "hidden";
}
const pn = /^[a-z0-9+-]$/i;
function Ca(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && Ne()) && e !== "Dead") {
    if (pn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Ea = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ia = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function _a() {
  return [...Ea, ...Ia.filter((t) => pn.test(t))];
}
function ft(t) {
  t.preventDefault(), t.stopPropagation();
}
function Ta(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (Zt(t) || So.has(t.key))
    return "passed";
  const a = !Ne();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && ft(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return ft(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return ft(t), Sa(
      e.items.map((u) => ({ label: u.marker })),
      e.filter,
      // The host-driven mode, for every kind: all marker palettes are host-driven (the session
      // owns the query and the palette renders it read-only), so this commit must resolve against
      // the same list the host filtered. `'passive'` is that mode's name — a label PREFIX match,
      // mirroring PT9's marker dropdown — not containment. Ranking cmdk's way here instead would
      // commit an item the rendered list never offered.
      "passive"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return ft(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (ft(t), e.filter === "")
        return r.dismiss(), "ended";
      const w = St(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, w)) {
        const y = e.items.find(
          (x) => St(x.marker).toLowerCase() === w
        );
        return y && r.commitItem(y.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    ft(t);
    const d = St(e.filter).toLowerCase(), u = e.items.find(
      (w) => St(w.marker).toLowerCase() === d
    );
    return u && r.commitItem(u.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (ft(t), r.dismiss(), "ended") : (ft(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (ft(t), "continue") : (ft(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return ft(t), r.dismiss(), "ended";
  const s = Ca(t);
  return t.key === "Backspace" || s !== void 0 ? (ft(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (ft(t), "continue");
}
function La(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function mn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Aa(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Da(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: d,
    restoreSelectionIfLost: u,
    hasEditorChangedSinceFocus: w,
    focusEditor: y,
    applyItem: x,
    onShowError: f
  } = t, v = () => {
    u(), y();
  };
  a.current += 1;
  const p = a.current, C = () => a.current === p, U = { kind: r, token: p, filter: "", items: e };
  n && (U.isNoteMarker = n), s(U), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: _a(),
    onKey: (G) => l(G)
  }).then((G) => {
    var k;
    i(p);
    const W = G ?? ((k = U.itemToApplyOnClose) == null ? void 0 : k.marker);
    if (W !== void 0) {
      const O = (w == null ? void 0 : w()) ?? !1;
      v();
      const z = O ? void 0 : e.find((Y) => Y.marker === W);
      z && x(z);
    } else C() && v();
  }).catch((G) => {
    i(p), C() && v(), f(G);
  });
}
function Ma(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: l,
    hasEditorChangedSinceFocus: d
  } = e, u = r.current;
  if (!u) return "no-session";
  const w = (x) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    x();
  };
  return Ta(t, u, {
    update: (x) => a.update(x),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (x) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedMarker(x);
    }),
    commitTypedAndReopen: (x) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedMarker(x, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (x) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedCloser(x);
    }),
    commitItem: (x) => w(() => {
      var v;
      const f = u.items.find((p) => p.marker === x);
      if (f) {
        if (f.kind === "note") {
          u.itemToApplyOnClose = f;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(f, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && l(u.token), "routed";
}
function Pa({
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  K(() => {
    const n = r ?? document, a = () => {
      t() && e();
    };
    return n.addEventListener("compositionstart", a, { capture: !0 }), () => {
      n.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
function Oa({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  K(() => {
    const i = s ?? document, l = (d) => {
      var y, x, f;
      const u = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!u || d.target !== u) return;
      const w = (x = e.current) == null ? void 0 : x.getSelection();
      w ? r.current = w : (f = e.current) != null && f.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = mn(
        () => {
          var v;
          return (v = e.current) == null ? void 0 : v.getUsj();
        },
        () => {
          var v;
          return (v = e.current) == null ? void 0 : v.getSelection();
        }
      ));
    };
    return i.addEventListener("focusout", l), () => i.removeEventListener("focusout", l);
  }, [t, e, r, n, a, s]);
}
function Ra({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = E(void 0), a = _(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = _(
    (i) => {
      var l;
      La(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return K(
    () => () => {
      var i;
      (i = n.current) == null || i.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: s };
}
function Pr({ className: t, ...e }) {
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
function Ba({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const ja = /* @__PURE__ */ new Set([
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
function Ga(t) {
  const e = Xr(t, "");
  let r = 0;
  for (; r < e.length && ja.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = ko(t, r);
  return a ? [...n, a] : n;
}
function za(t) {
  const e = [];
  let r = "";
  return Xr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Ha(t) {
  const e = Ga(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: za(t), separator: "+" };
}
function Or({ hint: t }) {
  const { keycaps: e, separator: r } = Ha(t);
  return e.length === 1 ? /* @__PURE__ */ o(Pr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Ba, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Fr, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Pr, { children: n })
      ] }, a)
    )) })
  );
}
const ol = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Rr = (t, e) => t[e] ?? e;
function Ua({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = Ne(), u = Rr(a, "%undoButton_tooltip%"), w = Rr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(Ye, { children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": u,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(On, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        u,
        s && /* @__PURE__ */ m(xt, { children: [
          " ",
          /* @__PURE__ */ o(Or, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(cn, {}),
    e && /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(Rn, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(xt, { children: [
          " ",
          /* @__PURE__ */ o(Or, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Fa({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = E(null);
  return K(() => {
    var d;
    const s = Ne(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (u) => {
      var y, x, f, v;
      if (!i || document.activeElement !== i) return;
      const w = u.key.toLowerCase();
      if (s) {
        if (!u.metaKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((y = e.current) == null || y.undo())) : u.shiftKey && w === "z" && (u.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!u.ctrlKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || u.shiftKey && w === "z") && (u.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function Ka() {
  const t = E(void 0), e = E(new DOMRect()), r = E({
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
  return pt(() => ({ virtualRef: r, setSource: n }), [n]);
}
function $a(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function qa(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Va = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Ja({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = E(!1), i = E(null), l = E(null), d = E(!1), [u, w] = P(t), [y, x] = P(e), [f, v] = P(!1), p = E(!1), C = E(u);
  C.current = u;
  const U = E(y);
  U.current = y, K(() => {
    w(t);
  }, [t]), K(() => {
    y !== e && x(e);
  }, [e]);
  const G = (k) => {
    if (d.current = !1, v(k), !k) {
      const O = C.current, z = U.current;
      O !== "custom" || z ? (O !== t || z !== e) && (s.current = !0, r(O, z)) : (w(t), x(e));
    }
  }, W = (k) => {
    var O, z, Y, L;
    k.stopPropagation(), document.activeElement === l.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((O = i.current) == null || O.focus(), d.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((z = l.current) == null || z.focus(), d.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((Y = i.current) == null ? void 0 : Y.selectionStart) === 0 && ((L = l.current) == null || L.focus(), d.current = !1), u === "custom" && k.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ m(er, { open: f, onOpenChange: G, children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(rr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Va(t, n, e) }) }) }),
      /* @__PURE__ */ o(It, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      nr,
      {
        style: { zIndex: pe },
        onEscapeKeyDown: () => {
          C.current = t, U.current = e, w(t), x(e);
        },
        onCloseAutoFocus: (k) => {
          s.current && (s.current = !1, k.preventDefault(), on(a));
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: W,
        onMouseMove: () => {
          var k;
          d.current && ((k = i.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ o(or, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(ar, {}),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Pe })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Oe })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              ref: l,
              checked: u === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                p.current = u === "custom";
              },
              onClick: (k) => {
                var O;
                if (k.stopPropagation(), p.current && k.target !== i.current) {
                  G(!1);
                  return;
                }
                d.current = !0, (O = i.current) == null || O.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  en,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), w("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: y,
                    onKeyDown: (k) => {
                      k.key === "Enter" || k.key === "ArrowUp" || k.key === "ArrowDown" || k.key === "ArrowLeft" || k.key === "ArrowRight" || k.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (k) => x(k.target.value)
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
const Xa = (t, e) => t === "f" ? /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o(Ke, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o($e, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o(Fe, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Wa = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Co(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Za({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = E(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(er, { children: [
    /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(rr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Xa(t, r) }) }) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: Wa(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      nr,
      {
        style: { zIndex: pe },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), on(a));
        },
        children: [
          /* @__PURE__ */ o(or, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(ar, {}),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Fe, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ke, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o($e, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Br = '[aria-controls="editor-context-menu"]';
function Le(t) {
  return t ? t.matches(Br) ? !0 : !!t.querySelector(Br) : !1;
}
const al = Object.freeze([
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
function Ya({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Bn, { className: e, size: 16 });
}
function Qa({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(qr, { size: 16 })
    }
  );
}
function ue(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function jr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    me,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      value: ue(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(Qa, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Ya, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Vo, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ts({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = P(""), [l] = P(() => {
    const w = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
    return w ? ue(w) : void 0;
  }), [d, u] = pt(() => {
    const w = St(s.trim().toLowerCase());
    if (!w) {
      const f = e.filter((v) => !v.isDisallowed);
      return [f.length > 0 ? f : e, []];
    }
    const y = e.filter((f) => {
      var p;
      const v = (p = f.marker) == null ? void 0 : p.toLowerCase();
      return f.isDisallowed ? v === w : v == null ? void 0 : v.includes(w);
    }), x = e.filter(
      (f) => f.title.toLowerCase().includes(w) && !y.includes(f)
    );
    return [y, x];
  }, [s, e]);
  return /* @__PURE__ */ m(Ve, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: l, children: [
    /* @__PURE__ */ o(
      Je,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (w) => i(w),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(Xe, { children: [
      /* @__PURE__ */ o(We, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(we, { children: d.map((w) => /* @__PURE__ */ o(
        jr,
        {
          item: w,
          localizedStrings: t
        },
        ue(w)
      )) }),
      u.length > 0 && /* @__PURE__ */ m(xt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Be, { alwaysRender: !0 }),
        /* @__PURE__ */ o(we, { children: u.map((w) => /* @__PURE__ */ o(
          jr,
          {
            item: w,
            localizedStrings: t
          },
          ue(w)
        )) })
      ] })
    ] })
  ] });
}
function es(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = le[n], i = s != null && s.children ? s : a && le[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((u) => ({
        marker: u,
        title: r[le[u].description] ?? le[u].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(u), e();
        }
      }))
    );
  }), l.sort((d, u) => (d.marker ?? d.title).localeCompare(u.marker ?? u.title));
}
function Gr(t) {
  if (!t || !qt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function rs(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function ns(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function os(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function as(t, e) {
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
function ss(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function is(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const ls = 300, Ae = "*", cs = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function sl({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d,
  parentEditorRef: u,
  inline: w = !1,
  ref: y,
  initialCaretPosition: x,
  markerPalette: f,
  onNoteEdit: v
}) {
  var xr;
  const p = E(null), C = E(null), U = E(null), G = E(s);
  K(() => {
    G.current = s;
  }, [s]);
  const W = E(x);
  K(() => {
    W.current = x;
  }, [x]);
  const k = _(() => {
    var b, N;
    const c = W.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (N = p.current) == null || N.selectNote(0);
  }, []);
  ie(() => {
    if (w || !U.current) return;
    const c = parseFloat(getComputedStyle(U.current).width);
    c > 0 && (U.current.style.width = `${c}px`);
  }, [w]);
  const [O, z] = P("generated"), [Y, L] = P("generated"), [st, ut] = P(Ae), [ht, Lt] = P(Ae), [J, Rt] = P("f"), [Ut, At] = P(!1), [H, it] = P(!0), [rt, wt] = P(!1), Dt = E(!1), Bt = E(""), h = E(!1), A = E(void 0), F = E([]), Q = E([]), $ = E(void 0), X = E(void 0), cr = _(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (F.current = [...F.current, ...c], $.current = void 0);
  }, []), dr = _(
    (c, b) => {
      var I, B;
      if (!c) return;
      const N = Gr(c), S = Gr(b);
      if (!N && S) {
        $.current = {
          text: F.current,
          closedNoteOp: c,
          openNoteOp: b
        }, F.current = [];
        return;
      }
      const T = $.current;
      T && (N && !S && Gt(c, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((B = (I = p.current) == null ? void 0 : I.getOpsAfterNote(0)) != null && B.length) ? (F.current = T.text, $.current = void 0) : Gt(b, T.openNoteOp) || ($.current = void 0));
    },
    []
  ), [bt, ee] = P(!1), ve = Ka(), [ur, gn] = P(), wr = E(null), Nt = E(
    void 0
  ), bn = E(0), fr = E(f);
  K(() => {
    fr.current = f;
  }, [f]), K(
    () => () => {
      var c;
      Nt.current && (Nt.current = void 0, (c = fr.current) == null || c.dismiss());
    },
    []
  );
  const re = E(void 0), ye = E(void 0), ne = _(
    () => Aa(
      ye.current,
      mn(
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
  ), { setSession: pr, clearSessionIfCurrent: oe } = Ra({
    sessionRef: Nt,
    editorRef: p,
    baselineRef: ye
  }), Ft = _(() => {
    var b, N, S, T;
    if ((b = p.current) != null && b.getSelection() || (N = p.current) != null && N.getSelectedParaMarker()) return;
    const c = re.current;
    c ? (S = p.current) == null || S.setSelection(c) : (T = p.current) == null || T.selectNote(0);
  }, []), ae = _(() => {
    var c;
    Ft(), (c = p.current) == null || c.focus();
  }, [Ft]), _t = pt(
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
        ...i.view ?? vo(),
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
  ), xe = pt(
    () => es(
      p,
      () => ee(!1),
      d,
      ur,
      J
    ),
    [d, ur, J]
  );
  K(() => {
    var c;
    bt || (c = p.current) == null || c.focus();
  }, [J, bt]);
  const Mt = _(() => {
    var S, T, I;
    const c = (S = C.current) == null ? void 0 : S.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), N = (I = (T = C.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : I.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), jt = _(
    (c = !1) => {
      var N, S, T, I, B;
      v == null || v();
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b) && (r == null || r([b]), c && u && G.current)) {
        const q = [
          ...F.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], tt = Q.current, D = !Gt(q, tt);
        if (w && !D && Gt(b, A.current))
          return;
        A.current = b;
        const V = [b];
        D && (tt.length > 0 && as(
          ((I = u.current) == null ? void 0 : I.getOpsAfterNote(G.current)) ?? [],
          tt
        ) && V.push({ delete: os(tt) }), V.push(...q), Q.current = q), (B = u.current) == null || B.replaceEmbedUpdate(G.current, V);
      }
    },
    [w, r, v, u]
  ), Se = _(
    (c) => {
      var N, S, T;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (S = p.current) == null || S.applyUpdate([c, { delete: 1 }]), b && ((T = p.current) == null || T.setSelection(b)), ae();
    },
    [ae]
  ), mr = _(
    (c, b) => {
      var T, I, B;
      Nt.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const N = (B = (I = p.current) == null ? void 0 : I.getNoteOps(0)) == null ? void 0 : B.at(0);
      if (!N || !qt("note", N) || !N.insert.note) return;
      let S;
      c === "custom" ? S = b : c === "generated" ? S = Pe : S = Oe, N.insert.note.caller !== S && (N.insert.note.caller = S, Se(N));
    },
    [Se]
  ), Kt = E(void 0), ke = E(jt);
  K(() => {
    ke.current = jt;
  }, [jt]);
  const $t = _(() => {
    Kt.current !== void 0 && (clearTimeout(Kt.current), Kt.current = void 0);
  }, []), vt = _(() => {
    Kt.current !== void 0 && ($t(), ke.current(!0));
  }, [$t]), hr = _(() => {
    $t(), Kt.current = setTimeout(() => {
      Kt.current = void 0, ke.current(!0);
    }, ls);
  }, [$t]);
  K(() => {
    var T, I;
    let c, b, N;
    Dt.current = !1, h.current = !1, re.current = void 0, it(!0);
    const S = e == null ? void 0 : e.at(0);
    if (A.current = S, F.current = [], Q.current = [], $.current = void 0, X.current = void 0, S && qt("note", S)) {
      const B = (T = S.insert.note) == null ? void 0 : T.caller;
      let q = "custom";
      B === Pe ? q = "generated" : B === Oe && (q = "hidden");
      const tt = q === "custom" && B !== void 0 ? B : Ae;
      ut(tt), Lt(tt), z(q), L(q), Rt(((I = S.insert.note) == null ? void 0 : I.style) ?? "f"), c = setTimeout(() => {
        var V, M, lt, ct;
        const D = (M = (V = p.current) == null ? void 0 : V.getNoteOps(0)) == null ? void 0 : M.at(0);
        (lt = p.current) == null || lt.applyUpdate(D ? [S, { delete: 1 }] : [S]), k(), (ct = p.current) == null || ct.focus(), b = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var yt;
            Mt() || (k(), (yt = p.current) == null || yt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      vt(), W.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, vt, Mt, k]), ie(() => () => vt(), [vt]);
  const gr = _(() => {
    var c;
    h.current && (Nt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), vt());
  }, [vt]);
  Dn(
    y,
    () => ({
      flushPendingEdits: gr,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = U.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [gr]
  );
  const Ce = _(() => {
    var c, b;
    if (!Nt.current) {
      const N = (c = C.current) == null ? void 0 : c.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    w ? vt() : ($t(), jt(!0)), n();
  }, [$t, vt, w, n, jt]), Ee = E(Ce);
  ie(() => {
    Ee.current = Ce;
  });
  const Ie = E({ book: a.book, chapterNum: a.chapterNum });
  ie(() => {
    (Ie.current.book !== a.book || Ie.current.chapterNum !== a.chapterNum) && (Ie.current = { book: a.book, chapterNum: a.chapterNum }, Ee.current());
  }, [a.book, a.chapterNum]);
  const Nn = () => {
    var I;
    const c = p.current, b = rs(c == null ? void 0 : c.getUsj());
    if (!c || !b) return;
    const N = ((I = C.current) == null ? void 0 : I.ownerDocument) ?? document, { activeElement: S } = N, T = c.getSelection() ?? re.current;
    c.setSelection(b);
    try {
      c.copy();
    } finally {
      T ? c.setSelection(T) : c.selectNote(0), c.getSelection(), N.activeElement !== S && (S instanceof HTMLElement && S !== N.body ? S.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
    }
  }, vn = _(
    (c, b) => {
      v == null || v(), z(c), ut(b), mr(c, b), w && vt();
    },
    [mr, vt, w, v]
  ), yn = (c) => {
    var N, S, T, I, B;
    Rt(c), Nt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (T = (S = p.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const q = (B = (I = b.insert.note) == null ? void 0 : I.contents) == null ? void 0 : B.ops;
      J !== "x" && c === "x" ? q == null || q.forEach((tt) => ss(tt)) : J === "x" && c !== "x" && (q == null || q.forEach((tt) => is(tt))), Se(b), w && vt();
    }
  }, xn = (c) => {
    gn(c.contextMarker), wt(c.canRedo);
  }, Sn = _(
    (c) => {
      var N, S, T, I, B, q, tt;
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var M;
          (M = p.current) == null || M.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const D = (T = b.insert.note) == null ? void 0 : T.style, V = (B = (I = b.insert.note) == null ? void 0 : I.contents) == null ? void 0 : B.ops;
        if (D || At(!1), At(
          D === "x" ? !!(V != null && V.every((M) => {
            var ct, yt;
            if (!((ct = M.attributes) != null && ct.char)) return !0;
            const lt = ((yt = M.attributes) == null ? void 0 : yt.char).style;
            return lt === "xt" || lt === "xo" || lt === "xq";
          })) : !!(V != null && V.every((M) => {
            var ct, yt;
            if (!((ct = M.attributes) != null && ct.char)) return !0;
            const lt = ((yt = M.attributes) == null ? void 0 : yt.char).style;
            return lt === "ft" || lt === "fr" || lt === "fq";
          }))
        ), !Dt.current) {
          Dt.current = !0, Bt.current = JSON.stringify(b), X.current = b, it(!0);
          return;
        }
        h.current = !0, dr(X.current, b), X.current = b, (tt = (q = p.current) == null ? void 0 : q.getOpsAfterNote(0)) != null && tt.length && setTimeout(cr, 0), it(JSON.stringify(b) === Bt.current), jt(), w && hr();
      } else
        At(!1), it(!0);
    },
    [
      w,
      jt,
      hr,
      dr,
      cr
    ]
  ), _e = _(() => {
    const c = window.getSelection();
    if (!xe.length || !c || c.rangeCount === 0)
      return !1;
    const b = C.current;
    if (!b) return !1;
    const N = c.getRangeAt(0).cloneRange();
    return ve.setSource({
      measure: () => {
        const S = $a(N);
        return S && qa(S);
      },
      contextElement: b
    }), ee(!0), !0;
  }, [xe, ve]), Te = E(() => {
  }), br = _(
    (c, b, N) => {
      const { anchorRect: S } = c;
      if (!f || !S) return;
      const { hasTextSelection: T } = N;
      Da({
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
        isNoteMarker: (I) => xa(_t.styleInfo ?? Ir, I),
        sessionCounterRef: bn,
        setSession: pr,
        clearSessionIfCurrent: oe,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (I) => Te.current(I),
        show: (I) => f.show({
          items: b.map(ns),
          anchor: S,
          keyForwarding: I
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Ft,
        hasEditorChangedSinceFocus: ne,
        focusEditor: () => {
          var I;
          return (I = p.current) == null ? void 0 : I.focus();
        },
        applyItem: (I) => {
          var B;
          return (B = p.current) == null ? void 0 : B.applyMarkerMenuSelection(I, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (I) => {
          (!Eo(I) || I.code !== Io) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${_o(I)}`
          );
        }
      });
    },
    [
      f,
      Ft,
      ne,
      _t.styleInfo,
      pr,
      oe
    ]
  ), se = _(() => {
    var N;
    const c = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = yo(_t.styleInfo ?? Ir, c);
    return b.length === 0 ? !1 : (br(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [br, _t.styleInfo]);
  Pa({
    isSessionOpen: _(() => !!Nt.current, []),
    dismiss: _(() => f == null ? void 0 : f.dismiss(), [f])
  });
  const Nr = _(
    (c) => {
      if (!f) return;
      Ma(c, {
        sessionRef: Nt,
        editorRef: p,
        palette: f,
        restoreCaret: Ft,
        reopenAtCaret: se,
        clearSessionIfCurrent: oe,
        hasEditorChangedSinceFocus: ne
      }) === "no-session" && f.dismiss();
    },
    [
      f,
      se,
      Ft,
      oe,
      ne
    ]
  );
  K(() => {
    Te.current = Nr;
  }, [Nr]), Oa({
    containerRef: C,
    editorRef: p,
    selectionRef: re,
    baselineRef: ye,
    isSessionOpen: _(() => !!Nt.current, [])
  }), K(() => {
    const c = () => {
      bt && ee(!1);
    };
    return window.addEventListener("click", c), window.addEventListener("blur", c), () => {
      window.removeEventListener("click", c), window.removeEventListener("blur", c);
    };
  }, [bt]), K(() => {
    var c;
    bt && ((c = wr.current) == null || c.focus());
  }, [bt]), K(() => {
    var q, tt;
    const c = () => {
      var D;
      return ((D = C.current) == null ? void 0 : D.querySelector(".editor-input")) ?? void 0;
    };
    if (((q = _t.view) == null ? void 0 : q.markerMode) === "editable") {
      const D = (M) => {
        var yt, Sr, kr, Cr;
        if (Zt(M)) return;
        const lt = Nt.current, ct = c();
        if (!(!ct || document.activeElement !== ct)) {
          if (lt && f) {
            Te.current(M);
            return;
          }
          if (Le(C.current)) {
            M.key === l && (M.preventDefault(), M.stopPropagation());
            return;
          }
          if (M.key === "Enter" && !Mt()) {
            M.preventDefault(), M.stopPropagation(), (yt = p.current) == null || yt.selectNote(0), (Sr = p.current) == null || Sr.focus();
            return;
          }
          if (f && M.key === l) {
            if (!Mt()) {
              M.preventDefault(), M.stopPropagation(), (kr = p.current) == null || kr.selectNote(0), (Cr = p.current) == null || Cr.focus();
              return;
            }
            se() && (M.preventDefault(), M.stopPropagation());
          }
        }
      }, V = () => {
        var lt, ct;
        const M = c();
        !M || document.activeElement !== M || Mt() || ((lt = p.current) == null || lt.selectNote(0), (ct = p.current) == null || ct.focus());
      };
      return document.addEventListener("keydown", D, { capture: !0 }), document.addEventListener("paste", V, { capture: !0 }), () => {
        document.removeEventListener("keydown", D, { capture: !0 }), document.removeEventListener("paste", V, { capture: !0 });
      };
    }
    const b = () => {
      const D = c();
      return !D || document.activeElement !== D ? !1 : !Le(C.current);
    }, N = (D) => {
      D.key !== "Enter" || Zt(D) || b() && (D.preventDefault(), D.stopPropagation());
    }, S = (D) => {
      D.inputType !== "insertParagraph" && D.inputType !== "insertLineBreak" || b() && (D.preventDefault(), D.stopPropagation());
    }, T = (D) => {
      if (D.key !== l || bt || Zt(D)) return;
      const V = c();
      !V || document.activeElement !== V || (Le(C.current) || _e()) && (D.preventDefault(), D.stopPropagation());
    }, I = ka((tt = _t.view) == null ? void 0 : tt.markerMode), B = (D) => {
      const V = c();
      !bt && V && document.activeElement === V && D.key === l ? (D.preventDefault(), _e()) : bt && D.key === "Escape" && (D.preventDefault(), ee(!1));
    };
    return document.addEventListener("keydown", B), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), I && document.addEventListener("keydown", T, { capture: !0 }), () => {
      I && document.removeEventListener("keydown", T, { capture: !0 }), document.removeEventListener("keydown", B), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    bt,
    _e,
    l,
    (xr = _t.view) == null ? void 0 : xr.markerMode,
    _t.styleInfo,
    f,
    se,
    Mt
  ]), K(() => {
    const c = U.current;
    if (!w || !c) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || Zt(N) || (N.preventDefault(), N.stopPropagation(), Ee.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [w]), K(() => {
    const c = () => {
      var S, T, I;
      const b = ((S = C.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Mt() || ((T = p.current) == null || T.selectNote(0), (I = p.current) == null || I.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [Mt]);
  const vr = d["%footnoteEditor_copyButton_tooltip%"], yr = /* @__PURE__ */ o(
    Ua,
    {
      onUndoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.undo();
      },
      onRedoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.redo();
      },
      canUndo: !H,
      canRedo: rt,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ m(xt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: U,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                Za,
                {
                  isTypeSwitchable: Ut,
                  noteType: J,
                  handleNoteTypeChange: yn,
                  localizedStrings: d,
                  focusNoteText: ae
                }
              ),
              /* @__PURE__ */ o(
                Ja,
                {
                  callerType: O,
                  customCaller: st,
                  updateCaller: vn,
                  localizedStrings: d,
                  focusNoteText: ae
                }
              ),
              w && yr
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(Ye, { children: [
              yr,
              /* @__PURE__ */ o(
                fa,
                {
                  onCancelClick: n,
                  onAcceptClick: Ce,
                  canAccept: !H || Y !== O || O === "custom" && st !== ht,
                  localizedStrings: d,
                  acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ m(
            "div",
            {
              ref: C,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  Fa,
                  {
                    editorRef: p,
                    canUndo: !H,
                    canRedo: rt,
                    children: /* @__PURE__ */ o(
                      xo,
                      {
                        options: _t,
                        onStateChange: xn,
                        onUsjChange: Sn,
                        defaultUsj: cs,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(Tt, { children: /* @__PURE__ */ m(Ct, { children: [
                  /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
                    Z,
                    {
                      "aria-label": vr,
                      onClick: Nn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(jn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: vr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(Qe, { open: bt, children: [
      /* @__PURE__ */ o(ia, { virtualRef: ve.virtualRef }),
      /* @__PURE__ */ o(
        tr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            ts,
            {
              markerMenuItems: xe,
              localizedStrings: d,
              searchRef: wr
            }
          )
        }
      )
    ] })
  ] });
}
const ds = {
  "refresh-cw": fo,
  download: wo,
  house: uo,
  "book-a": co,
  settings: lo,
  "circle-question-mark": io,
  "external-link": so,
  users: ao,
  "book-copy": oo,
  pencil: no,
  eye: ro,
  "zoom-in": eo,
  "zoom-out": to,
  scan: Qn,
  "file-text": Yn,
  "panel-bottom": Zn,
  "message-square-plus": Wn,
  "square-function": Ke,
  "square-x": Fe,
  "square-sigma": $e,
  book: Xn,
  "book-marked": Jn,
  "book-open": Vn,
  library: qn,
  search: Jr,
  "message-square": $n,
  "circle-check-big": Kn,
  "clipboard-check": Fn,
  "clipboard-copy": Un,
  sparkles: Hn,
  "undo-2": zn,
  "redo-2": Gn
}, sr = ds, il = Object.keys(sr);
function us(t) {
  return t !== void 0 && Object.hasOwn(sr, t);
}
function ws(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = dt(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function zr(t, e, r) {
  const n = dt(e);
  return t.some(
    (a) => dt(a.projectId) === n && a.scrollGroupId === r
  );
}
function De(t) {
  const e = ws(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : dt(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(dt(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: a !== void 0 && a === dt(s.id),
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
    const s = e.get(dt(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: zr(r, a.id, void 0),
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
        isSelected: zr(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = dt(a.projectId);
    if (n.some(
      (l) => dt(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => dt(l.id) === s);
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
const ir = "Selected", lr = "Unselected";
function Hr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = To(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function ze(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function fs(t) {
  const e = t.filter(Hr).sort(zt), r = t.filter((a) => !Hr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function ps(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var u;
    const d = (u = e.getSectionHeading) == null ? void 0 : u.call(
      e,
      i,
      l.map((w) => w.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? ir : lr;
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
function ms(t, e) {
  if (e.id === "openTabs") return fs(t);
  if (e.id === "selection") return ps(t, e);
  if (!e.getGroupKey) return ze(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const d = a(l.project);
    if (d === void 0 || d === "") {
      n.push(l);
      return;
    }
    const u = r.get(d);
    u ? u.push(l) : r.set(d, [l]);
  });
  const s = [...r.entries()].map(([l, d]) => {
    var y;
    const u = [...d].sort(
      (x, f) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, f.project)) || zt(x, f);
      }
    ), w = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      l,
      u.map((x) => x.project)
    )) ?? l;
    return { key: l, heading: w, rows: u };
  });
  s.sort((l, d) => l.key === e.priorityKey ? -1 : d.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: d.key, heading: d.heading }
  ) : l.heading.localeCompare(d.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: l, heading: d, rows: u }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: d,
    rows: u,
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
const ll = [
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
  if (!(typeof r != "string" || !un(r)))
    return r;
}
const ce = "recent", hs = "other";
function hn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function gs(t) {
  const e = t ?? {};
  return [
    hn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? ce : hs;
      },
      getSectionHeading: (r) => r === ce ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === ce ? -1 : n.key === ce ? 1 : 0
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
const cl = gs();
function bs(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? ir : e.unselectedSectionHeading ?? lr
  };
}
function dl(t) {
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
function ul(t) {
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
const Ns = 100, ot = {
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
  autoSelectionSelectedSectionHeading: ir,
  autoSelectionUnselectedSectionHeading: lr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function vs(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : nt(e.ariaLabel, ot.ariaLabel),
    buttonPlaceholder: nt(
      e.buttonPlaceholder,
      ot.buttonPlaceholder
    ),
    commandEmptyMessage: nt(
      e.commandEmptyMessage,
      ot.commandEmptyMessage
    ),
    searchPlaceholder: nt(
      e.searchPlaceholder,
      ot.searchPlaceholder
    ),
    groupByAriaLabel: nt(
      e.groupByAriaLabel,
      ot.groupByAriaLabel
    ),
    groupSectionLabel: nt(
      e.groupSectionLabel,
      ot.groupSectionLabel
    ),
    groupByNone: nt(
      e.groupByNone,
      ot.groupByNone
    ),
    openTabsSectionHeading: nt(
      e.openTabsSectionHeading,
      ot.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: nt(
      e.otherProjectsSectionHeading,
      ot.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: nt(
      e.autoOpenTabsGroupingLabel,
      ot.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: nt(
      e.autoSelectionGroupingLabel,
      ot.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: nt(
      e.autoSelectionSelectedSectionHeading,
      ot.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: nt(
      e.autoSelectionUnselectedSectionHeading,
      ot.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: nt(
      e.boundButClosedTooltip,
      ot.boundButClosedTooltip
    ),
    openButtonLabel: nt(
      e.openButtonLabel,
      ot.openButtonLabel
    ),
    clearAll: nt(e.clearAll, ot.clearAll)
  };
}
function wl(t) {
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
function te(t) {
  return Yo[Lo(t)] ?? String(t);
}
const Ur = "platform.footerAction", ys = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function xs({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = te(t);
  return e ? /* @__PURE__ */ o(
    fe,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ys,
      children: r
    }
  ) : /* @__PURE__ */ o(fe, { variant: "secondary", children: r });
}
function Ss({
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
    open: u,
    onPointerEnter: w,
    onPointerLeave: y
  } = ua(), [x, f] = P(!1), v = Mn(), p = t.isDisabled && !!t.disabledReason, C = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, U = u || x, G = _(() => {
    if (C) {
      f(!0);
      return;
    }
    w();
  }, [C, w]), W = _(() => {
    f(!1), y();
  }, [y]);
  let k;
  e === "project" ? t.openGroups.length > 0 && (k = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((L) => /* @__PURE__ */ o(fe, { variant: "secondary", children: te(L) }, L)) })) : t.scrollGroupId !== void 0 && (k = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      xs,
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
        onClick: (L) => {
          L.stopPropagation(), a(t);
        },
        onMouseDown: (L) => L.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(mo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const O = /* @__PURE__ */ m(
    me,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      "data-checked": t.isSelected,
      onPointerEnter: G,
      onPointerLeave: W,
      ...p && { "aria-describedby": v },
      className: g(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Ao(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        k,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), z = t.scrollGroupId !== void 0 ? te(t.scrollGroupId) : void 0, Y = t.isBoundButClosed && z ? r.boundButClosedTooltip.replace("{group}", z) : void 0;
  return /* @__PURE__ */ m(Ct, { open: U, delayDuration: 400, children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: O }),
    /* @__PURE__ */ m(
      It,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Wr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && z && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              z,
              ")"
            ] })
          ] }),
          Y && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: Y }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function ks({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ m(er, { children: [
    /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(rr, { asChild: !0, children: /* @__PURE__ */ o(
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
          children: /* @__PURE__ */ o(po, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(It, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      nr,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: pe },
        children: [
          /* @__PURE__ */ o(or, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(wa, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Dr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(ar, {}),
            t.map((s) => /* @__PURE__ */ o(Dr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Cs(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function fl(t) {
  const [e, r] = P(!1), [n, a] = P(""), s = pt(() => vs(t.localizedStrings), [t.localizedStrings]), i = pt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(hn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      bs({
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
  ]), [l, d] = P(void 0), u = pt(
    () => Cs(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = l ?? u, y = E(null), [x, f] = P(void 0), v = _((h) => {
    r(h), h || (a(""), f(void 0));
  }, []);
  K(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const A = y.current;
      A && A.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = pt(() => t.mode === "project" ? De({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? De({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : De({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), C = pt(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (A) => A.shortName.toLowerCase().includes(h) || (A.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), U = pt(
    () => new Map(t.projects.map((h) => [dt(h.id), h])),
    [t.projects]
  ), G = _(
    (h) => h === void 0 ? void 0 : U.get(dt(h)),
    [U]
  ), { renderProjectIndicator: W } = t, k = _(
    (h) => W ? W(h.project) : void 0,
    [W]
  ), O = !!W, z = !!t.footerAction && C.length === 0, Y = pt(() => {
    if (w === Xt) return ze(C);
    const h = i.find((A) => A.id === w);
    return h ? ms(C, h) : ze(C);
  }, [C, w, i]), L = (h) => {
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, st = (h) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: h.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const A = t.selection.pairs, F = dt(h.projectId), Q = (X) => dt(X.projectId) === F && X.scrollGroupId === h.scrollGroupId, $ = A.some(Q) ? A.filter((X) => !Q(X)) : [
          ...A.filter((X) => !Q(X)),
          { projectId: h.projectId, scrollGroupId: h.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: $ });
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
        const A = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: h.projectId, scrollGroupId: A }), t.onOpenProjectInGroup(h.projectId, A), r(!1);
      }
    }
  }, ut = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, ht = t.mode === "project" ? t.renderTriggerLabel : void 0, Lt = t.mode === "project" ? t.triggerLabelFormat : void 0, J = pt(() => {
    switch (t.mode) {
      case "project": {
        const h = G(t.selection.projectId);
        if (ht)
          return { node: ht(h), title: "", hasSelection: !!h };
        let A = h ? h.shortName : s.buttonPlaceholder;
        return h && Lt === "shortNameAndFullName" && (A = Wr(h)), { node: A, title: A, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const A = [];
        if (h.forEach(($) => {
          const X = G($.projectId);
          X && A.push({ project: X, scrollGroupId: $.scrollGroupId });
        }), A.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const F = A.map(
          ({ project: $, scrollGroupId: X }) => X === void 0 ? $.shortName : `${$.shortName} (${te(X)})`
        ).join(", "), Q = A.length.toString();
        return {
          node: /* @__PURE__ */ m(xt, { children: [
            /* @__PURE__ */ o(fe, { variant: "muted", className: "tw:shrink-0", children: Q }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: F })
          ] }),
          title: `${Q} ${F}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const h = G(t.selection.projectId);
        if (!h) {
          const Q = s.buttonPlaceholder;
          return { node: Q, title: Q, hasSelection: !1 };
        }
        const A = t.selection.scrollGroupId;
        if (A === void 0)
          return { node: h.shortName, title: h.shortName, hasSelection: !0 };
        const F = te(A);
        return {
          node: `${h.shortName} · ${F}`,
          title: `${h.shortName} · ${F}`,
          accessibleTitle: `${h.shortName}, ${F}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    G,
    t.selection,
    ht,
    Lt,
    s.buttonPlaceholder
  ]), Rt = E(null), [Ut, At] = P(!1);
  K(() => {
    const h = Rt.current;
    if (!h) return;
    const A = (Q) => {
      At(Q < Ns);
    };
    if (A(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const F = new ResizeObserver((Q) => {
      Q.forEach(($) => {
        const [X] = $.borderBoxSize;
        A(X ? X.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return F.observe(h, { box: "border-box" }), () => F.disconnect();
  }, []);
  let H;
  t.isLoading ? H = /* @__PURE__ */ o(ho, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? H = void 0 : t.mode === "project-multi" ? H = /* @__PURE__ */ o(Vr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : H = /* @__PURE__ */ o(go, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const it = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? L : void 0, rt = s.ariaLabel && J.hasSelection && J.title ? `${s.ariaLabel}: ${J.accessibleTitle ?? J.title}` : s.ariaLabel || void 0, wt = /* @__PURE__ */ m(
    Z,
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": rt,
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
        H
      ]
    }
  ), Dt = J.title ? /* @__PURE__ */ o(Tt, { delayDuration: 400, children: /* @__PURE__ */ m(Ct, { children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(Ge, { asChild: !0, children: wt }) }),
    /* @__PURE__ */ o(It, { dir: "auto", children: J.title })
  ] }) }) : /* @__PURE__ */ o(Ge, { asChild: !0, children: wt }), Bt = i.length > 1;
  return /* @__PURE__ */ m(Qe, { open: e, onOpenChange: v, children: [
    Dt,
    /* @__PURE__ */ o(
      tr,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(Tt, { delayDuration: 400, children: /* @__PURE__ */ m(
          Ve,
          {
            shouldFilter: !1,
            value: z ? x ?? Ur : void 0,
            onValueChange: f,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Je,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  ks,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: ut, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Xe, { children: [
                /* @__PURE__ */ o(We, { children: s.commandEmptyMessage }),
                Y.map((h, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Fr,
                    {
                      children: [
                        /* @__PURE__ */ o(we, { heading: Es(h, s), children: h.rows.map((F) => /* @__PURE__ */ o(
                          Ss,
                          {
                            row: F,
                            mode: t.mode,
                            strings: s,
                            onClick: st,
                            onOpen: it,
                            selectedRowRef: y,
                            indicator: k(F),
                            reserveIndicatorSlot: O
                          },
                          F.rowKey
                        )) }),
                        A < Y.length - 1 && /* @__PURE__ */ o(Be, { alwaysRender: !0 })
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
                  C.length > 0 && /* @__PURE__ */ o(
                    Be,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    me,
                    {
                      forceMount: !0,
                      value: Ur,
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
function Es(t, e) {
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
const Is = Kr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = gt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            Jr,
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            en,
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
              onChange: (u) => e(u.target.value),
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
                /* @__PURE__ */ o($r, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Is.displayName = "SearchBar";
const _s = 5;
function pl(t) {
  return Zo(t).filter(
    (e) => !at.isObsolete(at.bookIdToNumber(e))
  );
}
function Ts(t, e) {
  return t.filter((r) => {
    try {
      return Do(r) === e;
    } catch {
      return !1;
    }
  });
}
const ml = (t, e, r) => Ts(t, e).every((n) => r.includes(n));
function Ls(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => at.bookIdToNumber(n) > 0).sort((n, a) => at.bookIdToNumber(n) - at.bookIdToNumber(a)).map((n) => Qo(n, e));
}
function hl(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = Ls(t, n);
  if (i.length !== 0)
    return i.length <= _s ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function gl({ name: t, className: e }) {
  const r = us(t) ? sr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function bl({ message: t, id: e, className: r }) {
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
function As({ className: t, ...e }) {
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
function Ds({ className: t, ...e }) {
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
const Ms = Ot(
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
function Ps({
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
        Ms({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Nl({ className: t, ...e }) {
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
function Os({ className: t, ...e }) {
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
function Rs({ className: t, ...e }) {
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
function vl({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(As, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Ds, { children: [
      /* @__PURE__ */ o(Ps, { variant: "icon", children: n ?? /* @__PURE__ */ o(bo, {}) }),
      /* @__PURE__ */ o(Os, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Rs, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const Bs = Kr(({ className: t, ...e }, r) => /* @__PURE__ */ o(No, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
Bs.displayName = "Spinner";
const js = Ot(
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
function yl({
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
        js({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function xl({ className: t, ...e }) {
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
function Sl({ className: t, ...e }) {
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
function kl({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    qe.Group,
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
function de(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Cl({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    qe.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: de(t),
      minSize: de(e),
      maxSize: de(r),
      collapsedSize: de(n),
      ...a
    }
  );
}
function El({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    qe.Separator,
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
  Jt as $,
  yi as A,
  Z as B,
  me as C,
  er as D,
  Ye as E,
  cn as F,
  Xe as G,
  We as H,
  Ui as I,
  Ki as J,
  ai as K,
  Si as L,
  li as M,
  ci as N,
  fi as O,
  pi as P,
  ui as Q,
  Fi as R,
  Ne as S,
  Tt as T,
  fa as U,
  $i as V,
  fe as W,
  na as X,
  Ji as Y,
  Vi as Z,
  ar as _,
  Qo as a,
  Ba as a$,
  ta as a0,
  Zr as a1,
  Qi as a2,
  el as a3,
  Xi as a4,
  Wi as a5,
  tl as a6,
  Zi as a7,
  Ri as a8,
  wa as a9,
  Ei as aA,
  wn as aB,
  ge as aC,
  be as aD,
  sn as aE,
  Ko as aF,
  qo as aG,
  Pr as aH,
  yl as aI,
  Sl as aJ,
  xl as aK,
  Ti as aL,
  ii as aM,
  wi as aN,
  Fo as aO,
  Uo as aP,
  si as aQ,
  Fa as aR,
  As as aS,
  Rs as aT,
  Os as aU,
  Ds as aV,
  Ps as aW,
  bl as aX,
  Nl as aY,
  sl as aZ,
  ls as a_,
  Dr as aa,
  nl as ab,
  al as ac,
  ol as ad,
  en as ae,
  us as af,
  fl as ag,
  Is as ah,
  pl as ai,
  Ts as aj,
  Be as ak,
  Ni as al,
  ml as am,
  Li as an,
  on as ao,
  di as ap,
  Yo as aq,
  gl as ar,
  _i as as,
  Ii as at,
  ji as au,
  Or as av,
  zi as aw,
  Gi as ax,
  Oi as ay,
  Hi as az,
  Ct as b,
  Oa as b$,
  ts as b0,
  ia as b1,
  Mi as b2,
  Ai as b3,
  Di as b4,
  El as b5,
  Cl as b6,
  kl as b7,
  vl as b8,
  Bs as b9,
  Xt as bA,
  ot as bB,
  ll as bC,
  Ho as bD,
  dl as bE,
  wl as bF,
  ul as bG,
  mn as bH,
  La as bI,
  cl as bJ,
  Sa as bK,
  _a as bL,
  Ta as bM,
  Aa as bN,
  Le as bO,
  xa as bP,
  gs as bQ,
  bs as bR,
  ns as bS,
  oi as bT,
  ka as bU,
  Ca as bV,
  Ma as bW,
  Da as bX,
  St as bY,
  hl as bZ,
  Pa as b_,
  rl as ba,
  Yi as bb,
  Pi as bc,
  Ua as bd,
  pe as be,
  ni as bf,
  ri as bg,
  zo as bh,
  Go as bi,
  ti as bj,
  Qs as bk,
  ei as bl,
  Ys as bm,
  ha as bn,
  oa as bo,
  Yr as bp,
  rn as bq,
  Gr as br,
  qi as bs,
  qa as bt,
  $a as bu,
  nn as bv,
  va as bw,
  Ka as bx,
  gi as by,
  il as bz,
  g as c,
  Ra as c0,
  Et as d,
  It as e,
  Ci as f,
  vi as g,
  rr as h,
  nr as i,
  or as j,
  Bi as k,
  hi as l,
  xi as m,
  we as n,
  gt as o,
  Wo as p,
  bi as q,
  nt as r,
  Qe as s,
  ki as t,
  ua as u,
  Ge as v,
  tr as w,
  mi as x,
  Ve as y,
  Je as z
};
//# sourceMappingURL=resizable-DJ3KlDvO.js.map
