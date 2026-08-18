import { jsx as n, jsxs as g, Fragment as Ct } from "react/jsx-runtime";
import { Slot as wt, Dialog as P, Popover as W, Label as Xt, RadioGroup as dt, Tooltip as U, ToggleGroup as Et, Separator as Ut, DropdownMenu as z } from "radix-ui";
import { IconX as qt, IconSearch as Wt, IconCheck as ft, IconChevronRight as Zt } from "@tabler/icons-react";
import { Canon as _ } from "@sillsdev/scripture";
import { includes as et, Section as J, normalizeProjectId as Z, getLocalizeKeyForScrollGroupId as Yt } from "platform-bible-utils";
import G, { useRef as mt, useState as B, useCallback as $, createContext as Qt, useContext as te, useMemo as X, useEffect as ee, Fragment as ae, forwardRef as St } from "react";
import { cva as V } from "class-variance-authority";
import { ChevronsUpDown as Tt, Check as zt, Star as re, Filter as oe, ArrowRight as ne, Loader2 as se, ChevronDown as ie, Search as le, X as de, LoaderCircle as ce } from "lucide-react";
import "@eten-tech-foundation/scripture-utilities";
import { Command as K } from "cmdk";
import * as pt from "react-resizable-panels";
import { clsx as ue } from "clsx";
import { extendTailwindMerge as we, twMerge as fe } from "tailwind-merge";
const me = we({ prefix: "tw" });
function ct(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
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
    return { normalized: `tw:${[...e.filter((l, d) => d !== a), `-${s}`].join(":")}`, original: t };
  }
  const r = e.findIndex((s) => s.startsWith("!tw-"));
  if (r !== -1) {
    const s = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((l, d) => d !== r), `!${s}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const s = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function he(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = ct(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = ct(e), i = s.some((l) => l.startsWith("-tw-")), c = s.some((l) => l.startsWith("!tw-"));
  if (i && o.startsWith("-")) {
    const l = o.slice(1);
    return [...r, `-tw-${l}`].join(":");
  }
  if (c && o.startsWith("!")) {
    const l = o.slice(1);
    return [...r, `!tw-${l}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
function w(...t) {
  const e = ue(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return me(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((l) => {
    const d = pe(l);
    r.set(d.normalized, d.original), o.push(d.normalized);
  }), fe(o.join(" ")).split(" ").filter(Boolean).map((l) => {
    const d = r.get(l);
    return d ? he(l, d) : l;
  }).join(" ");
}
const ge = 600, va = 300, Gt = 400, be = 450, ve = 500, Ne = 550, Na = 700, Dt = V(
  // CUSTOM: Added 'pr-twp' at the front of the base class string to apply Platform.Bible's
  // Tailwind CSS scope isolation. All Button instances inherit this via buttonVariants.
  "pr-twp tw:group/button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-transparent tw:bg-clip-padding tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:active:not-aria-[haspopup]:translate-y-px tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
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
  ...o
}) {
  const s = r ? wt.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: w(Dt({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const At = "layoutDirection";
function A() {
  const t = localStorage.getItem(At);
  return t === "rtl" ? t : "ltr";
}
function xa(t) {
  localStorage.setItem(At, t);
}
function ya({ ...t }) {
  return /* @__PURE__ */ n(P.Root, { "data-slot": "dialog", ...t });
}
function Ia({ ...t }) {
  return /* @__PURE__ */ n(P.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function xe({ ...t }) {
  return /* @__PURE__ */ n(P.Portal, { "data-slot": "dialog-portal", ...t });
}
function ka({ ...t }) {
  return /* @__PURE__ */ n(P.Close, { "data-slot": "dialog-close", ...t });
}
function ye({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    P.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: w(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: be, ...e },
      ...a
    }
  );
}
function Ca({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...s
}) {
  const i = A();
  return /* @__PURE__ */ g(xe, { children: [
    /* @__PURE__ */ n(ye, { className: r }),
    /* @__PURE__ */ g(
      P.Content,
      {
        "data-slot": "dialog-content",
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ve, ...o },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ n(P.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ g(L, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(qt, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ea({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "dialog-header",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Sa({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "dialog-footer",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ n(P.Close, { asChild: !0, children: /* @__PURE__ */ n(L, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ta({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    P.Title,
    {
      "data-slot": "dialog-title",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function za({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    P.Description,
    {
      "data-slot": "dialog-description",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Ie({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: w(
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
function ke({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Ce = V(
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
function Ee({
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
        className: w(Ce({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
V("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Rt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    K,
    {
      "data-slot": "command",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function Lt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...a
}) {
  const r = A(), o = G.useCallback(
    (s) => {
      if (e == null || e(s), s.defaultPrevented || s.key !== " " || s.currentTarget.value !== "") return;
      const i = s.currentTarget.closest("[cmdk-root]"), c = i == null ? void 0 : i.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      c && (s.preventDefault(), s.stopPropagation(), c.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: r, children: /* @__PURE__ */ g(ke, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        K.Input,
        {
          "data-slot": "command-input",
          className: w(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: o,
          ...a
        }
      ),
      /* @__PURE__ */ n(Ee, { children: /* @__PURE__ */ n(Wt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Mt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    K.List,
    {
      "data-slot": "command-list",
      className: w(
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
function Pt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    K.Empty,
    {
      "data-slot": "command-empty",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
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
  return /* @__PURE__ */ n(
    K.Group,
    {
      "data-slot": "command-group",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Se({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    K.Separator,
    {
      "data-slot": "command-separator",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function jt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ g(
    K.Item,
    {
      "data-slot": "command-item",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ n(ft, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ga({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "command-shortcut",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const Da = (t, e, a, r, o) => {
  switch (t) {
    case J.OT:
      return e ?? "Old Testament";
    case J.NT:
      return a ?? "New Testament";
    case J.DC:
      return r ?? "Deuterocanon";
    case J.Extra:
      return o ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Aa = (t, e, a, r, o) => {
  switch (t) {
    case J.OT:
      return e ?? "OT";
    case J.NT:
      return a ?? "NT";
    case J.DC:
      return r ?? "DC";
    case J.Extra:
      return o ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ra(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? _.bookIdToEnglishName(t);
}
function La(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const Te = _.allBookIds.filter(
  (t) => !_.isObsolete(_.bookIdToNumber(t))
), Ma = Object.fromEntries(
  Te.map((t) => [t, _.bookIdToEnglishName(t)])
);
function Pa(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = _.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(et(o.toLowerCase(), r) || et(t.toLowerCase(), r) || (s ? et(s.localizedName.toLowerCase(), r) || et(s.localizedId.toLowerCase(), r) : !1));
}
function Bt({ ...t }) {
  return /* @__PURE__ */ n(W.Root, { "data-slot": "popover", ...t });
}
function ut({ ...t }) {
  return /* @__PURE__ */ n(W.Trigger, { "data-slot": "popover-trigger", ...t });
}
const _t = G.createContext(null);
function Oa({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(_t.Provider, { value: t, children: e });
}
function $t({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = A(), i = G.useContext(_t);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(W.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      W.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ge, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function ja({ ...t }) {
  return /* @__PURE__ */ n(W.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Ba({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: w("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function _a({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: w("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function $a({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: w("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
var R = {}, it, gt;
function ze() {
  return gt || (gt = 1, it = () => {
    const t = "\\ud800-\\udfff", i = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", c = "\\ufe0e\\ufe0f", l = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${t}]`, m = `[${i}]`, h = "\\ud83c[\\udffb-\\udfff]", I = `(?:${m}|${h})`, f = `[^${t}]`, N = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", x = "[\\ud800-\\udbff][\\udc00-\\udfff]", E = "\\u200d", O = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", M = `[${l}]`, j = `${I}?`, S = `[${c}]?`, T = `(?:${E}(?:${[f, N, x].join("|")})${S + j})*`, D = S + j + T, C = `(?:${[`${f}${m}?`, m, N, x, d, M].join("|")})`;
    return new RegExp(`${O}|${h}(?=${h})|${C + D}`, "g");
  }), it;
}
var bt;
function Ge() {
  if (bt) return R;
  bt = 1;
  var t = R && R.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(R, "__esModule", { value: !0 });
  var e = t(ze());
  function a(l) {
    if (typeof l != "string")
      throw new Error("A string is expected as input");
    return l.match(e.default()) || [];
  }
  R.toArray = a;
  function r(l) {
    if (typeof l != "string")
      throw new Error("Input must be a string");
    var d = l.match(e.default());
    return d === null ? 0 : d.length;
  }
  R.length = r;
  function o(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof m == "number" && m < 0 && (m = 0);
    var h = l.match(e.default());
    return h ? h.slice(d, m).join("") : "";
  }
  R.substring = o;
  function s(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    var h = r(l);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= h)
      return "";
    d < 0 && (d += h);
    var I;
    typeof m > "u" ? I = h : (typeof m != "number" && (m = parseInt(m, 10)), I = m >= 0 ? m + d : d);
    var f = l.match(e.default());
    return f ? f.slice(d, I).join("") : "";
  }
  R.substr = s;
  function i(l, d, m, h) {
    if (d === void 0 && (d = 16), m === void 0 && (m = "#"), h === void 0 && (h = "right"), typeof l != "string" || typeof d != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(h) === -1)
      throw new Error("Pad position should be either left or right");
    typeof m != "string" && (m = String(m));
    var I = r(l);
    if (I > d)
      return o(l, 0, d);
    if (I < d) {
      var f = m.repeat(d - I);
      return h === "left" ? f + l : l + f;
    }
    return l;
  }
  R.limit = i;
  function c(l, d, m) {
    if (m === void 0 && (m = 0), typeof l != "string")
      throw new Error("Input must be a string");
    if (l === "")
      return d === "" ? 0 : -1;
    m = Number(m), m = isNaN(m) ? 0 : m, d = String(d);
    var h = a(l);
    if (m >= h.length)
      return d === "" ? h.length : -1;
    if (d === "")
      return m;
    var I = a(d), f = !1, N;
    for (N = m; N < h.length; N += 1) {
      for (var x = 0; x < I.length && I[x] === h[N + x]; )
        x += 1;
      if (x === I.length && I[x - 1] === h[N + x - 1]) {
        f = !0;
        break;
      }
    }
    return f ? N : -1;
  }
  return R.indexOf = c, R;
}
Ge();
const De = [
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
], Ae = (t) => {
  var e;
  return ((e = De[t]) == null ? void 0 : e.chapters) ?? -1;
};
function k(t) {
  return `%scrollGroup_${t}%`;
}
const Re = {
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
  return Ae(_.bookIdToNumber(t));
}
function ot(t, e, a) {
  const r = _.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const c = _.bookIdToNumber(i);
    (a === "next" ? c > r && c < s : c < r && c > s) && (o = i, s = c);
  }), o;
}
function Ha(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = ot(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(ht(s), 1),
      verseNum: 1
    };
}
function Fa(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < ht(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = ot(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ja(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = ot(r, e, "previous");
  if (!i) return;
  const c = Math.max(ht(i), 1);
  return { book: i, chapterNum: c, verseNum: Math.max(1, 1) };
}
function Va(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = ot(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function Ka(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
function Xa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Xt.Root,
    {
      "data-slot": "label",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function Ua({
  className: t,
  ...e
}) {
  const a = A();
  return /* @__PURE__ */ n(
    dt.Root,
    {
      "data-slot": "radio-group",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        t
      ),
      dir: a,
      ...e
    }
  );
}
function qa({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    dt.Item,
    {
      "data-slot": "radio-group-item",
      className: w(
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
function vt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    U.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ht({ ...t }) {
  return /* @__PURE__ */ n(U.Root, { "data-slot": "tooltip", ...t });
}
function Ft({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    U.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? w(Dt({ variant: e }), t) : t,
      ...a
    }
  );
}
function Jt({
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
  children: s,
  ...i
}) {
  return /* @__PURE__ */ n(U.Portal, { children: /* @__PURE__ */ g(
    U.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Ne, ...a },
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        s,
        r && /* @__PURE__ */ n(
          U.Arrow,
          {
            className: w(
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
const Le = V(
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
), Vt = G.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function Wa({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: o = "horizontal",
  children: s,
  ...i
}) {
  const c = A();
  return /* @__PURE__ */ n(
    Et.Root,
    {
      "data-slot": "toggle-group",
      "data-variant": e,
      "data-size": a,
      "data-spacing": r,
      "data-orientation": o,
      style: { "--gap": r },
      className: w(
        "pr-twp tw:group/toggle-group tw:flex tw:w-fit tw:flex-row tw:items-center tw:gap-[--spacing(var(--gap))] tw:rounded-lg tw:data-[size=sm]:rounded-[min(var(--tw-radius-md),10px)] tw:data-vertical:flex-col tw:data-vertical:items-stretch",
        t
      ),
      dir: c,
      ...i,
      children: /* @__PURE__ */ n(
        Vt.Provider,
        {
          value: G.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: o }),
            [e, a, r, o]
          ),
          children: s
        }
      )
    }
  );
}
function Za({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...o
}) {
  const s = G.useContext(Vt);
  return /* @__PURE__ */ n(
    Et.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": s.variant || a,
      "data-size": s.size || r,
      "data-spacing": s.spacing,
      className: w(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Le({
          variant: s.variant || a,
          size: s.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
}
function Me({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    Ut.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
const Pe = V(
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
function Ya({
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
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Pe({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Qa({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? wt.Root : "div";
  return /* @__PURE__ */ n(
    r,
    {
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a
    }
  );
}
function tr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    Me,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...a
    }
  );
}
function er() {
  return /Macintosh/i.test(navigator.userAgent);
}
function ar() {
  return /Windows/i.test(navigator.userAgent);
}
const Oe = ["input", "select", "textarea", "button"], je = ["button", "textbox"], rr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = mt(null), [s, i] = B(void 0), [c, l] = B(void 0), d = $(
    (f) => {
      i(f);
      const N = t.find((E) => E.id === f);
      N && (e == null || e(N));
      const x = document.getElementById(f);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), o.current && o.current.setAttribute("aria-activedescendant", f);
    },
    [e, t]
  ), m = $(
    (f) => {
      const N = t.find((x) => x.id === f);
      N && (l((x) => x === f ? void 0 : f), a == null || a(N));
    },
    [a, t]
  ), h = (f) => {
    if (!f) return !1;
    const N = f.tagName.toLowerCase();
    if (f.isContentEditable || Oe.includes(N)) return !0;
    const x = f.getAttribute("role");
    if (x && je.includes(x)) return !0;
    const E = f.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, I = $(
    (f) => {
      var H;
      const N = f.target, x = (C) => C ? document.getElementById(C) : void 0, E = x(c), O = x(s);
      if (!!(E && N && E.contains(N) && N !== E) && h(N)) {
        if (f.key === "Escape" || f.key === "ArrowLeft" && !N.isContentEditable) {
          if (c) {
            f.preventDefault(), f.stopPropagation();
            const C = t.find((u) => u.id === c);
            C && d(C.id);
          }
          return;
        }
        if (f.key === "ArrowDown" || f.key === "ArrowUp") {
          if (!E) return;
          const C = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const u = C.findIndex((b) => b === N);
          if (u === -1) return;
          let p;
          f.key === "ArrowDown" ? p = Math.min(u + 1, C.length - 1) : p = Math.max(u - 1, 0), p !== u && (f.preventDefault(), f.stopPropagation(), (H = C[p]) == null || H.focus());
          return;
        }
        return;
      }
      const S = t.findIndex((C) => C.id === s);
      let T = S;
      switch (f.key) {
        case "ArrowDown":
          T = Math.min(S + 1, t.length - 1), f.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(S - 1, 0), f.preventDefault();
          break;
        case "Home":
          T = 0, f.preventDefault();
          break;
        case "End":
          T = t.length - 1, f.preventDefault();
          break;
        case " ":
        case "Enter":
          s && m(s), f.preventDefault(), f.stopPropagation();
          return;
        case "ArrowRight": {
          const C = O;
          if (C) {
            const u = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), p = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), b = u ?? p;
            if (b) {
              f.preventDefault(), b.focus();
              return;
            }
          }
          break;
        }
        default:
          f.key.length === 1 && !f.metaKey && !f.ctrlKey && !f.altKey && (h(N) || (r == null || r(f.key), f.preventDefault()));
          return;
      }
      const D = t[T];
      D && d(D.id);
    },
    [t, d, s, c, m, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: c,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: I,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Be = V(
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
  const o = a ? wt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Be({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const Kt = Qt(void 0);
function nt() {
  const t = te(Kt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const st = V("", {
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
function _e({ variant: t = "default", ...e }) {
  const a = A(), r = G.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Kt.Provider, { value: r, children: /* @__PURE__ */ n(z.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function or({
  ...t
}) {
  return /* @__PURE__ */ n(z.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function $e({
  ...t
}) {
  return /* @__PURE__ */ n(z.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function He({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const s = A();
  return /* @__PURE__ */ n(z.Portal, { children: /* @__PURE__ */ n(
    z.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: w(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...o,
      children: /* @__PURE__ */ n("div", { dir: s, children: r })
    }
  ) });
}
function nr({ ...t }) {
  return /* @__PURE__ */ n(z.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function sr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = A(), s = nt();
  return /* @__PURE__ */ n(
    z.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: w(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: s.variant })
      ),
      dir: o,
      ...r
    }
  );
}
function Nt({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const s = A(), i = nt();
  return /* @__PURE__ */ g(
    z.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: w(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: i.variant })
      ),
      checked: a,
      dir: s,
      ...o,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(ft, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ir({
  ...t
}) {
  return /* @__PURE__ */ n(z.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function lr({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = A(), s = nt();
  return /* @__PURE__ */ g(
    z.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: w(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: s.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(ft, {}) })
          }
        ),
        e
      ]
    }
  );
}
function xt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    z.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: w(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
function Fe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    z.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: w("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function dr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: w(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function cr({ ...t }) {
  return /* @__PURE__ */ n(z.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function ur({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = nt();
  return /* @__PURE__ */ g(
    z.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: w(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(Zt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function wr({ className: t, children: e, ...a }) {
  const r = A();
  return /* @__PURE__ */ n(
    z.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: w(
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
function fr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: w("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const yt = `
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
function Je(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Y(t, e) {
  const a = e ? `${yt}, ${e}` : yt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Je(r)
  );
}
function mr({
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
    const i = o.current;
    if (!i) return;
    const c = () => {
      requestAnimationFrame(() => {
        Y(i, '[tabindex]:not([tabindex="-1"])').forEach((m) => {
          m.setAttribute("tabindex", "-1");
        });
      });
    };
    c();
    const l = new MutationObserver(() => {
      c();
    });
    return l.observe(i, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      l.disconnect();
    };
  }, []);
  const s = (i) => {
    const { current: c } = o;
    if (c) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Y(c)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === c && i.preventDefault();
    }
  };
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ n(
      "div",
      {
        "data-slot": "table-container",
        className: w("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: o,
            onKeyDown: s,
            className: w(
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
function pr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: w(
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
function hr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: w("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function gr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: w(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function Ve(t) {
  G.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? Y(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < o.length && o[i].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
function Ke(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Xe(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function br({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...s
}) {
  const i = G.useRef(null);
  G.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), Ve(i);
  const c = G.useMemo(
    () => i.current ? Y(i.current) : [],
    [i]
  ), l = G.useCallback(
    (m) => {
      const { current: h } = i;
      if (!h || !h.parentElement) return;
      const I = h.closest("table"), f = I ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Y(I).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], N = f.indexOf(h), x = c.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (m.key === "ArrowDown" || m.key === "ArrowUp")
        m.preventDefault(), Xe(f, N, m.key);
      else if (m.key === "ArrowLeft" || m.key === "ArrowRight")
        m.preventDefault(), Ke(c, x, m.key);
      else if (m.key === "Escape") {
        m.preventDefault();
        const E = h.closest("table");
        E && E.focus();
      }
      e == null || e(m);
    },
    [i, c, e]
  ), d = G.useCallback(
    (m) => {
      r && (a == null || a(m));
    },
    [r, a]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: l,
      onFocus: d,
      className: w(
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
function vr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "th",
    {
      "data-slot": "table-head",
      className: w(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Nr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "td",
    {
      "data-slot": "table-cell",
      className: w(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: w("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function yr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: c = "No entries found",
  customSelectedText: l,
  isOpen: d = void 0,
  onOpenChange: m = void 0,
  isDisabled: h = !1,
  sortSelected: I = !1,
  icon: f = void 0,
  className: N = void 0,
  variant: x = "ghost",
  id: E
}) {
  const [O, M] = B(!1), j = $(
    (p) => {
      var y;
      const b = (y = t.find((v) => v.label === p)) == null ? void 0 : y.value;
      b && a(
        e.includes(b) ? e.filter((v) => v !== b) : [...e, b]
      );
    },
    [t, e, a]
  ), S = () => l || r, T = X(() => {
    if (!I) return t;
    const p = t.filter((y) => y.starred).sort((y, v) => y.label.localeCompare(v.label)), b = t.filter((y) => !y.starred).sort((y, v) => {
      const F = e.includes(y.value), tt = e.includes(v.value);
      return F && !tt ? -1 : !F && tt ? 1 : y.label.localeCompare(v.label);
    });
    return [...p, ...b];
  }, [t, e, I]), D = () => {
    a(t.map((p) => p.value));
  }, H = () => {
    a([]);
  }, C = d ?? O;
  return /* @__PURE__ */ n("div", { id: E, className: N, children: /* @__PURE__ */ g(Bt, { open: C, onOpenChange: m ?? M, children: [
    /* @__PURE__ */ n(ut, { asChild: !0, children: /* @__PURE__ */ g(
      L,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": C,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: h,
        children: [
          /* @__PURE__ */ g("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            f && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: f }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: w(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: S()
              }
            )
          ] }),
          /* @__PURE__ */ n(Tt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n($t, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ g(Rt, { children: [
      /* @__PURE__ */ n(Lt, { placeholder: `Search ${r.toLowerCase()}...` }),
      o && /* @__PURE__ */ g("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: D, children: s }),
        /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: H, children: i })
      ] }),
      /* @__PURE__ */ g(Mt, { children: [
        /* @__PURE__ */ n(Pt, { children: c }),
        /* @__PURE__ */ n(Ot, { children: T.map((p) => /* @__PURE__ */ g(
          jt,
          {
            value: p.label,
            onSelect: j,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                zt,
                {
                  className: w(
                    "tw:h-4 tw:w-4",
                    e.includes(p.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              p.starred && /* @__PURE__ */ n(re, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: p.label }),
              p.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: p.secondaryLabel })
            ]
          },
          p.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Ir({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd",
      className: w(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function kr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: w("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function Ue() {
  const [t, e] = B(!1), a = mt(null), r = $(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = $(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function qe(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Z(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function It(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function lt(t) {
  const e = qe(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((s) => {
      const i = e.get(Z(s.id)) ?? [];
      return {
        rowKey: s.id,
        projectId: s.id,
        shortName: s.shortName,
        fullName: s.fullName,
        language: s.language,
        languageCode: s.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((c) => c.scrollGroupId),
        isSelected: o === s.id,
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
  return t.projects.forEach((o) => {
    const s = e.get(Z(o.id));
    if (!s || s.length === 0) {
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
        isSelected: It(a, o.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
      });
      return;
    }
    s.forEach((i) => {
      r.push({
        rowKey: `tab:${o.id}:${i.scrollGroupId}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: i.scrollGroupId,
        scrollGroupScrRefLabel: i.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: It(a, o.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
      });
    });
  }), a.forEach((o) => {
    if (o.scrollGroupId === void 0 || r.some((i) => i.projectId === o.projectId && i.scrollGroupId === o.scrollGroupId))
      return;
    const s = t.projects.find((i) => i.id === o.projectId);
    s && r.push({
      rowKey: `closed:${s.id}:${o.scrollGroupId}`,
      projectId: s.id,
      shortName: s.shortName,
      fullName: s.fullName,
      language: s.language,
      languageCode: s.languageCode,
      scrollGroupId: o.scrollGroupId,
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
function kt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function q(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function We(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(q) }];
  const a = t.filter(kt).sort(q), r = t.filter((s) => !kt(s)).sort(q);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function Ze(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((c) => {
    const l = c.versificationId;
    if (l === void 0 || l === "") {
      o.push(c);
      return;
    }
    const d = c.versificationName ?? l, m = r.get(l);
    m ? (m.rows.push(c), !m.label && c.versificationName && (m.label = c.versificationName)) : r.set(l, { label: d, rows: [c] });
  });
  const s = [...r.entries()].map(([c, { label: l, rows: d }]) => ({
    id: c,
    label: l,
    rows: [...d].sort(q)
  }));
  s.sort((c, l) => c.id === e ? -1 : l.id === e ? 1 : c.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: c, label: l, rows: d }) => ({
    kind: "versification",
    rows: d,
    label: l,
    isPriority: c === e
  }));
  return o.length > 0 && i.push({
    kind: "versification",
    rows: [...o].sort(q),
    label: a,
    isPriority: !1
  }), i;
}
const Ye = {
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
function Qe(t) {
  return { ...Ye, ...t };
}
function Q(t) {
  return Re[Yt(t)] ?? String(t);
}
const ta = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ea({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = Q(t);
  return e ? /* @__PURE__ */ n(
    rt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ta,
      children: a
    }
  ) : /* @__PURE__ */ n(rt, { variant: "secondary", children: a });
}
function aa({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: s }) {
  const {
    ref: i,
    open: c,
    onPointerEnter: l,
    onPointerLeave: d
  } = Ue(), [m, h] = B(!1), I = !!(t.language || t.languageCode), f = I || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, N = c || m, x = $(() => {
    if (f) {
      h(!0);
      return;
    }
    l();
  }, [f, l]), E = $(() => {
    h(!1), d();
  }, [d]), O = /* @__PURE__ */ n(zt, { className: w("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((D) => /* @__PURE__ */ n(rt, { variant: "secondary", children: Q(D) }, D)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ g("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      ea,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ g(
      L,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (D) => {
          D.stopPropagation(), o(t);
        },
        onMouseDown: (D) => D.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(ne, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const j = /* @__PURE__ */ g(
    jt,
    {
      ref: t.isSelected ? s : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: x,
      onPointerLeave: E,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: O }),
        /* @__PURE__ */ g(
          "span",
          {
            ref: i,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        M
      ]
    }
  ), S = t.scrollGroupId !== void 0 ? Q(t.scrollGroupId) : void 0, T = t.isBoundButClosed && S ? a.boundButClosedTooltip.replace("{group}", S) : void 0;
  return /* @__PURE__ */ g(Ht, { open: N, delayDuration: 400, children: [
    /* @__PURE__ */ n(Ft, { asChild: !0, children: j }),
    /* @__PURE__ */ g(
      Jt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Gt },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          I && /* @__PURE__ */ g("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ g("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && S && /* @__PURE__ */ g("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ g("span", { className: "tw:text-muted-foreground", children: [
              " (",
              S,
              ")"
            ] })
          ] }),
          T && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: T }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function ra({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: o
}) {
  const s = !!a;
  return /* @__PURE__ */ g(_e, { children: [
    /* @__PURE__ */ n($e, { asChild: !0, children: /* @__PURE__ */ n(
      L,
      {
        variant: "ghost",
        size: "sm",
        className: w(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          s && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": o.filterAriaLabel,
        "aria-pressed": s,
        title: o.filterAriaLabel,
        onMouseDown: (i) => i.preventDefault(),
        children: /* @__PURE__ */ n(oe, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ g(He, { align: "end", className: "tw:w-56", style: { zIndex: Gt }, children: [
      /* @__PURE__ */ n(xt, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        Nt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ g(Ct, { children: [
        /* @__PURE__ */ n(Fe, {}),
        /* @__PURE__ */ n(xt, { children: o.filterSectionLabel }),
        /* @__PURE__ */ n(
          Nt,
          {
            checked: !!a,
            onCheckedChange: r,
            onSelect: (i) => i.preventDefault(),
            children: o.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Cr(t) {
  const [e, a] = B(!1), [r, o] = B(""), [s, i] = B(t.defaultGroupByOpenTabs ?? !0), [c, l] = B(!1), d = mt(null), m = $((u) => {
    a(u), u || o("");
  }, []);
  ee(() => {
    if (!e) return;
    const u = window.requestAnimationFrame(() => {
      const p = d.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(u);
  }, [e]);
  const h = Qe(t.localizedStrings), I = X(() => t.mode === "project" ? lt({
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
    let p = I;
    return u && (p = p.filter(
      (b) => b.shortName.toLowerCase().includes(u) || b.fullName.toLowerCase().includes(u) || (b.language ?? "").toLowerCase().includes(u) || (b.languageCode ?? "").toLowerCase().includes(u)
    )), t.mode === "project-multi" && c && (p = p.filter((b) => b.isSelected)), p;
  }, [I, r, t.mode, c]), N = X(
    () => t.groupByVersification ? Ze(
      f,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ) : We(f, s),
    [
      f,
      s,
      t.groupByVersification,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ]
  ), x = X(() => {
    if (t.mode !== "project-multi") return [];
    const u = [];
    return t.projects.forEach((p) => {
      const b = t.openTabs.filter(
        (v) => Z(v.projectId) === Z(p.id)
      );
      if (b.length === 0) {
        u.push({ projectId: p.id });
        return;
      }
      const y = /* @__PURE__ */ new Set();
      b.forEach((v) => {
        y.has(v.scrollGroupId) || (y.add(v.scrollGroupId), u.push({ projectId: p.id, scrollGroupId: v.scrollGroupId }));
      });
    }), u;
  }, [t.mode, t.projects, t.openTabs]), E = (u) => {
    if (u.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(u.projectId, u.scrollGroupId);
    }
  }, O = (u) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: u.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, b = (v) => v.projectId === u.projectId && v.scrollGroupId === u.scrollGroupId, y = p.some(b) ? p.filter((v) => !b(v)) : [...p, { projectId: u.projectId, scrollGroupId: u.scrollGroupId }];
        t.onChangeSelection({ pairs: y }), y.length === 0 && c && l(!1);
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
        const p = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: u.projectId, scrollGroupId: p }), t.onOpenProjectInGroup(u.projectId, p), a(!1);
      }
    }
  }, M = () => {
    if (t.mode !== "project-multi") return;
    const u = t.selection.pairs, p = new Set(u.map((y) => `${y.projectId}:${y.scrollGroupId ?? ""}`)), b = [...u];
    x.forEach((y) => {
      const v = `${y.projectId}:${y.scrollGroupId ?? ""}`;
      p.has(v) || (p.add(v), b.push(y));
    }), t.onChangeSelection({ pairs: b });
  }, j = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), c && l(!1));
  }, S = X(() => {
    switch (t.mode) {
      case "project": {
        const u = t.projects.find((b) => b.id === t.selection.projectId);
        let p = u ? u.shortName : t.buttonPlaceholder ?? "";
        return u && t.triggerLabelFormat === "shortNameAndFullName" && u.fullName && u.fullName !== u.shortName && (p = `${u.shortName} - ${u.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: u } = t.selection;
        if (u.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        const p = [];
        if (u.forEach((v) => {
          const F = t.projects.find((tt) => tt.id === v.projectId);
          F && p.push({ project: F, scrollGroupId: v.scrollGroupId });
        }), p.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        if (t.getSelectedText) {
          const v = t.getSelectedText(p);
          return { node: v, title: v };
        }
        const b = p.map(
          ({ project: v, scrollGroupId: F }) => F === void 0 ? v.shortName : `${v.shortName} (${Q(F)})`
        ).join(", ");
        if (p.length === 1) return { node: b, title: b };
        const y = p.length.toString();
        return {
          node: /* @__PURE__ */ g(Ct, { children: [
            /* @__PURE__ */ n(rt, { variant: "muted", className: "tw:shrink-0", children: y }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: b })
          ] }),
          title: `${y} ${b}`
        };
      }
      case "projectScrollGroup": {
        const u = t.projects.find((y) => y.id === t.selection.projectId);
        if (!u) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: u.shortName, title: u.shortName };
        const b = `${u.shortName} · ${Q(p)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ n(se, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ n(Tt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ n(ie, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const D = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? E : void 0, H = /* @__PURE__ */ g(
    L,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: w(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof S.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: S.node }) : S.node }),
        T
      ]
    }
  ), C = S.title ? /* @__PURE__ */ n(vt, { delayDuration: 400, children: /* @__PURE__ */ g(Ht, { children: [
    /* @__PURE__ */ n(Ft, { asChild: !0, children: /* @__PURE__ */ n(ut, { asChild: !0, children: H }) }),
    /* @__PURE__ */ n(Jt, { children: S.title })
  ] }) }) : /* @__PURE__ */ n(ut, { asChild: !0, children: H });
  return /* @__PURE__ */ g(Bt, { open: e, onOpenChange: m, children: [
    C,
    /* @__PURE__ */ n(
      $t,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: w("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(vt, { delayDuration: 400, children: /* @__PURE__ */ g(Rt, { shouldFilter: !1, children: [
          /* @__PURE__ */ g("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              Lt,
              {
                value: r,
                onValueChange: o,
                placeholder: h.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && /* @__PURE__ */ n(
              ra,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? c : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? l : void 0,
                strings: h
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ g("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: M, children: `${h.selectAll} (${x.length.toString()})` }),
            /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: j, children: `${h.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ g(Mt, { children: [
            /* @__PURE__ */ n(Pt, { children: t.commandEmptyMessage ?? "No projects found" }),
            N.map((u, p) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ g(ae, { children: [
                /* @__PURE__ */ n(Ot, { heading: oa(u, h), children: u.rows.map((b) => /* @__PURE__ */ n(
                  aa,
                  {
                    row: b,
                    mode: t.mode,
                    strings: h,
                    onClick: O,
                    onOpen: D,
                    selectedRowRef: d
                  },
                  b.rowKey
                )) }),
                p < N.length - 1 && /* @__PURE__ */ n(Se, {})
              ] }, `${u.kind}:${u.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function oa(t, e) {
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
const na = St(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, c) => {
    const l = A();
    return /* @__PURE__ */ g(
      "div",
      {
        id: i,
        className: w("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            le,
            {
              className: w(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": l === "rtl" },
                { "tw:left-3": l === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            Ie,
            {
              ref: c,
              className: w(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: (d) => e(d.target.value),
              disabled: s
            }
          ),
          t && /* @__PURE__ */ g(
            L,
            {
              variant: "ghost",
              size: "icon",
              className: w(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": l === "rtl" },
                { "tw:right-0": l === "ltr" }
              ),
              onClick: () => {
                e("");
              },
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
na.displayName = "SearchBar";
const sa = St(({ className: t, ...e }, a) => /* @__PURE__ */ n(ce, { size: 35, className: w("tw:animate-spin", t), ...e, ref: a }));
sa.displayName = "Spinner";
function Er({
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
      className: w(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (s) => a(Object.values(s)) : void 0,
      ...o
    }
  );
}
function at(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Sr({
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
      defaultSize: at(t),
      minSize: at(e),
      maxSize: at(a),
      collapsedSize: at(r),
      ...o
    }
  );
}
function Tr({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    pt.Separator,
    {
      "data-slot": "resizable-handle",
      className: w(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  pr as $,
  Ma as A,
  L as B,
  jt as C,
  ya as D,
  Va as E,
  Jt as F,
  tr as G,
  er as H,
  sr as I,
  rt as J,
  _e as K,
  Xa as L,
  $e as M,
  He as N,
  fr as O,
  Bt as P,
  rr as Q,
  Ua as R,
  Me as S,
  Wa as T,
  xt as U,
  Fe as V,
  Nt as W,
  br as X,
  Nr as Y,
  ge as Z,
  mr as _,
  La as a,
  vr as a0,
  hr as a1,
  nr as a2,
  ir as a3,
  lr as a4,
  yr as a5,
  Ir as a6,
  va as a7,
  Ie as a8,
  Se as a9,
  $a as aA,
  Ba as aB,
  _a as aC,
  Tr as aD,
  Sr as aE,
  Er as aF,
  sa as aG,
  xr as aH,
  gr as aI,
  Na as aJ,
  ve as aK,
  be as aL,
  Be as aM,
  Pe as aN,
  Dt as aO,
  ar as aP,
  Ue as aQ,
  Ka as aR,
  Ne as aS,
  xa as aT,
  Ga as aa,
  ja as ab,
  Cr as ac,
  Gt as ad,
  na as ae,
  Aa as af,
  Oa as ag,
  Sa as ah,
  Re as ai,
  cr as aj,
  ur as ak,
  or as al,
  wr as am,
  Kt as an,
  nt as ao,
  st as ap,
  ke as aq,
  Ee as ar,
  Qa as as,
  ka as at,
  za as au,
  ye as av,
  xe as aw,
  Ia as ax,
  dr as ay,
  kr as az,
  ut as b,
  w as c,
  $t as d,
  Rt as e,
  Mt as f,
  Ra as g,
  Ot as h,
  Ha as i,
  Ja as j,
  Fa as k,
  Pa as l,
  Te as m,
  Da as n,
  Lt as o,
  Pt as p,
  qa as q,
  A as r,
  Ca as s,
  Ea as t,
  Ta as u,
  Za as v,
  vt as w,
  Ya as x,
  Ht as y,
  Ft as z
};
//# sourceMappingURL=resizable-C3AVzTx2.js.map
