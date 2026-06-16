import { jsx as r, jsxs as N, Fragment as lt } from "react/jsx-runtime";
import { Slot as ct, Popover as O, Tooltip as _, Separator as gt, DropdownMenu as S } from "radix-ui";
import W, { useRef as tt, useState as T, useCallback as L, createContext as ht, useContext as bt, useEffect as vt, useMemo as M, Fragment as xt } from "react";
import { ChevronsUpDown as It, ChevronDown as yt, Filter as Nt, Check as kt, ArrowRight as Ct } from "lucide-react";
import { getLocalizeKeyForScrollGroupId as St } from "platform-bible-utils";
import "@sillsdev/scripture";
import "@eten-tech-foundation/scripture-utilities";
import { cva as V } from "class-variance-authority";
import { Command as R } from "cmdk";
import { IconSearch as Gt, IconCheck as et, IconChevronRight as zt } from "@tabler/icons-react";
import * as ot from "react-resizable-panels";
import { clsx as jt } from "clsx";
import { extendTailwindMerge as Dt, twMerge as Et } from "tailwind-merge";
const Tt = Dt({ prefix: "tw" });
function Q(t) {
  const e = [];
  let o = "", i = 0;
  for (let n = 0; n < t.length; n++) {
    const a = t[n];
    a === "[" ? i += 1 : a === "]" && (i -= 1), a === ":" && i === 0 ? (e.push(o), o = "") : o += a;
  }
  return e.push(o), e;
}
function Rt(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = Q(t), o = e.findIndex((a) => a.startsWith("-tw-"));
  if (o !== -1) {
    const a = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((u, s) => s !== o), `-${a}`].join(":")}`, original: t };
  }
  const i = e.findIndex((a) => a.startsWith("!tw-"));
  if (i !== -1) {
    const a = e[i].slice(4);
    return { normalized: `tw:${[...e.filter((u, s) => s !== i), `!${a}`].join(":")}`, original: t };
  }
  const n = e[e.length - 1];
  if (n.startsWith("tw-")) {
    const a = n.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), a].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function $t(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const o = Q(t);
  if (o[0] !== "tw") return t;
  const i = o.slice(1, -1), n = o[o.length - 1], a = Q(e), w = a.some((u) => u.startsWith("-tw-")), v = a.some((u) => u.startsWith("!tw-"));
  if (w && n.startsWith("-")) {
    const u = n.slice(1);
    return [...i, `-tw-${u}`].join(":");
  }
  if (v && n.startsWith("!")) {
    const u = n.slice(1);
    return [...i, `!tw-${u}`].join(":");
  }
  return [...i, `tw-${n}`].join(":");
}
function m(...t) {
  const e = jt(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Tt(e);
  const o = e.split(" ").filter(Boolean), i = /* @__PURE__ */ new Map(), n = [];
  return o.forEach((u) => {
    const s = Rt(u);
    i.set(s.normalized, s.original), n.push(s.normalized);
  }), Et(n.join(" ")).split(" ").filter(Boolean).map((u) => {
    const s = i.get(u);
    return s ? $t(u, s) : u;
  }).join(" ");
}
const _t = 250, Te = 300, ut = 400, Re = 450, $e = 500, Bt = 550, wt = V(
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
function A({
  className: t,
  variant: e = "default",
  size: o = "default",
  asChild: i = !1,
  ...n
}) {
  const a = i ? ct.Root : "button";
  return /* @__PURE__ */ r(
    a,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": o,
      className: m(wt({ variant: e, size: o, className: t })),
      ...n
    }
  );
}
const Pt = "layoutDirection";
function E() {
  const t = localStorage.getItem(Pt);
  return t === "rtl" ? t : "ltr";
}
function Mt({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const Lt = V(
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
function At({
  className: t,
  align: e = "inline-start",
  ...o
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
        className: m(Lt({ align: e }), t),
        onClick: (i) => {
          var n, a;
          i.target instanceof HTMLElement && i.target.closest("button") || (a = (n = i.currentTarget.parentElement) == null ? void 0 : n.querySelector("input")) == null || a.focus();
        },
        ...o
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
function Ot({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    R,
    {
      "data-slot": "command",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function Ft({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...o
}) {
  const i = E(), n = W.useCallback(
    (a) => {
      if (e == null || e(a), a.defaultPrevented || a.key !== " " || a.currentTarget.value !== "") return;
      const w = a.currentTarget.closest("[cmdk-root]"), v = w == null ? void 0 : w.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      v && (a.preventDefault(), a.stopPropagation(), v.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ r("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: i, children: /* @__PURE__ */ N(Mt, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ r(
        R.Input,
        {
          "data-slot": "command-input",
          className: m(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: n,
          ...o
        }
      ),
      /* @__PURE__ */ r(At, { children: /* @__PURE__ */ r(Gt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function Vt({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    R.List,
    {
      "data-slot": "command-list",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        t
      ),
      ...e
    }
  );
}
function Ht({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    R.Empty,
    {
      "data-slot": "command-empty",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function qt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    R.Group,
    {
      "data-slot": "command-group",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function Kt({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    R.Separator,
    {
      "data-slot": "command-separator",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function Wt({
  className: t,
  children: e,
  ...o
}) {
  return /* @__PURE__ */ N(
    R.Item,
    {
      "data-slot": "command-item",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...o,
      children: [
        e,
        /* @__PURE__ */ r(et, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function _e({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "command-shortcut",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
function Zt({ ...t }) {
  return /* @__PURE__ */ r(O.Root, { "data-slot": "popover", ...t });
}
function Ut({ ...t }) {
  return /* @__PURE__ */ r(O.Trigger, { "data-slot": "popover-trigger", ...t });
}
const ft = W.createContext(null);
function Be({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ r(ft.Provider, { value: t, children: e });
}
function Xt({
  className: t,
  align: e = "center",
  sideOffset: o = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: i,
  ...n
}) {
  const a = E(), w = W.useContext(ft);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ r(O.Portal, { container: w ?? void 0, children: /* @__PURE__ */ r(
      O.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: o,
        className: m(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: _t, ...i },
        dir: a,
        ...n
      }
    ) })
  );
}
function Pe({ ...t }) {
  return /* @__PURE__ */ r(O.Anchor, { "data-slot": "popover-anchor", ...t });
}
function Me({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "popover-header",
      className: m("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function Le({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "popover-title",
      className: m("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function Ae({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "p",
    {
      "data-slot": "popover-description",
      className: m("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
function Yt({
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
function Jt({ ...t }) {
  return /* @__PURE__ */ r(_.Root, { "data-slot": "tooltip", ...t });
}
function Qt({
  className: t,
  variant: e,
  ...o
}) {
  return /* @__PURE__ */ r(
    _.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? m(wt({ variant: e }), t) : t,
      ...o
    }
  );
}
function te({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: o,
  children: i,
  ...n
}) {
  return /* @__PURE__ */ r(_.Portal, { children: /* @__PURE__ */ N(
    _.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Bt, ...o },
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...n,
      children: [
        i,
        /* @__PURE__ */ r(_.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function Oe({
  className: t,
  orientation: e = "horizontal",
  decorative: o = !0,
  ...i
}) {
  return /* @__PURE__ */ r(
    gt.Root,
    {
      "data-slot": "separator",
      decorative: o,
      orientation: e,
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...i
    }
  );
}
const ee = ["input", "select", "textarea", "button"], oe = ["button", "textbox"], Fe = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: o,
  onCharacterPress: i
}) => {
  const n = tt(null), [a, w] = T(void 0), [v, u] = T(void 0), s = L(
    (d) => {
      w(d);
      const x = t.find((C) => C.id === d);
      x && (e == null || e(x));
      const b = document.getElementById(d);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), n.current && n.current.setAttribute("aria-activedescendant", d);
    },
    [e, t]
  ), f = L(
    (d) => {
      const x = t.find((b) => b.id === d);
      x && (u((b) => b === d ? void 0 : d), o == null || o(x));
    },
    [o, t]
  ), g = (d) => {
    if (!d) return !1;
    const x = d.tagName.toLowerCase();
    if (d.isContentEditable || ee.includes(x)) return !0;
    const b = d.getAttribute("role");
    if (b && oe.includes(b)) return !0;
    const C = d.getAttribute("tabindex");
    return C !== void 0 && C !== "-1";
  }, k = L(
    (d) => {
      var l;
      const x = d.target, b = (c) => c ? document.getElementById(c) : void 0, C = b(v), G = b(a);
      if (!!(C && x && C.contains(x) && x !== C) && g(x)) {
        if (d.key === "Escape" || d.key === "ArrowLeft" && !x.isContentEditable) {
          if (v) {
            d.preventDefault(), d.stopPropagation();
            const c = t.find((p) => p.id === v);
            c && s(c.id);
          }
          return;
        }
        if (d.key === "ArrowDown" || d.key === "ArrowUp") {
          if (!C) return;
          const c = Array.from(
            C.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (c.length === 0) return;
          const p = c.findIndex((h) => h === x);
          if (p === -1) return;
          let I;
          d.key === "ArrowDown" ? I = Math.min(p + 1, c.length - 1) : I = Math.max(p - 1, 0), I !== p && (d.preventDefault(), d.stopPropagation(), (l = c[I]) == null || l.focus());
          return;
        }
        return;
      }
      const j = t.findIndex((c) => c.id === a);
      let D = j;
      switch (d.key) {
        case "ArrowDown":
          D = Math.min(j + 1, t.length - 1), d.preventDefault();
          break;
        case "ArrowUp":
          D = Math.max(j - 1, 0), d.preventDefault();
          break;
        case "Home":
          D = 0, d.preventDefault();
          break;
        case "End":
          D = t.length - 1, d.preventDefault();
          break;
        case " ":
        case "Enter":
          a && f(a), d.preventDefault(), d.stopPropagation();
          return;
        case "ArrowRight": {
          const c = G;
          if (c) {
            const p = c.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), I = c.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), h = p ?? I;
            if (h) {
              d.preventDefault(), h.focus();
              return;
            }
          }
          break;
        }
        default:
          d.key.length === 1 && !d.metaKey && !d.ctrlKey && !d.altKey && (g(x) || (i == null || i(d.key), d.preventDefault()));
          return;
      }
      const $ = t[D];
      $ && s($.id);
    },
    [t, s, a, v, f, i]
  );
  return {
    listboxRef: n,
    activeId: a,
    selectedId: v,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: k,
    /** Focus an option by its ID */
    focusOption: s
  };
}, ne = V(
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
function K({ className: t, variant: e = "default", asChild: o = !1, ...i }) {
  const n = o ? ct.Root : "span";
  return /* @__PURE__ */ r(
    n,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: m(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ne({ variant: e }),
        t
      ),
      ...i
    }
  );
}
const pt = ht(void 0);
function Z() {
  const t = bt(pt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const U = V("", {
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
function re({ variant: t = "default", ...e }) {
  const o = E(), i = W.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(pt.Provider, { value: i, children: /* @__PURE__ */ r(S.Root, { "data-slot": "dropdown-menu", dir: o, ...e }) });
}
function Ve({
  ...t
}) {
  return /* @__PURE__ */ r(S.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ae({
  ...t
}) {
  return /* @__PURE__ */ r(S.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function ie({
  className: t,
  align: e = "start",
  sideOffset: o = 4,
  children: i,
  ...n
}) {
  const a = E();
  return /* @__PURE__ */ r(S.Portal, { children: /* @__PURE__ */ r(
    S.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: o,
      align: e,
      className: m(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r("div", { dir: a, children: i })
    }
  ) });
}
function He({ ...t }) {
  return /* @__PURE__ */ r(S.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function qe({
  className: t,
  inset: e,
  variant: o = "default",
  ...i
}) {
  const n = E(), a = Z();
  return /* @__PURE__ */ r(
    S.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": o,
      className: m(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        U({ variant: a.variant })
      ),
      dir: n,
      ...i
    }
  );
}
function nt({
  className: t,
  children: e,
  checked: o,
  inset: i,
  ...n
}) {
  const a = E(), w = Z();
  return /* @__PURE__ */ N(
    S.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": i,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        U({ variant: w.variant })
      ),
      checked: o,
      dir: a,
      ...n,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ r(S.ItemIndicator, { children: /* @__PURE__ */ r(et, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Ke({
  ...t
}) {
  return /* @__PURE__ */ r(S.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function We({
  className: t,
  children: e,
  inset: o,
  ...i
}) {
  const n = E(), a = Z();
  return /* @__PURE__ */ N(
    S.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": o,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        U({ variant: a.variant })
      ),
      dir: n,
      ...i,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ r(S.ItemIndicator, { children: /* @__PURE__ */ r(et, {}) })
          }
        ),
        e
      ]
    }
  );
}
function rt({ className: t, inset: e, ...o }) {
  return /* @__PURE__ */ r(
    S.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: m(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...o
    }
  );
}
function se({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    S.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Ze({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: m(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Ue({ ...t }) {
  return /* @__PURE__ */ r(S.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Xe({
  className: t,
  inset: e,
  children: o,
  ...i
}) {
  const n = Z();
  return /* @__PURE__ */ N(
    S.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        U({ variant: n.variant })
      ),
      ...i,
      children: [
        o,
        /* @__PURE__ */ r(zt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ye({ className: t, children: e, ...o }) {
  const i = E();
  return /* @__PURE__ */ r(
    S.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: m(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: i, children: e })
    }
  );
}
function Je({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      "data-slot": "skeleton",
      className: m("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
var z = {}, X, at;
function de() {
  return at || (at = 1, X = () => {
    const t = "\\ud800-\\udfff", w = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", v = "\\ufe0e\\ufe0f", u = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", s = `[${t}]`, f = `[${w}]`, g = "\\ud83c[\\udffb-\\udfff]", k = `(?:${f}|${g})`, d = `[^${t}]`, x = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", C = "\\u200d", G = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", H = `[${u}]`, B = `${k}?`, j = `[${v}]?`, D = `(?:${C}(?:${[d, x, b].join("|")})${j + B})*`, $ = j + B + D, c = `(?:${[`${d}${f}?`, f, x, b, s, H].join("|")})`;
    return new RegExp(`${G}|${g}(?=${g})|${c + $}`, "g");
  }), X;
}
var it;
function le() {
  if (it) return z;
  it = 1;
  var t = z && z.__importDefault || function(u) {
    return u && u.__esModule ? u : { default: u };
  };
  Object.defineProperty(z, "__esModule", { value: !0 });
  var e = t(de());
  function o(u) {
    if (typeof u != "string")
      throw new Error("A string is expected as input");
    return u.match(e.default()) || [];
  }
  z.toArray = o;
  function i(u) {
    if (typeof u != "string")
      throw new Error("Input must be a string");
    var s = u.match(e.default());
    return s === null ? 0 : s.length;
  }
  z.length = i;
  function n(u, s, f) {
    if (s === void 0 && (s = 0), typeof u != "string")
      throw new Error("Input must be a string");
    (typeof s != "number" || s < 0) && (s = 0), typeof f == "number" && f < 0 && (f = 0);
    var g = u.match(e.default());
    return g ? g.slice(s, f).join("") : "";
  }
  z.substring = n;
  function a(u, s, f) {
    if (s === void 0 && (s = 0), typeof u != "string")
      throw new Error("Input must be a string");
    var g = i(u);
    if (typeof s != "number" && (s = parseInt(s, 10)), s >= g)
      return "";
    s < 0 && (s += g);
    var k;
    typeof f > "u" ? k = g : (typeof f != "number" && (f = parseInt(f, 10)), k = f >= 0 ? f + s : s);
    var d = u.match(e.default());
    return d ? d.slice(s, k).join("") : "";
  }
  z.substr = a;
  function w(u, s, f, g) {
    if (s === void 0 && (s = 16), f === void 0 && (f = "#"), g === void 0 && (g = "right"), typeof u != "string" || typeof s != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(g) === -1)
      throw new Error("Pad position should be either left or right");
    typeof f != "string" && (f = String(f));
    var k = i(u);
    if (k > s)
      return n(u, 0, s);
    if (k < s) {
      var d = f.repeat(s - k);
      return g === "left" ? d + u : u + d;
    }
    return u;
  }
  z.limit = w;
  function v(u, s, f) {
    if (f === void 0 && (f = 0), typeof u != "string")
      throw new Error("Input must be a string");
    if (u === "")
      return s === "" ? 0 : -1;
    f = Number(f), f = isNaN(f) ? 0 : f, s = String(s);
    var g = o(u);
    if (f >= g.length)
      return s === "" ? g.length : -1;
    if (s === "")
      return f;
    var k = o(s), d = !1, x;
    for (x = f; x < g.length; x += 1) {
      for (var b = 0; b < k.length && k[b] === g[x + b]; )
        b += 1;
      if (b === k.length && k[b - 1] === g[x + b - 1]) {
        d = !0;
        break;
      }
    }
    return d ? x : -1;
  }
  return z.indexOf = v, z;
}
le();
function y(t) {
  return `%scrollGroup_${t}%`;
}
const ce = {
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
function ue(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((o) => {
    const i = e.get(o.projectId), n = {
      scrollGroupId: o.scrollGroupId,
      scrollGroupScrRefLabel: o.scrollGroupScrRefLabel
    };
    i ? i.some((a) => a.scrollGroupId === o.scrollGroupId) || i.push(n) : e.set(o.projectId, [n]);
  }), e.forEach((o) => o.sort((i, n) => i.scrollGroupId - n.scrollGroupId)), e;
}
function st(t, e, o) {
  return t.some((i) => i.projectId === e && i.scrollGroupId === o);
}
function Y(t) {
  const e = ue(t.openTabs);
  if (t.mode === "project") {
    const n = t.selection.projectId;
    return t.projects.map((a) => {
      const w = e.get(a.id) ?? [];
      return {
        rowKey: a.id,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        language: a.language,
        languageCode: a.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: w.map((v) => v.scrollGroupId),
        isSelected: n === a.id,
        isMuted: w.length === 0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason
      };
    });
  }
  let o = [];
  t.mode === "project-multi" ? o = t.selection.pairs : t.selection.projectId !== void 0 && (o = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const i = [];
  return t.projects.forEach((n) => {
    const a = e.get(n.id);
    if (!a || a.length === 0) {
      i.push({
        rowKey: `project:${n.id}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: st(o, n.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason
      });
      return;
    }
    a.forEach((w) => {
      i.push({
        rowKey: `tab:${n.id}:${w.scrollGroupId}`,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: w.scrollGroupId,
        scrollGroupScrRefLabel: w.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: st(o, n.id, w.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason
      });
    });
  }), o.forEach((n) => {
    if (n.scrollGroupId === void 0 || i.some((w) => w.projectId === n.projectId && w.scrollGroupId === n.scrollGroupId))
      return;
    const a = t.projects.find((w) => w.id === n.projectId);
    a && i.push({
      rowKey: `closed:${a.id}:${n.scrollGroupId}`,
      projectId: a.id,
      shortName: a.shortName,
      fullName: a.fullName,
      language: a.language,
      languageCode: a.languageCode,
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: a.isDisabled === !0,
      disabledReason: a.disabledReason
    });
  }), i;
}
function dt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function J(t, e) {
  const o = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (o !== 0) return o;
  const i = t.scrollGroupId ?? Number.POSITIVE_INFINITY, n = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return i - n;
}
function we(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(J) }];
  const o = t.filter(dt).sort(J), i = t.filter((a) => !dt(a)).sort(J);
  if (o.length === 0)
    return [{ kind: "flat", rows: i }];
  const n = [{ kind: "openTabs", rows: o }];
  return i.length > 0 && n.push({ kind: "other", rows: i }), n;
}
const fe = {
  searchPlaceholder: "Search projects & resources",
  filterAriaLabel: "Filter",
  groupSectionLabel: "Group",
  filterSectionLabel: "Filter",
  filterGroupByOpenTabs: "By open tabs",
  filterShowSelectedOnly: "Show selected only",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  selectAll: "Select all",
  clearAll: "Clear all"
};
function pe(t) {
  return { ...fe, ...t };
}
function F(t) {
  return ce[St(t)] ?? String(t);
}
const me = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ge({ scrollGroupId: t, isBoundButClosed: e }) {
  const o = F(t);
  return e ? /* @__PURE__ */ r(
    K,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: me,
      children: o
    }
  ) : /* @__PURE__ */ r(K, { variant: "secondary", children: o });
}
function he({ row: t, mode: e, strings: o, onClick: i, onOpen: n, selectedRowRef: a }) {
  const [w, v] = T(!1), u = tt(null), s = !!(t.language || t.languageCode), f = s || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, g = L(() => {
    if (f) {
      v(!0);
      return;
    }
    const G = u.current;
    G && G.scrollWidth > G.clientWidth && v(!0);
  }, [f]), k = /* @__PURE__ */ r(kt, { className: m("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let d;
  e === "project" ? t.openGroups.length > 0 && (d = /* @__PURE__ */ r("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((G) => /* @__PURE__ */ r(K, { variant: "secondary", children: F(G) }, G)) })) : t.scrollGroupId !== void 0 && (d = /* @__PURE__ */ N("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ r(
      ge,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && n && /* @__PURE__ */ N(
      A,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (G) => {
          G.stopPropagation(), n(t);
        },
        onMouseDown: (G) => G.stopPropagation(),
        "aria-label": o.openButtonLabel,
        title: o.openButtonLabel,
        children: [
          /* @__PURE__ */ r(Ct, { className: "tw:h-3 tw:w-3" }),
          o.openButtonLabel
        ]
      }
    )
  ] }));
  const x = /* @__PURE__ */ N(
    Wt,
    {
      ref: t.isSelected ? a : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || i(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: g,
      onPointerLeave: () => v(!1),
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ r("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: k }),
        /* @__PURE__ */ N(
          "span",
          {
            ref: u,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ r("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              /* @__PURE__ */ r("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        d
      ]
    }
  ), b = t.scrollGroupId !== void 0 ? F(t.scrollGroupId) : void 0, C = t.isBoundButClosed && b ? o.boundButClosedTooltip.replace("{group}", b) : void 0;
  return /* @__PURE__ */ N(Jt, { open: w, delayDuration: 400, children: [
    /* @__PURE__ */ r(Qt, { asChild: !0, children: x }),
    /* @__PURE__ */ N(
      te,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: ut },
        children: [
          /* @__PURE__ */ r("div", { className: "tw:font-semibold", children: t.fullName }),
          s && /* @__PURE__ */ N("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ N("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && b && /* @__PURE__ */ N("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ N("span", { className: "tw:text-muted-foreground", children: [
              " (",
              b,
              ")"
            ] })
          ] }),
          C && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic", children: C }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function be({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: o,
  onChangeShowSelectedOnly: i,
  strings: n
}) {
  const a = !!o;
  return /* @__PURE__ */ N(re, { children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ r(
      A,
      {
        variant: "ghost",
        size: "sm",
        className: m(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": n.filterAriaLabel,
        "aria-pressed": a,
        title: n.filterAriaLabel,
        onMouseDown: (w) => w.preventDefault(),
        children: /* @__PURE__ */ r(Nt, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ N(ie, { align: "end", className: "tw:w-56", style: { zIndex: ut }, children: [
      /* @__PURE__ */ r(rt, { children: n.groupSectionLabel }),
      /* @__PURE__ */ r(
        nt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (w) => w.preventDefault(),
          children: n.filterGroupByOpenTabs
        }
      ),
      i && /* @__PURE__ */ N(lt, { children: [
        /* @__PURE__ */ r(se, {}),
        /* @__PURE__ */ r(rt, { children: n.filterSectionLabel }),
        /* @__PURE__ */ r(
          nt,
          {
            checked: !!o,
            onCheckedChange: i,
            onSelect: (w) => w.preventDefault(),
            children: n.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Qe(t) {
  const [e, o] = T(!1), [i, n] = T(""), [a, w] = T(t.defaultGroupByOpenTabs ?? !0), [v, u] = T(!1), s = tt(null), f = L((l) => {
    o(l), l || n("");
  }, []);
  vt(() => {
    if (!e) return;
    const l = window.requestAnimationFrame(() => {
      const c = s.current;
      c && c.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(l);
  }, [e]);
  const g = pe(t.localizedStrings), k = M(() => t.mode === "project" ? Y({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? Y({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : Y({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), d = M(() => {
    const l = i.trim().toLowerCase();
    let c = k;
    return l && (c = c.filter(
      (p) => p.shortName.toLowerCase().includes(l) || p.fullName.toLowerCase().includes(l) || (p.language ?? "").toLowerCase().includes(l) || (p.languageCode ?? "").toLowerCase().includes(l)
    )), t.mode === "project-multi" && v && (c = c.filter((p) => p.isSelected)), c;
  }, [k, i, t.mode, v]), x = M(
    () => we(d, a),
    [d, a]
  ), b = M(() => {
    if (t.mode !== "project-multi") return [];
    const l = [];
    return t.projects.forEach((c) => {
      const p = t.openTabs.filter((h) => h.projectId === c.id);
      if (p.length === 0) {
        l.push({ projectId: c.id });
        return;
      }
      const I = /* @__PURE__ */ new Set();
      p.forEach((h) => {
        I.has(h.scrollGroupId) || (I.add(h.scrollGroupId), l.push({ projectId: c.id, scrollGroupId: h.scrollGroupId }));
      });
    }), l;
  }, [t.mode, t.projects, t.openTabs]), C = (l) => {
    if (l.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(l.projectId, l.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(l.projectId, l.scrollGroupId);
    }
  }, G = (l) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: l.projectId }), o(!1);
        return;
      }
      case "project-multi": {
        const c = t.selection.pairs, p = (h) => h.projectId === l.projectId && h.scrollGroupId === l.scrollGroupId, I = c.some(p) ? c.filter((h) => !p(h)) : [...c, { projectId: l.projectId, scrollGroupId: l.scrollGroupId }];
        t.onChangeSelection({ pairs: I }), I.length === 0 && v && u(!1);
        return;
      }
      case "projectScrollGroup": {
        if (l.isBoundButClosed && l.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(l.projectId, l.scrollGroupId), o(!1);
          return;
        }
        if (l.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: l.projectId,
            scrollGroupId: l.scrollGroupId
          }), o(!1);
          return;
        }
        const c = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: l.projectId, scrollGroupId: c }), t.onOpenProjectInGroup(l.projectId, c), o(!1);
      }
    }
  }, H = () => {
    if (t.mode !== "project-multi") return;
    const l = t.selection.pairs, c = new Set(l.map((I) => `${I.projectId}:${I.scrollGroupId ?? ""}`)), p = [...l];
    b.forEach((I) => {
      const h = `${I.projectId}:${I.scrollGroupId ?? ""}`;
      c.has(h) || (c.add(h), p.push(I));
    }), t.onChangeSelection({ pairs: p });
  }, B = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), v && u(!1));
  }, j = M(() => {
    switch (t.mode) {
      case "project": {
        const l = t.projects.find((p) => p.id === t.selection.projectId), c = l ? l.shortName : t.buttonPlaceholder ?? "";
        return { node: c, title: c };
      }
      case "project-multi": {
        const { pairs: l } = t.selection;
        if (l.length === 0) {
          const h = t.buttonPlaceholder ?? "";
          return { node: h, title: h };
        }
        const c = [];
        if (l.forEach((h) => {
          const P = t.projects.find((mt) => mt.id === h.projectId);
          P && c.push({ project: P, scrollGroupId: h.scrollGroupId });
        }), c.length === 0) {
          const h = t.buttonPlaceholder ?? "";
          return { node: h, title: h };
        }
        if (t.getSelectedText) {
          const h = t.getSelectedText(c);
          return { node: h, title: h };
        }
        const p = c.map(
          ({ project: h, scrollGroupId: P }) => P === void 0 ? h.shortName : `${h.shortName} (${F(P)})`
        ).join(", ");
        if (c.length === 1) return { node: p, title: p };
        const I = c.length.toString();
        return {
          node: /* @__PURE__ */ N(lt, { children: [
            /* @__PURE__ */ r(K, { variant: "muted", className: "tw:shrink-0", children: I }),
            /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:truncate", children: p })
          ] }),
          title: `${I} ${p}`
        };
      }
      case "projectScrollGroup": {
        const l = t.projects.find((I) => I.id === t.selection.projectId);
        if (!l) {
          const I = t.buttonPlaceholder ?? "";
          return { node: I, title: I };
        }
        const c = t.selection.scrollGroupId;
        if (c === void 0)
          return { node: l.shortName, title: l.shortName };
        const p = `${l.shortName} · ${F(c)}`;
        return { node: p, title: p };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]), D = t.mode === "project-multi" ? /* @__PURE__ */ r(It, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : /* @__PURE__ */ r(yt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }), $ = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? C : void 0;
  return /* @__PURE__ */ N(Zt, { open: e, onOpenChange: f, children: [
    /* @__PURE__ */ r(Ut, { asChild: !0, children: /* @__PURE__ */ N(
      A,
      {
        variant: t.buttonVariant ?? "outline",
        role: "combobox",
        "aria-expanded": e,
        "aria-label": t.ariaLabel,
        disabled: t.isDisabled ?? !1,
        className: m(
          "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
          t.buttonClassName
        ),
        children: [
          /* @__PURE__ */ r("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof j.node == "string" ? /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:truncate", children: j.node }) : j.node }),
          D
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Xt,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: m("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ r(Yt, { delayDuration: 400, children: /* @__PURE__ */ N(Ot, { shouldFilter: !1, children: [
          /* @__PURE__ */ N("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ r("div", { className: "tw:flex-1", children: /* @__PURE__ */ r(
              Ft,
              {
                value: i,
                onValueChange: n,
                placeholder: g.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            /* @__PURE__ */ r(
              be,
              {
                groupByOpenTabs: a,
                onChangeGroupByOpenTabs: w,
                showSelectedOnly: t.mode === "project-multi" ? v : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? u : void 0,
                strings: g
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ N("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ r(A, { variant: "ghost", size: "sm", onClick: H, children: `${g.selectAll} (${b.length.toString()})` }),
            /* @__PURE__ */ r(A, { variant: "ghost", size: "sm", onClick: B, children: `${g.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ N(Vt, { children: [
            /* @__PURE__ */ r(Ht, { children: t.commandEmptyMessage ?? "No projects found" }),
            x.map((l, c) => /* @__PURE__ */ N(xt, { children: [
              /* @__PURE__ */ r(qt, { heading: ve(l, g), children: l.rows.map((p) => /* @__PURE__ */ r(
                he,
                {
                  row: p,
                  mode: t.mode,
                  strings: g,
                  onClick: G,
                  onOpen: $,
                  selectedRowRef: s
                },
                p.rowKey
              )) }),
              c < x.length - 1 && /* @__PURE__ */ r(Kt, {})
            ] }, l.kind))
          ] })
        ] }) })
      }
    )
  ] });
}
function ve(t, e) {
  switch (t.kind) {
    case "openTabs":
      return e.openTabsSectionHeading;
    case "other":
      return e.otherProjectsSectionHeading;
    case "flat":
    default:
      return;
  }
}
function to({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: o,
  orientation: i,
  ...n
}) {
  return /* @__PURE__ */ r(
    ot.Group,
    {
      "data-slot": "resizable-panel-group",
      className: m(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: i ?? e,
      onLayoutChange: o ? (a) => o(Object.values(a)) : void 0,
      ...n
    }
  );
}
function q(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function eo({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: o,
  collapsedSize: i,
  ...n
}) {
  return /* @__PURE__ */ r(
    ot.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: q(t),
      minSize: q(e),
      maxSize: q(o),
      collapsedSize: q(i),
      ...n
    }
  );
}
function oo({
  withHandle: t,
  className: e,
  ...o
}) {
  return /* @__PURE__ */ r(
    ot.Separator,
    {
      "data-slot": "resizable-handle",
      className: m(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...o,
      children: t && /* @__PURE__ */ r("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  eo as $,
  Kt as A,
  A as B,
  Wt as C,
  qe as D,
  _e as E,
  Pe as F,
  Qe as G,
  ut as H,
  Be as I,
  ce as J,
  _t as K,
  Ue as L,
  Xe as M,
  Ve as N,
  Ye as O,
  Zt as P,
  pt as Q,
  Z as R,
  Oe as S,
  Yt as T,
  U,
  Ze as V,
  Ae as W,
  Me as X,
  Le as Y,
  $e as Z,
  oo as _,
  Re as a,
  to as a0,
  ne as a1,
  wt as a2,
  Bt as a3,
  Ut as b,
  m as c,
  Xt as d,
  Ot as e,
  Vt as f,
  qt as g,
  Ft as h,
  Ht as i,
  Jt as j,
  Qt as k,
  te as l,
  K as m,
  re as n,
  ae as o,
  ie as p,
  rt as q,
  E as r,
  se as s,
  nt as t,
  Fe as u,
  Je as v,
  He as w,
  Ke as x,
  We as y,
  Te as z
};
//# sourceMappingURL=resizable-Can6aGDF.js.map
