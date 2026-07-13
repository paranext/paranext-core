import { Canon as R } from "@sillsdev/scripture";
import { includes as Z, Section as L, getLocalizeKeyForScrollGroupId as zt } from "platform-bible-utils";
import { jsx as s, jsxs as x, Fragment as vt } from "react/jsx-runtime";
import { cva as J } from "class-variance-authority";
import { Slot as it, Popover as U, Tooltip as H, Separator as Dt, DropdownMenu as E } from "radix-ui";
import tt, { useRef as lt, useState as P, useCallback as A, createContext as Rt, useContext as Mt, useEffect as Lt, useMemo as F, Fragment as Pt } from "react";
import { Filter as At, Check as jt, ArrowRight as Bt, Loader2 as Ot, ChevronsUpDown as $t, ChevronDown as _t } from "lucide-react";
import "@eten-tech-foundation/scripture-utilities";
import { Command as $ } from "cmdk";
import { IconSearch as Ht, IconCheck as dt, IconChevronRight as Jt } from "@tabler/icons-react";
import * as ct from "react-resizable-panels";
import { clsx as Vt } from "clsx";
import { extendTailwindMerge as Ft, twMerge as Kt } from "tailwind-merge";
const Xt = Ft({ prefix: "tw" });
function st(t) {
  const e = [];
  let r = "", o = 0;
  for (let a = 0; a < t.length; a++) {
    const n = t[a];
    n === "[" ? o += 1 : n === "]" && (o -= 1), n === ":" && o === 0 ? (e.push(r), r = "") : r += n;
  }
  return e.push(r), e;
}
function Ut(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = st(t), r = e.findIndex((n) => n.startsWith("-tw-"));
  if (r !== -1) {
    const n = e[r].slice(4);
    return { normalized: `tw:${[...e.filter((l, d) => d !== r), `-${n}`].join(":")}`, original: t };
  }
  const o = e.findIndex((n) => n.startsWith("!tw-"));
  if (o !== -1) {
    const n = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((l, d) => d !== o), `!${n}`].join(":")}`, original: t };
  }
  const a = e[e.length - 1];
  if (a.startsWith("tw-")) {
    const n = a.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), n].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Wt(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const r = st(t);
  if (r[0] !== "tw") return t;
  const o = r.slice(1, -1), a = r[r.length - 1], n = st(e), c = n.some((l) => l.startsWith("-tw-")), w = n.some((l) => l.startsWith("!tw-"));
  if (c && a.startsWith("-")) {
    const l = a.slice(1);
    return [...o, `-tw-${l}`].join(":");
  }
  if (w && a.startsWith("!")) {
    const l = a.slice(1);
    return [...o, `!tw-${l}`].join(":");
  }
  return [...o, `tw-${a}`].join(":");
}
function p(...t) {
  const e = Vt(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Xt(e);
  const r = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), a = [];
  return r.forEach((l) => {
    const d = Ut(l);
    o.set(d.normalized, d.original), a.push(d.normalized);
  }), Kt(a.join(" ")).split(" ").filter(Boolean).map((l) => {
    const d = o.get(l);
    return d ? Wt(l, d) : l;
  }).join(" ");
}
const qt = 600, Ue = 300, xt = 400, We = 450, qe = 500, Zt = 550, It = J(
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
function K({
  className: t,
  variant: e = "default",
  size: r = "default",
  asChild: o = !1,
  ...a
}) {
  const n = o ? it.Root : "button";
  return /* @__PURE__ */ s(
    n,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": r,
      className: p(It({ variant: e, size: r, className: t })),
      ...a
    }
  );
}
const yt = "layoutDirection";
function j() {
  const t = localStorage.getItem(yt);
  return t === "rtl" ? t : "ltr";
}
function Ze(t) {
  localStorage.setItem(yt, t);
}
function Yt({ className: t, ...e }) {
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
const Qt = J(
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
function te({
  className: t,
  align: e = "inline-start",
  ...r
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
        className: p(Qt({ align: e }), t),
        onClick: (o) => {
          var a, n;
          o.target instanceof HTMLElement && o.target.closest("button") || (n = (a = o.currentTarget.parentElement) == null ? void 0 : a.querySelector("input")) == null || n.focus();
        },
        ...r
      }
    )
  );
}
J("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function ee({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    $,
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
function ae({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...r
}) {
  const o = j(), a = tt.useCallback(
    (n) => {
      if (e == null || e(n), n.defaultPrevented || n.key !== " " || n.currentTarget.value !== "") return;
      const c = n.currentTarget.closest("[cmdk-root]"), w = c == null ? void 0 : c.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      w && (n.preventDefault(), n.stopPropagation(), w.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ s("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ x(Yt, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ s(
        $.Input,
        {
          "data-slot": "command-input",
          className: p(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: a,
          ...r
        }
      ),
      /* @__PURE__ */ s(te, { children: /* @__PURE__ */ s(Ht, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function re({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    $.List,
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
function oe({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    $.Empty,
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
function ne({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    $.Group,
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
function se({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ s(
    $.Separator,
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
function ie({
  className: t,
  children: e,
  ...r
}) {
  return /* @__PURE__ */ x(
    $.Item,
    {
      "data-slot": "command-item",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...r,
      children: [
        e,
        /* @__PURE__ */ s(dt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function Ye({ className: t, ...e }) {
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
const Qe = (t, e, r, o, a) => {
  switch (t) {
    case L.OT:
      return e ?? "Old Testament";
    case L.NT:
      return r ?? "New Testament";
    case L.DC:
      return o ?? "Deuterocanon";
    case L.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, ta = (t, e, r, o, a) => {
  switch (t) {
    case L.OT:
      return e ?? "OT";
    case L.NT:
      return r ?? "NT";
    case L.DC:
      return o ?? "DC";
    case L.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function ea(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? R.bookIdToEnglishName(t);
}
function aa(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const le = R.allBookIds.filter(
  (t) => !R.isObsolete(R.bookIdToNumber(t))
), ra = Object.fromEntries(
  le.map((t) => [t, R.bookIdToEnglishName(t)])
);
function oa(t, e, r) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = R.bookIdToEnglishName(t), n = r == null ? void 0 : r.get(t);
  return !!(Z(a.toLowerCase(), o) || Z(t.toLowerCase(), o) || (n ? Z(n.localizedName.toLowerCase(), o) || Z(n.localizedId.toLowerCase(), o) : !1));
}
function de({ ...t }) {
  return /* @__PURE__ */ s(U.Root, { "data-slot": "popover", ...t });
}
function wt({ ...t }) {
  return /* @__PURE__ */ s(U.Trigger, { "data-slot": "popover-trigger", ...t });
}
const St = tt.createContext(null);
function na({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ s(St.Provider, { value: t, children: e });
}
function ce({
  className: t,
  align: e = "center",
  sideOffset: r = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...a
}) {
  const n = j(), c = tt.useContext(St);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ s(U.Portal, { container: c ?? void 0, children: /* @__PURE__ */ s(
      U.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: r,
        className: p(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: qt, ...o },
        dir: n,
        ...a
      }
    ) })
  );
}
function sa({ ...t }) {
  return /* @__PURE__ */ s(U.Anchor, { "data-slot": "popover-anchor", ...t });
}
function ia({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-header",
      className: p("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function la({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "popover-title",
      className: p("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function da({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "p",
    {
      "data-slot": "popover-description",
      className: p("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
var D = {}, ot, mt;
function ue() {
  return mt || (mt = 1, ot = () => {
    const t = "\\ud800-\\udfff", c = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", w = "\\ufe0e\\ufe0f", l = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${t}]`, m = `[${c}]`, h = "\\ud83c[\\udffb-\\udfff]", y = `(?:${m}|${h})`, u = `[^${t}]`, b = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", N = "[\\ud800-\\udbff][\\udc00-\\udfff]", G = "\\u200d", B = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", M = `[${l}]`, O = `${y}?`, C = `[${w}]?`, T = `(?:${G}(?:${[u, b, N].join("|")})${C + O})*`, z = C + O + T, S = `(?:${[`${u}${m}?`, m, b, N, d, M].join("|")})`;
    return new RegExp(`${B}|${h}(?=${h})|${S + z}`, "g");
  }), ot;
}
var ft;
function we() {
  if (ft) return D;
  ft = 1;
  var t = D && D.__importDefault || function(l) {
    return l && l.__esModule ? l : { default: l };
  };
  Object.defineProperty(D, "__esModule", { value: !0 });
  var e = t(ue());
  function r(l) {
    if (typeof l != "string")
      throw new Error("A string is expected as input");
    return l.match(e.default()) || [];
  }
  D.toArray = r;
  function o(l) {
    if (typeof l != "string")
      throw new Error("Input must be a string");
    var d = l.match(e.default());
    return d === null ? 0 : d.length;
  }
  D.length = o;
  function a(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof m == "number" && m < 0 && (m = 0);
    var h = l.match(e.default());
    return h ? h.slice(d, m).join("") : "";
  }
  D.substring = a;
  function n(l, d, m) {
    if (d === void 0 && (d = 0), typeof l != "string")
      throw new Error("Input must be a string");
    var h = o(l);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= h)
      return "";
    d < 0 && (d += h);
    var y;
    typeof m > "u" ? y = h : (typeof m != "number" && (m = parseInt(m, 10)), y = m >= 0 ? m + d : d);
    var u = l.match(e.default());
    return u ? u.slice(d, y).join("") : "";
  }
  D.substr = n;
  function c(l, d, m, h) {
    if (d === void 0 && (d = 16), m === void 0 && (m = "#"), h === void 0 && (h = "right"), typeof l != "string" || typeof d != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(h) === -1)
      throw new Error("Pad position should be either left or right");
    typeof m != "string" && (m = String(m));
    var y = o(l);
    if (y > d)
      return a(l, 0, d);
    if (y < d) {
      var u = m.repeat(d - y);
      return h === "left" ? u + l : l + u;
    }
    return l;
  }
  D.limit = c;
  function w(l, d, m) {
    if (m === void 0 && (m = 0), typeof l != "string")
      throw new Error("Input must be a string");
    if (l === "")
      return d === "" ? 0 : -1;
    m = Number(m), m = isNaN(m) ? 0 : m, d = String(d);
    var h = r(l);
    if (m >= h.length)
      return d === "" ? h.length : -1;
    if (d === "")
      return m;
    var y = r(d), u = !1, b;
    for (b = m; b < h.length; b += 1) {
      for (var N = 0; N < y.length && y[N] === h[b + N]; )
        N += 1;
      if (N === y.length && y[N - 1] === h[b + N - 1]) {
        u = !0;
        break;
      }
    }
    return u ? b : -1;
  }
  return D.indexOf = w, D;
}
we();
const me = [
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
], fe = (t) => {
  var e;
  return ((e = me[t]) == null ? void 0 : e.chapters) ?? -1;
};
function I(t) {
  return `%scrollGroup_${t}%`;
}
const pe = {
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
function ut(t, e) {
  return fe(R.bookIdToNumber(t));
}
function et(t, e, r) {
  const o = R.bookIdToNumber(t);
  let a, n = r === "next" ? 1 / 0 : -1 / 0;
  return e.forEach((c) => {
    const w = R.bookIdToNumber(c);
    (r === "next" ? w > o && w < n : w < o && w > n) && (a = c, n = w);
  }), a;
}
function ca(t, e, r) {
  const { book: o, chapterNum: a } = t;
  if (e.includes(o) && a > 1)
    return { book: o, chapterNum: a - 1, verseNum: 1 };
  const n = et(o, e, "previous");
  if (n)
    return {
      book: n,
      chapterNum: Math.max(ut(n), 1),
      verseNum: 1
    };
}
function ua(t, e, r) {
  const { book: o, chapterNum: a } = t;
  if (e.includes(o) && a < ut(o))
    return { book: o, chapterNum: a + 1, verseNum: 1 };
  const n = et(o, e, "next");
  if (n)
    return { book: n, chapterNum: 1, verseNum: 1 };
}
function wa(t, e, r) {
  const { book: o, chapterNum: a, verseNum: n } = t;
  if (e === void 0 || e.includes(o))
    return n > 1 ? { book: o, chapterNum: a, verseNum: n - 1 } : n === 1 && a === 1 ? { book: o, chapterNum: 1, verseNum: 0 } : { book: o, chapterNum: a, verseNum: 0 };
  if (e === void 0) return;
  const c = et(o, e, "previous");
  if (!c) return;
  const w = Math.max(ut(c), 1);
  return { book: c, chapterNum: w, verseNum: Math.max(1, 1) };
}
function ma(t, e, r) {
  const { book: o, chapterNum: a, verseNum: n } = t;
  if (e === void 0 || e.includes(o))
    return { book: o, chapterNum: a, verseNum: n + 1 };
  const c = et(o, e, "next");
  if (c)
    return { book: c, chapterNum: 1, verseNum: 1 };
}
function fa(t, e) {
  return t === (e === "rtl" ? "left" : "right") ? "forward" : "back";
}
function pt({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ s(
    H.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function kt({ ...t }) {
  return /* @__PURE__ */ s(H.Root, { "data-slot": "tooltip", ...t });
}
function Ct({
  className: t,
  variant: e,
  ...r
}) {
  return /* @__PURE__ */ s(
    H.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? p(It({ variant: e }), t) : t,
      ...r
    }
  );
}
function Et({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: r,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: o = !0,
  children: a,
  ...n
}) {
  return /* @__PURE__ */ s(H.Portal, { children: /* @__PURE__ */ x(
    H.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: Zt, ...r },
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...n,
      children: [
        a,
        o && /* @__PURE__ */ s(H.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function he({
  className: t,
  orientation: e = "horizontal",
  decorative: r = !0,
  ...o
}) {
  return /* @__PURE__ */ s(
    Dt.Root,
    {
      "data-slot": "separator",
      decorative: r,
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
const ge = J(
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
function pa({
  className: t,
  orientation: e,
  ...r
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: p(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        ge({ orientation: e }),
        t
      ),
      ...r
    }
  );
}
function ha({
  className: t,
  asChild: e = !1,
  ...r
}) {
  const o = e ? it.Root : "div";
  return /* @__PURE__ */ s(
    o,
    {
      className: p(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        t
      ),
      ...r
    }
  );
}
function ga({
  className: t,
  orientation: e = "vertical",
  ...r
}) {
  return /* @__PURE__ */ s(
    he,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: p(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        t
      ),
      ...r
    }
  );
}
function ba() {
  return /Macintosh/i.test(navigator.userAgent);
}
function Na() {
  return /Windows/i.test(navigator.userAgent);
}
const be = ["input", "select", "textarea", "button"], Ne = ["button", "textbox"], va = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: r,
  onCharacterPress: o
}) => {
  const a = lt(null), [n, c] = P(void 0), [w, l] = P(void 0), d = A(
    (u) => {
      c(u);
      const b = t.find((G) => G.id === u);
      b && (e == null || e(b));
      const N = document.getElementById(u);
      N && (N.scrollIntoView({ block: "center" }), N.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), m = A(
    (u) => {
      const b = t.find((N) => N.id === u);
      b && (l((N) => N === u ? void 0 : u), r == null || r(b));
    },
    [r, t]
  ), h = (u) => {
    if (!u) return !1;
    const b = u.tagName.toLowerCase();
    if (u.isContentEditable || be.includes(b)) return !0;
    const N = u.getAttribute("role");
    if (N && Ne.includes(N)) return !0;
    const G = u.getAttribute("tabindex");
    return G !== void 0 && G !== "-1";
  }, y = A(
    (u) => {
      var _;
      const b = u.target, N = (S) => S ? document.getElementById(S) : void 0, G = N(w), B = N(n);
      if (!!(G && b && G.contains(b) && b !== G) && h(b)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !b.isContentEditable) {
          if (w) {
            u.preventDefault(), u.stopPropagation();
            const S = t.find((i) => i.id === w);
            S && d(S.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!G) return;
          const S = Array.from(
            G.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (S.length === 0) return;
          const i = S.findIndex((g) => g === b);
          if (i === -1) return;
          let f;
          u.key === "ArrowDown" ? f = Math.min(i + 1, S.length - 1) : f = Math.max(i - 1, 0), f !== i && (u.preventDefault(), u.stopPropagation(), (_ = S[f]) == null || _.focus());
          return;
        }
        return;
      }
      const C = t.findIndex((S) => S.id === n);
      let T = C;
      switch (u.key) {
        case "ArrowDown":
          T = Math.min(C + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          T = Math.max(C - 1, 0), u.preventDefault();
          break;
        case "Home":
          T = 0, u.preventDefault();
          break;
        case "End":
          T = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          n && m(n), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const S = B;
          if (S) {
            const i = S.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), f = S.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), g = i ?? f;
            if (g) {
              u.preventDefault(), g.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (h(b) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const z = t[T];
      z && d(z.id);
    },
    [t, d, n, w, m, o]
  );
  return {
    listboxRef: a,
    activeId: n,
    selectedId: w,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: y,
    /** Focus an option by its ID */
    focusOption: d
  };
}, ve = J(
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
function Q({ className: t, variant: e = "default", asChild: r = !1, ...o }) {
  const a = r ? it.Root : "span";
  return /* @__PURE__ */ s(
    a,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: p(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ve({ variant: e }),
        t
      ),
      ...o
    }
  );
}
const Gt = Rt(void 0);
function at() {
  const t = Mt(Gt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const rt = J("", {
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
function xe({ variant: t = "default", ...e }) {
  const r = j(), o = tt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ s(Gt.Provider, { value: o, children: /* @__PURE__ */ s(E.Root, { "data-slot": "dropdown-menu", dir: r, ...e }) });
}
function xa({
  ...t
}) {
  return /* @__PURE__ */ s(E.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ie({
  ...t
}) {
  return /* @__PURE__ */ s(E.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function ye({
  className: t,
  align: e = "start",
  sideOffset: r = 4,
  children: o,
  ...a
}) {
  const n = j();
  return /* @__PURE__ */ s(E.Portal, { children: /* @__PURE__ */ s(
    E.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: r,
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
      ...a,
      children: /* @__PURE__ */ s("div", { dir: n, children: o })
    }
  ) });
}
function Ia({ ...t }) {
  return /* @__PURE__ */ s(E.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function ya({
  className: t,
  inset: e,
  variant: r = "default",
  ...o
}) {
  const a = j(), n = at();
  return /* @__PURE__ */ s(
    E.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": r,
      className: p(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: n.variant })
      ),
      dir: a,
      ...o
    }
  );
}
function ht({
  className: t,
  children: e,
  checked: r,
  inset: o,
  ...a
}) {
  const n = j(), c = at();
  return /* @__PURE__ */ x(
    E.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: p(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: c.variant })
      ),
      checked: r,
      dir: n,
      ...a,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ s(E.ItemIndicator, { children: /* @__PURE__ */ s(dt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Sa({
  ...t
}) {
  return /* @__PURE__ */ s(E.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function ka({
  className: t,
  children: e,
  inset: r,
  ...o
}) {
  const a = j(), n = at();
  return /* @__PURE__ */ x(
    E.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": r,
      className: p(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: n.variant })
      ),
      dir: a,
      ...o,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ s(E.ItemIndicator, { children: /* @__PURE__ */ s(dt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function gt({ className: t, inset: e, ...r }) {
  return /* @__PURE__ */ s(
    E.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: p(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...r
    }
  );
}
function Se({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    E.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: p("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function Ca({ className: t, ...e }) {
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
function Ea({ ...t }) {
  return /* @__PURE__ */ s(E.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function Ga({
  className: t,
  inset: e,
  children: r,
  ...o
}) {
  const a = at();
  return /* @__PURE__ */ x(
    E.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: p(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: a.variant })
      ),
      ...o,
      children: [
        r,
        /* @__PURE__ */ s(Jt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ta({ className: t, children: e, ...r }) {
  const o = j();
  return /* @__PURE__ */ s(
    E.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: p(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...r,
      children: /* @__PURE__ */ s("div", { dir: o, children: e })
    }
  );
}
function za({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      "data-slot": "skeleton",
      className: p("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function Da({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "kbd",
    {
      "data-slot": "kbd",
      className: p(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        t
      ),
      ...e
    }
  );
}
function Ra({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: p("pr-twp tw:inline-flex tw:items-center tw:gap-1", t),
      ...e
    }
  );
}
function ke() {
  const [t, e] = P(!1), r = lt(null), o = A(() => {
    const n = r.current;
    n && n.scrollWidth > n.clientWidth && e(!0);
  }, []), a = A(() => e(!1), []);
  return { ref: r, open: t, onPointerEnter: o, onPointerLeave: a };
}
function W(t) {
  return t.toUpperCase();
}
function Ce(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((r) => {
    const o = W(r.projectId), a = e.get(o), n = {
      scrollGroupId: r.scrollGroupId,
      scrollGroupScrRefLabel: r.scrollGroupScrRefLabel
    };
    a ? a.some((c) => c.scrollGroupId === r.scrollGroupId) || a.push(n) : e.set(o, [n]);
  }), e.forEach((r) => r.sort((o, a) => o.scrollGroupId - a.scrollGroupId)), e;
}
function bt(t, e, r) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === r);
}
function nt(t) {
  const e = Ce(t.openTabs);
  if (t.mode === "project") {
    const a = t.selection.projectId;
    return t.projects.map((n) => {
      const c = e.get(W(n.id)) ?? [];
      return {
        rowKey: n.id,
        projectId: n.id,
        shortName: n.shortName,
        fullName: n.fullName,
        language: n.language,
        languageCode: n.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: c.map((w) => w.scrollGroupId),
        isSelected: a === n.id,
        isMuted: c.length === 0,
        isBoundButClosed: !1,
        isDisabled: n.isDisabled === !0,
        disabledReason: n.disabledReason,
        versificationId: n.versificationId,
        versificationName: n.versificationName
      };
    });
  }
  let r = [];
  t.mode === "project-multi" ? r = t.selection.pairs : t.selection.projectId !== void 0 && (r = [
    {
      projectId: t.selection.projectId,
      scrollGroupId: t.selection.scrollGroupId
    }
  ]);
  const o = [];
  return t.projects.forEach((a) => {
    const n = e.get(W(a.id));
    if (!n || n.length === 0) {
      o.push({
        rowKey: `project:${a.id}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        language: a.language,
        languageCode: a.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: bt(r, a.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        versificationId: a.versificationId,
        versificationName: a.versificationName
      });
      return;
    }
    n.forEach((c) => {
      o.push({
        rowKey: `tab:${a.id}:${c.scrollGroupId}`,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        language: a.language,
        languageCode: a.languageCode,
        scrollGroupId: c.scrollGroupId,
        scrollGroupScrRefLabel: c.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: bt(r, a.id, c.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: a.isDisabled === !0,
        disabledReason: a.disabledReason,
        versificationId: a.versificationId,
        versificationName: a.versificationName
      });
    });
  }), r.forEach((a) => {
    if (a.scrollGroupId === void 0 || o.some((c) => c.projectId === a.projectId && c.scrollGroupId === a.scrollGroupId))
      return;
    const n = t.projects.find((c) => c.id === a.projectId);
    n && o.push({
      rowKey: `closed:${n.id}:${a.scrollGroupId}`,
      projectId: n.id,
      shortName: n.shortName,
      fullName: n.fullName,
      language: n.language,
      languageCode: n.languageCode,
      scrollGroupId: a.scrollGroupId,
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
function Nt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function X(t, e) {
  const r = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (r !== 0) return r;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, a = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - a;
}
function Ee(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(X) }];
  const r = t.filter(Nt).sort(X), o = t.filter((n) => !Nt(n)).sort(X);
  if (r.length === 0)
    return [{ kind: "flat", rows: o }];
  const a = [{ kind: "openTabs", rows: r }];
  return o.length > 0 && a.push({ kind: "other", rows: o }), a;
}
function Ge(t, e, r) {
  const o = /* @__PURE__ */ new Map(), a = [];
  t.forEach((w) => {
    const l = w.versificationId;
    if (l === void 0 || l === "") {
      a.push(w);
      return;
    }
    const d = w.versificationName ?? l, m = o.get(l);
    m ? (m.rows.push(w), !m.label && w.versificationName && (m.label = w.versificationName)) : o.set(l, { label: d, rows: [w] });
  });
  const n = [...o.entries()].map(([w, { label: l, rows: d }]) => ({
    id: w,
    label: l,
    rows: [...d].sort(X)
  }));
  n.sort((w, l) => w.id === e ? -1 : l.id === e ? 1 : w.label.localeCompare(l.label, void 0, { sensitivity: "base" }));
  const c = n.map(({ id: w, label: l, rows: d }) => ({
    kind: "versification",
    rows: d,
    label: l,
    isPriority: w === e
  }));
  return a.length > 0 && c.push({
    kind: "versification",
    rows: [...a].sort(X),
    label: r,
    isPriority: !1
  }), c;
}
const Te = {
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
function ze(t) {
  return { ...Te, ...t };
}
function q(t) {
  return pe[zt(t)] ?? String(t);
}
const De = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Re({ scrollGroupId: t, isBoundButClosed: e }) {
  const r = q(t);
  return e ? /* @__PURE__ */ s(
    Q,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: De,
      children: r
    }
  ) : /* @__PURE__ */ s(Q, { variant: "secondary", children: r });
}
function Me({ row: t, mode: e, strings: r, onClick: o, onOpen: a, selectedRowRef: n }) {
  const {
    ref: c,
    open: w,
    onPointerEnter: l,
    onPointerLeave: d
  } = ke(), [m, h] = P(!1), y = !!(t.language || t.languageCode), u = y || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, b = w || m, N = A(() => {
    if (u) {
      h(!0);
      return;
    }
    l();
  }, [u, l]), G = A(() => {
    h(!1), d();
  }, [d]), B = /* @__PURE__ */ s(jt, { className: p("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let M;
  e === "project" ? t.openGroups.length > 0 && (M = /* @__PURE__ */ s("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((z) => /* @__PURE__ */ s(Q, { variant: "secondary", children: q(z) }, z)) })) : t.scrollGroupId !== void 0 && (M = /* @__PURE__ */ x("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ s(
      Re,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && a && /* @__PURE__ */ x(
      K,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (z) => {
          z.stopPropagation(), a(t);
        },
        onMouseDown: (z) => z.stopPropagation(),
        "aria-label": r.openButtonLabel,
        title: r.openButtonLabel,
        children: [
          /* @__PURE__ */ s(Bt, { className: "tw:h-3 tw:w-3" }),
          r.openButtonLabel
        ]
      }
    )
  ] }));
  const O = /* @__PURE__ */ x(
    ie,
    {
      ref: t.isSelected ? n : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: N,
      onPointerLeave: G,
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ s("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: B }),
        /* @__PURE__ */ x(
          "span",
          {
            ref: c,
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
  ), C = t.scrollGroupId !== void 0 ? q(t.scrollGroupId) : void 0, T = t.isBoundButClosed && C ? r.boundButClosedTooltip.replace("{group}", C) : void 0;
  return /* @__PURE__ */ x(kt, { open: b, delayDuration: 400, children: [
    /* @__PURE__ */ s(Ct, { asChild: !0, children: O }),
    /* @__PURE__ */ x(
      Et,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: xt },
        children: [
          /* @__PURE__ */ s("div", { className: "tw:font-semibold", children: t.fullName }),
          y && /* @__PURE__ */ x("div", { className: "tw:text-sm", children: [
            t.language,
            t.languageCode && /* @__PURE__ */ x("span", { className: "tw:text-muted-foreground", children: [
              " (",
              t.languageCode,
              ")"
            ] })
          ] }),
          !t.isBoundButClosed && t.scrollGroupScrRefLabel && C && /* @__PURE__ */ x("div", { className: "tw:text-sm", children: [
            t.scrollGroupScrRefLabel,
            /* @__PURE__ */ x("span", { className: "tw:text-muted-foreground", children: [
              " (",
              C,
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
function Le({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: r,
  onChangeShowSelectedOnly: o,
  strings: a
}) {
  const n = !!r;
  return /* @__PURE__ */ x(xe, { children: [
    /* @__PURE__ */ s(Ie, { asChild: !0, children: /* @__PURE__ */ s(
      K,
      {
        variant: "ghost",
        size: "sm",
        className: p(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          n && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": a.filterAriaLabel,
        "aria-pressed": n,
        title: a.filterAriaLabel,
        onMouseDown: (c) => c.preventDefault(),
        children: /* @__PURE__ */ s(At, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ x(ye, { align: "end", className: "tw:w-56", style: { zIndex: xt }, children: [
      /* @__PURE__ */ s(gt, { children: a.groupSectionLabel }),
      /* @__PURE__ */ s(
        ht,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (c) => c.preventDefault(),
          children: a.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ x(vt, { children: [
        /* @__PURE__ */ s(Se, {}),
        /* @__PURE__ */ s(gt, { children: a.filterSectionLabel }),
        /* @__PURE__ */ s(
          ht,
          {
            checked: !!r,
            onCheckedChange: o,
            onSelect: (c) => c.preventDefault(),
            children: a.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Ma(t) {
  const [e, r] = P(!1), [o, a] = P(""), [n, c] = P(t.defaultGroupByOpenTabs ?? !0), [w, l] = P(!1), d = lt(null), m = A((i) => {
    r(i), i || a("");
  }, []);
  Lt(() => {
    if (!e) return;
    const i = window.requestAnimationFrame(() => {
      const f = d.current;
      f && f.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(i);
  }, [e]);
  const h = ze(t.localizedStrings), y = F(() => t.mode === "project" ? nt({
    mode: "project",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : t.mode === "project-multi" ? nt({
    mode: "project-multi",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }) : nt({
    mode: "projectScrollGroup",
    projects: t.projects,
    openTabs: t.openTabs,
    selection: t.selection
  }), [t.mode, t.projects, t.openTabs, t.selection]), u = F(() => {
    const i = o.trim().toLowerCase();
    let f = y;
    return i && (f = f.filter(
      (g) => g.shortName.toLowerCase().includes(i) || g.fullName.toLowerCase().includes(i) || (g.language ?? "").toLowerCase().includes(i) || (g.languageCode ?? "").toLowerCase().includes(i)
    )), t.mode === "project-multi" && w && (f = f.filter((g) => g.isSelected)), f;
  }, [y, o, t.mode, w]), b = F(
    () => t.groupByVersification ? Ge(
      u,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ) : Ee(u, n),
    [
      u,
      n,
      t.groupByVersification,
      t.priorityVersificationId,
      h.versificationUnknownSectionHeading
    ]
  ), N = F(() => {
    if (t.mode !== "project-multi") return [];
    const i = [];
    return t.projects.forEach((f) => {
      const g = t.openTabs.filter(
        (v) => W(v.projectId) === W(f.id)
      );
      if (g.length === 0) {
        i.push({ projectId: f.id });
        return;
      }
      const k = /* @__PURE__ */ new Set();
      g.forEach((v) => {
        k.has(v.scrollGroupId) || (k.add(v.scrollGroupId), i.push({ projectId: f.id, scrollGroupId: v.scrollGroupId }));
      });
    }), i;
  }, [t.mode, t.projects, t.openTabs]), G = (i) => {
    if (i.scrollGroupId !== void 0) {
      if (t.mode === "projectScrollGroup") {
        t.onOpenProjectInGroup(i.projectId, i.scrollGroupId);
        return;
      }
      t.mode === "project-multi" && t.onOpenProjectInGroup && t.onOpenProjectInGroup(i.projectId, i.scrollGroupId);
    }
  }, B = (i) => {
    switch (t.mode) {
      case "project": {
        t.onChangeSelection({ projectId: i.projectId }), r(!1);
        return;
      }
      case "project-multi": {
        const f = t.selection.pairs, g = (v) => v.projectId === i.projectId && v.scrollGroupId === i.scrollGroupId, k = f.some(g) ? f.filter((v) => !g(v)) : [...f, { projectId: i.projectId, scrollGroupId: i.scrollGroupId }];
        t.onChangeSelection({ pairs: k }), k.length === 0 && w && l(!1);
        return;
      }
      case "projectScrollGroup": {
        if (i.isBoundButClosed && i.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(i.projectId, i.scrollGroupId), r(!1);
          return;
        }
        if (i.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: i.projectId,
            scrollGroupId: i.scrollGroupId
          }), r(!1);
          return;
        }
        const f = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: i.projectId, scrollGroupId: f }), t.onOpenProjectInGroup(i.projectId, f), r(!1);
      }
    }
  }, M = () => {
    if (t.mode !== "project-multi") return;
    const i = t.selection.pairs, f = new Set(i.map((k) => `${k.projectId}:${k.scrollGroupId ?? ""}`)), g = [...i];
    N.forEach((k) => {
      const v = `${k.projectId}:${k.scrollGroupId ?? ""}`;
      f.has(v) || (f.add(v), g.push(k));
    }), t.onChangeSelection({ pairs: g });
  }, O = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), w && l(!1));
  }, C = F(() => {
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
          const V = t.projects.find((Tt) => Tt.id === v.projectId);
          V && f.push({ project: V, scrollGroupId: v.scrollGroupId });
        }), f.length === 0) {
          const v = t.buttonPlaceholder ?? "";
          return { node: v, title: v };
        }
        if (t.getSelectedText) {
          const v = t.getSelectedText(f);
          return { node: v, title: v };
        }
        const g = f.map(
          ({ project: v, scrollGroupId: V }) => V === void 0 ? v.shortName : `${v.shortName} (${q(V)})`
        ).join(", ");
        if (f.length === 1) return { node: g, title: g };
        const k = f.length.toString();
        return {
          node: /* @__PURE__ */ x(vt, { children: [
            /* @__PURE__ */ s(Q, { variant: "muted", className: "tw:shrink-0", children: k }),
            /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: g })
          ] }),
          title: `${k} ${g}`
        };
      }
      case "projectScrollGroup": {
        const i = t.projects.find((k) => k.id === t.selection.projectId);
        if (!i) {
          const k = t.buttonPlaceholder ?? "";
          return { node: k, title: k };
        }
        const f = t.selection.scrollGroupId;
        if (f === void 0)
          return { node: i.shortName, title: i.shortName };
        const g = `${i.shortName} · ${q(f)}`;
        return { node: g, title: g };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let T;
  t.isLoading ? T = /* @__PURE__ */ s(Ot, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? T = void 0 : t.mode === "project-multi" ? T = /* @__PURE__ */ s($t, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : T = /* @__PURE__ */ s(_t, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const z = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? G : void 0, _ = /* @__PURE__ */ x(
    K,
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
        /* @__PURE__ */ s("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof C.node == "string" ? /* @__PURE__ */ s("span", { className: "tw:min-w-0 tw:truncate", children: C.node }) : C.node }),
        T
      ]
    }
  ), S = C.title ? /* @__PURE__ */ s(pt, { delayDuration: 400, children: /* @__PURE__ */ x(kt, { children: [
    /* @__PURE__ */ s(Ct, { asChild: !0, children: /* @__PURE__ */ s(wt, { asChild: !0, children: _ }) }),
    /* @__PURE__ */ s(Et, { children: C.title })
  ] }) }) : /* @__PURE__ */ s(wt, { asChild: !0, children: _ });
  return /* @__PURE__ */ x(de, { open: e, onOpenChange: m, children: [
    S,
    /* @__PURE__ */ s(
      ce,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: p("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ s(pt, { delayDuration: 400, children: /* @__PURE__ */ x(ee, { shouldFilter: !1, children: [
          /* @__PURE__ */ x("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ s("div", { className: "tw:flex-1", children: /* @__PURE__ */ s(
              ae,
              {
                value: o,
                onValueChange: a,
                placeholder: h.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && /* @__PURE__ */ s(
              Le,
              {
                groupByOpenTabs: n,
                onChangeGroupByOpenTabs: c,
                showSelectedOnly: t.mode === "project-multi" ? w : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? l : void 0,
                strings: h
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ x("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ s(K, { variant: "ghost", size: "sm", onClick: M, children: `${h.selectAll} (${N.length.toString()})` }),
            /* @__PURE__ */ s(K, { variant: "ghost", size: "sm", onClick: O, children: `${h.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ x(re, { children: [
            /* @__PURE__ */ s(oe, { children: t.commandEmptyMessage ?? "No projects found" }),
            b.map((i, f) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ x(Pt, { children: [
                /* @__PURE__ */ s(ne, { heading: Pe(i, h), children: i.rows.map((g) => /* @__PURE__ */ s(
                  Me,
                  {
                    row: g,
                    mode: t.mode,
                    strings: h,
                    onClick: B,
                    onOpen: z,
                    selectedRowRef: d
                  },
                  g.rowKey
                )) }),
                f < b.length - 1 && /* @__PURE__ */ s(se, {})
              ] }, `${i.kind}:${i.label ?? ""}`)
            ))
          ] })
        ] }) })
      }
    )
  ] });
}
function Pe(t, e) {
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
function La({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: r,
  orientation: o,
  ...a
}) {
  return /* @__PURE__ */ s(
    ct.Group,
    {
      "data-slot": "resizable-panel-group",
      className: p(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: r ? (n) => r(Object.values(n)) : void 0,
      ...a
    }
  );
}
function Y(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Pa({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: r,
  collapsedSize: o,
  ...a
}) {
  return /* @__PURE__ */ s(
    ct.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: Y(t),
      minSize: Y(e),
      maxSize: Y(r),
      collapsedSize: Y(o),
      ...a
    }
  );
}
function Aa({
  withHandle: t,
  className: e,
  ...r
}) {
  return /* @__PURE__ */ s(
    ct.Separator,
    {
      "data-slot": "resizable-handle",
      className: p(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...r,
      children: t && /* @__PURE__ */ s("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  na as $,
  ra as A,
  K as B,
  ie as C,
  ya as D,
  ma as E,
  Ie as F,
  ye as G,
  za as H,
  va as I,
  gt as J,
  Se as K,
  ht as L,
  Ia as M,
  Sa as N,
  ka as O,
  de as P,
  Da as Q,
  Ue as R,
  he as S,
  pt as T,
  se as U,
  Ye as V,
  sa as W,
  Ma as X,
  xt as Y,
  qe as Z,
  ta as _,
  We as a,
  pe as a0,
  qt as a1,
  Ea as a2,
  Ga as a3,
  xa as a4,
  Ta as a5,
  Gt as a6,
  at as a7,
  rt as a8,
  ha as a9,
  Ca as aa,
  Ra as ab,
  da as ac,
  ia as ad,
  la as ae,
  Aa as af,
  Pa as ag,
  La as ah,
  ve as ai,
  ge as aj,
  It as ak,
  Na as al,
  ke as am,
  fa as an,
  Zt as ao,
  Ze as ap,
  aa as b,
  p as c,
  wt as d,
  ce as e,
  ee as f,
  ea as g,
  re as h,
  ne as i,
  ca as j,
  ua as k,
  wa as l,
  oa as m,
  le as n,
  Qe as o,
  ae as p,
  oe as q,
  j as r,
  pa as s,
  kt as t,
  Ct as u,
  Et as v,
  ga as w,
  ba as x,
  Q as y,
  xe as z
};
//# sourceMappingURL=resizable-20ofR_h6.js.map
