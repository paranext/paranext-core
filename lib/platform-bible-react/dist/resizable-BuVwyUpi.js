import { jsx as o, jsxs as m, Fragment as gt } from "react/jsx-runtime";
import { Slot as We, Dialog as It, Separator as zn, Popover as Yt, Tooltip as Jt, DropdownMenu as rt, Label as Hn, RadioGroup as ze } from "radix-ui";
import { IconX as Un, IconCheck as Xe, IconSearch as Fn, IconChevronLeft as $n, IconChevronRight as Kn } from "@tabler/icons-react";
import { Canon as st } from "@sillsdev/scripture";
import mt, { useRef as E, useEffect as F, useCallback as _, useState as P, createContext as qn, useContext as Vn, useMemo as dt, Fragment as Ze, useLayoutEffect as ue, useImperativeHandle as Jn, useId as Yr, forwardRef as Qr } from "react";
import { X as tn, Check as Ne, ChevronsUpDown as en, Star as Wn, Undo as Xn, Redo as Zn, SquareX as Ye, FunctionSquare as Qe, SquareSigma as tr, Ban as Yn, Copy as Qn, Redo2 as to, Undo2 as eo, Sparkles as ro, ClipboardCopy as no, ClipboardCheck as oo, CircleCheckBig as ao, MessageSquare as so, Search as rn, Library as io, BookOpen as co, BookMarked as lo, Book as uo, MessageSquarePlus as fo, PanelBottom as wo, FileText as po, Scan as mo, ZoomOut as ho, ZoomIn as go, Eye as bo, Pencil as No, BookCopy as vo, Users as yo, ExternalLink as xo, CircleQuestionMark as So, Settings as ko, BookA as Co, House as Eo, Download as Io, RefreshCw as _o, Group as To, ArrowRight as Lo, Loader2 as Ao, ChevronDown as Mo, MenuIcon as Mr, AlertTriangle as Oo, LoaderCircle as Do } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Or, GENERATOR_NOTE_CALLER as He, HIDDEN_NOTE_CALLER as Ue, isInsertEmbedOpOfType as Vt, getDefaultViewOptions as Po, getMarkerMenuItems as Ro, defaultStyleInfo as Dr, Editorial as Bo } from "@eten-tech-foundation/platform-editor";
import { Section as Dt, MODIFIER_KEYS as jo, split as nn, slice as Go, formatReplacementString as zo, usfmMarkers as fe, deepEqual as Gt, isPlatformError as on, ABORTED as an, getErrorMessage as Ho, normalizeProjectId as ut, compareProjectsByName as Uo, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Xt, formatProjectName as sn, getLocalizeKeyForScrollGroupId as Fo, hasDistinctFullName as $o, getSectionForBook as Ko, FAILED_PRECONDITION as qo, RESOURCE_EXHAUSTED as Vo } from "platform-bible-utils";
import { Command as Ut } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as er from "react-resizable-panels";
import { clsx as Jo } from "clsx";
import { extendTailwindMerge as Wo, twMerge as Xo } from "tailwind-merge";
const Zo = Wo({ prefix: "tw" });
function Fe(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    i === "[" ? n += 1 : i === "]" && (n -= 1), i === ":" && n === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function Yo(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Fe(t), r = e.findIndex((i) => i.startsWith("-tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, d) => d !== r), `-${i}`].join(":")}`, original: t };
  }
  const n = e.findIndex((i) => i.startsWith("!tw-"));
  if (n !== -1) {
    const i = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((u, d) => d !== n), `!${i}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const i = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Qo(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Fe(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], i = Fe(e), s = i.some((u) => u.startsWith("-tw-")), c = i.some((u) => u.startsWith("!tw-"));
  if (s && a.startsWith("-")) {
    const u = a.slice(1);
    return [...n, `-tw-${u}`].join(":");
  }
  if (c && a.startsWith("!")) {
    const u = a.slice(1);
    return [...n, `!tw-${u}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function h(...t) {
  const e = Jo(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Zo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((u) => {
    const d = Yo(u);
    n.set(d.normalized, d.original), a.push(d.normalized);
  }), Xo(a.join(" ")).split(" ").filter(Boolean).map((u) => {
    const d = n.get(u);
    return d ? Qo(u, d) : u;
  }).join(" ");
}
const rr = 600, ve = 650, Li = 400, ta = 450, ea = 500, Ai = 510, Mi = 520, ra = 675, Oi = 690, Di = 700, Pi = 800, cn = Pt(
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
function Q({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const i = n ? We.Root : "button";
  return /* @__PURE__ */ o(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: h(cn({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const ln = "layoutDirection";
function dn() {
  return globalThis.localStorage ?? void 0;
}
function yt() {
  var t;
  try {
    const e = (t = dn()) == null ? void 0 : t.getItem(ln);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Ri(t) {
  var e;
  try {
    (e = dn()) == null || e.setItem(ln, t);
  } catch {
  }
}
function Bi({ ...t }) {
  return /* @__PURE__ */ o(It.Root, { "data-slot": "dialog", ...t });
}
function ji({ ...t }) {
  return /* @__PURE__ */ o(It.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function na({ ...t }) {
  return /* @__PURE__ */ o(It.Portal, { "data-slot": "dialog-portal", ...t });
}
function Gi({ ...t }) {
  return /* @__PURE__ */ o(It.Close, { "data-slot": "dialog-close", ...t });
}
function oa({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    It.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: h(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: ta, ...e },
      ...r
    }
  );
}
function zi({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: n,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: a,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: i,
  ...s
}) {
  const c = yt();
  return /* @__PURE__ */ m(na, { children: [
    /* @__PURE__ */ o(oa, { className: n, style: a }),
    /* @__PURE__ */ m(
      It.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ea, ...i },
        dir: c,
        ...s,
        children: [
          e,
          r && /* @__PURE__ */ o(It.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Q, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Un, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Hi({ className: t, ...e }) {
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
function Ui({
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
        e && /* @__PURE__ */ o(It.Close, { asChild: !0, children: /* @__PURE__ */ o(Q, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Fi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    It.Title,
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
function $i({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    It.Description,
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
function un({ className: t, type: e, ...r }) {
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
function aa({ className: t, ...e }) {
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
const sa = Pt(
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
function ia({
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
        className: h(sa({ align: e }), t),
        onClick: (n) => {
          var a, i;
          n.target instanceof HTMLElement && n.target.closest("button") || (i = (a = n.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || i.focus();
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
function nr({ className: t, ...e }) {
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
function or({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = yt(), i = mt.useCallback(
    (s) => {
      if (e == null || e(s), s.defaultPrevented || !r || s.key !== " " || s.currentTarget.value !== "") return;
      const c = s.currentTarget.closest("[cmdk-root]"), u = c == null ? void 0 : c.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (s.preventDefault(), s.stopPropagation(), u.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(aa, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Ut.Input,
        {
          "data-slot": "command-input",
          className: h(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: i,
          ...n
        }
      ),
      /* @__PURE__ */ o(ia, { children: /* @__PURE__ */ o(Fn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function ar({ className: t, ...e }) {
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
function sr({
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
function ge({
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
function ye({
  className: t,
  children: e,
  ...r
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
      ...r,
      children: [
        e,
        /* @__PURE__ */ o(Xe, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function ca({ className: t, ...e }) {
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
const la = [
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
], da = (t) => {
  var e;
  return ((e = la[t]) == null ? void 0 : e.chapters) ?? -1;
}, ua = st.allBookIds.filter(
  (t) => !st.isObsolete(st.bookIdToNumber(t))
);
function fa(t) {
  const e = [], r = Math.min(t.length, st.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(st.bookNumberToId(n + 1));
  return e;
}
function B(t) {
  return `%scrollGroup_${t}%`;
}
const wa = {
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
function ir(t, e) {
  return da(st.bookIdToNumber(t));
}
function xe(t, e, r) {
  const n = st.bookIdToNumber(t);
  let a, i = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((s) => {
    const c = st.bookIdToNumber(s);
    (r === "next" ? c > n && c < i : c < n && c > i) && (a = s, i = c);
  }), a;
}
function Ki(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const i = xe(n, e, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(ir(i), 1),
      verseNum: 1
    };
}
function qi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < ir(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const i = xe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Vi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: i } = t;
  if (e === void 0 || e.includes(n))
    return i > 1 ? { book: n, chapterNum: a, verseNum: i - 1 } : i === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const s = xe(n, e, "previous");
  if (!s) return;
  const c = Math.max(ir(s), 1);
  return { book: s, chapterNum: c, verseNum: Math.max(1, 1) };
}
function Ji(t, e, r) {
  const { book: n, chapterNum: a, verseNum: i } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: i + 1 };
  const s = xe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Wi(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Xi = (t, e, r, n, a) => {
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
}, Zi = (t, e, r, n, a) => {
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
function Yi(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? st.bookIdToEnglishName(t);
}
function pa(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Qi = Object.fromEntries(
  ua.map((t) => [t, st.bookIdToEnglishName(t)])
);
function tc(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = st.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (i ? i.localizedName.toLowerCase().includes(n) || i.localizedId.toLowerCase().includes(n) : !1));
}
function fn() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function wn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function pn(t) {
  wn(document, fn()) || t();
}
function Pr(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Rr(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function ma(t, e) {
  const [r] = P(fn), n = E(t);
  n.current = t;
  const a = E(e);
  return a.current = e, _(
    (i) => {
      var u, d;
      if ((u = n.current) == null || u.call(n, i), i.defaultPrevented) return;
      if (wn(document, r)) {
        i.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: s } = document;
      if (s && s !== document.body) return;
      const c = (d = a.current) == null ? void 0 : d.call(a);
      c && (c.focus({ preventScroll: !0 }), document.activeElement === c && i.preventDefault());
    },
    [r]
  );
}
const mn = Symbol.for("platform-bible-react.window-blur-press");
function ha(t) {
  return Reflect.get(t, mn) === !0;
}
function hn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = E(void 0), n = E(void 0), a = E(void 0);
  F(() => {
    const d = () => {
      const f = r.current;
      if (!f || f.dataset.state === "closed") return;
      const N = f.parentElement;
      if (!N) return;
      const x = { bubbles: !0, pointerType: "mouse" }, w = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(w, mn, { value: !0 }), N.dispatchEvent(w);
    };
    return window.addEventListener("blur", d), () => window.removeEventListener("blur", d);
  }, []);
  const i = _(
    (d) => {
      if (r.current = d ?? void 0, d && d !== n.current && (n.current = d, a.current = Pr(d) ?? Rr(d)), typeof t == "function") {
        const f = t(d);
        if (typeof f == "function")
          return () => {
            r.current = void 0, f();
          };
      } else t && (t.current = d);
    },
    [t]
  ), s = _(() => {
    var x;
    const d = n.current, f = (x = a.current) != null && x.isConnected ? a.current : void 0, N = (d && Pr(d)) ?? f ?? (d && Rr(d));
    return N != null && N.isConnected ? N : void 0;
  }, []), c = ma(
    e,
    s
  ), u = _(
    (d) => {
      c(d), r.current || (n.current = void 0, a.current = void 0);
    },
    [c]
  );
  return { ref: i, onCloseAutoFocus: u };
}
const Br = `
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
function ga(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Qt(t, e) {
  const r = e ? `${Br}, ${e}` : Br;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && ga(n)
  );
}
const ec = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Ke = "keyboard", jr = !1;
function ba() {
  jr || typeof document > "u" || (jr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      ha(t) || (Ke = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Ke = "keyboard";
    },
    !0
  ));
}
function Gr() {
  return Ke;
}
const gn = "data-quiet-focus";
function zr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(gn, ""), t.style.outline = "none"));
}
function Na(t) {
  t && (t.removeAttribute(gn), t.style.removeProperty("outline"));
}
const Hr = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function va({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    zn.Root,
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
const ya = Pt(
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
function cr({
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
        ya({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function rc({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? We.Root : "div";
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
function bn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    va,
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
function Nn() {
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
function lr({ ...t }) {
  return /* @__PURE__ */ o(Yt.Root, { "data-slot": "popover", ...t });
}
function qe({ ...t }) {
  return /* @__PURE__ */ o(Yt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: xa, usePortalContainer: Sa } = Nn(), nc = xa;
function dr({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: a,
  onCloseAutoFocus: i,
  ...s
}) {
  const c = yt(), u = Sa(), d = hn({ ref: a, onCloseAutoFocus: i });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Yt.Portal, { container: u, children: /* @__PURE__ */ o(
      Yt.Content,
      {
        "data-slot": "popover-content",
        ...d,
        align: e,
        sideOffset: r,
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: rr, ...n },
        dir: c,
        ...s
      }
    ) })
  );
}
function ka({ ...t }) {
  return /* @__PURE__ */ o(Yt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function oc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function ac({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function sc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: h("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function _t({
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
function bt({ ...t }) {
  return /* @__PURE__ */ o(Jt.Root, { "data-slot": "tooltip", ...t });
}
function Nt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? h(cn({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: Ca, usePortalContainer: Ea } = Nn(), ic = Ca;
function vt({
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
  children: i,
  ...s
}) {
  const c = Ea();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: c, children: /* @__PURE__ */ m(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: ra, ...r },
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...s,
        children: [
          i,
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
const Ia = /^%[^%]*%$/;
function vn(t) {
  return t !== void 0 && !Ia.test(t) && t.trim() !== "";
}
function ot(t, e) {
  return vn(t) ? t : e;
}
function _a() {
  const [t, e] = P(!1), r = E(null), n = _(() => {
    const i = r.current;
    i && i.scrollWidth > i.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
function Ta() {
  F(() => {
    ba();
  }, []);
}
const yn = qn(void 0);
function Se() {
  const t = Vn(yn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const ke = Pt("", {
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
function ee({ variant: t = "default", ...e }) {
  const r = yt(), n = mt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(yn.Provider, { value: n, children: /* @__PURE__ */ o(rt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function La({
  ...t
}) {
  return /* @__PURE__ */ o(rt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function re({
  ...t
}) {
  return /* @__PURE__ */ o(rt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function ne({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: n,
  children: a,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref: i,
  onCloseAutoFocus: s,
  ...c
}) {
  const u = yt(), d = hn({ ref: i, onCloseAutoFocus: s });
  return /* @__PURE__ */ o(rt.Portal, { children: /* @__PURE__ */ o(
    rt.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...d,
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
      style: { zIndex: rr, ...n },
      ...c,
      children: /* @__PURE__ */ o("div", { dir: u, children: a })
    }
  ) });
}
function Aa({ ...t }) {
  return /* @__PURE__ */ o(rt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ma({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = yt(), i = Se();
  return /* @__PURE__ */ o(
    rt.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: h(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: i.variant })
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
  const i = yt(), s = Se();
  return /* @__PURE__ */ m(
    rt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: s.variant })
      ),
      checked: r,
      dir: i,
      ...a,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Xe, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Oa({
  ...t
}) {
  return /* @__PURE__ */ o(rt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Ur({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = yt(), i = Se();
  return /* @__PURE__ */ m(
    rt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: i.variant })
      ),
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Xe, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ce({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    rt.Label,
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
function oe({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    rt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Da({ className: t, ...e }) {
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
function Pa({ ...t }) {
  return /* @__PURE__ */ o(rt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Ra({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = Se(), i = yt();
  return /* @__PURE__ */ m(
    rt.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: h(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: a.variant })
      ),
      ...n,
      children: [
        r,
        i === "rtl" ? /* @__PURE__ */ o($n, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Kn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ba({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = yt();
  return /* @__PURE__ */ o(
    rt.SubContent,
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
      style: { zIndex: ve, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function cc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Hn.Root,
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
function lc({
  className: t,
  ...e
}) {
  const r = yt();
  return /* @__PURE__ */ o(
    ze.Root,
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
function dc({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    ze.Item,
    {
      "data-slot": "radio-group-item",
      className: h(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        ze.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const uc = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Fr = (t, e) => t[e] ?? e;
function ja({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = Fr(n, "%cancelButton_tooltip%"), c = i ?? Fr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(cr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(bt, { children: [
      /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
          "aria-label": s,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(tn, {})
        }
      ) }),
      /* @__PURE__ */ o(vt, { children: /* @__PURE__ */ o("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ o(bn, {}),
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(bt, { children: [
      /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
          "aria-label": c,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(Ne, {})
        }
      ) }),
      /* @__PURE__ */ o(vt, { children: /* @__PURE__ */ o("p", { children: c }) })
    ] }) })
  ] });
}
function Ee() {
  return /Macintosh/i.test(navigator.userAgent);
}
function fc() {
  return /Windows/i.test(navigator.userAgent);
}
const Ga = ["input", "select", "textarea", "button"], za = ["button", "textbox"], wc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = E(null), [i, s] = P(void 0), [c, u] = P(void 0), d = _(
    (w) => {
      s(w);
      const v = t.find((S) => S.id === w);
      v && (e == null || e(v));
      const p = document.getElementById(w);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = _(
    (w) => {
      const v = t.find((p) => p.id === w);
      v && (u((p) => p === w ? void 0 : w), r == null || r(v));
    },
    [r, t]
  ), N = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || Ga.includes(v)) return !0;
    const p = w.getAttribute("role");
    if (p && za.includes(p)) return !0;
    const S = w.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, x = _(
    (w) => {
      var K;
      const v = w.target, p = (M) => M ? document.getElementById(M) : void 0, S = p(c), D = p(i);
      if (!!(S && v && S.contains(v) && v !== S) && N(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            w.preventDefault(), w.stopPropagation();
            const M = t.find((q) => q.id === c);
            M && d(M.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!S) return;
          const M = Array.from(
            S.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (M.length === 0) return;
          const q = M.findIndex((ht) => ht === v);
          if (q === -1) return;
          let ft;
          w.key === "ArrowDown" ? ft = Math.min(q + 1, M.length - 1) : ft = Math.max(q - 1, 0), ft !== q && (w.preventDefault(), w.stopPropagation(), (K = M[ft]) == null || K.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((M) => M.id === i);
      let O = C;
      switch (w.key) {
        case "ArrowDown":
          O = Math.min(C + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          O = Math.max(C - 1, 0), w.preventDefault();
          break;
        case "Home":
          O = 0, w.preventDefault();
          break;
        case "End":
          O = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          i && f(i), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const M = D;
          if (M) {
            const q = M.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ft = M.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), ht = q ?? ft;
            if (ht) {
              w.preventDefault(), ht.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (N(v) || (n == null || n(w.key), w.preventDefault()));
          return;
      }
      const G = t[O];
      G && d(G.id);
    },
    [t, d, i, c, f, n]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: c,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Ha = Pt(
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
function be({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? We.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ha({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function pc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function xn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function mc({
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
    const s = a.current;
    if (!s) return;
    const c = () => {
      requestAnimationFrame(() => {
        Qt(s, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
        });
      });
    };
    c();
    const u = new MutationObserver(() => {
      c();
    });
    return u.observe(s, {
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
  const i = (s) => {
    var u;
    const { current: c } = a;
    if (c && xn(s, c)) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), (u = Qt(c)[0]) == null || u.focus();
        return;
      }
      s.key === " " && document.activeElement === c && s.preventDefault();
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
            onKeyDown: i,
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
function hc({
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
function gc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function bc({ className: t, ...e }) {
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
function Ua(t) {
  mt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Qt(t.current) : [], i = a.indexOf(document.activeElement), s = n.key === "ArrowRight" ? i + 1 : i - 1;
          s >= 0 && s < a.length && a[s].focus();
        }
        n.key === "Escape" && (n.preventDefault(), e.focus()), (n.key === "ArrowDown" || n.key === "ArrowUp") && n.preventDefault();
      }
    };
    return e.addEventListener("keydown", r), () => {
      e.removeEventListener("keydown", r);
    };
  }, [t]);
}
function Fa(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function $a(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Nc({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...i
}) {
  const s = mt.useRef(null);
  mt.useEffect(() => {
    typeof a == "function" ? a(s.current) : a && "current" in a && (a.current = s.current);
  }, [a]), Ua(s);
  const c = mt.useMemo(
    () => s.current ? Qt(s.current) : [],
    [s]
  ), u = mt.useCallback(
    (f) => {
      const { current: N } = s;
      if (!N || !N.parentElement) return;
      if (!xn(f, N)) {
        e == null || e(f);
        return;
      }
      const x = N.closest("table"), w = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Qt(x).filter(
          (S) => S.tagName === "TR"
        )
      ) : [], v = w.indexOf(N), p = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), $a(w, v, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), Fa(c, p, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const S = N.closest("table");
        S && S.focus();
      }
      e == null || e(f);
    },
    [s, c, e]
  ), d = mt.useCallback(
    (f) => {
      n && (r == null || r(f));
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: s,
      tabIndex: -1,
      onKeyDown: u,
      onFocus: d,
      className: h(
        "tw:border-b tw:transition-colors tw:hover:bg-muted/50 tw:has-aria-expanded:bg-muted/50 tw:data-[state=selected]:bg-muted",
        // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with a custom
        // focus ring so keyboard users see a visible, accessible focus indicator on focused rows
        "tw:outline-hidden",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      ...i
    }
  );
}
function vc({ className: t, ...e }) {
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
function yc({ className: t, ...e }) {
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
function xc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ka(t, e = !0) {
  const [r, n] = P(!1);
  return F(() => {
    const a = t.current;
    if (!e || !a) {
      n(!1);
      return;
    }
    const i = () => {
      n(a.scrollTop + a.clientHeight < a.scrollHeight - 1);
    };
    i(), a.addEventListener("scroll", i);
    const s = typeof ResizeObserver < "u" ? new ResizeObserver(i) : void 0;
    s == null || s.observe(a);
    const c = new MutationObserver(i);
    return c.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", i), s == null || s.disconnect(), c.disconnect();
    };
  }, [t, e]), r;
}
function qa({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Ka(r, e);
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
function Sc({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: i = !1,
  selectAllText: s = "Select All",
  clearAllText: c = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: d,
  isOpen: f = void 0,
  onOpenChange: N = void 0,
  isDisabled: x = !1,
  sortSelected: w = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: S = void 0,
  variant: D = "ghost",
  id: j
}) {
  const [X, C] = P(!1), O = E(null), G = _(
    (U) => {
      var nt;
      const it = (nt = t.find((wt) => wt.label === U)) == null ? void 0 : nt.value;
      it && r(
        e.includes(it) ? e.filter((wt) => wt !== it) : [...e, it]
      );
    },
    [t, e, r]
  ), K = () => d || n, M = f ?? X, q = N ?? C, [ft, ht] = P(M), [Lt, Z] = P(e);
  ft !== M && (ht(M), M && Z(e));
  const Rt = dt(() => {
    if (!w) return t;
    const U = t.filter((nt) => nt.starred).sort((nt, wt) => nt.label.localeCompare(wt.label)), it = t.filter((nt) => !nt.starred).sort((nt, wt) => {
      const Mt = Lt.includes(nt.value), Bt = Lt.includes(wt.value);
      return Mt && !Bt ? -1 : !Mt && Bt ? 1 : nt.label.localeCompare(wt.label);
    });
    return [...U, ...it];
  }, [t, Lt, w]), Ft = () => {
    const U = t.map((it) => it.value);
    Z(U), r(U);
  }, At = () => {
    Z([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: j, className: S, children: /* @__PURE__ */ m(lr, { open: M, onOpenChange: q, children: [
    /* @__PURE__ */ o(qe, { asChild: !0, children: /* @__PURE__ */ m(
      Q,
      {
        variant: D,
        role: "combobox",
        "aria-expanded": M,
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
                children: K()
              }
            )
          ] }),
          /* @__PURE__ */ o(en, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(dr, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(nr, { children: [
      /* @__PURE__ */ o(
        or,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      i && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Q, { variant: "ghost", size: "sm", onClick: Ft, children: s }),
        /* @__PURE__ */ o(Q, { variant: "ghost", size: "sm", onClick: At, children: c })
      ] }),
      /* @__PURE__ */ o(qa, { isEnabled: v, scrollerRef: O, children: /* @__PURE__ */ m(ar, { ref: O, children: [
        /* @__PURE__ */ o(sr, { children: u }),
        /* @__PURE__ */ o(ge, { children: Rt.map((U) => /* @__PURE__ */ m(
          ye,
          {
            value: U.label,
            onSelect: G,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Ne,
                {
                  className: h(
                    "tw:h-4 tw:w-4",
                    e.includes(U.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              U.starred && /* @__PURE__ */ o(Wn, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: U.label }),
              U.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: U.secondaryLabel })
            ]
          },
          U.label
        )) })
      ] }) })
    ] }) })
  ] }) });
}
function Et(t) {
  return t.replace(/^\+/, "");
}
function Va(t, e) {
  if (!t || e === "") return !1;
  const r = Et(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && Et(n.marker).toLowerCase() === r
  );
}
function Ja(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = Et(e).toLowerCase();
  return r === "passive" ? Or({
    query: a,
    items: n,
    filter: (i) => Et(i.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Or({
    query: a,
    items: n,
    filter: (i) => Et(i.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Zt(t) {
  return t.isComposing || t.keyCode === 229;
}
function Wa(t) {
  return t === "hidden";
}
const Sn = /^[a-z0-9+-]$/i;
function Xa(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && Ee()) && e !== "Dead") {
    if (Sn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), i = e.toUpperCase(), s = e.toLowerCase();
      return (i !== s ? e === i : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Za = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ya = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Qa() {
  return [...Za, ...Ya.filter((t) => Sn.test(t))];
}
function pt(t) {
  t.preventDefault(), t.stopPropagation();
}
function ts(t, e, r) {
  var s, c;
  const { kind: n } = e;
  if (Zt(t) || jo.has(t.key))
    return "passed";
  const a = !Ee();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((s = t.getModifierState) != null && s.call(t, "AltGraph")))
    return t.key === "Enter" && pt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return pt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return pt(t), Ja(
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
    return pt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (pt(t), e.filter === "")
        return r.dismiss(), "ended";
      const f = Et(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, f)) {
        const N = e.items.find(
          (x) => Et(x.marker).toLowerCase() === f
        );
        return N && r.commitItem(N.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    pt(t);
    const u = Et(e.filter).toLowerCase(), d = e.items.find(
      (f) => Et(f.marker).toLowerCase() === u
    );
    return d && r.commitItem(d.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (pt(t), r.dismiss(), "ended") : (pt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (pt(t), "continue") : (pt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return pt(t), r.dismiss(), "ended";
  const i = Xa(t);
  return t.key === "Backspace" || i !== void 0 ? (pt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + i, r.update({ filterText: e.filter }), "continue") : (pt(t), "continue");
}
function es(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function kn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function rs(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function ns(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: i,
    clearSessionIfCurrent: s,
    runSessionKey: c,
    show: u,
    restoreSelectionIfLost: d,
    hasEditorChangedSinceFocus: f,
    focusEditor: N,
    applyItem: x,
    onShowError: w
  } = t, v = () => {
    d(), N();
  };
  a.current += 1;
  const p = a.current, S = () => a.current === p, D = { kind: r, token: p, filter: "", items: e };
  n && (D.isNoteMarker = n), i(D), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Qa(),
    onKey: (j) => c(j)
  }).then((j) => {
    var C;
    s(p);
    const X = j ?? ((C = D.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (X !== void 0) {
      const O = (f == null ? void 0 : f()) ?? !1;
      v();
      const G = O ? void 0 : e.find((K) => K.marker === X);
      G && x(G);
    } else S() && v();
  }).catch((j) => {
    s(p), S() && v(), w(j);
  });
}
function os(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: i,
    reopenAtCaret: s,
    clearSessionIfCurrent: c,
    hasEditorChangedSinceFocus: u
  } = e, d = r.current;
  if (!d) return "no-session";
  const f = (x) => {
    if (u != null && u()) {
      a.dismiss();
      return;
    }
    x();
  };
  return ts(t, d, {
    update: (x) => a.update(x),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (x) => f(() => {
      var w;
      i(), (w = n.current) == null || w.commitTypedMarker(x);
    }),
    commitTypedAndReopen: (x) => f(() => {
      var w;
      i(), (w = n.current) == null || w.commitTypedMarker(x, { trailingSpace: !1 }), s() || a.dismiss();
    }),
    commitTypedCloser: (x) => f(() => {
      var w;
      i(), (w = n.current) == null || w.commitTypedCloser(x);
    }),
    commitItem: (x) => f(() => {
      var v;
      const w = d.items.find((p) => p.marker === x);
      if (w) {
        if (w.kind === "note") {
          d.itemToApplyOnClose = w;
          return;
        }
        i(), (v = n.current) == null || v.applyMarkerMenuSelection(w, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && c(d.token), "routed";
}
function as({
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
function ss({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: i
}) {
  F(() => {
    const s = i ?? document, c = (u) => {
      var N, x, w;
      const d = (N = t.current) == null ? void 0 : N.querySelector(".editor-input");
      if (!d || u.target !== d) return;
      const f = (x = e.current) == null ? void 0 : x.getSelection();
      f ? r.current = f : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = kn(
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
    return s.addEventListener("focusout", c), () => s.removeEventListener("focusout", c);
  }, [t, e, r, n, a, i]);
}
function is({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = E(void 0), a = _(
    (s) => {
      t.current = s, s && (r.current = void 0);
      const c = e.current ?? void 0;
      n.current = s ? c : void 0, c == null || c.setMarkerSettleSuspended(!!s);
    },
    [t, r, e]
  ), i = _(
    (s) => {
      var c;
      es(t, s), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
    },
    [t, e]
  );
  return F(
    () => () => {
      var s;
      (s = n.current) == null || s.setMarkerSettleSuspended(!1);
    },
    []
  ), { setSession: a, clearSessionIfCurrent: i };
}
function $r({ className: t, ...e }) {
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
function cs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: h("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const ls = /* @__PURE__ */ new Set([
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
function ds(t) {
  const e = nn(t, "");
  let r = 0;
  for (; r < e.length && ls.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Go(t, r);
  return a ? [...n, a] : n;
}
function us(t) {
  const e = [];
  let r = "";
  return nn(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function fs(t) {
  const e = ds(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: us(t), separator: "+" };
}
function Ve({ hint: t }) {
  const { keycaps: e, separator: r } = fs(t);
  return e.length === 1 ? /* @__PURE__ */ o($r, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(cs, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(Ze, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o($r, { children: n })
      ] }, a)
    )) })
  );
}
const kc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Kr = (t, e) => t[e] ?? e;
function ws({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const u = Ee(), d = Kr(a, "%undoButton_tooltip%"), f = Kr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(cr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(bt, { children: [
      /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
          "aria-label": d,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ o(Xn, {})
        }
      ) }),
      /* @__PURE__ */ o(vt, { children: /* @__PURE__ */ m("p", { children: [
        d,
        i && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(Ve, { hint: u ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ o(bn, {}),
    e && /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(bt, { children: [
      /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
        {
          "aria-label": f,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o(Zn, {})
        }
      ) }),
      /* @__PURE__ */ o(vt, { children: /* @__PURE__ */ m("p", { children: [
        f,
        i && /* @__PURE__ */ m(gt, { children: [
          " ",
          /* @__PURE__ */ o(Ve, { hint: u ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function ps({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = E(null);
  return F(() => {
    var u;
    const i = Ee(), s = ((u = a.current) == null ? void 0 : u.querySelector(".editor-input")) ?? void 0, c = (d) => {
      var N, x, w, v;
      if (!s || document.activeElement !== s) return;
      const f = d.key.toLowerCase();
      if (i) {
        if (!d.metaKey) return;
        !d.shiftKey && f === "z" ? (d.preventDefault(), r && ((N = e.current) == null || N.undo())) : d.shiftKey && f === "z" && (d.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!d.ctrlKey) return;
        !d.shiftKey && f === "z" ? (d.preventDefault(), r && ((w = e.current) == null || w.undo())) : (f === "y" || d.shiftKey && f === "z") && (d.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function ms() {
  const t = E(void 0), e = E(new DOMRect()), r = E({
    getBoundingClientRect: () => {
      var i;
      const a = (i = t.current) == null ? void 0 : i.measure();
      return a && (e.current = a), e.current;
    },
    get contextElement() {
      var a;
      return (a = t.current) == null ? void 0 : a.contextElement;
    }
  }), n = _((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return dt(() => ({ virtualRef: r, setSource: n }), [n]);
}
function hs(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function gs(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const bs = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(gt, { children: [
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
function Ns({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const i = E(!1), s = E(null), c = E(null), u = E(!1), [d, f] = P(t), [N, x] = P(e), [w, v] = P(!1), p = E(!1), S = E(d);
  S.current = d;
  const D = E(N);
  D.current = N, F(() => {
    f(t);
  }, [t]), F(() => {
    N !== e && x(e);
  }, [e]);
  const j = (C) => {
    if (u.current = !1, v(C), !C) {
      const O = S.current, G = D.current;
      O !== "custom" || G ? (O !== t || G !== e) && (i.current = !0, r(O, G)) : (f(t), x(e));
    }
  }, X = (C) => {
    var O, G, K, M;
    C.stopPropagation(), document.activeElement === c.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((O = s.current) == null || O.focus(), u.current = !0) : document.activeElement === s.current && C.key === "ArrowUp" ? ((G = c.current) == null || G.focus(), u.current = !1) : document.activeElement === s.current && C.key === "ArrowLeft" && ((K = s.current) == null ? void 0 : K.selectionStart) === 0 && ((M = c.current) == null || M.focus(), u.current = !1), d === "custom" && C.key === "Enter" && (document.activeElement === c.current || document.activeElement === s.current) && j(!1);
  };
  return /* @__PURE__ */ m(ee, { open: w, onOpenChange: j, children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(bt, { children: [
      /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(re, { asChild: !0, children: /* @__PURE__ */ o(Q, { variant: "outline", className: "tw:h-6", children: bs(t, n, e) }) }) }),
      /* @__PURE__ */ o(vt, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      ne,
      {
        style: { zIndex: ve },
        onEscapeKeyDown: () => {
          S.current = t, D.current = e, f(t), x(e);
        },
        onCloseAutoFocus: (C) => {
          i.current && (i.current = !1, C.preventDefault(), pn(a));
        },
        onClick: () => {
          u.current && (u.current = !1);
        },
        onKeyDown: X,
        onMouseMove: () => {
          var C;
          u.current && ((C = s.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ o(Ce, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(oe, {}),
          /* @__PURE__ */ o(
            zt,
            {
              checked: d === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: He })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            zt,
            {
              checked: d === "hidden",
              onCheckedChange: () => f("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ue })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            zt,
            {
              ref: c,
              checked: d === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                p.current = d === "custom";
              },
              onClick: (C) => {
                var O;
                if (C.stopPropagation(), p.current && C.target !== s.current) {
                  j(!1);
                  return;
                }
                u.current = !0, (O = s.current) == null || O.focus();
              },
              onSelect: (C) => C.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  un,
                  {
                    tabIndex: 0,
                    onMouseDown: (C) => {
                      C.stopPropagation(), f("custom"), u.current = !0;
                    },
                    ref: s,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: N,
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
const vs = (t, e) => t === "f" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Qe, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(tr, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(gt, { children: [
  /* @__PURE__ */ o(Ye, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), ys = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), zo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function xs({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const i = E(!1), s = (c) => {
    c !== t && (i.current = !0, e(c));
  };
  return /* @__PURE__ */ m(ee, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(bt, { children: [
      /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(re, { asChild: !0, children: /* @__PURE__ */ o(Q, { variant: "outline", className: "tw:h-6", children: vs(t, r) }) }) }),
      /* @__PURE__ */ o(vt, { children: /* @__PURE__ */ o("p", { children: ys(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      ne,
      {
        style: { zIndex: ve },
        onCloseAutoFocus: (c) => {
          i.current && (i.current = !1, c.preventDefault(), pn(a));
        },
        children: [
          /* @__PURE__ */ o(Ce, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(oe, {}),
          /* @__PURE__ */ m(
            zt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => s("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Ye, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            zt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => s("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Qe, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ m(
            zt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => s("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(tr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const qr = '[aria-controls="editor-context-menu"]';
function Be(t) {
  return t ? t.matches(qr) ? !0 : !!t.querySelector(qr) : !1;
}
const Cc = Object.freeze([
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
function Ss({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Yn, { className: e, size: 16 });
}
function ks({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(Ne, { size: 16 })
    }
  );
}
function he(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Vr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ m(
    ye,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: t.isDisallowed || t.isDeprecated || t.isDisabled,
      "aria-checked": t.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: !0, partial: "mixed", none: !1 }[t.selectionState]
      ),
      value: he(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(ks, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Ss, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(ca, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Cs({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [i, s] = P(""), [c] = P(() => {
    const f = e.find(
      (N) => N.marker === a && !N.isDisallowed && !N.isDeprecated && !N.isDisabled
    );
    return f ? he(f) : void 0;
  }), [u, d] = dt(() => {
    const f = Et(i.trim().toLowerCase());
    if (!f) {
      const w = e.filter((v) => !v.isDisallowed);
      return [w.length > 0 ? w : e, []];
    }
    const N = e.filter((w) => {
      var p;
      const v = (p = w.marker) == null ? void 0 : p.toLowerCase();
      return w.isDisallowed ? v === f : v == null ? void 0 : v.includes(f);
    }), x = e.filter(
      (w) => w.title.toLowerCase().includes(f) && !N.includes(w)
    );
    return [N, x];
  }, [i, e]);
  return /* @__PURE__ */ m(nr, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: c, children: [
    /* @__PURE__ */ o(
      or,
      {
        className: "marker-menu-search",
        ref: r,
        value: i,
        onValueChange: (f) => s(f),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(ar, { children: [
      /* @__PURE__ */ o(sr, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ge, { children: u.map((f) => /* @__PURE__ */ o(
        Vr,
        {
          item: f,
          localizedStrings: t
        },
        he(f)
      )) }),
      d.length > 0 && /* @__PURE__ */ m(gt, { children: [
        u.length > 0 && /* @__PURE__ */ o($e, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ge, { children: d.map((f) => /* @__PURE__ */ o(
          Vr,
          {
            item: f,
            localizedStrings: t
          },
          he(f)
        )) })
      ] })
    ] })
  ] });
}
function Es(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const i = fe[n], s = i != null && i.children ? i : a && fe[a];
  if (!s || !s.children) return [];
  const c = [];
  return Object.entries(s.children).forEach(([, u]) => {
    c.push(
      ...u.map((d) => ({
        marker: d,
        title: r[fe[d].description] ?? fe[d].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(d), e();
        }
      }))
    );
  }), c.sort((u, d) => (u.marker ?? u.title).localeCompare(d.marker ?? d.title));
}
function Jr(t) {
  if (!t || !Vt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function Is(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function _s(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Ts(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function Ls(t, e) {
  let r = 0, n = 0;
  return e.every((a) => {
    if (typeof a.insert != "string") {
      const s = t[r];
      return n !== 0 || !s || !Gt(s, a) ? !1 : (r += 1, !0);
    }
    let i = a.insert;
    for (; i.length > 0; ) {
      const s = t[r];
      if (!s || typeof s.insert != "string" || !Gt(s.attributes, a.attributes))
        return !1;
      const c = s.insert.slice(n), u = Math.min(c.length, i.length);
      if (c.slice(0, u) !== i.slice(0, u)) return !1;
      i = i.slice(u), n += u, n === s.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function As(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Ms(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Os = 300, je = "*", Ds = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Ec({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: c,
  localizedStrings: u,
  parentEditorRef: d,
  inline: f = !1,
  ref: N,
  initialCaretPosition: x,
  markerPalette: w,
  onNoteEdit: v
}) {
  var _r;
  const p = E(null), S = E(null), D = E(null), j = E(i);
  F(() => {
    j.current = i;
  }, [i]);
  const X = E(x);
  F(() => {
    X.current = x;
  }, [x]);
  const C = _(() => {
    var b, y;
    const l = X.current;
    l !== void 0 && l !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, l.utf16Offset, {
      field: l.field,
      glyph: l.glyph
    }) : (y = p.current) == null || y.selectNote(0);
  }, []);
  ue(() => {
    if (f || !D.current) return;
    const l = parseFloat(getComputedStyle(D.current).width);
    l > 0 && (D.current.style.width = `${l}px`);
  }, [f]);
  const [O, G] = P("generated"), [K, M] = P("generated"), [q, ft] = P(je), [ht, Lt] = P(je), [Z, Rt] = P("f"), [Ft, At] = P(!1), [U, it] = P(!0), [nt, wt] = P(!1), Mt = E(!1), Bt = E(""), g = E(!1), L = E(void 0), $ = E([]), tt = E([]), V = E(void 0), Y = E(void 0), mr = _(() => {
    var b;
    const l = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    l != null && l.length && ($.current = [...$.current, ...l], V.current = void 0);
  }, []), hr = _(
    (l, b) => {
      var I, z;
      if (!l) return;
      const y = Jr(l), k = Jr(b);
      if (!y && k) {
        V.current = {
          text: $.current,
          closedNoteOp: l,
          openNoteOp: b
        }, $.current = [];
        return;
      }
      const T = V.current;
      T && (y && !k && Gt(l, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((z = (I = p.current) == null ? void 0 : I.getOpsAfterNote(0)) != null && z.length) ? ($.current = T.text, V.current = void 0) : Gt(b, T.openNoteOp) || (V.current = void 0));
    },
    []
  ), [xt, ae] = P(!1), Ie = ms(), [gr, On] = P(), br = E(null), St = E(
    void 0
  ), Dn = E(0), Nr = E(w);
  F(() => {
    Nr.current = w;
  }, [w]), F(
    () => () => {
      var l;
      St.current && (St.current = void 0, (l = Nr.current) == null || l.dismiss());
    },
    []
  );
  const se = E(void 0), _e = E(void 0), ie = _(
    () => rs(
      _e.current,
      kn(
        () => {
          var l;
          return (l = p.current) == null ? void 0 : l.getUsj();
        },
        () => {
          var l;
          return (l = p.current) == null ? void 0 : l.getSelection();
        }
      )
    ),
    []
  ), { setSession: vr, clearSessionIfCurrent: ce } = is({
    sessionRef: St,
    editorRef: p,
    baselineRef: _e
  }), $t = _(() => {
    var b, y, k, T;
    if ((b = p.current) != null && b.getSelection() || (y = p.current) != null && y.getSelectedParaMarker()) return;
    const l = se.current;
    l ? (k = p.current) == null || k.setSelection(l) : (T = p.current) == null || T.selectNote(0);
  }, []), le = _(() => {
    var l;
    $t(), (l = p.current) == null || l.focus();
  }, [$t]), Tt = dt(
    () => ({
      ...s,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: c,
      hasExternalUI: !0,
      view: {
        ...s.view ?? Po(),
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
    [s, c]
  ), Te = dt(
    () => Es(
      p,
      () => ae(!1),
      u,
      gr,
      Z
    ),
    [u, gr, Z]
  );
  F(() => {
    var l;
    xt || (l = p.current) == null || l.focus();
  }, [Z, xt]);
  const Ot = _(() => {
    var k, T, I;
    const l = (k = S.current) == null ? void 0 : k.querySelector(".editor-input"), b = l == null ? void 0 : l.querySelector("span.note"), y = (I = (T = S.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : I.anchorNode;
    return !!b && !!y && b.contains(y);
  }, []), jt = _(
    (l = !1) => {
      var y, k, T, I, z;
      v == null || v();
      const b = (k = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : k.at(0);
      if (b && Vt("note", b) && (r == null || r([b]), l && d && j.current)) {
        const J = [
          ...$.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], et = tt.current, A = !Gt(J, et);
        if (f && !A && Gt(b, L.current))
          return;
        L.current = b;
        const W = [b];
        A && (et.length > 0 && Ls(
          ((I = d.current) == null ? void 0 : I.getOpsAfterNote(j.current)) ?? [],
          et
        ) && W.push({ delete: Ts(et) }), W.push(...J), tt.current = J), (z = d.current) == null || z.replaceEmbedUpdate(j.current, W);
      }
    },
    [f, r, v, d]
  ), Le = _(
    (l) => {
      var y, k, T;
      const b = (y = p.current) == null ? void 0 : y.getSelection();
      (k = p.current) == null || k.applyUpdate([l, { delete: 1 }]), b && ((T = p.current) == null || T.setSelection(b)), le();
    },
    [le]
  ), yr = _(
    (l, b) => {
      var T, I, z;
      St.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const y = (z = (I = p.current) == null ? void 0 : I.getNoteOps(0)) == null ? void 0 : z.at(0);
      if (!y || !Vt("note", y) || !y.insert.note) return;
      let k;
      l === "custom" ? k = b : l === "generated" ? k = He : k = Ue, y.insert.note.caller !== k && (y.insert.note.caller = k, Le(y));
    },
    [Le]
  ), Kt = E(void 0), Ae = E(jt);
  F(() => {
    Ae.current = jt;
  }, [jt]);
  const qt = _(() => {
    Kt.current !== void 0 && (clearTimeout(Kt.current), Kt.current = void 0);
  }, []), kt = _(() => {
    Kt.current !== void 0 && (qt(), Ae.current(!0));
  }, [qt]), xr = _(() => {
    qt(), Kt.current = setTimeout(() => {
      Kt.current = void 0, Ae.current(!0);
    }, Os);
  }, [qt]);
  F(() => {
    var T, I;
    let l, b, y;
    Mt.current = !1, g.current = !1, se.current = void 0, it(!0);
    const k = e == null ? void 0 : e.at(0);
    if (L.current = k, $.current = [], tt.current = [], V.current = void 0, Y.current = void 0, k && Vt("note", k)) {
      const z = (T = k.insert.note) == null ? void 0 : T.caller;
      let J = "custom";
      z === He ? J = "generated" : z === Ue && (J = "hidden");
      const et = J === "custom" && z !== void 0 ? z : je;
      ft(et), Lt(et), G(J), M(J), Rt(((I = k.insert.note) == null ? void 0 : I.style) ?? "f"), l = setTimeout(() => {
        var W, R, ct, lt;
        const A = (R = (W = p.current) == null ? void 0 : W.getNoteOps(0)) == null ? void 0 : R.at(0);
        (ct = p.current) == null || ct.applyUpdate(A ? [k, { delete: 1 }] : [k]), C(), (lt = p.current) == null || lt.focus(), b = requestAnimationFrame(() => {
          y = setTimeout(() => {
            var Ct;
            Ot() || (C(), (Ct = p.current) == null || Ct.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      kt(), X.current = void 0, l && clearTimeout(l), b !== void 0 && cancelAnimationFrame(b), y !== void 0 && clearTimeout(y);
    };
  }, [e, kt, Ot, C]), ue(() => () => kt(), [kt]);
  const Sr = _(() => {
    var l;
    g.current && (St.current || (l = p.current) == null || l.commitPendingMarkerEdits(), kt());
  }, [kt]);
  Jn(
    N,
    () => ({
      flushPendingEdits: Sr,
      focus: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.focus();
      },
      containsFocus: () => {
        const l = D.current;
        return !!l && l.contains(l.ownerDocument.activeElement);
      }
    }),
    [Sr]
  );
  const Me = _(() => {
    var l, b;
    if (!St.current) {
      const y = (l = S.current) == null ? void 0 : l.querySelector(".editor-input");
      y != null && y.contains(y.ownerDocument.activeElement) && y.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    f ? kt() : (qt(), jt(!0)), n();
  }, [qt, kt, f, n, jt]), Oe = E(Me);
  ue(() => {
    Oe.current = Me;
  });
  const De = E({ book: a.book, chapterNum: a.chapterNum });
  ue(() => {
    (De.current.book !== a.book || De.current.chapterNum !== a.chapterNum) && (De.current = { book: a.book, chapterNum: a.chapterNum }, Oe.current());
  }, [a.book, a.chapterNum]);
  const Pn = () => {
    var I;
    const l = p.current, b = Is(l == null ? void 0 : l.getUsj());
    if (!l || !b) return;
    const y = ((I = S.current) == null ? void 0 : I.ownerDocument) ?? document, { activeElement: k } = y, T = l.getSelection() ?? se.current;
    l.setSelection(b);
    try {
      l.copy();
    } finally {
      T ? l.setSelection(T) : l.selectNote(0), l.getSelection(), y.activeElement !== k && (k instanceof HTMLElement && k !== y.body ? k.focus({ preventScroll: !0 }) : y.activeElement instanceof HTMLElement && y.activeElement.blur());
    }
  }, Rn = _(
    (l, b) => {
      v == null || v(), G(l), ft(b), yr(l, b), f && kt();
    },
    [yr, kt, f, v]
  ), Bn = (l) => {
    var y, k, T, I, z;
    Rt(l), St.current || (y = p.current) == null || y.commitPendingMarkerEdits();
    const b = (T = (k = p.current) == null ? void 0 : k.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && Vt("note", b)) {
      b.insert.note && (b.insert.note.style = l);
      const J = (z = (I = b.insert.note) == null ? void 0 : I.contents) == null ? void 0 : z.ops;
      Z !== "x" && l === "x" ? J == null || J.forEach((et) => As(et)) : Z === "x" && l !== "x" && (J == null || J.forEach((et) => Ms(et))), Le(b), f && kt();
    }
  }, jn = (l) => {
    On(l.contextMarker), wt(l.canRedo);
  }, Gn = _(
    (l) => {
      var y, k, T, I, z, J, et;
      const b = (k = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : k.at(0);
      if (b && Vt("note", b)) {
        l.content.length > 1 && setTimeout(() => {
          var R;
          (R = p.current) == null || R.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const A = (T = b.insert.note) == null ? void 0 : T.style, W = (z = (I = b.insert.note) == null ? void 0 : I.contents) == null ? void 0 : z.ops;
        if (A || At(!1), At(
          A === "x" ? !!(W != null && W.every((R) => {
            var lt, Ct;
            if (!((lt = R.attributes) != null && lt.char)) return !0;
            const ct = ((Ct = R.attributes) == null ? void 0 : Ct.char).style;
            return ct === "xt" || ct === "xo" || ct === "xq";
          })) : !!(W != null && W.every((R) => {
            var lt, Ct;
            if (!((lt = R.attributes) != null && lt.char)) return !0;
            const ct = ((Ct = R.attributes) == null ? void 0 : Ct.char).style;
            return ct === "ft" || ct === "fr" || ct === "fq";
          }))
        ), !Mt.current) {
          Mt.current = !0, Bt.current = JSON.stringify(b), Y.current = b, it(!0);
          return;
        }
        g.current = !0, hr(Y.current, b), Y.current = b, (et = (J = p.current) == null ? void 0 : J.getOpsAfterNote(0)) != null && et.length && setTimeout(mr, 0), it(JSON.stringify(b) === Bt.current), jt(), f && xr();
      } else
        At(!1), it(!0);
    },
    [
      f,
      jt,
      xr,
      hr,
      mr
    ]
  ), Pe = _(() => {
    const l = window.getSelection();
    if (!Te.length || !l || l.rangeCount === 0)
      return !1;
    const b = S.current;
    if (!b) return !1;
    const y = l.getRangeAt(0).cloneRange();
    return Ie.setSource({
      measure: () => {
        const k = hs(y);
        return k && gs(k);
      },
      contextElement: b
    }), ae(!0), !0;
  }, [Te, Ie]), Re = E(() => {
  }), kr = _(
    (l, b, y) => {
      const { anchorRect: k } = l;
      if (!w || !k) return;
      const { hasTextSelection: T } = y;
      ns({
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
        isNoteMarker: (I) => Va(Tt.styleInfo ?? Dr, I),
        sessionCounterRef: Dn,
        setSession: vr,
        clearSessionIfCurrent: ce,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (I) => Re.current(I),
        show: (I) => w.show({
          items: b.map(_s),
          anchor: k,
          keyForwarding: I
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: $t,
        hasEditorChangedSinceFocus: ie,
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
          (!on(I) || I.code !== an) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Ho(I)}`
          );
        }
      });
    },
    [
      w,
      $t,
      ie,
      Tt.styleInfo,
      vr,
      ce
    ]
  ), de = _(() => {
    var y;
    const l = (y = p.current) == null ? void 0 : y.getMarkerMenuContext();
    if (!l) return !1;
    const b = Ro(Tt.styleInfo ?? Dr, l);
    return b.length === 0 ? !1 : (kr(l, b, { hasTextSelection: !!l.hasTextSelection }), !0);
  }, [kr, Tt.styleInfo]);
  as({
    isSessionOpen: _(() => !!St.current, []),
    dismiss: _(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const Cr = _(
    (l) => {
      if (!w) return;
      os(l, {
        sessionRef: St,
        editorRef: p,
        palette: w,
        restoreCaret: $t,
        reopenAtCaret: de,
        clearSessionIfCurrent: ce,
        hasEditorChangedSinceFocus: ie
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      de,
      $t,
      ce,
      ie
    ]
  );
  F(() => {
    Re.current = Cr;
  }, [Cr]), ss({
    containerRef: S,
    editorRef: p,
    selectionRef: se,
    baselineRef: _e,
    isSessionOpen: _(() => !!St.current, [])
  }), F(() => {
    const l = () => {
      xt && ae(!1);
    };
    return window.addEventListener("click", l), window.addEventListener("blur", l), () => {
      window.removeEventListener("click", l), window.removeEventListener("blur", l);
    };
  }, [xt]), F(() => {
    var l;
    xt && ((l = br.current) == null || l.focus());
  }, [xt]), F(() => {
    var J, et;
    const l = () => {
      var A;
      return ((A = S.current) == null ? void 0 : A.querySelector(".editor-input")) ?? void 0;
    };
    if (((J = Tt.view) == null ? void 0 : J.markerMode) === "editable") {
      const A = (R) => {
        var Ct, Tr, Lr, Ar;
        if (Zt(R)) return;
        const ct = St.current, lt = l();
        if (!(!lt || document.activeElement !== lt)) {
          if (ct && w) {
            Re.current(R);
            return;
          }
          if (Be(S.current)) {
            R.key === c && (R.preventDefault(), R.stopPropagation());
            return;
          }
          if (R.key === "Enter" && !Ot()) {
            R.preventDefault(), R.stopPropagation(), (Ct = p.current) == null || Ct.selectNote(0), (Tr = p.current) == null || Tr.focus();
            return;
          }
          if (w && R.key === c) {
            if (!Ot()) {
              R.preventDefault(), R.stopPropagation(), (Lr = p.current) == null || Lr.selectNote(0), (Ar = p.current) == null || Ar.focus();
              return;
            }
            de() && (R.preventDefault(), R.stopPropagation());
          }
        }
      }, W = () => {
        var ct, lt;
        const R = l();
        !R || document.activeElement !== R || Ot() || ((ct = p.current) == null || ct.selectNote(0), (lt = p.current) == null || lt.focus());
      };
      return document.addEventListener("keydown", A, { capture: !0 }), document.addEventListener("paste", W, { capture: !0 }), () => {
        document.removeEventListener("keydown", A, { capture: !0 }), document.removeEventListener("paste", W, { capture: !0 });
      };
    }
    const b = () => {
      const A = l();
      return !A || document.activeElement !== A ? !1 : !Be(S.current);
    }, y = (A) => {
      A.key !== "Enter" || Zt(A) || b() && (A.preventDefault(), A.stopPropagation());
    }, k = (A) => {
      A.inputType !== "insertParagraph" && A.inputType !== "insertLineBreak" || b() && (A.preventDefault(), A.stopPropagation());
    }, T = (A) => {
      if (A.key !== c || xt || Zt(A)) return;
      const W = l();
      !W || document.activeElement !== W || (Be(S.current) || Pe()) && (A.preventDefault(), A.stopPropagation());
    }, I = Wa((et = Tt.view) == null ? void 0 : et.markerMode), z = (A) => {
      const W = l();
      !xt && W && document.activeElement === W && A.key === c ? (A.preventDefault(), Pe()) : xt && A.key === "Escape" && (A.preventDefault(), ae(!1));
    };
    return document.addEventListener("keydown", z), document.addEventListener("keydown", y, { capture: !0 }), document.addEventListener("beforeinput", k, { capture: !0 }), I && document.addEventListener("keydown", T, { capture: !0 }), () => {
      I && document.removeEventListener("keydown", T, { capture: !0 }), document.removeEventListener("keydown", z), document.removeEventListener("keydown", y, { capture: !0 }), document.removeEventListener("beforeinput", k, { capture: !0 });
    };
  }, [
    xt,
    Pe,
    c,
    (_r = Tt.view) == null ? void 0 : _r.markerMode,
    Tt.styleInfo,
    w,
    de,
    Ot
  ]), F(() => {
    const l = D.current;
    if (!f || !l) return;
    const b = (y) => {
      y.key !== "Escape" || y.defaultPrevented || Zt(y) || (y.preventDefault(), y.stopPropagation(), Oe.current());
    };
    return l.addEventListener("keydown", b), () => l.removeEventListener("keydown", b);
  }, [f]), F(() => {
    const l = () => {
      var k, T, I;
      const b = ((k = S.current) == null ? void 0 : k.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const y = document.getSelection();
      y && !y.isCollapsed || Ot() || ((T = p.current) == null || T.selectNote(0), (I = p.current) == null || I.focus());
    };
    return document.addEventListener("pointerup", l), document.addEventListener("selectionchange", l), () => {
      document.removeEventListener("pointerup", l), document.removeEventListener("selectionchange", l);
    };
  }, [Ot]);
  const Er = u["%footnoteEditor_copyButton_tooltip%"], Ir = /* @__PURE__ */ o(
    ws,
    {
      onUndoClick: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.undo();
      },
      onRedoClick: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.redo();
      },
      canUndo: !U,
      canRedo: nt,
      localizedStrings: u
    }
  );
  return /* @__PURE__ */ m(gt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: D,
        className: h("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: h("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                xs,
                {
                  isTypeSwitchable: Ft,
                  noteType: Z,
                  handleNoteTypeChange: Bn,
                  localizedStrings: u,
                  focusNoteText: le
                }
              ),
              /* @__PURE__ */ o(
                Ns,
                {
                  callerType: O,
                  customCaller: q,
                  updateCaller: Rn,
                  localizedStrings: u,
                  focusNoteText: le
                }
              ),
              f && Ir
            ] }),
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(cr, { children: [
              Ir,
              /* @__PURE__ */ o(
                ja,
                {
                  onCancelClick: n,
                  onAcceptClick: Me,
                  canAccept: !U || K !== O || O === "custom" && q !== ht,
                  localizedStrings: u,
                  acceptLabel: u["%footnoteEditor_saveButton_tooltip%"]
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
                  ps,
                  {
                    editorRef: p,
                    canUndo: !U,
                    canRedo: nt,
                    children: /* @__PURE__ */ o(
                      Bo,
                      {
                        options: Tt,
                        onStateChange: jn,
                        onUsjChange: Gn,
                        defaultUsj: Ds,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(bt, { children: [
                  /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(
                    Q,
                    {
                      "aria-label": Er,
                      onClick: Pn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Qn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(vt, { children: /* @__PURE__ */ o("p", { children: Er }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(lr, { open: xt, children: [
      /* @__PURE__ */ o(ka, { virtualRef: Ie.virtualRef }),
      /* @__PURE__ */ o(
        dr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (l) => {
            l.preventDefault(), l.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Cs,
            {
              markerMenuItems: Te,
              localizedStrings: u,
              searchRef: br
            }
          )
        }
      )
    ] })
  ] });
}
const Ps = {
  "refresh-cw": _o,
  download: Io,
  house: Eo,
  "book-a": Co,
  settings: ko,
  "circle-question-mark": So,
  "external-link": xo,
  users: yo,
  "book-copy": vo,
  pencil: No,
  eye: bo,
  "zoom-in": go,
  "zoom-out": ho,
  scan: mo,
  "file-text": po,
  "panel-bottom": wo,
  "message-square-plus": fo,
  "square-function": Qe,
  "square-x": Ye,
  "square-sigma": tr,
  book: uo,
  "book-marked": lo,
  "book-open": co,
  library: io,
  search: rn,
  "message-square": so,
  "circle-check-big": ao,
  "clipboard-check": oo,
  "clipboard-copy": no,
  sparkles: ro,
  "undo-2": eo,
  "redo-2": to
}, ur = Ps, Ic = Object.keys(ur);
function fr(t) {
  return t !== void 0 && Object.hasOwn(ur, t);
}
function Rs(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Bs(t, e) {
  return Object.entries(t).filter(([r, n]) => En(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Cn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function En(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function js(t) {
  const e = new Set(t.items.map((n) => n.group)), r = Object.entries(t.groups).filter(
    ([n]) => e.has(n)
  );
  return Cn(t.columns).filter(
    ({ columnKey: n }) => r.some(
      ([a, i]) => En(a, i, n)
    )
  ).map(({ columnKey: n, column: a }) => ({
    columnKey: n,
    label: a.label,
    isHeaderHidden: a.isHeaderHidden ?? !1
  }));
}
function In(t) {
  return t.some(
    (e) => fr(e.iconNameBefore) || e.iconPathBefore || e.checked !== void 0
  ) ? "icon" : "none";
}
function Gs(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: n, items: a }) => {
    if (a.length === 0) return [];
    const i = r ? [e(n)] : [];
    return r = !0, [...i, ...a];
  });
}
function _n(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((n) => n.group === r).sort((n, a) => n.order - a.order).map(
      (n) => "command" in n ? { item: n } : {
        item: n,
        subGroups: _n(
          t,
          Rs(t.groups, n.id)
        )
      }
    )
  }));
}
function zs(t) {
  return t ? {
    columns: Cn(t.columns).map((e) => ({
      ...e,
      groups: _n(t, Bs(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function Hs(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = ut(r.projectId), a = e.get(n), i = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((s) => s.scrollGroupId === r.scrollGroupId) || a.push(i) : e.set(n, [i]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Wr(t, e, r) {
  const n = ut(e);
  return t.some(
    (a) => ut(a.projectId) === n && a.scrollGroupId === r
  );
}
function Ge(t) {
  const e = Hs(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : ut(t.selection.projectId);
    return t.projects.map((i) => {
      const s = e.get(ut(i.id)) ?? [];
      return {
        rowKey: i.id,
        projectId: i.id,
        shortName: i.shortName,
        fullName: i.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: s.map((c) => c.scrollGroupId),
        isSelected: a !== void 0 && a === ut(i.id),
        isMuted: s.length === 0,
        isBoundButClosed: !1,
        isDisabled: i.isDisabled === !0,
        disabledReason: i.disabledReason,
        project: i
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
    const i = e.get(ut(a.id));
    if (!i || i.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Wr(r, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
      return;
    }
    i.forEach((s) => {
      n.push({
        rowKey: `tab:${a.id}:${s.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: s.scrollGroupId,
        scrollGroupScrRefLabel: s.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Wr(r, a.id, s.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const i = ut(a.projectId);
    if (n.some(
      (c) => ut(c.projectId) === i && c.scrollGroupId === a.scrollGroupId
    ))
      return;
    const s = t.projects.find((c) => ut(c.id) === i);
    s && n.push({
      rowKey: `closed:${s.id}:${a.scrollGroupId}`,
      projectId: s.id,
      shortName: s.shortName,
      fullName: s.fullName,
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: s.isDisabled === !0,
      disabledReason: s.disabledReason,
      project: s
    });
  }), n;
}
const wr = "Selected", pr = "Unselected";
function Xr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Ht(t, e) {
  const r = Uo(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function Je(t) {
  return [{ kind: "flat", rows: [...t].sort(Ht) }];
}
function Us(t) {
  const e = t.filter(Xr).sort(Ht), r = t.filter((a) => !Xr(a)).sort(Ht);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function Fs(t, e) {
  const r = t.filter((s) => s.isSelected).sort(Ht), n = t.filter((s) => !s.isSelected).sort(Ht), a = (s, c) => {
    var d;
    const u = (d = e.getSectionHeading) == null ? void 0 : d.call(
      e,
      s,
      c.map((f) => f.project)
    );
    return typeof u == "string" && u.length > 0 ? u : s === "selected" ? wr : pr;
  }, i = [];
  return r.length > 0 && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: a("selected", r),
    rows: r
  }), n.length > 0 && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: a("unselected", n),
    rows: n
  }), i;
}
function $s(t, e) {
  if (e.id === "openTabs") return Us(t);
  if (e.id === "selection") return Fs(t, e);
  if (!e.getGroupKey) return Je(t);
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
  const i = [...r.entries()].map(([c, u]) => {
    var N;
    const d = [...u].sort(
      (x, w) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, w.project)) || Ht(x, w);
      }
    ), f = ((N = e.getSectionHeading) == null ? void 0 : N.call(
      e,
      c,
      d.map((x) => x.project)
    )) ?? c;
    return { key: c, heading: f, rows: d };
  });
  i.sort((c, u) => c.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: c.key, heading: c.heading },
    { key: u.key, heading: u.heading }
  ) : c.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const s = i.map(({ key: c, heading: u, rows: d }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: c,
    label: u,
    rows: d,
    isPriority: c === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(Ht)
  }), s;
}
const _c = [
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
  if (!(typeof r != "string" || !vn(r)))
    return r;
}
const we = "recent", Ks = "other";
function Tn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function qs(t) {
  const e = t ?? {};
  return [
    Tn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Xt.lastUsedAt]) == "number" ? we : Ks;
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
        var s;
        const a = n.find(
          (c) => {
            var u;
            return typeof ((u = c.customData) == null ? void 0 : u[Xt.typeName]) == "string";
          }
        ), i = (s = a == null ? void 0 : a.customData) == null ? void 0 : s[Xt.typeName];
        return typeof i == "string" && i.length > 0 ? i : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Tc = qs();
function Vs(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? wr : e.unselectedSectionHeading ?? pr
  };
}
function Lc(t) {
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
function Ac(t) {
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
const Js = 100, at = {
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
  autoSelectionUnselectedSectionHeading: pr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Ws(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : ot(e.ariaLabel, at.ariaLabel),
    buttonPlaceholder: ot(
      e.buttonPlaceholder,
      at.buttonPlaceholder
    ),
    commandEmptyMessage: ot(
      e.commandEmptyMessage,
      at.commandEmptyMessage
    ),
    searchPlaceholder: ot(
      e.searchPlaceholder,
      at.searchPlaceholder
    ),
    groupByAriaLabel: ot(
      e.groupByAriaLabel,
      at.groupByAriaLabel
    ),
    groupSectionLabel: ot(
      e.groupSectionLabel,
      at.groupSectionLabel
    ),
    groupByNone: ot(
      e.groupByNone,
      at.groupByNone
    ),
    openTabsSectionHeading: ot(
      e.openTabsSectionHeading,
      at.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: ot(
      e.otherProjectsSectionHeading,
      at.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: ot(
      e.autoOpenTabsGroupingLabel,
      at.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: ot(
      e.autoSelectionGroupingLabel,
      at.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: ot(
      e.autoSelectionSelectedSectionHeading,
      at.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: ot(
      e.autoSelectionUnselectedSectionHeading,
      at.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: ot(
      e.boundButClosedTooltip,
      at.boundButClosedTooltip
    ),
    openButtonLabel: ot(
      e.openButtonLabel,
      at.openButtonLabel
    ),
    clearAll: ot(e.clearAll, at.clearAll)
  };
}
function Mc(t) {
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
  return wa[Fo(t)] ?? String(t);
}
const Zr = "platform.footerAction", Xs = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Zs({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = te(t);
  return e ? /* @__PURE__ */ o(
    be,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Xs,
      children: r
    }
  ) : /* @__PURE__ */ o(be, { variant: "secondary", children: r });
}
function Ys({
  row: t,
  mode: e,
  strings: r,
  onClick: n,
  onOpen: a,
  selectedRowRef: i,
  indicator: s,
  reserveIndicatorSlot: c
}) {
  const {
    ref: u,
    open: d,
    onPointerEnter: f,
    onPointerLeave: N
  } = _a(), [x, w] = P(!1), v = Yr(), p = t.isDisabled && !!t.disabledReason, S = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(s != null && s.label) || p, D = d || x, j = _(() => {
    if (S) {
      w(!0);
      return;
    }
    f();
  }, [S, f]), X = _(() => {
    w(!1), N();
  }, [N]), C = /* @__PURE__ */ o(Ne, { className: h("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let O;
  e === "project" ? t.openGroups.length > 0 && (O = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((q) => /* @__PURE__ */ o(be, { variant: "secondary", children: te(q) }, q)) })) : t.scrollGroupId !== void 0 && (O = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Zs,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      Q,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (q) => {
          q.stopPropagation(), a(t);
        },
        onMouseDown: (q) => q.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(Lo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const G = /* @__PURE__ */ m(
    ye,
    {
      ref: t.isSelected ? i : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: j,
      onPointerLeave: X,
      ...p && { "aria-describedby": v },
      className: h(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: C }),
        c && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: s == null ? void 0 : s.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              $o(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        O,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), K = t.scrollGroupId !== void 0 ? te(t.scrollGroupId) : void 0, M = t.isBoundButClosed && K ? r.boundButClosedTooltip.replace("{group}", K) : void 0;
  return /* @__PURE__ */ m(bt, { open: D, delayDuration: 400, children: [
    /* @__PURE__ */ o(Nt, { asChild: !0, children: G }),
    /* @__PURE__ */ m(
      vt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: sn(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && K && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              K,
              ")"
            ] })
          ] }),
          M && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: M }),
          (s == null ? void 0 : s.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: s.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Wt = "none";
function Qs({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Wt;
  return /* @__PURE__ */ m(ee, { children: [
    /* @__PURE__ */ m(bt, { children: [
      /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(re, { asChild: !0, children: /* @__PURE__ */ o(
        Q,
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
          onMouseDown: (i) => i.preventDefault(),
          children: /* @__PURE__ */ o(To, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(vt, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      ne,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ve },
        children: [
          /* @__PURE__ */ o(Ce, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(Oa, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Ur, { value: Wt, children: n.groupByNone }),
            /* @__PURE__ */ o(oe, {}),
            t.map((i) => /* @__PURE__ */ o(Ur, { value: i.id, children: i.label }, i.id))
          ] })
        ]
      }
    )
  ] });
}
function ti(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Wt) return Wt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Wt;
}
function Oc(t) {
  const [e, r] = P(!1), [n, a] = P(""), i = dt(() => Ws(t.localizedStrings), [t.localizedStrings]), s = dt(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(Tn(i.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      Vs({
        label: i.autoSelectionGroupingLabel,
        selectedSectionHeading: i.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: i.autoSelectionUnselectedSectionHeading
      })
    ), g;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    i.autoOpenTabsGroupingLabel,
    i.autoSelectionGroupingLabel,
    i.autoSelectionSelectedSectionHeading,
    i.autoSelectionUnselectedSectionHeading
  ]), [c, u] = P(void 0), d = dt(
    () => ti(s, t.defaultGrouping),
    [s, t.defaultGrouping]
  ), f = c ?? d, N = E(null), [x, w] = P(void 0), v = _((g) => {
    r(g), g || (a(""), w(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const g = window.requestAnimationFrame(() => {
      const L = N.current;
      L && L.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(g);
  }, [e]);
  const p = dt(() => t.mode === "project" ? Ge({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Ge({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Ge({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), S = dt(() => {
    const g = n.trim().toLowerCase();
    return g ? p.filter(
      (L) => L.shortName.toLowerCase().includes(g) || (L.fullName ?? "").toLowerCase().includes(g)
    ) : p;
  }, [p, n]), D = dt(
    () => new Map(t.projects.map((g) => [ut(g.id), g])),
    [t.projects]
  ), j = _(
    (g) => g === void 0 ? void 0 : D.get(ut(g)),
    [D]
  ), { renderProjectIndicator: X } = t, C = _(
    (g) => X ? X(g.project) : void 0,
    [X]
  ), O = !!X, G = !!t.footerAction && S.length === 0, K = dt(() => {
    if (f === Wt) return Je(S);
    const g = s.find((L) => L.id === f);
    return g ? $s(S, g) : Je(S);
  }, [S, f, s]), M = (g) => {
    if (g.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
    }
  }, q = (g) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: g.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const L = t.selection.pairs, $ = ut(g.projectId), tt = (Y) => ut(Y.projectId) === $ && Y.scrollGroupId === g.scrollGroupId, V = L.some(tt) ? L.filter((Y) => !tt(Y)) : [
          ...L.filter((Y) => !tt(Y)),
          { projectId: g.projectId, scrollGroupId: g.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: V });
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
        const L = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: g.projectId, scrollGroupId: L }), t.onOpenProjectInGroup(g.projectId, L), r(!1);
      }
    }
  }, ft = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, ht = t.mode === "project" ? t.renderTriggerLabel : void 0, Lt = t.mode === "project" ? t.triggerLabelFormat : void 0, Z = dt(() => {
    switch (t.mode) {
      case "project": {
        const g = j(t.selection.projectId);
        if (ht)
          return { node: ht(g), title: "", hasSelection: !!g };
        let L = g ? g.shortName : i.buttonPlaceholder;
        return g && Lt === "shortNameAndFullName" && (L = sn(g)), { node: L, title: L, hasSelection: !!g };
      }
      case "project-multi": {
        const { pairs: g } = t.selection;
        if (g.length === 0) {
          const V = i.buttonPlaceholder;
          return { node: V, title: V, hasSelection: !1 };
        }
        const L = [];
        if (g.forEach((V) => {
          const Y = j(V.projectId);
          Y && L.push({ project: Y, scrollGroupId: V.scrollGroupId });
        }), L.length === 0) {
          const V = i.buttonPlaceholder;
          return { node: V, title: V, hasSelection: !1 };
        }
        const $ = L.map(
          ({ project: V, scrollGroupId: Y }) => Y === void 0 ? V.shortName : `${V.shortName} (${te(Y)})`
        ).join(", "), tt = L.length.toString();
        return {
          node: /* @__PURE__ */ m(gt, { children: [
            /* @__PURE__ */ o(be, { variant: "muted", className: "tw:shrink-0", children: tt }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: $ })
          ] }),
          title: `${tt} ${$}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = j(t.selection.projectId);
        if (!g) {
          const tt = i.buttonPlaceholder;
          return { node: tt, title: tt, hasSelection: !1 };
        }
        const L = t.selection.scrollGroupId;
        if (L === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const $ = te(L);
        return {
          node: `${g.shortName} · ${$}`,
          title: `${g.shortName} · ${$}`,
          accessibleTitle: `${g.shortName}, ${$}`,
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
    ht,
    Lt,
    i.buttonPlaceholder
  ]), Rt = E(null), [Ft, At] = P(!1);
  F(() => {
    const g = Rt.current;
    if (!g) return;
    const L = (tt) => {
      At(tt < Js);
    };
    if (L(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const $ = new ResizeObserver((tt) => {
      tt.forEach((V) => {
        const [Y] = V.borderBoxSize;
        L(Y ? Y.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return $.observe(g, { box: "border-box" }), () => $.disconnect();
  }, []);
  let U;
  t.isLoading ? U = /* @__PURE__ */ o(Ao, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ft ? U = void 0 : t.mode === "project-multi" ? U = /* @__PURE__ */ o(en, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : U = /* @__PURE__ */ o(Mo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const it = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? M : void 0, nt = i.ariaLabel && Z.hasSelection && Z.title ? `${i.ariaLabel}: ${Z.accessibleTitle ?? Z.title}` : i.ariaLabel || void 0, wt = /* @__PURE__ */ m(
    Q,
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": nt,
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof Z.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: Z.node }) : Z.node }),
        U
      ]
    }
  ), Mt = Z.title ? /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(bt, { children: [
    /* @__PURE__ */ o(Nt, { asChild: !0, children: /* @__PURE__ */ o(qe, { asChild: !0, children: wt }) }),
    /* @__PURE__ */ o(vt, { dir: "auto", children: Z.title })
  ] }) }) : /* @__PURE__ */ o(qe, { asChild: !0, children: wt }), Bt = s.length > 1;
  return /* @__PURE__ */ m(lr, { open: e, onOpenChange: v, children: [
    Mt,
    /* @__PURE__ */ o(
      dr,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(
          nr,
          {
            shouldFilter: !1,
            value: G ? x ?? Zr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  or,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: i.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  Qs,
                  {
                    availableGroupings: s,
                    activeGrouping: f,
                    onChangeGrouping: u,
                    strings: i
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Q, { variant: "ghost", size: "sm", onClick: ft, children: `${i.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(ar, { children: [
                /* @__PURE__ */ o(sr, { children: i.commandEmptyMessage }),
                K.map((g, L) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    Ze,
                    {
                      children: [
                        /* @__PURE__ */ o(ge, { heading: ei(g, i), children: g.rows.map(($) => /* @__PURE__ */ o(
                          Ys,
                          {
                            row: $,
                            mode: t.mode,
                            strings: i,
                            onClick: q,
                            onOpen: it,
                            selectedRowRef: N,
                            indicator: C($),
                            reserveIndicatorSlot: O
                          },
                          $.rowKey
                        )) }),
                        L < K.length - 1 && /* @__PURE__ */ o($e, { alwaysRender: !0 })
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
                    ye,
                    {
                      forceMount: !0,
                      value: Zr,
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
function ei(t, e) {
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
const ri = Qr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: i = !1, id: s }, c) => {
    const u = yt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: s,
        className: h("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            rn,
            {
              className: h(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            un,
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
              onChange: (d) => e(d.target.value),
              disabled: i
            }
          ),
          t && /* @__PURE__ */ m(
            Q,
            {
              variant: "ghost",
              size: "icon",
              className: h(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": u === "rtl" },
                { "tw:right-0": u === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(tn, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ri.displayName = "SearchBar";
const ni = 5;
function Dc(t) {
  return fa(t).filter(
    (e) => !st.isObsolete(st.bookIdToNumber(e))
  );
}
function oi(t, e) {
  return t.filter((r) => {
    try {
      return Ko(r) === e;
    } catch {
      return !1;
    }
  });
}
const Pc = (t, e, r) => oi(t, e).every((n) => r.includes(n));
function ai(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => st.bookIdToNumber(n) > 0).sort((n, a) => st.bookIdToNumber(n) - st.bookIdToNumber(a)).map((n) => pa(n, e));
}
function Rc(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), i = new Set(e.map((c) => c.toUpperCase()));
  if (i.size > 0 && i.size === a.size && [...i].every((c) => a.has(c)))
    return r;
  const s = ai(t, n);
  if (s.length !== 0)
    return s.length <= ni ? s.join(", ") : `${s[0]} - ${s[s.length - 1]}`;
}
function si({ name: t, className: e }) {
  const r = fr(t) ? ur[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: h("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function pe({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const i = n ? "tw:me-2" : "tw:ms-2";
  if (fr(e)) return /* @__PURE__ */ o(si, { name: e, className: i });
  if (!t && n && a === "icon")
    return /* @__PURE__ */ o(
      "span",
      {
        "aria-hidden": "true",
        "data-slot": "menu-icon-spacer",
        className: h("tw:inline-block tw:w-4 tw:shrink-0", i)
      }
    );
  if (!t) return;
  const s = `${n ? "Leading" : "Trailing"} icon for ${r}`;
  return n ? /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "menu-icon-image-box",
      className: h(
        "tw:inline-flex tw:w-4 tw:shrink-0 tw:items-center tw:justify-center",
        i
      ),
      children: /* @__PURE__ */ o("img", { className: "tw:max-h-4 tw:max-w-4", src: t, alt: s })
    }
  ) : /* @__PURE__ */ o("img", { className: h("tw:max-h-4 tw:max-w-4", i), src: t, alt: s });
}
const ii = (t) => on(t) && (t.code === qo || t.code === Vo || t.code === an), ci = (t) => /* @__PURE__ */ o(oe, {}, `separator-${t}`), Ln = (t) => ({ ...t, checked: void 0 }), An = (t, e, r, n) => t.map(({ groupKey: a, items: i }) => ({
  groupKey: a,
  items: i.map(({ item: s, subGroups: c = [] }) => {
    if ("command" in s) {
      const d = /* @__PURE__ */ m(gt, { children: [
        /* @__PURE__ */ o(
          pe,
          {
            iconName: s.iconNameBefore,
            icon: s.iconPathBefore,
            menuLabel: s.label,
            leading: !0,
            leadingSlot: r
          }
        ),
        s.label,
        /* @__PURE__ */ o(
          pe,
          {
            iconName: s.iconNameAfter,
            icon: s.iconPathAfter,
            menuLabel: s.label
          }
        ),
        s.shortcut && /* @__PURE__ */ o(Da, { className: "tw:ps-4", children: /* @__PURE__ */ o(Ve, { hint: s.shortcut }) })
      ] }), f = () => {
        e(s);
      };
      return /* @__PURE__ */ m(bt, { children: [
        /* @__PURE__ */ o(Nt, { asChild: !0, children: s.checked !== void 0 ? /* @__PURE__ */ o(
          zt,
          {
            checked: s.checked,
            disabled: s.disabled,
            onSelect: f,
            children: d
          },
          `dropdown-menu-item-${s.label}-${s.command}`
        ) : /* @__PURE__ */ o(
          Ma,
          {
            disabled: s.disabled,
            onSelect: f,
            children: d
          },
          `dropdown-menu-item-${s.label}-${s.command}`
        ) }),
        s.tooltip && /* @__PURE__ */ o(vt, { children: s.tooltip })
      ] }, `tooltip-${s.label}-${s.command}`);
    }
    const u = /* @__PURE__ */ m(Ra, { disabled: s.disabled, children: [
      /* @__PURE__ */ o(
        pe,
        {
          iconName: s.iconNameBefore,
          menuLabel: s.label,
          leading: !0,
          leadingSlot: r
        }
      ),
      s.label,
      /* @__PURE__ */ o(pe, { iconName: s.iconNameAfter, menuLabel: s.label })
    ] });
    return /* @__PURE__ */ m(Pa, { children: [
      s.tooltip ? /* @__PURE__ */ m(bt, { children: [
        /* @__PURE__ */ o(Nt, { asChild: !0, children: u }),
        /* @__PURE__ */ o(vt, { children: s.tooltip })
      ] }) : u,
      /* @__PURE__ */ o(La, { children: /* @__PURE__ */ o(Ba, { ...n, children: Gs(
        An(
          c,
          e,
          In(
            c.flatMap(
              (d) => d.items.map(({ item: f }) => Ln(f))
            )
          ),
          n
        ),
        ci
      ) }) })
    ] }, `dropdown-menu-sub-${s.label}-${s.id}`);
  })
}));
function Mn({
  onSelectMenuItem: t,
  menuData: e,
  showSectionHeadings: r = !1,
  submenuContentProps: n
}) {
  const a = Yr(), i = dt(() => zs(e), [e]), s = js(e), c = r && s.length > 1, u = new Map(
    i.columns.map(({ columnKey: N, groups: x }) => [N, x])
  ), d = (N) => u.get(N) ?? [], f = In(
    s.flatMap(
      ({ columnKey: N }) => d(N).flatMap(
        (x) => x.items.map(({ item: w }) => Ln(w))
      )
    )
  );
  return s.map(({ columnKey: N, label: x, isHeaderHidden: w }, v) => {
    const p = `${a}-${N}`;
    return /* @__PURE__ */ m(Ze, { children: [
      /* @__PURE__ */ m(Aa, { "aria-labelledby": c ? p : void 0, children: [
        c && // A section shown without its heading keeps it for assistive technology only
        /* @__PURE__ */ o(Ce, { id: p, className: w ? "tw:sr-only" : void 0, children: x }),
        /* @__PURE__ */ o(_t, { children: An(
          d(N),
          t,
          f,
          n
        ).flatMap((S) => S.items) })
      ] }),
      v < s.length - 1 && /* @__PURE__ */ o(oe, {})
    ] }, N);
  });
}
function Bc({
  anchor: t,
  onClose: e,
  focusFirstItem: r = !1,
  contentProps: n,
  ...a
}) {
  const i = _(
    (s) => {
      !s || !r || requestAnimationFrame(
        () => {
          var c;
          return (c = s.querySelector('[role^="menuitem"]:not([data-disabled])')) == null ? void 0 : c.focus({ preventScroll: !0 });
        }
      );
    },
    [r]
  );
  return /* @__PURE__ */ m(
    ee,
    {
      open: !0,
      modal: !1,
      onOpenChange: (s) => {
        s || e();
      },
      children: [
        /* @__PURE__ */ o(re, { asChild: !0, children: /* @__PURE__ */ o(
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
          ne,
          {
            ref: i,
            align: "start",
            side: "bottom",
            onCloseAutoFocus: (s) => s.preventDefault(),
            ...n,
            children: /* @__PURE__ */ o(Mn, { ...a })
          }
        )
      ]
    }
  );
}
function jc({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  showSectionHeadings: i = !1,
  openMenuInOverlay: s,
  variant: c,
  buttonVariant: u = "ghost",
  id: d
}) {
  Ta();
  const f = E(null), N = () => Na(f.current ?? void 0), [x, w] = P(!1), v = E(!1);
  if (s) {
    const p = async (S) => {
      const D = f.current;
      if (!D || x) return;
      const { x: j, y: X, width: C, height: O } = D.getBoundingClientRect();
      w(!0);
      let G;
      try {
        G = await s(e, {
          anchor: { x: j, y: X, width: C, height: O },
          focusFirstItem: S
        });
      } catch (K) {
        ii(K) || console.error("TabDropdownMenu: could not open the menu in the overlay", K);
      } finally {
        w(!1);
      }
      G && Gr() === "pointer" && zr(D), G && t(G);
    };
    return /* @__PURE__ */ o(
      Q,
      {
        ref: f,
        id: d,
        "aria-label": r,
        "aria-haspopup": "menu",
        "aria-expanded": x,
        variant: u,
        size: "icon",
        className: h(Hr, a),
        onPointerDown: () => {
          v.current = x;
        },
        onClick: (S) => {
          const D = S.detail === 0;
          !D && v.current || p(D);
        },
        onKeyDown: (S) => {
          N(), S.key === "ArrowDown" && (S.preventDefault(), p(!0));
        },
        onBlur: N,
        children: n ?? /* @__PURE__ */ o(Mr, {})
      }
    );
  }
  return /* @__PURE__ */ m(ee, { variant: c, children: [
    /* @__PURE__ */ o(re, { "aria-label": r, className: a, asChild: !0, id: d, children: /* @__PURE__ */ o(
      Q,
      {
        ref: f,
        variant: u,
        size: "icon",
        className: Hr,
        onKeyDown: N,
        onBlur: N,
        children: n ?? /* @__PURE__ */ o(Mr, {})
      }
    ) }),
    /* @__PURE__ */ o(
      ne,
      {
        align: "start",
        style: { zIndex: rr },
        onCloseAutoFocus: () => {
          Gr() === "pointer" && zr(f.current ?? void 0);
        },
        children: /* @__PURE__ */ o(
          Mn,
          {
            menuData: e,
            onSelectMenuItem: t,
            showSectionHeadings: i
          }
        )
      }
    )
  ] });
}
function Gc({ message: t, id: e, className: r }) {
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
function li({ className: t, ...e }) {
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
function di({ className: t, ...e }) {
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
const ui = Pt(
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
function fi({
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
        ui({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function zc({ className: t, ...e }) {
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
function wi({ className: t, ...e }) {
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
function pi({ className: t, ...e }) {
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
function Hc({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: i
}) {
  return /* @__PURE__ */ m(li, { className: h(i), role: a, children: [
    /* @__PURE__ */ m(di, { children: [
      /* @__PURE__ */ o(fi, { variant: "icon", children: n ?? /* @__PURE__ */ o(Oo, {}) }),
      /* @__PURE__ */ o(wi, { children: t })
    ] }),
    r && /* @__PURE__ */ o(pi, { children: /* @__PURE__ */ o(Q, { onClick: () => r(), children: e }) })
  ] });
}
const mi = Qr(({ className: t, ...e }, r) => /* @__PURE__ */ o(Do, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
mi.displayName = "Spinner";
const hi = Pt(
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
function Uc({
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
        hi({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Fc({ className: t, ...e }) {
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
function $c({ className: t, ...e }) {
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
function Kc({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    er.Group,
    {
      "data-slot": "resizable-panel-group",
      className: h(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: n ?? e,
      onLayoutChange: r ? (i) => r(Object.values(i)) : void 0,
      ...a
    }
  );
}
function me(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function qc({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    er.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: me(t),
      minSize: me(e),
      maxSize: me(r),
      collapsedSize: me(n),
      ...a
    }
  );
}
function Vc({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    er.Separator,
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
  Qi as A,
  Q as B,
  ye as C,
  ee as D,
  cr as E,
  bn as F,
  ar as G,
  sr as H,
  cc as I,
  dc as J,
  Bi as K,
  ec as L,
  zi as M,
  Hi as N,
  Ki as O,
  qi as P,
  Fi as Q,
  lc as R,
  Ee as S,
  _t as T,
  ja as U,
  uc as V,
  be as W,
  va as X,
  pc as Y,
  wc as Z,
  oe as _,
  pa as a,
  cs as a$,
  ma as a0,
  rr as a1,
  Nc as a2,
  yc as a3,
  mc as a4,
  hc as a5,
  vc as a6,
  gc as a7,
  Aa as a8,
  Oa as a9,
  aa as aA,
  ia as aB,
  $r as aC,
  Uc as aD,
  $c as aE,
  Fc as aF,
  rc as aG,
  Gi as aH,
  $i as aI,
  oa as aJ,
  na as aK,
  ji as aL,
  La as aM,
  Da as aN,
  Pa as aO,
  Ba as aP,
  Ra as aQ,
  ps as aR,
  li as aS,
  pi as aT,
  wi as aU,
  di as aV,
  fi as aW,
  Gc as aX,
  zc as aY,
  Ec as aZ,
  Os as a_,
  Ur as aa,
  Sc as ab,
  Cc as ac,
  kc as ad,
  un as ae,
  Oc as af,
  ri as ag,
  Dc as ah,
  oi as ai,
  $e as aj,
  Zi as ak,
  Pc as al,
  nc as am,
  pn as an,
  Ui as ao,
  wa as ap,
  jc as aq,
  yn as ar,
  Se as as,
  ke as at,
  hn as au,
  zs as av,
  Gs as aw,
  In as ax,
  pe as ay,
  Ve as az,
  Ta as b,
  Et as b$,
  Cs as b0,
  ka as b1,
  sc as b2,
  oc as b3,
  ac as b4,
  Vc as b5,
  qc as b6,
  Kc as b7,
  Hc as b8,
  mi as b9,
  Bc as bA,
  Ic as bB,
  si as bC,
  Wt as bD,
  at as bE,
  _c as bF,
  ra as bG,
  Lc as bH,
  Mc as bI,
  Ac as bJ,
  kn as bK,
  es as bL,
  Tc as bM,
  Ja as bN,
  Qa as bO,
  ts as bP,
  rs as bQ,
  Be as bR,
  Va as bS,
  qs as bT,
  Vs as bU,
  _s as bV,
  Ri as bW,
  Wa as bX,
  Xa as bY,
  os as bZ,
  ns as b_,
  xc as ba,
  bc as bb,
  ic as bc,
  ws as bd,
  ve as be,
  Pi as bf,
  Di as bg,
  ea as bh,
  ta as bi,
  Mi as bj,
  Ai as bk,
  Oi as bl,
  Li as bm,
  Ha as bn,
  ya as bo,
  cn as bp,
  En as bq,
  fn as br,
  Jr as bs,
  fc as bt,
  gs as bu,
  hs as bv,
  wn as bw,
  Ka as bx,
  ms as by,
  Wi as bz,
  h as c,
  Rc as c0,
  as as c1,
  ss as c2,
  is as c3,
  bt as d,
  Nt as e,
  vt as f,
  Yi as g,
  Gr as h,
  re as i,
  ne as j,
  Ce as k,
  Ma as l,
  Ji as m,
  tc as n,
  ge as o,
  yt as p,
  ua as q,
  ot as r,
  Xi as s,
  lr as t,
  _a as u,
  qe as v,
  dr as w,
  Vi as x,
  nr as y,
  or as z
};
//# sourceMappingURL=resizable-BuVwyUpi.js.map
