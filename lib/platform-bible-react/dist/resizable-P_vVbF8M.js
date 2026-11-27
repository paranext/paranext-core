import { jsx as o, jsxs as m, Fragment as yt } from "react/jsx-runtime";
import { Slot as Ye, Dialog as _t, Separator as qn, Popover as Zt, Tooltip as Jt, DropdownMenu as et, Label as Vn, RadioGroup as He } from "radix-ui";
import { IconX as Jn, IconCheck as ve, IconSearch as Wn, IconChevronLeft as Xn, IconChevronRight as Yn } from "@tabler/icons-react";
import { Canon as st } from "@sillsdev/scripture";
import mt, { useRef as E, useEffect as U, useCallback as _, useState as D, createContext as tn, useContext as Ze, useMemo as at, Fragment as ee, useLayoutEffect as fe, useImperativeHandle as Zn, useId as en, forwardRef as rn } from "react";
import { X as nn, Check as Qe, ChevronsUpDown as on, Star as Qn, Undo as to, Redo as eo, SquareX as tr, FunctionSquare as er, SquareSigma as rr, Ban as ro, Copy as no, Redo2 as oo, Undo2 as ao, Sparkles as so, ClipboardCopy as io, ClipboardCheck as co, CircleCheckBig as lo, MessageSquare as uo, Search as an, Library as fo, BookOpen as wo, BookMarked as po, Book as mo, MessageSquarePlus as ho, PanelBottom as go, FileText as bo, Scan as No, ZoomOut as vo, ZoomIn as yo, Eye as xo, Pencil as So, BookCopy as ko, Users as Co, ExternalLink as Eo, CircleQuestionMark as Io, Settings as _o, BookA as To, House as Lo, Download as Ao, RefreshCw as Mo, Group as Do, ArrowRight as Oo, Loader2 as Po, ChevronDown as Ro, MenuIcon as Or, AlertTriangle as Bo, LoaderCircle as jo } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Pr, GENERATOR_NOTE_CALLER as Ue, HIDDEN_NOTE_CALLER as Fe, isInsertEmbedOpOfType as Vt, getDefaultViewOptions as Go, getMarkerMenuItems as zo, defaultStyleInfo as Rr, Editorial as Ho } from "@eten-tech-foundation/platform-editor";
import { Section as Ot, MODIFIER_KEYS as Uo, includes as Fo, formatReplacementStringToArray as Ko, split as sn, slice as $o, formatReplacementString as qo, usfmMarkers as we, deepEqual as Gt, isPlatformError as cn, ABORTED as ln, getErrorMessage as Vo, normalizeProjectId as ut, compareProjectsByName as Jo, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Xt, formatProjectName as dn, getLocalizeKeyForScrollGroupId as Wo, hasDistinctFullName as Xo, getSectionForBook as Yo, FAILED_PRECONDITION as Zo, RESOURCE_EXHAUSTED as Qo, NumberFormat as ta } from "platform-bible-utils";
import { Command as Ut } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import { flushSync as ea } from "react-dom";
import * as nr from "react-resizable-panels";
import { clsx as ra } from "clsx";
import { extendTailwindMerge as na, twMerge as oa } from "tailwind-merge";
const aa = na({ prefix: "tw" });
function Ke(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function sa(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Ke(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, l) => l !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((d, l) => l !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function ia(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Ke(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Ke(e), i = s.some((d) => d.startsWith("-tw-")), c = s.some((d) => d.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const d = a.slice(1);
    return [...n, `-tw-${d}`].join(":");
  }
  if (c && a.startsWith("!")) {
    const d = a.slice(1);
    return [...n, `!tw-${d}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function h(...t) {
  const e = ra(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return aa(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const l = sa(d);
    n.set(l.normalized, l.original), a.push(l.normalized);
  }), oa(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const l = n.get(d);
    return l ? ia(d, l) : d;
  }).join(" ");
}
const or = 600, ye = 650, Wi = 400, ca = 450, la = 500, Xi = 510, Yi = 520, da = 675, Zi = 690, Qi = 700, tc = 800, un = Pt(
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
  const s = n ? Ye.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: h(un({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const fn = "layoutDirection";
function wn() {
  return globalThis.localStorage ?? void 0;
}
function Nt() {
  var t;
  try {
    const e = (t = wn()) == null ? void 0 : t.getItem(fn);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function ec(t) {
  var e;
  try {
    (e = wn()) == null || e.setItem(fn, t);
  } catch {
  }
}
function rc({ ...t }) {
  return /* @__PURE__ */ o(_t.Root, { "data-slot": "dialog", ...t });
}
function nc({ ...t }) {
  return /* @__PURE__ */ o(_t.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function ua({ ...t }) {
  return /* @__PURE__ */ o(_t.Portal, { "data-slot": "dialog-portal", ...t });
}
function oc({ ...t }) {
  return /* @__PURE__ */ o(_t.Close, { "data-slot": "dialog-close", ...t });
}
function fa({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    _t.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: h(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: ca, ...e },
      ...r
    }
  );
}
function ac({
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
  const c = Nt();
  return /* @__PURE__ */ m(ua, { children: [
    /* @__PURE__ */ o(fa, { className: n, style: a }),
    /* @__PURE__ */ m(
      _t.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: la, ...s },
        dir: c,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(_t.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Jn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function sc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "dialog-header",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function ic({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ m(
    "div",
    {
      "data-slot": "dialog-footer",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...n,
      children: [
        r,
        e && /* @__PURE__ */ o(_t.Close, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function cc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    _t.Title,
    {
      "data-slot": "dialog-title",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function lc({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    _t.Description,
    {
      "data-slot": "dialog-description",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function pn({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: h(
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
function wa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const pa = Pt(
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
function ma({
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
        className: h(pa({ align: e }), t),
        onClick: (n) => {
          var a, s;
          n.target instanceof HTMLElement && n.target.closest("button") || (s = (a = n.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || s.focus();
        },
        ...r
      }
    )
  );
}
Pt("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function ar({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ut,
    {
      "data-slot": "command",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function sr({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = Nt(), s = mt.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !r || i.key !== " " || i.currentTarget.value !== "") return;
      const c = i.currentTarget.closest("[cmdk-root]"), d = c == null ? void 0 : c.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      d && (i.preventDefault(), i.stopPropagation(), d.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(wa, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Ut.Input,
        {
          "data-slot": "command-input",
          className: h(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...n
        }
      ),
      /* @__PURE__ */ o(ma, { children: /* @__PURE__ */ o(Wn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function ir({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ut.List,
    {
      "data-slot": "command-list",
      className: h(
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
function cr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ut.Empty,
    {
      "data-slot": "command-empty",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function be({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ut.Group,
    {
      "data-slot": "command-group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
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
    Ut.Separator,
    {
      "data-slot": "command-separator",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function xe({
  className: t,
  children: e,
  "data-checked": r,
  ...n
}) {
  return /* @__PURE__ */ m(
    Ut.Item,
    {
      "data-slot": "command-item",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      "data-checked": r,
      "aria-checked": r,
      ...n,
      children: [
        r !== void 0 && /* @__PURE__ */ o(
          ve,
          {
            "aria-hidden": !0,
            className: h(r !== !0 && r !== "true" && "tw:opacity-0")
          }
        ),
        e
      ]
    }
  );
}
function ha({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "command-shortcut",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const ga = [
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
], ba = (t) => {
  var e;
  return ((e = ga[t]) == null ? void 0 : e.chapters) ?? -1;
}, Na = st.allBookIds.filter(
  (t) => !st.isObsolete(st.bookIdToNumber(t))
);
function va(t) {
  const e = [], r = Math.min(t.length, st.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(st.bookNumberToId(n + 1));
  return e;
}
function j(t) {
  return `%scrollGroup_${t}%`;
}
const ya = {
  [j("undefined")]: "Ø",
  [j(0)]: "A",
  [j(1)]: "B",
  [j(2)]: "C",
  [j(3)]: "D",
  [j(4)]: "E",
  [j(5)]: "F",
  [j(6)]: "G",
  [j(7)]: "H",
  [j(8)]: "I",
  [j(9)]: "J",
  [j(10)]: "K",
  [j(11)]: "L",
  [j(12)]: "M",
  [j(13)]: "N",
  [j(14)]: "O",
  [j(15)]: "P",
  [j(16)]: "Q",
  [j(17)]: "R",
  [j(18)]: "S",
  [j(19)]: "T",
  [j(20)]: "U",
  [j(21)]: "V",
  [j(22)]: "W",
  [j(23)]: "X",
  [j(24)]: "Y",
  [j(25)]: "Z"
};
function lr(t, e) {
  return ba(st.bookIdToNumber(t));
}
function Se(t, e, r) {
  const n = st.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = st.bookIdToNumber(i);
    (r === "next" ? c > n && c < s : c < n && c > s) && (a = i, s = c);
  }), a;
}
function dc(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = Se(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(lr(s), 1),
      verseNum: 1
    };
}
function uc(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < lr(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = Se(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function fc(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = Se(n, e, "previous");
  if (!i) return;
  const c = Math.max(lr(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function wc(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = Se(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function pc(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const mc = (t, e, r, n, a) => {
  switch (t) {
    case Ot.OT:
      return e ?? "Old Testament";
    case Ot.NT:
      return r ?? "New Testament";
    case Ot.DC:
      return n ?? "Deuterocanon";
    case Ot.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, hc = (t, e, r, n, a) => {
  switch (t) {
    case Ot.OT:
      return e ?? "OT";
    case Ot.NT:
      return r ?? "NT";
    case Ot.DC:
      return n ?? "DC";
    case Ot.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function gc(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? st.bookIdToEnglishName(t);
}
function xa(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const bc = Object.fromEntries(
  Na.map((t) => [t, st.bookIdToEnglishName(t)])
);
function Nc(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = st.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function mn() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function hn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function gn(t) {
  hn(document, mn()) || t();
}
function Br(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function jr(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function Sa(t, e) {
  const [r] = D(mn), n = E(t);
  n.current = t;
  const a = E(e);
  return a.current = e, _(
    (s) => {
      var d, l;
      if ((d = n.current) == null || d.call(n, s), s.defaultPrevented) return;
      if (hn(document, r)) {
        s.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: i } = document;
      if (i && i !== document.body) return;
      const c = (l = a.current) == null ? void 0 : l.call(a);
      c && (c.focus({ preventScroll: !0 }), document.activeElement === c && s.preventDefault());
    },
    [r]
  );
}
const bn = Symbol.for("platform-bible-react.window-blur-press");
function ka(t) {
  return Reflect.get(t, bn) === !0;
}
function Nn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = E(void 0), n = E(void 0), a = E(void 0);
  U(() => {
    const l = () => {
      const f = r.current;
      if (!f || f.dataset.state === "closed") return;
      const b = f.parentElement;
      if (!b) return;
      const x = { bubbles: !0, pointerType: "mouse" }, w = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(w, bn, { value: !0 }), b.dispatchEvent(w);
    };
    return window.addEventListener("blur", l), () => window.removeEventListener("blur", l);
  }, []);
  const s = _(
    (l) => {
      if (r.current = l ?? void 0, l && l !== n.current && (n.current = l, a.current = Br(l) ?? jr(l)), typeof t == "function") {
        const f = t(l);
        if (typeof f == "function")
          return () => {
            r.current = void 0, f();
          };
      } else t && (t.current = l);
    },
    [t]
  ), i = _(() => {
    var x;
    const l = n.current, f = (x = a.current) != null && x.isConnected ? a.current : void 0, b = (l && Br(l)) ?? f ?? (l && jr(l));
    return b != null && b.isConnected ? b : void 0;
  }, []), c = Sa(
    e,
    i
  ), d = _(
    (l) => {
      c(l), r.current || (n.current = void 0, a.current = void 0);
    },
    [c]
  );
  return { ref: s, onCloseAutoFocus: d };
}
const Gr = `
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
function Ca(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Qt(t, e) {
  const r = e ? `${Gr}, ${e}` : Gr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Ca(n)
  );
}
const vc = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let qe = "keyboard", zr = !1;
function Ea() {
  zr || typeof document > "u" || (zr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      ka(t) || (qe = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      qe = "keyboard";
    },
    !0
  ));
}
function Hr() {
  return qe;
}
const vn = "data-quiet-focus";
function Ur(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(vn, ""), t.style.outline = "none"));
}
function Ia(t) {
  t && (t.removeAttribute(vn), t.style.removeProperty("outline"));
}
const Fr = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function _a({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    qn.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...n
    }
  );
}
const Ta = Pt(
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
function dr({
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
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ta({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function yc({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ye.Root : "div";
  return /* @__PURE__ */ o(
    n,
    {
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function yn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    _a,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function xn() {
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
function ur({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function Ve({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: La, usePortalContainer: Aa } = xn(), xc = La;
function fr({
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
  const c = Nt(), d = Aa(), l = Nn({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: d, children: /* @__PURE__ */ o(
      Zt.Content,
      {
        "data-slot": "popover-content",
        ...l,
        align: e,
        sideOffset: r,
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: or, ...n },
        dir: c,
        ...i
      }
    ) })
  );
}
function Ma({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Sc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function kc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Cc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: h("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Ec = Object.freeze([
  "inTooltip",
  "shortcutKeysLocalization"
]);
function Da(t) {
  return Symbol.for(`platform-bible-react.context.${t}`);
}
function Sn(t, e) {
  const r = Da(t), n = globalThis, a = n[r];
  if (a) return a;
  const s = tn(e);
  return n[r] = s, s;
}
const kn = Sn("inTooltip", !1);
function Oa() {
  return Ze(kn);
}
function Et({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    Jt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function ht({ ...t }) {
  return /* @__PURE__ */ o(Jt.Root, { "data-slot": "tooltip", ...t });
}
function gt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? h(un({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: Pa, usePortalContainer: Ra } = xn(), Ic = Pa;
function bt({
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
  const c = Ra();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: c, children: /* @__PURE__ */ m(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: da, ...r },
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          /* @__PURE__ */ o(kn.Provider, { value: !0, children: s }),
          n && /* @__PURE__ */ o(
            Jt.Arrow,
            {
              className: h(
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
const Ba = /^%[^%]*%$/;
function Cn(t) {
  return t !== void 0 && !Ba.test(t) && t.trim() !== "";
}
function nt(t, e) {
  return Cn(t) ? t : e;
}
function ja() {
  const [t, e] = D(!1), r = E(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
function Ga() {
  U(() => {
    Ea();
  }, []);
}
const En = tn(void 0);
function ke() {
  const t = Ze(En);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ce = Pt("", {
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
function re({ variant: t = "default", ...e }) {
  const r = Nt(), n = mt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(En.Provider, { value: n, children: /* @__PURE__ */ o(et.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function za({
  ...t
}) {
  return /* @__PURE__ */ o(et.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ne({
  ...t
}) {
  return /* @__PURE__ */ o(et.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function oe({
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
  ...c
}) {
  const d = Nt(), l = Nn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(et.Portal, { children: /* @__PURE__ */ o(
    et.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...l,
      sideOffset: r,
      align: e,
      className: h(
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
      style: { zIndex: or, ...n },
      ...c,
      children: /* @__PURE__ */ o("div", { dir: d, children: a })
    }
  ) });
}
function Ha({ ...t }) {
  return /* @__PURE__ */ o(et.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ua({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = Nt(), s = ke();
  return /* @__PURE__ */ o(
    et.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: h(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ce({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function zt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = Nt(), i = ke();
  return /* @__PURE__ */ m(
    et.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: h(
        // CUSTOM: Replaced tw:pe-8 tw:ps-1.5 with tw:pe-1.5 tw:ps-7 so the space kept for the
        // check indicator is on the leading side, matching MenubarCheckboxItem/MenubarRadioItem; the
        // item text then lines up with tw:data-inset:ps-7 labels and items
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ce({ variant: i.variant })
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
            children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(ve, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Fa({
  ...t
}) {
  return /* @__PURE__ */ o(et.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Kr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = Nt(), s = ke();
  return /* @__PURE__ */ m(
    et.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: h(
        // CUSTOM: Replaced tw:pe-8 tw:ps-1.5 with tw:pe-1.5 tw:ps-7 so the space kept for the
        // check indicator is on the leading side, matching MenubarCheckboxItem/MenubarRadioItem; the
        // item text then lines up with tw:data-inset:ps-7 labels and items
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-1.5 tw:ps-7 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ce({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:start-1.5 tw:flex tw:size-4 tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(ve, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ee({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    et.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: h(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function ae({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    et.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Ka({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: h(
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
function $a({ ...t }) {
  return /* @__PURE__ */ o(et.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function qa({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = ke(), s = Nt();
  return /* @__PURE__ */ m(
    et.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ce({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(Xn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Yn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Va({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = Nt();
  return /* @__PURE__ */ o(
    et.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: h(
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
      style: { zIndex: ye, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function _c({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Vn.Root,
    {
      "data-slot": "label",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function Tc({
  className: t,
  ...e
}) {
  const r = Nt();
  return /* @__PURE__ */ o(
    He.Root,
    {
      "data-slot": "radio-group",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function Lc({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    He.Item,
    {
      "data-slot": "radio-group-item",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        He.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const Ac = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), $r = (t, e) => t[e] ?? e;
function Ja({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = $r(n, "%cancelButton_tooltip%"), c = s ?? $r(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(dr, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(nn, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(yn, {}),
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": c,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(Qe, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: c }) })
    ] }) })
  ] });
}
function Ie() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Mc() {
  return /Windows/i.test(navigator.userAgent);
}
const Wa = ["input", "select", "textarea", "button"], Xa = ["button", "textbox"], Dc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = E(null), [s, i] = D(void 0), [c, d] = D(void 0), l = _(
    (w) => {
      i(w);
      const v = t.find((S) => S.id === w);
      v && (e == null || e(v));
      const p = document.getElementById(w);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = _(
    (w) => {
      const v = t.find((p) => p.id === w);
      v && (d((p) => p === w ? void 0 : w), r == null || r(v));
    },
    [r, t]
  ), b = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || Wa.includes(v)) return !0;
    const p = w.getAttribute("role");
    if (p && Xa.includes(p)) return !0;
    const S = w.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, x = _(
    (w) => {
      var W;
      const v = w.target, p = (L) => L ? document.getElementById(L) : void 0, S = p(c), O = p(s);
      if (!!(S && v && S.contains(v) && v !== S) && b(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            w.preventDefault(), w.stopPropagation();
            const L = t.find((it) => it.id === c);
            L && l(L.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!S) return;
          const L = Array.from(
            S.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (L.length === 0) return;
          const it = L.findIndex((vt) => vt === v);
          if (it === -1) return;
          let ft;
          w.key === "ArrowDown" ? ft = Math.min(it + 1, L.length - 1) : ft = Math.max(it - 1, 0), ft !== it && (w.preventDefault(), w.stopPropagation(), (W = L[ft]) == null || W.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((L) => L.id === s);
      let P = k;
      switch (w.key) {
        case "ArrowDown":
          P = Math.min(k + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(k - 1, 0), w.preventDefault();
          break;
        case "Home":
          P = 0, w.preventDefault();
          break;
        case "End":
          P = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const L = O;
          if (L) {
            const it = L.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ft = L.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), vt = it ?? ft;
            if (vt) {
              w.preventDefault(), vt.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (b(v) || (n == null || n(w.key), w.preventDefault()));
          return;
      }
      const R = t[P];
      R && l(R.id);
    },
    [t, l, s, c, f, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: c,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: l
  };
}, Ya = Pt(
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
function Ne({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? Ye.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ya({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function Oc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function In(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function Pc({
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
    const c = () => {
      requestAnimationFrame(() => {
        Qt(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
        });
      });
    };
    c();
    const d = new MutationObserver(() => {
      c();
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
    const { current: c } = a;
    if (c && In(i, c)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (d = Qt(c)[0]) == null || d.focus();
        return;
      }
      i.key === " " && document.activeElement === c && i.preventDefault();
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
        className: h("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: a,
            onKeyDown: s,
            className: h(
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
function Rc({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: h(
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
function Bc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function jc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: h(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function Za(t) {
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
function Qa(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ts(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Gc({
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
  }, [a]), Za(i);
  const c = mt.useMemo(
    () => i.current ? Qt(i.current) : [],
    [i]
  ), d = mt.useCallback(
    (f) => {
      const { current: b } = i;
      if (!b || !b.parentElement) return;
      if (!In(f, b)) {
        e == null || e(f);
        return;
      }
      const x = b.closest("table"), w = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Qt(x).filter(
          (S) => S.tagName === "TR"
        )
      ) : [], v = w.indexOf(b), p = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), ts(w, v, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), Qa(c, p, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const S = b.closest("table");
        S && S.focus();
      }
      e == null || e(f);
    },
    [i, c, e]
  ), l = mt.useCallback(
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
      onFocus: l,
      className: h(
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
function zc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "th",
    {
      "data-slot": "table-head",
      className: h(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Hc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "td",
    {
      "data-slot": "table-cell",
      className: h(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Uc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function es(t, e = !0) {
  const [r, n] = D(!1);
  return U(() => {
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
    const c = new MutationObserver(s);
    return c.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", s), i == null || i.disconnect(), c.disconnect();
    };
  }, [t, e]), r;
}
function rs({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = es(r, e);
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
function Fc({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: c = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: l,
  isOpen: f = void 0,
  onOpenChange: b = void 0,
  isDisabled: x = !1,
  sortSelected: w = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: S = void 0,
  variant: O = "ghost",
  id: G
}) {
  const [J, k] = D(!1), P = E(null), R = _(
    (F) => {
      var rt;
      const ct = (rt = t.find((wt) => wt.label === F)) == null ? void 0 : rt.value;
      ct && r(
        e.includes(ct) ? e.filter((wt) => wt !== ct) : [...e, ct]
      );
    },
    [t, e, r]
  ), W = () => l || n, L = f ?? J, it = b ?? k, [ft, vt] = D(L), [Lt, X] = D(e);
  ft !== L && (vt(L), L && X(e));
  const Rt = at(() => {
    if (!w) return t;
    const F = t.filter((rt) => rt.starred).sort((rt, wt) => rt.label.localeCompare(wt.label)), ct = t.filter((rt) => !rt.starred).sort((rt, wt) => {
      const Mt = Lt.includes(rt.value), Bt = Lt.includes(wt.value);
      return Mt && !Bt ? -1 : !Mt && Bt ? 1 : rt.label.localeCompare(wt.label);
    });
    return [...F, ...ct];
  }, [t, Lt, w]), Ft = () => {
    const F = t.map((ct) => ct.value);
    X(F), r(F);
  }, At = () => {
    X([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: S, children: /* @__PURE__ */ m(ur, { open: L, onOpenChange: it, children: [
    /* @__PURE__ */ o(Ve, { asChild: !0, children: /* @__PURE__ */ m(
      Z,
      {
        variant: O,
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
                className: h(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: W()
              }
            )
          ] }),
          /* @__PURE__ */ o(on, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(fr, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(ar, { children: [
      /* @__PURE__ */ o(
        sr,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Ft, children: i }),
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: At, children: c })
      ] }),
      /* @__PURE__ */ o(rs, { isEnabled: v, scrollerRef: P, children: /* @__PURE__ */ m(ir, { ref: P, children: [
        /* @__PURE__ */ o(cr, { children: d }),
        /* @__PURE__ */ o(be, { children: Rt.map((F) => /* @__PURE__ */ m(
          xe,
          {
            value: F.label,
            onSelect: R,
            "data-checked": e.includes(F.value),
            children: [
              F.starred && /* @__PURE__ */ o(Qn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: F.label }),
              F.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: F.secondaryLabel })
            ]
          },
          F.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function It(t) {
  return t.replace(/^\+/, "");
}
function ns(t, e) {
  if (!t || e === "") return !1;
  const r = It(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && It(n.marker).toLowerCase() === r
  );
}
function os(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = It(e).toLowerCase();
  return r === "passive" ? Pr({
    query: a,
    items: n,
    filter: (s) => It(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Pr({
    query: a,
    items: n,
    filter: (s) => It(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Yt(t) {
  return t.isComposing || t.keyCode === 229;
}
function as(t) {
  return t === "hidden";
}
const _n = /^[a-z0-9+-]$/i;
function ss(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && Ie()) && e !== "Dead") {
    if (_n.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const is = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], cs = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function ls() {
  return [...is, ...cs.filter((t) => _n.test(t))];
}
function pt(t) {
  t.preventDefault(), t.stopPropagation();
}
function ds(t, e, r) {
  var i, c;
  const { kind: n } = e;
  if (Yt(t) || Uo.has(t.key))
    return "passed";
  const a = !Ie();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && pt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return pt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return pt(t), os(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      // The host-driven mode, for every kind: all marker palettes are host-driven (the session
      // owns the query and the palette renders it read-only), so this commit must resolve against
      // the same list the host filtered. `'passive'` is that mode's name — a label PREFIX match,
      // mirroring PT9's marker dropdown — not containment. Ranking cmdk's way here instead would
      // commit an item the rendered list never offered.
      "passive"
    ).length === 0 ? "continue" : (r.commit(), "ended");
  if (t.key === "Escape")
    return pt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (pt(t), e.filter === "")
        return r.dismiss(), "ended";
      const f = It(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, f)) {
        const b = e.items.find(
          (x) => It(x.marker).toLowerCase() === f
        );
        return b && r.commitItem(b.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    pt(t);
    const d = It(e.filter).toLowerCase(), l = e.items.find(
      (f) => It(f.marker).toLowerCase() === d
    );
    return l && r.commitItem(l.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (pt(t), r.dismiss(), "ended") : (pt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (pt(t), "continue") : (pt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return pt(t), r.dismiss(), "ended";
  const s = ss(t);
  return t.key === "Backspace" || s !== void 0 ? (pt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (pt(t), "continue");
}
function us(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function Tn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function fs(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function ws(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: c,
    show: d,
    restoreSelectionIfLost: l,
    hasEditorChangedSinceFocus: f,
    focusEditor: b,
    applyItem: x,
    onShowError: w
  } = t, v = () => {
    l(), b();
  };
  a.current += 1;
  const p = a.current, S = () => a.current === p, O = { kind: r, token: p, filter: "", items: e };
  n && (O.isNoteMarker = n), s(O), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: ls(),
    onKey: (G) => c(G)
  }).then((G) => {
    var k;
    i(p);
    const J = G ?? ((k = O.itemToApplyOnClose) == null ? void 0 : k.marker);
    if (J !== void 0) {
      const P = (f == null ? void 0 : f()) ?? !1;
      v();
      const R = P ? void 0 : e.find((W) => W.marker === J);
      R && x(R);
    } else S() && v();
  }).catch((G) => {
    i(p), S() && v(), w(G);
  });
}
function ps(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: c,
    hasEditorChangedSinceFocus: d
  } = e, l = r.current;
  if (!l) return "no-session";
  const f = (x) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    x();
  };
  return ds(t, l, {
    update: (x) => a.update(x),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (x) => f(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(x);
    }),
    commitTypedAndReopen: (x) => f(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(x, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (x) => f(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedCloser(x);
    }),
    commitItem: (x) => f(() => {
      var v;
      const w = l.items.find((p) => p.marker === x);
      if (w) {
        if (w.kind === "note") {
          l.itemToApplyOnClose = w;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(w, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && c(l.token), "routed";
}
function ms({
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  U(() => {
    const n = r ?? document, a = () => {
      t() && e();
    };
    return n.addEventListener("compositionstart", a, { capture: !0 }), () => {
      n.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
function hs({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  U(() => {
    const i = s ?? document, c = (d) => {
      var b, x, w;
      const l = (b = t.current) == null ? void 0 : b.querySelector(".editor-input");
      if (!l || d.target !== l) return;
      const f = (x = e.current) == null ? void 0 : x.getSelection();
      f ? r.current = f : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = Tn(
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
    return i.addEventListener("focusout", c), () => i.removeEventListener("focusout", c);
  }, [t, e, r, n, a, s]);
}
function gs({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = E(void 0), a = _(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const c = e.current ?? void 0;
      n.current = i ? c : void 0, c == null || c.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = _(
    (i) => {
      var c;
      us(t, i), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return U(
    () => () => {
      var i;
      (i = n.current) == null || i.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: s };
}
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd",
      className: h(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function bs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: h("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Kc = Object.freeze(["%shortcutKeys_tooltip%"]), Ln = Sn(
  "shortcutKeysLocalization",
  { localizedStrings: {} }
);
function $c({
  localizedStrings: t,
  locale: e,
  children: r
}) {
  const n = at(() => ({ localizedStrings: t, locale: e }), [t, e]);
  return /* @__PURE__ */ o(Ln.Provider, { value: n, children: r });
}
function Ns() {
  return Ze(Ln);
}
const vs = /* @__PURE__ */ new Set([
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
]), ys = {
  "⌘": "Command",
  "⌥": "Option",
  "⌃": "Control",
  "⇧": "Shift",
  "⇥": "Tab",
  "⏎": "Return",
  "⌫": "Delete",
  "⎋": "Escape",
  "␣": "Space",
  "↑": "Up Arrow",
  "↓": "Down Arrow",
  "←": "Left Arrow",
  "→": "Right Arrow",
  Ctrl: "Control",
  Esc: "Escape",
  Del: "Delete",
  // The Windows/Linux spelling of the arrow keys, which macOS writes as symbols
  Up: "Up Arrow",
  Down: "Down Arrow",
  Left: "Left Arrow",
  Right: "Right Arrow",
  PageUp: "Page Up",
  PageDown: "Page Down"
};
function xs(t) {
  const e = sn(t, "");
  let r = 0;
  for (; r < e.length && vs.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = $o(t, r);
  return a ? [...n, a] : n;
}
function Ss(t) {
  const e = [];
  let r = "";
  return sn(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function An(t) {
  const e = xs(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Ss(t), separator: "+" };
}
function ks(t) {
  return An(t).keycaps.map((e) => ys[e] ?? e);
}
function Cs(t) {
  const e = { style: "long", type: "conjunction" };
  try {
    return new Intl.ListFormat(t, e);
  } catch {
    return new Intl.ListFormat(void 0, e);
  }
}
function Es(t, e) {
  var c;
  const r = Cs(e), n = r.formatToParts(t);
  if (t.length < 3) return n;
  const a = r.formatToParts(t.slice(-2)), s = a[a.findLastIndex(qr) - 1], i = n.findLastIndex(qr) - 1;
  return (s == null ? void 0 : s.type) !== "literal" || ((c = n[i]) == null ? void 0 : c.type) !== "literal" ? n : n.map((d, l) => l === i ? s : d);
}
function qr(t) {
  return t.type === "element";
}
function Is({
  template: t,
  hint: e,
  locale: r
}) {
  const n = Es(ks(e), r).map(
    (a, s) => (
      // A key name can repeat, so it is not a safe key; the parts never reorder, so position is.
      // eslint-disable-next-line react/no-array-index-key
      a.type === "element" ? /* @__PURE__ */ o(Je, { children: a.value }, s) : a.value
    )
  );
  return Ko(t, { keys: n }).map((a, s) => (
    // One fixed template and one list per render, so the parts never reorder
    // eslint-disable-next-line react/no-array-index-key
    /* @__PURE__ */ o(ee, { children: a }, s)
  ));
}
const _s = 400;
function Ts() {
  return Nt() === "rtl" ? "left" : "right";
}
function We({ hint: t }) {
  const e = Oa(), { localizedStrings: r, locale: n } = Ns(), { keycaps: a, separator: s } = An(t), i = a.length === 1 ? /* @__PURE__ */ o(Je, { className: "tw:tracking-normal", children: a[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left
    // layout. The gap is narrower than `KbdGroup`'s so a combo reads as one unit.
    /* @__PURE__ */ o(bs, { dir: "ltr", className: "tw:gap-0.5 tw:tracking-normal", children: a.map((f, b) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so
      // the keycap text is not a safe key; position is stable because the keycaps never
      // reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(ee, { children: [
        b > 0 && s && // The `+` is drawn about half a pixel left of the middle of its advance, so centered
        // as is it leaves a wider gap after it than before it. A pixel of start padding in a
        // whole-pixel box moves the center half a pixel right, which measured closest to
        // centered at 100 % and stays within half a pixel at 125 %–200 %. The group is always
        // `ltr`, so the padding is always on the left.
        /* @__PURE__ */ o("span", { className: "tw:inline-flex tw:w-2 tw:justify-center tw:ps-px", children: s }),
        /* @__PURE__ */ o(Je, { children: f })
      ] }, b)
    )) })
  ), [c, d] = D(!1);
  U(() => {
    if (!c) return;
    const f = () => ea(() => d(!1));
    return window.addEventListener("keydown", f, { capture: !0 }), () => window.removeEventListener("keydown", f, { capture: !0 });
  }, [c]);
  const l = r == null ? void 0 : r["%shortcutKeys_tooltip%"];
  return e || !l || !Fo(l, "{keys}") ? i : (
    // Its own provider, so the keycaps get a tooltip in any menu, whether or not one is above them.
    // The delay keeps a pointer passing down a menu's shortcut column from flashing a readout per row
    /* @__PURE__ */ o(Et, { delayDuration: _s, children: /* @__PURE__ */ m(ht, { open: c, onOpenChange: d, children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o("span", { className: "tw:inline-flex", children: i }) }),
      /* @__PURE__ */ o(
        bt,
        {
          side: Ts(),
          className: "tw:data-closed:animate-none!",
          arrowClassName: "tw:translate-y-[calc(-50%-1px)]",
          children: /* @__PURE__ */ o(Is, { template: l, hint: t, locale: n })
        }
      )
    ] }) })
  );
}
const qc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Vr = (t, e) => t[e] ?? e;
function Ls({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = Ie(), l = Vr(a, "%undoButton_tooltip%"), f = Vr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(dr, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": l,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ o(to, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ m("p", { children: [
        l,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(We, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ o(yn, {}),
    e && /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o(eo, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(We, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function As({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = E(null);
  return U(() => {
    var d;
    const s = Ie(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var b, x, w, v;
      if (!i || document.activeElement !== i) return;
      const f = l.key.toLowerCase();
      if (s) {
        if (!l.metaKey) return;
        !l.shiftKey && f === "z" ? (l.preventDefault(), r && ((b = e.current) == null || b.undo())) : l.shiftKey && f === "z" && (l.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && f === "z" ? (l.preventDefault(), r && ((w = e.current) == null || w.undo())) : (f === "y" || l.shiftKey && f === "z") && (l.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function Ms() {
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
  return at(() => ({ virtualRef: r, setSource: n }), [n]);
}
function Ds(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Os(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Ps = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Rs({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = E(!1), i = E(null), c = E(null), d = E(!1), [l, f] = D(t), [b, x] = D(e), [w, v] = D(!1), p = E(!1), S = E(l);
  S.current = l;
  const O = E(b);
  O.current = b, U(() => {
    f(t);
  }, [t]), U(() => {
    b !== e && x(e);
  }, [e]);
  const G = (k) => {
    if (d.current = !1, v(k), !k) {
      const P = S.current, R = O.current;
      P !== "custom" || R ? (P !== t || R !== e) && (s.current = !0, r(P, R)) : (f(t), x(e));
    }
  }, J = (k) => {
    var P, R, W, L;
    k.stopPropagation(), document.activeElement === c.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((P = i.current) == null || P.focus(), d.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((R = c.current) == null || R.focus(), d.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((W = i.current) == null ? void 0 : W.selectionStart) === 0 && ((L = c.current) == null || L.focus(), d.current = !1), l === "custom" && k.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ m(re, { open: w, onOpenChange: G, children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(ne, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Ps(t, n, e) }) }) }),
      /* @__PURE__ */ o(bt, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      oe,
      {
        style: { zIndex: ye },
        onEscapeKeyDown: () => {
          S.current = t, O.current = e, f(t), x(e);
        },
        onCloseAutoFocus: (k) => {
          s.current && (s.current = !1, k.preventDefault(), gn(a));
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: J,
        onMouseMove: () => {
          var k;
          d.current && ((k = i.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ o(Ee, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(ae, {}),
          /* @__PURE__ */ o(
            zt,
            {
              checked: l === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ue })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            zt,
            {
              checked: l === "hidden",
              onCheckedChange: () => f("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Fe })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            zt,
            {
              ref: c,
              checked: l === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                p.current = l === "custom";
              },
              onClick: (k) => {
                var P;
                if (k.stopPropagation(), p.current && k.target !== i.current) {
                  G(!1);
                  return;
                }
                d.current = !0, (P = i.current) == null || P.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  pn,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), f("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: b,
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
const Bs = (t, e) => t === "f" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(er, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(rr, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(tr, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), js = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), qo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Gs({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = E(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ m(re, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(ne, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Bs(t, r) }) }) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: js(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      oe,
      {
        style: { zIndex: ye },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), gn(a));
        },
        children: [
          /* @__PURE__ */ o(Ee, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(ae, {}),
          /* @__PURE__ */ m(
            zt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(tr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            zt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(er, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            zt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(rr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Jr = '[aria-controls="editor-context-menu"]';
function je(t) {
  return t ? t.matches(Jr) ? !0 : !!t.querySelector(Jr) : !1;
}
const Vc = Object.freeze([
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
function zs({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? ro, { className: e, size: 16 });
}
function Hs({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(Qe, { size: 16 })
    }
  );
}
function ge(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Wr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    xe,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      value: ge(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(Hs, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(zs, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(ha, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Us({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = D(""), [c] = D(() => {
    const f = e.find(
      (b) => b.marker === a && !b.isDisallowed && !b.isDeprecated && !b.isDisabled
    );
    return f ? ge(f) : void 0;
  }), [d, l] = at(() => {
    const f = It(s.trim().toLowerCase());
    if (!f) {
      const w = e.filter((v) => !v.isDisallowed);
      return [w.length > 0 ? w : e, []];
    }
    const b = e.filter((w) => {
      var p;
      const v = (p = w.marker) == null ? void 0 : p.toLowerCase();
      return w.isDisallowed ? v === f : v == null ? void 0 : v.includes(f);
    }), x = e.filter(
      (w) => w.title.toLowerCase().includes(f) && !b.includes(w)
    );
    return [b, x];
  }, [s, e]);
  return /* @__PURE__ */ m(ar, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: c, children: [
    /* @__PURE__ */ o(
      sr,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (f) => i(f),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(ir, { children: [
      /* @__PURE__ */ o(cr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(be, { children: d.map((f) => /* @__PURE__ */ o(
        Wr,
        {
          item: f,
          localizedStrings: t
        },
        ge(f)
      )) }),
      l.length > 0 && /* @__PURE__ */ m(yt, { children: [
        d.length > 0 && /* @__PURE__ */ o($e, { alwaysRender: !0 }),
        /* @__PURE__ */ o(be, { children: l.map((f) => /* @__PURE__ */ o(
          Wr,
          {
            item: f,
            localizedStrings: t
          },
          ge(f)
        )) })
      ] })
    ] })
  ] });
}
function Fs(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = we[n], i = s != null && s.children ? s : a && we[a];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, d]) => {
    c.push(
      ...d.map((l) => ({
        marker: l,
        title: r[we[l].description] ?? we[l].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(l), e();
        }
      }))
    );
  }), c.sort((d, l) => (d.marker ?? d.title).localeCompare(l.marker ?? l.title));
}
function Xr(t) {
  if (!t || !Vt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function Ks(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function $s(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function qs(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function Vs(t, e) {
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
      const c = i.insert.slice(n), d = Math.min(c.length, s.length);
      if (c.slice(0, d) !== s.slice(0, d)) return !1;
      s = s.slice(d), n += d, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function Js(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Ws(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Xs = 300, Ge = "*", Ys = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Jc({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: c,
  localizedStrings: d,
  parentEditorRef: l,
  inline: f = !1,
  ref: b,
  initialCaretPosition: x,
  markerPalette: w,
  onNoteEdit: v
}) {
  var Lr;
  const p = E(null), S = E(null), O = E(null), G = E(s);
  U(() => {
    G.current = s;
  }, [s]);
  const J = E(x);
  U(() => {
    J.current = x;
  }, [x]);
  const k = _(() => {
    var N, y;
    const u = J.current;
    u !== void 0 && u !== "end" ? (N = p.current) == null || N.selectNoteTextOffset(0, u.utf16Offset, {
      field: u.field,
      glyph: u.glyph
    }) : (y = p.current) == null || y.selectNote(0);
  }, []);
  fe(() => {
    if (f || !O.current) return;
    const u = parseFloat(getComputedStyle(O.current).width);
    u > 0 && (O.current.style.width = `${u}px`);
  }, [f]);
  const [P, R] = D("generated"), [W, L] = D("generated"), [it, ft] = D(Ge), [vt, Lt] = D(Ge), [X, Rt] = D("f"), [Ft, At] = D(!1), [F, ct] = D(!0), [rt, wt] = D(!1), Mt = E(!1), Bt = E(""), g = E(!1), A = E(void 0), K = E([]), Q = E([]), $ = E(void 0), Y = E(void 0), gr = _(() => {
    var N;
    const u = (N = p.current) == null ? void 0 : N.takeOpsAfterNote(0);
    u != null && u.length && (K.current = [...K.current, ...u], $.current = void 0);
  }, []), br = _(
    (u, N) => {
      var I, z;
      if (!u) return;
      const y = Xr(u), C = Xr(N);
      if (!y && C) {
        $.current = {
          text: K.current,
          closedNoteOp: u,
          openNoteOp: N
        }, K.current = [];
        return;
      }
      const T = $.current;
      T && (y && !C && Gt(u, T.openNoteOp) && Gt(N, T.closedNoteOp) && !((z = (I = p.current) == null ? void 0 : I.getOpsAfterNote(0)) != null && z.length) ? (K.current = T.text, $.current = void 0) : Gt(N, T.openNoteOp) || ($.current = void 0));
    },
    []
  ), [xt, se] = D(!1), _e = Ms(), [Nr, Gn] = D(), vr = E(null), St = E(
    void 0
  ), zn = E(0), yr = E(w);
  U(() => {
    yr.current = w;
  }, [w]), U(
    () => () => {
      var u;
      St.current && (St.current = void 0, (u = yr.current) == null || u.dismiss());
    },
    []
  );
  const ie = E(void 0), Te = E(void 0), ce = _(
    () => fs(
      Te.current,
      Tn(
        () => {
          var u;
          return (u = p.current) == null ? void 0 : u.getUsj();
        },
        () => {
          var u;
          return (u = p.current) == null ? void 0 : u.getSelection();
        }
      )
    ),
    []
  ), { setSession: xr, clearSessionIfCurrent: le } = gs({
    sessionRef: St,
    editorRef: p,
    baselineRef: Te
  }), Kt = _(() => {
    var N, y, C, T;
    if ((N = p.current) != null && N.getSelection() || (y = p.current) != null && y.getSelectedParaMarker()) return;
    const u = ie.current;
    u ? (C = p.current) == null || C.setSelection(u) : (T = p.current) == null || T.selectNote(0);
  }, []), de = _(() => {
    var u;
    Kt(), (u = p.current) == null || u.focus();
  }, [Kt]), Tt = at(
    () => ({
      ...i,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...i.view ?? Go(),
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
    [i, c]
  ), Le = at(
    () => Fs(
      p,
      () => se(!1),
      d,
      Nr,
      X
    ),
    [d, Nr, X]
  );
  U(() => {
    var u;
    xt || (u = p.current) == null || u.focus();
  }, [X, xt]);
  const Dt = _(() => {
    var C, T, I;
    const u = (C = S.current) == null ? void 0 : C.querySelector(".editor-input"), N = u == null ? void 0 : u.querySelector("span.note"), y = (I = (T = S.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : I.anchorNode;
    return !!N && !!y && N.contains(y);
  }, []), jt = _(
    (u = !1) => {
      var y, C, T, I, z;
      v == null || v();
      const N = (C = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : C.at(0);
      if (N && Vt("note", N) && (r == null || r([N]), u && l && G.current)) {
        const q = [
          ...K.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], tt = Q.current, M = !Gt(q, tt);
        if (f && !M && Gt(N, A.current))
          return;
        A.current = N;
        const V = [N];
        M && (tt.length > 0 && Vs(
          ((I = l.current) == null ? void 0 : I.getOpsAfterNote(G.current)) ?? [],
          tt
        ) && V.push({ delete: qs(tt) }), V.push(...q), Q.current = q), (z = l.current) == null || z.replaceEmbedUpdate(G.current, V);
      }
    },
    [f, r, v, l]
  ), Ae = _(
    (u) => {
      var y, C, T;
      const N = (y = p.current) == null ? void 0 : y.getSelection();
      (C = p.current) == null || C.applyUpdate([u, { delete: 1 }]), N && ((T = p.current) == null || T.setSelection(N)), de();
    },
    [de]
  ), Sr = _(
    (u, N) => {
      var T, I, z;
      St.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const y = (z = (I = p.current) == null ? void 0 : I.getNoteOps(0)) == null ? void 0 : z.at(0);
      if (!y || !Vt("note", y) || !y.insert.note) return;
      let C;
      u === "custom" ? C = N : u === "generated" ? C = Ue : C = Fe, y.insert.note.caller !== C && (y.insert.note.caller = C, Ae(y));
    },
    [Ae]
  ), $t = E(void 0), Me = E(jt);
  U(() => {
    Me.current = jt;
  }, [jt]);
  const qt = _(() => {
    $t.current !== void 0 && (clearTimeout($t.current), $t.current = void 0);
  }, []), kt = _(() => {
    $t.current !== void 0 && (qt(), Me.current(!0));
  }, [qt]), kr = _(() => {
    qt(), $t.current = setTimeout(() => {
      $t.current = void 0, Me.current(!0);
    }, Xs);
  }, [qt]);
  U(() => {
    var T, I;
    let u, N, y;
    Mt.current = !1, g.current = !1, ie.current = void 0, ct(!0);
    const C = e == null ? void 0 : e.at(0);
    if (A.current = C, K.current = [], Q.current = [], $.current = void 0, Y.current = void 0, C && Vt("note", C)) {
      const z = (T = C.insert.note) == null ? void 0 : T.caller;
      let q = "custom";
      z === Ue ? q = "generated" : z === Fe && (q = "hidden");
      const tt = q === "custom" && z !== void 0 ? z : Ge;
      ft(tt), Lt(tt), R(q), L(q), Rt(((I = C.insert.note) == null ? void 0 : I.style) ?? "f"), u = setTimeout(() => {
        var V, B, lt, dt;
        const M = (B = (V = p.current) == null ? void 0 : V.getNoteOps(0)) == null ? void 0 : B.at(0);
        (lt = p.current) == null || lt.applyUpdate(M ? [C, { delete: 1 }] : [C]), k(), (dt = p.current) == null || dt.focus(), N = requestAnimationFrame(() => {
          y = setTimeout(() => {
            var Ct;
            Dt() || (k(), (Ct = p.current) == null || Ct.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      kt(), J.current = void 0, u && clearTimeout(u), N !== void 0 && cancelAnimationFrame(N), y !== void 0 && clearTimeout(y);
    };
  }, [e, kt, Dt, k]), fe(() => () => kt(), [kt]);
  const Cr = _(() => {
    var u;
    g.current && (St.current || (u = p.current) == null || u.commitPendingMarkerEdits(), kt());
  }, [kt]);
  Zn(
    b,
    () => ({
      flushPendingEdits: Cr,
      focus: () => {
        var u;
        return (u = p.current) == null ? void 0 : u.focus();
      },
      containsFocus: () => {
        const u = O.current;
        return !!u && u.contains(u.ownerDocument.activeElement);
      }
    }),
    [Cr]
  );
  const De = _(() => {
    var u, N;
    if (!St.current) {
      const y = (u = S.current) == null ? void 0 : u.querySelector(".editor-input");
      y != null && y.contains(y.ownerDocument.activeElement) && y.blur(), (N = p.current) == null || N.commitPendingMarkerEdits();
    }
    f ? kt() : (qt(), jt(!0)), n();
  }, [qt, kt, f, n, jt]), Oe = E(De);
  fe(() => {
    Oe.current = De;
  });
  const Pe = E({ book: a.book, chapterNum: a.chapterNum });
  fe(() => {
    (Pe.current.book !== a.book || Pe.current.chapterNum !== a.chapterNum) && (Pe.current = { book: a.book, chapterNum: a.chapterNum }, Oe.current());
  }, [a.book, a.chapterNum]);
  const Hn = () => {
    var I;
    const u = p.current, N = Ks(u == null ? void 0 : u.getUsj());
    if (!u || !N) return;
    const y = ((I = S.current) == null ? void 0 : I.ownerDocument) ?? document, { activeElement: C } = y, T = u.getSelection() ?? ie.current;
    u.setSelection(N);
    try {
      u.copy();
    } finally {
      T ? u.setSelection(T) : u.selectNote(0), u.getSelection(), y.activeElement !== C && (C instanceof HTMLElement && C !== y.body ? C.focus({ preventScroll: !0 }) : y.activeElement instanceof HTMLElement && y.activeElement.blur());
    }
  }, Un = _(
    (u, N) => {
      v == null || v(), R(u), ft(N), Sr(u, N), f && kt();
    },
    [Sr, kt, f, v]
  ), Fn = (u) => {
    var y, C, T, I, z;
    Rt(u), St.current || (y = p.current) == null || y.commitPendingMarkerEdits();
    const N = (T = (C = p.current) == null ? void 0 : C.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (N && Vt("note", N)) {
      N.insert.note && (N.insert.note.style = u);
      const q = (z = (I = N.insert.note) == null ? void 0 : I.contents) == null ? void 0 : z.ops;
      X !== "x" && u === "x" ? q == null || q.forEach((tt) => Js(tt)) : X === "x" && u !== "x" && (q == null || q.forEach((tt) => Ws(tt))), Ae(N), f && kt();
    }
  }, Kn = (u) => {
    Gn(u.contextMarker), wt(u.canRedo);
  }, $n = _(
    (u) => {
      var y, C, T, I, z, q, tt;
      const N = (C = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : C.at(0);
      if (N && Vt("note", N)) {
        u.content.length > 1 && setTimeout(() => {
          var B;
          (B = p.current) == null || B.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const M = (T = N.insert.note) == null ? void 0 : T.style, V = (z = (I = N.insert.note) == null ? void 0 : I.contents) == null ? void 0 : z.ops;
        if (M || At(!1), At(
          M === "x" ? !!(V != null && V.every((B) => {
            var dt, Ct;
            if (!((dt = B.attributes) != null && dt.char)) return !0;
            const lt = ((Ct = B.attributes) == null ? void 0 : Ct.char).style;
            return lt === "xt" || lt === "xo" || lt === "xq";
          })) : !!(V != null && V.every((B) => {
            var dt, Ct;
            if (!((dt = B.attributes) != null && dt.char)) return !0;
            const lt = ((Ct = B.attributes) == null ? void 0 : Ct.char).style;
            return lt === "ft" || lt === "fr" || lt === "fq";
          }))
        ), !Mt.current) {
          Mt.current = !0, Bt.current = JSON.stringify(N), Y.current = N, ct(!0);
          return;
        }
        g.current = !0, br(Y.current, N), Y.current = N, (tt = (q = p.current) == null ? void 0 : q.getOpsAfterNote(0)) != null && tt.length && setTimeout(gr, 0), ct(JSON.stringify(N) === Bt.current), jt(), f && kr();
      } else
        At(!1), ct(!0);
    },
    [
      f,
      jt,
      kr,
      br,
      gr
    ]
  ), Re = _(() => {
    const u = window.getSelection();
    if (!Le.length || !u || u.rangeCount === 0)
      return !1;
    const N = S.current;
    if (!N) return !1;
    const y = u.getRangeAt(0).cloneRange();
    return _e.setSource({
      measure: () => {
        const C = Ds(y);
        return C && Os(C);
      },
      contextElement: N
    }), se(!0), !0;
  }, [Le, _e]), Be = E(() => {
  }), Er = _(
    (u, N, y) => {
      const { anchorRect: C } = u;
      if (!w || !C) return;
      const { hasTextSelection: T } = y;
      ws({
        items: N,
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
        isNoteMarker: (I) => ns(Tt.styleInfo ?? Rr, I),
        sessionCounterRef: zn,
        setSession: xr,
        clearSessionIfCurrent: le,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (I) => Be.current(I),
        show: (I) => w.show({
          items: N.map($s),
          anchor: C,
          keyForwarding: I
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ce,
        focusEditor: () => {
          var I;
          return (I = p.current) == null ? void 0 : I.focus();
        },
        applyItem: (I) => {
          var z;
          return (z = p.current) == null ? void 0 : z.applyMarkerMenuSelection(I, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (I) => {
          (!cn(I) || I.code !== ln) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Vo(I)}`
          );
        }
      });
    },
    [
      w,
      Kt,
      ce,
      Tt.styleInfo,
      xr,
      le
    ]
  ), ue = _(() => {
    var y;
    const u = (y = p.current) == null ? void 0 : y.getMarkerMenuContext();
    if (!u) return !1;
    const N = zo(Tt.styleInfo ?? Rr, u);
    return N.length === 0 ? !1 : (Er(u, N, { hasTextSelection: !!u.hasTextSelection }), !0);
  }, [Er, Tt.styleInfo]);
  ms({
    isSessionOpen: _(() => !!St.current, []),
    dismiss: _(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const Ir = _(
    (u) => {
      if (!w) return;
      ps(u, {
        sessionRef: St,
        editorRef: p,
        palette: w,
        restoreCaret: Kt,
        reopenAtCaret: ue,
        clearSessionIfCurrent: le,
        hasEditorChangedSinceFocus: ce
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      ue,
      Kt,
      le,
      ce
    ]
  );
  U(() => {
    Be.current = Ir;
  }, [Ir]), hs({
    containerRef: S,
    editorRef: p,
    selectionRef: ie,
    baselineRef: Te,
    isSessionOpen: _(() => !!St.current, [])
  }), U(() => {
    const u = () => {
      xt && se(!1);
    };
    return window.addEventListener("click", u), window.addEventListener("blur", u), () => {
      window.removeEventListener("click", u), window.removeEventListener("blur", u);
    };
  }, [xt]), U(() => {
    var u;
    xt && ((u = vr.current) == null || u.focus());
  }, [xt]), U(() => {
    var q, tt;
    const u = () => {
      var M;
      return ((M = S.current) == null ? void 0 : M.querySelector(".editor-input")) ?? void 0;
    };
    if (((q = Tt.view) == null ? void 0 : q.markerMode) === "editable") {
      const M = (B) => {
        var Ct, Ar, Mr, Dr;
        if (Yt(B)) return;
        const lt = St.current, dt = u();
        if (!(!dt || document.activeElement !== dt)) {
          if (lt && w) {
            Be.current(B);
            return;
          }
          if (je(S.current)) {
            B.key === c && (B.preventDefault(), B.stopPropagation());
            return;
          }
          if (B.key === "Enter" && !Dt()) {
            B.preventDefault(), B.stopPropagation(), (Ct = p.current) == null || Ct.selectNote(0), (Ar = p.current) == null || Ar.focus();
            return;
          }
          if (w && B.key === c) {
            if (!Dt()) {
              B.preventDefault(), B.stopPropagation(), (Mr = p.current) == null || Mr.selectNote(0), (Dr = p.current) == null || Dr.focus();
              return;
            }
            ue() && (B.preventDefault(), B.stopPropagation());
          }
        }
      }, V = () => {
        var lt, dt;
        const B = u();
        !B || document.activeElement !== B || Dt() || ((lt = p.current) == null || lt.selectNote(0), (dt = p.current) == null || dt.focus());
      };
      return document.addEventListener("keydown", M, { capture: !0 }), document.addEventListener("paste", V, { capture: !0 }), () => {
        document.removeEventListener("keydown", M, { capture: !0 }), document.removeEventListener("paste", V, { capture: !0 });
      };
    }
    const N = () => {
      const M = u();
      return !M || document.activeElement !== M ? !1 : !je(S.current);
    }, y = (M) => {
      M.key !== "Enter" || Yt(M) || N() && (M.preventDefault(), M.stopPropagation());
    }, C = (M) => {
      M.inputType !== "insertParagraph" && M.inputType !== "insertLineBreak" || N() && (M.preventDefault(), M.stopPropagation());
    }, T = (M) => {
      if (M.key !== c || xt || Yt(M)) return;
      const V = u();
      !V || document.activeElement !== V || (je(S.current) || Re()) && (M.preventDefault(), M.stopPropagation());
    }, I = as((tt = Tt.view) == null ? void 0 : tt.markerMode), z = (M) => {
      const V = u();
      !xt && V && document.activeElement === V && M.key === c ? (M.preventDefault(), Re()) : xt && M.key === "Escape" && (M.preventDefault(), se(!1));
    };
    return document.addEventListener("keydown", z), document.addEventListener("keydown", y, { capture: !0 }), document.addEventListener("beforeinput", C, { capture: !0 }), I && document.addEventListener("keydown", T, { capture: !0 }), () => {
      I && document.removeEventListener("keydown", T, { capture: !0 }), document.removeEventListener("keydown", z), document.removeEventListener("keydown", y, { capture: !0 }), document.removeEventListener("beforeinput", C, { capture: !0 });
    };
  }, [
    xt,
    Re,
    c,
    (Lr = Tt.view) == null ? void 0 : Lr.markerMode,
    Tt.styleInfo,
    w,
    ue,
    Dt
  ]), U(() => {
    const u = O.current;
    if (!f || !u) return;
    const N = (y) => {
      y.key !== "Escape" || y.defaultPrevented || Yt(y) || (y.preventDefault(), y.stopPropagation(), Oe.current());
    };
    return u.addEventListener("keydown", N), () => u.removeEventListener("keydown", N);
  }, [f]), U(() => {
    const u = () => {
      var C, T, I;
      const N = ((C = S.current) == null ? void 0 : C.querySelector(".editor-input")) ?? void 0;
      if (!N || document.activeElement !== N || !document.hasFocus()) return;
      const y = document.getSelection();
      y && !y.isCollapsed || Dt() || ((T = p.current) == null || T.selectNote(0), (I = p.current) == null || I.focus());
    };
    return document.addEventListener("pointerup", u), document.addEventListener("selectionchange", u), () => {
      document.removeEventListener("pointerup", u), document.removeEventListener("selectionchange", u);
    };
  }, [Dt]);
  const _r = d["%footnoteEditor_copyButton_tooltip%"], Tr = /* @__PURE__ */ o(
    Ls,
    {
      onUndoClick: () => {
        var u;
        return (u = p.current) == null ? void 0 : u.undo();
      },
      onRedoClick: () => {
        var u;
        return (u = p.current) == null ? void 0 : u.redo();
      },
      canUndo: !F,
      canRedo: rt,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ m(yt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: O,
        className: h("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: h("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                Gs,
                {
                  isTypeSwitchable: Ft,
                  noteType: X,
                  handleNoteTypeChange: Fn,
                  localizedStrings: d,
                  focusNoteText: de
                }
              ),
              /* @__PURE__ */ o(
                Rs,
                {
                  callerType: P,
                  customCaller: it,
                  updateCaller: Un,
                  localizedStrings: d,
                  focusNoteText: de
                }
              ),
              f && Tr
            ] }),
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(dr, { children: [
              Tr,
              /* @__PURE__ */ o(
                Ja,
                {
                  onCancelClick: n,
                  onAcceptClick: De,
                  canAccept: !F || W !== P || P === "custom" && it !== vt,
                  localizedStrings: d,
                  acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ m(
            "div",
            {
              ref: S,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  As,
                  {
                    editorRef: p,
                    canUndo: !F,
                    canRedo: rt,
                    children: /* @__PURE__ */ o(
                      Ho,
                      {
                        options: Tt,
                        onStateChange: Kn,
                        onUsjChange: $n,
                        defaultUsj: Ys,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(ht, { children: [
                  /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
                    Z,
                    {
                      "aria-label": _r,
                      onClick: Hn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(no, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: _r }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(ur, { open: xt, children: [
      /* @__PURE__ */ o(Ma, { virtualRef: _e.virtualRef }),
      /* @__PURE__ */ o(
        fr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (u) => {
            u.preventDefault(), u.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Us,
            {
              markerMenuItems: Le,
              localizedStrings: d,
              searchRef: vr
            }
          )
        }
      )
    ] })
  ] });
}
const Zs = {
  "refresh-cw": Mo,
  download: Ao,
  house: Lo,
  "book-a": To,
  settings: _o,
  "circle-question-mark": Io,
  "external-link": Eo,
  users: Co,
  "book-copy": ko,
  pencil: So,
  eye: xo,
  "zoom-in": yo,
  "zoom-out": vo,
  scan: No,
  "file-text": bo,
  "panel-bottom": go,
  "message-square-plus": ho,
  "square-function": er,
  "square-x": tr,
  "square-sigma": rr,
  book: mo,
  "book-marked": po,
  "book-open": wo,
  library: fo,
  search: an,
  "message-square": uo,
  "circle-check-big": lo,
  "clipboard-check": co,
  "clipboard-copy": io,
  sparkles: so,
  "undo-2": ao,
  "redo-2": oo
}, wr = Zs, Wc = Object.keys(wr);
function pr(t) {
  return t !== void 0 && Object.hasOwn(wr, t);
}
function Qs(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function ti(t, e) {
  return Object.entries(t).filter(([r, n]) => Dn(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Mn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function Dn(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function ei(t) {
  const e = new Set(t.items.map((n) => n.group)), r = Object.entries(t.groups).filter(
    ([n]) => e.has(n)
  );
  return Mn(t.columns).filter(
    ({ columnKey: n }) => r.some(
      ([a, s]) => Dn(a, s, n)
    )
  ).map(({ columnKey: n, column: a }) => ({
    columnKey: n,
    label: a.label,
    isHeaderHidden: a.isHeaderHidden ?? !1
  }));
}
function On(t) {
  return t.some((e) => pr(e.iconNameBefore) || e.iconPathBefore) ? "icon" : "none";
}
function ri(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: n, items: a }) => {
    if (a.length === 0) return [];
    const s = r ? [e(n)] : [];
    return r = !0, [...s, ...a];
  });
}
function Pn(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((n) => n.group === r).sort((n, a) => n.order - a.order).map(
      (n) => "command" in n ? { item: n } : {
        item: n,
        subGroups: Pn(
          t,
          Qs(t.groups, n.id)
        )
      }
    )
  }));
}
function ni(t) {
  return t ? {
    columns: Mn(t.columns).map((e) => ({
      ...e,
      groups: Pn(t, ti(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function oi(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = ut(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Yr(t, e, r) {
  const n = ut(e);
  return t.some(
    (a) => ut(a.projectId) === n && a.scrollGroupId === r
  );
}
function ze(t) {
  const e = oi(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : ut(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(ut(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((c) => c.scrollGroupId),
        isSelected: a !== void 0 && a === ut(s.id),
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
    const s = e.get(ut(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Yr(r, a.id, void 0),
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
        isSelected: Yr(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = ut(a.projectId);
    if (n.some(
      (c) => ut(c.projectId) === s && c.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((c) => ut(c.id) === s);
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
const mr = "Selected", hr = "Unselected";
function Zr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Ht(t, e) {
  const r = Jo(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Xe(t) {
  return [{ kind: "flat", rows: [...t].sort(Ht) }];
}
function ai(t) {
  const e = t.filter(Zr).sort(Ht), r = t.filter((a) => !Zr(a)).sort(Ht);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function si(t, e) {
  const r = t.filter((i) => i.isSelected).sort(Ht), n = t.filter((i) => !i.isSelected).sort(Ht), a = (i, c) => {
    var l;
    const d = (l = e.getSectionHeading) == null ? void 0 : l.call(
      e,
      i,
      c.map((f) => f.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? mr : hr;
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
function ii(t, e) {
  if (e.id === "openTabs") return ai(t);
  if (e.id === "selection") return si(t, e);
  if (!e.getGroupKey) return Xe(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((c) => {
    const d = a(c.project);
    if (d === void 0 || d === "") {
      n.push(c);
      return;
    }
    const l = r.get(d);
    l ? l.push(c) : r.set(d, [c]);
  });
  const s = [...r.entries()].map(([c, d]) => {
    var b;
    const l = [...d].sort(
      (x, w) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, w.project)) || Ht(x, w);
      }
    ), f = ((b = e.getSectionHeading) == null ? void 0 : b.call(
      e,
      c,
      l.map((x) => x.project)
    )) ?? c;
    return { key: c, heading: f, rows: l };
  });
  s.sort((c, d) => c.key === e.priorityKey ? -1 : d.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: c.key, heading: c.heading },
    { key: d.key, heading: d.heading }
  ) : c.heading.localeCompare(d.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: c, heading: d, rows: l }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: c,
    label: d,
    rows: l,
    isPriority: c === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(Ht)
  }), i;
}
const Xc = [
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
function H(t, e) {
  const r = t[e];
  if (!(typeof r != "string" || !Cn(r)))
    return r;
}
const pe = "recent", ci = "other";
function Rn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function li(t) {
  const e = t ?? {};
  return [
    Rn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Xt.lastUsedAt]) == "number" ? pe : ci;
      },
      getSectionHeading: (r) => r === pe ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === pe ? -1 : n.key === pe ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Xt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Xt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (c) => {
            var d;
            return typeof ((d = c.customData) == null ? void 0 : d[Xt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Xt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Yc = li();
function di(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? mr : e.unselectedSectionHeading ?? hr
  };
}
function Zc(t) {
  return {
    openTabsLabel: H(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: H(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: H(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: H(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: H(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: H(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: H(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: H(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function Qc(t) {
  return {
    label: H(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: H(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: H(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const ui = 100, ot = {
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
  autoSelectionSelectedSectionHeading: mr,
  autoSelectionUnselectedSectionHeading: hr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function fi(t) {
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
function tl(t) {
  return {
    searchPlaceholder: H(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: H(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: H(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: H(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: H(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: H(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: H(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: H(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: H(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: H(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: H(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: H(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: H(t, "%projectSelector_openButtonLabel%"),
    clearAll: H(t, "%projectSelector_clearAll%")
  };
}
function te(t) {
  return ya[Wo(t)] ?? String(t);
}
const Qr = "platform.footerAction", wi = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function pi({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = te(t);
  return e ? /* @__PURE__ */ o(
    Ne,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: wi,
      children: r
    }
  ) : /* @__PURE__ */ o(Ne, { variant: "secondary", children: r });
}
function mi({
  row: t,
  mode: e,
  strings: r,
  onClick: n,
  onOpen: a,
  selectedRowRef: s,
  indicator: i,
  reserveIndicatorSlot: c
}) {
  const {
    ref: d,
    open: l,
    onPointerEnter: f,
    onPointerLeave: b
  } = ja(), [x, w] = D(!1), v = en(), p = t.isDisabled && !!t.disabledReason, S = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, O = l || x, G = _(() => {
    if (S) {
      w(!0);
      return;
    }
    f();
  }, [S, f]), J = _(() => {
    w(!1), b();
  }, [b]);
  let k;
  e === "project" ? t.openGroups.length > 0 && (k = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((L) => /* @__PURE__ */ o(Ne, { variant: "secondary", children: te(L) }, L)) })) : t.scrollGroupId !== void 0 && (k = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      pi,
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
          /* @__PURE__ */ o(Oo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const P = /* @__PURE__ */ m(
    xe,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      "data-checked": t.isSelected,
      onPointerEnter: G,
      onPointerLeave: J,
      ...p && { "aria-describedby": v },
      className: h(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        c && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Xo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        k,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), R = t.scrollGroupId !== void 0 ? te(t.scrollGroupId) : void 0, W = t.isBoundButClosed && R ? r.boundButClosedTooltip.replace("{group}", R) : void 0;
  return /* @__PURE__ */ m(ht, { open: O, delayDuration: 400, children: [
    /* @__PURE__ */ o(gt, { asChild: !0, children: P }),
    /* @__PURE__ */ m(
      bt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: dn(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && R && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              R,
              ")"
            ] })
          ] }),
          W && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: W }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Wt = "none";
function hi({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Wt;
  return /* @__PURE__ */ m(re, { children: [
    /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(ne, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          variant: "ghost",
          size: "sm",
          className: h(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": n.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ o(Do, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(bt, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      oe,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ye },
        children: [
          /* @__PURE__ */ o(Ee, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(Fa, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Kr, { value: Wt, children: n.groupByNone }),
            /* @__PURE__ */ o(ae, {}),
            t.map((s) => /* @__PURE__ */ o(Kr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function gi(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Wt) return Wt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Wt;
}
function el(t) {
  const [e, r] = D(!1), [n, a] = D(""), s = at(() => fi(t.localizedStrings), [t.localizedStrings]), i = at(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(Rn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      di({
        label: s.autoSelectionGroupingLabel,
        selectedSectionHeading: s.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: s.autoSelectionUnselectedSectionHeading
      })
    ), g;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    s.autoOpenTabsGroupingLabel,
    s.autoSelectionGroupingLabel,
    s.autoSelectionSelectedSectionHeading,
    s.autoSelectionUnselectedSectionHeading
  ]), [c, d] = D(void 0), l = at(
    () => gi(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = c ?? l, b = E(null), [x, w] = D(void 0), v = _((g) => {
    r(g), g || (a(""), w(void 0));
  }, []);
  U(() => {
    if (!e) return;
    const g = window.requestAnimationFrame(() => {
      const A = b.current;
      A && A.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(g);
  }, [e]);
  const p = at(() => t.mode === "project" ? ze({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? ze({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : ze({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), S = at(() => {
    const g = n.trim().toLowerCase();
    return g ? p.filter(
      (A) => A.shortName.toLowerCase().includes(g) || (A.fullName ?? "").toLowerCase().includes(g)
    ) : p;
  }, [p, n]), O = at(
    () => new Map(t.projects.map((g) => [ut(g.id), g])),
    [t.projects]
  ), G = _(
    (g) => g === void 0 ? void 0 : O.get(ut(g)),
    [O]
  ), { renderProjectIndicator: J } = t, k = _(
    (g) => J ? J(g.project) : void 0,
    [J]
  ), P = !!J, R = !!t.footerAction && S.length === 0, W = at(() => {
    if (f === Wt) return Xe(S);
    const g = i.find((A) => A.id === f);
    return g ? ii(S, g) : Xe(S);
  }, [S, f, i]), L = (g) => {
    if (g.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
    }
  }, it = (g) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: g.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const A = t.selection.pairs, K = ut(g.projectId), Q = (Y) => ut(Y.projectId) === K && Y.scrollGroupId === g.scrollGroupId, $ = A.some(Q) ? A.filter((Y) => !Q(Y)) : [
          ...A.filter((Y) => !Q(Y)),
          { projectId: g.projectId, scrollGroupId: g.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: $ });
        return;
      }
      case "projectScrollGroup": {
        if (g.isBoundButClosed && g.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(g.projectId, g.scrollGroupId), r(!1);
          return;
        }
        if (g.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: g.projectId,
            scrollGroupId: g.scrollGroupId
          }), r(!1);
          return;
        }
        const A = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: g.projectId, scrollGroupId: A }), t.onOpenProjectInGroup(g.projectId, A), r(!1);
      }
    }
  }, ft = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, vt = t.mode === "project" ? t.renderTriggerLabel : void 0, Lt = t.mode === "project" ? t.triggerLabelFormat : void 0, X = at(() => {
    switch (t.mode) {
      case "project": {
        const g = G(t.selection.projectId);
        if (vt)
          return { node: vt(g), title: "", hasSelection: !!g };
        let A = g ? g.shortName : s.buttonPlaceholder;
        return g && Lt === "shortNameAndFullName" && (A = dn(g)), { node: A, title: A, hasSelection: !!g };
      }
      case "project-multi": {
        const { pairs: g } = t.selection;
        if (g.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const A = [];
        if (g.forEach(($) => {
          const Y = G($.projectId);
          Y && A.push({ project: Y, scrollGroupId: $.scrollGroupId });
        }), A.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const K = A.map(
          ({ project: $, scrollGroupId: Y }) => Y === void 0 ? $.shortName : `${$.shortName} (${te(Y)})`
        ).join(", "), Q = A.length.toString();
        return {
          node: /* @__PURE__ */ m(yt, { children: [
            /* @__PURE__ */ o(Ne, { variant: "muted", className: "tw:shrink-0", children: Q }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: K })
          ] }),
          title: `${Q} ${K}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = G(t.selection.projectId);
        if (!g) {
          const Q = s.buttonPlaceholder;
          return { node: Q, title: Q, hasSelection: !1 };
        }
        const A = t.selection.scrollGroupId;
        if (A === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const K = te(A);
        return {
          node: `${g.shortName} · ${K}`,
          title: `${g.shortName} · ${K}`,
          accessibleTitle: `${g.shortName}, ${K}`,
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
    vt,
    Lt,
    s.buttonPlaceholder
  ]), Rt = E(null), [Ft, At] = D(!1);
  U(() => {
    const g = Rt.current;
    if (!g) return;
    const A = (Q) => {
      At(Q < ui);
    };
    if (A(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const K = new ResizeObserver((Q) => {
      Q.forEach(($) => {
        const [Y] = $.borderBoxSize;
        A(Y ? Y.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return K.observe(g, { box: "border-box" }), () => K.disconnect();
  }, []);
  let F;
  t.isLoading ? F = /* @__PURE__ */ o(Po, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ft ? F = void 0 : t.mode === "project-multi" ? F = /* @__PURE__ */ o(on, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : F = /* @__PURE__ */ o(Ro, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const ct = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? L : void 0, rt = s.ariaLabel && X.hasSelection && X.title ? `${s.ariaLabel}: ${X.accessibleTitle ?? X.title}` : s.ariaLabel || void 0, wt = /* @__PURE__ */ m(
    Z,
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": rt,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: h(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        Ft && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof X.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: X.node }) : X.node }),
        F
      ]
    }
  ), Mt = X.title ? /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(ht, { children: [
    /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(Ve, { asChild: !0, children: wt }) }),
    /* @__PURE__ */ o(bt, { dir: "auto", children: X.title })
  ] }) }) : /* @__PURE__ */ o(Ve, { asChild: !0, children: wt }), Bt = i.length > 1;
  return /* @__PURE__ */ m(ur, { open: e, onOpenChange: v, children: [
    Mt,
    /* @__PURE__ */ o(
      fr,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(
          ar,
          {
            shouldFilter: !1,
            value: R ? x ?? Qr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  sr,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  hi,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: ft, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(ir, { children: [
                /* @__PURE__ */ o(cr, { children: s.commandEmptyMessage }),
                W.map((g, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    ee,
                    {
                      children: [
                        /* @__PURE__ */ o(be, { heading: bi(g, s), children: g.rows.map((K) => /* @__PURE__ */ o(
                          mi,
                          {
                            row: K,
                            mode: t.mode,
                            strings: s,
                            onClick: it,
                            onOpen: ct,
                            selectedRowRef: b,
                            indicator: k(K),
                            reserveIndicatorSlot: P
                          },
                          K.rowKey
                        )) }),
                        A < W.length - 1 && /* @__PURE__ */ o($e, { alwaysRender: !0 })
                      ]
                    },
                    `${g.kind}:${g.groupingId ?? ""}:${g.key ?? g.label ?? ""}`
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
                  S.length > 0 && /* @__PURE__ */ o(
                    $e,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    xe,
                    {
                      forceMount: !0,
                      value: Qr,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var g;
                        (g = t.footerAction) == null || g.onSelect(), v(!1);
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
function bi(t, e) {
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
const Ni = rn(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, c) => {
    const d = Nt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: h("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            an,
            {
              className: h(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            pn,
            {
              ref: c,
              className: h(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (l) => e(l.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            Z,
            {
              variant: "ghost",
              size: "icon",
              className: h(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": d === "rtl" },
                { "tw:right-0": d === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(nn, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Ni.displayName = "SearchBar";
const vi = 5;
function rl(t) {
  return va(t).filter(
    (e) => !st.isObsolete(st.bookIdToNumber(e))
  );
}
function yi(t, e) {
  return t.filter((r) => {
    try {
      return Yo(r) === e;
    } catch {
      return !1;
    }
  });
}
const nl = (t, e, r) => yi(t, e).every((n) => r.includes(n));
function xi(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => st.bookIdToNumber(n) > 0).sort((n, a) => st.bookIdToNumber(n) - st.bookIdToNumber(a)).map((n) => xa(n, e));
}
function ol(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), s = new Set(e.map((c) => c.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((c) => a.has(c)))
    return r;
  const i = xi(t, n);
  if (i.length !== 0)
    return i.length <= vi ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Si({ name: t, className: e }) {
  const r = pr(t) ? wr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: h("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function me({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const s = n ? "tw:me-2" : "tw:ms-2";
  if (pr(e)) return /* @__PURE__ */ o(Si, { name: e, className: s });
  if (!t && n && a === "icon")
    return /* @__PURE__ */ o(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: h("tw:inline-block tw:w-4 tw:shrink-0", s)
      }
    );
  if (!t) return;
  const i = `${n ? "Leading" : "Trailing"} icon for ${r}`;
  return n ? /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "menu-icon-image-box",
      className: h(
        "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
        s
      ),
      children: /* @__PURE__ */ o("img", { className: "tw:max-h-4 tw:max-w-4", src: t, alt: i })
    }
  ) : /* @__PURE__ */ o("img", { className: h("tw:max-h-4 tw:max-w-4", s), src: t, alt: i });
}
function ki({ checked: t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-hidden": !0,
      "data-slot": "menu-check-slot",
      className: "tw:-me-0.5 tw:inline-flex tw:w-3 tw:shrink-0 tw:items-center tw:justify-center",
      children: t && /* @__PURE__ */ o(ve, { className: "tw:size-3" })
    }
  );
}
const Ci = (t) => cn(t) && (t.code === Zo || t.code === Qo || t.code === ln), Ei = (t) => /* @__PURE__ */ o(ae, {}, `separator-${t}`), Bn = (t, e, r, n) => t.map(({ groupKey: a, items: s }) => ({
  groupKey: a,
  items: s.map(({ item: i, subGroups: c = [] }) => {
    if ("command" in i) {
      const l = i.checked !== void 0, f = /* @__PURE__ */ m(yt, { children: [
        /* @__PURE__ */ o(
          me,
          {
            iconName: i.iconNameBefore,
            icon: i.iconPathBefore,
            menuLabel: i.label,
            leading: !0,
            leadingSlot: r
          }
        ),
        l && /* @__PURE__ */ o(ki, { checked: !!i.checked }),
        i.label,
        /* @__PURE__ */ o(
          me,
          {
            iconName: i.iconNameAfter,
            icon: i.iconPathAfter,
            menuLabel: i.label
          }
        ),
        i.shortcut && /* @__PURE__ */ o(Ka, { className: "tw:ps-4", children: /* @__PURE__ */ o(We, { hint: i.shortcut }) })
      ] }), b = () => {
        e(i);
      };
      return /* @__PURE__ */ m(ht, { children: [
        /* @__PURE__ */ o(gt, { asChild: !0, children: l ? /* @__PURE__ */ o(
          zt,
          {
            className: "tw:ps-1.5 tw:[&>[data-slot=dropdown-menu-checkbox-item-indicator]]:hidden",
            checked: i.checked,
            disabled: i.disabled,
            onSelect: b,
            children: f
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) : /* @__PURE__ */ o(
          Ua,
          {
            disabled: i.disabled,
            onSelect: b,
            children: f
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) }),
        i.tooltip && /* @__PURE__ */ o(bt, { children: i.tooltip })
      ] }, `tooltip-${i.label}-${i.command}`);
    }
    const d = /* @__PURE__ */ m(qa, { disabled: i.disabled, children: [
      /* @__PURE__ */ o(
        me,
        {
          iconName: i.iconNameBefore,
          menuLabel: i.label,
          leading: !0,
          leadingSlot: r
        }
      ),
      i.label,
      /* @__PURE__ */ o(me, { iconName: i.iconNameAfter, menuLabel: i.label })
    ] });
    return /* @__PURE__ */ m($a, { children: [
      i.tooltip ? /* @__PURE__ */ m(ht, { children: [
        /* @__PURE__ */ o(gt, { asChild: !0, children: d }),
        /* @__PURE__ */ o(bt, { children: i.tooltip })
      ] }) : d,
      /* @__PURE__ */ o(za, { children: /* @__PURE__ */ o(Va, { ...n, children: ri(
        Bn(
          c,
          e,
          On(
            c.flatMap((l) => l.items.map(({ item: f }) => f))
          ),
          n
        ),
        Ei
      ) }) })
    ] }, `dropdown-menu-sub-${i.label}-${i.id}`);
  })
}));
function jn({
  onSelectMenuItem: t,
  menuData: e,
  showSectionHeadings: r = !1,
  submenuContentProps: n
}) {
  const a = en(), s = at(() => ni(e), [e]), i = ei(e), c = r && i.length > 1, d = new Map(
    s.columns.map(({ columnKey: b, groups: x }) => [b, x])
  ), l = (b) => d.get(b) ?? [], f = On(
    i.flatMap(
      ({ columnKey: b }) => l(b).flatMap((x) => x.items.map(({ item: w }) => w))
    )
  );
  return i.map(({ columnKey: b, label: x, isHeaderHidden: w }, v) => {
    const p = `${a}-${b}`;
    return /* @__PURE__ */ m(ee, { children: [
      /* @__PURE__ */ m(Ha, { "aria-labelledby": c ? p : void 0, children: [
        c && // A section shown without its heading keeps it for assistive technology only
        /* @__PURE__ */ o(Ee, { id: p, className: w ? "tw:sr-only" : void 0, children: x }),
        /* @__PURE__ */ o(Et, { children: Bn(
          l(b),
          t,
          f,
          n
        ).flatMap((S) => S.items) })
      ] }),
      v < i.length - 1 && /* @__PURE__ */ o(ae, {})
    ] }, b);
  });
}
function al({
  anchor: t,
  onClose: e,
  focusFirstItem: r = !1,
  contentProps: n,
  ...a
}) {
  const s = _(
    (i) => {
      !i || !r || requestAnimationFrame(
        () => {
          var c;
          return (c = i.querySelector('[role^="menuitem"]:not([data-disabled])')) == null ? void 0 : c.focus({ preventScroll: !0 });
        }
      );
    },
    [r]
  );
  return /* @__PURE__ */ m(
    re,
    {
      open: !0,
      modal: !1,
      onOpenChange: (i) => {
        i || e();
      },
      children: [
        /* @__PURE__ */ o(ne, { asChild: !0, children: /* @__PURE__ */ o(
          "button",
          {
            type: "button",
            style: {
              position: "fixed",
              left: t.x,
              top: t.y,
              width: t.width,
              height: t.height,
              padding: 0,
              margin: 0,
              border: "none",
              opacity: 0,
              pointerEvents: "none"
            },
            "aria-hidden": !0,
            tabIndex: -1
          }
        ) }),
        /* @__PURE__ */ o(
          oe,
          {
            ref: s,
            align: "start",
            side: "bottom",
            onCloseAutoFocus: (i) => i.preventDefault(),
            ...n,
            children: /* @__PURE__ */ o(jn, { ...a })
          }
        )
      ]
    }
  );
}
function sl({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  showSectionHeadings: s = !1,
  openMenuInOverlay: i,
  variant: c,
  buttonVariant: d = "ghost",
  id: l
}) {
  Ga();
  const f = E(null), b = () => Ia(f.current ?? void 0), [x, w] = D(!1), v = E(!1);
  if (i) {
    const p = async (S) => {
      const O = f.current;
      if (!O || x) return;
      const { x: G, y: J, width: k, height: P } = O.getBoundingClientRect();
      w(!0);
      let R;
      try {
        R = await i(e, {
          anchor: { x: G, y: J, width: k, height: P },
          focusFirstItem: S
        });
      } catch (W) {
        Ci(W) || console.error("TabDropdownMenu: could not open the menu in the overlay", W);
      } finally {
        w(!1);
      }
      R && Hr() === "pointer" && Ur(O), R && t(R);
    };
    return /* @__PURE__ */ o(
      Z,
      {
        ref: f,
        id: l,
        "aria-label": r,
        "aria-haspopup": "menu",
        "aria-expanded": x,
        variant: d,
        size: "icon",
        className: h(Fr, a),
        onPointerDown: () => {
          v.current = x;
        },
        onClick: (S) => {
          const O = S.detail === 0;
          !O && v.current || p(O);
        },
        onKeyDown: (S) => {
          b(), S.key === "ArrowDown" && (S.preventDefault(), p(!0));
        },
        onBlur: b,
        children: n ?? /* @__PURE__ */ o(Or, {})
      }
    );
  }
  return /* @__PURE__ */ m(re, { variant: c, children: [
    /* @__PURE__ */ o(ne, { "aria-label": r, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(
      Z,
      {
        ref: f,
        variant: d,
        size: "icon",
        className: Fr,
        onKeyDown: b,
        onBlur: b,
        children: n ?? /* @__PURE__ */ o(Or, {})
      }
    ) }),
    /* @__PURE__ */ o(
      oe,
      {
        align: "start",
        style: { zIndex: or },
        onCloseAutoFocus: () => {
          Hr() === "pointer" && Ur(f.current ?? void 0);
        },
        children: /* @__PURE__ */ o(
          jn,
          {
            menuData: e,
            onSelectMenuItem: t,
            showSectionHeadings: s
          }
        )
      }
    )
  ] });
}
function il({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: h("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function Ii({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function _i({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-header",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Ti = Pt(
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
function Li({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ti({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function cl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-title",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
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
      "data-slot": "empty-description",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function Mi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-content",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function ll({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Ii, { className: h(s), role: a, children: [
    /* @__PURE__ */ m(_i, { children: [
      /* @__PURE__ */ o(Li, { variant: "icon", children: n ?? /* @__PURE__ */ o(Bo, {}) }),
      /* @__PURE__ */ o(Ai, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Mi, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const Di = rn(({ className: t, ...e }, r) => /* @__PURE__ */ o(jo, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
Di.displayName = "Spinner";
function dl({
  currentStep: t,
  totalSteps: e,
  locale: r,
  completedSteps: n
}) {
  const a = r || "en", s = at(() => {
    const d = new ta(a);
    return (l) => d.format(l);
  }, [a]), i = Math.min(Math.max(t, 1), e), c = Array.from({ length: e }, (d, l) => l + 1);
  return /* @__PURE__ */ o("div", { className: "tw:flex tw:items-center", "aria-hidden": "true", children: c.map((d) => {
    let l = "upcoming";
    return d === i ? l = "active" : (n ? n.includes(d) : d < i) && (l = "complete"), /* @__PURE__ */ m(ee, { children: [
      d > 1 && /* @__PURE__ */ o("div", { className: "tw:h-px tw:flex-1 tw:bg-border" }),
      /* @__PURE__ */ o(
        "div",
        {
          "data-state": l,
          className: h(
            "tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-full tw:text-sm tw:font-medium",
            l === "active" && "tw:bg-primary tw:text-primary-foreground",
            l === "complete" && "tw:bg-muted tw:text-muted-foreground",
            l === "upcoming" && "tw:border tw:border-input tw:text-muted-foreground"
          ),
          children: l === "complete" ? /* @__PURE__ */ o(Qe, { className: "tw:h-4 tw:w-4" }) : s(d)
        }
      )
    ] }, d);
  }) });
}
const Oi = Pt(
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
function ul({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Oi({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function fl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-title",
      className: h(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function wl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-description",
      className: h(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function pl({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    nr.Group,
    {
      "data-slot": "resizable-panel-group",
      className: h(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: n ?? e,
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...a
    }
  );
}
function he(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function ml({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    nr.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: he(t),
      minSize: he(e),
      maxSize: he(r),
      collapsedSize: he(n),
      ...a
    }
  );
}
function hl({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    nr.Separator,
    {
      "data-slot": "resizable-handle",
      className: h(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  zt as $,
  bc as A,
  Z as B,
  xe as C,
  re as D,
  dr as E,
  yn as F,
  ir as G,
  cr as H,
  _c as I,
  Lc as J,
  rc as K,
  vc as L,
  ac as M,
  sc as N,
  dc as O,
  uc as P,
  cc as Q,
  Tc as R,
  Ie as S,
  Et as T,
  Ja as U,
  Ac as V,
  Ne as W,
  _a as X,
  Oc as Y,
  Dc as Z,
  ae as _,
  xa as a,
  Xs as a$,
  Sa as a0,
  or as a1,
  Gc as a2,
  Hc as a3,
  Pc as a4,
  Rc as a5,
  zc as a6,
  Bc as a7,
  Ha as a8,
  Fa as a9,
  We as aA,
  wa as aB,
  ma as aC,
  Je as aD,
  ul as aE,
  wl as aF,
  fl as aG,
  yc as aH,
  oc as aI,
  lc as aJ,
  fa as aK,
  ua as aL,
  nc as aM,
  za as aN,
  Ka as aO,
  $a as aP,
  Va as aQ,
  qa as aR,
  As as aS,
  Ii as aT,
  Mi as aU,
  Ai as aV,
  _i as aW,
  Li as aX,
  il as aY,
  cl as aZ,
  Jc as a_,
  Kr as aa,
  Fc as ab,
  Vc as ac,
  qc as ad,
  pn as ae,
  el as af,
  Ni as ag,
  rl as ah,
  yi as ai,
  $e as aj,
  hc as ak,
  nl as al,
  xc as am,
  gn as an,
  ic as ao,
  ya as ap,
  sl as aq,
  En as ar,
  ke as as,
  Ce as at,
  Nn as au,
  ni as av,
  ri as aw,
  On as ax,
  me as ay,
  ki as az,
  Ga as b,
  $s as b$,
  bs as b0,
  Us as b1,
  Ma as b2,
  Cc as b3,
  Sc as b4,
  kc as b5,
  hl as b6,
  ml as b7,
  pl as b8,
  ll as b9,
  Ms as bA,
  pc as bB,
  al as bC,
  Wc as bD,
  Si as bE,
  Wt as bF,
  ot as bG,
  Xc as bH,
  Ec as bI,
  Kc as bJ,
  $c as bK,
  da as bL,
  Zc as bM,
  tl as bN,
  Qc as bO,
  Tn as bP,
  us as bQ,
  Yc as bR,
  os as bS,
  ls as bT,
  Da as bU,
  ds as bV,
  fs as bW,
  je as bX,
  ns as bY,
  li as bZ,
  di as b_,
  Di as ba,
  Uc as bb,
  jc as bc,
  Ic as bd,
  Ls as be,
  dl as bf,
  ye as bg,
  tc as bh,
  Qi as bi,
  la as bj,
  ca as bk,
  Yi as bl,
  Xi as bm,
  Zi as bn,
  Wi as bo,
  Ya as bp,
  Ta as bq,
  un as br,
  Dn as bs,
  mn as bt,
  Xr as bu,
  Mc as bv,
  Os as bw,
  Ds as bx,
  hn as by,
  es as bz,
  h as c,
  ec as c0,
  as as c1,
  ss as c2,
  ps as c3,
  ws as c4,
  It as c5,
  ol as c6,
  ms as c7,
  hs as c8,
  gs as c9,
  ht as d,
  gt as e,
  bt as f,
  gc as g,
  Hr as h,
  ne as i,
  oe as j,
  Ee as k,
  Ua as l,
  wc as m,
  Nc as n,
  be as o,
  Nt as p,
  Na as q,
  nt as r,
  mc as s,
  ur as t,
  ja as u,
  Ve as v,
  fr as w,
  fc as x,
  ar as y,
  sr as z
};
//# sourceMappingURL=resizable-P_vVbF8M.js.map
