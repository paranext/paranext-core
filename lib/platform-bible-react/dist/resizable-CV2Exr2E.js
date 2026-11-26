import { jsx as o, jsxs as m, Fragment as xt } from "react/jsx-runtime";
import { Slot as Ue, Dialog as It, Separator as An, Popover as Zt, Tooltip as Vt, DropdownMenu as et, Label as Dn, RadioGroup as Pe } from "radix-ui";
import { IconX as Pn, IconCheck as Ke, IconSearch as On, IconChevronLeft as Mn, IconChevronRight as Rn } from "@tabler/icons-react";
import { Canon as at } from "@sillsdev/scripture";
import mt, { useRef as C, useEffect as U, useCallback as _, useState as P, createContext as qr, useContext as Fe, useMemo as ut, Fragment as $e, useLayoutEffect as ie, useImperativeHandle as Bn, useId as jn, forwardRef as Vr } from "react";
import { X as Jr, Check as Xr, ChevronsUpDown as Wr, Star as Gn, Undo as zn, Redo as Hn, SquareX as qe, FunctionSquare as Ve, SquareSigma as Je, Ban as Un, Copy as Kn, Redo2 as Fn, Undo2 as $n, Sparkles as qn, ClipboardCopy as Vn, ClipboardCheck as Jn, CircleCheckBig as Xn, MessageSquare as Wn, Search as Yr, Library as Yn, BookOpen as Zn, BookMarked as Qn, Book as to, MessageSquarePlus as eo, PanelBottom as ro, FileText as no, Scan as oo, ZoomOut as ao, ZoomIn as so, Eye as io, Pencil as co, BookCopy as lo, Users as uo, ExternalLink as fo, CircleQuestionMark as wo, Settings as po, BookA as mo, House as ho, Download as go, RefreshCw as bo, Group as No, ArrowRight as vo, Loader2 as yo, ChevronDown as xo, AlertTriangle as So, LoaderCircle as ko } from "lucide-react";
import { cva as Mt } from "class-variance-authority";
import { filterAndRankItems as Tr, GENERATOR_NOTE_CALLER as Oe, HIDDEN_NOTE_CALLER as Me, isInsertEmbedOpOfType as qt, getDefaultViewOptions as Eo, getMarkerMenuItems as Co, defaultStyleInfo as Lr, Editorial as Io } from "@eten-tech-foundation/platform-editor";
import { Section as Ot, MODIFIER_KEYS as _o, includes as To, formatReplacementStringToArray as Lo, split as Zr, slice as Ao, formatReplacementString as Do, usfmMarkers as ce, deepEqual as Gt, isPlatformError as Po, ABORTED as Oo, getErrorMessage as Mo, normalizeProjectId as dt, compareProjectsByName as Ro, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Wt, formatProjectName as Qr, getLocalizeKeyForScrollGroupId as Bo, hasDistinctFullName as jo, getSectionForBook as Go } from "platform-bible-utils";
import { flushSync as zo } from "react-dom";
import { Command as Ht } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as Xe from "react-resizable-panels";
import { clsx as Ho } from "clsx";
import { extendTailwindMerge as Uo, twMerge as Ko } from "tailwind-merge";
const Fo = Uo({ prefix: "tw" });
function Re(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function $o(t) {
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
function qo(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Re(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Re(e), i = s.some((d) => d.startsWith("-tw-")), c = s.some((d) => d.startsWith("!tw-"));
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
function g(...t) {
  const e = Ho(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Fo(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((d) => {
    const u = $o(d);
    n.set(u.normalized, u.original), a.push(u.normalized);
  }), Ko(a.join(" ")).split(" ").filter(Boolean).map((d) => {
    const u = n.get(d);
    return u ? qo(d, u) : d;
  }).join(" ");
}
const tn = 600, pe = 650, hi = 400, Vo = 450, Jo = 500, gi = 510, bi = 520, Xo = 675, Ni = 690, vi = 700, yi = 800, en = Mt(
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
  const s = n ? Ue.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: g(en({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const rn = "layoutDirection";
function nn() {
  return globalThis.localStorage ?? void 0;
}
function ht() {
  var t;
  try {
    const e = (t = nn()) == null ? void 0 : t.getItem(rn);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function xi(t) {
  var e;
  try {
    (e = nn()) == null || e.setItem(rn, t);
  } catch {
  }
}
function Si({ ...t }) {
  return /* @__PURE__ */ o(It.Root, { "data-slot": "dialog", ...t });
}
function ki({ ...t }) {
  return /* @__PURE__ */ o(It.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Wo({ ...t }) {
  return /* @__PURE__ */ o(It.Portal, { "data-slot": "dialog-portal", ...t });
}
function Ei({ ...t }) {
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
      className: g(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Vo, ...e },
      ...r
    }
  );
}
function Ci({
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
  return /* @__PURE__ */ m(Wo, { children: [
    /* @__PURE__ */ o(Yo, { className: n, style: a }),
    /* @__PURE__ */ m(
      It.Content,
      {
        "data-slot": "dialog-content",
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Jo, ...s },
        dir: c,
        ...i,
        children: [
          e,
          r && /* @__PURE__ */ o(It.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ m(Y, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Pn, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ii({ className: t, ...e }) {
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
function _i({
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
        e && /* @__PURE__ */ o(It.Close, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ti({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    It.Title,
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
function Li({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    It.Description,
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
function on({ className: t, type: e, ...r }) {
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
function Zo({ className: t, ...e }) {
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
const Qo = Mt(
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
function ta({
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
        className: g(Qo({ align: e }), t),
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
function We({ className: t, ...e }) {
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
function Ye({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = ht(), s = mt.useCallback(
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
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ m(Zo, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ o(ta, { children: /* @__PURE__ */ o(On, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Ze({ className: t, ...e }) {
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
function Qe({
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
function fe({
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
          Ke,
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
function ea({ className: t, ...e }) {
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
const ra = [
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
], na = (t) => {
  var e;
  return ((e = ra[t]) == null ? void 0 : e.chapters) ?? -1;
}, oa = at.allBookIds.filter(
  (t) => !at.isObsolete(at.bookIdToNumber(t))
);
function aa(t) {
  const e = [], r = Math.min(t.length, at.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(at.bookNumberToId(n + 1));
  return e;
}
function R(t) {
  return `%scrollGroup_${t}%`;
}
const sa = {
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
function tr(t, e) {
  return na(at.bookIdToNumber(t));
}
function he(t, e, r) {
  const n = at.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = at.bookIdToNumber(i);
    (r === "next" ? c > n && c < s : c < n && c > s) && (a = i, s = c);
  }), a;
}
function Ai(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = he(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(tr(s), 1),
      verseNum: 1
    };
}
function Di(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < tr(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = he(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Pi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = he(n, e, "previous");
  if (!i) return;
  const c = Math.max(tr(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function Oi(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = he(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Mi(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const Ri = (t, e, r, n, a) => {
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
}, Bi = (t, e, r, n, a) => {
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
function ji(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? at.bookIdToEnglishName(t);
}
function ia(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Gi = Object.fromEntries(
  oa.map((t) => [t, at.bookIdToEnglishName(t)])
);
function zi(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = at.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function an() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function sn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function cn(t) {
  sn(document, an()) || t();
}
function Ar(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Dr(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function ca(t, e) {
  const [r] = P(an), n = C(t);
  n.current = t;
  const a = C(e);
  return a.current = e, _(
    (s) => {
      var d, u;
      if ((d = n.current) == null || d.call(n, s), s.defaultPrevented) return;
      if (sn(document, r)) {
        s.preventDefault();
        return;
      }
      if (r || document.hasFocus()) return;
      const { activeElement: i } = document;
      if (i && i !== document.body) return;
      const c = (u = a.current) == null ? void 0 : u.call(a);
      c && (c.focus({ preventScroll: !0 }), document.activeElement === c && s.preventDefault());
    },
    [r]
  );
}
const ln = Symbol.for("platform-bible-react.window-blur-press");
function la(t) {
  return Reflect.get(t, ln) === !0;
}
function un({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = C(void 0), n = C(void 0), a = C(void 0);
  U(() => {
    const u = () => {
      const f = r.current;
      if (!f || f.dataset.state === "closed") return;
      const y = f.parentElement;
      if (!y) return;
      const x = { bubbles: !0, pointerType: "mouse" }, w = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(w, ln, { value: !0 }), y.dispatchEvent(w);
    };
    return window.addEventListener("blur", u), () => window.removeEventListener("blur", u);
  }, []);
  const s = _(
    (u) => {
      if (r.current = u ?? void 0, u && u !== n.current && (n.current = u, a.current = Ar(u) ?? Dr(u)), typeof t == "function") {
        const f = t(u);
        if (typeof f == "function")
          return () => {
            r.current = void 0, f();
          };
      } else t && (t.current = u);
    },
    [t]
  ), i = _(() => {
    var x;
    const u = n.current, f = (x = a.current) != null && x.isConnected ? a.current : void 0, y = (u && Ar(u)) ?? f ?? (u && Dr(u));
    return y != null && y.isConnected ? y : void 0;
  }, []), c = ca(
    e,
    i
  ), d = _(
    (u) => {
      c(u), r.current || (n.current = void 0, a.current = void 0);
    },
    [c]
  );
  return { ref: s, onCloseAutoFocus: d };
}
const Pr = `
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
function Qt(t, e) {
  const r = e ? `${Pr}, ${e}` : Pr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && ua(n)
  );
}
const Hi = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let je = "keyboard", Or = !1;
function Ui() {
  Or || typeof document > "u" || (Or = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      la(t) || (je = "pointer");
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
function Ki() {
  return je;
}
const dn = "data-quiet-focus";
function Fi(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(dn, ""), t.style.outline = "none"));
}
function $i(t) {
  t && (t.removeAttribute(dn), t.style.removeProperty("outline"));
}
const qi = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function da({
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
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...n
    }
  );
}
const fa = Mt(
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
function er({
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
        fa({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function Vi({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const n = e ? Ue.Root : "div";
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
function fn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    da,
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
function wn() {
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
function rr({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function Ge({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: wa, usePortalContainer: pa } = wn(), Ji = wa;
function nr({
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
  const c = ht(), d = pa(), u = un({ ref: a, onCloseAutoFocus: s });
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
        style: { zIndex: tn, ...n },
        dir: c,
        ...i
      }
    ) })
  );
}
function ma({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Xi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Wi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Yi({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Zi = Object.freeze([
  "inTooltip",
  "shortcutKeysLocalization"
]);
function ha(t) {
  return Symbol.for(`platform-bible-react.context.${t}`);
}
function pn(t, e) {
  const r = ha(t), n = globalThis, a = n[r];
  if (a) return a;
  const s = qr(e);
  return n[r] = s, s;
}
const mn = pn("inTooltip", !1);
function ga() {
  return Fe(mn);
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
      className: e ? g(en({ variant: e }), t) : t,
      ...r
    }
  );
}
const { PortalContainerProvider: ba, usePortalContainer: Na } = wn(), Qi = ba;
function Et({
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
  const c = Na();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Vt.Portal, { container: c, children: /* @__PURE__ */ m(
      Vt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: Xo, ...r },
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          /* @__PURE__ */ o(mn.Provider, { value: !0, children: s }),
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
const va = /^%[^%]*%$/;
function hn(t) {
  return t !== void 0 && !va.test(t) && t.trim() !== "";
}
function nt(t, e) {
  return hn(t) ? t : e;
}
function ya() {
  const [t, e] = P(!1), r = C(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
const gn = qr(void 0);
function ge() {
  const t = Fe(gn);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const be = Mt("", {
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
function or({ variant: t = "default", ...e }) {
  const r = ht(), n = mt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(gn.Provider, { value: n, children: /* @__PURE__ */ o(et.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function tc({
  ...t
}) {
  return /* @__PURE__ */ o(et.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ar({
  ...t
}) {
  return /* @__PURE__ */ o(et.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function sr({
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
  const d = ht(), u = un({ ref: s, onCloseAutoFocus: i });
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
      style: { zIndex: tn, ...n },
      ...c,
      children: /* @__PURE__ */ o("div", { dir: d, children: a })
    }
  ) });
}
function ec({ ...t }) {
  return /* @__PURE__ */ o(et.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function rc({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = ht(), s = ge();
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
  const s = ht(), i = ge();
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
            children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(Ke, {}) })
          }
        ),
        e
      ]
    }
  );
}
function xa({
  ...t
}) {
  return /* @__PURE__ */ o(et.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Mr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = ht(), s = ge();
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
            children: /* @__PURE__ */ o(et.ItemIndicator, { children: /* @__PURE__ */ o(Ke, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ir({ className: t, inset: e, ...r }) {
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
function cr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    et.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function nc({ className: t, ...e }) {
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
function oc({ ...t }) {
  return /* @__PURE__ */ o(et.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function ac({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = ge(), s = ht();
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
        s === "rtl" ? /* @__PURE__ */ o(Mn, { className: "tw:ms-auto" }) : /* @__PURE__ */ o(Rn, { className: "tw:ms-auto" })
      ]
    }
  );
}
function sc({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = ht();
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
function ic({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Dn.Root,
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
function cc({
  className: t,
  ...e
}) {
  const r = ht();
  return /* @__PURE__ */ o(
    Pe.Root,
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
function lc({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    Pe.Item,
    {
      "data-slot": "radio-group-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        Pe.Indicator,
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
]), Rr = (t, e) => t[e] ?? e;
function Sa({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Rr(n, "%cancelButton_tooltip%"), c = s ?? Rr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ m(er, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(Jr, {})
        }
      ) }),
      /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(fn, {}),
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": c,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(Xr, {})
        }
      ) }),
      /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ o("p", { children: c }) })
    ] }) })
  ] });
}
function Ne() {
  return /Macintosh/i.test(navigator.userAgent);
}
function dc() {
  return /Windows/i.test(navigator.userAgent);
}
const ka = ["input", "select", "textarea", "button"], Ea = ["button", "textbox"], fc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = C(null), [s, i] = P(void 0), [c, d] = P(void 0), u = _(
    (w) => {
      i(w);
      const v = t.find((E) => E.id === w);
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
  ), y = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || ka.includes(v)) return !0;
    const p = w.getAttribute("role");
    if (p && Ea.includes(p)) return !0;
    const E = w.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, x = _(
    (w) => {
      var Z;
      const v = w.target, p = (L) => L ? document.getElementById(L) : void 0, E = p(c), K = p(s);
      if (!!(E && v && E.contains(v) && v !== E) && y(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            w.preventDefault(), w.stopPropagation();
            const L = t.find((st) => st.id === c);
            L && u(L.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!E) return;
          const L = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (L.length === 0) return;
          const st = L.findIndex((gt) => gt === v);
          if (st === -1) return;
          let ft;
          w.key === "ArrowDown" ? ft = Math.min(st + 1, L.length - 1) : ft = Math.max(st - 1, 0), ft !== st && (w.preventDefault(), w.stopPropagation(), (Z = L[ft]) == null || Z.focus());
          return;
        }
        return;
      }
      const k = t.findIndex((L) => L.id === s);
      let M = k;
      switch (w.key) {
        case "ArrowDown":
          M = Math.min(k + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          M = Math.max(k - 1, 0), w.preventDefault();
          break;
        case "Home":
          M = 0, w.preventDefault();
          break;
        case "End":
          M = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && f(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const L = K;
          if (L) {
            const st = L.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ft = L.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), gt = st ?? ft;
            if (gt) {
              w.preventDefault(), gt.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (y(v) || (n == null || n(w.key), w.preventDefault()));
          return;
      }
      const z = t[M];
      z && u(z.id);
    },
    [t, u, s, c, f, n]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: c,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: x,
    /** Focus an option by its ID */
    focusOption: u
  };
}, Ca = Mt(
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
function we({ className: t, variant: e = "default", asChild: r = !1, ...n }) {
  const a = r ? Ue.Root : "span";
  return /* @__PURE__ */ o(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ca({ variant: e }),
        t
      ),
      ...n
    }
  );
}
function wc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function bn(t, e) {
  return t.target instanceof Node && e.contains(t.target);
}
function pc({
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
    if (c && bn(i, c)) {
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
function mc({
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
function hc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: g("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function gc({ className: t, ...e }) {
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
function Ia(t) {
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
function _a(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Ta(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function bc({
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
  }, [a]), Ia(i);
  const c = mt.useMemo(
    () => i.current ? Qt(i.current) : [],
    [i]
  ), d = mt.useCallback(
    (f) => {
      const { current: y } = i;
      if (!y || !y.parentElement) return;
      if (!bn(f, y)) {
        e == null || e(f);
        return;
      }
      const x = y.closest("table"), w = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Qt(x).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], v = w.indexOf(y), p = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), Ta(w, v, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), _a(c, p, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const E = y.closest("table");
        E && E.focus();
      }
      e == null || e(f);
    },
    [i, c, e]
  ), u = mt.useCallback(
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
function Nc({ className: t, ...e }) {
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
function vc({ className: t, ...e }) {
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
function yc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: g("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function La(t, e = !0) {
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
    const c = new MutationObserver(s);
    return c.observe(a, { childList: !0, subtree: !0 }), () => {
      a.removeEventListener("scroll", s), i == null || i.disconnect(), c.disconnect();
    };
  }, [t, e]), r;
}
function Aa({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = La(r, e);
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
function xc({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: c = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: u,
  isOpen: f = void 0,
  onOpenChange: y = void 0,
  isDisabled: x = !1,
  sortSelected: w = !1,
  showScrollCue: v = !1,
  icon: p = void 0,
  className: E = void 0,
  variant: K = "ghost",
  id: G
}) {
  const [W, k] = P(!1), M = C(null), z = _(
    (H) => {
      var rt;
      const it = (rt = t.find((wt) => wt.label === H)) == null ? void 0 : rt.value;
      it && r(
        e.includes(it) ? e.filter((wt) => wt !== it) : [...e, it]
      );
    },
    [t, e, r]
  ), Z = () => u || n, L = f ?? W, st = y ?? k, [ft, gt] = P(L), [Lt, J] = P(e);
  ft !== L && (gt(L), L && J(e));
  const Rt = ut(() => {
    if (!w) return t;
    const H = t.filter((rt) => rt.starred).sort((rt, wt) => rt.label.localeCompare(wt.label)), it = t.filter((rt) => !rt.starred).sort((rt, wt) => {
      const Dt = Lt.includes(rt.value), Bt = Lt.includes(wt.value);
      return Dt && !Bt ? -1 : !Dt && Bt ? 1 : rt.label.localeCompare(wt.label);
    });
    return [...H, ...it];
  }, [t, Lt, w]), Ut = () => {
    const H = t.map((it) => it.value);
    J(H), r(H);
  }, At = () => {
    J([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: E, children: /* @__PURE__ */ m(rr, { open: L, onOpenChange: st, children: [
    /* @__PURE__ */ o(Ge, { asChild: !0, children: /* @__PURE__ */ m(
      Y,
      {
        variant: K,
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
                children: Z()
              }
            )
          ] }),
          /* @__PURE__ */ o(Wr, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(nr, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ m(We, { children: [
      /* @__PURE__ */ o(
        Ye,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ m("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: Ut, children: i }),
        /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: At, children: c })
      ] }),
      /* @__PURE__ */ o(Aa, { isEnabled: v, scrollerRef: M, children: /* @__PURE__ */ m(Ze, { ref: M, children: [
        /* @__PURE__ */ o(Qe, { children: d }),
        /* @__PURE__ */ o(fe, { children: Rt.map((H) => /* @__PURE__ */ m(
          me,
          {
            value: H.label,
            onSelect: z,
            "data-checked": e.includes(H.value),
            children: [
              H.starred && /* @__PURE__ */ o(Gn, { className: "tw:h-4 tw:w-4" }),
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
function Ct(t) {
  return t.replace(/^\+/, "");
}
function Da(t, e) {
  if (!t || e === "") return !1;
  const r = Ct(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && Ct(n.marker).toLowerCase() === r
  );
}
function Pa(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = Ct(e).toLowerCase();
  return r === "passive" ? Tr({
    query: a,
    items: n,
    filter: (s) => Ct(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Tr({
    query: a,
    items: n,
    filter: (s) => Ct(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Yt(t) {
  return t.isComposing || t.keyCode === 229;
}
function Oa(t) {
  return t === "hidden";
}
const Nn = /^[a-z0-9+-]$/i;
function Ma(t) {
  var n;
  const { key: e, keyCode: r } = t;
  if (!(t.altKey && Ne()) && e !== "Dead") {
    if (Nn.test(e)) return e;
    if (r >= 65 && r <= 90) {
      const a = String.fromCharCode(r), s = e.toUpperCase(), i = e.toLowerCase();
      return (s !== i ? e === s : t.shiftKey !== (((n = t.getModifierState) == null ? void 0 : n.call(t, "CapsLock")) ?? !1)) ? a : a.toLowerCase();
    }
  }
}
const Ra = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], Ba = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function ja() {
  return [...Ra, ...Ba.filter((t) => Nn.test(t))];
}
function pt(t) {
  t.preventDefault(), t.stopPropagation();
}
function Ga(t, e, r) {
  var i, c;
  const { kind: n } = e;
  if (Yt(t) || _o.has(t.key))
    return "passed";
  const a = !Ne();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && pt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return pt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return pt(t), Pa(
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
    return pt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (pt(t), e.filter === "")
        return r.dismiss(), "ended";
      const f = Ct(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, f)) {
        const y = e.items.find(
          (x) => Ct(x.marker).toLowerCase() === f
        );
        return y && r.commitItem(y.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    pt(t);
    const d = Ct(e.filter).toLowerCase(), u = e.items.find(
      (f) => Ct(f.marker).toLowerCase() === d
    );
    return u && r.commitItem(u.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (pt(t), r.dismiss(), "ended") : (pt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (pt(t), "continue") : (pt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return pt(t), r.dismiss(), "ended";
  const s = Ma(t);
  return t.key === "Backspace" || s !== void 0 ? (pt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (pt(t), "continue");
}
function za(t, e) {
  var r;
  ((r = t.current) == null ? void 0 : r.token) === e && (t.current = void 0);
}
function vn(t, e) {
  const r = t();
  if (r === void 0) return;
  const n = e();
  return {
    content: JSON.stringify(r),
    caret: n === void 0 ? void 0 : JSON.stringify(n)
  };
}
function Ha(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function Ua(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: c,
    show: d,
    restoreSelectionIfLost: u,
    hasEditorChangedSinceFocus: f,
    focusEditor: y,
    applyItem: x,
    onShowError: w
  } = t, v = () => {
    u(), y();
  };
  a.current += 1;
  const p = a.current, E = () => a.current === p, K = { kind: r, token: p, filter: "", items: e };
  n && (K.isNoteMarker = n), s(K), d({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: ja(),
    onKey: (G) => c(G)
  }).then((G) => {
    var k;
    i(p);
    const W = G ?? ((k = K.itemToApplyOnClose) == null ? void 0 : k.marker);
    if (W !== void 0) {
      const M = (f == null ? void 0 : f()) ?? !1;
      v();
      const z = M ? void 0 : e.find((Z) => Z.marker === W);
      z && x(z);
    } else E() && v();
  }).catch((G) => {
    i(p), E() && v(), w(G);
  });
}
function Ka(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: c,
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
  return Ga(t, u, {
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
  }) === "ended" && c(u.token), "routed";
}
function Fa({
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
function $a({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  U(() => {
    const i = s ?? document, c = (d) => {
      var y, x, w;
      const u = (y = t.current) == null ? void 0 : y.querySelector(".editor-input");
      if (!u || d.target !== u) return;
      const f = (x = e.current) == null ? void 0 : x.getSelection();
      f ? r.current = f : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = vn(
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
function qa({
  sessionRef: t,
  editorRef: e,
  baselineRef: r
}) {
  const n = C(void 0), a = _(
    (i) => {
      t.current = i, i && (r.current = void 0);
      const c = e.current ?? void 0;
      n.current = i ? c : void 0, c == null || c.setMarkerSettleSuspended(!!i);
    },
    [t, r, e]
  ), s = _(
    (i) => {
      var c;
      za(t, i), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
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
function ze({ className: t, ...e }) {
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
function Va({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: g("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Sc = Object.freeze(["%shortcutKeys_tooltip%"]), yn = pn(
  "shortcutKeysLocalization",
  { localizedStrings: {} }
);
function kc({
  localizedStrings: t,
  locale: e,
  children: r
}) {
  const n = ut(() => ({ localizedStrings: t, locale: e }), [t, e]);
  return /* @__PURE__ */ o(yn.Provider, { value: n, children: r });
}
function Ja() {
  return Fe(yn);
}
const Xa = /* @__PURE__ */ new Set([
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
]), Wa = {
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
function Ya(t) {
  const e = Zr(t, "");
  let r = 0;
  for (; r < e.length && Xa.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = Ao(t, r);
  return a ? [...n, a] : n;
}
function Za(t) {
  const e = [];
  let r = "";
  return Zr(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function xn(t) {
  const e = Ya(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: Za(t), separator: "+" };
}
function Qa(t) {
  return xn(t).keycaps.map((e) => Wa[e] ?? e);
}
function ts(t) {
  const e = { style: "long", type: "conjunction" };
  try {
    return new Intl.ListFormat(t, e);
  } catch {
    return new Intl.ListFormat(void 0, e);
  }
}
function es(t, e) {
  var c;
  const r = ts(e), n = r.formatToParts(t);
  if (t.length < 3) return n;
  const a = r.formatToParts(t.slice(-2)), s = a[a.findLastIndex(Br) - 1], i = n.findLastIndex(Br) - 1;
  return (s == null ? void 0 : s.type) !== "literal" || ((c = n[i]) == null ? void 0 : c.type) !== "literal" ? n : n.map((d, u) => u === i ? s : d);
}
function Br(t) {
  return t.type === "element";
}
function rs({
  template: t,
  hint: e,
  locale: r
}) {
  const n = es(Qa(e), r).map(
    (a, s) => (
      // A key name can repeat, so it is not a safe key; the parts never reorder, so position is.
      // eslint-disable-next-line react/no-array-index-key
      a.type === "element" ? /* @__PURE__ */ o(ze, { children: a.value }, s) : a.value
    )
  );
  return Lo(t, { keys: n }).map((a, s) => (
    // One fixed template and one list per render, so the parts never reorder
    // eslint-disable-next-line react/no-array-index-key
    /* @__PURE__ */ o($e, { children: a }, s)
  ));
}
const ns = 400;
function os() {
  return ht() === "rtl" ? "left" : "right";
}
function jr({ hint: t }) {
  const e = ga(), { localizedStrings: r, locale: n } = Ja(), { keycaps: a, separator: s } = xn(t), i = a.length === 1 ? /* @__PURE__ */ o(ze, { className: "tw:tracking-normal", children: a[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left
    // layout. The gap is narrower than `KbdGroup`'s so a combo reads as one unit.
    /* @__PURE__ */ o(Va, { dir: "ltr", className: "tw:gap-0.5 tw:tracking-normal", children: a.map((f, y) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so
      // the keycap text is not a safe key; position is stable because the keycaps never
      // reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ m($e, { children: [
        y > 0 && s && // The `+` is drawn about half a pixel left of the middle of its advance, so centered
        // as is it leaves a wider gap after it than before it. A pixel of start padding in a
        // whole-pixel box moves the center half a pixel right, which measured closest to
        // centered at 100 % and stays within half a pixel at 125 %–200 %. The group is always
        // `ltr`, so the padding is always on the left.
        /* @__PURE__ */ o("span", { className: "tw:inline-flex tw:w-2 tw:justify-center tw:ps-px", children: s }),
        /* @__PURE__ */ o(ze, { children: f })
      ] }, y)
    )) })
  ), [c, d] = P(!1);
  U(() => {
    if (!c) return;
    const f = () => zo(() => d(!1));
    return window.addEventListener("keydown", f, { capture: !0 }), () => window.removeEventListener("keydown", f, { capture: !0 });
  }, [c]);
  const u = r == null ? void 0 : r["%shortcutKeys_tooltip%"];
  return e || !u || !To(u, "{keys}") ? i : (
    // Its own provider, so the keycaps get a tooltip in any menu, whether or not one is above them.
    // The delay keeps a pointer passing down a menu's shortcut column from flashing a readout per row
    /* @__PURE__ */ o(_t, { delayDuration: ns, children: /* @__PURE__ */ m(St, { open: c, onOpenChange: d, children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o("span", { className: "tw:inline-flex", children: i }) }),
      /* @__PURE__ */ o(
        Et,
        {
          side: os(),
          className: "tw:data-closed:animate-none!",
          arrowClassName: "tw:translate-y-[calc(-50%-1px)]",
          children: /* @__PURE__ */ o(rs, { template: u, hint: t, locale: n })
        }
      )
    ] }) })
  );
}
const Ec = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Gr = (t, e) => t[e] ?? e;
function as({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const d = Ne(), u = Gr(a, "%undoButton_tooltip%"), f = Gr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ m(er, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": u,
          className: i,
          size: "icon",
          onClick: t,
          disabled: !r,
          variant: c,
          children: /* @__PURE__ */ o(zn, {})
        }
      ) }),
      /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m("p", { children: [
        u,
        s && /* @__PURE__ */ m(xt, { children: [
          " ",
          /* @__PURE__ */ o(jr, { hint: d ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ o(fn, {}),
    e && /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
        Y,
        {
          "aria-label": f,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o(Hn, {})
        }
      ) }),
      /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ m("p", { children: [
        f,
        s && /* @__PURE__ */ m(xt, { children: [
          " ",
          /* @__PURE__ */ o(jr, { hint: d ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function ss({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = C(null);
  return U(() => {
    var d;
    const s = Ne(), i = ((d = a.current) == null ? void 0 : d.querySelector(".editor-input")) ?? void 0, c = (u) => {
      var y, x, w, v;
      if (!i || document.activeElement !== i) return;
      const f = u.key.toLowerCase();
      if (s) {
        if (!u.metaKey) return;
        !u.shiftKey && f === "z" ? (u.preventDefault(), r && ((y = e.current) == null || y.undo())) : u.shiftKey && f === "z" && (u.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!u.ctrlKey) return;
        !u.shiftKey && f === "z" ? (u.preventDefault(), r && ((w = e.current) == null || w.undo())) : (f === "y" || u.shiftKey && f === "z") && (u.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function is() {
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
  }), n = _((a) => {
    t.current = a, e.current = a.measure() ?? new DOMRect();
  }, []);
  return ut(() => ({ virtualRef: r, setSource: n }), [n]);
}
function cs(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function ls(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const us = (t, e, r) => t === "generated" ? /* @__PURE__ */ m(xt, { children: [
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
function ds({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = C(!1), i = C(null), c = C(null), d = C(!1), [u, f] = P(t), [y, x] = P(e), [w, v] = P(!1), p = C(!1), E = C(u);
  E.current = u;
  const K = C(y);
  K.current = y, U(() => {
    f(t);
  }, [t]), U(() => {
    y !== e && x(e);
  }, [e]);
  const G = (k) => {
    if (d.current = !1, v(k), !k) {
      const M = E.current, z = K.current;
      M !== "custom" || z ? (M !== t || z !== e) && (s.current = !0, r(M, z)) : (f(t), x(e));
    }
  }, W = (k) => {
    var M, z, Z, L;
    k.stopPropagation(), document.activeElement === c.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((M = i.current) == null || M.focus(), d.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((z = c.current) == null || z.focus(), d.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((Z = i.current) == null ? void 0 : Z.selectionStart) === 0 && ((L = c.current) == null || L.focus(), d.current = !1), u === "custom" && k.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ m(or, { open: w, onOpenChange: G, children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(ar, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: us(t, n, e) }) }) }),
      /* @__PURE__ */ o(Et, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ m(
      sr,
      {
        style: { zIndex: pe },
        onEscapeKeyDown: () => {
          E.current = t, K.current = e, f(t), x(e);
        },
        onCloseAutoFocus: (k) => {
          s.current && (s.current = !1, k.preventDefault(), cn(a));
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
          /* @__PURE__ */ o(ir, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(cr, {}),
          /* @__PURE__ */ o(
            Jt,
            {
              checked: u === "generated",
              onCheckedChange: () => f("generated"),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Oe })
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
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Me })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            Jt,
            {
              ref: c,
              checked: u === "custom",
              onCheckedChange: () => f("custom"),
              onPointerDown: () => {
                p.current = u === "custom";
              },
              onClick: (k) => {
                var M;
                if (k.stopPropagation(), p.current && k.target !== i.current) {
                  G(!1);
                  return;
                }
                d.current = !0, (M = i.current) == null || M.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ m("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  on,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), f("custom"), d.current = !0;
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
const fs = (t, e) => t === "f" ? /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o(Ve, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o(Je, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ m(xt, { children: [
  /* @__PURE__ */ o(qe, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), ws = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), Do(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function ps({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = C(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ m(or, { children: [
    /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(ar, { asChild: !0, children: /* @__PURE__ */ o(Y, { variant: "outline", className: "tw:h-6", children: fs(t, r) }) }) }),
      /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ o("p", { children: ws(t, r) }) })
    ] }) }),
    /* @__PURE__ */ m(
      sr,
      {
        style: { zIndex: pe },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), cn(a));
        },
        children: [
          /* @__PURE__ */ o(ir, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(cr, {}),
          /* @__PURE__ */ m(
            Jt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(qe, {}),
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
                /* @__PURE__ */ o(Ve, {}),
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
                /* @__PURE__ */ o(Je, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const zr = '[aria-controls="editor-context-menu"]';
function Le(t) {
  return t ? t.matches(zr) ? !0 : !!t.querySelector(zr) : !1;
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
function ms({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? Un, { className: e, size: 16 });
}
function hs({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(Xr, { size: 16 })
    }
  );
}
function de(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Hr({
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
      value: de(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(hs, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(ms, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(ea, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function gs({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = P(""), [c] = P(() => {
    const f = e.find(
      (y) => y.marker === a && !y.isDisallowed && !y.isDeprecated && !y.isDisabled
    );
    return f ? de(f) : void 0;
  }), [d, u] = ut(() => {
    const f = Ct(s.trim().toLowerCase());
    if (!f) {
      const w = e.filter((v) => !v.isDisallowed);
      return [w.length > 0 ? w : e, []];
    }
    const y = e.filter((w) => {
      var p;
      const v = (p = w.marker) == null ? void 0 : p.toLowerCase();
      return w.isDisallowed ? v === f : v == null ? void 0 : v.includes(f);
    }), x = e.filter(
      (w) => w.title.toLowerCase().includes(f) && !y.includes(w)
    );
    return [y, x];
  }, [s, e]);
  return /* @__PURE__ */ m(We, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: c, children: [
    /* @__PURE__ */ o(
      Ye,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (f) => i(f),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ m(Ze, { children: [
      /* @__PURE__ */ o(Qe, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(fe, { children: d.map((f) => /* @__PURE__ */ o(
        Hr,
        {
          item: f,
          localizedStrings: t
        },
        de(f)
      )) }),
      u.length > 0 && /* @__PURE__ */ m(xt, { children: [
        d.length > 0 && /* @__PURE__ */ o(Be, { alwaysRender: !0 }),
        /* @__PURE__ */ o(fe, { children: u.map((f) => /* @__PURE__ */ o(
          Hr,
          {
            item: f,
            localizedStrings: t
          },
          de(f)
        )) })
      ] })
    ] })
  ] });
}
function bs(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = ce[n], i = s != null && s.children ? s : a && ce[a];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, d]) => {
    c.push(
      ...d.map((u) => ({
        marker: u,
        title: r[ce[u].description] ?? ce[u].description,
        action: () => {
          var f;
          (f = t.current) == null || f.insertMarker(u), e();
        }
      }))
    );
  }), c.sort((d, u) => (d.marker ?? d.title).localeCompare(u.marker ?? u.title));
}
function Ur(t) {
  if (!t || !qt("note", t)) return !1;
  const { note: e } = t.insert;
  return !!e && "closed" in e && e.closed === "false";
}
function Ns(t) {
  var a;
  const e = t == null ? void 0 : t.content[0], r = typeof e == "object" ? (a = e.content) == null ? void 0 : a[0] : void 0;
  if (typeof r != "object" || r.type !== "note" || !r.marker) return;
  const n = "$.content[0].content[0]";
  return {
    start: { jsonPath: n },
    end: { jsonPath: n, closingMarkerOffset: `\\${r.marker}*`.length }
  };
}
function vs(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function ys(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function xs(t, e) {
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
function Ss(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function ks(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Es = 300, Ae = "*", Cs = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Ic({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: c,
  localizedStrings: d,
  parentEditorRef: u,
  inline: f = !1,
  ref: y,
  initialCaretPosition: x,
  markerPalette: w,
  onNoteEdit: v
}) {
  var Er;
  const p = C(null), E = C(null), K = C(null), G = C(s);
  U(() => {
    G.current = s;
  }, [s]);
  const W = C(x);
  U(() => {
    W.current = x;
  }, [x]);
  const k = _(() => {
    var b, N;
    const l = W.current;
    l !== void 0 && l !== "end" ? (b = p.current) == null || b.selectNoteTextOffset(0, l.utf16Offset, {
      field: l.field,
      glyph: l.glyph
    }) : (N = p.current) == null || N.selectNote(0);
  }, []);
  ie(() => {
    if (f || !K.current) return;
    const l = parseFloat(getComputedStyle(K.current).width);
    l > 0 && (K.current.style.width = `${l}px`);
  }, [f]);
  const [M, z] = P("generated"), [Z, L] = P("generated"), [st, ft] = P(Ae), [gt, Lt] = P(Ae), [J, Rt] = P("f"), [Ut, At] = P(!1), [H, it] = P(!0), [rt, wt] = P(!1), Dt = C(!1), Bt = C(""), h = C(!1), A = C(void 0), F = C([]), Q = C([]), $ = C(void 0), X = C(void 0), fr = _(() => {
    var b;
    const l = (b = p.current) == null ? void 0 : b.takeOpsAfterNote(0);
    l != null && l.length && (F.current = [...F.current, ...l], $.current = void 0);
  }, []), wr = _(
    (l, b) => {
      var I, B;
      if (!l) return;
      const N = Ur(l), S = Ur(b);
      if (!N && S) {
        $.current = {
          text: F.current,
          closedNoteOp: l,
          openNoteOp: b
        }, F.current = [];
        return;
      }
      const T = $.current;
      T && (N && !S && Gt(l, T.openNoteOp) && Gt(b, T.closedNoteOp) && !((B = (I = p.current) == null ? void 0 : I.getOpsAfterNote(0)) != null && B.length) ? (F.current = T.text, $.current = void 0) : Gt(b, T.openNoteOp) || ($.current = void 0));
    },
    []
  ), [bt, ee] = P(!1), ve = is(), [pr, kn] = P(), mr = C(null), Nt = C(
    void 0
  ), En = C(0), hr = C(w);
  U(() => {
    hr.current = w;
  }, [w]), U(
    () => () => {
      var l;
      Nt.current && (Nt.current = void 0, (l = hr.current) == null || l.dismiss());
    },
    []
  );
  const re = C(void 0), ye = C(void 0), ne = _(
    () => Ha(
      ye.current,
      vn(
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
  ), { setSession: gr, clearSessionIfCurrent: oe } = qa({
    sessionRef: Nt,
    editorRef: p,
    baselineRef: ye
  }), Kt = _(() => {
    var b, N, S, T;
    if ((b = p.current) != null && b.getSelection() || (N = p.current) != null && N.getSelectedParaMarker()) return;
    const l = re.current;
    l ? (S = p.current) == null || S.setSelection(l) : (T = p.current) == null || T.selectNote(0);
  }, []), ae = _(() => {
    var l;
    Kt(), (l = p.current) == null || l.focus();
  }, [Kt]), Tt = ut(
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
    [i, c]
  ), xe = ut(
    () => bs(
      p,
      () => ee(!1),
      d,
      pr,
      J
    ),
    [d, pr, J]
  );
  U(() => {
    var l;
    bt || (l = p.current) == null || l.focus();
  }, [J, bt]);
  const Pt = _(() => {
    var S, T, I;
    const l = (S = E.current) == null ? void 0 : S.querySelector(".editor-input"), b = l == null ? void 0 : l.querySelector("span.note"), N = (I = (T = E.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : I.anchorNode;
    return !!b && !!N && b.contains(N);
  }, []), jt = _(
    (l = !1) => {
      var N, S, T, I, B;
      v == null || v();
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b) && (r == null || r([b]), l && u && G.current)) {
        const q = [
          ...F.current,
          ...((T = p.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], tt = Q.current, D = !Gt(q, tt);
        if (f && !D && Gt(b, A.current))
          return;
        A.current = b;
        const V = [b];
        D && (tt.length > 0 && xs(
          ((I = u.current) == null ? void 0 : I.getOpsAfterNote(G.current)) ?? [],
          tt
        ) && V.push({ delete: ys(tt) }), V.push(...q), Q.current = q), (B = u.current) == null || B.replaceEmbedUpdate(G.current, V);
      }
    },
    [f, r, v, u]
  ), Se = _(
    (l) => {
      var N, S, T;
      const b = (N = p.current) == null ? void 0 : N.getSelection();
      (S = p.current) == null || S.applyUpdate([l, { delete: 1 }]), b && ((T = p.current) == null || T.setSelection(b)), ae();
    },
    [ae]
  ), br = _(
    (l, b) => {
      var T, I, B;
      Nt.current || (T = p.current) == null || T.commitPendingMarkerEdits();
      const N = (B = (I = p.current) == null ? void 0 : I.getNoteOps(0)) == null ? void 0 : B.at(0);
      if (!N || !qt("note", N) || !N.insert.note) return;
      let S;
      l === "custom" ? S = b : l === "generated" ? S = Oe : S = Me, N.insert.note.caller !== S && (N.insert.note.caller = S, Se(N));
    },
    [Se]
  ), Ft = C(void 0), ke = C(jt);
  U(() => {
    ke.current = jt;
  }, [jt]);
  const $t = _(() => {
    Ft.current !== void 0 && (clearTimeout(Ft.current), Ft.current = void 0);
  }, []), vt = _(() => {
    Ft.current !== void 0 && ($t(), ke.current(!0));
  }, [$t]), Nr = _(() => {
    $t(), Ft.current = setTimeout(() => {
      Ft.current = void 0, ke.current(!0);
    }, Es);
  }, [$t]);
  U(() => {
    var T, I;
    let l, b, N;
    Dt.current = !1, h.current = !1, re.current = void 0, it(!0);
    const S = e == null ? void 0 : e.at(0);
    if (A.current = S, F.current = [], Q.current = [], $.current = void 0, X.current = void 0, S && qt("note", S)) {
      const B = (T = S.insert.note) == null ? void 0 : T.caller;
      let q = "custom";
      B === Oe ? q = "generated" : B === Me && (q = "hidden");
      const tt = q === "custom" && B !== void 0 ? B : Ae;
      ft(tt), Lt(tt), z(q), L(q), Rt(((I = S.insert.note) == null ? void 0 : I.style) ?? "f"), l = setTimeout(() => {
        var V, O, ct, lt;
        const D = (O = (V = p.current) == null ? void 0 : V.getNoteOps(0)) == null ? void 0 : O.at(0);
        (ct = p.current) == null || ct.applyUpdate(D ? [S, { delete: 1 }] : [S]), k(), (lt = p.current) == null || lt.focus(), b = requestAnimationFrame(() => {
          N = setTimeout(() => {
            var yt;
            Pt() || (k(), (yt = p.current) == null || yt.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      vt(), W.current = void 0, l && clearTimeout(l), b !== void 0 && cancelAnimationFrame(b), N !== void 0 && clearTimeout(N);
    };
  }, [e, vt, Pt, k]), ie(() => () => vt(), [vt]);
  const vr = _(() => {
    var l;
    h.current && (Nt.current || (l = p.current) == null || l.commitPendingMarkerEdits(), vt());
  }, [vt]);
  Bn(
    y,
    () => ({
      flushPendingEdits: vr,
      focus: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.focus();
      },
      containsFocus: () => {
        const l = K.current;
        return !!l && l.contains(l.ownerDocument.activeElement);
      }
    }),
    [vr]
  );
  const Ee = _(() => {
    var l, b;
    if (!Nt.current) {
      const N = (l = E.current) == null ? void 0 : l.querySelector(".editor-input");
      N != null && N.contains(N.ownerDocument.activeElement) && N.blur(), (b = p.current) == null || b.commitPendingMarkerEdits();
    }
    f ? vt() : ($t(), jt(!0)), n();
  }, [$t, vt, f, n, jt]), Ce = C(Ee);
  ie(() => {
    Ce.current = Ee;
  });
  const Ie = C({ book: a.book, chapterNum: a.chapterNum });
  ie(() => {
    (Ie.current.book !== a.book || Ie.current.chapterNum !== a.chapterNum) && (Ie.current = { book: a.book, chapterNum: a.chapterNum }, Ce.current());
  }, [a.book, a.chapterNum]);
  const Cn = () => {
    var I;
    const l = p.current, b = Ns(l == null ? void 0 : l.getUsj());
    if (!l || !b) return;
    const N = ((I = E.current) == null ? void 0 : I.ownerDocument) ?? document, { activeElement: S } = N, T = l.getSelection() ?? re.current;
    l.setSelection(b);
    try {
      l.copy();
    } finally {
      T ? l.setSelection(T) : l.selectNote(0), l.getSelection(), N.activeElement !== S && (S instanceof HTMLElement && S !== N.body ? S.focus({ preventScroll: !0 }) : N.activeElement instanceof HTMLElement && N.activeElement.blur());
    }
  }, In = _(
    (l, b) => {
      v == null || v(), z(l), ft(b), br(l, b), f && vt();
    },
    [br, vt, f, v]
  ), _n = (l) => {
    var N, S, T, I, B;
    Rt(l), Nt.current || (N = p.current) == null || N.commitPendingMarkerEdits();
    const b = (T = (S = p.current) == null ? void 0 : S.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (b && qt("note", b)) {
      b.insert.note && (b.insert.note.style = l);
      const q = (B = (I = b.insert.note) == null ? void 0 : I.contents) == null ? void 0 : B.ops;
      J !== "x" && l === "x" ? q == null || q.forEach((tt) => Ss(tt)) : J === "x" && l !== "x" && (q == null || q.forEach((tt) => ks(tt))), Se(b), f && vt();
    }
  }, Tn = (l) => {
    kn(l.contextMarker), wt(l.canRedo);
  }, Ln = _(
    (l) => {
      var N, S, T, I, B, q, tt;
      const b = (S = (N = p.current) == null ? void 0 : N.getNoteOps(0)) == null ? void 0 : S.at(0);
      if (b && qt("note", b)) {
        l.content.length > 1 && setTimeout(() => {
          var O;
          (O = p.current) == null || O.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const D = (T = b.insert.note) == null ? void 0 : T.style, V = (B = (I = b.insert.note) == null ? void 0 : I.contents) == null ? void 0 : B.ops;
        if (D || At(!1), At(
          D === "x" ? !!(V != null && V.every((O) => {
            var lt, yt;
            if (!((lt = O.attributes) != null && lt.char)) return !0;
            const ct = ((yt = O.attributes) == null ? void 0 : yt.char).style;
            return ct === "xt" || ct === "xo" || ct === "xq";
          })) : !!(V != null && V.every((O) => {
            var lt, yt;
            if (!((lt = O.attributes) != null && lt.char)) return !0;
            const ct = ((yt = O.attributes) == null ? void 0 : yt.char).style;
            return ct === "ft" || ct === "fr" || ct === "fq";
          }))
        ), !Dt.current) {
          Dt.current = !0, Bt.current = JSON.stringify(b), X.current = b, it(!0);
          return;
        }
        h.current = !0, wr(X.current, b), X.current = b, (tt = (q = p.current) == null ? void 0 : q.getOpsAfterNote(0)) != null && tt.length && setTimeout(fr, 0), it(JSON.stringify(b) === Bt.current), jt(), f && Nr();
      } else
        At(!1), it(!0);
    },
    [
      f,
      jt,
      Nr,
      wr,
      fr
    ]
  ), _e = _(() => {
    const l = window.getSelection();
    if (!xe.length || !l || l.rangeCount === 0)
      return !1;
    const b = E.current;
    if (!b) return !1;
    const N = l.getRangeAt(0).cloneRange();
    return ve.setSource({
      measure: () => {
        const S = cs(N);
        return S && ls(S);
      },
      contextElement: b
    }), ee(!0), !0;
  }, [xe, ve]), Te = C(() => {
  }), yr = _(
    (l, b, N) => {
      const { anchorRect: S } = l;
      if (!w || !S) return;
      const { hasTextSelection: T } = N;
      Ua({
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
        isNoteMarker: (I) => Da(Tt.styleInfo ?? Lr, I),
        sessionCounterRef: En,
        setSession: gr,
        clearSessionIfCurrent: oe,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (I) => Te.current(I),
        show: (I) => w.show({
          items: b.map(vs),
          anchor: S,
          keyForwarding: I
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Kt,
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
          (!Po(I) || I.code !== Oo) && console.warn(
            `FootnoteEditor: the marker palette did not open: ${Mo(I)}`
          );
        }
      });
    },
    [
      w,
      Kt,
      ne,
      Tt.styleInfo,
      gr,
      oe
    ]
  ), se = _(() => {
    var N;
    const l = (N = p.current) == null ? void 0 : N.getMarkerMenuContext();
    if (!l) return !1;
    const b = Co(Tt.styleInfo ?? Lr, l);
    return b.length === 0 ? !1 : (yr(l, b, { hasTextSelection: !!l.hasTextSelection }), !0);
  }, [yr, Tt.styleInfo]);
  Fa({
    isSessionOpen: _(() => !!Nt.current, []),
    dismiss: _(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const xr = _(
    (l) => {
      if (!w) return;
      Ka(l, {
        sessionRef: Nt,
        editorRef: p,
        palette: w,
        restoreCaret: Kt,
        reopenAtCaret: se,
        clearSessionIfCurrent: oe,
        hasEditorChangedSinceFocus: ne
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      se,
      Kt,
      oe,
      ne
    ]
  );
  U(() => {
    Te.current = xr;
  }, [xr]), $a({
    containerRef: E,
    editorRef: p,
    selectionRef: re,
    baselineRef: ye,
    isSessionOpen: _(() => !!Nt.current, [])
  }), U(() => {
    const l = () => {
      bt && ee(!1);
    };
    return window.addEventListener("click", l), window.addEventListener("blur", l), () => {
      window.removeEventListener("click", l), window.removeEventListener("blur", l);
    };
  }, [bt]), U(() => {
    var l;
    bt && ((l = mr.current) == null || l.focus());
  }, [bt]), U(() => {
    var q, tt;
    const l = () => {
      var D;
      return ((D = E.current) == null ? void 0 : D.querySelector(".editor-input")) ?? void 0;
    };
    if (((q = Tt.view) == null ? void 0 : q.markerMode) === "editable") {
      const D = (O) => {
        var yt, Cr, Ir, _r;
        if (Yt(O)) return;
        const ct = Nt.current, lt = l();
        if (!(!lt || document.activeElement !== lt)) {
          if (ct && w) {
            Te.current(O);
            return;
          }
          if (Le(E.current)) {
            O.key === c && (O.preventDefault(), O.stopPropagation());
            return;
          }
          if (O.key === "Enter" && !Pt()) {
            O.preventDefault(), O.stopPropagation(), (yt = p.current) == null || yt.selectNote(0), (Cr = p.current) == null || Cr.focus();
            return;
          }
          if (w && O.key === c) {
            if (!Pt()) {
              O.preventDefault(), O.stopPropagation(), (Ir = p.current) == null || Ir.selectNote(0), (_r = p.current) == null || _r.focus();
              return;
            }
            se() && (O.preventDefault(), O.stopPropagation());
          }
        }
      }, V = () => {
        var ct, lt;
        const O = l();
        !O || document.activeElement !== O || Pt() || ((ct = p.current) == null || ct.selectNote(0), (lt = p.current) == null || lt.focus());
      };
      return document.addEventListener("keydown", D, { capture: !0 }), document.addEventListener("paste", V, { capture: !0 }), () => {
        document.removeEventListener("keydown", D, { capture: !0 }), document.removeEventListener("paste", V, { capture: !0 });
      };
    }
    const b = () => {
      const D = l();
      return !D || document.activeElement !== D ? !1 : !Le(E.current);
    }, N = (D) => {
      D.key !== "Enter" || Yt(D) || b() && (D.preventDefault(), D.stopPropagation());
    }, S = (D) => {
      D.inputType !== "insertParagraph" && D.inputType !== "insertLineBreak" || b() && (D.preventDefault(), D.stopPropagation());
    }, T = (D) => {
      if (D.key !== c || bt || Yt(D)) return;
      const V = l();
      !V || document.activeElement !== V || (Le(E.current) || _e()) && (D.preventDefault(), D.stopPropagation());
    }, I = Oa((tt = Tt.view) == null ? void 0 : tt.markerMode), B = (D) => {
      const V = l();
      !bt && V && document.activeElement === V && D.key === c ? (D.preventDefault(), _e()) : bt && D.key === "Escape" && (D.preventDefault(), ee(!1));
    };
    return document.addEventListener("keydown", B), document.addEventListener("keydown", N, { capture: !0 }), document.addEventListener("beforeinput", S, { capture: !0 }), I && document.addEventListener("keydown", T, { capture: !0 }), () => {
      I && document.removeEventListener("keydown", T, { capture: !0 }), document.removeEventListener("keydown", B), document.removeEventListener("keydown", N, { capture: !0 }), document.removeEventListener("beforeinput", S, { capture: !0 });
    };
  }, [
    bt,
    _e,
    c,
    (Er = Tt.view) == null ? void 0 : Er.markerMode,
    Tt.styleInfo,
    w,
    se,
    Pt
  ]), U(() => {
    const l = K.current;
    if (!f || !l) return;
    const b = (N) => {
      N.key !== "Escape" || N.defaultPrevented || Yt(N) || (N.preventDefault(), N.stopPropagation(), Ce.current());
    };
    return l.addEventListener("keydown", b), () => l.removeEventListener("keydown", b);
  }, [f]), U(() => {
    const l = () => {
      var S, T, I;
      const b = ((S = E.current) == null ? void 0 : S.querySelector(".editor-input")) ?? void 0;
      if (!b || document.activeElement !== b || !document.hasFocus()) return;
      const N = document.getSelection();
      N && !N.isCollapsed || Pt() || ((T = p.current) == null || T.selectNote(0), (I = p.current) == null || I.focus());
    };
    return document.addEventListener("pointerup", l), document.addEventListener("selectionchange", l), () => {
      document.removeEventListener("pointerup", l), document.removeEventListener("selectionchange", l);
    };
  }, [Pt]);
  const Sr = d["%footnoteEditor_copyButton_tooltip%"], kr = /* @__PURE__ */ o(
    as,
    {
      onUndoClick: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.undo();
      },
      onRedoClick: () => {
        var l;
        return (l = p.current) == null ? void 0 : l.redo();
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
        ref: K,
        className: g("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", f && "tw:w-full"),
        children: [
          /* @__PURE__ */ m("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ m("div", { className: g("tw:flex tw:gap-4", f && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                ps,
                {
                  isTypeSwitchable: Ut,
                  noteType: J,
                  handleNoteTypeChange: _n,
                  localizedStrings: d,
                  focusNoteText: ae
                }
              ),
              /* @__PURE__ */ o(
                ds,
                {
                  callerType: M,
                  customCaller: st,
                  updateCaller: In,
                  localizedStrings: d,
                  focusNoteText: ae
                }
              ),
              f && kr
            ] }),
            !f && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ m(er, { children: [
              kr,
              /* @__PURE__ */ o(
                Sa,
                {
                  onCancelClick: n,
                  onAcceptClick: Ee,
                  canAccept: !H || Z !== M || M === "custom" && st !== gt,
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
                  ss,
                  {
                    editorRef: p,
                    canUndo: !H,
                    canRedo: rt,
                    children: /* @__PURE__ */ o(
                      Io,
                      {
                        options: Tt,
                        onStateChange: Tn,
                        onUsjChange: Ln,
                        defaultUsj: Cs,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: p
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(_t, { children: /* @__PURE__ */ m(St, { children: [
                  /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(
                    Y,
                    {
                      "aria-label": Sr,
                      onClick: Cn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(Kn, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(Et, { children: /* @__PURE__ */ o("p", { children: Sr }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ m(rr, { open: bt, children: [
      /* @__PURE__ */ o(ma, { virtualRef: ve.virtualRef }),
      /* @__PURE__ */ o(
        nr,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (l) => {
            l.preventDefault(), l.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            gs,
            {
              markerMenuItems: xe,
              localizedStrings: d,
              searchRef: mr
            }
          )
        }
      )
    ] })
  ] });
}
const Is = {
  "refresh-cw": bo,
  download: go,
  house: ho,
  "book-a": mo,
  settings: po,
  "circle-question-mark": wo,
  "external-link": fo,
  users: uo,
  "book-copy": lo,
  pencil: co,
  eye: io,
  "zoom-in": so,
  "zoom-out": ao,
  scan: oo,
  "file-text": no,
  "panel-bottom": ro,
  "message-square-plus": eo,
  "square-function": Ve,
  "square-x": qe,
  "square-sigma": Je,
  book: to,
  "book-marked": Qn,
  "book-open": Zn,
  library: Yn,
  search: Yr,
  "message-square": Wn,
  "circle-check-big": Xn,
  "clipboard-check": Jn,
  "clipboard-copy": Vn,
  sparkles: qn,
  "undo-2": $n,
  "redo-2": Fn
}, lr = Is, _c = Object.keys(lr);
function _s(t) {
  return t !== void 0 && Object.hasOwn(lr, t);
}
function Ts(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = dt(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Kr(t, e, r) {
  const n = dt(e);
  return t.some(
    (a) => dt(a.projectId) === n && a.scrollGroupId === r
  );
}
function De(t) {
  const e = Ts(t.openTabs);
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
        openGroups: i.map((c) => c.scrollGroupId),
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
        isSelected: Kr(r, a.id, void 0),
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
        isSelected: Kr(r, a.id, i.scrollGroupId),
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
      (c) => dt(c.projectId) === s && c.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((c) => dt(c.id) === s);
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
const ur = "Selected", dr = "Unselected";
function Fr(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function zt(t, e) {
  const r = Ro(t, e);
  if (r !== 0) return r;
  const n = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return n - a;
}
function He(t) {
  return [{ kind: "flat", rows: [...t].sort(zt) }];
}
function Ls(t) {
  const e = t.filter(Fr).sort(zt), r = t.filter((a) => !Fr(a)).sort(zt);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function As(t, e) {
  const r = t.filter((i) => i.isSelected).sort(zt), n = t.filter((i) => !i.isSelected).sort(zt), a = (i, c) => {
    var u;
    const d = (u = e.getSectionHeading) == null ? void 0 : u.call(
      e,
      i,
      c.map((f) => f.project)
    );
    return typeof d == "string" && d.length > 0 ? d : i === "selected" ? ur : dr;
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
  if (e.id === "openTabs") return Ls(t);
  if (e.id === "selection") return As(t, e);
  if (!e.getGroupKey) return He(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((c) => {
    const d = a(c.project);
    if (d === void 0 || d === "") {
      n.push(c);
      return;
    }
    const u = r.get(d);
    u ? u.push(c) : r.set(d, [c]);
  });
  const s = [...r.entries()].map(([c, d]) => {
    var y;
    const u = [...d].sort(
      (x, w) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, w.project)) || zt(x, w);
      }
    ), f = ((y = e.getSectionHeading) == null ? void 0 : y.call(
      e,
      c,
      u.map((x) => x.project)
    )) ?? c;
    return { key: c, heading: f, rows: u };
  });
  s.sort((c, d) => c.key === e.priorityKey ? -1 : d.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: c.key, heading: c.heading },
    { key: d.key, heading: d.heading }
  ) : c.heading.localeCompare(d.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: c, heading: d, rows: u }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: c,
    label: d,
    rows: u,
    isPriority: c === e.priorityKey
  }));
  return n.length > 0 && e.unknownSectionHeading && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...n].sort(zt)
  }), i;
}
const Tc = [
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
  if (!(typeof r != "string" || !hn(r)))
    return r;
}
const le = "recent", Ps = "other";
function Sn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function Os(t) {
  const e = t ?? {};
  return [
    Sn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Wt.lastUsedAt]) == "number" ? le : Ps;
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
          (c) => {
            var d;
            return typeof ((d = c.customData) == null ? void 0 : d[Wt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Wt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Lc = Os();
function Ms(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? ur : e.unselectedSectionHeading ?? dr
  };
}
function Ac(t) {
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
function Dc(t) {
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
const Rs = 100, ot = {
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
  autoSelectionUnselectedSectionHeading: dr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Bs(t) {
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
function Pc(t) {
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
  return sa[Bo(t)] ?? String(t);
}
const $r = "platform.footerAction", js = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Gs({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = te(t);
  return e ? /* @__PURE__ */ o(
    we,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: js,
      children: r
    }
  ) : /* @__PURE__ */ o(we, { variant: "secondary", children: r });
}
function zs({
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
    open: u,
    onPointerEnter: f,
    onPointerLeave: y
  } = ya(), [x, w] = P(!1), v = jn(), p = t.isDisabled && !!t.disabledReason, E = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || p, K = u || x, G = _(() => {
    if (E) {
      w(!0);
      return;
    }
    f();
  }, [E, f]), W = _(() => {
    w(!1), y();
  }, [y]);
  let k;
  e === "project" ? t.openGroups.length > 0 && (k = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((L) => /* @__PURE__ */ o(we, { variant: "secondary", children: te(L) }, L)) })) : t.scrollGroupId !== void 0 && (k = /* @__PURE__ */ m("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      Gs,
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
        onClick: (L) => {
          L.stopPropagation(), a(t);
        },
        onMouseDown: (L) => L.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(vo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const M = /* @__PURE__ */ m(
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
        c && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ m(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              jo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        k,
        p && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), z = t.scrollGroupId !== void 0 ? te(t.scrollGroupId) : void 0, Z = t.isBoundButClosed && z ? r.boundButClosedTooltip.replace("{group}", z) : void 0;
  return /* @__PURE__ */ m(St, { open: K, delayDuration: 400, children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: M }),
    /* @__PURE__ */ m(
      Et,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: Qr(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && z && /* @__PURE__ */ m("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ m("span", { className: "tw:text-muted-foreground", children: [
              " (",
              z,
              ")"
            ] })
          ] }),
          Z && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: Z }),
          (i == null ? void 0 : i.label) && /* @__PURE__ */ o("div", { className: "tw:text-sm", "aria-hidden": !0, children: i.label }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: t.disabledReason })
        ]
      }
    )
  ] });
}
const Xt = "none";
function Hs({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Xt;
  return /* @__PURE__ */ m(or, { children: [
    /* @__PURE__ */ m(St, { children: [
      /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(ar, { asChild: !0, children: /* @__PURE__ */ o(
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
          children: /* @__PURE__ */ o(No, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(Et, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ m(
      sr,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: pe },
        children: [
          /* @__PURE__ */ o(ir, { children: n.groupSectionLabel }),
          /* @__PURE__ */ m(xa, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Mr, { value: Xt, children: n.groupByNone }),
            /* @__PURE__ */ o(cr, {}),
            t.map((s) => /* @__PURE__ */ o(Mr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function Us(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Xt) return Xt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Xt;
}
function Oc(t) {
  const [e, r] = P(!1), [n, a] = P(""), s = ut(() => Bs(t.localizedStrings), [t.localizedStrings]), i = ut(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const h = [];
    return t.openTabs.length > 0 && h.push(Sn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && h.push(
      Ms({
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
  ]), [c, d] = P(void 0), u = ut(
    () => Us(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), f = c ?? u, y = C(null), [x, w] = P(void 0), v = _((h) => {
    r(h), h || (a(""), w(void 0));
  }, []);
  U(() => {
    if (!e) return;
    const h = window.requestAnimationFrame(() => {
      const A = y.current;
      A && A.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(h);
  }, [e]);
  const p = ut(() => t.mode === "project" ? De({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), E = ut(() => {
    const h = n.trim().toLowerCase();
    return h ? p.filter(
      (A) => A.shortName.toLowerCase().includes(h) || (A.fullName ?? "").toLowerCase().includes(h)
    ) : p;
  }, [p, n]), K = ut(
    () => new Map(t.projects.map((h) => [dt(h.id), h])),
    [t.projects]
  ), G = _(
    (h) => h === void 0 ? void 0 : K.get(dt(h)),
    [K]
  ), { renderProjectIndicator: W } = t, k = _(
    (h) => W ? W(h.project) : void 0,
    [W]
  ), M = !!W, z = !!t.footerAction && E.length === 0, Z = ut(() => {
    if (f === Xt) return He(E);
    const h = i.find((A) => A.id === f);
    return h ? Ds(E, h) : He(E);
  }, [E, f, i]), L = (h) => {
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
  }, ft = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, gt = t.mode === "project" ? t.renderTriggerLabel : void 0, Lt = t.mode === "project" ? t.triggerLabelFormat : void 0, J = ut(() => {
    switch (t.mode) {
      case "project": {
        const h = G(t.selection.projectId);
        if (gt)
          return { node: gt(h), title: "", hasSelection: !!h };
        let A = h ? h.shortName : s.buttonPlaceholder;
        return h && Lt === "shortNameAndFullName" && (A = Qr(h)), { node: A, title: A, hasSelection: !!h };
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
            /* @__PURE__ */ o(we, { variant: "muted", className: "tw:shrink-0", children: Q }),
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
    gt,
    Lt,
    s.buttonPlaceholder
  ]), Rt = C(null), [Ut, At] = P(!1);
  U(() => {
    const h = Rt.current;
    if (!h) return;
    const A = (Q) => {
      At(Q < Rs);
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
  t.isLoading ? H = /* @__PURE__ */ o(yo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Ut ? H = void 0 : t.mode === "project-multi" ? H = /* @__PURE__ */ o(Wr, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : H = /* @__PURE__ */ o(xo, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const it = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? L : void 0, rt = s.ariaLabel && J.hasSelection && J.title ? `${s.ariaLabel}: ${J.accessibleTitle ?? J.title}` : s.ariaLabel || void 0, wt = /* @__PURE__ */ m(
    Y,
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
  ), Dt = J.title ? /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(St, { children: [
    /* @__PURE__ */ o(kt, { asChild: !0, children: /* @__PURE__ */ o(Ge, { asChild: !0, children: wt }) }),
    /* @__PURE__ */ o(Et, { dir: "auto", children: J.title })
  ] }) }) : /* @__PURE__ */ o(Ge, { asChild: !0, children: wt }), Bt = i.length > 1;
  return /* @__PURE__ */ m(rr, { open: e, onOpenChange: v, children: [
    Dt,
    /* @__PURE__ */ o(
      nr,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(_t, { delayDuration: 400, children: /* @__PURE__ */ m(
          We,
          {
            shouldFilter: !1,
            value: z ? x ?? $r : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ m("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
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
                Bt && /* @__PURE__ */ o(
                  Hs,
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
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Y, { variant: "ghost", size: "sm", onClick: ft, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ m(Ze, { children: [
                /* @__PURE__ */ o(Qe, { children: s.commandEmptyMessage }),
                Z.map((h, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ m(
                    $e,
                    {
                      children: [
                        /* @__PURE__ */ o(fe, { heading: Ks(h, s), children: h.rows.map((F) => /* @__PURE__ */ o(
                          zs,
                          {
                            row: F,
                            mode: t.mode,
                            strings: s,
                            onClick: st,
                            onOpen: it,
                            selectedRowRef: y,
                            indicator: k(F),
                            reserveIndicatorSlot: M
                          },
                          F.rowKey
                        )) }),
                        A < Z.length - 1 && /* @__PURE__ */ o(Be, { alwaysRender: !0 })
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
                      value: $r,
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
const Fs = Vr(
  ({ value: t, onSearch: e, placeholder: r, isFullWidth: n, className: a, isDisabled: s = !1, id: i }, c) => {
    const d = ht();
    return /* @__PURE__ */ m(
      "div",
      {
        id: i,
        className: g("tw:relative tw:@container/search", { "tw:w-full": n }, a),
        children: [
          /* @__PURE__ */ o(
            Yr,
            {
              className: g(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            on,
            {
              ref: c,
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
                /* @__PURE__ */ o(Jr, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
Fs.displayName = "SearchBar";
const $s = 5;
function Mc(t) {
  return aa(t).filter(
    (e) => !at.isObsolete(at.bookIdToNumber(e))
  );
}
function qs(t, e) {
  return t.filter((r) => {
    try {
      return Go(r) === e;
    } catch {
      return !1;
    }
  });
}
const Rc = (t, e, r) => qs(t, e).every((n) => r.includes(n));
function Vs(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => at.bookIdToNumber(n) > 0).sort((n, a) => at.bookIdToNumber(n) - at.bookIdToNumber(a)).map((n) => ia(n, e));
}
function Bc(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), s = new Set(e.map((c) => c.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((c) => a.has(c)))
    return r;
  const i = Vs(t, n);
  if (i.length !== 0)
    return i.length <= $s ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function jc({ name: t, className: e }) {
  const r = _s(t) ? lr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: g("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function Gc({ message: t, id: e, className: r }) {
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
function Js({ className: t, ...e }) {
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
function Xs({ className: t, ...e }) {
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
const Ws = Mt(
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
function Ys({
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
        Ws({ variant: e }),
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
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function Zs({ className: t, ...e }) {
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
function Qs({ className: t, ...e }) {
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
function Hc({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ m(Js, { className: g(s), role: a, children: [
    /* @__PURE__ */ m(Xs, { children: [
      /* @__PURE__ */ o(Ys, { variant: "icon", children: n ?? /* @__PURE__ */ o(So, {}) }),
      /* @__PURE__ */ o(Zs, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Qs, { children: /* @__PURE__ */ o(Y, { onClick: () => r(), children: e }) })
  ] });
}
const ti = Vr(({ className: t, ...e }, r) => /* @__PURE__ */ o(ko, { size: 35, className: g("tw:animate-spin", t), ...e, ref: r }));
ti.displayName = "Spinner";
const ei = Mt(
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
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ei({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function Kc({ className: t, ...e }) {
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
function Fc({ className: t, ...e }) {
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
function $c({
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
function ue(t) {
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
    Xe.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: ue(t),
      minSize: ue(e),
      maxSize: ue(r),
      collapsedSize: ue(n),
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
    Xe.Separator,
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
  Gi as A,
  Y as B,
  me as C,
  or as D,
  er as E,
  fn as F,
  Ze as G,
  Qe as H,
  ic as I,
  lc as J,
  Si as K,
  Hi as L,
  Ci as M,
  Ii as N,
  Ai as O,
  Di as P,
  Ti as Q,
  cc as R,
  Ne as S,
  _t as T,
  Sa as U,
  uc as V,
  we as W,
  da as X,
  wc as Y,
  fc as Z,
  cr as _,
  ia as a,
  Va as a$,
  ca as a0,
  tn as a1,
  bc as a2,
  vc as a3,
  pc as a4,
  mc as a5,
  Nc as a6,
  hc as a7,
  ec as a8,
  xa as a9,
  Fi as aA,
  gn as aB,
  ge as aC,
  be as aD,
  un as aE,
  Zo as aF,
  ta as aG,
  ze as aH,
  Uc as aI,
  Fc as aJ,
  Kc as aK,
  Vi as aL,
  Ei as aM,
  Li as aN,
  Yo as aO,
  Wo as aP,
  ki as aQ,
  ss as aR,
  Js as aS,
  Qs as aT,
  Zs as aU,
  Xs as aV,
  Ys as aW,
  Gc as aX,
  zc as aY,
  Ic as aZ,
  Es as a_,
  Mr as aa,
  xc as ab,
  Cc as ac,
  Ec as ad,
  on as ae,
  _s as af,
  Oc as ag,
  Fs as ah,
  Mc as ai,
  qs as aj,
  Be as ak,
  Bi as al,
  Rc as am,
  Ji as an,
  cn as ao,
  _i as ap,
  sa as aq,
  jc as ar,
  qi as as,
  $i as at,
  nc as au,
  jr as av,
  ac as aw,
  oc as ax,
  tc as ay,
  sc as az,
  St as b,
  Ua as b$,
  gs as b0,
  ma as b1,
  Yi as b2,
  Xi as b3,
  Wi as b4,
  Vc as b5,
  qc as b6,
  $c as b7,
  Hc as b8,
  ti as b9,
  Xt as bA,
  ot as bB,
  Tc as bC,
  Zi as bD,
  Sc as bE,
  kc as bF,
  Xo as bG,
  Ac as bH,
  Pc as bI,
  Dc as bJ,
  vn as bK,
  za as bL,
  Lc as bM,
  Pa as bN,
  ja as bO,
  ha as bP,
  Ga as bQ,
  Ha as bR,
  Le as bS,
  Da as bT,
  Os as bU,
  Ms as bV,
  vs as bW,
  xi as bX,
  Oa as bY,
  Ma as bZ,
  Ka as b_,
  yc as ba,
  gc as bb,
  Qi as bc,
  as as bd,
  pe as be,
  yi as bf,
  vi as bg,
  Jo as bh,
  Vo as bi,
  bi as bj,
  gi as bk,
  Ni as bl,
  hi as bm,
  Ca as bn,
  fa as bo,
  en as bp,
  an as bq,
  Ur as br,
  dc as bs,
  ls as bt,
  cs as bu,
  sn as bv,
  La as bw,
  is as bx,
  Mi as by,
  _c as bz,
  g as c,
  Ct as c0,
  Bc as c1,
  Fa as c2,
  $a as c3,
  qa as c4,
  kt as d,
  Et as e,
  Ki as f,
  ji as g,
  ar as h,
  sr as i,
  ir as j,
  rc as k,
  Oi as l,
  zi as m,
  fe as n,
  ht as o,
  oa as p,
  Ri as q,
  nt as r,
  rr as s,
  Ui as t,
  ya as u,
  Ge as v,
  nr as w,
  Pi as x,
  We as y,
  Ye as z
};
//# sourceMappingURL=resizable-CV2Exr2E.js.map
