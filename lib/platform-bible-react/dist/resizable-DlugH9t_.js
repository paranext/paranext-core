import { jsx as o, jsxs as f, Fragment as kt } from "react/jsx-runtime";
import { Slot as wt, Dialog as O, Popover as Z, Tooltip as X, Label as Vt, RadioGroup as dt, Separator as Jt, DropdownMenu as S } from "radix-ui";
import { IconX as Ut, IconSearch as Xt, IconCheck as mt, IconChevronRight as Wt } from "@tabler/icons-react";
import { Canon as z } from "@sillsdev/scripture";
import P, { useState as j, useRef as ot, useCallback as _, useEffect as It, createContext as qt, useContext as Zt, useMemo as U, Fragment as Yt, forwardRef as Ct } from "react";
import { cva as F } from "class-variance-authority";
import { ChevronsUpDown as St, Check as Et, Star as Qt, Filter as te, ArrowRight as ee, Loader2 as ae, ChevronDown as re, Search as oe, X as ne, AlertTriangle as se, LoaderCircle as ie } from "lucide-react";
import { Section as H, MODIFIER_KEYS as le, normalizeProjectId as Y, getLocalizeKeyForScrollGroupId as de, getSectionForBook as ce } from "platform-bible-utils";
import { filterAndRankItems as ht } from "@eten-tech-foundation/platform-editor";
import { Command as V } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as ft from "react-resizable-panels";
import { clsx as ue } from "clsx";
import { extendTailwindMerge as we, twMerge as me } from "tailwind-merge";
const fe = we({ prefix: "tw" });
function ct(t) {
  const e = [];
  let a = "", r = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function pe(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ct(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((w, g) => g !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((w, g) => g !== r), `!${s}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const s = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function he(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = ct(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), n = a[a.length - 1], s = ct(e), i = s.some((w) => w.startsWith("-tw-")), l = s.some((w) => w.startsWith("!tw-"));
  if (i && n.startsWith("-")) {
    const w = n.slice(1);
    return [...r, `-tw-${w}`].join(":");
  }
  if (l && n.startsWith("!")) {
    const w = n.slice(1);
    return [...r, `!tw-${w}`].join(":");
  }
  return [...r, `tw-${n}`].join(":");
}
function d(...t) {
  const e = ue(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return fe(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
  return a.forEach((w) => {
    const g = pe(w);
    r.set(g.normalized, g.original), n.push(g.normalized);
  }), me(n.join(" ")).split(" ").filter(Boolean).map((w) => {
    const g = r.get(w);
    return g ? he(w, g) : w;
  }).join(" ");
}
const ge = 600, Oa = 650, Tt = 400, be = 450, Ne = 500, ve = 550, ja = 700, zt = F(
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
function L({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...n
}) {
  const s = r ? wt.Root : "button";
  return /* @__PURE__ */ o(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: d(zt({ variant: e, size: a, className: t })),
      ...n
    }
  );
}
const Gt = "layoutDirection";
function R() {
  const t = localStorage.getItem(Gt);
  return t === "rtl" ? t : "ltr";
}
function _a(t) {
  localStorage.setItem(Gt, t);
}
function $a({ ...t }) {
  return /* @__PURE__ */ o(O.Root, { "data-slot": "dialog", ...t });
}
function Ha({ ...t }) {
  return /* @__PURE__ */ o(O.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function xe({ ...t }) {
  return /* @__PURE__ */ o(O.Portal, { "data-slot": "dialog-portal", ...t });
}
function Fa({ ...t }) {
  return /* @__PURE__ */ o(O.Close, { "data-slot": "dialog-close", ...t });
}
function ye({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    O.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: d(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: be, ...e },
      ...a
    }
  );
}
function Ka({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...s
}) {
  const i = R();
  return /* @__PURE__ */ f(xe, { children: [
    /* @__PURE__ */ o(ye, { className: r }),
    /* @__PURE__ */ f(
      O.Content,
      {
        "data-slot": "dialog-content",
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ne, ...n },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ o(O.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ f(L, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(Ut, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Va({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "dialog-header",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Ja({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ f(
    "div",
    {
      "data-slot": "dialog-footer",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ o(O.Close, { asChild: !0, children: /* @__PURE__ */ o(L, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ua({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    O.Title,
    {
      "data-slot": "dialog-title",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function Xa({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    O.Description,
    {
      "data-slot": "dialog-description",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function ke({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ o(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: d(
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
function Ie({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Ce = F(
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
function Se({
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
    /* @__PURE__ */ o(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: d(Ce({ align: e }), t),
        onClick: (r) => {
          var n, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
F("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function At({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    V,
    {
      "data-slot": "command",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function Dt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const n = R(), s = P.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !a || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), w = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      w && (i.preventDefault(), i.stopPropagation(), w.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ f(Ie, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        V.Input,
        {
          "data-slot": "command-input",
          className: d(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...r
        }
      ),
      /* @__PURE__ */ o(Se, { children: /* @__PURE__ */ o(Xt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Pt({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    V.List,
    {
      "data-slot": "command-list",
      className: d(
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
function Lt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    V.Empty,
    {
      "data-slot": "command-empty",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function Rt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    V.Group,
    {
      "data-slot": "command-group",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Ee({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    V.Separator,
    {
      "data-slot": "command-separator",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Bt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ f(
    V.Item,
    {
      "data-slot": "command-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ o(mt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Wa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "command-shortcut",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const Te = [
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
], ze = (t) => {
  var e;
  return ((e = Te[t]) == null ? void 0 : e.chapters) ?? -1;
}, Ge = z.allBookIds.filter(
  (t) => !z.isObsolete(z.bookIdToNumber(t))
);
function Ae(t) {
  const e = [], a = Math.min(t.length, z.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(z.bookNumberToId(r + 1));
  return e;
}
function y(t) {
  return `%scrollGroup_${t}%`;
}
const De = {
  [y("undefined")]: "Ø",
  [y(0)]: "A",
  [y(1)]: "B",
  [y(2)]: "C",
  [y(3)]: "D",
  [y(4)]: "E",
  [y(5)]: "F",
  [y(6)]: "G",
  [y(7)]: "H",
  [y(8)]: "I",
  [y(9)]: "J",
  [y(10)]: "K",
  [y(11)]: "L",
  [y(12)]: "M",
  [y(13)]: "N",
  [y(14)]: "O",
  [y(15)]: "P",
  [y(16)]: "Q",
  [y(17)]: "R",
  [y(18)]: "S",
  [y(19)]: "T",
  [y(20)]: "U",
  [y(21)]: "V",
  [y(22)]: "W",
  [y(23)]: "X",
  [y(24)]: "Y",
  [y(25)]: "Z"
};
function pt(t, e) {
  return ze(z.bookIdToNumber(t));
}
function nt(t, e, a) {
  const r = z.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = z.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (n = i, s = l);
  }), n;
}
function qa(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const s = nt(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(pt(s), 1),
      verseNum: 1
    };
}
function Za(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < pt(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const s = nt(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ya(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
  if (e === void 0) return;
  const i = nt(r, e, "previous");
  if (!i) return;
  const l = Math.max(pt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function Qa(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: s + 1 };
  const i = nt(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function tr(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const er = (t, e, a, r, n) => {
  switch (t) {
    case H.OT:
      return e ?? "Old Testament";
    case H.NT:
      return a ?? "New Testament";
    case H.DC:
      return r ?? "Deuterocanon";
    case H.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, ar = (t, e, a, r, n) => {
  switch (t) {
    case H.OT:
      return e ?? "OT";
    case H.NT:
      return a ?? "NT";
    case H.DC:
      return r ?? "DC";
    case H.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function rr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? z.bookIdToEnglishName(t);
}
function Pe(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const or = Object.fromEntries(
  Ge.map((t) => [t, z.bookIdToEnglishName(t)])
);
function nr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = z.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function Mt() {
  const t = P.createContext(null);
  function e({
    container: r,
    children: n
  }) {
    return /* @__PURE__ */ o(t.Provider, { value: r, children: n });
  }
  function a() {
    return P.useContext(t) ?? void 0;
  }
  return { PortalContainerProvider: e, usePortalContainer: a };
}
function Ot({ ...t }) {
  return /* @__PURE__ */ o(Z.Root, { "data-slot": "popover", ...t });
}
function ut({ ...t }) {
  return /* @__PURE__ */ o(Z.Trigger, { "data-slot": "popover-trigger", ...t });
}
const { PortalContainerProvider: Le, usePortalContainer: Re } = Mt(), sr = Le;
function jt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...n
}) {
  const s = R(), i = Re();
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Z.Portal, { container: i, children: /* @__PURE__ */ o(
      Z.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ge, ...r },
        dir: s,
        ...n
      }
    ) })
  );
}
function ir({ ...t }) {
  return /* @__PURE__ */ o(Z.Anchor, { "data-slot": "popover-anchor", ...t });
}
function lr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: d("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function dr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: d("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function cr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: d("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function gt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    X.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function _t({ ...t }) {
  return /* @__PURE__ */ o(X.Root, { "data-slot": "tooltip", ...t });
}
function $t({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    X.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? d(zt({ variant: e }), t) : t,
      ...a
    }
  );
}
const { PortalContainerProvider: Be, usePortalContainer: Me } = Mt(), ur = Be;
function Ht({
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
  children: s,
  ...i
}) {
  const l = Me();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ o(X.Portal, { container: l, children: /* @__PURE__ */ f(
      X.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset: e,
        style: { zIndex: ve, ...a },
        className: d(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        ...i,
        children: [
          s,
          r && /* @__PURE__ */ o(
            X.Arrow,
            {
              className: d(
                "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
                "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
                "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
                n
              )
            }
          )
        ]
      }
    ) })
  );
}
function Oe() {
  const [t, e] = j(!1), a = ot(null), r = _(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), n = _(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: n };
}
function wr() {
  const t = ot("none");
  return It(() => {
    const e = () => {
      t.current = "keyboard";
    }, a = () => {
      t.current = "pointer";
    };
    return document.addEventListener("keydown", e, !0), document.addEventListener("pointerdown", a, !0), () => {
      document.removeEventListener("keydown", e, !0), document.removeEventListener("pointerdown", a, !0);
    };
  }, []), t;
}
function mr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Vt.Root,
    {
      "data-slot": "label",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function fr({
  className: t,
  ...e
}) {
  const a = R();
  return /* @__PURE__ */ o(
    dt.Root,
    {
      "data-slot": "radio-group",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: a,
      ...e
    }
  );
}
function pr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    dt.Item,
    {
      "data-slot": "radio-group-item",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ o(
        dt.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ o("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
function je({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ o(
    Jt.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
const _e = F(
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
function hr({
  className: t,
  orientation: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        _e({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function gr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? wt.Root : "div";
  return /* @__PURE__ */ o(
    r,
    {
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a
    }
  );
}
function br({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ o(
    je,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...a
    }
  );
}
function Nr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function vr() {
  return /Windows/i.test(navigator.userAgent);
}
const $e = ["input", "select", "textarea", "button"], He = ["button", "textbox"], xr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const n = ot(null), [s, i] = j(void 0), [l, w] = j(void 0), g = _(
    (m) => {
      i(m);
      const v = t.find((x) => x.id === m);
      v && (e == null || e(v));
      const k = document.getElementById(m);
      k && (k.scrollIntoView({ block: "center" }), k.focus()), n.current && n.current.setAttribute("aria-activedescendant", m);
    },
    [e, t]
  ), b = _(
    (m) => {
      const v = t.find((k) => k.id === m);
      v && (w((k) => k === m ? void 0 : m), a == null || a(v));
    },
    [a, t]
  ), I = (m) => {
    if (!m) return !1;
    const v = m.tagName.toLowerCase();
    if (m.isContentEditable || $e.includes(v)) return !0;
    const k = m.getAttribute("role");
    if (k && He.includes(k)) return !0;
    const x = m.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, G = _(
    (m) => {
      var K;
      const v = m.target, k = (C) => C ? document.getElementById(C) : void 0, x = k(l), B = k(s);
      if (!!(x && v && x.contains(v) && v !== x) && I(v)) {
        if (m.key === "Escape" || m.key === "ArrowLeft" && !v.isContentEditable) {
          if (l) {
            m.preventDefault(), m.stopPropagation();
            const C = t.find((c) => c.id === l);
            C && g(C.id);
          }
          return;
        }
        if (m.key === "ArrowDown" || m.key === "ArrowUp") {
          if (!x) return;
          const C = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const c = C.findIndex((p) => p === v);
          if (c === -1) return;
          let u;
          m.key === "ArrowDown" ? u = Math.min(c + 1, C.length - 1) : u = Math.max(c - 1, 0), u !== c && (m.preventDefault(), m.stopPropagation(), (K = C[u]) == null || K.focus());
          return;
        }
        return;
      }
      const E = t.findIndex((C) => C.id === s);
      let T = E;
      switch (m.key) {
        case "ArrowDown":
          T = Math.min(E + 1, t.length - 1), m.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(E - 1, 0), m.preventDefault();
          break;
        case "Home":
          T = 0, m.preventDefault();
          break;
        case "End":
          T = t.length - 1, m.preventDefault();
          break;
        case " ":
        case "Enter":
          s && b(s), m.preventDefault(), m.stopPropagation();
          return;
        case "ArrowRight": {
          const C = B;
          if (C) {
            const c = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), u = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), p = c ?? u;
            if (p) {
              m.preventDefault(), p.focus();
              return;
            }
          }
          break;
        }
        default:
          m.key.length === 1 && !m.metaKey && !m.ctrlKey && !m.altKey && (I(v) || (r == null || r(m.key), m.preventDefault()));
          return;
      }
      const D = t[T];
      D && g(D.id);
    },
    [t, g, s, l, b, r]
  );
  return {
    listboxRef: n,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: G,
    /** Focus an option by its ID */
    focusOption: g
  };
}, Fe = F(
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
function rt({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const n = a ? wt.Root : "span";
  return /* @__PURE__ */ o(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: d(
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
const Ft = qt(void 0);
function st() {
  const t = Zt(Ft);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const it = F("", {
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
  const a = R(), r = P.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Ft.Provider, { value: r, children: /* @__PURE__ */ o(S.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function yr({
  ...t
}) {
  return /* @__PURE__ */ o(S.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ve({
  ...t
}) {
  return /* @__PURE__ */ o(S.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Je({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...n
}) {
  const s = R();
  return /* @__PURE__ */ o(S.Portal, { children: /* @__PURE__ */ o(
    S.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: d(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...n,
      children: /* @__PURE__ */ o("div", { dir: s, children: r })
    }
  ) });
}
function kr({ ...t }) {
  return /* @__PURE__ */ o(S.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Ir({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const n = R(), s = st();
  return /* @__PURE__ */ o(
    S.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: d(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: s.variant })
      ),
      dir: n,
      ...r
    }
  );
}
function bt({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...n
}) {
  const s = R(), i = st();
  return /* @__PURE__ */ f(
    S.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...n,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ o(S.ItemIndicator, { children: /* @__PURE__ */ o(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Cr({
  ...t
}) {
  return /* @__PURE__ */ o(S.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Sr({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const n = R(), s = st();
  return /* @__PURE__ */ f(
    S.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: d(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: s.variant })
      ),
      dir: n,
      ...r,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(S.ItemIndicator, { children: /* @__PURE__ */ o(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Nt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ o(
    S.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: d(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
function Ue({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    S.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: d("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Er({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: d(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Tr({ ...t }) {
  return /* @__PURE__ */ o(S.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function zr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const n = st();
  return /* @__PURE__ */ f(
    S.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: d(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        it({ variant: n.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ o(Wt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Gr({ className: t, children: e, ...a }) {
  const r = R();
  return /* @__PURE__ */ o(
    S.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: d(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...a,
      children: /* @__PURE__ */ o("div", { dir: r, children: e })
    }
  );
}
function Ar({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: d("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const vt = `
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
function Q(t, e) {
  const a = e ? `${vt}, ${e}` : vt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Xe(r)
  );
}
function Dr({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const n = P.useRef(null);
  P.useEffect(() => {
    typeof a == "function" ? a(n.current) : a && "current" in a && (a.current = n.current);
  }, [a]), P.useEffect(() => {
    const i = n.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Q(i, '[tabindex]:not([tabindex="-1"])').forEach((b) => {
          b.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const w = new MutationObserver(() => {
      l();
    });
    return w.observe(i, {
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
  const s = (i) => {
    const { current: l } = n;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Q(l)[0].focus();
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
        className: d("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
            onKeyDown: s,
            className: d(
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
function Pr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "thead",
    {
      "data-slot": "table-header",
      className: d(
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
function Lr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: d("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Rr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: d(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function We(t) {
  P.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const n = t.current ? Q(t.current) : [], s = n.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < n.length && n[i].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
function qe(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Ze(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Br({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: n,
  ...s
}) {
  const i = P.useRef(null);
  P.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), We(i);
  const l = P.useMemo(
    () => i.current ? Q(i.current) : [],
    [i]
  ), w = P.useCallback(
    (b) => {
      const { current: I } = i;
      if (!I || !I.parentElement) return;
      const G = I.closest("table"), m = G ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Q(G).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], v = m.indexOf(I), k = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (b.key === "ArrowDown" || b.key === "ArrowUp")
        b.preventDefault(), Ze(m, v, b.key);
      else if (b.key === "ArrowLeft" || b.key === "ArrowRight")
        b.preventDefault(), qe(l, k, b.key);
      else if (b.key === "Escape") {
        b.preventDefault();
        const x = I.closest("table");
        x && x.focus();
      }
      e == null || e(b);
    },
    [i, l, e]
  ), g = P.useCallback(
    (b) => {
      r && (a == null || a(b));
    },
    [r, a]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: w,
      onFocus: g,
      className: d(
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
function Mr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "th",
    {
      "data-slot": "table-head",
      className: d(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Or({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "td",
    {
      "data-slot": "table-cell",
      className: d(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function jr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: d("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function _r({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: n = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: w,
  isOpen: g = void 0,
  onOpenChange: b = void 0,
  isDisabled: I = !1,
  sortSelected: G = !1,
  icon: m = void 0,
  className: v = void 0,
  variant: k = "ghost",
  id: x
}) {
  const [B, M] = j(!1), J = _(
    (u) => {
      var N;
      const p = (N = t.find((h) => h.label === u)) == null ? void 0 : N.value;
      p && a(
        e.includes(p) ? e.filter((h) => h !== p) : [...e, p]
      );
    },
    [t, e, a]
  ), E = () => w || r, T = U(() => {
    if (!G) return t;
    const u = t.filter((N) => N.starred).sort((N, h) => N.label.localeCompare(h.label)), p = t.filter((N) => !N.starred).sort((N, h) => {
      const $ = e.includes(N.value), et = e.includes(h.value);
      return $ && !et ? -1 : !$ && et ? 1 : N.label.localeCompare(h.label);
    });
    return [...u, ...p];
  }, [t, e, G]), D = () => {
    a(t.map((u) => u.value));
  }, K = () => {
    a([]);
  }, C = g ?? B;
  return /* @__PURE__ */ o("div", { id: x, className: v, children: /* @__PURE__ */ f(Ot, { open: C, onOpenChange: b ?? M, children: [
    /* @__PURE__ */ o(ut, { asChild: !0, children: /* @__PURE__ */ f(
      L,
      {
        variant: k,
        role: "combobox",
        "aria-expanded": C,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: I,
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            m && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: m }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: d(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: E()
              }
            )
          ] }),
          /* @__PURE__ */ o(St, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(jt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ f(At, { children: [
      /* @__PURE__ */ o(
        Dt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      n && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: D, children: s }),
        /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: K, children: i })
      ] }),
      /* @__PURE__ */ f(Pt, { children: [
        /* @__PURE__ */ o(Lt, { children: l }),
        /* @__PURE__ */ o(Rt, { children: T.map((u) => /* @__PURE__ */ f(
          Bt,
          {
            value: u.label,
            onSelect: J,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Et,
                {
                  className: d(
                    "tw:h-4 tw:w-4",
                    e.includes(u.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              u.starred && /* @__PURE__ */ o(Qt, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: u.label }),
              u.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: u.secondaryLabel })
            ]
          },
          u.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function W(t) {
  return t.replace(/^\+/, "");
}
function Ye(t, e, a) {
  if (!e) return [...t];
  const r = [...t], n = W(e).toLowerCase();
  return a === "passive" ? ht({
    query: n,
    items: r,
    filter: (s) => W(s.label).toLowerCase().startsWith(n),
    sortBy: "label"
  }) : ht({
    query: n,
    items: r,
    filter: (s) => W(s.label).toLowerCase().includes(n),
    sortBy: "label"
  });
}
function Qe(t) {
  return t.isComposing || t.keyCode === 229;
}
const Kt = {
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
    ...ea.filter((e) => Kt[t].test(e))
  ];
}
function A(t) {
  t.preventDefault(), t.stopPropagation();
}
function $r(t, e, a) {
  var n, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (A(t), a.commit(), "ended") : t.key === "Escape" ? (A(t), a.dismiss(), "ended") : "passed";
  if (Qe(t) || le.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && A(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return A(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return A(t), Ye(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return A(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return A(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    A(t);
    const i = W(e.filter).toLowerCase(), l = e.items.find(
      (w) => W(w.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (A(t), a.dismiss(), "ended") : (A(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (A(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (A(t), a.dismiss(), "ended") : t.key === "Backspace" || Kt[r].test(t.key) ? (A(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && A(t), a.dismiss(), "ended");
}
function Hr(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function Fr(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: n,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: w,
    restoreSelectionIfLost: g,
    focusEditor: b,
    applyItem: I,
    onShowError: G
  } = t;
  n.current += 1;
  const m = n.current, v = a ? "backslash" : "selection", k = { kind: v, token: m, filter: "", items: e };
  v === "backslash" && r && (k.shouldSpaceCommit = r), s(k), w({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: aa(v),
    onKey: (x) => l(x)
  }).then((x) => {
    if (i(m), x !== void 0) {
      g(), b();
      const B = e.find((M) => M.marker === x);
      B && I(B);
    } else a || b();
  }).catch((x) => {
    i(m), a || b(), G(x);
  });
}
function Kr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd",
      className: d(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function Vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: d("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function ra(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Y(a.projectId), n = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    n ? n.some((i) => i.scrollGroupId === a.scrollGroupId) || n.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, n) => r.scrollGroupId - n.scrollGroupId)), e;
}
function xt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function lt(t) {
  const e = ra(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(Y(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        language: s.language,
        languageCode: s.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: n === s.id,
        isMuted: i.length === 0,
        isBoundButClosed: !1,
        isDisabled: s.isDisabled === !0,
        disabledReason: s.disabledReason,
        versificationId: s.versificationId,
        versificationName: s.versificationName
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
    const s = e.get(Y(n.id));
    if (!s || s.length === 0) {
      r.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: xt(a, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName
      });
      return;
    }
    s.forEach((i) => {
      r.push({
        rowKey: `tab:${n.id}:${i.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: xt(a, n.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName
      });
    });
  }), a.forEach((n) => {
    if (n.scrollGroupId === void 0 || r.some((i) => i.projectId === n.projectId && i.scrollGroupId === n.scrollGroupId))
      return;
    const s = t.projects.find((i) => i.id === n.projectId);
    s && r.push({
      rowKey: `closed:${s.id}:${n.scrollGroupId}`,
      projectId: s.id,
      shortName: s.shortName,
      fullName: s.fullName,
      language: s.language,
      languageCode: s.languageCode,
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: s.isDisabled === !0,
      disabledReason: s.disabledReason,
      versificationId: s.versificationId,
      versificationName: s.versificationName
    });
  }), r;
}
function yt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function q(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - n;
}
function oa(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(q) }];
  const a = t.filter(yt).sort(q), r = t.filter((s) => !yt(s)).sort(q);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function na(t, e, a) {
  const r = /* @__PURE__ */ new Map(), n = [];
  t.forEach((l) => {
    const w = l.versificationId;
    if (w === void 0 || w === "") {
      n.push(l);
      return;
    }
    const g = l.versificationName ?? w, b = r.get(w);
    b ? (b.rows.push(l), !b.label && l.versificationName && (b.label = l.versificationName)) : r.set(w, { label: g, rows: [l] });
  });
  const s = [...r.entries()].map(([l, { label: w, rows: g }]) => ({
    id: l,
    label: w,
    rows: [...g].sort(q)
  }));
  s.sort((l, w) => l.id === e ? -1 : w.id === e ? 1 : l.label.localeCompare(w.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: l, label: w, rows: g }) => ({
    kind: "versification",
    rows: g,
    label: w,
    isPriority: l === e
  }));
  return n.length > 0 && i.push({
    kind: "versification",
    rows: [...n].sort(q),
    label: a,
    isPriority: !1
  }), i;
}
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
function tt(t) {
  return De[de(t)] ?? String(t);
}
const la = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function da({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = tt(t);
  return e ? /* @__PURE__ */ o(
    rt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: la,
      children: a
    }
  ) : /* @__PURE__ */ o(rt, { variant: "secondary", children: a });
}
function ca({ row: t, mode: e, strings: a, onClick: r, onOpen: n, selectedRowRef: s }) {
  const {
    ref: i,
    open: l,
    onPointerEnter: w,
    onPointerLeave: g
  } = Oe(), [b, I] = j(!1), G = !!(t.language || t.languageCode), m = G || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, v = l || b, k = _(() => {
    if (m) {
      I(!0);
      return;
    }
    w();
  }, [m, w]), x = _(() => {
    I(!1), g();
  }, [g]), B = /* @__PURE__ */ o(Et, { className: d("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((D) => /* @__PURE__ */ o(rt, { variant: "secondary", children: tt(D) }, D)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ f("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      da,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ f(
      L,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (D) => {
          D.stopPropagation(), n(t);
        },
        onMouseDown: (D) => D.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ o(ee, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const J = /* @__PURE__ */ f(
    Bt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: k,
      onPointerLeave: x,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: B }),
        /* @__PURE__ */ f(
          "span",
          {
            ref: i,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ o("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        M
      ]
    }
  ), E = t.scrollGroupId !== void 0 ? tt(t.scrollGroupId) : void 0, T = t.isBoundButClosed && E ? a.boundButClosedTooltip.replace("{group}", E) : void 0;
  return /* @__PURE__ */ f(_t, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ o($t, { asChild: !0, children: J }),
    /* @__PURE__ */ f(
      Ht,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Tt },
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", children: t.fullName }),
          G && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && E && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              E,
              ")"
            ] })
          ] }),
          T && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: T }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function ua({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: n
}) {
  const s = !!a;
  return /* @__PURE__ */ f(Ke, { children: [
    /* @__PURE__ */ o(Ve, { asChild: !0, children: /* @__PURE__ */ o(
      L,
      {
        variant: "ghost",
        size: "sm",
        className: d(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          s && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": n.filterAriaLabel,
        "aria-pressed": s,
        title: n.filterAriaLabel,
        onMouseDown: (i) => i.preventDefault(),
        children: /* @__PURE__ */ o(te, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ f(Je, { align: "end", className: "tw:w-56", style: { zIndex: Tt }, children: [
      /* @__PURE__ */ o(Nt, { children: n.groupSectionLabel }),
      /* @__PURE__ */ o(
        bt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: n.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ f(kt, { children: [
        /* @__PURE__ */ o(Ue, {}),
        /* @__PURE__ */ o(Nt, { children: n.filterSectionLabel }),
        /* @__PURE__ */ o(
          bt,
          {
            checked: !!a,
            onCheckedChange: r,
            onSelect: (i) => i.preventDefault(),
            children: n.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Jr(t) {
  const [e, a] = j(!1), [r, n] = j(""), [s, i] = j(t.defaultGroupByOpenTabs ?? !0), [l, w] = j(!1), g = ot(null), b = _((c) => {
    a(c), c || n("");
  }, []);
  It(() => {
    if (!e) return;
    const c = window.requestAnimationFrame(() => {
      const u = g.current;
      u && u.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(c);
  }, [e]);
  const I = ia(t.localizedStrings), G = U(() => t.mode === "project" ? lt({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), m = U(() => {
    const c = r.trim().toLowerCase();
    let u = G;
    return c && (u = u.filter(
      (p) => p.shortName.toLowerCase().includes(c) || p.fullName.toLowerCase().includes(c) || (p.language ?? "").toLowerCase().includes(c) || (p.languageCode ?? "").toLowerCase().includes(c)
    )), t.mode === "project-multi" && l && (u = u.filter((p) => p.isSelected)), u;
  }, [G, r, t.mode, l]), v = U(
    () => t.groupByVersification ? na(
      m,
      t.priorityVersificationId,
      I.versificationUnknownSectionHeading
    ) : oa(m, s),
    [
      m,
      s,
      t.groupByVersification,
      t.priorityVersificationId,
      I.versificationUnknownSectionHeading
    ]
  ), k = U(() => {
    if (t.mode !== "project-multi") return [];
    const c = [];
    return t.projects.forEach((u) => {
      const p = t.openTabs.filter(
        (h) => Y(h.projectId) === Y(u.id)
      );
      if (p.length === 0) {
        c.push({ projectId: u.id });
        return;
      }
      const N = /* @__PURE__ */ new Set();
      p.forEach((h) => {
        N.has(h.scrollGroupId) || (N.add(h.scrollGroupId), c.push({ projectId: u.id, scrollGroupId: h.scrollGroupId }));
      });
    }), c;
  }, [t.mode, t.projects, t.openTabs]), x = (c) => {
    if (c.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
    }
  }, B = (c) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: c.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const u = t.selection.pairs, p = (h) => h.projectId === c.projectId && h.scrollGroupId === c.scrollGroupId, N = u.some(p) ? u.filter((h) => !p(h)) : [...u, { projectId: c.projectId, scrollGroupId: c.scrollGroupId }];
        t.onChangeSelection({ pairs: N }), N.length === 0 && l && w(!1);
        return;
      }
      case "projectScrollGroup": {
        if (c.isBoundButClosed && c.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(c.projectId, c.scrollGroupId), a(!1);
          return;
        }
        if (c.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: c.projectId,
            scrollGroupId: c.scrollGroupId
          }), a(!1);
          return;
        }
        const u = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: c.projectId, scrollGroupId: u }), t.onOpenProjectInGroup(c.projectId, u), a(!1);
      }
    }
  }, M = () => {
    if (t.mode !== "project-multi") return;
    const c = t.selection.pairs, u = new Set(c.map((N) => `${N.projectId}:${N.scrollGroupId ?? ""}`)), p = [...c];
    k.forEach((N) => {
      const h = `${N.projectId}:${N.scrollGroupId ?? ""}`;
      u.has(h) || (u.add(h), p.push(N));
    }), t.onChangeSelection({ pairs: p });
  }, J = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), l && w(!1));
  }, E = U(() => {
    switch (t.mode) {
      case "project": {
        const c = t.projects.find((p) => p.id === t.selection.projectId);
        let u = c ? c.shortName : t.buttonPlaceholder ?? "";
        return c && t.triggerLabelFormat === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (u = `${c.shortName} - ${c.fullName}`), { node: u, title: u };
      }
      case "project-multi": {
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const h = t.buttonPlaceholder ?? "";
          return { node: h, title: h };
        }
        const u = [];
        if (c.forEach((h) => {
          const $ = t.projects.find((et) => et.id === h.projectId);
          $ && u.push({ project: $, scrollGroupId: h.scrollGroupId });
        }), u.length === 0) {
          const h = t.buttonPlaceholder ?? "";
          return { node: h, title: h };
        }
        if (t.getSelectedText) {
          const h = t.getSelectedText(u);
          return { node: h, title: h };
        }
        const p = u.map(
          ({ project: h, scrollGroupId: $ }) => $ === void 0 ? h.shortName : `${h.shortName} (${tt($)})`
        ).join(", ");
        if (u.length === 1) return { node: p, title: p };
        const N = u.length.toString();
        return {
          node: /* @__PURE__ */ f(kt, { children: [
            /* @__PURE__ */ o(rt, { variant: "muted", className: "tw:shrink-0", children: N }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: p })
          ] }),
          title: `${N} ${p}`
        };
      }
      case "projectScrollGroup": {
        const c = t.projects.find((N) => N.id === t.selection.projectId);
        if (!c) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        const u = t.selection.scrollGroupId;
        if (u === void 0)
          return { node: c.shortName, title: c.shortName };
        const p = `${c.shortName} · ${tt(u)}`;
        return { node: p, title: p };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ o(ae, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ o(St, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ o(re, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const D = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? x : void 0, K = /* @__PURE__ */ f(
    L,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: d(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof E.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: E.node }) : E.node }),
        T
      ]
    }
  ), C = E.title ? /* @__PURE__ */ o(gt, { delayDuration: 400, children: /* @__PURE__ */ f(_t, { children: [
    /* @__PURE__ */ o($t, { asChild: !0, children: /* @__PURE__ */ o(ut, { asChild: !0, children: K }) }),
    /* @__PURE__ */ o(Ht, { children: E.title })
  ] }) }) : /* @__PURE__ */ o(ut, { asChild: !0, children: K });
  return /* @__PURE__ */ f(Ot, { open: e, onOpenChange: b, children: [
    C,
    /* @__PURE__ */ o(
      jt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: d("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ o(gt, { delayDuration: 400, children: /* @__PURE__ */ f(At, { shouldFilter: !1, children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
              Dt,
              {
                value: r,
                onValueChange: n,
                placeholder: I.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.groupByVersification && !t.hideFilterMenu && /* @__PURE__ */ o(
              ua,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? l : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? w : void 0,
                strings: I
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: M, children: `${I.selectAll} (${k.length.toString()})` }),
            /* @__PURE__ */ o(L, { variant: "ghost", size: "sm", onClick: J, children: `${I.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ f(Pt, { children: [
            /* @__PURE__ */ o(Lt, { children: t.commandEmptyMessage ?? "No projects found" }),
            v.map((c, u) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ f(Yt, { children: [
                /* @__PURE__ */ o(Rt, { heading: wa(c, I), children: c.rows.map((p) => /* @__PURE__ */ o(
                  ca,
                  {
                    row: p,
                    mode: t.mode,
                    strings: I,
                    onClick: B,
                    onOpen: D,
                    selectedRowRef: g
                  },
                  p.rowKey
                )) }),
                u < v.length - 1 && /* @__PURE__ */ o(Ee, {})
              ] }, `${c.kind}:${c.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
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
const ma = Ct(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: s = !1, id: i }, l) => {
    const w = R();
    return /* @__PURE__ */ f(
      "div",
      {
        id: i,
        className: d("tw:relative tw:@container/search", { "tw:w-full": r }, n),
        children: [
          /* @__PURE__ */ o(
            oe,
            {
              className: d(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": w === "rtl" },
                { "tw:left-3": w === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            ke,
            {
              ref: l,
              className: d(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: (g) => e(g.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ f(
            L,
            {
              variant: "ghost",
              size: "icon",
              className: d(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": w === "rtl" },
                { "tw:right-0": w === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(ne, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
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
function Ur(t) {
  return Ae(t).filter(
    (e) => !z.isObsolete(z.bookIdToNumber(e))
  );
}
function pa(t, e) {
  return t.filter((a) => {
    try {
      return ce(a) === e;
    } catch {
      return !1;
    }
  });
}
const Xr = (t, e, a) => pa(t, e).every((r) => a.includes(r));
function ha(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => z.bookIdToNumber(r) > 0).sort((r, n) => z.bookIdToNumber(r) - z.bookIdToNumber(n)).map((r) => Pe(r, e));
}
function Wr(t, e, a, r) {
  if (t.length === 0) return;
  const n = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === n.size && [...s].every((l) => n.has(l)))
    return a;
  const i = ha(t, r);
  if (i.length !== 0)
    return i.length <= fa ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function qr({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: d("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
function ga({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function ba({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-header",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        t
      ),
      ...e
    }
  );
}
const Na = F(
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
function va({
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Na({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function Zr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-title",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        t
      ),
      ...e
    }
  );
}
function xa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-description",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        t
      ),
      ...e
    }
  );
}
function ya({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-content",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        t
      ),
      ...e
    }
  );
}
function Yr({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: n = "alert",
  className: s
}) {
  return /* @__PURE__ */ f(ga, { className: d(s), role: n, children: [
    /* @__PURE__ */ f(ba, { children: [
      /* @__PURE__ */ o(va, { variant: "icon", children: r ?? /* @__PURE__ */ o(se, {}) }),
      /* @__PURE__ */ o(xa, { children: t })
    ] }),
    a && /* @__PURE__ */ o(ya, { children: /* @__PURE__ */ o(L, { onClick: () => a(), children: e }) })
  ] });
}
const ka = Ct(({ className: t, ...e }, a) => /* @__PURE__ */ o(ie, { size: 35, className: d("tw:animate-spin", t), ...e, ref: a }));
ka.displayName = "Spinner";
const Ia = F(
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
function Qr({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: d(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ia({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function to({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-title",
      className: d(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function eo({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert-description",
      className: d(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        t
      ),
      ...e
    }
  );
}
function ao({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    ft.Group,
    {
      "data-slot": "resizable-panel-group",
      className: d(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...n
    }
  );
}
function at(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function ro({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    ft.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: at(t),
      minSize: at(e),
      maxSize: at(a),
      collapsedSize: at(r),
      ...n
    }
  );
}
function oo({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    ft.Separator,
    {
      "data-slot": "resizable-handle",
      className: d(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Pr as $,
  or as A,
  L as B,
  Bt as C,
  $a as D,
  hr as E,
  br as F,
  Nr as G,
  Ir as H,
  Qa as I,
  rt as J,
  Ke as K,
  mr as L,
  Ve as M,
  Je as N,
  Ar as O,
  Ot as P,
  xr as Q,
  fr as R,
  je as S,
  gt as T,
  Nt as U,
  Ue as V,
  bt as W,
  Br as X,
  Or as Y,
  ge as Z,
  Dr as _,
  Pe as a,
  Rr as a$,
  Mr as a0,
  Lr as a1,
  kr as a2,
  Cr as a3,
  Sr as a4,
  _r as a5,
  Kr as a6,
  Oa as a7,
  ke as a8,
  W as a9,
  Qr as aA,
  eo as aB,
  to as aC,
  gr as aD,
  Fa as aE,
  Xa as aF,
  ye as aG,
  xe as aH,
  Ha as aI,
  Er as aJ,
  ga as aK,
  ya as aL,
  xa as aM,
  ba as aN,
  va as aO,
  qr as aP,
  Zr as aQ,
  Vr as aR,
  cr as aS,
  lr as aT,
  dr as aU,
  oo as aV,
  ro as aW,
  ao as aX,
  Yr as aY,
  ka as aZ,
  jr as a_,
  Ee as aa,
  Wa as ab,
  Fr as ac,
  $r as ad,
  Hr as ae,
  ir as af,
  Qe as ag,
  Jr as ah,
  Tt as ai,
  ma as aj,
  Ur as ak,
  pa as al,
  ar as am,
  Xr as an,
  sr as ao,
  Ja as ap,
  De as aq,
  Tr as ar,
  zr as as,
  yr as at,
  Gr as au,
  Ft as av,
  st as aw,
  it as ax,
  Ie as ay,
  Se as az,
  wr as b,
  ur as b0,
  ja as b1,
  Ne as b2,
  be as b3,
  Fe as b4,
  _e as b5,
  zt as b6,
  vr as b7,
  tr as b8,
  ve as b9,
  Ye as ba,
  aa as bb,
  _a as bc,
  Wr as bd,
  d as c,
  _t as d,
  $t as e,
  Ht as f,
  rr as g,
  ut as h,
  jt as i,
  At as j,
  Pt as k,
  Rt as l,
  Za as m,
  Ya as n,
  nr as o,
  Ge as p,
  er as q,
  R as r,
  Dt as s,
  Lt as t,
  Oe as u,
  pr as v,
  Ka as w,
  qa as x,
  Va as y,
  Ua as z
};
//# sourceMappingURL=resizable-DlugH9t_.js.map
