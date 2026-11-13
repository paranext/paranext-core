import { jsx as o, jsxs as m, Fragment as yt } from "react/jsx-runtime";
import { Slot as ze, Dialog as kt, Separator as yn, Popover as Zt, Tooltip as Vt, DropdownMenu as tt, Label as xn, RadioGroup as De } from "radix-ui";
import { IconX as Sn, IconCheck as He, IconSearch as kn, IconChevronLeft as Cn, IconChevronRight as En } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import ft, { useRef as C, useEffect as F, useCallback as T, useState as O, createContext as In, useContext as _n, useMemo as wt, Fragment as Hr, useLayoutEffect as se, useImperativeHandle as Tn, useId as Ln, forwardRef as Ur } from "react";
import { X as Fr, Check as pe, ChevronsUpDown as Kr, Star as An, Undo as Dn, Redo as Mn, SquareX as Ue, FunctionSquare as Fe, SquareSigma as Ke, Ban as Pn, Copy as On, SquareDashedText as Rn, NotebookTabs as Bn, Sparkles as jn, ClipboardCheck as Gn, CircleCheckBig as zn, MessageSquare as Hn, Search as $r, Library as Un, BookOpen as Fn, BookMarked as Kn, Book as $n, MessageSquarePlus as qn, PanelBottom as Vn, FileText as Jn, Scan as Xn, ZoomOut as Wn, ZoomIn as Zn, Eye as Yn, Pencil as Qn, BookCopy as to, Users as eo, ExternalLink as ro, CircleQuestionMark as no, Settings as oo, BookA as ao, House as so, Download as io, RefreshCw as lo, Group as co, ArrowRight as uo, Loader2 as wo, ChevronDown as fo, AlertTriangle as po, LoaderCircle as mo } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as Sr, GENERATOR_NOTE_CALLER as Me, HIDDEN_NOTE_CALLER as Pe, isInsertEmbedOpOfType as qt, getDefaultViewOptions as ho, getMarkerMenuItems as go, defaultStyleInfo as kr, Editorial as bo } from "@eten-tech-foundation/platform-editor";
import { Section as Pt, MODIFIER_KEYS as No, split as qr, slice as vo, formatReplacementString as yo, usfmMarkers as ie, deepEqual as Gt, isPlatformError as xo, ABORTED as So, getErrorMessage as ko, normalizeProjectId as it, compareProjectsByName as Co, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Vr, getLocalizeKeyForScrollGroupId as Eo, hasDistinctFullName as Io, getSectionForBook as _o } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as $e from "react-resizable-panels";
import { clsx as To } from "clsx";
import { extendTailwindMerge as Lo, twMerge as Ao } from "tailwind-merge";
const Do = Lo({ prefix: "tw" });
function Oe(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Mo(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Oe(t), r = e.findIndex((s) => s.startsWith("-tw-"));
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
function Po(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Oe(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Oe(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
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
  const e = To(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Do(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const u = Mo(d);
    n.set(u.normalized, u.original), a.push(u.normalized);
  }), Ao(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const u = n.get(d);
    return u ? Po(d, u) : d;
  }).join(" ");
}
const Jr = 600, me = 650, Vs = 400, Oo = 450, Ro = 500, Js = 510, Xs = 520, Bo = 675, Ws = 690, Zs = 700, Ys = 800, Xr = Ot(
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
function Y({
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
      className: g(Xr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Wr = "layoutDirection";
function Zr() {
  return globalThis.localStorage ?? void 0;
}
function ht() {
  var t;
  try {
    const e = (t = Zr()) == null ? void 0 : t.getItem(Wr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Qs(t) {
  var e;
  try {
    (e = Zr()) == null || e.setItem(Wr, t);
  } catch {
  }
}
function ti({ ...t }) {
  return /* @__PURE__ */ o(kt.Root, { "data-slot": "dialog", ...t });
}
function ei({ ...t }) {
  return /* @__PURE__ */ o(kt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function jo({ ...t }) {
  return /* @__PURE__ */ o(kt.Portal, { "data-slot": "dialog-portal", ...t });
}
function ri({ ...t }) {
  return /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", ...t });
}
function Go({
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
      style: { zIndex: Oo, ...e },
      ...r
    }
  );
}
function ni({
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
  const l = ht();
  return /* @__PURE__ */ m(jo, { children: [
    /* @__PURE__ */ o(Go, { className: n, style: a }),
    /* @__PURE__ */ m(
      kt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ro, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(kt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Y, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Sn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function oi({ className: t, ...e }) {
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
function ai({
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
        e && /* @__PURE__ */ o(kt.Close, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function si({ className: t, ...e }) {
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
function ii({
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
function Yr({ className: t, type: e, ...r }) {
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
function zo({ className: t, ...e }) {
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
const Ho = Ot(
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
function Uo({
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
        className: g(Ho({ align: e }), t),
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
function qe({ className: t, ...e }) {
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
function Ve({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = ht(), s = ft.useCallback(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(zo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ o(Uo, { children: /* @__PURE__ */ o(kn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Je({ className: t, ...e }) {
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
function Xe({
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
function Re({
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
function he({
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
function Fo({ className: t, ...e }) {
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
const Ko = [
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
], $o = (t) => {
  var e;
  return ((e = Ko[t]) == null ? void 0 : e.chapters) ?? -1;
}, qo = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function Vo(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function R(t) {
  return `%scrollGroup_${t}%`;
}
const Jo = {
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
function We(t, e) {
  return $o(ot.bookIdToNumber(t));
}
function ge(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = ot.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
function li(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = ge(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(We(s), 1),
      verseNum: 1
    };
}
function ci(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < We(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = ge(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function di(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = ge(n, e, "previous");
  if (!i) return;
  const l = Math.max(We(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function ui(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = ge(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function wi(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const fi = (t, e, r, n, a) => {
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
}, pi = (t, e, r, n, a) => {
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
function mi(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function Xo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const hi = Object.fromEntries(
  qo.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function gi(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function Qr() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function tn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function en(t) {
  tn(document, Qr()) || t();
}
function Cr(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Er(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function Wo(t, e) {
  const [r] = O(Qr), n = C(t);
  n.current = t;
  const a = C(e);
  return a.current = e, T(
    (s) => {
      var d, u;
      if ((d = n.current) == null || d.call(n, s), s.defaultPrevented) return;
      if (tn(document, r)) {
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
const rn = Symbol.for("platform-bible-react.window-blur-press");
function Zo(t) {
  return Reflect.get(t, rn) === !0;
}
function nn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = C(void 0), n = C(void 0), a = C(void 0);
  F(() => {
    const u = () => {
      const w = r.current;
      if (!w || w.dataset.state === "closed") return;
      const y = w.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, f = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(f, rn, { value: !0 }), y.dispatchEvent(f);
    };
    return window.addEventListener("blur", u), () => window.removeEventListener("blur", u);
  }, []);
  const s = T(
    (u) => {
      if (r.current = u ?? void 0, u && u !== n.current && (n.current = u, a.current = Cr(u) ?? Er(u)), typeof t == "function") {
        const w = t(u);
        if (typeof w == "function")
          return () => {
            r.current = void 0, w();
          };
      } else t && (t.current = u);
    },
    [t]
  ), i = T(() => {
    var x;
    const u = n.current, w = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (u && Cr(u)) ?? w ?? (u && Er(u));
    return y != null && y.isConnected ? y : void 0;
  }, []), l = Wo(
    e,
    i
  ), d = T(
    (u) => {
      l(u), r.current || (n.current = void 0, a.current = void 0);
    },
    [l]
  );
  return { ref: s, onCloseAutoFocus: d };
}
const Ir = `
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
function Yo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${Ir}, ${e}` : Ir;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Yo(n)
  );
}
const bi = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Be = "keyboard", _r = !1;
function Ni() {
  _r || typeof document > "u" || (_r = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      Zo(t) || (Be = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Be = "keyboard";
    },
    !0
  ));
}
function vi() {
  return Be;
}
const on = "data-quiet-focus";
function yi(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(on, ""), t.style.outline = "none"));
}
function xi(t) {
  t && (t.removeAttribute(on), t.style.removeProperty("outline"));
}
const Si = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function Qo({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    yn.Root,
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
const ta = Ot(
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
        ta({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function ki({
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
function an({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    Qo,
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
function sn() {
  const t = ft.createContext(null);
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return ft.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
function Ye({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function je({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: ea, usePortalContainer: ra } = sn(), Ci = ea;
function Qe({
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
  const l = ht(), d = ra(), u = nn({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: d, children: /* @__PURE__ */ o(
      Zt.Content,
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
        style: { zIndex: Jr, ...n },
        dir: l,
        ...i
      }
    ) })
  );
}
function na({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Ei({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Ii({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function _i({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function _t({
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
      className: e ? g(Xr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: oa, usePortalContainer: aa } = sn(), Ti = oa;
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
  const l = aa();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: l, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Bo, ...r },
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
const sa = /^%[^%]*%$/;
function ln(t) {
  return t !== void 0 && !sa.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return ln(t) ? t : e;
}
function ia() {
  const [t, e] = O(!1), r = C(null), n = T(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = T(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const cn = In(void 0);
function be() {
  const t = _n(cn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ne = Ot("", {
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
function tr({ variant: t = "default", ...e }) {
  const r = ht(), n = ft.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(cn.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Li({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function er({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function rr({
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
  const d = ht(), u = nn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
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
      style: { zIndex: Jr, ...n },
      ...l,
      children: /* @__PURE__ */ o("div", { dir: d, children: a })
    }
  ) });
}
function Ai({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Di({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = ht(), s = be();
  return /* @__PURE__ */ o(
    tt.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: g(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: s.variant })
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
  const s = ht(), i = be();
  return /* @__PURE__ */ m(
    tt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: i.variant })
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(He, {}) })
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
  return /* @__PURE__ */ o(tt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Tr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = ht(), s = be();
  return /* @__PURE__ */ m(
    tt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(He, {}) })
          }
        ),
        e
      ]
    }
  );
}
function nr({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    tt.Label,
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
function or({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    tt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Mi({ className: t, ...e }) {
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
function Pi({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Oi({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = be(), s = ht();
  return /* @__PURE__ */ m(
    tt.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Ne({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(Cn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(En, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ri({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = ht();
  return /* @__PURE__ */ o(
    tt.SubContent,
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
      style: { zIndex: me, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function Bi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    xn.Root,
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
function ji({
  className: t,
  ...e
}) {
  const r = ht();
  return /* @__PURE__ */ o(
    De.Root,
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
function Gi({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    De.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        De.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const zi = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Lr = (t, e) => t[e] ?? e;
function ca({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Lr(n, "%cancelButton_tooltip%"), l = s ?? Lr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Fr, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(an, {}),
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(pe, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function ve() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Hi() {
  return /Windows/i.test(navigator.userAgent);
}
const da = ["input", "select", "textarea", "button"], ua = ["button", "textbox"], Ui = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = C(null), [s, i] = O(void 0), [l, d] = O(void 0), u = T(
    (f) => {
      i(f);
      const v = t.find((E) => E.id === f);
      v && (e == null || e(v));
      const p = document.getElementById(f);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), w = T(
    (f) => {
      const v = t.find((p) => p.id === f);
      v && (d((p) => p === f ? void 0 : f), r == null || r(v));
    },
    [r, t]
  ), y = (f) => {
    if (!f) return !1;
    const v = f.tagName.toLowerCase();
    if (f.isContentEditable || da.includes(v)) return !0;
    const p = f.getAttribute("role");
    if (p && ua.includes(p)) return !0;
    const E = f.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, x = T(
    (f) => {
      var X;
      const v = f.target, p = (D) => D ? document.getElementById(D) : void 0, E = p(l), H = p(s);
      if (!!(E && v && E.contains(v) && v !== E) && y(v)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !v.isContentEditable) {
          if (l) {
            f.preventDefault(), f.stopPropagation();
            const D = t.find((K) => K.id === l);
            D && u(D.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!E) return;
          const D = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const K = D.findIndex((pt) => pt === v);
          if (K === -1) return;
          let lt;
          f.key === "ArrowDown" ? lt = Math.min(K + 1, D.length - 1) : lt = Math.max(K - 1, 0), lt !== K && (f.preventDefault(), f.stopPropagation(), (X = D[lt]) == null || X.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((D) => D.id === s);
      let P = k;
      switch (f.key) {
        case "ArrowDown":
          P = Math.min(k + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          P = Math.max(k - 1, 0), f.preventDefault();
          break;
        case "Home":
          P = 0, f.preventDefault();
          break;
        case "End":
          P = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const D = H;
          if (D) {
            const K = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), lt = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), pt = K ?? lt;
            if (pt) {
              f.preventDefault(), pt.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (y(v) || (n == null || n(f.key), f.preventDefault()));
          return;
      }
      const q = t[P];
      q && u(q.id);
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
}, wa = Ot(
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
        wa({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function Fi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function dn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function Ki({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = ft.useRef(null);
  ft.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), ft.useEffect(() => {
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
    if (l && dn(i, l)) {
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
function $i({
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
function qi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Vi({ className: t, ...e }) {
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
function fa(t) {
  ft.useEffect(() => {
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
function pa(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ma(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Ji({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = ft.useRef(null);
  ft.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), fa(i);
  const l = ft.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), d = ft.useCallback(
    (w) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!dn(w, y)) {
        e == null || e(w);
        return;
      }
      const x = y.closest("table"), f = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(x).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], v = f.indexOf(y), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), ma(f, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), pa(l, p, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const E = y.closest("table");
        E && E.focus();
      }
      e == null || e(w);
    },
    [i, l, e]
  ), u = ft.useCallback(
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
function Xi({ className: t, ...e }) {
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
function Wi({ className: t, ...e }) {
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
function Zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ha(t, e = !0) {
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
function ga({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = ha(r, e);
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
function Yi({
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
  className: E = void 0,
  variant: H = "ghost",
  id: G
}) {
  const [Z, k] = O(!1), P = C(null), q = T(
    (z) => {
      var et;
      const at = (et = t.find((ct) => ct.label === z)) == null ? void 0 : et.value;
      at && r(
        e.includes(at) ? e.filter((ct) => ct !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), X = () => u || n, D = w ?? Z, K = y ?? k, [lt, pt] = O(D), [Tt, V] = O(e);
  lt !== D && (pt(D), D && V(e));
  const Rt = wt(() => {
    if (!f) return t;
    const z = t.filter((et) => et.starred).sort((et, ct) => et.label.localeCompare(ct.label)), at = t.filter((et) => !et.starred).sort((et, ct) => {
      const At = Tt.includes(et.value), Bt = Tt.includes(ct.value);
      return At && !Bt ? -1 : !At && Bt ? 1 : et.label.localeCompare(ct.label);
    });
    return [...z, ...at];
  }, [t, Tt, f]), Ut = () => {
    const z = t.map((at) => at.value);
    V(z), r(z);
  }, Lt = () => {
    V([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: E, children: /* @__PURE__ */ m(Ye, { open: D, onOpenChange: K, children: [
    /* @__PURE__ */ o(je, { asChild: !0, children: /* @__PURE__ */ m(
      Y,
      {
        variant: H,
        role: "combobox",
        "aria-expanded": D,
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
                children: X()
              }
            )
          ] }),
          /* @__PURE__ */ o(Kr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(Qe, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(qe, { children: [
      /* @__PURE__ */ o(
        Ve,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: Lt, children: l })
      ] }),
      /* @__PURE__ */ o(ga, { isEnabled: v, scrollerRef: P, children: /* @__PURE__ */ m(Je, { ref: P, children: [
        /* @__PURE__ */ o(Xe, { children: d }),
        /* @__PURE__ */ o(we, { children: Rt.map((z) => /* @__PURE__ */ m(
          he,
          {
            value: z.label,
            onSelect: q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                pe,
                {
                  className: g(
                    "tw:h-4 tw:w-4",
                    e.includes(z.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              z.starred && /* @__PURE__ */ o(An, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: z.label }),
              z.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: z.secondaryLabel })
            ]
          },
          z.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function St(t) {
  return t.replace(/^\+/, "");
}
function ba(t, e) {
  if (!t || e === "") return !1;
  const r = St(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && St(n.marker).toLowerCase() === r
  );
}
function Na(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = St(e).toLowerCase();
  return r === "passive" ? Sr({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Sr({
    query: a,
    items: n,
    filter: (s) => St(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function de(t) {
  return t.isComposing || t.keyCode === 229;
}
const un = /^[a-z0-9+-]$/i;
function va(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ve()) && e !== "Dead") {
    if (un.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const ya = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], xa = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Sa() {
  return [...ya, ...xa.filter((t) => un.test(t))];
}
function ut(t) {
  t.preventDefault(), t.stopPropagation();
}
function ka(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (de(t) || No.has(t.key))
    return "passed";
  const a = !ve();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && ut(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return ut(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return ut(t), Na(
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
    return ut(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (ut(t), e.filter === "")
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
    ut(t);
    const d = St(e.filter).toLowerCase(), u = e.items.find(
      (w) => St(w.marker).toLowerCase() === d
    );
    return u && r.commitItem(u.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (ut(t), r.dismiss(), "ended") : (ut(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (ut(t), "continue") : (ut(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return ut(t), r.dismiss(), "ended";
  const s = va(t);
  return t.key === "Backspace" || s !== void 0 ? (ut(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (ut(t), "continue");
}
function Ca(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function wn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Ea(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Ia(t) {
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
  const p = a.current, E = () => a.current === p, H = { kind: r, token: p, filter: "", items: e };
  n && (H.isNoteMarker = n), s(H), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Sa(),
    onKey: (G) => l(G)
  }).then((G) => {
    var k;
    i(p);
    const Z = G ?? ((k = H.itemToApplyOnClose) == null ? void 0 : k.marker);
    if (Z !== void 0) {
      const P = (w == null ? void 0 : w()) ?? !1;
      v();
      const q = P ? void 0 : e.find((X) => X.marker === Z);
      q && x(q);
    } else E() && v();
  }).catch((G) => {
    i(p), E() && v(), f(G);
  });
}
function _a(t, e) {
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
  return ka(t, u, {
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
function Ta({
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
function La({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  F(() => {
    const i = s ?? document, l = (d) => {
      var y, x, f;
      const u = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!u || d.target !== u) return;
      const w = (x = e.current) == null ? void 0 : x.getSelection();
      w ? r.current = w : (f = e.current) != null && f.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = wn(
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
function Aa({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = C(void 0), a = T(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = T(
    (i) => {
      var l;
      Ca(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
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
function Ar({ className: t, ...e }) {
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
function Da({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Ma = /* @__PURE__ */ new Set([
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
function Pa(t) {
  const e = qr(t, "");
  let r = 0;
  for (; r < e.length && Ma.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = vo(t, r);
  return a ? [...n, a] : n;
}
function Oa(t) {
  const e = [];
  let r = "";
  return qr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Ra(t) {
  const e = Pa(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Oa(t), separator: "+" };
}
function Dr({ hint: t }) {
  const { keycaps: e, separator: r } = Ra(t);
  return e.length === 1 ? /* @__PURE__ */ o(Ar, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Da, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Hr, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Ar, { children: n })
      ] }, a)
    )) })
  );
}
const Qi = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Mr = (t, e) => t[e] ?? e;
function Ba({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = ve(), u = Mr(a, "%undoButton_tooltip%"), w = Mr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": u,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(Dn, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        u,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(Dr, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(an, {}),
    e && /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(Mn, {})
        }
      ) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(yt, { children: [
          " ",
          /* @__PURE__ */ o(Dr, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function ja({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = C(null);
  return F(() => {
    var d;
    const s = ve(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (u) => {
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
function Ga() {
  const t = C(void 0), e = C(new DOMRect()), r = C({
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
  return wt(() => ({ virtualRef: r, setSource: n }), [n]);
}
function za(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ha(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Ua = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(yt, { children: [
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
function Fa({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = C(!1), i = C(null), l = C(null), d = C(!1), [u, w] = O(t), [y, x] = O(e), [f, v] = O(!1), p = C(!1), E = C(u);
  E.current = u;
  const H = C(y);
  H.current = y, F(() => {
    w(t);
  }, [t]), F(() => {
    y !== e && x(e);
  }, [e]);
  const G = (k) => {
    if (d.current = !1, v(k), !k) {
      const P = E.current, q = H.current;
      P !== "custom" || q ? (P !== t || q !== e) && (s.current = !0, r(P, q)) : (w(t), x(e));
    }
  }, Z = (k) => {
    var P, q, X, D;
    k.stopPropagation(), document.activeElement === l.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((P = i.current) == null || P.focus(), d.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((q = l.current) == null || q.focus(), d.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((X = i.current) == null ? void 0 : X.selectionStart) === 0 && ((D = l.current) == null || D.focus(), d.current = !1), u === "custom" && k.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ m(tr, { open: f, onOpenChange: G, children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: Ua(t, n, e) }) }) }),
      /* @__PURE__ */ o(It, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      rr,
      {
        style: { zIndex: me },
        onEscapeKeyDown: () => {
          E.current = t, H.current = e, w(t), x(e);
        },
        onCloseAutoFocus: (k) => {
          s.current && (s.current = !1, k.preventDefault(), en(a));
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: Z,
        onMouseMove: () => {
          var k;
          d.current && ((k = i.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ o(nr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(or, {}),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Me })
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
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Pe })
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
                  Yr,
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
const Ka = (t, e) => t === "f" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Fe, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Ke, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(yt, { children: [
  /* @__PURE__ */ o(Ue, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), $a = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), yo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function qa({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = C(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(tr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: Ka(t, r) }) }) }),
      /* @__PURE__ */ o(It, { children: /* @__PURE__ */ o("p", { children: $a(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      rr,
      {
        style: { zIndex: me },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), en(a));
        },
        children: [
          /* @__PURE__ */ o(nr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(or, {}),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ue, {}),
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
                /* @__PURE__ */ o(Fe, {}),
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
const Pr = '[aria-controls="editor-context-menu"]';
function Or(t) {
  return t ? t.matches(Pr) ? !0 : !!t.querySelector(Pr) : !1;
}
const tl = Object.freeze([
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
function Va({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Pn, { className: e, size: 16 });
}
function Ja({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(pe, { size: 16 })
    }
  );
}
function ue(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Rr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    he,
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
        t.selectionState !== void 0 && /* @__PURE__ */ o(Ja, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Va, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Fo, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Xa({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = O(""), [l] = O(() => {
    const w = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
    return w ? ue(w) : void 0;
  }), [d, u] = wt(() => {
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
  return /* @__PURE__ */ m(qe, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: l, children: [
    /* @__PURE__ */ o(
      Ve,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (w) => i(w),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(Je, { children: [
      /* @__PURE__ */ o(Xe, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(we, { children: d.map((w) => /* @__PURE__ */ o(
        Rr,
        {
          item: w,
          localizedStrings: t
        },
        ue(w)
      )) }),
      u.length > 0 && /* @__PURE__ */ m(yt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Re, { alwaysRender: !0 }),
        /* @__PURE__ */ o(we, { children: u.map((w) => /* @__PURE__ */ o(
          Rr,
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
function Wa(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = ie[n], i = s != null && s.children ? s : a && ie[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((u) => ({
        marker: u,
        title: r[ie[u].description] ?? ie[u].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(u), e();
        }
      }))
    );
  }), l.sort((d, u) => (d.marker ?? d.title).localeCompare(u.marker ?? u.title));
}
function Br(t) {
  if (!t || !qt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function Za(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function Ya(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Qa(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function ts(t, e) {
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
function es(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function rs(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const ns = 300, Le = "*", os = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function el({
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
  const p = C(null), E = C(null), H = C(null), G = C(s);
  F(() => {
    G.current = s;
  }, [s]);
  const Z = C(x);
  F(() => {
    Z.current = x;
  }, [x]);
  const k = T(() => {
    var b, N;
    const c = Z.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (N = p.current) == null || N.selectNote(0);
  }, []);
  se(() => {
    if (w || !H.current) return;
    const c = parseFloat(getComputedStyle(H.current).width);
    c > 0 && (H.current.style.width = `${c}px`);
  }, [w]);
  const [P, q] = O("generated"), [X, D] = O("generated"), [K, lt] = O(Le), [pt, Tt] = O(Le), [V, Rt] = O("f"), [Ut, Lt] = O(!1), [z, at] = O(!0), [et, ct] = O(!1), At = C(!1), Bt = C(""), h = C(!1), A = C(void 0), U = C([]), Q = C([]), $ = C(void 0), J = C(void 0), lr = T(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (U.current = [...U.current, ...c], $.current = void 0);
  }, []), cr = T(
    (c, b) => {
      var _, I;
      if (!c) return;
      const N = Br(c), S = Br(b);
      if (!N && S) {
        $.current = {
          text: U.current,
          closedNoteOp: c,
          openNoteOp: b
        }, U.current = [];
        return;
      }
      const L = $.current;
      L && (N && !S && Gt(c, L.openNoteOp) && Gt(b, L.closedNoteOp) && !((I = (_ = p.current) == null ? void 0 : _.getOpsAfterNote(0)) != null && I.length) ? (U.current = L.text, $.current = void 0) : Gt(b, L.openNoteOp) || ($.current = void 0));
    },
    []
  ), [xt, te] = O(!1), ye = Ga(), [dr, pn] = O(), ur = C(null), gt = C(
    void 0
  ), mn = C(0), wr = C(f);
  F(() => {
    wr.current = f;
  }, [f]), F(
    () => () => {
      var c;
      gt.current && (gt.current = void 0, (c = wr.current) == null || c.dismiss());
    },
    []
  );
  const ee = C(void 0), xe = C(void 0), re = T(
    () => Ea(
      xe.current,
      wn(
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
  ), { setSession: fr, clearSessionIfCurrent: ne } = Aa({
    sessionRef: gt,
    editorRef: p,
    baselineRef: xe
  }), Ft = T(() => {
    var b, N, S, L;
    if ((b = p.current) != null && b.getSelection() || (N = p.current) != null && N.getSelectedParaMarker()) return;
    const c = ee.current;
    c ? (S = p.current) == null || S.setSelection(c) : (L = p.current) == null || L.selectNote(0);
  }, []), oe = T(() => {
    var c;
    Ft(), (c = p.current) == null || c.focus();
  }, [Ft]), Dt = wt(
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
        ...i.view ?? ho(),
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
  ), Se = wt(
    () => Wa(
      p,
      () => te(!1),
      d,
      dr,
      V
    ),
    [d, dr, V]
  );
  F(() => {
    var c;
    xt || (c = p.current) == null || c.focus();
  }, [V, xt]);
  const Mt = T(() => {
    var S, L, _;
    const c = (S = E.current) == null ? void 0 : S.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), N = (_ = (L = E.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : _.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), jt = T(
    (c = !1) => {
      var N, S, L, _, I;
      v == null || v();
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b) && (r == null || r([b]), c && u && G.current)) {
        const B = [
          ...U.current,
          ...((L = p.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], M = Q.current, mt = !Gt(B, M);
        if (w && !mt && Gt(b, A.current))
          return;
        A.current = b;
        const W = [b];
        mt && (M.length > 0 && ts(
          ((_ = u.current) == null ? void 0 : _.getOpsAfterNote(G.current)) ?? [],
          M
        ) && W.push({ delete: Qa(M) }), W.push(...B), Q.current = B), (I = u.current) == null || I.replaceEmbedUpdate(G.current, W);
      }
    },
    [w, r, v, u]
  ), ke = T(
    (c) => {
      var N, S, L;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (S = p.current) == null || S.applyUpdate([c, { delete: 1 }]), b && ((L = p.current) == null || L.setSelection(b)), oe();
    },
    [oe]
  ), pr = T(
    (c, b) => {
      var L, _, I;
      gt.current || (L = p.current) == null || L.commitPendingMarkerEdits();
      const N = (I = (_ = p.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
      if (!N || !qt("note", N) || !N.insert.note) return;
      let S;
      c === "custom" ? S = b : c === "generated" ? S = Me : S = Pe, N.insert.note.caller !== S && (N.insert.note.caller = S, ke(N));
    },
    [ke]
  ), Kt = C(void 0), Ce = C(jt);
  F(() => {
    Ce.current = jt;
  }, [jt]);
  const $t = T(() => {
    Kt.current !== void 0 && (clearTimeout(Kt.current), Kt.current = void 0);
  }, []), bt = T(() => {
    Kt.current !== void 0 && ($t(), Ce.current(!0));
  }, [$t]), mr = T(() => {
    $t(), Kt.current = setTimeout(() => {
      Kt.current = void 0, Ce.current(!0);
    }, ns);
  }, [$t]);
  F(() => {
    var L, _;
    let c, b, N;
    At.current = !1, h.current = !1, ee.current = void 0, at(!0);
    const S = e == null ? void 0 : e.at(0);
    if (A.current = S, U.current = [], Q.current = [], $.current = void 0, J.current = void 0, S && qt("note", S)) {
      const I = (L = S.insert.note) == null ? void 0 : L.caller;
      let B = "custom";
      I === Me ? B = "generated" : I === Pe && (B = "hidden");
      const M = B === "custom" && I !== void 0 ? I : Le;
      lt(M), Tt(M), q(B), D(B), Rt(((_ = S.insert.note) == null ? void 0 : _.style) ?? "f"), c = setTimeout(() => {
        var W, st, dt, Nt;
        const mt = (st = (W = p.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : st.at(0);
        (dt = p.current) == null || dt.applyUpdate(mt ? [S, { delete: 1 }] : [S]), k(), (Nt = p.current) == null || Nt.focus(), b = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var vt;
            Mt() || (k(), (vt = p.current) == null || vt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      bt(), Z.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, bt, Mt, k]), se(() => () => bt(), [bt]);
  const hr = T(() => {
    var c;
    h.current && (gt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), bt());
  }, [bt]);
  Tn(
    y,
    () => ({
      flushPendingEdits: hr,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = H.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [hr]
  );
  const Ee = T(() => {
    var c, b;
    if (!gt.current) {
      const N = (c = E.current) == null ? void 0 : c.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    w ? bt() : ($t(), jt(!0)), n();
  }, [$t, bt, w, n, jt]), Ie = C(Ee);
  se(() => {
    Ie.current = Ee;
  });
  const _e = C({ book: a.book, chapterNum: a.chapterNum });
  se(() => {
    (_e.current.book !== a.book || _e.current.chapterNum !== a.chapterNum) && (_e.current = { book: a.book, chapterNum: a.chapterNum }, Ie.current());
  }, [a.book, a.chapterNum]);
  const hn = () => {
    var _;
    const c = p.current, b = Za(c == null ? void 0 : c.getUsj());
    if (!c || !b) return;
    const N = ((_ = E.current) == null ? void 0 : _.ownerDocument) ?? document, { activeElement: S } = N, L = c.getSelection() ?? ee.current;
    c.setSelection(b);
    try {
      c.copy();
    } finally {
      L ? c.setSelection(L) : c.selectNote(0), c.getSelection(), N.activeElement !== S && (S instanceof HTMLElement && S !== N.body ? S.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
    }
  }, gn = T(
    (c, b) => {
      v == null || v(), q(c), lt(b), pr(c, b), w && bt();
    },
    [pr, bt, w, v]
  ), bn = (c) => {
    var N, S, L, _, I;
    Rt(c), gt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (L = (S = p.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const B = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
      V !== "x" && c === "x" ? B == null || B.forEach((M) => es(M)) : V === "x" && c !== "x" && (B == null || B.forEach((M) => rs(M))), ke(b), w && bt();
    }
  }, Nn = (c) => {
    pn(c.contextMarker), ct(c.canRedo);
  }, vn = T(
    (c) => {
      var N, S, L, _, I, B, M;
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (L = b.insert.note) == null ? void 0 : L.style, W = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
        if (mt || Lt(!1), Lt(
          mt === "x" ? !!(W != null && W.every((st) => {
            var Nt, vt;
            if (!((Nt = st.attributes) != null && Nt.char)) return !0;
            const dt = ((vt = st.attributes) == null ? void 0 : vt.char).style;
            return dt === "xt" || dt === "xo" || dt === "xq";
          })) : !!(W != null && W.every((st) => {
            var Nt, vt;
            if (!((Nt = st.attributes) != null && Nt.char)) return !0;
            const dt = ((vt = st.attributes) == null ? void 0 : vt.char).style;
            return dt === "ft" || dt === "fr" || dt === "fq";
          }))
        ), !At.current) {
          At.current = !0, Bt.current = JSON.stringify(b), J.current = b, at(!0);
          return;
        }
        h.current = !0, cr(J.current, b), J.current = b, (M = (B = p.current) == null ? void 0 : B.getOpsAfterNote(0)) != null && M.length && setTimeout(lr, 0), at(JSON.stringify(b) === Bt.current), jt(), w && mr();
      } else
        Lt(!1), at(!0);
    },
    [
      w,
      jt,
      mr,
      cr,
      lr
    ]
  ), gr = T(() => {
    const c = window.getSelection();
    if (!Se.length || !c || c.rangeCount === 0)
      return;
    const b = E.current;
    if (!b) return;
    const N = c.getRangeAt(0).cloneRange();
    ye.setSource({
      measure: () => {
        const S = za(N);
        return S && Ha(S);
      },
      contextElement: b
    }), te(!0);
  }, [Se, ye]), Te = C(() => {
  }), br = T(
    (c, b, N) => {
      const { anchorRect: S } = c;
      if (!f || !S) return;
      const { hasTextSelection: L } = N;
      Ia({
        items: b,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: L ? "selection" : "backslash",
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
        isNoteMarker: (_) => ba(Dt.styleInfo ?? kr, _),
        sessionCounterRef: mn,
        setSession: fr,
        clearSessionIfCurrent: ne,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (_) => Te.current(_),
        show: (_) => f.show({
          items: b.map(Ya),
          anchor: S,
          keyForwarding: _
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Ft,
        hasEditorChangedSinceFocus: re,
        focusEditor: () => {
          var _;
          return (_ = p.current) == null ? void 0 : _.focus();
        },
        applyItem: (_) => {
          var I;
          return (I = p.current) == null ? void 0 : I.applyMarkerMenuSelection(_, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (_) => {
          (!xo(_) || _.code !== So) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${ko(_)}`
          );
        }
      });
    },
    [
      f,
      Ft,
      re,
      Dt.styleInfo,
      fr,
      ne
    ]
  ), ae = T(() => {
    var N;
    const c = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!c) return !1;
    const b = go(Dt.styleInfo ?? kr, c);
    return b.length === 0 ? !1 : (br(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [br, Dt.styleInfo]);
  Ta({
    isSessionOpen: T(() => !!gt.current, []),
    dismiss: T(() => f == null ? void 0 : f.dismiss(), [f])
  });
  const Nr = T(
    (c) => {
      if (!f) return;
      _a(c, {
        sessionRef: gt,
        editorRef: p,
        palette: f,
        restoreCaret: Ft,
        reopenAtCaret: ae,
        clearSessionIfCurrent: ne,
        hasEditorChangedSinceFocus: re
      }) === "no-session" && f.dismiss();
    },
    [
      f,
      ae,
      Ft,
      ne,
      re
    ]
  );
  F(() => {
    Te.current = Nr;
  }, [Nr]), La({
    containerRef: E,
    editorRef: p,
    selectionRef: ee,
    baselineRef: xe,
    isSessionOpen: T(() => !!gt.current, [])
  }), F(() => {
    const c = () => {
      xt && te(!1);
    };
    return window.addEventListener("click", c), window.addEventListener("blur", c), () => {
      window.removeEventListener("click", c), window.removeEventListener("blur", c);
    };
  }, [xt]), F(() => {
    var c;
    xt && ((c = ur.current) == null || c.focus());
  }, [xt]), F(() => {
    var _;
    const c = () => {
      var I;
      return ((I = E.current) == null ? void 0 : I.querySelector(".editor-input")) ?? void 0;
    };
    if (((_ = Dt.view) == null ? void 0 : _.markerMode) === "editable") {
      const I = (M) => {
        var st, dt, Nt, vt;
        if (de(M)) return;
        const mt = gt.current, W = c();
        if (!(!W || document.activeElement !== W)) {
          if (mt && f) {
            Te.current(M);
            return;
          }
          if (Or(E.current)) {
            M.key === l && (M.preventDefault(), M.stopPropagation());
            return;
          }
          if (M.key === "Enter" && !Mt()) {
            M.preventDefault(), M.stopPropagation(), (st = p.current) == null || st.selectNote(0), (dt = p.current) == null || dt.focus();
            return;
          }
          if (f && M.key === l) {
            if (!Mt()) {
              M.preventDefault(), M.stopPropagation(), (Nt = p.current) == null || Nt.selectNote(0), (vt = p.current) == null || vt.focus();
              return;
            }
            ae() && (M.preventDefault(), M.stopPropagation());
          }
        }
      }, B = () => {
        var mt, W;
        const M = c();
        !M || document.activeElement !== M || Mt() || ((mt = p.current) == null || mt.selectNote(0), (W = p.current) == null || W.focus());
      };
      return document.addEventListener("keydown", I, { capture: !0 }), document.addEventListener("paste", B, { capture: !0 }), () => {
        document.removeEventListener("keydown", I, { capture: !0 }), document.removeEventListener("paste", B, { capture: !0 });
      };
    }
    const b = () => {
      const I = c();
      return !I || document.activeElement !== I ? !1 : !Or(E.current);
    }, N = (I) => {
      I.key !== "Enter" || de(I) || b() && (I.preventDefault(), I.stopPropagation());
    }, S = (I) => {
      I.inputType !== "insertParagraph" && I.inputType !== "insertLineBreak" || b() && (I.preventDefault(), I.stopPropagation());
    }, L = (I) => {
      const B = c();
      !xt && B && document.activeElement === B && I.key === l ? (I.preventDefault(), gr()) : xt && I.key === "Escape" && (I.preventDefault(), te(!1));
    };
    return document.addEventListener("keydown", L), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), () => {
      document.removeEventListener("keydown", L), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    xt,
    gr,
    l,
    (xr = Dt.view) == null ? void 0 : xr.markerMode,
    Dt.styleInfo,
    f,
    ae,
    Mt
  ]), F(() => {
    const c = H.current;
    if (!w || !c) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || de(N) || (N.preventDefault(), N.stopPropagation(), Ie.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [w]), F(() => {
    const c = () => {
      var S, L, _;
      const b = ((S = E.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Mt() || ((L = p.current) == null || L.selectNote(0), (_ = p.current) == null || _.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [Mt]);
  const vr = d["%footnoteEditor_copyButton_tooltip%"], yr = /* @__PURE__ */ o(
    Ba,
    {
      onUndoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.undo();
      },
      onRedoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.redo();
      },
      canUndo: !z,
      canRedo: et,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ m(yt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: H,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                qa,
                {
                  isTypeSwitchable: Ut,
                  noteType: V,
                  handleNoteTypeChange: bn,
                  localizedStrings: d,
                  focusNoteText: oe
                }
              ),
              /* @__PURE__ */ o(
                Fa,
                {
                  callerType: P,
                  customCaller: K,
                  updateCaller: gn,
                  localizedStrings: d,
                  focusNoteText: oe
                }
              ),
              w && yr
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(Ze, { children: [
              yr,
              /* @__PURE__ */ o(
                ca,
                {
                  onCancelClick: n,
                  onAcceptClick: Ee,
                  canAccept: !z || X !== P || P === "custom" && K !== pt,
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
                  ja,
                  {
                    editorRef: p,
                    canUndo: !z,
                    canRedo: et,
                    children: /* @__PURE__ */ o(
                      bo,
                      {
                        options: Dt,
                        onStateChange: Nn,
                        onUsjChange: vn,
                        defaultUsj: os,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(Ct, { children: [
                  /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(
                    Y,
                    {
                      "aria-label": vr,
                      onClick: hn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(On, {})
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
    /* @__PURE__ */ m(Ye, { open: xt, children: [
      /* @__PURE__ */ o(na, { virtualRef: ye.virtualRef }),
      /* @__PURE__ */ o(
        Qe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Xa,
            {
              markerMenuItems: Se,
              localizedStrings: d,
              searchRef: ur
            }
          )
        }
      )
    ] })
  ] });
}
const as = {
  "refresh-cw": lo,
  download: io,
  house: so,
  "book-a": ao,
  settings: oo,
  "circle-question-mark": no,
  "external-link": ro,
  users: eo,
  "book-copy": to,
  pencil: Qn,
  eye: Yn,
  "zoom-in": Zn,
  "zoom-out": Wn,
  scan: Xn,
  "file-text": Jn,
  "panel-bottom": Vn,
  "message-square-plus": qn,
  "square-function": Fe,
  "square-x": Ue,
  "square-sigma": Ke,
  book: $n,
  "book-marked": Kn,
  "book-open": Fn,
  library: Un,
  search: $r,
  "message-square": Hn,
  "circle-check-big": zn,
  "clipboard-check": Gn,
  sparkles: jn,
  "notebook-tabs": Bn,
  "square-dashed-text": Rn
}, ar = as, rl = Object.keys(ar);
function ss(t) {
  return t !== void 0 && Object.hasOwn(ar, t);
}
function is(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = it(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function jr(t, e, r) {
  const n = it(e);
  return t.some(
    (a) => it(a.projectId) === n && a.scrollGroupId === r
  );
}
function Ae(t) {
  const e = is(t.openTabs);
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
        isSelected: jr(r, a.id, void 0),
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
        isSelected: jr(r, a.id, i.scrollGroupId),
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
const sr = "Selected", ir = "Unselected";
function Gr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Co(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Ge(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function ls(t) {
  const e = t.filter(Gr).sort(zt), r = t.filter((a) => !Gr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function cs(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var u;
    const d = (u = e.getSectionHeading) == null ? void 0 : u.call(
      e,
      i,
      l.map((w) => w.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? sr : ir;
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
function ds(t, e) {
  if (e.id === "openTabs") return ls(t);
  if (e.id === "selection") return cs(t, e);
  if (!e.getGroupKey) return Ge(t);
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
const nl = [
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
  if (!(typeof r != "string" || !ln(r)))
    return r;
}
const le = "recent", us = "other";
function fn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function ws(t) {
  const e = t ?? {};
  return [
    fn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? le : us;
      },
      getSectionHeading: (r) => r === le ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === le ? -1 : n.key === le ? 1 : 0
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
const ol = ws();
function fs(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? sr : e.unselectedSectionHeading ?? ir
  };
}
function al(t) {
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
function sl(t) {
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
const ps = 100, nt = {
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
  autoSelectionSelectedSectionHeading: sr,
  autoSelectionUnselectedSectionHeading: ir,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function ms(t) {
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
function il(t) {
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
  return Jo[Eo(t)] ?? String(t);
}
const zr = "platform.footerAction", hs = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function gs({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    fe,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: hs,
      children: r
    }
  ) : /* @__PURE__ */ o(fe, { variant: "secondary", children: r });
}
function bs({
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
  } = ia(), [x, f] = O(!1), v = Ln(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, H = u || x, G = T(() => {
    if (E) {
      f(!0);
      return;
    }
    w();
  }, [E, w]), Z = T(() => {
    f(!1), y();
  }, [y]), k = /* @__PURE__ */ o(pe, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let P;
  e === "project" ? t.openGroups.length > 0 && (P = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((K) => /* @__PURE__ */ o(fe, { variant: "secondary", children: Qt(K) }, K)) })) : t.scrollGroupId !== void 0 && (P = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      gs,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      Y,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (K) => {
          K.stopPropagation(), a(t);
        },
        onMouseDown: (K) => K.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(uo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const q = /* @__PURE__ */ m(
    he,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: G,
      onPointerLeave: Z,
      ...p && { "aria-describedby": v },
      className: g(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: k }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Io(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        P,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), X = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, D = t.isBoundButClosed && X ? r.boundButClosedTooltip.replace("{group}", X) : void 0;
  return /* @__PURE__ */ m(Ct, { open: H, delayDuration: 400, children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: q }),
    /* @__PURE__ */ m(
      It,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Vr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && X && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              X,
              ")"
            ] })
          ] }),
          D && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: D }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function Ns({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ m(tr, { children: [
    /* @__PURE__ */ m(Ct, { children: [
      /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
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
          children: /* @__PURE__ */ o(co, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(It, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      rr,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: me },
        children: [
          /* @__PURE__ */ o(nr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(la, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Tr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(or, {}),
            t.map((s) => /* @__PURE__ */ o(Tr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function vs(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function ll(t) {
  const [e, r] = O(!1), [n, a] = O(""), s = wt(() => ms(t.localizedStrings), [t.localizedStrings]), i = wt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(fn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      fs({
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
  ]), [l, d] = O(void 0), u = wt(
    () => vs(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = l ?? u, y = C(null), [x, f] = O(void 0), v = T((h) => {
    r(h), h || (a(""), f(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const A = y.current;
      A && A.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = wt(() => t.mode === "project" ? Ae({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Ae({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Ae({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = wt(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (A) => A.shortName.toLowerCase().includes(h) || (A.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), H = wt(
    () => new Map(t.projects.map((h) => [it(h.id), h])),
    [t.projects]
  ), G = T(
    (h) => h === void 0 ? void 0 : H.get(it(h)),
    [H]
  ), { renderProjectIndicator: Z } = t, k = T(
    (h) => Z ? Z(h.project) : void 0,
    [Z]
  ), P = !!Z, q = !!t.footerAction && E.length === 0, X = wt(() => {
    if (w === Xt) return Ge(E);
    const h = i.find((A) => A.id === w);
    return h ? ds(E, h) : Ge(E);
  }, [E, w, i]), D = (h) => {
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, K = (h) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: h.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const A = t.selection.pairs, U = it(h.projectId), Q = (J) => it(J.projectId) === U && J.scrollGroupId === h.scrollGroupId, $ = A.some(Q) ? A.filter((J) => !Q(J)) : [
          ...A.filter((J) => !Q(J)),
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
  }, lt = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, pt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, V = wt(() => {
    switch (t.mode) {
      case "project": {
        const h = G(t.selection.projectId);
        if (pt)
          return { node: pt(h), title: "", hasSelection: !!h };
        let A = h ? h.shortName : s.buttonPlaceholder;
        return h && Tt === "shortNameAndFullName" && (A = Vr(h)), { node: A, title: A, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const A = [];
        if (h.forEach(($) => {
          const J = G($.projectId);
          J && A.push({ project: J, scrollGroupId: $.scrollGroupId });
        }), A.length === 0) {
          const $ = s.buttonPlaceholder;
          return { node: $, title: $, hasSelection: !1 };
        }
        const U = A.map(
          ({ project: $, scrollGroupId: J }) => J === void 0 ? $.shortName : `${$.shortName} (${Qt(J)})`
        ).join(", "), Q = A.length.toString();
        return {
          node: /* @__PURE__ */ m(yt, { children: [
            /* @__PURE__ */ o(fe, { variant: "muted", className: "tw:shrink-0", children: Q }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: U })
          ] }),
          title: `${Q} ${U}`,
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
        const U = Qt(A);
        return {
          node: `${h.shortName} · ${U}`,
          title: `${h.shortName} · ${U}`,
          accessibleTitle: `${h.shortName}, ${U}`,
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
    pt,
    Tt,
    s.buttonPlaceholder
  ]), Rt = C(null), [Ut, Lt] = O(!1);
  F(() => {
    const h = Rt.current;
    if (!h) return;
    const A = (Q) => {
      Lt(Q < ps);
    };
    if (A(h.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const U = new ResizeObserver((Q) => {
      Q.forEach(($) => {
        const [J] = $.borderBoxSize;
        A(J ? J.inlineSize : h.getBoundingClientRect().width);
      });
    });
    return U.observe(h, { box: "border-box" }), () => U.disconnect();
  }, []);
  let z;
  t.isLoading ? z = /* @__PURE__ */ o(wo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? z = void 0 : t.mode === "project-multi" ? z = /* @__PURE__ */ o(Kr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : z = /* @__PURE__ */ o(fo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? D : void 0, et = s.ariaLabel && V.hasSelection && V.title ? `${s.ariaLabel}: ${V.accessibleTitle ?? V.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ m(
    Y,
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": et,
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof V.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: V.node }) : V.node }),
        z
      ]
    }
  ), At = V.title ? /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(Ct, { children: [
    /* @__PURE__ */ o(Et, { asChild: !0, children: /* @__PURE__ */ o(je, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ o(It, { dir: "auto", children: V.title })
  ] }) }) : /* @__PURE__ */ o(je, { asChild: !0, children: ct }), Bt = i.length > 1;
  return /* @__PURE__ */ m(Ye, { open: e, onOpenChange: v, children: [
    At,
    /* @__PURE__ */ o(
      Qe,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(
          qe,
          {
            shouldFilter: !1,
            value: q ? x ?? zr : void 0,
            onValueChange: f,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Ve,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  Ns,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: lt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Je, { children: [
                /* @__PURE__ */ o(Xe, { children: s.commandEmptyMessage }),
                X.map((h, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Hr,
                    {
                      children: [
                        /* @__PURE__ */ o(we, { heading: ys(h, s), children: h.rows.map((U) => /* @__PURE__ */ o(
                          bs,
                          {
                            row: U,
                            mode: t.mode,
                            strings: s,
                            onClick: K,
                            onOpen: at,
                            selectedRowRef: y,
                            indicator: k(U),
                            reserveIndicatorSlot: P
                          },
                          U.rowKey
                        )) }),
                        A < X.length - 1 && /* @__PURE__ */ o(Re, { alwaysRender: !0 })
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
                    Re,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    he,
                    {
                      forceMount: !0,
                      value: zr,
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
function ys(t, e) {
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
const xs = Ur(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = ht();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            $r,
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            Yr,
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
            Y,
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
                /* @__PURE__ */ o(Fr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
xs.displayName = "SearchBar";
const Ss = 5;
function cl(t) {
  return Vo(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function ks(t, e) {
  return t.filter((r) => {
    try {
      return _o(r) === e;
    } catch {
      return !1;
    }
  });
}
const dl = (t, e, r) => ks(t, e).every((n) => r.includes(n));
function Cs(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => Xo(n, e));
}
function ul(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = Cs(t, n);
  if (i.length !== 0)
    return i.length <= Ss ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function wl({ name: t, className: e }) {
  const r = ss(t) ? ar[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function fl({ message: t, id: e, className: r }) {
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
function Es({ className: t, ...e }) {
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
function Is({ className: t, ...e }) {
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
const _s = Ot(
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
function Ts({
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
        _s({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function pl({ className: t, ...e }) {
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
function Ls({ className: t, ...e }) {
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
function As({ className: t, ...e }) {
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
function ml({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Es, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Is, { children: [
      /* @__PURE__ */ o(Ts, { variant: "icon", children: n ?? /* @__PURE__ */ o(po, {}) }),
      /* @__PURE__ */ o(Ls, { children: t })
    ] }),
    r && /* @__PURE__ */ o(As, { children: /* @__PURE__ */ o(Y, { onClick: () => r(), children: e }) })
  ] });
}
const Ds = Ur(({ className: t, ...e }, r) => /* @__PURE__ */ o(mo, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
Ds.displayName = "Spinner";
const Ms = Ot(
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
function hl({
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
        Ms({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function gl({ className: t, ...e }) {
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
function bl({ className: t, ...e }) {
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
function Nl({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    $e.Group,
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
function ce(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function vl({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    $e.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: ce(t),
      minSize: ce(e),
      maxSize: ce(r),
      collapsedSize: ce(n),
      ...a
    }
  );
}
function yl({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    $e.Separator,
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
  hi as A,
  Y as B,
  he as C,
  tr as D,
  Ze as E,
  an as F,
  Je as G,
  Xe as H,
  Bi as I,
  Gi as J,
  ti as K,
  bi as L,
  ni as M,
  oi as N,
  li as O,
  ci as P,
  si as Q,
  ji as R,
  ve as S,
  _t as T,
  ca as U,
  zi as V,
  fe as W,
  Qo as X,
  Fi as Y,
  Ui as Z,
  or as _,
  Xo as a,
  Da as a$,
  Wo as a0,
  Jr as a1,
  Ji as a2,
  Wi as a3,
  Ki as a4,
  $i as a5,
  Xi as a6,
  qi as a7,
  Ai as a8,
  la as a9,
  yi as aA,
  cn as aB,
  be as aC,
  Ne as aD,
  nn as aE,
  zo as aF,
  Uo as aG,
  Ar as aH,
  hl as aI,
  bl as aJ,
  gl as aK,
  ki as aL,
  ri as aM,
  ii as aN,
  Go as aO,
  jo as aP,
  ei as aQ,
  ja as aR,
  Es as aS,
  As as aT,
  Ls as aU,
  Is as aV,
  Ts as aW,
  fl as aX,
  pl as aY,
  el as aZ,
  ns as a_,
  Tr as aa,
  Yi as ab,
  tl as ac,
  Qi as ad,
  Yr as ae,
  ss as af,
  ll as ag,
  xs as ah,
  cl as ai,
  ks as aj,
  Re as ak,
  pi as al,
  dl as am,
  Ci as an,
  en as ao,
  ai as ap,
  Jo as aq,
  wl as ar,
  Si as as,
  xi as at,
  Mi as au,
  Dr as av,
  Oi as aw,
  Pi as ax,
  Li as ay,
  Ri as az,
  Ct as b,
  Aa as b$,
  Xa as b0,
  na as b1,
  _i as b2,
  Ei as b3,
  Ii as b4,
  yl as b5,
  vl as b6,
  Nl as b7,
  ml as b8,
  Ds as b9,
  Xt as bA,
  nt as bB,
  nl as bC,
  Bo as bD,
  al as bE,
  il as bF,
  sl as bG,
  wn as bH,
  Ca as bI,
  ol as bJ,
  Na as bK,
  Sa as bL,
  ka as bM,
  Ea as bN,
  Or as bO,
  ba as bP,
  ws as bQ,
  fs as bR,
  Ya as bS,
  Qs as bT,
  va as bU,
  _a as bV,
  Ia as bW,
  St as bX,
  ul as bY,
  Ta as bZ,
  La as b_,
  Zi as ba,
  Vi as bb,
  Ti as bc,
  Ba as bd,
  me as be,
  Ys as bf,
  Zs as bg,
  Ro as bh,
  Oo as bi,
  Xs as bj,
  Js as bk,
  Ws as bl,
  Vs as bm,
  wa as bn,
  ta as bo,
  Xr as bp,
  Qr as bq,
  Br as br,
  Hi as bs,
  Ha as bt,
  za as bu,
  tn as bv,
  ha as bw,
  Ga as bx,
  wi as by,
  rl as bz,
  g as c,
  Et as d,
  It as e,
  vi as f,
  mi as g,
  er as h,
  rr as i,
  nr as j,
  Di as k,
  ui as l,
  gi as m,
  we as n,
  ht as o,
  qo as p,
  fi as q,
  rt as r,
  Ye as s,
  Ni as t,
  ia as u,
  je as v,
  Qe as w,
  di as x,
  qe as y,
  Ve as z
};
//# sourceMappingURL=resizable-CB9vumSQ.js.map
