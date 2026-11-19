import { jsx as o, jsxs as m, Fragment as ht } from "react/jsx-runtime";
import { Slot as Ve, Dialog as It, Separator as Bn, Popover as Zt, Tooltip as Jt, DropdownMenu as tt, Label as jn, RadioGroup as je } from "radix-ui";
import { IconX as Gn, IconCheck as Je, IconSearch as zn, IconChevronLeft as Hn, IconChevronRight as Un } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import wt, { useRef as E, useEffect as F, useCallback as T, useState as R, createContext as Fn, useContext as $n, useMemo as it, Fragment as We, useLayoutEffect as de, useImperativeHandle as Kn, useId as Wr, forwardRef as Xr } from "react";
import { X as Zr, Check as Ne, ChevronsUpDown as Yr, Star as qn, Undo as Vn, Redo as Jn, SquareX as Xe, FunctionSquare as Ze, SquareSigma as Ye, Ban as Wn, Copy as Xn, Sparkles as Zn, ClipboardCheck as Yn, CircleCheckBig as Qn, MessageSquare as to, Search as Qr, Library as eo, BookOpen as ro, BookMarked as no, Book as oo, MessageSquarePlus as ao, PanelBottom as so, FileText as io, Scan as lo, ZoomOut as co, ZoomIn as uo, Eye as fo, Pencil as wo, BookCopy as po, Users as mo, ExternalLink as ho, CircleQuestionMark as go, Settings as bo, BookA as No, House as vo, Download as yo, RefreshCw as xo, Group as So, ArrowRight as ko, Loader2 as Co, ChevronDown as Eo, MenuIcon as _r, AlertTriangle as Io, LoaderCircle as _o } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Tr, GENERATOR_NOTE_CALLER as Ge, HIDDEN_NOTE_CALLER as ze, isInsertEmbedOpOfType as Vt, getDefaultViewOptions as To, getMarkerMenuItems as Lo, defaultStyleInfo as Lr, Editorial as Ao } from "@eten-tech-foundation/platform-editor";
import { Section as Dt, MODIFIER_KEYS as Mo, split as tn, slice as Oo, formatReplacementString as Do, usfmMarkers as ue, deepEqual as Gt, isPlatformError as en, ABORTED as rn, getErrorMessage as Po, normalizeProjectId as lt, compareProjectsByName as Ro, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Xt, formatProjectName as nn, getLocalizeKeyForScrollGroupId as Bo, hasDistinctFullName as jo, getSectionForBook as Go, FAILED_PRECONDITION as zo, RESOURCE_EXHAUSTED as Ho } from "platform-bible-utils";
import { Command as Ut } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Qe from "react-resizable-panels";
import { clsx as Uo } from "clsx";
import { extendTailwindMerge as Fo, twMerge as $o } from "tailwind-merge";
const Ko = Fo({ prefix: "tw" });
function He(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const i = t[a];
    i === "[" ? n += 1 : i === "]" && (n -= 1), i === ":" && n === 0 ? (e.push(r), r = "") : r += i;
  }
  return e.push(r), e;
}
function qo(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = He(t), r = e.findIndex((i) => i.startsWith("-tw-"));
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
function Vo(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = He(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], i = He(e), s = i.some((u) => u.startsWith("-tw-")), l = i.some((u) => u.startsWith("!tw-"));
  if (s && a.startsWith("-")) {
    const u = a.slice(1);
    return [...n, `-tw-${u}`].join(":");
  }
  if (l && a.startsWith("!")) {
    const u = a.slice(1);
    return [...n, `!tw-${u}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function h(...t) {
  const e = Uo(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Ko(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((u) => {
    const d = qo(u);
    n.set(d.normalized, d.original), a.push(d.normalized);
  }), $o(a.join(" ")).split(" ").filter(Boolean).map((u) => {
    const d = n.get(u);
    return d ? Vo(u, d) : u;
  }).join(" ");
}
const tr = 600, ve = 650, Si = 400, Jo = 450, Wo = 500, ki = 510, Ci = 520, Xo = 675, Ei = 690, Ii = 700, _i = 800, on = Pt(
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
  const i = n ? Ve.Root : "button";
  return /* @__PURE__ */ o(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: h(on({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const an = "layoutDirection";
function sn() {
  return globalThis.localStorage ?? void 0;
}
function vt() {
  var t;
  try {
    const e = (t = sn()) == null ? void 0 : t.getItem(an);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Ti(t) {
  var e;
  try {
    (e = sn()) == null || e.setItem(an, t);
  } catch {
  }
}
function Li({ ...t }) {
  return /* @__PURE__ */ o(It.Root, { "data-slot": "dialog", ...t });
}
function Ai({ ...t }) {
  return /* @__PURE__ */ o(It.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Zo({ ...t }) {
  return /* @__PURE__ */ o(It.Portal, { "data-slot": "dialog-portal", ...t });
}
function Mi({ ...t }) {
  return /* @__PURE__ */ o(It.Close, { "data-slot": "dialog-close", ...t });
}
function Yo({
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
      style: { zIndex: Jo, ...e },
      ...r
    }
  );
}
function Oi({
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
  const l = vt();
  return /* @__PURE__ */ m(Zo, { children: [
    /* @__PURE__ */ o(Yo, { className: n, style: a }),
    /* @__PURE__ */ m(
      It.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Wo, ...i },
        dir: l,
        ...s,
        children: [
          e,
          r && /* @__PURE__ */ o(It.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Gn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Di({ className: t, ...e }) {
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
function Pi({
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
        e && /* @__PURE__ */ o(It.Close, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ri({ className: t, ...e }) {
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
function Bi({
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
function ln({ className: t, type: e, ...r }) {
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
function Qo({ className: t, ...e }) {
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
const ta = Pt(
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
function ea({
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
        className: h(ta({ align: e }), t),
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
function er({ className: t, ...e }) {
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
function rr({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = vt(), i = wt.useCallback(
    (s) => {
      if (e == null || e(s), s.defaultPrevented || !r || s.key !== " " || s.currentTarget.value !== "") return;
      const l = s.currentTarget.closest("[cmdk-root]"), u = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (s.preventDefault(), s.stopPropagation(), u.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(Qo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ o(ea, { children: /* @__PURE__ */ o(zn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function nr({ className: t, ...e }) {
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
function or({
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
function Ue({
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
        /* @__PURE__ */ o(Je, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function ra({ className: t, ...e }) {
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
const na = [
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
], oa = (t) => {
  var e;
  return ((e = na[t]) == null ? void 0 : e.chapters) ?? -1;
}, aa = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function sa(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function B(t) {
  return `%scrollGroup_${t}%`;
}
const ia = {
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
function ar(t, e) {
  return oa(ot.bookIdToNumber(t));
}
function xe(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, i = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((s) => {
    const l = ot.bookIdToNumber(s);
    (r === "next" ? l > n && l < i : l < n && l > i) && (a = s, i = l);
  }), a;
}
function ji(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const i = xe(n, e, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(ar(i), 1),
      verseNum: 1
    };
}
function Gi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < ar(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const i = xe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function zi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: i } = t;
  if (e === void 0 || e.includes(n))
    return i > 1 ? { book: n, chapterNum: a, verseNum: i - 1 } : i === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const s = xe(n, e, "previous");
  if (!s) return;
  const l = Math.max(ar(s), 1);
  return { book: s, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Hi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: i } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: i + 1 };
  const s = xe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ui(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Fi = (t, e, r, n, a) => {
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
}, $i = (t, e, r, n, a) => {
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
function Ki(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function la(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const qi = Object.fromEntries(
  aa.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function Vi(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ot.bookIdToEnglishName(t), i = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (i ? i.localizedName.toLowerCase().includes(n) || i.localizedId.toLowerCase().includes(n) : !1));
}
function cn() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function dn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function un(t) {
  dn(document, cn()) || t();
}
function Ar(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Mr(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function ca(t, e) {
  const [r] = R(cn), n = E(t);
  n.current = t;
  const a = E(e);
  return a.current = e, T(
    (i) => {
      var u, d;
      if ((u = n.current) == null || u.call(n, i), i.defaultPrevented) return;
      if (dn(document, r)) {
        i.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: s } = document;
      if (s && s !== document.body) return;
      const l = (d = a.current) == null ? void 0 : d.call(a);
      l && (l.focus({ preventScroll: !0 }), document.activeElement === l && i.preventDefault());
    },
    [r]
  );
}
const fn = Symbol.for("platform-bible-react.window-blur-press");
function da(t) {
  return Reflect.get(t, fn) === !0;
}
function wn({
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
      Object.defineProperty(w, fn, { value: !0 }), N.dispatchEvent(w);
    };
    return window.addEventListener("blur", d), () => window.removeEventListener("blur", d);
  }, []);
  const i = T(
    (d) => {
      if (r.current = d ?? void 0, d && d !== n.current && (n.current = d, a.current = Ar(d) ?? Mr(d)), typeof t == "function") {
        const f = t(d);
        if (typeof f == "function")
          return () => {
            r.current = void 0, f();
          };
      } else t && (t.current = d);
    },
    [t]
  ), s = T(() => {
    var x;
    const d = n.current, f = (x = a.current) != null && x.isConnected ? a.current : void 0, N = (d && Ar(d)) ?? f ?? (d && Mr(d));
    return N != null && N.isConnected ? N : void 0;
  }, []), l = ca(
    e,
    s
  ), u = T(
    (d) => {
      l(d), r.current || (n.current = void 0, a.current = void 0);
    },
    [l]
  );
  return { ref: i, onCloseAutoFocus: u };
}
const Or = `
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
function ua(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${Or}, ${e}` : Or;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && ua(n)
  );
}
const Ji = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Fe = "keyboard", Dr = !1;
function fa() {
  Dr || typeof document > "u" || (Dr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      da(t) || (Fe = "pointer");
    },
    !0
  ), document.addEventListener(
    "keydown",
    () => {
      Fe = "keyboard";
    },
    !0
  ));
}
function Pr() {
  return Fe;
}
const pn = "data-quiet-focus";
function Rr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(pn, ""), t.style.outline = "none"));
}
function wa(t) {
  t && (t.removeAttribute(pn), t.style.removeProperty("outline"));
}
const Br = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function pa({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    Bn.Root,
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
const ma = Pt(
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
function sr({
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
        ma({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Wi({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ve.Root : "div";
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
function mn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    pa,
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
function hn() {
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
function ir({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function $e({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: ha, usePortalContainer: ga } = hn(), Xi = ha;
function lr({
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
  const l = vt(), u = ga(), d = wn({ ref: a, onCloseAutoFocus: i });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: u, children: /* @__PURE__ */ o(
      Zt.Content,
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
        style: { zIndex: tr, ...n },
        dir: l,
        ...s
      }
    ) })
  );
}
function ba({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Yi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Qi({ className: t, ...e }) {
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
function gt({ ...t }) {
  return /* @__PURE__ */ o(Jt.Root, { "data-slot": "tooltip", ...t });
}
function bt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? h(on({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: Na, usePortalContainer: va } = hn(), tl = Na;
function Nt({
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
  const l = va();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: l, children: /* @__PURE__ */ m(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Xo, ...r },
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
const ya = /^%[^%]*%$/;
function gn(t) {
  return t !== void 0 && !ya.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return gn(t) ? t : e;
}
function xa() {
  const [t, e] = R(!1), r = E(null), n = T(() => {
    const i = r.current;
    i && i.scrollWidth > i.clientWidth && e(!0);
  }, []), a = T(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
function Sa() {
  F(() => {
    fa();
  }, []);
}
const bn = Fn(void 0);
function Se() {
  const t = $n(bn);
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
function te({ variant: t = "default", ...e }) {
  const r = vt(), n = wt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(bn.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function ka({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ee({
  ...t
}) {
  return /* @__PURE__ */ o(tt.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function re({
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
  ...l
}) {
  const u = vt(), d = wn({ ref: i, onCloseAutoFocus: s });
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
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
      style: { zIndex: tr, ...n },
      ...l,
      children: /* @__PURE__ */ o("div", { dir: u, children: a })
    }
  ) });
}
function Ca({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ea({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = vt(), i = Se();
  return /* @__PURE__ */ o(
    tt.Item,
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
  const i = vt(), s = Se();
  return /* @__PURE__ */ m(
    tt.CheckboxItem,
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(Je, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ia({
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
  const a = vt(), i = Se();
  return /* @__PURE__ */ m(
    tt.RadioItem,
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(Je, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ce({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ o(
    tt.Label,
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
function ne({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    tt.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: h("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function _a({ className: t, ...e }) {
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
function Ta({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function La({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = Se(), i = vt();
  return /* @__PURE__ */ m(
    tt.SubTrigger,
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
        i === "rtl" ? /* @__PURE__ */ o(Hn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Un, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Aa({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = vt();
  return /* @__PURE__ */ o(
    tt.SubContent,
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
function el({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    jn.Root,
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
function rl({
  className: t,
  ...e
}) {
  const r = vt();
  return /* @__PURE__ */ o(
    je.Root,
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
function nl({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    je.Item,
    {
      "data-slot": "radio-group-item",
      className: h(
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
const ol = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Gr = (t, e) => t[e] ?? e;
function Ma({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: i
}) {
  const s = Gr(n, "%cancelButton_tooltip%"), l = i ?? Gr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(sr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(gt, { children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": s,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Zr, {})
        }
      ) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: s }) })
    ] }) }),
    /* @__PURE__ */ o(mn, {}),
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(gt, { children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(Ne, {})
        }
      ) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function Ee() {
  return /Macintosh/i.test(navigator.userAgent);
}
function al() {
  return /Windows/i.test(navigator.userAgent);
}
const Oa = ["input", "select", "textarea", "button"], Da = ["button", "textbox"], sl = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = E(null), [i, s] = R(void 0), [l, u] = R(void 0), d = T(
    (w) => {
      s(w);
      const v = t.find((S) => S.id === w);
      v && (e == null || e(v));
      const p = document.getElementById(w);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = T(
    (w) => {
      const v = t.find((p) => p.id === w);
      v && (u((p) => p === w ? void 0 : w), r == null || r(v));
    },
    [r, t]
  ), N = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || Oa.includes(v)) return !0;
    const p = w.getAttribute("role");
    if (p && Da.includes(p)) return !0;
    const S = w.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, x = T(
    (w) => {
      var K;
      const v = w.target, p = (M) => M ? document.getElementById(M) : void 0, S = p(l), P = p(i);
      if (!!(S && v && S.contains(v) && v !== S) && N(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const M = t.find((q) => q.id === l);
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
          const q = M.findIndex((pt) => pt === v);
          if (q === -1) return;
          let ct;
          w.key === "ArrowDown" ? ct = Math.min(q + 1, M.length - 1) : ct = Math.max(q - 1, 0), ct !== q && (w.preventDefault(), w.stopPropagation(), (K = M[ct]) == null || K.focus());
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
          const M = P;
          if (M) {
            const q = M.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ct = M.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), pt = q ?? ct;
            if (pt) {
              w.preventDefault(), pt.focus();
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
    [t, d, i, l, f, n]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Pa = Pt(
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
  const a = r ? Ve.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: h(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Pa({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function il({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Nn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function ll({
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
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        Yt(s, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
          f.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const u = new MutationObserver(() => {
      l();
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
    const { current: l } = a;
    if (l && Nn(s, l)) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), (u = Yt(l)[0]) == null || u.focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
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
function cl({
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
function dl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function ul({ className: t, ...e }) {
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
function Ra(t) {
  wt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const r = (n) => {
      if (e.contains(document.activeElement)) {
        if (n.key === "ArrowRight" || n.key === "ArrowLeft") {
          n.preventDefault(), n.stopPropagation();
          const a = t.current ? Yt(t.current) : [], i = a.indexOf(document.activeElement), s = n.key === "ArrowRight" ? i + 1 : i - 1;
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
function Ba(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ja(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function fl({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...i
}) {
  const s = wt.useRef(null);
  wt.useEffect(() => {
    typeof a == "function" ? a(s.current) : a && "current" in a && (a.current = s.current);
  }, [a]), Ra(s);
  const l = wt.useMemo(
    () => s.current ? Yt(s.current) : [],
    [s]
  ), u = wt.useCallback(
    (f) => {
      const { current: N } = s;
      if (!N || !N.parentElement) return;
      if (!Nn(f, N)) {
        e == null || e(f);
        return;
      }
      const x = N.closest("table"), w = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(x).filter(
          (S) => S.tagName === "TR"
        )
      ) : [], v = w.indexOf(N), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), ja(w, v, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), Ba(l, p, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const S = N.closest("table");
        S && S.focus();
      }
      e == null || e(f);
    },
    [s, l, e]
  ), d = wt.useCallback(
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
function wl({ className: t, ...e }) {
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
function pl({ className: t, ...e }) {
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
function ml({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ga(t, e = !0) {
  const [r, n] = R(!1);
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
    const l = new MutationObserver(i);
    return l.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", i), s == null || s.disconnect(), l.disconnect();
    };
  }, [t, e]), r;
}
function za({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Ga(r, e);
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
function hl({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: i = !1,
  selectAllText: s = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: d,
  isOpen: f = void 0,
  onOpenChange: N = void 0,
  isDisabled: x = !1,
  sortSelected: w = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: S = void 0,
  variant: P = "ghost",
  id: j
}) {
  const [J, C] = R(!1), O = E(null), G = T(
    (U) => {
      var et;
      const at = (et = t.find((dt) => dt.label === U)) == null ? void 0 : et.value;
      at && r(
        e.includes(at) ? e.filter((dt) => dt !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), K = () => d || n, M = f ?? J, q = N ?? C, [ct, pt] = R(M), [Tt, W] = R(e);
  ct !== M && (pt(M), M && W(e));
  const Rt = it(() => {
    if (!w) return t;
    const U = t.filter((et) => et.starred).sort((et, dt) => et.label.localeCompare(dt.label)), at = t.filter((et) => !et.starred).sort((et, dt) => {
      const At = Tt.includes(et.value), Bt = Tt.includes(dt.value);
      return At && !Bt ? -1 : !At && Bt ? 1 : et.label.localeCompare(dt.label);
    });
    return [...U, ...at];
  }, [t, Tt, w]), Ft = () => {
    const U = t.map((at) => at.value);
    W(U), r(U);
  }, Lt = () => {
    W([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: j, className: S, children: /* @__PURE__ */ m(ir, { open: M, onOpenChange: q, children: [
    /* @__PURE__ */ o($e, { asChild: !0, children: /* @__PURE__ */ m(
      Z,
      {
        variant: P,
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
          /* @__PURE__ */ o(Yr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(lr, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(er, { children: [
      /* @__PURE__ */ o(
        rr,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      i && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Ft, children: s }),
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Lt, children: l })
      ] }),
      /* @__PURE__ */ o(za, { isEnabled: v, scrollerRef: O, children: /* @__PURE__ */ m(nr, { ref: O, children: [
        /* @__PURE__ */ o(or, { children: u }),
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
              U.starred && /* @__PURE__ */ o(qn, { className: "tw:h-4 tw:w-4" }),
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
function Ha(t, e) {
  if (!t || e === "") return !1;
  const r = Et(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && Et(n.marker).toLowerCase() === r
  );
}
function Ua(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = Et(e).toLowerCase();
  return r === "passive" ? Tr({
    query: a,
    items: n,
    filter: (i) => Et(i.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Tr({
    query: a,
    items: n,
    filter: (i) => Et(i.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function me(t) {
  return t.isComposing || t.keyCode === 229;
}
const vn = /^[a-z0-9+-]$/i;
function Fa(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && Ee()) && e !== "Dead") {
    if (vn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), i = e.toUpperCase(), s = e.toLowerCase();
      return (i !== s ? e === i : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const $a = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ka = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function qa() {
  return [...$a, ...Ka.filter((t) => vn.test(t))];
}
function ft(t) {
  t.preventDefault(), t.stopPropagation();
}
function Va(t, e, r) {
  var s, l;
  const { kind: n } = e;
  if (me(t) || Mo.has(t.key))
    return "passed";
  const a = !Ee();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((s = t.getModifierState) != null && s.call(t, "AltGraph")))
    return t.key === "Enter" && ft(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return ft(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return ft(t), Ua(
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
    return ft(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (ft(t), e.filter === "")
        return r.dismiss(), "ended";
      const f = Et(e.filter).toLowerCase();
      if ((l = e.isNoteMarker) != null && l.call(e, f)) {
        const N = e.items.find(
          (x) => Et(x.marker).toLowerCase() === f
        );
        return N && r.commitItem(N.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    ft(t);
    const u = Et(e.filter).toLowerCase(), d = e.items.find(
      (f) => Et(f.marker).toLowerCase() === u
    );
    return d && r.commitItem(d.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (ft(t), r.dismiss(), "ended") : (ft(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (ft(t), "continue") : (ft(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return ft(t), r.dismiss(), "ended";
  const i = Fa(t);
  return t.key === "Backspace" || i !== void 0 ? (ft(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + i, r.update({ filterText: e.filter }), "continue") : (ft(t), "continue");
}
function Ja(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function yn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Wa(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Xa(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: i,
    clearSessionIfCurrent: s,
    runSessionKey: l,
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
  const p = a.current, S = () => a.current === p, P = { kind: r, token: p, filter: "", items: e };
  n && (P.isNoteMarker = n), i(P), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: qa(),
    onKey: (j) => l(j)
  }).then((j) => {
    var C;
    s(p);
    const J = j ?? ((C = P.itemToApplyOnClose) == null ? void 0 : C.marker);
    if (J !== void 0) {
      const O = (f == null ? void 0 : f()) ?? !1;
      v();
      const G = O ? void 0 : e.find((K) => K.marker === J);
      G && x(G);
    } else S() && v();
  }).catch((j) => {
    s(p), S() && v(), w(j);
  });
}
function Za(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: i,
    reopenAtCaret: s,
    clearSessionIfCurrent: l,
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
  return Va(t, d, {
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
  }) === "ended" && l(d.token), "routed";
}
function Ya({
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
function Qa({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: i
}) {
  F(() => {
    const s = i ?? document, l = (u) => {
      var N, x, w;
      const d = (N = t.current) == null ? void 0 : N.querySelector(".editor-input");
      if (!d || u.target !== d) return;
      const f = (x = e.current) == null ? void 0 : x.getSelection();
      f ? r.current = f : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = yn(
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
    return s.addEventListener("focusout", l), () => s.removeEventListener("focusout", l);
  }, [t, e, r, n, a, i]);
}
function ts({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = E(void 0), a = T(
    (s) => {
      t.current = s, s && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = s ? l : void 0, l == null || l.setMarkerSettleSuspended(!!s);
    },
    [t, r, e]
  ), i = T(
    (s) => {
      var l;
      Ja(t, s), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
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
function zr({ className: t, ...e }) {
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
function es({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: h("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const rs = /* @__PURE__ */ new Set([
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
function ns(t) {
  const e = tn(t, "");
  let r = 0;
  for (; r < e.length && rs.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Oo(t, r);
  return a ? [...n, a] : n;
}
function os(t) {
  const e = [];
  let r = "";
  return tn(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function as(t) {
  const e = ns(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: os(t), separator: "+" };
}
function Ke({ hint: t }) {
  const { keycaps: e, separator: r } = as(t);
  return e.length === 1 ? /* @__PURE__ */ o(zr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(es, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m(We, { children: [
        a > 0 && r && /* @__PURE__ */ o("span", { children: r }),
        /* @__PURE__ */ o(zr, { children: n })
      ] }, a)
    )) })
  );
}
const gl = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Hr = (t, e) => t[e] ?? e;
function ss({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const u = Ee(), d = Hr(a, "%undoButton_tooltip%"), f = Hr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(sr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(gt, { children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": d,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o(Vn, {})
        }
      ) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ m("p", { children: [
        d,
        i && /* @__PURE__ */ m(ht, { children: [
          " ",
          /* @__PURE__ */ o(Ke, { hint: u ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(mn, {}),
    e && /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(gt, { children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": f,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(Jn, {})
        }
      ) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ m("p", { children: [
        f,
        i && /* @__PURE__ */ m(ht, { children: [
          " ",
          /* @__PURE__ */ o(Ke, { hint: u ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function is({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = E(null);
  return F(() => {
    var u;
    const i = Ee(), s = ((u = a.current) == null ? void 0 : u.querySelector(".editor-input")) ?? void 0, l = (d) => {
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
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function ls() {
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
  }), n = T((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return it(() => ({ virtualRef: r, setSource: n }), [n]);
}
function cs(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function ds(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const us = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(ht, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(ht, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(ht, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function fs({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const i = E(!1), s = E(null), l = E(null), u = E(!1), [d, f] = R(t), [N, x] = R(e), [w, v] = R(!1), p = E(!1), S = E(d);
  S.current = d;
  const P = E(N);
  P.current = N, F(() => {
    f(t);
  }, [t]), F(() => {
    N !== e && x(e);
  }, [e]);
  const j = (C) => {
    if (u.current = !1, v(C), !C) {
      const O = S.current, G = P.current;
      O !== "custom" || G ? (O !== t || G !== e) && (i.current = !0, r(O, G)) : (f(t), x(e));
    }
  }, J = (C) => {
    var O, G, K, M;
    C.stopPropagation(), document.activeElement === l.current && C.key === "ArrowDown" || C.key === "ArrowRight" ? ((O = s.current) == null || O.focus(), u.current = !0) : document.activeElement === s.current && C.key === "ArrowUp" ? ((G = l.current) == null || G.focus(), u.current = !1) : document.activeElement === s.current && C.key === "ArrowLeft" && ((K = s.current) == null ? void 0 : K.selectionStart) === 0 && ((M = l.current) == null || M.focus(), u.current = !1), d === "custom" && C.key === "Enter" && (document.activeElement === l.current || document.activeElement === s.current) && j(!1);
  };
  return /* @__PURE__ */ m(te, { open: w, onOpenChange: j, children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(gt, { children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(ee, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: us(t, n, e) }) }) }),
      /* @__PURE__ */ o(Nt, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      re,
      {
        style: { zIndex: ve },
        onEscapeKeyDown: () => {
          S.current = t, P.current = e, f(t), x(e);
        },
        onCloseAutoFocus: (C) => {
          i.current && (i.current = !1, C.preventDefault(), un(a));
        },
        onClick: () => {
          u.current && (u.current = !1);
        },
        onKeyDown: J,
        onMouseMove: () => {
          var C;
          u.current && ((C = s.current) == null || C.focus());
        },
        children: [
          /* @__PURE__ */ o(Ce, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(ne, {}),
          /* @__PURE__ */ o(
            zt,
            {
              checked: d === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ge })
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
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: ze })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            zt,
            {
              ref: l,
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
                  ln,
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
const ws = (t, e) => t === "f" ? /* @__PURE__ */ m(ht, { children: [
  /* @__PURE__ */ o(Ze, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(ht, { children: [
  /* @__PURE__ */ o(Ye, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(ht, { children: [
  /* @__PURE__ */ o(Xe, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), ps = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Do(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ms({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const i = E(!1), s = (l) => {
    l !== t && (i.current = !0, e(l));
  };
  return /* @__PURE__ */ m(te, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(gt, { children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(ee, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: ws(t, r) }) }) }),
      /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: ps(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      re,
      {
        style: { zIndex: ve },
        onCloseAutoFocus: (l) => {
          i.current && (i.current = !1, l.preventDefault(), un(a));
        },
        children: [
          /* @__PURE__ */ o(Ce, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(ne, {}),
          /* @__PURE__ */ m(
            zt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => s("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Xe, {}),
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
                /* @__PURE__ */ o(Ze, {}),
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
                /* @__PURE__ */ o(Ye, {}),
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
function Fr(t) {
  return t ? t.matches(Ur) ? !0 : !!t.querySelector(Ur) : !1;
}
const bl = Object.freeze([
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
function hs({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Wn, { className: e, size: 16 });
}
function gs({ state: t }) {
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
function $r({
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
        t.selectionState !== void 0 && /* @__PURE__ */ o(gs, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(hs, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(ra, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function bs({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [i, s] = R(""), [l] = R(() => {
    const f = e.find(
      (N) => N.marker === a && !N.isDisallowed && !N.isDeprecated && !N.isDisabled
    );
    return f ? he(f) : void 0;
  }), [u, d] = it(() => {
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
  return /* @__PURE__ */ m(er, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: l, children: [
    /* @__PURE__ */ o(
      rr,
      {
        className: "marker-menu-search",
        ref: r,
        value: i,
        onValueChange: (f) => s(f),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(nr, { children: [
      /* @__PURE__ */ o(or, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ge, { children: u.map((f) => /* @__PURE__ */ o(
        $r,
        {
          item: f,
          localizedStrings: t
        },
        he(f)
      )) }),
      d.length > 0 && /* @__PURE__ */ m(ht, { children: [
        u.length > 0 && /* @__PURE__ */ o(Ue, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ge, { children: d.map((f) => /* @__PURE__ */ o(
          $r,
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
function Ns(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const i = ue[n], s = i != null && i.children ? i : a && ue[a];
  if (!s || !s.children) return [];
  const l = [];
  return Object.entries(s.children).forEach(([, u]) => {
    l.push(
      ...u.map((d) => ({
        marker: d,
        title: r[ue[d].description] ?? ue[d].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(d), e();
        }
      }))
    );
  }), l.sort((u, d) => (u.marker ?? u.title).localeCompare(d.marker ?? d.title));
}
function Kr(t) {
  if (!t || !Vt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function vs(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function ys(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function xs(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function Ss(t, e) {
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
      const l = s.insert.slice(n), u = Math.min(l.length, i.length);
      if (l.slice(0, u) !== i.slice(0, u)) return !1;
      i = i.slice(u), n += u, n === s.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function ks(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Cs(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Es = 300, Re = "*", Is = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Nl({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: u,
  parentEditorRef: d,
  inline: f = !1,
  ref: N,
  initialCaretPosition: x,
  markerPalette: w,
  onNoteEdit: v
}) {
  var Ir;
  const p = E(null), S = E(null), P = E(null), j = E(i);
  F(() => {
    j.current = i;
  }, [i]);
  const J = E(x);
  F(() => {
    J.current = x;
  }, [x]);
  const C = T(() => {
    var b, y;
    const c = J.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (y = p.current) == null || y.selectNote(0);
  }, []);
  de(() => {
    if (f || !P.current) return;
    const c = parseFloat(getComputedStyle(P.current).width);
    c > 0 && (P.current.style.width = `${c}px`);
  }, [f]);
  const [O, G] = R("generated"), [K, M] = R("generated"), [q, ct] = R(Re), [pt, Tt] = R(Re), [W, Rt] = R("f"), [Ft, Lt] = R(!1), [U, at] = R(!0), [et, dt] = R(!1), At = E(!1), Bt = E(""), g = E(!1), A = E(void 0), $ = E([]), Q = E([]), V = E(void 0), X = E(void 0), wr = T(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && ($.current = [...$.current, ...c], V.current = void 0);
  }, []), pr = T(
    (c, b) => {
      var _, I;
      if (!c) return;
      const y = Kr(c), k = Kr(b);
      if (!y && k) {
        V.current = {
          text: $.current,
          closedNoteOp: c,
          openNoteOp: b
        }, $.current = [];
        return;
      }
      const L = V.current;
      L && (y && !k && Gt(c, L.openNoteOp) && Gt(b, L.closedNoteOp) && !((I = (_ = p.current) == null ? void 0 : _.getOpsAfterNote(0)) != null && I.length) ? ($.current = L.text, V.current = void 0) : Gt(b, L.openNoteOp) || (V.current = void 0));
    },
    []
  ), [Ct, oe] = R(!1), Ie = ls(), [mr, Ln] = R(), hr = E(null), yt = E(
    void 0
  ), An = E(0), gr = E(w);
  F(() => {
    gr.current = w;
  }, [w]), F(
    () => () => {
      var c;
      yt.current && (yt.current = void 0, (c = gr.current) == null || c.dismiss());
    },
    []
  );
  const ae = E(void 0), _e = E(void 0), se = T(
    () => Wa(
      _e.current,
      yn(
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
  ), { setSession: br, clearSessionIfCurrent: ie } = ts({
    sessionRef: yt,
    editorRef: p,
    baselineRef: _e
  }), $t = T(() => {
    var b, y, k, L;
    if ((b = p.current) != null && b.getSelection() || (y = p.current) != null && y.getSelectedParaMarker()) return;
    const c = ae.current;
    c ? (k = p.current) == null || k.setSelection(c) : (L = p.current) == null || L.selectNote(0);
  }, []), le = T(() => {
    var c;
    $t(), (c = p.current) == null || c.focus();
  }, [$t]), Mt = it(
    () => ({
      ...s,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: {
        ...s.view ?? To(),
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
    [s, l]
  ), Te = it(
    () => Ns(
      p,
      () => oe(!1),
      u,
      mr,
      W
    ),
    [u, mr, W]
  );
  F(() => {
    var c;
    Ct || (c = p.current) == null || c.focus();
  }, [W, Ct]);
  const Ot = T(() => {
    var k, L, _;
    const c = (k = S.current) == null ? void 0 : k.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), y = (_ = (L = S.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : _.anchorNode;
    return !!b && !!y && b.contains(y);
  }, []), jt = T(
    (c = !1) => {
      var y, k, L, _, I;
      v == null || v();
      const b = (k = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : k.at(0);
      if (b && Vt("note", b) && (r == null || r([b]), c && d && j.current)) {
        const z = [
          ...$.current,
          ...((L = p.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], D = Q.current, mt = !Gt(z, D);
        if (f && !mt && Gt(b, A.current))
          return;
        A.current = b;
        const Y = [b];
        mt && (D.length > 0 && Ss(
          ((_ = d.current) == null ? void 0 : _.getOpsAfterNote(j.current)) ?? [],
          D
        ) && Y.push({ delete: xs(D) }), Y.push(...z), Q.current = z), (I = d.current) == null || I.replaceEmbedUpdate(j.current, Y);
      }
    },
    [f, r, v, d]
  ), Le = T(
    (c) => {
      var y, k, L;
      const b = (y = p.current) == null ? void 0 : y.getSelection();
      (k = p.current) == null || k.applyUpdate([c, { delete: 1 }]), b && ((L = p.current) == null || L.setSelection(b)), le();
    },
    [le]
  ), Nr = T(
    (c, b) => {
      var L, _, I;
      yt.current || (L = p.current) == null || L.commitPendingMarkerEdits();
      const y = (I = (_ = p.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
      if (!y || !Vt("note", y) || !y.insert.note) return;
      let k;
      c === "custom" ? k = b : c === "generated" ? k = Ge : k = ze, y.insert.note.caller !== k && (y.insert.note.caller = k, Le(y));
    },
    [Le]
  ), Kt = E(void 0), Ae = E(jt);
  F(() => {
    Ae.current = jt;
  }, [jt]);
  const qt = T(() => {
    Kt.current !== void 0 && (clearTimeout(Kt.current), Kt.current = void 0);
  }, []), xt = T(() => {
    Kt.current !== void 0 && (qt(), Ae.current(!0));
  }, [qt]), vr = T(() => {
    qt(), Kt.current = setTimeout(() => {
      Kt.current = void 0, Ae.current(!0);
    }, Es);
  }, [qt]);
  F(() => {
    var L, _;
    let c, b, y;
    At.current = !1, g.current = !1, ae.current = void 0, at(!0);
    const k = e == null ? void 0 : e.at(0);
    if (A.current = k, $.current = [], Q.current = [], V.current = void 0, X.current = void 0, k && Vt("note", k)) {
      const I = (L = k.insert.note) == null ? void 0 : L.caller;
      let z = "custom";
      I === Ge ? z = "generated" : I === ze && (z = "hidden");
      const D = z === "custom" && I !== void 0 ? I : Re;
      ct(D), Tt(D), G(z), M(z), Rt(((_ = k.insert.note) == null ? void 0 : _.style) ?? "f"), c = setTimeout(() => {
        var Y, st, ut, St;
        const mt = (st = (Y = p.current) == null ? void 0 : Y.getNoteOps(0)) == null ? void 0 : st.at(0);
        (ut = p.current) == null || ut.applyUpdate(mt ? [k, { delete: 1 }] : [k]), C(), (St = p.current) == null || St.focus(), b = requestAnimationFrame(() => {
          y = setTimeout(() => {
            var kt;
            Ot() || (C(), (kt = p.current) == null || kt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      xt(), J.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), y !== void 0 && clearTimeout(y);
    };
  }, [e, xt, Ot, C]), de(() => () => xt(), [xt]);
  const yr = T(() => {
    var c;
    g.current && (yt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), xt());
  }, [xt]);
  Kn(
    N,
    () => ({
      flushPendingEdits: yr,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = P.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [yr]
  );
  const Me = T(() => {
    var c, b;
    if (!yt.current) {
      const y = (c = S.current) == null ? void 0 : c.querySelector(".editor-input");
      y != null && y.contains(y.ownerDocument.activeElement) && y.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    f ? xt() : (qt(), jt(!0)), n();
  }, [qt, xt, f, n, jt]), Oe = E(Me);
  de(() => {
    Oe.current = Me;
  });
  const De = E({ book: a.book, chapterNum: a.chapterNum });
  de(() => {
    (De.current.book !== a.book || De.current.chapterNum !== a.chapterNum) && (De.current = { book: a.book, chapterNum: a.chapterNum }, Oe.current());
  }, [a.book, a.chapterNum]);
  const Mn = () => {
    var _;
    const c = p.current, b = vs(c == null ? void 0 : c.getUsj());
    if (!c || !b) return;
    const y = ((_ = S.current) == null ? void 0 : _.ownerDocument) ?? document, { activeElement: k } = y, L = c.getSelection() ?? ae.current;
    c.setSelection(b);
    try {
      c.copy();
    } finally {
      L ? c.setSelection(L) : c.selectNote(0), c.getSelection(), y.activeElement !== k && (k instanceof HTMLElement && k !== y.body ? k.focus({ preventScroll: !0 }) : y.activeElement instanceof HTMLElement && y.activeElement.blur());
    }
  }, On = T(
    (c, b) => {
      v == null || v(), G(c), ct(b), Nr(c, b), f && xt();
    },
    [Nr, xt, f, v]
  ), Dn = (c) => {
    var y, k, L, _, I;
    Rt(c), yt.current || (y = p.current) == null || y.commitPendingMarkerEdits();
    const b = (L = (k = p.current) == null ? void 0 : k.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (b && Vt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const z = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
      W !== "x" && c === "x" ? z == null || z.forEach((D) => ks(D)) : W === "x" && c !== "x" && (z == null || z.forEach((D) => Cs(D))), Le(b), f && xt();
    }
  }, Pn = (c) => {
    Ln(c.contextMarker), dt(c.canRedo);
  }, Rn = T(
    (c) => {
      var y, k, L, _, I, z, D;
      const b = (k = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : k.at(0);
      if (b && Vt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (L = b.insert.note) == null ? void 0 : L.style, Y = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
        if (mt || Lt(!1), Lt(
          mt === "x" ? !!(Y != null && Y.every((st) => {
            var St, kt;
            if (!((St = st.attributes) != null && St.char)) return !0;
            const ut = ((kt = st.attributes) == null ? void 0 : kt.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(Y != null && Y.every((st) => {
            var St, kt;
            if (!((St = st.attributes) != null && St.char)) return !0;
            const ut = ((kt = st.attributes) == null ? void 0 : kt.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !At.current) {
          At.current = !0, Bt.current = JSON.stringify(b), X.current = b, at(!0);
          return;
        }
        g.current = !0, pr(X.current, b), X.current = b, (D = (z = p.current) == null ? void 0 : z.getOpsAfterNote(0)) != null && D.length && setTimeout(wr, 0), at(JSON.stringify(b) === Bt.current), jt(), f && vr();
      } else
        Lt(!1), at(!0);
    },
    [
      f,
      jt,
      vr,
      pr,
      wr
    ]
  ), xr = T(() => {
    const c = window.getSelection();
    if (!Te.length || !c || c.rangeCount === 0)
      return;
    const b = S.current;
    if (!b) return;
    const y = c.getRangeAt(0).cloneRange();
    Ie.setSource({
      measure: () => {
        const k = cs(y);
        return k && ds(k);
      },
      contextElement: b
    }), oe(!0);
  }, [Te, Ie]), Pe = E(() => {
  }), Sr = T(
    (c, b, y) => {
      const { anchorRect: k } = c;
      if (!w || !k) return;
      const { hasTextSelection: L } = y;
      Xa({
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
        isNoteMarker: (_) => Ha(Mt.styleInfo ?? Lr, _),
        sessionCounterRef: An,
        setSession: br,
        clearSessionIfCurrent: ie,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (_) => Pe.current(_),
        show: (_) => w.show({
          items: b.map(ys),
          anchor: k,
          keyForwarding: _
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: $t,
        hasEditorChangedSinceFocus: se,
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
          (!en(_) || _.code !== rn) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Po(_)}`
          );
        }
      });
    },
    [
      w,
      $t,
      se,
      Mt.styleInfo,
      br,
      ie
    ]
  ), ce = T(() => {
    var y;
    const c = (y = p.current) == null ? void 0 : y.getMarkerMenuContext();
    if (!c) return !1;
    const b = Lo(Mt.styleInfo ?? Lr, c);
    return b.length === 0 ? !1 : (Sr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [Sr, Mt.styleInfo]);
  Ya({
    isSessionOpen: T(() => !!yt.current, []),
    dismiss: T(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const kr = T(
    (c) => {
      if (!w) return;
      Za(c, {
        sessionRef: yt,
        editorRef: p,
        palette: w,
        restoreCaret: $t,
        reopenAtCaret: ce,
        clearSessionIfCurrent: ie,
        hasEditorChangedSinceFocus: se
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      ce,
      $t,
      ie,
      se
    ]
  );
  F(() => {
    Pe.current = kr;
  }, [kr]), Qa({
    containerRef: S,
    editorRef: p,
    selectionRef: ae,
    baselineRef: _e,
    isSessionOpen: T(() => !!yt.current, [])
  }), F(() => {
    const c = () => {
      Ct && oe(!1);
    };
    return window.addEventListener("click", c), window.addEventListener("blur", c), () => {
      window.removeEventListener("click", c), window.removeEventListener("blur", c);
    };
  }, [Ct]), F(() => {
    var c;
    Ct && ((c = hr.current) == null || c.focus());
  }, [Ct]), F(() => {
    var _;
    const c = () => {
      var I;
      return ((I = S.current) == null ? void 0 : I.querySelector(".editor-input")) ?? void 0;
    };
    if (((_ = Mt.view) == null ? void 0 : _.markerMode) === "editable") {
      const I = (D) => {
        var st, ut, St, kt;
        if (me(D)) return;
        const mt = yt.current, Y = c();
        if (!(!Y || document.activeElement !== Y)) {
          if (mt && w) {
            Pe.current(D);
            return;
          }
          if (Fr(S.current)) {
            D.key === l && (D.preventDefault(), D.stopPropagation());
            return;
          }
          if (D.key === "Enter" && !Ot()) {
            D.preventDefault(), D.stopPropagation(), (st = p.current) == null || st.selectNote(0), (ut = p.current) == null || ut.focus();
            return;
          }
          if (w && D.key === l) {
            if (!Ot()) {
              D.preventDefault(), D.stopPropagation(), (St = p.current) == null || St.selectNote(0), (kt = p.current) == null || kt.focus();
              return;
            }
            ce() && (D.preventDefault(), D.stopPropagation());
          }
        }
      }, z = () => {
        var mt, Y;
        const D = c();
        !D || document.activeElement !== D || Ot() || ((mt = p.current) == null || mt.selectNote(0), (Y = p.current) == null || Y.focus());
      };
      return document.addEventListener("keydown", I, { capture: !0 }), document.addEventListener("paste", z, { capture: !0 }), () => {
        document.removeEventListener("keydown", I, { capture: !0 }), document.removeEventListener("paste", z, { capture: !0 });
      };
    }
    const b = () => {
      const I = c();
      return !I || document.activeElement !== I ? !1 : !Fr(S.current);
    }, y = (I) => {
      I.key !== "Enter" || me(I) || b() && (I.preventDefault(), I.stopPropagation());
    }, k = (I) => {
      I.inputType !== "insertParagraph" && I.inputType !== "insertLineBreak" || b() && (I.preventDefault(), I.stopPropagation());
    }, L = (I) => {
      const z = c();
      !Ct && z && document.activeElement === z && I.key === l ? (I.preventDefault(), xr()) : Ct && I.key === "Escape" && (I.preventDefault(), oe(!1));
    };
    return document.addEventListener("keydown", L), document.addEventListener("keydown", y, { capture: !0 }), document.addEventListener("beforeinput", k, { capture: !0 }), () => {
      document.removeEventListener("keydown", L), document.removeEventListener("keydown", y, { capture: !0 }), document.removeEventListener("beforeinput", k, { capture: !0 });
    };
  }, [
    Ct,
    xr,
    l,
    (Ir = Mt.view) == null ? void 0 : Ir.markerMode,
    Mt.styleInfo,
    w,
    ce,
    Ot
  ]), F(() => {
    const c = P.current;
    if (!f || !c) return;
    const b = (y) => {
      y.key !== "Escape" || y.defaultPrevented || me(y) || (y.preventDefault(), y.stopPropagation(), Oe.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [f]), F(() => {
    const c = () => {
      var k, L, _;
      const b = ((k = S.current) == null ? void 0 : k.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const y = document.getSelection();
      y && !y.isCollapsed || Ot() || ((L = p.current) == null || L.selectNote(0), (_ = p.current) == null || _.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [Ot]);
  const Cr = u["%footnoteEditor_copyButton_tooltip%"], Er = /* @__PURE__ */ o(
    ss,
    {
      onUndoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.undo();
      },
      onRedoClick: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.redo();
      },
      canUndo: !U,
      canRedo: et,
      localizedStrings: u
    }
  );
  return /* @__PURE__ */ m(ht, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: P,
        className: h("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: h("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                ms,
                {
                  isTypeSwitchable: Ft,
                  noteType: W,
                  handleNoteTypeChange: Dn,
                  localizedStrings: u,
                  focusNoteText: le
                }
              ),
              /* @__PURE__ */ o(
                fs,
                {
                  callerType: O,
                  customCaller: q,
                  updateCaller: On,
                  localizedStrings: u,
                  focusNoteText: le
                }
              ),
              f && Er
            ] }),
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(sr, { children: [
              Er,
              /* @__PURE__ */ o(
                Ma,
                {
                  onCancelClick: n,
                  onAcceptClick: Me,
                  canAccept: !U || K !== O || O === "custom" && q !== pt,
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
                  is,
                  {
                    editorRef: p,
                    canUndo: !U,
                    canRedo: et,
                    children: /* @__PURE__ */ o(
                      Ao,
                      {
                        options: Mt,
                        onStateChange: Pn,
                        onUsjChange: Rn,
                        defaultUsj: Is,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(gt, { children: [
                  /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(
                    Z,
                    {
                      "aria-label": Cr,
                      onClick: Mn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Xn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(Nt, { children: /* @__PURE__ */ o("p", { children: Cr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(ir, { open: Ct, children: [
      /* @__PURE__ */ o(ba, { virtualRef: Ie.virtualRef }),
      /* @__PURE__ */ o(
        lr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            bs,
            {
              markerMenuItems: Te,
              localizedStrings: u,
              searchRef: hr
            }
          )
        }
      )
    ] })
  ] });
}
const _s = {
  "refresh-cw": xo,
  download: yo,
  house: vo,
  "book-a": No,
  settings: bo,
  "circle-question-mark": go,
  "external-link": ho,
  users: mo,
  "book-copy": po,
  pencil: wo,
  eye: fo,
  "zoom-in": uo,
  "zoom-out": co,
  scan: lo,
  "file-text": io,
  "panel-bottom": so,
  "message-square-plus": ao,
  "square-function": Ze,
  "square-x": Xe,
  "square-sigma": Ye,
  book: oo,
  "book-marked": no,
  "book-open": ro,
  library: eo,
  search: Qr,
  "message-square": to,
  "circle-check-big": Qn,
  "clipboard-check": Yn,
  sparkles: Zn
}, cr = _s, vl = Object.keys(cr);
function dr(t) {
  return t !== void 0 && Object.hasOwn(cr, t);
}
function Ts(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Ls(t, e) {
  return Object.entries(t).filter(([r, n]) => Sn(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function xn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function Sn(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function As(t) {
  const e = new Set(t.items.map((n) => n.group)), r = Object.entries(t.groups).filter(
    ([n]) => e.has(n)
  );
  return xn(t.columns).filter(
    ({ columnKey: n }) => r.some(
      ([a, i]) => Sn(a, i, n)
    )
  ).map(({ columnKey: n, column: a }) => ({
    columnKey: n,
    label: a.label,
    isHeaderHidden: a.isHeaderHidden ?? !1
  }));
}
function kn(t) {
  return t.some(
    (e) => dr(e.iconNameBefore) || e.iconPathBefore || e.checked !== void 0
  ) ? "icon" : "none";
}
function Ms(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: n, items: a }) => {
    if (a.length === 0) return [];
    const i = r ? [e(n)] : [];
    return r = !0, [...i, ...a];
  });
}
function Cn(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((n) => n.group === r).sort((n, a) => n.order - a.order).map(
      (n) => "command" in n ? { item: n } : {
        item: n,
        subGroups: Cn(
          t,
          Ts(t.groups, n.id)
        )
      }
    )
  }));
}
function Os(t) {
  return t ? {
    columns: xn(t.columns).map((e) => ({
      ...e,
      groups: Cn(t, Ls(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function Ds(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = lt(r.projectId), a = e.get(n), i = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((s) => s.scrollGroupId === r.scrollGroupId) || a.push(i) : e.set(n, [i]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function qr(t, e, r) {
  const n = lt(e);
  return t.some(
    (a) => lt(a.projectId) === n && a.scrollGroupId === r
  );
}
function Be(t) {
  const e = Ds(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : lt(t.selection.projectId);
    return t.projects.map((i) => {
      const s = e.get(lt(i.id)) ?? [];
      return {
        rowKey: i.id,
        projectId: i.id,
        shortName: i.shortName,
        fullName: i.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: s.map((l) => l.scrollGroupId),
        isSelected: a !== void 0 && a === lt(i.id),
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
    const i = e.get(lt(a.id));
    if (!i || i.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: qr(r, a.id, void 0),
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
        isSelected: qr(r, a.id, s.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const i = lt(a.projectId);
    if (n.some(
      (l) => lt(l.projectId) === i && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const s = t.projects.find((l) => lt(l.id) === i);
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
const ur = "Selected", fr = "Unselected";
function Vr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function Ht(t, e) {
  const r = Ro(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function qe(t) {
  return [{ kind: "flat", rows: [...t].sort(Ht) }];
}
function Ps(t) {
  const e = t.filter(Vr).sort(Ht), r = t.filter((a) => !Vr(a)).sort(Ht);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function Rs(t, e) {
  const r = t.filter((s) => s.isSelected).sort(Ht), n = t.filter((s) => !s.isSelected).sort(Ht), a = (s, l) => {
    var d;
    const u = (d = e.getSectionHeading) == null ? void 0 : d.call(
      e,
      s,
      l.map((f) => f.project)
    );
    return typeof u == "string" && u.length > 0 ? u : s === "selected" ? ur : fr;
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
function Bs(t, e) {
  if (e.id === "openTabs") return Ps(t);
  if (e.id === "selection") return Rs(t, e);
  if (!e.getGroupKey) return qe(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((l) => {
    const u = a(l.project);
    if (u === void 0 || u === "") {
      n.push(l);
      return;
    }
    const d = r.get(u);
    d ? d.push(l) : r.set(u, [l]);
  });
  const i = [...r.entries()].map(([l, u]) => {
    var N;
    const d = [...u].sort(
      (x, w) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, w.project)) || Ht(x, w);
      }
    ), f = ((N = e.getSectionHeading) == null ? void 0 : N.call(
      e,
      l,
      d.map((x) => x.project)
    )) ?? l;
    return { key: l, heading: f, rows: d };
  });
  i.sort((l, u) => l.key === e.priorityKey ? -1 : u.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: l.key, heading: l.heading },
    { key: u.key, heading: u.heading }
  ) : l.heading.localeCompare(u.heading, void 0, { sensitivity: "base" }));
  const s = i.map(({ key: l, heading: u, rows: d }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: l,
    label: u,
    rows: d,
    isPriority: l === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && s.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(Ht)
  }), s;
}
const yl = [
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
  if (!(typeof r != "string" || !gn(r)))
    return r;
}
const fe = "recent", js = "other";
function En(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Gs(t) {
  const e = t ?? {};
  return [
    En(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Xt.lastUsedAt]) == "number" ? fe : js;
      },
      getSectionHeading: (r) => r === fe ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (r, n) => r.key === fe ? -1 : n.key === fe ? 1 : 0
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
          (l) => {
            var u;
            return typeof ((u = l.customData) == null ? void 0 : u[Xt.typeName]) == "string";
          }
        ), i = (s = a == null ? void 0 : a.customData) == null ? void 0 : s[Xt.typeName];
        return typeof i == "string" && i.length > 0 ? i : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const xl = Gs();
function zs(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? ur : e.unselectedSectionHeading ?? fr
  };
}
function Sl(t) {
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
function kl(t) {
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
const Hs = 100, nt = {
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
  autoSelectionSelectedSectionHeading: ur,
  autoSelectionUnselectedSectionHeading: fr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Us(t) {
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
function Cl(t) {
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
function Qt(t) {
  return ia[Bo(t)] ?? String(t);
}
const Jr = "platform.footerAction", Fs = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function $s({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    be,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Fs,
      children: r
    }
  ) : /* @__PURE__ */ o(be, { variant: "secondary", children: r });
}
function Ks({
  row: t,
  mode: e,
  strings: r,
  onClick: n,
  onOpen: a,
  selectedRowRef: i,
  indicator: s,
  reserveIndicatorSlot: l
}) {
  const {
    ref: u,
    open: d,
    onPointerEnter: f,
    onPointerLeave: N
  } = xa(), [x, w] = R(!1), v = Wr(), p = t.isDisabled && !!t.disabledReason, S = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(s != null && s.label) || p, P = d || x, j = T(() => {
    if (S) {
      w(!0);
      return;
    }
    f();
  }, [S, f]), J = T(() => {
    w(!1), N();
  }, [N]), C = /* @__PURE__ */ o(Ne, { className: h("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let O;
  e === "project" ? t.openGroups.length > 0 && (O = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((q) => /* @__PURE__ */ o(be, { variant: "secondary", children: Qt(q) }, q)) })) : t.scrollGroupId !== void 0 && (O = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      $s,
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
        onClick: (q) => {
          q.stopPropagation(), a(t);
        },
        onMouseDown: (q) => q.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(ko, { className: "tw:h-3 tw:w-3" }),
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
      onPointerLeave: J,
      ...p && { "aria-describedby": v },
      className: h(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: C }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: s == null ? void 0 : s.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              jo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        O,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), K = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, M = t.isBoundButClosed && K ? r.boundButClosedTooltip.replace("{group}", K) : void 0;
  return /* @__PURE__ */ m(gt, { open: P, delayDuration: 400, children: [
    /* @__PURE__ */ o(bt, { asChild: !0, children: G }),
    /* @__PURE__ */ m(
      Nt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: nn(t) }),
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
function qs({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Wt;
  return /* @__PURE__ */ m(te, { children: [
    /* @__PURE__ */ m(gt, { children: [
      /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o(ee, { asChild: !0, children: /* @__PURE__ */ o(
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
          onMouseDown: (i) => i.preventDefault(),
          children: /* @__PURE__ */ o(So, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(Nt, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      re,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ve },
        children: [
          /* @__PURE__ */ o(Ce, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(Ia, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(jr, { value: Wt, children: n.groupByNone }),
            /* @__PURE__ */ o(ne, {}),
            t.map((i) => /* @__PURE__ */ o(jr, { value: i.id, children: i.label }, i.id))
          ] })
        ]
      }
    )
  ] });
}
function Vs(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Wt) return Wt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Wt;
}
function El(t) {
  const [e, r] = R(!1), [n, a] = R(""), i = it(() => Us(t.localizedStrings), [t.localizedStrings]), s = it(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(En(i.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      zs({
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
  ]), [l, u] = R(void 0), d = it(
    () => Vs(s, t.defaultGrouping),
    [s, t.defaultGrouping]
  ), f = l ?? d, N = E(null), [x, w] = R(void 0), v = T((g) => {
    r(g), g || (a(""), w(void 0));
  }, []);
  F(() => {
    if (!e) return;
    const g = window.requestAnimationFrame(() => {
      const A = N.current;
      A && A.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(g);
  }, [e]);
  const p = it(() => t.mode === "project" ? Be({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Be({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Be({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), S = it(() => {
    const g = n.trim().toLowerCase();
    return g ? p.filter(
      (A) => A.shortName.toLowerCase().includes(g) || (A.fullName ?? "").toLowerCase().includes(g)
    ) : p;
  }, [p, n]), P = it(
    () => new Map(t.projects.map((g) => [lt(g.id), g])),
    [t.projects]
  ), j = T(
    (g) => g === void 0 ? void 0 : P.get(lt(g)),
    [P]
  ), { renderProjectIndicator: J } = t, C = T(
    (g) => J ? J(g.project) : void 0,
    [J]
  ), O = !!J, G = !!t.footerAction && S.length === 0, K = it(() => {
    if (f === Wt) return qe(S);
    const g = s.find((A) => A.id === f);
    return g ? Bs(S, g) : qe(S);
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
        const A = t.selection.pairs, $ = lt(g.projectId), Q = (X) => lt(X.projectId) === $ && X.scrollGroupId === g.scrollGroupId, V = A.some(Q) ? A.filter((X) => !Q(X)) : [
          ...A.filter((X) => !Q(X)),
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
        const A = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: g.projectId, scrollGroupId: A }), t.onOpenProjectInGroup(g.projectId, A), r(!1);
      }
    }
  }, ct = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, pt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, W = it(() => {
    switch (t.mode) {
      case "project": {
        const g = j(t.selection.projectId);
        if (pt)
          return { node: pt(g), title: "", hasSelection: !!g };
        let A = g ? g.shortName : i.buttonPlaceholder;
        return g && Tt === "shortNameAndFullName" && (A = nn(g)), { node: A, title: A, hasSelection: !!g };
      }
      case "project-multi": {
        const { pairs: g } = t.selection;
        if (g.length === 0) {
          const V = i.buttonPlaceholder;
          return { node: V, title: V, hasSelection: !1 };
        }
        const A = [];
        if (g.forEach((V) => {
          const X = j(V.projectId);
          X && A.push({ project: X, scrollGroupId: V.scrollGroupId });
        }), A.length === 0) {
          const V = i.buttonPlaceholder;
          return { node: V, title: V, hasSelection: !1 };
        }
        const $ = A.map(
          ({ project: V, scrollGroupId: X }) => X === void 0 ? V.shortName : `${V.shortName} (${Qt(X)})`
        ).join(", "), Q = A.length.toString();
        return {
          node: /* @__PURE__ */ m(ht, { children: [
            /* @__PURE__ */ o(be, { variant: "muted", className: "tw:shrink-0", children: Q }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: $ })
          ] }),
          title: `${Q} ${$}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = j(t.selection.projectId);
        if (!g) {
          const Q = i.buttonPlaceholder;
          return { node: Q, title: Q, hasSelection: !1 };
        }
        const A = t.selection.scrollGroupId;
        if (A === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const $ = Qt(A);
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
    pt,
    Tt,
    i.buttonPlaceholder
  ]), Rt = E(null), [Ft, Lt] = R(!1);
  F(() => {
    const g = Rt.current;
    if (!g) return;
    const A = (Q) => {
      Lt(Q < Hs);
    };
    if (A(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const $ = new ResizeObserver((Q) => {
      Q.forEach((V) => {
        const [X] = V.borderBoxSize;
        A(X ? X.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return $.observe(g, { box: "border-box" }), () => $.disconnect();
  }, []);
  let U;
  t.isLoading ? U = /* @__PURE__ */ o(Co, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ft ? U = void 0 : t.mode === "project-multi" ? U = /* @__PURE__ */ o(Yr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : U = /* @__PURE__ */ o(Eo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? M : void 0, et = i.ariaLabel && W.hasSelection && W.title ? `${i.ariaLabel}: ${W.accessibleTitle ?? W.title}` : i.ariaLabel || void 0, dt = /* @__PURE__ */ m(
    Z,
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": et,
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof W.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: W.node }) : W.node }),
        U
      ]
    }
  ), At = W.title ? /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(gt, { children: [
    /* @__PURE__ */ o(bt, { asChild: !0, children: /* @__PURE__ */ o($e, { asChild: !0, children: dt }) }),
    /* @__PURE__ */ o(Nt, { dir: "auto", children: W.title })
  ] }) }) : /* @__PURE__ */ o($e, { asChild: !0, children: dt }), Bt = s.length > 1;
  return /* @__PURE__ */ m(ir, { open: e, onOpenChange: v, children: [
    At,
    /* @__PURE__ */ o(
      lr,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(
          er,
          {
            shouldFilter: !1,
            value: G ? x ?? Jr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  rr,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: i.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  qs,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: ct, children: `${i.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(nr, { children: [
                /* @__PURE__ */ o(or, { children: i.commandEmptyMessage }),
                K.map((g, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    We,
                    {
                      children: [
                        /* @__PURE__ */ o(ge, { heading: Js(g, i), children: g.rows.map(($) => /* @__PURE__ */ o(
                          Ks,
                          {
                            row: $,
                            mode: t.mode,
                            strings: i,
                            onClick: q,
                            onOpen: at,
                            selectedRowRef: N,
                            indicator: C($),
                            reserveIndicatorSlot: O
                          },
                          $.rowKey
                        )) }),
                        A < K.length - 1 && /* @__PURE__ */ o(Ue, { alwaysRender: !0 })
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
                    Ue,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ m(
                    ye,
                    {
                      forceMount: !0,
                      value: Jr,
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
function Js(t, e) {
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
const Ws = Xr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: i = !1, id: s }, l) => {
    const u = vt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: s,
        className: h("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            Qr,
            {
              className: h(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            ln,
            {
              ref: l,
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
            Z,
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
                /* @__PURE__ */ o(Zr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Ws.displayName = "SearchBar";
const Xs = 5;
function Il(t) {
  return sa(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function Zs(t, e) {
  return t.filter((r) => {
    try {
      return Go(r) === e;
    } catch {
      return !1;
    }
  });
}
const _l = (t, e, r) => Zs(t, e).every((n) => r.includes(n));
function Ys(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => la(n, e));
}
function Tl(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), i = new Set(e.map((l) => l.toUpperCase()));
  if (i.size > 0 && i.size === a.size && [...i].every((l) => a.has(l)))
    return r;
  const s = Ys(t, n);
  if (s.length !== 0)
    return s.length <= Xs ? s.join(", ") : `${s[0]} - ${s[s.length - 1]}`;
}
function Qs({ name: t, className: e }) {
  const r = dr(t) ? cr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: h("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function we({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const i = n ? "tw:me-2" : "tw:ms-2";
  if (dr(e)) return /* @__PURE__ */ o(Qs, { name: e, className: i });
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
const ti = (t) => en(t) && (t.code === zo || t.code === Ho || t.code === rn), ei = (t) => /* @__PURE__ */ o(ne, {}, `separator-${t}`), In = (t) => ({ ...t, checked: void 0 }), _n = (t, e, r, n) => t.map(({ groupKey: a, items: i }) => ({
  groupKey: a,
  items: i.map(({ item: s, subGroups: l = [] }) => {
    if ("command" in s) {
      const d = /* @__PURE__ */ m(ht, { children: [
        /* @__PURE__ */ o(
          we,
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
          we,
          {
            iconName: s.iconNameAfter,
            icon: s.iconPathAfter,
            menuLabel: s.label
          }
        ),
        s.shortcut && /* @__PURE__ */ o(_a, { className: "tw:ps-4", children: /* @__PURE__ */ o(Ke, { hint: s.shortcut }) })
      ] }), f = () => {
        e(s);
      };
      return /* @__PURE__ */ m(gt, { children: [
        /* @__PURE__ */ o(bt, { asChild: !0, children: s.checked !== void 0 ? /* @__PURE__ */ o(
          zt,
          {
            checked: s.checked,
            disabled: s.disabled,
            onSelect: f,
            children: d
          },
          `dropdown-menu-item-${s.label}-${s.command}`
        ) : /* @__PURE__ */ o(
          Ea,
          {
            disabled: s.disabled,
            onSelect: f,
            children: d
          },
          `dropdown-menu-item-${s.label}-${s.command}`
        ) }),
        s.tooltip && /* @__PURE__ */ o(Nt, { children: s.tooltip })
      ] }, `tooltip-${s.label}-${s.command}`);
    }
    const u = /* @__PURE__ */ m(La, { disabled: s.disabled, children: [
      /* @__PURE__ */ o(
        we,
        {
          iconName: s.iconNameBefore,
          menuLabel: s.label,
          leading: !0,
          leadingSlot: r
        }
      ),
      s.label,
      /* @__PURE__ */ o(we, { iconName: s.iconNameAfter, menuLabel: s.label })
    ] });
    return /* @__PURE__ */ m(Ta, { children: [
      s.tooltip ? /* @__PURE__ */ m(gt, { children: [
        /* @__PURE__ */ o(bt, { asChild: !0, children: u }),
        /* @__PURE__ */ o(Nt, { children: s.tooltip })
      ] }) : u,
      /* @__PURE__ */ o(ka, { children: /* @__PURE__ */ o(Aa, { ...n, children: Ms(
        _n(
          l,
          e,
          kn(
            l.flatMap(
              (d) => d.items.map(({ item: f }) => In(f))
            )
          ),
          n
        ),
        ei
      ) }) })
    ] }, `dropdown-menu-sub-${s.label}-${s.id}`);
  })
}));
function Tn({
  onSelectMenuItem: t,
  menuData: e,
  showSectionHeadings: r = !1,
  submenuContentProps: n
}) {
  const a = Wr(), i = it(() => Os(e), [e]), s = As(e), l = r && s.length > 1, u = new Map(
    i.columns.map(({ columnKey: N, groups: x }) => [N, x])
  ), d = (N) => u.get(N) ?? [], f = kn(
    s.flatMap(
      ({ columnKey: N }) => d(N).flatMap(
        (x) => x.items.map(({ item: w }) => In(w))
      )
    )
  );
  return s.map(({ columnKey: N, label: x, isHeaderHidden: w }, v) => {
    const p = `${a}-${N}`;
    return /* @__PURE__ */ m(We, { children: [
      /* @__PURE__ */ m(Ca, { "aria-labelledby": l ? p : void 0, children: [
        l && // A section shown without its heading keeps it for assistive technology only
        /* @__PURE__ */ o(Ce, { id: p, className: w ? "tw:sr-only" : void 0, children: x }),
        /* @__PURE__ */ o(_t, { children: _n(
          d(N),
          t,
          f,
          n
        ).flatMap((S) => S.items) })
      ] }),
      v < s.length - 1 && /* @__PURE__ */ o(ne, {})
    ] }, N);
  });
}
function Ll({
  anchor: t,
  onClose: e,
  focusFirstItem: r = !1,
  contentProps: n,
  ...a
}) {
  const i = T(
    (s) => {
      !s || !r || requestAnimationFrame(
        () => {
          var l;
          return (l = s.querySelector('[role^="menuitem"]:not([data-disabled])')) == null ? void 0 : l.focus({ preventScroll: !0 });
        }
      );
    },
    [r]
  );
  return /* @__PURE__ */ m(
    te,
    {
      open: !0,
      modal: !1,
      onOpenChange: (s) => {
        s || e();
      },
      children: [
        /* @__PURE__ */ o(ee, { asChild: !0, children: /* @__PURE__ */ o(
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
          re,
          {
            ref: i,
            align: "start",
            side: "bottom",
            onCloseAutoFocus: (s) => s.preventDefault(),
            ...n,
            children: /* @__PURE__ */ o(Tn, { ...a })
          }
        )
      ]
    }
  );
}
function Al({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  showSectionHeadings: i = !1,
  openMenuInOverlay: s,
  variant: l,
  buttonVariant: u = "ghost",
  id: d
}) {
  Sa();
  const f = E(null), N = () => wa(f.current ?? void 0), [x, w] = R(!1), v = E(!1);
  if (s) {
    const p = async (S) => {
      const P = f.current;
      if (!P || x) return;
      const { x: j, y: J, width: C, height: O } = P.getBoundingClientRect();
      w(!0);
      let G;
      try {
        G = await s(e, {
          anchor: { x: j, y: J, width: C, height: O },
          focusFirstItem: S
        });
      } catch (K) {
        ti(K) || console.error("TabDropdownMenu: could not open the menu in the overlay", K);
      } finally {
        w(!1);
      }
      G && Pr() === "pointer" && Rr(P), G && t(G);
    };
    return /* @__PURE__ */ o(
      Z,
      {
        ref: f,
        id: d,
        "aria-label": r,
        "aria-haspopup": "menu",
        "aria-expanded": x,
        variant: u,
        size: "icon",
        className: h(Br, a),
        onPointerDown: () => {
          v.current = x;
        },
        onClick: (S) => {
          const P = S.detail === 0;
          !P && v.current || p(P);
        },
        onKeyDown: (S) => {
          N(), S.key === "ArrowDown" && (S.preventDefault(), p(!0));
        },
        onBlur: N,
        children: n ?? /* @__PURE__ */ o(_r, {})
      }
    );
  }
  return /* @__PURE__ */ m(te, { variant: l, children: [
    /* @__PURE__ */ o(ee, { "aria-label": r, className: a, asChild: !0, id: d, children: /* @__PURE__ */ o(
      Z,
      {
        ref: f,
        variant: u,
        size: "icon",
        className: Br,
        onKeyDown: N,
        onBlur: N,
        children: n ?? /* @__PURE__ */ o(_r, {})
      }
    ) }),
    /* @__PURE__ */ o(
      re,
      {
        align: "start",
        style: { zIndex: tr },
        onCloseAutoFocus: () => {
          Pr() === "pointer" && Rr(f.current ?? void 0);
        },
        children: /* @__PURE__ */ o(
          Tn,
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
function Ml({ message: t, id: e, className: r }) {
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
function ri({ className: t, ...e }) {
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
function ni({ className: t, ...e }) {
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
const oi = Pt(
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
function ai({
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
        oi({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Ol({ className: t, ...e }) {
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
function si({ className: t, ...e }) {
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
function ii({ className: t, ...e }) {
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
function Dl({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: i
}) {
  return /* @__PURE__ */ m(ri, { className: h(i), role: a, children: [
    /* @__PURE__ */ m(ni, { children: [
      /* @__PURE__ */ o(ai, { variant: "icon", children: n ?? /* @__PURE__ */ o(Io, {}) }),
      /* @__PURE__ */ o(si, { children: t })
    ] }),
    r && /* @__PURE__ */ o(ii, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const li = Xr(({ className: t, ...e }, r) => /* @__PURE__ */ o(_o, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
li.displayName = "Spinner";
const ci = Pt(
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
function Pl({
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
        ci({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Rl({ className: t, ...e }) {
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
function Bl({ className: t, ...e }) {
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
function jl({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Qe.Group,
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
function pe(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Gl({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    Qe.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: pe(t),
      minSize: pe(e),
      maxSize: pe(r),
      collapsedSize: pe(n),
      ...a
    }
  );
}
function zl({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Qe.Separator,
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
  qi as A,
  Z as B,
  ye as C,
  te as D,
  sr as E,
  mn as F,
  nr as G,
  or as H,
  el as I,
  nl as J,
  Li as K,
  Ji as L,
  Oi as M,
  Di as N,
  ji as O,
  Gi as P,
  Ri as Q,
  rl as R,
  Ee as S,
  _t as T,
  Ma as U,
  ol as V,
  be as W,
  pa as X,
  il as Y,
  sl as Z,
  ne as _,
  la as a,
  es as a$,
  ca as a0,
  tr as a1,
  fl as a2,
  pl as a3,
  ll as a4,
  cl as a5,
  wl as a6,
  dl as a7,
  Ca as a8,
  Ia as a9,
  Qo as aA,
  ea as aB,
  zr as aC,
  Pl as aD,
  Bl as aE,
  Rl as aF,
  Wi as aG,
  Mi as aH,
  Bi as aI,
  Yo as aJ,
  Zo as aK,
  Ai as aL,
  ka as aM,
  _a as aN,
  Ta as aO,
  Aa as aP,
  La as aQ,
  is as aR,
  ri as aS,
  ii as aT,
  si as aU,
  ni as aV,
  ai as aW,
  Ml as aX,
  Ol as aY,
  Nl as aZ,
  Es as a_,
  jr as aa,
  hl as ab,
  bl as ac,
  gl as ad,
  ln as ae,
  El as af,
  Ws as ag,
  Il as ah,
  Zs as ai,
  Ue as aj,
  $i as ak,
  _l as al,
  Xi as am,
  un as an,
  Pi as ao,
  ia as ap,
  Al as aq,
  bn as ar,
  Se as as,
  ke as at,
  wn as au,
  Os as av,
  Ms as aw,
  kn as ax,
  we as ay,
  Ke as az,
  Sa as b,
  Tl as b$,
  bs as b0,
  ba as b1,
  Qi as b2,
  Zi as b3,
  Yi as b4,
  zl as b5,
  Gl as b6,
  jl as b7,
  Dl as b8,
  li as b9,
  Ll as bA,
  vl as bB,
  Qs as bC,
  Wt as bD,
  nt as bE,
  yl as bF,
  Xo as bG,
  Sl as bH,
  Cl as bI,
  kl as bJ,
  yn as bK,
  Ja as bL,
  xl as bM,
  Ua as bN,
  qa as bO,
  Va as bP,
  Wa as bQ,
  Fr as bR,
  Ha as bS,
  Gs as bT,
  zs as bU,
  ys as bV,
  Ti as bW,
  Fa as bX,
  Za as bY,
  Xa as bZ,
  Et as b_,
  ml as ba,
  ul as bb,
  tl as bc,
  ss as bd,
  ve as be,
  _i as bf,
  Ii as bg,
  Wo as bh,
  Jo as bi,
  Ci as bj,
  ki as bk,
  Ei as bl,
  Si as bm,
  Pa as bn,
  ma as bo,
  on as bp,
  Sn as bq,
  cn as br,
  Kr as bs,
  al as bt,
  ds as bu,
  cs as bv,
  dn as bw,
  Ga as bx,
  ls as by,
  Ui as bz,
  h as c,
  Ya as c0,
  Qa as c1,
  ts as c2,
  gt as d,
  bt as e,
  Nt as f,
  Ki as g,
  Pr as h,
  ee as i,
  re as j,
  Ce as k,
  Ea as l,
  Hi as m,
  Vi as n,
  ge as o,
  vt as p,
  aa as q,
  rt as r,
  Fi as s,
  ir as t,
  xa as u,
  $e as v,
  lr as w,
  zi as x,
  er as y,
  rr as z
};
//# sourceMappingURL=resizable-a0jG5DvX.js.map
