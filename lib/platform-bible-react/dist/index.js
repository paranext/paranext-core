var Mi = Object.defineProperty;
var Oi = (t, e, n) => e in t ? Mi(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var Nt = (t, e, n) => Oi(t, typeof e != "symbol" ? e + "" : e, n);
import { jsx as r, jsxs as p, Fragment as st } from "react/jsx-runtime";
import v, { forwardRef as fn, useRef as G, useMemo as z, useState as D, useCallback as B, useLayoutEffect as $t, createContext as Ln, useContext as Tr, useEffect as U, Component as Ii, createElement as Jr, Suspense as Ai, Fragment as Oo } from "react";
import { Command as Et } from "cmdk";
import { X as hn, Search as Io, Check as Qt, Clock as Zr, ChevronsLeft as Qr, ChevronsRight as to, ChevronLeft as ir, ChevronRight as je, ArrowLeft as Pi, ArrowRight as $i, Circle as Vn, ChevronDown as Ue, BoldIcon as Li, ItalicIcon as Vi, AtSign as Ao, Pencil as ji, Trash2 as zi, ArrowUp as Po, MoreHorizontal as Fi, MailOpen as Bi, Mail as Ki, ChevronUp as $o, FilterIcon as Gi, ArrowLeftIcon as Ui, ChevronLeftIcon as qi, ChevronRightIcon as Hi, ArrowRightIcon as Yi, Copy as Lo, Filter as Xi, User as Wi, Link as Ji, CircleHelp as Zi, ChevronsUpDown as Vo, Star as Qi, Undo as ts, Redo as es, SquareX as jo, FunctionSquare as zo, SquareSigma as Fo, Ban as ns, AlertCircle as sr, CircleCheckIcon as rs, CircleXIcon as os, CircleHelpIcon as as, ArrowUpIcon as is, ArrowDownIcon as ss, PanelLeft as ls, PanelRight as cs, ScrollText as ws, MenuIcon as ds, Menu as ps, EllipsisVertical as us, MoreVertical as eo, LoaderCircle as ms, GripVertical as fs } from "lucide-react";
import { clsx as hs } from "clsx";
import { extendTailwindMerge as gs } from "tailwind-merge";
import * as Dt from "@radix-ui/react-dialog";
import { Canon as mt } from "@sillsdev/scripture";
import { includes as vn, Section as Y, getChaptersForBook as bs, formatScrRef as Ee, getSectionForBook as sn, formatRelativeDate as vs, formatReplacementString as Ce, sanitizeHtml as xs, NumberFormat as ys, formatBytes as Ns, getCurrentLocale as ks, usfmMarkers as _n, getFormatCallerFunction as _s, deepEqual as Cs, isString as no, compareScrRefs as lr, scrRefToBBBCCCVVV as qn, getLocalizeKeyForScrollGroupId as Z } from "platform-bible-utils";
import { Slot as qe } from "@radix-ui/react-slot";
import { cva as pe } from "class-variance-authority";
import * as ze from "@radix-ui/react-popover";
import * as Bo from "@radix-ui/react-label";
import * as dn from "@radix-ui/react-radio-group";
import { createEditor as Ko, $getRoot as ce, $createParagraphNode as He, $getSelection as Ct, HISTORY_MERGE_TAG as Rr, ParagraphNode as Go, TextNode as Uo, $isTokenOrSegmented as Es, $getCharacterOffsets as Ts, $cloneWithPropertiesEphemeral as Rs, $getPreviousSelection as Ss, $isRangeSelection as Wt, $caretFromPoint as Ds, $getSiblingCaret as qo, $getChildCaret as Ms, $getAdjacentChildCaret as Os, $isChildCaret as Is, $normalizeCaret as As, $setSelectionFromCaretRange as Ps, $getCollapsedCaretRange as $s, $getCaretInDirection as ro, $splitAtPointCaretNext as Ls, $isTextPointCaret as Vs, $findMatchingParent as Ho, $isElementNode as ie, mergeRegister as we, getDOMTextNode as js, isHTMLElement as Yo, CLEAR_EDITOR_COMMAND as Xo, COMMAND_PRIORITY_EDITOR as Sr, shallowMergeConfig as zs, defineExtension as jt, safeCast as Ae, createState as Fs, FORMAT_TEXT_COMMAND as Wo, $isNodeSelection as Jo, COMMAND_PRIORITY_LOW as Zo, RootNode as Bs, LineBreakNode as Ks, TabNode as Gs, $isEditorState as Us, createCommand as qs, CLICK_COMMAND as Hs, isDOMNode as Ys, $getNodeFromDOMNode as Xs, $createNodeSelection as Ws, $setSelection as Js, $getEditor as Zs, DecoratorNode as cr, $getState as Qs, toggleTextFormatType as oo, TEXT_TYPE_TO_FORMAT as tl, $setState as el, addClassNamesToElement as Qo, $create as nl, $getNodeByKey as rl, removeClassNamesFromElement as ol, KEY_TAB_COMMAND as al, $isBlockElementNode as Tn, $createRangeSelection as il, $normalizeSelection__EXPERIMENTAL as sl, OUTDENT_CONTENT_COMMAND as ll, INDENT_CONTENT_COMMAND as ao, INSERT_TAB_COMMAND as cl, COMMAND_PRIORITY_CRITICAL as Dr, $isDecoratorNode as wl, $isParagraphNode as dl, $isTextNode as Rn, SELECTION_CHANGE_COMMAND as ta, getRegisteredNode as pl, isDocumentFragment as io, isDOMDocumentNode as ul, ArtificialNode__DO_NOT_USE as ea, $createLineBreakNode as na, $isRootOrShadowRoot as ml, isBlockDomNode as so, isInlineDomNode as lo, $insertNodes as fl } from "lexical";
import * as Se from "@radix-ui/react-tooltip";
import { TooltipTrigger as hl } from "@radix-ui/react-tooltip";
import { HeadingNode as gl, QuoteNode as bl, registerRichText as vl } from "@lexical/rich-text";
import { flushSync as xl, createPortal as yl } from "react-dom";
import { $isTableSelection as Nl } from "@lexical/table";
import * as jn from "@radix-ui/react-toggle-group";
import * as ra from "@radix-ui/react-toggle";
import { createHeadlessEditor as oa } from "@lexical/headless";
import * as aa from "@radix-ui/react-separator";
import * as Ye from "@radix-ui/react-avatar";
import * as rt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as kl } from "@radix-ui/react-dropdown-menu";
import { useReactTable as ia, getFilteredRowModel as _l, getSortedRowModel as sa, getPaginationRowModel as Cl, getCoreRowModel as la, flexRender as ln, getGroupedRowModel as El, getExpandedRowModel as Tl } from "@tanstack/react-table";
import * as dt from "@radix-ui/react-select";
import Rl from "markdown-to-jsx";
import { GENERATOR_NOTE_CALLER as wr, HIDDEN_NOTE_CALLER as dr, getDefaultViewOptions as Sl, isInsertEmbedOpOfType as xn, Editorial as Dl } from "@eten-tech-foundation/platform-editor";
import * as pr from "@radix-ui/react-checkbox";
import * as Tt from "@radix-ui/react-tabs";
import * as ot from "@radix-ui/react-menubar";
import { useHotkeys as Ml } from "react-hotkeys-hook";
import * as at from "@radix-ui/react-context-menu";
import { Drawer as Kt } from "vaul";
import * as ur from "@radix-ui/react-progress";
import * as Mr from "react-resizable-panels";
import { Toaster as Ol } from "sonner";
import { toast as um } from "sonner";
import * as an from "@radix-ui/react-slider";
import * as mr from "@radix-ui/react-switch";
const Il = gs({ prefix: "tw-" });
function h(...t) {
  return Il(hs(t));
}
const Xe = 250, ca = 300, Al = 400, Pl = 450, $l = 500, Ll = "layoutDirection";
function ft() {
  const t = localStorage.getItem(Ll);
  return t === "rtl" ? t : "ltr";
}
const Vl = Dt.Root, ru = Dt.Trigger, jl = Dt.Portal, ou = Dt.Close, wa = v.forwardRef(({ className: t, style: e, ...n }, o) => /* @__PURE__ */ r(
  Dt.Overlay,
  {
    ref: o,
    className: h(
      // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL_BACKDROP constant
      "tw-fixed tw-inset-0 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    style: { zIndex: Pl, ...e },
    ...n
  }
));
wa.displayName = Dt.Overlay.displayName;
const da = v.forwardRef(({ className: t, children: e, overlayClassName: n, style: o, ...a }, i) => {
  const s = ft();
  return /* @__PURE__ */ p(jl, { children: [
    /* @__PURE__ */ r(wa, { className: n }),
    /* @__PURE__ */ p(
      Dt.Content,
      {
        ref: i,
        className: h(
          // CUSTOM: Remove tw-z-50 and replace with shared Z_INDEX_MODAL constant
          "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
          t
        ),
        style: { zIndex: $l, ...o },
        ...a,
        dir: s,
        children: [
          e,
          /* @__PURE__ */ p(
            Dt.Close,
            {
              className: h(
                "tw-absolute tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground",
                { "tw-right-4": s === "ltr" },
                { "tw-left-4": s === "rtl" }
              ),
              children: [
                /* @__PURE__ */ r(hn, { className: "tw-h-4 tw-w-4" }),
                /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
});
da.displayName = Dt.Content.displayName;
function pa({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h(
        "tw-flex tw-flex-col tw-space-y-1.5 tw-text-center sm:tw-text-start",
        t
      ),
      ...e
    }
  );
}
pa.displayName = "DialogHeader";
function zl({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h(
        "tw-flex tw-flex-col-reverse sm:tw-flex-row sm:tw-justify-end sm:tw-space-x-2",
        t
      ),
      ...e
    }
  );
}
zl.displayName = "DialogFooter";
const ua = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
ua.displayName = Dt.Title.displayName;
const Fl = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Dt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Fl.displayName = Dt.Description.displayName;
const ue = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et,
  {
    ref: n,
    className: h(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
ue.displayName = Et.displayName;
const We = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", dir: o, children: [
    /* @__PURE__ */ r(Io, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
    /* @__PURE__ */ r(
      Et.Input,
      {
        ref: n,
        className: h(
          "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          t
        ),
        ...e
      }
    )
  ] });
});
We.displayName = Et.Input.displayName;
const me = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et.List,
  {
    ref: n,
    className: h("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
me.displayName = Et.List.displayName;
const gn = v.forwardRef((t, e) => /* @__PURE__ */ r(Et.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
gn.displayName = Et.Empty.displayName;
const Jt = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et.Group,
  {
    ref: n,
    className: h(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Jt.displayName = Et.Group.displayName;
const Or = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Or.displayName = Et.Separator.displayName;
const te = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Et.Item,
  {
    ref: n,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
te.displayName = Et.Item.displayName;
function ma({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
ma.displayName = "CommandShortcut";
const fa = (t, e, n, o, a) => {
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
}, Bl = (t, e, n, o, a) => {
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
function Le(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedName) ?? mt.bookIdToEnglishName(t);
}
function Ir(t, e) {
  var o;
  return ((o = e == null ? void 0 : e.get(t)) == null ? void 0 : o.localizedId) ?? t.toUpperCase();
}
const ha = mt.allBookIds.filter(
  (t) => !mt.isObsolete(mt.bookIdToNumber(t))
), Te = Object.fromEntries(
  ha.map((t) => [t, mt.bookIdToEnglishName(t)])
);
function Ar(t, e, n) {
  const o = e.trim().toLowerCase();
  if (!o) return !1;
  const a = mt.bookIdToEnglishName(t), i = n == null ? void 0 : n.get(t);
  return !!(vn(a.toLowerCase(), o) || vn(t.toLowerCase(), o) || (i ? vn(i.localizedName.toLowerCase(), o) || vn(i.localizedId.toLowerCase(), o) : !1));
}
const ga = fn(
  ({
    bookId: t,
    isSelected: e,
    onSelect: n,
    onMouseDown: o,
    section: a,
    className: i,
    showCheck: s = !1,
    localizedBookNames: l,
    commandValue: w
  }, c) => {
    const d = G(!1), m = () => {
      d.current || n == null || n(t), setTimeout(() => {
        d.current = !1;
      }, 100);
    }, f = (b) => {
      d.current = !0, o ? o(b) : n == null || n(t);
    }, u = z(
      () => Le(t, l),
      [t, l]
    ), g = z(
      () => Ir(t, l),
      [t, l]
    );
    return /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "tw-mx-1 tw-my-1 tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid",
          {
            "tw-border-s-red-200": a === Y.OT,
            "tw-border-s-purple-200": a === Y.NT,
            "tw-border-s-indigo-200": a === Y.DC,
            "tw-border-s-amber-200": a === Y.Extra
          }
        ),
        children: /* @__PURE__ */ p(
          te,
          {
            ref: c,
            value: w || `${t} ${mt.bookIdToEnglishName(t)}`,
            onSelect: m,
            onMouseDown: f,
            role: "option",
            "aria-selected": e,
            "aria-label": `${mt.bookIdToEnglishName(t)} (${t.toLocaleUpperCase()})`,
            className: i,
            children: [
              s && /* @__PURE__ */ r(
                Qt,
                {
                  className: h(
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
), ba = pe(
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
), F = v.forwardRef(
  ({ className: t, variant: e, size: n, asChild: o = !1, ...a }, i) => /* @__PURE__ */ r(o ? qe : "button", { className: h(ba({ variant: e, size: n, className: t })), ref: i, ...a })
);
F.displayName = "Button";
const fe = ze.Root, ve = ze.Trigger, Kl = ze.Anchor, ee = v.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, style: o, ...a }, i) => {
  const s = ft();
  return /* @__PURE__ */ r(ze.Portal, { children: /* @__PURE__ */ r(
    ze.Content,
    {
      ref: i,
      align: e,
      sideOffset: n,
      className: h(
        "pr-twp tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      style: { zIndex: Xe, ...o },
      ...a,
      dir: s
    }
  ) });
});
ee.displayName = ze.Content.displayName;
function fr(t, e, n) {
  return `${t} ${Te[t]}${e ? ` ${Ir(t, e)} ${Le(t, e)}` : ""}${n ? ` ${n}` : ""}`;
}
function Gl({
  recentSearches: t,
  onSearchItemSelect: e,
  renderItem: n = (d) => String(d),
  getItemKey: o = (d) => String(d),
  ariaLabel: a = "Show recent searches",
  groupHeading: i = "Recent",
  id: s,
  classNameForItems: l,
  buttonClassName: w = "tw-absolute tw-right-0 tw-top-0 tw-h-full tw-px-3 tw-py-2",
  buttonVariant: c = "ghost"
}) {
  const [d, m] = D(!1);
  if (t.length === 0)
    return;
  const f = (u) => {
    e(u), m(!1);
  };
  return /* @__PURE__ */ p(fe, { open: d, onOpenChange: m, children: [
    /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        variant: c,
        size: "icon",
        className: w,
        "aria-label": a,
        children: /* @__PURE__ */ r(Zr, { className: "tw-h-4 tw-w-4" })
      }
    ) }),
    /* @__PURE__ */ r(ee, { id: s, className: "tw-w-[300px] tw-p-0", align: "start", children: /* @__PURE__ */ r(ue, { children: /* @__PURE__ */ r(me, { children: /* @__PURE__ */ r(Jt, { heading: i, children: t.map((u) => /* @__PURE__ */ p(
      te,
      {
        onSelect: () => f(u),
        className: h("tw-flex tw-items-center", l),
        children: [
          /* @__PURE__ */ r(Zr, { className: "tw-mr-2 tw-h-4 tw-w-4 tw-opacity-50" }),
          /* @__PURE__ */ r("span", { children: n(u) })
        ]
      },
      o(u)
    )) }) }) }) })
  ] });
}
function au(t, e, n = (a, i) => a === i, o = 15) {
  return (a) => {
    const i = t.filter(
      (l) => !n(l, a)
    ), s = [a, ...i.slice(0, o - 1)];
    e(s);
  };
}
const Hn = {
  // Matches start of string (`^`), one or more non-colon/space words, optionally followed by space and more words (`([^:\s]+(?:\s+[^:\s]+)*)`), end of string (`$`), case-insensitive (`i`)
  BOOK_ONLY: /^([^:\s]+(?:\s+[^:\s]+)*)$/i,
  // Same as above, but followed by a space and a chapter number (`\s+(\d+)`)
  BOOK_CHAPTER: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+)$/i,
  // Same as above, but followed by a colon and optionally a verse number (`:(\d*)`)
  BOOK_CHAPTER_VERSE: /^([^:\s]+(?:\s+[^:\s]+)*)\s+(\d+):(\d*)$/i
}, Ul = [
  Hn.BOOK_ONLY,
  Hn.BOOK_CHAPTER,
  Hn.BOOK_CHAPTER_VERSE
];
function co(t) {
  const e = /^[a-zA-Z]$/.test(t), n = /^[0-9]$/.test(t);
  return { isLetter: e, isDigit: n };
}
function Xt(t) {
  return bs(mt.bookIdToNumber(t));
}
function ql(t, e, n) {
  if (!t.trim() || e.length === 0) return;
  const o = Ul.reduce(
    (a, i) => {
      if (a) return a;
      const s = i.exec(t.trim());
      if (s) {
        const [l, w = void 0, c = void 0] = s.slice(1);
        let d;
        const m = e.filter((f) => Ar(f, l, n));
        if (m.length === 1 && ([d] = m), !d && w) {
          if (mt.isBookIdValid(l)) {
            const f = l.toUpperCase();
            e.includes(f) && (d = f);
          }
          if (!d && n) {
            const f = Array.from(n.entries()).find(
              ([, u]) => u.localizedId.toLowerCase() === l.toLowerCase()
            );
            f && e.includes(f[0]) && ([d] = f);
          }
        }
        if (!d && w) {
          const u = ((g) => Object.keys(Te).find(
            (b) => Te[b].toLowerCase() === g.toLowerCase()
          ))(l);
          if (u && e.includes(u) && (d = u), !d && n) {
            const g = Array.from(n.entries()).find(
              ([, b]) => b.localizedName.toLowerCase() === l.toLowerCase()
            );
            g && e.includes(g[0]) && ([d] = g);
          }
        }
        if (d) {
          let f = w ? parseInt(w, 10) : void 0;
          f && f > Xt(d) && (f = Math.max(Xt(d), 1));
          const u = c ? parseInt(c, 10) : void 0;
          return {
            book: d,
            chapterNum: f,
            verseNum: u
          };
        }
      }
    },
    void 0
  );
  if (o) return o;
}
function Hl(t, e, n, o) {
  const a = B(() => {
    if (t.chapterNum > 1)
      o({
        book: t.book,
        chapterNum: t.chapterNum - 1,
        verseNum: 1
      });
    else {
      const w = e.indexOf(t.book);
      if (w > 0) {
        const c = e[w - 1], d = Math.max(Xt(c), 1);
        o({
          book: c,
          chapterNum: d,
          verseNum: 1
        });
      }
    }
  }, [t, e, o]), i = B(() => {
    const w = Xt(t.book);
    if (t.chapterNum < w)
      o({
        book: t.book,
        chapterNum: t.chapterNum + 1,
        verseNum: 1
      });
    else {
      const c = e.indexOf(t.book);
      if (c < e.length - 1) {
        const d = e[c + 1];
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
      icon: n === "ltr" ? Qr : to
    },
    {
      onClick: s,
      disabled: e.length === 0 || t.verseNum === 0,
      title: "Previous verse",
      icon: n === "ltr" ? ir : je
    },
    {
      onClick: l,
      disabled: e.length === 0,
      title: "Next verse",
      icon: n === "ltr" ? je : ir
    },
    {
      onClick: i,
      disabled: e.length === 0 || (t.chapterNum === Xt(t.book) || Xt(t.book) <= 0) && e.indexOf(t.book) === e.length - 1,
      title: "Next chapter",
      icon: n === "ltr" ? to : Qr
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
function wo({
  bookId: t,
  scrRef: e,
  onChapterSelect: n,
  setChapterRef: o,
  isChapterDimmed: a,
  className: i
}) {
  if (t)
    return /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r("div", { className: h("tw-grid tw-grid-cols-6 tw-gap-1", i), children: Array.from({ length: Xt(t) }, (s, l) => l + 1).map((s) => /* @__PURE__ */ r(
      te,
      {
        value: `${t} ${Te[t] || ""} ${s}`,
        onSelect: () => n(s),
        ref: o(s),
        className: h(
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
function iu({
  scrRef: t,
  handleSubmit: e,
  className: n,
  getActiveBookIds: o,
  localizedBookNames: a,
  localizedStrings: i,
  recentSearches: s,
  onAddRecentSearch: l,
  id: w
}) {
  const c = ft(), [d, m] = D(!1), [f, u] = D(""), [g, b] = D(""), [x, C] = D("books"), [y, k] = D(void 0), [N, V] = D(!1), $ = G(void 0), A = G(void 0), R = G(void 0), _ = G(void 0), S = G({}), L = B(
    (M) => {
      e(M), l && l(M);
    },
    [e, l]
  ), j = z(() => o ? o() : ha, [o]), P = z(() => ({
    [Y.OT]: j.filter((X) => mt.isBookOT(X)),
    [Y.NT]: j.filter((X) => mt.isBookNT(X)),
    [Y.DC]: j.filter((X) => mt.isBookDC(X)),
    [Y.Extra]: j.filter((X) => mt.extraBooks().includes(X))
  }), [j]), I = z(() => Object.values(P).flat(), [P]), q = z(() => {
    if (!g.trim()) return P;
    const M = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return [Y.OT, Y.NT, Y.DC, Y.Extra].forEach((Q) => {
      M[Q] = P[Q].filter((tt) => Ar(tt, g, a));
    }), M;
  }, [P, g, a]), T = z(
    () => ql(g, I, a),
    [g, I, a]
  ), W = B(() => {
    T && (L({
      book: T.book,
      chapterNum: T.chapterNum ?? 1,
      verseNum: T.verseNum ?? 1
    }), m(!1), b(""), u(""));
  }, [L, T]), Rt = B(
    (M) => {
      if (Xt(M) <= 1) {
        L({
          book: M,
          chapterNum: 1,
          verseNum: 1
        }), m(!1), b("");
        return;
      }
      k(M), C("chapters");
    },
    [L]
  ), zt = B(
    (M) => {
      const X = x === "chapters" ? y : T == null ? void 0 : T.book;
      X && (L({
        book: X,
        chapterNum: M,
        verseNum: 1
      }), m(!1), C("books"), k(void 0), b(""));
    },
    [L, x, y, T]
  ), Ft = B(
    (M) => {
      L(M), m(!1), b("");
    },
    [L]
  ), bt = Hl(t, I, c, e), ht = B(() => {
    C("books"), k(void 0), setTimeout(() => {
      A.current && A.current.focus();
    }, 0);
  }, []), K = B(
    (M) => {
      if (!M && x === "chapters") {
        ht();
        return;
      }
      m(M), M && (C("books"), k(void 0), b(""));
    },
    [x, ht]
  ), { otLong: lt, ntLong: vt, dcLong: pt, extraLong: _t } = {
    otLong: i == null ? void 0 : i["%scripture_section_ot_long%"],
    ntLong: i == null ? void 0 : i["%scripture_section_nt_long%"],
    dcLong: i == null ? void 0 : i["%scripture_section_dc_long%"],
    extraLong: i == null ? void 0 : i["%scripture_section_extra_long%"]
  }, re = B(
    (M) => fa(M, lt, vt, pt, _t),
    [lt, vt, pt, _t]
  ), xt = B(
    (M) => T ? !!T.chapterNum && !M.toString().includes(T.chapterNum.toString()) : !1,
    [T]
  ), It = z(
    () => Ee(
      t,
      a ? Le(t.book, a) : "English"
    ),
    [t, a]
  ), xe = B((M) => (X) => {
    S.current[M] = X;
  }, []), Ut = B((M) => {
    (M.key === "Home" || M.key === "End") && M.stopPropagation();
  }, []), oe = B(
    (M) => {
      if (M.ctrlKey) return;
      const { isLetter: X, isDigit: Q } = co(M.key);
      if (x === "chapters") {
        if (M.key === "Backspace") {
          M.preventDefault(), M.stopPropagation(), ht();
          return;
        }
        if (X || Q) {
          if (M.preventDefault(), M.stopPropagation(), C("books"), k(void 0), Q && y) {
            const tt = Te[y];
            b(`${tt} ${M.key}`);
          } else
            b(M.key);
          setTimeout(() => {
            A.current && A.current.focus();
          }, 0);
          return;
        }
      }
      if ((x === "chapters" || x === "books" && T) && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(M.key)) {
        const tt = x === "chapters" ? y : T == null ? void 0 : T.book;
        if (!tt) return;
        const ut = (() => {
          if (!f) return 1;
          const it = f.match(/(\d+)$/);
          return it ? parseInt(it[1], 10) : 0;
        })(), At = Xt(tt);
        if (!At) return;
        let O = ut;
        const H = 6;
        switch (M.key) {
          case "ArrowLeft":
            ut !== 0 && (O = ut > 1 ? ut - 1 : At);
            break;
          case "ArrowRight":
            ut !== 0 && (O = ut < At ? ut + 1 : 1);
            break;
          case "ArrowUp":
            O = ut === 0 ? At : Math.max(1, ut - H);
            break;
          case "ArrowDown":
            O = ut === 0 ? 1 : Math.min(At, ut + H);
            break;
          default:
            return;
        }
        O !== ut && (M.preventDefault(), M.stopPropagation(), u(fr(tt, a, O)), setTimeout(() => {
          const it = S.current[O];
          it && it.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 0));
      }
    },
    [
      x,
      T,
      ht,
      y,
      f,
      a
    ]
  ), tn = B((M) => {
    if (M.shiftKey || M.key === "Tab" || M.key === " ") return;
    const { isLetter: X, isDigit: Q } = co(M.key);
    (X || Q) && (M.preventDefault(), b((tt) => tt + M.key), A.current.focus(), V(!1));
  }, []);
  return $t(() => {
    const M = setTimeout(() => {
      if (d && x === "books" && R.current && _.current) {
        const X = R.current, Q = _.current, tt = Q.offsetTop, ut = X.clientHeight, At = Q.clientHeight, O = tt - ut / 2 + At / 2;
        X.scrollTo({
          top: Math.max(0, O),
          behavior: "smooth"
        }), u(fr(t.book));
      }
    }, 0);
    return () => {
      clearTimeout(M);
    };
  }, [d, x, g, T, t.book]), $t(() => {
    if (x === "chapters" && y) {
      const M = y === t.book;
      setTimeout(() => {
        if (R.current)
          if (M) {
            const X = S.current[t.chapterNum];
            X && X.scrollIntoView({ block: "center", behavior: "smooth" });
          } else
            R.current.scrollTo({ top: 0 });
        $.current && $.current.focus();
      }, 0);
    }
  }, [x, y, T, t.book, t.chapterNum]), /* @__PURE__ */ p(fe, { open: d, onOpenChange: K, children: [
    /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ r(
      F,
      {
        "aria-label": "book-chapter-trigger",
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: h(
          "tw-h-8 tw-w-full tw-min-w-16 tw-max-w-48 tw-overflow-hidden tw-px-1",
          n
        ),
        children: /* @__PURE__ */ r("span", { className: "tw-truncate", children: It })
      }
    ) }),
    /* @__PURE__ */ r(ee, { id: w, forceMount: !0, className: "tw-w-[280px] tw-p-0", align: "center", children: /* @__PURE__ */ p(
      ue,
      {
        ref: $,
        onKeyDown: oe,
        loop: !0,
        value: f,
        onValueChange: u,
        shouldFilter: !1,
        children: [
          x === "books" ? /* @__PURE__ */ p("div", { className: "tw-flex tw-items-end", children: [
            /* @__PURE__ */ p("div", { className: "tw-relative tw-flex-1", children: [
              /* @__PURE__ */ r(
                We,
                {
                  ref: A,
                  value: g,
                  onValueChange: b,
                  onKeyDown: Ut,
                  onFocus: () => V(!1),
                  className: s && s.length > 0 ? "!tw-pr-10" : ""
                }
              ),
              s && s.length > 0 && /* @__PURE__ */ r(
                Gl,
                {
                  recentSearches: s,
                  onSearchItemSelect: Ft,
                  renderItem: (M) => Ee(M, "English"),
                  getItemKey: (M) => `${M.book}-${M.chapterNum}-${M.verseNum}`,
                  ariaLabel: i == null ? void 0 : i["%history_recentSearches_ariaLabel%"],
                  groupHeading: i == null ? void 0 : i["%history_recent%"]
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-1 tw-border-b tw-pe-2", children: bt.map(({ onClick: M, disabled: X, title: Q, icon: tt }) => /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => {
                  V(!0), M();
                },
                disabled: X,
                className: "tw-h-10 tw-w-4 tw-p-0",
                title: Q,
                onKeyDown: tn,
                children: /* @__PURE__ */ r(tt, {})
              },
              Q
            )) })
          ] }) : /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3 tw-py-2", children: [
            /* @__PURE__ */ r(
              F,
              {
                variant: "ghost",
                size: "sm",
                onClick: ht,
                className: "tw-mr-2 tw-h-6 tw-w-6 tw-p-0",
                tabIndex: -1,
                children: c === "ltr" ? /* @__PURE__ */ r(Pi, { className: "tw-h-4 tw-w-4" }) : /* @__PURE__ */ r($i, { className: "tw-h-4 tw-w-4" })
              }
            ),
            y && /* @__PURE__ */ r("span", { tabIndex: -1, className: "tw-text-sm tw-font-medium", children: Le(y, a) })
          ] }),
          !N && /* @__PURE__ */ p(me, { ref: R, children: [
            x === "books" && /* @__PURE__ */ p(st, { children: [
              !T && Object.entries(q).map(([M, X]) => {
                if (X.length !== 0)
                  return (
                    // We are mapping over filteredBooksByType, which uses Section as key type
                    // eslint-disable-next-line no-type-assertion/no-type-assertion
                    /* @__PURE__ */ r(Jt, { heading: re(M), children: X.map((Q) => /* @__PURE__ */ r(
                      ga,
                      {
                        bookId: Q,
                        onSelect: (tt) => Rt(tt),
                        section: sn(Q),
                        commandValue: `${Q} ${Te[Q]}`,
                        ref: Q === t.book ? _ : void 0,
                        localizedBookNames: a
                      },
                      Q
                    )) }, M)
                  );
              }),
              T && /* @__PURE__ */ r(Jt, { children: /* @__PURE__ */ r(
                te,
                {
                  value: `${T.book} ${Te[T.book]} ${T.chapterNum || ""}:${T.verseNum || ""})}`,
                  onSelect: W,
                  className: "tw-font-semibold tw-text-primary",
                  children: Ee(
                    {
                      book: T.book,
                      chapterNum: T.chapterNum ?? 1,
                      verseNum: T.verseNum ?? 1
                    },
                    a ? Ir(T.book, a) : void 0
                  )
                },
                "top-match"
              ) }),
              T && Xt(T.book) > 1 && /* @__PURE__ */ p(st, { children: [
                /* @__PURE__ */ r("div", { className: "tw-mb-2 tw-px-3 tw-text-sm tw-font-medium tw-text-muted-foreground", children: Le(T.book, a) }),
                /* @__PURE__ */ r(
                  wo,
                  {
                    bookId: T.book,
                    scrRef: t,
                    onChapterSelect: zt,
                    setChapterRef: xe,
                    isChapterDimmed: xt,
                    className: "tw-px-4 tw-pb-4"
                  }
                )
              ] })
            ] }),
            x === "chapters" && y && /* @__PURE__ */ r(
              wo,
              {
                bookId: y,
                scrRef: t,
                onChapterSelect: zt,
                setChapterRef: xe,
                className: "tw-p-4"
              }
            )
          ] })
        ]
      }
    ) })
  ] });
}
const su = Object.freeze([
  "%scripture_section_ot_long%",
  "%scripture_section_nt_long%",
  "%scripture_section_dc_long%",
  "%scripture_section_extra_long%",
  "%history_recent%",
  "%history_recentSearches_ariaLabel%"
]), Yl = pe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), gt = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(Bo.Root, { ref: n, className: h("pr-twp", Yl(), t), ...e }));
gt.displayName = Bo.Root.displayName;
const Pr = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    dn.Root,
    {
      className: h("pr-twp tw-grid tw-gap-2", t),
      ...e,
      ref: n,
      dir: o
    }
  );
});
Pr.displayName = dn.Root.displayName;
const Sn = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dn.Item,
  {
    ref: n,
    className: h(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(dn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ r(Vn, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Sn.displayName = dn.Item.displayName;
function Xl(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function hr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: o,
  popoverContentClassName: a,
  popoverContentStyle: i,
  value: s,
  onChange: l = () => {
  },
  getOptionLabel: w = Xl,
  getButtonLabel: c,
  icon: d = void 0,
  buttonPlaceholder: m = "",
  textPlaceholder: f = "",
  commandEmptyMessage: u = "No option found",
  buttonVariant: g = "outline",
  alignDropDown: b = "start",
  isDisabled: x = !1,
  ariaLabel: C,
  ...y
}) {
  const [k, N] = D(!1), V = c ?? w, $ = (R) => R.length > 0 && typeof R[0] == "object" && "options" in R[0], A = (R, _) => {
    const S = w(R), L = typeof R == "object" && "secondaryLabel" in R ? R.secondaryLabel : void 0, j = `${_ ?? ""}${S}${L ?? ""}`;
    return /* @__PURE__ */ p(
      te,
      {
        value: S,
        onSelect: () => {
          l(R), N(!1);
        },
        className: "tw-flex tw-items-center",
        children: [
          /* @__PURE__ */ r(
            Qt,
            {
              className: h("tw-me-2 tw-h-4 tw-w-4 tw-shrink-0", {
                "tw-opacity-0": !s || w(s) !== S
              })
            }
          ),
          /* @__PURE__ */ p("span", { className: "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: [
            S,
            L && /* @__PURE__ */ p("span", { className: "tw-text-muted-foreground", children: [
              " · ",
              L
            ] })
          ] })
        ]
      },
      j
    );
  };
  return /* @__PURE__ */ p(fe, { open: k, onOpenChange: N, ...y, children: [
    /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: g,
        role: "combobox",
        "aria-expanded": k,
        "aria-label": C,
        id: t,
        className: h(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          o ?? n
        ),
        disabled: x,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            d && /* @__PURE__ */ r("div", { className: "tw-shrink-0 tw-pe-2", children: d }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start"
                ),
                children: s ? V(s) : m
              }
            )
          ] }),
          /* @__PURE__ */ r(Ue, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(
      ee,
      {
        align: b,
        className: h("tw-w-[200px] tw-p-0", a),
        style: i,
        children: /* @__PURE__ */ p(ue, { children: [
          /* @__PURE__ */ r(We, { placeholder: f, className: "tw-text-inherit" }),
          /* @__PURE__ */ r(gn, { children: u }),
          /* @__PURE__ */ r(me, { children: $(e) ? e.map((R) => /* @__PURE__ */ r(Jt, { heading: R.groupHeading, children: R.options.map((_) => A(_, R.groupHeading)) }, R.groupHeading)) : e.map((R) => A(R)) })
        ] })
      }
    )
  ] });
}
function Wl({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: o,
  isDisabled: a = !1,
  chapterCount: i
}) {
  const s = z(
    () => Array.from({ length: i }, (c, d) => d + 1),
    [i]
  );
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ r(gt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ r(
      hr,
      {
        isDisabled: a,
        onChange: (c) => {
          n(c), c > e && o(c);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ r(gt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ r(
      hr,
      {
        isDisabled: a,
        onChange: (c) => {
          o(c), c < t && n(c);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: s,
        getOptionLabel: (c) => c.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var gr = /* @__PURE__ */ ((t) => (t.CurrentBook = "current book", t.ChooseBooks = "choose books", t))(gr || {});
((t) => {
  t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books";
})(gr || (gr = {}));
const lu = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Yn = (t, e) => t[e] ?? e;
function cu({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: o,
  chapterCount: a,
  endChapter: i,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: w,
  localizedStrings: c
}) {
  const d = Yn(c, "%webView_bookSelector_currentBook%"), m = Yn(c, "%webView_bookSelector_choose%"), f = Yn(c, "%webView_bookSelector_chooseBooks%"), [u, g] = D(
    "current book"
    /* CurrentBook */
  ), b = (x) => {
    g(x), t(x);
  };
  return /* @__PURE__ */ r(
    Pr,
    {
      className: "pr-twp tw-flex",
      value: u,
      onValueChange: (x) => b(x),
      children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Sn, {
              value: "current book"
              /* CurrentBook */
            }),
            /* @__PURE__ */ r(gt, { className: "tw-ms-1", children: d })
          ] }),
          /* @__PURE__ */ r(gt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ r(
            Wl,
            {
              isDisabled: u === "choose books",
              handleSelectStartChapter: w,
              handleSelectEndChapter: s,
              chapterCount: a,
              startChapter: l,
              endChapter: i
            }
          ) })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Sn, {
              value: "choose books"
              /* ChooseBooks */
            }),
            /* @__PURE__ */ r(gt, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ r(gt, { className: "tw-flex tw-items-center", children: o.map((x) => mt.bookIdToEnglishName(x)).join(", ") }),
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
const va = Ln(null);
function Jl(t, e) {
  return { getTheme: function() {
    return e ?? null;
  } };
}
function ne() {
  const t = Tr(va);
  return t == null && function(e, ...n) {
    const o = new URL("https://lexical.dev/docs/error"), a = new URLSearchParams();
    a.append("code", e);
    for (const i of n) a.append("v", i);
    throw o.search = a.toString(), Error(`Minified Lexical error #${e}; visit ${o.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
  }(8), t;
}
const xa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, Zl = xa ? $t : U, yn = { tag: Rr };
function Ql({ initialConfig: t, children: e }) {
  const n = z(() => {
    const { theme: o, namespace: a, nodes: i, onError: s, editorState: l, html: w } = t, c = Jl(null, o), d = Ko({ editable: t.editable, html: w, namespace: a, nodes: i, onError: (m) => s(m, d), theme: o });
    return function(m, f) {
      if (f !== null) {
        if (f === void 0) m.update(() => {
          const u = ce();
          if (u.isEmpty()) {
            const g = He();
            u.append(g);
            const b = xa ? document.activeElement : null;
            (Ct() !== null || b !== null && b === m.getRootElement()) && g.select();
          }
        }, yn);
        else if (f !== null) switch (typeof f) {
          case "string": {
            const u = m.parseEditorState(f);
            m.setEditorState(u, yn);
            break;
          }
          case "object":
            m.setEditorState(f, yn);
            break;
          case "function":
            m.update(() => {
              ce().isEmpty() && f(m);
            }, yn);
        }
      }
    }(d, l), [d, c];
  }, []);
  return Zl(() => {
    const o = t.editable, [a] = n;
    a.setEditable(o === void 0 || o);
  }, []), r(va.Provider, { value: n, children: e });
}
const tc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : U;
function ec({ ignoreHistoryMergeTagChange: t = !0, ignoreSelectionChange: e = !1, onChange: n }) {
  const [o] = ne();
  return tc(() => {
    if (n) return o.registerUpdateListener(({ editorState: a, dirtyElements: i, dirtyLeaves: s, prevEditorState: l, tags: w }) => {
      e && i.size === 0 && s.size === 0 || t && w.has(Rr) || l.isEmpty() || n(a, o, w);
    });
  }, [o, t, e, n]), null;
}
const $r = {
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
}, Mt = Se.Provider, Lt = Se.Root, Vt = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  Se.Trigger,
  {
    ref: o,
    className: e ? h(ba({ variant: e }), t) : t,
    ...n
  }
));
Vt.displayName = Se.Trigger.displayName;
const Ot = v.forwardRef(({ className: t, sideOffset: e = 4, style: n, ...o }, a) => /* @__PURE__ */ r(Se.Portal, { children: /* @__PURE__ */ r(
  Se.Content,
  {
    ref: a,
    sideOffset: e,
    style: { zIndex: Xe, ...n },
    className: h(
      "pr-twp tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...o
  }
) }));
Ot.displayName = Se.Content.displayName;
const Lr = [
  gl,
  Go,
  Uo,
  bl
], nc = Ln(null), Xn = {
  didCatch: !1,
  error: null
};
class rc extends Ii {
  constructor(e) {
    super(e), this.resetErrorBoundary = this.resetErrorBoundary.bind(this), this.state = Xn;
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
      }), this.setState(Xn);
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
    if (o && n.error !== null && oc(e.resetKeys, a)) {
      var i, s;
      (i = (s = this.props).onReset) === null || i === void 0 || i.call(s, {
        next: a,
        prev: e.resetKeys,
        reason: "keys"
      }), this.setState(Xn);
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
      const w = {
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      };
      if (typeof n == "function")
        l = n(w);
      else if (o)
        l = Jr(o, w);
      else if (a !== void 0)
        l = a;
      else
        throw s;
    }
    return Jr(nc.Provider, {
      value: {
        didCatch: i,
        error: s,
        resetErrorBoundary: this.resetErrorBoundary
      }
    }, l);
  }
}
function oc() {
  let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  return t.length !== e.length || t.some((n, o) => !Object.is(n, e[o]));
}
function ac({ children: t, onError: e }) {
  return r(rc, { fallback: r("div", { style: { border: "1px solid #f00", color: "#f00", padding: "8px" }, children: "An error was thrown." }), onError: e, children: t });
}
const ic = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : U;
function sc(t) {
  return { initialValueFn: () => t.isEditable(), subscribe: (e) => t.registerEditableListener(e) };
}
function lc() {
  return function(t) {
    const [e] = ne(), n = z(() => t(e), [e, t]), [o, a] = D(() => n.initialValueFn()), i = G(o);
    return ic(() => {
      const { initialValueFn: s, subscribe: l } = n, w = s();
      return i.current !== w && (i.current = w, a(w)), l((c) => {
        i.current = c, a(c);
      });
    }, [n, t]), o;
  }(sc);
}
function cc(t, e) {
  const n = t.getRootElement();
  if (n === null) return [];
  const o = n.getBoundingClientRect(), a = getComputedStyle(n), i = parseFloat(a.paddingLeft) + parseFloat(a.paddingRight), s = Array.from(e.getClientRects());
  let l, w = s.length;
  s.sort((c, d) => {
    const m = c.top - d.top;
    return Math.abs(m) <= 3 ? c.left - d.left : m;
  });
  for (let c = 0; c < w; c++) {
    const d = s[c], m = l && l.top <= d.top && l.top + l.height > d.top && l.left + l.width > d.left, f = d.width + i === o.width;
    m || f ? (s.splice(c--, 1), w--) : l = d;
  }
  return s;
}
function wc(t, e, n = "self") {
  const o = t.getStartEndPoints();
  if (e.isSelected(t) && !Es(e) && o !== null) {
    const [a, i] = o, s = t.isBackward(), l = a.getNode(), w = i.getNode(), c = e.is(l), d = e.is(w);
    if (c || d) {
      const [m, f] = Ts(t), u = l.is(w), g = e.is(s ? w : l), b = e.is(s ? l : w);
      let x, C = 0;
      u ? (C = m > f ? f : m, x = m > f ? m : f) : g ? (C = s ? f : m, x = void 0) : b && (C = 0, x = s ? m : f);
      const y = e.__text.slice(C, x);
      y !== e.__text && (n === "clone" && (e = Rs(e)), e.__text = y);
    }
  }
  return e;
}
function Dn(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const ya = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0, dc = ya && "documentMode" in document ? document.documentMode : null;
!(!ya || !("InputEvent" in window) || dc) && "getTargetRanges" in new window.InputEvent("input");
function Yt(t) {
  return `${t}px`;
}
const pc = { attributes: !0, characterData: !0, childList: !0, subtree: !0 };
function uc(t, e, n) {
  let o = null, a = null, i = null, s = [];
  const l = document.createElement("div");
  function w() {
    o === null && Dn(182), a === null && Dn(183);
    const { left: m, top: f } = a.getBoundingClientRect(), u = cc(t, e);
    var g, b;
    l.isConnected || (b = l, (g = a).insertBefore(b, g.firstChild));
    let x = !1;
    for (let C = 0; C < u.length; C++) {
      const y = u[C], k = s[C] || document.createElement("div"), N = k.style;
      N.position !== "absolute" && (N.position = "absolute", x = !0);
      const V = Yt(y.left - m);
      N.left !== V && (N.left = V, x = !0);
      const $ = Yt(y.top - f);
      N.top !== $ && (k.style.top = $, x = !0);
      const A = Yt(y.width);
      N.width !== A && (k.style.width = A, x = !0);
      const R = Yt(y.height);
      N.height !== R && (k.style.height = R, x = !0), k.parentNode !== l && (l.append(k), x = !0), s[C] = k;
    }
    for (; s.length > u.length; ) s.pop();
    x && n(s);
  }
  function c() {
    a = null, o = null, i !== null && i.disconnect(), i = null, l.remove();
    for (const m of s) m.remove();
    s = [];
  }
  l.style.position = "relative";
  const d = t.registerRootListener(function m() {
    const f = t.getRootElement();
    if (f === null) return c();
    const u = f.parentElement;
    if (!Yo(u)) return c();
    c(), o = f, a = u, i = new MutationObserver((g) => {
      const b = t.getRootElement(), x = b && b.parentElement;
      if (b !== o || x !== a) return m();
      for (const C of g) if (!l.contains(C.target)) return w();
    }), i.observe(u, pc), w();
  });
  return () => {
    d(), c();
  };
}
function po(t, e, n) {
  if (t.type !== "text" && ie(e)) {
    const o = e.getDOMSlot(n);
    return [o.element, o.getFirstChildOffset() + t.offset];
  }
  return [js(n) || n, t.offset];
}
function mc(t) {
  for (const e of t) {
    const n = e.style;
    n.background !== "Highlight" && (n.background = "Highlight"), n.color !== "HighlightText" && (n.color = "HighlightText"), n.marginTop !== Yt(-1.5) && (n.marginTop = Yt(-1.5)), n.paddingTop !== Yt(4) && (n.paddingTop = Yt(4)), n.paddingBottom !== Yt(0) && (n.paddingBottom = Yt(0));
  }
}
function fc(t, e = mc) {
  let n = null, o = null, a = null, i = null, s = null, l = null, w = () => {
  };
  function c(d) {
    d.read(() => {
      const m = Ct();
      if (!Wt(m)) return n = null, a = null, i = null, l = null, w(), void (w = () => {
      });
      const [f, u] = function(R) {
        const _ = R.getStartEndPoints();
        return R.isBackward() ? [_[1], _[0]] : _;
      }(m), g = f.getNode(), b = g.getKey(), x = f.offset, C = u.getNode(), y = C.getKey(), k = u.offset, N = t.getElementByKey(b), V = t.getElementByKey(y), $ = n === null || N !== o || x !== a || b !== n.getKey(), A = i === null || V !== s || k !== l || y !== i.getKey();
      if (($ || A) && N !== null && V !== null) {
        const R = function(_, S, L, j, P, I, q) {
          const T = (_._window ? _._window.document : document).createRange();
          return T.setStart(...po(S, L, j)), T.setEnd(...po(P, I, q)), T;
        }(t, f, g, N, u, C, V);
        w(), w = uc(t, R, e);
      }
      n = g, o = N, a = x, i = C, s = V, l = k;
    });
  }
  return c(t.getEditorState()), we(t.registerUpdateListener(({ editorState: d }) => c(d)), () => {
    w();
  });
}
function hc(t, e) {
  let n = null;
  const o = () => {
    const a = getSelection(), i = a && a.anchorNode, s = t.getRootElement();
    i !== null && s !== null && s.contains(i) ? n !== null && (n(), n = null) : n === null && (n = fc(t, e));
  };
  return t.registerRootListener((a) => {
    if (a) {
      const i = a.ownerDocument;
      return i.addEventListener("selectionchange", o), o(), () => {
        n !== null && n(), i.removeEventListener("selectionchange", o);
      };
    }
  });
}
function gc(t) {
  const e = Ho(t, (n) => ie(n) && !n.isInline());
  return ie(e) || Dn(4, t.__key), e;
}
function bc(t) {
  const e = Ct() || Ss();
  let n;
  if (Wt(e)) n = Ds(e.focus, "next");
  else {
    if (e != null) {
      const s = e.getNodes(), l = s[s.length - 1];
      l && (n = qo(l, "next"));
    }
    n = n || Ms(ce(), "previous").getFlipped().insert(He());
  }
  const o = vc(t, n), a = Os(o), i = Is(a) ? As(a) : o;
  return Ps($s(i)), t.getLatest();
}
function vc(t, e, n) {
  let o = ro(e, "next");
  for (let a = o; a; a = Ls(a, n)) o = a;
  return Vs(o) && Dn(283), o.insert(t.isInline() ? He().append(t) : t), ro(qo(t.getLatest(), "next"), e.direction);
}
function xc(t) {
  const e = Ct();
  if (!Wt(e)) return !1;
  const n = /* @__PURE__ */ new Set(), o = e.getNodes();
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = i.getKey();
    if (n.has(s)) continue;
    const l = Ho(i, (c) => ie(c) && !c.isInline());
    if (l === null) continue;
    const w = l.getKey();
    l.canIndent() && !n.has(w) && (n.add(w), t(l));
  }
  return n.size > 0;
}
const yc = Symbol.for("preact-signals");
function zn() {
  if (se > 1) return void se--;
  let t, e = !1;
  for (!function() {
    let n = Mn;
    for (Mn = void 0; n !== void 0; ) n.S.v === n.v && (n.S.i = n.i), n = n.o;
  }(); cn !== void 0; ) {
    let n = cn;
    for (cn = void 0, On++; n !== void 0; ) {
      const o = n.u;
      if (n.u = void 0, n.f &= -3, !(8 & n.f) && Na(n)) try {
        n.c();
      } catch (a) {
        e || (t = a, e = !0);
      }
      n = o;
    }
  }
  if (On = 0, se--, e) throw t;
}
function Nc(t) {
  if (se > 0) return t();
  br = ++kc, se++;
  try {
    return t();
  } finally {
    zn();
  }
}
let J, cn;
function uo(t) {
  const e = J;
  J = void 0;
  try {
    return t();
  } finally {
    J = e;
  }
}
let Mn, se = 0, On = 0, kc = 0, br = 0, Cn = 0;
function mo(t) {
  if (J === void 0) return;
  let e = t.n;
  return e === void 0 || e.t !== J ? (e = { i: 0, S: t, p: J.s, n: void 0, t: J, e: void 0, x: void 0, r: e }, J.s !== void 0 && (J.s.n = e), J.s = e, t.n = e, 32 & J.f && t.S(e), e) : e.i === -1 ? (e.i = 0, e.n !== void 0 && (e.n.p = e.p, e.p !== void 0 && (e.p.n = e.n), e.p = J.s, e.n = void 0, J.s.n = e, J.s = e), e) : void 0;
}
function kt(t, e) {
  this.v = t, this.i = 0, this.n = void 0, this.t = void 0, this.l = 0, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function pn(t, e) {
  return new kt(t, e);
}
function Na(t) {
  for (let e = t.s; e !== void 0; e = e.n) if (e.S.i !== e.i || !e.S.h() || e.S.i !== e.i) return !0;
  return !1;
}
function fo(t) {
  for (let e = t.s; e !== void 0; e = e.n) {
    const n = e.S.n;
    if (n !== void 0 && (e.r = n), e.S.n = e, e.i = -1, e.n === void 0) {
      t.s = e;
      break;
    }
  }
}
function ka(t) {
  let e, n = t.s;
  for (; n !== void 0; ) {
    const o = n.p;
    n.i === -1 ? (n.S.U(n), o !== void 0 && (o.n = n.n), n.n !== void 0 && (n.n.p = o)) : e = n, n.S.n = n.r, n.r !== void 0 && (n.r = void 0), n = o;
  }
  t.s = e;
}
function ke(t, e) {
  kt.call(this, void 0), this.x = t, this.s = void 0, this.g = Cn - 1, this.f = 4, this.W = e == null ? void 0 : e.watched, this.Z = e == null ? void 0 : e.unwatched, this.name = e == null ? void 0 : e.name;
}
function _c(t, e) {
  return new ke(t, e);
}
function _a(t) {
  const e = t.m;
  if (t.m = void 0, typeof e == "function") {
    se++;
    const n = J;
    J = void 0;
    try {
      e();
    } catch (o) {
      throw t.f &= -2, t.f |= 8, Vr(t), o;
    } finally {
      J = n, zn();
    }
  }
}
function Vr(t) {
  for (let e = t.s; e !== void 0; e = e.n) e.S.U(e);
  t.x = void 0, t.s = void 0, _a(t);
}
function Cc(t) {
  if (J !== this) throw new Error("Out-of-order effect");
  ka(this), J = t, this.f &= -2, 8 & this.f && Vr(this), zn();
}
function $e(t, e) {
  this.x = t, this.m = void 0, this.s = void 0, this.u = void 0, this.f = 32, this.name = e == null ? void 0 : e.name;
}
function Zt(t, e) {
  const n = new $e(t, e);
  try {
    n.c();
  } catch (a) {
    throw n.d(), a;
  }
  const o = n.d.bind(n);
  return o[Symbol.dispose] = o, o;
}
function Je(t, e = {}) {
  const n = {};
  for (const o in t) {
    const a = e[o], i = pn(a === void 0 ? t[o] : a);
    n[o] = i;
  }
  return n;
}
kt.prototype.brand = yc, kt.prototype.h = function() {
  return !0;
}, kt.prototype.S = function(t) {
  const e = this.t;
  e !== t && t.e === void 0 && (t.x = e, this.t = t, e !== void 0 ? e.e = t : uo(() => {
    var n;
    (n = this.W) == null || n.call(this);
  }));
}, kt.prototype.U = function(t) {
  if (this.t !== void 0) {
    const e = t.e, n = t.x;
    e !== void 0 && (e.x = n, t.e = void 0), n !== void 0 && (n.e = e, t.x = void 0), t === this.t && (this.t = n, n === void 0 && uo(() => {
      var o;
      (o = this.Z) == null || o.call(this);
    }));
  }
}, kt.prototype.subscribe = function(t) {
  return Zt(() => {
    const e = this.value, n = J;
    J = void 0;
    try {
      t(e);
    } finally {
      J = n;
    }
  }, { name: "sub" });
}, kt.prototype.valueOf = function() {
  return this.value;
}, kt.prototype.toString = function() {
  return this.value + "";
}, kt.prototype.toJSON = function() {
  return this.value;
}, kt.prototype.peek = function() {
  const t = J;
  J = void 0;
  try {
    return this.value;
  } finally {
    J = t;
  }
}, Object.defineProperty(kt.prototype, "value", { get() {
  const t = mo(this);
  return t !== void 0 && (t.i = this.i), this.v;
}, set(t) {
  if (t !== this.v) {
    if (On > 100) throw new Error("Cycle detected");
    (function(e) {
      se !== 0 && On === 0 && e.l !== br && (e.l = br, Mn = { S: e, v: e.v, i: e.i, o: Mn });
    })(this), this.v = t, this.i++, Cn++, se++;
    try {
      for (let e = this.t; e !== void 0; e = e.x) e.t.N();
    } finally {
      zn();
    }
  }
} }), ke.prototype = new kt(), ke.prototype.h = function() {
  if (this.f &= -3, 1 & this.f) return !1;
  if ((36 & this.f) == 32 || (this.f &= -5, this.g === Cn)) return !0;
  if (this.g = Cn, this.f |= 1, this.i > 0 && !Na(this)) return this.f &= -2, !0;
  const t = J;
  try {
    fo(this), J = this;
    const e = this.x();
    (16 & this.f || this.v !== e || this.i === 0) && (this.v = e, this.f &= -17, this.i++);
  } catch (e) {
    this.v = e, this.f |= 16, this.i++;
  }
  return J = t, ka(this), this.f &= -2, !0;
}, ke.prototype.S = function(t) {
  if (this.t === void 0) {
    this.f |= 36;
    for (let e = this.s; e !== void 0; e = e.n) e.S.S(e);
  }
  kt.prototype.S.call(this, t);
}, ke.prototype.U = function(t) {
  if (this.t !== void 0 && (kt.prototype.U.call(this, t), this.t === void 0)) {
    this.f &= -33;
    for (let e = this.s; e !== void 0; e = e.n) e.S.U(e);
  }
}, ke.prototype.N = function() {
  if (!(2 & this.f)) {
    this.f |= 6;
    for (let t = this.t; t !== void 0; t = t.x) t.t.N();
  }
}, Object.defineProperty(ke.prototype, "value", { get() {
  if (1 & this.f) throw new Error("Cycle detected");
  const t = mo(this);
  if (this.h(), t !== void 0 && (t.i = this.i), 16 & this.f) throw this.v;
  return this.v;
} }), $e.prototype.c = function() {
  const t = this.S();
  try {
    if (8 & this.f || this.x === void 0) return;
    const e = this.x();
    typeof e == "function" && (this.m = e);
  } finally {
    t();
  }
}, $e.prototype.S = function() {
  if (1 & this.f) throw new Error("Cycle detected");
  this.f |= 1, this.f &= -9, _a(this), fo(this), se++;
  const t = J;
  return J = this, Cc.bind(this, t);
}, $e.prototype.N = function() {
  2 & this.f || (this.f |= 2, this.u = cn, cn = this);
}, $e.prototype.d = function() {
  this.f |= 8, 1 & this.f || Vr(this);
}, $e.prototype.dispose = function() {
  this.d();
};
jt({ build: (t, e, n) => Je(e), config: Ae({ defaultSelection: "rootEnd", disabled: !1 }), name: "@lexical/extension/AutoFocus", register(t, e, n) {
  const o = n.getOutput();
  return Zt(() => o.disabled.value ? void 0 : t.registerRootListener((a) => {
    t.focus(() => {
      const i = document.activeElement;
      a === null || i !== null && a.contains(i) || a.focus({ preventScroll: !0 });
    }, { defaultSelection: o.defaultSelection.peek() });
  }));
} });
function Ca() {
  const t = ce(), e = Ct(), n = He();
  t.clear(), t.append(n), e !== null && n.select(), Wt(e) && (e.format = 0);
}
function Ea(t, e = Ca) {
  return t.registerCommand(Xo, (n) => (t.update(e), !0), Sr);
}
jt({ build: (t, e, n) => Je(e), config: Ae({ $onClear: Ca }), name: "@lexical/extension/ClearEditor", register(t, e, n) {
  const { $onClear: o } = n.getOutput();
  return Zt(() => Ea(t, o.value));
} });
function Ec(t) {
  return (typeof t.nodes == "function" ? t.nodes() : t.nodes) || [];
}
const Wn = Fs("format", { parse: (t) => typeof t == "number" ? t : 0 });
class Ta extends cr {
  $config() {
    return this.config("decorator-text", { extends: cr, stateConfigs: [{ flat: !0, stateConfig: Wn }] });
  }
  getFormat() {
    return Qs(this, Wn);
  }
  getFormatFlags(e, n) {
    return oo(this.getFormat(), e, n);
  }
  hasFormat(e) {
    const n = tl[e];
    return (this.getFormat() & n) !== 0;
  }
  setFormat(e) {
    return el(this, Wn, e);
  }
  toggleFormat(e) {
    const n = this.getFormat(), o = oo(n, e, null);
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
function Tc(t) {
  return t instanceof Ta;
}
jt({ name: "@lexical/extension/DecoratorText", nodes: () => [Ta], register: (t, e, n) => t.registerCommand(Wo, (o) => {
  const a = Ct();
  if (Jo(a) || Wt(a)) for (const i of a.getNodes()) Tc(i) && i.toggleFormat(o);
  return !1;
}, Zo) });
function Ra(t, e) {
  let n;
  return pn(t(), { unwatched() {
    n && (n(), n = void 0);
  }, watched() {
    this.value = t(), n = e(this);
  } });
}
const vr = jt({ build: (t) => Ra(() => t.getEditorState(), (e) => t.registerUpdateListener((n) => {
  e.value = n.editorState;
})), name: "@lexical/extension/EditorState" });
function nt(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
function Sa(t, e) {
  if (t && e && !Array.isArray(e) && typeof t == "object" && typeof e == "object") {
    const n = t, o = e;
    for (const a in o) n[a] = Sa(n[a], o[a]);
    return t;
  }
  return e;
}
const jr = 0, xr = 1, Da = 2, Jn = 3, Nn = 4, Pe = 5, Zn = 6, rn = 7;
function Qn(t) {
  return t.id === jr;
}
function Ma(t) {
  return t.id === Da;
}
function Rc(t) {
  return function(e) {
    return e.id === xr;
  }(t) || nt(305, String(t.id), String(xr)), Object.assign(t, { id: Da });
}
const Sc = /* @__PURE__ */ new Set();
class Dc {
  constructor(e, n) {
    Nt(this, "builder");
    Nt(this, "configs");
    Nt(this, "_dependency");
    Nt(this, "_peerNameSet");
    Nt(this, "extension");
    Nt(this, "state");
    Nt(this, "_signal");
    this.builder = e, this.extension = n, this.configs = /* @__PURE__ */ new Set(), this.state = { id: jr };
  }
  mergeConfigs() {
    let e = this.extension.config || {};
    const n = this.extension.mergeConfig ? this.extension.mergeConfig.bind(this.extension) : zs;
    for (const o of this.configs) e = n(e, o);
    return e;
  }
  init(e) {
    const n = this.state;
    Ma(n) || nt(306, String(n.id));
    const o = { getDependency: this.getInitDependency.bind(this), getDirectDependentNames: this.getDirectDependentNames.bind(this), getPeer: this.getInitPeer.bind(this), getPeerNameSet: this.getPeerNameSet.bind(this) }, a = { ...o, getDependency: this.getDependency.bind(this), getInitResult: this.getInitResult.bind(this), getPeer: this.getPeer.bind(this) }, i = function(l, w, c) {
      return Object.assign(l, { config: w, id: Jn, registerState: c });
    }(n, this.mergeConfigs(), o);
    let s;
    this.state = i, this.extension.init && (s = this.extension.init(e, i.config, o)), this.state = function(l, w, c) {
      return Object.assign(l, { id: Nn, initResult: w, registerState: c });
    }(i, s, a);
  }
  build(e) {
    const n = this.state;
    let o;
    n.id !== Nn && nt(307, String(n.id), String(Pe)), this.extension.build && (o = this.extension.build(e, n.config, n.registerState));
    const a = { ...n.registerState, getOutput: () => o, getSignal: this.getSignal.bind(this) };
    this.state = function(i, s, l) {
      return Object.assign(i, { id: Pe, output: s, registerState: l });
    }(n, o, a);
  }
  register(e, n) {
    this._signal = n;
    const o = this.state;
    o.id !== Pe && nt(308, String(o.id), String(Pe));
    const a = this.extension.register && this.extension.register(e, o.config, o.registerState);
    return this.state = function(i) {
      return Object.assign(i, { id: Zn });
    }(o), () => {
      const i = this.state;
      i.id !== rn && nt(309, String(o.id), String(rn)), this.state = function(s) {
        return Object.assign(s, { id: Pe });
      }(i), a && a();
    };
  }
  afterRegistration(e) {
    const n = this.state;
    let o;
    return n.id !== Zn && nt(310, String(n.id), String(Zn)), this.extension.afterRegistration && (o = this.extension.afterRegistration(e, n.config, n.registerState)), this.state = function(a) {
      return Object.assign(a, { id: rn });
    }(n), o;
  }
  getSignal() {
    return this._signal === void 0 && nt(311), this._signal;
  }
  getInitResult() {
    this.extension.init === void 0 && nt(312, this.extension.name);
    const e = this.state;
    return function(n) {
      return n.id >= Nn;
    }(e) || nt(313, String(e.id), String(Nn)), e.initResult;
  }
  getInitPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionInitDependency() : void 0;
  }
  getExtensionInitDependency() {
    const e = this.state;
    return function(n) {
      return n.id >= Jn;
    }(e) || nt(314, String(e.id), String(Jn)), { config: e.config };
  }
  getPeer(e) {
    const n = this.builder.extensionNameMap.get(e);
    return n ? n.getExtensionDependency() : void 0;
  }
  getInitDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && nt(315, this.extension.name, e.name), n.getExtensionInitDependency();
  }
  getDependency(e) {
    const n = this.builder.getExtensionRep(e);
    return n === void 0 && nt(315, this.extension.name, e.name), n.getExtensionDependency();
  }
  getState() {
    const e = this.state;
    return function(n) {
      return n.id >= rn;
    }(e) || nt(316, String(e.id), String(rn)), e;
  }
  getDirectDependentNames() {
    return this.builder.incomingEdges.get(this.extension.name) || Sc;
  }
  getPeerNameSet() {
    let e = this._peerNameSet;
    return e || (e = new Set((this.extension.peerDependencies || []).map(([n]) => n)), this._peerNameSet = e), e;
  }
  getExtensionDependency() {
    if (!this._dependency) {
      const e = this.state;
      (function(n) {
        return n.id >= Pe;
      })(e) || nt(317, this.extension.name), this._dependency = { config: e.config, init: e.initResult, output: e.output };
    }
    return this._dependency;
  }
}
const ho = { tag: Rr };
function Mc() {
  const t = ce();
  t.isEmpty() && t.append(He());
}
const Oc = jt({ config: Ae({ setOptions: ho, updateOptions: ho }), init: ({ $initialEditorState: t = Mc }) => ({ $initialEditorState: t, initialized: !1 }), afterRegistration(t, { updateOptions: e, setOptions: n }, o) {
  const a = o.getInitResult();
  if (!a.initialized) {
    a.initialized = !0;
    const { $initialEditorState: i } = a;
    if (Us(i)) t.setEditorState(i, n);
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
}, name: "@lexical/extension/InitialState", nodes: [Bs, Uo, Ks, Gs, Go] }), go = Symbol.for("@lexical/extension/LexicalBuilder");
function bo() {
}
function Ic(t) {
  throw t;
}
function kn(t) {
  return Array.isArray(t) ? t : [t];
}
const tr = "0.43.0+prod.esm";
class Ve {
  constructor(e) {
    Nt(this, "roots");
    Nt(this, "extensionNameMap");
    Nt(this, "outgoingConfigEdges");
    Nt(this, "incomingEdges");
    Nt(this, "conflicts");
    Nt(this, "_sortedExtensionReps");
    Nt(this, "PACKAGE_VERSION");
    this.outgoingConfigEdges = /* @__PURE__ */ new Map(), this.incomingEdges = /* @__PURE__ */ new Map(), this.extensionNameMap = /* @__PURE__ */ new Map(), this.conflicts = /* @__PURE__ */ new Map(), this.PACKAGE_VERSION = tr, this.roots = e;
    for (const n of e) this.addExtension(n);
  }
  static fromExtensions(e) {
    const n = [kn(Oc)];
    for (const o of e) n.push(kn(o));
    return new Ve(n);
  }
  static maybeFromEditor(e) {
    const n = e[go];
    return n && (n.PACKAGE_VERSION !== tr && nt(292, n.PACKAGE_VERSION, tr), n instanceof Ve || nt(293)), n;
  }
  static fromEditor(e) {
    const n = Ve.maybeFromEditor(e);
    return n === void 0 && nt(294), n;
  }
  constructEditor() {
    const { $initialEditorState: e, onError: n, ...o } = this.buildCreateEditorArgs(), a = Object.assign(Ko({ ...o, ...n ? { onError: (i) => {
      n(i, a);
    } } : {} }), { [go]: this });
    for (const i of this.sortedExtensionReps()) i.build(a);
    return a;
  }
  buildEditor() {
    let e = bo;
    function n() {
      try {
        e();
      } finally {
        e = bo;
      }
    }
    const o = Object.assign(this.constructEditor(), { dispose: n, [Symbol.dispose]: n });
    return e = we(this.registerEditor(o), () => o.setRootElement(null)), o;
  }
  hasExtensionByName(e) {
    return this.extensionNameMap.has(e);
  }
  getExtensionRep(e) {
    const n = this.extensionNameMap.get(e.name);
    if (n) return n.extension !== e && nt(295, e.name), n;
  }
  addEdge(e, n, o) {
    const a = this.outgoingConfigEdges.get(e);
    a ? a.set(n, o) : this.outgoingConfigEdges.set(e, /* @__PURE__ */ new Map([[n, o]]));
    const i = this.incomingEdges.get(n);
    i ? i.add(e) : this.incomingEdges.set(n, /* @__PURE__ */ new Set([e]));
  }
  addExtension(e) {
    this._sortedExtensionReps !== void 0 && nt(296);
    const n = kn(e), [o] = n;
    typeof o.name != "string" && nt(297, typeof o.name);
    let a = this.extensionNameMap.get(o.name);
    if (a !== void 0 && a.extension !== o && nt(298, o.name), !a) {
      a = new Dc(this, o), this.extensionNameMap.set(o.name, a);
      const i = this.conflicts.get(o.name);
      typeof i == "string" && nt(299, o.name, i);
      for (const s of o.conflictsWith || []) this.extensionNameMap.has(s) && nt(299, o.name, s), this.conflicts.set(s, o.name);
      for (const s of o.dependencies || []) {
        const l = kn(s);
        this.addEdge(o.name, l[0].name, l.slice(1)), this.addExtension(l);
      }
      for (const [s, l] of o.peerDependencies || []) this.addEdge(o.name, s, l ? [l] : []);
    }
  }
  sortedExtensionReps() {
    if (this._sortedExtensionReps) return this._sortedExtensionReps;
    const e = [], n = (o, a) => {
      let i = o.state;
      if (Ma(i)) return;
      const s = o.extension.name;
      var l;
      Qn(i) || nt(300, s, a || "[unknown]"), Qn(l = i) || nt(304, String(l.id), String(jr)), i = Object.assign(l, { id: xr }), o.state = i;
      const w = this.outgoingConfigEdges.get(s);
      if (w) for (const c of w.keys()) {
        const d = this.extensionNameMap.get(c);
        d && n(d, s);
      }
      i = Rc(i), o.state = i, e.push(o);
    };
    for (const o of this.extensionNameMap.values()) Qn(o.state) && n(o);
    for (const o of e) for (const [a, i] of this.outgoingConfigEdges.get(o.extension.name) || []) if (i.length > 0) {
      const s = this.extensionNameMap.get(a);
      if (s) for (const l of i) s.configs.add(l);
    }
    for (const [o, ...a] of this.roots) if (a.length > 0) {
      const i = this.extensionNameMap.get(o.name);
      i === void 0 && nt(301, o.name);
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
    return we(...a);
  }
  buildCreateEditorArgs() {
    const e = {}, n = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), i = {}, s = {}, l = this.sortedExtensionReps();
    for (const d of l) {
      const { extension: m } = d;
      if (m.onError !== void 0 && (e.onError = m.onError), m.disableEvents !== void 0 && (e.disableEvents = m.disableEvents), m.parentEditor !== void 0 && (e.parentEditor = m.parentEditor), m.editable !== void 0 && (e.editable = m.editable), m.namespace !== void 0 && (e.namespace = m.namespace), m.$initialEditorState !== void 0 && (e.$initialEditorState = m.$initialEditorState), m.nodes) for (const f of Ec(m)) {
        if (typeof f != "function") {
          const u = o.get(f.replace);
          u && nt(302, m.name, f.replace.name, u.extension.name), o.set(f.replace, d);
        }
        n.add(f);
      }
      if (m.html) {
        if (m.html.export) for (const [f, u] of m.html.export.entries()) a.set(f, u);
        m.html.import && Object.assign(i, m.html.import);
      }
      m.theme && Sa(s, m.theme);
    }
    Object.keys(s).length > 0 && (e.theme = s), n.size && (e.nodes = [...n]);
    const w = Object.keys(i).length > 0, c = a.size > 0;
    (w || c) && (e.html = {}, w && (e.html.import = i), c && (e.html.export = a));
    for (const d of l) d.init(e);
    return e.onError || (e.onError = Ic), e;
  }
}
const Ac = /* @__PURE__ */ new Set(), vo = jt({ build(t, e, n) {
  const o = n.getDependency(vr).output, a = pn({ watchedNodeKeys: /* @__PURE__ */ new Map() }), i = Ra(() => {
  }, () => Zt(() => {
    const s = i.peek(), { watchedNodeKeys: l } = a.value;
    let w, c = !1;
    o.value.read(() => {
      if (Ct()) for (const [d, m] of l.entries()) {
        if (m.size === 0) {
          l.delete(d);
          continue;
        }
        const f = rl(d), u = f && f.isSelected() || !1;
        c = c || u !== (!!s && s.has(d)), u && (w = w || /* @__PURE__ */ new Set(), w.add(d));
      }
    }), !c && w && s && w.size === s.size || (i.value = w);
  }));
  return { watchNodeKey: function(s) {
    const l = _c(() => (i.value || Ac).has(s)), { watchedNodeKeys: w } = a.peek();
    let c = w.get(s);
    const d = c !== void 0;
    return c = c || /* @__PURE__ */ new Set(), c.add(l), d || (w.set(s, c), a.value = { watchedNodeKeys: w }), l;
  } };
}, dependencies: [vr], name: "@lexical/extension/NodeSelection" }), Pc = qs("INSERT_HORIZONTAL_RULE_COMMAND");
class Fe extends cr {
  static getType() {
    return "horizontalrule";
  }
  static clone(e) {
    return new Fe(e.__key);
  }
  static importJSON(e) {
    return zr().updateFromJSON(e);
  }
  static importDOM() {
    return { hr: () => ({ conversion: $c, priority: 0 }) };
  }
  exportDOM() {
    return { element: document.createElement("hr") };
  }
  createDOM(e) {
    const n = document.createElement("hr");
    return Qo(n, e.theme.hr), n;
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
function $c() {
  return { node: zr() };
}
function zr() {
  return nl(Fe);
}
function Lc(t) {
  return t instanceof Fe;
}
jt({ dependencies: [vr, vo], name: "@lexical/extension/HorizontalRule", nodes: () => [Fe], register(t, e, n) {
  const { watchNodeKey: o } = n.getDependency(vo).output, a = pn({ nodeSelections: /* @__PURE__ */ new Map() }), i = t._config.theme.hrSelected ?? "selected";
  return we(t.registerCommand(Pc, (s) => {
    const l = Ct();
    if (!Wt(l)) return !1;
    if (l.focus.getNode() !== null) {
      const w = zr();
      bc(w);
    }
    return !0;
  }, Sr), t.registerCommand(Hs, (s) => {
    if (Ys(s.target)) {
      const l = Xs(s.target);
      if (Lc(l)) return function(w, c = !1) {
        const d = Ct(), m = w.isSelected(), f = w.getKey();
        let u;
        c && Jo(d) ? u = d : (u = Ws(), Js(u)), m ? u.delete(f) : u.add(f);
      }(l, s.shiftKey), !0;
    }
    return !1;
  }, Zo), t.registerMutationListener(Fe, (s, l) => {
    Nc(() => {
      let w = !1;
      const { nodeSelections: c } = a.peek();
      for (const [d, m] of s.entries()) if (m === "destroyed") c.delete(d), w = !0;
      else {
        const f = c.get(d), u = t.getElementByKey(d);
        f ? f.domNode.value = u : (w = !0, c.set(d, { domNode: pn(u), selectedSignal: o(d) }));
      }
      w && (a.value = { nodeSelections: c });
    });
  }), Zt(() => {
    const s = [];
    for (const { domNode: l, selectedSignal: w } of a.value.nodeSelections.values()) s.push(Zt(() => {
      const c = l.value;
      c && (w.value ? Qo(c, i) : ol(c, i));
    }));
    return we(...s);
  }));
} });
jt({ build: (t, e) => Je({ inheritEditableFromParent: e.inheritEditableFromParent }), config: Ae({ $getParentEditor: function() {
  const t = Zs();
  return Ve.fromEditor(t), t;
}, inheritEditableFromParent: !1 }), init: (t, e, n) => {
  const o = e.$getParentEditor();
  t.parentEditor = o, t.theme = t.theme || o._config.theme;
}, name: "@lexical/extension/NestedEditor", register: (t, e, n) => Zt(() => {
  const o = t._parentEditor;
  if (o && n.getOutput().inheritEditableFromParent.value) return t.setEditable(o.isEditable()), o.registerEditableListener(t.setEditable.bind(t));
}) });
jt({ build: (t, e, n) => Je(e), config: Ae({ disabled: !1, onReposition: void 0 }), name: "@lexical/utils/SelectionAlwaysOnDisplay", register: (t, e, n) => {
  const o = n.getOutput();
  return Zt(() => {
    if (!o.disabled.value) return hc(t, o.onReposition.value);
  });
} });
function Oa(t) {
  return t.canBeEmpty();
}
function Vc(t, e, n = Oa) {
  return we(t.registerCommand(al, (o) => {
    const a = Ct();
    if (!Wt(a)) return !1;
    o.preventDefault();
    const i = function(s) {
      if (s.getNodes().filter((f) => Tn(f) && f.canIndent()).length > 0) return !0;
      const l = s.anchor, w = s.focus, c = w.isBefore(l) ? w : l, d = c.getNode(), m = gc(d);
      if (m.canIndent()) {
        const f = m.getKey();
        let u = il();
        if (u.anchor.set(f, 0, "element"), u.focus.set(f, 0, "element"), u = sl(u), u.anchor.is(c)) return !0;
      }
      return !1;
    }(a) ? o.shiftKey ? ll : ao : cl;
    return t.dispatchCommand(i, void 0);
  }, Sr), t.registerCommand(ao, () => {
    const o = typeof e == "number" ? e : e ? e.peek() : null, a = Ct();
    if (!Wt(a)) return !1;
    const i = typeof n == "function" ? n : n.peek();
    return xc((s) => {
      if (i(s)) {
        const l = s.getIndent() + 1;
        (!o || l < o) && s.setIndent(l);
      }
    });
  }, Dr));
}
jt({ build: (t, e, n) => Je(e), config: Ae({ $canIndent: Oa, disabled: !1, maxIndent: null }), name: "@lexical/extension/TabIndentation", register(t, e, n) {
  const { disabled: o, maxIndent: a, $canIndent: i } = n.getOutput();
  return Zt(() => {
    if (!o.value) return Vc(t, a, i);
  });
} });
const jc = jt({ name: "@lexical/react/ReactProvider" });
function zc() {
  return ce().getTextContent();
}
function Fc(t, e = !0) {
  if (t) return !1;
  let n = zc();
  return e && (n = n.trim()), n === "";
}
function Bc(t) {
  if (!Fc(t, !1)) return !1;
  const e = ce().getChildren(), n = e.length;
  if (n > 1) return !1;
  for (let o = 0; o < n; o++) {
    const a = e[o];
    if (wl(a)) return !1;
    if (ie(a)) {
      if (!dl(a) || a.__indent !== 0) return !1;
      const i = a.getChildren(), s = i.length;
      for (let l = 0; l < s; l++) {
        const w = i[o];
        if (!Rn(w)) return !1;
      }
    }
  }
  return !0;
}
function Ia(t) {
  return () => Bc(t);
}
function Aa(t) {
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
          const w = l.args;
          if (w) {
            const [c, d, m, f, u] = w;
            t.update(() => {
              const g = Ct();
              if (Wt(g)) {
                const b = g.anchor;
                let x = b.getNode(), C = 0, y = 0;
                if (Rn(x) && c >= 0 && d >= 0 && (C = c, y = c + d, g.setTextNodeRange(x, C, x, y)), C === y && m === "" || (g.insertRawText(m), x = b.getNode()), Rn(x)) {
                  C = f, y = f + u;
                  const k = x.getTextContentSize();
                  C = C > k ? k : C, y = y > k ? k : y, g.setTextNodeRange(x, C, x, y);
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
jt({ build: (t, e, n) => Je(e), config: Ae({ disabled: typeof window > "u" }), name: "@lexical/dragon", register: (t, e, n) => Zt(() => n.getOutput().disabled.value ? void 0 : Aa(t)) });
function Kc(t, ...e) {
  const n = new URL("https://lexical.dev/docs/error"), o = new URLSearchParams();
  o.append("code", t);
  for (const a of e) o.append("v", a);
  throw n.search = o.toString(), Error(`Minified Lexical error #${t}; visit ${n.toString()} for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`);
}
const Fr = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : U;
function Gc({ editor: t, ErrorBoundary: e }) {
  return function(n, o) {
    const [a, i] = D(() => n.getDecorators());
    return Fr(() => n.registerDecoratorListener((s) => {
      xl(() => {
        i(s);
      });
    }), [n]), U(() => {
      i(n.getDecorators());
    }, [n]), z(() => {
      const s = [], l = Object.keys(a);
      for (let w = 0; w < l.length; w++) {
        const c = l[w], d = r(o, { onError: (f) => n._onError(f), children: r(Ai, { fallback: null, children: a[c] }) }), m = n.getElementByKey(c);
        m !== null && s.push(yl(d, m, c));
      }
      return s;
    }, [o, a, n]);
  }(t, e);
}
function Uc({ editor: t, ErrorBoundary: e }) {
  return function(n) {
    const o = Ve.maybeFromEditor(n);
    if (o && o.hasExtensionByName(jc.name)) {
      for (const a of ["@lexical/plain-text", "@lexical/rich-text"]) o.hasExtensionByName(a) && Kc(320, a);
      return !0;
    }
    return !1;
  }(t) ? null : r(Gc, { editor: t, ErrorBoundary: e });
}
function xo(t) {
  return t.getEditorState().read(Ia(t.isComposing()));
}
function qc({ contentEditable: t, placeholder: e = null, ErrorBoundary: n }) {
  const [o] = ne();
  return function(a) {
    Fr(() => we(vl(a), Aa(a)), [a]);
  }(o), p(st, { children: [t, r(Hc, { content: e }), r(Uc, { editor: o, ErrorBoundary: n })] });
}
function Hc({ content: t }) {
  const [e] = ne(), n = function(a) {
    const [i, s] = D(() => xo(a));
    return Fr(() => {
      function l() {
        const w = xo(a);
        s(w);
      }
      return l(), we(a.registerUpdateListener(() => {
        l();
      }), a.registerEditableListener(() => {
        l();
      }));
    }, [a]), i;
  }(e), o = lc();
  return n ? typeof t == "function" ? t(o) : t : null;
}
function Yc({ defaultSelection: t }) {
  const [e] = ne();
  return U(() => {
    e.focus(() => {
      const n = document.activeElement, o = e.getRootElement();
      o === null || n !== null && o.contains(n) || o.focus({ preventScroll: !0 });
    }, { defaultSelection: t });
  }, [t, e]), null;
}
const Xc = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : U;
function Wc({ onClear: t }) {
  const [e] = ne();
  return Xc(() => Ea(e, t), [e, t]), null;
}
const Pa = typeof window < "u" && window.document !== void 0 && window.document.createElement !== void 0 ? $t : U;
function Jc({ editor: t, ariaActiveDescendant: e, ariaAutoComplete: n, ariaControls: o, ariaDescribedBy: a, ariaErrorMessage: i, ariaExpanded: s, ariaInvalid: l, ariaLabel: w, ariaLabelledBy: c, ariaMultiline: d, ariaOwns: m, ariaRequired: f, autoCapitalize: u, className: g, id: b, role: x = "textbox", spellCheck: C = !0, style: y, tabIndex: k, "data-testid": N, ...V }, $) {
  const [A, R] = D(t.isEditable()), _ = B((L) => {
    L && L.ownerDocument && L.ownerDocument.defaultView ? t.setRootElement(L) : t.setRootElement(null);
  }, [t]), S = z(() => /* @__PURE__ */ function(...L) {
    return (j) => {
      for (const P of L) typeof P == "function" ? P(j) : P != null && (P.current = j);
    };
  }($, _), [_, $]);
  return Pa(() => (R(t.isEditable()), t.registerEditableListener((L) => {
    R(L);
  })), [t]), r("div", { "aria-activedescendant": A ? e : void 0, "aria-autocomplete": A ? n : "none", "aria-controls": A ? o : void 0, "aria-describedby": a, ...i != null ? { "aria-errormessage": i } : {}, "aria-expanded": A && x === "combobox" ? !!s : void 0, ...l != null ? { "aria-invalid": l } : {}, "aria-label": w, "aria-labelledby": c, "aria-multiline": d, "aria-owns": A ? m : void 0, "aria-readonly": !A || void 0, "aria-required": f, autoCapitalize: u, className: g, contentEditable: A, "data-testid": N, id: b, ref: S, role: x, spellCheck: C, style: y, tabIndex: k, ...V });
}
const Zc = fn(Jc);
function yo(t) {
  return t.getEditorState().read(Ia(t.isComposing()));
}
const Qc = fn(tw);
function tw(t, e) {
  const { placeholder: n, ...o } = t, [a] = ne();
  return p(st, { children: [r(Zc, { editor: a, ...o, ref: e }), n != null && r(ew, { editor: a, content: n })] });
}
function ew({ content: t, editor: e }) {
  const n = function(s) {
    const [l, w] = D(() => yo(s));
    return Pa(() => {
      function c() {
        const d = yo(s);
        w(d);
      }
      return c(), we(s.registerUpdateListener(() => {
        c();
      }), s.registerEditableListener(() => {
        c();
      }));
    }, [s]), l;
  }(e), [o, a] = D(e.isEditable());
  if ($t(() => (a(e.isEditable()), e.registerEditableListener((s) => {
    a(s);
  })), [e]), !n) return null;
  let i = null;
  return typeof t == "function" ? i = t(o) : t !== null && (i = t), i === null ? null : r("div", { "aria-hidden": !0, children: i });
}
function nw({
  placeholder: t,
  className: e,
  placeholderClassName: n
}) {
  return /* @__PURE__ */ r(
    Qc,
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
const $a = Ln(void 0);
function rw({
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
  return /* @__PURE__ */ r($a.Provider, { value: s, children: i });
}
function La() {
  const t = Tr($a);
  if (!t)
    throw new Error("useToolbarContext must be used within a ToolbarContext provider");
  return t;
}
function ow() {
  const [t, e] = D(void 0), n = B(() => {
    e(void 0);
  }, []), o = z(() => {
    if (t === void 0)
      return;
    const { title: i, content: s } = t;
    return /* @__PURE__ */ r(Vl, { open: !0, onOpenChange: n, children: /* @__PURE__ */ p(da, { children: [
      /* @__PURE__ */ r(pa, { children: /* @__PURE__ */ r(ua, { children: i }) }),
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
function aw({
  children: t
}) {
  const [e] = ne(), [n, o] = D(e), [a, i] = D("paragraph"), [s, l] = ow(), w = () => {
  };
  return U(() => n.registerCommand(
    ta,
    (c, d) => (o(d), !1),
    Dr
  ), [n]), /* @__PURE__ */ p(
    rw,
    {
      activeEditor: n,
      $updateToolbar: w,
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
function iw(t) {
  const [e] = ne(), { activeEditor: n } = La();
  U(() => n.registerCommand(
    ta,
    () => {
      const o = Ct();
      return o && t(o), !1;
    },
    Dr
  ), [e, t]), U(() => {
    n.getEditorState().read(() => {
      const o = Ct();
      o && t(o);
    });
  }, [n, t]);
}
const Va = pe(
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
), sw = v.forwardRef(({ className: t, variant: e, size: n, ...o }, a) => /* @__PURE__ */ r(
  ra.Root,
  {
    ref: a,
    className: h(Va({ variant: e, size: n, className: t })),
    ...o
  }
));
sw.displayName = ra.Root.displayName;
const ja = v.createContext({
  size: "default",
  variant: "default"
}), Br = v.forwardRef(({ className: t, variant: e, size: n, children: o, ...a }, i) => {
  const s = ft();
  return /* @__PURE__ */ r(
    jn.Root,
    {
      ref: i,
      className: h("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
      ...a,
      dir: s,
      children: /* @__PURE__ */ r(
        ja.Provider,
        {
          value: { variant: e, size: n },
          children: o
        }
      )
    }
  );
});
Br.displayName = jn.Root.displayName;
const wn = v.forwardRef(({ className: t, children: e, variant: n, size: o, ...a }, i) => {
  const s = v.useContext(ja);
  return /* @__PURE__ */ r(
    jn.Item,
    {
      ref: i,
      className: h(
        Va({
          variant: s.variant || n,
          size: s.size || o
        }),
        t
      ),
      ...a,
      children: e
    }
  );
});
wn.displayName = jn.Item.displayName;
const No = [
  { format: "bold", icon: Li, label: "Bold" },
  { format: "italic", icon: Vi, label: "Italic" }
  // CUSTOM: TJ removed underline and strikethrough as they are not supported by the current comment
  // data conversion and are not in P9 anyway. We can add these back if we ever get this supported.
  /* { format: 'underline', icon: UnderlineIcon, label: 'Underline' },
  { format: 'strikethrough', icon: StrikethroughIcon, label: 'Strikethrough' }, */
];
function lw() {
  const { activeEditor: t } = La(), [e, n] = D([]), o = B((a) => {
    if (Wt(a) || Nl(a)) {
      const i = [];
      No.forEach(({ format: s }) => {
        a.hasFormat(s) && i.push(s);
      }), n((s) => s.length !== i.length || !i.every((l) => s.includes(l)) ? i : s);
    }
  }, []);
  return iw(o), /* @__PURE__ */ r(
    Br,
    {
      type: "multiple",
      value: e,
      onValueChange: n,
      variant: "outline",
      size: "sm",
      children: No.map(({ format: a, icon: i, label: s }) => /* @__PURE__ */ r(
        wn,
        {
          value: a,
          "aria-label": s,
          onClick: () => {
            t.dispatchCommand(Wo, a);
          },
          children: /* @__PURE__ */ r(i, { className: "tw-h-4 tw-w-4" })
        },
        a
      ))
    }
  );
}
function cw({ onClear: t }) {
  const [e] = ne();
  U(() => {
    t && t(() => {
      e.dispatchCommand(Xo, void 0);
    });
  }, [e, t]);
}
function ww({
  placeholder: t = "Start typing ...",
  autoFocus: e = !1,
  onClear: n
}) {
  const [, o] = D(void 0);
  return /* @__PURE__ */ p("div", { className: "tw-relative", children: [
    /* @__PURE__ */ r(aw, { children: () => /* @__PURE__ */ r("div", { className: "tw-sticky tw-top-0 tw-z-10 tw-flex tw-gap-2 tw-overflow-auto tw-border-b tw-p-1", children: /* @__PURE__ */ r(lw, {}) }) }),
    /* @__PURE__ */ p("div", { className: "tw-relative", children: [
      /* @__PURE__ */ r(
        qc,
        {
          contentEditable: /* @__PURE__ */ r("div", { ref: (i) => {
            i !== void 0 && o(i);
          }, children: /* @__PURE__ */ r(nw, { placeholder: t }) }),
          ErrorBoundary: ac
        }
      ),
      e && /* @__PURE__ */ r(Yc, { defaultSelection: "rootEnd" }),
      /* @__PURE__ */ r(cw, { onClear: n }),
      /* @__PURE__ */ r(Wc, {})
    ] })
  ] });
}
const dw = {
  namespace: "commentEditor",
  theme: $r,
  nodes: Lr,
  onError: (t) => {
    console.error(t);
  }
};
function In({
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
        className: h(
          "pr-twp tw-overflow-hidden tw-rounded-lg tw-border tw-bg-background tw-shadow",
          l
        ),
        children: /* @__PURE__ */ r(
          Ql,
          {
            initialConfig: {
              ...dw,
              ...t ? { editorState: t } : {},
              ...e ? { editorState: JSON.stringify(e) } : {}
            },
            children: /* @__PURE__ */ p(Mt, { children: [
              /* @__PURE__ */ r(ww, { placeholder: a, autoFocus: i, onClear: s }),
              /* @__PURE__ */ r(
                ec,
                {
                  ignoreSelectionChange: !0,
                  onChange: (w) => {
                    n == null || n(w), o == null || o(w.toJSON());
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
function pw(t, e) {
  const n = ul(e) ? e.body.childNodes : e.childNodes;
  let o = [];
  const a = [];
  for (const i of n) if (!Fa.has(i.nodeName)) {
    const s = Ba(i, t, a, !1);
    s !== null && (o = o.concat(s));
  }
  return function(i) {
    for (const s of i) s.getNextSibling() instanceof ea && s.insertAfter(na());
    for (const s of i) {
      const l = s.getChildren();
      for (const w of l) s.insertBefore(w);
      s.remove();
    }
  }(a), o;
}
function uw(t, e) {
  if (typeof document > "u" || typeof window > "u" && global.window === void 0) throw new Error("To use $generateHtmlFromNodes in headless mode please initialize a headless browser implementation such as JSDom before calling this function.");
  const n = document.createElement("div"), o = ce().getChildren();
  for (let a = 0; a < o.length; a++)
    za(t, o[a], n, e);
  return n.innerHTML;
}
function za(t, e, n, o = null) {
  let a = o === null || e.isSelected(o);
  const i = ie(e) && e.excludeFromCopy("html");
  let s = e;
  o !== null && Rn(e) && (s = wc(o, e, "clone"));
  const l = ie(s) ? s.getChildren() : [], w = pl(t, s.getType());
  let c;
  c = w && w.exportDOM !== void 0 ? w.exportDOM(t, s) : s.exportDOM(t);
  const { element: d, after: m } = c;
  if (!d) return !1;
  const f = document.createDocumentFragment();
  for (let u = 0; u < l.length; u++) {
    const g = l[u], b = za(t, g, f, o);
    !a && ie(e) && b && e.extractWithChild(g, o, "html") && (a = !0);
  }
  if (a && !i) {
    if ((Yo(d) || io(d)) && d.append(f), n.append(d), m) {
      const u = m.call(s, d);
      u && (io(d) ? d.replaceChildren(u) : d.replaceWith(u));
    }
  } else n.append(f);
  return a;
}
const Fa = /* @__PURE__ */ new Set(["STYLE", "SCRIPT"]);
function Ba(t, e, n, o, a = /* @__PURE__ */ new Map(), i) {
  let s = [];
  if (Fa.has(t.nodeName)) return s;
  let l = null;
  const w = function(g, b) {
    const { nodeName: x } = g, C = b._htmlConversions.get(x.toLowerCase());
    let y = null;
    if (C !== void 0) for (const k of C) {
      const N = k(g);
      N !== null && (y === null || (y.priority || 0) <= (N.priority || 0)) && (y = N);
    }
    return y !== null ? y.conversion : null;
  }(t, e), c = w ? w(t) : null;
  let d = null;
  if (c !== null) {
    d = c.after;
    const g = c.node;
    if (l = Array.isArray(g) ? g[g.length - 1] : g, l !== null) {
      for (const [, b] of a) if (l = b(l, i), !l) break;
      l && s.push(...Array.isArray(g) ? g : [l]);
    }
    c.forChild != null && a.set(t.nodeName, c.forChild);
  }
  const m = t.childNodes;
  let f = [];
  const u = (l == null || !ml(l)) && (l != null && Tn(l) || o);
  for (let g = 0; g < m.length; g++) f.push(...Ba(m[g], e, n, u, new Map(a), l));
  return d != null && (f = d(f)), so(t) && (f = mw(t, f, u ? () => {
    const g = new ea();
    return n.push(g), g;
  } : He)), l == null ? f.length > 0 ? s = s.concat(f) : so(t) && function(g) {
    return g.nextSibling == null || g.previousSibling == null ? !1 : lo(g.nextSibling) && lo(g.previousSibling);
  }(t) && (s = s.concat(na())) : ie(l) && l.append(...f), s;
}
function mw(t, e, n) {
  const o = t.style.textAlign, a = [];
  let i = [];
  for (let s = 0; s < e.length; s++) {
    const l = e[s];
    if (Tn(l)) o && !l.getFormat() && l.setFormat(o), a.push(l);
    else if (i.push(l), s === e.length - 1 || s < e.length - 1 && Tn(e[s + 1])) {
      const w = n();
      w.setFormat(o), w.append(...i), a.push(w), i = [];
    }
  }
  return a;
}
function Ka(t) {
  const e = t.querySelector('[contenteditable="true"]');
  if (!e) return !1;
  e.focus();
  const n = window.getSelection(), o = document.createRange();
  return o.selectNodeContents(e), o.collapse(!1), n == null || n.removeAllRanges(), n == null || n.addRange(o), !0;
}
function Ga(t) {
  return t ? t.some(
    (e) => e && "text" in e && e.text.trim().length > 0 ? !0 : !e || !("children" in e) ? !1 : Ga(e.children)
  ) : !1;
}
function Bt(t) {
  var e;
  return (e = t == null ? void 0 : t.root) != null && e.children ? Ga(t.root.children) : !1;
}
function fw(t) {
  if (!t || t.trim() === "")
    throw new Error("Input HTML is empty");
  const e = oa({
    namespace: "EditorUtils",
    theme: $r,
    nodes: Lr,
    onError: (o) => {
      console.error(o);
    }
  });
  let n;
  if (e.update(
    () => {
      const a = new DOMParser().parseFromString(t, "text/html"), i = pw(e, a);
      ce().clear(), fl(i);
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
function An(t) {
  const e = oa({
    namespace: "EditorUtils",
    theme: $r,
    nodes: Lr,
    onError: (a) => {
      console.error(a);
    }
  }), n = e.parseEditorState(JSON.stringify(t));
  e.setEditorState(n);
  let o = "";
  return e.getEditorState().read(() => {
    o = uw(e);
  }), o = o.replace(/\s+style="[^"]*"/g, "").replace(/\s+class="[^"]*"/g, "").replace(/<span>(.*?)<\/span>/g, "$1").replace(/<b><strong[^>]*>(.*?)<\/strong><\/b>/g, "<b>$1</b>").replace(/<strong><b[^>]*>(.*?)<\/b><\/strong>/g, "<b>$1</b>").replace(/<i><em[^>]*>(.*?)<\/em><\/i>/g, "<i>$1</i>").replace(/<em><i[^>]*>(.*?)<\/i><\/em>/g, "<i>$1</i>").replace(/<u><span[^>]*>(.*?)<\/span><\/u>/g, "<u>$1</u>").replace(/<s><span[^>]*>(.*?)<\/span><\/s>/g, "<s>$1</s>").replace(/<br\s*\/?>/gi, "<br/>"), o;
}
function Kr(t) {
  return ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Home", "End"].includes(t.key) ? (t.stopPropagation(), !0) : !1;
}
const De = v.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...o }, a) => /* @__PURE__ */ r(
  aa.Root,
  {
    ref: a,
    decorative: n,
    orientation: e,
    className: h(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...o
  }
));
De.displayName = aa.Root.displayName;
const hw = pe(
  "tw-flex tw-w-fit tw-items-stretch has-[>[data-slot=button-group]]:tw-gap-2 [&>*]:focus-visible:tw-relative [&>*]:focus-visible:tw-z-10 has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:tw-rounded-r-md [&>[data-slot=select-trigger]:not([class*=w-])]:tw-w-fit [&>input]:tw-flex-1",
  {
    variants: {
      orientation: {
        horizontal: "[&>*:not(:first-child)]:tw-rounded-l-none [&>*:not(:first-child)]:tw-border-l-0 [&>*:not(:last-child)]:tw-rounded-r-none",
        vertical: "tw-flex-col [&>*:not(:first-child)]:tw-rounded-t-none [&>*:not(:first-child)]:tw-border-t-0 [&>*:not(:last-child)]:tw-rounded-b-none"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function Gr({
  className: t,
  orientation: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": e,
      className: h("pr-twp", hw({ orientation: e }), t),
      ...n
    }
  );
}
function Ua({
  className: t,
  orientation: e = "vertical",
  ...n
}) {
  return /* @__PURE__ */ r(
    De,
    {
      "data-slot": "button-group-separator",
      orientation: e,
      className: h(
        "tw-!m-0 tw-relative tw-self-stretch tw-bg-input data-[orientation=vertical]:tw-h-auto",
        t
      ),
      ...n
    }
  );
}
const qa = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]), ko = (t, e) => t[e] ?? e;
function Ha({
  onCancelClick: t,
  onAcceptClick: e,
  canAccept: n = !0,
  localizedStrings: o = {},
  className: a = "tw-h-6 tw-w-6"
}) {
  const i = ko(o, "%cancelButton_tooltip%"), s = ko(o, "%acceptButton_tooltip%");
  return /* @__PURE__ */ p(Gr, { children: [
    /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": i,
          className: a,
          size: "icon",
          onClick: t,
          variant: "secondary",
          children: /* @__PURE__ */ r(hn, {})
        }
      ) }),
      /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ r("p", { children: i }) })
    ] }) }),
    /* @__PURE__ */ r(Ua, {}),
    /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": s,
          className: a,
          size: "icon",
          onClick: e,
          disabled: !n,
          children: /* @__PURE__ */ r(Qt, {})
        }
      ) }),
      /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ r("p", { children: s }) })
    ] }) })
  ] });
}
function En(t, e) {
  return t === "" ? e["%comment_assign_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%comment_assign_team%"] ?? "Team" : t;
}
function Ur(t) {
  const e = /Macintosh/i.test(navigator.userAgent);
  return t.key === "Enter" && (e && t.metaKey || !e && t.ctrlKey);
}
const gw = {
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
function er(t, e) {
  return t === "" ? e["%commentEditor_unassigned%"] ?? "Unassigned" : t === "Team" ? e["%commentEditor_team%"] ?? "Team" : t;
}
function wu({
  assignableUsers: t,
  onSave: e,
  onClose: n,
  localizedStrings: o
}) {
  const [a, i] = D(gw), [s, l] = D(void 0), [w, c] = D(!1), d = G(void 0), m = G(null);
  U(() => {
    let b = !0;
    const x = m.current;
    if (!x) return;
    const C = setTimeout(() => {
      b && Ka(x);
    }, 300);
    return () => {
      b = !1, clearTimeout(C);
    };
  }, []);
  const f = B(() => {
    if (!Bt(a)) return;
    const b = An(a);
    e(b, s);
  }, [a, e, s]), u = o["%commentEditor_placeholder%"] ?? "Type your comment here...", g = o["%commentEditor_assignTo_label%"] ?? "Assign to";
  return /* @__PURE__ */ p("div", { className: "pr-twp tw-grid tw-gap-3", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-justify-between", children: [
      /* @__PURE__ */ r("span", { className: "tw-text-sm tw-font-medium", children: g }),
      /* @__PURE__ */ r(
        Ha,
        {
          onCancelClick: n,
          onAcceptClick: f,
          canAccept: Bt(a),
          localizedStrings: o
        }
      )
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-flex tw-items-center tw-gap-2", children: /* @__PURE__ */ p(fe, { open: w, onOpenChange: c, children: [
      /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ p(
        F,
        {
          variant: "outline",
          className: "tw-flex tw-w-full tw-items-center tw-justify-start tw-gap-2",
          disabled: t.length === 0,
          children: [
            /* @__PURE__ */ r(Ao, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { children: er(s !== void 0 ? s : "", o) })
          ]
        }
      ) }),
      /* @__PURE__ */ r(
        ee,
        {
          className: "tw-w-auto tw-p-0",
          align: "start",
          onKeyDown: (b) => {
            b.key === "Escape" && (b.stopPropagation(), c(!1));
          },
          children: /* @__PURE__ */ r(ue, { children: /* @__PURE__ */ r(me, { children: t.map((b) => /* @__PURE__ */ r(
            te,
            {
              onSelect: () => {
                l(b === "" ? void 0 : b), c(!1);
              },
              className: "tw-flex tw-items-center",
              children: /* @__PURE__ */ r("span", { children: er(b, o) })
            },
            b || "unassigned"
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
        onKeyDownCapture: (b) => {
          b.key === "Escape" ? (b.preventDefault(), b.stopPropagation(), n()) : Ur(b) && (b.preventDefault(), b.stopPropagation(), Bt(a) && f());
        },
        onKeyDown: (b) => {
          Kr(b), (b.key === "Enter" || b.key === " ") && b.stopPropagation();
        },
        children: /* @__PURE__ */ r(
          In,
          {
            editorSerializedState: a,
            onSerializedChange: (b) => i(b),
            placeholder: u,
            onClear: (b) => {
              d.current = b;
            }
          }
        )
      }
    )
  ] });
}
const du = Object.freeze([
  "%commentEditor_placeholder%",
  "%commentEditor_assignTo_label%",
  "%commentEditor_unassigned%",
  "%commentEditor_team%",
  ...qa
]), pu = [
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
], bw = ["input", "select", "textarea", "button"], vw = ["button", "textbox"], xw = ({
  options: t,
  onFocusChange: e,
  onOptionSelect: n,
  onCharacterPress: o
}) => {
  const a = G(null), [i, s] = D(void 0), [l, w] = D(void 0), c = B(
    (u) => {
      s(u);
      const g = t.find((x) => x.id === u);
      g && (e == null || e(g));
      const b = document.getElementById(u);
      b && (b.scrollIntoView({ block: "center" }), b.focus()), a.current && a.current.setAttribute("aria-activedescendant", u);
    },
    [e, t]
  ), d = B(
    (u) => {
      const g = t.find((b) => b.id === u);
      g && (w((b) => b === u ? void 0 : u), n == null || n(g));
    },
    [n, t]
  ), m = (u) => {
    if (!u) return !1;
    const g = u.tagName.toLowerCase();
    if (u.isContentEditable || bw.includes(g)) return !0;
    const b = u.getAttribute("role");
    if (b && vw.includes(b)) return !0;
    const x = u.getAttribute("tabindex");
    return x !== void 0 && x !== "-1";
  }, f = B(
    (u) => {
      var A;
      const g = u.target, b = (R) => R ? document.getElementById(R) : void 0, x = b(l), C = b(i);
      if (!!(x && g && x.contains(g) && g !== x) && m(g)) {
        if (u.key === "Escape" || u.key === "ArrowLeft" && !g.isContentEditable) {
          if (l) {
            u.preventDefault(), u.stopPropagation();
            const R = t.find((_) => _.id === l);
            R && c(R.id);
          }
          return;
        }
        if (u.key === "ArrowDown" || u.key === "ArrowUp") {
          if (!x) return;
          const R = Array.from(
            x.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (R.length === 0) return;
          const _ = R.findIndex((L) => L === g);
          if (_ === -1) return;
          let S;
          u.key === "ArrowDown" ? S = Math.min(_ + 1, R.length - 1) : S = Math.max(_ - 1, 0), S !== _ && (u.preventDefault(), u.stopPropagation(), (A = R[S]) == null || A.focus());
          return;
        }
        return;
      }
      const N = t.findIndex((R) => R.id === i);
      let V = N;
      switch (u.key) {
        case "ArrowDown":
          V = Math.min(N + 1, t.length - 1), u.preventDefault();
          break;
        case "ArrowUp":
          V = Math.max(N - 1, 0), u.preventDefault();
          break;
        case "Home":
          V = 0, u.preventDefault();
          break;
        case "End":
          V = t.length - 1, u.preventDefault();
          break;
        case " ":
        case "Enter":
          i && d(i), u.preventDefault(), u.stopPropagation();
          return;
        case "ArrowRight": {
          const R = C;
          if (R) {
            const _ = R.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            ), S = R.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            ), L = _ ?? S;
            if (L) {
              u.preventDefault(), L.focus();
              return;
            }
          }
          break;
        }
        default:
          u.key.length === 1 && !u.metaKey && !u.ctrlKey && !u.altKey && (m(g) || (o == null || o(u.key), u.preventDefault()));
          return;
      }
      const $ = t[V];
      $ && c($.id);
    },
    [t, c, i, l, d, o]
  );
  return {
    listboxRef: a,
    activeId: i,
    selectedId: l,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown: f,
    /** Focus an option by its ID */
    focusOption: c
  };
}, yw = pe(
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
), Be = v.forwardRef(
  ({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r("div", { ref: o, className: h("pr-twp", yw({ variant: e }), t), ...n })
);
Be.displayName = "Badge";
const Ya = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
Ya.displayName = "Card";
const Nw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Nw.displayName = "CardHeader";
const kw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "h3",
    {
      ref: n,
      className: h(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
kw.displayName = "CardTitle";
const _w = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("p", { ref: n, className: h("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
_w.displayName = "CardDescription";
const Xa = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Xa.displayName = "CardContent";
const Cw = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      className: h("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Cw.displayName = "CardFooter";
const Wa = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ye.Root,
  {
    ref: n,
    className: h(
      "pr-twp tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full",
      t
    ),
    ...e
  }
));
Wa.displayName = Ye.Root.displayName;
const Ew = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ye.Image,
  {
    ref: n,
    className: h("pr-twp tw-aspect-square tw-h-full tw-w-full", t),
    ...e
  }
));
Ew.displayName = Ye.Image.displayName;
const Ja = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Ye.Fallback,
  {
    ref: n,
    className: h(
      "pr-twp tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-muted",
      t
    ),
    ...e
  }
));
Ja.displayName = Ye.Fallback.displayName;
const qr = Ln(void 0);
function Gt() {
  const t = Tr(qr);
  if (!t)
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  return t;
}
const he = pe("", {
  variants: {
    variant: {
      default: "",
      muted: "hover:tw-bg-muted hover:tw-text-foreground focus:tw-bg-muted focus:tw-text-foreground data-[state=open]:tw-bg-muted data-[state=open]:tw-text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
}), Me = rt.Trigger, Za = rt.Group, Tw = rt.Portal, Rw = rt.Sub, Sw = rt.RadioGroup;
function be({ variant: t = "default", ...e }) {
  const n = v.useMemo(
    () => ({
      variant: t
    }),
    [t]
  );
  return /* @__PURE__ */ r(qr.Provider, { value: n, children: /* @__PURE__ */ r(rt.Root, { ...e }) });
}
const Qa = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Gt();
  return /* @__PURE__ */ p(
    rt.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
        e && "tw-pl-8",
        t,
        he({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(je, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
Qa.displayName = rt.SubTrigger.displayName;
const ti = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ft();
  return /* @__PURE__ */ r(
    rt.SubContent,
    {
      ref: o,
      className: h(
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...n,
      children: /* @__PURE__ */ r("div", { dir: a, children: e })
    }
  );
});
ti.displayName = rt.SubContent.displayName;
const de = v.forwardRef(({ className: t, sideOffset: e = 4, children: n, ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(rt.Portal, { children: /* @__PURE__ */ r(
    rt.Content,
    {
      ref: a,
      sideOffset: e,
      className: h(
        /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        t
      ),
      ...o,
      children: /* @__PURE__ */ r("div", { dir: i, children: n })
    }
  ) });
});
de.displayName = rt.Content.displayName;
const Pn = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = ft(), i = Gt();
  return /* @__PURE__ */ r(
    rt.Item,
    {
      ref: o,
      className: h(
        // removed: tw-relative focus:tw-text-accent-foreground
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        t,
        he({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a
    }
  );
});
Pn.displayName = rt.Item.displayName;
const le = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = ft(), s = Gt();
  return /* @__PURE__ */ p(
    rt.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        he({ variant: s.variant })
        // CUSTOM use context to add variants
      ),
      checked: n,
      ...o,
      dir: i,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
le.displayName = rt.CheckboxItem.displayName;
const ei = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = ft(), i = Gt();
  return /* @__PURE__ */ p(
    rt.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        t,
        he({ variant: i.variant })
        // CUSTOM use context to add variants
      ),
      ...n,
      dir: a,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center ltr:tw-left-2 rtl:tw-right-2", children: /* @__PURE__ */ r(rt.ItemIndicator, { children: /* @__PURE__ */ r(Vn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
ei.displayName = rt.RadioItem.displayName;
const bn = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  rt.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
bn.displayName = rt.Label.displayName;
const Ze = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  rt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ze.displayName = rt.Separator.displayName;
function Dw({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ms-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Dw.displayName = "DropdownMenuShortcut";
function _o({
  comment: t,
  isReply: e = !1,
  localizedStrings: n,
  isThreadExpanded: o = !1,
  handleUpdateComment: a,
  handleDeleteComment: i,
  onEditingChange: s,
  canEditOrDelete: l = !1
}) {
  const [w, c] = D(!1), [d, m] = D(), f = G(null);
  U(() => {
    if (!w) return;
    let N = !0;
    const V = f.current;
    if (!V) return;
    const $ = setTimeout(() => {
      N && Ka(V);
    }, 300);
    return () => {
      N = !1, clearTimeout($);
    };
  }, [w]);
  const u = B(
    (N) => {
      N && N.stopPropagation(), c(!1), m(void 0), s == null || s(!1);
    },
    [s]
  ), g = B(
    async (N) => {
      if (N && N.stopPropagation(), !d || !a) return;
      await a(
        t.id,
        An(d)
      ) && (c(!1), m(void 0), s == null || s(!1));
    },
    [d, a, t.id, s]
  ), b = z(() => {
    const N = new Date(t.date), V = vs(
      N,
      n["%comment_date_today%"],
      n["%comment_date_yesterday%"]
    ), $ = N.toLocaleTimeString(void 0, {
      hour: "numeric",
      minute: "2-digit"
    });
    return Ce(n["%comment_dateAtTime%"], {
      date: V,
      time: $
    });
  }, [t.date, n]), x = z(() => t.user, [t.user]), C = z(
    () => t.user.split(" ").map((N) => N[0]).join("").toUpperCase().slice(0, 2),
    [t.user]
  ), y = z(() => xs(t.contents), [t.contents]), k = z(() => {
    if (o && l)
      return /* @__PURE__ */ p(st, { children: [
        /* @__PURE__ */ p(
          Pn,
          {
            onClick: (N) => {
              N.stopPropagation(), c(!0), m(fw(t.contents)), s == null || s(!0);
            },
            children: [
              /* @__PURE__ */ r(ji, { className: "tw-me-2 tw-h-4 tw-w-4" }),
              n["%comment_editComment%"]
            ]
          }
        ),
        /* @__PURE__ */ p(
          Pn,
          {
            onClick: async (N) => {
              N.stopPropagation(), i && await i(t.id);
            },
            children: [
              /* @__PURE__ */ r(zi, { className: "tw-me-2 tw-h-4 tw-w-4" }),
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
      className: h("tw-flex tw-w-full tw-flex-row tw-items-baseline tw-gap-3 tw-space-y-3", {
        "tw-text-sm": e
      }),
      children: [
        /* @__PURE__ */ r(Wa, { className: "tw-h-8 tw-w-8", children: /* @__PURE__ */ r(Ja, { className: "tw-text-xs tw-font-medium", children: C }) }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-1 tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-flex-row tw-flex-wrap tw-items-baseline tw-gap-x-2", children: [
            /* @__PURE__ */ r("p", { className: "tw-text-sm tw-font-medium", children: x }),
            /* @__PURE__ */ r("p", { className: "tw-text-xs tw-font-normal tw-text-muted-foreground", children: b }),
            /* @__PURE__ */ r("div", { className: "tw-flex-1" }),
            e && t.assignedUser !== void 0 && /* @__PURE__ */ p(Be, { variant: "secondary", className: "tw-text-xs tw-font-normal", children: [
              "→ ",
              En(t.assignedUser, n)
            ] })
          ] }),
          w && /* @__PURE__ */ p(
            "div",
            {
              role: "textbox",
              tabIndex: -1,
              className: "tw-flex tw-flex-col tw-gap-2",
              ref: f,
              onKeyDownCapture: (N) => {
                N.key === "Escape" ? (N.preventDefault(), N.stopPropagation(), u()) : Ur(N) && (N.preventDefault(), N.stopPropagation(), Bt(d) && g());
              },
              onKeyDown: (N) => {
                Kr(N), (N.key === "Enter" || N.key === " ") && N.stopPropagation();
              },
              onClick: (N) => {
                N.stopPropagation();
              },
              children: [
                /* @__PURE__ */ r(
                  In,
                  {
                    className: h(
                      // Don't render blockquote on the first child. All comments are wrapped in blockquote
                      // that has text-align corresponding to LTR or RTL, so the blockquote is important.
                      // But we don't want it to look like there's a blockquote there. Target the
                      // lowest-level Lexical editor element by attribute so Tailwind can apply styles to
                      // the blockquote directly inside the editor.
                      '[&_[data-lexical-editor="true"]>blockquote]:tw-mt-0 [&_[data-lexical-editor="true"]>blockquote]:tw-border-s-0 [&_[data-lexical-editor="true"]>blockquote]:tw-ps-0 [&_[data-lexical-editor="true"]>blockquote]:tw-font-normal [&_[data-lexical-editor="true"]>blockquote]:tw-not-italic [&_[data-lexical-editor="true"]>blockquote]:tw-text-foreground'
                    ),
                    editorSerializedState: d,
                    onSerializedChange: (N) => m(N)
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
                      children: /* @__PURE__ */ r(hn, {})
                    }
                  ),
                  /* @__PURE__ */ r(
                    F,
                    {
                      size: "icon",
                      onClick: g,
                      className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                      disabled: !Bt(d),
                      children: /* @__PURE__ */ r(Po, {})
                    }
                  )
                ] })
              ]
            }
          ),
          !w && /* @__PURE__ */ p(st, { children: [
            t.status === "Resolved" && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_resolved%"] }),
            t.status === "Todo" && e && /* @__PURE__ */ r("div", { className: "tw-text-sm tw-italic", children: n["%comment_status_todo%"] }),
            /* @__PURE__ */ r(
              "div",
              {
                className: h(
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
        k && /* @__PURE__ */ p(be, { children: [
          /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "ghost", size: "icon", children: /* @__PURE__ */ r(Fi, {}) }) }),
          /* @__PURE__ */ r(de, { align: "end", children: k })
        ] })
      ]
    }
  );
}
const Co = {
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
function Mw({
  classNameForVerseText: t,
  comments: e,
  localizedStrings: n,
  isSelected: o = !1,
  verseRef: a,
  assignedUser: i,
  currentUser: s,
  handleSelectThread: l,
  threadId: w,
  thread: c,
  threadStatus: d,
  handleAddCommentToThread: m,
  handleUpdateComment: f,
  handleDeleteComment: u,
  handleReadStatusChange: g,
  assignableUsers: b,
  canUserAddCommentToThread: x,
  canUserAssignThreadCallback: C,
  canUserResolveThreadCallback: y,
  canUserEditOrDeleteCommentCallback: k,
  isRead: N = !1,
  autoReadDelay: V = 5,
  onVerseRefClick: $
}) {
  const [A, R] = D(Co), [_, S] = D(
    void 0
  ), L = o, [j, P] = D(!1), [I, q] = D(!1), [T, W] = D(!1), [Rt, zt] = D(!1), [Ft, bt] = D(!1), [ht, K] = D(N), [lt, vt] = D(!1), pt = G(void 0), [_t, re] = D(/* @__PURE__ */ new Map());
  U(() => {
    let E = !0;
    return (async () => {
      const et = y ? await y(w) : !1;
      E && bt(et);
    })(), () => {
      E = !1;
    };
  }, [w, y]), U(() => {
    let E = !0;
    if (!o) {
      zt(!1), re(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const et = C ? await C(w) : !1;
      E && zt(et);
    })(), () => {
      E = !1;
    };
  }, [o, w, C]);
  const xt = z(() => e.filter((E) => !E.deleted), [e]);
  U(() => {
    let E = !0;
    if (!o || !k) {
      re(/* @__PURE__ */ new Map());
      return;
    }
    return (async () => {
      const et = /* @__PURE__ */ new Map();
      await Promise.all(
        xt.map(async (St) => {
          const qt = await k(St.id);
          E && et.set(St.id, qt);
        })
      ), E && re(et);
    })(), () => {
      E = !1;
    };
  }, [o, xt, k]);
  const It = z(() => xt[0], [xt]), xe = G(null), Ut = G(void 0), oe = B(() => {
    var E;
    (E = Ut.current) == null || E.call(Ut), R(Co);
  }, []), tn = B(() => {
    const E = !ht;
    K(E), vt(!E), g == null || g(w, E);
  }, [ht, g, w]);
  U(() => {
    P(!1);
  }, [o]), U(() => {
    if (o && !ht && !lt) {
      const E = setTimeout(() => {
        K(!0), g == null || g(w, !0);
      }, V * 1e3);
      return pt.current = E, () => clearTimeout(E);
    }
    pt.current && (clearTimeout(pt.current), pt.current = void 0);
  }, [o, ht, lt, V, w, g]);
  const M = z(
    () => ({
      singleReply: n["%comment_thread_single_reply%"],
      multipleReplies: n["%comment_thread_multiple_replies%"]
    }),
    [n]
  ), X = z(() => {
    if (i === void 0)
      return;
    if (i === "")
      return n["%comment_assign_unassigned%"] ?? "Unassigned";
    const E = En(i, n);
    return Ce(n["%comment_assigned_to%"], {
      assignedUser: E
    });
  }, [i, n]), Q = z(() => xt.slice(1), [xt]), tt = z(() => Q.length ?? 0, [Q.length]), ut = z(() => tt > 0, [tt]), At = z(() => j || tt <= 2 ? Q : Q.slice(-2), [Q, tt, j]), O = z(() => j || tt <= 2 ? 0 : tt - 2, [tt, j]), H = z(
    () => tt === 1 ? M.singleReply : Ce(M.multipleReplies, { count: tt }),
    [tt, M]
  ), it = z(
    () => O === 1 ? M.singleReply : Ce(M.multipleReplies, { count: O }),
    [O, M]
  );
  U(() => {
    !o && I && ut && q(!1);
  }, [o, I, ut]);
  const ct = B(
    async (E) => {
      E && E.stopPropagation();
      const wt = Bt(A) ? An(A) : void 0;
      if (_ !== void 0) {
        await m({
          threadId: w,
          contents: wt,
          assignedUser: _
        }) && (S(void 0), wt && oe());
        return;
      }
      wt && await m({ threadId: w, contents: wt }) && oe();
    },
    [
      oe,
      A,
      m,
      _,
      w
    ]
  ), yt = B(
    async (E) => {
      const wt = Bt(A) ? An(A) : void 0, et = await m({
        ...E,
        contents: wt,
        assignedUser: _ ?? E.assignedUser
      });
      return et && wt && oe(), et && _ !== void 0 && S(void 0), et;
    },
    [oe, A, m, _]
  );
  if (It)
    return /* @__PURE__ */ r(
      Ya,
      {
        role: "option",
        "aria-selected": o,
        id: w,
        className: h(
          "tw-group tw-w-full tw-rounded-none tw-border-none tw-p-4 tw-outline-none tw-transition-all tw-duration-200 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
          { "tw-cursor-pointer hover:tw-shadow-md": !o },
          {
            "tw-bg-primary-foreground": !o && d !== "Resolved" && ht,
            "tw-bg-background": o && d !== "Resolved" && ht,
            "tw-bg-muted": d === "Resolved",
            "tw-bg-accent": !ht && !o && d !== "Resolved"
          }
        ),
        onClick: () => {
          l(w);
        },
        tabIndex: -1,
        children: /* @__PURE__ */ p(Xa, { className: "tw-flex tw-flex-col tw-gap-2 tw-p-0", children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-content-center tw-items-start tw-gap-4", children: [
            /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
              X && /* @__PURE__ */ r(Be, { className: "tw-rounded-sm tw-bg-input tw-text-sm tw-font-normal tw-text-primary hover:tw-bg-input", children: X }),
              /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  onClick: (E) => {
                    E.stopPropagation(), tn();
                  },
                  className: "tw-text-muted-foreground tw-transition hover:tw-text-foreground",
                  "aria-label": ht ? "Mark as unread" : "Mark as read",
                  children: ht ? /* @__PURE__ */ r(Bi, {}) : /* @__PURE__ */ r(Ki, {})
                }
              ),
              Ft && d !== "Resolved" && /* @__PURE__ */ r(
                F,
                {
                  variant: "ghost",
                  size: "icon",
                  className: h(
                    "tw-ms-auto",
                    "tw-text-primary tw-transition-opacity tw-duration-200 hover:tw-bg-primary/10",
                    "tw-opacity-0 group-hover:tw-opacity-100"
                  ),
                  onClick: (E) => {
                    E.stopPropagation(), yt({
                      threadId: w,
                      status: "Resolved"
                    });
                  },
                  "aria-label": "Resolve thread",
                  children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" })
                }
              )
            ] }),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-max-w-full tw-flex-wrap tw-items-baseline tw-gap-2", children: /* @__PURE__ */ p(
              "p",
              {
                ref: xe,
                className: h(
                  "tw-flex-1 tw-overflow-hidden tw-text-ellipsis tw-text-sm tw-font-normal tw-text-muted-foreground",
                  {
                    "tw-overflow-visible tw-text-clip tw-whitespace-normal tw-break-words": L
                  },
                  { "tw-whitespace-nowrap": !L }
                ),
                children: [
                  a && $ ? /* @__PURE__ */ r(
                    F,
                    {
                      variant: "ghost",
                      size: "sm",
                      className: "tw-h-auto tw-px-1 tw-py-0 tw-text-sm tw-font-normal tw-text-muted-foreground",
                      onClick: (E) => {
                        E.stopPropagation(), $(c);
                      },
                      children: a
                    }
                  ) : a,
                  /* @__PURE__ */ p("span", { className: t, children: [
                    It.contextBefore,
                    /* @__PURE__ */ r("span", { className: "tw-font-bold", children: It.selectedText }),
                    It.contextAfter
                  ] })
                ]
              }
            ) }),
            /* @__PURE__ */ r(
              _o,
              {
                comment: It,
                localizedStrings: n,
                isThreadExpanded: o,
                threadStatus: d,
                handleAddCommentToThread: yt,
                handleUpdateComment: f,
                handleDeleteComment: u,
                onEditingChange: q,
                canEditOrDelete: (!I && _t.get(It.id)) ?? !1,
                canUserResolveThread: Ft
              }
            )
          ] }),
          /* @__PURE__ */ p(st, { children: [
            ut && !o && /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-5", children: [
              /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(De, {}) }),
              /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: H })
            ] }),
            !o && Bt(A) && /* @__PURE__ */ r(
              In,
              {
                editorSerializedState: A,
                onSerializedChange: (E) => R(E),
                placeholder: n["%comment_replyOrAssign%"]
              }
            ),
            o && /* @__PURE__ */ p(st, { children: [
              O > 0 && /* @__PURE__ */ p(
                "div",
                {
                  className: "tw-flex tw-cursor-pointer tw-items-center tw-gap-5 tw-py-2",
                  onClick: (E) => {
                    E.stopPropagation(), P(!0);
                  },
                  role: "button",
                  tabIndex: 0,
                  onKeyDown: (E) => {
                    (E.key === "Enter" || E.key === " ") && (E.preventDefault(), E.stopPropagation(), P(!0));
                  },
                  children: [
                    /* @__PURE__ */ r("div", { className: "tw-w-8", children: /* @__PURE__ */ r(De, {}) }),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
                      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: it }),
                      j ? /* @__PURE__ */ r($o, {}) : /* @__PURE__ */ r(Ue, {})
                    ] })
                  ]
                }
              ),
              At.map((E) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
                _o,
                {
                  comment: E,
                  localizedStrings: n,
                  isReply: !0,
                  isThreadExpanded: o,
                  handleUpdateComment: f,
                  handleDeleteComment: u,
                  onEditingChange: q,
                  canEditOrDelete: (!I && _t.get(E.id)) ?? !1
                }
              ) }, E.id)),
              x !== !1 && (!I || Bt(A)) && /* @__PURE__ */ p(
                "div",
                {
                  role: "textbox",
                  tabIndex: -1,
                  className: "tw-w-full tw-space-y-2",
                  onClick: (E) => E.stopPropagation(),
                  onKeyDownCapture: (E) => {
                    Ur(E) && (E.preventDefault(), E.stopPropagation(), (Bt(A) || _ !== void 0) && ct());
                  },
                  onKeyDown: (E) => {
                    Kr(E), (E.key === "Enter" || E.key === " ") && E.stopPropagation();
                  },
                  children: [
                    /* @__PURE__ */ r(
                      In,
                      {
                        editorSerializedState: A,
                        onSerializedChange: (E) => R(E),
                        placeholder: d === "Resolved" ? n["%comment_reopenResolved%"] : n["%comment_replyOrAssign%"],
                        autoFocus: !0,
                        onClear: (E) => {
                          Ut.current = E;
                        }
                      }
                    ),
                    /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-row tw-items-center tw-justify-end tw-gap-2", children: [
                      _ !== void 0 && /* @__PURE__ */ r("span", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: Ce(
                        n["%comment_assigning_to%"] ?? "Assigning to: {assignedUser}",
                        {
                          assignedUser: En(
                            _,
                            n
                          )
                        }
                      ) }),
                      /* @__PURE__ */ p(fe, { open: T, onOpenChange: W, children: [
                        /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ r(
                          F,
                          {
                            size: "icon",
                            variant: "outline",
                            className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                            disabled: !Rt || !b || b.length === 0 || !b.includes(s),
                            "aria-label": "Assign user",
                            children: /* @__PURE__ */ r(Ao, {})
                          }
                        ) }),
                        /* @__PURE__ */ r(
                          ee,
                          {
                            className: "tw-w-auto tw-p-0",
                            align: "end",
                            onKeyDown: (E) => {
                              E.key === "Escape" && (E.stopPropagation(), W(!1));
                            },
                            children: /* @__PURE__ */ r(ue, { children: /* @__PURE__ */ r(me, { children: b == null ? void 0 : b.map((E) => /* @__PURE__ */ r(
                              te,
                              {
                                onSelect: () => {
                                  S(E !== i ? E : void 0), W(!1);
                                },
                                className: "tw-flex tw-items-center",
                                children: /* @__PURE__ */ r("span", { children: En(E, n) })
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
                          onClick: ct,
                          className: "tw-flex tw-items-center tw-justify-center tw-rounded-md",
                          disabled: !Bt(A) && _ === void 0,
                          "aria-label": "Submit comment",
                          children: /* @__PURE__ */ r(Po, {})
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
function uu({
  className: t = "",
  classNameForVerseText: e,
  threads: n,
  currentUser: o,
  localizedStrings: a,
  handleAddCommentToThread: i,
  handleUpdateComment: s,
  handleDeleteComment: l,
  handleReadStatusChange: w,
  assignableUsers: c,
  canUserAddCommentToThread: d,
  canUserAssignThreadCallback: m,
  canUserResolveThreadCallback: f,
  canUserEditOrDeleteCommentCallback: u,
  selectedThreadId: g,
  onSelectedThreadChange: b,
  onVerseRefClick: x
}) {
  const [C, y] = D(/* @__PURE__ */ new Set()), [k, N] = D();
  U(() => {
    g && (y((P) => new Set(P).add(g)), N(g));
  }, [g]);
  const V = n.filter(
    (P) => P.comments.some((I) => !I.deleted)
  ), $ = V.map((P) => ({ id: P.id })), A = B(
    (P) => {
      y((I) => new Set(I).add(P.id)), N(P.id), b == null || b(P.id);
    },
    [b]
  ), R = B(
    (P) => {
      const I = C.has(P);
      y((q) => {
        const T = new Set(q);
        return T.has(P) ? T.delete(P) : T.add(P), T;
      }), N(P), b == null || b(I ? void 0 : P);
    },
    [C, b]
  ), { listboxRef: _, activeId: S, handleKeyDown: L } = xw({
    options: $,
    onOptionSelect: A
  }), j = B(
    (P) => {
      P.key === "Escape" ? (k && C.has(k) && (y((I) => {
        const q = new Set(I);
        return q.delete(k), q;
      }), N(void 0), b == null || b(void 0)), P.preventDefault(), P.stopPropagation()) : L(P);
    },
    [k, C, L, b]
  );
  return /* @__PURE__ */ r(
    "div",
    {
      id: "comment-list",
      role: "listbox",
      tabIndex: 0,
      ref: _,
      "aria-activedescendant": S ?? void 0,
      "aria-label": "Comments",
      className: h(
        "tw-flex tw-w-full tw-flex-col tw-space-y-3 tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        t
      ),
      onKeyDown: j,
      children: V.map((P) => /* @__PURE__ */ r(
        "div",
        {
          className: h({
            "tw-opacity-60": P.status === "Resolved"
          }),
          children: /* @__PURE__ */ r(
            Mw,
            {
              classNameForVerseText: e,
              comments: P.comments,
              localizedStrings: a,
              verseRef: P.verseRef,
              handleSelectThread: R,
              threadId: P.id,
              thread: P,
              isRead: P.isRead,
              isSelected: C.has(P.id),
              currentUser: o,
              assignedUser: P.assignedUser,
              threadStatus: P.status,
              handleAddCommentToThread: i,
              handleUpdateComment: s,
              handleDeleteComment: l,
              handleReadStatusChange: w,
              assignableUsers: c,
              canUserAddCommentToThread: d,
              canUserAssignThreadCallback: m,
              canUserResolveThreadCallback: f,
              canUserEditOrDeleteCommentCallback: u,
              onVerseRefClick: x
            }
          )
        },
        P.id
      ))
    }
  );
}
function Ow({ table: t }) {
  return /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(kl, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ r(Gi, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ p(de, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ r(bn, { children: "Toggle columns" }),
      /* @__PURE__ */ r(Ze, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ r(
        le,
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
const Ke = dt.Root, Iw = dt.Group, Ge = dt.Value, Aw = pe(
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
), Oe = v.forwardRef(({ className: t, children: e, size: n, ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ p(
    dt.Trigger,
    {
      className: h(Aw({ size: n, className: t })),
      ref: a,
      ...o,
      dir: i,
      children: [
        e,
        /* @__PURE__ */ r(dt.Icon, { asChild: !0, children: /* @__PURE__ */ r(Ue, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
      ]
    }
  );
});
Oe.displayName = dt.Trigger.displayName;
const ni = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollUpButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r($o, { className: "tw-h-4 tw-w-4" })
  }
));
ni.displayName = dt.ScrollUpButton.displayName;
const ri = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.ScrollDownButton,
  {
    ref: n,
    className: h("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ r(Ue, { className: "tw-h-4 tw-w-4" })
  }
));
ri.displayName = dt.ScrollDownButton.displayName;
const Ie = v.forwardRef(({ className: t, children: e, position: n = "popper", ...o }, a) => {
  const i = ft();
  return /* @__PURE__ */ r(dt.Portal, { children: /* @__PURE__ */ p(
    dt.Content,
    {
      ref: a,
      className: h(
        "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
        t
      ),
      position: n,
      ...o,
      children: [
        /* @__PURE__ */ r(ni, {}),
        /* @__PURE__ */ r(
          dt.Viewport,
          {
            className: h(
              "tw-p-1",
              n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
            ),
            children: /* @__PURE__ */ r("div", { dir: i, children: e })
          }
        ),
        /* @__PURE__ */ r(ri, {})
      ]
    }
  ) });
});
Ie.displayName = dt.Content.displayName;
const Pw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Label,
  {
    ref: n,
    className: h("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Pw.displayName = dt.Label.displayName;
const Pt = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  dt.Item,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pe-2 tw-ps-8 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-start-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(dt.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ r(dt.ItemText, { children: e })
    ]
  }
));
Pt.displayName = dt.Item.displayName;
const $w = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  dt.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
$w.displayName = dt.Separator.displayName;
function Lw({ table: t }) {
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
        Ke,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ r(Oe, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ r(Ge, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ r(Ie, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ r(Pt, { value: `${e}`, children: e }, e)) })
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
            /* @__PURE__ */ r(Ui, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(qi, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Hi, { className: "tw-h-4 tw-w-4" })
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
            /* @__PURE__ */ r(Yi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Eo = `
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
function Vw(t) {
  return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
}
function un(t, e) {
  const n = e ? `${Eo}, ${e}` : Eo;
  return Array.from(t.querySelectorAll(n)).filter(
    (o) => !o.hasAttribute("disabled") && !o.getAttribute("aria-hidden") && Vw(o)
  );
}
const Fn = v.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => {
  const a = v.useRef(null);
  v.useEffect(() => {
    typeof o == "function" ? o(a.current) : o && "current" in o && (o.current = a.current);
  }, [o]), v.useEffect(() => {
    const s = a.current;
    if (!s) return;
    const l = () => {
      requestAnimationFrame(() => {
        un(s, '[tabindex]:not([tabindex="-1"])').forEach((d) => {
          d.setAttribute("tabindex", "-1");
        });
      });
    };
    l();
    const w = new MutationObserver(() => {
      l();
    });
    return w.observe(s, {
      childList: !0,
      // Watch for added/removed elements
      subtree: !0,
      // Include descendants
      attributes: !0,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    }), () => {
      w.disconnect();
    };
  }, []);
  const i = (s) => {
    const { current: l } = a;
    if (l) {
      if (s.key === "ArrowDown") {
        s.preventDefault(), un(l)[0].focus();
        return;
      }
      s.key === " " && document.activeElement === l && s.preventDefault();
    }
  };
  return /* @__PURE__ */ r("div", { className: h("pr-twp tw-relative tw-w-full", { "tw-p-1": e }), children: /* @__PURE__ */ r(
    "table",
    {
      tabIndex: 0,
      onKeyDown: i,
      ref: a,
      className: h(
        "tw-w-full tw-caption-bottom tw-text-sm tw-outline-none",
        // CUSTOM: Add outline-none to remove duplicate outline
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        // CUSTOM: Add focus styles
        t
      ),
      "aria-label": "Table",
      "aria-labelledby": "table-label",
      ...n
    }
  ) });
});
Fn.displayName = "Table";
const Bn = v.forwardRef(({ className: t, stickyHeader: e, ...n }, o) => /* @__PURE__ */ r(
  "thead",
  {
    ref: o,
    className: h(
      {
        "tw-sticky tw-top-[-1px] tw-z-20 tw-bg-background tw-drop-shadow-sm": e
      },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
Bn.displayName = "TableHeader";
const Kn = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("tbody", { ref: n, className: h("[&_tr:last-child]:tw-border-0", t), ...e }));
Kn.displayName = "TableBody";
const jw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "tfoot",
  {
    ref: n,
    className: h("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
jw.displayName = "TableFooter";
function zw(t) {
  v.useEffect(() => {
    const e = t.current;
    if (!e) return;
    const n = (o) => {
      if (e.contains(document.activeElement)) {
        if (o.key === "ArrowRight" || o.key === "ArrowLeft") {
          o.preventDefault(), o.stopPropagation();
          const a = t.current ? un(t.current) : [], i = a.indexOf(document.activeElement), s = o.key === "ArrowRight" ? i + 1 : i - 1;
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
function Fw(t, e, n) {
  let o;
  return n === "ArrowLeft" && e > 0 ? o = t[e - 1] : n === "ArrowRight" && e < t.length - 1 && (o = t[e + 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
function Bw(t, e, n) {
  let o;
  return n === "ArrowDown" && e < t.length - 1 ? o = t[e + 1] : n === "ArrowUp" && e > 0 && (o = t[e - 1]), o ? (requestAnimationFrame(() => o.focus()), !0) : !1;
}
const ae = v.forwardRef(({ className: t, onKeyDown: e, onSelect: n, setFocusAlsoRunsSelect: o = !1, ...a }, i) => {
  const s = v.useRef(null);
  v.useEffect(() => {
    typeof i == "function" ? i(s.current) : i && "current" in i && (i.current = s.current);
  }, [i]), zw(s);
  const l = v.useMemo(
    () => s.current ? un(s.current) : [],
    [s]
  ), w = v.useCallback(
    (d) => {
      const { current: m } = s;
      if (!m || !m.parentElement) return;
      const f = m.closest("table"), u = f ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        un(f).filter(
          (x) => x.tagName === "TR"
        )
      ) : [], g = u.indexOf(m), b = l.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (d.key === "ArrowDown" || d.key === "ArrowUp")
        d.preventDefault(), Bw(u, g, d.key);
      else if (d.key === "ArrowLeft" || d.key === "ArrowRight")
        d.preventDefault(), Fw(l, b, d.key);
      else if (d.key === "Escape") {
        d.preventDefault();
        const x = m.closest("table");
        x && x.focus();
      }
      e == null || e(d);
    },
    [s, l, e]
  ), c = v.useCallback(
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
      onKeyDown: w,
      onFocus: c,
      className: h(
        // CUSTOM: Add focus styles and add tw-outline-none so there isn't a duplicate outline
        "tw-border-b tw-outline-none tw-transition-colors hover:tw-bg-muted/50",
        "focus:tw-relative focus:tw-z-10 focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-1 focus:tw-ring-offset-background",
        "data-[state=selected]:tw-bg-muted",
        t
      ),
      ...a
    }
  );
});
ae.displayName = "TableRow";
const mn = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "th",
  {
    ref: n,
    className: h(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
mn.displayName = "TableHead";
const Re = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "td",
  {
    ref: n,
    className: h("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Re.displayName = "TableCell";
const Kw = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "caption",
  {
    ref: n,
    className: h("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Kw.displayName = "TableCaption";
function yr({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
function Gw({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: o = !1,
  showColumnVisibilityControls: a = !1,
  stickyHeader: i = !1,
  onRowClickHandler: s = () => {
  },
  id: l,
  isLoading: w = !1,
  noResultsMessage: c
}) {
  var $;
  const [d, m] = D([]), [f, u] = D([]), [g, b] = D({}), [x, C] = D({}), y = z(() => e ?? [], [e]), k = ia({
    data: y,
    columns: t,
    getCoreRowModel: la(),
    ...n && { getPaginationRowModel: Cl() },
    onSortingChange: m,
    getSortedRowModel: sa(),
    onColumnFiltersChange: u,
    getFilteredRowModel: _l(),
    onColumnVisibilityChange: b,
    onRowSelectionChange: C,
    state: {
      sorting: d,
      columnFilters: f,
      columnVisibility: g,
      rowSelection: x
    }
  }), N = k.getVisibleFlatColumns();
  let V;
  return w ? V = Array.from({ length: 10 }).map((_, S) => `skeleton-row-${S}`).map((_) => /* @__PURE__ */ r(ae, { className: "hover:tw-bg-transparent", children: /* @__PURE__ */ r(Re, { colSpan: N.length ?? t.length, className: "tw-border-0 tw-p-0", children: /* @__PURE__ */ r("div", { className: "tw-w-full tw-py-2", children: /* @__PURE__ */ r(yr, { className: "tw-h-14 tw-w-full tw-rounded-md" }) }) }) }, _)) : (($ = k.getRowModel().rows) == null ? void 0 : $.length) > 0 ? V = k.getRowModel().rows.map((A) => /* @__PURE__ */ r(
    ae,
    {
      onClick: () => s(A, k),
      "data-state": A.getIsSelected() && "selected",
      children: A.getVisibleCells().map((R) => /* @__PURE__ */ r(Re, { children: ln(R.column.columnDef.cell, R.getContext()) }, R.id))
    },
    A.id
  )) : V = /* @__PURE__ */ r(ae, { children: /* @__PURE__ */ r(Re, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: c }) }), /* @__PURE__ */ p("div", { className: "pr-twp", id: l, children: [
    a && /* @__PURE__ */ r(Ow, { table: k }),
    /* @__PURE__ */ p(Fn, { stickyHeader: i, children: [
      /* @__PURE__ */ r(Bn, { stickyHeader: i, children: k.getHeaderGroups().map((A) => /* @__PURE__ */ r(ae, { children: A.headers.map((R) => /* @__PURE__ */ r(mn, { className: "tw-p-0", children: R.isPlaceholder ? void 0 : ln(R.column.columnDef.header, R.getContext()) }, R.id)) }, A.id)) }),
      /* @__PURE__ */ r(Kn, { children: V })
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
    n && o && /* @__PURE__ */ r(Lw, { table: k })
  ] });
}
function mu({
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
      className: h(
        "pr-twp tw-prose",
        {
          "tw-line-clamp-3 tw-max-h-10 tw-overflow-hidden tw-text-ellipsis tw-break-words": a
        },
        n
      ),
      children: /* @__PURE__ */ r(Rl, { options: i, children: e })
    }
  );
}
const Uw = Object.freeze([
  "%webView_error_dump_header%",
  "%webView_error_dump_info_message%"
]), To = (t, e) => t[e] ?? e;
function qw({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  id: o
}) {
  const a = To(n, "%webView_error_dump_header%"), i = To(n, "%webView_error_dump_info_message%");
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
          /* @__PURE__ */ r(F, { variant: "secondary", size: "icon", className: "size-8", onClick: () => s(), children: /* @__PURE__ */ r(Lo, {}) })
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-prose tw-w-full", children: /* @__PURE__ */ r("pre", { className: "tw-text-xs", children: t }) })
      ]
    }
  );
}
const fu = Object.freeze([
  ...Uw,
  "%webView_error_dump_copied_message%"
]);
function hu({
  errorDetails: t,
  handleCopyNotify: e,
  localizedStrings: n,
  children: o,
  className: a,
  id: i
}) {
  const [s, l] = D(!1), w = () => {
    l(!0), e && e();
  };
  return /* @__PURE__ */ p(fe, { onOpenChange: (d) => {
    d || l(!1);
  }, children: [
    /* @__PURE__ */ r(ve, { asChild: !0, children: o }),
    /* @__PURE__ */ p(ee, { id: i, className: h("tw-min-w-80 tw-max-w-96", a), children: [
      s && n["%webView_error_dump_copied_message%"] && /* @__PURE__ */ r(gt, { children: n["%webView_error_dump_copied_message%"] }),
      /* @__PURE__ */ r(
        qw,
        {
          errorDetails: t,
          handleCopyNotify: w,
          localizedStrings: n
        }
      )
    ] })
  ] });
}
var Hw = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Hw || {});
function gu({ id: t, label: e, groups: n }) {
  const [o, a] = D(
    Object.fromEntries(
      n.map(
        (c, d) => c.itemType === 0 ? [d, []] : void 0
      ).filter((c) => !!c)
    )
  ), [i, s] = D({}), l = (c, d) => {
    const m = !o[c][d];
    a((u) => (u[c][d] = m, { ...u }));
    const f = n[c].items[d];
    f.onUpdate(f.id, m);
  }, w = (c, d) => {
    s((f) => (f[c] = d, { ...f }));
    const m = n[c].items.find((f) => f.id === d);
    m ? m.onUpdate(d) : console.error(`Could not find dropdown radio item with id '${d}'!`);
  };
  return /* @__PURE__ */ r("div", { id: t, children: /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ p(F, { variant: "default", children: [
      /* @__PURE__ */ r(Xi, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4" }),
      e,
      /* @__PURE__ */ r(Ue, { size: 16, className: "tw-ml-2 tw-h-4 tw-w-4" })
    ] }) }),
    /* @__PURE__ */ r(de, { children: n.map((c, d) => /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r(bn, { children: c.label }),
      /* @__PURE__ */ r(Za, { children: c.itemType === 0 ? /* @__PURE__ */ r(st, { children: c.items.map((m, f) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(
        le,
        {
          checked: o[d][f],
          onCheckedChange: () => l(d, f),
          children: m.label
        }
      ) }, m.id)) }) : /* @__PURE__ */ r(
        Sw,
        {
          value: i[d],
          onValueChange: (m) => w(d, m),
          children: c.items.map((m) => /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(ei, { value: m.id, children: m.label }) }, m.id))
        }
      ) }),
      /* @__PURE__ */ r(Ze, {})
    ] }, c.label)) })
  ] }) });
}
function bu({
  id: t,
  category: e,
  downloads: n,
  languages: o,
  moreInfoUrl: a,
  handleMoreInfoLinkClick: i,
  supportUrl: s,
  handleSupportLinkClick: l
}) {
  const w = new ys("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((d, m) => d + m, 0)), c = () => {
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
            /* @__PURE__ */ r(Wi, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: w })
          ] }),
          /* @__PURE__ */ r("span", { className: "tw-text-xs tw-text-foreground", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-1 tw-ps-4", children: [
          /* @__PURE__ */ r("div", { className: "tw-flex tw-gap-2", children: o.slice(0, 3).map((d) => /* @__PURE__ */ r("span", { className: "tw-text-xs tw-font-semibold tw-text-foreground", children: d.toUpperCase() }, d)) }),
          o.length > 3 && /* @__PURE__ */ p(
            "button",
            {
              type: "button",
              onClick: () => c(),
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
                /* @__PURE__ */ r(Ji, { className: "tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ r(Zi, { className: "tw-h-4 tw-w-4" })
              ]
            }
          ) })
        ] })
      ]
    }
  );
}
function Yw({ id: t, versionHistory: e }) {
  const [n, o] = D(!1), a = /* @__PURE__ */ new Date();
  function i(l) {
    const w = new Date(l), c = new Date(a.getTime() - w.getTime()), d = c.getUTCFullYear() - 1970, m = c.getUTCMonth(), f = c.getUTCDate() - 1;
    let u = "";
    return d > 0 ? u = `${d.toString()} year${d === 1 ? "" : "s"} ago` : m > 0 ? u = `${m.toString()} month${m === 1 ? "" : "s"} ago` : f === 0 ? u = "today" : u = `${f.toString()} day${f === 1 ? "" : "s"} ago`, u;
  }
  const s = Object.entries(e).sort((l, w) => w[0].localeCompare(l[0]));
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
function vu({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: o,
  versionHistory: a,
  currentVersion: i
}) {
  const s = z(() => Ns(n), [n]), w = ((c) => {
    const d = new Intl.DisplayNames(ks(), { type: "language" });
    return c.map((m) => d.of(m));
  })(o);
  return /* @__PURE__ */ r("div", { id: t, className: "pr-twp tw-border-t tw-py-2", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-flex-col tw-gap-2 tw-divide-y", children: [
    Object.entries(a).length > 0 && /* @__PURE__ */ r(Yw, { versionHistory: a }),
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
          /* @__PURE__ */ r("span", { className: "tw-font-semibold", children: w.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function Xw({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  hasToggleAllFeature: a = !1,
  selectAllText: i = "Select All",
  clearAllText: s = "Clear All",
  commandEmptyMessage: l = "No entries found",
  customSelectedText: w,
  isOpen: c = void 0,
  onOpenChange: d = void 0,
  isDisabled: m = !1,
  sortSelected: f = !1,
  icon: u = void 0,
  className: g = void 0,
  variant: b = "ghost",
  id: x
}) {
  const [C, y] = D(!1), k = B(
    (S) => {
      var j;
      const L = (j = t.find((P) => P.label === S)) == null ? void 0 : j.value;
      L && n(
        e.includes(L) ? e.filter((P) => P !== L) : [...e, L]
      );
    },
    [t, e, n]
  ), N = () => w || o, V = z(() => {
    if (!f) return t;
    const S = t.filter((j) => j.starred).sort((j, P) => j.label.localeCompare(P.label)), L = t.filter((j) => !j.starred).sort((j, P) => {
      const I = e.includes(j.value), q = e.includes(P.value);
      return I && !q ? -1 : !I && q ? 1 : j.label.localeCompare(P.label);
    });
    return [...S, ...L];
  }, [t, e, f]), $ = () => {
    n(t.map((S) => S.value));
  }, A = () => {
    n([]);
  }, R = c ?? C;
  return /* @__PURE__ */ r("div", { id: x, className: g, children: /* @__PURE__ */ p(fe, { open: R, onOpenChange: d ?? y, children: [
    /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ p(
      F,
      {
        variant: b,
        role: "combobox",
        "aria-expanded": R,
        className: "tw-group tw-w-full tw-justify-between",
        disabled: m,
        children: [
          /* @__PURE__ */ p("div", { className: "tw-flex tw-min-w-0 tw-flex-1 tw-items-center tw-gap-2", children: [
            u && /* @__PURE__ */ r("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ r("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: u }) }),
            /* @__PURE__ */ r(
              "span",
              {
                className: h(
                  "tw-min-w-0 tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap tw-text-start tw-font-normal"
                ),
                children: N()
              }
            )
          ] }),
          /* @__PURE__ */ r(Vo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ r(ee, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ p(ue, { children: [
      /* @__PURE__ */ r(We, { placeholder: `Search ${o.toLowerCase()}...` }),
      a && /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: $, children: i }),
        /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: A, children: s })
      ] }),
      /* @__PURE__ */ p(me, { children: [
        /* @__PURE__ */ r(gn, { children: l }),
        /* @__PURE__ */ r(Jt, { children: V.map((S) => /* @__PURE__ */ p(
          te,
          {
            value: S.label,
            onSelect: k,
            className: "tw-flex tw-items-center tw-gap-2",
            children: [
              /* @__PURE__ */ r("div", { className: "w-4", children: /* @__PURE__ */ r(
                Qt,
                {
                  className: h(
                    "tw-h-4 tw-w-4",
                    e.includes(S.value) ? "tw-opacity-100" : "tw-opacity-0"
                  )
                }
              ) }),
              S.starred && /* @__PURE__ */ r(Qi, { className: "tw-h-4 tw-w-4" }),
              /* @__PURE__ */ r("div", { className: "tw-flex-grow", children: S.label }),
              S.secondaryLabel && /* @__PURE__ */ r("div", { className: "tw-text-end tw-text-muted-foreground", children: S.secondaryLabel })
            ]
          },
          S.label
        )) })
      ] })
    ] }) })
  ] }) });
}
function xu({
  entries: t,
  selected: e,
  onChange: n,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: i,
  isDisabled: s,
  sortSelected: l,
  icon: w,
  className: c,
  badgesPlaceholder: d,
  id: m
}) {
  return /* @__PURE__ */ p("div", { id: m, className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ r(
      Xw,
      {
        entries: t,
        selected: e,
        onChange: n,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: i,
        isDisabled: s,
        sortSelected: l,
        icon: w,
        className: c
      }
    ),
    e.length > 0 ? /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: e.map((f) => {
      var u;
      return /* @__PURE__ */ p(Be, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ r(
          F,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => n(e.filter((g) => g !== f)),
            children: /* @__PURE__ */ r(hn, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (u = t.find((g) => g.value === f)) == null ? void 0 : u.label
      ] }, f);
    }) }) : /* @__PURE__ */ r(gt, { children: d })
  ] });
}
const Nr = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  "kbd",
  {
    ref: n,
    className: h(
      "pr-twp tw-rounded tw-border tw-border-border tw-bg-muted tw-px-1 tw-py-0.5 tw-font-mono tw-text-xs",
      t
    ),
    ...e
  }
));
Nr.displayName = "Kbd";
const Ww = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]), Ro = (t, e) => t[e] ?? e;
function Jw({
  onUndoClick: t,
  onRedoClick: e,
  canUndo: n = !0,
  canRedo: o = !0,
  localizedStrings: a = {},
  showKeyboardShortcuts: i = !0,
  className: s = "tw-h-6 tw-w-6",
  variant: l = "ghost"
}) {
  const w = z(() => /Macintosh/i.test(navigator.userAgent), []), c = Ro(a, "%undoButton_tooltip%"), d = Ro(a, "%redoButton_tooltip%");
  return /* @__PURE__ */ p(Gr, { children: [
    /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": c,
          className: s,
          size: "icon",
          onClick: t,
          disabled: !n,
          variant: l,
          children: /* @__PURE__ */ r(ts, {})
        }
      ) }),
      /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ p("p", { children: [
        c,
        i && /* @__PURE__ */ p(st, { children: [
          " ",
          /* @__PURE__ */ r(Nr, { children: w ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    e && (l === "secondary" || l === "default") && /* @__PURE__ */ r(Ua, {}),
    e && /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
        F,
        {
          "aria-label": d,
          className: s,
          size: "icon",
          onClick: e,
          disabled: !o,
          variant: l,
          children: /* @__PURE__ */ r(es, {})
        }
      ) }),
      /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ p("p", { children: [
        d,
        i && /* @__PURE__ */ p(st, { children: [
          " ",
          /* @__PURE__ */ r(Nr, { children: w ? "⌘⇧Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function Zw({
  children: t,
  editorRef: e,
  canUndo: n = !0,
  canRedo: o = !0
}) {
  const a = G(null);
  return U(() => {
    var w;
    const i = /Macintosh/i.test(navigator.userAgent), s = ((w = a.current) == null ? void 0 : w.querySelector(".editor-input")) ?? void 0, l = (c) => {
      var m, f, u, g;
      if (!s || document.activeElement !== s) return;
      const d = c.key.toLowerCase();
      if (i) {
        if (!c.metaKey) return;
        !c.shiftKey && d === "z" ? (c.preventDefault(), n && ((m = e.current) == null || m.undo())) : c.shiftKey && d === "z" && (c.preventDefault(), o && ((f = e.current) == null || f.redo()));
      } else {
        if (!c.ctrlKey) return;
        !c.shiftKey && d === "z" ? (c.preventDefault(), n && ((u = e.current) == null || u.undo())) : (d === "y" || c.shiftKey && d === "z") && (c.preventDefault(), o && ((g = e.current) == null || g.redo()));
      }
    };
    return document.addEventListener("keydown", l), () => document.removeEventListener("keydown", l);
  }, [o, n, e]), /* @__PURE__ */ r("div", { ref: a, children: t });
}
const Qe = v.forwardRef(
  ({ className: t, type: e, ...n }, o) => /* @__PURE__ */ r(
    "input",
    {
      type: e,
      className: h(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: o,
      ...n
    }
  )
);
Qe.displayName = "Input";
const Qw = (t, e, n) => t === "generated" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r("p", { children: "+" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_generated%"]
] }) : t === "hidden" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r("p", { children: "-" }),
  " ",
  e["%footnoteEditor_callerDropdown_item_hidden%"]
] }) : /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r("p", { children: n }),
  " ",
  e["%footnoteEditor_callerDropdown_item_custom%"]
] });
function td({
  callerType: t,
  updateCallerType: e,
  customCaller: n,
  updateCustomCaller: o,
  localizedStrings: a
}) {
  const i = G(null), s = G(null), l = G(!1), [w, c] = D(t), [d, m] = D(n), [f, u] = D(!1);
  U(() => {
    c(t);
  }, [t]), U(() => {
    d !== n && m(n);
  }, [n]);
  const g = (x) => {
    l.current = !1, u(x), x || (w !== "custom" || d ? (e(w), o(d)) : (c(t), m(n)));
  }, b = (x) => {
    var C, y, k, N;
    x.stopPropagation(), document.activeElement === s.current && x.key === "ArrowDown" || x.key === "ArrowRight" ? ((C = i.current) == null || C.focus(), l.current = !0) : document.activeElement === i.current && x.key === "ArrowUp" ? ((y = s.current) == null || y.focus(), l.current = !1) : document.activeElement === i.current && x.key === "ArrowLeft" && ((k = i.current) == null ? void 0 : k.selectionStart) === 0 && ((N = s.current) == null || N.focus(), l.current = !1), w === "custom" && x.key === "Enter" && (document.activeElement === s.current || document.activeElement === i.current) && g(!1);
  };
  return /* @__PURE__ */ p(be, { open: f, onOpenChange: g, children: [
    /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: Qw(t, a, n) }) }) }),
      /* @__PURE__ */ r(Ot, { children: a["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ p(
      de,
      {
        style: { zIndex: ca },
        onClick: () => {
          l.current && (l.current = !1);
        },
        onKeyDown: b,
        onMouseMove: () => {
          var x;
          l.current && ((x = i.current) == null || x.focus());
        },
        children: [
          /* @__PURE__ */ r(bn, { children: a["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ r(Ze, {}),
          /* @__PURE__ */ r(
            le,
            {
              checked: w === "generated",
              onCheckedChange: () => c("generated"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: wr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            le,
            {
              checked: w === "hidden",
              onCheckedChange: () => c("hidden"),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ r("span", { className: "tw-w-10 tw-text-center", children: dr })
              ] })
            }
          ),
          /* @__PURE__ */ r(
            le,
            {
              ref: s,
              checked: w === "custom",
              onCheckedChange: () => c("custom"),
              onClick: (x) => {
                var C;
                x.stopPropagation(), l.current = !0, (C = i.current) == null || C.focus();
              },
              onSelect: (x) => x.preventDefault(),
              children: /* @__PURE__ */ p("div", { className: "tw-flex tw-w-full tw-justify-between", children: [
                /* @__PURE__ */ r("span", { children: a["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ r(
                  Qe,
                  {
                    tabIndex: 0,
                    onMouseDown: (x) => {
                      x.stopPropagation(), c("custom"), l.current = !0;
                    },
                    ref: i,
                    className: "tw-h-auto tw-w-10 tw-p-0 tw-text-center",
                    value: d,
                    onKeyDown: (x) => {
                      x.key === "Enter" || x.key === "ArrowUp" || x.key === "ArrowDown" || x.key === "ArrowLeft" || x.key === "ArrowRight" || x.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (x) => m(x.target.value)
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
const ed = (t, e) => t === "f" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r(zo, {}),
  " ",
  e["%footnoteEditor_noteType_footnote_label%"]
] }) : t === "fe" ? /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r(Fo, {}),
  " ",
  e["%footnoteEditor_noteType_endNote_label%"]
] }) : /* @__PURE__ */ p(st, { children: [
  /* @__PURE__ */ r(jo, {}),
  " ",
  e["%footnoteEditor_noteType_crossReference_label%"]
] }), nd = (t, e) => {
  if (t === "x")
    return e["%footnoteEditor_noteType_crossReference_label%"];
  let n = e["%footnoteEditor_noteType_endNote_label%"];
  return t === "f" && (n = e["%footnoteEditor_noteType_footnote_label%"]), Ce(e["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: n
  });
};
function rd({
  noteType: t,
  handleNoteTypeChange: e,
  localizedStrings: n,
  isTypeSwitchable: o
}) {
  return /* @__PURE__ */ p(be, { children: [
    /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(hl, { asChild: !0, children: /* @__PURE__ */ r(Me, { asChild: !0, children: /* @__PURE__ */ r(F, { variant: "outline", className: "tw-h-6", children: ed(t, n) }) }) }),
      /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ r("p", { children: nd(t, n) }) })
    ] }) }),
    /* @__PURE__ */ p(de, { style: { zIndex: ca }, children: [
      /* @__PURE__ */ r(bn, { children: n["%footnoteEditor_noteTypeDropdown_label%"] }),
      /* @__PURE__ */ r(Ze, {}),
      /* @__PURE__ */ p(
        le,
        {
          disabled: t !== "x" && !o,
          checked: t === "x",
          onCheckedChange: () => e("x"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(jo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_crossReference_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        le,
        {
          disabled: t === "x" && !o,
          checked: t === "f",
          onCheckedChange: () => e("f"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(zo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_footnote_label%"] })
          ]
        }
      ),
      /* @__PURE__ */ p(
        le,
        {
          disabled: t === "x" && !o,
          checked: t === "fe",
          onCheckedChange: () => e("fe"),
          className: "tw-gap-2",
          children: [
            /* @__PURE__ */ r(Fo, {}),
            /* @__PURE__ */ r("span", { children: n["%footnoteEditor_noteType_endNote_label%"] })
          ]
        }
      )
    ] })
  ] });
}
const od = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%"
]);
function ad({ icon: t, className: e }) {
  return /* @__PURE__ */ r(t ?? ns, { className: e, size: 16 });
}
function So({
  item: t,
  localizedStrings: e
}) {
  return /* @__PURE__ */ p(
    te,
    {
      className: "tw-flex tw-gap-2 hover:tw-bg-accent",
      disabled: t.isDisallowed || t.isDeprecated,
      onSelect: t.action,
      children: [
        /* @__PURE__ */ r("div", { className: "tw-w-8 tw-min-w-8", children: t.marker ? /* @__PURE__ */ r("span", { className: "tw-text-xs", children: t.marker }) : /* @__PURE__ */ r("div", { children: /* @__PURE__ */ r(ad, { icon: t.icon }) }) }),
        /* @__PURE__ */ p("div", { children: [
          /* @__PURE__ */ r("p", { className: "tw-text-sm", children: t.title }),
          t.subtitle && /* @__PURE__ */ r("p", { className: "tw-text-xs tw-text-muted-foreground", children: t.subtitle })
        ] }),
        (t.isDisallowed || t.isDeprecated) && /* @__PURE__ */ r(ma, { className: "tw-font-sans", children: t.isDisallowed ? e["%markerMenu_disallowed_label%"] : e["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function id({ localizedStrings: t, markerMenuItems: e, searchRef: n }) {
  const [o, a] = D(""), [i, s] = z(() => {
    const l = o.trim().toLowerCase();
    if (!l)
      return [e, []];
    const w = e.filter(
      (d) => {
        var m;
        return (m = d.marker) == null ? void 0 : m.toLowerCase().includes(l);
      }
    ), c = e.filter(
      (d) => d.title.toLowerCase().includes(l) && !w.includes(d)
    );
    return [w, c];
  }, [o, e]);
  return /* @__PURE__ */ p(ue, { className: "tw-p-1", shouldFilter: !1, loop: !0, children: [
    /* @__PURE__ */ r(
      We,
      {
        className: "marker-menu-search",
        ref: n,
        value: o,
        onValueChange: (l) => a(l),
        placeholder: t["%markerMenu_searchPlaceholder%"]
      }
    ),
    /* @__PURE__ */ p(me, { children: [
      /* @__PURE__ */ r(gn, { children: t["%markerMenu_noResults%"] }),
      /* @__PURE__ */ r(Jt, { children: i.map((l) => {
        var w;
        return /* @__PURE__ */ r(
          So,
          {
            item: l,
            localizedStrings: t
          },
          `item-${l.marker ?? ((w = l.icon) == null ? void 0 : w.displayName)}-${l.title.replaceAll(" ", "")}`
        );
      }) }),
      s.length > 0 && /* @__PURE__ */ p(st, { children: [
        i.length > 0 && /* @__PURE__ */ r(Or, { alwaysRender: !0 }),
        /* @__PURE__ */ r(Jt, { children: s.map((l) => {
          var w;
          return /* @__PURE__ */ r(
            So,
            {
              item: l,
              localizedStrings: t
            },
            `item-${l.marker ?? ((w = l.icon) == null ? void 0 : w.displayName)}-${l.title.replaceAll(" ", "")}`
          );
        }) })
      ] })
    ] })
  ] });
}
function sd(t, e, n, o) {
  if (!o || o === "p") return [];
  const a = _n[o];
  if (!(a != null && a.children)) return [];
  const i = [];
  return Object.entries(a.children).forEach(([, s]) => {
    i.push(
      ...s.map((l) => ({
        marker: l,
        title: n[_n[l].description] ?? _n[l].description,
        action: () => {
          var w;
          (w = t.current) == null || w.insertMarker(l), e();
        }
      }))
    );
  }), i.sort((s, l) => (s.marker ?? s.title).localeCompare(l.marker ?? l.title));
}
function ld(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "ft" && (e.style = "xt"), e.style === "fr" && (e.style = "xo"), e.style === "fq" && (e.style = "xq"));
}
function cd(t) {
  var n;
  const e = (n = t.attributes) == null ? void 0 : n.char;
  e.style && (e.style === "xt" && (e.style = "ft"), e.style === "xo" && (e.style = "fr"), e.style === "xq" && (e.style = "fq"));
}
const wd = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function yu({
  classNameForEditor: t,
  noteOps: e,
  onChange: n,
  onClose: o,
  scrRef: a,
  noteKey: i,
  editorOptions: s,
  defaultMarkerMenuTrigger: l,
  localizedStrings: w,
  parentEditorRef: c
}) {
  const d = G(null), m = G(null), f = G(null), u = G(null);
  $t(() => {
    if (!u.current) return;
    const { width: O } = u.current.getBoundingClientRect();
    O > 0 && (u.current.style.width = `${O}px`);
  }, []);
  const [g, b] = D("generated"), [x, C] = D("generated"), [y, k] = D("*"), [N, V] = D("*"), [$, A] = D("f"), [R, _] = D(!1), [S, L] = D(!0), [j, P] = D(!1), I = G(!1), q = G(""), [T, W] = D(!1), [Rt, zt] = D(), [Ft, bt] = D(), [ht, K] = D(), [lt, vt] = D(), pt = G(null), _t = z(
    () => ({
      ...s,
      markerMenuTrigger: l,
      hasExternalUI: !0,
      view: { ...s.view ?? Sl(), noteMode: "expanded" }
    }),
    [s, l]
  ), re = z(
    () => sd(
      d,
      () => W(!1),
      w,
      lt
    ),
    [w, lt]
  );
  U(() => {
    var O;
    T || (O = d.current) == null || O.focus();
  }, [$, T]), U(() => {
    var it, ct;
    let O;
    I.current = !1, L(!0);
    const H = e == null ? void 0 : e.at(0);
    if (H && xn("note", H)) {
      const yt = (it = H.insert.note) == null ? void 0 : it.caller;
      let E = "custom";
      yt === wr ? E = "generated" : yt === dr ? E = "hidden" : yt && (k(yt), V(yt)), b(E), C(E), A(((ct = H.insert.note) == null ? void 0 : ct.style) ?? "f"), O = setTimeout(() => {
        var wt;
        (wt = d.current) == null || wt.applyUpdate([H]);
      }, 0);
    }
    return () => {
      O && clearTimeout(O);
    };
  }, [e, i]);
  const xt = B(
    (O, H, it = !1) => {
      var yt, E, wt;
      const ct = (E = (yt = d.current) == null ? void 0 : yt.getNoteOps(0)) == null ? void 0 : E.at(0);
      if (ct && xn("note", ct)) {
        if (ct.insert.note) {
          let et;
          O === "custom" ? et = H : O === "generated" ? et = wr : et = dr, ct.insert.note.caller = et;
        }
        n == null || n([ct]), it && c && i && ((wt = c.current) == null || wt.replaceEmbedUpdate(i, [ct]));
      }
    },
    [i, n, c]
  ), It = B(() => {
    xt(g, y, !0), o();
  }, [g, y, o, xt]), xe = G(It);
  $t(() => {
    xe.current = It;
  });
  const Ut = G({ book: a.book, chapterNum: a.chapterNum });
  $t(() => {
    (Ut.current.book !== a.book || Ut.current.chapterNum !== a.chapterNum) && (Ut.current = { book: a.book, chapterNum: a.chapterNum }, xe.current());
  }, [a.book, a.chapterNum]);
  const oe = () => {
    var H;
    const O = (H = m.current) == null ? void 0 : H.getElementsByClassName("editor-input")[0];
    O != null && O.textContent && navigator.clipboard.writeText(O.textContent);
  }, tn = B(
    (O) => {
      b(O), xt(O, y);
    },
    [y, xt]
  ), M = B(
    (O) => {
      k(O), xt(g, O);
    },
    [g, xt]
  ), X = (O) => {
    var it, ct, yt, E, wt;
    A(O);
    const H = (ct = (it = d.current) == null ? void 0 : it.getNoteOps(0)) == null ? void 0 : ct.at(0);
    if (H && xn("note", H)) {
      H.insert.note && (H.insert.note.style = O);
      const et = (E = (yt = H.insert.note) == null ? void 0 : yt.contents) == null ? void 0 : E.ops;
      $ !== "x" && O === "x" ? et == null || et.forEach((St) => ld(St)) : $ === "x" && O !== "x" && (et == null || et.forEach((St) => cd(St))), (wt = d.current) == null || wt.applyUpdate([H, { delete: 1 }]);
    }
  }, Q = (O) => {
    vt(O.contextMarker), P(O.canRedo);
  }, tt = B(
    (O) => {
      var it, ct, yt, E, wt;
      const H = (ct = (it = d.current) == null ? void 0 : it.getNoteOps(0)) == null ? void 0 : ct.at(0);
      if (H && xn("note", H)) {
        O.content.length > 1 && setTimeout(() => {
          var qt;
          (qt = d.current) == null || qt.applyUpdate([{ retain: 2 }, { delete: 1 }]);
        }, 0);
        const et = (yt = H.insert.note) == null ? void 0 : yt.style, St = (wt = (E = H.insert.note) == null ? void 0 : E.contents) == null ? void 0 : wt.ops;
        if (et || _(!1), _(
          et === "x" ? !!(St != null && St.every((qt) => {
            var en, nn;
            if (!((en = qt.attributes) != null && en.char)) return !0;
            const ye = ((nn = qt.attributes) == null ? void 0 : nn.char).style;
            return ye === "xt" || ye === "xo" || ye === "xq";
          })) : !!(St != null && St.every((qt) => {
            var en, nn;
            if (!((en = qt.attributes) != null && en.char)) return !0;
            const ye = ((nn = qt.attributes) == null ? void 0 : nn.char).style;
            return ye === "ft" || ye === "fr" || ye === "fq";
          }))
        ), !I.current) {
          I.current = !0, q.current = JSON.stringify(H), L(!0);
          return;
        }
        L(JSON.stringify(H) === q.current), xt(g, y);
      } else
        _(!1), L(!0);
    },
    [g, y, xt]
  ), ut = B(() => {
    const O = window.getSelection();
    if (f.current && re.length && O && O.rangeCount > 0) {
      const H = O.getRangeAt(0).getBoundingClientRect(), it = f.current.getBoundingClientRect();
      zt(H.left - it.left), bt(H.top - it.top), K(H.height), W(!0);
    }
  }, [re, f]);
  U(() => {
    const O = () => {
      T && W(!1);
    };
    return window.addEventListener("click", O), () => {
      window.removeEventListener("click", O);
    };
  }, [T]), U(() => {
    var O;
    T && ((O = pt.current) == null || O.focus());
  }, [T]), U(() => {
    var it;
    const O = ((it = m.current) == null ? void 0 : it.querySelector(".editor-input")) ?? void 0, H = (ct) => {
      !T && O && document.activeElement === O && ct.key === l ? (ct.preventDefault(), ut()) : T && ct.key === "Escape" && (ct.preventDefault(), W(!1));
    };
    return document.addEventListener("keydown", H), () => {
      document.removeEventListener("keydown", H);
    };
  }, [T, ut, l]);
  const At = w["%footnoteEditor_copyButton_tooltip%"];
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ p("div", { ref: u, className: "footnote-editor tw-grid tw-gap-[12px]", children: [
      /* @__PURE__ */ p("div", { className: "tw-flex", children: [
        /* @__PURE__ */ p("div", { className: "tw-flex tw-gap-4", children: [
          /* @__PURE__ */ r(
            rd,
            {
              isTypeSwitchable: R,
              noteType: $,
              handleNoteTypeChange: X,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(
            td,
            {
              callerType: g,
              updateCallerType: tn,
              customCaller: y,
              updateCustomCaller: M,
              localizedStrings: w
            }
          )
        ] }),
        /* @__PURE__ */ r("div", { className: "tw-flex tw-w-full tw-justify-end", children: /* @__PURE__ */ p(Gr, { children: [
          /* @__PURE__ */ r(
            Jw,
            {
              onUndoClick: () => {
                var O;
                return (O = d.current) == null ? void 0 : O.undo();
              },
              onRedoClick: () => {
                var O;
                return (O = d.current) == null ? void 0 : O.redo();
              },
              canUndo: !S,
              canRedo: j,
              localizedStrings: w
            }
          ),
          /* @__PURE__ */ r(
            Ha,
            {
              onCancelClick: o,
              onAcceptClick: It,
              canAccept: !S || x !== g || g === "custom" && y !== N,
              localizedStrings: w
            }
          )
        ] }) })
      ] }),
      /* @__PURE__ */ p(
        "div",
        {
          ref: m,
          className: "tw-relative tw-rounded-[6px] tw-border-2 tw-border-ring",
          children: [
            /* @__PURE__ */ r("div", { className: t, children: /* @__PURE__ */ r(
              Zw,
              {
                editorRef: d,
                canUndo: !S,
                canRedo: j,
                children: /* @__PURE__ */ r(
                  Dl,
                  {
                    options: _t,
                    onStateChange: Q,
                    onUsjChange: tt,
                    defaultUsj: wd,
                    onScrRefChange: () => {
                    },
                    scrRef: a,
                    ref: d
                  }
                )
              }
            ) }),
            /* @__PURE__ */ r("div", { className: "tw-absolute tw-bottom-0 tw-right-0", children: /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
              /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ r(
                F,
                {
                  "aria-label": At,
                  onClick: oe,
                  className: "tw-h-6 tw-w-6",
                  variant: "ghost",
                  size: "icon",
                  children: /* @__PURE__ */ r(Lo, {})
                }
              ) }),
              /* @__PURE__ */ r(Ot, { children: /* @__PURE__ */ r("p", { children: At }) })
            ] }) }) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ r(
      "div",
      {
        className: "tw-absolute",
        ref: f,
        style: { top: 0, left: 0, height: 0, width: 0 }
      }
    ),
    /* @__PURE__ */ p(fe, { open: T, children: [
      /* @__PURE__ */ r(
        Kl,
        {
          className: "tw-absolute",
          style: {
            top: Ft,
            left: Rt,
            height: ht,
            width: 0,
            pointerEvents: "none"
          }
        }
      ),
      /* @__PURE__ */ r(
        ee,
        {
          className: "tw-w-[500px] tw-p-0",
          onClick: (O) => {
            O.preventDefault(), O.stopPropagation();
          },
          children: /* @__PURE__ */ r(
            id,
            {
              markerMenuItems: re,
              localizedStrings: w,
              searchRef: pt
            }
          )
        }
      )
    ] })
  ] });
}
const Nu = Object.freeze([
  ...od,
  ...Object.entries(_n).map(([, t]) => t.description).filter((t) => !!t),
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
  ...Ww,
  ...qa
]);
function oi(t, e) {
  if (!e || e.length === 0) return t ?? "empty";
  const n = e.find((a) => typeof a == "string");
  if (n)
    return `key-${t ?? "unknown"}-${n.slice(0, 10)}`;
  const o = typeof e[0] == "string" ? "impossible" : e[0].marker ?? "unknown";
  return `key-${t ?? "unknown"}-${o}`;
}
function dd(t, e, n = !0, o = void 0) {
  if (!e || e.length === 0) return;
  const a = [], i = [];
  let s = [];
  return e.forEach((l) => {
    typeof l != "string" && l.marker === "fp" ? (s.length > 0 && i.push(s), s = [l]) : s.push(l);
  }), s.length > 0 && i.push(s), i.map((l, w) => {
    const c = w === i.length - 1;
    return /* @__PURE__ */ p("p", { children: [
      Hr(t, l, n, !0, a),
      c && o
    ] }, oi(t, l));
  });
}
function Hr(t, e, n = !0, o = !0, a = []) {
  if (!(!e || e.length === 0))
    return e.map((i) => {
      if (typeof i == "string") {
        const s = `${t}-text-${i.slice(0, 10)}`;
        if (o) {
          const l = h(`usfm_${t}`);
          return /* @__PURE__ */ r("span", { className: l, children: i }, s);
        }
        return /* @__PURE__ */ p(
          "span",
          {
            className: "tw-inline-flex tw-items-center tw-gap-1 tw-underline tw-decoration-destructive",
            children: [
              /* @__PURE__ */ r(sr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" }),
              /* @__PURE__ */ r("span", { children: i }),
              /* @__PURE__ */ r(sr, { className: "tw-h-4 tw-w-4 tw-fill-destructive" })
            ]
          },
          s
        );
      }
      return pd(
        i,
        oi(`${t}\\${i.marker}`, [i]),
        n,
        [...a, t ?? "unknown"]
      );
    });
}
function pd(t, e, n, o = []) {
  const { marker: a } = t;
  return /* @__PURE__ */ p("span", { children: [
    a ? n && /* @__PURE__ */ r("span", { className: "marker", children: `\\${a} ` }) : /* @__PURE__ */ r(
      sr,
      {
        className: "tw-text-error tw-mr-1 tw-inline-block tw-h-4 tw-w-4",
        "aria-label": "Missing marker"
      }
    ),
    Hr(a, t.content, n, !0, [
      ...o,
      a ?? "unknown"
    ])
  ] }, e);
}
function ud({
  footnote: t,
  layout: e = "horizontal",
  formatCaller: n,
  showMarkers: o = !0
}) {
  const a = n ? n(t.caller) : t.caller, i = a !== t.caller;
  let s, l = t.content;
  Array.isArray(t.content) && t.content.length > 0 && typeof t.content[0] != "string" && (t.content[0].marker === "fr" || t.content[0].marker === "xo") && ([s, ...l] = t.content);
  const w = o ? /* @__PURE__ */ r("span", { className: "marker", children: `\\${t.marker} ` }) : void 0, c = o ? /* @__PURE__ */ r("span", { className: "marker", children: ` \\${t.marker}*` }) : void 0, d = a && // USFM does not specify a marker for caller, so instead of a usfm_* class, we use a
  // specific class name in case styling is needed.
  /* @__PURE__ */ p("span", { className: h("note-caller tw-inline-block", { formatted: i }), children: [
    a,
    " "
  ] }), m = s && /* @__PURE__ */ p(st, { children: [
    Hr(t.marker, [s], o, !1),
    " "
  ] }), f = e === "horizontal" ? "horizontal" : "vertical", u = o ? "marker-visible" : "", g = e === "horizontal" ? "tw-col-span-1" : "tw-col-span-2 tw-col-start-1 tw-row-start-2", b = h(f, u);
  return /* @__PURE__ */ p(st, { children: [
    /* @__PURE__ */ p("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", b), children: [
      w,
      d
    ] }),
    /* @__PURE__ */ r("div", { className: h("textual-note-header tw-col-span-1 tw-w-fit tw-text-nowrap", b), children: m }),
    /* @__PURE__ */ r(
      "div",
      {
        className: h(
          "textual-note-body tw-flex tw-flex-col tw-gap-1",
          g,
          b
        ),
        children: l && l.length > 0 && /* @__PURE__ */ r(st, { children: dd(t.marker, l, o, c) })
      }
    )
  ] });
}
function ku({
  className: t,
  classNameForItems: e,
  footnotes: n,
  layout: o = "horizontal",
  listId: a,
  selectedFootnote: i,
  showMarkers: s = !0,
  suppressFormatting: l = !1,
  formatCaller: w,
  onFootnoteSelected: c
}) {
  const d = w ?? _s(n, void 0), m = (y, k) => {
    c == null || c(y, k, a);
  }, f = i ? n.findIndex((y) => y === i) : -1, [u, g] = D(f), b = (y, k, N) => {
    if (n.length)
      switch (y.key) {
        case "Enter":
        case " ":
          y.preventDefault(), c == null || c(k, N, a);
          break;
      }
  }, x = (y) => {
    if (n.length)
      switch (y.key) {
        case "ArrowDown":
          y.preventDefault(), g((k) => Math.min(k + 1, n.length - 1));
          break;
        case "ArrowUp":
          y.preventDefault(), g((k) => Math.max(k - 1, 0));
          break;
      }
  }, C = G([]);
  return U(() => {
    var y;
    u >= 0 && u < C.current.length && ((y = C.current[u]) == null || y.focus());
  }, [u]), /* @__PURE__ */ r(
    "div",
    {
      role: "listbox",
      "aria-label": "Footnotes",
      tabIndex: u < 0 ? 0 : -1,
      className: h("tw-h-full tw-overflow-y-auto", t),
      onKeyDown: x,
      children: /* @__PURE__ */ r(
        "ul",
        {
          className: h(
            "tw-p-0.5 tw-pt-1",
            "tw-grid",
            o === "horizontal" ? "tw-grid-cols-[min-content_min-content_1fr]" : "tw-grid-cols-[min-content_1fr]",
            !l && "formatted-font"
          ),
          children: n.map((y, k) => {
            const N = y === i, V = `${a}-${k}`;
            return /* @__PURE__ */ p(st, { children: [
              /* @__PURE__ */ r(
                "li",
                {
                  ref: ($) => {
                    C.current[k] = $;
                  },
                  role: "option",
                  "aria-selected": N,
                  "data-marker": y.marker,
                  "data-state": N ? "selected" : void 0,
                  tabIndex: k === u ? 0 : -1,
                  className: h(
                    "tw-gap-x-3 tw-gap-y-1 tw-p-2 data-[state=selected]:tw-bg-muted",
                    c && "hover:tw-bg-muted/50",
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
                  onKeyDown: ($) => b($, y, k),
                  children: /* @__PURE__ */ r(
                    ud,
                    {
                      footnote: y,
                      layout: o,
                      formatCaller: () => d(y.caller, k),
                      showMarkers: s
                    }
                  )
                },
                V
              ),
              k < n.length - 1 && o === "vertical" && /* @__PURE__ */ r(De, { tabIndex: -1, className: "tw-col-span-2" })
            ] });
          })
        }
      )
    }
  );
}
function md(t) {
  const e = [];
  let n = 0;
  const o = /\\\\(.+?)\\\\/g;
  let a;
  for (; (a = o.exec(t)) !== null; )
    a.index > n && e.push(t.substring(n, a.index)), e.push(/* @__PURE__ */ r("strong", { children: a[1] }, a.index)), n = o.lastIndex;
  return n < t.length && e.push(t.substring(n)), e.length > 0 ? e : [t];
}
function fd({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n,
  classNameForText: o
}) {
  const a = n["%webView_inventory_occurrences_table_header_reference%"], i = n["%webView_inventory_occurrences_table_header_occurrence%"], s = z(() => {
    const l = [], w = /* @__PURE__ */ new Set();
    return t.forEach((c) => {
      const d = `${c.reference.book}:${c.reference.chapterNum}:${c.reference.verseNum}:${c.text}`;
      w.has(d) || (w.add(d), l.push(c));
    }), l;
  }, [t]);
  return /* @__PURE__ */ p(Fn, { stickyHeader: !0, children: [
    /* @__PURE__ */ r(Bn, { stickyHeader: !0, children: /* @__PURE__ */ p(ae, { children: [
      /* @__PURE__ */ r(mn, { children: a }),
      /* @__PURE__ */ r(mn, { children: i })
    ] }) }),
    /* @__PURE__ */ r(Kn, { children: s.length > 0 && s.map((l) => /* @__PURE__ */ p(
      ae,
      {
        onClick: () => {
          e(l.reference);
        },
        children: [
          /* @__PURE__ */ r(Re, { children: Ee(l.reference, "English") }),
          /* @__PURE__ */ r(Re, { className: o, children: md(l.text) })
        ]
      },
      `${l.reference.book} ${l.reference.chapterNum}:${l.reference.verseNum}-${l.text}`
    )) })
  ] });
}
const Yr = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  pr.Root,
  {
    ref: n,
    className: h(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ r(
      pr.Indicator,
      {
        className: h("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Yr.displayName = pr.Root.displayName;
const hd = (t) => {
  if (t === "asc")
    return /* @__PURE__ */ r(is, { className: "tw-h-4 tw-w-4" });
  if (t === "desc")
    return /* @__PURE__ */ r(ss, { className: "tw-h-4 tw-w-4" });
}, Gn = (t, e, n) => /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
  /* @__PURE__ */ p(
    Vt,
    {
      className: h("tw-flex tw-w-full tw-justify-start", n),
      variant: "ghost",
      onClick: () => t.toggleSorting(void 0),
      children: [
        /* @__PURE__ */ r("span", { className: "tw-w-6 tw-max-w-fit tw-flex-1 tw-overflow-hidden tw-text-ellipsis", children: e }),
        hd(t.getIsSorted())
      ]
    }
  ),
  /* @__PURE__ */ r(Ot, { side: "bottom", children: e })
] }) }), _u = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => Gn(e, t)
}), gd = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => Gn(n, t)
}), Cu = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => Gn(e, t, "tw-justify-end"),
  cell: ({ row: e }) => /* @__PURE__ */ r("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: e.getValue("count") })
}), nr = (t, e, n, o, a, i) => {
  let s = [...n];
  t.forEach((w) => {
    e === "approved" ? s.includes(w) || s.push(w) : s = s.filter((c) => c !== w);
  }), o(s);
  let l = [...a];
  t.forEach((w) => {
    e === "unapproved" ? l.includes(w) || l.push(w) : l = l.filter((c) => c !== w);
  }), i(l);
}, Eu = (t, e, n, o, a) => ({
  accessorKey: "status",
  header: ({ column: i }) => Gn(i, t, "tw-justify-center"),
  cell: ({ row: i }) => {
    const s = i.getValue("status"), l = i.getValue("item");
    return /* @__PURE__ */ p(Br, { value: s, variant: "outline", type: "single", className: "tw-gap-0", children: [
      /* @__PURE__ */ r(
        wn,
        {
          onClick: (w) => {
            w.stopPropagation(), nr(
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
          children: /* @__PURE__ */ r(rs, {})
        }
      ),
      /* @__PURE__ */ r(
        wn,
        {
          onClick: (w) => {
            w.stopPropagation(), nr(
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
          children: /* @__PURE__ */ r(os, {})
        }
      ),
      /* @__PURE__ */ r(
        wn,
        {
          onClick: (w) => {
            w.stopPropagation(), nr(
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
          children: /* @__PURE__ */ r(as, {})
        }
      )
    ] });
  }
}), Tu = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ru = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Su = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? e[1] : "";
}, bd = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Du = Object.freeze([
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
]), vd = (t, e, n) => {
  let o = t;
  return e !== "all" && (o = o.filter(
    (a) => e === "approved" && a.status === "approved" || e === "unapproved" && a.status === "unapproved" || e === "unknown" && a.status === "unknown"
  )), n !== "" && (o = o.filter((a) => a.items[0].includes(n))), o;
}, xd = (t, e, n) => t.map((o) => {
  const a = no(o.key) ? o.key : o.key[0];
  return {
    items: no(o.key) ? [o.key] : o.key,
    count: o.count,
    status: o.status || bd(a, e, n),
    occurrences: o.occurrences || []
  };
}), Ht = (t, e) => t[e] ?? e;
function Mu({
  inventoryItems: t,
  setVerseRef: e,
  localizedStrings: n,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  scope: s,
  onScopeChange: l,
  columns: w,
  id: c,
  areInventoryItemsLoading: d = !1,
  classNameForVerseText: m,
  onItemSelected: f
}) {
  const u = Ht(n, "%webView_inventory_all%"), g = Ht(n, "%webView_inventory_approved%"), b = Ht(n, "%webView_inventory_unapproved%"), x = Ht(n, "%webView_inventory_unknown%"), C = Ht(n, "%webView_inventory_scope_currentBook%"), y = Ht(n, "%webView_inventory_scope_chapter%"), k = Ht(n, "%webView_inventory_scope_verse%"), N = Ht(n, "%webView_inventory_filter_text%"), V = Ht(
    n,
    "%webView_inventory_show_additional_items%"
  ), $ = Ht(n, "%webView_inventory_no_results%"), [A, R] = D(!1), [_, S] = D("all"), [L, j] = D(""), [P, I] = D([]), q = z(() => {
    const K = t ?? [];
    return K.length === 0 ? [] : xd(K, a, i);
  }, [t, a, i]), T = z(() => {
    if (A) return q;
    const K = [];
    return q.forEach((lt) => {
      const vt = lt.items[0], pt = K.find(
        (_t) => _t.items[0] === vt
      );
      pt ? (pt.count += lt.count, pt.occurrences = pt.occurrences.concat(lt.occurrences)) : K.push({
        items: [vt],
        count: lt.count,
        occurrences: lt.occurrences,
        status: lt.status
      });
    }), K;
  }, [A, q]), W = z(() => T.length === 0 ? [] : vd(T, _, L), [T, _, L]), Rt = z(() => {
    var vt, pt;
    if (!A) return w;
    const K = (vt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : vt.length;
    if (!K) return w;
    const lt = [];
    for (let _t = 0; _t < K; _t++)
      lt.push(
        gd(
          ((pt = o == null ? void 0 : o.tableHeaders) == null ? void 0 : pt[_t]) || "Additional Item",
          _t + 1
        )
      );
    return [...lt, ...w];
  }, [o == null ? void 0 : o.tableHeaders, w, A]);
  U(() => {
    W.length === 0 ? I([]) : W.length === 1 && I(W[0].items);
  }, [W]);
  const zt = (K, lt) => {
    lt.setRowSelection(() => {
      const pt = {};
      return pt[K.index] = !0, pt;
    });
    const vt = K.original.items;
    I(vt), f && vt.length > 0 && f(vt[0]);
  }, Ft = (K) => {
    if (K === "book" || K === "chapter" || K === "verse")
      l(K);
    else
      throw new Error(`Invalid scope value: ${K}`);
  }, bt = (K) => {
    if (K === "all" || K === "approved" || K === "unapproved" || K === "unknown")
      S(K);
    else
      throw new Error(`Invalid status filter value: ${K}`);
  }, ht = z(() => {
    if (T.length === 0 || P.length === 0) return [];
    const K = T.filter((lt) => Cs(
      A ? lt.items : [lt.items[0]],
      P
    ));
    if (K.length > 1) throw new Error("Selected item is not unique");
    return K.length === 0 ? [] : K[0].occurrences;
  }, [P, A, T]);
  return /* @__PURE__ */ r("div", { id: c, className: "pr-twp tw-h-full tw-overflow-auto", children: /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-w-full tw-min-w-min tw-flex-col", children: [
    /* @__PURE__ */ p("div", { className: "tw-flex tw-items-stretch", style: { contain: "inline-size" }, children: [
      /* @__PURE__ */ p(
        Ke,
        {
          onValueChange: (K) => bt(K),
          defaultValue: _,
          children: [
            /* @__PURE__ */ r(Oe, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Ge, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ p(Ie, { children: [
              /* @__PURE__ */ r(Pt, { value: "all", children: u }),
              /* @__PURE__ */ r(Pt, { value: "approved", children: g }),
              /* @__PURE__ */ r(Pt, { value: "unapproved", children: b }),
              /* @__PURE__ */ r(Pt, { value: "unknown", children: x })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ p(Ke, { onValueChange: (K) => Ft(K), defaultValue: s, children: [
        /* @__PURE__ */ r(Oe, { className: "tw-m-1 tw-w-auto tw-flex-1", children: /* @__PURE__ */ r(Ge, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ p(Ie, { children: [
          /* @__PURE__ */ r(Pt, { value: "book", children: C }),
          /* @__PURE__ */ r(Pt, { value: "chapter", children: y }),
          /* @__PURE__ */ r(Pt, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ r(
        Qe,
        {
          className: "tw-m-1 tw-flex-1 tw-rounded-md tw-border",
          placeholder: N,
          value: L,
          onChange: (K) => {
            j(K.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ r(Mt, { children: /* @__PURE__ */ p(Lt, { children: [
        /* @__PURE__ */ r(Vt, { asChild: !0, children: /* @__PURE__ */ p("div", { className: "tw-m-1 tw-flex tw-w-fit tw-min-w-[26px] tw-items-center tw-rounded-md tw-border", children: [
          /* @__PURE__ */ r(
            Yr,
            {
              className: "tw-m-1 tw-flex-shrink-0",
              checked: A,
              onCheckedChange: (K) => {
                R(K);
              }
            }
          ),
          /* @__PURE__ */ r(gt, { className: "tw-m-1 tw-truncate", children: (o == null ? void 0 : o.checkboxText) ?? V })
        ] }) }),
        /* @__PURE__ */ r(Ot, { children: (o == null ? void 0 : o.checkboxText) ?? V })
      ] }) })
    ] }),
    /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      Gw,
      {
        columns: Rt,
        data: W,
        onRowClickHandler: zt,
        stickyHeader: !0,
        isLoading: d,
        noResultsMessage: $
      }
    ) }),
    ht.length > 0 && /* @__PURE__ */ r("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ r(
      fd,
      {
        classNameForText: m,
        occurrenceData: ht,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] }) });
}
const yd = "16rem", Nd = "3rem", ai = v.createContext(void 0);
function Un() {
  const t = v.useContext(ai);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const ii = v.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: o,
    style: a,
    children: i,
    side: s = "primary",
    ...l
  }, w) => {
    const [c, d] = v.useState(t), m = e ?? c, f = v.useCallback(
      (k) => {
        const N = typeof k == "function" ? k(m) : k;
        n ? n(N) : d(N);
      },
      [n, m]
    ), u = v.useCallback(() => f((k) => !k), [f]), g = m ? "expanded" : "collapsed", C = ft() === "ltr" ? s : s === "primary" ? "secondary" : "primary", y = v.useMemo(
      () => ({
        state: g,
        open: m,
        setOpen: f,
        toggleSidebar: u,
        side: C
      }),
      [g, m, f, u, C]
    );
    return /* @__PURE__ */ r(ai.Provider, { value: y, children: /* @__PURE__ */ r(Mt, { delayDuration: 0, children: /* @__PURE__ */ r(
      "div",
      {
        style: (
          // CSS custom properties are not in React.CSSProperties; cast is required to use them
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": yd,
            "--sidebar-width-icon": Nd,
            ...a
          }
        ),
        className: h(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          o
        ),
        ref: w,
        ...l,
        children: i
      }
    ) }) });
  }
);
ii.displayName = "SidebarProvider";
const si = v.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: o, ...a }, i) => {
  const s = Un();
  return e === "none" ? /* @__PURE__ */ r(
    "div",
    {
      className: h(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: i,
      ...a,
      children: o
    }
  ) : /* @__PURE__ */ p(
    "div",
    {
      ref: i,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      children: [
        /* @__PURE__ */ r(
          "div",
          {
            className: h(
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
            className: h(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              s.side === "primary" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=primary]:tw-border-r group-data-[side=secondary]:tw-border-l",
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
si.displayName = "Sidebar";
const kd = v.forwardRef(({ className: t, onClick: e, ...n }, o) => {
  const a = Un();
  return /* @__PURE__ */ p(
    F,
    {
      ref: o,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: h("tw-h-7 tw-w-7", t),
      onClick: (i) => {
        e == null || e(i), a.toggleSidebar();
      },
      ...n,
      children: [
        a.side === "primary" ? /* @__PURE__ */ r(ls, {}) : /* @__PURE__ */ r(cs, {}),
        /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
kd.displayName = "SidebarTrigger";
const _d = v.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: o } = Un();
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
        className: h(
          "tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=primary]:tw--right-4 group-data-[side=secondary]:tw-left-0 sm:tw-flex",
          "[[data-side=secondary]_&]:tw-cursor-e-resize [[data-side=secondary]_&]:tw-cursor-w-resize",
          "[[data-side=primary][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=secondary][data-state=collapsed]_&]:tw-cursor-w-resize",
          "group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar",
          "[[data-side=primary][data-collapsible=offcanvas]_&]:tw--right-2",
          "[[data-side=secondary][data-collapsible=offcanvas]_&]:tw--left-2",
          t
        ),
        ...e
      }
    );
  }
);
_d.displayName = "SidebarRail";
const li = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "main",
    {
      ref: n,
      className: h(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
li.displayName = "SidebarInset";
const Cd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Qe,
  {
    ref: n,
    "data-sidebar": "input",
    className: h(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
Cd.displayName = "SidebarInput";
const Ed = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: h("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Ed.displayName = "SidebarHeader";
const Td = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: h("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
Td.displayName = "SidebarFooter";
const Rd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  De,
  {
    ref: n,
    "data-sidebar": "separator",
    className: h("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
Rd.displayName = "SidebarSeparator";
const ci = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: h(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
ci.displayName = "SidebarContent";
const kr = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: h("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
kr.displayName = "SidebarGroup";
const _r = v.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? qe : "div",
  {
    ref: o,
    "data-sidebar": "group-label",
    className: h(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
_r.displayName = "SidebarGroupLabel";
const Sd = v.forwardRef(({ className: t, asChild: e = !1, ...n }, o) => /* @__PURE__ */ r(
  e ? qe : "button",
  {
    ref: o,
    "data-sidebar": "group-action",
    className: h(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
Sd.displayName = "SidebarGroupAction";
const Cr = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: h("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
Cr.displayName = "SidebarGroupContent";
const wi = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: h("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
wi.displayName = "SidebarMenu";
const di = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: h("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
di.displayName = "SidebarMenuItem";
const Dd = pe(
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
), pi = v.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: o = "default",
    tooltip: a,
    className: i,
    ...s
  }, l) => {
    const w = t ? qe : "button", { state: c } = Un(), d = /* @__PURE__ */ r(
      w,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": o,
        "data-active": e,
        className: h(Dd({ variant: n, size: o }), i),
        ...s
      }
    );
    return a ? (typeof a == "string" && (a = {
      children: a
    }), /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: d }),
      /* @__PURE__ */ r(Ot, { side: "right", align: "center", hidden: c !== "collapsed", ...a })
    ] })) : d;
  }
);
pi.displayName = "SidebarMenuButton";
const Md = v.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...o }, a) => /* @__PURE__ */ r(
  e ? qe : "button",
  {
    ref: a,
    "data-sidebar": "menu-action",
    className: h(
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
    ...o
  }
));
Md.displayName = "SidebarMenuAction";
const Od = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: h(
        "tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground",
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Od.displayName = "SidebarMenuBadge";
const Id = v.forwardRef(({ className: t, showIcon: e = !1, ...n }, o) => {
  const a = v.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ p(
    "div",
    {
      ref: o,
      "data-sidebar": "menu-skeleton",
      className: h("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ r(yr, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ r(
          yr,
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
});
Id.displayName = "SidebarMenuSkeleton";
const Ad = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: h(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Ad.displayName = "SidebarMenuSub";
const Pd = v.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ r("li", { ref: e, ...t })
);
Pd.displayName = "SidebarMenuSubItem";
const $d = v.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: o, ...a }, i) => /* @__PURE__ */ r(
  t ? qe : "a",
  {
    ref: i,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: h(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      e === "sm" && "tw-text-xs",
      e === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      o
    ),
    ...a
  }
));
$d.displayName = "SidebarMenuSubButton";
function Ld({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  extensionsSidebarGroupLabel: i,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l,
  className: w
}) {
  const c = B(
    (f, u) => {
      o(f, u);
    },
    [o]
  ), d = B(
    (f) => {
      const u = n.find((g) => g.projectId === f);
      return u ? u.projectName : f;
    },
    [n]
  ), m = B(
    (f) => !a.projectId && f === a.label,
    [a]
  );
  return /* @__PURE__ */ r(
    si,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: h("tw-w-96 tw-gap-2 tw-overflow-y-auto", w),
      children: /* @__PURE__ */ p(ci, { children: [
        /* @__PURE__ */ p(kr, { children: [
          /* @__PURE__ */ r(_r, { className: "tw-text-sm", children: i }),
          /* @__PURE__ */ r(Cr, { children: /* @__PURE__ */ r(wi, { children: Object.entries(e).map(([f, u]) => /* @__PURE__ */ r(di, { children: /* @__PURE__ */ r(
            pi,
            {
              onClick: () => c(f),
              isActive: m(f),
              children: /* @__PURE__ */ r("span", { className: "tw-pl-3", children: u })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ p(kr, { children: [
          /* @__PURE__ */ r(_r, { className: "tw-text-sm", children: s }),
          /* @__PURE__ */ r(Cr, { className: "tw-pl-3", children: /* @__PURE__ */ r(
            hr,
            {
              buttonVariant: "ghost",
              buttonClassName: h("tw-w-full", {
                "tw-bg-sidebar-accent tw-text-sidebar-accent-foreground": a == null ? void 0 : a.projectId
              }),
              popoverContentStyle: { zIndex: Al },
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: d,
              buttonPlaceholder: l,
              onChange: (f) => {
                const u = d(f);
                c(u, f);
              },
              value: (a == null ? void 0 : a.projectId) ?? void 0,
              icon: /* @__PURE__ */ r(ws, {})
            }
          ) })
        ] })
      ] })
    }
  );
}
const Xr = fn(
  ({ value: t, onSearch: e, placeholder: n, isFullWidth: o, className: a, isDisabled: i = !1, id: s }, l) => {
    const w = ft();
    return /* @__PURE__ */ p("div", { id: s, className: h("tw-relative", { "tw-w-full": o }, a), children: [
      /* @__PURE__ */ r(
        Io,
        {
          className: h(
            "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
            { "tw-right-3": w === "rtl" },
            { "tw-left-3": w === "ltr" }
          )
        }
      ),
      /* @__PURE__ */ r(
        Qe,
        {
          ref: l,
          className: "tw-w-full tw-text-ellipsis tw-pe-9 tw-ps-9",
          placeholder: n,
          value: t,
          onChange: (c) => e(c.target.value),
          disabled: i
        }
      ),
      t && /* @__PURE__ */ p(
        F,
        {
          variant: "ghost",
          size: "icon",
          className: h(
            "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
            { "tw-left-0": w === "rtl" },
            { "tw-right-0": w === "ltr" }
          ),
          onClick: () => {
            e("");
          },
          children: [
            /* @__PURE__ */ r(hn, { className: "tw-h-4 tw-w-4" }),
            /* @__PURE__ */ r("span", { className: "tw-sr-only", children: "Clear" })
          ]
        }
      )
    ] });
  }
);
Xr.displayName = "SearchBar";
function Ou({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  searchValue: s,
  onSearch: l,
  extensionsSidebarGroupLabel: w,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ p("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ r("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ r(
      Xr,
      {
        className: "tw-w-9/12",
        value: s,
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ p(
      ii,
      {
        id: t,
        className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto tw-border-t",
        children: [
          /* @__PURE__ */ r(
            Ld,
            {
              className: "tw-w-1/2 tw-min-w-[140px] tw-max-w-[220px] tw-border-e",
              extensionLabels: e,
              projectInfo: n,
              handleSelectSidebarItem: a,
              selectedSidebarItem: i,
              extensionsSidebarGroupLabel: w,
              projectsSidebarGroupLabel: c,
              buttonPlaceholderText: d
            }
          ),
          /* @__PURE__ */ r(li, { className: "tw-min-w-[215px]", children: o })
        ]
      }
    )
  ] });
}
const ge = "scrBook", Vd = "scrRef", _e = "source", jd = "details", zd = "Scripture Reference", Fd = "Scripture Book", ui = "Type", Bd = "Details";
function Kd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (o) => `${o.start.book} ${o.start.chapterNum}:${o.start.verseNum}`,
      id: ge,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? zd,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? mt.bookIdToEnglishName(a.start.book) : o.row.groupingColumnId === ge ? Ee(a.start) : void 0;
      },
      getGroupingValue: (o) => mt.bookIdToNumber(o.start.book),
      sortingFn: (o, a) => lr(o.original.start, a.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => Ee(o.start),
      id: Vd,
      header: void 0,
      cell: (o) => {
        const a = o.row.original;
        return o.row.getIsGrouped() ? void 0 : Ee(a.start);
      },
      sortingFn: (o, a) => lr(o.original.start, a.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (o) => o.source.displayName,
      id: _e,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? ui : void 0,
      cell: (o) => n || o.row.getIsGrouped() ? o.getValue() : void 0,
      getGroupingValue: (o) => o.source.id,
      sortingFn: (o, a) => o.original.source.displayName.localeCompare(a.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (o) => o.detail,
      id: jd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Bd,
      cell: (o) => o.getValue(),
      enableGrouping: !1
    }
  ];
}
const Gd = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || lr(t.start, t.end) === 0 ? `${qn(t.start)}+${e}` : `${qn(t.start)}+${e}-${qn(t.end)}+${n}`;
}, Do = (t) => `${Gd({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Iu({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: o,
  scriptureBookGroupName: a,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l,
  id: w
}) {
  const [c, d] = D([]), [m, f] = D([{ id: ge, desc: !1 }]), [u, g] = D({}), b = z(
    () => t.flatMap((_) => _.data.map((S) => ({
      ...S,
      source: _.source
    }))),
    [t]
  ), x = z(
    () => Kd(
      {
        scriptureReferenceColumnName: o,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [o, i, s, n]
  );
  U(() => {
    c.includes(_e) ? f([
      { id: _e, desc: !1 },
      { id: ge, desc: !1 }
    ]) : f([{ id: ge, desc: !1 }]);
  }, [c]);
  const C = ia({
    data: b,
    columns: x,
    state: {
      grouping: c,
      sorting: m,
      rowSelection: u
    },
    onGroupingChange: d,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: Tl(),
    getGroupedRowModel: El(),
    getCoreRowModel: la(),
    getSortedRowModel: sa(),
    getRowId: Do,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  U(() => {
    if (l) {
      const _ = C.getSelectedRowModel().rowsById, S = Object.keys(_);
      if (S.length === 1) {
        const L = b.find((j) => Do(j) === S[0]) || void 0;
        L && l(L);
      }
    }
  }, [u, b, l, C]);
  const y = a ?? Fd, k = i ?? ui, N = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [ge] },
    { label: `Group by ${k}`, value: [_e] },
    {
      label: `Group by ${y} and ${k}`,
      value: [ge, _e]
    },
    {
      label: `Group by ${k} and ${y}`,
      value: [_e, ge]
    }
  ], V = (_) => {
    d(JSON.parse(_));
  }, $ = (_, S) => {
    !_.getIsGrouped() && !_.getIsSelected() && _.getToggleSelectedHandler()(S);
  }, A = (_, S) => _.getIsGrouped() ? "" : h("banded-row", S % 2 === 0 ? "even" : "odd"), R = (_, S, L) => {
    if (!((_ == null ? void 0 : _.length) === 0 || S.depth < L.column.getGroupedIndex())) {
      if (S.getIsGrouped())
        switch (S.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (S.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ p("div", { id: w, className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ p(
      Ke,
      {
        value: JSON.stringify(c),
        onValueChange: (_) => {
          V(_);
        },
        children: [
          /* @__PURE__ */ r(Oe, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ r(Ge, {}) }),
          /* @__PURE__ */ r(Ie, { position: "item-aligned", children: /* @__PURE__ */ r(Iw, { children: N.map((_) => /* @__PURE__ */ r(Pt, { value: JSON.stringify(_.value), children: _.label }, _.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ p(Fn, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ r(Bn, { children: C.getHeaderGroups().map((_) => /* @__PURE__ */ r(ae, { children: _.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ r(mn, { colSpan: S.colSpan, className: "top-0 tw-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ p("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ r(
            F,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          ln(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, _.id)) }),
      /* @__PURE__ */ r(Kn, { children: C.getRowModel().rows.map((_, S) => {
        const L = ft();
        return /* @__PURE__ */ r(
          ae,
          {
            "data-state": _.getIsSelected() ? "selected" : "",
            className: h(A(_, S)),
            onClick: (j) => $(_, j),
            children: _.getVisibleCells().map((j) => {
              if (!(j.getIsPlaceholder() || j.column.columnDef.enableGrouping && !j.getIsGrouped() && (j.column.columnDef.id !== _e || !n)))
                return /* @__PURE__ */ r(
                  Re,
                  {
                    className: h(
                      j.column.columnDef.id,
                      "tw-p-[1px]",
                      R(c, _, j)
                    ),
                    children: j.getIsGrouped() ? /* @__PURE__ */ p(
                      F,
                      {
                        variant: "link",
                        onClick: _.getToggleExpandedHandler(),
                        type: "button",
                        children: [
                          _.getIsExpanded() && /* @__PURE__ */ r(Ue, {}),
                          !_.getIsExpanded() && (L === "ltr" ? /* @__PURE__ */ r(je, {}) : /* @__PURE__ */ r(ir, {})),
                          " ",
                          ln(j.column.columnDef.cell, j.getContext()),
                          " (",
                          _.subRows.length,
                          ")"
                        ]
                      }
                    ) : ln(j.column.columnDef.cell, j.getContext())
                  },
                  j.id
                );
            })
          },
          _.id
        );
      }) })
    ] })
  ] });
}
const Wr = (t, e) => t.filter((n) => {
  try {
    return sn(n) === e;
  } catch {
    return !1;
  }
}), mi = (t, e, n) => Wr(t, e).every((o) => n.includes(o));
function Ud({
  section: t,
  availableBookIds: e,
  selectedBookIds: n,
  onToggle: o,
  localizedStrings: a
}) {
  const i = Wr(e, t).length === 0, s = a["%scripture_section_ot_short%"], l = a["%scripture_section_nt_short%"], w = a["%scripture_section_dc_short%"], c = a["%scripture_section_extra_short%"];
  return /* @__PURE__ */ r(
    F,
    {
      variant: "outline",
      size: "sm",
      onClick: () => o(t),
      className: h(
        mi(e, t, n) && !i && "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/70 hover:tw-text-primary-foreground"
      ),
      disabled: i,
      children: Bl(
        t,
        s,
        l,
        w,
        c
      )
    }
  );
}
const Mo = 5, rr = 6;
function qd({
  availableBookInfo: t,
  selectedBookIds: e,
  onChangeSelectedBookIds: n,
  localizedStrings: o,
  localizedBookNames: a
}) {
  const i = o["%webView_book_selector_books_selected%"], s = o["%webView_book_selector_select_books%"], l = o["%webView_book_selector_search_books%"], w = o["%webView_book_selector_select_all%"], c = o["%webView_book_selector_clear_all%"], d = o["%webView_book_selector_no_book_found%"], m = o["%webView_book_selector_more%"], { otLong: f, ntLong: u, dcLong: g, extraLong: b } = {
    otLong: o == null ? void 0 : o["%scripture_section_ot_long%"],
    ntLong: o == null ? void 0 : o["%scripture_section_nt_long%"],
    dcLong: o == null ? void 0 : o["%scripture_section_dc_long%"],
    extraLong: o == null ? void 0 : o["%scripture_section_extra_long%"]
  }, [x, C] = D(!1), [y, k] = D(""), N = G(void 0), V = G(!1);
  if (t.length !== mt.allBookIds.length)
    throw new Error("availableBookInfo length must match Canon.allBookIds length");
  const $ = z(() => mt.allBookIds.filter(
    (I, q) => t[q] === "1" && !mt.isObsolete(mt.bookIdToNumber(I))
  ), [t]), A = z(() => {
    if (!y.trim()) {
      const T = {
        [Y.OT]: [],
        [Y.NT]: [],
        [Y.DC]: [],
        [Y.Extra]: []
      };
      return $.forEach((W) => {
        const Rt = sn(W);
        T[Rt].push(W);
      }), T;
    }
    const I = $.filter(
      (T) => Ar(T, y, a)
    ), q = {
      [Y.OT]: [],
      [Y.NT]: [],
      [Y.DC]: [],
      [Y.Extra]: []
    };
    return I.forEach((T) => {
      const W = sn(T);
      q[W].push(T);
    }), q;
  }, [$, y, a]), R = B(
    (I, q = !1) => {
      if (!q || !N.current) {
        n(
          e.includes(I) ? e.filter((bt) => bt !== I) : [...e, I]
        ), N.current = I;
        return;
      }
      const T = $.findIndex((bt) => bt === N.current), W = $.findIndex((bt) => bt === I);
      if (T === -1 || W === -1) return;
      const [Rt, zt] = [
        Math.min(T, W),
        Math.max(T, W)
      ], Ft = $.slice(Rt, zt + 1).map((bt) => bt);
      n(
        e.includes(I) ? e.filter((bt) => !Ft.includes(bt)) : [.../* @__PURE__ */ new Set([...e, ...Ft])]
      );
    },
    [e, n, $]
  ), _ = (I) => {
    R(I, V.current), V.current = !1;
  }, S = (I, q) => {
    I.preventDefault(), R(q, I.shiftKey);
  }, L = B(
    (I) => {
      const q = Wr($, I).map((T) => T);
      n(
        mi($, I, e) ? e.filter((T) => !q.includes(T)) : [.../* @__PURE__ */ new Set([...e, ...q])]
      );
    },
    [e, n, $]
  ), j = () => {
    n($.map((I) => I));
  }, P = () => {
    n([]);
  };
  return /* @__PURE__ */ p("div", { className: "tw-space-y-2", children: [
    /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-wrap tw-gap-2", children: Object.values(Y).map((I) => /* @__PURE__ */ r(
      Ud,
      {
        section: I,
        availableBookIds: $,
        selectedBookIds: e,
        onToggle: L,
        localizedStrings: o
      },
      I
    )) }),
    /* @__PURE__ */ p(
      fe,
      {
        open: x,
        onOpenChange: (I) => {
          C(I), I || k("");
        },
        children: [
          /* @__PURE__ */ r(ve, { asChild: !0, children: /* @__PURE__ */ p(
            F,
            {
              variant: "outline",
              role: "combobox",
              "aria-expanded": x,
              className: "tw-max-w-64 tw-justify-between",
              children: [
                e.length > 0 ? `${i}: ${e.length}` : s,
                /* @__PURE__ */ r(Vo, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
              ]
            }
          ) }),
          /* @__PURE__ */ r(ee, { className: "tw-w-full tw-p-0", align: "start", children: /* @__PURE__ */ p(
            ue,
            {
              shouldFilter: !1,
              onKeyDown: (I) => {
                I.key === "Enter" && (V.current = I.shiftKey);
              },
              children: [
                /* @__PURE__ */ r(
                  We,
                  {
                    placeholder: l,
                    value: y,
                    onValueChange: k
                  }
                ),
                /* @__PURE__ */ p("div", { className: "tw-flex tw-justify-between tw-border-b tw-p-2", children: [
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: j, children: w }),
                  /* @__PURE__ */ r(F, { variant: "ghost", size: "sm", onClick: P, children: c })
                ] }),
                /* @__PURE__ */ p(me, { children: [
                  /* @__PURE__ */ r(gn, { children: d }),
                  Object.values(Y).map((I, q) => {
                    const T = A[I];
                    if (T.length !== 0)
                      return /* @__PURE__ */ p(Oo, { children: [
                        /* @__PURE__ */ r(
                          Jt,
                          {
                            heading: fa(I, f, u, g, b),
                            children: T.map((W) => /* @__PURE__ */ r(
                              ga,
                              {
                                bookId: W,
                                isSelected: e.includes(W),
                                onSelect: () => _(W),
                                onMouseDown: (Rt) => S(Rt, W),
                                section: sn(W),
                                showCheck: !0,
                                localizedBookNames: a,
                                commandValue: fr(W, a),
                                className: "tw-flex tw-items-center"
                              },
                              W
                            ))
                          }
                        ),
                        q < Object.values(Y).length - 1 && /* @__PURE__ */ r(Or, {})
                      ] }, I);
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
        e.length === rr ? rr : Mo
      ).map((I) => /* @__PURE__ */ r(Be, { className: "hover:tw-bg-secondary", variant: "secondary", children: Le(I, a) }, I)),
      e.length > rr && /* @__PURE__ */ r(
        Be,
        {
          className: "hover:tw-bg-secondary",
          variant: "secondary",
          children: `+${e.length - Mo} ${m}`
        }
      )
    ] })
  ] });
}
const Au = Object.freeze([
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
]), Ne = (t, e) => t[e] ?? e;
function Pu({
  scope: t,
  availableScopes: e,
  onScopeChange: n,
  availableBookInfo: o,
  selectedBookIds: a,
  onSelectedBookIdsChange: i,
  localizedStrings: s,
  localizedBookNames: l,
  id: w
}) {
  const c = Ne(
    s,
    "%webView_scope_selector_selected_text%"
  ), d = Ne(
    s,
    "%webView_scope_selector_current_verse%"
  ), m = Ne(
    s,
    "%webView_scope_selector_current_chapter%"
  ), f = Ne(s, "%webView_scope_selector_current_book%"), u = Ne(s, "%webView_scope_selector_choose_books%"), g = Ne(s, "%webView_scope_selector_scope%"), b = Ne(s, "%webView_scope_selector_select_books%"), x = [
    { value: "selectedText", label: c, id: "scope-selected-text" },
    { value: "verse", label: d, id: "scope-verse" },
    { value: "chapter", label: m, id: "scope-chapter" },
    { value: "book", label: f, id: "scope-book" },
    { value: "selectedBooks", label: u, id: "scope-selected" }
  ], C = e ? x.filter((y) => e.includes(y.value)) : x;
  return /* @__PURE__ */ p("div", { id: w, className: "tw-grid tw-gap-4", children: [
    /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(gt, { children: g }),
      /* @__PURE__ */ r(
        Pr,
        {
          value: t,
          onValueChange: n,
          className: "tw-flex tw-flex-col tw-space-y-1",
          children: C.map(({ value: y, label: k, id: N }) => /* @__PURE__ */ p("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ r(Sn, { className: "tw-me-2", value: y, id: N }),
            /* @__PURE__ */ r(gt, { htmlFor: N, children: k })
          ] }, N))
        }
      )
    ] }),
    t === "selectedBooks" && /* @__PURE__ */ p("div", { className: "tw-grid tw-gap-2", children: [
      /* @__PURE__ */ r(gt, { children: b }),
      /* @__PURE__ */ r(
        qd,
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
const or = {
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
function $u({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: o = {},
  size: a = "sm",
  className: i,
  id: s
}) {
  const l = {
    ...or,
    ...Object.fromEntries(
      Object.entries(o).map(
        ([c, d]) => [
          c,
          c === d && c in or ? or[c] : d
        ]
      )
    )
  }, w = ft();
  return /* @__PURE__ */ p(
    Ke,
    {
      value: `${e}`,
      onValueChange: (c) => n(
        c === "undefined" ? void 0 : parseInt(c, 10)
      ),
      children: [
        /* @__PURE__ */ r(Oe, { size: a, className: h("pr-twp tw-w-auto", i), children: /* @__PURE__ */ r(
          Ge,
          {
            placeholder: l[Z(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ r(
          Ie,
          {
            id: s,
            align: w === "rtl" ? "end" : "start",
            style: { zIndex: Xe },
            children: t.map((c) => /* @__PURE__ */ r(Pt, { value: `${c}`, children: l[Z(c)] }, `${c}`))
          }
        )
      ]
    }
  );
}
function Lu({ children: t }) {
  return /* @__PURE__ */ r("div", { className: "pr-twp tw-grid", children: t });
}
function Vu({
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
function ju({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ p("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ p("div", { children: [
      /* @__PURE__ */ r("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ r("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ r(De, {}) : ""
  ] });
}
function fi(t, e) {
  var n;
  return (n = Object.entries(t).find(
    ([, o]) => "menuItem" in o && o.menuItem === e
  )) == null ? void 0 : n[0];
}
function $n({ icon: t, menuLabel: e, leading: n }) {
  return t ? /* @__PURE__ */ r(
    "img",
    {
      className: h("tw-max-h-5 tw-max-w-5", n ? "tw-me-2" : "tw-ms-2"),
      src: t,
      alt: `${n ? "Leading" : "Trailing"} icon for ${e}`
    }
  ) : void 0;
}
const hi = (t, e, n, o) => n ? Object.entries(t).filter(
  ([i, s]) => "column" in s && s.column === n || i === n
).sort(([, i], [, s]) => i.order - s.order).flatMap(([i]) => e.filter((l) => l.group === i).sort((l, w) => l.order - w.order).map((l) => /* @__PURE__ */ p(Lt, { children: [
  /* @__PURE__ */ r(Vt, { asChild: !0, children: "command" in l ? /* @__PURE__ */ p(
    Pn,
    {
      onClick: () => {
        o(l);
      },
      children: [
        l.iconPathBefore && /* @__PURE__ */ r($n, { icon: l.iconPathBefore, menuLabel: l.label, leading: !0 }),
        l.label,
        l.iconPathAfter && /* @__PURE__ */ r($n, { icon: l.iconPathAfter, menuLabel: l.label })
      ]
    },
    `dropdown-menu-item-${l.label}-${l.command}`
  ) : /* @__PURE__ */ p(Rw, { children: [
    /* @__PURE__ */ r(Qa, { children: l.label }),
    /* @__PURE__ */ r(Tw, { children: /* @__PURE__ */ r(ti, { children: hi(
      t,
      e,
      fi(t, l.id),
      o
    ) }) })
  ] }, `dropdown-menu-sub-${l.label}-${l.id}`) }),
  l.tooltip && /* @__PURE__ */ r(Ot, { children: l.tooltip })
] }, `tooltip-${l.label}-${"command" in l ? l.command : l.id}`))) : void 0;
function Er({
  onSelectMenuItem: t,
  menuData: e,
  tabLabel: n,
  icon: o,
  className: a,
  variant: i,
  buttonVariant: s = "ghost",
  id: l
}) {
  return /* @__PURE__ */ p(be, { variant: i, children: [
    /* @__PURE__ */ r(Me, { "aria-label": n, className: a, asChild: !0, id: l, children: /* @__PURE__ */ r(F, { variant: s, size: "icon", children: o ?? /* @__PURE__ */ r(ds, {}) }) }),
    /* @__PURE__ */ r(de, { align: "start", style: { zIndex: Xe }, children: Object.entries(e.columns).filter(([, w]) => typeof w == "object").sort(([, w], [, c]) => typeof w == "boolean" || typeof c == "boolean" ? 0 : w.order - c.order).map(([w], c, d) => /* @__PURE__ */ p(Oo, { children: [
      /* @__PURE__ */ r(Za, { children: /* @__PURE__ */ r(Mt, { children: hi(e.groups, e.items, w, t) }) }),
      c < d.length - 1 && /* @__PURE__ */ r(Ze, {})
    ] }, w)) })
  ] });
}
const gi = v.forwardRef(
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
function zu({
  onSelectProjectMenuItem: t,
  onSelectViewInfoMenuItem: e,
  projectMenuData: n,
  tabViewMenuData: o,
  id: a,
  className: i,
  startAreaChildren: s,
  centerAreaChildren: l,
  endAreaChildren: w,
  menuButtonIcon: c
}) {
  return /* @__PURE__ */ p(gi, { className: `tw-w-full tw-border ${i}`, id: a, children: [
    n && /* @__PURE__ */ r(
      Er,
      {
        onSelectMenuItem: t,
        menuData: n,
        tabLabel: "Project",
        icon: c ?? /* @__PURE__ */ r(ps, {}),
        buttonVariant: "ghost"
      }
    ),
    s && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[10] tw-flex-row tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: s }),
    l && /* @__PURE__ */ r("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-basis-0 tw-flex-row tw-flex-wrap tw-items-start tw-justify-center tw-gap-x-1 tw-gap-y-2 tw-overflow-clip @sm:tw-basis-auto", children: l }),
    /* @__PURE__ */ p("div", { className: "tw-flex tw-h-full tw-shrink tw-grow-[1] tw-flex-row-reverse tw-flex-wrap tw-items-start tw-gap-x-1 tw-gap-y-2 tw-overflow-clip", children: [
      o && /* @__PURE__ */ r(
        Er,
        {
          onSelectMenuItem: e,
          menuData: o,
          tabLabel: "View Info",
          icon: /* @__PURE__ */ r(us, {}),
          className: "tw-h-full"
        }
      ),
      w
    ] })
  ] });
}
function Fu({
  onSelectProjectMenuItem: t,
  projectMenuData: e,
  id: n,
  className: o,
  menuButtonIcon: a
}) {
  return /* @__PURE__ */ r(gi, { className: "tw-pointer-events-none", id: n, children: e && /* @__PURE__ */ r(
    Er,
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
const bi = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    Tt.Root,
    {
      orientation: "vertical",
      ref: n,
      className: h("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
      ...e,
      dir: o
    }
  );
});
bi.displayName = Tt.List.displayName;
const vi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.List,
  {
    ref: n,
    className: h(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
vi.displayName = Tt.List.displayName;
const Hd = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Trigger,
  {
    ref: n,
    ...e,
    className: h(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), xi = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Content,
  {
    ref: n,
    className: h(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
xi.displayName = Tt.Content.displayName;
function Bu({
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
        Xr,
        {
          className: i,
          value: e,
          onSearch: n,
          placeholder: o
        }
      )
    ] }),
    /* @__PURE__ */ p(bi, { children: [
      /* @__PURE__ */ r(vi, { children: t.map((l) => /* @__PURE__ */ r(Hd, { value: l.value, children: l.value }, l.key)) }),
      t.map((l) => /* @__PURE__ */ r(xi, { value: l.value, children: l.content }, l.key))
    ] })
  ] });
}
function Yd({ ...t }) {
  return /* @__PURE__ */ r(ot.Menu, { ...t });
}
function Xd({ ...t }) {
  return /* @__PURE__ */ r(ot.Sub, { "data-slot": "menubar-sub", ...t });
}
const yi = v.forwardRef(({ className: t, variant: e = "default", ...n }, o) => {
  const a = v.useMemo(
    () => ({
      variant: e
    }),
    [e]
  );
  return /* @__PURE__ */ r(qr.Provider, { value: a, children: /* @__PURE__ */ r(
    ot.Root,
    {
      ref: o,
      className: h(
        "tw-flex tw-h-10 tw-items-center tw-space-x-1 tw-rounded-md tw-border tw-bg-background tw-p-1",
        t
      ),
      ...n
    }
  ) });
});
yi.displayName = ot.Root.displayName;
const Ni = v.forwardRef(({ className: t, ...e }, n) => {
  const o = Gt();
  return /* @__PURE__ */ r(
    ot.Trigger,
    {
      ref: n,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        // CUSTOM
        "pr-twp",
        he({ variant: o.variant, className: t })
        // CUSTOM use context to add variants
      ),
      ...e
    }
  );
});
Ni.displayName = ot.Trigger.displayName;
const ki = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => {
  const i = Gt();
  return /* @__PURE__ */ p(
    ot.SubTrigger,
    {
      ref: a,
      className: h(
        "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
        e && "tw-pl-8",
        he({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...o,
      children: [
        n,
        /* @__PURE__ */ r(je, { className: "tw-ml-auto tw-h-4 tw-w-4" })
      ]
    }
  );
});
ki.displayName = ot.SubTrigger.displayName;
const _i = v.forwardRef(({ className: t, ...e }, n) => {
  const o = Gt();
  return /* @__PURE__ */ r(
    ot.SubContent,
    {
      ref: n,
      className: h(
        "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": o.variant === "muted"
        },
        t
      ),
      ...e
    }
  );
});
_i.displayName = ot.SubContent.displayName;
const Ci = v.forwardRef(({ className: t, align: e = "start", alignOffset: n = -4, sideOffset: o = 8, ...a }, i) => {
  const s = Gt();
  return /* @__PURE__ */ r(ot.Portal, { children: /* @__PURE__ */ r(
    ot.Content,
    {
      ref: i,
      align: e,
      alignOffset: n,
      sideOffset: o,
      className: h(
        "tw-z-50 tw-min-w-[12rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
        // CUSTOM reset styles so that only shadcn styles are applied
        "pr-twp",
        // CUSTOM use context to add variants
        {
          "tw-bg-popover": s.variant === "muted"
        },
        t
      ),
      ...a
    }
  ) });
});
Ci.displayName = ot.Content.displayName;
const Ei = v.forwardRef(({ className: t, inset: e, ...n }, o) => {
  const a = Gt();
  return /* @__PURE__ */ r(
    ot.Item,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        e && "tw-pl-8",
        he({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n
    }
  );
});
Ei.displayName = ot.Item.displayName;
const Wd = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => {
  const i = Gt();
  return /* @__PURE__ */ p(
    ot.CheckboxItem,
    {
      ref: a,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        he({ variant: i.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      checked: n,
      ...o,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
        e
      ]
    }
  );
});
Wd.displayName = ot.CheckboxItem.displayName;
const Jd = v.forwardRef(({ className: t, children: e, ...n }, o) => {
  const a = Gt();
  return /* @__PURE__ */ p(
    ot.RadioItem,
    {
      ref: o,
      className: h(
        "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
        he({ variant: a.variant, className: t }),
        // CUSTOM use context to add variants
        t
      ),
      ...n,
      children: [
        /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(ot.ItemIndicator, { children: /* @__PURE__ */ r(Vn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
        e
      ]
    }
  );
});
Jd.displayName = ot.RadioItem.displayName;
const Zd = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  ot.Label,
  {
    ref: o,
    className: h("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Zd.displayName = ot.Label.displayName;
const Ti = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  ot.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Ti.displayName = ot.Separator.displayName;
const on = (t, e) => {
  setTimeout(() => {
    e.forEach((n) => {
      var o;
      (o = t.current) == null || o.dispatchEvent(new KeyboardEvent("keydown", n));
    });
  }, 0);
}, Ri = (t, e, n, o) => {
  if (!n) return;
  const a = Object.entries(t).filter(
    ([i, s]) => "column" in s && s.column === n || i === n
  ).sort(([, i], [, s]) => i.order - s.order);
  return a.flatMap(([i], s) => {
    const l = e.filter((c) => c.group === i).sort((c, d) => c.order - d.order).map((c) => /* @__PURE__ */ p(Lt, { children: [
      /* @__PURE__ */ r(Vt, { asChild: !0, children: "command" in c ? /* @__PURE__ */ p(
        Ei,
        {
          onClick: () => {
            o(c);
          },
          children: [
            c.iconPathBefore && /* @__PURE__ */ r($n, { icon: c.iconPathBefore, menuLabel: c.label, leading: !0 }),
            c.label,
            c.iconPathAfter && /* @__PURE__ */ r($n, { icon: c.iconPathAfter, menuLabel: c.label })
          ]
        },
        `menubar-item-${c.label}-${c.command}`
      ) : /* @__PURE__ */ p(Xd, { children: [
        /* @__PURE__ */ r(ki, { children: c.label }),
        /* @__PURE__ */ r(_i, { children: Ri(
          t,
          e,
          fi(t, c.id),
          o
        ) })
      ] }, `menubar-sub-${c.label}-${c.id}`) }),
      c.tooltip && /* @__PURE__ */ r(Ot, { children: c.tooltip })
    ] }, `tooltip-${c.label}-${"command" in c ? c.command : c.id}`)), w = [...l];
    return l.length > 0 && s < a.length - 1 && w.push(/* @__PURE__ */ r(Ti, {}, `separator-${i}`)), w;
  });
};
function Qd({
  menuData: t,
  onSelectMenuItem: e,
  onOpenChange: n,
  variant: o
}) {
  const a = G(void 0), i = G(void 0), s = G(void 0), l = G(void 0), w = G(void 0), c = (d) => {
    switch (d) {
      case "platform.app":
        return i;
      case "platform.window":
        return s;
      case "platform.layout":
        return l;
      case "platform.help":
        return w;
      default:
        return;
    }
  };
  if (Ml(["alt", "alt+p", "alt+l", "alt+n", "alt+h"], (d, m) => {
    var g, b, x, C;
    d.preventDefault();
    const f = { key: "Escape", code: "Escape", keyCode: 27, bubbles: !0 }, u = { key: " ", code: "Space", keyCode: 32, bubbles: !0 };
    switch (m.hotkey) {
      case "alt":
        on(i, [f]);
        break;
      case "alt+p":
        (g = i.current) == null || g.focus(), on(i, [f, u]);
        break;
      case "alt+l":
        (b = s.current) == null || b.focus(), on(s, [f, u]);
        break;
      case "alt+n":
        (x = l.current) == null || x.focus(), on(l, [f, u]);
        break;
      case "alt+h":
        (C = w.current) == null || C.focus(), on(w, [f, u]);
        break;
    }
  }), U(() => {
    if (!n || !a.current) return;
    const d = new MutationObserver((u) => {
      u.forEach((g) => {
        if (g.attributeName === "data-state" && g.target instanceof HTMLElement) {
          const b = g.target.getAttribute("data-state");
          n(b === "open");
        }
      });
    });
    return a.current.querySelectorAll("[data-state]").forEach((u) => {
      d.observe(u, { attributes: !0 });
    }), () => d.disconnect();
  }, [n]), !!t)
    return /* @__PURE__ */ r(yi, { ref: a, className: "pr-twp tw-border-0 tw-bg-transparent", variant: o, children: Object.entries(t.columns).filter(([, d]) => typeof d == "object").sort(([, d], [, m]) => typeof d == "boolean" || typeof m == "boolean" ? 0 : d.order - m.order).map(([d, m]) => /* @__PURE__ */ p(Yd, { children: [
      /* @__PURE__ */ r(Ni, { ref: c(d), children: typeof m == "object" && "label" in m && m.label }),
      /* @__PURE__ */ r(
        Ci,
        {
          style: { zIndex: Xe },
          children: /* @__PURE__ */ r(Mt, { children: Ri(t.groups, t.items, d, e) })
        }
      )
    ] }, d)) });
}
function Ku(t) {
  switch (t) {
    case void 0:
      return;
    case "darwin":
      return "tw-ps-[85px]";
    default:
      return "tw-pe-[calc(138px+1rem)]";
  }
}
function Gu({
  menuData: t,
  onOpenChange: e,
  onSelectMenuItem: n,
  className: o,
  id: a,
  children: i,
  appMenuAreaChildren: s,
  configAreaChildren: l,
  shouldUseAsAppDragArea: w,
  menubarVariant: c = "default"
}) {
  const d = G(void 0);
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-border tw-px-4 tw-text-foreground", o),
      ref: d,
      style: { position: "relative" },
      id: a,
      children: /* @__PURE__ */ p(
        "div",
        {
          className: "tw-flex tw-h-full tw-w-full tw-justify-between tw-overflow-hidden",
          style: w ? { WebkitAppRegion: "drag" } : void 0,
          children: [
            /* @__PURE__ */ r("div", { className: "tw-flex tw-grow tw-basis-0", children: /* @__PURE__ */ p(
              "div",
              {
                className: "tw-flex tw-items-center tw-gap-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: [
                  s,
                  t && /* @__PURE__ */ r(
                    Qd,
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
                className: "tw-flex tw-items-center tw-gap-2 tw-px-2",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: i
              }
            ),
            /* @__PURE__ */ r("div", { className: "tw-flex tw-min-w-0 tw-grow tw-basis-0 tw-justify-end", children: /* @__PURE__ */ r(
              "div",
              {
                className: "tw-flex tw-min-w-0 tw-items-center tw-gap-2 tw-pe-1",
                style: w ? { WebkitAppRegion: "no-drag" } : void 0,
                children: l
              }
            ) })
          ]
        }
      )
    }
  );
}
const tp = (t, e) => t[e] ?? e;
function Uu({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: o,
  onPrimaryLanguageChange: a,
  onFallbackLanguagesChange: i,
  localizedStrings: s,
  className: l,
  id: w
}) {
  const c = tp(
    s,
    "%settings_uiLanguageSelector_fallbackLanguages%"
  ), [d, m] = D(!1), f = (g) => {
    a && a(g), o && o([g, ...n.filter((b) => b !== g)]), i && n.find((b) => b === g) && i([...n.filter((b) => b !== g)]), m(!1);
  }, u = (g, b) => {
    var C, y, k, N, V, $;
    const x = b !== g ? ((y = (C = t[g]) == null ? void 0 : C.uiNames) == null ? void 0 : y[b]) ?? ((N = (k = t[g]) == null ? void 0 : k.uiNames) == null ? void 0 : N.en) : void 0;
    return x ? `${(V = t[g]) == null ? void 0 : V.autonym} (${x})` : ($ = t[g]) == null ? void 0 : $.autonym;
  };
  return /* @__PURE__ */ p("div", { id: w, className: h("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ p(
      Ke,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: f,
        open: d,
        onOpenChange: (g) => m(g),
        children: [
          /* @__PURE__ */ r(Oe, { children: /* @__PURE__ */ r(Ge, {}) }),
          /* @__PURE__ */ r(
            Ie,
            {
              style: { zIndex: Xe },
              children: Object.keys(t).map((g) => /* @__PURE__ */ r(Pt, { value: g, children: u(g, e) }, g))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ r("div", { className: "tw-pt-3", children: /* @__PURE__ */ r(gt, { className: "tw-font-normal tw-text-muted-foreground", children: Ce(c, {
      fallbackLanguages: (n == null ? void 0 : n.length) > 0 ? n.map((g) => u(g, e)).join(", ") : t.en.autonym
    }) }) })
  ] });
}
function ep({ item: t, createLabel: e, createComplexLabel: n }) {
  return e ? /* @__PURE__ */ r(gt, { children: e(t) }) : n ? /* @__PURE__ */ r(gt, { children: n(t) }) : /* @__PURE__ */ r(gt, { children: t });
}
function qu({
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
      Yr,
      {
        className: "tw-me-2 tw-align-middle",
        checked: o.includes(l),
        onCheckedChange: (w) => a(l, w)
      }
    ),
    /* @__PURE__ */ r(
      ep,
      {
        item: l,
        createLabel: i,
        createComplexLabel: s
      }
    )
  ] }, l)) });
}
function Hu({
  cardKey: t,
  isSelected: e,
  onSelect: n,
  isDenied: o,
  isHidden: a = !1,
  className: i,
  children: s,
  selectedButtons: l,
  hoverButtons: w,
  dropdownContent: c,
  additionalContent: d,
  accentColor: m,
  showDropdownOnHover: f = !1
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
      className: h(
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
            !e && w && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: w }),
            !e && f && c && /* @__PURE__ */ r("div", { className: "tw-invisible group-hover:tw-visible", children: /* @__PURE__ */ p(be, { children: [
              /* @__PURE__ */ r(Me, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(eo, {}) }) }),
              /* @__PURE__ */ r(de, { align: "end", children: c })
            ] }) }),
            e && c && /* @__PURE__ */ p(be, { children: [
              /* @__PURE__ */ r(Me, { className: h(m && "tw-me-1"), asChild: !0, children: /* @__PURE__ */ r(F, { className: "tw-m-1 tw-h-6 tw-w-6", variant: "ghost", size: "icon", children: /* @__PURE__ */ r(eo, {}) }) }),
              /* @__PURE__ */ r(de, { align: "end", children: c })
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
const np = fn(({ className: t, ...e }, n) => /* @__PURE__ */ r(ms, { size: 35, className: h("tw-animate-spin", t), ...e, ref: n }));
np.displayName = "Spinner";
function Yu({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: o = !1,
  helperText: a,
  label: i,
  placeholder: s,
  isRequired: l = !1,
  className: w,
  defaultValue: c,
  value: d,
  onChange: m,
  onFocus: f,
  onBlur: u
}) {
  return /* @__PURE__ */ p("div", { className: h("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": o }), children: [
    /* @__PURE__ */ r(
      gt,
      {
        htmlFor: t,
        className: h({
          "tw-text-red-600": n,
          "tw-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ r(
      Qe,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: h(w, { "tw-border-red-600": n }),
        defaultValue: c,
        value: d,
        onChange: m,
        onFocus: f,
        onBlur: u
      }
    ),
    /* @__PURE__ */ r("p", { className: h({ "tw-hidden": !a }), children: a })
  ] });
}
const rp = pe(
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
), op = v.forwardRef(({ className: t, variant: e, ...n }, o) => /* @__PURE__ */ r(
  "div",
  {
    ref: o,
    role: "alert",
    className: h(
      // CUSTOM
      "pr-twp",
      rp({ variant: e }),
      t
    ),
    ...n
  }
));
op.displayName = "Alert";
const ap = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ p(
    "h5",
    {
      ref: n,
      className: h("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
ap.displayName = "AlertTitle";
const ip = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r("div", { ref: n, className: h("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
ip.displayName = "AlertDescription";
const Xu = at.Root, Wu = at.Trigger, Ju = at.Group, Zu = at.Portal, Qu = at.Sub, tm = at.RadioGroup, sp = v.forwardRef(({ className: t, inset: e, children: n, ...o }, a) => /* @__PURE__ */ p(
  at.SubTrigger,
  {
    ref: a,
    className: h(
      "pr-twp tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[state=open]:tw-bg-accent data-[state=open]:tw-text-accent-foreground",
      e && "tw-pl-8",
      t
    ),
    ...o,
    children: [
      n,
      /* @__PURE__ */ r(je, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
sp.displayName = at.SubTrigger.displayName;
const lp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.SubContent,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
lp.displayName = at.SubContent.displayName;
const cp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(at.Portal, { children: /* @__PURE__ */ r(
  at.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-z-50 tw-max-h-[--radix-context-menu-content-available-height] tw-min-w-[8rem] tw-origin-[--radix-context-menu-content-transform-origin] tw-overflow-y-auto tw-overflow-x-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
) }));
cp.displayName = at.Content.displayName;
const wp = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Item,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
wp.displayName = at.Item.displayName;
const dp = v.forwardRef(({ className: t, children: e, checked: n, ...o }, a) => /* @__PURE__ */ p(
  at.CheckboxItem,
  {
    ref: a,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...o,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Qt, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
dp.displayName = at.CheckboxItem.displayName;
const pp = v.forwardRef(({ className: t, children: e, ...n }, o) => /* @__PURE__ */ p(
  at.RadioItem,
  {
    ref: o,
    className: h(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ r("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ r(at.ItemIndicator, { children: /* @__PURE__ */ r(Vn, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
pp.displayName = at.RadioItem.displayName;
const up = v.forwardRef(({ className: t, inset: e, ...n }, o) => /* @__PURE__ */ r(
  at.Label,
  {
    ref: o,
    className: h(
      "tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold tw-text-foreground",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
up.displayName = at.Label.displayName;
const mp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  at.Separator,
  {
    ref: n,
    className: h("tw--mx-1 tw-my-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
mp.displayName = at.Separator.displayName;
function fp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "span",
    {
      className: h("tw-ml-auto tw-text-xs tw-tracking-widest tw-text-muted-foreground", t),
      ...e
    }
  );
}
fp.displayName = "ContextMenuShortcut";
const Si = v.createContext({
  direction: "bottom"
});
function hp({
  shouldScaleBackground: t = !0,
  direction: e = "bottom",
  ...n
}) {
  const o = v.useMemo(() => ({ direction: e }), [e]);
  return /* @__PURE__ */ r(Si.Provider, { value: o, children: /* @__PURE__ */ r(
    Kt.Root,
    {
      shouldScaleBackground: t,
      direction: e,
      ...n
    }
  ) });
}
hp.displayName = "Drawer";
const em = Kt.Trigger, gp = Kt.Portal, nm = Kt.Close, Di = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Kt.Overlay,
  {
    ref: n,
    className: h("tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80", t),
    ...e
  }
));
Di.displayName = Kt.Overlay.displayName;
const bp = v.forwardRef(({ className: t, children: e, hideDrawerHandle: n = !1, ...o }, a) => {
  const { direction: i = "bottom" } = v.useContext(Si), s = {
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
  return /* @__PURE__ */ p(gp, { children: [
    /* @__PURE__ */ r(Di, {}),
    /* @__PURE__ */ p(
      Kt.Content,
      {
        ref: a,
        className: h(
          // CUSTOM: Change Tailwind CSS classes for styling
          // Removed tw-inset-x-0 tw-bottom-0 tw-mt-24 tw-rounded-t-[10px] tw-flex-col
          "pr-twp tw-fixed tw-z-50 tw-flex tw-h-auto tw-border tw-bg-background",
          i === "bottom" || i === "top" ? "tw-flex-col" : "tw-flex-row",
          s[i],
          t
        ),
        ...o,
        children: [
          !n && (i === "bottom" || i === "right") && /* @__PURE__ */ r("div", { className: l[i] }),
          /* @__PURE__ */ r("div", { className: "tw-flex tw-flex-col", children: e }),
          !n && (i === "top" || i === "left") && /* @__PURE__ */ r("div", { className: l[i] })
        ]
      }
    )
  ] });
});
bp.displayName = "DrawerContent";
function vp({ className: t, ...e }) {
  return /* @__PURE__ */ r(
    "div",
    {
      className: h("tw-grid tw-gap-1.5 tw-p-4 tw-text-center sm:tw-text-left", t),
      ...e
    }
  );
}
vp.displayName = "DrawerHeader";
function xp({ className: t, ...e }) {
  return /* @__PURE__ */ r("div", { className: h("tw-mt-auto tw-flex tw-flex-col tw-gap-2 tw-p-4", t), ...e });
}
xp.displayName = "DrawerFooter";
const yp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Kt.Title,
  {
    ref: n,
    className: h("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
yp.displayName = Kt.Title.displayName;
const Np = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Kt.Description,
  {
    ref: n,
    className: h("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Np.displayName = Kt.Description.displayName;
const kp = v.forwardRef(({ className: t, value: e, ...n }, o) => /* @__PURE__ */ r(
  ur.Root,
  {
    ref: o,
    className: h(
      "pr-twp tw-relative tw-h-4 tw-w-full tw-overflow-hidden tw-rounded-full tw-bg-secondary",
      t
    ),
    ...n,
    children: /* @__PURE__ */ r(
      ur.Indicator,
      {
        className: "tw-h-full tw-w-full tw-flex-1 tw-bg-primary tw-transition-all",
        style: { transform: `translateX(-${100 - (e || 0)}%)` }
      }
    )
  }
));
kp.displayName = ur.Root.displayName;
function rm({
  className: t,
  ...e
}) {
  return /* @__PURE__ */ r(
    Mr.PanelGroup,
    {
      className: h(
        "tw-flex tw-h-full tw-w-full data-[panel-group-direction=vertical]:tw-flex-col",
        t
      ),
      ...e
    }
  );
}
const om = Mr.Panel;
function am({
  withHandle: t,
  className: e,
  ...n
}) {
  return /* @__PURE__ */ r(
    Mr.PanelResizeHandle,
    {
      className: h(
        "tw-relative tw-flex tw-w-px tw-items-center tw-justify-center tw-bg-border after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-1 after:tw--translate-x-1/2 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-1 data-[panel-group-direction=vertical]:tw-h-px data-[panel-group-direction=vertical]:tw-w-full data-[panel-group-direction=vertical]:after:tw-left-0 data-[panel-group-direction=vertical]:after:tw-h-1 data-[panel-group-direction=vertical]:after:tw-w-full data-[panel-group-direction=vertical]:after:tw--translate-y-1/2 data-[panel-group-direction=vertical]:after:tw-translate-x-0 [&[data-panel-group-direction=vertical]>div]:tw-rotate-90",
        e
      ),
      ...n,
      children: t && /* @__PURE__ */ r("div", { className: "tw-z-10 tw-flex tw-h-4 tw-w-3 tw-items-center tw-justify-center tw-rounded-sm tw-border tw-bg-border", children: /* @__PURE__ */ r(fs, { className: "tw-h-2.5 tw-w-2.5" }) })
    }
  );
}
function im({ ...t }) {
  return /* @__PURE__ */ r(
    Ol,
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
const _p = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ p(
    an.Root,
    {
      ref: n,
      className: h(
        "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
        t
      ),
      ...e,
      dir: o,
      children: [
        /* @__PURE__ */ r(an.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ r(an.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
        /* @__PURE__ */ r(an.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
      ]
    }
  );
});
_p.displayName = an.Root.displayName;
const Cp = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    mr.Root,
    {
      className: h(
        "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
        t
      ),
      ...e,
      ref: n,
      children: /* @__PURE__ */ r(
        mr.Thumb,
        {
          className: h(
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
Cp.displayName = mr.Root.displayName;
const sm = Tt.Root, Ep = v.forwardRef(({ className: t, ...e }, n) => {
  const o = ft();
  return /* @__PURE__ */ r(
    Tt.List,
    {
      ref: n,
      className: h(
        "pr-twp tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
        t
      ),
      ...e,
      dir: o
    }
  );
});
Ep.displayName = Tt.List.displayName;
const Tp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Trigger,
  {
    ref: n,
    className: h(
      "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Tp.displayName = Tt.Trigger.displayName;
const Rp = v.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ r(
  Tt.Content,
  {
    ref: n,
    className: h(
      "pr-twp tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Rp.displayName = Tt.Content.displayName;
const Sp = v.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ r(
    "textarea",
    {
      className: h(
        "pr-twp tw-flex tw-min-h-[80px] tw-w-full tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-base tw-ring-offset-background placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 md:tw-text-sm",
        t
      ),
      ref: n,
      ...e
    }
  )
);
Sp.displayName = "Textarea";
const lm = (t, e) => {
  U(() => {
    if (!t) return () => {
    };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
};
function Dp(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const Mp = (t, e, n = {}) => {
  const o = G(e);
  o.current = e;
  const a = G(n);
  a.current = Dp(a.current);
  const [i, s] = D(() => o.current), [l, w] = D(!0);
  return U(() => {
    let c = !0;
    return w(!!t), (async () => {
      if (t) {
        const d = await t();
        c && (s(() => d), w(!1));
      }
    })(), () => {
      c = !1, a.current.preserveValue || s(() => o.current);
    };
  }, [t]), [i, l];
}, ar = () => !1, cm = (t, e) => {
  const [n] = Mp(
    B(async () => {
      if (!t) return ar;
      const o = await Promise.resolve(t(e));
      return async () => o();
    }, [e, t]),
    ar,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  U(() => () => {
    n !== ar && n();
  }, [n]);
};
function wm(t) {
  U(() => {
    let e;
    return t && (e = document.createElement("style"), e.appendChild(document.createTextNode(t)), document.head.appendChild(e)), () => {
      e && document.head.removeChild(e);
    };
  }, [t]);
}
function Op(t, e = "top") {
  if (!t || typeof document > "u") return;
  const n = document.head || document.querySelector("head"), o = n.querySelector(":first-child"), a = document.createElement("style");
  a.appendChild(document.createTextNode(t)), e === "top" && o ? n.insertBefore(a, o) : n.appendChild(a);
}
Op(`*, ::before, ::after {
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
  op as Alert,
  ip as AlertDescription,
  ap as AlertTitle,
  Wa as Avatar,
  Ja as AvatarFallback,
  Ew as AvatarImage,
  su as BOOK_CHAPTER_CONTROL_STRING_KEYS,
  lu as BOOK_SELECTOR_STRING_KEYS,
  Be as Badge,
  iu as BookChapterControl,
  gr as BookSelectionMode,
  cu as BookSelector,
  F as Button,
  qa as CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  du as COMMENT_EDITOR_STRING_KEYS,
  pu as COMMENT_LIST_STRING_KEYS,
  Ha as CancelAcceptButtons,
  Ya as Card,
  Xa as CardContent,
  _w as CardDescription,
  Cw as CardFooter,
  Nw as CardHeader,
  kw as CardTitle,
  Wl as ChapterRangeSelector,
  Yr as Checkbox,
  qu as Checklist,
  hr as ComboBox,
  ue as Command,
  gn as CommandEmpty,
  Jt as CommandGroup,
  We as CommandInput,
  te as CommandItem,
  me as CommandList,
  wu as CommentEditor,
  uu as CommentList,
  Xu as ContextMenu,
  dp as ContextMenuCheckboxItem,
  cp as ContextMenuContent,
  Ju as ContextMenuGroup,
  wp as ContextMenuItem,
  up as ContextMenuLabel,
  Zu as ContextMenuPortal,
  tm as ContextMenuRadioGroup,
  pp as ContextMenuRadioItem,
  mp as ContextMenuSeparator,
  fp as ContextMenuShortcut,
  Qu as ContextMenuSub,
  lp as ContextMenuSubContent,
  sp as ContextMenuSubTrigger,
  Wu as ContextMenuTrigger,
  Gw as DataTable,
  Vl as Dialog,
  ou as DialogClose,
  da as DialogContent,
  Fl as DialogDescription,
  zl as DialogFooter,
  pa as DialogHeader,
  wa as DialogOverlay,
  jl as DialogPortal,
  ua as DialogTitle,
  ru as DialogTrigger,
  hp as Drawer,
  nm as DrawerClose,
  bp as DrawerContent,
  Np as DrawerDescription,
  xp as DrawerFooter,
  vp as DrawerHeader,
  Di as DrawerOverlay,
  gp as DrawerPortal,
  yp as DrawerTitle,
  em as DrawerTrigger,
  be as DropdownMenu,
  le as DropdownMenuCheckboxItem,
  de as DropdownMenuContent,
  Za as DropdownMenuGroup,
  Pn as DropdownMenuItem,
  Hw as DropdownMenuItemType,
  bn as DropdownMenuLabel,
  Tw as DropdownMenuPortal,
  Sw as DropdownMenuRadioGroup,
  ei as DropdownMenuRadioItem,
  Ze as DropdownMenuSeparator,
  Dw as DropdownMenuShortcut,
  Rw as DropdownMenuSub,
  ti as DropdownMenuSubContent,
  Qa as DropdownMenuSubTrigger,
  Me as DropdownMenuTrigger,
  Uw as ERROR_DUMP_STRING_KEYS,
  fu as ERROR_POPOVER_STRING_KEYS,
  Zw as EditorKeyboardShortcuts,
  qw as ErrorDump,
  hu as ErrorPopover,
  Nu as FOOTNOTE_EDITOR_STRING_KEYS,
  xu as Filter,
  gu as FilterDropdown,
  vu as Footer,
  yu as FootnoteEditor,
  ud as FootnoteItem,
  ku as FootnoteList,
  Du as INVENTORY_STRING_KEYS,
  Qe as Input,
  Mu as Inventory,
  Nr as Kbd,
  gt as Label,
  od as MARKER_MENU_STRING_KEYS,
  mu as MarkdownRenderer,
  id as MarkerMenu,
  bu as MoreInfo,
  Xw as MultiSelectComboBox,
  Bu as NavigationContentSearch,
  fe as Popover,
  Kl as PopoverAnchor,
  ee as PopoverContent,
  ve as PopoverTrigger,
  kp as Progress,
  Pr as RadioGroup,
  Sn as RadioGroupItem,
  Gl as RecentSearches,
  am as ResizableHandle,
  om as ResizablePanel,
  rm as ResizablePanelGroup,
  Hu as ResultsCard,
  Au as SCOPE_SELECTOR_STRING_KEYS,
  Pu as ScopeSelector,
  Iu as ScriptureResultsViewer,
  $u as ScrollGroupSelector,
  Xr as SearchBar,
  Ke as Select,
  Ie as SelectContent,
  Iw as SelectGroup,
  Pt as SelectItem,
  Pw as SelectLabel,
  ri as SelectScrollDownButton,
  ni as SelectScrollUpButton,
  $w as SelectSeparator,
  Oe as SelectTrigger,
  Ge as SelectValue,
  De as Separator,
  Lu as SettingsList,
  ju as SettingsListHeader,
  Vu as SettingsListItem,
  Ld as SettingsSidebar,
  Ou as SettingsSidebarContentSearch,
  si as Sidebar,
  ci as SidebarContent,
  Td as SidebarFooter,
  kr as SidebarGroup,
  Sd as SidebarGroupAction,
  Cr as SidebarGroupContent,
  _r as SidebarGroupLabel,
  Ed as SidebarHeader,
  Cd as SidebarInput,
  li as SidebarInset,
  wi as SidebarMenu,
  Md as SidebarMenuAction,
  Od as SidebarMenuBadge,
  pi as SidebarMenuButton,
  di as SidebarMenuItem,
  Id as SidebarMenuSkeleton,
  Ad as SidebarMenuSub,
  $d as SidebarMenuSubButton,
  Pd as SidebarMenuSubItem,
  ii as SidebarProvider,
  _d as SidebarRail,
  Rd as SidebarSeparator,
  kd as SidebarTrigger,
  yr as Skeleton,
  _p as Slider,
  im as Sonner,
  np as Spinner,
  Cp as Switch,
  Er as TabDropdownMenu,
  Fu as TabFloatingMenu,
  zu as TabToolbar,
  Fn as Table,
  Kn as TableBody,
  Kw as TableCaption,
  Re as TableCell,
  jw as TableFooter,
  mn as TableHead,
  Bn as TableHeader,
  ae as TableRow,
  sm as Tabs,
  Rp as TabsContent,
  Ep as TabsList,
  Tp as TabsTrigger,
  Yu as TextField,
  Sp as Textarea,
  Br as ToggleGroup,
  wn as ToggleGroupItem,
  Gu as Toolbar,
  Lt as Tooltip,
  Ot as TooltipContent,
  Mt as TooltipProvider,
  Vt as TooltipTrigger,
  Ww as UNDO_REDO_BUTTONS_STRING_KEYS,
  Uu as UiLanguageSelector,
  Jw as UndoRedoButtons,
  bi as VerticalTabs,
  xi as VerticalTabsContent,
  vi as VerticalTabsList,
  Hd as VerticalTabsTrigger,
  Xe as Z_INDEX_ABOVE_DOCK,
  ca as Z_INDEX_FOOTNOTE_EDITOR,
  $l as Z_INDEX_MODAL,
  Pl as Z_INDEX_MODAL_BACKDROP,
  Al as Z_INDEX_OVERLAY,
  yw as badgeVariants,
  ba as buttonVariants,
  h as cn,
  Su as getBookIdFromUSFM,
  Gn as getInventoryHeader,
  Tu as getLinesFromUSFM,
  Ru as getNumberFromUSFM,
  bd as getStatusForItem,
  Ku as getToolbarOSReservedSpaceClassName,
  Cu as inventoryCountColumn,
  _u as inventoryItemColumn,
  Eu as inventoryStatusColumn,
  Aw as selectTriggerVariants,
  um as sonner,
  lm as useEvent,
  cm as useEventAsync,
  xw as useListbox,
  Mp as usePromise,
  au as useRecentSearches,
  Un as useSidebar,
  wm as useStylesheet
};
//# sourceMappingURL=index.js.map
