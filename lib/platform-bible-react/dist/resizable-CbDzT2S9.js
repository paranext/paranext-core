import { jsx as o, jsxs as f, Fragment as lt } from "react/jsx-runtime";
import { Slot as wt, Dialog as j, Popover as Y, Tooltip as Z, Label as Wt, RadioGroup as dt, ToggleGroup as St, Separator as Zt, DropdownMenu as T } from "radix-ui";
import { IconX as qt, IconSearch as Yt, IconCheck as mt, IconChevronRight as Qt } from "@tabler/icons-react";
import { Canon as A } from "@sillsdev/scripture";
import z, { useState as U, useRef as ft, useCallback as $, createContext as te, useContext as ee, useMemo as W, useEffect as ae, Fragment as re, forwardRef as Ct } from "react";
import { cva as H } from "class-variance-authority";
import { ChevronsUpDown as Et, Check as Tt, Star as ne, Filter as oe, ArrowRight as se, Loader2 as ie, ChevronDown as le, Search as de, X as ce, AlertTriangle as ue, LoaderCircle as we } from "lucide-react";
import { Section as V, MODIFIER_KEYS as me, normalizeProjectId as Q, getLocalizeKeyForScrollGroupId as fe, getSectionForBook as pe } from "platform-bible-utils";
import { filterAndRankItems as gt } from "@eten-tech-foundation/platform-editor";
import { Command as K } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as pt from "react-resizable-panels";
import { clsx as he } from "clsx";
import { extendTailwindMerge as ge, twMerge as be } from "tailwind-merge";
const Ne = ge({ prefix: "tw" });
function ct(t) {
  const e = [];
  let a = "", r = 0;
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function ve(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ct(t), a = e.findIndex((s) => s.startsWith("-tw-"));
  if (a !== -1) {
    const s = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((u, p) => p !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((u, p) => p !== r), `!${s}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const s = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function xe(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = ct(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), n = a[a.length - 1], s = ct(e), i = s.some((u) => u.startsWith("-tw-")), l = s.some((u) => u.startsWith("!tw-"));
  if (i && n.startsWith("-")) {
    const u = n.slice(1);
    return [...r, `-tw-${u}`].join(":");
  }
  if (l && n.startsWith("!")) {
    const u = n.slice(1);
    return [...r, `!tw-${u}`].join(":");
  }
  return [...r, `tw-${n}`].join(":");
}
function c(...t) {
  const e = he(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Ne(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), n = [];
  return a.forEach((u) => {
    const p = ve(u);
    r.set(p.normalized, p.original), n.push(p.normalized);
  }), be(n.join(" ")).split(" ").filter(Boolean).map((u) => {
    const p = r.get(u);
    return p ? xe(u, p) : u;
  }).join(" ");
}
const Gt = 600, Ka = 650, Ja = 400, ye = 450, ke = 500, Ie = 550, Xa = 650, Wa = 700, Za = 800, zt = H(
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
function R({
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
      className: c(zt({ variant: e, size: a, className: t })),
      ...n
    }
  );
}
const At = "layoutDirection";
function O() {
  const t = localStorage.getItem(At);
  return t === "rtl" ? t : "ltr";
}
function qa(t) {
  localStorage.setItem(At, t);
}
function Ya({ ...t }) {
  return /* @__PURE__ */ o(j.Root, { "data-slot": "dialog", ...t });
}
function Qa({ ...t }) {
  return /* @__PURE__ */ o(j.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Se({ ...t }) {
  return /* @__PURE__ */ o(j.Portal, { "data-slot": "dialog-portal", ...t });
}
function tr({ ...t }) {
  return /* @__PURE__ */ o(j.Close, { "data-slot": "dialog-close", ...t });
}
function Ce({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    j.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: c(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: ye, ...e },
      ...a
    }
  );
}
function er({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: n,
  ...s
}) {
  const i = O();
  return /* @__PURE__ */ f(Se, { children: [
    /* @__PURE__ */ o(Ce, { className: r }),
    /* @__PURE__ */ f(
      j.Content,
      {
        "data-slot": "dialog-content",
        className: c(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ke, ...n },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ o(j.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ f(R, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ o(qt, {}),
            /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function ar({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function rr({
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
        e && /* @__PURE__ */ o(j.Close, { asChild: !0, children: /* @__PURE__ */ o(R, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function nr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function or({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
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
function Ee({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ o(
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
function Te({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const Ge = H(
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
    /* @__PURE__ */ o(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: c(Ge({ align: e }), t),
        onClick: (r) => {
          var n, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (n = r.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
H("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Lt({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    K,
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
function Dt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem: a = !1,
  ...r
}) {
  const n = O(), s = z.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || !a || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), u = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (i.preventDefault(), i.stopPropagation(), u.click());
    },
    [e, a]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ o("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: n, children: /* @__PURE__ */ f(Te, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ o(
        K.Input,
        {
          "data-slot": "command-input",
          className: c(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: s,
          ...r
        }
      ),
      /* @__PURE__ */ o(ze, { children: /* @__PURE__ */ o(Yt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Rt({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    K.List,
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
function Ot({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    K.Empty,
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
function Pt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    K.Group,
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
function Ae({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    K.Separator,
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
function Bt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ f(
    K.Item,
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
        /* @__PURE__ */ o(mt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function sr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const Le = [
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
], De = (t) => {
  var e;
  return ((e = Le[t]) == null ? void 0 : e.chapters) ?? -1;
}, Re = A.allBookIds.filter(
  (t) => !A.isObsolete(A.bookIdToNumber(t))
);
function Oe(t) {
  const e = [], a = Math.min(t.length, A.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    t[r] === "1" && e.push(A.bookNumberToId(r + 1));
  return e;
}
function k(t) {
  return `%scrollGroup_${t}%`;
}
const Pe = {
  [k("undefined")]: "Ø",
  [k(0)]: "A",
  [k(1)]: "B",
  [k(2)]: "C",
  [k(3)]: "D",
  [k(4)]: "E",
  [k(5)]: "F",
  [k(6)]: "G",
  [k(7)]: "H",
  [k(8)]: "I",
  [k(9)]: "J",
  [k(10)]: "K",
  [k(11)]: "L",
  [k(12)]: "M",
  [k(13)]: "N",
  [k(14)]: "O",
  [k(15)]: "P",
  [k(16)]: "Q",
  [k(17)]: "R",
  [k(18)]: "S",
  [k(19)]: "T",
  [k(20)]: "U",
  [k(21)]: "V",
  [k(22)]: "W",
  [k(23)]: "X",
  [k(24)]: "Y",
  [k(25)]: "Z"
};
function ht(t, e) {
  return De(A.bookIdToNumber(t));
}
function nt(t, e, a) {
  const r = A.bookIdToNumber(t);
  let n, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = A.bookIdToNumber(i);
    (a === "next" ? l > r && l < s : l < r && l > s) && (n = i, s = l);
  }), n;
}
function ir(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n > 1)
    return { book: r, chapterNum: n - 1, verseNum: 1 };
  const s = nt(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(ht(s), 1),
      verseNum: 1
    };
}
function lr(t, e, a) {
  const { book: r, chapterNum: n } = t;
  if (e.includes(r) && n < ht(r))
    return { book: r, chapterNum: n + 1, verseNum: 1 };
  const s = nt(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function dr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: n, verseNum: s - 1 } : s === 1 && n === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: n, verseNum: 0 };
  if (e === void 0) return;
  const i = nt(r, e, "previous");
  if (!i) return;
  const l = Math.max(ht(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function cr(t, e, a) {
  const { book: r, chapterNum: n, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: n, verseNum: s + 1 };
  const i = nt(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function ur(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
const wr = (t, e, a, r, n) => {
  switch (t) {
    case V.OT:
      return e ?? "Old Testament";
    case V.NT:
      return a ?? "New Testament";
    case V.DC:
      return r ?? "Deuterocanon";
    case V.Extra:
      return n ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, mr = (t, e, a, r, n) => {
  switch (t) {
    case V.OT:
      return e ?? "OT";
    case V.NT:
      return a ?? "NT";
    case V.DC:
      return r ?? "DC";
    case V.Extra:
      return n ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function fr(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? A.bookIdToEnglishName(t);
}
function Be(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const pr = Object.fromEntries(
  Re.map((t) => [t, A.bookIdToEnglishName(t)])
);
function hr(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const n = A.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(n.toLowerCase().includes(r) || t.toLowerCase().includes(r) || (s ? s.localizedName.toLowerCase().includes(r) || s.localizedId.toLowerCase().includes(r) : !1));
}
function Mt({ ...t }) {
  return /* @__PURE__ */ o(Y.Root, { "data-slot": "popover", ...t });
}
function ut({ ...t }) {
  return /* @__PURE__ */ o(Y.Trigger, { "data-slot": "popover-trigger", ...t });
}
const _t = z.createContext(null);
function gr({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ o(_t.Provider, { value: t, children: e });
}
function jt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...n
}) {
  const s = O(), i = z.useContext(_t);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ o(Y.Portal, { container: i ?? void 0, children: /* @__PURE__ */ o(
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
        style: { zIndex: Gt, ...r },
        dir: s,
        ...n
      }
    ) })
  );
}
function br({ ...t }) {
  return /* @__PURE__ */ o(Y.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Nr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-header",
      className: c("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function vr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "popover-title",
      className: c("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "p",
    {
      "data-slot": "popover-description",
      className: c("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function bt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ o(
    Z.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ut({ ...t }) {
  return /* @__PURE__ */ o(Z.Root, { "data-slot": "tooltip", ...t });
}
function $t({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    Z.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? c(zt({ variant: e }), t) : t,
      ...a
    }
  );
}
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
  return /* @__PURE__ */ o(Z.Portal, { children: /* @__PURE__ */ f(
    Z.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Ie, ...a },
      className: c(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ o(
          Z.Arrow,
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
function Me() {
  const [t, e] = U(!1), a = ft(null), r = $(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), n = $(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: n };
}
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    Wt.Root,
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
function kr({
  className: t,
  ...e
}) {
  const a = O();
  return /* @__PURE__ */ o(
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
function Ir({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ o(
    dt.Item,
    {
      "data-slot": "radio-group-item",
      className: c(
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
const _e = H(
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
), Ft = z.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Sr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: n = "horizontal",
  children: s,
  ...i
}) {
  const l = O();
  return /* @__PURE__ */ o(
    St.Root,
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
      dir: l,
      ...i,
      children: /* @__PURE__ */ o(
        Ft.Provider,
        {
          value: z.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: n }),
            [e, a, r, n]
          ),
          children: s
        }
      )
    }
  );
}
function Cr({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...n
}) {
  const s = z.useContext(Ft);
  return /* @__PURE__ */ o(
    St.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: c(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        _e({
          variant: s.variant || a,
          size: s.size || r
        }),
        t
      ),
      ...n,
      children: e
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
    Zt.Root,
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
const Ue = H(
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
function Er({
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
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ue({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Tr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? wt.Root : "div";
  return /* @__PURE__ */ o(
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
function Gr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ o(
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
function zr() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Ar() {
  return /Windows/i.test(navigator.userAgent);
}
const $e = ["input", "select", "textarea", "button"], He = ["button", "textbox"], Lr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const n = ft(null), [s, i] = U(void 0), [l, u] = U(void 0), p = $(
    (w) => {
      i(w);
      const b = t.find((x) => x.id === w);
      b && (e == null || e(b));
      const I = document.getElementById(w);
      I && (I.scrollIntoView({ block: "center" }), I.focus()), n.current && n.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), g = $(
    (w) => {
      const b = t.find((I) => I.id === w);
      b && (u((I) => I === w ? void 0 : w), a == null || a(b));
    },
    [a, t]
  ), C = (w) => {
    if (!w) return !1;
    const b = w.tagName.toLowerCase();
    if (w.isContentEditable || $e.includes(b)) return !0;
    const I = w.getAttribute("role");
    if (I && He.includes(I)) return !0;
    const x = w.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, v = $(
    (w) => {
      var X;
      const b = w.target, I = (S) => S ? document.getElementById(S) : void 0, x = I(l), B = I(s);
      if (!!(x && b && x.contains(b) && b !== x) && C(b)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !b.isContentEditable) {
          if (l) {
            w.preventDefault(), w.stopPropagation();
            const S = t.find((P) => P.id === l);
            S && p(S.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!x) return;
          const S = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const P = S.findIndex((m) => m === b);
          if (P === -1) return;
          let d;
          w.key === "ArrowDown" ? d = Math.min(P + 1, S.length - 1) : d = Math.max(P - 1, 0), d !== P && (w.preventDefault(), w.stopPropagation(), (X = S[d]) == null || X.focus());
          return;
        }
        return;
      }
      const D = t.findIndex((S) => S.id === s);
      let G = D;
      switch (w.key) {
        case "ArrowDown":
          G = Math.min(D + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          G = Math.max(D - 1, 0), w.preventDefault();
          break;
        case "Home":
          G = 0, w.preventDefault();
          break;
        case "End":
          G = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && g(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const S = B;
          if (S) {
            const P = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), d = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), m = P ?? d;
            if (m) {
              w.preventDefault(), m.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (C(b) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const E = t[G];
      E && p(E.id);
    },
    [t, p, s, l, g, r]
  );
  return {
    listboxRef: n,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: v,
    /** Focus an option by its ID */
    focusOption: p
  };
}, Fe = H(
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
const Vt = te(void 0);
function ot() {
  const t = ee(Vt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const st = H("", {
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
function Ve({ variant: t = "default", ...e }) {
  const a = O(), r = z.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ o(Vt.Provider, { value: r, children: /* @__PURE__ */ o(T.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function Dr({
  ...t
}) {
  return /* @__PURE__ */ o(T.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ke({
  ...t
}) {
  return /* @__PURE__ */ o(T.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Je({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...n
}) {
  const s = O();
  return /* @__PURE__ */ o(T.Portal, { children: /* @__PURE__ */ o(
    T.Content,
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
      ...n,
      children: /* @__PURE__ */ o("div", { dir: s, children: r })
    }
  ) });
}
function Rr({ ...t }) {
  return /* @__PURE__ */ o(T.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Or({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const n = O(), s = ot();
  return /* @__PURE__ */ o(
    T.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: c(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: s.variant })
      ),
      dir: n,
      ...r
    }
  );
}
function Xe({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...n
}) {
  const s = O(), i = ot();
  return /* @__PURE__ */ f(
    T.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: i.variant })
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
            children: /* @__PURE__ */ o(T.ItemIndicator, { children: /* @__PURE__ */ o(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function We({
  ...t
}) {
  return /* @__PURE__ */ o(T.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Nt({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const n = O(), s = ot();
  return /* @__PURE__ */ f(
    T.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: c(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: s.variant })
      ),
      dir: n,
      ...r,
      children: [
        /* @__PURE__ */ o(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ o(T.ItemIndicator, { children: /* @__PURE__ */ o(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function vt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ o(
    T.Label,
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
function Ze({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    T.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: c("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Pr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Br({ ...t }) {
  return /* @__PURE__ */ o(T.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Mr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const n = ot();
  return /* @__PURE__ */ f(
    T.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: c(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: n.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ o(Qt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function _r({ className: t, children: e, ...a }) {
  const r = O();
  return /* @__PURE__ */ o(
    T.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: c(
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
function jr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "skeleton",
      className: c("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
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
function qe(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function tt(t, e) {
  const a = e ? `${xt}, ${e}` : xt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && qe(r)
  );
}
function Ur({
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
    const i = n.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        tt(i, '[tabindex]:not([tabindex="-1"])').forEach((g) => {
          g.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const u = new MutationObserver(() => {
      l();
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
    const { current: l } = n;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), tt(l)[0].focus();
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
        className: c("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ o(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: n,
            onKeyDown: s,
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
function $r({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ o(
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
function Hr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "tbody",
    {
      "data-slot": "table-body",
      className: c("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Fr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ye(t) {
  z.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const n = t.current ? tt(t.current) : [], s = n.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function Qe(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function ta(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Vr({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: n,
  ...s
}) {
  const i = z.useRef(null);
  z.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), Ye(i);
  const l = z.useMemo(
    () => i.current ? tt(i.current) : [],
    [i]
  ), u = z.useCallback(
    (g) => {
      const { current: C } = i;
      if (!C || !C.parentElement) return;
      const v = C.closest("table"), w = v ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        tt(v).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], b = w.indexOf(C), I = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (g.key === "ArrowDown" || g.key === "ArrowUp")
        g.preventDefault(), ta(w, b, g.key);
      else if (g.key === "ArrowLeft" || g.key === "ArrowRight")
        g.preventDefault(), Qe(l, I, g.key);
      else if (g.key === "Escape") {
        g.preventDefault();
        const x = C.closest("table");
        x && x.focus();
      }
      e == null || e(g);
    },
    [i, l, e]
  ), p = z.useCallback(
    (g) => {
      r && (a == null || a(g));
    },
    [r, a]
  );
  return /* @__PURE__ */ o(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: u,
      onFocus: p,
      className: c(
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
function Kr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Jr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Xr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "caption",
    {
      "data-slot": "table-caption",
      className: c("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Wr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: n = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: u,
  isOpen: p = void 0,
  onOpenChange: g = void 0,
  isDisabled: C = !1,
  sortSelected: v = !1,
  icon: w = void 0,
  className: b = void 0,
  variant: I = "ghost",
  id: x
}) {
  const [B, M] = U(!1), J = $(
    (d) => {
      var h;
      const m = (h = t.find((y) => y.label === d)) == null ? void 0 : h.value;
      m && a(
        e.includes(m) ? e.filter((y) => y !== m) : [...e, m]
      );
    },
    [t, e, a]
  ), D = () => u || r, G = W(() => {
    if (!v) return t;
    const d = t.filter((h) => h.starred).sort((h, y) => h.label.localeCompare(y.label)), m = t.filter((h) => !h.starred).sort((h, y) => {
      const N = e.includes(h.value), F = e.includes(y.value);
      return N && !F ? -1 : !N && F ? 1 : h.label.localeCompare(y.label);
    });
    return [...d, ...m];
  }, [t, e, v]), E = () => {
    a(t.map((d) => d.value));
  }, X = () => {
    a([]);
  }, S = p ?? B;
  return /* @__PURE__ */ o("div", { id: x, className: b, children: /* @__PURE__ */ f(Mt, { open: S, onOpenChange: g ?? M, children: [
    /* @__PURE__ */ o(ut, { asChild: !0, children: /* @__PURE__ */ f(
      R,
      {
        variant: I,
        role: "combobox",
        "aria-expanded": S,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: C,
        children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            w && /* @__PURE__ */ o("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ o("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: w }) }),
            /* @__PURE__ */ o(
              "span",
              {
                className: c(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: D()
              }
            )
          ] }),
          /* @__PURE__ */ o(Et, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ o(jt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ f(Lt, { children: [
      /* @__PURE__ */ o(
        Dt,
        {
          placeholder: `Search ${r.toLowerCase()}...`,
          spaceSelectsHighlightedItem: !0
        }
      ),
      n && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ o(R, { variant: "ghost", size: "sm", onClick: E, children: s }),
        /* @__PURE__ */ o(R, { variant: "ghost", size: "sm", onClick: X, children: i })
      ] }),
      /* @__PURE__ */ f(Rt, { children: [
        /* @__PURE__ */ o(Ot, { children: l }),
        /* @__PURE__ */ o(Pt, { children: G.map((d) => /* @__PURE__ */ f(
          Bt,
          {
            value: d.label,
            onSelect: J,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ o("div", { className: "w-4", children: /* @__PURE__ */ o(
                Tt,
                {
                  className: c(
                    "tw:h-4 tw:w-4",
                    e.includes(d.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              d.starred && /* @__PURE__ */ o(ne, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ o("div", { className: "tw:flex-grow", children: d.label }),
              d.secondaryLabel && /* @__PURE__ */ o("div", { className: "tw:text-end tw:text-muted-foreground", children: d.secondaryLabel })
            ]
          },
          d.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function q(t) {
  return t.replace(/^\+/, "");
}
function ea(t, e, a) {
  if (!e) return [...t];
  const r = [...t], n = q(e).toLowerCase();
  return a === "passive" ? gt({
    query: n,
    items: r,
    filter: (s) => q(s.label).toLowerCase().startsWith(n),
    sortBy: "label"
  }) : gt({
    query: n,
    items: r,
    filter: (s) => q(s.label).toLowerCase().includes(n),
    sortBy: "label"
  });
}
function aa(t) {
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
}, ra = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
], na = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function oa(t) {
  return [
    ...ra,
    ...na.filter((e) => Kt[t].test(e))
  ];
}
function L(t) {
  t.preventDefault(), t.stopPropagation();
}
function Zr(t, e, a) {
  var n, s;
  const { kind: r } = e;
  if (r === "enter")
    return t.key === "Enter" ? (L(t), a.commit(), "ended") : t.key === "Escape" ? (L(t), a.dismiss(), "ended") : "passed";
  if (aa(t) || me.has(t.key) || t.key === "Dead")
    return "passed";
  if ((t.ctrlKey || t.metaKey || t.altKey) && !((n = t.getModifierState) != null && n.call(t, "AltGraph")))
    return t.key === "Enter" && L(t), a.dismiss(), "ended";
  if (t.key === "ArrowDown" || t.key === "ArrowUp")
    return L(t), a.update({ moveSelection: t.key === "ArrowDown" ? 1 : -1 }), "continue";
  if (t.key === "Enter" || t.key === "Tab")
    return L(t), ea(
      e.items.map((l) => ({ label: l.marker })),
      e.filter,
      r === "backslash" ? "passive" : "active"
    ).length === 0 ? "continue" : (a.commit(), "ended");
  if (t.key === "Escape")
    return L(t), a.dismiss(), "ended";
  if (t.key === " ") {
    if (r === "backslash")
      return L(t), e.filter === "" ? (a.dismiss(), "ended") : (s = e.shouldSpaceCommit) != null && s.call(e, e.filter) ? (a.commit(), "ended") : (a.commitTyped(e.filter), a.dismiss(), "ended");
    L(t);
    const i = q(e.filter).toLowerCase(), l = e.items.find(
      (u) => q(u.marker).toLowerCase() === i
    );
    return l && a.commitItem(l.marker), a.dismiss(), "ended";
  }
  return t.key === "*" ? r === "selection" && e.filter === "" ? (L(t), a.dismiss(), "ended") : (L(t), a.commitTypedCloser(e.filter), a.dismiss(), "ended") : t.key === "\\" && r === "backslash" ? e.filter === "" ? (a.dismiss(), "ended") : (L(t), a.commitTypedAndReopen(e.filter), "ended") : t.key === "Backspace" && e.filter === "" ? (L(t), a.dismiss(), "ended") : t.key === "Backspace" || Kt[r].test(t.key) ? (L(t), e.filter = t.key === "Backspace" ? e.filter.slice(0, -1) : e.filter + t.key, a.update({ filterText: e.filter }), "continue") : (r === "selection" && L(t), a.dismiss(), "ended");
}
function qr(t, e) {
  var a;
  ((a = t.current) == null ? void 0 : a.token) === e && (t.current = void 0);
}
function Yr(t) {
  const {
    items: e,
    passive: a,
    shouldSpaceCommit: r,
    sessionCounterRef: n,
    setSession: s,
    clearSessionIfCurrent: i,
    runSessionKey: l,
    show: u,
    restoreSelectionIfLost: p,
    focusEditor: g,
    applyItem: C,
    onShowError: v
  } = t;
  n.current += 1;
  const w = n.current, b = a ? "backslash" : "selection", I = { kind: b, token: w, filter: "", items: e };
  b === "backslash" && r && (I.shouldSpaceCommit = r), s(I), u({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Declared for the passive palette too: it never takes focus, so this is inert there, but one
    // code path means a palette that unexpectedly receives a key routes it to the session rather
    // than acting on it.
    keys: oa(b),
    onKey: (x) => l(x)
  }).then((x) => {
    if (i(w), x !== void 0) {
      p(), g();
      const B = e.find((M) => M.marker === x);
      B && C(B);
    } else a || g();
  }).catch((x) => {
    i(w), a || g(), v(x);
  });
}
function Qr({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function tn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: c("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function sa(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Q(a.projectId), n = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    n ? n.some((i) => i.scrollGroupId === a.scrollGroupId) || n.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, n) => r.scrollGroupId - n.scrollGroupId)), e;
}
function yt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function it(t) {
  const e = sa(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(Q(s.id)) ?? [];
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
        versificationName: s.versificationName,
        type: s.type,
        typeName: s.typeName,
        lastUsedAt: s.lastUsedAt
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
    const s = e.get(Q(n.id));
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
        isSelected: yt(a, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName,
        type: n.type,
        typeName: n.typeName,
        lastUsedAt: n.lastUsedAt
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
        isSelected: yt(a, n.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName,
        type: n.type,
        typeName: n.typeName,
        lastUsedAt: n.lastUsedAt
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
      versificationName: s.versificationName,
      type: s.type,
      typeName: s.typeName,
      lastUsedAt: s.lastUsedAt
    });
  }), r;
}
function kt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function _(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - n;
}
function It(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(_) }];
  const a = t.filter(kt).sort(_), r = t.filter((s) => !kt(s)).sort(_);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const n = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && n.push({ kind: "other", rows: r }), n;
}
function ia(t, e, a) {
  const r = /* @__PURE__ */ new Map(), n = [];
  t.forEach((l) => {
    const u = l.versificationId;
    if (u === void 0 || u === "") {
      n.push(l);
      return;
    }
    const p = l.versificationName ?? u, g = r.get(u);
    g ? (g.rows.push(l), !g.label && l.versificationName && (g.label = l.versificationName)) : r.set(u, { label: p, rows: [l] });
  });
  const s = [...r.entries()].map(([l, { label: u, rows: p }]) => ({
    id: l,
    label: u,
    rows: [...p].sort(_)
  }));
  s.sort((l, u) => l.id === e ? -1 : u.id === e ? 1 : l.label.localeCompare(u.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: l, label: u, rows: p }) => ({
    kind: "versification",
    rows: p,
    label: u,
    isPriority: l === e
  }));
  return n.length > 0 && i.push({
    kind: "versification",
    rows: [...n].sort(_),
    label: a,
    isPriority: !1
  }), i;
}
function la(t, e) {
  const a = /* @__PURE__ */ new Map(), r = [];
  t.forEach((i) => {
    const l = i.language;
    if (!l) {
      r.push(i);
      return;
    }
    const u = a.get(l);
    u ? u.push(i) : a.set(l, [i]);
  });
  const n = [...a.entries()].map(([i, l]) => ({
    label: i,
    rows: [...l].sort(_)
  }));
  n.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = n.map(({ label: i, rows: l }) => ({
    kind: "language",
    rows: l,
    label: i
  }));
  return r.length > 0 && s.push({
    kind: "language",
    rows: [...r].sort(_),
    label: e
  }), s;
}
function da(t, e) {
  const a = /* @__PURE__ */ new Map(), r = [];
  t.forEach((i) => {
    const l = i.type;
    if (!l) {
      r.push(i);
      return;
    }
    const u = i.typeName ?? l, p = a.get(l);
    p ? (p.rows.push(i), p.label === l && i.typeName && (p.label = i.typeName)) : a.set(l, { label: u, rows: [i] });
  });
  const n = [...a.values()].map(({ label: i, rows: l }) => ({
    label: i,
    rows: [...l].sort(_)
  }));
  n.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const s = n.map(({ label: i, rows: l }) => ({
    kind: "type",
    rows: l,
    label: i
  }));
  return r.length > 0 && s.push({
    kind: "type",
    rows: [...r].sort(_),
    label: e
  }), s;
}
function ca(t, e, a) {
  const r = [], n = [];
  t.forEach((i) => {
    typeof i.lastUsedAt == "number" ? r.push(i) : n.push(i);
  }), r.sort((i, l) => (l.lastUsedAt ?? 0) - (i.lastUsedAt ?? 0)), n.sort(_);
  const s = [];
  return r.length > 0 && s.push({ kind: "lastUsed", rows: r, label: e }), n.length > 0 && s.push({ kind: "lastUsed", rows: n, label: a }), s;
}
const Jt = Gt + 50, ua = {
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group by",
  filterSectionLabel: "Filter",
  filterGroupNone: "None",
  filterGroupByOpenTabs: "Open tabs",
  filterGroupByLanguage: "Language",
  filterGroupByLastUsed: "Last used",
  filterGroupByVersification: "Versification",
  filterGroupByType: "Type",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  versificationUnknownSectionHeading: "Unknown versification",
  languageUnknownSectionHeading: "Unknown language",
  typeUnknownSectionHeading: "Unknown type",
  lastUsedRecentSectionHeading: "Recently used",
  lastUsedOtherSectionHeading: "Other",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function wa(t) {
  return { ...ua, ...t };
}
function et(t) {
  return Pe[fe(t)] ?? String(t);
}
const ma = [
  "openTabs",
  "lastUsed",
  "language",
  "versification",
  "type"
], fa = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function pa({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = et(t);
  return e ? /* @__PURE__ */ o(
    rt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: fa,
      children: a
    }
  ) : /* @__PURE__ */ o(rt, { variant: "secondary", children: a });
}
function ha({ row: t, mode: e, strings: a, onClick: r, onOpen: n, selectedRowRef: s }) {
  const {
    ref: i,
    open: l,
    onPointerEnter: u,
    onPointerLeave: p
  } = Me(), [g, C] = U(!1), v = !!(t.language || t.languageCode), w = v || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, b = l || g, I = $(() => {
    if (w) {
      C(!0);
      return;
    }
    u();
  }, [w, u]), x = $(() => {
    C(!1), p();
  }, [p]), B = /* @__PURE__ */ o(Tt, { className: c("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ o("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((E) => /* @__PURE__ */ o(rt, { variant: "secondary", children: et(E) }, E)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ f("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ o(
      pa,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ f(
      R,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (E) => {
          E.stopPropagation(), n(t);
        },
        onMouseDown: (E) => E.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ o(se, { className: "tw:h-3 tw:w-3" }),
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
      onPointerEnter: I,
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
  ), D = t.scrollGroupId !== void 0 ? et(t.scrollGroupId) : void 0, G = t.isBoundButClosed && D ? a.boundButClosedTooltip.replace("{group}", D) : void 0;
  return /* @__PURE__ */ f(Ut, { open: b, delayDuration: 400, children: [
    /* @__PURE__ */ o($t, { asChild: !0, children: J }),
    /* @__PURE__ */ f(
      Ht,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Jt },
        children: [
          /* @__PURE__ */ o("div", { className: "tw:font-semibold", children: t.fullName }),
          v && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && D && /* @__PURE__ */ f("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ f("span", { className: "tw:text-muted-foreground", children: [
              " (",
              D,
              ")"
            ] })
          ] }),
          G && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic", children: G }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ o("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function ga(t) {
  return t === "none" || t === "openTabs" || t === "lastUsed" || t === "language" || t === "versification" || t === "type";
}
function ba(t, e) {
  switch (t) {
    case "openTabs":
      return e.filterGroupByOpenTabs;
    case "language":
      return e.filterGroupByLanguage;
    case "lastUsed":
      return e.filterGroupByLastUsed;
    case "versification":
      return e.filterGroupByVersification;
    case "type":
      return e.filterGroupByType;
    default:
      return t;
  }
}
function Na({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  showSelectedOnly: r,
  onChangeShowSelectedOnly: n,
  strings: s
}) {
  const i = !!r;
  return /* @__PURE__ */ f(Ve, { children: [
    /* @__PURE__ */ o(Ke, { asChild: !0, children: /* @__PURE__ */ o(
      R,
      {
        variant: "ghost",
        size: "sm",
        className: c(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          i && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": s.filterAriaLabel,
        "aria-pressed": i,
        title: s.filterAriaLabel,
        onMouseDown: (l) => l.preventDefault(),
        children: /* @__PURE__ */ o(oe, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ f(
      Je,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Jt },
        children: [
          t.length > 0 && /* @__PURE__ */ f(lt, { children: [
            /* @__PURE__ */ o(vt, { children: s.groupSectionLabel }),
            /* @__PURE__ */ f(
              We,
              {
                value: e,
                onValueChange: (l) => {
                  ga(l) && a(l);
                },
                children: [
                  /* @__PURE__ */ o(Nt, { value: "none", children: s.filterGroupNone }),
                  t.map((l) => /* @__PURE__ */ o(Nt, { value: l, children: ba(l, s) }, l))
                ]
              }
            )
          ] }),
          n && /* @__PURE__ */ f(lt, { children: [
            t.length > 0 && /* @__PURE__ */ o(Ze, {}),
            /* @__PURE__ */ o(vt, { children: s.filterSectionLabel }),
            /* @__PURE__ */ o(
              Xe,
              {
                checked: !!r,
                onCheckedChange: n,
                onSelect: (l) => l.preventDefault(),
                children: s.filterShowSelectedOnly
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function en(t) {
  const [e, a] = U(!1), [r, n] = U(""), s = t.availableGroupings ?? ma, [i, l] = U(() => {
    if (t.defaultGrouping) {
      if (t.defaultGrouping === "none") return "none";
      if (s.includes(t.defaultGrouping)) return t.defaultGrouping;
    }
    return t.defaultGroupByOpenTabs === !1 ? "none" : s.includes("openTabs") ? "openTabs" : "none";
  }), [u, p] = U(!1), g = ft(null), C = $((d) => {
    a(d), d || n("");
  }, []);
  ae(() => {
    if (!e) return;
    const d = window.requestAnimationFrame(() => {
      const m = g.current;
      m && m.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(d);
  }, [e]);
  const v = wa(t.localizedStrings), w = W(() => t.mode === "project" ? it({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? it({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : it({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), b = W(() => {
    const d = r.trim().toLowerCase();
    let m = w;
    return d && (m = m.filter(
      (h) => h.shortName.toLowerCase().includes(d) || h.fullName.toLowerCase().includes(d) || (h.language ?? "").toLowerCase().includes(d) || (h.languageCode ?? "").toLowerCase().includes(d)
    )), t.mode === "project-multi" && u && (m = m.filter((h) => h.isSelected)), m;
  }, [w, r, t.mode, u]), I = W(() => {
    switch (i) {
      case "openTabs":
        return It(b, !0);
      case "lastUsed":
        return ca(
          b,
          v.lastUsedRecentSectionHeading,
          v.lastUsedOtherSectionHeading
        );
      case "language":
        return la(b, v.languageUnknownSectionHeading);
      case "versification":
        return ia(
          b,
          t.priorityVersificationId,
          v.versificationUnknownSectionHeading
        );
      case "type":
        return da(b, v.typeUnknownSectionHeading);
      case "none":
      default:
        return It(b, !1);
    }
  }, [
    b,
    i,
    t.priorityVersificationId,
    v.versificationUnknownSectionHeading,
    v.languageUnknownSectionHeading,
    v.lastUsedRecentSectionHeading,
    v.lastUsedOtherSectionHeading,
    v.typeUnknownSectionHeading
  ]), x = W(() => {
    if (t.mode !== "project-multi") return [];
    const d = [];
    return t.projects.forEach((m) => {
      const h = t.openTabs.filter(
        (N) => Q(N.projectId) === Q(m.id)
      );
      if (h.length === 0) {
        d.push({ projectId: m.id });
        return;
      }
      const y = /* @__PURE__ */ new Set();
      h.forEach((N) => {
        y.has(N.scrollGroupId) || (y.add(N.scrollGroupId), d.push({ projectId: m.id, scrollGroupId: N.scrollGroupId }));
      });
    }), d;
  }, [t.mode, t.projects, t.openTabs]), B = (d) => {
    if (d.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(d.projectId, d.scrollGroupId);
    }
  }, M = (d) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: d.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const m = t.selection.pairs, h = (N) => N.projectId === d.projectId && N.scrollGroupId === d.scrollGroupId, y = m.some(h) ? m.filter((N) => !h(N)) : [...m, { projectId: d.projectId, scrollGroupId: d.scrollGroupId }];
        t.onChangeSelection({ pairs: y }), y.length === 0 && u && p(!1);
        return;
      }
      case "projectScrollGroup": {
        if (d.isBoundButClosed && d.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(d.projectId, d.scrollGroupId), a(!1);
          return;
        }
        if (d.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: d.projectId,
            scrollGroupId: d.scrollGroupId
          }), a(!1);
          return;
        }
        const m = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: d.projectId, scrollGroupId: m }), t.onOpenProjectInGroup(d.projectId, m), a(!1);
      }
    }
  }, J = () => {
    if (t.mode !== "project-multi") return;
    const d = t.selection.pairs, m = new Set(d.map((y) => `${y.projectId}:${y.scrollGroupId ?? ""}`)), h = [...d];
    x.forEach((y) => {
      const N = `${y.projectId}:${y.scrollGroupId ?? ""}`;
      m.has(N) || (m.add(N), h.push(y));
    }), t.onChangeSelection({ pairs: h });
  }, D = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), u && p(!1));
  }, G = W(() => {
    switch (t.mode) {
      case "project": {
        const d = t.projects.find((h) => h.id === t.selection.projectId);
        let m = d ? d.shortName : t.buttonPlaceholder ?? "";
        return d && t.triggerLabelFormat === "shortNameAndFullName" && d.fullName && d.fullName !== d.shortName && (m = `${d.shortName} - ${d.fullName}`), { node: m, title: m };
      }
      case "project-multi": {
        const { pairs: d } = t.selection;
        if (d.length === 0) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        const m = [];
        if (d.forEach((N) => {
          const F = t.projects.find((Xt) => Xt.id === N.projectId);
          F && m.push({ project: F, scrollGroupId: N.scrollGroupId });
        }), m.length === 0) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        if (t.getSelectedText) {
          const N = t.getSelectedText(m);
          return { node: N, title: N };
        }
        const h = m.map(
          ({ project: N, scrollGroupId: F }) => F === void 0 ? N.shortName : `${N.shortName} (${et(F)})`
        ).join(", ");
        if (m.length === 1) return { node: h, title: h };
        const y = m.length.toString();
        return {
          node: /* @__PURE__ */ f(lt, { children: [
            /* @__PURE__ */ o(rt, { variant: "muted", className: "tw:shrink-0", children: y }),
            /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: h })
          ] }),
          title: `${y} ${h}`
        };
      }
      case "projectScrollGroup": {
        const d = t.projects.find((y) => y.id === t.selection.projectId);
        if (!d) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        const m = t.selection.scrollGroupId;
        if (m === void 0)
          return { node: d.shortName, title: d.shortName };
        const h = `${d.shortName} · ${et(m)}`;
        return { node: h, title: h };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let E;
  t.isLoading ? E = /* @__PURE__ */ o(ie, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? E = void 0 : t.mode === "project-multi" ? E = /* @__PURE__ */ o(Et, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : E = /* @__PURE__ */ o(le, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const X = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? B : void 0, S = /* @__PURE__ */ f(
    R,
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
        /* @__PURE__ */ o("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof G.node == "string" ? /* @__PURE__ */ o("span", { className: "tw:min-w-0 tw:truncate", children: G.node }) : G.node }),
        E
      ]
    }
  ), P = G.title ? /* @__PURE__ */ o(bt, { delayDuration: 400, children: /* @__PURE__ */ f(Ut, { children: [
    /* @__PURE__ */ o($t, { asChild: !0, children: /* @__PURE__ */ o(ut, { asChild: !0, children: S }) }),
    /* @__PURE__ */ o(Ht, { children: G.title })
  ] }) }) : /* @__PURE__ */ o(ut, { asChild: !0, children: S });
  return /* @__PURE__ */ f(Mt, { open: e, onOpenChange: C, children: [
    P,
    /* @__PURE__ */ o(
      jt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: c("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ o(bt, { delayDuration: 400, children: /* @__PURE__ */ f(Lt, { shouldFilter: !1, children: [
          /* @__PURE__ */ f("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ o("div", { className: "tw:flex-1", children: /* @__PURE__ */ o(
              Dt,
              {
                value: r,
                onValueChange: n,
                placeholder: v.searchPlaceholder,
                className: "tw:border-0",
                spaceSelectsHighlightedItem: !0
              }
            ) }),
            !t.hideFilterMenu && (s.length > 0 || t.mode === "project-multi") && /* @__PURE__ */ o(
              Na,
              {
                availableGroupings: s,
                activeGrouping: i,
                onChangeGrouping: l,
                showSelectedOnly: t.mode === "project-multi" ? u : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? p : void 0,
                strings: v
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ f("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ o(R, { variant: "ghost", size: "sm", onClick: J, children: `${v.selectAll} (${x.length.toString()})` }),
            /* @__PURE__ */ o(R, { variant: "ghost", size: "sm", onClick: D, children: `${v.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ f(Rt, { children: [
            /* @__PURE__ */ o(Ot, { children: t.commandEmptyMessage ?? "No projects found" }),
            I.map((d, m) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ f(re, { children: [
                /* @__PURE__ */ o(Pt, { heading: va(d, v), children: d.rows.map((h) => /* @__PURE__ */ o(
                  ha,
                  {
                    row: h,
                    mode: t.mode,
                    strings: v,
                    onClick: M,
                    onOpen: X,
                    selectedRowRef: g
                  },
                  h.rowKey
                )) }),
                m < I.length - 1 && /* @__PURE__ */ o(Ae, {})
              ] }, `${d.kind}:${d.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function va(t, e) {
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "versification":
    case "language":
    case "type":
    case "lastUsed":
      return t.label;
    case "flat":
    default:
      return;
  }
}
const xa = Ct(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: n, isDisabled: s = !1, id: i }, l) => {
    const u = O();
    return /* @__PURE__ */ f(
      "div",
      {
        id: i,
        className: c("tw:relative tw:@container/search", { "tw:w-full": r }, n),
        children: [
          /* @__PURE__ */ o(
            de,
            {
              className: c(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": u === "rtl" },
                { "tw:left-3": u === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ o(
            Ee,
            {
              ref: l,
              className: c(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: (p) => e(p.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ f(
            R,
            {
              variant: "ghost",
              size: "icon",
              className: c(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": u === "rtl" },
                { "tw:right-0": u === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ o(ce, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ o("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
xa.displayName = "SearchBar";
const ya = 5;
function an(t) {
  return Oe(t).filter(
    (e) => !A.isObsolete(A.bookIdToNumber(e))
  );
}
function ka(t, e) {
  return t.filter((a) => {
    try {
      return pe(a) === e;
    } catch {
      return !1;
    }
  });
}
const rn = (t, e, a) => ka(t, e).every((r) => a.includes(r));
function Ia(t, e) {
  return [
    ...new Set(t.map((r) => r.toUpperCase()))
  ].filter((r) => A.bookIdToNumber(r) > 0).sort((r, n) => A.bookIdToNumber(r) - A.bookIdToNumber(n)).map((r) => Be(r, e));
}
function nn(t, e, a, r) {
  if (t.length === 0) return;
  const n = new Set(t.map((l) => l.toUpperCase())), s = new Set(e.map((l) => l.toUpperCase()));
  if (s.size > 0 && s.size === n.size && [...s].every((l) => n.has(l)))
    return a;
  const i = Ia(t, r);
  if (i.length !== 0)
    return i.length <= ya ? i.join(", ") : `${i[0]} - ${i[i.length - 1]}`;
}
function on({ message: t, id: e, className: a }) {
  return /* @__PURE__ */ o(
    "p",
    {
      role: "status",
      "data-testid": e,
      className: c("tw:text-sm tw:text-muted-foreground", a),
      children: t
    }
  );
}
function Sa({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ca({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
const Ea = H(
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
function Ta({
  className: t,
  variant: e = "default",
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": e,
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ea({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function sn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function Ga({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function za({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function ln({
  message: t,
  retryLabel: e,
  onRetry: a,
  icon: r,
  role: n = "alert",
  className: s
}) {
  return /* @__PURE__ */ f(Sa, { className: c(s), role: n, children: [
    /* @__PURE__ */ f(Ca, { children: [
      /* @__PURE__ */ o(Ta, { variant: "icon", children: r ?? /* @__PURE__ */ o(ue, {}) }),
      /* @__PURE__ */ o(Ga, { children: t })
    ] }),
    a && /* @__PURE__ */ o(za, { children: /* @__PURE__ */ o(R, { onClick: () => a(), children: e }) })
  ] });
}
const Aa = Ct(({ className: t, ...e }, a) => /* @__PURE__ */ o(we, { size: 35, className: c("tw:animate-spin", t), ...e, ref: a }));
Aa.displayName = "Spinner";
const La = H(
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
function dn({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: c(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        La({ variant: e }),
        t
      ),
      ...a
    }
  );
}
function cn({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function un({ className: t, ...e }) {
  return /* @__PURE__ */ o(
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
function wn({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    pt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: c(
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
function mn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...n
}) {
  return /* @__PURE__ */ o(
    pt.Panel,
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
function fn({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ o(
    pt.Separator,
    {
      "data-slot": "resizable-handle",
      className: c(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ o("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Ur as $,
  pr as A,
  R as B,
  Bt as C,
  Ya as D,
  Cr as E,
  Er as F,
  Gr as G,
  zr as H,
  cr as I,
  Or as J,
  rt as K,
  yr as L,
  Ve as M,
  Ke as N,
  Je as O,
  Mt as P,
  jr as Q,
  kr as R,
  je as S,
  bt as T,
  Lr as U,
  vt as V,
  Ze as W,
  Xe as X,
  Vr as Y,
  Gt as Z,
  Jr as _,
  Be as a,
  Xr as a$,
  $r as a0,
  Kr as a1,
  Hr as a2,
  Rr as a3,
  We as a4,
  Nt as a5,
  Wr as a6,
  Qr as a7,
  Ka as a8,
  Ee as a9,
  ze as aA,
  dn as aB,
  un as aC,
  cn as aD,
  Tr as aE,
  tr as aF,
  or as aG,
  Ce as aH,
  Se as aI,
  Qa as aJ,
  Pr as aK,
  Sa as aL,
  za as aM,
  Ga as aN,
  Ca as aO,
  Ta as aP,
  on as aQ,
  sn as aR,
  tn as aS,
  xr as aT,
  Nr as aU,
  vr as aV,
  fn as aW,
  mn as aX,
  wn as aY,
  ln as aZ,
  Aa as a_,
  q as aa,
  Ae as ab,
  sr as ac,
  Yr as ad,
  Zr as ae,
  qr as af,
  br as ag,
  aa as ah,
  en as ai,
  Ja as aj,
  xa as ak,
  an as al,
  ka as am,
  mr as an,
  rn as ao,
  gr as ap,
  rr as aq,
  Pe as ar,
  Br as as,
  Mr as at,
  Dr as au,
  _r as av,
  Vt as aw,
  ot as ax,
  st as ay,
  Te as az,
  Ut as b,
  Fr as b0,
  Za as b1,
  Wa as b2,
  ke as b3,
  ye as b4,
  Xa as b5,
  Fe as b6,
  Ue as b7,
  zt as b8,
  Ar as b9,
  ur as ba,
  Ie as bb,
  ea as bc,
  oa as bd,
  qa as be,
  nn as bf,
  c,
  $t as d,
  Ht as e,
  ut as f,
  fr as g,
  jt as h,
  Lt as i,
  Rt as j,
  Pt as k,
  lr as l,
  dr as m,
  hr as n,
  Re as o,
  wr as p,
  Dt as q,
  O as r,
  Ot as s,
  Ir as t,
  Me as u,
  er as v,
  ar as w,
  ir as x,
  nr as y,
  Sr as z
};
//# sourceMappingURL=resizable-CbDzT2S9.js.map
