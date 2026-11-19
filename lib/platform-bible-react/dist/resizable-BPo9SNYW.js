import { jsx as o, jsxs as p, Fragment as xt } from "react/jsx-runtime";
import { Slot as $e, Dialog as Ct, Separator as An, Popover as te, Tooltip as Jt, DropdownMenu as tt, Label as Mn, RadioGroup as je } from "radix-ui";
import { IconX as Pn, IconCheck as qe, IconSearch as On, IconChevronLeft as Dn, IconChevronRight as Rn } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import ft, { useRef as k, useEffect as H, useCallback as _, useState as j, createContext as jn, useContext as Bn, useMemo as wt, Fragment as Jr, useLayoutEffect as ue, useImperativeHandle as Gn, useId as zn, forwardRef as Wr } from "react";
import { X as Xr, Check as be, ChevronsUpDown as Zr, Star as Hn, Undo as Un, Redo as Fn, SquareX as Ve, FunctionSquare as Je, SquareSigma as We, Ban as Kn, Copy as $n, Redo2 as qn, Undo2 as Vn, Sparkles as Jn, ClipboardCopy as Wn, ClipboardCheck as Xn, CircleCheckBig as Zn, MessageSquare as Yn, Search as Yr, Library as Qn, BookOpen as to, BookMarked as eo, Book as ro, MessageSquarePlus as no, PanelBottom as oo, FileText as ao, Scan as so, ZoomOut as io, ZoomIn as co, Eye as lo, Pencil as uo, BookCopy as wo, Users as fo, ExternalLink as po, CircleQuestionMark as mo, Settings as ho, BookA as go, House as bo, Download as No, RefreshCw as vo, Group as yo, ArrowRight as xo, Loader2 as So, ChevronDown as ko, AlertTriangle as Co, LoaderCircle as Eo } from "lucide-react";
import { cva as Ot } from "class-variance-authority";
import { filterAndRankItems as Ar, GENERATOR_NOTE_CALLER as Be, HIDDEN_NOTE_CALLER as Ge, isInsertEmbedOpOfType as Vt, getDefaultViewOptions as Io, getMarkerMenuItems as _o, defaultStyleInfo as Mr, Editorial as To } from "@eten-tech-foundation/platform-editor";
import { Section as Pt, MODIFIER_KEYS as Lo, split as Qr, slice as Ao, formatReplacementString as Mo, usfmMarkers as de, deepEqual as jt, isPlatformError as Po, ABORTED as Oo, getErrorMessage as Do, normalizeProjectId as ct, compareProjectsByName as Ro, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Qt, formatProjectName as tn, getLocalizeKeyForScrollGroupId as jo, hasDistinctFullName as Bo, getSectionForBook as Go } from "platform-bible-utils";
import { Command as Gt } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Xe from "react-resizable-panels";
import { clsx as zo } from "clsx";
import { extendTailwindMerge as Ho, twMerge as Uo } from "tailwind-merge";
const Fo = Ho({ prefix: "tw" });
function ze(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Ko(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ze(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, d) => d !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((u, d) => d !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function $o(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = ze(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = ze(e), i = s.some((u) => u.startsWith("-tw-")), c = s.some((u) => u.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const u = a.slice(1);
    return [...n, `-tw-${u}`].join(":");
  }
  if (c && a.startsWith("!")) {
    const u = a.slice(1);
    return [...n, `!tw-${u}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function m(...t) {
  const e = zo(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Fo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((u) => {
    const d = Ko(u);
    n.set(d.normalized, d.original), a.push(d.normalized);
  }), Uo(a.join(" ")).split(" ").filter(Boolean).map((u) => {
    const d = n.get(u);
    return d ? $o(u, d) : u;
  }).join(" ");
}
const en = 600, Ne = 650, ii = 400, qo = 450, Vo = 500, ci = 510, li = 520, Jo = 675, ui = 690, di = 700, wi = 800, rn = Ot(
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
  const s = n ? $e.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: m(rn({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const nn = "layoutDirection";
function on() {
  return globalThis.localStorage ?? void 0;
}
function ht() {
  var t;
  try {
    const e = (t = on()) == null ? void 0 : t.getItem(nn);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function fi(t) {
  var e;
  try {
    (e = on()) == null || e.setItem(nn, t);
  } catch {
  }
}
function pi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Root, { "data-slot": "dialog", ...t });
}
function mi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Wo({ ...t }) {
  return /* @__PURE__ */ o(Ct.Portal, { "data-slot": "dialog-portal", ...t });
}
function hi({ ...t }) {
  return /* @__PURE__ */ o(Ct.Close, { "data-slot": "dialog-close", ...t });
}
function Xo({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Ct.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: m(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: qo, ...e },
      ...r
    }
  );
}
function gi({
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
  const c = ht();
  return /* @__PURE__ */ p(Wo, { children: [
    /* @__PURE__ */ o(Xo, { className: n, style: a }),
    /* @__PURE__ */ p(
      Ct.Content,
      {
        "data-slot": "dialog-content",
        className: m(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Vo, ...s },
        dir: c,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(Ct.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Pn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function bi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "dialog-header",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Ni({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dialog-footer",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...n,
      children: [
        r,
        e && /* @__PURE__ */ o(Ct.Close, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function vi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ct.Title,
    {
      "data-slot": "dialog-title",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function yi({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Ct.Description,
    {
      "data-slot": "dialog-description",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function an({ className: t, type: e, ...r }) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: m(
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
function Zo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Yo = Ot(
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
function Qo({
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
        className: m(Yo({ align: e }), t),
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
function Ze({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gt,
    {
      "data-slot": "command",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function Ye({
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
      const c = i.currentTarget.closest("[cmdk-root]"), u = c == null ? void 0 : c.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (i.preventDefault(), i.stopPropagation(), u.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ p(Zo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Gt.Input,
        {
          "data-slot": "command-input",
          className: m(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...n
        }
      ),
      /* @__PURE__ */ o(Qo, { children: /* @__PURE__ */ o(On, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Qe({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Gt.List,
    {
      "data-slot": "command-list",
      className: m(
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
function tr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Empty,
    {
      "data-slot": "command-empty",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function he({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Group,
    {
      "data-slot": "command-group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function He({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Gt.Separator,
    {
      "data-slot": "command-separator",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function ve({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ p(
    Gt.Item,
    {
      "data-slot": "command-item",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ o(qe, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function ta({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "command-shortcut",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const ea = [
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
], ra = (t) => {
  var e;
  return ((e = ea[t]) == null ? void 0 : e.chapters) ?? -1;
}, na = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function oa(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function B(t) {
  return `%scrollGroup_${t}%`;
}
const aa = {
  [B("undefined")]: "Ø",
  [B(0)]: "A",
  [B(1)]: "B",
  [B(2)]: "C",
  [B(3)]: "D",
  [B(4)]: "E",
  [B(5)]: "F",
  [B(6)]: "G",
  [B(7)]: "H",
  [B(8)]: "I",
  [B(9)]: "J",
  [B(10)]: "K",
  [B(11)]: "L",
  [B(12)]: "M",
  [B(13)]: "N",
  [B(14)]: "O",
  [B(15)]: "P",
  [B(16)]: "Q",
  [B(17)]: "R",
  [B(18)]: "S",
  [B(19)]: "T",
  [B(20)]: "U",
  [B(21)]: "V",
  [B(22)]: "W",
  [B(23)]: "X",
  [B(24)]: "Y",
  [B(25)]: "Z"
};
function er(t, e) {
  return ra(ot.bookIdToNumber(t));
}
function ye(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = ot.bookIdToNumber(i);
    (r === "next" ? c > n && c < s : c < n && c > s) && (a = i, s = c);
  }), a;
}
function xi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = ye(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(er(s), 1),
      verseNum: 1
    };
}
function Si(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < er(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = ye(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function ki(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = ye(n, e, "previous");
  if (!i) return;
  const c = Math.max(er(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function Ci(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = ye(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Ei(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Ii = (t, e, r, n, a) => {
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
}, _i = (t, e, r, n, a) => {
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
function Ti(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function sa(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Li = Object.fromEntries(
  na.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function Ai(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function sn() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function cn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function ln(t) {
  cn(document, sn()) || t();
}
function Pr(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Or(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function ia(t, e) {
  const [r] = j(sn), n = k(t);
  n.current = t;
  const a = k(e);
  return a.current = e, _(
    (s) => {
      var u, d;
      if ((u = n.current) == null || u.call(n, s), s.defaultPrevented) return;
      if (cn(document, r)) {
        s.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: i } = document;
      if (i && i !== document.body) return;
      const c = (d = a.current) == null ? void 0 : d.call(a);
      c && (c.focus({ preventScroll: !0 }), document.activeElement === c && s.preventDefault());
    },
    [r]
  );
}
const un = Symbol.for("platform-bible-react.window-blur-press");
function ca(t) {
  return Reflect.get(t, un) === !0;
}
function dn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = k(void 0), n = k(void 0), a = k(void 0);
  H(() => {
    const d = () => {
      const w = r.current;
      if (!w || w.dataset.state === "closed") return;
      const y = w.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, f = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(f, un, { value: !0 }), y.dispatchEvent(f);
    };
    return window.addEventListener("blur", d), () => window.removeEventListener("blur", d);
  }, []);
  const s = _(
    (d) => {
      if (r.current = d ?? void 0, d && d !== n.current && (n.current = d, a.current = Pr(d) ?? Or(d)), typeof t == "function") {
        const w = t(d);
        if (typeof w == "function")
          return () => {
            r.current = void 0, w();
          };
      } else t && (t.current = d);
    },
    [t]
  ), i = _(() => {
    var x;
    const d = n.current, w = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (d && Pr(d)) ?? w ?? (d && Or(d));
    return y != null && y.isConnected ? y : void 0;
  }, []), c = ia(
    e,
    i
  ), u = _(
    (d) => {
      c(d), r.current || (n.current = void 0, a.current = void 0);
    },
    [c]
  );
  return { ref: s, onCloseAutoFocus: u };
}
const Dr = `
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
function la(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function ee(t, e) {
  const r = e ? `${Dr}, ${e}` : Dr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && la(n)
  );
}
const Mi = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Ue = "keyboard", Rr = !1;
function Pi() {
  Rr || typeof document > "u" || (Rr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      ca(t) || (Ue = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Ue = "keyboard";
    },
    !0
  ));
}
function Oi() {
  return Ue;
}
const wn = "data-quiet-focus";
function Di(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(wn, ""), t.style.outline = "none"));
}
function Ri(t) {
  t && (t.removeAttribute(wn), t.style.removeProperty("outline"));
}
const ji = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function ua({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    An.Root,
    {
      "data-slot": "separator",
      decorative: r,
      orientation: e,
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...n
    }
  );
}
const da = Ot(
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
function rr({
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
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        da({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Bi({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? $e.Root : "div";
  return /* @__PURE__ */ o(
    n,
    {
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function fn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    ua,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function pn() {
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
function nr({ ...t }) {
  return /* @__PURE__ */ o(te.Root, { "data-slot": "popover", ...t });
}
function Fe({ ...t }) {
  return /* @__PURE__ */ o(te.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: wa, usePortalContainer: fa } = pn(), Gi = wa;
function or({
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
  const c = ht(), u = fa(), d = dn({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(te.Portal, { container: u, children: /* @__PURE__ */ o(
      te.Content,
      {
        "data-slot": "popover-content",
        ...d,
        align: e,
        sideOffset: r,
        className: m(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: en, ...n },
        dir: c,
        ...i
      }
    ) })
  );
}
function pa({ ...t }) {
  return /* @__PURE__ */ o(te.Anchor, { "data-slot": "popover-anchor", ...t });
}
function zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: m("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Hi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: m("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ui({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: m("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Lt({
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
function Et({ ...t }) {
  return /* @__PURE__ */ o(Jt.Root, { "data-slot": "tooltip", ...t });
}
function It({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? m(rn({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: ma, usePortalContainer: ha } = pn(), Fi = ma;
function _t({
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
  const c = ha();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: c, children: /* @__PURE__ */ p(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Jo, ...r },
        className: m(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          n && /* @__PURE__ */ o(
            Jt.Arrow,
            {
              className: m(
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
const ga = /^%[^%]*%$/;
function mn(t) {
  return t !== void 0 && !ga.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return mn(t) ? t : e;
}
function ba() {
  const [t, e] = j(!1), r = k(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const hn = jn(void 0);
function xe() {
  const t = Bn(hn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Se = Ot("", {
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
function ar({ variant: t = "default", ...e }) {
  const r = ht(), n = ft.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(hn.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Ki({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function sr({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function ir({
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
  const u = ht(), d = dn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...d,
      sideOffset: r,
      align: e,
      className: m(
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
      style: { zIndex: en, ...n },
      ...c,
      children: /* @__PURE__ */ o("div", { dir: u, children: a })
    }
  ) });
}
function $i({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function qi({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = ht(), s = xe();
  return /* @__PURE__ */ o(
    tt.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: m(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Se({ variant: s.variant })
      ),
      dir: a,
      ...n
    }
  );
}
function Wt({
  className: t,
  children: e,
  checked: r,
  inset: n,
  ...a
}) {
  const s = ht(), i = xe();
  return /* @__PURE__ */ p(
    tt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Se({ variant: i.variant })
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(qe, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Na({
  ...t
}) {
  return /* @__PURE__ */ o(tt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function jr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = ht(), s = xe();
  return /* @__PURE__ */ p(
    tt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Se({ variant: s.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(qe, {}) })
          }
        ),
        e
      ]
    }
  );
}
function cr({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    tt.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: m(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function lr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    tt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Vi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: m(
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
function Ji({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Wi({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = xe(), s = ht();
  return /* @__PURE__ */ p(
    tt.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Se({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        s === "rtl" ? /* @__PURE__ */ o(Dn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Rn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Xi({
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
      className: m(
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
      style: { zIndex: Ne, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function Zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Mn.Root,
    {
      "data-slot": "label",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function Yi({
  className: t,
  ...e
}) {
  const r = ht();
  return /* @__PURE__ */ o(
    je.Root,
    {
      "data-slot": "radio-group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: r,
      ...e
    }
  );
}
function Qi({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    je.Item,
    {
      "data-slot": "radio-group-item",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        je.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const tc = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Br = (t, e) => t[e] ?? e;
function va({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Br(n, "%cancelButton_tooltip%"), c = s ?? Br(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(rr, { children: [
    /* @__PURE__ */ o(Lt, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Xr, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(fn, {}),
    /* @__PURE__ */ o(Lt, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": c,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(be, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: c }) })
    ] }) })
  ] });
}
function ke() {
  return /Macintosh/i.test(navigator.userAgent);
}
function ec() {
  return /Windows/i.test(navigator.userAgent);
}
const ya = ["input", "select", "textarea", "button"], xa = ["button", "textbox"], rc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = k(null), [s, i] = j(void 0), [c, u] = j(void 0), d = _(
    (f) => {
      i(f);
      const v = t.find((A) => A.id === f);
      v && (e == null || e(v));
      const I = document.getElementById(f);
      I && (I.scrollIntoView({ block: "center" }), I.focus()), a.current && a.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), w = _(
    (f) => {
      const v = t.find((I) => I.id === f);
      v && (u((I) => I === f ? void 0 : f), r == null || r(v));
    },
    [r, t]
  ), y = (f) => {
    if (!f) return !1;
    const v = f.tagName.toLowerCase();
    if (f.isContentEditable || ya.includes(v)) return !0;
    const I = f.getAttribute("role");
    if (I && xa.includes(I)) return !0;
    const A = f.getAttribute("tabindex");
    return A !== void 0 && A !== "-1";
  }, x = _(
    (f) => {
      var q;
      const v = f.target, I = (M) => M ? document.getElementById(M) : void 0, A = I(c), b = I(s);
      if (!!(A && v && A.contains(v) && v !== A) && y(v)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            f.preventDefault(), f.stopPropagation();
            const M = t.find((V) => V.id === c);
            M && d(M.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!A) return;
          const M = Array.from(
            A.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (M.length === 0) return;
          const V = M.findIndex((lt) => lt === v);
          if (V === -1) return;
          let pt;
          f.key === "ArrowDown" ? pt = Math.min(V + 1, M.length - 1) : pt = Math.max(V - 1, 0), pt !== V && (f.preventDefault(), f.stopPropagation(), (q = M[pt]) == null || q.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((M) => M.id === s);
      let R = C;
      switch (f.key) {
        case "ArrowDown":
          R = Math.min(C + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          R = Math.max(C - 1, 0), f.preventDefault();
          break;
        case "Home":
          R = 0, f.preventDefault();
          break;
        case "End":
          R = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && w(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const M = b;
          if (M) {
            const V = M.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), pt = M.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), lt = V ?? pt;
            if (lt) {
              f.preventDefault(), lt.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (y(v) || (n == null || n(f.key), f.preventDefault()));
          return;
      }
      const F = t[R];
      F && d(F.id);
    },
    [t, d, s, c, w, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: c,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Sa = Ot(
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
function ge({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? $e.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Sa({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function nc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: m("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function gn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function oc({
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
    const c = () => {
      requestAnimationFrame(() => {
        ee(i, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
        });
      });
    };
    c();
    const u = new MutationObserver(() => {
      c();
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
    var u;
    const { current: c } = a;
    if (c && gn(i, c)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (u = ee(c)[0]) == null || u.focus();
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
        className: m("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: a,
            onKeyDown: s,
            className: m(
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
function ac({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: m(
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
function sc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: m("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function ic({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: m(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function ka(t) {
  ft.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? ee(t.current) : [], s = a.indexOf(document.activeElement), i = n.key === "ArrowRight" ? s + 1 : s - 1;
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
function Ca(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Ea(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function cc({
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
  }, [a]), ka(i);
  const c = ft.useMemo(
    () => i.current ? ee(i.current) : [],
    [i]
  ), u = ft.useCallback(
    (w) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!gn(w, y)) {
        e == null || e(w);
        return;
      }
      const x = y.closest("table"), f = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ee(x).filter(
          (A) => A.tagName === "TR"
        )
      ) : [], v = f.indexOf(y), I = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Ea(f, v, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Ca(c, I, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const A = y.closest("table");
        A && A.focus();
      }
      e == null || e(w);
    },
    [i, c, e]
  ), d = ft.useCallback(
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
      onKeyDown: u,
      onFocus: d,
      className: m(
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
function lc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "th",
    {
      "data-slot": "table-head",
      className: m(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function uc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "td",
    {
      "data-slot": "table-cell",
      className: m(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function dc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: m("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ia(t, e = !0) {
  const [r, n] = j(!1);
  return H(() => {
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
function _a({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Ia(r, e);
  return e ? (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ p("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
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
function wc({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: c = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: d,
  isOpen: w = void 0,
  onOpenChange: y = void 0,
  isDisabled: x = !1,
  sortSelected: f = !1,
  showScrollCue: v = !1,
  icon: I = void 0,
  className: A = void 0,
  variant: b = "ghost",
  id: D
}) {
  const [$, C] = j(!1), R = k(null), F = _(
    (K) => {
      var Y;
      const st = (Y = t.find((et) => et.label === K)) == null ? void 0 : Y.value;
      st && r(
        e.includes(st) ? e.filter((et) => et !== st) : [...e, st]
      );
    },
    [t, e, r]
  ), q = () => d || n, M = w ?? $, V = y ?? C, [pt, lt] = j(M), [Tt, at] = j(e);
  pt !== M && (lt(M), M && at(e));
  const zt = wt(() => {
    if (!f) return t;
    const K = t.filter((Y) => Y.starred).sort((Y, et) => Y.label.localeCompare(et.label)), st = t.filter((Y) => !Y.starred).sort((Y, et) => {
      const Dt = Tt.includes(Y.value), Ut = Tt.includes(et.value);
      return Dt && !Ut ? -1 : !Dt && Ut ? 1 : Y.label.localeCompare(et.label);
    });
    return [...K, ...st];
  }, [t, Tt, f]), gt = () => {
    const K = t.map((st) => st.value);
    at(K), r(K);
  }, Ht = () => {
    at([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: D, className: A, children: /* @__PURE__ */ p(nr, { open: M, onOpenChange: V, children: [
    /* @__PURE__ */ o(Fe, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
      {
        variant: b,
        role: "combobox",
        "aria-expanded": M,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: x,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            I && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: I }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: q()
              }
            )
          ] }),
          /* @__PURE__ */ o(Zr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(or, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Ze, { children: [
      /* @__PURE__ */ o(
        Ye,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: gt, children: i }),
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Ht, children: c })
      ] }),
      /* @__PURE__ */ o(_a, { isEnabled: v, scrollerRef: R, children: /* @__PURE__ */ p(Qe, { ref: R, children: [
        /* @__PURE__ */ o(tr, { children: u }),
        /* @__PURE__ */ o(he, { children: zt.map((K) => /* @__PURE__ */ p(
          ve,
          {
            value: K.label,
            onSelect: F,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                be,
                {
                  className: m(
                    "tw:h-4 tw:w-4",
                    e.includes(K.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              K.starred && /* @__PURE__ */ o(Hn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: K.label }),
              K.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: K.secondaryLabel })
            ]
          },
          K.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function kt(t) {
  return t.replace(/^\+/, "");
}
function Ta(t, e) {
  if (!t || e === "") return !1;
  const r = kt(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && kt(n.marker).toLowerCase() === r
  );
}
function La(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = kt(e).toLowerCase();
  return r === "passive" ? Ar({
    query: a,
    items: n,
    filter: (s) => kt(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Ar({
    query: a,
    items: n,
    filter: (s) => kt(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function pe(t) {
  return t.isComposing || t.keyCode === 229;
}
const bn = /^[a-z0-9+-]$/i;
function Aa(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && ke()) && e !== "Dead") {
    if (bn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Ma = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Pa = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Oa() {
  return [...Ma, ...Pa.filter((t) => bn.test(t))];
}
function dt(t) {
  t.preventDefault(), t.stopPropagation();
}
function Da(t, e, r) {
  var i, c;
  const { kind: n } = e;
  if (pe(t) || Lo.has(t.key))
    return "passed";
  const a = !ke();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && dt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return dt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return dt(t), La(
      e.items.map((d) => ({ label: d.marker })),
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
      const w = kt(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, w)) {
        const y = e.items.find(
          (x) => kt(x.marker).toLowerCase() === w
        );
        return y && r.commitItem(y.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    dt(t);
    const u = kt(e.filter).toLowerCase(), d = e.items.find(
      (w) => kt(w.marker).toLowerCase() === u
    );
    return d && r.commitItem(d.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (dt(t), r.dismiss(), "ended") : (dt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (dt(t), "continue") : (dt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return dt(t), r.dismiss(), "ended";
  const s = Aa(t);
  return t.key === "Backspace" || s !== void 0 ? (dt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (dt(t), "continue");
}
function Ra(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function Nn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function ja(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Ba(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: c,
    show: u,
    restoreSelectionIfLost: d,
    hasEditorChangedSinceFocus: w,
    focusEditor: y,
    applyItem: x,
    onShowError: f
  } = t, v = () => {
    d(), y();
  };
  a.current += 1;
  const I = a.current, A = () => a.current === I, b = { kind: r, token: I, filter: "", items: e };
  n && (b.isNoteMarker = n), s(b), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Oa(),
    onKey: (D) => c(D)
  }).then((D) => {
    var C;
    i(I);
    const $ = D ?? ((C = b.itemToApplyOnClose) == null ? void 0 : C.marker);
    if ($ !== void 0) {
      const R = (w == null ? void 0 : w()) ?? !1;
      v();
      const F = R ? void 0 : e.find((q) => q.marker === $);
      F && x(F);
    } else A() && v();
  }).catch((D) => {
    i(I), A() && v(), f(D);
  });
}
function Ga(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: c,
    hasEditorChangedSinceFocus: u
  } = e, d = r.current;
  if (!d) return "no-session";
  const w = (x) => {
    if (u != null && u()) {
      a.dismiss();
      return;
    }
    x();
  };
  return Da(t, d, {
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
      const f = d.items.find((I) => I.marker === x);
      if (f) {
        if (f.kind === "note") {
          d.itemToApplyOnClose = f;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(f, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && c(d.token), "routed";
}
function za({
  isSessionOpen: t,
  dismiss: e,
  target: r
}) {
  H(() => {
    const n = r ?? document, a = () => {
      t() && e();
    };
    return n.addEventListener("compositionstart", a, { capture: !0 }), () => {
      n.removeEventListener("compositionstart", a, { capture: !0 });
    };
  }, [t, e, r]);
}
function Ha({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  H(() => {
    const i = s ?? document, c = (u) => {
      var y, x, f;
      const d = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!d || u.target !== d) return;
      const w = (x = e.current) == null ? void 0 : x.getSelection();
      w ? r.current = w : (f = e.current) != null && f.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = Nn(
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
function Ua({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = k(void 0), a = _(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const c = e.current ?? void 0;
      n.current = i ? c : void 0, c == null || c.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = _(
    (i) => {
      var c;
      Ra(t, i), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return H(
    () => () => {
      var i;
      (i = n.current) == null || i.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: s };
}
function Gr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd",
      className: m(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function Fa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: m("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Ka = /* @__PURE__ */ new Set([
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
function $a(t) {
  const e = Qr(t, "");
  let r = 0;
  for (; r < e.length && Ka.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Ao(t, r);
  return a ? [...n, a] : n;
}
function qa(t) {
  const e = [];
  let r = "";
  return Qr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function Va(t) {
  const e = $a(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: qa(t), separator: "+" };
}
function zr({ hint: t }) {
  const { keycaps: e, separator: r } = Va(t);
  return e.length === 1 ? /* @__PURE__ */ o(Gr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Fa, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ p(Jr, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(Gr, { children: n })
      ] }, a)
    )) })
  );
}
const fc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Hr = (t, e) => t[e] ?? e;
function Ja({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const u = ke(), d = Hr(a, "%undoButton_tooltip%"), w = Hr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(rr, { children: [
    /* @__PURE__ */ o(Lt, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": d,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ o(Un, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ p("p", { children: [
        d,
        s && /* @__PURE__ */ p(xt, { children: [
          " ",
          /* @__PURE__ */ o(zr, { hint: u ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ o(fn, {}),
    e && /* @__PURE__ */ o(Lt, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": w,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o(Fn, {})
        }
      ) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ p("p", { children: [
        w,
        s && /* @__PURE__ */ p(xt, { children: [
          " ",
          /* @__PURE__ */ o(zr, { hint: u ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Wa({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = k(null);
  return H(() => {
    var u;
    const s = ke(), i = ((u = a.current) == null ? void 0 : u.querySelector(".editor-input")) ?? void 0, c = (d) => {
      var y, x, f, v;
      if (!i || document.activeElement !== i) return;
      const w = d.key.toLowerCase();
      if (s) {
        if (!d.metaKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((y = e.current) == null || y.undo())) : d.shiftKey && w === "z" && (d.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!d.ctrlKey) return;
        !d.shiftKey && w === "z" ? (d.preventDefault(), r && ((f = e.current) == null || f.undo())) : (w === "y" || d.shiftKey && w === "z") && (d.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function Xa() {
  const t = k(void 0), e = k(new DOMRect()), r = k({
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
  return wt(() => ({ virtualRef: r, setSource: n }), [n]);
}
function Za(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Ya(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Qa = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function ts({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = k(!1), i = k(null), c = k(null), u = k(!1), [d, w] = j(t), [y, x] = j(e), [f, v] = j(!1), I = k(!1), A = k(d);
  A.current = d;
  const b = k(y);
  b.current = y, H(() => {
    w(t);
  }, [t]), H(() => {
    y !== e && x(e);
  }, [e]);
  const D = (C) => {
    if (u.current = !1, v(C), !C) {
      const R = A.current, F = b.current;
      R !== "custom" || F ? (R !== t || F !== e) && (s.current = !0, r(R, F)) : (w(t), x(e));
    }
  }, $ = (C) => {
    var R, F, q, M;
    C.stopPropagation(), document.activeElement === c.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((R = i.current) == null || R.focus(), u.current = !0) : document.activeElement === i.current && C.key === "ArrowUp" ? ((F = c.current) == null || F.focus(), u.current = !1) : document.activeElement === i.current && C.key === "ArrowLeft" && ((q = i.current) == null ? void 0 : q.selectionStart) === 0 && ((M = c.current) == null || M.focus(), u.current = !1), d === "custom" && C.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && D(!1);
  };
  return /* @__PURE__ */ p(ar, { open: f, onOpenChange: D, children: [
    /* @__PURE__ */ o(Lt, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(sr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Qa(t, n, e) }) }) }),
      /* @__PURE__ */ o(_t, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      ir,
      {
        style: { zIndex: Ne },
        onEscapeKeyDown: () => {
          A.current = t, b.current = e, w(t), x(e);
        },
        onCloseAutoFocus: (C) => {
          s.current && (s.current = !1, C.preventDefault(), ln(a));
        },
        onClick: () => {
          u.current && (u.current = !1);
        },
        onKeyDown: $,
        onMouseMove: () => {
          var C;
          u.current && ((C = i.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ o(cr, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(lr, {}),
          /* @__PURE__ */ o(
            Wt,
            {
              checked: d === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Be })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Wt,
            {
              checked: d === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ge })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Wt,
            {
              ref: c,
              checked: d === "custom",
              onCheckedChange: () => w("custom"),
              onPointerDown: () => {
                I.current = d === "custom";
              },
              onClick: (C) => {
                var R;
                if (C.stopPropagation(), I.current && C.target !== i.current) {
                  D(!1);
                  return;
                }
                u.current = !0, (R = i.current) == null || R.focus();
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  an,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), w("custom"), u.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: y,
                    onKeyDown: (C) => {
                      C.key === "Enter" || C.key === "ArrowUp" || C.key === "ArrowDown" || C.key === "ArrowLeft" || C.key === "ArrowRight" || C.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (C) => x(C.target.value)
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
const es = (t, e) => t === "f" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(Je, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(We, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(Ve, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), rs = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Mo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ns({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = k(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ p(ar, { children: [
    /* @__PURE__ */ o(Lt, { children: /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(sr, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: es(t, r) }) }) }),
      /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: rs(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(
      ir,
      {
        style: { zIndex: Ne },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), ln(a));
        },
        children: [
          /* @__PURE__ */ o(cr, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(lr, {}),
          /* @__PURE__ */ p(
            Wt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ve, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            Wt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Je, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            Wt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(We, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Ur = '[aria-controls="editor-context-menu"]';
function os(t) {
  return t ? t.matches(Ur) ? !0 : !!t.querySelector(Ur) : !1;
}
const pc = Object.freeze([
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
function as({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Kn, { className: e, size: 16 });
}
function ss({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(be, { size: 16 })
    }
  );
}
function me(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Fr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    ve,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      value: me(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(ss, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(as, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(ta, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function is({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = j(""), [c] = j(() => {
    const w = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
    return w ? me(w) : void 0;
  }), [u, d] = wt(() => {
    const w = kt(s.trim().toLowerCase());
    if (!w) {
      const f = e.filter((v) => !v.isDisallowed);
      return [f.length > 0 ? f : e, []];
    }
    const y = e.filter((f) => {
      var I;
      const v = (I = f.marker) == null ? void 0 : I.toLowerCase();
      return f.isDisallowed ? v === w : v == null ? void 0 : v.includes(w);
    }), x = e.filter(
      (f) => f.title.toLowerCase().includes(w) && !y.includes(f)
    );
    return [y, x];
  }, [s, e]);
  return /* @__PURE__ */ p(Ze, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: c, children: [
    /* @__PURE__ */ o(
      Ye,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (w) => i(w),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ p(Qe, { children: [
      /* @__PURE__ */ o(tr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(he, { children: u.map((w) => /* @__PURE__ */ o(
        Fr,
        {
          item: w,
          localizedStrings: t
        },
        me(w)
      )) }),
      d.length > 0 && /* @__PURE__ */ p(xt, { children: [
        u.length > 0 && /* @__PURE__ */ o(He, { alwaysRender: !0 }),
        /* @__PURE__ */ o(he, { children: d.map((w) => /* @__PURE__ */ o(
          Fr,
          {
            item: w,
            localizedStrings: t
          },
          me(w)
        )) })
      ] })
    ] })
  ] });
}
function cs(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = de[n], i = s != null && s.children ? s : a && de[a];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, u]) => {
    c.push(
      ...u.map((d) => ({
        marker: d,
        title: r[de[d].description] ?? de[d].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(d), e();
        }
      }))
    );
  }), c.sort((u, d) => (u.marker ?? u.title).localeCompare(d.marker ?? d.title));
}
function Kr(t) {
  if (!t || !Vt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function ls(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function us(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function ds(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function ws(t, e) {
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
      const c = i.insert.slice(n), u = Math.min(c.length, s.length);
      if (c.slice(0, u) !== s.slice(0, u)) return !1;
      s = s.slice(u), n += u, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function fs(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ps(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const ms = 300, De = "*", hs = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function mc({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: c,
  localizedStrings: u,
  parentEditorRef: d,
  inline: w = !1,
  ref: y,
  initialCaretPosition: x,
  markerPalette: f,
  onNoteEdit: v,
  hasBuiltInContextMenu: I = !0,
  isHostContextMenuClaimingKeys: A
}) {
  var Lr;
  const b = k(null), D = k(null), $ = k(null), C = k(s);
  H(() => {
    C.current = s;
  }, [s]);
  const R = k(x);
  H(() => {
    R.current = x;
  }, [x]);
  const F = _(() => {
    var h, N;
    const l = R.current;
    l !== void 0 && l !== "end" ? (h = b.current) == null || h.selectNoteTextOffset(0, l.utf16Offset, {
      field: l.field,
      glyph: l.glyph
    }) : (N = b.current) == null || N.selectNote(0);
  }, []);
  ue(() => {
    if (w || !$.current) return;
    const l = parseFloat(getComputedStyle($.current).width);
    l > 0 && ($.current.style.width = `${l}px`);
  }, [w]);
  const [q, M] = j("generated"), [V, pt] = j("generated"), [lt, Tt] = j(De), [at, zt] = j(De), [gt, Ht] = j("f"), [K, st] = j(!1), [Y, et] = j(!0), [Dt, Ut] = j(!1), g = k(!1), P = k(""), J = k(!1), Q = k(void 0), U = k([]), W = k([]), Ft = k(void 0), ne = k(void 0), pr = _(() => {
    var h;
    const l = (h = b.current) == null ? void 0 : h.takeOpsAfterNote(0);
    l != null && l.length && (U.current = [...U.current, ...l], Ft.current = void 0);
  }, []), mr = _(
    (l, h) => {
      var T, E;
      if (!l) return;
      const N = Kr(l), S = Kr(h);
      if (!N && S) {
        Ft.current = {
          text: U.current,
          closedNoteOp: l,
          openNoteOp: h
        }, U.current = [];
        return;
      }
      const L = Ft.current;
      L && (N && !S && jt(l, L.openNoteOp) && jt(h, L.closedNoteOp) && !((E = (T = b.current) == null ? void 0 : T.getOpsAfterNote(0)) != null && E.length) ? (U.current = L.text, Ft.current = void 0) : jt(h, L.openNoteOp) || (Ft.current = void 0));
    },
    []
  ), [St, oe] = j(!1), Ce = Xa(), [hr, kn] = j(), gr = k(null), bt = k(
    void 0
  ), Cn = k(0), br = k(f);
  H(() => {
    br.current = f;
  }, [f]), H(
    () => () => {
      var l;
      bt.current && (bt.current = void 0, (l = br.current) == null || l.dismiss());
    },
    []
  );
  const Zt = k(void 0), Ee = k(void 0), ae = _(
    () => ja(
      Ee.current,
      Nn(
        () => {
          var l;
          return (l = b.current) == null ? void 0 : l.getUsj();
        },
        () => {
          var l;
          return (l = b.current) == null ? void 0 : l.getSelection();
        }
      )
    ),
    []
  ), { setSession: Nr, clearSessionIfCurrent: se } = Ua({
    sessionRef: bt,
    editorRef: b,
    baselineRef: Ee
  }), Kt = _(() => {
    var h, N, S, L;
    if ((h = b.current) != null && h.getSelection() || (N = b.current) != null && N.getSelectedParaMarker()) return;
    const l = Zt.current;
    l ? (S = b.current) == null || S.setSelection(l) : (L = b.current) == null || L.selectNote(0);
  }, []), ie = _(() => {
    var l;
    Kt(), (l = b.current) == null || l.focus();
  }, [Kt]), At = wt(
    () => ({
      ...i,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      hasBuiltInContextMenu: I,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...i.view ?? Io(),
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
    [i, c, I]
  ), vr = k(I), ce = k(A);
  H(() => {
    vr.current = I, ce.current = A;
  }, [I, A]);
  const Ie = _(
    () => vr.current && os(D.current),
    []
  ), yr = _(
    () => {
      var l;
      return !!((l = ce.current) != null && l.call(ce));
    },
    []
  ), _e = wt(
    () => cs(
      b,
      () => oe(!1),
      u,
      hr,
      gt
    ),
    [u, hr, gt]
  );
  H(() => {
    var l;
    St || (l = b.current) == null || l.focus();
  }, [gt, St]);
  const Mt = _(() => {
    var S, L, T;
    const l = (S = D.current) == null ? void 0 : S.querySelector(".editor-input"), h = l == null ? void 0 : l.querySelector("span.note"), N = (T = (L = D.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : T.anchorNode;
    return !!h && !!N && h.contains(N);
  }, []), Rt = _(
    (l = !1) => {
      var N, S, L, T, E;
      v == null || v();
      const h = (S = (N = b.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (h && Vt("note", h) && (r == null || r([h]), l && d && C.current)) {
        const G = [
          ...U.current,
          ...((L = b.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], O = W.current, mt = !jt(G, O);
        if (w && !mt && jt(h, Q.current))
          return;
        Q.current = h;
        const X = [h];
        mt && (O.length > 0 && ws(
          ((T = d.current) == null ? void 0 : T.getOpsAfterNote(C.current)) ?? [],
          O
        ) && X.push({ delete: ds(O) }), X.push(...G), W.current = G), (E = d.current) == null || E.replaceEmbedUpdate(C.current, X);
      }
    },
    [w, r, v, d]
  ), Te = _(
    (l) => {
      var N, S, L;
      const h = (N = b.current) == null ? void 0 : N.getSelection();
      (S = b.current) == null || S.applyUpdate([l, { delete: 1 }]), h && ((L = b.current) == null || L.setSelection(h)), ie();
    },
    [ie]
  ), xr = _(
    (l, h) => {
      var L, T, E;
      bt.current || (L = b.current) == null || L.commitPendingMarkerEdits();
      const N = (E = (T = b.current) == null ? void 0 : T.getNoteOps(0)) == null ? void 0 : E.at(0);
      if (!N || !Vt("note", N) || !N.insert.note) return;
      let S;
      l === "custom" ? S = h : l === "generated" ? S = Be : S = Ge, N.insert.note.caller !== S && (N.insert.note.caller = S, Te(N));
    },
    [Te]
  ), $t = k(void 0), Le = k(Rt);
  H(() => {
    Le.current = Rt;
  }, [Rt]);
  const qt = _(() => {
    $t.current !== void 0 && (clearTimeout($t.current), $t.current = void 0);
  }, []), Nt = _(() => {
    $t.current !== void 0 && (qt(), Le.current(!0));
  }, [qt]), Sr = _(() => {
    qt(), $t.current = setTimeout(() => {
      $t.current = void 0, Le.current(!0);
    }, ms);
  }, [qt]);
  H(() => {
    var L, T;
    let l, h, N;
    g.current = !1, J.current = !1, Zt.current = void 0, et(!0);
    const S = e == null ? void 0 : e.at(0);
    if (Q.current = S, U.current = [], W.current = [], Ft.current = void 0, ne.current = void 0, S && Vt("note", S)) {
      const E = (L = S.insert.note) == null ? void 0 : L.caller;
      let G = "custom";
      E === Be ? G = "generated" : E === Ge && (G = "hidden");
      const O = G === "custom" && E !== void 0 ? E : De;
      Tt(O), zt(O), M(G), pt(G), Ht(((T = S.insert.note) == null ? void 0 : T.style) ?? "f"), l = setTimeout(() => {
        var X, it, ut, vt;
        const mt = (it = (X = b.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : it.at(0);
        (ut = b.current) == null || ut.applyUpdate(mt ? [S, { delete: 1 }] : [S]), F(), (vt = b.current) == null || vt.focus(), h = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var yt;
            Mt() || (F(), (yt = b.current) == null || yt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      Nt(), R.current = void 0, l && clearTimeout(l), h !== void 0 && cancelAnimationFrame(h), N !== void 0 && clearTimeout(N);
    };
  }, [e, Nt, Mt, F]), ue(() => () => Nt(), [Nt]);
  const kr = _(() => {
    var l;
    J.current && (bt.current || (l = b.current) == null || l.commitPendingMarkerEdits(), Nt());
  }, [Nt]), Yt = _((l) => {
    const h = b.current;
    if (!h) return;
    const N = Zt.current;
    N && !h.getSelection() && !h.getSelectedParaMarker() && h.setSelection(N), h[l]();
  }, []);
  Gn(
    y,
    () => ({
      flushPendingEdits: kr,
      focus: () => {
        var l;
        return (l = b.current) == null ? void 0 : l.focus();
      },
      containsFocus: () => {
        const l = $.current;
        return !!l && l.contains(l.ownerDocument.activeElement);
      },
      cut: () => Yt("cut"),
      copy: () => Yt("copy"),
      paste: () => Yt("paste"),
      pastePlainText: () => Yt("pastePlainText")
    }),
    [kr, Yt]
  );
  const Ae = _(() => {
    var l, h;
    if (!bt.current) {
      const N = (l = D.current) == null ? void 0 : l.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (h = b.current) == null || h.commitPendingMarkerEdits();
    }
    w ? Nt() : (qt(), Rt(!0)), n();
  }, [qt, Nt, w, n, Rt]), Me = k(Ae);
  ue(() => {
    Me.current = Ae;
  });
  const Pe = k({ book: a.book, chapterNum: a.chapterNum });
  ue(() => {
    (Pe.current.book !== a.book || Pe.current.chapterNum !== a.chapterNum) && (Pe.current = { book: a.book, chapterNum: a.chapterNum }, Me.current());
  }, [a.book, a.chapterNum]);
  const En = () => {
    var T;
    const l = b.current, h = ls(l == null ? void 0 : l.getUsj());
    if (!l || !h) return;
    const N = ((T = D.current) == null ? void 0 : T.ownerDocument) ?? document, { activeElement: S } = N, L = l.getSelection() ?? Zt.current;
    l.setSelection(h);
    try {
      l.copy();
    } finally {
      L ? l.setSelection(L) : l.selectNote(0), l.getSelection(), N.activeElement !== S && (S instanceof HTMLElement && S !== N.body ? S.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
    }
  }, In = _(
    (l, h) => {
      v == null || v(), M(l), Tt(h), xr(l, h), w && Nt();
    },
    [xr, Nt, w, v]
  ), _n = (l) => {
    var N, S, L, T, E;
    Ht(l), bt.current || (N = b.current) == null || N.commitPendingMarkerEdits();
    const h = (L = (S = b.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (h && Vt("note", h)) {
      h.insert.note && (h.insert.note.style = l);
      const G = (E = (T = h.insert.note) == null ? void 0 : T.contents) == null ? void 0 : E.ops;
      gt !== "x" && l === "x" ? G == null || G.forEach((O) => fs(O)) : gt === "x" && l !== "x" && (G == null || G.forEach((O) => ps(O))), Te(h), w && Nt();
    }
  }, Tn = (l) => {
    kn(l.contextMarker), Ut(l.canRedo);
  }, Ln = _(
    (l) => {
      var N, S, L, T, E, G, O;
      const h = (S = (N = b.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (h && Vt("note", h)) {
        l.content.length > 1 && setTimeout(() => {
          var it;
          (it = b.current) == null || it.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (L = h.insert.note) == null ? void 0 : L.style, X = (E = (T = h.insert.note) == null ? void 0 : T.contents) == null ? void 0 : E.ops;
        if (mt || st(!1), st(
          mt === "x" ? !!(X != null && X.every((it) => {
            var vt, yt;
            if (!((vt = it.attributes) != null && vt.char)) return !0;
            const ut = ((yt = it.attributes) == null ? void 0 : yt.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(X != null && X.every((it) => {
            var vt, yt;
            if (!((vt = it.attributes) != null && vt.char)) return !0;
            const ut = ((yt = it.attributes) == null ? void 0 : yt.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !g.current) {
          g.current = !0, P.current = JSON.stringify(h), ne.current = h, et(!0);
          return;
        }
        J.current = !0, mr(ne.current, h), ne.current = h, (O = (G = b.current) == null ? void 0 : G.getOpsAfterNote(0)) != null && O.length && setTimeout(pr, 0), et(JSON.stringify(h) === P.current), Rt(), w && Sr();
      } else
        st(!1), et(!0);
    },
    [
      w,
      Rt,
      Sr,
      mr,
      pr
    ]
  ), Cr = _(() => {
    const l = window.getSelection();
    if (!_e.length || !l || l.rangeCount === 0)
      return;
    const h = D.current;
    if (!h) return;
    const N = l.getRangeAt(0).cloneRange();
    Ce.setSource({
      measure: () => {
        const S = Za(N);
        return S && Ya(S);
      },
      contextElement: h
    }), oe(!0);
  }, [_e, Ce]), Oe = k(() => {
  }), Er = _(
    (l, h, N) => {
      const { anchorRect: S } = l;
      if (!f || !S) return;
      const { hasTextSelection: L } = N;
      Ba({
        items: h,
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
        isNoteMarker: (T) => Ta(At.styleInfo ?? Mr, T),
        sessionCounterRef: Cn,
        setSession: Nr,
        clearSessionIfCurrent: se,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (T) => Oe.current(T),
        show: (T) => f.show({
          items: h.map(us),
          anchor: S,
          keyForwarding: T
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
        hasEditorChangedSinceFocus: ae,
        focusEditor: () => {
          var T;
          return (T = b.current) == null ? void 0 : T.focus();
        },
        applyItem: (T) => {
          var E;
          return (E = b.current) == null ? void 0 : E.applyMarkerMenuSelection(T, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: !1
          });
        },
        onShowError: (T) => {
          (!Po(T) || T.code !== Oo) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Do(T)}`
          );
        }
      });
    },
    [
      f,
      Kt,
      ae,
      At.styleInfo,
      Nr,
      se
    ]
  ), le = _(() => {
    var N;
    const l = (N = b.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!l) return !1;
    const h = _o(At.styleInfo ?? Mr, l);
    return h.length === 0 ? !1 : (Er(l, h, { hasTextSelection: !!l.hasTextSelection }), !0);
  }, [Er, At.styleInfo]);
  za({
    isSessionOpen: _(() => !!bt.current, []),
    dismiss: _(() => f == null ? void 0 : f.dismiss(), [f])
  });
  const Ir = _(
    (l) => {
      if (!f) return;
      Ga(l, {
        sessionRef: bt,
        editorRef: b,
        palette: f,
        restoreCaret: Kt,
        reopenAtCaret: le,
        clearSessionIfCurrent: se,
        hasEditorChangedSinceFocus: ae
      }) === "no-session" && f.dismiss();
    },
    [
      f,
      le,
      Kt,
      se,
      ae
    ]
  );
  H(() => {
    Oe.current = Ir;
  }, [Ir]), Ha({
    containerRef: D,
    editorRef: b,
    selectionRef: Zt,
    baselineRef: Ee,
    isSessionOpen: _(() => !!bt.current, [])
  }), H(() => {
    const l = () => {
      St && oe(!1);
    };
    return window.addEventListener("click", l), window.addEventListener("blur", l), () => {
      window.removeEventListener("click", l), window.removeEventListener("blur", l);
    };
  }, [St]), H(() => {
    var l;
    St && ((l = gr.current) == null || l.focus());
  }, [St]), H(() => {
    var T;
    const l = () => {
      var E;
      return ((E = D.current) == null ? void 0 : E.querySelector(".editor-input")) ?? void 0;
    };
    if (((T = At.view) == null ? void 0 : T.markerMode) === "editable") {
      const E = (O) => {
        var it, ut, vt, yt;
        if (pe(O)) return;
        const mt = bt.current, X = l();
        if (!(!X || document.activeElement !== X)) {
          if (mt && f) {
            Oe.current(O);
            return;
          }
          if (yr()) {
            (O.key === c || O.key === "Enter") && (O.preventDefault(), O.stopPropagation());
            return;
          }
          if (Ie()) {
            O.key === c && (O.preventDefault(), O.stopPropagation());
            return;
          }
          if (O.key === "Enter" && !Mt()) {
            O.preventDefault(), O.stopPropagation(), (it = b.current) == null || it.selectNote(0), (ut = b.current) == null || ut.focus();
            return;
          }
          if (f && O.key === c) {
            if (!Mt()) {
              O.preventDefault(), O.stopPropagation(), (vt = b.current) == null || vt.selectNote(0), (yt = b.current) == null || yt.focus();
              return;
            }
            le() && (O.preventDefault(), O.stopPropagation());
          }
        }
      }, G = () => {
        var mt, X;
        const O = l();
        !O || document.activeElement !== O || Mt() || ((mt = b.current) == null || mt.selectNote(0), (X = b.current) == null || X.focus());
      };
      return document.addEventListener("keydown", E, { capture: !0 }), document.addEventListener("paste", G, { capture: !0 }), () => {
        document.removeEventListener("keydown", E, { capture: !0 }), document.removeEventListener("paste", G, { capture: !0 });
      };
    }
    const h = () => {
      const E = l();
      return !E || document.activeElement !== E ? !1 : !Ie();
    }, N = (E) => {
      E.key !== "Enter" || pe(E) || h() && (E.preventDefault(), E.stopPropagation());
    }, S = (E) => {
      E.inputType !== "insertParagraph" && E.inputType !== "insertLineBreak" || h() && (E.preventDefault(), E.stopPropagation());
    }, L = (E) => {
      const G = l();
      !St && G && document.activeElement === G && E.key === c ? (E.preventDefault(), Cr()) : St && E.key === "Escape" && (E.preventDefault(), oe(!1));
    };
    return document.addEventListener("keydown", L), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), () => {
      document.removeEventListener("keydown", L), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    St,
    Cr,
    c,
    (Lr = At.view) == null ? void 0 : Lr.markerMode,
    At.styleInfo,
    f,
    le,
    Mt,
    Ie,
    yr
  ]), H(() => {
    const l = $.current;
    if (!w || !l) return;
    const h = (N) => {
      N.key !== "Escape" || N.defaultPrevented || pe(N) || (N.preventDefault(), N.stopPropagation(), Me.current());
    };
    return l.addEventListener("keydown", h), () => l.removeEventListener("keydown", h);
  }, [w]), H(() => {
    const l = () => {
      var S, L, T;
      const h = ((S = D.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!h || document.activeElement !== h || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Mt() || ((L = b.current) == null || L.selectNote(0), (T = b.current) == null || T.focus());
    };
    return document.addEventListener("pointerup", l), document.addEventListener("selectionchange", l), () => {
      document.removeEventListener("pointerup", l), document.removeEventListener("selectionchange", l);
    };
  }, [Mt]);
  const _r = u["%footnoteEditor_copyButton_tooltip%"], Tr = /* @__PURE__ */ o(
    Ja,
    {
      onUndoClick: () => {
        var l;
        return (l = b.current) == null ? void 0 : l.undo();
      },
      onRedoClick: () => {
        var l;
        return (l = b.current) == null ? void 0 : l.redo();
      },
      canUndo: !Y,
      canRedo: Dt,
      localizedStrings: u
    }
  );
  return /* @__PURE__ */ p(xt, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: $,
        className: m("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", w && "tw:w-full"),
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ p("div", { className: m("tw:flex tw:gap-4", w && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                ns,
                {
                  isTypeSwitchable: K,
                  noteType: gt,
                  handleNoteTypeChange: _n,
                  localizedStrings: u,
                  focusNoteText: ie
                }
              ),
              /* @__PURE__ */ o(
                ts,
                {
                  callerType: q,
                  customCaller: lt,
                  updateCaller: In,
                  localizedStrings: u,
                  focusNoteText: ie
                }
              ),
              w && Tr
            ] }),
            !w && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ p(rr, { children: [
              Tr,
              /* @__PURE__ */ o(
                va,
                {
                  onCancelClick: n,
                  onAcceptClick: Ae,
                  canAccept: !Y || V !== q || q === "custom" && lt !== at,
                  localizedStrings: u,
                  acceptLabel: u["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ p(
            "div",
            {
              ref: D,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  Wa,
                  {
                    editorRef: b,
                    canUndo: !Y,
                    canRedo: Dt,
                    children: /* @__PURE__ */ o(
                      To,
                      {
                        options: At,
                        onStateChange: Tn,
                        onUsjChange: Ln,
                        defaultUsj: hs,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: b
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(Lt, { children: /* @__PURE__ */ p(Et, { children: [
                  /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(
                    Z,
                    {
                      "aria-label": _r,
                      onClick: En,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o($n, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ o("p", { children: _r }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ p(nr, { open: St, children: [
      /* @__PURE__ */ o(pa, { virtualRef: Ce.virtualRef }),
      /* @__PURE__ */ o(
        or,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (l) => {
            l.preventDefault(), l.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            is,
            {
              markerMenuItems: _e,
              localizedStrings: u,
              searchRef: gr
            }
          )
        }
      )
    ] })
  ] });
}
const gs = {
  "refresh-cw": vo,
  download: No,
  house: bo,
  "book-a": go,
  settings: ho,
  "circle-question-mark": mo,
  "external-link": po,
  users: fo,
  "book-copy": wo,
  pencil: uo,
  eye: lo,
  "zoom-in": co,
  "zoom-out": io,
  scan: so,
  "file-text": ao,
  "panel-bottom": oo,
  "message-square-plus": no,
  "square-function": Je,
  "square-x": Ve,
  "square-sigma": We,
  book: ro,
  "book-marked": eo,
  "book-open": to,
  library: Qn,
  search: Yr,
  "message-square": Yn,
  "circle-check-big": Zn,
  "clipboard-check": Xn,
  "clipboard-copy": Wn,
  sparkles: Jn,
  "undo-2": Vn,
  "redo-2": qn
}, ur = gs, hc = Object.keys(ur);
function dr(t) {
  return t !== void 0 && Object.hasOwn(ur, t);
}
function bs(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Ns(t, e) {
  return Object.entries(t).filter(([r, n]) => yn(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function vn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function yn(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function gc(t) {
  const e = new Set(t.items.map((n) => n.group)), r = Object.entries(t.groups).filter(
    ([n]) => e.has(n)
  );
  return vn(t.columns).filter(
    ({ columnKey: n }) => r.some(
      ([a, s]) => yn(a, s, n)
    )
  ).map(({ columnKey: n, column: a }) => ({
    columnKey: n,
    label: a.label,
    isHeaderHidden: a.isHeaderHidden ?? !1
  }));
}
function bc(t) {
  return t.some(
    (e) => dr(e.iconNameBefore) || e.iconPathBefore || e.checked !== void 0
  ) ? "icon" : "none";
}
function Nc(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: n, items: a }) => {
    if (a.length === 0) return [];
    const s = r ? [e(n)] : [];
    return r = !0, [...s, ...a];
  });
}
function xn(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((n) => n.group === r).sort((n, a) => n.order - a.order).map(
      (n) => "command" in n ? { item: n } : {
        item: n,
        subGroups: xn(
          t,
          bs(t.groups, n.id)
        )
      }
    )
  }));
}
function vc(t) {
  return t ? {
    columns: vn(t.columns).map((e) => ({
      ...e,
      groups: xn(t, Ns(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function vs(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = ct(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function $r(t, e, r) {
  const n = ct(e);
  return t.some(
    (a) => ct(a.projectId) === n && a.scrollGroupId === r
  );
}
function Re(t) {
  const e = vs(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : ct(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(ct(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((c) => c.scrollGroupId),
        isSelected: a !== void 0 && a === ct(s.id),
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
    const s = e.get(ct(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: $r(r, a.id, void 0),
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
        isSelected: $r(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = ct(a.projectId);
    if (n.some(
      (c) => ct(c.projectId) === s && c.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((c) => ct(c.id) === s);
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
const wr = "Selected", fr = "Unselected";
function qr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Bt(t, e) {
  const r = Ro(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Ke(t) {
  return [{ kind: "flat", rows: [...t].sort(Bt) }];
}
function ys(t) {
  const e = t.filter(qr).sort(Bt), r = t.filter((a) => !qr(a)).sort(Bt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function xs(t, e) {
  const r = t.filter((i) => i.isSelected).sort(Bt), n = t.filter((i) => !i.isSelected).sort(Bt), a = (i, c) => {
    var d;
    const u = (d = e.getSectionHeading) == null ? void 0 : d.call(
      e,
      i,
      c.map((w) => w.project)
    );
    return typeof u == "string" && u.length > 0 ? u : i === "selected" ? wr : fr;
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
function Ss(t, e) {
  if (e.id === "openTabs") return ys(t);
  if (e.id === "selection") return xs(t, e);
  if (!e.getGroupKey) return Ke(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((c) => {
    const u = a(c.project);
    if (u === void 0 || u === "") {
      n.push(c);
      return;
    }
    const d = r.get(u);
    d ? d.push(c) : r.set(u, [c]);
  });
  const s = [...r.entries()].map(([c, u]) => {
    var y;
    const d = [...u].sort(
      (x, f) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, f.project)) || Bt(x, f);
      }
    ), w = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      c,
      d.map((x) => x.project)
    )) ?? c;
    return { key: c, heading: w, rows: d };
  });
  s.sort((c, u) => c.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: c.key, heading: c.heading },
    { key: u.key, heading: u.heading }
  ) : c.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: c, heading: u, rows: d }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: c,
    label: u,
    rows: d,
    isPriority: c === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(Bt)
  }), i;
}
const yc = [
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
function z(t, e) {
  const r = t[e];
  if (!(typeof r != "string" || !mn(r)))
    return r;
}
const we = "recent", ks = "other";
function Sn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Cs(t) {
  const e = t ?? {};
  return [
    Sn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Qt.lastUsedAt]) == "number" ? we : ks;
      },
      getSectionHeading: (r) => r === we ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === we ? -1 : n.key === we ? 1 : 0
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Qt.language];
        return typeof n == "string" ? n : void 0;
      },
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: (r) => {
        var a;
        const n = (a = r.customData) == null ? void 0 : a[Qt.type];
        return typeof n == "string" ? n : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (r, n) => {
        var i;
        const a = n.find(
          (c) => {
            var u;
            return typeof ((u = c.customData) == null ? void 0 : u[Qt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Qt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const xc = Cs();
function Es(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? wr : e.unselectedSectionHeading ?? fr
  };
}
function Sc(t) {
  return {
    openTabsLabel: z(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: z(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: z(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: z(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: z(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: z(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: z(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: z(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function kc(t) {
  return {
    label: z(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const Is = 100, nt = {
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
  autoSelectionSelectedSectionHeading: wr,
  autoSelectionUnselectedSectionHeading: fr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function _s(t) {
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
function Cc(t) {
  return {
    searchPlaceholder: z(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: z(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: z(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: z(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: z(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: z(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: z(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: z(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: z(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: z(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: z(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: z(t, "%projectSelector_openButtonLabel%"),
    clearAll: z(t, "%projectSelector_clearAll%")
  };
}
function re(t) {
  return aa[jo(t)] ?? String(t);
}
const Vr = "platform.footerAction", Ts = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ls({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = re(t);
  return e ? /* @__PURE__ */ o(
    ge,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ts,
      children: r
    }
  ) : /* @__PURE__ */ o(ge, { variant: "secondary", children: r });
}
function As({
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
    ref: u,
    open: d,
    onPointerEnter: w,
    onPointerLeave: y
  } = ba(), [x, f] = j(!1), v = zn(), I = t.isDisabled && !!t.disabledReason, A = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || I, b = d || x, D = _(() => {
    if (A) {
      f(!0);
      return;
    }
    w();
  }, [A, w]), $ = _(() => {
    f(!1), y();
  }, [y]), C = /* @__PURE__ */ o(be, { className: m("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let R;
  e === "project" ? t.openGroups.length > 0 && (R = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((V) => /* @__PURE__ */ o(ge, { variant: "secondary", children: re(V) }, V)) })) : t.scrollGroupId !== void 0 && (R = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Ls,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ p(
      Z,
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
          /* @__PURE__ */ o(xo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const F = /* @__PURE__ */ p(
    ve,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: D,
      onPointerLeave: $,
      ...I && { "aria-describedby": v },
      className: m(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: C }),
        c && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Bo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        R,
        I && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), q = t.scrollGroupId !== void 0 ? re(t.scrollGroupId) : void 0, M = t.isBoundButClosed && q ? r.boundButClosedTooltip.replace("{group}", q) : void 0;
  return /* @__PURE__ */ p(Et, { open: b, delayDuration: 400, children: [
    /* @__PURE__ */ o(It, { asChild: !0, children: F }),
    /* @__PURE__ */ p(
      _t,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: tn(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && q && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              q,
              ")"
            ] })
          ] }),
          M && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: M }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function Ms({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ p(ar, { children: [
    /* @__PURE__ */ p(Et, { children: [
      /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(sr, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          variant: "ghost",
          size: "sm",
          className: m(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": n.groupByAriaLabel,
          "aria-pressed": a,
          onMouseDown: (s) => s.preventDefault(),
          children: /* @__PURE__ */ o(yo, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(_t, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
      ir,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Ne },
        children: [
          /* @__PURE__ */ o(cr, { children: n.groupSectionLabel }),
          /* @__PURE__ */ p(Na, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(jr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(lr, {}),
            t.map((s) => /* @__PURE__ */ o(jr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Ps(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function Ec(t) {
  const [e, r] = j(!1), [n, a] = j(""), s = wt(() => _s(t.localizedStrings), [t.localizedStrings]), i = wt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(Sn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      Es({
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
  ]), [c, u] = j(void 0), d = wt(
    () => Ps(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), w = c ?? d, y = k(null), [x, f] = j(void 0), v = _((g) => {
    r(g), g || (a(""), f(void 0));
  }, []);
  H(() => {
    if (!e) return;
    const g = window.requestAnimationFrame(() => {
      const P = y.current;
      P && P.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(g);
  }, [e]);
  const I = wt(() => t.mode === "project" ? Re({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Re({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Re({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), A = wt(() => {
    const g = n.trim().toLowerCase();
    return g ? I.filter(
      (P) => P.shortName.toLowerCase().includes(g) || (P.fullName ?? "").toLowerCase().includes(g)
    ) : I;
  }, [I, n]), b = wt(
    () => new Map(t.projects.map((g) => [ct(g.id), g])),
    [t.projects]
  ), D = _(
    (g) => g === void 0 ? void 0 : b.get(ct(g)),
    [b]
  ), { renderProjectIndicator: $ } = t, C = _(
    (g) => $ ? $(g.project) : void 0,
    [$]
  ), R = !!$, F = !!t.footerAction && A.length === 0, q = wt(() => {
    if (w === Xt) return Ke(A);
    const g = i.find((P) => P.id === w);
    return g ? Ss(A, g) : Ke(A);
  }, [A, w, i]), M = (g) => {
    if (g.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
    }
  }, V = (g) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: g.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const P = t.selection.pairs, J = ct(g.projectId), Q = (W) => ct(W.projectId) === J && W.scrollGroupId === g.scrollGroupId, U = P.some(Q) ? P.filter((W) => !Q(W)) : [
          ...P.filter((W) => !Q(W)),
          { projectId: g.projectId, scrollGroupId: g.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: U });
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
        const P = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: g.projectId, scrollGroupId: P }), t.onOpenProjectInGroup(g.projectId, P), r(!1);
      }
    }
  }, pt = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, lt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, at = wt(() => {
    switch (t.mode) {
      case "project": {
        const g = D(t.selection.projectId);
        if (lt)
          return { node: lt(g), title: "", hasSelection: !!g };
        let P = g ? g.shortName : s.buttonPlaceholder;
        return g && Tt === "shortNameAndFullName" && (P = tn(g)), { node: P, title: P, hasSelection: !!g };
      }
      case "project-multi": {
        const { pairs: g } = t.selection;
        if (g.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const P = [];
        if (g.forEach((U) => {
          const W = D(U.projectId);
          W && P.push({ project: W, scrollGroupId: U.scrollGroupId });
        }), P.length === 0) {
          const U = s.buttonPlaceholder;
          return { node: U, title: U, hasSelection: !1 };
        }
        const J = P.map(
          ({ project: U, scrollGroupId: W }) => W === void 0 ? U.shortName : `${U.shortName} (${re(W)})`
        ).join(", "), Q = P.length.toString();
        return {
          node: /* @__PURE__ */ p(xt, { children: [
            /* @__PURE__ */ o(ge, { variant: "muted", className: "tw:shrink-0", children: Q }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: J })
          ] }),
          title: `${Q} ${J}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = D(t.selection.projectId);
        if (!g) {
          const Q = s.buttonPlaceholder;
          return { node: Q, title: Q, hasSelection: !1 };
        }
        const P = t.selection.scrollGroupId;
        if (P === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const J = re(P);
        return {
          node: `${g.shortName} · ${J}`,
          title: `${g.shortName} · ${J}`,
          accessibleTitle: `${g.shortName}, ${J}`,
          hasSelection: !0
        };
      }
      default:
        return { node: "", title: "", hasSelection: !1 };
    }
  }, [
    t.mode,
    D,
    t.selection,
    lt,
    Tt,
    s.buttonPlaceholder
  ]), zt = k(null), [gt, Ht] = j(!1);
  H(() => {
    const g = zt.current;
    if (!g) return;
    const P = (Q) => {
      Ht(Q < Is);
    };
    if (P(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const J = new ResizeObserver((Q) => {
      Q.forEach((U) => {
        const [W] = U.borderBoxSize;
        P(W ? W.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return J.observe(g, { box: "border-box" }), () => J.disconnect();
  }, []);
  let K;
  t.isLoading ? K = /* @__PURE__ */ o(So, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : gt ? K = void 0 : t.mode === "project-multi" ? K = /* @__PURE__ */ o(Zr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : K = /* @__PURE__ */ o(ko, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const st = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? M : void 0, Y = s.ariaLabel && at.hasSelection && at.title ? `${s.ariaLabel}: ${at.accessibleTitle ?? at.title}` : s.ariaLabel || void 0, et = /* @__PURE__ */ p(
    Z,
    {
      ref: zt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": Y,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: m(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        gt && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof at.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: at.node }) : at.node }),
        K
      ]
    }
  ), Dt = at.title ? /* @__PURE__ */ o(Lt, { delayDuration: 400, children: /* @__PURE__ */ p(Et, { children: [
    /* @__PURE__ */ o(It, { asChild: !0, children: /* @__PURE__ */ o(Fe, { asChild: !0, children: et }) }),
    /* @__PURE__ */ o(_t, { dir: "auto", children: at.title })
  ] }) }) : /* @__PURE__ */ o(Fe, { asChild: !0, children: et }), Ut = i.length > 1;
  return /* @__PURE__ */ p(nr, { open: e, onOpenChange: v, children: [
    Dt,
    /* @__PURE__ */ o(
      or,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(Lt, { delayDuration: 400, children: /* @__PURE__ */ p(
          Ze,
          {
            shouldFilter: !1,
            value: F ? x ?? Vr : void 0,
            onValueChange: f,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  Ye,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Ut && /* @__PURE__ */ o(
                  Ms,
                  {
                    availableGroupings: i,
                    activeGrouping: w,
                    onChangeGrouping: u,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: pt, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(Qe, { children: [
                /* @__PURE__ */ o(tr, { children: s.commandEmptyMessage }),
                q.map((g, P) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    Jr,
                    {
                      children: [
                        /* @__PURE__ */ o(he, { heading: Os(g, s), children: g.rows.map((J) => /* @__PURE__ */ o(
                          As,
                          {
                            row: J,
                            mode: t.mode,
                            strings: s,
                            onClick: V,
                            onOpen: st,
                            selectedRowRef: y,
                            indicator: C(J),
                            reserveIndicatorSlot: R
                          },
                          J.rowKey
                        )) }),
                        P < q.length - 1 && /* @__PURE__ */ o(He, { alwaysRender: !0 })
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
                /* @__PURE__ */ p("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  A.length > 0 && /* @__PURE__ */ o(
                    He,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    ve,
                    {
                      forceMount: !0,
                      value: Vr,
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
function Os(t, e) {
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
const Ds = Wr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, c) => {
    const u = ht();
    return /* @__PURE__ */ p(
      "div",
      {
        id: i,
        className: m("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            Yr,
            {
              className: m(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            an,
            {
              ref: c,
              className: m(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (d) => e(d.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ p(
            Z,
            {
              variant: "ghost",
              size: "icon",
              className: m(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": u === "rtl" },
                { "tw:right-0": u === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(Xr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Ds.displayName = "SearchBar";
const Rs = 5;
function Ic(t) {
  return oa(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function js(t, e) {
  return t.filter((r) => {
    try {
      return Go(r) === e;
    } catch {
      return !1;
    }
  });
}
const _c = (t, e, r) => js(t, e).every((n) => r.includes(n));
function Bs(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => sa(n, e));
}
function Tc(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), s = new Set(e.map((c) => c.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((c) => a.has(c)))
    return r;
  const i = Bs(t, n);
  if (i.length !== 0)
    return i.length <= Rs ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Gs({ name: t, className: e }) {
  const r = dr(t) ? ur[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: m("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function Lc({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const s = n ? "tw:me-2" : "tw:ms-2";
  if (dr(e)) return /* @__PURE__ */ o(Gs, { name: e, className: s });
  if (!t && n && a === "icon")
    return /* @__PURE__ */ o(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: m("tw:inline-block tw:w-4 tw:shrink-0", s)
      }
    );
  if (!t) return;
  const i = `${n ? "Leading" : "Trailing"} icon for ${r}`;
  return n ? /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "menu-icon-image-box",
      className: m(
        "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
        s
      ),
      children: /* @__PURE__ */ o("img", { className: "tw:max-h-4 tw:max-w-4", src: t, alt: i })
    }
  ) : /* @__PURE__ */ o("img", { className: m("tw:max-h-4 tw:max-w-4", s), src: t, alt: i });
}
function Ac({ message: t, id: e, className: r }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: m("tw:text-sm tw:text-muted-foreground", r),
      children: t
    }
  );
}
function zs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Hs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-header",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Us = Ot(
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
function Fs({
  className: t,
  variant: e = "default",
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Us({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Mc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-title",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function Ks({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-description",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function $s({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-content",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Pc({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(zs, { className: m(s), role: a, children: [
    /* @__PURE__ */ p(Hs, { children: [
      /* @__PURE__ */ o(Fs, { variant: "icon", children: n ?? /* @__PURE__ */ o(Co, {}) }),
      /* @__PURE__ */ o(Ks, { children: t })
    ] }),
    r && /* @__PURE__ */ o($s, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const qs = Wr(({ className: t, ...e }, r) => /* @__PURE__ */ o(Eo, { size: 35, className: m("tw:animate-spin", t), ...e, ref: r }));
qs.displayName = "Spinner";
const Vs = Ot(
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
function Oc({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Vs({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Dc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-title",
      className: m(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Rc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-description",
      className: m(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function jc({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Xe.Group,
    {
      "data-slot": "resizable-panel-group",
      className: m(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: n ?? e,
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...a
    }
  );
}
function fe(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Bc({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Xe.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: fe(t),
      minSize: fe(e),
      maxSize: fe(r),
      collapsedSize: fe(n),
      ...a
    }
  );
}
function Gc({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Xe.Separator,
    {
      "data-slot": "resizable-handle",
      className: m(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Wt as $,
  Li as A,
  Z as B,
  ve as C,
  ar as D,
  rr as E,
  fn as F,
  Qe as G,
  tr as H,
  Zi as I,
  Qi as J,
  pi as K,
  Mi as L,
  gi as M,
  bi as N,
  xi as O,
  Si as P,
  vi as Q,
  Yi as R,
  ke as S,
  Lt as T,
  va as U,
  tc as V,
  ge as W,
  ua as X,
  nc as Y,
  rc as Z,
  lr as _,
  sa as a,
  Mc as a$,
  ia as a0,
  en as a1,
  cc as a2,
  uc as a3,
  oc as a4,
  ac as a5,
  lc as a6,
  sc as a7,
  $i as a8,
  Na as a9,
  Ki as aA,
  Xi as aB,
  Nc as aC,
  Di as aD,
  hn as aE,
  xe as aF,
  Se as aG,
  dn as aH,
  Zo as aI,
  Qo as aJ,
  Gr as aK,
  Oc as aL,
  Rc as aM,
  Dc as aN,
  Bi as aO,
  hi as aP,
  yi as aQ,
  Xo as aR,
  Wo as aS,
  mi as aT,
  Wa as aU,
  zs as aV,
  $s as aW,
  Ks as aX,
  Hs as aY,
  Fs as aZ,
  Ac as a_,
  jr as aa,
  wc as ab,
  pc as ac,
  fc as ad,
  an as ae,
  Ec as af,
  Ds as ag,
  Ic as ah,
  js as ai,
  He as aj,
  _i as ak,
  _c as al,
  Gi as am,
  ln as an,
  Ni as ao,
  aa as ap,
  vc as aq,
  gc as ar,
  bc as as,
  ji as at,
  Ri as au,
  Lc as av,
  Vi as aw,
  zr as ax,
  Wi as ay,
  Ji as az,
  Et as b,
  Ba as b$,
  mc as b0,
  ms as b1,
  Fa as b2,
  is as b3,
  pa as b4,
  Ui as b5,
  zi as b6,
  Hi as b7,
  Gc as b8,
  Bc as b9,
  Ia as bA,
  Xa as bB,
  Ei as bC,
  hc as bD,
  Gs as bE,
  Xt as bF,
  nt as bG,
  yc as bH,
  Jo as bI,
  Sc as bJ,
  Cc as bK,
  kc as bL,
  Nn as bM,
  Ra as bN,
  xc as bO,
  La as bP,
  Oa as bQ,
  Da as bR,
  ja as bS,
  os as bT,
  Ta as bU,
  Cs as bV,
  Es as bW,
  us as bX,
  fi as bY,
  Aa as bZ,
  Ga as b_,
  jc as ba,
  Pc as bb,
  qs as bc,
  dc as bd,
  ic as be,
  Fi as bf,
  Ja as bg,
  Ne as bh,
  wi as bi,
  di as bj,
  Vo as bk,
  qo as bl,
  li as bm,
  ci as bn,
  ui as bo,
  ii as bp,
  Sa as bq,
  da as br,
  rn as bs,
  yn as bt,
  sn as bu,
  Kr as bv,
  ec as bw,
  Ya as bx,
  Za as by,
  cn as bz,
  m as c,
  kt as c0,
  Tc as c1,
  za as c2,
  Ha as c3,
  Ua as c4,
  It as d,
  _t as e,
  Oi as f,
  Ti as g,
  sr as h,
  ir as i,
  cr as j,
  qi as k,
  Ci as l,
  Ai as m,
  he as n,
  ht as o,
  na as p,
  Ii as q,
  rt as r,
  nr as s,
  Pi as t,
  ba as u,
  Fe as v,
  or as w,
  ki as x,
  Ze as y,
  Ye as z
};
//# sourceMappingURL=resizable-BPo9SNYW.js.map
