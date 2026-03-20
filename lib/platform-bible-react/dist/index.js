var Mi = Object.defineProperty;
var Oi = (t, e, n) => e in t ? Mi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ht = (t, e, n) => Oi(t, typeof e != "symbol" ? e + "" : e, n);
import { jsxs as w, jsx as r, Fragment as st } from "react/jsx-runtime";
import { Command as ge } from "cmdk";
import { X as Oe, Search as lo, Check as jt, Clock as Sr, ChevronsLeft as Rr, ChevronsRight as Dr, ChevronLeft as jn, ChevronRight as Ce, ArrowLeft as Ii, ArrowRight as Ai, Circle as rr, ChevronDown as Ie, BoldIcon as Pi, ItalicIcon as $i, AtSign as co, Pencil as Li, Trash2 as Vi, ArrowUp as wo, MoreHorizontal as uo, MailOpen as ji, Mail as Fi, ChevronUp as fo, FilterIcon as Bi, ArrowLeftIcon as Ki, ChevronLeftIcon as Gi, ChevronRightIcon as Ui, ArrowRightIcon as Hi, Copy as po, Filter as zi, User as qi, Link as Wi, CircleHelp as Yi, ChevronsUpDown as mo, Star as Ji, SquareX as ho, FunctionSquare as go, SquareSigma as bo, Ban as Xi, AlertCircle as Fn, CircleCheckIcon as Zi, CircleXIcon as Qi, CircleHelpIcon as ts, ArrowUpIcon as es, ArrowDownIcon as ns, PanelLeft as rs, PanelRight as os, ScrollText as is, MenuIcon as ss, Menu as as, EllipsisVertical as ls, LoaderCircle as cs, GripVertical as ds } from "lucide-react";
import { clsx as ws } from "clsx";
import { twMerge as us } from "tailwind-merge";
import * as Ee from "@radix-ui/react-dialog";
import { Canon as it } from "@sillsdev/scripture";
import { includes as Qe, Section as H, getChaptersForBook as fs, formatScrRef as pe, getSectionForBook as Ve, formatRelativeDate as ps, formatReplacementString as fe, sanitizeHtml as ms, NumberFormat as hs, formatBytes as gs, getCurrentLocale as bs, usfmMarkers as sn, getFormatCallerFunction as vs, deepEqual as xs, isString as Mr, compareScrRefs as Bn, scrRefToBBBCCCVVV as Cn, getLocalizeKeyForScrollGroupId as Q } from "platform-bible-utils";
import tt, { forwardRef as qe, useRef as q, useMemo as F, useState as T, useCallback as K, useLayoutEffect as Ut, createContext as hn, useContext as or, useEffect as U, Component as ys, createElement as Or, Suspense as Ns, Fragment as vo } from "react";
import { Slot as Ae } from "@radix-ui/react-slot";
import { cva as oe } from "class-variance-authority";
import * as Ke from "@radix-ui/react-popover";
import * as _s from "@radix-ui/react-label";
import * as Kn from "@radix-ui/react-radio-group";
import { createEditor as xo, $getRoot as te, $createParagraphNode as gn, $getSelection as Ot, HISTORY_MERGE_TAG as ir, ParagraphNode as yo, TextNode as No, $isTokenOrSegmented as ks, $getCharacterOffsets as Cs, $cloneWithPropertiesEphemeral as Es, $findMatchingParent as _o, $isElementNode as Xt, $isRangeSelection as he, CLEAR_EDITOR_COMMAND as ko, COMMAND_PRIORITY_EDITOR as Co, mergeRegister as ee, shallowMergeConfig as Ts, defineExtension as Ft, safeCast as We, createState as Ss, FORMAT_TEXT_COMMAND as Eo, $isNodeSelection as To, COMMAND_PRIORITY_LOW as So, RootNode as Rs, LineBreakNode as Ds, TabNode as Ms, $isEditorState as Os, createCommand as Is, CLICK_COMMAND as As, isDOMNode as Ps, $getNodeFromDOMNode as $s, $createNodeSelection as Ls, $setSelection as Vs, DecoratorNode as Gn, $getState as js, toggleTextFormatType as Ir, TEXT_TYPE_TO_FORMAT as Fs, $setState as Bs, addClassNamesToElement as Ro, $create as Ks, $getNodeByKey as Gs, removeClassNamesFromElement as Us, KEY_TAB_COMMAND as Hs, $isBlockElementNode as dn, $createRangeSelection as zs, $normalizeSelection__EXPERIMENTAL as qs, OUTDENT_CONTENT_COMMAND as Ws, INDENT_CONTENT_COMMAND as Ar, INSERT_TAB_COMMAND as Ys, COMMAND_PRIORITY_CRITICAL as sr, $isDecoratorNode as Js, $isParagraphNode as Xs, $isTextNode as wn, SELECTION_CHANGE_COMMAND as Do, getRegisteredNode as Zs, isHTMLElement as Qs, isDocumentFragment as Pr, isDOMDocumentNode as ta, ArtificialNode__DO_NOT_USE as Mo, $createLineBreakNode as Oo, $isRootOrShadowRoot as ea, isBlockDomNode as $r, isInlineDomNode as Lr, $insertNodes as na } from "lexical";
import * as bn from "@radix-ui/react-tooltip";
import { TooltipTrigger as ra } from "@radix-ui/react-tooltip";
import { HeadingNode as oa, QuoteNode as ia, registerRichText as sa } from "@lexical/rich-text";
import { flushSync as aa, createPortal as la } from "react-dom";
import { $isTableSelection as ca } from "@lexical/table";
import * as Io from "@radix-ui/react-toggle-group";
import "@radix-ui/react-toggle";
import { createHeadlessEditor as Ao } from "@lexical/headless";
import * as da from "@radix-ui/react-separator";
import * as ar from "@radix-ui/react-avatar";
import * as ut from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as wa } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Po, getFilteredRowModel as ua, getSortedRowModel as $o, getPaginationRowModel as fa, getCoreRowModel as Lo, flexRender as je, getGroupedRowModel as pa, getExpandedRowModel as ma } from "@tanstack/react-table";
import * as bt from "@radix-ui/react-select";
import ha from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Un, HIDDEN_NOTE_CALLER as Hn, getDefaultViewOptions as ga, isInsertEmbedOpOfType as tn, Editorial as ba } from "@eten-tech-foundation/platform-editor";
import * as Vr from "@radix-ui/react-checkbox";
import * as It from "@radix-ui/react-tabs";
import * as Vt from "@radix-ui/react-menubar";
import { useHotkeys as va } from "react-hotkeys-hook";
import * as ft from "@radix-ui/react-context-menu";
import { Drawer as ie } from "vaul";
import * as jr from "@radix-ui/react-progress";
import * as lr from "react-resizable-panels";
import { Toaster as xa } from "sonner";
import { toast as uf } from "sonner";
import * as en from "@radix-ui/react-slider";
import * as Fr from "@radix-ui/react-switch";
function zn(t) {
  const e = [];
  let n = "", o = 0;
  for (let i = 0; i < t.length; i++) {
    const s = t[i];
    s === "[" ? o += 1 : s === "]" && (o -= 1), s === ":" && o === 0 ? (e.push(n), n = "") : n += s;
  }
  return e.push(n), e;
}
function ya(t) {
  if (t.startsWith("tw:"))
    return { normalized: t, original: t };
  const e = zn(t), n = e.findIndex((s) => s.startsWith("-tw-"));
  if (n !== -1) {
    const s = e[n].slice(4);
    return { normalized: `tw:${[...e.filter((d, c) => c !== n), `-${s}`].join(":")}`, original: t };
  }
  const o = e.findIndex((s) => s.startsWith("!tw-"));
  if (o !== -1) {
    const s = e[o].slice(4);
    return { normalized: `tw:${[...e.filter((d, c) => c !== o), `!${s}`].join(":")}`, original: t };
  }
  const i = e[e.length - 1];
  if (i.startsWith("tw-")) {
    const s = i.slice(3);
    return { normalized: `tw:${[...e.slice(0, -1), s].join(":")}`, original: t };
  }
  return { normalized: t, original: t };
}
function Na(t, e) {
  if (e.startsWith("tw:"))
    return t;
  const n = zn(t);
  if (n[0] !== "tw") return t;
  const o = n.slice(1, -1), i = n[n.length - 1], s = zn(e), a = s.some((d) => d.startsWith("-tw-")), l = s.some((d) => d.startsWith("!tw-"));
  if (a && i.startsWith("-")) {
    const d = i.slice(1);
    return [...o, `-tw-${d}`].join(":");
  }
  if (l && i.startsWith("!")) {
    const d = i.slice(1);
    return [...o, `!tw-${d}`].join(":");
  }
  return [...o, `tw-${i}`].join(":");
}
function m(...t) {
  const e = ws(t);
  if (!e) return e;
  const n = e.split(" ").filter(Boolean), o = /* @__PURE__ */ new Map(), i = [];
  return n.forEach((d) => {
    const c = ya(d);
    o.set(c.normalized, c.original), i.push(c.normalized);
  }), us(i.join(" ")).split(" ").filter(Boolean).map((d) => {
    const c = o.get(d);
    return c ? Na(d, c) : d;
  }).join(" ");
}
const _a = "layoutDirection";
function dt() {
  const t = localStorage.getItem(_a);
  return t === "rtl" ? t : "ltr";
}
const ka = Ee.Root, Ca = Ee.Portal;
function Ea({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Ee.Overlay,
    {
      ref: e,
      className: m(
        "tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0",
        t
      ),
      ...n
    }
  );
}
function Ta({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  const i = dt();
  return /* @__PURE__ */ w(Ca, { children: [
    /* @__PURE__ */ r(Ea, {}),
    /* @__PURE__ */ w(
      Ee.Content,
      {
        ref: n,
        className: m(
          "pr-twp tw:fixed tw:left-[50%] tw:top-[50%] tw:z-50 tw:grid tw:w-full tw:max-w-lg tw:translate-x-[-50%] tw:translate-y-[-50%] tw:gap-4 tw:border tw:bg-background tw:p-6 tw:shadow-lg tw:duration-200 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[state=closed]:slide-out-to-left-1/2 tw:data-[state=closed]:slide-out-to-top-[48%] tw:data-[state=open]:slide-in-from-left-1/2 tw:data-[state=open]:slide-in-from-top-[48%] tw:sm:rounded-lg",
          t
        ),
        ...o,
        dir: i,
        children: [
          e,
          /* @__PURE__ */ w(
            Ee.Close,
            {
              className: m(
                "tw:absolute tw:top-4 tw:rounded-sm tw:opacity-70 tw:ring-offset-background tw:transition-opacity tw:hover:opacity-100 tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2 tw:disabled:pointer-events-none tw:data-[state=open]:bg-accent tw:data-[state=open]:text-muted-foreground",
                { "tw:right-4": i === "ltr" },
                { "tw:left-4": i === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Oe, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Sa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m(
        "tw:flex tw:flex-col tw:space-y-1.5 tw:text-center tw:sm:text-start",
        t
      ),
      ...e
    }
  );
}
function Ra({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Ee.Title,
    {
      ref: e,
      className: m("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...n
    }
  );
}
function se({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ge,
    {
      ref: e,
      className: m(
        "tw:flex tw:h-full tw:w-full tw:flex-col tw:overflow-hidden tw:rounded-md tw:bg-popover tw:text-popover-foreground",
        t
      ),
      ...n
    }
  );
}
function Ye({
  className: t,
  ref: e,
  ...n
}) {
  const o = dt();
  return /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3", dir: o, children: [
    /* @__PURE__ */ r(lo, { className: "tw:me-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" }),
    /* @__PURE__ */ r(
      ge.Input,
      {
        ref: e,
        className: m(
          "tw:flex tw:h-10 tw:w-full tw:rounded-md tw:bg-transparent tw:py-3 tw:text-sm tw:outline-none tw:placeholder:text-muted-foreground tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
          t
        ),
        ...n
      }
    )
  ] });
}
function ae({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ge.List,
    {
      ref: e,
      className: m("tw:max-h-[300px] tw:overflow-y-auto tw:overflow-x-hidden", t),
      ...n
    }
  );
}
function vn({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ r(ge.Empty, { ref: t, className: "tw:py-6 tw:text-center tw:text-sm", ...e });
}
function ne({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ge.Group,
    {
      ref: e,
      className: m(
        "tw:overflow-hidden tw:p-1 tw:text-foreground tw:[&_[cmdk-group-heading]]:px-2 tw:[&_[cmdk-group-heading]]:py-1.5 tw:[&_[cmdk-group-heading]]:text-xs tw:[&_[cmdk-group-heading]]:font-medium tw:[&_[cmdk-group-heading]]:text-muted-foreground",
        t
      ),
      ...n
    }
  );
}
function Da({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ge.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:h-px tw:bg-border", t),
      ...n
    }
  );
}
function Ht({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ge.Item,
    {
      ref: e,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:gap-2 tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:data-[disabled=true]:pointer-events-none tw:data-[selected=true]:bg-accent tw:data-[selected=true]:text-accent-foreground tw:data-[disabled=true]:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        t
      ),
      ...n
    }
  );
}
function Ma({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Vo = (t, e, n, o, i) => {
  switch (t) {
    case H.OT:
      return e ?? "Old Testament";
    case H.NT:
      return n ?? "New Testament";
    case H.DC:
      return o ?? "Deuterocanon";
    case H.Extra:
      return i ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, Oa = (t, e, n, o, i) => {
  switch (t) {
    case H.OT:
      return e ?? "OT";
    case H.NT:
      return n ?? "NT";
    case H.DC:
      return o ?? "DC";
    case H.Extra:
      return i ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function _e(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? it.bookIdToEnglishName(t);
}
function cr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const jo = it.allBookIds.filter(
  (t) => !it.isObsolete(it.bookIdToNumber(t))
), me = Object.fromEntries(
  jo.map((t) => [t, it.bookIdToEnglishName(t)])
);
function dr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const i = it.bookIdToEnglishName(t), s = n == null ? void 0 : n.get(t);
  return !!(Qe(i.toLowerCase(), o) || Qe(t.toLowerCase(), o) || (s ? Qe(s.localizedName.toLowerCase(), o) || Qe(s.localizedId.toLowerCase(), o) : !1));
}
const Fo = qe(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: i,
    className: s,
    showCheck: a = !1,
    localizedBookNames: l,
    commandValue: d
  }, c) => {
    const u = q(!1), f = () => {
      u.current || n == null || n(t), setTimeout(() => {
        u.current = !1;
      }, 100);
    }, h = (v) => {
      u.current = !0, o ? o(v) : n == null || n(t);
    }, p = F(
      () => _e(t, l),
      [t, l]
    ), g = F(
      () => cr(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "tw:mx-1 tw:my-1 tw:border-b-0 tw:border-e-0 tw:border-s-2 tw:border-t-0 tw:border-solid",
          {
            "tw:border-s-red-200": i === H.OT,
            "tw:border-s-purple-200": i === H.NT,
            "tw:border-s-indigo-200": i === H.DC,
            "tw:border-s-amber-200": i === H.Extra
          }
        ),
        children: /* @__PURE__ */ w(
          Ht,
          {
            ref: c,
            value: d || `${t} ${it.bookIdToEnglishName(t)}`,
            onSelect: f,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${it.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: s,
            children: [
              a && /* @__PURE__ */ r(
                jt,
                {
                  className: m(
                    "tw:me-2 tw:h-4 tw:w-4 tw:flex-shrink-0",
                    e ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw:min-w-0 tw:flex-1", children: p }),
              /* @__PURE__ */ r("span", { className: "tw:ms-2 tw:flex-shrink-0 tw:text-xs tw:text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), Bo = oe(
  "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:shadow tw:hover:bg-primary/90",
        destructive: "tw:bg-destructive tw:text-destructive-foreground tw:shadow-sm tw:hover:bg-destructive/90",
        outline: "tw:border tw:border-input tw:bg-background tw:shadow-sm tw:hover:bg-accent tw:hover:text-accent-foreground",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:shadow-sm tw:hover:bg-secondary/80",
        ghost: "tw:hover:bg-accent tw:hover:text-accent-foreground",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline"
      },
      size: {
        default: "tw:h-9 tw:px-4 tw:py-2",
        sm: "tw:h-8 tw:rounded-md tw:px-3 tw:text-xs",
        lg: "tw:h-10 tw:rounded-md tw:px-8",
        icon: "tw:h-9 tw:w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function B({
  className: t,
  variant: e,
  size: n,
  asChild: o = !1,
  ref: i,
  ...s
}) {
  return /* @__PURE__ */ r(o ? Ae : "button", { className: m(Bo({ variant: e, size: n, className: t })), ref: i, ...s });
}
const zt = Ke.Root, le = Ke.Trigger, Ia = Ke.Anchor;
function qt({
  className: t,
  align: e = "center",
  sideOffset: n = 4,
  ref: o,
  ...i
}) {
  const s = dt();
  return /* @__PURE__ */ r(Ke.Portal, { children: /* @__PURE__ */ r(
    Ke.Content,
    {
      ref: o,
      align: e,
      sideOffset: n,
      className: m(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw:z-[250]",
        "pr-twp tw:w-72 tw:rounded-md tw:border tw:bg-popover tw:p-4 tw:text-popover-foreground tw:shadow-md tw:outline-none tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...i,
      dir: s
    }
  ) });
}
function qn(t, e, n) {
  return `${t} ${me[t]}${e ? ` ${cr(t, e)} ${_e(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Aa({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (d) => String(d),
  getItemKey: o = (d) => String(d),
  ariaLabel: i = "Show recent searches",
  groupHeading: s = "Recent",
  id: a,
  classNameForItems: l
}) {
  const [d, c] = T(!1);
  if (t.length === 0)
    return;
  const u = (f) => {
    e(f), c(!1);
  };
  return /* @__PURE__ */ w(zt, { open: d, onOpenChange: c, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ r(
      B,
      {
        variant: "ghost",
        size: "icon",
        className: "tw:absolute tw:right-0 tw:top-0 tw:h-full tw:px-3 tw:py-2",
        "aria-label": i,
        children: /* @__PURE__ */ r(Sr, { className: "tw:h-4 tw:w-4" })
      }
    ) }),
    /* @__PURE__ */ r(qt, { id: a, className: "tw:w-[300px] tw:p-0", align: "start", children: /* @__PURE__ */ r(se, { children: /* @__PURE__ */ r(ae, { children: /* @__PURE__ */ r(ne, { heading: s, children: t.map((f) => /* @__PURE__ */ w(
      Ht,
      {
        onSelect: () => u(f),
        className: m("tw:flex tw:items-center", l),
        children: [
          /* @__PURE__ */ r(Sr, { className: "tw:mr-2 tw:h-4 tw:w-4 tw:opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(f) })
        ]
      },
      o(f)
    )) }) }) }) })
  ] });
}
function cw(t, e, n = (i, s) => i === s, o = 15) {
  return (i) => {
    const s = t.filter(
      (l) => !n(l, i)
    ), a = [i, ...s.slice(0, o - 1)];
    e(a);
  };
}
const En = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Pa = [
  En.BOOK_ONLY,
  En.BOOK_CHAPTER,
  En.BOOK_CHAPTER_VERSE
];
function Br(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function $t(t) {
  return fs(it.bookIdToNumber(t));
}
function $a(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Pa.reduce(
    (i, s) => {
      if (i) return i;
      const a = s.exec(t.trim());
      if (a) {
        const [l, d = void 0, c = void 0] = a.slice(1);
        let u;
        const f = e.filter((h) => dr(h, l, n));
        if (f.length === 1 && ([u] = f), !u && d) {
          if (it.isBookIdValid(l)) {
            const h = l.toUpperCase();
            e.includes(h) && (u = h);
          }
          if (!u && n) {
            const h = Array.from(n.entries()).find(
              ([, p]) => p.localizedId.toLowerCase() === l.toLowerCase()
            );
            h && e.includes(h[0]) && ([u] = h);
          }
        }
        if (!u && d) {
          const p = ((g) => Object.keys(me).find(
            (v) => me[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (p && e.includes(p) && (u = p), !u && n) {
            const g = Array.from(n.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([u] = g);
          }
        }
        if (u) {
          let h = d ? parseInt(d, 10) : void 0;
          h && h > $t(u) && (h = Math.max($t(u), 1));
          const p = c ? parseInt(c, 10) : void 0;
          return {
            book: u,
            chapterNum: h,
            verseNum: p
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function La(t, e, n, o) {
  const i = K(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const d = e.indexOf(t.book);
      if (d > 0) {
        const c = e[d - 1], u = Math.max($t(c), 1);
        o({
          book: c,
          chapterNum: u,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = K(() => {
    const d = $t(t.book);
    if (t.chapterNum < d)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const u = e[c + 1];
        o({
          book: u,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), a = K(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = K(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return F(() => [
    {
      onClick: i,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Rr : Dr
    },
    {
      onClick: a,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? jn : Ce
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Ce : jn
    },
    {
      onClick: s,
      disabled: e.length === 0 || (t.chapterNum === $t(t.book) || $t(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Dr : Rr
    }
  ], [
    t,
    e,
    n,
    i,
    a,
    l,
    s
  ]);
}
function Kr({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: i,
  className: s
}) {
  if (t)
    return /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r("div", { className: m("tw:grid tw:grid-cols-6 tw:gap-1", s), children: Array.from({ length: $t(t) }, (a, l) => l + 1).map((a) => /* @__PURE__ */ r(
      Ht,
      {
        value: `${t} ${me[t] || ""} ${a}`,
        onSelect: () => n(a),
        ref: o(a),
        className: m(
          "tw:h-8 tw:w-8 tw:cursor-pointer tw:justify-center tw:rounded-md tw:text-center tw:text-sm",
          {
            "tw:bg-primary tw:text-primary-foreground": t === e.book && a === e.chapterNum
          },
          {
            "tw:bg-muted/50 tw:text-muted-foreground/50": (i == null ? void 0 : i(a)) ?? !1
          }
        ),
        children: a
      },
      a
    )) }) });
}
function dw({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: i,
  localizedStrings: s,
  recentSearches: a,
  onAddRecentSearch: l,
  id: d
}) {
  const c = dt(), [u, f] = T(!1), [h, p] = T(""), [g, v] = T(""), [b, x] = T("books"), [y, _] = T(void 0), [N, j] = T(!1), $ = q(void 0), E = q(void 0), P = q(void 0), k = q(void 0), S = q({}), L = K(
    (C) => {
      e(C), l && l(C);
    },
    [e, l]
  ), V = F(() => o ? o() : jo, [o]), O = F(() => ({
    [H.OT]: V.filter((W) => it.isBookOT(W)),
    [H.NT]: V.filter((W) => it.isBookNT(W)),
    [H.DC]: V.filter((W) => it.isBookDC(W)),
    [H.Extra]: V.filter((W) => it.extraBooks().includes(W))
  }), [V]), I = F(() => Object.values(O).flat(), [O]), z = F(() => {
    if (!g.trim()) return O;
    const C = {
      [H.OT]: [],
      [H.NT]: [],
      [H.DC]: [],
      [H.Extra]: []
    };
    return [H.OT, H.NT, H.DC, H.Extra].forEach((nt) => {
      C[nt] = O[nt].filter((rt) => dr(rt, g, i));
    }), C;
  }, [O, g, i]), D = F(
    () => $a(g, I, i),
    [g, I, i]
  ), Y = K(() => {
    D && (L({
      book: D.book,
      chapterNum: D.chapterNum ?? 1,
      verseNum: D.verseNum ?? 1
    }), f(!1), v(""), p(""));
  }, [L, D]), Nt = K(
    (C) => {
      if ($t(C) <= 1) {
        L({
          book: C,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), v("");
        return;
      }
      _(C), x("chapters");
    },
    [L]
  ), Ct = K(
    (C) => {
      const W = b === "chapters" ? y : D == null ? void 0 : D.book;
      W && (L({
        book: W,
        chapterNum: C,
        verseNum: 1
      }), f(!1), x("books"), _(void 0), v(""));
    },
    [L, b, y, D]
  ), Et = K(
    (C) => {
      L(C), f(!1), v("");
    },
    [L]
  ), at = La(t, I, c, e), A = K(() => {
    x("books"), _(void 0), setTimeout(() => {
      E.current && E.current.focus();
    }, 0);
  }, []), R = K(
    (C) => {
      if (!C && b === "chapters") {
        A();
        return;
      }
      f(C), C && (x("books"), _(void 0), v(""));
    },
    [b, A]
  ), { otLong: G, ntLong: X, dcLong: Z, extraLong: ot } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, vt = K(
    (C) => Vo(C, G, X, Z, ot),
    [G, X, Z, ot]
  ), lt = K(
    (C) => D ? !!D.chapterNum && !C.toString().includes(D.chapterNum.toString()) : !1,
    [D]
  ), xt = F(
    () => pe(
      t,
      i ? _e(t.book, i) : "English"
    ),
    [t, i]
  ), Tt = K((C) => (W) => {
    S.current[C] = W;
  }, []), pt = K((C) => {
    (C.key === "Home" || C.key === "End") && C.stopPropagation();
  }, []), mt = K(
    (C) => {
      if (C.ctrlKey) return;
      const { isLetter: W, isDigit: nt } = Br(C.key);
      if (b === "chapters") {
        if (C.key === "Backspace") {
          C.preventDefault(), C.stopPropagation(), A();
          return;
        }
        if (W || nt) {
          if (C.preventDefault(), C.stopPropagation(), x("books"), _(void 0), nt && y) {
            const rt = me[y];
            v(`${rt} ${C.key}`);
          } else
            v(C.key);
          setTimeout(() => {
            E.current && E.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && D) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(C.key)) {
        const rt = b === "chapters" ? y : D == null ? void 0 : D.book;
        if (!rt) return;
        const ct = (() => {
          if (!h) return 1;
          const ce = h.match(/(\d+)$/);
          return ce ? parseInt(ce[1], 10) : 0;
        })(), Gt = $t(rt);
        if (!Gt) return;
        let yt = ct;
        const Ze = 6;
        switch (C.key) {
          case "ArrowLeft":
            ct !== 0 && (yt = ct > 1 ? ct - 1 : Gt);
            break;
          case "ArrowRight":
            ct !== 0 && (yt = ct < Gt ? ct + 1 : 1);
            break;
          case "ArrowUp":
            yt = ct === 0 ? Gt : Math.max(1, ct - Ze);
            break;
          case "ArrowDown":
            yt = ct === 0 ? 1 : Math.min(Gt, ct + Ze);
            break;
          default:
            return;
        }
        yt !== ct && (C.preventDefault(), C.stopPropagation(), p(qn(rt, i, yt)), setTimeout(() => {
          const ce = S.current[yt];
          ce && ce.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      D,
      A,
      y,
      h,
      i
    ]
  ), Kt = K((C) => {
    if (C.shiftKey || C.key === "Tab" || C.key === " ") return;
    const { isLetter: W, isDigit: nt } = Br(C.key);
    (W || nt) && (C.preventDefault(), v((rt) => rt + C.key), E.current.focus(), j(!1));
  }, []);
  return Ut(() => {
    const C = setTimeout(() => {
      if (u && b === "books" && P.current && k.current) {
        const W = P.current, nt = k.current, rt = nt.offsetTop, ct = W.clientHeight, Gt = nt.clientHeight, yt = rt - ct / 2 + Gt / 2;
        W.scrollTo({
          top: Math.max(0, yt),
          behavior: "smooth"
        }), p(qn(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(C);
    };
  }, [u, b, g, D, t.book]), Ut(() => {
    if (b === "chapters" && y) {
      const C = y === t.book;
      setTimeout(() => {
        if (P.current)
          if (C) {
            const W = S.current[t.chapterNum];
            W && W.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            P.current.scrollTo({ top: 0 });
        $.current && $.current.focus();
      }, 0);
    }
  }, [b, y, D, t.book, t.chapterNum]), /* @__PURE__ */ w(zt, { open: u, onOpenChange: R, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ r(
      B,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": u,
        className: m(
          "tw:h-8 tw:w-full tw:min-w-16 tw:max-w-48 tw:overflow-hidden tw:px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw:truncate", children: xt })
      }
    ) }),
    /* @__PURE__ */ r(qt, { id: d, forceMount: !0, className: "tw:w-[280px] tw:p-0", align: "center", children: /* @__PURE__ */ w(
      se,
      {
        ref: $,
        onKeyDown: mt,
        loop: !0,
        value: h,
        onValueChange: p,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ w("div", { className: "tw:flex tw:items-end", children: [
            /* @__PURE__ */ w("div", { className: "tw:relative tw:flex-1", children: [
              /* @__PURE__ */ r(
                Ye,
                {
                  ref: E,
                  value: g,
                  onValueChange: v,
                  onKeyDown: pt,
                  onFocus: () => j(!1),
                  className: a && a.length > 0 ? "tw:!pr-10" : ""
                }
              ),
              a && a.length > 0 && /* @__PURE__ */ r(
                Aa,
                {
                  recentSearches: a,
                  onSearchItemSelect: Et,
                  renderItem: (C) => pe(C, "English"),
                  getItemKey: (C) => `${C.book}-${C.chapterNum}-${C.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw:flex tw:items-center tw:gap-1 tw:border-b tw:pe-2", children: at.map(({ onClick: C, disabled: W, title: nt, icon: rt }) => /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  j(!0), C();
                },
                disabled: W,
                className: "tw:h-10 tw:w-4 tw:p-0",
                title: nt,
                onKeyDown: Kt,
                children: /* @__PURE__ */ r(rt, {})
              },
              nt
            )) })
          ] }) : /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:border-b tw:px-3 tw:py-2", children: [
            /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "sm",
                onClick: A,
                className: "tw:mr-2 tw:h-6 tw:w-6 tw:p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r(Ii, { className: "tw:h-4 tw:w-4" }) : /* @__PURE__ */ r(Ai, { className: "tw:h-4 tw:w-4" })
              }
            ),
            y && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw:text-sm tw:font-medium", children: _e(y, i) })
          ] }),
          !N && /* @__PURE__ */ w(ae, { ref: P, children: [
            b === "books" && /* @__PURE__ */ w(st, { children: [
              !D && Object.entries(z).map(([C, W]) => {
                if (W.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(ne, { heading: vt(C), children: W.map((nt) => /* @__PURE__ */ r(
                      Fo,
                      {
                        bookId: nt,
                        onSelect: (rt) => Nt(rt),
                        section: Ve(nt),
                        commandValue: `${nt} ${me[nt]}`,
                        ref: nt === t.book ? k : void 0,
                        localizedBookNames: i
                      },
                      nt
                    )) }, C)
                  );
              }),
              D && /* @__PURE__ */ r(ne, { children: /* @__PURE__ */ r(
                Ht,
                {
                  value: `${D.book} ${me[D.book]} ${D.chapterNum || ""}:${D.verseNum || ""})}`,
                  onSelect: Y,
                  className: "tw:font-semibold tw:text-primary",
                  children: pe(
                    {
                      book: D.book,
                      chapterNum: D.chapterNum ?? 1,
                      verseNum: D.verseNum ?? 1
                    },
                    i ? cr(D.book, i) : void 0
                  )
                },
                "top-match"
              ) }),
              D && $t(D.book) > 1 && /* @__PURE__ */ w(st, { children: [
                /* @__PURE__ */ r("div", { className: "tw:mb-2 tw:px-3 tw:text-sm tw:font-medium tw:text-muted-foreground", children: _e(D.book, i) }),
                /* @__PURE__ */ r(
                  Kr,
                  {
                    bookId: D.book,
                    scrRef: t,
                    onChapterSelect: Ct,
                    setChapterRef: Tt,
                    isChapterDimmed: lt,
                    className: "tw:px-4 tw:pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && y && /* @__PURE__ */ r(
              Kr,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: Ct,
                setChapterRef: Tt,
                className: "tw:p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const ww = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Va = oe(
  "tw:text-sm tw:font-medium tw:leading-none tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-70"
);
function wt({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    _s.Root,
    {
      ref: e,
      className: m("pr-twp", Va(), t),
      ...n
    }
  );
}
function Ko({
  className: t,
  ref: e,
  ...n
}) {
  const o = dt();
  return /* @__PURE__ */ r(
    Kn.Root,
    {
      className: m("pr-twp tw:grid tw:gap-2", t),
      ...n,
      ref: e,
      dir: o
    }
  );
}
function Wn({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Kn.Item,
    {
      ref: e,
      className: m(
        "pr-twp tw:aspect-square tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary tw:text-primary tw:shadow tw:focus:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r(Kn.Indicator, { className: "tw:flex tw:items-center tw:justify-center", children: /* @__PURE__ */ r(rr, { className: "tw:h-3.5 tw:w-3.5 tw:fill-primary" }) })
    }
  );
}
function ja(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Yn({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: i,
  value: s,
  onChange: a = () => {
  },
  getOptionLabel: l = ja,
  getButtonLabel: d,
  icon: c = void 0,
  buttonPlaceholder: u = "",
  textPlaceholder: f = "",
  commandEmptyMessage: h = "No option found",
  buttonVariant: p = "outline",
  alignDropDown: g = "start",
  isDisabled: v = !1,
  ariaLabel: b,
  ...x
}) {
  const [y, _] = T(!1), N = d ?? l, j = (E) => E.length > 0 && typeof E[0] == "object" && "options" in E[0], $ = (E, P) => {
    const k = l(E), S = typeof E == "object" && "secondaryLabel" in E ? E.secondaryLabel : void 0, L = `${P ?? ""}${k}${S ?? ""}`;
    return /* @__PURE__ */ w(
      Ht,
      {
        value: k,
        onSelect: () => {
          a(E), _(!1);
        },
        className: "tw:flex tw:items-center",
        children: [
          /* @__PURE__ */ r(
            jt,
            {
              className: m("tw:me-2 tw:h-4 tw:w-4 tw:shrink-0", {
                "tw:opacity-0": !s || l(s) !== k
              })
            }
          ),
          /* @__PURE__ */ w("span", { className: "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap", children: [
            k,
            S && /* @__PURE__ */ w("span", { className: "tw:text-muted-foreground", children: [
              " · ",
              S
            ] })
          ] })
        ]
      },
      L
    );
  };
  return /* @__PURE__ */ w(zt, { open: y, onOpenChange: _, ...x, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ w(
      B,
      {
        variant: p,
        role: "combobox",
        "aria-expanded": y,
        "aria-label": b,
        id: t,
        className: m(
          "tw:flex tw:w-[200px] tw:items-center tw:justify-between tw:overflow-hidden",
          o ?? n
        ),
        disabled: v,
        children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:overflow-hidden", children: [
            c && /* @__PURE__ */ r("div", { className: "tw:shrink-0 tw:pe-2", children: c }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start"
                ),
                children: s ? N(s) : u
              }
            )
          ] }),
          /* @__PURE__ */ r(Ie, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      qt,
      {
        align: g,
        className: m("tw:w-[200px] tw:p-0", i),
        children: /* @__PURE__ */ w(se, { children: [
          /* @__PURE__ */ r(Ye, { placeholder: f, className: "tw:text-inherit" }),
          /* @__PURE__ */ r(vn, { children: h }),
          /* @__PURE__ */ r(ae, { children: j(e) ? e.map((E) => /* @__PURE__ */ r(ne, { heading: E.groupHeading, children: E.options.map((P) => $(P, E.groupHeading)) }, E.groupHeading)) : e.map((E) => $(E)) })
        ] })
      }
    )
  ] });
}
function Fa({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: i = !1,
  chapterCount: s
}) {
  const a = F(
    () => Array.from({ length: s }, (c, u) => u + 1),
    [s]
  );
  return /* @__PURE__ */ w(st, { children: [
    /* @__PURE__ */ r(wt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Yn,
      {
        isDisabled: i,
        onChange: (c) => {
          n(c), c > e && o(c);
        },
        buttonClassName: "tw:me-2 tw:ms-2 tw:w-20",
        options: a,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(wt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      Yn,
      {
        isDisabled: i,
        onChange: (c) => {
          o(c), c < t && n(c);
        },
        buttonClassName: "tw:ms-2 tw:w-20",
        options: a,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Jn = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Jn || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Jn || (Jn = {}));
const uw = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Tn = (t, e) => t[e] ?? e;
function fw({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: i,
  endChapter: s,
  handleSelectEndChapter: a,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: c
}) {
  const u = Tn(c, "%webView_bookSelector_currentBook%"), f = Tn(c, "%webView_bookSelector_choose%"), h = Tn(c, "%webView_bookSelector_chooseBooks%"), [p, g] = T(
    "current book"
    /* CurrentBook */
  ), v = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ r(
    Ko,
    {
      className: "pr-twp tw:flex",
      value: p,
      onValueChange: (b) => v(b),
      children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:flex-col tw:gap-4", children: [
        /* @__PURE__ */ w("div", { className: "tw:grid tw:grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ r(Wn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(wt, { className: "tw:ms-1", children: u })
          ] }),
          /* @__PURE__ */ r(wt, { className: "tw:flex tw:items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw:flex tw:items-center tw:justify-end", children: /* @__PURE__ */ r(
            Fa,
            {
              isDisabled: p === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: a,
              chapterCount: i,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw:grid tw:grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ r(Wn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(wt, { className: "tw:ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(wt, { className: "tw:flex tw:items-center", children: o.map((b) => it.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ r(
            B,
            {
              disabled: p === "current book",
              onClick: () => n(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
const Go = hn(null);
function Ba(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Bt() {
  const t = or(Go);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), i = new URLSearchParams();
    i.append("code", e);
    for (const s of n) i.append("v", s);
    throw o.search = i.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Uo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ka = Uo ? Ut : U, nn = { tag: ir };
function Ga({ initialConfig: t, children: e }) {
  const n = F(() => {
    const { theme: o, namespace: i, nodes: s, onError: a, editorState: l, html: d } = t, c = Ba(null, o), u = xo({ editable: t.editable, html: d, namespace: i, nodes: s, onError: (f) => a(f, u), theme: o });
    return function(f, h) {
      if (h !== null) {
        if (h === void 0) f.update(() => {
          const p = te();
          if (p.isEmpty()) {
            const g = gn();
            p.append(g);
            const v = Uo ? document.activeElement : null;
            (Ot() !== null || v !== null && v === f.getRootElement()) && g.select();
          }
        }, nn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const p = f.parseEditorState(h);
            f.setEditorState(p, nn);
            break;
          }
          case "object":
            f.setEditorState(h, nn);
            break;
          case "function":
            f.update(() => {
              te().isEmpty() && h(f);
            }, nn);
        }
      }
    }(u, l), [u, c];
  }, []);
  return Ka(() => {
    const o = t.editable, [i] = n;
    i.setEditable(o === void 0 || o);
  }, []), r(Go.Provider, { value: n, children: e });
}
const Ua = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ut : U;
function Ha({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Bt();
  return Ua(() => {
    if (n) return o.registerUpdateListener(({ editorState: i, dirtyElements: s, dirtyLeaves: a, prevEditorState: l, tags: d }) => {
      e && s.size === 0 && a.size === 0 || t && d.has(ir) || l.isEmpty() || n(i, o, d);
    });
  }, [o, t, e, n]), null;
}
const wr = {
  ltr: "tw:text-left",
  rtl: "tw:text-right",
  heading: {
    h1: "tw:scroll-m-20 tw:text-4xl tw:font-extrabold tw:tracking-tight tw:lg:text-5xl",
    h2: "tw:scroll-m-20 tw:border-b tw:pb-2 tw:text-3xl tw:font-semibold tw:tracking-tight tw:first:mt-0",
    h3: "tw:scroll-m-20 tw:text-2xl tw:font-semibold tw:tracking-tight",
    h4: "tw:scroll-m-20 tw:text-xl tw:font-semibold tw:tracking-tight",
    h5: "tw:scroll-m-20 tw:text-lg tw:font-semibold tw:tracking-tight",
    h6: "tw:scroll-m-20 tw:text-base tw:font-semibold tw:tracking-tight"
  },
  paragraph: "tw:outline-none",
  quote: "tw:mt-6 tw:border-l-2 tw:pl-6 tw:italic",
  link: "tw:text-blue-600 tw:hover:underline tw:hover:cursor-pointer",
  list: {
    checklist: "tw:relative",
    listitem: "tw:mx-8",
    listitemChecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-none tw:line-through tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded tw:before:bg-primary tw:before:bg-no-repeat tw:after:content-[""] tw:after:cursor-pointer tw:after:border-white tw:after:border-solid tw:after:absolute tw:after:block tw:after:top-[6px] tw:after:w-[3px] tw:after:left-[7px] tw:after:right-[7px] tw:after:h-[6px] tw:after:rotate-45 tw:after:border-r-2 tw:after:border-b-2 tw:after:border-l-0 tw:after:border-t-0',
    listitemUnchecked: 'tw:relative tw:mx-2 tw:px-6 tw:list-none tw:outline-none tw:before:content-[""] tw:before:w-4 tw:before:h-4 tw:before:top-0.5 tw:before:left-0 tw:before:cursor-pointer tw:before:block tw:before:bg-cover tw:before:absolute tw:before:border tw:before:border-primary tw:before:rounded',
    nested: {
      listitem: "tw:list-none tw:before:hidden tw:after:hidden"
    },
    ol: "tw:m-0 tw:p-0 tw:list-decimal tw:[&>li]:mt-2",
    olDepth: [
      "tw:list-outside tw:!list-decimal",
      "tw:list-outside tw:!list-[upper-roman]",
      "tw:list-outside tw:!list-[lower-roman]",
      "tw:list-outside tw:!list-[upper-alpha]",
      "tw:list-outside tw:!list-[lower-alpha]"
    ],
    ul: "tw:m-0 tw:p-0 tw:list-outside tw:[&>li]:mt-2",
    ulDepth: [
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc",
      "tw:list-outside tw:!list-disc"
    ]
  },
  hashtag: "tw:text-blue-600 tw:bg-blue-100 tw:rounded-md tw:px-1",
  text: {
    bold: "tw:font-bold",
    code: "tw:bg-gray-100 tw:p-1 tw:rounded-md",
    italic: "tw:italic",
    strikethrough: "tw:line-through",
    subscript: "tw:sub",
    superscript: "tw:sup",
    underline: "tw:underline",
    underlineStrikethrough: "tw:underline tw:line-through"
  },
  image: "tw:relative tw:inline-block tw:user-select-none tw:cursor-default editor-image",
  inlineImage: "tw:relative tw:inline-block tw:user-select-none tw:cursor-default inline-editor-image",
  keyword: "tw:text-purple-900 tw:font-bold",
  code: "EditorTheme__code",
  codeHighlight: {
    atrule: "EditorTheme__tokenAttr",
    attr: "EditorTheme__tokenAttr",
    boolean: "EditorTheme__tokenProperty",
    builtin: "EditorTheme__tokenSelector",
    cdata: "EditorTheme__tokenComment",
    char: "EditorTheme__tokenSelector",
    class: "EditorTheme__tokenFunction",
    "class-name": "EditorTheme__tokenFunction",
    comment: "EditorTheme__tokenComment",
    constant: "EditorTheme__tokenProperty",
    deleted: "EditorTheme__tokenProperty",
    doctype: "EditorTheme__tokenComment",
    entity: "EditorTheme__tokenOperator",
    function: "EditorTheme__tokenFunction",
    important: "EditorTheme__tokenVariable",
    inserted: "EditorTheme__tokenSelector",
    keyword: "EditorTheme__tokenAttr",
    namespace: "EditorTheme__tokenVariable",
    number: "EditorTheme__tokenProperty",
    operator: "EditorTheme__tokenOperator",
    prolog: "EditorTheme__tokenComment",
    property: "EditorTheme__tokenProperty",
    punctuation: "EditorTheme__tokenPunctuation",
    regex: "EditorTheme__tokenVariable",
    selector: "EditorTheme__tokenSelector",
    string: "EditorTheme__tokenSelector",
    symbol: "EditorTheme__tokenProperty",
    tag: "EditorTheme__tokenProperty",
    url: "EditorTheme__tokenOperator",
    variable: "EditorTheme__tokenVariable"
  },
  characterLimit: "tw:!bg-destructive/50",
  table: "EditorTheme__table tw:w-fit tw:overflow-scroll tw:border-collapse",
  tableCell: "EditorTheme__tableCell tw:w-24 tw:relative tw:border tw:px-4 tw:py-2 tw:text-left tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",
  tableCellActionButton: "EditorTheme__tableCellActionButton tw:bg-background tw:block tw:border-0 tw:rounded-2xl tw:w-5 tw:h-5 tw:text-foreground tw:cursor-pointer",
  tableCellActionButtonContainer: "EditorTheme__tableCellActionButtonContainer tw:block tw:right-1 tw:top-1.5 tw:absolute tw:z-10 tw:w-5 tw:h-5",
  tableCellEditing: "EditorTheme__tableCellEditing tw:rounded-sm tw:shadow-sm",
  tableCellHeader: "EditorTheme__tableCellHeader tw:bg-muted tw:border tw:px-4 tw:py-2 tw:text-left tw:font-bold tw:[&[align=center]]:text-center tw:[&[align=right]]:text-right",
  tableCellPrimarySelected: "EditorTheme__tableCellPrimarySelected tw:border tw:border-primary tw:border-solid tw:block tw:h-[calc(100%-2px)] tw:w-[calc(100%-2px)] tw:absolute tw:-left-[1px] tw:-top-[1px] tw:z-10 ",
  tableCellResizer: "EditorTheme__tableCellResizer tw:absolute tw:-right-1 tw:h-full tw:w-2 tw:cursor-ew-resize tw:z-10 tw:top-0",
  tableCellSelected: "EditorTheme__tableCellSelected tw:bg-muted",
  tableCellSortedIndicator: "EditorTheme__tableCellSortedIndicator tw:block tw:opacity-50 tw:absolute tw:bottom-0 tw:left-0 tw:w-full tw:h-1 tw:bg-muted",
  tableResizeRuler: "EditorTheme__tableCellResizeRuler tw:block tw:absolute tw:w-[1px] tw:h-full tw:bg-primary tw:top-0",
  tableRowStriping: "EditorTheme__tableRowStriping tw:m-0 tw:border-t tw:p-0 tw:even:bg-muted",
  tableSelected: "EditorTheme__tableSelected tw:ring-2 tw:ring-primary tw:ring-offset-2",
  tableSelection: "EditorTheme__tableSelection tw:bg-transparent",
  layoutItem: "tw:border tw:border-dashed tw:px-4 tw:py-2",
  layoutContainer: "tw:grid tw:gap-2.5 tw:my-2.5 tw:mx-0",
  autocomplete: "tw:text-muted-foreground",
  blockCursor: "",
  embedBlock: {
    base: "tw:user-select-none",
    focus: "tw:ring-2 tw:ring-primary tw:ring-offset-2"
  },
  hr: 'tw:p-0.5 tw:border-none tw:my-1 tw:mx-0 tw:cursor-pointer tw:after:content-[""] tw:after:block tw:after:h-0.5 tw:after:bg-muted tw:selected:ring-2 tw:selected:ring-primary tw:selected:ring-offset-2 tw:selected:user-select-none',
  indent: "[--lexical-indent-base-value:40px]",
  mark: "",
  markOverlap: ""
}, kt = bn.Provider, Dt = bn.Root;
function Lt({
  className: t,
  variant: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    bn.Trigger,
    {
      ref: n,
      className: e ? m(Bo({ variant: e }), t) : t,
      ...o
    }
  );
}
function Mt({
  className: t,
  sideOffset: e = 4,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    bn.Content,
    {
      ref: n,
      sideOffset: e,
      className: m(
        "pr-twp tw:z-50 tw:overflow-hidden tw:rounded-md tw:bg-primary tw:px-3 tw:py-1.5 tw:text-xs tw:text-primary-foreground tw:animate-in tw:fade-in-0 tw:zoom-in-95 tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=closed]:zoom-out-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...o
    }
  );
}
const ur = [
  oa,
  yo,
  No,
  ia
], za = hn(null), Sn = {
  didCatch: !1,
  error: null
};
class qa extends ys {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Sn;
  }
  static getDerivedStateFromError(e) {
    return {
      didCatch: !0,
      error: e
    };
  }
  resetErrorBoundary() {
    const {
      error: e
    } = this.state;
    if (e !== null) {
      for (var n, o, i = arguments.length, s = new Array(i), a = 0; a < i; a++)
        s[a] = arguments[a];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState(Sn);
    }
  }
  componentDidCatch(e, n) {
    var o, i;
    (o = (i = this.props).onError) === null || o === void 0 || o.call(i, e, n);
  }
  componentDidUpdate(e, n) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: i
    } = this.props;
    if (o && n.error !== null && Wa(e.resetKeys, i)) {
      var s, a;
      (s = (a = this.props).onReset) === null || s === void 0 || s.call(a, {
        next: i,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Sn);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: n,
      FallbackComponent: o,
      fallback: i
    } = this.props, {
      didCatch: s,
      error: a
    } = this.state;
    let l = e;
    if (s) {
      const d = {
        error: a,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(d);
      else if (o)
        l = Or(o, d);
      else if (i !== void 0)
        l = i;
      else
        throw a;
    }
    return Or(za.Provider, {
      value: {
        didCatch: s,
        error: a,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function Wa() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function Ya({ children: t, onError: e }) {
  return r(qa, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const Ja = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ut : U;
function Xa(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function Za() {
  return function(t) {
    const [e] = Bt(), n = F(() => t(e), [e, t]), [o, i] = T(() => n.initialValueFn()), s = q(o);
    return Ja(() => {
      const { initialValueFn: a, subscribe: l } = n, d = a();
      return s.current !== d && (s.current = d, i(d)), l((c) => {
        s.current = c, i(c);
      });
    }, [n, t]), o;
  }(Xa);
}
function Qa(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !ks(e) && o !== null) {
    const [i, s] = o, a = t.isBackward(), l = i.getNode(), d = s.getNode(), c = e.is(l), u = e.is(d);
    if (c || u) {
      const [f, h] = Cs(t), p = l.is(d), g = e.is(a ? d : l), v = e.is(a ? l : d);
      let b, x = 0;
      p ? (x = f > h ? h : f, b = f > h ? f : h) : g ? (x = a ? h : f, b = void 0) : v && (x = 0, b = a ? f : h);
      const y = e.__text.slice(x, b);
      y !== e.__text && (n === "clone" && (e = Es(e)), e.__text = y);
    }
  }
  return e;
}
function tl(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Ho = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, el = Ho && "documentMode" in document ? document.documentMode : null;
!(!Ho || !("InputEvent" in window) || el) && "getTargetRanges" in new window.InputEvent("input");
function nl(t) {
  const e = _o(t, (n) => Xt(n) && !n.isInline());
  return Xt(e) || tl(4, t.__key), e;
}
function rl(t) {
  const e = Ot();
  if (!he(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let i = 0; i < o.length; i++) {
    const s = o[i], a = s.getKey();
    if (n.has(a)) continue;
    const l = _o(s, (c) => Xt(c) && !c.isInline());
    if (l === null) continue;
    const d = l.getKey();
    l.canIndent() && !n.has(d) && (n.add(d), t(l));
  }
  return n.size > 0;
}
const ol = Symbol.for("preact-signals");
function xn() {
  if (Zt > 1) return void Zt--;
  let t, e = !1;
  for (; Fe !== void 0; ) {
    let n = Fe;
    for (Fe = void 0, Xn++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && zo(n)) try {
        n.c();
      } catch (i) {
        e || (t = i, e = !0);
      }
      n = o;
    }
  }
  if (Xn = 0, Zt--, e) throw t;
}
function il(t) {
  if (Zt > 0) return t();
  Zt++;
  try {
    return t();
  } finally {
    xn();
  }
}
let J, Fe;
function Gr(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let Zt = 0, Xn = 0, an = 0;
function Ur(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function gt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Ge(t, e) {
  return new gt(t, e);
}
function zo(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function Hr(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function qo(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function we(t, e) {
  gt.call(this, void 0), this.x = t, this.s = void 0, this.g = an - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function sl(t, e) {
  return new we(t, e);
}
function Wo(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    Zt++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, fr(t), o;
    } finally {
      J = n, xn();
    }
  }
}
function fr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Wo(t);
}
function al(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  qo(this), J = t, this.f &= -2, 8 & this.f && fr(this), xn();
}
function Ne(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function re(t, e) {
  const n = new Ne(t, e);
  try {
    n.c();
  } catch (i) {
    throw n.d(), i;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function yn(t, e = {}) {
  const n = {};
  for (const o in t) {
    const i = e[o], s = Ge(i === void 0 ? t[o] : i);
    n[o] = s;
  }
  return n;
}
gt.prototype.brand = ol, gt.prototype.h = function() {
  return !0;
}, gt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Gr(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, gt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Gr(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, gt.prototype.subscribe = function(t) {
  return re(() => {
    const e = this.value, n = J;
    J = void 0;
    try {
      t(e);
    } finally {
      J = n;
    }
  }, { name: "sub" });
}, gt.prototype.valueOf = function() {
  return this.value;
}, gt.prototype.toString = function() {
  return this.value + "";
}, gt.prototype.toJSON = function() {
  return this.value;
}, gt.prototype.peek = function() {
  const t = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = t;
  }
}, Object.defineProperty(gt.prototype, "value", { get() {
  const t = Ur(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Xn > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, an++, Zt++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      xn();
    }
  }
} }), we.prototype = new gt(), we.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === an)) return !0;
  if (this.g = an, this.f |= 1, this.i > 0 && !zo(this)) return this.f &= -2, !0;
  const t = J;
  try {
    Hr(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, qo(this), this.f &= -2, !0;
}, we.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  gt.prototype.S.call(this, t);
}, we.prototype.U = function(t) {
  if (this.t !== void 0 && (gt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, we.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(we.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Ur(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ne.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, Ne.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Wo(this), Hr(this), Zt++;
  const t = J;
  return J = this, al.bind(this, t);
}, Ne.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Fe, Fe = this);
}, Ne.prototype.d = function() {
  this.f |= 8, 1 & this.f || fr(this);
}, Ne.prototype.dispose = function() {
  this.d();
};
Ft({ build: (t, e, n) => yn(e), config: We({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return re(() => o.disabled.value ? void 0 : t.registerRootListener((i) => {
    t.focus(() => {
      const s = document.activeElement;
      i === null || s !== null && i.contains(s) || i.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Yo() {
  const t = te(), e = Ot(), n = gn();
  t.clear(), t.append(n), e !== null && n.select(), he(e) && (e.format = 0);
}
function Jo(t, e = Yo) {
  return t.registerCommand(ko, (n) => (t.update(e), !0), Co);
}
Ft({ build: (t, e, n) => yn(e), config: We({ $onClear: Yo }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return re(() => Jo(t, o.value));
} });
function ll(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Rn = Ss("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Xo extends Gn {
  $config() {
    return this.config("decorator-text", { extends: Gn, stateConfigs: [{ flat: !0, stateConfig: Rn }] });
  }
  getFormat() {
    return js(this, Rn);
  }
  getFormatFlags(e, n) {
    return Ir(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Fs[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Bs(this, Rn, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Ir(n, e, null);
    return this.setFormat(o);
  }
  isInline() {
    return !0;
  }
  createDOM() {
    return document.createElement("span");
  }
  updateDOM() {
    return !1;
  }
}
function cl(t) {
  return t instanceof Xo;
}
Ft({ name: "@lexical/extension/DecoratorText", nodes: () => [Xo], register: (t, e, n) => t.registerCommand(Eo, (o) => {
  const i = Ot();
  if (To(i) || he(i)) for (const s of i.getNodes()) cl(s) && s.toggleFormat(o);
  return !1;
}, So) });
function Zo(t, e) {
  let n;
  return Ge(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const Zn = Ft({ build: (t) => Zo(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Qo(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const i in o) n[i] = Qo(n[i], o[i]);
    return t;
  }
  return e;
}
const pr = 0, Qn = 1, ti = 2, Dn = 3, rn = 4, ye = 5, Mn = 6, $e = 7;
function On(t) {
  return t.id === pr;
}
function ei(t) {
  return t.id === ti;
}
function dl(t) {
  return function(e) {
    return e.id === Qn;
  }(t) || et(305, String(t.id), String(Qn)), Object.assign(t, { id: ti });
}
const wl = /* @__PURE__ */ new Set();
class ul {
  constructor(e, n) {
    ht(this, "builder");
    ht(this, "configs");
    ht(this, "_dependency");
    ht(this, "_peerNameSet");
    ht(this, "extension");
    ht(this, "state");
    ht(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: pr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Ts;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    ei(n) || et(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, i = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, d, c) {
      return Object.assign(l, { config: d, id: Dn, registerState: c });
    }(n, this.mergeConfigs(), o);
    let a;
    this.state = s, this.extension.init && (a = this.extension.init(e, s.config, o)), this.state = function(l, d, c) {
      return Object.assign(l, { id: rn, initResult: d, registerState: c });
    }(s, a, i);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== rn && et(307, String(n.id), String(ye)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const i = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, a, l) {
      return Object.assign(s, { id: ye, output: a, registerState: l });
    }(n, o, i);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== ye && et(308, String(o.id), String(ye));
    const i = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Mn });
    }(o), () => {
      const s = this.state;
      s.id !== $e && et(309, String(o.id), String($e)), this.state = function(a) {
        return Object.assign(a, { id: ye });
      }(s), i && i();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Mn && et(310, String(n.id), String(Mn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(i) {
      return Object.assign(i, { id: $e });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= rn;
    }(e) || et(313, String(e.id), String(rn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Dn;
    }(e) || et(314, String(e.id), String(Dn)), { config: e.config };
  }
  getPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && et(315, this.extension.name, e.name), n.getExtensionInitDependency();
  }
  getDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && et(315, this.extension.name, e.name), n.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(n) {
      return n.id >= $e;
    }(e) || et(316, String(e.id), String($e)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || wl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= ye;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const zr = { tag: ir };
function fl() {
  const t = te();
  t.isEmpty() && t.append(gn());
}
const pl = Ft({ config: We({ setOptions: zr, updateOptions: zr }), init: ({ $initialEditorState: t = fl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const i = o.getInitResult();
  if (!i.initialized) {
    i.initialized = !0;
    const { $initialEditorState: s } = i;
    if (Os(s)) t.setEditorState(s, n);
    else if (typeof s == "function") t.update(() => {
      s(t);
    }, e);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const a = t.parseEditorState(s);
      t.setEditorState(a, n);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [Rs, No, Ds, Ms, yo] }), qr = Symbol.for("@lexical/extension/LexicalBuilder");
function Wr() {
}
function ml(t) {
  throw t;
}
function on(t) {
  return Array.isArray(t) ? t : [t];
}
const In = "0.41.0+prod.esm";
class Be {
  constructor(e) {
    ht(this, "roots");
    ht(this, "extensionNameMap");
    ht(this, "outgoingConfigEdges");
    ht(this, "incomingEdges");
    ht(this, "conflicts");
    ht(this, "_sortedExtensionReps");
    ht(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = In, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [on(pl)];
    for (const o of e) n.push(on(o));
    return new Be(n);
  }
  static maybeFromEditor(e) {
    const n = e[qr];
    return n && (n.PACKAGE_VERSION !== In && et(292, n.PACKAGE_VERSION, In), n instanceof Be || et(293)), n;
  }
  static fromEditor(e) {
    const n = Be.maybeFromEditor(e);
    return n === void 0 && et(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), i = Object.assign(xo({ ...o, ...n ? { onError: (s) => {
      n(s, i);
    } } : {} }), { [qr]: this });
    for (const s of this.sortedExtensionReps()) s.build(i);
    return i;
  }
  buildEditor() {
    let e = Wr;
    function n() {
      try {
        e();
      } finally {
        e = Wr;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = ee(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const n = this.extensionNameMap.get(e.name);
    if (n) return n.extension !== e && et(295, e.name), n;
  }
  addEdge(e, n, o) {
    const i = this.outgoingConfigEdges.get(e);
    i ? i.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && et(296);
    const n = on(e), [o] = n;
    typeof o.name != "string" && et(297, typeof o.name);
    let i = this.extensionNameMap.get(o.name);
    if (i !== void 0 && i.extension !== o && et(298, o.name), !i) {
      i = new ul(this, o), this.extensionNameMap.set(o.name, i);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && et(299, o.name, s);
      for (const a of o.conflictsWith || []) this.extensionNameMap.has(a) && et(299, o.name, a), this.conflicts.set(a, o.name);
      for (const a of o.dependencies || []) {
        const l = on(a);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [a, l] of o.peerDependencies || []) this.addEdge(o.name, a, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, i) => {
      let s = o.state;
      if (ei(s)) return;
      const a = o.extension.name;
      var l;
      On(s) || et(300, a, i || "[unknown]"), On(l = s) || et(304, String(l.id), String(pr)), s = Object.assign(l, { id: Qn }), o.state = s;
      const d = this.outgoingConfigEdges.get(a);
      if (d) for (const c of d.keys()) {
        const u = this.extensionNameMap.get(c);
        u && n(u, a);
      }
      s = dl(s), o.state = s, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) On(o.state) && n(o);
    for (const o of e) for (const [i, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const a = this.extensionNameMap.get(i);
      if (a) for (const l of s) a.configs.add(l);
    }
    for (const [o, ...i] of this.roots) if (i.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && et(301, o.name);
      for (const a of i) s.configs.add(a);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const n = this.sortedExtensionReps(), o = new AbortController(), i = [() => o.abort()], s = o.signal;
    for (const a of n) {
      const l = a.register(e, s);
      l && i.push(l);
    }
    for (const a of n) {
      const l = a.afterRegistration(e);
      l && i.push(l);
    }
    return ee(...i);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), s = {}, a = {}, l = this.sortedExtensionReps();
    for (const u of l) {
      const { extension: f } = u;
      if (f.onError !== void 0 && (e.onError = f.onError), f.disableEvents !== void 0 && (e.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (e.parentEditor = f.parentEditor), f.editable !== void 0 && (e.editable = f.editable), f.namespace !== void 0 && (e.namespace = f.namespace), f.$initialEditorState !== void 0 && (e.$initialEditorState = f.$initialEditorState), f.nodes) for (const h of ll(f)) {
        if (typeof h != "function") {
          const p = o.get(h.replace);
          p && et(302, f.name, h.replace.name, p.extension.name), o.set(h.replace, u);
        }
        n.add(h);
      }
      if (f.html) {
        if (f.html.export) for (const [h, p] of f.html.export.entries()) i.set(h, p);
        f.html.import && Object.assign(s, f.html.import);
      }
      f.theme && Qo(a, f.theme);
    }
    Object.keys(a).length > 0 && (e.theme = a), n.size && (e.nodes = [...n]);
    const d = Object.keys(s).length > 0, c = i.size > 0;
    (d || c) && (e.html = {}, d && (e.html.import = s), c && (e.html.export = i));
    for (const u of l) u.init(e);
    return e.onError || (e.onError = ml), e;
  }
}
const hl = /* @__PURE__ */ new Set(), Yr = Ft({ build(t, e, n) {
  const o = n.getDependency(Zn).output, i = Ge({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Zo(() => {
  }, () => re(() => {
    const a = s.peek(), { watchedNodeKeys: l } = i.value;
    let d, c = !1;
    o.value.read(() => {
      if (Ot()) for (const [u, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(u);
          continue;
        }
        const h = Gs(u), p = h && h.isSelected() || !1;
        c = c || p !== (!!a && a.has(u)), p && (d = d || /* @__PURE__ */ new Set(), d.add(u));
      }
    }), !c && d && a && d.size === a.size || (s.value = d);
  }));
  return { watchNodeKey: function(a) {
    const l = sl(() => (s.value || hl).has(a)), { watchedNodeKeys: d } = i.peek();
    let c = d.get(a);
    const u = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), u || (d.set(a, c), i.value = { watchedNodeKeys: d }), l;
  } };
}, dependencies: [Zn], name: "@lexical/extension/NodeSelection" });
Is("INSERT_HORIZONTAL_RULE_COMMAND");
class Te extends Gn {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Te(e.__key);
  }
  static importJSON(e) {
    return ni().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: gl, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Ro(n, e.theme.hr), n;
  }
  getTextContent() {
    return `
`;
  }
  isInline() {
    return !1;
  }
  updateDOM() {
    return !1;
  }
}
function gl() {
  return { node: ni() };
}
function ni() {
  return Ks(Te);
}
function bl(t) {
  return t instanceof Te;
}
Ft({ dependencies: [Zn, Yr], name: "@lexical/extension/HorizontalRule", nodes: () => [Te], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(Yr).output, i = Ge({ nodeSelections: /* @__PURE__ */ new Map() }), s = t._config.theme.hrSelected ?? "selected";
  return ee(t.registerCommand(As, (a) => {
    if (Ps(a.target)) {
      const l = $s(a.target);
      if (bl(l)) return function(d, c = !1) {
        const u = Ot(), f = d.isSelected(), h = d.getKey();
        let p;
        c && To(u) ? p = u : (p = Ls(), Vs(p)), f ? p.delete(h) : p.add(h);
      }(l, a.shiftKey), !0;
    }
    return !1;
  }, So), t.registerMutationListener(Te, (a, l) => {
    il(() => {
      let d = !1;
      const { nodeSelections: c } = i.peek();
      for (const [u, f] of a.entries()) if (f === "destroyed") c.delete(u), d = !0;
      else {
        const h = c.get(u), p = t.getElementByKey(u);
        h ? h.domNode.value = p : (d = !0, c.set(u, { domNode: Ge(p), selectedSignal: o(u) }));
      }
      d && (i.value = { nodeSelections: c });
    });
  }), re(() => {
    const a = [];
    for (const { domNode: l, selectedSignal: d } of i.value.nodeSelections.values()) a.push(re(() => {
      const c = l.value;
      c && (d.value ? Ro(c, s) : Us(c, s));
    }));
    return ee(...a);
  }));
} });
function ri(t) {
  return t.canBeEmpty();
}
function vl(t, e, n = ri) {
  return ee(t.registerCommand(Hs, (o) => {
    const i = Ot();
    if (!he(i)) return !1;
    o.preventDefault();
    const s = function(a) {
      if (a.getNodes().filter((h) => dn(h) && h.canIndent()).length > 0) return !0;
      const l = a.anchor, d = a.focus, c = d.isBefore(l) ? d : l, u = c.getNode(), f = nl(u);
      if (f.canIndent()) {
        const h = f.getKey();
        let p = zs();
        if (p.anchor.set(h, 0, "element"), p.focus.set(h, 0, "element"), p = qs(p), p.anchor.is(c)) return !0;
      }
      return !1;
    }(i) ? o.shiftKey ? Ws : Ar : Ys;
    return t.dispatchCommand(s, void 0);
  }, Co), t.registerCommand(Ar, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, i = Ot();
    if (!he(i)) return !1;
    const s = typeof n == "function" ? n : n.peek();
    return rl((a) => {
      if (s(a)) {
        const l = a.getIndent() + 1;
        (!o || l < o) && a.setIndent(l);
      }
    });
  }, sr));
}
Ft({ build: (t, e, n) => yn(e), config: We({ $canIndent: ri, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: i, $canIndent: s } = n.getOutput();
  return re(() => {
    if (!o.value) return vl(t, i, s);
  });
} });
const xl = Ft({ name: "@lexical/react/ReactProvider" });
function yl() {
  return te().getTextContent();
}
function Nl(t, e = !0) {
  if (t) return !1;
  let n = yl();
  return e && (n = n.trim()), n === "";
}
function _l(t) {
  if (!Nl(t, !1)) return !1;
  const e = te().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const i = e[o];
    if (Js(i)) return !1;
    if (Xt(i)) {
      if (!Xs(i) || i.__indent !== 0) return !1;
      const s = i.getChildren(), a = s.length;
      for (let l = 0; l < a; l++) {
        const d = s[o];
        if (!wn(d)) return !1;
      }
    }
  }
  return !0;
}
function oi(t) {
  return () => _l(t);
}
function ii(t) {
  const e = window.location.origin, n = (o) => {
    if (o.origin !== e) return;
    const i = t.getRootElement();
    if (document.activeElement !== i) return;
    const s = o.data;
    if (typeof s == "string") {
      let a;
      try {
        a = JSON.parse(s);
      } catch {
        return;
      }
      if (a && a.protocol === "nuanria_messaging" && a.type === "request") {
        const l = a.payload;
        if (l && l.functionId === "makeChanges") {
          const d = l.args;
          if (d) {
            const [c, u, f, h, p] = d;
            t.update(() => {
              const g = Ot();
              if (he(g)) {
                const v = g.anchor;
                let b = v.getNode(), x = 0, y = 0;
                if (wn(b) && c >= 0 && u >= 0 && (x = c, y = c + u, g.setTextNodeRange(b, x, b, y)), x === y && f === "" || (g.insertRawText(f), b = v.getNode()), wn(b)) {
                  x = h, y = h + p;
                  const _ = b.getTextContentSize();
                  x = x > _ ? _ : x, y = y > _ ? _ : y, g.setTextNodeRange(b, x, b, y);
                }
                o.stopImmediatePropagation();
              }
            });
          }
        }
      }
    }
  };
  return window.addEventListener("message", n, !0), () => {
    window.removeEventListener("message", n, !0);
  };
}
Ft({ build: (t, e, n) => yn(e), config: We({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => re(() => n.getOutput().disabled.value ? void 0 : ii(t)) });
function kl(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const i of e) o.append("v", i);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const mr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ut : U;
function Cl({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [i, s] = T(() => n.getDecorators());
    return mr(() => n.registerDecoratorListener((a) => {
      aa(() => {
        s(a);
      });
    }), [n]), U(() => {
      s(n.getDecorators());
    }, [n]), F(() => {
      const a = [], l = Object.keys(i);
      for (let d = 0; d < l.length; d++) {
        const c = l[d], u = r(o, { onError: (h) => n._onError(h), children: r(Ns, { fallback: null, children: i[c] }) }), f = n.getElementByKey(c);
        f !== null && a.push(la(u, f, c));
      }
      return a;
    }, [o, i, n]);
  }(t, e);
}
function El({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Be.maybeFromEditor(n);
    if (o && o.hasExtensionByName(xl.name)) {
      for (const i of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(i) && kl(320, i);
      return !0;
    }
    return !1;
  }(t) ? null : r(Cl, { editor: t, ErrorBoundary: e });
}
function Jr(t) {
  return t.getEditorState().read(oi(t.isComposing()));
}
function Tl({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Bt();
  return function(i) {
    mr(() => ee(sa(i), ii(i)), [i]);
  }(o), w(st, { children: [t, r(Sl, { content: e }), r(El, { editor: o, ErrorBoundary: n })] });
}
function Sl({ content: t }) {
  const [e] = Bt(), n = function(i) {
    const [s, a] = T(() => Jr(i));
    return mr(() => {
      function l() {
        const d = Jr(i);
        a(d);
      }
      return l(), ee(i.registerUpdateListener(() => {
        l();
      }), i.registerEditableListener(() => {
        l();
      }));
    }, [i]), s;
  }(e), o = Za();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Rl({ defaultSelection: t }) {
  const [e] = Bt();
  return U(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Dl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ut : U;
function Ml({ onClear: t }) {
  const [e] = Bt();
  return Dl(() => Jo(e, t), [e, t]), null;
}
const si = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ut : U;
function Ol({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: i, ariaErrorMessage: s, ariaExpanded: a, ariaInvalid: l, ariaLabel: d, ariaLabelledBy: c, ariaMultiline: u, ariaOwns: f, ariaRequired: h, autoCapitalize: p, className: g, id: v, role: b = "textbox", spellCheck: x = !0, style: y, tabIndex: _, "data-testid": N, ...j }, $) {
  const [E, P] = T(t.isEditable()), k = K((L) => {
    L && L.ownerDocument && L.ownerDocument.defaultView ? t.setRootElement(L) : t.setRootElement(null);
  }, [t]), S = F(() => /* @__PURE__ */ function(...L) {
    return (V) => {
      for (const O of L) typeof O == "function" ? O(V) : O != null && (O.current = V);
    };
  }($, k), [k, $]);
  return si(() => (P(t.isEditable()), t.registerEditableListener((L) => {
    P(L);
  })), [t]), r("div", { "aria-activedescendant": E ? e : void 0, "aria-autocomplete": E ? n : "none", "aria-controls": E ? o : void 0, "aria-describedby": i, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": E && b === "combobox" ? !!a : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": d, "aria-labelledby": c, "aria-multiline": u, "aria-owns": E ? f : void 0, "aria-readonly": !E || void 0, "aria-required": h, autoCapitalize: p, className: g, contentEditable: E, "data-testid": N, id: v, ref: S, role: b, spellCheck: x, style: y, tabIndex: _, ...j });
}
const Il = qe(Ol);
function Xr(t) {
  return t.getEditorState().read(oi(t.isComposing()));
}
const Al = qe(Pl);
function Pl(t, e) {
  const { placeholder: n, ...o } = t, [i] = Bt();
  return w(st, { children: [r(Il, { editor: i, ...o, ref: e }), n != null && r($l, { editor: i, content: n })] });
}
function $l({ content: t, editor: e }) {
  const n = function(a) {
    const [l, d] = T(() => Xr(a));
    return si(() => {
      function c() {
        const u = Xr(a);
        d(u);
      }
      return c(), ee(a.registerUpdateListener(() => {
        c();
      }), a.registerEditableListener(() => {
        c();
      }));
    }, [a]), l;
  }(e), [o, i] = T(e.isEditable());
  if (Ut(() => (i(e.isEditable()), e.registerEditableListener((a) => {
    i(a);
  })), [e]), !n) return null;
  let s = null;
  return typeof t == "function" ? s = t(o) : t !== null && (s = t), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function Ll({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Al,
    {
      className: e ?? "ContentEditable__root tw:relative tw:block tw:min-h-11 tw:overflow-auto tw:px-3 tw:py-3 tw:text-sm tw:outline-none",
      "aria-placeholder": t,
      placeholder: /* @__PURE__ */ r(
        "div",
        {
          className: n ?? "tw:pointer-events-none tw:absolute tw:top-0 tw:select-none tw:overflow-hidden tw:text-ellipsis tw:px-3 tw:py-3 tw:text-sm tw:text-muted-foreground",
          children: t
        }
      )
    }
  );
}
const ai = hn(void 0);
function Vl({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: i,
  children: s
}) {
  const a = F(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: i
    }),
    [t, e, n, o, i]
  );
  return /* @__PURE__ */ r(ai.Provider, { value: a, children: s });
}
function li() {
  const t = or(ai);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function jl() {
  const [t, e] = T(void 0), n = K(() => {
    e(void 0);
  }, []), o = F(() => {
    if (t === void 0)
      return;
    const { title: s, content: a } = t;
    return /* @__PURE__ */ r(ka, { open: !0, onOpenChange: n, children: /* @__PURE__ */ w(Ta, { children: [
      /* @__PURE__ */ r(Sa, { children: /* @__PURE__ */ r(Ra, { children: s }) }),
      a
    ] }) });
  }, [t, n]), i = K(
    (s, a, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: a(n),
        title: s
      });
    },
    [n]
  );
  return [o, i];
}
function Fl({
  children: t
}) {
  const [e] = Bt(), [n, o] = T(e), [i, s] = T("paragraph"), [a, l] = jl(), d = () => {
  };
  return U(() => n.registerCommand(
    Do,
    (c, u) => (o(u), !1),
    sr
  ), [n]), /* @__PURE__ */ w(
    Vl,
    {
      activeEditor: n,
      $updateToolbar: d,
      blockType: i,
      setBlockType: s,
      showModal: l,
      children: [
        a,
        t({ blockType: i })
      ]
    }
  );
}
function Bl(t) {
  const [e] = Bt(), { activeEditor: n } = li();
  U(() => n.registerCommand(
    Do,
    () => {
      const o = Ot();
      return o && t(o), !1;
    },
    sr
  ), [e, t]), U(() => {
    n.getEditorState().read(() => {
      const o = Ot();
      o && t(o);
    });
  }, [n, t]);
}
const Kl = oe(
  "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors tw:hover:bg-muted tw:hover:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=on]:bg-accent tw:data-[state=on]:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        outline: "tw:border tw:border-input tw:bg-transparent tw:shadow-sm tw:hover:bg-accent tw:hover:text-accent-foreground"
      },
      size: {
        default: "tw:h-9 tw:px-2 tw:min-w-9",
        sm: "tw:h-8 tw:px-1.5 tw:min-w-8",
        lg: "tw:h-10 tw:px-2.5 tw:min-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ci = tt.createContext({
  size: "default",
  variant: "default"
});
function di({
  className: t,
  variant: e,
  size: n,
  children: o,
  ref: i,
  ...s
}) {
  const a = dt();
  return /* @__PURE__ */ r(
    Io.Root,
    {
      ref: i,
      className: m("pr-twp tw:flex tw:items-center tw:justify-center tw:gap-1", t),
      ...s,
      dir: a,
      children: /* @__PURE__ */ r(
        ci.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
}
function ln({
  className: t,
  children: e,
  variant: n,
  size: o,
  ref: i,
  ...s
}) {
  const a = tt.useContext(ci);
  return /* @__PURE__ */ r(
    Io.Item,
    {
      ref: i,
      className: m(
        Kl({
          variant: a.variant || n,
          size: a.size || o
        }),
        t
      ),
      ...s,
      children: e
    }
  );
}
const Zr = [
  { format: "bold", icon: Pi, label: "Bold" },
  { format: "italic", icon: $i, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Gl() {
  const { activeEditor: t } = li(), [e, n] = T([]), o = K((i) => {
    if (he(i) || ca(i)) {
      const s = [];
      Zr.forEach(({ format: a }) => {
        i.hasFormat(a) && s.push(a);
      }), n((a) => a.length !== s.length || !s.every((l) => a.includes(l)) ? s : a);
    }
  }, []);
  return Bl(o), /* @__PURE__ */ r(
    di,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: Zr.map(({ format: i, icon: s, label: a }) => /* @__PURE__ */ r(
        ln,
        {
          value: i,
          "aria-label": a,
          onClick: () => {
            t.dispatchCommand(Eo, i);
          },
          children: /* @__PURE__ */ r(s, { className: "tw:h-4 tw:w-4" })
        },
        i
      ))
    }
  );
}
function Ul({ onClear: t }) {
  const [e] = Bt();
  U(() => {
    t && t(() => {
      e.dispatchCommand(ko, void 0);
    });
  }, [e, t]);
}
function Hl({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = T(void 0);
  return /* @__PURE__ */ w("div", { className: "tw:relative", children: [
    /* @__PURE__ */ r(Fl, { children: () => /* @__PURE__ */ r("div", { className: "tw:sticky tw:top-0 tw:z-10 tw:flex tw:gap-2 tw:overflow-auto tw:border-b tw:p-1", children: /* @__PURE__ */ r(Gl, {}) }) }),
    /* @__PURE__ */ w("div", { className: "tw:relative", children: [
      /* @__PURE__ */ r(
        Tl,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(Ll, { placeholder: t }) }),
          ErrorBoundary: Ya
        }
      ),
      e && /* @__PURE__ */ r(Rl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Ul, { onClear: n }),
      /* @__PURE__ */ r(Ml, {})
    ] })
  ] });
}
const zl = {
  namespace: "commentEditor",
  theme: wr,
  nodes: ur,
  onError: (t) => {
    console.error(t);
  }
};
function un({
  editorState: t,
  editorSerializedState: e,
  onChange: n,
  onSerializedChange: o,
  placeholder: i = "Start typing…",
  autoFocus: s = !1,
  onClear: a,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "pr-twp tw:overflow-hidden tw:rounded-lg tw:border tw:bg-background tw:shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          Ga,
          {
            initialConfig: {
              ...zl,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ w(kt, { children: [
              /* @__PURE__ */ r(Hl, { placeholder: i, autoFocus: s, onClear: a }),
              /* @__PURE__ */ r(
                Ha,
                {
                  ignoreSelectionChange: !0,
                  onChange: (d) => {
                    n == null || n(d), o == null || o(d.toJSON());
                  }
                }
              )
            ] })
          }
        )
      }
    )
  );
}
function ql(t, e) {
  const n = ta(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const i = [];
  for (const s of n) if (!ui.has(s.nodeName)) {
    const a = fi(s, t, i, !1);
    a !== null && (o = o.concat(a));
  }
  return function(s) {
    for (const a of s) a.getNextSibling() instanceof Mo && a.insertAfter(Oo());
    for (const a of s) {
      const l = a.getChildren();
      for (const d of l) a.insertBefore(d);
      a.remove();
    }
  }(i), o;
}
function Wl(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = te().getChildren();
  for (let i = 0; i < o.length; i++)
    wi(t, o[i], n, e);
  return n.innerHTML;
}
function wi(t, e, n, o = null) {
  let i = o === null || e.isSelected(o);
  const s = Xt(e) && e.excludeFromCopy("html");
  let a = e;
  o !== null && wn(e) && (a = Qa(o, e, "clone"));
  const l = Xt(a) ? a.getChildren() : [], d = Zs(t, a.getType());
  let c;
  c = d && d.exportDOM !== void 0 ? d.exportDOM(t, a) : a.exportDOM(t);
  const { element: u, after: f } = c;
  if (!u) return !1;
  const h = document.createDocumentFragment();
  for (let p = 0; p < l.length; p++) {
    const g = l[p], v = wi(t, g, h, o);
    !i && Xt(e) && v && e.extractWithChild(g, o, "html") && (i = !0);
  }
  if (i && !s) {
    if ((Qs(u) || Pr(u)) && u.append(h), n.append(u), f) {
      const p = f.call(a, u);
      p && (Pr(u) ? u.replaceChildren(p) : u.replaceWith(p));
    }
  } else n.append(h);
  return i;
}
const ui = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function fi(t, e, n, o, i = /* @__PURE__ */ new Map(), s) {
  let a = [];
  if (ui.has(t.nodeName)) return a;
  let l = null;
  const d = function(g, v) {
    const { nodeName: b } = g, x = v._htmlConversions.get(b.toLowerCase());
    let y = null;
    if (x !== void 0) for (const _ of x) {
      const N = _(g);
      N !== null && (y === null || (y.priority || 0) <= (N.priority || 0)) && (y = N);
    }
    return y !== null ? y.conversion : null;
  }(t, e), c = d ? d(t) : null;
  let u = null;
  if (c !== null) {
    u = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of i) if (l = v(l, s), !l) break;
      l && a.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && i.set(t.nodeName, c.forChild);
  }
  const f = t.childNodes;
  let h = [];
  const p = (l == null || !ea(l)) && (l != null && dn(l) || o);
  for (let g = 0; g < f.length; g++) h.push(...fi(f[g], e, n, p, new Map(i), l));
  return u != null && (h = u(h)), $r(t) && (h = Yl(t, h, p ? () => {
    const g = new Mo();
    return n.push(g), g;
  } : gn)), l == null ? h.length > 0 ? a = a.concat(h) : $r(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Lr(g.nextSibling) && Lr(g.previousSibling);
  }(t) && (a = a.concat(Oo())) : Xt(l) && l.append(...h), a;
}
function Yl(t, e, n) {
  const o = t.style.textAlign, i = [];
  let s = [];
  for (let a = 0; a < e.length; a++) {
    const l = e[a];
    if (dn(l)) o && !l.getFormat() && l.setFormat(o), i.push(l);
    else if (s.push(l), a === e.length - 1 || a < e.length - 1 && dn(e[a + 1])) {
      const d = n();
      d.setFormat(o), d.append(...s), i.push(d), s = [];
    }
  }
  return i;
}
function pi(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function mi(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : mi(e.children)
  ) : !1;
}
function Rt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? mi(t.root.children) : !1;
}
function Jl(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = Ao({
    namespace: "EditorUtils",
    theme: wr,
    nodes: ur,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const i = new DOMParser().parseFromString(t, "text/html"), s = ql(e, i);
      te().clear(), na(s);
    },
    {
      discrete: !0
    }
  ), e.getEditorState().read(() => {
    n = e.getEditorState().toJSON();
  }), !n)
    throw new Error("Failed to convert HTML to editor state");
  return n;
}
function fn(t) {
  const e = Ao({
    namespace: "EditorUtils",
    theme: wr,
    nodes: ur,
    onError: (i) => {
      console.error(i);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = Wl(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function hr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function cn(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function gr(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const Xl = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: ""
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};
function An(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function pw({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [i, s] = T(Xl), [a, l] = T(void 0), [d, c] = T(!1), u = q(void 0), f = q(null);
  U(() => {
    let x = !0;
    const y = f.current;
    if (!y) return;
    const _ = setTimeout(() => {
      x && pi(y);
    }, 300);
    return () => {
      x = !1, clearTimeout(_);
    };
  }, []);
  const h = K(() => {
    if (!Rt(i)) return;
    const x = fn(i);
    e(x, a);
  }, [i, e, a]), p = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", v = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", b = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ w("div", { className: "pr-twp tw:grid tw:gap-3", children: [
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw:text-sm tw:font-medium", children: b }),
      /* @__PURE__ */ w("div", { className: "tw:flex tw:gap-2", children: [
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
          /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(B, { onClick: n, className: "tw:h-6 tw:w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Oe, {}) }) }),
          /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ r("p", { children: v }) })
        ] }) }),
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
          /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(
            B,
            {
              onClick: h,
              className: "tw:h-6 tw:w-6",
              size: "icon",
              variant: "default",
              disabled: !Rt(i),
              children: /* @__PURE__ */ r(jt, {})
            }
          ) }),
          /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw:flex tw:items-center tw:gap-2", children: /* @__PURE__ */ w(zt, { open: d, onOpenChange: c, children: [
      /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          className: "tw:flex tw:w-full tw:items-center tw:justify-start tw:gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(co, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ r("span", { children: An(a !== void 0 ? a : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        qt,
        {
          className: "tw:w-auto tw:p-0",
          align: "start",
          onKeyDown: (x) => {
            x.key === "Escape" && (x.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(se, { children: /* @__PURE__ */ r(ae, { children: t.map((x) => /* @__PURE__ */ r(
            Ht,
            {
              onSelect: () => {
                l(x === "" ? void 0 : x), c(!1);
              },
              className: "tw:flex tw:items-center",
              children: /* @__PURE__ */ r("span", { children: An(x, o) })
            },
            x || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ r(
      "div",
      {
        ref: f,
        role: "textbox",
        tabIndex: -1,
        className: "tw:outline-none",
        onKeyDownCapture: (x) => {
          x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), n()) : gr(x) && (x.preventDefault(), x.stopPropagation(), Rt(i) && h());
        },
        onKeyDown: (x) => {
          hr(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          un,
          {
            editorSerializedState: i,
            onSerializedChange: (x) => s(x),
            placeholder: p,
            onClear: (x) => {
              u.current = x;
            }
          }
        )
      }
    )
  ] });
}
const mw = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), hw = [
  "%comment_assign_team%",
  "%comment_assign_unassigned%",
  "%comment_assigned_to%",
  "%comment_assigning_to%",
  "%comment_dateAtTime%",
  "%comment_date_today%",
  "%comment_date_yesterday%",
  "%comment_deleteComment%",
  "%comment_editComment%",
  "%comment_replyOrAssign%",
  "%comment_reopenResolved%",
  "%comment_status_resolved%",
  "%comment_status_todo%",
  "%comment_thread_multiple_replies%",
  "%comment_thread_single_reply%"
], Zl = ["input", "select", "textarea", "button"], Ql = ["button", "textbox"], tc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const i = q(null), [s, a] = T(void 0), [l, d] = T(void 0), c = K(
    (p) => {
      a(p);
      const g = t.find((b) => b.id === p);
      g && (e == null || e(g));
      const v = document.getElementById(p);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), i.current && i.current.setAttribute("aria-activedescendant", p);
    },
    [e, t]
  ), u = K(
    (p) => {
      const g = t.find((v) => v.id === p);
      g && (d((v) => v === p ? void 0 : p), n == null || n(g));
    },
    [n, t]
  ), f = (p) => {
    if (!p) return !1;
    const g = p.tagName.toLowerCase();
    if (p.isContentEditable || Zl.includes(g)) return !0;
    const v = p.getAttribute("role");
    if (v && Ql.includes(v)) return !0;
    const b = p.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, h = K(
    (p) => {
      var E;
      const g = p.target, v = (P) => P ? document.getElementById(P) : void 0, b = v(l), x = v(s);
      if (!!(b && g && b.contains(g) && g !== b) && f(g)) {
        if (p.key === "Escape" || p.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            p.preventDefault(), p.stopPropagation();
            const P = t.find((k) => k.id === l);
            P && c(P.id);
          }
          return;
        }
        if (p.key === "ArrowDown" || p.key === "ArrowUp") {
          if (!b) return;
          const P = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (P.length === 0) return;
          const k = P.findIndex((L) => L === g);
          if (k === -1) return;
          let S;
          p.key === "ArrowDown" ? S = Math.min(k + 1, P.length - 1) : S = Math.max(k - 1, 0), S !== k && (p.preventDefault(), p.stopPropagation(), (E = P[S]) == null || E.focus());
          return;
        }
        return;
      }
      const N = t.findIndex((P) => P.id === s);
      let j = N;
      switch (p.key) {
        case "ArrowDown":
          j = Math.min(N + 1, t.length - 1), p.preventDefault();
          break;
        case "ArrowUp":
          j = Math.max(N - 1, 0), p.preventDefault();
          break;
        case "Home":
          j = 0, p.preventDefault();
          break;
        case "End":
          j = t.length - 1, p.preventDefault();
          break;
        case " ":
        case "Enter":
          s && u(s), p.preventDefault(), p.stopPropagation();
          return;
        case "ArrowRight": {
          const P = x;
          if (P) {
            const k = P.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = P.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), L = k ?? S;
            if (L) {
              p.preventDefault(), L.focus();
              return;
            }
          }
          break;
        }
        default:
          p.key.length === 1 && !p.metaKey && !p.ctrlKey && !p.altKey && (f(g) || (o == null || o(p.key), p.preventDefault()));
          return;
      }
      const $ = t[j];
      $ && c($.id);
    },
    [t, c, s, l, u, o]
  );
  return {
    listboxRef: i,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: c
  };
}, ec = oe(
  "pr-twp tw:inline-flex tw:items-center tw:rounded-md tw:border tw:px-2.5 tw:py-0.5 tw:text-xs tw:font-semibold tw:transition-colors tw:focus:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "tw:border-transparent tw:bg-primary tw:text-primary-foreground tw:shadow tw:hover:bg-primary/80",
        secondary: "tw:border-transparent tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80",
        muted: "tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80",
        destructive: "tw:border-transparent tw:bg-destructive tw:text-destructive-foreground tw:shadow tw:hover:bg-destructive/80",
        outline: "tw:text-foreground",
        blueIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0",
        mutedIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0",
        ghost: "tw:hover:bg-accent tw:hover:text-accent-foreground tw:text-mu"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Ue({
  className: t,
  variant: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r("div", { ref: n, className: m("pr-twp", ec({ variant: e }), t), ...o });
}
function nc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      className: m(
        "pr-twp tw:rounded-xl tw:border tw:bg-card tw:text-card-foreground tw:shadow",
        t
      ),
      ...n
    }
  );
}
function gw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      className: m("pr-twp tw:flex tw:flex-col tw:space-y-1.5 tw:p-6", t),
      ...n
    }
  );
}
function bw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "h3",
    {
      ref: e,
      className: m(
        "pr-twp tw:font-semibold tw:leading-none tw:tracking-tight",
        t
      ),
      ...n,
      children: n.children
    }
  );
}
function vw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "p",
    {
      ref: e,
      className: m("pr-twp tw:text-sm tw:text-muted-foreground", t),
      ...n
    }
  );
}
function rc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r("div", { ref: e, className: m("pr-twp tw:p-6 tw:pt-0", t), ...n });
}
function xw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      className: m("pr-twp tw:flex tw:items-center tw:p-6 tw:pt-0", t),
      ...n
    }
  );
}
function He({
  className: t,
  orientation: e = "horizontal",
  decorative: n = !0,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ r(
    da.Root,
    {
      ref: o,
      decorative: n,
      orientation: e,
      className: m(
        "pr-twp tw:shrink-0 tw:bg-border",
        e === "horizontal" ? "tw:h-[1px] tw:w-full" : "tw:h-full tw:w-[1px]",
        t
      ),
      ...i
    }
  );
}
function oc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ar.Root,
    {
      ref: e,
      className: m(
        "pr-twp tw:relative tw:flex tw:h-10 tw:w-10 tw:shrink-0 tw:overflow-hidden tw:rounded-full",
        t
      ),
      ...n
    }
  );
}
function yw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ar.Image,
    {
      ref: e,
      className: m("pr-twp tw:aspect-square tw:h-full tw:w-full", t),
      ...n
    }
  );
}
function ic({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ar.Fallback,
    {
      ref: e,
      className: m(
        "pr-twp tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center tw:rounded-full tw:bg-muted",
        t
      ),
      ...n
    }
  );
}
const br = hn(void 0);
function Wt() {
  const t = or(br);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const be = oe("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Pe = ut.Trigger, hi = ut.Group, sc = ut.Portal, ac = ut.Sub, lc = ut.RadioGroup;
function ve({ variant: t = "default", ...e }) {
  const n = tt.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(br.Provider, { value: n, children: /* @__PURE__ */ r(ut.Root, { ...e }) });
}
function cc({
  className: t,
  inset: e,
  children: n,
  ref: o,
  ...i
}) {
  const s = Wt();
  return /* @__PURE__ */ w(
    ut.SubTrigger,
    {
      ref: o,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:data-[state=open]:bg-accent tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        e && "tw:pl-8",
        t,
        be({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...i,
      children: [
        n,
        /* @__PURE__ */ r(Ce, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function dc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ut.SubContent,
    {
      ref: e,
      className: m(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...n
    }
  );
}
function xe({
  className: t,
  sideOffset: e = 4,
  children: n,
  ref: o,
  ...i
}) {
  const s = dt();
  return /* @__PURE__ */ r(ut.Portal, { children: /* @__PURE__ */ r(
    ut.Content,
    {
      ref: o,
      sideOffset: e,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...i,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
}
function tr({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  const i = dt(), s = Wt();
  return /* @__PURE__ */ r(
    ut.Item,
    {
      ref: n,
      className: m(
        // removed: tw:relative tw:focus:text-accent-foreground
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:size-4 tw:[&_svg]:shrink-0",
        e && "tw:pl-8",
        t,
        be({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      dir: i
    }
  );
}
function Qt({
  className: t,
  children: e,
  checked: n,
  ref: o,
  ...i
}) {
  const s = Wt();
  return /* @__PURE__ */ w(
    ut.CheckboxItem,
    {
      ref: o,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        be({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ r(ut.ItemIndicator, { children: /* @__PURE__ */ r(jt, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function wc({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  const i = Wt();
  return /* @__PURE__ */ w(
    ut.RadioItem,
    {
      ref: n,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:transition-colors tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t,
        be({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw:absolute tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center tw:ltr:left-2 tw:rtl:right-2", children: /* @__PURE__ */ r(ut.ItemIndicator, { children: /* @__PURE__ */ r(rr, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Nn({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    ut.Label,
    {
      ref: n,
      className: m("tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold", e && "tw:pl-8", t),
      ...o
    }
  );
}
function Je({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ut.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...n
    }
  );
}
function Nw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw:ms-auto tw:text-xs tw:tracking-widest tw:opacity-60", t),
      ...e
    }
  );
}
function Qr({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: i,
  handleDeleteComment: s,
  onEditingChange: a,
  canEditOrDelete: l = !1
}) {
  const [d, c] = T(!1), [u, f] = T(), h = q(null);
  U(() => {
    if (!d) return;
    let N = !0;
    const j = h.current;
    if (!j) return;
    const $ = setTimeout(() => {
      N && pi(j);
    }, 300);
    return () => {
      N = !1, clearTimeout($);
    };
  }, [d]);
  const p = K(
    (N) => {
      N && N.stopPropagation(), c(!1), f(void 0), a == null || a(!1);
    },
    [a]
  ), g = K(
    async (N) => {
      if (N && N.stopPropagation(), !u || !i) return;
      await i(
        t.id,
        fn(u)
      ) && (c(!1), f(void 0), a == null || a(!1));
    },
    [u, i, t.id, a]
  ), v = F(() => {
    const N = new Date(t.date), j = ps(
      N,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), $ = N.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return fe(n["%comment_dateAtTime%"], {
      date: j,
      time: $
    });
  }, [t.date, n]), b = F(() => t.user, [t.user]), x = F(
    () => t.user.split(" ").map((N) => N[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = F(() => ms(t.contents), [t.contents]), _ = F(() => {
    if (o && l)
      return /* @__PURE__ */ w(st, { children: [
        /* @__PURE__ */ w(
          tr,
          {
            onClick: (N) => {
              N.stopPropagation(), c(!0), f(Jl(t.contents)), a == null || a(!0);
            },
            children: [
              /* @__PURE__ */ r(Li, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ w(
          tr,
          {
            onClick: async (N) => {
              N.stopPropagation(), s && await s(t.id);
            },
            children: [
              /* @__PURE__ */ r(Vi, { className: "tw:me-2 tw:h-4 tw:w-4" }),
              n["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    l,
    o,
    n,
    t.contents,
    t.id,
    s,
    a
  ]);
  return /* @__PURE__ */ w(
    "div",
    {
      className: m("tw:flex tw:w-full tw:flex-row tw:items-baseline tw:gap-3 tw:space-y-3", {
        "tw:text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(oc, { className: "tw:h-8 tw:w-8", children: /* @__PURE__ */ r(ic, { className: "tw:text-xs tw:font-medium", children: x }) }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-1 tw:flex-col tw:gap-2", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:flex-row tw:flex-wrap tw:items-baseline tw:gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw:text-sm tw:font-medium", children: b }),
            /* @__PURE__ */ r("p", { className: "tw:text-xs tw:font-normal tw:text-muted-foreground", children: v }),
            /* @__PURE__ */ r("div", { className: "tw:flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ w(Ue, { variant: "secondary", className: "tw:text-xs tw:font-normal", children: [
              "→ ",
              cn(t.assignedUser, n)
            ] })
          ] }),
          d && /* @__PURE__ */ w(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw:flex tw:flex-col tw:gap-2",
              ref: h,
              onKeyDownCapture: (N) => {
                N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), p()) : gr(N) && (N.preventDefault(), N.stopPropagation(), Rt(u) && g());
              },
              onKeyDown: (N) => {
                hr(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
              },
              onClick: (N) => {
                N.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  un,
                  {
                    className: m(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      'tw:[&_[data-lexical-editor="true"]>blockquote]:mt-0 tw:[&_[data-lexical-editor="true"]>blockquote]:border-s-0 tw:[&_[data-lexical-editor="true"]>blockquote]:ps-0 tw:[&_[data-lexical-editor="true"]>blockquote]:font-normal tw:[&_[data-lexical-editor="true"]>blockquote]:not-italic tw:[&_[data-lexical-editor="true"]>blockquote]:text-foreground'
                    ),
                    editorSerializedState: u,
                    onSerializedChange: (N) => f(N)
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-row tw:items-start tw:justify-end tw:gap-2", children: [
                  /* @__PURE__ */ r(
                    B,
                    {
                      size: "icon",
                      onClick: p,
                      variant: "outline",
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      children: /* @__PURE__ */ r(Oe, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    B,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                      disabled: !Rt(u),
                      children: /* @__PURE__ */ r(wo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !d && /* @__PURE__ */ w(st, { children: [
            t.status === "Resolved" && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic", children: n["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ r("div", { className: "tw:text-sm tw:italic", children: n["%comment_status_todo%"] }),
            /* @__PURE__ */ r(
              "div",
              {
                className: m(
                  "tw:prose tw:items-start tw:gap-2 tw:break-words tw:text-sm tw:font-normal tw:text-foreground",
                  // tw:prose has a max width defined on it, that we choose to override
                  "tw:max-w-none",
                  // Don't render blockquote on the first child. All comments are wrapped in blockquote
                  // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                  // But we don't want it to look like there's a blockquote there. Apply styles to the
                  // blockquote directly inside this div.
                  "tw:[&>blockquote]:border-s-0 tw:[&>blockquote]:p-0 tw:[&>blockquote]:ps-0 tw:[&>blockquote]:font-normal tw:[&>blockquote]:not-italic tw:[&>blockquote]:text-foreground",
                  // Don't render quotes on blockquotes
                  "tw:prose-quoteless",
                  {
                    "tw:line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: y }
              }
            )
          ] })
        ] }),
        _ && /* @__PURE__ */ w(ve, { children: [
          /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(uo, {}) }) }),
          /* @__PURE__ */ r(xe, { align: "end", children: _ })
        ] })
      ]
    }
  );
}
const to = {
  root: {
    children: [
      {
        children: [
          {
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text: "",
            type: "text",
            version: 1
          }
        ],
        direction: "ltr",
        format: "",
        indent: 0,
        type: "paragraph",
        version: 1,
        textFormat: 0,
        textStyle: ""
      }
    ],
    direction: "ltr",
    format: "",
    indent: 0,
    type: "root",
    version: 1
  }
};
function uc({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: i,
  assignedUser: s,
  currentUser: a,
  handleSelectThread: l,
  threadId: d,
  thread: c,
  threadStatus: u,
  handleAddCommentToThread: f,
  handleUpdateComment: h,
  handleDeleteComment: p,
  handleReadStatusChange: g,
  assignableUsers: v,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: x,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: _,
  isRead: N = !1,
  autoReadDelay: j = 5,
  onVerseRefClick: $
}) {
  const [E, P] = T(to), [k, S] = T(
    void 0
  ), L = o, [V, O] = T(!1), [I, z] = T(!1), [D, Y] = T(!1), [Nt, Ct] = T(!1), [Et, at] = T(!1), [A, R] = T(N), [G, X] = T(!1), Z = q(void 0), [ot, vt] = T(/* @__PURE__ */ new Map());
  U(() => {
    let M = !0;
    return (async () => {
      const _t = y ? await y(d) : !1;
      M && at(_t);
    })(), () => {
      M = !1;
    };
  }, [d, y]), U(() => {
    let M = !0;
    if (!o) {
      Ct(!1), vt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const _t = x ? await x(d) : !1;
      M && Ct(_t);
    })(), () => {
      M = !1;
    };
  }, [o, d, x]);
  const lt = F(() => e.filter((M) => !M.deleted), [e]);
  U(() => {
    let M = !0;
    if (!o || !_) {
      vt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const _t = /* @__PURE__ */ new Map();
      await Promise.all(
        lt.map(async (Tr) => {
          const Di = await _(Tr.id);
          M && _t.set(Tr.id, Di);
        })
      ), M && vt(_t);
    })(), () => {
      M = !1;
    };
  }, [o, lt, _]);
  const xt = F(() => lt[0], [lt]), Tt = q(null), pt = q(void 0), mt = K(() => {
    var M;
    (M = pt.current) == null || M.call(pt), P(to);
  }, []), Kt = K(() => {
    const M = !A;
    R(M), X(!M), g == null || g(d, M);
  }, [A, g, d]);
  U(() => {
    O(!1);
  }, [o]), U(() => {
    if (o && !A && !G) {
      const M = setTimeout(() => {
        R(!0), g == null || g(d, !0);
      }, j * 1e3);
      return Z.current = M, () => clearTimeout(M);
    }
    Z.current && (clearTimeout(Z.current), Z.current = void 0);
  }, [o, A, G, j, d, g]);
  const C = F(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), W = F(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const M = cn(s, n);
    return fe(n["%comment_assigned_to%"], {
      assignedUser: M
    });
  }, [s, n]), nt = F(() => lt.slice(1), [lt]), rt = F(() => nt.length ?? 0, [nt.length]), ct = F(() => rt > 0, [rt]), Gt = F(() => V || rt <= 2 ? nt : nt.slice(-2), [nt, rt, V]), yt = F(() => V || rt <= 2 ? 0 : rt - 2, [rt, V]), Ze = F(
    () => rt === 1 ? C.singleReply : fe(C.multipleReplies, { count: rt }),
    [rt, C]
  ), ce = F(
    () => yt === 1 ? C.singleReply : fe(C.multipleReplies, { count: yt }),
    [yt, C]
  );
  U(() => {
    !o && I && ct && z(!1);
  }, [o, I, ct]);
  const Cr = K(
    async (M) => {
      M && M.stopPropagation();
      const At = Rt(E) ? fn(E) : void 0;
      if (k !== void 0) {
        await f({
          threadId: d,
          contents: At,
          assignedUser: k
        }) && (S(void 0), At && mt());
        return;
      }
      At && await f({ threadId: d, contents: At }) && mt();
    },
    [
      mt,
      E,
      f,
      k,
      d
    ]
  ), Er = K(
    async (M) => {
      const At = Rt(E) ? fn(E) : void 0, _t = await f({
        ...M,
        contents: At,
        assignedUser: k ?? M.assignedUser
      });
      return _t && At && mt(), _t && k !== void 0 && S(void 0), _t;
    },
    [mt, E, f, k]
  );
  return /* @__PURE__ */ r(
    nc,
    {
      role: "option",
      "aria-selected": o,
      id: d,
      className: m(
        "tw:group tw:w-full tw:rounded-none tw:border-none tw:p-4 tw:outline-none tw:transition-all tw:duration-200 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        { "tw:cursor-pointer tw:hover:shadow-md": !o },
        {
          "tw:bg-primary-foreground": !o && u !== "Resolved" && A,
          "tw:bg-background": o && u !== "Resolved" && A,
          "tw:bg-muted": u === "Resolved",
          "tw:bg-accent": !A && !o && u !== "Resolved"
        }
      ),
      onClick: () => {
        l(d);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ w(rc, { className: "tw:flex tw:flex-col tw:gap-2 tw:p-0", children: [
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:content-center tw:items-start tw:gap-4", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
            W && /* @__PURE__ */ r(Ue, { className: "tw:rounded-sm tw:bg-input tw:text-sm tw:font-normal tw:text-primary tw:hover:bg-input", children: W }),
            /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "icon",
                onClick: (M) => {
                  M.stopPropagation(), Kt();
                },
                className: "tw:text-muted-foreground tw:transition tw:hover:text-foreground",
                "aria-label": A ? "Mark as unread" : "Mark as read",
                children: A ? /* @__PURE__ */ r(ji, {}) : /* @__PURE__ */ r(Fi, {})
              }
            ),
            Et && u !== "Resolved" && /* @__PURE__ */ r(
              B,
              {
                variant: "ghost",
                size: "icon",
                className: m(
                  "tw:ms-auto",
                  "tw:text-primary tw:transition-opacity tw:duration-200 tw:hover:bg-primary/10",
                  "tw:opacity-0 tw:group-hover:opacity-100"
                ),
                onClick: (M) => {
                  M.stopPropagation(), Er({
                    threadId: d,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(jt, { className: "tw:h-4 tw:w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw:flex tw:max-w-full tw:flex-wrap tw:items-baseline tw:gap-2", children: /* @__PURE__ */ w(
            "p",
            {
              ref: Tt,
              className: m(
                "tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:font-normal tw:text-muted-foreground",
                {
                  "tw:overflow-visible tw:text-clip tw:whitespace-normal tw:break-words": L
                },
                { "tw:whitespace-nowrap": !L }
              ),
              children: [
                i && $ ? /* @__PURE__ */ r(
                  B,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw:h-auto tw:px-1 tw:py-0 tw:text-sm tw:font-normal tw:text-muted-foreground",
                    onClick: (M) => {
                      M.stopPropagation(), $(c);
                    },
                    children: i
                  }
                ) : i,
                /* @__PURE__ */ w("span", { className: t, children: [
                  xt.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw:font-bold", children: xt.selectedText }),
                  xt.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ r(
            Qr,
            {
              comment: xt,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: u,
              handleAddCommentToThread: Er,
              handleUpdateComment: h,
              handleDeleteComment: p,
              onEditingChange: z,
              canEditOrDelete: (!I && ot.get(xt.id)) ?? !1,
              canUserResolveThread: Et
            }
          )
        ] }),
        /* @__PURE__ */ w(st, { children: [
          ct && !o && /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw:w-8", children: /* @__PURE__ */ r(He, {}) }),
            /* @__PURE__ */ r("p", { className: "tw:text-sm tw:text-muted-foreground", children: Ze })
          ] }),
          !o && Rt(E) && /* @__PURE__ */ r(
            un,
            {
              editorSerializedState: E,
              onSerializedChange: (M) => P(M),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ w(st, { children: [
            yt > 0 && /* @__PURE__ */ w(
              "div",
              {
                className: "tw:flex tw:cursor-pointer tw:items-center tw:gap-5 tw:py-2",
                onClick: (M) => {
                  M.stopPropagation(), O(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (M) => {
                  (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), O(!0));
                },
                children: [
                  /* @__PURE__ */ r("div", { className: "tw:w-8", children: /* @__PURE__ */ r(He, {}) }),
                  /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw:text-sm tw:text-muted-foreground", children: ce }),
                    V ? /* @__PURE__ */ r(fo, {}) : /* @__PURE__ */ r(Ie, {})
                  ] })
                ]
              }
            ),
            Gt.map((M) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              Qr,
              {
                comment: M,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: p,
                onEditingChange: z,
                canEditOrDelete: (!I && ot.get(M.id)) ?? !1
              }
            ) }, M.id)),
            b !== !1 && (!I || Rt(E)) && /* @__PURE__ */ w(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw:w-full tw:space-y-2",
                onClick: (M) => M.stopPropagation(),
                onKeyDownCapture: (M) => {
                  gr(M) && (M.preventDefault(), M.stopPropagation(), (Rt(E) || k !== void 0) && Cr());
                },
                onKeyDown: (M) => {
                  hr(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    un,
                    {
                      editorSerializedState: E,
                      onSerializedChange: (M) => P(M),
                      placeholder: u === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (M) => {
                        pt.current = M;
                      }
                    }
                  ),
                  /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-row tw:items-center tw:justify-end tw:gap-2", children: [
                    k !== void 0 && /* @__PURE__ */ r("span", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: fe(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: cn(
                          k,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ w(zt, { open: D, onOpenChange: Y, children: [
                      /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ r(
                        B,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                          disabled: !Nt || !v || v.length === 0 || !v.includes(a),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(co, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        qt,
                        {
                          className: "tw:w-auto tw:p-0",
                          align: "end",
                          onKeyDown: (M) => {
                            M.key === "Escape" && (M.stopPropagation(), Y(!1));
                          },
                          children: /* @__PURE__ */ r(se, { children: /* @__PURE__ */ r(ae, { children: v == null ? void 0 : v.map((M) => /* @__PURE__ */ r(
                            Ht,
                            {
                              onSelect: () => {
                                S(M !== s ? M : void 0), Y(!1);
                              },
                              className: "tw:flex tw:items-center",
                              children: /* @__PURE__ */ r("span", { children: cn(M, n) })
                            },
                            M || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      B,
                      {
                        size: "icon",
                        onClick: Cr,
                        className: "tw:flex tw:items-center tw:justify-center tw:rounded-md",
                        disabled: !Rt(E) && k === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(wo, {})
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ] })
      ] })
    }
  );
}
function _w({
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: i,
  handleAddCommentToThread: s,
  handleUpdateComment: a,
  handleDeleteComment: l,
  handleReadStatusChange: d,
  assignableUsers: c,
  canUserAddCommentToThread: u,
  canUserAssignThreadCallback: f,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: p,
  selectedThreadId: g,
  onSelectedThreadChange: v,
  onVerseRefClick: b
}) {
  const [x, y] = T(/* @__PURE__ */ new Set()), [_, N] = T();
  U(() => {
    g && (y((O) => new Set(O).add(g)), N(g));
  }, [g]);
  const j = n.filter(
    (O) => O.comments.some((I) => !I.deleted)
  ), $ = j.map((O) => ({
    id: O.id
  })), E = K(
    (O) => {
      y((I) => new Set(I).add(O.id)), N(O.id), v == null || v(O.id);
    },
    [v]
  ), P = K(
    (O) => {
      const I = x.has(O);
      y((z) => {
        const D = new Set(z);
        return D.has(O) ? D.delete(O) : D.add(O), D;
      }), N(O), v == null || v(I ? void 0 : O);
    },
    [x, v]
  ), { listboxRef: k, activeId: S, handleKeyDown: L } = tc({
    options: $,
    onOptionSelect: E
  }), V = K(
    (O) => {
      O.key === "Escape" ? (_ && x.has(_) && (y((I) => {
        const z = new Set(I);
        return z.delete(_), z;
      }), N(void 0), v == null || v(void 0)), O.preventDefault(), O.stopPropagation()) : L(O);
    },
    [_, x, L, v]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: k,
      "aria-activedescendant": S ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw:flex tw:w-full tw:flex-col tw:space-y-3 tw:outline-none tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        t
      ),
      onKeyDown: V,
      children: j.map((O) => /* @__PURE__ */ r(
        "div",
        {
          id: O.id,
          className: m({
            "tw:opacity-60": O.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            uc,
            {
              classNameForVerseText: e,
              comments: O.comments,
              localizedStrings: i,
              verseRef: O.verseRef,
              handleSelectThread: P,
              threadId: O.id,
              thread: O,
              isRead: O.isRead,
              isSelected: x.has(O.id),
              currentUser: o,
              assignedUser: O.assignedUser,
              threadStatus: O.status,
              handleAddCommentToThread: s,
              handleUpdateComment: a,
              handleDeleteComment: l,
              handleReadStatusChange: d,
              assignableUsers: c,
              canUserAddCommentToThread: u,
              canUserAssignThreadCallback: f,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: p,
              onVerseRefClick: b
            }
          )
        },
        O.id
      ))
    }
  );
}
function fc({ table: t }) {
  return /* @__PURE__ */ w(ve, { children: [
    /* @__PURE__ */ r(wa, { asChild: !0, children: /* @__PURE__ */ w(B, { variant: "outline", size: "sm", className: "tw:ml-auto tw:hidden tw:h-8 tw:lg:flex", children: [
      /* @__PURE__ */ r(Bi, { className: "tw:mr-2 tw:h-4 tw:w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ w(xe, { align: "end", className: "tw:w-[150px]", children: [
      /* @__PURE__ */ r(Nn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Je, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        Qt,
        {
          className: "tw:capitalize",
          checked: e.getIsVisible(),
          onCheckedChange: (n) => e.toggleVisibility(!!n),
          children: e.id
        },
        e.id
      ))
    ] })
  ] });
}
const Se = bt.Root, pc = bt.Group, Re = bt.Value, mc = oe(
  "tw:flex tw:h-9 tw:w-full tw:items-center tw:justify-between tw:whitespace-nowrap tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-sm tw:shadow-sm tw:ring-offset-background tw:data-[placeholder]:text-muted-foreground tw:focus:outline-none tw:focus:ring-1 tw:focus:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:[&>span]:line-clamp-1",
  {
    variants: {
      size: {
        default: "tw:h-9 tw:px-4 tw:py-2",
        sm: "tw:h-8 tw:rounded-md tw:px-3",
        lg: "tw:h-11 tw:rounded-md tw:px-8",
        icon: "tw:h-9 tw:w-9"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
function De({
  className: t,
  children: e,
  size: n,
  ref: o,
  ...i
}) {
  const s = dt();
  return /* @__PURE__ */ w(
    bt.Trigger,
    {
      className: m(mc({ size: n, className: t })),
      ref: o,
      ...i,
      dir: s,
      children: [
        e,
        /* @__PURE__ */ r(bt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ie, { className: "tw:h-4 tw:w-4 tw:opacity-50" }) })
      ]
    }
  );
}
function hc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    bt.ScrollUpButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r(fo, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function gc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    bt.ScrollDownButton,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:items-center tw:justify-center tw:py-1",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r(Ie, { className: "tw:h-4 tw:w-4" })
    }
  );
}
function Me({
  className: t,
  children: e,
  position: n = "popper",
  ref: o,
  ...i
}) {
  const s = dt();
  return /* @__PURE__ */ r(bt.Portal, { children: /* @__PURE__ */ w(
    bt.Content,
    {
      ref: o,
      className: m(
        "pr-twp tw:relative tw:z-50 tw:max-h-96 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        n === "popper" && "tw:data-[side=bottom]:translate-y-1 tw:data-[side=left]:-translate-x-1 tw:data-[side=right]:translate-x-1 tw:data-[side=top]:-translate-y-1",
        t
      ),
      position: n,
      ...i,
      children: [
        /* @__PURE__ */ r(hc, {}),
        /* @__PURE__ */ r(
          bt.Viewport,
          {
            className: m(
              "tw:p-1",
              n === "popper" && "tw:h-[var(--radix-select-trigger-height)] tw:w-full tw:min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: e })
          }
        ),
        /* @__PURE__ */ r(gc, {})
      ]
    }
  ) });
}
function kw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    bt.Label,
    {
      ref: e,
      className: m("tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:font-semibold", t),
      ...n
    }
  );
}
function St({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ w(
    bt.Item,
    {
      ref: n,
      className: m(
        "tw:relative tw:flex tw:w-full tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pe-2 tw:ps-8 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw:absolute tw:start-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ r(bt.ItemIndicator, { children: /* @__PURE__ */ r(jt, { className: "tw:h-4 tw:w-4" }) }) }),
        /* @__PURE__ */ r(bt.ItemText, { children: e })
      ]
    }
  );
}
function Cw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    bt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...n
    }
  );
}
function bc({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw:flex tw:items-center tw:justify-between tw:px-2 tw:pb-3 tw:pt-3", children: /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:space-x-6 tw:lg:space-x-8", children: [
    /* @__PURE__ */ w("div", { className: "tw:flex-1 tw:text-sm tw:text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw:text-nowrap tw:text-sm tw:font-medium", children: "Rows per page" }),
      /* @__PURE__ */ w(
        Se,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(De, { className: "tw:h-8 tw:w-[70px]", children: /* @__PURE__ */ r(Re, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Me, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(St, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:w-[100px] tw:items-center tw:justify-center tw:text-sm tw:font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:space-x-2", children: [
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Ki, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Gi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:h-8 tw:w-8 tw:p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Ui, { className: "tw:h-4 tw:w-4" })
          ]
        }
      ),
      /* @__PURE__ */ w(
        B,
        {
          variant: "outline",
          size: "icon",
          className: "tw:hidden tw:h-8 tw:w-8 tw:p-0 tw:lg:flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Hi, { className: "tw:h-4 tw:w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const eo = `
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
function vc(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function ze(t, e) {
  const n = e ? `${eo}, ${e}` : eo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && vc(o)
  );
}
function vr({
  className: t,
  stickyHeader: e,
  ref: n,
  ...o
}) {
  const i = tt.useRef(null);
  tt.useEffect(() => {
    typeof n == "function" ? n(i.current) : n && "current" in n && (n.current = i.current);
  }, [n]), tt.useEffect(() => {
    const a = i.current;
    if (!a) return;
    const l = () => {
      requestAnimationFrame(() => {
        ze(a, '[tabindex]:not([tabindex="-1"])').forEach((u) => {
          u.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const d = new MutationObserver(() => {
      l();
    });
    return d.observe(a, {
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
  const s = (a) => {
    const { current: l } = i;
    if (l) {
      if (a.key === "ArrowDown") {
        a.preventDefault(), ze(l)[0].focus();
        return;
      }
      a.key === " " && document.activeElement === l && a.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: m("pr-twp tw:relative tw:w-full", { "tw:p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: i,
      className: m(
        "tw:w-full tw:caption-bottom tw:text-sm tw:outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        // CUSTOM: Add focus styles
        t
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...o
    }
  ) });
}
function xr({
  className: t,
  stickyHeader: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    "thead",
    {
      ref: n,
      className: m(
        {
          "tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm": e
        },
        "tw:[&_tr]:border-b",
        t
      ),
      ...o
    }
  );
}
function yr({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r("tbody", { ref: e, className: m("tw:[&_tr:last-child]:border-0", t), ...n });
}
function Ew({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "tfoot",
    {
      ref: e,
      className: m(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        t
      ),
      ...n
    }
  );
}
function xc(t) {
  tt.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const i = t.current ? ze(t.current) : [], s = i.indexOf(document.activeElement), a = o.key === "ArrowRight" ? s + 1 : s - 1;
          a >= 0 && a < i.length && i[a].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
function yc(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Nc(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Jt({
  className: t,
  onKeyDown: e,
  onSelect: n,
  setFocusAlsoRunsSelect: o = !1,
  ref: i,
  ...s
}) {
  const a = tt.useRef(null);
  tt.useEffect(() => {
    typeof i == "function" ? i(a.current) : i && "current" in i && (i.current = a.current);
  }, [i]), xc(a);
  const l = tt.useMemo(
    () => a.current ? ze(a.current) : [],
    [a]
  ), d = tt.useCallback(
    (u) => {
      const { current: f } = a;
      if (!f || !f.parentElement) return;
      const h = f.closest("table"), p = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        ze(h).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = p.indexOf(f), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (u.key === "ArrowDown" || u.key === "ArrowUp")
        u.preventDefault(), Nc(p, g, u.key);
      else if (u.key === "ArrowLeft" || u.key === "ArrowRight")
        u.preventDefault(), yc(l, v, u.key);
      else if (u.key === "Escape") {
        u.preventDefault();
        const b = f.closest("table");
        b && b.focus();
      }
      e == null || e(u);
    },
    [a, l, e]
  ), c = tt.useCallback(
    (u) => {
      o && (n == null || n(u));
    },
    [o, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: a,
      tabIndex: -1,
      onKeyDown: d,
      onFocus: c,
      className: m(
        // CUSTOM: Add focus styles and add tw:outline-none so there isn't a duplicate outline
        "tw:border-b tw:outline-none tw:transition-colors tw:hover:bg-muted/50",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        "tw:data-[state=selected]:bg-muted",
        t
      ),
      ...s
    }
  );
}
function pn({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "th",
    {
      ref: e,
      className: m(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:text-muted-foreground tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]",
        t
      ),
      ...n
    }
  );
}
function ke({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "td",
    {
      ref: e,
      className: m("tw:p-2 tw:align-middle tw:[&:has([role=checkbox])]:pr-0 tw:[&>[role=checkbox]]:translate-y-[2px]", t),
      ...n
    }
  );
}
function Tw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "caption",
    {
      ref: e,
      className: m("tw:mt-4 tw:text-sm tw:text-muted-foreground", t),
      ...n
    }
  );
}
function er({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", t),
      ...e
    }
  );
}
function _c({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: i = !1,
  stickyHeader: s = !1,
  onRowClickHandler: a = () => {
  },
  id: l,
  isLoading: d = !1,
  noResultsMessage: c
}) {
  var $;
  const [u, f] = T([]), [h, p] = T([]), [g, v] = T({}), [b, x] = T({}), y = F(() => e ?? [], [e]), _ = Po({
    data: y,
    columns: t,
    getCoreRowModel: Lo(),
    ...n && { getPaginationRowModel: fa() },
    onSortingChange: f,
    getSortedRowModel: $o(),
    onColumnFiltersChange: p,
    getFilteredRowModel: ua(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: x,
    state: {
      sorting: u,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: b
    }
  }), N = _.getVisibleFlatColumns();
  let j;
  return d ? j = Array.from({ length: 10 }).map((k, S) => `skeleton-row-${S}`).map((k) => /* @__PURE__ */ r(Jt, { className: "tw:hover:bg-transparent", children: /* @__PURE__ */ r(ke, { colSpan: N.length ?? t.length, className: "tw:border-0 tw:p-0", children: /* @__PURE__ */ r("div", { className: "tw:w-full tw:py-2", children: /* @__PURE__ */ r(er, { className: "tw:h-14 tw:w-full tw:rounded-md" }) }) }) }, k)) : (($ = _.getRowModel().rows) == null ? void 0 : $.length) > 0 ? j = _.getRowModel().rows.map((E) => /* @__PURE__ */ r(
    Jt,
    {
      onClick: () => a(E, _),
      "data-state": E.getIsSelected() && "selected",
      children: E.getVisibleCells().map((P) => /* @__PURE__ */ r(ke, { children: je(P.column.columnDef.cell, P.getContext()) }, P.id))
    },
    E.id
  )) : j = /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r(ke, { colSpan: t.length, className: "tw:h-24 tw:text-center", children: c }) }), /* @__PURE__ */ w("div", { className: "pr-twp", id: l, children: [
    i && /* @__PURE__ */ r(fc, { table: _ }),
    /* @__PURE__ */ w(vr, { stickyHeader: s, children: [
      /* @__PURE__ */ r(xr, { stickyHeader: s, children: _.getHeaderGroups().map((E) => /* @__PURE__ */ r(Jt, { children: E.headers.map((P) => /* @__PURE__ */ r(pn, { className: "tw:p-0", children: P.isPlaceholder ? void 0 : je(P.column.columnDef.header, P.getContext()) }, P.id)) }, E.id)) }),
      /* @__PURE__ */ r(yr, { children: j })
    ] }),
    n && /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:justify-end tw:space-x-2 tw:py-4", children: [
      /* @__PURE__ */ r(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.previousPage(),
          disabled: !_.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        B,
        {
          variant: "outline",
          size: "sm",
          onClick: () => _.nextPage(),
          disabled: !_.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(bc, { table: _ })
  ] });
}
function Sw({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: i
}) {
  const s = F(
    () => ({
      overrides: {
        a: {
          props: {
            target: o
          }
        }
      }
    }),
    [o]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: t,
      className: m(
        "pr-twp tw:prose",
        {
          "tw:line-clamp-3 tw:max-h-10 tw:overflow-hidden tw:text-ellipsis tw:break-words": i
        },
        n
      ),
      children: /* @__PURE__ */ r(ha, { options: s, children: e })
    }
  );
}
const kc = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), no = (t, e) => t[e] ?? e;
function Cc({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const i = no(n, "%webView_error_dump_header%"), s = no(n, "%webView_error_dump_info_message%");
  function a() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ w(
    "div",
    {
      id: o,
      className: "tw:inline-flex tw:w-full tw:flex-col tw:items-start tw:justify-start tw:gap-4",
      children: [
        /* @__PURE__ */ w("div", { className: "tw:inline-flex tw:items-start tw:justify-start tw:gap-4 tw:self-stretch", children: [
          /* @__PURE__ */ w("div", { className: "tw:inline-flex tw:flex-1 tw:flex-col tw:items-start tw:justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw:text-color-text tw:justify-center tw:text-center tw:text-lg tw:font-semibold tw:leading-loose", children: i }),
            /* @__PURE__ */ r("div", { className: "tw:justify-center tw:self-stretch tw:text-sm tw:font-normal tw:leading-tight tw:text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r(B, { variant: "secondary", size: "icon", className: "size-8", onClick: () => a(), children: /* @__PURE__ */ r(po, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw:prose tw:w-full", children: /* @__PURE__ */ r("pre", { className: "tw:text-xs", children: t }) })
      ]
    }
  );
}
const Rw = Object.freeze([
  ...kc,
  "%webView_error_dump_copied_message%"
]);
function Dw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: i,
  id: s
}) {
  const [a, l] = T(!1), d = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ w(zt, { onOpenChange: (u) => {
    u || l(!1);
  }, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: o }),
    /* @__PURE__ */ w(qt, { id: s, className: m("tw:min-w-80 tw:max-w-96", i), children: [
      a && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(wt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Cc,
        {
          errorDetails: t,
          handleCopyNotify: d,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Ec = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Ec || {});
function Mw({ id: t, label: e, groups: n }) {
  const [o, i] = T(
    Object.fromEntries(
      n.map(
        (c, u) => c.itemType === 0 ? [u, []] : void 0
      ).filter((c) => !!c)
    )
  ), [s, a] = T({}), l = (c, u) => {
    const f = !o[c][u];
    i((p) => (p[c][u] = f, { ...p }));
    const h = n[c].items[u];
    h.onUpdate(h.id, f);
  }, d = (c, u) => {
    a((h) => (h[c] = u, { ...h }));
    const f = n[c].items.find((h) => h.id === u);
    f ? f.onUpdate(u) : console.error(`Could not find dropdown radio item with id '${u}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ w(ve, { children: [
    /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ w(B, { variant: "default", children: [
      /* @__PURE__ */ r(zi, { size: 16, className: "tw:mr-2 tw:h-4 tw:w-4" }),
      e,
      /* @__PURE__ */ r(Ie, { size: 16, className: "tw:ml-2 tw:h-4 tw:w-4" })
    ] }) }),
    /* @__PURE__ */ r(xe, { children: n.map((c, u) => /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r(Nn, { children: c.label }),
      /* @__PURE__ */ r(hi, { children: c.itemType === 0 ? /* @__PURE__ */ r(st, { children: c.items.map((f, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        Qt,
        {
          checked: o[u][h],
          onCheckedChange: () => l(u, h),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ r(
        lc,
        {
          value: s[u],
          onValueChange: (f) => d(u, f),
          children: c.items.map((f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(wc, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ r(Je, {})
    ] }, c.label)) })
  ] }) });
}
function Ow({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: i,
  handleMoreInfoLinkClick: s,
  supportUrl: a,
  handleSupportLinkClick: l
}) {
  const d = new hs("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((u, f) => u + f, 0)), c = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ w(
    "div",
    {
      id: t,
      className: "pr-twp tw:flex tw:items-center tw:justify-center tw:gap-4 tw:divide-x tw:border-b tw:border-t tw:py-2 tw:text-center",
      children: [
        e && /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw:flex", children: /* @__PURE__ */ r("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw:text-xs tw:text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:gap-1", children: [
            /* @__PURE__ */ r(qi, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ r("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: d })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw:text-xs tw:text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:items-center tw:gap-1 tw:ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw:flex tw:gap-2", children: o.slice(0, 3).map((u) => /* @__PURE__ */ r("span", { className: "tw:text-xs tw:font-semibold tw:text-foreground", children: u.toUpperCase() }, u)) }),
          o.length > 3 && /* @__PURE__ */ w(
            "button",
            {
              type: "button",
              onClick: () => c(),
              className: "tw:text-xs tw:text-foreground tw:underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (i || a) && /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-1 tw:ps-4", children: [
          i && /* @__PURE__ */ r("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ w(
            B,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Wi, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) }),
          a && /* @__PURE__ */ r("div", { className: "tw:flex tw:gap-1", children: /* @__PURE__ */ w(
            B,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw:flex tw:h-auto tw:gap-1 tw:py-0 tw:text-xs tw:font-semibold tw:text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(Yi, { className: "tw:h-4 tw:w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Tc({ id: t, versionHistory: e }) {
  const [n, o] = T(!1), i = /* @__PURE__ */ new Date();
  function s(l) {
    const d = new Date(l), c = new Date(i.getTime() - d.getTime()), u = c.getUTCFullYear() - 1970, f = c.getUTCMonth(), h = c.getUTCDate() - 1;
    let p = "";
    return u > 0 ? p = `${u.toString()} year${u === 1 ? "" : "s"} ago` : f > 0 ? p = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? p = "today" : p = `${h.toString()} day${h === 1 ? "" : "s"} ago`, p;
  }
  const a = Object.entries(e).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ w("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw:text-md tw:font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw:list-disc tw:pl-5 tw:pr-4 tw:text-xs tw:text-foreground", children: (n ? a : a.slice(0, 5)).map((l) => /* @__PURE__ */ w("div", { className: "tw:mt-3 tw:flex tw:justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw:text-foreground", children: /* @__PURE__ */ r("li", { className: "tw:prose tw:text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ w("div", { className: "tw:justify-end tw:text-right", children: [
        /* @__PURE__ */ w("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ r("div", { children: s(l[1].date) })
      ] })
    ] }, l[0])) }),
    a.length > 5 && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => o(!n),
        className: "tw:text-xs tw:text-foreground tw:underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Iw({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: i,
  currentVersion: s
}) {
  const a = F(() => gs(n), [n]), d = ((c) => {
    const u = new Intl.DisplayNames(bs(), { type: "language" });
    return c.map((f) => u.of(f));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw:border-t tw:py-2", children: /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:divide-y", children: [
    Object.entries(i).length > 0 && /* @__PURE__ */ r(Tc, { versionHistory: i }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw:text-md tw:font-semibold", children: "Information" }),
      /* @__PURE__ */ w("div", { className: "tw:flex tw:items-start tw:justify-between tw:text-xs tw:text-foreground", children: [
        /* @__PURE__ */ w("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw:font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw:font-semibold", children: a })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw:flex tw:w-3/4 tw:items-center tw:justify-between tw:text-xs tw:text-foreground", children: /* @__PURE__ */ w("p", { className: "tw:flex tw:flex-col tw:justify-start tw:gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw:font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw:font-semibold", children: d.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Sc({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: i = !1,
  selectAllText: s = "Select All",
  clearAllText: a = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: d,
  isOpen: c = void 0,
  onOpenChange: u = void 0,
  isDisabled: f = !1,
  sortSelected: h = !1,
  icon: p = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [x, y] = T(!1), _ = K(
    (S) => {
      var V;
      const L = (V = t.find((O) => O.label === S)) == null ? void 0 : V.value;
      L && n(
        e.includes(L) ? e.filter((O) => O !== L) : [...e, L]
      );
    },
    [t, e, n]
  ), N = () => d || o, j = F(() => {
    if (!h) return t;
    const S = t.filter((V) => V.starred).sort((V, O) => V.label.localeCompare(O.label)), L = t.filter((V) => !V.starred).sort((V, O) => {
      const I = e.includes(V.value), z = e.includes(O.value);
      return I && !z ? -1 : !I && z ? 1 : V.label.localeCompare(O.label);
    });
    return [...S, ...L];
  }, [t, e, h]), $ = () => {
    n(t.map((S) => S.value));
  }, E = () => {
    n([]);
  }, P = c ?? x;
  return /* @__PURE__ */ r("div", { id: b, className: g, children: /* @__PURE__ */ w(zt, { open: P, onOpenChange: u ?? y, children: [
    /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ w(
      B,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": P,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            p && /* @__PURE__ */ r("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ r("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: p }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: N()
              }
            )
          ] }),
          /* @__PURE__ */ r(mo, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(qt, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ w(se, { children: [
      /* @__PURE__ */ r(Ye, { placeholder: `Search ${o.toLowerCase()}...` }),
      i && /* @__PURE__ */ w("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: $, children: s }),
        /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: E, children: a })
      ] }),
      /* @__PURE__ */ w(ae, { children: [
        /* @__PURE__ */ r(vn, { children: l }),
        /* @__PURE__ */ r(ne, { children: j.map((S) => /* @__PURE__ */ w(
          Ht,
          {
            value: S.label,
            onSelect: _,
            className: "tw:flex tw:items-center tw:gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                jt,
                {
                  className: m(
                    "tw:h-4 tw:w-4",
                    e.includes(S.value) ? "tw:opacity-100" : "tw:opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ r(Ji, { className: "tw:h-4 tw:w-4" }),
              /* @__PURE__ */ r("div", { className: "tw:flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw:text-end tw:text-muted-foreground", children: S.secondaryLabel })
            ]
          },
          S.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Aw({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: i,
  customSelectedText: s,
  isDisabled: a,
  sortSelected: l,
  icon: d,
  className: c,
  badgesPlaceholder: u,
  id: f
}) {
  return /* @__PURE__ */ w("div", { id: f, className: "tw:flex tw:items-center tw:gap-2", children: [
    /* @__PURE__ */ r(
      Sc,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: i,
        customSelectedText: s,
        isDisabled: a,
        sortSelected: l,
        icon: d,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw:flex tw:flex-wrap tw:items-center tw:gap-2", children: e.map((h) => {
      var p;
      return /* @__PURE__ */ w(Ue, { variant: "muted", className: "tw:flex tw:items-center tw:gap-1", children: [
        /* @__PURE__ */ r(
          B,
          {
            variant: "ghost",
            size: "icon",
            className: "tw:h-4 tw:w-4 tw:p-0 tw:hover:bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(Oe, { className: "tw:h-3 tw:w-3" })
          }
        ),
        (p = t.find((g) => g.value === h)) == null ? void 0 : p.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(wt, { children: u })
  ] });
}
function Rc({ children: t, editorRef: e }) {
  const n = q(null);
  return U(() => {
    var a;
    const o = /Macintosh/i.test(navigator.userAgent), i = ((a = n.current) == null ? void 0 : a.querySelector(".editor-input")) ?? void 0, s = (l) => {
      var d, c;
      i && document.activeElement === i && (o ? l.metaKey : l.ctrlKey) && (l.shiftKey && l.key.toLowerCase() === "z" || l.key.toLowerCase() === "y" ? (l.preventDefault(), (d = e.current) == null || d.redo()) : l.key.toLowerCase() === "z" && (l.preventDefault(), (c = e.current) == null || c.undo()));
    };
    return i == null || i.addEventListener("keydown", s), () => {
      i == null || i.removeEventListener("keydown", s);
    };
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
function Xe({
  className: t,
  type: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: m(
        "pr-twp tw:flex tw:h-9 tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-1 tw:text-base tw:shadow-sm tw:transition-colors tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        t
      ),
      ref: n,
      ...o
    }
  );
}
const Dc = (t, e, n) => t === "generated" ? /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Mc({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: i
}) {
  const s = q(null), a = q(null), l = q(!1), [d, c] = T(t), [u, f] = T(n), [h, p] = T(!1);
  U(() => {
    c(t);
  }, [t]), U(() => {
    u !== n && f(n);
  }, [n]);
  const g = (b) => {
    l.current = !1, p(b), b || (d !== "custom" || u ? (e(d), o(u)) : (c(t), f(n)));
  }, v = (b) => {
    var x, y, _, N;
    b.stopPropagation(), document.activeElement === a.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((x = s.current) == null || x.focus(), l.current = !0) : document.activeElement === s.current && b.key === "ArrowUp" ? ((y = a.current) == null || y.focus(), l.current = !1) : document.activeElement === s.current && b.key === "ArrowLeft" && ((_ = s.current) == null ? void 0 : _.selectionStart) === 0 && ((N = a.current) == null || N.focus(), l.current = !1), d === "custom" && b.key === "Enter" && (document.activeElement === a.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ w(ve, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw:h-6", children: Dc(t, i, n) }) }) }),
      /* @__PURE__ */ r(Mt, { children: i["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ w(
      xe,
      {
        className: "tw:z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var b;
          l.current && ((b = s.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ r(Nn, { children: i["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Je, {}),
          /* @__PURE__ */ r(
            Qt,
            {
              checked: d === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ r("span", { children: i["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw:w-10 tw:text-center", children: Un })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Qt,
            {
              checked: d === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ r("span", { children: i["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw:w-10 tw:text-center", children: Hn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            Qt,
            {
              ref: a,
              checked: d === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (b) => {
                var x;
                b.stopPropagation(), l.current = !0, (x = s.current) == null || x.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ r("span", { children: i["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Xe,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: u,
                    onKeyDown: (b) => {
                      b.key === "Enter" || b.key === "ArrowUp" || b.key === "ArrowDown" || b.key === "ArrowLeft" || b.key === "ArrowRight" || b.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (b) => f(b.target.value)
                  }
                )
              ] })
            }
          )
        ]
      }
    )
  ] });
}
const Oc = (t, e) => t === "f" ? /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r(go, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r(bo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ w(st, { children: [
  /* @__PURE__ */ r(ho, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Ic = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), fe(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Ac({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ w(ve, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ r(ra, { asChild: !0, children: /* @__PURE__ */ r(Pe, { asChild: !0, children: /* @__PURE__ */ r(B, { variant: "outline", className: "tw:h-6", children: Oc(t, n) }) }) }),
      /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ r("p", { children: Ic(t, n) }) })
    ] }) }),
    /* @__PURE__ */ w(xe, { className: "tw:z-[300]", children: [
      /* @__PURE__ */ r(Nn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Je, {}),
      /* @__PURE__ */ w(
        Qt,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ r(ho, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        Qt,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ r(go, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ w(
        Qt,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw:gap-2",
          children: [
            /* @__PURE__ */ r(bo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Pc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function $c({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? Xi, { className: e, size: 16 });
}
function Lc({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, i] = T(""), s = F(() => {
    const a = o.trim().toLowerCase();
    return a ? e.filter(
      (l) => {
        var d;
        return ((d = l.marker) == null ? void 0 : d.toLowerCase().includes(a)) || l.title.toLowerCase().includes(a);
      }
    ) : e;
  }, [o, e]);
  return /* @__PURE__ */ w(se, { className: "tw:p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Ye,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (a) => i(a),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ w(ae, { children: [
      /* @__PURE__ */ r(vn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(ne, { children: s.map((a) => {
        var l;
        return /* @__PURE__ */ w(
          Ht,
          {
            className: "tw:flex tw:gap-2 tw:hover:bg-accent",
            disabled: a.isDisallowed || a.isDeprecated,
            onSelect: a.action,
            children: [
              /* @__PURE__ */ r("div", { className: "tw:w-8 tw:min-w-8", children: a.marker ? /* @__PURE__ */ r("span", { className: "tw:text-xs", children: a.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r($c, { icon: a.icon }) }) }),
              /* @__PURE__ */ w("div", { children: [
                /* @__PURE__ */ r("p", { className: "tw:text-sm", children: a.title }),
                a.subtitle && /* @__PURE__ */ r("p", { className: "tw:text-xs tw:text-muted-foreground", children: a.subtitle })
              ] }),
              (a.isDisallowed || a.isDeprecated) && /* @__PURE__ */ r(Ma, { className: "tw:font-sans", children: a.isDisallowed ? t["%markerMenu_disallowed_label%"] : t["%markerMenu_deprecated_label%"] })
            ]
          },
          `item-${a.marker ?? ((l = a.icon) == null ? void 0 : l.displayName)}-${a.title.replaceAll(" ", "")}`
        );
      }) })
    ] })
  ] });
}
function Vc(t, e, n, o) {
  if (!o || o === "p") return [];
  const i = sn[o];
  if (!(i != null && i.children)) return [];
  const s = [];
  return Object.entries(i.children).forEach(([, a]) => {
    s.push(
      ...a.map((l) => ({
        marker: l,
        title: n[sn[l].description] ?? sn[l].description,
        action: () => {
          var d;
          (d = t.current) == null || d.insertMarker(l), e();
        }
      }))
    );
  }), s.sort((a, l) => (a.marker ?? a.title).localeCompare(l.marker ?? l.title));
}
function jc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Fc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Bc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Pw({
  classNameForEditor: t,
  noteOps: e,
  onSave: n,
  onClose: o,
  scrRef: i,
  noteKey: s,
  editorOptions: a,
  defaultMarkerMenuTrigger: l,
  localizedStrings: d
}) {
  const c = q(null), u = q(null), f = q(null), [h, p] = T("generated"), [g, v] = T("*"), [b, x] = T("f"), [y, _] = T(!1), [N, j] = T(!1), [$, E] = T(), [P, k] = T(), [S, L] = T(), [V, O] = T(), I = q(null), z = F(
    () => ({
      ...a,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...a.view ?? ga(), noteMode: "expanded" }
    }),
    [a, l]
  ), D = F(
    () => Vc(
      c,
      () => j(!1),
      d,
      V
    ),
    [d, V]
  );
  U(() => {
    var A;
    N || (A = c.current) == null || A.focus();
  }, [b, N]), U(() => {
    var G, X;
    let A;
    const R = e == null ? void 0 : e.at(0);
    if (R && tn("note", R)) {
      const Z = (G = R.insert.note) == null ? void 0 : G.caller;
      let ot = "custom";
      Z === Un ? ot = "generated" : Z === Hn ? ot = "hidden" : Z && v(Z), p(ot), x(((X = R.insert.note) == null ? void 0 : X.style) ?? "f"), A = setTimeout(() => {
        var vt;
        (vt = c.current) == null || vt.applyUpdate([R]);
      }, 0);
    }
    return () => {
      A && clearTimeout(A);
    };
  }, [e, s]);
  const Y = K(() => {
    var R, G;
    const A = (G = (R = c.current) == null ? void 0 : R.getNoteOps(0)) == null ? void 0 : G.at(0);
    A && tn("note", A) && (A.insert.note && (h === "custom" ? A.insert.note.caller = g : A.insert.note.caller = h === "generated" ? Un : Hn), n([A]));
  }, [h, g, n]), Nt = () => {
    var R;
    const A = (R = u.current) == null ? void 0 : R.getElementsByClassName("editor-input")[0];
    A != null && A.textContent && navigator.clipboard.writeText(A.textContent);
  }, Ct = (A) => {
    var G, X, Z, ot, vt;
    x(A);
    const R = (X = (G = c.current) == null ? void 0 : G.getNoteOps(0)) == null ? void 0 : X.at(0);
    if (R && tn("note", R)) {
      R.insert.note && (R.insert.note.style = A);
      const lt = (ot = (Z = R.insert.note) == null ? void 0 : Z.contents) == null ? void 0 : ot.ops;
      b !== "x" && A === "x" ? lt == null || lt.forEach((xt) => jc(xt)) : b === "x" && A !== "x" && (lt == null || lt.forEach((xt) => Fc(xt))), (vt = c.current) == null || vt.applyUpdate([R, { delete: 1 }]);
    }
  }, Et = (A) => {
    var G, X, Z, ot, vt, lt;
    (G = c.current) == null || G.focus();
    const R = (Z = (X = c.current) == null ? void 0 : X.getNoteOps(0)) == null ? void 0 : Z.at(0);
    if (R && tn("note", R)) {
      A.content.length > 1 && setTimeout(() => {
        var pt;
        (pt = c.current) == null || pt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const xt = (ot = R.insert.note) == null ? void 0 : ot.style, Tt = (lt = (vt = R.insert.note) == null ? void 0 : vt.contents) == null ? void 0 : lt.ops;
      xt || _(!1), _(
        xt === "x" ? !!(Tt != null && Tt.every((pt) => {
          var Kt, C;
          if (!((Kt = pt.attributes) != null && Kt.char)) return !0;
          const mt = ((C = pt.attributes) == null ? void 0 : C.char).style;
          return mt === "xt" || mt === "xo" || mt === "xq";
        })) : !!(Tt != null && Tt.every((pt) => {
          var Kt, C;
          if (!((Kt = pt.attributes) != null && Kt.char)) return !0;
          const mt = ((C = pt.attributes) == null ? void 0 : C.char).style;
          return mt === "ft" || mt === "fr" || mt === "fq";
        }))
      );
    } else
      _(!1);
  }, at = K(() => {
    const A = window.getSelection();
    if (f.current && D.length && A && A.rangeCount > 0) {
      const R = A.getRangeAt(0).getBoundingClientRect(), G = f.current.getBoundingClientRect();
      E(R.left - G.left), k(R.top - G.top), L(R.height), j(!0);
    }
  }, [D, f]);
  return U(() => {
    const A = () => {
      N && j(!1);
    };
    return window.addEventListener("click", A), () => {
      window.removeEventListener("click", A);
    };
  }, [N]), U(() => {
    var A;
    N && ((A = I.current) == null || A.focus());
  }, [N]), U(() => {
    var G;
    const A = ((G = u.current) == null ? void 0 : G.querySelector(".editor-input")) ?? void 0, R = (X) => {
      !N && A && document.activeElement === A && X.key === l ? (X.preventDefault(), at()) : N && X.key === "Escape" && (X.preventDefault(), j(!1));
    };
    return document.addEventListener("keydown", R), () => {
      document.removeEventListener("keydown", R);
    };
  }, [N, at, l]), /* @__PURE__ */ w(st, { children: [
    /* @__PURE__ */ w("div", { className: "footnote-editor tw:grid tw:gap-[12px]", children: [
      /* @__PURE__ */ w("div", { className: "tw:flex", children: [
        /* @__PURE__ */ w("div", { className: "tw:flex tw:gap-4", children: [
          /* @__PURE__ */ r(
            Ac,
            {
              isTypeSwitchable: y,
              noteType: b,
              handleNoteTypeChange: Ct,
              localizedStrings: d
            }
          ),
          /* @__PURE__ */ r(
            Mc,
            {
              callerType: h,
              updateCallerType: p,
              customCaller: g,
              updateCustomCaller: v,
              localizedStrings: d
            }
          )
        ] }),
        /* @__PURE__ */ w("div", { className: "tw:flex tw:w-full tw:justify-end tw:gap-4", children: [
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
            /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(
              B,
              {
                onClick: o,
                className: "tw:h-6 tw:w-6",
                size: "icon",
                variant: "secondary",
                children: /* @__PURE__ */ r(Oe, {})
              }
            ) }),
            /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
            /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(
              B,
              {
                onClick: Y,
                className: "tw:h-6 tw:w-6",
                size: "icon",
                variant: "default",
                children: /* @__PURE__ */ r(jt, {})
              }
            ) }),
            /* @__PURE__ */ r(Mt, { children: d["%footnoteEditor_saveButton_tooltip%"] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ w(
        "div",
        {
          ref: u,
          className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(Rc, { editorRef: c, children: /* @__PURE__ */ r(
              ba,
              {
                options: z,
                onStateChange: (A) => O(A.contextMarker),
                onUsjChange: Et,
                defaultUsj: Bc,
                onScrRefChange: () => {
                },
                scrRef: i,
                ref: c
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw:absolute tw:bottom-0 tw:right-0", children: /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
              /* @__PURE__ */ r(Lt, { asChild: !0, children: /* @__PURE__ */ r(
                B,
                {
                  onClick: Nt,
                  className: "tw:h-6 tw:w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(po, {})
                }
              ) }),
              /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ r("p", { children: d["%footnoteEditor_copyButton_tooltip%"] }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        className: "tw:absolute",
        ref: f,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ w(zt, { open: N, children: [
      /* @__PURE__ */ r(
        Ia,
        {
          className: "tw:absolute",
          style: {
            top: P,
            left: $,
            height: S,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        qt,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (A) => {
            A.preventDefault(), A.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            Lc,
            {
              markerMenuItems: D,
              localizedStrings: d,
              searchRef: I
            }
          )
        }
      )
    ] })
  ] });
}
const $w = Object.freeze([
  ...Pc,
  ...Object.entries(sn).map(([, t]) => t.description).filter((t) => !!t),
  "%footnoteEditor_callerDropdown_label%",
  "%footnoteEditor_callerDropdown_item_generated%",
  "%footnoteEditor_callerDropdown_item_hidden%",
  "%footnoteEditor_callerDropdown_item_custom%",
  "%footnoteEditor_callerDropdown_tooltip%",
  "%footnoteEditor_cancelButton_tooltip%",
  "%footnoteEditor_copyButton_tooltip%",
  "%footnoteEditor_noteType_crossReference_label%",
  "%footnoteEditor_noteType_endNote_label%",
  "%footnoteEditor_noteType_footnote_label%",
  "%footnoteEditor_noteType_tooltip%",
  "%footnoteEditor_noteTypeDropdown_label%",
  "%footnoteEditor_saveButton_tooltip%"
]);
function gi(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((i) => typeof i == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function Kc(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const i = [], s = [];
  let a = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (a.length > 0 && s.push(a), a = [l]) : a.push(l);
  }), a.length > 0 && s.push(a), s.map((l, d) => {
    const c = d === s.length - 1;
    return /* @__PURE__ */ w("p", { children: [
      Nr(t, l, n, !0, i),
      c && o
    ] }, gi(t, l));
  });
}
function Nr(t, e, n = !0, o = !0, i = []) {
  if (!(!e || e.length === 0))
    return e.map((s) => {
      if (typeof s == "string") {
        const a = `${t}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = m(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, a);
        }
        return /* @__PURE__ */ w(
          "span",
          {
            className: "tw:inline-flex tw:items-center tw:gap-1 tw:underline tw:decoration-destructive",
            children: [
              /* @__PURE__ */ r(Fn, { className: "tw:h-4 tw:w-4 tw:fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Fn, { className: "tw:h-4 tw:w-4 tw:fill-destructive" })
            ]
          },
          a
        );
      }
      return Gc(
        s,
        gi(`${t}\\${s.marker}`, [s]),
        n,
        [...i, t ?? "unknown"]
      );
    });
}
function Gc(t, e, n, o = []) {
  const { marker: i } = t;
  return /* @__PURE__ */ w("span", { children: [
    i ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${i} ` }) : /* @__PURE__ */ r(
      Fn,
      {
        className: "tw:text-error tw:mr-1 tw:inline-block tw:h-4 tw:w-4",
        "aria-label": "Missing marker"
      }
    ),
    Nr(i, t.content, n, !0, [
      ...o,
      i ?? "unknown"
    ])
  ] }, e);
}
function Uc({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const i = n ? n(t.caller) : t.caller, s = i !== t.caller;
  let a, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([a, ...l] = t.content);
  const d = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, u = i && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ w("span", { className: m("note-caller tw:inline-block", { formatted: s }), children: [
    i,
    " "
  ] }), f = a && /* @__PURE__ */ w(st, { children: [
    Nr(t.marker, [a], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", p = o ? "marker-visible" : "", g = e === "horizontal" ? "tw:col-span-1" : "tw:col-span-2 tw:col-start-1 tw:row-start-2", v = m(h, p);
  return /* @__PURE__ */ w(st, { children: [
    /* @__PURE__ */ w("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: [
      d,
      u
    ] }),
    /* @__PURE__ */ r("div", { className: m("textual-note-header tw:col-span-1 tw:w-fit tw:text-nowrap", v), children: f }),
    /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "textual-note-body tw:flex tw:flex-col tw:gap-1",
          g,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(st, { children: Kc(t.marker, l, o, c) })
      }
    )
  ] });
}
function Lw({
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: i,
  selectedFootnote: s,
  showMarkers: a = !0,
  suppressFormatting: l = !1,
  formatCaller: d,
  onFootnoteSelected: c
}) {
  const u = d ?? vs(n, void 0), f = (y, _) => {
    c == null || c(y, _, i);
  }, h = s ? n.findIndex((y) => y === s) : -1, [p, g] = T(h), v = (y, _, N) => {
    if (n.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), c == null || c(_, N, i);
          break;
      }
  }, b = (y) => {
    if (n.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), g((_) => Math.min(_ + 1, n.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), g((_) => Math.max(_ - 1, 0));
          break;
      }
  }, x = q([]);
  return U(() => {
    var y;
    p >= 0 && p < x.current.length && ((y = x.current[p]) == null || y.focus());
  }, [p]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: p < 0 ? 0 : -1,
      className: m("tw:h-full tw:overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: m(
            "tw:p-0.5 tw:pt-1",
            "tw:grid",
            o === "horizontal" ? "tw:grid-cols-[min-content_min-content_1fr]" : "tw:grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((y, _) => {
            const N = y === s, j = `${i}-${_}`;
            return /* @__PURE__ */ w(st, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: ($) => {
                    x.current[_] = $;
                  },
                  role: "option",
                  "aria-selected": N,
                  "data-marker": y.marker,
                  "data-state": N ? "selected" : void 0,
                  tabIndex: _ === p ? 0 : -1,
                  className: m(
                    "tw:gap-x-3 tw:gap-y-1 tw:p-2 tw:data-[state=selected]:bg-muted",
                    c && "tw:hover:bg-muted/50",
                    "tw:w-full tw:rounded-sm tw:border-0 tw:bg-transparent tw:shadow-none",
                    "tw:focus:outline-none tw:focus-visible:outline-none",
                    /* ENHANCE: After considerable fiddling, this set of styles makes a focus ring
                       that looks great in Storybook. However, the left edge of the ring is clipped in
                       P.B app. These are similar, but not identical to, the customizations made in
                       our shadcn table component.
                    */
                    "tw:focus-visible:ring-offset-0.5 tw:focus-visible:relative tw:focus-visible:z-10 tw:focus-visible:ring-2 tw:focus-visible:ring-ring",
                    "tw:grid tw:grid-flow-col tw:grid-cols-subgrid",
                    o === "horizontal" ? "tw:col-span-3" : "tw:col-span-2 tw:row-span-2",
                    e
                  ),
                  onClick: () => f(y, _),
                  onKeyDown: ($) => v($, y, _),
                  children: /* @__PURE__ */ r(
                    Uc,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => u(y.caller, _),
                      showMarkers: a
                    }
                  )
                },
                j
              ),
              _ < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(He, { tabIndex: -1, className: "tw:col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function Hc(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let i;
  for (; (i = o.exec(t)) !== null; )
    i.index > n && e.push(t.substring(n, i.index)), e.push(/* @__PURE__ */ r("strong", { children: i[1] }, i.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function zc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const i = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], a = F(() => {
    const l = [], d = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const u = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      d.has(u) || (d.add(u), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ w(vr, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(xr, { stickyHeader: !0, children: /* @__PURE__ */ w(Jt, { children: [
      /* @__PURE__ */ r(pn, { children: i }),
      /* @__PURE__ */ r(pn, { children: s })
    ] }) }),
    /* @__PURE__ */ r(yr, { children: a.length > 0 && a.map((l) => /* @__PURE__ */ w(
      Jt,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(ke, { children: pe(l.reference, "English") }),
          /* @__PURE__ */ r(ke, { className: o, children: Hc(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function bi({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Vr.Root,
    {
      ref: e,
      className: m(
        "tw:grid tw:place-content-center tw:peer pr-twp tw:h-4 tw:w-4 tw:shrink-0 tw:rounded-sm tw:border tw:border-primary tw:shadow tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=checked]:text-primary-foreground",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r(
        Vr.Indicator,
        {
          className: m("tw:grid tw:place-content-center tw:text-current"),
          children: /* @__PURE__ */ r(jt, { className: "tw:h-4 tw:w-4" })
        }
      )
    }
  );
}
const qc = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(es, { className: "tw:h-4 tw:w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(ns, { className: "tw:h-4 tw:w-4" });
}, _n = (t, e, n) => /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ w(Dt, { children: [
  /* @__PURE__ */ w(
    Lt,
    {
      className: m("tw:flex tw:w-full tw:justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw:w-6 tw:max-w-fit tw:flex-1 tw:overflow-hidden tw:text-ellipsis", children: e }),
        qc(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(Mt, { side: "bottom", children: e })
] }) }), Vw = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => _n(e, t)
}), Wc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => _n(n, t)
}), jw = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => _n(e, t, "tw:justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw:flex tw:justify-end tw:tabular-nums", children: e.getValue("count") })
}), Pn = (t, e, n, o, i, s) => {
  let a = [...n];
  t.forEach((d) => {
    e === "approved" ? a.includes(d) || a.push(d) : a = a.filter((c) => c !== d);
  }), o(a);
  let l = [...i];
  t.forEach((d) => {
    e === "unapproved" ? l.includes(d) || l.push(d) : l = l.filter((c) => c !== d);
  }), s(l);
}, Fw = (t, e, n, o, i) => ({
  accessorKey: "status",
  header: ({ column: s }) => _n(s, t, "tw:justify-center"),
  cell: ({ row: s }) => {
    const a = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ w(di, { value: a, variant: "outline", type: "single", className: "tw:gap-0", children: [
      /* @__PURE__ */ r(
        ln,
        {
          onClick: (d) => {
            d.stopPropagation(), Pn(
              [l],
              "approved",
              e,
              n,
              o,
              i
            );
          },
          value: "approved",
          className: "tw:rounded-e-none tw:border-e-0",
          children: /* @__PURE__ */ r(Zi, {})
        }
      ),
      /* @__PURE__ */ r(
        ln,
        {
          onClick: (d) => {
            d.stopPropagation(), Pn(
              [l],
              "unapproved",
              e,
              n,
              o,
              i
            );
          },
          value: "unapproved",
          className: "tw:rounded-none",
          children: /* @__PURE__ */ r(Qi, {})
        }
      ),
      /* @__PURE__ */ r(
        ln,
        {
          onClick: (d) => {
            d.stopPropagation(), Pn(
              [l],
              "unknown",
              e,
              n,
              o,
              i
            );
          },
          value: "unknown",
          className: "tw:rounded-s-none tw:border-s-0",
          children: /* @__PURE__ */ r(ts, {})
        }
      )
    ] });
  }
}), Bw = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Kw = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Gw = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, Yc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Uw = Object.freeze([
  "%webView_inventory_all%",
  "%webView_inventory_approved%",
  "%webView_inventory_unapproved%",
  "%webView_inventory_unknown%",
  "%webView_inventory_scope_currentBook%",
  "%webView_inventory_scope_chapter%",
  "%webView_inventory_scope_verse%",
  "%webView_inventory_filter_text%",
  "%webView_inventory_show_additional_items%",
  "%webView_inventory_occurrences_table_header_reference%",
  "%webView_inventory_occurrences_table_header_occurrence%",
  "%webView_inventory_no_results%"
]), Jc = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (i) => e === "approved" && i.status === "approved" || e === "unapproved" && i.status === "unapproved" || e === "unknown" && i.status === "unknown"
  )), n !== "" && (o = o.filter((i) => i.items[0].includes(n))), o;
}, Xc = (t, e, n) => t.map((o) => {
  const i = Mr(o.key) ? o.key : o.key[0];
  return {
    items: Mr(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || Yc(i, e, n),
    occurrences: o.occurrences || []
  };
}), Pt = (t, e) => t[e] ?? e;
function Hw({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: i,
  unapprovedItems: s,
  scope: a,
  onScopeChange: l,
  columns: d,
  id: c,
  areInventoryItemsLoading: u = !1,
  classNameForVerseText: f,
  onItemSelected: h
}) {
  const p = Pt(n, "%webView_inventory_all%"), g = Pt(n, "%webView_inventory_approved%"), v = Pt(n, "%webView_inventory_unapproved%"), b = Pt(n, "%webView_inventory_unknown%"), x = Pt(n, "%webView_inventory_scope_currentBook%"), y = Pt(n, "%webView_inventory_scope_chapter%"), _ = Pt(n, "%webView_inventory_scope_verse%"), N = Pt(n, "%webView_inventory_filter_text%"), j = Pt(
    n,
    "%webView_inventory_show_additional_items%"
  ), $ = Pt(n, "%webView_inventory_no_results%"), [E, P] = T(!1), [k, S] = T("all"), [L, V] = T(""), [O, I] = T([]), z = F(() => {
    const R = t ?? [];
    return R.length === 0 ? [] : Xc(R, i, s);
  }, [t, i, s]), D = F(() => {
    if (E) return z;
    const R = [];
    return z.forEach((G) => {
      const X = G.items[0], Z = R.find(
        (ot) => ot.items[0] === X
      );
      Z ? (Z.count += G.count, Z.occurrences = Z.occurrences.concat(G.occurrences)) : R.push({
        items: [X],
        count: G.count,
        occurrences: G.occurrences,
        status: G.status
      });
    }), R;
  }, [E, z]), Y = F(() => D.length === 0 ? [] : Jc(D, k, L), [D, k, L]), Nt = F(() => {
    var X, Z;
    if (!E) return d;
    const R = (X = o == null ? void 0 : o.tableHeaders) == null ? void 0 : X.length;
    if (!R) return d;
    const G = [];
    for (let ot = 0; ot < R; ot++)
      G.push(
        Wc(
          ((Z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Z[ot]) || "Additional Item",
          ot + 1
        )
      );
    return [...G, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, E]);
  U(() => {
    Y.length === 0 ? I([]) : Y.length === 1 && I(Y[0].items);
  }, [Y]);
  const Ct = (R, G) => {
    G.setRowSelection(() => {
      const Z = {};
      return Z[R.index] = !0, Z;
    });
    const X = R.original.items;
    I(X), h && X.length > 0 && h(X[0]);
  }, Et = (R) => {
    if (R === "book" || R === "chapter" || R === "verse")
      l(R);
    else
      throw new Error(`Invalid scope value: ${R}`);
  }, at = (R) => {
    if (R === "all" || R === "approved" || R === "unapproved" || R === "unknown")
      S(R);
    else
      throw new Error(`Invalid status filter value: ${R}`);
  }, A = F(() => {
    if (D.length === 0 || O.length === 0) return [];
    const R = D.filter((G) => xs(
      E ? G.items : [G.items[0]],
      O
    ));
    if (R.length > 1) throw new Error("Selected item is not unique");
    return R.length === 0 ? [] : R[0].occurrences;
  }, [O, E, D]);
  return /* @__PURE__ */ w("div", { id: c, className: "pr-twp tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ w("div", { className: "tw:flex tw:items-stretch", children: [
      /* @__PURE__ */ w(
        Se,
        {
          onValueChange: (R) => at(R),
          defaultValue: k,
          children: [
            /* @__PURE__ */ r(De, { className: "tw:m-1", children: /* @__PURE__ */ r(Re, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ w(Me, { children: [
              /* @__PURE__ */ r(St, { value: "all", children: p }),
              /* @__PURE__ */ r(St, { value: "approved", children: g }),
              /* @__PURE__ */ r(St, { value: "unapproved", children: v }),
              /* @__PURE__ */ r(St, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ w(Se, { onValueChange: (R) => Et(R), defaultValue: a, children: [
        /* @__PURE__ */ r(De, { className: "tw:m-1", children: /* @__PURE__ */ r(Re, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ w(Me, { children: [
          /* @__PURE__ */ r(St, { value: "book", children: x }),
          /* @__PURE__ */ r(St, { value: "chapter", children: y }),
          /* @__PURE__ */ r(St, { value: "verse", children: _ })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Xe,
        {
          className: "tw:m-1 tw:rounded-md tw:border",
          placeholder: N,
          value: L,
          onChange: (R) => {
            V(R.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ w("div", { className: "tw:m-1 tw:flex tw:items-center tw:rounded-md tw:border", children: [
        /* @__PURE__ */ r(
          bi,
          {
            className: "tw:m-1",
            checked: E,
            onCheckedChange: (R) => {
              P(R);
            }
          }
        ),
        /* @__PURE__ */ r(wt, { className: "tw:m-1 tw:flex-shrink-0 tw:whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? j })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ r(
      _c,
      {
        columns: Nt,
        data: Y,
        onRowClickHandler: Ct,
        stickyHeader: !0,
        isLoading: u,
        noResultsMessage: $
      }
    ) }),
    A.length > 0 && /* @__PURE__ */ r("div", { className: "tw:m-1 tw:flex-1 tw:overflow-auto tw:rounded-md tw:border", children: /* @__PURE__ */ r(
      zc,
      {
        classNameForText: f,
        occurrenceData: A,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
const Zc = "16rem", Qc = "3rem", vi = tt.createContext(void 0);
function kn() {
  const t = tt.useContext(vi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function td({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: n,
  className: o,
  style: i,
  children: s,
  side: a = "primary",
  ref: l,
  ...d
}) {
  const [c, u] = tt.useState(t), f = e ?? c, h = tt.useCallback(
    (_) => {
      const N = typeof _ == "function" ? _(f) : _;
      n ? n(N) : u(N);
    },
    [n, f]
  ), p = tt.useCallback(() => h((_) => !_), [h]), g = f ? "expanded" : "collapsed", x = dt() === "ltr" ? a : a === "primary" ? "secondary" : "primary", y = tt.useMemo(
    () => ({
      state: g,
      open: f,
      setOpen: h,
      toggleSidebar: p,
      side: x
    }),
    [g, f, h, p, x]
  );
  return /* @__PURE__ */ r(vi.Provider, { value: y, children: /* @__PURE__ */ r(kt, { delayDuration: 0, children: /* @__PURE__ */ r(
    "div",
    {
      style: (
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        {
          "--sidebar-width": Zc,
          "--sidebar-width-icon": Qc,
          ...i
        }
      ),
      className: m(
        // Removed tw:min-h-svh
        "tw:group/sidebar-wrapper pr-twp tw:flex tw:w-full tw:has-[[data-variant=inset]]:bg-sidebar",
        o
      ),
      ref: l,
      ...d,
      children: s
    }
  ) }) });
}
function ed({
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: n,
  children: o,
  ref: i,
  ...s
}) {
  const a = kn();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: m(
        "tw:flex tw:h-full tw:w-[--sidebar-width] tw:flex-col tw:bg-sidebar tw:text-sidebar-foreground",
        n
      ),
      ref: i,
      ...s,
      children: o
    }
  ) : /* @__PURE__ */ w(
    "div",
    {
      ref: i,
      className: "tw:group tw:peer tw:hidden tw:text-sidebar-foreground tw:md:block",
      "data-state": a.state,
      "data-collapsible": a.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": a.side,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: m(
              "tw:relative tw:h-svh tw:w-[--sidebar-width] tw:bg-transparent tw:transition-[width] tw:duration-200 tw:ease-linear",
              "tw:group-data-[collapsible=offcanvas]:w-0",
              "tw:group-data-[side=secondary]:rotate-180",
              t === "floating" || t === "inset" ? "tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: m(
              // CUSTOM: Switched tw:fixed to tw:absolute here to scope the sidebar inside of it's container
              "tw:absolute tw:inset-y-0 tw:z-10 tw:hidden tw:h-svh tw:w-[--sidebar-width] tw:transition-[left,right,width] tw:duration-200 tw:ease-linear tw:md:flex",
              a.side === "primary" ? "tw:left-0 tw:group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "tw:right-0 tw:group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw:p-2 tw:group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "tw:group-data-[collapsible=icon]:w-[--sidebar-width-icon] tw:group-data-[side=primary]:border-r tw:group-data-[side=secondary]:border-l",
              n
            ),
            ...s,
            children: /* @__PURE__ */ r(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw:flex tw:h-full tw:w-full tw:flex-col tw:bg-sidebar tw:group-data-[variant=floating]:rounded-lg tw:group-data-[variant=floating]:border tw:group-data-[variant=floating]:border-sidebar-border tw:group-data-[variant=floating]:shadow",
                children: o
              }
            )
          }
        )
      ]
    }
  );
}
function zw({
  className: t,
  onClick: e,
  ref: n,
  ...o
}) {
  const i = kn();
  return /* @__PURE__ */ w(
    B,
    {
      ref: n,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw:h-7 tw:w-7", t),
      onClick: (s) => {
        e == null || e(s), i.toggleSidebar();
      },
      ...o,
      children: [
        i.side === "primary" ? /* @__PURE__ */ r(rs, {}) : /* @__PURE__ */ r(os, {}),
        /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function qw({
  className: t,
  ref: e,
  ...n
}) {
  const { toggleSidebar: o } = kn();
  return /* @__PURE__ */ r(
    "button",
    {
      type: "button",
      ref: e,
      "data-sidebar": "rail",
      "aria-label": "Toggle Sidebar",
      tabIndex: -1,
      onClick: o,
      title: "Toggle Sidebar",
      className: m(
        "tw:absolute tw:inset-y-0 tw:z-20 tw:hidden tw:w-4 tw:-translate-x-1/2 tw:transition-all tw:ease-linear tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-[2px] tw:hover:after:bg-sidebar-border tw:group-data-[side=primary]:-right-4 tw:group-data-[side=secondary]:left-0 tw:sm:flex",
        "tw:[[data-side=secondary]_&]:cursor-e-resize tw:[[data-side=secondary]_&]:cursor-w-resize",
        "tw:[[data-side=primary][data-state=collapsed]_&]:cursor-e-resize tw:[[data-side=secondary][data-state=collapsed]_&]:cursor-w-resize",
        "tw:group-data-[collapsible=offcanvas]:translate-x-0 tw:group-data-[collapsible=offcanvas]:after:left-full tw:group-data-[collapsible=offcanvas]:hover:bg-sidebar",
        "tw:[[data-side=primary][data-collapsible=offcanvas]_&]:-right-2",
        "tw:[[data-side=secondary][data-collapsible=offcanvas]_&]:-left-2",
        t
      ),
      ...n
    }
  );
}
function nd({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "main",
    {
      ref: e,
      className: m(
        // CUSTOM: Removed tw:min-h-svh
        "tw:relative tw:flex tw:flex-1 tw:flex-col tw:bg-background",
        "tw:peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] tw:md:peer-data-[variant=inset]:m-2 tw:md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 tw:md:peer-data-[variant=inset]:ml-0 tw:md:peer-data-[variant=inset]:rounded-xl tw:md:peer-data-[variant=inset]:shadow",
        t
      ),
      ...n
    }
  );
}
function Ww({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Xe,
    {
      ref: e,
      "data-sidebar": "input",
      className: m(
        "tw:h-8 tw:w-full tw:bg-background tw:shadow-none tw:focus-visible:ring-2 tw:focus-visible:ring-sidebar-ring",
        t
      ),
      ...n
    }
  );
}
function Yw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "header",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...n
    }
  );
}
function Jw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "footer",
      className: m("tw:flex tw:flex-col tw:gap-2 tw:p-2", t),
      ...n
    }
  );
}
function Xw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    He,
    {
      ref: e,
      "data-sidebar": "separator",
      className: m("tw:mx-2 tw:w-auto tw:bg-sidebar-border", t),
      ...n
    }
  );
}
function rd({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "content",
      className: m(
        "tw:flex tw:min-h-0 tw:flex-1 tw:flex-col tw:gap-2 tw:overflow-auto tw:group-data-[collapsible=icon]:overflow-hidden",
        t
      ),
      ...n
    }
  );
}
function ro({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "group",
      className: m("tw:relative tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:p-2", t),
      ...n
    }
  );
}
function oo({
  className: t,
  asChild: e = !1,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    e ? Ae : "div",
    {
      ref: n,
      "data-sidebar": "group-label",
      className: m(
        "tw:flex tw:h-8 tw:shrink-0 tw:items-center tw:rounded-md tw:px-2 tw:text-xs tw:font-medium tw:text-sidebar-foreground/70 tw:outline-none tw:ring-sidebar-ring tw:transition-[margin,opa] tw:duration-200 tw:ease-linear tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        "tw:group-data-[collapsible=icon]:-mt-8 tw:group-data-[collapsible=icon]:opacity-0",
        t
      ),
      ...o
    }
  );
}
function Zw({
  className: t,
  asChild: e = !1,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    e ? Ae : "button",
    {
      ref: n,
      "data-sidebar": "group-action",
      className: m(
        "tw:absolute tw:right-3 tw:top-3.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "tw:after:absolute tw:after:-inset-2 tw:after:md:hidden",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...o
    }
  );
}
function io({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "group-content",
      className: m("tw:w-full tw:text-sm", t),
      ...n
    }
  );
}
function od({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu",
      className: m("tw:flex tw:w-full tw:min-w-0 tw:flex-col tw:gap-1", t),
      ...n
    }
  );
}
function id({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "li",
    {
      ref: e,
      "data-sidebar": "menu-item",
      className: m("tw:group/menu-item tw:relative", t),
      ...n
    }
  );
}
const sd = oe(
  "tw:peer/menu-button tw:flex tw:w-full tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:p-2 tw:text-left tw:text-sm tw:outline-none tw:ring-sidebar-ring tw:transition-[width,height,padding] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:data-[active=true]:font-medium tw:data-[active=true]:text-sidebar-accent-foreground tw:data-[active=true]:bg-sidebar-accent tw:data-[state=open]:hover:bg-sidebar-accent tw:data-[state=open]:hover:text-sidebar-accent-foreground tw:group-data-[collapsible=icon]:!size-8 tw:group-data-[collapsible=icon]:!p-2 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground",
        outline: "tw:bg-background tw:shadow-[0_0_0_1px_hsl(var(--sidebar-border))] tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "tw:h-8 tw:text-sm",
        sm: "tw:h-7 tw:text-xs",
        lg: "tw:h-12 tw:text-sm tw:group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function ad({
  asChild: t = !1,
  isActive: e = !1,
  variant: n = "default",
  size: o = "default",
  tooltip: i,
  className: s,
  ref: a,
  ...l
}) {
  const d = t ? Ae : "button", { state: c } = kn(), u = /* @__PURE__ */ r(
    d,
    {
      ref: a,
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: m(sd({ variant: n, size: o }), s),
      ...l
    }
  );
  return i ? (typeof i == "string" && (i = {
    children: i
  }), /* @__PURE__ */ w(Dt, { children: [
    /* @__PURE__ */ r(Lt, { asChild: !0, children: u }),
    /* @__PURE__ */ r(Mt, { side: "right", align: "center", hidden: c !== "collapsed", ...i })
  ] })) : u;
}
function Qw({
  className: t,
  asChild: e = !1,
  showOnHover: n = !1,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ r(
    e ? Ae : "button",
    {
      ref: o,
      "data-sidebar": "menu-action",
      className: m(
        "tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:absolute tw:right-1 tw:top-1.5 tw:flex tw:aspect-square tw:w-5 tw:items-center tw:justify-center tw:rounded-md tw:p-0 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:transition-transform tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:[&>svg]:size-4 tw:[&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "tw:after:absolute tw:after:-inset-2 tw:after:md:hidden",
        "tw:peer-data-[size=sm]/menu-button:top-1",
        "tw:peer-data-[size=default]/menu-button:top-1.5",
        "tw:peer-data-[size=lg]/menu-button:top-2.5",
        "tw:group-data-[collapsible=icon]:hidden",
        n && "tw:group-focus-within/menu-item:opacity-100 tw:group-hover/menu-item:opacity-100 tw:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground tw:data-[state=open]:opacity-100 tw:md:opacity-0",
        t
      ),
      ...i
    }
  );
}
function tu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "menu-badge",
      className: m(
        "tw:pointer-events-none tw:absolute tw:right-1 tw:flex tw:h-5 tw:min-w-5 tw:select-none tw:items-center tw:justify-center tw:rounded-md tw:px-1 tw:text-xs tw:font-medium tw:tabular-nums tw:text-sidebar-foreground",
        "tw:peer-hover/menu-button:text-sidebar-accent-foreground tw:peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw:peer-data-[size=sm]/menu-button:top-1",
        "tw:peer-data-[size=default]/menu-button:top-1.5",
        "tw:peer-data-[size=lg]/menu-button:top-2.5",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...n
    }
  );
}
function eu({
  className: t,
  showIcon: e = !1,
  ref: n,
  ...o
}) {
  const i = tt.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ w(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-skeleton",
      className: m("tw:flex tw:h-8 tw:items-center tw:gap-2 tw:rounded-md tw:px-2", t),
      ...o,
      children: [
        e && /* @__PURE__ */ r(er, { className: "tw:size-4 tw:rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          er,
          {
            className: "tw:h-4 tw:max-w-[--skeleton-width] tw:flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": i
              }
            )
          }
        )
      ]
    }
  );
}
function nu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu-sub",
      className: m(
        "tw:mx-3.5 tw:flex tw:min-w-0 tw:translate-x-px tw:flex-col tw:gap-1 tw:border-l tw:border-sidebar-border tw:px-2.5 tw:py-0.5",
        "tw:group-data-[collapsible=icon]:hidden",
        t
      ),
      ...n
    }
  );
}
function ru({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ r("li", { ref: t, ...e });
}
function ou({
  asChild: t = !1,
  size: e = "md",
  isActive: n,
  className: o,
  ref: i,
  ...s
}) {
  return /* @__PURE__ */ r(
    t ? Ae : "a",
    {
      ref: i,
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": n,
      className: m(
        "tw:flex tw:h-7 tw:min-w-0 tw:-translate-x-px tw:items-center tw:gap-2 tw:overflow-hidden tw:rounded-md tw:px-2 tw:text-sidebar-foreground tw:outline-none tw:ring-sidebar-ring tw:hover:bg-sidebar-accent tw:hover:text-sidebar-accent-foreground tw:focus-visible:ring-2 tw:active:bg-sidebar-accent tw:active:text-sidebar-accent-foreground tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-disabled:pointer-events-none tw:aria-disabled:opacity-50 tw:[&>span:last-child]:truncate tw:[&>svg]:size-4 tw:[&>svg]:shrink-0 tw:[&>svg]:text-sidebar-accent-foreground",
        "tw:data-[active=true]:bg-sidebar-accent tw:data-[active=true]:text-sidebar-accent-foreground",
        e === "sm" && "tw:text-xs",
        e === "md" && "tw:text-sm",
        "tw:group-data-[collapsible=icon]:hidden",
        o
      ),
      ...s
    }
  );
}
function ld({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: i,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: a,
  buttonPlaceholderText: l,
  className: d
}) {
  const c = K(
    (h, p) => {
      o(h, p);
    },
    [o]
  ), u = K(
    (h) => {
      const p = n.find((g) => g.projectId === h);
      return p ? p.projectName : h;
    },
    [n]
  ), f = K(
    (h) => !i.projectId && h === i.label,
    [i]
  );
  return /* @__PURE__ */ r(
    ed,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: m("tw:w-96 tw:gap-2 tw:overflow-y-auto", d),
      children: /* @__PURE__ */ w(rd, { children: [
        /* @__PURE__ */ w(ro, { children: [
          /* @__PURE__ */ r(oo, { className: "tw:text-sm", children: s }),
          /* @__PURE__ */ r(io, { children: /* @__PURE__ */ r(od, { children: Object.entries(e).map(([h, p]) => /* @__PURE__ */ r(id, { children: /* @__PURE__ */ r(
            ad,
            {
              onClick: () => c(h),
              isActive: f(h),
              children: /* @__PURE__ */ r("span", { className: "tw:pl-3", children: p })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ w(ro, { children: [
          /* @__PURE__ */ r(oo, { className: "tw:text-sm", children: a }),
          /* @__PURE__ */ r(io, { className: "tw:pl-3", children: /* @__PURE__ */ r(
            Yn,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw:w-full", {
                "tw:bg-sidebar-accent tw:text-sidebar-accent-foreground": i == null ? void 0 : i.projectId
              }),
              popoverContentClassName: "tw:z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: u,
              buttonPlaceholder: l,
              onChange: (h) => {
                const p = u(h);
                c(p, h);
              },
              value: (i == null ? void 0 : i.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(is, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const _r = qe(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: i, isDisabled: s = !1, id: a }, l) => {
    const d = dt();
    return /* @__PURE__ */ w("div", { id: a, className: m("tw:relative", { "tw:w-full": o }, i), children: [
      /* @__PURE__ */ r(
        lo,
        {
          className: m(
            "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50",
            { "tw:right-3": d === "rtl" },
            { "tw:left-3": d === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Xe,
        {
          ref: l,
          className: "tw:w-full tw:text-ellipsis tw:pe-9 tw:ps-9",
          placeholder: n,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: s
        }
      ),
      t && /* @__PURE__ */ w(
        B,
        {
          variant: "ghost",
          size: "icon",
          className: m(
            "tw:absolute tw:top-1/2 tw:h-7 tw:-translate-y-1/2 tw:transform tw:hover:bg-transparent",
            { "tw:left-0": d === "rtl" },
            { "tw:right-0": d === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Oe, { className: "tw:h-4 tw:w-4" }),
            /* @__PURE__ */ r("span", { className: "tw:sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
_r.displayName = "SearchBar";
function iu({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: i,
  selectedSidebarItem: s,
  searchValue: a,
  onSearch: l,
  extensionsSidebarGroupLabel: d,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: u
}) {
  return /* @__PURE__ */ w("div", { className: "tw:box-border tw:flex tw:h-full tw:flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw:box-border tw:flex tw:items-center tw:justify-center tw:py-4", children: /* @__PURE__ */ r(
      _r,
      {
        className: "tw:w-9/12",
        value: a,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ w(
      td,
      {
        id: t,
        className: "tw:h-full tw:flex-1 tw:gap-4 tw:overflow-auto tw:border-t",
        children: [
          /* @__PURE__ */ r(
            ld,
            {
              className: "tw:w-1/2 tw:min-w-[140px] tw:max-w-[220px] tw:border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: i,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: d,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: u
            }
          ),
          /* @__PURE__ */ r(nd, { className: "tw:min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Yt = "scrBook", cd = "scrRef", ue = "source", dd = "details", wd = "Scripture Reference", ud = "Scripture Book", xi = "Type", fd = "Details";
function pd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Yt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? wd,
      cell: (o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? it.bookIdToEnglishName(i.start.book) : o.row.groupingColumnId === Yt ? pe(i.start) : void 0;
      },
      getGroupingValue: (o) => it.bookIdToNumber(o.start.book),
      sortingFn: (o, i) => Bn(o.original.start, i.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => pe(o.start),
      id: cd,
      header: void 0,
      cell: (o) => {
        const i = o.row.original;
        return o.row.getIsGrouped() ? void 0 : pe(i.start);
      },
      sortingFn: (o, i) => Bn(o.original.start, i.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: ue,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? xi : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, i) => o.original.source.displayName.localeCompare(i.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: dd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? fd,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const md = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Bn(t.start, t.end) === 0 ? `${Cn(t.start)}+${e}` : `${Cn(t.start)}+${e}-${Cn(t.end)}+${n}`;
}, so = (t) => `${md({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function su({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: i,
  typeColumnName: s,
  detailsColumnName: a,
  onRowSelected: l,
  id: d
}) {
  const [c, u] = T([]), [f, h] = T([{ id: Yt, desc: !1 }]), [p, g] = T({}), v = F(
    () => t.flatMap((k) => k.data.map((S) => ({
      ...S,
      source: k.source
    }))),
    [t]
  ), b = F(
    () => pd(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: a
      },
      n
    ),
    [o, s, a, n]
  );
  U(() => {
    c.includes(ue) ? h([
      { id: ue, desc: !1 },
      { id: Yt, desc: !1 }
    ]) : h([{ id: Yt, desc: !1 }]);
  }, [c]);
  const x = Po({
    data: v,
    columns: b,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: p
    },
    onGroupingChange: u,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: ma(),
    getGroupedRowModel: pa(),
    getCoreRowModel: Lo(),
    getSortedRowModel: $o(),
    getRowId: so,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  U(() => {
    if (l) {
      const k = x.getSelectedRowModel().rowsById, S = Object.keys(k);
      if (S.length === 1) {
        const L = v.find((V) => so(V) === S[0]) || void 0;
        L && l(L);
      }
    }
  }, [p, v, l, x]);
  const y = i ?? ud, _ = s ?? xi, N = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [Yt] },
    { label: `Group by ${_}`, value: [ue] },
    {
      label: `Group by ${y} and ${_}`,
      value: [Yt, ue]
    },
    {
      label: `Group by ${_} and ${y}`,
      value: [ue, Yt]
    }
  ], j = (k) => {
    u(JSON.parse(k));
  }, $ = (k, S) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(S);
  }, E = (k, S) => k.getIsGrouped() ? "" : m("banded-row", S % 2 === 0 ? "even" : "odd"), P = (k, S, L) => {
    if (!((k == null ? void 0 : k.length) === 0 || S.depth < L.column.getGroupedIndex())) {
      if (S.getIsGrouped())
        switch (S.depth) {
          case 1:
            return "tw:ps-4";
          default:
            return;
        }
      switch (S.depth) {
        case 1:
          return "tw:ps-8";
        case 2:
          return "tw:ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ w("div", { id: d, className: "pr-twp tw:flex tw:h-full tw:w-full tw:flex-col", children: [
    !e && /* @__PURE__ */ w(
      Se,
      {
        value: JSON.stringify(c),
        onValueChange: (k) => {
          j(k);
        },
        children: [
          /* @__PURE__ */ r(De, { className: "tw:mb-1 tw:mt-2", children: /* @__PURE__ */ r(Re, {}) }),
          /* @__PURE__ */ r(Me, { position: "item-aligned", children: /* @__PURE__ */ r(pc, { children: N.map((k) => /* @__PURE__ */ r(St, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ w(vr, { className: "tw:relative tw:flex tw:flex-col tw:overflow-y-auto tw:p-0", children: [
      e && /* @__PURE__ */ r(xr, { children: x.getHeaderGroups().map((k) => /* @__PURE__ */ r(Jt, { children: k.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(pn, { colSpan: S.colSpan, className: "tw:sticky top-0", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ w("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ r(
            B,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          je(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, k.id)) }),
      /* @__PURE__ */ r(yr, { children: x.getRowModel().rows.map((k, S) => {
        const L = dt();
        return /* @__PURE__ */ r(
          Jt,
          {
            "data-state": k.getIsSelected() ? "selected" : "",
            className: m(E(k, S)),
            onClick: (V) => $(k, V),
            children: k.getVisibleCells().map((V) => {
              if (!(V.getIsPlaceholder() || V.column.columnDef.enableGrouping && !V.getIsGrouped() && (V.column.columnDef.id !== ue || !n)))
                return /* @__PURE__ */ r(
                  ke,
                  {
                    className: m(
                      V.column.columnDef.id,
                      "tw:p-[1px]",
                      P(c, k, V)
                    ),
                    children: V.getIsGrouped() ? /* @__PURE__ */ w(
                      B,
                      {
                        variant: "link",
                        onClick: k.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          k.getIsExpanded() && /* @__PURE__ */ r(Ie, {}),
                          !k.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ r(Ce, {}) : /* @__PURE__ */ r(jn, {})),
                          " ",
                          je(V.column.columnDef.cell, V.getContext()),
                          " (",
                          k.subRows.length,
                          ")"
                        ]
                      }
                    ) : je(V.column.columnDef.cell, V.getContext())
                  },
                  V.id
                );
            })
          },
          k.id
        );
      }) })
    ] })
  ] });
}
const kr = (t, e) => t.filter((n) => {
  try {
    return Ve(n) === e;
  } catch {
    return !1;
  }
}), yi = (t, e, n) => kr(t, e).every((o) => n.includes(o));
function hd({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: i
}) {
  const s = kr(e, t).length === 0, a = i["%scripture_section_ot_short%"], l = i["%scripture_section_nt_short%"], d = i["%scripture_section_dc_short%"], c = i["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    B,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: m(
        yi(e, t, n) && !s && "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/70 tw:hover:text-primary-foreground"
      ),
      disabled: s,
      children: Oa(
        t,
        a,
        l,
        d,
        c
      )
    }
  );
}
const ao = 5, $n = 6;
function gd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: i
}) {
  const s = o["%webView_book_selector_books_selected%"], a = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], d = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], u = o["%webView_book_selector_no_book_found%"], f = o["%webView_book_selector_more%"], { otLong: h, ntLong: p, dcLong: g, extraLong: v } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, x] = T(!1), [y, _] = T(""), N = q(void 0), j = q(!1);
  if (t.length !== it.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const $ = F(() => it.allBookIds.filter(
    (I, z) => t[z] === "1" && !it.isObsolete(it.bookIdToNumber(I))
  ), [t]), E = F(() => {
    if (!y.trim()) {
      const D = {
        [H.OT]: [],
        [H.NT]: [],
        [H.DC]: [],
        [H.Extra]: []
      };
      return $.forEach((Y) => {
        const Nt = Ve(Y);
        D[Nt].push(Y);
      }), D;
    }
    const I = $.filter(
      (D) => dr(D, y, i)
    ), z = {
      [H.OT]: [],
      [H.NT]: [],
      [H.DC]: [],
      [H.Extra]: []
    };
    return I.forEach((D) => {
      const Y = Ve(D);
      z[Y].push(D);
    }), z;
  }, [$, y, i]), P = K(
    (I, z = !1) => {
      if (!z || !N.current) {
        n(
          e.includes(I) ? e.filter((at) => at !== I) : [...e, I]
        ), N.current = I;
        return;
      }
      const D = $.findIndex((at) => at === N.current), Y = $.findIndex((at) => at === I);
      if (D === -1 || Y === -1) return;
      const [Nt, Ct] = [
        Math.min(D, Y),
        Math.max(D, Y)
      ], Et = $.slice(Nt, Ct + 1).map((at) => at);
      n(
        e.includes(I) ? e.filter((at) => !Et.includes(at)) : [.../* @__PURE__ */ new Set([...e, ...Et])]
      );
    },
    [e, n, $]
  ), k = (I) => {
    P(I, j.current), j.current = !1;
  }, S = (I, z) => {
    I.preventDefault(), P(z, I.shiftKey);
  }, L = K(
    (I) => {
      const z = kr($, I).map((D) => D);
      n(
        yi($, I, e) ? e.filter((D) => !z.includes(D)) : [.../* @__PURE__ */ new Set([...e, ...z])]
      );
    },
    [e, n, $]
  ), V = () => {
    n($.map((I) => I));
  }, O = () => {
    n([]);
  };
  return /* @__PURE__ */ w("div", { className: "tw:space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw:flex tw:flex-wrap tw:gap-2", children: Object.values(H).map((I) => /* @__PURE__ */ r(
      hd,
      {
        section: I,
        availableBookIds: $,
        selectedBookIds: e,
        onToggle: L,
        localizedStrings: o
      },
      I
    )) }),
    /* @__PURE__ */ w(
      zt,
      {
        open: b,
        onOpenChange: (I) => {
          x(I), I || _("");
        },
        children: [
          /* @__PURE__ */ r(le, { asChild: !0, children: /* @__PURE__ */ w(
            B,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw:max-w-64 tw:justify-between",
              children: [
                e.length > 0 ? `${s}: ${e.length}` : a,
                /* @__PURE__ */ r(mo, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(qt, { className: "tw:w-full tw:p-0", align: "start", children: /* @__PURE__ */ w(
            se,
            {
              shouldFilter: !1,
              onKeyDown: (I) => {
                I.key === "Enter" && (j.current = I.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Ye,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: _
                  }
                ),
                /* @__PURE__ */ w("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
                  /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: V, children: d }),
                  /* @__PURE__ */ r(B, { variant: "ghost", size: "sm", onClick: O, children: c })
                ] }),
                /* @__PURE__ */ w(ae, { children: [
                  /* @__PURE__ */ r(vn, { children: u }),
                  Object.values(H).map((I, z) => {
                    const D = E[I];
                    if (D.length !== 0)
                      return /* @__PURE__ */ w(vo, { children: [
                        /* @__PURE__ */ r(
                          ne,
                          {
                            heading: Vo(I, h, p, g, v),
                            children: D.map((Y) => /* @__PURE__ */ r(
                              Fo,
                              {
                                bookId: Y,
                                isSelected: e.includes(Y),
                                onSelect: () => k(Y),
                                onMouseDown: (Nt) => S(Nt, Y),
                                section: Ve(Y),
                                showCheck: !0,
                                localizedBookNames: i,
                                commandValue: qn(Y, i),
                                className: "tw:flex tw:items-center"
                              },
                              Y
                            ))
                          }
                        ),
                        z < Object.values(H).length - 1 && /* @__PURE__ */ r(Da, {})
                      ] }, I);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ w("div", { className: "tw:mt-2 tw:flex tw:flex-wrap tw:gap-1", children: [
      e.slice(
        0,
        e.length === $n ? $n : ao
      ).map((I) => /* @__PURE__ */ r(Ue, { className: "tw:hover:bg-secondary", variant: "secondary", children: _e(I, i) }, I)),
      e.length > $n && /* @__PURE__ */ r(
        Ue,
        {
          className: "tw:hover:bg-secondary",
          variant: "secondary",
          children: `+${e.length - ao} ${f}`
        }
      )
    ] })
  ] });
}
const au = Object.freeze([
  "%webView_scope_selector_selected_text%",
  "%webView_scope_selector_current_verse%",
  "%webView_scope_selector_current_chapter%",
  "%webView_scope_selector_current_book%",
  "%webView_scope_selector_choose_books%",
  "%webView_scope_selector_scope%",
  "%webView_scope_selector_select_books%",
  "%webView_book_selector_books_selected%",
  "%webView_book_selector_select_books%",
  "%webView_book_selector_search_books%",
  "%webView_book_selector_select_all%",
  "%webView_book_selector_clear_all%",
  "%webView_book_selector_no_book_found%",
  "%webView_book_selector_more%",
  "%scripture_section_ot_long%",
  "%scripture_section_ot_short%",
  "%scripture_section_nt_long%",
  "%scripture_section_nt_short%",
  "%scripture_section_dc_long%",
  "%scripture_section_dc_short%",
  "%scripture_section_extra_long%",
  "%scripture_section_extra_short%"
]), de = (t, e) => t[e] ?? e;
function lu({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: i,
  onSelectedBookIdsChange: s,
  localizedStrings: a,
  localizedBookNames: l,
  id: d
}) {
  const c = de(
    a,
    "%webView_scope_selector_selected_text%"
  ), u = de(
    a,
    "%webView_scope_selector_current_verse%"
  ), f = de(
    a,
    "%webView_scope_selector_current_chapter%"
  ), h = de(a, "%webView_scope_selector_current_book%"), p = de(a, "%webView_scope_selector_choose_books%"), g = de(a, "%webView_scope_selector_scope%"), v = de(a, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: u, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: p, id: "scope-selected" }
  ], x = e ? b.filter((y) => e.includes(y.value)) : b;
  return /* @__PURE__ */ w("div", { id: d, className: "tw:grid tw:gap-4", children: [
    /* @__PURE__ */ w("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ r(wt, { children: g }),
      /* @__PURE__ */ r(
        Ko,
        {
          value: t,
          onValueChange: n,
          className: "tw:flex tw:flex-col tw:space-y-1",
          children: x.map(({ value: y, label: _, id: N }) => /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center", children: [
            /* @__PURE__ */ r(Wn, { className: "tw:me-2", value: y, id: N }),
            /* @__PURE__ */ r(wt, { htmlFor: N, children: _ })
          ] }, N))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ w("div", { className: "tw:grid tw:gap-2", children: [
      /* @__PURE__ */ r(wt, { children: v }),
      /* @__PURE__ */ r(
        gd,
        {
          availableBookInfo: o,
          selectedBookIds: i,
          onChangeSelectedBookIds: s,
          localizedStrings: a,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const Ln = {
  [Q("undefined")]: "Ø",
  [Q(0)]: "A",
  [Q(1)]: "B",
  [Q(2)]: "C",
  [Q(3)]: "D",
  [Q(4)]: "E",
  [Q(5)]: "F",
  [Q(6)]: "G",
  [Q(7)]: "H",
  [Q(8)]: "I",
  [Q(9)]: "J",
  [Q(10)]: "K",
  [Q(11)]: "L",
  [Q(12)]: "M",
  [Q(13)]: "N",
  [Q(14)]: "O",
  [Q(15)]: "P",
  [Q(16)]: "Q",
  [Q(17)]: "R",
  [Q(18)]: "S",
  [Q(19)]: "T",
  [Q(20)]: "U",
  [Q(21)]: "V",
  [Q(22)]: "W",
  [Q(23)]: "X",
  [Q(24)]: "Y",
  [Q(25)]: "Z"
};
function cu({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: i = "sm",
  className: s,
  id: a
}) {
  const l = {
    ...Ln,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, u]) => [
          c,
          c === u && c in Ln ? Ln[c] : u
        ]
      )
    )
  }, d = dt();
  return /* @__PURE__ */ w(
    Se,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(De, { size: i, className: m("pr-twp tw:w-auto", s), children: /* @__PURE__ */ r(
          Re,
          {
            placeholder: l[Q(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Me,
          {
            id: a,
            align: d === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: t.map((c) => /* @__PURE__ */ r(St, { value: `${c}`, children: l[Q(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function du({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw:grid", children: t });
}
function wu({
  primary: t,
  secondary: e,
  children: n,
  isLoading: o = !1,
  loadingMessage: i
}) {
  return /* @__PURE__ */ w("div", { className: "tw:flex tw:items-center tw:justify-between tw:space-x-4 tw:py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw:text-sm tw:font-medium tw:leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw:whitespace-normal tw:break-words tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw:text-sm tw:text-muted-foreground", children: i }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function uu({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ w("div", { className: "tw:space-y-4 tw:py-2", children: [
    /* @__PURE__ */ w("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw:text-lg tw:font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw:text-sm tw:text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(He, {}) : ""
  ] });
}
function Ni(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function mn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: m("tw:max-h-5 tw:max-w-5", n ? "tw:me-2" : "tw:ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const _i = (t, e, n, o) => n ? Object.entries(t).filter(
  ([s, a]) => "column" in a && a.column === n || s === n
).sort(([, s], [, a]) => s.order - a.order).flatMap(([s]) => e.filter((l) => l.group === s).sort((l, d) => l.order - d.order).map((l) => /* @__PURE__ */ w(Dt, { children: [
  /* @__PURE__ */ r(Lt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ w(
    tr,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(mn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(mn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ w(ac, { children: [
    /* @__PURE__ */ r(cc, { children: l.label }),
    /* @__PURE__ */ r(sc, { children: /* @__PURE__ */ r(dc, { children: _i(
      t,
      e,
      Ni(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Mt, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function nr({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: i,
  variant: s,
  buttonVariant: a = "ghost",
  id: l
}) {
  return /* @__PURE__ */ w(ve, { variant: s, children: [
    /* @__PURE__ */ r(Pe, { "aria-label": n, className: i, asChild: !0, id: l, children: /* @__PURE__ */ r(B, { variant: a, size: "icon", children: o ?? /* @__PURE__ */ r(ss, {}) }) }),
    /* @__PURE__ */ r(xe, { align: "start", className: "tw:z-[250]", children: Object.entries(e.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, c]) => typeof d == "boolean" || typeof c == "boolean" ? 0 : d.order - c.order).map(([d], c, u) => /* @__PURE__ */ w(vo, { children: [
      /* @__PURE__ */ r(hi, { children: /* @__PURE__ */ r(kt, { children: _i(e.groups, e.items, d, t) }) }),
      c < u.length - 1 && /* @__PURE__ */ r(Je, {})
    ] }, d)) })
  ] });
}
const ki = tt.forwardRef(
  ({ id: t, className: e, children: n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `tw:sticky tw:top-0 tw:box-border tw:flex tw:h-14 tw:flex-row tw:items-center tw:justify-between tw:gap-2 tw:overflow-clip tw:px-4 tw:py-2 tw:text-foreground tw:@container/toolbar ${e}`,
      id: t,
      children: n
    }
  )
);
function fu({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: i,
  className: s,
  startAreaChildren: a,
  centerAreaChildren: l,
  endAreaChildren: d,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ w(ki, { className: `tw:w-full tw:border ${s}`, id: i, children: [
    n && /* @__PURE__ */ r(
      nr,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(as, {}),
        buttonVariant: "ghost"
      }
    ),
    a && /* @__PURE__ */ r("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[10] tw:flex-row tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: a }),
    l && /* @__PURE__ */ r("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:basis-0 tw:flex-row tw:flex-wrap tw:items-start tw:justify-center tw:gap-x-1 tw:gap-y-2 tw:overflow-clip tw:@sm:basis-auto", children: l }),
    /* @__PURE__ */ w("div", { className: "tw:flex tw:h-full tw:shrink tw:grow-[1] tw:flex-row-reverse tw:flex-wrap tw:items-start tw:gap-x-1 tw:gap-y-2 tw:overflow-clip", children: [
      o && /* @__PURE__ */ r(
        nr,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(ls, {}),
          className: "tw:h-full"
        }
      ),
      d
    ] })
  ] });
}
function pu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: i
}) {
  return /* @__PURE__ */ r(ki, { className: "tw:pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    nr,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: i,
      className: `tw:pointer-events-auto tw:shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Ci = tt.forwardRef(({ className: t, ...e }, n) => {
  const o = dt();
  return /* @__PURE__ */ r(
    It.Root,
    {
      orientation: "vertical",
      ref: n,
      className: m("tw:flex tw:gap-1 tw:rounded-md tw:text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Ci.displayName = It.List.displayName;
const Ei = tt.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.List,
  {
    ref: n,
    className: m(
      "tw:flex-fit tw:mlk-items-center tw:w-[124px] tw:justify-center tw:rounded-md tw:bg-muted tw:p-1 tw:text-muted-foreground",
      t
    ),
    ...e
  }
));
Ei.displayName = It.List.displayName;
const bd = tt.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.Trigger,
  {
    ref: n,
    ...e,
    className: m(
      "tw:inline-flex tw:w-[116px] tw:cursor-pointer tw:items-center tw:justify-center tw:break-words tw:rounded-sm tw:border-0 tw:bg-muted tw:px-3 tw:py-1.5 tw:text-sm tw:font-medium tw:text-inherit tw:ring-offset-background tw:transition-all tw:hover:text-foreground tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow-sm overflow-clip",
      t
    )
  }
)), Ti = tt.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  It.Content,
  {
    ref: n,
    className: m(
      // Removed tw:mt-2 because Sebastian said so
      "tw:ms-5 tw:flex-grow tw:text-foreground tw:ring-offset-background tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
      t
    ),
    ...e
  }
));
Ti.displayName = It.Content.displayName;
function mu({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: i,
  searchClassName: s,
  id: a
}) {
  return /* @__PURE__ */ w("div", { id: a, className: "pr-twp", children: [
    /* @__PURE__ */ w("div", { className: "tw:sticky tw:top-0 tw:space-y-2 tw:pb-2", children: [
      i ? /* @__PURE__ */ r("h1", { children: i }) : "",
      /* @__PURE__ */ r(
        _r,
        {
          className: s,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ w(Ci, { children: [
      /* @__PURE__ */ r(Ei, { children: t.map((l) => /* @__PURE__ */ r(bd, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(Ti, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function vd({ ...t }) {
  return /* @__PURE__ */ r(Vt.Menu, { ...t });
}
function xd({ ...t }) {
  return /* @__PURE__ */ r(Vt.Sub, { "data-slot": "menubar-sub", ...t });
}
function yd({
  className: t,
  variant: e = "default",
  ref: n,
  ...o
}) {
  const i = tt.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(br.Provider, { value: i, children: /* @__PURE__ */ r(
    Vt.Root,
    {
      ref: n,
      className: m(
        "tw:flex tw:h-9 tw:items-center tw:space-x-1 tw:rounded-md tw:border tw:bg-background tw:p-1 tw:shadow-sm",
        t
      ),
      ...o
    }
  ) });
}
function Nd({
  className: t,
  ref: e,
  ...n
}) {
  const o = Wt();
  return /* @__PURE__ */ r(
    Vt.Trigger,
    {
      ref: e,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-3 tw:py-1 tw:text-sm tw:font-medium tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        // CUSTOM
        "pr-twp",
        be({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...n
    }
  );
}
function _d({
  className: t,
  inset: e,
  children: n,
  ref: o,
  ...i
}) {
  const s = Wt();
  return /* @__PURE__ */ w(
    Vt.SubTrigger,
    {
      ref: o,
      className: m(
        "tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        be({ variant: s.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...i,
      children: [
        n,
        /* @__PURE__ */ r(Ce, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function kd({
  className: t,
  ref: e,
  ...n
}) {
  const o = Wt();
  return /* @__PURE__ */ r(
    Vt.SubContent,
    {
      ref: e,
      className: m(
        "tw:z-50 tw:min-w-[8rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw:bg-popover": o.variant === "muted"
        },
        t
      ),
      ...n
    }
  );
}
function Cd({
  className: t,
  align: e = "start",
  alignOffset: n = -4,
  sideOffset: o = 8,
  ref: i,
  ...s
}) {
  const a = Wt();
  return /* @__PURE__ */ r(Vt.Portal, { children: /* @__PURE__ */ r(
    Vt.Content,
    {
      ref: i,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: m(
        "tw:z-50 tw:min-w-[12rem] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw:bg-popover": a.variant === "muted"
        },
        t
      ),
      ...s
    }
  ) });
}
function Ed({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  const i = Wt();
  return /* @__PURE__ */ r(
    Vt.Item,
    {
      ref: n,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        be({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o
    }
  );
}
function Td({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Vt.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-muted", t),
      ...n
    }
  );
}
const Le = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Si = (t, e, n, o) => {
  if (!n) return;
  const i = Object.entries(t).filter(
    ([s, a]) => "column" in a && a.column === n || s === n
  ).sort(([, s], [, a]) => s.order - a.order);
  return i.flatMap(([s], a) => {
    const l = e.filter((c) => c.group === s).sort((c, u) => c.order - u.order).map((c) => /* @__PURE__ */ w(Dt, { children: [
      /* @__PURE__ */ r(Lt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ w(
        Ed,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r(mn, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r(mn, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ w(xd, { children: [
        /* @__PURE__ */ r(_d, { children: c.label }),
        /* @__PURE__ */ r(kd, { children: Si(
          t,
          e,
          Ni(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Mt, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), d = [...l];
    return l.length > 0 && a < i.length - 1 && d.push(/* @__PURE__ */ r(Td, {}, `separator-${s}`)), d;
  });
};
function Sd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const i = q(void 0), s = q(void 0), a = q(void 0), l = q(void 0), d = q(void 0), c = (u) => {
    switch (u) {
      case "platform.app":
        return s;
      case "platform.window":
        return a;
      case "platform.layout":
        return l;
      case "platform.help":
        return d;
      default:
        return;
    }
  };
  if (va(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (u, f) => {
    var g, v, b, x;
    u.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, p = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        Le(s, [h]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Le(s, [h, p]);
        break;
      case "alt+l":
        (v = a.current) == null || v.focus(), Le(a, [h, p]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), Le(l, [h, p]);
        break;
      case "alt+h":
        (x = d.current) == null || x.focus(), Le(d, [h, p]);
        break;
    }
  }), U(() => {
    if (!n || !i.current) return;
    const u = new MutationObserver((p) => {
      p.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          n(v === "open");
        }
      });
    });
    return i.current.querySelectorAll("[data-state]").forEach((p) => {
      u.observe(p, { attributes: !0 });
    }), () => u.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(yd, { ref: i, className: "pr-twp tw:border-0 tw:bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, u]) => typeof u == "object").sort(([, u], [, f]) => typeof u == "boolean" || typeof f == "boolean" ? 0 : u.order - f.order).map(([u, f]) => /* @__PURE__ */ w(vd, { children: [
      /* @__PURE__ */ r(Nd, { ref: c(u), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ r(
        Cd,
        {
          className: "tw:z-[250]",
          children: /* @__PURE__ */ r(kt, { children: Si(t.groups, t.items, u, e) })
        }
      )
    ] }, u)) });
}
function hu(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw:ps-[85px]";
    default:
      return "tw:pe-[calc(138px+1rem)]";
  }
}
function gu({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: i,
  children: s,
  appMenuAreaChildren: a,
  configAreaChildren: l,
  shouldUseAsAppDragArea: d,
  menubarVariant: c = "default"
}) {
  const u = q(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw:border tw:px-4 tw:text-foreground", o),
      ref: u,
      style: { position: "relative" },
      id: i,
      children: /* @__PURE__ */ w(
        "div",
        {
          className: "tw:flex tw:h-full tw:w-full tw:justify-between tw:overflow-hidden",
          style: d ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw:flex tw:grow tw:basis-0", children: /* @__PURE__ */ w(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  a,
                  t && /* @__PURE__ */ r(
                    Sd,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: n,
                      variant: c
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: "tw:flex tw:items-center tw:gap-2 tw:px-2",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: s
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw:flex tw:min-w-0 tw:grow tw:basis-0 tw:justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw:flex tw:min-w-0 tw:items-center tw:gap-2 tw:pe-1",
                style: d ? { WebkitAppRegion: "no-drag" } : void 0,
                children: l
              }
            ) })
          ]
        }
      )
    }
  );
}
const Rd = (t, e) => t[e] ?? e;
function bu({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: i,
  onFallbackLanguagesChange: s,
  localizedStrings: a,
  className: l,
  id: d
}) {
  const c = Rd(
    a,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [u, f] = T(!1), h = (g) => {
    i && i(g), o && o([g, ...n.filter((v) => v !== g)]), s && n.find((v) => v === g) && s([...n.filter((v) => v !== g)]), f(!1);
  }, p = (g, v) => {
    var x, y, _, N, j, $;
    const b = v !== g ? ((y = (x = t[g]) == null ? void 0 : x.uiNames) == null ? void 0 : y[v]) ?? ((N = (_ = t[g]) == null ? void 0 : _.uiNames) == null ? void 0 : N.en) : void 0;
    return b ? `${(j = t[g]) == null ? void 0 : j.autonym} (${b})` : ($ = t[g]) == null ? void 0 : $.autonym;
  };
  return /* @__PURE__ */ w("div", { id: d, className: m("pr-twp tw:max-w-sm", l), children: [
    /* @__PURE__ */ w(
      Se,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: u,
        onOpenChange: (g) => f(g),
        children: [
          /* @__PURE__ */ r(De, { children: /* @__PURE__ */ r(Re, {}) }),
          /* @__PURE__ */ r(
            Me,
            {
              className: "tw:z-[250]",
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(St, { value: g, children: p(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw:pt-3", children: /* @__PURE__ */ r(wt, { className: "tw:font-normal tw:text-muted-foreground", children: fe(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => p(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function Dd({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(wt, { children: e(t) }) : n ? /* @__PURE__ */ r(wt, { children: n(t) }) : /* @__PURE__ */ r(wt, { children: t });
}
function vu({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s,
  createComplexLabel: a
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((l) => /* @__PURE__ */ w("div", { className: "tw:m-2 tw:flex tw:items-center", children: [
    /* @__PURE__ */ r(
      bi,
      {
        className: "tw:me-2 tw:align-middle",
        checked: o.includes(l),
        onCheckedChange: (d) => i(l, d)
      }
    ),
    /* @__PURE__ */ r(
      Dd,
      {
        item: l,
        createLabel: s,
        createComplexLabel: a
      }
    )
  ] }, l)) });
}
function xu({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: i = !1,
  className: s,
  children: a,
  dropdownContent: l,
  additionalSelectedContent: d,
  accentColor: c
}) {
  return /* @__PURE__ */ w(
    "div",
    {
      hidden: i,
      onClick: n,
      onKeyDown: (f) => {
        (f.key === "Enter" || f.key === " ") && (f.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: m(
        "tw:relative tw:min-w-36 tw:rounded-xl tw:border tw:shadow-none tw:hover:bg-muted/50",
        { "tw:opacity-50 tw:hover:opacity-100": o && !e },
        { "tw:bg-accent": e },
        { "tw:bg-transparent": !e },
        s
      ),
      children: [
        /* @__PURE__ */ w("div", { className: "tw:flex tw:flex-col tw:gap-2 tw:p-4", children: [
          /* @__PURE__ */ w("div", { className: "tw:flex tw:justify-between tw:overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw:min-w-0 tw:flex-1", children: a }),
            e && l && /* @__PURE__ */ w(ve, { children: [
              /* @__PURE__ */ r(Pe, { className: m(c && "tw:me-1"), asChild: !0, children: /* @__PURE__ */ r(B, { className: "tw:m-1 tw:h-6 tw:w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(uo, {}) }) }),
              /* @__PURE__ */ r(xe, { align: "end", children: l })
            ] })
          ] }),
          e && d && /* @__PURE__ */ r("div", { className: "tw:w-fit tw:min-w-0 tw:max-w-full tw:overflow-hidden", children: d })
        ] }),
        c && /* @__PURE__ */ r(
          "div",
          {
            className: `tw:absolute tw:right-0 tw:top-0 tw:h-full tw:w-2 tw:rounded-r-xl ${c}`
          }
        )
      ]
    },
    t
  );
}
const Md = qe(({ className: t, ...e }, n) => /* @__PURE__ */ r(cs, { size: 35, className: m("tw:animate-spin", t), ...e, ref: n }));
Md.displayName = "Spinner";
function yu({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: s,
  placeholder: a,
  isRequired: l = !1,
  className: d,
  defaultValue: c,
  value: u,
  onChange: f,
  onFocus: h,
  onBlur: p
}) {
  return /* @__PURE__ */ w("div", { className: m("tw:inline-grid tw:items-center tw:gap-1.5", { "tw:w-full": o }), children: [
    /* @__PURE__ */ r(
      wt,
      {
        htmlFor: t,
        className: m({
          "tw:text-red-600": n,
          "tw:hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      Xe,
      {
        id: t,
        disabled: e,
        placeholder: a,
        required: l,
        className: m(d, { "tw:border-red-600": n }),
        defaultValue: c,
        value: u,
        onChange: f,
        onFocus: h,
        onBlur: p
      }
    ),
    /* @__PURE__ */ r("p", { className: m({ "tw:hidden": !i }), children: i })
  ] });
}
const Od = oe(
  // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
  // images (or svgs from file) as icons
  // Implemented by TJ Couch
  // Approved by Alex Mercado
  // 20 February 2025
  "tw:relative tw:w-full tw:rounded-lg tw:border tw:px-4 tw:py-3 tw:text-sm tw:[&>svg+div]:translate-y-[-3px] tw:[&>svg]:absolute tw:[&>svg]:left-4 tw:[&>svg]:top-4 tw:[&>svg]:text-foreground tw:[&>svg~*]:pl-7 tw:[&>img+div]:translate-y-[-3px] tw:[&>img]:absolute tw:[&>img]:left-4 tw:[&>img]:top-4 tw:[&>img]:text-foreground tw:[&>img~*]:pl-7",
  {
    variants: {
      variant: {
        default: "tw:bg-background tw:text-foreground",
        destructive: (
          // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can
          // use images (or svgs from file) as icons
          // Implemented by TJ Couch
          // Approved by Alex Mercado
          // 20 February 2025
          "tw:border-destructive/50 tw:text-destructive tw:dark:border-destructive tw:[&>svg]:text-destructive tw:[&>img]:text-destructive"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Nu({
  className: t,
  variant: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      role: "alert",
      className: m(
        // CUSTOM
        "pr-twp",
        Od({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function _u({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ w(
    "h5",
    {
      ref: e,
      className: m("tw:mb-1 tw:font-medium tw:leading-none tw:tracking-tight", t),
      ...n,
      children: [
        n.children,
        " "
      ]
    }
  );
}
function ku({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r("div", { ref: e, className: m("tw:text-sm tw:[&_p]:leading-relaxed", t), ...n });
}
const Cu = ft.Root, Eu = ft.Trigger, Tu = ft.Group, Su = ft.Portal, Ru = ft.Sub, Du = ft.RadioGroup;
function Mu({
  className: t,
  inset: e,
  children: n,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ w(
    ft.SubTrigger,
    {
      ref: o,
      className: m(
        "pr-twp tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[state=open]:bg-accent tw:data-[state=open]:text-accent-foreground",
        e && "tw:pl-8",
        t
      ),
      ...i,
      children: [
        n,
        /* @__PURE__ */ r(Ce, { className: "tw:ml-auto tw:h-4 tw:w-4" })
      ]
    }
  );
}
function Ou({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ft.SubContent,
    {
      ref: e,
      className: m(
        "pr-twp tw:z-50 tw:min-w-[8rem] tw:origin-[--radix-context-menu-content-transform-origin] tw:overflow-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...n
    }
  );
}
function Iu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(ft.Portal, { children: /* @__PURE__ */ r(
    ft.Content,
    {
      ref: e,
      className: m(
        "pr-twp tw:z-50 tw:max-h-[--radix-context-menu-content-available-height] tw:min-w-[8rem] tw:origin-[--radix-context-menu-content-transform-origin] tw:overflow-y-auto tw:overflow-x-hidden tw:rounded-md tw:border tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:animate-in tw:fade-in-80 tw:data-[state=open]:animate-in tw:data-[state=closed]:animate-out tw:data-[state=closed]:fade-out-0 tw:data-[state=open]:fade-in-0 tw:data-[state=closed]:zoom-out-95 tw:data-[state=open]:zoom-in-95 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2",
        t
      ),
      ...n
    }
  ) });
}
function Au({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    ft.Item,
    {
      ref: n,
      className: m(
        "pr-twp tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        e && "tw:pl-8",
        t
      ),
      ...o
    }
  );
}
function Pu({
  className: t,
  children: e,
  checked: n,
  ref: o,
  ...i
}) {
  return /* @__PURE__ */ w(
    ft.CheckboxItem,
    {
      ref: o,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      checked: n,
      ...i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ r(ft.ItemIndicator, { children: /* @__PURE__ */ r(jt, { className: "tw:h-4 tw:w-4" }) }) }),
        e
      ]
    }
  );
}
function $u({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ w(
    ft.RadioItem,
    {
      ref: n,
      className: m(
        "tw:relative tw:flex tw:cursor-default tw:select-none tw:items-center tw:rounded-sm tw:py-1.5 tw:pl-8 tw:pr-2 tw:text-sm tw:outline-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:data-[disabled]:pointer-events-none tw:data-[disabled]:opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw:absolute tw:left-2 tw:flex tw:h-3.5 tw:w-3.5 tw:items-center tw:justify-center", children: /* @__PURE__ */ r(ft.ItemIndicator, { children: /* @__PURE__ */ r(rr, { className: "tw:h-2 tw:w-2 tw:fill-current" }) }) }),
        e
      ]
    }
  );
}
function Lu({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    ft.Label,
    {
      ref: n,
      className: m(
        "tw:px-2 tw:py-1.5 tw:text-sm tw:font-semibold tw:text-foreground",
        e && "tw:pl-8",
        t
      ),
      ...o
    }
  );
}
function Vu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ft.Separator,
    {
      ref: e,
      className: m("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", t),
      ...n
    }
  );
}
function ju({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw:ml-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground", t),
      ...e
    }
  );
}
const Ri = tt.createContext({
  direction: "bottom"
});
function Fu({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = tt.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Ri.Provider, { value: o, children: /* @__PURE__ */ r(
    ie.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
const Bu = ie.Trigger, Id = ie.Portal, Ku = ie.Close;
function Ad({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ie.Overlay,
    {
      ref: e,
      className: m("tw:fixed tw:inset-0 tw:z-50 tw:bg-black/80", t),
      ...n
    }
  );
}
function Gu({
  className: t,
  children: e,
  hideDrawerHandle: n = !1,
  ref: o,
  ...i
}) {
  const { direction: s = "bottom" } = tt.useContext(Ri), a = {
    bottom: "tw:inset-x-0 tw:bottom-0 tw:mt-24 tw:rounded-t-[10px]",
    top: "tw:inset-x-0 tw:top-0 tw:mb-24 tw:rounded-b-[10px]",
    left: "tw:inset-y-0 tw:left-0 tw:mr-24 tw:rounded-r-[10px] tw:w-auto tw:max-w-sm",
    right: "tw:inset-y-0 tw:right-0 tw:ml-24 tw:rounded-l-[10px] tw:w-auto tw:max-w-sm"
  }, l = {
    bottom: "tw:mx-auto tw:mt-4 tw:h-2 tw:w-[100px] tw:rounded-full tw:bg-muted",
    top: "tw:mx-auto tw:mb-4 tw:h-2 tw:w-[100px] tw:rounded-full tw:bg-muted",
    left: "tw:my-auto tw:mr-4 tw:w-2 tw:h-[100px] tw:rounded-full tw:bg-muted",
    right: "tw:my-auto tw:ml-4 tw:w-2 tw:h-[100px] tw:rounded-full tw:bg-muted"
  };
  return /* @__PURE__ */ w(Id, { children: [
    /* @__PURE__ */ r(Ad, {}),
    /* @__PURE__ */ w(
      ie.Content,
      {
        ref: o,
        className: m(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw:inset-x-0 tw:bottom-0 tw:mt-24 tw:rounded-t-[10px] tw:flex-col
          "pr-twp tw:fixed tw:z-50 tw:flex tw:h-auto tw:border tw:bg-background",
          s === "bottom" || s === "top" ? "tw:flex-col" : "tw:flex-row",
          a[s],
          t
        ),
        ...i,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: l[s] }),
          /* @__PURE__ */ r("div", { className: "tw:flex tw:flex-col", children: e }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: l[s] })
        ]
      }
    )
  ] });
}
function Uu({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw:grid tw:gap-1.5 tw:p-4 tw:text-center tw:sm:text-left", t),
      ...e
    }
  );
}
function Hu({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: m("tw:mt-auto tw:flex tw:flex-col tw:gap-2 tw:p-4", t), ...e });
}
function zu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ie.Title,
    {
      ref: e,
      className: m("tw:text-lg tw:font-semibold tw:leading-none tw:tracking-tight", t),
      ...n
    }
  );
}
function qu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ie.Description,
    {
      ref: e,
      className: m("tw:text-sm tw:text-muted-foreground", t),
      ...n
    }
  );
}
function Wu({
  className: t,
  value: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    jr.Root,
    {
      ref: n,
      className: m(
        "pr-twp tw:relative tw:h-2 tw:w-full tw:overflow-hidden tw:rounded-full tw:bg-primary/20",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r(
        jr.Indicator,
        {
          className: "tw:h-full tw:w-full tw:flex-1 tw:bg-primary tw:transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function Yu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    lr.PanelGroup,
    {
      className: m(
        "tw:flex tw:h-full tw:w-full tw:data-[panel-group-direction=vertical]:flex-col",
        t
      ),
      ...e
    }
  );
}
const Ju = lr.Panel;
function Xu({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    lr.PanelResizeHandle,
    {
      className: m(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:after:absolute tw:after:inset-y-0 tw:after:left-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-1 tw:data-[panel-group-direction=vertical]:h-px tw:data-[panel-group-direction=vertical]:w-full tw:data-[panel-group-direction=vertical]:after:left-0 tw:data-[panel-group-direction=vertical]:after:h-1 tw:data-[panel-group-direction=vertical]:after:w-full tw:data-[panel-group-direction=vertical]:after:-translate-y-1/2 tw:data-[panel-group-direction=vertical]:after:translate-x-0 tw:[&[data-panel-group-direction=vertical]>div]:rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw:z-10 tw:flex tw:h-4 tw:w-3 tw:items-center tw:justify-center tw:rounded-sm tw:border tw:bg-border", children: /* @__PURE__ */ r(ds, { className: "tw:h-2.5 tw:w-2.5" }) })
    }
  );
}
function Zu({ ...t }) {
  return /* @__PURE__ */ r(
    xa,
    {
      className: "tw:toaster tw:group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...t
    }
  );
}
function Qu({
  className: t,
  ref: e,
  ...n
}) {
  const o = dt();
  return /* @__PURE__ */ w(
    en.Root,
    {
      ref: e,
      className: m(
        "pr-twp tw:relative tw:flex tw:w-full tw:touch-none tw:select-none tw:items-center",
        t
      ),
      ...n,
      dir: o,
      children: [
        /* @__PURE__ */ r(en.Track, { className: "tw:relative tw:h-1.5 tw:w-full tw:grow tw:overflow-hidden tw:rounded-full tw:bg-primary/20", children: /* @__PURE__ */ r(en.Range, { className: "tw:absolute tw:h-full tw:bg-primary" }) }),
        /* @__PURE__ */ r(en.Thumb, { className: "tw:block tw:h-4 tw:w-4 tw:rounded-full tw:border tw:border-primary/50 tw:bg-background tw:shadow tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:pointer-events-none tw:disabled:opacity-50" })
      ]
    }
  );
}
function tf({
  className: t,
  ref: e,
  ...n
}) {
  const o = dt();
  return /* @__PURE__ */ r(
    Fr.Root,
    {
      className: m(
        "tw:peer pr-twp tw:inline-flex tw:h-5 tw:w-9 tw:shrink-0 tw:cursor-pointer tw:items-center tw:rounded-full tw:border-2 tw:border-transparent tw:shadow-sm tw:transition-colors tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:data-[state=checked]:bg-primary tw:data-[state=unchecked]:bg-input",
        t
      ),
      ...n,
      ref: e,
      children: /* @__PURE__ */ r(
        Fr.Thumb,
        {
          className: m(
            "pr-twp tw:pointer-events-none tw:block tw:h-4 tw:w-4 tw:rounded-full tw:bg-background tw:shadow-lg tw:ring-0 tw:transition-transform",
            {
              "tw:data-[state=checked]:translate-x-4 tw:data-[state=unchecked]:translate-x-0": o === "ltr"
            },
            {
              "tw:data-[state=checked]:translate-x-[-16px] tw:data-[state=unchecked]:translate-x-0": o === "rtl"
            }
          )
        }
      )
    }
  );
}
const ef = It.Root;
function nf({
  className: t,
  ref: e,
  ...n
}) {
  const o = dt();
  return /* @__PURE__ */ r(
    It.List,
    {
      ref: e,
      className: m(
        "pr-twp tw:inline-flex tw:h-9 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:p-1 tw:text-muted-foreground",
        t
      ),
      ...n,
      dir: o
    }
  );
}
function rf({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    It.Trigger,
    {
      ref: e,
      className: m(
        "pr-twp tw:inline-flex tw:items-center tw:justify-center tw:whitespace-nowrap tw:rounded-md tw:px-3 tw:py-1 tw:text-sm tw:font-medium tw:ring-offset-background tw:transition-all tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:data-[state=active]:bg-background tw:data-[state=active]:text-foreground tw:data-[state=active]:shadow",
        t
      ),
      ...n
    }
  );
}
function of({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    It.Content,
    {
      ref: e,
      className: m(
        "pr-twp tw:mt-2 tw:ring-offset-background tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2",
        t
      ),
      ...n
    }
  );
}
function sf({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "textarea",
    {
      className: m(
        "pr-twp tw:flex tw:min-h-[60px] tw:w-full tw:rounded-md tw:border tw:border-input tw:bg-transparent tw:px-3 tw:py-2 tw:text-base tw:shadow-sm tw:placeholder:text-muted-foreground tw:focus-visible:outline-none tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:md:text-sm",
        t
      ),
      ref: e,
      ...n
    }
  );
}
const af = (t, e) => {
  U(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Pd(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const $d = (t, e, n = {}) => {
  const o = q(e);
  o.current = e;
  const i = q(n);
  i.current = Pd(i.current);
  const [s, a] = T(() => o.current), [l, d] = T(!0);
  return U(() => {
    let c = !0;
    return d(!!t), (async () => {
      if (t) {
        const u = await t();
        c && (a(() => u), d(!1));
      }
    })(), () => {
      c = !1, i.current.preserveValue || a(() => o.current);
    };
  }, [t]), [s, l];
}, Vn = () => !1, lf = (t, e) => {
  const [n] = $d(
    K(async () => {
      if (!t) return Vn;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Vn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  U(() => () => {
    n !== Vn && n();
  }, [n]);
};
function cf(t) {
  U(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Ld(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), i = document.createElement("style");
  i.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(i, o) : n.appendChild(i);
}
Ld(`.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
/* By default the editor is too tall for the footnote editor, even while empty, so this makes it
   shorter. */
.footnote-editor .editor-input {
  min-height: 75px;
}

.footnote-editor .typeahead-popover {
  z-index: 300;
}

.footnote-editor .immutable-note-caller {
  display: none;
}

/* Need to be able to override the styles for the editor that happens to have an underscore */
/* stylelint-disable selector-class-pattern */
.footnote-editor .text-spacing .usfm_p {
  text-indent: 0;
}
/*! tailwindcss v4.2.2 | MIT License | https://tailwindcss.com */
@layer properties{@supports (((-webkit-hyphens:none)) and (not (margin-trim:inline))) or ((-moz-orient:inline) and (not (color:rgb(from red r g b)))){*,:before,:after,::backdrop{--tw-rotate-x:initial;--tw-rotate-y:initial;--tw-rotate-z:initial;--tw-skew-x:initial;--tw-skew-y:initial;--tw-border-style:solid;--tw-font-weight:initial;--tw-shadow:0 0 #0000;--tw-shadow-color:initial;--tw-shadow-alpha:100%;--tw-inset-shadow:0 0 #0000;--tw-inset-shadow-color:initial;--tw-inset-shadow-alpha:100%;--tw-ring-color:initial;--tw-ring-shadow:0 0 #0000;--tw-inset-ring-color:initial;--tw-inset-ring-shadow:0 0 #0000;--tw-ring-inset:initial;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-offset-shadow:0 0 #0000;--tw-outline-style:solid;--tw-blur:initial;--tw-brightness:initial;--tw-contrast:initial;--tw-grayscale:initial;--tw-hue-rotate:initial;--tw-invert:initial;--tw-opacity:initial;--tw-saturate:initial;--tw-sepia:initial;--tw-drop-shadow:initial;--tw-drop-shadow-color:initial;--tw-drop-shadow-alpha:100%;--tw-drop-shadow-size:initial;--tw-ease:initial}}}@layer theme{:root,:host{--font-sans:ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";--font-mono:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;--spacing:.25rem;--font-weight-medium:500;--ease-out:cubic-bezier(0, 0, .2, 1);--ease-in-out:cubic-bezier(.4, 0, .2, 1);--default-transition-duration:.15s;--default-transition-timing-function:cubic-bezier(.4, 0, .2, 1);--default-font-family:var(--font-sans);--default-mono-font-family:var(--font-mono)}}@layer base{.pr-twp *,.pr-twp :after,.pr-twp :before,.pr-twp ::backdrop{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp ::file-selector-button{box-sizing:border-box;border:0 solid;margin:0;padding:0}.pr-twp{-webkit-text-size-adjust:100%;tab-size:4;line-height:1.5;font-family:var(--default-font-family,ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji");font-feature-settings:var(--default-font-feature-settings,normal);font-variation-settings:var(--default-font-variation-settings,normal);-webkit-tap-highlight-color:transparent}.pr-twp hr{height:0;color:inherit;border-top-width:1px}.pr-twp abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}.pr-twp h1,.pr-twp h2,.pr-twp h3,.pr-twp h4,.pr-twp h5,.pr-twp h6{font-size:inherit;font-weight:inherit}.pr-twp a{color:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;-webkit-text-decoration:inherit;text-decoration:inherit}.pr-twp b,.pr-twp strong{font-weight:bolder}.pr-twp code,.pr-twp kbd,.pr-twp samp,.pr-twp pre{font-family:var(--default-mono-font-family,ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace);font-feature-settings:var(--default-mono-font-feature-settings,normal);font-variation-settings:var(--default-mono-font-variation-settings,normal);font-size:1em}.pr-twp small{font-size:80%}.pr-twp sub,.pr-twp sup{vertical-align:baseline;font-size:75%;line-height:0;position:relative}.pr-twp sub{bottom:-.25em}.pr-twp sup{top:-.5em}.pr-twp table{text-indent:0;border-color:inherit;border-collapse:collapse}.pr-twp :-moz-focusring{outline:auto}.pr-twp progress{vertical-align:baseline}.pr-twp summary{display:list-item}.pr-twp ol,.pr-twp ul,.pr-twp menu{list-style:none}.pr-twp img,.pr-twp svg,.pr-twp video,.pr-twp canvas,.pr-twp audio,.pr-twp iframe,.pr-twp embed,.pr-twp object{vertical-align:middle;display:block}.pr-twp img,.pr-twp video{max-width:100%;height:auto}.pr-twp button,.pr-twp input,.pr-twp select,.pr-twp optgroup,.pr-twp textarea{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}.pr-twp ::file-selector-button{font:inherit;font-feature-settings:inherit;font-variation-settings:inherit;letter-spacing:inherit;color:inherit;opacity:1;background-color:#0000;border-radius:0}.pr-twp :where(select:is([multiple],[size])) optgroup{font-weight:bolder}.pr-twp :where(select:is([multiple],[size])) optgroup option{padding-inline-start:20px}.pr-twp ::file-selector-button{margin-inline-end:4px}.pr-twp ::placeholder{opacity:1}@supports (not ((-webkit-appearance:-apple-pay-button))) or (contain-intrinsic-size:1px){.pr-twp ::placeholder{color:currentColor}@supports (color:color-mix(in lab, red, red)){.pr-twp ::placeholder{color:color-mix(in oklab, currentcolor 50%, transparent)}}}.pr-twp textarea{resize:vertical}.pr-twp ::-webkit-search-decoration{-webkit-appearance:none}.pr-twp ::-webkit-date-and-time-value{min-height:1lh;text-align:inherit}.pr-twp ::-webkit-datetime-edit{display:inline-flex}.pr-twp ::-webkit-datetime-edit-fields-wrapper{padding:0}.pr-twp ::-webkit-datetime-edit{padding-block:0}.pr-twp ::-webkit-datetime-edit-year-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-month-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-day-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-hour-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-minute-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-second-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-millisecond-field{padding-block:0}.pr-twp ::-webkit-datetime-edit-meridiem-field{padding-block:0}.pr-twp ::-webkit-calendar-picker-indicator{line-height:1}.pr-twp :-moz-ui-invalid{box-shadow:none}.pr-twp button,.pr-twp input:where([type=button],[type=reset],[type=submit]){appearance:button}.pr-twp ::file-selector-button{appearance:button}.pr-twp ::-webkit-inner-spin-button{height:auto}.pr-twp ::-webkit-outer-spin-button{height:auto}.pr-twp [hidden]:where(:not([hidden=until-found])){display:none!important}@font-face{font-family:Inter;font-display:"swap";src:url(https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap)}:root{--background:0 0% 100%;--foreground:222.2 84% 4.9%;--card:0 0% 100%;--card-foreground:222.2 84% 4.9%;--popover:210 20% 98%;--popover-foreground:222.2 84% 4.9%;--primary:222.2 47.4% 11.2%;--primary-foreground:210 40% 98%;--secondary:210 50% 95%;--secondary-foreground:222.2 47.4% 11.2%;--muted:210 50% 95%;--muted-foreground:215.4 16.3% 46.9%;--accent:210 50% 95%;--accent-foreground:222.2 47.4% 11.2%;--destructive:0 84.2% 60.2%;--destructive-foreground:210 40% 98%;--border:214.3 31.8% 91.4%;--input:214.3 31.8% 91.4%;--ring:222.2 84% 4.9%;--sidebar-background:210 20% 98%;--sidebar-foreground:222.2 84% 4.9%;--sidebar-primary:222.2 47.4% 11.2%;--sidebar-primary-foreground:210 40% 98%;--sidebar-accent:210 50% 95%;--sidebar-accent-foreground:222.2 47.4% 11.2%;--sidebar-border:214.3 31.8% 91.4%;--sidebar-ring:222.2 84% 4.9%;--radius:.5rem}.dark{--background:222.2 84% 4.9%;--foreground:210 40% 98%;--card:222.2 84% 4.9%;--card-foreground:210 40% 98%;--popover:222.2 84% 4.9%;--popover-foreground:210 40% 98%;--primary:210 40% 98%;--primary-foreground:222.2 47.4% 11.2%;--secondary:217.2 32.6% 17.5%;--secondary-foreground:210 40% 98%;--muted:217.2 32.6% 17.5%;--muted-foreground:215 20.2% 65.1%;--accent:217.2 32.6% 17.5%;--accent-foreground:210 40% 98%;--destructive:0 62.8% 30.6%;--destructive-foreground:210 40% 98%;--border:215.3 19.3% 34.5%;--input:215.3 19.3% 34.5%;--ring:212.7 26.8% 83.9%;--sidebar-background:222.2 84% 4.9%;--sidebar-foreground:215 20.2% 65.1%;--sidebar-primary:210 40% 98%;--sidebar-primary-foreground:222.2 47.4% 11.2%;--sidebar-accent:217.2 32.6% 17.5%;--sidebar-accent-foreground:215 20.2% 65.1%;--sidebar-border:217.2 32.6% 17.5%;--sidebar-ring:212.7 26.8% 83.9%}.paratext-light{--background:0 0% 97.6471%;--foreground:0 0% 12.549%;--muted:0 0% 93.7255%;--muted-foreground:0 0% 39.2157%;--popover:0 0% 98.8235%;--popover-foreground:0 0% 12.549%;--card:0 0% 98.8235%;--card-foreground:0 0% 12.549%;--border:0 0% 84.7059%;--input:0 0% 84.7059%;--primary:171.429 81.8182% 15.098%;--primary-foreground:0 0% 100%;--secondary:34.0541 100% 85.4902%;--secondary-foreground:16.2712 50.4274% 22.9412%;--accent:0 0% 90.9804%;--accent-foreground:0 0% 12.549%;--destructive:10.1639 77.8723% 53.9216%;--destructive-foreground:0 0% 100%;--ring:16.6667 21.9512% 32.1569%;--sidebar-background:0 0% 98.4314%;--sidebar-foreground:0 0% 14.5098%;--sidebar-primary:0 0% 20.3922%;--sidebar-primary-foreground:0 0% 98.4314%;--sidebar-accent:0 0% 93.7255%;--sidebar-accent-foreground:0 0% 20.3922%;--sidebar-border:0 0% 92.1569%;--sidebar-ring:0 0% 70.9804%}.paratext-dark{--background:0 0% 6.6667%;--foreground:0 0% 93.3333%;--muted:0 0% 13.3333%;--muted-foreground:0 0% 70.5882%;--popover:0 0% 9.8039%;--popover-foreground:0 0% 93.3333%;--card:0 0% 9.8039%;--card-foreground:0 0% 93.3333%;--border:45 14.2857% 10.9804%;--input:0 0% 28.2353%;--primary:40 85.7143% 97.2549%;--primary-foreground:183.158 54.2857% 6.8627%;--secondary:28.2353 17.5258% 19.0196%;--secondary-foreground:29.5082 100% 88.0392%;--accent:0 0% 16.4706%;--accent-foreground:0 0% 93.3333%;--destructive:10.1639 77.8723% 53.9216%;--destructive-foreground:0 0% 100%;--ring:29.5082 100% 88.0392%;--sidebar-background:240 5.8824% 10%;--sidebar-foreground:240 4.7619% 95.8824%;--sidebar-primary:224.278 76.3265% 48.0392%;--sidebar-primary-foreground:0 0% 100%;--sidebar-accent:240 3.7037% 15.8824%;--sidebar-accent-foreground:240 4.7619% 95.8824%;--sidebar-border:240 3.7037% 15.8824%;--sidebar-ring:240 4.878% 83.9216%}.pr-twp,.pr-twp *{border-color:hsl(var(--border));outline-color:hsl(var(--ring) / .5)}body.pr-twp{background-color:hsl(var(--background));color:hsl(var(--foreground))}}@layer components;@layer utilities{.\\@container{container-type:inline-size}.collapse{visibility:collapse}.visible{visibility:visible}.absolute{position:absolute}.fixed{position:fixed}.relative{position:relative}.static{position:static}.sticky{position:sticky}.start{inset-inline-start:var(--spacing)}.end{inset-inline-end:var(--spacing)}.top-0{top:calc(var(--spacing) * 0)}.container{width:100%}@media (min-width:40rem){.container{max-width:40rem}}@media (min-width:48rem){.container{max-width:48rem}}@media (min-width:64rem){.container{max-width:64rem}}@media (min-width:80rem){.container{max-width:80rem}}@media (min-width:96rem){.container{max-width:96rem}}.container{margin-inline:auto;padding-inline:2rem}@media (min-width:40rem){.container{max-width:none}}@media (min-width:1400px){.container{max-width:1400px}}.-mt-4{margin-top:calc(var(--spacing) * -4)}.mt-4{margin-top:calc(var(--spacing) * 4)}.block{display:block}.contents{display:contents}.flex{display:flex}.grid{display:grid}.hidden{display:none}.inline{display:inline}.table{display:table}.size-8{width:calc(var(--spacing) * 8);height:calc(var(--spacing) * 8)}.w-4{width:calc(var(--spacing) * 4)}.w-\\[100px\\]{width:100px}.flex-shrink,.shrink{flex-shrink:1}.flex-grow{flex-grow:1}.border-collapse{border-collapse:collapse}.transform{transform:var(--tw-rotate-x,) var(--tw-rotate-y,) var(--tw-rotate-z,) var(--tw-skew-x,) var(--tw-skew-y,)}.resize{resize:both}.flex-wrap{flex-wrap:wrap}.truncate{text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.overflow-clip{overflow:clip}.rounded{border-radius:.25rem}.border{border-style:var(--tw-border-style);border-width:1px}.font-medium{--tw-font-weight:var(--font-weight-medium);font-weight:var(--font-weight-medium)}.text-wrap{text-wrap:wrap}.\\[color\\:red\\]{color:red}.lowercase{text-transform:lowercase}.uppercase{text-transform:uppercase}.italic{font-style:italic}.line-through{text-decoration-line:line-through}.underline{text-decoration-line:underline}.accent-foreground{accent-color:hsl(var(--foreground))}.ring{--tw-ring-shadow:var(--tw-ring-inset,) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color,currentcolor);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}.ring-input{--tw-ring-color:hsl(var(--input))}.outline{outline-style:var(--tw-outline-style);outline-width:1px}.blur{--tw-blur:blur(8px);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.invert{--tw-invert:invert(100%);filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.filter{filter:var(--tw-blur,) var(--tw-brightness,) var(--tw-contrast,) var(--tw-grayscale,) var(--tw-hue-rotate,) var(--tw-invert,) var(--tw-saturate,) var(--tw-sepia,) var(--tw-drop-shadow,)}.transition{transition-property:color,background-color,border-color,outline-color,text-decoration-color,fill,stroke,--tw-gradient-from,--tw-gradient-via,--tw-gradient-to,opacity,box-shadow,transform,translate,scale,rotate,filter,-webkit-backdrop-filter,backdrop-filter,display,content-visibility,overlay,pointer-events;transition-timing-function:var(--tw-ease,var(--default-transition-timing-function));transition-duration:var(--tw-duration,var(--default-transition-duration))}.ease-in-out{--tw-ease:var(--ease-in-out);transition-timing-function:var(--ease-in-out)}.ease-out{--tw-ease:var(--ease-out);transition-timing-function:var(--ease-out)}.outline-none{--tw-outline-style:none;outline-style:none}.\\[--lexical-indent-base-value\\:40px\\]{--lexical-indent-base-value:40px}.group-\\[\\.toast\\]\\:bg-muted:is(:where(.group).toast *){background-color:hsl(var(--muted))}.group-\\[\\.toast\\]\\:bg-primary:is(:where(.group).toast *){background-color:hsl(var(--primary))}.group-\\[\\.toast\\]\\:text-muted-foreground:is(:where(.group).toast *){color:hsl(var(--muted-foreground))}.group-\\[\\.toast\\]\\:text-primary-foreground:is(:where(.group).toast *){color:hsl(var(--primary-foreground))}.group-\\[\\.toaster\\]\\:border-border:is(:where(.group).toaster *){border-color:hsl(var(--border))}.group-\\[\\.toaster\\]\\:bg-background:is(:where(.group).toaster *){background-color:hsl(var(--background))}.group-\\[\\.toaster\\]\\:text-foreground:is(:where(.group).toaster *){color:hsl(var(--foreground))}.group-\\[\\.toaster\\]\\:shadow-lg:is(:where(.group).toaster *){--tw-shadow:0 10px 15px -3px var(--tw-shadow-color,#0000001a), 0 4px 6px -4px var(--tw-shadow-color,#0000001a);box-shadow:var(--tw-inset-shadow), var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)}}@property --tw-rotate-x{syntax:"*";inherits:false}@property --tw-rotate-y{syntax:"*";inherits:false}@property --tw-rotate-z{syntax:"*";inherits:false}@property --tw-skew-x{syntax:"*";inherits:false}@property --tw-skew-y{syntax:"*";inherits:false}@property --tw-border-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-font-weight{syntax:"*";inherits:false}@property --tw-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-shadow-color{syntax:"*";inherits:false}@property --tw-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-inset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-shadow-color{syntax:"*";inherits:false}@property --tw-inset-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-ring-color{syntax:"*";inherits:false}@property --tw-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-inset-ring-color{syntax:"*";inherits:false}@property --tw-inset-ring-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-ring-inset{syntax:"*";inherits:false}@property --tw-ring-offset-width{syntax:"<length>";inherits:false;initial-value:0}@property --tw-ring-offset-color{syntax:"*";inherits:false;initial-value:#fff}@property --tw-ring-offset-shadow{syntax:"*";inherits:false;initial-value:0 0 #0000}@property --tw-outline-style{syntax:"*";inherits:false;initial-value:solid}@property --tw-blur{syntax:"*";inherits:false}@property --tw-brightness{syntax:"*";inherits:false}@property --tw-contrast{syntax:"*";inherits:false}@property --tw-grayscale{syntax:"*";inherits:false}@property --tw-hue-rotate{syntax:"*";inherits:false}@property --tw-invert{syntax:"*";inherits:false}@property --tw-opacity{syntax:"*";inherits:false}@property --tw-saturate{syntax:"*";inherits:false}@property --tw-sepia{syntax:"*";inherits:false}@property --tw-drop-shadow{syntax:"*";inherits:false}@property --tw-drop-shadow-color{syntax:"*";inherits:false}@property --tw-drop-shadow-alpha{syntax:"<percentage>";inherits:false;initial-value:100%}@property --tw-drop-shadow-size{syntax:"*";inherits:false}@property --tw-ease{syntax:"*";inherits:false}
/**
 * This file was automatically generated on installation of the Shadcn/Lexical editor. The default
 * location of this file has been changed to integrate better with our project structure.
 *
 * Original file location: src/components/editor/themes/editor-theme.css
 *
 * Shadcn/Lexical Editor Documentation: https://shadcn-editor.vercel.app/docs/
 */

/* stylelint-disable selector-class-pattern */
/* Lexical editor theme classes use camelCase naming convention */

.EditorTheme__code {
  background-color: transparent;
  font-family: Menlo, Consolas, Monaco, monospace;
  display: block;
  padding: 8px 8px 8px 52px;
  line-height: 1.53;
  font-size: 13px;
  margin: 0;
  margin-top: 8px;
  margin-bottom: 8px;
  overflow-x: auto;
  border: 1px solid #ccc;
  position: relative;
  border-radius: 8px;
  tab-size: 2;
}

.EditorTheme__code::before {
  content: attr(data-gutter);
  position: absolute;
  background-color: transparent;
  border-right: 1px solid #ccc;
  left: 0;
  top: 0;
  padding: 8px;
  color: #777;
  white-space: pre-wrap;
  text-align: right;
  min-width: 25px;
}

.EditorTheme__table {
  border-collapse: collapse;
  border-spacing: 0;
  overflow-y: scroll;
  overflow-x: scroll;
  table-layout: fixed;
  width: fit-content;
  width: 100%;
  margin: 0 0 30px;
}

.EditorTheme__tokenComment {
  color: slategray;
}

.EditorTheme__tokenPunctuation {
  color: #999;
}

.EditorTheme__tokenProperty {
  color: #905;
}

.EditorTheme__tokenSelector {
  color: #690;
}

.EditorTheme__tokenOperator {
  color: #9a6e3a;
}

.EditorTheme__tokenAttr {
  color: #07a;
}

.EditorTheme__tokenVariable {
  color: #e90;
}

.EditorTheme__tokenFunction {
  color: #dd4a68;
}

.Collapsible__container {
  background-color: var(--background);
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}

.Collapsible__title {
  padding: 0.25rem;
  padding-left: 1rem;
  position: relative;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  list-style-type: disclosure-closed;
  list-style-position: inside;
}

.Collapsible__title p {
  display: inline-flex;
}

.Collapsible__title::marker {
  color: lightgray;
}

.Collapsible__container[open] > .Collapsible__title {
  list-style-type: disclosure-open;
}
`, "after-all");
export {
  Nu as Alert,
  ku as AlertDescription,
  _u as AlertTitle,
  oc as Avatar,
  ic as AvatarFallback,
  yw as AvatarImage,
  ww as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  uw as BOOK_SELECTOR_STRING_KEYS,
  Ue as Badge,
  dw as BookChapterControl,
  Jn as BookSelectionMode,
  fw as BookSelector,
  B as Button,
  mw as COMMENT_EDITOR_STRING_KEYS,
  hw as COMMENT_LIST_STRING_KEYS,
  nc as Card,
  rc as CardContent,
  vw as CardDescription,
  xw as CardFooter,
  gw as CardHeader,
  bw as CardTitle,
  Fa as ChapterRangeSelector,
  bi as Checkbox,
  vu as Checklist,
  Yn as ComboBox,
  se as Command,
  vn as CommandEmpty,
  ne as CommandGroup,
  Ye as CommandInput,
  Ht as CommandItem,
  ae as CommandList,
  pw as CommentEditor,
  _w as CommentList,
  Cu as ContextMenu,
  Pu as ContextMenuCheckboxItem,
  Iu as ContextMenuContent,
  Tu as ContextMenuGroup,
  Au as ContextMenuItem,
  Lu as ContextMenuLabel,
  Su as ContextMenuPortal,
  Du as ContextMenuRadioGroup,
  $u as ContextMenuRadioItem,
  Vu as ContextMenuSeparator,
  ju as ContextMenuShortcut,
  Ru as ContextMenuSub,
  Ou as ContextMenuSubContent,
  Mu as ContextMenuSubTrigger,
  Eu as ContextMenuTrigger,
  _c as DataTable,
  Fu as Drawer,
  Ku as DrawerClose,
  Gu as DrawerContent,
  qu as DrawerDescription,
  Hu as DrawerFooter,
  Uu as DrawerHeader,
  Ad as DrawerOverlay,
  Id as DrawerPortal,
  zu as DrawerTitle,
  Bu as DrawerTrigger,
  ve as DropdownMenu,
  Qt as DropdownMenuCheckboxItem,
  xe as DropdownMenuContent,
  hi as DropdownMenuGroup,
  tr as DropdownMenuItem,
  Ec as DropdownMenuItemType,
  Nn as DropdownMenuLabel,
  sc as DropdownMenuPortal,
  lc as DropdownMenuRadioGroup,
  wc as DropdownMenuRadioItem,
  Je as DropdownMenuSeparator,
  Nw as DropdownMenuShortcut,
  ac as DropdownMenuSub,
  dc as DropdownMenuSubContent,
  cc as DropdownMenuSubTrigger,
  Pe as DropdownMenuTrigger,
  kc as ERROR_DUMP_STRING_KEYS,
  Rw as ERROR_POPOVER_STRING_KEYS,
  Rc as EditorKeyboardShortcuts,
  Cc as ErrorDump,
  Dw as ErrorPopover,
  $w as FOOTNOTE_EDITOR_STRING_KEYS,
  Aw as Filter,
  Mw as FilterDropdown,
  Iw as Footer,
  Pw as FootnoteEditor,
  Uc as FootnoteItem,
  Lw as FootnoteList,
  Uw as INVENTORY_STRING_KEYS,
  Xe as Input,
  Hw as Inventory,
  wt as Label,
  Pc as MARKER_MENU_STRING_KEYS,
  Sw as MarkdownRenderer,
  Lc as MarkerMenu,
  Ow as MoreInfo,
  Sc as MultiSelectComboBox,
  mu as NavigationContentSearch,
  zt as Popover,
  Ia as PopoverAnchor,
  qt as PopoverContent,
  le as PopoverTrigger,
  Wu as Progress,
  Ko as RadioGroup,
  Wn as RadioGroupItem,
  Aa as RecentSearches,
  Xu as ResizableHandle,
  Ju as ResizablePanel,
  Yu as ResizablePanelGroup,
  xu as ResultsCard,
  au as SCOPE_SELECTOR_STRING_KEYS,
  lu as ScopeSelector,
  su as ScriptureResultsViewer,
  cu as ScrollGroupSelector,
  _r as SearchBar,
  Se as Select,
  Me as SelectContent,
  pc as SelectGroup,
  St as SelectItem,
  kw as SelectLabel,
  gc as SelectScrollDownButton,
  hc as SelectScrollUpButton,
  Cw as SelectSeparator,
  De as SelectTrigger,
  Re as SelectValue,
  He as Separator,
  du as SettingsList,
  uu as SettingsListHeader,
  wu as SettingsListItem,
  ld as SettingsSidebar,
  iu as SettingsSidebarContentSearch,
  ed as Sidebar,
  rd as SidebarContent,
  Jw as SidebarFooter,
  ro as SidebarGroup,
  Zw as SidebarGroupAction,
  io as SidebarGroupContent,
  oo as SidebarGroupLabel,
  Yw as SidebarHeader,
  Ww as SidebarInput,
  nd as SidebarInset,
  od as SidebarMenu,
  Qw as SidebarMenuAction,
  tu as SidebarMenuBadge,
  ad as SidebarMenuButton,
  id as SidebarMenuItem,
  eu as SidebarMenuSkeleton,
  nu as SidebarMenuSub,
  ou as SidebarMenuSubButton,
  ru as SidebarMenuSubItem,
  td as SidebarProvider,
  qw as SidebarRail,
  Xw as SidebarSeparator,
  zw as SidebarTrigger,
  er as Skeleton,
  Qu as Slider,
  Zu as Sonner,
  Md as Spinner,
  tf as Switch,
  nr as TabDropdownMenu,
  pu as TabFloatingMenu,
  fu as TabToolbar,
  vr as Table,
  yr as TableBody,
  Tw as TableCaption,
  ke as TableCell,
  Ew as TableFooter,
  pn as TableHead,
  xr as TableHeader,
  Jt as TableRow,
  ef as Tabs,
  of as TabsContent,
  nf as TabsList,
  rf as TabsTrigger,
  yu as TextField,
  sf as Textarea,
  di as ToggleGroup,
  ln as ToggleGroupItem,
  gu as Toolbar,
  Dt as Tooltip,
  Mt as TooltipContent,
  kt as TooltipProvider,
  Lt as TooltipTrigger,
  bu as UiLanguageSelector,
  Ci as VerticalTabs,
  Ti as VerticalTabsContent,
  Ei as VerticalTabsList,
  bd as VerticalTabsTrigger,
  ec as badgeVariants,
  Bo as buttonVariants,
  m as cn,
  Gw as getBookIdFromUSFM,
  _n as getInventoryHeader,
  Bw as getLinesFromUSFM,
  Kw as getNumberFromUSFM,
  Yc as getStatusForItem,
  hu as getToolbarOSReservedSpaceClassName,
  jw as inventoryCountColumn,
  Vw as inventoryItemColumn,
  Fw as inventoryStatusColumn,
  mc as selectTriggerVariants,
  uf as sonner,
  af as useEvent,
  lf as useEventAsync,
  tc as useListbox,
  $d as usePromise,
  cw as useRecentSearches,
  kn as useSidebar,
  cf as useStylesheet
};
//# sourceMappingURL=index.js.map
