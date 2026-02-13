var Za = Object.defineProperty;
var Qa = (e, t, n) => t in e ? Za(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var ht = (e, t, n) => Qa(e, typeof t != "symbol" ? t + "" : t, n);
import { jsx as r, jsxs as d, Fragment as at } from "react/jsx-runtime";
import b, { forwardRef as Qe, useRef as X, useMemo as j, useState as A, useCallback as G, useLayoutEffect as Ft, createContext as xn, useContext as cr, useEffect as H, Component as ts, createElement as Dr, Suspense as es, createRef as ns, Fragment as ao } from "react";
import { Command as vt } from "cmdk";
import { X as Me, Search as so, Check as Rt, Clock as Mr, ChevronsLeft as Or, ChevronsRight as Ir, ChevronLeft as qn, ChevronRight as _e, ArrowLeft as rs, ArrowRight as os, Circle as yn, ChevronDown as Oe, BoldIcon as as, ItalicIcon as ss, UnderlineIcon as is, StrikethroughIcon as ls, AtSign as io, Pencil as ws, Trash2 as cs, ArrowUp as lo, MoreHorizontal as wo, MailOpen as ds, Mail as ps, ChevronUp as co, FilterIcon as us, ArrowLeftIcon as ms, ChevronLeftIcon as fs, ChevronRightIcon as hs, ArrowRightIcon as gs, Copy as po, Filter as bs, User as vs, Link as xs, CircleHelp as ys, ChevronsUpDown as uo, Star as Ns, SquareX as mo, FunctionSquare as fo, SquareSigma as ho, AlertCircle as Hn, CircleCheckIcon as ks, CircleXIcon as _s, CircleHelpIcon as Cs, ArrowUpIcon as Es, ArrowDownIcon as Ts, ArrowUpDownIcon as Rs, PanelLeft as Ss, PanelRight as Ds, ScrollText as Ms, MenuIcon as Os, Menu as Is, EllipsisVertical as As, LoaderCircle as Ps, GripVertical as $s } from "lucide-react";
import { clsx as Ls } from "clsx";
import { extendTailwindMerge as Vs } from "tailwind-merge";
import * as Tt from "@radix-ui/react-dialog";
import { Canon as ot } from "@sillsdev/scripture";
import { includes as an, Section as q, getChaptersForBook as js, formatScrRef as ue, getSectionForBook as Ge, formatRelativeDate as zs, formatReplacementString as pe, sanitizeHtml as Fs, NumberFormat as Bs, formatBytes as Gs, getCurrentLocale as Ks, getFormatCallerFunction as Us, deepEqual as qs, isString as Ar, compareScrRefs as Yn, scrRefToBBBCCCVVV as In, getLocalizeKeyForScrollGroupId as W, formatScrRefRange as Hs, formatScrRefWithOptionalParts as Ys } from "platform-bible-utils";
import { getLocalizedBookName as au } from "platform-bible-utils";
import { Slot as Ie } from "@radix-ui/react-slot";
import { cva as re } from "class-variance-authority";
import * as Ce from "@radix-ui/react-popover";
import * as go from "@radix-ui/react-label";
import * as Ye from "@radix-ui/react-radio-group";
import { createEditor as bo, $getRoot as te, $createParagraphNode as Nn, $getSelection as Bt, HISTORY_MERGE_TAG as dr, ParagraphNode as vo, TextNode as xo, $isTokenOrSegmented as Xs, $getCharacterOffsets as Ws, $cloneWithPropertiesEphemeral as Js, $findMatchingParent as Zs, $isElementNode as me, CLEAR_EDITOR_COMMAND as yo, COMMAND_PRIORITY_EDITOR as No, $isRangeSelection as Xe, shallowMergeConfig as Qs, defineExtension as Kt, safeCast as tn, RootNode as ti, LineBreakNode as ei, TabNode as ni, $isEditorState as ri, createCommand as oi, CLICK_COMMAND as ai, isDOMNode as si, $getNodeFromDOMNode as ii, $isNodeSelection as li, $createNodeSelection as wi, $setSelection as ci, COMMAND_PRIORITY_LOW as di, DecoratorNode as pi, $create as ui, $getNodeByKey as mi, INDENT_CONTENT_COMMAND as Pr, COMMAND_PRIORITY_CRITICAL as pr, KEY_TAB_COMMAND as fi, $createRangeSelection as hi, $normalizeSelection__EXPERIMENTAL as gi, OUTDENT_CONTENT_COMMAND as bi, INSERT_TAB_COMMAND as vi, $isBlockElementNode as un, $isDecoratorNode as xi, $isParagraphNode as yi, $isTextNode as mn, SELECTION_CHANGE_COMMAND as ko, FORMAT_TEXT_COMMAND as Ni, getRegisteredNode as ki, isHTMLElement as _i, isDocumentFragment as $r, isDOMDocumentNode as Ci, ArtificialNode__DO_NOT_USE as _o, $createLineBreakNode as Co, $isRootOrShadowRoot as Ei, isBlockDomNode as Lr, isInlineDomNode as Vr, $insertNodes as Ti } from "lexical";
import * as en from "@radix-ui/react-tooltip";
import { TooltipTrigger as Ri } from "@radix-ui/react-tooltip";
import { HeadingNode as Si, QuoteNode as Di, registerRichText as Mi } from "@lexical/rich-text";
import { flushSync as Oi, createPortal as Ii } from "react-dom";
import { $isTableSelection as Ai } from "@lexical/table";
import * as kn from "@radix-ui/react-toggle-group";
import * as Eo from "@radix-ui/react-toggle";
import { createHeadlessEditor as To } from "@lexical/headless";
import * as Ro from "@radix-ui/react-separator";
import * as Ae from "@radix-ui/react-avatar";
import * as Z from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Pi } from "@radix-ui/react-dropdown-menu";
import { useReactTable as So, getFilteredRowModel as $i, getSortedRowModel as Do, getPaginationRowModel as Li, getCoreRowModel as Mo, flexRender as Ke, getGroupedRowModel as Vi, getExpandedRowModel as ji } from "@tanstack/react-table";
import * as rt from "@radix-ui/react-select";
import zi from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as Xn, HIDDEN_NOTE_CALLER as Wn, getDefaultViewOptions as Fi, isInsertEmbedOpOfType as sn, Editorial as Bi } from "@eten-tech-foundation/platform-editor";
import * as Jn from "@radix-ui/react-checkbox";
import * as xt from "@radix-ui/react-tabs";
import * as Q from "@radix-ui/react-menubar";
import { useHotkeys as Gi } from "react-hotkeys-hook";
import * as tt from "@radix-ui/react-context-menu";
import { Drawer as St } from "vaul";
import * as Zn from "@radix-ui/react-progress";
import * as ur from "react-resizable-panels";
import { Toaster as Ki } from "sonner";
import { toast as iu } from "sonner";
import * as Be from "@radix-ui/react-slider";
import * as Qn from "@radix-ui/react-switch";
const Ui = Vs({ prefix: "tw-" });
function m(...e) {
  return Ui(Ls(e));
}
const qi = "layoutDirection";
function wt() {
  const e = localStorage.getItem(qi);
  return e === "rtl" ? e : "ltr";
}
const Hi = Tt.Root, Yi = Tt.Portal, Oo = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Tt.Overlay,
  {
    ref: n,
    className: m(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
Oo.displayName = Tt.Overlay.displayName;
const Io = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = wt();
  return /* @__PURE__ */ d(Yi, { children: [
    /* @__PURE__ */ r(Oo, {}),
    /* @__PURE__ */ d(
      Tt.Content,
      {
        ref: o,
        className: m(
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          e
        ),
        ...n,
        dir: a,
        children: [
          t,
          /* @__PURE__ */ d(
            Tt.Close,
            {
              className: m(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": a === "ltr" },
                { "tw-left-4": a === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(Me, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
Io.displayName = Tt.Content.displayName;
function Ao({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        e
      ),
      ...t
    }
  );
}
Ao.displayName = "DialogHeader";
const Po = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Tt.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Po.displayName = Tt.Title.displayName;
const Xi = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Tt.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Xi.displayName = Tt.Description.displayName;
const Ut = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  vt,
  {
    ref: n,
    className: m(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
Ut.displayName = vt.displayName;
const Pe = b.forwardRef(({ className: e, ...t }, n) => {
  const o = wt();
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(so, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      vt.Input,
      {
        ref: n,
        className: m(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          e
        ),
        ...t
      }
    )
  ] });
});
Pe.displayName = vt.Input.displayName;
const qt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  vt.List,
  {
    ref: n,
    className: m("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
qt.displayName = vt.List.displayName;
const nn = b.forwardRef((e, t) => /* @__PURE__ */ r(vt.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
nn.displayName = vt.Empty.displayName;
const Gt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  vt.Group,
  {
    ref: n,
    className: m(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Gt.displayName = vt.Group.displayName;
const $o = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  vt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
$o.displayName = vt.Separator.displayName;
const Pt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  vt.Item,
  {
    ref: n,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
Pt.displayName = vt.Item.displayName;
function Lo({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
Lo.displayName = "CommandShortcut";
const Vo = (e, t, n, o, a) => {
  switch (e) {
    case q.OT:
      return t ?? "Old Testament";
    case q.NT:
      return n ?? "New Testament";
    case q.DC:
      return o ?? "Deuterocanon";
    case q.Extra:
      return a ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
}, Wi = (e, t, n, o, a) => {
  switch (e) {
    case q.OT:
      return t ?? "OT";
    case q.NT:
      return n ?? "NT";
    case q.DC:
      return o ?? "DC";
    case q.Extra:
      return a ?? "Extra";
    default:
      throw new Error(`Unknown section: ${e}`);
  }
};
function ke(e, t) {
  var o;
  return ((o = t == null ? void 0 : t.get(e)) == null ? void 0 : o.localizedName) ?? ot.bookIdToEnglishName(e);
}
function mr(e, t) {
  var o;
  return ((o = t == null ? void 0 : t.get(e)) == null ? void 0 : o.localizedId) ?? e.toUpperCase();
}
const jo = ot.allBookIds.filter(
  (e) => !ot.isObsolete(ot.bookIdToNumber(e))
), fe = Object.fromEntries(
  jo.map((e) => [e, ot.bookIdToEnglishName(e)])
);
function fr(e, t, n) {
  const o = t.trim().toLowerCase();
  if (!o) return !1;
  const a = ot.bookIdToEnglishName(e), s = n == null ? void 0 : n.get(e);
  return !!(an(a.toLowerCase(), o) || an(e.toLowerCase(), o) || (s ? an(s.localizedName.toLowerCase(), o) || an(s.localizedId.toLowerCase(), o) : !1));
}
const zo = Qe(
  ({
    bookId: e,
    isSelected: t,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: s,
    showCheck: i = !1,
    localizedBookNames: l,
    commandValue: c
  }, w) => {
    const p = X(!1), f = () => {
      p.current || n == null || n(e), setTimeout(() => {
        p.current = !1;
      }, 100);
    }, h = (x) => {
      p.current = !0, o ? o(x) : n == null || n(e);
    }, u = j(
      () => ke(e, l),
      [e, l]
    ), g = j(
      () => mr(e, l),
      [e, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === q.OT,
            "tw-border-s-purple-200": a === q.NT,
            "tw-border-s-indigo-200": a === q.DC,
            "tw-border-s-amber-200": a === q.Extra
          }
        ),
        children: /* @__PURE__ */ d(
          Pt,
          {
            ref: w,
            value: c || `${e} ${ot.bookIdToEnglishName(e)}`,
            onSelect: f,
            onMouseDown: h,
            role: "option",
            "aria-selected": t,
            "aria-label": `${ot.bookIdToEnglishName(e)} (${e.toLocaleUpperCase()})`,
            className: s,
            children: [
              i && /* @__PURE__ */ r(
                Rt,
                {
                  className: m(
                    "tw-me-2 tw-h-4 tw-w-4 tw-flex-shrink-0",
                    t ? "tw-opacity-100" : "tw-opacity-0"
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
), Ji = re(
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
), V = b.forwardRef(
  ({ className: e, variant: t, size: n, asChild: o = !1, ...a }, s) => /* @__PURE__ */ r(o ? Ie : "button", { className: m(Ji({ variant: t, size: n, className: e })), ref: s, ...a })
);
V.displayName = "Button";
const oe = Ce.Root, ae = Ce.Trigger, Yd = Ce.Anchor, Ht = b.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ r(Ce.Portal, { children: /* @__PURE__ */ r(
    Ce.Content,
    {
      ref: a,
      align: t,
      sideOffset: n,
      className: m(
        // CUSTOM Changed z-order from 50 to 250 to make them appear on floating tabs (200)
        "tw-z-[250]",
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...o,
      dir: s
    }
  ) });
});
Ht.displayName = Ce.Content.displayName;
function tr(e, t, n) {
  return `${e} ${fe[e]}${t ? ` ${mr(e, t)} ${ke(e, t)}` : ""}${n ? ` ${n}` : ""}`;
}
function Zi({
  recentSearches: e,
  onSearchItemSelect: t,
  renderItem: n = (c) => String(c),
  getItemKey: o = (c) => String(c),
  ariaLabel: a = "Show recent searches",
  groupHeading: s = "Recent",
  id: i,
  classNameForItems: l
}) {
  const [c, w] = A(!1);
  if (e.length === 0)
    return;
  const p = (f) => {
    t(f), w(!1);
  };
  return /* @__PURE__ */ d(oe, { open: c, onOpenChange: w, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ r(
      V,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
        "aria-label": a,
        children: /* @__PURE__ */ r(Mr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(Ht, { id: i, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r(qt, { children: /* @__PURE__ */ r(Gt, { heading: s, children: e.map((f) => /* @__PURE__ */ d(
      Pt,
      {
        onSelect: () => p(f),
        className: m("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Mr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(f) })
        ]
      },
      o(f)
    )) }) }) }) })
  ] });
}
function Xd(e, t, n = (a, s) => a === s, o = 15) {
  return (a) => {
    const s = e.filter(
      (l) => !n(l, a)
    ), i = [a, ...s.slice(0, o - 1)];
    t(i);
  };
}
const An = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Qi = [
  An.BOOK_ONLY,
  An.BOOK_CHAPTER,
  An.BOOK_CHAPTER_VERSE
];
function jr(e) {
  const t = /^[a-zA-Z]$/.test(e), n = /^[0-9]$/.test(e);
  return { isLetter: t, isDigit: n };
}
function It(e) {
  return js(ot.bookIdToNumber(e));
}
function tl(e, t, n) {
  if (!e.trim() || t.length === 0) return;
  const o = Qi.reduce(
    (a, s) => {
      if (a) return a;
      const i = s.exec(e.trim());
      if (i) {
        const [l, c = void 0, w = void 0] = i.slice(1);
        let p;
        const f = t.filter((h) => fr(h, l, n));
        if (f.length === 1 && ([p] = f), !p && c) {
          if (ot.isBookIdValid(l)) {
            const h = l.toUpperCase();
            t.includes(h) && (p = h);
          }
          if (!p && n) {
            const h = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            h && t.includes(h[0]) && ([p] = h);
          }
        }
        if (!p && c) {
          const u = ((g) => Object.keys(fe).find(
            (x) => fe[x].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && t.includes(u) && (p = u), !p && n) {
            const g = Array.from(n.entries()).find(
              ([, x]) => x.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && t.includes(g[0]) && ([p] = g);
          }
        }
        if (p) {
          let h = c ? parseInt(c, 10) : void 0;
          h && h > It(p) && (h = Math.max(It(p), 1));
          const u = w ? parseInt(w, 10) : void 0;
          return {
            book: p,
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
function el(e, t, n, o) {
  const a = G(() => {
    if (e.chapterNum > 1)
      o({
        book: e.book,
        chapterNum: e.chapterNum - 1,
        verseNum: 1
      });
    else {
      const c = t.indexOf(e.book);
      if (c > 0) {
        const w = t[c - 1], p = Math.max(It(w), 1);
        o({
          book: w,
          chapterNum: p,
          verseNum: 1
        });
      }
    }
  }, [e, t, o]), s = G(() => {
    const c = It(e.book);
    if (e.chapterNum < c)
      o({
        book: e.book,
        chapterNum: e.chapterNum + 1,
        verseNum: 1
      });
    else {
      const w = t.indexOf(e.book);
      if (w < t.length - 1) {
        const p = t[w + 1];
        o({
          book: p,
          chapterNum: 1,
          verseNum: 1
        });
      }
    }
  }, [e, t, o]), i = G(() => {
    o({
      book: e.book,
      chapterNum: e.chapterNum,
      verseNum: e.verseNum > 1 ? e.verseNum - 1 : 0
    });
  }, [e, o]), l = G(() => {
    o({
      book: e.book,
      chapterNum: e.chapterNum,
      verseNum: e.verseNum + 1
    });
  }, [e, o]);
  return j(() => [
    {
      onClick: a,
      disabled: t.length === 0 || e.chapterNum === 1 && t.indexOf(e.book) === 0,
      title: "Previous chapter",
      icon: n === "ltr" ? Or : Ir
    },
    {
      onClick: i,
      disabled: t.length === 0 || e.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? qn : _e
    },
    {
      onClick: l,
      disabled: t.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? _e : qn
    },
    {
      onClick: s,
      disabled: t.length === 0 || (e.chapterNum === It(e.book) || It(e.book) <= 0) && t.indexOf(e.book) === t.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? Ir : Or
    }
  ], [
    e,
    t,
    n,
    a,
    i,
    l,
    s
  ]);
}
function zr({
  bookId: e,
  scrRef: t,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: s
}) {
  if (e)
    return /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r("div", { className: m("tw-grid tw-grid-cols-6 tw-gap-1", s), children: Array.from({ length: It(e) }, (i, l) => l + 1).map((i) => /* @__PURE__ */ r(
      Pt,
      {
        value: `${e} ${fe[e] || ""} ${i}`,
        onSelect: () => n(i),
        ref: o(i),
        className: m(
          "tw-h-8 tw-w-8 tw-cursor-pointer tw-justify-center tw-rounded-md tw-text-center tw-text-sm",
          {
            "tw-bg-primary tw-text-primary-foreground": e === t.book && i === t.chapterNum
          },
          {
            "tw-bg-muted/50 tw-text-muted-foreground/50": (a == null ? void 0 : a(i)) ?? !1
          }
        ),
        children: i
      },
      i
    )) }) });
}
function Wd({
  scrRef: e,
  handleSubmit: t,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: s,
  recentSearches: i,
  onAddRecentSearch: l,
  id: c
}) {
  const w = wt(), [p, f] = A(!1), [h, u] = A(""), [g, x] = A(""), [v, y] = A("books"), [N, C] = A(void 0), [S, $] = A(!1), L = X(void 0), k = X(void 0), T = X(void 0), E = X(void 0), R = X({}), P = G(
    (I) => {
      t(I), l && l(I);
    },
    [t, l]
  ), _ = j(() => o ? o() : jo, [o]), z = j(() => ({
    [q.OT]: _.filter((K) => ot.isBookOT(K)),
    [q.NT]: _.filter((K) => ot.isBookNT(K)),
    [q.DC]: _.filter((K) => ot.isBookDC(K)),
    [q.Extra]: _.filter((K) => ot.extraBooks().includes(K))
  }), [_]), D = j(() => Object.values(z).flat(), [z]), F = j(() => {
    if (!g.trim()) return z;
    const I = {
      [q.OT]: [],
      [q.NT]: [],
      [q.DC]: [],
      [q.Extra]: []
    };
    return [q.OT, q.NT, q.DC, q.Extra].forEach((nt) => {
      I[nt] = z[nt].filter((dt) => fr(dt, g, a));
    }), I;
  }, [z, g, a]), O = j(
    () => tl(g, D, a),
    [g, D, a]
  ), U = G(() => {
    O && (P({
      book: O.book,
      chapterNum: O.chapterNum ?? 1,
      verseNum: O.verseNum ?? 1
    }), f(!1), x(""), u(""));
  }, [P, O]), it = G(
    (I) => {
      if (It(I) <= 1) {
        P({
          book: I,
          chapterNum: 1,
          verseNum: 1
        }), f(!1), x("");
        return;
      }
      C(I), y("chapters");
    },
    [P]
  ), bt = G(
    (I) => {
      const K = v === "chapters" ? N : O == null ? void 0 : O.book;
      K && (P({
        book: K,
        chapterNum: I,
        verseNum: 1
      }), f(!1), y("books"), C(void 0), x(""));
    },
    [P, v, N, O]
  ), pt = G(
    (I) => {
      P(I), f(!1), x("");
    },
    [P]
  ), ut = el(e, D, w, t), Nt = G(() => {
    y("books"), C(void 0), setTimeout(() => {
      k.current && k.current.focus();
    }, 0);
  }, []), B = G(
    (I) => {
      if (!I && v === "chapters") {
        Nt();
        return;
      }
      f(I), I && (y("books"), C(void 0), x(""));
    },
    [v, Nt]
  ), { otLong: et, ntLong: ft, dcLong: ct, extraLong: mt } = {
    otLong: s == null ? void 0 : s["%scripture_section_ot_long%"],
    ntLong: s == null ? void 0 : s["%scripture_section_nt_long%"],
    dcLong: s == null ? void 0 : s["%scripture_section_dc_long%"],
    extraLong: s == null ? void 0 : s["%scripture_section_extra_long%"]
  }, ie = G(
    (I) => Vo(I, et, ft, ct, mt),
    [et, ft, ct, mt]
  ), Mn = G(
    (I) => O ? !!O.chapterNum && !I.toString().includes(O.chapterNum.toString()) : !1,
    [O]
  ), xe = j(
    () => ue(
      e,
      a ? ke(e.book, a) : "English"
    ),
    [e, a]
  ), Xt = G((I) => (K) => {
    R.current[I] = K;
  }, []), On = G((I) => {
    (I.key === "Home" || I.key === "End") && I.stopPropagation();
  }, []), Wt = G(
    (I) => {
      if (I.ctrlKey) return;
      const { isLetter: K, isDigit: nt } = jr(I.key);
      if (v === "chapters") {
        if (I.key === "Backspace") {
          I.preventDefault(), I.stopPropagation(), Nt();
          return;
        }
        if (K || nt) {
          if (I.preventDefault(), I.stopPropagation(), y("books"), C(void 0), nt && N) {
            const dt = fe[N];
            x(`${dt} ${I.key}`);
          } else
            x(I.key);
          setTimeout(() => {
            k.current && k.current.focus();
          }, 0);
          return;
        }
      }
      if ((v === "chapters" || v === "books" && O) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(I.key)) {
        const dt = v === "chapters" ? N : O == null ? void 0 : O.book;
        if (!dt) return;
        const st = (() => {
          if (!h) return 1;
          const Jt = h.match(/(\d+)$/);
          return Jt ? parseInt(Jt[1], 10) : 0;
        })(), Lt = It(dt);
        if (!Lt) return;
        let kt = st;
        const je = 6;
        switch (I.key) {
          case "ArrowLeft":
            st !== 0 && (kt = st > 1 ? st - 1 : Lt);
            break;
          case "ArrowRight":
            st !== 0 && (kt = st < Lt ? st + 1 : 1);
            break;
          case "ArrowUp":
            kt = st === 0 ? Lt : Math.max(1, st - je);
            break;
          case "ArrowDown":
            kt = st === 0 ? 1 : Math.min(Lt, st + je);
            break;
          default:
            return;
        }
        kt !== st && (I.preventDefault(), I.stopPropagation(), u(tr(dt, a, kt)), setTimeout(() => {
          const Jt = R.current[kt];
          Jt && Jt.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      v,
      O,
      Nt,
      N,
      h,
      a
    ]
  ), on = G((I) => {
    if (I.shiftKey || I.key === "Tab" || I.key === " ") return;
    const { isLetter: K, isDigit: nt } = jr(I.key);
    (K || nt) && (I.preventDefault(), x((dt) => dt + I.key), k.current.focus(), $(!1));
  }, []);
  return Ft(() => {
    const I = setTimeout(() => {
      if (p && v === "books" && T.current && E.current) {
        const K = T.current, nt = E.current, dt = nt.offsetTop, st = K.clientHeight, Lt = nt.clientHeight, kt = dt - st / 2 + Lt / 2;
        K.scrollTo({
          top: Math.max(0, kt),
          behavior: "smooth"
        }), u(tr(e.book));
      }
    }, 0);
    return () => {
      clearTimeout(I);
    };
  }, [p, v, g, O, e.book]), Ft(() => {
    if (v === "chapters" && N) {
      const I = N === e.book;
      setTimeout(() => {
        if (T.current)
          if (I) {
            const K = R.current[e.chapterNum];
            K && K.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            T.current.scrollTo({ top: 0 });
        L.current && L.current.focus();
      }, 0);
    }
  }, [v, N, O, e.book, e.chapterNum]), /* @__PURE__ */ d(oe, { open: p, onOpenChange: B, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ r(
      V,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": p,
        className: m(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: xe })
      }
    ) }),
    /* @__PURE__ */ r(Ht, { id: c, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ d(
      Ut,
      {
        ref: L,
        onKeyDown: Wt,
        loop: !0,
        value: h,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          v === "books" ? /* @__PURE__ */ d("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ d("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                Pe,
                {
                  ref: k,
                  value: g,
                  onValueChange: x,
                  onKeyDown: On,
                  onFocus: () => $(!1),
                  className: i && i.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              i && i.length > 0 && /* @__PURE__ */ r(
                Zi,
                {
                  recentSearches: i,
                  onSearchItemSelect: pt,
                  renderItem: (I) => ue(I, "English"),
                  getItemKey: (I) => `${I.book}-${I.chapterNum}-${I.verseNum}`,
                  ariaLabel: s == null ? void 0 : s["%history_recentSearches_ariaLabel%"],
                  groupHeading: s == null ? void 0 : s["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: ut.map(({ onClick: I, disabled: K, title: nt, icon: dt }) => /* @__PURE__ */ r(
              V,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  $(!0), I();
                },
                disabled: K,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: nt,
                onKeyDown: on,
                children: /* @__PURE__ */ r(dt, {})
              },
              nt
            )) })
          ] }) : /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              V,
              {
                variant: "ghost",
                size: "sm",
                onClick: Nt,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: w === "ltr" ? /* @__PURE__ */ r(rs, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(os, { className: "tw-h-4 tw-w-4" })
              }
            ),
            N && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: ke(N, a) })
          ] }),
          !S && /* @__PURE__ */ d(qt, { ref: T, children: [
            v === "books" && /* @__PURE__ */ d(at, { children: [
              !O && Object.entries(F).map(([I, K]) => {
                if (K.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Gt, { heading: ie(I), children: K.map((nt) => /* @__PURE__ */ r(
                      zo,
                      {
                        bookId: nt,
                        onSelect: (dt) => it(dt),
                        section: Ge(nt),
                        commandValue: `${nt} ${fe[nt]}`,
                        ref: nt === e.book ? E : void 0,
                        localizedBookNames: a
                      },
                      nt
                    )) }, I)
                  );
              }),
              O && /* @__PURE__ */ r(Gt, { children: /* @__PURE__ */ r(
                Pt,
                {
                  value: `${O.book} ${fe[O.book]} ${O.chapterNum || ""}:${O.verseNum || ""})}`,
                  onSelect: U,
                  className: "tw-font-semibold tw-text-primary",
                  children: ue(
                    {
                      book: O.book,
                      chapterNum: O.chapterNum ?? 1,
                      verseNum: O.verseNum ?? 1
                    },
                    a ? mr(O.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              O && It(O.book) > 1 && /* @__PURE__ */ d(at, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: ke(O.book, a) }),
                /* @__PURE__ */ r(
                  zr,
                  {
                    bookId: O.book,
                    scrRef: e,
                    onChapterSelect: bt,
                    setChapterRef: Xt,
                    isChapterDimmed: Mn,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            v === "chapters" && N && /* @__PURE__ */ r(
              zr,
              {
                bookId: N,
                scrRef: e,
                onChapterSelect: bt,
                setChapterRef: Xt,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const Jd = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), nl = re(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), lt = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(go.Root, { ref: n, className: m("pr-twp", nl(), e), ...t }));
lt.displayName = go.Root.displayName;
const hr = b.forwardRef(({ className: e, ...t }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    Ye.Root,
    {
      className: m("pr-twp tw-grid tw-gap-2", e),
      ...t,
      ref: n,
      dir: o
    }
  );
});
hr.displayName = Ye.Root.displayName;
const fn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ye.Item,
  {
    ref: n,
    className: m(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(Ye.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(yn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
fn.displayName = Ye.Item.displayName;
function rl(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function er({
  id: e,
  options: t = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  value: s,
  onChange: i = () => {
  },
  getOptionLabel: l = rl,
  getButtonLabel: c,
  icon: w = void 0,
  buttonPlaceholder: p = "",
  textPlaceholder: f = "",
  commandEmptyMessage: h = "No option found",
  buttonVariant: u = "outline",
  alignDropDown: g = "start",
  isDisabled: x = !1,
  ariaLabel: v,
  ...y
}) {
  const [N, C] = A(!1), S = c ?? l, $ = (k) => k.length > 0 && typeof k[0] == "object" && "options" in k[0], L = (k, T) => {
    const E = l(k), R = typeof k == "object" && "secondaryLabel" in k ? k.secondaryLabel : void 0, P = `${T ?? ""}${E}${R ?? ""}`;
    return /* @__PURE__ */ d(
      Pt,
      {
        value: E,
        onSelect: () => {
          i(k), C(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Rt,
            {
              className: m("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || l(s) !== E
              })
            }
          ),
          /* @__PURE__ */ d("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            E,
            R && /* @__PURE__ */ d("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              R
            ] })
          ] })
        ]
      },
      P
    );
  };
  return /* @__PURE__ */ d(oe, { open: N, onOpenChange: C, ...y, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
      V,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": N,
        "aria-label": v,
        id: e,
        className: m(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: x,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            w && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: w }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? S(s) : p
              }
            )
          ] }),
          /* @__PURE__ */ r(Oe, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      Ht,
      {
        align: g,
        className: m("tw-w-[200px] tw-p-0", a),
        children: /* @__PURE__ */ d(Ut, { children: [
          /* @__PURE__ */ r(Pe, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(nn, { children: h }),
          /* @__PURE__ */ r(qt, { children: $(t) ? t.map((k) => /* @__PURE__ */ r(Gt, { heading: k.groupHeading, children: k.options.map((T) => L(T, k.groupHeading)) }, k.groupHeading)) : t.map((k) => L(k)) })
        ] })
      }
    )
  ] });
}
function ol({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: s
}) {
  const i = j(
    () => Array.from({ length: s }, (w, p) => p + 1),
    [s]
  );
  return /* @__PURE__ */ d(at, { children: [
    /* @__PURE__ */ r(lt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      er,
      {
        isDisabled: a,
        onChange: (w) => {
          n(w), w > t && o(w);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (w) => w.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(lt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      er,
      {
        isDisabled: a,
        onChange: (w) => {
          o(w), w < e && n(w);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: i,
        getOptionLabel: (w) => w.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var al = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(al || {});
const Zd = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Pn = (e, t) => e[t] ?? t;
function Qd({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: s,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: w
}) {
  const p = Pn(w, "%webView_bookSelector_currentBook%"), f = Pn(w, "%webView_bookSelector_choose%"), h = Pn(w, "%webView_bookSelector_chooseBooks%"), [u, g] = A(
    "current book"
    /* CURRENT_BOOK */
  ), x = (v) => {
    g(v), e(v);
  };
  return /* @__PURE__ */ r(
    hr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (v) => x(v),
      children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(fn, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ r(lt, { className: "tw-ms-1", children: p })
          ] }),
          /* @__PURE__ */ r(lt, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            ol,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: a,
              startChapter: l,
              endChapter: s
            }
          ) })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(fn, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ r(lt, { className: "tw-ms-1", children: h })
          ] }),
          /* @__PURE__ */ r(lt, { className: "tw-flex tw-items-center", children: o.map((v) => ot.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ r(
            V,
            {
              disabled: u === "current book",
              onClick: () => n(),
              children: f
            }
          )
        ] })
      ] })
    }
  );
}
const Fo = xn(null);
function sl(e, t) {
  return { getTheme: function() {
    return t ?? null;
  } };
}
function $t() {
  const e = cr(Fo);
  return e == null && function(t, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", t);
    for (const s of n) a.append("v", s);
    throw o.search = a.toString(), Error(`Minified Lexical error #${t}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), e;
}
const Bo = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, il = Bo ? Ft : H, ln = { tag: dr };
function ll({ initialConfig: e, children: t }) {
  const n = j(() => {
    const { theme: o, namespace: a, nodes: s, onError: i, editorState: l, html: c } = e, w = sl(null, o), p = bo({ editable: e.editable, html: c, namespace: a, nodes: s, onError: (f) => i(f, p), theme: o });
    return function(f, h) {
      if (h !== null) {
        if (h === void 0) f.update(() => {
          const u = te();
          if (u.isEmpty()) {
            const g = Nn();
            u.append(g);
            const x = Bo ? document.activeElement : null;
            (Bt() !== null || x !== null && x === f.getRootElement()) && g.select();
          }
        }, ln);
        else if (h !== null) switch (typeof h) {
          case "string": {
            const u = f.parseEditorState(h);
            f.setEditorState(u, ln);
            break;
          }
          case "object":
            f.setEditorState(h, ln);
            break;
          case "function":
            f.update(() => {
              te().isEmpty() && h(f);
            }, ln);
        }
      }
    }(p, l), [p, w];
  }, []);
  return il(() => {
    const o = e.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(Fo.Provider, { value: n, children: t });
}
const wl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : H;
function cl({ ignoreHistoryMergeTagChange: e = !0, ignoreSelectionChange: t = !1, onChange: n }) {
  const [o] = $t();
  return wl(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: s, dirtyLeaves: i, prevEditorState: l, tags: c }) => {
      t && s.size === 0 && i.size === 0 || e && c.has(dr) || l.isEmpty() || n(a, o, c);
    });
  }, [o, e, t, n]), null;
}
const gr = {
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
}, Ct = en.Provider, At = en.Root, jt = en.Trigger, Et = b.forwardRef(({ className: e, sideOffset: t = 4, ...n }, o) => /* @__PURE__ */ r(
  en.Content,
  {
    ref: o,
    sideOffset: t,
    className: m(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
));
Et.displayName = en.Content.displayName;
const br = [
  Si,
  vo,
  xo,
  Di
], dl = xn(null), $n = {
  didCatch: !1,
  error: null
};
class pl extends ts {
  constructor(t) {
    super(t), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = $n;
  }
  static getDerivedStateFromError(t) {
    return {
      didCatch: !0,
      error: t
    };
  }
  resetErrorBoundary() {
    const {
      error: t
    } = this.state;
    if (t !== null) {
      for (var n, o, a = arguments.length, s = new Array(a), i = 0; i < a; i++)
        s[i] = arguments[i];
      (n = (o = this.props).onReset) === null || n === void 0 || n.call(o, {
        args: s,
        reason: "imperative-api"
      }), this.setState($n);
    }
  }
  componentDidCatch(t, n) {
    var o, a;
    (o = (a = this.props).onError) === null || o === void 0 || o.call(a, t, n);
  }
  componentDidUpdate(t, n) {
    const {
      didCatch: o
    } = this.state, {
      resetKeys: a
    } = this.props;
    if (o && n.error !== null && ul(t.resetKeys, a)) {
      var s, i;
      (s = (i = this.props).onReset) === null || s === void 0 || s.call(i, {
        next: a,
        prev: t.resetKeys,
        reason: "keys"
      }), this.setState($n);
    }
  }
  render() {
    const {
      children: t,
      fallbackRender: n,
      FallbackComponent: o,
      fallback: a
    } = this.props, {
      didCatch: s,
      error: i
    } = this.state;
    let l = t;
    if (s) {
      const c = {
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(c);
      else if (o)
        l = Dr(o, c);
      else if (a !== void 0)
        l = a;
      else
        throw i;
    }
    return Dr(dl.Provider, {
      value: {
        didCatch: s,
        error: i,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function ul() {
  let e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return e.length !== t.length || e.some((n, o) => !Object.is(n, t[o]));
}
function ml({ children: e, onError: t }) {
  return r(pl, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: t, children: e });
}
const fl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : H;
function hl(e) {
  return { initialValueFn: () => e.isEditable(), subscribe: (t) => e.registerEditableListener(t) };
}
function gl() {
  return function(e) {
    const [t] = $t(), n = j(() => e(t), [t, e]), [o, a] = A(() => n.initialValueFn()), s = X(o);
    return fl(() => {
      const { initialValueFn: i, subscribe: l } = n, c = i();
      return s.current !== c && (s.current = c, a(c)), l((w) => {
        s.current = w, a(w);
      });
    }, [n, e]), o;
  }(hl);
}
function bl(e, t, n = "self") {
  const o = e.getStartEndPoints();
  if (t.isSelected(e) && !Xs(t) && o !== null) {
    const [a, s] = o, i = e.isBackward(), l = a.getNode(), c = s.getNode(), w = t.is(l), p = t.is(c);
    if (w || p) {
      const [f, h] = Ws(e), u = l.is(c), g = t.is(i ? c : l), x = t.is(i ? l : c);
      let v, y = 0;
      u ? (y = f > h ? h : f, v = f > h ? f : h) : g ? (y = i ? h : f, v = void 0) : x && (y = 0, v = i ? f : h);
      const N = t.__text.slice(y, v);
      N !== t.__text && (n === "clone" && (t = Js(t)), t.__text = N);
    }
  }
  return t;
}
function vl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Go = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, xl = Go && "documentMode" in document ? document.documentMode : null;
!(!Go || !("InputEvent" in window) || xl) && "getTargetRanges" in new window.InputEvent("input");
function Ko(...e) {
  const t = [];
  for (const n of e) if (n && typeof n == "string") for (const [o] of n.matchAll(/\S+/g)) t.push(o);
  return t;
}
function ee(...e) {
  return () => {
    for (let t = e.length - 1; t >= 0; t--) e[t]();
    e.length = 0;
  };
}
function Uo(e, ...t) {
  const n = Ko(...t);
  n.length > 0 && e.classList.add(...n);
}
function yl(e, ...t) {
  const n = Ko(...t);
  n.length > 0 && e.classList.remove(...n);
}
function Fr(e) {
  const t = Zs(e, (n) => me(n) && !n.isInline());
  return me(t) || vl(4, e.__key), t;
}
function Nl(e, t) {
  const n = [];
  for (let o = 0; o < e.length; o++) {
    const a = t(e[o]);
    a !== null && n.push(a);
  }
  return n;
}
const kl = Symbol.for("preact-signals");
function _n() {
  if (Qt > 1) return void Qt--;
  let e, t = !1;
  for (; Ue !== void 0; ) {
    let n = Ue;
    for (Ue = void 0, nr++; n !== void 0; ) {
      const o = n.o;
      if (n.o = void 0, n.f &= -3, !(8 & n.f) && qo(n)) try {
        n.c();
      } catch (a) {
        t || (e = a, t = !0);
      }
      n = o;
    }
  }
  if (nr = 0, Qt--, t) throw e;
}
function _l(e) {
  if (Qt > 0) return e();
  Qt++;
  try {
    return e();
  } finally {
    _n();
  }
}
let Y, Ue;
function Br(e) {
  const t = Y;
  Y = void 0;
  try {
    return e();
  } finally {
    Y = t;
  }
}
let Qt = 0, nr = 0, dn = 0;
function Gr(e) {
  if (Y === void 0) return;
  let t = e.n;
  return t === void 0 || t.t !== Y ? (t = { i: 0, S: e, p: Y.s, n: void 0, t: Y, e: void 0, x: void 0, r: t }, Y.s !== void 0 && (Y.s.n = t), Y.s = t, e.n = t, 32 & Y.f && e.S(t), t) : t.i === -1 ? (t.i = 0, t.n !== void 0 && (t.n.p = t.p, t.p !== void 0 && (t.p.n = t.n), t.p = Y.s, t.n = void 0, Y.s.n = t, Y.s = t), t) : void 0;
}
function gt(e, t) {
  this.v = e, this.i = 0, this.n = void 0, this.t = void 0, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function We(e, t) {
  return new gt(e, t);
}
function qo(e) {
  for (let t = e.s; t !== void 0; t = t.n) if (t.S.i !== t.i || !t.S.h() || t.S.i !== t.i) return !0;
  return !1;
}
function Kr(e) {
  for (let t = e.s; t !== void 0; t = t.n) {
    const n = t.S.n;
    if (n !== void 0 && (t.r = n), t.S.n = t, t.i = -1, t.n === void 0) {
      e.s = t;
      break;
    }
  }
}
function Ho(e) {
  let t, n = e.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : t = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  e.s = t;
}
function ce(e, t) {
  gt.call(this, void 0), this.x = e, this.s = void 0, this.g = dn - 1, this.f = 4, this.W = t == null ? void 0 : t.watched, this.Z = t == null ? void 0 : t.unwatched, this.name = t == null ? void 0 : t.name;
}
function Cl(e, t) {
  return new ce(e, t);
}
function Yo(e) {
  const t = e.u;
  if (e.u = void 0, typeof t == "function") {
    Qt++;
    const n = Y;
    Y = void 0;
    try {
      t();
    } catch (o) {
      throw e.f &= -2, e.f |= 8, vr(e), o;
    } finally {
      Y = n, _n();
    }
  }
}
function vr(e) {
  for (let t = e.s; t !== void 0; t = t.n) t.S.U(t);
  e.x = void 0, e.s = void 0, Yo(e);
}
function El(e) {
  if (Y !== this) throw new Error("Out-of-order effect");
  Ho(this), Y = e, this.f &= -2, 8 & this.f && vr(this), _n();
}
function Ne(e, t) {
  this.x = e, this.u = void 0, this.s = void 0, this.o = void 0, this.f = 32, this.name = t == null ? void 0 : t.name;
}
function ne(e, t) {
  const n = new Ne(e, t);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Cn(e, t = {}) {
  const n = {};
  for (const o in e) {
    const a = t[o], s = We(a === void 0 ? e[o] : a);
    n[o] = s;
  }
  return n;
}
gt.prototype.brand = kl, gt.prototype.h = function() {
  return !0;
}, gt.prototype.S = function(e) {
  const t = this.t;
  t !== e && e.e === void 0 && (e.x = t, this.t = e, t !== void 0 ? t.e = e : Br(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, gt.prototype.U = function(e) {
  if (this.t !== void 0) {
    const t = e.e, n = e.x;
    t !== void 0 && (t.x = n, e.e = void 0), n !== void 0 && (n.e = t, e.x = void 0), e === this.t && (this.t = n, n === void 0 && Br(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, gt.prototype.subscribe = function(e) {
  return ne(() => {
    const t = this.value, n = Y;
    Y = void 0;
    try {
      e(t);
    } finally {
      Y = n;
    }
  }, { name: "sub" });
}, gt.prototype.valueOf = function() {
  return this.value;
}, gt.prototype.toString = function() {
  return this.value + "";
}, gt.prototype.toJSON = function() {
  return this.value;
}, gt.prototype.peek = function() {
  const e = Y;
  Y = void 0;
  try {
    return this.value;
  } finally {
    Y = e;
  }
}, Object.defineProperty(gt.prototype, "value", { get() {
  const e = Gr(this);
  return e !== void 0 && (e.i = this.i), this.v;
}, set(e) {
  if (e !== this.v) {
    if (nr > 100) throw new Error("Cycle detected");
    this.v = e, this.i++, dn++, Qt++;
    try {
      for (let t = this.t; t !== void 0; t = t.x) t.t.N();
    } finally {
      _n();
    }
  }
} }), ce.prototype = new gt(), ce.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === dn)) return !0;
  if (this.g = dn, this.f |= 1, this.i > 0 && !qo(this)) return this.f &= -2, !0;
  const e = Y;
  try {
    Kr(this), Y = this;
    const t = this.x();
    (16 & this.f || this.v !== t || this.i === 0) && (this.v = t, this.f &= -17, this.i++);
  } catch (t) {
    this.v = t, this.f |= 16, this.i++;
  }
  return Y = e, Ho(this), this.f &= -2, !0;
}, ce.prototype.S = function(e) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let t = this.s; t !== void 0; t = t.n) t.S.S(t);
  }
  gt.prototype.S.call(this, e);
}, ce.prototype.U = function(e) {
  if (this.t !== void 0 && (gt.prototype.U.call(this, e), this.t === void 0)) {
    this.f &= -33;
    for (let t = this.s; t !== void 0; t = t.n) t.S.U(t);
  }
}, ce.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let e = this.t; e !== void 0; e = e.x) e.t.N();
  }
}, Object.defineProperty(ce.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const e = Gr(this);
  if (this.h(), e !== void 0 && (e.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), Ne.prototype.c = function() {
  const e = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const t = this.x();
    typeof t == "function" && (this.u = t);
  } finally {
    e();
  }
}, Ne.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, Yo(this), Kr(this), Qt++;
  const e = Y;
  return Y = this, El.bind(this, e);
}, Ne.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.o = Ue, Ue = this);
}, Ne.prototype.d = function() {
  this.f |= 8, 1 & this.f || vr(this);
}, Ne.prototype.dispose = function() {
  this.d();
};
Kt({ build: (e, t, n) => Cn(t), config: tn({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(e, t, n) {
  const o = n.getOutput();
  return ne(() => o.disabled.value ? void 0 : e.registerRootListener((a) => {
    e.focus(() => {
      const s = document.activeElement;
      a === null || s !== null && a.contains(s) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Xo() {
  const e = te(), t = Bt(), n = Nn();
  e.clear(), e.append(n), t !== null && n.select(), Xe(t) && (t.format = 0);
}
function Wo(e, t = Xo) {
  return e.registerCommand(yo, (n) => (e.update(t), !0), No);
}
Kt({ build: (e, t, n) => Cn(t), config: tn({ $onClear: Xo }), name: "@lexical/extension/ClearEditor", register(e, t, n) {
  const { $onClear: o } = n.getOutput();
  return ne(() => Wo(e, o.value));
} });
function Tl(e) {
  return (typeof e.nodes == "function" ? e.nodes() : e.nodes) || [];
}
function Jo(e, t) {
  let n;
  return We(e(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = e(), n = t(this);
  } });
}
const rr = Kt({ build: (e) => Jo(() => e.getEditorState(), (t) => e.registerUpdateListener((n) => {
  t.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function J(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Zo(e, t) {
  if (e && t && !Array.isArray(t) && typeof e == "object" && typeof t == "object") {
    const n = e, o = t;
    for (const a in o) n[a] = Zo(n[a], o[a]);
    return e;
  }
  return t;
}
const xr = 0, or = 1, Qo = 2, Ln = 3, wn = 4, ye = 5, Vn = 6, ze = 7;
function jn(e) {
  return e.id === xr;
}
function ta(e) {
  return e.id === Qo;
}
function Rl(e) {
  return function(t) {
    return t.id === or;
  }(e) || J(305, String(e.id), String(or)), Object.assign(e, { id: Qo });
}
const Sl = /* @__PURE__ */ new Set();
class Dl {
  constructor(t, n) {
    ht(this, "builder");
    ht(this, "configs");
    ht(this, "_dependency");
    ht(this, "_peerNameSet");
    ht(this, "extension");
    ht(this, "state");
    ht(this, "_signal");
    this.builder = t, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: xr };
  }
  mergeConfigs() {
    let t = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : Qs;
    for (const o of this.configs) t = n(t, o);
    return t;
  }
  init(t) {
    const n = this.state;
    ta(n) || J(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, s = function(l, c, w) {
      return Object.assign(l, { config: c, id: Ln, registerState: w });
    }(n, this.mergeConfigs(), o);
    let i;
    this.state = s, this.extension.init && (i = this.extension.init(t, s.config, o)), this.state = function(l, c, w) {
      return Object.assign(l, { id: wn, initResult: c, registerState: w });
    }(s, i, a);
  }
  build(t) {
    const n = this.state;
    let o;
    n.id !== wn && J(307, String(n.id), String(ye)), this.extension.build && (o = this.extension.build(t, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(s, i, l) {
      return Object.assign(s, { id: ye, output: i, registerState: l });
    }(n, o, a);
  }
  register(t, n) {
    this._signal = n;
    const o = this.state;
    o.id !== ye && J(308, String(o.id), String(ye));
    const a = this.extension.register && this.extension.register(t, o.config, o.registerState);
    return this.state = function(s) {
      return Object.assign(s, { id: Vn });
    }(o), () => {
      const s = this.state;
      s.id !== ze && J(309, String(o.id), String(ze)), this.state = function(i) {
        return Object.assign(i, { id: ye });
      }(s), a && a();
    };
  }
  afterRegistration(t) {
    const n = this.state;
    let o;
    return n.id !== Vn && J(310, String(n.id), String(Vn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(t, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: ze });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && J(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && J(312, this.extension.name);
    const t = this.state;
    return function(n) {
      return n.id >= wn;
    }(t) || J(313, String(t.id), String(wn)), t.initResult;
  }
  getInitPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const t = this.state;
    return function(n) {
      return n.id >= Ln;
    }(t) || J(314, String(t.id), String(Ln)), { config: t.config };
  }
  getPeer(t) {
    const n = this.builder.extensionNameMap.get(t);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && J(315, this.extension.name, t.name), n.getExtensionInitDependency();
  }
  getDependency(t) {
    const n = this.builder.getExtensionRep(t);
    return n === void 0 && J(315, this.extension.name, t.name), n.getExtensionDependency();
  }
  getState() {
    const t = this.state;
    return function(n) {
      return n.id >= ze;
    }(t) || J(316, String(t.id), String(ze)), t;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Sl;
  }
  getPeerNameSet() {
    let t = this._peerNameSet;
    return t || (t = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = t), t;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const t = this.state;
      (function(n) {
        return n.id >= ye;
      })(t) || J(317, this.extension.name), this._dependency = { config: t.config, init: t.initResult, output: t.output };
    }
    return this._dependency;
  }
}
const Ur = { tag: dr };
function Ml() {
  const e = te();
  e.isEmpty() && e.append(Nn());
}
const Ol = Kt({ config: tn({ setOptions: Ur, updateOptions: Ur }), init: ({ $initialEditorState: e = Ml }) => ({ $initialEditorState: e, initialized: !1 }), afterRegistration(e, { updateOptions: t, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: s } = a;
    if (ri(s)) e.setEditorState(s, n);
    else if (typeof s == "function") e.update(() => {
      s(e);
    }, t);
    else if (s && (typeof s == "string" || typeof s == "object")) {
      const i = e.parseEditorState(s);
      e.setEditorState(i, n);
    }
  }
  return () => {
  };
}, name: "@lexical/extension/InitialState", nodes: [ti, xo, ei, ni, vo] }), qr = Symbol.for("@lexical/extension/LexicalBuilder");
function Hr() {
}
function Il(e) {
  throw e;
}
function cn(e) {
  return Array.isArray(e) ? e : [e];
}
const zn = "0.38.2+prod.esm";
class qe {
  constructor(t) {
    ht(this, "roots");
    ht(this, "extensionNameMap");
    ht(this, "outgoingConfigEdges");
    ht(this, "incomingEdges");
    ht(this, "conflicts");
    ht(this, "_sortedExtensionReps");
    ht(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = zn, this.roots = t;
    for (const n of t) this.addExtension(n);
  }
  static fromExtensions(t) {
    const n = [cn(Ol)];
    for (const o of t) n.push(cn(o));
    return new qe(n);
  }
  static maybeFromEditor(t) {
    const n = t[qr];
    return n && (n.PACKAGE_VERSION !== zn && J(292, n.PACKAGE_VERSION, zn), n instanceof qe || J(293)), n;
  }
  static fromEditor(t) {
    const n = qe.maybeFromEditor(t);
    return n === void 0 && J(294), n;
  }
  constructEditor() {
    const { $initialEditorState: t, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(bo({ ...o, ...n ? { onError: (s) => {
      n(s, a);
    } } : {} }), { [qr]: this });
    for (const s of this.sortedExtensionReps()) s.build(a);
    return a;
  }
  buildEditor() {
    let t = Hr;
    function n() {
      try {
        t();
      } finally {
        t = Hr;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return t = ee(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(t) {
    return this.extensionNameMap.has(t);
  }
  getExtensionRep(t) {
    const n = this.extensionNameMap.get(t.name);
    if (n) return n.extension !== t && J(295, t.name), n;
  }
  addEdge(t, n, o) {
    const a = this.outgoingConfigEdges.get(t);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(t, /* @__PURE__ */ new Map([[n, o]]));
    const s = this.incomingEdges.get(n);
    s ? s.add(t) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([t]));
  }
  addExtension(t) {
    this._sortedExtensionReps !== void 0 && J(296);
    const n = cn(t), [o] = n;
    typeof o.name != "string" && J(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && J(298, o.name), !a) {
      a = new Dl(this, o), this.extensionNameMap.set(o.name, a);
      const s = this.conflicts.get(o.name);
      typeof s == "string" && J(299, o.name, s);
      for (const i of o.conflictsWith || []) this.extensionNameMap.has(i) && J(299, o.name, i), this.conflicts.set(i, o.name);
      for (const i of o.dependencies || []) {
        const l = cn(i);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [i, l] of o.peerDependencies || []) this.addEdge(o.name, i, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const t = [], n = (o, a) => {
      let s = o.state;
      if (ta(s)) return;
      const i = o.extension.name;
      var l;
      jn(s) || J(300, i, a || "[unknown]"), jn(l = s) || J(304, String(l.id), String(xr)), s = Object.assign(l, { id: or }), o.state = s;
      const c = this.outgoingConfigEdges.get(i);
      if (c) for (const w of c.keys()) {
        const p = this.extensionNameMap.get(w);
        p && n(p, i);
      }
      s = Rl(s), o.state = s, t.push(o);
    };
    for (const o of this.extensionNameMap.values()) jn(o.state) && n(o);
    for (const o of t) for (const [a, s] of this.outgoingConfigEdges.get(o.extension.name) || []) if (s.length > 0) {
      const i = this.extensionNameMap.get(a);
      if (i) for (const l of s) i.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const s = this.extensionNameMap.get(o.name);
      s === void 0 && J(301, o.name);
      for (const i of a) s.configs.add(i);
    }
    return this._sortedExtensionReps = t, this._sortedExtensionReps;
  }
  registerEditor(t) {
    const n = this.sortedExtensionReps(), o = new AbortController(), a = [() => o.abort()], s = o.signal;
    for (const i of n) {
      const l = i.register(t, s);
      l && a.push(l);
    }
    for (const i of n) {
      const l = i.afterRegistration(t);
      l && a.push(l);
    }
    return ee(...a);
  }
  buildCreateEditorArgs() {
    const t = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = {}, i = {}, l = this.sortedExtensionReps();
    for (const p of l) {
      const { extension: f } = p;
      if (f.onError !== void 0 && (t.onError = f.onError), f.disableEvents !== void 0 && (t.disableEvents = f.disableEvents), f.parentEditor !== void 0 && (t.parentEditor = f.parentEditor), f.editable !== void 0 && (t.editable = f.editable), f.namespace !== void 0 && (t.namespace = f.namespace), f.$initialEditorState !== void 0 && (t.$initialEditorState = f.$initialEditorState), f.nodes) for (const h of Tl(f)) {
        if (typeof h != "function") {
          const u = o.get(h.replace);
          u && J(302, f.name, h.replace.name, u.extension.name), o.set(h.replace, p);
        }
        n.add(h);
      }
      if (f.html) {
        if (f.html.export) for (const [h, u] of f.html.export.entries()) a.set(h, u);
        f.html.import && Object.assign(s, f.html.import);
      }
      f.theme && Zo(i, f.theme);
    }
    Object.keys(i).length > 0 && (t.theme = i), n.size && (t.nodes = [...n]);
    const c = Object.keys(s).length > 0, w = a.size > 0;
    (c || w) && (t.html = {}, c && (t.html.import = s), w && (t.html.export = a));
    for (const p of l) p.init(t);
    return t.onError || (t.onError = Il), t;
  }
}
const Al = /* @__PURE__ */ new Set(), Yr = Kt({ build(e, t, n) {
  const o = n.getDependency(rr).output, a = We({ watchedNodeKeys: /* @__PURE__ */ new Map() }), s = Jo(() => {
  }, () => ne(() => {
    const i = s.peek(), { watchedNodeKeys: l } = a.value;
    let c, w = !1;
    o.value.read(() => {
      if (Bt()) for (const [p, f] of l.entries()) {
        if (f.size === 0) {
          l.delete(p);
          continue;
        }
        const h = mi(p), u = h && h.isSelected() || !1;
        w = w || u !== (!!i && i.has(p)), u && (c = c || /* @__PURE__ */ new Set(), c.add(p));
      }
    }), !w && c && i && c.size === i.size || (s.value = c);
  }));
  return { watchNodeKey: function(i) {
    const l = Cl(() => (s.value || Al).has(i)), { watchedNodeKeys: c } = a.peek();
    let w = c.get(i);
    const p = w !== void 0;
    return w = w || /* @__PURE__ */ new Set(), w.add(l), p || (c.set(i, w), a.value = { watchedNodeKeys: c }), l;
  } };
}, dependencies: [rr], name: "@lexical/extension/NodeSelection" });
oi("INSERT_HORIZONTAL_RULE_COMMAND");
class Ee extends pi {
  static getType() {
    return "horizontalrule";
  }
  static clone(t) {
    return new Ee(t.__key);
  }
  static importJSON(t) {
    return ea().updateFromJSON(t);
  }
  static importDOM() {
    return { hr: () => ({ conversion: Pl, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(t) {
    const n = document.createElement("hr");
    return Uo(n, t.theme.hr), n;
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
function Pl() {
  return { node: ea() };
}
function ea() {
  return ui(Ee);
}
function $l(e) {
  return e instanceof Ee;
}
Kt({ dependencies: [rr, Yr], name: "@lexical/extension/HorizontalRule", nodes: [Ee], register(e, t, n) {
  const { watchNodeKey: o } = n.getDependency(Yr).output, a = We({ nodeSelections: /* @__PURE__ */ new Map() }), s = e._config.theme.hrSelected ?? "selected";
  return ee(e.registerCommand(ai, (i) => {
    if (si(i.target)) {
      const l = ii(i.target);
      if ($l(l)) return function(c, w = !1) {
        const p = Bt(), f = c.isSelected(), h = c.getKey();
        let u;
        w && li(p) ? u = p : (u = wi(), ci(u)), f ? u.delete(h) : u.add(h);
      }(l, i.shiftKey), !0;
    }
    return !1;
  }, di), e.registerMutationListener(Ee, (i, l) => {
    _l(() => {
      let c = !1;
      const { nodeSelections: w } = a.peek();
      for (const [p, f] of i.entries()) if (f === "destroyed") w.delete(p), c = !0;
      else {
        const h = w.get(p), u = e.getElementByKey(p);
        h ? h.domNode.value = u : (c = !0, w.set(p, { domNode: We(u), selectedSignal: o(p) }));
      }
      c && (a.value = { nodeSelections: w });
    });
  }), ne(() => {
    const i = [];
    for (const { domNode: l, selectedSignal: c } of a.value.nodeSelections.values()) i.push(ne(() => {
      const w = l.value;
      w && (c.value ? Uo(w, s) : yl(w, s));
    }));
    return ee(...i);
  }));
} });
function Ll(e, t) {
  return ee(e.registerCommand(fi, (n) => {
    const o = Bt();
    if (!Xe(o)) return !1;
    n.preventDefault();
    const a = function(s) {
      const i = s.getNodes();
      if (Nl(i, (h) => un(h) && h.canIndent() ? h : null).length > 0) return !0;
      const l = s.anchor, c = s.focus, w = c.isBefore(l) ? c : l, p = w.getNode(), f = Fr(p);
      if (f.canIndent()) {
        const h = f.getKey();
        let u = hi();
        if (u.anchor.set(h, 0, "element"), u.focus.set(h, 0, "element"), u = gi(u), u.anchor.is(w)) return !0;
      }
      return !1;
    }(o) ? n.shiftKey ? bi : Pr : vi;
    return e.dispatchCommand(a, void 0);
  }, No), e.registerCommand(Pr, () => {
    const n = typeof t == "number" ? t : t ? t.peek() : null;
    if (n == null) return !1;
    const o = Bt();
    if (!Xe(o)) return !1;
    const a = o.getNodes().map((s) => Fr(s).getIndent());
    return Math.max(...a) + 1 >= n;
  }, pr));
}
Kt({ build: (e, t, n) => Cn(t), config: tn({ disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(e, t, n) {
  const { disabled: o, maxIndent: a } = n.getOutput();
  return ne(() => {
    if (!o.value) return Ll(e, a);
  });
} });
const Vl = Kt({ name: "@lexical/react/ReactProvider" });
function jl() {
  return te().getTextContent();
}
function zl(e, t = !0) {
  if (e) return !1;
  let n = jl();
  return t && (n = n.trim()), n === "";
}
function Fl(e) {
  if (!zl(e, !1)) return !1;
  const t = te().getChildren(), n = t.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = t[o];
    if (xi(a)) return !1;
    if (me(a)) {
      if (!yi(a) || a.__indent !== 0) return !1;
      const s = a.getChildren(), i = s.length;
      for (let l = 0; l < i; l++) {
        const c = s[o];
        if (!mn(c)) return !1;
      }
    }
  }
  return !0;
}
function na(e) {
  return () => Fl(e);
}
function ra(e) {
  const t = window.location.origin, n = (o) => {
    if (o.origin !== t) return;
    const a = e.getRootElement();
    if (document.activeElement !== a) return;
    const s = o.data;
    if (typeof s == "string") {
      let i;
      try {
        i = JSON.parse(s);
      } catch {
        return;
      }
      if (i && i.protocol === "nuanria_messaging" && i.type === "request") {
        const l = i.payload;
        if (l && l.functionId === "makeChanges") {
          const c = l.args;
          if (c) {
            const [w, p, f, h, u] = c;
            e.update(() => {
              const g = Bt();
              if (Xe(g)) {
                const x = g.anchor;
                let v = x.getNode(), y = 0, N = 0;
                if (mn(v) && w >= 0 && p >= 0 && (y = w, N = w + p, g.setTextNodeRange(v, y, v, N)), y === N && f === "" || (g.insertRawText(f), v = x.getNode()), mn(v)) {
                  y = h, N = h + u;
                  const C = v.getTextContentSize();
                  y = y > C ? C : y, N = N > C ? C : N, g.setTextNodeRange(v, y, v, N);
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
Kt({ build: (e, t, n) => Cn(t), config: tn({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (e, t, n) => ne(() => n.getOutput().disabled.value ? void 0 : ra(e)) });
function Bl(e, ...t) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", e);
  for (const a of t) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${e}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const yr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : H;
function Gl({ editor: e, ErrorBoundary: t }) {
  return function(n, o) {
    const [a, s] = A(() => n.getDecorators());
    return yr(() => n.registerDecoratorListener((i) => {
      Oi(() => {
        s(i);
      });
    }), [n]), H(() => {
      s(n.getDecorators());
    }, [n]), j(() => {
      const i = [], l = Object.keys(a);
      for (let c = 0; c < l.length; c++) {
        const w = l[c], p = r(o, { onError: (h) => n._onError(h), children: r(es, { fallback: null, children: a[w] }) }), f = n.getElementByKey(w);
        f !== null && i.push(Ii(p, f, w));
      }
      return i;
    }, [o, a, n]);
  }(e, t);
}
function Kl({ editor: e, ErrorBoundary: t }) {
  return function(n) {
    const o = qe.maybeFromEditor(n);
    if (o && o.hasExtensionByName(Vl.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Bl(320, a);
      return !0;
    }
    return !1;
  }(e) ? null : r(Gl, { editor: e, ErrorBoundary: t });
}
function Xr(e) {
  return e.getEditorState().read(na(e.isComposing()));
}
function Ul({ contentEditable: e, placeholder: t = null, ErrorBoundary: n }) {
  const [o] = $t();
  return function(a) {
    yr(() => ee(Mi(a), ra(a)), [a]);
  }(o), d(at, { children: [e, r(ql, { content: t }), r(Kl, { editor: o, ErrorBoundary: n })] });
}
function ql({ content: e }) {
  const [t] = $t(), n = function(a) {
    const [s, i] = A(() => Xr(a));
    return yr(() => {
      function l() {
        const c = Xr(a);
        i(c);
      }
      return l(), ee(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), s;
  }(t), o = gl();
  return n ? typeof e == "function" ? e(o) : e : null;
}
function Hl({ defaultSelection: e }) {
  const [t] = $t();
  return H(() => {
    t.focus(() => {
      const n = document.activeElement, o = t.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: e });
  }, [e, t]), null;
}
const Yl = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : H;
function Xl({ onClear: e }) {
  const [t] = $t();
  return Yl(() => Wo(t, e), [t, e]), null;
}
const oa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? Ft : H;
function Wl({ editor: e, ariaActiveDescendant: t, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: s, ariaExpanded: i, ariaInvalid: l, ariaLabel: c, ariaLabelledBy: w, ariaMultiline: p, ariaOwns: f, ariaRequired: h, autoCapitalize: u, className: g, id: x, role: v = "textbox", spellCheck: y = !0, style: N, tabIndex: C, "data-testid": S, ...$ }, L) {
  const [k, T] = A(e.isEditable()), E = G((P) => {
    P && P.ownerDocument && P.ownerDocument.defaultView ? e.setRootElement(P) : e.setRootElement(null);
  }, [e]), R = j(() => /* @__PURE__ */ function(...P) {
    return (_) => {
      for (const z of P) typeof z == "function" ? z(_) : z != null && (z.current = _);
    };
  }(L, E), [E, L]);
  return oa(() => (T(e.isEditable()), e.registerEditableListener((P) => {
    T(P);
  })), [e]), r("div", { "aria-activedescendant": k ? t : void 0, "aria-autocomplete": k ? n : "none", "aria-controls": k ? o : void 0, "aria-describedby": a, ...s != null ? { "aria-errormessage": s } : {}, "aria-expanded": k && v === "combobox" ? !!i : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": c, "aria-labelledby": w, "aria-multiline": p, "aria-owns": k ? f : void 0, "aria-readonly": !k || void 0, "aria-required": h, autoCapitalize: u, className: g, contentEditable: k, "data-testid": S, id: x, ref: R, role: v, spellCheck: y, style: N, tabIndex: C, ...$ });
}
const Jl = Qe(Wl);
function Wr(e) {
  return e.getEditorState().read(na(e.isComposing()));
}
const Zl = Qe(Ql);
function Ql(e, t) {
  const { placeholder: n, ...o } = e, [a] = $t();
  return d(at, { children: [r(Jl, { editor: a, ...o, ref: t }), n != null && r(tw, { editor: a, content: n })] });
}
function tw({ content: e, editor: t }) {
  const n = function(i) {
    const [l, c] = A(() => Wr(i));
    return oa(() => {
      function w() {
        const p = Wr(i);
        c(p);
      }
      return w(), ee(i.registerUpdateListener(() => {
        w();
      }), i.registerEditableListener(() => {
        w();
      }));
    }, [i]), l;
  }(t), [o, a] = A(t.isEditable());
  if (Ft(() => (a(t.isEditable()), t.registerEditableListener((i) => {
    a(i);
  })), [t]), !n) return null;
  let s = null;
  return typeof e == "function" ? s = e(o) : e !== null && (s = e), s === null ? null : r("div", { "aria-hidden": !0, children: s });
}
function ew({
  placeholder: e,
  className: t,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Zl,
    {
      className: t ?? "ContentEditable__root tw-relative tw-block tw-min-h-11 tw-overflow-auto tw-px-3 tw-py-3 tw-text-sm tw-outline-none",
      "aria-placeholder": e,
      placeholder: /* @__PURE__ */ r(
        "div",
        {
          className: n ?? "tw-pointer-events-none tw-absolute tw-top-0 tw-select-none tw-overflow-hidden tw-text-ellipsis tw-px-3 tw-py-3 tw-text-sm tw-text-muted-foreground",
          children: e
        }
      )
    }
  );
}
const aa = xn(void 0);
function nw({
  activeEditor: e,
  $updateToolbar: t,
  blockType: n,
  setBlockType: o,
  showModal: a,
  children: s
}) {
  const i = j(
    () => ({
      activeEditor: e,
      $updateToolbar: t,
      blockType: n,
      setBlockType: o,
      showModal: a
    }),
    [e, t, n, o, a]
  );
  return /* @__PURE__ */ r(aa.Provider, { value: i, children: s });
}
function sa() {
  const e = cr(aa);
  if (!e)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return e;
}
function rw() {
  const [e, t] = A(void 0), n = G(() => {
    t(void 0);
  }, []), o = j(() => {
    if (e === void 0)
      return;
    const { title: s, content: i } = e;
    return /* @__PURE__ */ r(Hi, { open: !0, onOpenChange: n, children: /* @__PURE__ */ d(Io, { children: [
      /* @__PURE__ */ r(Ao, { children: /* @__PURE__ */ r(Po, { children: s }) }),
      i
    ] }) });
  }, [e, n]), a = G(
    (s, i, l = !1) => {
      t({
        closeOnClickOutside: l,
        content: i(n),
        title: s
      });
    },
    [n]
  );
  return [o, a];
}
function ow({
  children: e
}) {
  const [t] = $t(), [n, o] = A(t), [a, s] = A("paragraph"), [i, l] = rw(), c = () => {
  };
  return H(() => n.registerCommand(
    ko,
    (w, p) => (o(p), !1),
    pr
  ), [n]), /* @__PURE__ */ d(
    nw,
    {
      activeEditor: n,
      $updateToolbar: c,
      blockType: a,
      setBlockType: s,
      showModal: l,
      children: [
        i,
        e({ blockType: a })
      ]
    }
  );
}
function aw(e) {
  const [t] = $t(), { activeEditor: n } = sa();
  H(() => n.registerCommand(
    ko,
    () => {
      const o = Bt();
      return o && e(o), !1;
    },
    pr
  ), [t, e]), H(() => {
    n.getEditorState().read(() => {
      const o = Bt();
      o && e(o);
    });
  }, [n, e]);
}
const ia = re(
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
), sw = b.forwardRef(({ className: e, variant: t, size: n, ...o }, a) => /* @__PURE__ */ r(
  Eo.Root,
  {
    ref: a,
    className: m(ia({ variant: t, size: n, className: e })),
    ...o
  }
));
sw.displayName = Eo.Root.displayName;
const la = b.createContext({
  size: "default",
  variant: "default"
}), Nr = b.forwardRef(({ className: e, variant: t, size: n, children: o, ...a }, s) => {
  const i = wt();
  return /* @__PURE__ */ r(
    kn.Root,
    {
      ref: s,
      className: m("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
      ...a,
      dir: i,
      children: /* @__PURE__ */ r(
        la.Provider,
        {
          value: { variant: t, size: n },
          children: o
        }
      )
    }
  );
});
Nr.displayName = kn.Root.displayName;
const He = b.forwardRef(({ className: e, children: t, variant: n, size: o, ...a }, s) => {
  const i = b.useContext(la);
  return /* @__PURE__ */ r(
    kn.Item,
    {
      ref: s,
      className: m(
        ia({
          variant: i.variant || n,
          size: i.size || o
        }),
        e
      ),
      ...a,
      children: t
    }
  );
});
He.displayName = kn.Item.displayName;
const Jr = [
  { format: "bold", icon: as, label: "Bold" },
  { format: "italic", icon: ss, label: "Italic" },
  { format: "underline", icon: is, label: "Underline" },
  { format: "strikethrough", icon: ls, label: "Strikethrough" }
];
function iw() {
  const { activeEditor: e } = sa(), [t, n] = A([]), o = G((a) => {
    if (Xe(a) || Ai(a)) {
      const s = [];
      Jr.forEach(({ format: i }) => {
        a.hasFormat(i) && s.push(i);
      }), n((i) => i.length !== s.length || !s.every((l) => i.includes(l)) ? s : i);
    }
  }, []);
  return aw(o), /* @__PURE__ */ r(
    Nr,
    {
      type: "multiple",
      value: t,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: Jr.map(({ format: a, icon: s, label: i }) => /* @__PURE__ */ r(
        He,
        {
          value: a,
          "aria-label": i,
          onClick: () => {
            e.dispatchCommand(Ni, a);
          },
          children: /* @__PURE__ */ r(s, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function lw({ onClear: e }) {
  const [t] = $t();
  H(() => {
    e && e(() => {
      t.dispatchCommand(yo, void 0);
    });
  }, [t, e]);
}
function ww({
  placeholder: e = "Start typing ...",
  autoFocus: t = !1,
  onClear: n
}) {
  const [, o] = A(void 0);
  return /* @__PURE__ */ d("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(ow, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(iw, {}) }) }),
    /* @__PURE__ */ d("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        Ul,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (s) => {
            s !== void 0 && o(s);
          }, children: /* @__PURE__ */ r(ew, { placeholder: e }) }),
          ErrorBoundary: ml
        }
      ),
      t && /* @__PURE__ */ r(Hl, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(lw, { onClear: n }),
      /* @__PURE__ */ r(Xl, {})
    ] })
  ] });
}
const cw = {
  namespace: "commentEditor",
  theme: gr,
  nodes: br,
  onError: (e) => {
    console.error(e);
  }
};
function hn({
  editorState: e,
  editorSerializedState: t,
  onChange: n,
  onSerializedChange: o,
  placeholder: a = "Start typing…",
  autoFocus: s = !1,
  onClear: i,
  className: l
}) {
  return (
    // CUSTOM: Added `className` prop
    /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          ll,
          {
            initialConfig: {
              ...cw,
              ...e ? { editorState: e } : {},
              ...t ? { editorState: JSON.stringify(t) } : {}
            },
            children: /* @__PURE__ */ d(Ct, { children: [
              /* @__PURE__ */ r(ww, { placeholder: a, autoFocus: s, onClear: i }),
              /* @__PURE__ */ r(
                cl,
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
function dw(e, t) {
  const n = Ci(t) ? t.body.childNodes : t.childNodes;
  let o = [];
  const a = [];
  for (const s of n) if (!ca.has(s.nodeName)) {
    const i = da(s, e, a, !1);
    i !== null && (o = o.concat(i));
  }
  return function(s) {
    for (const i of s) i.getNextSibling() instanceof _o && i.insertAfter(Co());
    for (const i of s) {
      const l = i.getChildren();
      for (const c of l) i.insertBefore(c);
      i.remove();
    }
  }(a), o;
}
function pw(e, t) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = te().getChildren();
  for (let a = 0; a < o.length; a++)
    wa(e, o[a], n, t);
  return n.innerHTML;
}
function wa(e, t, n, o = null) {
  let a = o === null || t.isSelected(o);
  const s = me(t) && t.excludeFromCopy("html");
  let i = t;
  o !== null && mn(t) && (i = bl(o, t, "clone"));
  const l = me(i) ? i.getChildren() : [], c = ki(e, i.getType());
  let w;
  w = c && c.exportDOM !== void 0 ? c.exportDOM(e, i) : i.exportDOM(e);
  const { element: p, after: f } = w;
  if (!p) return !1;
  const h = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], x = wa(e, g, h, o);
    !a && me(t) && x && t.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !s) {
    if ((_i(p) || $r(p)) && p.append(h), n.append(p), f) {
      const u = f.call(i, p);
      u && ($r(p) ? p.replaceChildren(u) : p.replaceWith(u));
    }
  } else n.append(h);
  return a;
}
const ca = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function da(e, t, n, o, a = /* @__PURE__ */ new Map(), s) {
  let i = [];
  if (ca.has(e.nodeName)) return i;
  let l = null;
  const c = function(g, x) {
    const { nodeName: v } = g, y = x._htmlConversions.get(v.toLowerCase());
    let N = null;
    if (y !== void 0) for (const C of y) {
      const S = C(g);
      S !== null && (N === null || (N.priority || 0) <= (S.priority || 0)) && (N = S);
    }
    return N !== null ? N.conversion : null;
  }(e, t), w = c ? c(e) : null;
  let p = null;
  if (w !== null) {
    p = w.after;
    const g = w.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, x] of a) if (l = x(l, s), !l) break;
      l && i.push(...Array.isArray(g) ? g : [l]);
    }
    w.forChild != null && a.set(e.nodeName, w.forChild);
  }
  const f = e.childNodes;
  let h = [];
  const u = (l == null || !Ei(l)) && (l != null && un(l) || o);
  for (let g = 0; g < f.length; g++) h.push(...da(f[g], t, n, u, new Map(a), l));
  return p != null && (h = p(h)), Lr(e) && (h = uw(e, h, u ? () => {
    const g = new _o();
    return n.push(g), g;
  } : Nn)), l == null ? h.length > 0 ? i = i.concat(h) : Lr(e) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : Vr(g.nextSibling) && Vr(g.previousSibling);
  }(e) && (i = i.concat(Co())) : me(l) && l.append(...h), i;
}
function uw(e, t, n) {
  const o = e.style.textAlign, a = [];
  let s = [];
  for (let i = 0; i < t.length; i++) {
    const l = t[i];
    if (un(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (s.push(l), i === t.length - 1 || i < t.length - 1 && un(t[i + 1])) {
      const c = n();
      c.setFormat(o), c.append(...s), a.push(c), s = [];
    }
  }
  return a;
}
function pa(e) {
  const t = e.querySelector('[contenteditable="true"]');
  if (!t) return !1;
  t.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(t), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function ua(e) {
  return e ? e.some(
    (t) => t && "text" in t && t.text.trim().length > 0 ? !0 : !t || !("children" in t) ? !1 : ua(t.children)
  ) : !1;
}
function _t(e) {
  var t;
  return (t = e == null ? void 0 : e.root) != null && t.children ? ua(e.root.children) : !1;
}
function mw(e) {
  if (!e || e.trim() === "")
    throw new Error("Input HTML is empty");
  const t = To({
    namespace: "EditorUtils",
    theme: gr,
    nodes: br,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (t.update(
    () => {
      const a = new DOMParser().parseFromString(e, "text/html"), s = dw(t, a);
      te().clear(), Ti(s);
    },
    {
      discrete: !0
    }
  ), t.getEditorState().read(() => {
    n = t.getEditorState().toJSON();
  }), !n)
    throw new Error("Failed to convert HTML to editor state");
  return n;
}
function gn(e) {
  const t = To({
    namespace: "EditorUtils",
    theme: gr,
    nodes: br,
    onError: (a) => {
      console.error(a);
    }
  }), n = t.parseEditorState(JSON.stringify(e));
  t.setEditorState(n);
  let o = "";
  return t.getEditorState().read(() => {
    o = pw(t);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function kr(e) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key) ? (e.stopPropagation(), !0) : !1;
}
const fw = {
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
function Fn(e, t) {
  return e === "" ? t["%commentEditor_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%commentEditor_team%"] ?? "Team" : e;
}
function tp({
  assignableUsers: e,
  onSave: t,
  onClose: n,
  localizedStrings: o
}) {
  const [a, s] = A(fw), [i, l] = A(void 0), [c, w] = A(!1), p = X(void 0), f = X(null);
  H(() => {
    let y = !0;
    const N = f.current;
    if (!N) return;
    const C = setTimeout(() => {
      y && pa(N);
    }, 300);
    return () => {
      y = !1, clearTimeout(C);
    };
  }, []);
  const h = G(() => {
    if (!_t(a)) return;
    const y = gn(a);
    t(y, i);
  }, [a, t, i]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_saveButton_tooltip%"] ?? "Save comment", x = o["%commentEditor_cancelButton_tooltip%"] ?? "Cancel", v = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ d("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: v }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-2", children: [
        /* @__PURE__ */ r(Ct, { children: /* @__PURE__ */ d(At, { children: [
          /* @__PURE__ */ r(jt, { asChild: !0, children: /* @__PURE__ */ r(V, { onClick: n, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Me, {}) }) }),
          /* @__PURE__ */ r(Et, { children: /* @__PURE__ */ r("p", { children: x }) })
        ] }) }),
        /* @__PURE__ */ r(Ct, { children: /* @__PURE__ */ d(At, { children: [
          /* @__PURE__ */ r(jt, { asChild: !0, children: /* @__PURE__ */ r(
            V,
            {
              onClick: h,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              disabled: !_t(a),
              children: /* @__PURE__ */ r(Rt, {})
            }
          ) }),
          /* @__PURE__ */ r(Et, { children: /* @__PURE__ */ r("p", { children: g }) })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ d(oe, { open: c, onOpenChange: w, children: [
      /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
        V,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: e.length === 0,
          children: [
            /* @__PURE__ */ r(io, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: Fn(i !== void 0 ? i : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        Ht,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (y) => {
            y.key === "Escape" && (y.stopPropagation(), w(!1));
          },
          children: /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r(qt, { children: e.map((y) => /* @__PURE__ */ r(
            Pt,
            {
              onSelect: () => {
                l(y === "" ? void 0 : y), w(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: Fn(y, o) })
            },
            y || "unassigned"
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
        className: "tw-outline-none",
        onKeyDownCapture: (y) => {
          y.key === "Escape" ? (y.preventDefault(), y.stopPropagation(), n()) : y.key === "Enter" && y.shiftKey && (y.preventDefault(), y.stopPropagation(), _t(a) && h());
        },
        onKeyDown: (y) => {
          kr(y), (y.key === "Enter" || y.key === " ") && y.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          hn,
          {
            editorSerializedState: a,
            onSerializedChange: (y) => s(y),
            placeholder: u,
            onClear: (y) => {
              p.current = y;
            }
          }
        )
      }
    )
  ] });
}
const ep = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_saveButton_tooltip%",
  "%commentEditor_cancelButton_tooltip%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%"
]), np = [
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
], hw = ["input", "select", "textarea", "button"], gw = ["button", "textbox"], bw = ({
  options: e,
  onFocusChange: t,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = X(null), [s, i] = A(void 0), [l, c] = A(void 0), w = G(
    (u) => {
      i(u);
      const g = e.find((v) => v.id === u);
      g && (t == null || t(g));
      const x = document.getElementById(u);
      x && (x.scrollIntoView({ block: "center" }), x.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [t, e]
  ), p = G(
    (u) => {
      const g = e.find((x) => x.id === u);
      g && (c((x) => x === u ? void 0 : u), n == null || n(g));
    },
    [n, e]
  ), f = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || hw.includes(g)) return !0;
    const x = u.getAttribute("role");
    if (x && gw.includes(x)) return !0;
    const v = u.getAttribute("tabindex");
    return v !== void 0 && v !== "-1";
  }, h = G(
    (u) => {
      var k;
      const g = u.target, x = (T) => T ? document.getElementById(T) : void 0, v = x(l), y = x(s);
      if (!!(v && g && v.contains(g) && g !== v) && f(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const T = e.find((E) => E.id === l);
            T && w(T.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!v) return;
          const T = Array.from(
            v.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (T.length === 0) return;
          const E = T.findIndex((P) => P === g);
          if (E === -1) return;
          let R;
          u.key === "ArrowDown" ? R = Math.min(E + 1, T.length - 1) : R = Math.max(E - 1, 0), R !== E && (u.preventDefault(), u.stopPropagation(), (k = T[R]) == null || k.focus());
          return;
        }
        return;
      }
      const S = e.findIndex((T) => T.id === s);
      let $ = S;
      switch (u.key) {
        case "ArrowDown":
          $ = Math.min(S + 1, e.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          $ = Math.max(S - 1, 0), u.preventDefault();
          break;
        case "Home":
          $ = 0, u.preventDefault();
          break;
        case "End":
          $ = e.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          s && p(s), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const T = y;
          if (T) {
            const E = T.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), R = T.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), P = E ?? R;
            if (P) {
              u.preventDefault(), P.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (f(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const L = e[$];
      L && w(L.id);
    },
    [e, w, s, l, p, o]
  );
  return {
    listboxRef: a,
    activeId: s,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: h,
    /** Focus an option by its ID */
    focusOption: w
  };
}, vw = re(
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
), Te = b.forwardRef(
  ({ className: e, variant: t, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: m("pr-twp", vw({ variant: t }), e), ...n })
);
Te.displayName = "Badge";
const ma = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
ma.displayName = "Card";
const xw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
xw.displayName = "CardHeader";
const yw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: m(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
yw.displayName = "CardTitle";
const Nw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("p", { ref: n, className: m("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Nw.displayName = "CardDescription";
const fa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
fa.displayName = "CardContent";
const kw = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: m("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
kw.displayName = "CardFooter";
const Re = b.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  Ro.Root,
  {
    ref: a,
    decorative: n,
    orientation: t,
    className: m(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...o
  }
));
Re.displayName = Ro.Root.displayName;
const ha = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ae.Root,
  {
    ref: n,
    className: m(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      e
    ),
    ...t
  }
));
ha.displayName = Ae.Root.displayName;
const _w = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ae.Image,
  {
    ref: n,
    className: m("pr-twp tw-aspect-square tw-h-full tw-w-full", e),
    ...t
  }
));
_w.displayName = Ae.Image.displayName;
const ga = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ae.Fallback,
  {
    ref: n,
    className: m(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      e
    ),
    ...t
  }
));
ga.displayName = Ae.Fallback.displayName;
const _r = xn(void 0);
function Dt() {
  const e = cr(_r);
  if (!e)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return e;
}
const Yt = re("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), $e = Z.Trigger, ba = Z.Group, Cw = Z.Portal, Ew = Z.Sub, Tw = Z.RadioGroup;
function ve({ variant: e = "default", ...t }) {
  const n = b.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(_r.Provider, { value: n, children: /* @__PURE__ */ r(Z.Root, { ...t }) });
}
const va = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => {
  const s = Dt();
  return /* @__PURE__ */ d(
    Z.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        t && "tw-pl-8",
        e,
        Yt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(_e, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
va.displayName = Z.SubTrigger.displayName;
const xa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Z.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
xa.displayName = Z.SubContent.displayName;
const se = b.forwardRef(({ className: e, sideOffset: t = 4, children: n, ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ r(Z.Portal, { children: /* @__PURE__ */ r(
    Z.Content,
    {
      ref: a,
      sideOffset: t,
      className: m(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        e
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: s, children: n })
    }
  ) });
});
se.displayName = Z.Content.displayName;
const bn = b.forwardRef(({ className: e, inset: t, ...n }, o) => {
  const a = wt(), s = Dt();
  return /* @__PURE__ */ r(
    Z.Item,
    {
      ref: o,
      className: m(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        e,
        Yt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
bn.displayName = Z.Item.displayName;
const zt = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => {
  const s = Dt();
  return /* @__PURE__ */ d(
    Z.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Yt({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Z.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
zt.displayName = Z.CheckboxItem.displayName;
const ya = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = Dt();
  return /* @__PURE__ */ d(
    Z.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e,
        Yt({ variant: a.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(Z.ItemIndicator, { children: /* @__PURE__ */ r(yn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
ya.displayName = Z.RadioItem.displayName;
const rn = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  Z.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
rn.displayName = Z.Label.displayName;
const Le = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Z.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Le.displayName = Z.Separator.displayName;
function Rw({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
Rw.displayName = "DropdownMenuShortcut";
function pn(e, t) {
  return e === "" ? t["%comment_assign_unassigned%"] ?? "Unassigned" : e === "Team" ? t["%comment_assign_team%"] ?? "Team" : e;
}
function Zr({
  comment: e,
  isReply: t = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: s,
  onEditingChange: i,
  canEditOrDelete: l = !1
}) {
  const [c, w] = A(!1), [p, f] = A(), h = X(null);
  H(() => {
    if (!c) return;
    let S = !0;
    const $ = h.current;
    if (!$) return;
    const L = setTimeout(() => {
      S && pa($);
    }, 300);
    return () => {
      S = !1, clearTimeout(L);
    };
  }, [c]);
  const u = G(() => {
    w(!1), f(void 0), i == null || i(!1);
  }, [i]), g = G(async () => {
    if (!p || !a) return;
    await a(
      e.id,
      gn(p)
    ) && (w(!1), f(void 0), i == null || i(!1));
  }, [p, a, e.id, i]), x = j(() => {
    const S = new Date(e.date), $ = zs(
      S,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), L = S.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return pe(n["%comment_dateAtTime%"], {
      date: $,
      time: L
    });
  }, [e.date, n]), v = j(() => e.user, [e.user]), y = j(
    () => e.user.split(" ").map((S) => S[0]).join("").toUpperCase().slice(0, 2),
    [e.user]
  ), N = j(() => Fs(e.contents), [e.contents]), C = j(() => {
    if (o && l)
      return /* @__PURE__ */ d(at, { children: [
        /* @__PURE__ */ d(
          bn,
          {
            onClick: () => {
              w(!0), f(mw(e.contents)), i == null || i(!0);
            },
            children: [
              /* @__PURE__ */ r(ws, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ d(
          bn,
          {
            onClick: async () => {
              s && await s(e.id);
            },
            children: [
              /* @__PURE__ */ r(cs, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_deleteComment%"]
            ]
          }
        )
      ] });
  }, [
    l,
    o,
    n,
    e.contents,
    e.id,
    s,
    i
  ]);
  return /* @__PURE__ */ d(
    "div",
    {
      className: m("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": t
      }),
      children: [
        /* @__PURE__ */ r(ha, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(ga, { className: "tw-text-xs tw-font-medium", children: y }) }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: v }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: x }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            t && e.assignedUser !== void 0 && /* @__PURE__ */ d(Te, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              pn(e.assignedUser, n)
            ] })
          ] }),
          c && /* @__PURE__ */ d(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: h,
              onKeyDownCapture: (S) => {
                S.key === "Escape" ? (S.preventDefault(), S.stopPropagation(), u()) : S.key === "Enter" && S.shiftKey && (S.preventDefault(), S.stopPropagation(), _t(p) && g());
              },
              onKeyDown: (S) => {
                kr(S), (S.key === "Enter" || S.key === " ") && S.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  hn,
                  {
                    className: m(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: p,
                    onSerializedChange: (S) => f(S)
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-start tw-justify-end tw-gap-2", children: [
                  /* @__PURE__ */ r(
                    V,
                    {
                      size: "icon",
                      onClick: u,
                      variant: "outline",
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      children: /* @__PURE__ */ r(Me, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    V,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !_t(p),
                      children: /* @__PURE__ */ r(lo, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !c && /* @__PURE__ */ d(at, { children: [
            e.status === "Resolved" && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            e.status === "Todo" && t && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
            /* @__PURE__ */ r(
              "div",
              {
                className: m(
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
                dangerouslySetInnerHTML: { __html: N }
              }
            )
          ] })
        ] }),
        C && /* @__PURE__ */ d(ve, { children: [
          /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(V, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(wo, {}) }) }),
          /* @__PURE__ */ r(se, { align: "end", children: C })
        ] })
      ]
    }
  );
}
const Qr = {
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
function Sw({
  classNameForVerseText: e,
  comments: t,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: s,
  currentUser: i,
  handleSelectThread: l,
  threadId: c,
  threadStatus: w,
  handleAddCommentToThread: p,
  handleUpdateComment: f,
  handleDeleteComment: h,
  handleReadStatusChange: u,
  assignableUsers: g,
  canUserAddCommentToThread: x,
  canUserAssignThreadCallback: v,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: N,
  isRead: C = !1,
  autoReadDelay: S = 5
}) {
  const [$, L] = A(Qr), k = o, [T, E] = A(!1), [R, P] = A(!1), [_, z] = A(!1), [D, F] = A(void 0), [O, U] = A(!1), [it, bt] = A(!1), [pt, ut] = A(C), [Nt, B] = A(!1), et = X(void 0), [ft, ct] = A(/* @__PURE__ */ new Map());
  H(() => {
    let M = !0;
    return (async () => {
      const Mt = y ? await y(c) : !1;
      M && bt(Mt);
    })(), () => {
      M = !1;
    };
  }, [c, y]), H(() => {
    let M = !0;
    if (!o) {
      U(!1), ct(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Mt = v ? await v(c) : !1;
      M && U(Mt);
    })(), () => {
      M = !1;
    };
  }, [o, c, v]);
  const mt = j(() => t.filter((M) => !M.deleted), [t]);
  H(() => {
    let M = !0;
    if (!o || !N) {
      ct(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const Mt = /* @__PURE__ */ new Map();
      await Promise.all(
        mt.map(async (Sr) => {
          const Ja = await N(Sr.id);
          M && Mt.set(Sr.id, Ja);
        })
      ), M && ct(Mt);
    })(), () => {
      M = !1;
    };
  }, [o, mt, N]);
  const ie = j(() => mt[0], [mt]), Mn = X(null), xe = X(void 0), Xt = G(() => {
    var M;
    (M = xe.current) == null || M.call(xe), L(Qr);
  }, []), On = G(() => {
    const M = !pt;
    ut(M), B(!M), u == null || u(c, M);
  }, [pt, u, c]);
  H(() => {
    E(!1);
  }, [o]), H(() => {
    if (o && !pt && !Nt) {
      const M = setTimeout(() => {
        ut(!0), u == null || u(c, !0);
      }, S * 1e3);
      return et.current = M, () => clearTimeout(M);
    }
    et.current && (clearTimeout(et.current), et.current = void 0);
  }, [o, pt, Nt, S, c, u]);
  const Wt = j(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), on = j(() => {
    if (s === void 0)
      return;
    if (s === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const M = pn(s, n);
    return pe(n["%comment_assigned_to%"], {
      assignedUser: M
    });
  }, [s, n]), I = j(() => mt.slice(1), [mt]), K = j(() => I.length ?? 0, [I.length]), nt = j(() => K > 0, [K]), dt = j(() => T || K <= 2 ? I : I.slice(-2), [I, K, T]), st = j(() => T || K <= 2 ? 0 : K - 2, [K, T]), Lt = j(
    () => K === 1 ? Wt.singleReply : pe(Wt.multipleReplies, { count: K }),
    [K, Wt]
  ), kt = j(
    () => st === 1 ? Wt.singleReply : pe(Wt.multipleReplies, { count: st }),
    [st, Wt]
  ), je = G(async () => {
    const M = _t($) ? gn($) : void 0;
    if (D !== void 0) {
      await p({
        threadId: c,
        contents: M,
        assignedUser: D
      }) && (F(void 0), M && Xt());
      return;
    }
    M && await p({ threadId: c, contents: M }) && Xt();
  }, [Xt, $, p, D, c]), Jt = G(
    async (M) => {
      const le = _t($) ? gn($) : void 0, Mt = await p({
        ...M,
        contents: le,
        assignedUser: D ?? M.assignedUser
      });
      return Mt && le && Xt(), Mt && D !== void 0 && F(void 0), Mt;
    },
    [Xt, $, p, D]
  );
  return /* @__PURE__ */ r(
    ma,
    {
      role: "option",
      "aria-selected": o,
      id: c,
      className: m(
        "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        { "tw-cursor-pointer hover:tw-shadow-md": !o },
        {
          "tw-bg-primary-foreground": !o && w !== "Resolved" && pt,
          "tw-bg-background": o && w !== "Resolved" && pt,
          "tw-bg-muted": w === "Resolved",
          "tw-bg-blue-50": !pt && !o && w !== "Resolved"
        }
      ),
      onClick: () => {
        l(c);
      },
      tabIndex: -1,
      children: /* @__PURE__ */ d(fa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            on && /* @__PURE__ */ r(Te, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: on }),
            /* @__PURE__ */ r(
              V,
              {
                variant: "ghost",
                size: "icon",
                onClick: (M) => {
                  M.stopPropagation(), On();
                },
                className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                "aria-label": pt ? "Mark as unread" : "Mark as read",
                children: pt ? /* @__PURE__ */ r(ds, {}) : /* @__PURE__ */ r(ps, {})
              }
            ),
            it && w !== "Resolved" && /* @__PURE__ */ r(
              V,
              {
                variant: "ghost",
                size: "icon",
                className: m(
                  "tw-ms-auto",
                  "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                  "tw-opacity-0 group-hover:tw-opacity-100"
                ),
                onClick: (M) => {
                  M.stopPropagation(), Jt({
                    threadId: c,
                    status: "Resolved"
                  });
                },
                "aria-label": "Resolve thread",
                children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" })
              }
            )
          ] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ d(
            "p",
            {
              ref: Mn,
              className: m(
                "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                {
                  "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": k
                },
                { "tw-whitespace-nowrap": !k }
              ),
              children: [
                a,
                /* @__PURE__ */ d("span", { className: e, children: [
                  ie.contextBefore,
                  /* @__PURE__ */ r("span", { className: "tw-font-bold", children: ie.selectedText }),
                  ie.contextAfter
                ] })
              ]
            }
          ) }),
          /* @__PURE__ */ r(
            Zr,
            {
              comment: ie,
              localizedStrings: n,
              isThreadExpanded: o,
              threadStatus: w,
              handleAddCommentToThread: Jt,
              handleUpdateComment: f,
              handleDeleteComment: h,
              onEditingChange: P,
              canEditOrDelete: ft.get(ie.id) ?? !1,
              canUserResolveThread: it
            }
          )
        ] }),
        /* @__PURE__ */ d(at, { children: [
          nt && !o && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
            /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Re, {}) }),
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: Lt })
          ] }),
          !o && _t($) && /* @__PURE__ */ r(
            hn,
            {
              editorSerializedState: $,
              onSerializedChange: (M) => L(M),
              placeholder: n["%comment_replyOrAssign%"]
            }
          ),
          o && /* @__PURE__ */ d(at, { children: [
            st > 0 && /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                onClick: (M) => {
                  M.stopPropagation(), E(!0);
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (M) => {
                  (M.key === "Enter" || M.key === " ") && (M.preventDefault(), M.stopPropagation(), E(!0));
                },
                children: [
                  /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(Re, {}) }),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                    /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: kt }),
                    T ? /* @__PURE__ */ r(co, {}) : /* @__PURE__ */ r(Oe, {})
                  ] })
                ]
              }
            ),
            dt.map((M) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
              Zr,
              {
                comment: M,
                localizedStrings: n,
                isReply: !0,
                isThreadExpanded: o,
                handleUpdateComment: f,
                handleDeleteComment: h,
                onEditingChange: P,
                canEditOrDelete: ft.get(M.id) ?? !1
              }
            ) }, M.id)),
            x !== !1 && (!R || _t($)) && /* @__PURE__ */ d(
              "div",
              {
                role: "textbox",
                tabIndex: -1,
                className: "tw-w-full tw-space-y-2",
                onClick: (M) => M.stopPropagation(),
                onKeyDownCapture: (M) => {
                  M.key === "Enter" && M.shiftKey && (M.preventDefault(), M.stopPropagation(), (_t($) || D !== void 0) && je());
                },
                onKeyDown: (M) => {
                  kr(M), (M.key === "Enter" || M.key === " ") && M.stopPropagation();
                },
                children: [
                  /* @__PURE__ */ r(
                    hn,
                    {
                      editorSerializedState: $,
                      onSerializedChange: (M) => L(M),
                      placeholder: w === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                      autoFocus: !0,
                      onClear: (M) => {
                        xe.current = M;
                      }
                    }
                  ),
                  /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                    D !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: pe(
                      n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                      {
                        assignedUser: pn(
                          D,
                          n
                        )
                      }
                    ) }),
                    /* @__PURE__ */ d(oe, { open: _, onOpenChange: z, children: [
                      /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ r(
                        V,
                        {
                          size: "icon",
                          variant: "outline",
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !O || !g || g.length === 0 || !g.includes(i),
                          "aria-label": "Assign user",
                          children: /* @__PURE__ */ r(io, {})
                        }
                      ) }),
                      /* @__PURE__ */ r(
                        Ht,
                        {
                          className: "tw-w-auto tw-p-0",
                          align: "end",
                          onKeyDown: (M) => {
                            M.key === "Escape" && (M.stopPropagation(), z(!1));
                          },
                          children: /* @__PURE__ */ r(Ut, { children: /* @__PURE__ */ r(qt, { children: g == null ? void 0 : g.map((M) => /* @__PURE__ */ r(
                            Pt,
                            {
                              onSelect: () => {
                                F(M !== s ? M : void 0), z(!1);
                              },
                              className: "tw-flex tw-items-center",
                              children: /* @__PURE__ */ r("span", { children: pn(M, n) })
                            },
                            M || "unassigned"
                          )) }) })
                        }
                      )
                    ] }),
                    /* @__PURE__ */ r(
                      V,
                      {
                        size: "icon",
                        onClick: je,
                        className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                        disabled: !_t($) && D === void 0,
                        "aria-label": "Submit comment",
                        children: /* @__PURE__ */ r(lo, {})
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
function rp({
  className: e = "",
  classNameForVerseText: t,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: s,
  handleUpdateComment: i,
  handleDeleteComment: l,
  handleReadStatusChange: c,
  assignableUsers: w,
  canUserAddCommentToThread: p,
  canUserAssignThreadCallback: f,
  canUserResolveThreadCallback: h,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: x
}) {
  const [v, y] = A(/* @__PURE__ */ new Set()), [N, C] = A();
  H(() => {
    g && (y((_) => new Set(_).add(g)), C(g));
  }, [g]);
  const S = n.filter(
    (_) => _.comments.some((z) => !z.deleted)
  ), $ = S.map((_) => ({
    id: _.id
  })), L = G(
    (_) => {
      y((z) => new Set(z).add(_.id)), C(_.id), x == null || x(_.id);
    },
    [x]
  ), k = G(
    (_) => {
      const z = v.has(_);
      y((D) => {
        const F = new Set(D);
        return F.has(_) ? F.delete(_) : F.add(_), F;
      }), C(_), x == null || x(z ? void 0 : _);
    },
    [v, x]
  ), { listboxRef: T, activeId: E, handleKeyDown: R } = bw({
    options: $,
    onOptionSelect: L
  }), P = G(
    (_) => {
      _.key === "Escape" ? (N && v.has(N) && (y((z) => {
        const D = new Set(z);
        return D.delete(N), D;
      }), C(void 0), x == null || x(void 0)), _.preventDefault(), _.stopPropagation()) : R(_);
    },
    [N, v, R, x]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: T,
      "aria-activedescendant": E ?? void 0,
      "aria-label": "Comments",
      className: m(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        e
      ),
      onKeyDown: P,
      children: S.map((_) => /* @__PURE__ */ r(
        "div",
        {
          id: _.id,
          className: m({
            "tw-opacity-60": _.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Sw,
            {
              classNameForVerseText: t,
              comments: _.comments,
              localizedStrings: a,
              verseRef: _.verseRef,
              handleSelectThread: k,
              threadId: _.id,
              isRead: _.isRead,
              isSelected: v.has(_.id),
              currentUser: o,
              assignedUser: _.assignedUser,
              threadStatus: _.status,
              handleAddCommentToThread: s,
              handleUpdateComment: i,
              handleDeleteComment: l,
              handleReadStatusChange: c,
              assignableUsers: w,
              canUserAddCommentToThread: p,
              canUserAssignThreadCallback: f,
              canUserResolveThreadCallback: h,
              canUserEditOrDeleteCommentCallback: u
            }
          )
        },
        _.id
      ))
    }
  );
}
function Dw({ table: e }) {
  return /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ r(Pi, { asChild: !0, children: /* @__PURE__ */ d(V, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(us, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ d(se, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(rn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Le, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ r(
        zt,
        {
          className: "tw-capitalize",
          checked: t.getIsVisible(),
          onCheckedChange: (n) => t.toggleVisibility(!!n),
          children: t.id
        },
        t.id
      ))
    ] })
  ] });
}
const Se = rt.Root, Mw = rt.Group, De = rt.Value, Ow = re(
  "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
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
), ge = b.forwardRef(({ className: e, children: t, size: n, ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ d(
    rt.Trigger,
    {
      className: m(Ow({ size: n, className: e })),
      ref: a,
      ...o,
      dir: s,
      children: [
        t,
        /* @__PURE__ */ r(rt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Oe, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
ge.displayName = rt.Trigger.displayName;
const Na = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  rt.ScrollUpButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ r(co, { className: "tw-h-4 tw-w-4" })
  }
));
Na.displayName = rt.ScrollUpButton.displayName;
const ka = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  rt.ScrollDownButton,
  {
    ref: n,
    className: m("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ r(Oe, { className: "tw-h-4 tw-w-4" })
  }
));
ka.displayName = rt.ScrollDownButton.displayName;
const be = b.forwardRef(({ className: e, children: t, position: n = "popper", ...o }, a) => {
  const s = wt();
  return /* @__PURE__ */ r(rt.Portal, { children: /* @__PURE__ */ d(
    rt.Content,
    {
      ref: a,
      className: m(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        e
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(Na, {}),
        /* @__PURE__ */ r(
          rt.Viewport,
          {
            className: m(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: s, children: t })
          }
        ),
        /* @__PURE__ */ r(ka, {})
      ]
    }
  ) });
});
be.displayName = rt.Content.displayName;
const Iw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: n,
    className: m("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
Iw.displayName = rt.Label.displayName;
const yt = b.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ d(
  rt.Item,
  {
    ref: o,
    className: m(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(rt.ItemText, { children: t })
    ]
  }
));
yt.displayName = rt.Item.displayName;
const Aw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Aw.displayName = rt.Separator.displayName;
function Pw({ table: e }) {
  return /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ r("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ d(
        Se,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ r(ge, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(De, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(be, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ r(yt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ d(
        V,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ r(ms, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        V,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ r(fs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        V,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ r(hs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ d(
        V,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ r(gs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const to = `
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
function $w(e) {
  return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
}
function Je(e, t) {
  const n = t ? `${to}, ${t}` : to;
  return Array.from(e.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && $w(o)
  );
}
const En = b.forwardRef(({ className: e, stickyHeader: t, ...n }, o) => {
  const a = b.useRef(null);
  b.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), b.useEffect(() => {
    const i = a.current;
    if (!i) return;
    const l = () => {
      requestAnimationFrame(() => {
        Je(i, '[tabindex]:not([tabindex="-1"])').forEach((p) => {
          p.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const c = new MutationObserver(() => {
      l();
    });
    return c.observe(i, {
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
  const s = (i) => {
    const { current: l } = a;
    if (l) {
      if (i.key === "ArrowDown") {
        i.preventDefault(), Je(l)[0].focus();
        return;
      }
      i.key === " " && document.activeElement === l && i.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: m("pr-twp tw-relative tw-w-full", { "tw-p-1": t }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: s,
      ref: a,
      className: m(
        "tw-w-full tw-caption-bottom tw-text-sm tw-outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        // CUSTOM: Add focus styles
        e
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...n
    }
  ) });
});
En.displayName = "Table";
const Tn = b.forwardRef(({ className: e, stickyHeader: t, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: m(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": t
      },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
Tn.displayName = "TableHeader";
const Rn = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: m("[&_tr:last-child]:tw-border-0", e), ...t }));
Rn.displayName = "TableBody";
const Lw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: m("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
Lw.displayName = "TableFooter";
function Vw(e) {
  b.useEffect(() => {
    const t = e.current;
    if (!t) return;
    const n = (o) => {
      if (t.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = e.current ? Je(e.current) : [], s = a.indexOf(document.activeElement), i = o.key === "ArrowRight" ? s + 1 : s - 1;
          i >= 0 && i < a.length && a[i].focus();
        }
        o.key === "Escape" && (o.preventDefault(), t.focus()), (o.key === "ArrowDown" || o.key === "ArrowUp") && o.preventDefault();
      }
    };
    return t.addEventListener("keydown", n), () => {
      t.removeEventListener("keydown", n);
    };
  }, [e]);
}
function jw(e, t, n) {
  let o;
  return n === "ArrowLeft" && t > 0 ? o = e[t - 1] : n === "ArrowRight" && t < e.length - 1 && (o = e[t + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function zw(e, t, n) {
  let o;
  return n === "ArrowDown" && t < e.length - 1 ? o = e[t + 1] : n === "ArrowUp" && t > 0 && (o = e[t - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const Vt = b.forwardRef(({ className: e, onKeyDown: t, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, s) => {
  const i = b.useRef(null);
  b.useEffect(() => {
    typeof s == "function" ? s(i.current) : s && "current" in s && (s.current = i.current);
  }, [s]), Vw(i);
  const l = b.useMemo(
    () => i.current ? Je(i.current) : [],
    [i]
  ), c = b.useCallback(
    (p) => {
      const { current: f } = i;
      if (!f || !f.parentElement) return;
      const h = f.closest("table"), u = h ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        Je(h).filter(
          (v) => v.tagName === "TR"
        )
      ) : [], g = u.indexOf(f), x = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (p.key === "ArrowDown" || p.key === "ArrowUp")
        p.preventDefault(), zw(u, g, p.key);
      else if (p.key === "ArrowLeft" || p.key === "ArrowRight")
        p.preventDefault(), jw(l, x, p.key);
      else if (p.key === "Escape") {
        p.preventDefault();
        const v = f.closest("table");
        v && v.focus();
      }
      t == null || t(p);
    },
    [i, l, t]
  ), w = b.useCallback(
    (p) => {
      o && (n == null || n(p));
    },
    [o, n]
  );
  return /* @__PURE__ */ r(
    "tr",
    {
      ref: i,
      tabIndex: -1,
      onKeyDown: c,
      onFocus: w,
      className: m(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        "data-[state=selected]:tw-bg-muted",
        e
      ),
      ...a
    }
  );
});
Vt.displayName = "TableRow";
const Ze = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: m(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
Ze.displayName = "TableHead";
const he = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: m("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
he.displayName = "TableCell";
const Fw = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: m("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Fw.displayName = "TableCaption";
function ar({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", e),
      ...t
    }
  );
}
function Bw({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: s = !1,
  onRowClickHandler: i = () => {
  },
  id: l,
  isLoading: c = !1,
  noResultsMessage: w
}) {
  var L;
  const [p, f] = A([]), [h, u] = A([]), [g, x] = A({}), [v, y] = A({}), N = j(() => t ?? [], [t]), C = So({
    data: N,
    columns: e,
    getCoreRowModel: Mo(),
    ...n && { getPaginationRowModel: Li() },
    onSortingChange: f,
    getSortedRowModel: Do(),
    onColumnFiltersChange: u,
    getFilteredRowModel: $i(),
    onColumnVisibilityChange: x,
    onRowSelectionChange: y,
    state: {
      sorting: p,
      columnFilters: h,
      columnVisibility: g,
      rowSelection: v
    }
  }), S = C.getVisibleFlatColumns();
  let $;
  return c ? $ = Array.from({ length: 10 }).map((E, R) => `skeleton-row-${R}`).map((E) => /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ r(he, { colSpan: S.length ?? e.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(ar, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, E)) : ((L = C.getRowModel().rows) == null ? void 0 : L.length) > 0 ? $ = C.getRowModel().rows.map((k) => /* @__PURE__ */ r(
    Vt,
    {
      onClick: () => i(k, C),
      "data-state": k.getIsSelected() && "selected",
      children: k.getVisibleCells().map((T) => /* @__PURE__ */ r(he, { children: Ke(T.column.columnDef.cell, T.getContext()) }, T.id))
    },
    k.id
  )) : $ = /* @__PURE__ */ r(Vt, { children: /* @__PURE__ */ r(he, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: w }) }), /* @__PURE__ */ d("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Dw, { table: C }),
    /* @__PURE__ */ d(En, { stickyHeader: s, children: [
      /* @__PURE__ */ r(Tn, { stickyHeader: s, children: C.getHeaderGroups().map((k) => /* @__PURE__ */ r(Vt, { children: k.headers.map((T) => /* @__PURE__ */ r(Ze, { children: T.isPlaceholder ? void 0 : Ke(T.column.columnDef.header, T.getContext()) }, T.id)) }, k.id)) }),
      /* @__PURE__ */ r(Rn, { children: $ })
    ] }),
    n && /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ r(
        V,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.previousPage(),
          disabled: !C.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ r(
        V,
        {
          variant: "outline",
          size: "sm",
          onClick: () => C.nextPage(),
          disabled: !C.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && o && /* @__PURE__ */ r(Pw, { table: C })
  ] });
}
function op({
  id: e,
  markdown: t,
  className: n,
  anchorTarget: o,
  truncate: a
}) {
  const s = j(
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
      id: e,
      className: m(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ r(zi, { options: s, children: t })
    }
  );
}
const Gw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), eo = (e, t) => e[t] ?? t;
function Kw({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  id: o
}) {
  const a = eo(n, "%webView_error_dump_header%"), s = eo(n, "%webView_error_dump_info_message%");
  function i() {
    navigator.clipboard.writeText(e), t && t();
  }
  return /* @__PURE__ */ d(
    "div",
    {
      id: o,
      className: "tw-inline-flex tw-w-full tw-flex-col tw-items-start tw-justify-start tw-gap-4",
      children: [
        /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-items-start tw-justify-start tw-gap-4 tw-self-stretch", children: [
          /* @__PURE__ */ d("div", { className: "tw-inline-flex tw-flex-1 tw-flex-col tw-items-start tw-justify-start", children: [
            /* @__PURE__ */ r("div", { className: "tw-text-color-text tw-justify-center tw-text-center tw-text-lg tw-font-semibold tw-leading-loose", children: a }),
            /* @__PURE__ */ r("div", { className: "tw-justify-center tw-self-stretch tw-text-sm tw-font-normal tw-leading-tight tw-text-muted-foreground", children: s })
          ] }),
          /* @__PURE__ */ r(V, { variant: "secondary", size: "icon", className: "size-8", onClick: () => i(), children: /* @__PURE__ */ r(po, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: e }) })
      ]
    }
  );
}
const ap = Object.freeze([
  ...Gw,
  "%webView_error_dump_copied_message%"
]);
function sp({
  errorDetails: e,
  handleCopyNotify: t,
  localizedStrings: n,
  children: o,
  className: a,
  id: s
}) {
  const [i, l] = A(!1), c = () => {
    l(!0), t && t();
  };
  return /* @__PURE__ */ d(oe, { onOpenChange: (p) => {
    p || l(!1);
  }, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: o }),
    /* @__PURE__ */ d(Ht, { id: s, className: m("tw-min-w-80 tw-max-w-96", a), children: [
      i && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(lt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        Kw,
        {
          errorDetails: e,
          handleCopyNotify: c,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Uw = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(Uw || {});
function ip({ id: e, label: t, groups: n }) {
  const [o, a] = A(
    Object.fromEntries(
      n.map(
        (w, p) => w.itemType === 0 ? [p, []] : void 0
      ).filter((w) => !!w)
    )
  ), [s, i] = A({}), l = (w, p) => {
    const f = !o[w][p];
    a((u) => (u[w][p] = f, { ...u }));
    const h = n[w].items[p];
    h.onUpdate(h.id, f);
  }, c = (w, p) => {
    i((h) => (h[w] = p, { ...h }));
    const f = n[w].items.find((h) => h.id === p);
    f ? f.onUpdate(p) : console.error(`Could not find dropdown radio item with id '${p}'!`);
  };
  return /* @__PURE__ */ r("div", { id: e, children: /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ d(V, { variant: "default", children: [
      /* @__PURE__ */ r(bs, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      t,
      /* @__PURE__ */ r(Oe, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(se, { children: n.map((w, p) => /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r(rn, { children: w.label }),
      /* @__PURE__ */ r(ba, { children: w.itemType === 0 ? /* @__PURE__ */ r(at, { children: w.items.map((f, h) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        zt,
        {
          checked: o[p][h],
          onCheckedChange: () => l(p, h),
          children: f.label
        }
      ) }, f.id)) }) : /* @__PURE__ */ r(
        Tw,
        {
          value: s[p],
          onValueChange: (f) => c(p, f),
          children: w.items.map((f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(ya, { value: f.id, children: f.label }) }, f.id))
        }
      ) }),
      /* @__PURE__ */ r(Le, {})
    ] }, w.label)) })
  ] }) });
}
function lp({
  id: e,
  category: t,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: s,
  supportUrl: i,
  handleSupportLinkClick: l
}) {
  const c = new Bs("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((p, f) => p + f, 0)), w = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      id: e,
      className: "pr-twp tw-flex tw-items-center tw-justify-center tw-gap-4 tw-divide-x tw-border-b tw-border-t tw-py-2 tw-text-center",
      children: [
        t && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex", children: /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: t }) }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-1", children: [
            /* @__PURE__ */ r(vs, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: c })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((p) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: p.toUpperCase() }, p)) }),
          o.length > 3 && /* @__PURE__ */ d(
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
        (a || i) && /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-1 tw-ps-4", children: [
          a && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            V,
            {
              onClick: () => s(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Website",
                /* @__PURE__ */ r(xs, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) }),
          i && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-1", children: /* @__PURE__ */ d(
            V,
            {
              onClick: () => l(),
              variant: "link",
              className: "tw-flex tw-h-auto tw-gap-1 tw-py-0 tw-text-xs tw-font-semibold tw-text-foreground",
              children: [
                "Support",
                /* @__PURE__ */ r(ys, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function qw({ id: e, versionHistory: t }) {
  const [n, o] = A(!1), a = /* @__PURE__ */ new Date();
  function s(l) {
    const c = new Date(l), w = new Date(a.getTime() - c.getTime()), p = w.getUTCFullYear() - 1970, f = w.getUTCMonth(), h = w.getUTCDate() - 1;
    let u = "";
    return p > 0 ? u = `${p.toString()} year${p === 1 ? "" : "s"} ago` : f > 0 ? u = `${f.toString()} month${f === 1 ? "" : "s"} ago` : h === 0 ? u = "today" : u = `${h.toString()} day${h === 1 ? "" : "s"} ago`, u;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ d("div", { className: "pr-twp", id: e, children: [
    /* @__PURE__ */ r("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ r("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-foreground", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ d("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ r("div", { className: "tw-text-foreground", children: /* @__PURE__ */ r("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ r("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ d("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ d("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ r("div", { children: s(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ r(
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
function wp({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: s
}) {
  const i = j(() => Gs(n), [n]), c = ((w) => {
    const p = new Intl.DisplayNames(Ks(), { type: "language" });
    return w.map((f) => p.of(f));
  })(o);
  return /* @__PURE__ */ r("div", { id: e, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(qw, { versionHistory: a }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-py-2", children: [
      /* @__PURE__ */ r("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-items-start tw-justify-between tw-text-xs tw-text-foreground", children: [
        /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Publisher" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ r("span", { children: "Size" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: i })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-foreground", children: /* @__PURE__ */ d("p", { className: "tw-flex tw-flex-col tw-justify-start tw-gap-1", children: [
          /* @__PURE__ */ r("span", { children: "Version" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: s }),
          /* @__PURE__ */ r("span", { children: "Languages" }),
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: c.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Hw({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: s = "Select All",
  clearAllText: i = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: c,
  isOpen: w = void 0,
  onOpenChange: p = void 0,
  isDisabled: f = !1,
  sortSelected: h = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: x = "ghost",
  id: v
}) {
  const [y, N] = A(!1), C = G(
    (R) => {
      var _;
      const P = (_ = e.find((z) => z.label === R)) == null ? void 0 : _.value;
      P && n(
        t.includes(P) ? t.filter((z) => z !== P) : [...t, P]
      );
    },
    [e, t, n]
  ), S = () => c || o, $ = j(() => {
    if (!h) return e;
    const R = e.filter((_) => _.starred).sort((_, z) => _.label.localeCompare(z.label)), P = e.filter((_) => !_.starred).sort((_, z) => {
      const D = t.includes(_.value), F = t.includes(z.value);
      return D && !F ? -1 : !D && F ? 1 : _.label.localeCompare(z.label);
    });
    return [...R, ...P];
  }, [e, t, h]), L = () => {
    n(e.map((R) => R.value));
  }, k = () => {
    n([]);
  }, T = w ?? y;
  return /* @__PURE__ */ r("div", { id: v, className: g, children: /* @__PURE__ */ d(oe, { open: T, onOpenChange: p ?? N, children: [
    /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
      V,
      {
        variant: x,
        role: "combobox",
        "aria-expanded": T,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: f,
        children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: m(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: S()
              }
            )
          ] }),
          /* @__PURE__ */ r(uo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(Ht, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ d(Ut, { children: [
      /* @__PURE__ */ r(Pe, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(V, { variant: "ghost", size: "sm", onClick: L, children: s }),
        /* @__PURE__ */ r(V, { variant: "ghost", size: "sm", onClick: k, children: i })
      ] }),
      /* @__PURE__ */ d(qt, { children: [
        /* @__PURE__ */ r(nn, { children: l }),
        /* @__PURE__ */ r(Gt, { children: $.map((R) => /* @__PURE__ */ d(
          Pt,
          {
            value: R.label,
            onSelect: C,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Rt,
                {
                  className: m(
                    "tw-h-4 tw-w-4",
                    t.includes(R.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              R.starred && /* @__PURE__ */ r(Ns, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: R.label }),
              R.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: R.secondaryLabel })
            ]
          },
          R.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function cp({
  entries: e,
  selected: t,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  isDisabled: i,
  sortSelected: l,
  icon: c,
  className: w,
  badgesPlaceholder: p,
  id: f
}) {
  return /* @__PURE__ */ d("div", { id: f, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Hw,
      {
        entries: e,
        selected: t,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        isDisabled: i,
        sortSelected: l,
        icon: c,
        className: w
      }
    ),
    t.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: t.map((h) => {
      var u;
      return /* @__PURE__ */ d(Te, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          V,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(t.filter((g) => g !== h)),
            children: /* @__PURE__ */ r(Me, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = e.find((g) => g.value === h)) == null ? void 0 : u.label
      ] }, h);
    }) }) : /* @__PURE__ */ r(lt, { children: p })
  ] });
}
const Ve = b.forwardRef(
  ({ className: e, type: t, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: t,
      className: m(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: o,
      ...n
    }
  )
);
Ve.displayName = "Input";
const Yw = (e, t, n) => e === "generated" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_generated%"]
] }) : e === "hidden" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  t["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  t["%footnoteEditor_callerDropdown_item_custom%"]
] });
function Xw({
  callerType: e,
  updateCallerType: t,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const s = X(null), i = X(null), l = X(!1), [c, w] = A(e), [p, f] = A(n), [h, u] = A(!1);
  H(() => {
    w(e);
  }, [e]), H(() => {
    p !== n && f(n);
  }, [n]);
  const g = (v) => {
    l.current = !1, u(v), v || (c !== "custom" || p ? (t(c), o(p)) : (w(e), f(n)));
  }, x = (v) => {
    var y, N, C, S;
    v.stopPropagation(), document.activeElement === i.current && v.key === "ArrowDown" || v.key === "ArrowRight" ? ((y = s.current) == null || y.focus(), l.current = !0) : document.activeElement === s.current && v.key === "ArrowUp" ? ((N = i.current) == null || N.focus(), l.current = !1) : document.activeElement === s.current && v.key === "ArrowLeft" && ((C = s.current) == null ? void 0 : C.selectionStart) === 0 && ((S = i.current) == null || S.focus(), l.current = !1), c === "custom" && v.key === "Enter" && (document.activeElement === i.current || document.activeElement === s.current) && g(!1);
  };
  return /* @__PURE__ */ d(ve, { open: h, onOpenChange: g, children: [
    /* @__PURE__ */ r(Ct, { children: /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(jt, { asChild: !0, children: /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(V, { variant: "outline", className: "tw-h-6", children: Yw(e, a, n) }) }) }),
      /* @__PURE__ */ r(Et, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ d(
      se,
      {
        className: "tw-z-[300]",
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: x,
        onMouseMove: () => {
          var v;
          l.current && ((v = s.current) == null || v.focus());
        },
        children: [
          /* @__PURE__ */ r(rn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Le, {}),
          /* @__PURE__ */ r(
            zt,
            {
              checked: c === "generated",
              onCheckedChange: () => w("generated"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Xn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            zt,
            {
              checked: c === "hidden",
              onCheckedChange: () => w("hidden"),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: Wn })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            zt,
            {
              ref: i,
              checked: c === "custom",
              onCheckedChange: () => w("custom"),
              onClick: (v) => {
                var y;
                v.stopPropagation(), l.current = !0, (y = s.current) == null || y.focus();
              },
              onSelect: (v) => v.preventDefault(),
              children: /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Ve,
                  {
                    tabIndex: 0,
                    onMouseDown: (v) => {
                      v.stopPropagation(), w("custom"), l.current = !0;
                    },
                    ref: s,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: p,
                    onKeyDown: (v) => {
                      v.key === "Enter" || v.key === "ArrowUp" || v.key === "ArrowDown" || v.key === "ArrowLeft" || v.key === "ArrowRight" || v.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (v) => f(v.target.value)
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
const Ww = (e, t) => e === "f" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ r(fo, {}),
  " ",
  t["%footnoteEditor_noteType_footnote_label%"]
] }) : e === "fe" ? /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ r(ho, {}),
  " ",
  t["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ d(at, { children: [
  /* @__PURE__ */ r(mo, {}),
  " ",
  t["%footnoteEditor_noteType_crossReference_label%"]
] }), Jw = (e, t) => {
  if (e === "x")
    return t["%footnoteEditor_noteType_crossReference_label%"];
  let n = t["%footnoteEditor_noteType_endNote_label%"];
  return e === "f" && (n = t["%footnoteEditor_noteType_footnote_label%"]), pe(t["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function Zw({
  noteType: e,
  handleNoteTypeChange: t,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ d(ve, { children: [
    /* @__PURE__ */ r(Ct, { children: /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(Ri, { asChild: !0, children: /* @__PURE__ */ r($e, { asChild: !0, children: /* @__PURE__ */ r(V, { variant: "outline", className: "tw-h-6", children: Ww(e, n) }) }) }),
      /* @__PURE__ */ r(Et, { children: /* @__PURE__ */ r("p", { children: Jw(e, n) }) })
    ] }) }),
    /* @__PURE__ */ d(se, { className: "tw-z-[300]", children: [
      /* @__PURE__ */ r(rn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Le, {}),
      /* @__PURE__ */ d(
        zt,
        {
          disabled: e !== "x" && !o,
          checked: e === "x",
          onCheckedChange: () => t("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(mo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        zt,
        {
          disabled: e === "x" && !o,
          checked: e === "f",
          onCheckedChange: () => t("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(fo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ d(
        zt,
        {
          disabled: e === "x" && !o,
          checked: e === "fe",
          onCheckedChange: () => t("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(ho, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
function Qw(e) {
  var n;
  const t = (n = e.attributes) == null ? void 0 : n.char;
  t.style && (t.style === "ft" && (t.style = "xt"), t.style === "fr" && (t.style = "xo"), t.style === "fq" && (t.style = "xq"));
}
function tc(e) {
  var n;
  const t = (n = e.attributes) == null ? void 0 : n.char;
  t.style && (t.style === "xt" && (t.style = "ft"), t.style === "xo" && (t.style = "fr"), t.style === "xq" && (t.style = "fq"));
}
const ec = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function dp({
  classNameForEditor: e,
  noteOps: t,
  onSave: n,
  onClose: o,
  scrRef: a,
  noteKey: s,
  editorOptions: i,
  localizedStrings: l
}) {
  const c = X(null), w = ns(), [p, f] = A("generated"), [h, u] = A("*"), [g, x] = A("f"), [v, y] = A(!1), N = j(
    () => ({
      ...i,
      markerMenuTrigger: i.markerMenuTrigger ?? "\\",
      hasExternalUI: !0,
      view: { ...i.view ?? Fi(), noteMode: "expanded" }
    }),
    [i]
  );
  H(() => {
    var k;
    (k = c.current) == null || k.focus();
  }), H(() => {
    var E, R;
    let k;
    const T = t == null ? void 0 : t.at(0);
    if (T && sn("note", T)) {
      const P = (E = T.insert.note) == null ? void 0 : E.caller;
      let _ = "custom";
      P === Xn ? _ = "generated" : P === Wn ? _ = "hidden" : P && u(P), f(_), x(((R = T.insert.note) == null ? void 0 : R.style) ?? "f"), k = setTimeout(() => {
        var z;
        (z = c.current) == null || z.applyUpdate([T]);
      }, 0);
    }
    return () => {
      k && clearTimeout(k);
    };
  }, [t, s]);
  const C = G(() => {
    var T, E;
    const k = (E = (T = c.current) == null ? void 0 : T.getNoteOps(0)) == null ? void 0 : E.at(0);
    k && sn("note", k) && (k.insert.note && (p === "custom" ? k.insert.note.caller = h : k.insert.note.caller = p === "generated" ? Xn : Wn), n([k]));
  }, [p, h, n]), S = () => {
    var T;
    const k = (T = w.current) == null ? void 0 : T.getElementsByClassName("editor-input")[0];
    k != null && k.textContent && navigator.clipboard.writeText(k.textContent);
  }, $ = (k) => {
    var E, R, P, _, z;
    x(k);
    const T = (R = (E = c.current) == null ? void 0 : E.getNoteOps(0)) == null ? void 0 : R.at(0);
    if (T && sn("note", T)) {
      T.insert.note && (T.insert.note.style = k);
      const D = (_ = (P = T.insert.note) == null ? void 0 : P.contents) == null ? void 0 : _.ops;
      g !== "x" && k === "x" ? D == null || D.forEach((F) => Qw(F)) : g === "x" && k !== "x" && (D == null || D.forEach((F) => tc(F))), (z = c.current) == null || z.applyUpdate([T, { delete: 1 }]);
    }
  }, L = (k) => {
    var E, R, P, _, z;
    const T = (R = (E = c.current) == null ? void 0 : E.getNoteOps(0)) == null ? void 0 : R.at(0);
    if (T && sn("note", T)) {
      k.content.length > 1 && setTimeout(() => {
        var O;
        (O = c.current) == null || O.applyUpdate([{ retain: 2 }, { delete: 1 }]);
      }, 0);
      const D = (P = T.insert.note) == null ? void 0 : P.style, F = (z = (_ = T.insert.note) == null ? void 0 : _.contents) == null ? void 0 : z.ops;
      D || y(!1), y(
        D === "x" ? !!(F != null && F.every((O) => {
          var it, bt;
          if (!((it = O.attributes) != null && it.char)) return !0;
          const U = ((bt = O.attributes) == null ? void 0 : bt.char).style;
          return U === "xt" || U === "xo" || U === "xq";
        })) : !!(F != null && F.every((O) => {
          var it, bt;
          if (!((it = O.attributes) != null && it.char)) return !0;
          const U = ((bt = O.attributes) == null ? void 0 : bt.char).style;
          return U === "ft" || U === "fr" || U === "fq";
        }))
      );
    } else
      y(!1);
  };
  return /* @__PURE__ */ d("div", { className: "footnote-editor tw-grid tw-gap-[12px]", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex", children: [
      /* @__PURE__ */ d("div", { className: "tw-flex tw-gap-4", children: [
        /* @__PURE__ */ r(
          Zw,
          {
            isTypeSwitchable: v,
            noteType: g,
            handleNoteTypeChange: $,
            localizedStrings: l
          }
        ),
        /* @__PURE__ */ r(
          Xw,
          {
            callerType: p,
            updateCallerType: f,
            customCaller: h,
            updateCustomCaller: u,
            localizedStrings: l
          }
        )
      ] }),
      /* @__PURE__ */ d("div", { className: "tw-flex tw-w-full tw-justify-end tw-gap-4", children: [
        /* @__PURE__ */ r(Ct, { children: /* @__PURE__ */ d(At, { children: [
          /* @__PURE__ */ r(jt, { asChild: !0, children: /* @__PURE__ */ r(V, { onClick: o, className: "tw-h-6 tw-w-6", size: "icon", variant: "secondary", children: /* @__PURE__ */ r(Me, {}) }) }),
          /* @__PURE__ */ r(Et, { children: /* @__PURE__ */ r("p", { children: l["%footnoteEditor_cancelButton_tooltip%"] }) })
        ] }) }),
        /* @__PURE__ */ r(Ct, { children: /* @__PURE__ */ d(At, { children: [
          /* @__PURE__ */ r(jt, { asChild: !0, children: /* @__PURE__ */ r(
            V,
            {
              onClick: C,
              className: "tw-h-6 tw-w-6",
              size: "icon",
              variant: "default",
              children: /* @__PURE__ */ r(Rt, {})
            }
          ) }),
          /* @__PURE__ */ r(Et, { children: l["%footnoteEditor_saveButton_tooltip%"] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ d(
      "div",
      {
        ref: w,
        className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
        children: [
          /* @__PURE__ */ r("div", { className: e, children: /* @__PURE__ */ r(
            Bi,
            {
              options: N,
              onUsjChange: L,
              defaultUsj: ec,
              onScrRefChange: () => {
              },
              scrRef: a,
              ref: c
            }
          ) }),
          /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Ct, { children: /* @__PURE__ */ d(At, { children: [
            /* @__PURE__ */ r(jt, { asChild: !0, children: /* @__PURE__ */ r(V, { onClick: S, className: "tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(po, {}) }) }),
            /* @__PURE__ */ r(Et, { children: /* @__PURE__ */ r("p", { children: l["%footnoteEditor_copyButton_tooltip%"] }) })
          ] }) }) })
        ]
      }
    )
  ] });
}
const pp = Object.freeze([
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
function _a(e, t) {
  if (!t || t.length === 0) return e ?? "empty";
  const n = t.find((a) => typeof a == "string");
  if (n)
    return `key-${e ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof t[0] == "string" ? "impossible" : t[0].marker ?? "unknown";
  return `key-${e ?? "unknown"}-${o}`;
}
function nc(e, t, n = !0, o = void 0) {
  if (!t || t.length === 0) return;
  const a = [], s = [];
  let i = [];
  return t.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (i.length > 0 && s.push(i), i = [l]) : i.push(l);
  }), i.length > 0 && s.push(i), s.map((l, c) => {
    const w = c === s.length - 1;
    return /* @__PURE__ */ d("p", { children: [
      Cr(e, l, n, !0, a),
      w && o
    ] }, _a(e, l));
  });
}
function Cr(e, t, n = !0, o = !0, a = []) {
  if (!(!t || t.length === 0))
    return t.map((s) => {
      if (typeof s == "string") {
        const i = `${e}-text-${s.slice(0, 10)}`;
        if (o) {
          const l = m(`usfm_${e}`);
          return /* @__PURE__ */ r("span", { className: l, children: s }, i);
        }
        return /* @__PURE__ */ d(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(Hn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: s }),
              /* @__PURE__ */ r(Hn, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          i
        );
      }
      return rc(
        s,
        _a(`${e}\\${s.marker}`, [s]),
        n,
        [...a, e ?? "unknown"]
      );
    });
}
function rc(e, t, n, o = []) {
  const { marker: a } = e;
  return /* @__PURE__ */ d("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      Hn,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Cr(a, e.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, t);
}
function oc({
  footnote: e,
  layout: t = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(e.caller) : e.caller, s = a !== e.caller;
  let i, l = e.content;
  Array.isArray(e.content) && e.content.length > 0 && typeof e.content[0] != "string" && (e.content[0].marker === "fr" || e.content[0].marker === "xo") && ([i, ...l] = e.content);
  const c = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${e.marker} ` }) : void 0, w = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${e.marker}*` }) : void 0, p = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ d("span", { className: m("note-caller tw-inline-block", { formatted: s }), children: [
    a,
    " "
  ] }), f = i && /* @__PURE__ */ d(at, { children: [
    Cr(e.marker, [i], o, !1),
    " "
  ] }), h = t === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = t === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", x = m(h, u);
  return /* @__PURE__ */ d(at, { children: [
    /* @__PURE__ */ d("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: [
      c,
      p
    ] }),
    /* @__PURE__ */ r("div", { className: m("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", x), children: f }),
    /* @__PURE__ */ r(
      "div",
      {
        className: m(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          x
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(at, { children: nc(e.marker, l, o, w) })
      }
    )
  ] });
}
function up({
  className: e,
  classNameForItems: t,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: s,
  showMarkers: i = !0,
  suppressFormatting: l = !1,
  formatCaller: c,
  onFootnoteSelected: w
}) {
  const p = c ?? Us(n, void 0), f = (N, C) => {
    w == null || w(N, C, a);
  }, h = s ? n.findIndex((N) => N === s) : -1, [u, g] = A(h), x = (N, C, S) => {
    if (n.length)
      switch (N.key) {
        case "Enter":
        case " ":
          N.preventDefault(), w == null || w(C, S, a);
          break;
      }
  }, v = (N) => {
    if (n.length)
      switch (N.key) {
        case "ArrowDown":
          N.preventDefault(), g((C) => Math.min(C + 1, n.length - 1));
          break;
        case "ArrowUp":
          N.preventDefault(), g((C) => Math.max(C - 1, 0));
          break;
      }
  }, y = X([]);
  return H(() => {
    var N;
    u >= 0 && u < y.current.length && ((N = y.current[u]) == null || N.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: m("tw-h-full tw-overflow-y-auto", e),
      onKeyDown: v,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: m(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((N, C) => {
            const S = N === s, $ = `${a}-${C}`;
            return /* @__PURE__ */ d(at, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: (L) => {
                    y.current[C] = L;
                  },
                  role: "option",
                  "aria-selected": S,
                  "data-marker": N.marker,
                  "data-state": S ? "selected" : void 0,
                  tabIndex: C === u ? 0 : -1,
                  className: m(
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
                    t
                  ),
                  onClick: () => f(N, C),
                  onKeyDown: (L) => x(L, N, C),
                  children: /* @__PURE__ */ r(
                    oc,
                    {
                      footnote: N,
                      layout: o,
                      formatCaller: () => p(N.caller, C),
                      showMarkers: i
                    }
                  )
                },
                $
              ),
              C < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(Re, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function ac(e) {
  const t = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(e)) !== null; )
    a.index > n && t.push(e.substring(n, a.index)), t.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < e.length && t.push(e.substring(n)), t.length > 0 ? t : [e];
}
function sc({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], s = n["%webView_inventory_occurrences_table_header_occurrence%"], i = j(() => {
    const l = [], c = /* @__PURE__ */ new Set();
    return e.forEach((w) => {
      const p = `${w.reference.book}:${w.reference.chapterNum}:${w.reference.verseNum}:${w.text}`;
      c.has(p) || (c.add(p), l.push(w));
    }), l;
  }, [e]);
  return /* @__PURE__ */ d(En, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Tn, { stickyHeader: !0, children: /* @__PURE__ */ d(Vt, { children: [
      /* @__PURE__ */ r(Ze, { children: a }),
      /* @__PURE__ */ r(Ze, { children: s })
    ] }) }),
    /* @__PURE__ */ r(Rn, { children: i.length > 0 && i.map((l) => /* @__PURE__ */ d(
      Vt,
      {
        onClick: () => {
          t(l.reference);
        },
        children: [
          /* @__PURE__ */ r(he, { children: ue(l.reference, "English") }),
          /* @__PURE__ */ r(he, { className: o, children: ac(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Er = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Jn.Root,
  {
    ref: n,
    className: m(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ r(
      Jn.Indicator,
      {
        className: m("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Er.displayName = Jn.Root.displayName;
const Sn = (e) => e === "asc" ? /* @__PURE__ */ r(Es, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ r(Ts, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ r(Rs, { className: "tw-ms-2 tw-h-4 tw-w-4" }), mp = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => /* @__PURE__ */ d(V, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Sn(t.getIsSorted())
  ] })
}), ic = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => /* @__PURE__ */ d(V, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    Sn(n.getIsSorted())
  ] })
}), fp = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ d(V, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Sn(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), Bn = (e, t, n, o, a, s) => {
  let i = [...n];
  e.forEach((c) => {
    t === "approved" ? i.includes(c) || i.push(c) : i = i.filter((w) => w !== c);
  }), o(i);
  let l = [...a];
  e.forEach((c) => {
    t === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((w) => w !== c);
  }), s(l);
}, hp = (e, t, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ d(V, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    e,
    Sn(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const i = s.getValue("status"), l = s.getValue("item");
    return /* @__PURE__ */ d(Nr, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ r(
        He,
        {
          onClick: (c) => {
            c.stopPropagation(), Bn(
              [l],
              "approved",
              t,
              n,
              o,
              a
            );
          },
          value: "approved",
          children: /* @__PURE__ */ r(ks, {})
        }
      ),
      /* @__PURE__ */ r(
        He,
        {
          onClick: (c) => {
            c.stopPropagation(), Bn(
              [l],
              "unapproved",
              t,
              n,
              o,
              a
            );
          },
          value: "unapproved",
          children: /* @__PURE__ */ r(_s, {})
        }
      ),
      /* @__PURE__ */ r(
        He,
        {
          onClick: (c) => {
            c.stopPropagation(), Bn(
              [l],
              "unknown",
              t,
              n,
              o,
              a
            );
          },
          value: "unknown",
          children: /* @__PURE__ */ r(Cs, {})
        }
      )
    ] });
  }
}), gp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), bp = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, vp = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? t[1] : "";
}, lc = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", xp = Object.freeze([
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
]), wc = (e, t, n) => {
  let o = e;
  return t !== "all" && (o = o.filter(
    (a) => t === "approved" && a.status === "approved" || t === "unapproved" && a.status === "unapproved" || t === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, cc = (e, t, n) => e.map((o) => {
  const a = Ar(o.key) ? o.key : o.key[0];
  return {
    items: Ar(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || lc(a, t, n),
    occurrences: o.occurrences || []
  };
}), Ot = (e, t) => e[t] ?? t;
function yp({
  inventoryItems: e,
  setVerseRef: t,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  scope: i,
  onScopeChange: l,
  columns: c,
  id: w,
  areInventoryItemsLoading: p = !1,
  classNameForVerseText: f,
  onItemSelected: h
}) {
  const u = Ot(n, "%webView_inventory_all%"), g = Ot(n, "%webView_inventory_approved%"), x = Ot(n, "%webView_inventory_unapproved%"), v = Ot(n, "%webView_inventory_unknown%"), y = Ot(n, "%webView_inventory_scope_currentBook%"), N = Ot(n, "%webView_inventory_scope_chapter%"), C = Ot(n, "%webView_inventory_scope_verse%"), S = Ot(n, "%webView_inventory_filter_text%"), $ = Ot(
    n,
    "%webView_inventory_show_additional_items%"
  ), L = Ot(n, "%webView_inventory_no_results%"), [k, T] = A(!1), [E, R] = A("all"), [P, _] = A(""), [z, D] = A([]), F = j(() => {
    const B = e ?? [];
    return B.length === 0 ? [] : cc(B, a, s);
  }, [e, a, s]), O = j(() => {
    if (k) return F;
    const B = [];
    return F.forEach((et) => {
      const ft = et.items[0], ct = B.find(
        (mt) => mt.items[0] === ft
      );
      ct ? (ct.count += et.count, ct.occurrences = ct.occurrences.concat(et.occurrences)) : B.push({
        items: [ft],
        count: et.count,
        occurrences: et.occurrences,
        status: et.status
      });
    }), B;
  }, [k, F]), U = j(() => O.length === 0 ? [] : wc(O, E, P), [O, E, P]), it = j(() => {
    var ft, ct;
    if (!k) return c;
    const B = (ft = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ft.length;
    if (!B) return c;
    const et = [];
    for (let mt = 0; mt < B; mt++)
      et.push(
        ic(
          ((ct = o == null ? void 0 : o.tableHeaders) == null ? void 0 : ct[mt]) || "Additional Item",
          mt + 1
        )
      );
    return [...et, ...c];
  }, [o == null ? void 0 : o.tableHeaders, c, k]);
  H(() => {
    U.length === 0 ? D([]) : U.length === 1 && D(U[0].items);
  }, [U]);
  const bt = (B, et) => {
    et.setRowSelection(() => {
      const ct = {};
      return ct[B.index] = !0, ct;
    });
    const ft = B.original.items;
    D(ft), h && ft.length > 0 && h(ft[0]);
  }, pt = (B) => {
    if (B === "book" || B === "chapter" || B === "verse")
      l(B);
    else
      throw new Error(`Invalid scope value: ${B}`);
  }, ut = (B) => {
    if (B === "all" || B === "approved" || B === "unapproved" || B === "unknown")
      R(B);
    else
      throw new Error(`Invalid status filter value: ${B}`);
  }, Nt = j(() => {
    if (O.length === 0 || z.length === 0) return [];
    const B = O.filter((et) => qs(
      k ? et.items : [et.items[0]],
      z
    ));
    if (B.length > 1) throw new Error("Selected item is not unique");
    return B.length === 0 ? [] : B[0].occurrences;
  }, [z, k, O]);
  return /* @__PURE__ */ d("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ d("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ d(
        Se,
        {
          onValueChange: (B) => ut(B),
          defaultValue: E,
          children: [
            /* @__PURE__ */ r(ge, { className: "tw-m-1", children: /* @__PURE__ */ r(De, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ d(be, { children: [
              /* @__PURE__ */ r(yt, { value: "all", children: u }),
              /* @__PURE__ */ r(yt, { value: "approved", children: g }),
              /* @__PURE__ */ r(yt, { value: "unapproved", children: x }),
              /* @__PURE__ */ r(yt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ d(Se, { onValueChange: (B) => pt(B), defaultValue: i, children: [
        /* @__PURE__ */ r(ge, { className: "tw-m-1", children: /* @__PURE__ */ r(De, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ d(be, { children: [
          /* @__PURE__ */ r(yt, { value: "book", children: y }),
          /* @__PURE__ */ r(yt, { value: "chapter", children: N }),
          /* @__PURE__ */ r(yt, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Ve,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: S,
          value: P,
          onChange: (B) => {
            _(B.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ d("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ r(
          Er,
          {
            className: "tw-m-1",
            checked: k,
            onCheckedChange: (B) => {
              T(B);
            }
          }
        ),
        /* @__PURE__ */ r(lt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? $ })
      ] })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Bw,
      {
        columns: it,
        data: U,
        onRowClickHandler: bt,
        stickyHeader: !0,
        isLoading: p,
        noResultsMessage: L
      }
    ) }),
    Nt.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      sc,
      {
        classNameForText: f,
        occurrenceData: Nt,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
const Np = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function kp({ localizedStrings: e, markerMenuItems: t }) {
  const [n, o] = A(""), a = j(() => {
    const s = n.trim().toLowerCase();
    return s ? t.filter(
      (i) => {
        var l;
        return ((l = i.marker) == null ? void 0 : l.toLowerCase().includes(s)) || i.title.toLowerCase().includes(s);
      }
    ) : t;
  }, [n, t]);
  return /* @__PURE__ */ d(Ut, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      Pe,
      {
        value: n,
        onValueChange: (s) => o(s),
        placeholder: e["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ d(qt, { children: [
      /* @__PURE__ */ r(nn, { children: e["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Gt, { children: a.map((s) => /* @__PURE__ */ d(
        Pt,
        {
          className: "tw-flex tw-gap-2 hover:tw-bg-accent",
          disabled: s.isDisallowed || s.isDeprecated,
          onSelect: s.action,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-w-6", children: s.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: s.marker }) : /* @__PURE__ */ r("div", { children: s.icon }) }),
            /* @__PURE__ */ d("div", { children: [
              /* @__PURE__ */ r("p", { className: "tw-text-sm", children: s.title }),
              s.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: s.subtitle })
            ] }),
            (s.isDisallowed || s.isDeprecated) && /* @__PURE__ */ r(Lo, { className: "tw-font-sans", children: s.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
          ]
        },
        `item-${s.title}`
      )) })
    ] })
  ] });
}
const dc = "16rem", pc = "3rem", Ca = b.createContext(void 0);
function Dn() {
  const e = b.useContext(Ca);
  if (!e)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return e;
}
const Ea = b.forwardRef(
  ({
    defaultOpen: e = !0,
    open: t,
    onOpenChange: n,
    className: o,
    style: a,
    children: s,
    side: i = "primary",
    ...l
  }, c) => {
    const [w, p] = b.useState(e), f = t ?? w, h = b.useCallback(
      (C) => {
        const S = typeof C == "function" ? C(f) : C;
        n ? n(S) : p(S);
      },
      [n, f]
    ), u = b.useCallback(() => h((C) => !C), [h]), g = f ? "expanded" : "collapsed", y = wt() === "ltr" ? i : i === "primary" ? "secondary" : "primary", N = b.useMemo(
      () => ({
        state: g,
        open: f,
        setOpen: h,
        toggleSidebar: u,
        side: y
      }),
      [g, f, h, u, y]
    );
    return /* @__PURE__ */ r(Ca.Provider, { value: N, children: /* @__PURE__ */ r(Ct, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": dc,
            "--sidebar-width-icon": pc,
            ...a
          }
        ),
        className: m(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: c,
        ...l,
        children: s
      }
    ) }) });
  }
);
Ea.displayName = "SidebarProvider";
const Ta = b.forwardRef(({ variant: e = "sidebar", collapsible: t = "offcanvas", className: n, children: o, ...a }, s) => {
  const i = Dn();
  return t === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: m(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: s,
      ...a,
      children: o
    }
  ) : /* @__PURE__ */ d(
    "div",
    {
      ref: s,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": i.state,
      "data-collapsible": i.state === "collapsed" ? t : "",
      "data-variant": e,
      "data-side": i.side,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: m(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=secondary]:tw-rotate-180",
              e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ r(
          "div",
          {
            className: m(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              i.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              e === "floating" || e === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
              n
            ),
            ...a,
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
});
Ta.displayName = "Sidebar";
const uc = b.forwardRef(({ className: e, onClick: t, ...n }, o) => {
  const a = Dn();
  return /* @__PURE__ */ d(
    V,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: m("tw-h-7 tw-w-7", e),
      onClick: (s) => {
        t == null || t(s), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(Ss, {}) : /* @__PURE__ */ r(Ds, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
uc.displayName = "SidebarTrigger";
const mc = b.forwardRef(
  ({ className: e, ...t }, n) => {
    const { toggleSidebar: o } = Dn();
    return /* @__PURE__ */ r(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: o,
        title: "Toggle Sidebar",
        className: m(
          "tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex",
          "[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize",
          "[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize",
          "group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar",
          "[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2",
          "[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",
          e
        ),
        ...t
      }
    );
  }
);
mc.displayName = "SidebarRail";
const Ra = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: m(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        e
      ),
      ...t
    }
  )
);
Ra.displayName = "SidebarInset";
const fc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Ve,
  {
    ref: n,
    "data-sidebar": "input",
    className: m(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      e
    ),
    ...t
  }
));
fc.displayName = "SidebarInput";
const hc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
hc.displayName = "SidebarHeader";
const gc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: m("tw-flex tw-flex-col tw-gap-2 tw-p-2", e),
      ...t
    }
  )
);
gc.displayName = "SidebarFooter";
const bc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Re,
  {
    ref: n,
    "data-sidebar": "separator",
    className: m("tw-mx-2 tw-w-auto tw-bg-sidebar-border", e),
    ...t
  }
));
bc.displayName = "SidebarSeparator";
const Sa = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: m(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        e
      ),
      ...t
    }
  )
);
Sa.displayName = "SidebarContent";
const sr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: m("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", e),
      ...t
    }
  )
);
sr.displayName = "SidebarGroup";
const ir = b.forwardRef(({ className: e, asChild: t = !1, ...n }, o) => /* @__PURE__ */ r(
  t ? Ie : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: m(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      e
    ),
    ...n
  }
));
ir.displayName = "SidebarGroupLabel";
const vc = b.forwardRef(({ className: e, asChild: t = !1, ...n }, o) => /* @__PURE__ */ r(
  t ? Ie : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: m(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      e
    ),
    ...n
  }
));
vc.displayName = "SidebarGroupAction";
const lr = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: m("tw-w-full tw-text-sm", e),
      ...t
    }
  )
);
lr.displayName = "SidebarGroupContent";
const Da = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: m("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", e),
      ...t
    }
  )
);
Da.displayName = "SidebarMenu";
const Ma = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: m("tw-group/menu-item tw-relative", e),
      ...t
    }
  )
);
Ma.displayName = "SidebarMenuItem";
const xc = re(
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
), Oa = b.forwardRef(
  ({
    asChild: e = !1,
    isActive: t = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: s,
    ...i
  }, l) => {
    const c = e ? Ie : "button", { state: w } = Dn(), p = /* @__PURE__ */ r(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": t,
        className: m(xc({ variant: n, size: o }), s),
        ...i
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(jt, { asChild: !0, children: p }),
      /* @__PURE__ */ r(Et, { side: "right", align: "center", hidden: w !== "collapsed", ...a })
    ] })) : p;
  }
);
Oa.displayName = "SidebarMenuButton";
const yc = b.forwardRef(({ className: e, asChild: t = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  t ? Ie : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: m(
      "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "tw-peer-data-[size=sm]/menu-button:top-1",
      "tw-peer-data-[size=default]/menu-button:top-1.5",
      "tw-peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:tw-hidden",
      n && "tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",
      e
    ),
    ...o
  }
));
yc.displayName = "SidebarMenuAction";
const Nc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: m(
        "tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground",
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...t
    }
  )
);
Nc.displayName = "SidebarMenuBadge";
const kc = b.forwardRef(({ className: e, showIcon: t = !1, ...n }, o) => {
  const a = b.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ d(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: m("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", e),
      ...n,
      children: [
        t && /* @__PURE__ */ r(ar, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          ar,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
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
});
kc.displayName = "SidebarMenuSkeleton";
const _c = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: m(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        e
      ),
      ...t
    }
  )
);
_c.displayName = "SidebarMenuSub";
const Cc = b.forwardRef(
  ({ ...e }, t) => /* @__PURE__ */ r("li", { ref: t, ...e })
);
Cc.displayName = "SidebarMenuSubItem";
const Ec = b.forwardRef(({ asChild: e = !1, size: t = "md", isActive: n, className: o, ...a }, s) => /* @__PURE__ */ r(
  e ? Ie : "a",
  {
    ref: s,
    "data-sidebar": "menu-sub-button",
    "data-size": t,
    "data-active": n,
    className: m(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      t === "sm" && "tw-text-xs",
      t === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      o
    ),
    ...a
  }
));
Ec.displayName = "SidebarMenuSubButton";
function Tc({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: s,
  projectsSidebarGroupLabel: i,
  buttonPlaceholderText: l,
  className: c
}) {
  const w = G(
    (h, u) => {
      o(h, u);
    },
    [o]
  ), p = G(
    (h) => {
      const u = n.find((g) => g.projectId === h);
      return u ? u.projectName : h;
    },
    [n]
  ), f = G(
    (h) => !a.projectId && h === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    Ta,
    {
      id: e,
      collapsible: "none",
      variant: "inset",
      className: m("tw-w-96 tw-gap-2 tw-overflow-y-auto", c),
      children: /* @__PURE__ */ d(Sa, { children: [
        /* @__PURE__ */ d(sr, { children: [
          /* @__PURE__ */ r(ir, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(lr, { children: /* @__PURE__ */ r(Da, { children: Object.entries(t).map(([h, u]) => /* @__PURE__ */ r(Ma, { children: /* @__PURE__ */ r(
            Oa,
            {
              onClick: () => w(h),
              isActive: f(h),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, h)) }) })
        ] }),
        /* @__PURE__ */ d(sr, { children: [
          /* @__PURE__ */ r(ir, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(lr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            er,
            {
              buttonVariant: "ghost",
              buttonClassName: m("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((h) => h.projectId),
              getOptionLabel: p,
              buttonPlaceholder: l,
              onChange: (h) => {
                const u = p(h);
                w(u, h);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(Ms, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Tr = Qe(
  ({ value: e, onSearch: t, placeholder: n, isFullWidth: o, className: a, isDisabled: s = !1, id: i }, l) => {
    const c = wt();
    return /* @__PURE__ */ d("div", { id: i, className: m("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        so,
        {
          className: m(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": c === "rtl" },
            { "tw-left-3": c === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Ve,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: e,
          onChange: (w) => t(w.target.value),
          disabled: s
        }
      ),
      e && /* @__PURE__ */ d(
        V,
        {
          variant: "ghost",
          size: "icon",
          className: m(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": c === "rtl" },
            { "tw-right-0": c === "ltr" }
          ),
          onClick: () => {
            t("");
          },
          children: [
            /* @__PURE__ */ r(Me, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Tr.displayName = "SearchBar";
function _p({
  id: e,
  extensionLabels: t,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: s,
  searchValue: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: w,
  buttonPlaceholderText: p
}) {
  return /* @__PURE__ */ d("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Tr,
      {
        className: "tw-w-9/12",
        value: i,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ d(
      Ea,
      {
        id: e,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Tc,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: t,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: s,
              extensionsSidebarGroupLabel: c,
              projectsSidebarGroupLabel: w,
              buttonPlaceholderText: p
            }
          ),
          /* @__PURE__ */ r(Ra, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const Zt = "scrBook", Rc = "scrRef", de = "source", Sc = "details", Dc = "Scripture Reference", Mc = "Scripture Book", Ia = "Type", Oc = "Details";
function Ic(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: Zt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Dc,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? ot.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === Zt ? ue(a.start) : void 0;
      },
      getGroupingValue: (o) => ot.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => Yn(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => ue(o.start),
      id: Rc,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : ue(a.start);
      },
      sortingFn: (o, a) => Yn(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: de,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Ia : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: Sc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Oc,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Ac = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || Yn(e.start, e.end) === 0 ? `${In(e.start)}+${t}` : `${In(e.start)}+${t}-${In(e.end)}+${n}`;
}, no = (e) => `${Ac({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Cp({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: s,
  detailsColumnName: i,
  onRowSelected: l,
  id: c
}) {
  const [w, p] = A([]), [f, h] = A([{ id: Zt, desc: !1 }]), [u, g] = A({}), x = j(
    () => e.flatMap((E) => E.data.map((R) => ({
      ...R,
      source: E.source
    }))),
    [e]
  ), v = j(
    () => Ic(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: s,
        detailsColumnName: i
      },
      n
    ),
    [o, s, i, n]
  );
  H(() => {
    w.includes(de) ? h([
      { id: de, desc: !1 },
      { id: Zt, desc: !1 }
    ]) : h([{ id: Zt, desc: !1 }]);
  }, [w]);
  const y = So({
    data: x,
    columns: v,
    state: {
      grouping: w,
      sorting: f,
      rowSelection: u
    },
    onGroupingChange: p,
    onSortingChange: h,
    onRowSelectionChange: g,
    getExpandedRowModel: ji(),
    getGroupedRowModel: Vi(),
    getCoreRowModel: Mo(),
    getSortedRowModel: Do(),
    getRowId: no,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  H(() => {
    if (l) {
      const E = y.getSelectedRowModel().rowsById, R = Object.keys(E);
      if (R.length === 1) {
        const P = x.find((_) => no(_) === R[0]) || void 0;
        P && l(P);
      }
    }
  }, [u, x, l, y]);
  const N = a ?? Mc, C = s ?? Ia, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${N}`, value: [Zt] },
    { label: `Group by ${C}`, value: [de] },
    {
      label: `Group by ${N} and ${C}`,
      value: [Zt, de]
    },
    {
      label: `Group by ${C} and ${N}`,
      value: [de, Zt]
    }
  ], $ = (E) => {
    p(JSON.parse(E));
  }, L = (E, R) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(R);
  }, k = (E, R) => E.getIsGrouped() ? "" : m("banded-row", R % 2 === 0 ? "even" : "odd"), T = (E, R, P) => {
    if (!((E == null ? void 0 : E.length) === 0 || R.depth < P.column.getGroupedIndex())) {
      if (R.getIsGrouped())
        switch (R.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (R.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ d("div", { id: c, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ d(
      Se,
      {
        value: JSON.stringify(w),
        onValueChange: (E) => {
          $(E);
        },
        children: [
          /* @__PURE__ */ r(ge, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(De, {}) }),
          /* @__PURE__ */ r(be, { position: "item-aligned", children: /* @__PURE__ */ r(Mw, { children: S.map((E) => /* @__PURE__ */ r(yt, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ d(En, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ r(Tn, { children: y.getHeaderGroups().map((E) => /* @__PURE__ */ r(Vt, { children: E.headers.filter((R) => R.column.columnDef.header).map((R) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(Ze, { colSpan: R.colSpan, className: "top-0 tw-sticky", children: R.isPlaceholder ? void 0 : /* @__PURE__ */ d("div", { children: [
          R.column.getCanGroup() ? /* @__PURE__ */ r(
            V,
            {
              variant: "ghost",
              title: `Toggle grouping by ${R.column.columnDef.header}`,
              onClick: R.column.getToggleGroupingHandler(),
              type: "button",
              children: R.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Ke(R.column.columnDef.header, R.getContext())
        ] }) }, R.id)
      )) }, E.id)) }),
      /* @__PURE__ */ r(Rn, { children: y.getRowModel().rows.map((E, R) => {
        const P = wt();
        return /* @__PURE__ */ r(
          Vt,
          {
            "data-state": E.getIsSelected() ? "selected" : "",
            className: m(k(E, R)),
            onClick: (_) => L(E, _),
            children: E.getVisibleCells().map((_) => {
              if (!(_.getIsPlaceholder() || _.column.columnDef.enableGrouping && !_.getIsGrouped() && (_.column.columnDef.id !== de || !n)))
                return /* @__PURE__ */ r(
                  he,
                  {
                    className: m(
                      _.column.columnDef.id,
                      "tw-p-[1px]",
                      T(w, E, _)
                    ),
                    children: _.getIsGrouped() ? /* @__PURE__ */ d(
                      V,
                      {
                        variant: "link",
                        onClick: E.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          E.getIsExpanded() && /* @__PURE__ */ r(Oe, {}),
                          !E.getIsExpanded() && (P === "ltr" ? /* @__PURE__ */ r(_e, {}) : /* @__PURE__ */ r(qn, {})),
                          " ",
                          Ke(_.column.columnDef.cell, _.getContext()),
                          " (",
                          E.subRows.length,
                          ")"
                        ]
                      }
                    ) : Ke(_.column.columnDef.cell, _.getContext())
                  },
                  _.id
                );
            })
          },
          E.id
        );
      }) })
    ] })
  ] });
}
const Rr = (e, t) => e.filter((n) => {
  try {
    return Ge(n) === t;
  } catch {
    return !1;
  }
}), Aa = (e, t, n) => Rr(e, t).every((o) => n.includes(o));
function Pc({
  section: e,
  availableBookIds: t,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const s = Rr(t, e).length === 0, i = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], c = a["%scripture_section_dc_short%"], w = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    V,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(e),
      className: m(
        Aa(t, e, n) && !s && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: s,
      children: Wi(
        e,
        i,
        l,
        c,
        w
      )
    }
  );
}
const ro = 5, Gn = 6;
function $c({
  availableBookInfo: e,
  selectedBookIds: t,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const s = o["%webView_book_selector_books_selected%"], i = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], c = o["%webView_book_selector_select_all%"], w = o["%webView_book_selector_clear_all%"], p = o["%webView_book_selector_no_book_found%"], f = o["%webView_book_selector_more%"], { otLong: h, ntLong: u, dcLong: g, extraLong: x } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [v, y] = A(!1), [N, C] = A(""), S = X(void 0), $ = X(!1);
  if (e.length !== ot.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const L = j(() => ot.allBookIds.filter(
    (D, F) => e[F] === "1" && !ot.isObsolete(ot.bookIdToNumber(D))
  ), [e]), k = j(() => {
    if (!N.trim()) {
      const O = {
        [q.OT]: [],
        [q.NT]: [],
        [q.DC]: [],
        [q.Extra]: []
      };
      return L.forEach((U) => {
        const it = Ge(U);
        O[it].push(U);
      }), O;
    }
    const D = L.filter(
      (O) => fr(O, N, a)
    ), F = {
      [q.OT]: [],
      [q.NT]: [],
      [q.DC]: [],
      [q.Extra]: []
    };
    return D.forEach((O) => {
      const U = Ge(O);
      F[U].push(O);
    }), F;
  }, [L, N, a]), T = G(
    (D, F = !1) => {
      if (!F || !S.current) {
        n(
          t.includes(D) ? t.filter((ut) => ut !== D) : [...t, D]
        ), S.current = D;
        return;
      }
      const O = L.findIndex((ut) => ut === S.current), U = L.findIndex((ut) => ut === D);
      if (O === -1 || U === -1) return;
      const [it, bt] = [
        Math.min(O, U),
        Math.max(O, U)
      ], pt = L.slice(it, bt + 1).map((ut) => ut);
      n(
        t.includes(D) ? t.filter((ut) => !pt.includes(ut)) : [.../* @__PURE__ */ new Set([...t, ...pt])]
      );
    },
    [t, n, L]
  ), E = (D) => {
    T(D, $.current), $.current = !1;
  }, R = (D, F) => {
    D.preventDefault(), T(F, D.shiftKey);
  }, P = G(
    (D) => {
      const F = Rr(L, D).map((O) => O);
      n(
        Aa(L, D, t) ? t.filter((O) => !F.includes(O)) : [.../* @__PURE__ */ new Set([...t, ...F])]
      );
    },
    [t, n, L]
  ), _ = () => {
    n(L.map((D) => D));
  }, z = () => {
    n([]);
  };
  return /* @__PURE__ */ d("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(q).map((D) => /* @__PURE__ */ r(
      Pc,
      {
        section: D,
        availableBookIds: L,
        selectedBookIds: t,
        onToggle: P,
        localizedStrings: o
      },
      D
    )) }),
    /* @__PURE__ */ d(
      oe,
      {
        open: v,
        onOpenChange: (D) => {
          y(D), D || C("");
        },
        children: [
          /* @__PURE__ */ r(ae, { asChild: !0, children: /* @__PURE__ */ d(
            V,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": v,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                t.length > 0 ? `${s}: ${t.length}` : i,
                /* @__PURE__ */ r(uo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(Ht, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ d(
            Ut,
            {
              shouldFilter: !1,
              onKeyDown: (D) => {
                D.key === "Enter" && ($.current = D.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  Pe,
                  {
                    placeholder: l,
                    value: N,
                    onValueChange: C
                  }
                ),
                /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(V, { variant: "ghost", size: "sm", onClick: _, children: c }),
                  /* @__PURE__ */ r(V, { variant: "ghost", size: "sm", onClick: z, children: w })
                ] }),
                /* @__PURE__ */ d(qt, { children: [
                  /* @__PURE__ */ r(nn, { children: p }),
                  Object.values(q).map((D, F) => {
                    const O = k[D];
                    if (O.length !== 0)
                      return /* @__PURE__ */ d(ao, { children: [
                        /* @__PURE__ */ r(
                          Gt,
                          {
                            heading: Vo(D, h, u, g, x),
                            children: O.map((U) => /* @__PURE__ */ r(
                              zo,
                              {
                                bookId: U,
                                isSelected: t.includes(U),
                                onSelect: () => E(U),
                                onMouseDown: (it) => R(it, U),
                                section: Ge(U),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: tr(U, a),
                                className: "tw-flex tw-items-center"
                              },
                              U
                            ))
                          }
                        ),
                        F < Object.values(q).length - 1 && /* @__PURE__ */ r($o, {})
                      ] }, D);
                  })
                ] })
              ]
            }
          ) })
        ]
      }
    ),
    t.length > 0 && /* @__PURE__ */ d("div", { className: "tw-mt-2 tw-flex tw-flex-wrap tw-gap-1", children: [
      t.slice(
        0,
        t.length === Gn ? Gn : ro
      ).map((D) => /* @__PURE__ */ r(Te, { className: "hover:tw-bg-secondary", variant: "secondary", children: ke(D, a) }, D)),
      t.length > Gn && /* @__PURE__ */ r(
        Te,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${t.length - ro} ${f}`
        }
      )
    ] })
  ] });
}
const Ep = Object.freeze([
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
]), we = (e, t) => e[t] ?? t;
function Tp({
  scope: e,
  availableScopes: t,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: s,
  localizedStrings: i,
  localizedBookNames: l,
  id: c
}) {
  const w = we(
    i,
    "%webView_scope_selector_selected_text%"
  ), p = we(
    i,
    "%webView_scope_selector_current_verse%"
  ), f = we(
    i,
    "%webView_scope_selector_current_chapter%"
  ), h = we(i, "%webView_scope_selector_current_book%"), u = we(i, "%webView_scope_selector_choose_books%"), g = we(i, "%webView_scope_selector_scope%"), x = we(i, "%webView_scope_selector_select_books%"), v = [
    { value: "selectedText", label: w, id: "scope-selected-text" },
    { value: "verse", label: p, id: "scope-verse" },
    { value: "chapter", label: f, id: "scope-chapter" },
    { value: "book", label: h, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], y = t ? v.filter((N) => t.includes(N.value)) : v;
  return /* @__PURE__ */ d("div", { id: c, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(lt, { children: g }),
      /* @__PURE__ */ r(
        hr,
        {
          value: e,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: y.map(({ value: N, label: C, id: S }) => /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(fn, { className: "tw-me-2", value: N, id: S }),
            /* @__PURE__ */ r(lt, { htmlFor: S, children: C })
          ] }, S))
        }
      )
    ] }),
    e === "selectedBooks" && /* @__PURE__ */ d("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(lt, { children: x }),
      /* @__PURE__ */ r(
        $c,
        {
          availableBookInfo: o,
          selectedBookIds: a,
          onChangeSelectedBookIds: s,
          localizedStrings: i,
          localizedBookNames: l
        }
      )
    ] })
  ] });
}
const Kn = {
  [W("undefined")]: "Ø",
  [W(0)]: "A",
  [W(1)]: "B",
  [W(2)]: "C",
  [W(3)]: "D",
  [W(4)]: "E",
  [W(5)]: "F",
  [W(6)]: "G",
  [W(7)]: "H",
  [W(8)]: "I",
  [W(9)]: "J",
  [W(10)]: "K",
  [W(11)]: "L",
  [W(12)]: "M",
  [W(13)]: "N",
  [W(14)]: "O",
  [W(15)]: "P",
  [W(16)]: "Q",
  [W(17)]: "R",
  [W(18)]: "S",
  [W(19)]: "T",
  [W(20)]: "U",
  [W(21)]: "V",
  [W(22)]: "W",
  [W(23)]: "X",
  [W(24)]: "Y",
  [W(25)]: "Z"
};
function Rp({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: s,
  id: i
}) {
  const l = {
    ...Kn,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([w, p]) => [
          w,
          w === p && w in Kn ? Kn[w] : p
        ]
      )
    )
  }, c = wt();
  return /* @__PURE__ */ d(
    Se,
    {
      value: `${t}`,
      onValueChange: (w) => n(
        w === "undefined" ? void 0 : parseInt(w, 10)
      ),
      children: [
        /* @__PURE__ */ r(ge, { size: a, className: m("pr-twp tw-w-auto", s), children: /* @__PURE__ */ r(
          De,
          {
            placeholder: l[W(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ r(
          be,
          {
            id: i,
            align: c === "rtl" ? "end" : "start",
            style: { zIndex: 250 },
            children: e.map((w) => /* @__PURE__ */ r(yt, { value: `${w}`, children: l[W(w)] }, `${w}`))
          }
        )
      ]
    }
  );
}
function Sp({ children: e }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: e });
}
function Dp({
  primary: e,
  secondary: t,
  children: n,
  isLoading: o = !1,
  loadingMessage: a
}) {
  return /* @__PURE__ */ d("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ r("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    o ? /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: a }) : /* @__PURE__ */ r("div", { children: n })
  ] });
}
function Mp({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ d("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ d("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ r(Re, {}) : ""
  ] });
}
function Pa(e, t) {
  var n;
  return (n = Object.entries(e).find(
    ([, o]) => "menuItem" in o && o.menuItem === t
  )) == null ? void 0 : n[0];
}
function vn({ icon: e, menuLabel: t, leading: n }) {
  return e ? /* @__PURE__ */ r(
    "img",
    {
      className: m("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: e,
      alt: `${n ? "Leading" : "Trailing"} icon for ${t}`
    }
  ) : void 0;
}
const $a = (e, t, n, o) => n ? Object.entries(e).filter(
  ([s, i]) => "column" in i && i.column === n || s === n
).sort(([, s], [, i]) => s.order - i.order).flatMap(([s]) => t.filter((l) => l.group === s).sort((l, c) => l.order - c.order).map((l) => /* @__PURE__ */ d(At, { children: [
  /* @__PURE__ */ r(jt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ d(
    bn,
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
  ) : /* @__PURE__ */ d(Ew, { children: [
    /* @__PURE__ */ r(va, { children: l.label }),
    /* @__PURE__ */ r(Cw, { children: /* @__PURE__ */ r(xa, { children: $a(
      e,
      t,
      Pa(e, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Et, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function wr({
  onSelectMenuItem: e,
  menuData: t,
  tabLabel: n,
  icon: o,
  className: a,
  variant: s,
  buttonVariant: i = "ghost",
  id: l
}) {
  return /* @__PURE__ */ d(ve, { variant: s, children: [
    /* @__PURE__ */ r($e, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(V, { variant: i, size: "icon", children: o ?? /* @__PURE__ */ r(Os, {}) }) }),
    /* @__PURE__ */ r(se, { align: "start", className: "tw-z-[250]", children: Object.entries(t.columns).filter(([, c]) => typeof c == "object").sort(([, c], [, w]) => typeof c == "boolean" || typeof w == "boolean" ? 0 : c.order - w.order).map(([c], w, p) => /* @__PURE__ */ d(ao, { children: [
      /* @__PURE__ */ r(ba, { children: /* @__PURE__ */ r(Ct, { children: $a(t.groups, t.items, c, e) }) }),
      w < p.length - 1 && /* @__PURE__ */ r(Le, {})
    ] }, c)) })
  ] });
}
const La = b.forwardRef(
  ({ id: e, className: t, children: n }, o) => /* @__PURE__ */ r(
    "div",
    {
      ref: o,
      className: `tw-sticky tw-top-0 tw-box-border tw-flex tw-h-14 tw-flex-row tw-items-center tw-justify-between tw-gap-2 tw-overflow-clip tw-px-4 tw-py-2 tw-text-foreground tw-@container/toolbar ${t}`,
      id: e,
      children: n
    }
  )
);
function Op({
  onSelectProjectMenuItem: e,
  onSelectViewInfoMenuItem: t,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: s,
  startAreaChildren: i,
  centerAreaChildren: l,
  endAreaChildren: c,
  menuButtonIcon: w
}) {
  return /* @__PURE__ */ d(La, { className: `tw-w-full tw-border ${s}`, id: a, children: [
    n && /* @__PURE__ */ r(
      wr,
      {
        onSelectMenuItem: e,
        menuData: n,
        tabLabel: "Project",
        icon: w ?? /* @__PURE__ */ r(Is, {}),
        buttonVariant: "ghost"
      }
    ),
    i && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-start", children: i }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-center @sm:tw-grow @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ d("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[2] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-2 tw-overflow-clip tw-@container/tab-toolbar-end", children: [
      o && /* @__PURE__ */ r(
        wr,
        {
          onSelectMenuItem: t,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(As, {}),
          className: "tw-h-full"
        }
      ),
      c
    ] })
  ] });
}
function Ip({
  onSelectProjectMenuItem: e,
  projectMenuData: t,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(La, { className: "tw-pointer-events-none", id: n, children: t && /* @__PURE__ */ r(
    wr,
    {
      onSelectMenuItem: e,
      menuData: t,
      tabLabel: "Project",
      icon: a,
      className: `tw-pointer-events-auto tw-shadow-lg ${o}`,
      buttonVariant: "outline"
    }
  ) });
}
const Va = b.forwardRef(({ className: e, ...t }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    xt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: m("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
      ...t,
      dir: o
    }
  );
});
Va.displayName = xt.List.displayName;
const ja = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  xt.List,
  {
    ref: n,
    className: m(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
ja.displayName = xt.List.displayName;
const Lc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  xt.Trigger,
  {
    ref: n,
    ...t,
    className: m(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), za = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  xt.Content,
  {
    ref: n,
    className: m(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
za.displayName = xt.Content.displayName;
function Ap({
  tabList: e,
  searchValue: t,
  onSearch: n,
  searchPlaceholder: o,
  headerTitle: a,
  searchClassName: s,
  id: i
}) {
  return /* @__PURE__ */ d("div", { id: i, className: "pr-twp", children: [
    /* @__PURE__ */ d("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      a ? /* @__PURE__ */ r("h1", { children: a }) : "",
      /* @__PURE__ */ r(
        Tr,
        {
          className: s,
          value: t,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ d(Va, { children: [
      /* @__PURE__ */ r(ja, { children: e.map((l) => /* @__PURE__ */ r(Lc, { value: l.value, children: l.value }, l.key)) }),
      e.map((l) => /* @__PURE__ */ r(za, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Vc({ ...e }) {
  return /* @__PURE__ */ r(Q.Menu, { ...e });
}
function jc({ ...e }) {
  return /* @__PURE__ */ r(Q.Sub, { "data-slot": "menubar-sub", ...e });
}
const Fa = b.forwardRef(({ className: e, variant: t = "default", ...n }, o) => {
  const a = b.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(_r.Provider, { value: a, children: /* @__PURE__ */ r(
    Q.Root,
    {
      ref: o,
      className: m(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        e
      ),
      ...n
    }
  ) });
});
Fa.displayName = Q.Root.displayName;
const Ba = b.forwardRef(({ className: e, ...t }, n) => {
  const o = Dt();
  return /* @__PURE__ */ r(
    Q.Trigger,
    {
      ref: n,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        Yt({ variant: o.variant, className: e })
        // CUSTOM use context to add variants
      ),
      ...t
    }
  );
});
Ba.displayName = Q.Trigger.displayName;
const Ga = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => {
  const s = Dt();
  return /* @__PURE__ */ d(
    Q.SubTrigger,
    {
      ref: a,
      className: m(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        t && "tw-pl-8",
        Yt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(_e, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Ga.displayName = Q.SubTrigger.displayName;
const Ka = b.forwardRef(({ className: e, ...t }, n) => {
  const o = Dt();
  return /* @__PURE__ */ r(
    Q.SubContent,
    {
      ref: n,
      className: m(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": o.variant === "muted"
        },
        e
      ),
      ...t
    }
  );
});
Ka.displayName = Q.SubContent.displayName;
const Ua = b.forwardRef(({ className: e, align: t = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, s) => {
  const i = Dt();
  return /* @__PURE__ */ r(Q.Portal, { children: /* @__PURE__ */ r(
    Q.Content,
    {
      ref: s,
      align: t,
      alignOffset: n,
      sideOffset: o,
      className: m(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": i.variant === "muted"
        },
        e
      ),
      ...a
    }
  ) });
});
Ua.displayName = Q.Content.displayName;
const qa = b.forwardRef(({ className: e, inset: t, ...n }, o) => {
  const a = Dt();
  return /* @__PURE__ */ r(
    Q.Item,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t && "tw-pl-8",
        Yt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n
    }
  );
});
qa.displayName = Q.Item.displayName;
const zc = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => {
  const s = Dt();
  return /* @__PURE__ */ d(
    Q.CheckboxItem,
    {
      ref: a,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Yt({ variant: s.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Q.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
        t
      ]
    }
  );
});
zc.displayName = Q.CheckboxItem.displayName;
const Fc = b.forwardRef(({ className: e, children: t, ...n }, o) => {
  const a = Dt();
  return /* @__PURE__ */ d(
    Q.RadioItem,
    {
      ref: o,
      className: m(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        Yt({ variant: a.variant, className: e }),
        // CUSTOM use context to add variants
        e
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Q.ItemIndicator, { children: /* @__PURE__ */ r(yn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        t
      ]
    }
  );
});
Fc.displayName = Q.RadioItem.displayName;
const Bc = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  Q.Label,
  {
    ref: o,
    className: m("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
Bc.displayName = Q.Label.displayName;
const Ha = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  Q.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Ha.displayName = Q.Separator.displayName;
const Fe = (e, t) => {
  setTimeout(() => {
    t.forEach((n) => {
      var o;
      (o = e.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Ya = (e, t, n, o) => {
  if (!n) return;
  const a = Object.entries(e).filter(
    ([s, i]) => "column" in i && i.column === n || s === n
  ).sort(([, s], [, i]) => s.order - i.order);
  return a.flatMap(([s], i) => {
    const l = t.filter((w) => w.group === s).sort((w, p) => w.order - p.order).map((w) => /* @__PURE__ */ d(At, { children: [
      /* @__PURE__ */ r(jt, { asChild: !0, children: "command" in w ? /* @__PURE__ */ d(
        qa,
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
      ) : /* @__PURE__ */ d(jc, { children: [
        /* @__PURE__ */ r(Ga, { children: w.label }),
        /* @__PURE__ */ r(Ka, { children: Ya(
          e,
          t,
          Pa(e, w.id),
          o
        ) })
      ] }, `menubar-sub-${w.label}-${w.id}`) }),
      w.tooltip && /* @__PURE__ */ r(Et, { children: w.tooltip })
    ] }, `tooltip-${w.label}-${"command" in w ? w.command : w.id}`)), c = [...l];
    return l.length > 0 && i < a.length - 1 && c.push(/* @__PURE__ */ r(Ha, {}, `separator-${s}`)), c;
  });
};
function Gc({
  menuData: e,
  onSelectMenuItem: t,
  onOpenChange: n,
  variant: o
}) {
  const a = X(void 0), s = X(void 0), i = X(void 0), l = X(void 0), c = X(void 0), w = (p) => {
    switch (p) {
      case "platform.app":
        return s;
      case "platform.window":
        return i;
      case "platform.layout":
        return l;
      case "platform.help":
        return c;
      default:
        return;
    }
  };
  if (Gi(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (p, f) => {
    var g, x, v, y;
    p.preventDefault();
    const h = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (f.hotkey) {
      case "alt":
        Fe(s, [h]);
        break;
      case "alt+p":
        (g = s.current) == null || g.focus(), Fe(s, [h, u]);
        break;
      case "alt+l":
        (x = i.current) == null || x.focus(), Fe(i, [h, u]);
        break;
      case "alt+n":
        (v = l.current) == null || v.focus(), Fe(l, [h, u]);
        break;
      case "alt+h":
        (y = c.current) == null || y.focus(), Fe(c, [h, u]);
        break;
    }
  }), H(() => {
    if (!n || !a.current) return;
    const p = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const x = g.target.getAttribute("data-state");
          n(x === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      p.observe(u, { attributes: !0 });
    }), () => p.disconnect();
  }, [n]), !!e)
    return /* @__PURE__ */ r(Fa, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(e.columns).filter(([, p]) => typeof p == "object").sort(([, p], [, f]) => typeof p == "boolean" || typeof f == "boolean" ? 0 : p.order - f.order).map(([p, f]) => /* @__PURE__ */ d(Vc, { children: [
      /* @__PURE__ */ r(Ba, { ref: w(p), children: typeof f == "object" && "label" in f && f.label }),
      /* @__PURE__ */ r(
        Ua,
        {
          className: "tw-z-[250]",
          children: /* @__PURE__ */ r(Ct, { children: Ya(e.groups, e.items, p, t) })
        }
      )
    ] }, p)) });
}
function Pp(e) {
  switch (e) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function $p({
  menuData: e,
  onOpenChange: t,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: s,
  appMenuAreaChildren: i,
  configAreaChildren: l,
  shouldUseAsAppDragArea: c,
  menubarVariant: w = "default"
}) {
  const p = X(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw-border tw-px-4 tw-text-foreground", o),
      ref: p,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ d(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: c ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ d(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: c ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  i,
                  e && /* @__PURE__ */ r(
                    Gc,
                    {
                      menuData: e,
                      onOpenChange: t,
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
                children: s
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
const Kc = (e, t) => e[t] ?? t;
function Lp({
  knownUiLanguages: e,
  primaryLanguage: t = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: s,
  localizedStrings: i,
  className: l,
  id: c
}) {
  const w = Kc(
    i,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [p, f] = A(!1), h = (g) => {
    a && a(g), o && o([g, ...n.filter((x) => x !== g)]), s && n.find((x) => x === g) && s([...n.filter((x) => x !== g)]), f(!1);
  }, u = (g, x) => {
    var y, N, C, S, $, L;
    const v = x !== g ? ((N = (y = e[g]) == null ? void 0 : y.uiNames) == null ? void 0 : N[x]) ?? ((S = (C = e[g]) == null ? void 0 : C.uiNames) == null ? void 0 : S.en) : void 0;
    return v ? `${($ = e[g]) == null ? void 0 : $.autonym} (${v})` : (L = e[g]) == null ? void 0 : L.autonym;
  };
  return /* @__PURE__ */ d("div", { id: c, className: m("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ d(
      Se,
      {
        name: "uiLanguage",
        value: t,
        onValueChange: h,
        open: p,
        onOpenChange: (g) => f(g),
        children: [
          /* @__PURE__ */ r(ge, { children: /* @__PURE__ */ r(De, {}) }),
          /* @__PURE__ */ r(
            be,
            {
              className: "tw-z-[250]",
              children: Object.keys(e).map((g) => /* @__PURE__ */ r(yt, { value: g, children: u(g, t) }, g))
            }
          )
        ]
      }
    ),
    t !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(lt, { className: "tw-font-normal tw-text-muted-foreground", children: pe(w, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, t)).join(", ") : e.en.autonym
    }) }) })
  ] });
}
function Uc({ item: e, createLabel: t, createComplexLabel: n }) {
  return t ? /* @__PURE__ */ r(lt, { children: t(e) }) : n ? /* @__PURE__ */ r(lt, { children: n(e) }) : /* @__PURE__ */ r(lt, { children: e });
}
function Vp({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: s,
  createComplexLabel: i
}) {
  return /* @__PURE__ */ r("div", { id: e, className: t, children: n.map((l) => /* @__PURE__ */ d("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ r(
      Er,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (c) => a(l, c)
      }
    ),
    /* @__PURE__ */ r(
      Uc,
      {
        item: l,
        createLabel: s,
        createComplexLabel: i
      }
    )
  ] }, l)) });
}
function oo(e, t) {
  if (e)
    return /* @__PURE__ */ r(
      "span",
      {
        className: m(
          "tw-h-fit tw-truncate tw-whitespace-normal tw-text-start tw-text-xs tw-font-medium",
          t
        ),
        children: e ?? ""
      }
    );
}
function qc({
  startRef: e,
  endRef: t,
  scriptureTextPart: n,
  className: o,
  onClick: a,
  scrRefFormattingOptions: s,
  includeInLink: i = "onlyScrRef"
}) {
  return /* @__PURE__ */ d("div", { className: m("tw-overflow-hidden tw-truncate tw-p-1 tw-text-start tw-leading-none"), children: [
    /* @__PURE__ */ d(
      V,
      {
        variant: "link",
        "aria-label": "Submit reference change",
        onClick: a,
        className: m("tw-me-2 tw-inline tw-h-4 tw-p-0 tw-text-start", o),
        children: [
          /* @__PURE__ */ r("span", { className: m({ "tw-me-2": i === "allText" }), children: t ? Hs(e, t, s) : Ys(e, s) }),
          i === "allText" && oo(n, o)
        ]
      }
    ),
    i === "onlyScrRef" && oo(n, o)
  ] });
}
function jp({
  cardKey: e,
  isSelected: t,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: s,
  children: i,
  dropdownContent: l,
  additionalSelectedContent: c,
  accentColor: w,
  onDoubleClick: p,
  linkedScrRef: f,
  badges: h
}) {
  const u = X(void 0);
  return /* @__PURE__ */ d(
    "div",
    {
      hidden: a,
      onClick: n,
      onMouseDown: (x) => {
        x.detail > 1 && x.preventDefault();
      },
      onDoubleClick: p,
      onKeyDown: (x) => {
        document.activeElement === (u == null ? void 0 : u.current) && (x.key === "Enter" || x.key === " ") && (x.preventDefault(), n == null || n());
      },
      ref: u,
      role: "button",
      tabIndex: 0,
      "aria-pressed": t,
      className: m(
        "tw-relative tw-min-w-36 tw-cursor-default tw-rounded-xl tw-border tw-shadow-none hover:tw-bg-muted/50",
        { "tw-opacity-50 hover:tw-opacity-100": o && !t },
        { "tw-bg-muted": t },
        { "tw-bg-transparent": !t },
        s
      ),
      children: [
        /* @__PURE__ */ d("div", { className: m("tw-flex tw-flex-col tw-px-4 tw-py-3", { "tw-pb-4": t }), children: [
          /* @__PURE__ */ d("div", { className: "tw-flex tw-justify-between tw-overflow-hidden", children: [
            /* @__PURE__ */ d(
              "div",
              {
                className: m(
                  "tw-flex tw-max-w-[calc(100%-0.5rem)] tw-flex-wrap tw-items-baseline tw-gap-x-2",
                  {
                    "tw-w-[calc(100%-3rem)]": t && l
                  }
                ),
                children: [
                  /* @__PURE__ */ r(
                    qc,
                    {
                      startRef: f == null ? void 0 : f.startRef,
                      endRef: f == null ? void 0 : f.endRef,
                      scriptureTextPart: f.scriptureTextPart,
                      scrRefFormattingOptions: f.scrRefFormattingOptions,
                      onClick: (x) => {
                        x == null || x.stopPropagation(), n(), p == null || p();
                      },
                      className: "tw-whitespace-normal tw-rounded-sm tw-text-xs tw-font-medium"
                    }
                  ),
                  h && /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2 tw-whitespace-normal tw-break-words", children: h }),
                  i && /* @__PURE__ */ r(
                    "div",
                    {
                      className: m(
                        "tw-ms-1 tw-overflow-hidden tw-text-ellipsis tw-py-1 tw-text-xs tw-text-muted-foreground",
                        {
                          "tw-break-words": t
                        }
                      ),
                      children: i
                    }
                  )
                ]
              }
            ),
            t && l && /* @__PURE__ */ r("div", { className: "tw-p-1", children: /* @__PURE__ */ d(ve, { children: [
              /* @__PURE__ */ r($e, { className: w, asChild: !0, children: /* @__PURE__ */ r(V, { className: "tw-h-6 tw-w-8", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(wo, {}) }) }),
              /* @__PURE__ */ r(se, { align: "end", children: l })
            ] }) })
          ] }),
          t && c && /* @__PURE__ */ r("div", { className: "tw-ms-1 tw-w-fit tw-min-w-0 tw-max-w-full tw-overflow-hidden tw-break-words", children: c })
        ] }),
        w && /* @__PURE__ */ r(
          "div",
          {
            className: `tw-absolute tw-right-0 tw-top-0 tw-h-full tw-w-2 tw-rounded-r-xl ${w}`
          }
        )
      ]
    },
    e
  );
}
const Hc = Qe(({ className: e, ...t }, n) => /* @__PURE__ */ r(Ps, { size: 35, className: m("tw-animate-spin", e), ...t, ref: n }));
Hc.displayName = "Spinner";
function zp({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: s,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: w,
  value: p,
  onChange: f,
  onFocus: h,
  onBlur: u
}) {
  return /* @__PURE__ */ d("div", { className: m("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      lt,
      {
        htmlFor: e,
        className: m({
          "tw-text-red-600": n,
          "tw-hidden": !s
        }),
        children: `${s}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      Ve,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: m(c, { "tw-border-red-600": n }),
        defaultValue: w,
        value: p,
        onChange: f,
        onFocus: h,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: m({ "tw-hidden": !a }), children: a })
  ] });
}
const Yc = re(
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
), Xc = b.forwardRef(({ className: e, variant: t, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: m(
      // CUSTOM
      "pr-twp",
      Yc({ variant: t }),
      e
    ),
    ...n
  }
));
Xc.displayName = "Alert";
const Wc = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ d(
    "h5",
    {
      ref: n,
      className: m("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Wc.displayName = "AlertTitle";
const Jc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r("div", { ref: n, className: m("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
Jc.displayName = "AlertDescription";
const Fp = tt.Root, Bp = tt.Trigger, Gp = tt.Group, Kp = tt.Portal, Up = tt.Sub, qp = tt.RadioGroup, Zc = b.forwardRef(({ className: e, inset: t, children: n, ...o }, a) => /* @__PURE__ */ d(
  tt.SubTrigger,
  {
    ref: a,
    className: m(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      t && "tw-pl-8",
      e
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(_e, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Zc.displayName = tt.SubTrigger.displayName;
const Qc = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  tt.SubContent,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Qc.displayName = tt.SubContent.displayName;
const td = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(tt.Portal, { children: /* @__PURE__ */ r(
  tt.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
td.displayName = tt.Content.displayName;
const ed = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  tt.Item,
  {
    ref: o,
    className: m(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
ed.displayName = tt.Item.displayName;
const nd = b.forwardRef(({ className: e, children: t, checked: n, ...o }, a) => /* @__PURE__ */ d(
  tt.CheckboxItem,
  {
    ref: a,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(tt.ItemIndicator, { children: /* @__PURE__ */ r(Rt, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
nd.displayName = tt.CheckboxItem.displayName;
const rd = b.forwardRef(({ className: e, children: t, ...n }, o) => /* @__PURE__ */ d(
  tt.RadioItem,
  {
    ref: o,
    className: m(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(tt.ItemIndicator, { children: /* @__PURE__ */ r(yn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
rd.displayName = tt.RadioItem.displayName;
const od = b.forwardRef(({ className: e, inset: t, ...n }, o) => /* @__PURE__ */ r(
  tt.Label,
  {
    ref: o,
    className: m(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
od.displayName = tt.Label.displayName;
const ad = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  tt.Separator,
  {
    ref: n,
    className: m("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
ad.displayName = tt.Separator.displayName;
function sd({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: m("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", e),
      ...t
    }
  );
}
sd.displayName = "ContextMenuShortcut";
const Xa = b.createContext({
  direction: "bottom"
});
function id({
  shouldScaleBackground: e = !0,
  direction: t = "bottom",
  ...n
}) {
  const o = b.useMemo(() => ({ direction: t }), [t]);
  return /* @__PURE__ */ r(Xa.Provider, { value: o, children: /* @__PURE__ */ r(
    St.Root,
    {
      shouldScaleBackground: e,
      direction: t,
      ...n
    }
  ) });
}
id.displayName = "Drawer";
const Hp = St.Trigger, ld = St.Portal, Yp = St.Close, Wa = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St.Overlay,
  {
    ref: n,
    className: m("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", e),
    ...t
  }
));
Wa.displayName = St.Overlay.displayName;
const wd = b.forwardRef(({ className: e, children: t, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: s = "bottom" } = b.useContext(Xa), i = {
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
  return /* @__PURE__ */ d(ld, { children: [
    /* @__PURE__ */ r(Wa, {}),
    /* @__PURE__ */ d(
      St.Content,
      {
        ref: a,
        className: m(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          s === "bottom" || s === "top" ? "tw-flex-col" : "tw-flex-row",
          i[s],
          e
        ),
        ...o,
        children: [
          !n && (s === "bottom" || s === "right") && /* @__PURE__ */ r("div", { className: l[s] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: t }),
          !n && (s === "top" || s === "left") && /* @__PURE__ */ r("div", { className: l[s] })
        ]
      }
    )
  ] });
});
wd.displayName = "DrawerContent";
function cd({ className: e, ...t }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: m("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", e),
      ...t
    }
  );
}
cd.displayName = "DrawerHeader";
function dd({ className: e, ...t }) {
  return /* @__PURE__ */ r("div", { className: m("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", e), ...t });
}
dd.displayName = "DrawerFooter";
const pd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St.Title,
  {
    ref: n,
    className: m("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
pd.displayName = St.Title.displayName;
const ud = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  St.Description,
  {
    ref: n,
    className: m("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
ud.displayName = St.Description.displayName;
const md = b.forwardRef(({ className: e, value: t, ...n }, o) => /* @__PURE__ */ r(
  Zn.Root,
  {
    ref: o,
    className: m(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      e
    ),
    ...n,
    children: /* @__PURE__ */ r(
      Zn.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (t || 0)}%)` }
      }
    )
  }
));
md.displayName = Zn.Root.displayName;
function Xp({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ r(
    ur.PanelGroup,
    {
      className: m(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        e
      ),
      ...t
    }
  );
}
const Wp = ur.Panel;
function Jp({
  withHandle: e,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ r(
    ur.PanelResizeHandle,
    {
      className: m(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        t
      ),
      ...n,
      children: e && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r($s, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function Zp({ ...e }) {
  return /* @__PURE__ */ r(
    Ki,
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
      ...e
    }
  );
}
const fd = b.forwardRef(({ className: e, ...t }, n) => {
  const o = wt();
  return /* @__PURE__ */ d(
    Be.Root,
    {
      ref: n,
      className: m(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        e
      ),
      ...t,
      dir: o,
      children: [
        /* @__PURE__ */ r(Be.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(Be.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(Be.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
fd.displayName = Be.Root.displayName;
const hd = b.forwardRef(({ className: e, ...t }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    Qn.Root,
    {
      className: m(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        e
      ),
      ...t,
      ref: n,
      children: /* @__PURE__ */ r(
        Qn.Thumb,
        {
          className: m(
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
});
hd.displayName = Qn.Root.displayName;
const Qp = xt.Root, gd = b.forwardRef(({ className: e, ...t }, n) => {
  const o = wt();
  return /* @__PURE__ */ r(
    xt.List,
    {
      ref: n,
      className: m(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        e
      ),
      ...t,
      dir: o
    }
  );
});
gd.displayName = xt.List.displayName;
const bd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  xt.Trigger,
  {
    ref: n,
    className: m(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
bd.displayName = xt.Trigger.displayName;
const vd = b.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ r(
  xt.Content,
  {
    ref: n,
    className: m(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
vd.displayName = xt.Content.displayName;
const xd = b.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: m(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        e
      ),
      ref: n,
      ...t
    }
  )
);
xd.displayName = "Textarea";
const tu = (e, t) => {
  H(() => {
    if (!e) return () => {
    };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
};
function yd(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Nd = (e, t, n = {}) => {
  const o = X(t);
  o.current = t;
  const a = X(n);
  a.current = yd(a.current);
  const [s, i] = A(() => o.current), [l, c] = A(!0);
  return H(() => {
    let w = !0;
    return c(!!e), (async () => {
      if (e) {
        const p = await e();
        w && (i(() => p), c(!1));
      }
    })(), () => {
      w = !1, a.current.preserveValue || i(() => o.current);
    };
  }, [e]), [s, l];
}, Un = () => !1, eu = (e, t) => {
  const [n] = Nd(
    G(async () => {
      if (!e) return Un;
      const o = await Promise.resolve(e(t));
      return async () => o();
    }, [t, e]),
    Un,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  H(() => () => {
    n !== Un && n();
  }, [n]);
};
function nu(e) {
  H(() => {
    let t;
    return e && (t = document.createElement("style"), t.appendChild(document.createTextNode(e)), document.head.appendChild(t)), () => {
      t && document.head.removeChild(t);
    };
  }, [e]);
}
function kd(e, t = "top") {
  if (!e || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(e)), t === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
kd(`*, ::before, ::after {
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
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
}
.tw-z-\\[300\\] {
  z-index: 300;
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
.tw-inline {
  display: inline;
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
.tw-h-fit {
  height: fit-content;
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
.tw-w-\\[calc\\(100\\%-3rem\\)\\] {
  width: calc(100% - 3rem);
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
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
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
.tw-max-w-\\[220px\\] {
  max-width: 220px;
}
.tw-max-w-\\[calc\\(100\\%-0\\.5rem\\)\\] {
  max-width: calc(100% - 0.5rem);
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
.tw-grow-\\[2\\] {
  flex-grow: 2;
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
.tw-rounded-l-\\[10px\\] {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.tw-rounded-r-\\[10px\\] {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.tw-rounded-r-xl {
  border-top-right-radius: 0.75rem;
  border-bottom-right-radius: 0.75rem;
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
.tw-bg-background {
  background-color: hsl(var(--background));
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
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
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
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
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
.tw-\\@container\\/tab-toolbar-center {
  container-type: inline-size;
  container-name: tab-toolbar-center;
}
.tw-\\@container\\/tab-toolbar-end {
  container-type: inline-size;
  container-name: tab-toolbar-end;
}
.tw-\\@container\\/tab-toolbar-start {
  container-type: inline-size;
  container-name: tab-toolbar-start;
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

  .\\@sm\\:tw-grow {
    flex-grow: 1;
  }

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
  Xc as Alert,
  Jc as AlertDescription,
  Wc as AlertTitle,
  ha as Avatar,
  ga as AvatarFallback,
  _w as AvatarImage,
  Jd as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  Zd as BOOK_SELECTOR_STRING_KEYS,
  Te as Badge,
  Wd as BookChapterControl,
  al as BookSelectionMode,
  Qd as BookSelector,
  V as Button,
  ep as COMMENT_EDITOR_STRING_KEYS,
  np as COMMENT_LIST_STRING_KEYS,
  ma as Card,
  fa as CardContent,
  Nw as CardDescription,
  kw as CardFooter,
  xw as CardHeader,
  yw as CardTitle,
  ol as ChapterRangeSelector,
  Er as Checkbox,
  Vp as Checklist,
  er as ComboBox,
  Ut as Command,
  nn as CommandEmpty,
  Gt as CommandGroup,
  Pe as CommandInput,
  Pt as CommandItem,
  qt as CommandList,
  tp as CommentEditor,
  rp as CommentList,
  Fp as ContextMenu,
  nd as ContextMenuCheckboxItem,
  td as ContextMenuContent,
  Gp as ContextMenuGroup,
  ed as ContextMenuItem,
  od as ContextMenuLabel,
  Kp as ContextMenuPortal,
  qp as ContextMenuRadioGroup,
  rd as ContextMenuRadioItem,
  ad as ContextMenuSeparator,
  sd as ContextMenuShortcut,
  Up as ContextMenuSub,
  Qc as ContextMenuSubContent,
  Zc as ContextMenuSubTrigger,
  Bp as ContextMenuTrigger,
  Bw as DataTable,
  id as Drawer,
  Yp as DrawerClose,
  wd as DrawerContent,
  ud as DrawerDescription,
  dd as DrawerFooter,
  cd as DrawerHeader,
  Wa as DrawerOverlay,
  ld as DrawerPortal,
  pd as DrawerTitle,
  Hp as DrawerTrigger,
  ve as DropdownMenu,
  zt as DropdownMenuCheckboxItem,
  se as DropdownMenuContent,
  ba as DropdownMenuGroup,
  bn as DropdownMenuItem,
  Uw as DropdownMenuItemType,
  rn as DropdownMenuLabel,
  Cw as DropdownMenuPortal,
  Tw as DropdownMenuRadioGroup,
  ya as DropdownMenuRadioItem,
  Le as DropdownMenuSeparator,
  Rw as DropdownMenuShortcut,
  Ew as DropdownMenuSub,
  xa as DropdownMenuSubContent,
  va as DropdownMenuSubTrigger,
  $e as DropdownMenuTrigger,
  Gw as ERROR_DUMP_STRING_KEYS,
  ap as ERROR_POPOVER_STRING_KEYS,
  Kw as ErrorDump,
  sp as ErrorPopover,
  pp as FOOTNOTE_EDITOR_STRING_KEYS,
  cp as Filter,
  ip as FilterDropdown,
  wp as Footer,
  dp as FootnoteEditor,
  oc as FootnoteItem,
  up as FootnoteList,
  xp as INVENTORY_STRING_KEYS,
  Ve as Input,
  yp as Inventory,
  lt as Label,
  qc as LinkedScrRefDisplay,
  Np as MARKER_MENU_STRING_KEYS,
  op as MarkdownRenderer,
  kp as MarkerMenu,
  lp as MoreInfo,
  Hw as MultiSelectComboBox,
  Ap as NavigationContentSearch,
  oe as Popover,
  Yd as PopoverAnchor,
  Ht as PopoverContent,
  ae as PopoverTrigger,
  md as Progress,
  hr as RadioGroup,
  fn as RadioGroupItem,
  Zi as RecentSearches,
  Jp as ResizableHandle,
  Wp as ResizablePanel,
  Xp as ResizablePanelGroup,
  jp as ResultsCard,
  Ep as SCOPE_SELECTOR_STRING_KEYS,
  Tp as ScopeSelector,
  Cp as ScriptureResultsViewer,
  Rp as ScrollGroupSelector,
  Tr as SearchBar,
  Se as Select,
  be as SelectContent,
  Mw as SelectGroup,
  yt as SelectItem,
  Iw as SelectLabel,
  ka as SelectScrollDownButton,
  Na as SelectScrollUpButton,
  Aw as SelectSeparator,
  ge as SelectTrigger,
  De as SelectValue,
  Re as Separator,
  Sp as SettingsList,
  Mp as SettingsListHeader,
  Dp as SettingsListItem,
  Tc as SettingsSidebar,
  _p as SettingsSidebarContentSearch,
  Ta as Sidebar,
  Sa as SidebarContent,
  gc as SidebarFooter,
  sr as SidebarGroup,
  vc as SidebarGroupAction,
  lr as SidebarGroupContent,
  ir as SidebarGroupLabel,
  hc as SidebarHeader,
  fc as SidebarInput,
  Ra as SidebarInset,
  Da as SidebarMenu,
  yc as SidebarMenuAction,
  Nc as SidebarMenuBadge,
  Oa as SidebarMenuButton,
  Ma as SidebarMenuItem,
  kc as SidebarMenuSkeleton,
  _c as SidebarMenuSub,
  Ec as SidebarMenuSubButton,
  Cc as SidebarMenuSubItem,
  Ea as SidebarProvider,
  mc as SidebarRail,
  bc as SidebarSeparator,
  uc as SidebarTrigger,
  ar as Skeleton,
  fd as Slider,
  Zp as Sonner,
  Hc as Spinner,
  hd as Switch,
  wr as TabDropdownMenu,
  Ip as TabFloatingMenu,
  Op as TabToolbar,
  En as Table,
  Rn as TableBody,
  Fw as TableCaption,
  he as TableCell,
  Lw as TableFooter,
  Ze as TableHead,
  Tn as TableHeader,
  Vt as TableRow,
  Qp as Tabs,
  vd as TabsContent,
  gd as TabsList,
  bd as TabsTrigger,
  zp as TextField,
  xd as Textarea,
  Nr as ToggleGroup,
  He as ToggleGroupItem,
  $p as Toolbar,
  At as Tooltip,
  Et as TooltipContent,
  Ct as TooltipProvider,
  jt as TooltipTrigger,
  Lp as UiLanguageSelector,
  Va as VerticalTabs,
  za as VerticalTabsContent,
  ja as VerticalTabsList,
  Lc as VerticalTabsTrigger,
  vw as badgeVariants,
  Ji as buttonVariants,
  m as cn,
  vp as getBookIdFromUSFM,
  gp as getLinesFromUSFM,
  au as getLocalizedBookName,
  bp as getNumberFromUSFM,
  lc as getStatusForItem,
  Pp as getToolbarOSReservedSpaceClassName,
  fp as inventoryCountColumn,
  mp as inventoryItemColumn,
  hp as inventoryStatusColumn,
  Ow as selectTriggerVariants,
  iu as sonner,
  tu as useEvent,
  eu as useEventAsync,
  bw as useListbox,
  Nd as usePromise,
  Xd as useRecentSearches,
  Dn as useSidebar,
  nu as useStylesheet
};
//# sourceMappingURL=index.js.map
