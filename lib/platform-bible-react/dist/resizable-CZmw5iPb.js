var Ut = Object.defineProperty;
var s = (t, e) => Ut(t, "name", { value: e, configurable: !0 });
import { jsx as n, jsxs as p, Fragment as kt } from "react/jsx-runtime";
import { Slot as wt, Dialog as j, Popover as Y, Tooltip as W, Label as Xt, RadioGroup as dt, ToggleGroup as Ct, Separator as Wt, DropdownMenu as E } from "radix-ui";
import { IconX as qt, IconSearch as Zt, IconCheck as mt, IconChevronRight as Yt } from "@tabler/icons-react";
import { Canon as A } from "@sillsdev/scripture";
import G, { useState as _, useRef as ft, useCallback as $, createContext as Qt, useContext as te, useMemo as X, useEffect as ee, Fragment as ae, forwardRef as St } from "react";
import { cva as K } from "class-variance-authority";
import { ChevronsUpDown as Et, Check as Tt, Star as re, Filter as oe, ArrowRight as ne, Loader2 as se, ChevronDown as ie, Search as le, X as de, LoaderCircle as ce } from "lucide-react";
import { Section as F, MODIFIER_KEYS as ue, normalizeProjectId as Q, getLocalizeKeyForScrollGroupId as we, getSectionForBook as me } from "platform-bible-utils";
import { filterAndRankItems as gt } from "@eten-tech-foundation/platform-editor";
import { Command as J } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as pt from "react-resizable-panels";
import { clsx as fe } from "clsx";
import { extendTailwindMerge as pe, twMerge as he } from "tailwind-merge";
const ge = pe({ prefix: "tw" });
function ct(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    i === "[" ? r += 1 : i === "]" && (r -= 1), i === ":" && r === 0 ? (e.push(a), a = "") : a += i;
  }
  return e.push(a), e;
}
s(ct, "splitClassSegments");
function be(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ct(t), a = e.findIndex((i) => i.startsWith("-tw-"));
  if (a !== -1) {
    const i = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((m, b) => b !== a), `-${i}`].join(":")}`, original: t };
  }
  const r = e.findIndex((i) => i.startsWith("!tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((m, b) => b !== r), `!${i}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const i = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
