import { jsx as n, jsxs as h, Fragment as bt } from "react/jsx-runtime";
import { Slot as vt, Dialog as A, Popover as K, Label as Pt, Tooltip as H, Separator as _t, DropdownMenu as z } from "radix-ui";
import { IconX as Ot, IconSearch as Mt, IconCheck as st, IconChevronRight as Ft } from "@tabler/icons-react";
import E, { useRef as lt, useState as _, useCallback as q, createContext as Vt, useContext as Ht, useMemo as V, useEffect as qt, Fragment as Ut, forwardRef as xt } from "react";
import { ChevronsUpDown as yt, Check as It, Star as Kt, Filter as Wt, ArrowRight as Xt, Loader2 as Zt, ChevronDown as Yt, Search as Jt, X as Qt, LoaderCircle as te } from "lucide-react";
import { getLocalizeKeyForScrollGroupId as ee } from "platform-bible-utils";
import "@sillsdev/scripture";
import "@eten-tech-foundation/scripture-utilities";
import { cva as Y } from "class-variance-authority";
import { Command as M } from "cmdk";
import * as dt from "react-resizable-panels";
import { clsx as ne } from "clsx";
import { extendTailwindMerge as ae, twMerge as oe } from "tailwind-merge";
const re = ae({ prefix: "tw" });
function rt(t) {
  const e = [];
  let a = "", r = 0;
  for (let o = 0; o < t.length; o++) {
    const i = t[o];
    i === "[" ? r += 1 : i === "]" && (r -= 1), i === ":" && r === 0 ? (e.push(a), a = "") : a += i;
  }
  return e.push(a), e;
}
function ie(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = rt(t), a = e.findIndex((i) => i.startsWith("-tw-"));
  if (a !== -1) {
    const i = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((s, d) => d !== a), `-${i}`].join(":")}`, original: t };
  }
  const r = e.findIndex((i) => i.startsWith("!tw-"));
  if (r !== -1) {
    const i = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((s, d) => d !== r), `!${i}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const i = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), i].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function se(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = rt(t);
  if (a[0] !== "tw") return t;
  const r = a.slice(1, -1), o = a[a.length - 1], i = rt(e), l = i.some((s) => s.startsWith("-tw-")), f = i.some((s) => s.startsWith("!tw-"));
  if (l && o.startsWith("-")) {
    const s = o.slice(1);
    return [...r, `-tw-${s}`].join(":");
  }
  if (f && o.startsWith("!")) {
    const s = o.slice(1);
    return [...r, `!tw-${s}`].join(":");
  }
  return [...r, `tw-${o}`].join(":");
}
function p(...t) {
  const e = ne(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return re(e);
  const a = e.split(" ").filter(Boolean), r = /* @__PURE__ */ new Map(), o = [];
  return a.forEach((s) => {
    const d = ie(s);
    r.set(d.normalized, d.original), o.push(d.normalized);
  }), oe(o.join(" ")).split(" ").filter(Boolean).map((s) => {
    const d = r.get(s);
    return d ? se(s, d) : s;
  }).join(" ");
}
const le = 600, on = 300, Nt = 400, de = 450, ce = 500, ue = 550, kt = Y(
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
function R({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: r = !1,
  ...o
}) {
  const i = r ? vt.Root : "button";
  return /* @__PURE__ */ n(
    i,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: p(kt({ variant: e, size: a, className: t })),
      ...o
    }
  );
}
const we = "layoutDirection";
function $() {
  const t = localStorage.getItem(we);
  return t === "rtl" ? t : "ltr";
}
function rn({ ...t }) {
  return /* @__PURE__ */ n(A.Root, { "data-slot": "dialog", ...t });
}
function sn({ ...t }) {
  return /* @__PURE__ */ n(A.Trigger, { "data-slot": "dialog-trigger", ...t });
}
function fe({ ...t }) {
  return /* @__PURE__ */ n(A.Portal, { "data-slot": "dialog-portal", ...t });
}
function ln({ ...t }) {
  return /* @__PURE__ */ n(A.Close, { "data-slot": "dialog-close", ...t });
}
function me({
  className: t,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    A.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: p(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        t
      ),
      style: { zIndex: de, ...e },
      ...a
    }
  );
}
function dn({
  className: t,
  children: e,
  showCloseButton: a = !0,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName: r,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style: o,
  ...i
}) {
  const l = $();
  return /* @__PURE__ */ h(fe, { children: [
    /* @__PURE__ */ n(me, { className: r }),
    /* @__PURE__ */ h(
      A.Content,
      {
        "data-slot": "dialog-content",
        className: p(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ce, ...o },
        dir: l,
        ...i,
        children: [
          e,
          a && /* @__PURE__ */ n(A.Close, { "data-slot": "dialog-close", asChild: !0, children: /* @__PURE__ */ h(R, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ n(Ot, {}),
            /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function cn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "dialog-header",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function un({
  className: t,
  showCloseButton: e = !1,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ h(
    "div",
    {
      "data-slot": "dialog-footer",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        t
      ),
      ...r,
      children: [
        a,
        e && /* @__PURE__ */ n(A.Close, { asChild: !0, children: /* @__PURE__ */ n(R, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function wn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    A.Title,
    {
      "data-slot": "dialog-title",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        t
      ),
      ...e
    }
  );
}
function fn({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    A.Description,
    {
      "data-slot": "dialog-description",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        t
      ),
      ...e
    }
  );
}
function pe({ className: t, type: e, ...a }) {
  return /* @__PURE__ */ n(
    "input",
    {
      type: e,
      "data-slot": "input",
      className: p(
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
function ge({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const he = Y(
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
function be({
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
        className: p(he({ align: e }), t),
        onClick: (r) => {
          var o, i;
          r.target instanceof HTMLElement && r.target.closest("button") || (i = (o = r.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || i.focus();
        },
        ...a
      }
    )
  );
}
Y("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Ct({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    M,
    {
      "data-slot": "command",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function St({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...a
}) {
  const r = $(), o = E.useCallback(
    (i) => {
      if (e == null || e(i), i.defaultPrevented || i.key !== " " || i.currentTarget.value !== "") return;
      const l = i.currentTarget.closest("[cmdk-root]"), f = l == null ? void 0 : l.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      f && (i.preventDefault(), i.stopPropagation(), f.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ n("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: r, children: /* @__PURE__ */ h(ge, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ n(
        M.Input,
        {
          "data-slot": "command-input",
          className: p(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: o,
          ...a
        }
      ),
      /* @__PURE__ */ n(be, { children: /* @__PURE__ */ n(Mt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Dt({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    M.List,
    {
      "data-slot": "command-list",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        t
      ),
      ...e
    }
  );
}
function zt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    M.Empty,
    {
      "data-slot": "command-empty",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function Gt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    M.Group,
    {
      "data-slot": "command-group",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function ve({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ n(
    M.Separator,
    {
      "data-slot": "command-separator",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Tt({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ h(
    M.Item,
    {
      "data-slot": "command-item",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...a,
      children: [
        e,
        /* @__PURE__ */ n(st, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function mn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "command-shortcut",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Et({ ...t }) {
  return /* @__PURE__ */ n(K.Root, { "data-slot": "popover", ...t });
}
function it({ ...t }) {
  return /* @__PURE__ */ n(K.Trigger, { "data-slot": "popover-trigger", ...t });
}
const jt = E.createContext(null);
function pn({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ n(jt.Provider, { value: t, children: e });
}
function Rt({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: r,
  ...o
}) {
  const i = $(), l = E.useContext(jt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ n(K.Portal, { container: l ?? void 0, children: /* @__PURE__ */ n(
      K.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: a,
        className: p(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: le, ...r },
        dir: i,
        ...o
      }
    ) })
  );
}
function gn({ ...t }) {
  return /* @__PURE__ */ n(K.Anchor, { "data-slot": "popover-anchor", ...t });
}
function hn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-header",
      className: p("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function bn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "popover-title",
      className: p("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function vn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "p",
    {
      "data-slot": "popover-description",
      className: p("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function xn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    Pt.Root,
    {
      "data-slot": "label",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        t
      ),
      ...e
    }
  );
}
function ct({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ n(
    H.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function At({ ...t }) {
  return /* @__PURE__ */ n(H.Root, { "data-slot": "tooltip", ...t });
}
function $t({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    H.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? p(kt({ variant: e }), t) : t,
      ...a
    }
  );
}
function Lt({
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
  ...i
}) {
  return /* @__PURE__ */ n(H.Portal, { children: /* @__PURE__ */ h(
    H.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: ue, ...a },
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...i,
      children: [
        o,
        r && /* @__PURE__ */ n(H.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function yn({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...r
}) {
  return /* @__PURE__ */ n(
    _t.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...r
    }
  );
}
const xe = ["input", "select", "textarea", "button"], ye = ["button", "textbox"], In = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: r
}) => {
  const o = lt(null), [i, l] = _(void 0), [f, s] = _(void 0), d = q(
    (u) => {
      l(u);
      const y = t.find((C) => C.id === u);
      y && (e == null || e(y));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), o.current && o.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), w = q(
    (u) => {
      const y = t.find((x) => x.id === u);
      y && (s((x) => x === u ? void 0 : u), a == null || a(y));
    },
    [a, t]
  ), g = (u) => {
    if (!u) return !1;
    const y = u.tagName.toLowerCase();
    if (u.isContentEditable || xe.includes(y)) return !0;
    const x = u.getAttribute("role");
    if (x && ye.includes(x)) return !0;
    const C = u.getAttribute("tabindex");
    return C !== void 0 && C !== "-1";
  }, N = q(
    (u) => {
      var B;
      const y = u.target, x = (S) => S ? document.getElementById(S) : void 0, C = x(f), D = x(i);
      if (!!(C && y && C.contains(y) && y !== C) && g(y)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !y.isContentEditable) {
          if (f) {
            u.preventDefault(), u.stopPropagation();
            const S = t.find((c) => c.id === f);
            S && d(S.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!C) return;
          const S = Array.from(
            C.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const c = S.findIndex((b) => b === y);
          if (c === -1) return;
          let m;
          u.key === "ArrowDown" ? m = Math.min(c + 1, S.length - 1) : m = Math.max(c - 1, 0), m !== c && (u.preventDefault(), u.stopPropagation(), (B = S[m]) == null || B.focus());
          return;
        }
        return;
      }
      const T = t.findIndex((S) => S.id === i);
      let G = T;
      switch (u.key) {
        case "ArrowDown":
          G = Math.min(T + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          G = Math.max(T - 1, 0), u.preventDefault();
          break;
        case "Home":
          G = 0, u.preventDefault();
          break;
        case "End":
          G = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          i && w(i), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const S = D;
          if (S) {
            const c = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), m = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), b = c ?? m;
            if (b) {
              u.preventDefault(), b.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (g(y) || (r == null || r(u.key), u.preventDefault()));
          return;
      }
      const L = t[G];
      L && d(L.id);
    },
    [t, d, i, f, w, r]
  );
  return {
    listboxRef: o,
    activeId: i,
    selectedId: f,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: N,
    /** Focus an option by its ID */
    focusOption: d
  };
}, Ie = Y(
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
function tt({ className: t, variant: e = "default", asChild: a = !1, ...r }) {
  const o = a ? vt.Root : "span";
  return /* @__PURE__ */ n(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: p(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        Ie({ variant: e }),
        t
      ),
      ...r
    }
  );
}
const Bt = Vt(void 0);
function et() {
  const t = Ht(Bt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const nt = Y("", {
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
function Ne({ variant: t = "default", ...e }) {
  const a = $(), r = E.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ n(Bt.Provider, { value: r, children: /* @__PURE__ */ n(z.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function Nn({
  ...t
}) {
  return /* @__PURE__ */ n(z.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ke({
  ...t
}) {
  return /* @__PURE__ */ n(z.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ce({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: r,
  ...o
}) {
  const i = $();
  return /* @__PURE__ */ n(z.Portal, { children: /* @__PURE__ */ n(
    z.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: a,
      align: e,
      className: p(
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
function kn({ ...t }) {
  return /* @__PURE__ */ n(z.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Cn({
  className: t,
  inset: e,
  variant: a = "default",
  ...r
}) {
  const o = $(), i = et();
  return /* @__PURE__ */ n(
    z.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: p(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nt({ variant: i.variant })
      ),
      dir: o,
      ...r
    }
  );
}
function ut({
  className: t,
  children: e,
  checked: a,
  inset: r,
  ...o
}) {
  const i = $(), l = et();
  return /* @__PURE__ */ h(
    z.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": r,
      className: p(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nt({ variant: l.variant })
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
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(st, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Sn({
  ...t
}) {
  return /* @__PURE__ */ n(z.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Dn({
  className: t,
  children: e,
  inset: a,
  ...r
}) {
  const o = $(), i = et();
  return /* @__PURE__ */ h(
    z.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: p(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nt({ variant: i.variant })
      ),
      dir: o,
      ...r,
      children: [
        /* @__PURE__ */ n(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ n(z.ItemIndicator, { children: /* @__PURE__ */ n(st, {}) })
          }
        ),
        e
      ]
    }
  );
}
function wt({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ n(
    z.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: p(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...a
    }
  );
}
function Se({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    z.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: p("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function zn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: p(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Gn({ ...t }) {
  return /* @__PURE__ */ n(z.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Tn({
  className: t,
  inset: e,
  children: a,
  ...r
}) {
  const o = et();
  return /* @__PURE__ */ h(
    z.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: p(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        nt({ variant: o.variant })
      ),
      ...r,
      children: [
        a,
        /* @__PURE__ */ n(Ft, { className: "tw:ms-auto" })
      ]
    }
  );
}
function En({ className: t, children: e, ...a }) {
  const r = $();
  return /* @__PURE__ */ n(
    z.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: p(
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
const ft = `
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
function De(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function W(t, e) {
  const a = e ? `${ft}, ${e}` : ft;
  return Array.from(t.querySelectorAll(a)).filter(
    (r) => !r.hasAttribute("disabled") && !r.getAttribute("aria-hidden") && De(r)
  );
}
function jn({
  className: t,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader: e,
  ref: a,
  ...r
}) {
  const o = E.useRef(null);
  E.useEffect(() => {
    typeof a == "function" ? a(o.current) : a && "current" in a && (a.current = o.current);
  }, [a]), E.useEffect(() => {
    const l = o.current;
    if (!l) return;
    const f = () => {
      requestAnimationFrame(() => {
        W(l, '[tabindex]:not([tabindex="-1"])').forEach((w) => {
          w.setAttribute("tabindex", "-1");
        });
      });
    };
    f();
    const s = new MutationObserver(() => {
      f();
    });
    return s.observe(l, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      s.disconnect();
    };
  }, []);
  const i = (l) => {
    const { current: f } = o;
    if (f) {
      if (l.key === "ArrowDown") {
        l.preventDefault(), W(f)[0].focus();
        return;
      }
      l.key === " " && document.activeElement === f && l.preventDefault();
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
        className: p("pr-twp tw:relative tw:w-full", { "tw:p-1": e }),
        children: /* @__PURE__ */ n(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: o,
            onKeyDown: i,
            className: p(
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
function Rn({
  className: t,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    "thead",
    {
      "data-slot": "table-header",
      className: p(
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
function An({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tbody",
    {
      "data-slot": "table-body",
      className: p("tw:[&_tr:last-child]:border-0", t),
      ...e
    }
  );
}
function $n({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: p(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...e
    }
  );
}
function ze(t) {
  E.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const a = (r) => {
      if (e.contains(document.activeElement)) {
        if (r.key === "ArrowRight" || r.key === "ArrowLeft") {
          r.preventDefault(), r.stopPropagation();
          const o = t.current ? W(t.current) : [], i = o.indexOf(document.activeElement), l = r.key === "ArrowRight" ? i + 1 : i - 1;
          l >= 0 && l < o.length && o[l].focus();
        }
        r.key === "Escape" && (r.preventDefault(), e.focus()), (r.key === "ArrowDown" || r.key === "ArrowUp") && r.preventDefault();
      }
    };
    return e.addEventListener("keydown", a), () => {
      e.removeEventListener("keydown", a);
    };
  }, [t]);
}
function Ge(t, e, a) {
  let r;
  return a === "ArrowLeft" && e > 0 ? r = t[e - 1] : a === "ArrowRight" && e < t.length - 1 && (r = t[e + 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Te(t, e, a) {
  let r;
  return a === "ArrowDown" && e < t.length - 1 ? r = t[e + 1] : a === "ArrowUp" && e > 0 && (r = t[e - 1]), r ? (requestAnimationFrame(() => r.focus()), !0) : !1;
}
function Ln({
  className: t,
  onKeyDown: e,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect: a,
  setFocusAlsoRunsSelect: r = !1,
  ref: o,
  ...i
}) {
  const l = E.useRef(null);
  E.useEffect(() => {
    typeof o == "function" ? o(l.current) : o && "current" in o && (o.current = l.current);
  }, [o]), ze(l);
  const f = E.useMemo(
    () => l.current ? W(l.current) : [],
    [l]
  ), s = E.useCallback(
    (w) => {
      const { current: g } = l;
      if (!g || !g.parentElement) return;
      const N = g.closest("table"), u = N ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        W(N).filter(
          (C) => C.tagName === "TR"
        )
      ) : [], y = u.indexOf(g), x = f.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (w.key === "ArrowDown" || w.key === "ArrowUp")
        w.preventDefault(), Te(u, y, w.key);
      else if (w.key === "ArrowLeft" || w.key === "ArrowRight")
        w.preventDefault(), Ge(f, x, w.key);
      else if (w.key === "Escape") {
        w.preventDefault();
        const C = g.closest("table");
        C && C.focus();
      }
      e == null || e(w);
    },
    [l, f, e]
  ), d = E.useCallback(
    (w) => {
      r && (a == null || a(w));
    },
    [r, a]
  );
  return /* @__PURE__ */ n(
    "tr",
    {
      "data-slot": "table-row",
      ref: l,
      tabIndex: -1,
      onKeyDown: s,
      onFocus: d,
      className: p(
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
function Bn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "th",
    {
      "data-slot": "table-head",
      className: p(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function Pn({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "td",
    {
      "data-slot": "table-cell",
      className: p(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        t
      ),
      ...e
    }
  );
}
function _n({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "caption",
    {
      "data-slot": "table-caption",
      className: p("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...e
    }
  );
}
function On({ className: t, ...e }) {
  return /* @__PURE__ */ n(
    "div",
    {
      "data-slot": "skeleton",
      className: p("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Mn({
  entries: t,
  selected: e,
  onChange: a,
  placeholder: r,
  hasToggleAllFeature: o = !1,
  selectAllText: i = "Select All",
  clearAllText: l = "Clear All",
  commandEmptyMessage: f = "No entries found",
  customSelectedText: s,
  isOpen: d = void 0,
  onOpenChange: w = void 0,
  isDisabled: g = !1,
  sortSelected: N = !1,
  icon: u = void 0,
  className: y = void 0,
  variant: x = "ghost",
  id: C
}) {
  const [D, F] = _(!1), O = q(
    (m) => {
      var I;
      const b = (I = t.find((v) => v.label === m)) == null ? void 0 : I.value;
      b && a(
        e.includes(b) ? e.filter((v) => v !== b) : [...e, b]
      );
    },
    [t, e, a]
  ), T = () => s || r, G = V(() => {
    if (!N) return t;
    const m = t.filter((I) => I.starred).sort((I, v) => I.label.localeCompare(v.label)), b = t.filter((I) => !I.starred).sort((I, v) => {
      const P = e.includes(I.value), J = e.includes(v.value);
      return P && !J ? -1 : !P && J ? 1 : I.label.localeCompare(v.label);
    });
    return [...m, ...b];
  }, [t, e, N]), L = () => {
    a(t.map((m) => m.value));
  }, B = () => {
    a([]);
  }, S = d ?? D;
  return /* @__PURE__ */ n("div", { id: C, className: y, children: /* @__PURE__ */ h(Et, { open: S, onOpenChange: w ?? F, children: [
    /* @__PURE__ */ n(it, { asChild: !0, children: /* @__PURE__ */ h(
      R,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": S,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: g,
        children: [
          /* @__PURE__ */ h("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            u && /* @__PURE__ */ n("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ n("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: u }) }),
            /* @__PURE__ */ n(
              "span",
              {
                className: p(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: T()
              }
            )
          ] }),
          /* @__PURE__ */ n(yt, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ n(Rt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ h(Ct, { children: [
      /* @__PURE__ */ n(St, { placeholder: `Search ${r.toLowerCase()}...` }),
      o && /* @__PURE__ */ h("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ n(R, { variant: "ghost", size: "sm", onClick: L, children: i }),
        /* @__PURE__ */ n(R, { variant: "ghost", size: "sm", onClick: B, children: l })
      ] }),
      /* @__PURE__ */ h(Dt, { children: [
        /* @__PURE__ */ n(zt, { children: f }),
        /* @__PURE__ */ n(Gt, { children: G.map((m) => /* @__PURE__ */ h(
          Tt,
          {
            value: m.label,
            onSelect: O,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ n("div", { className: "w-4", children: /* @__PURE__ */ n(
                It,
                {
                  className: p(
                    "tw:h-4 tw:w-4",
                    e.includes(m.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              m.starred && /* @__PURE__ */ n(Kt, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ n("div", { className: "tw:flex-grow", children: m.label }),
              m.secondaryLabel && /* @__PURE__ */ n("div", { className: "tw:text-end tw:text-muted-foreground", children: m.secondaryLabel })
            ]
          },
          m.label
        )) })
      ] })
    ] }) })
  ] }) });
}
var j = {}, at, mt;
function Ee() {
  return mt || (mt = 1, at = () => {
    const t = "\\ud800-\\udfff", l = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", f = "\\ufe0e\\ufe0f", s = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${t}]`, w = `[${l}]`, g = "\\ud83c[\\udffb-\\udfff]", N = `(?:${w}|${g})`, u = `[^${t}]`, y = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", x = "[\\ud800-\\udbff][\\udc00-\\udfff]", C = "\\u200d", D = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", F = `[${s}]`, O = `${N}?`, T = `[${f}]?`, G = `(?:${C}(?:${[u, y, x].join("|")})${T + O})*`, L = T + O + G, S = `(?:${[`${u}${w}?`, w, y, x, d, F].join("|")})`;
    return new RegExp(`${D}|${g}(?=${g})|${S + L}`, "g");
  }), at;
}
var pt;
function je() {
  if (pt) return j;
  pt = 1;
  var t = j && j.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(j, "__esModule", { value: !0 });
  var e = t(Ee());
  function a(s) {
    if (typeof s != "string")
      throw new Error("A string is expected as input");
    return s.match(e.default()) || [];
  }
  j.toArray = a;
  function r(s) {
    if (typeof s != "string")
      throw new Error("Input must be a string");
    var d = s.match(e.default());
    return d === null ? 0 : d.length;
  }
  j.length = r;
  function o(s, d, w) {
    if (d === void 0 && (d = 0), typeof s != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof w == "number" && w < 0 && (w = 0);
    var g = s.match(e.default());
    return g ? g.slice(d, w).join("") : "";
  }
  j.substring = o;
  function i(s, d, w) {
    if (d === void 0 && (d = 0), typeof s != "string")
      throw new Error("Input must be a string");
    var g = r(s);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= g)
      return "";
    d < 0 && (d += g);
    var N;
    typeof w > "u" ? N = g : (typeof w != "number" && (w = parseInt(w, 10)), N = w >= 0 ? w + d : d);
    var u = s.match(e.default());
    return u ? u.slice(d, N).join("") : "";
  }
  j.substr = i;
  function l(s, d, w, g) {
    if (d === void 0 && (d = 16), w === void 0 && (w = "#"), g === void 0 && (g = "right"), typeof s != "string" || typeof d != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(g) === -1)
      throw new Error("Pad position should be either left or right");
    typeof w != "string" && (w = String(w));
    var N = r(s);
    if (N > d)
      return o(s, 0, d);
    if (N < d) {
      var u = w.repeat(d - N);
      return g === "left" ? u + s : s + u;
    }
    return s;
  }
  j.limit = l;
  function f(s, d, w) {
    if (w === void 0 && (w = 0), typeof s != "string")
      throw new Error("Input must be a string");
    if (s === "")
      return d === "" ? 0 : -1;
    w = Number(w), w = isNaN(w) ? 0 : w, d = String(d);
    var g = a(s);
    if (w >= g.length)
      return d === "" ? g.length : -1;
    if (d === "")
      return w;
    var N = a(d), u = !1, y;
    for (y = w; y < g.length; y += 1) {
      for (var x = 0; x < N.length && N[x] === g[y + x]; )
        x += 1;
      if (x === N.length && N[x - 1] === g[y + x - 1]) {
        u = !0;
        break;
      }
    }
    return u ? y : -1;
  }
  return j.indexOf = f, j;
}
je();
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
function X(t) {
  return t.toUpperCase();
}
function Ae(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const r = X(a.projectId), o = e.get(r), i = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    o ? o.some((l) => l.scrollGroupId === a.scrollGroupId) || o.push(i) : e.set(r, [i]);
  }), e.forEach((a) => a.sort((r, o) => r.scrollGroupId - o.scrollGroupId)), e;
}
function gt(t, e, a) {
  return t.some((r) => r.projectId === e && r.scrollGroupId === a);
}
function ot(t) {
  const e = Ae(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((i) => {
      const l = e.get(X(i.id)) ?? [];
      return {
        rowKey: i.id,
        projectId: i.id,
        shortName: i.shortName,
        fullName: i.fullName,
        language: i.language,
        languageCode: i.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: l.map((f) => f.scrollGroupId),
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
    const i = e.get(X(o.id));
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
        isSelected: gt(a, o.id, void 0),
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
        isSelected: gt(a, o.id, l.scrollGroupId),
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
function ht(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function U(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const r = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return r - o;
}
function $e(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(U) }];
  const a = t.filter(ht).sort(U), r = t.filter((i) => !ht(i)).sort(U);
  if (a.length === 0)
    return [{ kind: "flat", rows: r }];
  const o = [{ kind: "openTabs", rows: a }];
  return r.length > 0 && o.push({ kind: "other", rows: r }), o;
}
function Le(t, e, a) {
  const r = /* @__PURE__ */ new Map(), o = [];
  t.forEach((f) => {
    const s = f.versificationId;
    if (s === void 0 || s === "") {
      o.push(f);
      return;
    }
    const d = f.versificationName ?? s, w = r.get(s);
    w ? (w.rows.push(f), !w.label && f.versificationName && (w.label = f.versificationName)) : r.set(s, { label: d, rows: [f] });
  });
  const i = [...r.entries()].map(([f, { label: s, rows: d }]) => ({
    id: f,
    label: s,
    rows: [...d].sort(U)
  }));
  i.sort((f, s) => f.id === e ? -1 : s.id === e ? 1 : f.label.localeCompare(s.label, void 0, { sensitivity: "base" }));
  const l = i.map(({ id: f, label: s, rows: d }) => ({
    kind: "versification",
    rows: d,
    label: s,
    isPriority: f === e
  }));
  return o.length > 0 && l.push({
    kind: "versification",
    rows: [...o].sort(U),
    label: a,
    isPriority: !1
  }), l;
}
const Be = {
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
function Pe(t) {
  return { ...Be, ...t };
}
function Z(t) {
  return Re[ee(t)] ?? String(t);
}
const _e = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Oe({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = Z(t);
  return e ? /* @__PURE__ */ n(
    tt,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: _e,
      children: a
    }
  ) : /* @__PURE__ */ n(tt, { variant: "secondary", children: a });
}
function Me({ row: t, mode: e, strings: a, onClick: r, onOpen: o, selectedRowRef: i }) {
  const [l, f] = _(!1), s = lt(null), d = !!(t.language || t.languageCode), w = d || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, g = q(() => {
    if (w) {
      f(!0);
      return;
    }
    const D = s.current;
    D && D.scrollWidth > D.clientWidth && f(!0);
  }, [w]), N = /* @__PURE__ */ n(It, { className: p("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let u;
  e === "project" ? t.openGroups.length > 0 && (u = /* @__PURE__ */ n("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((D) => /* @__PURE__ */ n(tt, { variant: "secondary", children: Z(D) }, D)) })) : t.scrollGroupId !== void 0 && (u = /* @__PURE__ */ h("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ n(
      Oe,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ h(
      R,
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
          /* @__PURE__ */ n(Xt, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const y = /* @__PURE__ */ h(
    Tt,
    {
      ref: t.isSelected ? i : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || r(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: g,
      onPointerLeave: () => f(!1),
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: N }),
        /* @__PURE__ */ h(
          "span",
          {
            ref: s,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ n("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        u
      ]
    }
  ), x = t.scrollGroupId !== void 0 ? Z(t.scrollGroupId) : void 0, C = t.isBoundButClosed && x ? a.boundButClosedTooltip.replace("{group}", x) : void 0;
  return /* @__PURE__ */ h(At, { open: l, delayDuration: 400, children: [
    /* @__PURE__ */ n($t, { asChild: !0, children: y }),
    /* @__PURE__ */ h(
      Lt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Nt },
        children: [
          /* @__PURE__ */ n("div", { className: "tw:font-semibold", children: t.fullName }),
          d && /* @__PURE__ */ h("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ h("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && x && /* @__PURE__ */ h("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ h("span", { className: "tw:text-muted-foreground", children: [
              " (",
              x,
              ")"
            ] })
          ] }),
          C && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic", children: C }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ n("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Fe({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: r,
  strings: o
}) {
  const i = !!a;
  return /* @__PURE__ */ h(Ne, { children: [
    /* @__PURE__ */ n(ke, { asChild: !0, children: /* @__PURE__ */ n(
      R,
      {
        variant: "ghost",
        size: "sm",
        className: p(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          i && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": o.filterAriaLabel,
        "aria-pressed": i,
        title: o.filterAriaLabel,
        onMouseDown: (l) => l.preventDefault(),
        children: /* @__PURE__ */ n(Wt, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ h(Ce, { align: "end", className: "tw:w-56", style: { zIndex: Nt }, children: [
      /* @__PURE__ */ n(wt, { children: o.groupSectionLabel }),
      /* @__PURE__ */ n(
        ut,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (l) => l.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      r && /* @__PURE__ */ h(bt, { children: [
        /* @__PURE__ */ n(Se, {}),
        /* @__PURE__ */ n(wt, { children: o.filterSectionLabel }),
        /* @__PURE__ */ n(
          ut,
          {
            checked: !!a,
            onCheckedChange: r,
            onSelect: (l) => l.preventDefault(),
            children: o.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Fn(t) {
  const [e, a] = _(!1), [r, o] = _(""), [i, l] = _(t.defaultGroupByOpenTabs ?? !0), [f, s] = _(!1), d = lt(null), w = q((c) => {
    a(c), c || o("");
  }, []);
  qt(() => {
    if (!e) return;
    const c = window.requestAnimationFrame(() => {
      const m = d.current;
      m && m.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(c);
  }, [e]);
  const g = Pe(t.localizedStrings), N = V(() => t.mode === "project" ? ot({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? ot({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : ot({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), u = V(() => {
    const c = r.trim().toLowerCase();
    let m = N;
    return c && (m = m.filter(
      (b) => b.shortName.toLowerCase().includes(c) || b.fullName.toLowerCase().includes(c) || (b.language ?? "").toLowerCase().includes(c) || (b.languageCode ?? "").toLowerCase().includes(c)
    )), t.mode === "project-multi" && f && (m = m.filter((b) => b.isSelected)), m;
  }, [N, r, t.mode, f]), y = V(
    () => t.groupByVersification ? Le(
      u,
      t.priorityVersificationId,
      g.versificationUnknownSectionHeading
    ) : $e(u, i),
    [
      u,
      i,
      t.groupByVersification,
      t.priorityVersificationId,
      g.versificationUnknownSectionHeading
    ]
  ), x = V(() => {
    if (t.mode !== "project-multi") return [];
    const c = [];
    return t.projects.forEach((m) => {
      const b = t.openTabs.filter(
        (v) => X(v.projectId) === X(m.id)
      );
      if (b.length === 0) {
        c.push({ projectId: m.id });
        return;
      }
      const I = /* @__PURE__ */ new Set();
      b.forEach((v) => {
        I.has(v.scrollGroupId) || (I.add(v.scrollGroupId), c.push({ projectId: m.id, scrollGroupId: v.scrollGroupId }));
      });
    }), c;
  }, [t.mode, t.projects, t.openTabs]), C = (c) => {
    if (c.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(c.projectId, c.scrollGroupId);
    }
  }, D = (c) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: c.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const m = t.selection.pairs, b = (v) => v.projectId === c.projectId && v.scrollGroupId === c.scrollGroupId, I = m.some(b) ? m.filter((v) => !b(v)) : [...m, { projectId: c.projectId, scrollGroupId: c.scrollGroupId }];
        t.onChangeSelection({ pairs: I }), I.length === 0 && f && s(!1);
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
        const m = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: c.projectId, scrollGroupId: m }), t.onOpenProjectInGroup(c.projectId, m), a(!1);
      }
    }
  }, F = () => {
    if (t.mode !== "project-multi") return;
    const c = t.selection.pairs, m = new Set(c.map((I) => `${I.projectId}:${I.scrollGroupId ?? ""}`)), b = [...c];
    x.forEach((I) => {
      const v = `${I.projectId}:${I.scrollGroupId ?? ""}`;
      m.has(v) || (m.add(v), b.push(I));
    }), t.onChangeSelection({ pairs: b });
  }, O = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), f && s(!1));
  }, T = V(() => {
    switch (t.mode) {
      case "project": {
        const c = t.projects.find((b) => b.id === t.selection.projectId);
        let m = c ? c.shortName : t.buttonPlaceholder ?? "";
        return c && t.triggerLabelFormat === "shortNameAndFullName" && c.fullName && c.fullName !== c.shortName && (m = `${c.shortName} - ${c.fullName}`), { node: m, title: m };
      }
      case "project-multi": {
        const { pairs: c } = t.selection;
        if (c.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        const m = [];
        if (c.forEach((v) => {
          const P = t.projects.find((J) => J.id === v.projectId);
          P && m.push({ project: P, scrollGroupId: v.scrollGroupId });
        }), m.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        if (t.getSelectedText) {
          const v = t.getSelectedText(m);
          return { node: v, title: v };
        }
        const b = m.map(
          ({ project: v, scrollGroupId: P }) => P === void 0 ? v.shortName : `${v.shortName} (${Z(P)})`
        ).join(", ");
        if (m.length === 1) return { node: b, title: b };
        const I = m.length.toString();
        return {
          node: /* @__PURE__ */ h(bt, { children: [
            /* @__PURE__ */ n(tt, { variant: "muted", className: "tw:shrink-0", children: I }),
            /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: b })
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
        const m = t.selection.scrollGroupId;
        if (m === void 0)
          return { node: c.shortName, title: c.shortName };
        const b = `${c.shortName} · ${Z(m)}`;
        return { node: b, title: b };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let G;
  t.isLoading ? G = /* @__PURE__ */ n(Zt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? G = void 0 : t.mode === "project-multi" ? G = /* @__PURE__ */ n(yt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : G = /* @__PURE__ */ n(Yt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const L = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? C : void 0, B = /* @__PURE__ */ h(
    R,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: p(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ n("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof T.node == "string" ? /* @__PURE__ */ n("span", { className: "tw:min-w-0 tw:truncate", children: T.node }) : T.node }),
        G
      ]
    }
  ), S = T.title ? /* @__PURE__ */ n(ct, { delayDuration: 400, children: /* @__PURE__ */ h(At, { children: [
    /* @__PURE__ */ n($t, { asChild: !0, children: /* @__PURE__ */ n(it, { asChild: !0, children: B }) }),
    /* @__PURE__ */ n(Lt, { children: T.title })
  ] }) }) : /* @__PURE__ */ n(it, { asChild: !0, children: B });
  return /* @__PURE__ */ h(Et, { open: e, onOpenChange: w, children: [
    S,
    /* @__PURE__ */ n(
      Rt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: p("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ n(ct, { delayDuration: 400, children: /* @__PURE__ */ h(Ct, { shouldFilter: !1, children: [
          /* @__PURE__ */ h("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ n("div", { className: "tw:flex-1", children: /* @__PURE__ */ n(
              St,
              {
                value: r,
                onValueChange: o,
                placeholder: g.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && /* @__PURE__ */ n(
              Fe,
              {
                groupByOpenTabs: i,
                onChangeGroupByOpenTabs: l,
                showSelectedOnly: t.mode === "project-multi" ? f : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? s : void 0,
                strings: g
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ h("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ n(R, { variant: "ghost", size: "sm", onClick: F, children: `${g.selectAll} (${x.length.toString()})` }),
            /* @__PURE__ */ n(R, { variant: "ghost", size: "sm", onClick: O, children: `${g.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ h(Dt, { children: [
            /* @__PURE__ */ n(zt, { children: t.commandEmptyMessage ?? "No projects found" }),
            y.map((c, m) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ h(Ut, { children: [
                /* @__PURE__ */ n(Gt, { heading: Ve(c, g), children: c.rows.map((b) => /* @__PURE__ */ n(
                  Me,
                  {
                    row: b,
                    mode: t.mode,
                    strings: g,
                    onClick: D,
                    onOpen: L,
                    selectedRowRef: d
                  },
                  b.rowKey
                )) }),
                m < y.length - 1 && /* @__PURE__ */ n(ve, {})
              ] }, `${c.kind}:${c.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function Ve(t, e) {
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
const He = xt(
  ({ value: t, onSearch: e, placeholder: a, isFullWidth: r, className: o, isDisabled: i = !1, id: l }, f) => {
    const s = $();
    return /* @__PURE__ */ h(
      "div",
      {
        id: l,
        className: p("tw:relative tw:@container/search", { "tw:w-full": r }, o),
        children: [
          /* @__PURE__ */ n(
            Jt,
            {
              className: p(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": s === "rtl" },
                { "tw:left-3": s === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ n(
            pe,
            {
              ref: f,
              className: p(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": t
                }
              ),
              placeholder: a,
              value: t,
              onChange: (d) => e(d.target.value),
              disabled: i
            }
          ),
          t && /* @__PURE__ */ h(
            R,
            {
              variant: "ghost",
              size: "icon",
              className: p(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": s === "rtl" },
                { "tw:right-0": s === "ltr" }
              ),
              onClick: () => {
                e("");
              },
              children: [
                /* @__PURE__ */ n(Qt, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ n("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
He.displayName = "SearchBar";
const qe = xt(({ className: t, ...e }, a) => /* @__PURE__ */ n(te, { size: 35, className: p("tw:animate-spin", t), ...e, ref: a }));
qe.displayName = "Spinner";
function Vn({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    dt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: p(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: r ?? e,
      onLayoutChange: a ? (i) => a(Object.values(i)) : void 0,
      ...o
    }
  );
}
function Q(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Hn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: r,
  ...o
}) {
  return /* @__PURE__ */ n(
    dt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: Q(t),
      minSize: Q(e),
      maxSize: Q(a),
      collapsedSize: Q(r),
      ...o
    }
  );
}
function qn({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ n(
    dt.Separator,
    {
      "data-slot": "resizable-handle",
      className: p(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ n("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  le as $,
  On as A,
  R as B,
  Tt as C,
  rn as D,
  jn as E,
  Rn as F,
  Bn as G,
  An as H,
  kn as I,
  Sn as J,
  Dn as K,
  xn as L,
  Mn as M,
  pe as N,
  ve as O,
  Et as P,
  mn as Q,
  gn as R,
  yn as S,
  ct as T,
  Fn as U,
  Nt as V,
  He as W,
  pn as X,
  un as Y,
  on as Z,
  Re as _,
  it as a,
  Gn as a0,
  Tn as a1,
  Nn as a2,
  En as a3,
  Bt as a4,
  et as a5,
  nt as a6,
  ln as a7,
  fn as a8,
  me as a9,
  fe as aa,
  sn as ab,
  zn as ac,
  vn as ad,
  hn as ae,
  bn as af,
  qn as ag,
  Hn as ah,
  Vn as ai,
  qe as aj,
  _n as ak,
  $n as al,
  ce as am,
  de as an,
  Ie as ao,
  kt as ap,
  ue as aq,
  Rt as b,
  p as c,
  Ct as d,
  Dt as e,
  Gt as f,
  St as g,
  zt as h,
  dn as i,
  cn as j,
  wn as k,
  At as l,
  $t as m,
  Lt as n,
  Cn as o,
  tt as p,
  Ne as q,
  $ as r,
  ke as s,
  Ce as t,
  In as u,
  wt as v,
  Se as w,
  ut as x,
  Ln as y,
  Pn as z
};
//# sourceMappingURL=resizable-iUPuej2c.js.map
