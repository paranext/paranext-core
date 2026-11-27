import { jsx as o, jsxs as p, Fragment as xt } from "react/jsx-runtime";
import { Slot as Ye, Tooltip as Jt, Dialog as _t, Separator as qn, Popover as Zt, DropdownMenu as rt, Label as Vn, RadioGroup as He } from "radix-ui";
import { IconX as Jn, IconCheck as Ne, IconSearch as Wn, IconChevronLeft as Xn, IconChevronRight as Yn } from "@tabler/icons-react";
import { Canon as ct } from "@sillsdev/scripture";
import Nt, { createContext as Qr, useContext as Ze, useRef as E, useEffect as U, useCallback as _, useState as O, useMemo as ft, Fragment as ve, useLayoutEffect as ue, useImperativeHandle as Zn, useId as tn, forwardRef as en } from "react";
import { X as rn, Check as nn, ChevronsUpDown as on, Star as Qn, Undo as to, Redo as eo, SquareX as Qe, FunctionSquare as tr, SquareSigma as er, Ban as ro, Copy as no, Redo2 as oo, Undo2 as ao, Sparkles as so, ClipboardCopy as io, ClipboardCheck as co, CircleCheckBig as lo, MessageSquare as uo, Search as an, Library as fo, BookOpen as wo, BookMarked as po, Book as mo, MessageSquarePlus as ho, PanelBottom as go, FileText as bo, Scan as No, ZoomOut as vo, ZoomIn as yo, Eye as xo, Pencil as So, BookCopy as ko, Users as Co, ExternalLink as Eo, CircleQuestionMark as Io, Settings as _o, BookA as To, House as Lo, Download as Ao, RefreshCw as Do, Group as Oo, ArrowRight as Mo, Loader2 as Po, ChevronDown as Ro, MenuIcon as Or, AlertTriangle as Bo, LoaderCircle as jo } from "lucide-react";
import { cva as Pt } from "class-variance-authority";
import { filterAndRankItems as Mr, GENERATOR_NOTE_CALLER as Ue, HIDDEN_NOTE_CALLER as Ke, isInsertEmbedOpOfType as Vt, getDefaultViewOptions as Go, getMarkerMenuItems as zo, defaultStyleInfo as Pr, Editorial as Ho } from "@eten-tech-foundation/platform-editor";
import { Section as Mt, MODIFIER_KEYS as Uo, includes as Ko, formatReplacementStringToArray as Fo, split as sn, slice as $o, formatReplacementString as qo, usfmMarkers as fe, deepEqual as Gt, isPlatformError as cn, ABORTED as ln, getErrorMessage as Vo, normalizeProjectId as mt, compareProjectsByName as Jo, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as Xt, formatProjectName as dn, getLocalizeKeyForScrollGroupId as Wo, hasDistinctFullName as Xo, getSectionForBook as Yo, FAILED_PRECONDITION as Zo, RESOURCE_EXHAUSTED as Qo } from "platform-bible-utils";
import { Command as Ut } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import { flushSync as ta } from "react-dom";
import * as rr from "react-resizable-panels";
import { clsx as ea } from "clsx";
import { extendTailwindMerge as ra, twMerge as na } from "tailwind-merge";
const oa = ra({ prefix: "tw" });
function Fe(t) {
  const e = [];
  let r = "", n = 0;
  for (let a = 0; a < t.length; a++) {
    const s = t[a];
    s === "[" ? n += 1 : s === "]" && (n -= 1), s === ":" && n === 0 ? (e.push(r), r = "") : r += s;
  }
  return e.push(r), e;
}
function aa(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Fe(t), r = e.findIndex((s) => s.startsWith("-tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((f, l) => l !== r), `-${s}`].join(":")}`, original: t };
  }
  const n = e.findIndex((s) => s.startsWith("!tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((f, l) => l !== n), `!${s}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const s = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function sa(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = Fe(t);
  if (r[0] !== "tw") return t;
  const n = r.slice(1, -1), a = r[r.length - 1], s = Fe(e), i = s.some((f) => f.startsWith("-tw-")), c = s.some((f) => f.startsWith("!tw-"));
  if (i && a.startsWith("-")) {
    const f = a.slice(1);
    return [...n, `-tw-${f}`].join(":");
  }
  if (c && a.startsWith("!")) {
    const f = a.slice(1);
    return [...n, `!tw-${f}`].join(":");
  }
  return [...n, `tw-${a}`].join(":");
}
function h(...t) {
  const e = ea(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return oa(e);
  const r = e.split(" ").filter(Boolean), n = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((f) => {
    const l = aa(f);
    n.set(l.normalized, l.original), a.push(l.normalized);
  }), na(a.join(" ")).split(" ").filter(Boolean).map((f) => {
    const l = n.get(f);
    return l ? sa(f, l) : f;
  }).join(" ");
}
const nr = 600, ye = 650, Ji = 400, ia = 450, ca = 500, Wi = 510, Xi = 520, la = 675, Yi = 690, Zi = 700, Qi = 800, un = Pt(
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
function vt() {
  var t;
  try {
    const e = (t = wn()) == null ? void 0 : t.getItem(fn);
    if (e === "rtl")
      return e;
  } catch {
  }
  return "ltr";
}
function tc(t) {
  var e;
  try {
    (e = wn()) == null || e.setItem(fn, t);
  } catch {
  }
}
function pn() {
  const t = Nt.createContext(null);
  function e({
    container: n,
    children: a
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: n, children: a });
  }
  function r() {
    return Nt.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: r };
}
const ec = Object.freeze([
  "inTooltip",
  "shortcutKeysLocalization"
]);
function da(t) {
  return Symbol.for(`platform-bible-react.context.${t}`);
}
function mn(t, e) {
  const r = da(t), n = globalThis, a = n[r];
  if (a) return a;
  const s = Qr(e);
  return n[r] = s, s;
}
const hn = mn("inTooltip", !1);
function ua() {
  return Ze(hn);
}
function wt({
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
function nt({ ...t }) {
  return /* @__PURE__ */ o(Jt.Root, { "data-slot": "tooltip", ...t });
}
function ot({
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
const { PortalContainerProvider: fa, usePortalContainer: wa } = pn(), rc = fa;
function at({
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
  const c = wa();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(Jt.Portal, { container: c, children: /* @__PURE__ */ p(
      Jt.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: la, ...r },
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          /* @__PURE__ */ o(hn.Provider, { value: !0, children: s }),
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
const pa = /^%[^%]*%$/;
function gn(t) {
  return t !== void 0 && !pa.test(t) && t.trim() !== "";
}
function Q(t, e) {
  return gn(t) ? t : e;
}
function nc({ ...t }) {
  return /* @__PURE__ */ o(_t.Root, { "data-slot": "dialog", ...t });
}
function oc({ ...t }) {
  return /* @__PURE__ */ o(_t.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function ma({ ...t }) {
  return /* @__PURE__ */ o(_t.Portal, { "data-slot": "dialog-portal", ...t });
}
function ac({ ...t }) {
  return /* @__PURE__ */ o(_t.Close, { "data-slot": "dialog-close", ...t });
}
function ha({
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
      style: { zIndex: ia, ...e },
      ...r
    }
  );
}
function sc({
  className: t,
  children: e,
  showCloseButton: r = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: n,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle: a,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: s,
  // CUSTOM: Destructure closeButtonLabel so it labels the close button instead of reaching the DOM
  closeButtonLabel: i,
  ...c
}) {
  const f = vt(), l = Q(i, "Close");
  return /* @__PURE__ */ p(ma, { children: [
    /* @__PURE__ */ o(ha, { className: n, style: a }),
    /* @__PURE__ */ p(
      _t.Content,
      {
        "data-slot": "dialog-content",
        className: h(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ca, ...s },
        dir: f,
        ...c,
        children: [
          e,
          r && /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
            /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(_t.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(Z, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
              /* @__PURE__ */ o(Jn, {}),
              /* @__PURE__ */ o("span", { className: "tw:sr-only", children: l })
            ] }) }) }),
            /* @__PURE__ */ o(at, { children: l })
          ] }) })
        ]
      }
    )
  ] });
}
function ic({ className: t, ...e }) {
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
function cc({
  className: t,
  showCloseButton: e = !1,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ p(
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
function lc({ className: t, ...e }) {
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
function dc({
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
function bn({ className: t, type: e, ...r }) {
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
function ga({ className: t, ...e }) {
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
const ba = Pt(
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
function Na({
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
        className: h(ba({ align: e }), t),
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
function or({ className: t, ...e }) {
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
function ar({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: r = !1,
  ...n
}) {
  const a = vt(), s = Nt.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !r || i.key !== " " || i.currentTarget.value !== "") return;
      const c = i.currentTarget.closest("[cmdk-root]"), f = c == null ? void 0 : c.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      f && (i.preventDefault(), i.stopPropagation(), f.click());
    },
    [e, r]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: a, children: /* @__PURE__ */ p(ga, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
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
      /* @__PURE__ */ o(Na, { children: /* @__PURE__ */ o(Wn, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function sr({ className: t, ...e }) {
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
function ir({
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
function xe({
  className: t,
  children: e,
  "data-checked": r,
  ...n
}) {
  return /* @__PURE__ */ p(
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
          Ne,
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
function va({ className: t, ...e }) {
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
const ya = [
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
], xa = (t) => {
  var e;
  return ((e = ya[t]) == null ? void 0 : e.chapters) ?? -1;
}, Sa = ct.allBookIds.filter(
  (t) => !ct.isObsolete(ct.bookIdToNumber(t))
);
function ka(t) {
  const e = [], r = Math.min(t.length, ct.allBookIds.length);
  for (let n = 0; n < r; n += 1)
    t[n] === "1" && e.push(ct.bookNumberToId(n + 1));
  return e;
}
function j(t) {
  return `%scrollGroup_${t}%`;
}
const Ca = {
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
function cr(t, e) {
  return xa(ct.bookIdToNumber(t));
}
function Se(t, e, r) {
  const n = ct.bookIdToNumber(t);
  let a, s = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = ct.bookIdToNumber(i);
    (r === "next" ? c > n && c < s : c < n && c > s) && (a = i, s = c);
  }), a;
}
function uc(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a > 1)
    return { book: n, chapterNum: a - 1, verseNum: 1 };
  const s = Se(n, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(cr(s), 1),
      verseNum: 1
    };
}
function fc(t, e, r) {
  const { book: n, chapterNum: a } = t;
  if (e.includes(n) && a < cr(n))
    return { book: n, chapterNum: a + 1, verseNum: 1 };
  const s = Se(n, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function wc(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return s > 1 ? { book: n, chapterNum: a, verseNum: s - 1 } : s === 1 && a === 1 ? { book: n, chapterNum: 1, verseNum: 0 } : { book: n, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const i = Se(n, e, "previous");
  if (!i) return;
  const c = Math.max(cr(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function pc(t, e, r) {
  const { book: n, chapterNum: a, verseNum: s } = t;
  if (e === void 0 || e.includes(n))
    return { book: n, chapterNum: a, verseNum: s + 1 };
  const i = Se(n, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function mc(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const hc = (t, e, r, n, a) => {
  switch (t) {
    case Mt.OT:
      return e ?? "Old Testament";
    case Mt.NT:
      return r ?? "New Testament";
    case Mt.DC:
      return n ?? "Deuterocanon";
    case Mt.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, gc = (t, e, r, n, a) => {
  switch (t) {
    case Mt.OT:
      return e ?? "OT";
    case Mt.NT:
      return r ?? "NT";
    case Mt.DC:
      return n ?? "DC";
    case Mt.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function bc(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedName) ?? ct.bookIdToEnglishName(t);
}
function Ea(t, e) {
  var n;
  return ((n = e == null ? void 0 : e.get(t)) == null ? void 0 : n.localizedId) ?? t.toUpperCase();
}
const Nc = Object.fromEntries(
  Sa.map((t) => [t, ct.bookIdToEnglishName(t)])
);
function vc(t, e, r) {
  const n = e.trim().toLowerCase();
  if (!n) return !1;
  const a = ct.bookIdToEnglishName(t), s = r == null ? void 0 : r.get(t);
  return !!(a.toLowerCase().includes(n) || t.toLowerCase().includes(n) || (s ? s.localizedName.toLowerCase().includes(n) || s.localizedId.toLowerCase().includes(n) : !1));
}
function Nn() {
  try {
    return window.top !== window;
  } catch {
    return !0;
  }
}
function vn(t, e) {
  return t.activeElement instanceof HTMLIFrameElement || !t.hasFocus() && e;
}
function yn(t) {
  vn(document, Nn()) || t();
}
function Rr(t) {
  if (t.id)
    return Array.from(t.ownerDocument.querySelectorAll("[aria-controls]")).find(
      (e) => e.getAttribute("aria-controls") === t.id && !t.contains(e)
    );
}
function Br(t) {
  const e = t.getAttribute("aria-labelledby"), r = e ? t.ownerDocument.getElementById(e) : void 0;
  return r && !t.contains(r) ? r : void 0;
}
function Ia(t, e) {
  const [r] = O(Nn), n = E(t);
  n.current = t;
  const a = E(e);
  return a.current = e, _(
    (s) => {
      var f, l;
      if ((f = n.current) == null || f.call(n, s), s.defaultPrevented) return;
      if (vn(document, r)) {
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
const xn = Symbol.for("platform-bible-react.window-blur-press");
function _a(t) {
  return Reflect.get(t, xn) === !0;
}
function Sn({
  ref: t,
  onCloseAutoFocus: e
}) {
  const r = E(void 0), n = E(void 0), a = E(void 0);
  U(() => {
    const l = () => {
      const d = r.current;
      if (!d || d.dataset.state === "closed") return;
      const b = d.parentElement;
      if (!b) return;
      const x = { bubbles: !0, pointerType: "mouse" }, w = typeof PointerEvent > "u" ? new MouseEvent("pointerdown", x) : new PointerEvent("pointerdown", x);
      Object.defineProperty(w, xn, { value: !0 }), b.dispatchEvent(w);
    };
    return window.addEventListener("blur", l), () => window.removeEventListener("blur", l);
  }, []);
  const s = _(
    (l) => {
      if (r.current = l ?? void 0, l && l !== n.current && (n.current = l, a.current = Rr(l) ?? Br(l)), typeof t == "function") {
        const d = t(l);
        if (typeof d == "function")
          return () => {
            r.current = void 0, d();
          };
      } else t && (t.current = l);
    },
    [t]
  ), i = _(() => {
    var x;
    const l = n.current, d = (x = a.current) != null && x.isConnected ? a.current : void 0, b = (l && Rr(l)) ?? d ?? (l && Br(l));
    return b != null && b.isConnected ? b : void 0;
  }, []), c = Ia(
    e,
    i
  ), f = _(
    (l) => {
      c(l), r.current || (n.current = void 0, a.current = void 0);
    },
    [c]
  );
  return { ref: s, onCloseAutoFocus: f };
}
const jr = `
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
function Ta(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Qt(t, e) {
  const r = e ? `${jr}, ${e}` : jr;
  return Array.from(t.querySelectorAll(r)).filter(
    (n) => !n.hasAttribute("disabled") && !n.getAttribute("aria-hidden") && Ta(n)
  );
}
const yc = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let qe = "keyboard", Gr = !1;
function La() {
  Gr || typeof document > "u" || (Gr = !0, document.addEventListener(
    "pointerdown",
    (t) => {
      _a(t) || (qe = "pointer");
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
function zr() {
  return qe;
}
const kn = "data-quiet-focus";
function Hr(t) {
  t && (typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(forced-colors: active)").matches || (t.setAttribute(kn, ""), t.style.outline = "none"));
}
function Aa(t) {
  t && (t.removeAttribute(kn), t.style.removeProperty("outline"));
}
const Ur = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function Da({
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
const Oa = Pt(
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
function lr({
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
        Oa({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function xc({
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
function Cn({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ o(
    Da,
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
function dr({ ...t }) {
  return /* @__PURE__ */ o(Zt.Root, { "data-slot": "popover", ...t });
}
function Ve({ ...t }) {
  return /* @__PURE__ */ o(Zt.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: Ma, usePortalContainer: Pa } = pn(), Sc = Ma;
function ur({
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
  const c = vt(), f = Pa(), l = Sn({ ref: a, onCloseAutoFocus: s });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Zt.Portal, { container: f, children: /* @__PURE__ */ o(
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
        style: { zIndex: nr, ...n },
        dir: c,
        ...i
      }
    ) })
  );
}
function Ra({ ...t }) {
  return /* @__PURE__ */ o(Zt.Anchor, { "data-slot": "popover-anchor", ...t });
}
function kc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: h("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Cc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: h("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ec({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: h("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Ba() {
  const [t, e] = O(!1), r = E(null), n = _(() => {
    const s = r.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), a = _(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: n, onPointerLeave: a };
}
function ja() {
  U(() => {
    La();
  }, []);
}
const En = Qr(void 0);
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
function ee({ variant: t = "default", ...e }) {
  const r = vt(), n = Nt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(En.Provider, { value: n, children: /* @__PURE__ */ o(rt.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function Ga({
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
  ref: s,
  onCloseAutoFocus: i,
  ...c
}) {
  const f = vt(), l = Sn({ ref: s, onCloseAutoFocus: i });
  return /* @__PURE__ */ o(rt.Portal, { children: /* @__PURE__ */ o(
    rt.Content,
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
      style: { zIndex: nr, ...n },
      ...c,
      children: /* @__PURE__ */ o("div", { dir: f, children: a })
    }
  ) });
}
function za({ ...t }) {
  return /* @__PURE__ */ o(rt.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ha({
  className: t,
  inset: e,
  variant: r = "default",
  ...n
}) {
  const a = vt(), s = ke();
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
  const s = vt(), i = ke();
  return /* @__PURE__ */ p(
    rt.CheckboxItem,
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
            children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Ne, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ua({
  ...t
}) {
  return /* @__PURE__ */ o(rt.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Kr({
  className: t,
  children: e,
  inset: r,
  ...n
}) {
  const a = vt(), s = ke();
  return /* @__PURE__ */ p(
    rt.RadioItem,
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
            children: /* @__PURE__ */ o(rt.ItemIndicator, { children: /* @__PURE__ */ o(Ne, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ee({ className: t, inset: e, ...r }) {
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
function Fa({ ...t }) {
  return /* @__PURE__ */ o(rt.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function $a({
  className: t,
  inset: e,
  children: r,
  ...n
}) {
  const a = ke(), s = vt();
  return /* @__PURE__ */ p(
    rt.SubTrigger,
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
function qa({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: r,
  ...n
}) {
  const a = vt();
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
      style: { zIndex: ye, ...e },
      ...n,
      children: /* @__PURE__ */ o("div", { dir: a, children: r })
    }
  );
}
function Ic({ className: t, ...e }) {
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
function _c({
  className: t,
  ...e
}) {
  const r = vt();
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
function Tc({
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
const Lc = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), Fr = (t, e) => t[e] ?? e;
function Va({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: r = !0,
  localizedStrings: n = {},
  className: a = "tw:h-6 tw:w-6",
  acceptLabel: s
}) {
  const i = Fr(n, "%cancelButton_tooltip%"), c = s ?? Fr(n, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(lr, { children: [
    /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ o(rn, {})
        }
      ) }),
      /* @__PURE__ */ o(at, { children: /* @__PURE__ */ o("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ o(Cn, {}),
    /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": c,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !r,
          children: /* @__PURE__ */ o(nn, {})
        }
      ) }),
      /* @__PURE__ */ o(at, { children: /* @__PURE__ */ o("p", { children: c }) })
    ] }) })
  ] });
}
function Ie() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Ac() {
  return /Windows/i.test(navigator.userAgent);
}
const Ja = ["input", "select", "textarea", "button"], Wa = ["button", "textbox"], Dc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: n
}) => {
  const a = E(null), [s, i] = O(void 0), [c, f] = O(void 0), l = _(
    (w) => {
      i(w);
      const v = t.find((S) => S.id === w);
      v && (e == null || e(v));
      const m = document.getElementById(w);
      m && (m.scrollIntoView({ block: "center" }), m.focus()), a.current && a.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), d = _(
    (w) => {
      const v = t.find((m) => m.id === w);
      v && (f((m) => m === w ? void 0 : w), r == null || r(v));
    },
    [r, t]
  ), b = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || Ja.includes(v)) return !0;
    const m = w.getAttribute("role");
    if (m && Wa.includes(m)) return !0;
    const S = w.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, x = _(
    (w) => {
      var W;
      const v = w.target, m = (L) => L ? document.getElementById(L) : void 0, S = m(c), M = m(s);
      if (!!(S && v && S.contains(v) && v !== S) && b(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (c) {
            w.preventDefault(), w.stopPropagation();
            const L = t.find((lt) => lt.id === c);
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
          const lt = L.findIndex((yt) => yt === v);
          if (lt === -1) return;
          let ht;
          w.key === "ArrowDown" ? ht = Math.min(lt + 1, L.length - 1) : ht = Math.max(lt - 1, 0), ht !== lt && (w.preventDefault(), w.stopPropagation(), (W = L[ht]) == null || W.focus());
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
          s && d(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const L = M;
          if (L) {
            const lt = L.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), ht = L.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), yt = lt ?? ht;
            if (yt) {
              w.preventDefault(), yt.focus();
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
    [t, l, s, c, d, n]
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
}, Xa = Pt(
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
        Xa({ variant: e }),
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
function Mc({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: r,
  ...n
}) {
  const a = Nt.useRef(null);
  Nt.useEffect(() => {
    typeof r == "function" ? r(a.current) : r && "current" in r && (r.current = a.current);
  }, [r]), Nt.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const c = () => {
      requestAnimationFrame(() => {
        Qt(i, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
          d.setAttribute("tabindex", "-1");
        });
      });
    };
    c();
    const f = new MutationObserver(() => {
      c();
    });
    return f.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      f.disconnect();
    };
  }, []);
  const s = (i) => {
    var f;
    const { current: c } = a;
    if (c && In(i, c)) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), (f = Qt(c)[0]) == null || f.focus();
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
function Pc({
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
function Rc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: h("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Bc({ className: t, ...e }) {
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
function Ya(t) {
  Nt.useEffect(() => {
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
function Za(t, e, r) {
  let n;
  return r === "ArrowLeft" && e > 0 ? n = t[e - 1] : r === "ArrowRight" && e < t.length - 1 && (n = t[e + 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function Qa(t, e, r) {
  let n;
  return r === "ArrowDown" && e < t.length - 1 ? n = t[e + 1] : r === "ArrowUp" && e > 0 && (n = t[e - 1]), n ? (requestAnimationFrame(() => n.focus()), !0) : !1;
}
function jc({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: r,
  setFocusAlsoRunsSelect: n = !1,
  ref: a,
  ...s
}) {
  const i = Nt.useRef(null);
  Nt.useEffect(() => {
    typeof a == "function" ? a(i.current) : a && "current" in a && (a.current = i.current);
  }, [a]), Ya(i);
  const c = Nt.useMemo(
    () => i.current ? Qt(i.current) : [],
    [i]
  ), f = Nt.useCallback(
    (d) => {
      const { current: b } = i;
      if (!b || !b.parentElement) return;
      if (!In(d, b)) {
        e == null || e(d);
        return;
      }
      const x = b.closest("table"), w = x ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Qt(x).filter(
          (S) => S.tagName === "TR"
        )
      ) : [], v = w.indexOf(b), m = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), Qa(w, v, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Za(c, m, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const S = b.closest("table");
        S && S.focus();
      }
      e == null || e(d);
    },
    [i, c, e]
  ), l = Nt.useCallback(
    (d) => {
      n && (r == null || r(d));
    },
    [n, r]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: f,
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
function Gc({ className: t, ...e }) {
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
function zc({ className: t, ...e }) {
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
function Hc({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: h("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function ts(t, e = !0) {
  const [r, n] = O(!1);
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
function es({
  children: t,
  isEnabled: e,
  scrollerRef: r
}) {
  const n = ts(r, e);
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
function Uc({
  entries: t,
  selected: e,
  onChange: r,
  placeholder: n,
  searchPlaceholder: a,
  hasToggleAllFeature: s = !1,
  selectAllText: i = "Select All",
  clearAllText: c = "Clear All",
  commandEmptyMessage: f = "No entries found",
  customSelectedText: l,
  isOpen: d = void 0,
  onOpenChange: b = void 0,
  isDisabled: x = !1,
  sortSelected: w = !1,
  showScrollCue: v = !1,
  icon: m = void 0,
  className: S = void 0,
  variant: M = "ghost",
  id: G
}) {
  const [J, k] = O(!1), P = E(null), R = _(
    (K) => {
      var st;
      const dt = (st = t.find((gt) => gt.label === K)) == null ? void 0 : st.value;
      dt && r(
        e.includes(dt) ? e.filter((gt) => gt !== dt) : [...e, dt]
      );
    },
    [t, e, r]
  ), W = () => l || n, L = d ?? J, lt = b ?? k, [ht, yt] = O(L), [Lt, X] = O(e);
  ht !== L && (yt(L), L && X(e));
  const Rt = ft(() => {
    if (!w) return t;
    const K = t.filter((st) => st.starred).sort((st, gt) => st.label.localeCompare(gt.label)), dt = t.filter((st) => !st.starred).sort((st, gt) => {
      const Dt = Lt.includes(st.value), Bt = Lt.includes(gt.value);
      return Dt && !Bt ? -1 : !Dt && Bt ? 1 : st.label.localeCompare(gt.label);
    });
    return [...K, ...dt];
  }, [t, Lt, w]), Kt = () => {
    const K = t.map((dt) => dt.value);
    X(K), r(K);
  }, At = () => {
    X([]), r([]);
  };
  return /* @__PURE__ */ o("div", { id: G, className: S, children: /* @__PURE__ */ p(dr, { open: L, onOpenChange: lt, children: [
    /* @__PURE__ */ o(Ve, { asChild: !0, children: /* @__PURE__ */ p(
      Z,
      {
        variant: M,
        role: "combobox",
        "aria-expanded": L,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: x,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            m && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: m }) }),
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
    /* @__PURE__ */ o(ur, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(or, { children: [
      /* @__PURE__ */ o(
        ar,
        {
          placeholder: a ?? n,
          spaceSelectsHighlightedItem: !0
        }
      ),
      s && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: Kt, children: i }),
        /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: At, children: c })
      ] }),
      /* @__PURE__ */ o(es, { isEnabled: v, scrollerRef: P, children: /* @__PURE__ */ p(sr, { ref: P, children: [
        /* @__PURE__ */ o(ir, { children: f }),
        /* @__PURE__ */ o(ge, { children: Rt.map((K) => /* @__PURE__ */ p(
          xe,
          {
            value: K.label,
            onSelect: R,
            "data-checked": e.includes(K.value),
            children: [
              K.starred && /* @__PURE__ */ o(Qn, { className: "tw:h-4 tw:w-4" }),
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
function It(t) {
  return t.replace(/^\+/, "");
}
function rs(t, e) {
  if (!t || e === "") return !1;
  const r = It(e).toLowerCase();
  return Object.values(t.markers).some(
    (n) => n.styleType === "note" && It(n.marker).toLowerCase() === r
  );
}
function ns(t, e, r) {
  if (!e) return [...t];
  const n = [...t], a = It(e).toLowerCase();
  return r === "passive" ? Mr({
    query: a,
    items: n,
    filter: (s) => It(s.label).toLowerCase().startsWith(a),
    sortBy: "label"
  }) : Mr({
    query: a,
    items: n,
    filter: (s) => It(s.label).toLowerCase().includes(a),
    sortBy: "label"
  });
}
function Yt(t) {
  return t.isComposing || t.keyCode === 229;
}
function os(t) {
  return t === "hidden";
}
const _n = /^[a-z0-9+-]$/i;
function as(t) {
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
const ss = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], is = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function cs() {
  return [...ss, ...is.filter((t) => _n.test(t))];
}
function bt(t) {
  t.preventDefault(), t.stopPropagation();
}
function ls(t, e, r) {
  var i, c;
  const { kind: n } = e;
  if (Yt(t) || Uo.has(t.key))
    return "passed";
  const a = !Ie();
  if ((t.ctrlKey || t.metaKey || t.altKey && a) && !((i = t.getModifierState) != null && i.call(t, "AltGraph")))
    return t.key === "Enter" && bt(t), r.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return bt(t), r.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return bt(t), ns(
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
    return bt(t), r.dismiss(), "ended";
  if (t.key === " ") {
    if (n !== "selection") {
      if (bt(t), e.filter === "")
        return r.dismiss(), "ended";
      const d = It(e.filter).toLowerCase();
      if ((c = e.isNoteMarker) != null && c.call(e, d)) {
        const b = e.items.find(
          (x) => It(x.marker).toLowerCase() === d
        );
        return b && r.commitItem(b.marker), r.dismiss(), "ended";
      }
      return r.commitTyped(e.filter), r.dismiss(), "ended";
    }
    bt(t);
    const f = It(e.filter).toLowerCase(), l = e.items.find(
      (d) => It(d.marker).toLowerCase() === f
    );
    return l && r.commitItem(l.marker), r.dismiss(), "ended";
  }
  if (t.key === "*")
    return n === "selection" && e.filter === "" ? (bt(t), r.dismiss(), "ended") : (bt(t), r.commitTypedCloser(e.filter), r.dismiss(), "ended");
  if (t.key === "\\" && n !== "selection")
    return e.filter === "" ? (bt(t), "continue") : (bt(t), r.commitTypedAndReopen(e.filter), "ended");
  if (t.key === "Backspace" && e.filter === "")
    return bt(t), r.dismiss(), "ended";
  const s = as(t);
  return t.key === "Backspace" || s !== void 0 ? (bt(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + s, r.update({ filterText: e.filter }), "continue") : (bt(t), "continue");
}
function ds(t, e) {
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
function us(t, e) {
  return !t || !e ? !1 : t.content !== e.content ? !0 : e.caret === void 0 ? !1 : e.caret !== t.caret;
}
function fs(t) {
  const {
    items: e,
    kind: r,
    isNoteMarker: n,
    sessionCounterRef: a,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: c,
    show: f,
    restoreSelectionIfLost: l,
    hasEditorChangedSinceFocus: d,
    focusEditor: b,
    applyItem: x,
    onShowError: w
  } = t, v = () => {
    l(), b();
  };
  a.current += 1;
  const m = a.current, S = () => a.current === m, M = { kind: r, token: m, filter: "", items: e };
  n && (M.isNoteMarker = n), s(M), f({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: cs(),
    onKey: (G) => c(G)
  }).then((G) => {
    var k;
    i(m);
    const J = G ?? ((k = M.itemToApplyOnClose) == null ? void 0 : k.marker);
    if (J !== void 0) {
      const P = (d == null ? void 0 : d()) ?? !1;
      v();
      const R = P ? void 0 : e.find((W) => W.marker === J);
      R && x(R);
    } else S() && v();
  }).catch((G) => {
    i(m), S() && v(), w(G);
  });
}
function ws(t, e) {
  const {
    sessionRef: r,
    editorRef: n,
    palette: a,
    restoreCaret: s,
    reopenAtCaret: i,
    clearSessionIfCurrent: c,
    hasEditorChangedSinceFocus: f
  } = e, l = r.current;
  if (!l) return "no-session";
  const d = (x) => {
    if (f != null && f()) {
      a.dismiss();
      return;
    }
    x();
  };
  return ls(t, l, {
    update: (x) => a.update(x),
    commit: () => a.commit(),
    dismiss: () => a.dismiss(),
    commitTyped: (x) => d(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(x);
    }),
    commitTypedAndReopen: (x) => d(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedMarker(x, { trailingSpace: !1 }), i() || a.dismiss();
    }),
    commitTypedCloser: (x) => d(() => {
      var w;
      s(), (w = n.current) == null || w.commitTypedCloser(x);
    }),
    commitItem: (x) => d(() => {
      var v;
      const w = l.items.find((m) => m.marker === x);
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
function ps({
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
function ms({
  containerRef: t,
  editorRef: e,
  selectionRef: r,
  baselineRef: n,
  isSessionOpen: a,
  target: s
}) {
  U(() => {
    const i = s ?? document, c = (f) => {
      var b, x, w;
      const l = (b = t.current) == null ? void 0 : b.querySelector(".editor-input");
      if (!l || f.target !== l) return;
      const d = (x = e.current) == null ? void 0 : x.getSelection();
      d ? r.current = d : (w = e.current) != null && w.getSelectedParaMarker() && (r.current = void 0), a() && (n.current = Tn(
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
function hs({
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
      ds(t, i), !t.current && (n.current = void 0, (c = e.current) == null || c.setMarkerSettleSuspended(!1));
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
function gs({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: h("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
const Kc = Object.freeze(["%shortcutKeys_tooltip%"]), Ln = mn(
  "shortcutKeysLocalization",
  { localizedStrings: {} }
);
function Fc({
  localizedStrings: t,
  locale: e,
  children: r
}) {
  const n = ft(() => ({ localizedStrings: t, locale: e }), [t, e]);
  return /* @__PURE__ */ o(Ln.Provider, { value: n, children: r });
}
function bs() {
  return Ze(Ln);
}
const Ns = /* @__PURE__ */ new Set([
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
]), vs = {
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
function ys(t) {
  const e = sn(t, "");
  let r = 0;
  for (; r < e.length && Ns.has(e[r]); )
    r += 1;
  if (r === 0) return;
  const n = e.slice(0, r), a = $o(t, r);
  return a ? [...n, a] : n;
}
function xs(t) {
  const e = [];
  let r = "";
  return sn(t, "").forEach((n) => {
    n === "+" && r ? (e.push(r), r = "") : r += n;
  }), r && e.push(r), e;
}
function An(t) {
  const e = ys(t);
  return e ? { keycaps: e, separator: "" } : { keycaps: xs(t), separator: "+" };
}
function Ss(t) {
  return An(t).keycaps.map((e) => vs[e] ?? e);
}
function ks(t) {
  const e = { style: "long", type: "conjunction" };
  try {
    return new Intl.ListFormat(t, e);
  } catch {
    return new Intl.ListFormat(void 0, e);
  }
}
function Cs(t, e) {
  var c;
  const r = ks(e), n = r.formatToParts(t);
  if (t.length < 3) return n;
  const a = r.formatToParts(t.slice(-2)), s = a[a.findLastIndex($r) - 1], i = n.findLastIndex($r) - 1;
  return (s == null ? void 0 : s.type) !== "literal" || ((c = n[i]) == null ? void 0 : c.type) !== "literal" ? n : n.map((f, l) => l === i ? s : f);
}
function $r(t) {
  return t.type === "element";
}
function Es({
  template: t,
  hint: e,
  locale: r
}) {
  const n = Cs(Ss(e), r).map(
    (a, s) => (
      // A key name can repeat, so it is not a safe key; the parts never reorder, so position is.
      // eslint-disable-next-line react/no-array-index-key
      a.type === "element" ? /* @__PURE__ */ o(Je, { children: a.value }, s) : a.value
    )
  );
  return Fo(t, { keys: n }).map((a, s) => (
    // One fixed template and one list per render, so the parts never reorder
    // eslint-disable-next-line react/no-array-index-key
    /* @__PURE__ */ o(ve, { children: a }, s)
  ));
}
const Is = 400;
function _s() {
  return vt() === "rtl" ? "left" : "right";
}
function We({ hint: t }) {
  const e = ua(), { localizedStrings: r, locale: n } = bs(), { keycaps: a, separator: s } = An(t), i = a.length === 1 ? /* @__PURE__ */ o(Je, { className: "tw:tracking-normal", children: a[0] }) : (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left
    // layout. The gap is narrower than `KbdGroup`'s so a combo reads as one unit.
    /* @__PURE__ */ o(gs, { dir: "ltr", className: "tw:gap-0.5 tw:tracking-normal", children: a.map((d, b) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so
      // the keycap text is not a safe key; position is stable because the keycaps never
      // reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ p(ve, { children: [
        b > 0 && s && // The `+` is drawn about half a pixel left of the middle of its advance, so centered
        // as is it leaves a wider gap after it than before it. A pixel of start padding in a
        // whole-pixel box moves the center half a pixel right, which measured closest to
        // centered at 100 % and stays within half a pixel at 125 %–200 %. The group is always
        // `ltr`, so the padding is always on the left.
        /* @__PURE__ */ o("span", { className: "tw:inline-flex tw:w-2 tw:justify-center tw:ps-px", children: s }),
        /* @__PURE__ */ o(Je, { children: d })
      ] }, b)
    )) })
  ), [c, f] = O(!1);
  U(() => {
    if (!c) return;
    const d = () => ta(() => f(!1));
    return window.addEventListener("keydown", d, { capture: !0 }), () => window.removeEventListener("keydown", d, { capture: !0 });
  }, [c]);
  const l = r == null ? void 0 : r["%shortcutKeys_tooltip%"];
  return e || !l || !Ko(l, "{keys}") ? i : (
    // Its own provider, so the keycaps get a tooltip in any menu, whether or not one is above them.
    // The delay keeps a pointer passing down a menu's shortcut column from flashing a readout per row
    /* @__PURE__ */ o(wt, { delayDuration: Is, children: /* @__PURE__ */ p(nt, { open: c, onOpenChange: f, children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o("span", { className: "tw:inline-flex", children: i }) }),
      /* @__PURE__ */ o(
        at,
        {
          side: _s(),
          className: "tw:data-closed:animate-none!",
          arrowClassName: "tw:translate-y-[calc(-50%-1px)]",
          children: /* @__PURE__ */ o(Es, { template: l, hint: t, locale: n })
        }
      )
    ] }) })
  );
}
const $c = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), qr = (t, e) => t[e] ?? e;
function Ts({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: r = !0,
  canRedo: n = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: s = !0,
  className: i = "tw:h-6 tw:w-6",
  variant: c = "ghost"
}) {
  const f = Ie(), l = qr(a, "%undoButton_tooltip%"), d = qr(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(lr, { children: [
    /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(
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
      /* @__PURE__ */ o(at, { children: /* @__PURE__ */ p("p", { children: [
        l,
        s && /* @__PURE__ */ p(xt, { children: [
          " ",
          /* @__PURE__ */ o(We, { hint: f ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (c === "secondary" || c === "default") && /* @__PURE__ */ o(Cn, {}),
    e && /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          "aria-label": d,
          className: i,
          size: "icon",
          onClick: e,
          disabled: !n,
          variant: c,
          children: /* @__PURE__ */ o(eo, {})
        }
      ) }),
      /* @__PURE__ */ o(at, { children: /* @__PURE__ */ p("p", { children: [
        d,
        s && /* @__PURE__ */ p(xt, { children: [
          " ",
          /* @__PURE__ */ o(We, { hint: f ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Ls({
  children: t,
  editorRef: e,
  canUndo: r = !0,
  canRedo: n = !0
}) {
  const a = E(null);
  return U(() => {
    var f;
    const s = Ie(), i = ((f = a.current) == null ? void 0 : f.querySelector(".editor-input")) ?? void 0, c = (l) => {
      var b, x, w, v;
      if (!i || document.activeElement !== i) return;
      const d = l.key.toLowerCase();
      if (s) {
        if (!l.metaKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), r && ((b = e.current) == null || b.undo())) : l.shiftKey && d === "z" && (l.preventDefault(), n && ((x = e.current) == null || x.redo()));
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && d === "z" ? (l.preventDefault(), r && ((w = e.current) == null || w.undo())) : (d === "y" || l.shiftKey && d === "z") && (l.preventDefault(), n && ((v = e.current) == null || v.redo()));
      }
    };
    return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
  }, [n, r, e]), /* @__PURE__ */ o("div", { ref: a, children: t });
}
function As() {
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
  return ft(() => ({ virtualRef: r, setSource: n }), [n]);
}
function Ds(t) {
  if (t.getClientRects().length !== 0)
    return t.getBoundingClientRect();
}
function Os(t) {
  return new DOMRect(t.left, t.top, 0, t.height);
}
const Ms = (t, e, r) => t === "generated" ? /* @__PURE__ */ p(xt, { children: [
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
function Ps({
  callerType: t,
  customCaller: e,
  updateCaller: r,
  localizedStrings: n,
  focusNoteText: a
}) {
  const s = E(!1), i = E(null), c = E(null), f = E(!1), [l, d] = O(t), [b, x] = O(e), [w, v] = O(!1), m = E(!1), S = E(l);
  S.current = l;
  const M = E(b);
  M.current = b, U(() => {
    d(t);
  }, [t]), U(() => {
    b !== e && x(e);
  }, [e]);
  const G = (k) => {
    if (f.current = !1, v(k), !k) {
      const P = S.current, R = M.current;
      P !== "custom" || R ? (P !== t || R !== e) && (s.current = !0, r(P, R)) : (d(t), x(e));
    }
  }, J = (k) => {
    var P, R, W, L;
    k.stopPropagation(), document.activeElement === c.current && k.key === "ArrowDown" || k.key === "ArrowRight" ? ((P = i.current) == null || P.focus(), f.current = !0) : document.activeElement === i.current && k.key === "ArrowUp" ? ((R = c.current) == null || R.focus(), f.current = !1) : document.activeElement === i.current && k.key === "ArrowLeft" && ((W = i.current) == null ? void 0 : W.selectionStart) === 0 && ((L = c.current) == null || L.focus(), f.current = !1), l === "custom" && k.key === "Enter" && (document.activeElement === c.current || document.activeElement === i.current) && G(!1);
  };
  return /* @__PURE__ */ p(ee, { open: w, onOpenChange: G, children: [
    /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(re, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Ms(t, n, e) }) }) }),
      /* @__PURE__ */ o(at, { children: n["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      ne,
      {
        style: { zIndex: ye },
        onEscapeKeyDown: () => {
          S.current = t, M.current = e, d(t), x(e);
        },
        onCloseAutoFocus: (k) => {
          s.current && (s.current = !1, k.preventDefault(), yn(a));
        },
        onClick: () => {
          f.current && (f.current = !1);
        },
        onKeyDown: J,
        onMouseMove: () => {
          var k;
          f.current && ((k = i.current) == null || k.focus());
        },
        children: [
          /* @__PURE__ */ o(Ee, { children: n["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ o(oe, {}),
          /* @__PURE__ */ o(
            zt,
            {
              checked: l === "generated",
              onCheckedChange: () => d("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ue })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            zt,
            {
              checked: l === "hidden",
              onCheckedChange: () => d("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ o("span", { className: "tw:w-10 tw:text-center", children: Ke })
              ] })
            }
          ),
          /* @__PURE__ */ o(
            zt,
            {
              ref: c,
              checked: l === "custom",
              onCheckedChange: () => d("custom"),
              onPointerDown: () => {
                m.current = l === "custom";
              },
              onClick: (k) => {
                var P;
                if (k.stopPropagation(), m.current && k.target !== i.current) {
                  G(!1);
                  return;
                }
                f.current = !0, (P = i.current) == null || P.focus();
              },
              onSelect: (k) => k.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ o("span", { children: n["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ o(
                  bn,
                  {
                    tabIndex: 0,
                    onMouseDown: (k) => {
                      k.stopPropagation(), d("custom"), f.current = !0;
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
const Rs = (t, e) => t === "f" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(tr, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(er, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(xt, { children: [
  /* @__PURE__ */ o(Qe, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Bs = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let r = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (r = e["%footnoteEditor_noteType_footnote_label%"]), qo(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: r
  });
};
function js({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: r,
  isTypeSwitchable: n,
  focusNoteText: a
}) {
  const s = E(!1), i = (c) => {
    c !== t && (s.current = !0, e(c));
  };
  return /* @__PURE__ */ p(ee, { children: [
    /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(re, { asChild: !0, children: /* @__PURE__ */ o(Z, { variant: "outline", className: "tw:h-6", children: Rs(t, r) }) }) }),
      /* @__PURE__ */ o(at, { children: /* @__PURE__ */ o("p", { children: Bs(t, r) }) })
    ] }) }),
    /* @__PURE__ */ p(
      ne,
      {
        style: { zIndex: ye },
        onCloseAutoFocus: (c) => {
          s.current && (s.current = !1, c.preventDefault(), yn(a));
        },
        children: [
          /* @__PURE__ */ o(Ee, { children: r["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ o(oe, {}),
          /* @__PURE__ */ p(
            zt,
            {
              disabled: t !== "x" && !n,
              checked: t === "x",
              onCheckedChange: () => i("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(Qe, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            zt,
            {
              disabled: t === "x" && !n,
              checked: t === "f",
              onCheckedChange: () => i("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(tr, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ p(
            zt,
            {
              disabled: t === "x" && !n,
              checked: t === "fe",
              onCheckedChange: () => i("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ o(er, {}),
                /* @__PURE__ */ o("span", { children: r["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const Vr = '[aria-controls="editor-context-menu"]';
function je(t) {
  return t ? t.matches(Vr) ? !0 : !!t.querySelector(Vr) : !1;
}
const qc = Object.freeze([
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
function Gs({ icon: t, className: e }) {
  return /* @__PURE__ */ o(t ?? ro, { className: e, size: 16 });
}
function zs({ state: t }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: t !== "none" && /* @__PURE__ */ o(nn, { size: 16 })
    }
  );
}
function he(t) {
  var e;
  return `item-${t.marker ?? ((e = t.icon) == null ? void 0 : e.displayName)}-${t.title.replaceAll(" ", "")}`;
}
function Jr({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
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
      value: he(t),
      onSelect: t.action,
      children: [
        t.selectionState !== void 0 && /* @__PURE__ */ o(zs, { state: t.selectionState }),
        /* @__PURE__ */ o("div", { className: "tw:w-8 tw:min-w-8", children: t.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ o("span", { className: "tw:font-mono tw:text-xs", children: t.marker })
        ) : /* @__PURE__ */ o("div", { children: /* @__PURE__ */ o(Gs, { icon: t.icon }) }) }),
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
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ o(va, { className: "tw:font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Hs({
  localizedStrings: t,
  markerMenuItems: e,
  searchRef: r,
  searchPlaceholder: n,
  defaultHighlightedMarker: a
}) {
  const [s, i] = O(""), [c] = O(() => {
    const d = e.find(
      (b) => b.marker === a && !b.isDisallowed && !b.isDeprecated && !b.isDisabled
    );
    return d ? he(d) : void 0;
  }), [f, l] = ft(() => {
    const d = It(s.trim().toLowerCase());
    if (!d) {
      const w = e.filter((v) => !v.isDisallowed);
      return [w.length > 0 ? w : e, []];
    }
    const b = e.filter((w) => {
      var m;
      const v = (m = w.marker) == null ? void 0 : m.toLowerCase();
      return w.isDisallowed ? v === d : v == null ? void 0 : v.includes(d);
    }), x = e.filter(
      (w) => w.title.toLowerCase().includes(d) && !b.includes(w)
    );
    return [b, x];
  }, [s, e]);
  return /* @__PURE__ */ p(or, { className: "tw:p-1", shouldFilter: !1, loop: !0, defaultValue: c, children: [
    /* @__PURE__ */ o(
      ar,
      {
        className: "marker-menu-search",
        ref: r,
        value: s,
        onValueChange: (d) => i(d),
        placeholder: n ?? t["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: !0
      }
    ),
    /* @__PURE__ */ p(sr, { children: [
      /* @__PURE__ */ o(ir, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ o(ge, { children: f.map((d) => /* @__PURE__ */ o(
        Jr,
        {
          item: d,
          localizedStrings: t
        },
        he(d)
      )) }),
      l.length > 0 && /* @__PURE__ */ p(xt, { children: [
        f.length > 0 && /* @__PURE__ */ o($e, { alwaysRender: !0 }),
        /* @__PURE__ */ o(ge, { children: l.map((d) => /* @__PURE__ */ o(
          Jr,
          {
            item: d,
            localizedStrings: t
          },
          he(d)
        )) })
      ] })
    ] })
  ] });
}
function Us(t, e, r, n, a) {
  if (!n || n === "p") return [];
  const s = fe[n], i = s != null && s.children ? s : a && fe[a];
  if (!i || !i.children) return [];
  const c = [];
  return Object.entries(i.children).forEach(([, f]) => {
    c.push(
      ...f.map((l) => ({
        marker: l,
        title: r[fe[l].description] ?? fe[l].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), c.sort((f, l) => (f.marker ?? f.title).localeCompare(l.marker ?? l.title));
}
function Wr(t) {
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
function Fs(t) {
  return {
    id: t.marker,
    label: t.marker,
    description: t.description,
    badge: t.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !t.isBasic
  };
}
function $s(t) {
  return t.reduce(
    (e, r) => e + (typeof r.insert == "string" ? r.insert.length : 1),
    0
  );
}
function qs(t, e) {
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
      const c = i.insert.slice(n), f = Math.min(c.length, s.length);
      if (c.slice(0, f) !== s.slice(0, f)) return !1;
      s = s.slice(f), n += f, n === i.insert.length && (r += 1, n = 0);
    }
    return !0;
  });
}
function Vs(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Js(t) {
  var r;
  const e = (r = t.attributes) == null ? void 0 : r.char;
  e != null && e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Ws = 300, Ge = "*", Xs = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Vc({
  classNameForEditor: t,
  noteOps: e,
  onChange: r,
  onClose: n,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  defaultMarkerMenuTrigger: c,
  localizedStrings: f,
  parentEditorRef: l,
  inline: d = !1,
  ref: b,
  initialCaretPosition: x,
  markerPalette: w,
  onNoteEdit: v
}) {
  var Tr;
  const m = E(null), S = E(null), M = E(null), G = E(s);
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
    u !== void 0 && u !== "end" ? (N = m.current) == null || N.selectNoteTextOffset(0, u.utf16Offset, {
      field: u.field,
      glyph: u.glyph
    }) : (y = m.current) == null || y.selectNote(0);
  }, []);
  ue(() => {
    if (d || !M.current) return;
    const u = parseFloat(getComputedStyle(M.current).width);
    u > 0 && (M.current.style.width = `${u}px`);
  }, [d]);
  const [P, R] = O("generated"), [W, L] = O("generated"), [lt, ht] = O(Ge), [yt, Lt] = O(Ge), [X, Rt] = O("f"), [Kt, At] = O(!1), [K, dt] = O(!0), [st, gt] = O(!1), Dt = E(!1), Bt = E(""), g = E(!1), A = E(void 0), F = E([]), tt = E([]), $ = E(void 0), Y = E(void 0), hr = _(() => {
    var N;
    const u = (N = m.current) == null ? void 0 : N.takeOpsAfterNote(0);
    u != null && u.length && (F.current = [...F.current, ...u], $.current = void 0);
  }, []), gr = _(
    (u, N) => {
      var I, z;
      if (!u) return;
      const y = Wr(u), C = Wr(N);
      if (!y && C) {
        $.current = {
          text: F.current,
          closedNoteOp: u,
          openNoteOp: N
        }, F.current = [];
        return;
      }
      const T = $.current;
      T && (y && !C && Gt(u, T.openNoteOp) && Gt(N, T.closedNoteOp) && !((z = (I = m.current) == null ? void 0 : I.getOpsAfterNote(0)) != null && z.length) ? (F.current = T.text, $.current = void 0) : Gt(N, T.openNoteOp) || ($.current = void 0));
    },
    []
  ), [St, ae] = O(!1), _e = As(), [br, Gn] = O(), Nr = E(null), kt = E(
    void 0
  ), zn = E(0), vr = E(w);
  U(() => {
    vr.current = w;
  }, [w]), U(
    () => () => {
      var u;
      kt.current && (kt.current = void 0, (u = vr.current) == null || u.dismiss());
    },
    []
  );
  const se = E(void 0), Te = E(void 0), ie = _(
    () => us(
      Te.current,
      Tn(
        () => {
          var u;
          return (u = m.current) == null ? void 0 : u.getUsj();
        },
        () => {
          var u;
          return (u = m.current) == null ? void 0 : u.getSelection();
        }
      )
    ),
    []
  ), { setSession: yr, clearSessionIfCurrent: ce } = hs({
    sessionRef: kt,
    editorRef: m,
    baselineRef: Te
  }), Ft = _(() => {
    var N, y, C, T;
    if ((N = m.current) != null && N.getSelection() || (y = m.current) != null && y.getSelectedParaMarker()) return;
    const u = se.current;
    u ? (C = m.current) == null || C.setSelection(u) : (T = m.current) == null || T.selectNote(0);
  }, []), le = _(() => {
    var u;
    Ft(), (u = m.current) == null || u.focus();
  }, [Ft]), Tt = ft(
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
  ), Le = ft(
    () => Us(
      m,
      () => ae(!1),
      f,
      br,
      X
    ),
    [f, br, X]
  );
  U(() => {
    var u;
    St || (u = m.current) == null || u.focus();
  }, [X, St]);
  const Ot = _(() => {
    var C, T, I;
    const u = (C = S.current) == null ? void 0 : C.querySelector(".editor-input"), N = u == null ? void 0 : u.querySelector("span.note"), y = (I = (T = S.current) == null ? void 0 : T.ownerDocument.getSelection()) == null ? void 0 : I.anchorNode;
    return !!N && !!y && N.contains(y);
  }, []), jt = _(
    (u = !1) => {
      var y, C, T, I, z;
      v == null || v();
      const N = (C = (y = m.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : C.at(0);
      if (N && Vt("note", N) && (r == null || r([N]), u && l && G.current)) {
        const q = [
          ...F.current,
          ...((T = m.current) == null ? void 0 : T.getOpsAfterNote(0)) ?? []
        ], et = tt.current, D = !Gt(q, et);
        if (d && !D && Gt(N, A.current))
          return;
        A.current = N;
        const V = [N];
        D && (et.length > 0 && qs(
          ((I = l.current) == null ? void 0 : I.getOpsAfterNote(G.current)) ?? [],
          et
        ) && V.push({ delete: $s(et) }), V.push(...q), tt.current = q), (z = l.current) == null || z.replaceEmbedUpdate(G.current, V);
      }
    },
    [d, r, v, l]
  ), Ae = _(
    (u) => {
      var y, C, T;
      const N = (y = m.current) == null ? void 0 : y.getSelection();
      (C = m.current) == null || C.applyUpdate([u, { delete: 1 }]), N && ((T = m.current) == null || T.setSelection(N)), le();
    },
    [le]
  ), xr = _(
    (u, N) => {
      var T, I, z;
      kt.current || (T = m.current) == null || T.commitPendingMarkerEdits();
      const y = (z = (I = m.current) == null ? void 0 : I.getNoteOps(0)) == null ? void 0 : z.at(0);
      if (!y || !Vt("note", y) || !y.insert.note) return;
      let C;
      u === "custom" ? C = N : u === "generated" ? C = Ue : C = Ke, y.insert.note.caller !== C && (y.insert.note.caller = C, Ae(y));
    },
    [Ae]
  ), $t = E(void 0), De = E(jt);
  U(() => {
    De.current = jt;
  }, [jt]);
  const qt = _(() => {
    $t.current !== void 0 && (clearTimeout($t.current), $t.current = void 0);
  }, []), Ct = _(() => {
    $t.current !== void 0 && (qt(), De.current(!0));
  }, [qt]), Sr = _(() => {
    qt(), $t.current = setTimeout(() => {
      $t.current = void 0, De.current(!0);
    }, Ws);
  }, [qt]);
  U(() => {
    var T, I;
    let u, N, y;
    Dt.current = !1, g.current = !1, se.current = void 0, dt(!0);
    const C = e == null ? void 0 : e.at(0);
    if (A.current = C, F.current = [], tt.current = [], $.current = void 0, Y.current = void 0, C && Vt("note", C)) {
      const z = (T = C.insert.note) == null ? void 0 : T.caller;
      let q = "custom";
      z === Ue ? q = "generated" : z === Ke && (q = "hidden");
      const et = q === "custom" && z !== void 0 ? z : Ge;
      ht(et), Lt(et), R(q), L(q), Rt(((I = C.insert.note) == null ? void 0 : I.style) ?? "f"), u = setTimeout(() => {
        var V, B, ut, pt;
        const D = (B = (V = m.current) == null ? void 0 : V.getNoteOps(0)) == null ? void 0 : B.at(0);
        (ut = m.current) == null || ut.applyUpdate(D ? [C, { delete: 1 }] : [C]), k(), (pt = m.current) == null || pt.focus(), N = requestAnimationFrame(() => {
          y = setTimeout(() => {
            var Et;
            Ot() || (k(), (Et = m.current) == null || Et.focus());
          }, 0);
        });
      }, 0);
    }
    return () => {
      Ct(), J.current = void 0, u && clearTimeout(u), N !== void 0 && cancelAnimationFrame(N), y !== void 0 && clearTimeout(y);
    };
  }, [e, Ct, Ot, k]), ue(() => () => Ct(), [Ct]);
  const kr = _(() => {
    var u;
    g.current && (kt.current || (u = m.current) == null || u.commitPendingMarkerEdits(), Ct());
  }, [Ct]);
  Zn(
    b,
    () => ({
      flushPendingEdits: kr,
      focus: () => {
        var u;
        return (u = m.current) == null ? void 0 : u.focus();
      },
      containsFocus: () => {
        const u = M.current;
        return !!u && u.contains(u.ownerDocument.activeElement);
      }
    }),
    [kr]
  );
  const Oe = _(() => {
    var u, N;
    if (!kt.current) {
      const y = (u = S.current) == null ? void 0 : u.querySelector(".editor-input");
      y != null && y.contains(y.ownerDocument.activeElement) && y.blur(), (N = m.current) == null || N.commitPendingMarkerEdits();
    }
    d ? Ct() : (qt(), jt(!0)), n();
  }, [qt, Ct, d, n, jt]), Me = E(Oe);
  ue(() => {
    Me.current = Oe;
  });
  const Pe = E({ book: a.book, chapterNum: a.chapterNum });
  ue(() => {
    (Pe.current.book !== a.book || Pe.current.chapterNum !== a.chapterNum) && (Pe.current = { book: a.book, chapterNum: a.chapterNum }, Me.current());
  }, [a.book, a.chapterNum]);
  const Hn = () => {
    var I;
    const u = m.current, N = Ks(u == null ? void 0 : u.getUsj());
    if (!u || !N) return;
    const y = ((I = S.current) == null ? void 0 : I.ownerDocument) ?? document, { activeElement: C } = y, T = u.getSelection() ?? se.current;
    u.setSelection(N);
    try {
      u.copy();
    } finally {
      T ? u.setSelection(T) : u.selectNote(0), u.getSelection(), y.activeElement !== C && (C instanceof HTMLElement && C !== y.body ? C.focus({ preventScroll: !0 }) : y.activeElement instanceof HTMLElement && y.activeElement.blur());
    }
  }, Un = _(
    (u, N) => {
      v == null || v(), R(u), ht(N), xr(u, N), d && Ct();
    },
    [xr, Ct, d, v]
  ), Kn = (u) => {
    var y, C, T, I, z;
    Rt(u), kt.current || (y = m.current) == null || y.commitPendingMarkerEdits();
    const N = (T = (C = m.current) == null ? void 0 : C.getNoteOps(0)) == null ? void 0 : T.at(0);
    if (N && Vt("note", N)) {
      N.insert.note && (N.insert.note.style = u);
      const q = (z = (I = N.insert.note) == null ? void 0 : I.contents) == null ? void 0 : z.ops;
      X !== "x" && u === "x" ? q == null || q.forEach((et) => Vs(et)) : X === "x" && u !== "x" && (q == null || q.forEach((et) => Js(et))), Ae(N), d && Ct();
    }
  }, Fn = (u) => {
    Gn(u.contextMarker), gt(u.canRedo);
  }, $n = _(
    (u) => {
      var y, C, T, I, z, q, et;
      const N = (C = (y = m.current) == null ? void 0 : y.getNoteOps(0)) == null ? void 0 : C.at(0);
      if (N && Vt("note", N)) {
        u.content.length > 1 && setTimeout(() => {
          var B;
          (B = m.current) == null || B.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const D = (T = N.insert.note) == null ? void 0 : T.style, V = (z = (I = N.insert.note) == null ? void 0 : I.contents) == null ? void 0 : z.ops;
        if (D || At(!1), At(
          D === "x" ? !!(V != null && V.every((B) => {
            var pt, Et;
            if (!((pt = B.attributes) != null && pt.char)) return !0;
            const ut = ((Et = B.attributes) == null ? void 0 : Et.char).style;
            return ut === "xt" || ut === "xo" || ut === "xq";
          })) : !!(V != null && V.every((B) => {
            var pt, Et;
            if (!((pt = B.attributes) != null && pt.char)) return !0;
            const ut = ((Et = B.attributes) == null ? void 0 : Et.char).style;
            return ut === "ft" || ut === "fr" || ut === "fq";
          }))
        ), !Dt.current) {
          Dt.current = !0, Bt.current = JSON.stringify(N), Y.current = N, dt(!0);
          return;
        }
        g.current = !0, gr(Y.current, N), Y.current = N, (et = (q = m.current) == null ? void 0 : q.getOpsAfterNote(0)) != null && et.length && setTimeout(hr, 0), dt(JSON.stringify(N) === Bt.current), jt(), d && Sr();
      } else
        At(!1), dt(!0);
    },
    [
      d,
      jt,
      Sr,
      gr,
      hr
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
    }), ae(!0), !0;
  }, [Le, _e]), Be = E(() => {
  }), Cr = _(
    (u, N, y) => {
      const { anchorRect: C } = u;
      if (!w || !C) return;
      const { hasTextSelection: T } = y;
      fs({
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
        isNoteMarker: (I) => rs(Tt.styleInfo ?? Pr, I),
        sessionCounterRef: zn,
        setSession: yr,
        clearSessionIfCurrent: ce,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (I) => Be.current(I),
        show: (I) => w.show({
          items: N.map(Fs),
          anchor: C,
          keyForwarding: I
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost: Ft,
        hasEditorChangedSinceFocus: ie,
        focusEditor: () => {
          var I;
          return (I = m.current) == null ? void 0 : I.focus();
        },
        applyItem: (I) => {
          var z;
          return (z = m.current) == null ? void 0 : z.applyMarkerMenuSelection(I, {
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
      Ft,
      ie,
      Tt.styleInfo,
      yr,
      ce
    ]
  ), de = _(() => {
    var y;
    const u = (y = m.current) == null ? void 0 : y.getMarkerMenuContext();
    if (!u) return !1;
    const N = zo(Tt.styleInfo ?? Pr, u);
    return N.length === 0 ? !1 : (Cr(u, N, { hasTextSelection: !!u.hasTextSelection }), !0);
  }, [Cr, Tt.styleInfo]);
  ps({
    isSessionOpen: _(() => !!kt.current, []),
    dismiss: _(() => w == null ? void 0 : w.dismiss(), [w])
  });
  const Er = _(
    (u) => {
      if (!w) return;
      ws(u, {
        sessionRef: kt,
        editorRef: m,
        palette: w,
        restoreCaret: Ft,
        reopenAtCaret: de,
        clearSessionIfCurrent: ce,
        hasEditorChangedSinceFocus: ie
      }) === "no-session" && w.dismiss();
    },
    [
      w,
      de,
      Ft,
      ce,
      ie
    ]
  );
  U(() => {
    Be.current = Er;
  }, [Er]), ms({
    containerRef: S,
    editorRef: m,
    selectionRef: se,
    baselineRef: Te,
    isSessionOpen: _(() => !!kt.current, [])
  }), U(() => {
    const u = () => {
      St && ae(!1);
    };
    return window.addEventListener("click", u), window.addEventListener("blur", u), () => {
      window.removeEventListener("click", u), window.removeEventListener("blur", u);
    };
  }, [St]), U(() => {
    var u;
    St && ((u = Nr.current) == null || u.focus());
  }, [St]), U(() => {
    var q, et;
    const u = () => {
      var D;
      return ((D = S.current) == null ? void 0 : D.querySelector(".editor-input")) ?? void 0;
    };
    if (((q = Tt.view) == null ? void 0 : q.markerMode) === "editable") {
      const D = (B) => {
        var Et, Lr, Ar, Dr;
        if (Yt(B)) return;
        const ut = kt.current, pt = u();
        if (!(!pt || document.activeElement !== pt)) {
          if (ut && w) {
            Be.current(B);
            return;
          }
          if (je(S.current)) {
            B.key === c && (B.preventDefault(), B.stopPropagation());
            return;
          }
          if (B.key === "Enter" && !Ot()) {
            B.preventDefault(), B.stopPropagation(), (Et = m.current) == null || Et.selectNote(0), (Lr = m.current) == null || Lr.focus();
            return;
          }
          if (w && B.key === c) {
            if (!Ot()) {
              B.preventDefault(), B.stopPropagation(), (Ar = m.current) == null || Ar.selectNote(0), (Dr = m.current) == null || Dr.focus();
              return;
            }
            de() && (B.preventDefault(), B.stopPropagation());
          }
        }
      }, V = () => {
        var ut, pt;
        const B = u();
        !B || document.activeElement !== B || Ot() || ((ut = m.current) == null || ut.selectNote(0), (pt = m.current) == null || pt.focus());
      };
      return document.addEventListener("keydown", D, { capture: !0 }), document.addEventListener("paste", V, { capture: !0 }), () => {
        document.removeEventListener("keydown", D, { capture: !0 }), document.removeEventListener("paste", V, { capture: !0 });
      };
    }
    const N = () => {
      const D = u();
      return !D || document.activeElement !== D ? !1 : !je(S.current);
    }, y = (D) => {
      D.key !== "Enter" || Yt(D) || N() && (D.preventDefault(), D.stopPropagation());
    }, C = (D) => {
      D.inputType !== "insertParagraph" && D.inputType !== "insertLineBreak" || N() && (D.preventDefault(), D.stopPropagation());
    }, T = (D) => {
      if (D.key !== c || St || Yt(D)) return;
      const V = u();
      !V || document.activeElement !== V || (je(S.current) || Re()) && (D.preventDefault(), D.stopPropagation());
    }, I = os((et = Tt.view) == null ? void 0 : et.markerMode), z = (D) => {
      const V = u();
      !St && V && document.activeElement === V && D.key === c ? (D.preventDefault(), Re()) : St && D.key === "Escape" && (D.preventDefault(), ae(!1));
    };
    return document.addEventListener("keydown", z), document.addEventListener("keydown", y, { capture: !0 }), document.addEventListener("beforeinput", C, { capture: !0 }), I && document.addEventListener("keydown", T, { capture: !0 }), () => {
      I && document.removeEventListener("keydown", T, { capture: !0 }), document.removeEventListener("keydown", z), document.removeEventListener("keydown", y, { capture: !0 }), document.removeEventListener("beforeinput", C, { capture: !0 });
    };
  }, [
    St,
    Re,
    c,
    (Tr = Tt.view) == null ? void 0 : Tr.markerMode,
    Tt.styleInfo,
    w,
    de,
    Ot
  ]), U(() => {
    const u = M.current;
    if (!d || !u) return;
    const N = (y) => {
      y.key !== "Escape" || y.defaultPrevented || Yt(y) || (y.preventDefault(), y.stopPropagation(), Me.current());
    };
    return u.addEventListener("keydown", N), () => u.removeEventListener("keydown", N);
  }, [d]), U(() => {
    const u = () => {
      var C, T, I;
      const N = ((C = S.current) == null ? void 0 : C.querySelector(".editor-input")) ?? void 0;
      if (!N || document.activeElement !== N || !document.hasFocus()) return;
      const y = document.getSelection();
      y && !y.isCollapsed || Ot() || ((T = m.current) == null || T.selectNote(0), (I = m.current) == null || I.focus());
    };
    return document.addEventListener("pointerup", u), document.addEventListener("selectionchange", u), () => {
      document.removeEventListener("pointerup", u), document.removeEventListener("selectionchange", u);
    };
  }, [Ot]);
  const Ir = f["%footnoteEditor_copyButton_tooltip%"], _r = /* @__PURE__ */ o(
    Ts,
    {
      onUndoClick: () => {
        var u;
        return (u = m.current) == null ? void 0 : u.undo();
      },
      onRedoClick: () => {
        var u;
        return (u = m.current) == null ? void 0 : u.redo();
      },
      canUndo: !K,
      canRedo: st,
      localizedStrings: f
    }
  );
  return /* @__PURE__ */ p(xt, { children: [
    /* @__PURE__ */ p(
      "div",
      {
        ref: M,
        className: h("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", d && "tw:w-full"),
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ p("div", { className: h("tw:flex tw:gap-4", d && "tw:flex-wrap"), children: [
              /* @__PURE__ */ o(
                js,
                {
                  isTypeSwitchable: Kt,
                  noteType: X,
                  handleNoteTypeChange: Kn,
                  localizedStrings: f,
                  focusNoteText: le
                }
              ),
              /* @__PURE__ */ o(
                Ps,
                {
                  callerType: P,
                  customCaller: lt,
                  updateCaller: Un,
                  localizedStrings: f,
                  focusNoteText: le
                }
              ),
              d && _r
            ] }),
            !d && /* @__PURE__ */ o("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ p(lr, { children: [
              _r,
              /* @__PURE__ */ o(
                Va,
                {
                  onCancelClick: n,
                  onAcceptClick: Oe,
                  canAccept: !K || W !== P || P === "custom" && lt !== yt,
                  localizedStrings: f,
                  acceptLabel: f["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ p(
            "div",
            {
              ref: S,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ o("div", { className: t, children: /* @__PURE__ */ o(
                  Ls,
                  {
                    editorRef: m,
                    canUndo: !K,
                    canRedo: st,
                    children: /* @__PURE__ */ o(
                      Ho,
                      {
                        options: Tt,
                        onStateChange: Fn,
                        onUsjChange: $n,
                        defaultUsj: Xs,
                        onScrRefChange: () => {
                        },
                        scrRef: a,
                        ref: m
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ o("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
                  /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(
                    Z,
                    {
                      "aria-label": Ir,
                      onClick: Hn,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ o(no, {})
                    }
                  ) }),
                  /* @__PURE__ */ o(at, { children: /* @__PURE__ */ o("p", { children: Ir }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ p(dr, { open: St, children: [
      /* @__PURE__ */ o(Ra, { virtualRef: _e.virtualRef }),
      /* @__PURE__ */ o(
        ur,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (u) => {
            u.preventDefault(), u.stopPropagation();
          },
          children: /* @__PURE__ */ o(
            Hs,
            {
              markerMenuItems: Le,
              localizedStrings: f,
              searchRef: Nr
            }
          )
        }
      )
    ] })
  ] });
}
const Ys = {
  "refresh-cw": Do,
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
  "square-function": tr,
  "square-x": Qe,
  "square-sigma": er,
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
}, fr = Ys, Jc = Object.keys(fr);
function wr(t) {
  return t !== void 0 && Object.hasOwn(fr, t);
}
function Zs(t, e) {
  return Object.entries(t).filter(([, r]) => "menuItem" in r && r.menuItem === e).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Qs(t, e) {
  return Object.entries(t).filter(([r, n]) => On(r, n, e)).sort(([, r], [, n]) => r.order - n.order).map(([r]) => r);
}
function Dn(t) {
  return Object.entries(t).flatMap(([e, r]) => typeof r == "object" ? [{ columnKey: e, column: r }] : []).sort((e, r) => e.column.order - r.column.order);
}
function On(t, e, r) {
  return "column" in e && e.column === r || t === r;
}
function ti(t) {
  const e = new Set(t.items.map((n) => n.group)), r = Object.entries(t.groups).filter(
    ([n]) => e.has(n)
  );
  return Dn(t.columns).filter(
    ({ columnKey: n }) => r.some(
      ([a, s]) => On(a, s, n)
    )
  ).map(({ columnKey: n, column: a }) => ({
    columnKey: n,
    label: a.label,
    isHeaderHidden: a.isHeaderHidden ?? !1
  }));
}
function Mn(t) {
  return t.some((e) => wr(e.iconNameBefore) || e.iconPathBefore) ? "icon" : "none";
}
function ei(t, e) {
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
          Zs(t.groups, n.id)
        )
      }
    )
  }));
}
function ri(t) {
  return t ? {
    columns: Dn(t.columns).map((e) => ({
      ...e,
      groups: Pn(t, Qs(t.groups, e.columnKey))
    }))
  } : { columns: [] };
}
function ni(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const n = mt(r.projectId), a = e.get(n), s = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((i) => i.scrollGroupId === r.scrollGroupId) || a.push(s) : e.set(n, [s]);
  }), e.forEach((r) => r.sort((n, a) => n.scrollGroupId - a.scrollGroupId)), e;
}
function Xr(t, e, r) {
  const n = mt(e);
  return t.some(
    (a) => mt(a.projectId) === n && a.scrollGroupId === r
  );
}
function ze(t) {
  const e = ni(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId === void 0 ? void 0 : mt(t.selection.projectId);
    return t.projects.map((s) => {
      const i = e.get(mt(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((c) => c.scrollGroupId),
        isSelected: a !== void 0 && a === mt(s.id),
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
    const s = e.get(mt(a.id));
    if (!s || s.length === 0) {
      n.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Xr(r, a.id, void 0),
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
        isSelected: Xr(r, a.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        project: a
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0) return;
    const s = mt(a.projectId);
    if (n.some(
      (c) => mt(c.projectId) === s && c.scrollGroupId === a.scrollGroupId
    ))
      return;
    const i = t.projects.find((c) => mt(c.id) === s);
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
const pr = "Selected", mr = "Unselected";
function Yr(t) {
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
function oi(t) {
  const e = t.filter(Yr).sort(Ht), r = t.filter((a) => !Yr(a)).sort(Ht);
  if (e.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: e }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function ai(t, e) {
  const r = t.filter((i) => i.isSelected).sort(Ht), n = t.filter((i) => !i.isSelected).sort(Ht), a = (i, c) => {
    var l;
    const f = (l = e.getSectionHeading) == null ? void 0 : l.call(
      e,
      i,
      c.map((d) => d.project)
    );
    return typeof f == "string" && f.length > 0 ? f : i === "selected" ? pr : mr;
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
function si(t, e) {
  if (e.id === "openTabs") return oi(t);
  if (e.id === "selection") return ai(t, e);
  if (!e.getGroupKey) return Xe(t);
  const r = /* @__PURE__ */ new Map(), n = [], { getGroupKey: a } = e;
  t.forEach((c) => {
    const f = a(c.project);
    if (f === void 0 || f === "") {
      n.push(c);
      return;
    }
    const l = r.get(f);
    l ? l.push(c) : r.set(f, [c]);
  });
  const s = [...r.entries()].map(([c, f]) => {
    var b;
    const l = [...f].sort(
      (x, w) => {
        var v;
        return ((v = e.compareProjects) == null ? void 0 : v.call(e, x.project, w.project)) || Ht(x, w);
      }
    ), d = ((b = e.getSectionHeading) == null ? void 0 : b.call(
      e,
      c,
      l.map((x) => x.project)
    )) ?? c;
    return { key: c, heading: d, rows: l };
  });
  s.sort((c, f) => c.key === e.priorityKey ? -1 : f.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: c.key, heading: c.heading },
    { key: f.key, heading: f.heading }
  ) : c.heading.localeCompare(f.heading, void 0, { sensitivity: "base" }));
  const i = s.map(({ key: c, heading: f, rows: l }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: c,
    label: f,
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
const Wc = [
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
const we = "recent", ii = "other";
function Rn(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
function ci(t) {
  const e = t ?? {};
  return [
    Rn(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: (r) => {
        var n;
        return typeof ((n = r.customData) == null ? void 0 : n[Xt.lastUsedAt]) == "number" ? we : ii;
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
        var i;
        const a = n.find(
          (c) => {
            var f;
            return typeof ((f = c.customData) == null ? void 0 : f[Xt.typeName]) == "string";
          }
        ), s = (i = a == null ? void 0 : a.customData) == null ? void 0 : i[Xt.typeName];
        return typeof s == "string" && s.length > 0 ? s : r;
      },
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const Xc = ci();
function li(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: (r) => r === "selected" ? e.selectedSectionHeading ?? pr : e.unselectedSectionHeading ?? mr
  };
}
function Yc(t) {
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
function Zc(t) {
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
const di = 100, it = {
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
  autoSelectionSelectedSectionHeading: pr,
  autoSelectionUnselectedSectionHeading: mr,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function ui(t) {
  const e = t ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: e.ariaLabel === "" ? "" : Q(e.ariaLabel, it.ariaLabel),
    buttonPlaceholder: Q(
      e.buttonPlaceholder,
      it.buttonPlaceholder
    ),
    commandEmptyMessage: Q(
      e.commandEmptyMessage,
      it.commandEmptyMessage
    ),
    searchPlaceholder: Q(
      e.searchPlaceholder,
      it.searchPlaceholder
    ),
    groupByAriaLabel: Q(
      e.groupByAriaLabel,
      it.groupByAriaLabel
    ),
    groupSectionLabel: Q(
      e.groupSectionLabel,
      it.groupSectionLabel
    ),
    groupByNone: Q(
      e.groupByNone,
      it.groupByNone
    ),
    openTabsSectionHeading: Q(
      e.openTabsSectionHeading,
      it.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: Q(
      e.otherProjectsSectionHeading,
      it.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: Q(
      e.autoOpenTabsGroupingLabel,
      it.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: Q(
      e.autoSelectionGroupingLabel,
      it.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: Q(
      e.autoSelectionSelectedSectionHeading,
      it.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: Q(
      e.autoSelectionUnselectedSectionHeading,
      it.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: Q(
      e.boundButClosedTooltip,
      it.boundButClosedTooltip
    ),
    openButtonLabel: Q(
      e.openButtonLabel,
      it.openButtonLabel
    ),
    clearAll: Q(e.clearAll, it.clearAll)
  };
}
function Qc(t) {
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
  return Ca[Wo(t)] ?? String(t);
}
const Zr = "platform.footerAction", fi = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function wi({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = te(t);
  return e ? /* @__PURE__ */ o(
    be,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: fi,
      children: r
    }
  ) : /* @__PURE__ */ o(be, { variant: "secondary", children: r });
}
function pi({
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
    ref: f,
    open: l,
    onPointerEnter: d,
    onPointerLeave: b
  } = Ba(), [x, w] = O(!1), v = tn(), m = t.isDisabled && !!t.disabledReason, S = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || !!(i != null && i.label) || m, M = l || x, G = _(() => {
    if (S) {
      w(!0);
      return;
    }
    d();
  }, [S, d]), J = _(() => {
    w(!1), b();
  }, [b]);
  let k;
  e === "project" ? t.openGroups.length > 0 && (k = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((L) => /* @__PURE__ */ o(be, { variant: "secondary", children: te(L) }, L)) })) : t.scrollGroupId !== void 0 && (k = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      wi,
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
        onClick: (L) => {
          L.stopPropagation(), a(t);
        },
        onMouseDown: (L) => L.stopPropagation(),
        "aria-label": r.openButtonLabel,
        children: [
          /* @__PURE__ */ o(Mo, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const P = /* @__PURE__ */ p(
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
      ...m && { "aria-describedby": v },
      className: h(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        c && /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: i == null ? void 0 : i.node }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: f,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              Xo(t) && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        k,
        m && /* @__PURE__ */ o("span", { id: v, hidden: !0, children: t.disabledReason })
      ]
    }
  ), R = t.scrollGroupId !== void 0 ? te(t.scrollGroupId) : void 0, W = t.isBoundButClosed && R ? r.boundButClosedTooltip.replace("{group}", R) : void 0;
  return /* @__PURE__ */ p(nt, { open: M, delayDuration: 400, children: [
    /* @__PURE__ */ o(ot, { asChild: !0, children: P }),
    /* @__PURE__ */ p(
      at,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", dir: "auto", children: dn(t) }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && R && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
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
function mi({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: r,
  strings: n
}) {
  const a = e !== Wt;
  return /* @__PURE__ */ p(ee, { children: [
    /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(re, { asChild: !0, children: /* @__PURE__ */ o(
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
          children: /* @__PURE__ */ o(Oo, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ o(at, { children: n.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ p(
      ne,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: ye },
        children: [
          /* @__PURE__ */ o(Ee, { children: n.groupSectionLabel }),
          /* @__PURE__ */ p(Ua, { value: e, onValueChange: r, children: [
            /* @__PURE__ */ o(Kr, { value: Wt, children: n.groupByNone }),
            /* @__PURE__ */ o(oe, {}),
            t.map((s) => /* @__PURE__ */ o(Kr, { value: s.id, children: s.label }, s.id))
          ] })
        ]
      }
    )
  ] });
}
function hi(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === Wt) return Wt;
    if (t.some((r) => r.id === e)) return e;
  }
  return t.some((r) => r.id === "openTabs") ? "openTabs" : Wt;
}
function tl(t) {
  const [e, r] = O(!1), [n, a] = O(""), s = ft(() => ui(t.localizedStrings), [t.localizedStrings]), i = ft(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const g = [];
    return t.openTabs.length > 0 && g.push(Rn(s.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && g.push(
      li({
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
  ]), [c, f] = O(void 0), l = ft(
    () => hi(i, t.defaultGrouping),
    [i, t.defaultGrouping]
  ), d = c ?? l, b = E(null), [x, w] = O(void 0), v = _((g) => {
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
  const m = ft(() => t.mode === "project" ? ze({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), S = ft(() => {
    const g = n.trim().toLowerCase();
    return g ? m.filter(
      (A) => A.shortName.toLowerCase().includes(g) || (A.fullName ?? "").toLowerCase().includes(g)
    ) : m;
  }, [m, n]), M = ft(
    () => new Map(t.projects.map((g) => [mt(g.id), g])),
    [t.projects]
  ), G = _(
    (g) => g === void 0 ? void 0 : M.get(mt(g)),
    [M]
  ), { renderProjectIndicator: J } = t, k = _(
    (g) => J ? J(g.project) : void 0,
    [J]
  ), P = !!J, R = !!t.footerAction && S.length === 0, W = ft(() => {
    if (d === Wt) return Xe(S);
    const g = i.find((A) => A.id === d);
    return g ? si(S, g) : Xe(S);
  }, [S, d, i]), L = (g) => {
    if (g.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(g.projectId, g.scrollGroupId);
    }
  }, lt = (g) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: g.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const A = t.selection.pairs, F = mt(g.projectId), tt = (Y) => mt(Y.projectId) === F && Y.scrollGroupId === g.scrollGroupId, $ = A.some(tt) ? A.filter((Y) => !tt(Y)) : [
          ...A.filter((Y) => !tt(Y)),
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
  }, ht = () => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, yt = t.mode === "project" ? t.renderTriggerLabel : void 0, Lt = t.mode === "project" ? t.triggerLabelFormat : void 0, X = ft(() => {
    switch (t.mode) {
      case "project": {
        const g = G(t.selection.projectId);
        if (yt)
          return { node: yt(g), title: "", hasSelection: !!g };
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
        const F = A.map(
          ({ project: $, scrollGroupId: Y }) => Y === void 0 ? $.shortName : `${$.shortName} (${te(Y)})`
        ).join(", "), tt = A.length.toString();
        return {
          node: /* @__PURE__ */ p(xt, { children: [
            /* @__PURE__ */ o(be, { variant: "muted", className: "tw:shrink-0", children: tt }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: F })
          ] }),
          title: `${tt} ${F}`,
          hasSelection: !0
        };
      }
      case "projectScrollGroup": {
        const g = G(t.selection.projectId);
        if (!g) {
          const tt = s.buttonPlaceholder;
          return { node: tt, title: tt, hasSelection: !1 };
        }
        const A = t.selection.scrollGroupId;
        if (A === void 0)
          return { node: g.shortName, title: g.shortName, hasSelection: !0 };
        const F = te(A);
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
    G,
    t.selection,
    yt,
    Lt,
    s.buttonPlaceholder
  ]), Rt = E(null), [Kt, At] = O(!1);
  U(() => {
    const g = Rt.current;
    if (!g) return;
    const A = (tt) => {
      At(tt < di);
    };
    if (A(g.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const F = new ResizeObserver((tt) => {
      tt.forEach(($) => {
        const [Y] = $.borderBoxSize;
        A(Y ? Y.inlineSize : g.getBoundingClientRect().width);
      });
    });
    return F.observe(g, { box: "border-box" }), () => F.disconnect();
  }, []);
  let K;
  t.isLoading ? K = /* @__PURE__ */ o(Po, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : Kt ? K = void 0 : t.mode === "project-multi" ? K = /* @__PURE__ */ o(on, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : K = /* @__PURE__ */ o(Ro, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const dt = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? L : void 0, st = s.ariaLabel && X.hasSelection && X.title ? `${s.ariaLabel}: ${X.accessibleTitle ?? X.title}` : s.ariaLabel || void 0, gt = /* @__PURE__ */ p(
    Z,
    {
      ref: Rt,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": st,
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
        Kt && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof X.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: X.node }) : X.node }),
        K
      ]
    }
  ), Dt = X.title ? /* @__PURE__ */ o(wt, { delayDuration: 400, children: /* @__PURE__ */ p(nt, { children: [
    /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(Ve, { asChild: !0, children: gt }) }),
    /* @__PURE__ */ o(at, { dir: "auto", children: X.title })
  ] }) }) : /* @__PURE__ */ o(Ve, { asChild: !0, children: gt }), Bt = i.length > 1;
  return /* @__PURE__ */ p(dr, { open: e, onOpenChange: v, children: [
    Dt,
    /* @__PURE__ */ o(
      ur,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ o(wt, { delayDuration: 400, children: /* @__PURE__ */ p(
          or,
          {
            shouldFilter: !1,
            value: R ? x ?? Zr : void 0,
            onValueChange: w,
            children: [
              /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
                  ar,
                  {
                    value: n,
                    onValueChange: a,
                    placeholder: s.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: !0
                  }
                ) }),
                Bt && /* @__PURE__ */ o(
                  mi,
                  {
                    availableGroupings: i,
                    activeGrouping: d,
                    onChangeGrouping: f,
                    strings: s
                  }
                )
              ] }),
              t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ o("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ o(Z, { variant: "ghost", size: "sm", onClick: ht, children: `${s.clearAll} (${t.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ p(sr, { children: [
                /* @__PURE__ */ o(ir, { children: s.commandEmptyMessage }),
                W.map((g, A) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ p(
                    ve,
                    {
                      children: [
                        /* @__PURE__ */ o(ge, { heading: gi(g, s), children: g.rows.map((F) => /* @__PURE__ */ o(
                          pi,
                          {
                            row: F,
                            mode: t.mode,
                            strings: s,
                            onClick: lt,
                            onOpen: dt,
                            selectedRowRef: b,
                            indicator: k(F),
                            reserveIndicatorSlot: P
                          },
                          F.rowKey
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
                /* @__PURE__ */ p("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  S.length > 0 && /* @__PURE__ */ o(
                    $e,
                    {
                      alwaysRender: !0,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ p(
                    xe,
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
function gi(t, e) {
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
const bi = en(
  ({
    value: t,
    onSearch: e,
    placeholder: r,
    isFullWidth: n,
    className: a,
    isDisabled: s = !1,
    id: i,
    clearButtonLabel: c
  }, f) => {
    const l = vt(), d = Q(c, "Clear search");
    return /* @__PURE__ */ p(
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
                { "tw:right-3": l === "rtl" },
                { "tw:left-3": l === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            bn,
            {
              ref: f,
              className: h(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: r,
              value: t,
              onChange: (b) => e(b.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
            /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(
              Z,
              {
                variant: "ghost",
                size: "icon",
                className: h(
                  "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                  { "tw:left-0": l === "rtl" },
                  { "tw:right-0": l === "ltr" }
                ),
                "aria-label": d,
                onClick: () => {
                  e("");
                },
                children: /* @__PURE__ */ o(rn, { className: "tw:h-4 tw:w-4" })
              }
            ) }),
            /* @__PURE__ */ o(at, { children: d })
          ] }) })
        ]
      }
    );
  }
);
bi.displayName = "SearchBar";
const Ni = 5;
function el(t) {
  return ka(t).filter(
    (e) => !ct.isObsolete(ct.bookIdToNumber(e))
  );
}
function vi(t, e) {
  return t.filter((r) => {
    try {
      return Yo(r) === e;
    } catch {
      return !1;
    }
  });
}
const rl = (t, e, r) => vi(t, e).every((n) => r.includes(n));
function yi(t, e) {
  return [
    ...new Set(t.map((n) => n.toUpperCase()))
  ].filter((n) => ct.bookIdToNumber(n) > 0).sort((n, a) => ct.bookIdToNumber(n) - ct.bookIdToNumber(a)).map((n) => Ea(n, e));
}
function nl(t, e, r, n) {
  if (t.length === 0) return;
  const a = new Set(t.map((c) => c.toUpperCase())), s = new Set(e.map((c) => c.toUpperCase()));
  if (s.size > 0 && s.size === a.size && [...s].every((c) => a.has(c)))
    return r;
  const i = yi(t, n);
  if (i.length !== 0)
    return i.length <= Ni ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function xi({ name: t, className: e }) {
  const r = wr(t) ? fr[t] : void 0;
  if (r)
    return /* @__PURE__ */ o(r, { "aria-hidden": "true", className: h("tw:h-4 tw:w-4 tw:shrink-0", e) });
}
function pe({ icon: t, iconName: e, menuLabel: r, leading: n, leadingSlot: a }) {
  const s = n ? "tw:me-2" : "tw:ms-2";
  if (wr(e)) return /* @__PURE__ */ o(xi, { name: e, className: s });
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
function Si({ checked: t }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "aria-hidden": !0,
      "data-slot": "menu-check-slot",
      className: "tw:-me-0.5 tw:inline-flex tw:w-3 tw:shrink-0 tw:items-center tw:justify-center",
      children: t && /* @__PURE__ */ o(Ne, { className: "tw:size-3" })
    }
  );
}
const ki = (t) => cn(t) && (t.code === Zo || t.code === Qo || t.code === ln), Ci = (t) => /* @__PURE__ */ o(oe, {}, `separator-${t}`), Bn = (t, e, r, n) => t.map(({ groupKey: a, items: s }) => ({
  groupKey: a,
  items: s.map(({ item: i, subGroups: c = [] }) => {
    if ("command" in i) {
      const l = i.checked !== void 0, d = /* @__PURE__ */ p(xt, { children: [
        /* @__PURE__ */ o(
          pe,
          {
            iconName: i.iconNameBefore,
            icon: i.iconPathBefore,
            menuLabel: i.label,
            leading: !0,
            leadingSlot: r
          }
        ),
        l && /* @__PURE__ */ o(Si, { checked: !!i.checked }),
        i.label,
        /* @__PURE__ */ o(
          pe,
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
      return /* @__PURE__ */ p(nt, { children: [
        /* @__PURE__ */ o(ot, { asChild: !0, children: l ? /* @__PURE__ */ o(
          zt,
          {
            className: "tw:ps-1.5 tw:[&>[data-slot=dropdown-menu-checkbox-item-indicator]]:hidden",
            checked: i.checked,
            disabled: i.disabled,
            onSelect: b,
            children: d
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) : /* @__PURE__ */ o(
          Ha,
          {
            disabled: i.disabled,
            onSelect: b,
            children: d
          },
          `dropdown-menu-item-${i.label}-${i.command}`
        ) }),
        i.tooltip && /* @__PURE__ */ o(at, { children: i.tooltip })
      ] }, `tooltip-${i.label}-${i.command}`);
    }
    const f = /* @__PURE__ */ p($a, { disabled: i.disabled, children: [
      /* @__PURE__ */ o(
        pe,
        {
          iconName: i.iconNameBefore,
          menuLabel: i.label,
          leading: !0,
          leadingSlot: r
        }
      ),
      i.label,
      /* @__PURE__ */ o(pe, { iconName: i.iconNameAfter, menuLabel: i.label })
    ] });
    return /* @__PURE__ */ p(Fa, { children: [
      i.tooltip ? /* @__PURE__ */ p(nt, { children: [
        /* @__PURE__ */ o(ot, { asChild: !0, children: f }),
        /* @__PURE__ */ o(at, { children: i.tooltip })
      ] }) : f,
      /* @__PURE__ */ o(Ga, { children: /* @__PURE__ */ o(qa, { ...n, children: ei(
        Bn(
          c,
          e,
          Mn(
            c.flatMap((l) => l.items.map(({ item: d }) => d))
          ),
          n
        ),
        Ci
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
  const a = tn(), s = ft(() => ri(e), [e]), i = ti(e), c = r && i.length > 1, f = new Map(
    s.columns.map(({ columnKey: b, groups: x }) => [b, x])
  ), l = (b) => f.get(b) ?? [], d = Mn(
    i.flatMap(
      ({ columnKey: b }) => l(b).flatMap((x) => x.items.map(({ item: w }) => w))
    )
  );
  return i.map(({ columnKey: b, label: x, isHeaderHidden: w }, v) => {
    const m = `${a}-${b}`;
    return /* @__PURE__ */ p(ve, { children: [
      /* @__PURE__ */ p(za, { "aria-labelledby": c ? m : void 0, children: [
        c && // A section shown without its heading keeps it for assistive technology only
        /* @__PURE__ */ o(Ee, { id: m, className: w ? "tw:sr-only" : void 0, children: x }),
        /* @__PURE__ */ o(wt, { children: Bn(
          l(b),
          t,
          d,
          n
        ).flatMap((S) => S.items) })
      ] }),
      v < i.length - 1 && /* @__PURE__ */ o(oe, {})
    ] }, b);
  });
}
function ol({
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
  return /* @__PURE__ */ p(
    ee,
    {
      open: !0,
      modal: !1,
      onOpenChange: (i) => {
        i || e();
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
function al({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: r,
  icon: n,
  className: a,
  showSectionHeadings: s = !1,
  openMenuInOverlay: i,
  variant: c,
  buttonVariant: f = "ghost",
  id: l
}) {
  ja();
  const d = E(null), b = () => Aa(d.current ?? void 0), [x, w] = O(!1), v = E(!1);
  if (i) {
    const m = async (S) => {
      const M = d.current;
      if (!M || x) return;
      const { x: G, y: J, width: k, height: P } = M.getBoundingClientRect();
      w(!0);
      let R;
      try {
        R = await i(e, {
          anchor: { x: G, y: J, width: k, height: P },
          focusFirstItem: S
        });
      } catch (W) {
        ki(W) || console.error("TabDropdownMenu: could not open the menu in the overlay", W);
      } finally {
        w(!1);
      }
      R && zr() === "pointer" && Hr(M), R && t(R);
    };
    return /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(
        Z,
        {
          ref: d,
          id: l,
          "aria-label": r,
          "aria-haspopup": "menu",
          "aria-expanded": x,
          variant: f,
          size: "icon",
          className: h(Ur, a),
          onPointerDown: () => {
            v.current = x;
          },
          onClick: (S) => {
            const M = S.detail === 0;
            !M && v.current || m(M);
          },
          onKeyDown: (S) => {
            b(), S.key === "ArrowDown" && (S.preventDefault(), m(!0));
          },
          onBlur: b,
          children: n ?? /* @__PURE__ */ o(Or, {})
        }
      ) }),
      /* @__PURE__ */ o(at, { children: r })
    ] }) });
  }
  return /* @__PURE__ */ p(ee, { variant: c, children: [
    /* @__PURE__ */ o(wt, { children: /* @__PURE__ */ p(nt, { children: [
      /* @__PURE__ */ o(ot, { asChild: !0, children: /* @__PURE__ */ o(re, { "aria-label": r, className: a, asChild: !0, id: l, children: /* @__PURE__ */ o(
        Z,
        {
          ref: d,
          variant: f,
          size: "icon",
          className: Ur,
          onKeyDown: b,
          onBlur: b,
          children: n ?? /* @__PURE__ */ o(Or, {})
        }
      ) }) }),
      /* @__PURE__ */ o(at, { children: r })
    ] }) }),
    /* @__PURE__ */ o(
      ne,
      {
        align: "start",
        style: { zIndex: nr },
        onCloseAutoFocus: () => {
          zr() === "pointer" && Hr(d.current ?? void 0);
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
function sl({ message: t, id: e, className: r }) {
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
function Ei({ className: t, ...e }) {
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
function Ii({ className: t, ...e }) {
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
const _i = Pt(
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
function Ti({
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
        _i({ variant: e }),
        t
      ),
      ...r
    }
  );
}
function il({ className: t, ...e }) {
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
function Li({ className: t, ...e }) {
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
function Ai({ className: t, ...e }) {
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
function cl({
  message: t,
  retryLabel: e,
  onRetry: r,
  icon: n,
  role: a = "alert",
  className: s
}) {
  return /* @__PURE__ */ p(Ei, { className: h(s), role: a, children: [
    /* @__PURE__ */ p(Ii, { children: [
      /* @__PURE__ */ o(Ti, { variant: "icon", children: n ?? /* @__PURE__ */ o(Bo, {}) }),
      /* @__PURE__ */ o(Li, { children: t })
    ] }),
    r && /* @__PURE__ */ o(Ai, { children: /* @__PURE__ */ o(Z, { onClick: () => r(), children: e }) })
  ] });
}
const Di = en(({ className: t, ...e }, r) => /* @__PURE__ */ o(jo, { size: 35, className: h("tw:animate-spin", t), ...e, ref: r }));
Di.displayName = "Spinner";
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
function ll({
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
function dl({ className: t, ...e }) {
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
function ul({ className: t, ...e }) {
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
function fl({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    rr.Group,
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
function me(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function wl({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: n,
  ...a
}) {
  return /* @__PURE__ */ o(
    rr.Panel,
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
function pl({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ o(
    rr.Separator,
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
  Nc as A,
  Z as B,
  xe as C,
  ee as D,
  lr as E,
  Cn as F,
  sr as G,
  ir as H,
  Ic as I,
  Tc as J,
  nc as K,
  yc as L,
  sc as M,
  ic as N,
  uc as O,
  fc as P,
  lc as Q,
  _c as R,
  Ie as S,
  wt as T,
  Va as U,
  Lc as V,
  be as W,
  Da as X,
  Oc as Y,
  Dc as Z,
  oe as _,
  Ea as a,
  Ws as a$,
  Ia as a0,
  nr as a1,
  jc as a2,
  zc as a3,
  Mc as a4,
  Pc as a5,
  Gc as a6,
  Rc as a7,
  za as a8,
  Ua as a9,
  We as aA,
  ga as aB,
  Na as aC,
  Je as aD,
  ll as aE,
  ul as aF,
  dl as aG,
  xc as aH,
  ac as aI,
  dc as aJ,
  ha as aK,
  ma as aL,
  oc as aM,
  Ga as aN,
  Ka as aO,
  Fa as aP,
  qa as aQ,
  $a as aR,
  Ls as aS,
  Ei as aT,
  Ai as aU,
  Li as aV,
  Ii as aW,
  Ti as aX,
  sl as aY,
  il as aZ,
  Vc as a_,
  Kr as aa,
  Uc as ab,
  qc as ac,
  $c as ad,
  bn as ae,
  tl as af,
  bi as ag,
  el as ah,
  vi as ai,
  $e as aj,
  gc as ak,
  rl as al,
  Sc as am,
  yn as an,
  cc as ao,
  Ca as ap,
  al as aq,
  En as ar,
  ke as as,
  Ce as at,
  Sn as au,
  ri as av,
  ei as aw,
  Mn as ax,
  pe as ay,
  Si as az,
  ja as b,
  tc as b$,
  gs as b0,
  Hs as b1,
  Ra as b2,
  Ec as b3,
  kc as b4,
  Cc as b5,
  pl as b6,
  wl as b7,
  fl as b8,
  cl as b9,
  mc as bA,
  ol as bB,
  Jc as bC,
  xi as bD,
  Wt as bE,
  it as bF,
  Wc as bG,
  ec as bH,
  Kc as bI,
  Fc as bJ,
  la as bK,
  Yc as bL,
  Qc as bM,
  Zc as bN,
  Tn as bO,
  ds as bP,
  Xc as bQ,
  ns as bR,
  cs as bS,
  da as bT,
  ls as bU,
  us as bV,
  je as bW,
  rs as bX,
  ci as bY,
  li as bZ,
  Fs as b_,
  Di as ba,
  Hc as bb,
  Bc as bc,
  rc as bd,
  Ts as be,
  ye as bf,
  Qi as bg,
  Zi as bh,
  ca as bi,
  ia as bj,
  Xi as bk,
  Wi as bl,
  Yi as bm,
  Ji as bn,
  Xa as bo,
  Oa as bp,
  un as bq,
  On as br,
  Nn as bs,
  Wr as bt,
  Ac as bu,
  Os as bv,
  Ds as bw,
  vn as bx,
  ts as by,
  As as bz,
  h as c,
  os as c0,
  as as c1,
  ws as c2,
  fs as c3,
  It as c4,
  nl as c5,
  ps as c6,
  ms as c7,
  hs as c8,
  nt as d,
  ot as e,
  at as f,
  bc as g,
  zr as h,
  re as i,
  ne as j,
  Ee as k,
  Ha as l,
  pc as m,
  vc as n,
  ge as o,
  vt as p,
  Sa as q,
  Q as r,
  hc as s,
  dr as t,
  Ba as u,
  Ve as v,
  ur as w,
  wc as x,
  or as y,
  ar as z
};
//# sourceMappingURL=resizable-Bayklx5j.js.map
