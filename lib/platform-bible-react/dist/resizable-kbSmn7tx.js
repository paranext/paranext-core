var oe = Object.defineProperty;
var o = (t, e) => oe(t, "name", { value: e, configurable: !0 });
import { jsx as s, jsxs as f, Fragment as ne } from "react/jsx-runtime";
import { Slot as xt, Dialog as F, Separator as se, Popover as nt, Tooltip as et, DropdownMenu as G, Label as ie, RadioGroup as gt, ToggleGroup as Pt } from "radix-ui";
import { IconX as le, IconSearch as de, IconCheck as yt, IconChevronRight as ce } from "@tabler/icons-react";
import { Canon as j } from "@sillsdev/scripture";
import { cva as W } from "class-variance-authority";
import z, { useState as V, useRef as ct, useCallback as X, createContext as ue, useContext as we, useMemo as Y, useEffect as Gt, Fragment as pe, forwardRef as Bt } from "react";
import { ChevronsUpDown as Ot, Check as Mt, Star as me, Group as fe, ArrowRight as he, Loader2 as ge, ChevronDown as be, Search as Ne, X as ve, AlertTriangle as xe, LoaderCircle as ye } from "lucide-react";
import { Section as q, MODIFIER_KEYS as Se, normalizeProjectId as P, PROJECT_SELECTOR_CUSTOM_DATA_KEYS as rt, getLocalizeKeyForScrollGroupId as ke, getSectionForBook as Ie } from "platform-bible-utils";
import { filterAndRankItems as zt } from "@eten-tech-foundation/platform-editor";
import { Command as tt } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as St from "react-resizable-panels";
import { clsx as Ee } from "clsx";
import { extendTailwindMerge as _e, twMerge as Te } from "tailwind-merge";
const Ce = _e({ prefix: "tw" });
function bt(t) {
  const e = [];
  let a = "", r = 0;
  for (let n = 0; n < t.length; n++) {
    const i = t[n];
    i === "[" ? r += 1 : i === "]" && (r -= 1), i === ":" && r === 0 ? (e.push(a), a = "") : a += i;
  }
  return e.push(a), e;
}
o(bt, "splitClassSegments");
function Ge(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = bt(t), a = e.findIndex((i) => i.startsWith("-tw-"));
  if (a !== -1) {
    const i = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((w, h) => h !== a), `-${i}`].join(":")}`, original: t };
  }
  const r = e.findIndex((i) => i.startsWith("!tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((w, h) => h !== r), `!${i}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const i = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
