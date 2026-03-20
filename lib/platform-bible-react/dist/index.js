var Pa = Object.defineProperty;
var $a = (t, e, n) => e in t ? Pa(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var vt = (t, e, n) => $a(t, typeof e != "symbol" ? e + "" : e, n);
import { jsxs as p, jsx as r, Fragment as at } from "react/jsx-runtime";
import { Command as ke } from "cmdk";
import { X as Pe, Search as po, Check as zt, Clock as Sr, ChevronsLeft as Rr, ChevronsRight as Dr, ChevronLeft as Bn, ChevronRight as Re, ArrowLeft as Va, ArrowRight as La, Circle as ar, ChevronDown as $e, BoldIcon as ja, ItalicIcon as za, AtSign as uo, Pencil as Fa, Trash2 as Ba, ArrowUp as mo, MoreHorizontal as Ka, MailOpen as Ua, Mail as Ga, ChevronUp as ho, FilterIcon as qa, ArrowLeftIcon as Ha, ChevronLeftIcon as Ya, ChevronRightIcon as Xa, ArrowRightIcon as Wa, Copy as fo, Filter as Ja, User as Za, Link as Qa, CircleHelp as ti, ChevronsUpDown as go, Star as ei, Undo as ni, Redo as ri, SquareX as bo, FunctionSquare as vo, SquareSigma as xo, Ban as oi, AlertCircle as Kn, CircleCheckIcon as ai, CircleXIcon as ii, CircleHelpIcon as si, ArrowUpIcon as li, ArrowDownIcon as ci, PanelLeft as wi, PanelRight as di, ScrollText as pi, MenuIcon as ui, Menu as mi, EllipsisVertical as hi, MoreVertical as Mr, LoaderCircle as fi, GripVertical as gi } from "lucide-react";
import { clsx as bi } from "clsx";
import { extendTailwindMerge as vi } from "tailwind-merge";
import * as qt from "@radix-ui/react-dialog";
import { Canon as ct } from "@sillsdev/scripture";
import { includes as rn, Section as Y, getChaptersForBook as xi, formatScrRef as be, getSectionForBook as Be, formatRelativeDate as yi, formatReplacementString as ge, sanitizeHtml as ki, NumberFormat as Ni, formatBytes as _i, getCurrentLocale as Ci, usfmMarkers as wn, getFormatCallerFunction as Ei, deepEqual as Ti, isString as Or, compareScrRefs as Un, scrRefToBBBCCCVVV as Sn, getLocalizeKeyForScrollGroupId as Z } from "platform-bible-utils";
import Q, { forwardRef as Ze, useRef as q, useMemo as z, useState as S, useCallback as B, useLayoutEffect as Rt, createContext as xn, useContext as ir, useEffect as H, Component as Si, createElement as Ir, Suspense as Ri, Fragment as yo } from "react";
import { Slot as Ve } from "@radix-ui/react-slot";
import { cva as ce } from "class-variance-authority";
import * as qe from "@radix-ui/react-popover";
import * as Di from "@radix-ui/react-label";
import * as Gn from "@radix-ui/react-radio-group";
import { createEditor as ko, $getRoot as oe, $createParagraphNode as yn, $getSelection as At, HISTORY_MERGE_TAG as sr, ParagraphNode as No, TextNode as _o, $isTokenOrSegmented as Mi, $getCharacterOffsets as Oi, $cloneWithPropertiesEphemeral as Ii, $findMatchingParent as Co, $isElementNode as ee, $isRangeSelection as xe, CLEAR_EDITOR_COMMAND as Eo, COMMAND_PRIORITY_EDITOR as To, mergeRegister as ae, shallowMergeConfig as Ai, defineExtension as Ft, safeCast as Qe, createState as Pi, FORMAT_TEXT_COMMAND as So, $isNodeSelection as Ro, COMMAND_PRIORITY_LOW as Do, RootNode as $i, LineBreakNode as Vi, TabNode as Li, $isEditorState as ji, createCommand as zi, CLICK_COMMAND as Fi, isDOMNode as Bi, $getNodeFromDOMNode as Ki, $createNodeSelection as Ui, $setSelection as Gi, DecoratorNode as qn, $getState as qi, toggleTextFormatType as Ar, TEXT_TYPE_TO_FORMAT as Hi, $setState as Yi, addClassNamesToElement as Mo, $create as Xi, $getNodeByKey as Wi, removeClassNamesFromElement as Ji, KEY_TAB_COMMAND as Zi, $isBlockElementNode as mn, $createRangeSelection as Qi, $normalizeSelection__EXPERIMENTAL as ts, OUTDENT_CONTENT_COMMAND as es, INDENT_CONTENT_COMMAND as Pr, INSERT_TAB_COMMAND as ns, COMMAND_PRIORITY_CRITICAL as lr, $isDecoratorNode as rs, $isParagraphNode as os, $isTextNode as hn, SELECTION_CHANGE_COMMAND as Oo, getRegisteredNode as as, isHTMLElement as is, isDocumentFragment as $r, isDOMDocumentNode as ss, ArtificialNode__DO_NOT_USE as Io, $createLineBreakNode as Ao, $isRootOrShadowRoot as ls, isBlockDomNode as Vr, isInlineDomNode as Lr, $insertNodes as cs } from "lexical";
import * as He from "@radix-ui/react-tooltip";
import { TooltipTrigger as ws } from "@radix-ui/react-tooltip";
import { HeadingNode as ds, QuoteNode as ps, registerRichText as us } from "@lexical/rich-text";
import { flushSync as ms, createPortal as hs } from "react-dom";
import { $isTableSelection as fs } from "@lexical/table";
import * as Po from "@radix-ui/react-toggle-group";
import "@radix-ui/react-toggle";
import { createHeadlessEditor as $o } from "@lexical/headless";
import * as gs from "@radix-ui/react-separator";
import * as cr from "@radix-ui/react-avatar";
import * as mt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as bs } from "@radix-ui/react-dropdown-menu";
import { useReactTable as Vo, getFilteredRowModel as vs, getSortedRowModel as Lo, getPaginationRowModel as xs, getCoreRowModel as jo, flexRender as Ke, getGroupedRowModel as ys, getExpandedRowModel as ks } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import Ns from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Hn, HIDDEN_NOTE_CALLER as Yn, getDefaultViewOptions as _s, isInsertEmbedOpOfType as on, Editorial as Cs } from "@eten-tech-foundation/platform-editor";
import * as jr from "@radix-ui/react-checkbox";
import * as Pt from "@radix-ui/react-tabs";
import * as jt from "@radix-ui/react-menubar";
import { useHotkeys as Es } from "react-hotkeys-hook";
import * as ht from "@radix-ui/react-context-menu";
import { Drawer as we } from "vaul";
import * as zr from "@radix-ui/react-progress";
import * as wr from "react-resizable-panels";
import { Toaster as Ts } from "sonner";
import { toast as Cu } from "sonner";
import * as an from "@radix-ui/react-slider";
import * as Fr from "@radix-ui/react-switch";
const Ss = vi({ prefix: "tw-" });
function f(...t) {
  return Ss(bi(t));
}
const Le = 250, zo = 300, Rs = 400, Ds = 450, Ms = 500, Os = "layoutDirection";
function wt() {
  const t = localStorage.getItem(Os);
  return t === "rtl" ? t : "ltr";
}
const Is = qt.Root, vd = qt.Trigger, As = qt.Portal, xd = qt.Close;
function Ps({
  className: t,
  style: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    qt.Overlay,
    {
      ref: n,
      className: f(
        // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
        "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
        t
      ),
      style: { zIndex: Ds, ...e },
      ...o
    }
  );
}
function $s({
  className: t,
  children: e,
  overlayClassName: n,
  style: o,
  ref: a,
  ...i
}) {
  const s = wt();
  return /* @__PURE__ */ p(As, { children: [
    /* @__PURE__ */ r(Ps, { className: n }),
    /* @__PURE__ */ p(
      qt.Content,
      {
        ref: a,
        className: f(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: Ms, ...o },
        ...i,
        dir: s,
        children: [
          e,
          /* @__PURE__ */ p(
            qt.Close,
            {
              className: f(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": s === "ltr" },
                { "tw-left-4": s === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Pe, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function Vs({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        t
      ),
      ...e
    }
  );
}
function yd({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f(
        "tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",
        t
      ),
      ...e
    }
  );
}
function Ls({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    qt.Title,
    {
      ref: e,
      className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
      ...n
    }
  );
}
function kd({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    qt.Description,
    {
      ref: e,
      className: f("tw-text-sm tw-text-muted-foreground", t),
      ...n
    }
  );
}
function de({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ke,
    {
      ref: e,
      className: f(
        "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
        t
      ),
      ...n
    }
  );
}
function tn({
  className: t,
  ref: e,
  ...n
}) {
  const o = wt();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(po, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      ke.Input,
      {
        ref: e,
        className: f(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...n
      }
    )
  ] });
}
function pe({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ke.List,
    {
      ref: e,
      className: f("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
      ...n
    }
  );
}
function kn({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ r(ke.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e });
}
function Ht({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ke.Group,
    {
      ref: e,
      className: f(
        "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
        t
      ),
      ...n
    }
  );
}
function Fo({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ke.Separator,
    {
      ref: e,
      className: f("tw--mx-1 tw-h-px tw-bg-border", t),
      ...n
    }
  );
}
function Yt({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ke.Item,
    {
      ref: e,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
        t
      ),
      ...n
    }
  );
}
function js({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
const Bo = (t, e, n, o, a) => {
  switch (t) {
    case Y.OT:
      return e ?? "Old Testament";
    case Y.NT:
      return n ?? "New Testament";
    case Y.DC:
      return o ?? "Deuterocanon";
    case Y.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
}, zs = (t, e, n, o, a) => {
  switch (t) {
    case Y.OT:
      return e ?? "OT";
    case Y.NT:
      return n ?? "NT";
    case Y.DC:
      return o ?? "DC";
    case Y.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${t}`);
  }
};
function Te(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? ct.bookIdToEnglishName(t);
}
function dr(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const Ko = ct.allBookIds.filter(
  (t) => !ct.isObsolete(ct.bookIdToNumber(t))
), ve = Object.fromEntries(
  Ko.map((t) => [t, ct.bookIdToEnglishName(t)])
);
function pr(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = ct.bookIdToEnglishName(t), i = n == null ? void 0 : n.get(t);
  return !!(rn(a.toLowerCase(), o) || rn(t.toLowerCase(), o) || (i ? rn(i.localizedName.toLowerCase(), o) || rn(i.localizedId.toLowerCase(), o) : !1));
}
const Uo = Ze(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: i,
    showCheck: s = !1,
    localizedBookNames: l,
    commandValue: c
  }, w) => {
    const d = q(!1), m = () => {
      d.current || n == null || n(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, h = (v) => {
      d.current = !0, o ? o(v) : n == null || n(t);
    }, u = z(
      () => Te(t, l),
      [t, l]
    ), g = z(
      () => dr(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === Y.OT,
            "tw-border-s-purple-200": a === Y.NT,
            "tw-border-s-indigo-200": a === Y.DC,
            "tw-border-s-amber-200": a === Y.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          Yt,
          {
            ref: w,
            value: c || `${t} ${ct.bookIdToEnglishName(t)}`,
            onSelect: m,
            onMouseDown: h,
            role: "option",
            "aria-selected": e,
            "aria-label": `${ct.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                zt,
                {
                  className: f(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    e ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ),
              /* @__PURE__ */ r("span", { className: "tw-min-w-0 tw-flex-1", children: u }),
              /* @__PURE__ */ r("span", { className: "tw-ms-2 tw-flex-shrink-0 tw-text-xs tw-text-muted-foreground", children: g })
            ]
          }
        )
      }
    );
  }
), Go = ce(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-gap-2 tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 [&_svg]:tw-pointer-events-none [&_svg]:tw-size-4 [&_svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",
        destructive: "tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",
        outline: "tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",
        secondary: "tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
        link: "tw-text-primary tw-underline-offset-4 hover:tw-underline"
      },
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-9 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10"
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
  variant: e,
  size: n,
  asChild: o = !1,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ r(o ? Ve : "button", { className: f(Go({ variant: e, size: n, className: t })), ref: a, ...i });
}
const Xt = qe.Root, ue = qe.Trigger, Fs = qe.Anchor;
function Wt({
  className: t,
  align: e = "center",
  sideOffset: n = 4,
  style: o,
  ref: a,
  ...i
}) {
  const s = wt();
  return /* @__PURE__ */ r(qe.Portal, { children: /* @__PURE__ */ r(
    qe.Content,
    {
      ref: a,
      align: e,
      sideOffset: n,
      className: f(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: Le, ...o },
      ...i,
      dir: s
    }
  ) });
}
function Xn(t, e, n) {
  return `${t} ${ve[t]}${e ? ` ${dr(t, e)} ${Te(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Bs({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (d) => String(d),
  getItemKey: o = (d) => String(d),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: c = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: w = "ghost"
}) {
  const [d, m] = S(!1);
  if (t.length === 0)
    return;
  const h = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ p(Xt, { open: d, onOpenChange: m, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: w,
        size: "icon",
        className: c,
        "aria-label": a,
        children: /* @__PURE__ */ r(Sr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Wt, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(de, { children: /* @__PURE__ */ r(pe, { children: /* @__PURE__ */ r(Ht, { heading: i, children: t.map((u) => /* @__PURE__ */ p(
      Yt,
      {
        onSelect: () => h(u),
        className: f("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Sr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function Nd(t, e, n = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !n(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Rn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ks = [
  Rn.BOOK_ONLY,
  Rn.BOOK_CHAPTER,
  Rn.BOOK_CHAPTER_VERSE
];
function Br(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Lt(t) {
  return xi(ct.bookIdToNumber(t));
}
function Us(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Ks.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, c = void 0, w = void 0] = s.slice(1);
        let d;
        const m = e.filter((h) => pr(h, l, n));
        if (m.length === 1 && ([d] = m), !d && c) {
          if (ct.isBookIdValid(l)) {
            const h = l.toUpperCase();
            e.includes(h) && (d = h);
          }
          if (!d && n) {
            const h = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            h && e.includes(h[0]) && ([d] = h);
          }
        }
        if (!d && c) {
          const u = ((g) => Object.keys(ve).find(
            (v) => ve[v].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, v]) => v.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let h = c ? parseInt(c, 10) : void 0;
          h && h > Lt(d) && (h = Math.max(Lt(d), 1));
          const u = w ? parseInt(w, 10) : void 0;
          return {
            book: d,
            chapterNum: h,
            verseNum: u
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function Gs(t, e, n, o) {
  const a = B(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c > 0) {
        const w = e[c - 1], d = Math.max(Lt(w), 1);
        o({
          book: w,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = B(() => {
    const c = Lt(t.book);
    if (t.chapterNum < c)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w < e.length - 1) {
        const d = e[w + 1];
        o({
          book: d,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), s = B(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum > 1 ? t.verseNum - 1 : 0
    });
  }, [t, o]), l = B(() => {
    o({
      book: t.book,
      chapterNum: t.chapterNum,
      verseNum: t.verseNum + 1
    });
  }, [t, o]);
  return z(() => [
    {
      onClick: a,
      disabled: e.length === 0 || t.chapterNum === 1 && e.indexOf(t.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Rr : Dr
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? Bn : Re
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? Re : Bn
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Lt(t.book) || Lt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Dr : Rr
    }
  ], [
    t,
    e,
    n,
    a,
    s,
    l,
    i
  ]);
}
function Kr({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Ht, { children: /* @__PURE__ */ r("div", { className: f("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Lt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      Yt,
      {
        value: `${t} ${ve[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: o(s),
        className: f(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": t === e.book && s === e.chapterNum
          },
          {
            "tw-bg-muted/50 tw-text-muted-foreground/50": (a == null ? void 0 : a(s)) ?? !1
          }
        ),
        children: s
      },
      s
    )) }) });
}
function _d({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: l,
  id: c
}) {
  const w = wt(), [d, m] = S(!1), [h, u] = S(""), [g, v] = S(""), [b, x] = S("books"), [y, k] = S(void 0), [_, L] = S(!1), j = q(void 0), I = q(void 0), D = q(void 0), C = q(void 0), T = q({}), V = B(
    (R) => {
      e(R), l && l(R);
    },
    [e, l]
  ), P = z(() => o ? o() : Ko, [o]), O = z(() => ({
    [Y.OT]: P.filter((N) => ct.isBookOT(N)),
    [Y.NT]: P.filter((N) => ct.isBookNT(N)),
    [Y.DC]: P.filter((N) => ct.isBookDC(N)),
    [Y.Extra]: P.filter((N) => ct.extraBooks().includes(N))
  }), [P]), A = z(() => Object.values(O).flat(), [O]), X = z(() => {
    if (!g.trim()) return O;
    const R = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return [Y.OT, Y.NT, Y.DC, Y.Extra].forEach(($) => {
      R[$] = O[$].filter((U) => pr(U, g, a));
    }), R;
  }, [O, g, a]), M = z(
    () => Us(g, A, a),
    [g, A, a]
  ), W = B(() => {
    M && (V({
      book: M.book,
      chapterNum: M.chapterNum ?? 1,
      verseNum: M.verseNum ?? 1
    }), m(!1), v(""), u(""));
  }, [V, M]), Ct = B(
    (R) => {
      if (Lt(R) <= 1) {
        V({
          book: R,
          chapterNum: 1,
          verseNum: 1
        }), m(!1), v("");
        return;
      }
      k(R), x("chapters");
    },
    [V]
  ), Dt = B(
    (R) => {
      const N = b === "chapters" ? y : M == null ? void 0 : M.book;
      N && (V({
        book: N,
        chapterNum: R,
        verseNum: 1
      }), m(!1), x("books"), k(void 0), v(""));
    },
    [V, b, y, M]
  ), St = B(
    (R) => {
      V(R), m(!1), v("");
    },
    [V]
  ), pt = Gs(t, A, w, e), lt = B(() => {
    x("books"), k(void 0), setTimeout(() => {
      I.current && I.current.focus();
    }, 0);
  }, []), K = B(
    (R) => {
      if (!R && b === "chapters") {
        lt();
        return;
      }
      m(R), R && (x("books"), k(void 0), v(""));
    },
    [b, lt]
  ), { otLong: nt, ntLong: rt, dcLong: it, extraLong: bt } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, Kt = B(
    (R) => Bo(R, nt, rt, it, bt),
    [nt, rt, it, bt]
  ), $t = B(
    (R) => M ? !!M.chapterNum && !R.toString().includes(M.chapterNum.toString()) : !1,
    [M]
  ), Ut = z(
    () => be(
      t,
      a ? Te(t.book, a) : "English"
    ),
    [t, a]
  ), _e = B((R) => (N) => {
    T.current[R] = N;
  }, []), Zt = B((R) => {
    (R.key === "Home" || R.key === "End") && R.stopPropagation();
  }, []), Gt = B(
    (R) => {
      if (R.ctrlKey) return;
      const { isLetter: N, isDigit: $ } = Br(R.key);
      if (b === "chapters") {
        if (R.key === "Backspace") {
          R.preventDefault(), R.stopPropagation(), lt();
          return;
        }
        if (N || $) {
          if (R.preventDefault(), R.stopPropagation(), x("books"), k(void 0), $ && y) {
            const U = ve[y];
            v(`${U} ${R.key}`);
          } else
            v(R.key);
          setTimeout(() => {
            I.current && I.current.focus();
          }, 0);
          return;
        }
      }
      if ((b === "chapters" || b === "books" && M) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(R.key)) {
        const U = b === "chapters" ? y : M == null ? void 0 : M.book;
        if (!U) return;
        const G = (() => {
          if (!h) return 1;
          const st = h.match(/(\d+)$/);
          return st ? parseInt(st[1], 10) : 0;
        })(), ot = Lt(U);
        if (!ot) return;
        let tt = G;
        const ft = 6;
        switch (R.key) {
          case "ArrowLeft":
            G !== 0 && (tt = G > 1 ? G - 1 : ot);
            break;
          case "ArrowRight":
            G !== 0 && (tt = G < ot ? G + 1 : 1);
            break;
          case "ArrowUp":
            tt = G === 0 ? ot : Math.max(1, G - ft);
            break;
          case "ArrowDown":
            tt = G === 0 ? 1 : Math.min(ot, G + ft);
            break;
          default:
            return;
        }
        tt !== G && (R.preventDefault(), R.stopPropagation(), u(Xn(U, a, tt)), setTimeout(() => {
          const st = T.current[tt];
          st && st.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      b,
      M,
      lt,
      y,
      h,
      a
    ]
  ), je = B((R) => {
    if (R.shiftKey || R.key === "Tab" || R.key === " ") return;
    const { isLetter: N, isDigit: $ } = Br(R.key);
    (N || $) && (R.preventDefault(), v((U) => U + R.key), I.current.focus(), L(!1));
  }, []);
  return Rt(() => {
    const R = setTimeout(() => {
      if (d && b === "books" && D.current && C.current) {
        const N = D.current, $ = C.current, U = $.offsetTop, G = N.clientHeight, ot = $.clientHeight, tt = U - G / 2 + ot / 2;
        N.scrollTo({
          top: Math.max(0, tt),
          behavior: "smooth"
        }), u(Xn(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(R);
    };
  }, [d, b, g, M, t.book]), Rt(() => {
    if (b === "chapters" && y) {
      const R = y === t.book;
      setTimeout(() => {
        if (D.current)
          if (R) {
            const N = T.current[t.chapterNum];
            N && N.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            D.current.scrollTo({ top: 0 });
        j.current && j.current.focus();
      }, 0);
    }
  }, [b, y, M, t.book, t.chapterNum]), /* @__PURE__ */ p(Xt, { open: d, onOpenChange: K, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: f(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: Ut })
      }
    ) }),
    /* @__PURE__ */ r(Wt, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      de,
      {
        ref: j,
        onKeyDown: Gt,
        loop: !0,
        value: h,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          b === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                tn,
                {
                  ref: I,
                  value: g,
                  onValueChange: v,
                  onKeyDown: Zt,
                  onFocus: () => L(!1),
                  className: s && s.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ r(
                Bs,
                {
                  recentSearches: s,
                  onSearchItemSelect: St,
                  renderItem: (R) => be(R, "English"),
                  getItemKey: (R) => `${R.book}-${R.chapterNum}-${R.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: pt.map(({ onClick: R, disabled: N, title: $, icon: U }) => /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  L(!0), R();
                },
                disabled: N,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: $,
                onKeyDown: je,
                children: /* @__PURE__ */ r(U, {})
              },
              $
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: lt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ r(Va, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(La, { className: "tw-h-4 tw-w-4" })
              }
            ),
            y && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Te(y, a) })
          ] }),
          !_ && /* @__PURE__ */ p(pe, { ref: D, children: [
            b === "books" && /* @__PURE__ */ p(at, { children: [
              !M && Object.entries(X).map(([R, N]) => {
                if (N.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Ht, { heading: Kt(R), children: N.map(($) => /* @__PURE__ */ r(
                      Uo,
                      {
                        bookId: $,
                        onSelect: (U) => Ct(U),
                        section: Be($),
                        commandValue: `${$} ${ve[$]}`,
                        ref: $ === t.book ? C : void 0,
                        localizedBookNames: a
                      },
                      $
                    )) }, R)
                  );
              }),
              M && /* @__PURE__ */ r(Ht, { children: /* @__PURE__ */ r(
                Yt,
                {
                  value: `${M.book} ${ve[M.book]} ${M.chapterNum || ""}:${M.verseNum || ""})}`,
                  onSelect: W,
                  className: "tw-font-semibold tw-text-primary",
                  children: be(
                    {
                      book: M.book,
                      chapterNum: M.chapterNum ?? 1,
                      verseNum: M.verseNum ?? 1
                    },
                    a ? dr(M.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              M && Lt(M.book) > 1 && /* @__PURE__ */ p(at, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Te(M.book, a) }),
                /* @__PURE__ */ r(
                  Kr,
                  {
                    bookId: M.book,
                    scrRef: t,
                    onChapterSelect: Dt,
                    setChapterRef: _e,
                    isChapterDimmed: $t,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            b === "chapters" && y && /* @__PURE__ */ r(
              Kr,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: Dt,
                setChapterRef: _e,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Cd = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), qs = ce(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
);
function ut({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Di.Root,
    {
      ref: e,
      className: f("pr-twp", qs(), t),
      ...n
    }
  );
}
function qo({
  className: t,
  ref: e,
  ...n
}) {
  const o = wt();
  return /* @__PURE__ */ r(
    Gn.Root,
    {
      className: f("pr-twp tw-grid tw-gap-2", t),
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
    Gn.Item,
    {
      ref: e,
      className: f(
        "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r(Gn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ar, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
    }
  );
}
function Hs(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Jn({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: c = Hs,
  getButtonLabel: w,
  icon: d = void 0,
  buttonPlaceholder: m = "",
  textPlaceholder: h = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: v = "start",
  isDisabled: b = !1,
  ariaLabel: x,
  ...y
}) {
  const [k, _] = S(!1), L = w ?? c, j = (D) => D.length > 0 && typeof D[0] == "object" && "options" in D[0], I = (D, C) => {
    const T = c(D), V = typeof D == "object" && "secondaryLabel" in D ? D.secondaryLabel : void 0, P = `${C ?? ""}${T}${V ?? ""}`;
    return /* @__PURE__ */ p(
      Yt,
      {
        value: T,
        onSelect: () => {
          l(D), _(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            zt,
            {
              className: f("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || c(s) !== T
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            T,
            V && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              V
            ] })
          ] })
        ]
      },
      P
    );
  };
  return /* @__PURE__ */ p(Xt, { open: k, onOpenChange: _, ...y, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": k,
        "aria-label": x,
        id: t,
        className: f(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            d && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: d }),
            /* @__PURE__ */ r(
              "span",
              {
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? L(s) : m
              }
            )
          ] }),
          /* @__PURE__ */ r($e, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Wt,
      {
        align: v,
        className: f("tw-w-[200px] tw-p-0", a),
        style: i,
        children: /* @__PURE__ */ p(de, { children: [
          /* @__PURE__ */ r(tn, { placeholder: h, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(kn, { children: u }),
          /* @__PURE__ */ r(pe, { children: j(e) ? e.map((D) => /* @__PURE__ */ r(Ht, { heading: D.groupHeading, children: D.options.map((C) => I(C, D.groupHeading)) }, D.groupHeading)) : e.map((D) => I(D)) })
        ] })
      }
    )
  ] });
}
function Ys({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = z(
    () => Array.from({ length: i }, (w, d) => d + 1),
    [i]
  );
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ r(ut, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      Jn,
      {
        isDisabled: a,
        onChange: (w) => {
          n(w), w > e && o(w);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (w) => w.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(ut, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      Jn,
      {
        isDisabled: a,
        onChange: (w) => {
          o(w), w < t && n(w);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (w) => w.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Zn = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(Zn || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(Zn || (Zn = {}));
const Ed = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Dn = (t, e) => t[e] ?? e;
function Td({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: w
}) {
  const d = Dn(w, "%webView_bookSelector_currentBook%"), m = Dn(w, "%webView_bookSelector_choose%"), h = Dn(w, "%webView_bookSelector_chooseBooks%"), [u, g] = S(
    "current book"
    /* CurrentBook */
  ), v = (b) => {
    g(b), t(b);
  };
  return /* @__PURE__ */ r(
    qo,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (b) => v(b),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Wn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(ut, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(ut, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Ys,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: s,
              chapterCount: a,
              startChapter: l,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Wn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(ut, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(ut, { className: "tw-flex tw-items-center", children: o.map((b) => ct.bookIdToEnglishName(b)).join(", ") }),
          /* @__PURE__ */ r(
            F,
            {
              disabled: u === "current book",
              onClick: () => n(),
              children: m
            }
          )
        ] })
      ] })
    }
  );
}
const Ho = xn(null);
function Xs(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function Bt() {
  const t = ir(Ho);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of n) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const Yo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Ws = Yo ? Rt : H, sn = { tag: sr };
function Js({ initialConfig: t, children: e }) {
  const n = z(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: c } = t, w = Xs(null, o), d = ko({ editable: t.editable, html: c, namespace: a, nodes: i, onError: (m) => s(m, d), theme: o });
    return function(m, h) {
      if (h !== null) {
        if (h === void 0) m.update(() => {
          const u = oe();
          if (u.isEmpty()) {
            const g = yn();
            u.append(g);
            const v = Yo ? document.activeElement : null;
            (At() !== null || v !== null && v === m.getRootElement()) && g.select();
          }
        }, sn);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const u = m.parseEditorState(h);
            m.setEditorState(u, sn);
            break;
          }
          case "object":
            m.setEditorState(h, sn);
            break;
          case "function":
            m.update(() => {
              oe().isEmpty() && h(m);
            }, sn);
        }
      }
    }(d, l), [d, w];
  }, []);
  return Ws(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(Ho.Provider, { value: n, children: e });
}
const Zs = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : H;
function Qs({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = Bt();
  return Zs(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: c }) => {
      e && i.size === 0 && s.size === 0 || t && c.has(sr) || l.isEmpty() || n(a, o, c);
    });
  }, [o, t, e, n]), null;
}
const ur = {
  ltr: "tw-text-left",
  rtl: "tw-text-right",
  heading: {
    h1: "tw-scroll-m-20 tw-text-4xl tw-font-extrabold tw-tracking-tight lg:tw-text-5xl",
    h2: "tw-scroll-m-20 tw-border-b tw-pb-2 tw-text-3xl tw-font-semibold tw-tracking-tight first:tw-mt-0",
    h3: "tw-scroll-m-20 tw-text-2xl tw-font-semibold tw-tracking-tight",
    h4: "tw-scroll-m-20 tw-text-xl tw-font-semibold tw-tracking-tight",
    h5: "tw-scroll-m-20 tw-text-lg tw-font-semibold tw-tracking-tight",
    h6: "tw-scroll-m-20 tw-text-base tw-font-semibold tw-tracking-tight"
  },
  paragraph: "tw-outline-none",
  quote: "tw-mt-6 tw-border-l-2 tw-pl-6 tw-italic",
  link: "tw-text-blue-600 hover:tw-underline hover:tw-cursor-pointer",
  list: {
    checklist: "tw-relative",
    listitem: "tw-mx-8",
    listitemChecked: 'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none tw-line-through before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded before:tw-bg-primary before:tw-bg-no-repeat after:tw-content-[""] after:tw-cursor-pointer after:tw-border-white after:tw-border-solid after:tw-absolute after:tw-block after:tw-top-[6px] after:tw-w-[3px] after:tw-left-[7px] after:tw-right-[7px] after:tw-h-[6px] after:tw-rotate-45 after:tw-border-r-2 after:tw-border-b-2 after:tw-border-l-0 after:tw-border-t-0',
    listitemUnchecked: 'tw-relative tw-mx-2 tw-px-6 tw-list-none tw-outline-none before:tw-content-[""] before:tw-w-4 before:tw-h-4 before:tw-top-0.5 before:tw-left-0 before:tw-cursor-pointer before:tw-block before:tw-bg-cover before:tw-absolute before:tw-border before:tw-border-primary before:tw-rounded',
    nested: {
      listitem: "tw-list-none before:tw-hidden after:tw-hidden"
    },
    ol: "tw-m-0 tw-p-0 tw-list-decimal [&>li]:tw-mt-2",
    olDepth: [
      "tw-list-outside !tw-list-decimal",
      "tw-list-outside !tw-list-[upper-roman]",
      "tw-list-outside !tw-list-[lower-roman]",
      "tw-list-outside !tw-list-[upper-alpha]",
      "tw-list-outside !tw-list-[lower-alpha]"
    ],
    ul: "tw-m-0 tw-p-0 tw-list-outside [&>li]:tw-mt-2",
    ulDepth: [
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc",
      "tw-list-outside !tw-list-disc"
    ]
  },
  hashtag: "tw-text-blue-600 tw-bg-blue-100 tw-rounded-md tw-px-1",
  text: {
    bold: "tw-font-bold",
    code: "tw-bg-gray-100 tw-p-1 tw-rounded-md",
    italic: "tw-italic",
    strikethrough: "tw-line-through",
    subscript: "tw-sub",
    superscript: "tw-sup",
    underline: "tw-underline",
    underlineStrikethrough: "tw-underline tw-line-through"
  },
  image: "tw-relative tw-inline-block tw-user-select-none tw-cursor-default editor-image",
  inlineImage: "tw-relative tw-inline-block tw-user-select-none tw-cursor-default inline-editor-image",
  keyword: "tw-text-purple-900 tw-font-bold",
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
  characterLimit: "!tw-bg-destructive/50",
  table: "EditorTheme__table tw-w-fit tw-overflow-scroll tw-border-collapse",
  tableCell: "EditorTheme__tableCell tw-w-24 tw-relative tw-border tw-px-4 tw-py-2 tw-text-left [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",
  tableCellActionButton: "EditorTheme__tableCellActionButton tw-bg-background tw-block tw-border-0 tw-rounded-2xl tw-w-5 tw-h-5 tw-text-foreground tw-cursor-pointer",
  tableCellActionButtonContainer: "EditorTheme__tableCellActionButtonContainer tw-block tw-right-1 tw-top-1.5 tw-absolute tw-z-10 tw-w-5 tw-h-5",
  tableCellEditing: "EditorTheme__tableCellEditing tw-rounded-sm tw-shadow-sm",
  tableCellHeader: "EditorTheme__tableCellHeader tw-bg-muted tw-border tw-px-4 tw-py-2 tw-text-left tw-font-bold [&[align=center]]:tw-text-center [&[align=right]]:tw-text-right",
  tableCellPrimarySelected: "EditorTheme__tableCellPrimarySelected tw-border tw-border-primary tw-border-solid tw-block tw-h-[calc(100%-2px)] tw-w-[calc(100%-2px)] tw-absolute tw--left-[1px] tw--top-[1px] tw-z-10 ",
  tableCellResizer: "EditorTheme__tableCellResizer tw-absolute tw--right-1 tw-h-full tw-w-2 tw-cursor-ew-resize tw-z-10 tw-top-0",
  tableCellSelected: "EditorTheme__tableCellSelected tw-bg-muted",
  tableCellSortedIndicator: "EditorTheme__tableCellSortedIndicator tw-block tw-opacity-50 tw-absolute tw-bottom-0 tw-left-0 tw-w-full tw-h-1 tw-bg-muted",
  tableResizeRuler: "EditorTheme__tableCellResizeRuler tw-block tw-absolute tw-w-[1px] tw-h-full tw-bg-primary tw-top-0",
  tableRowStriping: "EditorTheme__tableRowStriping tw-m-0 tw-border-t tw-p-0 even:tw-bg-muted",
  tableSelected: "EditorTheme__tableSelected tw-ring-2 tw-ring-primary tw-ring-offset-2",
  tableSelection: "EditorTheme__tableSelection tw-bg-transparent",
  layoutItem: "tw-border tw-border-dashed tw-px-4 tw-py-2",
  layoutContainer: "tw-grid tw-gap-2.5 tw-my-2.5 tw-mx-0",
  autocomplete: "tw-text-muted-foreground",
  blockCursor: "",
  embedBlock: {
    base: "tw-user-select-none",
    focus: "tw-ring-2 tw-ring-primary tw-ring-offset-2"
  },
  hr: 'tw-p-0.5 tw-border-none tw-my-1 tw-mx-0 tw-cursor-pointer after:tw-content-[""] after:tw-block after:tw-h-0.5 after:tw-bg-muted selected:tw-ring-2 selected:tw-ring-primary selected:tw-ring-offset-2 selected:tw-user-select-none',
  indent: "[--lexical-indent-base-value:40px]",
  mark: "",
  markOverlap: ""
}, kt = He.Provider, Nt = He.Root;
function Tt({
  className: t,
  variant: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    He.Trigger,
    {
      ref: n,
      className: e ? f(Go({ variant: e }), t) : t,
      ...o
    }
  );
}
function _t({
  className: t,
  sideOffset: e = 4,
  style: n,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ r(He.Portal, { children: /* @__PURE__ */ r(
    He.Content,
    {
      ref: o,
      sideOffset: e,
      style: { zIndex: Le, ...n },
      className: f(
        "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a
    }
  ) });
}
const mr = [
  ds,
  No,
  _o,
  ps
], tl = xn(null), Mn = {
  didCatch: !1,
  error: null
};
class el extends Si {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Mn;
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
      for (var n, o, a = arguments.length, i = new Array(a), s = 0; s < a; s++)
        i[s] = arguments[s];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: i,
        reason: "imperative-api"
      }), this.setState(Mn);
    }
  }
  componentDidCatch(e, n) {
    var o, a;
    (o = (a = this.props).onError) === null || o === void 0 || o.call(a, e, n);
  }
  componentDidUpdate(e, n) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: a
    } = this.props;
    if (o && n.error !== null && nl(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Mn);
    }
  }
  render() {
    const {
      children: e,
      fallbackRender: n,
      FallbackComponent: o,
      fallback: a
    } = this.props, {
      didCatch: i,
      error: s
    } = this.state;
    let l = e;
    if (i) {
      const c = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(c);
      else if (o)
        l = Ir(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Ir(tl.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function nl() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function rl({ children: t, onError: e }) {
  return r(el, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const ol = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : H;
function al(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function il() {
  return function(t) {
    const [e] = Bt(), n = z(() => t(e), [e, t]), [o, a] = S(() => n.initialValueFn()), i = q(o);
    return ol(() => {
      const { initialValueFn: s, subscribe: l } = n, c = s();
      return i.current !== c && (i.current = c, a(c)), l((w) => {
        i.current = w, a(w);
      });
    }, [n, t]), o;
  }(al);
}
function sl(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Mi(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), c = i.getNode(), w = e.is(l), d = e.is(c);
    if (w || d) {
      const [m, h] = Oi(t), u = l.is(c), g = e.is(s ? c : l), v = e.is(s ? l : c);
      let b, x = 0;
      u ? (x = m > h ? h : m, b = m > h ? m : h) : g ? (x = s ? h : m, b = void 0) : v && (x = 0, b = s ? m : h);
      const y = e.__text.slice(x, b);
      y !== e.__text && (n === "clone" && (e = Ii(e)), e.__text = y);
    }
  }
  return e;
}
function ll(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Xo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, cl = Xo && "documentMode" in document ? document.documentMode : null;
!(!Xo || !("InputEvent" in window) || cl) && "getTargetRanges" in new window.InputEvent("input");
function wl(t) {
  const e = Co(t, (n) => ee(n) && !n.isInline());
  return ee(e) || ll(4, t.__key), e;
}
function dl(t) {
  const e = At();
  if (!xe(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (n.has(s)) continue;
    const l = Co(i, (w) => ee(w) && !w.isInline());
    if (l === null) continue;
    const c = l.getKey();
    l.canIndent() && !n.has(c) && (n.add(c), t(l));
  }
  return n.size > 0;
}
const pl = Symbol.for("preact-signals");
function Nn() {
  if (ne > 1) return void ne--;
  let t, e = !1;
  for (; Ue !== void 0; ) {
    let n = Ue;
    for (Ue = void 0, Qn++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && Wo(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (Qn = 0, ne--, e) throw t;
}
function ul(t) {
  if (ne > 0) return t();
  ne++;
  try {
    return t();
  } finally {
    Nn();
  }
}
let J, Ue;
function Ur(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let ne = 0, Qn = 0, dn = 0;
function Gr(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function xt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function Ye(t, e) {
  return new xt(t, e);
}
function Wo(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function qr(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function Jo(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function he(t, e) {
  xt.call(this, void 0), this.x = t, this.s = void 0, this.g = dn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function ml(t, e) {
  return new he(t, e);
}
function Zo(t) {
  const e = t.u;
  if (t.u = void 0, typeof e == "function") {
    ne++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, hr(t), o;
    } finally {
      J = n, Nn();
    }
  }
}
function hr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, Zo(t);
}
function hl(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  Jo(this), J = t, this.f &= -2, 8 & this.f && hr(this), Nn();
}
function Ee(t, e) {
  this.x = t, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function ie(t, e) {
  const n = new Ee(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function _n(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], i = Ye(a === void 0 ? t[o] : a);
    n[o] = i;
  }
  return n;
}
xt.prototype.brand = pl, xt.prototype.h = function() {
  return !0;
}, xt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : Ur(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, xt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && Ur(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, xt.prototype.subscribe = function(t) {
  return ie(() => {
    const e = this.value, n = J;
    J = void 0;
    try {
      t(e);
    } finally {
      J = n;
    }
  }, { name: "sub" });
}, xt.prototype.valueOf = function() {
  return this.value;
}, xt.prototype.toString = function() {
  return this.value + "";
}, xt.prototype.toJSON = function() {
  return this.value;
}, xt.prototype.peek = function() {
  const t = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = t;
  }
}, Object.defineProperty(xt.prototype, "value", { get() {
  const t = Gr(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (Qn > 100) throw new Error("Cycle detected");
    this.v = t, this.i++, dn++, ne++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      Nn();
    }
  }
} }), he.prototype = new xt(), he.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === dn)) return !0;
  if (this.g = dn, this.f |= 1, this.i > 0 && !Wo(this)) return this.f &= -2, !0;
  const t = J;
  try {
    qr(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, Jo(this), this.f &= -2, !0;
}, he.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  xt.prototype.S.call(this, t);
}, he.prototype.U = function(t) {
  if (this.t !== void 0 && (xt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, he.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(he.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = Gr(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ee.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.u = e);
  } finally {
    t();
  }
}, Ee.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Zo(this), qr(this), ne++;
  const t = J;
  return J = this, hl.bind(this, t);
}, Ee.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Ue, Ue = this);
}, Ee.prototype.d = function() {
  this.f |= 8, 1 & this.f || hr(this);
}, Ee.prototype.dispose = function() {
  this.d();
};
Ft({ build: (t, e, n) => _n(e), config: Qe({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return ie(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Qo() {
  const t = oe(), e = At(), n = yn();
  t.clear(), t.append(n), e !== null && n.select(), xe(e) && (e.format = 0);
}
function ta(t, e = Qo) {
  return t.registerCommand(Eo, (n) => (t.update(e), !0), To);
}
Ft({ build: (t, e, n) => _n(e), config: Qe({ $onClear: Qo }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return ie(() => ta(t, o.value));
} });
function fl(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const On = Pi("format", { parse: (t) => typeof t == "number" ? t : 0 });
class ea extends qn {
  $config() {
    return this.config("decorator-text", { extends: qn, stateConfigs: [{ flat: !0, stateConfig: On }] });
  }
  getFormat() {
    return qi(this, On);
  }
  getFormatFlags(e, n) {
    return Ar(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = Hi[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return Yi(this, On, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = Ar(n, e, null);
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
function gl(t) {
  return t instanceof ea;
}
Ft({ name: "@lexical/extension/DecoratorText", nodes: () => [ea], register: (t, e, n) => t.registerCommand(So, (o) => {
  const a = At();
  if (Ro(a) || xe(a)) for (const i of a.getNodes()) gl(i) && i.toggleFormat(o);
  return !1;
}, Do) });
function na(t, e) {
  let n;
  return Ye(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const tr = Ft({ build: (t) => na(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function et(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function ra(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = ra(n[a], o[a]);
    return t;
  }
  return e;
}
const fr = 0, er = 1, oa = 2, In = 3, ln = 4, Ce = 5, An = 6, ze = 7;
function Pn(t) {
  return t.id === fr;
}
function aa(t) {
  return t.id === oa;
}
function bl(t) {
  return function(e) {
    return e.id === er;
  }(t) || et(305, String(t.id), String(er)), Object.assign(t, { id: oa });
}
const vl = /* @__PURE__ */ new Set();
class xl {
  constructor(e, n) {
    vt(this, "builder");
    vt(this, "configs");
    vt(this, "_dependency");
    vt(this, "_peerNameSet");
    vt(this, "extension");
    vt(this, "state");
    vt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: fr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Ai;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    aa(n) || et(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, c, w) {
      return Object.assign(l, { config: c, id: In, registerState: w });
    }(n, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: ln, initResult: c, registerState: w });
    }(i, s, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== ln && et(307, String(n.id), String(Ce)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Ce, output: s, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Ce && et(308, String(o.id), String(Ce));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: An });
    }(o), () => {
      const i = this.state;
      i.id !== ze && et(309, String(o.id), String(ze)), this.state = function(s) {
        return Object.assign(s, { id: Ce });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== An && et(310, String(n.id), String(An)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: ze });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && et(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && et(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= ln;
    }(e) || et(313, String(e.id), String(ln)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= In;
    }(e) || et(314, String(e.id), String(In)), { config: e.config };
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
      return n.id >= ze;
    }(e) || et(316, String(e.id), String(ze)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || vl;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= Ce;
      })(e) || et(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const Hr = { tag: sr };
function yl() {
  const t = oe();
  t.isEmpty() && t.append(yn());
}
const kl = Ft({ config: Qe({ setOptions: Hr, updateOptions: Hr }), init: ({ $initialEditorState: t = yl }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (ji(i)) t.setEditorState(i, n);
    else if (typeof i == "function") t.update(() => {
      i(t);
    }, e);
    else if (i && (typeof i == "string" || typeof i == "object")) {
      const s = t.parseEditorState(i);
      t.setEditorState(s, n);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [$i, _o, Vi, Li, No] }), Yr = Symbol.for("@lexical/extension/LexicalBuilder");
function Xr() {
}
function Nl(t) {
  throw t;
}
function cn(t) {
  return Array.isArray(t) ? t : [t];
}
const $n = "0.41.0+prod.esm";
class Ge {
  constructor(e) {
    vt(this, "roots");
    vt(this, "extensionNameMap");
    vt(this, "outgoingConfigEdges");
    vt(this, "incomingEdges");
    vt(this, "conflicts");
    vt(this, "_sortedExtensionReps");
    vt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = $n, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [cn(kl)];
    for (const o of e) n.push(cn(o));
    return new Ge(n);
  }
  static maybeFromEditor(e) {
    const n = e[Yr];
    return n && (n.PACKAGE_VERSION !== $n && et(292, n.PACKAGE_VERSION, $n), n instanceof Ge || et(293)), n;
  }
  static fromEditor(e) {
    const n = Ge.maybeFromEditor(e);
    return n === void 0 && et(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(ko({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [Yr]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = Xr;
    function n() {
      try {
        e();
      } finally {
        e = Xr;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = ae(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const n = this.extensionNameMap.get(e.name);
    if (n) return n.extension !== e && et(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const i = this.incomingEdges.get(n);
    i ? i.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && et(296);
    const n = cn(e), [o] = n;
    typeof o.name != "string" && et(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && et(298, o.name), !a) {
      a = new xl(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && et(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && et(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = cn(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let i = o.state;
      if (aa(i)) return;
      const s = o.extension.name;
      var l;
      Pn(i) || et(300, s, a || "[unknown]"), Pn(l = i) || et(304, String(l.id), String(fr)), i = Object.assign(l, { id: er }), o.state = i;
      const c = this.outgoingConfigEdges.get(s);
      if (c) for (const w of c.keys()) {
        const d = this.extensionNameMap.get(w);
        d && n(d, s);
      }
      i = bl(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Pn(o.state) && n(o);
    for (const o of e) for (const [a, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(a);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && et(301, o.name);
      for (const s of a) i.configs.add(s);
    }
    return this._sortedExtensionReps = e, this._sortedExtensionReps;
  }
  registerEditor(e) {
    const n = this.sortedExtensionReps(), o = new AbortController(), a = [() => o.abort()], i = o.signal;
    for (const s of n) {
      const l = s.register(e, i);
      l && a.push(l);
    }
    for (const s of n) {
      const l = s.afterRegistration(e);
      l && a.push(l);
    }
    return ae(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: m } = d;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const h of fl(m)) {
        if (typeof h != "function") {
          const u = o.get(h.replace);
          u && et(302, m.name, h.replace.name, u.extension.name), o.set(h.replace, d);
        }
        n.add(h);
      }
      if (m.html) {
        if (m.html.export) for (const [h, u] of m.html.export.entries()) a.set(h, u);
        m.html.import && Object.assign(i, m.html.import);
      }
      m.theme && ra(s, m.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), n.size && (e.nodes = [...n]);
    const c = Object.keys(i).length > 0, w = a.size > 0;
    (c || w) && (e.html = {}, c && (e.html.import = i), w && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = Nl), e;
  }
}
const _l = /* @__PURE__ */ new Set(), Wr = Ft({ build(t, e, n) {
  const o = n.getDependency(tr).output, a = Ye({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = na(() => {
  }, () => ie(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (At()) for (const [d, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(d);
          continue;
        }
        const h = Wi(d), u = h && h.isSelected() || !1;
        w = w || u !== (!!s && s.has(d)), u && (c = c || /* @__PURE__ */ new Set(), c.add(d));
      }
    }), !w && c && s && c.size === s.size || (i.value = c);
  }));
  return { watchNodeKey: function(s) {
    const l = ml(() => (i.value || _l).has(s)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(s);
    const d = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), d || (c.set(s, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [tr], name: "@lexical/extension/NodeSelection" });
zi("INSERT_HORIZONTAL_RULE_COMMAND");
class De extends qn {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new De(e.__key);
  }
  static importJSON(e) {
    return ia().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Cl, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Mo(n, e.theme.hr), n;
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
function Cl() {
  return { node: ia() };
}
function ia() {
  return Xi(De);
}
function El(t) {
  return t instanceof De;
}
Ft({ dependencies: [tr, Wr], name: "@lexical/extension/HorizontalRule", nodes: () => [De], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(Wr).output, a = Ye({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return ae(t.registerCommand(Fi, (s) => {
    if (Bi(s.target)) {
      const l = Ki(s.target);
      if (El(l)) return function(c, w = !1) {
        const d = At(), m = c.isSelected(), h = c.getKey();
        let u;
        w && Ro(d) ? u = d : (u = Ui(), Gi(u)), m ? u.delete(h) : u.add(h);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Do), t.registerMutationListener(De, (s, l) => {
    ul(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [d, m] of s.entries()) if (m === "destroyed") w.delete(d), c = !0;
      else {
        const h = w.get(d), u = t.getElementByKey(d);
        h ? h.domNode.value = u : (c = !0, w.set(d, { domNode: Ye(u), selectedSignal: o(d) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), ie(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) s.push(ie(() => {
      const w = l.value;
      w && (c.value ? Mo(w, i) : Ji(w, i));
    }));
    return ae(...s);
  }));
} });
function sa(t) {
  return t.canBeEmpty();
}
function Tl(t, e, n = sa) {
  return ae(t.registerCommand(Zi, (o) => {
    const a = At();
    if (!xe(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((h) => mn(h) && h.canIndent()).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, d = w.getNode(), m = wl(d);
      if (m.canIndent()) {
        const h = m.getKey();
        let u = Qi();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = ts(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? es : Pr : ns;
    return t.dispatchCommand(i, void 0);
  }, To), t.registerCommand(Pr, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = At();
    if (!xe(a)) return !1;
    const i = typeof n == "function" ? n : n.peek();
    return dl((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, lr));
}
Ft({ build: (t, e, n) => _n(e), config: Qe({ $canIndent: sa, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: i } = n.getOutput();
  return ie(() => {
    if (!o.value) return Tl(t, a, i);
  });
} });
const Sl = Ft({ name: "@lexical/react/ReactProvider" });
function Rl() {
  return oe().getTextContent();
}
function Dl(t, e = !0) {
  if (t) return !1;
  let n = Rl();
  return e && (n = n.trim()), n === "";
}
function Ml(t) {
  if (!Dl(t, !1)) return !1;
  const e = oe().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (rs(a)) return !1;
    if (ee(a)) {
      if (!os(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const c = i[o];
        if (!hn(c)) return !1;
      }
    }
  }
  return !0;
}
function la(t) {
  return () => Ml(t);
}
function ca(t) {
  const e = window.location.origin, n = (o) => {
    if (o.origin !== e) return;
    const a = t.getRootElement();
    if (document.activeElement !== a) return;
    const i = o.data;
    if (typeof i == "string") {
      let s;
      try {
        s = JSON.parse(i);
      } catch {
        return;
      }
      if (s && s.protocol === "nuanria_messaging" && s.type === "request") {
        const l = s.payload;
        if (l && l.functionId === "makeChanges") {
          const c = l.args;
          if (c) {
            const [w, d, m, h, u] = c;
            t.update(() => {
              const g = At();
              if (xe(g)) {
                const v = g.anchor;
                let b = v.getNode(), x = 0, y = 0;
                if (hn(b) && w >= 0 && d >= 0 && (x = w, y = w + d, g.setTextNodeRange(b, x, b, y)), x === y && m === "" || (g.insertRawText(m), b = v.getNode()), hn(b)) {
                  x = h, y = h + u;
                  const k = b.getTextContentSize();
                  x = x > k ? k : x, y = y > k ? k : y, g.setTextNodeRange(b, x, b, y);
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
Ft({ build: (t, e, n) => _n(e), config: Qe({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => ie(() => n.getOutput().disabled.value ? void 0 : ca(t)) });
function Ol(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const gr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : H;
function Il({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = S(() => n.getDecorators());
    return gr(() => n.registerDecoratorListener((s) => {
      ms(() => {
        i(s);
      });
    }), [n]), H(() => {
      i(n.getDecorators());
    }, [n]), z(() => {
      const s = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], d = r(o, { onError: (h) => n._onError(h), children: r(Ri, { fallback: null, children: a[w] }) }), m = n.getElementByKey(w);
        m !== null && s.push(hs(d, m, w));
      }
      return s;
    }, [o, a, n]);
  }(t, e);
}
function Al({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Ge.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Sl.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Ol(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(Il, { editor: t, ErrorBoundary: e });
}
function Jr(t) {
  return t.getEditorState().read(la(t.isComposing()));
}
function Pl({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = Bt();
  return function(a) {
    gr(() => ae(us(a), ca(a)), [a]);
  }(o), p(at, { children: [t, r($l, { content: e }), r(Al, { editor: o, ErrorBoundary: n })] });
}
function $l({ content: t }) {
  const [e] = Bt(), n = function(a) {
    const [i, s] = S(() => Jr(a));
    return gr(() => {
      function l() {
        const c = Jr(a);
        s(c);
      }
      return l(), ae(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = il();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Vl({ defaultSelection: t }) {
  const [e] = Bt();
  return H(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Ll = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : H;
function jl({ onClear: t }) {
  const [e] = Bt();
  return Ll(() => ta(e, t), [e, t]), null;
}
const wa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Rt : H;
function zl({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: d, ariaOwns: m, ariaRequired: h, autoCapitalize: u, className: g, id: v, role: b = "textbox", spellCheck: x = !0, style: y, tabIndex: k, "data-testid": _, ...L }, j) {
  const [I, D] = S(t.isEditable()), C = B((V) => {
    V && V.ownerDocument && V.ownerDocument.defaultView ? t.setRootElement(V) : t.setRootElement(null);
  }, [t]), T = z(() => /* @__PURE__ */ function(...V) {
    return (P) => {
      for (const O of V) typeof O == "function" ? O(P) : O != null && (O.current = P);
    };
  }(j, C), [C, j]);
  return wa(() => (D(t.isEditable()), t.registerEditableListener((V) => {
    D(V);
  })), [t]), r("div", { "aria-activedescendant": I ? e : void 0, "aria-autocomplete": I ? n : "none", "aria-controls": I ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": I && b === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": d, "aria-owns": I ? m : void 0, "aria-readonly": !I || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: I, "data-testid": _, id: v, ref: T, role: b, spellCheck: x, style: y, tabIndex: k, ...L });
}
const Fl = Ze(zl);
function Zr(t) {
  return t.getEditorState().read(la(t.isComposing()));
}
const Bl = Ze(Kl);
function Kl(t, e) {
  const { placeholder: n, ...o } = t, [a] = Bt();
  return p(at, { children: [r(Fl, { editor: a, ...o, ref: e }), n != null && r(Ul, { editor: a, content: n })] });
}
function Ul({ content: t, editor: e }) {
  const n = function(s) {
    const [l, c] = S(() => Zr(s));
    return wa(() => {
      function w() {
        const d = Zr(s);
        c(d);
      }
      return w(), ae(s.registerUpdateListener(() => {
        w();
      }), s.registerEditableListener(() => {
        w();
      }));
    }, [s]), l;
  }(e), [o, a] = S(e.isEditable());
  if (Rt(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !n) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : r("div", { "aria-hidden": !0, children: i });
}
function Gl({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Bl,
    {
      className: e ?? "ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none",
      "aria-placeholder": t,
      placeholder: /* @__PURE__ */ r(
        "div",
        {
          className: n ?? "tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",
          children: t
        }
      )
    }
  );
}
const da = xn(void 0);
function ql({
  activeEditor: t,
  $updateToolbar: e,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: i
}) {
  const s = z(
    () => ({
      activeEditor: t,
      $updateToolbar: e,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [t, e, n, o, a]
  );
  return /* @__PURE__ */ r(da.Provider, { value: s, children: i });
}
function pa() {
  const t = ir(da);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function Hl() {
  const [t, e] = S(void 0), n = B(() => {
    e(void 0);
  }, []), o = z(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r(Is, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p($s, { children: [
      /* @__PURE__ */ r(Vs, { children: /* @__PURE__ */ r(Ls, { children: i }) }),
      s
    ] }) });
  }, [t, n]), a = B(
    (i, s, l = !1) => {
      e({
        closeOnClickOutside: l,
        content: s(n),
        title: i
      });
    },
    [n]
  );
  return [o, a];
}
function Yl({
  children: t
}) {
  const [e] = Bt(), [n, o] = S(e), [a, i] = S("paragraph"), [s, l] = Hl(), c = () => {
  };
  return H(() => n.registerCommand(
    Oo,
    (w, d) => (o(d), !1),
    lr
  ), [n]), /* @__PURE__ */ p(
    ql,
    {
      activeEditor: n,
      $updateToolbar: c,
      blockType: a,
      setBlockType: i,
      showModal: l,
      children: [
        s,
        t({ blockType: a })
      ]
    }
  );
}
function Xl(t) {
  const [e] = Bt(), { activeEditor: n } = pa();
  H(() => n.registerCommand(
    Oo,
    () => {
      const o = At();
      return o && t(o), !1;
    },
    lr
  ), [e, t]), H(() => {
    n.getEditorState().read(() => {
      const o = At();
      o && t(o);
    });
  }, [n, t]);
}
const Wl = ce(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-transparent",
        outline: "tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"
      },
      size: {
        default: "tw-h-10 tw-px-3",
        sm: "tw-h-9 tw-px-2.5",
        lg: "tw-h-11 tw-px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ua = Q.createContext({
  size: "default",
  variant: "default"
});
function ma({
  className: t,
  variant: e,
  size: n,
  children: o,
  ref: a,
  ...i
}) {
  const s = wt();
  return /* @__PURE__ */ r(
    Po.Root,
    {
      ref: a,
      className: f("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...i,
      dir: s,
      children: /* @__PURE__ */ r(
        ua.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
}
function pn({
  className: t,
  children: e,
  variant: n,
  size: o,
  ref: a,
  ...i
}) {
  const s = Q.useContext(ua);
  return /* @__PURE__ */ r(
    Po.Item,
    {
      ref: a,
      className: f(
        Wl({
          variant: s.variant || n,
          size: s.size || o
        }),
        t
      ),
      ...i,
      children: e
    }
  );
}
const Qr = [
  { format: "bold", icon: ja, label: "Bold" },
  { format: "italic", icon: za, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function Jl() {
  const { activeEditor: t } = pa(), [e, n] = S([]), o = B((a) => {
    if (xe(a) || fs(a)) {
      const i = [];
      Qr.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return Xl(o), /* @__PURE__ */ r(
    ma,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: Qr.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
        pn,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(So, a);
          },
          children: /* @__PURE__ */ r(i, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function Zl({ onClear: t }) {
  const [e] = Bt();
  H(() => {
    t && t(() => {
      e.dispatchCommand(Eo, void 0);
    });
  }, [e, t]);
}
function Ql({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = S(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(Yl, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(Jl, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Pl,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ r(Gl, { placeholder: t }) }),
          ErrorBoundary: rl
        }
      ),
      e && /* @__PURE__ */ r(Vl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(Zl, { onClear: n }),
      /* @__PURE__ */ r(jl, {})
    ] })
  ] });
}
const tc = {
  namespace: "commentEditor",
  theme: ur,
  nodes: mr,
  onError: (t) => {
    console.error(t);
  }
};
function fn({
  editorState: t,
  editorSerializedState: e,
  onChange: n,
  onSerializedChange: o,
  placeholder: a = "Start typing…",
  autoFocus: i = !1,
  onClear: s,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          Js,
          {
            initialConfig: {
              ...tc,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(kt, { children: [
              /* @__PURE__ */ r(Ql, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                Qs,
                {
                  ignoreSelectionChange: !0,
                  onChange: (c) => {
                    n == null || n(c), o == null || o(c.toJSON());
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
function ec(t, e) {
  const n = ss(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of n) if (!fa.has(i.nodeName)) {
    const s = ga(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof Io && s.insertAfter(Ao());
    for (const s of i) {
      const l = s.getChildren();
      for (const c of l) s.insertBefore(c);
      s.remove();
    }
  }(a), o;
}
function nc(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = oe().getChildren();
  for (let a = 0; a < o.length; a++)
    ha(t, o[a], n, e);
  return n.innerHTML;
}
function ha(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const i = ee(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && hn(e) && (s = sl(o, e, "clone"));
  const l = ee(s) ? s.getChildren() : [], c = as(t, s.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(t, s) : s.exportDOM(t);
  const { element: d, after: m } = w;
  if (!d) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], v = ha(t, g, h, o);
    !a && ee(e) && v && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((is(d) || $r(d)) && d.append(h), n.append(d), m) {
      const u = m.call(s, d);
      u && ($r(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else n.append(h);
  return a;
}
const fa = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function ga(t, e, n, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (fa.has(t.nodeName)) return s;
  let l = null;
  const c = function(g, v) {
    const { nodeName: b } = g, x = v._htmlConversions.get(b.toLowerCase());
    let y = null;
    if (x !== void 0) for (const k of x) {
      const _ = k(g);
      _ !== null && (y === null || (y.priority || 0) <= (_.priority || 0)) && (y = _);
    }
    return y !== null ? y.conversion : null;
  }(t, e), w = c ? c(t) : null;
  let d = null;
  if (w !== null) {
    d = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, v] of a) if (l = v(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(t.nodeName, w.forChild);
  }
  const m = t.childNodes;
  let h = [];
  const u = (l == null || !ls(l)) && (l != null && mn(l) || o);
  for (let g = 0; g < m.length; g++) h.push(...ga(m[g], e, n, u, new Map(a), l));
  return d != null && (h = d(h)), Vr(t) && (h = rc(t, h, u ? () => {
    const g = new Io();
    return n.push(g), g;
  } : yn)), l == null ? h.length > 0 ? s = s.concat(h) : Vr(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Lr(g.nextSibling) && Lr(g.previousSibling);
  }(t) && (s = s.concat(Ao())) : ee(l) && l.append(...h), s;
}
function rc(t, e, n) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (mn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && mn(e[s + 1])) {
      const c = n();
      c.setFormat(o), c.append(...i), a.push(c), i = [];
    }
  }
  return a;
}
function ba(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function va(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : va(e.children)
  ) : !1;
}
function It(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? va(t.root.children) : !1;
}
function oc(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = $o({
    namespace: "EditorUtils",
    theme: ur,
    nodes: mr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = ec(e, a);
      oe().clear(), cs(i);
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
function gn(t) {
  const e = $o({
    namespace: "EditorUtils",
    theme: ur,
    nodes: mr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = nc(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function br(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
function un(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function vr(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const ac = {
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
function Vn(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function Sd({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, i] = S(ac), [s, l] = S(void 0), [c, w] = S(!1), d = q(void 0), m = q(null);
  H(() => {
    let x = !0;
    const y = m.current;
    if (!y) return;
    const k = setTimeout(() => {
      x && ba(y);
    }, 300);
    return () => {
      x = !1, clearTimeout(k);
    };
  }, []);
  const h = B(() => {
    if (!It(a)) return;
    const x = gn(a);
    e(x, s);
  }, [a, e, s]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", v = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", b = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: b }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
          /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Pe, {}) }) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: v }) })
        ] }) }),
        /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
          /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(
            F,
            {
              onClick: h,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !It(a),
              children: /* @__PURE__ */ r(zt, {})
            }
          ) }),
          /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(Xt, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(uo, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Vn(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Wt,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (x) => {
            x.key === "Escape" && (x.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(de, { children: /* @__PURE__ */ r(pe, { children: t.map((x) => /* @__PURE__ */ r(
            Yt,
            {
              onSelect: () => {
                l(x === "" ? void 0 : x), w(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Vn(x, o) })
            },
            x || "unassigned"
          )) }) })
        }
      )
    ] }) }),
    /* @__PURE__ */ r(
      "div",
      {
        ref: m,
        role: "textbox",
        tabIndex: -1,
        className: "tw-outline-none",
        onKeyDownCapture: (x) => {
          x.key === "Escape" ? (x.preventDefault(), x.stopPropagation(), n()) : vr(x) && (x.preventDefault(), x.stopPropagation(), It(a) && h());
        },
        onKeyDown: (x) => {
          br(x), (x.key === "Enter" || x.key === " ") && x.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          fn,
          {
            editorSerializedState: a,
            onSerializedChange: (x) => i(x),
            placeholder: u,
            onClear: (x) => {
              d.current = x;
            }
          }
        )
      }
    )
  ] });
}
const Rd = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), Dd = [
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
], ic = ["input", "select", "textarea", "button"], sc = ["button", "textbox"], lc = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = q(null), [i, s] = S(void 0), [l, c] = S(void 0), w = B(
    (u) => {
      s(u);
      const g = t.find((b) => b.id === u);
      g && (e == null || e(g));
      const v = document.getElementById(u);
      v && (v.scrollIntoView({ block: "center" }), v.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = B(
    (u) => {
      const g = t.find((v) => v.id === u);
      g && (c((v) => v === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || ic.includes(g)) return !0;
    const v = u.getAttribute("role");
    if (v && sc.includes(v)) return !0;
    const b = u.getAttribute("tabindex");
    return b !== void 0 && b !== "-1";
  }, h = B(
    (u) => {
      var I;
      const g = u.target, v = (D) => D ? document.getElementById(D) : void 0, b = v(l), x = v(i);
      if (!!(b && g && b.contains(g) && g !== b) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const D = t.find((C) => C.id === l);
            D && w(D.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!b) return;
          const D = Array.from(
            b.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (D.length === 0) return;
          const C = D.findIndex((V) => V === g);
          if (C === -1) return;
          let T;
          u.key === "ArrowDown" ? T = Math.min(C + 1, D.length - 1) : T = Math.max(C - 1, 0), T !== C && (u.preventDefault(), u.stopPropagation(), (I = D[T]) == null || I.focus());
          return;
        }
        return;
      }
      const _ = t.findIndex((D) => D.id === i);
      let L = _;
      switch (u.key) {
        case "ArrowDown":
          L = Math.min(_ + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          L = Math.max(_ - 1, 0), u.preventDefault();
          break;
        case "Home":
          L = 0, u.preventDefault();
          break;
        case "End":
          L = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          i && d(i), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const D = x;
          if (D) {
            const C = D.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), T = D.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), V = C ?? T;
            if (V) {
              u.preventDefault(), V.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const j = t[L];
      j && w(j.id);
    },
    [t, w, i, l, d, o]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: w
  };
}, cc = ce(
  "pr-twp tw-inline-flex tw-items-center tw-rounded-full tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",
  {
    variants: {
      variant: {
        default: "tw-border tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",
        secondary: "tw-border tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        muted: "tw-border tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",
        destructive: "tw-border tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",
        outline: "tw-border tw-text-foreground",
        blueIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-blue-400 tw-px-0",
        mutedIndicator: "tw-w-[5px] tw-h-[5px] tw-bg-zinc-400 tw-px-0",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground tw-text-mu"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Xe({
  className: t,
  variant: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r("div", { ref: n, className: f("pr-twp", cc({ variant: e }), t), ...o });
}
function wc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      className: f(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...n
    }
  );
}
function Md({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      className: f("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...n
    }
  );
}
function Od({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "h3",
    {
      ref: e,
      className: f(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...n,
      children: n.children
    }
  );
}
function Id({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "p",
    {
      ref: e,
      className: f("pr-twp tw-text-sm tw-text-muted-foreground", t),
      ...n
    }
  );
}
function dc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r("div", { ref: e, className: f("pr-twp tw-p-6 tw-pt-0", t), ...n });
}
function Ad({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      className: f("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...n
    }
  );
}
function We({
  className: t,
  orientation: e = "horizontal",
  decorative: n = !0,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ r(
    gs.Root,
    {
      ref: o,
      decorative: n,
      orientation: e,
      className: f(
        "pr-twp tw-shrink-0 tw-bg-border",
        e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
        t
      ),
      ...a
    }
  );
}
function pc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    cr.Root,
    {
      ref: e,
      className: f(
        "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
        t
      ),
      ...n
    }
  );
}
function Pd({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    cr.Image,
    {
      ref: e,
      className: f("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
      ...n
    }
  );
}
function uc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    cr.Fallback,
    {
      ref: e,
      className: f(
        "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
        t
      ),
      ...n
    }
  );
}
const xr = xn(void 0);
function Jt() {
  const t = ir(xr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const Ne = ce("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), ye = mt.Trigger, xa = mt.Group, mc = mt.Portal, hc = mt.Sub, fc = mt.RadioGroup;
function se({ variant: t = "default", ...e }) {
  const n = Q.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(xr.Provider, { value: n, children: /* @__PURE__ */ r(mt.Root, { ...e }) });
}
function gc({
  className: t,
  inset: e,
  children: n,
  ref: o,
  ...a
}) {
  const i = Jt();
  return /* @__PURE__ */ p(
    mt.SubTrigger,
    {
      ref: o,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        Ne({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(Re, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
}
function bc({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  const a = wt();
  return /* @__PURE__ */ r(
    mt.SubContent,
    {
      ref: n,
      className: f(
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: a, children: e })
    }
  );
}
function le({
  className: t,
  sideOffset: e = 4,
  children: n,
  ref: o,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ r(mt.Portal, { children: /* @__PURE__ */ r(
    mt.Content,
    {
      ref: o,
      sideOffset: e,
      className: f(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...a,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
}
function nr({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  const a = wt(), i = Jt();
  return /* @__PURE__ */ r(
    mt.Item,
    {
      ref: n,
      className: f(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        Ne({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      dir: a
    }
  );
}
function re({
  className: t,
  children: e,
  checked: n,
  ref: o,
  ...a
}) {
  const i = wt(), s = Jt();
  return /* @__PURE__ */ p(
    mt.CheckboxItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Ne({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...a,
      dir: i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(mt.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
}
function vc({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  const a = wt(), i = Jt();
  return /* @__PURE__ */ p(
    mt.RadioItem,
    {
      ref: n,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        Ne({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(mt.ItemIndicator, { children: /* @__PURE__ */ r(ar, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
}
function Cn({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    mt.Label,
    {
      ref: n,
      className: f("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
      ...o
    }
  );
}
function en({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    mt.Separator,
    {
      ref: e,
      className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
      ...n
    }
  );
}
function $d({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
function to({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [c, w] = S(!1), [d, m] = S(), h = q(null);
  H(() => {
    if (!c) return;
    let _ = !0;
    const L = h.current;
    if (!L) return;
    const j = setTimeout(() => {
      _ && ba(L);
    }, 300);
    return () => {
      _ = !1, clearTimeout(j);
    };
  }, [c]);
  const u = B(
    (_) => {
      _ && _.stopPropagation(), w(!1), m(void 0), s == null || s(!1);
    },
    [s]
  ), g = B(
    async (_) => {
      if (_ && _.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        gn(d)
      ) && (w(!1), m(void 0), s == null || s(!1));
    },
    [d, a, t.id, s]
  ), v = z(() => {
    const _ = new Date(t.date), L = yi(
      _,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), j = _.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return ge(n["%comment_dateAtTime%"], {
      date: L,
      time: j
    });
  }, [t.date, n]), b = z(() => t.user, [t.user]), x = z(
    () => t.user.split(" ").map((_) => _[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = z(() => ki(t.contents), [t.contents]), k = z(() => {
    if (o && l)
      return /* @__PURE__ */ p(at, { children: [
        /* @__PURE__ */ p(
          nr,
          {
            onClick: (_) => {
              _.stopPropagation(), w(!0), m(oc(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ r(Fa, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          nr,
          {
            onClick: async (_) => {
              _.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ r(Ba, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
    i,
    s
  ]);
  return /* @__PURE__ */ p(
    "div",
    {
      className: f("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(pc, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(uc, { className: "tw-text-xs tw-font-medium", children: x }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: b }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: v }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Xe, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              un(t.assignedUser, n)
            ] })
          ] }),
          c && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: h,
              onKeyDownCapture: (_) => {
                _.key === "Escape" ? (_.preventDefault(), _.stopPropagation(), u()) : vr(_) && (_.preventDefault(), _.stopPropagation(), It(d) && g());
              },
              onKeyDown: (_) => {
                br(_), (_.key === "Enter" || _.key === " ") && _.stopPropagation();
              },
              onClick: (_) => {
                _.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  fn,
                  {
                    className: f(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: d,
                    onSerializedChange: (_) => m(_)
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Pe, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !It(d),
                      children: /* @__PURE__ */ r(mo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ p(at, { children: [
            t.status === "Resolved" && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
            /* @__PURE__ */ r(
              "div",
              {
                className: f(
                  "tw-prose tw-items-start tw-gap-2 tw-break-words tw-text-sm tw-font-normal tw-text-foreground",
                  // tw-prose has a max width defined on it, that we choose to override
                  "tw-max-w-none",
                  // Don't render blockquote on the first child. All comments are wrapped in blockquote
                  // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                  // But we don't want it to look like there's a blockquote there. Apply styles to the
                  // blockquote directly inside this div.
                  "[&>blockquote]:tw-border-s-0 [&>blockquote]:tw-p-0 [&>blockquote]:tw-ps-0 [&>blockquote]:tw-font-normal [&>blockquote]:tw-not-italic [&>blockquote]:tw-text-foreground",
                  // Don't render quotes on blockquotes
                  "tw-prose-quoteless",
                  {
                    "tw-line-clamp-3": !o
                  }
                ),
                dangerouslySetInnerHTML: { __html: y }
              }
            )
          ] })
        ] }),
        k && /* @__PURE__ */ p(se, { children: [
          /* @__PURE__ */ r(ye, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Ka, {}) }) }),
          /* @__PURE__ */ r(le, { align: "end", children: k })
        ] })
      ]
    }
  );
}
const eo = {
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
function xc({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: c,
  thread: w,
  threadStatus: d,
  handleAddCommentToThread: m,
  handleUpdateComment: h,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: v,
  canUserAddCommentToThread: b,
  canUserAssignThreadCallback: x,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: k,
  isRead: _ = !1,
  autoReadDelay: L = 5,
  onVerseRefClick: j
}) {
  const [I, D] = S(eo), [C, T] = S(
    void 0
  ), V = o, [P, O] = S(!1), [A, X] = S(!1), [M, W] = S(!1), [Ct, Dt] = S(!1), [St, pt] = S(!1), [lt, K] = S(_), [nt, rt] = S(!1), it = q(void 0), [bt, Kt] = S(/* @__PURE__ */ new Map());
  H(() => {
    let E = !0;
    return (async () => {
      const dt = y ? await y(c) : !1;
      E && pt(dt);
    })(), () => {
      E = !1;
    };
  }, [c, y]), H(() => {
    let E = !0;
    if (!o) {
      Dt(!1), Kt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const dt = x ? await x(c) : !1;
      E && Dt(dt);
    })(), () => {
      E = !1;
    };
  }, [o, c, x]);
  const $t = z(() => e.filter((E) => !E.deleted), [e]);
  H(() => {
    let E = !0;
    if (!o || !k) {
      Kt(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const dt = /* @__PURE__ */ new Map();
      await Promise.all(
        $t.map(async (Tr) => {
          const Aa = await k(Tr.id);
          E && dt.set(Tr.id, Aa);
        })
      ), E && Kt(dt);
    })(), () => {
      E = !1;
    };
  }, [o, $t, k]);
  const Ut = z(() => $t[0], [$t]), _e = q(null), Zt = q(void 0), Gt = B(() => {
    var E;
    (E = Zt.current) == null || E.call(Zt), D(eo);
  }, []), je = B(() => {
    const E = !lt;
    K(E), rt(!E), g == null || g(c, E);
  }, [lt, g, c]);
  H(() => {
    O(!1);
  }, [o]), H(() => {
    if (o && !lt && !nt) {
      const E = setTimeout(() => {
        K(!0), g == null || g(c, !0);
      }, L * 1e3);
      return it.current = E, () => clearTimeout(E);
    }
    it.current && (clearTimeout(it.current), it.current = void 0);
  }, [o, lt, nt, L, c, g]);
  const R = z(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), N = z(() => {
    if (i === void 0)
      return;
    if (i === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const E = un(i, n);
    return ge(n["%comment_assigned_to%"], {
      assignedUser: E
    });
  }, [i, n]), $ = z(() => $t.slice(1), [$t]), U = z(() => $.length ?? 0, [$.length]), G = z(() => U > 0, [U]), ot = z(() => P || U <= 2 ? $ : $.slice(-2), [$, U, P]), tt = z(() => P || U <= 2 ? 0 : U - 2, [U, P]), ft = z(
    () => U === 1 ? R.singleReply : ge(R.multipleReplies, { count: U }),
    [U, R]
  ), st = z(
    () => tt === 1 ? R.singleReply : ge(R.multipleReplies, { count: tt }),
    [tt, R]
  );
  H(() => {
    !o && A && G && X(!1);
  }, [o, A, G]);
  const Et = B(
    async (E) => {
      E && E.stopPropagation();
      const gt = It(I) ? gn(I) : void 0;
      if (C !== void 0) {
        await m({
          threadId: c,
          contents: gt,
          assignedUser: C
        }) && (T(void 0), gt && Gt());
        return;
      }
      gt && await m({ threadId: c, contents: gt }) && Gt();
    },
    [
      Gt,
      I,
      m,
      C,
      c
    ]
  ), Mt = B(
    async (E) => {
      const gt = It(I) ? gn(I) : void 0, dt = await m({
        ...E,
        contents: gt,
        assignedUser: C ?? E.assignedUser
      });
      return dt && gt && Gt(), dt && C !== void 0 && T(void 0), dt;
    },
    [Gt, I, m, C]
  );
  return /* @__PURE__ */ r(
    wc,
    {
      role: "option",
      "aria-selected": o,
      id: c,
      className: f(
        "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !o },
        {
          "tw-bg-primary-foreground": !o && d !== "Resolved" && lt,
          "tw-bg-background": o && d !== "Resolved" && lt,
          "tw-bg-muted": d === "Resolved",
          "tw-bg-accent": !lt && !o && d !== "Resolved"
        }
      ),
      onClick: () => {
        l(c);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ p(dc, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            N && /* @__PURE__ */ r(Xe, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: N }),
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "icon",
                onClick: (E) => {
                  E.stopPropagation(), je();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": lt ? "Mark as unread" : "Mark as read",
                children: lt ? /* @__PURE__ */ r(Ua, {}) : /* @__PURE__ */ r(Ga, {})
              }
            ),
            St && d !== "Resolved" && /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "icon",
                className: f(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (E) => {
                  E.stopPropagation(), Mt({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
            "p",
            {
              ref: _e,
              className: f(
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": V
                },
                { "tw-whitespace-nowrap": !V }
              ),
              children: [
                a && j ? /* @__PURE__ */ r(
                  F,
                  {
                    variant: "ghost",
                    size: "sm",
                    className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                    onClick: (E) => {
                      E.stopPropagation(), j(w);
                    },
                    children: a
                  }
                ) : a,
                /* @__PURE__ */ p("span", { className: t, children: [
                  Ut.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw-font-bold", children: Ut.selectedText }),
                  Ut.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ r(
            to,
            {
              comment: Ut,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: d,
              handleAddCommentToThread: Mt,
              handleUpdateComment: h,
              handleDeleteComment: u,
              onEditingChange: X,
              canEditOrDelete: (!A && bt.get(Ut.id)) ?? !1,
              canUserResolveThread: St
            }
          )
        ] }),
        /* @__PURE__ */ p(at, { children: [
          G && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(We, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: ft })
          ] }),
          !o && It(I) && /* @__PURE__ */ r(
            fn,
            {
              editorSerializedState: I,
              onSerializedChange: (E) => D(E),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ p(at, { children: [
            tt > 0 && /* @__PURE__ */ p(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (E) => {
                  E.stopPropagation(), O(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (E) => {
                  (E.key === "Enter" || E.key === " ") && (E.preventDefault(), E.stopPropagation(), O(!0));
                },
                children: [
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(We, {}) }),
                  /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: st }),
                    P ? /* @__PURE__ */ r(ho, {}) : /* @__PURE__ */ r($e, {})
                  ] })
                ]
              }
            ),
            ot.map((E) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              to,
              {
                comment: E,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: h,
                handleDeleteComment: u,
                onEditingChange: X,
                canEditOrDelete: (!A && bt.get(E.id)) ?? !1
              }
            ) }, E.id)),
            b !== !1 && (!A || It(I)) && /* @__PURE__ */ p(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (E) => E.stopPropagation(),
                onKeyDownCapture: (E) => {
                  vr(E) && (E.preventDefault(), E.stopPropagation(), (It(I) || C !== void 0) && Et());
                },
                onKeyDown: (E) => {
                  br(E), (E.key === "Enter" || E.key === " ") && E.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    fn,
                    {
                      editorSerializedState: I,
                      onSerializedChange: (E) => D(E),
                      placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (E) => {
                        Zt.current = E;
                      }
                    }
                  ),
                  /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    C !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: ge(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: un(
                          C,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ p(Xt, { open: M, onOpenChange: W, children: [
                      /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ r(
                        F,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Ct || !v || v.length === 0 || !v.includes(s),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(uo, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        Wt,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (E) => {
                            E.key === "Escape" && (E.stopPropagation(), W(!1));
                          },
                          children: /* @__PURE__ */ r(de, { children: /* @__PURE__ */ r(pe, { children: v == null ? void 0 : v.map((E) => /* @__PURE__ */ r(
                            Yt,
                            {
                              onSelect: () => {
                                T(E !== i ? E : void 0), W(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: un(E, n) })
                            },
                            E || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      F,
                      {
                        size: "icon",
                        onClick: Et,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !It(I) && C === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(mo, {})
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
function Vd({
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: c,
  assignableUsers: w,
  canUserAddCommentToThread: d,
  canUserAssignThreadCallback: m,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: v,
  onVerseRefClick: b
}) {
  const [x, y] = S(/* @__PURE__ */ new Set()), [k, _] = S();
  H(() => {
    g && (y((O) => new Set(O).add(g)), _(g));
  }, [g]);
  const L = n.filter(
    (O) => O.comments.some((A) => !A.deleted)
  ), j = L.map((O) => ({
    id: O.id
  })), I = B(
    (O) => {
      y((A) => new Set(A).add(O.id)), _(O.id), v == null || v(O.id);
    },
    [v]
  ), D = B(
    (O) => {
      const A = x.has(O);
      y((X) => {
        const M = new Set(X);
        return M.has(O) ? M.delete(O) : M.add(O), M;
      }), _(O), v == null || v(A ? void 0 : O);
    },
    [x, v]
  ), { listboxRef: C, activeId: T, handleKeyDown: V } = lc({
    options: j,
    onOptionSelect: I
  }), P = B(
    (O) => {
      O.key === "Escape" ? (k && x.has(k) && (y((A) => {
        const X = new Set(A);
        return X.delete(k), X;
      }), _(void 0), v == null || v(void 0)), O.preventDefault(), O.stopPropagation()) : V(O);
    },
    [k, x, V, v]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: C,
      "aria-activedescendant": T ?? void 0,
      "aria-label": "Comments",
      className: f(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: P,
      children: L.map((O) => /* @__PURE__ */ r(
        "div",
        {
          id: O.id,
          className: f({
            "tw-opacity-60": O.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            xc,
            {
              classNameForVerseText: e,
              comments: O.comments,
              localizedStrings: a,
              verseRef: O.verseRef,
              handleSelectThread: D,
              threadId: O.id,
              thread: O,
              isRead: O.isRead,
              isSelected: x.has(O.id),
              currentUser: o,
              assignedUser: O.assignedUser,
              threadStatus: O.status,
              handleAddCommentToThread: i,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: b
            }
          )
        },
        O.id
      ))
    }
  );
}
function yc({ table: t }) {
  return /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ r(bs, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(qa, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(le, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(Cn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(en, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        re,
        {
          className: "tw-capitalize",
          checked: e.getIsVisible(),
          onCheckedChange: (n) => e.toggleVisibility(!!n),
          children: e.id
        },
        e.id
      ))
    ] })
  ] });
}
const Me = yt.Root, kc = yt.Group, Oe = yt.Value, Nc = ce(
  // CUSTOM: Removed tw-justify-between. Added tw-gap-2, [&>span]:tw-flex-1, [&>span]:tw-text-start
  // to keep the chevron tight against the text instead of drifting to the far edge on resize.
  "tw-flex tw-h-10 tw-w-full tw-items-center tw-gap-2 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-flex-1 [&>span]:tw-line-clamp-1 [&>span]:tw-text-start",
  {
    variants: {
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-8 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10"
      }
    },
    defaultVariants: {
      size: "default"
    }
  }
);
function Ie({
  className: t,
  children: e,
  size: n,
  ref: o,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ p(
    yt.Trigger,
    {
      className: f(Nc({ size: n, className: t })),
      ref: o,
      ...a,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(yt.Icon, { asChild: !0, children: /* @__PURE__ */ r($e, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
}
function _c({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    yt.ScrollUpButton,
    {
      ref: e,
      className: f(
        "tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r(ho, { className: "tw-h-4 tw-w-4" })
    }
  );
}
function Cc({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    yt.ScrollDownButton,
    {
      ref: e,
      className: f(
        "tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r($e, { className: "tw-h-4 tw-w-4" })
    }
  );
}
function Ae({
  className: t,
  children: e,
  position: n = "popper",
  ref: o,
  ...a
}) {
  const i = wt();
  return /* @__PURE__ */ r(yt.Portal, { children: /* @__PURE__ */ p(
    yt.Content,
    {
      ref: o,
      className: f(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...a,
      children: [
        /* @__PURE__ */ r(_c, {}),
        /* @__PURE__ */ r(
          yt.Viewport,
          {
            className: f(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ r(Cc, {})
      ]
    }
  ) });
}
function Ld({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    yt.Label,
    {
      ref: e,
      className: f("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
      ...n
    }
  );
}
function Ot({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ p(
    yt.Item,
    {
      ref: n,
      className: f(
        "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(yt.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        /* @__PURE__ */ r(yt.ItemText, { children: e })
      ]
    }
  );
}
function jd({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    yt.Separator,
    {
      ref: e,
      className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
      ...n
    }
  );
}
function Ec({ table: t }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ p(
        Me,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Ie, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Oe, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ae, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Ot, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(Ha, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(Ya, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(Xa, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(Wa, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const no = `
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
function Tc(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function Je(t, e) {
  const n = e ? `${no}, ${e}` : no;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Tc(o)
  );
}
function yr({
  className: t,
  stickyHeader: e,
  ref: n,
  ...o
}) {
  const a = Q.useRef(null);
  Q.useEffect(() => {
    typeof n == "function" ? n(a.current) : n && "current" in n && (n.current = a.current);
  }, [n]), Q.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        Je(s, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
          d.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const c = new MutationObserver(() => {
      l();
    });
    return c.observe(s, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      c.disconnect();
    };
  }, []);
  const i = (s) => {
    const { current: l } = a;
    if (l) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), Je(l)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: f("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
      ref: a,
      className: f(
        "tw-w-full tw-caption-bottom tw-text-sm tw-outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        // CUSTOM: Add focus styles
        t
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...o
    }
  ) });
}
function kr({
  className: t,
  stickyHeader: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    "thead",
    {
      ref: n,
      className: f(
        {
          "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
        },
        "[&_tr]:tw-border-b",
        t
      ),
      ...o
    }
  );
}
function Nr({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r("tbody", { ref: e, className: f("[&_tr:last-child]:tw-border-0", t), ...n });
}
function zd({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "tfoot",
    {
      ref: e,
      className: f(
        "tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0",
        t
      ),
      ...n
    }
  );
}
function Sc(t) {
  Q.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? Je(t.current) : [], i = a.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
          s >= 0 && s < a.length && a[s].focus();
        }
        o.key === "Escape" && (o.preventDefault(), e.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return e.addEventListener("keydown", n), () => {
      e.removeEventListener("keydown", n);
    };
  }, [t]);
}
function Rc(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Dc(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function te({
  className: t,
  onKeyDown: e,
  onSelect: n,
  setFocusAlsoRunsSelect: o = !1,
  ref: a,
  ...i
}) {
  const s = Q.useRef(null);
  Q.useEffect(() => {
    typeof a == "function" ? a(s.current) : a && "current" in a && (a.current = s.current);
  }, [a]), Sc(s);
  const l = Q.useMemo(
    () => s.current ? Je(s.current) : [],
    [s]
  ), c = Q.useCallback(
    (d) => {
      const { current: m } = s;
      if (!m || !m.parentElement) return;
      const h = m.closest("table"), u = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Je(h).filter(
          (b) => b.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), v = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), Dc(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Rc(l, v, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const b = m.closest("table");
        b && b.focus();
      }
      e == null || e(d);
    },
    [s, l, e]
  ), w = Q.useCallback(
    (d) => {
      o && (n == null || n(d));
    },
    [o, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: s,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: w,
      className: f(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        "data-[state=selected]:tw-bg-muted",
        t
      ),
      ...i
    }
  );
}
function bn({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "th",
    {
      ref: e,
      className: f(
        "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
        t
      ),
      ...n
    }
  );
}
function Se({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "td",
    {
      ref: e,
      className: f("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
      ...n
    }
  );
}
function Fd({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "caption",
    {
      ref: e,
      className: f("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
      ...n
    }
  );
}
function rr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function Mc({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: w
}) {
  var j;
  const [d, m] = S([]), [h, u] = S([]), [g, v] = S({}), [b, x] = S({}), y = z(() => e ?? [], [e]), k = Vo({
    data: y,
    columns: t,
    getCoreRowModel: jo(),
    ...n && { getPaginationRowModel: xs() },
    onSortingChange: m,
    getSortedRowModel: Lo(),
    onColumnFiltersChange: u,
    getFilteredRowModel: vs(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: x,
    state: {
      sorting: d,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: b
    }
  }), _ = k.getVisibleFlatColumns();
  let L;
  return c ? L = Array.from({ length: 10 }).map((C, T) => `skeleton-row-${T}`).map((C) => /* @__PURE__ */ r(te, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Se, { colSpan: _.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(rr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, C)) : ((j = k.getRowModel().rows) == null ? void 0 : j.length) > 0 ? L = k.getRowModel().rows.map((I) => /* @__PURE__ */ r(
    te,
    {
      onClick: () => s(I, k),
      "data-state": I.getIsSelected() && "selected",
      children: I.getVisibleCells().map((D) => /* @__PURE__ */ r(Se, { children: Ke(D.column.columnDef.cell, D.getContext()) }, D.id))
    },
    I.id
  )) : L = /* @__PURE__ */ r(te, { children: /* @__PURE__ */ r(Se, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(yc, { table: k }),
    /* @__PURE__ */ p(yr, { stickyHeader: i, children: [
      /* @__PURE__ */ r(kr, { stickyHeader: i, children: k.getHeaderGroups().map((I) => /* @__PURE__ */ r(te, { children: I.headers.map((D) => /* @__PURE__ */ r(bn, { className: "tw-p-0", children: D.isPlaceholder ? void 0 : Ke(D.column.columnDef.header, D.getContext()) }, D.id)) }, I.id)) }),
      /* @__PURE__ */ r(Nr, { children: L })
    ] }),
    n && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.previousPage(),
          disabled: !k.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        F,
        {
          variant: "outline",
          size: "sm",
          onClick: () => k.nextPage(),
          disabled: !k.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Ec, { table: k })
  ] });
}
function Bd({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const i = z(
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
      className: f(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ r(Ns, { options: i, children: e })
    }
  );
}
const Oc = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), ro = (t, e) => t[e] ?? e;
function Ic({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = ro(n, "%webView_error_dump_header%"), i = ro(n, "%webView_error_dump_info_message%");
  function s() {
    navigator.clipboard.writeText(t), e && e();
  }
  return /* @__PURE__ */ p(
    "div",
    {
      id: o,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ p("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ p("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: i })
          ] }),
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(fo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const Kd = Object.freeze([
  ...Oc,
  "%webView_error_dump_copied_message%"
]);
function Ud({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = S(!1), c = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ p(Xt, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: o }),
    /* @__PURE__ */ p(Wt, { id: i, className: f("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(ut, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Ic,
        {
          errorDetails: t,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Ac = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Ac || {});
function Gd({ id: t, label: e, groups: n }) {
  const [o, a] = S(
    Object.fromEntries(
      n.map(
        (w, d) => w.itemType === 0 ? [d, []] : void 0
      ).filter((w) => !!w)
    )
  ), [i, s] = S({}), l = (w, d) => {
    const m = !o[w][d];
    a((u) => (u[w][d] = m, { ...u }));
    const h = n[w].items[d];
    h.onUpdate(h.id, m);
  }, c = (w, d) => {
    s((h) => (h[w] = d, { ...h }));
    const m = n[w].items.find((h) => h.id === d);
    m ? m.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ r(ye, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "default", children: [
      /* @__PURE__ */ r(Ja, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r($e, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(le, { children: n.map((w, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(Cn, { children: w.label }),
      /* @__PURE__ */ r(xa, { children: w.itemType === 0 ? /* @__PURE__ */ r(at, { children: w.items.map((m, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        re,
        {
          checked: o[d][h],
          onCheckedChange: () => l(d, h),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        fc,
        {
          value: i[d],
          onValueChange: (m) => c(d, m),
          children: w.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(vc, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r(en, {})
    ] }, w.label)) })
  ] }) });
}
function qd({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const c = new Ni("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((d, m) => d + m, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ p(
    "div",
    {
      id: t,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        e && /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: e }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(Za, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((d) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: d.toUpperCase() }, d)) }),
          o.length > 3 && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              onClick: () => w(),
              className: "tw-text-xs tw-text-foreground tw-underline",
              children: [
                "+",
                o.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        (a || s) && /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            F,
            {
              onClick: () => i(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(Qa, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          s && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ p(
            F,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(ti, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Pc({ id: t, versionHistory: e }) {
  const [n, o] = S(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), d = w.getUTCFullYear() - 1970, m = w.getUTCMonth(), h = w.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ p("div", { className: "pr-twp", id: t, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ p("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ p("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ p("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ r("div", { children: i(l[1].date) })
      ] })
    ] }, l[0])) }),
    s.length > 5 && /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        onClick: () => o(!n),
        className: "tw-text-xs tw-text-foreground tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Hd({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = z(() => _i(n), [n]), c = ((w) => {
    const d = new Intl.DisplayNames(Ci(), { type: "language" });
    return w.map((m) => d.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Pc, { versionHistory: a }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ p("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ p("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ p("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function $c({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: w = void 0,
  onOpenChange: d = void 0,
  isDisabled: m = !1,
  sortSelected: h = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: v = "ghost",
  id: b
}) {
  const [x, y] = S(!1), k = B(
    (T) => {
      var P;
      const V = (P = t.find((O) => O.label === T)) == null ? void 0 : P.value;
      V && n(
        e.includes(V) ? e.filter((O) => O !== V) : [...e, V]
      );
    },
    [t, e, n]
  ), _ = () => c || o, L = z(() => {
    if (!h) return t;
    const T = t.filter((P) => P.starred).sort((P, O) => P.label.localeCompare(O.label)), V = t.filter((P) => !P.starred).sort((P, O) => {
      const A = e.includes(P.value), X = e.includes(O.value);
      return A && !X ? -1 : !A && X ? 1 : P.label.localeCompare(O.label);
    });
    return [...T, ...V];
  }, [t, e, h]), j = () => {
    n(t.map((T) => T.value));
  }, I = () => {
    n([]);
  }, D = w ?? x;
  return /* @__PURE__ */ r("div", { id: b, className: g, children: /* @__PURE__ */ p(Xt, { open: D, onOpenChange: d ?? y, children: [
    /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: v,
        role: "combobox",
        "aria-expanded": D,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: m,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: f(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: _()
              }
            )
          ] }),
          /* @__PURE__ */ r(go, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Wt, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(de, { children: [
      /* @__PURE__ */ r(tn, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: j, children: i }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: I, children: s })
      ] }),
      /* @__PURE__ */ p(pe, { children: [
        /* @__PURE__ */ r(kn, { children: l }),
        /* @__PURE__ */ r(Ht, { children: L.map((T) => /* @__PURE__ */ p(
          Yt,
          {
            value: T.label,
            onSelect: k,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                zt,
                {
                  className: f(
                    "tw-h-4 tw-w-4",
                    e.includes(T.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              T.starred && /* @__PURE__ */ r(ei, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: T.label }),
              T.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: T.secondaryLabel })
            ]
          },
          T.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function Yd({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: l,
  icon: c,
  className: w,
  badgesPlaceholder: d,
  id: m
}) {
  return /* @__PURE__ */ p("div", { id: m, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      $c,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: l,
        icon: c,
        className: w
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((h) => {
      var u;
      return /* @__PURE__ */ p(Xe, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(Pe, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === h)) == null ? void 0 : u.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(ut, { children: d })
  ] });
}
const Vc = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), oo = (t, e) => t[e] ?? e;
function Lc({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const c = z(() => /Macintosh/i.test(navigator.userAgent), []);
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Undo",
          className: s,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(ni, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ p("p", { children: [
        oo(a, "%undoButton_tooltip%"),
        i && ` (${c ? "⌘Z" : "Ctrl+Z"})`
      ] }) })
    ] }) }),
    e && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": "Redo",
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(ri, {})
        }
      ) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ p("p", { children: [
        oo(a, "%redoButton_tooltip%"),
        i && ` (${c ? "⌘⇧Z" : "Ctrl+Y"})`
      ] }) })
    ] }) })
  ] });
}
function jc({ children: t, editorRef: e }) {
  const n = q(null);
  return H(() => {
    var s;
    const o = /Macintosh/i.test(navigator.userAgent), a = ((s = n.current) == null ? void 0 : s.querySelector(".editor-input")) ?? void 0, i = (l) => {
      var w, d, m, h;
      if (!a || document.activeElement !== a) return;
      const c = l.key.toLowerCase();
      if (o) {
        if (!l.metaKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (w = e.current) == null || w.undo()) : l.shiftKey && c === "z" && (l.preventDefault(), (d = e.current) == null || d.redo());
      } else {
        if (!l.ctrlKey) return;
        !l.shiftKey && c === "z" ? (l.preventDefault(), (m = e.current) == null || m.undo()) : (c === "y" || l.shiftKey && c === "z") && (l.preventDefault(), (h = e.current) == null || h.redo());
      }
    };
    return document.addEventListener("keydown", i), () => document.removeEventListener("keydown", i);
  }, [e]), /* @__PURE__ */ r("div", { ref: n, children: t });
}
function nn({
  className: t,
  type: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: f(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: n,
      ...o
    }
  );
}
const zc = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Fc({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = q(null), s = q(null), l = q(!1), [c, w] = S(t), [d, m] = S(n), [h, u] = S(!1);
  H(() => {
    w(t);
  }, [t]), H(() => {
    d !== n && m(n);
  }, [n]);
  const g = (b) => {
    l.current = !1, u(b), b || (c !== "custom" || d ? (e(c), o(d)) : (w(t), m(n)));
  }, v = (b) => {
    var x, y, k, _;
    b.stopPropagation(), document.activeElement === s.current && b.key === "ArrowDown" || b.key === "ArrowRight" ? ((x = i.current) == null || x.focus(), l.current = !0) : document.activeElement === i.current && b.key === "ArrowUp" ? ((y = s.current) == null || y.focus(), l.current = !1) : document.activeElement === i.current && b.key === "ArrowLeft" && ((k = i.current) == null ? void 0 : k.selectionStart) === 0 && ((_ = s.current) == null || _.focus(), l.current = !1), c === "custom" && b.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ p(se, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(ye, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: zc(t, a, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      le,
      {
        style: { zIndex: zo },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: v,
        onMouseMove: () => {
          var b;
          l.current && ((b = i.current) == null || b.focus());
        },
        children: [
          /* @__PURE__ */ r(Cn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(en, {}),
          /* @__PURE__ */ r(
            re,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Hn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            re,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Yn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            re,
            {
              ref: s,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (b) => {
                var x;
                b.stopPropagation(), l.current = !0, (x = i.current) == null || x.focus();
              },
              onSelect: (b) => b.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  nn,
                  {
                    tabIndex: 0,
                    onMouseDown: (b) => {
                      b.stopPropagation(), w("custom"), l.current = !0;
                    },
                    ref: i,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: d,
                    onKeyDown: (b) => {
                      b.key === "Enter" || b.key === "ArrowUp" || b.key === "ArrowDown" || b.key === "ArrowLeft" || b.key === "ArrowRight" || b.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (b) => m(b.target.value)
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
const Bc = (t, e) => t === "f" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r(vo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r(xo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(at, { children: [
  /* @__PURE__ */ r(bo, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), Kc = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), ge(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Uc({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(se, { children: [
    /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(ws, { asChild: !0, children: /* @__PURE__ */ r(ye, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: Bc(t, n) }) }) }),
      /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: Kc(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(le, { style: { zIndex: zo }, children: [
      /* @__PURE__ */ r(Cn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(en, {}),
      /* @__PURE__ */ p(
        re,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(bo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        re,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(vo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        re,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(xo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const Gc = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function qc({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? oi, { className: e, size: 16 });
}
function ao({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    Yt,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(qc, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(js, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function Hc({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = S(""), [i, s] = z(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const c = e.filter(
      (d) => {
        var m;
        return (m = d.marker) == null ? void 0 : m.toLowerCase().includes(l);
      }
    ), w = e.filter(
      (d) => d.title.toLowerCase().includes(l) && !c.includes(d)
    );
    return [c, w];
  }, [o, e]);
  return /* @__PURE__ */ p(de, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      tn,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(pe, { children: [
      /* @__PURE__ */ r(kn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Ht, { children: i.map((l) => {
        var c;
        return /* @__PURE__ */ r(
          ao,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((c = l.icon) == null ? void 0 : c.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ p(at, { children: [
        i.length > 0 && /* @__PURE__ */ r(Fo, { alwaysRender: !0 }),
        /* @__PURE__ */ r(Ht, { children: s.map((l) => {
          var c;
          return /* @__PURE__ */ r(
            ao,
            {
              item: l,
              localizedStrings: t
            },
            `item-${l.marker ?? ((c = l.icon) == null ? void 0 : c.displayName)}-${l.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function Yc(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = wn[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: n[wn[l].description] ?? wn[l].description,
        action: () => {
          var c;
          (c = t.current) == null || c.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function Xc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function Wc(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const Jc = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function Xd({
  classNameForEditor: t,
  noteOps: e,
  onChange: n,
  onClose: o,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: c,
  parentEditorRef: w
}) {
  const d = q(null), m = q(null), h = q(null), u = q(null);
  Rt(() => {
    if (!u.current) return;
    const { width: N } = u.current.getBoundingClientRect();
    N > 0 && (u.current.style.width = `${N}px`);
  }, []);
  const [g, v] = S("generated"), [b, x] = S("*"), [y, k] = S("f"), [_, L] = S(!1), [j, I] = S(!0), [D, C] = S(!1), T = q(!1), V = q(""), [P, O] = S(!1), [A, X] = S(), [M, W] = S(), [Ct, Dt] = S(), [St, pt] = S(), lt = q(null), K = z(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? _s(), noteMode: "expanded" }
    }),
    [s, l]
  ), nt = z(
    () => Yc(
      d,
      () => O(!1),
      c,
      St
    ),
    [c, St]
  );
  H(() => {
    var N;
    P || (N = d.current) == null || N.focus();
  }, [y, P]), H(() => {
    var U, G;
    let N;
    T.current = !1, I(!0);
    const $ = e == null ? void 0 : e.at(0);
    if ($ && on("note", $)) {
      const ot = (U = $.insert.note) == null ? void 0 : U.caller;
      let tt = "custom";
      ot === Hn ? tt = "generated" : ot === Yn ? tt = "hidden" : ot && x(ot), v(tt), k(((G = $.insert.note) == null ? void 0 : G.style) ?? "f"), N = setTimeout(() => {
        var ft;
        (ft = d.current) == null || ft.applyUpdate([$]);
      }, 0);
    }
    return () => {
      N && clearTimeout(N);
    };
  }, [e, i]);
  const rt = B(
    (N, $, U = !1) => {
      var ot, tt, ft;
      const G = (tt = (ot = d.current) == null ? void 0 : ot.getNoteOps(0)) == null ? void 0 : tt.at(0);
      if (G && on("note", G)) {
        if (G.insert.note) {
          let st;
          N === "custom" ? st = $ : N === "generated" ? st = Hn : st = Yn, G.insert.note.caller = st;
        }
        n == null || n([G]), U && w && i && ((ft = w.current) == null || ft.replaceEmbedUpdate(i, [G]));
      }
    },
    [i, n, w]
  ), it = B(() => {
    rt(g, b, !0), o();
  }, [g, b, o, rt]), bt = q(it);
  Rt(() => {
    bt.current = it;
  });
  const Kt = q({ book: a.book, chapterNum: a.chapterNum });
  Rt(() => {
    (Kt.current.book !== a.book || Kt.current.chapterNum !== a.chapterNum) && (Kt.current = { book: a.book, chapterNum: a.chapterNum }, bt.current());
  }, [a.book, a.chapterNum]);
  const $t = () => {
    var $;
    const N = ($ = m.current) == null ? void 0 : $.getElementsByClassName("editor-input")[0];
    N != null && N.textContent && navigator.clipboard.writeText(N.textContent);
  }, Ut = B(
    (N) => {
      v(N), rt(N, b);
    },
    [b, rt]
  ), _e = B(
    (N) => {
      x(N), rt(g, N);
    },
    [g, rt]
  ), Zt = (N) => {
    var U, G, ot, tt, ft;
    k(N);
    const $ = (G = (U = d.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : G.at(0);
    if ($ && on("note", $)) {
      $.insert.note && ($.insert.note.style = N);
      const st = (tt = (ot = $.insert.note) == null ? void 0 : ot.contents) == null ? void 0 : tt.ops;
      y !== "x" && N === "x" ? st == null || st.forEach((Et) => Xc(Et)) : y === "x" && N !== "x" && (st == null || st.forEach((Et) => Wc(Et))), (ft = d.current) == null || ft.applyUpdate([$, { delete: 1 }]);
    }
  }, Gt = (N) => {
    pt(N.contextMarker), C(N.canRedo);
  }, je = B(
    (N) => {
      var U, G, ot, tt, ft;
      const $ = (G = (U = d.current) == null ? void 0 : U.getNoteOps(0)) == null ? void 0 : G.at(0);
      if ($ && on("note", $)) {
        N.content.length > 1 && setTimeout(() => {
          var Mt;
          (Mt = d.current) == null || Mt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const st = (ot = $.insert.note) == null ? void 0 : ot.style, Et = (ft = (tt = $.insert.note) == null ? void 0 : tt.contents) == null ? void 0 : ft.ops;
        if (st || L(!1), L(
          st === "x" ? !!(Et != null && Et.every((Mt) => {
            var gt, dt;
            if (!((gt = Mt.attributes) != null && gt.char)) return !0;
            const E = ((dt = Mt.attributes) == null ? void 0 : dt.char).style;
            return E === "xt" || E === "xo" || E === "xq";
          })) : !!(Et != null && Et.every((Mt) => {
            var gt, dt;
            if (!((gt = Mt.attributes) != null && gt.char)) return !0;
            const E = ((dt = Mt.attributes) == null ? void 0 : dt.char).style;
            return E === "ft" || E === "fr" || E === "fq";
          }))
        ), !T.current) {
          T.current = !0, V.current = JSON.stringify($), I(!0);
          return;
        }
        I(JSON.stringify($) === V.current), rt(g, b);
      } else
        L(!1), I(!0);
    },
    [g, b, rt]
  ), R = B(() => {
    const N = window.getSelection();
    if (h.current && nt.length && N && N.rangeCount > 0) {
      const $ = N.getRangeAt(0).getBoundingClientRect(), U = h.current.getBoundingClientRect();
      X($.left - U.left), W($.top - U.top), Dt($.height), O(!0);
    }
  }, [nt, h]);
  return H(() => {
    const N = () => {
      P && O(!1);
    };
    return window.addEventListener("click", N), () => {
      window.removeEventListener("click", N);
    };
  }, [P]), H(() => {
    var N;
    P && ((N = lt.current) == null || N.focus());
  }, [P]), H(() => {
    var U;
    const N = ((U = m.current) == null ? void 0 : U.querySelector(".editor-input")) ?? void 0, $ = (G) => {
      !P && N && document.activeElement === N && G.key === l ? (G.preventDefault(), R()) : P && G.key === "Escape" && (G.preventDefault(), O(!1));
    };
    return document.addEventListener("keydown", $), () => {
      document.removeEventListener("keydown", $);
    };
  }, [P, R, l]), /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            Uc,
            {
              isTypeSwitchable: _,
              noteType: y,
              handleNoteTypeChange: Zt,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(
            Fc,
            {
              callerType: g,
              updateCallerType: Ut,
              customCaller: b,
              updateCustomCaller: _e,
              localizedStrings: c
            }
          )
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
          /* @__PURE__ */ r(
            Lc,
            {
              onUndoClick: () => {
                var N;
                return (N = d.current) == null ? void 0 : N.undo();
              },
              onRedoClick: () => {
                var N;
                return (N = d.current) == null ? void 0 : N.redo();
              },
              canUndo: !j,
              canRedo: D,
              localizedStrings: c
            }
          ),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
            /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(
              F,
              {
                onClick: it,
                className: "tw-h-6 tw-w-6",
                size: "icon",
                variant: "ghost",
                children: /* @__PURE__ */ r(zt, {})
              }
            ) }),
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_saveButton_tooltip%"] }) })
          ] }) }),
          /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
            /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(F, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "ghost", children: /* @__PURE__ */ r(Pe, {}) }) }),
            /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_cancelButton_tooltip%"] }) })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: m,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(jc, { editorRef: d, children: /* @__PURE__ */ r(
              Cs,
              {
                options: K,
                onStateChange: Gt,
                onUsjChange: je,
                defaultUsj: Jc,
                onScrRefChange: () => {
                },
                scrRef: a,
                ref: d
              }
            ) }) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
              /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  onClick: $t,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(fo, {})
                }
              ) }),
              /* @__PURE__ */ r(_t, { children: /* @__PURE__ */ r("p", { children: c["%footnoteEditor_copyButton_tooltip%"] }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        className: "tw-absolute",
        ref: h,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ p(Xt, { open: P, children: [
      /* @__PURE__ */ r(
        Fs,
        {
          className: "tw-absolute",
          style: {
            top: M,
            left: A,
            height: Ct,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        Wt,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (N) => {
            N.preventDefault(), N.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            Hc,
            {
              markerMenuItems: nt,
              localizedStrings: c,
              searchRef: lt
            }
          )
        }
      )
    ] })
  ] });
}
const Wd = Object.freeze([
  ...Gc,
  ...Object.entries(wn).map(([, t]) => t.description).filter((t) => !!t),
  "%footnoteEditor_callerDropdown_item_custom%",
  "%footnoteEditor_callerDropdown_item_generated%",
  "%footnoteEditor_callerDropdown_item_hidden%",
  "%footnoteEditor_callerDropdown_label%",
  "%footnoteEditor_callerDropdown_tooltip%",
  "%footnoteEditor_cancelButton_tooltip%",
  "%footnoteEditor_copyButton_tooltip%",
  "%footnoteEditor_noteType_crossReference_label%",
  "%footnoteEditor_noteType_endNote_label%",
  "%footnoteEditor_noteType_footnote_label%",
  "%footnoteEditor_noteType_tooltip%",
  "%footnoteEditor_noteTypeDropdown_label%",
  "%footnoteEditor_saveButton_tooltip%",
  ...Vc
]);
function ya(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function Zc(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, c) => {
    const w = c === i.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      _r(t, l, n, !0, a),
      w && o
    ] }, ya(t, l));
  });
}
function _r(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = f(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Kn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: i }),
              /* @__PURE__ */ r(Kn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          s
        );
      }
      return Qc(
        i,
        ya(`${t}\\${i.marker}`, [i]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function Qc(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Kn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    _r(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function tw({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const c = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, w = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, d = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ p("span", { className: f("note-caller tw-inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), m = s && /* @__PURE__ */ p(at, { children: [
    _r(t.marker, [s], o, !1),
    " "
  ] }), h = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", v = f(h, u);
  return /* @__PURE__ */ p(at, { children: [
    /* @__PURE__ */ p("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", v), children: [
      c,
      d
    ] }),
    /* @__PURE__ */ r("div", { className: f("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", v), children: m }),
    /* @__PURE__ */ r(
      "div",
      {
        className: f(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          v
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(at, { children: Zc(t.marker, l, o, w) })
      }
    )
  ] });
}
function Jd({
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: w
}) {
  const d = c ?? Ei(n, void 0), m = (y, k) => {
    w == null || w(y, k, a);
  }, h = i ? n.findIndex((y) => y === i) : -1, [u, g] = S(h), v = (y, k, _) => {
    if (n.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), w == null || w(k, _, a);
          break;
      }
  }, b = (y) => {
    if (n.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), g((k) => Math.min(k + 1, n.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), g((k) => Math.max(k - 1, 0));
          break;
      }
  }, x = q([]);
  return H(() => {
    var y;
    u >= 0 && u < x.current.length && ((y = x.current[u]) == null || y.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: f("tw-h-full tw-overflow-y-auto", t),
      onKeyDown: b,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: f(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((y, k) => {
            const _ = y === i, L = `${a}-${k}`;
            return /* @__PURE__ */ p(at, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (j) => {
                    x.current[k] = j;
                  },
                  role: "option",
                  "aria-selected": _,
                  "data-marker": y.marker,
                  "data-state": _ ? "selected" : void 0,
                  tabIndex: k === u ? 0 : -1,
                  className: f(
                    "tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",
                    w && "hover:tw-bg-muted/50",
                    "tw-w-full tw-rounded-sm tw-border-0 tw-bg-transparent tw-shadow-none",
                    "focus:tw-outline-none focus-visible:tw-outline-none",
                    /* ENHANCE: After considerable fiddling, this set of styles makes a focus ring
                       that looks great in Storybook. However, the left edge of the ring is clipped in
                       P.B app. These are similar, but not identical to, the customizations made in
                       our shadcn table component.
                    */
                    "focus-visible:tw-ring-offset-0.5 focus-visible:tw-relative focus-visible:tw-z-10 focus-visible:tw-ring-2 focus-visible:tw-ring-ring",
                    "tw-grid tw-grid-flow-col tw-grid-cols-subgrid",
                    o === "horizontal" ? "tw-col-span-3" : "tw-col-span-2 tw-row-span-2",
                    e
                  ),
                  onClick: () => m(y, k),
                  onKeyDown: (j) => v(j, y, k),
                  children: /* @__PURE__ */ r(
                    tw,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => d(y.caller, k),
                      showMarkers: s
                    }
                  )
                },
                L
              ),
              k < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(We, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function ew(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function nw({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], i = n["%webView_inventory_occurrences_table_header_occurrence%"], s = z(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return t.forEach((w) => {
      const d = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      c.has(d) || (c.add(d), l.push(w));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(yr, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(kr, { stickyHeader: !0, children: /* @__PURE__ */ p(te, { children: [
      /* @__PURE__ */ r(bn, { children: a }),
      /* @__PURE__ */ r(bn, { children: i })
    ] }) }),
    /* @__PURE__ */ r(Nr, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ p(
      te,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Se, { children: be(l.reference, "English") }),
          /* @__PURE__ */ r(Se, { className: o, children: ew(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
function ka({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    jr.Root,
    {
      ref: e,
      className: f(
        "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r(
        jr.Indicator,
        {
          className: f("tw-flex tw-items-center tw-justify-center tw-text-current"),
          children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" })
        }
      )
    }
  );
}
const rw = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(li, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(ci, { className: "tw-h-4 tw-w-4" });
}, En = (t, e, n) => /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
  /* @__PURE__ */ p(
    Tt,
    {
      className: f("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        rw(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(_t, { side: "bottom", children: e })
] }) }), Zd = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => En(e, t)
}), ow = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => En(n, t)
}), Qd = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => En(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), Ln = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((w) => w !== c);
  }), o(s);
  let l = [...a];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), i(l);
}, tp = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => En(i, t, "tw-justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ p(ma, { value: s, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        pn,
        {
          onClick: (c) => {
            c.stopPropagation(), Ln(
              [l],
              "approved",
              e,
              n,
              o,
              a
            );
          },
          value: "approved",
          className: "tw-rounded-e-none tw-border-e-0",
          children: /* @__PURE__ */ r(ai, {})
        }
      ),
      /* @__PURE__ */ r(
        pn,
        {
          onClick: (c) => {
            c.stopPropagation(), Ln(
              [l],
              "unapproved",
              e,
              n,
              o,
              a
            );
          },
          value: "unapproved",
          className: "tw-rounded-none",
          children: /* @__PURE__ */ r(ii, {})
        }
      ),
      /* @__PURE__ */ r(
        pn,
        {
          onClick: (c) => {
            c.stopPropagation(), Ln(
              [l],
              "unknown",
              e,
              n,
              o,
              a
            );
          },
          value: "unknown",
          className: "tw-rounded-s-none tw-border-s-0",
          children: /* @__PURE__ */ r(si, {})
        }
      )
    ] });
  }
}), ep = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), np = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, rp = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, aw = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", op = Object.freeze([
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
]), iw = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, sw = (t, e, n) => t.map((o) => {
  const a = Or(o.key) ? o.key : o.key[0];
  return {
    items: Or(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || aw(a, e, n),
    occurrences: o.occurrences || []
  };
}), Vt = (t, e) => t[e] ?? e;
function ap({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  scope: s,
  onScopeChange: l,
  columns: c,
  id: w,
  areInventoryItemsLoading: d = !1,
  classNameForVerseText: m,
  onItemSelected: h
}) {
  const u = Vt(n, "%webView_inventory_all%"), g = Vt(n, "%webView_inventory_approved%"), v = Vt(n, "%webView_inventory_unapproved%"), b = Vt(n, "%webView_inventory_unknown%"), x = Vt(n, "%webView_inventory_scope_currentBook%"), y = Vt(n, "%webView_inventory_scope_chapter%"), k = Vt(n, "%webView_inventory_scope_verse%"), _ = Vt(n, "%webView_inventory_filter_text%"), L = Vt(
    n,
    "%webView_inventory_show_additional_items%"
  ), j = Vt(n, "%webView_inventory_no_results%"), [I, D] = S(!1), [C, T] = S("all"), [V, P] = S(""), [O, A] = S([]), X = z(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : sw(K, a, i);
  }, [t, a, i]), M = z(() => {
    if (I) return X;
    const K = [];
    return X.forEach((nt) => {
      const rt = nt.items[0], it = K.find(
        (bt) => bt.items[0] === rt
      );
      it ? (it.count += nt.count, it.occurrences = it.occurrences.concat(nt.occurrences)) : K.push({
        items: [rt],
        count: nt.count,
        occurrences: nt.occurrences,
        status: nt.status
      });
    }), K;
  }, [I, X]), W = z(() => M.length === 0 ? [] : iw(M, C, V), [M, C, V]), Ct = z(() => {
    var rt, it;
    if (!I) return c;
    const K = (rt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : rt.length;
    if (!K) return c;
    const nt = [];
    for (let bt = 0; bt < K; bt++)
      nt.push(
        ow(
          ((it = o == null ? void 0 : o.tableHeaders) == null ? void 0 : it[bt]) || "Additional Item",
          bt + 1
        )
      );
    return [...nt, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, I]);
  H(() => {
    W.length === 0 ? A([]) : W.length === 1 && A(W[0].items);
  }, [W]);
  const Dt = (K, nt) => {
    nt.setRowSelection(() => {
      const it = {};
      return it[K.index] = !0, it;
    });
    const rt = K.original.items;
    A(rt), h && rt.length > 0 && h(rt[0]);
  }, St = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, pt = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      T(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, lt = z(() => {
    if (M.length === 0 || O.length === 0) return [];
    const K = M.filter((nt) => Ti(
      I ? nt.items : [nt.items[0]],
      O
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [O, I, M]);
  return /* @__PURE__ */ r("div", { id: w, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Me,
        {
          onValueChange: (K) => pt(K),
          defaultValue: C,
          children: [
            /* @__PURE__ */ r(Ie, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Oe, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Ae, { children: [
              /* @__PURE__ */ r(Ot, { value: "all", children: u }),
              /* @__PURE__ */ r(Ot, { value: "approved", children: g }),
              /* @__PURE__ */ r(Ot, { value: "unapproved", children: v }),
              /* @__PURE__ */ r(Ot, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Me, { onValueChange: (K) => St(K), defaultValue: s, children: [
        /* @__PURE__ */ r(Ie, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Oe, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Ae, { children: [
          /* @__PURE__ */ r(Ot, { value: "book", children: x }),
          /* @__PURE__ */ r(Ot, { value: "chapter", children: y }),
          /* @__PURE__ */ r(Ot, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ r(
        nn,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: _,
          value: V,
          onChange: (K) => {
            P(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(kt, { children: /* @__PURE__ */ p(Nt, { children: [
        /* @__PURE__ */ r(Tt, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            ka,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: I,
              onCheckedChange: (K) => {
                D(K);
              }
            }
          ),
          /* @__PURE__ */ r(ut, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? L })
        ] }) }),
        /* @__PURE__ */ r(_t, { children: (o == null ? void 0 : o.checkboxText) ?? L })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Mc,
      {
        columns: Ct,
        data: W,
        onRowClickHandler: Dt,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: j
      }
    ) }),
    lt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      nw,
      {
        classNameForText: m,
        occurrenceData: lt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const lw = "16rem", cw = "3rem", Na = Q.createContext(void 0);
function Tn() {
  const t = Q.useContext(Na);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
function ww({
  defaultOpen: t = !0,
  open: e,
  onOpenChange: n,
  className: o,
  style: a,
  children: i,
  side: s = "primary",
  ref: l,
  ...c
}) {
  const [w, d] = Q.useState(t), m = e ?? w, h = Q.useCallback(
    (k) => {
      const _ = typeof k == "function" ? k(m) : k;
      n ? n(_) : d(_);
    },
    [n, m]
  ), u = Q.useCallback(() => h((k) => !k), [h]), g = m ? "expanded" : "collapsed", x = wt() === "ltr" ? s : s === "primary" ? "secondary" : "primary", y = Q.useMemo(
    () => ({
      state: g,
      open: m,
      setOpen: h,
      toggleSidebar: u,
      side: x
    }),
    [g, m, h, u, x]
  );
  return /* @__PURE__ */ r(Na.Provider, { value: y, children: /* @__PURE__ */ r(kt, { delayDuration: 0, children: /* @__PURE__ */ r(
    "div",
    {
      style: (
        // CSS custom properties are not in React.CSSProperties; cast is required to use them
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        {
          "--sidebar-width": lw,
          "--sidebar-width-icon": cw,
          ...a
        }
      ),
      className: f(
        // Removed tw-min-h-svh
        "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
        o
      ),
      ref: l,
      ...c,
      children: i
    }
  ) }) });
}
function dw({
  variant: t = "sidebar",
  collapsible: e = "offcanvas",
  className: n,
  children: o,
  ref: a,
  ...i
}) {
  const s = Tn();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: f(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: a,
      ...i,
      children: o
    }
  ) : /* @__PURE__ */ p(
    "div",
    {
      ref: a,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: f(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: f(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              s.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...i,
            children: /* @__PURE__ */ r(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: o
              }
            )
          }
        )
      ]
    }
  );
}
function ip({
  className: t,
  onClick: e,
  ref: n,
  ...o
}) {
  const a = Tn();
  return /* @__PURE__ */ p(
    F,
    {
      ref: n,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: f("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...o,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(wi, {}) : /* @__PURE__ */ r(di, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
}
function sp({
  className: t,
  ref: e,
  ...n
}) {
  const { toggleSidebar: o } = Tn();
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
      className: f(
        "tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex",
        "[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize",
        "[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize",
        "group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar",
        "[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2",
        "[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",
        t
      ),
      ...n
    }
  );
}
function pw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "main",
    {
      ref: e,
      className: f(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...n
    }
  );
}
function lp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    nn,
    {
      ref: e,
      "data-sidebar": "input",
      className: f(
        "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
        t
      ),
      ...n
    }
  );
}
function cp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "header",
      className: f("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...n
    }
  );
}
function wp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "footer",
      className: f("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...n
    }
  );
}
function dp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    We,
    {
      ref: e,
      "data-sidebar": "separator",
      className: f("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
      ...n
    }
  );
}
function uw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "content",
      className: f(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...n
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
      "data-sidebar": "group",
      className: f("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...n
    }
  );
}
function so({
  className: t,
  asChild: e = !1,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    e ? Ve : "div",
    {
      ref: n,
      "data-sidebar": "group-label",
      className: f(
        "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
        "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
        t
      ),
      ...o
    }
  );
}
function pp({
  className: t,
  asChild: e = !1,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    e ? Ve : "button",
    {
      ref: n,
      "data-sidebar": "group-action",
      className: f(
        "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...o
    }
  );
}
function lo({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "group-content",
      className: f("tw-w-full tw-text-sm", t),
      ...n
    }
  );
}
function mw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu",
      className: f("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...n
    }
  );
}
function hw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "li",
    {
      ref: e,
      "data-sidebar": "menu-item",
      className: f("tw-group/menu-item tw-relative", t),
      ...n
    }
  );
}
const fw = ce(
  "tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[active=true]:tw-bg-sidebar-accent data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",
        outline: "tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "tw-h-8 tw-text-sm",
        sm: "tw-h-7 tw-text-xs",
        lg: "tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function gw({
  asChild: t = !1,
  isActive: e = !1,
  variant: n = "default",
  size: o = "default",
  tooltip: a,
  className: i,
  ref: s,
  ...l
}) {
  const c = t ? Ve : "button", { state: w } = Tn(), d = /* @__PURE__ */ r(
    c,
    {
      ref: s,
      "data-sidebar": "menu-button",
      "data-size": o,
      "data-active": e,
      className: f(fw({ variant: n, size: o }), i),
      ...l
    }
  );
  return a ? (typeof a == "string" && (a = {
    children: a
  }), /* @__PURE__ */ p(Nt, { children: [
    /* @__PURE__ */ r(Tt, { asChild: !0, children: d }),
    /* @__PURE__ */ r(_t, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
  ] })) : d;
}
function up({
  className: t,
  asChild: e = !1,
  showOnHover: n = !1,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ r(
    e ? Ve : "button",
    {
      ref: o,
      "data-sidebar": "menu-action",
      className: f(
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
        // Increases the hit area of the button on mobile.
        "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        n && "tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",
        t
      ),
      ...a
    }
  );
}
function mp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      ref: e,
      "data-sidebar": "menu-badge",
      className: f(
        "tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground",
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...n
    }
  );
}
function hp({
  className: t,
  showIcon: e = !1,
  ref: n,
  ...o
}) {
  const a = Q.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-skeleton",
      className: f("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...o,
      children: [
        e && /* @__PURE__ */ r(rr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          rr,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // CSS custom property '--skeleton-width' is not in React.CSSProperties; cast is required
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": a
              }
            )
          }
        )
      ]
    }
  );
}
function fp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "ul",
    {
      ref: e,
      "data-sidebar": "menu-sub",
      className: f(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...n
    }
  );
}
function gp({
  ref: t,
  ...e
}) {
  return /* @__PURE__ */ r("li", { ref: t, ...e });
}
function bp({
  asChild: t = !1,
  size: e = "md",
  isActive: n,
  className: o,
  ref: a,
  ...i
}) {
  return /* @__PURE__ */ r(
    t ? Ve : "a",
    {
      ref: a,
      "data-sidebar": "menu-sub-button",
      "data-size": e,
      "data-active": n,
      className: f(
        "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
        "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
        e === "sm" && "tw-text-xs",
        e === "md" && "tw-text-sm",
        "group-data-[collapsible=icon]:tw-hidden",
        o
      ),
      ...i
    }
  );
}
function bw({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: c
}) {
  const w = B(
    (h, u) => {
      o(h, u);
    },
    [o]
  ), d = B(
    (h) => {
      const u = n.find((g) => g.projectId === h);
      return u ? u.projectName : h;
    },
    [n]
  ), m = B(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    dw,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: f("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ p(uw, { children: [
        /* @__PURE__ */ p(io, { children: [
          /* @__PURE__ */ r(so, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(lo, { children: /* @__PURE__ */ r(mw, { children: Object.entries(e).map(([h, u]) => /* @__PURE__ */ r(hw, { children: /* @__PURE__ */ r(
            gw,
            {
              onClick: () => w(h),
              isActive: m(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ p(io, { children: [
          /* @__PURE__ */ r(so, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(lo, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            Jn,
            {
              buttonVariant: "ghost",
              buttonClassName: f("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Rs },
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (h) => {
                const u = d(h);
                w(u, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(pi, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Cr = Ze(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const c = wt();
    return /* @__PURE__ */ p("div", { id: s, className: f("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        po,
        {
          className: f(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        nn,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (w) => e(w.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ p(
        F,
        {
          variant: "ghost",
          size: "icon",
          className: f(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(Pe, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Cr.displayName = "SearchBar";
function vp({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ p("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Cr,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      ww,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            bw,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: d
            }
          ),
          /* @__PURE__ */ r(pw, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Qt = "scrBook", vw = "scrRef", fe = "source", xw = "details", yw = "Scripture Reference", kw = "Scripture Book", _a = "Type", Nw = "Details";
function _w(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Qt,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? yw,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? ct.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Qt ? be(a.start) : void 0;
      },
      getGroupingValue: (o) => ct.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Un(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => be(o.start),
      id: vw,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : be(a.start);
      },
      sortingFn: (o, a) => Un(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: fe,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? _a : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: xw,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Nw,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Cw = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Un(t.start, t.end) === 0 ? `${Sn(t.start)}+${e}` : `${Sn(t.start)}+${e}-${Sn(t.end)}+${n}`;
}, co = (t) => `${Cw({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function xp({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l,
  id: c
}) {
  const [w, d] = S([]), [m, h] = S([{ id: Qt, desc: !1 }]), [u, g] = S({}), v = z(
    () => t.flatMap((C) => C.data.map((T) => ({
      ...T,
      source: C.source
    }))),
    [t]
  ), b = z(
    () => _w(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [o, i, s, n]
  );
  H(() => {
    w.includes(fe) ? h([
      { id: fe, desc: !1 },
      { id: Qt, desc: !1 }
    ]) : h([{ id: Qt, desc: !1 }]);
  }, [w]);
  const x = Vo({
    data: v,
    columns: b,
    state: {
      grouping: w,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: ks(),
    getGroupedRowModel: ys(),
    getCoreRowModel: jo(),
    getSortedRowModel: Lo(),
    getRowId: co,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  H(() => {
    if (l) {
      const C = x.getSelectedRowModel().rowsById, T = Object.keys(C);
      if (T.length === 1) {
        const V = v.find((P) => co(P) === T[0]) || void 0;
        V && l(V);
      }
    }
  }, [u, v, l, x]);
  const y = a ?? kw, k = i ?? _a, _ = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [Qt] },
    { label: `Group by ${k}`, value: [fe] },
    {
      label: `Group by ${y} and ${k}`,
      value: [Qt, fe]
    },
    {
      label: `Group by ${k} and ${y}`,
      value: [fe, Qt]
    }
  ], L = (C) => {
    d(JSON.parse(C));
  }, j = (C, T) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(T);
  }, I = (C, T) => C.getIsGrouped() ? "" : f("banded-row", T % 2 === 0 ? "even" : "odd"), D = (C, T, V) => {
    if (!((C == null ? void 0 : C.length) === 0 || T.depth < V.column.getGroupedIndex())) {
      if (T.getIsGrouped())
        switch (T.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (T.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ p("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ p(
      Me,
      {
        value: JSON.stringify(w),
        onValueChange: (C) => {
          L(C);
        },
        children: [
          /* @__PURE__ */ r(Ie, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Oe, {}) }),
          /* @__PURE__ */ r(Ae, { position: "item-aligned", children: /* @__PURE__ */ r(kc, { children: _.map((C) => /* @__PURE__ */ r(Ot, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(yr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(kr, { children: x.getHeaderGroups().map((C) => /* @__PURE__ */ r(te, { children: C.headers.filter((T) => T.column.columnDef.header).map((T) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(bn, { colSpan: T.colSpan, className: "top-0 tw-sticky", children: T.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          T.column.getCanGroup() ? /* @__PURE__ */ r(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${T.column.columnDef.header}`,
              onClick: T.column.getToggleGroupingHandler(),
              type: "button",
              children: T.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Ke(T.column.columnDef.header, T.getContext())
        ] }) }, T.id)
      )) }, C.id)) }),
      /* @__PURE__ */ r(Nr, { children: x.getRowModel().rows.map((C, T) => {
        const V = wt();
        return /* @__PURE__ */ r(
          te,
          {
            "data-state": C.getIsSelected() ? "selected" : "",
            className: f(I(C, T)),
            onClick: (P) => j(C, P),
            children: C.getVisibleCells().map((P) => {
              if (!(P.getIsPlaceholder() || P.column.columnDef.enableGrouping && !P.getIsGrouped() && (P.column.columnDef.id !== fe || !n)))
                return /* @__PURE__ */ r(
                  Se,
                  {
                    className: f(
                      P.column.columnDef.id,
                      "tw-p-[1px]",
                      D(w, C, P)
                    ),
                    children: P.getIsGrouped() ? /* @__PURE__ */ p(
                      F,
                      {
                        variant: "link",
                        onClick: C.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          C.getIsExpanded() && /* @__PURE__ */ r($e, {}),
                          !C.getIsExpanded() && (V === "ltr" ? /* @__PURE__ */ r(Re, {}) : /* @__PURE__ */ r(Bn, {})),
                          " ",
                          Ke(P.column.columnDef.cell, P.getContext()),
                          " (",
                          C.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ke(P.column.columnDef.cell, P.getContext())
                  },
                  P.id
                );
            })
          },
          C.id
        );
      }) })
    ] })
  ] });
}
const Er = (t, e) => t.filter((n) => {
  try {
    return Be(n) === e;
  } catch {
    return !1;
  }
}), Ca = (t, e, n) => Er(t, e).every((o) => n.includes(o));
function Ew({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Er(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: f(
        Ca(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: zs(
        t,
        s,
        l,
        c,
        w
      )
    }
  );
}
const wo = 5, jn = 6;
function Tw({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: v } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [b, x] = S(!1), [y, k] = S(""), _ = q(void 0), L = q(!1);
  if (t.length !== ct.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const j = z(() => ct.allBookIds.filter(
    (A, X) => t[X] === "1" && !ct.isObsolete(ct.bookIdToNumber(A))
  ), [t]), I = z(() => {
    if (!y.trim()) {
      const M = {
        [Y.OT]: [],
        [Y.NT]: [],
        [Y.DC]: [],
        [Y.Extra]: []
      };
      return j.forEach((W) => {
        const Ct = Be(W);
        M[Ct].push(W);
      }), M;
    }
    const A = j.filter(
      (M) => pr(M, y, a)
    ), X = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return A.forEach((M) => {
      const W = Be(M);
      X[W].push(M);
    }), X;
  }, [j, y, a]), D = B(
    (A, X = !1) => {
      if (!X || !_.current) {
        n(
          e.includes(A) ? e.filter((pt) => pt !== A) : [...e, A]
        ), _.current = A;
        return;
      }
      const M = j.findIndex((pt) => pt === _.current), W = j.findIndex((pt) => pt === A);
      if (M === -1 || W === -1) return;
      const [Ct, Dt] = [
        Math.min(M, W),
        Math.max(M, W)
      ], St = j.slice(Ct, Dt + 1).map((pt) => pt);
      n(
        e.includes(A) ? e.filter((pt) => !St.includes(pt)) : [.../* @__PURE__ */ new Set([...e, ...St])]
      );
    },
    [e, n, j]
  ), C = (A) => {
    D(A, L.current), L.current = !1;
  }, T = (A, X) => {
    A.preventDefault(), D(X, A.shiftKey);
  }, V = B(
    (A) => {
      const X = Er(j, A).map((M) => M);
      n(
        Ca(j, A, e) ? e.filter((M) => !X.includes(M)) : [.../* @__PURE__ */ new Set([...e, ...X])]
      );
    },
    [e, n, j]
  ), P = () => {
    n(j.map((A) => A));
  }, O = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Y).map((A) => /* @__PURE__ */ r(
      Ew,
      {
        section: A,
        availableBookIds: j,
        selectedBookIds: e,
        onToggle: V,
        localizedStrings: o
      },
      A
    )) }),
    /* @__PURE__ */ p(
      Xt,
      {
        open: b,
        onOpenChange: (A) => {
          x(A), A || k("");
        },
        children: [
          /* @__PURE__ */ r(ue, { asChild: !0, children: /* @__PURE__ */ p(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": b,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(go, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Wt, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            de,
            {
              shouldFilter: !1,
              onKeyDown: (A) => {
                A.key === "Enter" && (L.current = A.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  tn,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: k
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: P, children: c }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: O, children: w })
                ] }),
                /* @__PURE__ */ p(pe, { children: [
                  /* @__PURE__ */ r(kn, { children: d }),
                  Object.values(Y).map((A, X) => {
                    const M = I[A];
                    if (M.length !== 0)
                      return /* @__PURE__ */ p(yo, { children: [
                        /* @__PURE__ */ r(
                          Ht,
                          {
                            heading: Bo(A, h, u, g, v),
                            children: M.map((W) => /* @__PURE__ */ r(
                              Uo,
                              {
                                bookId: W,
                                isSelected: e.includes(W),
                                onSelect: () => C(W),
                                onMouseDown: (Ct) => T(Ct, W),
                                section: Be(W),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: Xn(W, a),
                                className: "tw-flex tw-items-center"
                              },
                              W
                            ))
                          }
                        ),
                        X < Object.values(Y).length - 1 && /* @__PURE__ */ r(Fo, {})
                      ] }, A);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    e.length > 0 && /* @__PURE__ */ p("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      e.slice(
        0,
        e.length === jn ? jn : wo
      ).map((A) => /* @__PURE__ */ r(Xe, { className: "hover:tw-bg-secondary", variant: "secondary", children: Te(A, a) }, A)),
      e.length > jn && /* @__PURE__ */ r(
        Xe,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - wo} ${m}`
        }
      )
    ] })
  ] });
}
const yp = Object.freeze([
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
]), me = (t, e) => t[e] ?? e;
function kp({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: l,
  id: c
}) {
  const w = me(
    s,
    "%webView_scope_selector_selected_text%"
  ), d = me(
    s,
    "%webView_scope_selector_current_verse%"
  ), m = me(
    s,
    "%webView_scope_selector_current_chapter%"
  ), h = me(s, "%webView_scope_selector_current_book%"), u = me(s, "%webView_scope_selector_choose_books%"), g = me(s, "%webView_scope_selector_scope%"), v = me(s, "%webView_scope_selector_select_books%"), b = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], x = e ? b.filter((y) => e.includes(y.value)) : b;
  return /* @__PURE__ */ p("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ut, { children: g }),
      /* @__PURE__ */ r(
        qo,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: x.map(({ value: y, label: k, id: _ }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Wn, { className: "tw-me-2", value: y, id: _ }),
            /* @__PURE__ */ r(ut, { htmlFor: _, children: k })
          ] }, _))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(ut, { children: v }),
      /* @__PURE__ */ r(
        Tw,
        {
          availableBookInfo: o,
          selectedBookIds: a,
          onChangeSelectedBookIds: i,
          localizedStrings: s,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const zn = {
  [Z("undefined")]: "Ø",
  [Z(0)]: "A",
  [Z(1)]: "B",
  [Z(2)]: "C",
  [Z(3)]: "D",
  [Z(4)]: "E",
  [Z(5)]: "F",
  [Z(6)]: "G",
  [Z(7)]: "H",
  [Z(8)]: "I",
  [Z(9)]: "J",
  [Z(10)]: "K",
  [Z(11)]: "L",
  [Z(12)]: "M",
  [Z(13)]: "N",
  [Z(14)]: "O",
  [Z(15)]: "P",
  [Z(16)]: "Q",
  [Z(17)]: "R",
  [Z(18)]: "S",
  [Z(19)]: "T",
  [Z(20)]: "U",
  [Z(21)]: "V",
  [Z(22)]: "W",
  [Z(23)]: "X",
  [Z(24)]: "Y",
  [Z(25)]: "Z"
};
function Np({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...zn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, d]) => [
          w,
          w === d && w in zn ? zn[w] : d
        ]
      )
    )
  }, c = wt();
  return /* @__PURE__ */ p(
    Me,
    {
      value: `${e}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(Ie, { size: a, className: f("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          Oe,
          {
            placeholder: l[Z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ae,
          {
            id: s,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: Le },
            children: t.map((w) => /* @__PURE__ */ r(Ot, { value: `${w}`, children: l[Z(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function _p({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Cp({
  primary: t,
  secondary: e,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Ep({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(We, {}) : ""
  ] });
}
function Ea(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function vn({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: f("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const Ta = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ p(Nt, { children: [
  /* @__PURE__ */ r(Tt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    nr,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r(vn, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r(vn, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(hc, { children: [
    /* @__PURE__ */ r(gc, { children: l.label }),
    /* @__PURE__ */ r(mc, { children: /* @__PURE__ */ r(bc, { children: Ta(
      t,
      e,
      Ea(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(_t, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function or({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(se, { variant: i, children: [
    /* @__PURE__ */ r(ye, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(ui, {}) }) }),
    /* @__PURE__ */ r(le, { align: "start", style: { zIndex: Le }, children: Object.entries(e.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, d) => /* @__PURE__ */ p(yo, { children: [
      /* @__PURE__ */ r(xa, { children: /* @__PURE__ */ r(kt, { children: Ta(e.groups, e.items, c, t) }) }),
      w < d.length - 1 && /* @__PURE__ */ r(en, {})
    ] }, c)) })
  ] });
}
const Sa = Q.forwardRef(
  ({ id: t, className: e, children: n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${e}`,
      id: t,
      children: n
    }
  )
);
function Tp({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: w
}) {
  return /* @__PURE__ */ p(Sa, { className: `tw-w-full tw-border ${i}`, id: a, children: [
    n && /* @__PURE__ */ r(
      or,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(mi, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        or,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(hi, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Sp({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(Sa, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    or,
    {
      onSelectMenuItem: t,
      menuData: e,
      tabLabel: "Project",
      icon: a,
      className: `tw-pointer-events-auto tw-shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Ra = Q.forwardRef(({ className: t, ...e }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    Pt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: f("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
Ra.displayName = Pt.List.displayName;
const Da = Q.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Pt.List,
  {
    ref: n,
    className: f(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Da.displayName = Pt.List.displayName;
const Sw = Q.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Pt.Trigger,
  {
    ref: n,
    ...e,
    className: f(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Ma = Q.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Pt.Content,
  {
    ref: n,
    className: f(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ma.displayName = Pt.Content.displayName;
function Rp({
  tabList: t,
  searchValue: e,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: i,
  id: s
}) {
  return /* @__PURE__ */ p("div", { id: s, className: "pr-twp", children: [
    /* @__PURE__ */ p("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        Cr,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(Ra, { children: [
      /* @__PURE__ */ r(Da, { children: t.map((l) => /* @__PURE__ */ r(Sw, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(Ma, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Rw({ ...t }) {
  return /* @__PURE__ */ r(jt.Menu, { ...t });
}
function Dw({ ...t }) {
  return /* @__PURE__ */ r(jt.Sub, { "data-slot": "menubar-sub", ...t });
}
function Mw({
  className: t,
  variant: e = "default",
  ref: n,
  ...o
}) {
  const a = Q.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(xr.Provider, { value: a, children: /* @__PURE__ */ r(
    jt.Root,
    {
      ref: n,
      className: f(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...o
    }
  ) });
}
function Ow({
  className: t,
  ref: e,
  ...n
}) {
  const o = Jt();
  return /* @__PURE__ */ r(
    jt.Trigger,
    {
      ref: e,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Ne({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...n
    }
  );
}
function Iw({
  className: t,
  inset: e,
  children: n,
  ref: o,
  ...a
}) {
  const i = Jt();
  return /* @__PURE__ */ p(
    jt.SubTrigger,
    {
      ref: o,
      className: f(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        Ne({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(Re, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
}
function Aw({
  className: t,
  ref: e,
  ...n
}) {
  const o = Jt();
  return /* @__PURE__ */ r(
    jt.SubContent,
    {
      ref: e,
      className: f(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": o.variant === "muted"
        },
        t
      ),
      ...n
    }
  );
}
function Pw({
  className: t,
  align: e = "start",
  alignOffset: n = -4,
  sideOffset: o = 8,
  ref: a,
  ...i
}) {
  const s = Jt();
  return /* @__PURE__ */ r(jt.Portal, { children: /* @__PURE__ */ r(
    jt.Content,
    {
      ref: a,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: f(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": s.variant === "muted"
        },
        t
      ),
      ...i
    }
  ) });
}
function $w({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  const a = Jt();
  return /* @__PURE__ */ r(
    jt.Item,
    {
      ref: n,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        Ne({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o
    }
  );
}
function Vw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    jt.Separator,
    {
      ref: e,
      className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
      ...n
    }
  );
}
const Fe = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Oa = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((w) => w.group === i).sort((w, d) => w.order - d.order).map((w) => /* @__PURE__ */ p(Nt, { children: [
      /* @__PURE__ */ r(Tt, { asChild: !0, children: "command" in w ? /* @__PURE__ */ p(
        $w,
        {
          onClick: () => {
            o(w);
          },
          children: [
            w.iconPathBefore && /* @__PURE__ */ r(vn, { icon: w.iconPathBefore, menuLabel: w.label, leading: !0 }),
            w.label,
            w.iconPathAfter && /* @__PURE__ */ r(vn, { icon: w.iconPathAfter, menuLabel: w.label })
          ]
        },
        `menubar-item-${w.label}-${w.command}`
      ) : /* @__PURE__ */ p(Dw, { children: [
        /* @__PURE__ */ r(Iw, { children: w.label }),
        /* @__PURE__ */ r(Aw, { children: Oa(
          t,
          e,
          Ea(t, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(_t, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && s < a.length - 1 && c.push(/* @__PURE__ */ r(Vw, {}, `separator-${i}`)), c;
  });
};
function Lw({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = q(void 0), i = q(void 0), s = q(void 0), l = q(void 0), c = q(void 0), w = (d) => {
    switch (d) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return l;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (Es(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, m) => {
    var g, v, b, x;
    d.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        Fe(i, [h]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), Fe(i, [h, u]);
        break;
      case "alt+l":
        (v = s.current) == null || v.focus(), Fe(s, [h, u]);
        break;
      case "alt+n":
        (b = l.current) == null || b.focus(), Fe(l, [h, u]);
        break;
      case "alt+h":
        (x = c.current) == null || x.focus(), Fe(c, [h, u]);
        break;
    }
  }), H(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const v = g.target.getAttribute("data-state");
          n(v === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(Mw, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, m]) => typeof d == "boolean" || typeof m == "boolean" ? 0 : d.order - m.order).map(([d, m]) => /* @__PURE__ */ p(Rw, { children: [
      /* @__PURE__ */ r(Ow, { ref: w(d), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        Pw,
        {
          style: { zIndex: Le },
          children: /* @__PURE__ */ r(kt, { children: Oa(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function Dp(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Mp({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: w = "default"
}) {
  const d = q(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-border tw-px-4 tw-text-foreground", o),
      ref: d,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ r(
                    Lw,
                    {
                      menuData: t,
                      onOpenChange: e,
                      onSelectMenuItem: n,
                      variant: w
                    }
                  )
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: l
              }
            ) })
          ]
        }
      )
    }
  );
}
const jw = (t, e) => t[e] ?? e;
function Op({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: l,
  id: c
}) {
  const w = jw(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, m] = S(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((v) => v !== g)]), i && n.find((v) => v === g) && i([...n.filter((v) => v !== g)]), m(!1);
  }, u = (g, v) => {
    var x, y, k, _, L, j;
    const b = v !== g ? ((y = (x = t[g]) == null ? void 0 : x.uiNames) == null ? void 0 : y[v]) ?? ((_ = (k = t[g]) == null ? void 0 : k.uiNames) == null ? void 0 : _.en) : void 0;
    return b ? `${(L = t[g]) == null ? void 0 : L.autonym} (${b})` : (j = t[g]) == null ? void 0 : j.autonym;
  };
  return /* @__PURE__ */ p("div", { id: c, className: f("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Me,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: h,
        open: d,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(Ie, { children: /* @__PURE__ */ r(Oe, {}) }),
          /* @__PURE__ */ r(
            Ae,
            {
              style: { zIndex: Le },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Ot, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(ut, { className: "tw-font-normal tw-text-muted-foreground", children: ge(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function zw({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(ut, { children: e(t) }) : n ? /* @__PURE__ */ r(ut, { children: n(t) }) : /* @__PURE__ */ r(ut, { children: t });
}
function Ip({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i,
  createComplexLabel: s
}) {
  return /* @__PURE__ */ r("div", { id: t, className: e, children: n.map((l) => /* @__PURE__ */ p("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      ka,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      zw,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function Ap({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: i,
  children: s,
  selectedButtons: l,
  hoverButtons: c,
  dropdownContent: w,
  additionalContent: d,
  accentColor: m,
  showDropdownOnHover: h = !1
}) {
  return /* @__PURE__ */ p(
    "div",
    {
      hidden: a,
      onClick: n,
      onKeyDown: (g) => {
        (g.key === "Enter" || g.key === " ") && (g.preventDefault(), n());
      },
      role: "button",
      tabIndex: 0,
      "aria-pressed": e,
      className: f(
        "tw-group tw-relative tw-min-w-36 tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !e },
        { "tw-bg-accent": e },
        { "tw-bg-transparent": !e },
        i
      ),
      children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-p-4", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ r("div", { className: "tw-min-w-0 tw-flex-1", children: s }),
            e && l,
            !e && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: c }),
            !e && h && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(se, { children: [
              /* @__PURE__ */ r(ye, { className: f(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Mr, {}) }) }),
              /* @__PURE__ */ r(le, { align: "end", children: w })
            ] }) }),
            e && w && /* @__PURE__ */ p(se, { children: [
              /* @__PURE__ */ r(ye, { className: f(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Mr, {}) }) }),
              /* @__PURE__ */ r(le, { align: "end", children: w })
            ] })
          ] }),
          d && /* @__PURE__ */ r("div", { className: "tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden", children: d })
        ] }),
        m && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${m}`
          }
        )
      ]
    },
    t
  );
}
const Fw = Ze(({ className: t, ...e }, n) => /* @__PURE__ */ r(fi, { size: 35, className: f("tw-animate-spin", t), ...e, ref: n }));
Fw.displayName = "Spinner";
function Pp({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: w,
  value: d,
  onChange: m,
  onFocus: h,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: f("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      ut,
      {
        htmlFor: t,
        className: f({
          "tw-text-red-600": n,
          "tw-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      nn,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: f(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: d,
        onChange: m,
        onFocus: h,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: f({ "tw-hidden": !a }), children: a })
  ] });
}
const Bw = ce(
  // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can use
  // images (or svgs from file) as icons
  // Implemented by TJ Couch
  // Approved by Alex Mercado
  // 20 February 2025
  "tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground [&>img~*]:tw-pl-7 [&>img+div]:tw-translate-y-[-3px] [&>img]:tw-absolute [&>img]:tw-left-4 [&>img]:tw-top-4 [&>img]:tw-text-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-background tw-text-foreground",
        destructive: (
          // CUSTOM: Copied all `svg` arbitrary selector variant classes as `img` variants so we can
          // use images (or svgs from file) as icons
          // Implemented by TJ Couch
          // Approved by Alex Mercado
          // 20 February 2025
          "tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive [&>img]:tw-text-destructive"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function $p({
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
      className: f(
        // CUSTOM
        "pr-twp",
        Bw({ variant: e }),
        t
      ),
      ...o
    }
  );
}
function Vp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ p(
    "h5",
    {
      ref: e,
      className: f("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...n,
      children: [
        n.children,
        " "
      ]
    }
  );
}
function Lp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r("div", { ref: e, className: f("tw-text-sm [&_p]:tw-leading-relaxed", t), ...n });
}
const jp = ht.Root, zp = ht.Trigger, Fp = ht.Group, Bp = ht.Portal, Kp = ht.Sub, Up = ht.RadioGroup;
function Gp({
  className: t,
  inset: e,
  children: n,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ p(
    ht.SubTrigger,
    {
      ref: o,
      className: f(
        "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        t
      ),
      ...a,
      children: [
        n,
        /* @__PURE__ */ r(Re, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
}
function qp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ht.SubContent,
    {
      ref: e,
      className: f(
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...n
    }
  );
}
function Hp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(ht.Portal, { children: /* @__PURE__ */ r(
    ht.Content,
    {
      ref: e,
      className: f(
        "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...n
    }
  ) });
}
function Yp({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    ht.Item,
    {
      ref: n,
      className: f(
        "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t
      ),
      ...o
    }
  );
}
function Xp({
  className: t,
  children: e,
  checked: n,
  ref: o,
  ...a
}) {
  return /* @__PURE__ */ p(
    ht.CheckboxItem,
    {
      ref: o,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t
      ),
      checked: n,
      ...a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(zt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
}
function Wp({
  className: t,
  children: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ p(
    ht.RadioItem,
    {
      ref: n,
      className: f(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t
      ),
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ht.ItemIndicator, { children: /* @__PURE__ */ r(ar, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
}
function Jp({
  className: t,
  inset: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    ht.Label,
    {
      ref: n,
      className: f(
        "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
        e && "tw-pl-8",
        t
      ),
      ...o
    }
  );
}
function Zp({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    ht.Separator,
    {
      ref: e,
      className: f("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
      ...n
    }
  );
}
function Qp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: f("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
const Ia = Q.createContext({
  direction: "bottom"
});
function tu({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = Q.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Ia.Provider, { value: o, children: /* @__PURE__ */ r(
    we.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
const eu = we.Trigger, Kw = we.Portal, nu = we.Close;
function Uw({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    we.Overlay,
    {
      ref: e,
      className: f("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
      ...n
    }
  );
}
function ru({
  className: t,
  children: e,
  hideDrawerHandle: n = !1,
  ref: o,
  ...a
}) {
  const { direction: i = "bottom" } = Q.useContext(Ia), s = {
    bottom: "tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px]",
    top: "tw-inset-x-0 tw-top-0 tw-mb-24 tw-rounded-b-[10px]",
    left: "tw-inset-y-0 tw-left-0 tw-mr-24 tw-rounded-r-[10px] tw-w-auto tw-max-w-sm",
    right: "tw-inset-y-0 tw-right-0 tw-ml-24 tw-rounded-l-[10px] tw-w-auto tw-max-w-sm"
  }, l = {
    bottom: "tw-mx-auto tw-mt-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    top: "tw-mx-auto tw-mb-4 tw-h-2 tw-w-[100px] tw-rounded-full tw-bg-muted",
    left: "tw-my-auto tw-mr-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted",
    right: "tw-my-auto tw-ml-4 tw-w-2 tw-h-[100px] tw-rounded-full tw-bg-muted"
  };
  return /* @__PURE__ */ p(Kw, { children: [
    /* @__PURE__ */ r(Uw, {}),
    /* @__PURE__ */ p(
      we.Content,
      {
        ref: o,
        className: f(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          i === "bottom" || i === "top" ? "tw-flex-col" : "tw-flex-row",
          s[i],
          t
        ),
        ...a,
        children: [
          !n && (i === "bottom" || i === "right") && /* @__PURE__ */ r("div", { className: l[i] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (i === "top" || i === "left") && /* @__PURE__ */ r("div", { className: l[i] })
        ]
      }
    )
  ] });
}
function ou({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: f("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
function au({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: f("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
function iu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    we.Title,
    {
      ref: e,
      className: f("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
      ...n
    }
  );
}
function su({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    we.Description,
    {
      ref: e,
      className: f("tw-text-sm tw-text-muted-foreground", t),
      ...n
    }
  );
}
function lu({
  className: t,
  value: e,
  ref: n,
  ...o
}) {
  return /* @__PURE__ */ r(
    zr.Root,
    {
      ref: n,
      className: f(
        "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r(
        zr.Indicator,
        {
          className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
          style: { transform: `translateX(-${100 - (e || 0)}%)` }
        }
      )
    }
  );
}
function cu({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    wr.PanelGroup,
    {
      className: f(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const wu = wr.Panel;
function du({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    wr.PanelResizeHandle,
    {
      className: f(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(gi, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function pu({ ...t }) {
  return /* @__PURE__ */ r(
    Ts,
    {
      className: "tw-toaster tw-group",
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
function uu({
  className: t,
  ref: e,
  ...n
}) {
  const o = wt();
  return /* @__PURE__ */ p(
    an.Root,
    {
      ref: e,
      className: f(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...n,
      dir: o,
      children: [
        /* @__PURE__ */ r(an.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(an.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(an.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
}
function mu({
  className: t,
  ref: e,
  ...n
}) {
  const o = wt();
  return /* @__PURE__ */ r(
    Fr.Root,
    {
      className: f(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...n,
      ref: e,
      children: /* @__PURE__ */ r(
        Fr.Thumb,
        {
          className: f(
            "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
            {
              "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": o === "ltr"
            },
            {
              "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": o === "rtl"
            }
          )
        }
      )
    }
  );
}
const hu = Pt.Root;
function fu({
  className: t,
  ref: e,
  ...n
}) {
  const o = wt();
  return /* @__PURE__ */ r(
    Pt.List,
    {
      ref: e,
      className: f(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...n,
      dir: o
    }
  );
}
function gu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Pt.Trigger,
    {
      ref: e,
      className: f(
        "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
        t
      ),
      ...n
    }
  );
}
function bu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Pt.Content,
    {
      ref: e,
      className: f(
        "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
        t
      ),
      ...n
    }
  );
}
function vu({
  className: t,
  ref: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "textarea",
    {
      className: f(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: e,
      ...n
    }
  );
}
const xu = (t, e) => {
  H(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Gw(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const qw = (t, e, n = {}) => {
  const o = q(e);
  o.current = e;
  const a = q(n);
  a.current = Gw(a.current);
  const [i, s] = S(() => o.current), [l, c] = S(!0);
  return H(() => {
    let w = !0;
    return c(!!t), (async () => {
      if (t) {
        const d = await t();
        w && (s(() => d), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, l];
}, Fn = () => !1, yu = (t, e) => {
  const [n] = qw(
    B(async () => {
      if (!t) return Fn;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    Fn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  H(() => () => {
    n !== Fn && n();
  }, [n]);
};
function ku(t) {
  H(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Hw(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Hw(`*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x:  ;
  --tw-pan-y:  ;
  --tw-pinch-zoom:  ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position:  ;
  --tw-gradient-via-position:  ;
  --tw-gradient-to-position:  ;
  --tw-ordinal:  ;
  --tw-slashed-zero:  ;
  --tw-numeric-figure:  ;
  --tw-numeric-spacing:  ;
  --tw-numeric-fraction:  ;
  --tw-ring-inset:  ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur:  ;
  --tw-brightness:  ;
  --tw-contrast:  ;
  --tw-grayscale:  ;
  --tw-hue-rotate:  ;
  --tw-invert:  ;
  --tw-saturate:  ;
  --tw-sepia:  ;
  --tw-drop-shadow:  ;
  --tw-backdrop-blur:  ;
  --tw-backdrop-brightness:  ;
  --tw-backdrop-contrast:  ;
  --tw-backdrop-grayscale:  ;
  --tw-backdrop-hue-rotate:  ;
  --tw-backdrop-invert:  ;
  --tw-backdrop-opacity:  ;
  --tw-backdrop-saturate:  ;
  --tw-backdrop-sepia:  ;
  --tw-contain-size:  ;
  --tw-contain-layout:  ;
  --tw-contain-paint:  ;
  --tw-contain-style:  ;
}/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*:where(.pr-twp,.pr-twp *),
::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html:where(.pr-twp,.pr-twp *),
:host:where(.pr-twp,.pr-twp *) {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */ /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body:where(.pr-twp,.pr-twp *) {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr:where(.pr-twp,.pr-twp *) {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]):where(.pr-twp,.pr-twp *) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *) {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a:where(.pr-twp,.pr-twp *) {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b:where(.pr-twp,.pr-twp *),
strong:where(.pr-twp,.pr-twp *) {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code:where(.pr-twp,.pr-twp *),
kbd:where(.pr-twp,.pr-twp *),
samp:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small:where(.pr-twp,.pr-twp *) {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub:where(.pr-twp,.pr-twp *),
sup:where(.pr-twp,.pr-twp *) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub:where(.pr-twp,.pr-twp *) {
  bottom: -0.25em;
}

sup:where(.pr-twp,.pr-twp *) {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table:where(.pr-twp,.pr-twp *) {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button:where(.pr-twp,.pr-twp *),
input:where(.pr-twp,.pr-twp *),
optgroup:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *),
textarea:where(.pr-twp,.pr-twp *) {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *) {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button:where(.pr-twp,.pr-twp *),
input:where([type='button']):where(.pr-twp,.pr-twp *),
input:where([type='reset']):where(.pr-twp,.pr-twp *),
input:where([type='submit']):where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring:where(.pr-twp,.pr-twp *) {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid:where(.pr-twp,.pr-twp *) {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress:where(.pr-twp,.pr-twp *) {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button:where(.pr-twp,.pr-twp *),
::-webkit-outer-spin-button:where(.pr-twp,.pr-twp *) {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search']:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary:where(.pr-twp,.pr-twp *) {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote:where(.pr-twp,.pr-twp *),
dl:where(.pr-twp,.pr-twp *),
dd:where(.pr-twp,.pr-twp *),
h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *),
hr:where(.pr-twp,.pr-twp *),
figure:where(.pr-twp,.pr-twp *),
p:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  margin: 0;
}

fieldset:where(.pr-twp,.pr-twp *) {
  margin: 0;
  padding: 0;
}

legend:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

ol:where(.pr-twp,.pr-twp *),
ul:where(.pr-twp,.pr-twp *),
menu:where(.pr-twp,.pr-twp *) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea:where(.pr-twp,.pr-twp *) {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder:where(.pr-twp,.pr-twp *),
textarea::placeholder:where(.pr-twp,.pr-twp *) {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button:where(.pr-twp,.pr-twp *),
[role="button"]:where(.pr-twp,.pr-twp *) {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled:where(.pr-twp,.pr-twp *) {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img:where(.pr-twp,.pr-twp *),
svg:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *),
canvas:where(.pr-twp,.pr-twp *),
audio:where(.pr-twp,.pr-twp *),
iframe:where(.pr-twp,.pr-twp *),
embed:where(.pr-twp,.pr-twp *),
object:where(.pr-twp,.pr-twp *) {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *) {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
  display: none;
}
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /**
   * Theme colors and other CSS variable properties in Platform.Bible. These are applied in CSS
   * properties using \`hsl(var(--variableName))\` or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's [Matching Application
   * Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
  /* ["Slate" base theme by shadcn/ui](https://ui.shadcn.com/docs/theming#slate) */
  :root {
    --background: 0 0% 100%; /* white */
    --foreground: 222.2 84% 4.9%; /* slate-950 */
    --card: 0 0% 100%; /* white */
    --card-foreground: 222.2 84% 4.9%; /* slate-950 */
    --popover: 210 20% 98%; /* popover platform */
    --popover-foreground: 222.2 84% 4.9%; /* slate-950 */
    --primary: 222.2 47.4% 11.2%; /* slate-900 */
    --primary-foreground: 210 40% 98%; /* slate-50 */
    --secondary: 210 50% 95%;
    --secondary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --muted: 210 50% 95%;
    --muted-foreground: 215.4 16.3% 46.9%; /* slate-500 */
    --accent: 210 50% 95%;
    --accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 214.3 31.8% 91.4%; /* slate-200 */
    --input: 214.3 31.8% 91.4%; /* slate-200 */
    --ring: 222.2 84% 4.9%; /* slate-950 */

    --sidebar-background: 210 20% 98%; /* popover platform */
    --sidebar-foreground: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-primary: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-primary-foreground: 210 40% 98%; /* slate-50 */
    --sidebar-accent: 210 50% 95%;
    --sidebar-accent-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-border: 214.3 31.8% 91.4%; /* slate-200 */
    --sidebar-ring: 222.2 84% 4.9%; /* slate-950 */

    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%; /* slate-950 */
    --foreground: 210 40% 98%; /* slate-50 */
    --card: 222.2 84% 4.9%; /* slate-950 */
    --card-foreground: 210 40% 98%; /* slate-50 */
    --popover: 222.2 84% 4.9%; /* slate-950 */
    --popover-foreground: 210 40% 98%; /* slate-50 */
    --primary: 210 40% 98%; /* slate-50 */
    --primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --secondary: 217.2 32.6% 17.5%; /* slate-800 */
    --secondary-foreground: 210 40% 98%; /* slate-50 */
    --muted: 217.2 32.6% 17.5%; /* slate-800 */
    --muted-foreground: 215 20.2% 65.1%; /* slate-400 */
    --accent: 217.2 32.6% 17.5%; /* slate-800 */
    --accent-foreground: 210 40% 98%; /* slate-50 */
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%; /* slate-50 */
    --border: 215.3 19.3% 34.5%; /* slate-600 */
    --input: 215.3 19.3% 34.5%; /* slate-600 */
    --ring: 212.7 26.8% 83.9%; /* slate-300 */

    --sidebar-background: 222.2 84% 4.9%; /* slate-950 */
    --sidebar-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-primary: 210 40% 98%; /* slate-50 */
    --sidebar-primary-foreground: 222.2 47.4% 11.2%; /* slate-900 */
    --sidebar-accent: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-accent-foreground: 215 20.2% 65.1%; /* slate-400 */
    --sidebar-border: 217.2 32.6% 17.5%; /* slate-800 */
    --sidebar-ring: 212.7 26.8% 83.9%; /* slate-300 */
  }

  /* Palette built in https://tweakcn.com/themes/cmeukcpoj000204l45lxw5a74 based on "Caffeine" theme*/
  .pr-twp,
  .pr-twp * {
  border-color: hsl(var(--border));
  outline-color: hsl(var(--ring) / 0.5);
}

  /**
    * disabled because tslint does not like it, but it is the selector that's needed
    */
  /* stylelint-disable-next-line selector-no-qualifying-type */
  body.pr-twp {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "“""”""‘""’";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: hsl(var(--foreground));
  --tw-prose-headings: hsl(var(--foreground));
  --tw-prose-lead: hsl(var(--muted-foreground));
  --tw-prose-links: hsl(var(--primary));
  --tw-prose-bold: hsl(var(--foreground));
  --tw-prose-counters: hsl(var(--muted-foreground));
  --tw-prose-bullets: hsl(var(--muted-foreground));
  --tw-prose-hr: hsl(var(--border));
  --tw-prose-quotes: hsl(var(--foreground));
  --tw-prose-quote-borders: hsl(var(--border));
  --tw-prose-captions: hsl(var(--muted-foreground));
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: hsl(var(--foreground));
  --tw-prose-pre-code: hsl(var(--muted-foreground));
  --tw-prose-pre-bg: hsl(var(--muted));
  --tw-prose-th-borders: hsl(var(--border));
  --tw-prose-td-borders: hsl(var(--border));
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-sm {
  font-size: 0.875rem;
  line-height: 1.7142857;
}
.tw-prose-sm :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  line-height: 1.5555556;
  margin-top: 0.8888889em;
  margin-bottom: 0.8888889em;
}
.tw-prose-sm :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.3333333em;
  margin-bottom: 1.3333333em;
  padding-inline-start: 1.1111111em;
}
.tw-prose-sm :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 2.1428571em;
  margin-top: 0;
  margin-bottom: 0.8em;
  line-height: 1.2;
}
.tw-prose-sm :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.4285714em;
  margin-top: 1.6em;
  margin-bottom: 0.8em;
  line-height: 1.4;
}
.tw-prose-sm :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 1.2857143em;
  margin-top: 1.5555556em;
  margin-bottom: 0.4444444em;
  line-height: 1.5555556;
}
.tw-prose-sm :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.4285714em;
  margin-bottom: 0.5714286em;
  line-height: 1.4285714;
}
.tw-prose-sm :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  border-radius: 0.3125rem;
  padding-top: 0.1428571em;
  padding-inline-end: 0.3571429em;
  padding-bottom: 0.1428571em;
  padding-inline-start: 0.3571429em;
}
.tw-prose-sm :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
}
.tw-prose-sm :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.9em;
}
.tw-prose-sm :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8888889em;
}
.tw-prose-sm :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.6666667;
  margin-top: 1.6666667em;
  margin-bottom: 1.6666667em;
  border-radius: 0.25rem;
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  margin-bottom: 0.2857143em;
}
.tw-prose-sm :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.4285714em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(.tw-prose-sm > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5714286em;
  margin-bottom: 0.5714286em;
}
.tw-prose-sm :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
  margin-bottom: 1.1428571em;
}
.tw-prose-sm :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.1428571em;
}
.tw-prose-sm :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.2857143em;
  padding-inline-start: 1.5714286em;
}
.tw-prose-sm :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2.8571429em;
  margin-bottom: 2.8571429em;
}
.tw-prose-sm :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.5;
}
.tw-prose-sm :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.6666667em;
  padding-inline-end: 1em;
  padding-bottom: 0.6666667em;
  padding-inline-start: 1em;
}
.tw-prose-sm :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose-sm :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose-sm :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
}
.tw-prose-sm :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose-sm :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-size: 0.8571429em;
  line-height: 1.3333333;
  margin-top: 0.6666667em;
}
.tw-prose-sm :where(.tw-prose-sm > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose-sm :where(.tw-prose-sm > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-prose-quoteless :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose-quoteless :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-pointer-events-auto {
  pointer-events: auto;
}
.tw-invisible {
  visibility: hidden;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw--left-\\[1px\\] {
  left: -1px;
}
.tw--right-1 {
  right: -0.25rem;
}
.tw--top-\\[1px\\] {
  top: -1px;
}
.tw-bottom-0 {
  bottom: 0px;
}
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-4 {
  left: 1rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-start-2 {
  inset-inline-start: 0.5rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-50 {
  z-index: 50;
}
.tw-col-span-1 {
  grid-column: span 1 / span 1;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-col-span-3 {
  grid-column: span 3 / span 3;
}
.tw-col-start-1 {
  grid-column-start: 1;
}
.tw-row-span-2 {
  grid-row: span 2 / span 2;
}
.tw-row-start-2 {
  grid-row-start: 2;
}
.tw-m-0 {
  margin: 0px;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-0 {
  margin-left: 0px;
  margin-right: 0px;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
}
.tw-mx-8 {
  margin-left: 2rem;
  margin-right: 2rem;
}
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2\\.5 {
  margin-top: 0.625rem;
  margin-bottom: 0.625rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-my-auto {
  margin-top: auto;
  margin-bottom: auto;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-24 {
  margin-bottom: 6rem;
}
.tw-mb-3 {
  margin-bottom: 0.75rem;
}
.tw-mb-4 {
  margin-bottom: 1rem;
}
.tw-me-1 {
  margin-inline-end: 0.25rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-24 {
  margin-left: 6rem;
}
.tw-ml-4 {
  margin-left: 1rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-mr-24 {
  margin-right: 6rem;
}
.tw-mr-3 {
  margin-right: 0.75rem;
}
.tw-mr-4 {
  margin-right: 1rem;
}
.tw-ms-1 {
  margin-inline-start: 0.25rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-24 {
  margin-top: 6rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-6 {
  margin-top: 1.5rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-line-clamp-3 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-size-4 {
  width: 1rem;
  height: 1rem;
}
.tw-h-1 {
  height: 0.25rem;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-32 {
  height: 8rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-40 {
  height: 10rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-64 {
  height: 16rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100px\\] {
  height: 100px;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[300px\\] {
  height: 300px;
}
.tw-h-\\[5px\\] {
  height: 5px;
}
.tw-h-\\[calc\\(100\\%-2px\\)\\] {
  height: calc(100% - 2px);
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-10 {
  max-height: 2.5rem;
}
.tw-max-h-5 {
  max-height: 1.25rem;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[--radix-context-menu-content-available-height\\] {
  max-height: var(--radix-context-menu-content-available-height);
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-max-h-\\[96\\%\\] {
  max-height: 96%;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-11 {
  min-height: 2.75rem;
}
.tw-min-h-\\[80px\\] {
  min-height: 80px;
}
.tw-min-h-svh {
  min-height: 100svh;
}
.tw-w-1 {
  width: 0.25rem;
}
.tw-w-1\\/2 {
  width: 50%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-12 {
  width: 3rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-24 {
  width: 6rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-32 {
  width: 8rem;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-4\\/5 {
  width: 80%;
}
.tw-w-4\\/6 {
  width: 66.666667%;
}
.tw-w-48 {
  width: 12rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-5\\/6 {
  width: 83.333333%;
}
.tw-w-56 {
  width: 14rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-60 {
  width: 15rem;
}
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-80 {
  width: 20rem;
}
.tw-w-9 {
  width: 2.25rem;
}
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[180px\\] {
  width: 180px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[250px\\] {
  width: 250px;
}
.tw-w-\\[280px\\] {
  width: 280px;
}
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
}
.tw-w-\\[500px\\] {
  width: 500px;
}
.tw-w-\\[5px\\] {
  width: 5px;
}
.tw-w-\\[600px\\] {
  width: 600px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-\\[calc\\(100\\%-2px\\)\\] {
  width: calc(100% - 2px);
}
.tw-w-auto {
  width: auto;
}
.tw-w-fit {
  width: fit-content;
}
.tw-w-full {
  width: 100%;
}
.tw-w-max {
  width: max-content;
}
.tw-w-px {
  width: 1px;
}
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-16 {
  min-width: 4rem;
}
.tw-min-w-36 {
  min-width: 9rem;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-8 {
  min-width: 2rem;
}
.tw-min-w-80 {
  min-width: 20rem;
}
.tw-min-w-\\[12rem\\] {
  min-width: 12rem;
}
.tw-min-w-\\[140px\\] {
  min-width: 140px;
}
.tw-min-w-\\[215px\\] {
  min-width: 215px;
}
.tw-min-w-\\[26px\\] {
  min-width: 26px;
}
.tw-min-w-\\[500px\\] {
  min-width: 500px;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-min-w-min {
  min-width: min-content;
}
.tw-max-w-2xl {
  max-width: 42rem;
}
.tw-max-w-3xl {
  max-width: 48rem;
}
.tw-max-w-48 {
  max-width: 12rem;
}
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-5 {
  max-width: 1.25rem;
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-6xl {
  max-width: 72rem;
}
.tw-max-w-96 {
  max-width: 24rem;
}
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-\\[200px\\] {
  max-width: 200px;
}
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-fit {
  max-width: fit-content;
}
.tw-max-w-full {
  max-width: 100%;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-md {
  max-width: 28rem;
}
.tw-max-w-none {
  max-width: none;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
}
.tw-shrink {
  flex-shrink: 1;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-grow-\\[10\\] {
  flex-grow: 10;
}
.tw-grow-\\[1\\] {
  flex-grow: 1;
}
.tw-basis-0 {
  flex-basis: 0px;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw-border-collapse {
  border-collapse: collapse;
}
.tw-origin-\\[--radix-context-menu-content-transform-origin\\] {
  transform-origin: var(--radix-context-menu-content-transform-origin);
}
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-ew-resize {
  cursor: ew-resize;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-resize {
  resize: both;
}
.tw-scroll-m-20 {
  scroll-margin: 5rem;
}
.tw-list-inside {
  list-style-position: inside;
}
.tw-list-outside {
  list-style-position: outside;
}
.\\!tw-list-\\[lower-alpha\\] {
  list-style-type: lower-alpha !important;
}
.\\!tw-list-\\[lower-roman\\] {
  list-style-type: lower-roman !important;
}
.\\!tw-list-\\[upper-alpha\\] {
  list-style-type: upper-alpha !important;
}
.\\!tw-list-\\[upper-roman\\] {
  list-style-type: upper-roman !important;
}
.\\!tw-list-decimal {
  list-style-type: decimal !important;
}
.\\!tw-list-disc {
  list-style-type: disc !important;
}
.tw-list-decimal {
  list-style-type: decimal;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-list-none {
  list-style-type: none;
}
.tw-grid-flow-col {
  grid-auto-flow: column;
}
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.tw-grid-cols-4 {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}
.tw-grid-cols-6 {
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-grid-cols-\\[min-content_1fr\\] {
  grid-template-columns: min-content 1fr;
}
.tw-grid-cols-\\[min-content_min-content_1fr\\] {
  grid-template-columns: min-content min-content 1fr;
}
.tw-grid-cols-subgrid {
  grid-template-columns: subgrid;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-row-reverse {
  flex-direction: row-reverse;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-content-center {
  align-content: center;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-end {
  align-items: flex-end;
}
.tw-items-center {
  align-items: center;
}
.tw-items-baseline {
  align-items: baseline;
}
.tw-items-stretch {
  align-items: stretch;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0 {
  gap: 0px;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-5 {
  gap: 1.25rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-\\[12px\\] {
  gap: 12px;
}
.tw-gap-x-1 {
  column-gap: 0.25rem;
}
.tw-gap-x-2 {
  column-gap: 0.5rem;
}
.tw-gap-x-3 {
  column-gap: 0.75rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-gap-y-1 {
  row-gap: 0.25rem;
}
.tw-gap-y-2 {
  row-gap: 0.5rem;
}
.tw-space-x-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.25rem * var(--tw-space-x-reverse));
  margin-left: calc(0.25rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-space-y-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-8 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(2rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(2rem * var(--tw-space-y-reverse));
}
.tw-divide-x > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-x-reverse: 0;
  border-right-width: calc(1px * var(--tw-divide-x-reverse));
  border-left-width: calc(1px * calc(1 - var(--tw-divide-x-reverse)));
}
.tw-divide-y > :not([hidden]) ~ :not([hidden]) {
  --tw-divide-y-reverse: 0;
  border-top-width: calc(1px * calc(1 - var(--tw-divide-y-reverse)));
  border-bottom-width: calc(1px * var(--tw-divide-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-clip {
  overflow: clip;
}
.tw-overflow-visible {
  overflow: visible;
}
.tw-overflow-scroll {
  overflow: scroll;
}
.tw-overflow-x-auto {
  overflow-x: auto;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-text-clip {
  text-overflow: clip;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded {
  border-radius: 0.25rem;
}
.tw-rounded-2xl {
  border-radius: 1rem;
}
.tw-rounded-\\[6px\\] {
  border-radius: 6px;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-none {
  border-radius: 0px;
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-xl {
  border-radius: 0.75rem;
}
.tw-rounded-b-\\[10px\\] {
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-e-none {
  border-start-end-radius: 0px;
  border-end-end-radius: 0px;
}
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-l-lg {
  border-top-left-radius: var(--radius);
  border-bottom-left-radius: var(--radius);
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
}
.tw-rounded-s-none {
  border-start-start-radius: 0px;
  border-end-start-radius: 0px;
}
.tw-rounded-t-\\[10px\\] {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-l-4 {
  border-left-width: 4px;
}
.tw-border-s-0 {
  border-inline-start-width: 0px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-none {
  border-style: none;
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-400 {
  --tw-border-opacity: 1;
  border-color: rgb(96 165 250 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-border {
  border-color: hsl(var(--border));
}
.tw-border-border\\/50 {
  border-color: hsl(var(--border) / 0.5);
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-muted-foreground {
  border-color: hsl(var(--muted-foreground));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-300 {
  --tw-border-opacity: 1;
  border-color: rgb(252 165 165 / var(--tw-border-opacity, 1));
}
.tw-border-red-400 {
  --tw-border-opacity: 1;
  border-color: rgb(248 113 113 / var(--tw-border-opacity, 1));
}
.tw-border-red-500 {
  --tw-border-opacity: 1;
  border-color: rgb(239 68 68 / var(--tw-border-opacity, 1));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-ring {
  border-color: hsl(var(--ring));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-slate-300 {
  --tw-border-opacity: 1;
  border-color: rgb(203 213 225 / var(--tw-border-opacity, 1));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-yellow-400 {
  --tw-border-opacity: 1;
  border-color: rgb(250 204 21 / var(--tw-border-opacity, 1));
}
.tw-border-yellow-500 {
  --tw-border-opacity: 1;
  border-color: rgb(234 179 8 / var(--tw-border-opacity, 1));
}
.tw-border-s-amber-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(253 230 138 / var(--tw-border-opacity, 1));
}
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.\\!tw-bg-destructive\\/50 {
  background-color: hsl(var(--destructive) / 0.5) !important;
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-background\\/50 {
  background-color: hsl(var(--background) / 0.5);
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(219 234 254 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(96 165 250 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 246 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(59 130 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(249 250 251 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(107 114 128 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(220 252 231 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(240 253 244 / var(--tw-bg-opacity, 1));
}
.tw-bg-green-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(34 197 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
}
.tw-bg-orange-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 237 213 / var(--tw-bg-opacity, 1));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-purple-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(250 245 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 226 226 / var(--tw-bg-opacity, 1));
}
.tw-bg-red-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(239 68 68 / var(--tw-bg-opacity, 1));
}
.tw-bg-rose-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(244 63 94 / var(--tw-bg-opacity, 1));
}
.tw-bg-rose-500\\/15 {
  background-color: rgb(244 63 94 / 0.15);
}
.tw-bg-rose-500\\/5 {
  background-color: rgb(244 63 94 / 0.05);
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-accent {
  background-color: hsl(var(--sidebar-accent));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-sky-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(14 165 233 / var(--tw-bg-opacity, 1));
}
.tw-bg-sky-500\\/15 {
  background-color: rgb(14 165 233 / 0.15);
}
.tw-bg-sky-500\\/5 {
  background-color: rgb(14 165 233 / 0.05);
}
.tw-bg-teal-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(20 184 166 / var(--tw-bg-opacity, 1));
}
.tw-bg-teal-500\\/15 {
  background-color: rgb(20 184 166 / 0.15);
}
.tw-bg-teal-500\\/5 {
  background-color: rgb(20 184 166 / 0.05);
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 249 195 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 252 232 / var(--tw-bg-opacity, 1));
}
.tw-bg-yellow-500 {
  --tw-bg-opacity: 1;
  background-color: rgb(234 179 8 / var(--tw-bg-opacity, 1));
}
.tw-bg-zinc-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(161 161 170 / var(--tw-bg-opacity, 1));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-fill-destructive {
  fill: hsl(var(--destructive));
}
.tw-fill-yellow-400 {
  fill: #facc15;
}
.tw-fill-yellow-400\\/50 {
  fill: rgb(250 204 21 / 0.5);
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-0\\.5 {
  padding: 0.125rem;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-3 {
  padding: 0.75rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[10px\\] {
  padding: 10px;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-0 {
  padding-left: 0px;
  padding-right: 0px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-0 {
  padding-top: 0px;
  padding-bottom: 0px;
}
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-py-8 {
  padding-top: 2rem;
  padding-bottom: 2rem;
}
.\\!tw-pr-10 {
  padding-right: 2.5rem !important;
}
.tw-pb-0 {
  padding-bottom: 0px;
}
.tw-pb-16 {
  padding-bottom: 4rem;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-24 {
  padding-bottom: 6rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pb-8 {
  padding-bottom: 2rem;
}
.tw-pe-1 {
  padding-inline-end: 0.25rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pe-\\[calc\\(138px\\+1rem\\)\\] {
  padding-inline-end: calc(138px + 1rem);
}
.tw-pl-2 {
  padding-left: 0.5rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-6 {
  padding-left: 1.5rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-0 {
  padding-right: 0px;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-ps-9 {
  padding-inline-start: 2.25rem;
}
.tw-ps-\\[85px\\] {
  padding-inline-start: 85px;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-1 {
  padding-top: 0.25rem;
}
.tw-pt-2 {
  padding-top: 0.5rem;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-6 {
  padding-top: 1.5rem;
}
.tw-text-left {
  text-align: left;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-font-mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}
.tw-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-extrabold {
  font-weight: 800;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-italic {
  font-style: italic;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-loose {
  line-height: 2;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-leading-tight {
  line-height: 1.25;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-blue-400 {
  --tw-text-opacity: 1;
  color: rgb(96 165 250 / var(--tw-text-opacity, 1));
}
.tw-text-blue-500 {
  --tw-text-opacity: 1;
  color: rgb(59 130 246 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}
.tw-text-blue-800 {
  --tw-text-opacity: 1;
  color: rgb(30 64 175 / var(--tw-text-opacity, 1));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-foreground\\/30 {
  color: hsl(var(--foreground) / 0.3);
}
.tw-text-foreground\\/50 {
  color: hsl(var(--foreground) / 0.5);
}
.tw-text-foreground\\/70 {
  color: hsl(var(--foreground) / 0.7);
}
.tw-text-gray-300 {
  --tw-text-opacity: 1;
  color: rgb(209 213 219 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-green-600 {
  --tw-text-opacity: 1;
  color: rgb(22 163 74 / var(--tw-text-opacity, 1));
}
.tw-text-green-700 {
  --tw-text-opacity: 1;
  color: rgb(21 128 61 / var(--tw-text-opacity, 1));
}
.tw-text-green-800 {
  --tw-text-opacity: 1;
  color: rgb(22 101 52 / var(--tw-text-opacity, 1));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-muted-foreground\\/50 {
  color: hsl(var(--muted-foreground) / 0.5);
}
.tw-text-orange-800 {
  --tw-text-opacity: 1;
  color: rgb(154 52 18 / var(--tw-text-opacity, 1));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-purple-900 {
  --tw-text-opacity: 1;
  color: rgb(88 28 135 / var(--tw-text-opacity, 1));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-red-700 {
  --tw-text-opacity: 1;
  color: rgb(185 28 28 / var(--tw-text-opacity, 1));
}
.tw-text-red-800 {
  --tw-text-opacity: 1;
  color: rgb(153 27 27 / var(--tw-text-opacity, 1));
}
.tw-text-rose-600 {
  --tw-text-opacity: 1;
  color: rgb(225 29 72 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-accent-foreground {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-sky-600 {
  --tw-text-opacity: 1;
  color: rgb(2 132 199 / var(--tw-text-opacity, 1));
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-teal-600 {
  --tw-text-opacity: 1;
  color: rgb(13 148 136 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-400 {
  --tw-text-opacity: 1;
  color: rgb(250 204 21 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-600 {
  --tw-text-opacity: 1;
  color: rgb(202 138 4 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-700 {
  --tw-text-opacity: 1;
  color: rgb(161 98 7 / var(--tw-text-opacity, 1));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-line-through {
  text-decoration-line: line-through;
}
.tw-decoration-destructive {
  text-decoration-color: hsl(var(--destructive));
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-100 {
  opacity: 1;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-2 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-primary {
  --tw-ring-color: hsl(var(--primary));
}
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-2 {
  --tw-ring-offset-width: 2px;
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-ease-linear {
  transition-timing-function: linear;
}
@keyframes enter {

  from {
    opacity: var(--tw-enter-opacity, 1);
    transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
  }
}
@keyframes exit {

  to {
    opacity: var(--tw-exit-opacity, 1);
    transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
  }
}
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-fade-in-80 {
  --tw-enter-opacity: 0.8;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-\\@container\\/toolbar {
  container-type: inline-size;
  container-name: toolbar;
}
.\\[--lexical-indent-base-value\\:40px\\] {
  --lexical-indent-base-value: 40px;
}

/*
 * WARNING: These themes are also represented in paranext-core/src/shared/data/themes.data.json!
 * Please update in both locations
*/
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */
/* #endregion */

/* Note that the following region is from shadcn/ui's styles
 * https://ui.shadcn.com/docs/installation/manual#configure-styles but is scoped down to .pr-twp
 * because this is just a component library and should not apply its styles to the entire page.
 *
 * There is now a section in this library's README.md that explains how to apply these styles to the
 * entire page if desired.
 *
 * The template has the original shadcn/ui styles because it intentionally applies the styles to the
 * entire page. The same is true for Platform.Bible - see \`app.component.scss\`
 */
/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css but with the difference of being scoped to .pr-twp here */
.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}
.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}
.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}
.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}
.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}
.before\\:tw-absolute::before {
  content: var(--tw-content);
  position: absolute;
}
.before\\:tw-left-0::before {
  content: var(--tw-content);
  left: 0px;
}
.before\\:tw-top-0\\.5::before {
  content: var(--tw-content);
  top: 0.125rem;
}
.before\\:tw-block::before {
  content: var(--tw-content);
  display: block;
}
.before\\:tw-hidden::before {
  content: var(--tw-content);
  display: none;
}
.before\\:tw-h-4::before {
  content: var(--tw-content);
  height: 1rem;
}
.before\\:tw-w-4::before {
  content: var(--tw-content);
  width: 1rem;
}
.before\\:tw-cursor-pointer::before {
  content: var(--tw-content);
  cursor: pointer;
}
.before\\:tw-rounded::before {
  content: var(--tw-content);
  border-radius: 0.25rem;
}
.before\\:tw-border::before {
  content: var(--tw-content);
  border-width: 1px;
}
.before\\:tw-border-primary::before {
  content: var(--tw-content);
  border-color: hsl(var(--primary));
}
.before\\:tw-bg-primary::before {
  content: var(--tw-content);
  background-color: hsl(var(--primary));
}
.before\\:tw-bg-cover::before {
  content: var(--tw-content);
  background-size: cover;
}
.before\\:tw-bg-no-repeat::before {
  content: var(--tw-content);
  background-repeat: no-repeat;
}
.before\\:tw-content-\\[\\"\\"\\]::before {
  --tw-content: "";
  content: var(--tw-content);
}
.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}
.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}
.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}
.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}
.after\\:tw-left-\\[7px\\]::after {
  content: var(--tw-content);
  left: 7px;
}
.after\\:tw-right-\\[7px\\]::after {
  content: var(--tw-content);
  right: 7px;
}
.after\\:tw-top-\\[6px\\]::after {
  content: var(--tw-content);
  top: 6px;
}
.after\\:tw-block::after {
  content: var(--tw-content);
  display: block;
}
.after\\:tw-hidden::after {
  content: var(--tw-content);
  display: none;
}
.after\\:tw-h-0\\.5::after {
  content: var(--tw-content);
  height: 0.125rem;
}
.after\\:tw-h-\\[6px\\]::after {
  content: var(--tw-content);
  height: 6px;
}
.after\\:tw-w-1::after {
  content: var(--tw-content);
  width: 0.25rem;
}
.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}
.after\\:tw-w-\\[3px\\]::after {
  content: var(--tw-content);
  width: 3px;
}
.after\\:tw--translate-x-1\\/2::after {
  content: var(--tw-content);
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-rotate-45::after {
  content: var(--tw-content);
  --tw-rotate: 45deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.after\\:tw-cursor-pointer::after {
  content: var(--tw-content);
  cursor: pointer;
}
.after\\:tw-border-b-2::after {
  content: var(--tw-content);
  border-bottom-width: 2px;
}
.after\\:tw-border-l-0::after {
  content: var(--tw-content);
  border-left-width: 0px;
}
.after\\:tw-border-r-2::after {
  content: var(--tw-content);
  border-right-width: 2px;
}
.after\\:tw-border-t-0::after {
  content: var(--tw-content);
  border-top-width: 0px;
}
.after\\:tw-border-solid::after {
  content: var(--tw-content);
  border-style: solid;
}
.after\\:tw-border-white::after {
  content: var(--tw-content);
  --tw-border-opacity: 1;
  border-color: rgb(255 255 255 / var(--tw-border-opacity, 1));
}
.after\\:tw-bg-muted::after {
  content: var(--tw-content);
  background-color: hsl(var(--muted));
}
.after\\:tw-content-\\[\\"\\"\\]::after {
  --tw-content: "";
  content: var(--tw-content);
}
.first\\:tw-mt-0:first-child {
  margin-top: 0px;
}
.even\\:tw-bg-muted:nth-child(even) {
  background-color: hsl(var(--muted));
}
.hover\\:tw-cursor-pointer:hover {
  cursor: pointer;
}
.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:tw-bg-blue-600:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}
.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:tw-bg-input:hover {
  background-color: hsl(var(--input));
}
.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}
.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}
.hover\\:tw-bg-primary\\/10:hover {
  background-color: hsl(var(--primary) / 0.1);
}
.hover\\:tw-bg-primary\\/70:hover {
  background-color: hsl(var(--primary) / 0.7);
}
.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}
.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:tw-bg-secondary:hover {
  background-color: hsl(var(--secondary));
}
.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}
.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}
.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:tw-text-primary-foreground:hover {
  color: hsl(var(--primary-foreground));
}
.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}
.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}
.hover\\:tw-opacity-100:hover {
  opacity: 1;
}
.hover\\:tw-opacity-80:hover {
  opacity: 0.8;
}
.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:tw-shadow-md:hover {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
}
.focus\\:tw-relative:focus {
  position: relative;
}
.focus\\:tw-z-10:focus {
  z-index: 10;
}
.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}
.focus\\:tw-bg-muted:focus {
  background-color: hsl(var(--muted));
}
.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}
.focus\\:tw-text-foreground:focus {
  color: hsl(var(--foreground));
}
.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:tw-ring-offset-1:focus {
  --tw-ring-offset-width: 1px;
}
.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}
.focus\\:tw-ring-offset-background:focus {
  --tw-ring-offset-color: hsl(var(--background));
}
.focus-visible\\:tw-relative:focus-visible {
  position: relative;
}
.focus-visible\\:tw-z-10:focus-visible {
  z-index: 10;
}
.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus-visible\\:tw-ring-1:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}
.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.focus-visible\\:tw-ring-offset-1:focus-visible {
  --tw-ring-offset-width: 1px;
}
.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}
.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}
.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}
.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
}
.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}
.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}
.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}
.tw-group:hover .group-hover\\:tw-visible {
  visibility: visible;
}
.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}
.has-\\[\\>\\[data-slot\\=button-group\\]\\]\\:tw-gap-2:has(>[data-slot=button-group]) {
  gap: 0.5rem;
}
.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}
.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}
.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[orientation\\=vertical\\]\\:tw-h-auto[data-orientation="vertical"] {
  height: auto;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-h-px[data-panel-group-direction="vertical"] {
  height: 1px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-w-full[data-panel-group-direction="vertical"] {
  width: 100%;
}
.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:tw-flex-col[data-panel-group-direction="vertical"] {
  flex-direction: column;
}
.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=open\\]\\:tw-bg-muted[data-state="open"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}
.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-accent-foreground[data-state="open"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:tw-text-foreground[data-state="open"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}
.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-left-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  left: 0px;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-h-1[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  height: 0.25rem;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-w-full[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  width: 100%;
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw--translate-y-1\\/2[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[panel-group-direction\\=vertical\\]\\:after\\:tw-translate-x-0[data-panel-group-direction="vertical"]::after {
  content: var(--tw-content);
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}
.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw--right-4 {
  right: -1rem;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-left-0 {
  left: 0px;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}
.tw-group[data-side="primary"] .group-data-\\[side\\=primary\\]\\:tw-border-r {
  border-right-width: 1px;
}
.tw-group[data-side="secondary"] .group-data-\\[side\\=secondary\\]\\:tw-border-l {
  border-left-width: 1px;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}
.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}
.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}
.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
}
@container (min-width: 24rem) {

  .\\@sm\\:tw-basis-auto {
    flex-basis: auto;
  }
}
@media (min-width: 640px) {

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-text-left {
    text-align: left;
  }

  .sm\\:tw-text-start {
    text-align: start;
  }
}
@media (min-width: 768px) {

  .md\\:tw-block {
    display: block;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .md\\:tw-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
@media (min-width: 1024px) {

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .lg\\:tw-text-5xl {
    font-size: 3rem;
    line-height: 1;
  }
}
.ltr\\:tw-left-2:where([dir="ltr"], [dir="ltr"] *) {
  left: 0.5rem;
}
.rtl\\:tw-right-2:where([dir="rtl"], [dir="rtl"] *) {
  right: 0.5rem;
}
@media (prefers-color-scheme: dark) {

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }

  .dark\\:tw-text-rose-400 {
    --tw-text-opacity: 1;
    color: rgb(251 113 133 / var(--tw-text-opacity, 1));
  }

  .dark\\:tw-text-sky-400 {
    --tw-text-opacity: 1;
    color: rgb(56 189 248 / var(--tw-text-opacity, 1));
  }

  .dark\\:tw-text-teal-400 {
    --tw-text-opacity: 1;
    color: rgb(45 212 191 / var(--tw-text-opacity, 1));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-l-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-rounded-t-none>*:not(:first-child) {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-l-0>*:not(:first-child) {
  border-left-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:first-child\\)\\]\\:tw-border-t-0>*:not(:first-child) {
  border-top-width: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-b-none>*:not(:last-child) {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.\\[\\&\\>\\*\\:not\\(\\:last-child\\)\\]\\:tw-rounded-r-none>*:not(:last-child) {
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-relative:focus-visible>* {
  position: relative;
}
.\\[\\&\\>\\*\\]\\:focus-visible\\:tw-z-10:focus-visible>* {
  z-index: 10;
}
.has-\\[select\\[aria-hidden\\=true\\]\\:last-child\\]\\:\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:last-of-type\\]\\:tw-rounded-r-md>[data-slot=select-trigger]:last-of-type:has(select[aria-hidden=true]:last-child) {
  border-top-right-radius: calc(var(--radius) - 2px);
  border-bottom-right-radius: calc(var(--radius) - 2px);
}
.\\[\\&\\>\\[data-slot\\=select-trigger\\]\\:not\\(\\[class\\*\\=w-\\]\\)\\]\\:tw-w-fit>[data-slot=select-trigger]:not([class*=w-]) {
  width: fit-content;
}
.\\[\\&\\>blockquote\\]\\:tw-border-s-0>blockquote {
  border-inline-start-width: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-p-0>blockquote {
  padding: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-ps-0>blockquote {
  padding-inline-start: 0px;
}
.\\[\\&\\>blockquote\\]\\:tw-font-normal>blockquote {
  font-weight: 400;
}
.\\[\\&\\>blockquote\\]\\:tw-not-italic>blockquote {
  font-style: normal;
}
.\\[\\&\\>blockquote\\]\\:tw-text-foreground>blockquote {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\+div\\]\\:tw-translate-y-\\[-3px\\]>img+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>img\\]\\:tw-absolute>img {
  position: absolute;
}
.\\[\\&\\>img\\]\\:tw-left-4>img {
  left: 1rem;
}
.\\[\\&\\>img\\]\\:tw-top-4>img {
  top: 1rem;
}
.\\[\\&\\>img\\]\\:tw-text-destructive>img {
  color: hsl(var(--destructive));
}
.\\[\\&\\>img\\]\\:tw-text-foreground>img {
  color: hsl(var(--foreground));
}
.\\[\\&\\>img\\~\\*\\]\\:tw-pl-7>img~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>input\\]\\:tw-flex-1>input {
  flex: 1 1 0%;
}
.\\[\\&\\>li\\]\\:tw-mt-2>li {
  margin-top: 0.5rem;
}
.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>span\\]\\:tw-flex-1>span {
  flex: 1 1 0%;
}
.\\[\\&\\>span\\]\\:tw-text-start>span {
  text-align: start;
}
.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}
.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&\\[align\\=center\\]\\]\\:tw-text-center[align=center] {
  text-align: center;
}
.\\[\\&\\[align\\=right\\]\\]\\:tw-text-right[align=right] {
  text-align: right;
}
.\\[\\&\\[data-panel-group-direction\\=vertical\\]\\>div\\]\\:tw-rotate-90[data-panel-group-direction=vertical]>div {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-mt-0 [data-lexical-editor="true"]>blockquote {
  margin-top: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-border-s-0 [data-lexical-editor="true"]>blockquote {
  border-inline-start-width: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-ps-0 [data-lexical-editor="true"]>blockquote {
  padding-inline-start: 0px;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-font-normal [data-lexical-editor="true"]>blockquote {
  font-weight: 400;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-not-italic [data-lexical-editor="true"]>blockquote {
  font-style: normal;
}
.\\[\\&_\\[data-lexical-editor\\=\\"true\\"\\]\\>blockquote\\]\\:tw-text-foreground [data-lexical-editor="true"]>blockquote {
  color: hsl(var(--foreground));
}
.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_svg\\:not\\(\\[class\\*\\=size-\\]\\)\\]\\:tw-size-4 svg:not([class*=size-]) {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-pointer-events-none svg {
  pointer-events: none;
}
.\\[\\&_svg\\]\\:tw-size-4 svg {
  width: 1rem;
  height: 1rem;
}
.\\[\\&_svg\\]\\:tw-shrink-0 svg {
  flex-shrink: 0;
}
.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:tw-border-b tr {
  border-bottom-width: 1px;
}
[data-side=primary][data-collapsible=offcanvas] .\\[\\[data-side\\=primary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}
[data-side=primary][data-state=collapsed] .\\[\\[data-side\\=primary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary][data-collapsible=offcanvas] .\\[\\[data-side\\=secondary\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}
[data-side=secondary][data-state=collapsed] .\\[\\[data-side\\=secondary\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}
[data-side=secondary] .\\[\\[data-side\\=secondary\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}
.banded-row:hover {
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
  $p as Alert,
  Lp as AlertDescription,
  Vp as AlertTitle,
  pc as Avatar,
  uc as AvatarFallback,
  Pd as AvatarImage,
  Cd as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Ed as BOOK_SELECTOR_STRING_KEYS,
  Xe as Badge,
  _d as BookChapterControl,
  Zn as BookSelectionMode,
  Td as BookSelector,
  F as Button,
  Rd as COMMENT_EDITOR_STRING_KEYS,
  Dd as COMMENT_LIST_STRING_KEYS,
  wc as Card,
  dc as CardContent,
  Id as CardDescription,
  Ad as CardFooter,
  Md as CardHeader,
  Od as CardTitle,
  Ys as ChapterRangeSelector,
  ka as Checkbox,
  Ip as Checklist,
  Jn as ComboBox,
  de as Command,
  kn as CommandEmpty,
  Ht as CommandGroup,
  tn as CommandInput,
  Yt as CommandItem,
  pe as CommandList,
  Sd as CommentEditor,
  Vd as CommentList,
  jp as ContextMenu,
  Xp as ContextMenuCheckboxItem,
  Hp as ContextMenuContent,
  Fp as ContextMenuGroup,
  Yp as ContextMenuItem,
  Jp as ContextMenuLabel,
  Bp as ContextMenuPortal,
  Up as ContextMenuRadioGroup,
  Wp as ContextMenuRadioItem,
  Zp as ContextMenuSeparator,
  Qp as ContextMenuShortcut,
  Kp as ContextMenuSub,
  qp as ContextMenuSubContent,
  Gp as ContextMenuSubTrigger,
  zp as ContextMenuTrigger,
  Mc as DataTable,
  Is as Dialog,
  xd as DialogClose,
  $s as DialogContent,
  kd as DialogDescription,
  yd as DialogFooter,
  Vs as DialogHeader,
  Ps as DialogOverlay,
  As as DialogPortal,
  Ls as DialogTitle,
  vd as DialogTrigger,
  tu as Drawer,
  nu as DrawerClose,
  ru as DrawerContent,
  su as DrawerDescription,
  au as DrawerFooter,
  ou as DrawerHeader,
  Uw as DrawerOverlay,
  Kw as DrawerPortal,
  iu as DrawerTitle,
  eu as DrawerTrigger,
  se as DropdownMenu,
  re as DropdownMenuCheckboxItem,
  le as DropdownMenuContent,
  xa as DropdownMenuGroup,
  nr as DropdownMenuItem,
  Ac as DropdownMenuItemType,
  Cn as DropdownMenuLabel,
  mc as DropdownMenuPortal,
  fc as DropdownMenuRadioGroup,
  vc as DropdownMenuRadioItem,
  en as DropdownMenuSeparator,
  $d as DropdownMenuShortcut,
  hc as DropdownMenuSub,
  bc as DropdownMenuSubContent,
  gc as DropdownMenuSubTrigger,
  ye as DropdownMenuTrigger,
  Oc as ERROR_DUMP_STRING_KEYS,
  Kd as ERROR_POPOVER_STRING_KEYS,
  jc as EditorKeyboardShortcuts,
  Ic as ErrorDump,
  Ud as ErrorPopover,
  Wd as FOOTNOTE_EDITOR_STRING_KEYS,
  Yd as Filter,
  Gd as FilterDropdown,
  Hd as Footer,
  Xd as FootnoteEditor,
  tw as FootnoteItem,
  Jd as FootnoteList,
  op as INVENTORY_STRING_KEYS,
  nn as Input,
  ap as Inventory,
  ut as Label,
  Gc as MARKER_MENU_STRING_KEYS,
  Bd as MarkdownRenderer,
  Hc as MarkerMenu,
  qd as MoreInfo,
  $c as MultiSelectComboBox,
  Rp as NavigationContentSearch,
  Xt as Popover,
  Fs as PopoverAnchor,
  Wt as PopoverContent,
  ue as PopoverTrigger,
  lu as Progress,
  qo as RadioGroup,
  Wn as RadioGroupItem,
  Bs as RecentSearches,
  du as ResizableHandle,
  wu as ResizablePanel,
  cu as ResizablePanelGroup,
  Ap as ResultsCard,
  yp as SCOPE_SELECTOR_STRING_KEYS,
  kp as ScopeSelector,
  xp as ScriptureResultsViewer,
  Np as ScrollGroupSelector,
  Cr as SearchBar,
  Me as Select,
  Ae as SelectContent,
  kc as SelectGroup,
  Ot as SelectItem,
  Ld as SelectLabel,
  Cc as SelectScrollDownButton,
  _c as SelectScrollUpButton,
  jd as SelectSeparator,
  Ie as SelectTrigger,
  Oe as SelectValue,
  We as Separator,
  _p as SettingsList,
  Ep as SettingsListHeader,
  Cp as SettingsListItem,
  bw as SettingsSidebar,
  vp as SettingsSidebarContentSearch,
  dw as Sidebar,
  uw as SidebarContent,
  wp as SidebarFooter,
  io as SidebarGroup,
  pp as SidebarGroupAction,
  lo as SidebarGroupContent,
  so as SidebarGroupLabel,
  cp as SidebarHeader,
  lp as SidebarInput,
  pw as SidebarInset,
  mw as SidebarMenu,
  up as SidebarMenuAction,
  mp as SidebarMenuBadge,
  gw as SidebarMenuButton,
  hw as SidebarMenuItem,
  hp as SidebarMenuSkeleton,
  fp as SidebarMenuSub,
  bp as SidebarMenuSubButton,
  gp as SidebarMenuSubItem,
  ww as SidebarProvider,
  sp as SidebarRail,
  dp as SidebarSeparator,
  ip as SidebarTrigger,
  rr as Skeleton,
  uu as Slider,
  pu as Sonner,
  Fw as Spinner,
  mu as Switch,
  or as TabDropdownMenu,
  Sp as TabFloatingMenu,
  Tp as TabToolbar,
  yr as Table,
  Nr as TableBody,
  Fd as TableCaption,
  Se as TableCell,
  zd as TableFooter,
  bn as TableHead,
  kr as TableHeader,
  te as TableRow,
  hu as Tabs,
  bu as TabsContent,
  fu as TabsList,
  gu as TabsTrigger,
  Pp as TextField,
  vu as Textarea,
  ma as ToggleGroup,
  pn as ToggleGroupItem,
  Mp as Toolbar,
  Nt as Tooltip,
  _t as TooltipContent,
  kt as TooltipProvider,
  Tt as TooltipTrigger,
  Vc as UNDO_REDO_BUTTONS_STRING_KEYS,
  Op as UiLanguageSelector,
  Lc as UndoRedoButtons,
  Ra as VerticalTabs,
  Ma as VerticalTabsContent,
  Da as VerticalTabsList,
  Sw as VerticalTabsTrigger,
  Le as Z_INDEX_ABOVE_DOCK,
  zo as Z_INDEX_FOOTNOTE_EDITOR,
  Ms as Z_INDEX_MODAL,
  Ds as Z_INDEX_MODAL_BACKDROP,
  Rs as Z_INDEX_OVERLAY,
  cc as badgeVariants,
  Go as buttonVariants,
  f as cn,
  rp as getBookIdFromUSFM,
  En as getInventoryHeader,
  ep as getLinesFromUSFM,
  np as getNumberFromUSFM,
  aw as getStatusForItem,
  Dp as getToolbarOSReservedSpaceClassName,
  Qd as inventoryCountColumn,
  Zd as inventoryItemColumn,
  tp as inventoryStatusColumn,
  Nc as selectTriggerVariants,
  Cu as sonner,
  xu as useEvent,
  yu as useEventAsync,
  lc as useListbox,
  qw as usePromise,
  Nd as useRecentSearches,
  Tn as useSidebar,
  ku as useStylesheet
};
//# sourceMappingURL=index.js.map
