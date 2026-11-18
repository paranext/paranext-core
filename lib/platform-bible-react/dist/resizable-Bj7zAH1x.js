import { jsx as o, jsxs as m, Fragment as kt } from "react/jsx-runtime";
import { Slot as Ve, Dialog as It, Separator as Dn, Popover as Zt, Tooltip as Vt, DropdownMenu as tt, Label as Pn, RadioGroup as je } from "radix-ui";
import { IconX as Rn, IconCheck as Je, IconSearch as Bn, IconChevronLeft as jn, IconChevronRight as Gn } from "@tabler/icons-react";
import { Canon as ot } from "@sillsdev/scripture";
import wt, { useRef as E, useEffect as U, useCallback as T, useState as P, createContext as zn, useContext as Hn, useMemo as it, Fragment as We, useLayoutEffect as de, useImperativeHandle as Un, useId as Wr, forwardRef as Xr } from "react";
import { X as Zr, Check as Ne, ChevronsUpDown as Yr, Star as Fn, Undo as $n, Redo as Kn, SquareX as Xe, FunctionSquare as Ze, SquareSigma as Ye, Ban as qn, Copy as Vn, Sparkles as Jn, ClipboardCheck as Wn, CircleCheckBig as Xn, MessageSquare as Zn, Search as Qr, Library as Yn, BookOpen as Qn, BookMarked as to, Book as eo, MessageSquarePlus as ro, PanelBottom as no, FileText as oo, Scan as ao, ZoomOut as so, ZoomIn as io, Eye as lo, Pencil as co, BookCopy as uo, Users as fo, ExternalLink as wo, CircleQuestionMark as po, Settings as mo, BookA as ho, House as go, Download as bo, RefreshCw as No, Group as vo, ArrowRight as yo, Loader2 as xo, ChevronDown as So, MenuIcon as _r, AlertTriangle as ko, LoaderCircle as Co } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Tr, GENERATOR_NOTE_CALLER as Ge, HIDDEN_NOTE_CALLER as ze, isInsertEmbedOpOfType as qt, getDefaultViewOptions as Eo, getMarkerMenuItems as Io, defaultStyleInfo as Lr, Editorial as _o } from "@eten-tech-foundation/platform-editor";
import { Section as Dt, MODIFIER_KEYS as To, split as tn, slice as Lo, formatReplacementString as Ao, usfmMarkers as ue, deepEqual as Gt, isPlatformError as Mo, ABORTED as Oo, getErrorMessage as Do, normalizeProjectId as lt, compareProjectsByName as Po, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Xt, formatProjectName as en, getLocalizeKeyForScrollGroupId as Ro, hasDistinctFullName as Bo, getSectionForBook as jo } from "platform-bible-utils";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Qe from "react-resizable-panels";
import { clsx as Go } from "clsx";
import { extendTailwindMerge as zo, twMerge as Ho } from "tailwind-merge";
const Uo = zo({ prefix: "tw" });
function He(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function Fo(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = He(t), r = e.findIndex((s) => s.startsWith("-tw-"));
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
function $o(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = He(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = He(e), i = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
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
function h(...t) {
  const e = Go(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Uo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const u = Fo(d);
    n.set(u.normalized, u.original), a.push(u.normalized);
  }), Ho(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const u = n.get(d);
    return u ? $o(d, u) : d;
  }).join(" ");
}
const tr = 600, ve = 650, Ni = 400, Ko = 450, qo = 500, vi = 510, yi = 520, Vo = 675, xi = 690, Si = 700, ki = 800, rn = Pt(
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
function X({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: n = !1,
  ...a
}) {
  const s = n ? Ve.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: h(rn({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const nn = "layoutDirection";
function on() {
  return globalThis.localStorage ?? void 0;
}
function Nt() {
  var t;
  try {
    const e = (t = on()) == null ? void 0 : t.getItem(nn);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function Ci(t) {
  var e;
  try {
    (e = on()) == null || e.setItem(nn, t);
  } catch {
  }
}
function Ei({ ...t }) {
  return /* @__PURE__ */ o(It.Root, { "data-slot": "dialog", ...t });
}
function Ii({ ...t }) {
  return /* @__PURE__ */ o(It.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Jo({ ...t }) {
  return /* @__PURE__ */ o(It.Portal, { "data-slot": "dialog-portal", ...t });
}
function _i({ ...t }) {
  return /* @__PURE__ */ o(It.Close, { "data-slot": "dialog-close", ...t });
}
function Wo({
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
      style: { zIndex: Ko, ...e },
      ...r
    }
  );
}
function Ti({
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
  const l = Nt();
  return /* @__PURE__ */ m(Jo, { children: [
    /* @__PURE__ */ o(Wo, { className: n, style: a }),
    /* @__PURE__ */ m(
      It.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: qo, ...s },
        dir: l,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(It.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(X, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Rn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Li({ className: t, ...e }) {
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
function Ai({
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
        e && /* @__PURE__ */ o(It.Close, { asChild: !0, children: /* @__PURE__ */ o(X, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Mi({ className: t, ...e }) {
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
function Oi({
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
function an({ className: t, type: e, ...r }) {
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
function Xo({ className: t, ...e }) {
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
const Zo = Pt(
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
function Yo({
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
        className: h(Zo({ align: e }), t),
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
function er({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht,
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
  const a = Nt(), s = wt.useCallback(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(Xo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        Ht.Input,
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
      /* @__PURE__ */ o(Yo, { children: /* @__PURE__ */ o(Bn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Ht.List,
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
    Ht.Empty,
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
    Ht.Group,
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
    Ht.Separator,
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
    Ht.Item,
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
function Qo({ className: t, ...e }) {
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
const ta = [
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
], ea = (t) => {
  var e;
  return ((e = ta[t]) == null ? void 0 : e.chapters) ?? -1;
}, ra = ot.allBookIds.filter(
  (t) => !ot.isObsolete(ot.bookIdToNumber(t))
);
function na(t) {
  const e = [], r = Math.min(t.length, ot.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ot.bookNumberToId(n + 1));
  return e;
}
function R(t) {
  return `%scrollGroup_${t}%`;
}
const oa = {
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
function ar(t, e) {
  return ea(ot.bookIdToNumber(t));
}
function xe(t, e, r) {
  const n = ot.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = ot.bookIdToNumber(i);
    (r === "next" ? l > n && l < s : l < n && l > s) && (a = i, s = l);
  }), a;
}
function Di(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = xe(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(ar(s), 1),
      verseNum: 1
    };
}
function Pi(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < ar(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = xe(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ri(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = xe(n, e, "previous");
  if (!i) return;
  const l = Math.max(ar(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Bi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = xe(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function ji(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Gi = (t, e, r, n, a) => {
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
}, zi = (t, e, r, n, a) => {
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
function Hi(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ot.bookIdToEnglishName(t);
}
function aa(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Ui = Object.fromEntries(
  ra.map((t) => [t, ot.bookIdToEnglishName(t)])
);
function Fi(t, e, r) {
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
function ln(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function cn(t) {
  ln(document, sn()) || t();
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
function sa(t, e) {
  const [r] = P(sn), n = E(t);
  n.current = t;
  const a = E(e);
  return a.current = e, T(
    (s) => {
      var d, u;
      if ((d = n.current) == null || d.call(n, s), s.defaultPrevented) return;
      if (ln(document, r)) {
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
const dn = Symbol.for("platform-bible-react.window-blur-press");
function ia(t) {
  return Reflect.get(t, dn) === !0;
}
function un({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = E(void 0), n = E(void 0), a = E(void 0);
  U(() => {
    const u = () => {
      const f = r.current;
      if (!f || f.dataset.state === "closed") return;
      const N = f.parentElement;
      if (!N) return;
      const x = { bubbles: !0, pointerType: "mouse" }, w = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(w, dn, { value: !0 }), N.dispatchEvent(w);
    };
    return window.addEventListener("blur", u), () => window.removeEventListener("blur", u);
  }, []);
  const s = T(
    (u) => {
      if (r.current = u ?? void 0, u && u !== n.current && (n.current = u, a.current = Ar(u) ?? Mr(u)), typeof t == "function") {
        const f = t(u);
        if (typeof f == "function")
          return () => {
            r.current = void 0, f();
          };
      } else t && (t.current = u);
    },
    [t]
  ), i = T(() => {
    var x;
    const u = n.current, f = (x = a.current) != null && x.isConnected ? a.current : void 0, N = (u && Ar(u)) ?? f ?? (u && Mr(u));
    return N != null && N.isConnected ? N : void 0;
  }, []), l = sa(
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
function la(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Yt(t, e) {
  const r = e ? `${Or}, ${e}` : Or;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && la(n)
  );
}
const $i = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let Fe = "keyboard", Dr = !1;
function ca() {
  Dr || typeof document > "u" || (Dr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      ia(t) || (Fe = "pointer");
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
const fn = "data-quiet-focus";
function Rr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(fn, ""), t.style.outline = "none"));
}
function da(t) {
  t && (t.removeAttribute(fn), t.style.removeProperty("outline"));
}
const Br = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function ua({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...n
}) {
  return /* @__PURE__ */ o(
    Dn.Root,
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
const fa = Pt(
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
        fa({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Ki({
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
function wn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    ua,
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
function pn() {
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
const { PortalContainerProvider: wa, usePortalContainer: pa } = pn(), qi = wa;
function lr({
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
  const l = Nt(), d = pa(), u = un({ ref: a, onCloseAutoFocus: s });
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
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: tr, ...n },
        dir: l,
        ...i
      }
    ) })
  );
}
function ma({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Vi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Ji({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Wi({ className: t, ...e }) {
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
    Vt.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function ht({ ...t }) {
  return /* @__PURE__ */ o(Vt.Root, { "data-slot": "tooltip", ...t });
}
function gt({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    Vt.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? h(rn({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: ha, usePortalContainer: ga } = pn(), Xi = ha;
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
  const l = ga();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: l, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Vo, ...r },
        className: h(
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
const ba = /^%[^%]*%$/;
function mn(t) {
  return t !== void 0 && !ba.test(t) && t.trim() !== "";
}
function rt(t, e) {
  return mn(t) ? t : e;
}
function Na() {
  const [t, e] = P(!1), r = E(null), n = T(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = T(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
function va() {
  U(() => {
    ca();
  }, []);
}
const hn = zn(void 0);
function Se() {
  const t = Hn(hn);
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
  const r = Nt(), n = wt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(hn.Provider, { value: n, children: /* @__PURE__ */ o(tt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function ya({
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
  ref: s,
  onCloseAutoFocus: i,
  ...l
}) {
  const d = Nt(), u = un({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(tt.Portal, { children: /* @__PURE__ */ o(
    tt.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...u,
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
      children: /* @__PURE__ */ o("div", { dir: d, children: a })
    }
  ) });
}
function xa({ ...t }) {
  return /* @__PURE__ */ o(tt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Sa({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = Nt(), s = Se();
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
        ke({ variant: s.variant })
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
  const s = Nt(), i = Se();
  return /* @__PURE__ */ m(
    tt.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": n,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: i.variant })
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
            children: /* @__PURE__ */ o(tt.ItemIndicator, { children: /* @__PURE__ */ o(Je, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ka({
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
  const a = Nt(), s = Se();
  return /* @__PURE__ */ m(
    tt.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: h(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        ke({ variant: s.variant })
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
function Ca({ className: t, ...e }) {
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
function Ea({ ...t }) {
  return /* @__PURE__ */ o(tt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Ia({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = Se(), s = Nt();
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
        s === "rtl" ? /* @__PURE__ */ o(jn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Gn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function _a({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = Nt();
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
function Zi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Pn.Root,
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
function Yi({
  className: t,
  ...e
}) {
  const r = Nt();
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
function Qi({
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
const tl = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Gr = (t, e) => t[e] ?? e;
function Ta({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Gr(n, "%cancelButton_tooltip%"), l = s ?? Gr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(sr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        X,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Zr, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(wn, {}),
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        X,
        {
          "aria-label": l,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(Ne, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: l }) })
    ] }) })
  ] });
}
function Ee() {
  return /Macintosh/i.test(navigator.userAgent);
}
function el() {
  return /Windows/i.test(navigator.userAgent);
}
const La = ["input", "select", "textarea", "button"], Aa = ["button", "textbox"], rl = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = E(null), [s, i] = P(void 0), [l, d] = P(void 0), u = T(
    (w) => {
      i(w);
      const v = t.find((C) => C.id === w);
      v && (e == null || e(v));
      const p = document.getElementById(w);
      p && (p.scrollIntoView({ block: "center" }), p.focus()), a.current && a.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), f = T(
    (w) => {
      const v = t.find((p) => p.id === w);
      v && (d((p) => p === w ? void 0 : w), r == null || r(v));
    },
    [r, t]
  ), N = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || La.includes(v)) return !0;
    const p = w.getAttribute("role");
    if (p && Aa.includes(p)) return !0;
    const C = w.getAttribute("tabindex");
    return C !== void 0 && C !== "-1";
  }, x = T(
    (w) => {
      var Z;
      const v = w.target, p = (M) => M ? document.getElementById(M) : void 0, C = p(l), j = p(s);
      if (!!(C && v && C.contains(v) && v !== C) && N(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const M = t.find(($) => $.id === l);
            M && u(M.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!C) return;
          const M = Array.from(
            C.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (M.length === 0) return;
          const $ = M.findIndex((pt) => pt === v);
          if ($ === -1) return;
          let ct;
          w.key === "ArrowDown" ? ct = Math.min($ + 1, M.length - 1) : ct = Math.max($ - 1, 0), ct !== $ && (w.preventDefault(), w.stopPropagation(), (Z = M[ct]) == null || Z.focus());
          return;
        }
        return;
      }
      const S = t.findIndex((M) => M.id === s);
      let D = S;
      switch (w.key) {
        case "ArrowDown":
          D = Math.min(S + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          D = Math.max(S - 1, 0), w.preventDefault();
          break;
        case "Home":
          D = 0, w.preventDefault();
          break;
        case "End":
          D = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const M = j;
          if (M) {
            const $ = M.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ct = M.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), pt = $ ?? ct;
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
      const q = t[D];
      q && u(q.id);
    },
    [t, u, s, l, f, n]
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
}, Ma = Pt(
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
        Ma({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function nl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: h("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function gn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function ol({
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
    var d;
    const { current: l } = a;
    if (l && gn(i, l)) {
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
function al({
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
function sl({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function il({ className: t, ...e }) {
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
function Oa(t) {
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
function Da(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Pa(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function ll({
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
  }, [a]), Oa(i);
  const l = wt.useMemo(
    () => i.current ? Yt(i.current) : [],
    [i]
  ), d = wt.useCallback(
    (f) => {
      const { current: N } = i;
      if (!N || !N.parentElement) return;
      if (!gn(f, N)) {
        e == null || e(f);
        return;
      }
      const x = N.closest("table"), w = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Yt(x).filter(
          (C) => C.tagName === "TR"
        )
      ) : [], v = w.indexOf(N), p = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), Pa(w, v, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), Da(l, p, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const C = N.closest("table");
        C && C.focus();
      }
      e == null || e(f);
    },
    [i, l, e]
  ), u = wt.useCallback(
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
      onFocus: u,
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
function cl({ className: t, ...e }) {
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
function dl({ className: t, ...e }) {
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
function ul({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ra(t, e = !0) {
  const [r, n] = P(!1);
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
function Ba({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = Ra(r, e);
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
function fl({
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
  isOpen: f = void 0,
  onOpenChange: N = void 0,
  isDisabled: x = !1,
  sortSelected: w = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: C = void 0,
  variant: j = "ghost",
  id: B
}) {
  const [V, S] = P(!1), D = E(null), q = T(
    (H) => {
      var et;
      const at = (et = t.find((dt) => dt.label === H)) == null ? void 0 : et.value;
      at && r(
        e.includes(at) ? e.filter((dt) => dt !== at) : [...e, at]
      );
    },
    [t, e, r]
  ), Z = () => u || n, M = f ?? V, $ = N ?? S, [ct, pt] = P(M), [Tt, J] = P(e);
  ct !== M && (pt(M), M && J(e));
  const Rt = it(() => {
    if (!w) return t;
    const H = t.filter((et) => et.starred).sort((et, dt) => et.label.localeCompare(dt.label)), at = t.filter((et) => !et.starred).sort((et, dt) => {
      const At = Tt.includes(et.value), Bt = Tt.includes(dt.value);
      return At && !Bt ? -1 : !At && Bt ? 1 : et.label.localeCompare(dt.label);
    });
    return [...H, ...at];
  }, [t, Tt, w]), Ut = () => {
    const H = t.map((at) => at.value);
    J(H), r(H);
  }, Lt = () => {
    J([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: B, className: C, children: /* @__PURE__ */ m(ir, { open: M, onOpenChange: $, children: [
    /* @__PURE__ */ o($e, { asChild: !0, children: /* @__PURE__ */ m(
      X,
      {
        variant: j,
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
                children: Z()
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
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(X, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(X, { variant: "ghost", size: "sm", onClick: Lt, children: l })
      ] }),
      /* @__PURE__ */ o(Ba, { isEnabled: v, scrollerRef: D, children: /* @__PURE__ */ m(nr, { ref: D, children: [
        /* @__PURE__ */ o(or, { children: d }),
        /* @__PURE__ */ o(ge, { children: Rt.map((H) => /* @__PURE__ */ m(
          ye,
          {
            value: H.label,
            onSelect: q,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Ne,
                {
                  className: h(
                    "tw:h-4 tw:w-4",
                    e.includes(H.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              H.starred && /* @__PURE__ */ o(Fn, { className: "tw:h-4 tw:w-4" }),
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
function Et(t) {
  return t.replace(/^\+/, "");
}
function ja(t, e) {
  if (!t || e === "") return !1;
  const r = Et(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && Et(n.marker).toLowerCase() === r
  );
}
function Ga(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = Et(e).toLowerCase();
  return r === "passive" ? Tr({
    query: a,
    items: n,
    filter: (s) => Et(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Tr({
    query: a,
    items: n,
    filter: (s) => Et(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function me(t) {
  return t.isComposing || t.keyCode === 229;
}
const bn = /^[a-z0-9+-]$/i;
function za(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && Ee()) && e !== "Dead") {
    if (bn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Ha = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ua = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function Fa() {
  return [...Ha, ...Ua.filter((t) => bn.test(t))];
}
function ft(t) {
  t.preventDefault(), t.stopPropagation();
}
function $a(t, e, r) {
  var i, l;
  const { kind: n } = e;
  if (me(t) || To.has(t.key))
    return "passed";
  const a = !Ee();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && ft(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return ft(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return ft(t), Ga(
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
    const d = Et(e.filter).toLowerCase(), u = e.items.find(
      (f) => Et(f.marker).toLowerCase() === d
    );
    return u && r.commitItem(u.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (ft(t), r.dismiss(), "ended") : (ft(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (ft(t), "continue") : (ft(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return ft(t), r.dismiss(), "ended";
  const s = za(t);
  return t.key === "Backspace" || s !== void 0 ? (ft(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (ft(t), "continue");
}
function Ka(t, e) {
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
function qa(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Va(t) {
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
    hasEditorChangedSinceFocus: f,
    focusEditor: N,
    applyItem: x,
    onShowError: w
  } = t, v = () => {
    u(), N();
  };
  a.current += 1;
  const p = a.current, C = () => a.current === p, j = { kind: r, token: p, filter: "", items: e };
  n && (j.isNoteMarker = n), s(j), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: Fa(),
    onKey: (B) => l(B)
  }).then((B) => {
    var S;
    i(p);
    const V = B ?? ((S = j.itemToApplyOnClose) == null ? void 0 : S.marker);
    if (V !== void 0) {
      const D = (f == null ? void 0 : f()) ?? !1;
      v();
      const q = D ? void 0 : e.find((Z) => Z.marker === V);
      q && x(q);
    } else C() && v();
  }).catch((B) => {
    i(p), C() && v(), w(B);
  });
}
function Ja(t, e) {
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
  const f = (x) => {
    if (d != null && d()) {
      a.dismiss();
      return;
    }
    x();
  };
  return $a(t, u, {
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
      const w = u.items.find((p) => p.marker === x);
      if (w) {
        if (w.kind === "note") {
          u.itemToApplyOnClose = w;
          return;
        }
        s(), (v = n.current) == null || v.applyMarkerMenuSelection(w, {
          trigger: "backslash",
          literalPrefixLanded: !1
        });
      }
    })
  }) === "ended" && l(u.token), "routed";
}
function Wa({
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
function Xa({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  U(() => {
    const i = s ?? document, l = (d) => {
      var N, x, w;
      const u = (N = t.current) == null ? void 0 : N.querySelector(".editor-input");
      if (!u || d.target !== u) return;
      const f = (x = e.current) == null ? void 0 : x.getSelection();
      f ? r.current = f : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = Nn(
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
function Za({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = E(void 0), a = T(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const l = e.current ?? void 0;
      n.current = i ? l : void 0, l == null || l.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = T(
    (i) => {
      var l;
      Ka(t, i), !t.current && (n.current = void 0, (l = e.current) == null || l.setMarkerSettleSuspended(!1));
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
function Ya({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: h("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Qa = /* @__PURE__ */ new Set([
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
function ts(t) {
  const e = tn(t, "");
  let r = 0;
  for (; r < e.length && Qa.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Lo(t, r);
  return a ? [...n, a] : n;
}
function es(t) {
  const e = [];
  let r = "";
  return tn(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function rs(t) {
  const e = ts(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: es(t), separator: "+" };
}
function Ke({ hint: t }) {
  const { keycaps: e, separator: r } = rs(t);
  return e.length === 1 ? /* @__PURE__ */ o(zr, { className: "tw:tracking-normal", children: e[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ o(Ya, { dir: "ltr", className: "tw:tracking-normal", children: e.map((n, a) => (
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
const wl = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Hr = (t, e) => t[e] ?? e;
function ns({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: l = "ghost"
}) {
  const d = Ee(), u = Hr(a, "%undoButton_tooltip%"), f = Hr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(sr, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        X,
        {
          "aria-label": u,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: l,
          children: /* @__PURE__ */ o($n, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ m("p", { children: [
        u,
        s && /* @__PURE__ */ m(kt, { children: [
          " ",
          /* @__PURE__ */ o(Ke, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ o(wn, {}),
    e && /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
        X,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ o(Kn, {})
        }
      ) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(kt, { children: [
          " ",
          /* @__PURE__ */ o(Ke, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function os({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = E(null);
  return U(() => {
    var d;
    const s = Ee(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, l = (u) => {
      var N, x, w, v;
      if (!i || document.activeElement !== i) return;
      const f = u.key.toLowerCase();
      if (s) {
        if (!u.metaKey) return;
        !u.shiftKey && f === "z" ? (u.preventDefault(), r && ((N = e.current) == null || N.undo())) : u.shiftKey && f === "z" && (u.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!u.ctrlKey) return;
        !u.shiftKey && f === "z" ? (u.preventDefault(), r && ((w = e.current) == null || w.undo())) : (f === "y" || u.shiftKey && f === "z") && (u.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function as() {
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
  }), n = T((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return it(() => ({ virtualRef: r, setSource: n }), [n]);
}
function ss(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function is(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const ls = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(kt, { children: [
  /* @__PURE__ */ o("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ m(kt, { children: [
  /* @__PURE__ */ o("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ m(kt, { children: [
  /* @__PURE__ */ o("p", { children: r }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function cs({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = E(!1), i = E(null), l = E(null), d = E(!1), [u, f] = P(t), [N, x] = P(e), [w, v] = P(!1), p = E(!1), C = E(u);
  C.current = u;
  const j = E(N);
  j.current = N, U(() => {
    f(t);
  }, [t]), U(() => {
    N !== e && x(e);
  }, [e]);
  const B = (S) => {
    if (d.current = !1, v(S), !S) {
      const D = C.current, q = j.current;
      D !== "custom" || q ? (D !== t || q !== e) && (s.current = !0, r(D, q)) : (f(t), x(e));
    }
  }, V = (S) => {
    var D, q, Z, M;
    S.stopPropagation(), document.activeElement === l.current && S.key === "ArrowDown" || S.key === "ArrowRight" ? ((D = i.current) == null || D.focus(), d.current = !0) : document.activeElement === i.current && S.key === "ArrowUp" ? ((q = l.current) == null || q.focus(), d.current = !1) : document.activeElement === i.current && S.key === "ArrowLeft" && ((Z = i.current) == null ? void 0 : Z.selectionStart) === 0 && ((M = l.current) == null || M.focus(), d.current = !1), u === "custom" && S.key === "Enter" && (document.activeElement === l.current || document.activeElement === i.current) && B(!1);
  };
  return /* @__PURE__ */ m(te, { open: w, onOpenChange: B, children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(ee, { asChild: !0, children: /* @__PURE__ */ o(X, { variant: "outline", className: "tw:h-6", children: ls(t, n, e) }) }) }),
      /* @__PURE__ */ o(bt, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      re,
      {
        style: { zIndex: ve },
        onEscapeKeyDown: () => {
          C.current = t, j.current = e, f(t), x(e);
        },
        onCloseAutoFocus: (S) => {
          s.current && (s.current = !1, S.preventDefault(), cn(a));
        },
        onClick: () => {
          d.current && (d.current = !1);
        },
        onKeyDown: V,
        onMouseMove: () => {
          var S;
          d.current && ((S = i.current) == null || S.focus());
        },
        children: [
          /* @__PURE__ */ o(Ce, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(ne, {}),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ge })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "hidden",
              onCheckedChange: () => f("hidden"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: ze })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              ref: l,
              checked: u === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                p.current = u === "custom";
              },
              onClick: (S) => {
                var D;
                if (S.stopPropagation(), p.current && S.target !== i.current) {
                  B(!1);
                  return;
                }
                d.current = !0, (D = i.current) == null || D.focus();
              },
              onSelect: (S) => S.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  an,
                  {
                    tabIndex: 0,
                    onMouseDown: (S) => {
                      S.stopPropagation(), f("custom"), d.current = !0;
                    },
                    ref: i,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: N,
                    onKeyDown: (S) => {
                      S.key === "Enter" || S.key === "ArrowUp" || S.key === "ArrowDown" || S.key === "ArrowLeft" || S.key === "ArrowRight" || S.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (S) => x(S.target.value)
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
const ds = (t, e) => t === "f" ? /* @__PURE__ */ m(kt, { children: [
  /* @__PURE__ */ o(Ze, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(kt, { children: [
  /* @__PURE__ */ o(Ye, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(kt, { children: [
  /* @__PURE__ */ o(Xe, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), us = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Ao(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function fs({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = E(!1), i = (l) => {
    l !== t && (s.current = !0, e(l));
  };
  return /* @__PURE__ */ m(te, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(ee, { asChild: !0, children: /* @__PURE__ */ o(X, { variant: "outline", className: "tw:h-6", children: ds(t, r) }) }) }),
      /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: us(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      re,
      {
        style: { zIndex: ve },
        onCloseAutoFocus: (l) => {
          s.current && (s.current = !1, l.preventDefault(), cn(a));
        },
        children: [
          /* @__PURE__ */ o(Ce, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(ne, {}),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Xe, {}),
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
                /* @__PURE__ */ o(Ze, {}),
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
const pl = Object.freeze([
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
function ws({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? qn, { className: e, size: 16 });
}
function ps({ state: t }) {
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
        t.selectionState !== void 0 && /* @__PURE__ */ o(ps, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(ws, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(Qo, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function ms({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = P(""), [l] = P(() => {
    const f = e.find(
      (N) => N.marker === a && !N.isDisallowed && !N.isDeprecated && !N.isDisabled
    );
    return f ? he(f) : void 0;
  }), [d, u] = it(() => {
    const f = Et(s.trim().toLowerCase());
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
  }, [s, e]);
  return /* @__PURE__ */ m(er, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: l, children: [
    /* @__PURE__ */ o(
      rr,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (f) => i(f),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(nr, { children: [
      /* @__PURE__ */ o(or, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ge, { children: d.map((f) => /* @__PURE__ */ o(
        $r,
        {
          item: f,
          localizedStrings: t
        },
        he(f)
      )) }),
      u.length > 0 && /* @__PURE__ */ m(kt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Ue, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ge, { children: u.map((f) => /* @__PURE__ */ o(
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
function hs(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = ue[n], i = s != null && s.children ? s : a && ue[a];
  if (!i || !i.children) return [];
  const l = [];
  return Object.entries(i.children).forEach(([, d]) => {
    l.push(
      ...d.map((u) => ({
        marker: u,
        title: r[ue[u].description] ?? ue[u].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(u), e();
        }
      }))
    );
  }), l.sort((d, u) => (d.marker ?? d.title).localeCompare(u.marker ?? u.title));
}
function Kr(t) {
  if (!t || !qt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function gs(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function bs(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function Ns(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function vs(t, e) {
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
function ys(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function xs(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Ss = 300, Re = "*", ks = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function ml({
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
  inline: f = !1,
  ref: N,
  initialCaretPosition: x,
  markerPalette: w,
  onNoteEdit: v
}) {
  var Ir;
  const p = E(null), C = E(null), j = E(null), B = E(s);
  U(() => {
    B.current = s;
  }, [s]);
  const V = E(x);
  U(() => {
    V.current = x;
  }, [x]);
  const S = T(() => {
    var b, y;
    const c = V.current;
    c !== void 0 && c !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, c.utf16Offset, {
      field: c.field,
      glyph: c.glyph
    }) : (y = p.current) == null || y.selectNote(0);
  }, []);
  de(() => {
    if (f || !j.current) return;
    const c = parseFloat(getComputedStyle(j.current).width);
    c > 0 && (j.current.style.width = `${c}px`);
  }, [f]);
  const [D, q] = P("generated"), [Z, M] = P("generated"), [$, ct] = P(Re), [pt, Tt] = P(Re), [J, Rt] = P("f"), [Ut, Lt] = P(!1), [H, at] = P(!0), [et, dt] = P(!1), At = E(!1), Bt = E(""), g = E(!1), A = E(void 0), F = E([]), Q = E([]), K = E(void 0), W = E(void 0), wr = T(() => {
    var b;
    const c = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    c != null && c.length && (F.current = [...F.current, ...c], K.current = void 0);
  }, []), pr = T(
    (c, b) => {
      var _, I;
      if (!c) return;
      const y = Kr(c), k = Kr(b);
      if (!y && k) {
        K.current = {
          text: F.current,
          closedNoteOp: c,
          openNoteOp: b
        }, F.current = [];
        return;
      }
      const L = K.current;
      L && (y && !k && Gt(c, L.openNoteOp) && Gt(b, L.closedNoteOp) && !((I = (_ = p.current) == null ? void 0 : _.getOpsAfterNote(0)) != null && I.length) ? (F.current = L.text, K.current = void 0) : Gt(b, L.openNoteOp) || (K.current = void 0));
    },
    []
  ), [Ct, oe] = P(!1), Ie = as(), [mr, In] = P(), hr = E(null), vt = E(
    void 0
  ), _n = E(0), gr = E(w);
  U(() => {
    gr.current = w;
  }, [w]), U(
    () => () => {
      var c;
      vt.current && (vt.current = void 0, (c = gr.current) == null || c.dismiss());
    },
    []
  );
  const ae = E(void 0), _e = E(void 0), se = T(
    () => qa(
      _e.current,
      Nn(
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
  ), { setSession: br, clearSessionIfCurrent: ie } = Za({
    sessionRef: vt,
    editorRef: p,
    baselineRef: _e
  }), Ft = T(() => {
    var b, y, k, L;
    if ((b = p.current) != null && b.getSelection() || (y = p.current) != null && y.getSelectedParaMarker()) return;
    const c = ae.current;
    c ? (k = p.current) == null || k.setSelection(c) : (L = p.current) == null || L.selectNote(0);
  }, []), le = T(() => {
    var c;
    Ft(), (c = p.current) == null || c.focus();
  }, [Ft]), Mt = it(
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
        ...i.view ?? Eo(),
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
  ), Te = it(
    () => hs(
      p,
      () => oe(!1),
      d,
      mr,
      J
    ),
    [d, mr, J]
  );
  U(() => {
    var c;
    Ct || (c = p.current) == null || c.focus();
  }, [J, Ct]);
  const Ot = T(() => {
    var k, L, _;
    const c = (k = C.current) == null ? void 0 : k.querySelector(".editor-input"), b = c == null ? void 0 : c.querySelector("span.note"), y = (_ = (L = C.current) == null ? void 0 : L.ownerDocument.getSelection()) == null ? void 0 : _.anchorNode;
    return !!b && !!y && b.contains(y);
  }, []), jt = T(
    (c = !1) => {
      var y, k, L, _, I;
      v == null || v();
      const b = (k = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : k.at(0);
      if (b && qt("note", b) && (r == null || r([b]), c && u && B.current)) {
        const G = [
          ...F.current,
          ...((L = p.current) == null ? void 0 : L.getOpsAfterNote(0)) ?? []
        ], O = Q.current, mt = !Gt(G, O);
        if (f && !mt && Gt(b, A.current))
          return;
        A.current = b;
        const Y = [b];
        mt && (O.length > 0 && vs(
          ((_ = u.current) == null ? void 0 : _.getOpsAfterNote(B.current)) ?? [],
          O
        ) && Y.push({ delete: Ns(O) }), Y.push(...G), Q.current = G), (I = u.current) == null || I.replaceEmbedUpdate(B.current, Y);
      }
    },
    [f, r, v, u]
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
      vt.current || (L = p.current) == null || L.commitPendingMarkerEdits();
      const y = (I = (_ = p.current) == null ? void 0 : _.getNoteOps(0)) == null ? void 0 : I.at(0);
      if (!y || !qt("note", y) || !y.insert.note) return;
      let k;
      c === "custom" ? k = b : c === "generated" ? k = Ge : k = ze, y.insert.note.caller !== k && (y.insert.note.caller = k, Le(y));
    },
    [Le]
  ), $t = E(void 0), Ae = E(jt);
  U(() => {
    Ae.current = jt;
  }, [jt]);
  const Kt = T(() => {
    $t.current !== void 0 && (clearTimeout($t.current), $t.current = void 0);
  }, []), yt = T(() => {
    $t.current !== void 0 && (Kt(), Ae.current(!0));
  }, [Kt]), vr = T(() => {
    Kt(), $t.current = setTimeout(() => {
      $t.current = void 0, Ae.current(!0);
    }, Ss);
  }, [Kt]);
  U(() => {
    var L, _;
    let c, b, y;
    At.current = !1, g.current = !1, ae.current = void 0, at(!0);
    const k = e == null ? void 0 : e.at(0);
    if (A.current = k, F.current = [], Q.current = [], K.current = void 0, W.current = void 0, k && qt("note", k)) {
      const I = (L = k.insert.note) == null ? void 0 : L.caller;
      let G = "custom";
      I === Ge ? G = "generated" : I === ze && (G = "hidden");
      const O = G === "custom" && I !== void 0 ? I : Re;
      ct(O), Tt(O), q(G), M(G), Rt(((_ = k.insert.note) == null ? void 0 : _.style) ?? "f"), c = setTimeout(() => {
        var Y, st, ut, xt;
        const mt = (st = (Y = p.current) == null ? void 0 : Y.getNoteOps(0)) == null ? void 0 : st.at(0);
        (ut = p.current) == null || ut.applyUpdate(mt ? [k, { delete: 1 }] : [k]), S(), (xt = p.current) == null || xt.focus(), b = requestAnimationFrame(() => {
          y = setTimeout(() => {
            var St;
            Ot() || (S(), (St = p.current) == null || St.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      yt(), V.current = void 0, c && clearTimeout(c), b !== void 0 && cancelAnimationFrame(b), y !== void 0 && clearTimeout(y);
    };
  }, [e, yt, Ot, S]), de(() => () => yt(), [yt]);
  const yr = T(() => {
    var c;
    g.current && (vt.current || (c = p.current) == null || c.commitPendingMarkerEdits(), yt());
  }, [yt]);
  Un(
    N,
    () => ({
      flushPendingEdits: yr,
      focus: () => {
        var c;
        return (c = p.current) == null ? void 0 : c.focus();
      },
      containsFocus: () => {
        const c = j.current;
        return !!c && c.contains(c.ownerDocument.activeElement);
      }
    }),
    [yr]
  );
  const Me = T(() => {
    var c, b;
    if (!vt.current) {
      const y = (c = C.current) == null ? void 0 : c.querySelector(".editor-input");
      y != null && y.contains(y.ownerDocument.activeElement) && y.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    f ? yt() : (Kt(), jt(!0)), n();
  }, [Kt, yt, f, n, jt]), Oe = E(Me);
  de(() => {
    Oe.current = Me;
  });
  const De = E({ book: a.book, chapterNum: a.chapterNum });
  de(() => {
    (De.current.book !== a.book || De.current.chapterNum !== a.chapterNum) && (De.current = { book: a.book, chapterNum: a.chapterNum }, Oe.current());
  }, [a.book, a.chapterNum]);
  const Tn = () => {
    var _;
    const c = p.current, b = gs(c == null ? void 0 : c.getUsj());
    if (!c || !b) return;
    const y = ((_ = C.current) == null ? void 0 : _.ownerDocument) ?? document, { activeElement: k } = y, L = c.getSelection() ?? ae.current;
    c.setSelection(b);
    try {
      c.copy();
    } finally {
      L ? c.setSelection(L) : c.selectNote(0), c.getSelection(), y.activeElement !== k && (k instanceof HTMLElement && k !== y.body ? k.focus({ preventScroll: !0 }) : y.activeElement instanceof HTMLElement && y.activeElement.blur());
    }
  }, Ln = T(
    (c, b) => {
      v == null || v(), q(c), ct(b), Nr(c, b), f && yt();
    },
    [Nr, yt, f, v]
  ), An = (c) => {
    var y, k, L, _, I;
    Rt(c), vt.current || (y = p.current) == null || y.commitPendingMarkerEdits();
    const b = (L = (k = p.current) == null ? void 0 : k.getNoteOps(0)) == null ? void 0 : L.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = c);
      const G = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
      J !== "x" && c === "x" ? G == null || G.forEach((O) => ys(O)) : J === "x" && c !== "x" && (G == null || G.forEach((O) => xs(O))), Le(b), f && yt();
    }
  }, Mn = (c) => {
    In(c.contextMarker), dt(c.canRedo);
  }, On = T(
    (c) => {
      var y, k, L, _, I, G, O;
      const b = (k = (y = p.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : k.at(0);
      if (b && qt("note", b)) {
        c.content.length > 1 && setTimeout(() => {
          var st;
          (st = p.current) == null || st.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const mt = (L = b.insert.note) == null ? void 0 : L.style, Y = (I = (_ = b.insert.note) == null ? void 0 : _.contents) == null ? void 0 : I.ops;
        if (mt || Lt(!1), Lt(
          mt === "x" ? !!(Y != null && Y.every((st) => {
            var xt, St;
            if (!((xt = st.attributes) != null && xt.char)) return !0;
            const ut = ((St = st.attributes) == null ? void 0 : St.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(Y != null && Y.every((st) => {
            var xt, St;
            if (!((xt = st.attributes) != null && xt.char)) return !0;
            const ut = ((St = st.attributes) == null ? void 0 : St.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !At.current) {
          At.current = !0, Bt.current = JSON.stringify(b), W.current = b, at(!0);
          return;
        }
        g.current = !0, pr(W.current, b), W.current = b, (O = (G = p.current) == null ? void 0 : G.getOpsAfterNote(0)) != null && O.length && setTimeout(wr, 0), at(JSON.stringify(b) === Bt.current), jt(), f && vr();
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
    const b = C.current;
    if (!b) return;
    const y = c.getRangeAt(0).cloneRange();
    Ie.setSource({
      measure: () => {
        const k = ss(y);
        return k && is(k);
      },
      contextElement: b
    }), oe(!0);
  }, [Te, Ie]), Pe = E(() => {
  }), Sr = T(
    (c, b, y) => {
      const { anchorRect: k } = c;
      if (!w || !k) return;
      const { hasTextSelection: L } = y;
      Va({
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
        isNoteMarker: (_) => ja(Mt.styleInfo ?? Lr, _),
        sessionCounterRef: _n,
        setSession: br,
        clearSessionIfCurrent: ie,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (_) => Pe.current(_),
        show: (_) => w.show({
          items: b.map(bs),
          anchor: k,
          keyForwarding: _
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Ft,
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
          (!Mo(_) || _.code !== Oo) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Do(_)}`
          );
        }
      });
    },
    [
      w,
      Ft,
      se,
      Mt.styleInfo,
      br,
      ie
    ]
  ), ce = T(() => {
    var y;
    const c = (y = p.current) == null ? void 0 : y.getMarkerMenuContext();
    if (!c) return !1;
    const b = Io(Mt.styleInfo ?? Lr, c);
    return b.length === 0 ? !1 : (Sr(c, b, { hasTextSelection: !!c.hasTextSelection }), !0);
  }, [Sr, Mt.styleInfo]);
  Wa({
    isSessionOpen: T(() => !!vt.current, []),
    dismiss: T(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const kr = T(
    (c) => {
      if (!w) return;
      Ja(c, {
        sessionRef: vt,
        editorRef: p,
        palette: w,
        restoreCaret: Ft,
        reopenAtCaret: ce,
        clearSessionIfCurrent: ie,
        hasEditorChangedSinceFocus: se
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      ce,
      Ft,
      ie,
      se
    ]
  );
  U(() => {
    Pe.current = kr;
  }, [kr]), Xa({
    containerRef: C,
    editorRef: p,
    selectionRef: ae,
    baselineRef: _e,
    isSessionOpen: T(() => !!vt.current, [])
  }), U(() => {
    const c = () => {
      Ct && oe(!1);
    };
    return window.addEventListener("click", c), window.addEventListener("blur", c), () => {
      window.removeEventListener("click", c), window.removeEventListener("blur", c);
    };
  }, [Ct]), U(() => {
    var c;
    Ct && ((c = hr.current) == null || c.focus());
  }, [Ct]), U(() => {
    var _;
    const c = () => {
      var I;
      return ((I = C.current) == null ? void 0 : I.querySelector(".editor-input")) ?? void 0;
    };
    if (((_ = Mt.view) == null ? void 0 : _.markerMode) === "editable") {
      const I = (O) => {
        var st, ut, xt, St;
        if (me(O)) return;
        const mt = vt.current, Y = c();
        if (!(!Y || document.activeElement !== Y)) {
          if (mt && w) {
            Pe.current(O);
            return;
          }
          if (Fr(C.current)) {
            O.key === l && (O.preventDefault(), O.stopPropagation());
            return;
          }
          if (O.key === "Enter" && !Ot()) {
            O.preventDefault(), O.stopPropagation(), (st = p.current) == null || st.selectNote(0), (ut = p.current) == null || ut.focus();
            return;
          }
          if (w && O.key === l) {
            if (!Ot()) {
              O.preventDefault(), O.stopPropagation(), (xt = p.current) == null || xt.selectNote(0), (St = p.current) == null || St.focus();
              return;
            }
            ce() && (O.preventDefault(), O.stopPropagation());
          }
        }
      }, G = () => {
        var mt, Y;
        const O = c();
        !O || document.activeElement !== O || Ot() || ((mt = p.current) == null || mt.selectNote(0), (Y = p.current) == null || Y.focus());
      };
      return document.addEventListener("keydown", I, { capture: !0 }), document.addEventListener("paste", G, { capture: !0 }), () => {
        document.removeEventListener("keydown", I, { capture: !0 }), document.removeEventListener("paste", G, { capture: !0 });
      };
    }
    const b = () => {
      const I = c();
      return !I || document.activeElement !== I ? !1 : !Fr(C.current);
    }, y = (I) => {
      I.key !== "Enter" || me(I) || b() && (I.preventDefault(), I.stopPropagation());
    }, k = (I) => {
      I.inputType !== "insertParagraph" && I.inputType !== "insertLineBreak" || b() && (I.preventDefault(), I.stopPropagation());
    }, L = (I) => {
      const G = c();
      !Ct && G && document.activeElement === G && I.key === l ? (I.preventDefault(), xr()) : Ct && I.key === "Escape" && (I.preventDefault(), oe(!1));
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
  ]), U(() => {
    const c = j.current;
    if (!f || !c) return;
    const b = (y) => {
      y.key !== "Escape" || y.defaultPrevented || me(y) || (y.preventDefault(), y.stopPropagation(), Oe.current());
    };
    return c.addEventListener("keydown", b), () => c.removeEventListener("keydown", b);
  }, [f]), U(() => {
    const c = () => {
      var k, L, _;
      const b = ((k = C.current) == null ? void 0 : k.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const y = document.getSelection();
      y && !y.isCollapsed || Ot() || ((L = p.current) == null || L.selectNote(0), (_ = p.current) == null || _.focus());
    };
    return document.addEventListener("pointerup", c), document.addEventListener("selectionchange", c), () => {
      document.removeEventListener("pointerup", c), document.removeEventListener("selectionchange", c);
    };
  }, [Ot]);
  const Cr = d["%footnoteEditor_copyButton_tooltip%"], Er = /* @__PURE__ */ o(
    ns,
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
      canRedo: et,
      localizedStrings: d
    }
  );
  return /* @__PURE__ */ m(kt, { children: [
    /* @__PURE__ */ m(
      "div",
      {
        ref: j,
        className: h("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: h("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                fs,
                {
                  isTypeSwitchable: Ut,
                  noteType: J,
                  handleNoteTypeChange: An,
                  localizedStrings: d,
                  focusNoteText: le
                }
              ),
              /* @__PURE__ */ o(
                cs,
                {
                  callerType: D,
                  customCaller: $,
                  updateCaller: Ln,
                  localizedStrings: d,
                  focusNoteText: le
                }
              ),
              f && Er
            ] }),
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(sr, { children: [
              Er,
              /* @__PURE__ */ o(
                Ta,
                {
                  onCancelClick: n,
                  onAcceptClick: Me,
                  canAccept: !H || Z !== D || D === "custom" && $ !== pt,
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
                  os,
                  {
                    editorRef: p,
                    canUndo: !H,
                    canRedo: et,
                    children: /* @__PURE__ */ o(
                      _o,
                      {
                        options: Mt,
                        onStateChange: Mn,
                        onUsjChange: On,
                        defaultUsj: ks,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(ht, { children: [
                  /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(
                    X,
                    {
                      "aria-label": Cr,
                      onClick: Tn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Vn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(bt, { children: /* @__PURE__ */ o("p", { children: Cr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(ir, { open: Ct, children: [
      /* @__PURE__ */ o(ma, { virtualRef: Ie.virtualRef }),
      /* @__PURE__ */ o(
        lr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (c) => {
            c.preventDefault(), c.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            ms,
            {
              markerMenuItems: Te,
              localizedStrings: d,
              searchRef: hr
            }
          )
        }
      )
    ] })
  ] });
}
const Cs = {
  "refresh-cw": No,
  download: bo,
  house: go,
  "book-a": ho,
  settings: mo,
  "circle-question-mark": po,
  "external-link": wo,
  users: fo,
  "book-copy": uo,
  pencil: co,
  eye: lo,
  "zoom-in": io,
  "zoom-out": so,
  scan: ao,
  "file-text": oo,
  "panel-bottom": no,
  "message-square-plus": ro,
  "square-function": Ze,
  "square-x": Xe,
  "square-sigma": Ye,
  book: eo,
  "book-marked": to,
  "book-open": Qn,
  library: Yn,
  search: Qr,
  "message-square": Zn,
  "circle-check-big": Xn,
  "clipboard-check": Wn,
  sparkles: Jn
}, cr = Cs, hl = Object.keys(cr);
function dr(t) {
  return t !== void 0 && Object.hasOwn(cr, t);
}
function Es(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Is(t, e) {
  return Object.entries(t).filter(([r, n]) => yn(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function vn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function yn(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function _s(t) {
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
function xn(t) {
  return t.some((e) => dr(e.iconNameBefore) || e.iconPathBefore) ? "icon" : "none";
}
function Ts(t, e) {
  let r = !1;
  return t.flatMap(({ groupKey: n, items: a }) => {
    if (a.length === 0) return [];
    const s = r ? [e(n)] : [];
    return r = !0, [...s, ...a];
  });
}
function Sn(t, e) {
  return e.map((r) => ({
    groupKey: r,
    items: t.items.filter((n) => n.group === r).sort((n, a) => n.order - a.order).map(
      (n) => "command" in n ? { item: n } : {
        item: n,
        subGroups: Sn(
          t,
          Es(t.groups, n.id)
        )
      }
    )
  }));
}
function Ls(t) {
  return t ? {
    columns: vn(t.columns).map((e) => ({
      ...e,
      groups: Sn(t, Is(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function As(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = lt(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function qr(t, e, r) {
  const n = lt(e);
  return t.some(
    (a) => lt(a.projectId) === n && a.scrollGroupId === r
  );
}
function Be(t) {
  const e = As(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : lt(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(lt(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: a !== void 0 && a === lt(s.id),
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
    const s = e.get(lt(a.id));
    if (!s || s.length === 0) {
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
    s.forEach((i) => {
      n.push({
        rowKey: `tab:${a.id}:${i.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: qr(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = lt(a.projectId);
    if (n.some(
      (l) => lt(l.projectId) === s && l.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((l) => lt(l.id) === s);
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
const ur = "Selected", fr = "Unselected";
function Vr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Po(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function qe(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function Ms(t) {
  const e = t.filter(Vr).sort(zt), r = t.filter((a) => !Vr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function Os(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, l) => {
    var u;
    const d = (u = e.getSectionHeading) == null ? void 0 : u.call(
      e,
      i,
      l.map((f) => f.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? ur : fr;
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
function Ds(t, e) {
  if (e.id === "openTabs") return Ms(t);
  if (e.id === "selection") return Os(t, e);
  if (!e.getGroupKey) return qe(t);
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
    var N;
    const u = [...d].sort(
      (x, w) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, w.project)) || zt(x, w);
      }
    ), f = ((N = e.getSectionHeading) == null ? void 0 : N.call(
      e,
      l,
      u.map((x) => x.project)
    )) ?? l;
    return { key: l, heading: f, rows: u };
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
const gl = [
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
const fe = "recent", Ps = "other";
function kn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Rs(t) {
  const e = t ?? {};
  return [
    kn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Xt.lastUsedAt]) == "number" ? fe : Ps;
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
        var i;
        const a = n.find(
          (l) => {
            var d;
            return typeof ((d = l.customData) == null ? void 0 : d[Xt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Xt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const bl = Rs();
function Bs(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? ur : e.unselectedSectionHeading ?? fr
  };
}
function Nl(t) {
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
function vl(t) {
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
const js = 100, nt = {
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
function Gs(t) {
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
function yl(t) {
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
function Qt(t) {
  return oa[Ro(t)] ?? String(t);
}
const Jr = "platform.footerAction", zs = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Hs({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = Qt(t);
  return e ? /* @__PURE__ */ o(
    be,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: zs,
      children: r
    }
  ) : /* @__PURE__ */ o(be, { variant: "secondary", children: r });
}
function Us({
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
    onPointerEnter: f,
    onPointerLeave: N
  } = Na(), [x, w] = P(!1), v = Wr(), p = t.isDisabled && !!t.disabledReason, C = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, j = u || x, B = T(() => {
    if (C) {
      w(!0);
      return;
    }
    f();
  }, [C, f]), V = T(() => {
    w(!1), N();
  }, [N]), S = /* @__PURE__ */ o(Ne, { className: h("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let D;
  e === "project" ? t.openGroups.length > 0 && (D = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map(($) => /* @__PURE__ */ o(be, { variant: "secondary", children: Qt($) }, $)) })) : t.scrollGroupId !== void 0 && (D = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Hs,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && !t.isDisabled && a && /* @__PURE__ */ m(
      X,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: ($) => {
          $.stopPropagation(), a(t);
        },
        onMouseDown: ($) => $.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(yo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const q = /* @__PURE__ */ m(
    ye,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName ?? ""}`,
      onSelect: () => {
        t.isDisabled || n(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: B,
      onPointerLeave: V,
      ...p && { "aria-describedby": v },
      className: h(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: S }),
        l && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Bo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        D,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), Z = t.scrollGroupId !== void 0 ? Qt(t.scrollGroupId) : void 0, M = t.isBoundButClosed && Z ? r.boundButClosedTooltip.replace("{group}", Z) : void 0;
  return /* @__PURE__ */ m(ht, { open: j, delayDuration: 400, children: [
    /* @__PURE__ */ o(gt, { asChild: !0, children: q }),
    /* @__PURE__ */ m(
      bt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: en(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && Z && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              Z,
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
const Wt = "none";
function Fs({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Wt;
  return /* @__PURE__ */ m(te, { children: [
    /* @__PURE__ */ m(ht, { children: [
      /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o(ee, { asChild: !0, children: /* @__PURE__ */ o(
        X,
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
          children: /* @__PURE__ */ o(vo, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(bt, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      re,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ve },
        children: [
          /* @__PURE__ */ o(Ce, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(ka, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(jr, { value: Wt, children: n.groupByNone }),
            /* @__PURE__ */ o(ne, {}),
            t.map((s) => /* @__PURE__ */ o(jr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function $s(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Wt) return Wt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Wt;
}
function xl(t) {
  const [e, r] = P(!1), [n, a] = P(""), s = it(() => Gs(t.localizedStrings), [t.localizedStrings]), i = it(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(kn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      Bs({
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
  ]), [l, d] = P(void 0), u = it(
    () => $s(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = l ?? u, N = E(null), [x, w] = P(void 0), v = T((g) => {
    r(g), g || (a(""), w(void 0));
  }, []);
  U(() => {
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), C = it(() => {
    const g = n.trim().toLowerCase();
    return g ? p.filter(
      (A) => A.shortName.toLowerCase().includes(g) || (A.fullName ?? "").toLowerCase().includes(g)
    ) : p;
  }, [p, n]), j = it(
    () => new Map(t.projects.map((g) => [lt(g.id), g])),
    [t.projects]
  ), B = T(
    (g) => g === void 0 ? void 0 : j.get(lt(g)),
    [j]
  ), { renderProjectIndicator: V } = t, S = T(
    (g) => V ? V(g.project) : void 0,
    [V]
  ), D = !!V, q = !!t.footerAction && C.length === 0, Z = it(() => {
    if (f === Wt) return qe(C);
    const g = i.find((A) => A.id === f);
    return g ? Ds(C, g) : qe(C);
  }, [C, f, i]), M = (g) => {
    if (g.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
    }
  }, $ = (g) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: g.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const A = t.selection.pairs, F = lt(g.projectId), Q = (W) => lt(W.projectId) === F && W.scrollGroupId === g.scrollGroupId, K = A.some(Q) ? A.filter((W) => !Q(W)) : [
          ...A.filter((W) => !Q(W)),
          { projectId: g.projectId, scrollGroupId: g.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: K });
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
  }, pt = t.mode === "project" ? t.renderTriggerLabel : void 0, Tt = t.mode === "project" ? t.triggerLabelFormat : void 0, J = it(() => {
    switch (t.mode) {
      case "project": {
        const g = B(t.selection.projectId);
        if (pt)
          return { node: pt(g), title: "", hasSelection: !!g };
        let A = g ? g.shortName : s.buttonPlaceholder;
        return g && Tt === "shortNameAndFullName" && (A = en(g)), { node: A, title: A, hasSelection: !!g };
      }
      case "project-multi": {
        const { pairs: g } = t.selection;
        if (g.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const A = [];
        if (g.forEach((K) => {
          const W = B(K.projectId);
          W && A.push({ project: W, scrollGroupId: K.scrollGroupId });
        }), A.length === 0) {
          const K = s.buttonPlaceholder;
          return { node: K, title: K, hasSelection: !1 };
        }
        const F = A.map(
          ({ project: K, scrollGroupId: W }) => W === void 0 ? K.shortName : `${K.shortName} (${Qt(W)})`
        ).join(", "), Q = A.length.toString();
        return {
          node: /* @__PURE__ */ m(kt, { children: [
            /* @__PURE__ */ o(be, { variant: "muted", className: "tw:shrink-0", children: Q }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: F })
          ] }),
          title: `${Q} ${F}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = B(t.selection.projectId);
        if (!g) {
          const Q = s.buttonPlaceholder;
          return { node: Q, title: Q, hasSelection: !1 };
        }
        const A = t.selection.scrollGroupId;
        if (A === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const F = Qt(A);
        return {
          node: `${g.shortName} · ${F}`,
          title: `${g.shortName} · ${F}`,
          accessibleTitle: `${g.shortName}, ${F}`,
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
    pt,
    Tt,
    s.buttonPlaceholder
  ]), Rt = E(null), [Ut, Lt] = P(!1);
  U(() => {
    const g = Rt.current;
    if (!g) return;
    const A = (Q) => {
      Lt(Q < js);
    };
    if (A(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const F = new ResizeObserver((Q) => {
      Q.forEach((K) => {
        const [W] = K.borderBoxSize;
        A(W ? W.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return F.observe(g, { box: "border-box" }), () => F.disconnect();
  }, []);
  let H;
  t.isLoading ? H = /* @__PURE__ */ o(xo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? H = void 0 : t.mode === "project-multi" ? H = /* @__PURE__ */ o(Yr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : H = /* @__PURE__ */ o(So, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const at = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? M : void 0, et = s.ariaLabel && J.hasSelection && J.title ? `${s.ariaLabel}: ${J.accessibleTitle ?? J.title}` : s.ariaLabel || void 0, dt = /* @__PURE__ */ m(
    X,
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
        Ut && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof J.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: J.node }) : J.node }),
        H
      ]
    }
  ), At = J.title ? /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(ht, { children: [
    /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ o($e, { asChild: !0, children: dt }) }),
    /* @__PURE__ */ o(bt, { dir: "auto", children: J.title })
  ] }) }) : /* @__PURE__ */ o($e, { asChild: !0, children: dt }), Bt = i.length > 1;
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
            value: q ? x ?? Jr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  rr,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  Fs,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(X, { variant: "ghost", size: "sm", onClick: ct, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(nr, { children: [
                /* @__PURE__ */ o(or, { children: s.commandEmptyMessage }),
                Z.map((g, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    We,
                    {
                      children: [
                        /* @__PURE__ */ o(ge, { heading: Ks(g, s), children: g.rows.map((F) => /* @__PURE__ */ o(
                          Us,
                          {
                            row: F,
                            mode: t.mode,
                            strings: s,
                            onClick: $,
                            onOpen: at,
                            selectedRowRef: N,
                            indicator: S(F),
                            reserveIndicatorSlot: D
                          },
                          F.rowKey
                        )) }),
                        A < Z.length - 1 && /* @__PURE__ */ o(Ue, { alwaysRender: !0 })
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
                  C.length > 0 && /* @__PURE__ */ o(
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
function Ks(t, e) {
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
const qs = Xr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, l) => {
    const d = Nt();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: h("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            Qr,
            {
              className: h(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            an,
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
              onChange: (u) => e(u.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ m(
            X,
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
qs.displayName = "SearchBar";
const Vs = 5;
function Sl(t) {
  return na(t).filter(
    (e) => !ot.isObsolete(ot.bookIdToNumber(e))
  );
}
function Js(t, e) {
  return t.filter((r) => {
    try {
      return jo(r) === e;
    } catch {
      return !1;
    }
  });
}
const kl = (t, e, r) => Js(t, e).every((n) => r.includes(n));
function Ws(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ot.bookIdToNumber(n) > 0).sort((n, a) => ot.bookIdToNumber(n) - ot.bookIdToNumber(a)).map((n) => aa(n, e));
}
function Cl(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((l) => a.has(l)))
    return r;
  const i = Ws(t, n);
  if (i.length !== 0)
    return i.length <= Vs ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function Xs({ name: t, className: e }) {
  const r = dr(t) ? cr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: h("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function we({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const s = n ? "tw:me-2" : "tw:ms-2";
  if (dr(e)) return /* @__PURE__ */ o(Xs, { name: e, className: s });
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
const Zs = (t) => /* @__PURE__ */ o(ne, {}, `separator-${t}`), Cn = (t, e, r, n) => t.map(({ groupKey: a, items: s }) => ({
  groupKey: a,
  items: s.map(({ item: i, subGroups: l = [] }) => {
    if ("command" in i)
      return /* @__PURE__ */ m(ht, { children: [
        /* @__PURE__ */ o(gt, { asChild: !0, children: /* @__PURE__ */ m(
          Sa,
          {
            onClick: () => {
              e(i);
            },
            children: [
              /* @__PURE__ */ o(
                we,
                {
                  iconName: i.iconNameBefore,
                  icon: i.iconPathBefore,
                  menuLabel: i.label,
                  leading: !0,
                  leadingSlot: r
                }
              ),
              i.label,
              /* @__PURE__ */ o(
                we,
                {
                  iconName: i.iconNameAfter,
                  icon: i.iconPathAfter,
                  menuLabel: i.label
                }
              ),
              i.shortcut && /* @__PURE__ */ o(Ca, { className: "tw:ps-4", children: /* @__PURE__ */ o(Ke, { hint: i.shortcut }) })
            ]
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) }),
        i.tooltip && /* @__PURE__ */ o(bt, { children: i.tooltip })
      ] }, `tooltip-${i.label}-${i.command}`);
    const d = /* @__PURE__ */ m(Ia, { children: [
      /* @__PURE__ */ o(
        we,
        {
          iconName: i.iconNameBefore,
          menuLabel: i.label,
          leading: !0,
          leadingSlot: r
        }
      ),
      i.label,
      /* @__PURE__ */ o(we, { iconName: i.iconNameAfter, menuLabel: i.label })
    ] });
    return /* @__PURE__ */ m(Ea, { children: [
      i.tooltip ? /* @__PURE__ */ m(ht, { children: [
        /* @__PURE__ */ o(gt, { asChild: !0, children: d }),
        /* @__PURE__ */ o(bt, { children: i.tooltip })
      ] }) : d,
      /* @__PURE__ */ o(ya, { children: /* @__PURE__ */ o(_a, { ...n, children: Ts(
        Cn(
          l,
          e,
          xn(
            l.flatMap((u) => u.items.map((f) => f.item))
          ),
          n
        ),
        Zs
      ) }) })
    ] }, `dropdown-menu-sub-${i.label}-${i.id}`);
  })
}));
function En({
  onSelectMenuItem: t,
  menuData: e,
  showSectionHeadings: r = !1,
  submenuContentProps: n
}) {
  const a = Wr(), s = it(() => Ls(e), [e]), i = _s(e), l = r && i.length > 1, d = new Map(
    s.columns.map(({ columnKey: N, groups: x }) => [N, x])
  ), u = (N) => d.get(N) ?? [], f = xn(
    i.flatMap(
      ({ columnKey: N }) => u(N).flatMap((x) => x.items.map((w) => w.item))
    )
  );
  return i.map(({ columnKey: N, label: x, isHeaderHidden: w }, v) => {
    const p = `${a}-${N}`;
    return /* @__PURE__ */ m(We, { children: [
      /* @__PURE__ */ m(xa, { "aria-labelledby": l ? p : void 0, children: [
        l && // A section shown without its heading keeps it for assistive technology only
        /* @__PURE__ */ o(Ce, { id: p, className: w ? "tw:sr-only" : void 0, children: x }),
        /* @__PURE__ */ o(_t, { children: Cn(
          u(N),
          t,
          f,
          n
        ).flatMap((C) => C.items) })
      ] }),
      v < i.length - 1 && /* @__PURE__ */ o(ne, {})
    ] }, N);
  });
}
function El({
  anchor: t,
  onClose: e,
  contentProps: r,
  ...n
}) {
  return /* @__PURE__ */ m(
    te,
    {
      open: !0,
      modal: !1,
      onOpenChange: (a) => {
        a || e();
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
            align: "start",
            side: "bottom",
            onCloseAutoFocus: (a) => a.preventDefault(),
            ...r,
            children: /* @__PURE__ */ o(En, { ...n })
          }
        )
      ]
    }
  );
}
function Il({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  showSectionHeadings: s = !1,
  openMenuInOverlay: i,
  variant: l,
  buttonVariant: d = "ghost",
  id: u
}) {
  va();
  const f = E(null), N = () => da(f.current ?? void 0), [x, w] = P(!1);
  if (i) {
    const v = async () => {
      const p = f.current;
      if (!p || x) return;
      const { x: C, y: j, width: B, height: V } = p.getBoundingClientRect();
      w(!0);
      let S;
      try {
        S = await i(e, { x: C, y: j, width: B, height: V });
      } catch {
      } finally {
        w(!1);
      }
      Pr() === "pointer" && Rr(p), S && t(S);
    };
    return /* @__PURE__ */ o(
      X,
      {
        ref: f,
        id: u,
        "aria-label": r,
        "aria-haspopup": "menu",
        "aria-expanded": x,
        variant: d,
        size: "icon",
        className: h(Br, a),
        onClick: v,
        onKeyDown: (p) => {
          N(), p.key === "ArrowDown" && (p.preventDefault(), v());
        },
        onBlur: N,
        children: n ?? /* @__PURE__ */ o(_r, {})
      }
    );
  }
  return /* @__PURE__ */ m(te, { variant: l, children: [
    /* @__PURE__ */ o(ee, { "aria-label": r, className: a, asChild: !0, id: u, children: /* @__PURE__ */ o(
      X,
      {
        ref: f,
        variant: d,
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
          En,
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
function _l({ message: t, id: e, className: r }) {
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
function Ys({ className: t, ...e }) {
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
function Qs({ className: t, ...e }) {
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
const ti = Pt(
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
function ei({
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
        ti({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Tl({ className: t, ...e }) {
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
function ri({ className: t, ...e }) {
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
function ni({ className: t, ...e }) {
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
function Ll({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Ys, { className: h(s), role: a, children: [
    /* @__PURE__ */ m(Qs, { children: [
      /* @__PURE__ */ o(ei, { variant: "icon", children: n ?? /* @__PURE__ */ o(ko, {}) }),
      /* @__PURE__ */ o(ri, { children: t })
    ] }),
    r && /* @__PURE__ */ o(ni, { children: /* @__PURE__ */ o(X, { onClick: () => r(), children: e }) })
  ] });
}
const oi = Xr(({ className: t, ...e }, r) => /* @__PURE__ */ o(Co, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
oi.displayName = "Spinner";
const ai = Pt(
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
function Al({
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
        ai({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Ml({ className: t, ...e }) {
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
function Ol({ className: t, ...e }) {
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
function Dl({
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
      onLayoutChange: r ? (s) => r(Object.values(s)) : void 0,
      ...a
    }
  );
}
function pe(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Pl({
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
function Rl({
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
  Jt as $,
  Ui as A,
  X as B,
  ye as C,
  te as D,
  sr as E,
  wn as F,
  nr as G,
  or as H,
  Zi as I,
  Qi as J,
  Ei as K,
  $i as L,
  Ti as M,
  Li as N,
  Di as O,
  Pi as P,
  Mi as Q,
  Yi as R,
  Ee as S,
  _t as T,
  Ta as U,
  tl as V,
  be as W,
  ua as X,
  nl as Y,
  rl as Z,
  ne as _,
  aa as a,
  Ya as a$,
  sa as a0,
  tr as a1,
  ll as a2,
  dl as a3,
  ol as a4,
  al as a5,
  cl as a6,
  sl as a7,
  xa as a8,
  ka as a9,
  Xo as aA,
  Yo as aB,
  zr as aC,
  Al as aD,
  Ol as aE,
  Ml as aF,
  Ki as aG,
  _i as aH,
  Oi as aI,
  Wo as aJ,
  Jo as aK,
  Ii as aL,
  ya as aM,
  Ca as aN,
  Ea as aO,
  _a as aP,
  Ia as aQ,
  os as aR,
  Ys as aS,
  ni as aT,
  ri as aU,
  Qs as aV,
  ei as aW,
  _l as aX,
  Tl as aY,
  ml as aZ,
  Ss as a_,
  jr as aa,
  fl as ab,
  pl as ac,
  wl as ad,
  an as ae,
  xl as af,
  qs as ag,
  Sl as ah,
  Js as ai,
  Ue as aj,
  zi as ak,
  kl as al,
  qi as am,
  cn as an,
  Ai as ao,
  oa as ap,
  Il as aq,
  hn as ar,
  Se as as,
  ke as at,
  un as au,
  Ls as av,
  Ts as aw,
  xn as ax,
  we as ay,
  Ke as az,
  va as b,
  Cl as b$,
  ms as b0,
  ma as b1,
  Wi as b2,
  Vi as b3,
  Ji as b4,
  Rl as b5,
  Pl as b6,
  Dl as b7,
  Ll as b8,
  oi as b9,
  El as bA,
  hl as bB,
  Xs as bC,
  Wt as bD,
  nt as bE,
  gl as bF,
  Vo as bG,
  Nl as bH,
  yl as bI,
  vl as bJ,
  Nn as bK,
  Ka as bL,
  bl as bM,
  Ga as bN,
  Fa as bO,
  $a as bP,
  qa as bQ,
  Fr as bR,
  ja as bS,
  Rs as bT,
  Bs as bU,
  bs as bV,
  Ci as bW,
  za as bX,
  Ja as bY,
  Va as bZ,
  Et as b_,
  ul as ba,
  il as bb,
  Xi as bc,
  ns as bd,
  ve as be,
  ki as bf,
  Si as bg,
  qo as bh,
  Ko as bi,
  yi as bj,
  vi as bk,
  xi as bl,
  Ni as bm,
  Ma as bn,
  fa as bo,
  rn as bp,
  yn as bq,
  sn as br,
  Kr as bs,
  el as bt,
  is as bu,
  ss as bv,
  ln as bw,
  Ra as bx,
  as as by,
  ji as bz,
  h as c,
  Wa as c0,
  Xa as c1,
  Za as c2,
  ht as d,
  gt as e,
  bt as f,
  Hi as g,
  Pr as h,
  ee as i,
  re as j,
  Ce as k,
  Sa as l,
  Bi as m,
  Fi as n,
  ge as o,
  Nt as p,
  ra as q,
  rt as r,
  Gi as s,
  ir as t,
  Na as u,
  $e as v,
  lr as w,
  Ri as x,
  er as y,
  rr as z
};
//# sourceMappingURL=resizable-Bj7zAH1x.js.map
