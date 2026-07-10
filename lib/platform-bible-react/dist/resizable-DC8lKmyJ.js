import { Canon as B } from "@sillsdev/scripture";
import { includes as Z, Section as R, getLocalizeKeyForScrollGroupId as kt } from "platform-bible-utils";
import { jsx as s, jsxs as x, Fragment as gt } from "react/jsx-runtime";
import { Slot as bt, Popover as K, Tooltip as O, Separator as Gt, DropdownMenu as k } from "radix-ui";
import tt, { useRef as st, useState as A, useCallback as J, createContext as Tt, useContext as Dt, useEffect as zt, useMemo as H, Fragment as Rt } from "react";
import { Filter as Mt, Check as At, ArrowRight as Lt, Loader2 as jt, ChevronsUpDown as Pt, ChevronDown as Bt } from "lucide-react";
import "@eten-tech-foundation/scripture-utilities";
import { cva as q } from "class-variance-authority";
import { Command as L } from "cmdk";
import { IconSearch as Ot, IconCheck as it, IconChevronRight as $t } from "@tabler/icons-react";
import * as lt from "react-resizable-panels";
import { clsx as _t } from "clsx";
import { extendTailwindMerge as Ht, twMerge as Jt } from "tailwind-merge";
const Ft = Ht({ prefix: "tw" });
function nt(t) {
  const e = [];
  let a = "", o = 0;
  for (let r = 0; r < t.length; r++) {
    const n = t[r];
    n === "[" ? o += 1 : n === "]" && (o -= 1), n === ":" && o === 0 ? (e.push(a), a = "") : a += n;
  }
  return e.push(a), e;
}
function Vt(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = nt(t), a = e.findIndex((n) => n.startsWith("-tw-"));
  if (a !== -1) {
    const n = e[a].slice(4);
    return { normalized: `tw:${[...e.filter((l, d) => d !== a), `-${n}`].join(":")}`, original: t };
  }
  const o = e.findIndex((n) => n.startsWith("!tw-"));
  if (o !== -1) {
    const n = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((l, d) => d !== o), `!${n}`].join(":")}`, original: t };
  }
  const r = e[e.length - 1];
  if (r.startsWith("tw-")) {
    const n = r.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), n].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Kt(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const a = nt(t);
  if (a[0] !== "tw") return t;
  const o = a.slice(1, -1), r = a[a.length - 1], n = nt(e), u = n.some((l) => l.startsWith("-tw-")), w = n.some((l) => l.startsWith("!tw-"));
  if (u && r.startsWith("-")) {
    const l = r.slice(1);
    return [...o, `-tw-${l}`].join(":");
  }
  if (w && r.startsWith("!")) {
    const l = r.slice(1);
    return [...o, `!tw-${l}`].join(":");
  }
  return [...o, `tw-${r}`].join(":");
}
function p(...t) {
  const e = _t(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Ft(e);
  const a = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), r = [];
  return a.forEach((l) => {
    const d = Vt(l);
    o.set(d.normalized, d.original), r.push(d.normalized);
  }), Jt(r.join(" ")).split(" ").filter(Boolean).map((l) => {
    const d = o.get(l);
    return d ? Kt(l, d) : l;
  }).join(" ");
}
const Xt = 600, He = 300, Nt = 400, Je = 450, Fe = 500, Ut = 550, vt = q(
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
function F({
  className: t,
  variant: e = "default",
  size: a = "default",
  asChild: o = !1,
  ...r
}) {
  const n = o ? bt.Root : "button";
  return /* @__PURE__ */ s(
    n,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": a,
      className: p(vt({ variant: e, size: a, className: t })),
      ...r
    }
  );
}
const qt = "layoutDirection";
function M() {
  const t = localStorage.getItem(qt);
  return t === "rtl" ? t : "ltr";
}
function Wt({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
const Zt = q(
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
function Yt({
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
        className: p(Zt({ align: e }), t),
        onClick: (o) => {
          var r, n;
          o.target instanceof HTMLElement && o.target.closest("button") || (n = (r = o.currentTarget.parentElement) == null ? void 0 : r.querySelector("input")) == null || n.focus();
        },
        ...a
      }
    )
  );
}
q("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function Qt({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    L,
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
function te({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...a
}) {
  const o = M(), r = tt.useCallback(
    (n) => {
      if (e == null || e(n), n.defaultPrevented || n.key !== " " || n.currentTarget.value !== "") return;
      const u = n.currentTarget.closest("[cmdk-root]"), w = u == null ? void 0 : u.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      w && (n.preventDefault(), n.stopPropagation(), w.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ s("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ x(Wt, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ s(
        L.Input,
        {
          "data-slot": "command-input",
          className: p(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: r,
          ...a
        }
      ),
      /* @__PURE__ */ s(Yt, { children: /* @__PURE__ */ s(Ot, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function ee({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    L.List,
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
function ae({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    L.Empty,
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
function re({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    L.Group,
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
function oe({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    L.Separator,
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
function ne({
  className: t,
  children: e,
  ...a
}) {
  return /* @__PURE__ */ x(
    L.Item,
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
        /* @__PURE__ */ s(it, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ve({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
const Ke = (t, e, a, o, r) => {
  switch (t) {
    case R.OT:
      return e ?? "Old Testament";
    case R.NT:
      return a ?? "New Testament";
    case R.DC:
      return o ?? "Deuterocanon";
    case R.Extra:
      return r ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Xe = (t, e, a, o, r) => {
  switch (t) {
    case R.OT:
      return e ?? "OT";
    case R.NT:
      return a ?? "NT";
    case R.DC:
      return o ?? "DC";
    case R.Extra:
      return r ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Ue(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? B.bookIdToEnglishName(t);
}
function qe(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const se = B.allBookIds.filter(
  (t) => !B.isObsolete(B.bookIdToNumber(t))
), We = Object.fromEntries(
  se.map((t) => [t, B.bookIdToEnglishName(t)])
);
function Ze(t, e, a) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const r = B.bookIdToEnglishName(t), n = a == null ? void 0 : a.get(t);
  return !!(Z(r.toLowerCase(), o) || Z(t.toLowerCase(), o) || (n ? Z(n.localizedName.toLowerCase(), o) || Z(n.localizedId.toLowerCase(), o) : !1));
}
function ie({ ...t }) {
  return /* @__PURE__ */ s(K.Root, { "data-slot": "popover", ...t });
}
function dt({ ...t }) {
  return /* @__PURE__ */ s(K.Trigger, { "data-slot": "popover-trigger", ...t });
}
const xt = tt.createContext(null);
function Ye({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ s(xt.Provider, { value: t, children: e });
}
function le({
  className: t,
  align: e = "center",
  sideOffset: a = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...r
}) {
  const n = M(), u = tt.useContext(xt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ s(K.Portal, { container: u ?? void 0, children: /* @__PURE__ */ s(
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
        style: { zIndex: Xt, ...o },
        dir: n,
        ...r
      }
    ) })
  );
}
function Qe({ ...t }) {
  return /* @__PURE__ */ s(K.Anchor, { "data-slot": "popover-anchor", ...t });
}
function ta({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-header",
      className: p("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function ea({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-title",
      className: p("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function aa({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "p",
    {
      "data-slot": "popover-description",
      className: p("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
var z = {}, rt, ct;
function de() {
  return ct || (ct = 1, rt = () => {
    const t = "\\ud800-\\udfff", u = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", w = "\\ufe0e\\ufe0f", l = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${t}]`, m = `[${u}]`, h = "\\ud83c[\\udffb-\\udfff]", y = `(?:${m}|${h})`, c = `[^${t}]`, N = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", E = "\\u200d", G = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", W = `[${l}]`, $ = `${y}?`, D = `[${w}]?`, T = `(?:${E}(?:${[c, N, b].join("|")})${D + $})*`, j = D + $ + T, S = `(?:${[`${c}${m}?`, m, N, b, d, W].join("|")})`;
    return new RegExp(`${G}|${h}(?=${h})|${S + j}`, "g");
  }), rt;
}
var ut;
function ce() {
  if (ut) return z;
  ut = 1;
  var t = z && z.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(z, "__esModule", { value: !0 });
  var e = t(de());
  function a(l) {
    if (typeof l != "string")
      throw new Error("A string is expected as input");
    return l.match(e.default()) || [];
  }
  z.toArray = a;
  function o(l) {
    if (typeof l != "string")
      throw new Error("Input must be a string");
    var d = l.match(e.default());
    return d === null ? 0 : d.length;
  }
  z.length = o;
  function r(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof m == "number" && m < 0 && (m = 0);
    var h = l.match(e.default());
    return h ? h.slice(d, m).join("") : "";
  }
  z.substring = r;
  function n(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    var h = o(l);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= h)
      return "";
    d < 0 && (d += h);
    var y;
    typeof m > "u" ? y = h : (typeof m != "number" && (m = parseInt(m, 10)), y = m >= 0 ? m + d : d);
    var c = l.match(e.default());
    return c ? c.slice(d, y).join("") : "";
  }
  z.substr = n;
  function u(l, d, m, h) {
    if (d === void 0 && (d = 16), m === void 0 && (m = "#"), h === void 0 && (h = "right"), typeof l != "string" || typeof d != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(h) === -1)
      throw new Error("Pad position should be either left or right");
    typeof m != "string" && (m = String(m));
    var y = o(l);
    if (y > d)
      return r(l, 0, d);
    if (y < d) {
      var c = m.repeat(d - y);
      return h === "left" ? c + l : l + c;
    }
    return l;
  }
  z.limit = u;
  function w(l, d, m) {
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
    var y = a(d), c = !1, N;
    for (N = m; N < h.length; N += 1) {
      for (var b = 0; b < y.length && y[b] === h[N + b]; )
        b += 1;
      if (b === y.length && y[b - 1] === h[N + b - 1]) {
        c = !0;
        break;
      }
    }
    return c ? N : -1;
  }
  return z.indexOf = w, z;
}
ce();
const ue = [
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
], ra = (t) => {
  var e;
  return ((e = ue[t]) == null ? void 0 : e.chapters) ?? -1;
};
function I(t) {
  return `%scrollGroup_${t}%`;
}
const we = {
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
function wt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ s(
    O.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function It({ ...t }) {
  return /* @__PURE__ */ s(O.Root, { "data-slot": "tooltip", ...t });
}
function yt({
  className: t,
  variant: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    O.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? p(vt({ variant: e }), t) : t,
      ...a
    }
  );
}
function St({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: a,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: o = !0,
  children: r,
  ...n
}) {
  return /* @__PURE__ */ s(O.Portal, { children: /* @__PURE__ */ x(
    O.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Ut, ...a },
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...n,
      children: [
        r,
        o && /* @__PURE__ */ s(O.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function oa({
  className: t,
  orientation: e = "horizontal",
  decorative: a = !0,
  ...o
}) {
  return /* @__PURE__ */ s(
    Gt.Root,
    {
      "data-slot": "separator",
      decorative: a,
      orientation: e,
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const me = ["input", "select", "textarea", "button"], fe = ["button", "textbox"], na = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: a,
  onCharacterPress: o
}) => {
  const r = st(null), [n, u] = A(void 0), [w, l] = A(void 0), d = J(
    (c) => {
      u(c);
      const N = t.find((E) => E.id === c);
      N && (e == null || e(N));
      const b = document.getElementById(c);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), r.current && r.current.setAttribute("aria-activedescendant", c);
    },
    [e, t]
  ), m = J(
    (c) => {
      const N = t.find((b) => b.id === c);
      N && (l((b) => b === c ? void 0 : c), a == null || a(N));
    },
    [a, t]
  ), h = (c) => {
    if (!c) return !1;
    const N = c.tagName.toLowerCase();
    if (c.isContentEditable || me.includes(N)) return !0;
    const b = c.getAttribute("role");
    if (b && fe.includes(b)) return !0;
    const E = c.getAttribute("tabindex");
    return E !== void 0 && E !== "-1";
  }, y = J(
    (c) => {
      var P;
      const N = c.target, b = (S) => S ? document.getElementById(S) : void 0, E = b(w), G = b(n);
      if (!!(E && N && E.contains(N) && N !== E) && h(N)) {
        if (c.key === "Escape" || c.key === "ArrowLeft" && !N.isContentEditable) {
          if (w) {
            c.preventDefault(), c.stopPropagation();
            const S = t.find((i) => i.id === w);
            S && d(S.id);
          }
          return;
        }
        if (c.key === "ArrowDown" || c.key === "ArrowUp") {
          if (!E) return;
          const S = Array.from(
            E.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const i = S.findIndex((g) => g === N);
          if (i === -1) return;
          let f;
          c.key === "ArrowDown" ? f = Math.min(i + 1, S.length - 1) : f = Math.max(i - 1, 0), f !== i && (c.preventDefault(), c.stopPropagation(), (P = S[f]) == null || P.focus());
          return;
        }
        return;
      }
      const D = t.findIndex((S) => S.id === n);
      let T = D;
      switch (c.key) {
        case "ArrowDown":
          T = Math.min(D + 1, t.length - 1), c.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(D - 1, 0), c.preventDefault();
          break;
        case "Home":
          T = 0, c.preventDefault();
          break;
        case "End":
          T = t.length - 1, c.preventDefault();
          break;
        case " ":
        case "Enter":
          n && m(n), c.preventDefault(), c.stopPropagation();
          return;
        case "ArrowRight": {
          const S = G;
          if (S) {
            const i = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), f = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), g = i ?? f;
            if (g) {
              c.preventDefault(), g.focus();
              return;
            }
          }
          break;
        }
        default:
          c.key.length === 1 && !c.metaKey && !c.ctrlKey && !c.altKey && (h(N) || (o == null || o(c.key), c.preventDefault()));
          return;
      }
      const j = t[T];
      j && d(j.id);
    },
    [t, d, n, w, m, o]
  );
  return {
    listboxRef: r,
    activeId: n,
    selectedId: w,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: y,
    /** Focus an option by its ID */
    focusOption: d
  };
}, he = q(
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
function Q({ className: t, variant: e = "default", asChild: a = !1, ...o }) {
  const r = a ? bt.Root : "span";
  return /* @__PURE__ */ s(
    r,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: p(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        he({ variant: e }),
        t
      ),
      ...o
    }
  );
}
const Ct = Tt(void 0);
function et() {
  const t = Dt(Ct);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const at = q("", {
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
function pe({ variant: t = "default", ...e }) {
  const a = M(), o = tt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ s(Ct.Provider, { value: o, children: /* @__PURE__ */ s(k.Root, { "data-slot": "dropdown-menu", dir: a, ...e }) });
}
function sa({
  ...t
}) {
  return /* @__PURE__ */ s(k.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function ge({
  ...t
}) {
  return /* @__PURE__ */ s(k.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function be({
  className: t,
  align: e = "start",
  sideOffset: a = 4,
  children: o,
  ...r
}) {
  const n = M();
  return /* @__PURE__ */ s(k.Portal, { children: /* @__PURE__ */ s(
    k.Content,
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
      ...r,
      children: /* @__PURE__ */ s("div", { dir: n, children: o })
    }
  ) });
}
function ia({ ...t }) {
  return /* @__PURE__ */ s(k.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function la({
  className: t,
  inset: e,
  variant: a = "default",
  ...o
}) {
  const r = M(), n = et();
  return /* @__PURE__ */ s(
    k.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": a,
      className: p(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        at({ variant: n.variant })
      ),
      dir: r,
      ...o
    }
  );
}
function mt({
  className: t,
  children: e,
  checked: a,
  inset: o,
  ...r
}) {
  const n = M(), u = et();
  return /* @__PURE__ */ x(
    k.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: p(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        at({ variant: u.variant })
      ),
      checked: a,
      dir: n,
      ...r,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ s(k.ItemIndicator, { children: /* @__PURE__ */ s(it, {}) })
          }
        ),
        e
      ]
    }
  );
}
function da({
  ...t
}) {
  return /* @__PURE__ */ s(k.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function ca({
  className: t,
  children: e,
  inset: a,
  ...o
}) {
  const r = M(), n = et();
  return /* @__PURE__ */ x(
    k.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": a,
      className: p(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        at({ variant: n.variant })
      ),
      dir: r,
      ...o,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ s(k.ItemIndicator, { children: /* @__PURE__ */ s(it, {}) })
          }
        ),
        e
      ]
    }
  );
}
function ft({ className: t, inset: e, ...a }) {
  return /* @__PURE__ */ s(
    k.Label,
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
function Ne({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    k.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: p("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function ua({ className: t, ...e }) {
  return /* @__PURE__ */ s(
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
function wa({ ...t }) {
  return /* @__PURE__ */ s(k.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function ma({
  className: t,
  inset: e,
  children: a,
  ...o
}) {
  const r = et();
  return /* @__PURE__ */ x(
    k.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: p(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        at({ variant: r.variant })
      ),
      ...o,
      children: [
        a,
        /* @__PURE__ */ s($t, { className: "tw:ms-auto" })
      ]
    }
  );
}
function fa({ className: t, children: e, ...a }) {
  const o = M();
  return /* @__PURE__ */ s(
    k.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...a,
      children: /* @__PURE__ */ s("div", { dir: o, children: e })
    }
  );
}
function ha({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "skeleton",
      className: p("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function X(t) {
  return t.toUpperCase();
}
function ve(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((a) => {
    const o = X(a.projectId), r = e.get(o), n = {
      scrollGroupId: a.scrollGroupId,
      scrollGroupScrRefLabel: a.scrollGroupScrRefLabel
    };
    r ? r.some((u) => u.scrollGroupId === a.scrollGroupId) || r.push(n) : e.set(o, [n]);
  }), e.forEach((a) => a.sort((o, r) => o.scrollGroupId - r.scrollGroupId)), e;
}
function ht(t, e, a) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === a);
}
function ot(t) {
  const e = ve(t.openTabs);
  if (t.mode === "project") {
    const r = t.selection.projectId;
    return t.projects.map((n) => {
      const u = e.get(X(n.id)) ?? [];
      return {
        rowKey: n.id,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: u.map((w) => w.scrollGroupId),
        isSelected: r === n.id,
        isMuted: u.length === 0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName
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
  const o = [];
  return t.projects.forEach((r) => {
    const n = e.get(X(r.id));
    if (!n || n.length === 0) {
      o.push({
        rowKey: `project:${r.id}`,
        projectId: r.id,
        shortName: r.shortName,
        fullName: r.fullName,
        language: r.language,
        languageCode: r.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: ht(a, r.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        versificationId: r.versificationId,
        versificationName: r.versificationName
      });
      return;
    }
    n.forEach((u) => {
      o.push({
        rowKey: `tab:${r.id}:${u.scrollGroupId}`,
        projectId: r.id,
        shortName: r.shortName,
        fullName: r.fullName,
        language: r.language,
        languageCode: r.languageCode,
        scrollGroupId: u.scrollGroupId,
        scrollGroupScrRefLabel: u.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: ht(a, r.id, u.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        versificationId: r.versificationId,
        versificationName: r.versificationName
      });
    });
  }), a.forEach((r) => {
    if (r.scrollGroupId === void 0 || o.some((u) => u.projectId === r.projectId && u.scrollGroupId === r.scrollGroupId))
      return;
    const n = t.projects.find((u) => u.id === r.projectId);
    n && o.push({
      rowKey: `closed:${n.id}:${r.scrollGroupId}`,
      projectId: n.id,
      shortName: n.shortName,
      fullName: n.fullName,
      language: n.language,
      languageCode: n.languageCode,
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: !0,
      isMuted: !1,
      isBoundButClosed: !0,
      isDisabled: n.isDisabled === !0,
      disabledReason: n.disabledReason,
      versificationId: n.versificationId,
      versificationName: n.versificationName
    });
  }), o;
}
function pt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function V(t, e) {
  const a = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (a !== 0) return a;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, r = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - r;
}
function xe(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(V) }];
  const a = t.filter(pt).sort(V), o = t.filter((n) => !pt(n)).sort(V);
  if (a.length === 0)
    return [{ kind: "flat", rows: o }];
  const r = [{ kind: "openTabs", rows: a }];
  return o.length > 0 && r.push({ kind: "other", rows: o }), r;
}
function Ie(t, e, a) {
  const o = /* @__PURE__ */ new Map(), r = [];
  t.forEach((w) => {
    const l = w.versificationId;
    if (l === void 0 || l === "") {
      r.push(w);
      return;
    }
    const d = w.versificationName ?? l, m = o.get(l);
    m ? (m.rows.push(w), !m.label && w.versificationName && (m.label = w.versificationName)) : o.set(l, { label: d, rows: [w] });
  });
  const n = [...o.entries()].map(([w, { label: l, rows: d }]) => ({
    id: w,
    label: l,
    rows: [...d].sort(V)
  }));
  n.sort((w, l) => w.id === e ? -1 : l.id === e ? 1 : w.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const u = n.map(({ id: w, label: l, rows: d }) => ({
    kind: "versification",
    rows: d,
    label: l,
    isPriority: w === e
  }));
  return r.length > 0 && u.push({
    kind: "versification",
    rows: [...r].sort(V),
    label: a,
    isPriority: !1
  }), u;
}
const ye = {
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
function Se(t) {
  return { ...ye, ...t };
}
function U(t) {
  return we[kt(t)] ?? String(t);
}
const Ce = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ee({ scrollGroupId: t, isBoundButClosed: e }) {
  const a = U(t);
  return e ? /* @__PURE__ */ s(
    Q,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Ce,
      children: a
    }
  ) : /* @__PURE__ */ s(Q, { variant: "secondary", children: a });
}
function ke({ row: t, mode: e, strings: a, onClick: o, onOpen: r, selectedRowRef: n }) {
  const [u, w] = A(!1), l = st(null), d = !!(t.language || t.languageCode), m = d || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, h = J(() => {
    if (m) {
      w(!0);
      return;
    }
    const G = l.current;
    G && G.scrollWidth > G.clientWidth && w(!0);
  }, [m]), y = /* @__PURE__ */ s(At, { className: p("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let c;
  e === "project" ? t.openGroups.length > 0 && (c = /* @__PURE__ */ s("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((G) => /* @__PURE__ */ s(Q, { variant: "secondary", children: U(G) }, G)) })) : t.scrollGroupId !== void 0 && (c = /* @__PURE__ */ x("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ s(
      Ee,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && r && /* @__PURE__ */ x(
      F,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (G) => {
          G.stopPropagation(), r(t);
        },
        onMouseDown: (G) => G.stopPropagation(),
        "aria-label": a.openButtonLabel,
        title: a.openButtonLabel,
        children: [
          /* @__PURE__ */ s(Lt, { className: "tw:h-3 tw:w-3" }),
          a.openButtonLabel
        ]
      }
    )
  ] }));
  const N = /* @__PURE__ */ x(
    ne,
    {
      ref: t.isSelected ? n : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: h,
      onPointerLeave: () => w(!1),
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ s("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: y }),
        /* @__PURE__ */ x(
          "span",
          {
            ref: l,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ s("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ s("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        c
      ]
    }
  ), b = t.scrollGroupId !== void 0 ? U(t.scrollGroupId) : void 0, E = t.isBoundButClosed && b ? a.boundButClosedTooltip.replace("{group}", b) : void 0;
  return /* @__PURE__ */ x(It, { open: u, delayDuration: 400, children: [
    /* @__PURE__ */ s(yt, { asChild: !0, children: N }),
    /* @__PURE__ */ x(
      St,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: Nt },
        children: [
          /* @__PURE__ */ s("div", { className: "tw:font-semibold", children: t.fullName }),
          d && /* @__PURE__ */ x("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ x("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && b && /* @__PURE__ */ x("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ x("span", { className: "tw:text-muted-foreground", children: [
              " (",
              b,
              ")"
            ] })
          ] }),
          E && /* @__PURE__ */ s("div", { className: "tw:text-sm tw:italic", children: E }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ s("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Ge({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: a,
  onChangeShowSelectedOnly: o,
  strings: r
}) {
  const n = !!a;
  return /* @__PURE__ */ x(pe, { children: [
    /* @__PURE__ */ s(ge, { asChild: !0, children: /* @__PURE__ */ s(
      F,
      {
        variant: "ghost",
        size: "sm",
        className: p(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          n && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": r.filterAriaLabel,
        "aria-pressed": n,
        title: r.filterAriaLabel,
        onMouseDown: (u) => u.preventDefault(),
        children: /* @__PURE__ */ s(Mt, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ x(be, { align: "end", className: "tw:w-56", style: { zIndex: Nt }, children: [
      /* @__PURE__ */ s(ft, { children: r.groupSectionLabel }),
      /* @__PURE__ */ s(
        mt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (u) => u.preventDefault(),
          children: r.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ x(gt, { children: [
        /* @__PURE__ */ s(Ne, {}),
        /* @__PURE__ */ s(ft, { children: r.filterSectionLabel }),
        /* @__PURE__ */ s(
          mt,
          {
            checked: !!a,
            onCheckedChange: o,
            onSelect: (u) => u.preventDefault(),
            children: r.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function pa(t) {
  const [e, a] = A(!1), [o, r] = A(""), [n, u] = A(t.defaultGroupByOpenTabs ?? !0), [w, l] = A(!1), d = st(null), m = J((i) => {
    a(i), i || r("");
  }, []);
  zt(() => {
    if (!e) return;
    const i = window.requestAnimationFrame(() => {
      const f = d.current;
      f && f.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(i);
  }, [e]);
  const h = Se(t.localizedStrings), y = H(() => t.mode === "project" ? ot({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), c = H(() => {
    const i = o.trim().toLowerCase();
    let f = y;
    return i && (f = f.filter(
      (g) => g.shortName.toLowerCase().includes(i) || g.fullName.toLowerCase().includes(i) || (g.language ?? "").toLowerCase().includes(i) || (g.languageCode ?? "").toLowerCase().includes(i)
    )), t.mode === "project-multi" && w && (f = f.filter((g) => g.isSelected)), f;
  }, [y, o, t.mode, w]), N = H(
    () => t.groupByVersification ? Ie(
      c,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ) : xe(c, n),
    [
      c,
      n,
      t.groupByVersification,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ]
  ), b = H(() => {
    if (t.mode !== "project-multi") return [];
    const i = [];
    return t.projects.forEach((f) => {
      const g = t.openTabs.filter(
        (v) => X(v.projectId) === X(f.id)
      );
      if (g.length === 0) {
        i.push({ projectId: f.id });
        return;
      }
      const C = /* @__PURE__ */ new Set();
      g.forEach((v) => {
        C.has(v.scrollGroupId) || (C.add(v.scrollGroupId), i.push({ projectId: f.id, scrollGroupId: v.scrollGroupId }));
      });
    }), i;
  }, [t.mode, t.projects, t.openTabs]), E = (i) => {
    if (i.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(i.projectId, i.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(i.projectId, i.scrollGroupId);
    }
  }, G = (i) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: i.projectId }), a(!1);
        return;
      }
      case "project-multi": {
        const f = t.selection.pairs, g = (v) => v.projectId === i.projectId && v.scrollGroupId === i.scrollGroupId, C = f.some(g) ? f.filter((v) => !g(v)) : [...f, { projectId: i.projectId, scrollGroupId: i.scrollGroupId }];
        t.onChangeSelection({ pairs: C }), C.length === 0 && w && l(!1);
        return;
      }
      case "projectScrollGroup": {
        if (i.isBoundButClosed && i.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(i.projectId, i.scrollGroupId), a(!1);
          return;
        }
        if (i.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: i.projectId,
            scrollGroupId: i.scrollGroupId
          }), a(!1);
          return;
        }
        const f = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: i.projectId, scrollGroupId: f }), t.onOpenProjectInGroup(i.projectId, f), a(!1);
      }
    }
  }, W = () => {
    if (t.mode !== "project-multi") return;
    const i = t.selection.pairs, f = new Set(i.map((C) => `${C.projectId}:${C.scrollGroupId ?? ""}`)), g = [...i];
    b.forEach((C) => {
      const v = `${C.projectId}:${C.scrollGroupId ?? ""}`;
      f.has(v) || (f.add(v), g.push(C));
    }), t.onChangeSelection({ pairs: g });
  }, $ = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), w && l(!1));
  }, D = H(() => {
    switch (t.mode) {
      case "project": {
        const i = t.projects.find((g) => g.id === t.selection.projectId);
        let f = i ? i.shortName : t.buttonPlaceholder ?? "";
        return i && t.triggerLabelFormat === "shortNameAndFullName" && i.fullName && i.fullName !== i.shortName && (f = `${i.shortName} - ${i.fullName}`), { node: f, title: f };
      }
      case "project-multi": {
        const { pairs: i } = t.selection;
        if (i.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        const f = [];
        if (i.forEach((v) => {
          const _ = t.projects.find((Et) => Et.id === v.projectId);
          _ && f.push({ project: _, scrollGroupId: v.scrollGroupId });
        }), f.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        if (t.getSelectedText) {
          const v = t.getSelectedText(f);
          return { node: v, title: v };
        }
        const g = f.map(
          ({ project: v, scrollGroupId: _ }) => _ === void 0 ? v.shortName : `${v.shortName} (${U(_)})`
        ).join(", ");
        if (f.length === 1) return { node: g, title: g };
        const C = f.length.toString();
        return {
          node: /* @__PURE__ */ x(gt, { children: [
            /* @__PURE__ */ s(Q, { variant: "muted", className: "tw:shrink-0", children: C }),
            /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: g })
          ] }),
          title: `${C} ${g}`
        };
      }
      case "projectScrollGroup": {
        const i = t.projects.find((C) => C.id === t.selection.projectId);
        if (!i) {
          const C = t.buttonPlaceholder ?? "";
          return { node: C, title: C };
        }
        const f = t.selection.scrollGroupId;
        if (f === void 0)
          return { node: i.shortName, title: i.shortName };
        const g = `${i.shortName} · ${U(f)}`;
        return { node: g, title: g };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ s(jt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ s(Pt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ s(Bt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const j = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? E : void 0, P = /* @__PURE__ */ x(
    F,
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
        /* @__PURE__ */ s("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof D.node == "string" ? /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: D.node }) : D.node }),
        T
      ]
    }
  ), S = D.title ? /* @__PURE__ */ s(wt, { delayDuration: 400, children: /* @__PURE__ */ x(It, { children: [
    /* @__PURE__ */ s(yt, { asChild: !0, children: /* @__PURE__ */ s(dt, { asChild: !0, children: P }) }),
    /* @__PURE__ */ s(St, { children: D.title })
  ] }) }) : /* @__PURE__ */ s(dt, { asChild: !0, children: P });
  return /* @__PURE__ */ x(ie, { open: e, onOpenChange: m, children: [
    S,
    /* @__PURE__ */ s(
      le,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: p("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ s(wt, { delayDuration: 400, children: /* @__PURE__ */ x(Qt, { shouldFilter: !1, children: [
          /* @__PURE__ */ x("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ s("div", { className: "tw:flex-1", children: /* @__PURE__ */ s(
              te,
              {
                value: o,
                onValueChange: r,
                placeholder: h.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && /* @__PURE__ */ s(
              Ge,
              {
                groupByOpenTabs: n,
                onChangeGroupByOpenTabs: u,
                showSelectedOnly: t.mode === "project-multi" ? w : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? l : void 0,
                strings: h
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ x("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ s(F, { variant: "ghost", size: "sm", onClick: W, children: `${h.selectAll} (${b.length.toString()})` }),
            /* @__PURE__ */ s(F, { variant: "ghost", size: "sm", onClick: $, children: `${h.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ x(ee, { children: [
            /* @__PURE__ */ s(ae, { children: t.commandEmptyMessage ?? "No projects found" }),
            N.map((i, f) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ x(Rt, { children: [
                /* @__PURE__ */ s(re, { heading: Te(i, h), children: i.rows.map((g) => /* @__PURE__ */ s(
                  ke,
                  {
                    row: g,
                    mode: t.mode,
                    strings: h,
                    onClick: G,
                    onOpen: j,
                    selectedRowRef: d
                  },
                  g.rowKey
                )) }),
                f < N.length - 1 && /* @__PURE__ */ s(oe, {})
              ] }, `${i.kind}:${i.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function Te(t, e) {
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
function ga({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: a,
  orientation: o,
  ...r
}) {
  return /* @__PURE__ */ s(
    lt.Group,
    {
      "data-slot": "resizable-panel-group",
      className: p(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: a ? (n) => a(Object.values(n)) : void 0,
      ...r
    }
  );
}
function Y(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function ba({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: a,
  collapsedSize: o,
  ...r
}) {
  return /* @__PURE__ */ s(
    lt.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: Y(t),
      minSize: Y(e),
      maxSize: Y(a),
      collapsedSize: Y(o),
      ...r
    }
  );
}
function Na({
  withHandle: t,
  className: e,
  ...a
}) {
  return /* @__PURE__ */ s(
    lt.Separator,
    {
      "data-slot": "resizable-handle",
      className: p(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...a,
      children: t && /* @__PURE__ */ s("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  Ct as $,
  We as A,
  F as B,
  ne as C,
  la as D,
  Ne as E,
  mt as F,
  ia as G,
  da as H,
  ca as I,
  He as J,
  oe as K,
  Ve as L,
  Qe as M,
  pa as N,
  Nt as O,
  ie as P,
  Xe as Q,
  Ye as R,
  oa as S,
  wt as T,
  Xt as U,
  wa as V,
  ma as W,
  sa as X,
  we as Y,
  Fe as Z,
  fa as _,
  Je as a,
  et as a0,
  at as a1,
  ua as a2,
  aa as a3,
  ta as a4,
  ea as a5,
  Na as a6,
  ba as a7,
  ga as a8,
  he as a9,
  vt as aa,
  Ut as ab,
  qe as b,
  p as c,
  dt as d,
  le as e,
  Qt as f,
  Ue as g,
  ee as h,
  re as i,
  Ze as j,
  se as k,
  Ke as l,
  ra as m,
  te as n,
  ae as o,
  It as p,
  yt as q,
  M as r,
  St as s,
  Q as t,
  pe as u,
  ge as v,
  be as w,
  ha as x,
  na as y,
  ft as z
};
//# sourceMappingURL=resizable-DC8lKmyJ.js.map
