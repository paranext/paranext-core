import { ChevronsLeft as ut, ChevronsRight as wt, ChevronLeft as ft, ChevronRight as mt, Filter as Lt, Check as _t, ArrowRight as Pt, Loader2 as $t, ChevronsUpDown as Rt, ChevronDown as At } from "lucide-react";
import nt, { useCallback as O, useMemo as M, useRef as dt, useState as P, createContext as Mt, useContext as Bt, useEffect as Vt, Fragment as Ft } from "react";
import { Canon as T } from "@sillsdev/scripture";
import { includes as Q, Section as L, getChaptersForBook as Ht, getLocalizeKeyForScrollGroupId as Kt } from "platform-bible-utils";
import { jsx as i, jsxs as N, Fragment as Ct } from "react/jsx-runtime";
import { Slot as kt, Popover as W, Tooltip as B, Separator as Ut, DropdownMenu as E } from "radix-ui";
import "@eten-tech-foundation/scripture-utilities";
import { cva as Z } from "class-variance-authority";
import { Command as $ } from "cmdk";
import { IconSearch as Wt, IconCheck as lt, IconChevronRight as qt } from "@tabler/icons-react";
import * as ct from "react-resizable-panels";
import { clsx as Yt } from "clsx";
import { extendTailwindMerge as Zt, twMerge as Xt } from "tailwind-merge";
const Qt = Zt({ prefix: "tw" });
function st(t) {
  const e = [];
  let n = "", o = 0;
  for (let r = 0; r < t.length; r++) {
    const a = t[r];
    a === "[" ? o += 1 : a === "]" && (o -= 1), a === ":" && o === 0 ? (e.push(n), n = "") : n += a;
  }
  return e.push(n), e;
}
function Jt(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = st(t), n = e.findIndex((a) => a.startsWith("-tw-"));
  if (n !== -1) {
    const a = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((s, d) => d !== n), `-${a}`].join(":")}`, original: t };
  }
  const o = e.findIndex((a) => a.startsWith("!tw-"));
  if (o !== -1) {
    const a = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((s, d) => d !== o), `!${a}`].join(":")}`, original: t };
  }
  const r = e[e.length - 1];
  if (r.startsWith("tw-")) {
    const a = r.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), a].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function te(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const n = st(t);
  if (n[0] !== "tw") return t;
  const o = n.slice(1, -1), r = n[n.length - 1], a = st(e), f = a.some((s) => s.startsWith("-tw-")), w = a.some((s) => s.startsWith("!tw-"));
  if (f && r.startsWith("-")) {
    const s = r.slice(1);
    return [...o, `-tw-${s}`].join(":");
  }
  if (w && r.startsWith("!")) {
    const s = r.slice(1);
    return [...o, `!tw-${s}`].join(":");
  }
  return [...o, `tw-${r}`].join(":");
}
function v(...t) {
  const e = Yt(t);
  if (!e) return e;
  if (e.indexOf("tw-") === -1) return Qt(e);
  const n = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), r = [];
  return n.forEach((s) => {
    const d = Jt(s);
    o.set(d.normalized, d.original), r.push(d.normalized);
  }), Xt(r.join(" ")).split(" ").filter(Boolean).map((s) => {
    const d = o.get(s);
    return d ? te(s, d) : s;
  }).join(" ");
}
const ee = 600, en = 300, St = 400, nn = 450, on = 500, ne = 550, Et = Z(
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
  size: n = "default",
  asChild: o = !1,
  ...r
}) {
  const a = o ? kt.Root : "button";
  return /* @__PURE__ */ i(
    a,
    {
      "data-slot": "button",
      "data-variant": e,
      "data-size": n,
      className: v(Et({ variant: e, size: n, className: t })),
      ...r
    }
  );
}
const oe = "layoutDirection";
function _() {
  const t = localStorage.getItem(oe);
  return t === "rtl" ? t : "ltr";
}
function re({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        t
      ),
      ...e
    }
  );
}
const ae = Z(
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
function ie({
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
    /* @__PURE__ */ i(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": e,
        className: v(ae({ align: e }), t),
        onClick: (o) => {
          var r, a;
          o.target instanceof HTMLElement && o.target.closest("button") || (a = (r = o.currentTarget.parentElement) == null ? void 0 : r.querySelector("input")) == null || a.focus();
        },
        ...n
      }
    )
  );
}
Z("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
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
function se({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    $,
    {
      "data-slot": "command",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        t
      ),
      ...e
    }
  );
}
function de({
  className: t,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown: e,
  ...n
}) {
  const o = _(), r = nt.useCallback(
    (a) => {
      if (e == null || e(a), a.defaultPrevented || a.key !== " " || a.currentTarget.value !== "") return;
      const f = a.currentTarget.closest("[cmdk-root]"), w = f == null ? void 0 : f.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      w && (a.preventDefault(), a.stopPropagation(), w.click());
    },
    [e]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ i("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir: o, children: /* @__PURE__ */ N(re, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ i(
        $.Input,
        {
          "data-slot": "command-input",
          className: v(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            t
          ),
          onKeyDown: r,
          ...n
        }
      ),
      /* @__PURE__ */ i(ie, { children: /* @__PURE__ */ i(Wt, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function le({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    $.List,
    {
      "data-slot": "command-list",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:no-scrollbar tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        t
      ),
      ...e
    }
  );
}
function ce({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ i(
    $.Empty,
    {
      "data-slot": "command-empty",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        t
      ),
      ...e
    }
  );
}
function ue({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ i(
    $.Group,
    {
      "data-slot": "command-group",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...e
    }
  );
}
function we({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ i(
    $.Separator,
    {
      "data-slot": "command-separator",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        t
      ),
      ...e
    }
  );
}
function fe({
  className: t,
  children: e,
  ...n
}) {
  return /* @__PURE__ */ N(
    $.Item,
    {
      "data-slot": "command-item",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        t
      ),
      ...n,
      children: [
        e,
        /* @__PURE__ */ i(lt, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function rn({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      "data-slot": "command-shortcut",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        t
      ),
      ...e
    }
  );
}
const an = (t, e, n, o, r) => {
  switch (t) {
    case L.OT:
      return e ?? "Old Testament";
    case L.NT:
      return n ?? "New Testament";
    case L.DC:
      return o ?? "Deuterocanon";
    case L.Extra:
      return r ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, sn = (t, e, n, o, r) => {
  switch (t) {
    case L.OT:
      return e ?? "OT";
    case L.NT:
      return n ?? "NT";
    case L.DC:
      return o ?? "DC";
    case L.Extra:
      return r ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function dn(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? T.bookIdToEnglishName(t);
}
function ln(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const me = T.allBookIds.filter(
  (t) => !T.isObsolete(T.bookIdToNumber(t))
), pt = Object.fromEntries(
  me.map((t) => [t, T.bookIdToEnglishName(t)])
);
function pe(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const r = T.bookIdToEnglishName(t), a = n == null ? void 0 : n.get(t);
  return !!(Q(r.toLowerCase(), o) || Q(t.toLowerCase(), o) || (a ? Q(a.localizedName.toLowerCase(), o) || Q(a.localizedId.toLowerCase(), o) : !1));
}
function ge({ ...t }) {
  return /* @__PURE__ */ i(W.Root, { "data-slot": "popover", ...t });
}
function gt({ ...t }) {
  return /* @__PURE__ */ i(W.Trigger, { "data-slot": "popover-trigger", ...t });
}
const Gt = nt.createContext(null);
function cn({
  container: t,
  children: e
}) {
  return /* @__PURE__ */ i(Gt.Provider, { value: t, children: e });
}
function he({
  className: t,
  align: e = "center",
  sideOffset: n = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style: o,
  ...r
}) {
  const a = _(), f = nt.useContext(Gt);
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ i(W.Portal, { container: f ?? void 0, children: /* @__PURE__ */ i(
      W.Content,
      {
        "data-slot": "popover-content",
        align: e,
        sideOffset: n,
        className: v(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          t
        ),
        style: { zIndex: ee, ...o },
        dir: a,
        ...r
      }
    ) })
  );
}
function un({ ...t }) {
  return /* @__PURE__ */ i(W.Anchor, { "data-slot": "popover-anchor", ...t });
}
function wn({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "popover-header",
      className: v("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", t),
      ...e
    }
  );
}
function fn({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "popover-title",
      className: v("pr-twp tw:font-medium", t),
      ...e
    }
  );
}
function mn({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "p",
    {
      "data-slot": "popover-description",
      className: v("pr-twp tw:text-muted-foreground", t),
      ...e
    }
  );
}
const tt = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, be = [
  tt.BOOK_ONLY,
  tt.BOOK_CHAPTER,
  tt.BOOK_CHAPTER_VERSE
];
function pn(t) {
  return tt.BOOK_CHAPTER_VERSE.test(t.trim());
}
function gn(t, e) {
  return T.bookIdToNumber(t) < T.bookIdToNumber(e.book);
}
function hn(t, e, n) {
  const o = T.bookIdToNumber(t) - T.bookIdToNumber(n.book);
  return o < 0 ? !0 : o > 0 ? !1 : e < n.chapterNum;
}
function bn(t, e, n, o) {
  const r = T.bookIdToNumber(t) - T.bookIdToNumber(o.book);
  return r < 0 ? !0 : r > 0 ? !1 : e < o.chapterNum ? !0 : e > o.chapterNum ? !1 : n < o.verseNum;
}
function vn(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function V(t) {
  return Ht(T.bookIdToNumber(t));
}
function xn(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = be.reduce(
    (r, a) => {
      if (r) return r;
      const f = a.exec(t.trim());
      if (f) {
        const [w, s = void 0, d = void 0] = f.slice(1);
        let u;
        const p = e.filter((g) => pe(g, w, n));
        if (p.length === 1 && ([u] = p), !u && s) {
          if (T.isBookIdValid(w)) {
            const g = w.toUpperCase();
            e.includes(g) && (u = g);
          }
          if (!u && n) {
            const g = Array.from(n.entries()).find(
              ([, c]) => c.localizedId.toLowerCase() === w.toLowerCase()
            );
            g && e.includes(g[0]) && ([u] = g);
          }
        }
        if (!u && s) {
          const c = ((h) => Object.keys(pt).find(
            (b) => pt[b].toLowerCase() === h.toLowerCase()
          ))(w);
          if (c && e.includes(c) && (u = c), !u && n) {
            const h = Array.from(n.entries()).find(
              ([, b]) => b.localizedName.toLowerCase() === w.toLowerCase()
            );
            h && e.includes(h[0]) && ([u] = h);
          }
        }
        if (u) {
          let g = s ? parseInt(s, 10) : void 0;
          g && g > V(u) && (g = Math.max(V(u), 1));
          const c = d ? parseInt(d, 10) : void 0;
          return {
            book: u,
            chapterNum: g,
            verseNum: c
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function ve(t, e) {
  if (t.chapterNum > 1)
    return { book: t.book, chapterNum: t.chapterNum - 1, verseNum: 1 };
  const n = e.indexOf(t.book);
  if (n <= 0) return;
  const o = e[n - 1];
  return {
    book: o,
    chapterNum: Math.max(V(o), 1),
    verseNum: 1
  };
}
function xe(t, e) {
  const n = V(t.book);
  if (t.chapterNum < n)
    return { book: t.book, chapterNum: t.chapterNum + 1, verseNum: 1 };
  const o = e.indexOf(t.book);
  if (!(o >= e.length - 1))
    return { book: e[o + 1], chapterNum: 1, verseNum: 1 };
}
function In(t, e) {
  const n = e.indexOf(t.book);
  if (!(n <= 0))
    return { book: e[n - 1], chapterNum: 1, verseNum: 1 };
}
function Nn(t, e) {
  const n = e.indexOf(t.book);
  if (!(n === -1 || n >= e.length - 1))
    return { book: e[n + 1], chapterNum: 1, verseNum: 1 };
}
function Ie(t) {
  return {
    book: t.book,
    chapterNum: t.chapterNum,
    verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
  };
}
function Ne(t) {
  return { book: t.book, chapterNum: t.chapterNum, verseNum: t.verseNum + 1 };
}
function yn(t, e, n, o) {
  const r = O(() => {
    const s = ve(t, e);
    s && o(s);
  }, [t, e, o]), a = O(() => {
    const s = xe(t, e);
    s && o(s);
  }, [t, e, o]), f = O(() => {
    o(Ie(t));
  }, [t, o]), w = O(() => {
    o(Ne(t));
  }, [t, o]);
  return M(() => [
    {
      onClick: r,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? ut : wt
    },
    {
      onClick: f,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? ft : mt
    },
    {
      onClick: w,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? mt : ft
    },
    {
      onClick: a,
      disabled: e.length === 0 || (t.chapterNum === V(t.book) || V(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? wt : ut
    }
  ], [
    t,
    e,
    n,
    r,
    f,
    w,
    a
  ]);
}
function ht({
  delayDuration: t = 0,
  ...e
}) {
  return /* @__PURE__ */ i(
    B.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration: t,
      ...e
    }
  );
}
function Tt({ ...t }) {
  return /* @__PURE__ */ i(B.Root, { "data-slot": "tooltip", ...t });
}
function zt({
  className: t,
  variant: e,
  ...n
}) {
  return /* @__PURE__ */ i(
    B.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: e ? v(Et({ variant: e }), t) : t,
      ...n
    }
  );
}
function jt({
  className: t,
  sideOffset: e = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style: n,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow: o = !0,
  children: r,
  ...a
}) {
  return /* @__PURE__ */ i(B.Portal, { children: /* @__PURE__ */ N(
    B.Content,
    {
      "data-slot": "tooltip-content",
      sideOffset: e,
      style: { zIndex: ne, ...n },
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
        t
      ),
      ...a,
      children: [
        r,
        o && /* @__PURE__ */ i(B.Arrow, { className: "tw:z-50 tw:size-2.5 tw:translate-y-[calc(-50%_-_2px)] tw:rotate-45 tw:rounded-[2px] tw:bg-foreground tw:fill-foreground" })
      ]
    }
  ) });
}
function Cn({
  className: t,
  orientation: e = "horizontal",
  decorative: n = !0,
  ...o
}) {
  return /* @__PURE__ */ i(
    Ut.Root,
    {
      "data-slot": "separator",
      decorative: n,
      orientation: e,
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        t
      ),
      ...o
    }
  );
}
const ye = ["input", "select", "textarea", "button"], Ce = ["button", "textbox"], kn = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const r = dt(null), [a, f] = P(void 0), [w, s] = P(void 0), d = O(
    (c) => {
      f(c);
      const h = t.find((S) => S.id === c);
      h && (e == null || e(h));
      const b = document.getElementById(c);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), r.current && r.current.setAttribute("aria-activedescendant", c);
    },
    [e, t]
  ), u = O(
    (c) => {
      const h = t.find((b) => b.id === c);
      h && (s((b) => b === c ? void 0 : c), n == null || n(h));
    },
    [n, t]
  ), p = (c) => {
    if (!c) return !1;
    const h = c.tagName.toLowerCase();
    if (c.isContentEditable || ye.includes(h)) return !0;
    const b = c.getAttribute("role");
    if (b && Ce.includes(b)) return !0;
    const S = c.getAttribute("tabindex");
    return S !== void 0 && S !== "-1";
  }, g = O(
    (c) => {
      var A;
      const h = c.target, b = (C) => C ? document.getElementById(C) : void 0, S = b(w), G = b(a);
      if (!!(S && h && S.contains(h) && h !== S) && p(h)) {
        if (c.key === "Escape" || c.key === "ArrowLeft" && !h.isContentEditable) {
          if (w) {
            c.preventDefault(), c.stopPropagation();
            const C = t.find((l) => l.id === w);
            C && d(C.id);
          }
          return;
        }
        if (c.key === "ArrowDown" || c.key === "ArrowUp") {
          if (!S) return;
          const C = Array.from(
            S.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (C.length === 0) return;
          const l = C.findIndex((x) => x === h);
          if (l === -1) return;
          let m;
          c.key === "ArrowDown" ? m = Math.min(l + 1, C.length - 1) : m = Math.max(l - 1, 0), m !== l && (c.preventDefault(), c.stopPropagation(), (A = C[m]) == null || A.focus());
          return;
        }
        return;
      }
      const j = t.findIndex((C) => C.id === a);
      let z = j;
      switch (c.key) {
        case "ArrowDown":
          z = Math.min(j + 1, t.length - 1), c.preventDefault();
          break;
        case "ArrowUp":
          z = Math.max(j - 1, 0), c.preventDefault();
          break;
        case "Home":
          z = 0, c.preventDefault();
          break;
        case "End":
          z = t.length - 1, c.preventDefault();
          break;
        case " ":
        case "Enter":
          a && u(a), c.preventDefault(), c.stopPropagation();
          return;
        case "ArrowRight": {
          const C = G;
          if (C) {
            const l = C.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), m = C.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), x = l ?? m;
            if (x) {
              c.preventDefault(), x.focus();
              return;
            }
          }
          break;
        }
        default:
          c.key.length === 1 && !c.metaKey && !c.ctrlKey && !c.altKey && (p(h) || (o == null || o(c.key), c.preventDefault()));
          return;
      }
      const R = t[z];
      R && d(R.id);
    },
    [t, d, a, w, u, o]
  );
  return {
    listboxRef: r,
    activeId: a,
    selectedId: w,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: g,
    /** Focus an option by its ID */
    focusOption: d
  };
}, ke = Z(
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
function et({ className: t, variant: e = "default", asChild: n = !1, ...o }) {
  const r = n ? kt.Root : "span";
  return /* @__PURE__ */ i(
    r,
    {
      "data-slot": "badge",
      "data-variant": e,
      className: v(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        ke({ variant: e }),
        t
      ),
      ...o
    }
  );
}
const Dt = Mt(void 0);
function ot() {
  const t = Bt(Dt);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const rt = Z("", {
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
function Se({ variant: t = "default", ...e }) {
  const n = _(), o = nt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ i(Dt.Provider, { value: o, children: /* @__PURE__ */ i(E.Root, { "data-slot": "dropdown-menu", dir: n, ...e }) });
}
function Sn({
  ...t
}) {
  return /* @__PURE__ */ i(E.Portal, { "data-slot": "dropdown-menu-portal", ...t });
}
function Ee({
  ...t
}) {
  return /* @__PURE__ */ i(E.Trigger, { "data-slot": "dropdown-menu-trigger", ...t });
}
function Ge({
  className: t,
  align: e = "start",
  sideOffset: n = 4,
  children: o,
  ...r
}) {
  const a = _();
  return /* @__PURE__ */ i(E.Portal, { children: /* @__PURE__ */ i(
    E.Content,
    {
      "data-slot": "dropdown-menu-content",
      sideOffset: n,
      align: e,
      className: v(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...r,
      children: /* @__PURE__ */ i("div", { dir: a, children: o })
    }
  ) });
}
function En({ ...t }) {
  return /* @__PURE__ */ i(E.Group, { "data-slot": "dropdown-menu-group", ...t });
}
function Gn({
  className: t,
  inset: e,
  variant: n = "default",
  ...o
}) {
  const r = _(), a = ot();
  return /* @__PURE__ */ i(
    E.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": e,
      "data-variant": n,
      className: v(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: a.variant })
      ),
      dir: r,
      ...o
    }
  );
}
function bt({
  className: t,
  children: e,
  checked: n,
  inset: o,
  ...r
}) {
  const a = _(), f = ot();
  return /* @__PURE__ */ N(
    E.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": o,
      className: v(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: f.variant })
      ),
      checked: n,
      dir: a,
      ...r,
      children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ i(E.ItemIndicator, { children: /* @__PURE__ */ i(lt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function Tn({
  ...t
}) {
  return /* @__PURE__ */ i(E.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...t });
}
function zn({
  className: t,
  children: e,
  inset: n,
  ...o
}) {
  const r = _(), a = ot();
  return /* @__PURE__ */ N(
    E.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": n,
      className: v(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: a.variant })
      ),
      dir: r,
      ...o,
      children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ i(E.ItemIndicator, { children: /* @__PURE__ */ i(lt, {}) })
          }
        ),
        e
      ]
    }
  );
}
function vt({ className: t, inset: e, ...n }) {
  return /* @__PURE__ */ i(
    E.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": e,
      className: v(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        t
      ),
      ...n
    }
  );
}
function Te({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    E.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: v("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...e
    }
  );
}
function jn({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: v(
        "tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        t
      ),
      ...e
    }
  );
}
function Dn({ ...t }) {
  return /* @__PURE__ */ i(E.Sub, { "data-slot": "dropdown-menu-sub", ...t });
}
function On({
  className: t,
  inset: e,
  children: n,
  ...o
}) {
  const r = ot();
  return /* @__PURE__ */ N(
    E.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": e,
      className: v(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        t,
        // CUSTOM: Apply variant-driven styles from menu context
        rt({ variant: r.variant })
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ i(qt, { className: "tw:ms-auto" })
      ]
    }
  );
}
function Ln({ className: t, children: e, ...n }) {
  const o = _();
  return /* @__PURE__ */ i(
    E.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: v(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        "pr-twp tw:z-50 tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:bg-popover/70 tw:before:-z-1 tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative tw:before:pointer-events-none tw:before:absolute tw:before:inset-0 tw:before:rounded-[inherit] tw:before:backdrop-blur-2xl tw:before:backdrop-saturate-150",
        t
      ),
      ...n,
      children: /* @__PURE__ */ i("div", { dir: o, children: e })
    }
  );
}
function _n({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      "data-slot": "skeleton",
      className: v("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
var D = {}, at, xt;
function ze() {
  return xt || (xt = 1, at = () => {
    const t = "\\ud800-\\udfff", f = "\\u0300-\\u036f" + "\\ufe20-\\ufe2f" + "\\u20d0-\\u20ff" + "\\u1ab0-\\u1aff" + "\\u1dc0-\\u1dff", w = "\\ufe0e\\ufe0f", s = "\\uD83D\\uDC69\\uD83C\\uDFFB\\u200D\\uD83C\\uDF93", d = `[${t}]`, u = `[${f}]`, p = "\\ud83c[\\udffb-\\udfff]", g = `(?:${u}|${p})`, c = `[^${t}]`, h = "(?:\\uD83C[\\uDDE6-\\uDDFF]){2}", b = "[\\ud800-\\udbff][\\udc00-\\udfff]", S = "\\u200d", G = "(?:\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40(?:\\udc65|\\udc73|\\udc77)\\udb40(?:\\udc6e|\\udc63|\\udc6c)\\udb40(?:\\udc67|\\udc74|\\udc73)\\udb40\\udc7f)", X = `[${s}]`, F = `${g}?`, j = `[${w}]?`, z = `(?:${S}(?:${[c, h, b].join("|")})${j + F})*`, R = j + F + z, C = `(?:${[`${c}${u}?`, u, h, b, d, X].join("|")})`;
    return new RegExp(`${G}|${p}(?=${p})|${C + R}`, "g");
  }), at;
}
var It;
function je() {
  if (It) return D;
  It = 1;
  var t = D && D.__importDefault || function(s) {
    return s && s.__esModule ? s : { default: s };
  };
  Object.defineProperty(D, "__esModule", { value: !0 });
  var e = t(ze());
  function n(s) {
    if (typeof s != "string")
      throw new Error("A string is expected as input");
    return s.match(e.default()) || [];
  }
  D.toArray = n;
  function o(s) {
    if (typeof s != "string")
      throw new Error("Input must be a string");
    var d = s.match(e.default());
    return d === null ? 0 : d.length;
  }
  D.length = o;
  function r(s, d, u) {
    if (d === void 0 && (d = 0), typeof s != "string")
      throw new Error("Input must be a string");
    (typeof d != "number" || d < 0) && (d = 0), typeof u == "number" && u < 0 && (u = 0);
    var p = s.match(e.default());
    return p ? p.slice(d, u).join("") : "";
  }
  D.substring = r;
  function a(s, d, u) {
    if (d === void 0 && (d = 0), typeof s != "string")
      throw new Error("Input must be a string");
    var p = o(s);
    if (typeof d != "number" && (d = parseInt(d, 10)), d >= p)
      return "";
    d < 0 && (d += p);
    var g;
    typeof u > "u" ? g = p : (typeof u != "number" && (u = parseInt(u, 10)), g = u >= 0 ? u + d : d);
    var c = s.match(e.default());
    return c ? c.slice(d, g).join("") : "";
  }
  D.substr = a;
  function f(s, d, u, p) {
    if (d === void 0 && (d = 16), u === void 0 && (u = "#"), p === void 0 && (p = "right"), typeof s != "string" || typeof d != "number")
      throw new Error("Invalid arguments specified");
    if (["left", "right"].indexOf(p) === -1)
      throw new Error("Pad position should be either left or right");
    typeof u != "string" && (u = String(u));
    var g = o(s);
    if (g > d)
      return r(s, 0, d);
    if (g < d) {
      var c = u.repeat(d - g);
      return p === "left" ? c + s : s + c;
    }
    return s;
  }
  D.limit = f;
  function w(s, d, u) {
    if (u === void 0 && (u = 0), typeof s != "string")
      throw new Error("Input must be a string");
    if (s === "")
      return d === "" ? 0 : -1;
    u = Number(u), u = isNaN(u) ? 0 : u, d = String(d);
    var p = n(s);
    if (u >= p.length)
      return d === "" ? p.length : -1;
    if (d === "")
      return u;
    var g = n(d), c = !1, h;
    for (h = u; h < p.length; h += 1) {
      for (var b = 0; b < g.length && g[b] === p[h + b]; )
        b += 1;
      if (b === g.length && g[b - 1] === p[h + b - 1]) {
        c = !0;
        break;
      }
    }
    return c ? h : -1;
  }
  return D.indexOf = w, D;
}
je();
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
function q(t) {
  return t.toUpperCase();
}
function Oe(t) {
  const e = /* @__PURE__ */ new Map();
  return t.forEach((n) => {
    const o = q(n.projectId), r = e.get(o), a = {
      scrollGroupId: n.scrollGroupId,
      scrollGroupScrRefLabel: n.scrollGroupScrRefLabel
    };
    r ? r.some((f) => f.scrollGroupId === n.scrollGroupId) || r.push(a) : e.set(o, [a]);
  }), e.forEach((n) => n.sort((o, r) => o.scrollGroupId - r.scrollGroupId)), e;
}
function Nt(t, e, n) {
  return t.some((o) => o.projectId === e && o.scrollGroupId === n);
}
function it(t) {
  const e = Oe(t.openTabs);
  if (t.mode === "project") {
    const r = t.selection.projectId;
    return t.projects.map((a) => {
      const f = e.get(q(a.id)) ?? [];
      return {
        rowKey: a.id,
        projectId: a.id,
        shortName: a.shortName,
        fullName: a.fullName,
        language: a.language,
        languageCode: a.languageCode,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: f.map((w) => w.scrollGroupId),
        isSelected: r === a.id,
        isMuted: f.length === 0,
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
  const o = [];
  return t.projects.forEach((r) => {
    const a = e.get(q(r.id));
    if (!a || a.length === 0) {
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
        isSelected: Nt(n, r.id, void 0),
        isMuted: !0,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        versificationId: r.versificationId,
        versificationName: r.versificationName
      });
      return;
    }
    a.forEach((f) => {
      o.push({
        rowKey: `tab:${r.id}:${f.scrollGroupId}`,
        projectId: r.id,
        shortName: r.shortName,
        fullName: r.fullName,
        language: r.language,
        languageCode: r.languageCode,
        scrollGroupId: f.scrollGroupId,
        scrollGroupScrRefLabel: f.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: Nt(n, r.id, f.scrollGroupId),
        isMuted: !1,
        isBoundButClosed: !1,
        isDisabled: r.isDisabled === !0,
        disabledReason: r.disabledReason,
        versificationId: r.versificationId,
        versificationName: r.versificationName
      });
    });
  }), n.forEach((r) => {
    if (r.scrollGroupId === void 0 || o.some((f) => f.projectId === r.projectId && f.scrollGroupId === r.scrollGroupId))
      return;
    const a = t.projects.find((f) => f.id === r.projectId);
    a && o.push({
      rowKey: `closed:${a.id}:${r.scrollGroupId}`,
      projectId: a.id,
      shortName: a.shortName,
      fullName: a.fullName,
      language: a.language,
      languageCode: a.languageCode,
      scrollGroupId: r.scrollGroupId,
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
  }), o;
}
function yt(t) {
  return t.isBoundButClosed ? !1 : t.scrollGroupId !== void 0 ? !0 : t.openGroups.length > 0;
}
function U(t, e) {
  const n = t.shortName.localeCompare(e.shortName, void 0, { sensitivity: "base" });
  if (n !== 0) return n;
  const o = t.scrollGroupId ?? Number.POSITIVE_INFINITY, r = e.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return o - r;
}
function Le(t, e) {
  if (!e)
    return [{ kind: "flat", rows: [...t].sort(U) }];
  const n = t.filter(yt).sort(U), o = t.filter((a) => !yt(a)).sort(U);
  if (n.length === 0)
    return [{ kind: "flat", rows: o }];
  const r = [{ kind: "openTabs", rows: n }];
  return o.length > 0 && r.push({ kind: "other", rows: o }), r;
}
function _e(t, e, n) {
  const o = /* @__PURE__ */ new Map(), r = [];
  t.forEach((w) => {
    const s = w.versificationId;
    if (s === void 0 || s === "") {
      r.push(w);
      return;
    }
    const d = w.versificationName ?? s, u = o.get(s);
    u ? (u.rows.push(w), !u.label && w.versificationName && (u.label = w.versificationName)) : o.set(s, { label: d, rows: [w] });
  });
  const a = [...o.entries()].map(([w, { label: s, rows: d }]) => ({
    id: w,
    label: s,
    rows: [...d].sort(U)
  }));
  a.sort((w, s) => w.id === e ? -1 : s.id === e ? 1 : w.label.localeCompare(s.label, void 0, { sensitivity: "base" }));
  const f = a.map(({ id: w, label: s, rows: d }) => ({
    kind: "versification",
    rows: d,
    label: s,
    isPriority: w === e
  }));
  return r.length > 0 && f.push({
    kind: "versification",
    rows: [...r].sort(U),
    label: n,
    isPriority: !1
  }), f;
}
const Pe = {
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
function $e(t) {
  return { ...Pe, ...t };
}
function Y(t) {
  return De[Kt(t)] ?? String(t);
}
const Re = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function Ae({ scrollGroupId: t, isBoundButClosed: e }) {
  const n = Y(t);
  return e ? /* @__PURE__ */ i(
    et,
    {
      variant: "outline",
      className: "tw:relative tw:text-muted-foreground",
      style: Re,
      children: n
    }
  ) : /* @__PURE__ */ i(et, { variant: "secondary", children: n });
}
function Me({ row: t, mode: e, strings: n, onClick: o, onOpen: r, selectedRowRef: a }) {
  const [f, w] = P(!1), s = dt(null), d = !!(t.language || t.languageCode), u = d || !!t.scrollGroupScrRefLabel || t.isBoundButClosed || t.isDisabled && !!t.disabledReason, p = O(() => {
    if (u) {
      w(!0);
      return;
    }
    const G = s.current;
    G && G.scrollWidth > G.clientWidth && w(!0);
  }, [u]), g = /* @__PURE__ */ i(_t, { className: v("tw:h-4 tw:w-4", t.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let c;
  e === "project" ? t.openGroups.length > 0 && (c = /* @__PURE__ */ i("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: t.openGroups.map((G) => /* @__PURE__ */ i(et, { variant: "secondary", children: Y(G) }, G)) })) : t.scrollGroupId !== void 0 && (c = /* @__PURE__ */ N("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ i(
      Ae,
      {
        scrollGroupId: t.scrollGroupId,
        isBoundButClosed: t.isBoundButClosed
      }
    ),
    t.isBoundButClosed && r && /* @__PURE__ */ N(
      K,
      {
        size: "sm",
        variant: "ghost",
        className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
        onClick: (G) => {
          G.stopPropagation(), r(t);
        },
        onMouseDown: (G) => G.stopPropagation(),
        "aria-label": n.openButtonLabel,
        title: n.openButtonLabel,
        children: [
          /* @__PURE__ */ i(Pt, { className: "tw:h-3 tw:w-3" }),
          n.openButtonLabel
        ]
      }
    )
  ] }));
  const h = /* @__PURE__ */ N(
    fe,
    {
      ref: t.isSelected ? a : void 0,
      value: `${t.rowKey} ${t.shortName} ${t.fullName} ${t.language ?? ""} ${t.languageCode ?? ""}`,
      onSelect: () => {
        t.isDisabled || o(t);
      },
      disabled: t.isDisabled,
      onPointerEnter: p,
      onPointerLeave: () => w(!1),
      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
      "data-selected": t.isSelected,
      children: [
        /* @__PURE__ */ i("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: g }),
        /* @__PURE__ */ N(
          "span",
          {
            ref: s,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ i("span", { className: "tw:w-full tw:truncate tw:font-medium", children: t.shortName }),
              t.fullName && t.fullName !== t.shortName && /* @__PURE__ */ i("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: t.fullName })
            ]
          }
        ),
        c
      ]
    }
  ), b = t.scrollGroupId !== void 0 ? Y(t.scrollGroupId) : void 0, S = t.isBoundButClosed && b ? n.boundButClosedTooltip.replace("{group}", b) : void 0;
  return /* @__PURE__ */ N(Tt, { open: f, delayDuration: 400, children: [
    /* @__PURE__ */ i(zt, { asChild: !0, children: h }),
    /* @__PURE__ */ N(
      jt,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-xs tw:text-center",
        style: { zIndex: St },
        children: [
          /* @__PURE__ */ i("div", { className: "tw:font-semibold", children: t.fullName }),
          d && /* @__PURE__ */ N("div", { className: "tw:text-sm", children: [
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
          S && /* @__PURE__ */ i("div", { className: "tw:text-sm tw:italic", children: S }),
          t.isDisabled && t.disabledReason && /* @__PURE__ */ i("div", { className: "tw:text-sm tw:italic tw:text-muted-foreground", children: t.disabledReason })
        ]
      }
    )
  ] });
}
function Be({
  groupByOpenTabs: t,
  onChangeGroupByOpenTabs: e,
  showSelectedOnly: n,
  onChangeShowSelectedOnly: o,
  strings: r
}) {
  const a = !!n;
  return /* @__PURE__ */ N(Se, { children: [
    /* @__PURE__ */ i(Ee, { asChild: !0, children: /* @__PURE__ */ i(
      K,
      {
        variant: "ghost",
        size: "sm",
        className: v(
          "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
          // Match shadcn Toggle's "on" styling so the funnel reads as a toggle-group button
          // that's currently pressed when a filter is active.
          a && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
        ),
        "aria-label": r.filterAriaLabel,
        "aria-pressed": a,
        title: r.filterAriaLabel,
        onMouseDown: (f) => f.preventDefault(),
        children: /* @__PURE__ */ i(Lt, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ N(Ge, { align: "end", className: "tw:w-56", style: { zIndex: St }, children: [
      /* @__PURE__ */ i(vt, { children: r.groupSectionLabel }),
      /* @__PURE__ */ i(
        bt,
        {
          checked: t,
          onCheckedChange: e,
          onSelect: (f) => f.preventDefault(),
          children: r.filterGroupByOpenTabs
        }
      ),
      o && /* @__PURE__ */ N(Ct, { children: [
        /* @__PURE__ */ i(Te, {}),
        /* @__PURE__ */ i(vt, { children: r.filterSectionLabel }),
        /* @__PURE__ */ i(
          bt,
          {
            checked: !!n,
            onCheckedChange: o,
            onSelect: (f) => f.preventDefault(),
            children: r.filterShowSelectedOnly
          }
        )
      ] })
    ] })
  ] });
}
function Pn(t) {
  const [e, n] = P(!1), [o, r] = P(""), [a, f] = P(t.defaultGroupByOpenTabs ?? !0), [w, s] = P(!1), d = dt(null), u = O((l) => {
    n(l), l || r("");
  }, []);
  Vt(() => {
    if (!e) return;
    const l = window.requestAnimationFrame(() => {
      const m = d.current;
      m && m.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(l);
  }, [e]);
  const p = $e(t.localizedStrings), g = M(() => t.mode === "project" ? it({
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
  }), [t.mode, t.projects, t.openTabs, t.selection]), c = M(() => {
    const l = o.trim().toLowerCase();
    let m = g;
    return l && (m = m.filter(
      (x) => x.shortName.toLowerCase().includes(l) || x.fullName.toLowerCase().includes(l) || (x.language ?? "").toLowerCase().includes(l) || (x.languageCode ?? "").toLowerCase().includes(l)
    )), t.mode === "project-multi" && w && (m = m.filter((x) => x.isSelected)), m;
  }, [g, o, t.mode, w]), h = M(
    () => t.groupByVersification ? _e(
      c,
      t.priorityVersificationId,
      p.versificationUnknownSectionHeading
    ) : Le(c, a),
    [
      c,
      a,
      t.groupByVersification,
      t.priorityVersificationId,
      p.versificationUnknownSectionHeading
    ]
  ), b = M(() => {
    if (t.mode !== "project-multi") return [];
    const l = [];
    return t.projects.forEach((m) => {
      const x = t.openTabs.filter(
        (I) => q(I.projectId) === q(m.id)
      );
      if (x.length === 0) {
        l.push({ projectId: m.id });
        return;
      }
      const k = /* @__PURE__ */ new Set();
      x.forEach((I) => {
        k.has(I.scrollGroupId) || (k.add(I.scrollGroupId), l.push({ projectId: m.id, scrollGroupId: I.scrollGroupId }));
      });
    }), l;
  }, [t.mode, t.projects, t.openTabs]), S = (l) => {
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
        t.onChangeSelection({ projectId: l.projectId }), n(!1);
        return;
      }
      case "project-multi": {
        const m = t.selection.pairs, x = (I) => I.projectId === l.projectId && I.scrollGroupId === l.scrollGroupId, k = m.some(x) ? m.filter((I) => !x(I)) : [...m, { projectId: l.projectId, scrollGroupId: l.scrollGroupId }];
        t.onChangeSelection({ pairs: k }), k.length === 0 && w && s(!1);
        return;
      }
      case "projectScrollGroup": {
        if (l.isBoundButClosed && l.scrollGroupId !== void 0) {
          t.onOpenProjectInGroup(l.projectId, l.scrollGroupId), n(!1);
          return;
        }
        if (l.scrollGroupId !== void 0) {
          t.onChangeSelection({
            projectId: l.projectId,
            scrollGroupId: l.scrollGroupId
          }), n(!1);
          return;
        }
        const m = t.selection.scrollGroupId ?? 0;
        t.onChangeSelection({ projectId: l.projectId, scrollGroupId: m }), t.onOpenProjectInGroup(l.projectId, m), n(!1);
      }
    }
  }, X = () => {
    if (t.mode !== "project-multi") return;
    const l = t.selection.pairs, m = new Set(l.map((k) => `${k.projectId}:${k.scrollGroupId ?? ""}`)), x = [...l];
    b.forEach((k) => {
      const I = `${k.projectId}:${k.scrollGroupId ?? ""}`;
      m.has(I) || (m.add(I), x.push(k));
    }), t.onChangeSelection({ pairs: x });
  }, F = () => {
    t.mode === "project-multi" && (t.onChangeSelection({ pairs: [] }), w && s(!1));
  }, j = M(() => {
    switch (t.mode) {
      case "project": {
        const l = t.projects.find((x) => x.id === t.selection.projectId);
        let m = l ? l.shortName : t.buttonPlaceholder ?? "";
        return l && t.triggerLabelFormat === "shortNameAndFullName" && l.fullName && l.fullName !== l.shortName && (m = `${l.shortName} - ${l.fullName}`), { node: m, title: m };
      }
      case "project-multi": {
        const { pairs: l } = t.selection;
        if (l.length === 0) {
          const I = t.buttonPlaceholder ?? "";
          return { node: I, title: I };
        }
        const m = [];
        if (l.forEach((I) => {
          const H = t.projects.find((Ot) => Ot.id === I.projectId);
          H && m.push({ project: H, scrollGroupId: I.scrollGroupId });
        }), m.length === 0) {
          const I = t.buttonPlaceholder ?? "";
          return { node: I, title: I };
        }
        if (t.getSelectedText) {
          const I = t.getSelectedText(m);
          return { node: I, title: I };
        }
        const x = m.map(
          ({ project: I, scrollGroupId: H }) => H === void 0 ? I.shortName : `${I.shortName} (${Y(H)})`
        ).join(", ");
        if (m.length === 1) return { node: x, title: x };
        const k = m.length.toString();
        return {
          node: /* @__PURE__ */ N(Ct, { children: [
            /* @__PURE__ */ i(et, { variant: "muted", className: "tw:shrink-0", children: k }),
            /* @__PURE__ */ i("span", { className: "tw:min-w-0 tw:truncate", children: x })
          ] }),
          title: `${k} ${x}`
        };
      }
      case "projectScrollGroup": {
        const l = t.projects.find((k) => k.id === t.selection.projectId);
        if (!l) {
          const k = t.buttonPlaceholder ?? "";
          return { node: k, title: k };
        }
        const m = t.selection.scrollGroupId;
        if (m === void 0)
          return { node: l.shortName, title: l.shortName };
        const x = `${l.shortName} · ${Y(m)}`;
        return { node: x, title: x };
      }
      default:
        return { node: "", title: "" };
    }
  }, [t]);
  let z;
  t.isLoading ? z = /* @__PURE__ */ i($t, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" }) : t.hideTriggerChevron ? z = void 0 : t.mode === "project-multi" ? z = /* @__PURE__ */ i(Rt, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }) : z = /* @__PURE__ */ i(At, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const R = t.mode === "projectScrollGroup" || t.mode === "project-multi" && t.onOpenProjectInGroup ? S : void 0, A = /* @__PURE__ */ N(
    K,
    {
      variant: t.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": e,
      "aria-label": t.ariaLabel,
      disabled: (t.isDisabled ?? !1) || (t.isLoading ?? !1),
      className: v(
        "tw:flex tw:w-[180px] tw:items-center tw:justify-between tw:overflow-hidden",
        t.buttonClassName
      ),
      children: [
        /* @__PURE__ */ i("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof j.node == "string" ? /* @__PURE__ */ i("span", { className: "tw:min-w-0 tw:truncate", children: j.node }) : j.node }),
        z
      ]
    }
  ), C = j.title ? /* @__PURE__ */ i(ht, { delayDuration: 400, children: /* @__PURE__ */ N(Tt, { children: [
    /* @__PURE__ */ i(zt, { asChild: !0, children: /* @__PURE__ */ i(gt, { asChild: !0, children: A }) }),
    /* @__PURE__ */ i(jt, { children: j.title })
  ] }) }) : /* @__PURE__ */ i(gt, { asChild: !0, children: A });
  return /* @__PURE__ */ N(ge, { open: e, onOpenChange: u, children: [
    C,
    /* @__PURE__ */ i(
      he,
      {
        align: t.alignDropDown ?? "start",
        collisionPadding: 16,
        className: v("tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0", t.popoverContentClassName),
        style: t.popoverContentStyle,
        children: /* @__PURE__ */ i(ht, { delayDuration: 400, children: /* @__PURE__ */ N(se, { shouldFilter: !1, children: [
          /* @__PURE__ */ N("div", { className: "tw:flex tw:items-center tw:border-b tw:pe-2", children: [
            /* @__PURE__ */ i("div", { className: "tw:flex-1", children: /* @__PURE__ */ i(
              de,
              {
                value: o,
                onValueChange: r,
                placeholder: p.searchPlaceholder,
                className: "tw:border-0"
              }
            ) }),
            !t.groupByVersification && /* @__PURE__ */ i(
              Be,
              {
                groupByOpenTabs: a,
                onChangeGroupByOpenTabs: f,
                showSelectedOnly: t.mode === "project-multi" ? w : void 0,
                onChangeShowSelectedOnly: t.mode === "project-multi" ? s : void 0,
                strings: p
              }
            )
          ] }),
          t.mode === "project-multi" && /* @__PURE__ */ N("div", { className: "tw:flex tw:justify-between tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: [
            /* @__PURE__ */ i(K, { variant: "ghost", size: "sm", onClick: X, children: `${p.selectAll} (${b.length.toString()})` }),
            /* @__PURE__ */ i(K, { variant: "ghost", size: "sm", onClick: F, children: `${p.clearAll} (${t.selection.pairs.length.toString()})` })
          ] }),
          /* @__PURE__ */ N(le, { children: [
            /* @__PURE__ */ i(ce, { children: t.commandEmptyMessage ?? "No projects found" }),
            h.map((l, m) => (
              // Versification grouping yields multiple sections of the
              // same `kind` ('versification'), so the section key must
              // include the heading label to stay stable across re-orders.
              /* @__PURE__ */ N(Ft, { children: [
                /* @__PURE__ */ i(ue, { heading: Ve(l, p), children: l.rows.map((x) => /* @__PURE__ */ i(
                  Me,
                  {
                    row: x,
                    mode: t.mode,
                    strings: p,
                    onClick: G,
                    onOpen: R,
                    selectedRowRef: d
                  },
                  x.rowKey
                )) }),
                m < h.length - 1 && /* @__PURE__ */ i(we, {})
              ] }, `${l.kind}:${l.label ?? ""}`)
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
function $n({
  className: t,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction: e,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout: n,
  orientation: o,
  ...r
}) {
  return /* @__PURE__ */ i(
    ct.Group,
    {
      "data-slot": "resizable-panel-group",
      className: v(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        t
      ),
      orientation: o ?? e,
      onLayoutChange: n ? (a) => n(Object.values(a)) : void 0,
      ...r
    }
  );
}
function J(t) {
  if (t !== void 0)
    return typeof t == "number" ? `${t}%` : t;
}
function Rn({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize: t,
  minSize: e,
  maxSize: n,
  collapsedSize: o,
  ...r
}) {
  return /* @__PURE__ */ i(
    ct.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: J(t),
      minSize: J(e),
      maxSize: J(n),
      collapsedSize: J(o),
      ...r
    }
  );
}
function An({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ i(
    ct.Separator,
    {
      "data-slot": "resizable-handle",
      className: v(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ i("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
export {
  cn as $,
  pt as A,
  K as B,
  fe as C,
  Gn as D,
  et as E,
  Se as F,
  Ee as G,
  Ge as H,
  kn as I,
  vt as J,
  Te as K,
  bt as L,
  _n as M,
  En as N,
  Tn as O,
  ge as P,
  zn as Q,
  en as R,
  Cn as S,
  ht as T,
  we as U,
  rn as V,
  un as W,
  Pn as X,
  St as Y,
  on as Z,
  sn as _,
  nn as a,
  De as a0,
  ee as a1,
  Dn as a2,
  On as a3,
  Sn as a4,
  Ln as a5,
  Dt as a6,
  ot as a7,
  rt as a8,
  jn as a9,
  mn as aa,
  wn as ab,
  fn as ac,
  An as ad,
  Rn as ae,
  $n as af,
  ke as ag,
  Et as ah,
  ne as ai,
  Nn as aj,
  xe as ak,
  Ne as al,
  In as am,
  ve as an,
  Ie as ao,
  ln as b,
  v as c,
  gt as d,
  he as e,
  se as f,
  dn as g,
  le as h,
  ue as i,
  V as j,
  me as k,
  pe as l,
  xn as m,
  bn as n,
  gn as o,
  an as p,
  pn as q,
  _ as r,
  hn as s,
  vn as t,
  yn as u,
  de as v,
  ce as w,
  Tt as x,
  zt as y,
  jt as z
};
//# sourceMappingURL=resizable-BhRKzO_u.js.map
