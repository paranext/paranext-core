import { jsx as o, jsxs as m, Fragment as gt } from "react/jsx-runtime";
import { Slot as ze, Dialog as yt, Separator as xn, Popover as Zt, Tooltip as Vt, DropdownMenu as Q, Label as yn, RadioGroup as Ae } from "radix-ui";
import { IconX as Sn, IconCheck as He, IconSearch as kn, IconChevronLeft as Cn, IconChevronRight as En } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import wt, { useRef as E, useEffect as U, useCallback as _, useState as M, createContext as In, useContext as _n, useMemo as ut, Fragment as Hr, useLayoutEffect as ae, useImperativeHandle as Tn, useId as Ln, forwardRef as Ur } from "react";
import { X as Fr, Check as we, ChevronsUpDown as Kr, Star as An, Undo as Dn, Redo as Mn, SquareX as Ue, FunctionSquare as Fe, SquareSigma as Ke, Ban as On, Copy as Pn, Sparkles as Rn, ClipboardCheck as Bn, CircleCheckBig as jn, MessageSquare as Gn, Search as $r, Library as zn, BookOpen as Hn, BookMarked as Un, Book as Fn, MessageSquarePlus as Kn, PanelBottom as $n, FileText as qn, Scan as Vn, ZoomOut as Jn, ZoomIn as Xn, Eye as Wn, Pencil as Zn, BookCopy as Yn, Users as Qn, ExternalLink as to, CircleQuestionMark as eo, Settings as ro, BookA as no, House as oo, Download as ao, RefreshCw as so, Group as io, ArrowRight as lo, Loader2 as co, ChevronDown as uo, AlertTriangle as wo, LoaderCircle as fo } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Sr, GENERATOR_NOTE_CALLER as De, HIDDEN_NOTE_CALLER as Me, isInsertEmbedOpOfType as qt, getDefaultViewOptions as po, getMarkerMenuItems as mo, defaultStyleInfo as kr, Editorial as ho } from "@eten-tech-foundation/platform-editor";
import { Section as Ot, MODIFIER_KEYS as go, split as qr, slice as bo, formatReplacementString as No, usfmMarkers as se, deepEqual as Gt, truncateToCopyLimit as vo, getErrorMessage as Cr, isPlatformError as xo, ABORTED as yo, normalizeProjectId as it, compareProjectsByName as So, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Vr, getLocalizeKeyForScrollGroupId as ko, hasDistinctFullName as Co, getSectionForBook as Eo } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as $e from "react-resizable-panels";
import { clsx as Io } from "clsx";
import { extendTailwindMerge as _o, twMerge as To } from "tailwind-merge";
const Lo = _o({ prefix: "tw" });
function Oe(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Ao(t) {
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
function Do(t, e) {
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
  const e = Io(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Lo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const u = Ao(d);
    n.set(u.normalized, u.original), a.push(u.normalized);
  }), To(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const u = n.get(d);
    return u ? Do(d, u) : d;
  }).join(" ");
}
const Jr = 600, fe = 650, $s = 400, Mo = 450, Oo = 500, qs = 510, Vs = 520, Po = 675, Js = 690, Xs = 700, Ws = 800, Xr = Pt(
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
      className: g(Xr({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const Wr = "layoutDirection";
function Zr() {
  return globalThis.localStorage ?? void 0;
}
function pt() {
  var t;
  try {
    const e = (t = Zr()) == null ? void 0 : t.getItem(Wr);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Zs(t) {
  var e;
  try {
    (e = Zr()) == null || e.setItem(Wr, t);
  } catch {
  }
}
function Ys({ ...t }) {
  return /* @__PURE__ */ o(yt.Root, { "data-slot": "dialog", ...t });
}
function Qs({ ...t }) {
  return /* @__PURE__ */ o(yt.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ro({ ...t }) {
  return /* @__PURE__ */ o(yt.Portal, { "data-slot": "dialog-portal", ...t });
}
function ti({ ...t }) {
  return /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", ...t });
}
function Bo({
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
      style: { zIndex: Mo, ...e },
      ...r
    }
  );
}
function ei({
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
  return /* @__PURE__ */ m(Ro, { children: [
    /* @__PURE__ */ o(Bo, { className: n, style: a }),
    /* @__PURE__ */ m(
      yt.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Oo, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(yt.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(W, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Sn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function ri({ className: t, ...e }) {
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
function ni({
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
function oi({ className: t, ...e }) {
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
function ai({
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
function jo({ className: t, ...e }) {
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
const Go = Pt(
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
function zo({
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
        className: g(Go({ align: e }), t),
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(jo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ o(zo, { children: /* @__PURE__ */ o(kn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
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
function Pe({
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
function Ho({ className: t, ...e }) {
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
const Uo = [
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
], Fo = (t) => {
  var e;
  return ((e = Uo[t]) == null ? void 0 : e.chapters) ?? -1;
}, Ko = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function $o(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function P(t) {
  return `%scrollGroup_${t}%`;
}
const qo = {
  [P("undefined")]: "Ø",
  [P(0)]: "A",
  [P(1)]: "B",
  [P(2)]: "C",
  [P(3)]: "D",
  [P(4)]: "E",
  [P(5)]: "F",
  [P(6)]: "G",
  [P(7)]: "H",
  [P(8)]: "I",
  [P(9)]: "J",
  [P(10)]: "K",
  [P(11)]: "L",
  [P(12)]: "M",
  [P(13)]: "N",
  [P(14)]: "O",
  [P(15)]: "P",
  [P(16)]: "Q",
  [P(17)]: "R",
  [P(18)]: "S",
  [P(19)]: "T",
  [P(20)]: "U",
  [P(21)]: "V",
  [P(22)]: "W",
  [P(23)]: "X",
  [P(24)]: "Y",
  [P(25)]: "Z"
};
function We(t, e) {
  return Fo(ot.bookIdToNumber(t));
}
function me(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = ot.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
function si(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = me(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(We(s), 1),
      verseNum: 1
    };
}
function ii(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < We(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = me(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function li(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = me(n, e, "previous");
  if (!i) return;
  const l = Math.max(We(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function ci(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = me(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function di(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const ui = (t, e, r, n, a) => {
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
}, wi = (t, e, r, n, a) => {
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
function fi(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function Vo(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const pi = Object.fromEntries(
  Ko.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function mi(t, e, r) {
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
function Er(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Ir(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function Jo(t, e) {
  const [r] = M(Qr), n = E(t);
  n.current = t;
  const a = E(e);
  return a.current = e, _(
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
function Xo(t) {
  return Reflect.get(t, rn) === !0;
}
function nn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = E(void 0), n = E(void 0), a = E(void 0);
  U(() => {
    const u = () => {
      const w = r.current;
      if (!w || w.dataset.state === "closed") return;
      const S = w.parentElement;
      if (!S) return;
      const k = { bubbles: !0, pointerType: "mouse" }, f = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", k) : new PointerEvent("pointerdown", k);
      Object.defineProperty(f, rn, { value: !0 }), S.dispatchEvent(f);
    };
    return window.addEventListener("blur", u), () => window.removeEventListener("blur", u);
  }, []);
  const s = _(
    (u) => {
      if (r.current = u ?? void 0, u && u !== n.current && (n.current = u, a.current = Er(u) ?? Ir(u)), typeof t == "function") {
        const w = t(u);
        if (typeof w == "function")
          return () => {
            r.current = void 0, w();
          };
      } else t && (t.current = u);
    },
    [t]
  ), i = _(() => {
    const u = n.current, w = (u && Er(u)) ?? a.current ?? (u && Ir(u));
    return w != null && w.isConnected ? w : void 0;
  }, []), l = Jo(
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
const _r = `
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
function Wo(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${_r}, ${e}` : _r;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Wo(n)
  );
}
const hi = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Re = "keyboard", Tr = !1;
function gi() {
  Tr || typeof document > "u" || (Tr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      Xo(t) || (Re = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Re = "keyboard";
    },
    !0
  ));
}
function bi() {
  return Re;
}
const on = "data-quiet-focus";
function Ni(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(on, ""), t.style.outline = "none"));
}
function vi(t) {
  t && (t.removeAttribute(on), t.style.removeProperty("outline"));
}
const xi = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function Zo({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    xn.Root,
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
const Yo = Pt(
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
        Yo({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function yi({
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
    Zo,
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
function Ye({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function Be({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: Qo, usePortalContainer: ta } = sn(), Si = Qo;
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
  const l = pt(), d = ta(), u = nn({ ref: a, onCloseAutoFocus: s });
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
function ea({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function ki({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Ci({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ei({ className: t, ...e }) {
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
      className: e ? g(Xr({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: ra, usePortalContainer: na } = sn(), Ii = ra;
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
  const l = na();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: l, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Po, ...r },
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
const oa = /^%[^%]*%$/;
function ln(t) {
  return t !== void 0 && !oa.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return ln(t) ? t : e;
}
function aa() {
  const [t, e] = M(!1), r = E(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const cn = In(void 0);
function he() {
  const t = _n(cn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ge = Pt("", {
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
  const r = pt(), n = wt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(cn.Provider, { value: n, children: /* @__PURE__ */ o(Q.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function _i({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function er({
  ...t
}) {
  return /* @__PURE__ */ o(Q.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
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
  const d = pt(), u = nn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(Q.Portal, { children: /* @__PURE__ */ o(
    Q.Content,
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
function Ti({ ...t }) {
  return /* @__PURE__ */ o(Q.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Li({
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
function Jt({
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
function sa({
  ...t
}) {
  return /* @__PURE__ */ o(Q.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Lr({
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
function nr({ className: t, inset: e, ...r }) {
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
function or({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Q.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Ai({ className: t, ...e }) {
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
function Di({ ...t }) {
  return /* @__PURE__ */ o(Q.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Mi({
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
        s === "rtl" ? /* @__PURE__ */ o(Cn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(En, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Oi({
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
function Pi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    yn.Root,
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
function Ri({
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
function Bi({
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
const ji = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Ar = (t, e) => t[e] ?? e;
function ia({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Ar(n, "%cancelButton_tooltip%"), l = s ?? Ar(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Fr, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(an, {}),
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
function Gi() {
  return /Windows/i.test(navigator.userAgent);
}
const la = ["input", "select", "textarea", "button"], ca = ["button", "textbox"], zi = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = E(null), [s, i] = M(void 0), [l, d] = M(void 0), u = _(
    (f) => {
      i(f);
      const N = t.find((I) => I.id === f);
      N && (e == null || e(N));
      const p = document.getElementById(f);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), w = _(
    (f) => {
      const N = t.find((p) => p.id === f);
      N && (d((p) => p === f ? void 0 : f), r == null || r(N));
    },
    [r, t]
  ), S = (f) => {
    if (!f) return !1;
    const N = f.tagName.toLowerCase();
    if (f.isContentEditable || la.includes(N)) return !0;
    const p = f.getAttribute("role");
    if (p && ca.includes(p)) return !0;
    const I = f.getAttribute("tabindex");
    return I !== void 0 && I !== "-1";
  }, k = _(
    (f) => {
      var J;
      const N = f.target, p = (A) => A ? document.getElementById(A) : void 0, I = p(l), z = p(s);
      if (!!(I && N && I.contains(N) && N !== I) && S(N)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !N.isContentEditable) {
          if (l) {
            f.preventDefault(), f.stopPropagation();
            const A = t.find((F) => F.id === l);
            A && u(A.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!I) return;
          const A = Array.from(
            I.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (A.length === 0) return;
          const F = A.findIndex((ft) => ft === N);
          if (F === -1) return;
          let lt;
          f.key === "ArrowDown" ? lt = Math.min(F + 1, A.length - 1) : lt = Math.max(F - 1, 0), lt !== F && (f.preventDefault(), f.stopPropagation(), (J = A[lt]) == null || J.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((A) => A.id === s);
      let D = C;
      switch (f.key) {
        case "ArrowDown":
          D = Math.min(C + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          D = Math.max(C - 1, 0), f.preventDefault();
          break;
        case "Home":
          D = 0, f.preventDefault();
          break;
        case "End":
          D = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const A = z;
          if (A) {
            const F = A.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), lt = A.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), ft = F ?? lt;
            if (ft) {
              f.preventDefault(), ft.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (S(N) || (n == null || n(f.key), f.preventDefault()));
          return;
      }
      const $ = t[D];
      $ && u($.id);
    },
    [t, u, s, l, w, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: k,
    /** Focus an option by its ID */
    focusOption: u
  };
}, da = Pt(
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
        da({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function Hi({ className: t, ...e }) {
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
function Ui({
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
function Fi({
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
function Ki({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function $i({ className: t, ...e }) {
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
function ua(t) {
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
function wa(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function fa(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function qi({
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
  }, [a]), ua(i);
  const l = wt.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), d = wt.useCallback(
    (w) => {
      const { current: S } = i;
      if (!S || !S.parentElement) return;
      if (!dn(w, S)) {
        e == null || e(w);
        return;
      }
      const k = S.closest("table"), f = k ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(k).filter(
          (I) => I.tagName === "TR"
        )
      ) : [], N = f.indexOf(S), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), fa(f, N, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), wa(l, p, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const I = S.closest("table");
        I && I.focus();
      }
      e == null || e(w);
    },
    [i, l, e]
  ), u = wt.useCallback(
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
function Vi({ className: t, ...e }) {
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
function Ji({ className: t, ...e }) {
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
function Xi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function pa(t, e = !0) {
  const [r, n] = M(!1);
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
    const l = new MutationObserver(s);
    return l.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", s), i == null || i.disconnect(), l.disconnect();
    };
  }, [t, e]), r;
}
function ma({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = pa(r, e);
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
function Wi({
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
  onOpenChange: S = void 0,
  isDisabled: k = !1,
  sortSelected: f = !1,
  showScrollCue: N = !1,
  icon: p = void 0,
  className: I = void 0,
  variant: z = "ghost",
  id: j
}) {
  const [X, C] = M(!1), D = E(null), $ = _(
    (G) => {
      var tt;
      const at = (tt = t.find((ct) => ct.label === G)) == null ? void 0 : tt.value;
      at && r(
        e.includes(at) ? e.filter((ct) => ct !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), J = () => u || n, A = w ?? X, F = S ?? C, [lt, ft] = M(A), [It, q] = M(e);
  lt !== A && (ft(A), A && q(e));
  const Rt = ut(() => {
    if (!f) return t;
    const G = t.filter((tt) => tt.starred).sort((tt, ct) => tt.label.localeCompare(ct.label)), at = t.filter((tt) => !tt.starred).sort((tt, ct) => {
      const Tt = It.includes(tt.value), Bt = It.includes(ct.value);
      return Tt && !Bt ? -1 : !Tt && Bt ? 1 : tt.label.localeCompare(ct.label);
    });
    return [...G, ...at];
  }, [t, It, f]), Ut = () => {
    const G = t.map((at) => at.value);
    q(G), r(G);
  }, _t = () => {
    q([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: j, className: I, children: /* @__PURE__ */ m(Ye, { open: A, onOpenChange: F, children: [
    /* @__PURE__ */ o(Be, { asChild: !0, children: /* @__PURE__ */ m(
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
                children: J()
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
        /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(W, { variant: "ghost", size: "sm", onClick: _t, children: l })
      ] }),
      /* @__PURE__ */ o(ma, { isEnabled: N, scrollerRef: D, children: /* @__PURE__ */ m(Je, { ref: D, children: [
        /* @__PURE__ */ o(Xe, { children: d }),
        /* @__PURE__ */ o(de, { children: Rt.map((G) => /* @__PURE__ */ m(
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
              G.starred && /* @__PURE__ */ o(An, { className: "tw:h-4 tw:w-4" }),
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
function ha(t, e) {
  if (!t || e === "") return !1;
  const r = xt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && xt(n.marker).toLowerCase() === r
  );
}
function ga(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = xt(e).toLowerCase();
  return r === "passive" ? Sr({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Sr({
    query: a,
    items: n,
    filter: (s) => xt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function je(t) {
  return t.isComposing || t.keyCode === 229;
}
const un = /^[a-z0-9+-]$/i;
function ba(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && be()) && e !== "Dead") {
    if (un.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Na = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], va = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function xa() {
  return [...Na, ...va.filter((t) => un.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function ya(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (je(t) || go.has(t.key))
    return "passed";
  const a = !be();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), ga(
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
    const d = xt(e.filter).toLowerCase(), u = e.items.find(
      (w) => xt(w.marker).toLowerCase() === d
    );
    return u && r.commitItem(u.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = ba(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function Sa(t, e) {
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
function ka(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Ca(t) {
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
    focusEditor: S,
    applyItem: k,
    onShowError: f
  } = t, N = () => {
    u(), S();
  };
  a.current += 1;
  const p = a.current, I = () => a.current === p, z = { kind: r, token: p, filter: "", items: e };
  n && (z.isNoteMarker = n), s(z), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: xa(),
    onKey: (j) => l(j)
  }).then((j) => {
    var C;
    i(p);
    const X = j ?? ((C = z.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (X !== void 0) {
      const D = (w == null ? void 0 : w()) ?? !1;
      N();
      const $ = D ? void 0 : e.find((J) => J.marker === X);
      $ && k($);
    } else I() && N();
  }).catch((j) => {
    i(p), I() && N(), f(j);
  });
}
function Ea(t, e) {
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
  const w = (k) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    k();
  };
  return ya(t, u, {
    update: (k) => a.update(k),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (k) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedMarker(k);
    }),
    commitTypedAndReopen: (k) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedMarker(k, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (k) => w(() => {
      var f;
      s(), (f = n.current) == null || f.commitTypedCloser(k);
    }),
    commitItem: (k) => w(() => {
      var N;
      const f = u.items.find((p) => p.marker === k);
      if (f) {
        if (f.kind === "note") {
          u.itemToApplyOnClose = f;
          return;
        }
        s(), (N = n.current) == null || N.applyMarkerMenuSelection(f, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && l(u.token), "routed";
}
function Ia({
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
function _a({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  U(() => {
    const i = s ?? document, l = (d) => {
      var S, k, f;
      const u = (S = t.current) == null ? void 0 : S.querySelector(".editor-input");
      if (!u || d.target !== u) return;
      const w = (k = e.current) == null ? void 0 : k.getSelection();
      w ? r.current = w : (f = e.current) != null && f.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = wn(
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
function Ta({
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
      Sa(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
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
function Dr({ className: t, ...e }) {
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
function La({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Aa = /* @__PURE__ */ new Set([
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
function Da(t) {
  const e = qr(t, "");
  let r = 0;
  for (; r < e.length && Aa.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = bo(t, r);
  return a ? [...n, a] : n;
}
function Ma(t) {
  const e = [];
  let r = "";
  return qr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Oa(t) {
  const e = Da(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Ma(t), separator: "+" };
}
function Mr({ hint: t }) {
  const { keycaps: e, separator: r } = Oa(t);
  return e.length === 1 ? /* @__PURE__ */ o(Dr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(La, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Hr, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Dr, { children: n })
      ] }, a)
    )) })
  );
}
const Zi = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Or = (t, e) => t[e] ?? e;
function Pa({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = be(), u = Or(a, "%undoButton_tooltip%"), w = Or(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(Ze, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        W,
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
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        u,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(Mr, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(an, {}),
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
          children: /* @__PURE__ */ o(Mn, {})
        }
      ) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ m("p", { children: [
        w,
        s && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(Mr, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Ra({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = E(null);
  return U(() => {
    var d;
    const s = be(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (u) => {
      var S, k, f, N;
      if (!i || document.activeElement !== i) return;
      const w = u.key.toLowerCase();
      if (s) {
        if (!u.metaKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((S = e.current) == null || S.undo())) : u.shiftKey && w === "z" && (u.preventDefault(), n && ((k = e.current) == null || k.redo()));
      } else {
        if (!u.ctrlKey) return;
        !u.shiftKey && w === "z" ? (u.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || u.shiftKey && w === "z") && (u.preventDefault(), n && ((N = e.current) == null || N.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function Ba() {
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
  return ut(() => ({ virtualRef: r, setSource: n }), [n]);
}
function ja(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ga(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const za = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(gt, { children: [
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
function Ha({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = E(!1), i = E(null), l = E(null), d = E(!1), [u, w] = M(t), [S, k] = M(e), [f, N] = M(!1), p = E(!1), I = E(u);
  I.current = u;
  const z = E(S);
  z.current = S, U(() => {
    w(t);
  }, [t]), U(() => {
    S !== e && k(e);
  }, [e]);
  const j = (C) => {
    if (d.current = !1, N(C), !C) {
      const D = I.current, $ = z.current;
      D !== "custom" || $ ? (D !== t || $ !== e) && (s.current = !0, r(D, $)) : (w(t), k(e));
    }
  }, X = (C) => {
    var D, $, J, A;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((D = i.current) == null || D.focus(), d.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? (($ = l.current) == null || $.focus(), d.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((J = i.current) == null ? void 0 : J.selectionStart) === 0 && ((A = l.current) == null || A.focus(), d.current = !1), u === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && j(!1);
  };
  return /* @__PURE__ */ m(tr, { open: f, onOpenChange: j, children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", className: "tw:h-6", children: za(t, n, e) }) }) }),
      /* @__PURE__ */ o(Ct, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      rr,
      {
        style: { zIndex: fe },
        onEscapeKeyDown: () => {
          I.current = t, z.current = e, w(t), k(e);
        },
        onCloseAutoFocus: (C) => {
          s.current && (s.current = !1, C.preventDefault(), en(a));
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
          /* @__PURE__ */ o(nr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(or, {}),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: De })
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
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Me })
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
              onClick: (C) => {
                var D;
                if (C.stopPropagation(), p.current && C.target !== i.current) {
                  j(!1);
                  return;
                }
                d.current = !0, (D = i.current) == null || D.focus();
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  Yr,
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
const Ua = (t, e) => t === "f" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Fe, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Ke, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Ue, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Fa = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), No(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function Ka({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = E(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(tr, { children: [
    /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(W, { variant: "outline", className: "tw:h-6", children: Ua(t, r) }) }) }),
      /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: Fa(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      rr,
      {
        style: { zIndex: fe },
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
function $a(t) {
  return t ? t.matches(Pr) ? !0 : !!t.querySelector(Pr) : !1;
}
const Yi = Object.freeze([
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
function qa({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? On, { className: e, size: 16 });
}
function Va({ state: t }) {
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
function Rr({
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
        t.selectionState !== void 0 && /* @__PURE__ */ o(Va, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(qa, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Ho, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Ja({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = M(""), [l] = M(() => {
    const w = e.find(
      (S) => S.marker === a && !S.isDisallowed && !S.isDeprecated && !S.isDisabled
    );
    return w ? ce(w) : void 0;
  }), [d, u] = ut(() => {
    const w = xt(s.trim().toLowerCase());
    if (!w) {
      const f = e.filter((N) => !N.isDisallowed);
      return [f.length > 0 ? f : e, []];
    }
    const S = e.filter((f) => {
      var p;
      const N = (p = f.marker) == null ? void 0 : p.toLowerCase();
      return f.isDisallowed ? N === w : N == null ? void 0 : N.includes(w);
    }), k = e.filter(
      (f) => f.title.toLowerCase().includes(w) && !S.includes(f)
    );
    return [S, k];
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
      /* @__PURE__ */ o(de, { children: d.map((w) => /* @__PURE__ */ o(
        Rr,
        {
          item: w,
          localizedStrings: t
        },
        ce(w)
      )) }),
      u.length > 0 && /* @__PURE__ */ m(gt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Pe, { alwaysRender: !0 }),
        /* @__PURE__ */ o(de, { children: u.map((w) => /* @__PURE__ */ o(
          Rr,
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
function Xa(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = se[n], i = s != null && s.children ? s : a && se[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((u) => ({
        marker: u,
        title: r[se[u].description] ?? se[u].description,
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
function Wa(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Za(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function Ya(t, e) {
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
function Qa(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ts(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const es = 300, Te = "*", rs = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Qi({
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
  ref: S,
  initialCaretPosition: k,
  markerPalette: f,
  onNoteEdit: N
}) {
  var yr;
  const p = E(null), I = E(null), z = E(null), j = E(s);
  U(() => {
    j.current = s;
  }, [s]);
  const X = E(k);
  U(() => {
    X.current = k;
  }, [k]);
  const C = _(() => {
    var b, v;
    const c = X.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (v = p.current) == null || v.selectNote(0);
  }, []);
  ae(() => {
    if (w || !z.current) return;
    const c = parseFloat(getComputedStyle(z.current).width);
    c > 0 && (z.current.style.width = `${c}px`);
  }, [w]);
  const [D, $] = M("generated"), [J, A] = M("generated"), [F, lt] = M(Te), [ft, It] = M(Te), [q, Rt] = M("f"), [Ut, _t] = M(!1), [G, at] = M(!0), [tt, ct] = M(!1), Tt = E(!1), Bt = E(""), h = E(!1), L = E(void 0), H = E([]), Z = E([]), K = E(void 0), V = E(void 0), lr = _(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (H.current = [...H.current, ...c], K.current = void 0);
  }, []), cr = _(
    (c, b) => {
      var y, O;
      if (!c) return;
      const v = Br(c), x = Br(b);
      if (!v && x) {
        K.current = {
          text: H.current,
          closedNoteOp: c,
          openNoteOp: b
        }, H.current = [];
        return;
      }
      const T = K.current;
      T && (v && !x && Gt(c, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((O = (y = p.current) == null ? void 0 : y.getOpsAfterNote(0)) != null && O.length) ? (H.current = T.text, K.current = void 0) : Gt(b, T.openNoteOp) || (K.current = void 0));
    },
    []
  ), [bt, te] = M(!1), Ne = Ba(), [dr, pn] = M(), ur = E(null), mt = E(
    void 0
  ), mn = E(0), wr = E(f);
  U(() => {
    wr.current = f;
  }, [f]), U(
    () => () => {
      var c;
      mt.current && (mt.current = void 0, (c = wr.current) == null || c.dismiss());
    },
    []
  );
  const ve = E(void 0), xe = E(void 0), ee = _(
    () => ka(
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
  ), { setSession: fr, clearSessionIfCurrent: re } = Ta({
    sessionRef: mt,
    editorRef: p,
    baselineRef: xe
  }), Ft = _(() => {
    var b, v, x, T;
    if ((b = p.current) != null && b.getSelection() || (v = p.current) != null && v.getSelectedParaMarker()) return;
    const c = ve.current;
    c ? (x = p.current) == null || x.setSelection(c) : (T = p.current) == null || T.selectNote(0);
  }, []), ne = _(() => {
    var c;
    Ft(), (c = p.current) == null || c.focus();
  }, [Ft]), Lt = ut(
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
        ...i.view ?? po(),
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
    () => Xa(
      p,
      () => te(!1),
      d,
      dr,
      q
    ),
    [d, dr, q]
  );
  U(() => {
    var c;
    bt || (c = p.current) == null || c.focus();
  }, [q, bt]);
  const At = _(() => {
    var x, T, y;
    const c = (x = I.current) == null ? void 0 : x.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), v = (y = (T = I.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : y.anchorNode;
    return !!b && !!v && b.contains(v);
  }, []), jt = _(
    (c = !1) => {
      var v, x, T, y, O;
      N == null || N();
      const b = (x = (v = p.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && qt("note", b) && (r == null || r([b]), c && u && j.current)) {
        const R = [
          ...H.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], Y = Z.current, Nt = !Gt(R, Y);
        if (w && !Nt && Gt(b, L.current))
          return;
        L.current = b;
        const et = [b];
        Nt && (Y.length > 0 && Ya(
          ((y = u.current) == null ? void 0 : y.getOpsAfterNote(j.current)) ?? [],
          Y
        ) && et.push({ delete: Za(Y) }), et.push(...R), Z.current = R), (O = u.current) == null || O.replaceEmbedUpdate(j.current, et);
      }
    },
    [w, r, N, u]
  ), Se = _(
    (c) => {
      var v, x, T;
      const b = (v = p.current) == null ? void 0 : v.getSelection();
      (x = p.current) == null || x.applyUpdate([c, { delete: 1 }]), b && ((T = p.current) == null || T.setSelection(b)), ne();
    },
    [ne]
  ), pr = _(
    (c, b) => {
      var T, y, O;
      mt.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const v = (O = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : O.at(0);
      if (!v || !qt("note", v) || !v.insert.note) return;
      let x;
      c === "custom" ? x = b : c === "generated" ? x = De : x = Me, v.insert.note.caller !== x && (v.insert.note.caller = x, Se(v));
    },
    [Se]
  ), Kt = E(void 0), ke = E(jt);
  U(() => {
    ke.current = jt;
  }, [jt]);
  const $t = _(() => {
    Kt.current !== void 0 && (clearTimeout(Kt.current), Kt.current = void 0);
  }, []), ht = _(() => {
    Kt.current !== void 0 && ($t(), ke.current(!0));
  }, [$t]), mr = _(() => {
    $t(), Kt.current = setTimeout(() => {
      Kt.current = void 0, ke.current(!0);
    }, es);
  }, [$t]);
  U(() => {
    var T, y;
    let c, b, v;
    Tt.current = !1, h.current = !1, ve.current = void 0, at(!0);
    const x = e == null ? void 0 : e.at(0);
    if (L.current = x, H.current = [], Z.current = [], K.current = void 0, V.current = void 0, x && qt("note", x)) {
      const O = (T = x.insert.note) == null ? void 0 : T.caller;
      let R = "custom";
      O === De ? R = "generated" : O === Me && (R = "hidden");
      const Y = R === "custom" && O !== void 0 ? O : Te;
      lt(Y), It(Y), $(R), A(R), Rt(((y = x.insert.note) == null ? void 0 : y.style) ?? "f"), c = setTimeout(() => {
        var et, st, vt, Dt;
        const Nt = (st = (et = p.current) == null ? void 0 : et.getNoteOps(0)) == null ? void 0 : st.at(0);
        (vt = p.current) == null || vt.applyUpdate(Nt ? [x, { delete: 1 }] : [x]), C(), (Dt = p.current) == null || Dt.focus(), b = requestAnimationFrame(() => {
          v = setTimeout(() => {
            var Mt;
            At() || (C(), (Mt = p.current) == null || Mt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      ht(), X.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), v !== void 0 && clearTimeout(v);
    };
  }, [e, ht, At, C]), ae(() => () => ht(), [ht]);
  const hr = _(() => {
    var c;
    h.current && (mt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), ht());
  }, [ht]);
  Tn(
    S,
    () => ({
      flushPendingEdits: hr,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = z.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [hr]
  );
  const Ce = _(() => {
    var c, b;
    if (!mt.current) {
      const v = (c = I.current) == null ? void 0 : c.querySelector(".editor-input");
      v != null && v.contains(v.ownerDocument.activeElement) && v.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    w ? ht() : ($t(), jt(!0)), n();
  }, [$t, ht, w, n, jt]), Ee = E(Ce);
  ae(() => {
    Ee.current = Ce;
  });
  const Ie = E({ book: a.book, chapterNum: a.chapterNum });
  ae(() => {
    (Ie.current.book !== a.book || Ie.current.chapterNum !== a.chapterNum) && (Ie.current = { book: a.book, chapterNum: a.chapterNum }, Ee.current());
  }, [a.book, a.chapterNum]);
  const hn = async () => {
    var v;
    const c = (v = I.current) == null ? void 0 : v.getElementsByClassName("editor-input")[0];
    if (!(c != null && c.textContent)) return;
    const b = vo(c.textContent, i.copyLimit);
    if (b)
      try {
        await navigator.clipboard.writeText(b);
      } catch (x) {
        console.warn(`Could not copy the footnote to the clipboard: ${Cr(x)}`);
      }
  }, gn = _(
    (c, b) => {
      N == null || N(), $(c), lt(b), pr(c, b), w && ht();
    },
    [pr, ht, w, N]
  ), bn = (c) => {
    var v, x, T, y, O;
    Rt(c), mt.current || (v = p.current) == null || v.commitPendingMarkerEdits();
    const b = (T = (x = p.current) == null ? void 0 : x.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const R = (O = (y = b.insert.note) == null ? void 0 : y.contents) == null ? void 0 : O.ops;
      q !== "x" && c === "x" ? R == null || R.forEach((Y) => Qa(Y)) : q === "x" && c !== "x" && (R == null || R.forEach((Y) => ts(Y))), Se(b), w && ht();
    }
  }, Nn = (c) => {
    pn(c.contextMarker), ct(c.canRedo);
  }, vn = _(
    (c) => {
      var v, x, T, y, O, R, Y;
      const b = (x = (v = p.current) == null ? void 0 : v.getNoteOps(0)) == null ? void 0 : x.at(0);
      if (b && qt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const Nt = (T = b.insert.note) == null ? void 0 : T.style, et = (O = (y = b.insert.note) == null ? void 0 : y.contents) == null ? void 0 : O.ops;
        if (Nt || _t(!1), _t(
          Nt === "x" ? !!(et != null && et.every((st) => {
            var Dt, Mt;
            if (!((Dt = st.attributes) != null && Dt.char)) return !0;
            const vt = ((Mt = st.attributes) == null ? void 0 : Mt.char).style;
            return vt === "xt" || vt === "xo" || vt === "xq";
          })) : !!(et != null && et.every((st) => {
            var Dt, Mt;
            if (!((Dt = st.attributes) != null && Dt.char)) return !0;
            const vt = ((Mt = st.attributes) == null ? void 0 : Mt.char).style;
            return vt === "ft" || vt === "fr" || vt === "fq";
          }))
        ), !Tt.current) {
          Tt.current = !0, Bt.current = JSON.stringify(b), V.current = b, at(!0);
          return;
        }
        h.current = !0, cr(V.current, b), V.current = b, (Y = (R = p.current) == null ? void 0 : R.getOpsAfterNote(0)) != null && Y.length && setTimeout(lr, 0), at(JSON.stringify(b) === Bt.current), jt(), w && mr();
      } else
        _t(!1), at(!0);
    },
    [
      w,
      jt,
      mr,
      cr,
      lr
    ]
  ), gr = _(() => {
    const c = window.getSelection();
    if (!ye.length || !c || c.rangeCount === 0)
      return;
    const b = I.current;
    if (!b) return;
    const v = c.getRangeAt(0).cloneRange();
    Ne.setSource({
      measure: () => {
        const x = ja(v);
        return x && Ga(x);
      },
      contextElement: b
    }), te(!0);
  }, [ye, Ne]), _e = E(() => {
  }), br = _(
    (c, b, v) => {
      const { anchorRect: x } = c;
      if (!f || !x) return;
      const { hasTextSelection: T } = v;
      Ca({
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
        isNoteMarker: (y) => ha(Lt.styleInfo ?? kr, y),
        sessionCounterRef: mn,
        setSession: fr,
        clearSessionIfCurrent: re,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (y) => _e.current(y),
        show: (y) => f.show({
          items: b.map(Wa),
          anchor: x,
          keyForwarding: y
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Ft,
        hasEditorChangedSinceFocus: ee,
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
          (!xo(y) || y.code !== yo) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Cr(y)}`
          );
        }
      });
    },
    [
      f,
      Ft,
      ee,
      Lt.styleInfo,
      fr,
      re
    ]
  ), oe = _(() => {
    var v;
    const c = (v = p.current) == null ? void 0 : v.getMarkerMenuContext();
    if (!c) return !1;
    const b = mo(Lt.styleInfo ?? kr, c);
    return b.length === 0 ? !1 : (br(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [br, Lt.styleInfo]);
  Ia({
    isSessionOpen: _(() => !!mt.current, []),
    dismiss: _(() => f == null ? void 0 : f.dismiss(), [f])
  });
  const Nr = _(
    (c) => {
      if (!f) return;
      Ea(c, {
        sessionRef: mt,
        editorRef: p,
        palette: f,
        restoreCaret: Ft,
        reopenAtCaret: oe,
        clearSessionIfCurrent: re,
        hasEditorChangedSinceFocus: ee
      }) === "no-session" && f.dismiss();
    },
    [
      f,
      oe,
      Ft,
      re,
      ee
    ]
  );
  U(() => {
    _e.current = Nr;
  }, [Nr]), _a({
    containerRef: I,
    editorRef: p,
    selectionRef: ve,
    baselineRef: xe,
    isSessionOpen: _(() => !!mt.current, [])
  }), U(() => {
    const c = () => {
      bt && te(!1);
    };
    return window.addEventListener("click", c), window.addEventListener("blur", c), () => {
      window.removeEventListener("click", c), window.removeEventListener("blur", c);
    };
  }, [bt]), U(() => {
    var c;
    bt && ((c = ur.current) == null || c.focus());
  }, [bt]), U(() => {
    var v;
    const c = () => {
      var x;
      return ((x = I.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
    };
    if (((v = Lt.view) == null ? void 0 : v.markerMode) === "editable") {
      const x = (y) => {
        var Y, Nt, et, st;
        if (je(y)) return;
        const O = mt.current, R = c();
        if (!(!R || document.activeElement !== R)) {
          if (O && f) {
            _e.current(y);
            return;
          }
          if ($a(I.current)) {
            y.key === l && (y.preventDefault(), y.stopPropagation());
            return;
          }
          if (y.key === "Enter" && !At()) {
            y.preventDefault(), y.stopPropagation(), (Y = p.current) == null || Y.selectNote(0), (Nt = p.current) == null || Nt.focus();
            return;
          }
          if (f && y.key === l) {
            if (!At()) {
              y.preventDefault(), y.stopPropagation(), (et = p.current) == null || et.selectNote(0), (st = p.current) == null || st.focus();
              return;
            }
            oe() && (y.preventDefault(), y.stopPropagation());
          }
        }
      }, T = () => {
        var O, R;
        const y = c();
        !y || document.activeElement !== y || At() || ((O = p.current) == null || O.selectNote(0), (R = p.current) == null || R.focus());
      };
      return document.addEventListener("keydown", x, { capture: !0 }), document.addEventListener("paste", T, { capture: !0 }), () => {
        document.removeEventListener("keydown", x, { capture: !0 }), document.removeEventListener("paste", T, { capture: !0 });
      };
    }
    const b = (x) => {
      const T = c();
      !bt && T && document.activeElement === T && x.key === l ? (x.preventDefault(), gr()) : bt && x.key === "Escape" && (x.preventDefault(), te(!1));
    };
    return document.addEventListener("keydown", b), () => {
      document.removeEventListener("keydown", b);
    };
  }, [
    bt,
    gr,
    l,
    (yr = Lt.view) == null ? void 0 : yr.markerMode,
    Lt.styleInfo,
    f,
    oe,
    At
  ]), U(() => {
    const c = z.current;
    if (!w || !c) return;
    const b = (v) => {
      v.key !== "Escape" || v.defaultPrevented || je(v) || (v.preventDefault(), v.stopPropagation(), Ee.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [w]), U(() => {
    const c = () => {
      var x, T, y;
      const b = ((x = I.current) == null ? void 0 : x.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const v = document.getSelection();
      v && !v.isCollapsed || At() || ((T = p.current) == null || T.selectNote(0), (y = p.current) == null || y.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [At]);
  const vr = d["%footnoteEditor_copyButton_tooltip%"], xr = /* @__PURE__ */ o(
    Pa,
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
                Ka,
                {
                  isTypeSwitchable: Ut,
                  noteType: q,
                  handleNoteTypeChange: bn,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              /* @__PURE__ */ o(
                Ha,
                {
                  callerType: D,
                  customCaller: F,
                  updateCaller: gn,
                  localizedStrings: d,
                  focusNoteText: ne
                }
              ),
              w && xr
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(Ze, { children: [
              xr,
              /* @__PURE__ */ o(
                ia,
                {
                  onCancelClick: n,
                  onAcceptClick: Ce,
                  canAccept: !G || J !== D || D === "custom" && F !== ft,
                  localizedStrings: d,
                  acceptLabel: d["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ m(
            "div",
            {
              ref: I,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  Ra,
                  {
                    editorRef: p,
                    canUndo: !G,
                    canRedo: tt,
                    children: /* @__PURE__ */ o(
                      ho,
                      {
                        options: Lt,
                        onStateChange: Nn,
                        onUsjChange: vn,
                        defaultUsj: rs,
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
                      "aria-label": vr,
                      onClick: hn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Pn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(Ct, { children: /* @__PURE__ */ o("p", { children: vr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(Ye, { open: bt, children: [
      /* @__PURE__ */ o(ea, { virtualRef: Ne.virtualRef }),
      /* @__PURE__ */ o(
        Qe,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Ja,
            {
              markerMenuItems: ye,
              localizedStrings: d,
              searchRef: ur
            }
          )
        }
      )
    ] })
  ] });
}
const ns = {
  "refresh-cw": so,
  download: ao,
  house: oo,
  "book-a": no,
  settings: ro,
  "circle-question-mark": eo,
  "external-link": to,
  users: Qn,
  "book-copy": Yn,
  pencil: Zn,
  eye: Wn,
  "zoom-in": Xn,
  "zoom-out": Jn,
  scan: Vn,
  "file-text": qn,
  "panel-bottom": $n,
  "message-square-plus": Kn,
  "square-function": Fe,
  "square-x": Ue,
  "square-sigma": Ke,
  book: Fn,
  "book-marked": Un,
  "book-open": Hn,
  library: zn,
  search: $r,
  "message-square": Gn,
  "circle-check-big": jn,
  "clipboard-check": Bn,
  sparkles: Rn
}, ar = ns, tl = Object.keys(ar);
function os(t) {
  return t !== void 0 && Object.hasOwn(ar, t);
}
function as(t) {
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
function Le(t) {
  const e = as(t.openTabs);
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
  const r = So(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Ge(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function ss(t) {
  const e = t.filter(Gr).sort(zt), r = t.filter((a) => !Gr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function is(t, e) {
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
function ls(t, e) {
  if (e.id === "openTabs") return ss(t);
  if (e.id === "selection") return is(t, e);
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
    var S;
    const u = [...d].sort(
      (k, f) => {
        var N;
        return ((N = e.compareProjects) == null ? void 0 : N.call(e, k.project, f.project)) || zt(k, f);
      }
    ), w = ((S = e.getSectionHeading) == null ? void 0 : S.call(
      e,
      l,
      u.map((k) => k.project)
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
const el = [
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
  if (!(typeof r != "string" || !ln(r)))
    return r;
}
const ie = "recent", cs = "other";
function fn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function ds(t) {
  const e = t ?? {};
  return [
    fn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? ie : cs;
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
const rl = ds();
function us(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? sr : e.unselectedSectionHeading ?? ir
  };
}
function nl(t) {
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
function ol(t) {
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
const ws = 100, nt = {
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
function fs(t) {
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
function al(t) {
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
  return qo[ko(t)] ?? String(t);
}
const zr = "platform.footerAction", ps = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ms({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    ue,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ps,
      children: r
    }
  ) : /* @__PURE__ */ o(ue, { variant: "secondary", children: r });
}
function hs({
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
    onPointerLeave: S
  } = aa(), [k, f] = M(!1), N = Ln(), p = t.isDisabled && !!t.disabledReason, I = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, z = u || k, j = _(() => {
    if (I) {
      f(!0);
      return;
    }
    w();
  }, [I, w]), X = _(() => {
    f(!1), S();
  }, [S]), C = /* @__PURE__ */ o(we, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let D;
  e === "project" ? t.openGroups.length > 0 && (D = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((F) => /* @__PURE__ */ o(ue, { variant: "secondary", children: Qt(F) }, F)) })) : t.scrollGroupId !== void 0 && (D = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      ms,
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
        onClick: (F) => {
          F.stopPropagation(), a(t);
        },
        onMouseDown: (F) => F.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(lo, { className: "tw:h-3 tw:w-3" }),
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
      onPointerEnter: j,
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
              Co(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        D,
        p && /* @__PURE__ */ o("span", { id: N, hidden: !0, children: t.disabledReason })
      ]
    }
  ), J = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, A = t.isBoundButClosed && J ? r.boundButClosedTooltip.replace("{group}", J) : void 0;
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
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Vr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && J && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              J,
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
function gs({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ m(tr, { children: [
    /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(er, { asChild: !0, children: /* @__PURE__ */ o(
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
          children: /* @__PURE__ */ o(io, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(Ct, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      rr,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: fe },
        children: [
          /* @__PURE__ */ o(nr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(sa, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Lr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(or, {}),
            t.map((s) => /* @__PURE__ */ o(Lr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function bs(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function sl(t) {
  const [e, r] = M(!1), [n, a] = M(""), s = ut(() => fs(t.localizedStrings), [t.localizedStrings]), i = ut(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(fn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      us({
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
  ]), [l, d] = M(void 0), u = ut(
    () => bs(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = l ?? u, S = E(null), [k, f] = M(void 0), N = _((h) => {
    r(h), h || (a(""), f(void 0));
  }, []);
  U(() => {
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), I = ut(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (L) => L.shortName.toLowerCase().includes(h) || (L.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), z = ut(
    () => new Map(t.projects.map((h) => [it(h.id), h])),
    [t.projects]
  ), j = _(
    (h) => h === void 0 ? void 0 : z.get(it(h)),
    [z]
  ), { renderProjectIndicator: X } = t, C = _(
    (h) => X ? X(h.project) : void 0,
    [X]
  ), D = !!X, $ = !!t.footerAction && I.length === 0, J = ut(() => {
    if (w === Xt) return Ge(I);
    const h = i.find((L) => L.id === w);
    return h ? ls(I, h) : Ge(I);
  }, [I, w, i]), A = (h) => {
    if (h.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(h.projectId, h.scrollGroupId);
    }
  }, F = (h) => {
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
  }, ft = t.mode === "project" ? t.renderTriggerLabel : void 0, It = t.mode === "project" ? t.triggerLabelFormat : void 0, q = ut(() => {
    switch (t.mode) {
      case "project": {
        const h = j(t.selection.projectId);
        if (ft)
          return { node: ft(h), title: "", hasSelection: !!h };
        let L = h ? h.shortName : s.buttonPlaceholder;
        return h && It === "shortNameAndFullName" && (L = Vr(h)), { node: L, title: L, hasSelection: !!h };
      }
      case "project-multi": {
        const { pairs: h } = t.selection;
        if (h.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const L = [];
        if (h.forEach((K) => {
          const V = j(K.projectId);
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
        const h = j(t.selection.projectId);
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
    j,
    t.selection,
    ft,
    It,
    s.buttonPlaceholder
  ]), Rt = E(null), [Ut, _t] = M(!1);
  U(() => {
    const h = Rt.current;
    if (!h) return;
    const L = (Z) => {
      _t(Z < ws);
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
  t.isLoading ? G = /* @__PURE__ */ o(co, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ o(Kr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ o(uo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? A : void 0, tt = s.ariaLabel && q.hasSelection && q.title ? `${s.ariaLabel}: ${q.accessibleTitle ?? q.title}` : s.ariaLabel || void 0, ct = /* @__PURE__ */ m(
    W,
    {
      ref: Rt,
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof q.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: q.node }) : q.node }),
        G
      ]
    }
  ), Tt = q.title ? /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(St, { children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Be, { asChild: !0, children: ct }) }),
    /* @__PURE__ */ o(Ct, { dir: "auto", children: q.title })
  ] }) }) : /* @__PURE__ */ o(Be, { asChild: !0, children: ct }), Bt = i.length > 1;
  return /* @__PURE__ */ m(Ye, { open: e, onOpenChange: N, children: [
    Tt,
    /* @__PURE__ */ o(
      Qe,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(Et, { delayDuration: 400, children: /* @__PURE__ */ m(
          qe,
          {
            shouldFilter: !1,
            value: $ ? k ?? zr : void 0,
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
                  gs,
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
              /* @__PURE__ */ m(Je, { children: [
                /* @__PURE__ */ o(Xe, { children: s.commandEmptyMessage }),
                J.map((h, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Hr,
                    {
                      children: [
                        /* @__PURE__ */ o(de, { heading: Ns(h, s), children: h.rows.map((H) => /* @__PURE__ */ o(
                          hs,
                          {
                            row: H,
                            mode: t.mode,
                            strings: s,
                            onClick: F,
                            onOpen: at,
                            selectedRowRef: S,
                            indicator: C(H),
                            reserveIndicatorSlot: D
                          },
                          H.rowKey
                        )) }),
                        L < J.length - 1 && /* @__PURE__ */ o(Pe, { alwaysRender: !0 })
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
                  I.length > 0 && /* @__PURE__ */ o(
                    Pe,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    pe,
                    {
                      forceMount: !0,
                      value: zr,
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
function Ns(t, e) {
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
const vs = Ur(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = pt();
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
vs.displayName = "SearchBar";
const xs = 5;
function il(t) {
  return $o(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function ys(t, e) {
  return t.filter((r) => {
    try {
      return Eo(r) === e;
    } catch {
      return !1;
    }
  });
}
const ll = (t, e, r) => ys(t, e).every((n) => r.includes(n));
function Ss(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => Vo(n, e));
}
function cl(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = Ss(t, n);
  if (i.length !== 0)
    return i.length <= xs ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function dl({ name: t, className: e }) {
  const r = os(t) ? ar[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function ul({ message: t, id: e, className: r }) {
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
function ks({ className: t, ...e }) {
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
function Cs({ className: t, ...e }) {
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
const Es = Pt(
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
function Is({
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
        Es({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function wl({ className: t, ...e }) {
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
function _s({ className: t, ...e }) {
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
function Ts({ className: t, ...e }) {
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
function fl({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(ks, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Cs, { children: [
      /* @__PURE__ */ o(Is, { variant: "icon", children: n ?? /* @__PURE__ */ o(wo, {}) }),
      /* @__PURE__ */ o(_s, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Ts, { children: /* @__PURE__ */ o(W, { onClick: () => r(), children: e }) })
  ] });
}
const Ls = Ur(({ className: t, ...e }, r) => /* @__PURE__ */ o(fo, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
Ls.displayName = "Spinner";
const As = Pt(
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
function pl({
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
        As({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function ml({ className: t, ...e }) {
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
function hl({ className: t, ...e }) {
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
function gl({
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
function le(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function bl({
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
      defaultSize: le(t),
      minSize: le(e),
      maxSize: le(r),
      collapsedSize: le(n),
      ...a
    }
  );
}
function Nl({
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
  pi as A,
  W as B,
  pe as C,
  tr as D,
  Ze as E,
  an as F,
  Je as G,
  Xe as H,
  Pi as I,
  Bi as J,
  Ys as K,
  hi as L,
  ei as M,
  ri as N,
  oi as O,
  Ye as P,
  be as Q,
  Ri as R,
  ia as S,
  Et as T,
  ji as U,
  ue as V,
  Zo as W,
  Hi as X,
  zi as Y,
  or as Z,
  ci as _,
  Vo as a,
  La as a$,
  Jo as a0,
  Jr as a1,
  qi as a2,
  Ji as a3,
  Ui as a4,
  Fi as a5,
  Vi as a6,
  Ki as a7,
  Ti as a8,
  sa as a9,
  Ni as aA,
  cn as aB,
  he as aC,
  ge as aD,
  nn as aE,
  jo as aF,
  zo as aG,
  Dr as aH,
  pl as aI,
  hl as aJ,
  ml as aK,
  yi as aL,
  ti as aM,
  ai as aN,
  Bo as aO,
  Ro as aP,
  Qs as aQ,
  Ra as aR,
  ks as aS,
  Ts as aT,
  _s as aU,
  Cs as aV,
  Is as aW,
  ul as aX,
  wl as aY,
  Qi as aZ,
  es as a_,
  Lr as aa,
  Wi as ab,
  Yi as ac,
  Zi as ad,
  Yr as ae,
  os as af,
  sl as ag,
  vs as ah,
  il as ai,
  ys as aj,
  Pe as ak,
  wi as al,
  ll as am,
  Si as an,
  en as ao,
  ni as ap,
  qo as aq,
  dl as ar,
  xi as as,
  vi as at,
  Ai as au,
  Mr as av,
  Mi as aw,
  Di as ax,
  _i as ay,
  Oi as az,
  St as b,
  Ta as b$,
  Ja as b0,
  ea as b1,
  Ei as b2,
  ki as b3,
  Ci as b4,
  Nl as b5,
  bl as b6,
  gl as b7,
  fl as b8,
  Ls as b9,
  Xt as bA,
  nt as bB,
  el as bC,
  Po as bD,
  nl as bE,
  al as bF,
  ol as bG,
  wn as bH,
  Sa as bI,
  rl as bJ,
  ga as bK,
  xa as bL,
  ya as bM,
  ka as bN,
  $a as bO,
  ha as bP,
  ds as bQ,
  us as bR,
  Wa as bS,
  Zs as bT,
  ba as bU,
  Ea as bV,
  Ca as bW,
  xt as bX,
  cl as bY,
  Ia as bZ,
  _a as b_,
  Xi as ba,
  $i as bb,
  Ii as bc,
  Pa as bd,
  fe as be,
  Ws as bf,
  Xs as bg,
  Oo as bh,
  Mo as bi,
  Vs as bj,
  qs as bk,
  Js as bl,
  $s as bm,
  da as bn,
  Yo as bo,
  Xr as bp,
  Qr as bq,
  Br as br,
  Gi as bs,
  Ga as bt,
  ja as bu,
  tn as bv,
  pa as bw,
  Ba as bx,
  di as by,
  tl as bz,
  g as c,
  kt as d,
  Ct as e,
  bi as f,
  fi as g,
  er as h,
  rr as i,
  nr as j,
  Li as k,
  ii as l,
  li as m,
  mi as n,
  de as o,
  pt as p,
  Ko as q,
  rt as r,
  ui as s,
  gi as t,
  aa as u,
  si as v,
  Be as w,
  Qe as x,
  qe as y,
  Ve as z
};
//# sourceMappingURL=resizable-CmhTmfZn.js.map
