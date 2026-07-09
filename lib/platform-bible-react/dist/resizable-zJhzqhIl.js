import { jsx as n, jsxs as g, Fragment as kt } from "react/jsx-runtime";
import { Slot as ut, Dialog as M, Popover as W, Label as Jt, Tooltip as U, Separator as Vt, DropdownMenu as D } from "radix-ui";
import { IconX as Kt, IconSearch as Ut, IconCheck as wt, IconChevronRight as Xt } from "@tabler/icons-react";
import { Canon as $ } from "@sillsdev/scripture";
import { includes as et, Section as J, getLocalizeKeyForScrollGroupId as qt } from "platform-bible-utils";
import { cva as X } from "class-variance-authority";
import z, { useRef as ft, useState as B, useCallback as _, createContext as Wt, useContext as Zt, useMemo as K, useEffect as Yt, Fragment as Qt, forwardRef as Ct } from "react";
import { ChevronsUpDown as Et, Check as St, Star as te, Filter as ee, ArrowRight as ae, Loader2 as re, ChevronDown as oe, Search as ne, X as se, LoaderCircle as ie } from "lucide-react";
import "@eten-tech-foundation/scripture-utilities";
import { Command as V } from "cmdk";
import * as mt from "react-resizable-panels";
import { clsx as le } from "clsx";
import { extendTailwindMerge as de, twMerge as ce } from "tailwind-merge";
const ue = de({ prefix: "tw" });
function dt(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const s = t[o];
    s === "[" ? r += 1 : s === "]" && (r -= 1), s === ":" && r === 0 ? (e.push(a), a = "") : a += s;
  }
  return e.push(a), e;
}
function we(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = dt(t), a = e.findIndex((s) => s.startsWith("-tw-"));
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
function fe(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = dt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], s = dt(e), i = s.some((l) => l.startsWith("-tw-")), u = s.some((l) => l.startsWith("!tw-"));
  if (i && o.startsWith("-")) {
    const l = o.slice(1);
    return [...r, `-tw-${l}`].join(":");
  }
  if (u && o.startsWith("!")) {
    const l = o.slice(1);
    return [...r, `!tw-${l}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
function f(...t) {
  const e = le(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return ue(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((l) => {
    const d = we(l);
    r.set(d.normalized, d.original), o.push(d.normalized);
  }), ce(o.join(" ")).split(" ").filter(Boolean).map((l) => {
    const d = r.get(l);
    return d ? fe(l, d) : l;
  }).join(" ");
}
const me = 600, pa = 300, Tt = 400, pe = 450, he = 500, ge = 550, Dt = X(
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
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline"
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
  const s = r ? ut.Root : "button";
  return /* @__PURE__ */ n(
    s,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: f(Dt({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const Gt = "layoutDirection";
function O() {
  const t = localStorage.getItem(Gt);
  return t === "rtl" ? t : "ltr";
}
function ha(t) {
  localStorage.setItem(Gt, t);
}
function ga({ ...t }) {
  return /* @__PURE__ */ n(M.Root, { "data-slot": "dialog", ...t });
}
function ba({ ...t }) {
  return /* @__PURE__ */ n(M.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function be({ ...t }) {
  return /* @__PURE__ */ n(M.Portal, { "data-slot": "dialog-portal", ...t });
}
function Na({ ...t }) {
  return /* @__PURE__ */ n(M.Close, { "data-slot": "dialog-close", ...t });
}
function Ne({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    M.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: f(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: pe, ...e },
      ...a
    }
  );
}
function va({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...s
}) {
  const i = O();
  return /* @__PURE__ */ g(be, { children: [
    /* @__PURE__ */ n(Ne, { className: r }),
    /* @__PURE__ */ g(
      M.Content,
      {
        "data-slot": "dialog-content",
        className: f(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: he, ...o },
        dir: i,
        ...s,
        children: [
          e,
          a && /* @__PURE__ */ n(M.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ g(L, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(Kt, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function xa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "dialog-header",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function ya({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ g(
    "div",
    {
      "data-slot": "dialog-footer",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ n(M.Close, { asChild: !0, children: /* @__PURE__ */ n(L, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function Ia({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    M.Title,
    {
      "data-slot": "dialog-title",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function ka({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    M.Description,
    {
      "data-slot": "dialog-description",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function ve({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: f(
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
function xe({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const ye = X(
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
function Ie({
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
        className: f(ye({ align: e }), t),
        onClick: (r) => {
          var o, s;
          r.target instanceof HTMLElement && r.target.closest("button") || (s = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || s.focus();
        },
        ...a
      }
    )
  );
}
X("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function zt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    V,
    {
      "data-slot": "command",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function At({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...a
}) {
  const r = O(), o = z.useCallback(
    (s) => {
      if (e == null || e(s), s.defaultPrevented || s.key !== " " || s.currentTarget.value !== "") return;
      const i = s.currentTarget.closest("[cmdk-root]"), u = i == null ? void 0 : i.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      u && (s.preventDefault(), s.stopPropagation(), u.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: r, children: /* @__PURE__ */ g(xe, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        V.Input,
        {
          "data-slot": "command-input",
          className: f(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: o,
          ...a
        }
      ),
      /* @__PURE__ */ n(Ie, { children: /* @__PURE__ */ n(Ut, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Lt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    V.List,
    {
      "data-slot": "command-list",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
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
  return /* @__PURE__ */ n(
    V.Empty,
    {
      "data-slot": "command-empty",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function Mt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    V.Group,
    {
      "data-slot": "command-group",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function ke({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    V.Separator,
    {
      "data-slot": "command-separator",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Ot({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ g(
    V.Item,
    {
      "data-slot": "command-item",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ n(wt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ca({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "command-shortcut",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const Ea = (t, e, a, r, o) => {
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
}, Sa = (t, e, a, r, o) => {
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
function Ta(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedName) ?? $.bookIdToEnglishName(t);
}
function Da(t, e) {
  var r;
  return ((r = e == null ? void 0 : e.get(t)) == null ? void 0 : r.localizedId) ?? t.toUpperCase();
}
const Ce = $.allBookIds.filter(
  (t) => !$.isObsolete($.bookIdToNumber(t))
), Ga = Object.fromEntries(
  Ce.map((t) => [t, $.bookIdToEnglishName(t)])
);
function za(t, e, a) {
  const r = e.trim().toLowerCase();
  if (!r) return !1;
  const o = $.bookIdToEnglishName(t), s = a == null ? void 0 : a.get(t);
  return !!(et(o.toLowerCase(), r) || et(t.toLowerCase(), r) || (s ? et(s.localizedName.toLowerCase(), r) || et(s.localizedId.toLowerCase(), r) : !1));
}
function Pt({ ...t }) {
  return /* @__PURE__ */ n(W.Root, { "data-slot": "popover", ...t });
}
function ct({ ...t }) {
  return /* @__PURE__ */ n(W.Trigger, { "data-slot": "popover-trigger", ...t });
}
const jt = z.createContext(null);
function Aa({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(jt.Provider, { value: t, children: e });
}
function Bt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const s = O(), i = z.useContext(jt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(W.Portal, { container: i ?? void 0, children: /* @__PURE__ */ n(
      W.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: f(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: me, ...r },
        dir: s,
        ...o
      }
    ) })
  );
}
function La({ ...t }) {
  return /* @__PURE__ */ n(W.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Ra({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: f("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Ma({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: f("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Oa({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: f("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
var A = {}, it, ht;
function Ee() {
  return ht || (ht = 1, it = () => {
    const t = "\\ud800-\\udfff", i = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", u = "\\ufe0e\\ufe0f", l = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${t}]`, m = `[${i}]`, h = "\\ud83c[\\udffb-\\udfff]", I = `(?:${m}|${h})`, w = `[^${t}]`, v = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", x = "[\\ud800-\\udbff][\\udc00-\\udfff]", E = "\\u200d", P = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", R = `[${l}]`, j = `${I}?`, S = `[${u}]?`, T = `(?:${E}(?:${[w, v, x].join("|")})${S + j})*`, G = S + j + T, C = `(?:${[`${w}${m}?`, m, v, x, d, R].join("|")})`;
    return new RegExp(`${P}|${h}(?=${h})|${C + G}`, "g");
  }), it;
}
var gt;
function Se() {
  if (gt) return A;
  gt = 1;
  var t = A && A.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(A, "__esModule", { value: !0 });
  var e = t(Ee());
  function a(l) {
    if (typeof l != "string")
      throw new Error("A string is expected as input");
    return l.match(e.default()) || [];
  }
  A.toArray = a;
  function r(l) {
    if (typeof l != "string")
      throw new Error("Input must be a string");
    var d = l.match(e.default());
    return d === null ? 0 : d.length;
  }
  A.length = r;
  function o(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof m == "number" && m < 0 && (m = 0);
    var h = l.match(e.default());
    return h ? h.slice(d, m).join("") : "";
  }
  A.substring = o;
  function s(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    var h = r(l);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= h)
      return "";
    d < 0 && (d += h);
    var I;
    typeof m > "u" ? I = h : (typeof m != "number" && (m = parseInt(m, 10)), I = m >= 0 ? m + d : d);
    var w = l.match(e.default());
    return w ? w.slice(d, I).join("") : "";
  }
  A.substr = s;
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
      var w = m.repeat(d - I);
      return h === "left" ? w + l : l + w;
    }
    return l;
  }
  A.limit = i;
  function u(l, d, m) {
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
    var I = a(d), w = !1, v;
    for (v = m; v < h.length; v += 1) {
      for (var x = 0; x < I.length && I[x] === h[v + x]; )
        x += 1;
      if (x === I.length && I[x - 1] === h[v + x - 1]) {
        w = !0;
        break;
      }
    }
    return w ? v : -1;
  }
  return A.indexOf = u, A;
}
Se();
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
], De = (t) => {
  var e;
  return ((e = Te[t]) == null ? void 0 : e.chapters) ?? -1;
};
function k(t) {
  return `%scrollGroup_${t}%`;
}
const Ge = {
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
function pt(t, e) {
  return De($.bookIdToNumber(t));
}
function ot(t, e, a) {
  const r = $.bookIdToNumber(t);
  let o, s = a === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((i) => {
    const u = $.bookIdToNumber(i);
    (a === "next" ? u > r && u < s : u < r && u > s) && (o = i, s = u);
  }), o;
}
function Pa(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o > 1)
    return { book: r, chapterNum: o - 1, verseNum: 1 };
  const s = ot(r, e, "previous");
  if (s)
    return {
      book: s,
      chapterNum: Math.max(pt(s), 1),
      verseNum: 1
    };
}
function ja(t, e, a) {
  const { book: r, chapterNum: o } = t;
  if (e.includes(r) && o < pt(r))
    return { book: r, chapterNum: o + 1, verseNum: 1 };
  const s = ot(r, e, "next");
  if (s)
    return { book: s, chapterNum: 1, verseNum: 1 };
}
function Ba(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return s > 1 ? { book: r, chapterNum: o, verseNum: s - 1 } : s === 1 && o === 1 ? { book: r, chapterNum: 1, verseNum: 0 } : { book: r, chapterNum: o, verseNum: 0 };
  if (e === void 0) return;
  const i = ot(r, e, "previous");
  if (!i) return;
  const u = Math.max(pt(i), 1);
  return { book: i, chapterNum: u, verseNum: Math.max(1, 1) };
}
function $a(t, e, a) {
  const { book: r, chapterNum: o, verseNum: s } = t;
  if (e === void 0 || e.includes(r))
    return { book: r, chapterNum: o, verseNum: s + 1 };
  const i = ot(r, e, "next");
  if (i)
    return { book: i, chapterNum: 1, verseNum: 1 };
}
function _a(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
function Ha({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Jt.Root,
    {
      "data-slot": "label",
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function bt({
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
function $t({ ...t }) {
  return /* @__PURE__ */ n(U.Root, { "data-slot": "tooltip", ...t });
}
function _t({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    U.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? f(Dt({ variant: e }), t) : t,
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
  children: o,
  ...s
}) {
  return /* @__PURE__ */ n(U.Portal, { children: /* @__PURE__ */ g(
    U.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: ge, ...a },
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...s,
      children: [
        o,
        r && /* @__PURE__ */ n(U.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function ze({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    Vt.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: f(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
const Ae = X(
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
function Fa({
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
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        Ae({ orientation: e }),
        t
      ),
      ...a
    }
  );
}
function Ja({
  className: t,
  asChild: e = !1,
  ...a
}) {
  const r = e ? ut.Root : "div";
  return /* @__PURE__ */ n(
    r,
    {
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...a
    }
  );
}
function Va({
  className: t,
  orientation: e = "vertical",
  ...a
}) {
  return /* @__PURE__ */ n(
    ze,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...a
    }
  );
}
function Ka() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Ua() {
  return /Windows/i.test(navigator.userAgent);
}
const Le = ["input", "select", "textarea", "button"], Re = ["button", "textbox"], Xa = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = ft(null), [s, i] = B(void 0), [u, l] = B(void 0), d = _(
    (w) => {
      i(w);
      const v = t.find((E) => E.id === w);
      v && (e == null || e(v));
      const x = document.getElementById(w);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), o.current && o.current.setAttribute("aria-activedescendant", w);
    },
    [e, t]
  ), m = _(
    (w) => {
      const v = t.find((x) => x.id === w);
      v && (l((x) => x === w ? void 0 : w), a == null || a(v));
    },
    [a, t]
  ), h = (w) => {
    if (!w) return !1;
    const v = w.tagName.toLowerCase();
    if (w.isContentEditable || Le.includes(v)) return !0;
    const x = w.getAttribute("role");
    if (x && Re.includes(x)) return !0;
    const E = w.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, I = _(
    (w) => {
      var H;
      const v = w.target, x = (C) => C ? document.getElementById(C) : void 0, E = x(u), P = x(s);
      if (!!(E && v && E.contains(v) && v !== E) && h(v)) {
        if (w.key === "Escape" || w.key === "ArrowLeft" && !v.isContentEditable) {
          if (u) {
            w.preventDefault(), w.stopPropagation();
            const C = t.find((c) => c.id === u);
            C && d(C.id);
          }
          return;
        }
        if (w.key === "ArrowDown" || w.key === "ArrowUp") {
          if (!E) return;
          const C = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const c = C.findIndex((b) => b === v);
          if (c === -1) return;
          let p;
          w.key === "ArrowDown" ? p = Math.min(c + 1, C.length - 1) : p = Math.max(c - 1, 0), p !== c && (w.preventDefault(), w.stopPropagation(), (H = C[p]) == null || H.focus());
          return;
        }
        return;
      }
      const S = t.findIndex((C) => C.id === s);
      let T = S;
      switch (w.key) {
        case "ArrowDown":
          T = Math.min(S + 1, t.length - 1), w.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(S - 1, 0), w.preventDefault();
          break;
        case "Home":
          T = 0, w.preventDefault();
          break;
        case "End":
          T = t.length - 1, w.preventDefault();
          break;
        case " ":
        case "Enter":
          s && m(s), w.preventDefault(), w.stopPropagation();
          return;
        case "ArrowRight": {
          const C = P;
          if (C) {
            const c = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), p = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), b = c ?? p;
            if (b) {
              w.preventDefault(), b.focus();
              return;
            }
          }
          break;
        }
        default:
          w.key.length === 1 && !w.metaKey && !w.ctrlKey && !w.altKey && (h(v) || (r == null || r(w.key), w.preventDefault()));
          return;
      }
      const G = t[T];
      G && d(G.id);
    },
    [t, d, s, u, m, r]
  );
  return {
    listboxRef: o,
    activeId: s,
    selectedId: u,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: I,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Me = X(
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
  const o = a ? ut.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: f(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Me({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const Ft = Wt(void 0);
function nt() {
  const t = Zt(Ft);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const st = X("", {
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
function Oe({ variant: t = "default", ...e }) {
  const a = O(), r = z.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Ft.Provider, { value: r, children: /* @__PURE__ */ n(D.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function qa({
  ...t
}) {
  return /* @__PURE__ */ n(D.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Pe({
  ...t
}) {
  return /* @__PURE__ */ n(D.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function je({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const s = O();
  return /* @__PURE__ */ n(D.Portal, { children: /* @__PURE__ */ n(
    D.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: f(
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
function Wa({ ...t }) {
  return /* @__PURE__ */ n(D.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Za({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = O(), s = nt();
  return /* @__PURE__ */ n(
    D.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: f(
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
  const s = O(), i = nt();
  return /* @__PURE__ */ g(
    D.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: f(
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
            children: /* @__PURE__ */ n(D.ItemIndicator, { children: /* @__PURE__ */ n(wt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ya({
  ...t
}) {
  return /* @__PURE__ */ n(D.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Qa({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = O(), s = nt();
  return /* @__PURE__ */ g(
    D.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: f(
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
            children: /* @__PURE__ */ n(D.ItemIndicator, { children: /* @__PURE__ */ n(wt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function vt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    D.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: f(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
function Be({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    D.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: f("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function tr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: f(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function er({ ...t }) {
  return /* @__PURE__ */ n(D.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function ar({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = nt();
  return /* @__PURE__ */ g(
    D.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: f(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        st({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(Xt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function rr({ className: t, children: e, ...a }) {
  const r = O();
  return /* @__PURE__ */ n(
    D.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: f(
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
function or({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: f("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
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
function $e(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Z(t, e) {
  const a = e ? `${xt}, ${e}` : xt;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && $e(r)
  );
}
function nr({
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
    const u = () => {
      requestAnimationFrame(() => {
        Z(i, '[tabindex]:not([tabindex="-1"])').forEach((m) => {
          m.setAttribute("tabindex", "-1");
        });
      });
    };
    u();
    const l = new MutationObserver(() => {
      u();
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
    const { current: u } = o;
    if (u) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Z(u)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === u && i.preventDefault();
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
        className: f("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: o,
            onKeyDown: s,
            className: f(
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
function sr({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: f(
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
function ir({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: f("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function lr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: f(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function _e(t) {
  z.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? Z(t.current) : [], s = o.indexOf(document.activeElement), i = r.key === "ArrowRight" ? s + 1 : s - 1;
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
function He(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Fe(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function dr({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...s
}) {
  const i = z.useRef(null);
  z.useEffect(() => {
    typeof o == "function" ? o(i.current) : o && "current" in o && (o.current = i.current);
  }, [o]), _e(i);
  const u = z.useMemo(
    () => i.current ? Z(i.current) : [],
    [i]
  ), l = z.useCallback(
    (m) => {
      const { current: h } = i;
      if (!h || !h.parentElement) return;
      const I = h.closest("table"), w = I ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Z(I).filter(
          (E) => E.tagName === "TR"
        )
      ) : [], v = w.indexOf(h), x = u.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (m.key === "ArrowDown" || m.key === "ArrowUp")
        m.preventDefault(), Fe(w, v, m.key);
      else if (m.key === "ArrowLeft" || m.key === "ArrowRight")
        m.preventDefault(), He(u, x, m.key);
      else if (m.key === "Escape") {
        m.preventDefault();
        const E = h.closest("table");
        E && E.focus();
      }
      e == null || e(m);
    },
    [i, u, e]
  ), d = z.useCallback(
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
      className: f(
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
function cr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "th",
    {
      "data-slot": "table-head",
      className: f(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function ur({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "td",
    {
      "data-slot": "table-cell",
      className: f(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function wr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: f("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function fr({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: u = "No entries found",
  customSelectedText: l,
  isOpen: d = void 0,
  onOpenChange: m = void 0,
  isDisabled: h = !1,
  sortSelected: I = !1,
  icon: w = void 0,
  className: v = void 0,
  variant: x = "ghost",
  id: E
}) {
  const [P, R] = B(!1), j = _(
    (p) => {
      var y;
      const b = (y = t.find((N) => N.label === p)) == null ? void 0 : y.value;
      b && a(
        e.includes(b) ? e.filter((N) => N !== b) : [...e, b]
      );
    },
    [t, e, a]
  ), S = () => l || r, T = K(() => {
    if (!I) return t;
    const p = t.filter((y) => y.starred).sort((y, N) => y.label.localeCompare(N.label)), b = t.filter((y) => !y.starred).sort((y, N) => {
      const F = e.includes(y.value), tt = e.includes(N.value);
      return F && !tt ? -1 : !F && tt ? 1 : y.label.localeCompare(N.label);
    });
    return [...p, ...b];
  }, [t, e, I]), G = () => {
    a(t.map((p) => p.value));
  }, H = () => {
    a([]);
  }, C = d ?? P;
  return /* @__PURE__ */ n("div", { id: E, className: v, children: /* @__PURE__ */ g(Pt, { open: C, onOpenChange: m ?? R, children: [
    /* @__PURE__ */ n(ct, { asChild: !0, children: /* @__PURE__ */ g(
      L,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": C,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: h,
        children: [
          /* @__PURE__ */ g("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            w && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: w }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: f(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: S()
              }
            )
          ] }),
          /* @__PURE__ */ n(Et, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Bt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ g(zt, { children: [
      /* @__PURE__ */ n(At, { placeholder: `Search ${r.toLowerCase()}...` }),
      o && /* @__PURE__ */ g("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: G, children: s }),
        /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: H, children: i })
      ] }),
      /* @__PURE__ */ g(Lt, { children: [
        /* @__PURE__ */ n(Rt, { children: u }),
        /* @__PURE__ */ n(Mt, { children: T.map((p) => /* @__PURE__ */ g(
          Ot,
          {
            value: p.label,
            onSelect: j,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                St,
                {
                  className: f(
                    "tw:h-4 tw:w-4",
                    e.includes(p.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              p.starred && /* @__PURE__ */ n(te, { className: "tw:h-4 tw:w-4" }),
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
function mr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd",
      className: f(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function pr({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: f("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function Je() {
  const [t, e] = B(!1), a = ft(null), r = _(() => {
    const s = a.current;
    s && s.scrollWidth > s.clientWidth && e(!0);
  }, []), o = _(() => e(!1), []);
  return { ref: a, open: t, onPointerEnter: r, onPointerLeave: o };
}
function Y(t) {
  return t.toUpperCase();
}
function Ve(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = Y(a.projectId), o = e.get(r), s = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((i) => i.scrollGroupId === a.scrollGroupId) || o.push(s) : e.set(r, [s]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function yt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function lt(t) {
  const e = Ve(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
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
        openGroups: i.map((u) => u.scrollGroupId),
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
    const s = e.get(Y(o.id));
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
        isSelected: yt(a, o.id, i.scrollGroupId),
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
function It(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function q(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function Ke(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(q) }];
  const a = t.filter(It).sort(q), r = t.filter((s) => !It(s)).sort(q);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function Ue(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((u) => {
    const l = u.versificationId;
    if (l === void 0 || l === "") {
      o.push(u);
      return;
    }
    const d = u.versificationName ?? l, m = r.get(l);
    m ? (m.rows.push(u), !m.label && u.versificationName && (m.label = u.versificationName)) : r.set(l, { label: d, rows: [u] });
  });
  const s = [...r.entries()].map(([u, { label: l, rows: d }]) => ({
    id: u,
    label: l,
    rows: [...d].sort(q)
  }));
  s.sort((u, l) => u.id === e ? -1 : l.id === e ? 1 : u.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const i = s.map(({ id: u, label: l, rows: d }) => ({
    kind: "versification",
    rows: d,
    label: l,
    isPriority: u === e
  }));
  return o.length > 0 && i.push({
    kind: "versification",
    rows: [...o].sort(q),
    label: a,
    isPriority: !1
  }), i;
}
const Xe = {
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
function qe(t) {
  return { ...Xe, ...t };
}
function Q(t) {
  return Ge[qt(t)] ?? String(t);
}
const We = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ze({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = Q(t);
  return e ? /* @__PURE__ */ n(
    rt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: We,
      children: a
    }
  ) : /* @__PURE__ */ n(rt, { variant: "secondary", children: a });
}
function Ye({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: s }) {
  const {
    ref: i,
    open: u,
    onPointerEnter: l,
    onPointerLeave: d
  } = Je(), [m, h] = B(!1), I = !!(t.language || t.languageCode), w = I || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, v = u || m, x = _(() => {
    if (w) {
      h(!0);
      return;
    }
    l();
  }, [w, l]), E = _(() => {
    h(!1), d();
  }, [d]), P = /* @__PURE__ */ n(St, { className: f("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let R;
  e === "project" ? t.openGroups.length > 0 && (R = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((G) => /* @__PURE__ */ n(rt, { variant: "secondary", children: Q(G) }, G)) })) : t.scrollGroupId !== void 0 && (R = /* @__PURE__ */ g("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Ze,
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
        onClick: (G) => {
          G.stopPropagation(), o(t);
        },
        onMouseDown: (G) => G.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ n(ae, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const j = /* @__PURE__ */ g(
    Ot,
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
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: P }),
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
        R
      ]
    }
  ), S = t.scrollGroupId !== void 0 ? Q(t.scrollGroupId) : void 0, T = t.isBoundButClosed && S ? a.boundButClosedTooltip.replace("{group}", S) : void 0;
  return /* @__PURE__ */ g($t, { open: v, delayDuration: 400, children: [
    /* @__PURE__ */ n(_t, { asChild: !0, children: j }),
    /* @__PURE__ */ g(
      Ht,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Tt },
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
function Qe({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: o
}) {
  const s = !!a;
  return /* @__PURE__ */ g(Oe, { children: [
    /* @__PURE__ */ n(Pe, { asChild: !0, children: /* @__PURE__ */ n(
      L,
      {
        variant: "ghost",
        size: "sm",
        className: f(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          s && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": o.filterAriaLabel,
        "aria-pressed": s,
        title: o.filterAriaLabel,
        onMouseDown: (i) => i.preventDefault(),
        children: /* @__PURE__ */ n(ee, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ g(je, { align: "end", className: "tw:w-56", style: { zIndex: Tt }, children: [
      /* @__PURE__ */ n(vt, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        Nt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (i) => i.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ g(kt, { children: [
        /* @__PURE__ */ n(Be, {}),
        /* @__PURE__ */ n(vt, { children: o.filterSectionLabel }),
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
function hr(t) {
  const [e, a] = B(!1), [r, o] = B(""), [s, i] = B(t.defaultGroupByOpenTabs ?? !0), [u, l] = B(!1), d = ft(null), m = _((c) => {
    a(c), c || o("");
  }, []);
  Yt(() => {
    if (!e) return;
    const c = window.requestAnimationFrame(() => {
      const p = d.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(c);
  }, [e]);
  const h = qe(t.localizedStrings), I = K(() => t.mode === "project" ? lt({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), w = K(() => {
    const c = r.trim().toLowerCase();
    let p = I;
    return c && (p = p.filter(
      (b) => b.shortName.toLowerCase().includes(c) || b.fullName.toLowerCase().includes(c) || (b.language ?? "").toLowerCase().includes(c) || (b.languageCode ?? "").toLowerCase().includes(c)
    )), t.mode === "project-multi" && u && (p = p.filter((b) => b.isSelected)), p;
  }, [I, r, t.mode, u]), v = K(
    () => t.groupByVersification ? Ue(
      w,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ) : Ke(w, s),
    [
      w,
      s,
      t.groupByVersification,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ]
  ), x = K(() => {
    if (t.mode !== "project-multi") return [];
    const c = [];
    return t.projects.forEach((p) => {
      const b = t.openTabs.filter(
        (N) => Y(N.projectId) === Y(p.id)
      );
      if (b.length === 0) {
        c.push({ projectId: p.id });
        return;
      }
      const y = /* @__PURE__ */ new Set();
      b.forEach((N) => {
        y.has(N.scrollGroupId) || (y.add(N.scrollGroupId), c.push({ projectId: p.id, scrollGroupId: N.scrollGroupId }));
      });
    }), c;
  }, [t.mode, t.projects, t.openTabs]), E = (c) => {
    if (c.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
    }
  }, P = (c) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: c.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, b = (N) => N.projectId === c.projectId && N.scrollGroupId === c.scrollGroupId, y = p.some(b) ? p.filter((N) => !b(N)) : [...p, { projectId: c.projectId, scrollGroupId: c.scrollGroupId }];
        t.onChangeSelection({ pairs: y }), y.length === 0 && u && l(!1);
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
  }, R = () => {
    if (t.mode !== "project-multi") return;
    const c = t.selection.pairs, p = new Set(c.map((y) => `${y.projectId}:${y.scrollGroupId ?? ""}`)), b = [...c];
    x.forEach((y) => {
      const N = `${y.projectId}:${y.scrollGroupId ?? ""}`;
      p.has(N) || (p.add(N), b.push(y));
    }), t.onChangeSelection({ pairs: b });
  }, j = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), u && l(!1));
  }, S = K(() => {
    switch (t.mode) {
      case "project": {
        const c = t.projects.find((b) => b.id === t.selection.projectId);
        let p = c ? c.shortName : t.buttonPlaceholder ?? "";
        return c && t.triggerLabelFormat === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (p = `${c.shortName} - ${c.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        const p = [];
        if (c.forEach((N) => {
          const F = t.projects.find((tt) => tt.id === N.projectId);
          F && p.push({ project: F, scrollGroupId: N.scrollGroupId });
        }), p.length === 0) {
          const N = t.buttonPlaceholder ?? "";
          return { node: N, title: N };
        }
        if (t.getSelectedText) {
          const N = t.getSelectedText(p);
          return { node: N, title: N };
        }
        const b = p.map(
          ({ project: N, scrollGroupId: F }) => F === void 0 ? N.shortName : `${N.shortName} (${Q(F)})`
        ).join(", ");
        if (p.length === 1) return { node: b, title: b };
        const y = p.length.toString();
        return {
          node: /* @__PURE__ */ g(kt, { children: [
            /* @__PURE__ */ n(rt, { variant: "muted", className: "tw:shrink-0", children: y }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: b })
          ] }),
          title: `${y} ${b}`
        };
      }
      case "projectScrollGroup": {
        const c = t.projects.find((y) => y.id === t.selection.projectId);
        if (!c) {
          const y = t.buttonPlaceholder ?? "";
          return { node: y, title: y };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: c.shortName, title: c.shortName };
        const b = `${c.shortName} · ${Q(p)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ n(re, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ n(Et, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ n(oe, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const G = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? E : void 0, H = /* @__PURE__ */ g(
    L,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: f(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof S.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: S.node }) : S.node }),
        T
      ]
    }
  ), C = S.title ? /* @__PURE__ */ n(bt, { delayDuration: 400, children: /* @__PURE__ */ g($t, { children: [
    /* @__PURE__ */ n(_t, { asChild: !0, children: /* @__PURE__ */ n(ct, { asChild: !0, children: H }) }),
    /* @__PURE__ */ n(Ht, { children: S.title })
  ] }) }) : /* @__PURE__ */ n(ct, { asChild: !0, children: H });
  return /* @__PURE__ */ g(Pt, { open: e, onOpenChange: m, children: [
    C,
    /* @__PURE__ */ n(
      Bt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: f("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(bt, { delayDuration: 400, children: /* @__PURE__ */ g(zt, { shouldFilter: !1, children: [
          /* @__PURE__ */ g("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              At,
              {
                value: r,
                onValueChange: o,
                placeholder: h.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && /* @__PURE__ */ n(
              Qe,
              {
                groupByOpenTabs: s,
                onChangeGroupByOpenTabs: i,
                showSelectedOnly: t.mode === "project-multi" ? u : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? l : void 0,
                strings: h
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ g("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: R, children: `${h.selectAll} (${x.length.toString()})` }),
            /* @__PURE__ */ n(L, { variant: "ghost", size: "sm", onClick: j, children: `${h.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ g(Lt, { children: [
            /* @__PURE__ */ n(Rt, { children: t.commandEmptyMessage ?? "No projects found" }),
            v.map((c, p) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ g(Qt, { children: [
                /* @__PURE__ */ n(Mt, { heading: ta(c, h), children: c.rows.map((b) => /* @__PURE__ */ n(
                  Ye,
                  {
                    row: b,
                    mode: t.mode,
                    strings: h,
                    onClick: P,
                    onOpen: G,
                    selectedRowRef: d
                  },
                  b.rowKey
                )) }),
                p < v.length - 1 && /* @__PURE__ */ n(ke, {})
              ] }, `${c.kind}:${c.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function ta(t, e) {
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
const ea = Ct(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: s = !1, id: i }, u) => {
    const l = O();
    return /* @__PURE__ */ g(
      "div",
      {
        id: i,
        className: f("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            ne,
            {
              className: f(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": l === "rtl" },
                { "tw:left-3": l === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            ve,
            {
              ref: u,
              className: f(
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
              className: f(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": l === "rtl" },
                { "tw:right-0": l === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ n(se, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
ea.displayName = "SearchBar";
const aa = Ct(({ className: t, ...e }, a) => /* @__PURE__ */ n(ie, { size: 35, className: f("tw:animate-spin", t), ...e, ref: a }));
aa.displayName = "Spinner";
function gr({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    mt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: f(
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
function br({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    mt.Panel,
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
function Nr({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    mt.Separator,
    {
      "data-slot": "resizable-handle",
      className: f(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Ya as $,
  Ga as A,
  L as B,
  Ot as C,
  ga as D,
  $a as E,
  Za as F,
  rt as G,
  Oe as H,
  Pe as I,
  je as J,
  or as K,
  Ha as L,
  Xa as M,
  vt as N,
  Be as O,
  Pt as P,
  Nt as Q,
  dr as R,
  ze as S,
  bt as T,
  ur as U,
  nr as V,
  sr as W,
  cr as X,
  ir as Y,
  me as Z,
  Wa as _,
  Da as a,
  Qa as a0,
  fr as a1,
  mr as a2,
  pa as a3,
  ve as a4,
  ke as a5,
  Ca as a6,
  La as a7,
  hr as a8,
  Tt as a9,
  aa as aA,
  wr as aB,
  lr as aC,
  he as aD,
  pe as aE,
  Me as aF,
  Ae as aG,
  Dt as aH,
  Ua as aI,
  Je as aJ,
  _a as aK,
  ge as aL,
  ha as aM,
  ea as aa,
  Sa as ab,
  Aa as ac,
  ya as ad,
  Ge as ae,
  er as af,
  ar as ag,
  qa as ah,
  rr as ai,
  Ft as aj,
  nt as ak,
  st as al,
  Ja as am,
  Na as an,
  ka as ao,
  Ne as ap,
  be as aq,
  ba as ar,
  tr as as,
  pr as at,
  Oa as au,
  Ra as av,
  Ma as aw,
  Nr as ax,
  br as ay,
  gr as az,
  ct as b,
  f as c,
  Bt as d,
  zt as e,
  Lt as f,
  Ta as g,
  Mt as h,
  Pa as i,
  Ba as j,
  ja as k,
  za as l,
  Ce as m,
  Ea as n,
  At as o,
  Rt as p,
  va as q,
  O as r,
  xa as s,
  Ia as t,
  Fa as u,
  $t as v,
  _t as w,
  Ht as x,
  Va as y,
  Ka as z
};
//# sourceMappingURL=resizable-zJhzqhIl.js.map
