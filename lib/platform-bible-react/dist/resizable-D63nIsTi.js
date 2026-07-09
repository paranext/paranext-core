import { jsx as r, jsxs as I, Fragment as pt } from "react/jsx-runtime";
import { Slot as mt, Popover as H, Tooltip as _, Separator as kt, DropdownMenu as G } from "radix-ui";
import Y, { useRef as nt, useState as R, useCallback as O, createContext as Ct, useContext as St, useEffect as Gt, useMemo as A, Fragment as zt } from "react";
import { Filter as jt, Check as Dt, ArrowRight as Tt, Loader2 as Et, ChevronsUpDown as Rt, ChevronDown as $t } from "lucide-react";
import { getLocalizeKeyForScrollGroupId as Bt } from "platform-bible-utils";
import "@sillsdev/scripture";
import "@eten-tech-foundation/scripture-utilities";
import { cva as W } from "class-variance-authority";
import { Command as $ } from "cmdk";
import { IconSearch as Pt, IconCheck as rt, IconChevronRight as _t } from "@tabler/icons-react";
import * as at from "react-resizable-panels";
import { clsx as Mt } from "clsx";
import { extendTailwindMerge as Lt, twMerge as At } from "tailwind-merge";
const Ot = Lt({ prefix: "tw" });
function ot(t) {
  const e = [];
  let n = "", i = 0;
  for (let o = 0; o < t.length; o++) {
    const a = t[o];
    a === "[" ? i += 1 : a === "]" && (i -= 1), a === ":" && i === 0 ? (e.push(n), n = "") : n += a;
  }
  return e.push(n), e;
}
function Vt(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = ot(t), n = e.findIndex((a) => a.startsWith("-tw-"));
  if (n !== -1) {
    const a = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((d, l) => l !== n), `-${a}`].join(":")}`, original: t };
  }
  const i = e.findIndex((a) => a.startsWith("!tw-"));
  if (i !== -1) {
    const a = e[i].slice(4);
    return { normalized: `tw:${[...e.filter((d, l) => l !== i), `!${a}`].join(":")}`, original: t };
  }
  const o = e[e.length - 1];
  if (o.startsWith("tw-")) {
    const a = o.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), a].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Ft(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const n = ot(t);
  if (n[0] !== "tw") return t;
  const i = n.slice(1, -1), o = n[n.length - 1], a = ot(e), u = a.some((d) => d.startsWith("-tw-")), f = a.some((d) => d.startsWith("!tw-"));
  if (u && o.startsWith("-")) {
    const d = o.slice(1);
    return [...i, `-tw-${d}`].join(":");
  }
  if (f && o.startsWith("!")) {
    const d = o.slice(1);
    return [...i, `!tw-${d}`].join(":");
  }
  return [...i, `tw-${o}`].join(":");
}
function g(...t) {
  const e = Mt(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Ot(e);
  const n = e.split(" ").filter(Boolean), i = /* @__PURE__ */ new Map(), o = [];
  return n.forEach((d) => {
    const l = Vt(d);
    i.set(l.normalized, l.original), o.push(l.normalized);
  }), At(o.join(" ")).split(" ").filter(Boolean).map((d) => {
    const l = i.get(d);
    return l ? Ft(d, l) : d;
  }).join(" ");
}
const Ht = 600, _e = 300, gt = 400, Me = 450, Le = 500, qt = 550, ht = W(
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
function V({
  className: t,
  variant: e = "default",
  size: n = "default",
  asChild: i = !1,
  ...o
}) {
  const a = i ? mt.Root : "button";
  return /* @__PURE__ */ r(
    a,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": n,
      className: g(ht({ variant: e, size: n, className: t })),
      ...o
    }
  );
}
const Kt = "layoutDirection";
function E() {
  const t = localStorage.getItem(Kt);
  return t === "rtl" ? t : "ltr";
}
function Wt({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
const Ut = W(
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
function Zt({
  className: t,
  align: e = "inline-start",
  ...n
}) {
  return (
    // CUSTOM: Clicking anywhere in the addon area proxies focus to the associated input — a
    // deliberate UX enhancement. The a11y rules flag a non-interactive role="group" element having
    // a click handler, but removing the handler would degrade the UX. Keyboard focus on the input
    // itself is still accessible and not affected by this handler.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    /* @__PURE__ */ r(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: g(Ut({ align: e }), t),
        onClick: (i) => {
          var o, a;
          i.target instanceof HTMLElement && i.target.closest("button") || (a = (o = i.currentTarget.parentElement) == null ? void 0 : o.querySelector("input")) == null || a.focus();
        },
        ...n
      }
    )
  );
}
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
function Xt({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    $,
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
function Yt({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...n
}) {
  const i = E(), o = Y.useCallback(
    (a) => {
      if (e == null || e(a), a.defaultPrevented || a.key !== " " || a.currentTarget.value !== "") return;
      const u = a.currentTarget.closest("[cmdk-root]"), f = u == null ? void 0 : u.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      f && (a.preventDefault(), a.stopPropagation(), f.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ r("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: i, children: /* @__PURE__ */ I(Wt, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ r(
        $.Input,
        {
          "data-slot": "command-input",
          className: g(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: o,
          ...n
        }
      ),
      /* @__PURE__ */ r(Zt, { children: /* @__PURE__ */ r(Pt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Jt({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    $.List,
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
function Qt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    $.Empty,
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
function te({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    $.Group,
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
function ee({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    $.Separator,
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
function oe({
  className: t,
  children: e,
  ...n
}) {
  return /* @__PURE__ */ I(
    $.Item,
    {
      "data-slot": "command-item",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...n,
      children: [
        e,
        /* @__PURE__ */ r(rt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ae({ className: t, ...e }) {
  return /* @__PURE__ */ r(
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
function ne({ ...t }) {
  return /* @__PURE__ */ r(H.Root, { "data-slot": "popover", ...t });
}
function it({ ...t }) {
  return /* @__PURE__ */ r(H.Trigger, { "data-slot": "popover-trigger", ...t });
}
const bt = Y.createContext(null);
function Oe({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ r(bt.Provider, { value: t, children: e });
}
function re({
  className: t,
  align: e = "center",
  sideOffset: n = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: i,
  ...o
}) {
  const a = E(), u = Y.useContext(bt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ r(H.Portal, { container: u ?? void 0, children: /* @__PURE__ */ r(
      H.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: n,
        className: g(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: Ht, ...i },
        dir: a,
        ...o
      }
    ) })
  );
}
function Ve({ ...t }) {
  return /* @__PURE__ */ r(H.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Fe({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "popover-header",
      className: g("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function He({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "popover-title",
      className: g("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function qe({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "p",
    {
      "data-slot": "popover-description",
      className: g("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function st({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ r(
    _.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function vt({ ...t }) {
  return /* @__PURE__ */ r(_.Root, { "data-slot": "tooltip", ...t });
}
function xt({
  className: t,
  variant: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    _.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? g(ht({ variant: e }), t) : t,
      ...n
    }
  );
}
function It({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: n,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: i = !0,
  children: o,
  ...a
}) {
  return /* @__PURE__ */ r(_.Portal, { children: /* @__PURE__ */ I(
    _.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: qt, ...n },
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...a,
      children: [
        o,
        i && /* @__PURE__ */ r(_.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function Ke({
  className: t,
  orientation: e = "horizontal",
  decorative: n = !0,
  ...i
}) {
  return /* @__PURE__ */ r(
    kt.Root,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: e,
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...i
    }
  );
}
const ae = ["input", "select", "textarea", "button"], ie = ["button", "textbox"], We = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: i
}) => {
  const o = nt(null), [a, u] = R(void 0), [f, d] = R(void 0), l = O(
    (c) => {
      u(c);
      const v = t.find((S) => S.id === c);
      v && (e == null || e(v));
      const b = document.getElementById(c);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), o.current && o.current.setAttribute("aria-activedescendant", c);
    },
    [e, t]
  ), w = O(
    (c) => {
      const v = t.find((b) => b.id === c);
      v && (d((b) => b === c ? void 0 : c), n == null || n(v));
    },
    [n, t]
  ), m = (c) => {
    if (!c) return !1;
    const v = c.tagName.toLowerCase();
    if (c.isContentEditable || ae.includes(v)) return !0;
    const b = c.getAttribute("role");
    if (b && ie.includes(b)) return !0;
    const S = c.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, N = O(
    (c) => {
      var P;
      const v = c.target, b = (k) => k ? document.getElementById(k) : void 0, S = b(f), z = b(a);
      if (!!(S && v && S.contains(v) && v !== S) && m(v)) {
        if (c.key === "Escape" || c.key === "ArrowLeft" && !v.isContentEditable) {
          if (f) {
            c.preventDefault(), c.stopPropagation();
            const k = t.find((s) => s.id === f);
            k && l(k.id);
          }
          return;
        }
        if (c.key === "ArrowDown" || c.key === "ArrowUp") {
          if (!S) return;
          const k = Array.from(
            S.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (k.length === 0) return;
          const s = k.findIndex((h) => h === v);
          if (s === -1) return;
          let p;
          c.key === "ArrowDown" ? p = Math.min(s + 1, k.length - 1) : p = Math.max(s - 1, 0), p !== s && (c.preventDefault(), c.stopPropagation(), (P = k[p]) == null || P.focus());
          return;
        }
        return;
      }
      const D = t.findIndex((k) => k.id === a);
      let j = D;
      switch (c.key) {
        case "ArrowDown":
          j = Math.min(D + 1, t.length - 1), c.preventDefault();
          break;
        case "ArrowUp":
          j = Math.max(D - 1, 0), c.preventDefault();
          break;
        case "Home":
          j = 0, c.preventDefault();
          break;
        case "End":
          j = t.length - 1, c.preventDefault();
          break;
        case " ":
        case "Enter":
          a && w(a), c.preventDefault(), c.stopPropagation();
          return;
        case "ArrowRight": {
          const k = z;
          if (k) {
            const s = k.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), p = k.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), h = s ?? p;
            if (h) {
              c.preventDefault(), h.focus();
              return;
            }
          }
          break;
        }
        default:
          c.key.length === 1 && !c.metaKey && !c.ctrlKey && !c.altKey && (m(v) || (i == null || i(c.key), c.preventDefault()));
          return;
      }
      const B = t[j];
      B && l(B.id);
    },
    [t, l, a, f, w, i]
  );
  return {
    listboxRef: o,
    activeId: a,
    selectedId: f,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: N,
    /** Focus an option by its ID */
    focusOption: l
  };
}, se = W(
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
function X({ className: t, variant: e = "default", asChild: n = !1, ...i }) {
  const o = n ? mt.Root : "span";
  return /* @__PURE__ */ r(
    o,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: g(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        se({ variant: e }),
        t
      ),
      ...i
    }
  );
}
const yt = Ct(void 0);
function J() {
  const t = St(yt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Q = W("", {
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
function de({ variant: t = "default", ...e }) {
  const n = E(), i = Y.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(yt.Provider, { value: i, children: /* @__PURE__ */ r(G.Root, { "data-slot": "dropdown-menu", dir: n, ...e }) });
}
function Ue({
  ...t
}) {
  return /* @__PURE__ */ r(G.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function le({
  ...t
}) {
  return /* @__PURE__ */ r(G.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function ce({
  className: t,
  align: e = "start",
  sideOffset: n = 4,
  children: i,
  ...o
}) {
  const a = E();
  return /* @__PURE__ */ r(G.Portal, { children: /* @__PURE__ */ r(
    G.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: n,
      align: e,
      className: g(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: a, children: i })
    }
  ) });
}
function Ze({ ...t }) {
  return /* @__PURE__ */ r(G.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Xe({
  className: t,
  inset: e,
  variant: n = "default",
  ...i
}) {
  const o = E(), a = J();
  return /* @__PURE__ */ r(
    G.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": n,
      className: g(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Q({ variant: a.variant })
      ),
      dir: o,
      ...i
    }
  );
}
function dt({
  className: t,
  children: e,
  checked: n,
  inset: i,
  ...o
}) {
  const a = E(), u = J();
  return /* @__PURE__ */ I(
    G.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": i,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Q({ variant: u.variant })
      ),
      checked: n,
      dir: a,
      ...o,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(rt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ye({
  ...t
}) {
  return /* @__PURE__ */ r(G.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function Je({
  className: t,
  children: e,
  inset: n,
  ...i
}) {
  const o = E(), a = J();
  return /* @__PURE__ */ I(
    G.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": n,
      className: g(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Q({ variant: a.variant })
      ),
      dir: o,
      ...i,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ r(G.ItemIndicator, { children: /* @__PURE__ */ r(rt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function lt({ className: t, inset: e, ...n }) {
  return /* @__PURE__ */ r(
    G.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: g(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...n
    }
  );
}
function ue({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    G.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: g("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Qe({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: g(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function to({ ...t }) {
  return /* @__PURE__ */ r(G.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function eo({
  className: t,
  inset: e,
  children: n,
  ...i
}) {
  const o = J();
  return /* @__PURE__ */ I(
    G.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: g(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        Q({ variant: o.variant })
      ),
      ...i,
      children: [
        n,
        /* @__PURE__ */ r(_t, { className: "tw:ms-auto" })
      ]
    }
  );
}
function oo({ className: t, children: e, ...n }) {
  const i = E();
  return /* @__PURE__ */ r(
    G.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: g(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r("div", { dir: i, children: e })
    }
  );
}
function no({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "skeleton",
      className: g("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
var T = {}, tt, ct;
function we() {
  return ct || (ct = 1, tt = () => {
    const t = "\\ud800-\\udfff", u = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", f = "\\ufe0e\\ufe0f", d = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", l = `[${t}]`, w = `[${u}]`, m = "\\ud83c[\\udffb-\\udfff]", N = `(?:${w}|${m})`, c = `[^${t}]`, v = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", S = "\\u200d", z = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", U = `[${d}]`, M = `${N}?`, D = `[${f}]?`, j = `(?:${S}(?:${[c, v, b].join("|")})${D + M})*`, B = D + M + j, k = `(?:${[`${c}${w}?`, w, v, b, l, U].join("|")})`;
    return new RegExp(`${z}|${m}(?=${m})|${k + B}`, "g");
  }), tt;
}
var ut;
function fe() {
  if (ut) return T;
  ut = 1;
  var t = T && T.__importDefault || function(d) {
    return d && d.__esModule ? d : { default: d };
  };
  Object.defineProperty(T, "__esModule", { value: !0 });
  var e = t(we());
  function n(d) {
    if (typeof d != "string")
      throw new Error("A string is expected as input");
    return d.match(e.default()) || [];
  }
  T.toArray = n;
  function i(d) {
    if (typeof d != "string")
      throw new Error("Input must be a string");
    var l = d.match(e.default());
    return l === null ? 0 : l.length;
  }
  T.length = i;
  function o(d, l, w) {
    if (l === void 0 && (l = 0), typeof d != "string")
      throw new Error("Input must be a string");
    (typeof l != "number" || l < 0) && (l = 0), typeof w == "number" && w < 0 && (w = 0);
    var m = d.match(e.default());
    return m ? m.slice(l, w).join("") : "";
  }
  T.substring = o;
  function a(d, l, w) {
    if (l === void 0 && (l = 0), typeof d != "string")
      throw new Error("Input must be a string");
    var m = i(d);
    if (typeof l != "number" && (l = parseInt(l, 10)), l >= m)
      return "";
    l < 0 && (l += m);
    var N;
    typeof w > "u" ? N = m : (typeof w != "number" && (w = parseInt(w, 10)), N = w >= 0 ? w + l : l);
    var c = d.match(e.default());
    return c ? c.slice(l, N).join("") : "";
  }
  T.substr = a;
  function u(d, l, w, m) {
    if (l === void 0 && (l = 16), w === void 0 && (w = "#"), m === void 0 && (m = "right"), typeof d != "string" || typeof l != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(m) === -1)
      throw new Error("Pad position should be either left or right");
    typeof w != "string" && (w = String(w));
    var N = i(d);
    if (N > l)
      return o(d, 0, l);
    if (N < l) {
      var c = w.repeat(l - N);
      return m === "left" ? c + d : d + c;
    }
    return d;
  }
  T.limit = u;
  function f(d, l, w) {
    if (w === void 0 && (w = 0), typeof d != "string")
      throw new Error("Input must be a string");
    if (d === "")
      return l === "" ? 0 : -1;
    w = Number(w), w = isNaN(w) ? 0 : w, l = String(l);
    var m = n(d);
    if (w >= m.length)
      return l === "" ? m.length : -1;
    if (l === "")
      return w;
    var N = n(l), c = !1, v;
    for (v = w; v < m.length; v += 1) {
      for (var b = 0; b < N.length && N[b] === m[v + b]; )
        b += 1;
      if (b === N.length && N[b - 1] === m[v + b - 1]) {
        c = !0;
        break;
      }
    }
    return c ? v : -1;
  }
  return T.indexOf = f, T;
}
fe();
function y(t) {
  return `%scrollGroup_${t}%`;
}
const pe = {
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
function q(t) {
  return t.toUpperCase();
}
function me(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const i = q(n.projectId), o = e.get(i), a = {
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: n.scrollGroupScrRefLabel
    };
    o ? o.some((u) => u.scrollGroupId === n.scrollGroupId) || o.push(a) : e.set(i, [a]);
  }), e.forEach((n) => n.sort((i, o) => i.scrollGroupId - o.scrollGroupId)), e;
}
function wt(t, e, n) {
  return t.some((i) => i.projectId === e && i.scrollGroupId === n);
}
function et(t) {
  const e = me(t.openTabs);
  if (t.mode === "project") {
    const o = t.selection.projectId;
    return t.projects.map((a) => {
      const u = e.get(q(a.id)) ?? [];
      return {
        rowKey: a.id,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        language: a.language,
        languageCode: a.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: u.map((f) => f.scrollGroupId),
        isSelected: o === a.id,
        isMuted: u.length === 0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        versificationId: a.versificationId,
        versificationName: a.versificationName
      };
    });
  }
  let n = [];
  t.mode === "project-multi" ? n = t.selection.pairs : t.selection.projectId !== void 0 && (n = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const i = [];
  return t.projects.forEach((o) => {
    const a = e.get(q(o.id));
    if (!a || a.length === 0) {
      i.push({
        rowKey: `project:${o.id}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: wt(n, o.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
      });
      return;
    }
    a.forEach((u) => {
      i.push({
        rowKey: `tab:${o.id}:${u.scrollGroupId}`,
        projectId: o.id,
        shortName: o.shortName,
        fullName: o.fullName,
        language: o.language,
        languageCode: o.languageCode,
        scrollGroupId: u.scrollGroupId,
        scrollGroupScrRefLabel: u.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: wt(n, o.id, u.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: o.isDisabled === !0,
        disabledReason: o.disabledReason,
        versificationId: o.versificationId,
        versificationName: o.versificationName
      });
    });
  }), n.forEach((o) => {
    if (o.scrollGroupId === void 0 || i.some((u) => u.projectId === o.projectId && u.scrollGroupId === o.scrollGroupId))
      return;
    const a = t.projects.find((u) => u.id === o.projectId);
    a && i.push({
      rowKey: `closed:${a.id}:${o.scrollGroupId}`,
      projectId: a.id,
      shortName: a.shortName,
      fullName: a.fullName,
      language: a.language,
      languageCode: a.languageCode,
      scrollGroupId: o.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: a.isDisabled === !0,
      disabledReason: a.disabledReason,
      versificationId: a.versificationId,
      versificationName: a.versificationName
    });
  }), i;
}
function ft(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function F(t, e) {
  const n = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (n !== 0) return n;
  const i = t.scrollGroupId ?? Number.POSITIVE_INFINITY, o = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return i - o;
}
function ge(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(F) }];
  const n = t.filter(ft).sort(F), i = t.filter((a) => !ft(a)).sort(F);
  if (n.length === 0)
    return [{ kind: "flat", rows: i }];
  const o = [{ kind: "openTabs", rows: n }];
  return i.length > 0 && o.push({ kind: "other", rows: i }), o;
}
function he(t, e, n) {
  const i = /* @__PURE__ */ new Map(), o = [];
  t.forEach((f) => {
    const d = f.versificationId;
    if (d === void 0 || d === "") {
      o.push(f);
      return;
    }
    const l = f.versificationName ?? d, w = i.get(d);
    w ? (w.rows.push(f), !w.label && f.versificationName && (w.label = f.versificationName)) : i.set(d, { label: l, rows: [f] });
  });
  const a = [...i.entries()].map(([f, { label: d, rows: l }]) => ({
    id: f,
    label: d,
    rows: [...l].sort(F)
  }));
  a.sort((f, d) => f.id === e ? -1 : d.id === e ? 1 : f.label.localeCompare(d.label, void 0, { sensitivity: "base" }));
  const u = a.map(({ id: f, label: d, rows: l }) => ({
    kind: "versification",
    rows: l,
    label: d,
    isPriority: f === e
  }));
  return o.length > 0 && u.push({
    kind: "versification",
    rows: [...o].sort(F),
    label: n,
    isPriority: !1
  }), u;
}
const be = {
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
function ve(t) {
  return { ...be, ...t };
}
function K(t) {
  return pe[Bt(t)] ?? String(t);
}
const xe = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ie({ scrollGroupId: t, isBoundButClosed: e }) {
  const n = K(t);
  return e ? /* @__PURE__ */ r(
    X,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: xe,
      children: n
    }
  ) : /* @__PURE__ */ r(X, { variant: "secondary", children: n });
}
function ye({ row: t, mode: e, strings: n, onClick: i, onOpen: o, selectedRowRef: a }) {
  const [u, f] = R(!1), d = nt(null), l = !!(t.language || t.languageCode), w = l || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, m = O(() => {
    if (w) {
      f(!0);
      return;
    }
    const z = d.current;
    z && z.scrollWidth > z.clientWidth && f(!0);
  }, [w]), N = /* @__PURE__ */ r(Dt, { className: g("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let c;
  e === "project" ? t.openGroups.length > 0 && (c = /* @__PURE__ */ r("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((z) => /* @__PURE__ */ r(X, { variant: "secondary", children: K(z) }, z)) })) : t.scrollGroupId !== void 0 && (c = /* @__PURE__ */ I("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ r(
      Ie,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && o && /* @__PURE__ */ I(
      V,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (z) => {
          z.stopPropagation(), o(t);
        },
        onMouseDown: (z) => z.stopPropagation(),
        "aria-label": n.openButtonLabel,
        title: n.openButtonLabel,
        children: [
          /* @__PURE__ */ r(Tt, { className: "tw:h-3 tw:w-3" }),
          n.openButtonLabel
        ]
      }
    )
  ] }));
  const v = /* @__PURE__ */ I(
    oe,
    {
      ref: t.isSelected ? a : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || i(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: m,
      onPointerLeave: () => f(!1),
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ r("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: N }),
        /* @__PURE__ */ I(
          "span",
          {
            ref: d,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ r("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ r("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        c
      ]
    }
  ), b = t.scrollGroupId !== void 0 ? K(t.scrollGroupId) : void 0, S = t.isBoundButClosed && b ? n.boundButClosedTooltip.replace("{group}", b) : void 0;
  return /* @__PURE__ */ I(vt, { open: u, delayDuration: 400, children: [
    /* @__PURE__ */ r(xt, { asChild: !0, children: v }),
    /* @__PURE__ */ I(
      It,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: gt },
        children: [
          /* @__PURE__ */ r("div", { className: "tw:font-semibold", children: t.fullName }),
          l && /* @__PURE__ */ I("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ I("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && b && /* @__PURE__ */ I("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ I("span", { className: "tw:text-muted-foreground", children: [
              " (",
              b,
              ")"
            ] })
          ] }),
          S && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic", children: S }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Ne({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: n,
  onChangeShowSelectedOnly: i,
  strings: o
}) {
  const a = !!n;
  return /* @__PURE__ */ I(de, { children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ r(
      V,
      {
        variant: "ghost",
        size: "sm",
        className: g(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": o.filterAriaLabel,
        "aria-pressed": a,
        title: o.filterAriaLabel,
        onMouseDown: (u) => u.preventDefault(),
        children: /* @__PURE__ */ r(jt, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ I(ce, { align: "end", className: "tw:w-56", style: { zIndex: gt }, children: [
      /* @__PURE__ */ r(lt, { children: o.groupSectionLabel }),
      /* @__PURE__ */ r(
        dt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (u) => u.preventDefault(),
          children: o.filterGroupByOpenTabs
        }
      ),
      i && /* @__PURE__ */ I(pt, { children: [
        /* @__PURE__ */ r(ue, {}),
        /* @__PURE__ */ r(lt, { children: o.filterSectionLabel }),
        /* @__PURE__ */ r(
          dt,
          {
            checked: !!n,
            onCheckedChange: i,
            onSelect: (u) => u.preventDefault(),
            children: o.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function ro(t) {
  const [e, n] = R(!1), [i, o] = R(""), [a, u] = R(t.defaultGroupByOpenTabs ?? !0), [f, d] = R(!1), l = nt(null), w = O((s) => {
    n(s), s || o("");
  }, []);
  Gt(() => {
    if (!e) return;
    const s = window.requestAnimationFrame(() => {
      const p = l.current;
      p && p.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(s);
  }, [e]);
  const m = ve(t.localizedStrings), N = A(() => t.mode === "project" ? et({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? et({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : et({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), c = A(() => {
    const s = i.trim().toLowerCase();
    let p = N;
    return s && (p = p.filter(
      (h) => h.shortName.toLowerCase().includes(s) || h.fullName.toLowerCase().includes(s) || (h.language ?? "").toLowerCase().includes(s) || (h.languageCode ?? "").toLowerCase().includes(s)
    )), t.mode === "project-multi" && f && (p = p.filter((h) => h.isSelected)), p;
  }, [N, i, t.mode, f]), v = A(
    () => t.groupByVersification ? he(
      c,
      t.priorityVersificationId,
      m.versificationUnknownSectionHeading
    ) : ge(c, a),
    [
      c,
      a,
      t.groupByVersification,
      t.priorityVersificationId,
      m.versificationUnknownSectionHeading
    ]
  ), b = A(() => {
    if (t.mode !== "project-multi") return [];
    const s = [];
    return t.projects.forEach((p) => {
      const h = t.openTabs.filter(
        (x) => q(x.projectId) === q(p.id)
      );
      if (h.length === 0) {
        s.push({ projectId: p.id });
        return;
      }
      const C = /* @__PURE__ */ new Set();
      h.forEach((x) => {
        C.has(x.scrollGroupId) || (C.add(x.scrollGroupId), s.push({ projectId: p.id, scrollGroupId: x.scrollGroupId }));
      });
    }), s;
  }, [t.mode, t.projects, t.openTabs]), S = (s) => {
    if (s.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(s.projectId, s.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(s.projectId, s.scrollGroupId);
    }
  }, z = (s) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: s.projectId }), n(!1);
        return;
      }
      case "project-multi": {
        const p = t.selection.pairs, h = (x) => x.projectId === s.projectId && x.scrollGroupId === s.scrollGroupId, C = p.some(h) ? p.filter((x) => !h(x)) : [...p, { projectId: s.projectId, scrollGroupId: s.scrollGroupId }];
        t.onChangeSelection({ pairs: C }), C.length === 0 && f && d(!1);
        return;
      }
      case "projectScrollGroup": {
        if (s.isBoundButClosed && s.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(s.projectId, s.scrollGroupId), n(!1);
          return;
        }
        if (s.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: s.projectId,
            scrollGroupId: s.scrollGroupId
          }), n(!1);
          return;
        }
        const p = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: s.projectId, scrollGroupId: p }), t.onOpenProjectInGroup(s.projectId, p), n(!1);
      }
    }
  }, U = () => {
    if (t.mode !== "project-multi") return;
    const s = t.selection.pairs, p = new Set(s.map((C) => `${C.projectId}:${C.scrollGroupId ?? ""}`)), h = [...s];
    b.forEach((C) => {
      const x = `${C.projectId}:${C.scrollGroupId ?? ""}`;
      p.has(x) || (p.add(x), h.push(C));
    }), t.onChangeSelection({ pairs: h });
  }, M = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), f && d(!1));
  }, D = A(() => {
    switch (t.mode) {
      case "project": {
        const s = t.projects.find((h) => h.id === t.selection.projectId);
        let p = s ? s.shortName : t.buttonPlaceholder ?? "";
        return s && t.triggerLabelFormat === "shortNameAndFullName" && s.fullName && s.fullName !== s.shortName && (p = `${s.shortName} - ${s.fullName}`), { node: p, title: p };
      }
      case "project-multi": {
        const { pairs: s } = t.selection;
        if (s.length === 0) {
          const x = t.buttonPlaceholder ?? "";
          return { node: x, title: x };
        }
        const p = [];
        if (s.forEach((x) => {
          const L = t.projects.find((Nt) => Nt.id === x.projectId);
          L && p.push({ project: L, scrollGroupId: x.scrollGroupId });
        }), p.length === 0) {
          const x = t.buttonPlaceholder ?? "";
          return { node: x, title: x };
        }
        if (t.getSelectedText) {
          const x = t.getSelectedText(p);
          return { node: x, title: x };
        }
        const h = p.map(
          ({ project: x, scrollGroupId: L }) => L === void 0 ? x.shortName : `${x.shortName} (${K(L)})`
        ).join(", ");
        if (p.length === 1) return { node: h, title: h };
        const C = p.length.toString();
        return {
          node: /* @__PURE__ */ I(pt, { children: [
            /* @__PURE__ */ r(X, { variant: "muted", className: "tw:shrink-0", children: C }),
            /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:truncate", children: h })
          ] }),
          title: `${C} ${h}`
        };
      }
      case "projectScrollGroup": {
        const s = t.projects.find((C) => C.id === t.selection.projectId);
        if (!s) {
          const C = t.buttonPlaceholder ?? "";
          return { node: C, title: C };
        }
        const p = t.selection.scrollGroupId;
        if (p === void 0)
          return { node: s.shortName, title: s.shortName };
        const h = `${s.shortName} · ${K(p)}`;
        return { node: h, title: h };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let j;
  t.isLoading ? j = /* @__PURE__ */ r(Et, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? j = void 0 : t.mode === "project-multi" ? j = /* @__PURE__ */ r(Rt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : j = /* @__PURE__ */ r($t, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const B = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? S : void 0, P = /* @__PURE__ */ I(
    V,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: g(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ r("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof D.node == "string" ? /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:truncate", children: D.node }) : D.node }),
        j
      ]
    }
  ), k = D.title ? /* @__PURE__ */ r(st, { delayDuration: 400, children: /* @__PURE__ */ I(vt, { children: [
    /* @__PURE__ */ r(xt, { asChild: !0, children: /* @__PURE__ */ r(it, { asChild: !0, children: P }) }),
    /* @__PURE__ */ r(It, { children: D.title })
  ] }) }) : /* @__PURE__ */ r(it, { asChild: !0, children: P });
  return /* @__PURE__ */ I(ne, { open: e, onOpenChange: w, children: [
    k,
    /* @__PURE__ */ r(
      re,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: g("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ r(st, { delayDuration: 400, children: /* @__PURE__ */ I(Xt, { shouldFilter: !1, children: [
          /* @__PURE__ */ I("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ r("div", { className: "tw:flex-1", children: /* @__PURE__ */ r(
              Yt,
              {
                value: i,
                onValueChange: o,
                placeholder: m.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && /* @__PURE__ */ r(
              Ne,
              {
                groupByOpenTabs: a,
                onChangeGroupByOpenTabs: u,
                showSelectedOnly: t.mode === "project-multi" ? f : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? d : void 0,
                strings: m
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ I("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ r(V, { variant: "ghost", size: "sm", onClick: U, children: `${m.selectAll} (${b.length.toString()})` }),
            /* @__PURE__ */ r(V, { variant: "ghost", size: "sm", onClick: M, children: `${m.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ I(Jt, { children: [
            /* @__PURE__ */ r(Qt, { children: t.commandEmptyMessage ?? "No projects found" }),
            v.map((s, p) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ I(zt, { children: [
                /* @__PURE__ */ r(te, { heading: ke(s, m), children: s.rows.map((h) => /* @__PURE__ */ r(
                  ye,
                  {
                    row: h,
                    mode: t.mode,
                    strings: m,
                    onClick: z,
                    onOpen: B,
                    selectedRowRef: l
                  },
                  h.rowKey
                )) }),
                p < v.length - 1 && /* @__PURE__ */ r(ee, {})
              ] }, `${s.kind}:${s.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function ke(t, e) {
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
function ao({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: n,
  orientation: i,
  ...o
}) {
  return /* @__PURE__ */ r(
    at.Group,
    {
      "data-slot": "resizable-panel-group",
      className: g(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: i ?? e,
      onLayoutChange: n ? (a) => n(Object.values(a)) : void 0,
      ...o
    }
  );
}
function Z(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function io({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: n,
  collapsedSize: i,
  ...o
}) {
  return /* @__PURE__ */ r(
    at.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: Z(t),
      minSize: Z(e),
      maxSize: Z(n),
      collapsedSize: Z(i),
      ...o
    }
  );
}
function so({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    at.Separator,
    {
      "data-slot": "resizable-handle",
      className: g(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  io as $,
  ee as A,
  V as B,
  oe as C,
  Xe as D,
  Ae as E,
  Ve as F,
  ro as G,
  gt as H,
  Oe as I,
  pe as J,
  Ht as K,
  to as L,
  eo as M,
  Ue as N,
  oo as O,
  ne as P,
  yt as Q,
  J as R,
  Ke as S,
  st as T,
  Q as U,
  Qe as V,
  qe as W,
  Fe as X,
  He as Y,
  Le as Z,
  so as _,
  Me as a,
  ao as a0,
  se as a1,
  ht as a2,
  qt as a3,
  it as b,
  g as c,
  re as d,
  Xt as e,
  Jt as f,
  te as g,
  Yt as h,
  Qt as i,
  vt as j,
  xt as k,
  It as l,
  X as m,
  de as n,
  le as o,
  ce as p,
  lt as q,
  E as r,
  ue as s,
  dt as t,
  We as u,
  no as v,
  Ze as w,
  Ye as x,
  Je as y,
  _e as z
};
//# sourceMappingURL=resizable-D63nIsTi.js.map
