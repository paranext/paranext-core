import { jsx as s, jsxs as h, Fragment as dt } from "react/jsx-runtime";
import { Slot as ft, Dialog as B, Popover as Z, Label as Wt, RadioGroup as ct, Tooltip as W, ToggleGroup as Et, Separator as Zt, DropdownMenu as G } from "radix-ui";
import { IconX as Yt, IconSearch as Qt, IconCheck as mt, IconChevronRight as te } from "@tabler/icons-react";
import { Canon as U } from "@sillsdev/scripture";
import { includes as et, Section as J, normalizeProjectId as Y, getLocalizeKeyForScrollGroupId as ee } from "platform-bible-utils";
import z, { useRef as pt, useState as $, useCallback as H, createContext as ae, useContext as re, useMemo as q, useEffect as oe, Fragment as ne, forwardRef as Tt } from "react";
import { cva as K } from "class-variance-authority";
import { ChevronsUpDown as Gt, Check as zt, Star as se, Filter as ie, ArrowRight as le, Loader2 as de, ChevronDown as ce, Search as ue, X as we, LoaderCircle as fe } from "lucide-react";
import "@eten-tech-foundation/scripture-utilities";
import { Command as X } from "cmdk";
import * as ht from "react-resizable-panels";
import { clsx as me } from "clsx";
import { extendTailwindMerge as pe, twMerge as he } from "tailwind-merge";
const ge = pe({ prefix: "tw" });
function ut(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const n = t[o];
    n === "[" ? r += 1 : n === "]" && (r -= 1), n === ":" && r === 0 ? (e.push(a), a = "") : a += n;
  }
  return e.push(a), e;
}
function be(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ut(t), a = e.findIndex((n) => n.startsWith("-tw-"));
  if (a !== -1) {
    const n = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((d, u) => u !== a), `-${n}`].join(":")}`, original: t };
  }
  const r = e.findIndex((n) => n.startsWith("!tw-"));
  if (r !== -1) {
    const n = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((d, u) => u !== r), `!${n}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const n = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), n].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function ve(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = ut(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], n = ut(e), i = n.some((d) => d.startsWith("-tw-")), l = n.some((d) => d.startsWith("!tw-"));
  if (i && o.startsWith("-")) {
    const d = o.slice(1);
    return [...r, `-tw-${d}`].join(":");
  }
  if (l && o.startsWith("!")) {
    const d = o.slice(1);
    return [...r, `!tw-${d}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
function w(...t) {
  const e = me(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return ge(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((d) => {
    const u = be(d);
    r.set(u.normalized, u.original), o.push(u.normalized);
  }), he(o.join(" ")).split(" ").filter(Boolean).map((d) => {
    const u = r.get(d);
    return u ? ve(d, u) : d;
  }).join(" ");
}
const Dt = 600, Ta = 300, Ga = 400, Ne = 450, xe = 500, ye = 550, za = 700, At = K(
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
function O({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...o
}) {
  const n = r ? ft.Root : "button";
  return /* @__PURE__ */ s(
    n,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: w(At({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Rt = "layoutDirection";
function A() {
  const t = localStorage.getItem(Rt);
  return t === "rtl" ? t : "ltr";
}
function Da(t) {
  localStorage.setItem(Rt, t);
}
function Aa({ ...t }) {
  return /* @__PURE__ */ s(B.Root, { "data-slot": "dialog", ...t });
}
function Ra({ ...t }) {
  return /* @__PURE__ */ s(B.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function Ie({ ...t }) {
  return /* @__PURE__ */ s(B.Portal, { "data-slot": "dialog-portal", ...t });
}
function La({ ...t }) {
  return /* @__PURE__ */ s(B.Close, { "data-slot": "dialog-close", ...t });
}
function ke({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    B.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: w(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: Ne, ...e },
      ...a
    }
  );
}
function Oa({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...n
}) {
  const i = A();
  return /* @__PURE__ */ h(Ie, { children: [
    /* @__PURE__ */ s(ke, { className: r }),
    /* @__PURE__ */ h(
      B.Content,
      {
        "data-slot": "dialog-content",
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: xe, ...o },
        dir: i,
        ...n,
        children: [
          e,
          a && /* @__PURE__ */ s(B.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ h(O, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ s(Yt, {}),
            /* @__PURE__ */ s("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function Ma({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
function Pa({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ h(
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
        e && /* @__PURE__ */ s(B.Close, { asChild: !0, children: /* @__PURE__ */ s(O, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ba({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    B.Title,
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
function ja({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    B.Description,
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
function Ce({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ s(
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
function Se({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
const Ee = K(
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
function Te({
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
        className: w(Ee({ align: e }), t),
        onClick: (r) => {
          var o, n;
          r.target instanceof HTMLElement && r.target.closest("button") || (n = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || n.focus();
        },
        ...a
      }
    )
  );
}
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
function Lt({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    X,
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
function Ot({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...a
}) {
  const r = A(), o = z.useCallback(
    (n) => {
      if (e == null || e(n), n.defaultPrevented || n.key !== " " || n.currentTarget.value !== "") return;
      const i = n.currentTarget.closest("[cmdk-root]"), l = i == null ? void 0 : i.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      l && (n.preventDefault(), n.stopPropagation(), l.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ s("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: r, children: /* @__PURE__ */ h(Se, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ s(
        X.Input,
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
      /* @__PURE__ */ s(Te, { children: /* @__PURE__ */ s(Qt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Mt({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    X.List,
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
  return /* @__PURE__ */ s(
    X.Empty,
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
function Bt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    X.Group,
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
function Ge({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    X.Separator,
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
  return /* @__PURE__ */ h(
    X.Item,
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
        /* @__PURE__ */ s(mt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function _a({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
const $a = (t, e, a, r, o) => {
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
}, Ua = (t, e, a, r, o) => {
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
function Ha(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? U.bookIdToEnglishName(t);
}
function Fa(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const ze = U.allBookIds.filter(
  (t) => !U.isObsolete(U.bookIdToNumber(t))
), Ja = Object.fromEntries(
  ze.map((t) => [t, U.bookIdToEnglishName(t)])
);
function Va(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = U.bookIdToEnglishName(t), n = a == null ? void 0 : a.get(t);
  return !!(et(o.toLowerCase(), r) || et(t.toLowerCase(), r) || (n ? et(n.localizedName.toLowerCase(), r) || et(n.localizedId.toLowerCase(), r) : !1));
}
function _t({ ...t }) {
  return /* @__PURE__ */ s(Z.Root, { "data-slot": "popover", ...t });
}
function wt({ ...t }) {
  return /* @__PURE__ */ s(Z.Trigger, { "data-slot": "popover-trigger", ...t });
}
const $t = z.createContext(null);
function Ka({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ s($t.Provider, { value: t, children: e });
}
function Ut({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const n = A(), i = z.useContext($t);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ s(Z.Portal, { container: i ?? void 0, children: /* @__PURE__ */ s(
      Z.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: w(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Dt, ...r },
        dir: n,
        ...o
      }
    ) })
  );
}
function Xa({ ...t }) {
  return /* @__PURE__ */ s(Z.Anchor, { "data-slot": "popover-anchor", ...t });
}
function qa({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-header",
      className: w("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Wa({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-title",
      className: w("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Za({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "p",
    {
      "data-slot": "popover-description",
      className: w("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
var L = {}, it, bt;
function De() {
  return bt || (bt = 1, it = () => {
    const t = "\\ud800-\\udfff", i = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", l = "\\ufe0e\\ufe0f", d = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", u = `[${t}]`, f = `[${i}]`, N = "\\ud83c[\\udffb-\\udfff]", g = `(?:${f}|${N})`, m = `[^${t}]`, v = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", x = "[\\ud800-\\udbff][\\udc00-\\udfff]", S = "\\u200d", j = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", M = `[${d}]`, _ = `${g}?`, D = `[${l}]?`, T = `(?:${S}(?:${[m, v, x].join("|")})${D + _})*`, E = D + _ + T, C = `(?:${[`${m}${f}?`, f, v, x, u, M].join("|")})`;
    return new RegExp(`${j}|${N}(?=${N})|${C + E}`, "g");
  }), it;
}
var vt;
function Ae() {
  if (vt) return L;
  vt = 1;
  var t = L && L.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(L, "__esModule", { value: !0 });
  var e = t(De());
  function a(d) {
    if (typeof d != "string")
      throw new Error("A string is expected as input");
    return d.match(e.default()) || [];
  }
  L.toArray = a;
  function r(d) {
    if (typeof d != "string")
      throw new Error("Input must be a string");
    var u = d.match(e.default());
    return u === null ? 0 : u.length;
  }
  L.length = r;
  function o(d, u, f) {
    if (u === void 0 && (u = 0), typeof d != "string")
      throw new Error("Input must be a string");
    (typeof u != "number" || u < 0) && (u = 0), typeof f == "number" && f < 0 && (f = 0);
    var N = d.match(e.default());
    return N ? N.slice(u, f).join("") : "";
  }
  L.substring = o;
  function n(d, u, f) {
    if (u === void 0 && (u = 0), typeof d != "string")
      throw new Error("Input must be a string");
    var N = r(d);
    if (typeof u != "number" && (u = parseInt(u, 10)), u >= N)
      return "";
    u < 0 && (u += N);
    var g;
    typeof f > "u" ? g = N : (typeof f != "number" && (f = parseInt(f, 10)), g = f >= 0 ? f + u : u);
    var m = d.match(e.default());
    return m ? m.slice(u, g).join("") : "";
  }
  L.substr = n;
  function i(d, u, f, N) {
    if (u === void 0 && (u = 16), f === void 0 && (f = "#"), N === void 0 && (N = "right"), typeof d != "string" || typeof u != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(N) === -1)
      throw new Error("Pad position should be either left or right");
    typeof f != "string" && (f = String(f));
    var g = r(d);
    if (g > u)
      return o(d, 0, u);
    if (g < u) {
      var m = f.repeat(u - g);
      return N === "left" ? m + d : d + m;
    }
    return d;
  }
  L.limit = i;
  function l(d, u, f) {
    if (f === void 0 && (f = 0), typeof d != "string")
      throw new Error("Input must be a string");
    if (d === "")
      return u === "" ? 0 : -1;
    f = Number(f), f = isNaN(f) ? 0 : f, u = String(u);
    var N = a(d);
    if (f >= N.length)
      return u === "" ? N.length : -1;
    if (u === "")
      return f;
    var g = a(u), m = !1, v;
    for (v = f; v < N.length; v += 1) {
      for (var x = 0; x < g.length && g[x] === N[v + x]; )
        x += 1;
      if (x === g.length && g[x - 1] === N[v + x - 1]) {
        m = !0;
        break;
      }
    }
    return m ? v : -1;
  }
  return L.indexOf = l, L;
}
Ae();
const Re = [
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
], Le = (t) => {
  var e;
  return ((e = Re[t]) == null ? void 0 : e.chapters) ?? -1;
};
function k(t) {
  return `%scrollGroup_${t}%`;
}
const Oe = {
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
function gt(t, e) {
  return Le(U.bookIdToNumber(t));
}
function ot(t, e, a) {
  const r = U.bookIdToNumber(t);
  let o, n = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const l = U.bookIdToNumber(i);
    (a === "next" ? l > r && l < n : l < r && l > n) && (o = i, n = l);
  }), o;
}
function Ya(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const n = ot(r, e, "previous");
  if (n)
    return {
      book: n,
      chapterNum: Math.max(gt(n), 1),
      verseNum: 1
    };
}
function Qa(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < gt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const n = ot(r, e, "next");
  if (n)
    return { book: n, chapterNum: 1, verseNum: 1 };
}
function tr(t, e, a) {
  const { book: r, chapterNum: o, verseNum: n } = t;
  if (e === void 0 || e.includes(r))
    return n > 1 ? { book: r, chapterNum: o, verseNum: n - 1 } : n === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = ot(r, e, "previous");
  if (!i) return;
  const l = Math.max(gt(i), 1);
  return { book: i, chapterNum: l, verseNum: Math.max(1, 1) };
}
function er(t, e, a) {
  const { book: r, chapterNum: o, verseNum: n } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: n + 1 };
  const i = ot(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function ar(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
function rr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    Wt.Root,
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
function or({
  className: t,
  ...e
}) {
  const a = A();
  return /* @__PURE__ */ s(
    ct.Root,
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
function nr({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    ct.Item,
    {
      "data-slot": "radio-group-item",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        t
      ),
      ...e,
      children: /* @__PURE__ */ s(
        ct.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ s("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
function Nt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ s(
    W.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Ht({ ...t }) {
  return /* @__PURE__ */ s(W.Root, { "data-slot": "tooltip", ...t });
}
function Ft({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    W.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? w(At({ variant: e }), t) : t,
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
  children: n,
  ...i
}) {
  return /* @__PURE__ */ s(W.Portal, { children: /* @__PURE__ */ h(
    W.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: ye, ...a },
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        n,
        r && /* @__PURE__ */ s(
          W.Arrow,
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
const Me = K(
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
), Vt = z.createContext({
  size: "default",
  variant: "default",
  spacing: 0,
  orientation: "horizontal"
});
function sr({
  className: t,
  variant: e,
  size: a,
  spacing: r = 0,
  orientation: o = "horizontal",
  children: n,
  ...i
}) {
  const l = A();
  return /* @__PURE__ */ s(
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
      dir: l,
      ...i,
      children: /* @__PURE__ */ s(
        Vt.Provider,
        {
          value: z.useMemo(
            () => ({ variant: e, size: a, spacing: r, orientation: o }),
            [e, a, r, o]
          ),
          children: n
        }
      )
    }
  );
}
function ir({
  className: t,
  children: e,
  variant: a = "default",
  size: r = "default",
  ...o
}) {
  const n = z.useContext(Vt);
  return /* @__PURE__ */ s(
    Et.Item,
    {
      "data-slot": "toggle-group-item",
      "data-variant": n.variant || a,
      "data-size": n.size || r,
      "data-spacing": n.spacing,
      className: w(
        "tw:shrink-0 tw:group-data-[spacing=0]/toggle-group:rounded-none tw:group-data-[spacing=0]/toggle-group:px-2 tw:focus:z-10 tw:focus-visible:z-10 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 tw:group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 tw:group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-s-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-e-lg tw:group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 tw:group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s tw:group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        Me({
          variant: n.variant || a,
          size: n.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
}
function Pe({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ s(
    Zt.Root,
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
const Be = K(
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
  ...a
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Be({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function dr({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? ft.Root : "div";
  return /* @__PURE__ */ s(
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
function cr({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ s(
    Pe,
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
function ur() {
  return /Macintosh/i.test(navigator.userAgent);
}
function wr() {
  return /Windows/i.test(navigator.userAgent);
}
const je = ["input", "select", "textarea", "button"], _e = ["button", "textbox"], fr = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = pt(null), [n, i] = $(void 0), [l, d] = $(void 0), u = H(
    (m) => {
      i(m);
      const v = t.find((S) => S.id === m);
      v && (e == null || e(v));
      const x = document.getElementById(m);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), o.current && o.current.setAttribute("aria-activedescendant", m);
    },
    [e, t]
  ), f = H(
    (m) => {
      const v = t.find((x) => x.id === m);
      v && (d((x) => x === m ? void 0 : m), a == null || a(v));
    },
    [a, t]
  ), N = (m) => {
    if (!m) return !1;
    const v = m.tagName.toLowerCase();
    if (m.isContentEditable || je.includes(v)) return !0;
    const x = m.getAttribute("role");
    if (x && _e.includes(x)) return !0;
    const S = m.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, g = H(
    (m) => {
      var V;
      const v = m.target, x = (C) => C ? document.getElementById(C) : void 0, S = x(l), j = x(n);
      if (!!(S && v && S.contains(v) && v !== S) && N(v)) {
        if (m.key === "Escape" || m.key === "ArrowLeft" && !v.isContentEditable) {
          if (l) {
            m.preventDefault(), m.stopPropagation();
            const C = t.find((R) => R.id === l);
            C && u(C.id);
          }
          return;
        }
        if (m.key === "ArrowDown" || m.key === "ArrowUp") {
          if (!S) return;
          const C = Array.from(
            S.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const R = C.findIndex((p) => p === v);
          if (R === -1) return;
          let c;
          m.key === "ArrowDown" ? c = Math.min(R + 1, C.length - 1) : c = Math.max(R - 1, 0), c !== R && (m.preventDefault(), m.stopPropagation(), (V = C[c]) == null || V.focus());
          return;
        }
        return;
      }
      const D = t.findIndex((C) => C.id === n);
      let T = D;
      switch (m.key) {
        case "ArrowDown":
          T = Math.min(D + 1, t.length - 1), m.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(D - 1, 0), m.preventDefault();
          break;
        case "Home":
          T = 0, m.preventDefault();
          break;
        case "End":
          T = t.length - 1, m.preventDefault();
          break;
        case " ":
        case "Enter":
          n && f(n), m.preventDefault(), m.stopPropagation();
          return;
        case "ArrowRight": {
          const C = j;
          if (C) {
            const R = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), c = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), p = R ?? c;
            if (p) {
              m.preventDefault(), p.focus();
              return;
            }
          }
          break;
        }
        default:
          m.key.length === 1 && !m.metaKey && !m.ctrlKey && !m.altKey && (N(v) || (r == null || r(m.key), m.preventDefault()));
          return;
      }
      const E = t[T];
      E && u(E.id);
    },
    [t, u, n, l, f, r]
  );
  return {
    listboxRef: o,
    activeId: n,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: g,
    /** Focus an option by its ID */
    focusOption: u
  };
}, $e = K(
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
  const o = a ? ft.Root : "span";
  return /* @__PURE__ */ s(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: w(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        $e({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const Kt = ae(void 0);
function nt() {
  const t = re(Kt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const st = K("", {
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
function Ue({ variant: t = "default", ...e }) {
  const a = A(), r = z.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ s(Kt.Provider, { value: r, children: /* @__PURE__ */ s(G.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function mr({
  ...t
}) {
  return /* @__PURE__ */ s(G.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function He({
  ...t
}) {
  return /* @__PURE__ */ s(G.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Fe({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const n = A();
  return /* @__PURE__ */ s(G.Portal, { children: /* @__PURE__ */ s(
    G.Content,
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
      children: /* @__PURE__ */ s("div", { dir: n, children: r })
    }
  ) });
}
function pr({ ...t }) {
  return /* @__PURE__ */ s(G.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function hr({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = A(), n = nt();
  return /* @__PURE__ */ s(
    G.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: w(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: n.variant })
      ),
      dir: o,
      ...r
    }
  );
}
function Je({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const n = A(), i = nt();
  return /* @__PURE__ */ h(
    G.CheckboxItem,
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
      dir: n,
      ...o,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ s(G.ItemIndicator, { children: /* @__PURE__ */ s(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ve({
  ...t
}) {
  return /* @__PURE__ */ s(G.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function xt({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = A(), n = nt();
  return /* @__PURE__ */ h(
    G.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: w(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: n.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ s(G.ItemIndicator, { children: /* @__PURE__ */ s(mt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function yt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ s(
    G.Label,
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
function Ke({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    G.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: w("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function gr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
function br({ ...t }) {
  return /* @__PURE__ */ s(G.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function vr({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = nt();
  return /* @__PURE__ */ h(
    G.SubTrigger,
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
        /* @__PURE__ */ s(te, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Nr({ className: t, children: e, ...a }) {
  const r = A();
  return /* @__PURE__ */ s(
    G.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: w(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...a,
      children: /* @__PURE__ */ s("div", { dir: r, children: e })
    }
  );
}
function xr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "skeleton",
      className: w("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
const It = `
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
  const a = e ? `${It}, ${e}` : It;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && Xe(r)
  );
}
function yr({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = z.useRef(null);
  z.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), z.useEffect(() => {
    const i = o.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Q(i, '[tabindex]:not([tabindex="-1"])').forEach((f) => {
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
  const n = (i) => {
    const { current: l } = o;
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
    /* @__PURE__ */ s(
      "div",
      {
        "data-slot": "table-container",
        className: w("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ s(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: o,
            onKeyDown: n,
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
function Ir({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ s(
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
function kr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "tbody",
    {
      "data-slot": "table-body",
      className: w("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function Cr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
function qe(t) {
  z.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? Q(t.current) : [], n = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? n + 1 : n - 1;
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
function We(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Ze(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Sr({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...n
}) {
  const i = z.useRef(null);
  z.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), qe(i);
  const l = z.useMemo(
    () => i.current ? Q(i.current) : [],
    [i]
  ), d = z.useCallback(
    (f) => {
      const { current: N } = i;
      if (!N || !N.parentElement) return;
      const g = N.closest("table"), m = g ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Q(g).filter(
          (S) => S.tagName === "TR"
        )
      ) : [], v = m.indexOf(N), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (f.key === "ArrowDown" || f.key === "ArrowUp")
        f.preventDefault(), Ze(m, v, f.key);
      else if (f.key === "ArrowLeft" || f.key === "ArrowRight")
        f.preventDefault(), We(l, x, f.key);
      else if (f.key === "Escape") {
        f.preventDefault();
        const S = N.closest("table");
        S && S.focus();
      }
      e == null || e(f);
    },
    [i, l, e]
  ), u = z.useCallback(
    (f) => {
      r && (a == null || a(f));
    },
    [r, a]
  );
  return /* @__PURE__ */ s(
    "tr",
    {
      "data-slot": "table-row",
      ref: i,
      tabIndex: -1,
      onKeyDown: d,
      onFocus: u,
      className: w(
        "tw:border-b tw:transition-colors tw:hover:bg-muted/50 tw:has-aria-expanded:bg-muted/50 tw:data-[state=selected]:bg-muted",
        // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with a custom
        // focus ring so keyboard users see a visible, accessible focus indicator on focused rows
        "tw:outline-hidden",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      ...n
    }
  );
}
function Er({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
function Tr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
function Gr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "caption",
    {
      "data-slot": "table-caption",
      className: w("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function zr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: n = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: d,
  isOpen: u = void 0,
  onOpenChange: f = void 0,
  isDisabled: N = !1,
  sortSelected: g = !1,
  icon: m = void 0,
  className: v = void 0,
  variant: x = "ghost",
  id: S
}) {
  const [j, M] = $(!1), _ = H(
    (c) => {
      var b;
      const p = (b = t.find((I) => I.label === c)) == null ? void 0 : b.value;
      p && a(
        e.includes(p) ? e.filter((I) => I !== p) : [...e, p]
      );
    },
    [t, e, a]
  ), D = () => d || r, T = q(() => {
    if (!g) return t;
    const c = t.filter((b) => b.starred).sort((b, I) => b.label.localeCompare(I.label)), p = t.filter((b) => !b.starred).sort((b, I) => {
      const y = e.includes(b.value), F = e.includes(I.value);
      return y && !F ? -1 : !y && F ? 1 : b.label.localeCompare(I.label);
    });
    return [...c, ...p];
  }, [t, e, g]), E = () => {
    a(t.map((c) => c.value));
  }, V = () => {
    a([]);
  }, C = u ?? j;
  return /* @__PURE__ */ s("div", { id: S, className: v, children: /* @__PURE__ */ h(_t, { open: C, onOpenChange: f ?? M, children: [
    /* @__PURE__ */ s(wt, { asChild: !0, children: /* @__PURE__ */ h(
      O,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": C,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: N,
        children: [
          /* @__PURE__ */ h("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            m && /* @__PURE__ */ s("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ s("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: m }) }),
            /* @__PURE__ */ s(
              "span",
              {
                className: w(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: D()
              }
            )
          ] }),
          /* @__PURE__ */ s(Gt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ s(Ut, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ h(Lt, { children: [
      /* @__PURE__ */ s(Ot, { placeholder: `Search ${r.toLowerCase()}...` }),
      o && /* @__PURE__ */ h("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ s(O, { variant: "ghost", size: "sm", onClick: E, children: n }),
        /* @__PURE__ */ s(O, { variant: "ghost", size: "sm", onClick: V, children: i })
      ] }),
      /* @__PURE__ */ h(Mt, { children: [
        /* @__PURE__ */ s(Pt, { children: l }),
        /* @__PURE__ */ s(Bt, { children: T.map((c) => /* @__PURE__ */ h(
          jt,
          {
            value: c.label,
            onSelect: _,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ s("div", { className: "w-4", children: /* @__PURE__ */ s(
                zt,
                {
                  className: w(
                    "tw:h-4 tw:w-4",
                    e.includes(c.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              c.starred && /* @__PURE__ */ s(se, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ s("div", { className: "tw:flex-grow", children: c.label }),
              c.secondaryLabel && /* @__PURE__ */ s("div", { className: "tw:text-end tw:text-muted-foreground", children: c.secondaryLabel })
            ]
          },
          c.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Dr({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
function Ar({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: w("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function Ye() {
  const [t, e] = $(!1), a = pt(null), r = H(() => {
    const n = a.current;
    n && n.scrollWidth > n.clientWidth && e(!0);
  }, []), o = H(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function Qe(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Y(a.projectId), o = e.get(r), n = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(n) : e.set(r, [n]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function kt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function lt(t) {
  const e = Qe(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((n) => {
      const i = e.get(Y(n.id)) ?? [];
      return {
        rowKey: n.id,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: i.map((l) => l.scrollGroupId),
        isSelected: o === n.id,
        isMuted: i.length === 0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName,
        type: n.type,
        typeName: n.typeName,
        lastUsedAt: n.lastUsedAt
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
    const n = e.get(Y(o.id));
    if (!n || n.length === 0) {
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
        isSelected: kt(a, o.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName,
        type: o.type,
        typeName: o.typeName,
        lastUsedAt: o.lastUsedAt
      });
      return;
    }
    n.forEach((i) => {
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
        isSelected: kt(a, o.id, i.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName,
        type: o.type,
        typeName: o.typeName,
        lastUsedAt: o.lastUsedAt
      });
    });
  }), a.forEach((o) => {
    if (o.scrollGroupId === void 0 || r.some((i) => i.projectId === o.projectId && i.scrollGroupId === o.scrollGroupId))
      return;
    const n = t.projects.find((i) => i.id === o.projectId);
    n && r.push({
      rowKey: `closed:${n.id}:${o.scrollGroupId}`,
      projectId: n.id,
      shortName: n.shortName,
      fullName: n.fullName,
      language: n.language,
      languageCode: n.languageCode,
      scrollGroupId: o.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: n.isDisabled === !0,
      disabledReason: n.disabledReason,
      versificationId: n.versificationId,
      versificationName: n.versificationName,
      type: n.type,
      typeName: n.typeName,
      lastUsedAt: n.lastUsedAt
    });
  }), r;
}
function Ct(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function P(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function St(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(P) }];
  const a = t.filter(Ct).sort(P), r = t.filter((n) => !Ct(n)).sort(P);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function ta(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((l) => {
    const d = l.versificationId;
    if (d === void 0 || d === "") {
      o.push(l);
      return;
    }
    const u = l.versificationName ?? d, f = r.get(d);
    f ? (f.rows.push(l), !f.label && l.versificationName && (f.label = l.versificationName)) : r.set(d, { label: u, rows: [l] });
  });
  const n = [...r.entries()].map(([l, { label: d, rows: u }]) => ({
    id: l,
    label: d,
    rows: [...u].sort(P)
  }));
  n.sort((l, d) => l.id === e ? -1 : d.id === e ? 1 : l.label.localeCompare(d.label, void 0, { sensitivity: "base" }));
  const i = n.map(({ id: l, label: d, rows: u }) => ({
    kind: "versification",
    rows: u,
    label: d,
    isPriority: l === e
  }));
  return o.length > 0 && i.push({
    kind: "versification",
    rows: [...o].sort(P),
    label: a,
    isPriority: !1
  }), i;
}
function ea(t, e) {
  const a = /* @__PURE__ */ new Map(), r = [];
  t.forEach((i) => {
    const l = i.language;
    if (!l) {
      r.push(i);
      return;
    }
    const d = a.get(l);
    d ? d.push(i) : a.set(l, [i]);
  });
  const o = [...a.entries()].map(([i, l]) => ({
    label: i,
    rows: [...l].sort(P)
  }));
  o.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const n = o.map(({ label: i, rows: l }) => ({
    kind: "language",
    rows: l,
    label: i
  }));
  return r.length > 0 && n.push({
    kind: "language",
    rows: [...r].sort(P),
    label: e
  }), n;
}
function aa(t, e) {
  const a = /* @__PURE__ */ new Map(), r = [];
  t.forEach((i) => {
    const l = i.type;
    if (!l) {
      r.push(i);
      return;
    }
    const d = i.typeName ?? l, u = a.get(l);
    u ? (u.rows.push(i), u.label === l && i.typeName && (u.label = i.typeName)) : a.set(l, { label: d, rows: [i] });
  });
  const o = [...a.values()].map(({ label: i, rows: l }) => ({
    label: i,
    rows: [...l].sort(P)
  }));
  o.sort((i, l) => i.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const n = o.map(({ label: i, rows: l }) => ({
    kind: "type",
    rows: l,
    label: i
  }));
  return r.length > 0 && n.push({
    kind: "type",
    rows: [...r].sort(P),
    label: e
  }), n;
}
function ra(t, e, a) {
  const r = [], o = [];
  t.forEach((i) => {
    typeof i.lastUsedAt == "number" ? r.push(i) : o.push(i);
  }), r.sort((i, l) => (l.lastUsedAt ?? 0) - (i.lastUsedAt ?? 0)), o.sort(P);
  const n = [];
  return r.length > 0 && n.push({ kind: "lastUsed", rows: r, label: e }), o.length > 0 && n.push({ kind: "lastUsed", rows: o, label: a }), n;
}
const Xt = Dt + 50, oa = {
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
function na(t) {
  return { ...oa, ...t };
}
function tt(t) {
  return Oe[ee(t)] ?? String(t);
}
const sa = [
  "openTabs",
  "lastUsed",
  "language",
  "versification",
  "type"
], ia = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function la({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = tt(t);
  return e ? /* @__PURE__ */ s(
    rt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: ia,
      children: a
    }
  ) : /* @__PURE__ */ s(rt, { variant: "secondary", children: a });
}
function da({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: n }) {
  const {
    ref: i,
    open: l,
    onPointerEnter: d,
    onPointerLeave: u
  } = Ye(), [f, N] = $(!1), g = !!(t.language || t.languageCode), m = g || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, v = l || f, x = H(() => {
    if (m) {
      N(!0);
      return;
    }
    d();
  }, [m, d]), S = H(() => {
    N(!1), u();
  }, [u]), j = /* @__PURE__ */ s(zt, { className: w("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ s("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((E) => /* @__PURE__ */ s(rt, { variant: "secondary", children: tt(E) }, E)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ h("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ s(
      la,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ h(
      O,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (E) => {
          E.stopPropagation(), o(t);
        },
        onMouseDown: (E) => E.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ s(le, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const _ = /* @__PURE__ */ h(
    jt,
    {
      ref: t.isSelected ? n : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: x,
      onPointerLeave: S,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ s("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: j }),
        /* @__PURE__ */ h(
          "span",
          {
            ref: i,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ s("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ s("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        M
      ]
    }
  ), D = t.scrollGroupId !== void 0 ? tt(t.scrollGroupId) : void 0, T = t.isBoundButClosed && D ? a.boundButClosedTooltip.replace("{group}", D) : void 0;
  return /* @__PURE__ */ h(Ht, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ s(Ft, { asChild: !0, children: _ }),
    /* @__PURE__ */ h(
      Jt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Xt },
        children: [
          /* @__PURE__ */ s("div", { className: "tw:font-semibold", children: t.fullName }),
          g && /* @__PURE__ */ h("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ h("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && D && /* @__PURE__ */ h("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ h("span", { className: "tw:text-muted-foreground", children: [
              " (",
              D,
              ")"
            ] })
          ] }),
          T && /* @__PURE__ */ s("div", { className: "tw:text-sm tw:italic", children: T }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ s("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function ca(t) {
  return t === "none" || t === "openTabs" || t === "lastUsed" || t === "language" || t === "versification" || t === "type";
}
function ua(t, e) {
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
function wa({
  availableGroupings: t,
  activeGrouping: e,
  onChangeGrouping: a,
  showSelectedOnly: r,
  onChangeShowSelectedOnly: o,
  strings: n
}) {
  const i = !!r;
  return /* @__PURE__ */ h(Ue, { children: [
    /* @__PURE__ */ s(He, { asChild: !0, children: /* @__PURE__ */ s(
      O,
      {
        variant: "ghost",
        size: "sm",
        className: w(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          i && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": n.filterAriaLabel,
        "aria-pressed": i,
        title: n.filterAriaLabel,
        onMouseDown: (l) => l.preventDefault(),
        children: /* @__PURE__ */ s(ie, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ h(
      Fe,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Xt },
        children: [
          t.length > 0 && /* @__PURE__ */ h(dt, { children: [
            /* @__PURE__ */ s(yt, { children: n.groupSectionLabel }),
            /* @__PURE__ */ h(
              Ve,
              {
                value: e,
                onValueChange: (l) => {
                  ca(l) && a(l);
                },
                children: [
                  /* @__PURE__ */ s(xt, { value: "none", children: n.filterGroupNone }),
                  t.map((l) => /* @__PURE__ */ s(xt, { value: l, children: ua(l, n) }, l))
                ]
              }
            )
          ] }),
          o && /* @__PURE__ */ h(dt, { children: [
            t.length > 0 && /* @__PURE__ */ s(Ke, {}),
            /* @__PURE__ */ s(yt, { children: n.filterSectionLabel }),
            /* @__PURE__ */ s(
              Je,
              {
                checked: !!r,
                onCheckedChange: o,
                onSelect: (l) => l.preventDefault(),
                children: n.filterShowSelectedOnly
              }
            )
          ] })
        ]
      }
    )
  ] });
}
function Rr(t) {
  const [e, a] = $(!1), [r, o] = $(""), n = t.availableGroupings ?? sa, [i, l] = $(() => {
    if (t.defaultGrouping) {
      if (t.defaultGrouping === "none") return "none";
      if (n.includes(t.defaultGrouping)) return t.defaultGrouping;
    }
    return t.defaultGroupByOpenTabs === !1 ? "none" : n.includes("openTabs") ? "openTabs" : "none";
  }), [d, u] = $(!1), f = pt(null), N = H((c) => {
    a(c), c || o("");
  }, []);
  oe(() => {
    if (!e) return;
    const c = window.requestAnimationFrame(() => {
      const p = f.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(c);
  }, [e]);
  const g = na(t.localizedStrings), m = q(() => t.mode === "project" ? lt({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), v = q(() => {
    const c = r.trim().toLowerCase();
    let p = m;
    return c && (p = p.filter(
      (b) => b.shortName.toLowerCase().includes(c) || b.fullName.toLowerCase().includes(c) || (b.language ?? "").toLowerCase().includes(c) || (b.languageCode ?? "").toLowerCase().includes(c)
    )), t.mode === "project-multi" && d && (p = p.filter((b) => b.isSelected)), p;
  }, [m, r, t.mode, d]), x = q(() => {
    switch (i) {
      case "openTabs":
        return St(v, !0);
      case "lastUsed":
        return ra(
          v,
          g.lastUsedRecentSectionHeading,
          g.lastUsedOtherSectionHeading
        );
      case "language":
        return ea(v, g.languageUnknownSectionHeading);
      case "versification":
        return ta(
          v,
          t.priorityVersificationId,
          g.versificationUnknownSectionHeading
        );
      case "type":
        return aa(v, g.typeUnknownSectionHeading);
      case "none":
      default:
        return St(v, !1);
    }
  }, [
    v,
    i,
    t.priorityVersificationId,
    g.versificationUnknownSectionHeading,
    g.languageUnknownSectionHeading,
    g.lastUsedRecentSectionHeading,
    g.lastUsedOtherSectionHeading,
    g.typeUnknownSectionHeading
  ]), S = q(() => {
    if (t.mode !== "project-multi") return [];
    const c = [];
    return t.projects.forEach((p) => {
      const b = t.openTabs.filter(
        (y) => Y(y.projectId) === Y(p.id)
      );
      if (b.length === 0) {
        c.push({ projectId: p.id });
        return;
      }
      const I = /* @__PURE__ */ new Set();
      b.forEach((y) => {
        I.has(y.scrollGroupId) || (I.add(y.scrollGroupId), c.push({ projectId: p.id, scrollGroupId: y.scrollGroupId }));
      });
    }), c;
  }, [t.mode, t.projects, t.openTabs]), j = (c) => {
    if (c.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
    }
  }, M = (c) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: c.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, b = (y) => y.projectId === c.projectId && y.scrollGroupId === c.scrollGroupId, I = p.some(b) ? p.filter((y) => !b(y)) : [...p, { projectId: c.projectId, scrollGroupId: c.scrollGroupId }];
        t.onChangeSelection({ pairs: I }), I.length === 0 && d && u(!1);
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
        const p = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: c.projectId, scrollGroupId: p }), t.onOpenProjectInGroup(c.projectId, p), a(!1);
      }
    }
  }, _ = () => {
    if (t.mode !== "project-multi") return;
    const c = t.selection.pairs, p = new Set(c.map((I) => `${I.projectId}:${I.scrollGroupId ?? ""}`)), b = [...c];
    S.forEach((I) => {
      const y = `${I.projectId}:${I.scrollGroupId ?? ""}`;
      p.has(y) || (p.add(y), b.push(I));
    }), t.onChangeSelection({ pairs: b });
  }, D = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), d && u(!1));
  }, T = q(() => {
    switch (t.mode) {
      case "project": {
        const c = t.projects.find((b) => b.id === t.selection.projectId);
        let p = c ? c.shortName : t.buttonPlaceholder ?? "";
        return c && t.triggerLabelFormat === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (p = `${c.shortName} - ${c.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        const p = [];
        if (c.forEach((y) => {
          const F = t.projects.find((qt) => qt.id === y.projectId);
          F && p.push({ project: F, scrollGroupId: y.scrollGroupId });
        }), p.length === 0) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        if (t.getSelectedText) {
          const y = t.getSelectedText(p);
          return { node: y, title: y };
        }
        const b = p.map(
          ({ project: y, scrollGroupId: F }) => F === void 0 ? y.shortName : `${y.shortName} (${tt(F)})`
        ).join(", ");
        if (p.length === 1) return { node: b, title: b };
        const I = p.length.toString();
        return {
          node: /* @__PURE__ */ h(dt, { children: [
            /* @__PURE__ */ s(rt, { variant: "muted", className: "tw:shrink-0", children: I }),
            /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: b })
          ] }),
          title: `${I} ${b}`
        };
      }
      case "projectScrollGroup": {
        const c = t.projects.find((I) => I.id === t.selection.projectId);
        if (!c) {
          const I = t.buttonPlaceholder ?? "";
          return { node: I, title: I };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: c.shortName, title: c.shortName };
        const b = `${c.shortName} · ${tt(p)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let E;
  t.isLoading ? E = /* @__PURE__ */ s(de, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? E = void 0 : t.mode === "project-multi" ? E = /* @__PURE__ */ s(Gt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : E = /* @__PURE__ */ s(ce, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const V = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? j : void 0, C = /* @__PURE__ */ h(
    O,
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
        /* @__PURE__ */ s("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof T.node == "string" ? /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: T.node }) : T.node }),
        E
      ]
    }
  ), R = T.title ? /* @__PURE__ */ s(Nt, { delayDuration: 400, children: /* @__PURE__ */ h(Ht, { children: [
    /* @__PURE__ */ s(Ft, { asChild: !0, children: /* @__PURE__ */ s(wt, { asChild: !0, children: C }) }),
    /* @__PURE__ */ s(Jt, { children: T.title })
  ] }) }) : /* @__PURE__ */ s(wt, { asChild: !0, children: C });
  return /* @__PURE__ */ h(_t, { open: e, onOpenChange: N, children: [
    R,
    /* @__PURE__ */ s(
      Ut,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: w("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ s(Nt, { delayDuration: 400, children: /* @__PURE__ */ h(Lt, { shouldFilter: !1, children: [
          /* @__PURE__ */ h("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ s("div", { className: "tw:flex-1", children: /* @__PURE__ */ s(
              Ot,
              {
                value: r,
                onValueChange: o,
                placeholder: g.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            (n.length > 0 || t.mode === "project-multi") && /* @__PURE__ */ s(
              wa,
              {
                availableGroupings: n,
                activeGrouping: i,
                onChangeGrouping: l,
                showSelectedOnly: t.mode === "project-multi" ? d : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? u : void 0,
                strings: g
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ h("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ s(O, { variant: "ghost", size: "sm", onClick: _, children: `${g.selectAll} (${S.length.toString()})` }),
            /* @__PURE__ */ s(O, { variant: "ghost", size: "sm", onClick: D, children: `${g.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ h(Mt, { children: [
            /* @__PURE__ */ s(Pt, { children: t.commandEmptyMessage ?? "No projects found" }),
            x.map((c, p) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ h(ne, { children: [
                /* @__PURE__ */ s(Bt, { heading: fa(c, g), children: c.rows.map((b) => /* @__PURE__ */ s(
                  da,
                  {
                    row: b,
                    mode: t.mode,
                    strings: g,
                    onClick: M,
                    onOpen: V,
                    selectedRowRef: f
                  },
                  b.rowKey
                )) }),
                p < x.length - 1 && /* @__PURE__ */ s(Ge, {})
              ] }, `${c.kind}:${c.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function fa(t, e) {
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
const ma = Tt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: n = !1, id: i }, l) => {
    const d = A();
    return /* @__PURE__ */ h(
      "div",
      {
        id: i,
        className: w("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ s(
            ue,
            {
              className: w(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": d === "rtl" },
                { "tw:left-3": d === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ s(
            Ce,
            {
              ref: l,
              className: w(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: (u) => e(u.target.value),
              disabled: n
            }
          ),
          t && /* @__PURE__ */ h(
            O,
            {
              variant: "ghost",
              size: "icon",
              className: w(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": d === "rtl" },
                { "tw:right-0": d === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ s(we, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ s("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ma.displayName = "SearchBar";
const pa = Tt(({ className: t, ...e }, a) => /* @__PURE__ */ s(fe, { size: 35, className: w("tw:animate-spin", t), ...e, ref: a }));
pa.displayName = "Spinner";
function Lr({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ s(
    ht.Group,
    {
      "data-slot": "resizable-panel-group",
      className: w(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (n) => a(Object.values(n)) : void 0,
      ...o
    }
  );
}
function at(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Or({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ s(
    ht.Panel,
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
function Mr({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    ht.Separator,
    {
      "data-slot": "resizable-handle",
      className: w(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ s("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Ir as $,
  Ja as A,
  O as B,
  jt as C,
  Aa as D,
  er as E,
  Jt as F,
  cr as G,
  ur as H,
  hr as I,
  rt as J,
  Ue as K,
  rr as L,
  He as M,
  Fe as N,
  xr as O,
  _t as P,
  fr as Q,
  or as R,
  Pe as S,
  sr as T,
  yt as U,
  Ke as V,
  Je as W,
  Sr as X,
  Tr as Y,
  Dt as Z,
  yr as _,
  Fa as a,
  Er as a0,
  kr as a1,
  pr as a2,
  Ve as a3,
  xt as a4,
  zr as a5,
  Dr as a6,
  Ta as a7,
  Ce as a8,
  Ge as a9,
  Za as aA,
  qa as aB,
  Wa as aC,
  Mr as aD,
  Or as aE,
  Lr as aF,
  pa as aG,
  Gr as aH,
  Cr as aI,
  za as aJ,
  xe as aK,
  Ne as aL,
  $e as aM,
  Be as aN,
  At as aO,
  wr as aP,
  Ye as aQ,
  ar as aR,
  ye as aS,
  Da as aT,
  _a as aa,
  Xa as ab,
  Rr as ac,
  Ga as ad,
  ma as ae,
  Ua as af,
  Ka as ag,
  Pa as ah,
  Oe as ai,
  br as aj,
  vr as ak,
  mr as al,
  Nr as am,
  Kt as an,
  nt as ao,
  st as ap,
  Se as aq,
  Te as ar,
  dr as as,
  La as at,
  ja as au,
  ke as av,
  Ie as aw,
  Ra as ax,
  gr as ay,
  Ar as az,
  wt as b,
  w as c,
  Ut as d,
  Lt as e,
  Mt as f,
  Ha as g,
  Bt as h,
  Ya as i,
  tr as j,
  Qa as k,
  Va as l,
  ze as m,
  $a as n,
  Ot as o,
  Pt as p,
  nr as q,
  A as r,
  Oa as s,
  Ma as t,
  Ba as u,
  ir as v,
  Nt as w,
  lr as x,
  Ht as y,
  Ft as z
};
//# sourceMappingURL=resizable-D4U_o2xT.js.map