o(Ge, "normalizeTw3ToTw4");
function ze(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = bt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), n = a[a.length - 1], i = bt(e), l = i.some((w) => w.startsWith("-tw-")), d = i.some((w) => w.startsWith("!tw-"));
  if (l && n.startsWith("-")) {
    const w = n.slice(1);
    return [...r, `-tw-${w}`].join(":");
  }
  if (d && n.startsWith("!")) {
    const w = n.slice(1);
    return [...r, `!tw-${w}`].join(":");
  }
  return [...r, `tw-${n}`].join(":");
}
o(ze, "restoreToOriginalFormat");
function c(...t) {
  const e = Ee(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Ce(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
  return a.forEach((w) => {
    const h = Ge(w);
    r.set(h.normalized, h.original), n.push(h.normalized);
  }), Te(n.join(" ")).split(" ").filter(Boolean).map((w) => {
    const h = r.get(w);
    return h ? ze(w, h) : w;
  }).join(" ");
}
o(c, "cn");
const Ht = 600, Ut = 650, or = 400, je = 450, Le = 500, Ae = 675, nr = 690, sr = 700, ir = 800, $t = W(
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
function U({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...n
}) {
  const i = r ? xt.Root : "button";
  return /* @__PURE__ */ s(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: c($t({ variant: e, size: a, className: t })),
      ...n
    }
  );
}
o(U, "Button");
const Kt = "layoutDirection";
function H() {
  const t = localStorage.getItem(Kt);
  return t === "rtl" ? t : "ltr";
}
o(H, "readDirection");
function lr(t) {
  localStorage.setItem(Kt, t);
}
o(lr, "persistDirection");
function dr({ ...t }) {
  return /* @__PURE__ */ s(F.Root, { "data-slot": "dialog", ...t });
}
o(dr, "Dialog");
function cr({ ...t }) {
  return /* @__PURE__ */ s(F.Trigger, { "data-slot": "dialog-trigger", ...t });
}
o(cr, "DialogTrigger");
function De({ ...t }) {
  return /* @__PURE__ */ s(F.Portal, { "data-slot": "dialog-portal", ...t });
}
o(De, "DialogPortal");
function ur({ ...t }) {
  return /* @__PURE__ */ s(F.Close, { "data-slot": "dialog-close", ...t });
}
o(ur, "DialogClose");
function Re({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    F.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: je, ...e },
      ...a
    }
  );
}
o(Re, "DialogOverlay");
function wr({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...i
}) {
  const l = H();
  return /* @__PURE__ */ f(De, { children: [
    /* @__PURE__ */ s(Re, { className: r }),
    /* @__PURE__ */ f(
      F.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Le, ...n },
        dir: l,
        ...i,
        children: [
          e,
          a && /* @__PURE__ */ s(F.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ f(U, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ s(le, {}),
            /* @__PURE__ */ s("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
o(wr, "DialogContent");
function pr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(pr, "DialogHeader");
function mr({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ f(
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
        e && /* @__PURE__ */ s(F.Close, { asChild: !0, children: /* @__PURE__ */ s(U, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
o(mr, "DialogFooter");
function fr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    F.Title,
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
o(fr, "DialogTitle");
function hr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    F.Description,
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
o(hr, "DialogDescription");
function Pe({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ s(
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
o(Pe, "Input");
function Be({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(Be, "InputGroup");
const Oe = W(
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
function Me({
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
    /* @__PURE__ */ s(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: c(Oe({ align: e }), t),
        onClick: /* @__PURE__ */ o((r) => {
          var n, i;
          r.target instanceof HTMLElement && r.target.closest("button") || (i = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || i.focus();
        }, "onClick"),
        ...a
      }
    )
  );
}
o(Me, "InputGroupAddon");
W("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Ft({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    tt,
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
o(Ft, "Command");
function Jt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const n = H(), i = z.useCallback(
    (l) => {
      if (e == null || e(l), l.defaultPrevented || !a || l.key !== " " || l.currentTarget.value !== "") return;
      const d = l.currentTarget.closest("[cmdk-root]"), w = d == null ? void 0 : d.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      w && (l.preventDefault(), l.stopPropagation(), w.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ s("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ f(Be, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ s(
        tt.Input,
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
      /* @__PURE__ */ s(Me, { children: /* @__PURE__ */ s(de, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
o(Jt, "CommandInput");
function Vt({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    tt.List,
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
o(Vt, "CommandList");
function Xt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    tt.Empty,
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
o(Xt, "CommandEmpty");
function Wt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    tt.Group,
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
o(Wt, "CommandGroup");
function He({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    tt.Separator,
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
o(He, "CommandSeparator");
function Zt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ f(
    tt.Item,
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
        /* @__PURE__ */ s(yt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
o(Zt, "CommandItem");
function gr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(gr, "CommandShortcut");
const Ue = [
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
], $e = /* @__PURE__ */ o((t) => {
  var e;
  return ((e = Ue[t]) == null ? void 0 : e.chapters) ?? -1;
}, "me"), Ke = j.allBookIds.filter(
  (t) => !j.isObsolete(j.bookIdToNumber(t))
);
function Fe(t) {
  const e = [], a = Math.min(t.length, j.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(j.bookNumberToId(r + 1));
  return e;
}
o(Fe, "ut");
function v(t) {
  return `%scrollGroup_${t}%`;
}
o(v, "l");
const Je = {
  [v("undefined")]: "Ø",
  [v(0)]: "A",
  [v(1)]: "B",
  [v(2)]: "C",
  [v(3)]: "D",
  [v(4)]: "E",
  [v(5)]: "F",
  [v(6)]: "G",
  [v(7)]: "H",
  [v(8)]: "I",
  [v(9)]: "J",
  [v(10)]: "K",
  [v(11)]: "L",
  [v(12)]: "M",
  [v(13)]: "N",
  [v(14)]: "O",
  [v(15)]: "P",
  [v(16)]: "Q",
  [v(17)]: "R",
  [v(18)]: "S",
  [v(19)]: "T",
  [v(20)]: "U",
  [v(21)]: "V",
  [v(22)]: "W",
  [v(23)]: "X",
  [v(24)]: "Y",
  [v(25)]: "Z"
};
function kt(t, e) {
  return $e(j.bookIdToNumber(t));
}
o(kt, "m");
function wt(t, e, a) {
  const r = j.bookIdToNumber(t);
  let n, i = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((l) => {
    const d = j.bookIdToNumber(l);
    (a === "next" ? d > r && d < i : d < r && d > i) && (n = l, i = d);
  }), n;
}
o(wt, "c");
function br(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const i = wt(r, e, "previous");
  if (i)
    return {
      book: i,
      chapterNum: Math.max(kt(i), 1),
      verseNum: 1
    };
}
o(br, "x");
function Nr(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < kt(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const i = wt(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
o(Nr, "a");
function vr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: i } = t;
  if (e === void 0 || e.includes(r))
    return i > 1 ? { book: r, chapterNum: n, verseNum: i - 1 } : i === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
  if (e === void 0) return;
  const l = wt(r, e, "previous");
  if (!l) return;
  const d = Math.max(kt(l), 1);
  return { book: l, chapterNum: d, verseNum: Math.max(1, 1) };
}
o(vr, "B");
function xr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: i } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: i + 1 };
  const l = wt(r, e, "next");
  if (l)
    return { book: l, chapterNum: 1, verseNum: 1 };
}
o(xr, "I");
function yr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
o(yr, "P");
const Sr = /* @__PURE__ */ o((t, e, a, r, n) => {
  switch (t) {
    case q.OT:
      return e ?? "Old Testament";
    case q.NT:
      return a ?? "New Testament";
    case q.DC:
      return r ?? "Deuterocanon";
    case q.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, "getSectionLongName"), kr = /* @__PURE__ */ o((t, e, a, r, n) => {
  switch (t) {
    case q.OT:
      return e ?? "OT";
    case q.NT:
      return a ?? "NT";
    case q.DC:
      return r ?? "DC";
    case q.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, "getSectionShortName");
function Ir(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? j.bookIdToEnglishName(t);
}
o(Ir, "getLocalizedBookName");
function Ve(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
o(Ve, "getLocalizedBookId");
const Er = Object.fromEntries(
  Ke.map((t) => [t, j.bookIdToEnglishName(t)])
);
function _r(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = j.bookIdToEnglishName(t), i = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (i ? i.localizedName.toLowerCase().includes(r) || i.localizedId.toLowerCase().includes(r) : !1));
}
o(_r, "doesBookMatchQuery");
const jt = `
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
o(Xe, "isVisible");
function st(t, e) {
  const a = e ? `${jt}, ${e}` : jt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Xe(r)
  );
}
o(st, "getFocusableElements");
const Tr = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
function We({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ s(
    se.Root,
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
o(We, "Separator");
const Ze = W(
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
function Cr({
  className: t,
  orientation: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ze({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
o(Cr, "ButtonGroup");
function Gr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? xt.Root : "div";
  return /* @__PURE__ */ s(
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
o(Gr, "ButtonGroupText");
function zr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ s(
    We,
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
o(zr, "ButtonGroupSeparator");
function qt({ ...t }) {
  return /* @__PURE__ */ s(nt.Root, { "data-slot": "popover", ...t });
}
o(qt, "Popover");
function Nt({ ...t }) {
  return /* @__PURE__ */ s(nt.Trigger, { "data-slot": "popover-trigger", ...t });
}
o(Nt, "PopoverTrigger");
const Yt = z.createContext(null);
function jr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ s(Yt.Provider, { value: t, children: e });
}
o(jr, "PopoverPortalContainerProvider");
function Qt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...n
}) {
  const i = H(), l = z.useContext(Yt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ s(nt.Portal, { container: l ?? void 0, children: /* @__PURE__ */ s(
      nt.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ht, ...r },
        dir: i,
        ...n
      }
    ) })
  );
}
o(Qt, "PopoverContent");
function Lr({ ...t }) {
  return /* @__PURE__ */ s(nt.Anchor, { "data-slot": "popover-anchor", ...t });
}
o(Lr, "PopoverAnchor");
function Ar({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
o(Ar, "PopoverHeader");
function Dr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
o(Dr, "PopoverTitle");
function Rr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
o(Rr, "PopoverDescription");
function Lt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ s(
    et.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
o(Lt, "TooltipProvider");
function It({ ...t }) {
  return /* @__PURE__ */ s(et.Root, { "data-slot": "tooltip", ...t });
}
o(It, "Tooltip");
function Et({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    et.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c($t({ variant: e }), t) : t,
      ...a
    }
  );
}
o(Et, "TooltipTrigger");
function _t({
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
  arrowClassName: n,
  children: i,
  ...l
}) {
  return /* @__PURE__ */ s(et.Portal, { children: /* @__PURE__ */ f(
    et.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Ae, ...a },
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...l,
      children: [
        i,
        r && /* @__PURE__ */ s(
          et.Arrow,
          {
            className: c(
              "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
              "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
              "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
              n
            )
          }
        )
      ]
    }
  ) });
}
o(_t, "TooltipContent");
function qe() {
  const [t, e] = V(!1), a = ct(null), r = X(() => {
    const i = a.current;
    i && i.scrollWidth > i.clientWidth && e(!0);
  }, []), n = X(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: n };
}
o(qe, "useTruncationTooltip");
const te = ue(void 0);
function pt() {
  const t = we(te);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
o(pt, "useMenuContext");
const mt = W("", {
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
function Ye({ variant: t = "default", ...e }) {
  const a = H(), r = z.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ s(te.Provider, { value: r, children: /* @__PURE__ */ s(G.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
o(Ye, "DropdownMenu");
function Pr({
  ...t
}) {
  return /* @__PURE__ */ s(G.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
o(Pr, "DropdownMenuPortal");
function Qe({
  ...t
}) {
  return /* @__PURE__ */ s(G.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
o(Qe, "DropdownMenuTrigger");
function ta({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  children: n,
  ...i
}) {
  const l = H();
  return /* @__PURE__ */ s(G.Portal, { children: /* @__PURE__ */ s(
    G.Content,
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
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop) —
        // a dropdown menu must clear the overlay layer, including when opened from inside a
        // popover or dialog
        "pr-twp tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Ht, ...r },
      ...i,
      children: /* @__PURE__ */ s("div", { dir: l, children: n })
    }
  ) });
}
o(ta, "DropdownMenuContent");
function Br({ ...t }) {
  return /* @__PURE__ */ s(G.Group, { "data-slot": "dropdown-menu-group", ...t });
}
o(Br, "DropdownMenuGroup");
function Or({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const n = H(), i = pt();
  return /* @__PURE__ */ s(
    G.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: i.variant })
      ),
      dir: n,
      ...r
    }
  );
}
o(Or, "DropdownMenuItem");
function Mr({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...n
}) {
  const i = H(), l = pt();
  return /* @__PURE__ */ f(
    G.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: l.variant })
      ),
      checked: a,
      dir: i,
      ...n,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ s(G.ItemIndicator, { children: /* @__PURE__ */ s(yt, {}) })
          }
        ),
        e
      ]
    }
  );
}
o(Mr, "DropdownMenuCheckboxItem");
function ea({
  ...t
}) {
  return /* @__PURE__ */ s(G.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
o(ea, "DropdownMenuRadioGroup");
function At({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const n = H(), i = pt();
  return /* @__PURE__ */ f(
    G.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: i.variant })
      ),
      dir: n,
      ...r,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ s(G.ItemIndicator, { children: /* @__PURE__ */ s(yt, {}) })
          }
        ),
        e
      ]
    }
  );
}
o(At, "DropdownMenuRadioItem");
function aa({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ s(
    G.Label,
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
o(aa, "DropdownMenuLabel");
function ra({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    G.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
o(ra, "DropdownMenuSeparator");
function Hr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(Hr, "DropdownMenuShortcut");
function Ur({ ...t }) {
  return /* @__PURE__ */ s(G.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
o(Ur, "DropdownMenuSub");
function $r({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const n = pt();
  return /* @__PURE__ */ f(
    G.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        mt({ variant: n.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ s(ce, { className: "tw:ms-auto" })
      ]
    }
  );
}
o($r, "DropdownMenuSubTrigger");
function Kr({
  className: t,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: e,
  children: a,
  ...r
}) {
  const n = H();
  return /* @__PURE__ */ s(
    G.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop),
        // keeping submenus on the same overlay tier as their parent DropdownMenuContent
        "pr-twp tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      style: { zIndex: Ut, ...e },
      ...r,
      children: /* @__PURE__ */ s("div", { dir: n, children: a })
    }
  );
}
o(Kr, "DropdownMenuSubContent");
function Fr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    ie.Root,
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
o(Fr, "Label");
function Jr({
  className: t,
  ...e
}) {
  const a = H();
  return /* @__PURE__ */ s(
    gt.Root,
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
o(Jr, "RadioGroup");
function Vr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    gt.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ s(
        gt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ s("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
o(Vr, "RadioGroupItem");
const oa = W(
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
), ee = z.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Xr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: n = "horizontal",
  children: i,
  ...l
}) {
  const d = H();
  return /* @__PURE__ */ s(
    Pt.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": n,
      style: { "--gap": r },
      className: c(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: d,
      ...l,
      children: /* @__PURE__ */ s(
        ee.Provider,
        {
          value: z.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: n }),
            [e, a, r, n]
          ),
          children: i
        }
      )
    }
  );
}
o(Xr, "ToggleGroup");
function Wr({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...n
}) {
  const i = z.useContext(ee);
  return /* @__PURE__ */ s(
    Pt.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": i.variant || a,
      "data-size": i.size || r,
      "data-spacing": i.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        oa({
          variant: i.variant || a,
          size: i.size || r
        }),
        t
      ),
      ...n,
      children: e
    }
  );
}
o(Wr, "ToggleGroupItem");
function Zr() {
  return /Macintosh/i.test(navigator.userAgent);
}
o(Zr, "isMacOs");
function qr() {
  return /Windows/i.test(navigator.userAgent);
}
o(qr, "isWindows");
const na = ["input", "select", "textarea", "button"], sa = ["button", "textbox"], Yr = /* @__PURE__ */ o(({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const n = ct(null), [i, l] = V(void 0), [d, w] = V(void 0), h = X(
    (p) => {
      l(p);
      const b = t.find((N) => N.id === p);
      b && (e == null || e(b));
      const x = document.getElementById(p);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), n.current && n.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), g = X(
    (p) => {
      const b = t.find((x) => x.id === p);
      b && (w((x) => x === p ? void 0 : p), a == null || a(b));
    },
    [a, t]
  ), I = /* @__PURE__ */ o((p) => {
    if (!p) return !1;
    const b = p.tagName.toLowerCase();
    if (p.isContentEditable || na.includes(b)) return !0;
    const x = p.getAttribute("role");
    if (x && sa.includes(x)) return !0;
    const N = p.getAttribute("tabindex");
    return N !== void 0 && N !== "-1";
  }, "isInteractiveElement"), _ = X(
    (p) => {
      var T;
      const b = p.target, x = /* @__PURE__ */ o((S) => S ? document.getElementById(S) : void 0, "getElementById"), N = x(d), $ = x(i);
      if (!!(N && b && N.contains(b) && b !== N) && I(b)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !b.isContentEditable) {
          if (d) {
            p.preventDefault(), p.stopPropagation();
            const S = t.find((M) => M.id === d);
            S && h(S.id);
          }
          return;
        }
        if (p.key === "ArrowDown" || p.key === "ArrowUp") {
          if (!N) return;
          const S = Array.from(
            N.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const M = S.findIndex((B) => B === b);
          if (M === -1) return;
          let k;
          p.key === "ArrowDown" ? k = Math.min(M + 1, S.length - 1) : k = Math.max(M - 1, 0), k !== M && (p.preventDefault(), p.stopPropagation(), (T = S[k]) == null || T.focus());
          return;
        }
        return;
      }
      const K = t.findIndex((S) => S.id === i);
      let L = K;
      switch (p.key) {
        case "ArrowDown":
          L = Math.min(K + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          L = Math.max(K - 1, 0), p.preventDefault();
          break;
        case "Home":
          L = 0, p.preventDefault();
          break;
        case "End":
          L = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          i && g(i), p.preventDefault(), p.stopPropagation();
          return;
        case "ArrowRight": {
          const S = $;
          if (S) {
            const M = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), k = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), B = M ?? k;
            if (B) {
              p.preventDefault(), B.focus();
              return;
            }
          }
          break;
        }
        default:
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (I(b) || (r == null || r(p.key), p.preventDefault()));
          return;
      }
      const J = t[L];
      J && h(J.id);
    },
    [t, h, i, d, g, r]
  );
  return {
    listboxRef: n,
    activeId: i,
    selectedId: d,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: _,
    /** Focus an option by its ID */
    focusOption: h
  };
}, "useListbox"), ia = W(
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
function ut({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const n = a ? xt.Root : "span";
  return /* @__PURE__ */ s(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ia({ variant: e }),
        t
      ),
      ...r
    }
  );
}
o(ut, "Badge");
function Qr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
o(Qr, "Skeleton");
function to({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const n = z.useRef(null);
  z.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), z.useEffect(() => {
    const l = n.current;
    if (!l) return;
    const d = /* @__PURE__ */ o(() => {
      requestAnimationFrame(() => {
        st(l, '[tabindex]:not([tabindex="-1"])').forEach((g) => {
          g.setAttribute("tabindex", "-1");
        });
      });
    }, "setTabIndexes");
    d();
    const w = new MutationObserver(() => {
      d();
    });
    return w.observe(l, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      w.disconnect();
    };
  }, []);
  const i = /* @__PURE__ */ o((l) => {
    const { current: d } = n;
    if (d) {
      if (l.key === "ArrowDown") {
        l.preventDefault(), st(d)[0].focus();
        return;
      }
      l.key === " " && document.activeElement === d && l.preventDefault();
    }
  }, "handleKeyDownInTable");
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ s(
      "div",
      {
        "data-slot": "table-container",
        className: c("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ s(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
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
o(to, "Table");
function eo({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ s(
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
o(eo, "TableHeader");
function ao({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
o(ao, "TableBody");
function ro({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(ro, "TableFooter");
function la(t) {
  z.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = /* @__PURE__ */ o((r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const n = t.current ? st(t.current) : [], i = n.indexOf(document.activeElement), l = r.key === "ArrowRight" ? i + 1 : i - 1;
          l >= 0 && l < n.length && n[l].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    }, "handleKeyDown");
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
o(la, "useFocusableInRowKeyboardNavigation");
function da(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
o(da, "focusAdjacentFocusableElementInRow");
function ca(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
o(ca, "focusAdjacentRow");
function oo({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: n,
  ...i
}) {
  const l = z.useRef(null);
  z.useEffect(() => {
    typeof n == "function" ? n(l.current) : n && "current" in n && (n.current = l.current);
  }, [n]), la(l);
  const d = z.useMemo(
    () => l.current ? st(l.current) : [],
    [l]
  ), w = z.useCallback(
    (g) => {
      const { current: I } = l;
      if (!I || !I.parentElement) return;
      const _ = I.closest("table"), p = _ ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        st(_).filter(
          (N) => N.tagName === "TR"
        )
      ) : [], b = p.indexOf(I), x = d.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (g.key === "ArrowDown" || g.key === "ArrowUp")
        g.preventDefault(), ca(p, b, g.key);
      else if (g.key === "ArrowLeft" || g.key === "ArrowRight")
        g.preventDefault(), da(d, x, g.key);
      else if (g.key === "Escape") {
        g.preventDefault();
        const N = I.closest("table");
        N && N.focus();
      }
      e == null || e(g);
    },
    [l, d, e]
  ), h = z.useCallback(
    (g) => {
      r && (a == null || a(g));
    },
    [r, a]
  );
  return /* @__PURE__ */ s(
    "tr",
    {
      "data-slot": "table-row",
      ref: l,
      tabIndex: -1,
      onKeyDown: w,
      onFocus: h,
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
o(oo, "TableRow");
function no({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(no, "TableHead");
function so({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(so, "TableCell");
function io({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
o(io, "TableCaption");
function lo({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: n = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: d = "No entries found",
  customSelectedText: w,
  isOpen: h = void 0,
  onOpenChange: g = void 0,
  isDisabled: I = !1,
  sortSelected: _ = !1,
  icon: p = void 0,
  className: b = void 0,
  variant: x = "ghost",
  id: N
}) {
  const [$, Z] = V(!1), O = X(
    (k) => {
      var u;
      const B = (u = t.find((m) => m.label === k)) == null ? void 0 : u.value;
      B && a(
        e.includes(B) ? e.filter((m) => m !== B) : [...e, B]
      );
    },
    [t, e, a]
  ), K = /* @__PURE__ */ o(() => w || r, "getPlaceholderText"), L = Y(() => {
    if (!_) return t;
    const k = t.filter((u) => u.starred).sort((u, m) => u.label.localeCompare(m.label)), B = t.filter((u) => !u.starred).sort((u, m) => {
      const C = e.includes(u.value), E = e.includes(m.value);
      return C && !E ? -1 : !C && E ? 1 : u.label.localeCompare(m.label);
    });
    return [...k, ...B];
  }, [t, e, _]), J = /* @__PURE__ */ o(() => {
    a(t.map((k) => k.value));
  }, "handleSelectAll"), T = /* @__PURE__ */ o(() => {
    a([]);
  }, "handleClearAll"), S = h ?? $;
  return /* @__PURE__ */ s("div", { id: N, className: b, children: /* @__PURE__ */ f(qt, { open: S, onOpenChange: g ?? Z, children: [
    /* @__PURE__ */ s(Nt, { asChild: !0, children: /* @__PURE__ */ f(
      U,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": S,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: I,
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ s("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ s("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ s(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: K()
              }
            )
          ] }),
          /* @__PURE__ */ s(Ot, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ s(Qt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ f(Ft, { children: [
      /* @__PURE__ */ s(
        Jt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      n && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ s(U, { variant: "ghost", size: "sm", onClick: J, children: i }),
        /* @__PURE__ */ s(U, { variant: "ghost", size: "sm", onClick: T, children: l })
      ] }),
      /* @__PURE__ */ f(Vt, { children: [
        /* @__PURE__ */ s(Xt, { children: d }),
        /* @__PURE__ */ s(Wt, { children: L.map((k) => /* @__PURE__ */ f(
          Zt,
          {
            value: k.label,
            onSelect: O,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ s("div", { className: "w-4", children: /* @__PURE__ */ s(
                Mt,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(k.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              k.starred && /* @__PURE__ */ s(me, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ s("div", { className: "tw:flex-grow", children: k.label }),
              k.secondaryLabel && /* @__PURE__ */ s("div", { className: "tw:text-end tw:text-muted-foreground", children: k.secondaryLabel })
            ]
          },
          k.label
        )) })
      ] })
    ] }) })
  ] }) });
}
o(lo, "MultiSelectComboBox");
function ot(t) {
  return t.replace(/^\+/, "");
}
o(ot, "stripMarkerNestingPrefix");
function ua(t, e, a) {
  if (!e) return [...t];
  const r = [...t], n = ot(e).toLowerCase();
  return a === "passive" ? zt({
    query: n,
    items: r,
    filter: /* @__PURE__ */ o((i) => ot(i.label).toLowerCase().startsWith(n), "filter"),
    sortBy: "label"
  }) : zt({
    query: n,
    items: r,
    filter: /* @__PURE__ */ o((i) => ot(i.label).toLowerCase().includes(n), "filter"),
    sortBy: "label"
  });
}
o(ua, "filterAndRankPaletteItems");
function wa(t) {
  return t.isComposing || t.keyCode === 229;
}
o(wa, "isImeCompositionKeyEvent");
const ae = {
  // USFM marker characters that filter the palette. Hyphens (milestones `ts-s`/`ts-e`, `qt-s`,
  // `zpa-xb`) and letter case (custom markers may be capitalized; marker search is
  // case-insensitive) are valid wherever markers are filtered. `*` is NOT here: at a collapsed
  // caret it is the CLOSING-marker commit key (see the `*` branch below), so it can never reach
  // the filter.
  backslash: /^[a-z0-9+-]$/i,
  selection: /^[a-z0-9+-]$/i
}, pa = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], ma = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function fa(t) {
  return [
    ...pa,
    ...ma.filter((e) => ae[t].test(e))
  ];
}
o(fa, "getMarkerPaletteClaimedKeys");
function R(t) {
  t.preventDefault(), t.stopPropagation();
}
o(R, "claim");
function co(t, e, a) {
  var n, i;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (R(t), a.commit(), "ended") : t.key === "Escape" ? (R(t), a.dismiss(), "ended") : "passed";
  if (wa(t) || Se.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && R(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return R(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return R(t), ua(
      e.items.map((d) => ({ label: d.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return R(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return R(t), e.filter === "" ? (a.dismiss(), "ended") : (i = e.shouldSpaceCommit) != null && i.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    R(t);
    const l = ot(e.filter).toLowerCase(), d = e.items.find(
      (w) => ot(w.marker).toLowerCase() === l
    );
    return d && a.commitItem(d.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (R(t), a.dismiss(), "ended") : (R(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (R(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (R(t), a.dismiss(), "ended") : t.key === "Backspace" || ae[r].test(t.key) ? (R(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && R(t), a.dismiss(), "ended");
}
o(co, "handleMarkerPaletteSessionKeyDown");
function uo(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
o(uo, "clearPaletteSessionIfCurrent");
function wo(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: n,
    setSession: i,
    clearSessionIfCurrent: l,
    runSessionKey: d,
    show: w,
    restoreSelectionIfLost: h,
    focusEditor: g,
    applyItem: I,
    onShowError: _
  } = t;
  n.current += 1;
  const p = n.current, b = a ? "backslash" : "selection", x = { kind: b, token: p, filter: "", items: e };
  b === "backslash" && r && (x.shouldSpaceCommit = r), i(x), w({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: fa(b),
    onKey: /* @__PURE__ */ o((N) => d(N), "onKey")
  }).then((N) => {
    if (l(p), N !== void 0) {
      h(), g();
      const $ = e.find((Z) => Z.marker === N);
      $ && I($);
    } else a || g();
  }).catch((N) => {
    l(p), a || g(), _(N);
  });
}
o(wo, "runMarkerPaletteSession");
function po({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(po, "Kbd");
function mo({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
o(mo, "KbdGroup");
function ha(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = P(a.projectId), n = e.get(r), i = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    n ? n.some((l) => l.scrollGroupId === a.scrollGroupId) || n.push(i) : e.set(r, [i]);
  }), e.forEach((a) => a.sort((r, n) => r.scrollGroupId - n.scrollGroupId)), e;
}
o(ha, "collectOpenTabsByProject");
function Dt(t, e, a) {
  const r = P(e);
  return t.some(
    (n) => P(n.projectId) === r && n.scrollGroupId === a
  );
}
o(Dt, "pairIsSelected");
function ft(t) {
  const e = ha(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((i) => {
      const l = e.get(P(i.id)) ?? [];
      return {
        rowKey: i.id,
        projectId: i.id,
        shortName: i.shortName,
        fullName: i.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: l.map((d) => d.scrollGroupId),
        isSelected: n !== void 0 && P(n) === P(i.id),
        isMuted: l.length === 0,
        isBoundButClosed: !1,
        isDisabled: i.isDisabled === !0,
        disabledReason: i.disabledReason,
        project: i
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
  return t.projects.forEach((n) => {
    const i = e.get(P(n.id));
    if (!i || i.length === 0) {
      r.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: Dt(a, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
      return;
    }
    i.forEach((l) => {
      r.push({
        rowKey: `tab:${n.id}:${l.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        scrollGroupId: l.scrollGroupId,
        scrollGroupScrRefLabel: l.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Dt(a, n.id, l.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        project: n
      });
    });
  }), a.forEach((n) => {
    if (n.scrollGroupId === void 0) return;
    const i = P(n.projectId);
    if (r.some(
      (d) => P(d.projectId) === i && d.scrollGroupId === n.scrollGroupId
    ))
      return;
    const l = t.projects.find((d) => P(d.id) === i);
    l && r.push({
      rowKey: `closed:${l.id}:${n.scrollGroupId}`,
      projectId: l.id,
      shortName: l.shortName,
      fullName: l.fullName,
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: l.isDisabled === !0,
      disabledReason: l.disabledReason,
      project: l
    });
  }), r;
}
o(ft, "computeRows");
const Tt = "Selected", Ct = "Unselected";
function Rt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
o(Rt, "belongsToOpenTabsSection");
function Q(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - n;
}
o(Q, "compareRows");
function vt(t) {
  return [{ kind: "flat", rows: [...t].sort(Q) }];
}
o(vt, "partitionFlat");
function ga(t) {
  const e = t.filter(Rt).sort(Q), a = t.filter((n) => !Rt(n)).sort(Q);
  if (e.length === 0)
    return [{ kind: "flat", rows: a }];
  const r = [{ kind: "openTabs", rows: e }];
  return a.length > 0 && r.push({ kind: "other", rows: a }), r;
}
o(ga, "partitionByOpenTabs");
function ba(t, e) {
  const a = t.filter((l) => l.isSelected).sort(Q), r = t.filter((l) => !l.isSelected).sort(Q), n = /* @__PURE__ */ o((l, d) => {
    var h;
    const w = (h = e.getSectionHeading) == null ? void 0 : h.call(
      e,
      l,
      d.map((g) => g.project)
    );
    return typeof w == "string" && w.length > 0 ? w : l === "selected" ? Tt : Ct;
  }, "headingFor"), i = [];
  return a.length > 0 && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: "selected",
    label: n("selected", a),
    rows: a
  }), r.length > 0 && i.push({
    kind: "grouping",
    groupingId: e.id,
    key: "unselected",
    label: n("unselected", r),
    rows: r
  }), i;
}
o(ba, "partitionBySelection");
function Na(t, e) {
  if (e.id === "openTabs") return ga(t);
  if (e.id === "selection") return ba(t, e);
  if (!e.getGroupKey) return vt(t);
  const a = /* @__PURE__ */ new Map(), r = [], { getGroupKey: n } = e;
  t.forEach((d) => {
    const w = n(d.project);
    if (w === void 0 || w === "") {
      r.push(d);
      return;
    }
    const h = a.get(w);
    h ? h.push(d) : a.set(w, [d]);
  });
  const i = [...a.entries()].map(([d, w]) => {
    var I;
    const h = [...w].sort(
      (_, p) => {
        var b;
        return ((b = e.compareProjects) == null ? void 0 : b.call(e, _.project, p.project)) || Q(_, p);
      }
    ), g = ((I = e.getSectionHeading) == null ? void 0 : I.call(
      e,
      d,
      h.map((_) => _.project)
    )) ?? d;
    return { key: d, heading: g, rows: h };
  });
  i.sort((d, w) => d.key === e.priorityKey ? -1 : w.key === e.priorityKey ? 1 : e.compareSections ? e.compareSections(
    { key: d.key, heading: d.heading },
    { key: w.key, heading: w.heading }
  ) : d.heading.localeCompare(w.heading, void 0, { sensitivity: "base" }));
  const l = i.map(({ key: d, heading: w, rows: h }) => ({
    kind: "grouping",
    groupingId: e.id,
    key: d,
    label: w,
    rows: h,
    isPriority: d === e.priorityKey
  }));
  return r.length > 0 && e.unknownSectionHeading && l.push({
    kind: "grouping",
    groupingId: e.id,
    key: void 0,
    label: e.unknownSectionHeading,
    rows: [...r].sort(Q)
  }), l;
}
o(Na, "partitionByGrouping");
const fo = [
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
function y(t, e) {
  const a = t[e];
  return typeof a == "string" ? a : void 0;
}
o(y, "readProjectSelectorString");
const lt = "recent", va = "other";
function re(t) {
  return {
    id: "openTabs",
    label: t ?? "Open tabs"
  };
}
o(re, "makeOpenTabsGrouping");
function xa(t) {
  const e = t ?? {};
  return [
    re(e.openTabsLabel),
    {
      id: "lastUsed",
      label: e.lastUsedLabel ?? "Last used",
      getGroupKey: /* @__PURE__ */ o((a) => {
        var r;
        return typeof ((r = a.customData) == null ? void 0 : r[rt.lastUsedAt]) == "number" ? lt : va;
      }, "getGroupKey"),
      getSectionHeading: /* @__PURE__ */ o((a) => a === lt ? e.lastUsedRecentSectionHeading ?? "Recently used" : e.lastUsedOtherSectionHeading ?? "Other", "getSectionHeading"),
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: /* @__PURE__ */ o((a, r) => a.key === lt ? -1 : r.key === lt ? 1 : 0, "compareSections")
    },
    {
      id: "language",
      label: e.languageLabel ?? "Language",
      getGroupKey: /* @__PURE__ */ o((a) => {
        var n;
        const r = (n = a.customData) == null ? void 0 : n[rt.language];
        return typeof r == "string" ? r : void 0;
      }, "getGroupKey"),
      unknownSectionHeading: e.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: e.typeLabel ?? "Type",
      getGroupKey: /* @__PURE__ */ o((a) => {
        var n;
        const r = (n = a.customData) == null ? void 0 : n[rt.type];
        return typeof r == "string" ? r : void 0;
      }, "getGroupKey"),
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: /* @__PURE__ */ o((a, r) => {
        var l;
        const n = r.find(
          (d) => {
            var w;
            return typeof ((w = d.customData) == null ? void 0 : w[rt.typeName]) == "string";
          }
        ), i = (l = n == null ? void 0 : n.customData) == null ? void 0 : l[rt.typeName];
        return typeof i == "string" && i.length > 0 ? i : a;
      }, "getSectionHeading"),
      unknownSectionHeading: e.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
o(xa, "makeBuiltInGroupings");
const ho = xa();
function ya(t) {
  const e = t ?? {};
  return {
    id: "selection",
    label: e.label ?? "Selection",
    getSectionHeading: /* @__PURE__ */ o((a) => a === "selected" ? e.selectedSectionHeading ?? Tt : e.unselectedSectionHeading ?? Ct, "getSectionHeading")
  };
}
o(ya, "makeSelectionGrouping");
function go(t) {
  return {
    openTabsLabel: y(t, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: y(t, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: y(
      t,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: y(
      t,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: y(t, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: y(
      t,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: y(t, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: y(
      t,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
o(go, "buildBuiltInGroupingStrings");
function bo(t) {
  return {
    label: y(t, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
o(bo, "buildSelectionGroupingStrings");
const Sa = 100, ka = {
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
  autoSelectionSelectedSectionHeading: Tt,
  autoSelectionUnselectedSectionHeading: Ct,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function Ia(t) {
  return { ...ka, ...t };
}
o(Ia, "resolveStrings");
function No(t) {
  return {
    searchPlaceholder: y(t, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: y(
      t,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: y(t, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: y(t, "%projectSelector_groupSectionLabel%"),
    groupByNone: y(t, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: y(
      t,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: y(
      t,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: y(
      t,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: y(
      t,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: y(
      t,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: y(
      t,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: y(t, "%projectSelector_openButtonLabel%"),
    clearAll: y(t, "%projectSelector_clearAll%")
  };
}
o(No, "buildProjectSelectorLocalizedStrings");
function it(t) {
  return Je[ke(t)] ?? String(t);
}
o(it, "scrollGroupLetterFromMap");
const Ea = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function _a({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = it(t);
  return e ? /* @__PURE__ */ s(
    ut,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ea,
      children: a
    }
  ) : /* @__PURE__ */ s(ut, { variant: "secondary", children: a });
}
o(_a, "ScrollGroupChip");
function Ta({
  row: t,
  mode: e,
  strings: a,
  onClick: r,
  onOpen: n,
  selectedRowRef: i,
  indicator: l,
  reserveIndicatorSlot: d
}) {
  const {
    ref: w,
    open: h,
    onPointerEnter: g,
    onPointerLeave: I
  } = qe(), [_, p] = V(!1), b = !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, x = h || _, N = X(() => {
    if (b) {
      p(!0);
      return;
    }
    g();
  }, [b, g]), $ = X(() => {
    p(!1), I();
  }, [I]), Z = /* @__PURE__ */ s(Mt, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let O;
  e === "project" ? t.openGroups.length > 0 && (O = /* @__PURE__ */ s("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((T) => /* @__PURE__ */ s(ut, { variant: "secondary", children: it(T) }, T)) })) : t.scrollGroupId !== void 0 && (O = /* @__PURE__ */ f("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ s(
      _a,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ f(
      U,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: /* @__PURE__ */ o((T) => {
          T.stopPropagation(), n(t);
        }, "onClick"),
        onMouseDown: /* @__PURE__ */ o((T) => T.stopPropagation(), "onMouseDown"),
        "aria-label": a.openButtonLabel,
        children: [
          /* @__PURE__ */ s(he, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const K = /* @__PURE__ */ f(
    Zt,
    {
      ref: t.isSelected ? i : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName}`,
      onSelect: /* @__PURE__ */ o(() => {
        t.isDisabled || r(t);
      }, "onSelect"),
      disabled: t.isDisabled,
      onPointerEnter: N,
      onPointerLeave: $,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ s("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: Z }),
        d && /* @__PURE__ */ s("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: l }),
        /* @__PURE__ */ f(
          "span",
          {
            ref: w,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ s("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ s("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        O
      ]
    }
  ), L = t.scrollGroupId !== void 0 ? it(t.scrollGroupId) : void 0, J = t.isBoundButClosed && L ? a.boundButClosedTooltip.replace("{group}", L) : void 0;
  return /* @__PURE__ */ f(It, { open: x, delayDuration: 400, children: [
    /* @__PURE__ */ s(Et, { asChild: !0, children: K }),
    /* @__PURE__ */ f(
      _t,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        children: [
          /* @__PURE__ */ s("div", { className: "tw:font-semibold", children: t.fullName }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && L && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              L,
              ")"
            ] })
          ] }),
          J && /* @__PURE__ */ s("div", { className: "tw:text-sm tw:italic", children: J }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ s("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
o(Ta, "ProjectRowView");
const at = "none";
function Ca({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  strings: r
}) {
  const n = e !== at;
  return /* @__PURE__ */ f(Ye, { children: [
    /* @__PURE__ */ f(It, { children: [
      /* @__PURE__ */ s(Et, { asChild: !0, children: /* @__PURE__ */ s(Qe, { asChild: !0, children: /* @__PURE__ */ s(
        U,
        {
          variant: "ghost",
          size: "sm",
          className: c(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            n && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": r.groupByAriaLabel,
          "aria-pressed": n,
          onMouseDown: /* @__PURE__ */ o((i) => i.preventDefault(), "onMouseDown"),
          children: /* @__PURE__ */ s(fe, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ s(_t, { children: r.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ f(
      ta,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Ut },
        children: [
          /* @__PURE__ */ s(aa, { children: r.groupSectionLabel }),
          /* @__PURE__ */ f(ea, { value: e, onValueChange: a, children: [
            /* @__PURE__ */ s(At, { value: at, children: r.groupByNone }),
            /* @__PURE__ */ s(ra, {}),
            t.map((i) => /* @__PURE__ */ s(At, { value: i.id, children: i.label }, i.id))
          ] })
        ]
      }
    )
  ] });
}
o(Ca, "GroupByMenu");
function Ga(t, e) {
  if (t.length === 1) return t[0].id;
  if (e) {
    if (e === at) return at;
    if (t.some((a) => a.id === e)) return e;
  }
  return t.some((a) => a.id === "openTabs") ? "openTabs" : at;
}
o(Ga, "resolveDefaultActiveGrouping");
function ht(t, e) {
  if (e === void 0) return;
  const a = P(e);
  return t.find((r) => P(r.id) === a);
}
o(ht, "findProjectById");
function vo(t) {
  const [e, a] = V(!1), [r, n] = V(""), i = Ia(t.localizedStrings), l = Y(() => {
    if (t.availableGroupings !== void 0) return t.availableGroupings;
    const u = [];
    return t.openTabs.length > 0 && u.push(re(i.autoOpenTabsGroupingLabel)), t.mode === "project-multi" && u.push(
      ya({
        label: i.autoSelectionGroupingLabel,
        selectedSectionHeading: i.autoSelectionSelectedSectionHeading,
        unselectedSectionHeading: i.autoSelectionUnselectedSectionHeading
      })
    ), u;
  }, [
    t.availableGroupings,
    t.openTabs.length,
    t.mode,
    i.autoOpenTabsGroupingLabel,
    i.autoSelectionGroupingLabel,
    i.autoSelectionSelectedSectionHeading,
    i.autoSelectionUnselectedSectionHeading
  ]), [d, w] = V(void 0), h = Y(
    () => Ga(l, t.defaultGrouping),
    [l, t.defaultGrouping]
  ), g = d ?? h, I = ct(null), _ = X((u) => {
    a(u), u || n("");
  }, []);
  Gt(() => {
    if (!e) return;
    const u = window.requestAnimationFrame(() => {
      const m = I.current;
      m && m.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(u);
  }, [e]);
  const p = Y(() => t.mode === "project" ? ft({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? ft({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : ft({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), b = Y(() => {
    const u = r.trim().toLowerCase();
    return u ? p.filter(
      (m) => m.shortName.toLowerCase().includes(u) || m.fullName.toLowerCase().includes(u)
    ) : p;
  }, [p, r]), x = Y(() => {
    if (g === at) return vt(b);
    const u = l.find((m) => m.id === g);
    return u ? Na(b, u) : vt(b);
  }, [b, g, l]), N = /* @__PURE__ */ o((u) => {
    if (u.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
    }
  }, "handleOpenProjectInGroup"), $ = /* @__PURE__ */ o((u) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: u.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const m = t.selection.pairs, C = P(u.projectId), E = /* @__PURE__ */ o((D) => P(D.projectId) === C && D.scrollGroupId === u.scrollGroupId, "match"), A = m.some(E) ? m.filter((D) => !E(D)) : [
          ...m.filter((D) => !E(D)),
          { projectId: u.projectId, scrollGroupId: u.scrollGroupId }
        ];
        t.onChangeSelection({ pairs: A });
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
        const m = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: u.projectId, scrollGroupId: m }), t.onOpenProjectInGroup(u.projectId, m), a(!1);
      }
    }
  }, "handleRowClick"), Z = /* @__PURE__ */ o(() => {
    t.mode === "project-multi" && t.onChangeSelection({ pairs: [] });
  }, "handleClearAll"), O = Y(() => {
    switch (t.mode) {
      case "project": {
        const u = ht(t.projects, t.selection.projectId);
        let m = u ? u.shortName : i.buttonPlaceholder;
        return u && t.triggerLabelFormat === "shortNameAndFullName" && u.fullName && u.fullName !== u.shortName && (m = `${u.shortName} - ${u.fullName}`), { node: m, title: m };
      }
      case "project-multi": {
        const { pairs: u } = t.selection;
        if (u.length === 0) {
          const A = i.buttonPlaceholder;
          return { node: A, title: A };
        }
        const m = [];
        if (u.forEach((A) => {
          const D = ht(t.projects, A.projectId);
          D && m.push({ project: D, scrollGroupId: A.scrollGroupId });
        }), m.length === 0) {
          const A = i.buttonPlaceholder;
          return { node: A, title: A };
        }
        const C = m.map(
          ({ project: A, scrollGroupId: D }) => D === void 0 ? A.shortName : `${A.shortName} (${it(D)})`
        ).join(", "), E = m.length.toString();
        return {
          node: /* @__PURE__ */ f(ne, { children: [
            /* @__PURE__ */ s(ut, { variant: "muted", className: "tw:shrink-0", children: E }),
            /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: C })
          ] }),
          title: `${E} ${C}`
        };
      }
      case "projectScrollGroup": {
        const u = ht(t.projects, t.selection.projectId);
        if (!u) {
          const E = i.buttonPlaceholder;
          return { node: E, title: E };
        }
        const m = t.selection.scrollGroupId;
        if (m === void 0)
          return { node: u.shortName, title: u.shortName };
        const C = `${u.shortName} · ${it(m)}`;
        return { node: C, title: C };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t, i.buttonPlaceholder]), K = ct(null), [L, J] = V(!1);
  Gt(() => {
    const u = K.current;
    if (!u) return;
    const m = /* @__PURE__ */ o((E) => {
      J(E < Sa);
    }, "update");
    if (m(u.getBoundingClientRect().width), typeof ResizeObserver > "u") return;
    const C = new ResizeObserver((E) => {
      E.forEach((A) => {
        const [D] = A.borderBoxSize;
        m(D ? D.inlineSize : u.getBoundingClientRect().width);
      });
    });
    return C.observe(u, { box: "border-box" }), () => C.disconnect();
  }, []);
  let T;
  t.isLoading ? T = /* @__PURE__ */ s(ge, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : L ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ s(Ot, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ s(be, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const S = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? N : void 0, M = /* @__PURE__ */ f(
    U,
    {
      ref: K,
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": i.ariaLabel || void 0,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: c(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        L && "tw:px-0.5 tw:text-xs",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ s("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof O.node == "string" ? /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: O.node }) : O.node }),
        T
      ]
    }
  ), k = O.title ? /* @__PURE__ */ s(Lt, { delayDuration: 400, children: /* @__PURE__ */ f(It, { children: [
    /* @__PURE__ */ s(Et, { asChild: !0, children: /* @__PURE__ */ s(Nt, { asChild: !0, children: M }) }),
    /* @__PURE__ */ s(_t, { children: O.title })
  ] }) }) : /* @__PURE__ */ s(Nt, { asChild: !0, children: M }), B = l.length > 1;
  return /* @__PURE__ */ f(qt, { open: e, onOpenChange: _, children: [
    k,
    /* @__PURE__ */ s(
      Qt,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ s(Lt, { delayDuration: 400, children: /* @__PURE__ */ f(Ft, { shouldFilter: !1, children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
            /* @__PURE__ */ s("div", { className: "tw:flex-1", children: /* @__PURE__ */ s(
              Jt,
              {
                value: r,
                onValueChange: n,
                placeholder: i.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            B && /* @__PURE__ */ s(
              Ca,
              {
                availableGroupings: l,
                activeGrouping: g,
                onChangeGrouping: w,
                strings: i
              }
            )
          ] }),
          t.mode === "project-multi" && t.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
          // project mounts a data subscription per project, so on a large installation it is a
          // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
          /* @__PURE__ */ s("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ s(U, { variant: "ghost", size: "sm", onClick: Z, children: `${i.clearAll} (${t.selection.pairs.length.toString()})` }) }),
          /* @__PURE__ */ f(Vt, { children: [
            /* @__PURE__ */ s(Xt, { children: i.commandEmptyMessage }),
            x.map((u, m) => (
              // Custom groupings yield multiple 'grouping' sections, so the section key must
              // include the label (or key) to stay stable across re-orders.
              /* @__PURE__ */ f(
                pe,
                {
                  children: [
                    /* @__PURE__ */ s(Wt, { heading: za(u, i), children: u.rows.map((C) => {
                      var E;
                      return /* @__PURE__ */ s(
                        Ta,
                        {
                          row: C,
                          mode: t.mode,
                          strings: i,
                          onClick: $,
                          onOpen: S,
                          selectedRowRef: I,
                          indicator: (E = t.renderProjectIndicator) == null ? void 0 : E.call(t, C.project),
                          reserveIndicatorSlot: !!t.renderProjectIndicator
                        },
                        C.rowKey
                      );
                    }) }),
                    m < x.length - 1 && /* @__PURE__ */ s(He, {})
                  ]
                },
                `${u.kind}:${u.groupingId ?? ""}:${u.key ?? u.label ?? ""}`
              )
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
o(vo, "ProjectSelector");
function za(t, e) {
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
o(za, "sectionHeading");
const ja = Bt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: i = !1, id: l }, d) => {
    const w = H();
    return /* @__PURE__ */ f(
      "div",
      {
        id: l,
        className: c("tw:relative tw:@container/search", { "tw:w-full": r }, n),
        children: [
          /* @__PURE__ */ s(
            Ne,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": w === "rtl" },
                { "tw:left-3": w === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ s(
            Pe,
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
              onChange: /* @__PURE__ */ o((h) => e(h.target.value), "onChange"),
              disabled: i
            }
          ),
          t && /* @__PURE__ */ f(
            U,
            {
              variant: "ghost",
              size: "icon",
              className: c(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": w === "rtl" },
                { "tw:right-0": w === "ltr" }
              ),
              onClick: /* @__PURE__ */ o(() => {
                e("");
              }, "onClick"),
              children: [
                /* @__PURE__ */ s(ve, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ s("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ja.displayName = "SearchBar";
const La = 5;
function xo(t) {
  return Fe(t).filter(
    (e) => !j.isObsolete(j.bookIdToNumber(e))
  );
}
o(xo, "getAvailableBookIds");
function Aa(t, e) {
  return t.filter((a) => {
    try {
      return Ie(a) === e;
    } catch {
      return !1;
    }
  });
}
o(Aa, "getBooksForSection");
const yo = /* @__PURE__ */ o((t, e, a) => Aa(t, e).every((r) => a.includes(r)), "isSectionFullySelected");
function Da(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => j.bookIdToNumber(r) > 0).sort((r, n) => j.bookIdToNumber(r) - j.bookIdToNumber(n)).map((r) => Ve(r, e));
}
o(Da, "localizeBookIdsInCanonOrder");
function So(t, e, a, r) {
  if (t.length === 0) return;
  const n = new Set(t.map((d) => d.toUpperCase())), i = new Set(e.map((d) => d.toUpperCase()));
  if (i.size > 0 && i.size === n.size && [...i].every((d) => n.has(d)))
    return a;
  const l = Da(t, r);
  if (l.length !== 0)
    return l.length <= La ? l.join(", ") : `${l[0]} - ${l[l.length - 1]}`;
}
o(So, "summarizeSelectedBooks");
function ko({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ s(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: c("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
o(ko, "EmptyState");
function Ra({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "empty",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
o(Ra, "Empty");
function Pa({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "empty-header",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
o(Pa, "EmptyHeader");
const Ba = W(
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
function Oa({
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ba({ variant: e }),
        t
      ),
      ...a
    }
  );
}
o(Oa, "EmptyMedia");
function Io({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "empty-title",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
o(Io, "EmptyTitle");
function Ma({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "empty-description",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
o(Ma, "EmptyDescription");
function Ha({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "empty-content",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
o(Ha, "EmptyContent");
function Eo({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: n = "alert",
  className: i
}) {
  return /* @__PURE__ */ f(Ra, { className: c(i), role: n, children: [
    /* @__PURE__ */ f(Pa, { children: [
      /* @__PURE__ */ s(Oa, { variant: "icon", children: r ?? /* @__PURE__ */ s(xe, {}) }),
      /* @__PURE__ */ s(Ma, { children: t })
    ] }),
    a && /* @__PURE__ */ s(Ha, { children: /* @__PURE__ */ s(U, { onClick: /* @__PURE__ */ o(() => a(), "onClick"), children: e }) })
  ] });
}
o(Eo, "RetryableErrorView");
const Ua = Bt(({ className: t, ...e }, a) => /* @__PURE__ */ s(ye, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
Ua.displayName = "Spinner";
const $a = W(
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
function _o({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        $a({ variant: e }),
        t
      ),
      ...a
    }
  );
}
o(_o, "Alert");
function To({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(To, "AlertTitle");
function Co({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
o(Co, "AlertDescription");
function Go({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...n
}) {
  return /* @__PURE__ */ s(
    St.Group,
    {
      "data-slot": "resizable-panel-group",
      className: c(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (i) => a(Object.values(i)) : void 0,
      ...n
    }
  );
}
o(Go, "ResizablePanelGroup");
function dt(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
o(dt, "toSizeString");
function zo({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...n
}) {
  return /* @__PURE__ */ s(
    St.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: dt(t),
      minSize: dt(e),
      maxSize: dt(a),
      collapsedSize: dt(r),
      ...n
    }
  );
}
o(zo, "ResizablePanel");
function jo({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    St.Separator,
    {
      "data-slot": "resizable-handle",
      className: c(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ s("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
o(jo, "ResizableHandle");
export {
  so as $,
  Er as A,
  U as B,
  Zt as C,
  Ye as D,
  Xt as E,
  Fr as F,
  Vr as G,
  dr as H,
  xr as I,
  wr as J,
  pr as K,
  Tr as L,
  fr as M,
  Xr as N,
  Wr as O,
  qt as P,
  Zr as Q,
  Jr as R,
  ut as S,
  Lt as T,
  We as U,
  Qr as V,
  Yr as W,
  ra as X,
  Mr as Y,
  Ht as Z,
  oo as _,
  Ve as a,
  io as a$,
  to as a0,
  eo as a1,
  no as a2,
  ao as a3,
  Br as a4,
  ea as a5,
  At as a6,
  lo as a7,
  po as a8,
  Ut as a9,
  Me as aA,
  _o as aB,
  Co as aC,
  To as aD,
  Gr as aE,
  ur as aF,
  hr as aG,
  Re as aH,
  De as aI,
  cr as aJ,
  Hr as aK,
  Ra as aL,
  Ha as aM,
  Ma as aN,
  Pa as aO,
  Oa as aP,
  ko as aQ,
  Io as aR,
  mo as aS,
  Rr as aT,
  Ar as aU,
  Dr as aV,
  jo as aW,
  zo as aX,
  Go as aY,
  Eo as aZ,
  Ua as a_,
  Pe as aa,
  ot as ab,
  He as ac,
  gr as ad,
  wo as ae,
  co as af,
  uo as ag,
  Lr as ah,
  wa as ai,
  vo as aj,
  ja as ak,
  xo as al,
  Aa as am,
  kr as an,
  yo as ao,
  jr as ap,
  mr as aq,
  Je as ar,
  Ur as as,
  $r as at,
  Pr as au,
  Kr as av,
  te as aw,
  pt as ax,
  mt as ay,
  Be as az,
  It as b,
  ro as b0,
  ir as b1,
  sr as b2,
  Le as b3,
  je as b4,
  nr as b5,
  or as b6,
  ia as b7,
  Ze as b8,
  $t as b9,
  qr as ba,
  yr as bb,
  at as bc,
  fo as bd,
  Ae as be,
  go as bf,
  No as bg,
  bo as bh,
  ho as bi,
  ua as bj,
  fa as bk,
  xa as bl,
  ya as bm,
  lr as bn,
  So as bo,
  c,
  Et as d,
  _t as e,
  Qe as f,
  Ir as g,
  ta as h,
  aa as i,
  Or as j,
  Nr as k,
  vr as l,
  _r as m,
  Wt as n,
  Ke as o,
  Sr as p,
  Nt as q,
  H as r,
  Qt as s,
  Ft as t,
  qe as u,
  Jt as v,
  Cr as w,
  br as x,
  zr as y,
  Vt as z
};
//# sourceMappingURL=resizable-kbSmn7tx.js.map