s(be, "normalizeTw3ToTw4");
function Ne(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = ct(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], i = ct(e), l = i.some((m) => m.startsWith("-tw-")), d = i.some((m) => m.startsWith("!tw-"));
  if (l && o.startsWith("-")) {
    const m = o.slice(1);
    return [...r, `-tw-${m}`].join(":");
  }
  if (d && o.startsWith("!")) {
    const m = o.slice(1);
    return [...r, `!tw-${m}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
s(Ne, "restoreToOriginalFormat");
function c(...t) {
  const e = fe(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return ge(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((m) => {
    const b = be(m);
    r.set(b.normalized, b.original), o.push(b.normalized);
  }), he(o.join(" ")).split(" ").filter(Boolean).map((m) => {
    const b = r.get(m);
    return b ? Ne(m, b) : m;
  }).join(" ");
}
s(c, "cn");
const ve = 600, La = 650, zt = 400, xe = 450, ye = 500, Ie = 550, Ra = 700, Gt = K(
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
function B({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...o
}) {
  const i = r ? wt.Root : "button";
  return /* @__PURE__ */ n(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: c(Gt({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
s(B, "Button");
const At = "layoutDirection";
function P() {
  const t = localStorage.getItem(At);
  return t === "rtl" ? t : "ltr";
}
s(P, "readDirection");
function Pa(t) {
  localStorage.setItem(At, t);
}
s(Pa, "persistDirection");
function Ba({ ...t }) {
  return /* @__PURE__ */ n(j.Root, { "data-slot": "dialog", ...t });
}
s(Ba, "Dialog");
function Ma({ ...t }) {
  return /* @__PURE__ */ n(j.Trigger, { "data-slot": "dialog-trigger", ...t });
}
s(Ma, "DialogTrigger");
function ke({ ...t }) {
  return /* @__PURE__ */ n(j.Portal, { "data-slot": "dialog-portal", ...t });
}
s(ke, "DialogPortal");
function Oa({ ...t }) {
  return /* @__PURE__ */ n(j.Close, { "data-slot": "dialog-close", ...t });
}
s(Oa, "DialogClose");
function Ce({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    j.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: xe, ...e },
      ...a
    }
  );
}
s(Ce, "DialogOverlay");
function ja({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...i
}) {
  const l = P();
  return /* @__PURE__ */ p(ke, { children: [
    /* @__PURE__ */ n(Ce, { className: r }),
    /* @__PURE__ */ p(
      j.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ye, ...o },
        dir: l,
        ...i,
        children: [
          e,
          a && /* @__PURE__ */ n(j.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ p(B, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(qt, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
s(ja, "DialogContent");
function _a({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "dialog-header",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
s(_a, "DialogHeader");
function $a({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      "data-slot": "dialog-footer",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ n(j.Close, { asChild: !0, children: /* @__PURE__ */ n(B, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
s($a, "DialogFooter");
function Ha({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    j.Title,
    {
      "data-slot": "dialog-title",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
s(Ha, "DialogTitle");
function Fa({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    j.Description,
    {
      "data-slot": "dialog-description",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
s(Fa, "DialogDescription");
function Se({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:w-full to give callers control over width
        // CUSTOM: Added tw:file:text-foreground so the file-picker button text matches the foreground design token
        "pr-twp tw:h-8 tw:min-w-0 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-1 tw:text-base tw:transition-colors tw:outline-none tw:file:inline-flex tw:file:h-6 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        t
      ),
      ...a
    }
  );
}
s(Se, "Input");
function Ee({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
s(Ee, "InputGroup");
const Te = K(
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
function ze({
  className: t,
  align: e = "inline-start",
  ...a
}) {
  return (
    // CUSTOM: Clicking anywhere in the addon area proxies focus to the associated input — a
    // deliberate UX enhancement. The a11y rules flag a non-interactive role="group" element having
    // a click handler, but removing the handler would degrade the UX. Keyboard focus on the input
    // itself is still accessible and not affected by this handler.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    /* @__PURE__ */ n(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: c(Te({ align: e }), t),
        onClick: /* @__PURE__ */ s((r) => {
          var o, i;
          r.target instanceof HTMLElement && r.target.closest("button") || (i = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || i.focus();
        }, "onClick"),
        ...a
      }
    )
  );
}
s(ze, "InputGroupAddon");
K("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Dt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    J,
    {
      "data-slot": "command",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
s(Dt, "Command");
function Lt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const o = P(), i = G.useCallback(
    (l) => {
      if (e == null || e(l), l.defaultPrevented || !a || l.key !== " " || l.currentTarget.value !== "") return;
      const d = l.currentTarget.closest("[cmdk-root]"), m = d == null ? void 0 : d.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      m && (l.preventDefault(), l.stopPropagation(), m.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ p(Ee, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        J.Input,
        {
          "data-slot": "command-input",
          className: c(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: i,
          ...r
        }
      ),
      /* @__PURE__ */ n(ze, { children: /* @__PURE__ */ n(Zt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
s(Lt, "CommandInput");
function Rt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    J.List,
    {
      "data-slot": "command-list",
      className: c(
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
s(Rt, "CommandList");
function Pt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    J.Empty,
    {
      "data-slot": "command-empty",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
s(Pt, "CommandEmpty");
function Bt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    J.Group,
    {
      "data-slot": "command-group",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
s(Bt, "CommandGroup");
function Ge({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    J.Separator,
    {
      "data-slot": "command-separator",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
s(Ge, "CommandSeparator");
function Mt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ p(
    J.Item,
    {
      "data-slot": "command-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ n(mt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
s(Mt, "CommandItem");
function Ka({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "command-shortcut",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
s(Ka, "CommandShortcut");
const Ae = [
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
], De = /* @__PURE__ */ s((t) => {
  var e;
  return ((e = Ae[t]) == null ? void 0 : e.chapters) ?? -1;
}, "me"), Le = A.allBookIds.filter(
  (t) => !A.isObsolete(A.bookIdToNumber(t))
);
function Re(t) {
  const e = [], a = Math.min(t.length, A.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(A.bookNumberToId(r + 1));
  return e;
}
s(Re, "ut");
function I(t) {
  return `%scrollGroup_${t}%`;
}
s(I, "l");
const Pe = {
  [I("undefined")]: "Ø",
  [I(0)]: "A",
  [I(1)]: "B",
  [I(2)]: "C",
  [I(3)]: "D",
  [I(4)]: "E",
  [I(5)]: "F",
  [I(6)]: "G",
  [I(7)]: "H",
  [I(8)]: "I",
  [I(9)]: "J",
  [I(10)]: "K",
  [I(11)]: "L",
  [I(12)]: "M",
  [I(13)]: "N",
  [I(14)]: "O",
  [I(15)]: "P",
  [I(16)]: "Q",
  [I(17)]: "R",
  [I(18)]: "S",
  [I(19)]: "T",
  [I(20)]: "U",
  [I(21)]: "V",
  [I(22)]: "W",
  [I(23)]: "X",
  [I(24)]: "Y",
  [I(25)]: "Z"
};
function ht(t, e) {
  return De(A.bookIdToNumber(t));
}
s(ht, "m");
function nt(t, e, a) {
  const r = A.bookIdToNumber(t);
  let o, i = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((l) => {
    const d = A.bookIdToNumber(l);
    (a === "next" ? d > r && d < i : d < r && d > i) && (o = l, i = d);
  }), o;
}
s(nt, "c");
function Va(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const i = nt(r, e, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(ht(i), 1),
      verseNum: 1
    };
}
s(Va, "x");
function Ja(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < ht(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const i = nt(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
s(Ja, "a");
function Ua(t, e, a) {
  const { book: r, chapterNum: o, verseNum: i } = t;
  if (e === void 0 || e.includes(r))
    return i > 1 ? { book: r, chapterNum: o, verseNum: i - 1 } : i === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const l = nt(r, e, "previous");
  if (!l) return;
  const d = Math.max(ht(l), 1);
  return { book: l, chapterNum: d, verseNum: Math.max(1, 1) };
}
s(Ua, "B");
function Xa(t, e, a) {
  const { book: r, chapterNum: o, verseNum: i } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: i + 1 };
  const l = nt(r, e, "next");
  if (l)
    return { book: l, chapterNum: 1, verseNum: 1 };
}
s(Xa, "I");
function Wa(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
s(Wa, "P");
const qa = /* @__PURE__ */ s((t, e, a, r, o) => {
  switch (t) {
    case F.OT:
      return e ?? "Old Testament";
    case F.NT:
      return a ?? "New Testament";
    case F.DC:
      return r ?? "Deuterocanon";
    case F.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, "getSectionLongName"), Za = /* @__PURE__ */ s((t, e, a, r, o) => {
  switch (t) {
    case F.OT:
      return e ?? "OT";
    case F.NT:
      return a ?? "NT";
    case F.DC:
      return r ?? "DC";
    case F.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, "getSectionShortName");
function Ya(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? A.bookIdToEnglishName(t);
}
s(Ya, "getLocalizedBookName");
function Be(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
s(Be, "getLocalizedBookId");
const Qa = Object.fromEntries(
  Le.map((t) => [t, A.bookIdToEnglishName(t)])
);
function tr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = A.bookIdToEnglishName(t), i = a == null ? void 0 : a.get(t);
  return !!(o.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (i ? i.localizedName.toLowerCase().includes(r) || i.localizedId.toLowerCase().includes(r) : !1));
}
s(tr, "doesBookMatchQuery");
function Ot({ ...t }) {
  return /* @__PURE__ */ n(Y.Root, { "data-slot": "popover", ...t });
}
s(Ot, "Popover");
function ut({ ...t }) {
  return /* @__PURE__ */ n(Y.Trigger, { "data-slot": "popover-trigger", ...t });
}
s(ut, "PopoverTrigger");
const jt = G.createContext(null);
function er({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(jt.Provider, { value: t, children: e });
}
s(er, "PopoverPortalContainerProvider");
function _t({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const i = P(), l = G.useContext(jt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(Y.Portal, { container: l ?? void 0, children: /* @__PURE__ */ n(
      Y.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ve, ...r },
        dir: i,
        ...o
      }
    ) })
  );
}
s(_t, "PopoverContent");
function ar({ ...t }) {
  return /* @__PURE__ */ n(Y.Anchor, { "data-slot": "popover-anchor", ...t });
}
s(ar, "PopoverAnchor");
function rr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
s(rr, "PopoverHeader");
function or({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
s(or, "PopoverTitle");
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
s(nr, "PopoverDescription");
function bt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    W.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
s(bt, "TooltipProvider");
function $t({ ...t }) {
  return /* @__PURE__ */ n(W.Root, { "data-slot": "tooltip", ...t });
}
s($t, "Tooltip");
function Ht({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    W.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(Gt({ variant: e }), t) : t,
      ...a
    }
  );
}
s(Ht, "TooltipTrigger");
function Ft({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: a,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: r = !0,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName: o,
  children: i,
  ...l
}) {
  return /* @__PURE__ */ n(W.Portal, { children: /* @__PURE__ */ p(
    W.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Ie, ...a },
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...l,
      children: [
        i,
        r && /* @__PURE__ */ n(
          W.Arrow,
          {
            className: c(
              "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
              "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
              "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
              o
            )
          }
        )
      ]
    }
  ) });
}
s(Ft, "TooltipContent");
function Me() {
  const [t, e] = _(!1), a = ft(null), r = $(() => {
    const i = a.current;
    i && i.scrollWidth > i.clientWidth && e(!0);
  }, []), o = $(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
s(Me, "useTruncationTooltip");
function sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Xt.Root,
    {
      "data-slot": "label",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
s(sr, "Label");
function ir({
  className: t,
  ...e
}) {
  const a = P();
  return /* @__PURE__ */ n(
    dt.Root,
    {
      "data-slot": "radio-group",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: a,
      ...e
    }
  );
}
s(ir, "RadioGroup");
function lr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    dt.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ n(
        dt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ n("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
s(lr, "RadioGroupItem");
const Oe = K(
  // CUSTOM: Added pr-twp at the front of the base class string to apply Platform.Bible's Tailwind
  // CSS scope isolation; all Toggle and ToggleGroupItem components inherit this via toggleVariants
  "pr-twp tw:group/toggle tw:inline-flex tw:items-center tw:justify-center tw:gap-1 tw:rounded-lg tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:hover:bg-muted tw:hover:text-foreground tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:aria-pressed:bg-muted tw:data-[state=on]:bg-muted tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        outline: "tw:border tw:border-input tw:bg-transparent tw:hover:bg-muted"
      },
      size: {
        default: "tw:h-8 tw:min-w-8 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        sm: "tw:h-7 tw:min-w-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",
        lg: "tw:h-9 tw:min-w-9 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Kt = G.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function dr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: o = "horizontal",
  children: i,
  ...l
}) {
  const d = P();
  return /* @__PURE__ */ n(
    Ct.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": o,
      style: { "--gap": r },
      className: c(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: d,
      ...l,
      children: /* @__PURE__ */ n(
        Kt.Provider,
        {
          value: G.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: o }),
            [e, a, r, o]
          ),
          children: i
        }
      )
    }
  );
}
s(dr, "ToggleGroup");
function cr({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...o
}) {
  const i = G.useContext(Kt);
  return /* @__PURE__ */ n(
    Ct.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || a,
      "data-size": i.size || r,
      "data-spacing": i.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Oe({
          variant: i.variant || a,
          size: i.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
}
s(cr, "ToggleGroupItem");
function je({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    Wt.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
s(je, "Separator");
const _e = K(
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
function ur({
  className: t,
  orientation: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        _e({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
s(ur, "ButtonGroup");
function wr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? wt.Root : "div";
  return /* @__PURE__ */ n(
    r,
    {
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a
    }
  );
}
s(wr, "ButtonGroupText");
function mr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    je,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...a
    }
  );
}
s(mr, "ButtonGroupSeparator");
function fr() {
  return /Macintosh/i.test(navigator.userAgent);
}
s(fr, "isMacOs");
function pr() {
  return /Windows/i.test(navigator.userAgent);
}
s(pr, "isWindows");
const $e = ["input", "select", "textarea", "button"], He = ["button", "textbox"], hr = /* @__PURE__ */ s(({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = ft(null), [i, l] = _(void 0), [d, m] = _(void 0), b = $(
    (f) => {
      l(f);
      const x = t.find((y) => y.id === f);
      x && (e == null || e(x));
      const k = document.getElementById(f);
      k && (k.scrollIntoView({ block: "center" }), k.focus()), o.current && o.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), N = $(
    (f) => {
      const x = t.find((k) => k.id === f);
      x && (m((k) => k === f ? void 0 : f), a == null || a(x));
    },
    [a, t]
  ), C = /* @__PURE__ */ s((f) => {
    if (!f) return !1;
    const x = f.tagName.toLowerCase();
    if (f.isContentEditable || $e.includes(x)) return !0;
    const k = f.getAttribute("role");
    if (k && He.includes(k)) return !0;
    const y = f.getAttribute("tabindex");
    return y !== void 0 && y !== "-1";
  }, "isInteractiveElement"), D = $(
    (f) => {
      var V;
      const x = f.target, k = /* @__PURE__ */ s((S) => S ? document.getElementById(S) : void 0, "getElementById"), y = k(d), M = k(i);
      if (!!(y && x && y.contains(x) && x !== y) && C(x)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !x.isContentEditable) {
          if (d) {
            f.preventDefault(), f.stopPropagation();
            const S = t.find((u) => u.id === d);
            S && b(S.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!y) return;
          const S = Array.from(
            y.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const u = S.findIndex((h) => h === x);
          if (u === -1) return;
          let w;
          f.key === "ArrowDown" ? w = Math.min(u + 1, S.length - 1) : w = Math.max(u - 1, 0), w !== u && (f.preventDefault(), f.stopPropagation(), (V = S[w]) == null || V.focus());
          return;
        }
        return;
      }
      const T = t.findIndex((S) => S.id === i);
      let z = T;
      switch (f.key) {
        case "ArrowDown":
          z = Math.min(T + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(T - 1, 0), f.preventDefault();
          break;
        case "Home":
          z = 0, f.preventDefault();
          break;
        case "End":
          z = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          i && N(i), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const S = M;
          if (S) {
            const u = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), w = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), h = u ?? w;
            if (h) {
              f.preventDefault(), h.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (C(x) || (r == null || r(f.key), f.preventDefault()));
          return;
      }
      const R = t[z];
      R && b(R.id);
    },
    [t, b, i, d, N, r]
  );
  return {
    listboxRef: o,
    activeId: i,
    selectedId: d,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: D,
    /** Focus an option by its ID */
    focusOption: b
  };
}, "useListbox"), Fe = K(
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
function ot({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? wt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Fe({ variant: e }),
        t
      ),
      ...r
    }
  );
}
s(ot, "Badge");
const Vt = Qt(void 0);
function st() {
  const t = te(Vt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
s(st, "useMenuContext");
const it = K("", {
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
function Ke({ variant: t = "default", ...e }) {
  const a = P(), r = G.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Vt.Provider, { value: r, children: /* @__PURE__ */ n(E.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
s(Ke, "DropdownMenu");
function gr({
  ...t
}) {
  return /* @__PURE__ */ n(E.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
s(gr, "DropdownMenuPortal");
function Ve({
  ...t
}) {
  return /* @__PURE__ */ n(E.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
s(Ve, "DropdownMenuTrigger");
function Je({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const i = P();
  return /* @__PURE__ */ n(E.Portal, { children: /* @__PURE__ */ n(
    E.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: c(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n("div", { dir: i, children: r })
    }
  ) });
}
s(Je, "DropdownMenuContent");
function br({ ...t }) {
  return /* @__PURE__ */ n(E.Group, { "data-slot": "dropdown-menu-group", ...t });
}
s(br, "DropdownMenuGroup");
function Nr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = P(), i = st();
  return /* @__PURE__ */ n(
    E.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: i.variant })
      ),
      dir: o,
      ...r
    }
  );
}
s(Nr, "DropdownMenuItem");
function Nt({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const i = P(), l = st();
  return /* @__PURE__ */ p(
    E.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: l.variant })
      ),
      checked: a,
      dir: i,
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
s(Nt, "DropdownMenuCheckboxItem");
function vr({
  ...t
}) {
  return /* @__PURE__ */ n(E.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
s(vr, "DropdownMenuRadioGroup");
function xr({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = P(), i = st();
  return /* @__PURE__ */ p(
    E.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: i.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(E.ItemIndicator, { children: /* @__PURE__ */ n(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
s(xr, "DropdownMenuRadioItem");
function vt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    E.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: c(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
s(vt, "DropdownMenuLabel");
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    E.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
s(Ue, "DropdownMenuSeparator");
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: c(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
s(yr, "DropdownMenuShortcut");
function Ir({ ...t }) {
  return /* @__PURE__ */ n(E.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
s(Ir, "DropdownMenuSub");
function kr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = st();
  return /* @__PURE__ */ p(
    E.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(Yt, { className: "tw:ms-auto" })
      ]
    }
  );
}
s(kr, "DropdownMenuSubTrigger");
function Cr({ className: t, children: e, ...a }) {
  const r = P();
  return /* @__PURE__ */ n(
    E.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...a,
      children: /* @__PURE__ */ n("div", { dir: r, children: e })
    }
  );
}
s(Cr, "DropdownMenuSubContent");
function Sr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
s(Sr, "Skeleton");
const xt = `
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
function Xe(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
s(Xe, "isVisible");
function tt(t, e) {
  const a = e ? `${xt}, ${e}` : xt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Xe(r)
  );
}
s(tt, "getFocusableElements");
function Er({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = G.useRef(null);
  G.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), G.useEffect(() => {
    const l = o.current;
    if (!l) return;
    const d = /* @__PURE__ */ s(() => {
      requestAnimationFrame(() => {
        tt(l, '[tabindex]:not([tabindex="-1"])').forEach((N) => {
          N.setAttribute("tabindex", "-1");
        });
      });
    }, "setTabIndexes");
    d();
    const m = new MutationObserver(() => {
      d();
    });
    return m.observe(l, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      m.disconnect();
    };
  }, []);
  const i = /* @__PURE__ */ s((l) => {
    const { current: d } = o;
    if (d) {
      if (l.key === "ArrowDown") {
        l.preventDefault(), tt(d)[0].focus();
        return;
      }
      l.key === " " && document.activeElement === d && l.preventDefault();
    }
  }, "handleKeyDownInTable");
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ n(
      "div",
      {
        "data-slot": "table-container",
        className: c("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: o,
            onKeyDown: i,
            className: c(
              "tw:w-full tw:caption-bottom tw:text-sm",
              // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
              "tw:outline-hidden",
              // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
              "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
              t
            ),
            "aria-label": "Table",
            "aria-labelledby": "table-label",
            ...r
          }
        )
      }
    )
  );
}
s(Er, "Table");
function Tr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: c(
        {
          // CUSTOM: Apply sticky header styles when stickyHeader is true so headers remain
          // visible while scrolling through long tables
          "tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm": e
        },
        "tw:[&_tr]:border-b",
        t
      ),
      ...a
    }
  );
}
s(Tr, "TableHeader");
function zr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
s(zr, "TableBody");
function Gr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: c(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
s(Gr, "TableFooter");
function We(t) {
  G.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = /* @__PURE__ */ s((r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? tt(t.current) : [], i = o.indexOf(document.activeElement), l = r.key === "ArrowRight" ? i + 1 : i - 1;
          l >= 0 && l < o.length && o[l].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    }, "handleKeyDown");
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
s(We, "useFocusableInRowKeyboardNavigation");
function qe(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
s(qe, "focusAdjacentFocusableElementInRow");
function Ze(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
s(Ze, "focusAdjacentRow");
function Ar({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...i
}) {
  const l = G.useRef(null);
  G.useEffect(() => {
    typeof o == "function" ? o(l.current) : o && "current" in o && (o.current = l.current);
  }, [o]), We(l);
  const d = G.useMemo(
    () => l.current ? tt(l.current) : [],
    [l]
  ), m = G.useCallback(
    (N) => {
      const { current: C } = l;
      if (!C || !C.parentElement) return;
      const D = C.closest("table"), f = D ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tt(D).filter(
          (y) => y.tagName === "TR"
        )
      ) : [], x = f.indexOf(C), k = d.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (N.key === "ArrowDown" || N.key === "ArrowUp")
        N.preventDefault(), Ze(f, x, N.key);
      else if (N.key === "ArrowLeft" || N.key === "ArrowRight")
        N.preventDefault(), qe(d, k, N.key);
      else if (N.key === "Escape") {
        N.preventDefault();
        const y = C.closest("table");
        y && y.focus();
      }
      e == null || e(N);
    },
    [l, d, e]
  ), b = G.useCallback(
    (N) => {
      r && (a == null || a(N));
    },
    [r, a]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: l,
      tabIndex: -1,
      onKeyDown: m,
      onFocus: b,
      className: c(
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
s(Ar, "TableRow");
function Dr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "th",
    {
      "data-slot": "table-head",
      className: c(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
s(Dr, "TableHead");
function Lr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "td",
    {
      "data-slot": "table-cell",
      className: c(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
s(Lr, "TableCell");
function Rr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
s(Rr, "TableCaption");
function Pr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: m,
  isOpen: b = void 0,
  onOpenChange: N = void 0,
  isDisabled: C = !1,
  sortSelected: D = !1,
  icon: f = void 0,
  className: x = void 0,
  variant: k = "ghost",
  id: y
}) {
  const [M, O] = _(!1), U = $(
    (w) => {
      var v;
      const h = (v = t.find((g) => g.label === w)) == null ? void 0 : v.value;
      h && a(
        e.includes(h) ? e.filter((g) => g !== h) : [...e, h]
      );
    },
    [t, e, a]
  ), T = /* @__PURE__ */ s(() => m || r, "getPlaceholderText"), z = X(() => {
    if (!D) return t;
    const w = t.filter((v) => v.starred).sort((v, g) => v.label.localeCompare(g.label)), h = t.filter((v) => !v.starred).sort((v, g) => {
      const H = e.includes(v.value), at = e.includes(g.value);
      return H && !at ? -1 : !H && at ? 1 : v.label.localeCompare(g.label);
    });
    return [...w, ...h];
  }, [t, e, D]), R = /* @__PURE__ */ s(() => {
    a(t.map((w) => w.value));
  }, "handleSelectAll"), V = /* @__PURE__ */ s(() => {
    a([]);
  }, "handleClearAll"), S = b ?? M;
  return /* @__PURE__ */ n("div", { id: y, className: x, children: /* @__PURE__ */ p(Ot, { open: S, onOpenChange: N ?? O, children: [
    /* @__PURE__ */ n(ut, { asChild: !0, children: /* @__PURE__ */ p(
      B,
      {
        variant: k,
        role: "combobox",
        "aria-expanded": S,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: C,
        children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            f && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: f }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: T()
              }
            )
          ] }),
          /* @__PURE__ */ n(Et, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(_t, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ p(Dt, { children: [
      /* @__PURE__ */ n(
        Lt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      o && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: R, children: i }),
        /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: V, children: l })
      ] }),
      /* @__PURE__ */ p(Rt, { children: [
        /* @__PURE__ */ n(Pt, { children: d }),
        /* @__PURE__ */ n(Bt, { children: z.map((w) => /* @__PURE__ */ p(
          Mt,
          {
            value: w.label,
            onSelect: U,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                Tt,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(w.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              w.starred && /* @__PURE__ */ n(re, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: w.label }),
              w.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: w.secondaryLabel })
            ]
          },
          w.label
        )) })
      ] })
    ] }) })
  ] }) });
}
s(Pr, "MultiSelectComboBox");
function q(t) {
  return t.replace(/^\+/, "");
}
s(q, "stripMarkerNestingPrefix");
function Ye(t, e, a) {
  if (!e) return [...t];
  const r = [...t], o = q(e).toLowerCase();
  return a === "passive" ? gt({
    query: o,
    items: r,
    filter: /* @__PURE__ */ s((i) => q(i.label).toLowerCase().startsWith(o), "filter"),
    sortBy: "label"
  }) : gt({
    query: o,
    items: r,
    filter: /* @__PURE__ */ s((i) => q(i.label).toLowerCase().includes(o), "filter"),
    sortBy: "label"
  });
}
s(Ye, "filterAndRankPaletteItems");
function Qe(t) {
  return t.isComposing || t.keyCode === 229;
}
s(Qe, "isImeCompositionKeyEvent");
const Jt = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, ta = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], ea = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function aa(t) {
  return [
    ...ta,
    ...ea.filter((e) => Jt[t].test(e))
  ];
}
s(aa, "getMarkerPaletteClaimedKeys");
function L(t) {
  t.preventDefault(), t.stopPropagation();
}
s(L, "claim");
function Br(t, e, a) {
  var o, i;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (L(t), a.commit(), "ended") : t.key === "Escape" ? (L(t), a.dismiss(), "ended") : "passed";
  if (Qe(t) || ue.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((o = t.getModifierState) != null && o.call(t, "AltGraph")))
    return t.key === "Enter" && L(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return L(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return L(t), Ye(
      e.items.map((d) => ({ label: d.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return L(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return L(t), e.filter === "" ? (a.dismiss(), "ended") : (i = e.shouldSpaceCommit) != null && i.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    L(t);
    const l = q(e.filter).toLowerCase(), d = e.items.find(
      (m) => q(m.marker).toLowerCase() === l
    );
    return d && a.commitItem(d.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (L(t), a.dismiss(), "ended") : (L(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (L(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (L(t), a.dismiss(), "ended") : t.key === "Backspace" || Jt[r].test(t.key) ? (L(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && L(t), a.dismiss(), "ended");
}
s(Br, "handleMarkerPaletteSessionKeyDown");
function Mr(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
s(Mr, "clearPaletteSessionIfCurrent");
function Or(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: o,
    setSession: i,
    clearSessionIfCurrent: l,
    runSessionKey: d,
    show: m,
    restoreSelectionIfLost: b,
    focusEditor: N,
    applyItem: C,
    onShowError: D
  } = t;
  o.current += 1;
  const f = o.current, x = a ? "backslash" : "selection", k = { kind: x, token: f, filter: "", items: e };
  x === "backslash" && r && (k.shouldSpaceCommit = r), i(k), m({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: aa(x),
    onKey: /* @__PURE__ */ s((y) => d(y), "onKey")
  }).then((y) => {
    if (l(f), y !== void 0) {
      b(), N();
      const M = e.find((O) => O.marker === y);
      M && C(M);
    } else a || N();
  }).catch((y) => {
    l(f), a || N(), D(y);
  });
}
s(Or, "runMarkerPaletteSession");
function jr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd",
      className: c(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
s(jr, "Kbd");
function _r({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
s(_r, "KbdGroup");
function ra(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Q(a.projectId), o = e.get(r), i = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((l) => l.scrollGroupId === a.scrollGroupId) || o.push(i) : e.set(r, [i]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
s(ra, "collectOpenTabsByProject");
function yt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
s(yt, "pairIsSelected");
function lt(t) {
  const e = ra(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((i) => {
      const l = e.get(Q(i.id)) ?? [];
      return {
        rowKey: i.id,
        projectId: i.id,
        shortName: i.shortName,
        fullName: i.fullName,
        language: i.language,
        languageCode: i.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: l.map((d) => d.scrollGroupId),
        isSelected: o === i.id,
        isMuted: l.length === 0,
        isBoundButClosed: !1,
        isDisabled: i.isDisabled === !0,
        disabledReason: i.disabledReason,
        versificationId: i.versificationId,
        versificationName: i.versificationName
      };
    });
  }
  let a = [];
  t.mode === "project-multi" ? a = t.selection.pairs : t.selection.projectId !== void 0 && (a = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const r = [];
  return t.projects.forEach((o) => {
    const i = e.get(Q(o.id));
    if (!i || i.length === 0) {
      r.push({
        rowKey: `project:${o.id}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: yt(a, o.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
      });
      return;
    }
    i.forEach((l) => {
      r.push({
        rowKey: `tab:${o.id}:${l.scrollGroupId}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: l.scrollGroupId,
        scrollGroupScrRefLabel: l.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: yt(a, o.id, l.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
      });
    });
  }), a.forEach((o) => {
    if (o.scrollGroupId === void 0 || r.some((l) => l.projectId === o.projectId && l.scrollGroupId === o.scrollGroupId))
      return;
    const i = t.projects.find((l) => l.id === o.projectId);
    i && r.push({
      rowKey: `closed:${i.id}:${o.scrollGroupId}`,
      projectId: i.id,
      shortName: i.shortName,
      fullName: i.fullName,
      language: i.language,
      languageCode: i.languageCode,
      scrollGroupId: o.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: i.isDisabled === !0,
      disabledReason: i.disabledReason,
      versificationId: i.versificationId,
      versificationName: i.versificationName
    });
  }), r;
}
s(lt, "computeRows");
function It(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
s(It, "belongsToOpenTabsSection");
function Z(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
s(Z, "compareRows");
function oa(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(Z) }];
  const a = t.filter(It).sort(Z), r = t.filter((i) => !It(i)).sort(Z);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
s(oa, "partitionAndSort");
function na(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((d) => {
    const m = d.versificationId;
    if (m === void 0 || m === "") {
      o.push(d);
      return;
    }
    const b = d.versificationName ?? m, N = r.get(m);
    N ? (N.rows.push(d), !N.label && d.versificationName && (N.label = d.versificationName)) : r.set(m, { label: b, rows: [d] });
  });
  const i = [...r.entries()].map(([d, { label: m, rows: b }]) => ({
    id: d,
    label: m,
    rows: [...b].sort(Z)
  }));
  i.sort((d, m) => d.id === e ? -1 : m.id === e ? 1 : d.label.localeCompare(m.label, void 0, { sensitivity: "base" }));
  const l = i.map(({ id: d, label: m, rows: b }) => ({
    kind: "versification",
    rows: b,
    label: m,
    isPriority: d === e
  }));
  return o.length > 0 && l.push({
    kind: "versification",
    rows: [...o].sort(Z),
    label: a,
    isPriority: !1
  }), l;
}
s(na, "partitionByVersification");
const sa = {
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group",
  filterSectionLabel: "Filter",
  filterGroupByOpenTabs: "By open tabs",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  versificationUnknownSectionHeading: "Unknown versification",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function ia(t) {
  return { ...sa, ...t };
}
s(ia, "resolveStrings");
function et(t) {
  return Pe[we(t)] ?? String(t);
}
s(et, "scrollGroupLetterFromMap");
const la = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function da({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = et(t);
  return e ? /* @__PURE__ */ n(
    ot,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: la,
      children: a
    }
  ) : /* @__PURE__ */ n(ot, { variant: "secondary", children: a });
}
s(da, "ScrollGroupChip");
function ca({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: i }) {
  const {
    ref: l,
    open: d,
    onPointerEnter: m,
    onPointerLeave: b
  } = Me(), [N, C] = _(!1), D = !!(t.language || t.languageCode), f = D || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, x = d || N, k = $(() => {
    if (f) {
      C(!0);
      return;
    }
    m();
  }, [f, m]), y = $(() => {
    C(!1), b();
  }, [b]), M = /* @__PURE__ */ n(Tt, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let O;
  e === "project" ? t.openGroups.length > 0 && (O = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((R) => /* @__PURE__ */ n(ot, { variant: "secondary", children: et(R) }, R)) })) : t.scrollGroupId !== void 0 && (O = /* @__PURE__ */ p("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      da,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ p(
      B,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: /* @__PURE__ */ s((R) => {
          R.stopPropagation(), o(t);
        }, "onClick"),
        onMouseDown: /* @__PURE__ */ s((R) => R.stopPropagation(), "onMouseDown"),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(ne, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const U = /* @__PURE__ */ p(
    Mt,
    {
      ref: t.isSelected ? i : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: /* @__PURE__ */ s(() => {
        t.isDisabled || r(t);
      }, "onSelect"),
      disabled: t.isDisabled,
      onPointerEnter: k,
      onPointerLeave: y,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: M }),
        /* @__PURE__ */ p(
          "span",
          {
            ref: l,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        O
      ]
    }
  ), T = t.scrollGroupId !== void 0 ? et(t.scrollGroupId) : void 0, z = t.isBoundButClosed && T ? a.boundButClosedTooltip.replace("{group}", T) : void 0;
  return /* @__PURE__ */ p($t, { open: x, delayDuration: 400, children: [
    /* @__PURE__ */ n(Ht, { asChild: !0, children: U }),
    /* @__PURE__ */ p(
      Ft,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: zt },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          D && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && T && /* @__PURE__ */ p("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ p("span", { className: "tw:text-muted-foreground", children: [
              " (",
              T,
              ")"
            ] })
          ] }),
          z && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: z }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
s(ca, "ProjectRowView");
function ua({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: o
}) {
  const i = !!a;
  return /* @__PURE__ */ p(Ke, { children: [
    /* @__PURE__ */ n(Ve, { asChild: !0, children: /* @__PURE__ */ n(
      B,
      {
        variant: "ghost",
        size: "sm",
        className: c(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          i && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": o.filterAriaLabel,
        "aria-pressed": i,
        title: o.filterAriaLabel,
        onMouseDown: /* @__PURE__ */ s((l) => l.preventDefault(), "onMouseDown"),
        children: /* @__PURE__ */ n(oe, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ p(Je, { align: "end", className: "tw:w-56", style: { zIndex: zt }, children: [
      /* @__PURE__ */ n(vt, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        Nt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: /* @__PURE__ */ s((l) => l.preventDefault(), "onSelect"),
          children: o.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ p(kt, { children: [
        /* @__PURE__ */ n(Ue, {}),
        /* @__PURE__ */ n(vt, { children: o.filterSectionLabel }),
        /* @__PURE__ */ n(
          Nt,
          {
            checked: !!a,
            onCheckedChange: r,
            onSelect: /* @__PURE__ */ s((l) => l.preventDefault(), "onSelect"),
            children: o.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
s(ua, "FilterMenu");
function $r(t) {
  const [e, a] = _(!1), [r, o] = _(""), [i, l] = _(t.defaultGroupByOpenTabs ?? !0), [d, m] = _(!1), b = ft(null), N = $((u) => {
    a(u), u || o("");
  }, []);
  ee(() => {
    if (!e) return;
    const u = window.requestAnimationFrame(() => {
      const w = b.current;
      w && w.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(u);
  }, [e]);
  const C = ia(t.localizedStrings), D = X(() => t.mode === "project" ? lt({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? lt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : lt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), f = X(() => {
    const u = r.trim().toLowerCase();
    let w = D;
    return u && (w = w.filter(
      (h) => h.shortName.toLowerCase().includes(u) || h.fullName.toLowerCase().includes(u) || (h.language ?? "").toLowerCase().includes(u) || (h.languageCode ?? "").toLowerCase().includes(u)
    )), t.mode === "project-multi" && d && (w = w.filter((h) => h.isSelected)), w;
  }, [D, r, t.mode, d]), x = X(
    () => t.groupByVersification ? na(
      f,
      t.priorityVersificationId,
      C.versificationUnknownSectionHeading
    ) : oa(f, i),
    [
      f,
      i,
      t.groupByVersification,
      t.priorityVersificationId,
      C.versificationUnknownSectionHeading
    ]
  ), k = X(() => {
    if (t.mode !== "project-multi") return [];
    const u = [];
    return t.projects.forEach((w) => {
      const h = t.openTabs.filter(
        (g) => Q(g.projectId) === Q(w.id)
      );
      if (h.length === 0) {
        u.push({ projectId: w.id });
        return;
      }
      const v = /* @__PURE__ */ new Set();
      h.forEach((g) => {
        v.has(g.scrollGroupId) || (v.add(g.scrollGroupId), u.push({ projectId: w.id, scrollGroupId: g.scrollGroupId }));
      });
    }), u;
  }, [t.mode, t.projects, t.openTabs]), y = /* @__PURE__ */ s((u) => {
    if (u.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
    }
  }, "handleOpenProjectInGroup"), M = /* @__PURE__ */ s((u) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: u.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const w = t.selection.pairs, h = /* @__PURE__ */ s((g) => g.projectId === u.projectId && g.scrollGroupId === u.scrollGroupId, "match"), v = w.some(h) ? w.filter((g) => !h(g)) : [...w, { projectId: u.projectId, scrollGroupId: u.scrollGroupId }];
        t.onChangeSelection({ pairs: v }), v.length === 0 && d && m(!1);
        return;
      }
      case "projectScrollGroup": {
        if (u.isBoundButClosed && u.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(u.projectId, u.scrollGroupId), a(!1);
          return;
        }
        if (u.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: u.projectId,
            scrollGroupId: u.scrollGroupId
          }), a(!1);
          return;
        }
        const w = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: u.projectId, scrollGroupId: w }), t.onOpenProjectInGroup(u.projectId, w), a(!1);
      }
    }
  }, "handleRowClick"), O = /* @__PURE__ */ s(() => {
    if (t.mode !== "project-multi") return;
    const u = t.selection.pairs, w = new Set(u.map((v) => `${v.projectId}:${v.scrollGroupId ?? ""}`)), h = [...u];
    k.forEach((v) => {
      const g = `${v.projectId}:${v.scrollGroupId ?? ""}`;
      w.has(g) || (w.add(g), h.push(v));
    }), t.onChangeSelection({ pairs: h });
  }, "handleSelectAll"), U = /* @__PURE__ */ s(() => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), d && m(!1));
  }, "handleClearAll"), T = X(() => {
    switch (t.mode) {
      case "project": {
        const u = t.projects.find((h) => h.id === t.selection.projectId);
        let w = u ? u.shortName : t.buttonPlaceholder ?? "";
        return u && t.triggerLabelFormat === "shortNameAndFullName" && u.fullName && u.fullName !== u.shortName && (w = `${u.shortName} - ${u.fullName}`), { node: w, title: w };
      }
      case "project-multi": {
        const { pairs: u } = t.selection;
        if (u.length === 0) {
          const g = t.buttonPlaceholder ?? "";
          return { node: g, title: g };
        }
        const w = [];
        if (u.forEach((g) => {
          const H = t.projects.find((at) => at.id === g.projectId);
          H && w.push({ project: H, scrollGroupId: g.scrollGroupId });
        }), w.length === 0) {
          const g = t.buttonPlaceholder ?? "";
          return { node: g, title: g };
        }
        if (t.getSelectedText) {
          const g = t.getSelectedText(w);
          return { node: g, title: g };
        }
        const h = w.map(
          ({ project: g, scrollGroupId: H }) => H === void 0 ? g.shortName : `${g.shortName} (${et(H)})`
        ).join(", ");
        if (w.length === 1) return { node: h, title: h };
        const v = w.length.toString();
        return {
          node: /* @__PURE__ */ p(kt, { children: [
            /* @__PURE__ */ n(ot, { variant: "muted", className: "tw:shrink-0", children: v }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: h })
          ] }),
          title: `${v} ${h}`
        };
      }
      case "projectScrollGroup": {
        const u = t.projects.find((v) => v.id === t.selection.projectId);
        if (!u) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        const w = t.selection.scrollGroupId;
        if (w === void 0)
          return { node: u.shortName, title: u.shortName };
        const h = `${u.shortName} · ${et(w)}`;
        return { node: h, title: h };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let z;
  t.isLoading ? z = /* @__PURE__ */ n(se, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? z = void 0 : t.mode === "project-multi" ? z = /* @__PURE__ */ n(Et, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : z = /* @__PURE__ */ n(ie, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const R = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? y : void 0, V = /* @__PURE__ */ p(
    B,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: c(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof T.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: T.node }) : T.node }),
        z
      ]
    }
  ), S = T.title ? /* @__PURE__ */ n(bt, { delayDuration: 400, children: /* @__PURE__ */ p($t, { children: [
    /* @__PURE__ */ n(Ht, { asChild: !0, children: /* @__PURE__ */ n(ut, { asChild: !0, children: V }) }),
    /* @__PURE__ */ n(Ft, { children: T.title })
  ] }) }) : /* @__PURE__ */ n(ut, { asChild: !0, children: V });
  return /* @__PURE__ */ p(Ot, { open: e, onOpenChange: N, children: [
    S,
    /* @__PURE__ */ n(
      _t,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: c("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(bt, { delayDuration: 400, children: /* @__PURE__ */ p(Dt, { shouldFilter: !1, children: [
          /* @__PURE__ */ p("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Lt,
              {
                value: r,
                onValueChange: o,
                placeholder: C.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.groupByVersification && !t.hideFilterMenu && /* @__PURE__ */ n(
              ua,
              {
                groupByOpenTabs: i,
                onChangeGroupByOpenTabs: l,
                showSelectedOnly: t.mode === "project-multi" ? d : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? m : void 0,
                strings: C
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ p("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: O, children: `${C.selectAll} (${k.length.toString()})` }),
            /* @__PURE__ */ n(B, { variant: "ghost", size: "sm", onClick: U, children: `${C.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ p(Rt, { children: [
            /* @__PURE__ */ n(Pt, { children: t.commandEmptyMessage ?? "No projects found" }),
            x.map((u, w) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ p(ae, { children: [
                /* @__PURE__ */ n(Bt, { heading: wa(u, C), children: u.rows.map((h) => /* @__PURE__ */ n(
                  ca,
                  {
                    row: h,
                    mode: t.mode,
                    strings: C,
                    onClick: M,
                    onOpen: R,
                    selectedRowRef: b
                  },
                  h.rowKey
                )) }),
                w < x.length - 1 && /* @__PURE__ */ n(Ge, {})
              ] }, `${u.kind}:${u.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
s($r, "ProjectSelector");
function wa(t, e) {
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "versification":
      return t.label;
    case "flat":
    default:
      return;
  }
}
s(wa, "sectionHeading");
const ma = St(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: i = !1, id: l }, d) => {
    const m = P();
    return /* @__PURE__ */ p(
      "div",
      {
        id: l,
        className: c("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            le,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": m === "rtl" },
                { "tw:left-3": m === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            Se,
            {
              ref: d,
              className: c(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: /* @__PURE__ */ s((b) => e(b.target.value), "onChange"),
              disabled: i
            }
          ),
          t && /* @__PURE__ */ p(
            B,
            {
              variant: "ghost",
              size: "icon",
              className: c(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": m === "rtl" },
                { "tw:right-0": m === "ltr" }
              ),
              onClick: /* @__PURE__ */ s(() => {
                e("");
              }, "onClick"),
              children: [
                /* @__PURE__ */ n(de, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ma.displayName = "SearchBar";
const fa = 5;
function Hr(t) {
  return Re(t).filter(
    (e) => !A.isObsolete(A.bookIdToNumber(e))
  );
}
s(Hr, "getAvailableBookIds");
function pa(t, e) {
  return t.filter((a) => {
    try {
      return me(a) === e;
    } catch {
      return !1;
    }
  });
}
s(pa, "getBooksForSection");
const Fr = /* @__PURE__ */ s((t, e, a) => pa(t, e).every((r) => a.includes(r)), "isSectionFullySelected");
function ha(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => A.bookIdToNumber(r) > 0).sort((r, o) => A.bookIdToNumber(r) - A.bookIdToNumber(o)).map((r) => Be(r, e));
}
s(ha, "localizeBookIdsInCanonOrder");
function Kr(t, e, a, r) {
  if (t.length === 0) return;
  const o = new Set(t.map((d) => d.toUpperCase())), i = new Set(e.map((d) => d.toUpperCase()));
  if (i.size > 0 && i.size === o.size && [...i].every((d) => o.has(d)))
    return a;
  const l = ha(t, r);
  if (l.length !== 0)
    return l.length <= fa ? l.join(", ") : `${l[0]} - ${l[l.length - 1]}`;
}
s(Kr, "summarizeSelectedBooks");
const ga = St(({ className: t, ...e }, a) => /* @__PURE__ */ n(ce, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
ga.displayName = "Spinner";
const ba = K(
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
function Vr({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ba({ variant: e }),
        t
      ),
      ...a
    }
  );
}
s(Vr, "Alert");
function Jr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert-title",
      className: c(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
s(Jr, "AlertTitle");
function Ur({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "alert-description",
      className: c(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
s(Ur, "AlertDescription");
function Xr({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    pt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: c(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (i) => a(Object.values(i)) : void 0,
      ...o
    }
  );
}
s(Xr, "ResizablePanelGroup");
function rt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
s(rt, "toSizeString");
function Wr({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    pt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: rt(t),
      minSize: rt(e),
      maxSize: rt(a),
      collapsedSize: rt(r),
      ...o
    }
  );
}
s(Wr, "ResizablePanel");
function qr({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    pt.Separator,
    {
      "data-slot": "resizable-handle",
      className: c(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
s(qr, "ResizableHandle");
export {
  Er as $,
  Qa as A,
  B,
  Mt as C,
  Ba as D,
  cr as E,
  ur as F,
  mr as G,
  fr as H,
  Xa as I,
  Nr as J,
  ot as K,
  sr as L,
  Ke as M,
  Ve as N,
  Je as O,
  Ot as P,
  Sr as Q,
  ir as R,
  je as S,
  bt as T,
  hr as U,
  vt as V,
  Ue as W,
  Nt as X,
  Ar as Y,
  ve as Z,
  Lr as _,
  Be as a,
  pr as a$,
  Tr as a0,
  Dr as a1,
  zr as a2,
  br as a3,
  vr as a4,
  xr as a5,
  Pr as a6,
  jr as a7,
  La as a8,
  Se as a9,
  ze as aA,
  Vr as aB,
  Ur as aC,
  Jr as aD,
  wr as aE,
  Oa as aF,
  Fa as aG,
  Ce as aH,
  ke as aI,
  Ma as aJ,
  yr as aK,
  _r as aL,
  nr as aM,
  rr as aN,
  or as aO,
  qr as aP,
  Wr as aQ,
  Xr as aR,
  ga as aS,
  Rr as aT,
  Gr as aU,
  Ra as aV,
  ye as aW,
  xe as aX,
  Fe as aY,
  _e as aZ,
  Gt as a_,
  q as aa,
  Ge as ab,
  Ka as ac,
  Or as ad,
  Br as ae,
  Mr as af,
  ar as ag,
  Qe as ah,
  $r as ai,
  zt as aj,
  ma as ak,
  Hr as al,
  pa as am,
  Za as an,
  Fr as ao,
  er as ap,
  $a as aq,
  Pe as ar,
  Ir as as,
  kr as at,
  gr as au,
  Cr as av,
  Vt as aw,
  st as ax,
  it as ay,
  Ee as az,
  $t as b,
  Wa as b0,
  Ie as b1,
  Ye as b2,
  aa as b3,
  Pa as b4,
  Kr as b5,
  c,
  Ht as d,
  Ft as e,
  ut as f,
  Ya as g,
  _t as h,
  Dt as i,
  Rt as j,
  Bt as k,
  Ja as l,
  Ua as m,
  tr as n,
  Le as o,
  qa as p,
  Lt as q,
  P as r,
  Pt as s,
  lr as t,
  Me as u,
  ja as v,
  _a as w,
  Va as x,
  Ha as y,
  dr as z
};
//# sourceMappingURL=resizable-CZmw5iPb.js.map
